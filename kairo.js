// Kairo LOG 1.2.5

// Kairo - paste this whole file into your browser's Console and press Enter.
// Best on https://example.com (open it in a new tab first). Blank tabs block encryption.
(() => {
"use strict";
const prev = document.getElementById("rc-root");
if (prev) prev.remove();
const prevStyle = document.getElementById("rc-style");
if (prevStyle) prevStyle.remove();
if (!document.getElementById("kairo-fonts")) {
  const fontLink = document.createElement("link");
  fontLink.id = "kairo-fonts";
  fontLink.rel = "stylesheet";
  fontLink.href = "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Unbounded:wght@600;700;800&display=swap";
  (document.head || document.documentElement).appendChild(fontLink);
}
const CSS = `
#rc-root{--bg:#111214;--side:#1e1f22;--panel:#2b2d31;--chat:#313338;--input:#383a40;--text:#f2f3f5;--muted:#949ba4;--accent:#5865f2;--accent2:#4752c4;--border:#3f4147;--green:#23a55a;--red:#f23f42;--font-brand:'Unbounded',system-ui,sans-serif;--font-sans:'Plus Jakarta Sans',system-ui,-apple-system,sans-serif;--font-mono:'JetBrains Mono',ui-monospace,Consolas,monospace;position:fixed;inset:0;z-index:2147483647;background:var(--bg);color:var(--text);font:15px/1.4 var(--font-sans)}
#rc-root.light{--bg:#eef0f4;--side:#ffffff;--panel:#e3e5e8;--chat:#f7f8fa;--input:#e3e5e8;--text:#2e3338;--muted:#5c6370;--accent:#5865f2;--accent2:#4752c4;--border:#d4d7dc;--green:#248046;--red:#da373c}
#rc-root *{box-sizing:border-box}
#rc-root button,#rc-root input{font:inherit}
#rc-root button{cursor:pointer}
#rc-root .app{height:100%;display:grid;grid-template-columns:280px 1fr}
#rc-root .sidebar{min-width:0;background:var(--side);display:flex;flex-direction:column;border-right:1px solid var(--border)}
#rc-root .brand{height:64px;display:flex;align-items:center;gap:7px;padding:0 12px;border-bottom:1px solid var(--border)}
#rc-root .logo{flex:none;width:38px;height:38px;border-radius:12px;display:grid;place-items:center;background:linear-gradient(145deg,#7289da,var(--accent));color:white;font-family:var(--font-brand);font-weight:800;font-size:15px;box-shadow:0 8px 20px rgba(88,101,242,.3)}
#rc-root .brandText{min-width:0;flex:1}
#rc-root .brandTitle{font-family:var(--font-brand);font-weight:700;font-size:.98rem;letter-spacing:-.01em;display:flex;align-items:center;gap:7px}
#rc-root .beta{font-family:var(--font-sans);font-size:.6rem;font-weight:800;letter-spacing:.04em;color:var(--accent);background:rgba(88,101,242,.15);border:1px solid var(--accent);border-radius:999px;padding:1px 6px}
#rc-root .brandSub{font-size:.72rem;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#rc-root .brandSub.ok{color:var(--green)}
#rc-root .brandSub.bad{color:var(--red)}
#rc-root .iconBtn{flex:none;border:0;background:transparent;color:var(--muted);font-size:15px;border-radius:8px;width:28px;height:28px}
#rc-root .iconBtn:hover{background:var(--panel);color:var(--text)}
#rc-root .iconBtn.close:hover{background:var(--red);color:white}
#rc-root .sideActions{display:flex;flex-direction:column;gap:3px;padding:12px 9px 10px}
#rc-root .quickHeading{padding:8px 9px 4px;color:var(--muted);font-size:.68rem;font-weight:800;text-transform:uppercase;letter-spacing:.08em}
#rc-root .quickAction{display:flex;align-items:center;gap:10px;width:100%;border:0;border-radius:9px;padding:9px 11px;background:transparent;color:var(--muted);text-align:left;font-weight:600;font-size:.82rem}
#rc-root .quickAction:hover{background:var(--panel);color:var(--text)}
#rc-root .quickIcon{width:17px;flex:none;text-align:center;color:var(--accent);font-size:.95rem}
#rc-root .btn{border:0;border-radius:9px;padding:9px 11px;background:var(--accent);color:white;font-weight:750}
#rc-root .btn:hover{background:var(--accent2)}
#rc-root .btn:disabled{opacity:.5;cursor:default}
#rc-root .btn.secondary{background:var(--panel);color:var(--text);border:1px solid var(--border)}
#rc-root .btn.danger{background:var(--red)}
#rc-root .btn.small{padding:6px 10px;font-size:.8rem}
#rc-root .sectionTitle{padding:5px 14px;color:var(--muted);font-size:.72rem;font-weight:800;text-transform:uppercase;letter-spacing:.06em}
#rc-root .list{overflow:auto;flex:1;padding:0 7px 12px}
#rc-root .item{width:100%;display:flex;align-items:center;gap:9px;border:0;border-radius:9px;padding:8px;background:transparent;color:var(--muted);text-align:left;margin:2px 0}
#rc-root .item:hover,#rc-root .item.active{background:var(--panel);color:var(--text)}
#rc-root .avatar{position:relative;width:36px;height:36px;flex:0 0 36px;border-radius:50%;display:grid;place-items:center;background:#41434a;color:white;font-weight:850}
#rc-root.light .avatar{background:#6b7280}
#rc-root .presence{position:absolute;right:-1px;bottom:-1px;width:12px;height:12px;border:3px solid var(--side);border-radius:50%;background:#747f8d}
#rc-root .presence.on{background:var(--green)}
#rc-root .itemText{min-width:0;flex:1}
#rc-root .itemName{font-weight:750;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#rc-root .itemSub{font-size:.7rem;color:var(--muted)}
#rc-root .badge{min-width:20px;height:20px;padding:0 6px;border-radius:999px;background:var(--red);color:white;display:grid;place-items:center;font-size:.68rem;font-weight:850}
#rc-root .self{padding:10px 12px;background:var(--side);border-top:1px solid var(--border);color:var(--muted);font-size:.76rem}
#rc-root .main{min-width:0;display:flex;flex-direction:column;background:var(--chat)}
#rc-root .top{height:64px;display:flex;align-items:center;gap:10px;padding:0 18px;background:var(--side);border-bottom:1px solid var(--border)}
#rc-root .topText{flex:1;min-width:0}
#rc-root .topName{font-family:var(--font-brand);font-size:.92rem;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#rc-root .status{color:var(--muted);font-size:.76rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#rc-root .status.online{color:var(--green)}
#rc-root .diag{padding:9px 18px;background:var(--panel);color:var(--text);font-size:.8rem;border-bottom:1px solid var(--border)}
#rc-root .banner{padding:9px 18px;background:rgba(88,101,242,.14);color:var(--text);font-size:.8rem;border-bottom:1px solid var(--accent);display:flex;align-items:center;justify-content:space-between;gap:10px}
#rc-root .banner button{flex:none}
#rc-root .adminTag{font-family:var(--font-mono);font-size:.63rem;font-weight:700;color:var(--accent);background:rgba(88,101,242,.15);border:1px solid var(--accent);border-radius:5px;padding:0 5px;margin-left:6px}
#rc-root .view{flex:1;min-height:0;display:flex;flex-direction:column}
#rc-root .empty{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:25px;text-align:center}
#rc-root .emblemRing{width:158px;height:158px;border-radius:50%;background:radial-gradient(circle,rgba(88,101,242,.22),rgba(88,101,242,.07) 70%);display:grid;place-items:center;cursor:pointer;transition:transform .2s ease,background .2s ease;border:0;padding:0}
#rc-root .emblemRing:hover{transform:translateY(-3px);background:radial-gradient(circle,rgba(88,101,242,.3),rgba(88,101,242,.1) 70%)}
#rc-root .emblemCore{width:106px;height:106px;border-radius:50%;background:linear-gradient(145deg,#7289da,var(--accent));color:#fff;display:grid;place-items:center;font-size:40px;box-shadow:0 14px 34px rgba(88,101,242,.38)}
#rc-root .stageTitle{font-family:var(--font-brand);font-weight:800;font-size:1.5rem;margin:4px 0 0;color:var(--text)}
#rc-root .stageSub{color:var(--muted);font-size:.86rem;max-width:400px;margin:0}
#rc-root .pillRow{display:flex;gap:10px;margin-top:4px;flex-wrap:wrap;justify-content:center}
#rc-root .pillBtn{border:0;border-radius:999px;padding:10px 20px;background:var(--accent);color:#fff;font-weight:700;font-size:.85rem;box-shadow:0 6px 16px rgba(88,101,242,.28)}
#rc-root .pillBtn:hover{background:var(--accent2)}
#rc-root .pillBtn.ghost{background:var(--panel);color:var(--text);border:1px solid var(--border);box-shadow:none}
#rc-root .log{flex:1;min-height:0;overflow:auto;padding:18px;display:flex;flex-direction:column;gap:9px;background:var(--chat)}
#rc-root .message{display:flex;gap:10px;max-width:78%}
#rc-root .message.mine{align-self:flex-end;flex-direction:row-reverse}
#rc-root .bubble{padding:9px 12px;border-radius:14px;background:var(--side);color:var(--text);border:1px solid var(--border);white-space:pre-wrap;overflow-wrap:anywhere}
#rc-root .mine .bubble{background:var(--accent);color:white;border-color:transparent;border-bottom-right-radius:4px}
#rc-root .theirs .bubble{border-bottom-left-radius:4px}
#rc-root .meta{font-size:.68rem;color:inherit;opacity:.7;margin-bottom:2px;display:flex;gap:7px}
#rc-root .meta span{font-family:var(--font-mono)}
#rc-root .system{align-self:center;color:var(--muted);font-size:.73rem;background:var(--side);padding:4px 10px;border-radius:999px;border:1px solid var(--border);text-align:center}
#rc-root .composer{display:flex;gap:9px;padding:12px 16px 16px;background:var(--side);border-top:1px solid var(--border)}
#rc-root .composer input{flex:1;border:0;outline:0;border-radius:10px;padding:11px 13px;background:var(--input);color:var(--text)}
#rc-root .composer button{width:46px;border:0;border-radius:10px;background:var(--accent);color:white;font-size:18px}
#rc-root .modalLayer{position:absolute;inset:0;background:rgba(0,0,0,.72);display:grid;place-items:center;padding:18px;z-index:5}
#rc-root .modal{width:min(520px,100%);max-height:90vh;overflow:auto;background:var(--side);color:var(--text);border:1px solid var(--border);border-radius:16px;padding:18px;box-shadow:0 25px 80px rgba(0,0,0,.5)}
#rc-root .modal h2{margin:0 0 6px}
#rc-root .modal h3{margin:14px 0 6px}
#rc-root .modal p,#rc-root .modal li{color:var(--muted)}
#rc-root .modal input{width:100%;border:1px solid var(--border);border-radius:9px;background:var(--bg);color:var(--text);padding:10px;outline:0}
#rc-root .modal .err{color:var(--red);min-height:1.2em;margin:8px 0 0}
#rc-root .row{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}
#rc-root .row .btn{flex:1;min-width:120px}
#rc-root .toast{position:absolute;left:50%;bottom:22px;z-index:9;transform:translate(-50%,15px);background:#09090a;color:white;padding:9px 13px;border-radius:9px;opacity:0;pointer-events:none;transition:.2s;max-width:min(520px,92vw)}
#rc-root .toast.show{opacity:1;transform:translate(-50%,0)}
#rc-root [hidden]{display:none!important}
@media(max-width:760px){#rc-root .app{grid-template-columns:110px 1fr}#rc-root .brand{height:auto;min-height:64px;flex-wrap:wrap;justify-content:center;padding:8px 4px;gap:2px}#rc-root .brandText,#rc-root .itemText,#rc-root .sectionTitle,#rc-root .self{display:none}#rc-root .sideActions{gap:2px;padding:8px 5px}#rc-root .quickAction{justify-content:center;padding:10px 4px}#rc-root .quickLabel{display:none}#rc-root .quickHeading{display:none}#rc-root .item{justify-content:center}#rc-root .badge{position:absolute;margin:0 0 28px 28px}#rc-root .message{max-width:92%}#rc-root .top{padding:0 10px}}
`;
const MARKUP = `
<div class="app">
  <aside class="sidebar">
    <div class="brand">
      <div class="logo">K</div>
      <div class="brandText"><div class="brandTitle">Kairo<span class="beta">v1.2.5</span></div><div id="brandSub" class="brandSub">not connected</div></div>
           <button id="exit" class="iconBtn close" title="Close">×</button>
    </div>
    <div class="quickHeading">Navigation</div>
    <div class="sideActions">
      <button id="overviewBtn" class="quickAction"><span class="quickIcon">⌂</span><span class="quickLabel">Overview</span></button>
      <button id="profileBtn" class="quickAction"><span class="quickIcon">◉</span><span class="quickLabel">Profile</span></button>
      <button id="addBtn" class="quickAction"><span class="quickIcon">＋</span><span class="quickLabel">Direct Message</span></button>
      <button id="groupBtn" class="quickAction"><span class="quickIcon">＃</span><span class="quickLabel">Join / New Group</span></button>
      <button id="themeBtn" class="quickAction"><span class="quickIcon">◐</span><span id="themeLabel" class="quickLabel">Dark Mode</span></button>
      <button id="helpBtn" class="quickAction"><span class="quickIcon">?</span><span class="quickLabel">Guide</span></button>
    </div>
    <div class="sectionTitle">Direct messages</div><div id="contacts" class="list"></div>
    <div class="sectionTitle">Groups</div><div id="groups" class="list"></div>
    <div id="self" class="self"></div>
  </aside>
  <main class="main">
    <header class="top">
      <div class="topText"><div id="topName" class="topName">Welcome</div><div id="topStatus" class="status"></div></div>
      <button id="btnClear" class="btn secondary small" hidden>Clear history</button>
      <button id="btnDelete" class="btn danger small" hidden>Delete chat</button>
    </header>
    <div id="updateBanner" class="banner" hidden></div>
    <div id="diag" class="diag" hidden></div>
    <section id="view" class="view"></section>
  </main>
</div>
<div id="modalHost"></div>
<div id="toast" class="toast"></div>
`;
const style = document.createElement("style");
style.id = "rc-style";
style.textContent = CSS;
(document.head || document.documentElement).appendChild(style);
const root = document.createElement("div");
root.id = "rc-root";
root.innerHTML = MARKUP;
(document.body || document.documentElement).appendChild(root);
const $ = (id) => root.querySelector("#" + id);

// Public relay that carries the (already encrypted) messages. Plain HTTPS, like a normal website.
const SERVER = "https://ntfy.sh";
const MAX_TEXT = 800;
const MAX_CHATS = 20;
const PING_EVERY = 45000;
const PING_FLOOR = 8000;
const LS = "roomchat:";
const VERSION = "1.2.5";
const ADMIN_TOPIC = "kairo-admin-control-6d2c9a81f4b7";
const ADMIN_PASSWORD = "";
let isAdmin = false;
let adminFeed = null;

const te = new TextEncoder();
const td = new TextDecoder();
const me = { id: rnd(), name: "" };
const rooms = new Map();
let activeTopic = null;
let es = null;
let esKey = "";
let everOpened = false;

let queue = Promise.resolve();
let readyTimer = null;
let toastTimer = null;
const timers = [];

function rnd() {
  const a = crypto.getRandomValues(new Uint8Array(8));
  return Array.from(a, (x) => x.toString(16).padStart(2, "0")).join("");
}
function lsGet(k) { try { return localStorage.getItem(k); } catch { return null; } }
function lsSet(k, v) { try { localStorage.setItem(k, v); } catch { } }
function lsDel(k) { try { localStorage.removeItem(k); } catch {} }

function el(tag, props, ...kids) {
  const e = document.createElement(tag);
  Object.keys(props || {}).forEach((k) => { e[k] = props[k]; });
  kids.forEach((x) => e.append(x));
  return e;
}
function initials(s) {
  return String(s || "?").trim().split(/\s+/).slice(0, 2).map((x) => x[0] || "").join("").toUpperCase() || "?";
}
function toast(text, ms) {
  const x = $("toast");
  x.textContent = text;
  x.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => x.classList.remove("show"), ms || 1800);
}
function setStatus(text, cls) {
  const s = $("brandSub");
  s.textContent = text;
  s.className = "brandSub" + (cls ? " " + cls : "");
}
function setDiag(text) {
  const d = $("diag");
  d.textContent = text;
  d.hidden = !text;
}

// ---------- admin feed and update notices (ADMIN_PASSWORD based) ----------
async function getAdminKey() {
  return deriveKey("admin|" + ADMIN_TOPIC, ADMIN_PASSWORD);
}
async function verifyAdminPacket(raw) {
  try {
    if (!raw) return null;
    const key = await getAdminKey();
    return await unseal(key, typeof raw === "string" ? raw : JSON.stringify(raw));
  } catch { return null; }
}
async function publishAdminCommand(payload) {
  if (!isAdmin) throw new Error("Log in as admin first.");
  const key = await getAdminKey();
  const body = await seal(key, payload);
  const resp = await fetch(SERVER + "/" + ADMIN_TOPIC, { method: "POST", body });
  if (!resp.ok) throw new Error("ntfy rejected the post (" + resp.status + ").");
}
function handleAdminCommand(payload) {
  if (!payload || !payload.type) return;
  if (payload.type === "release") {
    const version = String(payload.version || "").slice(0, 24);
    if (version && version !== VERSION && lsGet(LS + "dismissedUpdate") !== version) showUpdateBanner(version, String(payload.notes || "").slice(0, 500));
  } else if (payload.type === "announcement") {
    const message = String(payload.message || "").slice(0, 300);
    if (message) toast("Kairo admin: " + message, 5000);
  }
}
async function checkForUpdate() {
  try {
    const resp = await fetch(SERVER + "/" + ADMIN_TOPIC + "/json?poll=1&since=all");
    if (!resp.ok) return;
    const lines = (await resp.text()).trim().split("\n").filter(Boolean);
    for (const line of lines.slice(-40)) {
      let msg; try { msg = JSON.parse(line).message; } catch { continue; }
      const payload = await verifyAdminPacket(msg);
      if (payload) handleAdminCommand(payload);
    }
  } catch { }
}
function startAdminFeed() {
  if (adminFeed) adminFeed.close();
  adminFeed = new EventSource(SERVER + "/" + ADMIN_TOPIC + "/sse");
  adminFeed.onmessage = async (e) => {
    try {
      const ev = JSON.parse(e.data);
      if (ev.event !== "message") return;
      const payload = await verifyAdminPacket(ev.message || "");
      if (payload) handleAdminCommand(payload);
    } catch {}
  };
}
function showUpdateBanner(latest, notes) {
  const b = $("updateBanner");
  b.innerHTML = "";
  const copy = "A Kairo update is available: v" + latest + " (you have v" + VERSION + ")." + (notes ? " " + notes : " Get the updated script from the admin.");
  b.append(
    el("span", { textContent: copy }),
    el("button", { className: "btn secondary small", textContent: "Dismiss", onclick: () => { b.hidden = true; lsSet(LS + "dismissedUpdate", latest); } })
  );
  b.hidden = false;
}

// ---------- encryption ----------
function toB64(bytes) {
  let s = "";
  for (let i = 0; i < bytes.length; i += 8192) s += String.fromCharCode(...bytes.subarray(i, i + 8192));
  return btoa(s);
}
function fromB64(s) {
  const b = atob(s);
  const a = new Uint8Array(b.length);
  for (let i = 0; i < b.length; i++) a[i] = b.charCodeAt(i);
  return a;
}
async function sha256Hex(str) {
  const d = await crypto.subtle.digest("SHA-256", te.encode(str));
  return Array.from(new Uint8Array(d), (x) => x.toString(16).padStart(2, "0")).join("");
}
async function deriveKey(room, pw) {
  const base = await crypto.subtle.importKey("raw", te.encode(pw + "|" + room), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: te.encode("roomchat-v1|" + room), iterations: 150000, hash: "SHA-256" },
    base,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}
async function topicFor(room, pw) {
  return "rc" + (await sha256Hex("topic|" + room + "|" + pw)).slice(0, 40);
}
async function seal(key, obj) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, te.encode(JSON.stringify(obj))));
  const out = new Uint8Array(12 + ct.length);
  out.set(iv);
  out.set(ct, 12);
  return toB64(out);
}
async function unseal(key, b64) {
  const raw = fromB64(b64.trim());
  const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: raw.slice(0, 12) }, key, raw.slice(12));
  return JSON.parse(td.decode(pt));
}

