// Kairo v1.6.4 (Custom Studio Explicit Text Picker)
// Paste into your browser console or update kairo.js

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
const LS = "roomchat:v2:";
const EMOJIS = ["👍", "❤️", "😂", "🔥", "👀"];
const origTitle = document.title;

const CLOAK_PRESETS = {
  kairo: { title: "Kairo", icon: "" },
  drive: { title: "My Drive - Google Drive", icon: "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png" },
  docs: { title: "Google Docs", icon: "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico" },
  classroom: { title: "Home - Google Classroom", icon: "https://ssl.gstatic.com/classroom/favicon.png" },
  canvas: { title: "Dashboard - Canvas", icon: "https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico" }
};

let vaultKey = null;
let currentSessionPassword = "";
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
      sub.textContent = "Private Relay (Zero Limits)";
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

function applyCloak(key) {
  settings.cloak = key || "kairo";
  if (settings.cloak === "kairo") {
    document.title = "Kairo";
    const totalUnread = Array.from(rooms.values()).reduce((sum, r) => sum + (r.unread || 0), 0);
    setKairoFavicon(totalUnread > 0);
    return;
  }
  const p = CLOAK_PRESETS[settings.cloak] || CLOAK_PRESETS.kairo;
  document.title = p.title;
  document.querySelectorAll("link[rel*='icon']").forEach((e) => e.remove());
  if (p.icon) {
    const l = document.createElement("link");
    l.rel = "icon";
    l.href = p.icon;
    document.head.appendChild(l);
  }
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
  if (settings.cloak === "kairo") {
    setKairoFavicon(totalUnread > 0);
    document.title = totalUnread > 0 ? "(" + totalUnread + ") Kairo" : "Kairo";
    return;
  }
  if (!settings.titleAlert) { document.title = origTitle; return; }
  document.title = totalUnread > 0 ? "(" + totalUnread + ") " + (CLOAK_PRESETS[settings.cloak] || {}).title : (CLOAK_PRESETS[settings.cloak] || {}).title || origTitle;
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
async function deriveKey(room, pw) {
  const base = await crypto.subtle.importKey("raw", te.encode(pw + "|" + room), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: te.encode("kairo-v2|" + room), iterations: 120000, hash: "SHA-256" },
    base,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}
async function topicFor(room, pw) {
  return "kairo_" + (await sha256Hex("topic|" + room + "|" + pw)).slice(0, 32);
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

async function getCloudVaultTopic(userKey, password) {
  return "kairo_vlt_" + (await sha256Hex("cloud_vault|" + sanitizeKey(userKey) + "|" + password)).slice(0, 24);
}

async function syncVaultToCloud(password) {
  if (!vaultKey || !me.userKey || !password) return;
  try {
    const topic = await getCloudVaultTopic(me.userKey, password);
    const rawVault = lsGet(LS + "vault_data");
    if (!rawVault) return;
    await fetch(SERVER + "/" + topic, {
      method: "POST",
      body: rawVault,
      headers: { "Title": "Vault Backup", "Tags": "lock" }
    });
  } catch (err) {
    console.warn("[Kairo] Cloud backup failed:", err);
  }
}

async function fetchVaultFromCloud(userKey, password) {
  try {
    const topic = await getCloudVaultTopic(userKey, password);
    const resp = await fetch(SERVER + "/" + topic + "/json?poll=1&since=all");
    if (!resp.ok) return null;
    const text = (await resp.text()).trim();
    if (!text) return null;
    const lines = text.split("\n").filter(Boolean);
    for (let i = lines.length - 1; i >= 0; i--) {
      try {
        const parsed = JSON.parse(lines[i]);
        if (parsed.message) return parsed.message;
      } catch {}
    }
  } catch {}
  return null;
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
    lsSet(LS + "vault_data", enc);
    if (currentSessionPassword) {
      syncVaultToCloud(currentSessionPassword);
    }
  } catch {}
}

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
  lsSet(LS + "vault_data", raw.trim());
  toast("Vault imported. Enter your Master Password to unlock.");
  promptVaultLogin();
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
  const rawVault = lsGet(LS + "vault_data");
  const lastKey = lsGet(LS + "last_key") || "";

  if (rawVault || lastKey) {
    const box = el("form", { className: "modal" });
    box.append(
      el("div", { className: "modalHeader" },
        el("div", { className: "modalBadge", textContent: "k." }),
        el("div", {},
          el("h2", { textContent: "Unlock Kairo Vault" }),
          el("p", { textContent: "Zero-knowledge session restore" })
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
      let currentVault = lsGet(LS + "vault_data");

      if (!currentVault) {
        err.textContent = "Fetching backup from Render relay...";
        currentVault = await fetchVaultFromCloud(uKey, pw);
        if (currentVault) lsSet(LS + "vault_data", currentVault);
      }

      if (!currentVault) {
        err.textContent = "No vault found locally or on the relay for @" + uKey;
        unlockBtn.disabled = false;
        return;
      }

      try {
        const k = await deriveKey("kairo-master-vault", pw);
        const data = await unseal(k, currentVault);
        vaultKey = k;
        currentSessionPassword = pw;
        lsSet(LS + "last_key", uKey);

        Object.assign(me, data.me || {});
        if (!me.userKey) me.userKey = uKey;
        Object.assign(settings, data.settings || {});
        applyTheme(settings.theme);
        applyCloak(settings.cloak);
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
      el("p", { textContent: "Set a unique User Key (lowercase handle) and Master Password. Your vault syncs encrypted snapshots to Render automatically." })
    );
    const keyInp = el("input", { type: "text", placeholder: "Permanent Key (e.g. arvi, user_1)", maxLength: 20 });
    const nameInp = el("input", { type: "text", placeholder: "Display Name (e.g. Arvi)", maxLength: 20 });
    const avInp = el("input", { type: "text", placeholder: "Avatar Initials (e.g. AR)", maxLength: 4 });
    const bioInp = el("input", { type: "text", placeholder: "Status bio (optional)", maxLength: 50 });
    const pwInp = el("input", { type: "password", placeholder: "Create Master Password (4+ chars)", maxLength: 80 });
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
      if (pw.length < 4) { err.textContent = "Use a Master Password with at least 4 characters."; return; }
      createBtn.disabled = true;
      try {
        vaultKey = await deriveKey("kairo-master-vault", pw);
        currentSessionPassword = pw;
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
  vaultKey = null;
  currentSessionPassword = "";
  if (peerConn) endCall();
  if (es) { es.close(); es = null; esKey = ""; }
  rooms.forEach((r) => { r.key = null; r.ready = false; });
  activeTopic = null;
  setRelayState("paused");
  setStatus("vault locked");
  renderWelcome();
  promptVaultLogin();
}

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
    el("p", { textContent: "Customize your theme, pick custom colors, and set your disguise." }),
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

  const cloakSel = el("select", {},
    el("option", { value: "kairo", textContent: "Default (Kairo Signature k.)" }),
    el("option", { value: "drive", textContent: "Google Drive" }),
    el("option", { value: "docs", textContent: "Google Docs" }),
    el("option", { value: "classroom", textContent: "Google Classroom" }),
    el("option", { value: "canvas", textContent: "Canvas LMS" })
  );
  cloakSel.value = settings.cloak || "kairo";
  cloakSel.onchange = () => applyCloak(cloakSel.value);

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
    el("h3", { textContent: "Tab Cloaking (Stealth Disguise)" }), cloakSel,
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
    applyCloak(cloakSel.value);
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
        el("p", { textContent: "AES-GCM-256 with Zero-Knowledge Local Derivation" })
      )
    ),
    el("p", { textContent: "Your vault is encrypted directly in browser memory using AES-256-GCM. Your Master Password is used with PBKDF2 (120,000 iterations) to derive your private key." }),
    el("h3", { textContent: "Security Safeguards" }),
    el("ol", {},
      el("li", { textContent: "Your password is never sent to the Render relay or stored in plaintext." }),
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
    el("p", { textContent: "Kairo routes encrypted packets through an ephemeral Render relay (" + SERVER.replace("https://", "") + ") without logging conversation metadata or message text." }),
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
        el("p", { textContent: "Zero-Knowledge Per-Room Key Derivation" })
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

function persistRoom(r) { lsSet(LS + "t:" + r.meta.topic, JSON.stringify(r.store)); }
function getDraft(topic) { return lsGet(LS + "draft:" + topic) || ""; }
function setDraft(topic, val) {
  if (!val) lsDel(LS + "draft:" + topic);
  else lsSet(LS + "draft:" + topic, val);
}
function makeRoom(meta) {
  let store = { msgs: [], lastSrv: 0, pinned: null };
  try { store = Object.assign(store, JSON.parse(lsGet(LS + "t:" + meta.topic) || "{}")); } catch {}
  return {
    meta, key: null, store,
    seen: new Set(store.msgs.map((m) => m.id)),
    people: new Map(), unread: 0, ready: false, helloSent: false,
    typing: new Map()
  };
}

async function post(r, kind, extra) {
  if ((kind === "h" || kind === "p") && me.status === "invisible") return;
  const m = Object.assign({
    i: me.id,
    uk: me.userKey || me.name,
    k: kind,
    name: me.name,
    av: me.avatar || "",
    avi: me.avatarImg || null,
    bio: me.bio || "",
    st: me.status || "online",
    t: Date.now()
  }, extra || {});
  const body = await seal(r.key, m);
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

  host.innerHTML = "";

  const panel = el("div", { id: "callPanel", className: "callPanel" });
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
  if (peerConn) endCall();
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
      post(r, "rtc_candidate", { candidate: e.candidate }).catch(() => {});
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
  if (!r || !r.key) return;
  try {
    isCaller = true;
    isMuted = false;
    isDeafened = false;
    callState = "calling";
    await initCallPeer(r);
    renderCallPanel();
    const offer = await peerConn.createOffer();
    await peerConn.setLocalDescription(offer);
    await post(r, "rtc_offer", { sdp: offer });
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
  playNotifSound();
  activeCallTopic = r.meta.topic;
  callState = "incoming";
  pendingIncomingOffer = sdp;
  renderCallPanel();
}

async function acceptIncomingCall() {
  const r = rooms.get(activeCallTopic);
  if (!r || !pendingIncomingOffer) return;
  try {
    isCaller = false;
    isMuted = false;
    isDeafened = false;
    await initCallPeer(r);
    await peerConn.setRemoteDescription(new RTCSessionDescription(pendingIncomingOffer));
    const answer = await peerConn.createAnswer();
    await peerConn.setLocalDescription(answer);
    await post(r, "rtc_answer", { sdp: answer });
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

function endCall(msg) {
  if (activeCallTopic) {
    const r = rooms.get(activeCallTopic);
    if (r && r.key) post(r, "rtc_hangup", { reason: msg || "Call ended" }).catch(() => {});
  }
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
      if (tk.val.toLowerCase().match(/\.(gif)(\?.*)?$/i)) {
        frag.append(el("img", { src: tk.val, className: "chatImg", loading: "lazy", onclick: () => openLightbox(tk.val) }));
      } else {
        frag.append(el("a", { href: tk.val, target: "_blank", rel: "noopener noreferrer", className: "chatLink", textContent: tk.val }));
      }
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
      title: m.read ? "Read by peer" : "Delivered",
      textContent: m.read ? "✓✓" : "✓"
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
      actions.append(el("button", { type: "button", className: "actBtn", title: "Block " + who, textContent: "🚫", onclick: () => toggleBlockUser(who) }));
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
        ? "Direct message with @" + r.meta.title + ". End-to-end encrypted, zero rate limits."
        : "Group “" + r.meta.title + "”. End-to-end encrypted, zero rate limits."
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
    textContent: relayStatusState === "connected" ? "Private Relay (Zero Limits)" : activeRelayPun
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

  r.people.set(m.i, {
    name: who,
    av: String(m.av || "").slice(0, 4),
    avi: m.avi || null,
    bio: String(m.bio || "").slice(0, 50),
    st: String(m.st || "online"),
    last: Date.now()
  });

  if (m.k === "rtc_offer" && m.sdp) {
    promptIncomingCall(r, who, m.sdp);
    return;
  }
  if (m.k === "rtc_answer" && m.sdp && peerConn && isCaller) {
    await peerConn.setRemoteDescription(new RTCSessionDescription(m.sdp));
    callState = "connected";
    renderCallPanel();
    startCallDuration();
    return;
  }
  if (m.k === "rtc_candidate" && m.candidate && peerConn) {
    try { await peerConn.addIceCandidate(new RTCIceCandidate(m.candidate)); } catch {}
    return;
  }
  if (m.k === "rtc_hangup") {
    toast((m.reason || "Call ended") + " by " + who);
    endCall(m.reason || "Call ended");
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
    if (!m.id || r.seen.has(m.id)) return;
    r.seen.add(m.id);
    const rec = {
      id: m.id,
      who,
      authorId: m.i,
      av: String(m.av || "").slice(0, 4),
      avi: m.avi || null,
      text: m.text ? String(m.text).slice(0, MAX_TEXT) : "",
      img: m.img || null,
      audio: m.audio || null,
      mine: false,
      read: false,
      seenByMe: isActive,
      time: m.t || Date.now(),
      replyTo: m.replyTo || null,
      depth: m.depth || 0,
      fx: m.fx || null,
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
    applyReaction(r, m.targetId, String(m.emoji).slice(0, 8), who);
    return;
  }
  if (m.k === "pin") {
    r.store.pinned = m.pinPayload || null;
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
  const k = open.length ? open.map((r) => r.meta.topic).join(",") : "kairo_hb_" + (me.userKey || "guest");
  
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
    setStatus("connected · zero limits", "ok");
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
    el("h2", { textContent: "Kairo v1.6.4 Guide", style: "margin-bottom:8px" }),
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
    el("p", { textContent: "Permanent User Key: @" + (me.userKey || me.name) + ". Changes sync to your cloud vault automatically." })
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
  if (pw.length < 4) throw new Error("Use a password with at least 4 characters.");
  let room, title;
  if (type === "dm") {
    title = label.slice(0, 20);
    room = "dm|" + [sanitizeKey(me.userKey || me.name), label].sort().join("|");
  } else {
    title = label.slice(0, 40);
    room = "group|" + label;
  }
  const topic = await topicFor(room, pw);
  let r = rooms.get(topic);
  if (!r && rooms.size >= MAX_CHATS) throw new Error("Maximum " + MAX_CHATS + " chats reached. Delete one first.");
  const key = await deriveKey(room, pw);
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
  modal("New Direct Message",
    "Enter their lowercase User Key (e.g. bob) and your shared secret.",
    [{ id: "f", label: "Their User Key (@handle)", max: 20 }, { id: "p", label: "Shared password", type: "password" }], "Start DM",
    (v) => createChat("dm", v.f, v.p));
}
function startGroup() {
  if (!vaultKey) return promptVaultLogin();
  modal("New or Existing Group",
    "Pick a group ID, optional group tag, and shared password.",
    [
      { id: "f", label: "Group ID", max: 40 },
      { id: "i", label: "Group Avatar Tag (optional)", max: 4 },
      { id: "p", label: "Group password", type: "password" }
    ], "Create / Join",
    (v) => createChat("group", v.f, v.p, v.i));
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
  } catch (err) {
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
  } catch (err) {
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
  rooms.delete(r.meta.topic);
  lsDel(LS + "t:" + r.meta.topic);
  lsDel(LS + "draft:" + r.meta.topic);
  await saveVault();
  resubscribe();
  renderWelcome();
};

$("themeBtn").onclick = showThemeSettings;
$("eeSettingsBtn").onclick = showEasterEggSettings;
$("cloudSyncBtn").onclick = () => {
  if (!currentSessionPassword) return toast("Unlock your vault first.");
  syncVaultToCloud(currentSessionPassword);
  toast("Vault backed up to cloud!");
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
      el("h2", { textContent: "Kairo Release Notes (v1.6.4)" }),
      el("p", { textContent: "Zero-knowledge chat with encrypted vaults, reactive relays, and WebRTC calls." }),
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
window.addEventListener("keydown", onKeyDown);
root.addEventListener("click", () => {
  root.querySelectorAll(".emojiPicker").forEach((p) => p.remove());
});

$("exit").onclick = () => {
  document.title = origTitle;
  if (document.body) document.body.style.overflow = origBodyOverflow;
  if (document.documentElement) document.documentElement.style.overflow = origHtmlOverflow;
  if (peerConn) endCall();
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

      /* --- CINEMATIC 3D ARCADE ENTRANCE --- */
      #kairo-arcade-portal {
        position: fixed;
        inset: 0;
        z-index: 2147483640;
        background: #020204;
        display: flex;
        align-items: center;
        justify-content: center;
        perspective: 1200px;
        overflow: hidden;
        transition: opacity 0.4s ease;
      }
      .arcade-room-scene {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transform-style: preserve-3d;
        transition: transform 1.5s cubic-bezier(0.7, 0, 0.2, 1), filter 1.4s ease;
      }
      .arcade-room-scene.zooming {
        transform: translateZ(920px) translateY(80px);
        filter: blur(4px);
      }
      .cabinet-shell {
        width: 320px; height: 500px;
        background: linear-gradient(180deg, #181920 0%, #0d0e12 100%);
        border-radius: 28px 28px 10px 10px;
        border: 4px solid #2d303d;
        box-shadow: 0 0 100px rgba(0, 242, 254, 0.15), 0 40px 120px rgba(0, 0, 0, 0.95);
        display: flex; flex-direction: column; align-items: center; padding: 20px;
      }
      .cabinet-marquee {
        width: 100%; height: 54px; background: #08090d; border: 2px solid #3d4255;
        border-radius: 12px; display: flex; align-items: center; justify-content: center;
        font-family: var(--font-arc); font-size: 0.9rem; font-weight: 900; color: #fff;
        letter-spacing: 0.15em; text-shadow: 0 0 12px var(--arc-cyan);
      }
      .cabinet-screen-bezel {
        width: 100%; height: 260px; background: #000; margin-top: 16px;
        border-radius: 16px; border: 4px solid #1f212a; padding: 10px; box-sizing: border-box;
      }
      .cabinet-crt-preview {
        width: 100%; height: 100%; background: #07090e; border-radius: 8px;
        display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;
      }
      .cabinet-crt-preview::after {
        content: ""; position: absolute; inset: 0;
        background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.3) 50%);
        background-size: 100% 3px; pointer-events: none;
      }
      .attract-mode-logo {
        font-family: var(--font-arc); font-size: 1.3rem; font-weight: 900;
        color: var(--arc-cyan); text-shadow: 0 0 18px var(--arc-cyan);
        animation: attractPulse 1.8s ease-in-out infinite alternate;
      }
      @keyframes attractPulse {
        from { transform: scale(0.95); opacity: 0.85; }
        to { transform: scale(1.05); opacity: 1; text-shadow: 0 0 26px var(--arc-cyan), 0 0 35px var(--arc-neon); }
      }
      .cabinet-controls { width: 100%; margin-top: 24px; display: flex; justify-content: space-around; align-items: center; }
      .cabinet-joystick { width: 22px; height: 22px; background: #ff0055; border-radius: 50%; box-shadow: 0 8px 0 #88002e; }
      .cabinet-btn-cluster { display: flex; gap: 8px; }
      .cabinet-btn { width: 18px; height: 18px; border-radius: 50%; }

      /* --- OVERHAULED UNBOUNDED ARCADE MODAL --- */
      #kairo-arcade-modal {
        position: fixed;
        inset: 0;
        z-index: 2147483647 !important;
        background: rgba(4, 5, 8, 0.92);
        backdrop-filter: blur(16px);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--font-arc);
        color: #fff;
      }
      .arcade-workstation {
        background: #0d0f15;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 24px;
        padding: 24px 28px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 14px;
        box-shadow: 0 40px 100px rgba(0,0,0,0.9), 0 0 40px rgba(88, 101, 242, 0.18);
        max-width: 95vw;
        animation: arcAppear 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      }
      @keyframes arcAppear {
        from { transform: scale(0.94); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      .arcade-nav-header { width: 100%; display: flex; justify-content: space-between; align-items: center; }
      .arcade-brand-tag {
        font-family: var(--font-arc); font-size: 1.05rem; font-weight: 800; letter-spacing: -0.02em;
      }
      .arcade-close-btn {
        background: #181a24; border: 1px solid rgba(255,255,255,0.08); color: #8e95a2;
        width: 32px; height: 32px; border-radius: 8px; cursor: pointer; font-size: 18px;
        display: grid; place-items: center; transition: all 0.18s ease;
      }
      .arcade-close-btn:hover { background: #ef4444; color: #fff; transform: scale(1.08); }
      .arcade-tab-strip { display: flex; gap: 6px; background: #151720; padding: 4px; border-radius: 12px; }
      .arcade-tab-btn {
        background: transparent; border: 0; color: #8e95a2; font-family: var(--font-arc);
        font-size: 0.7rem; font-weight: 700; padding: 7px 12px; border-radius: 8px; cursor: pointer;
        transition: all 0.18s ease;
      }
      .arcade-tab-btn:hover { color: #fff; transform: translateY(-1px); }
      .arcade-tab-btn.active { background: var(--arc-neon); color: #fff; box-shadow: 0 4px 14px rgba(88, 101, 242, 0.4); }
      .arcade-mode-toggle { display: flex; gap: 8px; align-items: center; font-size: 0.68rem; font-weight: 700; }
      .arcade-mode-btn {
        background: #1a1c24; border: 1px solid rgba(255,255,255,0.08); color: #8e95a2;
        font-family: var(--font-arc); font-size: 0.65rem; font-weight: 700; padding: 5px 10px;
        border-radius: 6px; cursor: pointer; transition: all 0.18s ease;
      }
      .arcade-mode-btn.active {
        border-color: #22c55e; color: #22c55e; background: rgba(34, 197, 94, 0.12);
      }
      .arcade-viewport {
        position: relative; border-radius: 16px; overflow: hidden;
        border: 2px solid #20232e; box-shadow: inset 0 0 25px rgba(0,0,0,0.9);
      }
      .arcade-viewport::after {
        content: ""; position: absolute; inset: 0;
        background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%);
        background-size: 100% 3px; pointer-events: none; z-index: 2;
      }
      #arcadeCanvas { background: #040508; display: block; }
      .arcade-status-bar {
        width: 100%; display: flex; justify-content: space-between; align-items: center;
        font-family: var(--font-arc); font-size: 0.72rem; color: #8e95a2;
      }
      .arcade-status-bar b { color: #fff; }
      .arcade-key-hints { font-size: 0.62rem; color: #636b7b; }
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
          <span>ZERO LOGGING ACTIVE</span>
          <span>STAND CLEAR</span>
        </div>
      `;
      appShell.appendChild(curtain);
      setTimeout(() => {
        curtain.classList.add("loaded");
        setTimeout(() => curtain.remove(), 700);
      }, 5000);
    }

    // 4. PERSISTENT SIDEBAR INJECTION
    function mountSidebarBtn() {
      const actions = document.querySelector("#rc-root .sideActions");
      if (actions && !document.getElementById("arcadeSidebarBtn")) {
        const btn = document.createElement("button");
        btn.id = "arcadeSidebarBtn";
        btn.className = "quickAction";
        btn.style.fontFamily = "var(--font-arc)";
        btn.innerHTML = `<span class="quickIcon">🕹️</span><span class="quickLabel">Arcade Hub</span>`;
        btn.onclick = () => window.triggerArcadeCinematic("tetris");
        actions.appendChild(btn);
      }
    }
    setInterval(mountSidebarBtn, 1000);

    // 5. 3D CABINET ZOOM TRANSITION
    window.triggerArcadeCinematic = function(game = "tetris") {
      if (document.getElementById("kairo-arcade-portal")) return;

      const portal = document.createElement("div");
      portal.id = "kairo-arcade-portal";
      portal.innerHTML = `
        <div class="arcade-room-scene">
          <div class="cabinet-shell">
            <div class="cabinet-marquee">KAIRO ARCADE</div>
            <div class="cabinet-screen-bezel">
              <div class="cabinet-crt-preview">
                <div class="attract-mode-logo">${game.toUpperCase()}</div>
              </div>
            </div>
            <div class="cabinet-controls">
              <div class="cabinet-joystick"></div>
              <div class="cabinet-btn-cluster">
                <div class="cabinet-btn" style="background:#00f2fe;"></div>
                <div class="cabinet-btn" style="background:#facc15;"></div>
                <div class="cabinet-btn" style="background:#a855f7;"></div>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(portal);

      const scene = portal.querySelector(".arcade-room-scene");
      requestAnimationFrame(() => {
        setTimeout(() => scene.classList.add("zooming"), 60);
      });

      setTimeout(() => {
        portal.style.opacity = "0";
        window.openArcadeModal(game);
        setTimeout(() => portal.remove(), 400);
      }, 1400);
    };

    // 6. MASTER ARCADE MODAL
    window.openArcadeModal = function(defaultGame = "tetris") {
      const existing = document.getElementById("kairo-arcade-modal");
      if (existing) existing.remove();

      let currentGame = defaultGame;
      let is2P = false;
      let cleanupGame = null;

      const modal = document.createElement("div");
      modal.id = "kairo-arcade-modal";
      modal.innerHTML = `
        <div class="arcade-workstation">
          <div class="arcade-nav-header">
            <div class="arcade-brand-tag">🕹️ KAIRO ARCADE</div>
            <button id="closeArcadeBtn" class="arcade-close-btn">&times;</button>
          </div>

          <div style="display:flex; justify-content:space-between; width:100%; align-items:center;">
            <div class="arcade-tab-strip">
              <button class="arcade-tab-btn ${currentGame === 'tetris' ? 'active' : ''}" data-game="tetris">Tetris</button>
              <button class="arcade-tab-btn ${currentGame === 'snake' ? 'active' : ''}" data-game="snake">Snake</button>
              <button class="arcade-tab-btn ${currentGame === 'cross' ? 'active' : ''}" data-game="cross">Road Cross</button>
              <button class="arcade-tab-btn ${currentGame === 'pong' ? 'active' : ''}" data-game="pong">Pong</button>
            </div>

            <div class="arcade-mode-toggle">
              <button id="mode1P" class="arcade-mode-btn active">1P Solo</button>
              <button id="mode2P" class="arcade-mode-btn">2P Versus</button>
            </div>
          </div>

          <div class="arcade-viewport">
            <canvas id="arcadeCanvas" width="400" height="400"></canvas>
          </div>

          <div class="arcade-status-bar">
            <div id="arcadeScore">Score: <b>0</b></div>
            <div id="arcadeHint" class="arcade-key-hints">Arrow Keys to play</div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      const canvas = modal.querySelector("#arcadeCanvas");
      const ctx = canvas.getContext("2d");
      const scoreEl = modal.querySelector("#arcadeScore");
      const hintEl = modal.querySelector("#arcadeHint");

      modal.querySelectorAll(".arcade-tab-btn").forEach(tab => {
        tab.onclick = () => {
          modal.querySelectorAll(".arcade-tab-btn").forEach(t => t.classList.remove("active"));
          tab.classList.add("active");
          currentGame = tab.getAttribute("data-game");
          bootGame();
        };
      });

      const btn1P = modal.querySelector("#mode1P");
      const btn2P = modal.querySelector("#mode2P");
      btn1P.onclick = () => {
        is2P = false;
        btn1P.classList.add("active");
        btn2P.classList.remove("active");
        bootGame();
      };
      btn2P.onclick = () => {
        is2P = true;
        btn2P.classList.add("active");
        btn1P.classList.remove("active");
        bootGame();
      };

      function bootGame() {
        if (cleanupGame) cleanupGame();
        if (currentGame === "tetris") cleanupGame = playTetris(ctx, canvas, scoreEl, hintEl, is2P);
        else if (currentGame === "snake") cleanupGame = playSnake(ctx, canvas, scoreEl, hintEl, is2P);
        else if (currentGame === "cross") cleanupGame = playCross(ctx, canvas, scoreEl, hintEl, is2P);
        else if (currentGame === "pong") cleanupGame = playPong(ctx, canvas, scoreEl, hintEl, is2P);
      }

      function exit() {
        if (cleanupGame) cleanupGame();
        modal.remove();
      }

      modal.querySelector("#closeArcadeBtn").onclick = exit;
      modal.onclick = (e) => { if (e.target === modal) exit(); };

      const onEsc = (e) => {
        if (e.key === "Escape") {
          exit();
          window.removeEventListener("keydown", onEsc);
        }
      };
      window.addEventListener("keydown", onEsc);

      bootGame();
    };

    // --- GAME 1: TETRIS (SOLO / 2P DUAL PIT) ---
    function playTetris(ctx, canvas, scoreEl, hintEl, is2P) {
      canvas.width = is2P ? 440 : 240;
      canvas.height = 400;
      const BLOCK = 20, ROWS = 20, COLS = 10;
      hintEl.textContent = is2P ? "P1: [W,A,S,D] | P2: [Arrows]" : "[←/→] Move | [↑] Rotate | [↓] Drop";

      const SHAPES = [
        [[1,1,1,1]], [[1,1],[1,1]], [[0,1,0],[1,1,1]],
        [[1,0,0],[1,1,1]], [[0,0,1],[1,1,1]], [[0,1,1],[1,1,0]], [[1,1,0],[0,1,1]]
      ];
      const COLORS = ["#00f2fe", "#fee440", "#a855f7", "#f97316", "#3b82f6", "#10b981", "#ef4444"];

      function makePlayer(ox) {
        return {
          board: Array.from({length: ROWS}, () => Array(COLS).fill(0)),
          ox, score: 0, lines: 0,
          piece: spawnPiece(), over: false, tick: Date.now()
        };
      }

      function spawnPiece() {
        const id = Math.floor(Math.random() * SHAPES.length);
        return { shape: SHAPES[id], color: COLORS[id], x: 3, y: 0 };
      }

      const p1 = makePlayer(15);
      const p2 = is2P ? makePlayer(235) : null;

      function collide(p, ox, oy, shape) {
        const s = shape || p.piece.shape;
        for (let r = 0; r < s.length; r++) {
          for (let c = 0; c < s[r].length; c++) {
            if (s[r][c]) {
              const nx = p.piece.x + c + ox;
              const ny = p.piece.y + r + oy;
              if (nx < 0 || nx >= COLS || ny >= ROWS) return true;
              if (ny >= 0 && p.board[ny][nx]) return true;
            }
          }
        }
        return false;
      }

      function lock(p) {
        p.piece.shape.forEach((row, r) => {
          row.forEach((v, c) => {
            if (v && p.piece.y + r >= 0) p.board[p.piece.y + r][p.piece.x + c] = p.piece.color;
          });
        });
        p.board = p.board.filter(row => row.some(cell => cell === 0));
        while (p.board.length < ROWS) {
          p.board.unshift(Array(COLS).fill(0));
          p.lines++;
          p.score += 100;
        }
        p.piece = spawnPiece();
        if (collide(p, 0, 0)) p.over = true;
      }

      function rotate(mat) {
        return mat[0].map((_, i) => mat.map(row => row[i]).reverse());
      }

      function update(p) {
        if (p.over) return;
        if (Date.now() - p.tick > 480) {
          if (!collide(p, 0, 1)) p.piece.y++;
          else lock(p);
          p.tick = Date.now();
        }
      }

      function render(p) {
        ctx.strokeStyle = "rgba(255,255,255,0.08)";
        ctx.strokeRect(p.ox, 0, COLS * BLOCK, ROWS * BLOCK);

        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            if (p.board[r][c]) {
              ctx.fillStyle = p.board[r][c];
              ctx.fillRect(p.ox + c * BLOCK + 1, r * BLOCK + 1, BLOCK - 2, BLOCK - 2);
            }
          }
        }
        if (p.piece && !p.over) {
          ctx.fillStyle = p.piece.color;
          p.piece.shape.forEach((row, r) => {
            row.forEach((v, c) => {
              if (v) ctx.fillRect(p.ox + (p.piece.x + c) * BLOCK + 1, (p.piece.y + r) * BLOCK + 1, BLOCK - 2, BLOCK - 2);
            });
          });
        }
        if (p.over) {
          ctx.fillStyle = "rgba(239, 68, 68, 0.75)";
          ctx.fillRect(p.ox, 180, COLS * BLOCK, 36);
          ctx.fillStyle = "#fff";
          ctx.font = "bold 10px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("OUT OF BOUNDS", p.ox + (COLS * BLOCK) / 2, 202);
        }
      }

      let anim;
      function loop() {
        ctx.fillStyle = "#050609";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        update(p1);
        render(p1);
        if (p2) {
          update(p2);
          render(p2);
          scoreEl.innerHTML = `P1: <b>${p1.score}</b> &nbsp;|&nbsp; P2: <b>${p2.score}</b>`;
        } else {
          scoreEl.innerHTML = `Score: <b>${p1.score}</b> &nbsp;|&nbsp; Lines: <b>${p1.lines}</b>`;
        }
        anim = requestAnimationFrame(loop);
      }
      anim = requestAnimationFrame(loop);

      function onKey(e) {
        if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space"].includes(e.code)) e.preventDefault();
        const l1 = is2P ? "KeyA" : "ArrowLeft";
        const r1 = is2P ? "KeyD" : "ArrowRight";
        const d1 = is2P ? "KeyS" : "ArrowDown";
        const rot1 = is2P ? "KeyW" : "ArrowUp";

        if (e.code === l1 && !collide(p1, -1, 0)) p1.piece.x--;
        if (e.code === r1 && !collide(p1, 1, 0)) p1.piece.x++;
        if (e.code === d1 && !collide(p1, 0, 1)) p1.piece.y++;
        if (e.code === rot1) {
          const r = rotate(p1.piece.shape);
          if (!collide(p1, 0, 0, r)) p1.piece.shape = r;
        }

        if (p2 && !p2.over) {
          if (e.code === "ArrowLeft" && !collide(p2, -1, 0)) p2.piece.x--;
          if (e.code === "ArrowRight" && !collide(p2, 1, 0)) p2.piece.x++;
          if (e.code === "ArrowDown" && !collide(p2, 0, 1)) p2.piece.y++;
          if (e.code === "ArrowUp") {
            const r = rotate(p2.piece.shape);
            if (!collide(p2, 0, 0, r)) p2.piece.shape = r;
          }
        }
      }
      window.addEventListener("keydown", onKey);

      return () => {
        cancelAnimationFrame(anim);
        window.removeEventListener("keydown", onKey);
      };
    }

    // --- GAME 2: SNAKE DUEL ---
    function playSnake(ctx, canvas, scoreEl, hintEl, is2P) {
      canvas.width = 400; canvas.height = 400;
      const GRID = 20, SIZE = 20;
      hintEl.textContent = is2P ? "P1: W,A,S,D (Cyan) | P2: Arrows (Pink)" : "Arrow Keys to guide the snake";

      let p1 = { body: [{x: 4, y: 10}], dir: {x: 1, y: 0}, next: {x: 1, y: 0}, dead: false, score: 0 };
      let p2 = is2P ? { body: [{x: 16, y: 10}], dir: {x: -1, y: 0}, next: {x: -1, y: 0}, dead: false, score: 0 } : null;
      let food = { x: 10, y: 10 };

      function step(s) {
        if (s.dead) return;
        s.dir = s.next;
        const head = { x: s.body[0].x + s.dir.x, y: s.body[0].y + s.dir.y };
        if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID || s.body.some(b => b.x === head.x && b.y === head.y)) {
          s.dead = true;
          return;
        }
        s.body.unshift(head);
        if (head.x === food.x && head.y === food.y) {
          s.score += 15;
          food = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
        } else {
          s.body.pop();
        }
      }

      let tick = Date.now(), anim;
      function loop() {
        if (Date.now() - tick > 95) {
          step(p1);
          if (p2) {
            step(p2);
            if (p1.body.some(b => b.x === p2.body[0].x && b.y === p2.body[0].y)) p2.dead = true;
            if (p2.body.some(b => b.x === p1.body[0].x && b.y === p1.body[0].y)) p1.dead = true;
          }
          tick = Date.now();
        }

        ctx.fillStyle = "#050609";
        ctx.fillRect(0, 0, 400, 400);

        ctx.fillStyle = "#22c55e";
        ctx.fillRect(food.x * SIZE + 2, food.y * SIZE + 2, SIZE - 4, SIZE - 4);

        ctx.fillStyle = p1.dead ? "#475569" : "#00f2fe";
        p1.body.forEach(b => ctx.fillRect(b.x * SIZE + 1, b.y * SIZE + 1, SIZE - 2, SIZE - 2));

        if (p2) {
          ctx.fillStyle = p2.dead ? "#475569" : "#ff007f";
          p2.body.forEach(b => ctx.fillRect(b.x * SIZE + 1, b.y * SIZE + 1, SIZE - 2, SIZE - 2));
          scoreEl.innerHTML = `P1: <b>${p1.score}</b> &nbsp;|&nbsp; P2: <b>${p2.score}</b>`;
        } else {
          scoreEl.innerHTML = `Score: <b>${p1.score}</b> ${p1.dead ? '(Game Over)' : ''}`;
        }
        anim = requestAnimationFrame(loop);
      }
      anim = requestAnimationFrame(loop);

      function onKey(e) {
        if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.code)) e.preventDefault();
        if (!is2P) {
          if (e.code === "ArrowUp" && p1.dir.y === 0) p1.next = {x: 0, y: -1};
          if (e.code === "ArrowDown" && p1.dir.y === 0) p1.next = {x: 0, y: 1};
          if (e.code === "ArrowLeft" && p1.dir.x === 0) p1.next = {x: -1, y: 0};
          if (e.code === "ArrowRight" && p1.dir.x === 0) p1.next = {x: 1, y: 0};
        } else {
          if (e.code === "KeyW" && p1.dir.y === 0) p1.next = {x: 0, y: -1};
          if (e.code === "KeyS" && p1.dir.y === 0) p1.next = {x: 0, y: 1};
          if (e.code === "KeyA" && p1.dir.x === 0) p1.next = {x: -1, y: 0};
          if (e.code === "KeyD" && p1.dir.x === 0) p1.next = {x: 1, y: 0};

          if (p2) {
            if (e.code === "ArrowUp" && p2.dir.y === 0) p2.next = {x: 0, y: -1};
            else if (e.code === "ArrowDown" && p2.dir.y === 0) p2.next = {x: 0, y: 1};
            else if (e.code === "ArrowLeft" && p2.dir.x === 0) p2.next = {x: -1, y: 0};
            else if (e.code === "ArrowRight" && p2.dir.x === 0) p2.next = {x: 1, y: 0};
          }
        }
      }
      window.addEventListener("keydown", onKey);

      return () => {
        cancelAnimationFrame(anim);
        window.removeEventListener("keydown", onKey);
      };
    }

    // --- GAME 3: ROAD CROSS ---
    function playCross(ctx, canvas, scoreEl, hintEl, is2P) {
      canvas.width = 400; canvas.height = 400;
      hintEl.textContent = is2P ? "P1: W,A,S,D | P2: Arrow Keys" : "Cross safely to the top using Arrow Keys";

      let p1 = { x: 150, y: 360, score: 0, color: "#facc15" };
      let p2 = is2P ? { x: 230, y: 360, score: 0, color: "#38bdf8" } : null;

      const lanes = [
        { y: 80, speed: 2.8, w: 45, cars: [20, 180, 320], color: "#ef4444" },
        { y: 150, speed: -3.4, w: 60, cars: [100, 260], color: "#f97316" },
        { y: 220, speed: 3.6, w: 50, cars: [40, 220], color: "#a855f7" },
        { y: 290, speed: -2.8, w: 55, cars: [80, 240], color: "#ec4899" }
      ];

      let anim;
      function loop() {
        ctx.fillStyle = "#07080c";
        ctx.fillRect(0, 0, 400, 400);

        ctx.fillStyle = "#161922";
        ctx.fillRect(0, 0, 400, 55);
        ctx.fillRect(0, 345, 400, 55);

        lanes.forEach(l => {
          ctx.fillStyle = l.color;
          l.cars.forEach((cx, i) => {
            ctx.fillRect(cx, l.y, l.w, 24);
            l.cars[i] += l.speed;
            if (l.speed > 0 && l.cars[i] > 400) l.cars[i] = -l.w;
            if (l.speed < 0 && l.cars[i] < -l.w) l.cars[i] = 400;

            [p1, p2].forEach(p => {
              if (p && p.x + 18 > cx && p.x < cx + l.w && p.y + 18 > l.y && p.y < l.y + 24) p.y = 360;
            });
          });
        });

        [p1, p2].forEach(p => {
          if (p && p.y <= 45) {
            p.score++;
            p.y = 360;
          }
        });

        ctx.fillStyle = p1.color;
        ctx.fillRect(p1.x, p1.y, 20, 20);

        if (p2) {
          ctx.fillStyle = p2.color;
          ctx.fillRect(p2.x, p2.y, 20, 20);
          scoreEl.innerHTML = `P1: <b>${p1.score}</b> &nbsp;|&nbsp; P2: <b>${p2.score}</b>`;
        } else {
          scoreEl.innerHTML = `Crossings: <b>${p1.score}</b>`;
        }
        anim = requestAnimationFrame(loop);
      }
      anim = requestAnimationFrame(loop);

      function onKey(e) {
        if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.code)) e.preventDefault();
        const step = 35;
        if (!is2P) {
          if (e.code === "ArrowUp") p1.y = Math.max(20, p1.y - step);
          if (e.code === "ArrowDown") p1.y = Math.min(360, p1.y + step);
          if (e.code === "ArrowLeft") p1.x = Math.max(10, p1.x - step);
          if (e.code === "ArrowRight") p1.x = Math.min(370, p1.x + step);
        } else {
          if (e.code === "KeyW") p1.y = Math.max(20, p1.y - step);
          if (e.code === "KeyS") p1.y = Math.min(360, p1.y + step);
          if (e.code === "KeyA") p1.x = Math.max(10, p1.x - step);
          if (e.code === "KeyD") p1.x = Math.min(370, p1.x + step);

          if (p2) {
            if (e.code === "ArrowUp") p2.y = Math.max(20, p2.y - step);
            else if (e.code === "ArrowDown") p2.y = Math.min(360, p2.y + step);
            else if (e.code === "ArrowLeft") p2.x = Math.max(10, p2.x - step);
            else if (e.code === "ArrowRight") p2.x = Math.min(370, p2.x + step);
          }
        }
      }
      window.addEventListener("keydown", onKey);

      return () => {
        cancelAnimationFrame(anim);
        window.removeEventListener("keydown", onKey);
      };
    }

    // --- GAME 4: PONG ---
    function playPong(ctx, canvas, scoreEl, hintEl, is2P) {
      canvas.width = 400; canvas.height = 300;
      hintEl.textContent = is2P ? "P1: [W / S] | P2: [Up / Down]" : "Use [Up / Down Arrows] to Defend";

      let p1 = { y: 110, score: 0 };
      let p2 = { y: 110, score: 0 };
      let ball = { x: 200, y: 150, vx: 3.6, vy: 2 };
      const keys = {};

      let anim;
      function loop() {
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.y <= 0 || ball.y >= 292) ball.vy *= -1;
        if (ball.x <= 20 && ball.y >= p1.y && ball.y <= p1.y + 70) ball.vx = Math.abs(ball.vx);
        if (ball.x >= 372 && ball.y >= p2.y && ball.y <= p2.y + 70) ball.vx = -Math.abs(ball.vx);

        if (ball.x < 0) { p2.score++; ball = { x: 200, y: 150, vx: 3.6, vy: 2 }; }
        if (ball.x > 400) { p1.score++; ball = { x: 200, y: 150, vx: -3.6, vy: -2 }; }

        if (!is2P) {
          p2.y += (ball.y - (p2.y + 35)) * 0.11;
          if (keys["ArrowUp"]) p1.y = Math.max(0, p1.y - 5);
          if (keys["ArrowDown"]) p1.y = Math.min(230, p1.y + 5);
        } else {
          if (keys["KeyW"]) p1.y = Math.max(0, p1.y - 5);
          if (keys["KeyS"]) p1.y = Math.min(230, p1.y + 5);
          if (keys["ArrowUp"]) p2.y = Math.max(0, p2.y - 5);
          if (keys["ArrowDown"]) p2.y = Math.min(230, p2.y + 5);
        }

        ctx.fillStyle = "#050609";
        ctx.fillRect(0, 0, 400, 300);

        ctx.fillStyle = "#5865f2";
        ctx.fillRect(10, p1.y, 10, 70);

        ctx.fillStyle = "#22c55e";
        ctx.fillRect(380, p2.y, 10, 70);

        ctx.fillStyle = "#fff";
        ctx.fillRect(ball.x, ball.y, 8, 8);

        scoreEl.innerHTML = `P1: <b>${p1.score}</b> &nbsp;|&nbsp; ${is2P ? 'P2' : 'BOT'}: <b>${p2.score}</b>`;
        anim = requestAnimationFrame(loop);
      }
      anim = requestAnimationFrame(loop);

      function kd(e) { keys[e.code] = true; }
      function ku(e) { keys[e.code] = false; }
      window.addEventListener("keydown", kd);
      window.addEventListener("keyup", ku);

      return () => {
        cancelAnimationFrame(anim);
        window.removeEventListener("keydown", kd);
        window.removeEventListener("keyup", ku);
      };
    }

    // 7. CHAT SLASH COMMANDS
    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && document.activeElement && document.activeElement.id === "msg") {
        const val = document.activeElement.value.trim().toLowerCase();
        if (["/arcade", "/tetris", "/snake", "/cross", "/pong"].includes(val)) {
          e.preventDefault();
          document.activeElement.value = "";
          const target = val === "/arcade" ? "tetris" : val.replace("/", "");
          window.triggerArcadeCinematic(target);
        }
      }
    });
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

   // 3. FILE UPLOAD (Gofile) + '+' BUTTON
const MAX_UPLOAD = 10 * 1024 ** 3; // 10 GB
let uploading = false;

const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.style.display = "none";
document.body.appendChild(fileInput);

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

async function uploadBig(file) {
  if (!file || uploading) return;
  if (file.size > MAX_UPLOAD) return toast("File is over 10 GB.");
  const input = document.getElementById("msg");
  if (!input) return toast("Open a chat first.");

  uploading = true;
  const sizeMB = (file.size / 1048576).toFixed(1);
  toast('Uploading "' + file.name + '" (' + sizeMB + " MB)...", 4000);
  setUploadProgress(1);

  const urls = ["https://upload.gofile.io/uploadfile"];
  try {
    const s = await (await fetch("https://api.gofile.io/servers")).json();
    const name = s.data.servers[0].name;
    urls.push("https://" + name + ".gofile.io/uploadfile");
  } catch {}

  let data = null, lastErr = null;
  for (const u of urls) {
    try { data = await xhrUpload(u, file); break; }
    catch (e) { lastErr = e; console.warn("[Kairo] upload failed via", u, e); }
  }
  uploading = false;
  setUploadProgress(100);

  if (!data) return toast("Upload failed: " + (lastErr ? lastErr.message : "unknown"), 5000);

  const draft = input.value;
  input.value = "📁 " + file.name + " (" + sizeMB + " MB)\n🔗 " + data.downloadPage;
  await sendMessage();
  const again = document.getElementById("msg");
  if (again) again.value = draft;
}

fileInput.onchange = () => {
  if (fileInput.files.length) uploadBig(fileInput.files[0]);
  fileInput.value = "";
};
window.addEventListener("dragover", (e) => e.preventDefault());
window.addEventListener("drop", (e) => {
  e.preventDefault();
  if (e.dataTransfer && e.dataTransfer.files.length) uploadBig(e.dataTransfer.files[0]);
});

function mountComposerBtn() {
  const composer = document.querySelector("#rc-root .composer");
  if (!composer || document.getElementById("kairoAttachBtn")) return;
  const attachBtn = document.createElement("button");
  attachBtn.id = "kairoAttachBtn";
  attachBtn.type = "button";
  attachBtn.title = "Attach & send file link (up to 10 GB)";
  attachBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"/></svg>';
  attachBtn.onclick = () => fileInput.click();
  const msgInput = document.getElementById("msg");
  if (msgInput) composer.insertBefore(attachBtn, msgInput);
  else composer.prepend(attachBtn);
}
setInterval(mountComposerBtn, 1000);
})();