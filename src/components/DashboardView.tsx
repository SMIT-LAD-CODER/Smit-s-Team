import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Problem } from '../types';
import { SYLLABUS_UNITS } from '../data/curriculum';
import {
  Brain,
  Compass,
  ArrowRight,
  Sparkles,
  Flame,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Target,
  BookOpen,
} from 'lucide-react';

interface DashboardViewProps {
  onContinueProblem: (problemId: string) => void;
  onNavigateProblems: () => void;
  onNavigateContest: () => void;
  onOpenReflection: () => void;
  allProblems: Problem[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onContinueProblem,
  onNavigateProblems,
  onNavigateContest,
  onOpenReflection,
  allProblems,
}) => {
  const { user } = useAuth();

  // Find currently active problem (or default to two-sum)
  const currentProbId = 'two-sum';
  const currentProblem = allProblems.find((p) => p.id === currentProbId) || allProblems[0];

  const solvedSet = new Set(
    Object.entries(user?.progress || {})
      .filter(([_, p]) => p.status === 'SOLVED')
      .map(([id]) => id)
  );

  const solvedCount = solvedSet.size;
  const attemptedCount = Object.keys(user?.progress || {}).length;

  // Explainable "What Should I Solve Next?" engine
  const getExplainableRecommendation = () => {
    for (const prob of allProblems) {
      if (!solvedSet.has(prob.id)) {
        const prereqsMet = (prob.prerequisiteProblems || []).every((pr) => solvedSet.has(pr));
        let reason = `Progresses your ${prob.topic} curriculum. Reinforces the ${prob.pattern} pattern from the syllabus.`;
        if (prob.id === 'circular-queue-buffer') {
          reason = `Directly follows your Unit 1 foundations. Solves the classical "false overflow" flaw in FIFO memory buffers from Practical 5.`;
        } else if (prob.id === 'valid-parentheses') {
          reason = `Builds on LIFO state mechanics from Unit 2. Demonstrates compiler syntax verification before moving to tree traversals.`;
        } else if (prob.id === 'reverse-linked-list') {
          reason = `Prepares you for pointer-based tree nodes in Unit 4. Teaches in-place pointer re-linking without memory leaks (Practical 6).`;
        } else if (prob.id === 'bst-traversal-validation') {
          reason = `Applies recursive tree traversal from Practical 8. Proves the global Inorder monotonically increasing BST invariant.`;
        } else if (prob.id === 'binary-search-bounds') {
          reason = `Foundational divide-and-conquer from Unit 6. Re-enforces safe midpoint arithmetic and left <= right convergence (Practical 11).`;
        }
        return {
          problem: prob,
          reason,
          prereqsMet,
        };
      }
    }
    return {
      problem: allProblems[0],
      reason: `Foundational anchor problem from Unit 1.`,
      prereqsMet: true,
    };
  };

  const nextRecommendation = getExplainableRecommendation();

  // Weekly Coach Report
  const weeklyReport = {
    thisWeek: {
      problemsAttempted: attemptedCount || 2,
      problemsSolved: solvedCount || 1,
      topicsPracticed: ['Unit 1: Arrays & Complexity', 'Unit 2: Stacks & Queues'],
      strongestTopic: 'Unit 1: Arrays & Hash Lookups (O(1) Time Mastery)',
      weakestTopic: 'Unit 2: Circular Buffer False-Overflow Handling',
      mostCommonMistake: 'Failing to check complement existence BEFORE inserting current element',
      hintsUsedCount: 3,
      revisionNeededList: ['Binary Search Boundary Convergence (left <= right)'],
    },
    nextWeek: {
      recommendedTopic: 'Unit 3: Linked Lists & Pointer Re-linking (Practical 6)',
      recommendedProblems: [
        { id: 'reverse-linked-list', title: 'In-Place Pointer Re-linking (Practical 6)' },
        { id: 'bst-traversal-validation', title: 'BST Inorder Traversal Invariant (Practical 8)' },
      ],
      strategicReason:
        'Mastering dynamic pointer re-linking now will make binary search tree recursions in Unit 4 straightforward and prevent dangling pointer traps.',
    },
  };

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-[var(--bg-surface)] text-[var(--text-on-surface)] p-6 sm:p-10 lg:p-14 transition-colors">
      {/* Top Welcome Ribbon */}
      <div className="border-b-2 border-black dark:border-white pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="font-['JetBrains_Mono'] text-[10px] text-[var(--text-on-surface-variant)] uppercase tracking-widest mb-1.5 font-bold flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#10ffa0] inline-block border border-black"></span>
            <span>PERSONAL WORKSPACE HUB // STUDENT SESSION ACTIVE</span>
          </div>
          <h1 className="font-['Anton'] text-4xl sm:text-6xl uppercase tracking-tight leading-none text-black dark:text-white">
            WELCOME BACK, {user?.name.toUpperCase() || 'STUDENT'}.
          </h1>
          <p className="font-['Work_Sans'] text-sm text-[var(--text-on-surface-variant)] mt-2">
            {user?.college || 'Computer Science Department'} • Daily Goal: {user?.settings?.dailyGoal || 2} Problems •{' '}
            {user?.streakCount || 7} Day Thinking Streak
          </p>
        </div>

        {/* Quick Streak & Heap Status */}
        <div className="p-3 bg-[var(--bg-surface-container)] border-2 border-black dark:border-white font-['JetBrains_Mono'] text-[11px] shadow-[4px_4px_0px_0px_#000000] dark:shadow-[4px_4px_0px_0px_#ffffff]">
          <div className="flex items-center gap-2 font-bold text-[#007144] dark:text-[#10ffa0]">
            <Flame className="w-4 h-4 text-[#ffd000] fill-[#ffd000]" />
            <span>{user?.streakCount || 7} DAY THINKING STREAK</span>
          </div>
          <div className="text-[10px] text-[var(--text-on-surface-variant)] mt-0.5">
            SOLVED: {solvedCount} // ATTEMPTED: {attemptedCount} // SYLLABUS: 6 UNITS
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* EXPLAINABLE "WHAT SHOULD I SOLVE NEXT?" (COACH RECOMMENDATION)            */}
      {/* ========================================================================= */}
      <div className="mb-10 p-6 sm:p-8 bg-[#10ffa0]/15 dark:bg-[#10ffa0]/10 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_#000000] dark:shadow-[8px_8px_0px_0px_#10ffa0] relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex flex-col gap-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-black text-[#10ffa0] dark:bg-white dark:text-black px-2.5 py-0.5 font-['JetBrains_Mono'] text-[10px] font-extrabold uppercase border border-black dark:border-white flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-[#10ffa0] dark:text-black" />
                EXPLAINABLE RECOMMENDATION // WHAT TO SOLVE NEXT
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-[#007144] dark:text-[#10ffa0]">
                {nextRecommendation.problem.curriculumLevel}
              </span>
            </div>

            <h2 className="font-['Anton'] text-3xl sm:text-4xl uppercase tracking-tight leading-none text-black dark:text-white">
              {nextRecommendation.problem.number} {nextRecommendation.problem.title}
            </h2>

            <div className="p-3 bg-white dark:bg-black border-2 border-black dark:border-white font-['JetBrains_Mono'] text-[12px] shadow-[2px_2px_0px_0px_#000000]">
              <span className="text-[#007144] dark:text-[#10ffa0] font-bold block mb-1">
                WHY THIS PROBLEM NEXT?
              </span>
              <p className="font-['Work_Sans'] text-black dark:text-white leading-relaxed text-[13px]">
                {nextRecommendation.reason}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[11px] font-['JetBrains_Mono'] text-[var(--text-on-surface-variant)]">
              <span>Syllabus Anchor: <strong>{nextRecommendation.problem.sourceReference}</strong></span>
              <span>•</span>
              <span>Pattern: <strong>{nextRecommendation.problem.pattern}</strong></span>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full sm:w-auto">
            <button
              onClick={() => onContinueProblem(nextRecommendation.problem.id)}
              className="px-8 py-4 bg-black text-[#10ffa0] dark:bg-white dark:text-black font-['JetBrains_Mono'] text-sm uppercase font-extrabold border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_#10ffa0] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-center flex items-center justify-center gap-2"
            >
              <span>SOLVE THIS PROBLEM</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-center font-['JetBrains_Mono'] text-[10px] text-[var(--text-on-surface-variant)]">
              Pedagogically verified prerequisite progression
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: CONTINUE THINKING (HERO ACTIVE WORKSPACE CALLOUT)               */}
      {/* ========================================================================= */}
      <div className="mb-10 p-6 sm:p-8 bg-[var(--bg-surface-container-low)] border-3 border-black dark:border-white shadow-[6px_6px_0px_0px_#000000] dark:shadow-[6px_6px_0px_0px_#ffffff] relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="bg-black text-[#10ffa0] dark:bg-white dark:text-black px-2.5 py-1 font-['JetBrains_Mono'] text-[10px] font-extrabold uppercase border border-black dark:border-white">
                RESUME ACTIVE WORKSPACE
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] text-[var(--text-on-surface-variant)] font-bold">
                PROB {currentProblem.number}
              </span>
            </div>

            <h3 className="font-['Anton'] text-2xl sm:text-3xl uppercase tracking-tight leading-none text-black dark:text-white">
              {currentProblem.title}
            </h3>

            <p className="font-['Work_Sans'] text-xs sm:text-sm text-[var(--text-on-surface-variant)] leading-relaxed">
              {currentProblem.statement}
            </p>

            {/* Cognitive Pipeline Breadcrumb */}
            <div className="flex flex-wrap items-center gap-2 pt-1 font-['JetBrains_Mono'] text-[10px] font-bold">
              <span className="px-2 py-0.5 bg-[#10ffa0] text-black border border-black">THINK ✓</span>
              <span className="text-[#45474a]">→</span>
              <span className="px-2 py-0.5 bg-[#10ffa0] text-black border border-black">DRAW ✓</span>
              <span className="text-[#45474a]">→</span>
              <span className="px-2 py-0.5 bg-black text-[#10ffa0] dark:bg-white dark:text-black border border-black dark:border-white animate-pulse">
                CODE (ACTIVE)
              </span>
              <span className="text-[#45474a]">→</span>
              <span className="px-2 py-0.5 bg-[var(--bg-surface-container)] text-[var(--text-on-surface-variant)] border border-black/40">
                REFLECT
              </span>
            </div>
          </div>

          <button
            onClick={() => onContinueProblem(currentProblem.id)}
            className="px-6 py-3.5 bg-black text-white dark:bg-white dark:text-black font-['JetBrains_Mono'] text-sm uppercase font-extrabold border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_#10ffa0] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-center whitespace-nowrap"
          >
            RESUME WORKBENCH →
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: WEEKLY DSA COACH REPORT (INSIGHTS & PRESCRIPTION)               */}
      {/* ========================================================================= */}
      <div className="mb-10 bg-[var(--bg-surface-container)] border-3 border-black dark:border-white p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000000] dark:shadow-[6px_6px_0px_0px_#ffffff]">
        <div className="flex flex-wrap items-center justify-between pb-4 border-b-2 border-black dark:border-white mb-6 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-['Anton'] text-2xl uppercase">WEEKLY DSA COACH REPORT</span>
            <span className="text-[10px] font-['JetBrains_Mono'] bg-[#ffd000] text-black px-2 py-0.5 font-bold uppercase border border-black">
              WEEK 04 SESSION
            </span>
          </div>
          <span className="font-['JetBrains_Mono'] text-[11px] text-[var(--text-on-surface-variant)] font-bold">
            DIAGNOSTICS &amp; PRESCRIPTIVE ROADMAP
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* This Week Diagnostics */}
          <div className="bg-white dark:bg-black p-5 border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_#000000]">
            <div className="font-['JetBrains_Mono'] text-[11px] font-extrabold uppercase text-[#006d41] dark:text-[#10ffa0] pb-2 border-b border-black/10 dark:border-white/10 mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              THIS WEEK: PERFORMANCE SIGNALS
            </div>

            <div className="space-y-2.5 font-['JetBrains_Mono'] text-[11px]">
              <div className="flex justify-between py-1 border-b border-black/5 dark:border-white/5">
                <span className="text-[var(--text-on-surface-variant)]">PROBLEMS ATTEMPTED:</span>
                <strong className="text-black dark:text-white">{weeklyReport.thisWeek.problemsAttempted}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-black/5 dark:border-white/5">
                <span className="text-[var(--text-on-surface-variant)]">PROBLEMS SOLVED:</span>
                <strong className="text-[#006d41] dark:text-[#10ffa0]">{weeklyReport.thisWeek.problemsSolved}</strong>
              </div>
              <div className="py-1 border-b border-black/5 dark:border-white/5">
                <span className="text-[var(--text-on-surface-variant)] block text-[10px]">STRONGEST TOPIC:</span>
                <span className="text-black dark:text-white font-bold">{weeklyReport.thisWeek.strongestTopic}</span>
              </div>
              <div className="py-1 border-b border-black/5 dark:border-white/5">
                <span className="text-[#ba1a1a] block text-[10px] font-bold">WEAKEST TOPIC (NEEDS REVIEW):</span>
                <span className="text-black dark:text-white font-bold">{weeklyReport.thisWeek.weakestTopic}</span>
              </div>
              <div className="py-1">
                <span className="text-[#ba1a1a] block text-[10px] font-bold">MOST FREQUENT TRAP:</span>
                <span className="text-black dark:text-white font-['Work_Sans'] text-[12px]">{weeklyReport.thisWeek.mostCommonMistake}</span>
              </div>
            </div>
          </div>

          {/* Next Week Action Plan */}
          <div className="bg-white dark:bg-black p-5 border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_#000000]">
            <div className="font-['JetBrains_Mono'] text-[11px] font-extrabold uppercase text-[#1d4ed8] dark:text-[#60a5fa] pb-2 border-b border-black/10 dark:border-white/10 mb-3 flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              NEXT WEEK: STRATEGIC ACTION PLAN
            </div>

            <div className="space-y-3 font-['JetBrains_Mono'] text-[11px]">
              <div>
                <span className="text-[var(--text-on-surface-variant)] text-[10px] block">RECOMMENDED SYLLABUS UNIT:</span>
                <strong className="text-black dark:text-white text-[12px]">{weeklyReport.nextWeek.recommendedTopic}</strong>
              </div>

              <div>
                <span className="text-[var(--text-on-surface-variant)] text-[10px] block mb-1">TARGET PROBLEMS:</span>
                <div className="space-y-1">
                  {weeklyReport.nextWeek.recommendedProblems.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => onContinueProblem(p.id)}
                      className="w-full text-left p-2 bg-[var(--bg-surface-container)] hover:bg-[#10ffa0] hover:text-black border border-black dark:border-white transition-colors flex justify-between items-center"
                    >
                      <span className="font-bold">{p.title}</span>
                      <span>→</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-2.5 bg-[var(--bg-surface-container)] border border-black dark:border-white">
                <span className="text-[10px] font-bold text-[#1d4ed8] dark:text-[#60a5fa] block uppercase">
                  COACH STRATEGIC REASON:
                </span>
                <p className="font-['Work_Sans'] text-[12px] text-black dark:text-white mt-1 leading-snug">
                  {weeklyReport.nextWeek.strategicReason}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: RECENT REFLECTIONS & WEEKLY CONTEST BANNER                     */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Reflection History Drawer */}
        <div className="lg:col-span-7 bg-[var(--bg-surface-container)] p-6 border-2 border-black dark:border-white shadow-[6px_6px_0px_0px_#000000] dark:shadow-[6px_6px_0px_0px_#ffffff]">
          <div className="flex items-center justify-between pb-3 border-b-2 border-black dark:border-white mb-4">
            <span className="font-['Anton'] text-2xl uppercase">RECENT MENTAL REFLECTIONS</span>
            <span className="font-['JetBrains_Mono'] text-[10px] bg-black text-[#10ffa0] dark:bg-white dark:text-black px-2 py-0.5 font-bold uppercase">
              ANTI-EVAPORATION LOG
            </span>
          </div>

          {user?.reflections && user.reflections.length > 0 ? (
            <div className="space-y-3 font-['JetBrains_Mono'] text-[11px]">
              {user.reflections.slice(0, 3).map((ref, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-[var(--bg-surface)] border border-black dark:border-white flex flex-col gap-1.5 shadow-[2px_2px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#ffffff]"
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-black dark:text-white uppercase font-extrabold text-[12px]">
                      {ref.problemTitle}
                    </span>
                    <span className="text-[10px] text-[var(--text-on-surface-variant)]">
                      {ref.date} • REVISION: {ref.nextRevisionDate}
                    </span>
                  </div>
                  <div className="text-[#006d41] dark:text-[#10ffa0] leading-snug">
                    <strong>PATTERN:</strong> {ref.corePattern}
                  </div>
                  <div className="text-[#ba1a1a] leading-snug">
                    <strong>TRAP:</strong> {ref.trapEncountered}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center font-['JetBrains_Mono'] text-sm text-[var(--text-on-surface-variant)] border-2 border-dashed border-black/30">
              NO REFLECTIONS RECORDED YET. SOLVE A PROBLEM TO LOCK YOUR LEARNING.
            </div>
          )}
        </div>

        {/* Weekly Contest Sprint Widget */}
        <div className="lg:col-span-5 bg-[#ba1a1a] text-white p-6 border-2 border-black dark:border-white shadow-[6px_6px_0px_0px_#000000] dark:shadow-[6px_6px_0px_0px_#ffffff] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b-2 border-white mb-4">
              <span className="font-['Anton'] text-2xl uppercase">COLLEGE SPRINT: WEEK 04</span>
              <span className="font-['JetBrains_Mono'] text-[10px] bg-white text-[#ba1a1a] font-bold px-2 py-0.5">
                LIVE ARENA
              </span>
            </div>
            <p className="font-['Work_Sans'] text-sm text-red-100 leading-relaxed mb-4">
              3 curated syllabus problems ranked by Big-O memory and time efficiency. Represent <strong>{user?.college || 'your college'}</strong>.
            </p>
            <div className="p-3 bg-black/40 border border-white font-['JetBrains_Mono'] text-[11px] space-y-1">
              <div>// SPRINT STATUS: CLOSES IN 14H 22M</div>
              <div>// YOUR CURRENT POSITION: RANK #03 [16 / 18]</div>
            </div>
          </div>

          <button
            onClick={onNavigateContest}
            className="mt-6 w-full py-3 bg-white text-[#ba1a1a] font-['JetBrains_Mono'] text-[12px] font-extrabold uppercase border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:bg-neutral-100 transition-all"
          >
            ENTER TIMED SPRINT ARENA →
          </button>
        </div>
      </div>
    </div>
  );
};
