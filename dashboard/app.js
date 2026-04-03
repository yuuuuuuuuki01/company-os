const layers = [
  { rank: "01", name: "憲法", path: "constitution/", summary: "主権、解釈原理、緊急権、公開原則。" },
  { rank: "02", name: "法律", path: "laws/", summary: "上申、異議、AI取込、監査、公開の可動ルール。" },
  { rank: "03", name: "定款", path: "articles/", summary: "議会、部署、外縁機関、委員会、役職の構造。" },
  { rank: "04", name: "社内ルール", path: "internal-rules/", summary: "台帳、鍵管理、報告標準、自律改善、選任。" },
  { rank: "05", name: "手順", path: "sops/", summary: "上申、票決、鍵要求、監査、AI速報、選任実務。" },
  { rank: "06", name: "部署", path: "departments/", summary: "常設の能力面。案件チームより長寿命。" }
];

const activities = [
  {
    actor: "Founder Office",
    layer: "governance",
    status: "active",
    current: "制度の初期立ち上げと例外統治の保持。",
    next: "初回議会へ handoff"
  },
  {
    actor: "Independent Audit Firm",
    layer: "audit",
    status: "active",
    current: "制度適正性レビューと週間運営監査の初回実行。",
    next: "Founder Office / Constitutional Affairs"
  },
  {
    actor: "AI Academic Institute",
    layer: "institution",
    status: "active",
    current: "AI 一次情報の監視と短い日本語速報の発行。",
    next: "必要時のみ petition"
  },
  {
    actor: "People and Talent",
    layer: "department",
    status: "pending",
    current: "初回選任議案の準備。",
    next: "Assembly"
  },
  {
    actor: "Data and Knowledge",
    layer: "department",
    status: "active",
    current: "承認・役職・活動台帳の整備。",
    next: "全体共有"
  },
  {
    actor: "Security, Risk, and Compliance",
    layer: "department",
    status: "ready",
    current: "鍵貸出と credential request の待機運用。",
    next: "必要時に requester"
  },
  {
    actor: "Organizational Development and Learning",
    layer: "department",
    status: "active",
    current: "自律改善バックログの維持。",
    next: "Founder Office / Constitutional Affairs"
  }
];

const flows = [
  { index: "01", title: "案件や改善要求を上申", body: "議案は sponsor + seconder を満たしてから動く。" },
  { index: "02", title: "議会と委員会で審議", body: "ロバート議事法ベースで非同期処理。必要時だけ停止。" },
  { index: "03", title: "部署が能力を貸し出す", body: "Unit が仕事を持ち、Department が標準・承認・停止権を持つ。" },
  { index: "04", title: "監査とAI学術機関が観測", body: "直接命令はせず、短い日本語レポートと上申だけを出す。" },
  { index: "05", title: "監査結果で自律性を調整", body: "観測 -> 小さく試す -> 監査 -> 採用 / 撤回で広げる。" }
];

const tasks = [
  "初回議会を開く",
  "Assembly Chair と Floor Clerk を選ぶ",
  "最初の Unit Owner を選ぶ",
  "3常設委員会を着席させる",
  "Constitutional Guardian / PM / Director を選ぶ",
  "自律改善ループを 1 本だけ試す"
];

