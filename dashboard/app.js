// ============================================================
// app.js — Company OS 統合ダッシュボード (v1)
// ============================================================

let DATA = null;

// ====== Data Fetching ======
async function fetchStatus() {
  try {
    const res = await fetch("./status.json?t=" + Date.now());
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

// ====== Tab Navigation ======
function initTabs() {
  const btns = document.querySelectorAll(".tab-btn");
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("panel-" + btn.dataset.tab).classList.add("active");
      location.hash = btn.dataset.tab;
    });
  });
  // Restore from hash
  const hash = location.hash.replace("#", "");
  if (hash) {
    const btn = document.querySelector(`.tab-btn[data-tab="${hash}"]`);
    if (btn) btn.click();
  }
}

// ====== Clock ======
function startClock() {
  const el = document.getElementById("clock");
  const update = () => {
    const n = new Date();
    el.textContent = [n.getHours(), n.getMinutes(), n.getSeconds()].map(v => String(v).padStart(2, "0")).join(":");
  };
  update();
  setInterval(update, 1000);
}

// ====== Header Stats ======
function renderHeaderStats() {
  if (!DATA) return;
  document.getElementById("statSittings").textContent = `${DATA.stats.total_sittings} 回`;
  document.getElementById("statMotions").textContent = `${DATA.stats.total_motions} 件`;
}

// ====== Assembly: Timeline ======
function renderTimeline() {
  const el = document.getElementById("timeline");
  const sittings = DATA.sittings || [];
  document.getElementById("sittingCount").textContent = `${sittings.length} 回`;

  if (!sittings.length) { el.innerHTML = '<div class="empty-state"><span class="empty-icon">📭</span><p>会議データなし</p></div>'; return; }

  el.innerHTML = sittings.slice(0, 30).map(s => {
    const ruling = DATA.rulings[String(s.number)];
    const statusClass = s.status === "adopted" ? "adopted" : "motion-open";
    const agendaHtml = (s.agenda || []).map(a => {
      const modeClass = a.mode.startsWith("discussion") ? "discussion" : a.mode === "deliberation" ? "deliberation" : a.mode === "report" ? "report" : "procedural";
      return `<div class="agenda-item"><span class="agenda-mode mode-${modeClass}">${a.mode}</span><span class="agenda-name">${a.item}</span></div>`;
    }).join("");
    const resultHtml = (s.result || []).map(r => `<div class="result-item">${r}</div>`).join("");
    const rulingBtn = ruling ? `<div style="margin-top:8px"><button class="card ruling-btn" onclick="showRuling(${s.number})" style="width:100%;padding:8px;font-size:11px;color:var(--accent);border-color:var(--accent)">📖 裁定を表示</button></div>` : "";

    return `
      <div class="card sitting-card" data-num="${s.number}">
        <div class="sitting-card-header">
          <span class="sitting-number">#${s.number}</span>
          <span class="sitting-status ${statusClass}">${s.status}</span>
          <span class="sitting-date">${s.date || ""}</span>
        </div>
        <div class="sitting-goal">${s.goal || ""}</div>
        <div class="agenda-list">${agendaHtml}</div>
        ${resultHtml ? `<div class="sitting-result">${resultHtml}</div>` : ""}
        ${rulingBtn}
      </div>
    `;
  }).join("");
}

