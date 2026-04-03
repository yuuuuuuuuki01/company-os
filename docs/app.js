const layers = [
  { rank: "01", name: "憲法", path: "constitution/", summary: "最上位の規範。主権、権利義務、拒否権、公開原則。" },
  { rank: "02", name: "法律", path: "laws/", summary: "上申、採用、公開、監査、研究連携の具体ルール。" },
  { rank: "03", name: "定款", path: "articles/", summary: "議会、委員会、役職、部署、外縁機関の骨格。" },
  { rank: "04", name: "社内ルール", path: "internal-rules/", summary: "採用、承認、鍵、報告、自律化改善の運用。" },
  { rank: "05", name: "作業手順", path: "sops/", summary: "レビュー、監査、研究速報、鍵請求などの日々の手順。" }
];

const activities = [
  {
    actor: "Founder Office",
    layer: "統治",
    status: "active",
    current: "初回選任の順番と委譲方針を整えている。",
    next: "初回選任議案を会議室へ上申"
  },
  {
    actor: "Independent Audit Firm",
    layer: "監査",
    status: "active",
    current: "制度適正性レビューと週次運営監査を継続中。",
    next: "選任後の統制有効性を再監査"
  },
  {
    actor: "AI Academic Institute",
    layer: "学術",
    status: "active",
    current: "AI の最新知見を短報向けに整理している。",
    next: "必要時のみ petition を提出"
  },
  {
    actor: "People and Talent",
    layer: "人事",
    status: "pending",
    current: "選任対象と配置案を整理している。",
    next: "Assembly Secretariat に選任キューを渡す"
  },
  {
    actor: "Data and Knowledge",
    layer: "記録",
    status: "active",
    current: "台帳と UI の整合を保っている。",
    next: "選任後に registry を更新"
  },
  {
    actor: "Security, Risk, and Compliance",
    layer: "統制",
    status: "ready",
    current: "鍵貸出と credential request の受け口を維持。",
    next: "必要時のみ request に応答"
  }
];

const offices = [
  { office: "Assembly Chair", seat: "会議室", holder: "pending", review: "初回会期", status: "vacant" },
  { office: "Floor Clerk", seat: "会議室", holder: "pending", review: "初回会期", status: "vacant" },
  { office: "Constitutional Guardian", seat: "規範塔", holder: "pending", review: "初回会期", status: "vacant" },
  { office: "Project Manager", seat: "横断役", holder: "pending", review: "初回会期", status: "vacant" },
  { office: "Director", seat: "横断役", holder: "pending", review: "初回会期", status: "vacant" }
];

const electionQueue = [
  { label: "Assembly Chair と Floor Clerk を選任", type: "役職", due: "最優先", next: "nominate and second" },
  { label: "Constitutional Guardian / PM / Director を選任", type: "横断役", due: "初回会期", next: "nominate and second" },
  { label: "3 常設委員会を着席", type: "委員会", due: "初回会期", next: "各 3 名を seat" },
  { label: "全 Unit Owner を選任", type: "ユニット", due: "通常議事前", next: "ユニット別 slate を作成" }
];

const quests = [
  "会議室を開いて初回選任議案を回す",
  "承認机で空席役職を埋める",
  "書庫の台帳と実運用を一致させる",
  "監査塔から制度適正性を見張る"
];

const flows = [
  { index: "01", title: "上申を起票", body: "sponsor と seconder をそろえて議場へ。" },
  { index: "02", title: "討論と修正", body: "文書ベースのロバート議事法で進行。" },
  { index: "03", title: "採決と裁定", body: "可決後は decision に落として証跡化。" },
  { index: "04", title: "執行と監査", body: "部署が実行し、監査法人が客観評価。" }
];

