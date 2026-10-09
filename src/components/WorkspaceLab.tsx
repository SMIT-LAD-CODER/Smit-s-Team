import React, { useState, useEffect, useRef } from 'react';
import { Problem, ChatMessage, CodeAnalysisResult, JudgeResponse } from '../types';
import { WhiteboardCanvas } from './WhiteboardCanvas';
import { DynamicDataVisualizer } from './DynamicDataVisualizer';
import { useAuth } from '../context/AuthContext';

interface WorkspaceLabProps {
  problem: Problem;
  onNavigateChronicle: () => void;
  onOpenReflection: (problem: Problem) => void;
  onProblemSolved: (problemId: string) => void;
}

export const WorkspaceLab: React.FC<WorkspaceLabProps> = ({
  problem,
  onNavigateChronicle,
  onOpenReflection,
  onProblemSolved,
}) => {
  const { user, saveProblemProgress } = useAuth();

  // Workflow Stages
  const stages = ['01 UNDERSTAND', '02 PLAN & SKETCH', '03 CODE & TEST', '04 COMPLEXITY', '05 REFLECT'];
  const [currentStageIdx, setCurrentStageIdx] = useState(2);

  // Focus Lab Mode
  const [isFocusMode, setIsFocusMode] = useState(false);

  // Left Panel Tabs
  const [leftTab, setLeftTab] = useState<'spec' | 'approaches' | 'hints'>('spec');

  // Terminal Tabs
  const [terminalTab, setTerminalTab] = useState<'tests' | 'compiler' | 'analysis'>('tests');

  // Timer
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setElapsedSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSecs: number) => {
    const m = Math.floor(totalSecs / 60).toString().padStart(2, '0');
    const s = (totalSecs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Approach selection
  const savedApproachId = user?.progress[problem.id]?.selectedApproachId || problem.approaches[0]?.id || 'optimal';
  const [selectedApproachId, setSelectedApproachId] = useState<string>(savedApproachId);
  const selectedApproach =
    problem.approaches.find((a) => a.id === selectedApproachId) || problem.approaches[0];

  // Code editor state
  const savedCode = user?.progress[problem.id]?.savedCode || problem.starterCppCode;
  const [code, setCode] = useState(savedCode);

  useEffect(() => {
    const userCode = user?.progress[problem.id]?.savedCode;
    setCode(userCode || problem.starterCppCode);
    if (user?.progress[problem.id]?.selectedApproachId) {
      setSelectedApproachId(user.progress[problem.id].selectedApproachId!);
    }
  }, [problem.id, user]);

  const resetCode = () => {
    setCode(problem.starterCppCode);
    saveProblemProgress(problem.id, 'IN_PROGRESS', problem.starterCppCode, selectedApproachId);
  };

  // Complexity hypotheses
  const [predictedTime, setPredictedTime] = useState(problem.expectedTimeComplexity || 'O(N)');
  const [predictedSpace, setPredictedSpace] = useState(problem.expectedSpaceComplexity || 'O(1)');

  // Hints Progressive Unlock
  const [unlockedHints, setUnlockedHints] = useState<{ [key: number]: boolean }>({
    1: true,
    2: false,
    3: false,
  });
  const revealHint = (hintId: number) => {
    setUnlockedHints((prev) => ({ ...prev, [hintId]: true }));
  };

  // Real Judge Execution State
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [judgeResult, setJudgeResult] = useState<JudgeResponse | null>(null);
  const [submissionFeedback, setSubmissionFeedback] = useState<string | null>(null);

  // Fast Static Code Analysis State
  const [codeAnalysis, setCodeAnalysis] = useState<CodeAnalysisResult | null>(null);
  const [isAnalyzingCode, setIsAnalyzingCode] = useState(false);

  // Live Socratic Mentor State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'mentor',
      text: `Welcome to ${problem.title}. Before jumping straight into C++, what is your mental model for ${problem.pattern}? What invariant must be preserved?`,
      timestamp: '00:01',
    },
  ]);
  const [mentorInput, setMentorInput] = useState('');
  const [isMentorLoading, setIsMentorLoading] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Mentor Message Sender
  const sendMentorMessage = async (queryText: string) => {
    if (!queryText.trim() || isMentorLoading) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: queryText.trim(),
      timestamp: formatTimer(elapsedSeconds),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setMentorInput('');
    setIsMentorLoading(true);

    try {
      const res = await fetch('/api/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: queryText.trim(),
          problem,
          problemTitle: `${problem.number} ${problem.title}`,
          currentCode: code,
          history: chatMessages.slice(-6),
        }),
      });
      const data = await res.json();
      const mentorReply: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'mentor',
        text: data.reply || 'Consider what invariant is preserved at each step.',
        timestamp: formatTimer(elapsedSeconds),
      };
      setChatMessages((prev) => [...prev, mentorReply]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'mentor',
          text: problem.hint1
            ? `Socratic Hint: ${problem.hint1}`
            : 'Consider what data structure enables constant-time verification.',
          timestamp: formatTimer(elapsedSeconds),
        },
      ]);
    } finally {
      setIsMentorLoading(false);
    }
  };

  // Instant Fast Analyze Draft (< 50ms)
  const handleAnalyzeCode = async () => {
    setIsAnalyzingCode(true);
    setTerminalTab('analysis');
    try {
      const res = await fetch('/api/analyze-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problem,
          currentCode: code,
          studentThought: selectedApproach?.description || '',
        }),
      });
      const data: CodeAnalysisResult = await res.json();
      setCodeAnalysis(data);

      if (data.socraticNextPrompt) {
        setChatMessages((prev) => [
          ...prev,
          {
            id: String(Date.now()),
            sender: 'mentor',
            text: data.socraticNextPrompt,
            timestamp: formatTimer(elapsedSeconds),
          },
        ]);
      }
    } catch (err) {
      console.warn('Code analysis request failed:', err);
    } finally {
      setIsAnalyzingCode(false);
    }
  };

  // Real C++ Judge Run Code
  const handleRunCode = async () => {
    setIsRunningTests(true);
    setTerminalTab('tests');
    setSubmissionFeedback(null);
    saveProblemProgress(problem.id, 'IN_PROGRESS', code, selectedApproachId);

    try {
      const res = await fetch('/api/judge/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemId: problem.id,
          code,
          testcases: problem.testcases,
        }),
      });
      const data: JudgeResponse = await res.json();
      setJudgeResult(data);
      if (data.status === 'COMPILATION_ERROR') {
        setTerminalTab('compiler');
      }
    } catch (err: any) {
      setJudgeResult({
        status: 'RUNTIME_ERROR',
        passed: false,
        totalPassed: 0,
        totalCases: problem.testcases.length,
        runtime: '0ms',
        memory: '0MB',
        results: [],
        detail: `Runner communication error: ${err.message}`,
      });
    } finally {
      setIsRunningTests(false);
    }
  };

  // Real C++ Submit Solution (Strictly Validated)
  const handleSubmitSolution = async () => {
    setIsRunningTests(true);
    setTerminalTab('tests');
    setSubmissionFeedback(null);

    try {
      const res = await fetch('/api/judge/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          problemId: problem.id,
          code,
          testcases: problem.testcases,
          selectedApproachId,
        }),
      });
      const data = await res.json();
      setJudgeResult(data.judge);

      if (data.solved) {
        setSubmissionFeedback('ACCEPTED! All test cases passed.');
        onProblemSolved(problem.id);
        setTimeout(() => {
          onOpenReflection(problem);
        }, 800);
      } else {
        setSubmissionFeedback(`SUBMISSION REJECTED: ${data.message}`);
        if (data.judge?.status === 'COMPILATION_ERROR') {
          setTerminalTab('compiler');
        }
      }
    } catch (err: any) {
      setSubmissionFeedback(`SUBMISSION ERROR: ${err.message}`);
    } finally {
      setIsRunningTests(false);
    }
  };

  // Bottom Visualizer vs Whiteboard Tab
  const [bottomTab, setBottomTab] = useState<'visualizer' | 'whiteboard'>('visualizer');

  const editorFontSize = user?.settings?.editorFontSize || 13;

  return (
    <div
      className={`flex flex-col w-full ${
        isFocusMode ? 'fixed inset-0 z-50 bg-[var(--bg-surface)] overflow-y-auto' : ''
      }`}
    >
      {/* ========================================================================= */}
      {/* 1. TOP COCKPIT BAR                                                        */}
      {/* ========================================================================= */}
      <div className="w-full bg-[var(--bg-surface-container)] px-4 py-2.5 border-b-2 border-black dark:border-white flex flex-wrap items-center justify-between gap-3 shadow-sm transition-colors">
        {/* Left Problem Info */}
        <div className="flex items-center gap-3">
          <div className="bg-black text-[#10ffa0] dark:bg-white dark:text-black px-2.5 py-1 font-['JetBrains_Mono'] text-[11px] font-bold border border-black dark:border-white shadow-[2px_2px_0px_0px_#000000]">
            PROB {problem.number}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-['Anton'] text-2xl tracking-tight uppercase leading-none text-black dark:text-white">
                {problem.title}
              </span>
              <span className="bg-[#10ffa0] text-black px-2 py-0.5 font-['JetBrains_Mono'] text-[9px] uppercase font-bold border border-black">
                {problem.curriculumLevel}
              </span>
              <span className="bg-black text-white dark:bg-white dark:text-black px-2 py-0.5 font-['JetBrains_Mono'] text-[9px] uppercase font-bold">
                {problem.pattern}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-0.5 font-['JetBrains_Mono'] text-[10px] text-[var(--text-on-surface-variant)]">
              <span className="text-[#006d41] dark:text-[#10ffa0] font-bold">
                {problem.sourceReference || problem.topic}
              </span>
              <span>//</span>
              <span className="font-bold text-black dark:text-white font-['JetBrains_Mono']">
                ELAPSED: {formatTimer(elapsedSeconds)}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Stage Progression Workflow */}
        <div className="flex items-center bg-[var(--bg-surface-container-low)] p-1 border border-black dark:border-white overflow-x-auto max-w-full">
          {stages.map((stage, idx) => {
            const isActive = currentStageIdx === idx;
            return (
              <button
                key={stage}
                onClick={() => setCurrentStageIdx(idx)}
                className={`px-2.5 py-1 font-['JetBrains_Mono'] text-[10px] uppercase font-bold flex items-center gap-1 transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-black text-[#10ffa0] dark:bg-white dark:text-black shadow-[1px_1px_0px_0px_#000000]'
                    : 'text-[var(--text-on-surface-variant)] hover:text-black dark:hover:text-white'
                }`}
              >
                {isActive && <span className="w-1.5 h-1.5 bg-[#10ffa0]"></span>}
                {stage}
              </button>
            );
          })}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={resetCode}
            className="px-2.5 py-1.5 bg-[var(--bg-surface)] text-black dark:text-white border border-black dark:border-white font-['JetBrains_Mono'] text-[10px] font-bold uppercase hover:bg-[var(--bg-surface-container)] flex items-center gap-1 shadow-[2px_2px_0px_0px_#000000]"
            title="Reset code template"
          >
            RESET
          </button>
          <button
            onClick={() => setIsFocusMode(!isFocusMode)}
            className="px-2.5 py-1.5 bg-[var(--bg-surface)] text-black dark:text-white border border-black dark:border-white font-['JetBrains_Mono'] text-[10px] font-bold uppercase hover:bg-[var(--bg-surface-container)] flex items-center gap-1 shadow-[2px_2px_0px_0px_#000000]"
          >
            {isFocusMode ? 'EXIT FOCUS' : 'FOCUS LAB'}
          </button>
          <button
            onClick={onNavigateChronicle}
            className="px-3 py-1.5 bg-black text-white dark:bg-white dark:text-black font-['JetBrains_Mono'] text-[10px] font-bold uppercase hover:opacity-80 flex items-center gap-1 shadow-[2px_2px_0px_0px_#10ffa0]"
          >
            CHRONICLE →
          </button>
        </div>
      </div>

      {/* Submission Feedback Toast / Alert if rejected */}
      {submissionFeedback && (
        <div
          className={`px-4 py-2 font-['JetBrains_Mono'] text-xs font-bold border-b-2 border-black flex items-center justify-between ${
            submissionFeedback.startsWith('ACCEPTED')
              ? 'bg-[#10ffa0] text-[#007144]'
              : 'bg-[#ffdad6] text-[#93000a]'
          }`}
        >
          <span>{submissionFeedback}</span>
          <button onClick={() => setSubmissionFeedback(null)} className="underline">
            DISMISS
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. MAIN 3-PANEL ENGINEERING WORKSPACE                                     */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 p-4 bg-[var(--bg-surface)]">
        {/* ========================================================== */}
        {/* PANEL 1: PROBLEM SPECIFICATION & INTUITION (3 COLS)        */}
        {/* ========================================================== */}
        <div className="xl:col-span-3 flex flex-col gap-3">
          <div className="bg-[var(--bg-surface-container-low)] border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_#000000] dark:shadow-[4px_4px_0px_0px_#ffffff] flex flex-col">
            {/* Tab Header */}
            <div className="flex border-b border-black dark:border-white bg-[var(--bg-surface-container)]">
              <button
                onClick={() => setLeftTab('spec')}
                className={`flex-1 py-2 font-['JetBrains_Mono'] text-[10px] uppercase font-bold text-center transition-colors ${
                  leftTab === 'spec'
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'text-[var(--text-on-surface-variant)] hover:text-black dark:hover:text-white'
                }`}
              >
                STATEMENT
              </button>
              <button
                onClick={() => setLeftTab('approaches')}
                className={`flex-1 py-2 font-['JetBrains_Mono'] text-[10px] uppercase font-bold text-center border-l border-black dark:border-white transition-colors ${
                  leftTab === 'approaches'
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'text-[var(--text-on-surface-variant)] hover:text-black dark:hover:text-white'
                }`}
              >
                APPROACHES
              </button>
              <button
                onClick={() => setLeftTab('hints')}
                className={`flex-1 py-2 font-['JetBrains_Mono'] text-[10px] uppercase font-bold text-center border-l border-black dark:border-white transition-colors ${
                  leftTab === 'hints'
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'text-[var(--text-on-surface-variant)] hover:text-black dark:hover:text-white'
                }`}
              >
                HINTS
              </button>
            </div>

            {/* Tab 1: Statement & Constraints */}
            {leftTab === 'spec' && (
              <div className="p-4 flex flex-col gap-3 overflow-y-auto max-h-[640px]">
                <p className="font-['Work_Sans'] text-[13px] text-black dark:text-white leading-relaxed font-normal">
                  {problem.statement}
                </p>

                {/* Example Cases */}
                <div className="flex flex-col gap-2">
                  <span className="font-['JetBrains_Mono'] text-[10px] font-bold text-[var(--text-on-surface-variant)] uppercase">
                    TESTCASE EXAMPLES:
                  </span>
                  {problem.testcases.map((tc, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-[var(--bg-surface-container)] border border-black dark:border-white font-['JetBrains_Mono'] text-[11px] flex flex-col gap-1"
                    >
                      <div className="flex items-center justify-between text-[10px] text-[var(--text-on-surface-variant)] font-bold">
                        <span>EXAMPLE {idx + 1}</span>
                      </div>
                      <div>
                        <strong className="text-black dark:text-white">Input:</strong>{' '}
                        <span className="text-[#1d4ed8] dark:text-[#60a5fa] font-semibold">{tc.input}</span>
                      </div>
                      <div>
                        <strong className="text-black dark:text-white">Output:</strong>{' '}
                        <span className="text-[#007144] dark:text-[#10ffa0] font-bold">
                          {tc.expectedOutput}
                        </span>
                      </div>
                      {tc.explanation && (
                        <div className="text-[10px] text-[var(--text-on-surface-variant)] italic mt-0.5">
                          {tc.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div className="p-2.5 bg-[var(--bg-surface-container-high)] border border-black dark:border-white font-['JetBrains_Mono'] text-[10px] flex flex-col gap-1">
                  <span className="font-extrabold text-black dark:text-white uppercase">
                    CONSTRAINTS &amp; BOUNDS:
                  </span>
                  {problem.constraints.map((c, i) => (
                    <span key={i} className="text-[var(--text-on-surface)] font-medium">
                      • {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Approaches & Mental Models */}
            {leftTab === 'approaches' && (
              <div className="p-4 flex flex-col gap-3 overflow-y-auto max-h-[640px]">
                <span className="font-['JetBrains_Mono'] text-[10px] font-bold uppercase text-[var(--text-on-surface-variant)]">
                  SELECT YOUR STRATEGIC APPROACH:
                </span>
                <div className="flex flex-col gap-2">
                  {problem.approaches.map((appr) => {
                    const isSelected = selectedApproachId === appr.id;
                    return (
                      <button
                        key={appr.id}
                        onClick={() => {
                          setSelectedApproachId(appr.id);
                          saveProblemProgress(problem.id, undefined, code, appr.id);
                        }}
                        className={`text-left p-2.5 border-2 border-black dark:border-white transition-all flex flex-col gap-1 ${
                          isSelected
                            ? 'bg-black text-white dark:bg-white dark:text-black shadow-[3px_3px_0px_0px_#10ffa0]'
                            : 'bg-[var(--bg-surface-container)] text-[var(--text-on-surface)] hover:bg-[var(--bg-surface-container-high)]'
                        }`}
                      >
                        <span
                          className={`font-['JetBrains_Mono'] text-[10px] uppercase font-bold ${
                            isSelected ? 'text-[#10ffa0] dark:text-[#007144]' : 'text-black dark:text-white'
                          }`}
                        >
                          {appr.name}
                        </span>
                        <span className="font-['Work_Sans'] text-[12px] leading-snug">
                          {appr.description}
                        </span>
                        <span className="font-['JetBrains_Mono'] text-[10px] opacity-80">
                          Time: {appr.timeComplexity} | Space: {appr.spaceComplexity}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div
                  className={`p-2.5 border border-black dark:border-white font-['JetBrains_Mono'] text-[10px] leading-relaxed ${
                    selectedApproach.isOptimal
                      ? 'bg-[#10ffa0] text-[#007144] font-bold'
                      : 'bg-[#ffdad6] text-[#93000a] font-bold'
                  }`}
                >
                  {selectedApproach.feedback}
                </div>

                {/* Common Beginner Traps */}
                {problem.commonMistakes && problem.commonMistakes.length > 0 && (
                  <div className="p-2.5 bg-[#ffdad6]/60 dark:bg-[#ba1a1a]/20 border border-black dark:border-white font-['JetBrains_Mono'] text-[10px] flex flex-col gap-1 mt-1">
                    <span className="font-bold text-[#ba1a1a] dark:text-red-400 uppercase">
                      ⚠️ COMMON BEGINNER TRAPS:
                    </span>
                    {problem.commonMistakes.map((m, i) => (
                      <span key={i} className="text-black dark:text-neutral-200">
                        ✕ {m}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Progressive Socratic Hints */}
            {leftTab === 'hints' && (
              <div className="p-4 flex flex-col gap-2.5 overflow-y-auto max-h-[640px]">
                <span className="font-['JetBrains_Mono'] text-[10px] font-bold uppercase text-[var(--text-on-surface-variant)]">
                  SOCRATIC PROGRESSIVE REVEAL:
                </span>

                {/* Hint 1 */}
                <div className="p-2.5 bg-[var(--bg-surface-container)] border border-black dark:border-white flex flex-col gap-1">
                  <div className="flex items-center justify-between font-['JetBrains_Mono'] text-[10px] font-bold">
                    <span className="text-[#006d41] dark:text-[#10ffa0]">HINT 01 // DIRECTION</span>
                    <span className="text-[var(--text-on-surface-variant)]">UNLOCKED</span>
                  </div>
                  <p className="font-['Work_Sans'] text-[12px]">{problem.hint1 || problem.hints[0]?.content}</p>
                </div>

                {/* Hint 2 */}
                <div
                  onClick={() => revealHint(2)}
                  className={`p-2.5 border border-black dark:border-white flex flex-col gap-1 cursor-pointer transition-all ${
                    unlockedHints[2]
                      ? 'bg-[var(--bg-surface-container)]'
                      : 'bg-[var(--bg-surface-container-high)] shadow-[2px_2px_0px_0px_#000000]'
                  }`}
                >
                  <div className="flex items-center justify-between font-['JetBrains_Mono'] text-[10px] font-bold">
                    <span>HINT 02 // DATA STRUCTURE</span>
                    <span className={unlockedHints[2] ? 'text-[#006d41] dark:text-[#10ffa0]' : 'underline'}>
                      {unlockedHints[2] ? 'UNLOCKED' : 'CLICK TO REVEAL'}
                    </span>
                  </div>
                  <p className="font-['Work_Sans'] text-[12px]">
                    {unlockedHints[2]
                      ? problem.hint2 || problem.hints[1]?.content
                      : '[Hidden: Click to reveal algorithmic invariant hint]'}
                  </p>
                </div>

                {/* Hint 3 */}
                <div
                  onClick={() => unlockedHints[2] && revealHint(3)}
                  className={`p-2.5 border border-black dark:border-white flex flex-col gap-1 transition-all ${
                    unlockedHints[3]
                      ? 'bg-[var(--bg-surface-container)]'
                      : unlockedHints[2]
                      ? 'bg-[var(--bg-surface-container-high)] cursor-pointer'
                      : 'bg-[var(--bg-surface-container-low)] opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between font-['JetBrains_Mono'] text-[10px] font-bold">
                    <span>HINT 03 // BOUNDARY CASE</span>
                    <span>{unlockedHints[3] ? 'UNLOCKED' : '[LOCKED]'}</span>
                  </div>
                  <p className="font-['Work_Sans'] text-[12px]">
                    {unlockedHints[3]
                      ? problem.hint3 || problem.hints[2]?.content
                      : 'Requires Hint 02 unlock first.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================== */}
        {/* PANEL 2: CENTER C++ CODE & EXECUTION TERMINAL (5 COLS)     */}
        {/* ========================================================== */}
        <div className="xl:col-span-5 flex flex-col gap-3">
          <div className="bg-[var(--bg-surface-container-low)] text-[var(--text-on-surface)] p-4 border-2 border-black dark:border-white shadow-[6px_6px_0px_0px_#000000] dark:shadow-[6px_6px_0px_0px_#10ffa0] flex flex-col flex-1 transition-colors">
            {/* Editor Header Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-black/20 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="font-['JetBrains_Mono'] text-[10px] bg-black text-[#10ffa0] dark:bg-white dark:text-black px-2 py-0.5 font-bold uppercase border border-black dark:border-white">
                  C++17 (GCC 12)
                </span>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#006d41] dark:text-[#10ffa0] font-bold">
                  solution.cpp
                </span>
                <span className="font-['JetBrains_Mono'] text-[10px] text-[var(--text-on-surface-variant)] hidden sm:inline">
                  // {code.split('\n').length} LINES
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10ffa0] border border-black"></span>
                <span className="font-['JetBrains_Mono'] text-[10px] text-[var(--text-on-surface-variant)] uppercase font-bold">
                  AUTOSAVED TO DISK
                </span>
              </div>
            </div>

            {/* Code Workspace Editor Area */}
            <div className="relative flex-1 bg-white dark:bg-[#121315] border-2 border-black dark:border-neutral-700 my-2 overflow-hidden flex min-h-[300px] shadow-[2px_2px_0px_0px_#000000] dark:shadow-none">
              {/* Line Numbers */}
              <div className="w-10 py-3 bg-[#f8fafc] dark:bg-[#0c0d0e] select-none text-[#64748b] dark:text-neutral-500 font-['JetBrains_Mono'] text-[12px] flex flex-col leading-6 text-right pr-2 border-r border-[#cbd5e1] dark:border-neutral-800">
                {code.split('\n').map((_, i) => (
                  <span key={i}>{(i + 1).toString().padStart(2, '0')}</span>
                ))}
              </div>

              {/* Textarea Code Buffer */}
              <textarea
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  saveProblemProgress(problem.id, 'IN_PROGRESS', e.target.value, selectedApproachId);
                }}
                spellCheck={false}
                style={{ fontSize: `${editorFontSize}px` }}
                className="flex-1 p-3 bg-transparent text-[#0f172a] dark:text-[#10ffa0] font-['JetBrains_Mono'] leading-6 resize-none outline-none overflow-x-auto whitespace-pre selection:bg-[#10ffa0] selection:text-black caret-black dark:caret-[#10ffa0]"
                rows={14}
              />
            </div>

            {/* Complexity Hypothesis Selector */}
            <div className="pt-2 bg-[var(--bg-surface-container)] dark:bg-[#1b1c1d] px-3 py-2 border border-black dark:border-neutral-800 flex flex-wrap items-center justify-between gap-2">
              <span className="font-['JetBrains_Mono'] text-[10px] uppercase text-[var(--text-on-surface-variant)] font-bold">
                HYPOTHESIS:
              </span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 font-['JetBrains_Mono'] text-[10px]">
                  <span className="text-[var(--text-on-surface-variant)]">TIME:</span>
                  {['O(1)', 'O(log N)', 'O(N)', 'O(N²)'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setPredictedTime(t)}
                      className={`px-1.5 py-0.5 font-bold uppercase transition-all ${
                        predictedTime === t
                          ? 'bg-black text-[#10ffa0] dark:bg-[#10ffa0] dark:text-black shadow-[1px_1px_0px_0px_#000000]'
                          : 'bg-[var(--bg-surface)] text-[var(--text-on-surface)] border border-black/30 dark:border-white/30'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-1 font-['JetBrains_Mono'] text-[10px]">
                  <span className="text-[var(--text-on-surface-variant)]">SPACE:</span>
                  {['O(1)', 'O(N)'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setPredictedSpace(s)}
                      className={`px-1.5 py-0.5 font-bold uppercase transition-all ${
                        predictedSpace === s
                          ? 'bg-black text-[#10ffa0] dark:bg-[#10ffa0] dark:text-black shadow-[1px_1px_0px_0px_#000000]'
                          : 'bg-[var(--bg-surface)] text-[var(--text-on-surface)] border border-black/30 dark:border-white/30'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Deck Buttons */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleAnalyzeCode}
                  disabled={isAnalyzingCode}
                  className="px-3 py-2 bg-[#ffd000] text-black font-['JetBrains_Mono'] text-[11px] uppercase font-extrabold hover:bg-yellow-400 transition-all border border-black shadow-[3px_3px_0px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-60"
                  title="Fast static analysis of your draft"
                >
                  {isAnalyzingCode ? 'ANALYZING (<50ms)...' : 'ANALYZE DRAFT'}
                </button>

                <button
                  onClick={handleRunCode}
                  disabled={isRunningTests}
                  className="px-3.5 py-2 bg-[#10ffa0] text-black font-['JetBrains_Mono'] text-[11px] uppercase font-extrabold hover:bg-[#54ffa9] transition-all border border-black shadow-[3px_3px_0px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-60"
                >
                  {isRunningTests ? '> COMPILING...' : '> RUN CODE'}
                </button>
              </div>

              <button
                onClick={handleSubmitSolution}
                disabled={isRunningTests}
                className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-['JetBrains_Mono'] text-[11px] uppercase font-extrabold hover:opacity-85 transition-all border border-black dark:border-white shadow-[3px_3px_0px_0px_#10ffa0] active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-60"
              >
                SUBMIT SOLUTION →
              </button>
            </div>

            {/* ========================================================================= */}
            {/* TERMINAL DRAWER (TABS: TEST RESULTS | COMPILER | ANALYSIS)                */}
            {/* ========================================================================= */}
            <div className="mt-3 border-2 border-black dark:border-neutral-700 bg-white dark:bg-[#0d0e10] flex flex-col text-[var(--text-on-surface)]">
              {/* Terminal Tab Bar */}
              <div className="flex items-center justify-between bg-[var(--bg-surface-container)] dark:bg-[#191a1d] px-2 py-1 border-b border-black dark:border-neutral-800 text-[10px] font-['JetBrains_Mono'] font-bold">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setTerminalTab('tests')}
                    className={`px-2 py-1 uppercase transition-colors ${
                      terminalTab === 'tests'
                        ? 'bg-black text-white dark:bg-black dark:text-[#10ffa0] border border-black dark:border-neutral-700'
                        : 'text-[var(--text-on-surface-variant)] hover:text-black dark:hover:text-white'
                    }`}
                  >
                    TEST RESULTS {judgeResult ? `(${judgeResult.totalPassed}/${judgeResult.totalCases})` : ''}
                  </button>
                  <button
                    onClick={() => setTerminalTab('compiler')}
                    className={`px-2 py-1 uppercase transition-colors ${
                      terminalTab === 'compiler'
                        ? 'bg-black text-red-400 border border-black dark:border-neutral-700'
                        : 'text-[var(--text-on-surface-variant)] hover:text-black dark:hover:text-white'
                    }`}
                  >
                    COMPILER OUTPUT {judgeResult?.status === 'COMPILATION_ERROR' ? '(!)' : ''}
                  </button>
                  <button
                    onClick={() => setTerminalTab('analysis')}
                    className={`px-2 py-1 uppercase transition-colors ${
                      terminalTab === 'analysis'
                        ? 'bg-black text-yellow-300 border border-black dark:border-neutral-700'
                        : 'text-[var(--text-on-surface-variant)] hover:text-black dark:hover:text-white'
                    }`}
                  >
                    DRAFT ANALYSIS
                  </button>
                </div>
                {judgeResult && (
                  <span
                    className={`px-2 py-0.5 uppercase text-[9px] font-bold border border-black ${
                      judgeResult.passed
                        ? 'bg-[#10ffa0] text-black'
                        : judgeResult.status === 'COMPILATION_ERROR'
                        ? 'bg-red-500 text-white'
                        : 'bg-yellow-400 text-black'
                    }`}
                  >
                    {judgeResult.status}
                  </span>
                )}
              </div>

              {/* Terminal Tab 1: Test Results */}
              {terminalTab === 'tests' && (
                <div className="p-3 font-['JetBrains_Mono'] text-[11px] flex flex-col gap-2 max-h-48 overflow-y-auto">
                  {judgeResult ? (
                    <>
                      <div className="flex items-center justify-between text-[10px] text-[var(--text-on-surface-variant)] pb-1 border-b border-black/20 dark:border-neutral-800">
                        <span>
                          EXECUTION: {judgeResult.totalPassed}/{judgeResult.totalCases} CASES PASSED
                        </span>
                        <span>RUNTIME: {judgeResult.runtime} | MEMORY: {judgeResult.memory}</span>
                      </div>
                      {judgeResult.results.map((res) => (
                        <div
                          key={res.caseIndex}
                          className={`p-2 border text-xs flex flex-col gap-0.5 ${
                            res.passed
                              ? 'border-[#006d41] bg-[#e6f9f0] dark:bg-[#002213] text-[#007144] dark:text-[#10ffa0]'
                              : 'border-[#ba1a1a] bg-[#fee2e2] dark:bg-[#2b0c0c] text-[#991b1b] dark:text-red-200'
                          }`}
                        >
                          <div className="flex items-center justify-between font-bold text-[10px]">
                            <span>CASE #{res.caseIndex}</span>
                            <span className={res.passed ? 'text-[#007144] dark:text-[#10ffa0]' : 'text-[#ba1a1a] dark:text-red-400'}>
                              {res.passed ? '✓ PASSED' : '✕ WRONG ANSWER'}
                            </span>
                          </div>
                          <div>Input: {res.input}</div>
                          <div>Expected: {res.expectedOutput}</div>
                          <div>Actual: {res.actualOutput}</div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="text-[var(--text-on-surface-variant)] italic py-2">
                      Click RUN CODE to compile with GCC and execute against real test cases.
                    </div>
                  )}
                </div>
              )}

              {/* Terminal Tab 2: Compiler Output */}
              {terminalTab === 'compiler' && (
                <div className="p-3 font-['JetBrains_Mono'] text-[11px] max-h-48 overflow-y-auto bg-[#fff1f2] dark:bg-[#0a0a0c] text-[#991b1b] dark:text-red-300 whitespace-pre-wrap border-t border-black/10 dark:border-transparent">
                  {judgeResult?.compileError ||
                    'GCC Diagnostic: Clean. No syntax or compilation errors reported.'}
                </div>
              )}

              {/* Terminal Tab 3: Draft Analysis */}
              {terminalTab === 'analysis' && (
                <div className="p-3 font-['JetBrains_Mono'] text-[11px] max-h-48 overflow-y-auto flex flex-col gap-2">
                  {codeAnalysis ? (
                    <>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-[#006d41] dark:text-[#10ffa0] font-bold">SEMANTIC CHECK:</span>
                        <span
                          className={`px-1.5 py-0.5 font-bold uppercase border border-black ${
                            codeAnalysis.approachEvaluation === 'OPTIMAL'
                              ? 'bg-[#10ffa0] text-black'
                              : 'bg-yellow-400 text-black'
                          }`}
                        >
                          {codeAnalysis.approachEvaluation}
                        </span>
                      </div>
                      <p className="text-[var(--text-on-surface)]">{codeAnalysis.conceptualUnderstanding}</p>
                      {codeAnalysis.likelyBugsOrMistakes?.length > 0 && (
                        <div className="text-[#991b1b] dark:text-red-400 text-[10px]">
                          <strong>POTENTIAL TRAPS:</strong>
                          {codeAnalysis.likelyBugsOrMistakes.map((b, i) => (
                            <div key={i}>• {b}</div>
                          ))}
                        </div>
                      )}
                      {codeAnalysis.missingEdgeCases?.length > 0 && (
                        <div className="text-[#854d0e] dark:text-yellow-400 text-[10px]">
                          <strong>UNCHECKED BOUNDARIES:</strong>
                          {codeAnalysis.missingEdgeCases.map((e, i) => (
                            <div key={i}>• {e}</div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-[var(--text-on-surface-variant)] italic py-2">
                      Click ANALYZE DRAFT for instantaneous structural verification (&lt;50ms).
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* PANEL 3: LIVE SOCRATIC AI MENTOR (4 COLS)                  */}
        {/* ========================================================== */}
        <div className="xl:col-span-4 flex flex-col gap-3">
          <div className="bg-[var(--bg-surface-container-low)] p-4 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_#000000] dark:shadow-[4px_4px_0px_0px_#ffffff] flex flex-col gap-3 flex-1">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 bg-[var(--bg-surface-container)] px-2 py-1.5 border border-black dark:border-white">
              <div className="flex items-center gap-2">
                <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider font-extrabold">
                  SOCRATIC MENTOR // LIVE
                </span>
              </div>
              <span className="bg-black text-[#10ffa0] dark:bg-white dark:text-black text-[10px] font-['JetBrains_Mono'] px-2 py-0.5 uppercase font-bold">
                ZERO SPOILERS
              </span>
            </div>

            {/* Conversation Feed */}
            <div
              ref={chatScrollRef}
              className="flex flex-col gap-2 min-h-[380px] max-h-[460px] overflow-y-auto pr-1 border border-black dark:border-white bg-[var(--bg-surface-container-lowest)] p-2.5"
            >
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-2.5 font-['Work_Sans'] text-[12px] leading-relaxed border border-black dark:border-white ${
                    msg.sender === 'user'
                      ? 'bg-black text-white dark:bg-white dark:text-black self-end max-w-[85%] shadow-[2px_2px_0px_0px_#10ffa0]'
                      : 'bg-[var(--bg-surface-container)] text-[var(--text-on-surface)] self-start max-w-[95%] shadow-[2px_2px_0px_0px_#000000]'
                  }`}
                >
                  <strong
                    className={`font-['JetBrains_Mono'] text-[10px] block mb-0.5 uppercase ${
                      msg.sender === 'user' ? 'text-[#10ffa0] dark:text-[#007144]' : 'text-black dark:text-white'
                    }`}
                  >
                    {msg.sender === 'user' ? 'YOU:' : 'MENTOR // SOCRATES:'}
                  </strong>
                  {msg.text}
                </div>
              ))}
              {isMentorLoading && (
                <div className="p-2 bg-[var(--bg-surface-container)] border border-black dark:border-white text-[11px] font-['JetBrains_Mono'] italic animate-pulse">
                  MENTOR // SOCRATES is analyzing your reasoning...
                </div>
              )}
            </div>

            {/* Contextual Quick Prompts */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                `Why does ${problem.pattern} work?`,
                'How to handle duplicate inputs?',
                'Check my edge cases',
                'Guide me on time complexity',
              ].map((pill) => (
                <button
                  key={pill}
                  onClick={() => sendMentorMessage(pill)}
                  className="text-left px-2 py-1 bg-[var(--bg-surface-container)] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border border-black dark:border-white font-['JetBrains_Mono'] text-[10px] transition-colors"
                >
                  "{pill}"
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMentorMessage(mentorInput);
              }}
              className="flex gap-1.5 mt-1"
            >
              <input
                type="text"
                value={mentorInput}
                onChange={(e) => setMentorInput(e.target.value)}
                placeholder="Ask Socrates a targeted reasoning question..."
                className="flex-1 bg-white dark:bg-neutral-900 border border-black dark:border-white px-3 py-1.5 font-['Work_Sans'] text-[12px] text-black dark:text-white outline-none focus:ring-2 focus:ring-[#10ffa0]"
              />
              <button
                type="submit"
                disabled={isMentorLoading}
                className="px-3 py-1.5 bg-black text-[#10ffa0] dark:bg-white dark:text-black font-['JetBrains_Mono'] text-[10px] uppercase font-bold hover:opacity-80 border border-black dark:border-white shadow-[2px_2px_0px_0px_#000000]"
              >
                SEND
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. BOTTOM DATA STRUCTURE VISUALIZER & WHITEBOARD                          */}
      {/* ========================================================================= */}
      <div className="p-4 bg-[var(--bg-surface)] pt-0">
        <div className="bg-[var(--bg-surface-container-low)] p-4 border-2 border-black dark:border-white shadow-[6px_6px_0px_0px_#000000] dark:shadow-[6px_6px_0px_0px_#ffffff] flex flex-col gap-3">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 bg-[var(--bg-surface-container)] px-3 py-2 border border-black dark:border-white">
            <span className="font-['JetBrains_Mono'] text-[12px] uppercase font-bold">
              MENTAL TRACE // {problem.pattern}
            </span>

            {/* Toggle Simulator vs Whiteboard */}
            <div className="flex items-center gap-1 bg-[var(--bg-surface-container-high)] p-1 border border-black dark:border-white">
              <button
                onClick={() => setBottomTab('visualizer')}
                className={`px-3 py-1 font-['JetBrains_Mono'] text-[10px] font-bold uppercase transition-all ${
                  bottomTab === 'visualizer'
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-white dark:bg-black text-black dark:text-white'
                }`}
              >
                DATA STRUCTURE TRACER
              </button>
              <button
                onClick={() => setBottomTab('whiteboard')}
                className={`px-3 py-1 font-['JetBrains_Mono'] text-[10px] font-bold uppercase transition-all ${
                  bottomTab === 'whiteboard'
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-white dark:bg-black text-black dark:text-white'
                }`}
              >
                FREEHAND WHITEBOARD
              </button>
            </div>
          </div>

          {bottomTab === 'visualizer' ? (
            <DynamicDataVisualizer problem={problem} />
          ) : (
            <div className="flex flex-col gap-2">
              {problem.visualizationPrompt && (
                <div className="p-3 bg-[var(--bg-surface-container)] border border-black dark:border-white font-['JetBrains_Mono'] text-[11px] shadow-[2px_2px_0px_0px_#000000]">
                  <strong className="text-[#006d41] dark:text-[#10ffa0] block mb-1">
                    SKETCH GUIDANCE // BLUEPRINT:
                  </strong>
                  <p className="font-['Work_Sans'] text-black dark:text-white text-[12px]">
                    {problem.visualizationPrompt}
                  </p>
                </div>
              )}
              <WhiteboardCanvas initialText={problem.title} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
