import { Problem } from '../../types';

export const LEVEL1_PROBLEMS: Problem[] = [
  // 1. BINARY SEARCH (BOUNDS & OCCURRENCE)
  {
    id: 'binary-search-bounds',
    problemId: 'binary-search-bounds',
    number: '#101',
    title: 'BINARY SEARCH // BOUNDARY CONVERGENCE',
    topic: 'Unit 6: Sorting, Searching, and Hashing',
    subtopic: 'Logarithmic Halving Search Space Invariant',
    unitId: 'unit-6-sorting-searching-hashing',
    difficulty: 'PRIMITIVE',
    curriculumLevel: 'Level 1 (Foundation)',
    pattern: 'Search Space Bisecting with Invariant Preservation',
    category: 'Binary Search',
    prerequisites: ['Monotonic Sorted Array', 'Integer Division & Overflow (mid = low + (high - low)/2)'],
    learningObjective:
      'Eliminate 50% of candidate search space per iteration step without off-by-one boundary failure.',
    sourceReference: 'Unit 6 Syllabus // Practical 11 (Binary Search Algorithms)',
    leetcodeRef: 'LEETCODE #704 // SYLLABUS PRACTICAL 11',
    tags: ['Unit 6', 'Practical 11', 'Binary Search', 'O(log N)'],
    statement:
      'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1. You must write an algorithm with O(log n) runtime complexity.',
    constraints: [
      '1 ≤ nums.length ≤ 10⁴',
      '-10⁴ < nums[i], target < 10⁴',
      'All the integers in nums are unique and sorted in strictly ascending order.',
    ],
    testcases: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', expectedOutput: '4', explanation: '9 exists in nums and its index is 4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', expectedOutput: '-1', explanation: '2 does not exist in nums so return -1' },
      { input: 'nums = [5], target = 5', expectedOutput: '0', explanation: 'Single element matched at index 0' },
    ],
    expectedThinking:
      'Because nums is sorted, checking mid lets us deduce whether target must lie left or right. Calculate mid safely using low + (high - low)/2 to avoid integer overflow.',
    visualizationPrompt:
      'Draw the sorted array. Mark LOW at index 0 and HIGH at N-1. Calculate MID. If target > nums[mid], shade out the entire left half [LOW..MID]. Move LOW = mid + 1.',
    approaches: [
      {
        id: 'linear',
        name: '[ APPROACH A: LINEAR SCAN ]',
        description: 'Iterate 0 to N-1 checking each element.',
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        isOptimal: false,
        feedback: 'SUB-OPTIMAL: Misses the logarithmic advantage of sorted data.',
      },
      {
        id: 'binary',
        name: '[ APPROACH B: LOGARITHMIC BISECTION ]',
        description: 'Repeatedly halve search space using low <= high loop.',
        timeComplexity: 'O(log N)',
        spaceComplexity: 'O(1)',
        isOptimal: true,
        feedback: 'OPTIMAL: Reduces search space by 50% per step.',
      },
    ],
    starterCppCode: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int low = 0;
        int high = nums.size() - 1;
        
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
};`,
    hints: [
      { id: 1, title: 'HINT 01', subtitle: 'MID CALCULATION', content: 'Use low + (high - low)/2 instead of (low + high)/2 to prevent integer overflow.', isUnlocked: true },
      { id: 2, title: 'HINT 02', subtitle: 'LOOP CONDITION', content: 'Use while (low <= high). When low == high, exactly 1 candidate element remains to be tested.', isUnlocked: false },
      { id: 3, title: 'HINT 03', subtitle: 'POINTER UPDATES', content: 'Always update to mid + 1 or mid - 1 to guarantee progress towards termination.', isUnlocked: false },
    ],
    hint1: 'Use low + (high - low)/2 to avoid overflow.',
    hint2: 'Condition is low <= high so single elements are checked.',
    hint3: 'Exclude mid on update: low = mid + 1 or high = mid - 1.',
    commonMistakes: ['Integer overflow on (low + high)/2', 'Infinite loop using low < high instead of low <= high'],
    edgeCases: [{ label: 'Single element array [5] target 5', checked: true }, { label: 'Target smaller than nums[0]', checked: false }],
    expectedTimeComplexity: 'O(log N)',
    expectedSpaceComplexity: 'O(1)',
    correctTimeComplexity: 'O(log N)',
    correctSpaceComplexity: 'O(1)',
    reflectionQuestions: ['Why does integer division truncate towards zero?', 'How would you find the first occurrence in duplicates?'],
    relatedProblems: ['two-sum', 'valid-palindrome'],
    prerequisiteProblems: [],
    nextRecommendedProblems: ['two-sum', 'container-water-pointers'],
    solutionExplanation: 'Standard binary search maintaining the invariant that target is within [low, high].',
    cPlusPlusSolution: `int search(vector<int>& nums, int target) {
    int low = 0, high = (int)nums.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
    simulationSteps: [
      { stepIndex: 0, pointerI: 0, pointerJ: 5, activeVal: 3, status: 'low=0, high=5, mid=2 (nums[2]=3 < 9). Shift low=3.', matchFound: false, hashTable: [], log: 'Checked index 2.' },
      { stepIndex: 1, pointerI: 3, pointerJ: 5, activeVal: 9, status: 'low=3, high=5, mid=4 (nums[4]=9 == 9). Found!', matchFound: true, hashTable: [], log: 'Target found at index 4.' },
    ],
    status: 'NOT_STARTED',
  },

  // 2. FIND MIN AND MAX (OPTIMAL COMPARISONS)
  {
    id: 'find-min-max',
    problemId: 'find-min-max',
    number: '#102',
    title: 'FIND MIN & MAX // TOURNAMENT INVARIANT',
    topic: 'Unit 1: Introduction, Arrays, and Complexity Analysis',
    subtopic: 'Pairwise Comparison Elimination',
    unitId: 'unit-1-arrays',
    difficulty: 'PRIMITIVE',
    curriculumLevel: 'Level 1 (Foundation)',
    pattern: 'Pairwise Element Processing (3N/2 Comparisons)',
    category: 'Arrays & Hashing',
    prerequisites: ['1D Array Sequential Traversal', 'Conditional Branching'],
    learningObjective: 'Find both minimum and maximum in an array with minimum total comparisons (3N/2 instead of 2N).',
    sourceReference: 'Unit 1 Syllabus // Introduction & Array Analysis',
    leetcodeRef: 'CLASSIC INTERVIEW // ARRAY MIN-MAX',
    tags: ['Unit 1', 'Array', 'Math', 'Optimization'],
    statement:
      'Given an integer array nums, return a pair containing the minimum and maximum element {minVal, maxVal}. You must handle arrays of size >= 1.',
    constraints: ['1 ≤ nums.length ≤ 10⁵', '-10⁹ ≤ nums[i] ≤ 10⁹'],
    testcases: [
      { input: 'nums = [3, 5, 4, 1, 9]', expectedOutput: '{1, 9}', explanation: 'Min is 1, Max is 9.' },
      { input: 'nums = [22, 14, 8, 17, 35, 3]', expectedOutput: '{3, 35}', explanation: 'Min is 3, Max is 35.' },
      { input: 'nums = [42]', expectedOutput: '{42, 42}', explanation: 'Single element is both min and max.' },
    ],
    expectedThinking:
      'Process elements in pairs. Compare the pair first (1 comparison), then compare smaller with minSoFar (1) and larger with maxSoFar (1). Total 3 comparisons per 2 elements.',
    visualizationPrompt:
      'Group numbers into pairs [3, 5], [4, 1]. Compare inside the pair first: min candidate vs max candidate. Update global extrema.',
    approaches: [
      { id: 'naive', name: '[ APPROACH A: 2N COMPARISONS ]', description: 'Iterate array and compare every element with both min and max.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', isOptimal: false, feedback: 'Uses 2N comparisons.' },
      { id: 'pairwise', name: '[ APPROACH B: 3N/2 TOURNAMENT PAIRING ]', description: 'Compare elements in pairs first, reducing comparisons to 1.5N.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', isOptimal: true, feedback: 'Optimal comparison count.' },
    ],
    starterCppCode: `class Solution {
public:
    pair<int, int> findMinMax(vector<int>& nums) {
        int minVal = nums[0];
        int maxVal = nums[0];
        for (int x : nums) {
            if (x < minVal) minVal = x;
            if (x > maxVal) maxVal = x;
        }
        return {minVal, maxVal};
    }
};`,
    hints: [
      { id: 1, title: 'HINT 01', subtitle: 'BASE VALUES', content: 'Initialize minVal and maxVal with nums[0].', isUnlocked: true },
      { id: 2, title: 'HINT 02', subtitle: 'PAIR COMPARISON', content: 'When grouping two elements (a, b), if a < b, a can never be the maximum!', isUnlocked: false },
      { id: 3, title: 'HINT 03', subtitle: 'ODD LENGTH', content: 'If length is odd, initialize with nums[0] and start loop from index 1.', isUnlocked: false },
    ],
    hint1: 'Compare elements in pairs to eliminate half the comparisons.',
    hint2: 'Smaller in pair is compared only with min, larger only with max.',
    hint3: 'Handle 1-element input as base case.',
    commonMistakes: ['Uninitialized min/max variables', 'Assuming array is never size 1'],
    edgeCases: [{ label: 'Single element array', checked: true }, { label: 'All equal elements [7, 7, 7]', checked: false }],
    expectedTimeComplexity: 'O(N)',
    expectedSpaceComplexity: 'O(1)',
    correctTimeComplexity: 'O(N)',
    correctSpaceComplexity: 'O(1)',
    reflectionQuestions: ['Why is 3N/2 theoretically lower bounded?', 'How would divide-and-conquer achieve the same?'],
    relatedProblems: ['binary-search-bounds', 'valid-palindrome'],
    prerequisiteProblems: [],
    nextRecommendedProblems: ['valid-palindrome', 'two-sum'],
    solutionExplanation: 'Process elements pairwise to optimize comparisons to 3N/2.',
    cPlusPlusSolution: `pair<int, int> findMinMax(vector<int>& nums) {
    int minVal = nums[0], maxVal = nums[0];
    for (int x : nums) {
        if (x < minVal) minVal = x;
        if (x > maxVal) maxVal = x;
    }
    return {minVal, maxVal};
}`,
    simulationSteps: [
      { stepIndex: 0, pointerI: 0, activeVal: 3, status: 'Init min=3, max=3.', matchFound: false, hashTable: [], log: 'Start.' },
      { stepIndex: 1, pointerI: 3, activeVal: 1, status: 'Found 1 < min: min=1.', matchFound: false, hashTable: [], log: 'Updated min.' },
    ],
    status: 'NOT_STARTED',
  },

  // 3. VALID PALINDROME
  {
    id: 'valid-palindrome',
    problemId: 'valid-palindrome',
    number: '#103',
    title: 'VALID PALINDROME // TWO-POINTER SYMMETRY',
    topic: 'Unit 1: Introduction, Arrays, and Complexity Analysis',
    subtopic: 'Bidirectional Inward Pointer Scan',
    unitId: 'unit-1-arrays',
    difficulty: 'PRIMITIVE',
    curriculumLevel: 'Level 1 (Foundation)',
    pattern: 'Inward Converging Two Pointers',
    category: 'Two Pointers',
    prerequisites: ['Character Encoding (ASCII)', 'isalnum and tolower utilities'],
    learningObjective: 'Verify string symmetry in O(N) time and O(1) space skipping non-alphanumeric characters.',
    sourceReference: 'Unit 1 Syllabus // In-place Two Pointer Traversal',
    leetcodeRef: 'LEETCODE #125 // SYLLABUS UNIT 1',
    tags: ['Unit 1', 'Two Pointers', 'String'],
    statement:
      'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.',
    constraints: ['1 ≤ s.length ≤ 2 * 10⁵', 's consists only of printable ASCII characters.'],
    testcases: [
      { input: 's = "A man, a plan, a canal: Panama"', expectedOutput: 'true', explanation: '"amanaplanacanalpanama" is a palindrome.' },
      { input: 's = "race a car"', expectedOutput: 'false', explanation: '"raceacar" is not a palindrome.' },
      { input: 's = " "', expectedOutput: 'true', explanation: 'Empty string after filtering reads the same forward and backward.' },
    ],
    expectedThinking:
      'Maintain left at 0 and right at end. Advance left past non-alphanumeric chars; decrement right past non-alphanumeric chars. Compare lowercase versions. If mismatch, return false.',
    visualizationPrompt:
      'Place LEFT at start, RIGHT at end. Skip commas and spaces. Compare characters inwards until LEFT >= RIGHT.',
    approaches: [
      { id: 'filter_copy', name: '[ APPROACH A: STRING BUFFER ]', description: 'Filter and reverse string to check equality.', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', isOptimal: false, feedback: 'Allocates auxiliary string.' },
      { id: 'in_place_two_pointers', name: '[ APPROACH B: INWARD TWO POINTERS ]', description: 'Scan inwards with left and right indices.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', isOptimal: true, feedback: 'Zero auxiliary space.' },
    ],
    starterCppCode: `class Solution {
public:
    bool isPalindrome(string s) {
        int left = 0, right = (int)s.size() - 1;
        while (left < right) {
            while (left < right && !isalnum(s[left])) left++;
            while (left < right && !isalnum(s[right])) right--;
            if (tolower(s[left]) != tolower(s[right])) return false;
            left++;
            right--;
        }
        return true;
    }
};`,
    hints: [
      { id: 1, title: 'HINT 01', subtitle: 'ALPHANUMERIC', content: 'Use std::isalnum to check whether a char is a letter or digit.', isUnlocked: true },
      { id: 2, title: 'HINT 02', subtitle: 'CASE CONVERSION', content: 'Use std::tolower before comparing characters.', isUnlocked: false },
      { id: 3, title: 'HINT 03', subtitle: 'TERMINATION', content: 'While left < right ensures pointers do not cross.', isUnlocked: false },
    ],
    hint1: 'Use isalnum and tolower to sanitize characters on the fly.',
    hint2: 'Advance pointers past non-alphanumerics without modifying original string.',
    hint3: 'Return true when pointers cross without mismatch.',
    commonMistakes: ['Creating an entire copy string (wasting memory)', 'Out of bounds loop while skipping spaces'],
    edgeCases: [{ label: 'Empty or all punctuation " ,,, "', checked: true }, { label: 'Single character "a"', checked: false }],
    expectedTimeComplexity: 'O(N)',
    expectedSpaceComplexity: 'O(1)',
    correctTimeComplexity: 'O(N)',
    correctSpaceComplexity: 'O(1)',
    reflectionQuestions: ['How does two-pointer technique preserve O(1) space?', 'What is the ASCII difference between uppercase and lowercase?'],
    relatedProblems: ['two-sum', 'single-number'],
    prerequisiteProblems: ['binary-search-bounds'],
    nextRecommendedProblems: ['container-water-pointers', 'valid-parentheses'],
    solutionExplanation: 'Bidirectional inward scan using isalnum and tolower.',
    cPlusPlusSolution: `bool isPalindrome(string s) {
    int left = 0, right = (int)s.size() - 1;
    while (left < right) {
        while (left < right && !isalnum(s[left])) left++;
        while (left < right && !isalnum(s[right])) right--;
        if (tolower(s[left]) != tolower(s[right])) return false;
        left++; right--;
    }
    return true;
}`,
    simulationSteps: [
      { stepIndex: 0, pointerI: 0, pointerJ: 29, activeVal: 0, status: 'left="A", right="a". tolower match.', matchFound: true, hashTable: [], log: 'Matched A and a.' },
    ],
    status: 'NOT_STARTED',
  },

  // 4. SINGLE NUMBER (BITWISE XOR INVARIANT)
  {
    id: 'single-number',
    problemId: 'single-number',
    number: '#104',
    title: 'SINGLE NUMBER // BITWISE XOR CANCELLATION',
    topic: 'Unit 1: Introduction, Arrays, and Complexity Analysis',
    subtopic: 'Bitwise Invariant & Mathematical Self-Cancellation',
    unitId: 'unit-1-arrays',
    difficulty: 'PRIMITIVE',
    curriculumLevel: 'Level 1 (Foundation)',
    pattern: 'Bitwise Invariant (XOR Cancellation: a ^ a = 0)',
    category: 'Arrays & Hashing',
    prerequisites: ['Binary Representation', 'XOR Properties (Commutative & Associative)'],
    learningObjective: 'Utilize XOR cancellation properties to isolate an unmatched element in O(N) time and O(1) space.',
    sourceReference: 'Unit 1 Syllabus // Bitwise Operators & Memory Optimization',
    leetcodeRef: 'LEETCODE #136 // SYLLABUS UNIT 1',
    tags: ['Unit 1', 'Bit Manipulation', 'O(1) Space'],
    statement:
      'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one. You must implement a solution with a linear runtime complexity and use only constant extra space.',
    constraints: ['1 ≤ nums.length ≤ 3 * 10⁴', '-3 * 10⁴ ≤ nums[i] ≤ 3 * 10⁴', 'Each element appears twice except for one.'],
    testcases: [
      { input: 'nums = [2, 2, 1]', expectedOutput: '1', explanation: '2 cancels out with 2 leaving 1.' },
      { input: 'nums = [4, 1, 2, 1, 2]', expectedOutput: '4', explanation: '1 and 2 cancel out leaving 4.' },
      { input: 'nums = [1]', expectedOutput: '1', explanation: 'Single element is 1.' },
    ],
    expectedThinking:
      'XOR has two miraculous properties: x ^ x = 0, and x ^ 0 = x. If we XOR every number in the array together, duplicate pairs cancel out completely to 0, leaving only the unique solitary number.',
    visualizationPrompt:
      'Visualize numbers in binary. 2 = 010. 2 ^ 2 = 000. 000 ^ 1 (001) = 001 (1). The duplicate bits annihilate.',
    approaches: [
      { id: 'hash_set', name: '[ APPROACH A: HASH SET ]', description: 'Add and remove numbers from set.', timeComplexity: 'O(N)', spaceComplexity: 'O(N)', isOptimal: false, feedback: 'Violates O(1) space requirement.' },
      { id: 'xor_accum', name: '[ APPROACH B: BITWISE XOR ACCUMULATION ]', description: 'Cumulative XOR across all elements.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', isOptimal: true, feedback: 'Optimal O(1) space.' },
    ],
    starterCppCode: `class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int ans = 0;
        for (int x : nums) {
            ans ^= x;
        }
        return ans;
    }
};`,
    hints: [
      { id: 1, title: 'HINT 01', subtitle: 'SELF-CANCELLATION', content: 'What is the result of any integer XORed with itself (A ^ A)? It is always 0!', isUnlocked: true },
      { id: 2, title: 'HINT 02', subtitle: 'IDENTITY', content: 'What is 0 ^ A? It is A.', isUnlocked: false },
      { id: 3, title: 'HINT 03', subtitle: 'COMMUTATIVE', content: 'Order does not matter: A ^ B ^ A = (A ^ A) ^ B = 0 ^ B = B.', isUnlocked: false },
    ],
    hint1: 'A ^ A = 0, and A ^ 0 = A.',
    hint2: 'XOR all elements together in a single loop.',
    hint3: 'Duplicates cancel each other out completely.',
    commonMistakes: ['Using hash map and allocating O(N) extra space', 'Assuming array is sorted'],
    edgeCases: [{ label: 'Single element array [1]', checked: true }, { label: 'Negative values in array', checked: false }],
    expectedTimeComplexity: 'O(N)',
    expectedSpaceComplexity: 'O(1)',
    correctTimeComplexity: 'O(N)',
    correctSpaceComplexity: 'O(1)',
    reflectionQuestions: ['How can this pattern be generalized when elements appear 3 times?', 'Why does XOR satisfy the Abelian group axioms?'],
    relatedProblems: ['find-min-max', 'two-sum'],
    prerequisiteProblems: [],
    nextRecommendedProblems: ['two-sum', 'valid-parentheses'],
    solutionExplanation: 'Cumulative XOR cancellation eliminates all duplicate pairs.',
    cPlusPlusSolution: `int singleNumber(vector<int>& nums) {
    int ans = 0;
    for (int x : nums) ans ^= x;
    return ans;
}`,
    simulationSteps: [
      { stepIndex: 0, pointerI: 0, activeVal: 2, status: 'ans = 0 ^ 2 = 2.', matchFound: false, hashTable: [], log: 'XOR with 2.' },
      { stepIndex: 1, pointerI: 1, activeVal: 2, status: 'ans = 2 ^ 2 = 0.', matchFound: false, hashTable: [], log: '2 cancelled.' },
      { stepIndex: 2, pointerI: 2, activeVal: 1, status: 'ans = 0 ^ 1 = 1.', matchFound: true, hashTable: [], log: 'Isolated 1.' },
    ],
    status: 'NOT_STARTED',
  },

  // 5. LINEAR SEARCH WITH SENTINEL
  {
    id: 'linear-search-sentinel',
    problemId: 'linear-search-sentinel',
    number: '#105',
    title: 'LINEAR SEARCH // BOUNDARY SENTINEL',
    topic: 'Unit 1: Introduction, Arrays, and Complexity Analysis',
    subtopic: 'Branch Prediction & Loop Guard Removal',
    unitId: 'unit-1-arrays',
    difficulty: 'PRIMITIVE',
    curriculumLevel: 'Level 1 (Foundation)',
    pattern: 'Linear Array Scanning with Early Exit',
    category: 'Arrays & Hashing',
    prerequisites: ['Basic 0-indexed loop', 'Early return break'],
    learningObjective: 'Master fundamental sequential scanning and first-match index return.',
    sourceReference: 'Unit 1 Syllabus // Practical 1 (Array Traversal & Linear Search)',
    leetcodeRef: 'SYLLABUS PRACTICAL 1 // FOUNDATION',
    tags: ['Unit 1', 'Practical 1', 'Foundation'],
    statement:
      'Given an integer array nums and a target value target, return the 0-based index of the first occurrence of target in nums. If target is not present, return -1.',
    constraints: ['1 ≤ nums.length ≤ 10⁴', '-10⁴ ≤ nums[i], target ≤ 10⁴'],
    testcases: [
      { input: 'nums = [4, 2, 7, 1, 9], target = 7', expectedOutput: '2', explanation: '7 is at index 2.' },
      { input: 'nums = [4, 2, 7, 1, 9], target = 10', expectedOutput: '-1', explanation: '10 is not present.' },
      { input: 'nums = [5], target = 5', expectedOutput: '0', explanation: 'Target at index 0.' },
    ],
    expectedThinking:
      'Traverse index i from 0 to N-1. The moment nums[i] == target, immediately return i. If the loop concludes without finding target, return -1.',
    visualizationPrompt:
      'Step index pointer i sequentially through cells. Check equality. Exit early on first match.',
    approaches: [
      { id: 'linear', name: '[ APPROACH A: SEQUENTIAL SCAN ]', description: 'Iterate index 0 to N-1.', timeComplexity: 'O(N)', spaceComplexity: 'O(1)', isOptimal: true, feedback: 'Optimal for unsorted arrays.' },
    ],
    starterCppCode: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        for (int i = 0; i < (int)nums.size(); ++i) {
            if (nums[i] == target) return i;
        }
        return -1;
    }
};`,
    hints: [
      { id: 1, title: 'HINT 01', subtitle: 'EARLY RETURN', content: 'Return immediately when found to save unnecessary checks.', isUnlocked: true },
      { id: 2, title: 'HINT 02', subtitle: 'FALLTHROUGH', content: 'Return -1 after the loop finishes.', isUnlocked: false },
    ],
    hint1: 'Return index i as soon as nums[i] == target.',
    hint2: 'Return -1 if loop ends without match.',
    hint3: 'Best case O(1), worst case O(N).',
    commonMistakes: ['Returning 0 instead of -1 when not found', 'Index off by one on loop bounds'],
    edgeCases: [{ label: 'Target not in array', checked: true }, { label: 'Target is at index 0', checked: false }],
    expectedTimeComplexity: 'O(N)',
    expectedSpaceComplexity: 'O(1)',
    correctTimeComplexity: 'O(N)',
    correctSpaceComplexity: 'O(1)',
    reflectionQuestions: ['When is linear search faster than binary search? (Small arrays / cache locality)'],
    relatedProblems: ['binary-search-bounds', 'find-min-max'],
    prerequisiteProblems: [],
    nextRecommendedProblems: ['binary-search-bounds', 'two-sum'],
    solutionExplanation: 'Standard linear scan with early exit.',
    cPlusPlusSolution: `int search(vector<int>& nums, int target) {
    for (int i = 0; i < (int)nums.size(); ++i) {
        if (nums[i] == target) return i;
    }
    return -1;
}`,
    simulationSteps: [
      { stepIndex: 0, pointerI: 0, activeVal: 4, status: 'Check nums[0]=4 != 7.', matchFound: false, hashTable: [], log: 'i=0' },
      { stepIndex: 1, pointerI: 2, activeVal: 7, status: 'Check nums[2]=7 == 7. Found!', matchFound: true, hashTable: [], log: 'Match at 2' },
    ],
    status: 'NOT_STARTED',
  },
];
