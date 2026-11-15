// Kairo LOG 1.5.2 (UI Polish, Layout Isolation & Modal Fix)

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
  fontLink.href = "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Unbounded:wght@500;600;700;800&display=swap";
  (document.head || document.documentElement).appendChild(fontLink);
}

// Lock host page scrollbars so no ugly white scrollbar appears on the right
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
#rc-root *,#rc-root *::before,#rc-root *::after{box-sizing:border-box;margin:0;padding:0}
#rc-root button,#rc-root input,#rc-root textarea,#rc-root select{font:inherit;color:inherit}
#rc-root button{cursor:pointer;user-select:none}
#rc-root .app{width:100%;height:100%;display:grid;grid-template-columns:268px 1fr 272px;background:var(--bg)}
#rc-root .sidebar{min-width:0;background:var(--side);display:flex;flex-direction:column;border-right:1px solid var(--border)}
#rc-root .rightbar{min-width:0;background:var(--side);display:flex;flex-direction:column;border-left:1px solid var(--border)}
#rc-root .brand{height:64px;display:flex;align-items:center;gap:11px;padding:0 16px;border-bottom:1px solid var(--border)}
#rc-root .rightTop{height:64px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;border-bottom:1px solid var(--border);font-family:var(--font-brand);font-size:.82rem;font-weight:700;color:var(--text)}
#rc-root .logo{flex:none;width:38px;height:38px;border-radius:11px;display:grid;place-items:center;background:linear-gradient(145deg,var(--accent),var(--accent2));color:white;font-family:var(--font-brand);font-weight:800;font-size:15px;box-shadow:0 6px 16px rgba(88,101,242,.32);letter-spacing:-.03em}
#rc-root .brandText{min-width:0;flex:1}
#rc-root .brandTitle{font-family:var(--font-brand);font-weight:700;font-size:.94rem;letter-spacing:-.02em;display:flex;align-items:center;gap:7px;color:var(--text)}
#rc-root .beta{font-family:var(--font-mono);font-size:.6rem;font-weight:600;color:var(--accent);background:rgba(88,101,242,.14);border:1px solid rgba(88,101,242,.4);border-radius:6px;padding:1px 6px}
#rc-root .brandSub{font-size:.72rem;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px}
#rc-root .brandSub.ok{color:var(--green);font-weight:600}
#rc-root .brandSub.bad{color:var(--red)}
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
#rc-root .avatar{position:relative;width:36px;height:36px;flex:0 0 36px;border-radius:50%;display:grid;place-items:center;background:var(--panel);border:1px solid var(--border);color:var(--text);font-family:var(--font-brand);font-weight:700;font-size:12px;overflow:visible}
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
#rc-root .banner{padding:9px 20px;background:rgba(88,101,242,.14);color:var(--text);font-size:.78rem;border-bottom:1px solid var(--accent);display:flex;align-items:center;justify-content:space-between;gap:10px}
#rc-root .banner button{flex:none}
#rc-root .pinnedBar{background:var(--panel);border-bottom:1px solid var(--border);padding:7px 20px;display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:.76rem;color:var(--text)}
#rc-root .pinnedText{display:flex;align-items:center;gap:8px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:0}
#rc-root .pinnedIcon{color:var(--accent);font-size:.88rem}

