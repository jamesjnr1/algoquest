const R_LEVELS = [];

function runRounds(container, rounds, onAllDone) {
  let i = 0;
  function next() {
    clear(container);
    if (i >= rounds.length) { onAllDone(); return; }
    rounds[i].render(container, () => { i++; next(); });
  }
  next();
}

function renderVectorPicker(container, vector, exprHtml, expectedIdx1, onCorrect) {
  const wrap = h('div', {});
  const exprLine = h('div', { class: 'quiz-q' });
  exprLine.innerHTML = exprHtml;
  wrap.appendChild(exprLine);
  wrap.appendChild(h('div', { class: 'hint-line' }, 'Remember: R vectors are indexed starting at 1. Click every box the expression would keep, then submit.'));
  const row = h('div', { class: 'viz-row' });
  const selected = new Set();
  vector.forEach((v, i) => {
    const idx1 = i + 1;
    const box = h('div', { class: 'box' }, String(v));
    box.appendChild(h('span', { class: 'idx' }, `[${idx1}]`));
    box.addEventListener('click', () => {
      if (selected.has(idx1)) { selected.delete(idx1); box.classList.remove('picked'); }
      else { selected.add(idx1); box.classList.add('picked'); }
    });
    row.appendChild(box);
  });
  wrap.appendChild(row);
  const status = h('div', { class: 'status-line' });
  wrap.appendChild(status);
  const submit = h('button', { class: 'btn primary' }, 'Submit selection');
  submit.addEventListener('click', () => {
    const got = Array.from(selected).sort((a, b) => a - b);
    const want = expectedIdx1.slice().sort((a, b) => a - b);
    const ok = got.length === want.length && got.every((v, i) => v === want[i]);
    if (ok) {
      status.textContent = 'Correct!';
      status.style.color = 'var(--good)';
      onCorrect();
    } else {
      status.textContent = 'Not quite — check which elements the expression really keeps, then try again.';
      status.style.color = 'var(--bad)';
    }
  });
  wrap.appendChild(submit);
  container.appendChild(wrap);
}

// ---------- 1. Variables & Vectors ----------
R_LEVELS.push({
  id: 'r-basics',
  track: 'r',
  title: 'Variables & Vectors',
  concept: 'R\'s core building block: the vector',
  xp: 60,
  intro: 'In R, even a single number is a vector of length 1. You build vectors with <span class="inline-code">c(...)</span> ("combine"). Click the correct values, in order, to build the target vector.',
  mount(root, onTaskDone) {
    const target = [4, 8, 15, 16, 23];
    const pool = shuffle([...target, 7, 42, 99]);
    let current = [];
    const codeLine = h('div', {});
    const status = h('div', { class: 'status-line' }, `Build: x <- c(${target.join(', ')})`);
    const poolRow = h('div', { class: 'btn-row' });

    function drawCode() {
      clear(codeLine);
      codeLine.appendChild(codeBlock(`x <- c(${current.join(', ')})`, 'r'));
    }
    drawCode();

    pool.forEach((v) => {
      const btn = h('button', { class: 'btn' }, String(v));
      btn.addEventListener('click', () => {
        const need = target[current.length];
        if (v === need) {
          current.push(v);
          drawCode();
          if (current.length === target.length) {
            status.textContent = `Done! x <- c(${target.join(', ')}) — a vector of ${target.length} numbers.`;
            status.style.color = 'var(--good)';
            onTaskDone();
          } else {
            status.textContent = `Good — next value needed: ${target[current.length]}`;
          }
        } else {
          status.textContent = `Not yet — the next value we need is ${need}, not ${v}.`;
          status.style.color = 'var(--bad)';
        }
      });
      poolRow.appendChild(btn);
    });

    root.appendChild(status);
    root.appendChild(codeLine);
    root.appendChild(poolRow);
  },
  quiz: [
    {
      q: 'What does <span class="inline-code">c(1, 2, 3)</span> create in R?',
      options: ['A list of three separate variables', 'A numeric vector of length 3', 'A 3x1 matrix only'],
      answer: 1,
      explain: '<span class="inline-code">c()</span> combines values into a single vector — the most common R data structure.',
    },
    {
      q: 'If <span class="inline-code">x <- c(1, 2, 3)</span>, what does <span class="inline-code">length(x)</span> return?',
      options: ['1', '3', 'NULL'],
      answer: 1,
      explain: '<span class="inline-code">length()</span> counts the elements in the vector — there are three.',
    },
  ],
});

