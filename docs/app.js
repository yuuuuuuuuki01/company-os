const layers = [
  { rank: "01", name: "憲法", path: "constitution/", summary: "最上位の規範。主権、権利義務、拒否権、公開原則。" },
  { rank: "02", name: "法律", path: "laws/", summary: "上申、採用、公開、監査、研究連携の具体ルール。" },
  { rank: "03", name: "定款", path: "articles/", summary: "議会、委員会、役職、部署、外縁機関の骨格。" },
  { rank: "04", name: "社内ルール", path: "internal-rules/", summary: "採用、承認、鍵、報告、自律化改善の運用。" },
  { rank: "05", name: "作業手順", path: "sops/", summary: "レビュー、監査、研究速報、鍵請求などの日々の手順。" }
];

const activities = [
  ["Founder Office", "統治", "active", "初回選任の順番と並行運用の枠組みを整えている。", "初回選任議案を会議室へ上申"],
  ["Independent Audit Firm", "監査", "active", "制度適正性レビューと週次運営監査を継続中。", "選任後と多重運行後の統制有効性を再監査"],
  ["AI Academic Institute", "学術", "active", "AI の最新知見を短報向けに整理している。", "必要時のみ petition を提出"],
  ["People and Talent", "人事", "pending", "選任対象と各ユニットの初回 mission packet を整理している。", "Assembly Secretariat と PMO に起票材料を渡す"],
  ["Data and Knowledge", "記録", "active", "台帳と UI の整合を保ちながら parallel board を更新している。", "active lane の変化を公開面へ反映"],
  ["Security, Risk, and Compliance", "統制", "ready", "鍵貸出と credential request の受け口を維持。", "高リスク lane 発生時のみ承認机へ接続"]
];

const routeLanes = [
  ["company-os", "governance-loop", "active", "UI と制度の改善を継続", "founder-office -> data-knowledge", 6, "medium"],
  ["oem", "onboarding-ready", "ready", "最初の mission packet 待ち", "people-talent -> PMO", 3, "medium"],
  ["shift", "onboarding-ready", "ready", "最初の mission packet 待ち", "people-talent -> PMO", 2, "medium"],
  ["jouzou", "onboarding-ready", "ready", "最初の mission packet 待ち", "people-talent -> PMO", 2, "medium"]
];

const approvalDesk = [
  ["inaugural office seating", "governance approval", "pending", "founder-office", "founder-office -> assembly-secretariat", 5],
  ["first three unit mission packets", "onboarding approval", "ready", "people-talent", "people-talent -> PMO", 3],
  ["high-risk release gate", "release approval", "idle", "security-risk-compliance", "security-risk-compliance -> founder-office", 1]
];

const electionQueue = [
  ["Assembly Chair と Floor Clerk を選任", "役職", "最優先", "nominate and second"],
  ["Constitutional Guardian / PM / Director を選任", "横断役", "初回会期", "nominate and second"],
  ["3 常設委員会を着席", "委員会", "初回会期", "各 3 名を seat"],
  ["全 Unit Owner を選任", "ユニット", "通常議事前", "ユニット別 slate を作成"]
];

const quests = [
  "会議室を開いて初回選任議案を回す",
  "承認机で空席役職と onboarding を処理する",
  "並行ルートに 3 つまで案件を接続できる状態にする",
  "書庫の台帳と実運用を一致させる"
];

const flows = [
  ["01", "上申を起票", "sponsor と seconder をそろえて議場へ。"],
  ["02", "討論と修正", "文書ベースのロバート議事法で進行。"],
  ["03", "採決と裁定", "可決後は decision に落として証跡化。"],
  ["04", "執行と監査", "部署が実行し、監査法人が客観評価。"]
];

