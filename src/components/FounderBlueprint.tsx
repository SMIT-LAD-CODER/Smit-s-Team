import React, { useState } from 'react';

export const FounderBlueprint: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'strategy' | 'features' | 'architecture' | 'execution'>('strategy');

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-[#fcf9f2] text-black p-6 sm:p-10 lg:p-16">
      {/* Top Banner */}
      <div className="border-b-4 border-black pb-8 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2 font-['JetBrains_Mono'] text-[11px] font-bold uppercase tracking-wider text-[#ba1a1a]">
            <span className="w-2.5 h-2.5 bg-[#ba1a1a]"></span>
            <span>BRUTALLY HONEST STARTUP ADVISORY // ₹0 BUDGET SOLO PLAYBOOK</span>
          </div>
          <h1 className="font-['Anton'] text-4xl sm:text-6xl uppercase tracking-tight text-black leading-none">
            PRODUCT BLUEPRINT &amp; ARCHITECTURE
          </h1>
          <p className="font-['Work_Sans'] text-base text-[#45474a] mt-2 max-w-2xl">
            Strategic breakdown for a solo student developer with 2–3 hours/day, ₹0 budget, building to teach real DSA intuition and eventually monetize.
          </p>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex flex-wrap gap-1 bg-[var(--bg-surface-container)] p-1 border-2 border-black dark:border-white">
          {[
            { id: 'strategy', label: '01 // PRODUCT STRATEGY' },
            { id: 'features', label: '02 // FEATURE HIERARCHY' },
            { id: 'architecture', label: '03 // SYSTEMS ARCHITECTURE' },
            { id: 'execution', label: '04 // 7-DAY & 30-DAY PLAN' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`px-3 py-1.5 font-['JetBrains_Mono'] text-[10px] font-bold uppercase transition-all ${
                activeSection === tab.id
                  ? 'bg-black text-[#10ffa0] dark:bg-white dark:text-black shadow-[2px_2px_0px_0px_#000000]'
                  : 'text-[var(--text-on-surface-variant)] hover:text-black dark:hover:text-white hover:bg-[var(--bg-surface-container-high)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: PRODUCT STRATEGY                                                   */}
      {/* ========================================================================= */}
      {activeSection === 'strategy' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Vision */}
          <div className="p-6 bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000000] flex flex-col justify-between">
            <div>
              <span className="font-['JetBrains_Mono'] text-[10px] font-bold bg-black text-[#10ffa0] px-2 py-0.5 uppercase">
                01 // PRODUCT VISION
              </span>
              <h3 className="font-['Anton'] text-2xl uppercase mt-3 mb-2">The Anti-LeetCode Workbook</h3>
              <p className="font-['Work_Sans'] text-[14px] text-[#45474a] leading-relaxed">
                DSA Progress Book is an anti-memorization learning workbook that turns algorithmic problem-solving from mindless syntax typing into structured engineering thought: <strong>THINK → PLAN → VISUALIZE → CODE → GET GUIDANCE → TEST → REFLECT → TRACK</strong>.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-black/10 font-['JetBrains_Mono'] text-[11px] text-black">
              <strong>NORTH STAR METRIC:</strong> Concept retention after 14 days (measured by unassisted solving on isomorphic variants).
            </div>
          </div>

          {/* 2. Target User */}
          <div className="p-6 bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000000] flex flex-col justify-between">
            <div>
              <span className="font-['JetBrains_Mono'] text-[10px] font-bold bg-[#ffd000] text-black px-2 py-0.5 uppercase">
                02 // TARGET USER PERSONA
              </span>
              <h3 className="font-['Anton'] text-2xl uppercase mt-3 mb-2">College Student / Junior Dev (Tier 2/3 Colleges)</h3>
              <p className="font-['Work_Sans'] text-[14px] text-[#45474a] leading-relaxed">
                Engineering students preparing for campus placements or off-campus tech roles. They know basic C++/Java/Python syntax and arrays/loops, but freeze when looking at a blank LeetCode screen. They constantly fall into the tutorial-hell copy-paste trap.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-black/10 font-['JetBrains_Mono'] text-[11px] text-[#006d41] font-bold">
              ★ WILLING TO PAY FOR: Placement confidence, verified mock test readiness, and personalized weak-topic fixing.
            </div>
          </div>

          {/* 3. Main User Problem */}
          <div className="p-6 bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000000] flex flex-col justify-between">
            <div>
              <span className="font-['JetBrains_Mono'] text-[10px] font-bold bg-[#ba1a1a] text-white px-2 py-0.5 uppercase">
                03 // MAIN USER PROBLEM
              </span>
              <h3 className="font-['Anton'] text-2xl uppercase mt-3 mb-2">The 48-Hour Solution Evaporation</h3>
              <p className="font-['Work_Sans'] text-[14px] text-[#45474a] leading-relaxed">
                Existing platforms reward binary green checkmarks. Students copy solutions from LeetCode Discuss or YouTube, feel false competence, and 48 hours later cannot solve even a slightly modified variant. They never learned <em>how to deduce the pattern</em>.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-black/10 font-['JetBrains_Mono'] text-[11px] text-[#ba1a1a] font-bold">
              ROOT CAUSE: Zero cognitive friction. No forced spatial sketching or self-reflection.
            </div>
          </div>

          {/* 4. UVP */}
          <div className="p-6 bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000000] flex flex-col justify-between">
            <div>
              <span className="font-['JetBrains_Mono'] text-[10px] font-bold bg-[#10ffa0] text-black px-2 py-0.5 uppercase">
                04 // UNIQUE VALUE PROPOSITION
              </span>
              <h3 className="font-['Anton'] text-2xl uppercase mt-3 mb-2">The Socratic Cognitive Gym</h3>
              <p className="font-['Work_Sans'] text-[14px] text-[#45474a] leading-relaxed">
                "We don't give you code. We teach your brain how to think." Interactive scratchpad + Socratic AI that acts like an elite engineering TA who refuses to spoil the punchline, forcing you to unlock progressive hints.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-black/10 font-['JetBrains_Mono'] text-[11px] text-black font-bold">
              DIFFERENTIATOR: Process-oriented workflow rather than raw solved count.
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: FEATURE HIERARCHY & REJECTIONS                                    */}
      {/* ========================================================================= */}
      {activeSection === 'features' && (
        <div className="space-y-6">
          <div className="p-4 bg-[#f1eee7] border-2 border-black font-['JetBrains_Mono'] text-[11px]">
            <strong>CRITICAL RULE FOR A SOLO DEVELOPER WITH ₹0 BUDGET:</strong> Never build infrastructure that requires dedicated microservices, complex multi-region sandbox containers, or heavy real-time multiplayer servers on day 1. Every feature must deliver maximal student learning with minimal maintenance surface area.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* MUST HAVE */}
            <div className="p-5 bg-white border-2 border-black shadow-[4px_4px_0px_0px_#10ffa0] flex flex-col justify-between">
              <div>
                <span className="bg-[#10ffa0] text-black px-2 py-0.5 font-['JetBrains_Mono'] text-[10px] font-extrabold uppercase">
                  MUST HAVE (MVP)
                </span>
                <h4 className="font-['Anton'] text-xl uppercase mt-3 mb-2">Build In Days 1–7</h4>
                <ul className="space-y-2 font-['Work_Sans'] text-[13px] text-[#45474a]">
                  <li>✓ <strong>Structured Process UI</strong> (Understand → Plan → Visualize → Code → Reflect)</li>
                  <li>✓ <strong>Curated 25-Problem Core Bank</strong> (Pattern-oriented, not 2,000 random problems)</li>
                  <li>✓ <strong>Intuition Selector</strong> (Forces trade-off thinking before code)</li>
                  <li>✓ <strong>C++ Code Console</strong> with edge-case checks</li>
                  <li>✓ <strong>Socratic AI Mentor</strong> (Zero-spoiler prompt with progressive hints)</li>
                  <li>✓ <strong>Whiteboard Canvas &amp; Pointer Simulator</strong></li>
                  <li>✓ <strong>Post-Solve Reflection Journal</strong> &amp; Spaced Repetition queue</li>
                </ul>
              </div>
              <div className="mt-4 pt-2 border-t border-black/10 font-['JetBrains_Mono'] text-[10px] text-[#006d41] font-bold">
                100% SOLVES THE CORE USER NEED.
              </div>
            </div>

            {/* SHOULD HAVE */}
            <div className="p-5 bg-white border-2 border-black shadow-[4px_4px_0px_0px_#ffd000] flex flex-col justify-between">
              <div>
                <span className="bg-[#ffd000] text-black px-2 py-0.5 font-['JetBrains_Mono'] text-[10px] font-extrabold uppercase">
                  SHOULD HAVE (V1.5)
                </span>
                <h4 className="font-['Anton'] text-xl uppercase mt-3 mb-2">Days 14–21</h4>
                <ul className="space-y-2 font-['Work_Sans'] text-[13px] text-[#45474a]">
                  <li>• <strong>Weak-Topic Heatmap</strong> (flags DP / Graphs if runtime hypothesis is wrong)</li>
                  <li>• <strong>College Weekly Sprint</strong> (batch contest challenge with static leaderboard)</li>
                  <li>• <strong>Mistake Journal</strong> (tagging off-by-one errors &amp; overflow traps)</li>
                  <li>• <strong>Java &amp; Python Boilerplates</strong> alongside C++</li>
                  <li>• <strong>Exportable Revision Notes</strong> to Markdown/PDF</li>
                </ul>
              </div>
              <div className="mt-4 pt-2 border-t border-black/10 font-['JetBrains_Mono'] text-[10px] text-black font-bold">
                BUILDS HABIT &amp; RETENTION.
              </div>
            </div>

            {/* LATER */}
            <div className="p-5 bg-white border-2 border-black shadow-[4px_4px_0px_0px_#1d4ed8] flex flex-col justify-between">
              <div>
                <span className="bg-[#1d4ed8] text-white px-2 py-0.5 font-['JetBrains_Mono'] text-[10px] font-extrabold uppercase">
                  LATER (V2)
                </span>
                <h4 className="font-['Anton'] text-xl uppercase mt-3 mb-2">After 100 Active Users</h4>
                <ul className="space-y-2 font-['Work_Sans'] text-[13px] text-[#45474a]">
                  <li>• Peer Code Reviews &amp; Socratic annotation threads</li>
                  <li>• Placement Company Tags (Amazon, Google, Flipkart interview patterns)</li>
                  <li>• College Batch Leaderboard with verified .edu / college email domains</li>
                  <li>• Premium AI Voice TA (TTS Live guidance)</li>
                </ul>
              </div>
              <div className="mt-4 pt-2 border-t border-black/10 font-['JetBrains_Mono'] text-[10px] text-[#1d4ed8] font-bold">
                ONLY WHEN USERS BEG FOR IT.
              </div>
            </div>

            {/* DO NOT BUILD */}
            <div className="p-5 bg-[#ffdad6] border-2 border-black shadow-[4px_4px_0px_0px_#ba1a1a] flex flex-col justify-between">
              <div>
                <span className="bg-[#ba1a1a] text-white px-2 py-0.5 font-['JetBrains_Mono'] text-[10px] font-extrabold uppercase">
                  DO NOT BUILD YET (TRAPS!)
                </span>
                <h4 className="font-['Anton'] text-xl uppercase mt-3 mb-2 text-[#93000a]">Brutal Startup Rejections</h4>
                <ul className="space-y-2 font-['Work_Sans'] text-[13px] text-[#93000a]">
                  <li>✖ <strong>DO NOT BUILD:</strong> Remote Docker code execution backend (Docker sandboxes cost $$, risk fork bombs, and will drain ₹0 budget). Use client WebAssembly or serverless test runners!</li>
                  <li>✖ <strong>DO NOT BUILD:</strong> 2,000 problem scraping script (Quality over quantity).</li>
                  <li>✖ <strong>DO NOT BUILD:</strong> Real-time WebSocket multi-user chatrooms (Distraction, high maintenance).</li>
                  <li>✖ <strong>DO NOT BUILD:</strong> Complex custom crypto/points gamification.</li>
                </ul>
              </div>
              <div className="mt-4 pt-2 border-t border-black/10 font-['JetBrains_Mono'] text-[10px] text-[#ba1a1a] font-bold">
                THESE KILL SOLO FOUNDERS.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SYSTEMS ARCHITECTURE & ₹0 BUDGET SETUP                            */}
      {/* ========================================================================= */}
      {activeSection === 'architecture' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Database Entities */}
          <div className="p-6 bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000000]">
            <span className="bg-black text-[#10ffa0] px-2 py-0.5 font-['JetBrains_Mono'] text-[10px] font-bold uppercase">
              DATA ARCHITECTURE (CLEAN &amp; MINIMAL)
            </span>
            <h3 className="font-['Anton'] text-2xl uppercase mt-3 mb-3">Database Entities (PostgreSQL / SQLite)</h3>

            <div className="space-y-3 font-['JetBrains_Mono'] text-[11px]">
              <div className="p-3 bg-[#f1eee7] border border-black">
                <span className="font-bold text-black">User</span>
                <p className="text-[#45474a]">id, email, name, college, streak_count, last_active_at, created_at</p>
              </div>
              <div className="p-3 bg-[#f1eee7] border border-black">
                <span className="font-bold text-black">Problem</span>
                <p className="text-[#45474a]">id, slug, title, category, difficulty, statement, testcases_json, approaches_json, starter_code</p>
              </div>
              <div className="p-3 bg-[#f1eee7] border border-black">
                <span className="font-bold text-black">StudentProgress</span>
                <p className="text-[#45474a]">id, user_id, problem_id, status (SOLVED/IN_PROGRESS), intuition_choice, attempts, solved_at</p>
              </div>
              <div className="p-3 bg-[#f1eee7] border border-black">
                <span className="font-bold text-black">ReflectionEntry</span>
                <p className="text-[#45474a]">id, user_id, problem_id, core_pattern, mistake_note, time_spent_mins, next_revision_date</p>
              </div>
            </div>
          </div>

          {/* AI Mentor Architecture */}
          <div className="p-6 bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000000]">
            <span className="bg-[#1d4ed8] text-white px-2 py-0.5 font-['JetBrains_Mono'] text-[10px] font-bold uppercase">
              AI MENTOR ARCHITECTURE
            </span>
            <h3 className="font-['Anton'] text-2xl uppercase mt-3 mb-3">Strict Zero-Spoiler Guardrails</h3>

            <p className="font-['Work_Sans'] text-[14px] text-[#45474a] leading-relaxed mb-4">
              The AI must never output complete code. Instead, we use a <strong>3-tier system instruction prompt</strong> via Gemini 3.8 Flash on our proxy server:
            </p>

            <div className="space-y-2 font-['JetBrains_Mono'] text-[11px] bg-[#f1eee7] p-3 border border-black">
              <div><strong className="text-black">1. Context Injection:</strong> Current problem description, constraints, and student's current code draft.</div>
              <div><strong className="text-black">2. Negative Constraints:</strong> PROHIBITED from generating `vector&lt;int&gt;`, `class Solution`, or copy-paste code blocks.</div>
              <div><strong className="text-black">3. Socratic Strategy:</strong> Ask 1 question at a time. Target invariants (e.g. pointer bounds, hash table lookups, edge-cases).</div>
              <div><strong className="text-black">4. Cost Optimization:</strong> Cap maxOutputTokens to 150 tokens. Under free tier, costs ₹0!</div>
            </div>
          </div>

          {/* Monetization possibilities */}
          <div className="p-6 bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000000]">
            <span className="bg-[#ffd000] text-black px-2 py-0.5 font-['JetBrains_Mono'] text-[10px] font-bold uppercase">
              MONETIZATION
            </span>
            <h3 className="font-['Anton'] text-2xl uppercase mt-3 mb-3">How to Actually Sell It (₹0 to ₹50K/mo)</h3>

            <div className="space-y-2 font-['Work_Sans'] text-[13px] text-[#45474a]">
              <p>
                <strong>Tier 1: Free Forever Core</strong> — Top 50 classic problems with Whiteboard &amp; Think Lab. Virality engine for college WhatsApp/Telegram groups.
              </p>
              <p>
                <strong>Tier 2: DSA Placement Pass (₹299 – ₹499 one-time or ₹99/month)</strong> — Unlimited AI Socratic queries, Spaced Repetition daily email revision alerts, and college contest certificates.
              </p>
              <p>
                <strong>Tier 3: College TPO / Training Batch License (₹15,000/college/year)</strong> — Sell directly to college placement training cells (TPOs) for tracking students' genuine problem-solving honesty without copy-pasting!
              </p>
            </div>
          </div>

          {/* Risks & Mitigation */}
          <div className="p-6 bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000000]">
            <span className="bg-[#ba1a1a] text-white px-2 py-0.5 font-['JetBrains_Mono'] text-[10px] font-bold uppercase">
              TECHNICAL RISKS
            </span>
            <h3 className="font-['Anton'] text-2xl uppercase mt-3 mb-3">Brutal Reality &amp; Mitigations</h3>

            <div className="space-y-2 font-['Work_Sans'] text-[13px] text-[#45474a]">
              <p>
                <strong>Risk 1: AI hallucinating or giving spoilers.</strong><br />
                <em>Mitigation:</em> Hardcoded progressive hint accordion (Hints 1, 2, 3 written by human expert) + strict system prompt with zero-spoiler fallback logic.
              </p>
              <p>
                <strong>Risk 2: Student drops off due to high friction.</strong><br />
                <em>Mitigation:</em> Ensure stages can be completed in &lt; 15 minutes. Start with Primitive &amp; Medium problems with high placement frequency.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: 7-DAY BUILD & 30-DAY VALIDATION PLAN                              */}
      {/* ========================================================================= */}
      {activeSection === 'execution' && (
        <div className="space-y-8">
          {/* 7-Day Plan */}
          <div className="p-6 bg-white border-2 border-black shadow-[6px_6px_0px_0px_#000000]">
            <div className="flex items-center justify-between pb-3 border-b-2 border-black mb-6">
              <div>
                <span className="bg-black text-[#10ffa0] px-2 py-0.5 font-['JetBrains_Mono'] text-[10px] font-bold uppercase">
                  SOLO EXECUTION
                </span>
                <h3 className="font-['Anton'] text-3xl uppercase mt-2">The 7-Day Build Plan (2–3 Hours/Day)</h3>
              </div>
              <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-[#ba1a1a]">₹0 TOTAL SPEND</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
              {[
                { day: 'DAY 01', title: 'UX & Shell', task: 'Build cockpit header, stage stepper, and editorial manifesto shell.' },
                { day: 'DAY 02', title: 'Problem Spec & Think Lab', task: 'Implement Think-First intuition selector with algorithmic feedback.' },
                { day: 'DAY 03', title: 'C++ Workstation', task: 'Build editor, line numbers, complexity hypothesis buttons, and test runner.' },
                { day: 'DAY 04', title: 'Whiteboard & Simulator', task: 'Canvas drawing tools and step-by-step array pointer simulator.' },
                { day: 'DAY 05', title: 'Socratic AI', task: 'Integrate Gemini API proxy with strict zero-spoiler prompts and progressive hints.' },
                { day: 'DAY 06', title: 'Reflection & Stats', task: 'Post-solve reflection modal, spaced repetition ledger, and streak counter.' },
                { day: 'DAY 07', title: 'Deployment & College Test', task: 'Deploy live, seed 15 top placement problems, and share with 10 college classmates.' },
              ].map((d) => (
                <div key={d.day} className="p-3 bg-[#f1eee7] border border-black flex flex-col justify-between">
                  <div>
                    <span className="font-['JetBrains_Mono'] text-[10px] font-extrabold text-[#1d4ed8]">{d.day}</span>
                    <h5 className="font-['Anton'] text-base uppercase mt-1 mb-1">{d.title}</h5>
                    <p className="font-['Work_Sans'] text-[11px] text-[#45474a] leading-tight">{d.task}</p>
                  </div>
                  <span className="mt-3 text-[9px] font-['JetBrains_Mono'] text-[#006d41] font-bold uppercase">2.5 hrs</span>
                </div>
              ))}
            </div>
          </div>

          {/* 30-Day Validation Plan */}
          <div className="p-6 bg-white border-2 border-black shadow-[6px_6px_0px_0px_#000000]">
            <div className="flex items-center justify-between pb-3 border-b-2 border-black mb-6">
              <div>
                <span className="bg-[#ffd000] text-black px-2 py-0.5 font-['JetBrains_Mono'] text-[10px] font-bold uppercase">
                  GO-TO-MARKET
                </span>
                <h3 className="font-['Anton'] text-3xl uppercase mt-2">The 30-Day Validation Plan</h3>
              </div>
              <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-[#006d41]">TARGET: 100 REGULAR STUDENTS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-[#f1eee7] border border-black">
                <span className="font-['JetBrains_Mono'] text-[10px] font-bold text-black uppercase">WEEK 01 (DAYS 1–7)</span>
                <h4 className="font-['Anton'] text-lg uppercase mt-1 mb-2">Alpha Testing with 5 Close Friends</h4>
                <p className="font-['Work_Sans'] text-[12px] text-[#45474a]">
                  Sit beside 5 classmates while they solve "Two Sum" and "Container With Most Water". Watch where they hesitate. Fix UI confusion.
                </p>
              </div>

              <div className="p-4 bg-[#f1eee7] border border-black">
                <span className="font-['JetBrains_Mono'] text-[10px] font-bold text-black uppercase">WEEK 02 (DAYS 8–14)</span>
                <h4 className="font-['Anton'] text-lg uppercase mt-1 mb-2">College Coding Club Launch</h4>
                <p className="font-['Work_Sans'] text-[12px] text-[#45474a]">
                  Post in your college WhatsApp/Discord/Telegram groups: "I built a free tool that forces you to understand the logic before coding so you don't forget it in 2 days."
                </p>
              </div>

              <div className="p-4 bg-[#f1eee7] border border-black">
                <span className="font-['JetBrains_Mono'] text-[10px] font-bold text-black uppercase">WEEK 03 (DAYS 15–21)</span>
                <h4 className="font-['Anton'] text-lg uppercase mt-1 mb-2">Weekly College Sprint Event</h4>
                <p className="font-['Work_Sans'] text-[12px] text-[#45474a]">
                  Run a weekend sprint (3 curated problems). Track leaderboards by memory/runtime efficiency rather than just who typed fastest.
                </p>
              </div>

              <div className="p-4 bg-[#f1eee7] border border-black">
                <span className="font-['JetBrains_Mono'] text-[10px] font-bold text-black uppercase">WEEK 04 (DAYS 22–30)</span>
                <h4 className="font-['Anton'] text-lg uppercase mt-1 mb-2">First Paid Pre-Orders</h4>
                <p className="font-['Work_Sans'] text-[12px] text-[#45474a]">
                  Introduce the Placement Prep Pass for ₹199 (early bird). If 15 students buy, you have validated real willingness to pay!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
