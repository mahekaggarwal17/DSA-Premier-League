'use strict';
// ═══════════════════════════════════════
//  DSA PREMIER LEAGUE — GAME ENGINE
// ═══════════════════════════════════════

const G = {
  team: null, mode: 'practice', players: [], curIdx: 0,
  pool: [], used: new Set(), curQ: null, qNum: 0,
  timerInt: null, timerMax: 30, timerCur: 0,
  startTime: 0, answered: false, cat: 'all', diff: 'all',
  customQ: null,
};

// ─── SCREEN NAV ──────────────────────────────
function showScreen(name){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  const el=document.getElementById('screen-'+name);
  if(!el) return;
  el.classList.add('active');
  window.scrollTo(0,0);
  if(name==='team-select') renderTeams();
  if(name==='setup') initSetup();
  if(name==='schedule') renderScheduleScreen();
  if(name==='code-arena') loadCodeProblem('cp_arr_1');
}

function toggleMatchDeliveryMode(mode) {
  const btnMcq = document.getElementById('btn-mode-mcq');
  const btnCode = document.getElementById('btn-mode-code');
  if (btnMcq && btnCode) {
    btnMcq.classList.toggle('active', mode === 'mcq');
    btnCode.classList.toggle('active', mode === 'code');
  }
  if (mode === 'code') {
    showScreen('code-arena');
  }
}

// ─── PARTICLES ───────────────────────────────
function spawnParticles(){
  const c=document.getElementById('particles'); if(!c) return;
  c.innerHTML='';
  const colors=['#F59E0B','#22C55E','#3B82F6','#EF4444','#A78BFA','#FBCFE8'];
  for(let i=0;i<60;i++){
    const p=document.createElement('div');
    p.className='particle';
    const s=3+Math.random()*5;
    p.style.cssText=`width:${s}px;height:${s}px;left:${Math.random()*100}%;top:${70+Math.random()*30}%;background:${colors[Math.floor(Math.random()*colors.length)]};animation-duration:${5+Math.random()*8}s;animation-delay:${Math.random()*6}s`;
    c.appendChild(p);
  }
}

// ─── TEAMS ───────────────────────────────────
function renderTeams(){
  const g=document.getElementById('teams-grid'); g.innerHTML='';
  TEAMS.forEach((t,i)=>{
    const d=document.createElement('button');
    d.type='button';
    d.className='ts-team-tile';
    d.dataset.id=t.id;
    d.setAttribute('aria-label',`Select ${t.name}`);
    d.setAttribute('aria-pressed',String(G.team?.id===t.id));
    d.style.setProperty('--tc',t.primary);
    d.style.setProperty('--tg',t.glow);
    d.style.animationDelay=`${i*0.06}s`;
    d.innerHTML=`
      <div class="ts-tile-glow"></div>
      <div class="ts-tile-inner">
        <div class="ts-tile-logo">${t.logo ? `<img src="${t.logo}" alt="${t.name}">` : t.emoji}</div>
        <div class="ts-tile-code" style="color:${t.primary}">${t.shortName}</div>
        <div class="ts-tile-name">${t.city}</div>
      </div>
      <div class="ts-tile-sel-ring"></div>`;
    d.onclick=()=>pickTeam(t.id);
    g.appendChild(d);
  });
  if(G.team) pickTeam(G.team.id);
}

