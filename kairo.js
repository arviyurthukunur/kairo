// Kairo LOG 1.2.9

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
#rc-root{--bg:#111214;--side:#1e1f22;--panel:#2b2d31;--chat:#313338;--input:#383a40;--text:#f2f3f5;--muted:#949ba4;--accent:#5865f2;--accent2:#4752c4;--border:#3f4147;--green:#23a55a;--amber:#f0b232;--red:#f23f42;--font-brand:'Unbounded',system-ui,sans-serif;--font-sans:'Plus Jakarta Sans',system-ui,-apple-system,sans-serif;--font-mono:'JetBrains Mono',ui-monospace,Consolas,monospace;position:fixed;inset:0;z-index:2147483647;background:var(--bg);color:var(--text);font:15px/1.4 var(--font-sans)}
#rc-root[data-theme="light"]{--bg:#eef0f4;--side:#ffffff;--panel:#e3e5e8;--chat:#f7f8fa;--input:#e3e5e8;--text:#2e3338;--muted:#5c6370;--accent:#5865f2;--accent2:#4752c4;--border:#d4d7dc;--green:#248046;--amber:#d97706;--red:#da373c}
#rc-root[data-theme="cyberpunk"]{--bg:#090614;--side:#120d24;--panel:#1e1638;--chat:#16102b;--input:#251b45;--text:#f8f0ff;--muted:#a38ec4;--accent:#ff2a85;--accent2:#d91b6b;--border:#34265c;--green:#00f5d4;--amber:#fee440;--red:#ff3864}
#rc-root[data-theme="emerald"]{--bg:#091410;--side:#10211b;--panel:#183028;--chat:#132820;--input:#1e3b30;--text:#ecfdf5;--muted:#84b59f;--accent:#10b981;--accent2:#059669;--border:#234739;--green:#34d399;--amber:#fbbf24;--red:#f87171}
#rc-root[data-theme="crimson"]{--bg:#14080a;--side:#210e12;--panel:#33161c;--chat:#281116;--input:#3d1a22;--text:#fff1f2;--muted:#fda4af;--accent:#e11d48;--accent2:#be123c;--border:#4c1d26;--green:#22c55e;--amber:#f59e0b;--red:#ef4444}
#rc-root *{box-sizing:border-box}
#rc-root button,#rc-root input,#rc-root textarea,#rc-root select{font:inherit}
#rc-root button{cursor:pointer}
#rc-root .app{height:100%;display:grid;grid-template-columns:238px 1fr 270px}
#rc-root .sidebar{min-width:0;background:var(--side);display:flex;flex-direction:column;border-right:1px solid var(--border)}
#rc-root .rightbar{min-width:0;background:var(--side);display:flex;flex-direction:column;border-left:1px solid var(--border)}
#rc-root .brand{height:64px;display:flex;align-items:center;gap:7px;padding:0 12px;border-bottom:1px solid var(--border)}
#rc-root .rightTop{height:64px;display:flex;align-items:center;justify-content:space-between;padding:0 14px;border-bottom:1px solid var(--border);font-family:var(--font-brand);font-size:.82rem;font-weight:700;color:var(--text)}
#rc-root .logo{flex:none;width:38px;height:38px;border-radius:12px;display:grid;place-items:center;background:linear-gradient(145deg,var(--accent),var(--accent2));color:white;font-family:var(--font-brand);font-weight:800;font-size:15px;box-shadow:0 8px 20px rgba(0,0,0,.3)}
#rc-root .brandText{min-width:0;flex:1}
#rc-root .brandTitle{font-family:var(--font-brand);font-weight:700;font-size:.98rem;letter-spacing:-.01em;display:flex;align-items:center;gap:7px}
#rc-root .beta{font-family:var(--font-sans);font-size:.6rem;font-weight:800;letter-spacing:.04em;color:var(--accent);background:rgba(88,101,242,.15);border:1px solid var(--accent);border-radius:999px;padding:1px 6px}
#rc-root .brandSub{font-size:.72rem;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#rc-root .brandSub.ok{color:var(--green)}
#rc-root .brandSub.bad{color:var(--red)}
#rc-root .iconBtn{flex:none;border:0;background:transparent;color:var(--muted);font-size:15px;border-radius:8px;width:28px;height:28px}
#rc-root .iconBtn:hover{background:var(--panel);color:var(--text)}
#rc-root .iconBtn.close:hover{background:var(--red);color:white}
#rc-root .sideActions{display:flex;flex-direction:column;gap:3px;padding:10px 9px;flex:1;overflow:auto}
#rc-root .quickHeading{padding:10px 14px 3px;color:var(--muted);font-size:.68rem;font-weight:800;text-transform:uppercase;letter-spacing:.08em}
#rc-root .quickAction{display:flex;align-items:center;gap:10px;width:100%;border:0;border-radius:9px;padding:9px 11px;background:transparent;color:var(--muted);text-align:left;font-weight:600;font-size:.83rem}
#rc-root .quickAction:hover{background:var(--panel);color:var(--text)}
#rc-root .quickIcon{width:18px;flex:none;text-align:center;color:var(--accent);font-size:.95rem}
#rc-root .btn{border:0;border-radius:9px;padding:9px 11px;background:var(--accent);color:white;font-weight:750}
#rc-root .btn:hover{background:var(--accent2)}
#rc-root .btn:disabled{opacity:.5;cursor:default}
#rc-root .btn.secondary{background:var(--panel);color:var(--text);border:1px solid var(--border)}
#rc-root .btn.danger{background:var(--red)}
#rc-root .btn.small{padding:6px 10px;font-size:.8rem}
#rc-root .sectionTitle{padding:12px 14px 5px;color:var(--muted);font-size:.72rem;font-weight:800;text-transform:uppercase;letter-spacing:.06em}
#rc-root .list{overflow:auto;flex:1;padding:0 7px 12px}
#rc-root .item{width:100%;display:flex;align-items:center;gap:9px;border:0;border-radius:9px;padding:8px;background:transparent;color:var(--muted);text-align:left;margin:2px 0}
#rc-root .item:hover,#rc-root .item.active{background:var(--panel);color:var(--text)}
#rc-root .avatar{position:relative;width:36px;height:36px;flex:0 0 36px;border-radius:50%;display:grid;place-items:center;background:var(--panel);border:1px solid var(--border);color:var(--text);font-weight:850;font-size:14px}
#rc-root .presence{position:absolute;right:-1px;bottom:-1px;width:12px;height:12px;border:3px solid var(--side);border-radius:50%;background:#747f8d}
#rc-root .presence.online{background:var(--green)}
#rc-root .presence.idle{background:var(--amber)}
#rc-root .presence.dnd{background:var(--red)}
#rc-root .itemText{min-width:0;flex:1}
#rc-root .itemName{font-weight:750;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#rc-root .itemSub{font-size:.7rem;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#rc-root .draftTag{color:var(--accent);font-weight:700}
#rc-root .badge{min-width:20px;height:20px;padding:0 6px;border-radius:999px;background:var(--red);color:white;display:grid;place-items:center;font-size:.68rem;font-weight:850}
#rc-root .selfCard{padding:10px 12px;background:var(--side);border-top:1px solid var(--border);display:flex;align-items:center;gap:9px;cursor:pointer}
#rc-root .selfCard:hover{background:var(--panel)}
#rc-root .selfInfo{min-width:0;flex:1}
#rc-root .selfName{font-weight:750;font-size:.82rem;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#rc-root .selfBio{font-size:.68rem;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#rc-root .main{min-width:0;display:flex;flex-direction:column;background:var(--chat)}
#rc-root .top{height:64px;display:flex;align-items:center;gap:10px;padding:0 18px;background:var(--side);border-bottom:1px solid var(--border)}
#rc-root .topText{flex:1;min-width:0}
#rc-root .topName{font-family:var(--font-brand);font-size:.92rem;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#rc-root .status{color:var(--muted);font-size:.76rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#rc-root .status.online{color:var(--green)}
#rc-root .searchInput{width:185px;border:1px solid var(--border);border-radius:8px;padding:6px 10px;background:var(--input);color:var(--text);font-size:.8rem;outline:0;transition:border-color .15s,width .2s}
#rc-root .searchInput:focus{border-color:var(--accent);width:230px}
#rc-root .diag{padding:9px 18px;background:var(--panel);color:var(--text);font-size:.8rem;border-bottom:1px solid var(--border)}
#rc-root .banner{padding:9px 18px;background:rgba(88,101,242,.14);color:var(--text);font-size:.8rem;border-bottom:1px solid var(--accent);display:flex;align-items:center;justify-content:space-between;gap:10px}
#rc-root .banner button{flex:none}
#rc-root .view{flex:1;min-height:0;display:flex;flex-direction:column}
#rc-root .empty{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:28px;text-align:center;overflow:auto}
#rc-root .emblemRing{width:158px;height:158px;flex:none;border-radius:50%;background:radial-gradient(circle,rgba(88,101,242,.22),rgba(88,101,242,.07) 70%);display:grid;place-items:center;cursor:pointer;transition:transform .2s ease,background .2s ease;border:0;padding:0}
#rc-root .emblemRing:hover{transform:translateY(-3px);background:radial-gradient(circle,rgba(88,101,242,.3),rgba(88,101,242,.1) 70%)}
#rc-root .emblemCore{width:106px;height:106px;border-radius:50%;background:linear-gradient(145deg,var(--accent),var(--accent2));color:#fff;display:grid;place-items:center;font-size:40px;box-shadow:0 14px 34px rgba(0,0,0,.38)}
#rc-root .stageTitle{font-family:var(--font-brand);font-weight:800;font-size:1.75rem;letter-spacing:-.02em;margin:4px 0 0;color:var(--text)}
#rc-root .stageSub{color:var(--muted);font-size:.9rem;max-width:440px;margin:0}
#rc-root .pillRow{display:flex;gap:12px;margin-top:4px;flex-wrap:wrap;justify-content:center}
#rc-root .pillBtn{font-family:var(--font-brand);border:0;border-radius:999px;padding:12px 24px;background:var(--accent);color:#fff;font-weight:700;font-size:.82rem;box-shadow:0 8px 20px rgba(0,0,0,.32);transition:transform .15s ease,background .15s ease}
#rc-root .pillBtn:hover{background:var(--accent2);transform:translateY(-1px)}
#rc-root .pillBtn.ghost{background:var(--panel);color:var(--text);border:1px solid var(--border);box-shadow:none}
#rc-root .statsGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;width:min(760px,100%);margin-top:22px}
#rc-root .statCard{position:relative;overflow:hidden;background:linear-gradient(160deg,var(--side),var(--panel));border:1px solid var(--border);border-radius:20px;padding:22px 20px;display:flex;flex-direction:column;justify-content:space-between;gap:12px;text-align:left;box-shadow:0 14px 34px rgba(0,0,0,.22);transition:transform .2s ease,border-color .2s ease}
#rc-root .statCard:hover{transform:translateY(-4px);border-color:var(--accent)}
#rc-root .statTop{display:flex;align-items:center;justify-content:space-between;gap:8px}
#rc-root .statLabel{font-family:var(--font-brand);font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)}
#rc-root .statValue{font-family:var(--font-brand);font-size:1.28rem;font-weight:800;letter-spacing:-.02em;color:var(--text);display:flex;align-items:center;gap:10px;line-height:1.2}
#rc-root .statSub{font-size:.75rem;color:var(--muted);font-weight:500}
#rc-root .pulseDot{position:relative;width:12px;height:12px;flex:none;border-radius:50%;background:var(--green);box-shadow:0 0 12px var(--green);animation:kairoBlink 1.6s infinite ease-in-out}
#rc-root .pulseDot::after{content:"";position:absolute;inset:-5px;border-radius:50%;border:2px solid var(--green);opacity:0;animation:kairoRing 1.6s infinite ease-out}
@keyframes kairoBlink{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.45;transform:scale(.88)}}
@keyframes kairoRing{0%{transform:scale(.6);opacity:.85}100%{transform:scale(1.9);opacity:0}}
#rc-root .log{flex:1;min-height:0;overflow:auto;padding:18px;display:flex;flex-direction:column;gap:11px;background:var(--chat)}
#rc-root .message{position:relative;display:flex;gap:10px;max-width:78%}
#rc-root .message.mine{align-self:flex-end;flex-direction:row-reverse}
#rc-root .msgCol{display:flex;flex-direction:column;min-width:0}
#rc-root .mine .msgCol{align-items:flex-end}
#rc-root .bubbleWrap{position:relative;display:flex;align-items:center;gap:6px}
#rc-root .mine .bubbleWrap{flex-direction:row-reverse}
#rc-root .bubble{padding:9px 12px;border-radius:14px;background:var(--side);color:var(--text);border:1px solid var(--border);white-space:pre-wrap;overflow-wrap:anywhere;transition:box-shadow .2s}
#rc-root .mine .bubble{background:var(--accent);color:white;border-color:transparent;border-bottom-right-radius:4px}
#rc-root .theirs .bubble{border-bottom-left-radius:4px}
#rc-root .bubble.deleted{opacity:.6;font-style:italic}
#rc-root .meta{font-size:.68rem;color:inherit;opacity:.75;margin-bottom:3px;display:flex;align-items:center;gap:7px}
#rc-root .meta span{font-family:var(--font-mono)}
#rc-root .editedTag{font-size:.62rem;opacity:.75;font-style:italic;margin-left:5px}
#rc-root .replyQuote{font-size:.73rem;padding:4px 8px;margin-bottom:5px;border-left:3px solid rgba(255,255,255,.55);background:rgba(0,0,0,.18);border-radius:5px;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:320px}
#rc-root .theirs .replyQuote{border-left-color:var(--accent);background:var(--panel)}
#rc-root .msgActions{display:none;align-items:center;gap:2px;background:var(--side);border:1px solid var(--border);border-radius:8px;padding:2px;box-shadow:0 4px 12px rgba(0,0,0,.25);z-index:2}
#rc-root .message:hover .msgActions{display:flex}
#rc-root .actBtn{border:0;background:transparent;color:var(--muted);font-size:13px;width:25px;height:25px;border-radius:6px;display:grid;place-items:center;padding:0}
#rc-root .actBtn:hover{background:var(--panel);color:var(--text)}
#rc-root .emojiPicker{position:absolute;bottom:100%;margin-bottom:4px;display:flex;gap:3px;background:var(--side);border:1px solid var(--border);border-radius:999px;padding:3px 6px;box-shadow:0 6px 18px rgba(0,0,0,.35);z-index:4}
#rc-root .mine .emojiPicker{right:0}
#rc-root .theirs .emojiPicker{left:0}
#rc-root .reactionsRow{display:flex;flex-wrap:wrap;gap:4px;margin-top:4px}
#rc-root .reactPill{border:1px solid var(--border);background:var(--side);color:var(--text);border-radius:999px;padding:1px 7px;font-size:.72rem;display:flex;align-items:center;gap:4px}
#rc-root .reactPill.active{border-color:var(--accent);background:rgba(88,101,242,.18)}
#rc-root .system{align-self:center;color:var(--muted);font-size:.73rem;background:var(--side);padding:4px 10px;border-radius:999px;border:1px solid var(--border);text-align:center}
#rc-root .replyBar{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:7px 16px;background:var(--panel);border-top:1px solid var(--border);font-size:.78rem;color:var(--muted)}
#rc-root .replyBar b{color:var(--text)}
#rc-root .composer{display:flex;gap:9px;padding:12px 16px 16px;background:var(--side);border-top:1px solid var(--border)}
#rc-root .composer input{flex:1;border:0;outline:0;border-radius:10px;padding:11px 13px;background:var(--input);color:var(--text)}
#rc-root .composer button{width:46px;border:0;border-radius:10px;background:var(--accent);color:white;font-size:18px}
#rc-root .modalLayer{position:absolute;inset:0;background:rgba(0,0,0,.78);display:grid;place-items:center;padding:18px;z-index:9999}
#rc-root .modal{width:min(520px,100%);max-height:90vh;overflow:auto;background:var(--side);color:var(--text);border:1px solid var(--border);border-radius:16px;padding:22px;box-shadow:0 25px 80px rgba(0,0,0,.6)}
#rc-root .modal h2{font-family:var(--font-brand);font-size:1.15rem;margin:0 0 8px}
#rc-root .modal h3{font-size:.82rem;margin:12px 0 5px;color:var(--text)}
#rc-root .modal p,#rc-root .modal li{color:var(--muted);font-size:.85rem;line-height:1.4}
#rc-root .modal input,#rc-root .modal select,#rc-root .modal textarea{width:100%;border:1px solid var(--border);border-radius:9px;background:var(--bg);color:var(--text);padding:10px;outline:0}
#rc-root .modal .err{color:var(--red);min-height:1.2em;margin:8px 0 0;font-size:.82rem}
#rc-root .row{display:flex;gap:10px;margin-top:16px;flex-wrap:wrap}
#rc-root .row .btn{flex:1;min-width:120px}
#rc-root .kbd{font-family:var(--font-mono);font-size:.72rem;background:var(--panel);border:1px solid var(--border);border-radius:5px;padding:1px 6px;color:var(--text)}
#rc-root .toast{position:absolute;left:50%;bottom:22px;z-index:99999;transform:translate(-50%,15px);background:#09090a;color:white;padding:9px 13px;border-radius:9px;opacity:0;pointer-events:none;transition:.2s;max-width:min(520px,92vw)}
#rc-root .toast.show{opacity:1;transform:translate(-50%,0)}
#rc-root [hidden]{display:none!important}
@media(max-width:960px){#rc-root .app{grid-template-columns:72px 1fr 210px}#rc-root .brand{justify-content:center;padding:8px 4px}#rc-root .brandText,#rc-root .quickLabel,#rc-root .quickHeading,#rc-root .selfInfo{display:none}#rc-root .quickAction{justify-content:center;padding:10px 4px}#rc-root .statsGrid{grid-template-columns:1fr}}
`;
const MARKUP = `
<div class="app">
  <aside class="sidebar">
    <div class="brand">
      <div class="logo">K</div>
      <div class="brandText"><div class="brandTitle">Kairo<span class="beta">v1.2.9</span></div><div id="brandSub" class="brandSub">vault locked</div></div>
      <button id="adminBtn" class="iconBtn" title="Admin login" style="display:none">🔒</button>
    </div>
    <div class="quickHeading">Navigation</div>
    <div class="sideActions">
      <button id="overviewBtn" class="quickAction"><span class="quickIcon">⌂</span><span class="quickLabel">Overview</span></button>
      <button id="profileBtn" class="quickAction"><span class="quickIcon">◉</span><span class="quickLabel">Profile & Status</span></button>
      <button id="addBtn" class="quickAction"><span class="quickIcon">＋</span><span class="quickLabel">New Chat (DM)</span></button>
      <button id="groupBtn" class="quickAction"><span class="quickIcon">＃</span><span class="quickLabel">New Group</span></button>
      <button id="themeBtn" class="quickAction"><span class="quickIcon">🎨</span><span class="quickLabel">Themes & Alerts</span></button>
      <button id="blockedBtn" class="quickAction"><span class="quickIcon">🚫</span><span class="quickLabel">Blocked Users</span></button>
      <button id="lockVaultBtn" class="quickAction"><span class="quickIcon">🔐</span><span class="quickLabel">Lock Account Vault</span></button>
      <button id="helpBtn" class="quickAction"><span class="quickIcon">?</span><span class="quickLabel">Guide & Shortcuts</span></button>
    </div>
    <div id="selfCard" class="selfCard" title="Edit Profile & Status"></div>
  </aside>
  <main class="main">
    <header class="top">
      <div class="topText"><div id="topName" class="topName">Welcome</div><div id="topStatus" class="status"></div></div>
      <input id="searchBox" class="searchInput" type="search" placeholder="Search chat (Ctrl+K)..." hidden>
      <button id="btnClear" class="btn secondary small" hidden>Clear history</button>
      <button id="btnDelete" class="btn danger small" hidden>Delete chat</button>
    </header>
    <div id="updateBanner" class="banner" hidden></div>
    <div id="diag" class="diag" hidden></div>
    <section id="view" class="view"></section>
  </main>
  <aside class="rightbar">
    <div class="rightTop">
      <span>Channels</span>
      <button id="exit" class="iconBtn close" title="Close Kairo">×</button>
    </div>
    <div class="sectionTitle">Direct messages</div><div id="contacts" class="list"></div>
    <div class="sectionTitle">Groups</div><div id="groups" class="list"></div>
  </aside>
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

const SERVER = "https://ntfy.sh";
const MAX_TEXT = 800;
const MAX_CHATS = 20;
const PING_EVERY = 45000;
const PING_FLOOR = 8000;
const LS = "roomchat:";
const VERSION = "1.2.9";
const ADMIN_TOPIC = "kairo-admin-control-6d2c9a81f4b7";
const SURVEY_TOPIC = "kairo-survey-feedback-881a";
const ADMIN_PASSWORD = "";
const EMOJIS = ["👍", "❤️", "😂", "🔥", "👀"];
const origTitle = document.title;

let isAdmin = false;
let adminFeed = null;
let vaultKey = null;

const te = new TextEncoder();
const td = new TextDecoder();
const me = { id: rnd(), name: "", avatar: "", bio: "", status: "online" };
const settings = { theme: "dark", sound: true, titleAlert: true };
const rooms = new Map();
let blockedUsers = new Set();
let activeTopic = null;
let replyingTo = null;
let searchQuery = "";
let es = null;
let esKey = "";
let everOpened = false;

let queue = Promise.resolve();
let readyTimer = null;
let toastTimer = null;
let pingTimer = null;
let pingIdx = 0;
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
  kids.forEach((x) => { if (x != null) e.append(x); });
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

// ---------- sound & tab notifications ----------
function playNotifSound() {
  if (!settings.sound) return;
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.09);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.16);
  } catch {}
}
function updateDocTitle() {
  if (!settings.titleAlert) { document.title = origTitle; return; }
  const totalUnread = Array.from(rooms.values()).reduce((sum, r) => sum + (r.unread || 0), 0);
  document.title = totalUnread > 0 ? "(" + totalUnread + ") Kairo" : origTitle;
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

// ---------- master account vault (#22) ----------
function applyTheme(t) {
  settings.theme = t || "dark";
  if (settings.theme === "dark") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", settings.theme);
}

async function saveVault() {
  if (!vaultKey) return;
  const payload = {
    me,
    settings,
    blocked: Array.from(blockedUsers),
    chats: Array.from(rooms.values(), (r) => r.meta)
  };
  try {
    const enc = await seal(vaultKey, payload);
    lsSet(LS + "vault_v129", enc);
  } catch {}
}

async function unlockAllSavedRooms() {
  for (const r of rooms.values()) {
    if (!r.key && r.meta.pw) {
      try { r.key = await deriveKey(r.meta.room, r.meta.pw); } catch {}
    }
  }
  resubscribe();
  renderSidebar();
  if (!activeTopic) renderWelcome();
}

function promptVaultLogin() {
  checkSecure();
  const rawVault = lsGet(LS + "vault_v129");
  if (rawVault) {
    const box = el("form", { className: "modal" });
    box.append(
      el("h2", { textContent: "Unlock Kairo Account 🔐" }),
      el("p", { textContent: "Enter your Master Password to decrypt your profile, saved contacts, and chat keys." }),
      el("h3", { textContent: "Master Password" })
    );
    const pwInp = el("input", { type: "password", placeholder: "Enter master password...", maxLength: 80 });
    const err = el("p", { className: "err" });
    const unlockBtn = el("button", { type: "submit", className: "btn", textContent: "Unlock Account" });
    const resetBtn = el("button", {
      type: "button",
      className: "btn danger",
      textContent: "Reset Vault",
      onclick: () => {
        if (!confirm("Wipe your saved vault and create a new account on this browser?")) return;
        lsDel(LS + "vault_v129");
        rooms.clear();
        promptVaultLogin();
      }
    });
    box.append(pwInp, err, el("div", { className: "row" }, unlockBtn, resetBtn));
    box.onsubmit = async (e) => {
      e.preventDefault();
      unlockBtn.disabled = true;
      err.textContent = "Decrypting vault...";
      try {
        const k = await deriveKey("kairo-master-vault", pwInp.value);
        const data = await unseal(k, rawVault);
        vaultKey = k;
        Object.assign(me, data.me || {});
        Object.assign(settings, data.settings || {});
        applyTheme(settings.theme);
        blockedUsers = new Set(data.blocked || []);
        rooms.clear();
        (data.chats || []).forEach((meta) => {
          if (meta && meta.topic) rooms.set(meta.topic, makeRoom(meta));
        });
        closeModal();
        toast("Welcome back, " + me.name + "!");
        await unlockAllSavedRooms();
        promptSurvey(false);
      } catch {
        err.textContent = "Incorrect Master Password.";
        unlockBtn.disabled = false;
      }
    };
    showModal(box);
    pwInp.focus();
  } else {
    // First-time Vault creation (migrates any legacy chats)
    const legacyName = lsGet(LS + "name") || "";
    const box = el("form", { className: "modal" });
    box.append(
      el("h2", { textContent: "Create Protected Account 🛡️" }),
      el("p", { textContent: "Set up your Kairo profile and a Master Password. All your contacts and room passwords will be encrypted inside your personal vault." })
    );
    const nameInp = el("input", { type: "text", placeholder: "e.g. arviyarrrr", value: legacyName, maxLength: 20 });
    const avInp = el("input", { type: "text", placeholder: "Emoji or initials (e.g. ⚡, 🦊, AR)", maxLength: 4 });
    const bioInp = el("input", { type: "text", placeholder: "Status bio (optional)", maxLength: 50 });
    const pwInp = el("input", { type: "password", placeholder: "Create Master Password (4+ chars)", maxLength: 80 });
    const err = el("p", { className: "err" });
    const createBtn = el("button", { type: "submit", className: "btn", textContent: "Create & Encrypt Vault" });

    box.append(
      el("h3", { textContent: "Display Name" }), nameInp,
      el("h3", { textContent: "Avatar Emoji / Icon (optional)" }), avInp,
      el("h3", { textContent: "Bio / Custom Status (optional)" }), bioInp,
      el("h3", { textContent: "Master Password" }), pwInp,
      err,
      el("div", { className: "row" }, createBtn)
    );
    box.onsubmit = async (e) => {
      e.preventDefault();
      const n = nameInp.value.trim();
      const pw = pwInp.value;
      if (!n) { err.textContent = "Enter a display name."; return; }
      if (pw.length < 4) { err.textContent = "Use a Master Password with at least 4 characters."; return; }
      createBtn.disabled = true;
      try {
        vaultKey = await deriveKey("kairo-master-vault", pw);
        me.name = n.slice(0, 20);
        me.avatar = avInp.value.trim().slice(0, 4);
        me.bio = bioInp.value.trim().slice(0, 50);
        loadLegacyChats();
        await saveVault();
        closeModal();
        renderSidebar();
        renderWelcome();
        promptSurvey(false);
      } catch (ex) {
        err.textContent = ex.message || "Could not create vault.";
        createBtn.disabled = false;
      }
    };
    showModal(box);
    nameInp.focus();
  }
}

function lockVaultSession() {
  vaultKey = null;
  if (es) { es.close(); es = null; esKey = ""; }
  rooms.forEach((r) => { r.key = null; r.ready = false; });
  activeTopic = null;
  setStatus("vault locked");
  renderWelcome();
  promptVaultLogin();
}

// ---------- blocked users ----------
function isBlocked(name) {
  return blockedUsers.has(String(name || "").toLowerCase());
}
function toggleBlockUser(name) {
  const key = String(name || "").trim().toLowerCase();
  if (!key) return;
  if (blockedUsers.has(key)) {
    blockedUsers.delete(key);
    toast("Unblocked " + name);
  } else {
    blockedUsers.add(key);
    toast("Blocked " + name);
  }
  saveVault();
  if (activeTopic) renderChatLog(true);
}
function showBlockedModal() {
  const list = Array.from(blockedUsers);
  const box = el("div", { className: "modal" },
    el("h2", { textContent: "Blocked Users" }),
    el("p", { textContent: list.length ? "Messages from these display names are hidden:" : "You haven't blocked anyone yet." })
  );
  if (list.length) {
    const ul = el("div", { style: "display:flex;flex-direction:column;gap:6px;margin-top:10px" });
    list.forEach((u) => {
      const row = el("div", { style: "display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:var(--panel);border-radius:8px" },
        el("span", { textContent: u, style: "font-weight:700" }),
        el("button", {
          type: "button",
          className: "btn secondary small",
          textContent: "Unblock",
          onclick: () => { toggleBlockUser(u); showBlockedModal(); }
        })
      );
      ul.append(row);
    });
    box.append(ul);
  }
  box.append(el("div", { className: "row" }, el("button", { type: "button", className: "btn", textContent: "Done", onclick: closeModal })));
  showModal(box);
}

// ---------- themes & notification settings (#14 & #15) ----------
function showThemeSettings() {
  const box = el("form", { className: "modal" });
  box.append(
    el("h2", { textContent: "Themes & Notifications 🎨" }),
    el("p", { textContent: "Customize your Kairo workspace appearance and alert preferences." }),
    el("h3", { textContent: "Color Theme" })
  );
  const themeSel = el("select", {},
    el("option", { value: "dark", textContent: "Midnight Dark (Default)" }),
    el("option", { value: "cyberpunk", textContent: "Cyberpunk Neon" }),
    el("option", { value: "emerald", textContent: "Emerald Forest" }),
    el("option", { value: "crimson", textContent: "Crimson Velvet" }),
    el("option", { value: "light", textContent: "Daylight Mode" })
  );
  themeSel.value = settings.theme || "dark";
  themeSel.onchange = () => applyTheme(themeSel.value);

  const soundSel = el("select", {},
    el("option", { value: "on", textContent: "Enabled (Synthesized Chime)" }),
    el("option", { value: "off", textContent: "Muted" })
  );
  soundSel.value = settings.sound ? "on" : "off";

  const tabSel = el("select", {},
    el("option", { value: "on", textContent: "Show Unread Count in Tab Title" }),
    el("option", { value: "off", textContent: "Keep Original Tab Title" })
  );
  tabSel.value = settings.titleAlert ? "on" : "off";

  const saveBtn = el("button", { type: "submit", className: "btn", textContent: "Save Preferences" });
  box.append(
    themeSel,
    el("h3", { textContent: "Message Sound Effects" }), soundSel,
    el("h3", { textContent: "Tab Title Badge" }), tabSel,
    el("div", { className: "row" }, saveBtn)
  );
  box.onsubmit = async (e) => {
    e.preventDefault();
    applyTheme(themeSel.value);
    settings.sound = soundSel.value === "on";
    settings.titleAlert = tabSel.value === "on";
    updateDocTitle();
    await saveVault();
    closeModal();
    toast("Preferences saved!");
  };
  showModal(box);
}

// ---------- survey feature ----------
function promptSurvey(force) {
  if (!force && lsGet(LS + "surveyAnswered_v127")) return;
  const box = el("form", { className: "modal" });
  box.append(
    el("h2", { textContent: "Help Shape Kairo 🚀" }),
    el("p", { textContent: "We are designing the next major upgrade for Kairo. Tell us what feature matters to you most!" }),
    el("h3", { textContent: "What should we add next?" })
  );
  const select = el("select", {},
    el("option", { value: "media", textContent: "Phase 3: Voice Messages, Image Sharing, GIFs & Pins" }),
    el("option", { value: "webrtc", textContent: "Phase 4: Live Voice Calling, Typing Indicators & Read Receipts" }),
    el("option", { value: "other", textContent: "Something else" })
  );
  const thoughts = el("textarea", {
    placeholder: "Any ideas, feature requests, or notes for the developer? (optional)",
    rows: 3,
    maxLength: 300
  });
  const err = el("p", { className: "err" });
  const sendBtn = el("button", { type: "submit", className: "btn", textContent: "Submit Feedback" });
  const skipBtn = el("button", {
    type: "button",
    className: "btn secondary",
    textContent: "Skip",
    onclick: () => {
      lsSet(LS + "surveyAnswered_v127", "skipped");
      closeModal();
    }
  });
  box.append(select, el("h3", { textContent: "Your Thoughts:" }), thoughts, err, el("div", { className: "row" }, sendBtn, skipBtn));
  box.onsubmit = async (e) => {
    e.preventDefault();
    sendBtn.disabled = true;
    err.textContent = "Submitting feedback...";
    try {
      const payload = { vote: select.value, notes: thoughts.value.trim(), user: me.name || "Anonymous", version: VERSION, time: new Date().toISOString() };
      await fetch(SERVER + "/" + SURVEY_TOPIC, { method: "POST", body: JSON.stringify(payload) });
      lsSet(LS + "surveyAnswered_v127", "submitted");
      toast("Thanks! Your feedback was sent.");
      closeModal();
    } catch {
      lsSet(LS + "surveyAnswered_v127", "failed");
      closeModal();
    }
  };
  showModal(box);
}

// ---------- admin feed and update notices ----------
async function getAdminKey() {
  return deriveKey("admin|" + ADMIN_TOPIC, ADMIN_PASSWORD);
}
async function verifyAdminPacket(raw) {
  try {
    if (!raw || !ADMIN_PASSWORD) return null;
    const key = await getAdminKey();
    return await unseal(key, typeof raw === "string" ? raw : JSON.stringify(raw));
  } catch { return null; }
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
  if (!ADMIN_PASSWORD) return;
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
  if (!ADMIN_PASSWORD) return;
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

// ---------- saved chats & drafts ----------
function persistRoom(r) { lsSet(LS + "t:" + r.meta.topic, JSON.stringify(r.store)); }
function saveChats() { saveVault(); }
function getDraft(topic) { return lsGet(LS + "draft:" + topic) || ""; }
function setDraft(topic, val) {
  if (!val) lsDel(LS + "draft:" + topic);
  else lsSet(LS + "draft:" + topic, val);
}
function makeRoom(meta) {
  let store = { msgs: [], lastSrv: 0 };
  try { store = Object.assign(store, JSON.parse(lsGet(LS + "t:" + meta.topic) || "{}")); } catch {}
  return {
    meta, key: null, store,
    seen: new Set(store.msgs.map((m) => m.id)),
    people: new Map(), unread: 0, ready: false, helloSent: false,
  };
}
function loadLegacyChats() {
  let list = [];
  try { list = JSON.parse(lsGet(LS + "chats") || "[]"); } catch {}
  list.forEach((meta) => { if (meta && meta.topic && !rooms.has(meta.topic)) rooms.set(meta.topic, makeRoom(meta)); });
}

// ---------- sending ----------
async function post(r, kind, extra) {
  if ((kind === "h" || kind === "p") && me.status === "invisible") return;
  const m = Object.assign({
    i: me.id,
    k: kind,
    name: me.name,
    av: me.avatar || "",
    bio: me.bio || "",
    st: me.status || "online",
    t: Date.now()
  }, extra || {});
  const body = await seal(r.key, m);
  const resp = await fetch(SERVER + "/" + r.meta.topic, { method: "POST", body });
  if (!resp.ok) throw new Error(resp.status === 429 ? "rate limited, slow down a little" : "server said " + resp.status);
}

// ---------- sidebars ----------
function pingGap() {
  const n = Math.max(1, Array.from(rooms.values()).filter((r) => r.key).length);
  return Math.max(PING_FLOOR, PING_EVERY / n);
}
function onlineMs() {
  const n = Math.max(1, Array.from(rooms.values()).filter((r) => r.key).length);
  return Math.max(110000, pingGap() * n * 2.5);
}
function activePeople(r) {
  const now = Date.now();
  const limit = onlineMs();
  const list = [];
  r.people.forEach((p) => { if (now - p.last < limit && p.st !== "invisible") list.push(p); });
  return list;
}
function chatItem(r) {
  const topic = r.meta.topic;
  const locked = !r.key;
  const isDm = r.meta.type === "dm";
  const onlineList = locked ? [] : activePeople(r);
  const draft = getDraft(topic);
  const peer = onlineList[0];
  const subText = locked ? "locked · click to unlock"
    : isDm ? (peer ? (peer.bio ? peer.st + " · " + peer.bio : peer.st) : "offline")
    : (onlineList.length ? onlineList.length + " online" : "just you");
  const avText = isDm ? (peer && peer.av ? peer.av : initials(r.meta.title)) : (r.meta.icon || "#");
  const avatar = el("div", { className: "avatar", textContent: avText });
  if (isDm) {
    const pState = peer ? (peer.st || "online") : "";
    avatar.append(el("span", { className: "presence" + (pState ? " " + pState : "") }));
  }
  const subEl = el("div", { className: "itemSub" });
  if (draft && topic !== activeTopic) {
    subEl.append(el("span", { className: "draftTag", textContent: "Draft: " }), document.createTextNode(draft));
  } else {
    subEl.textContent = subText;
  }
  const item = el("button", { type: "button", className: "item" + (topic === activeTopic ? " active" : "") },
    avatar,
    el("div", { className: "itemText" },
      el("div", { className: "itemName", textContent: (locked ? "🔒 " : "") + r.meta.title }),
      subEl));
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

  const sc = $("selfCard");
  sc.innerHTML = "";
  const myAv = el("div", { className: "avatar", textContent: me.avatar || initials(me.name || "?") });
  myAv.append(el("span", { className: "presence " + (me.status === "invisible" ? "" : (me.status || "online")) }));
  sc.append(
    myAv,
    el("div", { className: "selfInfo" },
      el("div", { className: "selfName", textContent: me.name || "Set up profile" }),
      el("div", { className: "selfBio", textContent: me.bio || (me.status + " · " + all.length + "/" + MAX_CHATS + " chats") })
    )
  );
  updateDocTitle();
}
function updateTop() {
  const r = rooms.get(activeTopic);
  if (!r) return;
  const list = activePeople(r);
  const isDm = r.meta.type === "dm";
  $("topName").textContent = (isDm ? "@ " : (r.meta.icon || "#") + " ") + r.meta.title;
  if (isDm) {
    const peer = list[0];
    $("topStatus").textContent = peer ? (peer.st + (peer.bio ? " — " + peer.bio : "")) : "offline";
    $("topStatus").className = "status" + (peer ? " online" : "");
  } else {
    $("topStatus").textContent = "Online: You" + (list.length ? ", " + list.map((x) => x.name).join(", ") : "");
    $("topStatus").className = "status";
  }
}

// ---------- chat view & interactive messages ----------
function setReply(m) {
  replyingTo = m ? { id: m.id, who: m.who, text: String(m.text || "").slice(0, 90) } : null;
  const bar = $("replyBar");
  if (!bar) return;
  if (!replyingTo) { bar.hidden = true; bar.innerHTML = ""; return; }
  bar.hidden = false;
  bar.innerHTML = "";
  bar.append(
    el("span", {}, document.createTextNode("Replying to "), el("b", { textContent: replyingTo.who }), document.createTextNode(": “" + replyingTo.text + "”")),
    el("button", { type: "button", className: "iconBtn", textContent: "×", onclick: () => setReply(null) })
  );
  const inp = $("msg");
  if (inp) inp.focus();
}

async function sendReaction(r, targetId, emoji) {
  try {
    await post(r, "react", { targetId, emoji });
    applyReaction(r, targetId, emoji, me.name);
  } catch (e) { toast("Couldn't react: " + (e.message || "error")); }
}

function applyReaction(r, targetId, emoji, who) {
  const msg = r.store.msgs.find((x) => x.id === targetId);
  if (!msg || msg.deleted) return;
  if (!msg.reactions) msg.reactions = {};
  if (!Array.isArray(msg.reactions[emoji])) msg.reactions[emoji] = [];
  const idx = msg.reactions[emoji].indexOf(who);
  if (idx >= 0) {
    msg.reactions[emoji].splice(idx, 1);
    if (!msg.reactions[emoji].length) delete msg.reactions[emoji];
  } else {
    msg.reactions[emoji].push(who);
  }
  persistRoom(r);
  if (r.meta.topic === activeTopic) renderChatLog(true);
}

function promptEditMessage(r, m) {
  modal("Edit message", "Update your message for everyone in this chat.",
    [{ id: "t", label: "Message text", value: m.text, max: MAX_TEXT }], "Save changes",
    async (v) => {
      const next = v.t.trim().slice(0, MAX_TEXT);
      if (!next || next === m.text) return;
      await post(r, "edit", { targetId: m.id, text: next });
      m.text = next;
      m.edited = true;
      persistRoom(r);
      renderChatLog(true);
    });
}

async function deleteMessage(r, m) {
  if (!confirm("Delete this message for everyone in the chat?")) return;
  try {
    await post(r, "del", { targetId: m.id });
    m.text = "This message was deleted.";
    m.deleted = true;
    m.reactions = {};
    persistRoom(r);
    renderChatLog(true);
  } catch (e) { toast("Couldn't delete: " + (e.message || "error")); }
}

function buildMessage(r, m) {
  const mine = m.mine;
  const who = m.who;
  const meta = el("div", { className: "meta" },
    el("b", { textContent: mine ? "You" : who }),
    el("span", { textContent: new Date(m.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }));

  const bubble = el("div", { className: "bubble" + (m.deleted ? " deleted" : "") });
  if (m.replyTo && !m.deleted) {
    const q = el("div", {
      className: "replyQuote",
      textContent: "↩ " + m.replyTo.who + ": " + m.replyTo.text,
      onclick: () => {
        const target = root.querySelector('[data-mid="' + m.replyTo.id + '"] .bubble');
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
          target.style.boxShadow = "0 0 0 2px var(--accent)";
          setTimeout(() => { target.style.boxShadow = ""; }, 1400);
        }
      }
    });
    bubble.append(q);
  }
  bubble.append(meta, document.createTextNode(m.text));
  if (m.edited && !m.deleted) bubble.append(el("span", { className: "editedTag", textContent: "(edited)" }));

  const actions = el("div", { className: "msgActions" });
  if (!m.deleted) {
    const reactBtn = el("button", {
      type: "button",
      className: "actBtn",
      title: "React",
      textContent: "😀",
      onclick: (ev) => {
        ev.stopPropagation();
        const existing = wrap.querySelector(".emojiPicker");
        if (existing) { existing.remove(); return; }
        const picker = el("div", { className: "emojiPicker" },
          ...EMOJIS.map((em) => el("button", {
            type: "button",
            className: "actBtn",
            textContent: em,
            onclick: (e2) => { e2.stopPropagation(); picker.remove(); sendReaction(r, m.id, em); }
          }))
        );
        wrap.append(picker);
      }
    });
    const replyBtn = el("button", { type: "button", className: "actBtn", title: "Reply", textContent: "↩", onclick: () => setReply(m) });
    actions.append(reactBtn, replyBtn);
    if (mine) {
      actions.append(
        el("button", { type: "button", className: "actBtn", title: "Edit message", textContent: "✎", onclick: () => promptEditMessage(r, m) }),
        el("button", { type: "button", className: "actBtn", title: "Delete message", textContent: "🗑", onclick: () => deleteMessage(r, m) })
      );
    } else {
      actions.append(
        el("button", { type: "button", className: "actBtn", title: "Block " + who, textContent: "🚫", onclick: () => toggleBlockUser(who) })
      );
    }
  }

  const wrap = el("div", { className: "bubbleWrap" }, bubble, actions);
  const col = el("div", { className: "msgCol" }, wrap);

  if (m.reactions && Object.keys(m.reactions).length && !m.deleted) {
    const rRow = el("div", { className: "reactionsRow" });
    Object.entries(m.reactions).forEach(([em, users]) => {
      if (!users || !users.length) return;
      const active = users.includes(me.name);
      rRow.append(el("button", {
        type: "button",
        className: "reactPill" + (active ? " active" : ""),
        title: users.join(", "),
        textContent: em + " " + users.length,
        onclick: () => sendReaction(r, m.id, em)
      }));
    });
    col.append(rRow);
  }

  const avText = mine ? (me.avatar || initials(me.name)) : (m.av || initials(who));
  const row = el("div", { className: "message " + (mine ? "mine" : "theirs") },
    el("div", { className: "avatar", textContent: avText, title: who }),
    col
  );
  row.setAttribute("data-mid", m.id);
  return row;
}

function scrollLog() { const l = $("log"); if (l) l.scrollTop = l.scrollHeight; }
function addSystem(text) { const l = $("log"); if (l) { l.append(el("div", { className: "system", textContent: text })); scrollLog(); } }

function renderChatLog(keepScroll) {
  const r = rooms.get(activeTopic);
  const l = $("log");
  if (!r || !l) return;
  const prevScroll = l.scrollTop;
  const atBottom = l.scrollHeight - l.scrollTop - l.clientHeight < 50;
  l.innerHTML = "";
  const q = searchQuery.trim().toLowerCase();
  const visible = r.store.msgs.filter((m) => {
    if (!m.mine && isBlocked(m.who)) return false;
    if (q && !String(m.text || "").toLowerCase().includes(q) && !String(m.who || "").toLowerCase().includes(q)) return false;
    return true;
  });
  visible.forEach((m) => l.append(buildMessage(r, m)));
  if (!q) {
    const isDm = r.meta.type === "dm";
    l.append(el("div", {
      className: "system",
      textContent: isDm
        ? "Direct message with " + r.meta.title + ". Hover any message to reply, react, edit, or delete."
        : "Group “" + r.meta.title + "”. Hover any message to reply, react, edit, or delete."
    }));
  } else if (!visible.length) {
    l.append(el("div", { className: "system", textContent: "No messages match “" + searchQuery + "”." }));
  }
  if (!keepScroll || atBottom) scrollLog();
  else l.scrollTop = prevScroll;
}

function renderWelcome() {
  activeTopic = null;
  replyingTo = null;
  searchQuery = "";
  $("topName").textContent = "Welcome";
  $("topStatus").textContent = "";
  $("topStatus").className = "status";
  $("searchBox").hidden = true;
  $("searchBox").value = "";
  $("btnClear").hidden = true;
  $("btnDelete").hidden = true;

  const emblem = el("button", { type: "button", className: "emblemRing", title: "Start a chat", onclick: startAdd },
    el("div", { className: "emblemCore", textContent: "\u2709\uFE0F" }));
  const start = el("button", { className: "pillBtn", textContent: "+ Start a chat", onclick: startAdd });
  const help = el("button", { className: "pillBtn ghost", textContent: "How it works", onclick: showHelp });

  const allChats = Array.from(rooms.values());
  const unlockedChats = allChats.filter((r) => r.key).length;

  const stats = el("div", { className: "statsGrid" },
    el("div", { className: "statCard" },
      el("div", { className: "statTop" },
        el("div", { className: "statLabel", textContent: "Account Vault" })
      ),
      el("div", { className: "statValue", textContent: vaultKey ? "UNLOCKED" : "LOCKED" }),
      el("div", { className: "statSub", textContent: "AES-256 · PBKDF2 Protected" })
    ),
    el("div", { className: "statCard" },
      el("div", { className: "statTop" },
        el("div", { className: "statLabel", textContent: "Active Chats" })
      ),
      el("div", { className: "statValue", textContent: unlockedChats + " / " + allChats.length }),
      el("div", { className: "statSub", textContent: "Auto-unlocked via Vault" })
    ),
    el("div", { className: "statCard" },
      el("div", { className: "statTop" },
        el("div", { className: "statLabel", textContent: "Live Updates" }),
        el("span", { className: "pulseDot", title: "Active live updates" })
      ),
      el("div", { className: "statValue", textContent: "ONLINE" }),
      el("div", { className: "statSub", textContent: "ntfy · SSE Stream" })
    )
  );

  $("view").innerHTML = "";
  $("view").append(el("div", { className: "empty" },
    emblem,
    el("div", { className: "stageTitle", textContent: "Kairo" }),
    el("p", { className: "stageSub", textContent: "Your contacts, custom profile, and chat keys are protected by your Master Vault password. Messages are encrypted before leaving your browser." }),
    el("div", { className: "pillRow" }, start, help),
    stats
  ));
  renderSidebar();
}

function openChat(id) {
  const r = rooms.get(id);
  if (!r) return;
  if (!r.key) return askUnlock(r);
  activeTopic = id;
  replyingTo = null;
  searchQuery = "";
  $("searchBox").value = "";
  $("searchBox").hidden = false;
  r.unread = 0;
  const isDm = r.meta.type === "dm";
  const input = el("input", {
    id: "msg",
    maxLength: MAX_TEXT,
    autocomplete: "off",
    value: getDraft(id),
    placeholder: "Message " + (isDm ? r.meta.title : "#" + r.meta.title),
    oninput: (e) => { setDraft(id, e.target.value); renderSidebar(); }
  });
  const replyBar = el("div", { id: "replyBar", className: "replyBar", hidden: true });
  const form = el("form", { id: "form", className: "composer" }, input, el("button", { textContent: "➤" }));
  form.onsubmit = sendMessage;
  $("view").innerHTML = "";
  $("view").append(el("div", { id: "log", className: "log" }), replyBar, form);
  renderChatLog(false);
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
  if (isBlocked(who)) return;
  const isActive = r.meta.topic === activeTopic;

  // Update DM title if the OTHER person changed their display name (never overwrite with our own name)
  if (r.meta.type === "dm" && who.toLowerCase() !== me.name.toLowerCase() && r.meta.title !== who) {
    r.meta.title = who;
    saveChats();
    if (isActive) updateTop();
    renderSidebar();
  }

  r.people.set(m.i, {
    name: who,
    av: String(m.av || "").slice(0, 4),
    bio: String(m.bio || "").slice(0, 50),
    st: String(m.st || "online"),
    last: Date.now()
  });

  if (m.k === "m") {
    if (!m.id || r.seen.has(m.id)) return;
    r.seen.add(m.id);
    const rec = {
      id: m.id,
      who,
      av: String(m.av || "").slice(0, 4),
      text: String(m.text || "").slice(0, MAX_TEXT),
      mine: false,
      time: m.t || Date.now(),
      replyTo: m.replyTo || null,
      reactions: {}
    };
    r.store.msgs.push(rec);
    if (r.store.msgs.length > 300) r.store.msgs = r.store.msgs.slice(-300);
    persistRoom(r);
    playNotifSound();
    if (isActive) renderChatLog(false); else { r.unread++; renderSidebar(); }
    return;
  }
  if (m.k === "react" && m.targetId && m.emoji) {
    applyReaction(r, m.targetId, String(m.emoji).slice(0, 8), who);
    return;
  }
  if (m.k === "edit" && m.targetId) {
    const target = r.store.msgs.find((x) => x.id === m.targetId);
    if (target && !target.mine && !target.deleted) {
      target.text = String(m.text || "").slice(0, MAX_TEXT);
      target.edited = true;
      persistRoom(r);
      if (isActive) renderChatLog(true);
    }
    return;
  }
  if (m.k === "del" && m.targetId) {
    const target = r.store.msgs.find((x) => x.id === m.targetId);
    if (target && !target.mine) {
      target.text = "This message was deleted.";
      target.deleted = true;
      target.reactions = {};
      persistRoom(r);
      if (isActive) renderChatLog(true);
    }
    return;
  }
  if (!r.ready) return;
  if (m.k === "h") {
    if (isActive) addSystem(who + " joined");
    setTimeout(() => post(r, "p").catch(() => {}), Math.random() * 1500);
  } else if (m.k === "b") {
    if (r.people.delete(m.i) && isActive) addSystem(who + " left");
  }
  if (isActive) updateTop();
  renderSidebar();
}

function resubscribe() {
  const open = Array.from(rooms.values()).filter((r) => r.key);
  const k = open.map((r) => r.meta.topic).join(",");
  if (k === esKey) return;
  if (es) { es.close(); es = null; }
  esKey = k;
  open.forEach((r) => { r.ready = false; });
  if (!open.length) { setStatus(vaultKey ? "no chat unlocked" : "vault locked"); return; }
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
    "Your Account Vault encrypts your profile, contacts, and room passwords with one Master Password.",
    "Hover any message in chat to Reply (↩), React (😀), Edit (✎), Delete (🗑), or Block (🚫).",
    "Change your online status, avatar emoji, or color theme anytime from the left sidebar.",
  ];
  const shortcuts = [
    ["Alt + N", "Start a new Direct Message"],
    ["Alt + G", "Create or join a Group"],
    ["Ctrl + K", "Focus chat search box"],
    ["Esc", "Close dialog / cancel reply / clear search"],
  ];
  const scList = el("div", { style: "display:grid;gap:6px;margin-top:8px" },
    ...shortcuts.map(([k, desc]) => el("div", { style: "display:flex;justify-content:space-between;font-size:.82rem;color:var(--muted)" },
      el("span", { className: "kbd", textContent: k }),
      el("span", { textContent: desc })
    ))
  );
  const box = el("div", { className: "modal" },
    el("h2", { textContent: "Kairo v1.2.9 Guide" }),
    el("ol", {}, ...steps.map((s) => el("li", { textContent: s }))),
    el("h3", { textContent: "Keyboard Shortcuts" }),
    scList,
    el("div", { className: "row" },
      el("button", { className: "btn secondary", textContent: "Take Survey", onclick: () => promptSurvey(true) }),
      el("button", { className: "btn", textContent: "Got it", onclick: closeModal })
    ));
  showModal(box);
}

// ---------- rich profile & status modal (#6 & #7) ----------
function profile() {
  if (!vaultKey) return promptVaultLogin();
  const box = el("form", { className: "modal" });
  box.append(
    el("h2", { textContent: "Your Profile & Presence ◉" }),
    el("p", { textContent: "Customize how others see you in chats. Saved inside your encrypted vault." })
  );
  const nameInp = el("input", { type: "text", value: me.name, maxLength: 20 });
  const avInp = el("input", { type: "text", value: me.avatar || "", placeholder: "Emoji or initials (e.g. ⚡, 🐉, AK)", maxLength: 4 });
  const bioInp = el("input", { type: "text", value: me.bio || "", placeholder: "What are you up to?", maxLength: 50 });
  const stSel = el("select", {},
    el("option", { value: "online", textContent: "🟢 Online" }),
    el("option", { value: "idle", textContent: "🌙 Idle / Away" }),
    el("option", { value: "dnd", textContent: "⛔ Do Not Disturb" }),
    el("option", { value: "invisible", textContent: "👻 Invisible (Appear Offline)" })
  );
  stSel.value = me.status || "online";

  const err = el("p", { className: "err" });
  const saveBtn = el("button", { type: "submit", className: "btn", textContent: "Save Profile" });
  const cancelBtn = el("button", { type: "button", className: "btn secondary", textContent: "Cancel", onclick: closeModal });

  box.append(
    el("h3", { textContent: "Display Name" }), nameInp,
    el("h3", { textContent: "Custom Avatar Emoji / Icon" }), avInp,
    el("h3", { textContent: "Bio / Status Note" }), bioInp,
    el("h3", { textContent: "Online Presence" }), stSel,
    err,
    el("div", { className: "row" }, saveBtn, cancelBtn)
  );

  box.onsubmit = async (e) => {
    e.preventDefault();
    const n = nameInp.value.trim();
    if (!n) { err.textContent = "Enter a display name."; return; }
    me.name = n.slice(0, 20);
    me.avatar = avInp.value.trim().slice(0, 4);
    me.bio = bioInp.value.trim().slice(0, 50);
    me.status = stSel.value;
    await saveVault();
    renderSidebar();
    if (activeTopic) renderChatLog(true);
    else renderWelcome();
    closeModal();
    toast("Profile updated!");
  };
  showModal(box);
}

async function createChat(type, label, pw, icon) {
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
    r = makeRoom({ topic, type, title, room, pw, icon: (icon || "").trim().slice(0, 4) });
    rooms.set(topic, r);
  } else {
    r.meta.pw = pw;
    if (icon) r.meta.icon = icon.trim().slice(0, 4);
  }
  r.key = key;
  await saveVault();
  resubscribe();
  openChat(topic);
}

