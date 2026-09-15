const DSA_LEVELS = [];

// ---------- 1. Big-O Basics ----------
DSA_LEVELS.push({
  id: 'dsa-big-o',
  track: 'dsa',
  title: 'Big-O Basics',
  concept: 'How we measure algorithm speed',
  xp: 60,
  intro: 'Big-O describes how an algorithm\'s work grows as the input size <span class="inline-code">n</span> grows. It ignores constants and focuses on the trend. Drag/click to reorder these six growth rates from <strong>fastest</strong> to <strong>slowest</strong>.',
  theory: `
    <h4>Why we ignore constants</h4>
    <p>Two algorithms that do "n" and "3n" work are both O(n) &mdash; the 3 is a constant factor that a faster computer or a small optimization changes, but it doesn't change how the algorithm SCALES as n grows. Big-O is about the shape of the growth curve, not the exact runtime.</p>
    ${diagramBigOGrowth()}
    <h4>Reading the chart</h4>
    <p>At small n, the differences barely matter. As n grows into the thousands or millions, O(n) and O(n²) diverge explosively &mdash; that gap is the entire reason algorithm choice matters for real-world performance. An O(n²) algorithm that's "fine" on 100 items can become unusable on 100,000.</p>
    <h4>The common classes, fastest to slowest</h4>
    <ul>
      <li><strong>O(1)</strong> &mdash; constant: same work regardless of input size (array index access)</li>
      <li><strong>O(log n)</strong> &mdash; logarithmic: halves the problem each step (binary search)</li>
      <li><strong>O(n)</strong> &mdash; linear: one pass over the input (linear search)</li>
      <li><strong>O(n log n)</strong> &mdash; linearithmic: the best possible for comparison-based sorting (merge sort)</li>
      <li><strong>O(n²)</strong> &mdash; quadratic: comparing every pair (bubble sort, nested loops)</li>
    </ul>
  `,
  mount(root, onTaskDone) {
    const items = [
      { id: '1', label: 'O(1) — constant time' },
      { id: 'logn', label: 'O(log n) — logarithmic' },
      { id: 'n', label: 'O(n) — linear' },
      { id: 'nlogn', label: 'O(n log n) — linearithmic' },
      { id: 'n2', label: 'O(n²) — quadratic' },
      { id: '2n', label: 'O(2ⁿ) — exponential' },
    ];
    root.appendChild(h('p', { class: 'hint-line' }, 'Click one row, then click another to swap them. Click "Check order" when the list runs fastest → slowest top to bottom.'));
    renderOrderChallenge(root, items, ['1', 'logn', 'n', 'nlogn', 'n2', '2n'], onTaskDone);
  },
  quiz: [
    {
      q: 'A loop that runs once for every element in a list of size <span class="inline-code">n</span> (and does constant work each time) is:',
      options: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
      answer: 1,
      explain: 'One pass over n items, constant work per item, gives O(n) — linear time.',
    },
    {
      q: 'Two nested loops, each running <span class="inline-code">n</span> times (like comparing every pair), give:',
      options: ['O(n)', 'O(log n)', 'O(n²)', 'O(2ⁿ)'],
      answer: 2,
      explain: 'The inner loop runs n times for every one of the n outer iterations: n × n = n².',
    },
    {
      q: 'Binary search cuts the remaining search space in half every step. That growth rate is:',
      options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
      answer: 1,
      explain: 'Halving repeatedly until 1 item remains takes about log₂(n) steps — logarithmic time.',
    },
  ],
});

// ---------- 2. Arrays ----------
DSA_LEVELS.push({
  id: 'dsa-arrays',
  track: 'dsa',
  title: 'Arrays',
  concept: 'Contiguous memory, index access, shifting cost',
  xp: 60,
  intro: 'An array stores elements next to each other in memory, so reading any index is O(1). But inserting or deleting anywhere except the end forces every following element to shift, costing O(n). Try it below.',
  mount(root, onTaskDone) {
    let arr = [4, 8, 15, 16, 23];
    const wrap = h('div', {});
    const row = h('div', { class: 'viz-row' });
    const status = h('div', { class: 'status-line' }, 'Goal: 1) Insert 99 at the front  2) Pop the last element.');
    const goal = ['insert-front', 'pop-back'];
    let step = 0;

    function draw() {
      clear(row);
      arr.forEach((v, i) => {
        const box = h('div', { class: 'box' }, String(v));
        box.appendChild(h('span', { class: 'idx' }, `[${i}]`));
        row.appendChild(box);
      });
    }
    draw();

    function log(msg) {
      status.textContent = msg;
    }

    const btns = h('div', { class: 'btn-row' });
    const bInsert = h('button', { class: 'btn' }, 'Insert 99 at front');
    const bPushBack = h('button', { class: 'btn' }, 'Push 7 at back');
    const bPopBack = h('button', { class: 'btn' }, 'Pop back');
    const bDeleteFront = h('button', { class: 'btn' }, 'Delete front');

    function tryAdvance(action, doneMsg) {
      if (goal[step] === action) {
        step++;
        if (step >= goal.length) {
          log(doneMsg + ' Goal complete!');
          onTaskDone();
        } else {
          log(doneMsg + ' Now: ' + (goal[step] === 'pop-back' ? 'pop the last element.' : 'do the next step.'));
        }
      } else {
        log(doneMsg);
      }
    }

    bInsert.addEventListener('click', () => {
      arr.unshift(99);
      draw();
      tryAdvance('insert-front', `Inserted at index 0 — every one of the ${arr.length - 1} other elements had to shift right. That's O(n).`);
    });
    bPushBack.addEventListener('click', () => {
      arr.push(7);
      draw();
      tryAdvance('push-back', 'Pushed at the end — no shifting needed. That\'s O(1).');
    });
    bPopBack.addEventListener('click', () => {
      if (arr.length) arr.pop();
      draw();
      tryAdvance('pop-back', 'Removed the last element — O(1), nothing else moves.');
    });
    bDeleteFront.addEventListener('click', () => {
      if (arr.length) arr.shift();
      draw();
      tryAdvance('delete-front', `Deleted index 0 — everyone shifted left to close the gap. That's O(n).`);
    });

    btns.appendChild(bInsert);
    btns.appendChild(bPushBack);
    btns.appendChild(bPopBack);
    btns.appendChild(bDeleteFront);

    wrap.appendChild(status);
    wrap.appendChild(row);
    wrap.appendChild(btns);
    root.appendChild(wrap);
  },
  quiz: [
    {
      q: 'What is the time complexity of reading <span class="inline-code">arr[500]</span> in an array?',
      options: ['O(1)', 'O(n)', 'O(log n)'],
      answer: 0,
      explain: 'Arrays give direct address lookup by index — always O(1), regardless of size.',
    },
    {
      q: 'Why is inserting at the front of an array O(n) instead of O(1)?',
      options: [
        'Because the array needs to be sorted first',
        'Because every existing element must shift one slot to make room',
        'Because arrays cannot have a front',
      ],
      answer: 1,
      explain: 'To keep elements contiguous, everything after the insertion point moves over by one — up to n shifts.',
    },
  ],
});

