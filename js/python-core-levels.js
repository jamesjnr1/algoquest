const PYTHON_CORE_LEVELS = [];

// ---------- 1. Variables & Data Types ----------
PYTHON_CORE_LEVELS.push({
  id: 'pycore-variables',
  track: 'pycore',
  title: 'Variables & Data Types',
  concept: 'Names that point to objects, and the built-in types',
  xp: 60,
  intro: 'Before anything else in Python: what a variable actually is, and the handful of built-in types you\'ll use constantly.',
  theory: `
    <h4>Variables are labels, not boxes</h4>
    <p>In many languages a variable is a labeled box that holds a value. In Python it's closer to a sticky note: <span class="inline-code">x = 5</span> creates the integer object <span class="inline-code">5</span> somewhere in memory and sticks the label <span class="inline-code">x</span> on it. <span class="inline-code">y = x</span> doesn't copy anything &mdash; it just sticks a second label on the <em>same</em> object.</p>
    ${diagramVariables()}
    <h4>The core built-in types</h4>
    <p>Every value has a type, and the type decides what operations make sense on it. You'll use these constantly:</p>
    ${diagramDataTypes()}
    <ul>
      <li><strong>int</strong> / <strong>float</strong> &mdash; whole numbers and decimals</li>
      <li><strong>str</strong> &mdash; text, always immutable</li>
      <li><strong>bool</strong> &mdash; True/False (secretly a subtype of int: True == 1)</li>
      <li><strong>list</strong> / <strong>tuple</strong> &mdash; ordered collections (mutable / immutable)</li>
      <li><strong>dict</strong> / <strong>set</strong> &mdash; key-value pairs / unique unordered items</li>
    </ul>
    <h4>Dynamic typing &amp; conversion</h4>
    <p>A Python variable can be reassigned to a completely different type &mdash; the TYPE lives on the object, not the variable name. Convert between types explicitly with <span class="inline-code">int()</span>, <span class="inline-code">float()</span>, <span class="inline-code">str()</span>, and <span class="inline-code">bool()</span>. Use <span class="inline-code">type(x).__name__</span> to ask what type something currently is.</p>
  `,
  starterCode: `def celsius_to_fahrenheit(c):
    """Convert a Celsius float/int to Fahrenheit: F = C * 9/5 + 32."""
    # TODO
    pass


def type_name(value):
    """Return the name of value's type as a string, e.g. "int", "str", "list"."""
    # TODO
    pass
`,
  tests: [
    { description: 'Converts 0\u00b0C to 32\u00b0F', code: `result = celsius_to_fahrenheit(0)\nassert result == 32, f"expected 32, got {result}"` },
    { description: 'Converts 100\u00b0C to 212\u00b0F', code: `result = celsius_to_fahrenheit(100)\nassert result == 212, f"expected 212, got {result}"` },
    { description: 'type_name identifies an int, a string, and a list', code: `assert type_name(5) == "int"\nassert type_name("hi") == "str"\nassert type_name([1, 2]) == "list"` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [
    { q: 'After <span class="inline-code">x = 5</span> and <span class="inline-code">y = x</span>, what happens if you then run <span class="inline-code">x = 10</span>?', options: ['y also becomes 10', 'y stays 5 &mdash; it was pointing at the object 5, not at x', 'An error occurs'], answer: 1, explain: 'x = 10 makes x point at a NEW object (10). y still points at the original object (5), completely unaffected.' },
    { q: 'What does <span class="inline-code">bool("")</span> (an empty string) evaluate to?', options: ['True', 'False', 'An error'], answer: 1, explain: 'Empty collections and empty strings are "falsy" in Python &mdash; they convert to False.' },
  ],
});

// ---------- 2. Operators & Type Conversion ----------
PYTHON_CORE_LEVELS.push({
  id: 'pycore-operators',
  track: 'pycore',
  title: 'Operators & Type Conversion',
  concept: 'Arithmetic, comparison, logical operators, and precedence',
  xp: 60,
  intro: 'Operators combine values into new ones. A few of Python\'s (integer division, modulo, and the logical operators) trip up almost everyone the first time.',
  theory: `
    <h4>Arithmetic operators</h4>
    <table>
      <tr><th>Operator</th><th>Meaning</th><th>Example</th></tr>
      <tr><td><span class="inline-code">+  -  *</span></td><td>add, subtract, multiply</td><td>3 + 4 &rarr; 7</td></tr>
      <tr><td><span class="inline-code">/</span></td><td>true division (always a float)</td><td>7 / 2 &rarr; 3.5</td></tr>
      <tr><td><span class="inline-code">//</span></td><td>floor division (rounds down)</td><td>7 // 2 &rarr; 3</td></tr>
      <tr><td><span class="inline-code">%</span></td><td>modulo (the remainder)</td><td>7 % 2 &rarr; 1</td></tr>
      <tr><td><span class="inline-code">**</span></td><td>exponent</td><td>2 ** 5 &rarr; 32</td></tr>
    </table>
    <h4>Comparison &amp; logical operators</h4>
    <p>Comparisons (<span class="inline-code">== != &lt; &gt; &lt;= &gt;=</span>) always produce a <span class="inline-code">bool</span>. Combine conditions with <span class="inline-code">and</span>, <span class="inline-code">or</span>, <span class="inline-code">not</span> &mdash; not <span class="inline-code">&amp;&amp;</span>/<span class="inline-code">||</span> like many other languages.</p>
    <h4>Precedence</h4>
    <p><span class="inline-code">**</span> binds tighter than unary minus; <span class="inline-code">*  /  //  %</span> bind tighter than <span class="inline-code">+  -</span>; comparisons bind tighter than <span class="inline-code">and</span>/<span class="inline-code">or</span>. When in doubt, add parentheses &mdash; it costs nothing and removes all ambiguity.</p>
  `,
  starterCode: `def bmi(weight_kg, height_m):
    """Body mass index: weight / height^2, rounded to 1 decimal place."""
    # TODO: use ** for the exponent, then round(..., 1)
    pass


def is_even(n):
    """Return True if n is even, using the modulo operator."""
    # TODO
    pass
`,
  tests: [
    { description: 'Computes BMI correctly', code: `result = bmi(70, 1.75)\nassert result == 22.9, f"expected 22.9, got {result}"` },
    { description: 'is_even identifies even numbers', code: `assert is_even(4) == True\nassert is_even(0) == True` },
    { description: 'is_even identifies odd numbers', code: `assert is_even(7) == False\nassert is_even(-3) == False` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [
    { q: 'What does <span class="inline-code">7 // 2</span> evaluate to?', options: ['3.5', '3', '1'], answer: 1, explain: '// is floor division &mdash; it divides then rounds down to the nearest whole number.' },
    { q: 'What does <span class="inline-code">2 ** 3 ** 2</span> evaluate to?', options: ['64', '512', '36'], answer: 1, explain: '** is right-associative: it evaluates as 2 ** (3 ** 2) = 2 ** 9 = 512, not (2**3)**2.' },
  ],
});

// ---------- 3. Strings ----------
PYTHON_CORE_LEVELS.push({
  id: 'pycore-strings',
  track: 'pycore',
  title: 'Strings',
  concept: 'Immutable text, slicing, and the methods you\'ll use daily',
  xp: 70,
  intro: 'Strings are sequences of characters, indexable and sliceable like lists, but immutable &mdash; every "modification" actually builds a new string.',
  theory: `
    <h4>Indexing &amp; slicing</h4>
    <p>Like lists, <span class="inline-code">s[0]</span> gets the first character and <span class="inline-code">s[-1]</span> gets the last. Slicing <span class="inline-code">s[start:stop]</span> grabs a substring from <span class="inline-code">start</span> up to (not including) <span class="inline-code">stop</span>. <span class="inline-code">s[::-1]</span> is the classic "reverse a string" trick.</p>
    <h4>Common methods</h4>
    <ul>
      <li><span class="inline-code">.upper()</span> / <span class="inline-code">.lower()</span> &mdash; case conversion</li>
      <li><span class="inline-code">.strip()</span> &mdash; remove leading/trailing whitespace</li>
      <li><span class="inline-code">.split(sep)</span> &mdash; break into a list of pieces</li>
      <li><span class="inline-code">.join(iterable)</span> &mdash; glue a list back into one string</li>
      <li><span class="inline-code">.replace(old, new)</span> &mdash; substring replacement</li>
      <li><span class="inline-code">.find(sub)</span> &mdash; index of first match, or -1</li>
    </ul>
    <h4>f-strings</h4>
    <p><span class="inline-code">f"Hello, {name}!"</span> embeds expressions directly into a string &mdash; the modern, readable way to build text, replacing older <span class="inline-code">%</span>-formatting and <span class="inline-code">.format()</span> calls.</p>
  `,
  starterCode: `def initials(full_name):
    """"Ann Lee" -> "AL". Split on spaces, take the first letter of each word, uppercase, join."""
    # TODO
    pass


def reverse_words(sentence):
    """"the quick fox" -> "fox quick the". Reverse the ORDER of words, not the letters."""
    # TODO
    pass
`,
  tests: [
    { description: 'initials works on a two-word name', code: `result = initials("Ann Lee")\nassert result == "AL", f"expected 'AL', got {result!r}"` },
    { description: 'initials works on three words', code: `result = initials("Grace Rey Hopper")\nassert result == "GRH", f"expected 'GRH', got {result!r}"` },
    { description: 'reverse_words reverses word order, not letters', code: `result = reverse_words("the quick fox")\nassert result == "fox quick the", f"expected 'fox quick the', got {result!r}"` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [
    { q: 'Why can\'t you do <span class="inline-code">s[0] = "X"</span> to change the first character of a string?', options: ['You can, it just needs different syntax', 'Strings are immutable &mdash; you must build a new string instead', 'Only lowercase strings can be modified'], answer: 1, explain: 'Every string "modification" (like .replace() or .upper()) actually returns a brand new string object.' },
    { q: 'What does <span class="inline-code">"a,b,,c".split(",")</span> return?', options: ["['a', 'b', 'c']", "['a', 'b', '', 'c']", 'An error'], answer: 1, explain: 'split() keeps empty strings for consecutive separators &mdash; it doesn\'t silently collapse them.' },
  ],
});

// ---------- 4. Lists & List Comprehensions ----------
PYTHON_CORE_LEVELS.push({
  id: 'pycore-lists',
  track: 'pycore',
  title: 'Lists & List Comprehensions',
  concept: 'Ordered, mutable collections, and building new ones in one line',
  xp: 70,
  intro: 'Lists are Python\'s general-purpose ordered container. List comprehensions let you build a new list from an existing one without a manual loop.',
  theory: `
    <h4>Lists are mutable</h4>
    <p>Unlike strings, lists can change in place: <span class="inline-code">.append(x)</span>, <span class="inline-code">.insert(i, x)</span>, <span class="inline-code">.remove(x)</span>, <span class="inline-code">.pop()</span>, and <span class="inline-code">.sort()</span> all modify the SAME list object rather than returning a new one.</p>
    <h4>List comprehensions</h4>
    <p>The pattern <span class="inline-code">[expr for item in iterable if condition]</span> reads almost like English and replaces a very common loop-and-append pattern:</p>
    ${diagramComprehension()}
    <pre class="code-block"># the long way
result = []
for x in nums:
    if x % 2 == 0:
        result.append(x * x)

# the comprehension way
result = [x * x for x in nums if x % 2 == 0]</pre>
    <p>The <span class="inline-code">if</span> part is optional. Comprehensions also exist for dicts (<span class="inline-code">{k: v for ...}</span>) and sets (<span class="inline-code">{x for ...}</span>).</p>
  `,
  starterCode: `def squares_of_evens(nums):
    """Return a list of x*x for every even x in nums, using a list comprehension."""
    # TODO
    pass


def flatten(list_of_lists):
    """[[1, 2], [3], [4, 5]] -> [1, 2, 3, 4, 5]. A comprehension with two "for" clauses works."""
    # TODO
    pass
`,
  tests: [
    { description: 'squares_of_evens filters and transforms', code: `result = squares_of_evens([1, 2, 3, 4, 5, 6])\nassert result == [4, 16, 36], f"expected [4, 16, 36], got {result}"` },
    { description: 'squares_of_evens handles no evens', code: `assert squares_of_evens([1, 3, 5]) == []` },
    { description: 'flatten merges nested lists in order', code: `result = flatten([[1, 2], [3], [4, 5]])\nassert result == [1, 2, 3, 4, 5], f"expected [1, 2, 3, 4, 5], got {result}"` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [
    { q: 'What does <span class="inline-code">[x for x in range(5)]</span> produce?', options: ['[0, 1, 2, 3, 4]', '[1, 2, 3, 4, 5]', '5'], answer: 0, explain: 'range(5) produces 0 through 4; the comprehension collects each one unchanged into a list.' },
    { q: 'A list comprehension with an "if" clause but no transformation, like <span class="inline-code">[x for x in nums if x > 0]</span>, is equivalent to:', options: ['Sorting nums', 'Filtering nums down to only positive values', 'Counting positive values'], answer: 1, explain: 'When the expression is just "x" itself, the comprehension acts purely as a filter.' },
  ],
});

// ---------- 5. Tuples & Sets ----------
PYTHON_CORE_LEVELS.push({
  id: 'pycore-tuples-sets',
  track: 'pycore',
  title: 'Tuples & Sets',
  concept: 'Immutable fixed collections, and unique unordered ones',
  xp: 70,
  intro: 'Tuples and sets solve two very different problems: tuples guarantee a fixed collection won\'t change; sets guarantee no duplicates and fast membership checks.',
  theory: `
    <h4>Tuples: fixed, immutable</h4>
    ${diagramListTuple()}
    <p>Use a tuple when a collection's size and contents shouldn't change &mdash; coordinates <span class="inline-code">(x, y)</span>, or returning multiple values from a function: <span class="inline-code">return min_val, max_val</span> actually returns a tuple.</p>
    <h4>Sets: unique, unordered</h4>
    <p>A set automatically drops duplicates and supports fast <span class="inline-code">in</span> checks and mathematical operations:</p>
    <ul>
      <li><span class="inline-code">a | b</span> &mdash; union (everything in either)</li>
      <li><span class="inline-code">a & b</span> &mdash; intersection (in both)</li>
      <li><span class="inline-code">a - b</span> &mdash; difference (in a but not b)</li>
    </ul>
    <p>Because sets are unordered, they don't support indexing (<span class="inline-code">s[0]</span> is an error) &mdash; only membership tests and set operations.</p>
  `,
  starterCode: `def unique_common(list_a, list_b):
    """Return a SORTED list of values that appear in both list_a and list_b, with no duplicates."""
    # TODO: convert both to sets, intersect, then sort the result into a list
    pass


def swap(a, b):
    """Return a tuple with a and b in swapped order."""
    # TODO
    pass
`,
  tests: [
    { description: 'unique_common finds shared values, sorted, no duplicates', code: `result = unique_common([1, 2, 2, 3], [2, 3, 3, 4])\nassert result == [2, 3], f"expected [2, 3], got {result}"` },
    { description: 'unique_common returns empty list when nothing overlaps', code: `assert unique_common([1, 2], [3, 4]) == []` },
    { description: 'swap returns a tuple in reversed order', code: `result = swap(1, "two")\nassert result == ("two", 1), f"expected ('two', 1), got {result}"` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [
    { q: 'Why use a tuple instead of a list for a function returning (min, max)?', options: ['Tuples are always faster to create', 'It signals "this fixed pair of values shouldn\'t be modified" and lets you unpack it as min_val, max_val = f(...)', 'Lists can\'t be returned from functions'], answer: 1, explain: 'It\'s a convention/guarantee, not a hard technical requirement &mdash; but a very common and readable one.' },
    { q: 'What does <span class="inline-code">{1, 2, 2, 3}</span> evaluate to?', options: ['{1, 2, 2, 3}', '{1, 2, 3}', 'An error, duplicates aren\'t allowed in the literal'], answer: 1, explain: 'A set automatically discards duplicate values as soon as it\'s created.' },
  ],
});

// ---------- 6. Dictionaries ----------
PYTHON_CORE_LEVELS.push({
  id: 'pycore-dicts',
  track: 'pycore',
  title: 'Dictionaries',
  concept: 'Key-value mappings, the workhorse of real Python code',
  xp: 70,
  intro: 'A dict maps keys to values, with fast lookup by key. It\'s arguably the single most-used data structure in real-world Python.',
  theory: `
    ${diagramDictSet()}
    <h4>Core operations</h4>
    <ul>
      <li><span class="inline-code">d[key]</span> &mdash; access (raises KeyError if missing)</li>
      <li><span class="inline-code">d.get(key, default)</span> &mdash; access with a fallback, never raises</li>
      <li><span class="inline-code">d[key] = value</span> &mdash; set or overwrite</li>
      <li><span class="inline-code">d.keys()</span>, <span class="inline-code">d.values()</span>, <span class="inline-code">d.items()</span> &mdash; iterate over parts</li>
      <li><span class="inline-code">key in d</span> &mdash; fast membership test</li>
    </ul>
    <h4>Dict comprehensions</h4>
    <p><span class="inline-code">{k: v for k, v in pairs}</span> builds a dict the same way a list comprehension builds a list. Since Python 3.7, dicts also preserve insertion order.</p>
  `,
  starterCode: `def word_count(words):
    """["a", "b", "a", "c", "b", "a"] -> {"a": 3, "b": 2, "c": 1}"""
    # TODO: build a dict counting occurrences. counts.get(word, 0) is handy here.
    pass


def invert_dict(d):
    """{"a": 1, "b": 2} -> {1: "a", 2: "b"}. Swap every key and value."""
    # TODO
    pass
`,
  tests: [
    { description: 'word_count tallies occurrences correctly', code: `result = word_count(["a", "b", "a", "c", "b", "a"])\nassert result == {"a": 3, "b": 2, "c": 1}, f"expected counts a:3 b:2 c:1, got {result}"` },
    { description: 'word_count handles an empty list', code: `assert word_count([]) == {}` },
    { description: 'invert_dict swaps keys and values', code: `result = invert_dict({"a": 1, "b": 2})\nassert result == {1: "a", 2: "b"}, f"expected " + str({1: 'a', 2: 'b'}) + f", got {result}"` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [
    { q: 'What is the advantage of <span class="inline-code">d.get(key, 0)</span> over <span class="inline-code">d[key]</span> when key might not exist?', options: ['get() is always faster', 'get() returns the default (0) instead of raising a KeyError', 'There is no difference'], answer: 1, explain: 'd[key] raises KeyError for a missing key; d.get(key, 0) safely returns 0 (or whatever default you choose) instead.' },
    { q: 'Since Python 3.7, iterating over a dict with a for loop visits keys in:', options: ['Random order', 'Alphabetical order always', 'The order they were inserted'], answer: 2, explain: 'Dicts are guaranteed to preserve insertion order as a language feature since 3.7.' },
  ],
});

// ---------- 7. Control Flow: if / elif / else ----------
PYTHON_CORE_LEVELS.push({
  id: 'pycore-conditionals',
  track: 'pycore',
  title: 'Control Flow: if / elif / else',
  concept: 'Branching logic, and what counts as "truthy"',
  xp: 60,
  intro: 'Conditionals let a program take different paths. Python also treats many non-boolean values as true/false automatically, which is worth knowing.',
  theory: `
    <h4>The basic shape</h4>
    <pre class="code-block">if condition1:
    ...
elif condition2:
    ...
else:
    ...</pre>
    <p>Only ONE branch runs: Python checks conditions top to bottom and stops at the first match. <span class="inline-code">elif</span> and <span class="inline-code">else</span> are both optional.</p>
    <h4>Truthiness</h4>
    <p>Any value can be used where a bool is expected. These are all "falsy": <span class="inline-code">False</span>, <span class="inline-code">0</span>, <span class="inline-code">0.0</span>, <span class="inline-code">""</span>, <span class="inline-code">[]</span>, <span class="inline-code">{}</span>, <span class="inline-code">set()</span>, and <span class="inline-code">None</span>. Everything else is truthy &mdash; which is why <span class="inline-code">if my_list:</span> is idiomatic for "if the list is non-empty".</p>
    <h4>Ternary expression</h4>
    <p><span class="inline-code">result = "even" if n % 2 == 0 else "odd"</span> packs a simple if/else into one expression.</p>
  `,
  starterCode: `def grade(score):
    """90+ -> "A", 80-89 -> "B", 70-79 -> "C", 60-69 -> "D", below 60 -> "F"."""
    # TODO: an if/elif/else chain, checking from highest to lowest
    pass


def classify(x):
    """Return "positive", "negative", or "zero"."""
    # TODO
    pass
`,
  tests: [
    { description: 'grade handles the boundaries correctly', code: `assert grade(95) == "A"\nassert grade(90) == "A"\nassert grade(89) == "B"` },
    { description: 'grade handles a failing score', code: `assert grade(40) == "F"` },
    { description: 'classify identifies positive, negative, and zero', code: `assert classify(5) == "positive"\nassert classify(-5) == "negative"\nassert classify(0) == "zero"` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [
    { q: 'If multiple elif conditions would technically be True, how many branches run?', options: ['All of them', 'Just the first one that matches, top to bottom', 'None, that\'s an error'], answer: 1, explain: 'Python stops checking as soon as it finds a True condition &mdash; order matters when conditions overlap.' },
    { q: 'What does <span class="inline-code">if []:</span> do?', options: ['Runs the if-block, since [] is a valid value', 'Skips the if-block, since an empty list is falsy', 'Raises a TypeError'], answer: 1, explain: 'Empty containers are falsy in Python, so this behaves like if False.' },
  ],
});

// ---------- 8. Loops: for & while ----------
PYTHON_CORE_LEVELS.push({
  id: 'pycore-loops',
  track: 'pycore',
  title: 'Loops: for & while',
  concept: 'Repeating work, and stopping early',
  xp: 60,
  intro: 'for loops iterate over a known sequence; while loops repeat until a condition changes. break and continue give you fine-grained control over either.',
  theory: `
    <h4>for loops</h4>
    <p><span class="inline-code">for item in iterable:</span> works on any sequence &mdash; lists, strings, dicts, <span class="inline-code">range()</span>. It always terminates once the sequence is exhausted.</p>
    <h4>while loops</h4>
    <p><span class="inline-code">while condition:</span> repeats as long as the condition stays true. You are responsible for eventually making it false &mdash; forgetting to update the condition is the classic infinite-loop bug.</p>
    <h4>break and continue</h4>
    <ul>
      <li><span class="inline-code">break</span> &mdash; exit the loop immediately</li>
      <li><span class="inline-code">continue</span> &mdash; skip to the next iteration</li>
    </ul>
    <p>Both work identically in for and while loops.</p>
  `,
  starterCode: `def sum_up_to(n):
    """Sum of 1 + 2 + ... + n, using a loop (not the formula)."""
    # TODO
    pass


def first_divisible(nums, d):
    """Return the first element of nums divisible by d, or None if there isn't one."""
    # TODO: loop through nums, return as soon as you find a match
    pass
`,
  tests: [
    { description: 'sum_up_to sums correctly', code: `assert sum_up_to(5) == 15, f"expected 15, got {sum_up_to(5)}"\nassert sum_up_to(1) == 1` },
    { description: 'first_divisible finds the first match', code: `result = first_divisible([7, 9, 12, 15, 20], 4)\nassert result == 12, f"expected 12, got {result}"` },
    { description: 'first_divisible returns None when nothing matches', code: `assert first_divisible([1, 3, 5], 2) is None` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [
    { q: 'What is the risk unique to while loops that for loops don\'t have?', options: ['while loops can\'t use break', 'Forgetting to update the condition can cause an infinite loop', 'while loops can only count downward'], answer: 1, explain: 'A for loop always terminates once its sequence runs out; a while loop depends entirely on you correctly updating its condition.' },
    { q: 'Inside a loop, what does <span class="inline-code">continue</span> do?', options: ['Exits the loop entirely', 'Skips the rest of the current iteration and moves to the next one', 'Pauses the loop'], answer: 1, explain: 'continue jumps straight back to the loop\'s condition/next item, skipping any remaining code in that iteration.' },
  ],
});

// ---------- 9. Functions & Arguments ----------
PYTHON_CORE_LEVELS.push({
  id: 'pycore-functions',
  track: 'pycore',
  title: 'Functions & Arguments',
  concept: 'Reusable blocks of code, and every way to pass them data',
  xp: 80,
  intro: 'A function packages logic you can call repeatedly. Python\'s argument system is unusually flexible &mdash; positional, keyword, default, and variable-length arguments all combine.',
  theory: `
    ${diagramFunctionCall()}
    <h4>Kinds of arguments</h4>
    <ul>
      <li><strong>Positional</strong>: <span class="inline-code">def f(a, b):</span> &mdash; matched by order</li>
      <li><strong>Default</strong>: <span class="inline-code">def f(a, b=10):</span> &mdash; used when the caller omits b</li>
      <li><strong>*args</strong>: <span class="inline-code">def f(*nums):</span> &mdash; collects any number of extra positional arguments into a tuple</li>
      <li><strong>**kwargs</strong>: <span class="inline-code">def f(**opts):</span> &mdash; collects any number of extra keyword arguments into a dict</li>
    </ul>
    <h4>Return values</h4>
    <p>A function without an explicit <span class="inline-code">return</span> returns <span class="inline-code">None</span>. <span class="inline-code">return a, b</span> packages multiple values into a tuple automatically.</p>
  `,
  starterCode: `def total(*nums):
    """total(1, 2, 3) -> 6. Sum any number of positional arguments."""
    # TODO: nums is a tuple here - sum it
    pass


def build_profile(name, **details):
    """build_profile("Ann", age=25, city="NY") -> {"name": "Ann", "age": 25, "city": "NY"}"""
    # TODO: merge name into the details dict under the key "name"
    pass
`,
  tests: [
    { description: 'total sums a variable number of arguments', code: `assert total(1, 2, 3) == 6\nassert total() == 0\nassert total(5) == 5` },
    { description: 'build_profile merges name with keyword details', code: `result = build_profile("Ann", age=25, city="NY")\nassert result == {"name": "Ann", "age": 25, "city": "NY"}, f"got {result}"` },
    { description: 'build_profile works with no extra details', code: `assert build_profile("Bo") == {"name": "Bo"}` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [
    { q: 'Inside <span class="inline-code">def f(*nums):</span>, what type is nums?', options: ['A list', 'A tuple', 'A dict'], answer: 1, explain: '*args always collects into a tuple, not a list (though you can convert it if you need to mutate it).' },
    { q: 'What does a function that never hits a <span class="inline-code">return</span> statement return?', options: ['0', 'An empty string', 'None'], answer: 2, explain: 'Every Python function returns something; falling off the end implicitly returns None.' },
  ],
});

// ---------- 10. Lambda & Higher-Order Functions ----------
PYTHON_CORE_LEVELS.push({
  id: 'pycore-lambda-hof',
  track: 'pycore',
  title: 'Lambda & Higher-Order Functions',
  concept: 'Functions as values you can pass around',
  xp: 80,
  intro: 'In Python, functions are ordinary objects: you can store them in variables, pass them as arguments, and return them from other functions. Lambdas are just a compact way to write small, unnamed functions.',
  theory: `
    <h4>Lambda syntax</h4>
    <p><span class="inline-code">lambda x: x * 2</span> is exactly equivalent to writing a tiny <span class="inline-code">def</span> function that returns <span class="inline-code">x * 2</span> &mdash; it's an expression, not a statement, so it can be passed inline.</p>
    <h4>Functions that take functions</h4>
    <p>A "higher-order function" is one that accepts another function as an argument. The most common ones:</p>
    <ul>
      <li><span class="inline-code">sorted(items, key=fn)</span> &mdash; sort using fn(item) as the sort key</li>
      <li><span class="inline-code">map(fn, items)</span> &mdash; apply fn to every item (returns an iterator)</li>
      <li><span class="inline-code">filter(fn, items)</span> &mdash; keep items where fn(item) is truthy</li>
    </ul>
    <p>Many of these have a more "Pythonic" list-comprehension equivalent, but you'll see them constantly in real code, especially <span class="inline-code">key=</span> arguments.</p>
  `,
  starterCode: `def sort_by_length(words):
    """Sort a list of strings by length, shortest first. Use sorted() with a key."""
    # TODO
    pass


def apply_twice(f, x):
    """Return f(f(x)) - call f on x, then call f again on the result."""
    # TODO
    pass
`,
  tests: [
    { description: 'sort_by_length orders shortest to longest', code: `result = sort_by_length(["banana", "kiwi", "fig"])\nassert result == ["fig", "kiwi", "banana"], f"expected ['fig', 'kiwi', 'banana'], got {result}"` },
    { description: 'sort_by_length preserves relative order for equal lengths (stable sort)', code: `result = sort_by_length(["ab", "cd", "e"])\nassert result == ["e", "ab", "cd"], f"got {result}"` },
    { description: 'apply_twice composes a function with itself', code: `result = apply_twice(lambda x: x * 2, 3)\nassert result == 12, f"expected 12 (3*2*2), got {result}"` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [
    { q: 'Can a lambda contain multiple statements, like an if followed by a loop?', options: ['Yes, just like a regular function', 'No &mdash; a lambda body is a single expression only', 'Only in Python 3.10+'], answer: 1, explain: 'Lambdas are intentionally limited to one expression. Anything more complex needs a regular def function.' },
    { q: '<span class="inline-code">sorted(people, key=lambda p: p["age"])</span> sorts people by:', options: ['Alphabetical order of the whole dict', 'The value under the "age" key in each dict', 'Insertion order'], answer: 1, explain: 'key= tells sorted() what to compare instead of comparing the items themselves.' },
  ],
});

// ---------- 11. Exception Handling ----------
PYTHON_CORE_LEVELS.push({
  id: 'pycore-exceptions',
  track: 'pycore',
  title: 'Exception Handling',
  concept: 'Dealing with errors gracefully instead of crashing',
  xp: 90,
  intro: 'When something goes wrong, Python raises an exception. try/except lets your program catch it and respond instead of crashing outright.',
  theory: `
    ${diagramExceptionFlow()}
    <h4>Catching specific errors</h4>
    <p>Always catch the SPECIFIC exception type you expect (<span class="inline-code">except ZeroDivisionError:</span>), not a bare <span class="inline-code">except:</span> &mdash; a bare except silently swallows bugs you didn't anticipate too.</p>
    <h4>Raising your own exceptions</h4>
    <p><span class="inline-code">raise ValueError("message")</span> signals that something is wrong. You can also define custom exception types by subclassing <span class="inline-code">Exception</span>, which lets callers catch YOUR specific error case distinctly from generic ones.</p>
    <pre class="code-block">class NegativeValueError(Exception):
    pass

def require_positive(n):
    if n < 0:
        raise NegativeValueError(f"{n} is negative")
    return n</pre>
  `,
  starterCode: `def safe_divide(a, b):
    """Return a / b, or the string "Cannot divide by zero" if b is 0."""
    # TODO: try the division, except ZeroDivisionError return the message
    pass


class NegativeValueError(Exception):
    pass


def require_positive(n):
    """Return n if it's >= 0, otherwise raise NegativeValueError."""
    # TODO
    pass
`,
  tests: [
    { description: 'safe_divide returns the normal result when b is not zero', code: `result = safe_divide(10, 2)\nassert result == 5, f"expected 5, got {result}"` },
    { description: 'safe_divide catches division by zero', code: `result = safe_divide(10, 0)\nassert result == "Cannot divide by zero", f"got {result!r}"` },
    { description: 'require_positive returns non-negative values unchanged', code: `assert require_positive(5) == 5\nassert require_positive(0) == 0` },
    { description: 'require_positive raises NegativeValueError for negatives', code: `try:\n    require_positive(-3)\n    assert False, "expected NegativeValueError to be raised"\nexcept NegativeValueError:\n    pass` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [
    { q: 'Why is <span class="inline-code">except Exception:</span> (catching everything) usually a bad idea?', options: ['It\'s slower than catching specific errors', 'It can silently hide bugs you never intended to catch, making them hard to find', 'Python doesn\'t allow it'], answer: 1, explain: 'A typo causing a NameError would get silently swallowed right alongside the ZeroDivisionError you meant to handle.' },
    { q: 'What is the point of defining a custom exception class like NegativeValueError?', options: ['It runs faster than a built-in exception', 'Callers can catch that SPECIFIC error case separately from other, unrelated errors', 'Python requires custom exceptions for raise to work'], answer: 1, explain: 'A custom exception type lets calling code write "except NegativeValueError:" instead of a broad catch-all.' },
  ],
});

// ---------- 12. Modules & Imports ----------
PYTHON_CORE_LEVELS.push({
  id: 'pycore-modules',
  track: 'pycore',
  title: 'Modules & Imports',
  concept: 'Reusing code across files, and the standard library',
  xp: 70,
  intro: 'A module is just a .py file full of reusable code. import lets you pull functions, classes, and constants from other modules &mdash; including Python\'s huge built-in standard library.',
  theory: `
    <h4>Import styles</h4>
    <pre class="code-block">import math                  # access via math.pi, math.sqrt(...)
from math import pi, sqrt    # use pi and sqrt directly
import numpy as np           # import under an alias</pre>
    <h4>Handy standard-library modules</h4>
    <ul>
      <li><span class="inline-code">math</span> &mdash; pi, sqrt, floor/ceil, trig functions</li>
      <li><span class="inline-code">random</span> &mdash; random numbers and choices</li>
      <li><span class="inline-code">datetime</span> &mdash; dates and times</li>
      <li><span class="inline-code">json</span> &mdash; convert between Python objects and JSON text</li>
      <li><span class="inline-code">statistics</span> &mdash; mean, median, standard deviation</li>
    </ul>
    <p>"Batteries included" is a common description of Python &mdash; a huge amount of everyday functionality ships in the standard library, no installation required.</p>
  `,
  starterCode: `import math
import json


def circle_area(radius):
    """Area of a circle: pi * r^2, rounded to 2 decimal places. Use math.pi."""
    # TODO
    pass


def to_json(data):
    """Convert a Python dict/list to a JSON string, using json.dumps."""
    # TODO
    pass


def from_json(text):
    """Parse a JSON string back into a Python object, using json.loads."""
    # TODO
    pass
`,
  tests: [
    { description: 'circle_area uses math.pi correctly', code: `result = circle_area(2)\nassert result == 12.57, f"expected 12.57, got {result}"` },
    { description: 'to_json produces valid JSON text', code: `result = to_json({"a": 1})\nimport json as _json\nassert _json.loads(result) == {"a": 1}, f"got {result!r}"` },
    { description: 'from_json parses JSON back into Python objects', code: `result = from_json('{"x": [1, 2, 3]}')\nassert result == {"x": [1, 2, 3]}, f"got {result}"` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [
    { q: 'What is the difference between <span class="inline-code">import math</span> and <span class="inline-code">from math import pi</span>?', options: ['No difference at all', 'The first requires math.pi; the second lets you write pi directly', 'from import is faster'], answer: 1, explain: '"from X import Y" pulls Y directly into your namespace, while "import X" requires the X. prefix.' },
    { q: 'What does "batteries included" mean about Python?', options: ['Python only runs on laptops', 'A large standard library ships with Python itself, needing no separate installation', 'Python requires a battery-backed computer'], answer: 1, explain: 'Modules like math, json, and datetime are always available &mdash; no pip install needed.' },
  ],
});

// ---------- 13. Iterators & Generators ----------
PYTHON_CORE_LEVELS.push({
  id: 'pycore-iterators-generators',
  track: 'pycore',
  title: 'Iterators & Generators',
  concept: 'What a for loop is really doing, and lazy value production',
  xp: 90,
  intro: 'Every for loop is secretly calling next() repeatedly. Generators let you write functions that produce a sequence of values lazily, one at a time, without building the whole list in memory first.',
  theory: `
    ${diagramIterator()}
    <h4>yield</h4>
    <p>A function containing <span class="inline-code">yield</span> becomes a <strong>generator function</strong>. Calling it doesn't run the body immediately &mdash; it returns a generator object. Each call to <span class="inline-code">next()</span> (which a for loop does automatically) runs the body until the next <span class="inline-code">yield</span>, then pauses, remembering exactly where it left off.</p>
    ${diagramGenerator()}
    <h4>Why bother?</h4>
    <p>A generator never builds the full sequence in memory at once &mdash; useful for very large or even infinite sequences. <span class="inline-code">(x*x for x in range(1000000))</span> (a generator expression, note the parentheses) uses almost no memory compared to the equivalent list comprehension.</p>
  `,
  starterCode: `def countdown(n):
    """A generator yielding n, n-1, n-2, ..., 1 (then stopping)."""
    # TODO: use a while or for loop with yield inside
    pass


def even_numbers(limit):
    """A generator yielding even numbers from 0 up to (and including) limit."""
    # TODO
    pass
`,
  tests: [
    { description: 'countdown yields the correct sequence', code: `result = list(countdown(4))\nassert result == [4, 3, 2, 1], f"expected [4, 3, 2, 1], got {result}"` },
    { description: 'countdown is a generator, not a list', code: `import types\nresult = countdown(3)\nassert isinstance(result, types.GeneratorType), "countdown should use yield, making it a generator"` },
    { description: 'even_numbers yields evens up to and including the limit', code: `result = list(even_numbers(10))\nassert result == [0, 2, 4, 6, 8, 10], f"expected [0, 2, 4, 6, 8, 10], got {result}"` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [
    { q: 'What happens when you call a generator function directly, like <span class="inline-code">countdown(4)</span>?', options: ['The whole body runs immediately, returning a list', 'It returns a generator object immediately, without running any code yet', 'It raises an error'], answer: 1, explain: 'The body only starts executing once you iterate it (e.g., with next() or a for loop).' },
    { q: 'Why might a generator be preferable to building a full list for a huge sequence?', options: ['Generators are always faster to iterate', 'A generator produces values one at a time instead of holding the entire sequence in memory at once', 'Lists can\'t hold more than 1000 items'], answer: 1, explain: 'Memory usage is the main win: a generator for a billion numbers uses the same tiny memory as one for ten.' },
  ],
});

// ---------- 14. Decorators ----------
PYTHON_CORE_LEVELS.push({
  id: 'pycore-decorators',
  track: 'pycore',
  title: 'Decorators',
  concept: 'Wrapping a function to add behavior, without changing its code',
  xp: 90,
  intro: 'A decorator is a function that takes a function and returns a new (usually wrapped) function. The @ syntax is just sugar for reassigning a function to its own decorated version.',
  theory: `
    ${diagramDecorator()}
    <h4>What @ actually does</h4>
    <pre class="code-block">@my_decorator
def say_hi():
    ...

# is exactly equivalent to:
def say_hi():
    ...
say_hi = my_decorator(say_hi)</pre>
    <h4>A minimal decorator</h4>
    <pre class="code-block">def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("before")
        result = func(*args, **kwargs)
        print("after")
        return result
    return wrapper</pre>
    <p><span class="inline-code">wrapper</span> accepts any arguments (via *args/**kwargs), calls the original function in the middle, and returns its result &mdash; so decorated functions still work exactly like the original from the caller's perspective, just with extra behavior wrapped around them. Real-world uses: logging, timing, caching, and access control.</p>
  `,
  starterCode: `def uppercase_result(func):
    """A decorator that calls func, then uppercases its (string) return value."""
    def wrapper(*args, **kwargs):
        # TODO: call func with args/kwargs, uppercase the result, return it
        pass
    return wrapper


@uppercase_result
def greet(name):
    return f"hello, {name}"
`,
  tests: [
    { description: 'The decorated function uppercases its result', code: `result = greet("ann")\nassert result == "HELLO, ANN", f"expected 'HELLO, ANN', got {result!r}"` },
    { description: 'The decorator still passes arguments through correctly', code: `result = greet("bo")\nassert result == "HELLO, BO", f"got {result!r}"` },
    { description: 'uppercase_result works generically on any function returning a string', code: `@uppercase_result\ndef shout(word):\n    return word + "!"\nresult = shout("wow")\nassert result == "WOW!", f"got {result!r}"` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [
    { q: '<span class="inline-code">@my_decorator</span> above a function definition is shorthand for:', options: ['Calling the function immediately', 'func = my_decorator(func), reassigning the name to the wrapped version', 'Making the function private'], answer: 1, explain: 'The decorator syntax is pure sugar &mdash; it doesn\'t do anything you couldn\'t write by hand with a reassignment.' },
    { q: 'Why does the inner wrapper function accept <span class="inline-code">*args, **kwargs</span> instead of specific named parameters?', options: ['So it works with ANY function signature the decorator gets applied to', 'It\'s required syntax for all inner functions', 'To make the code shorter'], answer: 0, explain: 'A decorator is usually meant to be reusable across many different functions with different argument lists.' },
  ],
});

// ---------- 15. OOP: Classes & Objects ----------
PYTHON_CORE_LEVELS.push({
  id: 'pycore-oop-classes',
  track: 'pycore',
  title: 'OOP: Classes & Objects',
  concept: 'Blueprints for bundling data with behavior',
  xp: 90,
  intro: 'A class defines a blueprint for objects that bundle data (attributes) with the functions that operate on them (methods). Every object built from the same class is an independent instance.',
  theory: `
    ${diagramClassObject()}
    <h4>The anatomy of a class</h4>
    <pre class="code-block">class Rectangle:
    def __init__(self, width, height):
        self.width = width      # instance attribute
        self.height = height

    def area(self):
        return self.width * self.height</pre>
    <p><span class="inline-code">__init__</span> runs automatically when you create an object (<span class="inline-code">Rectangle(3, 4)</span>), setting up its initial attributes. <span class="inline-code">self</span> refers to the specific instance a method was called on &mdash; every method needs it as its first parameter.</p>
    <h4>Instance vs. class attributes</h4>
    <p>Attributes set via <span class="inline-code">self.x = ...</span> inside <span class="inline-code">__init__</span> belong to that ONE instance. Attributes defined directly in the class body are shared by all instances unless overridden.</p>
  `,
  starterCode: `class Rectangle:
    def __init__(self, width, height):
        # TODO: store width and height as instance attributes
        pass

    def area(self):
        # TODO
        pass

    def perimeter(self):
        # TODO
        pass
`,
  tests: [
    { description: 'Rectangle stores width and height', code: `r = Rectangle(3, 4)\nassert r.width == 3 and r.height == 4` },
    { description: 'area computes width * height', code: `r = Rectangle(3, 4)\nassert r.area() == 12, f"expected 12, got {r.area()}"` },
    { description: 'perimeter computes 2 * (width + height)', code: `r = Rectangle(3, 4)\nassert r.perimeter() == 14, f"expected 14, got {r.perimeter()}"` },
    { description: 'Two Rectangles are independent instances', code: `a = Rectangle(2, 2)\nb = Rectangle(5, 5)\nassert a.area() == 4 and b.area() == 25, "each instance should keep its own width/height"` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [
    { q: 'What is <span class="inline-code">self</span>?', options: ['A global variable shared by all classes', 'A reference to the specific instance a method is being called on', 'A keyword that creates a new class'], answer: 1, explain: 'self.width inside a method means "the width attribute belonging to THIS particular object".' },
    { q: 'When does <span class="inline-code">__init__</span> run?', options: ['Every time any method is called', 'Automatically, once, when a new instance is created', 'Only if you call it manually'], answer: 1, explain: 'Rectangle(3, 4) automatically calls __init__(self, 3, 4) to set up the new object.' },
  ],
});

// ---------- 16. OOP: Inheritance & Polymorphism ----------
PYTHON_CORE_LEVELS.push({
  id: 'pycore-oop-inheritance',
  track: 'pycore',
  title: 'OOP: Inheritance & Polymorphism',
  concept: 'Sharing behavior between related classes, and overriding it',
  xp: 100,
  intro: 'Inheritance lets a class reuse and extend another class\'s behavior. Polymorphism means different classes can respond to the same method call in their own way.',
  theory: `
    ${diagramInheritance()}
    <h4>Inheriting</h4>
    <pre class="code-block">class Animal:
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):          # overrides Animal's version
        return "Woof!"</pre>
    <p><span class="inline-code">Dog(Animal)</span> means Dog automatically gets everything Animal defines. Overriding <span class="inline-code">speak</span> replaces the inherited behavior for Dog specifically, while Cat could override it differently.</p>
    <h4>Polymorphism in practice</h4>
    <p>Code that calls <span class="inline-code">shape.area()</span> doesn't need to know or care whether <span class="inline-code">shape</span> is a Square or a Circle &mdash; each subclass provides its own correct <span class="inline-code">area()</span>, and the right one runs automatically based on the object's actual type.</p>
  `,
  starterCode: `class Shape:
    def area(self):
        raise NotImplementedError("subclasses must implement area()")


class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        # TODO
        pass


class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        # TODO: use 3.14159 for pi, rounded to 2 decimal places
        pass
`,
  tests: [
    { description: 'Square.area computes side*side', code: `s = Square(4)\nassert s.area() == 16, f"expected 16, got {s.area()}"` },
    { description: 'Circle.area computes pi*r^2', code: `c = Circle(2)\nassert c.area() == 12.57, f"expected 12.57, got {c.area()}"` },
    { description: 'Both are Shape instances (inheritance works)', code: `assert isinstance(Square(1), Shape)\nassert isinstance(Circle(1), Shape)` },
    { description: 'Polymorphism: calling area() on a list of different shapes works uniformly', code: `shapes = [Square(2), Circle(1)]\nareas = [s.area() for s in shapes]\nassert areas == [4, 3.14], f"expected [4, 3.14], got {areas}"` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [
    { q: 'Why does the base Shape.area() raise NotImplementedError instead of returning 0?', options: ['To make Shape run faster', 'To force every subclass to provide its own real implementation, catching a missed override early', 'It\'s required syntax'], answer: 1, explain: 'If a subclass forgets to override area(), calling it loudly fails instead of silently returning a meaningless 0.' },
    { q: 'What is "polymorphism" demonstrating in the shapes list example?', options: ['All shapes have the exact same area', 'The same method call (.area()) produces different, type-appropriate behavior depending on the actual object', 'Shapes can change their own type at runtime'], answer: 1, explain: 'Calling code doesn\'t need to check each shape\'s type &mdash; the correct area() runs automatically.' },
  ],
});

// ---------- 17. OOP: Encapsulation & Properties ----------
PYTHON_CORE_LEVELS.push({
  id: 'pycore-oop-encapsulation',
  track: 'pycore',
  title: 'OOP: Encapsulation & Properties',
  concept: 'Protecting an object\'s internal state from invalid changes',
  xp: 100,
  intro: 'Encapsulation bundles data with the methods that safely operate on it, so outside code can\'t put an object into an invalid state by poking at its internals directly.',
  theory: `
    ${diagramEncapsulation()}
    <h4>Naming conventions</h4>
    <p>Python doesn't have true "private" attributes, but conventions signal intent: a single leading underscore (<span class="inline-code">self._balance</span>) means "internal, please don't touch directly from outside the class."</p>
    <h4>Validating through methods</h4>
    <p>Instead of letting code set <span class="inline-code">account._balance = -1000000</span> directly, expose a method like <span class="inline-code">deposit(amount)</span> that validates the input before changing internal state &mdash; that's the whole point of encapsulation.</p>
    <h4>@property</h4>
    <p><span class="inline-code">@property</span> lets you expose a method as if it were a plain attribute (<span class="inline-code">account.balance</span> instead of <span class="inline-code">account.balance()</span>), while still controlling access behind the scenes &mdash; useful for read-only or computed values.</p>
  `,
  starterCode: `class BankAccount:
    def __init__(self, starting_balance=0):
        self._balance = starting_balance

    def deposit(self, amount):
        """Add amount to the balance. Raise ValueError if amount <= 0."""
        # TODO
        pass

    def withdraw(self, amount):
        """Subtract amount from the balance. Raise ValueError if amount <= 0
        OR if amount is more than the current balance."""
        # TODO
        pass

    @property
    def balance(self):
        """Read-only access to the current balance."""
        return self._balance
`,
  tests: [
    { description: 'deposit increases the balance', code: `a = BankAccount(100)\na.deposit(50)\nassert a.balance == 150, f"expected 150, got {a.balance}"` },
    { description: 'deposit rejects non-positive amounts', code: `a = BankAccount(100)\ntry:\n    a.deposit(-10)\n    assert False, "expected ValueError"\nexcept ValueError:\n    pass` },
    { description: 'withdraw decreases the balance', code: `a = BankAccount(100)\na.withdraw(30)\nassert a.balance == 70, f"expected 70, got {a.balance}"` },
    { description: 'withdraw rejects amounts greater than the balance', code: `a = BankAccount(50)\ntry:\n    a.withdraw(100)\n    assert False, "expected ValueError"\nexcept ValueError:\n    pass` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [
    { q: 'What is the main purpose of routing balance changes through deposit()/withdraw() instead of letting code set _balance directly?', options: ['It runs faster', 'It lets you validate every change, preventing the object from entering an invalid state', 'Python requires methods for all attribute changes'], answer: 1, explain: 'Encapsulation is about guaranteeing invariants (like "balance can\'t go negative") by controlling the only paths that can change the data.' },
    { q: 'What does <span class="inline-code">@property</span> let you do?', options: ['Make an attribute truly private and unreadable', 'Call a method using attribute syntax, like account.balance instead of account.balance()', 'Automatically save the object to a file'], answer: 1, explain: '@property is purely about syntax/interface &mdash; it lets a computed or protected value be accessed like a plain attribute.' },
  ],
});

// ---------- 18. OOP: Dunder / Magic Methods ----------
PYTHON_CORE_LEVELS.push({
  id: 'pycore-oop-dunder',
  track: 'pycore',
  title: 'OOP: Dunder (Magic) Methods',
  concept: 'Making your own objects work with +, ==, len(), print(), and more',
  xp: 100,
  intro: 'Methods named with double underscores (like __init__) are called "dunder" or "magic" methods. They let your custom objects hook into Python\'s built-in operators and functions.',
  theory: `
    ${diagramDunder()}
    <h4>The most common ones</h4>
    <ul>
      <li><span class="inline-code">__init__(self, ...)</span> &mdash; constructor, runs on creation</li>
      <li><span class="inline-code">__str__(self)</span> &mdash; what <span class="inline-code">str(obj)</span> / <span class="inline-code">print(obj)</span> shows</li>
      <li><span class="inline-code">__eq__(self, other)</span> &mdash; what <span class="inline-code">obj == other</span> checks</li>
      <li><span class="inline-code">__len__(self)</span> &mdash; what <span class="inline-code">len(obj)</span> returns</li>
      <li><span class="inline-code">__add__(self, other)</span> &mdash; what <span class="inline-code">obj + other</span> computes</li>
    </ul>
    <p>This is called <strong>operator overloading</strong>: without defining <span class="inline-code">__add__</span>, Python has no idea what <span class="inline-code">+</span> should mean for your custom class, so it raises a TypeError.</p>
  `,
  starterCode: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        """Vector(1,2) + Vector(3,4) -> Vector(4,6). Return a NEW Vector."""
        # TODO
        pass

    def __eq__(self, other):
        """Two Vectors are equal if their x AND y both match."""
        # TODO
        pass

    def __str__(self):
        """Return "Vector(x, y)", e.g. "Vector(1, 2)"."""
        # TODO
        pass
`,
  tests: [
    { description: '+ combines two Vectors component-wise', code: `v = Vector(1, 2) + Vector(3, 4)\nassert v.x == 4 and v.y == 6, f"expected (4, 6), got ({v.x}, {v.y})"` },
    { description: '== compares Vectors by value, not identity', code: `assert Vector(1, 2) == Vector(1, 2)\nassert not (Vector(1, 2) == Vector(3, 4))` },
    { description: 'str() formats a Vector readably', code: `result = str(Vector(1, 2))\nassert result == "Vector(1, 2)", f"expected 'Vector(1, 2)', got {result!r}"` },
  ],
  mount(root, onTaskDone) { renderCodeChallenge(root, { starterCode: this.starterCode, tests: this.tests }, onTaskDone); },
  quiz: [
    { q: 'Without defining __eq__, what does <span class="inline-code">Vector(1,2) == Vector(1,2)</span> return by default?', options: ['True, Python compares attributes automatically', 'False &mdash; default equality checks if they\'re the SAME object in memory, not equal values', 'A TypeError'], answer: 1, explain: 'Without __eq__, == falls back to identity comparison (is), so two separately-created equal-looking objects compare unequal.' },
    { q: 'Why is this pattern called "operator overloading"?', options: ['It makes operators run slower ("overload")', 'You\'re redefining what a built-in operator (+, ==, etc.) means for your own type', 'It overloads the CPU'], answer: 1, explain: '+ already means something for ints and strings; __add__ lets you give it a sensible meaning for your own classes too.' },
  ],
});
