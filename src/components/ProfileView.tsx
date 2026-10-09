import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const ProfileView: React.FC = () => {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || 'Smit Mehta');
  const [username, setUsername] = useState(user?.username || 'smit_mehta');
  const [college, setCollege] = useState(user?.college || 'NIT Trichy // CS Dept');
  const [bio, setBio] = useState(user?.bio || 'Computer Science sophomore focusing on algorithmic patterns.');
  const [avatar, setAvatar] = useState(user?.avatar || '01');
  const [favoriteTopics, setFavoriteTopics] = useState<string[]>(
    user?.favoriteTopics || ['Arrays & Hashing', 'Two Pointers']
  );

  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const availableTopics = [
    'Arrays & Hashing',
    'Two Pointers',
    'Sliding Window',
    'Binary Search',
    'Trees & Graphs',
    'Dynamic Programming',
    'Bit Manipulation',
  ];

  const avatarOptions = [
    { id: '01', label: 'ROOT [01]', bg: 'bg-[#10ffa0] text-black' },
    { id: 'L', label: 'LEFT [L]', bg: 'bg-[#ffd000] text-black' },
    { id: 'R', label: 'RIGHT [R]', bg: 'bg-[#7c3aed] text-white' },
    { id: 'PTR', label: 'PTR [→]', bg: 'bg-black text-[#10ffa0]' },
  ];

  const toggleTopic = (topic: string) => {
    if (favoriteTopics.includes(topic)) {
      setFavoriteTopics(favoriteTopics.filter((t) => t !== topic));
    } else {
      setFavoriteTopics([...favoriteTopics, topic]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateProfile({
      name,
      username,
      college,
      bio,
      avatar,
      favoriteTopics,
    });
    setIsSaving(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const solvedCount = Object.values(user?.progress || {}).filter((p) => p.status === 'SOLVED').length;

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-[var(--bg-surface)] text-[var(--text-on-surface)] p-6 sm:p-10 lg:p-14">
      {/* Top Banner */}
      <div className="border-b-2 border-black dark:border-white pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="font-['JetBrains_Mono'] text-[10px] text-[var(--text-on-surface-variant)] uppercase tracking-widest mb-1.5 font-bold">
            MODULE 09 // STUDENT CREDENTIAL PASSPORT
          </div>
          <h1 className="font-['Anton'] text-4xl sm:text-6xl uppercase tracking-tight leading-none">
            ENGINEER PASSPORT
          </h1>
          <p className="font-['Work_Sans'] text-sm text-[var(--text-on-surface-variant)] mt-2">
            Your official DSA Progress Book identity, verified college affiliation, and learning credentials.
          </p>
        </div>

        {/* Account Creation Stamp */}
        <div className="p-3 bg-[var(--bg-surface-container)] border-2 border-black dark:border-white font-['JetBrains_Mono'] text-[11px]">
          <span className="text-[var(--text-on-surface-variant)] block font-bold">REGISTERED STUDENT ID</span>
          <span className="font-bold text-black dark:text-white">UID: {user?.id || 'usr-student-01'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Identity Card & Stats */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Tactile Identity Badge */}
          <div className="p-6 bg-[var(--bg-surface-container)] border-4 border-black dark:border-white shadow-[6px_6px_0px_0px_#000000] dark:shadow-[6px_6px_0px_0px_#ffffff] flex flex-col items-center text-center">
            {/* Visual Avatar */}
            <div className="w-24 h-24 rounded-full border-4 border-black dark:border-white bg-[#10ffa0] flex items-center justify-center font-['Anton'] text-4xl text-black shadow-[4px_4px_0px_0px_#000000] mb-4">
              {avatar}
            </div>

            <h2 className="font-['Anton'] text-3xl uppercase tracking-tight">{name}</h2>
            <div className="font-['JetBrains_Mono'] text-[12px] text-[var(--text-on-surface-variant)] mt-0.5">
              @{username}
            </div>
            <div className="mt-2 font-['JetBrains_Mono'] text-[11px] font-bold text-[#006d41] dark:text-[#10ffa0] bg-white dark:bg-black px-2 py-0.5 border border-black dark:border-white">
              {college}
            </div>

            <p className="font-['Work_Sans'] text-[13px] text-[var(--text-on-surface-variant)] mt-4 leading-relaxed italic">
              "{bio}"
            </p>

            {/* Micro Stats */}
            <div className="w-full grid grid-cols-2 gap-2 mt-6 pt-4 border-t-2 border-black/20 dark:border-white/20 font-['JetBrains_Mono'] text-[11px]">
              <div className="p-2 bg-[var(--bg-surface)] border border-black dark:border-white">
                <span className="text-[var(--text-on-surface-variant)] block text-[9px] uppercase font-bold">SOLVED</span>
                <span className="text-xl font-bold">{solvedCount} NODES</span>
              </div>
              <div className="p-2 bg-[var(--bg-surface)] border border-black dark:border-white">
                <span className="text-[var(--text-on-surface-variant)] block text-[9px] uppercase font-bold">STREAK</span>
                <span className="text-xl font-bold text-amber-600 dark:text-amber-400">
                  {user?.streakCount || 7} DAYS
                </span>
              </div>
            </div>
          </div>

          {/* Quick Security Info */}
          <div className="p-4 bg-[var(--bg-surface-container-low)] border-2 border-black dark:border-white font-['JetBrains_Mono'] text-[11px] space-y-1">
            <div className="text-[var(--text-on-surface-variant)] uppercase font-bold">ACCOUNT VERIFICATION</div>
            <div className="text-black dark:text-white font-bold">{user?.email}</div>
            <div className="text-[#006d41] dark:text-[#10ffa0] text-[10px]">✓ VERIFIED STUDENT PROFILE</div>
          </div>
        </div>

        {/* Right Column: Edit Profile Form */}
        <div className="lg:col-span-8 bg-white dark:bg-[#121316] p-6 sm:p-8 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_#000000] dark:shadow-[8px_8px_0px_0px_#10ffa0]">
          <div className="flex items-center justify-between pb-3 border-b-2 border-black dark:border-white mb-6">
            <span className="font-['Anton'] text-2xl uppercase">EDIT PASSPORT DETAILS</span>
            {isSaved && (
              <span className="bg-[#10ffa0] text-black font-['JetBrains_Mono'] text-[11px] font-bold px-2 py-0.5 border border-black animate-bounce">
                CREDENTIALS COMMITTED ✓
              </span>
            )}
          </div>

          <form onSubmit={handleSave} className="flex flex-col gap-4 font-['JetBrains_Mono'] text-[12px]">
            {/* Choose Avatar */}
            <div>
              <label className="block font-bold uppercase mb-2">Select Passport Avatar Symbol</label>
              <div className="flex flex-wrap gap-2">
                {avatarOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setAvatar(opt.id)}
                    className={`px-3 py-1.5 font-bold border-2 border-black dark:border-white transition-all ${opt.bg} ${
                      avatar === opt.id
                        ? 'ring-4 ring-[#10ffa0] -translate-y-0.5 shadow-[2px_2px_0px_0px_#000000]'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Username */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-[var(--bg-surface)] border-2 border-black dark:border-white text-black dark:text-white outline-none focus:ring-2 focus:ring-[#10ffa0]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase mb-1">Student Handle (@username)</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2.5 bg-[var(--bg-surface)] border-2 border-black dark:border-white text-black dark:text-white outline-none focus:ring-2 focus:ring-[#10ffa0]"
                />
              </div>
            </div>

            {/* College */}
            <div>
              <label className="block font-bold uppercase mb-1">College Affiliation &amp; Major</label>
              <input
                type="text"
                required
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="e.g. NIT Trichy // Computer Science"
                className="w-full p-2.5 bg-[var(--bg-surface)] border-2 border-black dark:border-white text-black dark:text-white outline-none focus:ring-2 focus:ring-[#10ffa0]"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block font-bold uppercase mb-1">Algorithmic Philosophy / Bio</label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="What is your DSA learning strategy?"
                className="w-full p-2.5 bg-[var(--bg-surface)] border-2 border-black dark:border-white text-black dark:text-white outline-none font-['Work_Sans'] text-[13px] focus:ring-2 focus:ring-[#10ffa0]"
              />
            </div>

            {/* Favorite Topics */}
            <div>
              <label className="block font-bold uppercase mb-2">Focus Topics</label>
              <div className="flex flex-wrap gap-2">
                {availableTopics.map((top) => {
                  const isFav = favoriteTopics.includes(top);
                  return (
                    <button
                      key={top}
                      type="button"
                      onClick={() => toggleTopic(top)}
                      className={`px-3 py-1 font-['JetBrains_Mono'] text-[11px] font-bold border-2 border-black dark:border-white transition-all ${
                        isFav
                          ? 'bg-black text-[#10ffa0] dark:bg-white dark:text-black shadow-[2px_2px_0px_0px_#10ffa0]'
                          : 'bg-[var(--bg-surface-container)] text-[var(--text-on-surface-variant)] hover:text-black hover:bg-neutral-200'
                      }`}
                    >
                      {isFav ? `✓ ${top}` : `+ ${top}`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <div className="mt-4 pt-4 border-t-2 border-black/20 dark:border-white/20 flex items-center justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="px-8 py-3.5 bg-black text-white dark:bg-white dark:text-black font-['JetBrains_Mono'] text-[13px] font-extrabold uppercase border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_#10ffa0] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                {isSaving ? 'SAVING TO HEAP...' : 'UPDATE PASSPORT DETAILS →'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
