import React, { useState, useEffect } from 'react';
import { PROBLEMS_DATA } from './data/problems';
import { Problem } from './types';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { RightRail } from './components/RightRail';
import { WorkspaceLab } from './components/WorkspaceLab';
import { EditorialChronicle } from './components/EditorialChronicle';
import { FounderBlueprint } from './components/FounderBlueprint';
import { ProblemsView } from './components/ProblemsView';
import { ThinkLabView } from './components/ThinkLabView';
import { ContestArenaView } from './components/ContestArenaView';
import { ProgressLedgerView } from './components/ProgressLedgerView';
import { DashboardView } from './components/DashboardView';
import { ProfileView } from './components/ProfileView';
import { SettingsView } from './components/SettingsView';
import { AuthModal } from './components/AuthModal';
import { ReflectionModal } from './components/ReflectionModal';
import { parseRoute, getPathForView } from './utils/router';

function AppContent() {
  const { user, isAuthenticated, authStatus, logout } = useAuth();

  // Parse initial route from browser URL location (supports direct URL entry & page refresh)
  const [initialRoute] = useState(() => {
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
    const search = typeof window !== 'undefined' ? window.location.search : '';
    return parseRoute(pathname, search);
  });

  const [problems, setProblems] = useState<Problem[]>(PROBLEMS_DATA);

  // Determine initial active problem from route slug or default to first problem
  const [activeProblem, setActiveProblem] = useState<Problem>(() => {
    if (initialRoute.problemId) {
      const found = PROBLEMS_DATA.find(
        (p) =>
          p.id.toLowerCase() === initialRoute.problemId?.toLowerCase() ||
          p.number.toLowerCase() === initialRoute.problemId?.toLowerCase()
      );
      if (found) return found;
    }
    return PROBLEMS_DATA[0];
  });

  const [currentView, setCurrentView] = useState<string>(initialRoute.view);
  const [isUnknownRoute, setIsUnknownRoute] = useState<boolean>(initialRoute.isUnknownRoute);

  // Auth modal state
  const [isAuthOpen, setIsAuthOpen] = useState(initialRoute.isAuthOpen);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'signup' | 'forgot'>(initialRoute.authMode);

  // Reflection modal state
  const [reflectionProblem, setReflectionProblem] = useState<Problem | null>(() => {
    if (initialRoute.reflectionProblemId) {
      return (
        PROBLEMS_DATA.find(
          (p) => p.id.toLowerCase() === initialRoute.reflectionProblemId?.toLowerCase()
        ) || null
      );
    }
    return null;
  });
  const [isReflectionOpen, setIsReflectionOpen] = useState(initialRoute.isReflectionOpen);

  // Synchronize browser history (Back / Forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      const route = parseRoute(window.location.pathname, window.location.search);
      setCurrentView(route.view);
      setIsUnknownRoute(route.isUnknownRoute);

      if (route.problemId) {
        const found = problems.find(
          (p) =>
            p.id.toLowerCase() === route.problemId?.toLowerCase() ||
            p.number.toLowerCase() === route.problemId?.toLowerCase()
        );
        if (found) setActiveProblem(found);
      }

      if (route.isAuthOpen) {
        setAuthInitialMode(route.authMode);
        setIsAuthOpen(true);
      } else if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
        setIsAuthOpen(false);
      }

      if (route.isReflectionOpen) {
        if (route.reflectionProblemId) {
          const match = problems.find(
            (p) => p.id.toLowerCase() === route.reflectionProblemId?.toLowerCase()
          );
          if (match) setReflectionProblem(match);
        }
        setIsReflectionOpen(true);
      } else {
        setIsReflectionOpen(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [problems]);

  // Unified navigation function with URL pushState
  const navigate = (view: string, problemId?: string, replace: boolean = false) => {
    let targetProblem = activeProblem;
    if (problemId) {
      const match = problems.find(
        (p) =>
          p.id.toLowerCase() === problemId.toLowerCase() ||
          p.number.toLowerCase() === problemId.toLowerCase()
      );
      if (match) {
        targetProblem = match;
        setActiveProblem(match);
      }
    }

    setCurrentView(view);
    setIsUnknownRoute(false);

    const newPath = getPathForView(view, view === 'workspace-lab' ? targetProblem.id : problemId);
    if (typeof window !== 'undefined' && window.location.pathname !== newPath) {
      if (replace) {
        window.history.replaceState(null, '', newPath);
      } else {
        window.history.pushState(null, '', newPath);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProblem = (problem: Problem) => {
    setActiveProblem(problem);
    navigate('workspace-lab', problem.id);
  };

  const handleProblemSolved = (problemId: string) => {
    setProblems((prev) =>
      prev.map((p) => (p.id === problemId ? { ...p, status: 'SOLVED' } : p))
    );
  };

  const handleOpenReflection = (problem: Problem) => {
    setReflectionProblem(problem);
    setIsReflectionOpen(true);
  };

  const handleOpenAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthInitialMode(mode);
    setIsAuthOpen(true);
  };

  const handleCloseAuth = () => {
    setIsAuthOpen(false);
    if (
      typeof window !== 'undefined' &&
      (window.location.pathname === '/login' || window.location.pathname === '/signup')
    ) {
      const canonicalPath = getPathForView(
        currentView,
        currentView === 'workspace-lab' ? activeProblem.id : undefined
      );
      window.history.replaceState(null, '', canonicalPath);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-surface)] text-[var(--text-on-surface)] antialiased selection:bg-[#10ffa0] selection:text-black transition-colors duration-200">
      {/* Top Header with theme toggle, auth button, and navigation */}
      <Header
        currentView={currentView}
        onViewChange={(view) => navigate(view)}
        onOpenAuth={() => handleOpenAuth('login')}
        onOpenProfile={() => navigate('profile')}
      />

      {/* Left Module Index Drawer */}
      <Sidebar
        currentModule={currentView}
        onSelectModule={(mod) => navigate(mod)}
      />

      {/* Right Vertical Bookmark Rail */}
      <RightRail
        currentModule={currentView}
        onSelectModule={(mod) => navigate(mod)}
      />

      {/* Main View Area (Offset by 64px on left for md+ screens, 48px on right) */}
      <div className="md:pl-64 pr-12 pt-20 min-h-[calc(100vh-5rem)]">
        <main className="w-full">
          {/* Wildcard 404 Route Banner */}
          {isUnknownRoute && (
            <div className="w-full min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center p-8 text-center max-w-lg mx-auto">
              <div className="border-2 border-black dark:border-white bg-[var(--bg-surface-container)] p-8 shadow-[6px_6px_0px_0px_#000000] dark:shadow-[6px_6px_0px_0px_#ffffff] w-full">
                <div className="font-['JetBrains_Mono'] text-xs font-bold text-amber-500 uppercase tracking-widest mb-2">
                  404 // NOT FOUND
                </div>
                <div className="font-['Anton'] text-3xl uppercase tracking-wide text-[var(--text-on-surface)] mb-2">
                  MODULE DOES NOT EXIST
                </div>
                <p className="font-['JetBrains_Mono'] text-xs text-[var(--text-on-surface-variant)] mb-6">
                  No active curriculum node matches "{typeof window !== 'undefined' ? window.location.pathname : ''}".
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={() => navigate('editorial-chronicle')}
                    className="px-5 py-2.5 bg-black text-white dark:bg-white dark:text-black font-['JetBrains_Mono'] text-xs font-bold uppercase hover:opacity-80 transition-opacity"
                  >
                    RETURN TO HOME // OVERVIEW
                  </button>
                  <button
                    onClick={() => navigate('problems-index')}
                    className="px-5 py-2.5 bg-[#10ffa0] text-black font-['JetBrains_Mono'] text-xs font-bold uppercase border border-black hover:bg-[#0be890] transition-colors"
                  >
                    BROWSE PROBLEMS
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Workspace Lab View */}
          {!isUnknownRoute &&
            (currentView === 'workspace-lab' ||
              currentView === 'code-terminal' ||
              currentView === 'mentor-review' ||
              currentView === 'visualize-matrix') && (
              <WorkspaceLab
                problem={activeProblem}
                onNavigateChronicle={() => navigate('editorial-chronicle')}
                onOpenReflection={handleOpenReflection}
                onProblemSolved={handleProblemSolved}
              />
            )}

          {/* Authenticated Student Dashboard View with proper Loading & Auth Guards */}
          {!isUnknownRoute && currentView === 'dashboard' && (
            authStatus === 'AUTH_LOADING' ? (
              <div className="w-full min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center p-8 text-center">
                <div className="w-12 h-12 border-4 border-black dark:border-white border-t-[#10ffa0] animate-spin mb-4 shadow-[4px_4px_0px_0px_#10ffa0]"></div>
                <div className="font-['Anton'] text-2xl uppercase tracking-wider text-[var(--text-on-surface)]">
                  VALIDATING LAB PASSPORT
                </div>
                <div className="font-['JetBrains_Mono'] text-xs text-[var(--text-on-surface-variant)] mt-2">
                  VERIFYING PERSISTENT STUDENT CREDENTIALS // LOCAL RUNTIME
                </div>
              </div>
            ) : !isAuthenticated ? (
              <div className="w-full min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center p-8 text-center max-w-xl mx-auto">
                <div className="border-2 border-black dark:border-white bg-[var(--bg-surface-container)] p-8 shadow-[6px_6px_0px_0px_#ba1a1a] w-full">
                  <div className="font-['JetBrains_Mono'] text-xs font-bold text-[#ba1a1a] dark:text-[#ffb4ab] uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-pulse"></span>
                    RESTRICTED STUDENT TERMINAL // 401 UNAUTHENTICATED
                  </div>
                  <div className="font-['Anton'] text-3xl uppercase tracking-wide text-[var(--text-on-surface)] mb-4">
                    AUTHENTICATION REQUIRED
                  </div>
                  <p className="font-['Newsreader'] text-base italic text-[var(--text-on-surface-variant)] mb-6">
                    The student dashboard and passport ledger require verified credentials. Please log in or continue to proceed.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={() => handleOpenAuth('login')}
                      className="w-full sm:w-auto px-6 py-2.5 bg-[#10ffa0] text-black font-['JetBrains_Mono'] text-xs font-bold uppercase border-2 border-black hover:bg-[#0be890] transition-colors shadow-[2px_2px_0px_0px_#000000]"
                    >
                      SIGN IN TO PASSPORT →
                    </button>
                    <button
                      onClick={() => navigate('editorial-chronicle')}
                      className="w-full sm:w-auto px-6 py-2.5 bg-transparent text-[var(--text-on-surface)] font-['JetBrains_Mono'] text-xs font-bold uppercase border-2 border-black dark:border-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                    >
                      EXPLORE EDITORIAL CHRONICLE
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <DashboardView
                onContinueProblem={(probId) => {
                  const found = problems.find((p) => p.id === probId);
                  if (found) setActiveProblem(found);
                  navigate('workspace-lab', probId);
                }}
                onNavigateProblems={() => navigate('problems-index')}
                onNavigateContest={() => navigate('contest-arena')}
                onOpenReflection={() => handleOpenReflection(activeProblem)}
                allProblems={problems}
              />
            )
          )}

          {/* User Profile Passport View with Loading & Auth Guards */}
          {!isUnknownRoute && currentView === 'profile' && (
            authStatus === 'AUTH_LOADING' ? (
              <div className="w-full min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center p-8 text-center">
                <div className="w-12 h-12 border-4 border-black dark:border-white border-t-[#10ffa0] animate-spin mb-4 shadow-[4px_4px_0px_0px_#10ffa0]"></div>
                <div className="font-['Anton'] text-2xl uppercase tracking-wider text-[var(--text-on-surface)]">
                  LOADING STUDENT PASSPORT
                </div>
              </div>
            ) : !isAuthenticated ? (
              <div className="w-full min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center p-8 text-center max-w-xl mx-auto">
                <div className="border-2 border-black dark:border-white bg-[var(--bg-surface-container)] p-8 shadow-[6px_6px_0px_0px_#ba1a1a] w-full">
                  <div className="font-['Anton'] text-3xl uppercase tracking-wide text-[var(--text-on-surface)] mb-4">
                    STUDENT PASSPORT
                  </div>
                  <p className="font-['Newsreader'] text-base italic text-[var(--text-on-surface-variant)] mb-6">
                    Please sign in to view and customize your student passport profile.
                  </p>
                  <button
                    onClick={() => handleOpenAuth('login')}
                    className="px-6 py-2.5 bg-[#10ffa0] text-black font-['JetBrains_Mono'] text-xs font-bold uppercase border-2 border-black hover:bg-[#0be890] transition-colors"
                  >
                    SIGN IN →
                  </button>
                </div>
              </div>
            ) : (
              <ProfileView />
            )
          )}

          {/* Dedicated Settings View */}
          {!isUnknownRoute && currentView === 'settings' && (
            <SettingsView
              onSignOut={() => {
                logout();
                navigate('editorial-chronicle');
              }}
              onOpenProfile={() => navigate('profile')}
            />
          )}

          {/* Editorial Chronicle Manifesto View */}
          {!isUnknownRoute && currentView === 'editorial-chronicle' && (
            <EditorialChronicle
              onLaunchWorkspace={() => navigate('workspace-lab', activeProblem.id)}
              onSelectProblem={(problemId) => {
                const found = problems.find((p) => p.id === problemId);
                if (found) {
                  setActiveProblem(found);
                  navigate('workspace-lab', problemId);
                }
              }}
            />
          )}

          {/* Founder Blueprint & Brutally Honest Advice View */}
          {!isUnknownRoute && currentView === 'founder-blueprint' && <FounderBlueprint />}

          {/* Problems Library View */}
          {!isUnknownRoute && currentView === 'problems-index' && (
            <ProblemsView
              problems={problems}
              onSelectProblem={handleSelectProblem}
            />
          )}

          {/* Think Lab View */}
          {!isUnknownRoute && currentView === 'think-schematic' && <ThinkLabView />}

          {/* Contest Sprint Arena View */}
          {!isUnknownRoute && currentView === 'contest-arena' && <ContestArenaView />}

          {/* Progress Ledger & Stats View */}
          {!isUnknownRoute && currentView === 'progress-ledger' && <ProgressLedgerView />}
        </main>
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={handleCloseAuth}
        initialMode={authInitialMode}
      />

      {/* Post-Solve Reflection Modal */}
      <ReflectionModal
        problem={reflectionProblem}
        isOpen={isReflectionOpen}
        onClose={() => setIsReflectionOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