// ---------- 2. Vectorization ----------
R_LEVELS.push({
  id: 'r-vectorization',
  track: 'r',
  title: 'Vectorized Thinking',
  concept: 'Why R code rarely needs explicit loops',
  xp: 70,
  intro: 'R operations apply to whole vectors at once. <span class="inline-code">v * 2</span> doubles every element in one shot — no loop required. First feel the loop way, then the vectorized way.',
  mount(root, onTaskDone) {
    const v = [10, 20, 30, 40, 50];
    let i = 0;
    const results = h('div', { class: 'viz-row' });
    const status = h('div', { class: 'status-line' }, 'Step 1: simulate a manual loop. Click "Step loop" for each element.');
    const codeWrap = h('div', {});
    codeWrap.appendChild(codeBlock('# the "manual loop" way\nresult <- numeric(length(v))\nfor (i in seq_along(v)) {\n  result[i] <- v[i] * 2\n}', 'r'));
    codeWrap.appendChild(codeBlock('# the vectorized R way\nresult <- v * 2', 'r'));

    function drawResults(upto) {
      clear(results);
      v.forEach((val, idx) => {
        const done = idx < upto;
        results.appendChild(h('div', { class: 'box' + (done ? ' sorted' : '') }, done ? String(val * 2) : '?'));
      });
    }
    drawResults(0);

    const loopBtn = h('button', { class: 'btn' }, 'Step loop (compute next element)');
    const vecBtn = h('button', { class: 'btn primary' }, 'Run v * 2 (vectorized)');
    vecBtn.disabled = true;

    loopBtn.addEventListener('click', () => {
      i++;
      drawResults(i);
      if (i >= v.length) {
        status.textContent = `Loop finished after ${v.length} manual steps. Now try the vectorized way — one operation for the whole vector.`;
        loopBtn.disabled = true;
        vecBtn.disabled = false;
      } else {
        status.textContent = `Computed element ${i} of ${v.length} manually.`;
      }
    });

    vecBtn.addEventListener('click', () => {
      drawResults(0);
      drawResults(v.length);
      status.textContent = `v * 2 computed all ${v.length} results in a single vectorized operation — this is idiomatic, faster R code.`;
      vecBtn.disabled = true;
      onTaskDone();
    });

    root.appendChild(status);
    root.appendChild(h('div', { class: 'hint-line' }, `v <- c(${v.join(', ')})`));
    root.appendChild(results);
    root.appendChild(h('div', { class: 'btn-row' }, [loopBtn, vecBtn]));
    root.appendChild(h('div', { class: 'section-title' }, 'Both approaches, side by side:'));
    root.appendChild(codeWrap);
  },
  quiz: [
    {
      q: 'What does <span class="inline-code">c(1, 2, 3) + c(10, 10, 10)</span> evaluate to?',
      options: ['c(11, 12, 13)', 'An error — vectors can\'t be added', '6 (the sum of everything)'],
      answer: 0,
      explain: 'R adds element-by-element (vectorized): 1+10, 2+10, 3+10.',
    },
    {
      q: 'Why do R programmers prefer vectorized code over explicit for-loops when possible?',
      options: ['Loops are illegal in R', 'Vectorized operations are typically clearer and much faster (implemented in optimized C internally)', 'Vectorized code uses less RAM in every case'],
      answer: 1,
      explain: 'R\'s vectorized builtins run compiled, optimized code under the hood, avoiding the overhead of interpreting a loop line-by-line.',
    },
  ],
});

// ---------- 3. Indexing & Subsetting ----------
R_LEVELS.push({
  id: 'r-indexing',
  track: 'r',
  title: 'Indexing & Subsetting',
  concept: '1-based indexing, negative indices, and logical masks',
  xp: 80,
  intro: 'R indexing starts at 1 (not 0!). You can also select with a range, drop elements with negative indices, or filter with a logical condition. Work through three subsetting expressions on <span class="inline-code">x <- c(10, 20, 30, 40, 50, 60)</span>.',
  mount(root, onTaskDone) {
    const x = [10, 20, 30, 40, 50, 60];
    const rounds = [
      { render: (c, done) => renderVectorPicker(c, x, 'x[2:4]', [2, 3, 4], done) },
      { render: (c, done) => renderVectorPicker(c, x, 'x[-1]  <span class="hint-line">(negative index means "drop this one")</span>', [2, 3, 4, 5, 6], done) },
      { render: (c, done) => renderVectorPicker(c, x, 'x[x > 30]  <span class="hint-line">(keep elements where the condition is TRUE)</span>', [4, 5, 6], done) },
    ];
    const roundWrap = h('div', {});
    root.appendChild(h('div', { class: 'hint-line' }, `x <- c(${x.join(', ')})   —  3 rounds`));
    root.appendChild(roundWrap);
    runRounds(roundWrap, rounds, onTaskDone);
  },
  quiz: [
    {
      q: 'What is <span class="inline-code">x[1]</span> for <span class="inline-code">x <- c(10, 20, 30)</span>?',
      options: ['10', '20', 'Error — indices start at 0'],
      answer: 0,
      explain: 'Unlike Python/JS, R vectors are 1-indexed, so x[1] is the first element.',
    },
    {
      q: 'What does <span class="inline-code">x[-2]</span> do?',
      options: ['Returns the 2nd element only', 'Returns everything except the 2nd element', 'Returns the element at index -2, causing an error'],
      answer: 1,
      explain: 'A negative index means "exclude this position" — the rest of the vector comes back.',
    },
  ],
});

