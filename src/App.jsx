import { useState, useEffect, useRef } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SECTORS = ["All","EdTech","FinTech","HealthTech","AgriTech","CleanTech","D2C","SaaS","FoodTech"];

const STARTUPS = [
  {
    id:1, name:"Growfast", tagline:"AI-powered micro-loans for kirana stores",
    sector:"FinTech", city:"Mumbai",
    raised:1240000, target:2000000, tickets:248, totalTickets:400, ticketPrice:5000, backers:248,
    trendingScore:95, raisedLast24h:125000,
    founderName:"Priya Sharma", founderRole:"CEO & Co-founder",
    founderBio:"Ex-Razorpay, IIT Bombay. Building credit infrastructure for India's 12M kirana stores.",
    pitch:"Kirana stores run India's ₹45L crore retail economy. Yet they can't get credit. Growfast uses AI + GST data to underwrite micro-loans in 4 hours — no collateral, no branch visits.",
    highlights:["3,200 active borrowers","₹2.1Cr disbursed","0.8% NPA","MoM growth: 47%"],
    topInvestorQuote:"I backed Growfast because the TAM is enormous and the team actually understands credit risk.",
    topInvestorName:"Arjun V.", color:"#FF6B35", emoji:"🏪",
  },
  {
    id:2, name:"NeuroLearn", tagline:"Vernacular AI tutors for rural students",
    sector:"EdTech", city:"Bengaluru",
    raised:850000, target:1500000, tickets:170, totalTickets:300, ticketPrice:5000, backers:170,
    trendingScore:88, raisedLast24h:90000,
    founderName:"Ravi Menon", founderRole:"Founder",
    founderBio:"Former teacher, IIM Ahmedabad. On a mission to democratize quality education.",
    pitch:"70% of India's students learn in regional languages. Yet all EdTech is in English. NeuroLearn builds AI tutors in 12 Indian languages — affordable, offline-capable, curriculum-aligned.",
    highlights:["18,000 students","12 languages","82% completion rate","₹199/month"],
    topInvestorQuote:"The retention numbers are unlike anything I've seen in EdTech. This team has cracked engagement.",
    topInvestorName:"Sneha R.", color:"#4ECDC4", emoji:"📚",
  },
  {
    id:3, name:"FarmLink", tagline:"B2B marketplace connecting farmers to restaurants",
    sector:"AgriTech", city:"Pune",
    raised:620000, target:1000000, tickets:124, totalTickets:200, ticketPrice:5000, backers:124,
    trendingScore:72, raisedLast24h:55000,
    founderName:"Anita Desai", founderRole:"CEO",
    founderBio:"5th generation farmer turned tech founder. BITS Pilani CS graduate.",
    pitch:"Restaurants pay 3x the farm price. Farmers earn 1/3rd of retail. FarmLink cuts 4 middlemen with direct farm-to-table logistics in 36 hours across 200 cities.",
    highlights:["200 partner farms","850 restaurants","₹4.2Cr GMV","28% YoY growth"],
    topInvestorQuote:"FarmLink solves a problem I see every day — and their unit economics are already positive.",
    topInvestorName:"Vikram P.", color:"#95D5B2", emoji:"🌾",
  },
  {
    id:4, name:"MediScan", tagline:"AI diagnostics for tier-2 clinics",
    sector:"HealthTech", city:"Hyderabad",
    raised:1800000, target:2000000, tickets:360, totalTickets:400, ticketPrice:5000, backers:360,
    trendingScore:99, raisedLast24h:200000,
    founderName:"Dr. Karthik Nair", founderRole:"Founder & CTO",
    founderBio:"Radiologist + ML researcher. AIIMS Delhi. 14 published papers on diagnostic AI.",
    pitch:"India has 1 radiologist per 100,000 people. MediScan's AI reads X-rays and MRIs with 94% accuracy — making quality diagnostics affordable in every town.",
    highlights:["94% diagnostic accuracy","1,200 clinics","₹8Cr revenue","CDSCO approved"],
    topInvestorQuote:"The accuracy numbers are validated by independent hospitals. This is the real deal.",
    topInvestorName:"Dr. Priya M.", color:"#FFB5A7", emoji:"🏥",
  },
  {
    id:5, name:"SolarKart", tagline:"EMI-based rooftop solar for middle-class homes",
    sector:"CleanTech", city:"Jaipur",
    raised:430000, target:1500000, tickets:86, totalTickets:300, ticketPrice:5000, backers:86,
    trendingScore:61, raisedLast24h:40000,
    founderName:"Rohit Gupta", founderRole:"CEO",
    founderBio:"Ex-Tata Power, IIT Delhi. Obsessed with making clean energy accessible.",
    pitch:"Rooftop solar pays back in 4 years but costs ₹3L upfront. SolarKart bundles installation + financing into ₹2,999/month EMIs — zero down, positive cash flow from day one.",
    highlights:["2,100 installations","Rajasthan & UP","₹0 subsidy dependent","MNRE empanelled"],
    topInvestorQuote:"The EMI model cracks a problem that's blocked solar adoption for a decade.",
    topInvestorName:"Meera K.", color:"#FFD700", emoji:"☀️",
  },
  {
    id:6, name:"WardrobeOS", tagline:"AI stylist subscription for working women",
    sector:"D2C", city:"Delhi",
    raised:980000, target:1500000, tickets:196, totalTickets:300, ticketPrice:5000, backers:196,
    trendingScore:85, raisedLast24h:80000,
    founderName:"Kavya Iyer", founderRole:"Founder",
    founderBio:"Ex-Myntra buyer, fashion designer. Solving the 'nothing to wear' problem with data.",
    pitch:"Working women spend 45 min/day deciding what to wear. WardrobeOS digitizes your closet and uses AI to build daily outfits for every occasion — and fills gaps with curated drops.",
    highlights:["28,000 subscribers","₹799/month","NPS 72","40% refer a friend"],
    topInvestorQuote:"The NPS of 72 is higher than Spotify's. Retention is the whole game, and they've solved it.",
    topInvestorName:"Aisha B.", color:"#C77DFF", emoji:"👗",
  },
  {
    id:7, name:"CloudKitchen Pro", tagline:"SaaS stack for ghost kitchen operators",
    sector:"SaaS", city:"Chennai",
    raised:340000, target:1000000, tickets:68, totalTickets:200, ticketPrice:5000, backers:68,
    trendingScore:58, raisedLast24h:30000,
    founderName:"Samuel Joseph", founderRole:"CEO",
    founderBio:"Ex-Swiggy operations. Built 12 ghost kitchens before building software for them.",
    pitch:"India's ghost kitchen market is ₹9,000Cr and growing 60% YoY. Yet operators juggle 6 apps for orders, inventory, staff, and accounts. CloudKitchen Pro consolidates everything in one dashboard.",
    highlights:["420 kitchen clients","₹1.2Cr ARR","130% NRR","3 hrs saved/day avg"],
    topInvestorQuote:"130% net revenue retention means the product sells itself. That's rare at this stage.",
    topInvestorName:"Nathan S.", color:"#F4A261", emoji:"🍳",
  },
  {
    id:8, name:"BiteBuddy", tagline:"Personalized nutrition for diabetic patients",
    sector:"HealthTech", city:"Bengaluru",
    raised:560000, target:1000000, tickets:112, totalTickets:200, ticketPrice:5000, backers:112,
    trendingScore:78, raisedLast24h:65000,
    founderName:"Dr. Meena Pillai", founderRole:"Founder & CEO",
    founderBio:"Diabetologist with 12 years clinical practice. Treated 4,000+ patients before going full-time.",
    pitch:"India has 101M diabetics — the world's largest. 82% don't follow diet plans because they're too generic. BiteBuddy uses CGM data + Indian food database to build meal plans that actually fit real life.",
    highlights:["12,000 patients","31% avg HbA1c improvement","3 insurance partnerships","₹499/month"],
    topInvestorQuote:"Real clinical outcomes from a doctor-founder. I've seen nothing like the HbA1c data.",
    topInvestorName:"Rahul D.", color:"#E76F51", emoji:"🥗",
  },
];

