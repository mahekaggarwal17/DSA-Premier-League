'use strict';
// ════════════════════════════════════════════════════════════════════════════
//  DSA PREMIER LEAGUE — PROGRAM WRITING & MULTI-LANGUAGE CODE ENGINE
// ════════════════════════════════════════════════════════════════════════════

const CODE_ENGINE = {
  currentProblem: null,
  currentLanguage: 'javascript',
  userCode: {},
  activeTab: 'problem',
  consoleLogs: [],
  testResults: []
};

const SUPPORTED_LANGUAGES = [
  { id: 'javascript', name: 'JavaScript', icon: '🟨', extension: 'js', executable: true },
  { id: 'python', name: 'Python 3', icon: '🐍', extension: 'py', executable: false },
  { id: 'cpp', name: 'C++', icon: '⚡', extension: 'cpp', executable: false },
  { id: 'java', name: 'Java', icon: '☕', extension: 'java', executable: false },
  { id: 'csharp', name: 'C#', icon: '🟦', extension: 'cs', executable: false },
  { id: 'go', name: 'Go', icon: '🐹', extension: 'go', executable: false },
  { id: 'rust', name: 'Rust', icon: '🦀', extension: 'rs', executable: false }
];

// Initialize Code Arena UI with problem and language
function loadCodeProblem(problemId, language = 'javascript') {
  let problem = CODING_PROBLEMS.find(p => p.id === problemId);
  if (!problem) problem = CODING_PROBLEMS[0];

  CODE_ENGINE.currentProblem = problem;
  CODE_ENGINE.currentLanguage = language;

  // Render Problem details
  document.getElementById('cp-title').textContent = problem.title;
  document.getElementById('cp-topic').textContent = problem.topic;
  const db = document.getElementById('cp-diff');
  db.textContent = problem.difficulty.toUpperCase();
  db.className = 'diff-badge ' + problem.difficulty;

  document.getElementById('cp-desc').innerHTML = problem.description;
  document.getElementById('cp-constraints').innerHTML = problem.constraints;

  // Render examples
  const exDiv = document.getElementById('cp-examples');
  if (exDiv) {
    exDiv.innerHTML = problem.examples.map((ex, i) => `
      <div class="example-box">
        <div class="ex-hdr">Example ${i + 1}:</div>
        <div class="ex-code"><strong>Input:</strong> ${ex.input}</div>
        <div class="ex-code"><strong>Output:</strong> ${ex.output}</div>
        ${ex.explanation ? `<div class="ex-expl"><strong>Explanation:</strong> ${ex.explanation}</div>` : ''}
      </div>
    `).join('');
  }

  // Populate Language Selector
  const langSel = document.getElementById('code-lang-sel');
  if (langSel) {
    langSel.innerHTML = SUPPORTED_LANGUAGES.map(l => 
      `<option value="${l.id}" ${l.id === language ? 'selected' : ''}>${l.icon} ${l.name}</option>`
    ).join('');
  }
  const problemSel = document.getElementById('code-problem-sel');
  if(problemSel){
    problemSel.innerHTML=CODING_PROBLEMS.map(p=>`<option value="${p.id}" ${p.id===problem.id?'selected':''}>${p.topic} · ${p.title}</option>`).join('');
  }

  // Load starter template if user hasn't edited code
  const codeEditor = document.getElementById('code-textarea');
  if (codeEditor) {
    const template = (CODE_ENGINE.userCode[problem.id] && CODE_ENGINE.userCode[problem.id][language])
      || (problem.templates && problem.templates[language])
      || `// Write code in ${language}`;
    
    codeEditor.value = template;
    updateLineNumbers();
  }

  // Reset Console output
  resetConsole();
  updateExecutionState();
}

function changeCodeProblem(problemId) {
  handleCodeInput();
  loadCodeProblem(problemId, CODE_ENGINE.currentLanguage);
}

function changeLanguage(newLang) {
  handleCodeInput();
  CODE_ENGINE.currentLanguage = newLang;
  const problem = CODE_ENGINE.currentProblem;
  if (!problem) return;

  const codeEditor = document.getElementById('code-textarea');
  if (codeEditor) {
    const template = (CODE_ENGINE.userCode[problem.id] && CODE_ENGINE.userCode[problem.id][newLang])
      || (problem.templates && problem.templates[newLang])
      || `// Write solution in ${newLang}`;

    codeEditor.value = template;
    updateLineNumbers();
  }
  resetConsole();
  updateExecutionState();
}

function updateExecutionState() {
  const language = SUPPORTED_LANGUAGES.find(l => l.id === CODE_ENGINE.currentLanguage);
  const note = document.getElementById('code-execution-note');
  const runButton = document.getElementById('btn-run-code');
  const submitButton = document.getElementById('btn-submit-code');
  if (!language) return;
  if (note) note.textContent = language.executable ? 'JavaScript runs locally' : 'Template mode · execution requires a server runner';
  if (runButton) runButton.textContent = language.executable ? '▶ Run Code' : 'ⓘ Template mode';
  if (submitButton) submitButton.disabled = !language.executable;
}

function handleCodeInput() {
  const problem = CODE_ENGINE.currentProblem;
  if (!problem) return;

  const codeEditor = document.getElementById('code-textarea');
  if (!codeEditor) return;

  if (!CODE_ENGINE.userCode[problem.id]) {
    CODE_ENGINE.userCode[problem.id] = {};
  }
  CODE_ENGINE.userCode[problem.id][CODE_ENGINE.currentLanguage] = codeEditor.value;

  updateLineNumbers();
}

