import React from 'react';
import { useAuth } from '../context/AuthContext';

interface RightRailProps {
  currentModule: string;
  onSelectModule: (module: string) => void;
}

export const RightRail: React.FC<RightRailProps> = ({ currentModule, onSelectModule }) => {
  const { isAuthenticated } = useAuth();

  const tabs = [
    { id: 'editorial-chronicle', label: 'HOME', bg: 'bg-[var(--bg-surface)] text-[var(--text-on-surface)]' },
    { id: 'problems-index', label: 'PROBLEMS', bg: 'bg-[var(--bg-surface-container)] text-[var(--text-on-surface)]' },
    { id: 'think-schematic', label: 'THINK', bg: 'bg-[var(--bg-surface-container-high)] text-[var(--text-on-surface)]' },
    { id: 'visualize-matrix', label: 'VISUALIZE', bg: 'bg-[var(--bg-surface-container)] text-[var(--text-on-surface)]' },
    { id: 'code-terminal', label: 'CODE', bg: 'bg-[#10ffa0] text-[#007144]' },
    { id: 'mentor-review', label: 'MENTOR', bg: 'bg-[#1b1c1d] text-[#fcf9f2]' },
    { id: 'progress-ledger', label: 'PROGRESS', bg: 'bg-[#c7c6c7] text-black' },
    { id: 'contest-arena', label: 'CONTEST', bg: 'bg-[#ba1a1a] text-white' },
    ...(isAuthenticated
      ? [{ id: 'dashboard', label: 'DASH', bg: 'bg-[#ffd000] text-black' }]
      : []),
    { id: 'settings', label: 'SETTINGS', bg: 'bg-[var(--bg-surface-container)] text-[var(--text-on-surface)]' },
  ];

  return (
    <aside className="fixed right-0 top-20 bottom-0 w-12 z-40 flex flex-col justify-between items-center py-2 bg-[var(--bg-surface-container)] dark:bg-[#121316] border-l-2 border-black dark:border-white select-none transition-colors duration-200">
      <nav className="flex flex-col w-full h-full justify-between items-end gap-1">
        {tabs.map((tab) => {
          const isActive = currentModule === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectModule(tab.id)}
              title={tab.label}
              className={`group relative w-11 hover:w-12 transition-all h-full max-h-12 border-y border-l border-black dark:border-white flex items-center justify-center ${
                tab.bg
              } ${
                isActive ? 'translate-x-0 ring-2 ring-[#10ffa0] shadow-[-2px_0px_0px_#10ffa0]' : ''
              }`}
            >
              <span className="writing-mode-vertical rotate-180 font-['JetBrains_Mono'] text-[9px] uppercase tracking-widest font-extrabold">
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
