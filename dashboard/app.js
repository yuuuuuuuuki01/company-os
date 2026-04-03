// ============================================================
// app.js — Company OS  ゲームUI メインロジック（v3 - Live Git Activity対応）
// ============================================================

import {
  MAP_COLS, MAP_ROWS, TILE_SIZE, TILE,
  MAP_TILES, BUILDINGS, LAYERS, ACTIVITY_LOG
} from "./map.js";

// ======================================================
// タスク統計（進捗カウンター用）
// ======================================================
const TASK_STATS = {
  total: 12,
  done: 5,
  inProgress: 3,
  pending: 4,
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

// ライブGitステータス保存用
let liveCommits = [];
let lastGeneratedAt = "";

// ======================================================
// タイル・マップ描画
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
// 建物・キャラ 描画
// ======================================================
const CHAR_SPRITE_W = 200;
const CHAR_SPRITE_H = 300;
const SPRITE_OFFSETS = { active: 0, pending: 1, ready: 2 };

function createCharacter(status, bubbleText, size = 48) {
  const wrap = document.createElement("div");
  wrap.className = `char-wrap char-${status}`;

  if (bubbleText) {
    const bubble = document.createElement("div");
    bubble.className = "char-bubble";
    bubble.textContent = bubbleText;
    wrap.appendChild(bubble);
  }

  const spriteIndex = SPRITE_OFFSETS[status] ?? 0;
  const totalW = CHAR_SPRITE_W * 3;
  const scale = size / CHAR_SPRITE_H;

  const img = document.createElement("div");
  img.className = `char-sprite char-anim-${status}`;
  img.style.width = size + "px";
  img.style.height = size + "px";
  img.style.backgroundImage = "url('./chars.png')";
  img.style.backgroundSize = `${totalW * scale * (CHAR_SPRITE_H / CHAR_SPRITE_W)}px ${size}px`;
  img.style.backgroundPosition = `-${spriteIndex * size * (CHAR_SPRITE_W / CHAR_SPRITE_H)}px 0`;
  img.style.imageRendering = "pixelated";
  img.style.backgroundRepeat = "no-repeat";
  wrap.appendChild(img);

  return wrap;
}

function buildingStatusLabel(status) { return { active: "稼働", pending: "待機", ready: "準備OK" }[status] || status; }
function getBubbleText(status) { return { active: "カタカタ", pending: "うーん…", ready: "準備OK!" }[status] || ""; }

function renderBuildings() {
  // 既存の建物を保持していれば削除（再描画用）
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
    const charSize = b.w >= 4 ? 48 : 40;
    for (let i = 0; i < charCount; i++) {
      floor.appendChild(createCharacter(b.status, i === 0 ? getBubbleText(b.status) : "", charSize));
    }
    wall.appendChild(floor);
    el.appendChild(wall);

    el.addEventListener("click", () => openDialog(b));
    canvas.appendChild(el);
  });
}

// ======================================================
// HUD / パネル 描画系
// ======================================================
function renderHud() {
  const statsEl = document.getElementById("hudStats");
  if (!statsEl) return;
  const activeCount = BUILDINGS.filter(b => b.status === "active").length;
  const pendingCount = BUILDINGS.filter(b => b.status === "pending").length;
  const readyCount = BUILDINGS.filter(b => b.status === "ready").length;

  statsEl.innerHTML = [
    ["🏢", BUILDINGS.length, "建物"],
    ["🔴", activeCount, "稼働"],
    ["🔵", pendingCount, "待機"],
    ["🟢", readyCount, "準備"],
  ].map(([icon, val, label]) =>
    `<div class="hud-stat"><span>${icon}</span><strong>${val}</strong><span>${label}</span></div>`
  ).join("");
}

function renderLayers() {
  const el = document.getElementById("layerList");
  if (el) el.innerHTML = LAYERS.map(l => `<div class="layer-item"><span class="layer-rank">${l.rank}</span>${l.name}</div>`).join("");
}