const departments = [
  {
    name: "Founder Office",
    kind: "主権",
    mandate: "最終主権、例外裁定、包括 veto。",
    stop: "full sovereign stop",
    tags: ["主権", "最終裁定", "高権限"],
    list: ["憲法停止", "予算上書き", "高リスク release 最終判断"]
  },
  {
    name: "Assembly Secretariat",
    kind: "議会運営",
    mandate: "上申受付、議事進行、記録整備。",
    stop: "procedural stop",
    tags: ["議会", "記録", "手続"],
    list: ["上申の形式確認", "定足数確認", "票決記録の確定"]
  },
  {
    name: "Constitutional Affairs",
    kind: "規範監理",
    mandate: "憲法適合、手続適法、再審可否。",
    stop: "constitutional stop",
    tags: ["監理", "憲法", "拘束力"],
    list: ["上位規範違反を停止", "再審条件を確認", "制度解釈を整理"]
  },
  {
    name: "Portfolio Strategy",
    kind: "戦略",
    mandate: "全体優先順位と大型判断の整理。",
    stop: "portfolio stop",
    tags: ["戦略", "優先順位"],
    list: ["案件の順番", "資源配分の提案", "大きな賭けの整理"]
  },
  {
    name: "Project Management Office",
    kind: "横断進行",
    mandate: "依存解消、進行管理、詰まりの解除。",
    stop: "dependency stop",
    tags: ["PM", "横断", "停止権"],
    list: ["クリティカルパス管理", "依存衝突で停止", "handoff の明確化"]
  },
  {
    name: "Directorate",
    kind: "横断品質",
    mandate: "品質、意味整合、表現整合。",
    stop: "quality stop",
    tags: ["Director", "品質", "横断"],
    list: ["品質崩壊を停止", "全体一貫性の保持", "外向き表現の整合"]
  },
  {
    name: "Product and Service Design",
    kind: "設計",
    mandate: "UX、サービス設計、体験設計。",
    stop: "design integrity stop",
    tags: ["UX", "設計"],
    list: ["UI/UX 方針", "情報設計", "体験仕様の承認"]
  },
  {
    name: "Engineering",
    kind: "実装",
    mandate: "技術実装、技術標準、保守性。",
    stop: "technical safety stop",
    tags: ["実装", "技術", "安全"],
    list: ["技術方針", "レビュー規約", "破壊的変更の停止"]
  },
  {
    name: "Quality Assurance",
    kind: "検証",
    mandate: "受入判定、回帰、証拠整備。",
    stop: "release quality stop",
    tags: ["QA", "検証", "release"],
    list: ["done 判定", "回帰リスク確認", "release 前ブロック"]
  },
  {
    name: "Release Operations",
    kind: "公開運用",
    mandate: "deploy / publish / rollback 実務。",
    stop: "release stop",
    tags: ["公開", "運用", "高リスク"],
    list: ["公開前チェック", "rollback 計画", "本番操作の停止"]
  },
  {
    name: "Security, Risk, and Compliance",
    kind: "安全",
    mandate: "鍵、秘密、リスク、コンプライアンス。",
    stop: "security stop",
    tags: ["鍵", "秘密", "監視"],
    list: ["鍵貸出台帳", "risk 分類", "漏えい時の即時停止"]
  },
  {
    name: "People and Talent",
    kind: "人事",
    mandate: "採用、昇格、解任、配置。",
    stop: "staffing stop",
    tags: ["採用", "人事"],
    list: ["start packet 配布", "confidence review", "役職配置"]
  },
  {
    name: "Finance and Treasury",
    kind: "財務",
    mandate: "予算、支出、資源配分。",
    stop: "spending stop",
    tags: ["予算", "財務"],
    list: ["予算超過を停止", "資源配分", "支出トレース"]
  },
  {
    name: "Legal and Policy",
    kind: "法務",
    mandate: "外部法務、契約、政策整合。",
    stop: "policy stop",
    tags: ["法務", "契約"],
    list: ["外部約束の法務確認", "政策文言の確認", "外部リスク整理"]
  },
  {
    name: "Organizational Development and Learning",
    kind: "組織改善",
    mandate: "学術知見と実績から制度改善。",
    stop: "redesign hold",
    tags: ["組織論", "自律改善", "学習"],
    list: ["自律改善ループ", "制度再設計", "理論知見の吸収"]
  },
  {
    name: "Research and Intelligence",
    kind: "調査",
    mandate: "調査、比較、証拠整理。",
    stop: "evidence hold",
    tags: ["調査", "証拠"],
    list: ["根拠不足で hold", "比較調査", "意思決定材料の整備"]
  },
  {
    name: "Communications and Brand",
    kind: "発信",
    mandate: "外向き表現、語調、ブランド整合。",
    stop: "publication stop",
    tags: ["広報", "ブランド"],
    list: ["公開文言の確認", "ブランド崩れの停止", "メッセージ整合"]
  },
  {
    name: "Business Development and Partnerships",
    kind: "提携",
    mandate: "提携機会、外部折衝、案件化前整理。",
    stop: "commitment hold",
    tags: ["提携", "外部"],
    list: ["外部約束の保留", "案件化前整理", "法務連携"]
  },
  {
    name: "Customer Success and Support",
    kind: "信頼運用",
    mandate: "問い合わせ、支援、信頼毀損の早期検知。",
    stop: "service-risk stop",
    tags: ["サポート", "信頼"],
    list: ["障害受理", "ユーザー影響の可視化", "悪化時の停止提案"]
  },
  {
    name: "Data and Knowledge",
    kind: "記録",
    mandate: "台帳、記録完全性、圧縮レポート標準。",
    stop: "record integrity stop",
    tags: ["台帳", "記録", "承認履歴"],
    list: ["承認台帳", "officeholder registry", "reporting standard"]
  },
  {
    name: "Internal Tools and Enablement",
    kind: "内製基盤",
    mandate: "内製ツール、自動化、運用補助。",
    stop: "tooling safety stop",
    tags: ["自動化", "内製"],
    list: ["自動化整備", "テンプレ整備", "危険な rollout の停止"]
  }
];

