import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserSettings, ThemeMode, ReflectionEntry, ProblemStatus } from '../types';

export type AuthStatus = 'AUTH_LOADING' | 'AUTHENTICATED' | 'UNAUTHENTICATED';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authStatus: AuthStatus;
  activeTheme: 'light' | 'dark';
  setThemePreference: (theme: ThemeMode) => void;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string, college?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<{ success: boolean; message?: string; resetToken?: string; error?: string }>;
  resetPassword: (email: string, resetToken: string, newPass: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  updateSettings: (data: Partial<UserSettings>) => Promise<boolean>;
  saveProblemProgress: (problemId: string, status?: ProblemStatus, savedCode?: string, selectedApproachId?: string) => Promise<void>;
  saveReflection: (reflection: Omit<ReflectionEntry, 'date'>) => Promise<void>;
}

const defaultSettings: UserSettings = {
  theme: 'dark',
  dailyGoal: 2,
  difficultyPreference: 'MEDIUM',
  preferredTopics: ['Arrays & Hashing', 'Two Pointers', 'Binary Search'],
  preferredLanguage: 'cpp',
  editorFontSize: 13,
  editorTheme: 'carbon',
  editorTabSize: 4,
  editorWordWrap: false,
  reducedMotion: false,
  animationIntensity: 'normal',
  highContrast: false,
  accountVisibility: 'public',
  emailReminders: true,
};

