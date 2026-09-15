const CODE_LEVELS = [];

// ---------- 1. Linear Search ----------
CODE_LEVELS.push({
  id: 'py-linear-search',
  track: 'py',
  title: 'Linear Search',
  concept: 'Check every element until you find a match',
  xp: 70,
  intro: 'Write real Python and let the tests grade it. <span class="inline-code">linear_search(arr, target)</span> should walk through <span class="inline-code">arr</span> from the start and return the index of the first element equal to <span class="inline-code">target</span>, or <span class="inline-code">-1</span> if it never shows up.',
  starterCode: `def linear_search(arr, target):
    """Return the index of target in arr, or -1 if it isn't there."""
    # TODO: loop through arr, comparing each element to target
    pass
`,
  tests: [
    { description: 'Finds an element in the middle of the list', code: `result = linear_search([5, 3, 8, 1, 9], 8)\nassert result == 2, f"expected 2, got {result}"` },
    { description: 'Returns -1 when the value is missing', code: `result = linear_search([5, 3, 8, 1, 9], 100)\nassert result == -1, f"expected -1, got {result}"` },
    { description: 'Handles an empty list', code: `result = linear_search([], 1)\nassert result == -1, f"expected -1, got {result}"` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [{
    q: 'What is the worst-case time complexity of linear search on a list of n elements?',
    options: ['O(1)', 'O(log n)', 'O(n)'],
    answer: 2,
    explain: 'In the worst case (target at the end, or missing) you check every one of the n elements.',
  }],
});

// ---------- 2. Binary Search ----------
CODE_LEVELS.push({
  id: 'py-binary-search',
  track: 'py',
  title: 'Binary Search',
  concept: 'Halve the search space every step',
  xp: 80,
  intro: 'Write <span class="inline-code">binary_search(arr, target)</span> for a <strong>sorted</strong> list. Keep a <span class="inline-code">lo</span>/<span class="inline-code">hi</span> range, check the middle each step, and shrink the range based on whether the middle is too small or too big. Return the index, or <span class="inline-code">-1</span> if not found.',
  starterCode: `def binary_search(arr, target):
    """arr is sorted ascending. Return the index of target, or -1."""
    # TODO: lo = 0, hi = len(arr) - 1
    # TODO: while lo <= hi, check the midpoint and narrow the range
    pass
`,
  tests: [
    { description: 'Finds a value in the middle', code: `result = binary_search([1, 3, 5, 7, 9, 11, 13], 7)\nassert result == 3, f"expected 3, got {result}"` },
    { description: 'Returns -1 for a missing value', code: `result = binary_search([1, 3, 5, 7, 9, 11, 13], 2)\nassert result == -1, f"expected -1, got {result}"` },
    { description: 'Finds the last element', code: `result = binary_search([2, 4, 6, 8], 8)\nassert result == 3, f"expected 3, got {result}"` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [{
    q: 'Why must the input already be sorted for binary search to work?',
    options: [
      'It isn\'t required, sorting is just a convention',
      'Comparing to the middle only tells you which half to search next if order is guaranteed',
      'Python requires sorted lists for indexing',
    ],
    answer: 1,
    explain: 'Discarding half the list only makes sense if you know everything on one side is smaller and the other side is larger.',
  }],
});

// ---------- 3. Bubble Sort ----------
CODE_LEVELS.push({
  id: 'py-bubble-sort',
  track: 'py',
  title: 'Bubble Sort',
  concept: 'Repeatedly swap out-of-order neighbors',
  xp: 70,
  intro: 'Write <span class="inline-code">bubble_sort(arr)</span>: repeatedly scan the list, swapping any two neighbors that are out of order, until a full pass makes no swaps. Return the sorted list.',
  starterCode: `def bubble_sort(arr):
    """Return a new list with arr's elements sorted ascending."""
    arr = list(arr)
    # TODO: repeatedly pass through arr, swapping adjacent out-of-order pairs
    return arr
`,
  tests: [
    { description: 'Sorts an unordered list', code: `result = bubble_sort([5, 2, 4, 1, 3])\nassert result == [1, 2, 3, 4, 5], f"expected [1, 2, 3, 4, 5], got {result}"` },
    { description: 'Handles an already-sorted list', code: `result = bubble_sort([1, 2, 3])\nassert result == [1, 2, 3], f"expected [1, 2, 3], got {result}"` },
    { description: 'Handles an empty list', code: `result = bubble_sort([])\nassert result == [], f"expected [], got {result}"` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [{
    q: 'Bubble sort\'s worst-case time complexity is:',
    options: ['O(n)', 'O(n log n)', 'O(n²)'],
    answer: 2,
    explain: 'Nested passes over n elements give roughly n²/2 comparisons in the worst case.',
  }],
});

// ---------- 4. Selection Sort ----------
CODE_LEVELS.push({
  id: 'py-selection-sort',
  track: 'py',
  title: 'Selection Sort',
  concept: 'Repeatedly pick the smallest remaining item',
  xp: 70,
  intro: 'Write <span class="inline-code">selection_sort(arr)</span>: for each position, find the smallest value in the unsorted remainder and swap it into place.',
  starterCode: `def selection_sort(arr):
    """Return a new list with arr's elements sorted ascending."""
    arr = list(arr)
    # TODO: for each index i, find the smallest value in arr[i:] and swap it into position i
    return arr
`,
  tests: [
    { description: 'Sorts an unordered list', code: `result = selection_sort([29, 10, 14, 37, 14])\nassert result == [10, 14, 14, 29, 37], f"expected [10, 14, 14, 29, 37], got {result}"` },
    { description: 'Handles a single element', code: `result = selection_sort([7])\nassert result == [7], f"expected [7], got {result}"` },
    { description: 'Does not mutate the caller\'s list', code: `original = [3, 1, 2]\nresult = selection_sort(original)\nassert original == [3, 1, 2], "the input list should not be changed"\nassert result == [1, 2, 3]` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [{
    q: 'How many comparisons does selection sort make, roughly, for n elements?',
    options: ['About n', 'About n log n', 'About n²/2'],
    answer: 2,
    explain: 'For each of the n positions you scan the remaining unsorted part to find the minimum — that\'s still quadratic overall.',
  }],
});

// ---------- 5. Merge Sort ----------
CODE_LEVELS.push({
  id: 'py-merge-sort',
  track: 'py',
  title: 'Merge Sort',
  concept: 'Divide and conquer: split, sort halves, merge',
  xp: 90,
  intro: 'The <span class="inline-code">merge()</span> helper below is already written for you — it merges two sorted lists into one sorted list. Your job is <span class="inline-code">merge_sort(arr)</span>: split <span class="inline-code">arr</span> in half, recursively sort each half, then merge the results.',
  starterCode: `def merge(left, right):
    """Merge two already-sorted lists into one sorted list. (Given.)"""
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result


def merge_sort(arr):
    """Recursively split arr in half, sort each half, then merge() them."""
    # TODO: base case - a list of length 0 or 1 is already sorted
    # TODO: split arr into left and right halves
    # TODO: return merge(merge_sort(left), merge_sort(right))
    pass
`,
  tests: [
    { description: 'Sorts an unordered list', code: `result = merge_sort([5, 2, 4, 1, 3, 9, 0])\nassert result == [0, 1, 2, 3, 4, 5, 9], f"expected [0, 1, 2, 3, 4, 5, 9], got {result}"` },
    { description: 'Handles an empty list', code: `result = merge_sort([])\nassert result == [], f"expected [], got {result}"` },
    { description: 'Sorts a 2-element list', code: `result = merge_sort([2, 1])\nassert result == [1, 2], f"expected [1, 2], got {result}"` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [{
    q: 'Merge sort runs in O(n log n) because:',
    options: [
      'It makes log n passes, each doing O(n) work to merge everything at that level',
      'It only ever looks at half the list',
      'Python\'s list.sort() is called internally',
    ],
    answer: 0,
    explain: 'Splitting in half repeatedly gives log n levels of recursion, and merging all pieces at each level costs O(n) total — n × log n overall.',
  }],
});

// ---------- 6. Stack class ----------
CODE_LEVELS.push({
  id: 'py-stack',
  track: 'py',
  title: 'Build a Stack',
  concept: 'Last-In-First-Out, implemented as a class',
  xp: 80,
  intro: 'Implement the <span class="inline-code">Stack</span> class: <span class="inline-code">push</span> adds to the top, <span class="inline-code">pop</span> removes and returns the top, <span class="inline-code">peek</span> looks at the top without removing it, and <span class="inline-code">is_empty</span> reports whether anything is left.',
  starterCode: `class Stack:
    def __init__(self):
        self.items = []

    def push(self, value):
        # TODO: add value to the top of the stack
        pass

    def pop(self):
        # TODO: remove and return the top value
        pass

    def peek(self):
        # TODO: return the top value without removing it
        pass

    def is_empty(self):
        # TODO: return True if the stack has no items
        pass
`,
  tests: [
    { description: 'A new stack is empty', code: `s = Stack()\nassert s.is_empty() == True, "a fresh stack should be empty"` },
    { description: 'push/peek/pop follow Last-In-First-Out order', code: `s = Stack()\ns.push(1)\ns.push(2)\ns.push(3)\nassert s.peek() == 3, f"peek should return 3, got {s.peek()}"\nassert s.pop() == 3, "pop should remove and return the most recent push"\nassert s.pop() == 2, "pop should return items in reverse push order"` },
    { description: 'is_empty updates as items are popped', code: `s = Stack()\ns.push(1)\nassert s.is_empty() == False\ns.pop()\nassert s.is_empty() == True, "stack should report empty after popping its only item"` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [{
    q: 'Which real-world task is a stack the natural fit for?',
    options: ['A checkout line at a store', 'Undo/redo history in an editor', 'A print queue processing jobs in order'],
    answer: 1,
    explain: 'Undo reverses the most recent action first — classic Last-In-First-Out behavior.',
  }],
});

// ---------- 7. Balanced Parentheses ----------
CODE_LEVELS.push({
  id: 'py-balanced-parens',
  track: 'py',
  title: 'Balanced Brackets',
  concept: 'A classic stack application',
  xp: 80,
  intro: 'Write <span class="inline-code">is_balanced(expr)</span>: push every opening bracket <span class="inline-code">( [ {</span> onto a stack, and for every closing bracket, pop and check it matches. Return <span class="inline-code">True</span> only if everything matches up and nothing is left over.',
  starterCode: `def is_balanced(expr):
    """Return True if all ()[]{}  in expr are properly matched and nested."""
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []
    # TODO: walk through expr; push opening brackets, pop-and-check on closing brackets
    # TODO: at the end, the stack must be empty for expr to be balanced
    pass
`,
  tests: [
    { description: 'Recognizes a balanced expression', code: `assert is_balanced("{[()]}") == True` },
    { description: 'Rejects mismatched brackets', code: `assert is_balanced("{[(])}") == False` },
    { description: 'An empty string is balanced', code: `assert is_balanced("") == True` },
    { description: 'Rejects a dangling opening bracket', code: `assert is_balanced("(()") == False` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [{
    q: 'Why is a stack the right tool here, rather than just counting brackets?',
    options: [
      'A stack also checks that brackets close in the right order (nesting), not just the right count',
      'Counting brackets is actually faster and just as correct',
      'Stacks are required by Python syntax',
    ],
    answer: 0,
    explain: '"([)]" has equal counts of each bracket but is NOT balanced — only a stack (which enforces order) catches that.',
  }],
});

// ---------- 8. Queue class ----------
CODE_LEVELS.push({
  id: 'py-queue',
  track: 'py',
  title: 'Build a Queue',
  concept: 'First-In-First-Out, implemented as a class',
  xp: 80,
  intro: 'Implement the <span class="inline-code">Queue</span> class: <span class="inline-code">enqueue</span> adds to the back, <span class="inline-code">dequeue</span> removes and returns from the front, and <span class="inline-code">is_empty</span> reports whether anything is left.',
  starterCode: `class Queue:
    def __init__(self):
        self.items = []

    def enqueue(self, value):
        # TODO: add value to the back of the queue
        pass

    def dequeue(self):
        # TODO: remove and return the item at the front of the queue
        pass

    def is_empty(self):
        # TODO: return True if the queue has no items
        pass
`,
  tests: [
    { description: 'A new queue is empty', code: `q = Queue()\nassert q.is_empty() == True` },
    { description: 'enqueue/dequeue follow First-In-First-Out order', code: `q = Queue()\nq.enqueue('a')\nq.enqueue('b')\nq.enqueue('c')\nassert q.dequeue() == 'a', "the first item enqueued should be the first dequeued"\nassert q.dequeue() == 'b'` },
    { description: 'is_empty updates as items are dequeued', code: `q = Queue()\nq.enqueue(1)\nq.dequeue()\nassert q.is_empty() == True` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [{
    q: 'How is a queue different from a stack?',
    options: [
      'A queue removes items in the order they arrived; a stack removes the most recently added item first',
      'A queue can only hold numbers',
      'They are actually the same data structure with different names',
    ],
    answer: 0,
    explain: 'Queue = FIFO (first in, first out). Stack = LIFO (last in, first out).',
  }],
});

// ---------- 9. Reverse a Linked List ----------
CODE_LEVELS.push({
  id: 'py-linked-list-reverse',
  track: 'py',
  title: 'Reverse a Linked List',
  concept: 'Flip next-pointers with prev/curr/next',
  xp: 90,
  intro: 'The <span class="inline-code">Node</span> class is given. Write <span class="inline-code">reverse_linked_list(head)</span> iteratively: walk the list once, flipping each node\'s <span class="inline-code">next</span> pointer to point backward, and return the new head.',
  starterCode: `class Node:
    def __init__(self, value, next=None):
        self.value = value
        self.next = next


def reverse_linked_list(head):
    """head is the first Node of a singly linked list. Return the new head after reversing it."""
    prev = None
    curr = head
    # TODO: while curr is not None: save curr.next, point curr.next to prev,
    #       then move prev and curr forward
    return prev
`,
  tests: [
    {
      description: 'Reverses a 3-node list',
      code: `n3 = Node(3)\nn2 = Node(2, n3)\nn1 = Node(1, n2)\nnew_head = reverse_linked_list(n1)\nvalues = []\nnode = new_head\nwhile node:\n    values.append(node.value)\n    node = node.next\nassert values == [3, 2, 1], f"expected [3, 2, 1], got {values}"`,
    },
    { description: 'A single-node list reverses to itself', code: `n = Node(5)\nresult = reverse_linked_list(n)\nassert result.value == 5 and result.next is None` },
    { description: 'An empty list (head=None) reverses to None', code: `assert reverse_linked_list(None) is None` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [{
    q: 'Why do you need to save "curr.next" before overwriting it?',
    options: [
      'You don\'t — it\'s optional',
      'Once you point curr.next backward, you\'d lose your only way to reach the rest of the original list',
      'Python requires it for syntax reasons',
    ],
    answer: 1,
    explain: 'Overwriting curr.next without saving it first would disconnect you from every node after curr.',
  }],
});

// ---------- 10. Binary Search Tree ----------
CODE_LEVELS.push({
  id: 'py-bst',
  track: 'py',
  title: 'Binary Search Tree: Insert & Search',
  concept: 'Smaller goes left, larger goes right',
  xp: 90,
  intro: 'The <span class="inline-code">Node</span> class is given. Write <span class="inline-code">insert(root, value)</span> (returns the possibly-new root) and <span class="inline-code">search(root, value)</span> (returns True/False), keeping the BST property: left subtree smaller, right subtree larger.',
  starterCode: `class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def insert(root, value):
    """Insert value into the BST rooted at root. Return the (possibly new) root."""
    # TODO: if root is None, return Node(value)
    # TODO: otherwise recurse into root.left or root.right based on comparison
    pass


def search(root, value):
    """Return True if value exists in the BST rooted at root, else False."""
    # TODO: if root is None, it's not here
    # TODO: if root.value matches, found it - otherwise recurse the right side
    pass
`,
  tests: [
    {
      description: 'Finds values that were inserted',
      code: `root = None\nfor v in [50, 30, 70, 20, 40]:\n    root = insert(root, v)\nassert search(root, 40) == True\nassert search(root, 50) == True`,
    },
    {
      description: 'Reports missing values as not found',
      code: `root = None\nfor v in [50, 30, 70]:\n    root = insert(root, v)\nassert search(root, 99) == False`,
    },
    {
      description: 'Keeps the BST property: left < parent < right',
      code: `root = None\nfor v in [50, 30, 70, 20, 40]:\n    root = insert(root, v)\nassert root.value == 50\nassert root.left.value == 30 and root.right.value == 70\nassert root.left.left.value == 20 and root.left.right.value == 40`,
    },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [{
    q: 'Searching a balanced BST with n nodes takes about:',
    options: ['O(n)', 'O(log n)', 'O(n²)'],
    answer: 1,
    explain: 'Each comparison discards one whole subtree, halving the remaining nodes to check — just like binary search.',
  }],
});

// ---------- 11. Graph BFS ----------
CODE_LEVELS.push({
  id: 'py-graph-bfs',
  track: 'py',
  title: 'Graph Traversal: BFS',
  concept: 'Explore level by level using a queue',
  xp: 90,
  intro: 'Write <span class="inline-code">bfs(graph, start)</span>. <span class="inline-code">graph</span> is a dict mapping each node to a list of neighbors, e.g. <span class="inline-code">{\'A\': [\'B\', \'C\']}</span>. Return a list of nodes in the order BFS visits them, using a queue (a plain list works fine) and a visited set.',
  starterCode: `def bfs(graph, start):
    """Return the list of nodes in BFS visit order starting from start."""
    visited = {start}
    order = []
    queue = [start]
    # TODO: while queue is not empty: pop the front, add it to order,
    #       then enqueue any unvisited neighbors (and mark them visited)
    return order
`,
  tests: [
    { description: 'Visits every node exactly once, starting at the start node', code: `graph = {'A': ['B', 'C'], 'B': ['A', 'D'], 'C': ['A', 'D'], 'D': ['B', 'C']}\norder = bfs(graph, 'A')\nassert order[0] == 'A', f"BFS should start at the start node, got {order}"\nassert set(order) == {'A', 'B', 'C', 'D'}, f"should visit every node exactly once, got {order}"` },
    { description: 'Visits closer nodes before farther ones', code: `graph = {'A': ['B', 'C'], 'B': ['A', 'D'], 'C': ['A', 'D'], 'D': ['B', 'C']}\norder = bfs(graph, 'A')\nassert order.index('D') > order.index('B') and order.index('D') > order.index('C'), f"D is 2 steps away so it must come after B and C, got {order}"` },
    { description: 'Handles a simple chain in exact order', code: `graph = {'A': ['B'], 'B': ['A', 'C'], 'C': ['B', 'D'], 'D': ['C']}\nassert bfs(graph, 'A') == ['A', 'B', 'C', 'D']` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [{
    q: 'BFS uses a queue so that:',
    options: [
      'Nodes are visited in the order they were discovered, ring by ring outward from the start',
      'Nodes are visited in alphabetical order',
      'It can skip visited nodes without tracking them',
    ],
    answer: 0,
    explain: 'FIFO order means everything at distance 1 is processed before anything at distance 2, and so on.',
  }],
});

// ---------- 12. Graph DFS ----------
CODE_LEVELS.push({
  id: 'py-graph-dfs',
  track: 'py',
  title: 'Graph Traversal: DFS',
  concept: 'Explore as deep as possible before backtracking',
  xp: 90,
  intro: 'Write <span class="inline-code">dfs(graph, start)</span>, this time going as deep as possible down one path before backtracking. A recursive helper (or your own stack) both work — return the list of nodes in visit order.',
  starterCode: `def dfs(graph, start):
    """Return the list of nodes in DFS visit order starting from start."""
    visited = set()
    order = []

    def visit(node):
        # TODO: mark node visited, append it to order,
        #       then recursively visit its unvisited neighbors
        pass

    visit(start)
    return order
`,
  tests: [
    { description: 'Visits every node exactly once, starting at the start node', code: `graph = {'A': ['B'], 'B': ['A', 'C'], 'C': ['B']}\norder = dfs(graph, 'A')\nassert order[0] == 'A'\nassert set(order) == {'A', 'B', 'C'}` },
    { description: 'Handles a single-node graph', code: `graph = {'A': []}\nassert dfs(graph, 'A') == ['A']` },
    { description: 'Handles a simple chain in exact order', code: `graph = {'A': ['B'], 'B': ['A', 'C'], 'C': ['B', 'D'], 'D': ['C']}\nassert dfs(graph, 'A') == ['A', 'B', 'C', 'D']` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [{
    q: 'What is the key difference between how BFS and DFS explore a graph?',
    options: [
      'BFS explores level by level (queue); DFS commits to one path and backtracks (stack/recursion)',
      'DFS is only for trees, never general graphs',
      'BFS always visits fewer nodes than DFS',
    ],
    answer: 0,
    explain: 'Both eventually visit every reachable node — they differ in the order, driven by a queue (BFS) vs. a stack/recursion (DFS).',
  }],
});

// ---------- 13. Recursion: Fibonacci ----------
CODE_LEVELS.push({
  id: 'py-recursion-fibonacci',
  track: 'py',
  title: 'Recursive Fibonacci',
  concept: 'A function that calls itself on smaller inputs',
  xp: 70,
  intro: 'Write <span class="inline-code">fibonacci(n)</span> recursively: <span class="inline-code">fibonacci(0) == 0</span>, <span class="inline-code">fibonacci(1) == 1</span>, and every later term is the sum of the two before it.',
  starterCode: `def fibonacci(n):
    """Return the nth Fibonacci number (fibonacci(0)=0, fibonacci(1)=1)."""
    # TODO: base cases for n == 0 and n == 1
    # TODO: otherwise return fibonacci(n - 1) + fibonacci(n - 2)
    pass
`,
  tests: [
    { description: 'Base case fibonacci(0)', code: `assert fibonacci(0) == 0` },
    { description: 'Base case fibonacci(1)', code: `assert fibonacci(1) == 1` },
    { description: 'A later term', code: `result = fibonacci(7)\nassert result == 13, f"expected 13, got {result}"` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [{
    q: 'What must every recursive function have to avoid calling itself forever?',
    options: ['A loop', 'A base case that stops the recursion', 'A global variable'],
    answer: 1,
    explain: 'fibonacci(0) and fibonacci(1) are the base cases here — they return directly instead of recursing further.',
  }],
});

// ---------- 14. Dynamic Programming: Memoized Fibonacci ----------
CODE_LEVELS.push({
  id: 'py-dp-fibonacci-memo',
  track: 'py',
  title: 'Dynamic Programming: Memoized Fibonacci',
  concept: 'Cache results so you never repeat work',
  xp: 90,
  intro: 'Plain recursive Fibonacci recomputes the same values over and over (exponential time). Write <span class="inline-code">fib_memo(n, cache=None)</span>: before recursing, check whether <span class="inline-code">n</span> is already in <span class="inline-code">cache</span>; if not, compute it, store it in <span class="inline-code">cache</span>, then return it. This is the core idea of dynamic programming.',
  starterCode: `def fib_memo(n, cache=None):
    """Same result as fibonacci(n), but must not recompute the same n twice."""
    if cache is None:
        cache = {}
    # TODO: if n is already in cache, return cache[n]
    # TODO: base cases: n == 0 -> 0, n == 1 -> 1
    # TODO: otherwise compute recursively (passing cache along!), store in cache, then return it
    pass
`,
  tests: [
    { description: 'Base cases', code: `assert fib_memo(0) == 0\nassert fib_memo(1) == 1` },
    { description: 'A mid-size value', code: `result = fib_memo(10)\nassert result == 55, f"expected 55, got {result}"` },
    { description: 'A value too large for naive recursion to finish quickly', code: `result = fib_memo(28)\nassert result == 317811, f"expected 317811, got {result}"` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [{
    q: 'Why does memoization make Fibonacci fast?',
    options: [
      'It avoids recursion entirely',
      'It skips redundant work by reusing previously computed answers instead of recomputing them',
      'It rounds numbers to make math simpler',
    ],
    answer: 1,
    explain: 'Plain recursive Fibonacci recomputes the same sub-values exponentially many times; caching turns that into one computation per value of n.',
  }],
});

// ---------- 15. Hash Map ----------
CODE_LEVELS.push({
  id: 'py-hashmap',
  track: 'py',
  title: 'Build a Hash Map',
  concept: 'Buckets + chaining for collisions',
  xp: 90,
  intro: 'Implement <span class="inline-code">put(key, value)</span> and <span class="inline-code">get(key)</span> for a hash map that stores <span class="inline-code">(key, value)</span> pairs in buckets (a list of lists), resolving collisions by chaining — the same approach from the DSA Isle Hash Tables level, in real code this time.',
  starterCode: `class HashMap:
    def __init__(self, size=8):
        self.size = size
        self.buckets = [[] for _ in range(size)]

    def _hash(self, key):
        return hash(key) % self.size

    def put(self, key, value):
        """Store value under key. If key already exists, update it instead of duplicating."""
        bucket = self.buckets[self._hash(key)]
        # TODO: if key is already in this bucket, update its value
        # TODO: otherwise append (key, value) to the bucket
        pass

    def get(self, key):
        """Return the value stored under key, or None if key isn't present."""
        bucket = self.buckets[self._hash(key)]
        # TODO: look through bucket for a matching key and return its value
        return None
`,
  tests: [
    { description: 'Stores and retrieves values', code: `m = HashMap()\nm.put('a', 1)\nm.put('b', 2)\nassert m.get('a') == 1\nassert m.get('b') == 2\nassert m.get('z') is None` },
    { description: 'Updating an existing key overwrites it, not duplicates it', code: `m = HashMap()\nm.put('a', 1)\nm.put('a', 99)\nassert m.get('a') == 99` },
    { description: 'Handles collisions correctly with a tiny table', code: `m = HashMap(size=2)\nfor i in range(10):\n    m.put(i, i * i)\nfor i in range(10):\n    assert m.get(i) == i * i, f"get({i}) should be {i * i}"` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [{
    q: 'With a tiny table size (like 2) and 10 keys, what has to happen?',
    options: ['The table automatically grows itself', 'Multiple keys collide into the same bucket and must be chained', 'Python raises an error'],
    answer: 1,
    explain: 'Only 2 buckets for 10 keys guarantees collisions — chaining (a list per bucket) is what lets put/get still work correctly.',
  }],
});

// ---------- 16. Quick Sort ----------
CODE_LEVELS.push({
  id: 'py-quicksort',
  track: 'py',
  title: 'Quick Sort',
  concept: 'Partition around a pivot, then recurse',
  xp: 100,
  intro: '<span class="inline-code">partition()</span> is given — it rearranges <span class="inline-code">arr[low..high]</span> around the pivot (last element) and returns the pivot\'s final index. Write <span class="inline-code">quick_sort(arr, low, high)</span> to partition, then recursively sort both sides.',
  starterCode: `def partition(arr, low, high):
    """Partition arr[low..high] around arr[high]. Return the pivot's final index. (Given.)"""
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1


def quick_sort(arr, low=0, high=None):
    """Sort arr in place using quicksort. Returns arr for convenience."""
    if high is None:
        high = len(arr) - 1
    # TODO: base case - if low >= high, this slice is already sorted (0 or 1 elements)
    # TODO: otherwise partition, then recursively quick_sort the left and right slices
    return arr
`,
  tests: [
    { description: 'Sorts an unordered list', code: `result = quick_sort([7, 2, 8, 4, 1, 9, 3])\nassert result == [1, 2, 3, 4, 7, 8, 9], f"expected [1, 2, 3, 4, 7, 8, 9], got {result}"` },
    { description: 'Handles an empty list', code: `assert quick_sort([]) == []` },
    { description: 'Handles duplicates', code: `result = quick_sort([3, 1, 3, 2, 1])\nassert result == [1, 1, 2, 3, 3], f"expected [1, 1, 2, 3, 3], got {result}"` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [{
    q: 'Unlike merge sort, quick sort can sort in place using only O(log n) extra memory (for recursion) because:',
    options: ['It swaps elements within the original array instead of building new merged lists', 'It doesn\'t actually sort everything', 'It only works on small arrays'],
    answer: 0,
    explain: 'Partitioning rearranges elements in place via swaps, unlike merge sort\'s merge step which allocates new lists.',
  }],
});

// ---------- 17. Build a Min-Heap ----------
CODE_LEVELS.push({
  id: 'py-min-heap',
  track: 'py',
  title: 'Build a Min-Heap',
  concept: 'Sift up on insert, sift down on removal',
  xp: 100,
  intro: 'Implement a <span class="inline-code">MinHeap</span> backed by a plain list, using the standard index tricks: for index <span class="inline-code">i</span>, its parent is <span class="inline-code">(i - 1) // 2</span> and its children are <span class="inline-code">2*i + 1</span> and <span class="inline-code">2*i + 2</span>.',
  starterCode: `class MinHeap:
    def __init__(self):
        self.data = []

    def push(self, value):
        """Add value to the heap, then sift it up while smaller than its parent."""
        self.data.append(value)
        i = len(self.data) - 1
        # TODO: while i > 0 and self.data[i] < self.data[parent], swap with parent and move i to parent
        pass

    def pop(self):
        """Remove and return the smallest value."""
        if not self.data:
            return None
        smallest = self.data[0]
        last = self.data.pop()
        if self.data:
            self.data[0] = last
            i = 0
            # TODO: sift down - while a child is smaller than self.data[i], swap with the smaller child
            pass
        return smallest

    def peek(self):
        return self.data[0] if self.data else None
`,
  tests: [
    { description: 'Pops values in ascending order regardless of push order', code: `h = MinHeap()\nfor v in [5, 3, 8, 1, 9, 2]:\n    h.push(v)\nresult = [h.pop() for _ in range(6)]\nassert result == [1, 2, 3, 5, 8, 9], f"expected [1, 2, 3, 5, 8, 9], got {result}"` },
    { description: 'peek shows the min without removing it', code: `h = MinHeap()\nh.push(4)\nh.push(2)\nassert h.peek() == 2\nassert h.peek() == 2, "peek should not remove anything"` },
    { description: 'pop on an empty heap returns None', code: `h = MinHeap()\nassert h.pop() is None` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [{
    q: 'Python\'s standard library already has a heap implementation. What module is it?',
    options: ['heapq', 'collections', 'itertools'],
    answer: 0,
    explain: 'heapq turns a plain list into a min-heap with heappush/heappop — exactly what you just built by hand.',
  }],
});

// ---------- 18. Counting Sort ----------
CODE_LEVELS.push({
  id: 'py-counting-sort',
  track: 'py',
  title: 'Counting Sort',
  concept: 'Sort by counting occurrences, not comparing',
  xp: 90,
  intro: 'Counting sort skips comparisons entirely: count how many times each value appears, then rebuild the array in order. It runs in O(n + k) time where k is the range of values — but only works well for small ranges of non-negative integers.',
  starterCode: `def counting_sort(arr):
    """Return a new sorted list. Assumes arr contains non-negative integers."""
    if not arr:
        return []
    # TODO: counts = [0] * (max(arr) + 1)
    # TODO: for each value in arr, increment counts[value]
    # TODO: build the result by walking counts in order, appending each value as many times as it was counted
    pass
`,
  tests: [
    { description: 'Sorts a list of small non-negative integers', code: `result = counting_sort([4, 2, 2, 8, 3, 3, 1])\nassert result == [1, 2, 2, 3, 3, 4, 8], f"expected [1, 2, 2, 3, 3, 4, 8], got {result}"` },
    { description: 'Handles an empty list', code: `assert counting_sort([]) == []` },
    { description: 'Handles all-identical values', code: `assert counting_sort([5, 5, 5]) == [5, 5, 5]` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [{
    q: 'Why can\'t counting sort be used to sort, say, arbitrary floating point numbers efficiently?',
    options: [
      'It needs an index/bucket for every possible value in the range, which only makes sense for a small range of integers',
      'Floats are always already sorted',
      'It actually works fine for any data',
    ],
    answer: 0,
    explain: 'The counts array size depends on the value range (k) — for floats or huge integer ranges, that becomes impractical.',
  }],
});

// ---------- 19. Doubly Linked List ----------
CODE_LEVELS.push({
  id: 'py-doubly-linked-list',
  track: 'py',
  title: 'Doubly Linked List',
  concept: 'Nodes with both next and prev pointers',
  xp: 100,
  intro: 'Implement <span class="inline-code">append(value)</span> (add to the tail) and <span class="inline-code">remove(value)</span> (delete the first matching node) for a doubly linked list, keeping both <span class="inline-code">next</span> and <span class="inline-code">prev</span> pointers consistent.',
  starterCode: `class Node:
    def __init__(self, value):
        self.value = value
        self.prev = None
        self.next = None


class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None

    def append(self, value):
        """Add a new node with value to the end of the list."""
        node = Node(value)
        # TODO: if the list is empty, node becomes both head and tail
        # TODO: otherwise link node after self.tail (both directions!), then update self.tail
        pass

    def remove(self, value):
        """Remove the first node with a matching value, relinking its neighbors."""
        node = self.head
        while node is not None and node.value != value:
            node = node.next
        if node is None:
            return False
        # TODO: relink node.prev.next (or self.head) to skip over node
        # TODO: relink node.next.prev (or self.tail) to skip over node
        return True

    def to_list(self):
        values = []
        node = self.head
        while node:
            values.append(node.value)
            node = node.next
        return values
`,
  tests: [
    { description: 'append builds the list in order', code: `d = DoublyLinkedList()\nd.append(1)\nd.append(2)\nd.append(3)\nassert d.to_list() == [1, 2, 3], f"expected [1, 2, 3], got {d.to_list()}"` },
    { description: 'the tail\'s prev chain also works (backward traversal)', code: `d = DoublyLinkedList()\nfor v in [1, 2, 3]:\n    d.append(v)\nvalues = []\nnode = d.tail\nwhile node:\n    values.append(node.value)\n    node = node.prev\nassert values == [3, 2, 1], f"expected [3, 2, 1], got {values}"` },
    { description: 'remove relinks neighbors correctly, including at the ends', code: `d = DoublyLinkedList()\nfor v in [1, 2, 3]:\n    d.append(v)\nassert d.remove(2) == True\nassert d.to_list() == [1, 3], f"expected [1, 3], got {d.to_list()}"\nassert d.remove(1) == True\nassert d.to_list() == [3]\nassert d.remove(99) == False` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [{
    q: 'When removing the head node, what has to change?',
    options: [
      'self.head must be updated to the removed node\'s next, and that new head\'s prev must become None',
      'Nothing, the list handles it automatically',
      'The entire list must be rebuilt',
    ],
    answer: 0,
    explain: 'The removed node had no prev, so its next becomes the new head, and the new head must forget its old prev link.',
  }],
});

// ---------- 20. Dijkstra's Algorithm ----------
CODE_LEVELS.push({
  id: 'py-dijkstra',
  track: 'py',
  title: "Dijkstra's Shortest Path",
  concept: 'Greedily relax edges from the closest unvisited node',
  xp: 110,
  intro: 'Write <span class="inline-code">dijkstra(graph, start)</span>. <span class="inline-code">graph</span> maps each node to a dict of <span class="inline-code">{neighbor: weight}</span>. Return a dict of the shortest distance from <span class="inline-code">start</span> to every node.',
  starterCode: `def dijkstra(graph, start):
    """Return a dict mapping every node to its shortest distance from start."""
    dist = {node: float('inf') for node in graph}
    dist[start] = 0
    visited = set()
    # TODO: while there are unvisited nodes:
    #   1. pick the unvisited node with the smallest dist[] value
    #   2. mark it visited
    #   3. for each of its neighbors, relax: if dist[current] + weight < dist[neighbor], update it
    return dist
`,
  tests: [
    {
      description: 'Finds shortest distances on a small weighted graph',
      code: `graph = {'A': {'B': 4, 'C': 1}, 'B': {'D': 5}, 'C': {'B': 2, 'D': 8}, 'D': {'E': 3}, 'E': {}}\nresult = dijkstra(graph, 'A')\nexpected = {'A': 0, 'B': 3, 'C': 1, 'D': 8, 'E': 11}\nassert result == expected, f"expected {expected}, got {result}"`,
    },
    {
      description: 'The start node always has distance 0',
      code: `graph = {'A': {'B': 1}, 'B': {}}\nassert dijkstra(graph, 'A')['A'] == 0`,
    },
    {
      description: 'An unreachable node keeps distance infinity',
      code: `graph = {'A': {'B': 1}, 'B': {}, 'C': {}}\nresult = dijkstra(graph, 'A')\nassert result['C'] == float('inf'), f"expected inf, got {result['C']}"`,
    },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [{
    q: 'In the test graph, why is the shortest A→B distance 3, not 4 (the direct edge)?',
    options: [
      'Going A→C (1) then C→B (2) totals 3, which beats the direct A→B edge of 4',
      'It\'s a typo, 4 is correct',
      'Dijkstra always prefers more hops',
    ],
    answer: 0,
    explain: 'Dijkstra finds the cheapest total path, which is not always the direct edge.',
  }],
});

// ---------- 21. Topological Sort ----------
CODE_LEVELS.push({
  id: 'py-topological-sort',
  track: 'py',
  title: 'Topological Sort',
  concept: "Kahn's algorithm: repeatedly remove zero-in-degree nodes",
  xp: 100,
  intro: 'Write <span class="inline-code">topological_sort(graph)</span> where <span class="inline-code">graph</span> maps each node to a list of nodes it points to (its dependents). Use Kahn\'s algorithm: track in-degree (how many prerequisites remain) for every node, and repeatedly output any node with in-degree 0, decrementing its dependents\' in-degree.',
  starterCode: `def topological_sort(graph):
    """Return a list of all nodes in a valid topological order."""
    in_degree = {node: 0 for node in graph}
    for node in graph:
        for dependent in graph[node]:
            in_degree[dependent] += 1

    queue = [node for node in graph if in_degree[node] == 0]
    order = []
    # TODO: while queue is not empty:
    #   pop a node, append it to order,
    #   then for each of its dependents, decrement in_degree and enqueue it if it hits 0
    return order
`,
  tests: [
    {
      description: 'Produces a valid order (every edge points forward)',
      code: `graph = {'CS101': ['CS201'], 'MATH101': ['CS301'], 'CS201': ['CS301'], 'CS301': ['CS401'], 'CS401': []}\norder = topological_sort(graph)\nassert set(order) == set(graph.keys()), f"should include every node exactly once, got {order}"\npositions = {node: i for i, node in enumerate(order)}\nfor node, deps in graph.items():\n    for dep in deps:\n        assert positions[node] < positions[dep], f"{node} must come before {dep}"`,
    },
    { description: 'Handles a graph with no dependencies', code: `graph = {'A': [], 'B': [], 'C': []}\nassert set(topological_sort(graph)) == {'A', 'B', 'C'}` },
    { description: 'Handles a simple chain in exact order', code: `graph = {'A': ['B'], 'B': ['C'], 'C': []}\nassert topological_sort(graph) == ['A', 'B', 'C']` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [{
    q: 'What does a node\'s "in-degree" represent here?',
    options: ['How many other nodes point to it (unmet prerequisites)', 'How many nodes it points to', 'Its distance from the start'],
    answer: 0,
    explain: 'In-degree 0 means nothing depends on it being done first — it\'s safe to output right away.',
  }],
});

// ---------- 22. Union-Find ----------
CODE_LEVELS.push({
  id: 'py-union-find',
  track: 'py',
  title: 'Union-Find (Disjoint Set)',
  concept: 'Track connected groups with find() and union()',
  xp: 100,
  intro: 'Implement <span class="inline-code">find(x)</span> (returns the root/representative of x\'s group, following parent pointers) and <span class="inline-code">union(x, y)</span> (merges the two groups by pointing one root at the other).',
  starterCode: `class UnionFind:
    def __init__(self, items):
        self.parent = {item: item for item in items}

    def find(self, x):
        """Return the root representative of x's group."""
        # TODO: follow self.parent[x] until it points to itself, then return that root
        pass

    def union(self, x, y):
        """Merge the groups containing x and y."""
        root_x = self.find(x)
        root_y = self.find(y)
        # TODO: if the roots differ, point one root's parent at the other
        pass

    def connected(self, x, y):
        return self.find(x) == self.find(y)
`,
  tests: [
    { description: 'Items start in their own separate groups', code: `uf = UnionFind(['A', 'B', 'C'])\nassert uf.connected('A', 'B') == False` },
    { description: 'union connects two items', code: `uf = UnionFind(['A', 'B', 'C'])\nuf.union('A', 'B')\nassert uf.connected('A', 'B') == True\nassert uf.connected('A', 'C') == False` },
    { description: 'union is transitive through a chain', code: `uf = UnionFind(['A', 'B', 'C', 'D'])\nuf.union('A', 'B')\nuf.union('C', 'D')\nuf.union('B', 'C')\nassert uf.connected('A', 'D') == True, "A-B, C-D, and B-C should chain A and D together"` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [{
    q: 'Why does union() compare find(x) and find(y) instead of just linking x and y directly?',
    options: [
      'Linking the roots (not the original items) is what actually merges the two whole groups, however large each already is',
      'It doesn\'t matter, either way works identically',
      'find() is only there for debugging',
    ],
    answer: 0,
    explain: 'x and y might already be deep inside larger groups; merging at the roots correctly joins both entire groups in one step.',
  }],
});

// ---------- 23. Dynamic Programming: 0/1 Knapsack ----------
CODE_LEVELS.push({
  id: 'py-knapsack',
  track: 'py',
  title: 'Dynamic Programming: 0/1 Knapsack',
  concept: 'Build a table of best-value-so-far',
  xp: 110,
  intro: 'Write <span class="inline-code">knapsack(weights, values, capacity)</span> using a 2D DP table: <span class="inline-code">dp[i][w]</span> is the best value achievable using the first <span class="inline-code">i</span> items with capacity <span class="inline-code">w</span>. For each item, either skip it (<span class="inline-code">dp[i-1][w]</span>) or take it (<span class="inline-code">values[i-1] + dp[i-1][w-weights[i-1]]</span>, only if it fits) — take the max.',
  starterCode: `def knapsack(weights, values, capacity):
    """Return the maximum total value achievable without exceeding capacity."""
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    # TODO: for i in range(1, n + 1): for w in range(capacity + 1):
    #   skip_value = dp[i-1][w]
    #   if weights[i-1] <= w: take_value = values[i-1] + dp[i-1][w - weights[i-1]]
    #   dp[i][w] = max(skip_value, take_value) if it fits, else skip_value
    return dp[n][capacity]
`,
  tests: [
    { description: 'A small worked example', code: `weights = [2, 3, 4, 5]\nvalues = [3, 4, 5, 6]\nresult = knapsack(weights, values, 7)\nassert result == 9, f"expected 9, got {result}"` },
    { description: 'Zero capacity means zero value', code: `assert knapsack([1, 2], [10, 20], 0) == 0` },
    { description: 'Capacity large enough for everything', code: `result = knapsack([1, 1, 1], [5, 5, 5], 10)\nassert result == 15, f"expected 15, got {result}"` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [{
    q: 'Why build a full 2D table instead of just recursing?',
    options: [
      'Plain recursion recomputes the same (item, remaining capacity) subproblems repeatedly; the table computes each one exactly once',
      'Tables are required by Python',
      'It uses less code',
    ],
    answer: 0,
    explain: 'Same idea as memoized Fibonacci — the table is just memoization organized as a grid instead of a dict.',
  }],
});

// ---------- 24. Dynamic Programming: Longest Common Subsequence ----------
CODE_LEVELS.push({
  id: 'py-lcs',
  track: 'py',
  title: 'Dynamic Programming: Longest Common Subsequence',
  concept: 'Compare two sequences character by character, building a table',
  xp: 110,
  intro: 'Write <span class="inline-code">lcs(a, b)</span>: return the length of the longest subsequence common to both strings (characters in order, not necessarily contiguous). If the last characters match, extend the diagonal answer by 1; otherwise take the best of dropping the last character of either string.',
  starterCode: `def lcs(a, b):
    """Return the length of the longest common subsequence of a and b."""
    n, m = len(a), len(b)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    # TODO: for i in range(1, n + 1): for j in range(1, m + 1):
    #   if a[i-1] == b[j-1]: dp[i][j] = dp[i-1][j-1] + 1
    #   else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[n][m]
`,
  tests: [
    { description: 'A classic example', code: `result = lcs("ABCBDAB", "BDCABA")\nassert result == 4, f"expected 4, got {result}"` },
    { description: 'No characters in common', code: `assert lcs("abc", "xyz") == 0` },
    { description: 'One string is empty', code: `assert lcs("", "abc") == 0` },
    { description: 'Identical strings', code: `assert lcs("hello", "hello") == 5` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [{
    q: 'A "subsequence" (as opposed to a substring) means:',
    options: [
      'Characters must appear in order but don\'t need to be contiguous',
      'Characters must be contiguous',
      'The strings must be the same length',
    ],
    answer: 0,
    explain: '"ACE" is a subsequence of "ABCDE" (skip B and D), but not a substring since those letters aren\'t adjacent in the original.',
  }],
});

// ---------- 25. Trie (Prefix Tree) ----------
CODE_LEVELS.push({
  id: 'py-trie',
  track: 'py',
  title: 'Trie (Prefix Tree)',
  concept: 'Share common prefixes between words in a tree',
  xp: 110,
  intro: 'A trie stores words letter by letter in a tree, so words sharing a prefix share the same path. Implement <span class="inline-code">insert(word)</span>, <span class="inline-code">search(word)</span> (exact match, ending at a node marked as a complete word), and <span class="inline-code">starts_with(prefix)</span> (any word begins with this prefix).',
  starterCode: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_word = False


class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        """Add word to the trie, one character per level."""
        node = self.root
        # TODO: for each character, move to (creating if needed) node.children[char]
        # TODO: after the loop, mark the final node as a complete word
        pass

    def search(self, word):
        """Return True only if word was inserted exactly (not just a prefix of something)."""
        node = self.root
        # TODO: walk the trie by character; if any character is missing, return False
        # TODO: at the end, return whether that final node is marked as a complete word
        pass

    def starts_with(self, prefix):
        """Return True if any inserted word starts with prefix."""
        node = self.root
        # TODO: walk the trie by character; if any character is missing, return False
        # TODO: if you make it through the whole prefix, return True
        pass
`,
  tests: [
    { description: 'search finds exactly-inserted words', code: `t = Trie()\nt.insert("cat")\nt.insert("car")\nassert t.search("cat") == True\nassert t.search("car") == True\nassert t.search("ca") == False, "ca was never inserted as a complete word"` },
    { description: 'search rejects words that were never inserted', code: `t = Trie()\nt.insert("cat")\nassert t.search("dog") == False` },
    { description: 'starts_with finds any matching prefix', code: `t = Trie()\nt.insert("cat")\nt.insert("car")\nassert t.starts_with("ca") == True\nassert t.starts_with("ca") == True\nassert t.starts_with("do") == False` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [{
    q: 'Why does "cat" and "car" sharing the prefix "ca" only need ONE path for "ca" in the trie?',
    options: [
      'Both words are inserted character-by-character, reusing the same nodes wherever the prefix is identical',
      'Tries always merge similar-looking words',
      'It doesn\'t — each word gets a fully separate path',
    ],
    answer: 0,
    explain: 'Insert only creates a new node when a character path doesn\'t exist yet, so shared prefixes are automatically deduplicated.',
  }],
});