function pickTeam(id){
  const t=TEAMS.find(x=>x.id===id); if(!t) return;
  G.team=t;

  // Update tile states
  document.querySelectorAll('.ts-team-tile').forEach(c=>{
    c.classList.toggle('selected',c.dataset.id===id);
    c.setAttribute('aria-pressed',String(c.dataset.id===id));
  });

  // Animate spotlight
  const sp=document.getElementById('ts-spotlight');
  sp.style.background=`radial-gradient(ellipse 80% 70% at 50% 60%, ${t.glow} 0%, transparent 70%)`;
  sp.style.opacity='1';

  // Update hero panel background
  const panel=document.getElementById('ts-hero-panel');
  panel.style.setProperty('--team-primary', t.primary);
  panel.style.setProperty('--team-glow', t.glow);
  panel.style.setProperty('--team-gradient', t.gradient);

  // Update decor rings color
  document.querySelectorAll('.ts-decor-ring').forEach(r=>{
    r.style.borderColor=`color-mix(in srgb, ${t.primary} 22%, transparent)`;
  });

  // Logo
  const logoEl=document.getElementById('ts-hero-logo');
  if(t.logo){ logoEl.innerHTML=`<img src="${t.logo}" alt="${t.name}">`; logoEl.classList.add('has-img'); }
  else { logoEl.textContent=t.emoji; logoEl.classList.remove('has-img'); }

  // Text
  const sn=document.getElementById('ts-hero-shortname');
  sn.textContent=t.shortName;
  sn.style.background=t.gradient;
  sn.style.webkitBackgroundClip='text';
  sn.style.webkitTextFillColor='transparent';
  sn.style.backgroundClip='text';

  document.getElementById('ts-hero-fullname').textContent=t.name;
  document.getElementById('ts-hero-city').textContent=`📍 ${t.city}`;
  document.getElementById('ts-hero-tagline').textContent=`"${t.tagline}"`;

  // Badges
  document.getElementById('ts-b-city').textContent=`🏙️ ${t.city}`;
  document.getElementById('ts-b-city').style.borderColor=t.primary+'55';
  document.getElementById('ts-b-city').style.color=t.primary;
  document.getElementById('ts-b-rank').textContent=`#${TEAMS.findIndex(x=>x.id===id)+1} in League`;
  document.getElementById('ts-b-lang').textContent='⚡ 7 Languages';
  document.getElementById('ts-selection-note').textContent=`${t.shortName} selected — you're ready for match setup.`;

  // Activate join button
  const btn=document.getElementById('ts-join-btn');
  btn.disabled=false;
  btn.style.background=t.gradient;
  btn.style.boxShadow=`0 8px 40px ${t.glow}, 0 2px 0 rgba(255,255,255,0.1) inset`;

  // Entrance animation
  panel.classList.remove('ts-hero-entered');
  void panel.offsetWidth;
  panel.classList.add('ts-hero-entered');
}

function confirmTeam(){
  if(!G.team){return;}
  showScreen('setup');
}


// ─── SETUP ───────────────────────────────────
function initSetup(){
  G.players=[{name:'',team:G.team}];
  const b=document.getElementById('setup-badge');
  if(b&&G.team){b.textContent=G.team.emoji+' '+G.team.shortName;b.style.background=G.team.gradient;b.style.color=G.team.text;b.style.padding='4px 12px';b.style.borderRadius='99px'}
  selectMode('practice');
  document.querySelectorAll('.pill').forEach((p,i)=>{p.classList.toggle('active',i===0)});
  document.querySelectorAll('.dtab').forEach((d,i)=>{d.classList.toggle('active',i===0)});
}

function selectMode(m){
  G.mode=m;
  document.querySelectorAll('.mode-card').forEach(c=>c.classList.toggle('selected',c.dataset.mode===m));
  const solo=document.getElementById('sec-solo'); if(solo) solo.style.display=(m==='practice')?'block':'none';
  const players=document.getElementById('sec-players'); if(players) players.style.display=(m==='contest'||m==='team')?'block':'none';
  const upload=document.getElementById('sec-upload'); if(upload) upload.style.display=(m==='upload')?'block':'none';
  if(m==='contest'||m==='team') renderPlayers();
}

function renderPlayers(){
  const l=document.getElementById('player-list'); l.innerHTML='';
  G.players.forEach((p,i)=>{
    const r=document.createElement('div');
    r.className='player-row';
    const opts=TEAMS.map(t=>`<option value="${t.id}" ${t.id===(p.team?.id||G.team?.id)?'selected':''}>${t.emoji} ${t.shortName}</option>`).join('');
    r.innerHTML=`
      <span class="p-num">${i+1}</span>
      <input class="inp" type="text" placeholder="Player ${i+1}" value="${p.name}" oninput="G.players[${i}].name=this.value" style="flex:1">
      <select class="team-sel" onchange="G.players[${i}].teamId=this.value">${opts}</select>
      ${i>0?`<button class="btn-rm" onclick="rmPlayer(${i})">×</button>`:'<span style="width:30px"></span>'}`;
    l.appendChild(r);
  });
}

