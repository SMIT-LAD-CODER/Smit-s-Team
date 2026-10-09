import React from 'react';
import { LeaderboardEntry } from '../types';

export const ContestArenaView: React.FC = () => {
  const leaderboard: LeaderboardEntry[] = [
    { rank: 1, name: 'AARAV SHARMA', college: 'IIT BOMBAY // COMP. SCI', score: '18 / 18 [PERFECT]', efficiency: 'O(1) SPACE AVG // 4.2ms' },
    { rank: 2, name: 'RIYA PATEL', college: 'BITS PILANI // EEE', score: '17 / 18', efficiency: 'O(N) SPACE // 6.1ms' },
    { rank: 3, name: 'SMIT MEHTA (YOU)', college: 'NIT TRICHY // CS', score: '16 / 18', efficiency: 'O(N LOG N) // 12.0ms', badge: 'ACTIVE' },
    { rank: 4, name: 'ROHAN VERMA', college: 'DTU // SOFTWARE ENG', score: '15 / 18', efficiency: 'O(N) SPACE // 8.4ms' },
    { rank: 5, name: 'ANANYA IYER', college: 'IIIT HYDERABAD // CSE', score: '15 / 18', efficiency: 'O(N) SPACE // 9.2ms' },
    { rank: 6, name: 'VIKRAM CHOWDHURY', college: 'JADAVPUR UNIV // IT', score: '14 / 18', efficiency: 'O(N²) // 48.0ms' },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-[#ba1a1a] text-white p-6 sm:p-10 lg:p-14">
      {/* Top Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-white pb-6 mb-10">
        <div>
          <div className="bg-white text-[#ba1a1a] font-['JetBrains_Mono'] text-[10px] font-extrabold px-3 py-1 uppercase tracking-widest w-fit mb-3">
            MODULE 07 // HIGH STAKES TIMED ARENA
          </div>
          <h2 className="font-['Anton'] text-4xl sm:text-6xl uppercase tracking-tight text-white leading-none">
            WEEK 04. YOUR COLLEGE. YOUR BRAIN.
          </h2>
          <p className="font-['Work_Sans'] text-sm text-red-200 mt-2 max-w-xl">
            Ranked by cognitive efficiency and algorithmic invariants, not copy-pasting speed.
          </p>
        </div>
        <div className="font-['JetBrains_Mono'] text-[11px] text-red-200 uppercase tracking-widest bg-black/40 px-3 py-2 border border-white">
          LIVE STANDINGS // CLOSES IN: <span className="text-white font-bold font-['JetBrains_Mono']">14H 22M 09S</span>
        </div>
      </div>

      {/* Leaderboard Table Container */}
      <div className="bg-white text-black border-4 border-black shadow-[10px_10px_0px_0px_#000000]">
        {/* Table Header */}
        <div className="grid grid-cols-12 p-4 border-b-2 border-black bg-[#e5e2db] font-['JetBrains_Mono'] text-[11px] font-extrabold uppercase">
          <div className="col-span-2 sm:col-span-1">RANK</div>
          <div className="col-span-6 sm:col-span-5">ENGINEER // IDENTITY</div>
          <div className="col-span-2 sm:col-span-3 text-center">SOLVED SCORE</div>
          <div className="col-span-2 sm:col-span-3 text-right">EFFICIENCY METRIC</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-black/20 font-['JetBrains_Mono'] text-[12px]">
          {leaderboard.map((row) => (
            <div
              key={row.rank}
              className={`grid grid-cols-12 p-4 sm:p-5 items-center hover:bg-[#10ffa0]/20 transition-colors ${
                row.badge ? 'bg-[#10ffa0]/10 border-l-4 border-l-black font-bold' : ''
              }`}
            >
              <div className="col-span-2 sm:col-span-1 font-['Anton'] text-3xl leading-none">
                {row.rank < 10 ? `0${row.rank}` : row.rank}
              </div>
              <div className="col-span-6 sm:col-span-5">
                <span className="font-bold block uppercase text-black flex items-center gap-2">
                  {row.name}
                  {row.badge && (
                    <span className="px-1.5 py-0.2 bg-black text-[#10ffa0] text-[9px] uppercase font-bold">
                      YOU
                    </span>
                  )}
                </span>
                <span className="text-[10px] text-[#45474a] font-normal">{row.college}</span>
              </div>
              <div className="col-span-2 sm:col-span-3 text-center font-bold text-[#006d41]">
                {row.score}
              </div>
              <div className="col-span-2 sm:col-span-3 text-right text-[11px] text-[#1c1c18]">
                {row.efficiency}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contest Rules Footer */}
      <div className="mt-8 p-4 bg-black/40 border border-white text-white font-['JetBrains_Mono'] text-[11px] flex flex-col sm:flex-row items-center justify-between gap-3">
        <span>// CONTEST RULE: Solutions with sub-optimal Big-O complexity receive a 50% score penalty.</span>
        <button className="px-4 py-2 bg-white text-black font-bold uppercase hover:bg-neutral-200">
          ENTER CONTEST ARENA SPRINT →
        </button>
      </div>
    </div>
  );
};