/* --- CALL PANEL --- */
#rc-root .callPanel{position:relative;background:linear-gradient(160deg,rgba(22,23,26,.98),rgba(34,36,41,.94));backdrop-filter:blur(20px);border:1px solid var(--border);border-radius:20px;margin:16px 20px;padding:24px 28px;box-shadow:0 20px 50px rgba(0,0,0,.45);display:flex;flex-direction:column;align-items:center;gap:20px;overflow:hidden;transition:all .35s cubic-bezier(.16,1,.3,1)}
#rc-root .callPanel.endedState{opacity:0;transform:scale(.94)}
#rc-root .callStage{width:100%;max-width:520px;display:flex;align-items:center;justify-content:space-around;position:relative}
#rc-root .callParticipant{display:flex;flex-direction:column;align-items:center;gap:9px;z-index:2;transition:transform .3s cubic-bezier(.16,1,.3,1)}
#rc-root .callAvatarWrap{position:relative;width:96px;height:96px;border-radius:50%;display:grid;place-items:center}
#rc-root .callAvatar{width:86px;height:86px;border-radius:50%;background:linear-gradient(145deg,var(--panel),var(--input));border:2px solid var(--border);color:var(--text);font-family:var(--font-brand);font-size:28px;font-weight:800;display:grid;place-items:center;box-shadow:0 12px 28px rgba(0,0,0,.35);transition:all .3s ease;z-index:2}
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
@media (prefers-reduced-motion: reduce){
  #rc-root .callPulseRing,#rc-root .callWaves,#rc-root .callAvatarWrap.speaking .callAvatar{animation:none!important}
}

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
#rc-root .statsGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;width:min(740px,100%);margin-top:20px}
#rc-root .statCard{position:relative;overflow:hidden;background:var(--side);border:1px solid var(--border);border-radius:16px;padding:18px 20px;display:flex;flex-direction:column;justify-content:space-between;gap:10px;text-align:left;box-shadow:0 10px 24px rgba(0,0,0,.2);transition:transform .2s ease,border-color .2s ease}
#rc-root .statCard:hover{transform:translateY(-2px);border-color:var(--accent)}
#rc-root .statTop{display:flex;align-items:center;justify-content:space-between;gap:8px}
#rc-root .statLabel{font-family:var(--font-brand);font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)}
#rc-root .statValue{font-family:var(--font-brand);font-size:1.12rem;font-weight:800;letter-spacing:-.02em;color:var(--text);display:flex;align-items:center;gap:10px;line-height:1.2}
#rc-root .statSub{font-size:.72rem;color:var(--muted);font-weight:500}
#rc-root .pulseDot{position:relative;width:10px;height:10px;flex:none;border-radius:50%;background:var(--green);box-shadow:0 0 10px var(--green);animation:kairoBlink 1.6s infinite ease-in-out}
@keyframes kairoBlink{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.45;transform:scale(.88)}}
#rc-root .log{flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;padding:18px 20px;display:flex;flex-direction:column;gap:10px;background:var(--chat);scroll-behavior:auto}
#rc-root .message{position:relative;display:flex;gap:10px;max-width:78%}
#rc-root .message.mine{align-self:flex-end;flex-direction:row-reverse}
#rc-root .msgCol{display:flex;flex-direction:column;min-width:0}
#rc-root .mine .msgCol{align-items:flex-end}
#rc-root .bubbleWrap{position:relative;display:flex;align-items:center;gap:6px}
#rc-root .mine .bubbleWrap{flex-direction:row-reverse}
#rc-root .bubble{padding:10px 13px;border-radius:14px;background:var(--side);color:var(--text);border:1px solid var(--border);white-space:pre-wrap;overflow-wrap:anywhere;transition:box-shadow .2s;font-size:.86rem;line-height:1.45}
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

/* --- MARKDOWN & CODE BLOCKS --- */
#rc-root .codeBlockWrap{position:relative;background:#0d1117;border:1px solid var(--border);border-radius:8px;margin:6px 0;overflow:hidden}
#rc-root .codeBlockHeader{display:flex;align-items:center;justify-content:space-between;padding:4px 10px;background:rgba(255,255,255,.04);border-bottom:1px solid rgba(255,255,255,.08);font-family:var(--font-mono);font-size:.66rem;color:var(--muted)}
#rc-root .copyCodeBtn{border:0;background:transparent;color:var(--muted);font-size:.66rem;cursor:pointer;padding:2px 6px;border-radius:4px}
#rc-root .copyCodeBtn:hover{background:rgba(255,255,255,.1);color:var(--text)}
#rc-root pre.codeContent{margin:0;padding:10px;font-family:var(--font-mono);font-size:.76rem;line-height:1.45;overflow-x:auto;color:#c9d1d9}
#rc-root code.inlineCode{background:rgba(0,0,0,.28);border:1px solid rgba(255,255,255,.1);padding:1px 5px;border-radius:4px;font-family:var(--font-mono);font-size:.82em}

#rc-root .system{align-self:center;color:var(--muted);font-size:.72rem;background:var(--side);padding:4px 12px;border-radius:999px;border:1px solid var(--border);text-align:center}
#rc-root .typingIndicator{padding:2px 20px;font-size:.72rem;color:var(--muted);font-style:italic;min-height:18px}
#rc-root .replyBar{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:7px 20px;background:var(--panel);border-top:1px solid var(--border);font-size:.76rem;color:var(--muted)}
#rc-root .replyBar b{color:var(--text)}

