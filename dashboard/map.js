// ============================================================
// map.js — Company OS コンパクト・ルームレイアウト定義 (v2)
// ============================================================

// マップサイズ（タイル数）— コンパクトに収まる 16x12
export const MAP_COLS = 16;
export const MAP_ROWS = 12;
export const TILE_SIZE = 56; // やや大きく表示

// タイル種別 (屋内風)
export const TILE = {
    FLOOR: 0,    // 部屋の内側 (ベージュのカーペット)
    WALL: 2,     // 壁 (横)
    WALL_V: 3,   // 壁 (縦)
    HALLWAY: 9,  // 通路 (木目フローリング)
    VOID: 10,    // 画面端
};

// マップ背景タイル定義 (16x12)
// 0=部屋床, 9=通路, 2=横壁, 3=縦壁, 10=外
// 3x3の部屋配置を想定したグリッド
// prettier-ignore
export const MAP_TILES = [
    [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    [10, 0, 0, 0, 9, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 10],
    [10, 0, 0, 0, 9, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 10],
    [10, 0, 0, 0, 9, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
    [10, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 10],
    [10, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
    [10, 0, 0, 0, 9, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 10],
    [10, 0, 0, 0, 9, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 10],
    [10, 0, 0, 0, 9, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 10],
    [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
];

// 建物（部屋）定義
// w,h = 占有タイル数
export const BUILDINGS = [
    {
        id: "founder-office",
        col: 1, row: 1, w: 3, h: 3,
        label: "👑 Founder Office", kind: "主権", color: "room-purple",
        status: "active", current: "フロア全体の統治と裁定。", next: "全体指示", stop: "sovereign stop"
    },
    {
        id: "assembly",
        col: 5, row: 1, w: 3, h: 3,
        label: "🏛️ Assembly", kind: "議会", color: "room-blue",
        status: "active", current: "議事進行とログの整理。", next: "議案受理", stop: "procedural stop"
    },
    {
        id: "audit",
        col: 9, row: 1, w: 6, h: 3,
        label: "🔍 Audit Tower", kind: "監査", color: "room-green",
        status: "active", current: "独立した立場からの運営チェック。", next: "定例監査", stop: "audit stop"
    },
    {
        id: "engineering",
        col: 1, row: 5, w: 3, h: 2,
        label: "🔨 Engineering", kind: "工房", color: "room-orange",
        status: "active", current: "システムの実装と改善。", next: "機能追加", stop: "tech stop"
    },
    {
        id: "pmo",
        col: 11, row: 5, w: 4, h: 2,
        label: "📋 PMO", kind: "進行", color: "room-cyan",
        status: "active", current: "ボトルネックの解消。", next: "マイルストーン確認", stop: "pm stop"
    },
    {
        id: "security",
        col: 5, row: 5, w: 5, h: 2,
        label: "🔒 Security & Plaza", kind: "共用", color: "room-red",
        status: "ready", current: "守衛所兼。休憩スペース。", next: "警戒待機", stop: "security stop"
    },
    {
        id: "people-talent",
        col: 1, row: 8, w: 3, h: 3,
        label: "👥 People", kind: "人事", color: "room-yellow",
        status: "pending", current: "メンバーの選任とケア。", next: "リスト更新", stop: "staffing stop"
    },
    {
        id: "data-knowledge",
        col: 5, row: 8, w: 3, h: 3,
        label: "🗄️ Knowledge", kind: "書庫", color: "room-indigo",
        status: "active", current: "台帳とナレッジの管理。", next: "インデックス作成", stop: "data stop"
    },
    {
        id: "ai-institute",
        col: 9, row: 8, w: 6, h: 3,
        label: "🔬 AI Lab", kind: "研究", color: "room-teal",
        status: "active", current: "最新AI技術の調査と活用。", next: "研究報告", stop: "none"
    },
];

export const LAYERS = [
    { rank: "01", name: "Constitution" }, { rank: "02", name: "Laws" },
    { rank: "03", name: "Rules" }, { rank: "04", name: "Processes" }
];

export const ACTIVITY_LOG = [
    { time: "Now", text: "Founder Office でフロア方針を確認中…" },
    { time: "Now", text: "Engineering が新しいモジュールを実装しました" },
];
