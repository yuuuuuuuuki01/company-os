// ============================================================
// app.js — Company OS  ゲームUI メインロジック（v4 - Movement & News）
// ============================================================

import {
  MAP_COLS, MAP_ROWS, TILE_SIZE, TILE,
  MAP_TILES, BUILDINGS, LAYERS, ACTIVITY_LOG
} from "./map.js";

// ======================================================
// タスク統計・ステート
// ======================================================
const TASK_STATS = {
  total: 12, done: 5, inProgress: 3, pending: 4,
  items: [
    { label: "初回議会を開く", status: "done" },
    { label: "Assembly Chair を選ぶ", status: "done" },
    { label: "最初の Unit Owner を選ぶ", status: "done" },
    { label: "3常設委員会を着席させる", status: "done" },
    { label: "Constitutional Guardian 選任", status: "done" },
    { label: "PM / Director を選任", status: "active" },
    { label: "自律改善ループを試す", status: "active" },
    { label: "監査定着の確認", status: "active" },
    { label: "全ユニット onboarding", status: "pending" },
    { label: "外縁機関レポート受理", status: "pending" },
    { label: "承認台帳の最終整合", status: "pending" },
    { label: "制度フェーズ完了宣言", status: "pending" },
  ]
};

let liveCommits = [];
let lastHash = ""; // 最新のコミットハッシュを保持

// ======================================================
// ユーティリティ: パスファインディング (BFS)
// ======================================================
function isRoad(c, r) {
  const t = MAP_TILES[r]?.[c];
  return t >= TILE.ROAD_H && t <= TILE.ROAD_BR; // 道路タイルかどうか
}

function findPath(start, end) {
  const queue = [[start]];
  const visited = new Set([`${start.x},${start.y}`]);

  while (queue.length > 0) {
    const path = queue.shift();
    const { x, y } = path[path.length - 1];

    if (x === end.x && y === end.y) return path;

    const nexts = [
      { x: x + 1, y: y }, { x: x - 1, y: y }, { x: x, y: y + 1 }, { x: x, y: y - 1 }
    ];

    for (const n of nexts) {
      if (n.x >= 0 && n.x < MAP_COLS && n.y >= 0 && n.y < MAP_ROWS) {
        if (isRoad(n.x, n.y) && !visited.has(`${n.x},${n.y}`)) {
          visited.add(`${n.x},${n.y}`);
          queue.push([...path, n]);
        }
      }
    }
  }
  return null;
}

// ======================================================
// マップ描画
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
const TILE_CONTENT = { [TILE.TREE]: "🌳", [TILE.FLOWER]: "🌸" };

function renderMap() {
  const canvas = document.getElementById("mapCanvas");
  canvas.innerHTML = "";
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
      if (TILE_CONTENT[tileType]) el.textContent = TILE_CONTENT[tileType];
      frag.appendChild(el);
    }
  }
  canvas.appendChild(frag);
}

// ======================================================
// キャラクタースプライト (640x640 正方形, 横に3人並んでいる)
// ======================================================
const SPRITE_OFFSETS = { active: 0, pending: 1, ready: 2, walking: 1 };

function createCharacter(status, bubbleText, size = 64) {
  const wrap = document.createElement("div");
  wrap.className = `char-wrap char-${status}`;

  if (bubbleText) {
    const bubble = document.createElement("div");
    bubble.className = "char-bubble";
    bubble.textContent = bubbleText;
    wrap.appendChild(bubble);
  }

  const spriteIndex = SPRITE_OFFSETS[status] ?? 0;
  // 640x640 の画像を 3x3 のグリッド（の真ん中の段）と見なしてスケーリング
  // 1キャラの表示サイズを size とすると、画像全体は (size*3) x (size*3) になる
  const bgSize = size * 3;

  const img = document.createElement("div");
  img.className = `char-sprite char-anim-${status}`;
  img.style.width = size + "px";
  img.style.height = size + "px";
  img.style.backgroundImage = "url('./chars.png')";
  img.style.backgroundSize = `${bgSize}px ${bgSize}px`;
  // 真ん中の段（y = -size）を表示。x は index * size
  img.style.backgroundPosition = `-${spriteIndex * size}px -${size * 0.9}px`;
  img.style.imageRendering = "pixelated";
  img.style.backgroundRepeat = "no-repeat";
  wrap.appendChild(img);

  return wrap;
}