// ====== Assembly: Motion Tracker ======
function renderTracker() {
  const el = document.getElementById("tracker");
  const items = DATA.improvement_board || [];
  document.getElementById("motionCount").textContent = `${items.length} 件`;

  if (!items.length) { el.innerHTML = '<div class="empty-state"><span class="empty-icon">📋</span><p>議案データなし</p></div>'; return; }

  // Group by status
  const groups = { active: [], adopted: [], closed: [] };
  items.forEach(item => {
    const status = (item.Status || "").toLowerCase();
    const stage = (item["Cycle stage"] || "").toLowerCase();
    if (stage === "closed" || status.includes("complete")) groups.closed.push(item);
    else if (status.includes("active") || status.includes("rollout")) groups.active.push(item);
    else groups.adopted.push(item);
  });

  const groupLabels = { active: "🔴 進行中", adopted: "🔵 採択済み", closed: "✅ 完了" };
  const groupColors = { active: "active", adopted: "adopted", closed: "closed" };

  el.innerHTML = Object.entries(groups).map(([key, motions]) => {
    if (!motions.length) return "";
    return `
      <div class="tracker-group">
        <div class="tracker-group-title">${groupLabels[key]} (${motions.length})</div>
        ${motions.map(m => `
          <div class="card motion-card" onclick="showMotion('${(m.Item || "").replace(/'/g,"\\'")}')">
            <div class="motion-card-header">
              <span class="motion-status-dot ${groupColors[key]}"></span>
              <span class="motion-name">${m.Item || ""}</span>
            </div>
            <div class="motion-owner">${m.Owner || ""} · ${m["Next sitting"] || ""}</div>
          </div>
        `).join("")}
      </div>
    `;
  }).join("");
}

// ====== Organization: Departments ======
function renderDepartments() {
  const el = document.getElementById("deptGrid");
  const depts = DATA.departments || [];
  document.getElementById("deptCount").textContent = `${depts.length} 部署`;

  if (!depts.length) { el.innerHTML = '<div class="empty-state"><span class="empty-icon">🏢</span><p>部署データなし</p></div>'; return; }

  const icons = {
    "founder-office": "👑", "assembly-secretariat": "🏛️", "constitutional-affairs": "⚖️",
    "portfolio-strategy": "🎯", "project-management-office": "📋", "directorate": "🎨",
    "engineering": "⚙️", "security-risk-compliance": "🔒", "people-talent": "👥",
    "data-knowledge": "🗄️", "research-intelligence": "🔬", "finance-treasury": "💰",
    "sales-revenue": "📈", "marketing-growth": "📣", "legal-policy": "📜",
    "product-management": "📦", "quality-assurance": "✅", "release-operations": "🚀",
    "exploration-incubation": "🧪", "business-operations": "🔄", "internal-tools-enablement": "🛠️",
    "information-systems": "💻", "product-service-design": "🎯", "procurement-vendor-management": "🛒",
    "communications-brand": "📢", "business-development-partnerships": "🤝",
    "customer-success-support": "🎧", "organizational-development-learning": "📚"
  };

  el.innerHTML = depts.map(d => {
    const id = d.Department || "";
    const icon = icons[id] || "🏢";
    return `
      <div class="card dept-card">
        <div class="dept-name">${icon} ${id}</div>
        <div class="dept-steward">${d.Steward || ""}</div>
        <div class="dept-stop">${d["Stop power"] || ""}</div>
      </div>
    `;
  }).join("");
}

// ====== Organization: Officeholders ======
function renderOfficeholders() {
  const el = document.getElementById("officeholderList");
  const holders = DATA.officeholders || [];

  if (!holders.length) { el.innerHTML = '<div class="empty-state">データなし</div>'; return; }

  el.innerHTML = holders.slice(0, 20).map(h => `
    <div class="oh-row">
      <span class="oh-office">${h.Office || ""}</span>
      <span class="oh-holder">${h.Holder || ""}</span>
      <span class="oh-status">${h.Status || ""}</span>
    </div>
  `).join("");
}

// ====== Organization: Work Allocation ======
function renderWorkAllocation() {
  const el = document.getElementById("workList");
  const work = DATA.work_allocation || [];

  if (!work.length) { el.innerHTML = '<div class="empty-state">データなし</div>'; return; }

  el.innerHTML = work.slice(0, 15).map(w => `
    <div class="work-row">
      <div class="work-dept">${w.Department || ""}</div>
      <div class="work-task">${w["Current assignment"] || ""}</div>
    </div>
  `).join("");
}