function askUnlock(r) {
  modal("Unlock “" + r.meta.title + "”", "Enter this chat's password to unlock it and save it to your Vault.",
    [{ id: "p", label: "Password", type: "password" }], "Unlock",
    async (v) => {
      checkSecure();
      const topic = await topicFor(r.meta.room, v.p);
      if (topic !== r.meta.topic) throw new Error("That password doesn't match this chat.");
      r.key = await deriveKey(r.meta.room, v.p);
      r.meta.pw = v.p;
      await saveVault();
      resubscribe();
      openChat(r.meta.topic);
    });
}

function startAdd() {
  if (!vaultKey) return promptVaultLogin();
  modal("New direct message",
    "Type their name and agree on a shared password. Your Vault will remember this chat and its key.",
    [{ id: "f", label: "Their name", max: 20 }, { id: "p", label: "Shared password", type: "password" }], "Start DM",
    (v) => createChat("dm", v.f, v.p));
}
function startGroup() {
  if (!vaultKey) return promptVaultLogin();
  modal("New or existing group",
    "Pick a group name, optional group emoji avatar, and shared password.",
    [
      { id: "f", label: "Group name", max: 40 },
      { id: "i", label: "Group Avatar Emoji (optional, e.g. 🎮, 🔥)", max: 4 },
      { id: "p", label: "Group password", type: "password" }
    ], "Create / join",
    (v) => createChat("group", v.f, v.p, v.i));
}