// ---------- 4. Data Frames ----------
R_LEVELS.push({
  id: 'r-dataframes',
  track: 'r',
  title: 'Data Frames',
  concept: 'R\'s table type: columns of vectors, rows of observations',
  xp: 90,
  intro: 'A data frame is R\'s table: each column is a vector (all the same length), and each row is one observation. Columns are usually pulled out with <span class="inline-code">df$column</span>, and rows are filtered with <span class="inline-code">df[condition, ]</span>.',
  mount(root, onTaskDone) {
    const rows = [
      { name: 'Ann', age: 22, score: 88 },
      { name: 'Ben', age: 17, score: 73 },
      { name: 'Cid', age: 19, score: 91 },
      { name: 'Dee', age: 16, score: 65 },
      { name: 'Eve', age: 25, score: 79 },
    ];
    const cols = ['name', 'age', 'score'];

    function buildTable({ selectCol, selectRowsPred, highlightRows }) {
      const table = h('table', { class: 'df-table' });
      const thead = h('tr');
      cols.forEach((c) => {
        const th = h('th', { class: selectCol === c ? 'sel' : '' }, c);
        thead.appendChild(th);
      });
      table.appendChild(thead);
      rows.forEach((r) => {
        const isSel = highlightRows && highlightRows.has(r);
        const tr = h('tr', { class: isSel ? 'sel' : '' });
        cols.forEach((c) => tr.appendChild(h('td', {}, String(r[c]))));
        table.appendChild(tr);
      });
      return table;
    }

    const roundWrap = h('div', {});
    root.appendChild(h('div', { class: 'hint-line' }, 'df has columns: name, age, score — 5 rows.'));
    root.appendChild(roundWrap);

    const round1 = {
      render(container, done) {
        const wrap = h('div', {});
        const q = h('div', { class: 'quiz-q' });
        q.innerHTML = 'Click the column header that <span class="inline-code">df$age</span> would select.';
        wrap.appendChild(q);
        const table = buildTable({});
        Array.from(table.rows[0].cells).forEach((th, i) => {
          th.style.cursor = 'pointer';
          th.addEventListener('click', () => {
            if (cols[i] === 'age') { th.classList.add('sel'); status.textContent = 'Correct!'; status.style.color = 'var(--good)'; done(); }
            else { status.textContent = `"${cols[i]}" isn't the age column — try again.`; status.style.color = 'var(--bad)'; }
          });
        });
        const status = h('div', { class: 'status-line' });
        wrap.appendChild(table);
        wrap.appendChild(status);
        container.appendChild(wrap);
      },
    };

    const round2 = {
      render(container, done) {
        const wrap = h('div', {});
        const q = h('div', { class: 'quiz-q' });
        q.innerHTML = 'Click every row where <span class="inline-code">age > 18</span> (what <span class="inline-code">df[df$age > 18, ]</span> would keep), then submit.';
        wrap.appendChild(q);
        const selected = new Set();
        const table = buildTable({});
        Array.from(table.rows).slice(1).forEach((tr, i) => {
          tr.style.cursor = 'pointer';
          tr.addEventListener('click', () => {
            if (selected.has(i)) { selected.delete(i); tr.classList.remove('sel'); }
            else { selected.add(i); tr.classList.add('sel'); }
          });
        });
        const status = h('div', { class: 'status-line' });
        const submit = h('button', { class: 'btn primary' }, 'Submit');
        submit.addEventListener('click', () => {
          const want = new Set(rows.map((r, i) => i).filter((i) => rows[i].age > 18));
          const got = selected;
          const ok = got.size === want.size && Array.from(got).every((i) => want.has(i));
          if (ok) { status.textContent = 'Correct!'; status.style.color = 'var(--good)'; done(); }
          else { status.textContent = 'Not quite — recheck which ages are above 18.'; status.style.color = 'var(--bad)'; }
        });
        wrap.appendChild(table);
        wrap.appendChild(status);
        wrap.appendChild(submit);
        container.appendChild(wrap);
      },
    };

    const round3 = {
      render(container, done) {
        const wrap = h('div', {});
        renderQuiz(wrap, [{
          q: 'Which line adds a new column called <span class="inline-code">pass</span> that is TRUE when <span class="inline-code">score >= 75</span>?',
          options: [
            'df$pass &lt;- df$score &gt;= 75',
            'df.pass &lt;- df$score &gt;= 75',
            'pass(df$score &gt;= 75)',
          ],
          answer: 0,
          explain: 'Assign straight into a new column name with $ — R creates it if it doesn\'t exist yet.',
        }], done);
        container.appendChild(wrap);
      },
    };

    runRounds(roundWrap, [round1, round2, round3], onTaskDone);
  },
  quiz: [
    {
      q: 'Which two expressions both select the age column?',
      options: ['df$age  and  df[, "age"]', 'df$age  and  df[age]', 'df.age  and  df{age}'],
      answer: 0,
      explain: 'df$age and df[, "age"] are equivalent ways to pull out a column by name.',
    },
    {
      q: '<span class="inline-code">nrow(df)</span> and <span class="inline-code">ncol(df)</span> tell you:',
      options: ['The number of rows and columns', 'The row and column with the max value', 'Nothing useful for data frames'],
      answer: 0,
      explain: 'nrow/ncol report the dimensions of the table — handy for sanity-checking data after filtering.',
    },
  ],
});