function addPlayer(){if(G.players.length>=8)return;G.players.push({name:'',team:G.team});renderPlayers();}
function rmPlayer(i){G.players.splice(i,1);renderPlayers();}

function selCat(el,v){G.cat=v;document.querySelectorAll('.pill').forEach(p=>p.classList.remove('active'));el.classList.add('active');}
function selDiff(el,v){G.diff=v;document.querySelectorAll('.dtab').forEach(d=>d.classList.remove('active'));el.classList.add('active');}

function handleUpload(ev){
  const f=ev.target.files[0]; if(!f) return;
  const r=new FileReader();
  r.onload=e=>{
    try{
      const d=JSON.parse(e.target.result);
      if(!Array.isArray(d)||d.length<5) throw new Error('Need ≥5 questions');
      G.customQ=d;
      document.getElementById('upload-status').textContent=`✅ ${d.length} questions from "${f.name}"`;
    }catch(err){alert('Invalid JSON: '+err.message);}
  };
  r.readAsText(f);
}

function dlTemplate(){
  const t=[
    {question:"What is O(log n) access structure?",options:["Array","Linked List","BST","Queue"],correct:2,difficulty:"easy",category:"Trees",explanation:"BST search bisects the tree each step."},
    {question:"What does BFS use?",options:["Stack","Queue","Heap","Array"],correct:1,difficulty:"easy",category:"Graphs",explanation:"BFS uses a Queue for level-by-level traversal."}
  ];
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([JSON.stringify(t,null,2)],{type:'application/json'}));
  a.download='dpl_template.json'; a.click();
}

// ─── START MATCH ─────────────────────────────
function startMatch(){
  if(G.mode==='upload'&&!G.customQ){alert('Upload a question file first!');return;}
  let pool=G.mode==='upload'?G.customQ:[...QUESTIONS];
  if(G.cat!=='all') pool=pool.filter(q=>q.category===G.cat);
  if(G.diff!=='all'){const f=pool.filter(q=>q.difficulty===G.diff);if(f.length>=5)pool=f;}
  if(pool.length<5){alert('Not enough questions! Try All Topics or Mixed difficulty.');return;}
  G.pool=[...pool].sort(()=>Math.random()-.5);
  G.used=new Set(); G.qNum=0;
  const solo=document.getElementById('solo-inp');
  if(G.mode==='practice'){
    const nm=(solo&&solo.value.trim())||G.players[0]?.name||'You';
    G.players=[mk(nm,G.team)];
  } else {
    if(G.players.length<2) G.players.push({name:'Player 2',team:G.team});
    G.players=G.players.map((p,i)=>{
      const nm=p.name.trim()||`Player ${i+1}`;
      const t=TEAMS.find(x=>x.id===p.teamId)||p.team||G.team;
      return mk(nm,t);
    });
  }
  G.curIdx=0;
  showScreen('game');
  applyTheme(G.players[0].team);
  startInnings();
}

function mk(name,team){return{name,team,score:0,balls:0,sixers:0,fours:0,fails:0,hist:[],isOut:false};}

// ─── INNINGS ─────────────────────────────────
function startInnings(){
  const p=cur();
  G.used=new Set(); G.qNum=0;
  document.getElementById('batting-name').textContent=p.name;
  updBoard(); updTrack(); updFails(0);
  loadQ();
}

function cur(){return G.players[G.curIdx];}

// ─── QUESTION ────────────────────────────────
const TMAX={easy:20,medium:30,hard:45};