// ---------- saved chats ----------
function persistRoom(r) { lsSet(LS + "t:" + r.meta.topic, JSON.stringify(r.store)); }
function saveChats() { lsSet(LS + "chats", JSON.stringify(Array.from(rooms.values(), (r) => r.meta))); }
function makeRoom(meta) {
  let store = { msgs: [], lastSrv: 0 };
  try { store = Object.assign(store, JSON.parse(lsGet(LS + "t:" + meta.topic) || "{}")); } catch {}
  return {
    meta, key: null, store,
    seen: new Set(store.msgs.map((m) => m.id)),
    people: new Map(), unread: 0, ready: false, helloSent: false,
  };
}
function loadChats() {
  let list = [];
  try { list = JSON.parse(lsGet(LS + "chats") || "[]"); } catch {}
  list.forEach((meta) => { if (meta && meta.topic && !rooms.has(meta.topic)) rooms.set(meta.topic, makeRoom(meta)); });
}

// ---------- sending ----------
async function post(r, kind, extra) {
  const m = Object.assign({ i: me.id, k: kind, name: me.name, t: Date.now() }, extra || {});
  const body = await seal(r.key, m);
  const resp = await fetch(SERVER + "/" + r.meta.topic, { method: "POST", body });
  if (!resp.ok) throw new Error(resp.status === 429 ? "rate limited, slow down a little" : "server said " + resp.status);
}