// ======================================================
// キャラクター移動演出 (Messenger)
// ======================================================
async function spawnMessenger(startCol, startRow, endCol, endRow) {
  const canvas = document.getElementById("mapCanvas");
  const char = createCharacter("ready", "お届け物です！", 40);
  char.className += " messenger-wrap";
  char.querySelector(".char-sprite").className = "char-sprite char-anim-walking";
  char.style.left = startCol * TILE_SIZE + "px";
  char.style.top = startRow * TILE_SIZE + "px";
  canvas.appendChild(char);

  const path = findPath({ x: startCol, y: startRow }, { x: endCol, y: endRow });
  if (!path) {
    setTimeout(() => char.remove(), 2000);
    return;
  }

  for (const step of path) {
    char.style.transition = "all 0.3s linear";
    char.style.left = step.x * TILE_SIZE + "px";
    char.style.top = step.y * TILE_SIZE + "px";
    await new Promise(r => setTimeout(r, 300));
  }

  // 目的地到着
  char.querySelector(".char-bubble").textContent = "到着！";
  char.querySelector(".char-sprite").className = "char-sprite char-anim-ready";
  setTimeout(() => char.remove(), 2000);
}

// ======================================================
// 建物・HUD 描画
// ======================================================
function buildingStatusLabel(status) { return { active: "稼働", pending: "待機", ready: "準備OK" }[status] || status; }
function getBubbleText(status) { return { active: "カタカタ", pending: "うーん…", ready: "準備OK!" }[status] || ""; }

function renderBuildings() {
  document.querySelectorAll(".building").forEach(e => e.remove());
  const canvas = document.getElementById("mapCanvas");
  BUILDINGS.forEach(b => {
    const el = document.createElement("div");
    el.className = `building ${b.color}`;
    el.style.left = b.col * TILE_SIZE + "px";
    el.style.top = b.row * TILE_SIZE + "px";
    el.style.width = b.w * TILE_SIZE + "px";
    el.style.height = b.h * TILE_SIZE + "px";
    el.dataset.id = b.id;

    const badge = document.createElement("div");
    badge.className = `building-status ${b.status}`;
    badge.textContent = buildingStatusLabel(b.status);
    el.appendChild(badge);

    const roof = document.createElement("div");
    roof.className = "building-roof";
    roof.innerHTML = `<div class="building-label">${b.label}</div><div class="building-kind">${b.kind}</div>`;
    el.appendChild(roof);

    const wall = document.createElement("div");
    wall.className = "building-wall";
    const floor = document.createElement("div");
    floor.className = "building-floor";

    const charCount = b.w >= 4 ? 2 : 1;
    for (let i = 0; i < charCount; i++) {
      floor.appendChild(createCharacter(b.status, i === 0 ? getBubbleText(b.status) : "", b.w >= 4 ? 48 : 40));
    }
    wall.appendChild(floor);
    el.appendChild(wall);
    el.addEventListener("click", () => openDialog(b));
    canvas.appendChild(el);
  });
}

function renderHud() {
  const statsEl = document.getElementById("hudStats");
  const activeCount = BUILDINGS.filter(b => b.status === "active").length;
  const pendingCount = BUILDINGS.filter(b => b.status === "pending").length;
  const readyCount = BUILDINGS.filter(b => b.status === "ready").length;
  statsEl.innerHTML = [["🏢", BUILDINGS.length, "建物"], ["🔴", activeCount, "稼働"], ["🔵", pendingCount, "待機"], ["🟢", readyCount, "準備"]].map(([icon, val, label]) => `<div class="hud-stat"><span>${icon}</span><strong>${val}</strong><span>${label}</span></div>`).join("");
}

function renderTaskProgress() {
  const el = document.getElementById("taskProgress");
  const { total, done, inProgress, items } = TASK_STATS;
  const pct = Math.round((done / total) * 100);
  el.innerHTML = `
    <div class="progress-header"><span class="progress-title">📋 タスク進捗</span><span class="progress-count">${done}/${total} 完了</span></div>
    <div class="progress-bar-wrap"><div class="progress-bar" style="width:${pct}%"></div></div>
    <div class="progress-legend"><span class="legend-done">✅ 完了 ${done}</span><span class="legend-wip">⚡ 進行中 ${inProgress}</span><span class="legend-pending">⏳ 予定 ${TASK_STATS.pending}</span></div>
    <div class="task-list-mini">${items.map(item => `<div class="task-mini-item task-${item.status}"><span class="task-mini-icon">${item.status === "done" ? "✅" : item.status === "active" ? "⚡" : "⏳"}</span><span class="task-mini-label">${item.label}</span></div>`).join("")}</div>
  `;
}

// ======================================================
// リアルタイム Github Sync & News
// ======================================================
async function fetchLiveStatus() {
  try {
    const res = await fetch("./status.json?t=" + new Date().getTime());
    if (!res.ok) return null;
    return await res.json();
  } catch (err) { return null; }
}