function updateLineNumbers() {
  const codeEditor = document.getElementById('code-textarea');
  const lineGutter = document.getElementById('line-gutter');
  if (!codeEditor || !lineGutter) return;

  const lines = codeEditor.value.split('\n').length;
  lineGutter.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
}

function resetCodeTemplate() {
  const problem = CODE_ENGINE.currentProblem;
  const lang = CODE_ENGINE.currentLanguage;
  if (!problem || !lang) return;

  const codeEditor = document.getElementById('code-textarea');
  if (codeEditor && problem.templates[lang]) {
    codeEditor.value = problem.templates[lang];
    if (CODE_ENGINE.userCode[problem.id]) {
      delete CODE_ENGINE.userCode[problem.id][lang];
    }
    updateLineNumbers();
  }
}

function resetConsole() {
  CODE_ENGINE.consoleLogs = [];
  CODE_ENGINE.testResults = [];
  const logDiv = document.getElementById('console-output');
  if (logDiv) logDiv.innerHTML = '<span class="console-placeholder">Click "▶ Run Code" or "🚀 Submit Solution" to view output.</span>';
}

function logToConsole(text, type = 'info') {
  const logDiv = document.getElementById('console-output');
  if (!logDiv) return;

  const entry = document.createElement('div');
  entry.className = `log-entry log-${type}`;
  entry.textContent = text;
  logDiv.appendChild(entry);
  logDiv.scrollTop = logDiv.scrollHeight;
}

// ── MULTI-LANGUAGE TEST RUNNER & EVALUATOR ────────────────────────────
function runCode() {
  const problem = CODE_ENGINE.currentProblem;
  const lang = CODE_ENGINE.currentLanguage;
  const codeEditor = document.getElementById('code-textarea');
  if (!problem || !codeEditor) return;

  const userCodeStr = codeEditor.value;
  const logDiv = document.getElementById('console-output');
  if (logDiv) logDiv.innerHTML = '';

  logToConsole(`⚡ Running solution in ${lang.toUpperCase()}...`, 'info');

  if (lang !== 'javascript') {
    logToConsole(`${lang.toUpperCase()} templates can be edited here, but this static site only executes JavaScript locally. Connect a secure server-side runner to execute this language.`, 'warning');
    return { passedCount: 0, total: problem.testCases.length, isAllPassed: false, unsupported: true };
  }

  const startTime = performance.now();
  let passedCount = 0;
  const total = problem.testCases.length;

  try {
    problem.testCases.forEach((tc, idx) => {
      const inputArgs = tc.input;
      const expected = JSON.stringify(tc.expected);

      let actualVal;
      let isSuccess = false;

      if (lang === 'javascript') {
        // Execute JS directly in sandboxed function
        const fnName = problem.id === 'cp_arr_1' ? 'twoSum' :
                       problem.id === 'cp_arr_2' ? 'maxSubArray' :
                       problem.id === 'cp_str_1' ? 'isAnagram' :
                       problem.id === 'cp_ll_1' ? 'reverseList' :
                       problem.id === 'cp_tree_1' ? 'maxDepth' :
                       problem.id === 'cp_dp_1' ? 'climbStairs' :
                       problem.id === 'cp_bs_1' ? 'search' : 'isValid';

        const runFn = new Function('inputArgs', `
          ${userCodeStr}
          return ${fnName}.apply(null, inputArgs);
        `);

        actualVal = runFn(inputArgs);
        isSuccess = JSON.stringify(actualVal) === expected;

      }

      if (isSuccess) {
        passedCount++;
        logToConsole(`✅ Test Case ${idx + 1}: Passed! Input: ${JSON.stringify(inputArgs)} -> Output: ${expected}`, 'success');
      } else {
        logToConsole(`❌ Test Case ${idx + 1}: Failed! Input: ${JSON.stringify(inputArgs)} | Expected: ${expected} | Got: ${JSON.stringify(actualVal)}`, 'error');
      }
    });

    const elapsed = (performance.now() - startTime).toFixed(1);
    logToConsole(`\n📊 Summary: ${passedCount}/${total} Test Cases Passed (${elapsed}ms)`, passedCount === total ? 'success' : 'warning');
    return { passedCount, total, isAllPassed: passedCount === total };

  } catch (err) {
    logToConsole(`💥 Runtime / Syntax Error: ${err.message}`, 'error');
    return { passedCount: 0, total, isAllPassed: false, error: err.message };
  }
}

function submitSolution() {
  const result = runCode();
  if (!result) return;

  if (result.isAllPassed) {
    // Score boundary in cricket game!
    if (typeof record === 'function') {
      const runScore = G.timerCur > 20 ? 6 : 4;
      record(runScore);
      showExpl(true, `🚀 ALL TEST CASES PASSED! Outstanding Code Blitz Delivery! +${runScore} Runs!`, runScore);
    } else {
      alert(`🎉 SUCCESS! All ${result.total} test cases passed!`);
    }
  } else {
    logToConsole(`⚠️ Solution incomplete. Fix failing test cases and submit again!`, 'warning');
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CODE_ENGINE, SUPPORTED_LANGUAGES, loadCodeProblem, changeLanguage, handleCodeInput, resetCodeTemplate, runCode, submitSolution };
}