// ---------- sidebar ----------
function pingGap() {
  const n = Math.max(1, Array.from(rooms.values()).filter((r) => r.key).length);
  return Math.max(PING_FLOOR, PING_EVERY / n);
}
function onlineMs() {
  const n = Math.max(1, Array.from(rooms.values()).filter((r) => r.key).length);
  return Math.max(110000, pingGap() * n * 2.5);
}
function onlineNames(r) {
  const now = Date.now();
  const limit = onlineMs();
  const names = [];
  r.people.forEach((p) => { if (now - p.last < limit) names.push(p.name); });
  return names;
}
function chatItem(r) {
  const topic = r.meta.topic;
  const locked = !r.key;
  const isDm = r.meta.type === "dm";
  const names = locked ? [] : onlineNames(r);
  const sub = locked ? "locked · click to unlock"
    : isDm ? (names.length ? "online" : "no one online")
    : (names.length ? names.length + " online" : "just you");
  const avatar = el("div", { className: "avatar", textContent: isDm ? initials(r.meta.title) : "#" });
  if (isDm) avatar.append(el("span", { className: "presence" + (names.length ? " on" : "") }));
  const item = el("button", { type: "button", className: "item" + (topic === activeTopic ? " active" : "") },
    avatar,
    el("div", { className: "itemText" },
      el("div", { className: "itemName", textContent: (locked ? "🔒 " : "") + r.meta.title }),
      el("div", { className: "itemSub", textContent: sub })));
  if (r.unread) item.append(el("span", { className: "badge", textContent: String(r.unread) }));
  item.onclick = () => openChat(topic);
  return item;
}
function renderSidebar() {
  const all = Array.from(rooms.values());
  const dms = all.filter((r) => r.meta.type === "dm");
  const groups = all.filter((r) => r.meta.type !== "dm");
  const fill = (box, list, empty) => {
    box.innerHTML = "";
    if (!list.length) box.append(el("div", { className: "itemSub", textContent: empty, style: "padding:12px" }));
    list.forEach((r) => box.append(chatItem(r)));
  };
  fill($("contacts"), dms, "No direct messages yet.");
  fill($("groups"), groups, "No groups yet.");
  $("self").innerHTML = "";
  $("self").append(document.createTextNode(me.name ? me.name + " · " + all.length + "/" + MAX_CHATS + " chats" : "Set up your profile"));
  if (isAdmin) $("self").append(el("span", { className: "adminTag", textContent: "ADMIN" }));
}
function updateTop() {
  const r = rooms.get(activeTopic);
  if (!r) return;
  const names = onlineNames(r);
  const isDm = r.meta.type === "dm";
  $("topName").textContent = (isDm ? "@ " : "# ") + r.meta.title;
  $("topStatus").textContent = isDm ? (names.length ? "online" : "offline") : "Online: You" + (names.length ? ", " + names.join(", ") : "");
  $("topStatus").className = "status" + (isDm && names.length ? " online" : "");
}