// ---------- 3. Stacks & Queues ----------
DSA_LEVELS.push({
  id: 'dsa-stacks-queues',
  track: 'dsa',
  title: 'Stacks & Queues',
  concept: 'LIFO vs FIFO, and the bracket-matching trick',
  xp: 70,
  intro: 'A <strong>stack</strong> is Last-In-First-Out (like a plate stack): you only ever add/remove from the top. A <strong>queue</strong> is First-In-First-Out (like a line at a shop). Stacks are perfect for checking whether brackets are balanced — push every opening bracket, and every closing bracket must match the top of the stack.',
  theory: `
    ${diagramStackQueue()}
    <h4>Stack: only the top is reachable</h4>
    <p><span class="inline-code">push</span> adds to the top, <span class="inline-code">pop</span> removes the top, <span class="inline-code">peek</span> looks without removing. All three are O(1). Real uses: undo history, the "back" button in a browser, and a call stack for function calls (see the Recursion level).</p>
    <h4>Queue: FIFO order</h4>
    <p><span class="inline-code">enqueue</span> adds to the back, <span class="inline-code">dequeue</span> removes from the front. Real uses: task scheduling, print queues, and breadth-first search (see the Graphs level).</p>
    <h4>Why a stack solves bracket matching</h4>
    <p>Every opening bracket must be closed by the SAME type, in reverse order of when it opened &mdash; that "reverse order" requirement is exactly what a stack gives you for free. Push on open, pop-and-compare on close; if anything mismatches or is left over, the expression isn't balanced.</p>
  `,
  mount(root, onTaskDone) {
    const tokens = '{[(3)+(4)]}'.split('');
    const pairs = { ')': '(', ']': '[', '}': '{' };
    const opens = new Set(['(', '[', '{']);
    let stack = [];
    let pos = 0;
    let failed = false;

    const status = h('div', { class: 'status-line' }, `Click each character in order. Opening brackets push; closing brackets must pop a match. Non-bracket characters just pass through.`);
    const tokenRow = h('div', { class: 'viz-row' });
    const stackRow = h('div', { class: 'viz-row' });
    const stackLabel = h('div', { class: 'hint-line' }, 'Stack (top is right-most box):');

    function drawTokens() {
      clear(tokenRow);
      tokens.forEach((t, i) => {
        const cls = i === pos ? 'box hi' : i < pos ? 'box sorted' : 'box';
        tokenRow.appendChild(h('div', { class: cls }, t));
      });
    }
    function drawStack() {
      clear(stackRow);
      if (stack.length === 0) stackRow.appendChild(h('div', { class: 'hint-line' }, '(empty)'));
      stack.forEach((t) => stackRow.appendChild(h('div', { class: 'box picked' }, t)));
    }
    drawTokens();
    drawStack();

    const nextBtn = h('button', { class: 'btn primary' }, 'Process next character');
    nextBtn.addEventListener('click', () => {
      if (failed || pos >= tokens.length) return;
      const t = tokens[pos];
      if (opens.has(t)) {
        stack.push(t);
        status.textContent = `Pushed "${t}" onto the stack.`;
      } else if (pairs[t]) {
        const top = stack.pop();
        if (top !== pairs[t]) {
          failed = true;
          status.textContent = `Mismatch! "${t}" needs "${pairs[t]}" on top, but found "${top || 'nothing'}". Unbalanced — click Reset to retry.`;
        } else {
          status.textContent = `"${t}" matched and popped "${top}". Good.`;
        }
      } else {
        status.textContent = `"${t}" is not a bracket — skipped.`;
      }
      pos++;
      drawTokens();
      drawStack();
      if (!failed && pos >= tokens.length) {
        if (stack.length === 0) {
          status.textContent = 'All brackets balanced! The stack ended empty — exactly what a valid expression looks like.';
          onTaskDone();
        } else {
          failed = true;
          status.textContent = 'Reached the end but the stack is not empty — that means unmatched opening brackets. Click Reset.';
        }
      }
    });

    const resetBtn = h('button', { class: 'btn' }, 'Reset');
    resetBtn.addEventListener('click', () => {
      stack = []; pos = 0; failed = false;
      status.textContent = 'Reset. Click each character in order.';
      drawTokens(); drawStack();
    });

    root.appendChild(status);
    root.appendChild(h('div', { class: 'hint-line' }, 'Expression: ' + tokens.join('')));
    root.appendChild(tokenRow);
    root.appendChild(stackLabel);
    root.appendChild(stackRow);
    root.appendChild(h('div', { class: 'btn-row' }, [nextBtn, resetBtn]));
  },
  quiz: [
    {
      q: 'Which best describes a stack?',
      options: ['First-In-First-Out — like a checkout line', 'Last-In-First-Out — like a stack of plates', 'Elements sorted automatically'],
      answer: 1,
      explain: 'Stacks only expose the top; the most recently pushed item is the first one popped (LIFO).',
    },
    {
      q: 'A queue is the natural fit for which task?',
      options: ['Undo/redo history in an editor', 'Processing print jobs in the order they were submitted', 'Matching brackets in an expression'],
      answer: 1,
      explain: 'Queues process things in arrival order (FIFO) — perfect for task/print/print queues. Undo and bracket-matching are stack problems.',
    },
  ],
});

// ---------- 4. Linked Lists ----------
DSA_LEVELS.push({
  id: 'dsa-linked-lists',
  track: 'dsa',
  title: 'Linked Lists',
  concept: 'Nodes + pointers, and reversing one step at a time',
  xp: 70,
  intro: 'A linked list is a chain of nodes, each holding a value and a pointer to the next node. Unlike arrays, nodes are not contiguous in memory — you can insert/delete in O(1) if you already have a reference, but you can\'t jump to index k without walking the chain. Let\'s reverse a list iteratively, one pointer flip at a time.',
  theory: `
    ${diagramLinkedListPic()}
    <h4>Array vs. linked list</h4>
    <p>An array is one contiguous block of memory &mdash; fast random access (O(1)), but inserting/deleting in the middle means shifting everything after it (O(n)). A linked list scatters nodes anywhere in memory, connected by pointers &mdash; inserting/deleting is O(1) once you have a reference to the right spot, but reaching index k means walking k pointers (O(n)), no shortcuts.</p>
    <h4>Reversing, iteratively</h4>
    <p>The standard pattern keeps three pointers: <span class="inline-code">prev</span>, <span class="inline-code">curr</span>, and a temporary <span class="inline-code">next</span>. Each step: save curr's next (or you'll lose the rest of the list), point curr's next backward at prev, then slide prev and curr forward by one. Repeat until curr is null &mdash; prev is now the new head.</p>
  `,
  mount(root, onTaskDone) {
    const values = [3, 9, 2, 7];
    let reversedUpTo = 0; // how many links (from the front) have been flipped
    const status = h('div', { class: 'status-line' });
    const row = h('div', { class: 'viz-row' });
    const pointerInfo = h('div', { class: 'hint-line' });

    function draw() {
      clear(row);
      values.forEach((v, i) => {
        const box = h('div', { class: 'box' }, String(v));
        row.appendChild(box);
        if (i < values.length - 1) {
          const flipped = i < reversedUpTo;
          row.appendChild(h('div', { class: 'hint-line' }, flipped ? '←' : '→'));
        }
      });
      const headIdx = reversedUpTo === 0 ? 0 : reversedUpTo;
      const curLabel = reversedUpTo >= values.length ? 'null (done)' : `node(${values[reversedUpTo]})`;
      pointerInfo.textContent = `prev = ${reversedUpTo === 0 ? 'null' : 'node(' + values[reversedUpTo - 1] + ')'}   curr = ${curLabel}   |   new head so far = node(${values[Math.max(reversedUpTo - 1, 0)]})`;
    }
    draw();
    status.textContent = `Original list head → ${values.join(' → ')} → null. Click "Reverse next link" to flip one pointer at a time (standard iterative reversal).`;

    const stepBtn = h('button', { class: 'btn primary' }, 'Reverse next link');
    stepBtn.addEventListener('click', () => {
      if (reversedUpTo >= values.length - 1 + 1) return;
      reversedUpTo++;
      draw();
      if (reversedUpTo >= values.length) {
        status.textContent = `Done! The list is now fully reversed: ${values.slice().reverse().join(' → ')} → null. Head now points to what used to be the last node.`;
        stepBtn.disabled = true;
        onTaskDone();
      } else {
        status.textContent = `Flipped link #${reversedUpTo}. Keep going.`;
      }
    });

    root.appendChild(status);
    root.appendChild(row);
    root.appendChild(pointerInfo);
    root.appendChild(h('div', { class: 'btn-row' }, [stepBtn]));
  },
  quiz: [
    {
      q: 'To reverse a singly linked list iteratively, at each step you:',
      options: [
        'Sort the values and rebuild the list',
        'Save "next", point current node\'s next to "prev", then advance prev and current forward',
        'Copy the list into an array and print it backwards',
      ],
      answer: 1,
      explain: 'The classic pattern keeps prev/curr/next pointers and flips one arrow per iteration — O(n) time, O(1) extra space.',
    },
    {
      q: 'Compared to an array, a linked list\'s big weakness is:',
      options: ['It cannot store duplicate values', 'No O(1) random access by index — you must walk from the head', 'It always uses more memory than a hash table'],
      answer: 1,
      explain: 'Getting to element k means following k pointers, so indexing is O(n) — the tradeoff for cheap insert/delete anywhere you already have a reference.',
    },
  ],
});