// ---------- 5. Functions & Control Flow ----------
R_LEVELS.push({
  id: 'r-functions',
  track: 'r',
  title: 'Functions & Control Flow',
  concept: 'Writing your own functions, if/else, and for-in loops',
  xp: 80,
  intro: 'Functions in R are written with <span class="inline-code">function(args) { ... }</span> and the last evaluated expression (or an explicit <span class="inline-code">return()</span>) is what comes back. Complete two short functions.',
  mount(root, onTaskDone) {
    const roundWrap = h('div', {});
    root.appendChild(roundWrap);

    const round1 = {
      render(container, done) {
        const wrap = h('div', {});
        wrap.appendChild(h('div', { class: 'quiz-q' }, 'Fill in the blank so this function sums only the positive numbers in a vector:'));
        wrap.appendChild(codeBlock('sum_positive <- function(v) {\n  total <- 0\n  for (x in v) {\n    if (___) {\n      total <- total + x\n    }\n  }\n  return(total)\n}', 'r'));
        const opts = h('div', { class: 'quiz-opts' });
        const choices = ['x > 0', 'x = 0', 'total > 0'];
        const status = h('div', { class: 'status-line' });
        choices.forEach((c, i) => {
          const b = h('button', { class: 'opt-btn' }, c);
          b.addEventListener('click', () => {
            if (i === 0) { b.classList.add('correct'); status.textContent = 'Right — only add x when it\'s positive.'; status.style.color = 'var(--good)'; done(); }
            else { b.classList.add('wrong'); status.textContent = 'Think about what condition means "x is positive".'; status.style.color = 'var(--bad)'; }
          });
          opts.appendChild(b);
        });
        wrap.appendChild(opts);
        wrap.appendChild(status);
        container.appendChild(wrap);
      },
    };

    const round2 = {
      render(container, done) {
        const wrap = h('div', {});
        renderQuiz(wrap, [{
          q: 'What does this print?<br/>' + `<pre class="code-block">greet &lt;- function(name = "friend") {\n  paste("Hello,", name)\n}\ngreet()</pre>`,
          options: ['"Hello, friend"', '"Hello, "', 'Error: argument "name" is missing'],
          answer: 0,
          explain: 'name has a default value ("friend"), so calling greet() with no arguments uses it.',
        }], done);
        container.appendChild(wrap);
      },
    };

    runRounds(roundWrap, [round1, round2], onTaskDone);
  },
  quiz: [
    {
      q: '<span class="inline-code">for (x in c(1,2,3)) { ... }</span> — what does x take on?',
      options: ['The values 1, then 2, then 3, one per iteration', 'Always the whole vector c(1,2,3)', 'The index positions 1, 2, 3 — never the values'],
      answer: 0,
      explain: 'R\'s for-in loop iterates over the actual elements of the vector, not index numbers.',
    },
    {
      q: 'In a function, if there\'s no explicit <span class="inline-code">return()</span>, what is returned?',
      options: ['Nothing, ever', 'The value of the last evaluated expression', 'Always NULL'],
      answer: 1,
      explain: 'R functions implicitly return whatever the last line evaluates to.',
    },
  ],
});

