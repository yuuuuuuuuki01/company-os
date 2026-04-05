// ============================================================
// app.js — Company OS 統合ダッシュボード (v1)
// ============================================================

let DATA = null;

// ====== 日本語名マッピング ======
const JA = {
  // --- 部署 ---
  dept: {
    "founder-office": "創業者室",
    "assembly-secretariat": "議会事務局",
    "constitutional-affairs": "憲法審査部",
    "portfolio-strategy": "ポートフォリオ戦略部",
    "project-management-office": "PMO（プロジェクト管理室）",
    "directorate": "ディレクター室",
    "product-management": "プロダクト管理部",
    "product-service-design": "プロダクト・サービス設計部",
    "engineering": "エンジニアリング部",
    "quality-assurance": "品質保証部",
    "release-operations": "リリース運用部",
    "security-risk-compliance": "セキュリティ・リスク・コンプライアンス部",
    "people-talent": "人事部",
    "finance-treasury": "財務部",
    "procurement-vendor-management": "調達・ベンダー管理部",
    "legal-policy": "法務・政策部",
    "organizational-development-learning": "組織開発・学習部",
    "research-intelligence": "リサーチ・インテリジェンス部",
    "exploration-incubation": "探索・インキュベーション部",
    "business-operations": "事業運営部",
    "sales-revenue": "営業・売上部",
    "marketing-growth": "マーケティング・グロース部",
    "communications-brand": "広報・ブランド部",
    "business-development-partnerships": "事業開発・パートナーシップ部",
    "customer-success-support": "カスタマーサクセス・サポート部",
    "data-knowledge": "データ・ナレッジ部",
    "internal-tools-enablement": "内部ツール推進部",
    "information-systems": "情報システム部",
    "organizational-scaling": "組織スケーリング部",
  },
  // --- 役職 ---
  office: {
    "assembly-chair": "議長",
    "floor-clerk": "議事記録担当",
    "constitutional-guardian": "憲法守護官",
    "project-manager": "プロジェクトマネージャー",
    "director": "ディレクター",
    "unit-owner": "ユニットオーナー",
    "department-steward": "部署スチュワード",
    "personnel-committee-member": "人事委員会委員",
    "personnel-committee-chair": "人事委員会委員長",
    "constitutional-review-committee-member": "憲法審査委員会委員",
    "constitutional-review-committee-chair": "憲法審査委員会委員長",
    "release-review-committee-member": "リリース審査委員会委員",
    "release-review-committee-chair": "リリース審査委員会委員長",
  },
  // --- アジェンダモード ---
  mode: {
    "report": "報告",
    "discussion-1": "討議-1",
    "discussion-2": "討議-2",
    "discussion": "討議",
    "deliberation": "採決",
    "procedural": "手続",
  },
  // --- ステータス ---
  status: {
    "adopted": "採択済",
    "motion-open": "審議中",
    "rollout-active": "展開中",
    "reported-complete": "完了報告済",
    "active": "活動中",
    "ready": "準備完了",
    "seated": "着任",
    "pending-election": "選任待ち",
    "unseated": "未着任",
    "not-activated": "未稼働",
    "watch": "監視中",
    "closed": "完了",
  },
  // --- ユニット ---
  unit: {
    "company-os": "Company OS",
    "oem": "OEM見積ツール",
    "shift": "SHIFT",
    "jouzou": "醸造",
    "FormPilot": "FormPilot",
    "Poin-T": "Poin-T",
    "credential-ledger": "資格台帳",
    "kanai-kagamibiraki-proposal": "金井鏡開き提案",
    "oem_release": "OEMリリース",
    "saigai": "災害",
    "shift_backup": "SHIFTバックアップ",
    "timetree-export": "TimeTreeエクスポート",
    "tumugi": "紬",
    "zenken": "全研",
  },
};