// ---------- chat view ----------
function buildMessage(who, text, mine, time) {
  const meta = el("div", { className: "meta" },
    el("b", { textContent: mine ? "You" : who }),
    el("span", { textContent: new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }));
  const bubble = el("div", { className: "bubble" }, meta, document.createTextNode(text));
  return el("div", { className: "message " + (mine ? "mine" : "theirs") },
    el("div", { className: "avatar", textContent: initials(mine ? me.name : who) }), bubble);
}
function scrollLog() { const l = $("log"); if (l) l.scrollTop = l.scrollHeight; }
function addSystem(text) { const l = $("log"); if (l) { l.append(el("div", { className: "system", textContent: text })); scrollLog(); } }
function showMessage(m) { const l = $("log"); if (l) { l.append(buildMessage(m.who, m.text, m.mine, m.time)); scrollLog(); } }

function renderWelcome() {
  activeTopic = null;
  $("topName").textContent = "Welcome";
  $("topStatus").textContent = "";
  $("topStatus").className = "status";
  $("btnClear").hidden = true;
  $("btnDelete").hidden = true;
  const emblem = el("button", { type: "button", className: "emblemRing", title: "Start a chat", onclick: startAdd },
    el("div", { className: "emblemCore", textContent: "\u2709\uFE0F" }));
  const start = el("button", { className: "pillBtn", textContent: "+ Start a chat", onclick: startAdd });
  const help = el("button", { className: "pillBtn ghost", textContent: "How it works", onclick: showHelp });
  $("view").innerHTML = "";
  $("view").append(el("div", { className: "empty" },
    emblem,
    el("div", { className: "stageTitle", textContent: "Kairo" }),
    el("p", { className: "stageSub", textContent: "Start a direct message with one person, or a group for everyone who knows its name and password. Each chat has its own password, and messages are encrypted before they leave your browser." }),
    el("div", { className: "pillRow" }, start, help)));
  renderSidebar();
}