const departments = [
  ["Founder Office", "統治ギルド", "最終主権、創業者拒否権、公開前の最終判断。", "sovereign stop", ["主権", "拒否権", "公開前"], ["憲法解釈の最終確認", "再上程条件の指定", "高リスク release の最終判断"]],
  ["Assembly Secretariat", "会議室", "上申受付、議事進行、採決記録、議席管理。", "procedural stop", ["議会", "議事", "記録"], ["正式議案の受理", "議事テンプレート運用", "定足数と採決結果の記録"]],
  ["Project Management Office", "進行ギルド", "依存関係、進行、handoff を整理する横断 PM。", "dependency stop", ["PM", "横断", "依存"], ["クリティカルパス整理", "依存衝突時の停止", "handoff 品質の担保"]],
  ["Directorate", "演出ギルド", "品質、表現、構想の一貫性を守る横断 Director。", "quality stop", ["Director", "品質", "整合"], ["表現品質レビュー", "成果物全体の整合確認", "品質崩壊時の停止"]],
  ["Engineering", "工房", "技術実装と内部道具の改善。", "technical safety stop", ["実装", "技術", "安全"], ["コード変更", "技術的レビュー", "破壊的変更前の停止"]],
  ["People and Talent", "人事ギルド", "採用、配置、昇格、役職選任支援。", "staffing stop", ["採用", "選任", "評価"], ["start-packet 配布", "選任候補整理", "引継ぎ品質の評価"]],
  ["Security, Risk, and Compliance", "守衛所", "鍵、資格情報、リスク、コンプライアンス管理。", "security stop", ["鍵", "統制", "リスク"], ["鍵貸出記録", "credential request 管理", "高リスク作業の統制"]],
  ["Data and Knowledge", "書庫番", "台帳、知識、証跡、表示整合の管理。", "record integrity stop", ["台帳", "記録", "可視化"], ["current activity 管理", "registry 更新", "reporting standard の実装"]]
];

const institutions = [
  ["AI Academic Institute", "学術機関", "最新 AI の知見を収集し、短報と petition だけで材料を供給する。", ["最新AI", "一次情報", "直接統治しない"]],
  ["Independent Audit Firm", "監査法人", "制度と運営が適正かを独立に監査し、opinion と remediation を出す。", ["独立監査", "客観評価", "改善勧告"]]
];

const ledgers = [
  ["Approval Ledger", "承認書類の流れを追う台帳。", ["承認", "ハンコ", "公開"]],
  ["Approval Desk Board", "承認机の行列と紙の量を追う台帳。", ["承認机", "行列", "公開"]],
  ["Parallel Operations Board", "複数案件の route lane を追う台帳。", ["並行", "route", "公開"]],
  ["Current Activity Board", "今だれが何をしているかを追う台帳。", ["現況", "handoff", "公開"]]
];

const units = [
  ["credential-ledger", "high"],
  ["FormPilot", "medium"],
  ["jouzou", "medium"],
  ["oem", "medium"],
  ["Poin-T", "high"],
  ["saigai", "high"],
  ["shift", "medium"],
  ["timetree-export", "medium"],
  ["tumugi", "medium"],
  ["zenken", "high"]
];

const locations = [
  ["会議室", "meeting", "議案と選任が集まる場所。", electionQueue.length + 1, "審議待ち"],
  ["承認机", "approval", "承認印と差戻しが発生する場所。", approvalDesk.reduce((sum, item) => sum + item[5], 0), "ハンコ待ち"],
  ["並行路", "routes", "複数の案件が同時に走る道路。", routeLanes.reduce((sum, item) => sum + item[5], 0), "同時進行"],
  ["書庫", "archive", "台帳と証跡が積み上がる場所。", ledgers.length, "整理中"],
  ["監査塔", "audit", "制度の適正性を見張る塔。", institutions.length, "巡回中"]
];

const heroStats = [
  ["場所", String(locations.length)],
  ["担当", String(activities.length)],
  ["route", String(routeLanes.length)],
  ["ユニット", String(units.length)],
  ["書類束", String(locations.reduce((sum, location) => sum + location[3], 0))]
];

function renderPills() {
  document.getElementById("heroPills").innerHTML = heroStats.map(([label, value]) => `<span class="pill"><strong>${value}</strong>${label}</span>`).join("");
}

