import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from 'motion/react';
import {
  Brain,
  Compass,
  Code2,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Terminal,
  Activity,
  ChevronDown,
  Eye,
  GitCommit,
  Flame,
} from 'lucide-react';

interface EditorialChronicleProps {
  onLaunchWorkspace: () => void;
  onSelectProblem: (problemId: string) => void;
}

export const EditorialChronicle: React.FC<EditorialChronicleProps> = ({
  onLaunchWorkspace,
  onSelectProblem,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Overall chronicle scroll tracking
  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // Track raw scroll progress percentage for HUD
  const [scrollPercent, setScrollPercent] = useState(0);
  const [scrollPixels, setScrollPixels] = useState(0);

  useEffect(() => {
    const unsubProgress = scrollYProgress.on('change', (latest) => {
      setScrollPercent(Math.round(latest * 100));
    });
    const unsubY = scrollY.on('change', (latest) => {
      setScrollPixels(Math.round(latest));
    });
    return () => {
      unsubProgress();
      unsubY();
    };
  }, [scrollYProgress, scrollY]);

  // Active scene detection based on scroll percentage
  const getActiveSceneInfo = () => {
    if (scrollPercent < 12) return { num: '01', title: 'GENESIS NODE', stage: 'THINK' };
    if (scrollPercent < 26) return { num: '02', title: 'THE MANIFESTO', stage: 'THINK' };
    if (scrollPercent < 42) return { num: '03', title: 'THE VOID CYCLE', stage: 'PLAN' };
    if (scrollPercent < 56) return { num: '04', title: 'LOGIC LAB', stage: 'PLAN' };
    if (scrollPercent < 72) return { num: '05', title: 'VISUALIZE CANVAS', stage: 'VISUALIZE' };
    if (scrollPercent < 85) return { num: '06', title: 'SOCRATIC MENTOR', stage: 'CODE' };
    if (scrollPercent < 94) return { num: '07', title: 'PROGRESS LEDGER', stage: 'REFLECT' };
    return { num: '08', title: 'CANONICAL ARCHIVE', stage: 'PROGRESS' };
  };

  const activeScene = getActiveSceneInfo();

  // Section 01: Entry Scene transforms
  const entryRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: entryProgress } = useScroll({
    target: entryRef,
    offset: ['start start', 'end start'],
  });
  const entryLineDraw = useTransform(entryProgress, [0, 0.4], [0, 1]);
  const entryNodeScale = useTransform(entryProgress, [0, 0.5], [1, 1.15]);
  const entryBgY = useTransform(entryProgress, [0, 1], ['0%', '25%']);

  // Section 02: Manifesto Hero scroll choreography
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  });
  const heroTextLeftX = useTransform(heroProgress, [0.1, 0.4], [-80, 0]);
  const heroTextRightX = useTransform(heroProgress, [0.1, 0.4], [80, 0]);
  const heroBadgeRotate = useTransform(heroProgress, [0.1, 0.4], [-6, -1]);
  const heroMarqueeX = useTransform(heroProgress, [0, 1], ['0%', '-50%']);

  // Section 03: The Void Cycle transforms
  const voidRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: voidProgress } = useScroll({
    target: voidRef,
    offset: ['start end', 'end start'],
  });
  const voidStage1 = useTransform(voidProgress, [0.15, 0.3], [0, 1]);
  const voidStage2 = useTransform(voidProgress, [0.25, 0.4], [0, 1]);
  const voidStage3 = useTransform(voidProgress, [0.35, 0.5], [0, 1]);
  const voidStage4 = useTransform(voidProgress, [0.45, 0.6], [0, 1]);
  const voidStage5 = useTransform(voidProgress, [0.55, 0.7], [0, 1]);

  // Section 04: Interactive Intuition Engine state
  const [intuitionFeedback, setIntuitionFeedback] = useState<string | null>(null);
  const [selectedIntuition, setSelectedIntuition] = useState<'brute' | 'hash' | 'twopointer' | null>(null);

  const handleIntuitionClick = (type: 'brute' | 'hash' | 'twopointer') => {
    setSelectedIntuition(type);
    if (type === 'brute') {
      setIntuitionFeedback(
        '[EVALUATION: SUB-OPTIMAL]: O(N²) time explodes on large inputs (N = 10⁴ will hit Time Limit Exceeded). You are blindly re-scanning elements already encountered.'
      );
    } else if (type === 'hash') {
      setIntuitionFeedback(
        '[EVALUATION: ARCHITECTURAL ELEGANCE]: O(N) runtime. By caching visited numbers in a hash registry, lookup cost for (target - current) drops to instantaneous O(1).'
      );
    } else if (type === 'twopointer') {
      setIntuitionFeedback(
        '[EVALUATION: PARTIALLY VALID]: Sorting cost O(N log N) is better than O(N²), but sorting destroys the original indices requested by Two Sum unless you store coordinate pairs.'
      );
    }
  };

  // Section 05: Visual Two-Pointer Array stepper
  const [visualStep, setVisualStep] = useState(0);

  // Section 06: Socratic Hint Demo state
  const [unlockedHintLevel, setUnlockedHintLevel] = useState<number>(2);
  const [interactiveQuestion, setInteractiveQuestion] = useState<string | null>(null);
  const [mentorTyping, setMentorTyping] = useState(false);

  const simulateMentorResponse = (query: string) => {
    setMentorTyping(true);
    setInteractiveQuestion(null);
    setTimeout(() => {
      setMentorTyping(false);
      if (query.includes('hash')) {
        setInteractiveQuestion(
          'Socratic Mentor: "Exactly. If you store the number as the key, what should the value be so you can return the final indices in O(1)?"'
        );
      } else if (query.includes('loop') || query.includes('nested')) {
        setInteractiveQuestion(
          'Socratic Mentor: "If you run two loops, what happens when array size N = 100,000? How can memory help you remember past elements instead of re-scanning?"'
        );
      } else {
        setInteractiveQuestion(
          'Socratic Mentor: "Before jumping into code, write out the equation: complement = target - nums[i]. What lookup structure checks complements in O(1)?"'
        );
      }
    }, 600);
  };

  // Quick scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col bg-[var(--bg-surface)] text-[var(--text-on-surface)] transition-colors duration-200 relative selection:bg-[#10ffa0] selection:text-black"
    >
      {/* ========================================================================= */}
      {/* TACTILE CINEMATIC SCROLL HUD (STICKY SUB-HEADER)                           */}
      {/* ========================================================================= */}
      <div className="sticky top-20 left-0 right-0 z-40 bg-[var(--bg-surface)]/95 backdrop-blur-md border-b-2 border-black dark:border-white shadow-[0_4px_10px_rgba(0,0,0,0.05)] transition-colors">
        {/* Neon Scrub Progress Track */}
        <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 relative overflow-hidden">
          <motion.div
            className="h-full bg-[#10ffa0] origin-left shadow-[0_0_12px_#10ffa0]"
            style={{ scaleX: smoothProgress }}
          />
        </div>

        {/* Tactical Status Ticker Bar */}
        <div className="px-4 py-2 sm:px-8 flex flex-wrap items-center justify-between gap-3 font-['JetBrains_Mono'] text-[11px]">
          {/* Active Scene indicator */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-6 h-6 bg-black text-[#10ffa0] dark:bg-white dark:text-black font-extrabold text-[10px] border border-black dark:border-white">
              {activeScene.num}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[var(--text-on-surface-variant)] uppercase tracking-wider hidden sm:inline">
                SCENE:
              </span>
              <span className="font-extrabold text-black dark:text-white uppercase tracking-wider">
                {activeScene.title}
              </span>
            </div>
            <span className="text-[#75777a] hidden md:inline">/</span>
            <span className="text-[10px] text-[var(--text-on-surface-variant)] hidden md:inline">
              COORD [Y: {scrollPixels}PX]
            </span>
          </div>

          {/* Connected Journey Stage Pill Nodes */}
          <div className="hidden lg:flex items-center gap-1">
            {(['THINK', 'PLAN', 'VISUALIZE', 'CODE', 'REFLECT', 'PROGRESS'] as const).map(
              (stage, idx) => {
                const isCurrent = activeScene.stage === stage;
                return (
                  <React.Fragment key={stage}>
                    <button
                      onClick={() => {
                        const targetMap: Record<string, string> = {
                          THINK: 'section-manifesto',
                          PLAN: 'section-void',
                          VISUALIZE: 'section-visualize',
                          CODE: 'section-mentor',
                          REFLECT: 'section-ledger',
                          PROGRESS: 'section-archive',
                        };
                        scrollToSection(targetMap[stage]);
                      }}
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase transition-all border ${
                        isCurrent
                          ? 'bg-[#10ffa0] text-black border-black shadow-[2px_2px_0px_0px_#000000]'
                          : 'bg-transparent text-[var(--text-on-surface-variant)] border-transparent hover:border-black/30 dark:hover:border-white/30'
                      }`}
                    >
                      {stage}
                    </button>
                    {idx < 5 && (
                      <span className="text-[10px] text-[var(--text-on-surface-variant)]">→</span>
                    )}
                  </React.Fragment>
                );
              }
            )}
          </div>

          {/* Right Metrics & Quick Jump */}
          <div className="flex items-center gap-3">
            <div className="bg-black/5 dark:bg-white/5 border border-black dark:border-white px-2 py-0.5 text-[10px] font-bold">
              <span>PROGRESS: </span>
              <span className="text-[#007144] dark:text-[#10ffa0] font-mono">
                {scrollPercent}%
              </span>
            </div>
            <button
              onClick={onLaunchWorkspace}
              className="px-3 py-1 bg-black text-[#10ffa0] dark:bg-white dark:text-black font-extrabold uppercase text-[10px] border border-black dark:border-white shadow-[2px_2px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#ffffff] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 transition-all"
            >
              LAUNCH LAB →
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SCENE 01 — ENTRY (MINIMAL OPENING & SCROLL-DRAWN GRAPH)                    */}
      {/* ========================================================================= */}
      <section
        ref={entryRef}
        id="section-entry"
        className="relative w-full min-h-[88vh] bg-[var(--bg-surface)] text-[var(--text-on-surface)] flex flex-col justify-between p-6 sm:p-12 lg:p-16 border-b-2 border-black dark:border-white overflow-hidden"
      >
        {/* Subtle Background Blueprint Grid with parallax drift */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-25 dark:opacity-15 bg-[radial-gradient(#000000_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"
          style={{ y: entryBgY }}
        />

        {/* Top Meta Strip */}
        <div className="relative z-10 flex items-center justify-between w-full font-['JetBrains_Mono'] text-[11px] uppercase tracking-widest text-[var(--text-on-surface-variant)]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-black dark:bg-white inline-block"></span>
            <span className="font-bold text-black dark:text-white">EDITION 01 // VOL. 2025</span>
            <span className="text-[#75777a]">/</span>
            <span>THE ANTI-SAAS TACTILE MANIFESTO</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-black dark:text-white font-bold">
              <Activity className="w-3.5 h-3.5 text-[#10ffa0]" />
              SCROLL ENGINE ACTIVE
            </span>
            <span className="text-[#75777a]">#SYS-0012</span>
          </div>
        </div>

        {/* Centered Visual Node Construct (Matches Logo Icon Ref & Transforms on Scroll) */}
        <div className="my-auto py-12 flex flex-col items-center justify-center relative z-10">
          {/* Parallax Floating Kinetic Watermark */}
          <motion.div
            className="absolute select-none pointer-events-none font-['Anton'] text-[120px] sm:text-[180px] lg:text-[240px] uppercase text-black/[0.03] dark:text-white/[0.03] leading-none whitespace-nowrap"
            style={{ x: heroMarqueeX }}
          >
            TOPOLOGY · RECURSION · COMPLEXITY
          </motion.div>

          {/* Dashed Blueprint Frame */}
          <motion.div
            style={{ scale: entryNodeScale }}
            className="relative p-8 sm:p-14 border-2 border-dashed border-black dark:border-white bg-[var(--bg-surface-container-low)] shadow-[8px_8px_0px_0px_#000000] dark:shadow-[8px_8px_0px_0px_#ffffff] transition-shadow"
          >
            {/* Graph Node Triangle Layout with Animated SVG Connectors */}
            <div className="relative w-72 h-64 sm:w-88 sm:h-72 mx-auto flex items-center justify-center">
              {/* Connectors (SVG with Scroll-Scrubbed Path Length) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 280">
                {/* Background Guide Line */}
                <line x1="160" y1="64" x2="80" y2="200" stroke="#75777a" strokeWidth="4" strokeDasharray="4 4" />
                <line x1="160" y1="64" x2="240" y2="200" stroke="#75777a" strokeWidth="4" strokeDasharray="4 4" />

                {/* Animated Dynamic Conduits */}
                <motion.line
                  x1="160"
                  y1="64"
                  x2="80"
                  y2="200"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeDasharray="220"
                  style={{ pathLength: entryLineDraw }}
                />
                <motion.line
                  x1="160"
                  y1="64"
                  x2="240"
                  y2="200"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeDasharray="220"
                  style={{ pathLength: entryLineDraw }}
                />
              </svg>

              {/* Root Node (Neon Green) */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: -4 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#10ffa0] border-3 border-black flex flex-col items-center justify-center font-['JetBrains_Mono'] text-3xl font-extrabold text-black shadow-[5px_5px_0px_0px_#000000] cursor-pointer group"
              >
                <span>01</span>
                <span className="text-[9px] uppercase tracking-tighter opacity-70 group-hover:opacity-100 font-sans font-bold">
                  ROOT
                </span>
              </motion.div>

              {/* Left Leaf (Yellow) */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 4 }}
                whileTap={{ scale: 0.95 }}
                className="absolute bottom-2 left-4 sm:left-8 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#ffd000] border-3 border-black flex flex-col items-center justify-center font-['JetBrains_Mono'] text-2xl font-extrabold text-black shadow-[5px_5px_0px_0px_#000000] cursor-pointer group"
              >
                <span>L</span>
                <span className="text-[8px] uppercase tracking-tighter opacity-70 group-hover:opacity-100 font-sans font-bold">
                  LEFT
                </span>
              </motion.div>

              {/* Right Leaf (Purple) */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: -4 }}
                whileTap={{ scale: 0.95 }}
                className="absolute bottom-2 right-4 sm:right-8 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#7c3aed] border-3 border-black dark:border-white flex flex-col items-center justify-center font-['JetBrains_Mono'] text-2xl font-extrabold text-white shadow-[5px_5px_0px_0px_#000000] cursor-pointer group"
              >
                <span>R</span>
                <span className="text-[8px] uppercase tracking-tighter opacity-80 group-hover:opacity-100 font-sans font-bold">
                  RIGHT
                </span>
              </motion.div>
            </div>

            {/* Overlaid Blue Slug Bar */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#1d4ed8] text-white px-6 py-1.5 border-2 border-black dark:border-white font-['JetBrains_Mono'] text-[12px] tracking-widest font-extrabold uppercase whitespace-nowrap shadow-[4px_4px_0px_0px_#000000]">
              DSA PROGRESS BOOK
            </div>
          </motion.div>

          {/* Masking Tape Annotation with subtle scroll wobble */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 -rotate-1 px-4 py-1 bg-[var(--bg-surface-container-high)] border border-black dark:border-white font-['JetBrains_Mono'] text-[10px] uppercase tracking-wider font-bold shadow-[3px_3px_0px_0px_#000000] flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#10ffa0] animate-ping" />
            § SCHEMATIC SPEC: BINARY TOPOLOGY // NON-TRIVIAL MEMORIZATION BARRIER
          </motion.div>
        </div>

        {/* Bottom Scroll Cue */}
        <div className="relative z-10 w-full flex items-end justify-between pt-6 border-t border-black/20 dark:border-white/20 font-['JetBrains_Mono'] text-[11px]">
          <div
            onClick={() => scrollToSection('section-manifesto')}
            className="flex items-center gap-2 font-bold text-black dark:text-white cursor-pointer hover:underline"
          >
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              className="inline-block text-xl leading-none text-[#006d41] dark:text-[#10ffa0]"
            >
              ↓
            </motion.span>
            <span>SCROLL TO DISCOVER SCENE 02 [MANIFESTO]</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToSection('section-manifesto')}
              className="px-3 py-1 bg-[var(--bg-surface-container)] border border-black dark:border-white text-[11px] font-bold uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              BEGIN JOURNEY ↓
            </button>
            <button
              onClick={onLaunchWorkspace}
              className="px-4 py-1.5 bg-black text-[#10ffa0] dark:bg-white dark:text-black font-['JetBrains_Mono'] text-[11px] font-bold uppercase border border-black dark:border-white shadow-[3px_3px_0px_0px_#000000] dark:shadow-[3px_3px_0px_0px_#ffffff] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1"
            >
              ENTER WORKSPACE LAB →
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SCENE 02 — HERO OVERSIZED MANIFESTO (PARALLAX & HORIZONTAL KINETIC)       */}
      {/* ========================================================================= */}
      <section
        ref={heroRef}
        id="section-manifesto"
        className="relative w-full bg-white dark:bg-[#101216] text-black dark:text-white py-24 px-6 sm:px-12 lg:px-20 border-b-2 border-black dark:border-white overflow-hidden transition-colors"
      >
        {/* Kinetic Horizontal Marquee Strip (Scrubbed with Scroll) */}
        <div className="absolute top-0 left-0 right-0 py-1 bg-black text-[#10ffa0] dark:bg-white dark:text-black font-['JetBrains_Mono'] text-[10px] font-extrabold uppercase tracking-widest overflow-hidden border-b border-black">
          <motion.div className="flex gap-8 whitespace-nowrap" style={{ x: heroMarqueeX }}>
            <span>★ THINK FIRST</span>
            <span>• NO LEETCODE MEMORIZATION</span>
            <span>• VISUALIZE THE STATE MACHINE</span>
            <span>• CONSTANT O(1) TIME DISCOVERY</span>
            <span>• SOCRATIC MENTOR GUIDANCE</span>
            <span>• CODE WITH PRECISION</span>
            <span>• REFLECT IN JOURNAL</span>
            <span>★ THINK FIRST</span>
            <span>• NO LEETCODE MEMORIZATION</span>
            <span>• VISUALIZE THE STATE MACHINE</span>
          </motion.div>
        </div>

        <div className="flex items-center justify-between font-['JetBrains_Mono'] text-[10px] text-[#45474a] dark:text-[#9da2ac] border-b border-black dark:border-white pb-3 mb-10 pt-4">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-black dark:bg-white"></span>
            REF // MANIFESTO STATEMENT
          </span>
          <span className="tracking-widest">COORD [X: 104.992 | Y: 890.11]</span>
          <span className="bg-[#ffd000] text-black px-2 py-0.5 font-bold">SCENE: #002</span>
        </div>

        <div className="relative max-w-7xl mx-auto flex flex-col">
          {/* Tape Sticker Badge with spring rotation */}
          <motion.div
            style={{ rotate: heroBadgeRotate }}
            className="self-start bg-[#ffd000] text-black border-2 border-black px-4 py-1.5 font-['JetBrains_Mono'] text-[12px] uppercase font-extrabold shadow-[4px_4px_0px_0px_#000000] mb-6 inline-flex items-center gap-2"
          >
            <Flame className="w-4 h-4 text-black fill-black" />
            ★ FOR STUDENTS WHO REFUSE TO MEMORIZE LEETCODE
          </motion.div>

          {/* Monumental Type Hierarchy with Kinetic Scroll Entry */}
          <div className="relative">
            <h1 className="font-['Anton'] text-5xl sm:text-7xl lg:text-9xl tracking-tighter uppercase leading-[0.88] text-black dark:text-white">
              <motion.span style={{ x: heroTextLeftX }} className="block">
                STOP COPYING
              </motion.span>
              <motion.span
                style={{ x: heroTextRightX }}
                className="block text-[#45474a] dark:text-[#75777a] hover:text-black dark:hover:text-white transition-colors cursor-crosshair line-through decoration-red-500 decoration-6"
              >
                SOLUTIONS.
              </motion.span>
              <motion.span style={{ x: heroTextLeftX }} className="block">
                START LEARNING
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.02 }}
                className="bg-[#10ffa0] text-black px-4 inline-block -rotate-1 border-3 border-black mt-2 shadow-[8px_8px_0px_0px_#000000] dark:shadow-[8px_8px_0px_0px_#ffffff]"
              >
                HOW TO THINK.
              </motion.span>
            </h1>
          </div>

          {/* Split Analytical Footnote with Staggered Visual Reveal */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t-2 border-black dark:border-white pt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:col-span-4 font-['JetBrains_Mono'] text-[11px] uppercase text-[#45474a] dark:text-[#9da2ac] leading-relaxed p-4 bg-[var(--bg-surface-container-low)] border border-black dark:border-white"
            >
              <p className="font-extrabold text-black dark:text-white mb-1.5 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#1d4ed8]"></span>
                PROPOSITION 0.1A // COGNITIVE RESILIENCE
              </p>
              Rote memorization deteriorates under interview pressure. The only real asset you take into an engineering interview or a compiler problem is mental mechanics.
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-5 font-['Work_Sans'] text-[15px] text-black dark:text-white leading-relaxed p-4 border border-black dark:border-white bg-[var(--bg-surface)]"
            >
              Most DSA platforms turn candidates into industrial typists. We strip away the gamified dopamine badges and force you to construct topological models on raw newsprint:
              <div className="mt-3 font-['JetBrains_Mono'] text-[11px] font-bold text-[#006d41] dark:text-[#10ffa0] flex flex-wrap gap-1">
                <span>THINK</span> → <span>PLAN</span> → <span>VISUALIZE</span> → <span>CODE</span> → <span>TEST</span> → <span>REFLECT</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-3 flex flex-col gap-2 font-['JetBrains_Mono'] text-[11px]"
            >
              <div className="p-3 bg-[#f1eee7] dark:bg-neutral-900 border-2 border-black dark:border-white flex justify-between font-bold shadow-[2px_2px_0px_0px_#000000]">
                <span>MEMORIZATION</span>
                <span className="text-[#ba1a1a] flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> FATAL
                </span>
              </div>
              <div className="p-3 bg-[#10ffa0]/30 dark:bg-[#10ffa0]/20 border-2 border-black dark:border-white flex justify-between text-[#006d41] dark:text-[#10ffa0] font-bold shadow-[2px_2px_0px_0px_#000000]">
                <span>FIRST PRINCIPLES</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> RESILIENT
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SCENE 03 — THE PROBLEM (THE DARK VOID & SEQUENTIAL 48-HR COLLAPSE)         */}
      {/* ========================================================================= */}
      <section
        ref={voidRef}
        id="section-void"
        className="relative w-full bg-[#0c0d0e] text-[#f4f1ea] py-24 px-6 sm:px-12 lg:px-20 border-b-2 border-black overflow-hidden"
      >
        <div className="max-w-7xl mx-auto flex flex-col relative z-10">
          <div className="flex items-center justify-between gap-3 font-['JetBrains_Mono'] text-[11px] tracking-widest text-[#10ffa0] mb-6">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-[#10ffa0] animate-pulse"></span>
              <span>SCENE 03 // THE VOID CYCLE (THE 48-HOUR BRAIN DUMP PIPELINE)</span>
            </div>
            <span className="text-neutral-500 hidden sm:inline">STATE: PERSISTENT FAILURE</span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-['Anton'] text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white max-w-5xl leading-tight"
          >
            THE PROBLEM ISN’T FINDING THE ANSWER.
            <br />
            <span className="text-neutral-500">IT’S LEARNING HOW TO FIND IT.</span>
          </motion.h2>

          {/* The Devastating Memorization Loop Strips with Sequential Visual Reveal */}
          <div className="mt-16 w-full relative">
            <div className="flex items-center justify-between font-['JetBrains_Mono'] text-[11px] text-neutral-400 mb-4 uppercase tracking-widest">
              <span>FIGURE 01: THE 48-HOUR BRAIN DUMP PIPELINE</span>
              <span className="text-[#ba1a1a] font-bold">CIRCULAR TRAP DETECTED</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative">
              {/* Step 1 */}
              <motion.div
                style={{ opacity: voidStage1 }}
                className="p-5 bg-neutral-900 border-2 border-neutral-700 flex flex-col justify-between min-h-[160px] shadow-[4px_4px_0px_0px_#000000]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-neutral-400">01_ACTION</span>
                  <span className="w-2 h-2 rounded-full bg-neutral-500" />
                </div>
                <span className="font-['JetBrains_Mono'] text-[14px] font-bold text-white">
                  [ COPY SOLUTION ]
                </span>
                <span className="font-['JetBrains_Mono'] text-[10px] text-neutral-500">
                  Ctrl + C / LeetCode Discuss Tab
                </span>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                style={{ opacity: voidStage2 }}
                className="p-5 bg-neutral-900 border-2 border-neutral-700 flex flex-col justify-between min-h-[160px] shadow-[4px_4px_0px_0px_#000000]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-neutral-400">02_ACTION</span>
                  <span className="w-2 h-2 rounded-full bg-neutral-500" />
                </div>
                <span className="font-['JetBrains_Mono'] text-[14px] font-bold text-white">
                  [ PASTE WORKSPACE ]
                </span>
                <span className="font-['JetBrains_Mono'] text-[10px] text-neutral-500">
                  0 ms Thought Depth
                </span>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                style={{ opacity: voidStage3 }}
                className="p-5 bg-neutral-900 border-2 border-neutral-700 flex flex-col justify-between min-h-[160px] shadow-[4px_4px_0px_0px_#000000]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-neutral-400">03_ACTION</span>
                  <span className="w-2 h-2 rounded-full bg-neutral-500" />
                </div>
                <span className="font-['JetBrains_Mono'] text-[14px] font-bold text-white">
                  [ SUBMIT RUNNER ]
                </span>
                <span className="font-['JetBrains_Mono'] text-[10px] text-neutral-500">
                  Judge Server Parsing
                </span>
              </motion.div>

              {/* Step 4 */}
              <motion.div
                style={{ opacity: voidStage4 }}
                className="p-5 bg-neutral-900 border-2 border-emerald-500/80 flex flex-col justify-between min-h-[160px] shadow-[4px_4px_0px_0px_#000000]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-emerald-400">04_OUTCOME</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <span className="font-['JetBrains_Mono'] text-[14px] font-bold text-emerald-400">
                  [ ACCEPTED 🟢 ]
                </span>
                <span className="font-['JetBrains_Mono'] text-[10px] text-neutral-500">
                  False Dopamine Spike
                </span>
              </motion.div>

              {/* Step 5 */}
              <motion.div
                style={{ opacity: voidStage5 }}
                className="p-5 bg-neutral-950 border-3 border-red-500 flex flex-col justify-between min-h-[160px] relative shadow-[6px_6px_0px_0px_#ba1a1a]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-red-400">05_TRUTH</span>
                  <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                </div>
                <div>
                  <span className="font-['JetBrains_Mono'] text-[13px] font-bold text-red-500 line-through block">
                    [ FORGET IN 48 HOURS ]
                  </span>
                  <span className="inline-block text-[9px] font-['JetBrains_Mono'] text-white bg-red-600 px-2 py-0.5 mt-1 font-bold uppercase">
                    TOTAL INTELLECTUAL LOSS
                  </span>
                </div>
                <span className="font-['JetBrains_Mono'] text-[10px] text-neutral-400">
                  Memory purged. Repeat loop.
                </span>
              </motion.div>
            </div>

            {/* Loop Arrow Conduit proving the trap */}
            <div className="hidden lg:flex items-center justify-between mt-3 px-2 font-['JetBrains_Mono'] text-[10px] text-red-400">
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5" /> THE INFINITE FORGETTING LOOP TRAPS 92% OF STUDENTS
              </span>
              <span>BREAK FREE WITH THINK → VISUALIZE → REFLECT ↓</span>
            </div>
          </div>

          {/* Terminal Diagnostics Box with CRT Style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-10 p-5 bg-black border-2 border-neutral-800 font-['JetBrains_Mono'] text-[12px] text-neutral-300 shadow-[6px_6px_0px_0px_#10ffa0]"
          >
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800 text-[10px] text-neutral-500">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#10ffa0]" />
                <span>DIAGNOSTIC LOG: STUDENT #8892</span>
              </div>
              <span>LATENCY: 48 HOURS POST-SUBMISSION</span>
            </div>
            <p className="mt-3 text-[#10ffa0] leading-relaxed">
              &gt; RE-TEST CANDIDATE WITH VARIANT: "Find two elements summing to target with duplicates and negative integers."<br />
              &gt; RESULT: FAILURE (TIMEOUT: 45 MINS WITHOUT RECALL).<br />
              &gt; DIAGNOSIS: Syntactic memorization without topological intuition graph.<br />
              &gt; PRESCRIPTION: Force student into the Socratic Think-First Workbench.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SCENE 04 — CHAPTER 04: THINK (THE INTERACTIVE INTUITION ENGINE)            */}
      {/* ========================================================================= */}
      <section
        id="section-think"
        className="relative w-full bg-[#fcf9f2] dark:bg-[#121417] text-black dark:text-white py-24 px-6 sm:px-12 lg:px-20 border-b-2 border-black dark:border-white transition-colors"
      >
        <div className="max-w-7xl mx-auto flex flex-col">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-black dark:border-white pb-8 mb-10">
            <div>
              <div className="font-['JetBrains_Mono'] text-[10px] text-[#45474a] dark:text-[#9da2ac] uppercase tracking-widest mb-2 font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-[#10ffa0]"></span>
                CHAPTER 04 // INTERACTIVE INTUITION ENGINE
              </div>
              <h2 className="font-['Anton'] text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tighter leading-none text-black dark:text-white">
                THINK.
              </h2>
            </div>
            <div className="font-['JetBrains_Mono'] text-[12px] text-[#45474a] dark:text-[#9da2ac] max-w-md">
              Don't touch code until your brain can simulate the state machine on paper. Select your raw intuition below to evaluate algorithmic trade-offs.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Problem Blueprint Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 bg-[#f1eee7] dark:bg-[#181a1e] p-6 border-3 border-black dark:border-white shadow-[8px_8px_0px_0px_#000000] dark:shadow-[8px_8px_0px_0px_#ffffff]"
            >
              <div className="flex items-center justify-between font-['JetBrains_Mono'] text-[10px] text-black dark:text-white pb-3 border-b-2 border-black dark:border-white font-bold">
                <span className="bg-black text-[#10ffa0] dark:bg-white dark:text-black px-2 py-0.5">
                  PROBLEM 001
                </span>
                <span>DIFFICULTY: MEDIUM</span>
              </div>
              <h3 className="font-['Anton'] text-3xl sm:text-4xl uppercase mt-4 mb-2">TWO SUM</h3>
              <p className="font-['Work_Sans'] text-[13px] text-black dark:text-[#f4f1ea] mb-4 leading-relaxed">
                Given an array of integers <code className="bg-white dark:bg-black px-1 border border-black dark:border-white font-['JetBrains_Mono']">nums</code> and an integer <code className="bg-white dark:bg-black px-1 border border-black dark:border-white font-['JetBrains_Mono']">target</code>, return indices of two numbers such that they add up to target.
              </p>
              <div className="bg-white dark:bg-black p-3 border-2 border-black dark:border-white font-['JetBrains_Mono'] text-[11px] space-y-1.5 shadow-[2px_2px_0px_0px_#000000]">
                <div><span className="text-[#45474a] dark:text-[#75777a]">INPUT:</span> nums = [2, 7, 11, 15], target = 9</div>
                <div><span className="text-[#45474a] dark:text-[#75777a]">TARGET COMPLEMENT:</span> 9 - nums[i]</div>
                <div><span className="text-[#45474a] dark:text-[#75777a]">CONSTRAINT:</span> Exactly one valid answer exists.</div>
              </div>

              <div className="mt-4 pt-3 border-t border-black/20 dark:border-white/20 flex items-center justify-between font-['JetBrains_Mono'] text-[10px]">
                <span className="text-[#75777a]">LEETCODE #1</span>
                <button
                  onClick={() => {
                    onSelectProblem('two-sum');
                    onLaunchWorkspace();
                  }}
                  className="text-black dark:text-[#10ffa0] font-bold underline hover:no-underline"
                >
                  SOLVE IN LAB →
                </button>
              </div>
            </motion.div>

            {/* Intuition Vectors Decision Matrix */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 flex flex-col gap-3"
            >
              <div className="font-['JetBrains_Mono'] text-[10px] text-[#45474a] dark:text-[#9da2ac] uppercase tracking-wider font-bold">
                CHOOSE YOUR INTUITION VECTOR (CLICK TO SIMULATE COMPLEXITY):
              </div>

              {/* Option 1 */}
              <button
                onClick={() => handleIntuitionClick('brute')}
                className={`text-left p-4 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_#000000] dark:shadow-[4px_4px_0px_0px_#ffffff] transition-all flex flex-col gap-1 ${
                  selectedIntuition === 'brute'
                    ? 'bg-[#ffdad6] dark:bg-[#5c1d1d] translate-x-1 translate-y-1'
                    : 'bg-[#f1eee7] dark:bg-[#181a1e] hover:bg-[#ebe8e1] dark:hover:bg-[#202328]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-['JetBrains_Mono'] text-[12px] font-bold text-black dark:text-white">
                    01 // NESTED ITERATION [BRUTE FORCE]
                  </span>
                  <span className="bg-white dark:bg-black text-[#ba1a1a] border border-black dark:border-white px-2 py-0.5 font-['JetBrains_Mono'] text-[10px] font-bold">
                    O(N²) TIME
                  </span>
                </div>
                <p className="font-['Work_Sans'] text-[12px] text-[#45474a] dark:text-[#9da2ac]">
                  Iterate every element i and check all subsequent j elements for sum equivalence.
                </p>
              </button>

              {/* Option 2 */}
              <button
                onClick={() => handleIntuitionClick('hash')}
                className={`text-left p-4 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_#000000] dark:shadow-[4px_4px_0px_0px_#ffffff] transition-all flex flex-col gap-1 ${
                  selectedIntuition === 'hash'
                    ? 'bg-[#10ffa0] dark:bg-[#007144] translate-x-1 translate-y-1 text-black'
                    : 'bg-[#f1eee7] dark:bg-[#181a1e] hover:bg-[#10ffa0]/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-['JetBrains_Mono'] text-[12px] font-bold text-black dark:text-white">
                    02 // HASH TABLE COMPLEMENT REGISTRY
                  </span>
                  <span className="bg-[#10ffa0] text-[#007144] border border-black px-2 py-0.5 font-['JetBrains_Mono'] text-[10px] font-bold">
                    O(N) TIME // O(N) SPACE
                  </span>
                </div>
                <p className="font-['Work_Sans'] text-[12px] text-[#45474a] dark:text-[#9da2ac]">
                  Trade spatial memory for temporal velocity: store seen values as lookup keys while stepping forward once.
                </p>
              </button>

              {/* Option 3 */}
              <button
                onClick={() => handleIntuitionClick('twopointer')}
                className={`text-left p-4 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_#000000] dark:shadow-[4px_4px_0px_0px_#ffffff] transition-all flex flex-col gap-1 ${
                  selectedIntuition === 'twopointer'
                    ? 'bg-[#ffd000] dark:bg-[#927800] translate-x-1 translate-y-1 text-black'
                    : 'bg-[#f1eee7] dark:bg-[#181a1e] hover:bg-[#ebe8e1] dark:hover:bg-[#202328]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-['JetBrains_Mono'] text-[12px] font-bold text-black dark:text-white">
                    03 // IN-PLACE SORT + DUAL POINTERS
                  </span>
                  <span className="bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white px-2 py-0.5 font-['JetBrains_Mono'] text-[10px] font-bold">
                    O(N LOG N) TIME
                  </span>
                </div>
                <p className="font-['Work_Sans'] text-[12px] text-[#45474a] dark:text-[#9da2ac]">
                  Sort array first, place L and R needles at boundaries, inward crawl. Modifies original index layout.
                </p>
              </button>

              {/* Intuition Feedback Ledger Display */}
              <div className="mt-2 p-5 bg-white dark:bg-black border-3 border-black dark:border-white min-h-[85px] flex items-center shadow-[4px_4px_0px_0px_#000000] dark:shadow-[4px_4px_0px_0px_#ffffff]">
                <div className="font-['JetBrains_Mono'] text-[12px] leading-relaxed w-full">
                  <AnimatePresence mode="wait">
                    {intuitionFeedback ? (
                      <motion.div
                        key={selectedIntuition}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={
                          selectedIntuition === 'hash'
                            ? 'text-[#007144] dark:text-[#10ffa0] font-bold'
                            : selectedIntuition === 'brute'
                            ? 'text-[#ba1a1a] dark:text-red-400 font-bold'
                            : 'text-[#854d0e] dark:text-yellow-400 font-bold'
                        }
                      >
                        {intuitionFeedback}
                      </motion.div>
                    ) : (
                      <span className="text-[#75777a]">
                        [INTUITION ENGINE IDLE]: Select an approach above to trace the algorithmic trade-off mechanics.
                      </span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SCENE 05 — CHAPTER 05: VISUALIZE (INTERACTIVE WHITEBOARD CANVAS & STEPPER) */}
      {/* ========================================================================= */}
      <section
        id="section-visualize"
        className="relative w-full bg-[#7c3aed] text-white py-24 px-6 sm:px-12 lg:px-20 border-b-2 border-black overflow-hidden"
      >
        <div className="max-w-7xl mx-auto flex flex-col relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-black pb-6 mb-8">
            <div>
              <div className="inline-block bg-[#ffd000] text-black border-2 border-black font-['JetBrains_Mono'] text-[10px] uppercase px-3 py-1 font-bold mb-2 shadow-[3px_3px_0px_0px_#000000]">
                CHAPTER 05 // THE SPATIAL PROVING GROUND
              </div>
              <h2 className="font-['Anton'] text-4xl sm:text-6xl lg:text-7xl text-white uppercase tracking-tight">
                DRAW IT BEFORE YOU CODE IT.
              </h2>
            </div>
            <div className="font-['JetBrains_Mono'] text-[11px] text-purple-200 uppercase tracking-widest max-w-xs">
              TOOLING: 2D ARRAY SLIDER SIMULATION &amp; POINTER CONVERGENCE
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full bg-[#fcf9f2] text-black border-4 border-black shadow-[10px_10px_0px_0px_#000000] p-6 lg:p-10 flex flex-col"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black pb-4 mb-6 font-['JetBrains_Mono'] text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-red-500 rounded-full border border-black"></span>
                <span className="w-3.5 h-3.5 bg-yellow-400 rounded-full border border-black"></span>
                <span className="w-3.5 h-3.5 bg-green-500 rounded-full border border-black"></span>
                <span className="ml-2 font-bold uppercase tracking-wider text-black">
                  CANVAS // TWO_POINTER_INWARD_TRAVERSAL.SIMULATOR
                </span>
              </div>
              <span className="bg-black text-[#10ffa0] px-3 py-1 text-[11px] font-bold border border-black shadow-[2px_2px_0px_0px_#000000]">
                TARGET SUM = 18 // ARRAY SORTED
              </span>
            </div>

            {/* Interactive Array Stepper */}
            <div className="my-6 flex flex-col items-center justify-center">
              <div className="font-['JetBrains_Mono'] text-[13px] uppercase text-black mb-6 tracking-widest font-extrabold bg-[#ffd000] px-4 py-1.5 border-2 border-black shadow-[3px_3px_0px_0px_#000000]">
                {visualStep === 0 && 'STEP 1: 2 + 15 = 17 (SUM < 18: ADVANCE LEFT POINTER L →)'}
                {visualStep === 1 && 'STEP 2: 7 + 15 = 22 (SUM > 18: DECREMENT RIGHT POINTER ← R)'}
                {visualStep === 2 && 'STEP 3: 7 + 11 = 18 (TARGET SUM 18 MATCH FOUND! 🎉)'}
              </div>

              {/* The Visual Array Cells with Pointer Needles */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                {[
                  { idx: 0, val: 2, isL: visualStep === 0 },
                  { idx: 1, val: 7, isL: visualStep >= 1 },
                  { idx: 2, val: 11, isR: visualStep === 2 },
                  { idx: 3, val: 15, isR: visualStep < 2 },
                ].map((item) => (
                  <motion.div
                    key={item.idx}
                    layout
                    className="flex flex-col items-center"
                  >
                    <span
                      className={`font-['JetBrains_Mono'] text-[11px] font-bold mb-1.5 ${
                        item.isL
                          ? 'text-[#007144] font-extrabold'
                          : item.isR
                          ? 'text-[#ba1a1a] font-extrabold'
                          : 'invisible'
                      }`}
                    >
                      {item.isL ? 'PTR L ↓' : item.isR ? 'PTR R ↓' : '.'}
                    </span>
                    <motion.div
                      animate={{
                        scale: item.isL || item.isR ? 1.05 : 1,
                        y: item.isL || item.isR ? -4 : 0,
                      }}
                      className={`w-18 h-22 sm:w-24 sm:h-28 border-3 border-black flex flex-col items-center justify-center font-['Anton'] text-4xl sm:text-5xl shadow-[6px_6px_0px_0px_#000000] transition-colors ${
                        item.isL
                          ? 'bg-[#10ffa0] text-black ring-4 ring-[#006d41]'
                          : item.isR
                          ? 'bg-[#ffd000] text-black ring-4 ring-[#927800]'
                          : 'bg-white text-black'
                      }`}
                    >
                      <span>{item.val}</span>
                      <span className="font-['JetBrains_Mono'] text-[9px] font-sans font-bold uppercase tracking-tight text-[#45474a]">
                        {item.isL ? 'LEFT VAL' : item.isR ? 'RIGHT VAL' : 'CELL'}
                      </span>
                    </motion.div>
                    <span className="font-['JetBrains_Mono'] text-[11px] text-[#45474a] mt-2 font-bold">
                      idx: {item.idx}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Stepper Controls */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setVisualStep((prev) => Math.max(0, prev - 1))}
                  disabled={visualStep === 0}
                  className="px-4 py-2 bg-white border-2 border-black font-['JetBrains_Mono'] text-[11px] font-bold uppercase shadow-[3px_3px_0px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50"
                >
                  ← PREVIOUS STEP
                </button>
                <button
                  onClick={() => setVisualStep((prev) => Math.min(2, prev + 1))}
                  disabled={visualStep === 2}
                  className="px-5 py-2 bg-black text-[#10ffa0] border-2 border-black font-['JetBrains_Mono'] text-[11px] font-bold uppercase shadow-[3px_3px_0px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50"
                >
                  STEP FORWARD →
                </button>
                <button
                  onClick={() => setVisualStep(0)}
                  className="px-3 py-2 bg-[#ffdad6] text-[#93000a] border-2 border-black font-['JetBrains_Mono'] text-[11px] font-bold uppercase hover:bg-red-200"
                >
                  RESET
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SCENE 06 — CHAPTER 06: AI MENTOR (SOCRATIC DIALOGUE SIMULATION)           */}
      {/* ========================================================================= */}
      <section
        id="section-mentor"
        className="relative w-full bg-[#1d4ed8] text-white py-24 px-6 sm:px-12 lg:px-20 border-b-2 border-black"
      >
        <div className="max-w-7xl mx-auto flex flex-col">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-white pb-6 mb-10">
            <div>
              <div className="bg-white text-[#1d4ed8] font-['JetBrains_Mono'] text-[10px] font-bold px-3 py-1 uppercase tracking-widest w-fit mb-3 border border-black shadow-[2px_2px_0px_0px_#000000]">
                CHAPTER 06 // NON-SPOILER SOCRATIC ADVISOR
              </div>
              <h2 className="font-['Anton'] text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-tight">
                DON’T ASK FOR THE ANSWER.
                <br />
                ASK FOR THE NEXT HINT.
              </h2>
            </div>
            <div className="font-['JetBrains_Mono'] text-[11px] text-blue-200 uppercase tracking-widest max-w-xs">
              STRICT ANTI-SPOILER GUARDRAIL: WE NEVER DUMP CODE SNIPPETS. WE GIVE GUIDING QUESTIONS.
            </div>
          </div>

          {/* Three Tier Hint Progression Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Hint 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#fcf9f2] text-black p-6 border-3 border-black shadow-[6px_6px_0px_0px_#000000] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b-2 border-black font-['JetBrains_Mono'] text-[10px] font-bold">
                  <span className="bg-[#ffd000] px-2 py-0.5 border border-black">HINT LEVEL 01</span>
                  <span>INQUIRY</span>
                </div>
                <h4 className="font-['Work_Sans'] text-base font-bold mt-4 mb-2 text-black">
                  "What information do you need to lookup in constant time?"
                </h4>
                <p className="font-['Work_Sans'] text-[13px] text-[#45474a] leading-relaxed">
                  When looking at number 2, you already know you urgently need 7. Where can you write 2 so that when you see 7 later, the match is instantaneous?
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-black/20 font-['JetBrains_Mono'] text-[10px] text-[#006d41] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> PROGRESSION: UNLOCKED
              </div>
            </motion.div>

            {/* Hint 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#fcf9f2] text-black p-6 border-3 border-black shadow-[6px_6px_0px_0px_#000000] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b-2 border-black font-['JetBrains_Mono'] text-[10px] font-bold">
                  <span className="bg-[#10ffa0] px-2 py-0.5 border border-black">HINT LEVEL 02</span>
                  <span>SYNTHESIS</span>
                </div>
                <h4 className="font-['Work_Sans'] text-base font-bold mt-4 mb-2 text-black">
                  "Can the complement `target - nums[i]` be cached?"
                </h4>
                <p className="font-['Work_Sans'] text-[13px] text-[#45474a] leading-relaxed">
                  Rather than searching the remaining array forward in an O(N) loop, consider querying your past footsteps in O(1) expected time.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-black/20 font-['JetBrains_Mono'] text-[10px] text-[#006d41] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> PROGRESSION: UNLOCKED
              </div>
            </motion.div>

            {/* Hint 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#fcf9f2] text-black p-6 border-3 border-black shadow-[6px_6px_0px_0px_#000000] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b-2 border-black font-['JetBrains_Mono'] text-[10px] font-bold">
                  <span className="bg-black text-white px-2 py-0.5 border border-black">HINT LEVEL 03</span>
                  <span>DATA SELECTION</span>
                </div>
                <h4 className="font-['Work_Sans'] text-base font-bold mt-4 mb-2 text-black">
                  "Which data structure offers average O(1) lookup?"
                </h4>
                <p className="font-['Work_Sans'] text-[13px] text-[#45474a] leading-relaxed">
                  Array scan: O(N). BST: O(log N). Hash table: O(1). Map the value to its original index position.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-black/20 font-['JetBrains_Mono'] text-[10px] text-[#45474a] font-bold">
                PROGRESSION: TERMINAL HINT REACHED
              </div>
            </motion.div>
          </div>

          {/* Interactive Socratic Mentor Tester */}
          <div className="p-6 bg-black border-3 border-white shadow-[8px_8px_0px_0px_#000000] flex flex-col font-['JetBrains_Mono']">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-700 text-[11px]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#10ffa0]" />
                <span className="font-bold text-white uppercase">TEST THE SOCRATIC MENTOR DIRECTLY</span>
              </div>
              <span className="text-[#10ffa0] text-[10px]">ZERO SPOILERS POLICY ENFORCED</span>
            </div>

            <div className="py-4">
              <span className="text-[11px] text-neutral-400 block mb-2">
                CHOOSE A QUESTION TO ASK THE SOCRATIC AI:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => simulateMentorResponse('Can I just use a hash map?')}
                  className="px-3 py-1.5 bg-neutral-900 border border-neutral-600 text-white text-[11px] hover:border-[#10ffa0] hover:text-[#10ffa0] transition-colors"
                >
                  "Can I just use a hash map?"
                </button>
                <button
                  onClick={() => simulateMentorResponse('Why is my nested loop slow?')}
                  className="px-3 py-1.5 bg-neutral-900 border border-neutral-600 text-white text-[11px] hover:border-[#10ffa0] hover:text-[#10ffa0] transition-colors"
                >
                  "Why is my nested loop slow?"
                </button>
                <button
                  onClick={() => simulateMentorResponse('What should my next step be?')}
                  className="px-3 py-1.5 bg-neutral-900 border border-neutral-600 text-white text-[11px] hover:border-[#10ffa0] hover:text-[#10ffa0] transition-colors"
                >
                  "What should my next step be?"
                </button>
              </div>
            </div>

            <div className="mt-2 p-4 bg-neutral-950 border border-neutral-800 text-[12px] min-h-[50px] flex items-center">
              {mentorTyping ? (
                <div className="flex items-center gap-2 text-[#10ffa0]">
                  <span className="w-2 h-2 rounded-full bg-[#10ffa0] animate-ping" />
                  <span>Socratic mentor formulating guiding question...</span>
                </div>
              ) : interactiveQuestion ? (
                <span className="text-[#10ffa0]">{interactiveQuestion}</span>
              ) : (
                <span className="text-neutral-500">
                  Select a prompt above to see how the Socratic AI responds with thoughtful inquiry instead of giving away code.
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SCENE 07 — CHAPTER 07: PROGRESS (THE ACADEMIC VISUAL LEDGER)               */}
      {/* ========================================================================= */}
      <section
        id="section-ledger"
        className="relative w-full bg-[#ffd000] text-black py-24 px-6 sm:px-12 lg:px-20 border-b-2 border-black"
      >
        <div className="max-w-7xl mx-auto flex flex-col">
          <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-8 font-['JetBrains_Mono'] text-[11px] font-bold">
            <span className="tracking-widest uppercase flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-black inline-block"></span>
              CHAPTER 07 // ACADEMIC LEDGER &amp; NODE METRICS
            </span>
            <span>REGISTERED: 2025 SESSION</span>
          </div>

          {/* Metric Cards with Scroll Hover and Tactile Shadow */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white p-6 border-3 border-black shadow-[6px_6px_0px_0px_#000000]"
            >
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#45474a] block uppercase font-bold">
                PROBLEMS ATTEMPTED
              </span>
              <span className="font-['Anton'] text-5xl sm:text-6xl leading-none block my-2">42</span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-black font-bold">
                TOTAL TRIAL CYCLES
              </span>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-[#10ffa0] p-6 border-3 border-black shadow-[6px_6px_0px_0px_#000000]"
            >
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#007144] block uppercase font-bold">
                FULLY MASTERED
              </span>
              <span className="font-['Anton'] text-5xl sm:text-6xl leading-none block my-2">17</span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#007144] font-bold">
                ZERO-HINT FIRST RUN
              </span>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white p-6 border-3 border-black shadow-[6px_6px_0px_0px_#000000]"
            >
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#45474a] block uppercase font-bold">
                REVISITED NODES
              </span>
              <span className="font-['Anton'] text-5xl sm:text-6xl leading-none block my-2">08</span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-black font-bold">
                SPACED REPETITION PASS
              </span>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-[#ffdad6] p-6 border-3 border-black shadow-[6px_6px_0px_0px_#000000]"
            >
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#93000a] block uppercase font-bold">
                WEAK / DECAYED
              </span>
              <span className="font-['Anton'] text-5xl sm:text-6xl leading-none block my-2 text-[#ba1a1a]">06</span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#ba1a1a] font-bold">
                FLAGGED FOR RETEST
              </span>
            </motion.div>
          </div>

          {/* Topic Mastery Breakdown with Animated Progress Bars */}
          <div className="bg-white p-6 sm:p-8 border-3 border-black shadow-[8px_8px_0px_0px_#000000]">
            <h3 className="font-['Anton'] text-2xl sm:text-3xl uppercase mb-6 flex items-center justify-between">
              <span>TOPIC MASTERY BREAKDOWN</span>
              <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-[#45474a]">
                ACTIVE CURRICULUM
              </span>
            </h3>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between font-['JetBrains_Mono'] text-[11px] font-bold mb-1.5">
                  <span>01. ARRAYS &amp; HASH MAPS</span>
                  <span>88% MASTERY [15 / 17]</span>
                </div>
                <div className="w-full h-6 bg-[#f1eee7] border-2 border-black p-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '88%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-[#10ffa0] border border-black"
                  ></motion.div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-['JetBrains_Mono'] text-[11px] font-bold mb-1.5">
                  <span>02. TWO POINTER TRAVERSAL</span>
                  <span>72% MASTERY [8 / 11]</span>
                </div>
                <div className="w-full h-6 bg-[#f1eee7] border-2 border-black p-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '72%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                    className="h-full bg-[#10ffa0] border border-black"
                  ></motion.div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-['JetBrains_Mono'] text-[11px] font-bold mb-1.5">
                  <span>03. TREES &amp; TOPOLOGICAL GRAPHS</span>
                  <span>45% MASTERY [5 / 11]</span>
                </div>
                <div className="w-full h-6 bg-[#f1eee7] border-2 border-black p-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '45%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    className="h-full bg-[#1d4ed8] border border-black"
                  ></motion.div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-['JetBrains_Mono'] text-[11px] font-bold mb-1.5">
                  <span>04. DYNAMIC PROGRAMMING RECURSION</span>
                  <span>20% MASTERY [2 / 10]</span>
                </div>
                <div className="w-full h-6 bg-[#f1eee7] border-2 border-black p-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '20%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                    className="h-full bg-[#ba1a1a] border border-black"
                  ></motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SCENE 08 — PROBLEM ARCHIVE & FINAL STATEMENTS                              */}
      {/* ========================================================================= */}
      <section
        id="section-archive"
        className="relative w-full bg-[#fcf9f2] dark:bg-[#121417] text-black dark:text-white py-24 px-6 sm:px-12 lg:px-20 border-b-2 border-black dark:border-white transition-colors"
      >
        <div className="max-w-7xl mx-auto flex flex-col">
          <div className="font-['JetBrains_Mono'] text-[11px] text-[#45474a] dark:text-[#9da2ac] uppercase tracking-widest mb-3 font-bold flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-black dark:bg-white inline-block"></span>
            CHAPTER 08 // CANONICAL ARCHIVE CATALOG
          </div>
          <h2 className="font-['Anton'] text-3xl sm:text-5xl lg:text-6xl uppercase mb-8">
            FOUNDATIONAL TAXONOMY STRIPS
          </h2>

          <div className="flex flex-col gap-3.5 mb-16">
            {[
              {
                idx: '01',
                title: 'ARRAYS & HASHING TAXONOMY',
                desc: 'Two Sum, Group Anagrams, Longest Consecutive Sequence',
                count: '24 PROBLEMS READY',
                id: 'two-sum',
              },
              {
                idx: '02',
                title: 'TWO POINTER INWARD TRAVERSAL',
                desc: 'Container With Most Water, 3Sum, Trapping Rain Water',
                count: '18 PROBLEMS READY',
                id: 'container-with-most-water',
              },
              {
                idx: '03',
                title: 'BINARY SEARCH INTERVAL REDUCTION',
                desc: 'Search Rotated Array, Koko Bananas, Median Matrix',
                count: '16 PROBLEMS READY',
                id: 'binary-search',
              },
              {
                idx: '04',
                title: 'TREES & TOPOLOGICAL GRAPHS',
                desc: 'Invert Binary Tree, Lowest Common Ancestor, Course Schedule',
                count: '32 PROBLEMS READY',
                id: 'invert-binary-tree',
              },
            ].map((strip) => (
              <motion.div
                key={strip.idx}
                whileHover={{ x: 6 }}
                onClick={() => {
                  onSelectProblem(strip.id);
                  onLaunchWorkspace();
                }}
                className="p-5 sm:p-6 bg-[#f1eee7] dark:bg-[#181a1e] border-3 border-black dark:border-white flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-[#ebe8e1] dark:hover:bg-[#202328] cursor-pointer transition-colors shadow-[6px_6px_0px_0px_#000000] dark:shadow-[6px_6px_0px_0px_#ffffff] active:translate-x-1"
              >
                <div className="flex items-center gap-5">
                  <span className="font-['Anton'] text-4xl sm:text-5xl leading-none text-black dark:text-white">
                    {strip.idx}
                  </span>
                  <div>
                    <span className="font-['JetBrains_Mono'] text-[14px] font-extrabold uppercase block text-black dark:text-white">
                      {strip.title}
                    </span>
                    <span className="font-['JetBrains_Mono'] text-[11px] text-[#45474a] dark:text-[#9da2ac]">
                      Contains: {strip.desc}
                    </span>
                  </div>
                </div>
                <span className="mt-3 sm:mt-0 font-['JetBrains_Mono'] text-[11px] bg-black text-[#10ffa0] dark:bg-white dark:text-black px-3.5 py-1.5 font-bold uppercase shadow-[2px_2px_0px_0px_#000000]">
                  {strip.count} →
                </span>
              </motion.div>
            ))}
          </div>

          {/* Final Call to Action Hero Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 sm:p-16 bg-white dark:bg-[#101216] border-4 border-black dark:border-white shadow-[12px_12px_0px_0px_#000000] dark:shadow-[12px_12px_0px_0px_#ffffff] flex flex-col items-center text-center relative overflow-hidden"
          >
            <span className="font-['JetBrains_Mono'] text-[10px] bg-[#10ffa0] text-black px-4 py-1 font-bold border-2 border-black uppercase tracking-widest mb-4 shadow-[2px_2px_0px_0px_#000000]">
              THE FINAL COMMANDMENT
            </span>
            <h2 className="font-['Anton'] text-4xl sm:text-7xl uppercase tracking-tight max-w-4xl leading-tight text-black dark:text-white">
              DON’T JUST SOLVE DSA.
              <br />
              LEARN HOW TO THINK.
            </h2>
            <p className="font-['Work_Sans'] text-base sm:text-lg text-[#45474a] dark:text-[#9da2ac] max-w-xl my-6 leading-relaxed">
              Close the multi-tab video tutorials. Open the blank whiteboard. The architecture of your mind starts here.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onLaunchWorkspace}
              className="px-10 py-5 bg-black text-[#10ffa0] dark:bg-white dark:text-black font-['JetBrains_Mono'] text-base uppercase tracking-wider font-extrabold border-3 border-black dark:border-white shadow-[6px_6px_0px_0px_#10ffa0] dark:shadow-[6px_6px_0px_0px_#000000] transition-all flex items-center gap-3"
            >
              <span>LAUNCH WORKSPACE LAB</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t-2 border-black dark:border-white bg-[#f1eee7] dark:bg-[#0c0d0e] py-6 px-6 lg:px-12 font-['JetBrains_Mono'] text-[10px] text-[#45474a] dark:text-[#9da2ac] uppercase tracking-wider flex flex-col md:flex-row items-center justify-between gap-4 transition-colors">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-black dark:bg-white inline-block"></span>
          <span>DSA PROGRESS BOOK — RIGOROUS ANTI-SAAS STUDY COMPENDIUM</span>
        </div>
        <div className="flex items-center gap-6 font-bold text-black dark:text-white">
          <span>COMPLEXITY: O(1) BASE</span>
          <span>LATENCY: 0.12MS</span>
          <span>INDEXED: VOL. 2025</span>
        </div>
      </footer>
    </div>
  );
};
