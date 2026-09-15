const TRACKS = [
  { id: 'dsa', label: '🧩 DSA Isle', levels: DSA_LEVELS },
  { id: 'r', label: '📊 R Harbor', levels: R_LEVELS },
];

let currentTrack = 'dsa';

function levelsForTrack(trackId) {
  return TRACKS.find((t) => t.id === trackId).levels;
}

function isUnlocked(trackId, idx) {
  if (idx === 0) return true;
  const levels = levelsForTrack(trackId);
  return Store.isComplete(levels[idx - 1].id);
}

function totalXp() {
  return TRACKS.reduce((sum, t) => sum + t.levels.reduce((s, l) => s + l.xp, 0), 0);
}

function renderXp() {
  const xp = Store.state.xp;
  document.getElementById('xp-value').textContent = xp;
  const pct = Math.min(100, Math.round((xp / totalXp()) * 100));
  document.getElementById('xp-fill').style.width = pct + '%';
  document.getElementById('rank-badge').textContent = rankFor(xp);
}

function renderTabs() {
  const wrap = document.getElementById('track-tabs');
  clear(wrap);
  TRACKS.forEach((t) => {
    const btn = h('button', { class: 'track-tab' + (t.id === currentTrack ? ' active' : '') }, t.label);
    btn.addEventListener('click', () => {
      currentTrack = t.id;
      renderTabs();
      renderMap();
      showWelcome();
    });
    wrap.appendChild(btn);
  });
}

function showWelcome() {
  const stage = document.getElementById('stage');
  clear(stage);
  const track = TRACKS.find((t) => t.id === currentTrack);
  const done = track.levels.filter((l) => Store.isComplete(l.id)).length;
  const welcome = h('div', { class: 'welcome' });
  welcome.appendChild(h('h1', {}, track.label));
  welcome.appendChild(h('p', {}, `${done} of ${track.levels.length} levels complete on this track. Pick a level on the left to continue.`));
  stage.appendChild(welcome);
}

function renderMap() {
  const map = document.getElementById('level-map');
  clear(map);
  const track = TRACKS.find((t) => t.id === currentTrack);
  map.appendChild(h('div', { class: 'map-heading' }, track.label));
  track.levels.forEach((level, idx) => {
    const unlocked = isUnlocked(currentTrack, idx);
    const complete = Store.isComplete(level.id);
    const card = h('div', { class: 'level-card' + (unlocked ? '' : ' locked') });
    const top = h('div', { class: 'lc-top' });
    top.appendChild(h('span', { class: 'lc-title' }, `${idx + 1}. ${level.title}`));
    top.appendChild(complete ? h('span', { class: 'lc-check' }, '✓') : h('span', { class: 'lc-xp' }, `+${level.xp}xp`));
    card.appendChild(top);
    card.appendChild(h('div', { class: 'lc-concept' }, unlocked ? level.concept : 'Complete the level above to unlock'));
    if (unlocked) {
      card.addEventListener('click', () => renderLevel(currentTrack, idx));
    }
    map.appendChild(card);
  });
}

function renderLevel(trackId, idx) {
  const level = levelsForTrack(trackId)[idx];
  Array.from(document.querySelectorAll('.level-card')).forEach((c) => c.classList.remove('active'));
  const cards = document.getElementById('level-map').children;
  if (cards[idx + 1]) cards[idx + 1].classList.add('active'); // +1 to skip heading

  const stage = document.getElementById('stage');
  clear(stage);

  const header = h('div', { class: 'level-header' });
  header.appendChild(h('div', { class: 'concept-tag' }, level.concept));
  header.appendChild(h('h2', {}, level.title));
  stage.appendChild(header);

  const intro = h('div', { class: 'level-intro' });
  intro.innerHTML = level.intro;
  stage.appendChild(intro);

  if (Store.isComplete(level.id)) {
    stage.appendChild(h('div', { class: 'hint-line' }, 'You\'ve already completed this level — feel free to replay it, no extra XP this time.'));
  }

  stage.appendChild(h('div', { class: 'section-title' }, 'Try it'));
  const taskRoot = h('div', {});
  stage.appendChild(taskRoot);

  let taskDone = false;
  function onTaskDone() {
    if (taskDone) return;
    taskDone = true;
    stage.appendChild(h('div', { class: 'section-title' }, 'Quick check'));
    const quizRoot = h('div', {});
    stage.appendChild(quizRoot);
    renderQuiz(quizRoot, level.quiz, () => onQuizDone(trackId, idx, level));
  }
  level.mount(taskRoot, onTaskDone);
}

function onQuizDone(trackId, idx, level) {
  const awarded = Store.complete(level.id, level.xp);
  renderXp();
  renderMap();
  const stage = document.getElementById('stage');
  const banner = successBanner(awarded ? `Level complete! +${level.xp} XP` : 'Nice review! (Already completed — no extra XP)');
  const levels = levelsForTrack(trackId);
  const btnRow = h('div', { style: 'display:flex;gap:10px;' });
  if (idx + 1 < levels.length) {
    const nextBtn = h('button', { class: 'btn primary' }, 'Next level →');
    nextBtn.addEventListener('click', () => renderLevel(trackId, idx + 1));
    btnRow.appendChild(nextBtn);
  } else {
    btnRow.appendChild(h('span', { class: 'hint-line' }, '🎉 Track complete!'));
  }
  banner.appendChild(btnRow);
  stage.appendChild(banner);
  if (awarded) showToast(`+${level.xp} XP earned!`);
}

renderTabs();
renderMap();
renderXp();