function renderQuests() {
  document.getElementById("questList").innerHTML = quests.map((quest, index) => `<article class="quest-card"><span>Quest ${String(index + 1).padStart(2, "0")}</span><p>${quest}</p></article>`).join("");
}

function renderLocations() {
  document.getElementById("locationGrid").innerHTML = locations.map(([name, type, description, papers, state]) => `
    <article class="location-card">
      <div class="location-scene" style="background: transparent; border: 2px dashed #444; height: 100px;">
        <div class="building" style="background: var(--bg); border: 2px solid var(--line);"></div>
        <div class="paper-stack" style="--stack-size:${Math.min(papers, 12)}; right: 10px; bottom: 10px;"></div>
        <div class="desk" style="bottom: 10px; position: absolute; left: 24px; width: 32px; height: 12px;"></div>
        <div class="pixel-character status-ready" style="bottom: 18px; position: absolute; left: 28px; width: 16px; height: 16px;"></div>
      </div>
      <div class="location-copy">
        <div class="card-top">
          <div>
            <div class="card-type">[ AREA ] ${type}</div>
            <h3>🪧 ${name}</h3>
          </div>
          <span class="status-chip status-active">${state}</span>
        </div>
        <p>${description}</p>
        <p class="muted">📦 書類束: ${papers}</p>
      </div>
    </article>
  `).join("");
}

function renderRoutes() {
  document.getElementById("routeGrid").innerHTML = routeLanes.map(([unit, route, status, current, handoff, papers, risk]) => `
    <article class="route-card">
      <div class="route-head">
        <div>
          <div class="card-type">${route}</div>
          <h3>${unit}</h3>
        </div>
        <span class="tag risk-${risk}">${status}</span>
      </div>
      <div class="route-road">
        <span class="route-token"></span>
        <span class="paper-stack mini-stack-visual" style="--stack-size:${Math.min(papers, 8)}"></span>
      </div>
      <p><strong>いま:</strong> ${current}</p>
      <p><strong>handoff:</strong> ${handoff}</p>
    </article>
  `).join("");
}

function renderActivities() {
  document.getElementById("activityGrid").innerHTML = activities.map(([actor, layer, status, current, next]) => {
    let bubbleText = "Zzz";
    if (status === "active") bubbleText = "カタカタ...";
    if (status === "pending") bubbleText = "...?";

    return `
    <article class="activity-card">
      <div class="character-scene">
        <div class="pixel-character status-${status}">
          <div class="speech-bubble">${bubbleText}</div>
        </div>
        <div class="desk"></div>
      </div>
      <div class="card-top">
        <div>
          <div class="card-type">▶ ${layer}</div>
          <h3>${actor}</h3>
        </div>
        <span class="status-chip status-${status}">${status}</span>
      </div>
      <div class="activity-copy">
        <p><strong>[いま]</strong><br/>${current}</p>
        <p style="color: var(--gold);"><strong>[ 次 ]</strong><br/>↓ ${next}</p>
      </div>
    </article>
  `}).join("");
}

function renderElectionQueue() {
  document.getElementById("electionList").innerHTML = electionQueue.map(([label, type, due, next], index) => `
    <article class="queue-card">
      <div class="paper-stack mini-stack-visual" style="--stack-size:${Math.min(index + 3, 8)}"></div>
      <div>
        <div class="flow-index">Queue ${String(index + 1).padStart(2, "0")}</div>
        <h3>${label}</h3>
        <p class="muted">種別: ${type} / 期限: ${due}</p>
        <p class="muted">次: ${next}</p>
      </div>
    </article>
  `).join("");
}

function renderApprovals() {
  document.getElementById("approvalGrid").innerHTML = approvalDesk.map(([subject, queue, status, holder, path, papers]) => `
    <article class="paper-card">
      <div class="stamp-mark">${status}</div>
      <h3>${subject}</h3>
      <p class="muted">queue: ${queue}</p>
      <p class="muted">holder: ${holder}</p>
      <p class="muted">path: ${path}</p>
      <p class="muted">paper load: ${papers}</p>
    </article>
  `).join("");
}

