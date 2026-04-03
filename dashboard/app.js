// ============================================================
// app.js — Company OS  ゲームUI メインロジック
// ============================================================

import {
  MAP_COLS, MAP_ROWS, TILE_SIZE, TILE,
  MAP_TILES, BUILDINGS, LAYERS, ACTIVITY_LOG
} from "./map.js";

// ======================================================
// タイルクラスマップ
// ======================================================
const TILE_CLASS = {
  [TILE.GRASS]: "tile-grass",
  [TILE.GRASS2]: "tile-grass2",
  [TILE.ROAD_H]: "tile-road-h",
  [TILE.ROAD_V]: "tile-road-v",
  [TILE.ROAD_CROSS]: "tile-road-cross",
  [TILE.ROAD_TL]: "tile-road-tl",
  [TILE.ROAD_TR]: "tile-road-tr",
  [TILE.ROAD_BL]: "tile-road-bl",
  [TILE.ROAD_BR]: "tile-road-br",
  [TILE.STONE]: "tile-stone",
  [TILE.WATER]: "tile-stone",
  [TILE.TREE]: "tile-tree",
  [TILE.FLOWER]: "tile-flower",
};

const TILE_CONTENT = {
  [TILE.TREE]: "🌳",
  [TILE.FLOWER]: "🌸",
};

// ======================================================
// マップ描画
// ======================================================
function renderMap() {
  const canvas = document.getElementById("mapCanvas");
  canvas.style.width = MAP_COLS * TILE_SIZE + "px";
  canvas.style.height = MAP_ROWS * TILE_SIZE + "px";

  const frag = document.createDocumentFragment();

  for (let r = 0; r < MAP_ROWS; r++) {
    for (let c = 0; c < MAP_COLS; c++) {
      const tileType = MAP_TILES[r]?.[c] ?? TILE.GRASS;
      const el = document.createElement("div");
      el.className = "tile " + (TILE_CLASS[tileType] || "tile-grass");
      el.style.left = c * TILE_SIZE + "px";
      el.style.top = r * TILE_SIZE + "px";
      if (TILE_CONTENT[tileType]) {
        el.textContent = TILE_CONTENT[tileType];
      }
      frag.appendChild(el);
    }
  }

  canvas.appendChild(frag);
}

// ======================================================
// 建物 + キャラクター描画
// ======================================================
function buildingStatusLabel(status) {
  const map = { active: "稼働", pending: "待機", ready: "準備OK" };
  return map[status] || status;
}

function createCharacter(status, bubbleText) {
  const wrap = document.createElement("div");
  wrap.className = `char-wrap char-${status}`;

  const bubble = document.createElement("div");
  bubble.className = "char-bubble";
  bubble.textContent = bubbleText;
  wrap.appendChild(bubble);

  const body = document.createElement("div");
  body.className = "char-body";
  wrap.appendChild(body);

  const desk = document.createElement("div");
  desk.className = "char-desk";
  wrap.appendChild(desk);

  return wrap;
}

function getBubbleText(status) {
  if (status === "active") return "カタカタ...";
  if (status === "pending") return "...うーん";
  return "待機中";
}

function renderBuildings() {
  const canvas = document.getElementById("mapCanvas");

  BUILDINGS.forEach(b => {
    const el = document.createElement("div");
    el.className = `building ${b.color}`;
    el.style.left = b.col * TILE_SIZE + "px";
    el.style.top = b.row * TILE_SIZE + "px";
    el.style.width = b.w * TILE_SIZE + "px";
    el.style.height = b.h * TILE_SIZE + "px";
    el.dataset.id = b.id;

    // ステータスバッジ
    const badge = document.createElement("div");
    badge.className = `building-status ${b.status}`;
    badge.textContent = buildingStatusLabel(b.status);
    el.appendChild(badge);

    // 屋根エリア
    const roof = document.createElement("div");
    roof.className = "building-roof";

    const label = document.createElement("div");
    label.className = "building-label";
    label.textContent = b.label;
    roof.appendChild(label);

    const kind = document.createElement("div");
    kind.className = "building-kind";
    kind.textContent = b.kind;
    roof.appendChild(kind);

    el.appendChild(roof);

    // フロア（キャラ配置）
    const floor = document.createElement("div");
    floor.className = "building-floor";

    const charCount = b.w >= 4 ? 2 : 1;
    for (let i = 0; i < charCount; i++) {
      floor.appendChild(createCharacter(b.status, i === 0 ? getBubbleText(b.status) : ""));
    }

    el.appendChild(floor);

    // クリックイベント
    el.addEventListener("click", () => openDialog(b));

    canvas.appendChild(el);
  });
}