// ====== Projects: Units ======
function renderUnits() {
  const el = document.getElementById("unitGrid");
  const units = DATA.units || [];
  document.getElementById("unitCount").textContent = `${units.length} ユニット`;

  if (!units.length) { el.innerHTML = '<div class="empty-state"><span class="empty-icon">🔷</span><p>ユニットデータなし</p></div>'; return; }

  el.innerHTML = units.map(u => {
    const lane = (u["Lane state"] || "not-activated").toLowerCase();
    const laneClass = lane === "active" ? "lane-active" : lane === "ready" ? "lane-ready" : "lane-not-activated";
    const laneLabel = lane === "active" ? "Active" : lane === "ready" ? "Ready" : "Not activated";

    return `
      <div class="card unit-card">
        <div class="unit-card-header">
          <span class="unit-name">${u.Unit || ""}</span>
          <span class="unit-lane-badge ${laneClass}">${laneLabel}</span>
        </div>
        <div class="unit-meta">
          <div class="unit-meta-row"><span class="unit-meta-label">Seat</span><span class="unit-meta-value">${u["Seat state"] || ""}</span></div>
          <div class="unit-meta-row"><span class="unit-meta-label">Risk</span><span class="unit-meta-value">${u["Default risk"] || ""}</span></div>
          <div class="unit-meta-row"><span class="unit-meta-label">Owner</span><span class="unit-meta-value">${u["Owner status"] || ""}</span></div>
        </div>
      </div>
    `;
  }).join("");
}

// ====== Projects: Activities ======
function renderActivities() {
  const el = document.getElementById("activityList");
  const acts = DATA.activities || [];

  if (!acts.length) { el.innerHTML = '<div class="empty-state">データなし</div>'; return; }

  el.innerHTML = acts.map(a => `
    <div class="activity-row">
      <div class="activity-actor">${a.Actor || ""}</div>
      <div class="activity-work">${a["Current Work"] || ""}</div>
      <div class="activity-status">${a.Status || ""} → ${a["Next Handoff"] || ""}</div>
    </div>
  `).join("");
}

// ====== Modal ======
function openModal(title, bodyHtml) {
  document.getElementById("modalHeader").textContent = title;
  document.getElementById("modalBody").innerHTML = bodyHtml;
  document.getElementById("modalOverlay").classList.add("open");
}
function closeModal() { document.getElementById("modalOverlay").classList.remove("open"); }

window.showRuling = function(num) {
  const r = DATA.rulings[String(num)];
  if (!r) return;
  openModal(`#${num} 裁定`, `
    <h3>裁定</h3><p>${r.ruling || ""}</p>
    <h3>理由</h3><p>${r.reason || ""}</p>
    <h3>実行責任者</h3><p>${r.executor || ""}</p>
    <h3>少数意見</h3><p>${r.minority_view || "なし"}</p>
    <h3>創業者拒否権</h3><p>${r.founder_veto ? "行使" : "なし"}</p>
  `);
};

window.showMotion = function(name) {
  const item = (DATA.improvement_board || []).find(i => i.Item === name);
  if (!item) return;
  openModal(name, `
    <h3>種別</h3><p>${item.Type || ""}</p>
    <h3>優先度</h3><p>${item.Priority || ""}</p>
    <h3>審議モード</h3><p>${item["Agenda mode"] || ""}</p>
    <h3>サイクル</h3><p>${item["Cycle stage"] || ""}</p>
    <h3>オーナー</h3><p>${item.Owner || ""}</p>
    <h3>ステータス</h3><p>${item.Status || ""}</p>
    <h3>次のハンドオフ</h3><p>${item["Next handoff"] || ""}</p>
    <h3>次の会議</h3><p>${item["Next sitting"] || ""}</p>
  `);
};

// ====== Init ======
async function init() {
  initTabs();
  startClock();

  DATA = await fetchStatus();
  if (!DATA) {
    document.getElementById("timeline").innerHTML = '<div class="empty-state"><span class="empty-icon">⚠️</span><p>status.json を読み込めませんでした</p></div>';
    return;
  }

  renderHeaderStats();
  renderTimeline();
  renderTracker();
  renderDepartments();
  renderOfficeholders();
  renderWorkAllocation();
  renderUnits();
  renderActivities();

  // Modal close
  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("modalOverlay").addEventListener("click", e => {
    if (e.target === document.getElementById("modalOverlay")) closeModal();
  });

  // Auto refresh
  setInterval(async () => {
    const fresh = await fetchStatus();
    if (fresh) { DATA = fresh; renderHeaderStats(); renderTimeline(); renderTracker(); }
  }, 30000);
}

init();
