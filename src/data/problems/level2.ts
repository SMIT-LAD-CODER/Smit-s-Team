import { Problem } from '../../types';

export const LEVEL2_PROBLEMS: Problem[] = [
  // 1. TWO SUM
  {
    id: 'two-sum',
    problemId: 'two-sum',
    number: '#201',
    title: 'TWO SUM // COMPLEMENT REGISTRY',
    topic: 'Unit 1: Introduction, Arrays, and Complexity Analysis',
    subtopic: 'Array Lookup & Hash Table Time-Space Invariants',
    unitId: 'unit-1-arrays',
    difficulty: 'MEDIUM',
    curriculumLevel: 'Level 2 (Pattern Building)',
    pattern: 'Hash Table Inverted Complement Lookup',
    category: 'Arrays & Hashing',
    prerequisites: ['1D Array Sequential Scanning', 'Key-Value Mapping Concept', 'Big-O Asymptotic Analysis'],
    learningObjective:
      'Master trading spatial memory O(N) for instantaneous O(1) lookup speed instead of redundant O(N²) nested iteration.',
    sourceReference: 'Unit 1 Syllabus // Non-Primitive Memory Mappings (LeetCode #1 Equivalent)',
    leetcodeRef: 'LEETCODE #1 // SYLLABUS UNIT 1',
    tags: ['Unit 1', 'Hash Table', 'O(1) Lookup'],
    statement:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. Return indices in any order.',
    constraints: ['2 ≤ nums.length ≤ 10⁴', '-10⁹ ≤ nums[i] ≤ 10⁹', '-10⁹ ≤ target ≤ 10⁹', 'Exactly one valid answer exists.'],
    testcases: [
      { input: 'nums = [2, 7, 11, 15], target = 9', expectedOutput: '[0, 1]', explanation: 'nums[0] + nums[1] == 2 + 7 == 9.' },
      { input: 'nums = [3, 2, 4], target = 6', expectedOutput: '[1, 2]', explanation: 'nums[1] + nums[2] == 2 + 4 == 6.' },
      { input: 'nums = [3, 3], target = 6', expectedOutput: '[0, 1]', explanation: 'Distinct indices 0 and 1.' },
    ],
    expectedThinking:
      'At current index i with value nums[i], what exact companion number is needed? Equation: complement = target - nums[i]. Check if complement is in hash table.',
    visualizationPrompt:
      'Draw the array horizontally. Beneath it, maintain a map of {Value: Index}. Trace index 0: val 2, wants 7 (not found, store {2: 0}). Trace index 1: val 7, wants 2 (found at index 0!).',
    approaches: [
      { id: 'brute', name: '[ APPROACH A: NESTED SCAN ]', description: 'Check every pair (i, j).', timeComplexity: 'O(N²)', spaceComplexity: 'O(1)', isOptimal: false, feedback: 'Nested loop is too slow for large inputs.' },
      { id: 'hash', name: '[ APPROACH B: COMPLEMENT HASH MAP ]', description: 'Single pass with unordered_map.', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', isOptimal: true, feedback: 'Optimal single pass.' },
    ],
    starterCppCode: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < (int)nums.size(); ++i) {
            int comp = target - nums[i];
            if (seen.count(comp)) {
                return {seen[comp], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
    hints: [
      { id: 1, title: 'HINT 01', subtitle: 'COMPLEMENT EQUATION', content: 'For each number x, you are searching for target - x.', isUnlocked: true },
      { id: 2, title: 'HINT 02', subtitle: 'HASH MAP RECORD', content: 'Store seen numbers in unordered_map<int, int> mapping value to index.', isUnlocked: false },
      { id: 3, title: 'HINT 03', subtitle: 'NO DUPLICATE USE', content: 'Check before inserting so you never reuse the same element twice.', isUnlocked: false },
    ],
    hint1: 'complement = target - nums[i].',
    hint2: 'unordered_map gives average O(1) lookup.',
    hint3: 'Store nums[i] -> i as you iterate.',
    commonMistakes: ['Reusing same element index twice', 'Sorting array and losing original indices'],
    edgeCases: [{ label: 'Duplicate values summing to target [3, 3]', checked: true }, { label: 'Negative integers [-1, -2, -3] target -5', checked: false }],
    expectedTimeComplexity: 'O(N)',
    expectedSpaceComplexity: 'O(N)',
    correctTimeComplexity: 'O(N)',
    correctSpaceComplexity: 'O(N)',
    reflectionQuestions: ['Why is unordered_map average O(1) but worst case O(N)?', 'How to solve in O(1) space if array is sorted?'],
    relatedProblems: ['container-water-pointers', 'valid-palindrome'],
    prerequisiteProblems: ['linear-search-sentinel'],
    nextRecommendedProblems: ['container-water-pointers', 'valid-parentheses'],
    solutionExplanation: 'Single-pass hash table storing visited elements and looking up the complement.',
    cPlusPlusSolution: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < (int)nums.size(); ++i) {
        int comp = target - nums[i];
        if (seen.count(comp)) return {seen[comp], i};
        seen[nums[i]] = i;
    }
    return {};
}`,
    simulationSteps: [
      { stepIndex: 0, pointerI: 0, activeVal: 2, complement: 7, status: 'nums[0]=2, complement=7. Map: empty. Insert {2: 0}.', matchFound: false, hashTable: [{ key: 2, value: 0 }], log: 'Inserted 2' },
      { stepIndex: 1, pointerI: 1, activeVal: 7, complement: 2, status: 'nums[1]=7, complement=2. Found in map at index 0!', matchFound: true, hashTable: [{ key: 2, value: 0, hit: true }], log: 'Match [0, 1]' },
    ],
    status: 'SOLVED',
  },

  // 2. VALID PARENTHESES
  {
    id: 'valid-parentheses',
    problemId: 'valid-parentheses',
    number: '#202',
    title: 'VALID PARENTHESES // LIFO STACK',
    topic: 'Unit 2: Stacks and Queues',
    subtopic: 'LIFO Bracket Matching & Call Frame Synchronization',
    unitId: 'unit-2-stacks-queues',
    difficulty: 'PRIMITIVE',
    curriculumLevel: 'Level 2 (Pattern Building)',
    pattern: 'LIFO Stack Bracket Pairing',
    category: 'Arrays & Hashing',
    prerequisites: ['Stack Push/Pop/Top Primatives', 'Character Inspection'],
    learningObjective: 'Model nested grammar pairing using Last-In First-Out data structures.',
    sourceReference: 'Unit 2 Syllabus // Practical 4 (Stack Implementation & Infix/Postfix Evaluation)',
    leetcodeRef: 'LEETCODE #20 // SYLLABUS PRACTICAL 4',
    tags: ['Unit 2', 'Stack', 'LIFO'],
    statement:
      'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets in correct order, and every close bracket has a corresponding open bracket.',
    constraints: ['1 ≤ s.length ≤ 10⁴', 's consists of parentheses only "()[]{}"'],
    testcases: [
      { input: 's = "()[]{}"', expectedOutput: 'true', explanation: 'All brackets match in sequence.' },
      { input: 's = "(]"', expectedOutput: 'false', explanation: 'Mismatched bracket type.' },
      { input: 's = "([])"', expectedOutput: 'true', explanation: 'Nested brackets properly closed.' },
    ],
    expectedThinking:
      'Most recently opened bracket must be the first closed. Whenever an open bracket appears, push it onto a stack. When a closing bracket appears, top of stack must match.',
    visualizationPrompt:
      'Draw a vertical stack tube. Push open brackets. When encountering a closing bracket, compare with top and pop if matching.',
    approaches: [
      { id: 'stack', name: '[ APPROACH A: LIFO STACK ]', description: 'Push open brackets, pop and verify on close brackets.', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', isOptimal: true, feedback: 'Optimal LIFO solution.' },
    ],
    starterCppCode: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') {
                st.push(c);
            } else {
                if (st.empty()) return false;
                char top = st.top();
                if ((c == ')' && top != '(') ||
                    (c == '}' && top != '{') ||
                    (c == ']' && top != '[')) {
                    return false;
                }
                st.pop();
            }
        }
        return st.empty();
    }
};`,
    hints: [
      { id: 1, title: 'HINT 01', subtitle: 'ODD LENGTH', content: 'If s.length() % 2 != 0, it can never be valid!', isUnlocked: true },
      { id: 2, title: 'HINT 02', subtitle: 'EMPTY STACK ON CLOSE', content: 'If you encounter a closing bracket and the stack is empty, return false immediately.', isUnlocked: false },
      { id: 3, title: 'HINT 03', subtitle: 'FINAL STACK CHECK', content: 'At the end of string, return st.empty() to ensure all opened brackets were closed.', isUnlocked: false },
    ],
    hint1: 'Push open brackets, pop on close brackets.',
    hint2: 'Check for empty stack before calling st.top().',
    hint3: 'Return st.empty() at the end.',
    commonMistakes: ['Calling st.top() on an empty stack', 'Returning true without checking st.empty() at end'],
    edgeCases: [{ label: 'Starting with closing bracket "]"', checked: true }, { label: 'Unclosed open bracket "((("', checked: false }],
    expectedTimeComplexity: 'O(N)',
    expectedSpaceComplexity: 'O(N)',
    correctTimeComplexity: 'O(N)',
    correctSpaceComplexity: 'O(N)',
    reflectionQuestions: ['How is this used in compilers for syntax parsing?'],
    relatedProblems: ['queue-using-stacks', 'reverse-linked-list'],
    prerequisiteProblems: ['two-sum'],
    nextRecommendedProblems: ['reverse-linked-list', 'circular-queue-buffer'],
    solutionExplanation: 'Push open brackets to stack, pop and verify on close bracket, return st.empty().',
    cPlusPlusSolution: `bool isValid(string s) {
    if (s.length() % 2 != 0) return false;
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else {
            if (st.empty()) return false;
            char top = st.top();
            if ((c == ')' && top != '(') || (c == '}' && top != '{') || (c == ']' && top != '[')) return false;
            st.pop();
        }
    }
    return st.empty();
}`,
    simulationSteps: [
      { stepIndex: 0, pointerI: 0, activeVal: 0, status: 'Push "(" to stack.', matchFound: false, hashTable: [], log: 'Stack: ["("]' },
      { stepIndex: 1, pointerI: 1, activeVal: 0, status: 'Push "[" to stack.', matchFound: false, hashTable: [], log: 'Stack: ["(", "["]' },
    ],
    status: 'SOLVED',
  },

  // 3. REVERSE LINKED LIST
  {
    id: 'reverse-linked-list',
    problemId: 'reverse-linked-list',
    number: '#203',
    title: 'REVERSE LINKED LIST // POINTER RELINKING',
    topic: 'Unit 3: Linked Lists',
    subtopic: 'Singly Linked List Dynamic Reversal without Memory Leaks',
    unitId: 'unit-3-linked-lists',
    difficulty: 'PRIMITIVE',
    curriculumLevel: 'Level 2 (Pattern Building)',
    pattern: 'Three-Pointer Sliding Window (prev, curr, next)',
    category: 'Two Pointers',
    prerequisites: ['Pointer Dereferencing (->)', 'Dynamic Node Allocation'],
    learningObjective: 'Re-link node pointers in-place without losing references to subsequent elements or memory leaks.',
    sourceReference: 'Unit 3 Syllabus // Practical 6 (Singly Linked List CRUD Operations)',
    leetcodeRef: 'LEETCODE #206 // SYLLABUS PRACTICAL 6',
    tags: ['Unit 3', 'Practical 6', 'Linked List'],
    statement:
      'Given the head of a singly linked list, reverse the list, and return the reversed list. You must do this in-place with O(1) extra space.',
    constraints: ['The number of nodes in the list is the range [0, 5000].', '-5000 ≤ Node.val ≤ 5000', 'Space must be O(1).'],
    testcases: [
      { input: 'head = [1, 2, 3, 4, 5]', expectedOutput: '[5, 4, 3, 2, 1]', explanation: 'Inverted order.' },
      { input: 'head = [1, 2]', expectedOutput: '[2, 1]', explanation: 'Two nodes inverted.' },
      { input: 'head = []', expectedOutput: '[]', explanation: 'Empty list returns nullptr.' },
    ],
    expectedThinking:
      'To reverse curr->next to point backwards to prev, we must first store curr->next in a nextNode pointer, or else we lose the rest of the list forever.',
    visualizationPrompt:
      'Draw nodes 1 -> 2 -> 3. Set PREV = nullptr, CURR = 1. Save NEXT = 2. Flip arrow: 1 -> nullptr. Advance PREV = 1, CURR = 2. Repeat until CURR is null. Return PREV.',
    approaches: [
      { id: 'three_pointer', name: '[ APPROACH A: 3-POINTER IN-PLACE ]', description: 'Iterative prev, curr, nextNode sliding reassignment.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', isOptimal: true, feedback: 'Optimal in-place pointer reversal.' },
    ],
    starterCppCode: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr != nullptr) {
            ListNode* nextNode = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextNode;
        }
        return prev;
    }
};`,
    hints: [
      { id: 1, title: 'HINT 01', subtitle: 'CACHE FORWARD LINK', content: 'Always save curr->next in a temporary variable before mutating it.', isUnlocked: true },
      { id: 2, title: 'HINT 02', subtitle: 'RETURN VALUE', content: 'When curr becomes nullptr, prev points to the new head node.', isUnlocked: false },
    ],
    hint1: 'Save nextNode = curr->next before pointing curr->next backwards.',
    hint2: 'Initialize prev = nullptr.',
    hint3: 'Return prev after loop terminates.',
    commonMistakes: ['Severing forward list pointer before saving', 'Returning head instead of prev'],
    edgeCases: [{ label: 'Empty list head == nullptr', checked: true }, { label: 'Single node list', checked: false }],
    expectedTimeComplexity: 'O(N)',
    expectedSpaceComplexity: 'O(1)',
    correctTimeComplexity: 'O(N)',
    correctSpaceComplexity: 'O(1)',
    reflectionQuestions: ['How would you implement this recursively? What is the recursive stack space?'],
    relatedProblems: ['linked-list-cycle', 'valid-parentheses'],
    prerequisiteProblems: ['two-sum'],
    nextRecommendedProblems: ['linked-list-cycle', 'circular-queue-buffer'],
    solutionExplanation: 'Iterative 3-pointer sliding window reversing pointers in place.',
    cPlusPlusSolution: `ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr) {
        ListNode* nextNode = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextNode;
    }
    return prev;
}`,
    simulationSteps: [
      { stepIndex: 0, pointerI: 1, activeVal: 1, status: 'prev=null, curr=1. Flip 1->null.', matchFound: false, hashTable: [], log: 'Reversed node 1' },
    ],
    status: 'SOLVED',
  },

  // 4. CONTAINER WITH MOST WATER
  {
    id: 'container-water-pointers',
    problemId: 'container-water-pointers',
    number: '#204',
    title: 'CONTAINER WITH MOST WATER // GREEDY INVARIANT',
    topic: 'Unit 1: Introduction, Arrays, and Complexity Analysis',
    subtopic: 'Shrinking Boundary Inward Greedy Optimization',
    unitId: 'unit-1-arrays',
    difficulty: 'MEDIUM',
    curriculumLevel: 'Level 2 (Pattern Building)',
    pattern: 'Opposite-End Two Pointers (Greedy Elimination)',
    category: 'Two Pointers',
    prerequisites: ['Area Calculation: min(h[L], h[R]) * (R - L)', 'Two Pointers'],
    learningObjective: 'Prove that discarding the shorter boundary never misses a strictly larger area.',
    sourceReference: 'Unit 1 Syllabus // Two Pointer Optimization',
    leetcodeRef: 'LEETCODE #11 // SYLLABUS UNIT 1',
    tags: ['Unit 1', 'Two Pointers', 'Greedy'],
    statement:
      'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.',
    constraints: ['n == height.length', '2 ≤ n ≤ 10⁵', '0 ≤ height[i] ≤ 10⁴'],
    testcases: [
      { input: 'height = [1, 8, 6, 2, 5, 4, 8, 3, 7]', expectedOutput: '49', explanation: 'Max area between index 1 (height 8) and index 8 (height 7): 7 * 7 = 49.' },
      { input: 'height = [1, 1]', expectedOutput: '1', explanation: 'min(1, 1) * (1 - 0) = 1.' },
      { input: 'height = [4, 3, 2, 1, 4]', expectedOutput: '16', explanation: 'min(4, 4) * (4 - 0) = 16.' },
    ],
    expectedThinking:
      'Area = min(height[left], height[right]) * (right - left). Width shrinks as we move inward. The only way to find a bigger area is to find a taller line. Thus, always move the pointer pointing to the shorter line.',
    visualizationPrompt:
      'Place LEFT at 0, RIGHT at N-1. Calculate area. The shorter line limits capacity; increment LEFT if height[left] < height[right], else decrement RIGHT.',
    approaches: [
      { id: 'two_pointer', name: '[ APPROACH A: CONVERGING TWO POINTERS ]', description: 'Advance whichever pointer is shorter.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', isOptimal: true, feedback: 'Optimal single pass.' },
    ],
    starterCppCode: `class Solution {
public:
    int maxArea(vector<int>& height) {
        int left = 0;
        int right = (int)height.size() - 1;
        int maxWater = 0;
        
        while (left < right) {
            int w = right - left;
            int h = min(height[left], height[right]);
            maxWater = max(maxWater, w * h);
            
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return maxWater;
    }
};`,
    hints: [
      { id: 1, title: 'HINT 01', subtitle: 'LIMITING FACTOR', content: 'Water level is constrained by the shorter of the two lines: min(h[L], h[R]).', isUnlocked: true },
      { id: 2, title: 'HINT 02', subtitle: 'POINTER MOVEMENT', content: 'Moving the taller line inward only decreases width without any chance to increase height. Moving the shorter line is the only way to potentially increase area.', isUnlocked: false },
    ],
    hint1: 'Area is width * min(h[left], h[right]).',
    hint2: 'Always increment left if h[left] < h[right], else decrement right.',
    hint3: 'Terminates in O(N) time with O(1) space.',
    commonMistakes: ['Moving the taller line inward', 'Nested O(N²) loop causing Time Limit Exceeded'],
    edgeCases: [{ label: 'Two elements array [1, 1]', checked: true }, { label: 'Decreasing heights [5, 4, 3, 2, 1]', checked: false }],
    expectedTimeComplexity: 'O(N)',
    expectedSpaceComplexity: 'O(1)',
    correctTimeComplexity: 'O(N)',
    correctSpaceComplexity: 'O(1)',
    reflectionQuestions: ['Why does moving the taller line guarantee a smaller or equal area?'],
    relatedProblems: ['two-sum', 'valid-palindrome'],
    prerequisiteProblems: ['valid-palindrome'],
    nextRecommendedProblems: ['trapping-rain-water', 'merge-intervals'],
    solutionExplanation: 'Greedy two-pointer shrinking search space by eliminating the shorter boundary.',
    cPlusPlusSolution: `int maxArea(vector<int>& height) {
    int left = 0, right = (int)height.size() - 1, maxWater = 0;
    while (left < right) {
        int h = min(height[left], height[right]);
        maxWater = max(maxWater, (right - left) * h);
        if (height[left] < height[right]) left++;
        else right--;
    }
    return maxWater;
}`,
    simulationSteps: [
      { stepIndex: 0, pointerI: 0, pointerJ: 8, activeVal: 1, status: 'left=0(1), right=8(7). Area=1*8=8. h[left]<h[right], left++.', matchFound: false, hashTable: [], log: 'Area 8' },
      { stepIndex: 1, pointerI: 1, pointerJ: 8, activeVal: 8, status: 'left=1(8), right=8(7). Area=7*7=49. Max area updated!', matchFound: true, hashTable: [], log: 'Max 49' },
    ],
    status: 'SOLVED',
  },

  // 5. LINKED LIST CYCLE
  {
    id: 'linked-list-cycle',
    problemId: 'linked-list-cycle',
    number: '#205',
    title: 'LINKED LIST CYCLE // FLOYD TORTOISE & HARE',
    topic: 'Unit 3: Linked Lists',
    subtopic: 'Cycle Detection with Constant Space Auxiliary Tracking',
    unitId: 'unit-3-linked-lists',
    difficulty: 'MEDIUM',
    curriculumLevel: 'Level 2 (Pattern Building)',
    pattern: "Floyd's Fast & Slow Pointers",
    category: 'Two Pointers',
    prerequisites: ['Pointer Navigation', 'Relative Velocity & Modular Arithmetic'],
    learningObjective: "Detect cyclic loops in dynamic node chains in O(N) time and O(1) space using fast/slow velocity differentials.",
    sourceReference: 'Unit 3 Syllabus // Practical 7 (Circular Linked List Operations)',
    leetcodeRef: 'LEETCODE #141 // SYLLABUS PRACTICAL 7',
    tags: ['Unit 3', 'Practical 7', 'Cycle Detection'],
    statement:
      'Given head, the head of a linked list, determine if the linked list has a cycle in it. Return true if there is a cycle, otherwise false.',
    constraints: ['The number of the nodes in the list is in the range [0, 10⁴].', '-10⁵ ≤ Node.val ≤ 10⁵', 'Space complexity must be O(1).'],
    testcases: [
      { input: 'head = [3,2,0,-4], pos = 1', expectedOutput: 'true', explanation: 'Cycle exists starting at node index 1.' },
      { input: 'head = [1,2], pos = 0', expectedOutput: 'true', explanation: 'Cycle exists back to node 0.' },
      { input: 'head = [1], pos = -1', expectedOutput: 'false', explanation: 'No cycle present.' },
    ],
    expectedThinking:
      'If there is a cycle, a runner moving 2 steps at a time will eventually lap and meet a runner moving 1 step at a time inside the cycle loop.',
    visualizationPrompt:
      'Visualize a circular track. Slow moves 1 step; Fast moves 2 steps. The relative distance decreases by 1 each step until they collide.',
    approaches: [
      { id: 'floyd', name: "[ APPROACH A: FLOYD'S TORTOISE & HARE ]", description: 'Slow moves by 1, fast moves by 2.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', isOptimal: true, feedback: 'Optimal O(1) space cycle detection.' },
    ],
    starterCppCode: `class Solution {
public:
    bool hasCycle(ListNode *head) {
        if (!head || !head->next) return false;
        ListNode* slow = head;
        ListNode* fast = head;
        
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) return true;
        }
        return false;
    }
};`,
    hints: [
      { id: 1, title: 'HINT 01', subtitle: 'FAST/SLOW', content: 'Advance slow by 1 node, fast by 2 nodes.', isUnlocked: true },
      { id: 2, title: 'HINT 02', subtitle: 'GUARD CONDITION', content: 'Check while (fast && fast->next) to avoid nullptr dereference.', isUnlocked: false },
    ],
    hint1: 'slow = slow->next, fast = fast->next->next.',
    hint2: 'If slow == fast, cycle is detected.',
    hint3: 'If fast reaches null, list is acyclic.',
    commonMistakes: ['Calling fast->next->next without checking fast->next != nullptr'],
    edgeCases: [{ label: 'Empty list head == nullptr', checked: true }, { label: 'Single node pointing to itself', checked: false }],
    expectedTimeComplexity: 'O(N)',
    expectedSpaceComplexity: 'O(1)',
    correctTimeComplexity: 'O(N)',
    correctSpaceComplexity: 'O(1)',
    reflectionQuestions: ['How does this relate to finding the starting node of the cycle?'],
    relatedProblems: ['reverse-linked-list', 'lru-cache'],
    prerequisiteProblems: ['reverse-linked-list'],
    nextRecommendedProblems: ['lru-cache', 'bst-traversal-validation'],
    solutionExplanation: 'Fast and slow pointers collide if and only if a cyclic component exists.',
    cPlusPlusSolution: `bool hasCycle(ListNode *head) {
    if (!head || !head->next) return false;
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`,
    simulationSteps: [
      { stepIndex: 0, pointerI: 0, pointerJ: 0, activeVal: 3, status: 'slow=3, fast=3.', matchFound: false, hashTable: [], log: 'Start' },
      { stepIndex: 1, pointerI: 1, pointerJ: 2, activeVal: 2, status: 'slow=2, fast=0.', matchFound: false, hashTable: [], log: 'Step 1' },
    ],
    status: 'NOT_STARTED',
  },

  // 6. IMPLEMENT QUEUE USING STACKS
  {
    id: 'queue-using-stacks',
    problemId: 'queue-using-stacks',
    number: '#206',
    title: 'QUEUE USING STACKS // DUAL INVERSION',
    topic: 'Unit 2: Stacks and Queues',
    subtopic: 'FIFO Emulation via Amortized Inversion',
    unitId: 'unit-2-stacks-queues',
    difficulty: 'PRIMITIVE',
    curriculumLevel: 'Level 2 (Pattern Building)',
    pattern: 'Double Stack Inversion (Amortized O(1))',
    category: 'Arrays & Hashing',
    prerequisites: ['Stack Push & Pop', 'Amortized Time Analysis'],
    learningObjective: 'Implement First-In First-Out (FIFO) queue semantics using two Last-In First-Out (LIFO) stacks.',
    sourceReference: 'Unit 2 Syllabus // Practical 5 (Queue Data Structures)',
    leetcodeRef: 'LEETCODE #232 // SYLLABUS PRACTICAL 5',
    tags: ['Unit 2', 'Queue', 'Stack'],
    statement:
      'Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).',
    constraints: ['1 ≤ x ≤ 9', 'At most 100 calls to push, pop, peek, and empty.', 'All calls to pop and peek are valid.'],
    testcases: [
      { input: 'push(1), push(2), peek()', expectedOutput: '1', explanation: 'First element pushed is 1.' },
      { input: 'pop()', expectedOutput: '1', explanation: 'Pop removes 1.' },
      { input: 'empty()', expectedOutput: 'false', explanation: '2 is still remaining in queue.' },
    ],
    expectedThinking:
      'Keep two stacks: inStack and outStack. When popping or peeking, if outStack is empty, pour all elements from inStack into outStack (reversing their order to FIFO). Then pop from outStack. Each element is moved at most twice, yielding amortized O(1).',
    visualizationPrompt:
      'inStack holds new items. When reading, dump inStack into outStack. Bottom of inStack becomes top of outStack (FIFO).',
    approaches: [
      { id: 'amortized', name: '[ APPROACH A: LAZY POURING AMORTIZED O(1) ]', description: 'Transfer elements from inStack to outStack only when outStack is empty.', timeComplexity: 'Amortized O(1)', spaceComplexity: 'O(N)', isOptimal: true, feedback: 'Optimal amortized queue.' },
    ],
    starterCppCode: `class MyQueue {
private:
    stack<int> inSt;
    stack<int> outSt;
    
    void transfer() {
        if (outSt.empty()) {
            while (!inSt.empty()) {
                outSt.push(inSt.top());
                inSt.pop();
            }
        }
    }
public:
    MyQueue() {}
    
    void push(int x) {
        inSt.push(x);
    }
    
    int pop() {
        transfer();
        int val = outSt.top();
        outSt.pop();
        return val;
    }
    
    int peek() {
        transfer();
        return outSt.top();
    }
    
    bool empty() {
        return inSt.empty() && outSt.empty();
    }
};`,
    hints: [
      { id: 1, title: 'HINT 01', subtitle: 'TWO STACKS', content: 'Use an in-stack for push operations and an out-stack for pop/peek operations.', isUnlocked: true },
      { id: 2, title: 'HINT 02', subtitle: 'LAZY TRANSFER', content: 'Only pour inStack into outStack when outStack is completely empty.', isUnlocked: false },
    ],
    hint1: 'Pour inStack into outStack when outStack is empty.',
    hint2: 'Each element moves to outStack at most once.',
    hint3: 'empty() returns true only when both stacks are empty.',
    commonMistakes: ['Pouring back and forth on every push (O(N) push) instead of lazy pouring'],
    edgeCases: [{ label: 'Alternating push and pop operations', checked: true }],
    expectedTimeComplexity: 'Amortized O(1)',
    expectedSpaceComplexity: 'O(N)',
    correctTimeComplexity: 'Amortized O(1)',
    correctSpaceComplexity: 'O(N)',
    reflectionQuestions: ['Why is the amortized cost O(1) even though a single pop can take O(N)?'],
    relatedProblems: ['valid-parentheses', 'circular-queue-buffer'],
    prerequisiteProblems: ['valid-parentheses'],
    nextRecommendedProblems: ['circular-queue-buffer', 'daily-temperatures'],
    solutionExplanation: 'Lazy element pouring achieves amortized O(1) per operation.',
    cPlusPlusSolution: `class MyQueue {
    stack<int> inSt, outSt;
    void transfer() {
        if (outSt.empty()) {
            while (!inSt.empty()) { outSt.push(inSt.top()); inSt.pop(); }
        }
    }
public:
    void push(int x) { inSt.push(x); }
    int pop() { transfer(); int v = outSt.top(); outSt.pop(); return v; }
    int peek() { transfer(); return outSt.top(); }
    bool empty() { return inSt.empty() && outSt.empty(); }
};`,
    simulationSteps: [
      { stepIndex: 0, pointerI: 0, activeVal: 1, status: 'Pushed 1, 2 to inStack.', matchFound: false, hashTable: [], log: 'inStack: [1, 2]' },
      { stepIndex: 1, pointerI: 1, activeVal: 1, status: 'transfer(): outStack receives [2, 1]. Peek=1.', matchFound: true, hashTable: [], log: 'Peek 1' },
    ],
    status: 'NOT_STARTED',
  },
];