function loadQ(){
  G.answered=false;
  if(G.used.size>=G.pool.length) G.used.clear();
  let idx=0; for(let i=0;i<G.pool.length;i++){if(!G.used.has(i)){idx=i;break;}}
  G.used.add(idx);
  G.curQ=G.pool[idx]; G.qNum++;
  G.startTime=Date.now();
  renderQ(G.curQ); startTimer(G.curQ.difficulty);
}

function renderQ(q){
  document.getElementById('q-cat').textContent=q.category;
  const db=document.getElementById('q-diff');
  db.textContent={easy:'Easy',medium:'Medium',hard:'Hard'}[q.difficulty]||q.difficulty;
  db.className='diff-badge '+(q.difficulty||'easy');
  document.getElementById('q-num').textContent='#'+G.qNum;
  document.getElementById('q-text').innerHTML=q.question;
  const grid=document.getElementById('opts-grid'); grid.innerHTML='';
  const lets=['A','B','C','D'];
  q.options.forEach((opt,i)=>{
    const b=document.createElement('button');
    b.className='opt-btn'; b.dataset.i=i;
    b.style.animationDelay=(i*.07)+'s';
    b.innerHTML=`<span class="opt-letter">${lets[i]}</span><span>${opt}</span>`;
    b.onclick=()=>answer(i);
    grid.appendChild(b);
  });
  document.getElementById('expl-box').style.display='none';
  const qa=document.getElementById('q-area'); qa.scrollTop=0;
}

// ─── TIMER ───────────────────────────────────
function startTimer(diff){
  clearInterval(G.timerInt);
  G.timerMax=TMAX[diff]||30; G.timerCur=G.timerMax;
  const arc=document.getElementById('tmr-arc');
  const num=document.getElementById('tmr-num');
  const C=163.4;
  const tick=()=>{
    const r=G.timerCur/G.timerMax;
    arc.style.strokeDashoffset=C*(1-r);
    num.textContent=G.timerCur;
    const col=r>.5?'#22C55E':r>.25?'#F59E0B':'#EF4444';
    arc.style.stroke=col; num.style.color=col;
    if(G.timerCur<=0){clearInterval(G.timerInt);if(!G.answered)timeout();}
  };
  tick();
  G.timerInt=setInterval(()=>{G.timerCur--;tick();},1000);
}

function timeout(){
  G.answered=true;
  document.querySelectorAll('.opt-btn').forEach((b,i)=>{b.disabled=true;if(i===G.curQ.correct)b.classList.add('correct');});
  record(0);
  showExpl(false,'⏰ Time\'s up! '+G.curQ.explanation,0);
}

// ─── ANSWER ──────────────────────────────────
function answer(idx){
  if(G.answered) return;
  G.answered=true;
  clearInterval(G.timerInt);
  const q=G.curQ, ok=idx===q.correct;
  const elapsed=(Date.now()-G.startTime)/1000;
  document.querySelectorAll('.opt-btn').forEach((b,i)=>{
    b.disabled=true;
    if(i===q.correct) b.classList.add('correct');
    if(i===idx&&!ok) b.classList.add('wrong');
  });
  if(ok){
    const runs=calcRuns(elapsed,q.difficulty);
    record(runs);
    showAnim(runs);
    showExpl(true,q.explanation,runs);
  } else {
    record(0);
    showExpl(false,q.explanation,0);
  }
  if(cur().isOut) setTimeout(showOut,2000);
}

function calcRuns(elapsed,diff){
  const mx=TMAX[diff]||30, r=elapsed/mx;
  if(r<=.35) return 6;
  if(r<=.65) return 4;
  if(r<=.82) return 3;
  if(r<=.93) return 2;
  return 1;
}

function record(runs){
  const p=cur();
  p.balls++; p.score+=runs; p.hist.push(runs);
  if(runs===6)p.sixers++;
  if(runs===4)p.fours++;
  if(runs===0){p.fails++;if(p.fails>=5)p.isOut=true;}
  else p.fails=0;
  updFails(p.fails); updBoard(); updTrack();
}

// ─── UI UPDATES ──────────────────────────────
function updBoard(){
  const p=cur();
  document.getElementById('sb-runs').textContent=p.score;
  document.getElementById('sb-balls').textContent=p.balls+' balls';
}