/* --- COMPOSER & COUNTER --- */
#rc-root .composerArea{display:flex;flex-direction:column;background:var(--side);border-top:1px solid var(--border)}
#rc-root .composer{display:flex;gap:8px;align-items:center;padding:10px 18px 4px}
#rc-root .composerFooter{display:flex;align-items:center;justify-content:flex-end;padding:0 20px 8px;font-family:var(--font-mono);font-size:.66rem;color:var(--muted)}
#rc-root .mediaBtn{flex:none;width:38px;height:38px;border:1px solid var(--border);border-radius:10px;background:var(--panel);color:var(--muted);font-size:16px;display:grid;place-items:center;transition:background .15s,color .15s}
#rc-root .mediaBtn:hover{background:var(--input);color:var(--text)}
#rc-root .mediaBtn.rec{background:var(--red);color:white;border-color:var(--red);animation:kairoBlink 1s infinite}
#rc-root .composer input{flex:1;min-width:0;border:1px solid var(--border);outline:0;border-radius:10px;padding:10px 14px;background:var(--input);color:var(--text);font-size:.86rem;transition:border-color .15s}
#rc-root .composer input:focus{border-color:var(--accent)}
#rc-root .composer button.sendBtn{flex:none;width:44px;height:38px;border:0;border-radius:10px;background:var(--accent);color:white;font-size:17px;display:grid;place-items:center}