const departments = [
  {
    name: "Founder Office",
    kind: "統治ギルド",
    mandate: "最終主権、創業者拒否権、公開前の最終判断。",
    stop: "sovereign stop",
    tags: ["主権", "拒否権", "公開前"],
    list: ["憲法解釈の最終確認", "再上程条件の指定", "高リスク release の最終判断"]
  },
  {
    name: "Assembly Secretariat",
    kind: "会議室",
    mandate: "上申受付、議事進行、採決記録、議席管理。",
    stop: "procedural stop",
    tags: ["議会", "議事", "記録"],
    list: ["正式議案の受理", "議事テンプレート運用", "定足数と採決結果の記録"]
  },
  {
    name: "Project Management Office",
    kind: "進行ギルド",
    mandate: "依存関係、進行、handoff を整理する横断 PM。",
    stop: "dependency stop",
    tags: ["PM", "横断", "依存"],
    list: ["クリティカルパス整理", "依存衝突時の停止", "handoff 品質の担保"]
  },
  {
    name: "Directorate",
    kind: "演出ギルド",
    mandate: "品質、表現、構想の一貫性を守る横断 Director。",
    stop: "quality stop",
    tags: ["Director", "品質", "整合"],
    list: ["表現品質レビュー", "成果物全体の整合確認", "品質崩壊時の停止"]
  },
  {
    name: "Engineering",
    kind: "工房",
    mandate: "技術実装と内部道具の改善。",
    stop: "technical safety stop",
    tags: ["実装", "技術", "安全"],
    list: ["コード変更", "技術的レビュー", "破壊的変更前の停止"]
  },
  {
    name: "People and Talent",
    kind: "人事ギルド",
    mandate: "採用、配置、昇格、役職選任支援。",
    stop: "staffing stop",
    tags: ["採用", "選任", "評価"],
    list: ["start-packet 配布", "選任候補整理", "引継ぎ品質の評価"]
  },
  {
    name: "Security, Risk, and Compliance",
    kind: "守衛所",
    mandate: "鍵、資格情報、リスク、コンプライアンス管理。",
    stop: "security stop",
    tags: ["鍵", "統制", "リスク"],
    list: ["鍵貸出記録", "credential request 管理", "高リスク作業の統制"]
  },
  {
    name: "Data and Knowledge",
    kind: "書庫番",
    mandate: "台帳、知識、証跡、表示整合の管理。",
    stop: "record integrity stop",
    tags: ["台帳", "記録", "可視化"],
    list: ["current activity 管理", "registry 更新", "reporting standard の実装"]
  }
];

const institutions = [
  {
    title: "AI Academic Institute",
    type: "学術機関",
    body: "最新 AI の知見を収集し、短報と petition だけで材料を供給する。",
    tags: ["最新AI", "一次情報", "直接統治しない"]
  },
  {
    title: "Independent Audit Firm",
    type: "監査法人",
    body: "制度と運営が適正かを独立に監査し、opinion と remediation を出す。",
    tags: ["独立監査", "客観評価", "改善勧告"]
  }
];