// ---------- 6. Apply family & stats ----------
R_LEVELS.push({
  id: 'r-apply-stats',
  track: 'r',
  title: 'Apply Family & Quick Stats',
  concept: 'sapply/lapply for repeated operations, and one-line summary stats',
  xp: 80,
  intro: 'Instead of writing loops, the apply family (<span class="inline-code">sapply</span>, <span class="inline-code">lapply</span>) applies a function to every element and collects the results. Match each snippet to what it computes.',
  mount(root, onTaskDone) {
    const pairs = [
      { id: 'a', code: 'mean(x)', desc: 'The average of all values in x' },
      { id: 'b', code: 'sd(x)', desc: 'How spread out the values are (standard deviation)' },
      { id: 'c', code: 'sapply(x, sqrt)', desc: 'Applies sqrt() to every element, returns a vector of results' },
      { id: 'd', code: 'summary(x)', desc: 'Min, 1st quartile, median, mean, 3rd quartile, max — all at once' },
    ];
    const codes = shuffle(pairs.map((p) => ({ id: p.id, label: p.code })));
    const descs = shuffle(pairs.map((p) => ({ id: p.id, label: p.desc })));
    let selectedCode = null;
    let matched = 0;
    const status = h('div', { class: 'status-line' }, 'Click a code snippet, then click the description it matches.');

    const codeCol = h('div', { style: 'display:flex;flex-direction:column;gap:8px;min-width:180px;' });
    const descCol = h('div', { style: 'display:flex;flex-direction:column;gap:8px;flex:1;' });
    const codeBtns = {};
    const descBtns = {};

    codes.forEach((c) => {
      const b = h('button', { class: 'opt-btn' });
      b.innerHTML = `<span class="inline-code">${c.label}</span>`;
      b.addEventListener('click', () => {
        if (b.classList.contains('correct')) return;
        Object.values(codeBtns).forEach((x) => x.classList.remove('sel'));
        selectedCode = c;
        b.style.borderColor = 'var(--accent-2)';
      });
      codeBtns[c.id] = b;
      codeCol.appendChild(b);
    });

    descs.forEach((d) => {
      const b = h('button', { class: 'opt-btn' }, d.label);
      b.addEventListener('click', () => {
        if (b.classList.contains('correct') || !selectedCode) return;
        if (selectedCode.id === d.id) {
          b.classList.add('correct');
          codeBtns[selectedCode.id].classList.add('correct');
          codeBtns[selectedCode.id].style.borderColor = '';
          matched++;
          status.textContent = `Matched! (${matched}/${pairs.length})`;
          status.style.color = 'var(--good)';
          selectedCode = null;
          if (matched === pairs.length) {
            status.textContent = 'All matched! ' + status.textContent;
            onTaskDone();
          }
        } else {
          b.classList.add('wrong');
          codeBtns[selectedCode.id].style.borderColor = 'var(--bad)';
          status.textContent = 'Not a match — try again.';
          status.style.color = 'var(--bad)';
          setTimeout(() => { b.classList.remove('wrong'); codeBtns[selectedCode.id].style.borderColor = ''; }, 700);
          selectedCode = null;
        }
      });
      descBtns[d.id] = b;
      descCol.appendChild(b);
    });

    root.appendChild(status);
    root.appendChild(h('div', { style: 'display:flex;gap:24px;margin-top:14px;flex-wrap:wrap;' }, [codeCol, descCol]));
  },
  quiz: [
    {
      q: '<span class="inline-code">sapply(1:5, function(i) i^2)</span> returns:',
      options: ['c(1, 4, 9, 16, 25)', 'A single number: 25', 'A list of five separate variables'],
      answer: 0,
      explain: 'sapply applies the function to each element of 1:5 and simplifies the results into a vector.',
    },
    {
      q: 'You want the middle value and overall spread of a numeric vector in one line. Use:',
      options: ['length(x)', 'summary(x)', 'class(x)'],
      answer: 1,
      explain: 'summary() gives min, quartiles, mean, and max in a single call — great for quick exploration.',
    },
  ],
});
