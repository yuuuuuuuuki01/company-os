// ============================================================
// app.js — Company OS  ゲームUI メインロジック（v5 - Desk Sync）
// ============================================================

import {
  MAP_COLS, MAP_ROWS, TILE_SIZE, TILE,
  MAP_TILES, BUILDINGS, LAYERS, ACTIVITY_LOG
} from "./map.js";

// ======================================================
// 最新の活動データ (status.jsonから取得)
let TASK_STATS = { total: 0, done: 0, active: 0, pending: 0, items: [] };
let LIVE_ACTIVITIES = {};
let liveCommits = [];
let lastHash = "";

// ======================================================
// ユーティリティ: パスファインディング (BFS)
// ======================================================
function isWalkable(c, r) {
  const t = MAP_TILES[r]?.[c];
  return t === TILE.HALLWAY || t === TILE.FLOOR;
}

function findPath(start, end) {
  const queue = [[start]];
  const visited = new Set([`${start.x},${start.y}`]);

  while (queue.length > 0) {
    const path = queue.shift();
    const { x, y } = path[path.length - 1];

    if (x === end.x && y === end.y) return path;

    const nexts = [{ x: x + 1, y: y }, { x: x - 1, y: y }, { x: x, y: y + 1 }, { x: x, y: y - 1 }];

    for (const n of nexts) {
      if (n.x >= 0 && n.x < MAP_COLS && n.y >= 0 && n.y < MAP_ROWS) {
        if (isWalkable(n.x, n.y) && !visited.has(`${n.x},${n.y}`)) {
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
  [TILE.FLOOR]: "tile-grass",
  [TILE.HALLWAY]: "tile-stone",
  [TILE.VOID]: "tile-void",
};

function renderMap() {
  const canvas = document.getElementById("mapCanvas");
  canvas.innerHTML = "";
  canvas.style.width = MAP_COLS * TILE_SIZE + "px";
  canvas.style.height = MAP_ROWS * TILE_SIZE + "px";
  const frag = document.createDocumentFragment();

  for (let r = 0; r < MAP_ROWS; r++) {
    for (let c = 0; c < MAP_COLS; c++) {
      const tileType = MAP_TILES[r]?.[c] ?? TILE.VOID;
      const el = document.createElement("div");
      el.className = "tile " + (TILE_CLASS[tileType] || "tile-grass");
      el.style.left = c * TILE_SIZE + "px";
      el.style.top = r * TILE_SIZE + "px";
      frag.appendChild(el);
    }
  }
  canvas.appendChild(frag);
}

// ======================================================
// キャラクタースプライト (Fox:0, Cat:1, Frog:2)
const CHAR_TYPES = [0, 1, 2];
const SPRITE_OFFSETS = { active: 0, pending: 1, ready: 2, walking: 1 };

function createCharacter(status, bubbleText, size = 64, forcedType = null) {
  const wrap = document.createElement("div");
  wrap.className = `char-wrap char-${status}`;

  if (bubbleText) {
    const bubble = document.createElement("div");
    bubble.className = "char-bubble";
    bubble.textContent = bubbleText;
    wrap.appendChild(bubble);
  }

  const typeIndex = (forcedType !== null) ? forcedType : CHAR_TYPES[Math.floor(Math.random() * CHAR_TYPES.length)];
  const statusOffset = SPRITE_OFFSETS[status] ?? 0;
  const bgSize = size * 3;

  const img = document.createElement("div");
  img.className = `char-sprite char-anim-${status}`;
  img.style.width = size + "px";
  img.style.height = size + "px";
  img.style.backgroundImage = "url('./chars_v3.png')";
  img.style.backgroundSize = `${bgSize}px ${bgSize}px`;
  img.style.backgroundPosition = `-${statusOffset * size}px -${typeIndex * size}px`;
  img.style.imageRendering = "pixelated";
  img.style.backgroundRepeat = "no-repeat";

  wrap.appendChild(img);
  return wrap;
}

// キャラクターの状態更新 (Sitting / Standing)
function updateCharacterState(char, newState, pos = null) {
  char.classList.remove("sitting");
  if (newState === "sitting") {
    char.classList.add("sitting");
    if (pos) {
      char.style.left = pos.x + "px";
      char.style.top = (pos.y - 12) + "px";
    }
  } else if (newState === "standing") {
    // デスクの横にずれる
    if (pos) {
      char.style.left = (pos.x + 16) + "px";
      char.style.top = (pos.y + 4) + "px";
    }
  }
  char.dataset.state = newState;
  if (pos) char.dataset.seatPos = JSON.stringify(pos);
}

// 感情表現 (Reaction) の追加
function triggerReaction(charEl) {
  const emojis = ["❤️", "💡", "🍵", "💤", "✨", "🔥", "🎵"];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  const bubble = document.createElement("div");
  bubble.className = "char-bubble reaction";
  bubble.textContent = emoji;
  charEl.appendChild(bubble);
  setTimeout(() => bubble.remove(), 2500);

  // たまに着席・離席を切り替える (20% chance)
  if (Math.random() > 0.8 && charEl.dataset.seatPos) {
    const pos = JSON.parse(charEl.dataset.seatPos);
    if (charEl.dataset.state === "sitting") {
      updateCharacterState(charEl, "standing", pos);
      charEl.querySelector(".char-bubble") ? charEl.querySelector(".char-bubble").textContent = "ふぅ、少し休憩…" : null;
    } else {
      updateCharacterState(charEl, "sitting", pos);
      // 本来のセリフ（活動内容）に戻す
      const building = charEl.closest(".building");
      const b = BUILDINGS.find(room => room.id === building?.dataset.id);
      if (b) {
        const text = getBubbleText(b.status, b.id);
        if (charEl.querySelector(".char-bubble")) charEl.querySelector(".char-bubble").textContent = text;
      }
    }
  }
}

// ======================================================
// キャラクター移動演出 (Messenger)
// ======================================================
async function spawnMessenger(startCol, startRow, endCol, endRow, message = "お届け物！") {
  const canvas = document.getElementById("mapCanvas");
  const char = createCharacter("ready", message, 32);
  char.className += " messenger-wrap";
  char.querySelector(".char-sprite").classList.add("char-anim-walking");
  char.style.left = startCol * TILE_SIZE + "px";
  char.style.top = startRow * TILE_SIZE + "px";
  canvas.appendChild(char);

  const path = findPath({ x: startCol, y: startRow }, { x: endCol, y: endRow });
  if (!path) {
    setTimeout(() => char.remove(), 1000);
    return;
  }

  const offset = (TILE_SIZE - 32) / 2;
  for (const step of path) {
    char.style.transition = "all 0.45s linear";
    char.style.left = (step.x * TILE_SIZE + offset) + "px";
    char.style.top = (step.y * TILE_SIZE + offset) + "px";
    await new Promise(r => setTimeout(r, 450));
  }

  char.querySelector(".char-bubble").textContent = "到着！";
  char.querySelector(".char-sprite").classList.remove("char-anim-walking");
  setTimeout(() => char.remove(), 1500);
}

async function randomWalk() {
  const b = BUILDINGS[Math.floor(Math.random() * BUILDINGS.length)];
  const plaza = BUILDINGS.find(room => room.id === "security") || BUILDINGS[5];
  await spawnMessenger(b.col + 1, b.row + 1, plaza.col + 2, plaza.row + 1, "ちょっと休憩…");
}

// ======================================================
// 建物・HUD 描画
// ======================================================
const ACTOR_MAP = {
  "founder-office": "Founder Office",
  "assembly": "Assembly",
  "audit": "Independent Audit Firm",
  "engineering": "OEM Unit",
  "pmo": "Project Management Office",
  "security": "Security, Risk, and Compliance",
  "people-talent": "People and Talent",
  "data-knowledge": "Data and Knowledge",
  "ai-institute": "AI Academic Institute"
};

function getSeatPositions(b) {
  const seats = [];
  const padding = 12;
  const spacing = 48;
  const count = b.w >= 6 ? 3 : (b.w >= 4 ? 2 : 1);
  for (let i = 0; i < count; i++) {
    seats.push({ x: padding + i * spacing, y: 12 });
  }
  return seats;
}

function buildingStatusLabel(status) { return { active: "稼働", pending: "待機", ready: "準備OK" }[status] || status; }

function getBubbleText(status, buildingId) {
  if (buildingId && ACTOR_MAP[buildingId]) {
    const actorName = ACTOR_MAP[buildingId];
    if (LIVE_ACTIVITIES[actorName]) return LIVE_ACTIVITIES[actorName];
  }
  return { active: "カタカタ", pending: "うーん…", ready: "準備OK!" }[status] || "";
}

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
    wall.innerHTML += `<div class="office-decor decor-plant">🌿</div>`;

    const floor = document.createElement("div");
    floor.className = "building-floor";

    const seats = getSeatPositions(b);
    seats.forEach((pos, i) => {
      const seatEl = document.createElement("div");
      seatEl.className = "office-seat";
      seatEl.style.left = pos.x + "px";
      seatEl.style.top = pos.y + "px";
      seatEl.innerHTML = `<div class="office-chair">🪑</div><div class="office-desktop">💻</div>`;
      floor.appendChild(seatEl);

      const bubbleText = (i === 0) ? getBubbleText(b.status, b.id) : "";
      const char = createCharacter(b.status, bubbleText, 40);
      updateCharacterState(char, "sitting", pos);
      floor.appendChild(char);
    });

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

function renderTaskProgress(liveTasks) {
  const stats = liveTasks || TASK_STATS;
  const el = document.getElementById("taskProgress");
  const { total, done, active, items } = stats;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  el.innerHTML = `
    <div class="progress-header">
      <span class="progress-title">📋 プロジェクト動向</span>
      <span class="progress-count">${done}/${total} 完了</span>
    </div>
    <div class="progress-bar-wrap">
      <div class="progress-bar" style="width:${pct}%"></div>
    </div>
    <div class="progress-legend">
      <span class="legend-done">✅ 完了 ${done}</span>
      <span class="legend-wip">⚡ 進行 ${active}</span>
      <span class="legend-pending">⏳ 予定 ${total - done - active}</span>
    </div>
    <div class="task-list-mini">${(items || []).map(item => `<div class="task-mini-item task-${item.status}"><span class="task-mini-icon">${item.status === "done" ? "✅" : item.status === "active" ? "⚡" : "⏳"}</span><span class="task-mini-label">${item.label}</span></div>`).join("")}</div>
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

  if (liveData.activities) LIVE_ACTIVITIES = liveData.activities;

  const latest = liveData.commits[0];
  if (lastHash && latest.hash !== lastHash) {
    showNewsPopup(latest);
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
    } else { b.status = "pending"; }
  });

  renderBuildings();
  renderHud();
  renderTaskProgress(liveData.tasks);
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
  `;
  overlay.classList.add("open");
}

function closeDialog() { document.getElementById("dialogOverlay").classList.remove("open"); }
function updateMessage(text) { const el = document.getElementById("messageText"); el.textContent = text; }

function cycleActivityLog() {
  if (liveCommits.length > 0) {
    const c = liveCommits[Math.floor(Math.random() * liveCommits.length)];
    updateMessage(`[Log] ${c.dept}: ${c.message}`);
  } else { updateMessage(`[Now] Company OS が正常に稼働しています。`); }

  const allChars = document.querySelectorAll(".building-floor .char-wrap");
  if (allChars.length > 0) {
    const target = allChars[Math.floor(Math.random() * allChars.length)];
    triggerReaction(target);
  }
}

function bindEvents() {
  document.getElementById("dialogClose").addEventListener("click", closeDialog);
  document.getElementById("dialogOverlay").addEventListener("click", e => e.target === document.getElementById("dialogOverlay") && closeDialog());
}

function init() {
  renderMap(); renderBuildings(); renderHud(); renderTaskProgress(); renderGitLog(); bindEvents();
  setInterval(() => { const n = new Date(); document.getElementById("hudClock").textContent = `${String(n.getHours()).padStart(2, "0")}:${String(n.getMinutes()).padStart(2, "0")}:${String(n.getSeconds()).padStart(2, "0")}`; }, 1000);
  setInterval(cycleActivityLog, 4000);
  syncWithLiveStatus();
  setInterval(syncWithLiveStatus, 15000);
  setInterval(randomWalk, 12000);
}
init();
