import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup' | 'forgot';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
}) => {
  const { login, signup, forgotPassword, resetPassword, isLoading } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot' | 'reset'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setInfoMessage(null);

    if (mode === 'login') {
      const res = await login(email, password);
      if (res.success) {
        onClose();
      } else {
        setErrorMessage(res.error || 'Failed to authenticate.');
      }
    } else if (mode === 'signup') {
      const res = await signup(name, email, password, college);
      if (res.success) {
        onClose();
      } else {
        setErrorMessage(res.error || 'Registration failed.');
      }
    } else if (mode === 'forgot') {
      const res = await forgotPassword(email);
      if (res.success) {
        setInfoMessage(`Verification code sent! Demo Code: ${res.resetToken}`);
        if (res.resetToken) setResetToken(res.resetToken);
        setMode('reset');
      } else {
        setErrorMessage(res.error || 'Failed to send reset code.');
      }
    } else if (mode === 'reset') {
      const res = await resetPassword(email, resetToken, newPassword);
      if (res.success) {
        setInfoMessage('Password successfully updated! Please log in.');
        setMode('login');
      } else {
        setErrorMessage(res.error || 'Password reset failed.');
      }
    }
  };

  const handleGoogleDemoSignIn = async () => {
    setErrorMessage(null);
    // Google Sign-In flow simulation for current user
    const res = await login('ladsmit.2756@gmail.com', 'dsa_demo_2025');
    if (res.success) {
      onClose();
    } else {
      // Create if needed
      await signup('Smit Mehta', 'ladsmit.2756@gmail.com', 'dsa_demo_2025', 'NIT Trichy // CS');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[var(--bg-surface)] text-[var(--text-on-surface)] border-4 border-black dark:border-white p-6 sm:p-8 shadow-[8px_8px_0px_0px_#10ffa0] animate-in fade-in duration-200">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-black dark:border-white mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#10ffa0] border border-black inline-block"></span>
            <span className="font-['JetBrains_Mono'] text-[11px] font-bold uppercase tracking-wider">
              {mode === 'login' && 'STUDENT_AUTH // SIGN_IN'}
              {mode === 'signup' && 'NEW_STUDENT // REGISTER'}
              {mode === 'forgot' && 'SECURITY // RECOVERY'}
              {mode === 'reset' && 'SECURITY // RESET_PASS'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 bg-black text-white dark:bg-white dark:text-black hover:opacity-80 flex items-center justify-center font-['JetBrains_Mono'] text-[12px] font-bold"
          >
            ✕
          </button>
        </div>

        {/* Title & Philosophy */}
        <div className="mb-6">
          <h2 className="font-['Anton'] text-3xl uppercase leading-none">
            {mode === 'login' && 'ENTER YOUR WORKSPACE'}
            {mode === 'signup' && 'BEGIN THINK-FIRST DSA'}
            {mode === 'forgot' && 'RECOVER ACCESS'}
            {mode === 'reset' && 'CHOOSE NEW PASSWORD'}
          </h2>
          <p className="font-['Work_Sans'] text-[13px] text-[var(--text-on-surface-variant)] mt-1.5 leading-relaxed">
            {mode === 'login' && 'Access your private problem notebook, reflections, and weak-topic queue.'}
            {mode === 'signup' && 'Learn how to formulate algorithms on paper before typing a single line.'}
            {mode === 'forgot' && 'Enter your registered college or personal email.'}
            {mode === 'reset' && 'Enter your security token and new password.'}
          </p>
        </div>

        {/* Error / Info Banners */}
        {errorMessage && (
          <div className="p-3 bg-[#ffdad6] text-[#93000a] border-2 border-[#ba1a1a] font-['JetBrains_Mono'] text-[11px] mb-4">
            <strong className="block mb-0.5">AUTH_ERROR:</strong>
            {errorMessage}
          </div>
        )}

        {infoMessage && (
          <div className="p-3 bg-[#10ffa0]/20 text-[#007144] dark:text-[#10ffa0] border-2 border-[#10ffa0] font-['JetBrains_Mono'] text-[11px] mb-4">
            <strong className="block mb-0.5">SYS_NOTIFICATION:</strong>
            {infoMessage}
          </div>
        )}

        {/* Google One-Click Sign-In */}
        {mode !== 'reset' && (
          <div className="mb-4">
            <button
              type="button"
              onClick={handleGoogleDemoSignIn}
              disabled={isLoading}
              className="w-full py-2.5 px-3 bg-white dark:bg-neutral-900 border-2 border-black dark:border-white text-black dark:text-white font-['JetBrains_Mono'] text-[12px] font-bold flex items-center justify-center gap-2 hover:bg-[#f1eee7] dark:hover:bg-neutral-800 shadow-[3px_3px_0px_0px_#000000] dark:shadow-[3px_3px_0px_0px_#ffffff] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>CONTINUE WITH GOOGLE (STUDENT ID)</span>
            </button>

            <div className="flex items-center my-4 font-['JetBrains_Mono'] text-[10px] text-[var(--text-on-surface-variant)] uppercase">
              <span className="flex-1 border-b border-black/20 dark:border-white/20"></span>
              <span className="px-2">OR SECURE PASSCODE</span>
              <span className="flex-1 border-b border-black/20 dark:border-white/20"></span>
            </div>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 font-['JetBrains_Mono'] text-[11px]">
          {mode === 'signup' && (
            <div>
              <label className="block font-bold uppercase mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Smit Mehta"
                className="w-full p-2.5 bg-white dark:bg-neutral-900 border-2 border-black dark:border-white text-black dark:text-white outline-none focus:ring-2 focus:ring-[#10ffa0]"
              />
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block font-bold uppercase mb-1">College / Department</label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="e.g. NIT Trichy // Computer Science"
                className="w-full p-2.5 bg-white dark:bg-neutral-900 border-2 border-black dark:border-white text-black dark:text-white outline-none focus:ring-2 focus:ring-[#10ffa0]"
              />
            </div>
          )}

          {mode !== 'reset' && (
            <div>
              <label className="block font-bold uppercase mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@college.edu or gmail"
                className="w-full p-2.5 bg-white dark:bg-neutral-900 border-2 border-black dark:border-white text-black dark:text-white outline-none focus:ring-2 focus:ring-[#10ffa0]"
              />
            </div>
          )}

          {mode === 'reset' && (
            <div>
              <label className="block font-bold uppercase mb-1">Reset Verification Code</label>
              <input
                type="text"
                required
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value)}
                placeholder="rst_..."
                className="w-full p-2.5 bg-white dark:bg-neutral-900 border-2 border-black dark:border-white text-black dark:text-white outline-none focus:ring-2 focus:ring-[#10ffa0]"
              />
            </div>
          )}

          {(mode === 'login' || mode === 'signup') && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold uppercase">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[10px] text-[#1d4ed8] dark:text-[#10ffa0] hover:underline uppercase font-bold"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-2.5 bg-white dark:bg-neutral-900 border-2 border-black dark:border-white text-black dark:text-white outline-none focus:ring-2 focus:ring-[#10ffa0]"
              />
            </div>
          )}

          {mode === 'reset' && (
            <div>
              <label className="block font-bold uppercase mb-1">New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full p-2.5 bg-white dark:bg-neutral-900 border-2 border-black dark:border-white text-black dark:text-white outline-none focus:ring-2 focus:ring-[#10ffa0]"
              />
            </div>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 bg-black text-white dark:bg-white dark:text-black font-['JetBrains_Mono'] text-[12px] font-extrabold uppercase border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_#10ffa0] hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <span>VERIFYING CREDENTIALS...</span>
            ) : mode === 'login' ? (
              <span>SIGN IN TO WORKSPACE →</span>
            ) : mode === 'signup' ? (
              <span>CREATE LEARNING ACCOUNT →</span>
            ) : mode === 'forgot' ? (
              <span>SEND RECOVERY CODE →</span>
            ) : (
              <span>UPDATE PASSWORD →</span>
            )}
          </button>
        </form>

        {/* Footer Switcher */}
        <div className="mt-6 pt-4 border-t border-black/20 dark:border-white/20 text-center font-['JetBrains_Mono'] text-[11px]">
          {mode === 'login' && (
            <p>
              New student?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-[#1d4ed8] dark:text-[#10ffa0] font-bold underline"
              >
                Register here
              </button>
            </p>
          )}

          {mode === 'signup' && (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-[#1d4ed8] dark:text-[#10ffa0] font-bold underline"
              >
                Sign in
              </button>
            </p>
          )}

          {(mode === 'forgot' || mode === 'reset') && (
            <button
              type="button"
              onClick={() => setMode('login')}
              className="text-[#1d4ed8] dark:text-[#10ffa0] font-bold underline"
            >
              ← Back to Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
