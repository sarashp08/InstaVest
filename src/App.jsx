import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root { --gold: #f59e0b; --gold-light: #fbbf24; --gold-dark: #d97706; --green: #10b981; --red: #ef4444; }
  .dark { --bg:#08080f; --bg2:#0f0f1a; --card:#13131f; --card2:#1a1a2e; --border:rgba(255,255,255,0.07); --text:#f0f0f5; --text2:#9090a8; --text3:#55556a; --pill:rgba(255,255,255,0.06); --pill-text:#b0b0c8; }
  .light { --bg:#f5f4ef; --bg2:#eeedea; --card:#ffffff; --card2:#f8f8f5; --border:rgba(0,0,0,0.08); --text:#12120f; --text2:#5a5a50; --text3:#aaaaaa; --pill:rgba(0,0,0,0.06); --pill-text:#444440; }
  body { font-family:'DM Sans',sans-serif; }
  .app { background:var(--bg); min-height:100vh; color:var(--text); transition:background 0.3s,color 0.3s; }

  /* NAV */
  .nav { position:fixed; top:0; left:0; right:0; z-index:100; display:flex; align-items:center; justify-content:space-between; padding:0 24px; height:60px; background:var(--bg); border-bottom:1px solid var(--border); backdrop-filter:blur(20px); }
  .nav-logo { font-family:'Syne',sans-serif; font-weight:800; font-size:22px; letter-spacing:-0.5px; background:linear-gradient(135deg,var(--gold),var(--gold-light)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; cursor:pointer; }
  .nav-logo span { color:var(--text); -webkit-text-fill-color:var(--text); }
  .nav-right { display:flex; align-items:center; gap:10px; }
  .theme-btn { background:var(--pill); border:1px solid var(--border); color:var(--text2); border-radius:20px; padding:6px 14px; cursor:pointer; font-size:13px; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
  .theme-btn:hover { background:var(--card2); }
  .nav-tabs { display:flex; gap:4px; }
  .nav-tab { padding:6px 14px; border-radius:20px; font-size:13px; font-family:'DM Sans',sans-serif; cursor:pointer; border:1px solid transparent; transition:all 0.2s; background:transparent; color:var(--text2); }
  .nav-tab.active { background:var(--gold); color:#000; font-weight:600; border-color:var(--gold); }
  .nav-tab:hover:not(.active) { background:var(--pill); color:var(--text); }
  .admin-tab { background:rgba(239,68,68,0.1); color:#ef4444; border-color:rgba(239,68,68,0.3); }
  .admin-tab.active { background:#ef4444; color:#fff; border-color:#ef4444; }
  .admin-tab:hover:not(.active) { background:rgba(239,68,68,0.2); color:#ef4444; }

  /* FEED */
  .feed-container { padding-top:60px; display:flex; justify-content:center; background:var(--bg); min-height:100vh; }
  .feed-center { display:flex; gap:32px; padding:32px 24px; max-width:1100px; width:100%; }
  .feed-phone { flex-shrink:0; width:375px; background:var(--bg2); border-radius:32px; border:1px solid var(--border); overflow:hidden; height:calc(100vh - 124px); position:sticky; top:80px; }
  .feed-scroll { height:100%; overflow-y:scroll; scroll-snap-type:y mandatory; scrollbar-width:none; }
  .feed-scroll::-webkit-scrollbar { display:none; }

  /* VIDEO CARD */
  .video-card { width:100%; height:100%; min-height:calc(100vh - 124px); scroll-snap-align:start; position:relative; display:flex; flex-direction:column; justify-content:flex-end; overflow:hidden; flex-shrink:0; }
  .video-bg { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-size:120px; z-index:0; }
  .video-overlay { position:absolute; inset:0; z-index:1; }
  .video-content { position:relative; z-index:2; padding:20px; }
  .video-tags { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:10px; }
  .video-tag { background:rgba(245,158,11,0.2); color:var(--gold-light); border:1px solid rgba(245,158,11,0.3); padding:3px 10px; border-radius:20px; font-size:11px; font-weight:500; }
  .video-title { font-family:'Syne',sans-serif; font-size:24px; font-weight:800; line-height:1.1; margin-bottom:6px; color:#fff; text-shadow:0 2px 12px rgba(0,0,0,0.5); }
  .video-tagline { font-size:14px; color:rgba(255,255,255,0.75); margin-bottom:14px; line-height:1.4; }
  .video-founder { display:flex; align-items:center; gap:8px; margin-bottom:14px; }
  .founder-avatar { width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:700; color:#000; background:var(--gold); flex-shrink:0; }
  .founder-name { font-size:13px; color:rgba(255,255,255,0.85); font-weight:500; }
  .founder-title-small { font-size:11px; color:rgba(255,255,255,0.55); }
  .funding-bar-wrap { margin-bottom:14px; }
  .funding-bar-row { display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; }
  .funding-label { font-size:11px; color:rgba(255,255,255,0.6); }
  .funding-amount { font-size:13px; font-weight:700; color:#fff; }
  .funding-bar-bg { height:4px; background:rgba(255,255,255,0.15); border-radius:4px; overflow:hidden; }
  .funding-bar-fill { height:100%; border-radius:4px; background:linear-gradient(90deg,var(--gold),var(--gold-light)); transition:width 1s ease; }
  .video-actions { display:flex; gap:8px; margin-bottom:4px; }
  .action-btn { display:flex; align-items:center; gap:5px; padding:8px 14px; border-radius:20px; border:none; font-size:13px; font-weight:600; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; flex:1; justify-content:center; }
  .btn-invest { background:var(--gold); color:#000; }
  .btn-invest:hover { background:var(--gold-light); transform:scale(1.02); }
  .btn-like { background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.2); color:#fff; flex:0; padding:8px 14px; }
  .btn-like.liked { background:rgba(239,68,68,0.3); border-color:#ef4444; color:#fca5a5; }
  .btn-play { background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.25); color:#fff; flex:0; padding:8px 14px; }
  .btn-play:hover { background:rgba(255,255,255,0.25); }
  .ticket-info { text-align:center; font-size:11px; color:rgba(255,255,255,0.45); padding-bottom:4px; }

  /* VIDEO PLAYER MODAL */
  .video-modal { position:fixed; inset:0; z-index:200; background:rgba(0,0,0,0.95); display:flex; align-items:center; justify-content:center; backdrop-filter:blur(10px); }
  .video-player-wrap { width:min(400px,95vw); position:relative; }
  .video-close { position:absolute; top:-44px; right:0; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:#fff; border-radius:20px; padding:6px 16px; cursor:pointer; font-size:13px; font-family:'DM Sans',sans-serif; z-index:10; }
  .video-screen { width:100%; aspect-ratio:9/16; border-radius:24px; overflow:hidden; position:relative; background:#000; }
  .video-screen-bg { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-size:160px; }
  .video-screen-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.2) 60%,transparent 100%); }
  .video-screen-content { position:absolute; bottom:0; left:0; right:0; padding:24px; }
  .video-screen-title { font-family:'Syne',sans-serif; font-size:28px; font-weight:800; color:#fff; margin-bottom:6px; }
  .video-screen-tagline { font-size:14px; color:rgba(255,255,255,0.7); margin-bottom:16px; }
  .video-timer { display:flex; align-items:center; gap:8px; margin-bottom:12px; }
  .video-time-label { font-size:12px; color:rgba(255,255,255,0.6); min-width:32px; }
  .video-progress-bg { flex:1; height:3px; background:rgba(255,255,255,0.2); border-radius:3px; overflow:hidden; }
  .video-progress-fill { height:100%; background:var(--gold); border-radius:3px; transition:width 0.1s linear; }
  .video-controls { display:flex; gap:10px; }
  .video-ctrl-btn { flex:1; padding:10px; border-radius:14px; border:none; font-size:14px; font-weight:600; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
  .video-play-btn { background:var(--gold); color:#000; }
  .video-play-btn:hover { background:var(--gold-light); }
  .video-detail-btn { background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.2); color:#fff; }
  .video-detail-btn:hover { background:rgba(255,255,255,0.25); }
  .video-captions { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); text-align:center; padding:0 20px; pointer-events:none; }
  .video-caption { font-size:18px; font-weight:600; color:#fff; text-shadow:0 2px 16px rgba(0,0,0,0.8); line-height:1.4; opacity:0; transition:opacity 0.5s; }
  .video-caption.visible { opacity:1; }
  .play-pause-overlay { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:60px; height:60px; border-radius:50%; background:rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center; font-size:24px; cursor:pointer; transition:all 0.2s; border:2px solid rgba(255,255,255,0.3); }
  .play-pause-overlay:hover { background:rgba(255,255,255,0.3); }

  /* SIDE PANEL */
  .side-panel { flex:1; min-width:0; }
  .side-header { font-family:'Syne',sans-serif; font-size:28px; font-weight:800; margin-bottom:8px; line-height:1.1; }
  .side-sub { color:var(--text2); font-size:15px; line-height:1.6; margin-bottom:24px; }
  .side-cards { display:flex; flex-direction:column; gap:12px; }
  .side-card { background:var(--card); border:1px solid var(--border); border-radius:16px; padding:16px; transition:border-color 0.2s; }
  .side-card:hover { border-color:rgba(245,158,11,0.3); }
  .side-card-title { font-family:'Syne',sans-serif; font-weight:700; font-size:13px; color:var(--gold); letter-spacing:0.5px; text-transform:uppercase; margin-bottom:10px; }
  .stats-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
  .stat-label { font-size:11px; color:var(--text3); margin-bottom:2px; }
  .stat-value { font-size:16px; font-weight:700; color:var(--text); font-family:'Syne',sans-serif; }
  .scroll-hint { text-align:center; color:var(--text3); font-size:12px; padding:12px 0 4px; animation:bounce 2s infinite; }
  @keyframes bounce { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-4px);} }

  /* DETAIL PAGE */
  .detail-page { padding-top:60px; min-height:100vh; background:var(--bg); }
  .detail-hero { position:relative; height:320px; display:flex; align-items:flex-end; overflow:hidden; }
  .detail-hero-bg { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-size:200px; opacity:0.3; }
  .detail-hero-overlay { position:absolute; inset:0; }
  .detail-hero-content { position:relative; z-index:2; padding:32px; width:100%; }
  .detail-back { position:absolute; top:20px; left:20px; z-index:10; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.15); color:#fff; border-radius:20px; padding:6px 14px; cursor:pointer; font-size:13px; font-family:'DM Sans',sans-serif; backdrop-filter:blur(10px); transition:all 0.2s; }
  .detail-back:hover { background:rgba(0,0,0,0.6); }
  .detail-play-btn { position:absolute; top:20px; right:20px; z-index:10; background:var(--gold); border:none; color:#000; border-radius:20px; padding:6px 16px; cursor:pointer; font-size:13px; font-family:'DM Sans',sans-serif; font-weight:700; transition:all 0.2s; }
  .detail-play-btn:hover { background:var(--gold-light); }
  .detail-tags { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:10px; }
  .detail-tag { background:rgba(245,158,11,0.25); color:var(--gold-light); border:1px solid rgba(245,158,11,0.4); padding:4px 12px; border-radius:20px; font-size:12px; font-weight:500; }
  .detail-name { font-family:'Syne',sans-serif; font-size:40px; font-weight:800; line-height:1; color:#fff; margin-bottom:6px; }
  .detail-tagline { font-size:16px; color:rgba(255,255,255,0.7); }
  .detail-body { max-width:900px; margin:0 auto; padding:32px 24px; }
  .funding-box { background:var(--card); border:1px solid var(--border); border-radius:20px; padding:24px; margin-bottom:24px; }
  .funding-box-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
  .funding-raised { font-family:'Syne',sans-serif; font-size:32px; font-weight:800; color:var(--text); }
  .funding-goal { font-size:14px; color:var(--text2); margin-top:2px; }
  .funding-badge { background:rgba(16,185,129,0.15); color:#10b981; border:1px solid rgba(16,185,129,0.3); padding:6px 14px; border-radius:20px; font-size:13px; font-weight:600; }
  .closed-badge { background:rgba(239,68,68,0.15); color:#ef4444; border:1px solid rgba(239,68,68,0.3); padding:6px 14px; border-radius:20px; font-size:13px; font-weight:600; }
  .funding-bar-big { height:8px; background:var(--bg2); border-radius:8px; overflow:hidden; margin-bottom:12px; }
  .funding-bar-big-fill { height:100%; border-radius:8px; background:linear-gradient(90deg,var(--gold),var(--gold-light)); }
  .funding-meta { display:flex; gap:24px; }
  .funding-meta-label { font-size:11px; color:var(--text3); margin-bottom:2px; }
  .funding-meta-value { font-size:15px; font-weight:700; color:var(--text); }
  .invest-big-btn { width:100%; padding:14px; border-radius:14px; border:none; background:var(--gold); color:#000; font-weight:700; font-size:16px; font-family:'DM Sans',sans-serif; cursor:pointer; margin-top:16px; transition:all 0.2s; }
  .invest-big-btn:hover { background:var(--gold-light); transform:translateY(-1px); }
  .invest-big-btn:disabled { background:var(--text3); color:var(--bg); cursor:not-allowed; transform:none; }
  .section { margin-bottom:24px; }
  .section-title { font-family:'Syne',sans-serif; font-weight:700; font-size:18px; margin-bottom:14px; color:var(--text); display:flex; align-items:center; gap:8px; }
  .section-title::after { content:''; flex:1; height:1px; background:var(--border); }
  .section-card { background:var(--card); border:1px solid var(--border); border-radius:16px; padding:20px; }
  .founder-big { display:flex; gap:16px; align-items:flex-start; }
  .founder-avatar-big { width:60px; height:60px; border-radius:50%; background:var(--gold); display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:800; color:#000; flex-shrink:0; }
  .founder-big-name { font-family:'Syne',sans-serif; font-size:20px; font-weight:700; margin-bottom:2px; }
  .founder-big-role { font-size:13px; color:var(--gold); font-weight:500; margin-bottom:10px; }
  .founder-story { font-size:14px; color:var(--text2); line-height:1.7; }
  .team-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:12px; }
  .team-card { background:var(--card2); border:1px solid var(--border); border-radius:14px; padding:16px; text-align:center; }
  .team-avatar { width:44px; height:44px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:800; color:#000; margin:0 auto 10px; background:var(--gold); }
  .team-name { font-weight:600; font-size:14px; margin-bottom:2px; }
  .team-role { font-size:12px; color:var(--gold); font-weight:500; margin-bottom:4px; }
  .team-bg-text { font-size:11px; color:var(--text3); line-height:1.4; }
  .traction-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  .traction-item { background:var(--card2); border:1px solid var(--border); border-radius:12px; padding:14px; }
  .traction-value { font-family:'Syne',sans-serif; font-size:22px; font-weight:800; color:var(--green); margin-bottom:2px; }
  .traction-label { font-size:12px; color:var(--text3); }
  .financials-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  .fin-item { background:var(--card2); border:1px solid var(--border); border-radius:12px; padding:14px; }
  .fin-value { font-family:'Syne',sans-serif; font-size:20px; font-weight:800; color:var(--text); margin-bottom:2px; }
  .fin-label { font-size:12px; color:var(--text3); }

  /* EXPLORE */
  .explore-page { padding-top:60px; min-height:100vh; }
  .explore-inner { max-width:960px; margin:0 auto; padding:32px 24px; }
  .explore-header { margin-bottom:28px; }
  .explore-title { font-family:'Syne',sans-serif; font-size:32px; font-weight:800; margin-bottom:6px; }
  .explore-sub { color:var(--text2); font-size:15px; }
  .explore-filters { display:flex; gap:8px; margin-bottom:20px; flex-wrap:wrap; }
  .filter-btn { padding:6px 14px; border-radius:20px; font-size:12px; font-family:'DM Sans',sans-serif; cursor:pointer; border:1px solid var(--border); background:var(--card); color:var(--text2); transition:all 0.2s; }
  .filter-btn.active { background:var(--gold); color:#000; border-color:var(--gold); font-weight:600; }
  .filter-btn:hover:not(.active) { border-color:var(--gold); color:var(--gold); }
  .explore-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:16px; }
  .explore-card { background:var(--card); border:1px solid var(--border); border-radius:20px; overflow:hidden; cursor:pointer; transition:all 0.25s; position:relative; }
  .explore-card:hover { transform:translateY(-3px); border-color:rgba(245,158,11,0.4); box-shadow:0 8px 30px rgba(245,158,11,0.1); }
  .explore-card-header { height:120px; display:flex; align-items:center; justify-content:center; font-size:60px; position:relative; overflow:hidden; }
  .explore-card-play { position:absolute; top:8px; left:8px; background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.2); color:#fff; border-radius:20px; padding:3px 10px; font-size:11px; backdrop-filter:blur(4px); }
  .explore-card-body { padding:16px; }
  .explore-card-tags { display:flex; gap:4px; flex-wrap:wrap; margin-bottom:8px; }
  .explore-card-tag { background:var(--pill); color:var(--pill-text); padding:2px 8px; border-radius:20px; font-size:10px; font-weight:500; }
  .explore-card-name { font-family:'Syne',sans-serif; font-weight:700; font-size:17px; margin-bottom:3px; }
  .explore-card-tagline { font-size:12px; color:var(--text2); margin-bottom:12px; }
  .explore-card-bar { height:3px; background:var(--bg2); border-radius:4px; overflow:hidden; margin-bottom:8px; }
  .explore-card-fill { height:100%; border-radius:4px; background:linear-gradient(90deg,var(--gold),var(--gold-light)); }
  .explore-card-meta { display:flex; justify-content:space-between; align-items:center; }
  .explore-card-pct { font-size:13px; font-weight:700; color:var(--gold); }
  .explore-card-ticket { font-size:11px; color:var(--text3); }
  .explore-liked-badge { position:absolute; top:10px; right:10px; background:rgba(239,68,68,0.2); border:1px solid rgba(239,68,68,0.4); color:#fca5a5; border-radius:20px; padding:3px 8px; font-size:11px; }

  /* APPLY */
  .apply-page { padding-top:60px; min-height:100vh; }
  .apply-inner { max-width:600px; margin:0 auto; padding:48px 24px; }
  .apply-title { font-family:'Syne',sans-serif; font-size:36px; font-weight:800; margin-bottom:8px; }
  .apply-sub { color:var(--text2); font-size:16px; line-height:1.6; margin-bottom:36px; }
  .form-group { margin-bottom:20px; }
  .form-label { font-size:13px; font-weight:600; color:var(--text2); margin-bottom:6px; display:block; }
  .form-input { width:100%; padding:12px 16px; border-radius:12px; background:var(--card); border:1px solid var(--border); color:var(--text); font-size:14px; font-family:'DM Sans',sans-serif; outline:none; transition:border-color 0.2s; }
  .form-input:focus { border-color:var(--gold); }
  .form-input::placeholder { color:var(--text3); }
  .form-select { width:100%; padding:12px 16px; border-radius:12px; background:var(--card); border:1px solid var(--border); color:var(--text); font-size:14px; font-family:'DM Sans',sans-serif; outline:none; cursor:pointer; }
  .form-textarea { width:100%; padding:12px 16px; border-radius:12px; background:var(--card); border:1px solid var(--border); color:var(--text); font-size:14px; font-family:'DM Sans',sans-serif; outline:none; resize:vertical; min-height:100px; transition:border-color 0.2s; }
  .form-textarea:focus { border-color:var(--gold); }
  .submit-btn { width:100%; padding:14px; border-radius:14px; border:none; background:var(--gold); color:#000; font-weight:700; font-size:16px; font-family:'DM Sans',sans-serif; cursor:pointer; transition:all 0.2s; }
  .submit-btn:hover { background:var(--gold-light); transform:translateY(-1px); }
  .apply-steps { display:flex; gap:12px; margin-bottom:36px; }
  .apply-step { flex:1; background:var(--card); border:1px solid var(--border); border-radius:14px; padding:14px; text-align:center; }
  .apply-step-num { width:28px; height:28px; border-radius:50%; background:var(--gold); color:#000; font-weight:800; font-size:13px; display:flex; align-items:center; justify-content:center; margin:0 auto 8px; }
  .apply-step-text { font-size:12px; color:var(--text2); line-height:1.4; }
  .success-state { text-align:center; padding:40px 0; }
  .success-icon { font-size:60px; margin-bottom:16px; }
  .success-title { font-family:'Syne',sans-serif; font-size:28px; font-weight:800; margin-bottom:8px; }
  .success-sub { color:var(--text2); font-size:15px; line-height:1.6; }

  /* ADMIN */
  .admin-page { padding-top:60px; min-height:100vh; background:var(--bg); }
  .admin-login { max-width:420px; margin:0 auto; padding:80px 24px; text-align:center; }
  .admin-lock { font-size:48px; margin-bottom:16px; }
  .admin-login-title { font-family:'Syne',sans-serif; font-size:28px; font-weight:800; margin-bottom:6px; }
  .admin-login-sub { color:var(--text2); font-size:14px; margin-bottom:28px; }
  .admin-inner { max-width:1000px; margin:0 auto; padding:32px 24px; }
  .admin-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:28px; }
  .admin-title { font-family:'Syne',sans-serif; font-size:28px; font-weight:800; }
  .admin-sub { color:var(--text2); font-size:14px; margin-top:4px; }
  .admin-tabs { display:flex; gap:8px; margin-bottom:24px; }
  .admin-tab-btn { padding:8px 18px; border-radius:20px; font-size:13px; font-family:'DM Sans',sans-serif; cursor:pointer; border:1px solid var(--border); background:var(--card); color:var(--text2); transition:all 0.2s; }
  .admin-tab-btn.active { background:var(--gold); color:#000; border-color:var(--gold); font-weight:600; }
  .admin-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:24px; }
  .admin-stat { background:var(--card); border:1px solid var(--border); border-radius:14px; padding:16px; }
  .admin-stat-value { font-family:'Syne',sans-serif; font-size:24px; font-weight:800; margin-bottom:2px; }
  .admin-stat-label { font-size:12px; color:var(--text3); }
  .application-card { background:var(--card); border:1px solid var(--border); border-radius:16px; padding:20px; margin-bottom:12px; }
  .app-card-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px; }
  .app-card-name { font-family:'Syne',sans-serif; font-size:18px; font-weight:700; margin-bottom:2px; }
  .app-card-founder { font-size:13px; color:var(--text2); }
  .app-status { padding:4px 12px; border-radius:20px; font-size:12px; font-weight:600; }
  .status-pending { background:rgba(245,158,11,0.15); color:var(--gold); border:1px solid rgba(245,158,11,0.3); }
  .status-approved { background:rgba(16,185,129,0.15); color:#10b981; border:1px solid rgba(16,185,129,0.3); }
  .status-rejected { background:rgba(239,68,68,0.15); color:#ef4444; border:1px solid rgba(239,68,68,0.3); }
  .app-card-details { display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; margin-bottom:14px; }
  .app-detail-label { font-size:11px; color:var(--text3); margin-bottom:2px; }
  .app-detail-value { font-size:14px; font-weight:600; color:var(--text); }
  .app-traction { font-size:13px; color:var(--text2); line-height:1.5; background:var(--bg2); border-radius:10px; padding:10px 12px; margin-bottom:14px; }
  .app-actions { display:flex; gap:8px; }
  .app-approve-btn { flex:1; padding:8px; border-radius:10px; border:none; background:rgba(16,185,129,0.15); color:#10b981; font-weight:600; font-size:13px; font-family:'DM Sans',sans-serif; cursor:pointer; border:1px solid rgba(16,185,129,0.3); transition:all 0.2s; }
  .app-approve-btn:hover { background:rgba(16,185,129,0.25); }
  .app-reject-btn { flex:1; padding:8px; border-radius:10px; border:none; background:rgba(239,68,68,0.1); color:#ef4444; font-weight:600; font-size:13px; font-family:'DM Sans',sans-serif; cursor:pointer; border:1px solid rgba(239,68,68,0.3); transition:all 0.2s; }
  .app-reject-btn:hover { background:rgba(239,68,68,0.2); }
  .app-view-btn { padding:8px 18px; border-radius:10px; border:1px solid var(--border); background:transparent; color:var(--text2); font-size:13px; font-family:'DM Sans',sans-serif; cursor:pointer; transition:all 0.2s; }
  .app-view-btn:hover { border-color:var(--gold); color:var(--gold); }
  .live-startup-card { background:var(--card); border:1px solid var(--border); border-radius:16px; padding:20px; margin-bottom:12px; display:flex; align-items:center; gap:16px; }
  .live-startup-emoji { font-size:36px; }
  .live-startup-info { flex:1; }
  .live-startup-name { font-family:'Syne',sans-serif; font-size:16px; font-weight:700; margin-bottom:2px; }
  .live-startup-meta { font-size:12px; color:var(--text3); }
  .live-startup-bar { flex:1; }
  .live-bar-row { display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px; }
  .live-bar-pct { color:var(--gold); font-weight:700; }
  .live-bar-amount { color:var(--text3); }
  .live-bar-bg { height:6px; background:var(--bg2); border-radius:6px; overflow:hidden; }
  .live-bar-fill { height:100%; border-radius:6px; background:linear-gradient(90deg,var(--gold),var(--gold-light)); }
  .admin-action-btn { padding:7px 16px; border-radius:10px; border:1px solid var(--border); background:transparent; color:var(--text2); font-size:12px; font-family:'DM Sans',sans-serif; cursor:pointer; transition:all 0.2s; }
  .admin-action-btn:hover { border-color:var(--red); color:var(--red); }
  .logout-btn { padding:6px 14px; border-radius:20px; border:1px solid var(--border); background:transparent; color:var(--text2); font-size:13px; font-family:'DM Sans',sans-serif; cursor:pointer; }
`;

const STARTUPS = [
  {
    id: 1, name: "GreenHarvest", tagline: "Farm-to-table in 2 hours",
    sector: ["AgriTech", "D2C", "Sustainability"],
    founderName: "Priya Sharma", founderInitials: "PS", founderTitle: "CEO & Co-founder",
    founderStory: "Ex-IIT Bombay grad with 8 years in supply chain. Lost my grandmother's farm to exploitative middlemen. I'm building what should have existed 20 years ago — direct, transparent, and fast.",
    team: [{ name:"Priya Sharma",role:"CEO",bg:"IIT Bombay, ex-Maersk",initials:"PS"},{ name:"Rahul Nair",role:"CTO",bg:"BITS Pilani, ex-Swiggy",initials:"RN"},{ name:"Anita Joshi",role:"COO",bg:"IIM-A, ex-BigBasket",initials:"AJ"}],
    fundingGoal:5000000, raised:3200000, ticketSize:10000, totalTickets:500, ticketsSold:320,
    traction:[{value:"₹42L",label:"Monthly Revenue"},{value:"23%",label:"MoM Growth"},{value:"12,000",label:"Active Users"},{value:"3",label:"Cities Live"}],
    financials:[{value:"₹5Cr",label:"Current ARR"},{value:"₹50Cr",label:"Target ARR (2026)"},{value:"34%",label:"Gross Margin"},{value:"₹8L",label:"Monthly Burn"}],
    emoji:"🌾", gradient:"linear-gradient(160deg,#064e3b 0%,#065f46 50%,#0f4c2a 100%)",
    pitchScript:["We're GreenHarvest — fresh produce directly from Indian farmers to your doorstep...","...in under 2 hours. No middlemen. No cold storage losses.","We've hit ₹42L monthly revenue with 12,000 happy customers across 3 cities.","Join us. ₹10,000 minimum. Be part of India's food revolution."]
  },
  {
    id: 2, name: "NeuroLearn", tagline: "AI tutors for every Indian child",
    sector: ["EdTech", "AI", "B2C"],
    founderName: "Arjun Mehta", founderInitials: "AM", founderTitle: "Founder & CEO",
    founderStory: "Former IIT Delhi professor frustrated with how 600M children in India lack access to quality education. NeuroLearn uses voice AI to teach in any of 22 Indian languages.",
    team: [{ name:"Arjun Mehta",role:"CEO",bg:"IIT Delhi (PhD), ex-Google AI",initials:"AM"},{ name:"Sneha Rao",role:"CTO",bg:"Stanford MS, ex-OpenAI",initials:"SR"},{ name:"Dev Kapoor",role:"Growth",bg:"ISB, ex-BYJU's",initials:"DK"}],
    fundingGoal:10000000, raised:8500000, ticketSize:5000, totalTickets:2000, ticketsSold:1700,
    traction:[{value:"4.2L",label:"Registered Students"},{value:"68%",label:"30-day Retention"},{value:"22",label:"Languages Supported"},{value:"₹28L",label:"Monthly Revenue"}],
    financials:[{value:"₹3.4Cr",label:"Current ARR"},{value:"₹40Cr",label:"Target ARR (2026)"},{value:"78%",label:"Gross Margin"},{value:"₹12L",label:"Monthly Burn"}],
    emoji:"🧠", gradient:"linear-gradient(160deg,#1e1b4b 0%,#312e81 50%,#3730a3 100%)",
    pitchScript:["Imagine a world where every Indian child has a personal AI tutor...","...that speaks their language. All 22 official Indian languages.","4.2 lakh students. 68% monthly retention. Growing 23% month on month.","Back us. Change the future of 600 million kids."]
  },
  {
    id: 3, name: "MediRural", tagline: "Diagnostics in 30 minutes, anywhere",
    sector: ["HealthTech", "Rural", "B2B"],
    founderName: "Dr. Kavya Reddy", founderInitials: "KR", founderTitle: "CEO & Co-founder",
    founderStory: "AIIMS Delhi doctor who did rural postings and saw people die waiting for basic diagnostics. MediRural deploys portable AI diagnostics labs in tier-3 cities and villages.",
    team: [{ name:"Dr. Kavya Reddy",role:"CEO",bg:"AIIMS Delhi, ex-WHO Fellow",initials:"KR"},{ name:"Vikram Singh",role:"CTO",bg:"IIT Madras, ex-Siemens",initials:"VS"},{ name:"Pooja Iyer",role:"Ops",bg:"IIM-B, ex-Apollo",initials:"PI"}],
    fundingGoal:20000000, raised:5000000, ticketSize:10000, totalTickets:2000, ticketsSold:500,
    traction:[{value:"180",label:"Clinics Deployed"},{value:"2.1L",label:"Tests Conducted"},{value:"94%",label:"Accuracy vs Lab"},{value:"₹18L",label:"Monthly Revenue"}],
    financials:[{value:"₹2.1Cr",label:"Current ARR"},{value:"₹80Cr",label:"Target ARR (2027)"},{value:"61%",label:"Gross Margin"},{value:"₹20L",label:"Monthly Burn"}],
    emoji:"🏥", gradient:"linear-gradient(160deg,#7f1d1d 0%,#991b1b 50%,#b91c1c 100%)",
    pitchScript:["800 million Indians live more than 30km from a diagnostic lab.","We're changing that. MediRural deploys portable AI diagnostics — 30-minute results, village level.","180 clinics. 2.1 lakh tests done. 94% accuracy.","Invest from ₹10,000. Save a life in rural India."]
  },
  {
    id: 4, name: "CarbonZero", tagline: "Carbon credits for every Indian business",
    sector: ["CleanTech", "B2B", "SaaS"],
    founderName: "Nikhil Gupta", founderInitials: "NG", founderTitle: "Co-founder & CEO",
    founderStory: "Ex-McKinsey sustainability consultant who realized India's SMEs have no way to participate in global carbon markets. CarbonZero makes it plug-and-play.",
    team: [{ name:"Nikhil Gupta",role:"CEO",bg:"IIM-C, ex-McKinsey",initials:"NG"},{ name:"Tanvi Shah",role:"CTO",bg:"IIIT Hyderabad, ex-Ola",initials:"TS"},{ name:"Rohan Das",role:"BD",bg:"LSE, ex-Deloitte",initials:"RD"}],
    fundingGoal:15000000, raised:15000000, ticketSize:10000, totalTickets:1500, ticketsSold:1500,
    traction:[{value:"340",label:"SMEs Onboarded"},{value:"₹62L",label:"Monthly Revenue"},{value:"4.2K",label:"Credits Issued"},{value:"48%",label:"MoM Growth"}],
    financials:[{value:"₹7.4Cr",label:"Current ARR"},{value:"₹100Cr",label:"Target ARR (2026)"},{value:"82%",label:"Gross Margin"},{value:"₹15L",label:"Monthly Burn"}],
    emoji:"🌿", gradient:"linear-gradient(160deg,#052e16 0%,#14532d 50%,#166534 100%)",
    pitchScript:["India's carbon market is worth $50 billion. SMEs are locked out.","CarbonZero is the Stripe for carbon credits — plug in, earn, sell.","340 businesses. ₹62L monthly revenue. Round fully subscribed.","This round is CLOSED. Watch for our Series A."]
  },
  {
    id: 5, name: "PayKaro", tagline: "UPI for the unbanked — voice-first payments",
    sector: ["FinTech", "Bharat", "B2C"],
    founderName: "Deepak Tiwari", founderInitials: "DT", founderTitle: "Founder & CEO",
    founderStory: "Ex-NPCI engineer who spent years building UPI infrastructure. 400M Indians still can't use it — they can't read. PayKaro lets you send money by just speaking in Hindi or any regional language.",
    team: [{ name:"Deepak Tiwari",role:"CEO",bg:"IIIT Allahabad, ex-NPCI",initials:"DT"},{ name:"Meera Pillai",role:"CTO",bg:"NIT Trichy, ex-PhonePe",initials:"MP"},{ name:"Sanjay Yadav",role:"Growth",bg:"FMS Delhi, ex-Paytm",initials:"SY"}],
    fundingGoal:8000000, raised:2400000, ticketSize:5000, totalTickets:1600, ticketsSold:480,
    traction:[{value:"8.2L",label:"Active Users"},{value:"₹340Cr",label:"Monthly TPV"},{value:"14",label:"Languages Supported"},{value:"₹19L",label:"Monthly Revenue"}],
    financials:[{value:"₹2.3Cr",label:"Current ARR"},{value:"₹60Cr",label:"Target ARR (2026)"},{value:"71%",label:"Gross Margin"},{value:"₹11L",label:"Monthly Burn"}],
    emoji:"💸", gradient:"linear-gradient(160deg,#1e3a5f 0%,#1e40af 50%,#1d4ed8 100%)",
    pitchScript:["400 million Indians are locked out of digital payments. They can't read.","PayKaro lets you send money by just speaking — in Hindi, Tamil, Bengali, 14 languages.","8.2 lakh users. ₹340 crore monthly transactions.","Back the next fintech giant. Minimum ₹5,000."]
  },
  {
    id: 6, name: "BoltEV", tagline: "EV charging in 90 seconds — for every city",
    sector: ["EV", "CleanTech", "Infra"],
    founderName: "Ranjit Suri", founderInitials: "RS", founderTitle: "CEO & Co-founder",
    founderStory: "20-year auto industry veteran who saw EV adoption stall because of charging anxiety. BoltEV installs battery-swap stations so charging takes 90 seconds, not 90 minutes.",
    team: [{ name:"Ranjit Suri",role:"CEO",bg:"IIT Roorkee, ex-Tata Motors",initials:"RS"},{ name:"Anjali Bose",role:"CTO",bg:"IISc, ex-Ather Energy",initials:"AB"},{ name:"Kiran Reddy",role:"COO",bg:"IIM-L, ex-Flipkart",initials:"KR"}],
    fundingGoal:25000000, raised:9000000, ticketSize:10000, totalTickets:2500, ticketsSold:900,
    traction:[{value:"420",label:"Swap Stations Live"},{value:"18K",label:"Daily Swaps"},{value:"₹54L",label:"Monthly Revenue"},{value:"38%",label:"MoM Growth"}],
    financials:[{value:"₹6.5Cr",label:"Current ARR"},{value:"₹200Cr",label:"Target ARR (2027)"},{value:"58%",label:"Gross Margin"},{value:"₹35L",label:"Monthly Burn"}],
    emoji:"⚡", gradient:"linear-gradient(160deg,#1c1917 0%,#292524 50%,#44403c 100%)",
    pitchScript:["EV adoption is stuck. Charging takes 90 minutes. Nobody wants that.","BoltEV solves it with battery-swap stations — 90 seconds and you're gone.","420 stations. 18,000 daily swaps. Growing 38% every month.","Invest in India's EV future. ₹10,000 minimum."]
  },
  {
    id: 7, name: "SheLeads", tagline: "Microloans for 100M women entrepreneurs",
    sector: ["FinTech", "Women", "Impact"],
    founderName: "Fatima Khan", founderInitials: "FK", founderTitle: "Founder & CEO",
    founderStory: "Microfinance veteran with 12 years on the ground in Bihar and UP. 100M women run informal businesses in India with zero access to credit. SheLeads gives them digital microloans in 4 hours.",
    team: [{ name:"Fatima Khan",role:"CEO",bg:"XLRI, ex-Grameen Bank",initials:"FK"},{ name:"Rohit Mishra",role:"CTO",bg:"IIT BHU, ex-CRED",initials:"RM"},{ name:"Preethi Kumar",role:"Risk",bg:"IIM-K, ex-HDFC",initials:"PK"}],
    fundingGoal:12000000, raised:7200000, ticketSize:5000, totalTickets:2400, ticketsSold:1440,
    traction:[{value:"1.2L",label:"Women Borrowers"},{value:"0.8%",label:"Default Rate"},{value:"₹48L",label:"Monthly Revenue"},{value:"₹940Cr",label:"Loans Disbursed"}],
    financials:[{value:"₹5.8Cr",label:"Current ARR"},{value:"₹75Cr",label:"Target ARR (2026)"},{value:"68%",label:"Gross Margin"},{value:"₹14L",label:"Monthly Burn"}],
    emoji:"💪", gradient:"linear-gradient(160deg,#4c0519 0%,#881337 50%,#9f1239 100%)",
    pitchScript:["1.2 lakh women. All running businesses. All denied credit by banks.","SheLeads gives them microloans in 4 hours. Digitally. No collateral.","₹940 crore disbursed. 0.8% default rate. We know what we're doing.","Invest from ₹5,000 and back India's most powerful untapped economy."]
  },
  {
    id: 8, name: "SpaceFarm", tagline: "Vertical farms inside shipping containers",
    sector: ["AgriTech", "FoodTech", "Sustainability"],
    founderName: "Arun Krishnan", founderInitials: "AK", founderTitle: "Co-founder & CEO",
    founderStory: "NASA researcher-turned-entrepreneur. We grow 3x more food in 10x less space using AI-controlled vertical farms that fit inside shipping containers. Deploying across Indian Tier-2 cities.",
    team: [{ name:"Arun Krishnan",role:"CEO",bg:"IISc + NASA Fellowship",initials:"AK"},{ name:"Divya Menon",role:"CTO",bg:"BITS + ex-Infosys AI",initials:"DM"},{ name:"Siddharth Roy",role:"CFO",bg:"IIM-A, ex-Goldman",initials:"SR"}],
    fundingGoal:18000000, raised:3600000, ticketSize:10000, totalTickets:1800, ticketsSold:360,
    traction:[{value:"24",label:"Containers Deployed"},{value:"3.2T",label:"Produce/Month"},{value:"₹22L",label:"Monthly Revenue"},{value:"8",label:"Restaurant Chains"}],
    financials:[{value:"₹2.6Cr",label:"Current ARR"},{value:"₹120Cr",label:"Target ARR (2027)"},{value:"52%",label:"Gross Margin"},{value:"₹28L",label:"Monthly Burn"}],
    emoji:"🚀", gradient:"linear-gradient(160deg,#0f172a 0%,#1e293b 50%,#0f4c75 100%)",
    pitchScript:["What if we could grow fresh food anywhere — with no soil, no seasons, no land?","SpaceFarm uses NASA-derived tech inside shipping containers.","24 farms live. 3.2 tonnes of produce monthly. 8 restaurant chains as customers.","Join us from ₹10,000 and be part of the future of food."]
  },
];

const INITIAL_APPLICATIONS = [
  { id:101, company:"HealthSync AI", founder:"Dr. Aditya Patel", email:"aditya@healthsync.in", sector:"HealthTech", raise:"₹1,50,00,000", traction:"12,000 doctors onboarded. ₹8L MRR. Piloting with Apollo and Manipal hospitals. Looking to expand to 50 cities.", status:"pending", date:"24 Feb 2026" },
  { id:102, company:"WasteWise", founder:"Neha Sharma", email:"neha@wastewise.in", sector:"CleanTech", raise:"₹75,00,000", traction:"Pre-revenue. Have LOIs from 3 Tier-2 municipal corporations. Pilot starting March.", status:"pending", date:"23 Feb 2026" },
  { id:103, company:"LogiBot", founder:"Saurabh Mishra", email:"saurabh@logibot.in", sector:"Logistics", raise:"₹2,00,00,000", traction:"₹18L MRR. Serving 40 D2C brands. 99.2% on-time delivery rate. Looking to build proprietary fleet.", status:"pending", date:"22 Feb 2026" },
  { id:104, company:"TutorMitra", founder:"Riya Kapoor", email:"riya@tutormitra.in", sector:"EdTech", raise:"₹50,00,000", traction:"Just launched. 800 sign-ups in first week from organic. First-time founder.", status:"rejected", date:"20 Feb 2026" },
  { id:105, company:"ColdChainX", founder:"Aman Verma", email:"aman@coldchainx.in", sector:"AgriTech", raise:"₹3,00,00,000", traction:"₹32L MRR. 180 farmers. 24 cold storage hubs. Partnered with Mother Dairy.", status:"approved", date:"18 Feb 2026" },
];

function formatCurrency(amount) {
  if (amount >= 10000000) return `₹${(amount/10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `₹${(amount/100000).toFixed(1)}L`;
  return `₹${amount.toLocaleString('en-IN')}`;
}

// ── VIDEO PLAYER MODAL ──────────────────────────────────────────────
function VideoPlayerModal({ startup, onClose, onDetail }) {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [captionIdx, setCaptionIdx] = useState(0);
  const DURATION = 45;
  const intervalRef = useRef(null);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setElapsed(e => {
          const next = e + 0.1;
          if (next >= DURATION) { setPlaying(false); clearInterval(intervalRef.current); return DURATION; }
          return next;
        });
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing]);

  useEffect(() => {
    const idx = Math.min(Math.floor((elapsed / DURATION) * startup.pitchScript.length), startup.pitchScript.length - 1);
    setCaptionIdx(idx);
  }, [elapsed, startup.pitchScript.length]);

  const pct = (elapsed / DURATION) * 100;
  const timeLeft = Math.max(0, Math.ceil(DURATION - elapsed));

  function reset() { setElapsed(0); setPlaying(false); setCaptionIdx(0); }

  return (
    <div className="video-modal" onClick={onClose}>
      <div className="video-player-wrap" onClick={e => e.stopPropagation()}>
        <button className="video-close" onClick={onClose}>✕ Close</button>
        <div className="video-screen">
          <div className="video-screen-bg" style={{ background: startup.gradient }}>{startup.emoji}</div>
          <div className="video-screen-overlay" />

          {/* Captions */}
          <div className="video-captions">
            {startup.pitchScript.map((line, i) => (
              <div key={i} className={`video-caption ${captionIdx === i && playing ? "visible" : ""}`}>
                {line}
              </div>
            ))}
            {!playing && elapsed === 0 && (
              <div style={{ color:"rgba(255,255,255,0.6)", fontSize:"14px" }}>Tap play to watch the 45s pitch</div>
            )}
            {!playing && elapsed >= DURATION && (
              <div style={{ color:"#fff", fontSize:"16px", fontWeight:700 }}>Pitch Complete! 🎉</div>
            )}
          </div>

          {/* Play/Pause overlay */}
          <div className="play-pause-overlay" onClick={() => elapsed >= DURATION ? reset() : setPlaying(p => !p)}>
            {elapsed >= DURATION ? "↺" : playing ? "⏸" : "▶"}
          </div>

          <div className="video-screen-content">
            <div className="video-screen-title">{startup.name}</div>
            <div className="video-screen-tagline">{startup.tagline}</div>
            <div className="video-timer">
              <span className="video-time-label">{playing ? `${timeLeft}s` : elapsed > 0 ? `${timeLeft}s` : "0:45"}</span>
              <div className="video-progress-bg">
                <div className="video-progress-fill" style={{ width:`${pct}%` }} />
              </div>
            </div>
            <div className="video-controls">
              <button className="video-ctrl-btn video-play-btn" onClick={() => elapsed >= DURATION ? reset() : setPlaying(p => !p)}>
                {elapsed >= DURATION ? "↺ Replay" : playing ? "⏸ Pause" : "▶ Play Pitch"}
              </button>
              <button className="video-ctrl-btn video-detail-btn" onClick={() => { onClose(); onDetail(startup); }}>
                View Full Pitch ↗
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── VIDEO CARD ──────────────────────────────────────────────────────
function VideoCard({ startup, liked, onLike, onDetail, onPlay }) {
  const pct = Math.round((startup.raised / startup.fundingGoal) * 100);
  const isClosed = startup.raised >= startup.fundingGoal;
  const ticketsLeft = startup.totalTickets - startup.ticketsSold;
  return (
    <div className="video-card">
      <div className="video-bg" style={{ background: startup.gradient }}>{startup.emoji}</div>
      <div className="video-overlay" style={{ background:"linear-gradient(to top,rgba(0,0,0,0.92) 0%,rgba(0,0,0,0.4) 60%,transparent 100%)" }} />
      <div className="video-content">
        <div className="video-tags">{startup.sector.map(s => <span key={s} className="video-tag">{s}</span>)}</div>
        <div className="video-title">{startup.name}</div>
        <div className="video-tagline">{startup.tagline}</div>
        <div className="video-founder">
          <div className="founder-avatar">{startup.founderInitials}</div>
          <div>
            <div className="founder-name">{startup.founderName}</div>
            <div className="founder-title-small">{startup.founderTitle}</div>
          </div>
        </div>
        <div className="funding-bar-wrap">
          <div className="funding-bar-row">
            <span className="funding-label">{isClosed ? "Round Closed 🎉" : `${pct}% funded`}</span>
            <span className="funding-amount">{formatCurrency(startup.raised)} / {formatCurrency(startup.fundingGoal)}</span>
          </div>
          <div className="funding-bar-bg"><div className="funding-bar-fill" style={{ width:`${Math.min(pct,100)}%` }} /></div>
        </div>
        <div className="video-actions">
          <button className="action-btn btn-play" onClick={() => onPlay(startup)}>▶ Watch 45s</button>
          <button className="action-btn btn-invest" onClick={() => onDetail(startup)}>View Pitch ↗</button>
          <button className={`action-btn btn-like ${liked ? "liked" : ""}`} onClick={() => onLike(startup.id)}>{liked ? "❤️" : "🤍"}</button>
        </div>
        <div className="ticket-info">{isClosed ? "No tickets remaining" : `${ticketsLeft} tickets left · Min ₹${startup.ticketSize.toLocaleString('en-IN')}`}</div>
      </div>
    </div>
  );
}

// ── FEED PAGE ───────────────────────────────────────────────────────
function FeedPage({ onDetail, liked, onLike, onPlay }) {
  return (
    <div className="feed-container">
      <div className="feed-center">
        <div style={{ display:"flex", flexDirection:"column" }}>
          <div className="feed-phone">
            <div className="feed-scroll">
              {STARTUPS.map(s => <VideoCard key={s.id} startup={s} liked={liked.has(s.id)} onLike={onLike} onDetail={onDetail} onPlay={onPlay} />)}
            </div>
          </div>
          <div className="scroll-hint">↕ Scroll to explore pitches</div>
        </div>
        <div className="side-panel">
          <div className="side-header">Discover India's<br />next big startups.</div>
          <div className="side-sub">Watch 45-second pitches. Back the ones you believe in. Start from ₹5,000 and become part of India's startup revolution.</div>
          <div className="side-cards">
            <div className="side-card">
              <div className="side-card-title">📊 Platform Stats</div>
              <div className="stats-grid">
                <div><div className="stat-label">Startups Live</div><div className="stat-value">8</div></div>
                <div><div className="stat-label">Total Raised</div><div className="stat-value">₹5.4Cr</div></div>
                <div><div className="stat-label">Avg Ticket</div><div className="stat-value">₹7,500</div></div>
                <div><div className="stat-label">Active Investors</div><div className="stat-value">4,820</div></div>
              </div>
            </div>
            <div className="side-card">
              <div className="side-card-title">🔥 Trending Now</div>
              {STARTUPS.slice(0,4).map(s => {
                const pct = Math.round((s.raised/s.fundingGoal)*100);
                return (
                  <div key={s.id} onClick={() => onDetail(s)} style={{ display:"flex",alignItems:"center",gap:"12px",padding:"8px 0",borderBottom:"1px solid var(--border)",cursor:"pointer" }}>
                    <span style={{ fontSize:"22px" }}>{s.emoji}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:600,fontSize:"14px" }}>{s.name}</div>
                      <div style={{ fontSize:"12px",color:"var(--text3)" }}>{pct}% funded</div>
                    </div>
                    <span style={{ fontSize:"13px",color:"var(--gold)",fontWeight:700 }}>→</span>
                  </div>
                );
              })}
            </div>
            <div className="side-card">
              <div className="side-card-title">💡 How It Works</div>
              {[["1","Watch 45-second pitches in your feed"],["2","Like the ones you believe in"],["3","Invest from ₹5,000 per ticket"],["4","Round closes when target is met"]].map(([n,t]) => (
                <div key={n} style={{ display:"flex",gap:"10px",alignItems:"flex-start",marginBottom:"10px" }}>
                  <div style={{ width:"22px",height:"22px",borderRadius:"50%",background:"var(--gold)",color:"#000",fontWeight:800,fontSize:"11px",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:"1px" }}>{n}</div>
                  <div style={{ fontSize:"13px",color:"var(--text2)",lineHeight:1.5 }}>{t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── DETAIL PAGE ─────────────────────────────────────────────────────
function DetailPage({ startup, onBack, liked, onLike, onPlay }) {
  const pct = Math.round((startup.raised/startup.fundingGoal)*100);
  const isClosed = startup.raised >= startup.fundingGoal;
  const ticketsLeft = startup.totalTickets - startup.ticketsSold;
  const [invested, setInvested] = useState(false);
  return (
    <div className="detail-page">
      <div className="detail-hero" style={{ background: startup.gradient }}>
        <div className="detail-hero-bg">{startup.emoji}</div>
        <div className="detail-hero-overlay" style={{ background:"linear-gradient(to top,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.1) 100%)" }} />
        <button className="detail-back" onClick={onBack}>← Back</button>
        <button className="detail-play-btn" onClick={() => onPlay(startup)}>▶ Watch 45s Pitch</button>
        <div className="detail-hero-content">
          <div className="detail-tags">{startup.sector.map(s => <span key={s} className="detail-tag">{s}</span>)}</div>
          <div className="detail-name">{startup.name}</div>
          <div className="detail-tagline">{startup.tagline}</div>
        </div>
      </div>
      <div className="detail-body">
        <div className="funding-box">
          <div className="funding-box-header">
            <div><div className="funding-raised">{formatCurrency(startup.raised)}</div><div className="funding-goal">of {formatCurrency(startup.fundingGoal)} goal</div></div>
            {isClosed ? <div className="closed-badge">🔒 Round Closed</div> : <div className="funding-badge">🟢 Round Open</div>}
          </div>
          <div className="funding-bar-big"><div className="funding-bar-big-fill" style={{ width:`${Math.min(pct,100)}%` }} /></div>
          <div className="funding-meta">
            <div><div className="funding-meta-label">Funded</div><div className="funding-meta-value">{pct}%</div></div>
            <div><div className="funding-meta-label">Tickets Left</div><div className="funding-meta-value">{ticketsLeft}</div></div>
            <div><div className="funding-meta-label">Min Ticket</div><div className="funding-meta-value">₹{startup.ticketSize.toLocaleString('en-IN')}</div></div>
            <div><div className="funding-meta-label">Investors</div><div className="funding-meta-value">{startup.ticketsSold}</div></div>
          </div>
          {invested
            ? <div style={{ background:"rgba(16,185,129,0.1)",border:"1px solid rgba(16,185,129,0.3)",borderRadius:"12px",padding:"14px",textAlign:"center",marginTop:"16px",color:"#10b981",fontWeight:600,fontSize:"15px" }}>✅ Expression of Interest Registered! The team will contact you shortly.</div>
            : <button className="invest-big-btn" onClick={() => setInvested(true)} disabled={isClosed}>{isClosed ? "Round Closed" : `Express Interest — ₹${startup.ticketSize.toLocaleString('en-IN')} Min`}</button>
          }
        </div>
        <div className="section"><div className="section-title">Founder Story</div>
          <div className="section-card"><div className="founder-big">
            <div className="founder-avatar-big">{startup.founderInitials}</div>
            <div><div className="founder-big-name">{startup.founderName}</div><div className="founder-big-role">{startup.founderTitle}</div><div className="founder-story">{startup.founderStory}</div></div>
          </div></div>
        </div>
        <div className="section"><div className="section-title">Traction</div>
          <div className="traction-grid">{startup.traction.map((t,i) => <div key={i} className="traction-item"><div className="traction-value">{t.value}</div><div className="traction-label">{t.label}</div></div>)}</div>
        </div>
        <div className="section"><div className="section-title">Financials</div>
          <div className="financials-grid">{startup.financials.map((f,i) => <div key={i} className="fin-item"><div className="fin-value">{f.value}</div><div className="fin-label">{f.label}</div></div>)}</div>
        </div>
        <div className="section"><div className="section-title">The Team</div>
          <div className="team-grid">{startup.team.map((m,i) => (
            <div key={i} className="team-card">
              <div className="team-avatar">{m.initials}</div>
              <div className="team-name">{m.name}</div>
              <div className="team-role">{m.role}</div>
              <div className="team-bg-text">{m.bg}</div>
            </div>
          ))}</div>
        </div>
        <div style={{ textAlign:"center",padding:"20px 0 40px" }}>
          <button onClick={() => onLike(startup.id)} style={{ background:liked?"rgba(239,68,68,0.15)":"var(--card)",border:liked?"1px solid rgba(239,68,68,0.4)":"1px solid var(--border)",color:liked?"#fca5a5":"var(--text2)",padding:"10px 28px",borderRadius:"20px",cursor:"pointer",fontSize:"14px",fontFamily:"'DM Sans',sans-serif",fontWeight:600,transition:"all 0.2s" }}>
            {liked ? "❤️ Saved to Watchlist" : "🤍 Save to Watchlist"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── EXPLORE PAGE ────────────────────────────────────────────────────
function ExplorePage({ onDetail, liked, onLike, onPlay }) {
  const [filter, setFilter] = useState("All");
  const sectors = ["All","AgriTech","EdTech","FinTech","HealthTech","CleanTech","EV","Impact"];
  const filtered = filter === "All" ? STARTUPS : STARTUPS.filter(s => s.sector.some(x => x.toLowerCase().includes(filter.toLowerCase())));
  return (
    <div className="explore-page">
      <div className="explore-inner">
        <div className="explore-header"><div className="explore-title">All Startups</div><div className="explore-sub">Browse active funding rounds. Tap any card to see the full pitch.</div></div>
        <div className="explore-filters">
          {sectors.map(s => <button key={s} className={`filter-btn ${filter===s?"active":""}`} onClick={() => setFilter(s)}>{s}</button>)}
        </div>
        <div className="explore-grid">
          {filtered.map(s => {
            const pct = Math.round((s.raised/s.fundingGoal)*100);
            const isClosed = s.raised >= s.fundingGoal;
            return (
              <div key={s.id} className="explore-card" onClick={() => onDetail(s)}>
                {liked.has(s.id) && <div className="explore-liked-badge">❤️ Saved</div>}
                <div className="explore-card-header" style={{ background:s.gradient }}>
                  <span style={{ fontSize:"60px" }}>{s.emoji}</span>
                  <div className="explore-card-play" onClick={e => { e.stopPropagation(); onPlay(s); }}>▶ 45s</div>
                </div>
                <div className="explore-card-body">
                  <div className="explore-card-tags">{s.sector.map(t => <span key={t} className="explore-card-tag">{t}</span>)}</div>
                  <div className="explore-card-name">{s.name}</div>
                  <div className="explore-card-tagline">{s.tagline}</div>
                  <div className="explore-card-bar"><div className="explore-card-fill" style={{ width:`${Math.min(pct,100)}%` }} /></div>
                  <div className="explore-card-meta">
                    <span className="explore-card-pct">{pct}% {isClosed?"🔒 Closed":"funded"}</span>
                    <span className="explore-card-ticket">Min ₹{s.ticketSize.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── APPLY PAGE ──────────────────────────────────────────────────────
function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ company:"",founder:"",email:"",sector:"",raise:"",traction:"" });
  if (submitted) return (
    <div className="apply-page"><div className="apply-inner"><div className="success-state">
      <div className="success-icon">🎉</div>
      <div className="success-title">Application Submitted!</div>
      <div className="success-sub">We've received your application for <strong>{form.company}</strong>. Our team reviews all applications within 5–7 business days. If selected, we'll schedule a 30-minute call to discuss your pitch.</div>
    </div></div></div>
  );
  return (
    <div className="apply-page"><div className="apply-inner">
      <div className="apply-title">Apply to Raise on InstaVest</div>
      <div className="apply-sub">If selected, you'll record a 45-second pitch video and go live to thousands of investors across India.</div>
      <div className="apply-steps">
        {[["1","Apply below"],["2","Review (5–7 days)"],["3","Record 45s pitch"],["4","Go live"]].map(([n,t]) => (
          <div key={n} className="apply-step"><div className="apply-step-num">{n}</div><div className="apply-step-text">{t}</div></div>
        ))}
      </div>
      {[["Company Name","company","e.g. GreenHarvest"],["Founder Name","founder","Your full name"],["Email","email","you@startup.in"]].map(([label,key,ph]) => (
        <div key={key} className="form-group"><label className="form-label">{label}</label>
          <input className="form-input" placeholder={ph} type={key==="email"?"email":"text"} value={form[key]} onChange={e => setForm({...form,[key]:e.target.value})} />
        </div>
      ))}
      <div className="form-group"><label className="form-label">Sector</label>
        <select className="form-select" value={form.sector} onChange={e => setForm({...form,sector:e.target.value})}>
          <option value="">Select sector</option>
          {["AgriTech","EdTech","FinTech","HealthTech","CleanTech","EV","D2C","SaaS","AI/ML","Impact","Other"].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="form-group"><label className="form-label">How much are you looking to raise?</label>
        <input className="form-input" placeholder="e.g. ₹1,00,00,000" value={form.raise} onChange={e => setForm({...form,raise:e.target.value})} />
      </div>
      <div className="form-group"><label className="form-label">Current traction / stage</label>
        <textarea className="form-textarea" placeholder="Tell us about revenue, users, growth..." value={form.traction} onChange={e => setForm({...form,traction:e.target.value})} />
      </div>
      <button className="submit-btn" onClick={() => { if(form.company && form.email) setSubmitted(true); }}>Submit Application →</button>
    </div></div>
  );
}

// ── ADMIN PAGE ──────────────────────────────────────────────────────
function AdminPage({ onLogout }) {
  const [tab, setTab] = useState("applications");
  const [apps, setApps] = useState(INITIAL_APPLICATIONS);

  function approve(id) { setApps(a => a.map(x => x.id===id ? {...x,status:"approved"} : x)); }
  function reject(id) { setApps(a => a.map(x => x.id===id ? {...x,status:"rejected"} : x)); }

  const pending = apps.filter(a => a.status==="pending");
  const approved = apps.filter(a => a.status==="approved");
  const rejected = apps.filter(a => a.status==="rejected");

  const totalRaised = STARTUPS.reduce((s,x) => s + x.raised, 0);

  return (
    <div className="admin-page">
      <div className="admin-inner">
        <div className="admin-header">
          <div>
            <div className="admin-title">🛡️ Admin Panel</div>
            <div className="admin-sub">Manage startup applications and live rounds</div>
          </div>
          <button className="logout-btn" onClick={onLogout}>← Exit Admin</button>
        </div>

        <div className="admin-stats">
          <div className="admin-stat"><div className="admin-stat-value" style={{ color:"var(--gold)" }}>{pending.length}</div><div className="admin-stat-label">Pending Review</div></div>
          <div className="admin-stat"><div className="admin-stat-value" style={{ color:"var(--green)" }}>{STARTUPS.length}</div><div className="admin-stat-label">Live Startups</div></div>
          <div className="admin-stat"><div className="admin-stat-value">{formatCurrency(totalRaised)}</div><div className="admin-stat-label">Total Raised</div></div>
          <div className="admin-stat"><div className="admin-stat-value">{approved.length}</div><div className="admin-stat-label">Approved This Month</div></div>
        </div>

        <div className="admin-tabs">
          {[["applications",`Applications (${pending.length} pending)`],["live","Live Rounds"]].map(([key,label]) => (
            <button key={key} className={`admin-tab-btn ${tab===key?"active":""}`} onClick={() => setTab(key)}>{label}</button>
          ))}
        </div>

        {tab === "applications" && (
          <div>
            {pending.length > 0 && <div style={{ fontSize:"13px",fontWeight:700,color:"var(--gold)",marginBottom:"12px",textTransform:"uppercase",letterSpacing:"0.5px" }}>⏳ Pending Review</div>}
            {pending.map(app => <AppCard key={app.id} app={app} onApprove={approve} onReject={reject} />)}
            {approved.length > 0 && <div style={{ fontSize:"13px",fontWeight:700,color:"var(--green)",marginBottom:"12px",marginTop:"20px",textTransform:"uppercase",letterSpacing:"0.5px" }}>✅ Approved</div>}
            {approved.map(app => <AppCard key={app.id} app={app} onApprove={approve} onReject={reject} />)}
            {rejected.length > 0 && <div style={{ fontSize:"13px",fontWeight:700,color:"var(--red)",marginBottom:"12px",marginTop:"20px",textTransform:"uppercase",letterSpacing:"0.5px" }}>❌ Rejected</div>}
            {rejected.map(app => <AppCard key={app.id} app={app} onApprove={approve} onReject={reject} />)}
          </div>
        )}

        {tab === "live" && (
          <div>
            {STARTUPS.map(s => {
              const pct = Math.round((s.raised/s.fundingGoal)*100);
              const isClosed = s.raised >= s.fundingGoal;
              return (
                <div key={s.id} className="live-startup-card">
                  <div className="live-startup-emoji">{s.emoji}</div>
                  <div className="live-startup-info">
                    <div className="live-startup-name">{s.name}</div>
                    <div className="live-startup-meta">{s.sector.join(" · ")}</div>
                  </div>
                  <div className="live-startup-bar">
                    <div className="live-bar-row">
                      <span className="live-bar-pct">{pct}% {isClosed?"🔒":"funded"}</span>
                      <span className="live-bar-amount">{formatCurrency(s.raised)} / {formatCurrency(s.fundingGoal)}</span>
                    </div>
                    <div className="live-bar-bg"><div className="live-bar-fill" style={{ width:`${Math.min(pct,100)}%` }} /></div>
                  </div>
                  <div style={{ fontSize:"12px",color:"var(--text3)",textAlign:"center",minWidth:"60px" }}>
                    <div style={{ fontWeight:700,color:"var(--text)",fontSize:"14px" }}>{s.ticketsSold}</div>
                    <div>investors</div>
                  </div>
                  {isClosed && <div className="closed-badge" style={{ fontSize:"12px",padding:"4px 10px" }}>Closed</div>}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function AppCard({ app, onApprove, onReject }) {
  const statusClass = { pending:"status-pending", approved:"status-approved", rejected:"status-rejected" }[app.status];
  return (
    <div className="application-card">
      <div className="app-card-header">
        <div><div className="app-card-name">{app.company}</div><div className="app-card-founder">{app.founder} · {app.email}</div></div>
        <div style={{ display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"6px" }}>
          <span className={`app-status ${statusClass}`}>{app.status.charAt(0).toUpperCase()+app.status.slice(1)}</span>
          <span style={{ fontSize:"11px",color:"var(--text3)" }}>{app.date}</span>
        </div>
      </div>
      <div className="app-card-details">
        <div><div className="app-detail-label">Sector</div><div className="app-detail-value">{app.sector}</div></div>
        <div><div className="app-detail-label">Looking to Raise</div><div className="app-detail-value">{app.raise}</div></div>
        <div><div className="app-detail-label">Application ID</div><div className="app-detail-value">#{app.id}</div></div>
      </div>
      <div className="app-traction">📊 {app.traction}</div>
      {app.status === "pending" && (
        <div className="app-actions">
          <button className="app-approve-btn" onClick={() => onApprove(app.id)}>✅ Approve & Onboard</button>
          <button className="app-reject-btn" onClick={() => onReject(app.id)}>❌ Reject</button>
        </div>
      )}
      {app.status !== "pending" && (
        <div style={{ fontSize:"13px",color:"var(--text3)",fontStyle:"italic" }}>
          {app.status === "approved" ? "✅ Approved — startup will be contacted for pitch recording." : "❌ Rejected — rejection email sent to founder."}
        </div>
      )}
    </div>
  );
}

// ── ADMIN LOGIN ─────────────────────────────────────────────────────
function AdminLogin({ onLogin }) {
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState(false);
  function tryLogin() {
    if (pwd === "instavest2026") { onLogin(); }
    else { setErr(true); setTimeout(() => setErr(false), 2000); }
  }
  return (
    <div className="admin-page">
      <div className="admin-login">
        <div className="admin-lock">🛡️</div>
        <div className="admin-login-title">Admin Access</div>
        <div className="admin-login-sub">Enter your admin password to continue</div>
        <div className="form-group">
          <input className="form-input" type="password" placeholder="Admin password" value={pwd} onChange={e => setPwd(e.target.value)} onKeyDown={e => e.key==="Enter" && tryLogin()} style={{ textAlign:"center", borderColor: err?"var(--red)":"" }} />
          {err && <div style={{ color:"var(--red)",fontSize:"12px",marginTop:"6px",textAlign:"center" }}>Incorrect password. Try: instavest2026</div>}
        </div>
        <button className="submit-btn" onClick={tryLogin}>Access Admin Panel →</button>
        <div style={{ fontSize:"12px",color:"var(--text3)",marginTop:"12px" }}>Hint: instavest2026</div>
      </div>
    </div>
  );
}

// ── ROOT APP ────────────────────────────────────────────────────────
export default function InstaVest() {
  const [darkMode, setDarkMode] = useState(true);
  const [page, setPage] = useState("feed");
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [liked, setLiked] = useState(new Set());
  const [playingStartup, setPlayingStartup] = useState(null);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  function handleLike(id) { setLiked(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; }); }
  function handleDetail(startup) { setSelectedStartup(startup); setPage("detail"); }
  function handlePlay(startup) { setPlayingStartup(startup); }
  function handleBack() { setSelectedStartup(null); setPage("feed"); }

  return (
    <>
      <style>{style}</style>
      <div className={`app ${darkMode ? "dark" : "light"}`}>
        <nav className="nav">
          <div className="nav-logo" onClick={() => setPage("feed")}>Insta<span>Vest</span></div>
          <div className="nav-tabs">
            {page === "detail"
              ? <button className="nav-tab" onClick={handleBack}>← Feed</button>
              : <>
                  <button className={`nav-tab ${page==="feed"?"active":""}`} onClick={() => setPage("feed")}>Feed</button>
                  <button className={`nav-tab ${page==="explore"?"active":""}`} onClick={() => setPage("explore")}>Explore</button>
                  <button className={`nav-tab ${page==="apply"?"active":""}`} onClick={() => setPage("apply")}>Raise Capital</button>
                  <button className={`nav-tab admin-tab ${page==="admin"?"active":""}`} onClick={() => setPage("admin")}>Admin</button>
                </>
            }
          </div>
          <div className="nav-right">
            <button className="theme-btn" onClick={() => setDarkMode(d => !d)}>{darkMode ? "☀️ Light" : "🌙 Dark"}</button>
          </div>
        </nav>

        {playingStartup && (
          <VideoPlayerModal startup={playingStartup} onClose={() => setPlayingStartup(null)} onDetail={s => { setPlayingStartup(null); handleDetail(s); }} />
        )}

        {page === "feed" && <FeedPage onDetail={handleDetail} liked={liked} onLike={handleLike} onPlay={handlePlay} />}
        {page === "explore" && <ExplorePage onDetail={handleDetail} liked={liked} onLike={handleLike} onPlay={handlePlay} />}
        {page === "apply" && <ApplyPage />}
        {page === "detail" && selectedStartup && <DetailPage startup={selectedStartup} onBack={handleBack} liked={liked.has(selectedStartup.id)} onLike={handleLike} onPlay={handlePlay} />}
        {page === "admin" && (adminLoggedIn ? <AdminPage onLogout={() => { setAdminLoggedIn(false); setPage("feed"); }} /> : <AdminLogin onLogin={() => setAdminLoggedIn(true)} />)}
      </div>
    </>
  );
}
