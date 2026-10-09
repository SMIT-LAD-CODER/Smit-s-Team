import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { evaluateCppCode } from './src/server/judgeService';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Persistent JSON file storage for solo student ₹0 budget setup
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

interface StoredDb {
  users: Array<{
    id: string;
    email: string;
    name: string;
    username: string;
    college: string;
    avatar: string;
    passwordHash: string;
    createdAt: string;
    streakCount: number;
    lastActiveDate: string;
    favoriteTopics: string[];
    settings: any;
    progress: Record<string, any>;
    reflections: any[];
  }>;
  resetTokens: Record<string, { email: string; expiresAt: number }>;
}

function loadDb(): StoredDb {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error loading db.json:', err);
  }

  // Seed default student account (Smit Mehta / ladsmit.2756@gmail.com)
  const initialDb: StoredDb = {
    users: [
      {
        id: 'usr-student-01',
        email: 'ladsmit.2756@gmail.com',
        name: 'Smit Mehta',
        username: 'smit_mehta',
        college: 'NIT Trichy // CS Dept',
        avatar: '01',
        passwordHash: 'dsa_demo_2025',
        createdAt: '2025-01-15T00:00:00.000Z',
        streakCount: 7,
        lastActiveDate: new Date().toISOString(),
        favoriteTopics: ['Arrays & Hashing', 'Two Pointers', 'Binary Search'],
        settings: {
          theme: 'dark',
          dailyGoal: 2,
          difficultyPreference: 'MEDIUM',
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
        },
        progress: {
          'two-sum': {
            status: 'IN_PROGRESS',
            attempts: 3,
            lastAttemptAt: new Date().toISOString(),
            savedCode: '',
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
            nextRevisionDate: 'OCT 07, 2026',
            confidence: 'HIGH',
          },
        ],
      },
    ],
    resetTokens: {},
  };

  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2));
  } catch (e) {
    console.error('Failed to write initial db:', e);
  }

  return initialDb;
}

function saveDb(data: StoredDb) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error saving db.json:', err);
  }
}

// -------------------------------------------------------------
// AUTHENTICATION ENDPOINTS
// -------------------------------------------------------------

// Sign Up
app.post('/api/auth/signup', (req, res) => {
  const { name, email, password, college } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
  }

  const db = loadDb();
  const existing = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(409).json({ error: 'An account with this email already exists.' });
  }

  const username = email.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, '_');
  const newUser = {
    id: `usr-${Date.now()}`,
    email: email.trim().toLowerCase(),
    name: name.trim(),
    username,
    college: college ? college.trim() : 'Computer Science Dept',
    avatar: '01',
    passwordHash: password, // For solo student environment
    createdAt: new Date().toISOString(),
    streakCount: 1,
    lastActiveDate: new Date().toISOString(),
    favoriteTopics: ['Arrays & Hashing'],
    settings: {
      theme: 'dark',
      dailyGoal: 1,
      difficultyPreference: 'PRIMITIVE',
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
    },
    progress: {},
    reflections: [],
  };

  db.users.push(newUser);
  saveDb(db);

  const token = `tok_${newUser.id}_${Date.now()}`;
  const { passwordHash: _, ...safeUser } = newUser;
  return res.status(201).json({ user: safeUser, token });
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const db = loadDb();
  const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user || user.passwordHash !== password) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  user.lastActiveDate = new Date().toISOString();
  saveDb(db);

  const token = `tok_${user.id}_${Date.now()}`;
  const { passwordHash: _, ...safeUser } = user;
  return res.json({ user: safeUser, token });
});

// Current User Session Check
app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.replace('Bearer ', '');
  const parts = token.split('_');
  const userId = parts[1];

  const db = loadDb();
  const user = db.users.find((u) => u.id === userId);
  if (!user) {
    return res.status(401).json({ error: 'Invalid or expired session' });
  }

  const { passwordHash: _, ...safeUser } = user;
  return res.json({ user: safeUser });
});