// ---------- actions ----------
async function sendMessage(e) {
  e.preventDefault();
  const r = rooms.get(activeTopic);
  const input = $("msg");
  const text = input.value.trim().slice(0, MAX_TEXT);
  if (!r || !r.key || !text) return;
  const id = rnd();
  const replyPayload = replyingTo ? Object.assign({}, replyingTo) : null;
  try {
    await post(r, "m", { id, text, replyTo: replyPayload });
  } catch (err) {
    addSystem("Couldn't send: " + (err && err.message ? err.message : "network error") + ". Your text is still in the box.");
    return;
  }
  r.seen.add(id);
  const rec = { id, who: me.name, av: me.avatar || "", text, mine: true, time: Date.now(), replyTo: replyPayload, reactions: {} };
  r.store.msgs.push(rec);
  if (r.store.msgs.length > 300) r.store.msgs = r.store.msgs.slice(-300);
  persistRoom(r);
  input.value = "";
  setDraft(activeTopic, "");
  setReply(null);
  renderChatLog(false);
  renderSidebar();
}

$("searchBox").oninput = (e) => {
  searchQuery = e.target.value;
  renderChatLog(true);
};

$("btnClear").onclick = () => {
  const r = rooms.get(activeTopic);
  if (!r || !confirm("Delete the saved history for this chat on this device?")) return;
  r.store.msgs = [];
  persistRoom(r);
  renderChatLog(false);
};
$("btnDelete").onclick = async () => {
  const r = rooms.get(activeTopic);
  if (!r || !confirm("Remove “" + r.meta.title + "” and its saved history from your Vault?")) return;
  if (r.key) { try { await post(r, "b"); } catch {} }
  rooms.delete(r.meta.topic);
  lsDel(LS + "t:" + r.meta.topic);
  lsDel(LS + "draft:" + r.meta.topic);
  await saveVault();
  resubscribe();
  renderWelcome();
};