function renderLayers() {
  document.getElementById("layerGrid").innerHTML = layers.map((layer) => `
    <article class="stack-card">
      <div class="stack-rank">${layer.rank}</div>
      <div class="card-copy">
        <h3>${layer.name}</h3>
        <p>${layer.path}</p>
      </div>
      <p class="muted">${layer.summary}</p>
    </article>
  `).join("");
}

function renderFlow() {
  const target = document.getElementById("flowList");
  target.style.display = "flex";
  target.style.flexDirection = "column";
  target.style.gap = "0";

  target.innerHTML = flows.map(([index, title, body], i) => `
    <article class="flow-card" style="border-radius: 0; border-bottom: ${i === flows.length - 1 ? '2px solid var(--line)' : 'none'}; position: relative;">
      ${i !== flows.length - 1 ? '<div style="position: absolute; bottom: -18px; left: 50%; font-size: 24px; font-weight: bold; color: var(--gold); z-index: 10;">⬇</div>' : ''}
      <div class="flow-index" style="color: var(--ink); background: var(--panel); display: inline-block; padding: 2px 6px;">SEQ: ${index}</div>
      <h3>${title}</h3>
      <p>${body}</p>
    </article>
  `).join("");
}

function departmentCard([name, kind, mandate, stop, tags, list]) {
  const searchBlob = [name, kind, mandate, stop, ...tags, ...list].join(" ").toLowerCase();
  return `
    <article class="department-card" data-search="${searchBlob}">
      <div class="card-top">
        <div>
          <div class="card-type">${kind}</div>
          <h3>${name}</h3>
        </div>
        <span class="tag stop">${stop}</span>
      </div>
      <p class="muted">${mandate}</p>
      <div class="tag-row">${tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
      <ul class="card-list">${list.map((item) => `<li>${item}</li>`).join("")}</ul>
    </article>
  `;
}

function renderDepartments(filter = "") {
  const normalized = filter.trim().toLowerCase();
  const cards = departments.map((department) => departmentCard(department)).filter((html) => !normalized || html.toLowerCase().includes(normalized));
  document.getElementById("departmentGrid").innerHTML = cards.length ? cards.join("") : `<div class="empty-state">条件に合う部署がありません。</div>`;
}

function renderInstitutions() {
  document.getElementById("institutionList").innerHTML = institutions.map(([title, type, body, tags]) => `
    <article class="institution-card">
      <div class="card-top">
        <div>
          <div class="card-type">${type}</div>
          <h3>${title}</h3>
        </div>
      </div>
      <p>${body}</p>
      <div class="tag-row">${tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
    </article>
  `).join("");
}

function renderLedgers() {
  document.getElementById("ledgerList").innerHTML = ledgers.map(([name, body, tags], index) => `
    <article class="ledger-card">
      <div class="paper-stack mini-stack-visual" style="--stack-size:${Math.min(index + 2, 7)}"></div>
      <div>
        <h3>${name}</h3>
        <p>${body}</p>
        <div class="tag-row">${tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
      </div>
    </article>
  `).join("");
}

function renderUnits() {
  document.getElementById("unitGrid").innerHTML = units.map(([name, risk], index) => `
    <article class="unit-card">
      <div class="card-top">
        <div>
          <div class="card-type">Unit</div>
          <h3>${name}</h3>
        </div>
        <span class="tag risk-${risk}">${risk}</span>
      </div>
      <div class="unit-scene">
        <span class="unit-token"></span>
        <span class="paper-stack mini-stack-visual" style="--stack-size:${(index % 5) + 2}"></span>
      </div>
      <p class="muted">lane: onboarding or active route / owner: pending-election</p>
    </article>
  `).join("");
}

function bindEvents() {
  document.getElementById("departmentFilter").addEventListener("input", (event) => {
    renderDepartments(event.target.value);
  });
}

renderPills();
renderQuests();
renderLocations();
renderRoutes();
renderActivities();
renderElectionQueue();
renderApprovals();
renderDepartments();
renderInstitutions();
renderLedgers();
renderLayers();
renderFlow();
renderUnits();
bindEvents();
