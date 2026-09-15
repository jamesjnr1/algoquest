const STORAGE_KEY = 'algoquest_save_v1';

const RANKS = [
  { min: 0, name: 'Novice' },
  { min: 150, name: 'Apprentice' },
  { min: 400, name: 'Adept' },
  { min: 800, name: 'Expert' },
  { min: 1300, name: 'Algorithm Master' },
];

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { xp: 0, completed: {}, streakDates: [] };
    const parsed = JSON.parse(raw);
    return { xp: parsed.xp || 0, completed: parsed.completed || {}, streakDates: parsed.streakDates || [] };
  } catch (e) {
    return { xp: 0, completed: {}, streakDates: [] };
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) { /* storage unavailable, ignore */ }
}

function rankFor(xp) {
  let cur = RANKS[0];
  for (const r of RANKS) if (xp >= r.min) cur = r;
  return cur.name;
}

const Store = {
  state: loadState(),
  isComplete(id) { return !!this.state.completed[id]; },
  complete(id, xp) {
    if (this.isComplete(id)) return false;
    this.state.completed[id] = true;
    this.state.xp += xp;
    const today = dateStr(new Date());
    if (!this.state.streakDates.includes(today)) this.state.streakDates.push(today);
    saveState(this.state);
    return true;
  },
  reset() {
    this.state = { xp: 0, completed: {}, streakDates: [] };
    saveState(this.state);
  },
};

function dateStr(d) { return d.toISOString().slice(0, 10); }

function currentStreak(streakDates) {
  const set = new Set(streakDates || []);
  if (set.size === 0) return 0;
  const cursor = new Date();
  if (!set.has(dateStr(cursor))) cursor.setDate(cursor.getDate() - 1);
  let count = 0;
  while (set.has(dateStr(cursor))) {
    count++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return count;
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2600);
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
