'use strict';
// ════════════════════════════════════════════════════════════════════════════
//  DSA PREMIER LEAGUE — COMPETITION MATCHES SCHEDULE ENGINE
// ════════════════════════════════════════════════════════════════════════════

const SCHEDULE_FIXTURES = [
  {
    id: 'fix_1',
    matchNo: 1,
    topic: 'Arrays',
    title: 'Arrays & Hashing Opener Derby',
    homeTeam: 'ck',
    awayTeam: 'bs',
    format: 'MCQ Strike + Code Blitz',
    difficulty: 'Easy / Medium',
    date: 'Round 1 · Match 1',
    status: 'Upcoming',
    problemsCount: 5,
    points: 2
  },
  {
    id: 'fix_2',
    matchNo: 2,
    topic: 'Strings',
    title: 'Strings Anagram Clash',
    homeTeam: 'mm',
    awayTeam: 'kw',
    format: 'MCQ Strike + Code Blitz',
    difficulty: 'Easy / Medium',
    date: 'Round 1 · Match 2',
    status: 'Upcoming',
    problemsCount: 5,
    points: 2
  },
  {
    id: 'fix_3',
    matchNo: 3,
    topic: 'Linked Lists',
    title: 'Linked List Pointers Trophy',
    homeTeam: 'pl',
    awayTeam: 'rr',
    format: 'MCQ Strike + Code Blitz',
    difficulty: 'Easy / Medium',
    date: 'Round 1 · Match 3',
    status: 'Upcoming',
    problemsCount: 5,
    points: 2
  },
  {
    id: 'fix_4',
    matchNo: 4,
    topic: 'Trees',
    title: 'Binary Tree Traversal Showdown',
    homeTeam: 'dd',
    awayTeam: 'hb',
    format: 'MCQ Strike + Code Blitz',
    difficulty: 'Medium / Hard',
    date: 'Round 2 · Match 4',
    status: 'Upcoming',
    problemsCount: 5,
    points: 2
  },
  {
    id: 'fix_5',
    matchNo: 5,
    topic: 'Dynamic Programming',
    title: 'DP Super Over Challenge',
    homeTeam: 'ck',
    awayTeam: 'mm',
    format: 'MCQ Strike + Code Blitz',
    difficulty: 'Medium / Hard',
    date: 'Round 2 · Match 5',
    status: 'Upcoming',
    problemsCount: 5,
    points: 2
  },
  {
    id: 'fix_6',
    matchNo: 6,
    topic: 'Graphs',
    title: 'Graph BFS & DFS Night Match',
    homeTeam: 'bs',
    awayTeam: 'dd',
    format: 'MCQ Strike + Code Blitz',
    difficulty: 'Medium / Hard',
    date: 'Round 2 · Match 6',
    status: 'Upcoming',
    problemsCount: 5,
    points: 2
  },
  {
    id: 'fix_7',
    matchNo: 7,
    topic: 'Binary Search',
    title: 'Binary Search Boundary Battle',
    homeTeam: 'kw',
    awayTeam: 'hb',
    format: 'MCQ Strike + Code Blitz',
    difficulty: 'Easy / Medium',
    date: 'Round 3 · Match 7',
    status: 'Upcoming',
    problemsCount: 5,
    points: 2
  },
  {
    id: 'fix_8',
    matchNo: 8,
    topic: 'Stack & Queue',
    title: 'Monotonic Stack & Queue Qualifier',
    homeTeam: 'pl',
    awayTeam: 'ck',
    format: 'MCQ Strike + Code Blitz',
    difficulty: 'Medium',
    date: 'Semis · Match 8',
    status: 'Upcoming',
    problemsCount: 5,
    points: 4
  },
  {
    id: 'fix_9',
    matchNo: 9,
    topic: 'Heaps',
    title: 'Priority Queue & Heap Masters',
    homeTeam: 'bs',
    awayTeam: 'mm',
    format: 'MCQ Strike + Code Blitz',
    difficulty: 'Hard',
    date: 'Semis · Match 9',
    status: 'Upcoming',
    problemsCount: 5,
    points: 4
  },
  {
    id: 'fix_10',
    matchNo: 10,
    topic: 'All Topics',
    title: 'Grand Finals — Master DSA Championship',
    homeTeam: 'ck',
    awayTeam: 'mm',
    format: 'MCQ + Code Blitz Final',
    difficulty: 'Mixed Championship',
    date: 'GRAND FINALS 🏆',
    status: 'Upcoming',
    problemsCount: 10,
    points: 10
  }
];