function openChat(id) {
  const r = rooms.get(id);
  if (!r) return;
  if (!r.key) return askUnlock(r);
  activeTopic = id;
  r.unread = 0;
  const isDm = r.meta.type === "dm";
  const input = el("input", { id: "msg", maxLength: MAX_TEXT, autocomplete: "off", placeholder: "Message " + (isDm ? r.meta.title : "#" + r.meta.title) });
  const form = el("form", { id: "form", className: "composer" }, input, el("button", { textContent: "➤" }));
  form.onsubmit = sendMessage;
  $("view").innerHTML = "";
  $("view").append(el("div", { id: "log", className: "log" }), form);
  r.store.msgs.forEach(showMessage);
  if (r.store.msgs.length) addSystem("— earlier messages —");
  addSystem(isDm
    ? "Direct message with " + r.meta.title + ". They start a DM with your name and the same password."
    : "Group “" + r.meta.title + "”. Anyone with the group name and password can join.");
  $("btnClear").hidden = false;
  $("btnDelete").hidden = false;
  updateTop();
  renderSidebar();
  input.focus();
}

// ---------- receiving ----------
async function onEvent(ev) {
  const r = rooms.get(ev.topic);
  if (!r || !r.key) return;
  if (ev.time && ev.time > r.store.lastSrv) { r.store.lastSrv = ev.time; persistRoom(r); }
  let m;
  try { m = await unseal(r.key, ev.message || ""); } catch { return; }
  if (!m || !m.i || m.i === me.id) return;
  const who = String(m.name || "Someone").slice(0, 20);
  const isActive = r.meta.topic === activeTopic;

  if (r.meta.type === "dm" && r.meta.title !== who) {
    r.meta.title = who;
    saveChats();
    if (isActive) updateTop();
    renderSidebar();
  }

  if (m.k === "m") {
    if (!m.id || r.seen.has(m.id)) return;
    r.seen.add(m.id);
    const rec = { id: m.id, who, text: String(m.text || "").slice(0, MAX_TEXT), mine: false, time: m.t || Date.now() };
    r.store.msgs.push(rec);
    if (r.store.msgs.length > 300) r.store.msgs = r.store.msgs.slice(-300);
    persistRoom(r);
    if (isActive) showMessage(rec); else { r.unread++; renderSidebar(); }
    return;
  }
  if (!r.ready) return;
  if (m.k === "h") {
    r.people.set(m.i, { name: who, last: Date.now() });
    if (isActive) addSystem(who + " joined");
    setTimeout(() => post(r, "p").catch(() => {}), Math.random() * 1500);
  } else if (m.k === "p") {
    r.people.set(m.i, { name: who, last: Date.now() });
  } else if (m.k === "b") {
    if (r.people.delete(m.i) && isActive) addSystem(who + " left");
  }
  if (isActive) updateTop();
  renderSidebar();
}

