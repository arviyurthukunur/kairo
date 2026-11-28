// Kairo v2.1.0 (security update)
// Paste into your browser console or update kairo.js

(() => {
"use strict";

// Only run on Kairo's own web page. Old bookmarks just get sent there.
const APP_URL = "https://arviyurthukunur.github.io/kairo/";
if (location.origin !== "https://arviyurthukunur.github.io" || !location.pathname.startsWith("/kairo/") || window.top !== window.self) {
  if (confirm("For your safety, Kairo now only runs on its own page. Open it?")) window.open(APP_URL, "_blank", "noopener,noreferrer");
  return;
}

const prev = document.getElementById("rc-root");
if (prev) prev.remove();
const prevStyle = document.getElementById("rc-style");
if (prevStyle) prevStyle.remove();
if (!document.getElementById("kairo-fonts")) {
  const fontLink = document.createElement("link");
  fontLink.id = "kairo-fonts";
  fontLink.rel = "stylesheet";
  fontLink.href = "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Unbounded:wght@500;600;700;800;900&display=swap";
  (document.head || document.documentElement).appendChild(fontLink);
}

const origBodyOverflow = document.body ? document.body.style.overflow : "";
const origHtmlOverflow = document.documentElement ? document.documentElement.style.overflow : "";
if (document.body) document.body.style.overflow = "hidden";
if (document.documentElement) document.documentElement.style.overflow = "hidden";

const CSS = `
#rc-root{all:initial;--bg:#0f1012;--side:#16171a;--panel:#222429;--chat:#1a1b1e;--input:#26282e;--text:#f3f4f6;--muted:#8e95a2;--accent:#5865f2;--accent2:#4752c4;--border:#2b2d33;--green:#23a55a;--amber:#f0b232;--red:#ef4444;--font-brand:'Unbounded',system-ui,sans-serif;--font-sans:'Plus Jakarta Sans',system-ui,-apple-system,sans-serif;--font-mono:'JetBrains Mono',ui-monospace,Consolas,monospace;position:fixed;inset:0;width:100vw;height:100vh;z-index:2147483647;background:var(--bg);color:var(--text);font:14px/1.45 var(--font-sans);box-sizing:border-box;-webkit-font-smoothing:antialiased;display:block;overflow:hidden}
#rc-root[data-theme="light"]{--bg:#eef0f4;--side:#ffffff;--panel:#ebedef;--chat:#f7f8fa;--input:#e3e5e8;--text:#1f2328;--muted:#5c6370;--accent:#5865f2;--accent2:#4752c4;--border:#d8dee4;--green:#1a7f37;--amber:#d97706;--red:#cf222e}
#rc-root[data-theme="cyberpunk"]{--bg:#090614;--side:#120d24;--panel:#1e1638;--chat:#16102b;--input:#251b45;--text:#f8f0ff;--muted:#a38ec4;--accent:#ff2a85;--accent2:#d91b6b;--border:#34265c;--green:#00f5d4;--amber:#fee440;--red:#ff3864}
#rc-root[data-theme="emerald"]{--bg:#091410;--side:#10211b;--panel:#183028;--chat:#132820;--input:#1e3b30;--text:#ecfdf5;--muted:#84b59f;--accent:#10b981;--accent2:#059669;--border:#234739;--green:#34d399;--amber:#fbbf24;--red:#f87171}
#rc-root[data-theme="crimson"]{--bg:#14080a;--side:#210e12;--panel:#33161c;--chat:#281116;--input:#3d1a22;--text:#fff1f2;--muted:#fda4af;--accent:#e11d48;--accent2:#be123c;--border:#4c1d26;--green:#22c55e;--amber:#f59e0b;--red:#ef4444}
#rc-root[data-theme="channel_zero"]{--bg:#050505;--side:#0a0a0c;--panel:#121215;--chat:#08080a;--input:#16161a;--text:#d1d5db;--muted:#6b7280;--accent:#9ca3af;--accent2:#6b7280;--border:#26262a;--green:#9ca3af;--amber:#9ca3af;--red:#ef4444;--font-sans:var(--font-mono)}

/* Konami Legacy CRT Theme */
#rc-root.kairo-classic{--bg:#020a04;--side:#041408;--panel:#08210e;--chat:#030f06;--input:#0a2a12;--text:#38ef7d;--muted:#11998e;--accent:#00ff87;--accent2:#00b862;--border:#0e401c;--green:#38ef7d;--amber:#facc15;--red:#ef4444;font-family:var(--font-mono)}
#rc-root.kairo-classic::before{content:" ";position:fixed;inset:0;background:linear-gradient(rgba(18,16,16,0) 50%,rgba(0,0,0,0.3) 50%),linear-gradient(90deg,rgba(0,255,100,0.03),rgba(0,0,0,0.02),rgba(0,255,100,0.03));background-size:100% 3px,6px 100%;z-index:99999;pointer-events:none}

/* Futuristic /kairo 3000 */
#rc-root.kairo-3000{--accent:#00f2fe;--accent2:#4facfe;--border:#00f2fe;box-shadow:inset 0 0 40px rgba(0,242,254,0.25)}
#rc-root.kairo-3000 .logo{box-shadow:0 0 25px #00f2fe;animation:pulseKairo3k 1.5s infinite alternate}
@keyframes pulseKairo3k{from{filter:hue-rotate(0deg)}to{filter:hue-rotate(90deg)}}

#rc-root *,#rc-root *::before,#rc-root *::after{box-sizing:border-box;margin:0;padding:0}
#rc-root button,#rc-root input,#rc-root textarea,#rc-root select{font:inherit;color:inherit}
#rc-root button{cursor:pointer;user-select:none}
#rc-root .app{width:100%;height:100%;display:grid;grid-template-columns:268px 1fr 272px;background:var(--bg)}
#rc-root .sidebar{min-width:0;background:var(--side);display:flex;flex-direction:column;border-right:1px solid var(--border)}
#rc-root .rightbar{min-width:0;background:var(--side);display:flex;flex-direction:column;border-left:1px solid var(--border)}
#rc-root .brand{height:64px;display:flex;align-items:center;gap:11px;padding:0 16px;border-bottom:1px solid var(--border);position:relative}
#rc-root .rightTop{height:64px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;border-bottom:1px solid var(--border);font-family:var(--font-brand);font-size:.82rem;font-weight:700;color:var(--text)}
#rc-root .logo{flex:none;width:38px;height:38px;border-radius:11px;display:grid;place-items:center;background:linear-gradient(145deg,var(--accent),var(--accent2));color:white;font-family:var(--font-brand);font-weight:800;font-size:15px;box-shadow:0 6px 16px rgba(88,101,242,.32);letter-spacing:-.03em;cursor:pointer;transition:transform .2s ease}
#rc-root .logo.glitchSpin{animation:logoGlitch .65s cubic-bezier(.36,.07,.19,.97) both}
@keyframes logoGlitch{0%{transform:rotate(0deg) scale(1)}30%{transform:rotate(140deg) scale(1.15) skewX(10deg)}70%{transform:rotate(280deg) scale(.9) skewX(-10deg)}100%{transform:rotate(360deg) scale(1)}}

#rc-root .brandText{min-width:0;flex:1}
#rc-root .brandTitle{font-family:var(--font-brand);font-weight:700;font-size:.94rem;letter-spacing:-.02em;display:flex;align-items:center;gap:7px;color:var(--text)}
#rc-root .beta{font-family:var(--font-mono);font-size:.62rem;font-weight:700;color:var(--accent);background:rgba(88,101,242,.14);border:1px solid rgba(88,101,242,.4);border-radius:6px;padding:1px 6px;cursor:pointer;user-select:none;transition:background .15s}
#rc-root .beta:hover{background:rgba(88,101,242,.28)}
#rc-root .brandSub{font-size:.72rem;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px}
#rc-root .brandSub.ok{color:var(--green);font-weight:600}
#rc-root .brandSub.warn{color:var(--amber);font-weight:600}
#rc-root .brandSub.bad{color:var(--red)}
#rc-root .brandSub.haunted{color:#c084fc!important;font-family:var(--font-mono);font-weight:700}
#rc-root .iconBtn{flex:none;border:0;background:transparent;color:var(--muted);font-size:16px;border-radius:8px;width:30px;height:30px;display:grid;place-items:center;transition:background .15s,color .15s}
#rc-root .iconBtn:hover{background:var(--panel);color:var(--text)}
#rc-root .iconBtn.close:hover{background:var(--red);color:white}
#rc-root .sideActions{display:flex;flex-direction:column;gap:2px;padding:8px 10px;flex:1;overflow-y:auto}
#rc-root .quickHeading{padding:14px 16px 6px;font-family:var(--font-brand);color:var(--muted);font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em}
#rc-root .quickAction{display:flex;align-items:center;gap:11px;width:100%;border:0;border-radius:10px;padding:9px 12px;background:transparent;color:var(--muted);text-align:left;font-family:var(--font-brand);font-weight:500;font-size:.74rem;white-space:nowrap;transition:background .15s,color .15s}
#rc-root .quickAction:hover{background:var(--panel);color:var(--text)}
#rc-root .quickIcon{width:20px;flex:none;text-align:center;color:var(--accent);font-size:.95rem;display:inline-block}
#rc-root .quickLabel{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#rc-root .btn{border:0;border-radius:10px;padding:10px 16px;background:var(--accent);color:white;font-family:var(--font-brand);font-weight:600;font-size:.76rem;letter-spacing:-.01em;transition:background .15s,transform .1s}
#rc-root .btn:hover{background:var(--accent2)}
#rc-root .btn:active{transform:translateY(1px)}
#rc-root .btn:disabled{opacity:.5;cursor:default}
#rc-root .btn.secondary{background:var(--panel);color:var(--text);border:1px solid var(--border)}
#rc-root .btn.secondary:hover{background:var(--input)}
#rc-root .btn.danger{background:rgba(239,68,68,.14);color:var(--red);border:1px solid rgba(239,68,68,.3)}
#rc-root .btn.danger:hover{background:var(--red);color:white}
#rc-root .btn.small{padding:6px 11px;font-size:.7rem;border-radius:8px}
#rc-root .sectionTitle{padding:14px 16px 6px;font-family:var(--font-brand);color:var(--muted);font-size:.64rem;font-weight:700;text-transform:uppercase;letter-spacing:.07em}
#rc-root .list{overflow-y:auto;flex:1;padding:0 8px 12px}
#rc-root .item{width:100%;display:flex;align-items:center;gap:10px;border:0;border-radius:10px;padding:8px 10px;background:transparent;color:var(--muted);text-align:left;margin:2px 0;transition:background .15s,color .15s}
#rc-root .item:hover,#rc-root .item.active{background:var(--panel);color:var(--text)}
#rc-root .avatar{position:relative;width:36px;height:36px;flex:0 0 36px;border-radius:50%;display:grid;place-items:center;background:var(--panel);border:1px solid var(--border);color:var(--text);font-family:var(--font-brand);font-weight:700;font-size:12px;overflow:visible;background-size:cover;background-position:center}
#rc-root .presence{position:absolute;right:-1px;bottom:-1px;width:11px;height:11px;border:2.5px solid var(--side);border-radius:50%;background:#747f8d}
#rc-root .presence.online{background:var(--green)}
#rc-root .presence.idle{background:var(--amber)}
#rc-root .presence.dnd{background:var(--red)}
#rc-root .itemText{min-width:0;flex:1}
#rc-root .itemName{font-family:var(--font-brand);font-weight:600;font-size:.78rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--text)}
#rc-root .itemSub{font-size:.7rem;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px}
#rc-root .draftTag{color:var(--accent);font-weight:700}
#rc-root .badge{min-width:20px;height:20px;padding:0 6px;border-radius:999px;background:var(--red);color:white;display:grid;place-items:center;font-size:.66rem;font-weight:700}
#rc-root .selfCard{padding:12px 14px;background:var(--side);border-top:1px solid var(--border);display:flex;align-items:center;gap:10px;cursor:pointer;transition:background .15s}
#rc-root .selfCard:hover{background:var(--panel)}
#rc-root .selfInfo{min-width:0;flex:1}
#rc-root .selfName{font-family:var(--font-brand);font-weight:700;font-size:.78rem;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#rc-root .selfBio{font-size:.7rem;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px}
#rc-root .main{position:relative;min-width:0;display:flex;flex-direction:column;background:var(--chat);overflow:hidden}
#rc-root .top{height:64px;display:flex;align-items:center;gap:10px;padding:0 20px;background:var(--side);border-bottom:1px solid var(--border)}
#rc-root .topText{flex:1;min-width:0}
#rc-root .topName{font-family:var(--font-brand);font-size:.9rem;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#rc-root .status{color:var(--muted);font-size:.74rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#rc-root .status.online{color:var(--green)}
#rc-root .searchInput{width:170px;border:1px solid var(--border);border-radius:8px;padding:6px 11px;background:var(--input);color:var(--text);font-size:.78rem;outline:0;transition:border-color .15s,width .2s}
#rc-root .searchInput:focus{border-color:var(--accent);width:215px}
#rc-root .diag{padding:9px 20px;background:var(--panel);color:var(--text);font-size:.78rem;border-bottom:1px solid var(--border)}
#rc-root .pinnedBar{background:var(--panel);border-bottom:1px solid var(--border);padding:7px 20px;display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:.76rem;color:var(--text)}
#rc-root .pinnedText{display:flex;align-items:center;gap:8px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:0}
#rc-root .pinnedIcon{color:var(--accent);font-size:.88rem}

#rc-root .callPanel{position:relative;background:linear-gradient(160deg,rgba(22,23,26,.98),rgba(34,36,41,.94));backdrop-filter:blur(20px);border:1px solid var(--border);border-radius:20px;margin:16px 20px;padding:24px 28px;box-shadow:0 20px 50px rgba(0,0,0,.45);display:flex;flex-direction:column;align-items:center;gap:20px;overflow:hidden;transition:all .35s cubic-bezier(.16,1,.3,1)}
#rc-root .callPanel.endedState{opacity:0;transform:scale(.94)}
#rc-root .callStage{width:100%;max-width:520px;display:flex;align-items:center;justify-content:space-around;position:relative}
#rc-root .callParticipant{display:flex;flex-direction:column;align-items:center;gap:9px;z-index:2}
#rc-root .callAvatarWrap{position:relative;width:96px;height:96px;border-radius:50%;display:grid;place-items:center}
#rc-root .callAvatar{width:86px;height:86px;border-radius:50%;background:linear-gradient(145deg,var(--panel),var(--input));border:2px solid var(--border);color:var(--text);font-family:var(--font-brand);font-size:28px;font-weight:800;display:grid;place-items:center;box-shadow:0 12px 28px rgba(0,0,0,.35);transition:all .3s ease;z-index:2;background-size:cover;background-position:center}
#rc-root .callAvatarWrap.speaking .callAvatar{border-color:var(--green);box-shadow:0 0 24px rgba(35,165,90,.65);transform:scale(1.04)}
#rc-root .callPulseRing{position:absolute;inset:0;border-radius:50%;border:2px solid var(--accent);opacity:0;pointer-events:none}
#rc-root .callAvatarWrap.pulsing .callPulseRing{animation:callWavePulse 2s infinite cubic-bezier(.2,.6,.35,1)}
#rc-root .callAvatarWrap.speaking .callPulseRing{border-color:var(--green);animation:callSpeakerPulse 1.2s infinite ease-out}
#rc-root .callParticipantName{font-family:var(--font-brand);font-size:.82rem;font-weight:700;color:var(--text);max-width:140px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#rc-root .callWaves{position:absolute;left:30%;right:30%;height:3px;top:48px;background:linear-gradient(90deg,transparent,var(--accent),transparent);opacity:.4;pointer-events:none;transform:translateY(-50%)}
#rc-root .callWaves.activeWaves{animation:callBeamTravel 2s infinite linear;opacity:.8}
#rc-root .callCenterGlow{position:absolute;left:50%;top:48px;transform:translate(-50%,-50%);width:70px;height:70px;border-radius:50%;background:radial-gradient(circle,rgba(88,101,242,.45),transparent 70%);opacity:0;transition:opacity .6s ease;pointer-events:none}
#rc-root .callCenterGlow.visible{opacity:1}
#rc-root .callMeta{display:flex;flex-direction:column;align-items:center;gap:4px}
#rc-root .callStatusLine{font-family:var(--font-brand);font-size:.84rem;font-weight:700;color:var(--text)}
#rc-root .callDuration{font-family:var(--font-mono);font-size:.74rem;color:var(--muted)}
#rc-root .callControls{display:flex;align-items:center;gap:12px}
#rc-root .callCtrlBtn{width:46px;height:46px;border-radius:50%;border:0;display:grid;place-items:center;font-size:18px;background:var(--input);color:var(--text);box-shadow:0 6px 16px rgba(0,0,0,.25);transition:all .18s ease}
#rc-root .callCtrlBtn:hover{transform:translateY(-2px);background:var(--panel)}
#rc-root .callCtrlBtn.active{background:var(--red);color:white}
#rc-root .callCtrlBtn.endCallBtn{width:56px;height:56px;background:var(--red);color:white;font-size:22px}
#rc-root .callCtrlBtn.endCallBtn:hover{background:#dc2626;transform:scale(1.06)}
#rc-root .callCtrlBtn.acceptBtn{width:56px;height:56px;background:var(--green);color:white;font-size:22px}
#rc-root .callCtrlBtn.acceptBtn:hover{background:#16a34a;transform:scale(1.06)}

@keyframes callWavePulse{0%{transform:scale(.85);opacity:.9}100%{transform:scale(1.45);opacity:0}}
@keyframes callSpeakerPulse{0%{transform:scale(1);opacity:.85}100%{transform:scale(1.35);opacity:0}}
@keyframes callBeamTravel{0%{background-position:-200px 0}100%{background-position:200px 0}}

#rc-root .view{flex:1;min-height:0;display:flex;flex-direction:column;overflow:hidden}
#rc-root .empty{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:32px;text-align:center;overflow-y:auto}
#rc-root .emblemRing{width:144px;height:144px;flex:none;border-radius:50%;background:radial-gradient(circle,rgba(88,101,242,.22),rgba(88,101,242,.05) 70%);display:grid;place-items:center;cursor:pointer;transition:transform .2s ease,background .2s ease;border:1px solid rgba(88,101,242,.2)}
#rc-root .emblemRing:hover{transform:translateY(-3px);background:radial-gradient(circle,rgba(88,101,242,.3),rgba(88,101,242,.1) 70%)}
#rc-root .emblemCore{width:96px;height:96px;border-radius:50%;background:linear-gradient(145deg,var(--accent),var(--accent2));color:#fff;display:grid;place-items:center;font-family:var(--font-brand);font-weight:800;font-size:32px;box-shadow:0 12px 30px rgba(88,101,242,.38);letter-spacing:-.03em}
#rc-root .stageTitle{font-family:var(--font-brand);font-weight:800;font-size:1.65rem;letter-spacing:-.03em;margin-top:4px;color:var(--text)}
#rc-root .stageSub{color:var(--muted);font-size:.86rem;max-width:460px;line-height:1.5}
#rc-root .pillRow{display:flex;gap:12px;margin-top:6px;flex-wrap:wrap;justify-content:center}
#rc-root .pillBtn{font-family:var(--font-brand);border:0;border-radius:999px;padding:11px 22px;background:var(--accent);color:#fff;font-weight:700;font-size:.76rem;box-shadow:0 8px 20px rgba(88,101,242,.3);transition:transform .15s ease,background .15s ease}
#rc-root .pillBtn:hover{background:var(--accent2);transform:translateY(-1px)}
#rc-root .pillBtn.ghost{background:var(--panel);color:var(--text);border:1px solid var(--border);box-shadow:none}
#rc-root .pillBtn.ghost:hover{background:var(--input)}

/* Interactive Clickable Info Cards */
#rc-root .statsGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;width:min(740px,100%);margin-top:20px}
#rc-root .statCard{position:relative;overflow:hidden;background:var(--side);border:1px solid var(--border);border-radius:16px;padding:18px 20px;display:flex;flex-direction:column;justify-content:space-between;gap:10px;text-align:left;box-shadow:0 10px 24px rgba(0,0,0,.2);cursor:pointer;transition:transform .2s ease,border-color .2s ease,box-shadow .2s ease}
#rc-root .statCard:hover{transform:translateY(-3px);border-color:var(--accent);box-shadow:0 14px 30px rgba(88,101,242,.2)}
#rc-root .statTop{display:flex;align-items:center;justify-content:space-between;gap:8px}
#rc-root .statLabel{font-family:var(--font-brand);font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)}
#rc-root .statValue{font-family:var(--font-brand);font-size:1.12rem;font-weight:800;letter-spacing:-.02em;color:var(--text);display:flex;align-items:center;gap:10px;line-height:1.2}

/* Sub-text ticker: small, Unbounded, quiet palette, wraps naturally */
#rc-root .statSub{font-family:var(--font-sans);font-size:.72rem;color:var(--muted);font-weight:500;line-height:1.4}
#rc-root .statSub.subtle-strategy{font-family:var(--font-brand);font-size:.62rem;font-weight:600;letter-spacing:-.01em;color:var(--muted);opacity:.75;text-transform:lowercase;white-space:normal;overflow:visible;word-break:break-word}

#rc-root .pulseDot{position:relative;width:10px;height:10px;flex:none;border-radius:50%;background:var(--amber);box-shadow:0 0 10px var(--amber);animation:kairoBlink 1.6s infinite ease-in-out;transition:background .25s ease,box-shadow .25s ease}
#rc-root .pulseDot.connected{background:var(--green);box-shadow:0 0 10px var(--green)}
#rc-root .pulseDot.paused{background:var(--amber);box-shadow:0 0 10px var(--amber)}
#rc-root .pulseDot.error{background:var(--red);box-shadow:0 0 10px var(--red);animation:none}
@keyframes kairoBlink{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.45;transform:scale(.88)}}

#rc-root .log{flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;padding:18px 20px;display:flex;flex-direction:column;gap:10px;background:var(--chat);scroll-behavior:auto}
#rc-root .message{position:relative;display:flex;gap:10px;max-width:78%}
#rc-root .message.mine{align-self:flex-end;flex-direction:row-reverse}
#rc-root .msgCol{display:flex;flex-direction:column;min-width:0}
#rc-root .mine .msgCol{align-items:flex-end}
#rc-root .bubbleWrap{position:relative;display:flex;align-items:center;gap:6px}
#rc-root .mine .bubbleWrap{flex-direction:row-reverse}
#rc-root .bubble{padding:10px 13px;border-radius:14px;background:var(--side);color:var(--text);border:1px solid var(--border);white-space:pre-wrap;overflow-wrap:anywhere;transition:box-shadow .2s;font-size:.86rem;line-height:1.45;position:relative}
#rc-root .mine .bubble{background:var(--accent);color:white;border-color:transparent;border-bottom-right-radius:4px}
#rc-root .theirs .bubble{border-bottom-left-radius:4px}
#rc-root .bubble.deleted{opacity:.6;font-style:italic}
#rc-root .meta{font-size:.68rem;color:inherit;opacity:.78;margin-bottom:4px;display:flex;align-items:center;gap:6px}
#rc-root .meta b{font-family:var(--font-brand);font-size:.66rem;font-weight:700}
#rc-root .meta span{font-family:var(--font-mono);font-size:.65rem}
#rc-root .receipt{font-size:.68rem;font-weight:700;margin-left:3px;opacity:.9}
#rc-root .editedTag{font-size:.62rem;opacity:.75;font-style:italic;margin-left:5px}
#rc-root .replyQuote{font-size:.74rem;padding:4px 8px;margin-bottom:5px;border-left:3px solid rgba(255,255,255,.55);background:rgba(0,0,0,.18);border-radius:5px;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:320px}
#rc-root .theirs .replyQuote{border-left-color:var(--accent);background:var(--panel)}
#rc-root .msgActions{display:none;align-items:center;gap:2px;background:var(--side);border:1px solid var(--border);border-radius:8px;padding:2px;box-shadow:0 4px 12px rgba(0,0,0,.25);z-index:2}
#rc-root .message:hover .msgActions{display:flex}
#rc-root .actBtn{border:0;background:transparent;color:var(--muted);font-size:13px;width:26px;height:26px;border-radius:6px;display:grid;place-items:center}
#rc-root .actBtn:hover{background:var(--panel);color:var(--text)}
#rc-root .emojiPicker{position:absolute;bottom:100%;margin-bottom:4px;display:flex;gap:3px;background:var(--side);border:1px solid var(--border);border-radius:999px;padding:3px 6px;box-shadow:0 6px 18px rgba(0,0,0,.35);z-index:4}
#rc-root .mine .emojiPicker{right:0}
#rc-root .theirs .emojiPicker{left:0}
#rc-root .reactionsRow{display:flex;flex-wrap:wrap;gap:4px;margin-top:4px}
#rc-root .reactPill{border:1px solid var(--border);background:var(--side);color:var(--text);border-radius:999px;padding:2px 8px;font-size:.7rem;display:flex;align-items:center;gap:4px}
#rc-root .reactPill.active{border-color:var(--accent);background:rgba(88,101,242,.18)}
#rc-root .chatImg{max-width:280px;max-height:220px;border-radius:8px;margin-top:6px;cursor:zoom-in;display:block;object-fit:cover;background:#000}
#rc-root .audioPill{display:flex;align-items:center;gap:8px;background:rgba(0,0,0,.2);border:1px solid rgba(255,255,255,.15);border-radius:8px;padding:6px 10px;margin-top:6px}
#rc-root .audioPill audio{height:30px;max-width:220px}
#rc-root .chatLink{color:#79b8ff;text-decoration:underline;text-underline-offset:2px}

#rc-root .codeBlockWrap{position:relative;background:#0d1117;border:1px solid var(--border);border-radius:8px;margin:6px 0;overflow:hidden}
#rc-root .codeBlockHeader{display:flex;align-items:center;justify-content:space-between;padding:4px 10px;background:rgba(255,255,255,.04);border-bottom:1px solid rgba(255,255,255,.08);font-family:var(--font-mono);font-size:.66rem;color:var(--muted)}
#rc-root .copyCodeBtn{border:0;background:transparent;color:var(--muted);font-size:.66rem;cursor:pointer;padding:2px 6px;border-radius:4px}
#rc-root .copyCodeBtn:hover{background:rgba(255,255,255,.1);color:var(--text)}
#rc-root pre.codeContent{margin:0;padding:10px;font-family:var(--font-mono);font-size:.76rem;line-height:1.45;overflow-x:auto;color:#c9d1d9}
#rc-root code.inlineCode{background:rgba(0,0,0,.28);border:1px solid rgba(255,255,255,.1);padding:1px 5px;border-radius:4px;font-family:var(--font-mono);font-size:.82em}

/* Easter Egg Local FX */
.ee-confetti{position:absolute;top:-12px;right:0;font-size:16px;pointer-events:none;animation:eeBurst .8s ease-out forwards}
@keyframes eeBurst{0%{transform:scale(0) translateY(10px);opacity:1}100%{transform:scale(1.4) translateY(-14px);opacity:0}}
.ee-stars{position:absolute;inset:-4px;border:1px dashed #facc15;border-radius:18px;pointer-events:none;animation:eeTwinkle 1.5s ease-out forwards}
@keyframes eeTwinkle{0%{opacity:0;transform:scale(.97)}50%{opacity:1;transform:scale(1.02)}100%{opacity:0;transform:scale(1)}}
.ee-depth-pill{display:inline-block;font-size:.62rem;font-family:var(--font-mono);font-weight:700;color:#f59e0b;background:rgba(245,158,11,.15);border:1px solid rgba(245,158,11,.3);padding:1px 6px;border-radius:4px;margin-bottom:4px}
.ee-dots span{animation:dotPulse 1.2s infinite;opacity:.3}
.ee-dots span:nth-child(2){animation-delay:.2s}
.ee-dots span:nth-child(3){animation-delay:.4s}
@keyframes dotPulse{0%,100%{opacity:.3}50%{opacity:1}}

#rc-root .system{align-self:center;color:var(--muted);font-size:.72rem;background:var(--side);padding:4px 12px;border-radius:999px;border:1px solid var(--border);text-align:center}
#rc-root .typingIndicator{padding:2px 20px;font-size:.72rem;color:var(--muted);font-style:italic;min-height:18px}
#rc-root .replyBar{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:7px 20px;background:var(--panel);border-top:1px solid var(--border);font-size:.76rem;color:var(--muted)}
#rc-root .replyBar b{color:var(--text)}

#rc-root .composerArea{display:flex;flex-direction:column;background:var(--side);border-top:1px solid var(--border)}
#rc-root .composer{display:flex;gap:8px;align-items:center;padding:10px 18px 4px}
#rc-root .composerFooter{display:flex;align-items:center;justify-content:flex-end;padding:0 20px 8px;font-family:var(--font-mono);font-size:.66rem;color:var(--muted)}
#rc-root .mediaBtn{flex:none;width:38px;height:38px;border:1px solid var(--border);border-radius:10px;background:var(--panel);color:var(--muted);font-size:16px;display:grid;place-items:center;transition:background .15s,color .15s}
#rc-root .mediaBtn:hover{background:var(--input);color:var(--text)}
#rc-root .mediaBtn.rec{background:var(--red);color:white;border-color:var(--red);animation:kairoBlink 1s infinite}
#rc-root .composer input{flex:1;min-width:0;border:1px solid var(--border);outline:0;border-radius:10px;padding:10px 14px;background:var(--input);color:var(--text);font-size:.86rem;transition:border-color .15s}
#rc-root .composer input:focus{border-color:var(--accent)}
#rc-root .composer button.sendBtn{flex:none;width:44px;height:38px;border:0;border-radius:10px;background:var(--accent);color:white;font-size:17px;display:grid;place-items:center}

#rc-root .modalLayer{position:fixed;inset:0;background:rgba(7,8,10,.82);backdrop-filter:blur(8px);display:grid;place-items:center;padding:20px;z-index:9999}
#rc-root .modal{width:min(440px,100%);max-height:90vh;overflow-y:auto;background:var(--side);color:var(--text);border:1px solid var(--border);border-radius:18px;padding:26px;box-shadow:0 24px 64px rgba(0,0,0,.65)}
#rc-root .modalHeader{display:flex;align-items:center;gap:12px;margin-bottom:12px}
#rc-root .modalBadge{width:40px;height:40px;border-radius:11px;background:linear-gradient(145deg,var(--accent),var(--accent2));color:white;font-family:var(--font-brand);font-weight:800;font-size:16px;display:grid;place-items:center;flex:none;box-shadow:0 6px 16px rgba(88,101,242,.3)}
#rc-root .modal h2{font-family:var(--font-brand);font-size:1.05rem;font-weight:700;letter-spacing:-.02em;color:var(--text);margin:0}
#rc-root .modal h3{font-family:var(--font-brand);font-size:.68rem;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin:14px 0 6px;color:var(--muted)}
#rc-root .modal p,#rc-root .modal li{color:var(--muted);font-size:.82rem;line-height:1.5;overflow-wrap:break-word}
#rc-root .modal ol{padding-left:18px;display:grid;gap:6px;margin:10px 0}
#rc-root .modal input,#rc-root .modal select,#rc-root .modal textarea{width:100%;border:1px solid var(--border);border-radius:10px;background:var(--bg);color:var(--text);padding:10px 13px;outline:0;font-size:.85rem;transition:border-color .15s,box-shadow .15s}
#rc-root .modal input:focus,#rc-root .modal select:focus,#rc-root .modal textarea:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(88,101,242,.18)}
#rc-root .modal input[type="color"]{height:42px;padding:3px 5px;border-radius:10px;cursor:pointer}
#rc-root .modal .err{color:var(--red);min-height:1.2em;margin:10px 0 0;font-size:.78rem;font-weight:600}
#rc-root .colorRow{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:6px}
#rc-root .colorField{display:flex;flex-direction:column;gap:5px;font-size:.72rem;color:var(--muted)}
#rc-root .row{display:flex;gap:10px;margin-top:18px}
#rc-root .row .btn{flex:1}
#rc-root .subRow{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:12px;padding-top:12px;border-top:1px solid var(--border)}
#rc-root .linkBtn{border:0;background:transparent;color:var(--muted);font-size:.75rem;font-weight:600;padding:4px 6px;border-radius:6px;transition:color .15s}
#rc-root .linkBtn:hover{color:var(--text);text-decoration:underline}
#rc-root .linkBtn.danger:hover{color:var(--red)}
#rc-root .kbd{font-family:var(--font-mono);font-size:.7rem;background:var(--panel);border:1px solid var(--border);border-radius:5px;padding:2px 6px;color:var(--text)}

/* Toast: Unbounded font, wraps naturally, no cutoff */
#rc-root .toast{position:fixed;left:50%;bottom:24px;z-index:99999;transform:translate(-50%,15px);background:#09090b;color:white;border:1px solid var(--border);padding:10px 18px;border-radius:10px;opacity:0;pointer-events:none;transition:.2s;max-width:min(540px,94vw);font-family:var(--font-brand);font-size:.72rem;font-weight:600;line-height:1.45;box-shadow:0 12px 30px rgba(0,0,0,.5);white-space:normal;overflow-wrap:break-word}
#rc-root .toast.show{opacity:1;transform:translate(-50%,0)}
#rc-root .lightbox{position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:999999;display:grid;place-items:center;padding:20px;cursor:zoom-out}
#rc-root .lightbox img{max-width:92vw;max-height:92vh;border-radius:10px;box-shadow:0 15px 50px rgba(0,0,0,.7)}

/* Prototype Layout Overlay */
#rc-root .protoLayer{position:fixed;inset:0;background:#dcdfe4;color:#1e293b;z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;font-family:sans-serif}
#rc-root .protoCard{background:#ffffff;border:2px solid #000;border-radius:6px;width:min(440px,94vw);padding:22px;display:flex;flex-direction:column;gap:14px;box-shadow:6px 6px 0 #000}
#rc-root .protoCard h2{font-size:1.15rem;font-weight:800;margin:0;letter-spacing:-.02em}
#rc-root .protoBtn{background:#000;color:#fff;border:0;padding:10px;font-weight:700;font-size:.82rem;cursor:pointer}
#rc-root .protoBtn.ghost{background:#fff;color:#000;border:2px solid #000}

#rc-root [hidden]{display:none!important}
@media(max-width:960px){#rc-root .app{grid-template-columns:68px 1fr 220px}#rc-root .brand{justify-content:center;padding:8px 4px}#rc-root .brandText,#rc-root .quickLabel,#rc-root .quickHeading,#rc-root .selfInfo{display:none}#rc-root .quickAction{justify-content:center;padding:10px 4px}#rc-root .statsGrid{grid-template-columns:1fr}}
`;

const MARKUP = `
<div class="app">
  <aside class="sidebar">
    <div class="brand">
      <div id="kairoLogo" class="logo" title="Kairo">k.</div>
      <div class="brandText">
        <div class="brandTitle">Kairo<span id="betaPill" class="beta" title="Release Notes">BETA</span></div>
        <div id="brandSub" class="brandSub">vault locked</div>
      </div>
    </div>
    <div class="quickHeading">Navigation</div>
    <div class="sideActions">
      <button id="overviewBtn" class="quickAction"><span class="quickIcon">⌂</span><span class="quickLabel">Overview</span></button>
      <button id="profileBtn" class="quickAction"><span class="quickIcon">◉</span><span class="quickLabel">Profile & Status</span></button>
      <button id="addBtn" class="quickAction"><span class="quickIcon">＋</span><span class="quickLabel">New Chat (DM)</span></button>
      <button id="groupBtn" class="quickAction"><span class="quickIcon">＃</span><span class="quickLabel">New Group</span></button>
      <button id="themeBtn" class="quickAction"><span class="quickIcon">🎨</span><span class="quickLabel">Themes & Colors</span></button>
      <button id="eeSettingsBtn" class="quickAction"><span class="quickIcon">✨</span><span class="quickLabel">Easter Eggs & Lore</span></button>
      <button id="cloudSyncBtn" class="quickAction"><span class="quickIcon">☁️</span><span class="quickLabel">Sync Cloud Vault</span></button>
      <button id="exportVaultBtn" class="quickAction"><span class="quickIcon">📤</span><span class="quickLabel">Export Vault</span></button>
      <button id="blockedBtn" class="quickAction"><span class="quickIcon">🚫</span><span class="quickLabel">Blocked Users</span></button>
      <button id="lockVaultBtn" class="quickAction"><span class="quickIcon">🔐</span><span class="quickLabel">Lock Vault</span></button>
      <button id="helpBtn" class="quickAction"><span class="quickIcon">?</span><span class="quickLabel">Guide & Shortcuts</span></button>
    </div>
    <div id="selfCard" class="selfCard" title="Edit Profile & Status"></div>
  </aside>
  <main class="main">
    <header class="top">
      <div class="topText"><div id="topName" class="topName">Welcome</div><div id="topStatus" class="status"></div></div>
      <input id="searchBox" class="searchInput" type="search" placeholder="Search chat (Ctrl+K)..." hidden>
      <button id="btnCall" class="btn secondary small" title="Start WebRTC Voice Call" hidden>📞 Call</button>
      <button id="btnClear" class="btn secondary small" hidden>Clear history</button>
      <button id="btnDelete" class="btn danger small" hidden>Delete chat</button>
    </header>
    <div id="callHost"></div>
    <div id="pinnedHeader" class="pinnedBar" hidden></div>
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
<div id="lightboxHost"></div>
<div id="toast" class="toast"></div>
<input type="file" id="filePicker" accept="image/*" style="display:none">
<input type="file" id="avatarPicker" accept="image/*" style="display:none">
<audio id="remoteAudio" autoplay style="display:none"></audio>
`;

const style = document.createElement("style");
style.id = "rc-style";
style.textContent = CSS;
(document.head || document.documentElement).appendChild(style);
let arcade = { open() {}, close() {} };
const root = document.createElement("div");
root.id = "rc-root";
root.innerHTML = MARKUP;
(document.body || document.documentElement).appendChild(root);
const $ = (id) => root.querySelector("#" + id);

const SERVER = "https://kairo-ejra.onrender.com";
const MAX_TEXT = 1200;
const MAX_CHATS = 50;
const PING_EVERY = 60000;
const PING_FLOOR = 15000;
const LS = "kairo:v3:";
const MIN_PASS = 16;
const KDF_ROUNDS = 600000;
const MAX_FILE = 100 * 1024 * 1024;
const EMOJIS = ["👍", "❤️", "😂", "🔥", "👀"];
const origTitle = document.title;

let vaultKey = null;
let relayStatusState = "paused";
let activeRelayPun = "asking the firewall nicely";
const te = new TextEncoder();
const td = new TextDecoder();
const me = { id: rnd(), userKey: "", name: "", avatar: "", avatarImg: null, bio: "", status: "online" };
const settings = {
  theme: "dark",
  sound: true,
  titleAlert: true,
  cloak: "kairo",
  sendOnEnter: true,
  customColors: { bg: "#0f1012", side: "#16171a", accent: "#5865f2", text: "#f3f4f6" }
};

const rooms = new Map();
let blockedUsers = new Set();
let activeTopic = null;
let replyingTo = null;
let searchQuery = "";
let userScrolledUp = false;
let es = null;
let esKey = "";
let everOpened = false;

let mediaRecorder = null;
let audioChunks = [];
let isRecording = false;

let peerConn = null;
let callId = "";
let callPeer = "";
let earlyCandidates = [];
let localStream = null;
let activeCallTopic = null;
let callState = "idle";
let isCaller = false;
let isMuted = false;
let isDeafened = false;
let callStartTime = 0;
let callDurationTimer = null;
let audioContext = null;
let analyserNode = null;
let remoteAudioCheckTimer = null;
const rtcConfig = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

let lastTypingSent = 0;
let typingTimeouts = new Map();

let queue = Promise.resolve();
let readyTimer = null;
let toastTimer = null;
let pingTimer = null;
let pingIdx = 0;
const timers = [];

/* -------------------------------------------------------------
   CENTRAL EASTER EGG & ACHIEVEMENTS MANAGER
------------------------------------------------------------- */
const EE = {
  LS_KEY: "kairo:ee:v1",
  data: {
    cfg: { fx: true, toasts: true, rare: true },
    achievements: {},
    fragments: {},
    channelZero: false,
    sentCount: 0
  },
  logoClicks: [],
  logoCooldown: false,
  konamiIdx: 0,
  konamiSeq: ["arrowup","arrowup","arrowdown","arrowdown","arrowleft","arrowright","arrowleft","arrowright","b","a"],
  konamiTimeout: null,
  bruhStreak: 0,
  dupBuffer: [],
  muteToggles: [],

  // Pure uninterrupted lowercase strategies without "strategy 01" or emojis
  strategies: [
    "asking the firewall nicely",
    "waking the server up with milk and cookies",
    "bribing the packets with chocolate",
    "checking under the router",
    "convincing the packets to cooperate",
    "untangling the ethernet cables",
    "negotiating with webrtc",
    "opening a tiny internet tunnel",
    "feeding the server hamsters",
    "locating the networking gremlin"
  ],

  oracleList: [
    "the relay says: ask again after lunch",
    "the packets remain undecided",
    "channel zero recommends absolutely nothing",
    "the firewall has declined to comment"
  ],

  init() {
    try {
      const stored = lsGet(this.LS_KEY);
      if (stored) this.data = Object.assign(this.data, JSON.parse(stored));
    } catch {}
  },
  save() {
    lsSet(this.LS_KEY, JSON.stringify(this.data));
  },
  getNextStrategy() {
    return this.strategies[Math.floor(Math.random() * this.strategies.length)];
  },
  unlock(id, name) {
    if (this.data.achievements[id]) return;
    this.data.achievements[id] = true;
    this.save();
    if (this.data.cfg.toasts) toast("Achievement Unlocked: " + name, 2800);
  },
  unlockFrag(id, quote) {
    if (this.data.fragments[id]) return;
    this.data.fragments[id] = quote;
    this.save();
    if (this.data.cfg.toasts) toast("Lore Fragment Discovered", 2800);
  },
  reset() {
    this.data.achievements = {};
    this.data.fragments = {};
    this.data.channelZero = false;
    this.data.sentCount = 0;
    this.save();
    root.removeAttribute("data-theme");
    root.classList.remove("kairo-classic", "kairo-3000");
    toast("Easter egg progress reset.");
  }
};
EE.init();

function rnd() {
  const a = crypto.getRandomValues(new Uint8Array(8));
  return Array.from(a, (x) => x.toString(16).padStart(2, "0")).join("");
}
function sanitizeKey(raw) {
  return String(raw || "").trim().toLowerCase().replace(/[^a-z0-9_]/g, "");
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
function replay(node, cls) {
  if (!node) return;
  node.classList.remove(cls);
  void node.offsetWidth;
  node.classList.add(cls);
}
function toast(text, ms) {
  const x = $("toast");
  x.textContent = text;
  x.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => x.classList.remove("show"), ms || 2200);
}

function setRelayState(st) {
  relayStatusState = st;
  const dot = $("relayDot");
  const val = $("relayStatVal");
  const sub = $("relayStatSub");

  if (st !== "connected") {
    activeRelayPun = EE.getNextStrategy();
  }

  if (dot) {
    dot.className = "pulseDot " + st;
    dot.title = st === "connected" ? "Relay Connected" : (st === "paused" ? "Relay Connecting" : "Relay Unreachable");
  }
  if (val) {
    val.textContent = st === "connected" ? "ACTIVE" : (st === "paused" ? "CONNECTING" : "OFFLINE");
  }
  if (sub) {
    if (st === "connected") {
      sub.textContent = "Connected to relay";
      sub.className = "statSub";
    } else {
      sub.textContent = activeRelayPun;
      sub.className = "statSub subtle-strategy";
    }
  }
}

function setStatus(text, cls) {
  const s = $("brandSub");
  if (s.classList.contains("haunted")) return;
  s.textContent = text;
  s.className = "brandSub" + (cls ? " " + cls : "");
}
function setDiag(text) {
  const d = $("diag");
  d.textContent = text;
  d.hidden = !text;
}

function openLightbox(src) {
  const box = $("lightboxHost");
  box.innerHTML = "";
  const lb = el("div", { className: "lightbox", onclick: () => { box.innerHTML = ""; } },
    el("img", { src })
  );
  box.append(lb);
}

function getThemeAccentColor() {
  const t = settings.theme || "dark";
  if (t === "cyberpunk") return "#ff2a85";
  if (t === "emerald") return "#10b981";
  if (t === "crimson") return "#e11d48";
  if (t === "channel_zero") return "#9ca3af";
  if (t === "custom" && settings.customColors && settings.customColors.accent) {
    return settings.customColors.accent;
  }
  return "#7c3aed";
}

function setKairoFavicon(hasUnread) {
  const accent = getThemeAccentColor();
  const pingDot = hasUnread ? `<circle cx="26" cy="6" r="4.5" fill="#ef4444" stroke="#0e121d" stroke-width="1.8"/>` : '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" rx="8" fill="#0e121d"/>
    <text x="5" y="23" font-family="'Unbounded', sans-serif" font-weight="900" font-size="20" fill="${accent}">k.</text>
    ${pingDot}
  </svg>`;
  const faviconUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
  document.querySelectorAll("link[rel*='icon']").forEach(e => e.remove());
  const link = document.createElement("link");
  link.rel = "icon";
  link.type = "image/svg+xml";
  link.href = `${faviconUrl}#${Date.now()}`;
  document.head.appendChild(link);
}

function applyCloak() {
  settings.cloak = "kairo";
  const totalUnread = Array.from(rooms.values()).reduce((sum, r) => sum + (r.unread || 0), 0);
  document.title = "Kairo";
  setKairoFavicon(totalUnread > 0);
}

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
  const totalUnread = Array.from(rooms.values()).reduce((sum, r) => sum + (r.unread || 0), 0);
  setKairoFavicon(totalUnread > 0);
  document.title = totalUnread > 0 ? "(" + totalUnread + ") Kairo" : "Kairo";
}

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
function toHex(a) { return Array.from(a, (x) => x.toString(16).padStart(2, "0")).join(""); }
async function pbkdf2Bits(pw, salt, bits) {
  const base = await crypto.subtle.importKey("raw", te.encode(pw), "PBKDF2", false, ["deriveBits"]);
  return new Uint8Array(await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: KDF_ROUNDS, hash: "SHA-256" }, base, bits));
}
function aesKey(bytes) {
  return crypto.subtle.importKey("raw", bytes, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
}
// One slow derivation gives both the chat key and the channel name, so neither can be guessed quickly.
async function deriveRoom(room, pw) {
  const bits = await pbkdf2Bits(pw, te.encode("kairo-v3-room|" + room), 512);
  return { key: await aesKey(bits.slice(0, 32)), topic: "kairo_" + toHex(bits.slice(32, 48)) };
}
function passProblem(pw) {
  if (pw.length < MIN_PASS) return "Use at least " + MIN_PASS + " characters, such as several random words.";
  if (new Set(pw.toLowerCase()).size < 7 || /password|123456|qwerty|abcdef|kairo/i.test(pw)) return "That's too easy to guess. Try several random, unrelated words.";
  return "";
}
function randomPass() {
  const chars = "abcdefghjkmnpqrstuvwxyz23456789";
  const out = [];
  while (out.length < 20) {
    const b = crypto.getRandomValues(new Uint8Array(1))[0];
    if (b < 248) out.push(chars[b % 31]);
  }
  return out.join("").replace(/(.{5})(?=.)/g, "$1-");
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

function compressImage(file, maxDim = 800, quality = 0.6) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function applyTheme(t) {
  settings.theme = t || "dark";
  root.classList.remove("kairo-classic", "kairo-3000");
  if (settings.theme === "custom") {
    root.setAttribute("data-theme", "custom");
    const c = settings.customColors || { bg: "#0f1012", side: "#16171a", accent: "#5865f2", text: "#f3f4f6" };
    root.style.setProperty("--bg", c.bg);
    root.style.setProperty("--chat", c.bg);
    root.style.setProperty("--side", c.side);
    root.style.setProperty("--panel", c.side);
    root.style.setProperty("--input", c.side);
    root.style.setProperty("--accent", c.accent);
    root.style.setProperty("--accent2", c.accent);
    root.style.setProperty("--text", c.text || "#f3f4f6");
  } else {
    root.style.removeProperty("--bg");
    root.style.removeProperty("--chat");
    root.style.removeProperty("--side");
    root.style.removeProperty("--panel");
    root.style.removeProperty("--input");
    root.style.removeProperty("--accent");
    root.style.removeProperty("--accent2");
    root.style.removeProperty("--text");
    if (settings.theme === "dark") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", settings.theme);
  }
  if (settings.cloak === "kairo") updateDocTitle();
}

let vaultSalt = null;
let vaultTopic = "";
let identity = null; // { priv: JWK, pub: base64, id }
let signKey = null;

async function getCloudVaultTopic(userKey, password) {
  const bits = await pbkdf2Bits(password, te.encode("kairo-v3-lookup|" + sanitizeKey(userKey)), 256);
  return "kairo_" + toHex(bits.slice(0, 16));
}
async function vaultKeyFor(password, salt) {
  return aesKey(await pbkdf2Bits(password, salt, 256));
}
async function openVault(password, blob) {
  const box = JSON.parse(blob);
  if (box.v !== 3) throw new Error("old vault");
  const salt = fromB64(box.s);
  const key = await vaultKeyFor(password, salt);
  return { key, salt, data: await unseal(key, box.d) };
}

async function syncVaultToCloud() {
  if (!vaultKey || !vaultTopic) return false;
  try {
    const rawVault = lsGet(LS + "vault_data");
    if (!rawVault) return false;
    const resp = await fetch(SERVER + "/" + vaultTopic, { method: "POST", body: rawVault });
    return resp.ok;
  } catch (err) {
    console.warn("[Kairo] Cloud backup failed:", err);
    return false;
  }
}

// Returns every backup found, newest first, so one junk post can't block a restore.
async function fetchVaultsFromCloud(userKey, password) {
  const found = [];
  try {
    const topic = await getCloudVaultTopic(userKey, password);
    const resp = await fetch(SERVER + "/" + topic + "/json?poll=1&since=all");
    if (!resp.ok) return found;
    (await resp.text()).split("\n").filter(Boolean).reverse().forEach((line) => {
      try { const p = JSON.parse(line); if (p.message) found.push(p.message); } catch {}
    });
  } catch {}
  return found;
}

async function saveVault() {
  if (!vaultKey) return;
  const key = vaultKey, salt = vaultSalt;
  const payload = {
    me,
    identity,
    settings,
    blocked: Array.from(blockedUsers),
    chats: Array.from(rooms.values(), (r) => r.meta)
  };
  try {
    const enc = JSON.stringify({ v: 3, s: toB64(salt), d: await seal(key, payload) });
    if (vaultKey !== key) return;
    lsSet(LS + "vault_data", enc);
    syncVaultToCloud();
  } catch {}
}

// Signing identity: lets others check a message really came from the same sender as before.
async function idFor(pub) { return (await sha256Hex("id|" + pub)).slice(0, 32); }
async function createIdentity() {
  const pair = await crypto.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, true, ["sign", "verify"]);
  const pub = toB64(new Uint8Array(await crypto.subtle.exportKey("raw", pair.publicKey)));
  return { priv: await crypto.subtle.exportKey("jwk", pair.privateKey), pub, id: await idFor(pub) };
}
async function useIdentity(saved) {
  identity = saved;
  signKey = await crypto.subtle.importKey("jwk", saved.priv, { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"]);
  me.id = saved.id;
}
async function verifyEnvelope(env) {
  const pk = await crypto.subtle.importKey("raw", fromB64(env.p), { name: "ECDSA", namedCurve: "P-256" }, false, ["verify"]);
  const ok = await crypto.subtle.verify({ name: "ECDSA", hash: "SHA-256" }, pk, fromB64(env.s), te.encode(env.b));
  if (!ok) return null;
  const m = JSON.parse(env.b);
  return m && m.i === (await idFor(env.p)) ? m : null;
}
function shortId(id) { return String(id || "").slice(0, 12).replace(/(.{4})(?=.)/g, "$1 "); }

function exportVaultString() {
  EE.unlockFrag("frag_04", "the relay keeps no memories. supposedly.");
  const enc = lsGet(LS + "vault_data");
  if (!enc) return toast("No encrypted vault found on this device.");
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(enc).then(() => {
      toast("Encrypted vault string copied to clipboard!");
    }).catch(() => {
      prompt("Copy your encrypted vault string manually:", enc);
    });
  } else {
    prompt("Copy your encrypted vault string manually:", enc);
  }
}

function promptImportVault() {
  const raw = prompt("Paste your encrypted vault string here to restore your account:");
  if (!raw || !raw.trim()) return;
  try { if (JSON.parse(raw.trim()).v !== 3) throw 0; } catch { return toast("That isn't a backup from this version of Kairo."); }
  if (lsGet(LS + "vault_data") && !confirm("Replace the account saved on this device?")) return;
  lsSet(LS + "vault_data", raw.trim());
  toast("Vault imported. Enter your Master Password to unlock.");
  promptVaultLogin();
}

async function unlockAllSavedRooms() {
  for (const r of rooms.values()) {
    await hydrate(r);
    if (!r.key && r.meta.pw) {
      try {
        const d = await deriveRoom(r.meta.room, r.meta.pw);
        if (d.topic === r.meta.topic) r.key = d.key;
      } catch {}
    }
  }
  resubscribe();
  renderSidebar();
  if (!activeTopic) renderWelcome();
}

function promptVaultLogin() {
  checkSecure();
  const rawVault = lsGet(LS + "vault_data");
  const lastKey = lsGet(LS + "last_key") || "";

  if (rawVault || lastKey) {
    const box = el("form", { className: "modal" });
    box.append(
      el("div", { className: "modalHeader" },
        el("div", { className: "modalBadge", textContent: "k." }),
        el("div", {},
          el("h2", { textContent: "Unlock Kairo Vault" }),
          el("p", { textContent: "Encrypted account restore" })
        )
      ),
      el("p", { textContent: "Enter your User Key and Master Password. If your device was cleared, Kairo will restore your channels automatically." })
    );

    const keyInp = el("input", { type: "text", placeholder: "Your User Key (e.g. arvi)", value: lastKey, maxLength: 20 });
    const pwInp = el("input", { type: "password", placeholder: "Enter master password...", maxLength: 80 });
    const err = el("p", { className: "err" });
    const unlockBtn = el("button", { type: "submit", className: "btn", textContent: "Unlock & Sync" });

    const subRow = el("div", { className: "subRow" },
      el("button", {
        type: "button",
        className: "linkBtn",
        textContent: "Paste Backup String",
        onclick: promptImportVault
      }),
      el("button", {
        type: "button",
        className: "linkBtn danger",
        textContent: "New Account",
        onclick: () => {
          if (!confirm("Remove the saved account from this device? Export your vault first if you want to keep it.")) return;
          lsDel(LS + "vault_data");
          lsDel(LS + "last_key");
          rooms.clear();
          promptVaultLogin();
        }
      })
    );

    box.append(
      el("h3", { textContent: "User Key" }), keyInp,
      el("h3", { textContent: "Master Password" }), pwInp,
      err,
      el("div", { className: "row" }, unlockBtn),
      subRow
    );

    box.onsubmit = async (e) => {
      e.preventDefault();
      unlockBtn.disabled = true;
      const uKey = sanitizeKey(keyInp.value);
      const pw = pwInp.value;
      if (!uKey) { err.textContent = "Enter your User Key."; unlockBtn.disabled = false; return; }
      if (!pw) { err.textContent = "Enter your Master Password."; unlockBtn.disabled = false; return; }

      err.textContent = "Locating vault snapshot...";
      const local = lsGet(LS + "vault_data");
      let candidates = local ? [local] : [];
      if (!local) {
        err.textContent = "Fetching backup from the relay...";
        candidates = await fetchVaultsFromCloud(uKey, pw);
      }
      if (!candidates.length) {
        err.textContent = "No vault found locally or on the relay for @" + uKey;
        unlockBtn.disabled = false;
        return;
      }

      try {
        let opened = null, used = "";
        for (const c of candidates) {
          try { opened = await openVault(pw, c); used = c; break; } catch {}
        }
        if (!opened) throw new Error("locked");
        const data = opened.data;
        if (sanitizeKey((data.me || {}).userKey) !== uKey) throw new Error("wrong user");
        vaultTopic = await getCloudVaultTopic(uKey, pw);
        Object.assign(me, data.me);
        await useIdentity(data.identity);
        vaultKey = opened.key;
        vaultSalt = opened.salt;
        lsSet(LS + "vault_data", used);
        lsSet(LS + "last_key", uKey);

        Object.assign(settings, data.settings || {});
        settings.cloak = "kairo";
        applyTheme(settings.theme);
        applyCloak();
        blockedUsers = new Set(data.blocked || []);
        rooms.clear();
        (data.chats || []).forEach((meta) => {
          if (meta && meta.topic) rooms.set(meta.topic, makeRoom(meta));
        });

        closeModal();
        toast("Welcome back, @" + (me.userKey || me.name) + "!");
        await unlockAllSavedRooms();
      } catch {
        err.textContent = "Incorrect password or corrupted vault.";
        unlockBtn.disabled = false;
      }
    };
    showModal(box);
    pwInp.focus();
  } else {
    const box = el("form", { className: "modal" });
    box.append(
      el("div", { className: "modalHeader" },
        el("div", { className: "modalBadge", textContent: "k." }),
        el("div", {},
          el("h2", { textContent: "Initialize Kairo Vault" }),
          el("p", { textContent: "Persistent encrypted account" })
        )
      ),
      el("p", { textContent: "Set a unique User Key (lowercase handle) and Master Password. Encrypted backups are sent to the relay. There is no password reset, so keep your passphrase safe." })
    );
    const keyInp = el("input", { type: "text", placeholder: "Permanent Key (e.g. arvi, user_1)", maxLength: 20 });
    const nameInp = el("input", { type: "text", placeholder: "Display Name (e.g. Arvi)", maxLength: 20 });
    const avInp = el("input", { type: "text", placeholder: "Avatar Initials (e.g. AR)", maxLength: 4 });
    const bioInp = el("input", { type: "text", placeholder: "Status bio (optional)", maxLength: 50 });
    const pwInp = el("input", { type: "password", placeholder: "Master passphrase (16+ characters)", maxLength: 80 });
    const err = el("p", { className: "err" });
    const createBtn = el("button", { type: "submit", className: "btn", textContent: "Create Encrypted Vault" });

    const subRow = el("div", { className: "subRow" },
      el("span", { style: "font-size:.74rem;color:var(--muted)", textContent: "Already have a vault?" }),
      el("button", {
        type: "button",
        className: "linkBtn",
        textContent: "Restore Existing Vault",
        onclick: promptImportVault
      })
    );

    box.append(
      el("h3", { textContent: "User Key (@handle for DMs)" }), keyInp,
      el("h3", { textContent: "Display Name" }), nameInp,
      el("h3", { textContent: "Avatar Initials (Optional)" }), avInp,
      el("h3", { textContent: "Status Bio (Optional)" }), bioInp,
      el("h3", { textContent: "Master Password" }), pwInp,
      err,
      el("div", { className: "row" }, createBtn),
      subRow
    );

    box.onsubmit = async (e) => {
      e.preventDefault();
      const uKey = sanitizeKey(keyInp.value);
      const disp = nameInp.value.trim();
      const pw = pwInp.value;
      if (!uKey) { err.textContent = "User Key is required (lowercase letters/numbers)."; return; }
      if (passProblem(pw)) { err.textContent = passProblem(pw); return; }
      createBtn.disabled = true;
      try {
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const key = await vaultKeyFor(pw, salt);
        const topic = await getCloudVaultTopic(uKey, pw);
        await useIdentity(await createIdentity());
        vaultKey = key;
        vaultSalt = salt;
        vaultTopic = topic;
        me.userKey = uKey;
        me.name = disp || uKey;
        me.avatar = avInp.value.trim().slice(0, 4);
        me.bio = bioInp.value.trim().slice(0, 50);
        lsSet(LS + "last_key", uKey);
        await saveVault();
        closeModal();
        renderSidebar();
        renderWelcome();
        resubscribe();
      } catch (ex) {
        err.textContent = ex.message || "Could not create vault.";
        createBtn.disabled = false;
      }
    };
    showModal(box);
    keyInp.focus();
  }
}

function lockVaultSession() {
  arcade.close();
  if (peerConn || callState !== "idle") endCall();
  if (isRecording && mediaRecorder) { mediaRecorder.onstop = null; mediaRecorder.stream.getTracks().forEach((t) => t.stop()); isRecording = false; }
  vaultKey = null; vaultSalt = null; vaultTopic = ""; identity = null; signKey = null;
  if (es) { es.close(); es = null; }
  esKey = "";
  rooms.clear();
  blockedUsers = new Set();
  Object.assign(me, { id: rnd(), userKey: "", name: "", avatar: "", avatarImg: null, bio: "", status: "online" });
  replyingTo = null;
  closeModal();
  $("lightboxHost").innerHTML = "";
  renderWelcome();
  setRelayState("paused");
  setStatus("vault locked");
  promptVaultLogin();
}

function isBlocked(id) {
  return blockedUsers.has(String(id || "").toLowerCase());
}
function toggleBlockUser(name) {
  const key = String(name || "").trim().toLowerCase();
  if (!key) return;
  if (blockedUsers.has(key)) {
    blockedUsers.delete(key);
    toast("Unblocked sender");
  } else {
    blockedUsers.add(key);
    toast("Blocked sender");
  }
  saveVault();
  if (activeTopic) renderChatLog(true);
}
function showBlockedModal() {
  const list = Array.from(blockedUsers);
  const box = el("div", { className: "modal" },
    el("h2", { textContent: "Blocked Users" }),
    el("p", { textContent: list.length ? "Messages from these users are hidden:" : "You haven't blocked anyone yet." })
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

function showThemeSettings() {
  const box = el("form", { className: "modal" });
  box.append(
    el("h2", { textContent: "Themes & Color Studio" }),
    el("p", { textContent: "Customize your theme and pick custom colors." }),
    el("h3", { textContent: "Color Theme Preset" })
  );
  const themeSel = el("select", {},
    el("option", { value: "dark", textContent: "Midnight Dark (Default)" }),
    el("option", { value: "cyberpunk", textContent: "Cyberpunk Neon" }),
    el("option", { value: "emerald", textContent: "Emerald Forest" }),
    el("option", { value: "crimson", textContent: "Crimson Velvet" }),
    el("option", { value: "light", textContent: "Daylight Mode" }),
    el("option", { value: "custom", textContent: "Custom Studio (Pick Your Own)" })
  );
  if (EE.data.channelZero) {
    themeSel.append(el("option", { value: "channel_zero", textContent: "Channel Zero (Unlocked)" }));
  }
  themeSel.value = settings.theme || "dark";

  const customColors = settings.customColors || { bg: "#0f1012", side: "#16171a", accent: "#5865f2", text: "#f3f4f6" };
  const bgInput = el("input", { type: "color", value: customColors.bg });
  const sideInput = el("input", { type: "color", value: customColors.side });
  const accentInput = el("input", { type: "color", value: customColors.accent });
  const textInput = el("input", { type: "color", value: customColors.text || "#f3f4f6" });

  const colorStudioDiv = el("div", { id: "colorStudioDiv", hidden: themeSel.value !== "custom" },
    el("h3", { textContent: "Custom Palette Studio" }),
    el("div", { className: "colorRow" },
      el("div", { className: "colorField" }, el("span", { textContent: "Chat" }), bgInput),
      el("div", { className: "colorField" }, el("span", { textContent: "Side" }), sideInput),
      el("div", { className: "colorField" }, el("span", { textContent: "Accent" }), accentInput),
      el("div", { className: "colorField" }, el("span", { textContent: "Text" }), textInput)
    )
  );

  const previewUpdate = () => {
    if (themeSel.value === "custom") {
      settings.customColors = { 
        bg: bgInput.value, 
        side: sideInput.value, 
        accent: accentInput.value,
        text: textInput.value
      };
      applyTheme("custom");
    } else {
      applyTheme(themeSel.value);
    }
  };

  themeSel.onchange = () => {
    colorStudioDiv.hidden = themeSel.value !== "custom";
    previewUpdate();
  };
  bgInput.oninput = previewUpdate;
  sideInput.oninput = previewUpdate;
  accentInput.oninput = previewUpdate;
  textInput.oninput = previewUpdate;

  const enterSel = el("select", {},
    el("option", { value: "true", textContent: "Press Enter to Send" }),
    el("option", { value: "false", textContent: "Click Send Button Only" })
  );
  enterSel.value = settings.sendOnEnter !== false ? "true" : "false";

  const soundSel = el("select", {},
    el("option", { value: "on", textContent: "Enabled (Synthesized Chime)" }),
    el("option", { value: "off", textContent: "Muted" })
  );
  soundSel.value = settings.sound ? "on" : "off";

  const saveBtn = el("button", { type: "submit", className: "btn", textContent: "Save Preferences" });
  const cancelBtn = el("button", { type: "button", className: "btn secondary", textContent: "Close", onclick: closeModal });
  box.append(
    themeSel,
    colorStudioDiv,
    el("h3", { textContent: "Send Message Keybind" }), enterSel,
    el("h3", { textContent: "Message Sound Effects" }), soundSel,
    el("div", { className: "row" }, saveBtn, cancelBtn)
  );
  box.onsubmit = async (e) => {
    e.preventDefault();
    if (themeSel.value === "custom") {
      settings.customColors = { 
        bg: bgInput.value, 
        side: sideInput.value, 
        accent: accentInput.value,
        text: textInput.value
      };
      applyTheme("custom");
    } else {
      applyTheme(themeSel.value);
    }
    settings.sendOnEnter = enterSel.value === "true";
    settings.sound = soundSel.value === "on";
    updateDocTitle();
    await saveVault();
    closeModal();
    toast("Preferences saved!");
  };
  showModal(box);
}

function showEasterEggSettings() {
  const box = el("div", { className: "modal", style: "width:min(520px,100%)" });
  box.append(
    el("h2", { textContent: "Easter Eggs & Lore Archives" }),
    el("p", { textContent: "Manage playful local secrets, achievements, and lore discoveries." }),
    el("h3", { textContent: "Preferences" })
  );

  const chkFx = el("input", { type: "checkbox", checked: EE.data.cfg.fx });
  const chkToast = el("input", { type: "checkbox", checked: EE.data.cfg.toasts });
  const chkRare = el("input", { type: "checkbox", checked: EE.data.cfg.rare });

  const labelRow = (input, text) => el("label", { style: "display:flex;align-items:center;gap:10px;font-size:.78rem;cursor:pointer;margin:4px 0" }, input, el("span", { textContent: text }));

  box.append(
    labelRow(chkFx, "Enable visual easter eggs (confetti, stars, glow)"),
    labelRow(chkToast, "Enable achievement toasts"),
    labelRow(chkRare, "Enable subtle strategy ticker on overview card")
  );

  chkFx.onchange = () => { EE.data.cfg.fx = chkFx.checked; EE.save(); };
  chkToast.onchange = () => { EE.data.cfg.toasts = chkToast.checked; EE.save(); };
  chkRare.onchange = () => { EE.data.cfg.rare = chkRare.checked; EE.save(); };

  box.append(el("h3", { textContent: "Unlocked Achievements" }));
  const achList = [
    { id: "first_msg", title: "signal acquired", desc: "First successfully sent message" },
    { id: "first_img", title: "visual evidence", desc: "First successfully sent image" },
    { id: "yapper_100", title: "professional yapper", desc: "100 successfully sent messages" },
    { id: "bandwidth_1000", title: "bandwidth enthusiast", desc: "1,000 successfully sent messages" },
    { id: "outlook_1200", title: "outlook email", desc: "Message containing exactly 1,200 chars" },
    { id: "sleep_3am", title: "sleep schedule disconnected", desc: "Message sent between 3:00 AM & 3:59 AM" },
    { id: "first_group", title: "the council has assembled", desc: "Created your first group" },
    { id: "call_404", title: "call not found", desc: "Call duration reached 4m 04s" },
    { id: "call_10m", title: "ten-minute transmission", desc: "Call duration reached 10m" },
    { id: "call_mute_spam", title: "indecision detected", desc: "Muted & unmuted 5 times in 10s" }
  ];

  const achGrid = el("div", { style: "display:grid;gap:8px;max-height:180px;overflow-y:auto;margin:6px 0;padding-right:4px" });
  achList.forEach((a) => {
    const unlocked = !!EE.data.achievements[a.id];
    achGrid.append(el("div", {
      style: "display:flex;justify-content:space-between;align-items:flex-start;background:var(--panel);border:1px solid var(--border);border-radius:8px;padding:8px 10px;font-size:.74rem;gap:8px"
    },
      el("div", { style: "flex:1;min-width:0" },
        el("div", { style: "font-weight:700;color:" + (unlocked ? "var(--green)" : "var(--muted)") + ";word-break:break-word" }, (unlocked ? "[UNLOCKED] " : "[LOCKED] ") + a.title),
        el("div", { style: "font-size:.68rem;color:var(--muted);word-break:break-word;margin-top:2px" }, a.desc)
      ),
      el("span", { className: "kbd", textContent: unlocked ? "DONE" : "LOCK" })
    ));
  });
  box.append(achGrid);

  const hasFrags = Object.keys(EE.data.fragments).length > 0;
  if (hasFrags) {
    box.append(el("h3", { textContent: "Kairo Lore Fragments" }));
    const frags = [
      { id: "frag_01", num: "01", quote: "the first channel opened before kairo had a name." },
      { id: "frag_02", num: "02", quote: "nobody remembers creating channel zero." },
      { id: "frag_03", num: "03", quote: "some messages arrive before the typing indicator." },
      { id: "frag_04", num: "04", quote: "the relay keeps no memories. supposedly." }
    ];
    const fragWrap = el("div", { style: "display:grid;gap:8px;max-height:160px;overflow-y:auto" });
    frags.forEach((f) => {
      const discovered = !!EE.data.fragments[f.id];
      fragWrap.append(el("div", { style: "background:var(--panel);border:1px solid var(--border);border-radius:8px;padding:10px 12px;font-size:.74rem;overflow-wrap:break-word" },
        el("div", { style: "font-family:var(--font-mono);font-size:.65rem;color:var(--accent);font-weight:700" }, "FRAGMENT " + f.num),
        el("div", { style: "font-style:italic;color:" + (discovered ? "var(--text)" : "var(--muted)") + ";word-break:break-word;margin-top:2px;line-height:1.4" }, discovered ? "“" + f.quote + "”" : "undiscovered")
      ));
    });
    box.append(fragWrap);
  }

  const subRow = el("div", { className: "subRow" },
    el("button", {
      type: "button",
      className: "linkBtn danger",
      textContent: "Reset Easter Egg Progress",
      onclick: () => {
        if (confirm("Reset achievements and discoveries? Your messages, vault, and contacts will NOT be altered.")) {
          EE.reset();
          closeModal();
        }
      }
    }),
    el("button", { type: "button", className: "btn secondary small", textContent: "Done", onclick: closeModal })
  );

  box.append(subRow);
  showModal(box);
}

/* Modals for Interactive Dashboard Info Cards (NO EMOJIS) */
function showVaultInfoModal() {
  const box = el("div", { className: "modal" },
    el("div", { className: "modalHeader" },
      el("div", { className: "modalBadge", textContent: "V" }),
      el("div", {},
        el("h2", { textContent: "Account Vault Architecture" }),
        el("p", { textContent: "AES-256-GCM encryption on your device" })
      )
    ),
    el("p", { textContent: "Your vault is encrypted directly in browser memory using AES-256-GCM. Your Master Password is used with PBKDF2 (600,000 iterations) and a random salt to make the encryption key." }),
    el("h3", { textContent: "Security Safeguards" }),
    el("ol", {},
      el("li", { textContent: "Your master passphrase is not sent to the relay or saved." }),
      el("li", { textContent: "Encrypted snapshots sync to your private cloud topic whenever you save changes." }),
      el("li", { textContent: "Vault Status: " + (vaultKey ? "Unlocked & Active" : "Locked") })
    ),
    el("div", { className: "row" },
      el("button", { className: "btn", textContent: "Close", onclick: closeModal })
    )
  );
  showModal(box);
}

function showRelayInfoModal() {
  const box = el("div", { className: "modal" },
    el("div", { className: "modalHeader" },
      el("div", { className: "modalBadge", textContent: "R" }),
      el("div", {},
        el("h2", { textContent: "Cloud Relay & WebRTC Transit" }),
        el("p", { textContent: "Server-Sent Events (SSE) + Direct Audio Traversal" })
      )
    ),
    el("p", { textContent: "Kairo sends encrypted messages through a relay (" + SERVER.replace("https://", "") + "). The relay can see information such as IP addresses, timing and size." }),
    el("h3", { textContent: "Live Connection Diagnostics" }),
    el("ol", {},
      el("li", { textContent: "Relay State: " + relayStatusState.toUpperCase() }),
      el("li", { textContent: "SSE Channel Key: " + (esKey ? esKey.slice(0, 30) + "..." : "none") }),
      el("li", { textContent: "WebRTC Audio ICE Servers: stun.l.google.com:19302" }),
      el("li", { textContent: "Current Strategy: " + activeRelayPun })
    ),
    el("div", { className: "row" },
      el("button", { className: "btn secondary", textContent: "Wake & Reconnect", onclick: () => { closeModal(); resubscribe(); } }),
      el("button", { className: "btn", textContent: "Close", onclick: closeModal })
    )
  );
  showModal(box);
}

function showChannelsInfoModal() {
  const allChats = Array.from(rooms.values());
  const unlocked = allChats.filter((r) => r.key);
  const box = el("div", { className: "modal" },
    el("div", { className: "modalHeader" },
      el("div", { className: "modalBadge", textContent: "#" }),
      el("div", {},
        el("h2", { textContent: "Channel & Room Status" }),
        el("p", { textContent: "A separate key for each chat" })
      )
    ),
    el("p", { textContent: "Each direct message and group channel operates under its own unique AES-256 session key derived from its room name and secret password." }),
    el("h3", { textContent: "Summary" }),
    el("ol", {},
      el("li", { textContent: "Total Stored Channels: " + allChats.length + " / " + MAX_CHATS }),
      el("li", { textContent: "Unlocked & Hot: " + unlocked.length }),
      el("li", { textContent: "Direct Messages: " + allChats.filter(r => r.meta.type === 'dm').length }),
      el("li", { textContent: "Groups: " + allChats.filter(r => r.meta.type !== 'dm').length })
    ),
    el("div", { className: "row" },
      el("button", { className: "btn", textContent: "Done", onclick: closeModal })
    )
  );
  showModal(box);
}

// History and drafts are encrypted before they're saved on the device.
function writeSealed(r, slot, value) {
  const key = vaultKey, name = LS + slot + r.meta.topic;
  if (!key || r.gone) return;
  const copy = JSON.parse(JSON.stringify(value));
  r.saveQ = (r.saveQ || Promise.resolve()).then(async () => {
    const enc = await seal(key, copy);
    if (!r.gone) lsSet(name, enc);
  }).catch(() => {});
}
function persistRoom(r) { writeSealed(r, "t:", r.store); }
function getDraft(topic) { const r = rooms.get(topic); return (r && r.draft) || ""; }
function setDraft(topic, val) {
  const r = rooms.get(topic);
  if (!r) return;
  r.draft = val || "";
  writeSealed(r, "d:", r.draft);
}
function makeRoom(meta) {
  return {
    meta, key: null, draft: "",
    store: { msgs: [], lastSrv: 0, pinned: null, nonces: [], floor: 0, keys: {} },
    seen: new Set(),
    people: new Map(), unread: 0, ready: false, helloSent: false,
    typing: new Map()
  };
}
async function hydrate(r) {
  try { const t = lsGet(LS + "t:" + r.meta.topic); if (t) Object.assign(r.store, await unseal(vaultKey, t)); } catch {}
  try { const d = lsGet(LS + "d:" + r.meta.topic); if (d) r.draft = await unseal(vaultKey, d); } catch {}
  r.seen = new Set(r.store.msgs.map((m) => m.id));
}

async function post(r, kind, extra) {
  if ((kind === "h" || kind === "p") && me.status === "invisible") return;
  if (!signKey) throw new Error("Vault is locked");
  const id = identity, sk = signKey;
  const m = Object.assign({
    r: r.meta.topic,
    n: rnd(),
    i: id.id,
    uk: me.userKey || me.name,
    k: kind,
    name: me.name,
    av: me.avatar || "",
    avi: me.avatarImg || null,
    bio: me.bio || "",
    st: me.status || "online",
    t: Date.now()
  }, extra || {});
  const b = JSON.stringify(m);
  const sig = toB64(new Uint8Array(await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, sk, te.encode(b))));
  const body = await seal(r.key, { b, p: id.pub, s: sig });
  const resp = await fetch(SERVER + "/" + r.meta.topic, { method: "POST", body });
  if (!resp.ok) throw new Error("Relay error " + resp.status);
}

function formatDuration(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}

function startCallDuration() {
  clearInterval(callDurationTimer);
  callStartTime = Date.now();
  callDurationTimer = setInterval(() => {
    const durEl = $("callDurationText");
    if (durEl && callStartTime > 0) {
      const elapsed = Math.floor((Date.now() - callStartTime) / 1000);
      durEl.textContent = formatDuration(elapsed);

      if (elapsed === 244) EE.unlock("call_404", "call not found");
      if (elapsed === 600) EE.unlock("call_10m", "ten-minute transmission");
    }
  }, 1000);
}

function setupAudioAnalysis(stream) {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    if (!audioContext) audioContext = new Ctx();
    if (audioContext.state === "suspended") audioContext.resume();
    analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 64;
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyserNode);

    const dataArray = new Uint8Array(analyserNode.frequencyBinCount);
    clearInterval(remoteAudioCheckTimer);
    remoteAudioCheckTimer = setInterval(() => {
      if (!analyserNode || callState !== "connected") return;
      analyserNode.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
      const avg = sum / dataArray.length;
      const remoteWrap = $("remoteAvatarWrap");
      if (remoteWrap) {
        if (avg > 18) remoteWrap.classList.add("speaking");
        else remoteWrap.classList.remove("speaking");
      }
    }, 120);
  } catch {}
}

function renderCallPanel() {
  const host = $("callHost");
  if (!host) return;

  if (callState === "idle" || !activeCallTopic) {
    host.innerHTML = "";
    return;
  }

  const r = rooms.get(activeCallTopic);
  const peer = r ? activePeople(r)[0] : null;
  const peerName = peer ? peer.name : (r ? r.meta.title : "Friend");
  const peerAv = peer && peer.av ? peer.av : (r ? initials(r.meta.title) : "?");
  const myAv = me.avatar || initials(me.name);

  const fresh = !host.firstChild;
  host.innerHTML = "";

  const panel = el("div", { id: "callPanel", className: "callPanel" + (fresh ? " k-drop" : "") });
  if (callState === "ended") panel.classList.add("endedState");

  const myAvatarEl = el("div", { className: "callAvatar" });
  if (me.avatarImg) {
    myAvatarEl.style.backgroundImage = `url(${me.avatarImg})`;
  } else {
    myAvatarEl.textContent = myAv;
  }

  const myWrap = el("div", { className: "callAvatarWrap" + (callState === "calling" ? " pulsing" : "") },
    el("div", { className: "callPulseRing" }),
    myAvatarEl
  );
  const mySide = el("div", { className: "callParticipant" }, myWrap, el("div", { className: "callParticipantName", textContent: "You (" + me.name + ")" }));

  const remoteAvatarEl = el("div", { className: "callAvatar" });
  if (peer && peer.avi) {
    remoteAvatarEl.style.backgroundImage = `url(${peer.avi})`;
  } else {
    remoteAvatarEl.textContent = peerAv;
  }

  const remoteWrap = el("div", { id: "remoteAvatarWrap", className: "callAvatarWrap" + (callState === "ringing" || callState === "incoming" ? " pulsing" : "") },
    el("div", { className: "callPulseRing" }),
    remoteAvatarEl
  );
  const remoteSide = el("div", { className: "callParticipant" }, remoteWrap, el("div", { className: "callParticipantName", textContent: peerName }));

  const waves = el("div", { className: "callWaves" + (callState === "calling" || callState === "ringing" ? " activeWaves" : "") });
  const centerGlow = el("div", { className: "callCenterGlow" + (callState === "connected" ? " visible" : "") });

  const stage = el("div", { className: "callStage" }, mySide, waves, centerGlow, remoteSide);

  let statusStr = "Connecting...";
  if (callState === "calling") statusStr = "Calling " + peerName + "...";
  else if (callState === "ringing") statusStr = "Ringing...";
  else if (callState === "incoming") statusStr = "Incoming call from " + peerName;
  else if (callState === "connected") statusStr = "Call in progress";
  else if (callState === "ended") statusStr = "Call ended";

  const meta = el("div", { className: "callMeta" },
    el("div", { className: "callStatusLine", textContent: statusStr }),
    el("div", { id: "callDurationText", className: "callDuration", textContent: callState === "connected" ? "00:00" : (callState === "ended" ? "Disconnected" : "Secure P2P") })
  );

  const ctrls = el("div", { className: "callControls" });
  if (callState === "incoming") {
    ctrls.append(
      el("button", {
        type: "button",
        className: "callCtrlBtn acceptBtn",
        title: "Accept Call",
        textContent: "📞",
        onclick: acceptIncomingCall
      }),
      el("button", {
        type: "button",
        className: "callCtrlBtn endCallBtn",
        title: "Decline Call",
        textContent: "×",
        onclick: () => endCall("Call declined")
      })
    );
  } else {
    ctrls.append(
      el("button", {
        type: "button",
        className: "callCtrlBtn" + (isMuted ? " active" : ""),
        title: isMuted ? "Unmute Microphone" : "Mute Microphone",
        textContent: isMuted ? "🔇" : "🎙️",
        onclick: toggleMute
      }),
      el("button", {
        type: "button",
        className: "callCtrlBtn" + (isDeafened ? " active" : ""),
        title: isDeafened ? "Unmute Audio" : "Deafen Audio",
        textContent: isDeafened ? "🔈" : "🔊",
        onclick: toggleDeafen
      }),
      el("button", {
        type: "button",
        className: "callCtrlBtn endCallBtn",
        title: "End Call",
        textContent: "×",
        onclick: () => endCall("Call ended")
      })
    );
  }

  panel.append(stage, meta, ctrls);
  host.append(panel);
}

async function initCallPeer(r) {
  activeCallTopic = r.meta.topic;
  peerConn = new RTCPeerConnection(rtcConfig);

  localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  localStream.getTracks().forEach((t) => peerConn.addTrack(t, localStream));

  peerConn.ontrack = (e) => {
    const audioEl = $("remoteAudio");
    if (audioEl && e.streams && e.streams[0]) {
      audioEl.srcObject = e.streams[0];
      setupAudioAnalysis(e.streams[0]);
    }
  };

  peerConn.onicecandidate = (e) => {
    if (e.candidate) {
      post(r, "rtc_candidate", { candidate: e.candidate, call: callId }).catch(() => {});
    }
  };

  peerConn.onconnectionstatechange = () => {
    if (!peerConn) return;
    if (peerConn.connectionState === "connected") {
      callState = "connected";
      renderCallPanel();
      startCallDuration();
    } else if (peerConn.connectionState === "disconnected" || peerConn.connectionState === "failed") {
      endCall("Connection dropped");
    }
  };
}

async function startCall() {
  const r = rooms.get(activeTopic);
  if (!r || !r.key || r.meta.type !== "dm" || callState !== "idle") return;
  if (!confirm("Start a call? The other person may be able to see your IP address.")) return;
  try {
    callId = rnd(); callPeer = ""; earlyCandidates = [];
    isCaller = true;
    isMuted = false;
    isDeafened = false;
    callState = "calling";
    await initCallPeer(r);
    renderCallPanel();
    const offer = await peerConn.createOffer();
    await peerConn.setLocalDescription(offer);
    await post(r, "rtc_offer", { sdp: offer, call: callId });
    setTimeout(() => {
      if (callState === "calling") {
        callState = "ringing";
        renderCallPanel();
      }
    }, 2200);
  } catch (err) {
    toast("Could not start call: " + (err.message || "microphone permission needed"));
    endCall("Failed to start call");
  }
}

let pendingIncomingOffer = null;
async function promptIncomingCall(r, who, sdp) {
  arcade.close();
  playNotifSound();
  activeCallTopic = r.meta.topic;
  callState = "incoming";
  pendingIncomingOffer = sdp;
  renderCallPanel();
}

async function acceptIncomingCall() {
  const r = rooms.get(activeCallTopic);
  if (!r || !pendingIncomingOffer) return;
  if (!confirm("Accept the call? The other person may be able to see your IP address.")) return;
  try {
    isCaller = false;
    isMuted = false;
    isDeafened = false;
    await initCallPeer(r);
    await peerConn.setRemoteDescription(new RTCSessionDescription(pendingIncomingOffer));
    for (const c of earlyCandidates.filter((x) => x.from === callPeer)) { try { await peerConn.addIceCandidate(c.candidate); } catch {} }
    earlyCandidates = [];
    const answer = await peerConn.createAnswer();
    await peerConn.setLocalDescription(answer);
    await post(r, "rtc_answer", { sdp: answer, call: callId });
    pendingIncomingOffer = null;
    callState = "connected";
    renderCallPanel();
    startCallDuration();
  } catch (err) {
    toast("Failed to connect call: " + (err.message || "error"));
    endCall("Failed to connect");
  }
}

function toggleMute() {
  if (!localStream) return;
  isMuted = !isMuted;
  localStream.getAudioTracks().forEach((track) => { track.enabled = !isMuted; });
  renderCallPanel();

  const now = Date.now();
  EE.muteToggles.push(now);
  EE.muteToggles = EE.muteToggles.filter(t => now - t <= 10000);
  if (EE.muteToggles.length >= 5) {
    EE.unlock("call_mute_spam", "indecision detected");
  }
}

function toggleDeafen() {
  const audioEl = $("remoteAudio");
  isDeafened = !isDeafened;
  if (audioEl) audioEl.muted = isDeafened;
  renderCallPanel();
}

function endCall(msg, remote) {
  if (activeCallTopic && callId && !remote) {
    const r = rooms.get(activeCallTopic);
    if (r && r.key) post(r, "rtc_hangup", { call: callId }).catch(() => {});
  }
  callId = ""; callPeer = ""; earlyCandidates = []; pendingIncomingOffer = null;
  clearInterval(callDurationTimer);
  clearInterval(remoteAudioCheckTimer);
  callStartTime = 0;

  if (localStream) {
    localStream.getTracks().forEach((t) => t.stop());
    localStream = null;
  }
  if (peerConn) {
    peerConn.close();
    peerConn = null;
  }
  const audioEl = $("remoteAudio");
  if (audioEl) audioEl.srcObject = null;

  if (callState !== "idle") {
    callState = "ended";
    renderCallPanel();
    setTimeout(() => {
      callState = "idle";
      activeCallTopic = null;
      isCaller = false;
      isMuted = false;
      isDeafened = false;
      renderCallPanel();
    }, 1100);
  }
}

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
const shownItems = new Set();
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
  
  const avatar = el("div", { className: "avatar" });
  if (isDm && peer && peer.avi) {
    avatar.style.backgroundImage = `url(${peer.avi})`;
  } else {
    avatar.textContent = avText;
  }

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
  if (!shownItems.has(topic)) { shownItems.add(topic); item.classList.add("k-slide"); }
  item.onclick = () => openChat(topic);
  return item;
}
function renderSidebar() {
  const all = Array.from(rooms.values());
  const dms = all.filter((r) => r.meta.type === "dm");
  const groups = all.filter((r) => r.meta.type !== "dm");
  const fill = (box, list, empty) => {
    box.innerHTML = "";
    if (!list.length) box.append(el("div", { className: "itemSub", textContent: empty, style: "padding:8px 10px" }));
    list.forEach((r) => box.append(chatItem(r)));
  };
  fill($("contacts"), dms, "No direct messages yet.");
  fill($("groups"), groups, "No groups yet.");

  const sc = $("selfCard");
  sc.innerHTML = "";
  const myAv = el("div", { className: "avatar" });
  if (me.avatarImg) {
    myAv.style.backgroundImage = `url(${me.avatarImg})`;
  } else {
    myAv.textContent = me.avatar || initials(me.name || "?");
  }
  myAv.append(el("span", { className: "presence " + (me.status === "invisible" ? "" : (me.status || "online")) }));
  sc.append(
    myAv,
    el("div", { className: "selfInfo" },
      el("div", { className: "selfName", textContent: me.name + " (@" + (me.userKey || me.name) + ")" }),
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
    $("btnCall").hidden = false;
  } else {
    $("topStatus").textContent = "Online: You" + (list.length ? ", " + list.map((x) => x.name).join(", ") : "");
    $("topStatus").className = "status";
    $("btnCall").hidden = true;
  }

  const pinBar = $("pinnedHeader");
  if (r.store.pinned) {
    if (pinBar.hidden) replay(pinBar, "k-drop");
    pinBar.hidden = false;
    pinBar.innerHTML = "";
    pinBar.append(
      el("div", { className: "pinnedText" },
        el("span", { className: "pinnedIcon", textContent: "📌" }),
        el("b", { textContent: r.store.pinned.who + ":" }),
        document.createTextNode(r.store.pinned.text || "(Media Attachment)")
      ),
      el("button", {
        type: "button",
        className: "iconBtn",
        title: "Unpin message",
        textContent: "×",
        onclick: async () => {
          await post(r, "pin", { targetId: null });
          r.store.pinned = null;
          persistRoom(r);
          updateTop();
        }
      })
    );
  } else {
    pinBar.hidden = true;
    pinBar.innerHTML = "";
  }
}

function updateTypingDisplay() {
  const ind = $("typingInd");
  if (!ind) return;
  const r = rooms.get(activeTopic);
  if (!r) { ind.textContent = ""; return; }
  const typers = Array.from(r.typing.values());
  if (!typers.length) {
    ind.textContent = "";
  } else if (typers.length === 1) {
    ind.textContent = typers[0] + " is typing...";
  } else {
    ind.textContent = typers.join(", ") + " are typing...";
  }
}

function handleTypingEvent(r, who) {
  r.typing.set(who, who);
  if (r.meta.topic === activeTopic) updateTypingDisplay();
  const timerKey = r.meta.topic + "|" + who;
  if (typingTimeouts.has(timerKey)) clearTimeout(typingTimeouts.get(timerKey));
  typingTimeouts.set(timerKey, setTimeout(() => {
    r.typing.delete(who);
    if (r.meta.topic === activeTopic) updateTypingDisplay();
    typingTimeouts.delete(timerKey);
  }, 4000));
}

function parseInlineMarkdown(text) {
  const frag = document.createDocumentFragment();
  const tokens = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|~[^~]+~|`[^`]+`|https?:\/\/[^\s]+)/g;
  let lastIdx = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      tokens.push({ type: "text", val: text.slice(lastIdx, match.index) });
    }
    const raw = match[0];
    if (raw.startsWith("**") && raw.endsWith("**")) {
      tokens.push({ type: "bold", val: raw.slice(2, -2) });
    } else if (raw.startsWith("*") && raw.endsWith("*")) {
      tokens.push({ type: "italic", val: raw.slice(1, -1) });
    } else if (raw.startsWith("~") && raw.endsWith("~")) {
      tokens.push({ type: "strike", val: raw.slice(1, -1) });
    } else if (raw.startsWith("`") && raw.endsWith("`")) {
      tokens.push({ type: "inlineCode", val: raw.slice(1, -1) });
    } else if (raw.startsWith("http")) {
      tokens.push({ type: "link", val: raw });
    }
    lastIdx = regex.lastIndex;
  }
  if (lastIdx < text.length) {
    tokens.push({ type: "text", val: text.slice(lastIdx) });
  }

  tokens.forEach((tk) => {
    if (tk.type === "bold") frag.append(el("b", { textContent: tk.val }));
    else if (tk.type === "italic") frag.append(el("i", { textContent: tk.val }));
    else if (tk.type === "strike") frag.append(el("s", { textContent: tk.val }));
    else if (tk.type === "inlineCode") frag.append(el("code", { className: "inlineCode", textContent: tk.val }));
    else if (tk.type === "link") {
      frag.append(el("a", { href: tk.val, target: "_blank", rel: "noopener noreferrer", className: "chatLink", textContent: tk.val }));
    } else {
      frag.append(document.createTextNode(tk.val));
    }
  });
  return frag;
}

function formatMessageContent(rawText) {
  const container = document.createDocumentFragment();
  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
  let lastIdx = 0;
  let match;

  while ((match = codeBlockRegex.exec(rawText)) !== null) {
    if (match.index > lastIdx) {
      container.append(parseInlineMarkdown(rawText.slice(lastIdx, match.index)));
    }
    const lang = match[1] || "code";
    const code = match[2].trimEnd();

    const block = el("div", { className: "codeBlockWrap" },
      el("div", { className: "codeBlockHeader" },
        el("span", { textContent: lang.toLowerCase() }),
        el("button", {
          type: "button",
          className: "copyCodeBtn",
          textContent: "Copy code",
          onclick: () => {
            navigator.clipboard.writeText(code).then(() => toast("Code copied!"));
          }
        })
      ),
      el("pre", { className: "codeContent" }, document.createTextNode(code))
    );
    container.append(block);
    lastIdx = codeBlockRegex.lastIndex;
  }
  if (lastIdx < rawText.length) {
    container.append(parseInlineMarkdown(rawText.slice(lastIdx)));
  }
  return container;
}

function setReply(m) {
  replyingTo = m ? { id: m.id, who: m.who, depth: (m.depth || 0) + 1, text: String(m.text || (m.img ? "Photo" : "Voice message")).slice(0, 90) } : null;
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
    m.img = null;
    m.audio = null;
    m.reactions = {};
    persistRoom(r);
    renderChatLog(true);
  } catch (e) { toast("Couldn't delete: " + (e.message || "error")); }
}

async function pinMessage(r, m) {
  try {
    const pinPayload = { id: m.id, who: m.who, text: String(m.text || "").slice(0, 80) };
    await post(r, "pin", { targetId: m.id, pinPayload });
    r.store.pinned = pinPayload;
    persistRoom(r);
    updateTop();
    toast("Message pinned!");
  } catch (e) { toast("Couldn't pin: " + (e.message || "error")); }
}

function fileCard(f) {
  const pick = el("input", { type: "file", style: "display:none" });
  pick.onchange = () => { if (pick.files[0]) decryptFile(f, pick.files[0]); pick.value = ""; };
  return el("div", { className: "audioPill", style: "flex-direction:column;align-items:flex-start" },
    el("b", { textContent: "🔐 " + f.name + " (" + (f.size / 1048576).toFixed(1) + " MB)" }),
    el("a", { href: f.url, target: "_blank", rel: "noopener noreferrer", className: "chatLink", style: "color:inherit;font-weight:600", textContent: "1. Download the locked file from Gofile" }),
    el("button", { type: "button", className: "btn secondary small", textContent: "2. Unlock downloaded file", onclick: () => pick.click() }),
    pick);
}
async function decryptFile(f, blob) {
  try {
    if (blob.size > MAX_FILE + 1024) throw new Error("too big");
    const key = await aesKey(fromB64(f.key));
    const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: fromB64(f.iv) }, key, await blob.arrayBuffer());
    const url = URL.createObjectURL(new Blob([plain], { type: "application/octet-stream" }));
    const a = el("a", { href: url, download: f.name.replace(/[\\/:*?"<>|\u0000-\u001f\u202a-\u202e\u2066-\u2069]/g, "_") });
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    toast("File unlocked. Only open files from people you trust.", 4000);
  } catch {
    toast("That isn't the matching file, or it was changed.", 4000);
  }
}

function buildMessage(r, m) {
  const mine = m.mine;
  const who = m.who;
  const meta = el("div", { className: "meta" },
    el("b", { textContent: mine ? "You" : who }),
    el("span", { textContent: new Date(m.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
  );

  if (mine && !m.deleted) {
    const receipt = el("span", {
      className: "receipt",
      title: m.failed ? "Not sent" : m.read ? "Marked as read" : m.sent ? "Sent to relay" : "Sending",
      textContent: m.failed ? "! not sent" : m.read ? "✓✓" : m.sent ? "✓" : "…"
    });
    meta.append(receipt);
  }

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

  if (m.depth && m.depth >= 10 && !m.deleted) {
    const depthTag = el("div", {
      className: "ee-depth-pill",
      textContent: m.depth >= 20 ? "please start a new conversation" : "thread depth: the abyss"
    });
    bubble.append(depthTag);
  }

  bubble.append(meta);

  if (m.text) {
    if (m.text === "...") {
      const dotSpan = el("span", { className: "ee-dots" }, el("span", { textContent: "•" }), el("span", { textContent: "•" }), el("span", { textContent: "•" }));
      bubble.append(dotSpan);
    } else {
      bubble.append(formatMessageContent(m.text));
    }
  }

  // Visual local FX
  if (m.fx === "confetti" && EE.data.cfg.fx) {
    bubble.append(el("span", { className: "ee-confetti", textContent: "🎉🎊✨" }));
  } else if (m.fx === "stars" && EE.data.cfg.fx) {
    bubble.append(el("span", { className: "ee-stars" }));
  }

  if (m.img && !m.deleted) {
    const imgEl = el("img", {
      src: m.img,
      className: "chatImg",
      title: "Click to zoom",
      onclick: () => openLightbox(m.img)
    });
    bubble.append(imgEl);
  }
  if (m.audio && !m.deleted) {
    const audioWrap = el("div", { className: "audioPill" },
      el("audio", { src: m.audio, controls: true })
    );
    bubble.append(audioWrap);
  }
  if (m.file && !m.deleted) bubble.append(fileCard(m.file));
  if (!mine && !m.deleted) bubble.append(el("span", { className: "editedTag", textContent: "key " + shortId(m.authorId) }));
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
    const copyBtn = el("button", {
      type: "button",
      className: "actBtn",
      title: "Copy text",
      textContent: "📋",
      onclick: () => {
        if (m.text) navigator.clipboard.writeText(m.text).then(() => toast("Message copied!"));
      }
    });
    const pinBtn = el("button", { type: "button", className: "actBtn", title: "Pin", textContent: "📌", onclick: () => pinMessage(r, m) });
    actions.append(reactBtn, replyBtn, copyBtn, pinBtn);
    if (mine) {
      if (m.text) actions.append(el("button", { type: "button", className: "actBtn", title: "Edit message", textContent: "✎", onclick: () => promptEditMessage(r, m) }));
      actions.append(el("button", { type: "button", className: "actBtn", title: "Delete message", textContent: "🗑", onclick: () => deleteMessage(r, m) }));
    } else {
      actions.append(el("button", { type: "button", className: "actBtn", title: "Block " + who, textContent: "🚫", onclick: () => toggleBlockUser(m.authorId) }));
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
  const avatarEl = el("div", { className: "avatar", title: who });
  if (mine && me.avatarImg) {
    avatarEl.style.backgroundImage = `url(${me.avatarImg})`;
  } else if (!mine && m.avi) {
    avatarEl.style.backgroundImage = `url(${m.avi})`;
  } else {
    avatarEl.textContent = avText;
  }

  const row = el("div", { className: "message " + (mine ? "mine" : "theirs") },
    avatarEl,
    col
  );
  row.setAttribute("data-mid", m.id);
  return row;
}

function handleLogScroll(e) {
  const l = e.target;
  const atBottom = (l.scrollHeight - l.scrollTop - l.clientHeight) < 60;
  userScrolledUp = !atBottom;
}

function scrollToBottom(force = false) {
  const l = $("log");
  if (!l) return;
  if (force || !userScrolledUp) {
    requestAnimationFrame(() => {
      l.scrollTop = l.scrollHeight;
    });
  }
}

function addSystem(text) {
  const l = $("log");
  if (l) {
    l.append(el("div", { className: "system", textContent: text }));
    scrollToBottom(false);
  }
}

function renderChatLog(keepScroll) {
  const r = rooms.get(activeTopic);
  const l = $("log");
  if (!r || !l) return;
  const prevScroll = l.scrollTop;
  l.innerHTML = "";
  const q = searchQuery.trim().toLowerCase();
  const visible = r.store.msgs.filter((m) => {
    if (!m.mine && isBlocked(m.authorId)) return false;
    if (q && !String(m.text || "").toLowerCase().includes(q) && !String(m.who || "").toLowerCase().includes(q)) return false;
    return true;
  });
  // The log is redrawn often (for example when a receipt arrives), so remember when each
  // message first appeared and let a redraw carry its animation on from the same point.
  const firstDraw = !r.shown;
  if (firstDraw) r.shown = new Map();
  const now = Date.now();
  visible.forEach((m, i) => {
    const row = buildMessage(r, m);
    const fromEnd = visible.length - 1 - i;
    if (!r.shown.has(m.id)) r.shown.set(m.id, firstDraw ? (fromEnd < 10 ? now + (9 - fromEnd) * 35 : 0) : now);
    const age = now - r.shown.get(m.id);
    if (age < 340) {
      row.classList.add("k-in");
      row.style.animationDelay = -age + "ms";
    }
    l.append(row);
  });
  if (!q) {
    const isDm = r.meta.type === "dm";
    l.append(el("div", {
      className: "system",
      textContent: isDm
        ? "Direct message with @" + r.meta.title + ". Messages are encrypted with your shared passphrase."
        : "Group “" + r.meta.title + "”. Messages are encrypted with the group passphrase."
    }));
  } else if (!visible.length) {
    l.append(el("div", { className: "system", textContent: "No messages match “" + searchQuery + "”." }));
  }
  if (keepScroll && userScrolledUp) {
    l.scrollTop = prevScroll;
  } else {
    scrollToBottom(true);
  }
}

function renderWelcome() {
  replay($("view"), "k-view");
  activeTopic = null;
  replyingTo = null;
  searchQuery = "";
  $("topName").textContent = "Welcome";
  $("topStatus").textContent = "";
  $("topStatus").className = "status";
  $("searchBox").hidden = true;
  $("searchBox").value = "";
  $("btnCall").hidden = true;
  $("btnClear").hidden = true;
  $("btnDelete").hidden = true;
  $("pinnedHeader").hidden = true;
  $("callHost").innerHTML = "";

  const emblem = el("button", { type: "button", className: "emblemRing", title: "Start a chat", onclick: startAdd },
    el("div", { className: "emblemCore", textContent: "k." }));
  const start = el("button", { className: "pillBtn", textContent: "+ Start a chat", onclick: startAdd });
  const help = el("button", { className: "pillBtn ghost", textContent: "How it works", onclick: showHelp });

  const allChats = Array.from(rooms.values());
  const unlockedChats = allChats.filter((r) => r.key).length;

  const dot = el("span", {
    id: "relayDot",
    className: "pulseDot " + relayStatusState,
    title: relayStatusState === "connected" ? "Relay Connected" : (relayStatusState === "paused" ? "Relay Connecting" : "Relay Unreachable")
  });
  const relayVal = el("div", {
    id: "relayStatVal",
    className: "statValue",
    textContent: relayStatusState === "connected" ? "ACTIVE" : (relayStatusState === "paused" ? "CONNECTING" : "OFFLINE")
  });

  const relaySub = el("div", {
    id: "relayStatSub",
    className: "statSub" + (relayStatusState !== "connected" ? " subtle-strategy" : ""),
    textContent: relayStatusState === "connected" ? "Connected to relay" : activeRelayPun
  });

  // Interactive Info Cards (NO EMOJIS, CLEAN WRAP)
  const stats = el("div", { className: "statsGrid" },
    el("div", { className: "statCard", title: "Click for Vault encryption details", onclick: showVaultInfoModal },
      el("div", { className: "statTop" },
        el("div", { className: "statLabel", textContent: "Account Vault" })
      ),
      el("div", { className: "statValue", textContent: vaultKey ? "SYNCED" : "LOCKED" }),
      el("div", { className: "statSub", textContent: "AES-256 · Auto Cloud Backup" })
    ),
    el("div", { className: "statCard", title: "Click for live Relay & WebRTC transit diagnostics", onclick: showRelayInfoModal },
      el("div", { className: "statTop" },
        el("div", { className: "statLabel", textContent: "Cloud Relay" }),
        dot
      ),
      relayVal,
      relaySub
    ),
    el("div", { className: "statCard", title: "Click for active channels breakdown", onclick: showChannelsInfoModal },
      el("div", { className: "statTop" },
        el("div", { className: "statLabel", textContent: "Active Channels" })
      ),
      el("div", { className: "statValue", textContent: unlockedChats + " / " + allChats.length }),
      el("div", { className: "statSub", textContent: "Auto-unlocked via Vault" })
    )
  );

  $("view").innerHTML = "";
  $("view").append(el("div", { className: "empty" },
    emblem,
    el("div", { className: "stageTitle", textContent: "Kairo" }),
    el("p", { className: "stageSub", textContent: "Encrypted messaging, Markdown code blocks, WebRTC voice calls, and automatic cloud vault synchronization." }),
    el("div", { className: "pillRow" }, start, help),
    stats
  ));
  renderSidebar();
}

async function toggleVoiceRecording(recBtn) {
  if (isRecording) {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
    isRecording = false;
    recBtn.classList.remove("rec");
    recBtn.textContent = "🎙️";
    return;
  }
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    toast("Microphone access is not supported in this browser tab.");
    return;
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioChunks = [];
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunks.push(e.data); };
    mediaRecorder.onstop = () => {
      stream.getTracks().forEach((track) => track.stop());
      const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Audio = reader.result;
        await dispatchMediaMessage(null, base64Audio);
      };
      reader.readAsDataURL(audioBlob);
    };
    mediaRecorder.start();
    isRecording = true;
    recBtn.classList.add("rec");
    recBtn.textContent = "⏹️";
    toast("Recording voice note... Click again to send.");
  } catch (err) {
    toast("Microphone access denied: " + (err.message || "error"));
  }
}

function openChat(id) {
  const r = rooms.get(id);
  if (!r) return;
  if (activeTopic !== id) { r.shown = null; replay($("view"), "k-view"); }
  if (!r.key) return askUnlock(r);
  activeTopic = id;
  replyingTo = null;
  searchQuery = "";
  $("searchBox").value = "";
  $("searchBox").hidden = false;
  r.unread = 0;

  const unreadMsgIds = r.store.msgs.filter((m) => !m.mine && !m.seenByMe).map((m) => { m.seenByMe = true; return m.id; });
  if (unreadMsgIds.length) {
    persistRoom(r);
    post(r, "read", { ids: unreadMsgIds }).catch(() => {});
  }

  const isDm = r.meta.type === "dm";
  const draftVal = getDraft(id);
  const charCounter = el("div", { id: "charCount", className: "composerFooter", textContent: draftVal.length + "/" + MAX_TEXT });

  const input = el("input", {
    id: "msg",
    maxLength: MAX_TEXT,
    autocomplete: "off",
    value: draftVal,
    placeholder: "Message " + (isDm ? "@" + r.meta.title : "#" + r.meta.title) + " (Try /flip, /oracle)",
    oninput: (e) => {
      const len = e.target.value.length;
      charCounter.textContent = len + "/" + MAX_TEXT;
      setDraft(id, e.target.value);
      renderSidebar();
      const now = Date.now();
      if (now - lastTypingSent > 3500 && len > 0) {
        lastTypingSent = now;
        post(r, "typing").catch(() => {});
      }
    },
    onkeydown: (e) => {
      if (e.key === "Enter" && !e.shiftKey && settings.sendOnEnter !== false) {
        e.preventDefault();
        sendMessage(e);
      }
    }
  });

  const replyBar = el("div", { id: "replyBar", className: "replyBar", hidden: true });
  const photoBtn = el("button", {
    type: "button",
    className: "mediaBtn",
    title: "Send photo / image",
    textContent: "📷",
    onclick: () => $("filePicker").click()
  });
  const voiceBtn = el("button", {
    type: "button",
    className: "mediaBtn",
    title: "Record voice note",
    textContent: "🎙️",
    onclick: () => toggleVoiceRecording(voiceBtn)
  });
  const sendBtn = el("button", { type: "submit", className: "sendBtn", textContent: "➤" });
  const typingBar = el("div", { id: "typingInd", className: "typingIndicator" });
  const form = el("form", { id: "form", className: "composer" }, photoBtn, voiceBtn, input, sendBtn);
  form.onsubmit = sendMessage;

  const composerWrap = el("div", { className: "composerArea" }, form, charCounter);

  const logEl = el("div", { id: "log", className: "log" });
  logEl.onscroll = handleLogScroll;
  userScrolledUp = false;

  $("view").innerHTML = "";
  $("view").append(logEl, replyBar, typingBar, composerWrap);
  renderChatLog(false);
  updateTypingDisplay();
  renderCallPanel();
  $("btnClear").hidden = false;
  $("btnDelete").hidden = false;
  updateTop();
  renderSidebar();
  input.focus();
}

const MAX_AGE = 7 * 24 * 3600 * 1000;
function safeData(v, re, max) { return typeof v === "string" && v.length <= max && re.test(v) ? v : null; }
const IMG_RE = /^data:image\/(png|jpeg|gif|webp);base64,[A-Za-z0-9+/=]+$/;
const AUDIO_RE = /^data:audio\/(webm|ogg|mp4|mpeg|wav)(;codecs=[A-Za-z0-9.,]+)?;base64,[A-Za-z0-9+/=]+$/;
function safeId(v) { return typeof v === "string" && /^[a-f0-9]{16}$/.test(v) ? v : null; }
function safeText(v, n) { return typeof v === "string" ? v.slice(0, n) : ""; }
function safeFile(f) {
  if (!f || typeof f !== "object") return null;
  if (typeof f.url !== "string" || !/^https:\/\/gofile\.io\/d\/[A-Za-z0-9_-]+$/.test(f.url)) return null;
  if (!safeData(f.key, /^[A-Za-z0-9+/=]+$/, 64) || !safeData(f.iv, /^[A-Za-z0-9+/=]+$/, 24)) return null;
  return { url: f.url, key: f.key, iv: f.iv, name: safeText(f.name, 120) || "file", size: Number(f.size) || 0 };
}
function safeReply(q) {
  return q && safeId(q.id) ? { id: q.id, who: safeText(q.who, 20), text: safeText(q.text, 90), depth: Number(q.depth) || 0 } : null;
}
function isReplay(r, m) {
  const age = Date.now() - m.t;
  if (typeof m.t !== "number" || !safeId(m.n) || age > MAX_AGE || age < -5 * 60 * 1000 || m.t < r.store.floor) return true;
  if (String(m.k).startsWith("rtc_") && age > 60000) return true;
  if (r.store.nonces.some((x) => x[0] === m.n)) return true;
  r.store.nonces.push([m.n, m.t]);
  if (r.store.nonces.length > 3000) {
    r.store.nonces.sort((a, b) => a[1] - b[1]);
    r.store.floor = r.store.nonces.splice(0, 500)[499][1];
  }
  return false;
}

async function onEvent(ev) {
  const r = rooms.get(ev.topic);
  if (!r || !r.key) return;
  let m;
  try { m = await verifyEnvelope(await unseal(r.key, ev.message || "")); } catch { return; }
  if (!m || m.r !== r.meta.topic || m.i === me.id || !vaultKey || rooms.get(ev.topic) !== r) return;
  if (isReplay(r, m)) return;
  if (ev.time && ev.time > r.store.lastSrv) r.store.lastSrv = ev.time;
  if (m.k !== "typing" && m.k !== "p") persistRoom(r);
  if (isBlocked(m.i)) return;
  // Flag a name that shows up with a different signing key than the first one seen.
  const handle = "@" + (sanitizeKey(m.uk) || "unknown");
  if (!r.store.keys[handle]) { r.store.keys[handle] = m.i; persistRoom(r); }
  const changed = r.store.keys[handle] !== m.i || handle === "@" + me.userKey;
  const who = (changed ? "⚠ " : "") + safeText(String(m.name || "Someone"), 18);
  const isActive = r.meta.topic === activeTopic;
  m.avi = safeData(m.avi, IMG_RE, 100000);
  m.st = ["online", "idle", "dnd", "invisible"].includes(m.st) ? m.st : "online";

  r.people.set(m.i, {
    name: who,
    av: String(m.av || "").slice(0, 4),
    avi: m.avi || null,
    bio: String(m.bio || "").slice(0, 50),
    st: String(m.st || "online"),
    last: Date.now()
  });

  if (String(m.k).startsWith("rtc_")) {
    if (r.meta.type !== "dm" || !safeId(m.call)) return;
    if (m.k === "rtc_offer" && m.sdp) {
      if (callState === "idle" && !changed) { callId = m.call; callPeer = m.i; earlyCandidates = []; promptIncomingCall(r, who, m.sdp); }
      return;
    }
    if (m.call !== callId || r.meta.topic !== activeCallTopic) return;
    if (m.k === "rtc_answer" && m.sdp && peerConn && isCaller && !callPeer && !changed) {
      callPeer = m.i;
      await peerConn.setRemoteDescription(new RTCSessionDescription(m.sdp));
      for (const c of earlyCandidates.filter((x) => x.from === callPeer)) { try { await peerConn.addIceCandidate(c.candidate); } catch {} }
      earlyCandidates = [];
    } else if (m.k === "rtc_candidate" && m.candidate) {
      if (peerConn && peerConn.remoteDescription && m.i === callPeer) { try { await peerConn.addIceCandidate(m.candidate); } catch {} }
      else if (earlyCandidates.length < 50) earlyCandidates.push({ from: m.i, candidate: m.candidate });
    } else if (m.k === "rtc_hangup" && (m.i === callPeer || !callPeer)) {
      toast("Call ended by " + who);
      endCall("Call ended", true);
    }
    return;
  }

  if (m.k === "typing") {
    handleTypingEvent(r, who);
    return;
  }

  if (m.k === "read" && Array.isArray(m.ids)) {
    let changed = false;
    m.ids.forEach((targetId) => {
      const target = r.store.msgs.find((x) => x.id === targetId);
      if (target && target.mine && !target.read) {
        target.read = true;
        changed = true;
      }
    });
    if (changed) {
      persistRoom(r);
      if (isActive) renderChatLog(true);
    }
    return;
  }

  if (m.k === "m") {
    if (!safeId(m.id) || r.seen.has(m.id)) return;
    r.seen.add(m.id);
    const rec = {
      id: m.id,
      who,
      authorId: m.i,
      av: String(m.av || "").slice(0, 4),
      avi: m.avi,
      text: m.text ? String(m.text).slice(0, MAX_TEXT) : "",
      img: safeData(m.img, IMG_RE, 900000),
      audio: safeData(m.audio, AUDIO_RE, 3000000),
      file: safeFile(m.file),
      mine: false,
      read: false,
      seenByMe: isActive,
      time: m.t || Date.now(),
      replyTo: safeReply(m.replyTo),
      depth: Number(m.depth) || 0,
      fx: ["confetti", "stars"].includes(m.fx) ? m.fx : null,
      reactions: {}
    };
    r.store.msgs.push(rec);
    if (r.store.msgs.length > 300) r.store.msgs = r.store.msgs.slice(-300);
    persistRoom(r);
    playNotifSound();

    if (isActive) {
      post(r, "read", { ids: [m.id] }).catch(() => {});
      renderChatLog(true);
    } else {
      r.unread++;
      renderSidebar();
    }
    return;
  }
  if (m.k === "react" && m.targetId && m.emoji) {
    if (EMOJIS.includes(m.emoji)) applyReaction(r, m.targetId, m.emoji, who);
    return;
  }
  if (m.k === "pin") {
    const t = m.targetId ? r.store.msgs.find((x) => x.id === m.targetId && !x.deleted) : null;
    if (m.targetId && !t) return;
    r.store.pinned = t ? { id: t.id, who: t.who, text: String(t.text || "").slice(0, 80) } : null;
    persistRoom(r);
    if (isActive) updateTop();
    return;
  }
  if (m.k === "edit" && m.targetId) {
    const target = r.store.msgs.find((x) => x.id === m.targetId);
    if (target && target.authorId === m.i && !target.deleted) {
      target.text = String(m.text || "").slice(0, MAX_TEXT);
      target.edited = true;
      persistRoom(r);
      if (isActive) renderChatLog(true);
    }
    return;
  }
  if (m.k === "del" && m.targetId) {
    const target = r.store.msgs.find((x) => x.id === m.targetId);
    if (target && target.authorId === m.i) {
      target.text = "This message was deleted.";
      target.deleted = true;
      target.img = null;
      target.audio = null;
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

async function resubscribe() {
  const open = Array.from(rooms.values()).filter((r) => r.key);
  const k = open.map((r) => r.meta.topic).join(",");
  if (!open.length) {
    if (es) { es.close(); es = null; }
    esKey = "";
    setRelayState("paused");
    setStatus(vaultKey ? "no open chats" : "vault locked");
    return;
  }
  
  if (k === esKey && es && es.readyState === EventSource.OPEN) {
    return;
  }
  
  if (es) { es.close(); es = null; }
  esKey = k;
  open.forEach((r) => { r.ready = false; });
  
  const mins = open.map((r) => r.store.lastSrv);
  const since = (open.length && mins.every((x) => x > 0)) ? Math.min.apply(null, mins) : "6h";
  
  everOpened = false;
  setRelayState("paused");
  setStatus(activeRelayPun, "warn");

  // Preflight warm-up ping for Render cold start
  try {
    fetch(SERVER + "/healthz", { mode: "no-cors" }).catch(() => {});
  } catch {}
  
  try {
    es = new EventSource(SERVER + "/" + k + "/sse?since=" + since);
  } catch (err) {
    setRelayState("error");
    setStatus("offline · relay error", "bad");
    return;
  }

  es.onopen = () => {
    everOpened = true;
    setRelayState("connected");
    setStatus("connected", "ok");
    setDiag("");
    clearTimeout(readyTimer);
    readyTimer = setTimeout(() => {
      rooms.forEach((r) => {
        if (!r.key) return;
        r.ready = true;
        if (!r.helloSent) { r.helloSent = true; post(r, "h").catch(() => {}); }
      });
    }, 1500);
  };

  es.onerror = () => {
    setRelayState("error");
    setStatus("reconnecting…", "bad");
    if (!everOpened) {
      setDiag("Cannot reach relay (" + SERVER.replace("https://", "") + "). Service may be sleeping.");
    }
  };

  es.onmessage = (e) => {
    let ev;
    try { ev = JSON.parse(e.data); } catch { return; }
    if (ev.event === "message") queue = queue.then(() => onEvent(ev)).catch(() => {});
  };
}

function closeModal() { $("modalHost").innerHTML = ""; }
function showModal(box) {
  const layer = el("div", { className: "modalLayer" }, box);
  $("modalHost").innerHTML = "";
  $("modalHost").append(layer);
}
function modal(title, hint, fields, okText, onOk) {
  const box = el("form", { className: "modal" });
  box.append(el("h2", { textContent: title, style: "margin-bottom:6px" }));
  if (hint) box.append(el("p", { textContent: hint }));
  const inputs = {};
  fields.forEach((f) => {
    const inp = el("input", { type: f.type || "text", placeholder: f.placeholder || "", maxLength: f.max || 60, autocomplete: "off", value: f.value || "" });
    inputs[f.id] = inp;
    box.append(el("h3", { textContent: f.label }), inp);
    if (f.generate) box.append(el("button", { type: "button", className: "linkBtn", textContent: "Make a strong passphrase", onclick: () => { inp.type = "text"; inp.value = randomPass(); } }));
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
    throw new Error("This tab blocks Web Crypto. Open https://example.com in a new tab and paste the script there.");
  }
}

function showHelp() {
  const steps = [
    "Your User Key (@handle) and Master Password automatically sync your channels to the cloud.",
    "Click the live cards on Overview (Account Vault, Cloud Relay, Active Channels) to inspect technical details and diagnostics.",
    "If the relay is connecting, look closely at the Cloud Relay card for subtle connection strategy updates.",
    "Use 'Sync Cloud Vault' in navigation to force an instant backup.",
    "Click Call in any DM to start an animated WebRTC voice call."
  ];
  const shortcuts = [
    ["Alt + N", "Start a new Direct Message"],
    ["Alt + G", "Create or join a Group"],
    ["Ctrl + K", "Focus chat search box"],
    ["Esc", "Close dialog / cancel reply / clear search / exit CRT mode"],
    ["Konami Code", "↑ ↑ ↓ ↓ ← → ← → B A for Kairo Classic CRT mode"]
  ];
  const scList = el("div", { style: "display:grid;gap:6px;margin-top:8px" },
    ...shortcuts.map(([k, desc]) => el("div", { style: "display:flex;justify-content:space-between;font-size:.78rem;color:var(--muted)" },
      el("span", { className: "kbd", textContent: k }),
      el("span", { textContent: desc })
    ))
  );
  const box = el("div", { className: "modal" },
    el("h2", { textContent: "Kairo v2.1.0 Guide", style: "margin-bottom:8px" }),
    el("ol", {}, ...steps.map((s) => el("li", { textContent: s }))),
    el("h3", { textContent: "Keyboard Shortcuts" }),
    scList,
    el("div", { className: "row" },
      el("button", { className: "btn", textContent: "Got it", onclick: closeModal })
    ));
  showModal(box);
}

function profile() {
  if (!vaultKey) return promptVaultLogin();
  const box = el("form", { className: "modal" });
  box.append(
    el("h2", { textContent: "Your Profile & Presence", style: "margin-bottom:6px" }),
    el("p", { textContent: "User Key: @" + me.userKey + ". Your safety code: " + shortId(me.id) + ". Friends can compare it with the key shown under your messages, using another way of contacting you." })
  );

  const previewAvatar = el("div", { className: "avatar", style: "width:64px;height:64px;margin:12px auto;font-size:20px" });
  if (me.avatarImg) previewAvatar.style.backgroundImage = `url(${me.avatarImg})`;
  else previewAvatar.textContent = me.avatar || initials(me.name);

  const uploadBtn = el("button", {
    type: "button",
    className: "btn secondary small",
    style: "display:block;margin:0 auto 14px",
    textContent: "Upload Custom Image",
    onclick: () => $("avatarPicker").click()
  });

  const nameInp = el("input", { type: "text", value: me.name, maxLength: 20 });
  const avInp = el("input", { type: "text", value: me.avatar || "", placeholder: "Initials fallback (e.g. AR)", maxLength: 4 });
  const bioInp = el("input", { type: "text", value: me.bio || "", placeholder: "What are you up to?", maxLength: 50 });
  const stSel = el("select", {},
    el("option", { value: "online", textContent: "Online" }),
    el("option", { value: "idle", textContent: "Idle / Away" }),
    el("option", { value: "dnd", textContent: "Do Not Disturb" }),
    el("option", { value: "invisible", textContent: "Invisible (Pauses pings)" })
  );
  stSel.value = me.status || "online";

  const err = el("p", { className: "err" });
  const saveBtn = el("button", { type: "submit", className: "btn", textContent: "Save Profile" });
  const cancelBtn = el("button", { type: "button", className: "btn secondary", textContent: "Cancel", onclick: closeModal });

  box.append(
    previewAvatar,
    uploadBtn,
    el("h3", { textContent: "Display Name" }), nameInp,
    el("h3", { textContent: "Avatar Text Fallback" }), avInp,
    el("h3", { textContent: "Bio / Status Note" }), bioInp,
    el("h3", { textContent: "Online Presence" }), stSel,
    err,
    el("div", { className: "row" }, saveBtn, cancelBtn)
  );

  $("avatarPicker").onchange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      toast("Optimizing avatar image...");
      const compressed = await compressImage(file, 256, 0.7);
      me.avatarImg = compressed;
      previewAvatar.textContent = "";
      previewAvatar.style.backgroundImage = `url(${compressed})`;
      toast("Custom avatar applied. Click Save.");
    } catch {
      toast("Failed to process image.");
    } finally {
      e.target.value = "";
    }
  };

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
    toast("Profile updated and synced!");
  };
  showModal(box);
}

async function createChat(type, label, pw, icon) {
  checkSecure();
  label = sanitizeKey(label);
  if (!label) throw new Error(type === "dm" ? "Enter their User Key." : "Enter a group ID.");
  if (passProblem(pw)) throw new Error(passProblem(pw));
  let room, title;
  if (type === "dm") {
    title = label.slice(0, 20);
    room = "dm|" + [sanitizeKey(me.userKey || me.name), label].sort().join("|");
  } else {
    title = label.slice(0, 40);
    room = "group|" + label;
  }
  const derived = await deriveRoom(room, pw);
  if (!vaultKey) throw new Error("Vault is locked");
  const topic = derived.topic;
  let r = rooms.get(topic);
  if (!r && rooms.size >= MAX_CHATS) throw new Error("Maximum " + MAX_CHATS + " chats reached. Delete one first.");
  const key = derived.key;
  if (!r) {
    r = makeRoom({ topic, type, title, room, pw, icon: (icon || "").trim().slice(0, 4) });
    rooms.set(topic, r);
  } else {
    r.meta.pw = pw;
    if (icon) r.meta.icon = icon.trim().slice(0, 4);
  }
  r.key = key;

  if (type === "group") {
    EE.unlock("first_group", "the council has assembled");
    EE.unlockFrag("frag_03", "some messages arrive before the typing indicator.");
  }

  await saveVault();
  resubscribe();
  openChat(topic);
}

function askUnlock(r) {
  modal("Unlock “" + r.meta.title + "”", "Enter this chat's password to unlock it and save it to your Vault.",
    [{ id: "p", label: "Password", type: "password" }], "Unlock",
    async (v) => {
      checkSecure();
      const d = await deriveRoom(r.meta.room, v.p);
      if (d.topic !== r.meta.topic) throw new Error("That password doesn't match this chat.");
      r.key = d.key;
      r.meta.pw = v.p;
      await saveVault();
      resubscribe();
      openChat(r.meta.topic);
    });
}

function startAdd() {
  if (!vaultKey) return promptVaultLogin();
  modal("New Direct Message",
    "Enter their lowercase User Key (e.g. bob) and your shared secret.",
    [{ id: "f", label: "Their User Key (@handle)", max: 20 }, { id: "p", label: "Shared passphrase (16+ characters)", type: "password", max: 80, generate: true }], "Start DM",
    (v) => createChat("dm", v.f, v.p));
}
function startGroup() {
  if (!vaultKey) return promptVaultLogin();
  modal("New or Existing Group",
    "Pick a group ID, optional group tag, and shared password.",
    [
      { id: "f", label: "Group ID", max: 40 },
      { id: "i", label: "Group Avatar Tag (optional)", max: 4 },
      { id: "p", label: "Group passphrase (16+ characters)", type: "password", max: 80, generate: true }
    ], "Create / Join",
    (v) => createChat("group", v.f, v.p, v.i));
}

function markSent(r, rec, ok) {
  rec.sent = ok; rec.failed = !ok;
  persistRoom(r);
  if (r.meta.topic === activeTopic) renderChatLog(true);
}

async function dispatchMediaMessage(imgBase64, audioBase64) {
  const r = rooms.get(activeTopic);
  if (!r || !r.key) return;
  const id = rnd();
  const replyPayload = replyingTo ? Object.assign({}, replyingTo) : null;
  
  const rec = { id, who: me.name, authorId: me.id, av: me.avatar || "", avi: me.avatarImg || null, text: "", img: imgBase64, audio: audioBase64, mine: true, read: false, time: Date.now(), replyTo: replyPayload, reactions: {} };
  r.seen.add(id);
  r.store.msgs.push(rec);
  if (r.store.msgs.length > 300) r.store.msgs = r.store.msgs.slice(-300);
  persistRoom(r);
  setReply(null);
  userScrolledUp = false;
  renderChatLog(false);
  scrollToBottom(true);
  renderSidebar();

  if (imgBase64) EE.unlock("first_img", "visual evidence");

  try {
    await post(r, "m", { id, text: "", img: imgBase64, audio: audioBase64, replyTo: replyPayload });
    markSent(r, rec, true);
  } catch (err) {
    markSent(r, rec, false);
    addSystem("Couldn't send media to relay: " + (err && err.message ? err.message : "network error"));
  }
}

function showPrototypeMode() {
  const layer = el("div", { className: "protoLayer" },
    el("div", { className: "protoCard" },
      el("h2", { textContent: "Kairo P2P Prototype (v0.1a)" }),
      el("p", { style: "font-size:.78rem;color:#475569" }, "Recreation of early visual prototype. Modern encryption and network routing active underneath."),
      el("div", { style: "display:flex;flex-direction:column;gap:6px" },
        el("label", { style: "font-size:.7rem;font-weight:700" }, "Identity Name"),
        el("input", { value: me.name + " (@" + (me.userKey || me.name) + ")", readonly: true, style: "padding:8px;border:1px solid #000;background:#f8fafc" })
      ),
      el("div", { style: "display:flex;gap:8px" },
        el("button", { className: "protoBtn", style: "flex:1", textContent: "Start DM", onclick: () => { layer.remove(); startAdd(); } }),
        el("button", { className: "protoBtn ghost", style: "flex:1", textContent: "Join Group", onclick: () => { layer.remove(); startGroup(); } })
      ),
      el("button", { className: "protoBtn", textContent: "Return to Modern Kairo", onclick: () => layer.remove() })
    )
  );
  root.append(layer);
}

async function sendMessage(e) {
  if (e) e.preventDefault();
  const r = rooms.get(activeTopic);
  const input = $("msg");
  if (!input) return;
  let text = input.value.trim().slice(0, MAX_TEXT);
  if (!r || !r.key || !text) return;

  const arcadeCommand = { "/arcade": "", "/tetris": "tetris", "/snake": "snake", "/cross": "cross", "/pong": "pong", "/bricks": "bricks" }[text.toLowerCase()];
  if (arcadeCommand !== undefined) {
    input.value = "";
    setDraft(activeTopic, "");
    arcade.open(arcadeCommand);
    return;
  }

  // Slash commands
  if (text.startsWith("/")) {
    const cmd = text.toLowerCase().trim();
    if (cmd === "/flip") {
      text = "(╯°□°)╯︵ ┻━┻";
    } else if (cmd === "/unflip") {
      text = "┬─┬ ノ( ゜-゜ノ)";
    } else if (cmd === "/shrug") {
      text = "¯\\_(ツ)_/¯";
    } else if (cmd === "/oracle") {
      input.value = "";
      const reply = EE.oracleList[Math.floor(Math.random() * EE.oracleList.length)];
      addSystem(reply);
      return;
    } else if (cmd === "/prototype") {
      input.value = "";
      showPrototypeMode();
      return;
    } else if (cmd === "/kairo 3000") {
      input.value = "";
      root.classList.add("kairo-3000");
      toast("Quantum Relay Stable · Kairo 3000 Synchronised", 3000);
      setTimeout(() => root.classList.remove("kairo-3000"), 30000);
      return;
    }
  }

  // Exact phrase local triggers
  let msgFx = null;
  const lower = text.toLowerCase();
  if (lower === "gg") msgFx = "confetti";
  if (lower === "goodnight") msgFx = "stars";
  if (lower === "kairo") {
    const l = $("kairoLogo");
    if (l) {
      l.style.transform = "scale(1.25) rotate(10deg)";
      setTimeout(() => { l.style.transform = ""; }, 400);
    }
  }
  if (lower === "there is no easter egg") {
    toast("correct.", 2400);
  }
  if (lower === "ping") {
    text = "ping [latency unavailable]";
  }

  // "bruh" streak
  if (lower === "bruh") {
    EE.bruhStreak++;
    if (EE.bruhStreak === 10) addSystem("bro has exhausted the vocabulary");
  } else {
    EE.bruhStreak = 0;
  }

  // Duplicate messages check (5 in 30s)
  const now = Date.now();
  EE.dupBuffer.push({ text: lower, t: now });
  EE.dupBuffer = EE.dupBuffer.filter((x) => now - x.t <= 30000);
  if (EE.dupBuffer.filter((x) => x.text === lower).length === 5) {
    addSystem("the echo chamber has been located");
  }

  // Achievements evaluation
  EE.data.sentCount++;
  EE.unlock("first_msg", "signal acquired");
  if (EE.data.sentCount >= 100) EE.unlock("yapper_100", "professional yapper");
  if (EE.data.sentCount >= 1000) EE.unlock("bandwidth_1000", "bandwidth enthusiast");
  if (text.length === 1200) EE.unlock("outlook_1200", "outlook email");

  const curHour = new Date().getHours();
  if (curHour === 3) EE.unlock("sleep_3am", "sleep schedule disconnected");

  const id = rnd();
  const replyPayload = replyingTo ? Object.assign({}, replyingTo) : null;
  const currentDepth = replyPayload && replyPayload.depth ? replyPayload.depth : 0;

  r.seen.add(id);
  const rec = {
    id,
    who: me.name,
    authorId: me.id,
    av: me.avatar || "",
    avi: me.avatarImg || null,
    text,
    mine: true,
    read: false,
    time: Date.now(),
    replyTo: replyPayload,
    depth: currentDepth,
    fx: msgFx,
    reactions: {}
  };
  r.store.msgs.push(rec);
  if (r.store.msgs.length > 300) r.store.msgs = r.store.msgs.slice(-300);
  persistRoom(r);
  input.value = "";
  setDraft(activeTopic, "");
  const cc = $("charCount");
  if (cc) cc.textContent = "0/" + MAX_TEXT;
  setReply(null);
  userScrolledUp = false;
  renderChatLog(false);
  scrollToBottom(true);
  renderSidebar();

  try {
    await post(r, "m", { id, text, replyTo: replyPayload, depth: currentDepth, fx: msgFx });
    markSent(r, rec, true);
  } catch (err) {
    markSent(r, rec, false);
    addSystem("Failed to deliver message: " + (err && err.message ? err.message : "error"));
  }
}

$("btnCall").onclick = startCall;

$("filePicker").onchange = async (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  try {
    toast("Compressing photo...");
    const compressed = await compressImage(file, 800, 0.6);
    await dispatchMediaMessage(compressed, null);
  } catch (ex) {
    toast("Failed to load photo: " + (ex.message || "error"));
  } finally {
    e.target.value = "";
  }
};

$("searchBox").oninput = (e) => {
  searchQuery = e.target.value;
  if (searchQuery.trim().toLowerCase() === "channel zero") {
    EE.data.channelZero = true;
    EE.unlockFrag("frag_02", "nobody remembers creating channel zero.");
    EE.save();
    toast("Channel Zero Discovered", 3000);
  }
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
  r.gone = true;
  rooms.delete(r.meta.topic);
  lsDel(LS + "t:" + r.meta.topic);
  lsDel(LS + "d:" + r.meta.topic);
  await saveVault();
  resubscribe();
  renderWelcome();
};

$("themeBtn").onclick = showThemeSettings;
$("eeSettingsBtn").onclick = showEasterEggSettings;
$("cloudSyncBtn").onclick = () => {
  if (!vaultKey) return toast("Unlock your vault first.");
  syncVaultToCloud().then((ok) => toast(ok ? "Backup sent to the relay." : "Backup failed."));
};
$("exportVaultBtn").onclick = exportVaultString;
$("overviewBtn").onclick = renderWelcome;
$("addBtn").onclick = startAdd;
$("groupBtn").onclick = startGroup;
$("blockedBtn").onclick = showBlockedModal;
$("lockVaultBtn").onclick = lockVaultSession;
$("helpBtn").onclick = showHelp;
$("profileBtn").onclick = profile;
$("selfCard").onclick = profile;

// Secret Logo 7-click
$("kairoLogo").onclick = () => {
  if (EE.logoCooldown) return;
  const now = Date.now();
  EE.logoClicks.push(now);
  EE.logoClicks = EE.logoClicks.filter((t) => now - t <= 5000);
  if (EE.logoClicks.length >= 7) {
    EE.logoCooldown = true;
    EE.logoClicks = [];
    const l = $("kairoLogo");
    l.classList.add("glitchSpin");
    setTimeout(() => l.classList.remove("glitchSpin"), 700);

    const sub = $("brandSub");
    const prevText = sub.textContent;
    const prevClass = sub.className;
    sub.textContent = "connected · definitely not haunted";
    sub.className = "brandSub haunted";

    setTimeout(() => {
      sub.textContent = prevText;
      sub.className = prevClass;
      EE.logoCooldown = false;
    }, 5000);
  }
};

// Beta Pill click & Shift+Click
$("betaPill").onclick = (e) => {
  if (e.shiftKey) {
    EE.unlockFrag("frag_01", "the first channel opened before kairo had a name.");
    const box = el("div", { className: "modal" },
      el("h2", { textContent: "Classified Patch Notes" }),
      el("ol", { style: "margin:12px 0 16px 18px" },
        el("li", { textContent: "taught packets basic manners" }),
        el("li", { textContent: "removed three ghosts from localStorage" }),
        el("li", { textContent: "firewall remains unconvinced" }),
        el("li", { textContent: "kairo is now 4% more circular" })
      ),
      el("button", { className: "btn", textContent: "Dismiss", onclick: closeModal })
    );
    showModal(box);
  } else {
    const box = el("div", { className: "modal" },
      el("h2", { textContent: "Kairo Release Notes (v2.1.0)" }),
      el("p", { textContent: "Chat with encrypted messages, files and WebRTC calls." }),
      el("ol", { style: "margin:10px 0 16px 18px" },
        el("li", { textContent: "Custom Studio 4-color palette including dedicated text color picker." }),
        el("li", { textContent: "Custom picture avatar uploads stored in encrypted vault." }),
        el("li", { textContent: "Subtle strategy ticker on relay connecting cards (Unbounded font)." }),
        el("li", { textContent: "Signature Unbounded 'k.' purple tab favicon (theme-adaptive)." })
      ),
      el("button", { className: "btn", textContent: "Close", onclick: closeModal })
    );
    showModal(box);
  }
};

function onKeyDown(e) {
  if (!document.getElementById("rc-root")) return;

  // Resilient Konami Code Detection
  const activeEl = document.activeElement;
  const isInput = activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA");
  if (!isInput) {
    const pressedKey = (e.key || "").toLowerCase();
    
    clearTimeout(EE.konamiTimeout);
    EE.konamiTimeout = setTimeout(() => { EE.konamiIdx = 0; }, 2500);

    if (pressedKey === EE.konamiSeq[EE.konamiIdx]) {
      EE.konamiIdx++;
      if (EE.konamiIdx === EE.konamiSeq.length) {
        EE.konamiIdx = 0;
        root.classList.add("kairo-classic");
        toast("Legacy channel unlocked (Press Esc to exit)", 3200);
      }
    } else {
      EE.konamiIdx = pressedKey === "arrowup" ? 1 : 0;
    }
  }

  if (e.key === "Escape") {
    if (root.classList.contains("kairo-classic")) {
      root.classList.remove("kairo-classic");
      toast("Restored standard channel");
      return;
    }
    if ($("lightboxHost").innerHTML) { $("lightboxHost").innerHTML = ""; return; }
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

// ---- app-wide motion ----
const motionStyle = document.createElement("style");
motionStyle.textContent = `
#rc-root{--k-ease:cubic-bezier(.2,.8,.2,1)}
@keyframes kUp{from{opacity:0;transform:translateY(12px)}}
@keyframes kFade{from{opacity:0}}
@keyframes kPop{from{opacity:0;transform:translateY(16px) scale(.96)}}
@keyframes kDrop{from{opacity:0;transform:translateY(-14px)}}
@keyframes kLeft{from{opacity:0;transform:translateX(-14px)}}
@keyframes kRight{from{opacity:0;transform:translateX(16px)}}
@keyframes kZoom{from{opacity:0;transform:scale(.88)}}
@keyframes kRipple{to{opacity:0;transform:translate(-50%,-50%) scale(9)}}
@keyframes kFly{40%{transform:translate(7px,-7px) scale(.9)}41%{opacity:0;transform:translate(-7px,7px)}}
@keyframes kRing{0%{box-shadow:0 0 0 0 rgba(88,101,242,.55)}100%{box-shadow:0 0 0 16px rgba(88,101,242,0)}}
@keyframes kFloat{50%{transform:translateY(-8px)}}
#rc-root .quickAction{animation:kLeft .45s var(--k-ease) backwards}
#rc-root .quickAction:nth-of-type(2){animation-delay:.03s}#rc-root .quickAction:nth-of-type(3){animation-delay:.06s}#rc-root .quickAction:nth-of-type(4){animation-delay:.09s}#rc-root .quickAction:nth-of-type(5){animation-delay:.12s}#rc-root .quickAction:nth-of-type(6){animation-delay:.15s}#rc-root .quickAction:nth-of-type(7){animation-delay:.18s}#rc-root .quickAction:nth-of-type(n+8){animation-delay:.21s}
#rc-root .quickAction{transition:background .18s,color .18s,padding-left .2s var(--k-ease)}
#rc-root .quickAction:hover{padding-left:16px}
#rc-root .quickIcon{display:inline-block;transition:transform .25s var(--k-ease)}
#rc-root .quickAction:hover .quickIcon{transform:scale(1.22) rotate(-6deg)}
#rc-root .k-view{animation:kUp .34s var(--k-ease) backwards}
#rc-root .message.k-in.theirs{animation:kLeft .34s var(--k-ease) backwards}
#rc-root .message.k-in.mine{animation:kRight .34s var(--k-ease) backwards}
#rc-root .item.k-slide{animation:kRight .38s var(--k-ease) backwards}
#rc-root .item{transition:background .18s,color .18s,transform .18s var(--k-ease)}
#rc-root .item:hover{transform:translateX(3px)}
#rc-root .k-drop{animation:kDrop .38s var(--k-ease) backwards}
#rc-root .modalLayer{animation:kFade .22s ease backwards}
#rc-root .modalLayer .modal{animation:kPop .36s var(--k-ease) backwards}
#rc-root .lightbox{animation:kFade .2s ease backwards}
#rc-root .lightbox img{animation:kZoom .3s var(--k-ease) backwards}
#rc-root .emojiPicker{animation:kZoom .18s var(--k-ease) backwards}
#rc-root .emojiPicker button{transition:transform .15s}
#rc-root .emojiPicker button:hover{transform:scale(1.35)}
#rc-root .reactPill{transition:transform .15s,background .15s}
#rc-root .reactPill:hover{transform:translateY(-2px)}
#rc-root .msgActions button{transition:transform .15s,background .15s}
#rc-root .msgActions button:hover{transform:translateY(-2px)}
#rc-root .btn,#rc-root .pillBtn,#rc-root .mediaBtn,#rc-root .sendBtn,#rc-root .iconBtn{transition:transform .16s var(--k-ease),background .16s,box-shadow .2s,filter .16s}
#rc-root .btn:hover,#rc-root .pillBtn:hover,#rc-root .mediaBtn:hover,#rc-root .sendBtn:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,.28)}
#rc-root .btn:active,#rc-root .pillBtn:active,#rc-root .mediaBtn:active,#rc-root .sendBtn:active,#rc-root .iconBtn:active{transform:scale(.94)}
#rc-root .sendBtn.k-fly{animation:kFly .4s var(--k-ease)}
#rc-root .composer input,#rc-root .composer textarea,#rc-root .modal input,#rc-root .searchInput{transition:border-color .2s,box-shadow .25s}
#rc-root .composer input:focus,#rc-root .composer textarea:focus,#rc-root .modal input:focus,#rc-root .searchInput:focus{box-shadow:0 0 0 4px rgba(88,101,242,.2)}
#rc-root .emblemRing{animation:kFloat 5s ease-in-out infinite}
#rc-root .emblemCore{border-radius:inherit;animation:kRing 2.6s ease-out infinite}
#rc-root .stageTitle,#rc-root .stageSub,#rc-root .pillRow{animation:kUp .5s var(--k-ease) backwards}
#rc-root .stageSub{animation-delay:.07s}#rc-root .pillRow{animation-delay:.14s}
#rc-root .statCard{animation:kPop .5s var(--k-ease) backwards;transition:transform .22s var(--k-ease),box-shadow .22s,border-color .22s}
#rc-root .statCard:nth-child(1){animation-delay:.2s}#rc-root .statCard:nth-child(2){animation-delay:.27s}#rc-root .statCard:nth-child(3){animation-delay:.34s}
#rc-root .statCard:hover{transform:translateY(-5px);box-shadow:0 16px 34px rgba(0,0,0,.35);border-color:var(--accent)}
#rc-root .k-ripple{position:fixed;width:18px;height:18px;border-radius:50%;pointer-events:none;z-index:1000000;background:rgba(150,162,255,.4);transform:translate(-50%,-50%) scale(.4);animation:kRipple .5s ease-out forwards}
@media(prefers-reduced-motion:reduce){#rc-root *{animation:none!important;transition:none!important}#rc-root .k-ripple{display:none}}
`;
root.appendChild(motionStyle);
root.addEventListener("pointerdown", (e) => {
  if (!e.target.closest || !e.target.closest("button")) return;
  const dot = el("span", { className: "k-ripple" });
  dot.style.left = e.clientX + "px";
  dot.style.top = e.clientY + "px";
  root.appendChild(dot);
  setTimeout(() => dot.remove(), 520);
}, true);
root.addEventListener("submit", (e) => {
  const btn = e.target.querySelector && e.target.querySelector(".sendBtn");
  if (btn) replay(btn, "k-fly");
}, true);

window.addEventListener("keydown", onKeyDown);
root.addEventListener("click", () => {
  root.querySelectorAll(".emojiPicker").forEach((p) => p.remove());
});

$("exit").onclick = () => {
  arcade.close();
  document.title = origTitle;
  if (document.body) document.body.style.overflow = origBodyOverflow;
  if (document.documentElement) document.documentElement.style.overflow = origHtmlOverflow;
  if (peerConn) endCall();
  vaultKey = null; signKey = null; identity = null; rooms.clear();
  window.removeEventListener("keydown", onKeyDown);
  timers.forEach(clearInterval);
  clearTimeout(readyTimer);
  clearTimeout(pingTimer);
  clearTimeout(EE.konamiTimeout);
  if (es) { es.close(); es = null; }
  const st = document.getElementById("rc-style");
  if (st) st.remove();
  root.remove();
};

function pingNext() {
  const open = Array.from(rooms.values()).filter((r) => r.key && r.ready);
  if (open.length) { const r = open[pingIdx++ % open.length]; post(r, "p").catch(() => {}); }
  pingTimer = setTimeout(pingNext, pingGap());
}
pingTimer = setTimeout(pingNext, pingGap());
timers.push(setInterval(() => { renderSidebar(); updateTop(); }, 5000));

renderWelcome();
const oldKeys = Object.keys(localStorage).filter((k) => k.startsWith("roomchat:v2:"));
if (oldKeys.length && confirm("This security update needs a new account and new chats. Delete the OLD version's data on this device, including its unencrypted history? This can't be undone. Press Cancel to keep it for now.")) oldKeys.forEach(lsDel);
promptVaultLogin();
resubscribe();

// =========================================================================
  // COMPLETE KAIRO ARCADE OVERHAUL (UNBOUNDED, 3D ZOOM, CRT, 2P & 5S BOOT)
  // =========================================================================
  (() => {
    // 1. INJECT UNBOUNDED FONT
    if (!document.getElementById("kairo-font-unbounded")) {
      const fontLink = document.createElement("link");
      fontLink.id = "kairo-font-unbounded";
      fontLink.rel = "stylesheet";
      fontLink.href = "https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;800;900&display=swap";
      document.head.appendChild(fontLink);
    }

    // 2. STYLES: UNBOUNDED, 3D CABINET ZOOM, CRT SCANLINES & INTERFACE
    const masterStyle = document.createElement("style");
    masterStyle.id = "kairo-arcade-style-pack";
    masterStyle.textContent = `
      :root {
        --font-arc: 'Unbounded', system-ui, sans-serif;
        --arc-neon: #5865f2;
        --arc-cyan: #00f2fe;
        --arc-pink: #ff007f;
      }

      /* --- BALANCED 5-SECOND STARTUP CURTAIN --- */
      #kairo-boot-curtain {
        position: fixed;
        inset: 0;
        z-index: 999999;
        background: radial-gradient(circle at 50% 50%, #151821 0%, #06070a 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
      }
      #kairo-boot-curtain.loaded {
        opacity: 0;
        transform: scale(1.05);
        pointer-events: none;
      }
      .hazard-ribbon {
        position: absolute;
        width: 160vw;
        height: 46px;
        background: repeating-linear-gradient(-45deg, #facc15, #facc15 20px, #111215 20px, #111215 40px);
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.85);
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-family: var(--font-arc);
        font-size: 0.7rem;
        font-weight: 800;
        letter-spacing: 0.22em;
        color: #000;
        text-transform: uppercase;
        user-select: none;
        border-top: 3px solid #000;
        border-bottom: 3px solid #000;
        animation: hazardSlide 25s linear infinite;
      }
      .hazard-ribbon.top-angle { top: 18%; transform: rotate(-7deg); }
      .hazard-ribbon.bottom-angle { bottom: 18%; transform: rotate(6deg); }
      @keyframes hazardSlide {
        0% { background-position: 0 0; }
        100% { background-position: 800px 0; }
      }
      .boot-barrier-card {
        position: relative;
        z-index: 10;
        background: rgba(15, 18, 26, 0.96);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 26px;
        padding: 44px 50px;
        width: min(90vw, 400px);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        box-shadow: 0 32px 80px rgba(0, 0, 0, 0.85);
        box-sizing: border-box;
      }
      .barrier-logo {
        width: 60px; height: 60px; border-radius: 18px;
        background: linear-gradient(135deg, var(--arc-neon), #4752c4);
        display: grid; place-items: center;
        font-family: var(--font-arc); font-size: 26px; font-weight: 900; color: #fff;
        box-shadow: 0 10px 25px rgba(88, 101, 242, 0.45);
        animation: barrierPulse 2.4s ease-in-out infinite alternate;
      }
      @keyframes barrierPulse {
        from { transform: scale(1); box-shadow: 0 10px 25px rgba(88, 101, 242, 0.4); }
        to { transform: scale(1.06); box-shadow: 0 14px 35px rgba(88, 101, 242, 0.7); }
      }
      .barrier-title {
        font-family: var(--font-arc); font-size: 1.15rem; font-weight: 800; color: #fff;
      }
      .barrier-bar-track {
        width: 100%; height: 6px; background: rgba(255, 255, 255, 0.08);
        border-radius: 999px; overflow: hidden; position: relative;
      }
      .barrier-bar-fill {
        position: absolute; top: 0; left: 0; height: 100%; width: 45%;
        background: linear-gradient(90deg, var(--arc-cyan), var(--arc-neon));
        border-radius: 999px; animation: barSlide 1.4s infinite cubic-bezier(0.4, 0, 0.2, 1);
      }
      @keyframes barSlide {
        0% { left: -45%; width: 45%; }
        50% { left: 40%; width: 50%; }
        100% { left: 100%; width: 45%; }
      }

      /* --- ARCADE --- */
      #kairo-arcade-modal{position:fixed;inset:0;z-index:2147483647;overflow:auto;display:flex;padding:16px;box-sizing:border-box;outline:none;color:#fff;font-family:var(--font-arc);background:radial-gradient(circle at 20% 0%,#1d1450 0%,transparent 55%),radial-gradient(circle at 90% 100%,#4a0d3b 0%,transparent 55%),rgba(4,5,10,.97);animation:arcPower .45s cubic-bezier(.2,.8,.2,1) both}
      @keyframes arcPower{0%{opacity:0;clip-path:inset(49% 8% 49% 8%)}55%{opacity:1;clip-path:inset(49% 0 49% 0)}100%{clip-path:inset(0 0 0 0)}}
      #kairo-arcade-modal *{box-sizing:border-box;margin:0}
      #kairo-arcade-modal .arc-shell{margin:auto;width:min(980px,100%);display:flex;flex-direction:column;align-items:center;gap:14px}
      #kairo-arcade-modal .arc-head{width:100%;display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between}
      #kairo-arcade-modal .arc-title{font-weight:900;font-size:clamp(1rem,3.5vw,1.6rem);background:linear-gradient(90deg,#00f2fe,#8f7bff,#ff4d9d,#00f2fe);background-size:300%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:arcShine 6s linear infinite}
      @keyframes arcShine{to{background-position:300% 0}}
      #kairo-arcade-modal .arc-tools,#kairo-arcade-modal .arc-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
      #kairo-arcade-modal button{font-family:var(--font-arc);cursor:pointer;color:#fff}
      #kairo-arcade-modal .arc-chip{font-size:.65rem;font-weight:700;padding:9px 13px;border-radius:10px;background:#171a29;border:1px solid #ffffff22;transition:transform .15s,background .15s,border-color .15s}
      #kairo-arcade-modal .arc-chip:hover{background:#242943;border-color:#8f7bff;transform:translateY(-2px)}
      #kairo-arcade-modal .arc-close:hover{background:#ef4444}
      #kairo-arcade-modal.playing .arc-menu,#kairo-arcade-modal.playing .arc-modes,#kairo-arcade-modal:not(.playing) .arc-play,#kairo-arcade-modal:not(.playing) .arc-tools button:nth-child(-n+2){display:none}
      #kairo-arcade-modal .arc-modes{display:flex;gap:4px;padding:4px;border-radius:14px;background:#10121d;border:1px solid #ffffff18}
      #kairo-arcade-modal .arc-mode{font-size:.68rem;font-weight:700;padding:9px 18px;border:0;border-radius:10px;background:transparent;color:#8a91ac;transition:background .2s,color .2s}
      #kairo-arcade-modal .arc-mode.on{background:#5865f2;color:#fff;box-shadow:0 0 22px #5865f299}
      #kairo-arcade-modal .arc-menu{width:100%;display:flex;flex-wrap:wrap;justify-content:center;gap:16px}
      #kairo-arcade-modal .arc-card{width:260px;max-width:100%;text-align:left;display:flex;flex-direction:column;gap:9px;padding:16px;border-radius:20px;background:linear-gradient(160deg,#151829,#0b0d16);border:1px solid #ffffff1c;transition:transform .22s,box-shadow .22s,border-color .22s;animation:arcCard .5s cubic-bezier(.2,.8,.2,1) backwards}
      @keyframes arcCard{from{opacity:0;transform:translateY(18px)}}
      #kairo-arcade-modal .arc-card:hover,#kairo-arcade-modal .arc-card:focus-visible{transform:translateY(-6px);border-color:var(--c);box-shadow:0 14px 40px color-mix(in srgb,var(--c) 35%,transparent)}
      #kairo-arcade-modal .arc-card canvas{width:100%;border-radius:12px;background:#05060b}
      #kairo-arcade-modal .arc-card b{font-size:.95rem;font-weight:900;color:var(--c)}
      #kairo-arcade-modal .arc-card span{font-size:.62rem;line-height:1.8;color:#b8bdd4;min-height:34px}
      #kairo-arcade-modal .arc-card i{font-size:.6rem;font-style:normal;font-weight:700;color:#fff}
      #kairo-arcade-modal .arc-play{width:100%;display:flex;flex-direction:column;align-items:center;gap:10px}
      #kairo-arcade-modal .arc-stage{width:100%;display:flex;justify-content:center}
      #kairo-arcade-modal .arc-frame{position:relative;line-height:0;border-radius:16px;padding:3px;background:linear-gradient(135deg,#00f2fe,#5865f2,#ff4d9d);box-shadow:0 0 50px #5865f255,0 30px 70px #000}
      #kairo-arcade-modal #arcadeCanvas{display:block;border-radius:13px;background:#05060b}
      #kairo-arcade-modal .arc-veil{position:absolute;inset:3px;display:none;place-items:center;border-radius:13px;background:rgba(5,6,11,.78);line-height:1.6;padding:10px;overflow:auto}
      #kairo-arcade-modal .arc-veil.show{display:grid;animation:arcFade .25s ease both}
      @keyframes arcFade{from{opacity:0}}
      #kairo-arcade-modal .arc-panel{display:flex;flex-direction:column;gap:12px;text-align:center;align-items:center;animation:arcCard .35s cubic-bezier(.2,.8,.2,1) both}
      #kairo-arcade-modal .arc-panel h3{font-size:clamp(1.1rem,4vw,1.7rem);font-weight:900;text-shadow:0 0 22px #00f2fe}
      #kairo-arcade-modal .arc-panel p{font-size:.7rem;color:#d6d9ea}
      #kairo-arcade-modal .arc-status{font-size:.72rem;font-weight:700;min-height:1.2em;text-align:center}
      #kairo-arcade-modal .arc-hint{font-size:.58rem;color:#8a91ac;line-height:1.8;text-align:center}
      #kairo-arcade-modal .arc-touch{display:none;gap:8px;justify-content:center;flex-wrap:wrap;touch-action:none;user-select:none;-webkit-user-select:none}
      #kairo-arcade-modal .arc-touch button{width:48px;height:48px;border-radius:14px;font-size:1rem;background:#1b1f33;border:1px solid #ffffff2c}
      #kairo-arcade-modal .arc-touch button:active{background:#5865f2;transform:scale(.94)}
      @media(pointer:coarse){#kairo-arcade-modal:not(.duo) .arc-touch{display:flex}#kairo-arcade-modal .arc-hint{display:none}#kairo-arcade-modal.duo .arc-hint{display:block}}
      @media(prefers-reduced-motion:reduce){#kairo-arcade-modal,#kairo-arcade-modal *{animation:none!important;transition:none!important}}
    `;
    document.head.appendChild(masterStyle);

    // 3. MOUNT 5-SECOND STARTUP CURTAIN
    const appShell = document.querySelector("#rc-root .app") || document.body;
    if (!document.getElementById("kairo-boot-curtain")) {
      const curtain = document.createElement("div");
      curtain.id = "kairo-boot-curtain";
      curtain.innerHTML = `
        <div class="hazard-ribbon top-angle">
          <span>CAUTION // WORKSTATION INITIALIZING</span>
          <span>RESTRICTED RUNTIME</span>
        </div>
        <div class="boot-barrier-card">
          <div class="barrier-logo">k.</div>
          <div class="barrier-title">Initializing Kairo</div>
          <div class="barrier-bar-track"><div class="barrier-bar-fill"></div></div>
        </div>
        <div class="hazard-ribbon bottom-angle">
          <span>KAIRO</span>
          <span>STAND CLEAR</span>
        </div>
      `;
      appShell.appendChild(curtain);
      setTimeout(() => {
        curtain.classList.add("loaded");
        setTimeout(() => curtain.remove(), 700);
      }, 2200);
    }

    // 4. ARCADE ENGINE
    const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const FONT = "'Unbounded', system-ui, sans-serif";
    const BEST_KEY = "kairo:arcade:best";
    const MUTE_KEY = "kairo:arcade:muted";
    let best = {};
    try { best = JSON.parse(lsGet(BEST_KEY)) || {}; } catch {}
    let muted = lsGet(MUTE_KEY) === "1";
    let audio = null;
    let overlay = null;

    function beep(freq, dur, type, vol, slide) {
      if (muted) return;
      try {
        audio = audio || new (window.AudioContext || window.webkitAudioContext)();
        if (audio.state === "suspended") audio.resume();
        const o = audio.createOscillator(), g = audio.createGain(), t = audio.currentTime;
        o.type = type || "square";
        o.frequency.setValueAtTime(freq, t);
        if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, freq * slide), t + dur);
        g.gain.setValueAtTime(vol || 0.04, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g); g.connect(audio.destination);
        o.start(t); o.stop(t + dur);
      } catch {}
    }
    const SFX = {
      move: () => beep(220, 0.04, "square", 0.018),
      turn: () => beep(330, 0.05, "triangle", 0.04),
      hit: () => beep(440, 0.06, "square", 0.035),
      wall: () => beep(260, 0.05, "square", 0.025),
      eat: () => beep(520, 0.12, "triangle", 0.07, 1.9),
      clear: () => { beep(520, 0.1, "square", 0.04); setTimeout(() => beep(780, 0.14, "square", 0.04), 80); },
      big: () => [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => beep(f, 0.14, "square", 0.045), i * 70)),
      lose: () => beep(300, 0.5, "sawtooth", 0.05, 0.25),
      tick: () => beep(600, 0.07, "square", 0.03),
      go: () => beep(1000, 0.16, "square", 0.035)
    };

    const rand = (a, b) => a + Math.random() * (b - a);
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    function box(c, x, y, w, h, r, fill) {
      c.beginPath();
      if (c.roundRect) c.roundRect(x, y, w, h, r); else c.rect(x, y, w, h);
      if (fill) { c.fillStyle = fill; c.fill(); }
    }
    function glow(c, color, blur) { c.shadowColor = color; c.shadowBlur = blur; }
    function label(c, str, x, y, size, color, align) {
      c.font = "800 " + size + "px " + FONT;
      c.fillStyle = color || "#fff";
      c.textAlign = align || "center";
      c.textBaseline = "middle";
      c.fillText(str, x, y);
    }
    function backdrop(c, w, h, t, tint) {
      c.fillStyle = "#05060b";
      c.fillRect(0, 0, w, h);
      c.strokeStyle = tint || "rgba(88,101,242,0.10)";
      c.lineWidth = 1;
      const off = reduceMotion() ? 0 : (t * 12) % 40;
      c.beginPath();
      for (let x = 0; x <= w; x += 40) { c.moveTo(x + 0.5, 0); c.lineTo(x + 0.5, h); }
      for (let y = off; y <= h; y += 40) { c.moveTo(0, y); c.lineTo(w, y); }
      c.stroke();
    }

    function makeFx() {
      let parts = [], words = [], shake = 0;
      return {
        burst(x, y, color, n, power) {
          if (reduceMotion()) n = Math.min(n || 10, 3);
          for (let i = 0; i < (n || 10); i++) {
            const a = rand(0, Math.PI * 2), s = rand(30, power || 190);
            parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: rand(0.35, 0.8), max: 0.8, color, size: rand(2, 5) });
          }
          if (parts.length > 500) parts = parts.slice(-500);
        },
        text(x, y, str, color) { words.push({ x, y, str, color: color || "#fff", life: 1 }); },
        shake(m) { if (!reduceMotion()) shake = Math.max(shake, m); },
        update(dt) {
          parts.forEach((p) => { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 220 * dt; p.life -= dt; });
          parts = parts.filter((p) => p.life > 0);
          words.forEach((w) => { w.y -= 34 * dt; w.life -= dt; });
          words = words.filter((w) => w.life > 0);
          shake = Math.max(0, shake - 40 * dt);
        },
        offset() { return shake ? [rand(-shake, shake), rand(-shake, shake)] : [0, 0]; },
        draw(c) {
          parts.forEach((p) => {
            c.globalAlpha = Math.min(1, p.life / 0.5);
            c.fillStyle = p.color;
            c.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
          });
          words.forEach((w) => { c.globalAlpha = Math.min(1, w.life * 2); label(c, w.str, w.x, w.y, 15, w.color); });
          c.globalAlpha = 1;
        }
      };
    }

    // ---------- TETRIS: 7-bag, ghost, hold, next, hard drop, levels, 2P garbage ----------
    function gameTetris(io) {
      const CELL = 24, COLS = 10, ROWS = 20, PANEL = 400;
      const SHAPES = {
        I: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], O: [[1, 1], [1, 1]],
        T: [[0, 1, 0], [1, 1, 1], [0, 0, 0]], J: [[1, 0, 0], [1, 1, 1], [0, 0, 0]], L: [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
        S: [[0, 1, 1], [1, 1, 0], [0, 0, 0]], Z: [[1, 1, 0], [0, 1, 1], [0, 0, 0]]
      };
      const COLOR = { I: "#00e5ff", O: "#ffe44d", T: "#b565ff", J: "#4d7cff", L: "#ff9a2e", S: "#2ee88a", Z: "#ff4d6d", X: "#59607a" };
      const players = Array.from({ length: io.two ? 2 : 1 }, (_, i) => {
        const p = { i, ox: i * PANEL + 80, board: Array.from({ length: ROWS }, () => Array(COLS).fill("")), bag: [], queue: [], hold: "", held: false, score: 0, lines: 0, level: 1, combo: 0, over: false, fall: 0, lockT: 0, resets: 0, das: 0, arr: 0, soft: 0, clearing: null, garbage: 0 };
        for (let k = 0; k < 4; k++) p.queue.push(draw1(p));
        spawn(p);
        return p;
      });
      let t = 0;
      function draw1(p) {
        if (!p.bag.length) p.bag = "IOTJLSZ".split("").sort(() => Math.random() - 0.5);
        return p.bag.pop();
      }
      function make(type) { return { type, m: SHAPES[type].map((r) => r.slice()), x: type === "O" ? 4 : 3, y: type === "I" ? -1 : 0 }; }
      function spawn(p, type) {
        p.piece = make(type || p.queue.shift());
        if (!type) p.queue.push(draw1(p));
        p.fall = 0; p.lockT = 0; p.resets = 0;
        if (hits(p, p.piece.m, p.piece.x, p.piece.y)) { p.over = true; SFX.lose(); io.fx.shake(10); }
      }
      function hits(p, m, x, y) {
        return m.some((row, r) => row.some((v, c) => v && (x + c < 0 || x + c >= COLS || y + r >= ROWS || (y + r >= 0 && p.board[y + r][x + c]))));
      }
      function nudged(p) { if (p.resets < 15) { p.lockT = 0; p.resets++; } }
      function move(p, dx) {
        if (!hits(p, p.piece.m, p.piece.x + dx, p.piece.y)) { p.piece.x += dx; nudged(p); SFX.move(); }
      }
      function rotate(p, dir) {
        const m = p.piece.m, n = m.length;
        const turned = m.map((row, r) => row.map((_, c) => dir > 0 ? m[n - 1 - c][r] : m[c][n - 1 - r]));
        for (const [kx, ky] of [[0, 0], [-1, 0], [1, 0], [0, -1], [-2, 0], [2, 0], [-1, -1], [1, -1]]) {
          if (!hits(p, turned, p.piece.x + kx, p.piece.y + ky)) {
            p.piece.m = turned; p.piece.x += kx; p.piece.y += ky; nudged(p); SFX.turn(); return;
          }
        }
      }
      function ghostY(p) { let y = p.piece.y; while (!hits(p, p.piece.m, p.piece.x, y + 1)) y++; return y; }
      function lock(p) {
        let above = false;
        p.piece.m.forEach((row, r) => row.forEach((v, c) => {
          if (!v) return;
          if (p.piece.y + r < 0) above = true; else p.board[p.piece.y + r][p.piece.x + c] = p.piece.type;
        }));
        p.held = false;
        if (above) { p.over = true; SFX.lose(); return; }
        const full = [];
        p.board.forEach((row, r) => { if (row.every(Boolean)) full.push(r); });
        if (full.length) {
          p.clearing = { rows: full, t: 0 };
          full.forEach((r) => { for (let c = 0; c < COLS; c += 1) io.fx.burst(p.ox + c * CELL + 12, r * CELL + 12, COLOR[p.board[r][c]], 3, 160); });
          if (full.length >= 4) { SFX.big(); io.fx.shake(9); io.fx.text(p.ox + 120, full[0] * CELL, "TETRIS!", "#00e5ff"); } else SFX.clear();
        } else { p.combo = 0; addGarbage(p); spawn(p); }
      }
      function finishClear(p) {
        const n = p.clearing.rows.length;
        p.board = p.board.filter((_, r) => !p.clearing.rows.includes(r));
        while (p.board.length < ROWS) p.board.unshift(Array(COLS).fill(""));
        p.clearing = null;
        p.combo++;
        const points = [0, 100, 300, 500, 800][n] * p.level + (p.combo - 1) * 50 * p.level;
        p.score += points;
        io.fx.text(p.ox + 120, 200, "+" + points, "#fff");
        if (p.combo > 1) io.fx.text(p.ox + 120, 224, "COMBO x" + p.combo, "#ffe44d");
        p.lines += n;
        const lvl = 1 + Math.floor(p.lines / 10);
        if (lvl > p.level) { p.level = lvl; io.fx.text(p.ox + 120, 150, "LEVEL " + lvl, "#2ee88a"); }
        const other = players[1 - p.i];
        if (other) other.garbage += [0, 0, 1, 2, 4][n];
        spawn(p);
      }
      function addGarbage(p) {
        if (!p.garbage) return;
        const gap = Math.floor(Math.random() * COLS);
        for (let k = 0; k < p.garbage; k++) {
          if (p.board.shift().some(Boolean)) p.over = true;
          p.board.push(Array.from({ length: COLS }, (_, c) => c === gap ? "" : "X"));
        }
        p.garbage = 0; io.fx.shake(6);
      }
      function press(i, a) {
        const p = players[i];
        if (!p || p.over || p.clearing) return;
        if (a === "left" || a === "right") { move(p, a === "left" ? -1 : 1); p.das = 0; p.arr = 0; }
        else if (a === "up") rotate(p, 1);
        else if (a === "ccw") rotate(p, -1);
        else if (a === "a") {
          const y = ghostY(p); p.score += (y - p.piece.y) * 2; p.piece.y = y;
          io.fx.burst(p.ox + (p.piece.x + p.piece.m.length / 2) * CELL, (y + p.piece.m.length - 1) * CELL, COLOR[p.piece.type], 10, 120);
          io.fx.shake(3); SFX.wall(); lock(p);
        } else if (a === "b" && !p.held) {
          const cur = p.piece.type, next = p.hold;
          p.hold = cur; p.held = true; spawn(p, next || undefined); SFX.turn();
        }
      }
      function update(dt) {
        t += dt;
        players.forEach((p) => {
          if (p.over) return;
          if (p.clearing) { p.clearing.t += dt; if (p.clearing.t > 0.22) finishClear(p); return; }
          const dir = (io.down(p.i, "right") ? 1 : 0) - (io.down(p.i, "left") ? 1 : 0);
          if (dir) {
            p.das += dt;
            if (p.das > 0.17) { p.arr += dt; if (p.arr > 0.05) { p.arr = 0; move(p, dir); } }
          } else p.das = 0;
          const soft = io.down(p.i, "down");
          const gravity = Math.max(0.06, 0.8 * Math.pow(0.85, p.level - 1));
          p.fall += dt;
          const grounded = hits(p, p.piece.m, p.piece.x, p.piece.y + 1);
          if (grounded) { p.lockT += dt; if (p.lockT > 0.45) lock(p); }
          else if (p.fall > (soft ? Math.min(0.04, gravity) : gravity)) { p.piece.y++; p.fall = 0; if (soft) p.score++; }
        });
      }
      function cell(c, x, y, size, color) {
        box(c, x + 1, y + 1, size - 2, size - 2, size / 5, color);
        c.fillStyle = "rgba(255,255,255,0.28)"; c.fillRect(x + 4, y + 3, size - 8, Math.max(2, size / 7));
      }
      function mini(c, type, x, y) {
        if (!type) return;
        const m = SHAPES[type].filter((r) => r.some(Boolean));
        const s = 14, w = m[0].length * s;
        m.forEach((row, r) => row.forEach((v, col) => { if (v) cell(c, x - w / 2 + col * s, y + r * s, s, COLOR[type]); }));
      }
      function draw(c) {
        backdrop(c, api.w, api.h, t);
        players.forEach((p) => {
          const left = p.i * PANEL;
          box(c, p.ox, 0, COLS * CELL, ROWS * CELL, 6, "rgba(2,3,8,0.85)");
          c.strokeStyle = "rgba(255,255,255,0.05)"; c.beginPath();
          for (let x = 1; x < COLS; x++) { c.moveTo(p.ox + x * CELL, 0); c.lineTo(p.ox + x * CELL, ROWS * CELL); }
          for (let y = 1; y < ROWS; y++) { c.moveTo(p.ox, y * CELL); c.lineTo(p.ox + COLS * CELL, y * CELL); }
          c.stroke();
          p.board.forEach((row, r) => row.forEach((v, col) => { if (v) cell(c, p.ox + col * CELL, r * CELL, CELL, COLOR[v]); }));
          if (p.clearing) {
            c.fillStyle = "rgba(255,255,255," + (1 - p.clearing.t / 0.22) + ")";
            p.clearing.rows.forEach((r) => c.fillRect(p.ox, r * CELL, COLS * CELL, CELL));
          } else if (!p.over) {
            const gy = ghostY(p);
            p.piece.m.forEach((row, r) => row.forEach((v, col) => {
              if (!v) return;
              const x = p.ox + (p.piece.x + col) * CELL;
              c.strokeStyle = COLOR[p.piece.type]; c.globalAlpha = 0.45;
              box(c, x + 3, (gy + r) * CELL + 3, CELL - 6, CELL - 6, 4); c.stroke(); c.globalAlpha = 1;
              glow(c, COLOR[p.piece.type], 12); cell(c, x, (p.piece.y + r) * CELL, CELL, COLOR[p.piece.type]); c.shadowBlur = 0;
            }));
          }
          label(c, "HOLD", left + 40, 18, 10, "#8a91ac");
          c.globalAlpha = p.held ? 0.35 : 1; mini(c, p.hold, left + 40, 36); c.globalAlpha = 1;
          label(c, "SCORE", left + 40, 110, 9, "#8a91ac"); label(c, String(p.score), left + 40, 128, 12);
          label(c, "LINES", left + 40, 165, 9, "#8a91ac"); label(c, String(p.lines), left + 40, 183, 14);
          label(c, "LEVEL", left + 40, 220, 9, "#8a91ac"); label(c, String(p.level), left + 40, 238, 14);
          if (io.two) label(c, "P" + (p.i + 1), left + 40, 450, 18, p.i ? "#ff4d9d" : "#00e5ff");
          if (p.garbage) label(c, "+" + p.garbage + " ⚠", left + 40, 290, 12, "#ff4d6d");
          label(c, "NEXT", left + 360, 18, 10, "#8a91ac");
          p.queue.slice(0, 3).forEach((q, k) => mini(c, q, left + 360, 38 + k * 56));
          if (p.over) { box(c, p.ox, 215, 240, 50, 8, "rgba(255,50,80,0.88)"); label(c, "TOPPED OUT", p.ox + 120, 241, 14); }
        });
      }
      const api = {
        w: io.two ? PANEL * 2 : PANEL, h: ROWS * CELL, update, draw, press,
        hint: io.two ? "P1: A D move · W turn · S soft · F drop · G hold    P2: arrows · Enter drop · / hold" : "← → move · ↑/X turn · Z turn back · ↓ soft · Space drop · C hold",
        status: () => io.two ? "Clear 2 or more lines to send junk to your rival" : "Score " + players[0].score,
        result() {
          if (!players.some((p) => p.over)) return null;
          if (!io.two) return { title: "GAME OVER", score: players[0].score, sub: players[0].lines + " lines" };
          const [a, b] = players;
          const win = a.over && b.over ? 0 : (a.over ? 2 : 1);
          return { title: win ? "PLAYER " + win + " WINS" : "DRAW", sub: a.score + " – " + b.score };
        }
      };
      return api;
    }

    // ---------- SNAKE: smooth movement, bonus food, speed-up, wrap-around ----------
    function gameSnake(io) {
      const N = 24, S = 20;
      const DIR = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
      const mk = (i, x, y, d) => ({ i, body: [{ x, y }, { x: x - d[0], y }, { x: x - 2 * d[0], y }], prev: null, dir: d, queue: [], grow: 0, dead: false, score: 0, c: i ? ["#ff4d9d", "#8b2bff"] : ["#00f2fe", "#2ee88a"] });
      const snakes = [mk(0, 6, io.two ? 8 : 12, [1, 0])];
      if (io.two) snakes.push(mk(1, 17, 15, [-1, 0]));
      let t = 0, acc = 0, eaten = 0, step = 0.13, bonus = null;
      let food = place();
      function place() {
        let f;
        do { f = { x: Math.floor(rand(0, N)), y: Math.floor(rand(0, N)) }; }
        while (snakes.some((s) => s.body.some((b) => b.x === f.x && b.y === f.y)) || (bonus && bonus.x === f.x && bonus.y === f.y));
        return f;
      }
      function press(i, a) {
        const s = snakes[i], d = DIR[a];
        if (!s || !d || s.queue.length > 2) return;
        const last = s.queue.length ? s.queue[s.queue.length - 1] : s.dir;
        if (d[0] + last[0] === 0 && d[1] + last[1] === 0) return;
        if (d[0] === last[0] && d[1] === last[1]) return;
        s.queue.push(d);
      }
      function tick() {
        const alive = snakes.filter((s) => !s.dead);
        const moves = alive.map((s) => {
          if (s.queue.length) s.dir = s.queue.shift();
          return { s, head: { x: (s.body[0].x + s.dir[0] + N) % N, y: (s.body[0].y + s.dir[1] + N) % N } };
        });
        moves.forEach(({ s, head }) => {
          s.prev = s.body.map((b) => ({ x: b.x, y: b.y }));
          s.body.unshift(head);
          let ate = 0;
          if (head.x === food.x && head.y === food.y) {
            ate = 10; eaten++; s.grow += 1; io.fx.burst(food.x * S + 10, food.y * S + 10, "#ff4d6d", 18);
            SFX.eat(); step = Math.max(0.065, step - 0.0025); food = place();
            if (eaten % 5 === 0) { const b = place(); bonus = { x: b.x, y: b.y, life: 6 }; }
          } else if (bonus && head.x === bonus.x && head.y === bonus.y) {
            ate = 20 + Math.ceil(bonus.life) * 5; s.grow += 3; io.fx.burst(head.x * S + 10, head.y * S + 10, "#ffe44d", 34, 260); SFX.big(); io.fx.shake(5); bonus = null;
          }
          if (ate) { s.score += ate; io.fx.text(head.x * S + 10, head.y * S, "+" + ate, "#ffe44d"); }
          if (s.grow > 0) s.grow--; else s.body.pop();
        });
        const dying = moves.filter(({ s, head }) => snakes.some((o) => o.body.some((b, k) => !(o === s && k === 0) && b.x === head.x && b.y === head.y)));
        dying.forEach(({ s, head }) => { s.dead = true; io.fx.burst(head.x * S + 10, head.y * S + 10, s.c[0], 40, 240); io.fx.shake(10); SFX.lose(); });
      }
      function update(dt) {
        t += dt; acc += dt;
        if (bonus) { bonus.life -= dt; if (bonus.life <= 0) bonus = null; }
        while (acc >= step && !api.result()) { acc -= step; tick(); }
      }
      function draw(c) {
        backdrop(c, api.w, api.h, 0, "rgba(46,232,138,0.07)");
        const pulse = 1 + Math.sin(t * 6) * 0.12;
        glow(c, "#ff4d6d", 18); c.fillStyle = "#ff4d6d"; c.beginPath(); c.arc(food.x * S + 10, food.y * S + 10, 7 * pulse, 0, 7); c.fill();
        if (bonus) {
          glow(c, "#ffe44d", 22); c.fillStyle = "#ffe44d"; c.beginPath(); c.arc(bonus.x * S + 10, bonus.y * S + 10, 9 * pulse, 0, 7); c.fill();
          c.strokeStyle = "#ffe44d"; c.lineWidth = 2; c.beginPath(); c.arc(bonus.x * S + 10, bonus.y * S + 10, 14, -1.57, -1.57 + 6.283 * (bonus.life / 6)); c.stroke();
        }
        c.shadowBlur = 0;
        const f = api.result() ? 1 : clamp(acc / step, 0, 1);
        snakes.forEach((s) => {
          const pts = s.body.map((b, k) => {
            const from = s.prev && !s.dead ? (s.prev[k] || s.prev[s.prev.length - 1]) : b;
            const wrapped = Math.abs(b.x - from.x) > 1 || Math.abs(b.y - from.y) > 1;
            const q = wrapped ? b : { x: from.x + (b.x - from.x) * f, y: from.y + (b.y - from.y) * f };
            return { x: q.x * S + 10, y: q.y * S + 10 };
          });
          for (let k = pts.length - 1; k >= 0; k--) {
            const q = pts[k], size = 18 - 7 * (k / pts.length);
            if (k === 0) glow(c, s.c[0], 16);
            box(c, q.x - size / 2, q.y - size / 2, size, size, size / 2.4, s.dead ? "#4b5568" : s.c[k % 6 < 3 ? 0 : 1]);
            c.shadowBlur = 0;
          }
          const h = pts[0];
          c.fillStyle = "#05060b";
          [-1, 1].forEach((side) => { c.beginPath(); c.arc(h.x + s.dir[0] * 3 + s.dir[1] * 4 * side, h.y + s.dir[1] * 3 + s.dir[0] * 4 * side, 2.2, 0, 7); c.fill(); });
        });
      }
      const api = {
        w: N * S, h: N * S, update, draw, press,
        hint: io.two ? "P1: W A S D (blue)    P2: arrow keys (pink)" : "Arrows or W A S D · walls wrap around · grab gold food fast",
        status: () => io.two ? "P1 " + snakes[0].score + "  ·  P2 " + snakes[1].score : "Score " + snakes[0].score,
        result() {
          if (!snakes.some((s) => s.dead)) return null;
          if (!io.two) return { title: "GAME OVER", score: snakes[0].score, sub: "Length " + snakes[0].body.length };
          const [a, b] = snakes;
          const win = a.dead && b.dead ? 0 : (a.dead ? 2 : 1);
          return { title: win ? "PLAYER " + win + " WINS" : "DRAW", sub: a.score + " – " + b.score };
        }
      };
      return api;
    }

    // ---------- ROAD CROSS: endless road and river, coins, split-screen race ----------
    function gameCross(io) {
      const C = 40, COLS = 9, VIEW = 12, W = C * COLS, GAP = 16, SPAN = W + 240;
      const seed = Math.floor(rand(1, 1e9));
      const lanes = [];
      let rs = seed;
      const rnd2 = () => { rs = (rs * 16807) % 2147483647; return rs / 2147483647; };
      function lane(n) {
        while (lanes.length <= n) {
          const k = lanes.length, hard = Math.min(1, k / 90);
          const prev = lanes[k - 1], two = lanes[k - 2];
          let type = "grass";
          if (k > 2) {
            const roll = rnd2();
            type = roll < 0.24 ? "grass" : (roll < 0.74 ? "road" : "river");
            if (type === "river" && prev.type === "river" && two && two.type === "river") type = "grass";
          }
          const L = { type, items: [], trees: [], coin: -1, speed: 0 };
          const dir = prev && prev.speed > 0 ? -1 : 1;
          if (type === "grass") {
            if (k > 2) for (let i = 0; i < 3; i++) { const x = Math.floor(rnd2() * COLS); if (x !== 4 && rnd2() < 0.65) L.trees.push(x); }
          } else if (type === "road") {
            L.speed = dir * (50 + rnd2() * 55 + hard * 70);
            const count = 2 + (rnd2() < hard ? 1 : 0), w = rnd2() < 0.25 ? 82 : 52;
            const color = ["#ff4d6d", "#ff9a2e", "#b565ff", "#4d7cff", "#ffe44d"][Math.floor(rnd2() * 5)];
            for (let i = 0; i < count; i++) L.items.push({ at: i * (SPAN / count) + rnd2() * 40, w, color });
          } else {
            L.speed = dir * (32 + rnd2() * 30 + hard * 24);
            for (let i = 0; i < 5; i++) L.items.push({ at: i * (SPAN / 5) + rnd2() * 12, w: 100 - Math.floor(hard * 20) });
          }
          if (k > 3 && type !== "river" && rnd2() < 0.18) { const x = Math.floor(rnd2() * COLS); if (!L.trees.includes(x)) L.coin = x; }
          lanes.push(L);
        }
        return lanes[n];
      }
      const itemX = (L, it, t) => ((((it.at + L.speed * t) % SPAN) + SPAN) % SPAN) - 120;
      const players = Array.from({ length: io.two ? 2 : 1 }, (_, i) => ({ i, x: 4 * C, row: 0, from: null, hop: 1, cam: 0, top: 0, coins: 0, got: new Set(), dead: false, facing: 1, queued: null, color: i ? "#ff4d9d" : "#ffe44d" }));
      let t = 0;
      const offsetX = (p) => p.i * (W + GAP);
      const screenY = (p, row) => (VIEW - 3 - (row - p.cam)) * C;
      const score = (p) => p.top * 10 + p.coins * 25;
      function die(p, why) {
        p.dead = true; p.why = why;
        io.fx.burst(offsetX(p) + p.x + 20, screenY(p, p.row) + 20, why === "water" ? "#4dd8ff" : p.color, 36, 230);
        io.fx.shake(10); SFX.lose();
      }
      function press(i, a) {
        const p = players[i];
        if (!p || p.dead) return;
        if (p.hop < 1) { p.queued = a; return; }
        let row = p.row, x = p.x;
        if (a === "up") row++; else if (a === "down") row--; else if (a === "left") x -= C; else if (a === "right") x += C; else return;
        if (row < 0 || row < Math.floor(p.cam) - 2 || x < -4 || x > W - C + 4) return;
        const L = lane(row);
        if (L.type !== "river") x = Math.round(x / C) * C;
        if (L.type === "grass" && L.trees.includes(Math.round(x / C))) return;
        p.from = { x: p.x, row: p.row }; p.x = clamp(x, 0, W - C); p.row = row; p.hop = 0;
        SFX.move();
      }
      function update(dt) {
        t += dt;
        players.forEach((p) => {
          if (p.dead) return;
          if (p.hop < 1) {
            p.hop = Math.min(1, p.hop + dt / 0.11);
            if (p.hop === 1) {
              if (p.row > p.top) p.top = p.row;
              if (p.queued) { const q = p.queued; p.queued = null; press(p.i, q); }
            }
          }
          p.cam += (Math.max(0, p.row - 1) - p.cam) * Math.min(1, dt * 7);
          const L = lane(p.row);
          if (p.hop < 0.7) return;
          const mid = p.x + C / 2;
          if (L.type === "road") {
            if (L.items.some((it) => { const x = itemX(L, it, t); return p.x + 32 > x && p.x + 8 < x + it.w; })) die(p, "car");
          } else if (L.type === "river") {
            const on = L.items.some((it) => { const x = itemX(L, it, t); return mid > x - 6 && mid < x + it.w + 6; });
            if (!on && p.hop === 1) die(p, "water");
            else if (on) { p.x += L.speed * dt; if (p.x < -20 || p.x > W - 20) die(p, "water"); }
          }
          const col = Math.round(p.x / C);
          if (L.coin === col && !p.got.has(p.row)) { p.got.add(p.row); p.coins++; SFX.eat(); io.fx.text(offsetX(p) + p.x + 20, screenY(p, p.row), "+25", "#ffe44d"); }
        });
      }
      function draw(c) {
        c.fillStyle = "#05060b"; c.fillRect(0, 0, api.w, api.h);
        players.forEach((p) => {
          c.save(); c.translate(offsetX(p), 0); c.beginPath(); c.rect(0, 0, W, VIEW * C); c.clip();
          const first = Math.floor(p.cam) - 3;
          for (let n = first; n < first + VIEW + 4; n++) {
            const L = n < 0 ? { type: "grass", items: [], trees: [], coin: -1 } : lane(n), y = screenY(p, n);
            c.fillStyle = L.type === "grass" ? (n % 2 ? "#123524" : "#15402b") : (L.type === "road" ? "#1b1e29" : "#0a3556");
            c.fillRect(0, y, W, C);
            if (L.type === "road") {
              c.fillStyle = "rgba(255,255,255,0.16)";
              for (let x = 6; x < W; x += 40) c.fillRect(x, y + C - 1, 18, 2);
              L.items.forEach((it) => {
                const x = itemX(L, it, t);
                box(c, x, y + 8, it.w, 24, 8, it.color);
                box(c, x + it.w * 0.28, y + 12, it.w * 0.4, 16, 5, "rgba(5,6,11,0.55)");
                const nose = L.speed > 0 ? x + it.w - 4 : x + 1;
                glow(c, "#fff6c2", 12); c.fillStyle = "#fff6c2"; c.fillRect(nose, y + 11, 3, 5); c.fillRect(nose, y + 24, 3, 5); c.shadowBlur = 0;
              });
            } else if (L.type === "river") {
              c.strokeStyle = "rgba(120,220,255,0.25)"; c.beginPath();
              for (let x = 0; x <= W; x += 8) c.lineTo(x, y + 6 + Math.sin(x / 18 + t * 3 + n) * 3);
              c.stroke();
              L.items.forEach((it) => {
                const x = itemX(L, it, t);
                box(c, x, y + 6, it.w, 28, 14, "#8a5a33");
                c.fillStyle = "rgba(0,0,0,0.22)"; for (let k = 16; k < it.w - 10; k += 22) c.fillRect(x + k, y + 14, 10, 3);
              });
            }
            L.trees.forEach((tx) => {
              box(c, tx * C + 17, y + 22, 6, 12, 2, "#6b4326");
              c.fillStyle = "#2ee88a"; c.beginPath(); c.arc(tx * C + 20, y + 17, 12, 0, 7); c.fill();
              c.fillStyle = "rgba(255,255,255,0.18)"; c.beginPath(); c.arc(tx * C + 16, y + 13, 4, 0, 7); c.fill();
            });
            if (L.coin >= 0 && !p.got.has(n)) {
              glow(c, "#ffe44d", 14); c.fillStyle = "#ffe44d"; c.beginPath();
              c.ellipse(L.coin * C + 20, y + 20, Math.abs(Math.cos(t * 3 + n)) * 7 + 2, 9, 0, 0, 7); c.fill(); c.shadowBlur = 0;
            }
          }
          if (!p.dead) {
            const e = p.hop, fx = p.from && e < 1 ? p.from.x + (p.x - p.from.x) * e : p.x;
            const fr = p.from && e < 1 ? p.from.row + (p.row - p.from.row) * e : p.row;
            const lift = Math.sin(e * Math.PI) * 12, y = screenY(p, fr);
            c.fillStyle = "rgba(0,0,0,0.35)"; c.beginPath(); c.ellipse(fx + 20, y + 33, 13, 5, 0, 0, 7); c.fill();
            glow(c, p.color, 14); box(c, fx + 8, y + 7 - lift, 24, 24, 8, p.color); c.shadowBlur = 0;
            c.fillStyle = "#05060b"; c.fillRect(fx + 13, y + 13 - lift, 4, 5); c.fillRect(fx + 23, y + 13 - lift, 4, 5);
          }
          box(c, 8, 8, 120, 26, 13, "rgba(5,6,11,0.75)");
          label(c, (io.two ? "P" + (p.i + 1) + "  " : "") + score(p), 68, 22, 12, p.color);
          if (p.dead) { box(c, 40, 215, W - 80, 52, 12, "rgba(255,50,80,0.9)"); label(c, p.why === "water" ? "SPLASH!" : "SPLAT!", W / 2, 242, 18); }
          c.restore();
        });
      }
      const api = {
        w: io.two ? W * 2 + GAP : W, h: VIEW * C, update, draw, press,
        hint: io.two ? "Race! P1: W A S D    P2: arrow keys" : "Arrows or W A S D · ride the logs · collect coins",
        status: () => io.two ? "Highest score wins" : "Furthest row " + players[0].top,
        result() {
          if (!players.every((p) => p.dead)) return null;
          if (!io.two) return { title: "GAME OVER", score: score(players[0]), sub: players[0].top + " rows · " + players[0].coins + " coins" };
          const a = score(players[0]), b = score(players[1]);
          return { title: a === b ? "DRAW" : "PLAYER " + (a > b ? 1 : 2) + " WINS", sub: a + " – " + b };
        }
      };
      return api;
    }

    // ---------- PONG: angled shots, rallies speed up, trail, beatable bot ----------
    function gamePong(io) {
      const W = 640, H = 400, PH = 76, WIN = 7;
      const pads = [{ x: 22, y: H / 2 - PH / 2, score: 0, c: "#00f2fe", flash: 0 }, { x: W - 34, y: H / 2 - PH / 2, score: 0, c: "#ff4d9d", flash: 0 }];
      let t = 0, rally = 0, bestRally = 0, trail = [], wait = 0.6, aim = 0, ball = serve(Math.random() < 0.5 ? 1 : -1);
      function serve(dir) { rally = 0; wait = 0.7; trail = []; aim = rand(-30, 30); return { x: W / 2, y: H / 2, vx: dir * 310, vy: rand(-150, 150) }; }
      function update(dt) {
        t += dt;
        pads.forEach((p, i) => {
          p.flash = Math.max(0, p.flash - dt * 4);
          if (i === 1 && !io.two) {
            const target = ball.vx > 0 ? ball.y + aim : H / 2;
            p.y += clamp(target - (p.y + PH / 2), -255 * dt, 255 * dt);
          } else {
            const d = (io.down(i, "down") ? 1 : 0) - (io.down(i, "up") ? 1 : 0);
            p.y += d * 410 * dt;
          }
          p.y = clamp(p.y, 0, H - PH);
        });
        if (wait > 0) { wait -= dt; return; }
        const px = ball.x;
        ball.x += ball.vx * dt; ball.y += ball.vy * dt;
        if (ball.y < 7 || ball.y > H - 7) { ball.y = clamp(ball.y, 7, H - 7); ball.vy *= -1; SFX.wall(); io.fx.burst(ball.x, ball.y, "#fff", 5, 90); }
        pads.forEach((p, i) => {
          const face = i ? p.x - 7 : p.x + 12 + 7;
          const crossed = i ? (px <= face && ball.x >= face) : (px >= face && ball.x <= face);
          if (crossed && ball.y > p.y - 8 && ball.y < p.y + PH + 8) {
            const off = clamp((ball.y - (p.y + PH / 2)) / (PH / 2), -1, 1);
            rally++; bestRally = Math.max(bestRally, rally);
            const speed = Math.min(720, 330 + rally * 24), ang = off * 1.0;
            ball.vx = (i ? -1 : 1) * Math.cos(ang) * speed; ball.vy = Math.sin(ang) * speed; ball.x = face;
            p.flash = 1; SFX.hit(); io.fx.burst(ball.x, ball.y, p.c, 14, 200); io.fx.shake(Math.min(7, 1 + rally / 3));
            aim = rand(-46, 46);
            if (rally % 5 === 0) io.fx.text(W / 2, 80, rally + " HIT RALLY!", "#ffe44d");
          }
        });
        if (ball.x < -12 || ball.x > W + 12) {
          const w = ball.x < 0 ? 1 : 0;
          pads[w].score++; io.fx.burst(clamp(ball.x, 6, W - 6), ball.y, pads[w].c, 40, 280); io.fx.shake(10); SFX.clear();
          ball = serve(w ? -1 : 1);
        }
        trail.push({ x: ball.x, y: ball.y }); if (trail.length > 14) trail.shift();
      }
      function draw(c) {
        backdrop(c, W, H, 0);
        c.setLineDash([8, 10]); c.strokeStyle = "rgba(255,255,255,0.2)"; c.beginPath(); c.moveTo(W / 2, 0); c.lineTo(W / 2, H); c.stroke(); c.setLineDash([]);
        c.beginPath(); c.arc(W / 2, H / 2, 54, 0, 7); c.stroke();
        c.globalAlpha = 0.22; label(c, String(pads[0].score), W / 2 - 90, 70, 64, pads[0].c); label(c, String(pads[1].score), W / 2 + 90, 70, 64, pads[1].c); c.globalAlpha = 1;
        pads.forEach((p) => { glow(c, p.c, 14 + p.flash * 24); box(c, p.x - p.flash * 2, p.y, 12 + p.flash * 4, PH, 6, p.flash > 0.5 ? "#fff" : p.c); c.shadowBlur = 0; });
        trail.forEach((q, k) => { c.globalAlpha = k / trail.length * 0.45; c.fillStyle = "#9fb4ff"; c.beginPath(); c.arc(q.x, q.y, 7 * k / trail.length, 0, 7); c.fill(); });
        c.globalAlpha = 1; glow(c, "#fff", 18); c.fillStyle = "#fff"; c.beginPath(); c.arc(ball.x, ball.y, 7, 0, 7); c.fill(); c.shadowBlur = 0;
      }
      const api = {
        w: W, h: H, update, draw, press: () => {},
        hint: io.two ? "P1: W / S    P2: ↑ / ↓    first to 7" : "↑ / ↓ or W / S · hit with the paddle edge for sharp angles",
        status: () => "Rally " + rally + "  ·  best " + bestRally,
        result() {
          const w = pads.findIndex((p) => p.score >= WIN);
          if (w < 0) return null;
          const sub = pads[0].score + " – " + pads[1].score + " · best rally " + bestRally;
          if (io.two) return { title: "PLAYER " + (w + 1) + " WINS", sub };
          return { title: w === 0 ? "YOU WIN!" : "BOT WINS", sub, score: pads[0].score * 100 + bestRally * 10 - pads[1].score * 20 };
        }
      };
      return api;
    }

    // ---------- BRICK BREAKER: levels, power-ups, 2P co-op ----------
    function gameBricks(io) {
      const W = 480, H = 520, COLS = 8, BW = 54, BH = 20;
      const POW = { W: ["#2ee88a", "WIDE"], M: ["#ffe44d", "MULTIBALL"], S: ["#4dd8ff", "SLOW"], L: ["#ff4d9d", "+1 LIFE"] };
      const n = io.two ? 2 : 1;
      const pads = Array.from({ length: n }, (_, i) => ({ i, x: n === 2 ? 70 + i * 250 : 195, w: n === 2 ? 76 : 90, wide: 0, c: i ? "#ff4d9d" : "#00f2fe" }));
      let t = 0, level = 1, lives = 3, points = 0, combo = 0, bricks = [], balls = [], drops = [], slow = 0;
      function build() {
        bricks = [];
        for (let r = 0; r < Math.min(8, 3 + level); r++) for (let c = 0; c < COLS; c++) {
          if (level % 3 === 2 && (r + c) % 2 && r > 1) continue;
          if (level % 3 === 0 && (c === 3 || c === 4) && r % 3 === 1) continue;
          const hp = r < Math.min(3, level - 1) ? 2 : 1;
          bricks.push({ x: 10 + c * (BW + 4), y: 54 + r * (BH + 5), hp, color: ["#ff4d6d", "#ff9a2e", "#ffe44d", "#2ee88a", "#00e5ff", "#4d7cff", "#b565ff", "#ff4d9d"][r % 8] });
        }
      }
      function newBall() { balls = [{ x: 0, y: H - 52, vx: 0, vy: 0, stuck: 0, trail: [] }]; combo = 0; }
      function width(p) { return p.wide > 0 ? p.w * 1.55 : p.w; }
      function launch(b) { const a = rand(-0.6, 0.6), s = 300 + level * 18; b.vx = Math.sin(a) * s; b.vy = -Math.cos(a) * s; b.stuck = null; SFX.go(); }
      build(); newBall();
      function press(i, a) { if (a === "a" || a === "up") balls.filter((b) => b.stuck !== null && b.stuck === i % n).forEach(launch); }
      function update(dt) {
        t += dt; slow = Math.max(0, slow - dt);
        pads.forEach((p) => {
          p.wide = Math.max(0, p.wide - dt);
          const d = (io.down(p.i, "right") ? 1 : 0) - (io.down(p.i, "left") ? 1 : 0);
          p.x = clamp(p.x + d * 470 * dt, 0, W - width(p));
        });
        const k = slow > 0 ? 0.65 : 1;
        balls.forEach((b) => {
          if (b.stuck !== null) { const p = pads[b.stuck]; b.x = p.x + width(p) / 2; b.y = H - 40; return; }
          b.trail.push({ x: b.x, y: b.y }); if (b.trail.length > 10) b.trail.shift();
          const steps = 3;
          for (let s = 0; s < steps; s++) {
            const ox = b.x, oy = b.y;
            b.x += b.vx * dt * k / steps; b.y += b.vy * dt * k / steps;
            if (b.x < 7 || b.x > W - 7) { b.x = clamp(b.x, 7, W - 7); b.vx *= -1; SFX.wall(); }
            if (b.y < 7) { b.y = 7; b.vy = Math.abs(b.vy); SFX.wall(); }
            if (b.vy > 0 && oy <= H - 37 && b.y >= H - 37) {
              const p = pads.find((q) => b.x > q.x - 7 && b.x < q.x + width(q) + 7);
              if (p) {
                const off = clamp((b.x - (p.x + width(p) / 2)) / (width(p) / 2), -1, 1);
                const sp = Math.hypot(b.vx, b.vy); b.vx = Math.sin(off * 1.05) * sp; b.vy = -Math.cos(off * 1.05) * sp; b.y = H - 37;
                combo = 0; SFX.hit(); io.fx.burst(b.x, H - 34, p.c, 6, 110);
              }
            }
            const br = bricks.find((q) => b.x + 6 > q.x && b.x - 6 < q.x + BW && b.y + 6 > q.y && b.y - 6 < q.y + BH);
            if (br) {
              if (ox + 6 <= br.x || ox - 6 >= br.x + BW) b.vx *= -1; else b.vy *= -1;
              b.x = ox; b.y = oy; br.hp--; combo++;
              const gain = 10 * Math.min(10, combo); points += gain; SFX.turn(); io.fx.burst(b.x, b.y, br.color, br.hp ? 6 : 16, 180);
              if (!br.hp) {
                bricks = bricks.filter((q) => q !== br); io.fx.text(br.x + BW / 2, br.y, "+" + gain, br.color);
                if (Math.random() < 0.15) { const keys = lives < 5 && Math.random() < 0.12 ? ["L"] : ["W", "M", "S"]; drops.push({ x: br.x + BW / 2, y: br.y, k: keys[Math.floor(Math.random() * keys.length)] }); }
              }
              break;
            }
          }
        });
        balls = balls.filter((b) => b.y < H + 12);
        if (!balls.length) { lives--; io.fx.shake(10); SFX.lose(); drops = []; if (lives > 0) newBall(); }
        drops.forEach((d) => {
          d.y += 120 * dt;
          const p = pads.find((q) => d.y > H - 38 && d.y < H - 16 && d.x > q.x - 12 && d.x < q.x + width(q) + 12);
          if (!p) return;
          d.gone = true; SFX.big(); io.fx.text(d.x, H - 70, POW[d.k][1], POW[d.k][0]);
          if (d.k === "W") p.wide = 12;
          if (d.k === "S") slow = 8;
          if (d.k === "L") lives++;
          if (d.k === "M") {
            const src = balls.find((b) => b.stuck === null);
            if (src && balls.length < 7) [-0.45, 0.45].forEach((a) => balls.push({ x: src.x, y: src.y, vx: src.vx * Math.cos(a) - src.vy * Math.sin(a), vy: src.vx * Math.sin(a) + src.vy * Math.cos(a), stuck: null, trail: [] }));
          }
        });
        drops = drops.filter((d) => !d.gone && d.y < H + 20);
        // Stop near-horizontal loops.
        balls.forEach((b) => { if (b.stuck === null && Math.abs(b.vy) < 90) b.vy = b.vy < 0 ? -90 : 90; });
        if (!bricks.length) { level++; drops = []; build(); newBall(); io.fx.text(W / 2, 270, "LEVEL " + level, "#2ee88a"); io.fx.burst(W / 2, 270, "#2ee88a", 60, 300); SFX.big(); }
      }
      function draw(c) {
        backdrop(c, W, H, t, "rgba(181,101,255,0.09)");
        bricks.forEach((b) => {
          box(c, b.x, b.y, BW, BH, 5, b.color);
          c.fillStyle = "rgba(255,255,255,0.3)"; c.fillRect(b.x + 5, b.y + 3, BW - 10, 3);
          if (b.hp > 1) { c.strokeStyle = "#fff"; c.lineWidth = 2; box(c, b.x + 2, b.y + 2, BW - 4, BH - 4, 4); c.stroke(); c.lineWidth = 1; }
        });
        drops.forEach((d) => { glow(c, POW[d.k][0], 14); box(c, d.x - 12, d.y - 9, 24, 18, 9, POW[d.k][0]); c.shadowBlur = 0; label(c, d.k, d.x, d.y + 1, 10, "#05060b"); });
        pads.forEach((p) => { glow(c, p.c, 16); box(c, p.x, H - 30, width(p), 12, 6, p.c); c.shadowBlur = 0; });
        balls.forEach((b) => {
          b.trail.forEach((q, i) => { c.globalAlpha = i / b.trail.length * 0.4; c.fillStyle = "#b9a4ff"; c.beginPath(); c.arc(q.x, q.y, 6 * i / b.trail.length, 0, 7); c.fill(); });
          c.globalAlpha = 1; glow(c, "#fff", 14); c.fillStyle = "#fff"; c.beginPath(); c.arc(b.x, b.y, 6.5, 0, 7); c.fill(); c.shadowBlur = 0;
        });
        label(c, "LEVEL " + level, 12, 24, 12, "#fff", "left");
        label(c, String(points), W / 2, 24, 16);
        label(c, "♥".repeat(Math.max(0, lives)), W - 12, 25, 13, "#ff4d6d", "right");
        if (balls.some((b) => b.stuck !== null)) label(c, io.two ? "P1: F to launch" : "SPACE or ↑ to launch", W / 2, H - 90, 11, "#aab0c8");
      }
      const api = {
        w: W, h: H, update, draw, press,
        hint: io.two ? "Co-op: P1 A / D, F launch    P2 ← / →" : "← → or A D to move · Space to launch · catch the power-ups",
        status: () => "Level " + level + "  ·  lives " + lives,
        result: () => lives > 0 ? null : { title: "GAME OVER", score: points, sub: "Reached level " + level }
      };
      return api;
    }

    const GAMES = {
      tetris: { name: "Tetris", icon: "▦", color: "#b565ff", make: gameTetris, blurb: "Stack, hold and clear. In 2P, send junk to your rival.", two: "Versus" },
      snake: { name: "Snake", icon: "≋", color: "#2ee88a", make: gameSnake, blurb: "Smooth, fast and hungry. Catch gold food before it fades.", two: "Duel" },
      cross: { name: "Road Cross", icon: "⇈", color: "#ffe44d", make: gameCross, blurb: "An endless world of traffic, rivers, logs and coins.", two: "Race" },
      pong: { name: "Pong", icon: "◍", color: "#00f2fe", make: gamePong, blurb: "Angle your shots. Every hit gets faster.", two: "Versus" },
      bricks: { name: "Brick Breaker", icon: "▤", color: "#ff4d9d", make: gameBricks, blurb: "Smash through levels and grab power-ups.", two: "Co-op" }
    };

    // 5. CABINET SHELL, MENU AND GAME LOOP
    function openArcade(startGame) {
      if (overlay) return;
      if (document.activeElement) document.activeElement.blur();
      let two = false, current = null, game = null, fx = null, raf = 0, last = 0, acc = 0;
      let mode = "menu", count = 0, countShown = 0, previews = [];
      const keys = new Set(), touchHeld = new Set();

      overlay = el("div", { id: "kairo-arcade-modal", tabIndex: -1 });
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-label", "Kairo Arcade");
      const title = el("div", { className: "arc-title", textContent: "KAIRO ARCADE" });
      const backBtn = el("button", { type: "button", className: "arc-chip", textContent: "← Games", onclick: showMenu });
      const pauseBtn = el("button", { type: "button", className: "arc-chip", textContent: "Pause", onclick: togglePause });
      const muteBtn = el("button", { type: "button", className: "arc-chip", onclick: toggleMute });
      const closeBtn = el("button", { type: "button", className: "arc-chip arc-close", textContent: "✕", title: "Close arcade", onclick: closeArcade });
      const one = el("button", { type: "button", className: "arc-mode", textContent: "1 Player", onclick: () => setTwo(false) });
      const duo = el("button", { type: "button", className: "arc-mode", textContent: "2 Players", onclick: () => setTwo(true) });
      const modes = el("div", { className: "arc-modes" }, one, duo);
      const menu = el("div", { className: "arc-menu" });
      const canvas = el("canvas", { id: "arcadeCanvas" });
      const veil = el("div", { className: "arc-veil" });
      const frame = el("div", { className: "arc-frame" }, canvas, veil);
      const stage = el("div", { className: "arc-stage" }, frame);
      const statusEl = el("div", { className: "arc-status" });
      const hintEl = el("div", { className: "arc-hint" });
      const touch = el("div", { className: "arc-touch" });
      [["left", "◀"], ["up", "▲"], ["down", "▼"], ["right", "▶"], ["a", "A"], ["b", "B"]].forEach(([action, face]) => {
        const b = el("button", { type: "button", textContent: face });
        b.setAttribute("aria-label", action);
        b.addEventListener("pointerdown", (e) => { e.preventDefault(); touchHeld.add(action); if (mode === "play") game.press(0, action); });
        ["pointerup", "pointercancel", "pointerleave"].forEach((n) => b.addEventListener(n, () => touchHeld.delete(action)));
        touch.append(b);
      });
      const play = el("div", { className: "arc-play" }, stage, statusEl, hintEl, touch);
      const shell = el("div", { className: "arc-shell" },
        el("div", { className: "arc-head" }, title, el("div", { className: "arc-tools" }, backBtn, pauseBtn, muteBtn, closeBtn)),
        modes, menu, play);
      overlay.append(shell);
      document.body.appendChild(overlay);

      const binds = () => two ? [
        { left: ["KeyA"], right: ["KeyD"], up: ["KeyW"], down: ["KeyS"], a: ["KeyF"], b: ["KeyG"], ccw: ["KeyQ"] },
        { left: ["ArrowLeft"], right: ["ArrowRight"], up: ["ArrowUp"], down: ["ArrowDown"], a: ["Enter"], b: ["ShiftRight", "Slash"], ccw: ["Period"] }
      ] : [{ left: ["ArrowLeft", "KeyA"], right: ["ArrowRight", "KeyD"], up: ["ArrowUp", "KeyW", "KeyX"], down: ["ArrowDown", "KeyS"], a: ["Space"], b: ["KeyC", "ShiftLeft", "ShiftRight"], ccw: ["KeyZ"] }];
      const io = {
        get two() { return two; },
        down: (p, a) => { const m = binds()[p]; return (!!m && (m[a] || []).some((k) => keys.has(k))) || (p === 0 && touchHeld.has(a)); }
      };

      function toggleMute() { muted = !muted; lsSet(MUTE_KEY, muted ? "1" : "0"); paintMute(); SFX.tick(); }
      function paintMute() { muteBtn.textContent = muted ? "Sound: off" : "Sound: on"; }
      function setTwo(v) { two = v; one.classList.toggle("on", !v); duo.classList.toggle("on", v); overlay.classList.toggle("duo", v); renderMenu(); }

      function renderMenu() {
        menu.innerHTML = "";
        previews = [];
        Object.entries(GAMES).forEach(([id, g], i) => {
          const pv = el("canvas", { width: 220, height: 110 });
          const card = el("button", { type: "button", className: "arc-card", onclick: () => start(id) },
            pv,
            el("b", { textContent: g.name }),
            el("span", { textContent: g.blurb }),
            el("i", { textContent: two ? "2P " + g.two : (best[id] ? "Best " + best[id] : "No high score yet") }));
          card.style.setProperty("--c", g.color);
          card.style.animationDelay = i * 60 + "ms";
          menu.append(card);
          previews.push({ id, ctx: pv.getContext("2d") });
        });
      }
      // Small animated picture on each menu card.
      function drawPreview(p, t) {
        const c = p.ctx, col = GAMES[p.id].color;
        c.clearRect(0, 0, 220, 110);
        glow(c, col, 10); c.fillStyle = col;
        if (p.id === "tetris") {
          [[0, 5], [1, 5], [2, 5], [2, 4], [4, 5], [5, 5], [6, 5], [7, 5], [6, 4], [8, 5], [9, 5]].forEach(([x, y]) => c.fillRect(30 + x * 16, y * 16 + 8, 14, 14));
          const y = Math.floor((t * 4) % 4);
          [[3, 0], [3, 1], [3, 2], [4, 2]].forEach(([x, dy]) => c.fillRect(30 + x * 16, (y + dy) * 16 - 8, 14, 14));
        } else if (p.id === "snake") {
          for (let i = 0; i < 14; i++) box(c, 30 + i * 10, 55 + Math.sin(t * 4 + i * 0.55) * 18, 13, 13, 6, col);
          c.fillStyle = "#ff4d6d"; c.beginPath(); c.arc(194, 55 + Math.sin(t * 2) * 10, 7, 0, 7); c.fill();
        } else if (p.id === "cross") {
          for (let i = 0; i < 3; i++) box(c, ((t * (50 + i * 22) + i * 90) % 280) - 50, 18 + i * 30, 46, 18, 6, ["#ff4d6d", "#4d7cff", "#ff9a2e"][i]);
          box(c, 101, 84 - Math.abs(Math.sin(t * 4)) * 12, 18, 18, 6, col);
        } else if (p.id === "pong") {
          const x = 34 + Math.abs(((t * 100) % 300) - 150), y = 22 + Math.abs(((t * 63) % 132) - 66);
          box(c, 18, y - 18, 8, 36, 4, col); box(c, 194, y - 18, 8, 36, 4, "#ff4d9d");
          c.fillStyle = "#fff"; c.beginPath(); c.arc(x, y, 6, 0, 7); c.fill();
        } else {
          for (let i = 0; i < 18; i++) box(c, 27 + (i % 6) * 28, 12 + Math.floor(i / 6) * 14, 24, 10, 3, ["#ff4d9d", "#ffe44d", "#00e5ff"][Math.floor(i / 6)]);
          const x = 40 + Math.abs(((t * 90) % 280) - 140);
          box(c, x - 22, 96, 44, 8, 4, col); c.fillStyle = "#fff"; c.beginPath(); c.arc(x + 4, 62 + Math.abs(((t * 60) % 56) - 28), 5, 0, 7); c.fill();
        }
        c.shadowBlur = 0;
      }

      function showMenu() {
        mode = "menu"; game = null; current = null;
        title.textContent = "KAIRO ARCADE";
        overlay.classList.remove("playing");
        renderMenu();
      }
      function start(id) {
        current = id;
        fx = makeFx();
        io.fx = fx;
        game = GAMES[id].make(io);
        title.textContent = GAMES[id].name.toUpperCase();
        overlay.classList.add("playing");
        hintEl.textContent = game.hint;
        veil.className = "arc-veil";
        veil.innerHTML = "";
        pauseBtn.textContent = "Pause";
        mode = "count"; count = 2.1; countShown = 0; acc = 0;
        keys.clear(); touchHeld.clear();
        if (document.activeElement) document.activeElement.blur();
        overlay.focus();
        resize();
      }
      function resize() {
        if (!game) return;
        const maxW = Math.max(200, stage.clientWidth || window.innerWidth - 40);
        const reserved = window.matchMedia("(pointer: coarse)").matches ? 290 : 190;
        const maxH = Math.max(200, window.innerHeight - reserved);
        const s = Math.min(maxW / game.w, maxH / game.h, 1.6);
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        canvas.style.width = Math.floor(game.w * s) + "px";
        canvas.style.height = Math.floor(game.h * s) + "px";
        canvas.width = Math.floor(game.w * s * dpr);
        canvas.height = Math.floor(game.h * s * dpr);
        game.scale = s * dpr;
      }
      function card(heading, lines, buttons) {
        veil.innerHTML = "";
        const panel = el("div", { className: "arc-panel" }, el("h3", { textContent: heading }));
        lines.forEach((line) => line && panel.append(el("p", { textContent: line })));
        panel.append(el("div", { className: "arc-row" }, ...buttons.map(([text, fn]) => el("button", { type: "button", className: "arc-chip", textContent: text, onclick: fn }))));
        veil.append(panel);
        veil.className = "arc-veil show";
      }
      function togglePause() {
        if (mode === "paused") { mode = "play"; veil.className = "arc-veil"; veil.innerHTML = ""; pauseBtn.textContent = "Pause"; overlay.focus(); }
        else if (mode === "play" || mode === "count") {
          mode = "paused"; keys.clear(); pauseBtn.textContent = "Resume";
          card("PAUSED", ["Press P to carry on"], [["Resume", togglePause], ["Restart", () => start(current)], ["Games", showMenu]]);
        }
      }
      function finish(result) {
        mode = "over";
        let record = "";
        if (!two && typeof result.score === "number") {
          if (result.score > (best[current] || 0)) { best[current] = result.score; lsSet(BEST_KEY, JSON.stringify(best)); record = "★ New high score!"; SFX.big(); }
        }
        const over = veil;
        setTimeout(() => {
          if (mode !== "over" || veil !== over) return;
          card(result.title, [typeof result.score === "number" && !two ? "Score " + result.score : "", result.sub, record || (!two && best[current] ? "Best " + best[current] : "")], [["Play again", () => start(current)], ["Games", showMenu]]);
        }, 650);
      }

      function loop(now) {
        raf = requestAnimationFrame(loop);
        const dt = Math.min(0.05, (now - last) / 1000 || 0);
        last = now;
        if (mode === "menu") { previews.forEach((p) => drawPreview(p, reduceMotion() ? 1 : now / 1000)); return; }
        if (!game) return;
        if (mode === "count") {
          count -= dt;
          const n = Math.ceil(count / 0.7);
          if (n !== countShown && n > 0) { countShown = n; SFX.tick(); }
          if (count <= 0) { mode = "play"; SFX.go(); fx.text(game.w / 2, game.h / 2, "GO!", "#2ee88a"); }
        }
        // Fixed 60 steps a second, so games run at the same speed on every screen.
        if (mode !== "paused") {
          acc += dt;
          while (acc >= 1 / 60) {
            acc -= 1 / 60;
            if (mode === "play") { game.update(1 / 60); const r = game.result(); if (r) finish(r); }
            fx.update(1 / 60);
          }
        }
        const c = canvas.getContext("2d");
        c.setTransform(game.scale, 0, 0, game.scale, 0, 0);
        const [sx, sy] = fx.offset();
        c.save(); c.translate(sx, sy);
        game.draw(c);
        fx.draw(c);
        c.restore();
        if (mode === "count") {
          c.fillStyle = "rgba(5,6,11,0.55)"; c.fillRect(0, 0, game.w, game.h);
          const part = (count % 0.7) / 0.7;
          glow(c, "#00f2fe", 30); label(c, String(Math.max(1, countShown)), game.w / 2, game.h / 2, 60 + part * 24); c.shadowBlur = 0;
        }
        statusEl.textContent = game.status();
      }

      // While the arcade is open, keys go to the game and never to the chat behind it.
      function onDown(e) {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        e.stopPropagation();
        if (e.code === "Tab") return;
        if (e.code === "Escape") { e.preventDefault(); if (mode === "menu") closeArcade(); else showMenu(); return; }
        if (mode === "menu") return;
        if (e.target && e.target.tagName === "BUTTON" && (e.code === "Enter" || e.code === "Space")) return;
        e.preventDefault();
        keys.add(e.code);
        if (e.repeat) return;
        if (e.code === "KeyM") return toggleMute();
        if (e.code === "KeyP") return togglePause();
        if (mode === "over" && (e.code === "KeyR" || e.code === "Enter")) return start(current);
        if (mode === "play") {
          binds().forEach((map, p) => Object.keys(map).forEach((a) => { if (map[a].includes(e.code)) game.press(p, a); }));
        }
      }
      function onUp(e) { keys.delete(e.code); e.stopPropagation(); }
      function onHide() { keys.clear(); touchHeld.clear(); if (mode === "play" || mode === "count") togglePause(); }
      function onVisibility() { if (document.hidden) onHide(); }
      window.addEventListener("keydown", onDown, true);
      window.addEventListener("keyup", onUp, true);
      window.addEventListener("resize", resize);
      window.addEventListener("blur", onHide);
      document.addEventListener("visibilitychange", onVisibility);

      overlay.cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("keydown", onDown, true);
        window.removeEventListener("keyup", onUp, true);
        window.removeEventListener("resize", resize);
        window.removeEventListener("blur", onHide);
        document.removeEventListener("visibilitychange", onVisibility);
      };

      paintMute();
      setTwo(false);
      overlay.focus();
      raf = requestAnimationFrame(loop);
      if (startGame && GAMES[startGame]) start(startGame);
    }
    function closeArcade() {
      if (!overlay) return;
      overlay.cleanup();
      overlay.remove();
      overlay = null;
    }
    arcade = { open: openArcade, close: closeArcade };

    // 6. SIDEBAR BUTTON
    function mountSidebarBtn() {
      const actions = document.querySelector("#rc-root .sideActions");
      if (actions && !document.getElementById("arcadeSidebarBtn")) {
        const btn = el("button", { id: "arcadeSidebarBtn", type: "button", className: "quickAction", onclick: () => openArcade() },
          el("span", { className: "quickIcon", textContent: "🕹️" }), el("span", { className: "quickLabel", textContent: "Arcade Hub" }));
        actions.appendChild(btn);
      }
    }
    mountSidebarBtn();
    timers.push(setInterval(mountSidebarBtn, 1000));
  })();
// =========================================================================
  // KAIRO UI POLISH: MATCHED '+' BUTTON, TOP PROGRESS LINE & CENTERED BOOT
  // =========================================================================
  (() => {
    // 1. INJECT REFINED STYLES
    const styleEl = document.createElement("style");
    styleEl.id = "kairo-ui-refinements";
    styleEl.textContent = `
      /* --- FIXED BALANCED BOOT SCREEN --- */
      #kairo-boot-curtain {
        position: fixed !important;
        inset: 0 !important;
        z-index: 999999 !important;
        background: radial-gradient(circle at 50% 50%, #151821 0%, #06070a 100%) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        margin: 0 !important;
        padding: 24px !important;
        box-sizing: border-box !important;
        transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) !important;
      }
      #kairo-boot-curtain.loaded {
        opacity: 0 !important;
        transform: scale(1.05) !important;
        pointer-events: none !important;
      }
      .boot-barrier-card {
        margin: auto !important;
        width: 100% !important;
        max-width: 380px !important;
        padding: 40px !important;
        box-sizing: border-box !important;
      }

      /* --- TOP BORDER PROGRESS BAR & PILL --- */
      #kairo-upload-progress-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 3px;
        background: transparent;
        z-index: 2147483647;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      #kairo-upload-progress-container.active {
        opacity: 1;
      }
      #kairo-upload-progress-bar {
        width: 0%;
        height: 100%;
        background: linear-gradient(90deg, #00f2fe, #5865f2);
        box-shadow: 0 0 10px #00f2fe, 0 0 20px #5865f2;
        transition: width 0.15s cubic-bezier(0.16, 1, 0.3, 1);
      }
      #kairo-upload-progress-pill {
        position: fixed;
        top: 10px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        background: rgba(15, 18, 26, 0.92);
        border: 1px solid rgba(88, 101, 242, 0.4);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6), 0 0 14px rgba(0, 242, 254, 0.3);
        backdrop-filter: blur(10px);
        border-radius: 999px;
        padding: 4px 14px;
        font-family: var(--font-arc, sans-serif);
        font-size: 0.72rem;
        font-weight: 700;
        color: #00f2fe;
        display: flex;
        align-items: center;
        gap: 8px;
        opacity: 0;
        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 2147483647;
      }
      #kairo-upload-progress-pill.active {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }

      /* --- MATCHING RECTANGULAR COMPOSER ATTACH BUTTON --- */
      #kairoAttachBtn {
        width: 36px !important;
        height: 36px !important;
        min-width: 36px !important;
        border-radius: 10px !important;
        background: rgba(255, 255, 255, 0.05) !important;
        border: 1px solid rgba(255, 255, 255, 0.08) !important;
        color: #8e95a2 !important;
        display: grid !important;
        place-items: center !important;
        cursor: pointer !important;
        padding: 0 !important;
        margin: 0 4px !important;
        transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1) !important;
      }
      #kairoAttachBtn:hover {
        background: rgba(255, 255, 255, 0.1) !important;
        color: #ffffff !important;
        border-color: rgba(255, 255, 255, 0.2) !important;
        transform: translateY(-1px) !important;
      }
      #kairoAttachBtn:active {
        transform: scale(0.95) !important;
      }
      #kairoAttachBtn svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
      }
    `;
    document.head.appendChild(styleEl);

    // 2. CREATE PROGRESS BAR DOM ELEMENTS
    let progressContainer = document.getElementById("kairo-upload-progress-container");
    if (!progressContainer) {
      progressContainer = document.createElement("div");
      progressContainer.id = "kairo-upload-progress-container";
      progressContainer.innerHTML = `<div id="kairo-upload-progress-bar"></div>`;
      document.body.appendChild(progressContainer);
    }
    const progressBar = progressContainer.querySelector("#kairo-upload-progress-bar");

    let progressPill = document.getElementById("kairo-upload-progress-pill");
    if (!progressPill) {
      progressPill = document.createElement("div");
      progressPill.id = "kairo-upload-progress-pill";
      progressPill.innerHTML = `<span>Uploading:</span><b id="kairo-progress-text">0%</b>`;
      document.body.appendChild(progressPill);
    }
    const progressText = progressPill.querySelector("#kairo-progress-text");

    function setUploadProgress(percent) {
      if (percent > 0 && percent < 100) {
        progressContainer.classList.add("active");
        progressPill.classList.add("active");
        progressBar.style.width = `${percent}%`;
        progressText.textContent = `${Math.round(percent)}%`;
      } else {
        progressBar.style.width = "100%";
        progressText.textContent = "100%";
        setTimeout(() => {
          progressContainer.classList.remove("active");
          progressPill.classList.remove("active");
          setTimeout(() => { progressBar.style.width = "0%"; }, 300);
        }, 600);
      }
    }

// 3. ENCRYPTED FILE SHARING + '+' BUTTON
let uploading = false;

const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.style.display = "none";
root.appendChild(fileInput);

function xhrUpload(url, file) {
  return new Promise((resolve, reject) => {
    const fd = new FormData();
    fd.append("file", file, file.name);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) setUploadProgress((e.loaded / e.total) * 100);
    };
    xhr.onload = () => {
      let j = null;
      try { j = JSON.parse(xhr.responseText); } catch {}
      if (xhr.status < 300 && j && j.status === "ok" && j.data) resolve(j.data);
      else reject(new Error((j && j.status) || "HTTP " + xhr.status));
    };
    xhr.onerror = () => reject(new Error("network or CORS blocked"));
    xhr.send(fd);
  });
}

// The file is encrypted here, so Gofile only receives a locked copy with a random name.
async function uploadBig(file) {
  if (!file) return;
  if (uploading) return toast("Wait for the current upload to finish.");
  if (file.size > MAX_FILE) return toast("Files can be up to 100 MB.");
  const topic = activeTopic, r = rooms.get(topic), session = vaultKey;
  if (!r || !r.key || !session) return toast("Open a chat first.");
  if (!confirm('Send "' + file.name + '" to ' + r.meta.title + "?\n\nIt will be encrypted before upload. Gofile can still see its size and your IP address. Anyone who can read this chat can unlock it.")) return;
  const stillOpen = () => vaultKey === session && rooms.get(topic) === r && !!r.key && root.isConnected;

  uploading = true;
  try {
    toast("Encrypting file...", 4000);
    const raw = crypto.getRandomValues(new Uint8Array(32));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const locked = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await aesKey(raw), await file.arrayBuffer());
    if (!stillOpen()) throw new Error("the chat was closed or locked");
    const blob = new File([locked], rnd() + ".kairo", { type: "application/octet-stream" });
    setUploadProgress(1);

    const urls = ["https://upload.gofile.io/uploadfile"];
    let data = null, lastErr = null;
    for (const u of urls) {
      try { data = await xhrUpload(u, blob); break; }
      catch (e) { lastErr = e; }
    }
    if (!data) throw lastErr || new Error("upload failed");
    if (!stillOpen()) throw new Error("the chat was closed or locked");
    const info = safeFile({ url: data.downloadPage, key: toB64(raw), iv: toB64(iv), name: file.name, size: file.size });
    if (!info) throw new Error("Gofile returned an unexpected link");
    await sendFileMessage(r, info);
  } catch (e) {
    toast("File not sent: " + (e && e.message ? e.message : "unknown error"), 5000);
  } finally {
    uploading = false;
    setUploadProgress(100);
  }
}
// Sends to the chat the upload started in, without touching anything you're typing.
async function sendFileMessage(r, info) {
  const id = rnd();
  const rec = { id, who: me.name, authorId: me.id, text: "", file: info, mine: true, read: false, time: Date.now(), reactions: {} };
  r.seen.add(id);
  r.store.msgs.push(rec);
  persistRoom(r);
  if (r.meta.topic === activeTopic) renderChatLog(true);
  try { await post(r, "m", { id, text: "", file: info }); markSent(r, rec, true); }
  catch (e) { markSent(r, rec, false); throw e; }
}

fileInput.onchange = () => {
  if (fileInput.files.length) uploadBig(fileInput.files[0]);
  fileInput.value = "";
};
const hasFiles = (e) => e.dataTransfer && Array.from(e.dataTransfer.types).includes("Files");
root.addEventListener("dragover", (e) => { if (hasFiles(e)) e.preventDefault(); });
root.addEventListener("drop", (e) => {
  if (!hasFiles(e)) return;
  e.preventDefault();
  uploadBig(e.dataTransfer.files[0]);
});

function mountComposerBtn() {
  const composer = document.querySelector("#rc-root .composer");
  if (!composer || document.getElementById("kairoAttachBtn")) return;
  const attachBtn = document.createElement("button");
  attachBtn.id = "kairoAttachBtn";
  attachBtn.type = "button";
  attachBtn.title = "Send an encrypted file (up to 100 MB)";
  attachBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"/></svg>';
  attachBtn.onclick = () => fileInput.click();
  const msgInput = document.getElementById("msg");
  if (msgInput) composer.insertBefore(attachBtn, msgInput);
  else composer.prepend(attachBtn);
}
timers.push(setInterval(mountComposerBtn, 1000));
})();
})();