// ---------- 5. Recursion ----------
DSA_LEVELS.push({
  id: 'dsa-recursion',
  track: 'dsa',
  title: 'Recursion & the Call Stack',
  concept: 'Base cases, call stacks, and unwinding',
  xp: 80,
  intro: 'Recursion solves a problem by calling itself on a smaller version, until a <strong>base case</strong> stops the calls. Every call gets its own frame pushed onto the call stack; once the base case returns, frames pop and combine results on the way back up. Build <span class="inline-code">factorial(4)</span> by hand.',
  theory: `
    ${diagramRecursionCallStack()}
    <h4>Two ingredients every recursive function needs</h4>
    <ul>
      <li><strong>Base case</strong> &mdash; the simplest input, answered directly without recursing (factorial(1) = 1)</li>
      <li><strong>Recursive case</strong> &mdash; solve a SMALLER version of the same problem, then combine it into the answer (factorial(n) = n × factorial(n-1))</li>
    </ul>
    <p>Miss the base case (or never actually shrink toward it) and you get infinite recursion &mdash; which crashes with a stack overflow once too many frames pile up.</p>
    <h4>The call stack, concretely</h4>
    <p>Each call doesn't finish until the ones it calls finish first. factorial(4) calls factorial(3), which calls factorial(2), which calls factorial(1) &mdash; each waiting, stacked on top of the last. Only once factorial(1) returns does the unwinding begin: each waiting call multiplies its n by the result it gets back, popping off the stack as it goes.</p>
  `,
  mount(root, onTaskDone) {
    let frames = [{ n: 4, result: null }];
    const stackRow = h('div', { class: 'viz-row' });
    const status = h('div', { class: 'status-line' });
    const btnRow = h('div', { class: 'btn-row' });

    function draw() {
      clear(stackRow);
      frames.forEach((f) => {
        const label = f.result == null ? `factorial(${f.n}) = ?` : `factorial(${f.n}) = ${f.result}`;
        stackRow.appendChild(h('div', { class: 'box' + (f.result != null ? ' sorted' : '') }, label));
      });
      clear(btnRow);
      const top = frames[frames.length - 1];
      if (top.n > 1 && top.result == null) {
        const callBtn = h('button', { class: 'btn primary' }, `Call factorial(${top.n - 1})`);
        callBtn.addEventListener('click', () => {
          frames.push({ n: top.n - 1, result: null });
          status.textContent = `Pushed a new frame for factorial(${top.n - 1}) — factorial(${top.n}) is now waiting on it.`;
          draw();
        });
        btnRow.appendChild(callBtn);
      } else if (top.n === 1 && top.result == null) {
        const baseBtn = h('button', { class: 'btn primary' }, 'Base case: factorial(1) = 1');
        baseBtn.addEventListener('click', () => {
          top.result = 1;
          status.textContent = 'Hit the base case — no more calls needed. Now we unwind and multiply on the way back up.';
          draw();
        });
        btnRow.appendChild(baseBtn);
      } else if (frames.length > 1) {
        const returnBtn = h('button', { class: 'btn primary' }, `Return to caller (${top.n} × ${top.result})`);
        returnBtn.addEventListener('click', () => {
          const popped = frames.pop();
          const caller = frames[frames.length - 1];
          caller.result = caller.n * popped.result;
          status.textContent = `factorial(${caller.n}) = ${caller.n} × ${popped.result} = ${caller.result}.`;
          draw();
          if (frames.length === 1 && frames[0].result != null) {
            status.textContent += ` Fully unwound — factorial(4) = ${frames[0].result}.`;
            onTaskDone();
          }
        });
        btnRow.appendChild(returnBtn);
      }
    }
    draw();
    status.textContent = 'The call stack starts with factorial(4). Keep calling smaller versions until you hit the base case, then return values back up.';

    root.appendChild(status);
    root.appendChild(h('div', { class: 'hint-line' }, 'Call stack (bottom → top):'));
    root.appendChild(stackRow);
    root.appendChild(btnRow);
  },
  quiz: [
    {
      q: 'Every recursive function needs at least one:',
      options: ['Loop', 'Base case that stops the recursion', 'Global variable'],
      answer: 1,
      explain: 'Without a base case, the function calls itself forever (or until the call stack overflows).',
    },
    {
      q: 'Each recursive call:',
      options: [
        'Reuses the same stack frame as its caller',
        'Gets pushed as a new frame on the call stack, popped when it returns',
        'Runs in parallel with the caller automatically',
      ],
      answer: 1,
      explain: 'That stacking is literally why deep, unbounded recursion causes a "stack overflow".',
    },
  ],
});

// ---------- 6. Trees & BST ----------
DSA_LEVELS.push({
  id: 'dsa-trees',
  track: 'dsa',
  title: 'Trees & Binary Search Trees',
  concept: 'Insert by comparison; smaller goes left, larger goes right',
  xp: 90,
  intro: 'A Binary Search Tree keeps every node\'s left subtree smaller and right subtree larger. To insert a value, compare it against nodes starting at the root and go left or right until you find an empty spot. Insert this sequence: <strong>50, 30, 70, 20, 40</strong>.',
  theory: `
    ${diagramBSTPic()}
    <h4>The BST invariant</h4>
    <p>At EVERY node in the tree, everything in its left subtree is smaller and everything in its right subtree is larger. This holds recursively all the way down &mdash; not just for the root, but for every single node, which is what makes search fast.</p>
    <h4>Why search is O(log n) (when balanced)</h4>
    <p>Each comparison eliminates an entire subtree from consideration, exactly like binary search on a sorted array. A tree with n nodes, kept roughly balanced, has height around log₂(n) &mdash; so search, insert, and delete all cost O(log n) in the typical case.</p>
    <h4>The catch: it can become unbalanced</h4>
    <p>Insert already-sorted data (10, 20, 30, ...) and a plain BST degenerates into a straight chain &mdash; O(n) height, no better than a linked list. Self-balancing trees like AVL and Red-Black trees exist specifically to prevent this (see the "Balanced Trees" level).</p>
  `,
  mount(root, onTaskDone) {
    let treeRoot = null;
    const sequence = [50, 30, 70, 20, 40];
    let seqIdx = 0;
    let cursor = null; // current comparison node while inserting

    const status = h('div', { class: 'status-line' });
    const treeWrap = h('div', { class: 'tree-wrap' });
    const btnRow = h('div', { class: 'btn-row' });

    function renderNode(node, isCursor) {
      const circle = h('div', { class: 'tnode' + (isCursor ? ' path' : '') }, String(node.value));
      const col = h('div', { style: 'display:flex;flex-direction:column;align-items:center;gap:14px;' });
      col.appendChild(circle);
      if (node.left || node.right) {
        const row = h('div', { style: 'display:flex;gap:30px;' });
        row.appendChild(node.left ? renderNode(node.left, node.left === cursor) : h('div', { class: 'tnode slot' }, '·'));
        row.appendChild(node.right ? renderNode(node.right, node.right === cursor) : h('div', { class: 'tnode slot' }, '·'));
        col.appendChild(row);
      }
      return col;
    }

    function draw() {
      clear(treeWrap);
      if (!treeRoot) {
        treeWrap.appendChild(h('div', { class: 'hint-line' }, '(empty tree — first value becomes the root)'));
      } else {
        treeWrap.appendChild(renderNode(treeRoot, treeRoot === cursor));
      }
    }

    function nextValue() {
      if (seqIdx >= sequence.length) return;
      const v = sequence[seqIdx];
      if (!treeRoot) {
        treeRoot = { value: v, left: null, right: null };
        status.textContent = `${v} became the root (tree was empty).`;
        seqIdx++;
        cursor = null;
        draw();
        if (seqIdx >= sequence.length) { finish(); return; }
        nextValue(); // immediately set up the comparison for the next value
        return;
      }
      cursor = treeRoot;
      status.textContent = `Inserting ${v}: compare with root (${cursor.value}).`;
      draw();
      renderControls();
    }

    function finish() {
      status.textContent = 'All values inserted! The BST property holds: every left child is smaller, every right child is larger than its parent.';
      clear(btnRow);
      onTaskDone();
    }

    function renderControls() {
      clear(btnRow);
      if (seqIdx >= sequence.length) return;
      const v = sequence[seqIdx];
      const goLeft = h('button', { class: 'btn' }, `Go left (${v} < ${cursor.value})`);
      const goRight = h('button', { class: 'btn' }, `Go right (${v} > ${cursor.value})`);
      goLeft.addEventListener('click', () => step(v, 'left'));
      goRight.addEventListener('click', () => step(v, 'right'));
      btnRow.appendChild(goLeft);
      btnRow.appendChild(goRight);
    }

    function step(v, dir) {
      const correctDir = v < cursor.value ? 'left' : 'right';
      if (dir !== correctDir) {
        status.textContent = `Not quite — ${v} is ${v < cursor.value ? 'smaller' : 'larger'} than ${cursor.value}, so go ${correctDir}.`;
        return;
      }
      const child = cursor[dir];
      if (!child) {
        cursor[dir] = { value: v, left: null, right: null };
        status.textContent = `Placed ${v} as the ${dir} child of ${cursor.value}.`;
        seqIdx++;
        cursor = null;
        draw();
        clear(btnRow); // no clickable buttons should remain while cursor is null
        if (seqIdx >= sequence.length) { finish(); return; }
        status.textContent += ` Next value: ${sequence[seqIdx]}.`;
        setTimeout(nextValue, 400);
      } else {
        cursor = child;
        status.textContent = `Moved ${dir}. Now compare ${v} with ${cursor.value}.`;
        draw();
        renderControls();
      }
    }

    root.appendChild(status);
    root.appendChild(treeWrap);
    root.appendChild(btnRow);
    draw();
    nextValue();
  },
  quiz: [
    {
      q: 'In a Binary Search Tree, where do values smaller than a node go?',
      options: ['Right subtree', 'Left subtree', 'Anywhere, order doesn\'t matter'],
      answer: 1,
      explain: 'The BST invariant: left subtree < node < right subtree, at every level.',
    },
    {
      q: 'Why does searching a balanced BST take about O(log n)?',
      options: [
        'Because it checks every node once',
        'Because each comparison eliminates roughly half of the remaining nodes',
        'Because BSTs are always sorted arrays internally',
      ],
      answer: 1,
      explain: 'Like binary search, each step discards one whole subtree — the search space halves each time (when the tree is balanced).',
    },
  ],
});

