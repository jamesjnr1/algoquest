# AlgoQuest

A browser-based way to learn **Python (from scratch to OOP)**, **Data Structures & Algorithms**, and **R**, before the semester starts. No build step, no accounts, no server — plain HTML/CSS/JS that saves your progress in the browser. Python code runs for real, in-browser, via [Pyodide](https://pyodide.org/) (CPython compiled to WebAssembly).

Four tracks, covering theory and practice differently:

- **Python Core** — the language itself, start to finish: variables and types, operators, strings, lists/tuples/sets/dicts, control flow, functions, lambdas, exceptions, modules, iterators/generators, decorators, and a full object-oriented programming arc (classes, inheritance, encapsulation, dunder methods). Every level opens with a **Theory** section — proper explanations with diagrams, not just a one-liner — followed by real Python you write and that gets graded automatically.
- **DSA Isle** — interact directly with the data structure. Push and pop your own stack to check whether brackets are balanced. Reverse a linked list one pointer-flip at a time. Build the call stack for `factorial(4)` by hand. Insert values into a BST by comparing left/right yourself.
- **Python Lab** — the same core algorithms as DSA Isle, but now as real, tested Python: quick sort, a hand-built heap, Dijkstra, a trie, dynamic programming, and more.
- **R Harbor** — predict, build, and query real R snippets: vectors, 1-based indexing, data frames, matrices, basic statistics.

Every level ends with a short "Quick check" to lock in the idea, then awards XP — and 1 to 3 stars, based on how many attempts the check took, encouraging a replay if you want to nail it clean. Every level also has a "Stuck? Show a hint" toggle and a "Learn more" link straight to the matching [tutorialspoint.com](https://www.tutorialspoint.com/) page, so help is never more than one click away. Each track page shows its levels as a winding path (not just a plain grid) with a streak/XP gauge up top — XP, streak, stars, and completed levels are all saved in `localStorage`, so you can close the tab and pick up where you left off.

## Play it

No install needed — it's static HTML/CSS/JS, though the Python-executing tracks need an internet connection the first time they download the Python runtime (~12 MB, cached by the browser after that).

- **Locally:** open `index.html` directly in your browser, or run a tiny local server from this folder, e.g. `python3 -m http.server 8000` and visit `http://localhost:8000`.
- **GitHub Pages:** in this repo's Settings → Pages, set the source to the `main` branch, root folder. Your game will be live at the generated `github.io` URL.

## What's covered

**73 levels total** — enough to fill a full semester's worth of study sessions, not an afternoon.

**Python Core** (18 levels — full theory + diagrams, then real graded code)
1. Variables & Data Types
2. Operators & Type Conversion
3. Strings
4. Lists & List Comprehensions
5. Tuples & Sets
6. Dictionaries
7. Control Flow: if / elif / else
8. Loops: for & while
9. Functions & Arguments
10. Lambda & Higher-Order Functions
11. Exception Handling
12. Modules & Imports
13. Iterators & Generators
14. Decorators
15. OOP: Classes & Objects
16. OOP: Inheritance & Polymorphism
17. OOP: Encapsulation & Properties
18. OOP: Dunder (Magic) Methods

**DSA Isle** (18 levels)
1. Big-O Basics
2. Arrays
3. Stacks & Queues
4. Linked Lists
5. Recursion & the Call Stack
6. Trees & Binary Search Trees
7. Sorting: Bubble Sort
8. Binary Search
9. Graphs: Breadth-First Search
10. Hash Tables
11. Doubly Linked Lists
12. Heaps (Priority Queues)
13. Balanced Trees: Why Rotate?
14. Sorting: Quick Sort (Partition)
15. Dijkstra's Shortest Path
16. Topological Sort
17. Union-Find (Disjoint Sets)
18. Dynamic Programming: 0/1 Knapsack

**Python Lab** (25 levels — write real code, tested automatically)
1. Linear Search
2. Binary Search
3. Bubble Sort
4. Selection Sort
5. Merge Sort (divide and conquer)
6. Build a Stack (class)
7. Balanced Brackets (stack application)
8. Build a Queue (class)
9. Reverse a Linked List
10. Binary Search Tree: Insert & Search
11. Graph Traversal: BFS
12. Graph Traversal: DFS
13. Recursive Fibonacci
14. Dynamic Programming: Memoized Fibonacci
15. Build a Hash Map (chaining)
16. Quick Sort
17. Build a Min-Heap
18. Counting Sort
19. Doubly Linked List
20. Dijkstra's Shortest Path
21. Topological Sort (Kahn's algorithm)
22. Union-Find (Disjoint Set)
23. Dynamic Programming: 0/1 Knapsack
24. Dynamic Programming: Longest Common Subsequence
25. Trie (Prefix Tree)

**R Harbor** (12 levels)
1. Variables & Vectors
2. Vectorized Thinking
3. Indexing & Subsetting
4. Data Frames
5. Functions & Control Flow
6. Apply Family & Quick Stats
7. Lists
8. String Manipulation
9. Matrices
10. Control Flow: while, repeat, next
11. Function Defaults & Multiple Return Values
12. Basic Statistics in R

The DSA/Python Lab topic list (and ordering) is loosely modeled on the standard curriculum at [tutorialspoint.com/data_structures_algorithms](https://www.tutorialspoint.com/data_structures_algorithms/index.htm), scoped to the topics a strong first course covers. That tutorial goes further still (AVL/Red-Black/B-Trees, greedy algorithms beyond knapsack, network flow, tries beyond the basics, approximation/randomized algorithms) — a good next stop once all 73 levels here feel solid.

Levels within each track unlock in order, so the ideas build on each other. Progress is per-browser (not synced anywhere), so use the same browser/device to keep your streak.

## Project structure

```
index.html                 shell + layout, loads Pyodide from jsdelivr's CDN
css/style.css               all styling
js/engine.js                save/load state, XP, rank, streak logic
js/components.js            small DOM helpers (quiz renderer, reorder challenge, code blocks)
js/pyrunner.js               Pyodide loader + Python test runner + code-editor UI component
js/diagrams.js               small inline-SVG diagram toolkit used in Theory sections
js/hints-references.js       per-level "stuck?" hints + tutorialspoint.com reference links
js/dsa-levels.js             the 18 DSA Isle levels
js/code-levels.js            the 25 Python Lab levels
js/python-core-levels.js     the 18 Python Core levels
js/r-levels.js               the 12 R Harbor levels
js/app.js                    navigation (dashboard/track/level), XP/quiz flow, theory rendering
```

To add an interactive DSA/R level, push an object with `{ id, track, title, concept, xp, intro, mount(root, onTaskDone), quiz }` onto `DSA_LEVELS` or `R_LEVELS`. To add a tested-code level (Python Lab or Python Core), push `{ id, track, title, concept, xp, intro, theory, starterCode, tests: [{ description, code }], mount, quiz }` — `mount` just needs to call `renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone)`. Each test's `code` is a Python snippet that should raise `AssertionError` on failure; the runner reports pass/fail/error per test. The optional `theory` field (any level, any track) renders as its own section above "Try it" — build diagrams for it with the small `dBox`/`dCircle`/`dText`/`dArrow`/`dWrap` helpers in `js/diagrams.js`.

## Why this approach

Neither Python, DSA, nor R clicks from reading alone — they're muscle-memory subjects. This app pairs a real explanation (with a picture, where one clarifies the idea) with something you do immediately after — writing code that gets graded, or manipulating the structure directly — so the theory has something to attach to before the semester's pace picks up.