const institutions = [
  {
    title: "AI Academic Institute",
    type: "学術機関",
    body: "AI の最新知見を集める。直接指揮は禁止。影響は report と petition 経由のみ。",
    tags: ["直接命令なし", "日本語短報", "一次情報重視"]
  },
  {
    title: "Independent Audit Firm",
    type: "監査法人",
    body: "制度が適正に動いているかを客観判定する。運営はせず、opinion と remediation を返す。",
    tags: ["独立性", "運営監査", "客観評価"]
  }
];

const ledgers = [
  {
    name: "Approval Ledger",
    body: "standing approval と個別承認の履歴。company-os の commit / push もここで追跡。",
    tags: ["承認", "trace", "公開"]
  },
  {
    name: "Key Loan Ledger",
    body: "鍵の貸出・返却・失効・事故を Key ID 単位で追跡。",
    tags: ["鍵", "貸出", "restricted"]
  },
  {
    name: "Credential Request Ledger",
    body: "資格情報が本当に必要だったかを request 単位で追う。",
    tags: ["credential", "need-only", "restricted"]
  },
  {
    name: "Officeholder Registry",
    body: "今だれが lawful に役職についているかを管理。",
    tags: ["役職", "選任", "公開"]
  },
  {
    name: "Current Activity Board",
    body: "今だれが何をしていて、次にどこへ渡すかを一覧化。",
    tags: ["現在稼働", "handoff", "公開"]
  }
];

const units = [
  ["credential-ledger", "high"],
  ["FormPilot", "medium"],
  ["jouzou", "medium"],
  ["kanai-kagamibiraki-proposal", "low"],
  ["oem", "medium"],
  ["oem_release", "medium"],
  ["Poin-T", "high"],
  ["saigai", "high"],
  ["shift", "medium"],
  ["shift_backup", "low"],
  ["timetree-export", "medium"],
  ["tumugi", "medium"],
  ["zenken", "high"]
];

const heroStats = [
  ["Rule Layers", String(layers.length)],
  ["Departments", String(departments.length)],
  ["Units", String(units.length)],
  ["Active Actors", String(activities.length)],
  ["Ledgers", String(ledgers.length)]
];

const miniStack = ["適正性検証", "初回選任", "監査定着", "自律改善"];

function renderPills() {
  const target = document.getElementById("heroPills");
  target.innerHTML = heroStats
    .map(([label, value]) => `<span class="pill"><strong>${value}</strong>${label}</span>`)
    .join("");
}

function renderMiniStack() {
  const target = document.getElementById("miniStack");
  target.innerHTML = miniStack.map((item) => `<span class="pill">${item}</span>`).join("");
}