async function syncWithLiveStatus() {
  const liveData = await fetchLiveStatus();
  if (!liveData || !liveData.commits || !liveData.commits.length) return;

  const latest = liveData.commits[0];
  if (lastHash && latest.hash !== lastHash) {
    // 【新着あり！】号外ニュースを表示
    showNewsPopup(latest);
    // メッセンジャーを派遣（FounderOfficeから該当部署へ）
    const targetB = BUILDINGS.find(b => b.id === latest.dept) || BUILDINGS[0];
    spawnMessenger(2, 2, targetB.col, targetB.row);
  }
  lastHash = latest.hash;
  liveCommits = liveData.commits;

  document.getElementById("liveText").textContent = "Live Syncing...";

  const deptLatestCommit = {};
  liveCommits.forEach(c => { if (!deptLatestCommit[c.dept]) deptLatestCommit[c.dept] = c; });
  const recentThreshold = new Date().getTime() - 24 * 60 * 60 * 1000;

  BUILDINGS.forEach(b => {
    const c = deptLatestCommit[b.id];
    if (c) {
      b.current = c.message;
      b.status = (new Date(c.date).getTime() > recentThreshold) ? "active" : "ready";
    } else {
      b.status = "pending";
    }
  });

  renderBuildings();
  renderHud();
  renderTaskProgress();
  renderGitLog();
}

function showNewsPopup(commit) {
  const overlay = document.getElementById("newsOverlay");
  const body = document.getElementById("newsBody");
  const footer = document.getElementById("newsFooter");
  body.textContent = commit.message;
  footer.textContent = `@${commit.dept} by ${commit.author}`;
  overlay.className = "news-overlay active";
  setTimeout(() => { overlay.className = "news-overlay"; }, 5000);
}

function renderGitLog() {
  const el = document.getElementById("gitLog");
  el.innerHTML = liveCommits.slice(0, 8).map(c => `
    <div class="log-item">
      <div class="log-header"><span class="log-author">${c.author}</span><span class="log-time">${c.date.slice(5, 16)}</span></div>
      <div class="log-hash">${c.hash} @ ${c.dept}</div>
      <div class="log-msg">${c.message}</div>
    </div>
  `).join("") || `<div class="log-item">ログがありません</div>`;
}

// ======================================================
// 共通初期化
// ======================================================
function openDialog(b) {
  const overlay = document.getElementById("dialogOverlay");
  const header = document.getElementById("dialogHeader");
  const body = document.getElementById("dialogBody");
  const statusCol = b.status === "active" ? "color-active" : b.status === "pending" ? "color-pending" : "color-ready";

  header.innerHTML = `<div style="display:flex;align-items:center;gap:12px;">${createCharacter(b.status, "", 52).outerHTML}<span>${b.label}</span></div>`;
  body.innerHTML = `
    <div class="dialog-row"><span class="dialog-label">種別</span><span class="dialog-value">${b.kind}</span></div>
    <div class="dialog-row"><span class="dialog-label">状態</span><span class="dialog-value ${statusCol}">● ${b.status}</span></div>
    <div class="dialog-row"><span class="dialog-label">いま</span><span class="dialog-value">${b.current}</span></div>
    <div class="dialog-row"><span class="dialog-label">次へ</span><span class="dialog-value">↓ ${b.next}</span></div>
    <div class="dialog-row"><span class="dialog-label">停止権</span><span class="dialog-value">${b.stop}</span></div>
    <div class="dialog-tags">${(b.tags || []).map(t => `<span class="dialog-tag">${t}</span>`).join("")}</div>
  `;
  overlay.classList.add("open");
}

function closeDialog() { document.getElementById("dialogOverlay").classList.remove("open"); }
function updateMessage(text) { const el = document.getElementById("messageText"); el.textContent = text; el.style.animation = "none"; requestAnimationFrame(() => el.style.animation = ""); }

function cycleActivityLog() {
  if (liveCommits.length > 0) {
    const c = liveCommits[Math.floor(Math.random() * liveCommits.length)];
    updateMessage(`[Log] ${c.dept}: ${c.message}`);
  } else {
    updateMessage(`[Now] Company OS が正常に稼働しています。`);
  }
}

function bindEvents() {
  document.getElementById("dialogClose").addEventListener("click", closeDialog);
  document.getElementById("dialogOverlay").addEventListener("click", e => e.target === document.getElementById("dialogOverlay") && closeDialog());
  document.querySelectorAll(".tab-btn").forEach(btn => btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".side-panel, .map-viewport").forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
  }));
}

function init() {
  renderMap(); renderBuildings(); renderHud(); renderTaskProgress(); renderGitLog(); bindEvents();
  setInterval(() => { const n = new Date(); document.getElementById("hudClock").textContent = `${String(n.getHours()).padStart(2, "0")}:${String(n.getMinutes()).padStart(2, "0")}:${String(n.getSeconds()).padStart(2, "0")}`; }, 1000);
  setInterval(cycleActivityLog, 4000);
  syncWithLiveStatus();
  setInterval(syncWithLiveStatus, 15000);
}
init();
