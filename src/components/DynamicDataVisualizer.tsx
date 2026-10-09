import React, { useState } from 'react';
import { Problem } from '../types';

interface DynamicDataVisualizerProps {
  problem: Problem;
}

export const DynamicDataVisualizer: React.FC<DynamicDataVisualizerProps> = ({ problem }) => {
  const [step, setStep] = useState(0);

  // Render context-appropriate visual structure based on unit and category
  const renderVisualizerContent = () => {
    // 1. LINKED LISTS
    if (problem.unitId === 'unit-3-linked-lists') {
      const nodes = [1, 2, 3, 4, 5];
      return (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between font-['JetBrains_Mono'] text-[11px]">
            <span className="font-bold uppercase text-[var(--text-on-surface-variant)]">
              LINKED LIST POINTER RE-LINKING TRACE
            </span>
            <span className="text-[#006d41] dark:text-[#10ffa0] font-bold">
              STEP {step + 1} OF {nodes.length}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 p-3 bg-[var(--bg-surface-container)] border border-black dark:border-white overflow-x-auto">
            <div className="px-2 py-1 bg-neutral-200 dark:bg-neutral-800 text-[10px] font-['JetBrains_Mono'] border border-black dark:border-white">
              PREV: {step === 0 ? 'nullptr' : `Node(${nodes[step - 1]})`}
            </div>
            {nodes.map((val, idx) => {
              const isCurr = idx === step;
              const isPast = idx < step;
              return (
                <React.Fragment key={idx}>
                  <div
                    className={`p-3 border-2 border-black dark:border-white flex flex-col items-center min-w-[70px] transition-all ${
                      isCurr
                        ? 'bg-[#10ffa0] text-black shadow-[3px_3px_0px_0px_#000000] -translate-y-1'
                        : isPast
                        ? 'bg-[var(--bg-surface-container-high)] opacity-70'
                        : 'bg-[var(--bg-surface)]'
                    }`}
                  >
                    <span className="font-['JetBrains_Mono'] text-[9px] uppercase font-bold">
                      {isCurr ? '>> CURR <<' : `ADDR: 0x${(idx + 1) * 16}`}
                    </span>
                    <span className="font-['Anton'] text-2xl">{val}</span>
                    <span className="font-['JetBrains_Mono'] text-[9px] text-[var(--text-on-surface-variant)] font-bold">
                      {isPast ? '← reversed' : '→ next'}
                    </span>
                  </div>
                  {idx < nodes.length - 1 && (
                    <span className="font-bold text-lg text-black dark:text-white">
                      {isPast ? '⇄' : '→'}
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      );
    }

    // 2. STACKS & QUEUES
    if (problem.unitId === 'unit-2-stacks-queues') {
      const items = ['(', '[', '{'];
      return (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between font-['JetBrains_Mono'] text-[11px]">
            <span className="font-bold uppercase text-[var(--text-on-surface-variant)]">
              LIFO CONTAINER BUFFER (TOP AT RIGHT)
            </span>
            <span className="text-[#006d41] dark:text-[#10ffa0] font-bold">
              CONTAINER CAPACITY: DYNAMIC
            </span>
          </div>

          <div className="flex items-center gap-2 p-3 bg-[var(--bg-surface-container)] border border-black dark:border-white overflow-x-auto">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[var(--text-on-surface-variant)] font-bold">
              BOTTOM:
            </span>
            {items.map((token, idx) => (
              <div
                key={idx}
                className="px-4 py-2.5 bg-black text-[#10ffa0] dark:bg-white dark:text-black border-2 border-black dark:border-white font-['JetBrains_Mono'] text-lg font-bold shadow-[2px_2px_0px_0px_#10ffa0]"
              >
                {token}
              </div>
            ))}
            <div className="px-3 py-2 bg-[#ffd000] text-black border-2 border-black font-['JetBrains_Mono'] text-[11px] font-bold">
              TOP (TOS)
            </div>
          </div>
        </div>
      );
    }

    // 3. TREES
    if (problem.unitId === 'unit-4-trees') {
      return (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between font-['JetBrains_Mono'] text-[11px]">
            <span className="font-bold uppercase text-[var(--text-on-surface-variant)]">
              HIERARCHICAL TREE INVARIANT INSPECTOR
            </span>
            <span className="text-[#006d41] dark:text-[#10ffa0] font-bold">
              VALIDATION BOUNDS: (-INF, +INF)
            </span>
          </div>

          <div className="p-4 bg-[var(--bg-surface-container)] border border-black dark:border-white flex flex-col items-center gap-2 font-['JetBrains_Mono']">
            {/* Root */}
            <div className="px-4 py-2 bg-black text-[#10ffa0] dark:bg-white dark:text-black border-2 border-black dark:border-white text-base font-bold shadow-[2px_2px_0px_0px_#000000]">
              ROOT: [2] (Range: -INF .. +INF)
            </div>
            <div className="text-sm font-bold">/ &nbsp; &nbsp; &nbsp; \</div>
            {/* Children */}
            <div className="flex items-center gap-8">
              <div className="px-3 py-1.5 bg-[#10ffa0] text-black border border-black text-xs font-bold shadow-[2px_2px_0px_0px_#000000]">
                LEFT: [1] &lt; 2 (VALID)
              </div>
              <div className="px-3 py-1.5 bg-[#10ffa0] text-black border border-black text-xs font-bold shadow-[2px_2px_0px_0px_#000000]">
                RIGHT: [3] &gt; 2 (VALID)
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 4. GRAPHS
    if (problem.unitId === 'unit-5-graphs') {
      return (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between font-['JetBrains_Mono'] text-[11px]">
            <span className="font-bold uppercase text-[var(--text-on-surface-variant)]">
              GRAPH ADJACENCY MATRIX &amp; CONNECTED CLUSTERS
            </span>
            <span className="text-[#006d41] dark:text-[#10ffa0] font-bold">
              COMPONENTS DETECTED
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 font-['JetBrains_Mono'] text-[11px]">
            <div className="p-2.5 bg-[var(--bg-surface)] border border-black dark:border-white">
              <div className="font-bold text-[#006d41] dark:text-[#10ffa0]">CLUSTER A</div>
              <div className="text-xs">Nodes: {'{0, 1, 2}'}</div>
              <div className="text-[10px] text-[var(--text-on-surface-variant)] font-bold">Connected via 2 edges</div>
            </div>
            <div className="p-2.5 bg-[var(--bg-surface)] border border-black dark:border-white">
              <div className="font-bold text-[#1d4ed8] dark:text-[#60a5fa]">CLUSTER B</div>
              <div className="text-xs">Nodes: {'{3, 4}'}</div>
              <div className="text-[10px] text-[var(--text-on-surface-variant)] font-bold">Connected via 1 edge</div>
            </div>
            <div className="p-2.5 bg-[var(--bg-surface)] border border-black dark:border-white col-span-2">
              <div className="font-bold">TRAVERSAL QUEUE / VISITED SET</div>
              <div className="text-xs text-[#006d41] dark:text-[#10ffa0] font-bold">
                Visited: [true, true, true, true, true]
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 5. DEFAULT: ARRAY & TWO POINTERS / BINARY SEARCH
    const sampleArray = [2, 7, 11, 15, 19, 23];
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between font-['JetBrains_Mono'] text-[11px]">
          <span className="font-bold uppercase text-[var(--text-on-surface-variant)]">
            ARRAY INDEX &amp; POINTER REGISTER [std::vector&lt;int&gt;]
          </span>
          <span className="text-[#006d41] dark:text-[#10ffa0] font-bold">
            POINTER AT INDEX {step}
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {sampleArray.map((val, idx) => {
            const isActive = idx === step;
            return (
              <div
                key={idx}
                onClick={() => setStep(idx)}
                className={`p-3 border-2 border-black dark:border-white cursor-pointer transition-all flex flex-col gap-1 ${
                  isActive
                    ? 'bg-[#10ffa0] text-black shadow-[3px_3px_0px_0px_#000000] -translate-y-1'
                    : 'bg-[var(--bg-surface)] text-[var(--text-on-surface)] hover:bg-[var(--bg-surface-container)]'
                }`}
              >
                <div className="flex items-center justify-between font-['JetBrains_Mono'] text-[10px] font-bold">
                  <span>i = {idx}</span>
                  <span>{isActive ? 'ACTIVE' : ''}</span>
                </div>
                <div className="font-['Anton'] text-3xl">{val}</div>
                <div className="font-['JetBrains_Mono'] text-[9px] text-[var(--text-on-surface-variant)] font-bold">
                  Addr: 0x{((idx + 1) * 4).toString(16).toUpperCase()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-3">
      {renderVisualizerContent()}

      {/* Simulator Stepper Controls */}
      <div className="flex items-center gap-2 pt-1 font-['JetBrains_Mono'] text-[10px]">
        <button
          onClick={() => setStep((prev) => Math.max(0, prev - 1))}
          disabled={step === 0}
          className="px-2.5 py-1 bg-[var(--bg-surface)] border border-black dark:border-white font-bold uppercase hover:bg-[var(--bg-surface-container)] disabled:opacity-40"
        >
          ← PREV STEP
        </button>
        <button
          onClick={() => setStep((prev) => Math.min(5, prev + 1))}
          disabled={step === 5}
          className="px-2.5 py-1 bg-black text-[#10ffa0] dark:bg-white dark:text-black border border-black dark:border-white font-bold uppercase hover:opacity-80 disabled:opacity-40"
        >
          NEXT STEP →
        </button>
        <span className="text-[var(--text-on-surface-variant)] italic ml-2 hidden sm:inline font-bold">
          Interactive mental trace synchronized with {problem.pattern}
        </span>
      </div>
    </div>
  );
};
