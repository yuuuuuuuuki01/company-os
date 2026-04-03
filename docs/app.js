const layers = [
  { rank: "01", name: "憲法", path: "constitution/", summary: "主権、権利義務、規範階層、創業者拒否権、公開原則を定義。" },
  { rank: "02", name: "法律", path: "laws/", summary: "上申、異議、採用、公開、監査、記録、研究連携を具体化。" },
  { rank: "03", name: "定款", path: "articles/", summary: "議会、委員会、役職、部署、外縁機関の基本構造を規定。" },
  { rank: "04", name: "社内ルール", path: "internal-rules/", summary: "採用、承認記録、鍵管理、報告標準、自律化改善を運用化。" },
  { rank: "05", name: "作業手順", path: "sops/", summary: "上申作成、監査、研究速報、鍵請求、適正性レビューの実務手順。" },
  { rank: "06", name: "部署運営", path: "departments/", summary: "実行責任、停止権、横断支援、記録管理の委譲先。" }
];

const activities = [
  {
    actor: "Founder Office",
    layer: "governance",
    status: "active",
    current: "制度の適正性を維持しつつ、初回選任の順番と委譲方針を整えている。",
    next: "初回選任議案を議会へ上申"
  },
  {
    actor: "Independent Audit Firm",
    layer: "audit",
    status: "active",
    current: "制度適正性レビューと週次運営監査を実施済み。未選任リスクを監視中。",
    next: "選任後の統制有効性を再監査"
  },
  {
    actor: "AI Academic Institute",
    layer: "institution",
    status: "active",
    current: "AI の最新知見を収集し、組織運営と事業活用に関わる論点を短く整理している。",
    next: "必要時のみ petition を提出"
  },
  {
    actor: "People and Talent",
    layer: "department",
    status: "pending",
    current: "初回選任対象の整理と start-packet 前提の人材配置案を準備中。",
    next: "Assembly Secretariat に選任キューを渡す"
  },
  {
    actor: "Data and Knowledge",
    layer: "department",
    status: "active",
    current: "台帳、役職一覧、ダッシュボード表示面の整合を管理している。",
    next: "全役職選任後に registry を更新"
  },
  {
    actor: "Security, Risk, and Compliance",
    layer: "department",
    status: "ready",
    current: "鍵貸出、資格情報請求、公開前統制の受け口を維持している。",
    next: "必要時のみ request に応答"
  },
  {
    actor: "Organizational Development and Learning",
    layer: "department",
    status: "active",
    current: "自律化バックログを回しながら、より自律的に動ける制度改善案を蓄積している。",
    next: "有効だった改善だけを正式上申"
  }
];

const offices = [
  { office: "Assembly Chair", seat: "none", holder: "pending", review: "inaugural session", status: "vacant" },
  { office: "Floor Clerk", seat: "none", holder: "pending", review: "inaugural session", status: "vacant" },
  { office: "Constitutional Guardian", seat: "none", holder: "pending", review: "inaugural session", status: "vacant" },
  { office: "Project Manager", seat: "horizontal", holder: "pending", review: "inaugural session", status: "vacant" },
  { office: "Director", seat: "horizontal", holder: "pending", review: "inaugural session", status: "vacant" }
];

const electionQueue = [
  { label: "Assembly Chair と Floor Clerk を選任", type: "office", due: "最優先", next: "nominate and second" },
  { label: "Constitutional Guardian / PM / Director を選任", type: "horizontal", due: "初回会期", next: "nominate and second" },
  { label: "3 常設委員会を着席", type: "committee", due: "初回会期", next: "各 3 名を seat" },
  { label: "全 Unit Owner を選任", type: "unit", due: "通常議事前", next: "ユニット別 slate を作成" }
];

const flows = [
  { index: "01", title: "上申を起票", body: "正式議案は sponsor と seconder を満たしてから議場に載せる。" },
  { index: "02", title: "討論と修正動議", body: "ロバート議事法に沿って文書で討論し、必要なら修正動議を受ける。" },
  { index: "03", title: "採決して裁定記録化", body: "可決後は decision に落とし、執行条件と再審条件を明記する。" },
  { index: "04", title: "部署と外縁機関が実行支援", body: "部署は執行、学術機関は知見提供、監査法人は独立監査を担う。" },
  { index: "05", title: "監査して改善を戻す", body: "観測、改善、監査、採用または撤回を繰り返して制度を磨く。" }
];

const tasks = [
  "初回選任議案を正式起票する",
  "議長席と書記席を埋める",
  "Constitutional Guardian / PM / Director を着席させる",
  "3 常設委員会を発足させる",
  "全 Unit Owner を選任して議席を有効化する",
  "自律化改善ループを 1 本正式運用する"
];