function renderActivities() {
  const target = document.getElementById("activityGrid");
  target.innerHTML = activities
    .map(
      (activity) => `
        <article class="activity-card">
          <div class="card-top">
            <div>
              <div class="card-type">${activity.layer}</div>
              <h3>${activity.actor}</h3>
            </div>
            <span class="status-chip status-${activity.status}">${activity.status}</span>
          </div>
          <div class="activity-copy">
            <p><strong>Current:</strong> ${activity.current}</p>
            <p><strong>Next:</strong> ${activity.next}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function renderLayers() {
  const target = document.getElementById("layerGrid");
  target.innerHTML = layers
    .map(
      (layer) => `
        <article class="stack-card">
          <div class="stack-rank">${layer.rank}</div>
          <div class="card-copy">
            <h3>${layer.name}</h3>
            <p>${layer.path}</p>
          </div>
          <p class="muted">${layer.summary}</p>
        </article>
      `
    )
    .join("");
}

function renderFlow() {
  const target = document.getElementById("flowList");
  target.innerHTML = flows
    .map(
      (flow) => `
        <article class="flow-card">
          <div class="flow-index">${flow.index}</div>
          <h3>${flow.title}</h3>
          <p>${flow.body}</p>
        </article>
      `
    )
    .join("");
}

function renderTasks() {
  const target = document.getElementById("taskList");
  target.innerHTML = tasks
    .map(
      (task, index) => `
        <article class="task-card">
          <div class="flow-index">Task ${String(index + 1).padStart(2, "0")}</div>
          <h3>${task}</h3>
        </article>
      `
    )
    .join("");
}

function departmentCard(department) {
  const searchBlob = [department.name, department.kind, department.mandate, department.stop, ...department.tags, ...department.list]
    .join(" ")
    .toLowerCase();

  return `
    <article class="department-card" data-search="${searchBlob}">
      <div class="card-top">
        <div>
          <div class="card-type">${department.kind}</div>
          <h3>${department.name}</h3>
        </div>
        <span class="tag stop">${department.stop}</span>
      </div>
      <p class="muted">${department.mandate}</p>
      <div class="tag-row">
        ${department.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
      <ul class="card-list">
        ${department.list.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </article>
  `;
}

function renderDepartments(filter = "") {
  const target = document.getElementById("departmentGrid");
  const normalized = filter.trim().toLowerCase();

  const cards = departments
    .map((department) => departmentCard(department))
    .filter((html) => !normalized || html.toLowerCase().includes(normalized));

  target.innerHTML = cards.length
    ? cards.join("")
    : `<div class="empty-state">該当する部署がありません。</div>`;
}

function renderInstitutions() {
  const target = document.getElementById("institutionList");
  target.innerHTML = institutions
    .map(
      (institution) => `
        <article class="institution-card">
          <div class="card-top">
            <div>
              <div class="card-type">${institution.type}</div>
              <h3>${institution.title}</h3>
            </div>
          </div>
          <p>${institution.body}</p>
          <div class="tag-row">
            ${institution.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function renderLedgers() {
  const target = document.getElementById("ledgerList");
  target.innerHTML = ledgers
    .map(
      (ledger) => `
        <article class="ledger-card">
          <h3>${ledger.name}</h3>
          <p>${ledger.body}</p>
          <div class="tag-row">
            ${ledger.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function renderUnits() {
  const target = document.getElementById("unitGrid");
  target.innerHTML = units
    .map(
      ([name, risk]) => `
        <article class="unit-card">
          <div class="card-top">
            <div>
              <div class="card-type">Unit</div>
              <h3>${name}</h3>
            </div>
            <span class="tag risk-${risk}">${risk}</span>
          </div>
          <p class="muted">seat: 1 / owner: pending-election / status: bootstrap-active</p>
        </article>
      `
    )
    .join("");
}

function bindEvents() {
  const input = document.getElementById("departmentFilter");
  input.addEventListener("input", (event) => {
    renderDepartments(event.target.value);
  });
}

renderPills();
renderMiniStack();
renderActivities();
renderLayers();
renderFlow();
renderTasks();
renderDepartments();
renderInstitutions();
renderLedgers();
renderUnits();
bindEvents();