const FLOWS = [
  { icon: "📝", text: "上申を起票" },
  { icon: "🗣️", text: "討論と修正" },
  { icon: "✅", text: "採決と裁定" },
  { icon: "⚙️", text: "執行と監査" },
];
function renderFlows() {
  const el = document.getElementById("flowSteps");
  if (el) el.innerHTML = FLOWS.map((f, i) => `<div class="flow-step">${f.icon} ${f.text}</div>` + (i < FLOWS.length - 1 ? `<div class="flow-step-arrow">↓</div>` : "")).join("");
}

function renderTaskProgress() {
  const el = document.getElementById("taskProgress");
  if (!el) return;
  const { total, done, inProgress, items } = TASK_STATS;
  const pct = Math.round((done / total) * 100);

  el.innerHTML = `
    <div class="progress-header"><span class="progress-title">📋 タスク進捗</span><span class="progress-count">${done}/${total} 完了</span></div>
    <div class="progress-bar-wrap"><div class="progress-bar" style="width:${pct}%"></div></div>
    <div class="progress-legend"><span class="legend-done">✅ 完了 ${done}</span><span class="legend-wip">⚡ 進行中 ${inProgress}</span><span class="legend-pending">⏳ 予定 ${TASK_STATS.pending}</span></div>
    <div class="task-list-mini">
      ${items.map(item => `<div class="task-mini-item task-${item.status}">
        <span class="task-mini-icon">${item.status === "done" ? "✅" : item.status === "active" ? "⚡" : "⏳"}</span>
        <span class="task-mini-label">${item.label}</span>
      </div>`).join("")}
    </div>
  `;
}

function renderActors() {
  const el = document.getElementById("actorList");
  if (!el) return;
  el.innerHTML = BUILDINGS.map(b => `
    <div class="actor-item" data-id="${b.id}">
      <div class="actor-name">${b.label}</div>
      <div class="actor-status-row">
        <div class="status-dot ${b.status}"></div>
        <span class="actor-current">${b.current.length > 22 ? b.current.slice(0, 22) + "…" : b.current}</span>
      </div>
    </div>
  `).join("");

  el.querySelectorAll(".actor-item").forEach(item => {
    item.addEventListener("click", () => {
      const b = BUILDINGS.find(x => x.id === item.dataset.id);
      if (b) openDialog(b);
    });
  });
}