const departments = [
  {
    name: "Founder Office",
    kind: "主権",
    mandate: "最終主権、創業者拒否権、外部公開前の最終判断を担う。",
    stop: "full sovereign stop",
    tags: ["主権", "最終判断", "拒否権"],
    list: ["憲法解釈の最終確認", "再上程条件の指定", "高リスク release の最終判断"]
  },
  {
    name: "Assembly Secretariat",
    kind: "議会運営",
    mandate: "上申受付、議事進行、採決記録、議席管理を担う。",
    stop: "procedural stop",
    tags: ["議会", "記録", "議事"],
    list: ["正式議案の受理", "議事テンプレート運用", "定足数と採決結果の記録"]
  },
  {
    name: "Constitutional Affairs",
    kind: "規範適合",
    mandate: "上位規範との整合性、解釈争い、制度改定案の整流を担う。",
    stop: "constitutional stop",
    tags: ["憲法", "法律", "適法性"],
    list: ["下位規範の差戻し", "憲法解釈の整理", "制度改定 petition の整流"]
  },
  {
    name: "Portfolio Strategy",
    kind: "戦略",
    mandate: "全ユニット横断の優先順位と資源配分を設計する。",
    stop: "portfolio stop",
    tags: ["戦略", "優先順位", "配分"],
    list: ["事業横断の優先整理", "重点投資先の提案", "過剰分散の停止"]
  },
  {
    name: "Project Management Office",
    kind: "横断PM",
    mandate: "依存関係、進行、手戻り防止、handoff の整流を担う。",
    stop: "dependency stop",
    tags: ["PM", "横断", "依存管理"],
    list: ["クリティカルパス整理", "依存衝突時の停止", "handoff 品質の担保"]
  },
  {
    name: "Directorate",
    kind: "横断Director",
    mandate: "品質、表現、構想の一貫性を保つ横断役。",
    stop: "quality stop",
    tags: ["Director", "品質", "整合"],
    list: ["表現品質レビュー", "成果物全体の整合確認", "品質崩壊時の停止"]
  },
  {
    name: "Product and Service Design",
    kind: "設計",
    mandate: "プロダクト体験、仕様の構造化、サービス設計を担う。",
    stop: "design integrity stop",
    tags: ["設計", "UX", "仕様"],
    list: ["UI/UX 方針", "情報設計", "要件の視覚化"]
  },
  {
    name: "Engineering",
    kind: "実装",
    mandate: "技術実装、検証、内部道具の改善を担う。",
    stop: "technical safety stop",
    tags: ["実装", "技術", "安全"],
    list: ["コード変更", "技術的レビュー", "破壊的変更前の技術停止"]
  },
  {
    name: "Quality Assurance",
    kind: "検証",
    mandate: "完了条件、品質基準、公開前チェックを担う。",
    stop: "release quality stop",
    tags: ["QA", "品質", "公開前"],
    list: ["DoD 確認", "テスト観点整理", "release ブロック"]
  },
  {
    name: "Release Operations",
    kind: "公開運用",
    mandate: "deploy / publish / rollback の実行と記録を担う。",
    stop: "release stop",
    tags: ["公開", "運用", "rollback"],
    list: ["公開手順の実行", "rollback 判断", "本番反映記録"]
  },
  {
    name: "Security, Risk, and Compliance",
    kind: "統制",
    mandate: "鍵、資格情報、リスク、コンプライアンスを扱う。",
    stop: "security stop",
    tags: ["鍵", "リスク", "統制"],
    list: ["鍵貸出記録", "credential request 管理", "高リスク作業の統制"]
  },
  {
    name: "People and Talent",
    kind: "人事",
    mandate: "採用、配置、昇格、役職選任支援を担う。",
    stop: "staffing stop",
    tags: ["採用", "選任", "評価"],
    list: ["start-packet 配布", "選任候補整理", "引継ぎ品質の評価"]
  },
  {
    name: "Finance and Treasury",
    kind: "財務",
    mandate: "予算、支出、資源の財務面を管理する。",
    stop: "spending stop",
    tags: ["予算", "財務", "支出"],
    list: ["支出許可", "資源配分の記録", "予算超過の停止"]
  },
  {
    name: "Legal and Policy",
    kind: "法務政策",
    mandate: "外部法務論点と社内政策整備を扱う。",
    stop: "policy stop",
    tags: ["法務", "政策", "外部規制"],
    list: ["外部法令リスク整理", "社内政策の整備", "契約論点の確認"]
  },
  {
    name: "Organizational Development and Learning",
    kind: "組織開発",
    mandate: "学術知見と運営観測をもとに制度改善を設計する。",
    stop: "redesign hold",
    tags: ["組織開発", "学習", "自律化"],
    list: ["自律化バックログ運営", "制度改善案の起草", "学術知見の反映"]
  },
  {
    name: "Research and Intelligence",
    kind: "調査",
    mandate: "事業・制度・技術の調査と証拠整理を担う。",
    stop: "evidence hold",
    tags: ["調査", "証拠", "知見"],
    list: ["一次情報の収集", "比較調査", "証拠不十分時の hold"]
  },
  {
    name: "Communications and Brand",
    kind: "広報",
    mandate: "公開表現、対外説明、ブランド一貫性を担う。",
    stop: "publication stop",
    tags: ["広報", "ブランド", "対外表現"],
    list: ["公開文章の調整", "表現品質レビュー", "メッセージ整合"]
  },
  {
    name: "Business Development and Partnerships",
    kind: "事業開発",
    mandate: "提携、対外案件、成長機会の設計を担う。",
    stop: "commitment hold",
    tags: ["提携", "事業開発", "対外"],
    list: ["提携論点整理", "成長機会の評価", "対外コミット前の調整"]
  },
  {
    name: "Customer Success and Support",
    kind: "運用支援",
    mandate: "利用者支援、要望整理、運用品質の安定化を担う。",
    stop: "service-risk stop",
    tags: ["サポート", "運用", "顧客接点"],
    list: ["問い合わせ整理", "運用課題の吸い上げ", "サービスリスク停止"]
  },
  {
    name: "Data and Knowledge",
    kind: "記録管理",
    mandate: "台帳、知識、証跡、要約知見の保存と公開整合を担う。",
    stop: "record integrity stop",
    tags: ["台帳", "記録", "可視化"],
    list: ["current activity 管理", "officeholder registry 更新", "reporting standard の実装"]
  },
  {
    name: "Internal Tools and Enablement",
    kind: "内部基盤",
    mandate: "内部道具、自動化、運用補助基盤を整備する。",
    stop: "tooling safety stop",
    tags: ["内部基盤", "自動化", "enablement"],
    list: ["内部 UI 整備", "補助スクリプト運用", "危険な rollout の停止"]
  }
];

