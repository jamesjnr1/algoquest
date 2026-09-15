const TRACKS = [
  { id: 'pycore', label: 'Python Core', tagClass: 'pycore', levels: PYTHON_CORE_LEVELS, blurb: 'Python itself, from variables to object-oriented programming. Full theory with diagrams, then real code that gets tested automatically.' },
  { id: 'dsa', label: 'DSA Isle', tagClass: 'dsa', levels: DSA_LEVELS, blurb: 'Data structures and algorithms, learned by pushing, popping, inserting, and searching things yourself.' },
  { id: 'py', label: 'Python Lab', tagClass: 'py', levels: CODE_LEVELS, blurb: 'The same core algorithms, but now you write real Python. Every level runs your code against automated tests and tells you exactly what passed or failed.' },
  { id: 'r', label: 'R Harbor', tagClass: 'r', levels: R_LEVELS, blurb: 'R fundamentals, learned by building vectors, subsetting data, and querying data frames yourself.' },
];

let view = { type: 'dashboard' };
let searchQuery = '';

function levelsForTrack(trackId) {
  return TRACKS.find((t) => t.id === trackId).levels;
}
function trackMeta(trackId) {
  return TRACKS.find((t) => t.id === trackId);
}
function trackColorVar(trackId) {
  return `var(--${trackMeta(trackId).tagClass}-color)`;
}
function isUnlocked(trackId, idx) {
  if (idx === 0) return true;
  const levels = levelsForTrack(trackId);
  return Store.isComplete(levels[idx - 1].id);
}
function totalLevelCount() {
  return TRACKS.reduce((sum, t) => sum + t.levels.length, 0);
}
function completedLevelCount() {
  return TRACKS.reduce((sum, t) => sum + t.levels.filter((l) => Store.isComplete(l.id)).length, 0);
}
function matchesSearch(level) {
  if (!searchQuery) return true;
  const q = searchQuery.toLowerCase();
  return level.title.toLowerCase().includes(q) || level.concept.toLowerCase().includes(q);
}

function navigate(next) {
  view = next;
  renderSideNav();
  renderContent();
  window.scrollTo(0, 0);
}

function totalXpPossible() {
  return TRACKS.reduce((sum, t) => sum + t.levels.reduce((s, l) => s + l.xp, 0), 0);
}

function renderTopChip() {
  const xp = Store.state.xp;
  document.getElementById('xp-value').textContent = xp;
  document.getElementById('rank-badge').textContent = rankFor(xp);
  document.getElementById('streak-num').textContent = currentStreak(Store.state.streakDates);
  const pct = Math.min(1, xp / totalXpPossible());
  const circumference = 138.2;
  document.getElementById('xp-arc').style.strokeDashoffset = (circumference * (1 - pct)).toFixed(1);
}

function renderSideNav() {
  const nav = document.getElementById('side-nav');
  clear(nav);
  const items = [
    { id: 'dashboard', label: 'Dashboard', active: view.type === 'dashboard' },
    ...TRACKS.map((t) => ({ id: t.id, label: t.label, active: view.type !== 'dashboard' && view.trackId === t.id })),
  ];
  items.forEach((item) => {
    const btn = h('button', { class: 'side-nav-item' + (item.active ? ' active' : '') }, item.label);
    btn.addEventListener('click', () => {
      searchQuery = '';
      document.getElementById('search-input').value = '';
      if (item.id === 'dashboard') navigate({ type: 'dashboard' });
      else navigate({ type: 'track', trackId: item.id });
    });
    nav.appendChild(btn);
  });
}

function findResume() {
  for (const t of TRACKS) {
    const done = t.levels.filter((l) => Store.isComplete(l.id)).length;
    if (done > 0 && done < t.levels.length) return { trackId: t.id, idx: done };
  }
  for (const t of TRACKS) {
    if (t.levels.filter((l) => Store.isComplete(l.id)).length === 0) return { trackId: t.id, idx: 0 };
  }
  return null;
}