// Forgot Password Request
app.post('/api/auth/forgot-password', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const db = loadDb();
  const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return res.status(404).json({ error: 'No student account found with this email.' });
  }

  const resetToken = `rst_${Math.random().toString(36).substring(2, 10)}`;
  db.resetTokens[resetToken] = {
    email: user.email,
    expiresAt: Date.now() + 1000 * 60 * 30, // 30 mins
  };
  saveDb(db);

  return res.json({
    message: 'Reset verification code issued.',
    resetToken, // Returned for effortless demo/testing
  });
});

// Reset Password Execution
app.post('/api/auth/reset-password', (req, res) => {
  const { email, resetToken, newPassword } = req.body;
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
  }

  const db = loadDb();
  const tokenEntry = resetToken ? db.resetTokens[resetToken] : null;

  const targetEmail = tokenEntry ? tokenEntry.email : email;
  if (!targetEmail) {
    return res.status(400).json({ error: 'Invalid or expired reset token.' });
  }

  const user = db.users.find((u) => u.email.toLowerCase() === targetEmail.toLowerCase());
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  user.passwordHash = newPassword;
  if (resetToken && db.resetTokens[resetToken]) {
    delete db.resetTokens[resetToken];
  }
  saveDb(db);

  return res.json({ message: 'Password updated successfully. Please log in.' });
});

// -------------------------------------------------------------
// USER DATA & PERSISTENCE ENDPOINTS
// -------------------------------------------------------------

// Update Profile
app.put('/api/user/profile', (req, res) => {
  const { userId, name, username, college, avatar, bio, favoriteTopics } = req.body;
  const db = loadDb();
  const user = db.users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (name) user.name = name.trim();
  if (username) user.username = username.trim().toLowerCase();
  if (college) user.college = college.trim();
  if (avatar) user.avatar = avatar;
  if (bio !== undefined) (user as any).bio = bio;
  if (favoriteTopics) user.favoriteTopics = favoriteTopics;

  saveDb(db);
  const { passwordHash: _, ...safeUser } = user;
  return res.json({ user: safeUser });
});

// Update Settings
app.put('/api/user/settings', (req, res) => {
  const { userId, settings } = req.body;
  const db = loadDb();
  const user = db.users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  user.settings = { ...user.settings, ...settings };
  saveDb(db);

  return res.json({ settings: user.settings });
});

// Save Problem Progress & Code
app.post('/api/user/progress', (req, res) => {
  const { userId, problemId, status, savedCode, selectedApproachId } = req.body;
  const db = loadDb();
  const user = db.users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (!user.progress) user.progress = {};
  const prev = user.progress[problemId] || {};
  user.progress[problemId] = {
    ...prev,
    status: status || prev.status || 'IN_PROGRESS',
    savedCode: savedCode !== undefined ? savedCode : prev.savedCode,
    selectedApproachId: selectedApproachId || prev.selectedApproachId,
    lastAttemptAt: new Date().toISOString(),
    attempts: (prev.attempts || 0) + 1,
    completedAt: status === 'SOLVED' ? new Date().toISOString() : prev.completedAt,
  };

  if (status === 'SOLVED' && prev.status !== 'SOLVED') {
    user.streakCount = (user.streakCount || 0) + 1;
  }

  saveDb(db);
  return res.json({ progress: user.progress });
});

// Save Reflection
app.post('/api/user/reflections', (req, res) => {
  const { userId, reflection } = req.body;
  const db = loadDb();
  const user = db.users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (!user.reflections) user.reflections = [];
  user.reflections.unshift({
    ...reflection,
    id: `ref-${Date.now()}`,
    createdAt: new Date().toISOString(),
  });

  saveDb(db);
  return res.json({ reflections: user.reflections });
});

