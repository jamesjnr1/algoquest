function h(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null) continue;
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, v);
  }
  (Array.isArray(children) ? children : [children]).forEach((c) => {
    if (c == null) return;
    node.appendChild(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(c) : c);
  });
  return node;
}

function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

// Simple syntax highlight for R / pseudocode snippets shown in <pre class="code-block">
function codeBlock(src, lang) {
  const kws = lang === 'r'
    ? /\b(function|if|else|for|while|return|TRUE|FALSE|NULL|in|repeat|break|next)\b/g
    : /\b(function|if|else|for|while|return|let|const|var|break|continue)\b/g;
  let out = src
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/(#.*$)/gm, '<span class="cm">$1</span>')
    .replace(/(\/\/.*$)/gm, '<span class="cm">$1</span>')
    .replace(/"([^"]*)"/g, '<span class="str">"$1"</span>')
    .replace(/\b(\d+\.?\d*)\b/g, '<span class="num">$1</span>')
    .replace(kws, '<span class="kw">$1</span>');
  const pre = h('pre', { class: 'code-block' });
  pre.innerHTML = out;
  return pre;
}

function inlineCode(text) {
  const c = h('span', { class: 'inline-code' }, text);
  return c;
}

// Renders a one-question-at-a-time quiz. questions: [{q, options:[...], answer: idx, explain}]
function renderQuiz(root, questions, onDone) {
  let idx = 0;
  function renderQ() {
    clear(root);
    const q = questions[idx];
    const wrap = h('div', { class: 'quiz' });
    wrap.appendChild(h('div', { class: 'quiz-progress' }, `Check ${idx + 1} of ${questions.length}`));
    const qEl = h('div', { class: 'quiz-q' });
    qEl.innerHTML = q.q;
    wrap.appendChild(qEl);
    const optsWrap = h('div', { class: 'quiz-opts' });
    let answered = false;
    const explainBox = h('div', { class: 'quiz-explain' });
    const nextBtn = h('button', { class: 'btn primary' }, idx === questions.length - 1 ? 'Finish' : 'Next');
    nextBtn.disabled = true;
    nextBtn.addEventListener('click', () => {
      if (nextBtn.disabled) return;
      nextBtn.disabled = true;
      idx++;
      if (idx >= questions.length) onDone();
      else renderQ();
    });
    q.options.forEach((opt, i) => {
      const btn = h('button', { class: 'opt-btn' });
      btn.innerHTML = opt;
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const correct = i === q.answer;
        btn.classList.add(correct ? 'correct' : 'wrong');
        if (!correct) optsWrap.children[q.answer].classList.add('correct');
        explainBox.textContent = q.explain || '';
        explainBox.classList.add('show');
        nextBtn.disabled = false;
      });
      optsWrap.appendChild(btn);
    });
    wrap.appendChild(optsWrap);
    wrap.appendChild(explainBox);
    wrap.appendChild(nextBtn);
    root.appendChild(wrap);
  }
  renderQ();
}

// Click-to-reorder list. items: [{id, label}], correctOrder: array of ids in correct order.
function renderOrderChallenge(root, items, correctOrder, onSolved) {
  let order = shuffle(items);
  let selected = null;
  const list = h('div', { class: 'order-list' });
  function draw() {
    clear(list);
    order.forEach((item, i) => {
      const row = h('div', { class: 'order-item' + (selected === i ? ' sel' : '') });
      row.appendChild(h('span', {}, item.label));
      row.appendChild(h('span', { class: 'hint-line' }, `#${i + 1}`));
      row.addEventListener('click', () => {
        if (selected === null) { selected = i; draw(); return; }
        if (selected === i) { selected = null; draw(); return; }
        [order[selected], order[i]] = [order[i], order[selected]];
        selected = null;
        draw();
      });
      list.appendChild(row);
    });
  }
  draw();
  root.appendChild(list);
  const status = h('div', { class: 'status-line' });
  root.appendChild(status);
  const check = h('button', { class: 'btn primary' }, 'Check order');
  check.addEventListener('click', () => {
    const ok = order.every((it, i) => it.id === correctOrder[i]);
    if (ok) {
      status.textContent = 'Correct order! Nice.';
      status.style.color = 'var(--good)';
      Array.from(list.children).forEach((c) => c.classList.add('correct-pos'));
      onSolved();
    } else {
      status.textContent = 'Not quite — click two rows to swap them, then check again.';
      status.style.color = 'var(--bad)';
    }
  });
  root.appendChild(check);
}

function successBanner(text) {
  return h('div', { class: 'success-banner' }, [h('span', {}, '✅ ' + text)]);
}