const PENDING_APPLICATIONS = [
  {
    id:101, name:"QuickHire", tagline:"Blue-collar hiring for factories",
    sector:"SaaS", city:"Surat", founderName:"Suresh Patel", appliedDate:"2026-03-08",
    pitch:"Factories waste 2 weeks per hire for floor workers. QuickHire matches pre-screened blue-collar workers in 48 hours using skill tests and geo-matching.",
  },
  {
    id:102, name:"AyurBot", tagline:"AI-driven Ayurveda consultation app",
    sector:"HealthTech", city:"Coimbatore", founderName:"Dr. Lakshmi Rao", appliedDate:"2026-03-09",
    pitch:"70M Indians use Ayurveda but 90% can't access qualified practitioners. AyurBot provides personalized dosha analysis and treatment plans via WhatsApp.",
  },
  {
    id:103, name:"EduPass", tagline:"Subscription access to 50+ skill courses",
    sector:"EdTech", city:"Kolkata", founderName:"Arnab Sen", appliedDate:"2026-03-10",
    pitch:"Skills gap is costing Indian youth jobs. EduPass offers Netflix-style access to 50+ job-ready courses for ₹199/month — with placement support included.",
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmt = (n) => {
  if (n >= 10000000) return `₹${(n/10000000).toFixed(1)}Cr`;
  if (n >= 100000)   return `₹${(n/100000).toFixed(1)}L`;
  if (n >= 1000)     return `₹${(n/1000).toFixed(0)}K`;
  return `₹${n}`;
};
const pct = (a,b) => Math.min(100, Math.round((a/b)*100));

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark]             = useState(true);
  const [tab, setTab]               = useState("home");
  const [detail, setDetail]         = useState(null);
  const [video, setVideo]           = useState(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoPlaying, setVideoPlaying]   = useState(false);
  const [investments, setInvestments]     = useState({});
  const [investAnim, setInvestAnim]       = useState(null);
  const [sectorFilter, setSectorFilter]   = useState("All");
  const [pullRefreshing, setPullRefreshing] = useState(false);
  const [feedIdx, setFeedIdx]       = useState(0);
  const [showAdmin, setShowAdmin]   = useState(false);
  const [adminPass, setAdminPass]   = useState("");
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [adminSort, setAdminSort]   = useState("pending-first");
  const [applications, setApplications] = useState(PENDING_APPLICATIONS);
  const [liveStartups, setLiveStartups] = useState(STARTUPS);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [investConfirm, setInvestConfirm] = useState(null);

  const videoTimer  = useRef(null);
  const touchStart  = useRef(null);

  // ── THEME ──────────────────────────────────────────────────────────────────
  const t = {
    bg:       dark ? "#080810" : "#F5F4F0",
    card:     dark ? "#12121C" : "#FFFFFF",
    border:   dark ? "#252535" : "#E5E3DC",
    text:     dark ? "#EEEDF4" : "#1A1A2E",
    sub:      dark ? "#7777AA" : "#6B6B7B",
    accent:   "#FF6B35",
    green:    "#22C55E",
    input:    dark ? "#1C1C2C" : "#EEECE5",
    nav:      dark ? "#0C0C18" : "#FFFFFF",
    overlay:  dark ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.6)",
  };

  // ── VIDEO ──────────────────────────────────────────────────────────────────
  const openVideo = (s) => { setVideo(s); setVideoProgress(0); setVideoPlaying(true); };
  const closeVideo = () => {
    setVideo(null); setVideoProgress(0); setVideoPlaying(false);
    clearInterval(videoTimer.current);
  };

  useEffect(() => {
    if (video && videoPlaying) {
      videoTimer.current = setInterval(() => {
        setVideoProgress(p => {
          if (p >= 100) { clearInterval(videoTimer.current); setVideoPlaying(false); return 100; }
          return p + (100/45)*0.1;
        });
      }, 100);
    }
    return () => clearInterval(videoTimer.current);
  }, [video, videoPlaying]);

  // ── SWIPE ──────────────────────────────────────────────────────────────────
  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientY; };
  const onTouchEnd = (e) => {
    if (!touchStart.current) return;
    const delta = touchStart.current - e.changedTouches[0].clientY;
    if (Math.abs(delta) < 60) return;
    const arr = filtered();
    if (delta > 0) setFeedIdx(i => Math.min(i+1, arr.length-1));
    else           setFeedIdx(i => Math.max(i-1, 0));
    touchStart.current = null;
  };

  // ── PULL REFRESH ──────────────────────────────────────────────────────────
  const pullRefresh = () => {
    setPullRefreshing(true);
    setTimeout(() => setPullRefreshing(false), 1600);
  };

  // ── INVEST ────────────────────────────────────────────────────────────────
  const doInvest = (s) => {
    if (investments[s.id]) return;
    setInvestAnim(s.id);
    setTimeout(() => setInvestAnim(null), 700);
    setInvestments(p => ({...p, [s.id]: 1}));
    setLiveStartups(p => p.map(x => x.id===s.id
      ? {...x, raised: x.raised+x.ticketPrice, tickets: x.tickets+1, backers: x.backers+1}
      : x
    ));
    setInvestConfirm(null);
  };

  // ── FILTER / SORT ─────────────────────────────────────────────────────────
  const filtered = () => sectorFilter==="All" ? liveStartups : liveStartups.filter(s => s.sector===sectorFilter);
  const trending = () => [...liveStartups].sort((a,b)=>b.trendingScore-a.trendingScore).slice(0,3);
  const similar  = (s) => liveStartups.filter(x => x.sector===s.sector && x.id!==s.id).slice(0,2);

  const sortedApps = () => [...applications].sort((a,b) => {
    if (adminSort==="newest") return new Date(b.appliedDate)-new Date(a.appliedDate);
    if (adminSort==="oldest") return new Date(a.appliedDate)-new Date(b.appliedDate);
    return 0; // pending-first: all pending
  });

  // ── ADMIN ─────────────────────────────────────────────────────────────────
  const approve = (app) => {
    setLiveStartups(p => [...p, {
      ...app, id:Date.now(), raised:0, target:1000000, tickets:0, totalTickets:200,
      ticketPrice:5000, backers:0, trendingScore:50, raisedLast24h:0,
      highlights:["Recently approved"], topInvestorQuote:"", topInvestorName:"",
      color:"#888899", emoji:"🚀",
    }]);
    setApplications(p => p.filter(a => a.id!==app.id));
  };
  const confirmReject = () => {
    setApplications(p => p.filter(a => a.id!==rejectTarget.id));
    setRejectTarget(null); setRejectReason("");
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // CSS
  // ═══════════════════════════════════════════════════════════════════════════
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
    html,body{background:${t.bg};font-family:'DM Sans',sans-serif;color:${t.text};overscroll-behavior:none;}
    ::-webkit-scrollbar{width:0;height:0;}
    input,textarea,button{outline:none;}

    .app{max-width:430px;margin:0 auto;min-height:100vh;position:relative;background:${t.bg};}

    /* TOP BAR */
    .topbar{display:flex;justify-content:space-between;align-items:center;padding:14px 20px 10px;
      position:sticky;top:0;z-index:50;background:${t.bg};border-bottom:1px solid ${t.border};}
    .logo{font-family:'Syne',sans-serif;font-weight:800;font-size:21px;color:${t.accent};letter-spacing:-0.5px;}
    .logo span{color:${t.text};}
    .dm-btn{background:${t.input};border:none;border-radius:20px;padding:6px 12px;cursor:pointer;
      font-size:13px;color:${t.text};font-family:'DM Sans',sans-serif;}

    /* BOTTOM NAV */
    .bnav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;
      background:${t.nav};border-top:1px solid ${t.border};display:flex;z-index:100;
      padding-bottom:env(safe-area-inset-bottom,8px);}
    .bnav-item{flex:1;display:flex;flex-direction:column;align-items:center;padding:10px 0 8px;
      cursor:pointer;gap:3px;border:none;background:none;color:${t.sub};transition:color .2s;}
    .bnav-item.on{color:${t.accent};}
    .bnav-item svg{width:22px;height:22px;}
    .bnav-label{font-size:10px;font-family:'DM Sans',sans-serif;font-weight:500;}

    /* FEED */
    .feed{padding:0 16px 110px;}
    .pull-hint{text-align:center;padding:10px;font-size:13px;color:${t.accent};}
    @keyframes spin{to{transform:rotate(360deg);}}
    .spinning{display:inline-block;animation:spin 1s linear infinite;}

    .card{background:${t.card};border:1px solid ${t.border};border-radius:22px;padding:20px;
      margin-bottom:16px;cursor:pointer;transition:transform .15s,border-color .15s;position:relative;}
    .card:active{transform:scale(0.99);}
    .card.active-card{border-color:${t.accent}40;box-shadow:0 0 0 1px ${t.accent}20;}

    .card-head{display:flex;align-items:flex-start;gap:12px;margin-bottom:12px;}
    .c-emoji{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;
      justify-content:center;font-size:26px;flex-shrink:0;}
    .c-info{flex:1;}
    .c-name{font-family:'Syne',sans-serif;font-weight:700;font-size:17px;color:${t.text};}
    .c-tag{font-size:13px;color:${t.sub};margin-top:2px;line-height:1.4;}
    .s-badge{background:${t.input};border-radius:8px;padding:4px 8px;font-size:11px;
      color:${t.sub};font-weight:500;white-space:nowrap;flex-shrink:0;}

    .c-pitch{font-size:13.5px;color:${t.sub};line-height:1.6;margin-bottom:14px;
      display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}

    /* TRACTION TICKER */
    .ticker{background:${t.accent}12;border:1px solid ${t.accent}30;border-radius:10px;
      padding:9px 12px;margin-bottom:14px;display:flex;align-items:center;gap:7px;font-size:12px;}
    .tdot{width:6px;height:6px;border-radius:50%;background:${t.accent};flex-shrink:0;
      animation:pulse 1.5s ease-in-out infinite;}
    @keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.4;transform:scale(.6);}}

    /* PROGRESS */
    .prog-section{margin-bottom:14px;}
    .prog-row{display:flex;justify-content:space-between;margin-bottom:6px;}
    .prog-raised{font-family:'Syne',sans-serif;font-weight:700;font-size:16px;}
    .prog-target{font-size:13px;color:${t.sub};}
    .prog-bar{height:6px;background:${t.input};border-radius:99px;overflow:hidden;}
    .prog-fill{height:100%;border-radius:99px;transition:width .5s ease;}
    .prog-meta{display:flex;justify-content:space-between;margin-top:6px;font-size:12px;color:${t.sub};}

    /* BUTTONS */
    .row-btns{display:flex;gap:10px;}
    .watch-btn{flex:1;background:${t.input};border:1px solid ${t.border};border-radius:12px;
      padding:12px;font-size:14px;font-weight:600;color:${t.text};cursor:pointer;
      font-family:'DM Sans',sans-serif;transition:border-color .2s;}
    .watch-btn:active{border-color:${t.accent};}
    .inv-btn{flex:1;border:none;border-radius:12px;padding:12px;font-size:14px;font-weight:700;
      cursor:pointer;font-family:'Syne',sans-serif;transition:all .2s;position:relative;overflow:hidden;}
    .inv-btn.fresh{background:${t.accent};color:#fff;}
    .inv-btn.done{background:${t.green};color:#fff;}
    .inv-btn:active{transform:scale(0.96);}
    @keyframes coinburst{0%{transform:scale(1);}30%{transform:scale(1.18);}65%{transform:scale(0.94);}100%{transform:scale(1);}}
    .inv-btn.pop{animation:coinburst .5s ease;}

    /* VIDEO MODAL */
    .vmodal{position:fixed;inset:0;background:#000;z-index:200;display:flex;flex-direction:column;}
    .vpanel{flex:1;display:flex;align-items:center;justify-content:center;position:relative;}
    .vscreen{width:100%;max-width:430px;aspect-ratio:9/16;background:linear-gradient(145deg,#0f0f1e,#16213e,#0d0d1a);
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      position:relative;overflow:hidden;}
    .vbg-emoji{font-size:130px;opacity:.06;position:absolute;user-select:none;}
    .vcontent{position:relative;z-index:1;text-align:center;padding:40px;}
    .v-startup{font-family:'Syne',sans-serif;font-weight:800;font-size:28px;color:#fff;margin-bottom:10px;}
    .v-caption{font-size:15px;color:rgba(255,255,255,.75);line-height:1.6;}
    .v-timer{font-family:'Syne',sans-serif;font-size:52px;font-weight:800;color:${t.accent};margin-top:24px;}
    .vprog-bar{position:absolute;bottom:0;left:0;right:0;height:3px;background:rgba(255,255,255,.15);}
    .vprog-fill{height:100%;background:${t.accent};transition:width .1s linear;}
    .vclose{position:absolute;top:20px;right:20px;background:rgba(0,0,0,.5);border:none;
      border-radius:50%;width:38px;height:38px;color:#fff;font-size:18px;cursor:pointer;
      display:flex;align-items:center;justify-content:center;z-index:10;}
    .vinfo{padding:20px;background:${t.bg};}
    .v-name{font-family:'Syne',sans-serif;font-size:19px;font-weight:800;}
    .v-stag{font-size:13px;color:${t.sub};margin-top:4px;}
    .vactions{display:flex;gap:12px;margin-top:16px;}

    /* DETAIL */
    .detail-wrap{padding:0 0 110px;}
    .d-hero{padding:20px;background:${t.card};border-bottom:1px solid ${t.border};}
    .d-hero-top{display:flex;align-items:center;gap:14px;margin-bottom:16px;}
    .d-emoji{width:64px;height:64px;border-radius:18px;display:flex;align-items:center;
      justify-content:center;font-size:32px;flex-shrink:0;}
    .d-name{font-family:'Syne',sans-serif;font-weight:800;font-size:24px;}
    .d-tagline{font-size:14px;color:${t.sub};margin-top:4px;}
    .d-city{font-size:12px;color:${t.sub};margin-top:4px;}
    .d-section{padding:20px;border-bottom:1px solid ${t.border};}
    .d-sec-title{font-family:'Syne',sans-serif;font-weight:700;font-size:16px;margin-bottom:12px;}
    .hl-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
    .hl-card{background:${t.input};border-radius:12px;padding:12px;font-size:13px;font-weight:500;}
    .quote-block{background:${t.input};border-left:3px solid ${t.accent};border-radius:0 12px 12px 0;padding:14px;}
    .quote-text{font-size:14px;font-style:italic;line-height:1.6;}
    .quote-by{font-size:12px;color:${t.sub};margin-top:8px;font-weight:600;}
    .sim-card{display:flex;align-items:center;gap:12px;background:${t.input};border-radius:14px;
      padding:14px;margin-bottom:10px;cursor:pointer;}
    .sim-emoji{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;
      justify-content:center;font-size:20px;flex-shrink:0;}
    .invest-sticky{position:fixed;bottom:68px;left:50%;transform:translateX(-50%);
      width:100%;max-width:430px;padding:12px 20px;background:${t.nav};
      border-top:1px solid ${t.border};z-index:90;}

    /* EXPLORE */
    .explore-wrap{padding:0 16px 110px;}
    .sec-head{font-family:'Syne',sans-serif;font-weight:700;font-size:18px;padding:16px 0 12px;}
    .trend-scroll{display:flex;gap:12px;overflow-x:auto;padding-bottom:4px;
      margin:0 -16px;padding-left:16px;padding-right:16px;}
    .trend-card{min-width:155px;background:${t.card};border:1px solid ${t.border};
      border-radius:18px;padding:16px;cursor:pointer;flex-shrink:0;transition:border-color .2s;}
    .trend-card:active{border-color:${t.accent};}
    .trend-rank{font-size:10px;color:${t.accent};font-weight:700;text-transform:uppercase;
      letter-spacing:1px;margin-bottom:8px;}
    .trend-emoji{font-size:28px;margin-bottom:8px;}
    .trend-name{font-family:'Syne',sans-serif;font-weight:700;font-size:14px;}
    .trend-24h{font-size:12px;color:${t.accent};margin-top:4px;font-weight:600;}
    .filter-row{display:flex;gap:8px;overflow-x:auto;padding:10px 0;
      margin:0 -16px;padding-left:16px;}
    .chip{background:${t.input};border:1px solid ${t.border};border-radius:99px;
      padding:7px 14px;font-size:13px;white-space:nowrap;cursor:pointer;color:${t.sub};
      font-family:'DM Sans',sans-serif;font-weight:500;transition:all .2s;}
    .chip.on{background:${t.accent};border-color:${t.accent};color:#fff;}

    /* PORTFOLIO */
    .port-wrap{padding:0 16px 110px;}
    .port-summary{background:${t.card};border:1px solid ${t.border};border-radius:22px;
      padding:28px;margin:16px 0;text-align:center;}
    .port-amt{font-family:'Syne',sans-serif;font-size:38px;font-weight:800;color:${t.accent};}
    .port-lbl{font-size:13px;color:${t.sub};margin-top:4px;}
    .port-card{background:${t.card};border:1px solid ${t.border};border-radius:16px;
      padding:16px;margin-bottom:12px;display:flex;align-items:center;gap:14px;cursor:pointer;}

    /* PROFILE */
    .prof-wrap{padding:0 16px 110px;}
    .prof-header{text-align:center;padding:32px 20px;}
    .prof-avatar{width:80px;height:80px;border-radius:50%;background:${t.accent};
      display:flex;align-items:center;justify-content:center;font-size:36px;margin:0 auto 16px;}
    .prof-name{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;}
    .stats-row{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:16px 0;}
    .stat-card{background:${t.card};border:1px solid ${t.border};border-radius:14px;
      padding:14px;text-align:center;}
    .stat-val{font-family:'Syne',sans-serif;font-size:20px;font-weight:700;}
    .stat-lbl{font-size:11px;color:${t.sub};margin-top:3px;}
    .admin-row-btn{width:100%;padding:16px;background:${t.input};border:1px solid ${t.border};
      border-radius:14px;color:${t.text};font-size:15px;font-weight:600;font-family:'DM Sans',sans-serif;
      cursor:pointer;text-align:left;margin-top:12px;}

    /* ADMIN */
    .adm-wrap{padding:0 16px 110px;}
    .adm-login{display:flex;flex-direction:column;gap:14px;padding:40px 0;}
    .adm-input{background:${t.input};border:1px solid ${t.border};border-radius:12px;
      padding:14px 16px;color:${t.text};font-size:15px;font-family:'DM Sans',sans-serif;width:100%;}
    .adm-submit{background:${t.accent};border:none;border-radius:12px;padding:14px;color:#fff;
      font-size:16px;font-weight:700;font-family:'Syne',sans-serif;cursor:pointer;}
    .sort-row{display:flex;gap:8px;margin:12px 0;overflow-x:auto;}
    .sort-chip{background:${t.input};border:1px solid ${t.border};border-radius:8px;
      padding:7px 12px;font-size:12px;cursor:pointer;color:${t.sub};white-space:nowrap;
      font-family:'DM Sans',sans-serif;}
    .sort-chip.on{background:${t.accent}20;border-color:${t.accent};color:${t.accent};}
    .app-card{background:${t.card};border:1px solid ${t.border};border-radius:16px;
      padding:16px;margin-bottom:12px;}
    .app-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;}
    .app-name{font-family:'Syne',sans-serif;font-weight:700;font-size:16px;}
    .app-by{font-size:13px;color:${t.sub};margin-top:2px;}
    .app-date{font-size:11px;color:${t.sub};}
    .app-pitch{font-size:13px;color:${t.sub};line-height:1.5;margin-bottom:12px;}
    .app-actions{display:flex;gap:10px;}
    .btn-approve{flex:1;background:${t.green};border:none;border-radius:10px;padding:11px;
      color:#fff;font-weight:700;font-size:14px;cursor:pointer;font-family:'Syne',sans-serif;}
    .btn-reject{flex:1;background:${t.input};border:1px solid #ef444440;border-radius:10px;
      padding:11px;color:#EF4444;font-weight:700;font-size:14px;cursor:pointer;font-family:'Syne',sans-serif;}

    /* REJECT MODAL */
    .rmod-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:300;
      display:flex;align-items:flex-end;}
    .rmod{background:${t.card};border-radius:24px 24px 0 0;padding:24px;width:100%;}
    .rmod-title{font-family:'Syne',sans-serif;font-weight:700;font-size:18px;margin-bottom:4px;}
    .rmod-sub{font-size:14px;color:${t.sub};margin-bottom:14px;}
    .rmod-ta{background:${t.input};border:1px solid ${t.border};border-radius:12px;padding:14px;
      color:${t.text};font-size:14px;font-family:'DM Sans',sans-serif;width:100%;min-height:90px;resize:none;}
    .rmod-btns{display:flex;gap:10px;margin-top:14px;}
    .rmod-cancel{flex:1;background:${t.input};border:none;border-radius:12px;padding:14px;
      color:${t.text};font-size:15px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;}
    .rmod-confirm{flex:1;background:#EF4444;border:none;border-radius:12px;padding:14px;
      color:#fff;font-size:15px;font-weight:700;cursor:pointer;font-family:'Syne',sans-serif;}

    /* INVEST CONFIRM MODAL */
    .imod-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:300;
      display:flex;align-items:flex-end;}
    .imod{background:${t.card};border-radius:24px 24px 0 0;padding:28px;width:100%;}
    .imod-emoji{font-size:40px;margin-bottom:12px;}
    .imod-title{font-family:'Syne',sans-serif;font-weight:800;font-size:20px;margin-bottom:6px;}
    .imod-sub{font-size:14px;color:${t.sub};line-height:1.6;margin-bottom:20px;}
    .imod-btns{display:flex;gap:10px;}
    .imod-cancel{flex:1;background:${t.input};border:none;border-radius:12px;padding:14px;
      color:${t.text};font-size:15px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;}
    .imod-confirm{flex:1;background:${t.accent};border:none;border-radius:12px;padding:14px;
      color:#fff;font-size:15px;font-weight:700;cursor:pointer;font-family:'Syne',sans-serif;}

    /* BACK BTN */
    .back-btn{display:flex;align-items:center;gap:6px;padding:0;color:${t.sub};cursor:pointer;
      font-size:14px;background:none;border:none;font-family:'DM Sans',sans-serif;}

    /* EMPTY */
    .empty{text-align:center;padding:60px 20px;color:${t.sub};}
    .empty-ico{font-size:48px;margin-bottom:12px;}
  `;

  // ═══════════════════════════════════════════════════════════════════════════
  // SUB-COMPONENTS
  // ═══════════════════════════════════════════════════════════════════════════

  const BottomNav = () => {
    const items = [
      { id:"home",      label:"Home",      icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
      { id:"explore",   label:"Explore",   icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> },
      { id:"portfolio", label:"Portfolio", icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg> },
      { id:"profile",   label:"Profile",   icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
    ];
    return (
      <nav className="bnav">
        {items.map(item => (
          <button key={item.id} className={`bnav-item ${tab===item.id?"on":""}`}
            onClick={() => { setTab(item.id); setDetail(null); }}>
            {item.icon}
            <span className="bnav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    );
  };

  const VideoModal = () => {
    if (!video) return null;
    const s = video;
    const remaining = Math.max(0, Math.ceil(45*(1-videoProgress/100)));
    return (
      <div className="vmodal">
        <div className="vpanel">
          <div className="vscreen">
            <div className="vbg-emoji">{s.emoji}</div>
            <div className="vcontent">
              <div className="v-startup">{s.name}</div>
              <div className="v-caption">{s.pitch.slice(0,130)}...</div>
              <div className="v-timer">{remaining>0 ? `0:${remaining.toString().padStart(2,'0')}` : "Done ✓"}</div>
            </div>
            <div className="vprog-bar">
              <div className="vprog-fill" style={{width:`${videoProgress}%`}}/>
            </div>
          </div>
          <button className="vclose" onClick={closeVideo}>✕</button>
        </div>
        <div className="vinfo">
          <div className="v-name">{s.name}</div>
          <div className="v-stag">{s.tagline}</div>
          <div className="vactions">
            <button className="watch-btn" onClick={closeVideo} style={{flex:1}}>Close</button>
            <button
              className={`inv-btn ${investments[s.id]?"done":"fresh"} ${investAnim===s.id?"pop":""}`}
              style={{flex:1}}
              onClick={() => investments[s.id] ? null : setInvestConfirm(s)}
            >
              {investments[s.id] ? `✓ Invested` : `Invest ₹${s.ticketPrice.toLocaleString()}`}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const InvestConfirmModal = () => {
    if (!investConfirm) return null;
    const s = investConfirm;
    return (
      <div className="imod-overlay" onClick={() => setInvestConfirm(null)}>
        <div className="imod" onClick={e=>e.stopPropagation()}>
          <div className="imod-emoji">{s.emoji}</div>
          <div className="imod-title">Invest in {s.name}?</div>
          <div className="imod-sub">
            You're committing <strong>₹{s.ticketPrice.toLocaleString()}</strong> to {s.name}.
            This is a mock investment on InstaVest MVP — no real money moves.
          </div>
          <div className="imod-btns">
            <button className="imod-cancel" onClick={() => setInvestConfirm(null)}>Cancel</button>
            <button className="imod-confirm" onClick={() => doInvest(s)}>Confirm ₹{s.ticketPrice.toLocaleString()} →</button>
          </div>
        </div>
      </div>
    );
  };

  const Ticker = ({ s }) => (
    <div className="ticker">
      <div className="tdot"/>
      <span style={{color:t.sub}}>
        <strong style={{color:t.accent}}>{fmt(s.raisedLast24h)}</strong> raised today ·{" "}
        <strong style={{color:t.text}}>{s.backers}</strong> investors
      </span>
    </div>
  );

  const ProgBar = ({ s }) => (
    <div className="prog-section">
      <div className="prog-row">
        <span className="prog-raised">{fmt(s.raised)}</span>
        <span className="prog-target">of {fmt(s.target)}</span>
      </div>
      <div className="prog-bar">
        <div className="prog-fill" style={{width:`${pct(s.raised,s.target)}%`,background:s.color}}/>
      </div>
      <div className="prog-meta">
        <span>{pct(s.raised,s.target)}% funded</span>
        <span>{s.totalTickets-s.tickets} tickets left</span>
      </div>
    </div>
  );

  const InvBtn = ({ s, big=false }) => (
    <button
      className={`inv-btn ${investments[s.id]?"done":"fresh"} ${investAnim===s.id?"pop":""}`}
      style={big ? {width:"100%",fontSize:16,padding:"15px"} : {flex:1}}
      onClick={() => investments[s.id] ? null : setInvestConfirm(s)}
    >
      {investments[s.id]
        ? `✓ Invested ₹${s.ticketPrice.toLocaleString()}`
        : `Invest ₹${s.ticketPrice.toLocaleString()} →`}
    </button>
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // ADMIN VIEW
  // ═══════════════════════════════════════════════════════════════════════════
  if (showAdmin) {
    return (
      <div className="app" style={{background:t.bg,color:t.text}}>
        <style>{css}</style>
        <div className="topbar">
          <button className="back-btn" onClick={()=>{setShowAdmin(false);setAdminAuthed(false);setAdminPass("");}}>← Back</button>
          <span className="logo">Insta<span>Vest</span> <span style={{fontSize:13,color:t.sub,fontFamily:"DM Sans"}}>Admin</span></span>
          <div/>
        </div>
        <div className="adm-wrap">
          {!adminAuthed ? (
            <div className="adm-login">
              <h2 style={{fontFamily:"Syne",fontWeight:800,fontSize:24}}>Admin Panel</h2>
              <p style={{color:t.sub,fontSize:14}}>Enter the admin password to continue.</p>
              <input className="adm-input" type="password" placeholder="Password"
                value={adminPass} onChange={e=>setAdminPass(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&adminPass==="instavest2026"&&setAdminAuthed(true)}/>
              <button className="adm-submit" onClick={()=>adminPass==="instavest2026"&&setAdminAuthed(true)}>
                Login →
              </button>
            </div>
          ) : (
            <>
              <h2 style={{fontFamily:"Syne",fontWeight:800,fontSize:20,padding:"16px 0 4px"}}>
                Pending Applications ({applications.length})
              </h2>
              <div className="sort-row">
                {[["pending-first","Pending First"],["newest","Newest"],["oldest","Oldest"]].map(([v,l])=>(
                  <button key={v} className={`sort-chip ${adminSort===v?"on":""}`} onClick={()=>setAdminSort(v)}>{l}</button>
                ))}
              </div>
              {sortedApps().length===0
                ? <div className="empty"><div className="empty-ico">✅</div><p>All caught up!</p></div>
                : sortedApps().map(app => (
                  <div className="app-card" key={app.id}>
                    <div className="app-head">
                      <div>
                        <div className="app-name">{app.name}</div>
                        <div className="app-by">by {app.founderName} · {app.city} · {app.sector}</div>
                      </div>
                      <div className="app-date">{app.appliedDate}</div>
                    </div>
                    <p className="app-pitch">{app.pitch}</p>
                    <div className="app-actions">
                      <button className="btn-approve" onClick={()=>approve(app)}>✓ Approve</button>
                      <button className="btn-reject" onClick={()=>{setRejectTarget(app);setRejectReason("");}}>✕ Reject</button>
                    </div>
                  </div>
                ))
              }

              <h2 style={{fontFamily:"Syne",fontWeight:800,fontSize:20,padding:"20px 0 12px"}}>
                Live Rounds ({liveStartups.length})
              </h2>
              {liveStartups.map(s=>(
                <div className="app-card" key={s.id} style={{marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontFamily:"Syne",fontWeight:700}}>{s.emoji} {s.name}</span>
                    <span style={{fontSize:13,color:t.accent,fontWeight:700}}>{pct(s.raised,s.target)}%</span>
                  </div>
                  <div style={{marginTop:8}}>
                    <div className="prog-bar"><div className="prog-fill" style={{width:`${pct(s.raised,s.target)}%`,background:s.color}}/></div>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",marginTop:6,fontSize:12,color:t.sub}}>
                    <span>{fmt(s.raised)}</span>
                    <span>{s.backers} backers</span>
                    <span>{s.tickets}/{s.totalTickets} tickets</span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {rejectTarget && (
          <div className="rmod-overlay" onClick={()=>setRejectTarget(null)}>
            <div className="rmod" onClick={e=>e.stopPropagation()}>
              <div className="rmod-title">Reject {rejectTarget.name}?</div>
              <div className="rmod-sub">Optionally add a reason for the founder.</div>
              <textarea className="rmod-ta" placeholder="e.g. Insufficient traction, unclear unit economics…"
                value={rejectReason} onChange={e=>setRejectReason(e.target.value)}/>
              <div className="rmod-btns">
                <button className="rmod-cancel" onClick={()=>setRejectTarget(null)}>Cancel</button>
                <button className="rmod-confirm" onClick={confirmReject}>Reject</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // STARTUP DETAIL VIEW
  // ═══════════════════════════════════════════════════════════════════════════
  if (detail) {
    const s = detail;
    const sim = similar(s);
    return (
      <div className="app" style={{background:t.bg,color:t.text}}>
        <style>{css}</style>
        <div className="topbar">
          <button className="back-btn" onClick={()=>setDetail(null)}>← Back</button>
          <span className="logo">Insta<span>Vest</span></span>
          <button className="dm-btn" onClick={()=>setDark(d=>!d)}>{dark?"☀️":"🌙"}</button>
        </div>
        <div className="detail-wrap">
          <div className="d-hero">
            <div className="d-hero-top">
              <div className="d-emoji" style={{background:s.color+"20"}}>{s.emoji}</div>
              <div>
                <div className="d-name">{s.name}</div>
                <div className="d-tagline">{s.tagline}</div>
                <div className="d-city">📍 {s.city} · {s.sector}</div>
              </div>
            </div>
            <Ticker s={s}/>
            <ProgBar s={s}/>
            <button className="watch-btn" style={{width:"100%"}} onClick={()=>openVideo(s)}>▶ Watch 45-sec Pitch</button>
          </div>

          <div className="d-section">
            <div className="d-sec-title">The Pitch</div>
            <p style={{fontSize:14,color:t.sub,lineHeight:1.7}}>{s.pitch}</p>
          </div>

          <div className="d-section">
            <div className="d-sec-title">Traction</div>
            <div className="hl-grid">
              {s.highlights.map((h,i)=><div className="hl-card" key={i}>{h}</div>)}
            </div>
          </div>

          <div className="d-section">
            <div className="d-sec-title">The Founder</div>
            <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:12}}>
              <div style={{width:48,height:48,borderRadius:"50%",background:s.color+"25",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>👤</div>
              <div>
                <div style={{fontFamily:"Syne",fontWeight:700,fontSize:16}}>{s.founderName}</div>
                <div style={{fontSize:13,color:t.sub}}>{s.founderRole}</div>
              </div>
            </div>
            <p style={{fontSize:14,color:t.sub,lineHeight:1.6}}>{s.founderBio}</p>
          </div>

          {s.topInvestorQuote && (
            <div className="d-section">
              <div className="d-sec-title">What investors say</div>
              <div className="quote-block">
                <div className="quote-text">"{s.topInvestorQuote}"</div>
                <div className="quote-by">— {s.topInvestorName}, top backer</div>
              </div>
            </div>
          )}

          {sim.length>0 && (
            <div className="d-section">
              <div className="d-sec-title">Also in {s.sector}</div>
              {sim.map(x=>(
                <div className="sim-card" key={x.id} onClick={()=>setDetail(x)}>
                  <div className="sim-emoji" style={{background:x.color+"20"}}>{x.emoji}</div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:"Syne",fontWeight:700,fontSize:14}}>{x.name}</div>
                    <div style={{fontSize:12,color:t.sub,marginTop:2}}>{x.tagline}</div>
                  </div>
                  <div style={{fontSize:12,color:t.accent,fontWeight:700}}>{pct(x.raised,x.target)}%</div>
                </div>
              ))}
            </div>
          )}
          <div style={{height:80}}/>
        </div>

        <div className="invest-sticky">
          <InvBtn s={s} big/>
        </div>

        <VideoModal/>
        <InvestConfirmModal/>
        <BottomNav/>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // HOME
  // ═══════════════════════════════════════════════════════════════════════════
  if (tab==="home") {
    const cards = filtered();
    return (
      <div className="app" style={{background:t.bg,color:t.text}}>
        <style>{css}</style>
        <div className="topbar">
          <span className="logo">Insta<span>Vest</span></span>
          <button className="dm-btn" onClick={()=>setDark(d=>!d)}>{dark?"☀️":"🌙"}</button>
        </div>
        <div className="feed" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {pullRefreshing && (
            <div className="pull-hint"><span className="spinning">↻</span> Refreshing…</div>
          )}
          {cards.map((s,i)=>(
            <div className={`card ${i===feedIdx?"active-card":""}`} key={s.id}>
              <div className="card-head" onClick={()=>setDetail(s)}>
                <div className="c-emoji" style={{background:s.color+"20"}}>{s.emoji}</div>
                <div className="c-info">
                  <div className="c-name">{s.name}</div>
                  <div className="c-tag">{s.tagline}</div>
                </div>
                <div className="s-badge">{s.sector}</div>
              </div>
              <p className="c-pitch" onClick={()=>setDetail(s)}>{s.pitch}</p>
              <Ticker s={s}/>
              <ProgBar s={s}/>
              <div className="row-btns">
                <button className="watch-btn" onClick={()=>openVideo(s)}>▶ Watch Pitch</button>
                <InvBtn s={s}/>
              </div>
            </div>
          ))}
        </div>
        <VideoModal/>
        <InvestConfirmModal/>
        <BottomNav/>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // EXPLORE
  // ═══════════════════════════════════════════════════════════════════════════
  if (tab==="explore") {
    const hot = trending();
    const cards = filtered();
    return (
      <div className="app" style={{background:t.bg,color:t.text}}>
        <style>{css}</style>
        <div className="topbar">
          <span className="logo">Insta<span>Vest</span></span>
          <button className="dm-btn" onClick={()=>setDark(d=>!d)}>{dark?"☀️":"🌙"}</button>
        </div>
        <div className="explore-wrap">
          <div className="sec-head">🔥 Trending Now</div>
          <div className="trend-scroll">
            {hot.map((s,i)=>(
              <div className="trend-card" key={s.id} onClick={()=>setDetail(s)}>
                <div className="trend-rank">#{i+1} Trending</div>
                <div className="trend-emoji">{s.emoji}</div>
                <div className="trend-name">{s.name}</div>
                <div className="trend-24h">+{fmt(s.raisedLast24h)} today</div>
              </div>
            ))}
          </div>

          <div className="sec-head" style={{marginTop:8}}>Browse</div>
          <div className="filter-row">
            {SECTORS.map(sec=>(
              <button key={sec} className={`chip ${sectorFilter===sec?"on":""}`} onClick={()=>setSectorFilter(sec)}>{sec}</button>
            ))}
          </div>

          {cards.map(s=>(
            <div className="card" key={s.id}>
              <div className="card-head" onClick={()=>setDetail(s)}>
                <div className="c-emoji" style={{background:s.color+"20"}}>{s.emoji}</div>
                <div className="c-info">
                  <div className="c-name">{s.name}</div>
                  <div className="c-tag">{s.tagline}</div>
                </div>
                <div className="s-badge">{s.sector}</div>
              </div>
              <ProgBar s={s}/>
              <div className="row-btns">
                <button className="watch-btn" onClick={()=>openVideo(s)}>▶ Watch</button>
                <InvBtn s={s}/>
              </div>
            </div>
          ))}
        </div>
        <VideoModal/>
        <InvestConfirmModal/>
        <BottomNav/>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PORTFOLIO
  // ═══════════════════════════════════════════════════════════════════════════
  if (tab==="portfolio") {
    const backed = liveStartups.filter(s=>investments[s.id]);
    const total  = backed.reduce((a,s)=>a+s.ticketPrice,0);
    return (
      <div className="app" style={{background:t.bg,color:t.text}}>
        <style>{css}</style>
        <div className="topbar">
          <span className="logo">Insta<span>Vest</span></span>
          <button className="dm-btn" onClick={()=>setDark(d=>!d)}>{dark?"☀️":"🌙"}</button>
        </div>
        <div className="port-wrap">
          <div className="port-summary">
            <div className="port-lbl">Total Invested</div>
            <div className="port-amt">{total>0 ? fmt(total) : "₹0"}</div>
            <div className="port-lbl" style={{marginTop:8}}>{backed.length} startup{backed.length!==1?"s":""} backed</div>
          </div>
          {backed.length===0
            ? <div className="empty"><div className="empty-ico">💰</div><p style={{fontSize:16,fontWeight:500}}>No investments yet</p><p style={{fontSize:13,marginTop:8}}>Browse the feed and back your first startup!</p></div>
            : backed.map(s=>(
              <div className="port-card" key={s.id} onClick={()=>setDetail(s)}>
                <div style={{width:44,height:44,borderRadius:12,background:s.color+"20",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{s.emoji}</div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"Syne",fontWeight:700,fontSize:15}}>{s.name}</div>
                  <div style={{fontSize:12,color:t.sub,marginTop:2}}>{s.sector} · {s.city}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontFamily:"Syne",fontWeight:700,color:t.green}}>₹{s.ticketPrice.toLocaleString()}</div>
                  <div style={{fontSize:11,color:t.sub,marginTop:2}}>{pct(s.raised,s.target)}% funded</div>
                </div>
              </div>
            ))
          }
        </div>
        <BottomNav/>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PROFILE
  // ═══════════════════════════════════════════════════════════════════════════
  if (tab==="profile") {
    const backed = Object.keys(investments).length;
    const total  = liveStartups.filter(s=>investments[s.id]).reduce((a,s)=>a+s.ticketPrice,0);
    return (
      <div className="app" style={{background:t.bg,color:t.text}}>
        <style>{css}</style>
        <div className="topbar">
          <span className="logo">Insta<span>Vest</span></span>
          <button className="dm-btn" onClick={()=>setDark(d=>!d)}>{dark?"☀️":"🌙"}</button>
        </div>
        <div className="prof-wrap">
          <div className="prof-header">
            <div className="prof-avatar">👤</div>
            <div className="prof-name">Sarash</div>
            <div style={{color:t.sub,fontSize:14,marginTop:4}}>Early Investor · India 🇮🇳</div>
          </div>
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-val">{backed}</div>
              <div className="stat-lbl">Backed</div>
            </div>
            <div className="stat-card">
              <div className="stat-val">{total>0?fmt(total):"₹0"}</div>
              <div className="stat-lbl">Invested</div>
            </div>
            <div className="stat-card">
              <div className="stat-val">{liveStartups.length}</div>
              <div className="stat-lbl">Live Deals</div>
            </div>
          </div>
          <button className="admin-row-btn" onClick={()=>{setShowAdmin(true);setAdminAuthed(false);}}>
            🔐 Admin Panel →
          </button>
        </div>
        <BottomNav/>
      </div>
    );
  }

  return null;
}