// ---------- Level card (shared by dashboard previews + track pages) ----------
function levelCard(trackId, idx) {
  const track = trackMeta(trackId);
  const level = track.levels[idx];
  const unlocked = isUnlocked(trackId, idx);
  const complete = Store.isComplete(level.id);
  const card = h('div', { class: 'lvl-card' + (unlocked ? '' : ' locked') });
  card.appendChild(h('div', { class: 'lvl-card-top ' + track.tagClass }));
  const body = h('div', { class: 'lvl-card-body' });
  const tagsRow = h('div', { class: 'lvl-card-tags' });
  tagsRow.appendChild(h('span', { class: 'tag ' + track.tagClass }, `${track.label} · ${idx + 1}`));
  body.appendChild(tagsRow);
  body.appendChild(h('h3', {}, level.title));
  body.appendChild(h('div', { class: 'meta' }, unlocked ? level.concept : 'Complete the level before this one to unlock.'));
  if (complete) body.appendChild(h('div', { class: 'lvl-card-stars' }, starString(Store.starsFor(level.id))));
  const footer = h('div', { class: 'lvl-card-footer' });
  footer.appendChild(h('span', { class: 'xp' }, `+${level.xp} XP`));
  const status = complete ? h('span', { class: 'status done' }, 'Completed ✓')
    : unlocked ? h('span', { class: 'status start' }, 'Start →')
    : h('span', { class: 'status locked-label' }, 'Locked');
  footer.appendChild(status);
  body.appendChild(footer);
  card.appendChild(body);
  if (unlocked) card.addEventListener('click', () => navigate({ type: 'level', trackId, idx }));
  return card;
}

// ---------- Dashboard ----------
function renderDashboard(content) {
  if (searchQuery) {
    content.appendChild(searchResults());
    return;
  }

  const totalLevels = totalLevelCount();
  const doneLevels = completedLevelCount();
  const streak = currentStreak(Store.state.streakDates);
  const resume = findResume();

  // Hero
  const hero = h('div', { class: 'hero' });
  hero.appendChild(h('h1', {}, resume ? 'Ready to keep learning?' : 'You\'ve completed every level!'));
  hero.appendChild(h('p', {}, resume
    ? 'Pick up right where you left off, or browse a world on the left. Python Core and R Harbor teach with full theory and diagrams; DSA Isle teaches by interacting; Python Lab and Python Core both grade real code automatically, right or wrong.'
    : 'Every track is fully cleared. Replay any level any time — or tell your dev to add more.'));
  const btnRow = h('div', { class: 'btn-row' });
  if (resume) {
    const resumeBtn = h('button', { class: 'btn primary' }, 'Resume last level');
    resumeBtn.addEventListener('click', () => navigate({ type: 'level', trackId: resume.trackId, idx: resume.idx }));
    btnRow.appendChild(resumeBtn);
  }
  const browseBtn = h('button', { class: 'btn' }, 'Browse all levels');
  browseBtn.style.background = 'rgba(255,255,255,0.16)';
  browseBtn.style.borderColor = 'rgba(255,255,255,0.4)';
  browseBtn.style.color = 'white';
  browseBtn.addEventListener('click', () => navigate({ type: 'track', trackId: TRACKS[0].id }));
  btnRow.appendChild(browseBtn);
  hero.appendChild(btnRow);

  const progressWrap = h('div', { class: 'progress-line' });
  progressWrap.appendChild(h('div', { class: 'progress-label' }, `${doneLevels} of ${totalLevels} levels complete`));
  const track = h('div', { class: 'progress-track' });
  track.appendChild(h('div', { class: 'progress-fill', style: `width:${Math.round((doneLevels / totalLevels) * 100)}%` }));
  progressWrap.appendChild(track);
  hero.appendChild(progressWrap);
  content.appendChild(hero);

  // Stats
  const stats = h('div', { class: 'stats-row' });
  const statDefs = [
    { label: 'Levels Completed', value: `${doneLevels} / ${totalLevels}`, color: 'var(--accent)' },
    { label: 'XP Earned', value: Store.state.xp, color: 'var(--warn)' },
    { label: 'Current Rank', value: rankFor(Store.state.xp), color: 'var(--r-color)' },
    { label: 'Day Streak', value: streak, color: 'var(--dsa-color)' },
  ];
  statDefs.forEach((s) => {
    const card = h('div', { class: 'stat-card' });
    card.appendChild(h('div', { class: 'stat-dot', style: `background:${s.color}` }));
    card.appendChild(h('div', { class: 'stat-label' }, s.label));
    card.appendChild(h('div', { class: 'stat-value' }, String(s.value)));
    stats.appendChild(card);
  });
  content.appendChild(stats);

  // Continue learning
  const continueSection = h('div', { class: 'dashboard-section' });
  continueSection.appendChild(h('div', { class: 'section-head' }, [h('h2', {}, 'Continue Learning')]));
  if (resume) {
    const t = trackMeta(resume.trackId);
    const lvl = t.levels[resume.idx];
    const done = t.levels.filter((l) => Store.isComplete(l.id)).length;
    const card = h('div', { class: 'continue-card' });
    card.appendChild(h('div', { class: 'continue-swatch', style: `background:${trackColorVar(resume.trackId)}` }));
    const body = h('div', { class: 'continue-body' });
    body.appendChild(h('span', { class: 'tag ' + t.tagClass }, t.label));
    body.appendChild(h('h3', {}, lvl.title));
    body.appendChild(h('div', { class: 'meta' }, `Next: ${lvl.concept}`));
    const pw = h('div', { class: 'continue-progress' });
    pw.appendChild(h('div', { class: 'continue-progress-fill', style: `width:${Math.round((done / t.levels.length) * 100)}%` }));
    body.appendChild(pw);
    card.appendChild(body);
    const resumeBtn2 = h('button', { class: 'btn primary' }, 'Resume');
    resumeBtn2.addEventListener('click', () => navigate({ type: 'level', trackId: resume.trackId, idx: resume.idx }));
    card.appendChild(resumeBtn2);
    continueSection.appendChild(card);
  } else {
    continueSection.appendChild(h('div', { class: 'empty-state' }, 'Nothing left to continue — every level is complete!'));
  }
  content.appendChild(continueSection);

  // Track previews
  TRACKS.forEach((t) => {
    const section = h('div', { class: 'dashboard-section' });
    const head = h('div', { class: 'section-head' });
    head.appendChild(h('h2', {}, t.label));
    const viewAll = h('button', { class: 'view-all' }, 'View all →');
    viewAll.addEventListener('click', () => navigate({ type: 'track', trackId: t.id }));
    head.appendChild(viewAll);
    section.appendChild(head);
    const grid = h('div', { class: 'card-grid' });
    t.levels.slice(0, 3).forEach((lvl, i) => grid.appendChild(levelCard(t.id, i)));
    section.appendChild(grid);
    content.appendChild(section);
  });
}

