import React, { useState } from 'react';
import { Problem } from '../types';
import { useAuth } from '../context/AuthContext';

interface ReflectionModalProps {
  problem: Problem | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveReflection?: (notes: { pattern: string; mistake: string; revisionDays: number }) => void;
}

export const ReflectionModal: React.FC<ReflectionModalProps> = ({
  problem,
  isOpen,
  onClose,
  onSaveReflection,
}) => {
  const { saveReflection } = useAuth();

  if (!isOpen || !problem) return null;

  const [pattern, setPattern] = useState(
    'Complement caching via hash map: trade O(N) memory for instantaneous O(1) lookup.'
  );
  const [mistake, setMistake] = useState(
    'Ensure you check if complement exists BEFORE storing current element to prevent self-pairing.'
  );
  const [revisionDays, setRevisionDays] = useState(3);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + revisionDays);
    const nextRevisionDate = nextDate
      .toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
      .toUpperCase();

    await saveReflection({
      problemId: problem.id,
      problemTitle: problem.title,
      corePattern: pattern,
      trapEncountered: mistake,
      timeSpentMinutes: 15,
      nextRevisionDate,
      confidence: 'HIGH',
    });

    if (onSaveReflection) {
      onSaveReflection({ pattern, mistake, revisionDays });
    }

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-[var(--bg-surface)] text-[var(--text-on-surface)] border-4 border-black dark:border-white p-6 sm:p-8 shadow-[12px_12px_0px_0px_#10ffa0] animate-in fade-in duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-black dark:border-white mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#10ffa0] border border-black inline-block"></span>
            <span className="font-['JetBrains_Mono'] text-[11px] font-bold uppercase tracking-wider text-black dark:text-white">
              STAGE 05 // INTELLECTUAL REFLECTION
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 bg-black text-white dark:bg-white dark:text-black hover:opacity-80 flex items-center justify-center font-['JetBrains_Mono'] text-[12px] font-bold"
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <h3 className="font-['Anton'] text-3xl uppercase leading-none text-black dark:text-white">
            REFLECT ON: {problem.title}
          </h3>
          <p className="font-['Work_Sans'] text-[13px] text-[var(--text-on-surface-variant)] mt-1">
            Solutions fade in 48 hours without active cognitive reflection. Lock this pattern into your long-term memory.
          </p>
        </div>

        {isSaved ? (
          <div className="p-6 bg-[#10ffa0] text-black border-2 border-black font-['JetBrains_Mono'] text-center">
            <div className="text-2xl font-bold mb-1">✓ REFLECTION COMMITTED</div>
            <div className="text-sm">Added to your Spaced Repetition queue for review in {revisionDays} days!</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-['JetBrains_Mono'] text-[12px]">
            {/* Question 1 */}
            <div>
              <label className="block font-bold text-black dark:text-white uppercase mb-1">
                1. What is the fundamental invariant/pattern?
              </label>
              <textarea
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                rows={2}
                className="w-full p-2.5 bg-white dark:bg-neutral-900 border-2 border-black dark:border-white outline-none font-['Work_Sans'] text-[13px] text-black dark:text-white focus:ring-2 focus:ring-[#10ffa0]"
                placeholder="e.g. Inward two-pointer crawl on sorted boundaries..."
              />
            </div>

            {/* Question 2 */}
            <div>
              <label className="block font-bold text-black dark:text-white uppercase mb-1">
                2. What trap or edge-case must you remember?
              </label>
              <textarea
                value={mistake}
                onChange={(e) => setMistake(e.target.value)}
                rows={2}
                className="w-full p-2.5 bg-white dark:bg-neutral-900 border-2 border-black dark:border-white outline-none font-['Work_Sans'] text-[13px] text-black dark:text-white focus:ring-2 focus:ring-[#10ffa0]"
                placeholder="e.g. Negative values, duplicate inputs, off-by-one bounds..."
              />
            </div>

            {/* Spaced Repetition schedule */}
            <div>
              <label className="block font-bold text-black dark:text-white uppercase mb-1">
                3. Schedule Spaced Repetition Review:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { days: 1, label: 'TOMORROW (+1D)' },
                  { days: 3, label: '3 DAYS (+3D)' },
                  { days: 7, label: '1 WEEK (+7D)' },
                ].map((s) => (
                  <button
                    key={s.days}
                    type="button"
                    onClick={() => setRevisionDays(s.days)}
                    className={`py-2 px-1 text-center font-['JetBrains_Mono'] text-[11px] font-bold border-2 border-black dark:border-white transition-all ${
                      revisionDays === s.days
                        ? 'bg-black text-[#10ffa0] dark:bg-white dark:text-black shadow-[2px_2px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#ffffff]'
                        : 'bg-[var(--bg-surface-container)] text-[var(--text-on-surface)] hover:opacity-80'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="mt-4 pt-3 border-t-2 border-black/20 dark:border-white/20 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-[var(--bg-surface-container)] text-black dark:text-white border border-black dark:border-white font-bold uppercase hover:opacity-80"
              >
                SKIP
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-black text-[#10ffa0] dark:bg-white dark:text-black font-bold uppercase border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_#000000] dark:shadow-[3px_3px_0px_0px_#ffffff] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                COMMIT TO MEMORY →
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