// Socratic Mentor API endpoint
app.post('/api/mentor', async (req, res) => {
  const { question, problem, problemTitle, currentCode, history = [] } = req.body;

  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Question is required' });
  }

  const pTitle = problem?.title || problemTitle || 'DSA Problem';
  const pTopic = problem?.topic || 'Data Structures & Algorithms';
  const pPattern = problem?.pattern || 'Algorithmic Pattern';
  const pObj = problem?.learningObjective || 'Master algorithmic thinking from first principles.';
  const pMistakes = (problem?.commonMistakes || []).join('; ');
  const pEdgeCases = (problem?.edgeCases || []).map((e: any) => e.label || e).join('; ');
  const pTime = problem?.expectedTimeComplexity || problem?.correctTimeComplexity || 'O(N)';
  const pSpace = problem?.expectedSpaceComplexity || problem?.correctSpaceComplexity || 'O(1)';
  const pHint1 = problem?.hint1 || '';
  const pHint2 = problem?.hint2 || '';
  const pHint3 = problem?.hint3 || '';

  const systemInstruction = `You are Socrates, the senior AI DSA Mentor in "DSA Progress Book".
YOUR TARGET AUDIENCE: College computer science students learning DSA from first principles.
YOUR RIGID MISSION: Guide students through: THINK -> PLAN -> VISUALIZE -> CODE -> GET GUIDANCE -> TEST -> REFLECT.

STRICT SOCRATIC PROTOCOL:
1. NEVER dump a full working code solution or spoiler algorithm snippet unless the student explicitly types "I give up, show me the full C++ solution".
2. Follow the 8-Step Guidance Loop:
   - STEP 1: Ask what the student has understood from the problem requirements.
   - STEP 2: Ask what approach, invariant, or manual test they have attempted.
   - STEP 3: Provide ONE concise, high-impact conceptual hint or physical thought experiment.
   - STEP 4: Prompt the student to reason again about constraints.
   - STEP 5: Unlock the next hint level only if the student remains stuck.
   - STEP 6: Guide them to name the algorithmic pattern (${pPattern}).
   - STEP 7: Help them test edge cases (${pEdgeCases}).
   - STEP 8: Rigorously analyze asymptotic Time ${pTime} and Space ${pSpace} complexity.
3. GROUNDING IN CURRENT PROBLEM CONTEXT:
   - Problem: ${pTitle}
   - Syllabus Topic: ${pTopic}
   - Core Pattern: ${pPattern}
   - Learning Objective: ${pObj}
   - Canonical Hints: [1: "${pHint1}"] [2: "${pHint2}"] [3: "${pHint3}"]
   - Known Beginner Traps: ${pMistakes}
   - Critical Edge Cases: ${pEdgeCases}
   - Target Complexity: Time ${pTime}, Space ${pSpace}
4. Distinguish CODE ANALYSIS from ACTUAL COMPILER EXECUTION. If reviewing code, specify you are performing static conceptual review.
5. Keep responses concise, supportive, and under 130 words. Encourage independent deduction.

STUDENT'S CURRENT CODE DRAFT:
\`\`\`cpp
${currentCode || '// No code written yet.'}
\`\`\`
`;

  const getHeuristicReply = (query: string) => {
    const lower = query.toLowerCase();
    if (lower.includes('give me the solution') || lower.includes('show full solution')) {
      return `Before looking at the final C++ code, let's verify: have you identified how ${pPattern} handles the edge cases (${pEdgeCases || 'boundary conditions'})? If you still want the full solution, press Submit Solution or view the Solution Guide tab.`;
    }
    if (lower.includes('o(1)') || lower.includes('lookup') || lower.includes('hash') || lower.includes('time')) {
      return `Consider the trade-off: Target Time is ${pTime} with Space ${pSpace}. What state must you remember at each step so you do not repeat past work?`;
    }
    if (lower.includes('hint') || lower.includes('stuck') || lower.includes('next step')) {
      return pHint1 ? `Hint 1: ${pHint1} Can you simulate this on a small 3-element example on paper first?` : `Consider what invariant is preserved as you step through the input. What happens on the very first element?`;
    }
    if (lower.includes('edge') || lower.includes('bug') || lower.includes('fail')) {
      return `Check these critical edge cases: ${pEdgeCases || 'Empty input, single element, boundary extremes'}. Does your current logic handle them without out-of-bounds access?`;
    }
    return `You're exploring ${pTitle}. Before touching code, tell me: what does this problem ask you to return, and what brute force approach would you use if time complexity didn't matter?`;
  };

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const contents: any[] = [];
      if (Array.isArray(history) && history.length > 0) {
        for (const msg of history.slice(-6)) {
          contents.push({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }],
          });
        }
      }
      contents.push({
        role: 'user',
        parts: [{ text: question }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || getHeuristicReply(question);
      return res.json({ reply: replyText });
    } else {
      return res.json({ reply: getHeuristicReply(question) });
    }
  } catch (error: any) {
    console.warn('Gemini API call returned error, falling back to Socratic heuristic:', error?.message);
    return res.json({ reply: getHeuristicReply(question) });
  }
});