// ---------- 7. Sorting Algorithms ----------
DSA_LEVELS.push({
  id: 'dsa-sorting',
  track: 'dsa',
  title: 'Sorting: Bubble Sort',
  concept: 'Compare-and-swap, and why nested passes cost O(n²)',
  xp: 90,
  intro: 'Bubble sort repeatedly compares neighboring elements and swaps them if they\'re out of order. After each full pass, the largest unsorted element "bubbles" to its correct place at the end. Step through it yourself.',
  mount(root, onTaskDone) {
    let arr = [5, 2, 4, 1, 3];
    let i = 0; // index within current pass
    let passEnd = arr.length - 1; // boundary shrinking each pass, elements after this are sorted
    let comparisons = 0;
    let swaps = 0;

    const barsWrap = h('div', { class: 'bars-wrap' });
    const status = h('div', { class: 'status-line' });
    const stats = h('div', { class: 'hint-line' });

    function draw(activePair) {
      clear(barsWrap);
      const max = Math.max(...arr);
      arr.forEach((v, idx) => {
        const sorted = idx > passEnd;
        const active = activePair && activePair.includes(idx);
        const bar = h('div', {
          class: 'bar' + (sorted ? ' sorted' : '') + (active ? ' active' : ''),
          style: `height:${(v / max) * 140 + 20}px;`,
        }, String(v));
        barsWrap.appendChild(bar);
      });
      stats.textContent = `Comparisons: ${comparisons}   Swaps: ${swaps}`;
    }
    draw();
    status.textContent = 'Click "Compare & swap if needed" to step through one comparison at a time.';

    const stepBtn = h('button', { class: 'btn primary' }, 'Compare & swap if needed');
    stepBtn.addEventListener('click', () => {
      if (passEnd <= 0) return;
      comparisons++;
      const a = arr[i], b = arr[i + 1];
      let swapped = false;
      if (a > b) { [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]; swapped = true; swaps++; }
      draw([i, i + 1]);
      status.textContent = swapped
        ? `${a} > ${b}, so swapped them.`
        : `${a} ≤ ${b}, already in order — no swap.`;
      i++;
      if (i >= passEnd) {
        status.textContent += ` End of pass — position ${passEnd} is now locked in as sorted.`;
        i = 0;
        passEnd--;
      }
      if (passEnd <= 0) {
        status.textContent = `Sorted! Final array: ${arr.join(', ')}. It took ${comparisons} comparisons and ${swaps} swaps.`;
        stepBtn.disabled = true;
        draw();
        onTaskDone();
      }
    });

    root.appendChild(status);
    root.appendChild(barsWrap);
    root.appendChild(stats);
    root.appendChild(h('div', { class: 'btn-row' }, [stepBtn]));
  },
  quiz: [
    {
      q: 'Bubble sort\'s worst-case time complexity is:',
      options: ['O(n)', 'O(n log n)', 'O(n²)'],
      answer: 2,
      explain: 'A nested pass (outer pass × inner comparisons) on already-reverse-sorted data gives roughly n²/2 comparisons — O(n²).',
    },
    {
      q: 'Which algorithm family (merge sort, quick sort) beats bubble sort asymptotically, running in O(n log n)?',
      options: ['Divide-and-conquer sorts like merge sort', 'Nothing beats bubble sort', 'Only sorting networks in hardware'],
      answer: 0,
      explain: 'By splitting the array and merging sorted halves, merge/quick sort avoid most of the O(n²) redundant comparisons.',
    },
  ],
});

// ---------- 8. Searching ----------
DSA_LEVELS.push({
  id: 'dsa-searching',
  track: 'dsa',
  title: 'Binary Search',
  concept: 'Halving the search space beats scanning one by one',
  xp: 80,
  intro: 'Guess a secret number between 1 and 100. After every guess you\'ll learn "higher" or "lower". Linear search would check 1, 2, 3, ... one at a time (up to 100 tries). Binary search always guesses the <em>middle</em> of the remaining range — try to win in 7 guesses or fewer (log₂(100) ≈ 6.64).',
  mount(root, onTaskDone) {
    const secret = Math.floor(Math.random() * 100) + 1;
    let lo = 1, hi = 100, guesses = 0;
    let won = false;

    const status = h('div', { class: 'status-line' }, `Range: ${lo}-${hi}. Guess the number.`);
    const rangeBar = h('div', { class: 'hint-line' });
    const input = h('input', { type: 'number', min: '1', max: '100', class: 'inline-code', style: 'width:80px;padding:6px;background:#0b0e1c;color:#e8eaf6;border:1px solid #2b3157;border-radius:6px;' });
    const guessBtn = h('button', { class: 'btn primary' }, 'Guess');
    const suggestBtn = h('button', { class: 'btn' }, 'Suggest binary-search midpoint');

    function updateRange() {
      rangeBar.textContent = `Current range: [${lo}, ${hi}]   Guesses so far: ${guesses}   Ideal binary-search midpoint: ${Math.floor((lo + hi) / 2)}`;
    }
    updateRange();

    guessBtn.addEventListener('click', () => {
      if (won) return;
      const g = parseInt(input.value, 10);
      if (Number.isNaN(g) || g < lo || g > hi) {
        status.textContent = `Guess a number within the current range [${lo}, ${hi}].`;
        return;
      }
      guesses++;
      if (g === secret) {
        won = true;
        const bonus = guesses <= 7 ? ' That matches (or beats) binary search\'s ~7-guess guarantee!' : ' Binary search could have guaranteed it in ~7 guesses by always halving the range — try that strategy next time.';
        status.textContent = `Correct! The number was ${secret}, found in ${guesses} guesses.${bonus}`;
        guessBtn.disabled = true;
        onTaskDone();
      } else if (g < secret) {
        lo = g + 1;
        status.textContent = `${g} is too low. Try higher.`;
      } else {
        hi = g - 1;
        status.textContent = `${g} is too high. Try lower.`;
      }
      updateRange();
    });

    suggestBtn.addEventListener('click', () => {
      input.value = Math.floor((lo + hi) / 2);
    });

    root.appendChild(status);
    root.appendChild(rangeBar);
    root.appendChild(h('div', { class: 'btn-row' }, [input, guessBtn, suggestBtn]));
  },
  quiz: [
    {
      q: 'Binary search requires the data to be:',
      options: ['Sorted', 'Stored in a linked list', 'All unique values'],
      answer: 0,
      explain: 'Halving the range only makes sense because sorted order tells you which half the target must be in.',
    },
    {
      q: 'For a sorted array of 1,000,000 items, roughly how many comparisons does binary search need in the worst case?',
      options: ['About 20', 'About 1,000', 'About 1,000,000'],
      answer: 0,
      explain: 'log₂(1,000,000) ≈ 20 — that\'s the entire point of O(log n) versus O(n) linear search.',
    },
  ],
});

