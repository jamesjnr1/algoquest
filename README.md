# AlgoQuest

A tiny browser game for learning **Data Structures & Algorithms** and **R** from scratch, before the semester starts. No build step, no accounts, no server — it's plain HTML/CSS/JS that saves your progress in the browser.

Instead of just reading theory, each level puts you in the loop:

- Push and pop your own stack to check whether brackets are balanced.
- Reverse a linked list one pointer-flip at a time.
- Build the call stack for `factorial(4)` by hand and watch it unwind.
- Insert values into a Binary Search Tree by comparing left/right yourself.
- Step through bubble sort and count the comparisons.
- Play a number-guessing game that teaches binary search.
- Explore a maze with BFS using a real frontier queue.
- Build R vectors, subset them with 1-based indexing, query a data frame, and more.

Every level ends with a two-question "Quick check" to lock in the idea, then awards XP. XP and completed levels are saved in `localStorage`, so you can close the tab and pick up where you left off.

## Play it

No install needed — it's static HTML/CSS/JS.

- **Locally:** open `index.html` directly in your browser, or run a tiny local server from this folder, e.g. `python3 -m http.server 8000` and visit `http://localhost:8000`.
- **GitHub Pages:** in this repo's Settings → Pages, set the source to the `main` branch, root folder. Your game will be live at the generated `github.io` URL.

## What's covered

**DSA Isle**
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

**R Harbor**
1. Variables & Vectors
2. Vectorized Thinking
3. Indexing & Subsetting
4. Data Frames
5. Functions & Control Flow
6. Apply Family & Quick Stats

Levels within each track unlock in order, so the ideas build on each other. Progress is per-browser (not synced anywhere), so use the same browser/device to keep your streak.

## Project structure

```
index.html          shell + layout
css/style.css        all styling
js/engine.js         save/load state, XP & rank logic
js/components.js      small DOM helpers (quiz renderer, reorder challenge, code blocks)
js/dsa-levels.js      the 10 DSA levels
js/r-levels.js        the 6 R levels
js/app.js             navigation, level rendering, XP/quiz flow
```

To add a level, push an object with `{ id, track, title, concept, xp, intro, mount(root, onTaskDone), quiz }` onto `DSA_LEVELS` or `R_LEVELS`.

## Why this approach

Neither DSA nor R clicks from reading alone — both are muscle-memory subjects. This game keeps every explanation short and puts the mechanics (shifting an array, chaining a hash collision, subsetting a vector) in your hands immediately, so the theory has something to attach to before the semester's pace picks up.
