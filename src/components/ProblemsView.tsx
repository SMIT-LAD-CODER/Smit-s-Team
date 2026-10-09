import React, { useState } from 'react';
import { Problem, CurriculumLevel } from '../types';
import { SYLLABUS_UNITS } from '../data/curriculum';
import { BookOpen, Layers, Search, Sparkles } from 'lucide-react';

interface ProblemsViewProps {
  problems: Problem[];
  onSelectProblem: (problem: Problem) => void;
}

export const ProblemsView: React.FC<ProblemsViewProps> = ({ problems, onSelectProblem }) => {
  const [selectedUnit, setSelectedUnit] = useState<string>('ALL');
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const levels: Array<'ALL' | CurriculumLevel> = [
    'ALL',
    'Level 1 (Foundation)',
    'Level 2 (Pattern Building)',
    'Level 3 (Application)',
    'Level 4 (Interview Practice)',
    'Level 5 (Advanced)',
  ];

  const filteredProblems = problems.filter((p) => {
    const matchesUnit = selectedUnit === 'ALL' || p.unitId === selectedUnit;
    const matchesLevel = selectedLevel === 'ALL' || p.curriculumLevel === selectedLevel;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.pattern.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.sourceReference && p.sourceReference.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesUnit && matchesLevel && matchesSearch;
  });

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-[var(--bg-surface)] text-[var(--text-on-surface)] p-6 sm:p-10 transition-colors">
      {/* Header */}
      <div className="border-b-2 border-black dark:border-white pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="font-['JetBrains_Mono'] text-[10px] text-[var(--text-on-surface-variant)] uppercase tracking-widest mb-1.5 font-bold flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#10ffa0] inline-block border border-black"></span>
            <span>MODULE 01 // NOTEBOOKLM CURRICULUM PROBLEM BANK</span>
          </div>
          <h1 className="font-['Anton'] text-4xl sm:text-6xl uppercase tracking-tight leading-none text-black dark:text-white">
            SYLLABUS PROBLEMS LEDGER
          </h1>
          <p className="font-['Work_Sans'] text-sm text-[var(--text-on-surface-variant)] mt-2 max-w-2xl">
            Strictly grounded in your university 6-Unit syllabus &amp; 11 Practical Labs. No random 2,000 problem spam. Every problem teaches an invariant.
          </p>
        </div>

        {/* Search */}
        <div className="w-full md:w-80 relative">
          <input
            type="text"
            placeholder="Search syllabus, practicals, patterns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-black border-2 border-black dark:border-white px-3 py-2.5 font-['JetBrains_Mono'] text-[12px] text-black dark:text-white outline-none focus:ring-2 focus:ring-[#10ffa0] shadow-[3px_3px_0px_0px_#000000] dark:shadow-[3px_3px_0px_0px_#ffffff]"
          />
        </div>
      </div>

      {/* Syllabus Unit Tabs Ribbon */}
      <div className="mb-6">
        <div className="font-['JetBrains_Mono'] text-[10px] uppercase text-[var(--text-on-surface-variant)] font-bold mb-2 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-[#10ffa0]" />
          <span>FILTER BY SYLLABUS UNIT (COURSE STRUCTURE):</span>
        </div>
        <div className="flex flex-wrap gap-1.5 font-['JetBrains_Mono'] text-[11px]">
          <button
            onClick={() => setSelectedUnit('ALL')}
            className={`px-3 py-1.5 uppercase font-bold border border-black dark:border-white transition-all ${
              selectedUnit === 'ALL'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-[2px_2px_0px_0px_#10ffa0]'
                : 'bg-[var(--bg-surface-container)] text-[var(--text-on-surface)] hover:bg-[var(--bg-surface-container-high)]'
            }`}
          >
            ALL UNITS [6]
          </button>
          {SYLLABUS_UNITS.map((unit) => {
            const isSelected = selectedUnit === unit.id;
            return (
              <button
                key={unit.id}
                onClick={() => setSelectedUnit(unit.id)}
                className={`px-3 py-1.5 uppercase font-bold border border-black dark:border-white transition-all ${
                  isSelected
                    ? 'bg-black text-[#10ffa0] dark:bg-white dark:text-black shadow-[2px_2px_0px_0px_#10ffa0]'
                    : 'bg-[var(--bg-surface-container)] text-[var(--text-on-surface)] hover:bg-[var(--bg-surface-container-high)]'
                }`}
              >
                UNIT {unit.unitNumber}: {unit.title.split(':')[1]?.trim() || unit.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Progression Level Filter Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-black/20 dark:border-white/20">
        <div className="flex flex-wrap items-center gap-1.5 font-['JetBrains_Mono'] text-[11px]">
          <span className="text-[var(--text-on-surface-variant)] font-bold text-[10px] uppercase mr-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" />
            LEVEL:
          </span>
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-2.5 py-1 uppercase font-bold border border-black dark:border-white text-[10px] transition-all ${
                selectedLevel === lvl
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-[2px_2px_0px_0px_#000000]'
                  : 'bg-white dark:bg-black text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        <div className="font-['JetBrains_Mono'] text-[11px] text-[var(--text-on-surface-variant)]">
          SHOWING: <strong className="text-black dark:text-white">{filteredProblems.length}</strong> CURATED PROBLEMS
        </div>
      </div>

      {/* Problem Ledger Table */}
      <div className="bg-white dark:bg-[#121417] border-2 border-black dark:border-white shadow-[6px_6px_0px_0px_#000000] dark:shadow-[6px_6px_0px_0px_#ffffff] overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 p-3 bg-[#e5e2db] dark:bg-[#1f2228] border-b-2 border-black dark:border-white font-['JetBrains_Mono'] text-[10px] font-extrabold uppercase text-[#45474a] dark:text-[#9da2ac]">
          <div className="col-span-2 sm:col-span-1">STATUS</div>
          <div className="col-span-2 sm:col-span-1">INDEX</div>
          <div className="col-span-5 sm:col-span-6">PROBLEM // SYLLABUS ANCHOR &amp; PATTERN</div>
          <div className="col-span-3 sm:col-span-2">COMPLEXITY</div>
          <div className="hidden sm:block sm:col-span-2 text-right">ACTION</div>
        </div>

        {/* Problem Rows */}
        <div className="divide-y divide-black/20 dark:divide-white/20 font-['JetBrains_Mono'] text-[12px]">
          {filteredProblems.map((prob) => {
            const isSolved = prob.status === 'SOLVED';
            const isInProgress = prob.status === 'IN_PROGRESS';
            const isReview = prob.status === 'REVIEW_NEEDED';

            return (
              <div
                key={prob.id}
                onClick={() => onSelectProblem(prob)}
                className="grid grid-cols-12 p-4 items-center hover:bg-[#f1eee7] dark:hover:bg-[#1a1d22] cursor-pointer transition-colors"
              >
                {/* Status Column */}
                <div className="col-span-2 sm:col-span-1">
                  {isSolved && (
                    <span className="px-1.5 py-0.5 bg-[#10ffa0] text-[#007144] font-bold text-[9px] border border-black">
                      SOLVED
                    </span>
                  )}
                  {isInProgress && (
                    <span className="px-1.5 py-0.5 bg-[#ffd000] text-black font-bold text-[9px] border border-black">
                      ACTIVE
                    </span>
                  )}
                  {isReview && (
                    <span className="px-1.5 py-0.5 bg-[#ffdad6] text-[#ba1a1a] font-bold text-[9px] border border-black">
                      REVISE
                    </span>
                  )}
                  {!isSolved && !isInProgress && !isReview && (
                    <span className="text-[#75777a] text-[10px]">--</span>
                  )}
                </div>

                {/* Number */}
                <div className="col-span-2 sm:col-span-1 font-bold text-[#45474a] dark:text-[#9da2ac]">
                  {prob.number}
                </div>

                {/* Problem Info */}
                <div className="col-span-5 sm:col-span-6 flex flex-col pr-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-black dark:text-white hover:underline text-[13px]">
                      {prob.title}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 font-bold uppercase bg-[#10ffa0] text-black border border-black">
                      {prob.curriculumLevel}
                    </span>
                  </div>

                  {/* Syllabus Source Reference & Pattern */}
                  <div className="text-[11px] text-[#006d41] dark:text-[#10ffa0] font-bold mt-1">
                    {prob.sourceReference}
                  </div>

                  <div className="text-[11px] text-[#45474a] dark:text-[#9da2ac] font-['Work_Sans'] mt-0.5">
                    Pattern: <strong>{prob.pattern}</strong> • Objective: {prob.learningObjective}
                  </div>
                </div>

                {/* Complexity */}
                <div className="col-span-3 sm:col-span-2 text-[11px] text-[#1d4ed8] dark:text-[#60a5fa] font-bold">
                  Time: {prob.correctTimeComplexity}
                  <br />
                  Space: {prob.correctSpaceComplexity}
                </div>

                {/* Action button */}
                <div className="hidden sm:flex sm:col-span-2 justify-end">
                  <button className="px-3.5 py-1.5 bg-black text-[#10ffa0] dark:bg-white dark:text-black text-[10px] font-bold uppercase border border-black dark:border-white shadow-[2px_2px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#ffffff] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform">
                    ENTER LAB →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
