import React from 'react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  currentModule: string;
  onSelectModule: (module: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentModule, onSelectModule }) => {
  const { isAuthenticated, user } = useAuth();

  const modules = [
    { id: 'editorial-chronicle', label: '00 // OVERVIEW', tag: 'CHRONICLE' },
    { id: 'problems-index', label: '01 // PROBLEMS', tag: 'LEDGER' },
    { id: 'think-schematic', label: '02 // THINK LAB', tag: 'INTUITION' },
    { id: 'visualize-matrix', label: '03 // VISUALIZE', tag: 'WHITEBOARD' },
    { id: 'code-terminal', label: '04 // CODE RUNNER', tag: 'COMPILER' },
    { id: 'mentor-review', label: '05 // MENTOR SOCRATIC', tag: 'SOCRATES' },
    { id: 'progress-ledger', label: '06 // LEDGER STATS', tag: 'SPACED REP' },
    { id: 'contest-arena', label: '07 // CONTEST SPRINT', tag: 'COLLEGE' },
    ...(isAuthenticated
      ? [
          { id: 'dashboard', label: '08 // DASHBOARD', tag: 'WORKSPACE' },
          { id: 'profile', label: '09 // PASSPORT', tag: 'PROFILE' },
        ]
      : []),
    { id: 'settings', label: '10 // SETTINGS', tag: 'PREFERENCES' },
  ];

  return (
    <aside className="fixed left-0 top-20 bottom-0 w-64 bg-[var(--bg-surface-container)] border-r-2 border-black dark:border-white z-40 flex flex-col justify-between hidden md:flex transition-colors duration-200">
      <div className="p-4 border-b border-black/20 dark:border-white/20">
        <div className="font-['JetBrains_Mono'] text-[11px] uppercase text-[var(--text-on-surface-variant)] tracking-wider mb-2 font-bold">
          MODULE INDEX
        </div>
        <div className="font-['Anton'] text-2xl leading-tight uppercase text-[var(--text-on-surface)]">
          SYSTEMS CORE
        </div>
      </div>

      {/* Nav Link Items */}
      <nav className="flex-1 overflow-y-auto p-3 flex flex-col gap-1">
        {modules.map((m) => {
          const isActive = currentModule === m.id;
          return (
            <button
              key={m.id}
              onClick={() => onSelectModule(m.id)}
              className={`flex items-center justify-between p-2 font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider transition-all border text-left ${
                isActive
                  ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-[2px_2px_0px_0px_#10ffa0]'
                  : 'text-[var(--text-on-surface-variant)] hover:bg-[var(--bg-surface-container-high)] hover:text-[var(--text-on-surface)] border-transparent'
              }`}
            >
              <span className="font-bold">{m.label}</span>
              <span className="text-[10px] opacity-70">→</span>
            </button>
          );
        })}
      </nav>

      {/* Footer System Status */}
      <div className="p-3 bg-[var(--bg-surface)] border-t border-black/20 dark:border-white/20">
        <div className="p-2 border border-black dark:border-white bg-[#10ffa0] text-[#007144] font-['JetBrains_Mono'] text-[10px] uppercase font-bold leading-snug">
          NODE: ACTIVE
          <br />
          {isAuthenticated ? `USER: @${user?.username || 'active'}` : 'GUEST EXPLORER'}
        </div>
      </div>
    </aside>
  );
};