// One connection listens to every unlocked chat at once.
function resubscribe() {
  const open = Array.from(rooms.values()).filter((r) => r.key);
  const k = open.map((r) => r.meta.topic).join(",");
  if (k === esKey) return;
  if (es) { es.close(); es = null; }
  esKey = k;
  open.forEach((r) => { r.ready = false; });
  if (!open.length) { setStatus("no chat unlocked"); return; }
  const mins = open.map((r) => r.store.lastSrv);
  const since = mins.every((x) => x > 0) ? Math.min.apply(null, mins) : "6h";
  everOpened = false;
  setStatus("connecting…");
  es = new EventSource(SERVER + "/" + k + "/sse?since=" + since);
  es.onopen = () => {
    everOpened = true;
    setStatus("connected", "ok");
    setDiag("");
    clearTimeout(readyTimer);
    readyTimer = setTimeout(() => {
      rooms.forEach((r) => {
        if (!r.key) return;
        r.ready = true;
        if (!r.helloSent) { r.helloSent = true; post(r, "h").catch(() => {}); }
      });
    }, 2000);
  };
  es.onerror = () => {
    setStatus("reconnecting…", "bad");
    if (!everOpened) {
      setDiag("Can't reach the relay (" + SERVER.replace("https://", "") + "). Check you're online and that the school hasn't blocked it. If you pasted this on a busy website (like YouTube or Google), that site may block it: use https://example.com instead.");
    }
  };
  es.onmessage = (e) => {
    let ev;
    try { ev = JSON.parse(e.data); } catch { return; }
    if (ev.event === "message") queue = queue.then(() => onEvent(ev)).catch(() => {});
  };
}

// ---------- dialogs ----------
function closeModal() { $("modalHost").innerHTML = ""; }
function showModal(box) {
  const layer = el("div", { className: "modalLayer" }, box);
  $("modalHost").innerHTML = "";
  $("modalHost").append(layer);
}
function modal(title, hint, fields, okText, onOk) {
  const box = el("form", { className: "modal" });
  box.append(el("h2", { textContent: title }));
  if (hint) box.append(el("p", { textContent: hint }));
  const inputs = {};
  fields.forEach((f) => {
    const inp = el("input", { type: f.type || "text", placeholder: f.placeholder || "", maxLength: f.max || 60, autocomplete: "off", value: f.value || "" });
    inputs[f.id] = inp;
    box.append(el("h3", { textContent: f.label }), inp);
  });
  const err = el("p", { className: "err" });
  const ok = el("button", { type: "submit", className: "btn", textContent: okText });
  const cancel = el("button", { type: "button", className: "btn secondary", textContent: "Cancel", onclick: closeModal });
  box.append(err, el("div", { className: "row" }, ok, cancel));
  box.onsubmit = async (e) => {
    e.preventDefault();
    ok.disabled = true;
    err.textContent = "";
    const vals = {};
    Object.keys(inputs).forEach((id) => { vals[id] = inputs[id].value; });
    try { await onOk(vals); closeModal(); }
    catch (x) { err.textContent = x && x.message ? x.message : "Something went wrong."; ok.disabled = false; }
  };
  showModal(box);
  const first = Object.values(inputs)[0];
  if (first) first.focus();
}

