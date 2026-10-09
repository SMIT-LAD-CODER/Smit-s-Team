import { SyllabusUnit } from '../types';

export const SYLLABUS_UNITS: SyllabusUnit[] = [
  {
    id: 'unit-1-arrays',
    unitNumber: 1,
    title: 'Unit 1: Introduction, Arrays, and Complexity Analysis',
    scope: [
      'Primitive vs. Non-Primitive Data Structures',
      'Linear vs. Non-Linear Organizations',
      'Asymptotic Time & Space Complexity (Big-O, Omega, Theta)',
      '2D Arrays & Multi-Dimensional Indexing',
      'Row-Major vs. Column-Major Memory Mapping Formulas',
      'Sparse Matrices: 3-Tuple Representation & Transpose',
    ],
    practicals: [
      {
        practicalNumber: 1,
        title: 'Array CRUD Operations',
        description: 'Insertion at arbitrary index with boundary checks, deletion with compaction, search, and display.',
      },
      {
        practicalNumber: 2,
        title: 'Array Pointer Reversal & Parameter Passing',
        description: 'Reversing elements in-place via dual pointers; demonstrating Call by Value vs. Call by Reference.',
      },
    ],
    bloomWeights: {
      remember: 10,
      understand: 20,
      apply: 30,
      analyze: 20,
      evaluate: 15,
      create: 5,
    },
    studentLearningOutcomes: [
      'SLO-1: Compute exact memory addresses for Row-Major and Column-Major matrices.',
      'SLO-2: Determine asymptotic runtimes and prevent array index out-of-bounds traps.',
    ],
  },
  {
    id: 'unit-2-stacks-queues',
    unitNumber: 2,
    title: 'Unit 2: Stacks and Queues',
    scope: [
      'Array Representation of Stack (LIFO: push, pop, peek, isEmpty, isFull)',
      'Stack Applications: String Reversal, Parenthesis Checker, Tower of Hanoi, Recursion State Frame',
      'Infix, Prefix, and Postfix Notations & Conversion Algorithms',
      'Simple Queue (FIFO) & The False-Overflow Problem',
      'Circular Queue: Modulo Arithmetic ((rear + 1) % SIZE)',
      'Priority Queue & Double-Ended Queue (Deque)',
    ],
    practicals: [
      {
        practicalNumber: 3,
        title: 'Stack Implementation & Parenthesis Validation',
        description: 'Array-based stack verifying balanced parentheses with nested symbols.',
      },
      {
        practicalNumber: 4,
        title: 'Infix to Postfix Conversion & Postfix Evaluation',
        description: 'Operator precedence stack parsing and postfix operand evaluation engine.',
      },
      {
        practicalNumber: 5,
        title: 'Simple Queue & Circular Buffer Implementation',
        description: 'Circular queue solving false-overflow with modulo index wrapping.',
      },
    ],
    bloomWeights: {
      remember: 10,
      understand: 20,
      apply: 35,
      analyze: 20,
      evaluate: 10,
      create: 5,
    },
    studentLearningOutcomes: [
      'SLO-2: Formulate state transitions for LIFO and FIFO memory structures.',
      'SLO-3: Implement expression evaluation pipelines and solve queue boundary wrapping.',
      'SLO-4: Analyze stack frame overhead during recursive calls.',
    ],
  },
  {
    id: 'unit-3-linked-lists',
    unitNumber: 3,
    title: 'Unit 3: Linked Lists',
    scope: [
      'Singly Linked List: Dynamic Allocation, Node Anatomy, Head Pointer',
      'CRUD Operations: Insert at Head, Tail, and Sorted Position; Delete by Key and Position',
      'Singly Circular Linked List: Tail Pointer Invariant',
      'Doubly Linked List & Doubly Circular Linked List: Forward/Backward Traversal',
      'Linked List Representation of Stack (Top at Head) and Queue (Front at Head, Rear at Tail)',
      'Memory Leak Prevention: Explicit free()/delete during pointer re-linking',
    ],
    practicals: [
      {
        practicalNumber: 6,
        title: 'Singly Linked List Dynamic Operations',
        description: 'Full CRUD node insertion, traversal, and deletion without memory leakage.',
      },
      {
        practicalNumber: 7,
        title: 'Circular Linked List CRUD & Josephus Cycle',
        description: 'Maintaining circular boundary invariant where last node points back to head.',
      },
    ],
    bloomWeights: {
      remember: 10,
      understand: 20,
      apply: 30,
      analyze: 25,
      evaluate: 10,
      create: 5,
    },
    studentLearningOutcomes: [
      'SLO-2: Prevent memory leaks and dangling pointers during pointer re-linking.',
      'SLO-4: Construct dynamic stacks and queues with strict O(1) push and pop guarantees.',
    ],
  },
  {
    id: 'unit-4-trees',
    unitNumber: 4,
    title: 'Unit 4: Trees & Advanced Tree Structures',
    scope: [
      'Binary Tree Foundations: Root, Height, Depth, Degree, Full vs. Complete vs. Degenerate',
      'Binary Search Tree (BST) Ordering Invariant: Left < Root < Right',
      'Tree Traversals: Inorder (Sorted Order), Preorder (Cloning), Postorder (Bottom-Up Deletion)',
      'AVL Trees: Height-Balanced Condition (|Balance Factor| <= 1), LL, RR, LR, RL Rotations',
      'Multi-Way Search Trees: B-Trees and B+ Trees (Disk Storage Optimization)',
      'General Tree to Binary Tree Conversion (Left-Child Right-Sibling Representation)',
    ],
    practicals: [
      {
        practicalNumber: 8,
        title: 'BST Construction & Recursive Traversals',
        description: 'Interactive insertion maintaining BST property with Inorder, Preorder, and Postorder recursion.',
      },
    ],
    bloomWeights: {
      remember: 10,
      understand: 20,
      apply: 25,
      analyze: 25,
      evaluate: 15,
      create: 5,
    },
    studentLearningOutcomes: [
      'SLO-4: Prove how Inorder traversal of BST yields monotonic ascending sequences.',
      'SLO-5: Calculate balance factors and execute AVL rotations to prevent tree degradation.',
      'SLO-6: Compare multi-way search trees with standard binary search trees for secondary indexing.',
    ],
  },
  {
    id: 'unit-5-graphs',
    unitNumber: 5,
    title: 'Unit 5: Graphs and Minimum Spanning Trees',
    scope: [
      'Graph Representations: Adjacency Matrix (Dense O(V²)) vs. Adjacency List (Sparse O(V + E))',
      'Directed vs. Undirected, Weighted vs. Unweighted, Cyclic vs. Acyclic Graphs',
      'Breadth-First Search (BFS) using Queue: Shortest Path in Unweighted Graphs',
      'Depth-First Search (DFS) using Stack / Recursion: Connected Components & Cycle Detection',
      'Minimum Spanning Tree (MST): Cut Property and Cycle Property',
      "Prim's Algorithm (Greedy Vertex-Centric Expansion via Priority Queue)",
      "Kruskal's Algorithm (Greedy Edge-Centric Addition via Disjoint Set Union / Sorting)",
    ],
    practicals: [
      {
        practicalNumber: 9,
        title: 'Graph Traversal Engine (DFS and BFS)',
        description: 'Adjacency list traversal tracking visited boolean arrays to prevent infinite cycles.',
      },
    ],
    bloomWeights: {
      remember: 5,
      understand: 15,
      apply: 35,
      analyze: 25,
      evaluate: 15,
      create: 5,
    },
    studentLearningOutcomes: [
      'SLO-3: Formulate topological relationships using graph adjacency abstractions.',
      'SLO-5: Execute Prim and Kruskal algorithms to deduce optimal minimum spanning trees.',
    ],
  },
  {
    id: 'unit-6-sorting-searching-hashing',
    unitNumber: 6,
    title: 'Unit 6: Sorting, Searching, and Hashing',
    scope: [
      'Comparison Sorts: Bubble Sort, Selection Sort, Insertion Sort (O(N²) Quadratic Baseline)',
      'Divide and Conquer Sorts: Merge Sort (Guaranteed O(N log N)), Quick Sort (Pivot Partitioning)',
      'Search Invariants: Linear Search O(N) vs. Binary Search O(log N) on Sorted Domains',
      'Symbol Table & Dictionary Operations',
      'Hashing Fundamentals: Hash Functions (Division, Mid-Square, Folding)',
      'Collision Resolution: Open Addressing (Linear Probing, Quadratic Probing, Double Hashing) vs. Separate Chaining',
    ],
    practicals: [
      {
        practicalNumber: 10,
        title: 'Quadratic Comparison Sorts (Bubble and Selection)',
        description: 'Visualizing element swapping and minimum element selection passes.',
      },
      {
        practicalNumber: 11,
        title: 'Binary Search Interval Reduction',
        description: 'Implementing boundary convergence invariants with left <= right condition.',
      },
    ],
    bloomWeights: {
      remember: 10,
      understand: 25,
      apply: 30,
      analyze: 20,
      evaluate: 10,
      create: 5,
    },
    studentLearningOutcomes: [
      'SLO-1: Differentiate algorithmic complexity bounds between quadratic and divide-and-conquer sorts.',
      'SLO-5: Formulate collision resolution techniques under high load-factor hash configurations.',
    ],
  },
];