// ヘルパー：英語キーから日本語名を取得（見つからなければ原文を返す）
function ja(category, key) {
  return JA[category]?.[key] || key;
}

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
      return `<div class="agenda-item"><span class="agenda-mode mode-${modeClass}">${ja("mode", a.mode)}</span><span class="agenda-name clickable" onclick="showMotion('${a.item.replace(/'/g, "\\'")}')">${a.item}</span></div>`;
    }).join("");
    const resultHtml = (s.result || []).map(r => `<div class="result-item">${r}</div>`).join("");
    const rulingBtn = ruling ? `<div style="margin-top:8px"><button class="card ruling-btn" onclick="showRuling(${s.number})" style="width:100%;padding:8px;font-size:11px;color:var(--accent);border-color:var(--accent)">📖 裁定を表示</button></div>` : "";

    return `
      <div class="card sitting-card" data-num="${s.number}">
        <div class="sitting-card-header">
          <span class="sitting-number">#${s.number}</span>
          <span class="sitting-status ${statusClass}">${ja("status", s.status)}</span>
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
            <div class="motion-owner">${ja("dept", m.Owner || "")} · ${m["Next sitting"] || ""}</div>
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
  const officeholders = DATA.officeholders || [];
  const works = DATA.work_allocation || [];
  
  const automationIssues = DATA.automation_issues || [];
  const reviewIssues = DATA.review_issues || [];
  const originationAgendas = DATA.origination_agendas || [];

  // Calculate total headcount (unique members in officeholders registry)
  const uniqueHolders = new Set(officeholders.map(o => o.Holder).filter(h => h && h.toLowerCase() !== "tbd"));
  const totalHeadcount = uniqueHolders.size;
  document.getElementById("deptCount").textContent = `総登録 ${totalHeadcount}名 / ${depts.length} 部署`;

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
    
    // Estimate members count for the department
    const deptMembers = officeholders.filter(o => o["Seat/Unit"] === id || (o.Office && o.Office.includes(id)));
    let count = Math.max(1, deptMembers.length); 
    if (!d.Steward || d.Steward.toUpperCase() === "TBD") count = 0;

    // Get assigned workload
    const workload = works.find(w => w.Department === id);
    const workText = workload ? workload["Current assignment"] : "現在のアサインなし";

    // Build department issues
    const deptAutomations = automationIssues.filter(a => a.Department === id);
    const deptReviews = reviewIssues.filter(r => r.Department === id);
    const deptOriginations = originationAgendas.filter(o => o.Department === id);

    let issuesHtml = "";
    if (deptAutomations.length || deptReviews.length || deptOriginations.length) {
      issuesHtml = `<div class="dept-issues"><div class="dept-issues-title">🚨 部門課題</div><ul class="dept-issue-list">`;
      deptAutomations.forEach(a => issuesHtml += `<li><span class="badge-auto">自動化</span> ${a["自動化課題"] || ""}</li>`);
      deptReviews.forEach(r => issuesHtml += `<li><span class="badge-review">総点検</span> ${r["Submission summary"] || ""}</li>`);
      deptOriginations.forEach(o => issuesHtml += `<li><span class="badge-orig">議題案</span> ${o["Candidate"] || ""}</li>`);
      issuesHtml += `</ul></div>`;
    }

    return `
      <div class="card dept-card">
        <div class="dept-name">
          <span>${icon} ${ja("dept", id)}</span>
          <span class="dept-headcount">👤 ${count}名</span>
        </div>
        <div class="dept-steward">${d.Steward || "メンバー未割り当て"}</div>
        <div class="dept-workload"><strong>📝 作業量:</strong> ${workText}</div>
        ${issuesHtml}
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
      <span class="oh-office">${ja("office", h.Office || "")}</span>
      <span class="oh-holder">${h.Holder || ""}</span>
      <span class="oh-status">${ja("status", h.Status || "")}</span>
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
      <div class="work-dept">${ja("dept", w.Department || "")}</div>
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
    const unitName = u.Unit || "";
    const lane = (u["Lane state"] || "not-activated").toLowerCase();
    const laneClass = lane === "active" ? "lane-active" : lane === "ready" ? "lane-ready" : "lane-not-activated";
    const seat = (u["Seat state"] || "").toLowerCase();
    const owner = (u["Owner status"] || "").toLowerCase();

    return `
      <div class="card unit-card">
        <div class="unit-card-header">
          <span class="unit-name">${ja("unit", unitName)}</span>
          <span class="unit-lane-badge ${laneClass}">${ja("status", lane)}</span>
        </div>
        <div class="unit-meta">
          <div class="unit-meta-row"><span class="unit-meta-label">着席</span><span class="unit-meta-value">${ja("status", seat)}</span></div>
          <div class="unit-meta-row"><span class="unit-meta-label">リスク</span><span class="unit-meta-value">${u["Default risk"] || ""}</span></div>
          <div class="unit-meta-row"><span class="unit-meta-label">オーナー</span><span class="unit-meta-value">${ja("status", owner)}</span></div>
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

// ====== Assembly: Approval Branches ======
function renderApprovalBranches() {
  const el = document.getElementById("approvalList");
  const branches = DATA.approval_branches || [];
  document.getElementById("approvalCount").textContent = `${branches.length} 件`;

  if (!branches.length) {
    el.innerHTML = '<div class="empty-state"><span class="empty-icon">✅</span><p>承認待ちなし</p></div>';
    return;
  }

  el.innerHTML = branches.map(b => {
    const state = b["状態"] || "";
    const stateClass = state === "standby" ? "approval-standby" :
                       state === "waiting" ? "approval-waiting" :
                       state === "completed" ? "approval-completed" : "approval-standby";
    const stateLabel = state === "standby" ? "待機中" :
                       state === "waiting" ? "承認待ち" :
                       state === "completed" ? "完了" : state;
    const blocked = b["Blocked item"] || "";
    const parallel = b["Parallelizable items"] || "";

    return `
      <div class="card approval-card ${stateClass}">
        <div class="approval-header">
          <span class="approval-id">${b["Branch ID"] || ""}</span>
          <span class="approval-state-badge">${stateLabel}</span>
        </div>
        <div class="approval-scope">
          <strong>承認対象:</strong> ${b["承認対象"] || ""}
        </div>
        <div class="approval-approver">
          <strong>承認者:</strong> ${ja("dept", b["Approver"] || "")}
        </div>
        ${blocked ? `<div class="approval-blocked"><strong>🚫 ブロック中:</strong> ${blocked}</div>` : ""}
        ${parallel ? `<div class="approval-parallel"><strong>✅ 並行可能:</strong> ${parallel}</div>` : ""}
        ${b["Return condition"] ? `<div class="approval-return"><strong>返却条件:</strong> ${b["Return condition"]}</div>` : ""}
      </div>
    `;
  }).join("");
}

// ====== Projects: Git Branches ======
function renderGitBranches() {
  const el = document.getElementById("branchList");
  const branches = DATA.git_branches || [];

  if (!branches.length) {
    el.innerHTML = '<div class="empty-state">ブランチデータなし</div>';
    return;
  }

  el.innerHTML = branches.map(b => {
    const isMain = b.name === "main" || b.name === "origin/main";
    const isHead = b.name === "origin/HEAD";
    if (isHead) return "";
    const icon = isMain ? "🏠" : "🌿";
    return `
      <div class="branch-row ${isMain ? 'branch-main' : ''}">
        <span class="branch-icon">${icon}</span>
        <span class="branch-name">${b.name}</span>
        <span class="branch-msg">${b.message || ""}</span>
      </div>
    `;
  }).join("");
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
  // Try to find the detailed motion data
  const motion = DATA.motions ? (DATA.motions[name] || Object.values(DATA.motions).find(m => m.title === name || m.id === name)) : null;

  let body = "";

  if (motion) {
    // Full discussion detail view
    const renderList = (arr) => arr && arr.length ? arr.map(l => `<li>${l}</li>`).join("") : "<li>—</li>";

    body = `
      <div class="modal-section">
        <h3>📌 目的</h3>
        <ul>${renderList(motion.goal)}</ul>
      </div>
      <div class="modal-section">
        <h3>📝 提案内容</h3>
        <ul>${renderList(motion.proposed_action)}</ul>
      </div>
      <div class="modal-section">
        <h3>❓ 理由</h3>
        <ul>${renderList(motion.why)}</ul>
      </div>
      <div class="modal-section discussion-box">
        <h3>💬 討議-1</h3>
        <ul>${renderList(motion.discussion_1)}</ul>
      </div>
      <div class="modal-section discussion-box">
        <h3>💬 討議-2</h3>
        <ul>${renderList(motion.discussion_2)}</ul>
      </div>
      <div class="modal-section deliberation-box">
        <h3>⚖️ 採決結果</h3>
        <ul>${renderList(motion.deliberation)}</ul>
      </div>
      <div class="modal-meta">
        <span>オーナー: ${ja("dept", motion.owner)}</span>
        <span>ステータス: ${ja("status", motion.status)}</span>
        <span>リスク: ${motion.risk}</span>
      </div>
    `;
  } else if (item) {
    // Fallback: improvement board metadata only
    body = `
      <h3>種別</h3><p>${item.Type || ""}</p>
      <h3>優先度</h3><p>${item.Priority || ""}</p>
      <h3>審議モード</h3><p>${item["Agenda mode"] || ""}</p>
      <h3>サイクル</h3><p>${item["Cycle stage"] || ""}</p>
      <h3>オーナー</h3><p>${ja("dept", item.Owner || "")}</p>
      <h3>ステータス</h3><p>${ja("status", item.Status || "")}</p>
      <h3>次のハンドオフ</h3><p>${item["Next handoff"] || ""}</p>
      <h3>次の会議</h3><p>${item["Next sitting"] || ""}</p>
    `;
  } else {
    body = "<p>議案の詳細データが見つかりませんでした。</p>";
  }

  const title = motion ? motion.title : name;
  openModal(title, body);
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
  renderApprovalBranches();
  renderDepartments();
  renderOfficeholders();
  renderWorkAllocation();
  renderUnits();
  renderActivities();
  renderGitBranches();

  // Modal close
  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("modalOverlay").addEventListener("click", e => {
    if (e.target === document.getElementById("modalOverlay")) closeModal();
  });

  // Auto refresh
  setInterval(async () => {
    const fresh = await fetchStatus();
    if (fresh) { DATA = fresh; renderHeaderStats(); renderTimeline(); renderTracker(); renderApprovalBranches(); }
  }, 30000);
}

init();