// ---------- 9. Graphs (BFS) ----------
DSA_LEVELS.push({
  id: 'dsa-graphs',
  track: 'dsa',
  title: 'Graphs: Breadth-First Search',
  concept: 'Exploring level by level with a queue, guaranteeing the shortest path',
  xp: 90,
  intro: 'BFS explores a graph outward in rings: visit the start, then all its neighbors, then all of THEIR unvisited neighbors, and so on — using a queue behind the scenes. That order guarantees the first time you reach the target, you\'ve found a shortest path. Click the highlighted "frontier" cells in any order to expand outward and reach the target.',
  theory: `
    ${diagramGraphBFSPic()}
    <h4>Graphs, briefly</h4>
    <p>A graph is just nodes connected by edges &mdash; more general than a tree (a tree is a graph with no cycles). Graphs model anything with relationships: road networks, social connections, dependencies between tasks.</p>
    <h4>Why BFS guarantees shortest path</h4>
    <p>BFS uses a queue and processes nodes in the exact order they're discovered. That means it fully finishes an entire "ring" (every node at distance k) before touching anything at distance k+1. The very first time the target is reached, it's necessarily via the fewest possible edges &mdash; there's no way a node discovered later (farther out) could offer a shorter path.</p>
    <h4>BFS vs. DFS</h4>
    <p>Depth-First Search explores as far as possible down ONE path before backtracking (using a stack or recursion instead of a queue). DFS is often simpler to write and uses less memory on wide graphs, but it does NOT guarantee the shortest path the way BFS does.</p>
  `,
  mount(root, onTaskDone) {
    const rows = ['S....', '.##..', '.#...', '...#.', '##..T'];
    const R = rows.length, C = rows[0].length;
    function key(r, c) { return r + ',' + c; }
    let start, target;
    for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
      if (rows[r][c] === 'S') start = [r, c];
      if (rows[r][c] === 'T') target = [r, c];
    }
    const visited = new Set([key(...start)]);
    let frontierQueue = [];
    function neighbors([r, c]) {
      return [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]]
        .filter(([nr, nc]) => nr >= 0 && nr < R && nc >= 0 && nc < C && rows[nr][nc] !== '#');
    }
    neighbors(start).forEach((n) => { const k = key(...n); if (!visited.has(k)) { frontierQueue.push(n); } });

    const status = h('div', { class: 'status-line' }, 'Click a highlighted (frontier) cell to visit it — BFS visits everything at the current distance before going further.');
    const queuePanel = h('div', { class: 'hint-line' });
    const grid = h('div', { class: 'grid', style: `grid-template-columns: repeat(${C}, 40px);` });

    function draw() {
      clear(grid);
      for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
          const k = key(r, c);
          const isWall = rows[r][c] === '#';
          const isStart = r === start[0] && c === start[1];
          const isTarget = r === target[0] && c === target[1];
          const isVisited = visited.has(k);
          const isFrontier = frontierQueue.some(([fr, fc]) => fr === r && fc === c);
          let cls = 'cell';
          if (isWall) cls += ' wall';
          if (isVisited) cls += ' visited';
          if (isFrontier) cls += ' frontier';
          if (isTarget) cls += ' target';
          const cell = h('div', { class: cls }, isStart ? 'S' : isTarget ? 'T' : isVisited ? '✓' : '');
          if (isFrontier && !isWall) {
            cell.addEventListener('click', () => visit(r, c));
          }
          grid.appendChild(cell);
        }
      }
      queuePanel.textContent = 'Frontier queue (FIFO): ' + (frontierQueue.length ? frontierQueue.map(([r, c]) => `(${r},${c})`).join(' → ') : '(empty)');
    }

    function visit(r, c) {
      const k = key(r, c);
      visited.add(k);
      frontierQueue = frontierQueue.filter(([fr, fc]) => !(fr === r && fc === c));
      neighbors([r, c]).forEach((n) => {
        const nk = key(...n);
        if (!visited.has(nk) && !frontierQueue.some(([fr, fc]) => fr === n[0] && fc === n[1])) {
          frontierQueue.push(n);
        }
      });
      if (r === target[0] && c === target[1]) {
        status.textContent = `Reached the target! Because BFS expands ring by ring, this is guaranteed to be a shortest path from S.`;
        draw();
        onTaskDone();
      } else {
        status.textContent = `Visited (${r},${c}). Its unvisited neighbors joined the back of the frontier queue.`;
        draw();
      }
    }

    draw();
    root.appendChild(status);
    root.appendChild(grid);
    root.appendChild(queuePanel);
  },
  quiz: [
    {
      q: 'BFS uses which data structure to decide what to visit next?',
      options: ['A stack (LIFO)', 'A queue (FIFO)', 'A sorted array'],
      answer: 1,
      explain: 'BFS processes nodes in the order they were discovered — classic FIFO queue behavior. DFS uses a stack instead.',
    },
    {
      q: 'Why does BFS guarantee the shortest path (in an unweighted graph)?',
      options: [
        'It visits nodes in order of increasing distance from the start, so the target is first reached via the fewest edges',
        'It always visits the target first',
        'It sorts all nodes by distance before starting',
      ],
      answer: 0,
      explain: 'Because BFS finishes an entire "distance ring" before moving further out, the first time it touches the target is necessarily via the fewest possible edges.',
    },
  ],
});

// ---------- 10. Hashing ----------
DSA_LEVELS.push({
  id: 'dsa-hashing',
  track: 'dsa',
  title: 'Hash Tables',
  concept: 'O(1)-ish lookup via a hash function, and handling collisions',
  xp: 90,
  intro: 'A hash table converts a key into a bucket index using a hash function (here, <span class="inline-code">key % 5</span>), so lookup is close to O(1) on average. When two keys land in the same bucket, that\'s a <strong>collision</strong> — this table resolves it by chaining (a small list per bucket).',
  theory: `
    ${diagramHashPic()}
    <h4>The core trick</h4>
    <p>A hash function takes ANY key and deterministically converts it into a number, which is then reduced to a valid bucket index (usually via <span class="inline-code">% table_size</span>). The same key always hashes to the same bucket, so lookup means: hash the key, jump straight to that bucket, done &mdash; no scanning required.</p>
    <h4>Collisions are inevitable</h4>
    <p>With far more possible keys than buckets, two different keys WILL sometimes land in the same bucket. Chaining handles this by keeping a small list at each bucket; on collision, you just check the (usually short) list for a match. As long as keys spread out reasonably evenly, each bucket only ever holds a handful of items.</p>
    <h4>Why this matters</h4>
    <p>Hash tables back Python's <span class="inline-code">dict</span> and <span class="inline-code">set</span>, giving average O(1) lookup/insert/delete regardless of how many items are stored &mdash; a huge upgrade over scanning a list (O(n)) to check membership.</p>
  `,
  mount(root, onTaskDone) {
    const keys = [3, 8, 1, 6, 12];
    const size = 5;
    let buckets = Array.from({ length: size }, () => []);
    let idx = 0;

    const status = h('div', { class: 'status-line' }, `Insert queue: ${keys.join(', ')}. Click "Insert next key" to hash it into the table.`);
    const bucketsRow = h('div', { class: 'viz-row' });

    function draw() {
      clear(bucketsRow);
      buckets.forEach((chain, i) => {
        const col = h('div', { style: 'display:flex;flex-direction:column;align-items:center;gap:6px;' });
        col.appendChild(h('div', { class: 'hint-line' }, `bucket ${i}`));
        if (chain.length === 0) col.appendChild(h('div', { class: 'box', style: 'opacity:0.3;' }, '·'));
        chain.forEach((v) => col.appendChild(h('div', { class: 'box' + (chain.length > 1 ? ' hi' : '') }, String(v))));
        bucketsRow.appendChild(col);
      });
    }
    draw();

    const btn = h('button', { class: 'btn primary' }, `Insert next key (${keys[0]})`);
    btn.addEventListener('click', () => {
      if (idx >= keys.length) return;
      const key = keys[idx];
      const b = key % size;
      const collided = buckets[b].length > 0;
      buckets[b].push(key);
      status.textContent = `hash(${key}) = ${key} % ${size} = ${b}.` + (collided ? ` Bucket ${b} already had something — collision! Chained "${key}" onto the list.` : ` Placed in empty bucket ${b}.`);
      idx++;
      draw();
      if (idx >= keys.length) {
        status.textContent += ' All keys inserted.';
        btn.disabled = true;
        onTaskDone();
      } else {
        btn.textContent = `Insert next key (${keys[idx]})`;
      }
    });

    root.appendChild(status);
    root.appendChild(bucketsRow);
    root.appendChild(h('div', { class: 'btn-row' }, [btn]));
  },
  quiz: [
    {
      q: 'What causes a hash collision?',
      options: [
        'Two different keys hash to the same bucket index',
        'The table runs out of memory',
        'A key is inserted twice with the same value',
      ],
      answer: 0,
      explain: 'Since the hash function maps a huge key space into a small number of buckets, different keys landing in the same bucket is expected and must be handled (e.g. chaining).',
    },
    {
      q: 'With good hashing and chaining, average-case lookup time is close to:',
      options: ['O(1)', 'O(n)', 'O(n²)'],
      answer: 0,
      explain: 'If keys spread evenly across buckets, each bucket holds only a handful of items, so lookup stays close to constant time on average.',
    },
  ],
});