// ======================================================
// ダイアログ
// ======================================================
function openDialog(b) {
  const overlay = document.getElementById("dialogOverlay");
  const header = document.getElementById("dialogHeader");
  const body = document.getElementById("dialogBody");
  const statusCol = b.status === "active" ? "color-active"
    : b.status === "pending" ? "color-pending" : "color-ready";

  header.textContent = b.label;

  body.innerHTML = `
    <div class="dialog-row">
      <span class="dialog-label">【種別】</span>
      <span class="dialog-value">${b.kind}</span>
    </div>
    <div class="dialog-row">
      <span class="dialog-label">【状態】</span>
      <span class="dialog-value ${statusCol}">${b.status}</span>
    </div>
    <div class="dialog-row">
      <span class="dialog-label">【いま】</span>
      <span class="dialog-value">${b.current}</span>
    </div>
    <div class="dialog-row">
      <span class="dialog-label">【次へ】</span>
      <span class="dialog-value">${b.next}</span>
    </div>
    <div class="dialog-row">
      <span class="dialog-label">【停止権】</span>
      <span class="dialog-value">${b.stop}</span>
    </div>
    <div class="dialog-tags">
      ${(b.tags || []).map(t => `<span class="dialog-tag">${t}</span>`).join("")}
    </div>
  `;

  overlay.classList.add("open");
  updateMessage(`「${b.label}」を確認中… ${b.current}`);
}

function closeDialog() {
  document.getElementById("dialogOverlay").classList.remove("open");
}

// ======================================================
// HUD
// ======================================================
function renderHud() {
  const statsEl = document.getElementById("hudStats");
  const activeCount = BUILDINGS.filter(b => b.status === "active").length;
  const pendingCount = BUILDINGS.filter(b => b.status === "pending").length;
  const readyCount = BUILDINGS.filter(b => b.status === "ready").length;

  const stats = [
    ["🏢 建物", BUILDINGS.length],
    ["🔴 稼働", activeCount],
    ["🔵 待機", pendingCount],
    ["🟢 準備OK", readyCount],
  ];

  statsEl.innerHTML = stats.map(([label, val]) =>
    `<div class="hud-stat"><strong>${val}</strong> ${label}</div>`
  ).join("");
}

// ======================================================
// サイドパネル：制度レイヤー
// ======================================================
function renderLayers() {
  const el = document.getElementById("layerList");
  el.innerHTML = LAYERS.map(l =>
    `<div class="layer-item"><span class="layer-rank">${l.rank}</span>${l.name}</div>`
  ).join("");
}

// ======================================================
// サイドパネル：承認フロー
// ======================================================
const FLOWS = [
  "📝 上申を起票",
  "🗣️ 討論と修正",
  "✅ 採決と裁定",
  "⚙️ 執行と監査",
];

function renderFlows() {
  const el = document.getElementById("flowSteps");
  el.innerHTML = FLOWS.map((f, i) =>
    `<div class="flow-step">${f}</div>` +
    (i < FLOWS.length - 1 ? `<div class="flow-step-arrow">↓</div>` : "")
  ).join("");
}

// ======================================================
// サイドパネル：アクター一覧（右）
// ======================================================
function renderActors() {
  const el = document.getElementById("actorList");
  el.innerHTML = BUILDINGS.map(b => `
    <div class="actor-item" data-id="${b.id}">
      <div class="actor-name">${b.label}</div>
      <div class="actor-status-row">
        <div class="status-dot ${b.status}"></div>
        <span style="font-size:9px;color:var(--ui-muted)">${b.current.slice(0, 22)}…</span>
      </div>
    </div>
  `).join("");

  // クリックで建物フォーカス＋ダイアログ
  el.querySelectorAll(".actor-item").forEach(item => {
    item.addEventListener("click", () => {
      const b = BUILDINGS.find(x => x.id === item.dataset.id);
      if (b) openDialog(b);
    });
  });
}

// ======================================================
// メッセージウィンドウ
// ======================================================
let logIndex = 0;

function updateMessage(text) {
  const el = document.getElementById("messageText");
  el.textContent = text;
  el.style.animation = "none";
  requestAnimationFrame(() => { el.style.animation = ""; });
}

function cycleActivityLog() {
  const log = ACTIVITY_LOG[logIndex % ACTIVITY_LOG.length];
  updateMessage(`[${log.time}] ${log.text}`);
  logIndex++;
}

// ======================================================
// 時計
// ======================================================
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  document.getElementById("hudClock").textContent = `${h}:${m}:${s}`;
}

// ======================================================
// アウトサイドクリックでダイアログを閉じる
// ======================================================
function bindEvents() {
  document.getElementById("dialogClose").addEventListener("click", closeDialog);
  document.getElementById("dialogOverlay").addEventListener("click", e => {
    if (e.target === document.getElementById("dialogOverlay")) closeDialog();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeDialog();
  });
}

// ======================================================
// 初期化
// ======================================================
function init() {
  renderMap();
  renderBuildings();
  renderHud();
  renderLayers();
  renderFlows();
  renderActors();
  bindEvents();
  updateClock();
  setInterval(updateClock, 1000);

  // 最初のメッセージ
  cycleActivityLog();
  // 4秒ごとにメッセージを切り替え
  setInterval(cycleActivityLog, 4000);
}

init();