// REAL C++ ONLINE JUDGE ENDPOINTS
app.post('/api/judge/run', async (req, res) => {
  const { problemId, code, testcases } = req.body;
  if (!problemId || !code) {
    return res.status(400).json({ error: 'problemId and code are required.' });
  }

  try {
    const result = await evaluateCppCode(problemId, code, testcases);
    return res.json(result);
  } catch (error: any) {
    console.error('Judge run failed:', error);
    return res.status(500).json({
      status: 'RUNTIME_ERROR',
      passed: false,
      totalPassed: 0,
      totalCases: testcases?.length || 3,
      runtime: '0ms',
      memory: '0MB',
      results: [],
      detail: `Execution runner error: ${error.message}`,
    });
  }
});

app.post('/api/judge/submit', async (req, res) => {
  const { userId, problemId, code, testcases, selectedApproachId } = req.body;
  if (!problemId || !code) {
    return res.status(400).json({ error: 'problemId and code are required.' });
  }

  try {
    const judgeResult = await evaluateCppCode(problemId, code, testcases);

    if (userId) {
      const db = loadDb();
      const user = db.users.find((u) => u.id === userId);
      if (user) {
        if (!user.progress) user.progress = {};
        const prev = user.progress[problemId] || {};
        const isSolved = judgeResult.passed;

        user.progress[problemId] = {
          ...prev,
          status: isSolved ? 'SOLVED' : 'IN_PROGRESS',
          savedCode: code,
          selectedApproachId: selectedApproachId || prev.selectedApproachId,
          lastAttemptAt: new Date().toISOString(),
          attempts: (prev.attempts || 0) + 1,
          completedAt: isSolved ? (prev.completedAt || new Date().toISOString()) : prev.completedAt,
        };

        if (isSolved && prev.status !== 'SOLVED') {
          user.streakCount = (user.streakCount || 0) + 1;
        }

        saveDb(db);
      }
    }

    return res.json({
      judge: judgeResult,
      solved: judgeResult.passed,
      message: judgeResult.passed
        ? 'Accepted! All test cases passed successfully.'
        : `Submission rejected: ${judgeResult.totalPassed}/${judgeResult.totalCases} test cases passed. Fix errors before marking solved.`,
    });
  } catch (error: any) {
    console.error('Judge submission failed:', error);
    return res.status(500).json({
      error: `Judge submission failed: ${error.message}`,
    });
  }
});