// ---------- 11. Doubly Linked Lists ----------
DSA_LEVELS.push({
  id: 'dsa-doubly-linked-list',
  track: 'dsa',
  title: 'Doubly Linked Lists',
  concept: 'Two pointers per node: next AND prev',
  xp: 90,
  intro: 'A doubly linked list gives every node a <span class="inline-code">prev</span> pointer as well as <span class="inline-code">next</span>, so you can walk backward and delete a known node in O(1) without needing to find its predecessor. Work through inserting, deleting, and walking backward.',
  mount(root, onTaskDone) {
    let arr = [10, 20, 30];
    const status = h('div', { class: 'status-line' }, 'Goal: 1) Insert 25 after 20  2) Delete the head (10)  3) Walk the list backward from the tail.');
    const row = h('div', { class: 'viz-row' });
    const goal = ['insert', 'delete', 'back', 'back', 'back'];
    let step = 0;
    let backIdx = -1;

    function draw() {
      clear(row);
      arr.forEach((v, i) => {
        const isBackCursor = backIdx === i;
        row.appendChild(h('div', { class: 'box' + (isBackCursor ? ' hi' : '') }, String(v)));
        if (i < arr.length - 1) row.appendChild(h('div', { class: 'hint-line' }, '⇄'));
      });
    }
    draw();

    function advance(msg) {
      step++;
      if (step >= goal.length) {
        status.textContent = msg + ' Goal complete! Every deletion and backward step here only needed local pointer fixes — no shifting like an array.';
        onTaskDone();
      } else {
        status.textContent = msg;
      }
    }

    const insertBtn = h('button', { class: 'btn' }, 'Insert 25 after 20');
    insertBtn.addEventListener('click', () => {
      if (goal[step] !== 'insert') { status.textContent = 'Try the next step in the goal instead.'; return; }
      const i = arr.indexOf(20);
      arr.splice(i + 1, 0, 25);
      draw();
      advance('Inserted 25: the new node\'s prev/next point to 20 and 30, and THEIR pointers were updated to point back to it.');
    });
    const deleteBtn = h('button', { class: 'btn' }, 'Delete the head');
    deleteBtn.addEventListener('click', () => {
      if (goal[step] !== 'delete') { status.textContent = 'Try the next step in the goal instead.'; return; }
      arr.shift();
      draw();
      advance('Deleted the head: the new head\'s prev pointer was simply set to null — no other node needed to move.');
    });
    const backBtn = h('button', { class: 'btn primary' }, 'Step backward from tail');
    backBtn.addEventListener('click', () => {
      if (goal[step] !== 'back') { status.textContent = 'Insert and delete first, then walk backward.'; return; }
      if (backIdx === -1) backIdx = arr.length - 1;
      else if (backIdx > 0) backIdx--;
      draw();
      advance(`At node ${arr[backIdx]}, walking via its prev pointer.`);
    });

    root.appendChild(status);
    root.appendChild(row);
    root.appendChild(h('div', { class: 'btn-row' }, [insertBtn, deleteBtn, backBtn]));
  },
  quiz: [
    {
      q: 'What does a doubly linked list cost extra, compared to a singly linked list?',
      options: ['Nothing, it\'s strictly better', 'One extra pointer (prev) per node, for the ability to traverse backward and delete in O(1) with a node reference', 'It can only store numbers'],
      answer: 1,
      explain: 'The prev pointer doubles the pointer overhead per node in exchange for backward traversal and cheaper deletion.',
    },
    {
      q: 'Why can a doubly linked list delete a known node in O(1), unlike an array?',
      options: [
        'It can\'t — deletion is always O(n)',
        'The node\'s prev and next neighbors can be relinked directly, without shifting anything else',
        'Doubly linked lists keep a sorted index',
      ],
      answer: 1,
      explain: 'Only two pointers change (the neighbors\' next/prev) — nothing else in the list is touched.',
    },
  ],
});

// ---------- 12. Heaps ----------
DSA_LEVELS.push({
  id: 'dsa-heaps',
  track: 'dsa',
  title: 'Heaps (Priority Queues)',
  concept: 'A complete tree where every parent is smaller than its children',
  xp: 100,
  intro: 'A min-heap keeps the smallest value at the root, with every parent smaller than its children (but siblings can be in any order). Insert by adding to the next open spot, then <strong>sift up</strong> — swap with the parent while it\'s bigger than you.',
  mount(root, onTaskDone) {
    const sequence = [5, 3, 8, 1, 9];
    let heap = [];
    let seqIdx = 0;
    let cursor = -1; // index currently sifting up

    const status = h('div', { class: 'status-line' });
    const treeWrap = h('div', { class: 'tree-wrap' });
    const btnRow = h('div', { class: 'btn-row' });

    function parentOf(i) { return Math.floor((i - 1) / 2); }

    function renderNode(i, isCursor) {
      const circle = h('div', { class: 'tnode' + (isCursor ? ' path' : '') }, String(heap[i]));
      const col = h('div', { style: 'display:flex;flex-direction:column;align-items:center;gap:14px;' });
      col.appendChild(circle);
      const li = 2 * i + 1, ri = 2 * i + 2;
      if (li < heap.length || ri < heap.length) {
        const row = h('div', { style: 'display:flex;gap:30px;' });
        row.appendChild(li < heap.length ? renderNode(li, li === cursor) : h('div', { class: 'tnode slot' }, '·'));
        row.appendChild(ri < heap.length ? renderNode(ri, ri === cursor) : h('div', { class: 'tnode slot' }, '·'));
        col.appendChild(row);
      }
      return col;
    }

    function draw() {
      clear(treeWrap);
      if (heap.length === 0) treeWrap.appendChild(h('div', { class: 'hint-line' }, '(empty heap)'));
      else treeWrap.appendChild(renderNode(0, cursor === 0));
    }

    function renderControls() {
      clear(btnRow);
      if (cursor > 0 && heap[cursor] < heap[parentOf(cursor)]) {
        const swapBtn = h('button', { class: 'btn primary' }, `Sift up: swap ${heap[cursor]} with parent ${heap[parentOf(cursor)]}`);
        swapBtn.addEventListener('click', () => {
          const p = parentOf(cursor);
          [heap[cursor], heap[p]] = [heap[p], heap[cursor]];
          cursor = p;
          draw();
          renderControls();
          status.textContent = cursor > 0 && heap[cursor] < heap[parentOf(cursor)]
            ? `Still smaller than its new parent (${heap[parentOf(cursor)]}) — keep sifting up.`
            : 'In place — the heap property holds here now.';
          if (!(cursor > 0 && heap[cursor] < heap[parentOf(cursor)])) setTimeout(nextInsert, 500);
        });
        btnRow.appendChild(swapBtn);
      }
    }

    function nextInsert() {
      if (seqIdx >= sequence.length) {
        status.textContent = 'All values inserted — the min-heap property (parent ≤ children) holds everywhere. The smallest value is always at the root.';
        clear(btnRow);
        onTaskDone();
        return;
      }
      const v = sequence[seqIdx];
      heap.push(v);
      cursor = heap.length - 1;
      seqIdx++;
      draw();
      if (cursor > 0 && heap[cursor] < heap[parentOf(cursor)]) {
        status.textContent = `Inserted ${v} at the next open spot. It's smaller than its parent (${heap[parentOf(cursor)]}) — sift it up.`;
        renderControls();
      } else {
        status.textContent = `Inserted ${v} — already ≥ its parent, no sifting needed.`;
        clear(btnRow);
        setTimeout(nextInsert, 500);
      }
    }

    root.appendChild(status);
    root.appendChild(treeWrap);
    root.appendChild(btnRow);
    draw();
    nextInsert();
  },
  quiz: [
    {
      q: 'Where is the minimum value always located in a min-heap?',
      options: ['At the root', 'At the last leaf', 'Anywhere — you must search for it'],
      answer: 0,
      explain: 'The heap property (parent ≤ children, applied everywhere) guarantees the smallest value floats to the root.',
    },
    {
      q: 'Why is insert into a heap O(log n) rather than O(n)?',
      options: [
        'A new value only ever sifts up along one root-to-leaf path, whose length is log n in a complete tree',
        'Heaps are always small',
        'It isn\'t — insert is O(n)',
      ],
      answer: 0,
      explain: 'A complete binary tree with n nodes has height about log₂ n, and sifting up touches at most one node per level.',
    },
  ],
});

// ---------- 13. Tree Balancing ----------
DSA_LEVELS.push({
  id: 'dsa-avl-rotation',
  track: 'dsa',
  title: 'Balanced Trees: Why Rotate?',
  concept: 'An unbalanced BST degrades to a linked list — rotations fix it',
  xp: 90,
  intro: 'Insert 10, 20, 30 (already sorted) into a plain BST and you get a straight right-leaning chain — every operation becomes O(n), no better than a linked list. Self-balancing trees (AVL, Red-Black) detect this and fix it with a <strong>rotation</strong>. Try one yourself.',
  mount(root, onTaskDone) {
    const status = h('div', { class: 'status-line' }, 'This is what inserting 10 → 20 → 30 in sorted order produces in a plain BST: a chain, not a tree.');
    const treeWrap = h('div', { class: 'tree-wrap' });
    let rotated = false;

    function drawChain() {
      clear(treeWrap);
      treeWrap.appendChild(h('div', { style: 'display:flex;flex-direction:column;align-items:center;gap:14px;' }, [
        h('div', { class: 'tnode' }, '10'),
        h('div', { style: 'display:flex;gap:30px;' }, [
          h('div', { class: 'tnode slot' }, '·'),
          h('div', { style: 'display:flex;flex-direction:column;align-items:center;gap:14px;' }, [
            h('div', { class: 'tnode path' }, '20'),
            h('div', { style: 'display:flex;gap:30px;' }, [
              h('div', { class: 'tnode slot' }, '·'),
              h('div', { class: 'tnode' }, '30'),
            ]),
          ]),
        ]),
      ]));
    }
    function drawBalanced() {
      clear(treeWrap);
      treeWrap.appendChild(h('div', { style: 'display:flex;flex-direction:column;align-items:center;gap:14px;' }, [
        h('div', { class: 'tnode placed' }, '20'),
        h('div', { style: 'display:flex;gap:30px;' }, [
          h('div', { class: 'tnode placed' }, '10'),
          h('div', { class: 'tnode placed' }, '30'),
        ]),
      ]));
    }
    drawChain();

    const rotateBtn = h('button', { class: 'btn primary' }, 'Rotate left at 10');
    rotateBtn.addEventListener('click', () => {
      if (rotated) return;
      rotated = true;
      drawBalanced();
      status.textContent = 'Rotated! 20 becomes the new root, with 10 and 30 as its children — height dropped from 3 to 2, and every search is faster.';
      rotateBtn.disabled = true;
      onTaskDone();
    });

    root.appendChild(status);
    root.appendChild(treeWrap);
    root.appendChild(h('div', { class: 'btn-row' }, [rotateBtn]));
  },
  quiz: [
    {
      q: 'A plain BST that receives already-sorted input in a straight line will:',
      options: ['Stay perfectly balanced automatically', 'Degrade into a chain, making search/insert O(n) instead of O(log n)', 'Reject the input'],
      answer: 1,
      explain: 'Every new value becomes the right child of the previous one, producing a linked-list shape.',
    },
    {
      q: 'What does a rotation change, structurally?',
      options: [
        'It re-sorts every value in the tree',
        'It locally re-parents a small handful of nodes to reduce height, without breaking the BST ordering property',
        'It deletes the unbalanced nodes',
      ],
      answer: 1,
      explain: 'A rotation is a constant-time, local restructuring — AVL and Red-Black trees run one after certain inserts/deletes to keep height at O(log n).',
    },
  ],
});

