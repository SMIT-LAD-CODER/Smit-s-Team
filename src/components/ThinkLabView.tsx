import React, { useState } from 'react';

export const ThinkLabView: React.FC = () => {
  const [selectedArchetype, setSelectedArchetype] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const archetypes = [
    {
      title: 'ARRAYS: UNSORTED PAIR MATCHING',
      problem: 'Find two items summing to target in an unordered array.',
      options: [
        { label: 'Sort array + Two Pointers', time: 'O(N log N)', space: 'O(1) or O(N)', note: 'Good, but sorting takes O(N log N) and scrambles original indices.' },
        { label: 'One-Pass Hash Map Cache', time: 'O(N)', space: 'O(N)', note: 'Optimal! Trade space for instant O(1) past value inspection.', optimal: true },
        { label: 'Nested Loops (Brute Force)', time: 'O(N²)', space: 'O(1)', note: 'Sub-optimal. Will hit Time Limit Exceeded on N ≥ 10⁴.' },
      ],
      invariant: 'For any element x, its mate is uniquely (target - x). By recording past elements, you never look forward in O(N).',
    },
    {
      title: 'SEARCHING: MONOTONIC OR SORTED RANGE',
      problem: 'Find integer threshold where condition f(x) switches from false to true.',
      options: [
        { label: 'Linear scan from 0 to MAX', time: 'O(N)', space: 'O(1)', note: 'Too slow when search domain is 10⁹.' },
        { label: 'Binary Search on Answer Space', time: 'O(log(MAX))', space: 'O(1)', note: 'Optimal! If f(mid) is monotonic, discard half the possibilities each check.', optimal: true },
        { label: 'Hash Table Lookup', time: 'O(1)', space: 'O(MAX)', note: 'Impossible. You cannot pre-allocate 10⁹ elements in memory.' },
      ],
      invariant: 'Monotonicity is the prerequisite for Binary Search. If true remains true for all subsequent values, divide and conquer.',
    },
    {
      title: 'STRINGS: CONTIGUOUS SUBSTRING WITHOUT REPEATS',
      problem: 'Find the length of the longest substring with unique characters.',
      options: [
        { label: 'Generate all O(N²) substrings and test', time: 'O(N³)', space: 'O(N)', note: 'Catastrophic time limit exceeded.' },
        { label: 'Sliding Window (Left & Right Pointers)', time: 'O(N)', space: 'O(min(N, M))', note: 'Optimal! Expand R until duplicate, then contract L until duplicate is evicted.', optimal: true },
        { label: 'Recursion with Backtracking', time: 'O(2ᴺ)', space: 'O(N)', note: 'Exponential complexity. Unusable for strings > 25 chars.' },
      ],
      invariant: 'A sliding window maintains a valid subsegment invariant. Each element is added once and evicted at most once.',
    },
  ];

  const current = archetypes[selectedArchetype];

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-[var(--bg-surface)] text-[var(--text-on-surface)] p-6 sm:p-10 transition-colors">
      <div className="border-b-2 border-black dark:border-white pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="font-['JetBrains_Mono'] text-[10px] text-[var(--text-on-surface-variant)] uppercase tracking-widest mb-1 font-bold">
            MODULE 02 // INTUITION PROVING GROUND
          </div>
          <h1 className="font-['Anton'] text-4xl sm:text-6xl uppercase tracking-tight text-black dark:text-white leading-none">
            THINK LAB
          </h1>
          <p className="font-['Work_Sans'] text-sm text-[var(--text-on-surface-variant)] mt-2 max-w-xl">
            Pattern recognition workout. Train your neural pathways to pick the right algorithmic logic model before touching syntax.
          </p>
        </div>

        {/* Archetype selector buttons */}
        <div className="flex flex-wrap gap-1 bg-[var(--bg-surface-container)] p-1 border border-black dark:border-white font-['JetBrains_Mono'] text-[11px]">
          {archetypes.map((arch, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedArchetype(i);
                setSelectedOption(null);
              }}
              className={`px-3 py-1 uppercase font-bold transition-all ${
                selectedArchetype === i
                  ? 'bg-black text-[#10ffa0] dark:bg-white dark:text-black'
                  : 'text-[var(--text-on-surface-variant)] hover:text-black dark:hover:text-white hover:bg-[var(--bg-surface-container-high)]'
              }`}
            >
              ARCHETYPE 0{i + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Specification */}
        <div className="lg:col-span-5 bg-white dark:bg-[#121316] p-6 border-2 border-black dark:border-white shadow-[6px_6px_0px_0px_#000000] dark:shadow-[6px_6px_0px_0px_#ffffff] flex flex-col justify-between">
          <div>
            <span className="bg-black text-white dark:bg-white dark:text-black px-2 py-0.5 font-['JetBrains_Mono'] text-[10px] uppercase font-bold">
              PATTERN SCHEMATIC
            </span>
            <h3 className="font-['Anton'] text-2xl uppercase mt-3 mb-2 text-black dark:text-white">{current.title}</h3>
            <p className="font-['Work_Sans'] text-[14px] text-black dark:text-white leading-relaxed mb-4">
              <strong>Scenario:</strong> {current.problem}
            </p>
            <div className="p-3 bg-[var(--bg-surface-container)] border border-black dark:border-white font-['JetBrains_Mono'] text-[11px] text-[var(--text-on-surface-variant)]">
              // RULE: Do not open code editor until you formulate the space-time invariant.
            </div>
          </div>

          <div className="mt-6 pt-4 border-t-2 border-black/20 dark:border-white/20 font-['JetBrains_Mono'] text-[11px] text-[var(--text-on-surface)]">
            <strong className="text-[#006d41] dark:text-[#10ffa0] block mb-1">FOUNDATIONAL INVARIANT:</strong>
            {current.invariant}
          </div>
        </div>

        {/* Right Options */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="font-['JetBrains_Mono'] text-[11px] font-bold text-[var(--text-on-surface-variant)] uppercase">
            WHICH APPROACH YIELDS THE OPTIMAL COMPUTATIONAL BOUND?
          </div>

          {current.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedOption(idx)}
                className={`text-left p-4 border-2 border-black dark:border-white transition-all flex flex-col gap-1 ${
                  isSelected
                    ? opt.optimal
                      ? 'bg-[#10ffa0] text-black shadow-[4px_4px_0px_0px_#000000]'
                      : 'bg-[#ffdad6] text-[#ba1a1a] shadow-[4px_4px_0px_0px_#000000]'
                    : 'bg-white dark:bg-[#121316] text-black dark:text-white hover:bg-[var(--bg-surface-container)] shadow-[2px_2px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#ffffff]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-['JetBrains_Mono'] text-[13px] font-bold">
                    {opt.label}
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[10px] font-bold bg-black text-white dark:bg-white dark:text-black px-2 py-0.5 border border-black dark:border-white">
                    Time: {opt.time} | Space: {opt.space}
                  </span>
                </div>
                <p className="font-['Work_Sans'] text-[12px] mt-1 text-[var(--text-on-surface-variant)]">
                  {opt.note}
                </p>
              </button>
            );
          })}

          {selectedOption !== null && (
            <div
              className={`p-4 border-2 border-black dark:border-white font-['JetBrains_Mono'] text-[12px] leading-relaxed shadow-[4px_4px_0px_0px_#000000] dark:shadow-[4px_4px_0px_0px_#ffffff] ${
                current.options[selectedOption].optimal
                  ? 'bg-[#10ffa0] text-[#007144] font-bold'
                  : 'bg-[#ffdad6] text-[#93000a] font-bold'
              }`}
            >
              {current.options[selectedOption].optimal
                ? '★ CORRECT DEDUCTION. You identified the optimal invariant.'
                : '⚠ SUB-OPTIMAL CHOICE. Analyze the space-time trade-off above.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
