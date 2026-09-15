const DSA_LEVELS = [];

// ---------- 1. Big-O Basics ----------
DSA_LEVELS.push({
  id: 'dsa-big-o',
  track: 'dsa',
  title: 'Big-O Basics',
  concept: 'How we measure algorithm speed',
  xp: 60,
  intro: 'Big-O describes how an algorithm\'s work grows as the input size <span class="inline-code">n</span> grows. It ignores constants and focuses on the trend. Drag/click to reorder these six growth rates from <strong>fastest</strong> to <strong>slowest</strong>.',
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
        status.textContent = `${v} became the root (tree was empty). Next value: ${sequence[seqIdx + 1] ?? '(done)'}.`;
        seqIdx++;
        cursor = null;
        draw();
        renderControls();
        if (seqIdx >= sequence.length) finish();
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
