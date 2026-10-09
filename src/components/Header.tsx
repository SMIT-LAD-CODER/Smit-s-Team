import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  onOpenAuth,
  onOpenProfile,
}) => {
  const { user, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'editorial-chronicle', label: '[CHRONICLE // EDITORIAL]' },
    { id: 'workspace-lab', label: '[WORKSPACE LAB]' },
    ...(isAuthenticated ? [{ id: 'dashboard', label: '[DASHBOARD]' }] : []),
    { id: 'founder-blueprint', label: '[FOUNDER BLUEPRINT]' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-surface)]/95 backdrop-blur-md border-b-2 border-black dark:border-white transition-colors duration-200">
      <div className="h-20 w-full px-4 lg:px-8 flex items-center justify-between">
        {/* Left Branding */}
        <div className="flex items-center gap-4">
          <div
            onClick={() => onViewChange('editorial-chronicle')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 border-2 border-black dark:border-white bg-white dark:bg-black flex items-center justify-center p-1 shadow-[2px_2px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#ffffff] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <line x1="50" y1="26" x2="26" y2="74" stroke="currentColor" strokeWidth="6" />
                <line x1="50" y1="26" x2="74" y2="74" stroke="currentColor" strokeWidth="6" />
                <circle cx="50" cy="26" r="16" fill="#10ffa0" stroke="currentColor" strokeWidth="5" />
                <circle cx="26" cy="74" r="14" fill="#ffd000" stroke="currentColor" strokeWidth="5" />
                <circle cx="74" cy="74" r="14" fill="#7c3aed" stroke="currentColor" strokeWidth="5" />
              </svg>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-['Anton'] text-xl sm:text-2xl tracking-tight uppercase leading-none text-black dark:text-white">
                  DSA PROGRESS BOOK
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 bg-black text-[#10ffa0] dark:bg-white dark:text-black font-['JetBrains_Mono'] text-[10px] font-bold uppercase border border-black dark:border-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10ffa0] animate-pulse"></span>
                  LOGIC LAB
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1 font-['JetBrains_Mono'] text-[10px] text-[var(--text-on-surface-variant)] uppercase tracking-widest">
                <span>VOL. 2025 // EDITION 01</span>
                <span>|</span>
                <span>DARK MODE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Navigation Links (Desktop) */}
        <div className="flex items-center gap-3">
          <nav className="hidden xl:flex items-center border border-black dark:border-white p-0.5 bg-[var(--bg-surface-container)]">
            {navLinks.map((link) => {
              const isActive =
                currentView === link.id ||
                (link.id === 'workspace-lab' &&
                  (currentView === 'code-terminal' ||
                    currentView === 'mentor-review' ||
                    currentView === 'visualize-matrix'));
              return (
                <button
                  key={link.id}
                  onClick={() => onViewChange(link.id)}
                  className={`px-3 py-1.5 font-['JetBrains_Mono'] text-[11px] font-bold tracking-wider uppercase transition-colors ${
                    isActive
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'text-[var(--text-on-surface-variant)] hover:text-black dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* User Auth or Passport */}
          <div className="flex items-center gap-2 pl-2 border-l border-black/20 dark:border-white/20">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <div
                  onClick={onOpenProfile}
                  className="hidden md:flex flex-col text-right font-['JetBrains_Mono'] text-[10px] leading-tight cursor-pointer hover:opacity-80"
                >
                  <span className="font-bold text-black dark:text-white flex items-center justify-end gap-1">
                    <span className="text-amber-500">🔥</span> {user?.streakCount || 7} DAYS
                  </span>
                  <span className="text-[var(--text-on-surface-variant)] truncate max-w-[120px]">
                    @{user?.username}
                  </span>
                </div>

                <button
                  onClick={onOpenProfile}
                  className="w-8 h-8 rounded-full bg-black text-[#10ffa0] dark:bg-white dark:text-black flex items-center justify-center font-['Anton'] text-sm border border-black dark:border-white hover:scale-105 transition-transform"
                  title="Open Passport Profile"
                >
                  {user?.avatar || '01'}
                </button>

                <button
                  onClick={() => onViewChange('settings')}
                  className={`w-8 h-8 border-2 border-black dark:border-white flex items-center justify-center ${
                    currentView === 'settings'
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'bg-[var(--bg-surface-container)] text-black dark:text-white hover:bg-[var(--bg-surface-container-high)]'
                  }`}
                  title="Settings"
                >
                  <span className="material-symbols-outlined text-[17px]">settings</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3 py-1.5 bg-black text-[#10ffa0] dark:bg-white dark:text-black font-['JetBrains_Mono'] text-[11px] font-extrabold uppercase border border-black dark:border-white shadow-[2px_2px_0px_0px_#10ffa0] active:translate-x-0.5 active:translate-y-0.5"
              >
                SIGN IN →
              </button>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-8 h-8 border-2 border-black dark:border-white bg-[var(--bg-surface-container)] flex items-center justify-center text-black dark:text-white"
            >
              <span className="material-symbols-outlined text-[20px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Touch Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden w-full bg-[var(--bg-surface)] border-b-2 border-black dark:border-white p-4 flex flex-col gap-2 font-['JetBrains_Mono'] text-[11px] uppercase font-bold shadow-md">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onViewChange(link.id);
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 text-left border ${
                currentView === link.id
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'text-[var(--text-on-surface)] border-transparent'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              onViewChange('settings');
              setMobileMenuOpen(false);
            }}
            className="p-2.5 text-left border border-transparent text-[var(--text-on-surface)]"
          >
            [SETTINGS]
          </button>
        </div>
      )}
    </header>
  );
};