$("themeBtn").onclick = showThemeSettings;
$("overviewBtn").onclick = renderWelcome;
$("addBtn").onclick = startAdd;
$("groupBtn").onclick = startGroup;
$("blockedBtn").onclick = showBlockedModal;
$("lockVaultBtn").onclick = lockVaultSession;
$("helpBtn").onclick = showHelp;
$("profileBtn").onclick = profile;
$("selfCard").onclick = profile;

function onKeyDown(e) {
  if (!document.getElementById("rc-root")) return;
  if (e.key === "Escape") {
    if ($("modalHost").innerHTML && vaultKey) { closeModal(); return; }
    if (replyingTo) { setReply(null); return; }
    if (searchQuery) { $("searchBox").value = ""; searchQuery = ""; renderChatLog(true); return; }
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    if (activeTopic && !$("searchBox").hidden) {
      e.preventDefault();
      $("searchBox").focus();
    }
  }
  if (e.altKey && e.key.toLowerCase() === "n") { e.preventDefault(); startAdd(); }
  if (e.altKey && e.key.toLowerCase() === "g") { e.preventDefault(); startGroup(); }
}
window.addEventListener("keydown", onKeyDown);
root.addEventListener("click", () => {
  root.querySelectorAll(".emojiPicker").forEach((p) => p.remove());
});

$("exit").onclick = () => {
  document.title = origTitle;
  window.removeEventListener("keydown", onKeyDown);
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
function pingNext() {
  const open = Array.from(rooms.values()).filter((r) => r.key && r.ready);
  if (open.length) { const r = open[pingIdx++ % open.length]; post(r, "p").catch(() => {}); }
  pingTimer = setTimeout(pingNext, pingGap());
}
pingTimer = setTimeout(pingNext, pingGap());
timers.push(setInterval(() => { renderSidebar(); updateTop(); }, 5000));

renderWelcome();
promptVaultLogin();
checkForUpdate();
startAdminFeed();

})();