/* --- CLEAN, TRUSTWORTHY MODALS & LOGIN SCREEN --- */
#rc-root .modalLayer{position:fixed;inset:0;background:rgba(7,8,10,.82);backdrop-filter:blur(8px);display:grid;place-items:center;padding:20px;z-index:9999}
#rc-root .modal{width:min(440px,100%);max-height:90vh;overflow-y:auto;background:var(--side);color:var(--text);border:1px solid var(--border);border-radius:18px;padding:26px;box-shadow:0 24px 64px rgba(0,0,0,.65)}
#rc-root .modalHeader{display:flex;align-items:center;gap:12px;margin-bottom:12px}
#rc-root .modalBadge{width:40px;height:40px;border-radius:11px;background:linear-gradient(145deg,var(--accent),var(--accent2));color:white;font-family:var(--font-brand);font-weight:800;font-size:16px;display:grid;place-items:center;flex:none;box-shadow:0 6px 16px rgba(88,101,242,.3)}
#rc-root .modal h2{font-family:var(--font-brand);font-size:1.05rem;font-weight:700;letter-spacing:-.02em;color:var(--text);margin:0}
#rc-root .modal h3{font-family:var(--font-brand);font-size:.68rem;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin:14px 0 6px;color:var(--muted)}
#rc-root .modal p,#rc-root .modal li{color:var(--muted);font-size:.82rem;line-height:1.5}
#rc-root .modal ol{padding-left:18px;display:grid;gap:6px;margin:10px 0}
#rc-root .modal input,#rc-root .modal select,#rc-root .modal textarea{width:100%;border:1px solid var(--border);border-radius:10px;background:var(--bg);color:var(--text);padding:10px 13px;outline:0;font-size:.85rem;transition:border-color .15s,box-shadow .15s}
#rc-root .modal input:focus,#rc-root .modal select:focus,#rc-root .modal textarea:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(88,101,242,.18)}
#rc-root .modal input[type="color"]{height:42px;padding:3px 5px;border-radius:10px;cursor:pointer}
#rc-root .modal .err{color:var(--red);min-height:1.2em;margin:10px 0 0;font-size:.78rem;font-weight:600}
#rc-root .colorRow{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:6px}
#rc-root .colorField{display:flex;flex-direction:column;gap:5px;font-size:.72rem;color:var(--muted)}
#rc-root .row{display:flex;gap:10px;margin-top:18px}
#rc-root .row .btn{flex:1}
#rc-root .subRow{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:12px;padding-top:12px;border-top:1px solid var(--border)}
#rc-root .linkBtn{border:0;background:transparent;color:var(--muted);font-size:.75rem;font-weight:600;padding:4px 6px;border-radius:6px;transition:color .15s}
#rc-root .linkBtn:hover{color:var(--text);text-decoration:underline}
#rc-root .linkBtn.danger:hover{color:var(--red)}
#rc-root .kbd{font-family:var(--font-mono);font-size:.7rem;background:var(--panel);border:1px solid var(--border);border-radius:5px;padding:2px 6px;color:var(--text)}
#rc-root .toast{position:fixed;left:50%;bottom:24px;z-index:99999;transform:translate(-50%,15px);background:#09090b;color:white;border:1px solid var(--border);padding:10px 16px;border-radius:10px;opacity:0;pointer-events:none;transition:.2s;max-width:min(520px,92vw);font-size:.8rem;font-weight:600;box-shadow:0 12px 30px rgba(0,0,0,.5)}
#rc-root .toast.show{opacity:1;transform:translate(-50%,0)}
#rc-root .lightbox{position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:999999;display:grid;place-items:center;padding:20px;cursor:zoom-out}
#rc-root .lightbox img{max-width:92vw;max-height:92vh;border-radius:10px;box-shadow:0 15px 50px rgba(0,0,0,.7)}
#rc-root [hidden]{display:none!important}
@media(max-width:960px){#rc-root .app{grid-template-columns:68px 1fr 220px}#rc-root .brand{justify-content:center;padding:8px 4px}#rc-root .brandText,#rc-root .quickLabel,#rc-root .quickHeading,#rc-root .selfInfo{display:none}#rc-root .quickAction{justify-content:center;padding:10px 4px}#rc-root .statsGrid{grid-template-columns:1fr}}
`;
const MARKUP = `
<div class="app">
  <aside class="sidebar">
    <div class="brand">
      <div class="logo">k.</div>
      <div class="brandText">
        <div class="brandTitle">Kairo<span class="beta">v1.5.2</span></div>
        <div id="brandSub" class="brandSub">vault locked</div>
      </div>
      <button id="adminBtn" class="iconBtn" title="Admin login" style="display:none">🔒</button>
    </div>
    <div class="quickHeading">Navigation</div>
    <div class="sideActions">
      <button id="overviewBtn" class="quickAction"><span class="quickIcon">⌂</span><span class="quickLabel">Overview</span></button>
      <button id="profileBtn" class="quickAction"><span class="quickIcon">◉</span><span class="quickLabel">Profile & Status</span></button>
      <button id="addBtn" class="quickAction"><span class="quickIcon">＋</span><span class="quickLabel">New Chat (DM)</span></button>
      <button id="groupBtn" class="quickAction"><span class="quickIcon">＃</span><span class="quickLabel">New Group</span></button>
      <button id="themeBtn" class="quickAction"><span class="quickIcon">🎨</span><span class="quickLabel">Themes & Colors</span></button>
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
<div id="lightboxHost"></div>
<div id="toast" class="toast"></div>
<input type="file" id="filePicker" accept="image/*" style="display:none">
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

const SERVER = "https://ntfy.sh";
const MAX_TEXT = 800;
const MAX_CHATS = 20;
const PING_EVERY = 120000;
const PING_FLOOR = 25000;
const LS = "roomchat:";
const VERSION = "1.5.2";
const ADMIN_TOPIC = "kairo-admin-control-6d2c9a81f4b7";
const SURVEY_TOPIC = "kairo-survey-feedback-881a";
const ADMIN_PASSWORD = "";
const EMOJIS = ["👍", "❤️", "😂", "🔥", "👀"];
const origTitle = document.title;

const CLOAK_PRESETS = {
  kairo: { title: "Kairo", icon: "" },
  drive: { title: "My Drive - Google Drive", icon: "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png" },
  docs: { title: "Google Docs", icon: "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico" },
  classroom: { title: "Home - Google Classroom", icon: "https://ssl.gstatic.com/classroom/favicon.png" },
  canvas: { title: "Dashboard - Canvas", icon: "https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico" }
};

let isAdmin = false;
let adminFeed = null;
let vaultKey = null;

const te = new TextEncoder();
const td = new TextDecoder();
const me = { id: rnd(), name: "", avatar: "", bio: "", status: "online" };
const settings = {
  theme: "dark",
  sound: true,
  titleAlert: true,
  cloak: "kairo",
  sendOnEnter: true,
  customColors: { bg: "#0f1012", side: "#16171a", accent: "#5865f2" }
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

// Media recording
let mediaRecorder = null;
let audioChunks = [];
let isRecording = false;

// WebRTC Voice Call Engine
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

// Typing throttling state
let lastTypingSent = 0;
let typingTimeouts = new Map();

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

function openLightbox(src) {
  const box = $("lightboxHost");
  box.innerHTML = "";
  const lb = el("div", { className: "lightbox", onclick: () => { box.innerHTML = ""; } },
    el("img", { src })
  );
  box.append(lb);
}

function applyCloak(key) {
  settings.cloak = key || "kairo";
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
  if (settings.cloak && settings.cloak !== "kairo") return;
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

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let { width, height } = img;
        const maxDim = 800;
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
        const compressed = canvas.toDataURL("image/jpeg", 0.65);
        resolve(compressed);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function applyTheme(t) {
  settings.theme = t || "dark";
  if (settings.theme === "custom") {
    root.setAttribute("data-theme", "custom");
    const c = settings.customColors || { bg: "#0f1012", side: "#16171a", accent: "#5865f2" };
    root.style.setProperty("--bg", c.bg);
    root.style.setProperty("--chat", c.bg);
    root.style.setProperty("--side", c.side);
    root.style.setProperty("--panel", c.side);
    root.style.setProperty("--input", c.side);
    root.style.setProperty("--accent", c.accent);
    root.style.setProperty("--accent2", c.accent);
  } else {
    root.style.removeProperty("--bg");
    root.style.removeProperty("--chat");
    root.style.removeProperty("--side");
    root.style.removeProperty("--panel");
    root.style.removeProperty("--input");
    root.style.removeProperty("--accent");
    root.style.removeProperty("--accent2");
    if (settings.theme === "dark") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", settings.theme);
  }
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

// ---------- VAULT EXPORT & IMPORT ----------
function exportVaultString() {
  const enc = lsGet(LS + "vault_v129");
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
  lsSet(LS + "vault_v129", raw.trim());
  toast("Vault imported! Enter your Master Password to unlock.");
  promptVaultLogin();
}

async function unlockAllSavedRooms() {
  for (const r of rooms.values()) {
    if (!r.key && r.meta.pw) {
      try { r.key = await deriveKey(r.meta.room, r.meta.pw); } catch {}
    }
  }
  setStatus("vault unlocked", "ok");
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
      el("div", { className: "modalHeader" },
        el("div", { className: "modalBadge", textContent: "k." }),
        el("div", {},
          el("h2", { textContent: "Unlock Kairo Vault" }),
          el("p", { textContent: "AES-256 local encryption" })
        )
      ),
      el("p", { textContent: "Enter your Master Password to decrypt your profile, saved contacts, and room keys." }),
      el("h3", { textContent: "Master Password" })
    );
    const pwInp = el("input", { type: "password", placeholder: "Enter master password...", maxLength: 80 });
    const err = el("p", { className: "err" });
    const unlockBtn = el("button", { type: "submit", className: "btn", textContent: "Unlock Vault" });

    const subRow = el("div", { className: "subRow" },
      el("button", {
        type: "button",
        className: "linkBtn",
        textContent: "📥 Import Vault String",
        onclick: promptImportVault
      }),
      el("button", {
        type: "button",
        className: "linkBtn danger",
        textContent: "Reset Local Vault",
        onclick: () => {
          if (!confirm("Wipe your saved vault on this browser and start fresh?")) return;
          lsDel(LS + "vault_v129");
          rooms.clear();
          promptVaultLogin();
        }
      })
    );

    box.append(pwInp, err, el("div", { className: "row" }, unlockBtn), subRow);
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
        applyCloak(settings.cloak);
        blockedUsers = new Set(data.blocked || []);
        rooms.clear();
        (data.chats || []).forEach((meta) => {
          if (meta && meta.topic) rooms.set(meta.topic, makeRoom(meta));
        });
        closeModal();
        toast("Welcome back, " + me.name + "!");
        await unlockAllSavedRooms();
      } catch {
        err.textContent = "Incorrect Master Password.";
        unlockBtn.disabled = false;
      }
    };
    showModal(box);
    pwInp.focus();
  } else {
    const legacyName = lsGet(LS + "name") || "";
    const box = el("form", { className: "modal" });
    box.append(
      el("div", { className: "modalHeader" },
        el("div", { className: "modalBadge", textContent: "k." }),
        el("div", {},
          el("h2", { textContent: "Initialize Kairo Vault" }),
          el("p", { textContent: "Zero-knowledge local account" })
        )
      ),
      el("p", { textContent: "Choose a display name and Master Password. Your contacts and chat keys are encrypted inside your browser." })
    );
    const nameInp = el("input", { type: "text", placeholder: "e.g. arviyarrrr", value: legacyName, maxLength: 20 });
    const avInp = el("input", { type: "text", placeholder: "Emoji or initials (e.g. ⚡, AR)", maxLength: 4 });
    const bioInp = el("input", { type: "text", placeholder: "Status bio (optional)", maxLength: 50 });
    const pwInp = el("input", { type: "password", placeholder: "Create Master Password (4+ chars)", maxLength: 80 });
    const err = el("p", { className: "err" });
    const createBtn = el("button", { type: "submit", className: "btn", textContent: "Create Encrypted Vault" });

    const subRow = el("div", { className: "subRow" },
      el("span", { style: "font-size:.74rem;color:var(--muted)", textContent: "Already have a backup?" }),
      el("button", {
        type: "button",
        className: "linkBtn",
        textContent: "📥 Import Existing Vault",
        onclick: promptImportVault
      })
    );

    box.append(
      el("h3", { textContent: "Display Name" }), nameInp,
      el("h3", { textContent: "Avatar Emoji / Initials (Optional)" }), avInp,
      el("h3", { textContent: "Status Bio (Optional)" }), bioInp,
      el("h3", { textContent: "Master Password" }), pwInp,
      err,
      el("div", { className: "row" }, createBtn),
      subRow
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
        setStatus("vault unlocked", "ok");
        closeModal();
        renderSidebar();
        renderWelcome();
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
  if (peerConn) endCall();
  if (es) { es.close(); es = null; esKey = ""; }
  rooms.forEach((r) => { r.key = null; r.ready = false; });
  activeTopic = null;
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

// ---------- THEME & COLOR PICKER STUDIO ----------
function showThemeSettings() {
  const box = el("form", { className: "modal" });
  box.append(
    el("h2", { textContent: "Themes & Color Studio 🎨" }),
    el("p", { textContent: "Customize your theme, pick custom colors, and set your tab disguise." }),
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
  themeSel.value = settings.theme || "dark";

  const customColors = settings.customColors || { bg: "#0f1012", side: "#16171a", accent: "#5865f2" };
  const bgInput = el("input", { type: "color", value: customColors.bg });
  const sideInput = el("input", { type: "color", value: customColors.side });
  const accentInput = el("input", { type: "color", value: customColors.accent });

  const colorStudioDiv = el("div", { id: "colorStudioDiv", hidden: themeSel.value !== "custom" },
    el("h3", { textContent: "Custom Palette Studio" }),
    el("div", { className: "colorRow" },
      el("div", { className: "colorField" }, el("span", { textContent: "Primary (Chat)" }), bgInput),
      el("div", { className: "colorField" }, el("span", { textContent: "Secondary (Side)" }), sideInput),
      el("div", { className: "colorField" }, el("span", { textContent: "Accent (Buttons)" }), accentInput)
    )
  );

  const previewUpdate = () => {
    if (themeSel.value === "custom") {
      settings.customColors = { bg: bgInput.value, side: sideInput.value, accent: accentInput.value };
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

  const cloakSel = el("select", {},
    el("option", { value: "kairo", textContent: "Default (Kairo)" }),
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
      settings.customColors = { bg: bgInput.value, side: sideInput.value, accent: accentInput.value };
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

function persistRoom(r) { lsSet(LS + "t:" + r.meta.topic, JSON.stringify(r.store)); }
function saveChats() { saveVault(); }
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
function loadLegacyChats() {
  let list = [];
  try { list = JSON.parse(lsGet(LS + "chats") || "[]"); } catch {}
  list.forEach((meta) => { if (meta && meta.topic && !rooms.has(meta.topic)) rooms.set(meta.topic, makeRoom(meta)); });
}

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

// ---------- CALL DURATION & VOICE ACTIVITY ----------
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

  const myWrap = el("div", { className: "callAvatarWrap" + (callState === "calling" ? " pulsing" : "") },
    el("div", { className: "callPulseRing" }),
    el("div", { className: "callAvatar", textContent: myAv })
  );
  const mySide = el("div", { className: "callParticipant" }, myWrap, el("div", { className: "callParticipantName", textContent: "You (" + me.name + ")" }));

  const remoteWrap = el("div", { id: "remoteAvatarWrap", className: "callAvatarWrap" + (callState === "ringing" || callState === "incoming" ? " pulsing" : "") },
    el("div", { className: "callPulseRing" }),
    el("div", { className: "callAvatar", textContent: peerAv })
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
    if (!list.length) box.append(el("div", { className: "itemSub", textContent: empty, style: "padding:8px 10px" }));
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

// ---------- typing indicator UI ----------
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

// ---------- MARKDOWN FORMATTING & CODE BLOCKS ----------
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

// ---------- interactive message rendering ----------
function setReply(m) {
  replyingTo = m ? { id: m.id, who: m.who, text: String(m.text || (m.img ? "Photo" : "Voice message")).slice(0, 90) } : null;
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

  bubble.append(meta);

  if (m.text) {
    bubble.append(formatMessageContent(m.text));
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
  const row = el("div", { className: "message " + (mine ? "mine" : "theirs") },
    el("div", { className: "avatar", textContent: avText, title: who }),
    col
  );
  row.setAttribute("data-mid", m.id);
  return row;
}

// ---------- smart auto-scroll & manual scroll ----------
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

function scrollLog() {
  scrollToBottom(false);
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
        ? "Direct message with " + r.meta.title + ". Markdown, code blocks, photos, voice notes & calls active."
        : "Group “" + r.meta.title + "”. Markdown, code blocks, photos & voice notes active."
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

  const stats = el("div", { className: "statsGrid" },
    el("div", { className: "statCard" },
      el("div", { className: "statTop" },
        el("div", { className: "statLabel", textContent: "Account Vault" })
      ),
      el("div", { className: "statValue", textContent: vaultKey ? "UNLOCKED" : "LOCKED" }),
      el("div", { className: "statSub", textContent: "AES-256 · Portable Vault" })
    ),
    el("div", { className: "statCard" },
      el("div", { className: "statTop" },
        el("div", { className: "statLabel", textContent: "Color Studio" }),
        el("span", { className: "pulseDot", title: "Color Engine Ready" })
      ),
      el("div", { className: "statValue", textContent: "v1.5.2" }),
      el("div", { className: "statSub", textContent: "Custom Colors & Unbounded" })
    ),
    el("div", { className: "statCard" },
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
    el("p", { className: "stageSub", textContent: "End-to-end encrypted messaging, Markdown code blocks, custom color palette studio, and portable vault export." }),
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
    placeholder: "Message " + (isDm ? r.meta.title : "#" + r.meta.title),
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
      text: m.text ? String(m.text).slice(0, MAX_TEXT) : "",
      img: m.img || null,
      audio: m.audio || null,
      mine: false,
      read: false,
      seenByMe: isActive,
      time: m.t || Date.now(),
      replyTo: m.replyTo || null,
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

function resubscribe() {
  const open = Array.from(rooms.values()).filter((r) => r.key);
  const k = open.map((r) => r.meta.topic).join(",");
  if (k === esKey) {
    if (!open.length) setStatus(vaultKey ? "vault unlocked" : "vault locked", vaultKey ? "ok" : "");
    return;
  }
  if (es) { es.close(); es = null; }
  esKey = k;
  open.forEach((r) => { r.ready = false; });
  if (!open.length) {
    setStatus(vaultKey ? "vault unlocked" : "vault locked", vaultKey ? "ok" : "");
    return;
  }
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
      setDiag("Can't reach the relay (" + SERVER.replace("https://", "") + "). Check your connection.");
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
    throw new Error("This tab blocks encryption. Open https://example.com in a new tab and paste the script there.");
  }
}

function showHelp() {
  const steps = [
    "Your Account Vault encrypts your profile, contacts, and room passwords with one Master Password.",
    "Click 'Export Vault' (📤) to copy your encrypted profile string and import it onto any other device.",
    "Customize your workspace palette using the Custom Studio color pickers under Themes & Colors (🎨).",
    "Use **bold**, *italic*, ~strike~, `inline code`, or ```code blocks``` in your messages.",
    "Click 📞 Call in any DM to start an animated, high-fidelity WebRTC voice call."
  ];
  const shortcuts = [
    ["Alt + N", "Start a new Direct Message"],
    ["Alt + G", "Create or join a Group"],
    ["Ctrl + K", "Focus chat search box"],
    ["Esc", "Close dialog / cancel reply / clear search"]
  ];
  const scList = el("div", { style: "display:grid;gap:6px;margin-top:8px" },
    ...shortcuts.map(([k, desc]) => el("div", { style: "display:flex;justify-content:space-between;font-size:.78rem;color:var(--muted)" },
      el("span", { className: "kbd", textContent: k }),
      el("span", { textContent: desc })
    ))
  );
  const box = el("div", { className: "modal" },
    el("h2", { textContent: "Kairo v1.5.2 Guide", style: "margin-bottom:8px" }),
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
    el("h2", { textContent: "Your Profile & Presence ◉", style: "margin-bottom:6px" }),
    el("p", { textContent: "Customize how others see you in chats. Saved inside your encrypted vault." })
  );
  const nameInp = el("input", { type: "text", value: me.name, maxLength: 20 });
  const avInp = el("input", { type: "text", value: me.avatar || "", placeholder: "Emoji or initials (e.g. ⚡, 🐉, AK)", maxLength: 4 });
  const bioInp = el("input", { type: "text", value: me.bio || "", placeholder: "What are you up to?", maxLength: 50 });
  const stSel = el("select", {},
    el("option", { value: "online", textContent: "🟢 Online" }),
    el("option", { value: "idle", textContent: "🌙 Idle / Away" }),
    el("option", { value: "dnd", textContent: "⛔ Do Not Disturb" }),
    el("option", { value: "invisible", textContent: "👻 Invisible (Pauses pings, saves daily quota)" })
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
  modal("New Direct Message",
    "Type their name and agree on a shared password. Your Vault will remember this chat and its key.",
    [{ id: "f", label: "Their name", max: 20 }, { id: "p", label: "Shared password", type: "password" }], "Start DM",
    (v) => createChat("dm", v.f, v.p));
}
function startGroup() {
  if (!vaultKey) return promptVaultLogin();
  modal("New or Existing Group",
    "Pick a group name, optional group emoji avatar, and shared password.",
    [
      { id: "f", label: "Group name", max: 40 },
      { id: "i", label: "Group Avatar Emoji (optional, e.g. 🎮, 🔥)", max: 4 },
      { id: "p", label: "Group password", type: "password" }
    ], "Create / Join",
    (v) => createChat("group", v.f, v.p, v.i));
}

async function dispatchMediaMessage(imgBase64, audioBase64) {
  const r = rooms.get(activeTopic);
  if (!r || !r.key) return;
  const id = rnd();
  const replyPayload = replyingTo ? Object.assign({}, replyingTo) : null;
  try {
    await post(r, "m", { id, text: "", img: imgBase64, audio: audioBase64, replyTo: replyPayload });
  } catch (err) {
    addSystem("Couldn't send media: " + (err && err.message ? err.message : "network error"));
    return;
  }
  r.seen.add(id);
  const rec = { id, who: me.name, authorId: me.id, av: me.avatar || "", text: "", img: imgBase64, audio: audioBase64, mine: true, read: false, time: Date.now(), replyTo: replyPayload, reactions: {} };
  r.store.msgs.push(rec);
  if (r.store.msgs.length > 300) r.store.msgs = r.store.msgs.slice(-300);
  persistRoom(r);
  setReply(null);
  userScrolledUp = false;
  renderChatLog(false);
  scrollToBottom(true);
  renderSidebar();
}

async function sendMessage(e) {
  if (e) e.preventDefault();
  const r = rooms.get(activeTopic);
  const input = $("msg");
  if (!input) return;
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
  const rec = { id, who: me.name, authorId: me.id, av: me.avatar || "", text, mine: true, read: false, time: Date.now(), replyTo: replyPayload, reactions: {} };
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
}

$("btnCall").onclick = startCall;

$("filePicker").onchange = async (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  try {
    toast("Compressing photo...");
    const compressed = await compressImage(file);
    await dispatchMediaMessage(compressed, null);
  } catch (ex) {
    toast("Failed to load photo: " + (ex.message || "error"));
  } finally {
    e.target.value = "";
  }
};

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
$("exportVaultBtn").onclick = exportVaultString;
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
  if (es) { es.close(); es = null; }
  if (adminFeed) { adminFeed.close(); adminFeed = null; }
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
checkForUpdate();
startAdminFeed();

})();