import { Problem } from '../../types';

export const LEVEL4_PROBLEMS: Problem[] = [
  // 1. LRU CACHE
  {
    id: 'lru-cache',
    problemId: 'lru-cache',
    number: '#401',
    title: 'LRU CACHE // DOUBLY LINKED LIST + HASH MAP',
    topic: 'Unit 3: Linked Lists',
    subtopic: 'Combined Hash Map and Doubly Linked List Invariant',
    unitId: 'unit-3-linked-lists',
    difficulty: 'HARD',
    curriculumLevel: 'Level 4 (Interview Practice)',
    pattern: 'Composite Data Structure (O(1) Map + O(1) Splicing)',
    category: 'Arrays & Hashing',
    prerequisites: ['Doubly Linked List (prev/next)', 'Hash Map Node Iterators'],
    learningObjective: 'Synthesize an O(1) get and put cache combining unordered_map lookup with doubly linked list order.',
    sourceReference: 'Unit 3 Syllabus // Doubly Linked List Architecture',
    leetcodeRef: 'LEETCODE #146 // SYLLABUS UNIT 3',
    tags: ['Unit 3', 'LRU Cache', 'Doubly Linked List', 'Hash Map'],
    statement:
      'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class: LRUCache(int capacity) Initialize the LRU cache with positive size capacity. int get(int key) Return the value of the key if the key exists, otherwise return -1. void put(int key, int value) Update the value of the key if that key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key. Both get and put must operate in O(1) time complexity.',
    constraints: ['1 ≤ capacity ≤ 3000', '0 ≤ key ≤ 10⁴', '0 ≤ value ≤ 10⁵', 'At most 2 * 10⁵ calls to get and put.'],
    testcases: [
      { input: 'put(1,1), put(2,2), get(1)', expectedOutput: '1', explanation: 'get(1) returns 1 and marks key 1 as most recently used.' },
      { input: 'put(3,3), get(2) (evicted)', expectedOutput: '-1', explanation: 'Capacity is 2. Inserting key 3 evicts key 2 (least recently used).' },
      { input: 'put(4,4), get(1), get(3), get(4)', expectedOutput: '[-1, 3, 4]', explanation: 'Key 1 was evicted by key 4.' },
    ],
    expectedThinking:
      'A hash map maps key -> Node*. A doubly linked list holds nodes in order of recency, bounded by dummy head and dummy tail nodes. When a node is accessed, splice it out and insert it right after dummy head. When capacity exceeds, evict the node right before dummy tail.',
    visualizationPrompt:
      'dummyHead <-> [MRU Node] <-> [Node] <-> [LRU Node] <-> dummyTail. Map points directly to node pointers for O(1) removal.',
    approaches: [
      { id: 'dll_map', name: '[ APPROACH A: HASH MAP + DOUBLY LINKED LIST ]', description: 'O(1) dictionary combined with O(1) pointer splicing.', timeComplexity: 'O(1) all ops', spaceComplexity: 'O(Capacity)', isOptimal: true, feedback: 'Industry standard LRU architecture.' },
    ],
    starterCppCode: `class LRUCache {
private:
    struct Node {
        int key, val;
        Node *prev, *next;
        Node(int k, int v) : key(k), val(v), prev(nullptr), next(nullptr) {}
    };
    
    int cap;
    unordered_map<int, Node*> map;
    Node *head, *tail;
    
    void removeNode(Node* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }
    
    void addNodeToHead(Node* node) {
        node->next = head->next;
        node->prev = head;
        head->next->prev = node;
        head->next = node;
    }
public:
    LRUCache(int capacity) : cap(capacity) {
        head = new Node(-1, -1);
        tail = new Node(-1, -1);
        head->next = tail;
        tail->prev = head;
    }
    
    int get(int key) {
        if (!map.count(key)) return -1;
        Node* node = map[key];
        removeNode(node);
        addNodeToHead(node);
        return node->val;
    }
    
    void put(int key, int value) {
        if (map.count(key)) {
            Node* node = map[key];
            node->val = value;
            removeNode(node);
            addNodeToHead(node);
        } else {
            if ((int)map.size() == cap) {
                Node* lru = tail->prev;
                map.erase(lru->key);
                removeNode(lru);
                delete lru;
            }
            Node* newNode = new Node(key, value);
            map[key] = newNode;
            addNodeToHead(newNode);
        }
    }
};`,
    hints: [
      { id: 1, title: 'HINT 01', subtitle: 'DUMMY SENTINELS', content: 'Use dummy head and tail nodes to avoid checking for nullptr when adding/removing nodes.', isUnlocked: true },
      { id: 2, title: 'HINT 02', subtitle: 'STORE KEY IN NODE', content: 'The Node must store its own key so when evicting from tail->prev, you can delete it from the hash map via map.erase(node->key).', isUnlocked: false },
    ],
    hint1: 'Use dummy head and tail sentinels.',
    hint2: 'Nodes must store their key so you can erase from map upon eviction.',
    hint3: 'get() moves accessed node to head.',
    commonMistakes: ['Forgetting to erase evicted key from map', 'Nullptr crash on edge nodes without dummy sentinels'],
    edgeCases: [{ label: 'Capacity = 1', checked: true }, { label: 'Updating value of existing key without increasing size', checked: false }],
    expectedTimeComplexity: 'O(1)',
    expectedSpaceComplexity: 'O(Capacity)',
    correctTimeComplexity: 'O(1)',
    correctSpaceComplexity: 'O(Capacity)',
    reflectionQuestions: ['Why is std::list splicing O(1)?', 'How does LFU Cache differ in complexity?'],
    relatedProblems: ['reverse-linked-list', 'linked-list-cycle'],
    prerequisiteProblems: ['reverse-linked-list'],
    nextRecommendedProblems: ['course-schedule-cycle', 'binary-tree-max-path-sum'],
    solutionExplanation: 'Doubly linked list maintains LRU ordering with O(1) splicing; hash table enables O(1) node access.',
    cPlusPlusSolution: `class LRUCache {
    struct Node { int k, v; Node *p, *n; Node(int k, int v): k(k), v(v), p(nullptr), n(nullptr){} };
    int cap; unordered_map<int, Node*> m; Node *h, *t;
    void rem(Node* u) { u->p->n = u->n; u->n->p = u->p; }
    void ins(Node* u) { u->n = h->n; u->p = h; h->n->p = u; h->n = u; }
public:
    LRUCache(int c): cap(c) { h = new Node(0,0); t = new Node(0,0); h->n = t; t->p = h; }
    int get(int k) { if (!m.count(k)) return -1; Node* u = m[k]; rem(u); ins(u); return u->v; }
    void put(int k, int v) {
        if (m.count(k)) { Node* u = m[k]; u->v = v; rem(u); ins(u); }
        else {
            if (m.size() == cap) { Node* lru = t->p; m.erase(lru->k); rem(lru); delete lru; }
            Node* u = new Node(k, v); m[k] = u; ins(u);
        }
    }
};`,
    simulationSteps: [
      { stepIndex: 0, pointerI: 0, activeVal: 1, status: 'put(1,1): inserted node 1 at head.', matchFound: false, hashTable: [{ key: 1, value: 1 }], log: 'Inserted 1' },
      { stepIndex: 1, pointerI: 1, activeVal: 2, status: 'put(2,2): inserted node 2 at head.', matchFound: false, hashTable: [{ key: 2, value: 2 }], log: 'Inserted 2' },
    ],
    status: 'NOT_STARTED',
  },

  // 2. COURSE SCHEDULE (CYCLE IN DAG)
  {
    id: 'course-schedule-cycle',
    problemId: 'course-schedule-cycle',
    number: '#402',
    title: 'COURSE SCHEDULE // TOPOLOGICAL SORT & KAHN',
    topic: 'Unit 5: Graphs',
    subtopic: 'Directed Acyclic Graph (DAG) Cycle Detection',
    unitId: 'unit-5-graphs',
    difficulty: 'MEDIUM',
    curriculumLevel: 'Level 4 (Interview Practice)',
    pattern: "Kahn's In-Degree Breadth-First Search",
    category: 'Trees & Graphs',
    prerequisites: ['Directed Graphs', 'In-Degree Calculation'],
    learningObjective: 'Detect circular deadlocks in dependency graphs using in-degree topological reduction.',
    sourceReference: 'Unit 5 Syllabus // Practical 9 (Topological Sorting)',
    leetcodeRef: 'LEETCODE #207 // SYLLABUS PRACTICAL 9',
    tags: ['Unit 5', 'Topological Sort', 'Graphs', 'BFS'],
    statement:
      'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return true if you can finish all courses. Otherwise, return false.',
    constraints: ['1 ≤ numCourses ≤ 2000', '0 ≤ prerequisites.length ≤ 5000', 'prerequisites[i].length == 2', 'All pairs are unique.'],
    testcases: [
      { input: 'numCourses = 2, prerequisites = [[1, 0]]', expectedOutput: 'true', explanation: 'Take course 0 then take course 1.' },
      { input: 'numCourses = 2, prerequisites = [[1, 0], [0, 1]]', expectedOutput: 'false', explanation: 'Mutual circular dependency.' },
      { input: 'numCourses = 3, prerequisites = [[0, 1], [0, 2], [1, 2]]', expectedOutput: 'true', explanation: 'Valid topological order 2 -> 1 -> 0.' },
    ],
    expectedThinking:
      'A cycle implies impossible completion. Calculate inDegree for all courses. Add courses with inDegree == 0 to a queue. Pop each course, decrement its neighbors inDegrees, and push any neighbor that reaches inDegree == 0. If processed count == numCourses, the graph is a DAG.',
    visualizationPrompt:
      'Track inDegree numbers on each node. Remove nodes with inDegree 0 and erase their outgoing arrows until graph is empty.',
    approaches: [
      { id: 'kahn', name: "[ APPROACH A: KAHN'S BFS IN-DEGREE ]", description: 'Queue courses with 0 prerequisites and reduce in-degrees.', timeComplexity: 'O(V + E)', spaceComplexity: 'O(V + E)', isOptimal: true, feedback: "Optimal Kahn's topological sort." },
    ],
    starterCppCode: `class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> inDegree(numCourses, 0);
        
        for (const auto& p : prerequisites) {
            adj[p[1]].push_back(p[0]);
            inDegree[p[0]]++;
        }
        
        queue<int> q;
        for (int i = 0; i < numCourses; ++i) {
            if (inDegree[i] == 0) q.push(i);
        }
        
        int completed = 0;
        while (!q.empty()) {
            int curr = q.front();
            q.pop();
            completed++;
            
            for (int nextCourse : adj[curr]) {
                inDegree[nextCourse]--;
                if (inDegree[nextCourse] == 0) {
                    q.push(nextCourse);
                }
            }
        }
        return completed == numCourses;
    }
};`,
    hints: [
      { id: 1, title: 'HINT 01', subtitle: 'DEPENDENCY DIRECTION', content: 'prerequisites[i] = [a, b] means b -> a. Edge is directed from b to a!', isUnlocked: true },
      { id: 2, title: 'HINT 02', subtitle: 'IN-DEGREE ZERO', content: 'Courses with in-degree 0 have no prerequisites remaining and can be taken immediately.', isUnlocked: false },
    ],
    hint1: 'Edge points from b to a: adj[b].push_back(a).',
    hint2: 'Push all nodes with inDegree == 0 into queue.',
    hint3: 'Return true if count of completed nodes equals numCourses.',
    commonMistakes: ['Reversing edge direction (thinking a -> b instead of b -> a)', 'Not checking for isolated nodes'],
    edgeCases: [{ label: 'Zero prerequisites (prerequisites = [])', checked: true }, { label: 'Self cycle [0, 0]', checked: false }],
    expectedTimeComplexity: 'O(V + E)',
    expectedSpaceComplexity: 'O(V + E)',
    correctTimeComplexity: 'O(V + E)',
    correctSpaceComplexity: 'O(V + E)',
    reflectionQuestions: ['How can this algorithm be modified to output the exact course schedule order?'],
    relatedProblems: ['graph-dfs-bfs-components', 'word-ladder-shortest-path'],
    prerequisiteProblems: ['graph-dfs-bfs-components'],
    nextRecommendedProblems: ['word-ladder-shortest-path', 'alien-dictionary'],
    solutionExplanation: "Kahn's BFS queue-based algorithm counts whether all nodes can be topologically ordered without encountering a cycle.",
    cPlusPlusSolution: `bool canFinish(int n, vector<vector<int>>& pre) {
    vector<vector<int>> adj(n); vector<int> in(n, 0);
    for (auto& p : pre) { adj[p[1]].push_back(p[0]); in[p[0]]++; }
    queue<int> q;
    for (int i = 0; i < n; ++i) if (in[i] == 0) q.push(i);
    int c = 0;
    while (!q.empty()) {
        int u = q.front(); q.pop(); c++;
        for (int v : adj[u]) if (--in[v] == 0) q.push(v);
    }
    return c == n;
}`,
    simulationSteps: [
      { stepIndex: 0, pointerI: 0, activeVal: 0, status: 'Course 0 has inDegree 0. Push to queue.', matchFound: false, hashTable: [], log: 'Queue: [0]' },
      { stepIndex: 1, pointerI: 1, activeVal: 1, status: 'Processed 0, inDegree of 1 becomes 0. All 2 courses finished.', matchFound: true, hashTable: [], log: 'Completed 2' },
    ],
    status: 'NOT_STARTED',
  },

  // 3. BINARY TREE MAXIMUM PATH SUM
  {
    id: 'binary-tree-max-path-sum',
    problemId: 'binary-tree-max-path-sum',
    number: '#403',
    title: 'BINARY TREE MAX PATH SUM // BOTTOM-UP DP',
    topic: 'Unit 4: Trees',
    subtopic: 'Tree Post-Order Dynamic Accumulation',
    unitId: 'unit-4-trees',
    difficulty: 'HARD',
    curriculumLevel: 'Level 4 (Interview Practice)',
    pattern: 'Tree Dynamic Post-Order Accumulation',
    category: 'Trees & Graphs',
    prerequisites: ['Binary Tree Post-Order Traversal', 'Tree Dynamic Programming'],
    learningObjective: 'Calculate optimal path gains through arbitrary tree nodes by maximizing local bridge sums vs upward return values.',
    sourceReference: 'Unit 4 Syllabus // Tree Traversal & Recursion Patterns',
    leetcodeRef: 'LEETCODE #124 // SYLLABUS UNIT 4',
    tags: ['Unit 4', 'Trees', 'Recursion', 'DP'],
    statement:
      'A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge connecting them. A node can only appear in the sequence at most once. The path sum of a path is the sum of the node’s values in the path. Given the root of a binary tree, return the maximum path sum of any non-empty path.',
    constraints: ['The number of nodes in the tree is in the range [1, 3 * 10⁴].', '-1000 ≤ Node.val ≤ 1000'],
    testcases: [
      { input: 'root = [1, 2, 3]', expectedOutput: '6', explanation: 'Path 2 -> 1 -> 3 has sum 2 + 1 + 3 = 6.' },
      { input: 'root = [-10, 9, 20, null, null, 15, 7]', expectedOutput: '42', explanation: 'Path 15 -> 20 -> 7 has sum 15 + 20 + 7 = 42.' },
      { input: 'root = [-3]', expectedOutput: '-3', explanation: 'Single negative node path sum is -3.' },
    ],
    expectedThinking:
      'At any node, the maximum arch path passing through it is: node->val + max(0, leftGain) + max(0, rightGain). But the value returned to the parent node can only use ONE branch: node->val + max(0, max(leftGain, rightGain)).',
    visualizationPrompt:
      'At node 20 with children 15 and 7: local bridge sum is 20 + 15 + 7 = 42. Upward branch contribution to parent -10 is 20 + max(15, 7) = 35.',
    approaches: [
      { id: 'post_order', name: '[ APPROACH A: POST-ORDER RECURSIVE GAIN ]', description: 'Compute single-branch gain while updating global bridge maximum.', timeComplexity: 'O(N)', spaceComplexity: 'O(H)', isOptimal: true, feedback: 'Optimal single pass post-order.' },
    ],
    starterCppCode: `class Solution {
private:
    int maxSum;
    int maxGain(TreeNode* node) {
        if (!node) return 0;
        int leftGain = max(0, maxGain(node->left));
        int rightGain = max(0, maxGain(node->right));
        
        int bridgeSum = node->val + leftGain + rightGain;
        maxSum = max(maxSum, bridgeSum);
        
        return node->val + max(leftGain, rightGain);
    }
public:
    int maxPathSum(TreeNode* root) {
        maxSum = INT_MIN;
        maxGain(root);
        return maxSum;
    }
};`,
    hints: [
      { id: 1, title: 'HINT 01', subtitle: 'IGNORE NEGATIVE PATHS', content: 'If a subtree sum is negative, do not include it! Use max(0, gain).', isUnlocked: true },
      { id: 2, title: 'HINT 02', subtitle: 'BRIDGE VS BRANCH', content: 'A node can combine both left and right children for its own local path, but can only send ONE child path upward to its parent.', isUnlocked: false },
    ],
    hint1: 'Prune negative contributions with max(0, subGain).',
    hint2: 'Local arch sum: node->val + leftGain + rightGain.',
    hint3: 'Return upward: node->val + max(leftGain, rightGain).',
    commonMistakes: ['Returning the arch sum (node + left + right) upward to the parent (paths cannot fork)', 'Initializing maxSum to 0 instead of INT_MIN (breaks on all-negative trees)'],
    edgeCases: [{ label: 'All negative node values [-3, -2, -1]', checked: true }, { label: 'Single node tree', checked: false }],
    expectedTimeComplexity: 'O(N)',
    expectedSpaceComplexity: 'O(H)',
    correctTimeComplexity: 'O(N)',
    correctSpaceComplexity: 'O(H)',
    reflectionQuestions: ['Why does this problem require a global variable or reference parameter?'],
    relatedProblems: ['bst-traversal-validation', 'word-ladder-shortest-path'],
    prerequisiteProblems: ['bst-traversal-validation'],
    nextRecommendedProblems: ['trapping-rain-water', 'word-ladder-shortest-path'],
    solutionExplanation: 'Post-order DFS computes one-branch upward contributions while continuously maximizing the global arch path.',
    cPlusPlusSolution: `int ans = INT_MIN;
int dfs(TreeNode* n) {
    if (!n) return 0;
    int l = max(0, dfs(n->left)), r = max(0, dfs(n->right));
    ans = max(ans, n->val + l + r);
    return n->val + max(l, r);
}
int maxPathSum(TreeNode* root) {
    ans = INT_MIN; dfs(root); return ans;
}`,
    simulationSteps: [
      { stepIndex: 0, pointerI: 0, activeVal: 20, status: 'Left child 15 gain=15. Right child 7 gain=7.', matchFound: false, hashTable: [], log: 'Bridge=42' },
      { stepIndex: 1, pointerI: 1, activeVal: 20, status: 'Max bridge sum updated to 42.', matchFound: true, hashTable: [], log: 'Global max 42' },
    ],
    status: 'NOT_STARTED',
  },

  // 4. MEDIAN OF TWO SORTED ARRAYS
  {
    id: 'median-two-sorted-arrays',
    problemId: 'median-two-sorted-arrays',
    number: '#404',
    title: 'MEDIAN OF TWO SORTED ARRAYS // DUAL BINARY SEARCH',
    topic: 'Unit 6: Sorting, Searching, and Hashing',
    subtopic: 'Logarithmic Divide & Conquer Partitioning',
    unitId: 'unit-6-sorting-searching-hashing',
    difficulty: 'HARD',
    curriculumLevel: 'Level 4 (Interview Practice)',
    pattern: 'Binary Search Partitioning of Smaller Array',
    category: 'Binary Search',
    prerequisites: ['Binary Search', 'Array Partition Invariant'],
    learningObjective: 'Partition two sorted arrays simultaneously in O(log(min(M, N))) time to pinpoint median split point.',
    sourceReference: 'Unit 6 Syllabus // Advanced Binary Search Algorithms',
    leetcodeRef: 'LEETCODE #4 // SYLLABUS UNIT 6',
    tags: ['Unit 6', 'Binary Search', 'Divide and Conquer'],
    statement:
      'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).',
    constraints: ['nums1.length == m', 'nums2.length == n', '0 ≤ m, n ≤ 1000', '1 ≤ m + n ≤ 2000', '-10⁶ ≤ nums1[i], nums2[i] ≤ 10⁶'],
    testcases: [
      { input: 'nums1 = [1, 3], nums2 = [2]', expectedOutput: '2.0', explanation: 'Merged array [1, 2, 3], median is 2.0.' },
      { input: 'nums1 = [1, 2], nums2 = [3, 4]', expectedOutput: '2.5', explanation: 'Merged array [1, 2, 3, 4], median is (2 + 3) / 2 = 2.5.' },
      { input: 'nums1 = [0, 0], nums2 = [0, 0]', expectedOutput: '0.0', explanation: 'All zeros, median 0.0.' },
    ],
    expectedThinking:
      'Perform binary search on the partition cut in the SMALLER array (nums1). For any cut i in nums1, cut j in nums2 is fixed: (m + n + 1) / 2 - i. Valid partition condition: nums1[i-1] <= nums2[j] and nums2[j-1] <= nums1[i].',
    visualizationPrompt:
      'Partition both arrays into Left Half and Right Half. Left Half has total elements (m + n + 1)/2. Adjust cut left or right.',
    approaches: [
      { id: 'partition_bs', name: '[ APPROACH A: LOG(MIN(M, N)) PARTITION BISECTION ]', description: 'Binary search partition point on smaller array.', timeComplexity: 'O(log(min(M, N)))', spaceComplexity: 'O(1)', isOptimal: true, feedback: 'Optimal logarithmic split.' },
    ],
    starterCppCode: `class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        if (nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);
        
        int m = nums1.size();
        int n = nums2.size();
        int low = 0, high = m;
        
        while (low <= high) {
            int partition1 = low + (high - low) / 2;
            int partition2 = (m + n + 1) / 2 - partition1;
            
            int maxLeft1 = (partition1 == 0) ? INT_MIN : nums1[partition1 - 1];
            int minRight1 = (partition1 == m) ? INT_MAX : nums1[partition1];
            
            int maxLeft2 = (partition2 == 0) ? INT_MIN : nums2[partition2 - 1];
            int minRight2 = (partition2 == n) ? INT_MAX : nums2[partition2];
            
            if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
                if ((m + n) % 2 == 0) {
                    return (max(maxLeft1, maxLeft2) + min(minRight1, minRight2)) / 2.0;
                } else {
                    return max(maxLeft1, maxLeft2);
                }
            } else if (maxLeft1 > minRight2) {
                high = partition1 - 1;
            } else {
                low = partition1 + 1;
            }
        }
        return 0.0;
    }
};`,
    hints: [
      { id: 1, title: 'HINT 01', subtitle: 'SMALLER ARRAY', content: 'Always ensure nums1 is the smaller array to guarantee O(log(min(M, N))) and positive partition indices.', isUnlocked: true },
      { id: 2, title: 'HINT 02', subtitle: 'BOUNDARY SENTINELS', content: 'Use INT_MIN and INT_MAX when partition is at index 0 or size m.', isUnlocked: false },
    ],
    hint1: 'Ensure nums1.size() <= nums2.size().',
    hint2: 'Partition formula: partition2 = (m + n + 1) / 2 - partition1.',
    hint3: 'Check cross inequalities: maxLeft1 <= minRight2 and maxLeft2 <= minRight1.',
    commonMistakes: ['Integer division by 2 instead of 2.0 (truncating decimal)', 'Not swapping arrays to ensure nums1 is shorter'],
    edgeCases: [{ label: 'One empty array nums1 = [], nums2 = [1]', checked: true }, { label: 'Even total length vs odd total length', checked: false }],
    expectedTimeComplexity: 'O(log(min(M, N)))',
    expectedSpaceComplexity: 'O(1)',
    correctTimeComplexity: 'O(log(min(M, N)))',
    correctSpaceComplexity: 'O(1)',
    reflectionQuestions: ['How can this algorithm be generalized to find the K-th smallest element of two sorted arrays?'],
    relatedProblems: ['binary-search-bounds', 'kth-largest-element'],
    prerequisiteProblems: ['binary-search-bounds'],
    nextRecommendedProblems: ['trapping-rain-water', 'word-ladder-shortest-path'],
    solutionExplanation: 'Binary searching the partition cut on the shorter array guarantees logarithmic search of the median.',
    cPlusPlusSolution: `double findMedianSortedArrays(vector<int>& n1, vector<int>& n2) {
    if (n1.size() > n2.size()) return findMedianSortedArrays(n2, n1);
    int m = n1.size(), n = n2.size(), l = 0, h = m;
    while (l <= h) {
        int p1 = (l + h) / 2, p2 = (m + n + 1) / 2 - p1;
        int l1 = (p1 == 0) ? INT_MIN : n1[p1 - 1], r1 = (p1 == m) ? INT_MAX : n1[p1];
        int l2 = (p2 == 0) ? INT_MIN : n2[p2 - 1], r2 = (p2 == n) ? INT_MAX : n2[p2];
        if (l1 <= r2 && l2 <= r1) {
            if ((m + n) % 2 == 0) return (max(l1, l2) + min(r1, r2)) / 2.0;
            return max(l1, l2);
        } else if (l1 > r2) h = p1 - 1;
        else l = p1 + 1;
    }
    return 0.0;
}`,
    simulationSteps: [
      { stepIndex: 0, pointerI: 0, activeVal: 1, status: 'Partition smaller array nums1.', matchFound: false, hashTable: [], log: 'Cut tested' },
      { stepIndex: 1, pointerI: 1, activeVal: 2, status: 'Found valid cross inequalities. Median is 2.0.', matchFound: true, hashTable: [], log: 'Median 2.0' },
    ],
    status: 'NOT_STARTED',
  },
];