// INITIAL STANDINGS TABLE STATE
let STANDINGS = TEAMS.map(t => ({
  id: t.id,
  name: t.name,
  shortName: t.shortName,
  logo: t.logo,
  emoji: t.emoji,
  color: t.primary,
  played: 0,
  won: 0,
  lost: 0,
  points: 0,
  nrr: (0.00).toFixed(2)
}));

function renderScheduleScreen(filterTopic = 'all') {
  const container = document.getElementById('schedule-fixtures-grid');
  if (!container) return;
  container.innerHTML = '';

  const filtered = filterTopic === 'all' 
    ? SCHEDULE_FIXTURES 
    : SCHEDULE_FIXTURES.filter(f => f.topic.toLowerCase() === filterTopic.toLowerCase() || filterTopic === 'all');

  filtered.forEach(fix => {
    const home = TEAMS.find(t => t.id === fix.homeTeam) || TEAMS[0];
    const away = TEAMS.find(t => t.id === fix.awayTeam) || TEAMS[1];

    const card = document.createElement('div');
    card.className = 'fixture-card';
    card.innerHTML = `
      <div class="fix-hdr">
        <span class="fix-no">MATCH #${fix.matchNo}</span>
        <span class="fix-date">${fix.date}</span>
        <span class="fix-badge topic-${fix.topic.replace(/\s+/g, '').toLowerCase()}">${fix.topic}</span>
      </div>
      <div class="fix-teams-vs">
        <div class="fix-team">
          <div class="fix-logo" style="border-color:${home.primary}">
            ${home.logo ? `<img src="${home.logo}" alt="${home.name}">` : home.emoji}
          </div>
          <div class="fix-tname" style="color:${home.primary}">${home.shortName}</div>
          <div class="fix-fulln">${home.name}</div>
        </div>
        <div class="fix-vs-badge">
          <span class="vs-txt">VS</span>
          <span class="vs-fmt">${fix.format}</span>
        </div>
        <div class="fix-team">
          <div class="fix-logo" style="border-color:${away.primary}">
            ${away.logo ? `<img src="${away.logo}" alt="${away.name}">` : away.emoji}
          </div>
          <div class="fix-tname" style="color:${away.primary}">${away.shortName}</div>
          <div class="fix-fulln">${away.name}</div>
        </div>
      </div>
      <div class="fix-details">
        <div class="fix-ttl">🏏 ${fix.title}</div>
        <div class="fix-sub"><span class="df-lbl">${fix.difficulty}</span> · ${fix.problemsCount} Questions/Problems · ${fix.points} PTS</div>
      </div>
      <div class="fix-act">
        <button class="btn-primary btn-play-match" onclick="playScheduledMatch('${fix.id}')">
          🏏 Play Match (${fix.topic})
        </button>
      </div>
    `;
    container.appendChild(card);
  });

  renderStandingsTable();
}

function renderStandingsTable() {
  const tbody = document.getElementById('standings-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const sorted = [...STANDINGS].sort((a, b) => b.points - a.points || b.won - a.won);

  sorted.forEach((team, idx) => {
    const tr = document.createElement('tr');
    tr.className = idx === 0 ? 'leader-row' : '';
    tr.innerHTML = `
      <td class="st-rank">${idx + 1}</td>
      <td class="st-team">
        <span class="st-emoji">${team.logo ? `<img src="${team.logo}" class="st-img">` : team.emoji}</span>
        <span style="font-weight:700;color:${team.color}">${team.name}</span>
      </td>
      <td>${team.played}</td>
      <td class="st-w">${team.won}</td>
      <td class="st-l">${team.lost}</td>
      <td class="st-pts">${team.points}</td>
      <td class="st-nrr">${team.nrr}</td>
    `;
    tbody.appendChild(tr);
  });
}

function filterScheduleTopic(btn, topic) {
  document.querySelectorAll('#sched-pills .pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  renderScheduleScreen(topic);
}

function playScheduledMatch(fixtureId) {
  const fix = SCHEDULE_FIXTURES.find(f => f.id === fixtureId);
  if (!fix) return;

  const home = TEAMS.find(t => t.id === fix.homeTeam) || TEAMS[0];
  const away = TEAMS.find(t => t.id === fix.awayTeam) || TEAMS[1];

  G.team = home;
  G.players = [
    { name: home.name + ' (Player 1)', team: home },
    { name: away.name + ' (Player 2)', team: away }
  ];
  G.mode = 'contest';
  G.cat = fix.topic === 'All Topics' ? 'all' : fix.topic;
  G.diff = 'all';

  showScreen('game');
  applyTheme(home);
  startInnings();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SCHEDULE_FIXTURES, STANDINGS, renderScheduleScreen, filterScheduleTopic, playScheduledMatch };
}