function checkSecure() {
  if (!window.crypto || !crypto.subtle) {
    throw new Error("This tab blocks encryption. Close it, open https://example.com in a new tab (not a blank tab), and paste the script into the Console there.");
  }
}

function showHelp() {
  const steps = [
    "Open Profile and set your display name.",
    "Direct Message starts a DM. Type the other person's name exactly as they set it, and agree on a password together. They do the same on their side, typing YOUR name and the same password.",
    "Join / New Group makes or joins a group. Everyone who enters the same group name and password lands in the same group.",
    "After a refresh your chats are still listed but locked. Click one and enter its password to open it with your saved history.",
  ];
  const box = el("div", { className: "modal" },
    el("h2", { textContent: "How Kairo works" }),
    el("ol", {}, ...steps.map((s) => el("li", { textContent: s }))),
    el("h3", { textContent: "Privacy and limits" }),
    el("p", { textContent: "Messages are encrypted in your browser with the chat password and carried by the free ntfy.sh relay. Anyone who knows a chat's name and password can read it, so pick a strong password. Admin announcements and release notices use a separate ntfy topic protected by ADMIN_PASSWORD. You can have up to " + MAX_CHATS + " chats. Messages are limited to " + MAX_TEXT + " characters. History is stored only in this browser." }),
    el("div", { className: "row" }, el("button", { className: "btn", textContent: "Got it", onclick: closeModal })));
  showModal(box);
}

function profile() {
  modal("Your profile", "Other people see this name on your messages. It's saved only in this browser.",
    [{ id: "n", label: "Display name", value: me.name, max: 20 }], "Save",
    async (v) => {
      const n = v.n.trim();
      if (!n) throw new Error("Enter a name.");
      me.name = n.slice(0, 20);
      lsSet(LS + "name", me.name);
      renderSidebar();
      if (!activeTopic) renderWelcome();
    });
}

function adminDashboard() {
  const box = el("div", { className: "modal" },
    el("h2", { textContent: "Kairo Admin" }),
    el("p", { textContent: "Commands are encrypted with ADMIN_PASSWORD and published through ntfy." }),
    el("div", { className: "row" },
      el("button", { className: "btn", textContent: "Publish update", onclick: () => modal("Publish update", "This announces a version. It does not upload or install code.", [{ id: "v", label: "Version", value: "1.2.6", max: 24 }, { id: "n", label: "Release notes", max: 500 }], "Publish", async (v) => { const version = v.v.trim(); if (!version) throw new Error("Enter a version number."); await publishAdminCommand({ type: "release", version, notes: v.n.trim(), at: Date.now() }); toast("Update announcement published."); }) }),
      el("button", { className: "btn secondary", textContent: "Announcement", onclick: () => modal("Post announcement", "Send a notice to connected Kairo users.", [{ id: "m", label: "Message", max: 300 }], "Send", async (v) => { const message = v.m.trim(); if (!message) throw new Error("Enter a message."); await publishAdminCommand({ type: "announcement", message, at: Date.now() }); toast("Announcement published."); }) })),
    el("h3", { textContent: "Recent admin activity" }),
    el("div", { id: "adminHistory", style: "max-height:180px;overflow:auto;color:var(--muted);font-size:.82rem" }, "Loading relay history…"),
    el("div", { className: "row" },
      el("button", { className: "btn secondary", textContent: "Close", onclick: closeModal }),
      el("button", { className: "btn danger", textContent: "Log out", onclick: () => { isAdmin = false; renderSidebar(); closeModal(); toast("Admin locked."); } })));
  showModal(box);
  loadAdminHistory();
}

async function loadAdminHistory() {
  const host = $("modalHost").querySelector("#adminHistory");
  if (!host) return;
  try {
    const resp = await fetch(SERVER + "/" + ADMIN_TOPIC + "/json?poll=1&since=all");
    if (!resp.ok) throw new Error("Relay unavailable");
    const lines = (await resp.text()).trim().split("\n").filter(Boolean).slice(-20);
    const entries = [];
    for (const line of lines) {
      try {
        const msg = JSON.parse(line).message;
        const payload = await verifyAdminPacket(msg);
        if (payload) entries.push(payload);
      } catch {}
    }
    host.innerHTML = "";
    if (!entries.length) host.textContent = "No admin activity found.";
    entries.reverse().forEach((x) => host.append(el("div", { textContent: (x.type === "release" ? "Release v" + x.version : "Announcement") + " · " + new Date(x.at || Date.now()).toLocaleString() + (x.notes ? " · " + x.notes : x.message ? " · " + x.message : ""), style: "padding:6px 0;border-bottom:1px solid var(--border)" })));
  } catch { host.textContent = "Could not load ntfy history."; }
}

async function adminLogin() {
  checkSecure();
  modal("Admin Login", "Enter the admin password to unlock the Kairo Admin dashboard.",
    [{ id: "p", label: "Admin password", type: "password", max: 120 }], "Unlock",
    async (v) => {
      if (v.p !== ADMIN_PASSWORD) throw new Error("Incorrect admin password.");
      isAdmin = true;
      renderSidebar();
      setTimeout(adminDashboard, 0);
    });
}