const ledgers = [
  {
    name: "Approval Ledger",
    body: "承認書類の流れを追う台帳。",
    tags: ["承認", "ハンコ", "公開"]
  },
  {
    name: "Key Loan Ledger",
    body: "鍵の貸出と返却を Key ID で追う台帳。",
    tags: ["鍵", "貸出", "restricted"]
  },
  {
    name: "Current Activity Board",
    body: "今だれが何をしているかを追う台帳。",
    tags: ["現況", "handoff", "公開"]
  },
  {
    name: "Bootstrap Election Board",
    body: "空席と選任待ちを追う台帳。",
    tags: ["選任", "bootstrap", "公開"]
  }
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

const locationBlueprints = [
  {
    name: "会議室",
    type: "meeting",
    description: "議案と選任が集まる場所。",
    papers: electionQueue.length + 1,
    state: "審議待ち"
  },
  {
    name: "承認机",
    type: "approval",
    description: "承認印と差戻しが発生する場所。",
    papers: offices.filter((office) => office.status === "vacant").length,
    state: "ハンコ待ち"
  },
  {
    name: "書庫",
    type: "archive",
    description: "台帳と証跡が積み上がる場所。",
    papers: ledgers.length,
    state: "整理中"
  },
  {
    name: "監査塔",
    type: "audit",
    description: "制度の適正性を見張る塔。",
    papers: institutions.length,
    state: "巡回中"
  },
  {
    name: "工房街",
    type: "workshop",
    description: "部署とユニットが実務を進めるエリア。",
    papers: departments.length + units.length,
    state: "稼働中"
  }
];

const heroStats = [
  ["場所", String(locationBlueprints.length)],
  ["担当", String(activities.length)],
  ["部署", String(departments.length)],
  ["ユニット", String(units.length)],
  ["書類束", String(locationBlueprints.reduce((sum, location) => sum + location.papers, 0))]
];

function renderPills() {
  const target = document.getElementById("heroPills");
  target.innerHTML = heroStats
    .map(([label, value]) => `<span class="pill"><strong>${value}</strong>${label}</span>`)
    .join("");
}

function renderQuests() {
  const target = document.getElementById("questList");
  target.innerHTML = quests
    .map((quest, index) => `<article class="quest-card"><span>Quest ${String(index + 1).padStart(2, "0")}</span><p>${quest}</p></article>`)
    .join("");
}

function renderLocations() {
  const target = document.getElementById("locationGrid");
  target.innerHTML = locationBlueprints
    .map(
      (location) => `
        <article class="location-card location-${location.type}">
          <div class="location-scene">
            <div class="building"></div>
            <div class="paper-stack" style="--stack-size:${Math.min(location.papers, 12)}"></div>
          </div>
          <div class="location-copy">
            <div class="card-top">
              <div>
                <div class="card-type">${location.type}</div>
                <h3>${location.name}</h3>
              </div>
              <span class="status-chip status-active">${location.state}</span>
            </div>
            <p>${location.description}</p>
            <p class="muted">書類束: ${location.papers}</p>
          </div>
        </article>
      `
    )
    .join("");
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
            <p><strong>いま:</strong> ${activity.current}</p>
            <p><strong>次:</strong> ${activity.next}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function renderVacancies() {
  const target = document.getElementById("vacancyList");
  target.innerHTML = offices
    .map(
      (office) => `
        <article class="paper-card">
          <div class="stamp-mark">承認待ち</div>
          <h3>${office.office}</h3>
          <p class="muted">席: ${office.seat}</p>
          <p class="muted">holder: ${office.holder}</p>
          <p class="muted">review: ${office.review}</p>
        </article>
      `
    )
    .join("");
}

function renderElectionQueue() {
  const target = document.getElementById("electionList");
  target.innerHTML = electionQueue
    .map(
      (item, index) => `
        <article class="queue-card">
          <div class="paper-stack mini-stack-visual" style="--stack-size:${Math.min(index + 3, 8)}"></div>
          <div>
            <div class="flow-index">Queue ${String(index + 1).padStart(2, "0")}</div>
            <h3>${item.label}</h3>
            <p class="muted">種別: ${item.type} / 期限: ${item.due}</p>
            <p class="muted">次: ${item.next}</p>
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

  target.innerHTML = cards.length ? cards.join("") : `<div class="empty-state">条件に合う部署がありません。</div>`;
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
      (ledger, index) => `
        <article class="ledger-card">
          <div class="paper-stack mini-stack-visual" style="--stack-size:${Math.min(index + 2, 7)}"></div>
          <div>
            <h3>${ledger.name}</h3>
            <p>${ledger.body}</p>
            <div class="tag-row">
              ${ledger.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
            </div>
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
      ([name, risk], index) => `
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
renderQuests();
renderLocations();
renderActivities();
renderElectionQueue();
renderVacancies();
renderDepartments();
renderInstitutions();
renderLedgers();
renderLayers();
renderFlow();
renderUnits();
bindEvents();
