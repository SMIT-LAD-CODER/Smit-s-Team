import React from 'react';

export const ProgressLedgerView: React.FC = () => {
  const revisionQueue = [
    { title: 'BINARY SEARCH', due: 'TODAY', category: 'Binary Search', trap: 'Boundary convergence left <= right vs left < right' },
    { title: 'CONTAINER WITH MOST WATER', due: 'IN 2 DAYS', category: 'Two Pointers', trap: 'Moving taller wall instead of shorter wall' },
    { title: 'INVERT BINARY TREE', due: 'IN 4 DAYS', category: 'Trees & Graphs', trap: 'Overwriting root->left before right is inverted' },
  ];

  const mistakeJournal = [
    {
      date: 'OCT 04, 2026',
      problem: 'Two Sum',
      mistake: 'Inserted nums[i] into hash map BEFORE testing if (target - nums[i]) was seen.',
      consequence: 'Failed on [3, 3] target 6 because the index was matched with itself!',
      ruleLearned: 'Always verify complement existence before writing current value into the registry.',
    },
    {
      date: 'OCT 02, 2026',
      problem: 'Binary Search',
      mistake: 'Computed mid = (left + right) / 2.',
      consequence: 'Integer overflow hazard in C++ when left + right exceeds INT_MAX.',
      ruleLearned: 'Always write left + (right - left) / 2.',
    },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-[var(--bg-surface)] text-[var(--text-on-surface)] p-6 sm:p-10 lg:p-14 transition-colors">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-black dark:border-white pb-6 mb-8">
        <div>
          <div className="font-['JetBrains_Mono'] text-[10px] text-[var(--text-on-surface-variant)] font-extrabold uppercase tracking-widest mb-1">
            MODULE 06 // ACADEMIC LEDGER &amp; WEAK-TOPIC DETECTION
          </div>
          <h1 className="font-['Anton'] text-4xl sm:text-6xl uppercase tracking-tight text-black dark:text-white leading-none">
            PROGRESS LEDGER
          </h1>
          <p className="font-['Work_Sans'] text-sm text-[var(--text-on-surface-variant)] mt-2 max-w-xl">
            Focus on learning consistency, weak-pattern detection, and spaced repetition rather than vanity solve counts.
          </p>
        </div>

        <div className="p-3 bg-white dark:bg-[#121316] border-2 border-black dark:border-white font-['JetBrains_Mono'] text-[11px] shadow-[4px_4px_0px_0px_#000000] dark:shadow-[4px_4px_0px_0px_#ffffff]">
          <span className="text-[#006d41] dark:text-[#10ffa0] font-bold block">CURRENT STREAK: 7 DAYS 🔥</span>
          <span className="text-[var(--text-on-surface-variant)]">CONSISTENCY SCORE: 94%</span>
        </div>
      </div>

      {/* Statistics Wall */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-[#121316] p-5 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_#000000] dark:shadow-[4px_4px_0px_0px_#ffffff]">
          <span className="font-['JetBrains_Mono'] text-[10px] text-[var(--text-on-surface-variant)] uppercase font-bold block">
            PROBLEMS ATTEMPTED
          </span>
          <span className="font-['Anton'] text-4xl sm:text-5xl leading-none my-2 block text-black dark:text-white">42</span>
          <span className="font-['JetBrains_Mono'] text-[10px] text-[var(--text-on-surface)] font-bold">TOTAL TRIAL CYCLES</span>
        </div>

        <div className="bg-[#10ffa0] p-5 border-2 border-black shadow-[4px_4px_0px_0px_#000000] text-black">
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#007144] uppercase font-bold block">
            FULLY MASTERED
          </span>
          <span className="font-['Anton'] text-4xl sm:text-5xl leading-none my-2 block">17</span>
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#007144] font-bold">ZERO-HINT FIRST RUN</span>
        </div>

        <div className="bg-white dark:bg-[#121316] p-5 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_#000000] dark:shadow-[4px_4px_0px_0px_#ffffff]">
          <span className="font-['JetBrains_Mono'] text-[10px] text-[var(--text-on-surface-variant)] uppercase font-bold block">
            REVISITED NODES
          </span>
          <span className="font-['Anton'] text-4xl sm:text-5xl leading-none my-2 block text-black dark:text-white">08</span>
          <span className="font-['JetBrains_Mono'] text-[10px] text-[var(--text-on-surface)] font-bold">SPACED REPETITION PASS</span>
        </div>

        <div className="bg-[#ffdad6] p-5 border-2 border-black shadow-[4px_4px_0px_0px_#000000] text-black">
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#ba1a1a] uppercase font-bold block">
            WEAK / DECAYED
          </span>
          <span className="font-['Anton'] text-4xl sm:text-5xl leading-none my-2 block text-[#ba1a1a]">06</span>
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#ba1a1a] font-bold">FLAGGED FOR RETEST</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Spaced Repetition Queue */}
        <div className="lg:col-span-6 bg-white dark:bg-[#121316] p-6 border-2 border-black dark:border-white shadow-[6px_6px_0px_0px_#000000] dark:shadow-[6px_6px_0px_0px_#ffffff]">
          <div className="flex items-center justify-between pb-3 border-b-2 border-black dark:border-white mb-4">
            <span className="font-['Anton'] text-2xl uppercase text-black dark:text-white">SPACED REPETITION QUEUE</span>
            <span className="bg-[#10ffa0] text-black text-[10px] font-['JetBrains_Mono'] font-bold px-2 py-0.5 border border-black">
              MEMORY DECAY GUARD
            </span>
          </div>

          <div className="space-y-3 font-['JetBrains_Mono'] text-[12px]">
            {revisionQueue.map((item, idx) => (
              <div key={idx} className="p-3 bg-[var(--bg-surface-container)] border border-black dark:border-white flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-black dark:text-white">{item.title}</span>
                  <span
                    className={`px-1.5 py-0.5 text-[9px] font-bold uppercase border border-black ${
                      item.due === 'TODAY' ? 'bg-[#ba1a1a] text-white' : 'bg-black text-white dark:bg-white dark:text-black'
                    }`}
                  >
                    DUE: {item.due}
                  </span>
                </div>
                <span className="text-[10px] text-[var(--text-on-surface-variant)] font-['Work_Sans']">
                  Trap to recall: {item.trap}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Mistake Journal */}
        <div className="lg:col-span-6 bg-white dark:bg-[#121316] p-6 border-2 border-black dark:border-white shadow-[6px_6px_0px_0px_#000000] dark:shadow-[6px_6px_0px_0px_#ffffff]">
          <div className="flex items-center justify-between pb-3 border-b-2 border-black dark:border-white mb-4">
            <span className="font-['Anton'] text-2xl uppercase text-black dark:text-white">PERSONAL MISTAKE JOURNAL</span>
            <span className="bg-black text-white dark:bg-white dark:text-black text-[10px] font-['JetBrains_Mono'] font-bold px-2 py-0.5 border border-black dark:border-white">
              PAIN = RETENTION
            </span>
          </div>

          <div className="space-y-3 font-['JetBrains_Mono'] text-[11px]">
            {mistakeJournal.map((entry, idx) => (
              <div key={idx} className="p-3 bg-[var(--bg-surface-container)] border border-black dark:border-white flex flex-col gap-1">
                <div className="flex items-center justify-between font-bold text-black dark:text-white">
                  <span>{entry.problem}</span>
                  <span className="text-[10px] text-[var(--text-on-surface-variant)]">{entry.date}</span>
                </div>
                <div className="text-[#ba1a1a] dark:text-red-400 font-semibold">✖ Trap: {entry.mistake}</div>
                <div className="text-[#006d41] dark:text-[#10ffa0] font-bold">✓ Rule: {entry.ruleLearned}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