function searchResults() {
  const wrap = h('div', {});
  wrap.appendChild(h('div', { class: 'section-head' }, [h('h2', {}, `Results for "${searchQuery}"`)]));
  const grid = h('div', { class: 'card-grid' });
  let count = 0;
  TRACKS.forEach((t) => {
    t.levels.forEach((lvl, i) => {
      if (matchesSearch(lvl)) { grid.appendChild(levelCard(t.id, i)); count++; }
    });
  });
  if (count === 0) wrap.appendChild(h('div', { class: 'empty-state' }, 'No levels match that search.'));
  else wrap.appendChild(grid);
  return wrap;
}

// ---------- Track page ----------
function renderTrackPage(content, trackId) {
  const t = trackMeta(trackId);
  const done = t.levels.filter((l) => Store.isComplete(l.id)).length;

  if (searchQuery) {
    content.appendChild(searchResults());
    return;
  }

  const header = h('div', { class: 'track-header' });
  header.appendChild(h('h1', {}, t.label));
  header.appendChild(h('p', {}, t.blurb));
  const pt = h('div', { class: 'track-progress-track' });
  pt.appendChild(h('div', { class: 'track-progress-fill', style: `width:${Math.round((done / t.levels.length) * 100)}%` }));
  header.appendChild(pt);
  header.appendChild(h('div', { class: 'track-progress-label' }, `${done} of ${t.levels.length} levels complete`));
  content.appendChild(header);

  const path = h('div', { class: 'path ' + t.tagClass });
  t.levels.forEach((lvl, i) => path.appendChild(levelNode(trackId, i)));
  content.appendChild(path);
}

// ---------- Level node (winding path on the track page) ----------
function levelNode(trackId, idx) {
  const track = trackMeta(trackId);
  const level = track.levels[idx];
  const unlocked = isUnlocked(trackId, idx);
  const complete = Store.isComplete(level.id);
  const side = idx % 2 === 0 ? 'L' : 'R';

  const row = h('div', { class: `node-row ${side}` });
  const node = h('button', {
    class: 'node' + (unlocked ? ' unlocked' : ' locked') + (complete ? ' done' : ''),
  });
  if (unlocked) node.addEventListener('click', () => navigate({ type: 'level', trackId, idx }));
  else node.disabled = true;

  const badge = h('div', { class: 'node-badge' }, complete ? '✓' : String(idx + 1));
  if (complete) badge.appendChild(h('span', { class: 'node-stars' }, starString(Store.starsFor(level.id))));
  node.appendChild(badge);

  const info = h('div', { class: 'node-info' });
  info.appendChild(h('div', { class: 't' }, level.title));
  info.appendChild(h('div', { class: 's' }, unlocked ? level.concept : 'Locked'));
  node.appendChild(info);

  row.appendChild(node);
  return row;
}