// ---------- 14. Quick Sort ----------
DSA_LEVELS.push({
  id: 'dsa-quicksort',
  track: 'dsa',
  title: 'Sorting: Quick Sort (Partition)',
  concept: 'Pick a pivot, partition around it, then recurse',
  xp: 100,
  intro: 'Quick sort picks a <strong>pivot</strong> (here, the last element) and partitions the array so everything smaller ends up on its left and everything bigger on its right — then it recurses on each side. Step through one partition pass.',
  mount(root, onTaskDone) {
    const arr = [7, 2, 8, 4, 1, 9, 3];
    const pivot = arr[arr.length - 1];
    let i = -1; // boundary of the "smaller than pivot" zone
    let j = 0;
    let done = false;

    const barsWrap = h('div', { class: 'bars-wrap' });
    const status = h('div', { class: 'status-line' }, `Pivot = ${pivot} (the last element). Click "Compare next to pivot" to walk through the array.`);

    function draw(activeJ) {
      clear(barsWrap);
      const max = Math.max(...arr);
      arr.forEach((v, idx) => {
        let cls = 'bar';
        if (idx === arr.length - 1) cls += ' active';
        else if (idx <= i) cls += ' sorted';
        if (idx === activeJ) cls += ' active';
        barsWrap.appendChild(h('div', { class: cls, style: `height:${(v / max) * 140 + 20}px;` }, String(v)));
      });
    }
    draw();

    const stepBtn = h('button', { class: 'btn primary' }, 'Compare next to pivot');
    const placeBtn = h('button', { class: 'btn' }, 'Place pivot in final position');
    placeBtn.disabled = true;

    stepBtn.addEventListener('click', () => {
      if (j >= arr.length - 1) return;
      const v = arr[j];
      if (v < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        status.textContent = `${v} < pivot (${pivot}) — swapped into the "smaller" zone (position ${i}).`;
      } else {
        status.textContent = `${v} ≥ pivot (${pivot}) — left where it is.`;
      }
      j++;
      draw(j < arr.length - 1 ? j : undefined);
      if (j >= arr.length - 1) {
        status.textContent += ' Reached the pivot — now place it right after the "smaller" zone.';
        stepBtn.disabled = true;
        placeBtn.disabled = false;
      }
    });

    placeBtn.addEventListener('click', () => {
      const last = arr.length - 1;
      [arr[i + 1], arr[last]] = [arr[last], arr[i + 1]];
      done = true;
      draw();
      status.textContent = `Pivot ${pivot} is now at index ${i + 1} — its FINAL sorted position. Everything left of it is smaller, everything right is bigger. Quick sort now recurses on each side.`;
      placeBtn.disabled = true;
      onTaskDone();
    });

    root.appendChild(status);
    root.appendChild(barsWrap);
    root.appendChild(h('div', { class: 'btn-row' }, [stepBtn, placeBtn]));
  },
  quiz: [
    {
      q: 'After one partition pass, what do we know about the pivot\'s final position?',
      options: [
        'Nothing yet, it might move again',
        'It is in its correct sorted position for good — only the two sides still need sorting',
        'It is always at index 0',
      ],
      answer: 1,
      explain: 'Partitioning guarantees everything left is smaller and everything right is bigger than the pivot, so the pivot never needs to move again.',
    },
    {
      q: 'Quick sort\'s average-case time complexity is O(n log n), but its worst case is:',
      options: ['O(n log n) too, always', 'O(n²), when the pivot is repeatedly the smallest or largest element', 'O(log n)'],
      answer: 1,
      explain: 'A consistently bad pivot choice (e.g. already-sorted input with last-element pivoting) makes partitions maximally unbalanced.',
    },
  ],
});

// ---------- 15. Dijkstra's Algorithm ----------
DSA_LEVELS.push({
  id: 'dsa-dijkstra',
  track: 'dsa',
  title: "Dijkstra's Shortest Path",
  concept: 'Greedily expand from the closest unvisited node',
  xp: 100,
  intro: 'Dijkstra\'s algorithm finds shortest paths from a start node in a weighted graph: repeatedly visit the unvisited node with the smallest known distance, then <strong>relax</strong> its edges (update a neighbor\'s distance if going through this node is shorter).',
  mount(root, onTaskDone) {
    const edges = { A: { B: 4, C: 1 }, C: { B: 2, D: 8 }, B: { D: 5 }, D: { E: 3 }, E: {} };
    const nodes = Object.keys(edges);
    const dist = { A: 0, B: Infinity, C: Infinity, D: Infinity, E: Infinity };
    const visited = new Set();

    const status = h('div', { class: 'status-line' }, 'Starting at A (distance 0), everything else unknown (∞).');
    const table = h('div', { class: 'viz-row' });

    function draw() {
      clear(table);
      nodes.forEach((n) => {
        const box = h('div', { class: 'box' + (visited.has(n) ? ' sorted' : '') });
        box.textContent = `${n}: ${dist[n] === Infinity ? '∞' : dist[n]}`;
        table.appendChild(box);
      });
    }
    draw();

    const btn = h('button', { class: 'btn primary' }, 'Visit next closest node');
    btn.addEventListener('click', () => {
      const unvisited = nodes.filter((n) => !visited.has(n));
      if (unvisited.length === 0) return;
      const current = unvisited.reduce((best, n) => (dist[n] < dist[best] ? n : best), unvisited[0]);
      visited.add(current);
      let log = `Visiting ${current} (distance ${dist[current]}), the closest unvisited node.`;
      Object.entries(edges[current]).forEach(([neighbor, weight]) => {
        const candidate = dist[current] + weight;
        if (candidate < dist[neighbor]) {
          dist[neighbor] = candidate;
          log += ` Relaxed ${current}→${neighbor}: new distance ${candidate}.`;
        }
      });
      draw();
      status.textContent = log;
      if (visited.size === nodes.length) {
        status.textContent += ' All nodes visited — every distance shown is now the true shortest distance from A.';
        btn.disabled = true;
        onTaskDone();
      }
    });

    root.appendChild(status);
    root.appendChild(table);
    root.appendChild(h('div', { class: 'btn-row' }, [btn]));
  },
  quiz: [
    {
      q: 'Why does Dijkstra always visit the closest unvisited node next?',
      options: [
        'Because once it\'s the closest remaining candidate, no other path (through still-unvisited, farther nodes) could possibly reach it more cheaply',
        'It doesn\'t matter which order you visit nodes in',
        'To visit nodes alphabetically',
      ],
      answer: 0,
      explain: 'This greedy choice is the crux of why Dijkstra is correct: a shorter path through a farther, unvisited node is impossible since all edge weights are non-negative.',
    },
    {
      q: 'Dijkstra\'s algorithm does NOT work correctly if the graph has:',
      options: ['More than 5 nodes', 'Negative edge weights', 'Cycles'],
      answer: 1,
      explain: 'Negative weights break the greedy assumption — a "closest" node might later be beaten by a path through a negative edge. (Bellman-Ford handles that case.)',
    },
  ],
});

