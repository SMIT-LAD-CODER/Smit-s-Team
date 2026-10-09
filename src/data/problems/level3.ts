import { Problem } from '../../types';

export const LEVEL3_PROBLEMS: Problem[] = [
  // 1. CIRCULAR QUEUE (RING BUFFER)
  {
    id: 'circular-queue-buffer',
    problemId: 'circular-queue-buffer',
    number: '#301',
    title: 'CIRCULAR QUEUE // RING BUFFER',
    topic: 'Unit 2: Stacks and Queues',
    subtopic: 'Modulo Arithmetic & Circular Buffer Design',
    unitId: 'unit-2-stacks-queues',
    difficulty: 'MEDIUM',
    curriculumLevel: 'Level 3 (Application)',
    pattern: 'Modulo Index Wrap-Around (Ring Buffer)',
    category: 'Arrays & Hashing',
    prerequisites: ['Modulo Operator (%)', 'Fixed Size Array Allocation'],
    learningObjective: 'Design a high-performance ring buffer reusing deallocated queue slots without shifting memory.',
    sourceReference: 'Unit 2 Syllabus // Practical 5 (Circular Queue Implementation)',
    leetcodeRef: 'LEETCODE #622 // SYLLABUS PRACTICAL 5',
    tags: ['Unit 2', 'Ring Buffer', 'Queue'],
    statement:
      'Design your implementation of the circular queue. The circular queue is a linear data structure in which the operations are performed based on FIFO principle, and the last position is connected back to the first position to make a circle. It is also called "Ring Buffer". Support enQueue, deQueue, Front, Rear, isEmpty, and isFull.',
    constraints: ['1 ≤ k ≤ 1000', '0 ≤ value ≤ 1000', 'At most 3000 calls will be made.'],
    testcases: [
      { input: 'enQueue 1, 2, 3, then 4', expectedOutput: 'Overflow rejected (false)', explanation: 'Capacity k=3 reached; 4 is rejected.' },
      { input: 'Rear() == 3 and isFull() == true', expectedOutput: 'Rear=3, Full=true', explanation: 'Buffer is full, last element is 3.' },
      { input: 'deQueue() then enQueue(4), Rear() == 4', expectedOutput: 'Rear=4', explanation: 'Slot 0 is wrapped around and reused for 4.' },
    ],
    expectedThinking:
      'Use a fixed-size vector of size k. Maintain head pointer, count of elements, and capacity. Rear index is calculated dynamically: (head + count - 1) % capacity.',
    visualizationPrompt:
      'Draw a circular clock of k slots. HEAD points to oldest element. TAIL wraps around with (head + count - 1) % k.',
    approaches: [
      { id: 'count_modulo', name: '[ APPROACH A: HEAD + COUNT MODULO ]', description: 'Maintain head index and total count.', timeComplexity: 'O(1) all ops', spaceComplexity: 'O(K)', isOptimal: true, feedback: 'Eliminates dummy slots.' },
    ],
    starterCppCode: `class MyCircularQueue {
private:
    vector<int> data;
    int head;
    int count;
    int capacity;
public:
    MyCircularQueue(int k) {
        data.resize(k);
        head = 0;
        count = 0;
        capacity = k;
    }
    
    bool enQueue(int value) {
        if (isFull()) return false;
        int tail = (head + count) % capacity;
        data[tail] = value;
        count++;
        return true;
    }
    
    bool deQueue() {
        if (isEmpty()) return false;
        head = (head + 1) % capacity;
        count--;
        return true;
    }
    
    int Front() {
        if (isEmpty()) return -1;
        return data[head];
    }
    
    int Rear() {
        if (isEmpty()) return -1;
        int tail = (head + count - 1) % capacity;
        return data[tail];
    }
    
    bool isEmpty() {
        return count == 0;
    }
    
    bool isFull() {
        return count == capacity;
    }
};`,
    hints: [
      { id: 1, title: 'HINT 01', subtitle: 'REAR FORMULA', content: 'The rear element is at index (head + count - 1) % capacity.', isUnlocked: true },
      { id: 2, title: 'HINT 02', subtitle: 'WRAP AROUND', content: 'Advancing head is simply head = (head + 1) % capacity.', isUnlocked: false },
    ],
    hint1: 'Tracking count simplifies isEmpty and isFull to count == 0 and count == k.',
    hint2: 'Modulo operator % wraps indices back to 0.',
    hint3: 'Rear index is (head + count - 1) % capacity.',
    commonMistakes: ['Off-by-one error calculating Rear pointer', 'Not checking isEmpty() on Front/Rear calls'],
    edgeCases: [{ label: 'Capacity k = 1', checked: true }, { label: 'Repeated wrap-around cycles', checked: false }],
    expectedTimeComplexity: 'O(1)',
    expectedSpaceComplexity: 'O(K)',
    correctTimeComplexity: 'O(1)',
    correctSpaceComplexity: 'O(K)',
    reflectionQuestions: ['How is this structure used in operating system audio buffers and network packet rings?'],
    relatedProblems: ['queue-using-stacks', 'daily-temperatures'],
    prerequisiteProblems: ['queue-using-stacks'],
    nextRecommendedProblems: ['daily-temperatures', 'bst-traversal-validation'],
    solutionExplanation: 'Fixed-size array with head and count variables utilizing modulo index wrapping.',
    cPlusPlusSolution: `class MyCircularQueue {
    vector<int> q; int head = 0, count = 0, cap;
public:
    MyCircularQueue(int k) : q(k), cap(k) {}
    bool enQueue(int v) { if (isFull()) return false; q[(head + count++) % cap] = v; return true; }
    bool deQueue() { if (isEmpty()) return false; head = (head + 1) % cap; count--; return true; }
    int Front() { return isEmpty() ? -1 : q[head]; }
    int Rear() { return isEmpty() ? -1 : q[(head + count - 1) % cap]; }
    bool isEmpty() { return count == 0; }
    bool isFull() { return count == cap; }
};`,
    simulationSteps: [
      { stepIndex: 0, pointerI: 0, activeVal: 1, status: 'enQueue 1: head=0, count=1.', matchFound: false, hashTable: [], log: 'q[0]=1' },
      { stepIndex: 1, pointerI: 1, activeVal: 2, status: 'enQueue 2: head=0, count=2.', matchFound: false, hashTable: [], log: 'q[1]=2' },
    ],
    status: 'NOT_STARTED',
  },

  // 2. VALIDATE BINARY SEARCH TREE
  {
    id: 'bst-traversal-validation',
    problemId: 'bst-traversal-validation',
    number: '#302',
    title: 'VALIDATE BST // IN-ORDER INVARIANT',
    topic: 'Unit 4: Trees',
    subtopic: 'Binary Search Tree Upper/Lower Invariant Propagation',
    unitId: 'unit-4-trees',
    difficulty: 'MEDIUM',
    curriculumLevel: 'Level 3 (Application)',
    pattern: 'Recursive Bounding Invariant [minVal, maxVal]',
    category: 'Trees & Graphs',
    prerequisites: ['Binary Tree Node Structure', 'Recursion & In-Order Traversal'],
    learningObjective: 'Enforce global BST monotonicity by propagating dynamic range bounds down call stacks.',
    sourceReference: 'Unit 4 Syllabus // Practical 8 (Binary Search Tree Construction & Traversal)',
    leetcodeRef: 'LEETCODE #98 // SYLLABUS PRACTICAL 8',
    tags: ['Unit 4', 'Practical 8', 'Trees', 'BST'],
    statement:
      'Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST is defined as: The left subtree of a node contains only nodes with keys strictly less than the node’s key; the right subtree contains only nodes with keys strictly greater; and both subtrees must also be binary search trees.',
    constraints: ['The number of nodes in the tree is in the range [1, 10⁴].', '-2³¹ ≤ Node.val ≤ 2³¹ - 1'],
    testcases: [
      { input: 'root = [2, 1, 3]', expectedOutput: 'true', explanation: 'Left child 1 < 2 < right child 3.' },
      { input: 'root = [5, 1, 4, null, null, 3, 6]', expectedOutput: 'false', explanation: 'Right subtree root is 4, but 4 < 5 violates BST condition.' },
      { input: 'root = [2, 2, 2]', expectedOutput: 'false', explanation: 'Strict inequality required; duplicates are invalid.' },
    ],
    expectedThinking:
      'A node is not just compared with its parent! It must be greater than all ancestors on its left and less than all ancestors on its right. Maintain a valid range (low, high) initialized to (-INF, +INF).',
    visualizationPrompt:
      'At root (val 5), range is (-INF, +INF). For left child, range becomes (-INF, 5). For right child, range becomes (5, +INF). Use long long to prevent integer overflow.',
    approaches: [
      { id: 'range_dfs', name: '[ APPROACH A: BOUNDED RECURSION ]', description: 'Pass minimum and maximum permitted values down DFS recursion.', timeComplexity: 'O(N)', spaceComplexity: 'O(H)', isOptimal: true, feedback: 'Optimal bounding traversal.' },
    ],
    starterCppCode: `class Solution {
private:
    bool validate(TreeNode* node, long long minVal, long long maxVal) {
        if (!node) return true;
        if (node->val <= minVal || node->val >= maxVal) return false;
        return validate(node->left, minVal, node->val) &&
               validate(node->right, node->val, maxVal);
    }
public:
    bool isValidBST(TreeNode* root) {
        return validate(root, -1e18, 1e18);
    }
};`,
    hints: [
      { id: 1, title: 'HINT 01', subtitle: 'GLOBAL INVARIANT', content: 'Just checking left < curr < right is NOT enough! The right subtree cannot contain values smaller than ancestors above curr.', isUnlocked: true },
      { id: 2, title: 'HINT 02', subtitle: 'LONG LONG RANGE', content: 'Because node values can be INT_MIN or INT_MAX, use long long bounds.', isUnlocked: false },
    ],
    hint1: 'Pass (low, high) bounds down DFS.',
    hint2: 'Left child range is (low, curr->val).',
    hint3: 'Right child range is (curr->val, high).',
    commonMistakes: ['Only checking immediate children instead of global subtree bounds', 'Integer overflow using INT_MIN - 1 with 32-bit int'],
    edgeCases: [{ label: 'Tree with INT_MAX node value', checked: true }, { label: 'Equal values [2, 2, 2]', checked: false }],
    expectedTimeComplexity: 'O(N)',
    expectedSpaceComplexity: 'O(H)',
    correctTimeComplexity: 'O(N)',
    correctSpaceComplexity: 'O(H)',
    reflectionQuestions: ['How does in-order traversal of a BST guarantee sorted output?'],
    relatedProblems: ['binary-tree-max-path-sum', 'graph-dfs-bfs-components'],
    prerequisiteProblems: ['reverse-linked-list'],
    nextRecommendedProblems: ['binary-tree-max-path-sum', 'graph-dfs-bfs-components'],
    solutionExplanation: 'Propagating (minVal, maxVal) bounds ensures all descendant nodes satisfy the global BST property.',
    cPlusPlusSolution: `bool validate(TreeNode* node, long long low, long long high) {
    if (!node) return true;
    if (node->val <= low || node->val >= high) return false;
    return validate(node->left, low, node->val) && validate(node->right, node->val, high);
}
bool isValidBST(TreeNode* root) {
    return validate(root, LLONG_MIN, LLONG_MAX);
}`,
    simulationSteps: [
      { stepIndex: 0, pointerI: 2, activeVal: 2, status: 'Root=2, range=(-INF, +INF). Valid.', matchFound: false, hashTable: [], log: 'Checked root' },
      { stepIndex: 1, pointerI: 1, activeVal: 1, status: 'Left=1, range=(-INF, 2). Valid.', matchFound: true, hashTable: [], log: 'Left valid' },
    ],
    status: 'NOT_STARTED',
  },

  // 3. GRAPH CONNECTED COMPONENTS (DFS/BFS)
  {
    id: 'graph-dfs-bfs-components',
    problemId: 'graph-dfs-bfs-components',
    number: '#303',
    title: 'GRAPH COMPONENTS // BFS & DFS FLOOD FILL',
    topic: 'Unit 5: Graphs',
    subtopic: 'Adjacency List Construction & Traversal',
    unitId: 'unit-5-graphs',
    difficulty: 'MEDIUM',
    curriculumLevel: 'Level 3 (Application)',
    pattern: 'Breadth/Depth Search Component Flood Fill',
    category: 'Trees & Graphs',
    prerequisites: ['Adjacency List vector<vector<int>>', 'Visited Boolean Array'],
    learningObjective: 'Partition an undirected graph into isolated connected subgraphs using traversal coloring.',
    sourceReference: 'Unit 5 Syllabus // Practical 9 (Graph Representation & BFS/DFS Traversal)',
    leetcodeRef: 'LEETCODE #323 // SYLLABUS PRACTICAL 9',
    tags: ['Unit 5', 'Practical 9', 'Graphs', 'BFS/DFS'],
    statement:
      'You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an edge between ai and bi in the graph. Return the number of connected components in the graph.',
    constraints: ['1 ≤ n ≤ 2000', '0 ≤ edges.length ≤ 5000', 'edges[i].length == 2', '0 ≤ ai <= bi < n'],
    testcases: [
      { input: 'n = 5, edges = [[0,1],[1,2],[3,4]]', expectedOutput: '2', explanation: 'Components are {0,1,2} and {3,4}.' },
      { input: 'n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]', expectedOutput: '1', explanation: 'All nodes connected.' },
      { input: 'n = 4, edges = []', expectedOutput: '4', explanation: '4 isolated singleton components.' },
    ],
    expectedThinking:
      'Build an undirected adjacency list. Keep a vector<bool> visited(n, false). Loop i from 0 to n-1. If node i is not visited, increment componentCount and run DFS/BFS to mark all reachable nodes.',
    visualizationPrompt:
      'Color unvisited nodes grey. When DFS starts from an unvisited node, paint the entire connected cluster green. Count the number of distinct green clusters.',
    approaches: [
      { id: 'dfs', name: '[ APPROACH A: ADJACENCY LIST + DFS ]', description: 'Iterate unvisited nodes and run DFS flood fill.', timeComplexity: 'O(V + E)', spaceComplexity: 'O(V + E)', isOptimal: true, feedback: 'Optimal standard graph traversal.' },
    ],
    starterCppCode: `class Solution {
private:
    void dfs(int u, const vector<vector<int>>& adj, vector<bool>& vis) {
        vis[u] = true;
        for (int v : adj[u]) {
            if (!vis[v]) dfs(v, adj, vis);
        }
    }
public:
    int countComponents(int n, vector<vector<int>>& edges) {
        vector<vector<int>> adj(n);
        for (const auto& e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }
        
        vector<bool> vis(n, false);
        int components = 0;
        
        for (int i = 0; i < n; ++i) {
            if (!vis[i]) {
                components++;
                dfs(i, adj, vis);
            }
        }
        return components;
    }
};`,
    hints: [
      { id: 1, title: 'HINT 01', subtitle: 'UNDIRECTED EDGES', content: 'Make sure to add both adj[u].push_back(v) and adj[v].push_back(u).', isUnlocked: true },
      { id: 2, title: 'HINT 02', subtitle: 'ISOLATED NODES', content: 'Isolated nodes with degree 0 still count as valid individual components.', isUnlocked: false },
    ],
    hint1: 'Build adjacency list for both directions.',
    hint2: 'Loop through all nodes 0 to n-1.',
    hint3: 'Run DFS for every unvisited node and count.',
    commonMistakes: ['Forgetting that edges are undirected', 'Skipping isolated nodes with no edges'],
    edgeCases: [{ label: 'Zero edges (edges = [])', checked: true }, { label: 'Fully connected clique', checked: false }],
    expectedTimeComplexity: 'O(V + E)',
    expectedSpaceComplexity: 'O(V + E)',
    correctTimeComplexity: 'O(V + E)',
    correctSpaceComplexity: 'O(V + E)',
    reflectionQuestions: ['How can this alternatively be solved using Disjoint Set Union (Union-Find)?'],
    relatedProblems: ['course-schedule-cycle', 'word-ladder-shortest-path'],
    prerequisiteProblems: ['bst-traversal-validation'],
    nextRecommendedProblems: ['course-schedule-cycle', 'word-ladder-shortest-path'],
    solutionExplanation: 'Construct adjacency list and count DFS traversals required to visit all vertices.',
    cPlusPlusSolution: `void dfs(int u, const vector<vector<int>>& adj, vector<bool>& vis) {
    vis[u] = true;
    for (int v : adj[u]) if (!vis[v]) dfs(v, adj, vis);
}
int countComponents(int n, vector<vector<int>>& edges) {
    vector<vector<int>> adj(n);
    for (auto& e : edges) { adj[e[0]].push_back(e[1]); adj[e[1]].push_back(e[0]); }
    vector<bool> vis(n, false);
    int ans = 0;
    for (int i = 0; i < n; ++i) {
        if (!vis[i]) { ans++; dfs(i, adj, vis); }
    }
    return ans;
}`,
    simulationSteps: [
      { stepIndex: 0, pointerI: 0, activeVal: 0, status: 'Node 0 unvisited. Component 1 started. Visits {0, 1, 2}.', matchFound: false, hashTable: [], log: 'Visited cluster 1' },
      { stepIndex: 1, pointerI: 3, activeVal: 3, status: 'Node 3 unvisited. Component 2 started. Visits {3, 4}.', matchFound: true, hashTable: [], log: 'Visited cluster 2' },
    ],
    status: 'NOT_STARTED',
  },

  // 4. MERGE INTERVALS
  {
    id: 'merge-intervals',
    problemId: 'merge-intervals',
    number: '#304',
    title: 'MERGE INTERVALS // GREEDY CONSOLIDATION',
    topic: 'Unit 6: Sorting, Searching, and Hashing',
    subtopic: 'Interval Partitioning & Sweep Line Invariant',
    unitId: 'unit-6-sorting-searching-hashing',
    difficulty: 'MEDIUM',
    curriculumLevel: 'Level 3 (Application)',
    pattern: 'Sorting + Greedy Interval Overlap Consolidation',
    category: 'Arrays & Hashing',
    prerequisites: ['Custom std::sort comparator', 'Interval bounds [start, end]'],
    learningObjective: 'Sort intervals by start time to consolidate overlapping ranges in single linear sweep.',
    sourceReference: 'Unit 6 Syllabus // Practical 10 (Internal Sorting Applications)',
    leetcodeRef: 'LEETCODE #56 // SYLLABUS PRACTICAL 10',
    tags: ['Unit 6', 'Intervals', 'Sorting', 'Greedy'],
    statement:
      'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.',
    constraints: ['1 ≤ intervals.length ≤ 10⁴', 'intervals[i].length == 2', '0 ≤ starti ≤ endi ≤ 10⁴'],
    testcases: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', expectedOutput: '[[1, 6], [8, 10], [15, 18]]', explanation: '[1,3] and [2,6] overlap into [1,6].' },
      { input: 'intervals = [[1,4],[4,5]]', expectedOutput: '[[1, 5]]', explanation: 'Consecutive touching endpoints merge.' },
      { input: 'intervals = [[1,4]]', expectedOutput: '[[1, 4]]', explanation: 'Single interval is unchanged.' },
    ],
    expectedThinking:
      'Sort intervals primarily by start time. Keep the current merged interval. For each next interval, if next.start <= curr.end, extend curr.end = max(curr.end, next.end). Otherwise, push curr to result and start a new merged interval.',
    visualizationPrompt:
      'Draw intervals along a number line. Sorted by start time, each interval either overlaps the previous block or begins a fresh disconnected block.',
    approaches: [
      { id: 'sort_merge', name: '[ APPROACH A: SORT + LINEAR MERGE ]', description: 'Sort by start time and greedy linear sweep.', timeComplexity: 'O(N log N)', spaceComplexity: 'O(N)', isOptimal: true, feedback: 'Optimal greedy strategy.' },
    ],
    starterCppCode: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        if (intervals.empty()) return {};
        sort(intervals.begin(), intervals.end());
        
        vector<vector<int>> merged;
        merged.push_back(intervals[0]);
        
        for (size_t i = 1; i < intervals.size(); ++i) {
            if (intervals[i][0] <= merged.back()[1]) {
                merged.back()[1] = max(merged.back()[1], intervals[i][1]);
            } else {
                merged.push_back(intervals[i]);
            }
        }
        return merged;
    }
};`,
    hints: [
      { id: 1, title: 'HINT 01', subtitle: 'SORT FIRST', content: 'Sorting intervals by start time guarantees that any overlapping intervals will be adjacent.', isUnlocked: true },
      { id: 2, title: 'HINT 02', subtitle: 'MAX EXTENSION', content: 'When intervals overlap, update end = max(curr.end, next.end). Do not simply overwrite with next.end!', isUnlocked: false },
    ],
    hint1: 'Sort intervals by start time first.',
    hint2: 'Check if intervals[i][0] <= merged.back()[1].',
    hint3: 'Update end with max(merged.back()[1], intervals[i][1]).',
    commonMistakes: ['Forgetting to take max() of the endpoints ([1, 4] and [2, 3] should stay [1, 4])', 'Not sorting intervals first'],
    edgeCases: [{ label: 'Interval completely inside another [1, 5] and [2, 3]', checked: true }, { label: 'Single interval [[1, 4]]', checked: false }],
    expectedTimeComplexity: 'O(N log N)',
    expectedSpaceComplexity: 'O(N)',
    correctTimeComplexity: 'O(N log N)',
    correctSpaceComplexity: 'O(N)',
    reflectionQuestions: ['Why does sorting eliminate the need for nested interval comparison?'],
    relatedProblems: ['container-water-pointers', 'kth-largest-element'],
    prerequisiteProblems: ['container-water-pointers'],
    nextRecommendedProblems: ['kth-largest-element', 'lru-cache'],
    solutionExplanation: 'Sort by start time, then iteratively merge overlapping neighbors.',
    cPlusPlusSolution: `vector<vector<int>> merge(vector<vector<int>>& intervals) {
    if (intervals.empty()) return {};
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> res;
    res.push_back(intervals[0]);
    for (size_t i = 1; i < intervals.size(); ++i) {
        if (intervals[i][0] <= res.back()[1]) {
            res.back()[1] = max(res.back()[1], intervals[i][1]);
        } else {
            res.push_back(intervals[i]);
        }
    }
    return res;
}`,
    simulationSteps: [
      { stepIndex: 0, pointerI: 0, activeVal: 1, status: 'Add [1, 3] to result.', matchFound: false, hashTable: [], log: 'Init' },
      { stepIndex: 1, pointerI: 1, activeVal: 2, status: '2 <= 3. Merge [1, 3] and [2, 6] -> [1, 6].', matchFound: true, hashTable: [], log: 'Merged [1, 6]' },
    ],
    status: 'NOT_STARTED',
  },

  // 5. DAILY TEMPERATURES (MONOTONIC STACK)
  {
    id: 'daily-temperatures',
    problemId: 'daily-temperatures',
    number: '#305',
    title: 'DAILY TEMPERATURES // MONOTONIC STACK',
    topic: 'Unit 2: Stacks and Queues',
    subtopic: 'Monotonic Decreasing Stack for Next Greater Element',
    unitId: 'unit-2-stacks-queues',
    difficulty: 'MEDIUM',
    curriculumLevel: 'Level 3 (Application)',
    pattern: 'Monotonic Decreasing Stack (Index Preservation)',
    category: 'Arrays & Hashing',
    prerequisites: ['Stack Properties', 'Next Greater Element Concept'],
    learningObjective: 'Resolve next-greater element queries in aggregate O(N) time using monotonic index stacks.',
    sourceReference: 'Unit 2 Syllabus // Advanced Stack Patterns',
    leetcodeRef: 'LEETCODE #739 // SYLLABUS UNIT 2',
    tags: ['Unit 2', 'Monotonic Stack', 'Array'],
    statement:
      'Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.',
    constraints: ['1 ≤ temperatures.length ≤ 10⁵', '30 ≤ temperatures[i] ≤ 100'],
    testcases: [
      { input: 'temperatures = [73,74,75,71,69,72,76,73]', expectedOutput: '[1, 1, 4, 2, 1, 1, 0, 0]', explanation: 'Day 0 waits 1 day to see 74. Day 2 waits 4 days to see 76.' },
      { input: 'temperatures = [30,40,50,60]', expectedOutput: '[1, 1, 1, 0]', explanation: 'Strictly increasing temperatures.' },
      { input: 'temperatures = [30,60,90]', expectedOutput: '[1, 1, 0]', explanation: 'Last day has no warmer day.' },
    ],
    expectedThinking:
      'Store indices of days whose warmer companion has not yet been found on a stack. When current temperature > temperature at stack top index, pop that index and calculate distance: i - prevIndex.',
    visualizationPrompt:
      'Stack maintains indices of monotonically decreasing temperatures. When a hot day arrives, it pops all colder days beneath it, recording the wait time.',
    approaches: [
      { id: 'mono_stack', name: '[ APPROACH A: MONOTONIC INDEX STACK ]', description: 'Maintain stack of unresolved day indices.', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', isOptimal: true, feedback: 'Every element pushed and popped at most once.' },
    ],
    starterCppCode: `class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        int n = temperatures.size();
        vector<int> ans(n, 0);
        stack<int> st; // stores indices
        
        for (int i = 0; i < n; ++i) {
            while (!st.empty() && temperatures[i] > temperatures[st.top()]) {
                int prev = st.top();
                st.pop();
                ans[prev] = i - prev;
            }
            st.push(i);
        }
        return ans;
    }
};`,
    hints: [
      { id: 1, title: 'HINT 01', subtitle: 'STORE INDICES', content: 'Push the index i to the stack, not the temperature value, so you can calculate distance: i - prev.', isUnlocked: true },
      { id: 2, title: 'HINT 02', subtitle: 'MONOTONIC PROPERTY', content: 'Temperatures on stack will naturally remain monotonically decreasing.', isUnlocked: false },
    ],
    hint1: 'Store indices on stack so you can compute i - prev.',
    hint2: 'While currTemp > temp[st.top()], pop and resolve answer[top].',
    hint3: 'Initialize answer vector with 0s.',
    commonMistakes: ['Storing temperature values instead of indices', 'Using nested O(N²) loop triggering Time Limit Exceeded'],
    edgeCases: [{ label: 'Monotonically decreasing temperatures [90, 80, 70]', checked: true }, { label: 'Single day temperature', checked: false }],
    expectedTimeComplexity: 'O(N)',
    expectedSpaceComplexity: 'O(N)',
    correctTimeComplexity: 'O(N)',
    correctSpaceComplexity: 'O(N)',
    reflectionQuestions: ['Why is the total time O(N) even though there is a while loop inside a for loop?'],
    relatedProblems: ['valid-parentheses', 'trapping-rain-water'],
    prerequisiteProblems: ['valid-parentheses'],
    nextRecommendedProblems: ['trapping-rain-water', 'lru-cache'],
    solutionExplanation: 'Monotonic decreasing stack resolves next greater elements in amortized O(N) time.',
    cPlusPlusSolution: `vector<int> dailyTemperatures(vector<int>& temperatures) {
    int n = temperatures.size();
    vector<int> ans(n, 0);
    stack<int> st;
    for (int i = 0; i < n; ++i) {
        while (!st.empty() && temperatures[i] > temperatures[st.top()]) {
            int prev = st.top(); st.pop();
            ans[prev] = i - prev;
        }
        st.push(i);
    }
    return ans;
}`,
    simulationSteps: [
      { stepIndex: 0, pointerI: 0, activeVal: 73, status: 'Push day 0 (73) to stack.', matchFound: false, hashTable: [], log: 'Stack: [0]' },
      { stepIndex: 1, pointerI: 1, activeVal: 74, status: 'Day 1 (74) > day 0 (73). Pop day 0, wait=1. Push 1.', matchFound: true, hashTable: [], log: 'Resolved day 0' },
    ],
    status: 'NOT_STARTED',
  },

  // 6. KTH LARGEST ELEMENT IN AN ARRAY
  {
    id: 'kth-largest-element',
    problemId: 'kth-largest-element',
    number: '#306',
    title: 'KTH LARGEST ELEMENT // MIN-HEAP TOURNAMENT',
    topic: 'Unit 6: Sorting, Searching, and Hashing',
    subtopic: 'Priority Queue Heap Invariant vs Quickselect',
    unitId: 'unit-6-sorting-searching-hashing',
    difficulty: 'MEDIUM',
    curriculumLevel: 'Level 3 (Application)',
    pattern: 'Min-Heap Size K Pruning',
    category: 'Binary Search',
    prerequisites: ['Binary Heap / priority_queue', 'Comparator'],
    learningObjective: 'Maintain top-K elements in an active Min-Heap of size K in O(N log K) time.',
    sourceReference: 'Unit 6 Syllabus // Practical 10 (Heap Sort & Priority Queues)',
    leetcodeRef: 'LEETCODE #215 // SYLLABUS PRACTICAL 10',
    tags: ['Unit 6', 'Heap', 'Priority Queue'],
    statement:
      'Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element. Can you solve it without sorting the entire array?',
    constraints: ['1 ≤ k ≤ nums.length ≤ 10⁵', '-10⁴ ≤ nums[i] ≤ 10⁴'],
    testcases: [
      { input: 'nums = [3,2,1,5,6,4], k = 2', expectedOutput: '5', explanation: '2nd largest element is 5.' },
      { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', expectedOutput: '4', explanation: '4th largest is 4.' },
      { input: 'nums = [1], k = 1', expectedOutput: '1', explanation: 'Single element is 1st largest.' },
    ],
    expectedThinking:
      'Maintain a min-heap of size k: priority_queue<int, vector<int>, greater<int>>. Push elements. Whenever size > k, pop the minimum. The top of the heap will be the kth largest element.',
    visualizationPrompt:
      'A min-heap acts as a filter of size K. The smallest element in the top-K sits at the top. Any newcomer larger than top replaces it.',
    approaches: [
      { id: 'min_heap', name: '[ APPROACH A: MIN-HEAP SIZE K ]', description: 'Store top k elements in priority_queue with greater<int>.', timeComplexity: 'O(N log K)', spaceComplexity: 'O(K)', isOptimal: true, feedback: 'Optimal bounded memory heap.' },
    ],
    starterCppCode: `class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int, vector<int>, greater<int>> minHeap;
        for (int x : nums) {
            minHeap.push(x);
            if ((int)minHeap.size() > k) {
                minHeap.pop();
            }
        }
        return minHeap.top();
    }
};`,
    hints: [
      { id: 1, title: 'HINT 01', subtitle: 'MIN-HEAP NOT MAX-HEAP', content: 'Using a min-heap allows you to evict the smallest of the top k elements in O(log K).', isUnlocked: true },
      { id: 2, title: 'HINT 02', subtitle: 'TOP AT THE END', content: 'When all elements have been processed, the root of the min-heap is precisely the kth largest!', isUnlocked: false },
    ],
    hint1: 'Use priority_queue<int, vector<int>, greater<int>>.',
    hint2: 'Keep size <= k by popping when size > k.',
    hint3: 'Heap top is the kth largest.',
    commonMistakes: ['Using max-heap and storing all N elements (wasting O(N) memory)', 'Sorting entire array with O(N log N)'],
    edgeCases: [{ label: 'k = nums.length (returns smallest)', checked: true }, { label: 'All elements equal [5, 5, 5]', checked: false }],
    expectedTimeComplexity: 'O(N log K)',
    expectedSpaceComplexity: 'O(K)',
    correctTimeComplexity: 'O(N log K)',
    correctSpaceComplexity: 'O(K)',
    reflectionQuestions: ['How does Quickselect achieve average O(N) time? When does Quickselect degrade to O(N²)?'],
    relatedProblems: ['merge-intervals', 'lru-cache'],
    prerequisiteProblems: ['merge-intervals'],
    nextRecommendedProblems: ['lru-cache', 'course-schedule-cycle'],
    solutionExplanation: 'A min-heap of size K keeps the K largest elements seen so far; its root is the Kth largest.',
    cPlusPlusSolution: `int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> pq;
    for (int x : nums) {
        pq.push(x);
        if ((int)pq.size() > k) pq.pop();
    }
    return pq.top();
}`,
    simulationSteps: [
      { stepIndex: 0, pointerI: 0, activeVal: 3, status: 'Push 3. Heap size=1.', matchFound: false, hashTable: [], log: 'Heap: [3]' },
      { stepIndex: 1, pointerI: 3, activeVal: 5, status: 'Heap contains top 2: [5, 6]. Top is 5.', matchFound: true, hashTable: [], log: 'Kth=5' },
    ],
    status: 'NOT_STARTED',
  },
];