const defaultUser: User = {
  id: 'usr-student-01',
  email: 'ladsmit.2756@gmail.com',
  name: 'Smit Mehta',
  username: 'smit_mehta',
  college: 'NIT Trichy // CS Dept',
  avatar: '01',
  bio: 'Computer Science sophomore focusing on algorithmic patterns and spatial state machines.',
  createdAt: '2025-01-15T00:00:00.000Z',
  streakCount: 7,
  lastActiveDate: new Date().toISOString(),
  favoriteTopics: ['Arrays & Hashing', 'Two Pointers', 'Binary Search'],
  settings: defaultSettings,
  progress: {
    'two-sum': {
      status: 'IN_PROGRESS',
      attempts: 3,
      lastAttemptAt: new Date().toISOString(),
    },
    'valid-anagram': {
      status: 'SOLVED',
      attempts: 1,
      completedAt: new Date().toISOString(),
    },
  },
  reflections: [
    {
      problemId: 'two-sum',
      problemTitle: 'Two Sum',
      date: 'OCT 04, 2026',
      corePattern: 'Complement caching via hash map: trade O(N) memory for instantaneous O(1) lookup.',
      trapEncountered: 'Must check if complement exists BEFORE storing current element to prevent self-pairing.',
      timeSpentMinutes: 18,
      nextRevisionDate: 'OCT 07, 2026',
      confidence: 'HIGH',
    },
  ],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>(() => {
    const isLoggedOut = localStorage.getItem('dsa_logged_out') === 'true';
    if (isLoggedOut) return 'UNAUTHENTICATED';
    const storedToken = localStorage.getItem('dsa_token');
    if (storedToken) return 'AUTH_LOADING';
    return 'AUTHENTICATED';
  });

  const [user, setUser] = useState<User | null>(() => {
    try {
      if (localStorage.getItem('dsa_logged_out') === 'true') {
        return null;
      }
      const stored = localStorage.getItem('dsa_user');
      if (stored) return JSON.parse(stored);
      // Auto-initialize with default user for immediate testability if not explicitly logged out
      return defaultUser;
    } catch {
      return defaultUser;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    if (localStorage.getItem('dsa_logged_out') === 'true') {
      return null;
    }
    return localStorage.getItem('dsa_token') || 'tok_usr-student-01_init';
  });

  const [isLoading, setIsLoading] = useState<boolean>(() => {
    if (localStorage.getItem('dsa_logged_out') === 'true') return false;
    return !!localStorage.getItem('dsa_token');
  });

  const [themePreference, setThemePreferenceState] = useState<ThemeMode>('dark');
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('dark');

  // Enforce Dark Mode website only
  useEffect(() => {
    setActiveTheme('dark');
    const root = document.documentElement;
    root.classList.add('dark');
    root.classList.remove('light');
    localStorage.setItem('dsa_theme', 'dark');
  }, []);

  // Sync session on mount
  useEffect(() => {
    const verifySession = async () => {
      if (localStorage.getItem('dsa_logged_out') === 'true') {
        setAuthStatus('UNAUTHENTICATED');
        setIsLoading(false);
        return;
      }

      const storedToken = localStorage.getItem('dsa_token') || 'tok_usr-student-01_init';
      if (!storedToken) {
        setAuthStatus('UNAUTHENTICATED');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setToken(storedToken);
          setAuthStatus('AUTHENTICATED');
          localStorage.setItem('dsa_user', JSON.stringify(data.user));
          if (data.user.settings?.theme) {
            setThemePreferenceState(data.user.settings.theme);
          }
        } else {
          // If token was rejected by server (e.g. 401)
          if (storedToken === 'tok_usr-student-01_init') {
            // Demo fallback user remains active for standalone zero-config usage
            setUser(defaultUser);
            setToken(storedToken);
            setAuthStatus('AUTHENTICATED');
          } else {
            setUser(null);
            setToken(null);
            setAuthStatus('UNAUTHENTICATED');
            localStorage.removeItem('dsa_token');
            localStorage.removeItem('dsa_user');
          }
        }
      } catch (err) {
        console.warn('Session verification offline, using cached state:', err);
        // If network error, preserve cached state
        if (user) {
          setAuthStatus('AUTHENTICATED');
        } else {
          setAuthStatus('UNAUTHENTICATED');
        }
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, []);

  const setThemePreference = (_newTheme?: ThemeMode) => {
    setThemePreferenceState('dark');
    setActiveTheme('dark');
    const root = document.documentElement;
    root.classList.add('dark');
    root.classList.remove('light');
    localStorage.setItem('dsa_theme', 'dark');
    if (user) {
      updateSettings({ theme: 'dark' });
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      localStorage.removeItem('dsa_logged_out');
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setIsLoading(false);
        return { success: false, error: data.error || 'Login failed.' };
      }

      setUser(data.user);
      setToken(data.token);
      setAuthStatus('AUTHENTICATED');
      localStorage.setItem('dsa_token', data.token);
      localStorage.setItem('dsa_user', JSON.stringify(data.user));
      if (data.user.settings?.theme) {
        setThemePreferenceState(data.user.settings.theme);
      }

      setIsLoading(false);
      return { success: true };
    } catch {
      // Local demo fallback if backend call fails
      if (email.toLowerCase() === defaultUser.email.toLowerCase()) {
        setUser(defaultUser);
        setToken('tok_demo');
        setAuthStatus('AUTHENTICATED');
        localStorage.removeItem('dsa_logged_out');
        localStorage.setItem('dsa_token', 'tok_demo');
        localStorage.setItem('dsa_user', JSON.stringify(defaultUser));
        setIsLoading(false);
        return { success: true };
      }
      setIsLoading(false);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const signup = async (name: string, email: string, password: string, college?: string) => {
    setIsLoading(true);
    try {
      localStorage.removeItem('dsa_logged_out');
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, college }),
      });

      const data = await res.json();
      if (!res.ok) {
        setIsLoading(false);
        return { success: false, error: data.error || 'Signup failed.' };
      }

      setUser(data.user);
      setToken(data.token);
      setAuthStatus('AUTHENTICATED');
      localStorage.setItem('dsa_token', data.token);
      localStorage.setItem('dsa_user', JSON.stringify(data.user));

      setIsLoading(false);
      return { success: true };
    } catch {
      setIsLoading(false);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setAuthStatus('UNAUTHENTICATED');
    setIsLoading(false);
    localStorage.setItem('dsa_logged_out', 'true');
    localStorage.removeItem('dsa_token');
    localStorage.removeItem('dsa_user');
  };

  const forgotPassword = async (email: string) => {
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Could not find account.' };
      }
      return { success: true, message: data.message, resetToken: data.resetToken };
    } catch {
      return { success: false, error: 'Failed to communicate with auth server.' };
    }
  };

  const resetPassword = async (email: string, resetToken: string, newPass: string) => {
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, resetToken, newPassword: newPass }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Reset failed.' };
      }
      return { success: true, message: data.message };
    } catch {
      return { success: false, error: 'Password reset failed.' };
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return false;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('dsa_user', JSON.stringify(updated));

    try {
      await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, ...data }),
      });
      return true;
    } catch {
      return true;
    }
  };

  const updateSettings = async (data: Partial<UserSettings>) => {
    if (!user) return false;
    const updatedSettings = { ...user.settings, ...data };
    const updatedUser = { ...user, settings: updatedSettings };
    setUser(updatedUser);
    localStorage.setItem('dsa_user', JSON.stringify(updatedUser));

    if (data.theme) {
      setThemePreferenceState(data.theme);
    }

    try {
      await fetch('/api/user/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, settings: data }),
      });
      return true;
    } catch {
      return true;
    }
  };

  const saveProblemProgress = async (
    problemId: string,
    status?: ProblemStatus,
    savedCode?: string,
    selectedApproachId?: string
  ) => {
    if (!user) return;
    const prevProg = user.progress[problemId] || {};
    const newProg = {
      ...prevProg,
      status: status || prevProg.status || 'IN_PROGRESS',
      savedCode: savedCode !== undefined ? savedCode : prevProg.savedCode,
      selectedApproachId: selectedApproachId || prevProg.selectedApproachId,
      lastAttemptAt: new Date().toISOString(),
      attempts: (prevProg.attempts || 0) + 1,
      completedAt: status === 'SOLVED' ? new Date().toISOString() : prevProg.completedAt,
    };

    const newStreak = status === 'SOLVED' && prevProg.status !== 'SOLVED' ? user.streakCount + 1 : user.streakCount;

    const updatedUser: User = {
      ...user,
      streakCount: newStreak,
      progress: {
        ...user.progress,
        [problemId]: newProg,
      },
    };

    setUser(updatedUser);
    localStorage.setItem('dsa_user', JSON.stringify(updatedUser));

    try {
      await fetch('/api/user/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          problemId,
          status,
          savedCode,
          selectedApproachId,
        }),
      });
    } catch (e) {
      console.warn('Failed to sync progress to server, saved locally:', e);
    }
  };

  const saveReflection = async (reflectionData: Omit<ReflectionEntry, 'date'>) => {
    if (!user) return;

    const newEntry: ReflectionEntry = {
      ...reflectionData,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }).toUpperCase(),
    };

    const updatedReflections = [newEntry, ...(user.reflections || [])];
    const updatedUser: User = {
      ...user,
      reflections: updatedReflections,
    };

    setUser(updatedUser);
    localStorage.setItem('dsa_user', JSON.stringify(updatedUser));

    try {
      await fetch('/api/user/reflections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, reflection: newEntry }),
      });
    } catch (e) {
      console.warn('Failed to sync reflection to server, saved locally:', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: authStatus === 'AUTHENTICATED' && !!user,
        isLoading,
        authStatus,
        activeTheme,
        setThemePreference,
        login,
        signup,
        logout,
        forgotPassword,
        resetPassword,
        updateProfile,
        updateSettings,
        saveProblemProgress,
        saveReflection,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