// ---------- 16. Topological Sort ----------
DSA_LEVELS.push({
  id: 'dsa-topological-sort',
  track: 'dsa',
  title: 'Topological Sort',
  concept: 'Order tasks so every prerequisite comes first',
  xp: 90,
  intro: 'A topological sort orders the nodes of a DAG (directed, acyclic graph) so every edge points forward — perfect for course prerequisites or build steps. Repeatedly "take" any course whose prerequisites are already done.',
  mount(root, onTaskDone) {
    const deps = { CS101: [], MATH101: [], CS201: ['CS101'], CS301: ['CS201', 'MATH101'], CS401: ['CS301'] };
    const taken = new Set();
    const order = [];
    const allNodes = Object.keys(deps);

    const status = h('div', { class: 'status-line' }, 'Click any course whose prerequisites are already taken.');
    const grid = h('div', { class: 'viz-row' });
    const orderLine = h('div', { class: 'hint-line' }, 'Order so far: (none yet)');

    function ready(n) { return deps[n].every((d) => taken.has(d)); }

    function draw() {
      clear(grid);
      allNodes.forEach((n) => {
        if (taken.has(n)) return;
        const box = h('div', { class: 'box' + (ready(n) ? ' hi' : '') });
        box.appendChild(document.createTextNode(n));
        const reqLine = h('span', { class: 'idx' }, deps[n].length ? `needs ${deps[n].join(', ')}` : 'no prereqs');
        box.appendChild(reqLine);
        box.addEventListener('click', () => {
          if (!ready(n)) {
            status.textContent = `${n} still needs: ${deps[n].filter((d) => !taken.has(d)).join(', ')}.`;
            return;
          }
          taken.add(n);
          order.push(n);
          orderLine.textContent = 'Order so far: ' + order.join(' → ');
          status.textContent = `Took ${n}. ${allNodes.length - taken.size} course(s) left.`;
          draw();
          if (taken.size === allNodes.length) {
            status.textContent += ' Every prerequisite is satisfied in this order — that\'s a valid topological sort.';
            onTaskDone();
          }
        });
        grid.appendChild(box);
      });
    }
    draw();

    root.appendChild(status);
    root.appendChild(grid);
    root.appendChild(orderLine);
  },
  quiz: [
    {
      q: 'Topological sort only makes sense on a graph that is:',
      options: ['Directed and acyclic (a DAG)', 'Undirected', 'Weighted'],
      answer: 0,
      explain: 'A cycle would mean two nodes each require the other first — no valid order could satisfy that.',
    },
    {
      q: 'The "take any node whose prerequisites are done" approach used here is known as:',
      options: ["Kahn's algorithm (repeatedly removing zero-in-degree nodes)", "Dijkstra's algorithm", 'Binary search'],
      answer: 0,
      explain: 'Kahn\'s algorithm tracks in-degree (remaining unmet prerequisites) and repeatedly takes nodes that reach zero.',
    },
  ],
});

// ---------- 17. Union-Find ----------
DSA_LEVELS.push({
  id: 'dsa-union-find',
  track: 'dsa',
  title: 'Union-Find (Disjoint Sets)',
  concept: 'Track which elements are connected, efficiently',
  xp: 90,
  intro: 'Union-Find tracks groups of connected elements with two operations: <span class="inline-code">union(a, b)</span> merges two groups, and <span class="inline-code">find(a)</span> tells you which group <span class="inline-code">a</span> belongs to. It\'s the engine behind cycle detection and Kruskal\'s minimum spanning tree.',
  mount(root, onTaskDone) {
    const items = ['A', 'B', 'C', 'D', 'E', 'F'];
    const colors = ['#f2711c', '#17a865', '#2563eb', '#a855f7', '#eab308', '#ec4899'];
    let group = {}; // item -> color index
    items.forEach((it, i) => { group[it] = i; });
    const unions = [['A', 'B'], ['C', 'D'], ['B', 'C']];
    let unionIdx = 0;

    const status = h('div', { class: 'status-line' }, `Perform this queue of unions: ${unions.map((u) => `union(${u[0]},${u[1]})`).join(', ')}.`);
    const row = h('div', { class: 'viz-row' });

    function draw() {
      clear(row);
      items.forEach((it) => {
        const box = h('div', { class: 'box' }, it);
        box.style.borderColor = colors[group[it]];
        box.style.boxShadow = `0 0 0 2px ${colors[group[it]]}33`;
        row.appendChild(box);
      });
    }
    draw();

    const unionBtn = h('button', { class: 'btn primary' }, `Union(${unions[0][0]}, ${unions[0][1]})`);
    const findBtn = h('button', { class: 'btn' }, 'Check: are A and D connected?');
    findBtn.style.display = 'none';

    unionBtn.addEventListener('click', () => {
      const [a, b] = unions[unionIdx];
      const from = group[b];
      const to = group[a];
      items.forEach((it) => { if (group[it] === from) group[it] = to; });
      unionIdx++;
      draw();
      if (unionIdx >= unions.length) {
        status.textContent = `Unioned ${a} and ${b}. All unions done — now check connectivity.`;
        unionBtn.style.display = 'none';
        findBtn.style.display = '';
      } else {
        status.textContent = `Unioned ${a} and ${b} — same color now. Next: union(${unions[unionIdx][0]}, ${unions[unionIdx][1]}).`;
        unionBtn.textContent = `Union(${unions[unionIdx][0]}, ${unions[unionIdx][1]})`;
      }
    });

    findBtn.addEventListener('click', () => {
      const connected = group['A'] === group['D'];
      status.textContent = connected
        ? 'find(A) == find(D): YES, they\'re connected — A-B, C-D, and B-C chain them all together.'
        : 'find(A) != find(D): not connected.';
      findBtn.disabled = true;
      onTaskDone();
    });

    root.appendChild(status);
    root.appendChild(row);
    root.appendChild(h('div', { class: 'btn-row' }, [unionBtn, findBtn]));
  },
  quiz: [
    {
      q: 'After union(A,B), union(C,D), and union(B,C), which of these is true?',
      options: ['A, B, C, and D are all in the same group', 'Only B and C are connected', 'Nothing is connected'],
      answer: 0,
      explain: 'Union is transitive through shared elements: A-B and B-C and C-D chain everything into one group.',
    },
    {
      q: 'What is "path compression" used for in a real Union-Find implementation?',
      options: [
        'Making find() flatten the tree so future lookups are nearly O(1)',
        'Compressing the data to save memory',
        'Sorting the elements',
      ],
      answer: 0,
      explain: 'Path compression re-points nodes directly to their root during find(), so repeated queries get faster over time.',
    },
  ],
});

// ---------- 18. Dynamic Programming: 0/1 Knapsack ----------
DSA_LEVELS.push({
  id: 'dsa-knapsack',
  track: 'dsa',
  title: 'Dynamic Programming: 0/1 Knapsack',
  concept: 'At each item, either skip it or take it — whichever is better',
  xp: 100,
  intro: 'You have a bag with capacity 7. For each item you can only skip or take it (no splitting). The DP idea: for item <span class="inline-code">i</span> and remaining capacity <span class="inline-code">w</span>, the best value is <span class="inline-code">max(skip it, take it + best value with the leftover capacity)</span>. Work out the final decision.',
  mount(root, onTaskDone) {
    const capacity = 7;
    const items = [{ w: 2, v: 3 }, { w: 3, v: 4 }, { w: 4, v: 5 }, { w: 5, v: 6 }];
    // Precomputed best value using only the first 3 items, for each capacity (given to the learner).
    const bestWithout = { 0: 0, 1: 0, 2: 3, 3: 4, 4: 7, 5: 8, 6: 9, 7: 9 };
    const last = items[3]; // w:5, v:6

    const status = h('div', { class: 'status-line' }, 'Table for the first 3 items is already filled in below. Now decide the last item (weight 5, value 6) at full capacity (7).');
    const info = h('div', {});
    info.appendChild(codeBlock(`best_without_last_item[7] = ${bestWithout[7]}   # already known\nskip_value  = best_without_last_item[7]              = ${bestWithout[7]}\ntake_value  = ${last.v} + best_without_last_item[7 - ${last.w}] = ${last.v} + ${bestWithout[capacity - last.w]} = ${last.v + bestWithout[capacity - last.w]}`, 'js'));

    const skipVal = bestWithout[capacity];
    const takeVal = last.v + bestWithout[capacity - last.w];
    const correct = Math.max(skipVal, takeVal);

    const btnRow = h('div', { class: 'btn-row' });
    const skipBtn = h('button', { class: 'btn' }, `Skip it → value = ${skipVal}`);
    const takeBtn = h('button', { class: 'btn' }, `Take it → value = ${takeVal}`);
    [[skipBtn, skipVal], [takeBtn, takeVal]].forEach(([btn, val]) => {
      btn.addEventListener('click', () => {
        if (val === correct) {
          status.textContent = `Correct — ${val} is the best you can do. max(skip=${skipVal}, take=${takeVal}) = ${correct}.`;
          skipBtn.disabled = true;
          takeBtn.disabled = true;
          onTaskDone();
        } else {
          status.textContent = `That's worse than the other option — DP always takes the max of the two choices. Try the other button.`;
        }
      });
    });
    btnRow.appendChild(skipBtn);
    btnRow.appendChild(takeBtn);

    root.appendChild(status);
    root.appendChild(info);
    root.appendChild(btnRow);
  },
  quiz: [
    {
      q: 'Why is this called "0/1" knapsack?',
      options: ['You can only take 0 or 1 items total', 'Each item is either fully taken (1) or fully skipped (0) — no partial items', 'It only works with binary numbers'],
      answer: 1,
      explain: 'The "fractional knapsack" variant (where you can take part of an item) is solved differently, greedily.',
    },
    {
      q: 'What makes this a dynamic programming problem rather than plain recursion?',
      options: [
        'It looks up already-solved smaller subproblems (best value at smaller capacities) instead of recomputing them',
        'It uses a for loop',
        'It only works on sorted items',
      ],
      answer: 0,
      explain: 'Just like memoized Fibonacci, the DP table reuses previously computed "best value at capacity w" answers instead of recursing from scratch.',
    },
  ],
});
