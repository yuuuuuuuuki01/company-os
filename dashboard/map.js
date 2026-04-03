// ============================================================
// map.js — Company OS マップレイアウト定義
// ============================================================

// マップサイズ（タイル数）
export const MAP_COLS = 28;
export const MAP_ROWS = 20;
export const TILE_SIZE = 52; // px

// タイル種別
export const TILE = {
    GRASS: 0,
    GRASS2: 1,  // 色違いの芝（バリエーション）
    ROAD_H: 2,  // 横道
    ROAD_V: 3,  // 縦道
    ROAD_CROSS: 4,
    ROAD_TL: 5,
    ROAD_TR: 6,
    ROAD_BL: 7,
    ROAD_BR: 8,
    STONE: 9,   // 石畳（広場）
    WATER: 10,
    TREE: 11,
    FLOWER: 12,
};

// マップ背景タイル定義（行×列）
// 0=芝, 2=横道, 3=縦道, 4=交差, 9=石畳, 11=木, 12=花
// prettier-ignore
export const MAP_TILES = [
    [11, 1, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 9, 9, 9, 0, 0, 0, 11, 0, 0, 0, 11, 0, 0, 0, 1, 11],
    [0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 9, 9, 9, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0],
    [0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 2, 2, 2],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
    [0, 12, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 11, 0, 0, 0, 0, 0, 11, 0, 0, 3, 0, 0, 12],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 2, 2, 2],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 12, 0, 0, 0, 0, 0, 12, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 12, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [11, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 11],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
];

// 建物定義
// col,row = タイル座標の左上角
// w,h = 占有タイル数
// name, kind, status, actor, current, nextAction, stopPower = コンテンツ
export const BUILDINGS = [
    {
        id: "founder-office",
        col: 0, row: 0,
        w: 4, h: 5,
        label: "👑 Founder Office",
        kind: "統治",
        color: "building-sovereign",
        actor: "Founder Office",
        status: "active",
        current: "制度の初期立ち上げと例外統治の保持。",
        next: "初回議会へ handoff",
        stop: "full sovereign stop",
        tags: ["主権", "最終裁定", "高権限"],
    },
    {
        id: "assembly",
        col: 13, row: 0,
        w: 5, h: 4,
        label: "🏛️ Assembly",
        kind: "議会運営",
        color: "building-assembly",
        actor: "Assembly Secretariat",
        status: "active",
        current: "上申受付、議事進行、記録整備。",
        next: "初回選任議案の受理",
        stop: "procedural stop",
        tags: ["議会", "記録", "手続"],
    },
    {
        id: "audit",
        col: 20, row: 0,
        w: 4, h: 5,
        label: "🔍 Audit Tower",
        kind: "監査法人",
        color: "building-audit",
        actor: "Independent Audit Firm",
        status: "active",
        current: "制度適正性レビューと週間運営監査。",
        next: "Founder Office / Constitutional Affairs",
        stop: "独立監査",
        tags: ["独立性", "運営監査", "客観評価"],
    },
    {
        id: "engineering",
        col: 0, row: 6,
        w: 5, h: 4,
        label: "🔨 Engineering",
        kind: "工房",
        color: "building-workshop",
        actor: "Engineering",
        status: "active",
        current: "技術実装、技術標準、保守性の維持。",
        next: "技術方針レビュー",
        stop: "technical safety stop",
        tags: ["実装", "技術", "安全"],
    },
    {
        id: "pmo",
        col: 13, row: 5,
        w: 4, h: 4,
        label: "📋 PMO",
        kind: "横断進行",
        color: "building-office",
        actor: "Project Management Office",
        status: "active",
        current: "依存解消、進行管理、詰まりの解除。",
        next: "クリティカルパス整理",
        stop: "dependency stop",
        tags: ["PM", "横断", "停止権"],
    },
    {
        id: "security",
        col: 20, row: 6,
        w: 4, h: 4,
        label: "🔒 Security",
        kind: "守衛所",
        color: "building-security",
        actor: "Security, Risk, and Compliance",
        status: "ready",
        current: "鍵貸出と credential request の待機運用。",
        next: "必要時に requester",
        stop: "security stop",
        tags: ["鍵", "秘密", "監視"],
    },
    {
        id: "people-talent",
        col: 0, row: 13,
        w: 4, h: 5,
        label: "👥 People & Talent",
        kind: "人事ギルド",
        color: "building-guild",
        actor: "People and Talent",
        status: "pending",
        current: "初回選任議案の準備。",
        next: "Assembly へ handoff",
        stop: "staffing stop",
        tags: ["採用", "人事"],
    },
    {
        id: "data-knowledge",
        col: 13, row: 12,
        w: 5, h: 4,
        label: "🗄️ Data & Knowledge",
        kind: "書庫番",
        color: "building-archive",
        actor: "Data and Knowledge",
        status: "active",
        current: "承認・役職・活動台帳の整備。",
        next: "全体共有",
        stop: "record integrity stop",
        tags: ["台帳", "記録", "承認履歴"],
    },
    {
        id: "ai-institute",
        col: 20, row: 13,
        w: 5, h: 5,
        label: "🔬 AI Institute",
        kind: "学術機関",
        color: "building-research",
        actor: "AI Academic Institute",
        status: "active",
        current: "AI 一次情報の監視と短い日本語速報の発行。",
        next: "必要時のみ petition",
        stop: "直接命令なし",
        tags: ["直接命令なし", "日本語短報", "一次情報重視"],
    },
];

// 制度レイヤー（HUD用）
export const LAYERS = [
    { rank: "01", name: "憲法" },
    { rank: "02", name: "法律" },
    { rank: "03", name: "定款" },
    { rank: "04", name: "社内ルール" },
    { rank: "05", name: "手順" },
    { rank: "06", name: "部署" },
];

// アクティビティログ（メッセージウィンドウ用）
export const ACTIVITY_LOG = [
    { time: "Now", text: "Founder Office が制度の初期立ち上げを継続中…" },
    { time: "Now", text: "Independent Audit Firm が制度適正性レビューを実行中…" },
    { time: "Now", text: "Data & Knowledge が台帳と UI 整合を更新中…" },
    { time: "Next", text: "People & Talent → Assembly へ選任議案を handoff 予定" },
    { time: "Next", text: "初回議会が開かれ、Assembly Chair を選任予定" },
];
