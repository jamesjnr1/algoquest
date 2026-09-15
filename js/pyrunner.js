let pyodidePromise = null;
function getPyodide() {
  if (!pyodidePromise) pyodidePromise = loadPyodide();
  return pyodidePromise;
}

function indentPy(code, spaces) {
  const pad = ' '.repeat(spaces);
  return code.split('\n').map((line) => (line.length ? pad + line : line)).join('\n');
}

// Runs studentCode once (defining functions/classes), then runs each test's code
// as an independent snippet in the same globals, catching AssertionError vs other
// exceptions so the UI can tell "wrong answer" apart from "your code crashed".
async function runPythonTests(studentCode, tests) {
  const pyodide = await getPyodide();
  const results = [];
  try {
    pyodide.runPython(studentCode);
  } catch (e) {
    const message = describePyError(e);
    tests.forEach((t) => results.push({ description: t.description, status: 'error', message }));
    return results;
  }
  for (const t of tests) {
    const wrapped = `
try:
${indentPy(t.code, 4)}
    __status = 'pass'
    __msg = ''
except AssertionError as __e:
    __status = 'fail'
    __msg = str(__e)
except Exception as __e:
    __status = 'error'
    __msg = type(__e).__name__ + ': ' + str(__e)
`;
    try {
      pyodide.runPython(wrapped);
      results.push({
        description: t.description,
        status: pyodide.globals.get('__status'),
        message: pyodide.globals.get('__msg'),
      });
    } catch (e) {
      results.push({ description: t.description, status: 'error', message: describePyError(e) });
    }
  }
  return results;
}

function describePyError(e) {
  const msg = (e && e.message) || String(e);
  const lines = msg.split('\n').filter(Boolean);
  return lines[lines.length - 1] || msg;
}

// Builds the code-editor + Run tests + results UI. Calls onAllPass() the first
// time every test passes.
function renderCodeChallenge(root, { starterCode, tests }, onAllPass) {
  const wrap = h('div', {});
  const textarea = h('textarea', { class: 'code-editor', spellcheck: 'false' });
  textarea.value = starterCode;
  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      textarea.value = textarea.value.slice(0, start) + '    ' + textarea.value.slice(end);
      textarea.selectionStart = textarea.selectionEnd = start + 4;
    }
  });
  wrap.appendChild(textarea);

  const btnRow = h('div', { class: 'btn-row' });
  const runBtn = h('button', { class: 'btn primary' }, 'Run tests');
  const resetBtn = h('button', { class: 'btn' }, 'Reset starter code');
  resetBtn.addEventListener('click', () => { textarea.value = starterCode; });
  btnRow.appendChild(runBtn);
  btnRow.appendChild(resetBtn);
  wrap.appendChild(btnRow);

  const status = h('div', { class: 'status-line' }, 'Write your solution above, then click "Run tests".');
  wrap.appendChild(status);
  const resultsWrap = h('div', {});
  wrap.appendChild(resultsWrap);

  let passed = false;
  runBtn.addEventListener('click', async () => {
    runBtn.disabled = true;
    const loadingLabel = pyodidePromise ? 'Running…' : 'Loading Python…';
    runBtn.textContent = loadingLabel;
    status.textContent = pyodidePromise
      ? 'Running your code against the tests…'
      : 'Booting the in-browser Python runtime — this only takes a few seconds the first time.';
    status.style.color = '';
    try {
      const results = await runPythonTests(textarea.value, tests);
      clear(resultsWrap);
      let allPass = true;
      results.forEach((r) => {
        const row = h('div', { class: 'test-row ' + (r.status === 'pass' ? 'test-pass' : 'test-fail') });
        row.appendChild(h('span', { class: 'test-icon' }, r.status === 'pass' ? '✓' : '✗'));
        const body = h('div', {});
        body.appendChild(h('div', { class: 'test-desc' }, r.description));
        if (r.status !== 'pass') body.appendChild(h('div', { class: 'test-msg' }, r.message));
        row.appendChild(body);
        resultsWrap.appendChild(row);
        if (r.status !== 'pass') allPass = false;
      });
      if (allPass) {
        status.textContent = `All ${results.length} tests passed!`;
        status.style.color = 'var(--good)';
        if (!passed) { passed = true; onAllPass(); }
      } else {
        status.textContent = 'Some tests failed — fix your code and run again.';
        status.style.color = 'var(--bad)';
      }
    } catch (e) {
      status.textContent = 'Could not run Python: ' + describePyError(e);
      status.style.color = 'var(--bad)';
    }
    runBtn.disabled = false;
    runBtn.textContent = 'Run tests';
  });

  root.appendChild(wrap);
}