function renderGitLog() {
  const el = document.getElementById("gitLog");
  if (!el) return;
  if (!liveCommits.length) {
    el.innerHTML = `<div class="log-item" style="color:var(--ui-muted)">ログがありません</div>`;
    return;
  }

  el.innerHTML = liveCommits.slice(0, 8).map(c => {
    const d = new Date(c.date);
    const timeStr = `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
    return `
    <div class="log-item">
      <div class="log-header">
        <span class="log-author">${c.author}</span>
        <span class="log-time">${timeStr}</span>
      </div>
      <div class="log-hash">${c.hash} @ ${c.dept}</div>
      <div class="log-msg">${c.message}</div>
    </div>
    `;
  }).join("");
}

// ======================================================
// リアルタイム Github Sync
// ======================================================
async function fetchLiveStatus() {
  try {
    const res = await fetch("./status.json?t=" + new Date().getTime());
    if (!res.ok) throw new Error("status.json not found");
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("No live status found, falling back to mock data.");
    return null;
  }
}

async function syncWithLiveStatus() {
  const liveData = await fetchLiveStatus();
  if (!liveData || !liveData.commits || !liveData.commits.length) {
    document.getElementById("liveText").textContent = "準備完了";
    return;
  }

  liveCommits = liveData.commits;
  lastGeneratedAt = liveData.generated_at;

  document.getElementById("liveText").textContent = "Syncing Git...";

  // コミットログに基づいてBUILDINGSの状態を上書き更新
  // 最新のコミットを行っている部署を active にし、メッセージを反映
  const deptLatestCommit = {};
  liveCommits.forEach(c => {
    if (!deptLatestCommit[c.dept]) deptLatestCommit[c.dept] = c;
  });

  const recentThreshold = new Date().getTime() - 24 * 60 * 60 * 1000; // 24時間以内のコミットはactive

  BUILDINGS.forEach(b => {
    const latest = deptLatestCommit[b.id];
    if (latest) {
      const commitDate = new Date(latest.date).getTime();
      b.current = latest.message;
      if (commitDate > recentThreshold) {
        b.status = "active";
      } else {
        b.status = "ready";
      }
    } else {
      b.status = "pending";
    }
  });

  // 再レンダリング
  renderBuildings();
  renderHud();
  renderActors();
  renderGitLog();
}

// ======================================================
// ダイアログ & メッセージ
// ======================================================
function openDialog(b) {
  const overlay = document.getElementById("dialogOverlay");
  const header = document.getElementById("dialogHeader");
  const body = document.getElementById("dialogBody");
  const statusCol = b.status === "active" ? "color-active" : b.status === "pending" ? "color-pending" : "color-ready";

  const charSprite = createCharacter(b.status, "", 52);
  header.innerHTML = "";
  const headerInner = document.createElement("div");
  headerInner.style.display = "flex"; headerInner.style.alignItems = "center"; headerInner.style.gap = "12px";
  headerInner.appendChild(charSprite);
  const headerText = document.createElement("span");
  headerText.textContent = b.label;
  headerInner.appendChild(headerText);
  header.appendChild(headerInner);

  body.innerHTML = `
    <div class="dialog-row"><span class="dialog-label">種別</span><span class="dialog-value">${b.kind}</span></div>
    <div class="dialog-row"><span class="dialog-label">状態</span><span class="dialog-value ${statusCol}">● ${b.status}</span></div>
    <div class="dialog-row"><span class="dialog-label">いま</span><span class="dialog-value">${b.current}</span></div>
    <div class="dialog-row"><span class="dialog-label">次へ</span><span class="dialog-value">↓ ${b.next}</span></div>
    <div class="dialog-row"><span class="dialog-label">停止権</span><span class="dialog-value">${b.stop}</span></div>
    <div class="dialog-tags">${(b.tags || []).map(t => `<span class="dialog-tag">${t}</span>`).join("")}</div>
  `;
  overlay.classList.add("open");
  updateMessage(`「${b.label}」を確認中… ${b.current}`);
}

function closeDialog() { document.getElementById("dialogOverlay").classList.remove("open"); }

let logIndex = 0;
function updateMessage(text) {
  const el = document.getElementById("messageText");
  if (!el) return;
  el.textContent = text;
  el.style.animation = "none";
  requestAnimationFrame(() => { el.style.animation = ""; });
}

function cycleActivityLog() {
  if (liveCommits.length > 0) {
    // ライブログがある場合はそれを流す
    const c = liveCommits[logIndex % liveCommits.length];
    const deptName = BUILDINGS.find(b => b.id === c.dept)?.label || c.dept;
    updateMessage(`[Log] ${deptName}: ${c.message}`);
  } else {
    // なければモックデータ
    const log = ACTIVITY_LOG[logIndex % ACTIVITY_LOG.length];
    updateMessage(`[${log.time}] ${log.text}`);
  }
  logIndex++;
}

// ======================================================
// 共通バインド・初期化
// ======================================================
function updateClock() {
  const now = new Date();
  const el = document.getElementById("hudClock");
  if (el) el.textContent = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
}

function bindEvents() {
  document.getElementById("dialogClose").addEventListener("click", closeDialog);
  document.getElementById("dialogOverlay").addEventListener("click", e => { if (e.target === document.getElementById("dialogOverlay")) closeDialog(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeDialog(); });

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".side-panel, .map-viewport").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      const tc = document.getElementById("tab-" + btn.dataset.tab);
      if (tc) tc.classList.add("active");
    });
  });
}

function init() {
  renderMap();
  renderBuildings();
  renderHud();
  renderLayers();
  renderFlows();
  renderActors();
  renderTaskProgress();
  renderGitLog();
  bindEvents();

  updateClock();
  setInterval(updateClock, 1000);

  cycleActivityLog();
  setInterval(cycleActivityLog, 4000);

  // 初回同期と定期ポーリング(30秒ごと)
  syncWithLiveStatus();
  setInterval(syncWithLiveStatus, 30000);
}

init();
