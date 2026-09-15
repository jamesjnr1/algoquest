// Small toolkit for building simple, consistent inline-SVG diagrams used in
// "Theory" sections. Colors are hardcoded (not CSS vars) so they render the
// same regardless of where the HTML string ends up.
const DG = {
  accent: '#6c5ce7', accentDark: '#5a4bd1', text: '#1c1d2e', muted: '#6b6f8a',
  border: '#c7c9db', good: '#17a865', warn: '#c9820a', bad: '#c23a4e',
  dsa: '#f2711c', r: '#17a865', py: '#2563eb', pycore: '#7c3aed', panel: '#ffffff',
};

function dWrap(viewW, viewH, inner, caption) {
  return `<div class="diagram"><svg viewBox="0 0 ${viewW} ${viewH}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill="${DG.muted}" />
      </marker>
    </defs>
    ${inner}
  </svg>${caption ? `<div class="diagram-caption">${caption}</div>` : ''}</div>`;
}
function tspanLines(x, content, lineHeight) {
  const lines = String(content).split('\n');
  return lines.map((line, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : lineHeight}">${line}</tspan>`).join('');
}
function dBox(x, y, w, h, label, opts = {}) {
  const { fill = '#f2f3fa', stroke = DG.border, textColor = DG.text, rx = 8, size = 13, weight = 600, sub = '' } = opts;
  const lineHeight = size + 4;
  const numLines = String(label).split('\n').length;
  const cx = x + w / 2;
  const baseY = y + h / 2 + (sub ? -4 : 0) - ((numLines - 1) * lineHeight) / 2;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />
    <text x="${cx}" y="${baseY}" text-anchor="middle" dominant-baseline="middle" font-size="${size}" font-weight="${weight}" fill="${textColor}" font-family="SF Mono, Consolas, monospace">${tspanLines(cx, label, lineHeight)}</text>
    ${sub ? `<text x="${cx}" y="${y + h / 2 + 14}" text-anchor="middle" font-size="10.5" fill="${DG.muted}">${sub}</text>` : ''}`;
}
function dCircle(cx, cy, r, label, opts = {}) {
  const { fill = '#f2f3fa', stroke = DG.border, textColor = DG.text, size = 13 } = opts;
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2" />
    <text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="middle" font-size="${size}" font-weight="700" fill="${textColor}" font-family="SF Mono, Consolas, monospace">${label}</text>`;
}
function dText(x, y, content, opts = {}) {
  const { size = 12, color = DG.text, anchor = 'start', weight = 400, italic = false } = opts;
  return `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}" ${italic ? 'font-style="italic"' : ''}>${tspanLines(x, content, size + 5)}</text>`;
}
function dArrow(x1, y1, x2, y2, opts = {}) {
  const { color = DG.muted, dash = '' } = opts;
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="2" marker-end="url(#arrow)" ${dash ? `stroke-dasharray="${dash}"` : ''} />`;
}

// ===================== Python Core diagrams =====================

function diagramVariables() {
  return dWrap(520, 170, `
    ${dText(20, 30, 'x = 5', { size: 15, weight: 700 })}
    ${dText(20, 60, 'y = x', { size: 15, weight: 700 })}
    ${dArrow(70, 25, 200, 90, {})}
    ${dArrow(70, 55, 200, 90, {})}
    ${dCircle(240, 90, 34, '5', { fill: '#eeebfd', stroke: DG.accent })}
    ${dText(150, 20, 'name', { size: 10.5, color: DG.muted })}
    ${dText(240, 145, 'a spot in memory', { size: 10.5, color: DG.muted, anchor: 'middle' })}
    ${dText(370, 90, 'Both x and y point to\nthe SAME object.', { size: 11.5, color: DG.muted })}
  `, 'Variables are labels pointing at objects, not boxes that hold values directly.');
}

function diagramDataTypes() {
  const items = [
    ['int', '42', DG.accent], ['float', '3.14', DG.accent], ['str', '"hi"', DG.py],
    ['bool', 'True', DG.py], ['list', '[1,2]', DG.dsa], ['tuple', '(1,2)', DG.dsa],
    ['dict', '{"a":1}', DG.r], ['set', '{1,2}', DG.r],
  ];
  let inner = '';
  items.forEach(([type, ex, color], i) => {
    const x = 10 + (i % 4) * 130;
    const y = 10 + Math.floor(i / 4) * 80;
    inner += dBox(x, y, 115, 60, type, { stroke: color, sub: ex, size: 14 });
  });
  return dWrap(540, 180, inner, 'Every value in Python has a type, which decides what you can do with it.');
}

function diagramListTuple() {
  return dWrap(540, 160, `
    ${dBox(20, 20, 240, 50, 'nums = [1, 2, 3]', { stroke: DG.dsa, size: 13 })}
    ${dText(140, 90, 'mutable \u2014 nums.append(4) works', { size: 11.5, color: DG.good, anchor: 'middle' })}
    ${dBox(290, 20, 230, 50, 'point = (4, 5)', { stroke: DG.muted, size: 13 })}
    ${dText(405, 90, 'immutable \u2014 can\u2019t change after creation', { size: 11.5, color: DG.bad, anchor: 'middle' })}
    ${dText(270, 135, 'Same idea, opposite guarantee.', { size: 11, color: DG.muted, anchor: 'middle' })}
  `, 'Lists can change after creation; tuples cannot.');
}

function diagramDictSet() {
  return dWrap(540, 180, `
    ${dText(130, 20, 'dict: key \u2192 value pairs', { size: 12, weight: 600, anchor: 'middle' })}
    ${dBox(20, 35, 100, 40, '"age"', { stroke: DG.r, size: 12 })}
    ${dArrow(120, 55, 155, 55, {})}
    ${dBox(160, 35, 70, 40, '25', { stroke: DG.r, size: 12 })}
    ${dBox(20, 90, 100, 40, '"name"', { stroke: DG.r, size: 12 })}
    ${dArrow(120, 110, 155, 110, {})}
    ${dBox(160, 90, 70, 40, '"Ann"', { stroke: DG.r, size: 12 })}
    ${dText(400, 20, 'set: unique, unordered', { size: 12, weight: 600, anchor: 'middle' })}
    ${dCircle(350, 90, 28, '1', { stroke: DG.r })}
    ${dCircle(400, 70, 28, '2', { stroke: DG.r })}
    ${dCircle(450, 90, 28, '3', { stroke: DG.r })}
  `, 'A dict maps keys to values; a set just guarantees no duplicates.');
}

function diagramFunctionCall() {
  return dWrap(540, 190, `
    ${dBox(20, 70, 130, 50, 'caller', { stroke: DG.muted })}
    ${dArrow(150, 85, 230, 85, {})}
    ${dText(160, 78, 'greet("Ann")', { size: 11, color: DG.muted })}
    ${dBox(235, 30, 170, 130, 'def greet(name):', { stroke: DG.pycore, size: 12, sub: '' })}
    ${dText(250, 90, 'return f"Hi {name}"', { size: 11.5, color: DG.text })}
    ${dArrow(405, 85, 480, 85, {})}
    ${dBox(485, 70, 55, 50, '"Hi Ann"', { stroke: DG.good, size: 10.5 })}
    ${dText(270, 165, 'arguments go in, one return value comes out', { size: 11, color: DG.muted })}
  `, 'A function takes arguments in, and sends exactly one value back out.');
}

function diagramScope() {
  return dWrap(500, 220, `
    <rect x="10" y="10" width="480" height="200" rx="10" fill="#f9fafc" stroke="${DG.border}" />
    ${dText(30, 30, 'Built-in (len, print, ...)', { size: 11, color: DG.muted, weight: 600 })}
    <rect x="20" y="40" width="460" height="150" rx="10" fill="#f2f3fa" stroke="${DG.border}" />
    ${dText(40, 60, 'Global (module-level)', { size: 11, color: DG.muted, weight: 600 })}
    <rect x="30" y="70" width="440" height="100" rx="10" fill="#eeebfd" stroke="${DG.accent}" />
    ${dText(50, 90, 'Enclosing (outer function)', { size: 11, color: DG.accentDark, weight: 600 })}
    <rect x="40" y="100" width="420" height="55" rx="10" fill="#ffffff" stroke="${DG.pycore}" />
    ${dText(60, 122, 'Local (current function)', { size: 11.5, color: DG.pycore, weight: 700 })}
    ${dText(60, 142, 'x is looked up here FIRST', { size: 10.5, color: DG.muted })}
  `, 'Python searches Local \u2192 Enclosing \u2192 Global \u2192 Built-in (LEGB) for a name.');
}

function diagramExceptionFlow() {
  return dWrap(560, 230, `
    ${dBox(20, 20, 160, 45, 'try:\nrisky_code()', { stroke: DG.muted, size: 12 })}
    ${dArrow(100, 65, 100, 95, {})}
    ${dText(115, 85, 'error?', { size: 10.5, color: DG.muted })}
    ${dBox(20, 100, 160, 45, 'except:\nhandle it', { stroke: DG.bad, size: 12 })}
    ${dArrow(100, 145, 100, 175, {})}
    ${dBox(230, 20, 220, 45, 'else: only if NO error', { stroke: DG.good, size: 11.5 })}
    ${dArrow(340, 65, 340, 175, { dash: '4,3' })}
    ${dBox(20, 180, 430, 45, 'finally: always runs, error or not', { stroke: DG.pycore, size: 12 })}
  `, 'try/except/else/finally: only one of try\'s body or except runs, but finally always does.');
}

function diagramIterator() {
  return dWrap(540, 150, `
    ${dBox(20, 50, 120, 50, '[10, 20, 30]', { stroke: DG.dsa, size: 13 })}
    ${dText(80, 30, 'iterable', { size: 10.5, color: DG.muted, anchor: 'middle' })}
    ${dArrow(145, 75, 200, 75, {})}
    ${dText(150, 65, 'iter()', { size: 10.5, color: DG.muted })}
    ${dCircle(240, 75, 32, '\u25B6', { stroke: DG.pycore })}
    ${dText(240, 30, 'iterator', { size: 10.5, color: DG.muted, anchor: 'middle' })}
    ${dArrow(275, 75, 330, 55, {})}
    ${dArrow(275, 75, 330, 75, {})}
    ${dArrow(275, 75, 330, 95, {})}
    ${dText(340, 58, 'next() \u2192 10', { size: 11 })}
    ${dText(340, 78, 'next() \u2192 20', { size: 11 })}
    ${dText(340, 98, 'next() \u2192 30, then StopIteration', { size: 11 })}
  `, 'A for loop is really just repeated calls to next() until StopIteration.');
}

function diagramGenerator() {
  return dWrap(540, 160, `
    ${dBox(20, 20, 220, 45, 'def gen(): yield 1; yield 2', { stroke: DG.pycore, size: 11.5 })}
    ${dArrow(240, 42, 300, 42, {})}
    ${dText(250, 100, 'call 1: runs to first yield \u2192 1 (pauses)', { size: 11 })}
    ${dText(250, 120, 'call 2: resumes, runs to next yield \u2192 2', { size: 11 })}
    ${dText(250, 140, 'call 3: no more yields \u2192 StopIteration', { size: 11 })}
  `, 'yield pauses a function mid-execution, remembering exactly where it left off.');
}

function diagramDecorator() {
  return dWrap(540, 180, `
    ${dBox(30, 100, 140, 50, 'say_hi()', { stroke: DG.muted, size: 12 })}
    <rect x="210" y="30" width="300" height="140" rx="12" fill="#f3e8ff" stroke="${DG.pycore}" stroke-width="2" />
    ${dText(230, 55, '@my_decorator wraps it:', { size: 11.5, weight: 600, color: DG.pycore })}
    ${dBox(230, 70, 260, 45, 'do something BEFORE', { stroke: DG.border, size: 11 })}
    ${dBox(230, 120, 260, 45, 'call the original say_hi()', { stroke: DG.border, size: 11 })}
    ${dArrow(170, 120, 205, 90, {})}
  `, 'A decorator wraps a function, adding behavior before/after without changing its code.');
}

function diagramClassObject() {
  return dWrap(560, 190, `
    ${dBox(20, 20, 200, 70, 'class Dog:', { stroke: DG.pycore, size: 14, sub: 'the blueprint' })}
    ${dArrow(230, 55, 300, 35, {})}
    ${dArrow(230, 55, 300, 85, {})}
    ${dArrow(230, 55, 300, 135, {})}
    ${dBox(305, 15, 140, 45, 'rex = Dog()', { stroke: DG.good, size: 11.5, sub: 'an object' })}
    ${dBox(305, 65, 140, 45, 'fido = Dog()', { stroke: DG.good, size: 11.5, sub: 'an object' })}
    ${dBox(305, 115, 140, 45, 'buddy = Dog()', { stroke: DG.good, size: 11.5, sub: 'an object' })}
  `, 'A class is a blueprint; each object built from it is a separate instance with its own data.');
}

function diagramInheritance() {
  return dWrap(560, 190, `
    ${dBox(210, 20, 140, 50, 'class Animal', { stroke: DG.pycore, size: 13 })}
    ${dArrow(230, 130, 260, 75, {})}
    ${dArrow(330, 130, 300, 75, {})}
    ${dBox(140, 130, 140, 50, 'class Dog(Animal)', { stroke: DG.dsa, size: 11 })}
    ${dBox(290, 130, 140, 50, 'class Cat(Animal)', { stroke: DG.r, size: 11 })}
    ${dText(280, 100, 'inherits from', { size: 10.5, color: DG.muted, anchor: 'middle' })}
  `, 'Dog and Cat automatically get everything Animal defines, and can override or add more.');
}

function diagramEncapsulation() {
  return dWrap(540, 170, `
    <rect x="30" y="20" width="480" height="130" rx="12" fill="#f2f3fa" stroke="${DG.border}" />
    ${dText(50, 45, 'class BankAccount:', { size: 12.5, weight: 700 })}
    ${dBox(50, 55, 190, 40, 'self._balance', { stroke: DG.bad, size: 11.5, sub: 'convention: "private"' })}
    ${dBox(260, 55, 220, 40, 'def deposit(self, amt):', { stroke: DG.good, size: 11, sub: 'public method' })}
    ${dText(50, 130, 'Outside code should go through deposit(), not touch _balance directly.', { size: 11, color: DG.muted })}
  `, 'Encapsulation: bundle data with the methods that safely operate on it.');
}

function diagramDunder() {
  return dWrap(540, 170, `
    ${dText(20, 30, 'a + b', { size: 15, weight: 700 })}
    ${dArrow(80, 25, 180, 25, {})}
    ${dText(190, 30, 'a.__add__(b)', { size: 13, color: DG.pycore })}
    ${dText(20, 70, 'len(a)', { size: 15, weight: 700 })}
    ${dArrow(80, 65, 180, 65, {})}
    ${dText(190, 70, 'a.__len__()', { size: 13, color: DG.pycore })}
    ${dText(20, 110, 'str(a)', { size: 15, weight: 700 })}
    ${dArrow(80, 105, 180, 105, {})}
    ${dText(190, 110, 'a.__str__()', { size: 13, color: DG.pycore })}
    ${dText(20, 150, 'Every built-in operator/function is secretly a dunder method call.', { size: 11.5, color: DG.muted })}
  `, 'Defining __add__, __len__, __str__, etc. lets your own objects work with +, len(), print(), and more.');
}

function diagramComprehension() {
  return dWrap(540, 140, `
    ${dBox(20, 45, 120, 50, '[1, 2, 3, 4]', { stroke: DG.dsa, size: 13 })}
    ${dArrow(145, 70, 220, 70, {})}
    ${dText(150, 55, 'x * x for x in ...', { size: 10.5, color: DG.muted })}
    ${dBox(225, 45, 150, 50, '[1, 4, 9, 16]', { stroke: DG.good, size: 13 })}
  `, '[expr for item in iterable] builds a new list in one readable line.');
}

// ===================== DSA / R anchor diagrams =====================

function diagramBigOGrowth() {
  const w = 540, h = 220, ox = 50, oy = 190;
  function curve(fn, color, label, lx, ly) {
    let d = `M ${ox} ${oy}`;
    for (let x = 0; x <= 100; x += 4) {
      const y = oy - fn(x) * 1.6;
      d += ` L ${ox + x * 4.4} ${Math.max(10, y)}`;
    }
    return `<path d="${d}" fill="none" stroke="${color}" stroke-width="2.5" />${dText(lx, ly, label, { color, weight: 700, size: 12 })}`;
  }
  return dWrap(w, h, `
    <line x1="${ox}" y1="10" x2="${ox}" y2="${oy}" stroke="${DG.border}" stroke-width="1.5" />
    <line x1="${ox}" y1="${oy}" x2="${w - 10}" y2="${oy}" stroke="${DG.border}" stroke-width="1.5" />
    ${dText(ox - 30, 10, 'work', { size: 10.5, color: DG.muted })}
    ${dText(w - 60, oy + 18, 'input size (n)', { size: 10.5, color: DG.muted })}
    ${curve((x) => 5, DG.good, 'O(1)', 420, 175)}
    ${curve((x) => Math.log2(x + 1) * 12, DG.r, 'O(log n)', 420, 130)}
    ${curve((x) => x * 0.9, DG.py, 'O(n)', 420, 60)}
    ${curve((x) => x * Math.log2(x + 1) * 0.28, DG.warn, 'O(n log n)', 300, 25)}
    ${curve((x) => x * x * 0.012, DG.bad, 'O(n\u00B2)', 150, 15)}
  `, 'As input size grows, these growth rates spread apart fast \u2014 the gap between O(n) and O(n\u00B2) is what makes algorithm choice matter.');
}

function diagramStackQueue() {
  return dWrap(540, 190, `
    ${dText(120, 20, 'Stack (LIFO)', { size: 13, weight: 700, anchor: 'middle' })}
    ${dBox(60, 110, 120, 30, '3  \u2190 top', { stroke: DG.accent })}
    ${dBox(60, 80, 120, 30, '2', { stroke: DG.accent })}
    ${dBox(60, 50, 120, 30, '1', { stroke: DG.accent })}
    ${dText(120, 155, 'push/pop only here', { size: 10.5, color: DG.muted, anchor: 'middle' })}
    ${dText(420, 20, 'Queue (FIFO)', { size: 13, weight: 700, anchor: 'middle' })}
    ${dBox(340, 80, 55, 40, '1', { stroke: DG.r })}
    ${dBox(400, 80, 55, 40, '2', { stroke: DG.r })}
    ${dBox(460, 80, 55, 40, '3', { stroke: DG.r })}
    ${dText(367, 140, 'dequeue \u2190 front', { size: 10.5, color: DG.muted, anchor: 'middle' })}
    ${dText(487, 140, 'back \u2190 enqueue', { size: 10.5, color: DG.muted, anchor: 'middle' })}
  `, 'A stack only touches one end (the top); a queue adds at the back and removes from the front.');
}

function diagramLinkedListPic() {
  return dWrap(540, 130, `
    ${dBox(20, 40, 70, 45, '3', { stroke: DG.accent })}
    ${dArrow(95, 62, 140, 62, {})}
    ${dBox(145, 40, 70, 45, '9', { stroke: DG.accent })}
    ${dArrow(220, 62, 265, 62, {})}
    ${dBox(270, 40, 70, 45, '2', { stroke: DG.accent })}
    ${dArrow(345, 62, 390, 62, {})}
    ${dBox(395, 40, 90, 45, 'null', { stroke: DG.muted, fill: '#fff', size: 12 })}
    ${dText(20, 25, 'head', { size: 10.5, color: DG.muted })}
  `, 'Each node holds a value and a pointer to the next node \u2014 not contiguous in memory like an array.');
}

function diagramRecursionCallStack() {
  return dWrap(540, 220, `
    ${dBox(200, 170, 160, 35, 'factorial(1) = 1', { stroke: DG.good, size: 11.5 })}
    ${dBox(200, 130, 160, 35, 'factorial(2) = 2\u00d71', { stroke: DG.accent, size: 11 })}
    ${dBox(200, 90, 160, 35, 'factorial(3) = 3\u00d72', { stroke: DG.accent, size: 11 })}
    ${dBox(200, 50, 160, 35, 'factorial(4) = 4\u00d76', { stroke: DG.accent, size: 11 })}
    ${dText(380, 90, '\u2190 unwinds upward,\nmultiplying as it returns', { size: 11, color: DG.muted })}
    ${dText(20, 90, 'calls stack\ndownward \u2192', { size: 11, color: DG.muted })}
  `, 'Each call waits on a new frame below it; results multiply together on the way back up.');
}

function diagramBSTPic() {
  return dWrap(400, 210, `
    ${dCircle(200, 30, 26, '50', { stroke: DG.accent })}
    ${dArrow(185, 50, 120, 90, {})}
    ${dArrow(215, 50, 280, 90, {})}
    ${dCircle(100, 110, 24, '30', { stroke: DG.accent })}
    ${dCircle(300, 110, 24, '70', { stroke: DG.accent })}
    ${dArrow(90, 130, 60, 165, {})}
    ${dArrow(110, 130, 140, 165, {})}
    ${dCircle(50, 180, 20, '20', { stroke: DG.accent, size: 11 })}
    ${dCircle(150, 180, 20, '40', { stroke: DG.accent, size: 11 })}
  `, 'Every left subtree is smaller and every right subtree is larger than its parent (left &lt; parent &lt; right, at every level).');
}

function diagramGraphBFSPic() {
  return dWrap(460, 200, `
    ${dCircle(230, 30, 24, 'A', { stroke: DG.accent, fill: '#eeebfd' })}
    ${dArrow(215, 50, 140, 90, {})}
    ${dArrow(245, 50, 320, 90, {})}
    ${dCircle(120, 110, 24, 'B', { stroke: DG.r, fill: '#e6f8ee' })}
    ${dCircle(340, 110, 24, 'C', { stroke: DG.r, fill: '#e6f8ee' })}
    ${dArrow(110, 130, 110, 165, {})}
    ${dCircle(110, 180, 24, 'D', { stroke: DG.py, fill: '#e8f0fe' })}
    ${dText(20, 30, 'ring 0', { size: 10.5, color: DG.muted })}
    ${dText(20, 110, 'ring 1', { size: 10.5, color: DG.muted })}
    ${dText(20, 180, 'ring 2', { size: 10.5, color: DG.muted })}
  `, 'BFS finishes an entire ring (all nodes at distance k) before moving to distance k+1.');
}

function diagramHashPic() {
  return dWrap(500, 170, `
    ${dBox(20, 60, 90, 40, '"cat"', { stroke: DG.accent })}
    ${dArrow(115, 80, 190, 80, {})}
    ${dText(120, 65, 'hash()', { size: 10.5, color: DG.muted })}
    ${dBox(195, 60, 80, 40, '% 5 = 2', { stroke: DG.accent, size: 12 })}
    ${dArrow(280, 80, 340, 80, {})}
    ${dBox(345, 20, 60, 130, 'buckets', { stroke: DG.border, fill: '#fff', size: 10.5 })}
    ${dBox(345, 75, 60, 30, '2: cat', { stroke: DG.good, fill: '#e6f8ee', size: 10.5 })}
  `, 'A hash function turns any key into a bucket index, giving close-to-O(1) average lookup.');
}

function diagramVectorPic() {
  return dWrap(460, 130, `
    ${dText(20, 25, 'x <- c(4, 8, 15, 16, 23)', { size: 13, weight: 600 })}
    ${dBox(20, 45, 60, 45, '4', { stroke: DG.r, sub: '[1]' })}
    ${dBox(85, 45, 60, 45, '8', { stroke: DG.r, sub: '[2]' })}
    ${dBox(150, 45, 60, 45, '15', { stroke: DG.r, sub: '[3]' })}
    ${dBox(215, 45, 60, 45, '16', { stroke: DG.r, sub: '[4]' })}
    ${dBox(280, 45, 60, 45, '23', { stroke: DG.r, sub: '[5]' })}
  `, 'R indexes from 1, not 0 \u2014 x[1] is the FIRST element.');
}

function diagramDataFramePic() {
  return dWrap(460, 170, `
    <rect x="20" y="20" width="420" height="130" fill="none" stroke="${DG.border}" />
    <line x1="160" y1="20" x2="160" y2="150" stroke="${DG.border}" />
    <line x1="300" y1="20" x2="300" y2="150" stroke="${DG.border}" />
    <line x1="20" y1="55" x2="440" y2="55" stroke="${DG.border}" />
    ${dText(90, 42, 'name', { size: 12, weight: 700, anchor: 'middle' })}
    ${dText(230, 42, 'age', { size: 12, weight: 700, anchor: 'middle' })}
    ${dText(370, 42, 'score', { size: 12, weight: 700, anchor: 'middle' })}
    ${dText(90, 78, 'Ann', { size: 11.5, anchor: 'middle' })}
    ${dText(230, 78, '22', { size: 11.5, anchor: 'middle' })}
    ${dText(370, 78, '88', { size: 11.5, anchor: 'middle' })}
    ${dText(90, 108, 'Ben', { size: 11.5, anchor: 'middle' })}
    ${dText(230, 108, '17', { size: 11.5, anchor: 'middle' })}
    ${dText(370, 108, '73', { size: 11.5, anchor: 'middle' })}
    ${dText(90, 138, 'Cid', { size: 11.5, anchor: 'middle' })}
    ${dText(230, 138, '19', { size: 11.5, anchor: 'middle' })}
    ${dText(370, 138, '91', { size: 11.5, anchor: 'middle' })}
    ${dText(20, 165, 'each column is a vector; each row is one observation', { size: 10.5, color: DG.muted })}
  `, 'df$age pulls out a whole column; df[df$age > 18, ] filters whole rows.');
}

function diagramListPic() {
  return dWrap(460, 150, `
    ${dText(20, 25, 'my_list <- list(name="Ann", age=25, active=TRUE)', { size: 11.5, weight: 600 })}
    ${dBox(20, 45, 130, 50, '"Ann"', { stroke: DG.r, sub: 'name' })}
    ${dBox(165, 45, 130, 50, '25', { stroke: DG.r, sub: 'age' })}
    ${dBox(310, 45, 130, 50, 'TRUE', { stroke: DG.r, sub: 'active' })}
    ${dText(20, 120, '[[1]] unwraps to "Ann"  \u2014  [1] keeps it wrapped as list(name="Ann")', { size: 11, color: DG.muted })}
  `, 'Unlike a vector, each slot can be a different type.');
}