function updTrack(){
  const p=cur(), tr=document.getElementById('del-track');
  tr.innerHTML='';
  const recent=p.hist.slice(-6);
  while(recent.length<6)recent.unshift(null);
  recent.forEach(r=>{
    const d=document.createElement('div'); d.className='dd';
    if(r===null){d.classList.add('empty');d.textContent='·';}
    else if(r===6){d.classList.add('six');d.textContent='6';}
    else if(r===4){d.classList.add('four');d.textContent='4';}
    else if(r>0){d.classList.add('run');d.textContent=r;}
    else{d.classList.add('zero');d.textContent='0';}
    tr.appendChild(d);
  });
}

function updFails(n){
  document.querySelectorAll('.fd').forEach((d,i)=>{
    d.classList.toggle('hit',i<n);
    d.classList.toggle('danger',n>=3&&i<n);
  });
}

// ─── EXPLANATION ─────────────────────────────
function showExpl(ok,text,runs){
  const box=document.getElementById('expl-box');
  box.style.display='block';
  const ico=document.getElementById('expl-ico'), ttl=document.getElementById('expl-ttl');
  const lbl={6:'⚡ SIX! Perfect!',4:'🏏 FOUR! Great!',3:'✅ Three runs!',2:'✅ Two runs!',1:'✅ One run!'};
  if(ok){
    ico.textContent=runs===6?'⚡':runs>=4?'🏏':'✅';
    ttl.textContent=lbl[runs]||'✅ Correct!';
    ttl.style.color=runs===6?'#22C55E':runs>=4?'#3B82F6':'#F59E0B';
  } else {
    ico.textContent='❌'; ttl.textContent='Wrong!'; ttl.style.color='#EF4444';
  }
  document.getElementById('expl-body').textContent=text;
  const btn=document.getElementById('btn-next');
  if(cur().isOut){btn.textContent='💀 You\'re OUT!';btn.style.background='linear-gradient(135deg,#EF4444,#DC2626)';}
  else{btn.textContent='Next Delivery →';btn.style.background='';}
  box.scrollIntoView({behavior:'smooth',block:'nearest'});
}

function nextQ(){
  if(cur().isOut){showOut();return;}
  loadQ();
}

// ─── SCORE ANIMATION ─────────────────────────
function showAnim(runs){
  const ov=document.getElementById('score-anim');
  const badge=document.getElementById('anim-badge'), lbl=document.getElementById('anim-lbl');
  const cfg={
    6:{txt:'6',color:'#22C55E',label:'⚡ S I X !'},
    4:{txt:'4',color:'#3B82F6',label:'🏏 F O U R !'},
    3:{txt:'3',color:'#F59E0B',label:'3 RUNS'},
    2:{txt:'2',color:'#F59E0B',label:'2 RUNS'},
    1:{txt:'1',color:'#94A3B8',label:'1 RUN'},
  }[runs]||{txt:runs,color:'#F59E0B',label:'RUNS'};
  badge.textContent=cfg.txt;
  badge.style.color=cfg.color;
  badge.style.textShadow=`0 0 80px ${cfg.color}`;
  lbl.textContent=cfg.label;
  lbl.style.color=cfg.color;
  ov.style.cssText='display:flex;flex-direction:column;align-items:center;justify-content:center;position:fixed;inset:0;z-index:1000;pointer-events:none;opacity:1;background:transparent';
  if(runs>=4) confetti(cfg.color);
  setTimeout(()=>{ov.style.opacity='0';setTimeout(()=>ov.style.display='none',400);},1100);
}

// ─── OUT ─────────────────────────────────────
function showOut(){
  const p=cur();
  document.getElementById('out-pname').textContent=p.name;
  document.getElementById('out-runs').textContent=p.score;
  document.getElementById('out-balls').textContent=p.balls;
  document.getElementById('out-6s').textContent=p.sixers;
  document.getElementById('out-4s').textContent=p.fours;
  const isLast=G.curIdx>=G.players.length-1;
  const btn=document.getElementById('btn-out-next');
  if(isLast){btn.textContent='📊 Match Results';btn.onclick=showResults;}
  else{btn.textContent='Next: '+G.players[G.curIdx+1].name+' →';btn.onclick=nxtPlayer;}
  document.getElementById('out-ov').style.display='flex';
}

