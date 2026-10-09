import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface SettingsViewProps {
  onSignOut: () => void;
  onOpenProfile: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onSignOut, onOpenProfile }) => {
  const { user, updateSettings } = useAuth();

  const [activeTab, setActiveTab] = useState<
    'appearance' | 'learning' | 'editor' | 'accessibility' | 'privacy' | 'account'
  >('appearance');

  // Form states
  const [themeMode] = useState<'dark'>('dark');
  const [dailyGoal, setDailyGoal] = useState<number>(user?.settings?.dailyGoal || 2);
  const [difficultyPreference, setDifficultyPreference] = useState(
    user?.settings?.difficultyPreference || 'MEDIUM'
  );
  const [preferredLanguage, setPreferredLanguage] = useState(user?.settings?.preferredLanguage || 'cpp');
  const [editorFontSize, setEditorFontSize] = useState<number>(user?.settings?.editorFontSize || 13);
  const [editorTheme, setEditorTheme] = useState(user?.settings?.editorTheme || 'carbon');
  const [editorTabSize, setEditorTabSize] = useState<2 | 4>(user?.settings?.editorTabSize || 4);
  const [editorWordWrap, setEditorWordWrap] = useState<boolean>(user?.settings?.editorWordWrap ?? false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(user?.settings?.reducedMotion ?? false);
  const [animationIntensity, setAnimationIntensity] = useState<'subtle' | 'normal' | 'minimal'>(
    user?.settings?.animationIntensity || 'normal'
  );
  const [highContrast, setHighContrast] = useState<boolean>(user?.settings?.highContrast ?? false);
  const [accountVisibility, setAccountVisibility] = useState<'public' | 'private'>(
    user?.settings?.accountVisibility || 'public'
  );
  const [emailReminders, setEmailReminders] = useState<boolean>(user?.settings?.emailReminders ?? true);

  const [saveToast, setSaveToast] = useState(false);

  const triggerSaveToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleApplySettings = async () => {
    await updateSettings({
      theme: themeMode,
      dailyGoal,
      difficultyPreference: difficultyPreference as any,
      preferredLanguage,
      editorFontSize,
      editorTheme: editorTheme as any,
      editorTabSize,
      editorWordWrap,
      reducedMotion,
      animationIntensity,
      highContrast,
      accountVisibility,
      emailReminders,
    });
    triggerSaveToast();
  };

  const handleExportData = () => {
    const dataToExport = {
      profile: {
        name: user?.name,
        email: user?.email,
        college: user?.college,
        streakCount: user?.streakCount,
      },
      settings: user?.settings,
      progress: user?.progress,
      reflections: user?.reflections,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dsa_progress_book_${user?.username || 'student'}_backup.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-[var(--bg-surface)] text-[var(--text-on-surface)] p-6 sm:p-10 lg:p-14">
      {/* Header */}
      <div className="border-b-2 border-black dark:border-white pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="font-['JetBrains_Mono'] text-[10px] text-[var(--text-on-surface-variant)] uppercase tracking-widest mb-1.5 font-bold">
            MODULE 10 // ENVIRONMENT &amp; PREFERENCES
          </div>
          <h1 className="font-['Anton'] text-4xl sm:text-6xl uppercase tracking-tight leading-none">
            WORKSPACE SETTINGS
          </h1>
          <p className="font-['Work_Sans'] text-sm text-[var(--text-on-surface-variant)] mt-2">
            Configure your thinking environment, theme mechanics, compiler preferences, and data privacy.
          </p>
        </div>

        {saveToast && (
          <div className="p-3 bg-[#10ffa0] text-black border-2 border-black font-['JetBrains_Mono'] text-[11px] font-bold shadow-[2px_2px_0px_0px_#000000] animate-bounce">
            SETTINGS PERSISTED TO LOCAL HEAP ✓
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Tabs (Col 3) */}
        <div className="lg:col-span-3 flex flex-col gap-1 bg-[var(--bg-surface-container)] p-2 border-2 border-black dark:border-white font-['JetBrains_Mono'] text-[11px] shadow-[4px_4px_0px_0px_#000000] dark:shadow-[4px_4px_0px_0px_#ffffff]">
          {[
            { id: 'appearance', label: '01 // APPEARANCE' },
            { id: 'learning', label: '02 // LEARNING GOALS' },
            { id: 'editor', label: '03 // CODE EDITOR' },
            { id: 'accessibility', label: '04 // ACCESSIBILITY' },
            { id: 'privacy', label: '05 // PRIVACY & EXPORT' },
            { id: 'account', label: '06 // ACCOUNT SECURITY' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`p-3 text-left font-bold uppercase transition-all border ${
                activeTab === tab.id
                  ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-[2px_2px_0px_0px_#10ffa0]'
                  : 'text-[var(--text-on-surface-variant)] hover:text-black dark:hover:text-white border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Panes (Col 9) */}
        <div className="lg:col-span-9 bg-white dark:bg-[#121316] p-6 sm:p-8 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_#000000] dark:shadow-[8px_8px_0px_0px_#ffffff]">
          {/* ========================================================= */}
          {/* 1. APPEARANCE & THEME                                     */}
          {/* ========================================================= */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div className="border-b-2 border-black dark:border-white pb-3">
                <h3 className="font-['Anton'] text-2xl uppercase">VISUAL THEME ENVIRONMENT</h3>
                <p className="font-['Work_Sans'] text-[13px] text-[var(--text-on-surface-variant)] mt-1">
                  Active System: <strong>DARK MODE (PERMANENT)</strong>. Daylight mode has been removed for high-contrast IDE parity.
                </p>
              </div>

              <div className="grid grid-cols-1 max-w-xl gap-4 font-['JetBrains_Mono'] text-[11px]">
                {/* Dark Mode (Permanent Only) */}
                <div
                  className="p-5 border-2 border-white bg-[#0c0d0e] text-white flex flex-col justify-between min-h-[140px] ring-4 ring-[#10ffa0] shadow-[4px_4px_0px_0px_#ffffff]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-extrabold uppercase text-[13px] text-[#10ffa0]">
                        [ DARK MODE // PERMANENT ]
                      </span>
                      <span className="px-2 py-0.5 bg-[#10ffa0] text-black text-[10px] font-bold">
                        LOCKED
                      </span>
                    </div>
                    <p className="font-['Work_Sans'] text-[12px] text-neutral-300 leading-relaxed">
                      Developer workspace &amp; midnight algorithmic coding laboratory. Deep black surfaces (#0c0d0e) with tactical neon green accents (#10ffa0), high-contrast syntax highlighting, and zero eye fatigue.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10">
                    <span className="w-2 h-2 rounded-full bg-[#10ffa0] animate-pulse"></span>
                    <span className="font-bold text-[#10ffa0]">
                      ✓ ACTIVE SYSTEM THEME (DARK MODE ONLY)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 2. LEARNING GOALS & DRILL PREFERENCES                     */}
          {/* ========================================================= */}
          {activeTab === 'learning' && (
            <div className="space-y-6">
              <div className="border-b-2 border-black dark:border-white pb-3">
                <h3 className="font-['Anton'] text-2xl uppercase">LEARNING CADENCE &amp; DIFFICULTY</h3>
                <p className="font-['Work_Sans'] text-[13px] text-[var(--text-on-surface-variant)] mt-1">
                  Adjust pacing to build consistent memory retention rather than burnout.
                </p>
              </div>

              <div className="space-y-4 font-['JetBrains_Mono'] text-[12px]">
                {/* Daily Goal */}
                <div>
                  <label className="block font-bold uppercase mb-2">Daily Problem Target</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 5].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => {
                          setDailyGoal(count);
                          handleApplySettings();
                        }}
                        className={`px-4 py-2 border-2 border-black dark:border-white font-bold uppercase ${
                          dailyGoal === count
                            ? 'bg-black text-[#10ffa0] dark:bg-white dark:text-black shadow-[2px_2px_0px_0px_#000000]'
                            : 'bg-[var(--bg-surface-container)] text-[var(--text-on-surface-variant)] hover:text-black dark:hover:text-white'
                        }`}
                      >
                        {count} PROBLEM{count > 1 ? 'S' : ''} / DAY
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="block font-bold uppercase mb-2">Default Problem Tier</label>
                  <div className="flex gap-2">
                    {['PRIMITIVE', 'MEDIUM', 'HARD', 'ALL'].map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => {
                          setDifficultyPreference(tier as any);
                          handleApplySettings();
                        }}
                        className={`px-4 py-2 border-2 border-black dark:border-white font-bold uppercase ${
                          difficultyPreference === tier
                            ? 'bg-black text-[#10ffa0] dark:bg-white dark:text-black shadow-[2px_2px_0px_0px_#000000]'
                            : 'bg-[var(--bg-surface-container)] text-[var(--text-on-surface-variant)] hover:text-black dark:hover:text-white'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Email Reminders */}
                <div className="pt-2">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={emailReminders}
                      onChange={(e) => {
                        setEmailReminders(e.target.checked);
                        handleApplySettings();
                      }}
                      className="w-4 h-4 accent-black rounded-none cursor-pointer"
                    />
                    <span className="font-bold uppercase">
                      Send daily Spaced Repetition review reminder to {user?.email}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 3. CODE EDITOR                                            */}
          {/* ========================================================= */}
          {activeTab === 'editor' && (
            <div className="space-y-6">
              <div className="border-b-2 border-black dark:border-white pb-3">
                <h3 className="font-['Anton'] text-2xl uppercase">CODE COMPILER WORKSTATION</h3>
                <p className="font-['Work_Sans'] text-[13px] text-[var(--text-on-surface-variant)] mt-1">
                  Configure typography, font sizing, and language conventions for the C++ / Python editor.
                </p>
              </div>

              <div className="space-y-4 font-['JetBrains_Mono'] text-[12px]">
                {/* Language */}
                <div>
                  <label className="block font-bold uppercase mb-1">Target Programming Language</label>
                  <div className="flex gap-2">
                    {[
                      { id: 'cpp', label: 'C++20 (GCC 13.2)' },
                      { id: 'python', label: 'PYTHON 3.12' },
                      { id: 'java', label: 'JAVA 21 (LTS)' },
                    ].map((l) => (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => {
                          setPreferredLanguage(l.id as any);
                          handleApplySettings();
                        }}
                        className={`px-3 py-2 border-2 border-black dark:border-white font-bold uppercase ${
                          preferredLanguage === l.id
                            ? 'bg-black text-[#10ffa0] dark:bg-white dark:text-black shadow-[2px_2px_0px_0px_#000000]'
                            : 'bg-[var(--bg-surface-container)] text-[var(--text-on-surface-variant)] hover:text-black dark:hover:text-white'
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Size */}
                <div>
                  <label className="block font-bold uppercase mb-1">Editor Font Size: {editorFontSize}px</label>
                  <div className="flex gap-2">
                    {[12, 13, 14, 16].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => {
                          setEditorFontSize(size);
                          handleApplySettings();
                        }}
                        className={`px-3 py-1.5 border-2 border-black dark:border-white font-bold ${
                          editorFontSize === size
                            ? 'bg-black text-[#10ffa0] dark:bg-white dark:text-black'
                            : 'bg-[var(--bg-surface-container)] text-[var(--text-on-surface-variant)]'
                        }`}
                      >
                        {size}px
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Size & Wrap */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block font-bold uppercase mb-1">Indentation (Tab Size)</label>
                    <div className="flex gap-2">
                      {[2, 4].map((ts) => (
                        <button
                          key={ts}
                          type="button"
                          onClick={() => {
                            setEditorTabSize(ts as any);
                            handleApplySettings();
                          }}
                          className={`px-4 py-1.5 border-2 border-black dark:border-white font-bold ${
                            editorTabSize === ts
                              ? 'bg-black text-[#10ffa0] dark:bg-white dark:text-black'
                              : 'bg-[var(--bg-surface-container)] text-[var(--text-on-surface-variant)]'
                          }`}
                        >
                          {ts} SPACES
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold uppercase mb-1">Editor Line Wrap</label>
                    <button
                      type="button"
                      onClick={() => {
                        setEditorWordWrap(!editorWordWrap);
                        handleApplySettings();
                      }}
                      className={`px-4 py-1.5 border-2 border-black dark:border-white font-bold uppercase ${
                        editorWordWrap
                          ? 'bg-[#10ffa0] text-black font-extrabold'
                          : 'bg-[var(--bg-surface-container)] text-[var(--text-on-surface-variant)]'
                      }`}
                    >
                      {editorWordWrap ? 'WORD WRAP: ON' : 'WORD WRAP: OFF'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 4. ACCESSIBILITY                                          */}
          {/* ========================================================= */}
          {activeTab === 'accessibility' && (
            <div className="space-y-6">
              <div className="border-b-2 border-black dark:border-white pb-3">
                <h3 className="font-['Anton'] text-2xl uppercase">ACCESSIBILITY &amp; MOTION</h3>
                <p className="font-['Work_Sans'] text-[13px] text-[var(--text-on-surface-variant)] mt-1">
                  Fine-tune animations and motion intensity to suit your sensitivity and hardware.
                </p>
              </div>

              <div className="space-y-4 font-['JetBrains_Mono'] text-[12px]">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={reducedMotion}
                    onChange={(e) => {
                      setReducedMotion(e.target.checked);
                      handleApplySettings();
                    }}
                    className="w-4 h-4 accent-black rounded-none cursor-pointer"
                  />
                  <span className="font-bold uppercase">
                    Reduce motion (Disables parallax, continuous pulses, and large transforms)
                  </span>
                </label>

                <div>
                  <label className="block font-bold uppercase mb-1">Transition Intensity</label>
                  <div className="flex gap-2">
                    {['minimal', 'subtle', 'normal'].map((intensity) => (
                      <button
                        key={intensity}
                        type="button"
                        onClick={() => {
                          setAnimationIntensity(intensity as any);
                          handleApplySettings();
                        }}
                        className={`px-3 py-1.5 border-2 border-black dark:border-white font-bold uppercase ${
                          animationIntensity === intensity
                            ? 'bg-black text-[#10ffa0] dark:bg-white dark:text-black'
                            : 'bg-[var(--bg-surface-container)] text-[var(--text-on-surface-variant)]'
                        }`}
                      >
                        {intensity}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 5. PRIVACY & EXPORT                                       */}
          {/* ========================================================= */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="border-b-2 border-black dark:border-white pb-3">
                <h3 className="font-['Anton'] text-2xl uppercase">PRIVACY &amp; DATA EXPORT</h3>
                <p className="font-['Work_Sans'] text-[13px] text-[var(--text-on-surface-variant)] mt-1">
                  You own your learning ledger. Export your solutions, notes, and reflection history anytime.
                </p>
              </div>

              <div className="space-y-4 font-['JetBrains_Mono'] text-[12px]">
                <div>
                  <label className="block font-bold uppercase mb-1">Leaderboard Presence</label>
                  <div className="flex gap-2">
                    {[
                      { id: 'public', label: 'PUBLIC (SHOW ON COLLEGE LEADERBOARD)' },
                      { id: 'private', label: 'ANONYMOUS // PRIVATE' },
                    ].map((vis) => (
                      <button
                        key={vis.id}
                        type="button"
                        onClick={() => {
                          setAccountVisibility(vis.id as any);
                          handleApplySettings();
                        }}
                        className={`px-3 py-2 border-2 border-black dark:border-white font-bold uppercase text-[11px] ${
                          accountVisibility === vis.id
                            ? 'bg-black text-[#10ffa0] dark:bg-white dark:text-black'
                            : 'bg-[var(--bg-surface-container)] text-[var(--text-on-surface-variant)]'
                        }`}
                      >
                        {vis.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-black/20 dark:border-white/20">
                  <span className="font-bold uppercase block mb-2">Export Personal Learning Compendium</span>
                  <button
                    type="button"
                    onClick={handleExportData}
                    className="px-5 py-2.5 bg-[#10ffa0] text-black font-extrabold uppercase border-2 border-black shadow-[3px_3px_0px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                  >
                    DOWNLOAD JSON BACKUP (.JSON) →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 6. ACCOUNT SECURITY                                       */}
          {/* ========================================================= */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              <div className="border-b-2 border-black dark:border-white pb-3">
                <h3 className="font-['Anton'] text-2xl uppercase">STUDENT ACCOUNT SECURITY</h3>
                <p className="font-['Work_Sans'] text-[13px] text-[var(--text-on-surface-variant)] mt-1">
                  Manage login credentials and session status.
                </p>
              </div>

              <div className="space-y-4 font-['JetBrains_Mono'] text-[12px]">
                <div className="p-3 bg-[var(--bg-surface-container)] border border-black dark:border-white">
                  <div>
                    <span className="text-[#45474a] dark:text-[#a0a4ab]">ACCOUNT IDENTITY:</span>{' '}
                    <strong className="text-black dark:text-white">{user?.email}</strong>
                  </div>
                  <div className="mt-1">
                    <span className="text-[#45474a] dark:text-[#a0a4ab]">USERNAME:</span> @{user?.username}
                  </div>
                  <div className="mt-1 text-[#006d41] dark:text-[#10ffa0]">
                    STATUS: ACTIVE LOCAL SESSION
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onOpenProfile}
                    className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-bold uppercase border border-black dark:border-white"
                  >
                    EDIT PASSPORT PROFILE →
                  </button>

                  <button
                    type="button"
                    onClick={onSignOut}
                    className="px-4 py-2 bg-[#ffdad6] text-[#ba1a1a] font-bold uppercase border-2 border-[#ba1a1a] hover:bg-[#ba1a1a] hover:text-white transition-colors"
                  >
                    SIGN OUT OF WORKSPACE
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