const institutions = [
  {
    title: "AI Academic Institute",
    type: "学術機関",
    body: "AI の最新知見を収集し、短い報告と petition を通じて組織に材料を供給する。直接統治はしない。",
    tags: ["最新AI", "一次情報", "直接アプローチ禁止"]
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
    body: "standing approval と個別承認の履歴を保存する。commit / push の既存承認もここで追える。",
    tags: ["承認", "trace", "公開"]
  },
  {
    name: "Key Loan Ledger",
    body: "鍵の貸出、返却、失効を Key ID 単位で追跡する。",
    tags: ["鍵", "貸出", "restricted"]
  },
  {
    name: "Credential Request Ledger",
    body: "資格情報が必要になった理由と request 履歴を残す。",
    tags: ["credential", "need-only", "restricted"]
  },
  {
    name: "Officeholder Registry",
    body: "いま誰が lawful に役職を持っているかを示す。",
    tags: ["役職", "選任", "公開"]
  },
  {
    name: "Current Activity Board",
    body: "いま誰が何をしていて、次にどこへ handoff するかを可視化する。",
    tags: ["現況", "handoff", "公開"]
  },
  {
    name: "Bootstrap Election Board",
    body: "空席、選任待ち、委員会着席、Unit Owner 選出の順番を一覧化する。",
    tags: ["選任", "bootstrap", "公開"]
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
  ["規範レイヤー", String(layers.length)],
  ["部署", String(departments.length)],
  ["ユニット", String(units.length)],
  ["現況アクター", String(activities.length)],
  ["台帳", String(ledgers.length)]
];

const miniStack = ["制度適正性", "初回選任", "監査継続", "自律化改善"];

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

function renderVacancies() {
  const target = document.getElementById("vacancyList");
  const vacancies = offices.filter((office) => office.status === "vacant");
  target.innerHTML = vacancies
    .map(
      (office) => `
        <article class="ledger-card">
          <div class="card-top">
            <div>
              <div class="card-type">${office.seat}</div>
              <h3>${office.office}</h3>
            </div>
            <span class="status-chip status-pending">${office.status}</span>
          </div>
          <p class="muted">holder: ${office.holder}</p>
          <p class="muted">review point: ${office.review}</p>
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
        <article class="task-card">
          <div class="flow-index">Queue ${String(index + 1).padStart(2, "0")}</div>
          <h3>${item.label}</h3>
          <p class="muted">type: ${item.type} / due: ${item.due}</p>
          <p class="muted">next: ${item.next}</p>
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
    : `<div class="empty-state">条件に合う部署がありません。</div>`;
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
renderVacancies();
renderElectionQueue();
renderLayers();
renderFlow();
renderTasks();
renderDepartments();
renderInstitutions();
renderLedgers();
renderUnits();
bindEvents();