function nxtPlayer(){
  document.getElementById('out-ov').style.display='none';
  G.curIdx++;
  if(G.curIdx>=G.players.length){showResults();return;}
  const p=cur();
  applyTheme(p.team);
  document.getElementById('batting-name').textContent=p.name;
  updFails(0); startInnings();
}

function endInnEarly(){
  document.getElementById('out-ov').style.display='none';
  showResults();
}

// ─── TEAM THEME ──────────────────────────────
function applyTheme(team){
  if(!team) return;
  document.documentElement.style.setProperty('--t-p',team.primary);
  document.documentElement.style.setProperty('--t-g',team.gradient);
  const badge=document.getElementById('team-badge');
  if(badge){badge.textContent=team.shortName;badge.style.background=team.gradient;badge.style.color=team.text;}
}

// ─── RESULTS ─────────────────────────────────
function showResults(){
  showScreen('results');
  const sorted=[...G.players].sort((a,b)=>b.score-a.score);
  const w=sorted[0];
  document.getElementById('winner-ann').innerHTML=`
    <div class="w-trophy">🏆</div>
    <div class="w-name" style="color:${w.team?.primary||'#F59E0B'}">${w.name}</div>
    <div class="w-team">${w.team?.emoji||''} ${w.team?.name||''}</div>
    <div class="w-score">${w.score} runs · ${w.balls} balls</div>`;
  const sc=document.getElementById('scorecard'); sc.innerHTML='';
  ['🥇','🥈','🥉'].forEach((m,i)=>{
    if(!sorted[i])return;
    const p=sorted[i];
    const r=document.createElement('div');
    r.className='sc-row'+(i===0?' sc-win':'');
    r.style.borderLeftColor=p.team?.primary||'#475569';
    r.innerHTML=`<span class="sc-medal">${m}</span>
      <div class="sc-pi"><div class="sc-pn">${p.name}</div><div class="sc-pt" style="color:${p.team?.primary||'#94A3B8'}">${p.team?.emoji||''} ${p.team?.name||''}</div></div>
      <div class="sc-stat"><div class="sc-r">${p.score}</div><div class="sc-d">${p.balls}b · ${p.sixers}×⚡ · ${p.fours}×🏏</div></div>`;
    sc.appendChild(r);
  });
  setTimeout(()=>confetti(w.team?.primary||'#F59E0B'),300);
  setTimeout(()=>confetti('#FFD700'),700);
}

function playAgain(){G.players=[];G.curIdx=0;showScreen('setup');initSetup();}

// ─── CONFETTI ────────────────────────────────
function confetti(col='#F59E0B'){
  const cols=[col,'#FFF','#FFD700','#FF6B6B','#4ECDC4'];
  for(let i=0;i<80;i++){
    setTimeout(()=>{
      const p=document.createElement('div');
      const s=4+Math.random()*8;
      p.style.cssText=`position:fixed;left:${Math.random()*100}%;top:-10px;width:${s}px;height:${s}px;background:${cols[Math.floor(Math.random()*cols.length)]};border-radius:${Math.random()>.5?'50%':'2px'};z-index:9999;pointer-events:none;animation:fall ${1.5+Math.random()*2}s linear ${Math.random()*.5}s forwards`;
      document.body.appendChild(p);
      setTimeout(()=>p.remove(),3500);
    },Math.random()*400);
  }
}

// ─── INIT ────────────────────────────────────
document.addEventListener('DOMContentLoaded',()=>{
  showScreen('landing');
  spawnParticles();
  const s=document.createElement('style');
  s.textContent='@keyframes fall{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(720deg);opacity:0}}';
  document.head.appendChild(s);
});
