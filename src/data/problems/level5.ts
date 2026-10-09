import { Problem } from '../../types';

export const LEVEL5_PROBLEMS: Problem[] = [
  // 1. TRAPPING RAIN WATER
  {
    id: 'trapping-rain-water',
    problemId: 'trapping-rain-water',
    number: '#501',
    title: 'TRAPPING RAIN WATER // DUAL MONOTONIC PEAKS',
    topic: 'Unit 1: Introduction, Arrays, and Complexity Analysis',
    subtopic: 'Bidirectional Prefix Max Water Invariant',
    unitId: 'unit-1-arrays',
    difficulty: 'HARD',
    curriculumLevel: 'Level 5 (Advanced)',
    pattern: 'Opposite-End Two Pointers with Rolling Prefix/Suffix Extrema',
    category: 'Two Pointers',
    prerequisites: ['Two Pointers', 'Prefix/Suffix Extrema Tracking'],
    learningObjective: 'Calculate trapped volumetric fluid by maintaining rolling boundary maximums inward.',
    sourceReference: 'Unit 1 Syllabus // Advanced Two Pointer & Array Invariants',
    leetcodeRef: 'LEETCODE #42 // SYLLABUS UNIT 1',
    tags: ['Unit 1', 'Two Pointers', 'Dynamic Programming', 'Hard'],
    statement:
      'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    constraints: ['n == height.length', '1 ≤ n ≤ 2 * 10⁴', '0 ≤ height[i] ≤ 10⁵'],
    testcases: [
      { input: 'height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]', expectedOutput: '6', explanation: 'Total 6 units of water trapped.' },
      { input: 'height = [4, 2, 0, 3, 2, 5]', expectedOutput: '9', explanation: '9 units of water trapped.' },
      { input: 'height = [1, 2, 3, 4, 5]', expectedOutput: '0', explanation: 'Monotonically increasing heights trap 0 water.' },
    ],
    expectedThinking:
      'Water trapped above bar i = max(0, min(maxLeft, maxRight) - height[i]). With two pointers left and right, maintain leftMax and rightMax. Whichever side is smaller dictates the water level safely!',
    visualizationPrompt:
      'Left and right pointers converge towards the highest overall peak. Trapped water is poured into pockets bounded by leftMax and rightMax.',
    approaches: [
      { id: 'two_pointer', name: '[ APPROACH A: O(1) SPACE TWO POINTERS ]', description: 'Maintain leftMax and rightMax while converging inward.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', isOptimal: true, feedback: 'Optimal linear time and constant auxiliary memory.' },
    ],
    starterCppCode: `class Solution {
public:
    int trap(vector<int>& height) {
        int left = 0, right = (int)height.size() - 1;
        int leftMax = 0, rightMax = 0;
        int water = 0;
        
        while (left < right) {
            if (height[left] <= height[right]) {
                if (height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    water += leftMax - height[left];
                }
                left++;
            } else {
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    water += rightMax - height[right];
                }
                right--;
            }
        }
        return water;
    }
};`,
    hints: [
      { id: 1, title: 'HINT 01', subtitle: 'LIMITING WALL', content: 'Water depth is strictly governed by the shorter of leftMax and rightMax.', isUnlocked: true },
      { id: 2, title: 'HINT 02', subtitle: 'CONVERGE TOWARD PEAK', content: 'If height[left] <= height[right], water at left is independent of any peaks further right because rightMax is at least height[right] >= height[left].', isUnlocked: false },
    ],
    hint1: 'Water trapped at cell = min(leftMax, rightMax) - height[i].',
    hint2: 'Advance left if height[left] <= height[right], else right.',
    hint3: 'Update leftMax or rightMax respectively.',
    commonMistakes: ['Allocating O(N) prefix and suffix arrays when O(1) space is achievable', 'Forgetting to check height[i] >= leftMax'],
    edgeCases: [{ label: 'Flat ground [0, 0, 0]', checked: true }, { label: 'Single peak [1, 5, 1]', checked: false }],
    expectedTimeComplexity: 'O(N)',
    expectedSpaceComplexity: 'O(1)',
    correctTimeComplexity: 'O(N)',
    correctSpaceComplexity: 'O(1)',
    reflectionQuestions: ['How can this be modeled using a monotonic stack? What is the physical meaning of the stack horizontal slices?'],
    relatedProblems: ['container-water-pointers', 'daily-temperatures'],
    prerequisiteProblems: ['container-water-pointers', 'daily-temperatures'],
    nextRecommendedProblems: ['word-ladder-shortest-path', 'alien-dictionary'],
    solutionExplanation: 'Converging two pointers from boundaries inward guarantees correct water capacity bounded by lower rolling peak.',
    cPlusPlusSolution: `int trap(vector<int>& h) {
    int l = 0, r = (int)h.size() - 1, lMax = 0, rMax = 0, ans = 0;
    while (l < r) {
        if (h[l] <= h[r]) {
            if (h[l] >= lMax) lMax = h[l];
            else ans += lMax - h[l];
            l++;
        } else {
            if (h[r] >= rMax) rMax = h[r];
            else ans += rMax - h[r];
            r--;
        }
    }
    return ans;
}`,
    simulationSteps: [
      { stepIndex: 0, pointerI: 0, pointerJ: 11, activeVal: 0, status: 'left=0(0), right=11(1). lMax=0. Advance left.', matchFound: false, hashTable: [], log: 'Init' },
      { stepIndex: 1, pointerI: 2, pointerJ: 11, activeVal: 0, status: 'h[2]=0 < lMax=1. Traps 1 - 0 = 1 unit water.', matchFound: true, hashTable: [], log: 'Water +1' },
    ],
    status: 'NOT_STARTED',
  },

  // 2. WORD LADDER (SHORTEST PATH IN STATE SPACE)
  {
    id: 'word-ladder-shortest-path',
    problemId: 'word-ladder-shortest-path',
    number: '#502',
    title: 'WORD LADDER // BFS STATE SPACE SHORTEST PATH',
    topic: 'Unit 5: Graphs',
    subtopic: 'Implicit Unweighted Graph BFS Traversal',
    unitId: 'unit-5-graphs',
    difficulty: 'HARD',
    curriculumLevel: 'Level 5 (Advanced)',
    pattern: 'Breadth-First Search Level-by-Level State Space Exploration',
    category: 'Trees & Graphs',
    prerequisites: ['BFS Shortest Path Invariant', 'Hash Set string mutations'],
    learningObjective: 'Explore implicit unweighted state spaces level-by-level to guarantee minimum transition sequence.',
    sourceReference: 'Unit 5 Syllabus // Advanced Graph Search',
    leetcodeRef: 'LEETCODE #127 // SYLLABUS UNIT 5',
    tags: ['Unit 5', 'BFS', 'Shortest Path', 'Graphs'],
    statement:
      'A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that: Every adjacent pair of words differs by a single letter. Every si for 1 <= i <= k is in wordList. Return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.',
    constraints: ['1 ≤ beginWord.length ≤ 10', 'endWord.length == beginWord.length', '1 ≤ wordList.length ≤ 5000', 'All words consist of lowercase English letters and are unique.'],
    testcases: [
      { input: 'hit -> cog with [hot,dot,dog,lot,log,cog]', expectedOutput: '5', explanation: 'hit -> hot -> dot -> dog -> cog (5 words).' },
      { input: 'hit -> cog (cog missing)', expectedOutput: '0', explanation: 'endWord cog is not in wordList so impossible.' },
      { input: 'a -> c with [a, b, c]', expectedOutput: '2', explanation: 'a -> c takes 2 words.' },
    ],
    expectedThinking:
      'Each word is a node in an unweighted graph. Edges exist between words differing by 1 character. BFS guarantees the shortest path in an unweighted graph. For each word in queue, mutate each of its characters from a to z. If mutant is in wordSet, push to queue and erase from wordSet.',
    visualizationPrompt:
      'Queue holds words at current transformation step distance. Expanding 1 char mutation radiates like ripples in water.',
    approaches: [
      { id: 'bfs', name: '[ APPROACH A: BFS QUEUE + SET LOOKUP ]', description: 'Level-order queue exploring character substitutions a-z.', timeComplexity: 'O(M² * N)', spaceComplexity: 'O(M * N)', isOptimal: true, feedback: 'Optimal unweighted shortest path.' },
    ],
    starterCppCode: `class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> dict(wordList.begin(), wordList.end());
        if (!dict.count(endWord)) return 0;
        
        queue<pair<string, int>> q;
        q.push({beginWord, 1});
        
        while (!q.empty()) {
            auto [word, len] = q.front();
            q.pop();
            
            if (word == endWord) return len;
            
            for (size_t i = 0; i < word.size(); ++i) {
                char orig = word[i];
                for (char c = 'a'; c <= 'z'; ++c) {
                    if (c == orig) continue;
                    word[i] = c;
                    if (dict.count(word)) {
                        dict.erase(word);
                        q.push({word, len + 1});
                    }
                }
                word[i] = orig;
            }
        }
        return 0;
    }
};`,
    hints: [
      { id: 1, title: 'HINT 01', subtitle: 'ERASE ON VISIT', content: 'Erase words from the hash set as soon as you enqueue them to prevent cycles and redundant visits.', isUnlocked: true },
      { id: 2, title: 'HINT 02', subtitle: 'MUTATE 26 CHARS', content: 'Mutating the current word 26 times per letter is faster (26 * L) than checking all N words in the dictionary (N * L) when N is large.', isUnlocked: false },
    ],
    hint1: 'BFS guarantees shortest path in unweighted graph.',
    hint2: 'Erase visited words from wordSet.',
    hint3: 'Return 0 if queue empties without finding endWord.',
    commonMistakes: ['Comparing every word pair in wordList (O(N² * L) time limit exceeded)', 'Not checking if endWord is in wordList initially'],
    edgeCases: [{ label: 'endWord not in wordList (returns 0)', checked: true }, { label: 'Direct 1-step transition beginWord -> endWord', checked: false }],
    expectedTimeComplexity: 'O(M² * N)',
    expectedSpaceComplexity: 'O(M * N)',
    correctTimeComplexity: 'O(M² * N)',
    correctSpaceComplexity: 'O(M * N)',
    reflectionQuestions: ['How can bidirectional BFS cut the search space in half?'],
    relatedProblems: ['graph-dfs-bfs-components', 'alien-dictionary'],
    prerequisiteProblems: ['graph-dfs-bfs-components'],
    nextRecommendedProblems: ['alien-dictionary'],
    solutionExplanation: 'Queue-based BFS level-order exploration of 26-char string mutations finds minimum path length.',
    cPlusPlusSolution: `int ladderLength(string b, string e, vector<string>& wl) {
    unordered_set<string> dict(wl.begin(), wl.end());
    if (!dict.count(e)) return 0;
    queue<pair<string, int>> q; q.push({b, 1});
    while (!q.empty()) {
        auto [w, d] = q.front(); q.pop();
        if (w == e) return d;
        for (int i = 0; i < (int)w.size(); ++i) {
            char orig = w[i];
            for (char c = 'a'; c <= 'z'; ++c) {
                w[i] = c;
                if (dict.count(w)) { dict.erase(w); q.push({w, d + 1}); }
            }
            w[i] = orig;
        }
    }
    return 0;
}`,
    simulationSteps: [
      { stepIndex: 0, pointerI: 0, activeVal: 1, status: 'hit -> hot (distance 2).', matchFound: false, hashTable: [], log: 'Enqueued hot' },
      { stepIndex: 1, pointerI: 1, activeVal: 5, status: 'dog -> cog (distance 5 == endWord). Done!', matchFound: true, hashTable: [], log: 'Path found' },
    ],
    status: 'NOT_STARTED',
  },

  // 3. ALIEN DICTIONARY (LEXICOGRAPHICAL TOPOLOGICAL SORT)
  {
    id: 'alien-dictionary',
    problemId: 'alien-dictionary',
    number: '#503',
    title: 'ALIEN DICTIONARY // LEXICOGRAPHIC TOPOLOGICAL SORT',
    topic: 'Unit 5: Graphs',
    subtopic: 'Prefix Invariant & DAG Ordering',
    unitId: 'unit-5-graphs',
    difficulty: 'HARD',
    curriculumLevel: 'Level 5 (Advanced)',
    pattern: 'Multi-Constraint Topological Sort with Prefix Invalidation',
    category: 'Trees & Graphs',
    prerequisites: ['Course Schedule / Topological Sort', 'Lexicographical Rules'],
    learningObjective: 'Reconstruct unknown alphabet ordering by extracting directed edge constraints from adjacent sorted words.',
    sourceReference: 'Unit 5 Syllabus // Advanced Graph Algorithms',
    leetcodeRef: 'LEETCODE #269 // SYLLABUS UNIT 5',
    tags: ['Unit 5', 'Topological Sort', 'Graphs', 'Hard'],
    statement:
      'There is a new alien language that uses the English alphabet. However, the order of the letters is unknown to you. You are given a list of strings words from the alien language’s dictionary, where the strings are claimed to be sorted lexicographically by the rules of this new language. Return a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language’s rules. If no valid ordering exists, return "".',
    constraints: ['1 ≤ words.length ≤ 100', '1 ≤ words[i].length ≤ 100', 'words[i] consists of lowercase English letters.'],
    testcases: [
      { input: 'words = ["wrt","wrf","er","ett","rftt"]', expectedOutput: 'wertf', explanation: 'Valid topological ordering of characters.' },
      { input: 'words = ["z","x"]', expectedOutput: 'zx', explanation: 'z precedes x.' },
      { input: 'words = ["z","x","z"] (cycle)', expectedOutput: '""', explanation: 'Circular conflict z < x and x < z is invalid.' },
    ],
    expectedThinking:
      'Compare each pair of adjacent words words[i] and words[i+1]. Find the first differing character: word1[j] -> word2[j] creates a directed edge. Crucial edge case: if word2 is a prefix of word1 (e.g. "abc", "ab"), the dictionary is invalid so return ""! Then run Kahn’s topological sort.',
    visualizationPrompt:
      'Compare "wrt" and "wrf": first difference is t vs f, so t -> f. Compare "wrf" and "er": w -> e. Build graph and sort.',
    approaches: [
      { id: 'topo', name: "[ APPROACH A: PAIRWISE DIFF + KAHN'S ALGORITHM ]", description: 'Extract edges from adjacent words and apply BFS topological order.', timeComplexity: 'O(Total Characters)', spaceComplexity: 'O(Unique Characters)', isOptimal: true, feedback: 'Optimal constraint solver.' },
    ],
    starterCppCode: `class Solution {
public:
    string alienOrder(vector<string>& words) {
        unordered_map<char, unordered_set<char>> adj;
        unordered_map<char, int> inDegree;
        
        for (const string& w : words) {
            for (char c : w) inDegree[c] = 0;
        }
        
        for (size_t i = 0; i + 1 < words.size(); ++i) {
            const string& w1 = words[i];
            const string& w2 = words[i + 1];
            
            if (w1.size() > w2.size() && w1.substr(0, w2.size()) == w2) {
                return ""; // Invalid prefix rule
            }
            
            for (size_t j = 0; j < min(w1.size(), w2.size()); ++j) {
                if (w1[j] != w2[j]) {
                    if (!adj[w1[j]].count(w2[j])) {
                        adj[w1[j]].insert(w2[j]);
                        inDegree[w2[j]]++;
                    }
                    break;
                }
            }
        }
        
        queue<char> q;
        for (const auto& [c, deg] : inDegree) {
            if (deg == 0) q.push(c);
        }
        
        string result = "";
        while (!q.empty()) {
            char u = q.front();
            q.pop();
            result += u;
            
            for (char v : adj[u]) {
                inDegree[v]--;
                if (inDegree[v] == 0) {
                    q.push(v);
                }
            }
        }
        
        return result.size() == inDegree.size() ? result : "";
    }
};`,
    hints: [
      { id: 1, title: 'HINT 01', subtitle: 'PREFIX INVALIDATION', content: 'If words[i] starts with words[i+1] and words[i].length > words[i+1].length (e.g., "apple", "app"), the list is illegal. Return "" immediately!', isUnlocked: true },
      { id: 2, title: 'HINT 02', subtitle: 'FIRST DIFFERENCE ONLY', content: 'Only the FIRST character difference between adjacent words determines order. Subsequent characters carry no order information.', isUnlocked: false },
    ],
    hint1: 'Only compare adjacent words words[i] and words[i+1].',
    hint2: 'Break after first differing character.',
    hint3: 'Detect invalid prefix when longer word precedes shorter prefix.',
    commonMistakes: ['Comparing non-adjacent words or multiple characters in the same word pair', 'Failing the prefix check (e.g., ["abc", "ab"])'],
    edgeCases: [{ label: 'Prefix trap ["abc", "ab"] returns ""', checked: true }, { label: 'Cycle between characters', checked: false }],
    expectedTimeComplexity: 'O(Total Characters)',
    expectedSpaceComplexity: 'O(Unique Characters)',
    correctTimeComplexity: 'O(Total Characters)',
    correctSpaceComplexity: 'O(Unique Characters)',
    reflectionQuestions: ['Why does lexicographical ordering only provide information from the first differing character?'],
    relatedProblems: ['course-schedule-cycle', 'word-ladder-shortest-path'],
    prerequisiteProblems: ['course-schedule-cycle'],
    nextRecommendedProblems: [],
    solutionExplanation: 'Extract dependency edges from adjacent words and reconstruct the alien alphabet using Kahn topological sort.',
    cPlusPlusSolution: `string alienOrder(vector<string>& words) {
    unordered_map<char, unordered_set<char>> adj;
    unordered_map<char, int> in;
    for (auto& w : words) for (char c : w) in[c] = 0;
    for (size_t i = 0; i + 1 < words.size(); ++i) {
        string &w1 = words[i], &w2 = words[i+1];
        if (w1.size() > w2.size() && w1.rfind(w2, 0) == 0) return "";
        for (size_t j = 0; j < min(w1.size(), w2.size()); ++j) {
            if (w1[j] != w2[j]) {
                if (!adj[w1[j]].count(w2[j])) { adj[w1[j]].insert(w2[j]); in[w2[j]]++; }
                break;
            }
        }
    }
    queue<char> q; for (auto& [c, d] : in) if (d == 0) q.push(c);
    string res = "";
    while (!q.empty()) {
        char u = q.front(); q.pop(); res += u;
        for (char v : adj[u]) if (--in[v] == 0) q.push(v);
    }
    return res.size() == in.size() ? res : "";
}`,
    simulationSteps: [
      { stepIndex: 0, pointerI: 0, activeVal: 0, status: 'Extracted edges: w->e, r->t, t->f. In-degree calculated.', matchFound: false, hashTable: [], log: 'Graph built' },
      { stepIndex: 1, pointerI: 1, activeVal: 0, status: 'Kahn sort order: wertf.', matchFound: true, hashTable: [], log: 'Order: wertf' },
    ],
    status: 'NOT_STARTED',
  },
];