// ---------- Level page ----------
function renderLevelPage(content, trackId, idx) {
  const t = trackMeta(trackId);
  const level = t.levels[idx];

  const back = h('button', { class: 'breadcrumb' }, `← Back to ${t.label}`);
  back.addEventListener('click', () => navigate({ type: 'track', trackId }));
  content.appendChild(back);

  const stage = h('div', { class: 'stage' });

  const header = h('div', { class: 'level-header' });
  header.appendChild(h('span', { class: 'tag ' + t.tagClass }, level.concept));
  header.appendChild(h('h2', {}, level.title));
  stage.appendChild(header);

  const intro = h('div', { class: 'level-intro' });
  intro.innerHTML = level.intro;
  stage.appendChild(intro);

  if (level.theory) {
    stage.appendChild(h('div', { class: 'section-title' }, 'Theory'));
    const theory = h('div', { class: 'theory-block' });
    theory.innerHTML = level.theory;
    stage.appendChild(theory);
  }

  if (Store.isComplete(level.id)) {
    stage.appendChild(h('div', { class: 'hint-line' }, 'You\'ve already completed this level — feel free to replay it, no extra XP this time.'));
  }

  const hintText = LEVEL_HINTS[level.id];
  const ref = LEVEL_REFERENCES[level.id];
  if (hintText || ref) {
    const helpRow = h('div', { class: 'help-row' });
    if (hintText) {
      const hintBtn = h('button', { class: 'btn small' }, 'Stuck? Show a hint');
      const hintBox = h('div', { class: 'hint-box' });
      hintBox.textContent = hintText;
      hintBox.style.display = 'none';
      hintBtn.addEventListener('click', () => {
        const showing = hintBox.style.display !== 'none';
        hintBox.style.display = showing ? 'none' : 'block';
        hintBtn.textContent = showing ? 'Stuck? Show a hint' : 'Hide hint';
      });
      helpRow.appendChild(hintBtn);
      stage.appendChild(helpRow);
      stage.appendChild(hintBox);
    }
    if (ref) {
      const refLine = h('div', { class: 'ref-line' });
      refLine.appendChild(h('span', {}, 'Learn more: '));
      refLine.appendChild(h('a', { href: ref.url, target: '_blank', rel: 'noopener noreferrer', class: 'ref-link' }, `${ref.label} on TutorialsPoint ↗`));
      stage.appendChild(refLine);
    }
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
    renderQuiz(quizRoot, level.quiz, (stars) => onQuizDone(stage, trackId, idx, level, stars));
  }
  level.mount(taskRoot, onTaskDone);

  content.appendChild(stage);
}

function onQuizDone(stage, trackId, idx, level, stars) {
  const awarded = Store.complete(level.id, level.xp, stars);
  renderTopChip();
  const banner = successBanner(awarded ? `Level complete! +${level.xp} XP` : 'Nice review! (Already completed — no extra XP)');
  banner.appendChild(h('div', { class: 'banner-stars' }, starString(stars)));
  const levels = levelsForTrack(trackId);
  const btnRow = h('div', { style: 'display:flex;gap:10px;' });
  if (idx + 1 < levels.length) {
    const nextBtn = h('button', { class: 'btn primary' }, 'Next level →');
    nextBtn.addEventListener('click', () => navigate({ type: 'level', trackId, idx: idx + 1 }));
    btnRow.appendChild(nextBtn);
  } else {
    btnRow.appendChild(h('span', { class: 'hint-line' }, 'Track complete!'));
  }
  banner.appendChild(btnRow);
  stage.appendChild(banner);
  if (awarded) showToast(`+${level.xp} XP earned!`);
}

// ---------- Root render ----------
function renderContent() {
  const content = document.getElementById('content');
  clear(content);
  if (view.type === 'dashboard') renderDashboard(content);
  else if (view.type === 'track') renderTrackPage(content, view.trackId);
  else if (view.type === 'level') renderLevelPage(content, view.trackId, view.idx);
}

document.getElementById('search-input').addEventListener('input', (e) => {
  searchQuery = e.target.value.trim();
  if (view.type === 'level') view = { type: 'dashboard' };
  renderSideNav();
  renderContent();
});

document.getElementById('reset-btn').addEventListener('click', () => {
  if (confirm('Reset all XP and completed levels? This cannot be undone.')) {
    Store.reset();
    renderTopChip();
    navigate({ type: 'dashboard' });
  }
});

renderSideNav();
renderContent();
renderTopChip();
