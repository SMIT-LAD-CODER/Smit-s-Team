export type ProblemDifficulty = 'PRIMITIVE' | 'MEDIUM' | 'HARD';

export type CurriculumLevel =
  | 'Level 1 (Foundation)'
  | 'Level 2 (Pattern Building)'
  | 'Level 3 (Application)'
  | 'Level 4 (Interview Practice)'
  | 'Level 5 (Advanced)';

export type ProblemStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'SOLVED' | 'REVIEW_NEEDED';

export type ProblemCategory =
  | 'Arrays & Hashing'
  | 'Two Pointers'
  | 'Sliding Window'
  | 'Binary Search'
  | 'Trees & Graphs'
  | 'Dynamic Programming';

export type SyllabusUnitId =
  | 'unit-1-arrays'
  | 'unit-2-stacks-queues'
  | 'unit-3-linked-lists'
  | 'unit-4-trees'
  | 'unit-5-graphs'
  | 'unit-6-sorting-searching-hashing';

export interface SyllabusUnit {
  id: SyllabusUnitId;
  unitNumber: number;
  title: string;
  scope: string[];
  practicals: Array<{
    practicalNumber: number;
    title: string;
    description: string;
  }>;
  bloomWeights: {
    remember: number;
    understand: number;
    apply: number;
    analyze: number;
    evaluate: number;
    create: number;
  };
  studentLearningOutcomes: string[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  explanation?: string;
}

export interface ApproachOption {
  id: string;
  name: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  isOptimal: boolean;
  feedback: string;
}

export interface Hint {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  isUnlocked: boolean;
}

export interface SimStep {
  stepIndex: number;
  pointerI: number;
  pointerJ?: number;
  activeVal: number;
  complement?: number;
  status: string;
  matchFound: boolean;
  hashTable: Array<{ key: number | string; value: number | string; hit?: boolean }>;
  log: string;
}

export interface Problem {
  // 1. Identifiers & Taxonomy
  id: string;
  problemId: string;
  number: string;
  title: string;
  topic: string;
  subtopic: string;
  unitId: SyllabusUnitId;
  difficulty: ProblemDifficulty;
  curriculumLevel: CurriculumLevel;
  pattern: string;
  category: ProblemCategory;

  // 2. Syllabus Grounding & Alignment
  prerequisites: string[];
  learningObjective: string;
  sourceReference: string; // e.g., "Unit 2 Syllabus // Practical 5 (Circular Queue)"
  leetcodeRef?: string;
  tags: string[];

  // 3. Problem Statement & Constraints
  statement: string;
  constraints: string[];
  testcases: TestCase[];
  examples?: TestCase[];

  // 4. Think-First & Visual Workflow Prompts
  expectedThinking: string;
  visualizationPrompt: string;
  approaches: ApproachOption[];

  // 5. Code & Socratic Hints
  starterCppCode: string;
  hints: Hint[];
  hint1: string;
  hint2: string;
  hint3: string;
  commonMistakes: string[];
  edgeCases: Array<{ label: string; checked: boolean }>;
  expectedTimeComplexity: string;
  expectedSpaceComplexity: string;
  correctTimeComplexity: string;
  correctSpaceComplexity: string;

  // 6. Reflection & Recommendations
  reflectionQuestions: string[];
  relatedProblems: string[];
  prerequisiteProblems: string[];
  nextRecommendedProblems: string[];

  // 7. Verified Solutions & Simulation
  solutionExplanation: string;
  cPlusPlusSolution: string;
  simulationSteps: SimStep[];
  status: ProblemStatus;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'mentor';
  text: string;
  timestamp: string;
}

export interface ReflectionEntry {
  id?: string;
  problemId: string;
  problemTitle: string;
  date: string;
  corePattern: string;
  trapEncountered: string;
  timeSpentMinutes: number;
  nextRevisionDate: string;
  confidence: 'LOW' | 'MEDIUM' | 'HIGH';
  learningObjectiveAchieved?: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  college: string;
  score: string;
  efficiency: string;
  badge?: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface UserSettings {
  theme: ThemeMode;
  dailyGoal: number;
  difficultyPreference: 'PRIMITIVE' | 'MEDIUM' | 'HARD' | 'ALL';
  preferredTopics: string[];
  preferredLanguage: 'cpp' | 'python' | 'java';
  editorFontSize: number;
  editorTheme: 'carbon' | 'paper' | 'neon';
  editorTabSize: 2 | 4;
  editorWordWrap: boolean;
  reducedMotion: boolean;
  animationIntensity: 'subtle' | 'normal' | 'minimal';
  highContrast: boolean;
  accountVisibility: 'public' | 'private';
  emailReminders: boolean;
}

export interface UserProgressItem {
  status: ProblemStatus;
  savedCode?: string;
  selectedApproachId?: string;
  attempts?: number;
  failedAttempts?: number;
  hintsUsedCount?: number;
  lastAttemptAt?: string;
  completedAt?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  college: string;
  avatar: string;
  bio?: string;
  createdAt: string;
  streakCount: number;
  lastActiveDate: string;
  favoriteTopics: string[];
  settings: UserSettings;
  progress: Record<string, UserProgressItem>;
  reflections: ReflectionEntry[];
}

export interface ExplainableRecommendation {
  problemId: string;
  problemTitle: string;
  curriculumLevel: CurriculumLevel;
  unitTitle: string;
  reason: string;
  primaryConcept: string;
  prerequisiteMet: boolean;
}

export interface WeeklyCoachReport {
  weekNumber: number;
  dateRange: string;
  thisWeek: {
    problemsAttempted: number;
    problemsSolved: number;
    topicsPracticed: string[];
    strongestTopic: string;
    weakestTopic: string;
    mostCommonMistake: string;
    hintsUsedCount: number;
    revisionNeededList: string[];
  };
  nextWeek: {
    recommendedTopic: string;
    recommendedProblems: Array<{ id: string; title: string }>;
    revisionProblems: Array<{ id: string; title: string }>;
    strategicReason: string;
  };
}

export interface CodeAnalysisResult {
  isCompilationSimulated?: boolean;
  conceptualUnderstanding: string;
  approachEvaluation: 'OPTIMAL' | 'SUB_OPTIMAL' | 'INCORRECT';
  likelyBugsOrMistakes: string[];
  missingEdgeCases: string[];
  complexityAnalysis: {
    estimatedTime: string;
    estimatedSpace: string;
    isOptimal: boolean;
  };
  socraticNextPrompt: string;
}

export interface JudgeResultItem {
  caseIndex: number;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  runtimeMs?: number;
  error?: string;
}

export interface JudgeResponse {
  status: 'ACCEPTED' | 'WRONG_ANSWER' | 'COMPILATION_ERROR' | 'RUNTIME_ERROR' | 'TIME_LIMIT_EXCEEDED';
  passed: boolean;
  totalPassed: number;
  totalCases: number;
  runtime: string;
  memory: string;
  compileError?: string;
  results: JudgeResultItem[];
  detail: string;
}