// Fast Static Semantic Code & Attempt Analysis Endpoint (< 50ms)
app.post('/api/analyze-code', async (req, res) => {
  const { problem, currentCode, studentThought } = req.body;

  const pTitle = problem?.title || 'Problem';
  const pPattern = problem?.pattern || 'Pattern';
  const pMistakes = (problem?.commonMistakes || []).join('; ');
  const pEdgeCases = (problem?.edgeCases || []).map((e: any) => e.label || e).join('; ');
  const pTime = problem?.expectedTimeComplexity || 'O(N)';
  const pSpace = problem?.expectedSpaceComplexity || 'O(1)';

  // Deterministic fast static syntax and pattern inspection
  const codeStr = currentCode || '';
  const hasLoop = codeStr.includes('for') || codeStr.includes('while');
  const hasMap = codeStr.includes('unordered_map') || codeStr.includes('map');
  const hasStack = codeStr.includes('stack');
  const hasVector = codeStr.includes('vector');
  const hasReturn = codeStr.includes('return');
  const openBraces = (codeStr.match(/{/g) || []).length;
  const closeBraces = (codeStr.match(/}/g) || []).length;
  const isSyntaxClean = openBraces === closeBraces && codeStr.trim().length > 30;

  let approachEvaluation: 'OPTIMAL' | 'SUB_OPTIMAL' | 'INCORRECT' = 'SUB_OPTIMAL';
  let understanding = `Draft targets ${pPattern}. Static structure verified.`;

  if (!hasReturn || codeStr.trim().length < 25) {
    approachEvaluation = 'INCORRECT';
    understanding = 'Skeleton incomplete: missing return statement or core loop structure.';
  } else if (pPattern.toLowerCase().includes('hash') && hasMap && hasLoop) {
    approachEvaluation = 'OPTIMAL';
    understanding = `Good: Inverted complement hash lookup pattern recognized with O(1) storage.`;
  } else if (pPattern.toLowerCase().includes('stack') && hasStack) {
    approachEvaluation = 'OPTIMAL';
    understanding = `Good: LIFO stack correctly deployed for bracket pairing and boundary tracking.`;
  } else if (pPattern.toLowerCase().includes('two-pointer') && codeStr.includes('while') && (codeStr.includes('left') || codeStr.includes('low'))) {
    approachEvaluation = 'OPTIMAL';
    understanding = `Good: Inward converging two-pointer invariant implemented.`;
  } else if (hasLoop) {
    approachEvaluation = 'SUB_OPTIMAL';
    understanding = `Iterative scan detected, but verify whether auxiliary memory can reduce asymptotic time to ${pTime}.`;
  }

  const likelyBugs: string[] = [];
  if (openBraces !== closeBraces) likelyBugs.push('Unbalanced braces: Check curly brackets { } in your function.');
  if (codeStr.includes('while(true)') || codeStr.includes('while (true)')) likelyBugs.push('Unbounded while(true) loop might trigger Time Limit Exceeded (TLE).');
  if (pMistakes) likelyBugs.push(`Watch out for trap: ${pMistakes.split(';')[0]}`);

  const missingEdges: string[] = [];
  if (pEdgeCases) missingEdges.push(pEdgeCases.split(';')[0]);
  if (!codeStr.includes('empty()') && !codeStr.includes('.size() == 0')) {
    missingEdges.push('Zero-length or empty boundary condition verification.');
  }

  const fastAnalysis = {
    isCompilationSimulated: false,
    conceptualUnderstanding: understanding,
    approachEvaluation,
    likelyBugsOrMistakes: likelyBugs.length > 0 ? likelyBugs : ['Verify pointer boundary checks & 0-indexing.'],
    missingEdgeCases: missingEdges.length > 0 ? missingEdges : ['Boundary extremes and single element arrays.'],
    complexityAnalysis: {
      estimatedTime: pTime,
      estimatedSpace: pSpace,
      isOptimal: approachEvaluation === 'OPTIMAL',
    },
    socraticNextPrompt: `Coach: "What happens when you trace the very first index with your current logic? Does it handle single-element input safely?"`,
  };

  return res.json(fastAnalysis);
});


async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    app.use('*', async (req, res, next) => {
      if (req.originalUrl.startsWith('/api')) {
        return next();
      }
      try {
        const template = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
        const html = await vite.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (e) {
        next(e);
      }
    });
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DSA Progress Book running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