async function createChat(type, label, pw) {
  checkSecure();
  label = label.trim();
  if (!label) throw new Error(type === "dm" ? "Enter their name." : "Enter a group name.");
  if (pw.length < 4) throw new Error("Use a password with at least 4 characters.");
  let room, title;
  if (type === "dm") {
    title = label.slice(0, 20);
    room = "dm|" + [me.name.toLowerCase(), label.toLowerCase()].sort().join("|");
  } else {
    title = label.slice(0, 40);
    room = "group|" + label.toLowerCase();
  }
  const topic = await topicFor(room, pw);
  let r = rooms.get(topic);
  if (!r && rooms.size >= MAX_CHATS) throw new Error("You can have up to " + MAX_CHATS + " chats. Delete one first.");
  const key = await deriveKey(room, pw);
  if (!r) {
    r = makeRoom({ topic, type, title, room });
    rooms.set(topic, r);
    saveChats();
  }
  r.key = key;
  resubscribe();
  openChat(topic);
}

function askUnlock(r) {
  modal("Unlock “" + r.meta.title + "”", "Passwords aren't saved on this device, so enter this chat's password to open it.",
    [{ id: "p", label: "Password", type: "password" }], "Unlock",
    async (v) => {
      checkSecure();
      const topic = await topicFor(r.meta.room, v.p);
      if (topic !== r.meta.topic) throw new Error("That password doesn't match this chat.");
      r.key = await deriveKey(r.meta.room, v.p);
      resubscribe();
      openChat(r.meta.topic);
    });
}

function startAdd() {
  if (!me.name) return profile();
  modal("New direct message",
    "Type their name exactly as they set it, and agree on a password together. They do the same, typing YOUR name and the same password.",
    [{ id: "f", label: "Their name", max: 20 }, { id: "p", label: "Shared password", type: "password" }], "Start DM",
    (v) => createChat("dm", v.f, v.p));
}
function startGroup() {
  if (!me.name) return profile();
  modal("New or existing group",
    "Pick a group name and password. Everyone who enters the same name and password joins the same group.",
    [{ id: "f", label: "Group name", max: 40 }, { id: "p", label: "Group password", type: "password" }], "Create / join",
    (v) => createChat("group", v.f, v.p));
}

// ---------- actions ----------
async function sendMessage(e) {
  e.preventDefault();
  const r = rooms.get(activeTopic);
  const input = $("msg");
  const text = input.value.trim().slice(0, MAX_TEXT);
  if (!r || !r.key || !text) return;
  const id = rnd();
  try {
    await post(r, "m", { id, text });
  } catch (err) {
    addSystem("Couldn't send: " + (err && err.message ? err.message : "network error") + ". Your text is still in the box.");
    return;
  }
  r.seen.add(id);
  const rec = { id, who: me.name, text, mine: true, time: Date.now() };
  r.store.msgs.push(rec);
  if (r.store.msgs.length > 300) r.store.msgs = r.store.msgs.slice(-300);
  persistRoom(r);
  showMessage(rec);
  input.value = "";
}

$("btnClear").onclick = () => {
  const r = rooms.get(activeTopic);
  if (!r || !confirm("Delete the saved history for this chat on this device?")) return;
  r.store.msgs = [];
  persistRoom(r);
  $("log").innerHTML = "";
  addSystem("Saved history cleared.");
};
$("btnDelete").onclick = async () => {
  const r = rooms.get(activeTopic);
  if (!r || !confirm("Remove “" + r.meta.title + "” and its saved history from this device?")) return;
  if (r.key) { try { await post(r, "b"); } catch {} }
  rooms.delete(r.meta.topic);
  lsDel(LS + "t:" + r.meta.topic);
  saveChats();
  resubscribe();
  renderWelcome();
};

$("themeBtn").onclick = () => {
  root.classList.toggle("light");
  const light = root.classList.contains("light");
  lsSet(LS + "theme", light ? "light" : "dark");
  $("themeLabel").textContent = light ? "Light Mode" : "Dark Mode";
};
$("overviewBtn").onclick = renderWelcome;
$("addBtn").onclick = startAdd;
$("groupBtn").onclick = startGroup;
$("helpBtn").onclick = showHelp;
$("profileBtn").onclick = profile;
if ($("adminBtn")) $("adminBtn").style.display = "none";
$("exit").onclick = () => {
  timers.forEach(clearInterval);
  clearTimeout(readyTimer);
  clearTimeout(pingTimer);
  if (es) { es.close(); es = null; }
  if (adminFeed) { adminFeed.close(); adminFeed = null; }
  const st = document.getElementById("rc-style");
  if (st) st.remove();
  root.remove();
};

// ---------- start ----------
let pingIdx = 0;
function pingNext() {
  const open = Array.from(rooms.values()).filter((r) => r.key && r.ready);
  if (open.length) { const r = open[pingIdx++ % open.length]; post(r, "p").catch(() => {}); }
  pingTimer = setTimeout(pingNext, pingGap());
}
let pingTimer = setTimeout(pingNext, pingGap());
timers.push(setInterval(() => { renderSidebar(); updateTop(); }, 5000));

if (lsGet(LS + "theme") === "light") { root.classList.add("light"); $("themeLabel").textContent = "Light Mode"; } else { $("themeLabel").textContent = "Dark Mode"; }
me.name = lsGet(LS + "name") || "";
loadChats();
setStatus("no chat unlocked");
renderWelcome();
if (!me.name) profile();
renderSidebar();
checkForUpdate();
startAdminFeed();

})();