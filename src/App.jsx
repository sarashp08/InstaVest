import { useState, useEffect, useRef } from "react";

// ─── SECTORS ──────────────────────────────────────────────────────────────────
const SECTORS = ["All","EdTech","FinTech","HealthTech","AgriTech","CleanTech","EV","D2C","SaaS","FoodTech","Logistics"];

// ─── STARTUPS (25) ────────────────────────────────────────────────────────────
const STARTUPS = [
  // EdTech
  {id:1,name:"NeuroLearn",tagline:"AI tutors in 12 Indian languages",sector:"EdTech",city:"Bengaluru",raised:850000,target:1500000,ticketPrice:5000,totalTickets:300,tickets:170,backers:170,trendingScore:88,raisedLast24h:90000,founderName:"Ravi Menon",founderRole:"Founder & CEO",founderBio:"Former schoolteacher, IIM-A '18. Building the personalised tutor he couldn't give his own students in rural Karnataka.",pitch:"70% of India's 260M students learn in regional languages. NeuroLearn builds adaptive AI tutors in 12 Indian languages — offline-capable, curriculum-aligned, and ₹199/month.",highlights:["18,000 active students","12 Indian languages","82% 30-day retention","₹199/month"],topInvestorQuote:"Retention of 82% is higher than Netflix India. The product is genuinely magical.",topInvestorName:"Arjun V.",color:"#7C3AED",emoji:"📚",pitchScript:["260M Indian students. 70% learn in regional languages.","Yet all EdTech is English-first. We built the fix.","18,000 students. 12 languages. 82% retention.","Back NeuroLearn from ₹5,000."]},

  {id:2,name:"SkillBridge",tagline:"ITI-certified micro-courses via WhatsApp",sector:"EdTech",city:"Lucknow",raised:420000,target:800000,ticketPrice:5000,totalTickets:160,tickets:84,backers:84,trendingScore:65,raisedLast24h:40000,founderName:"Sunita Yadav",founderRole:"CEO",founderBio:"Ex-NSDC program director. Trained 50,000+ workers before founding SkillBridge to scale it 100x.",pitch:"India has 40M ITI graduates who can't prove their skills to employers. SkillBridge delivers 3-week micro-certifications via WhatsApp — recognised by 200+ employers.",highlights:["14,000 certified workers","200+ hiring partners","₹499/course","₹18L MRR"],topInvestorQuote:"The hiring partner network is the moat. Extremely hard to replicate.",topInvestorName:"Pankaj M.",color:"#5B21B6",emoji:"🔧",pitchScript:["40M ITI graduates. Zero portable proof of skills.","SkillBridge certifies them in 3 weeks via WhatsApp.","14,000 workers certified. 200 employers hiring from us.","Invest ₹5,000. Skill India is real."]},

  {id:3,name:"GyanAI",tagline:"Personalised JEE & NEET prep at ₹299/month",sector:"EdTech",city:"Kota",raised:1100000,target:2000000,ticketPrice:5000,totalTickets:400,tickets:220,backers:220,trendingScore:79,raisedLast24h:75000,founderName:"Abhishek Tiwari",founderRole:"Founder",founderBio:"JEE AIR 23 dropout. Realised coaching is broken and built Kota-quality prep for ₹299/month.",pitch:"2.4M students appear for JEE/NEET every year. Only 2% crack it. The rest can't afford Kota. GyanAI builds AI that knows exactly where each student is weak and drills them like a personal coach.",highlights:["12,000 paid students","31% avg score improvement","₹299/month","4.7★ App Store"],topInvestorQuote:"31% score improvement is a hard metric. Students are paying and renewing. That's proof.",topInvestorName:"Dr. Meera K.",color:"#6D28D9",emoji:"🎯",pitchScript:["2.4M JEE/NEET aspirants. Only 2% crack it.","The rest can't afford Kota. We built Kota for ₹299/month.","12,000 students. 31% average score improvement.","Back GyanAI. Change the 98%."]},

  // FinTech
  {id:4,name:"Growfast",tagline:"AI micro-loans for India's 12M kirana stores",sector:"FinTech",city:"Mumbai",raised:1240000,target:2000000,ticketPrice:5000,totalTickets:400,tickets:248,backers:248,trendingScore:95,raisedLast24h:125000,founderName:"Priya Sharma",founderRole:"CEO & Co-founder",founderBio:"Ex-Razorpay risk lead, IIT Bombay. Building credit infrastructure for India's backbone retail economy.",pitch:"Kirana stores run India's ₹45L crore retail economy. Yet they can't get credit. Growfast uses AI + GST data to underwrite micro-loans in 4 hours — no collateral, no branch visits.",highlights:["3,200 active borrowers","₹2.1Cr disbursed","0.8% NPA","47% MoM growth"],topInvestorQuote:"0.8% NPA with 47% MoM growth. This is what good fintech looks like.",topInvestorName:"Vikram S.",color:"#8B5CF6",emoji:"🏪",pitchScript:["12M kirana stores. Zero access to formal credit.","Growfast underwrites loans in 4 hours using AI + GST data.","₹2.1Cr disbursed. 0.8% NPA. Growing 47% every month.","Invest from ₹5,000. Bank the backbone of India."]},

  {id:5,name:"PayKaro",tagline:"Voice-first UPI for non-literate India",sector:"FinTech",city:"Patna",raised:640000,target:1500000,ticketPrice:5000,totalTickets:300,tickets:128,backers:128,trendingScore:72,raisedLast24h:58000,founderName:"Deepak Tiwari",founderRole:"Founder & CEO",founderBio:"Ex-NPCI engineer. 6 years building UPI — then realised 400M Indians still can't use it because they can't read.",pitch:"400M Indians are locked out of digital payments because UPI requires literacy. PayKaro lets you send money by speaking in Hindi, Bhojpuri, or 12 other languages — zero reading required.",highlights:["8.2L active users","₹340Cr monthly TPV","14 languages","0.2% fraud rate"],topInvestorQuote:"The TPV numbers at this stage are extraordinary. This is the PhonePe for Bharat.",topInvestorName:"Ritesh A.",color:"#6D28D9",emoji:"💸",pitchScript:["400M Indians locked out of digital payments.","They can't use UPI. They can't read.","PayKaro: send money by just speaking. 14 languages.","8.2L users. ₹340Cr monthly. Back us."]},

  {id:6,name:"TaxEasy",tagline:"GST filing for 15M MSMEs in 10 minutes",sector:"FinTech",city:"Ahmedabad",raised:380000,target:1000000,ticketPrice:5000,totalTickets:200,tickets:76,backers:76,trendingScore:60,raisedLast24h:32000,founderName:"Harsh Patel",founderRole:"Co-founder & CEO",founderBio:"CA turned founder. Filed 2,000 GST returns by hand before realising software could do it better.",pitch:"15M MSMEs spend ₹3,000–8,000/month on CA fees for GST compliance. TaxEasy automates the entire process — sync Tally or bank, auto-classify, file in 10 minutes.",highlights:["4,200 MSME clients","₹22L MRR","4.8★ rating","Saves ₹5K/month avg"],topInvestorQuote:"The pricing and NPS together signal clear PMF. This is going to be huge.",topInvestorName:"CA Suresh B.",color:"#4C1D95",emoji:"📊",pitchScript:["15M MSMEs. All pay ₹5,000/month in CA fees for GST.","TaxEasy automates everything in 10 minutes.","4,200 clients. ₹22L MRR. 4.8 stars.","Invest ₹5,000 and back India's compliance revolution."]},

  // HealthTech
  {id:7,name:"MediScan",tagline:"AI reads X-rays with 94% accuracy",sector:"HealthTech",city:"Hyderabad",raised:1800000,target:2000000,ticketPrice:5000,totalTickets:400,tickets:360,backers:360,trendingScore:99,raisedLast24h:200000,founderName:"Dr. Karthik Nair",founderRole:"Founder & CTO",founderBio:"Radiologist + ML researcher. AIIMS Delhi. 14 published papers. Building AI that reads what doctors miss.",pitch:"India has 1 radiologist per 100,000 people. MediScan's AI reads X-rays and MRIs with 94% accuracy — making quality diagnostics available in every tier-2 clinic.",highlights:["94% diagnostic accuracy","1,200 clinics","₹8Cr revenue","CDSCO approved"],topInvestorQuote:"CDSCO approval + 94% accuracy + ₹8Cr revenue. Strongest HealthTech deal I've seen.",topInvestorName:"Dr. Priya M.",color:"#7C3AED",emoji:"🏥",pitchScript:["1 radiologist per 100,000 Indians. Diagnostic deserts are real.","MediScan AI reads X-rays with 94% accuracy. Instantly.","1,200 clinics. ₹8Cr revenue. CDSCO approved.","Back MediScan. Medicine for every Indian."]},

  {id:8,name:"BiteBuddy",tagline:"CGM-powered meal plans for 101M diabetics",sector:"HealthTech",city:"Bengaluru",raised:560000,target:1000000,ticketPrice:5000,totalTickets:200,tickets:112,backers:112,trendingScore:78,raisedLast24h:65000,founderName:"Dr. Meena Pillai",founderRole:"Founder & CEO",founderBio:"Diabetologist with 12 years clinical practice. Treated 4,000+ patients before founding BiteBuddy.",pitch:"India has 101M diabetics — the world's most. 82% don't follow diet plans because they're too generic. BiteBuddy uses CGM + Indian food database to build hyper-personalised meal plans.",highlights:["12,000 patients","31% avg HbA1c drop","3 insurance tie-ups","₹499/month"],topInvestorQuote:"Real HbA1c improvements from a doctor-founder. The clinical outcomes are extraordinary.",topInvestorName:"Rahul D.",color:"#6D28D9",emoji:"🥗",pitchScript:["101M diabetics in India. World's largest.","82% don't follow diet plans. Too generic.","BiteBuddy uses your CGM + Indian food to fix that.","12,000 patients. 31% HbA1c drop. Invest now."]},

  {id:9,name:"CareBridge",tagline:"Vernacular teleconsultation for rural India",sector:"HealthTech",city:"Jaipur",raised:290000,target:800000,ticketPrice:5000,totalTickets:160,tickets:58,backers:58,trendingScore:54,raisedLast24h:25000,founderName:"Dr. Sunita Rao",founderRole:"Founder",founderBio:"Public health physician. 8 years in rural Rajasthan. Knows firsthand what healthcare access looks like outside cities.",pitch:"600M rural Indians travel 40km+ for a basic consultation. CareBridge connects them to verified doctors over video — in Hindi, Rajasthani, or their local language — for ₹99.",highlights:["55,000 consultations","18 states","₹99/consult","4.6★ patient rating"],topInvestorQuote:"A 4.6 rating in rural India speaks to the team's empathy. Impact investing at its best.",topInvestorName:"Ashwin B.",color:"#5B21B6",emoji:"🩺",pitchScript:["600M rural Indians. Average 40km to the nearest doctor.","CareBridge brings verified doctors to their phone for ₹99.","55,000 consultations. 18 states. 4.6 stars.","Invest ₹5,000. Healthcare is a right."]},

  // AgriTech
  {id:10,name:"FarmLink",tagline:"Direct farm-to-restaurant in 36 hours",sector:"AgriTech",city:"Pune",raised:620000,target:1000000,ticketPrice:5000,totalTickets:200,tickets:124,backers:124,trendingScore:72,raisedLast24h:55000,founderName:"Anita Desai",founderRole:"CEO",founderBio:"5th generation farmer turned tech founder. BITS Pilani CS. Building the supply chain that should have existed 30 years ago.",pitch:"Restaurants pay 3x the farm price. Farmers earn a third of retail. FarmLink cuts 4 middlemen with direct farm-to-table logistics — delivery in 36 hours across 200 cities.",highlights:["200 partner farms","850 restaurants","₹4.2Cr GMV","28% YoY growth"],topInvestorQuote:"Positive unit economics and no subsidy dependence. FarmLink is built to last.",topInvestorName:"Vikram P.",color:"#059669",emoji:"🌾",pitchScript:["Farmers earn ₹10/kg. Restaurants pay ₹30/kg.","4 middlemen take the difference. We remove all 4.","200 farms. 850 restaurants. ₹4.2Cr GMV.","Back FarmLink. Fix the food chain."]},

  {id:11,name:"KisanAI",tagline:"Crop disease detection via smartphone camera",sector:"AgriTech",city:"Nagpur",raised:310000,target:800000,ticketPrice:5000,totalTickets:160,tickets:62,backers:62,trendingScore:58,raisedLast24h:28000,founderName:"Rohit Kulkarni",founderRole:"Founder & CEO",founderBio:"Agricultural scientist, Pune University. 3 years in the field with Maharashtra farmers before building KisanAI.",pitch:"India loses ₹90,000Cr in crop value to diseases every year because farmers can't identify them early. KisanAI uses your phone camera to diagnose 500+ crop diseases in 3 seconds.",highlights:["3.4L scans done","500+ diseases detected","Works offline","Free for farmers"],topInvestorQuote:"Free for farmers, monetised via agri-input companies. Elegant model and real mission.",topInvestorName:"Ritu K.",color:"#065F46",emoji:"🌱",pitchScript:["India loses ₹90,000Cr to crop disease every year.","Farmers can't identify diseases until it's too late.","KisanAI diagnoses 500+ diseases in 3 seconds from a photo.","3.4L scans. Free forever for farmers. Back us."]},

  {id:12,name:"ColdChainX",tagline:"Solar cold storage hubs for tier-3 farmers",sector:"AgriTech",city:"Nashik",raised:780000,target:1500000,ticketPrice:10000,totalTickets:150,tickets:78,backers:78,trendingScore:68,raisedLast24h:60000,founderName:"Aman Verma",founderRole:"CEO",founderBio:"Logistics engineer, IIT Madras. Built cold chain infra for Marico before founding ColdChainX.",pitch:"India wastes 40% of its produce because cold storage is metro-concentrated. ColdChainX deploys modular solar-powered cold hubs in tier-3 towns — farmers book storage by the crate on WhatsApp.",highlights:["24 cold hubs live","180 farmer partners","₹32L MRR","Mother Dairy tie-up"],topInvestorQuote:"The Mother Dairy partnership validates the supply side completely. A moat that matters.",topInvestorName:"Sanjay R.",color:"#047857",emoji:"❄️",pitchScript:["India wastes 40% of its produce. Post-harvest loss is a crisis.","ColdChainX puts solar cold storage in every tier-3 town.","24 hubs. 180 farmers. ₹32L MRR. Mother Dairy as partner.","Invest ₹10,000 and fix India's food waste."]},

  // CleanTech
  {id:13,name:"SolarKart",tagline:"Zero-down rooftop solar on EMI",sector:"CleanTech",city:"Jaipur",raised:430000,target:1500000,ticketPrice:5000,totalTickets:300,tickets:86,backers:86,trendingScore:61,raisedLast24h:40000,founderName:"Rohit Gupta",founderRole:"CEO",founderBio:"Ex-Tata Power, IIT Delhi. 8 years in renewables before founding SolarKart to solve affordability.",pitch:"Rooftop solar saves ₹2,500/month but costs ₹3L upfront. SolarKart bundles installation + financing into ₹2,999/month EMIs — zero down payment, positive cash flow from month one.",highlights:["2,100 installations","Rajasthan & UP","₹0 upfront needed","MNRE empanelled"],topInvestorQuote:"The EMI model cracks a problem that's stalled rooftop solar adoption for a decade.",topInvestorName:"Meera K.",color:"#D97706",emoji:"☀️",pitchScript:["Rooftop solar saves ₹2,500 per month.","But ₹3 lakh upfront? Most families can't afford it.","SolarKart makes it ₹2,999/month. Zero down.","2,100 homes. Net positive from day one. Invest."]},

  {id:14,name:"CarbonZero",tagline:"Plug-and-play carbon credits for Indian SMEs",sector:"CleanTech",city:"Delhi",raised:1500000,target:1500000,ticketPrice:10000,totalTickets:150,tickets:150,backers:150,trendingScore:90,raisedLast24h:0,founderName:"Nikhil Gupta",founderRole:"Co-founder & CEO",founderBio:"Ex-McKinsey sustainability practice. Saw Indian SMEs locked out of $50B carbon markets and built the bridge.",pitch:"India's carbon market is worth $50B and growing. Indian SMEs are locked out — the process is too complex. CarbonZero is the Stripe for carbon credits: connect your ERP, we handle the rest.",highlights:["340 SMEs onboarded","₹62L MRR","4,200 credits issued","48% MoM growth"],topInvestorQuote:"82% gross margin and 48% MoM growth. Best SaaS metrics in CleanTech.",topInvestorName:"Aisha T.",color:"#064E3B",emoji:"🌿",pitchScript:["India's carbon market: $50 billion. SMEs: locked out.","CarbonZero is the Stripe for carbon credits.","340 businesses. ₹62L MRR. This round is CLOSED.","Watch for our Series A."]},

  // EV
  {id:15,name:"BoltEV",tagline:"90-second battery swap for two-wheelers",sector:"EV",city:"Bengaluru",raised:900000,target:2500000,ticketPrice:10000,totalTickets:250,tickets:90,backers:90,trendingScore:83,raisedLast24h:85000,founderName:"Ranjit Suri",founderRole:"CEO & Co-founder",founderBio:"20-year auto industry veteran, ex-Tata Motors. Saw EV adoption stall at charging anxiety and built the solution.",pitch:"EV adoption is stuck because charging takes 90 minutes. BoltEV installs battery-swap stations for two-wheelers — swap a depleted battery for a full one in 90 seconds, like swapping an LPG cylinder.",highlights:["420 swap stations","18,000 daily swaps","₹54L MRR","38% MoM growth"],topInvestorQuote:"The two-wheeler swap network is the right wedge. 200M two-wheelers and the density math works.",topInvestorName:"Arjun M.",color:"#B45309",emoji:"⚡",pitchScript:["200M two-wheelers in India. Charging takes 90 minutes.","Nobody wants that. 90-second battery swap is the answer.","420 stations. 18,000 daily swaps. Growing 38% MoM.","Invest ₹10,000 in India's EV future."]},

  {id:16,name:"ZipCharge",tagline:"Mobile EV charging vans that come to you",sector:"EV",city:"Chennai",raised:250000,target:1000000,ticketPrice:5000,totalTickets:200,tickets:50,backers:50,trendingScore:55,raisedLast24h:22000,founderName:"Kavitha Rajan",founderRole:"Founder",founderBio:"Ex-Ola Electric operations lead. Saw the on-demand charging gap firsthand and decided to fill it.",pitch:"EV four-wheeler owners in India have nowhere to charge when they're stuck. ZipCharge dispatches mobile charging vans within 45 minutes in the city — like roadside assistance for EVs.",highlights:["Delhi & Chennai","45-min avg response","₹8L MRR","4.8★ app rating"],topInvestorQuote:"The response time and app rating are the only metrics that matter at this stage. Both exceptional.",topInvestorName:"Vikram J.",color:"#92400E",emoji:"🚐",pitchScript:["EV cars stranded with 2% battery. It happens every day.","ZipCharge sends a charging van to you in 45 minutes.","Delhi and Chennai live. ₹8L MRR. Growing fast.","Back ZipCharge. India's EV rescue network."]},

  // D2C
  {id:17,name:"WardrobeOS",tagline:"AI stylist for India's 80M working women",sector:"D2C",city:"Delhi",raised:980000,target:1500000,ticketPrice:5000,totalTickets:300,tickets:196,backers:196,trendingScore:85,raisedLast24h:80000,founderName:"Kavya Iyer",founderRole:"Founder",founderBio:"Ex-Myntra buyer, fashion designer. Solving the 'nothing to wear' problem for India's working women.",pitch:"Working women spend 45 min/day deciding what to wear. WardrobeOS digitizes your wardrobe and uses AI to build daily outfits for every occasion — then fills gaps with curated drops.",highlights:["28,000 subscribers","₹799/month","NPS 72","40% refer-a-friend"],topInvestorQuote:"NPS of 72 is higher than Spotify India. Retention is the whole game and they've solved it.",topInvestorName:"Aisha B.",color:"#7C3AED",emoji:"👗",pitchScript:["80M working women. 45 minutes wasted daily on 'what to wear'.","WardrobeOS digitizes your wardrobe and builds outfits with AI.","28,000 subscribers. NPS 72. 40% refer a friend.","Back WardrobeOS from ₹5,000."]},

  {id:18,name:"MittiCraft",tagline:"Premium handmade decor by Indian artisans",sector:"D2C",city:"Jaipur",raised:180000,target:600000,ticketPrice:5000,totalTickets:120,tickets:36,backers:36,trendingScore:48,raisedLast24h:15000,founderName:"Pooja Singhania",founderRole:"Founder & CEO",founderBio:"Art historian turned entrepreneur. Works directly with 400 artisan families across Rajasthan, UP, and Bengal.",pitch:"India's ₹8,000Cr artisan market is fragmented and exploitative. MittiCraft sources directly from 400 artisan families, sells premium online, and pays artisans 3x what they'd earn through middlemen.",highlights:["400 artisan families","₹12L MRR","2,800 orders/month","Ships to 28 countries"],topInvestorQuote:"Shipping to 28 countries signals premium positioning most Indian D2C brands never achieve.",topInvestorName:"Priti N.",color:"#92400E",emoji:"🏺",pitchScript:["400 artisan families making India's most beautiful things.","Earning ₹200/day through middlemen. We tripled that.","₹12L MRR. Ships to 28 countries. 22% MoM growth.","Back MittiCraft. Luxury with conscience."]},

  {id:19,name:"DesiSip",tagline:"Specialty Indian teas shipped to 40 countries",sector:"D2C",city:"Darjeeling",raised:340000,target:800000,ticketPrice:5000,totalTickets:160,tickets:68,backers:68,trendingScore:57,raisedLast24h:30000,founderName:"Raj Banerjee",founderRole:"Co-founder & CEO",founderBio:"3rd generation tea planter. Tired of watching Darjeeling tea sell cheap while matcha commands 10x globally.",pitch:"India produces the world's finest teas — Darjeeling, Assam, Nilgiri — but sells them at commodity prices. DesiSip builds premium D2C tea subscriptions marketed as the Indian matcha.",highlights:["18,000 subscribers","40 countries","₹16L MRR","₹899/month avg order"],topInvestorQuote:"International subscriber base at 40 countries makes this defensible. India + export is powerful.",topInvestorName:"Meera S.",color:"#065F46",emoji:"🍵",pitchScript:["Darjeeling tea: world's finest. Sells for ₹40/kg in bulk.","Matcha sells for ₹4,000/kg globally.","DesiSip ships India's best teas to 40 countries.","18,000 subscribers. ₹16L MRR. Back the revolution."]},

  // SaaS
  {id:20,name:"CloudKitchen Pro",tagline:"All-in-one SaaS for ghost kitchen operators",sector:"SaaS",city:"Chennai",raised:340000,target:1000000,ticketPrice:5000,totalTickets:200,tickets:68,backers:68,trendingScore:58,raisedLast24h:30000,founderName:"Samuel Joseph",founderRole:"CEO",founderBio:"Ex-Swiggy operations. Built and ran 12 ghost kitchens before building software for them.",pitch:"India's ghost kitchen market is ₹9,000Cr and growing 60% YoY. Operators juggle 6 different apps for orders, inventory, staff, and accounts. CloudKitchen Pro replaces all 6.",highlights:["420 kitchen clients","₹1.2Cr ARR","130% NRR","3 hrs saved/day"],topInvestorQuote:"130% net revenue retention at 420 clients. The product sells itself. Rare at this stage.",topInvestorName:"Nathan S.",color:"#B45309",emoji:"🍳",pitchScript:["Ghost kitchens: ₹9,000Cr market. Growing 60% YoY.","Operators juggle 6 apps. We replace all 6.","420 clients. ₹1.2Cr ARR. 130% net retention.","Back CloudKitchen Pro from ₹5,000."]},

  {id:21,name:"HRMitra",tagline:"Payroll & compliance automation for SMEs",sector:"SaaS",city:"Pune",raised:490000,target:1200000,ticketPrice:5000,totalTickets:240,tickets:98,backers:98,trendingScore:66,raisedLast24h:42000,founderName:"Preethi Kumar",founderRole:"Founder",founderBio:"Ex-Zoho HR product head. 8 years building HR software before founding HRMitra for the SME market Zoho ignores.",pitch:"10M Indian SMEs with 10-200 employees do payroll manually on Excel. HRMitra automates payroll, PF, ESI, and TDS — fully compliant, ₹999/month, no implementation needed.",highlights:["3,100 SME clients","₹28L MRR","PF/ESI/TDS compliant","Setup in 2 hours"],topInvestorQuote:"2-hour setup is the magic. Nobody else can claim that. It's a genuine moat.",topInvestorName:"CA Rohan M.",color:"#4C1D95",emoji:"💼",pitchScript:["10M SMEs do payroll on Excel. Every month. Still.","PF, ESI, TDS — a compliance nightmare.","HRMitra automates everything for ₹999/month.","3,100 clients. ₹28L MRR. Back us."]},

  // FoodTech
  {id:22,name:"TiffinBox",tagline:"Homemade lunch by verified home chefs",sector:"FoodTech",city:"Mumbai",raised:460000,target:1000000,ticketPrice:5000,totalTickets:200,tickets:92,backers:92,trendingScore:70,raisedLast24h:45000,founderName:"Rekha Menon",founderRole:"Founder & CEO",founderBio:"Ex-BCG consultant who quit after 5 years of bad office food. Built TiffinBox to give every professional ghar ka khana.",pitch:"8M office-goers in Mumbai and Delhi eat unhealthy overpriced food daily. TiffinBox connects them to 2,000 verified home chefs — ghar ka khana at ₹80/meal.",highlights:["2,000 home chefs","24,000 daily orders","₹38L MRR","4.7★ app rating"],topInvestorQuote:"24,000 daily orders at 4.7 stars is product-market fit. Home-cook marketplace is the right wedge.",topInvestorName:"Suresh K.",color:"#B45309",emoji:"🍱",pitchScript:["8M people eating bad office food every day in 2 cities.","TiffinBox delivers ghar ka khana from 2,000 home chefs.","24,000 daily orders. ₹38L MRR. 4.7 stars.","Back TiffinBox from ₹5,000."]},

  {id:23,name:"SpiceRoute",tagline:"Authentic regional Indian cuisines, dark-kitchen style",sector:"FoodTech",city:"Bengaluru",raised:220000,target:800000,ticketPrice:5000,totalTickets:160,tickets:44,backers:44,trendingScore:49,raisedLast24h:19000,founderName:"Abhilash Nair",founderRole:"Co-founder & CEO",founderBio:"Kerala chef who moved to Bengaluru and couldn't find real Malabar food. Built SpiceRoute to fix it.",pitch:"India's food diversity is extraordinary — Malabar, Chettinad, Awadhi, Marwari — but most cities only serve generic North or South Indian. SpiceRoute runs dark kitchens for authentic regional cuisines.",highlights:["6 regional cuisines","4 cities","₹18L MRR","4.6★ avg rating"],topInvestorQuote:"Cuisine specialization is the defensible moat. No one else does authentic Malabar at scale.",topInvestorName:"Priya M.",color:"#7C2D12",emoji:"🌶️",pitchScript:["India has 28 states. Each with a cuisine that no one delivers.","SpiceRoute runs dark kitchens for authentic regional food.","Malabar. Chettinad. Awadhi. 4 cities. ₹18L MRR.","Back SpiceRoute. India's food deserves better."]},

  // Logistics
  {id:24,name:"QuickHaul",tagline:"Intercity truck booking in 4 hours for SMEs",sector:"Logistics",city:"Delhi",raised:530000,target:1200000,ticketPrice:5000,totalTickets:240,tickets:106,backers:106,trendingScore:74,raisedLast24h:48000,founderName:"Manish Rawat",founderRole:"Founder & CEO",founderBio:"Transporter's son turned IIT Delhi grad. 2 years on the ground understanding why truck booking is still done on WhatsApp.",pitch:"1M+ SMEs in India still book intercity trucks over WhatsApp, paying 40% more than market rate due to information asymmetry. QuickHaul gives real-time price discovery and confirmed booking in 4 hours.",highlights:["4,200 SME shippers","₹42Cr GMV","₹28L MRR","40% cost saving avg"],topInvestorQuote:"₹42Cr GMV with a lean team is impressive. The market is large enough for multiple winners.",topInvestorName:"Rohit D.",color:"#1E3A5F",emoji:"🚚",pitchScript:["1M SMEs still book trucks on WhatsApp.","They overpay by 40% due to information gaps.","QuickHaul: real-time pricing, booking in 4 hours.","₹42Cr GMV. ₹28L MRR. Back us from ₹5,000."]},

  {id:25,name:"ColdRun",tagline:"IoT-monitored pharma last-mile cold chain",sector:"Logistics",city:"Mumbai",raised:670000,target:1500000,ticketPrice:10000,totalTickets:150,tickets:67,backers:67,trendingScore:76,raisedLast24h:62000,founderName:"Dr. Asha Krishnan",founderRole:"Founder & CEO",founderBio:"Pharmacologist + supply chain consultant. Watched temperature excursions destroy vaccine batches and decided to fix it.",pitch:"₹3,800Cr of medicines are wasted annually in India due to cold chain failures in the last mile. ColdRun deploys IoT-monitored insulated boxes and certified cold-chain riders for pharma last-mile delivery.",highlights:["240 pharma clients","0 temperature breaches","IoT monitored","₹34L MRR"],topInvestorQuote:"Zero temperature breaches across 240 pharma clients. Mission-critical infrastructure.",topInvestorName:"Dr. Sunil V.",color:"#1E40AF",emoji:"💊",pitchScript:["₹3,800Cr of medicines wasted in India every year.","Temperature failures. Last-mile cold chain doesn't exist.","ColdRun: IoT-monitored cold chain. 240 clients. Zero breaches.","Invest ₹10,000. Build India's medicine supply chain."]},
];

const PENDING_APPLICATIONS = [
  {id:101,name:"QuickHire",tagline:"Blue-collar hiring for factories in 48 hours",sector:"SaaS",city:"Surat",founderName:"Suresh Patel",appliedDate:"2026-03-09",pitch:"Factories waste 2 weeks per hire for floor workers. QuickHire matches pre-screened blue-collar workers in 48 hours using skill tests and geo-matching. 320 factories on waitlist."},
  {id:102,name:"AyurBot",tagline:"AI-driven Ayurveda on WhatsApp",sector:"HealthTech",city:"Coimbatore",founderName:"Dr. Lakshmi Rao",appliedDate:"2026-03-09",pitch:"70M Indians use Ayurveda but 90% can't access qualified practitioners. AyurBot provides personalised dosha analysis via WhatsApp. 4,000 users in beta with 0 marketing spend."},
  {id:103,name:"EduPass",tagline:"Netflix for skill courses at ₹199/month",sector:"EdTech",city:"Kolkata",founderName:"Arnab Sen",appliedDate:"2026-03-10",pitch:"Skills gap is costing Indian youth jobs. EduPass offers access to 50+ job-ready courses for ₹199/month with placement support. 1,200 signups in first week."},
  {id:104,name:"WaterWise",tagline:"IoT water management for apartment buildings",sector:"CleanTech",city:"Hyderabad",founderName:"Pradeep Rao",appliedDate:"2026-03-10",pitch:"Apartment buildings in India waste 40% of their water due to leaks and inefficient distribution. WaterWise installs IoT sensors and saves 35% water on average. 80 buildings live."},
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmt = n => n>=10000000?`₹${(n/10000000).toFixed(1)}Cr`:n>=100000?`₹${(n/100000).toFixed(1)}L`:`₹${n.toLocaleString("en-IN")}`;
const pct = (a,b) => Math.min(100,Math.round((a/b)*100));

// ─── CSS ──────────────────────────────────────────────────────────────────────
const buildCSS = (dark) => `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
  html,body{overscroll-behavior:none;font-family:'DM Sans',sans-serif;}
  ::-webkit-scrollbar{width:0;height:0;}
  input,textarea,button,select{outline:none;font-family:'DM Sans',sans-serif;}

  :root{
    --bg:${dark?"#120D1F":"#FAF8F3"};
    --bg2:${dark?"#170F28":"#F0EAE0"};
    --card:${dark?"#1E1533":"#FFFFFF"};
    --card2:${dark?"#261C3F":"#F5F0E8"};
    --border:${dark?"rgba(167,139,250,0.10)":"rgba(76,29,149,0.08)"};
    --bh:${dark?"rgba(167,139,250,0.22)":"rgba(76,29,149,0.2)"};
    --text:${dark?"#F0E8D5":"#1A1025"};
    --sub:${dark?"#9B8FA8":"#6B5E7A"};
    --dim:${dark?"#4E4460":"#9D90AC"};
    --accent:${dark?"#A78BFA":"#7C3AED"};
    --accent2:${dark?"#7C3AED":"#6D28D9"};
    --green:${dark?"#86EFAC":"#16A34A"};
    --red:${dark?"#FCA5A5":"#DC2626"};
    --brass:${dark?"#D4A853":"#A07820"};
    --nav:${dark?"#0E0A1A":"#FFFFFF"};
    --pill:${dark?"rgba(167,139,250,0.08)":"rgba(76,29,149,0.06)"};
  }

  .app{background:var(--bg);min-height:100vh;color:var(--text);transition:background .3s,color .3s;}

  /* ── TOP NAV (desktop) ──────────────────────── */
  .top-nav{position:fixed;top:0;left:0;right:0;z-index:100;height:64px;
    display:flex;align-items:center;justify-content:space-between;padding:0 32px;
    background:${dark?"rgba(14,10,26,0.92)":"rgba(255,255,255,0.92)"};
    border-bottom:1px solid var(--border);backdrop-filter:blur(20px);}
  .nav-logo{font-family:'Cormorant Garamond',serif;font-weight:700;font-size:26px;
    letter-spacing:-.5px;color:var(--accent);cursor:pointer;}
  .nav-logo span{color:var(--text);}
  .nav-tabs{display:flex;gap:4px;}
  .nav-tab{padding:7px 16px;border-radius:99px;font-size:13.5px;cursor:pointer;
    border:1px solid transparent;background:transparent;color:var(--sub);
    transition:all .2s;font-family:'DM Sans',sans-serif;font-weight:500;}
  .nav-tab.on{background:var(--accent);color:#fff;border-color:var(--accent);}
  .nav-tab:hover:not(.on){background:var(--pill);color:var(--text);}
  .nav-tab.admin-t{color:var(--red);border-color:rgba(252,165,165,.2);}
  .nav-tab.admin-t.on{background:${dark?"#7F1D1D":"#DC2626"};border-color:transparent;color:#fff;}
  .nav-tab.admin-t:hover:not(.on){background:rgba(252,165,165,.1);}
  .theme-btn{background:var(--pill);border:1px solid var(--border);border-radius:99px;
    padding:7px 14px;font-size:13px;color:var(--sub);cursor:pointer;transition:all .2s;}
  .theme-btn:hover{color:var(--text);}

  /* ── MOBILE TOPBAR ──────────────────────────── */
  .mobile-topbar{display:none;position:fixed;top:0;left:0;right:0;z-index:100;height:56px;
    align-items:center;justify-content:space-between;padding:0 20px;
    background:${dark?"rgba(14,10,26,0.92)":"rgba(255,255,255,0.92)"};
    border-bottom:1px solid var(--border);backdrop-filter:blur(20px);}
  .mob-logo{font-family:'Cormorant Garamond',serif;font-weight:700;font-size:23px;
    letter-spacing:-.5px;color:var(--accent);}
  .mob-logo span{color:var(--text);}

  /* ── BOTTOM NAV (mobile) ────────────────────── */
  .bnav{display:none;position:fixed;bottom:0;left:0;right:0;z-index:100;
    background:var(--nav);border-top:1px solid var(--border);
    padding-bottom:env(safe-area-inset-bottom,8px);}
  .bnav-inner{display:flex;}
  .bnav-item{flex:1;display:flex;flex-direction:column;align-items:center;
    padding:10px 0 7px;cursor:pointer;gap:3px;border:none;background:none;
    color:var(--dim);transition:color .2s;}
  .bnav-item.on{color:var(--accent);}
  .bnav-item svg{width:21px;height:21px;}
  .bnav-lbl{font-size:10px;font-weight:500;}

  /* ── RESPONSIVE ─────────────────────────────── */
  @media(max-width:767px){
    .top-nav{display:none;}
    .mobile-topbar{display:flex;}
    .bnav{display:block;}
    .page-wrap{padding-top:56px;padding-bottom:72px;}
    .feed-side{display:none;}
    .feed-phone{width:100%!important;border-radius:0!important;border:none!important;
      height:calc(100svh - 56px - 72px)!important;position:static!important;box-shadow:none!important;}
    .feed-layout{flex-direction:column;padding:0!important;max-width:100%!important;}
    .feed-phone-wrap{width:100%!important;}
  }
  @media(min-width:768px){
    .page-wrap{padding-top:64px;}
  }

  /* ── FEED LAYOUT ────────────────────────────── */
  .feed-layout{display:flex;gap:36px;max-width:1080px;margin:0 auto;
    padding:32px 24px;padding-top:96px;align-items:flex-start;}
  .feed-phone-wrap{flex-shrink:0;width:375px;}
  .feed-phone{width:375px;height:calc(100vh - 120px);min-height:600px;border-radius:36px;
    border:1px solid var(--border);overflow:hidden;position:sticky;top:80px;
    background:var(--bg2);box-shadow:0 0 60px ${dark?"rgba(124,58,237,0.12)":"rgba(76,29,149,0.08)"};}
  .feed-scroll{height:100%;overflow-y:scroll;scroll-snap-type:y mandatory;scrollbar-width:none;}
  .feed-scroll::-webkit-scrollbar{display:none;}
  .scroll-hint{text-align:center;font-size:12px;color:var(--dim);padding:10px 0;
    animation:bob 2s ease-in-out infinite;}
  @keyframes bob{0%,100%{transform:translateY(0);}50%{transform:translateY(-3px);}}

  /* ── SIDE PANEL ─────────────────────────────── */
  .feed-side{flex:1;min-width:0;}
  .side-headline{font-family:'Cormorant Garamond',serif;font-size:40px;font-weight:700;
    line-height:1.1;margin-bottom:10px;letter-spacing:-.5px;}
  .side-sub{color:var(--sub);font-size:15px;line-height:1.65;margin-bottom:28px;}
  .side-cards{display:flex;flex-direction:column;gap:14px;}
  .side-card{background:var(--card);border:1px solid var(--border);border-radius:18px;padding:18px;}
  .side-card-title{font-size:11px;font-weight:600;color:var(--accent);letter-spacing:1.2px;
    text-transform:uppercase;margin-bottom:14px;}
  .stats-g{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
  .stat-lbl{font-size:11px;color:var(--dim);margin-bottom:3px;}
  .stat-val{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:700;color:var(--text);}
  .trend-item{display:flex;align-items:center;gap:12px;padding:9px 0;
    border-bottom:1px solid var(--border);cursor:pointer;transition:opacity .2s;}
  .trend-item:last-child{border-bottom:none;padding-bottom:0;}
  .trend-item:hover{opacity:.75;}
  .trend-emoji{font-size:22px;}
  .trend-name{font-weight:600;font-size:14px;}
  .trend-pct{font-size:12px;color:var(--dim);margin-top:1px;}
  .trend-arrow{color:var(--accent);margin-left:auto;font-size:14px;}
  .how-step{display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;}
  .how-num{width:24px;height:24px;border-radius:50%;background:var(--accent2);color:#fff;
    font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;}
  .how-text{font-size:13px;color:var(--sub);line-height:1.5;}

  /* ── VIDEO CARD ─────────────────────────────── */
  .vcard{width:100%;min-height:100%;scroll-snap-align:start;position:relative;
    display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;}
  .vcard-bg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:130px;z-index:0;}
  .vcard-overlay{position:absolute;inset:0;z-index:1;
    background:linear-gradient(to top,rgba(0,0,0,.94) 0%,rgba(0,0,0,.35) 55%,transparent 100%);}
  .vcard-content{position:relative;z-index:2;padding:22px;}
  .vcard-tags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;}
  .vcard-tag{background:rgba(167,139,250,.18);color:#C4B5FD;border:1px solid rgba(167,139,250,.25);
    padding:3px 10px;border-radius:99px;font-size:11px;font-weight:500;}
  .vcard-name{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:700;
    color:#fff;line-height:1.1;margin-bottom:5px;letter-spacing:-.3px;}
  .vcard-tag-line{font-size:13.5px;color:rgba(255,255,255,.7);margin-bottom:13px;line-height:1.4;}
  .vcard-founder{display:flex;align-items:center;gap:9px;margin-bottom:14px;}
  .vcard-avatar{width:30px;height:30px;border-radius:50%;background:var(--accent2);
    display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0;}
  .vcard-fn{font-size:13px;color:rgba(255,255,255,.8);font-weight:500;}
  .vcard-fr{font-size:11px;color:rgba(255,255,255,.5);}
  .vcard-bar-row{display:flex;justify-content:space-between;margin-bottom:5px;}
  .vcard-bar-lbl{font-size:11px;color:rgba(255,255,255,.5);}
  .vcard-bar-amt{font-size:13px;font-weight:700;color:#fff;}
  .vcard-bar-bg{height:3px;background:rgba(255,255,255,.15);border-radius:3px;overflow:hidden;margin-bottom:13px;}
  .vcard-bar-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--accent),#C4B5FD);}
  .vcard-actions{display:flex;gap:8px;margin-bottom:4px;}
  .vcard-watch{display:flex;align-items:center;justify-content:center;gap:6px;
    background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);color:#fff;
    border-radius:12px;padding:10px 14px;font-size:13px;font-weight:600;cursor:pointer;
    flex:0;transition:background .2s;}
  .vcard-watch:hover{background:rgba(255,255,255,.2);}
  .vcard-like{display:flex;align-items:center;justify-content:center;
    background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);
    color:#fff;border-radius:12px;padding:10px 13px;font-size:14px;cursor:pointer;
    flex:0;transition:all .2s;}
  .vcard-like.on{background:rgba(220,38,38,.25);border-color:rgba(220,38,38,.4);}
  .vcard-inv{flex:1;background:var(--accent);border:none;color:#fff;border-radius:12px;
    padding:10px 14px;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s;}
  .vcard-inv.done{background:var(--green);}
  .vcard-inv:active{transform:scale(.97);}
  @keyframes pop{0%{transform:scale(1);}35%{transform:scale(1.15);}70%{transform:scale(.97);}100%{transform:scale(1);}}
  .vcard-inv.pop{animation:pop .45s ease;}
  .vcard-ticket{text-align:center;font-size:11px;color:rgba(255,255,255,.35);padding-top:4px;}

  /* ── VIDEO MODAL ────────────────────────────── */
  .vmod{position:fixed;inset:0;z-index:200;background:#000;display:flex;flex-direction:column;}
  .vmod-screen-wrap{flex:1;display:flex;align-items:center;justify-content:center;position:relative;}
  .vmod-screen{width:min(400px,100vw);aspect-ratio:9/16;position:relative;overflow:hidden;
    background:#000;}
  .vmod-screen-bg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:160px;}
  .vmod-screen-ov{position:absolute;inset:0;
    background:linear-gradient(to top,rgba(0,0,0,.9) 0%,rgba(0,0,0,.2) 55%,transparent 100%);}
  .vmod-captions{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
    text-align:center;padding:0 24px;pointer-events:none;width:100%;}
  .vmod-caption{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600;
    color:#fff;text-shadow:0 2px 16px rgba(0,0,0,.8);line-height:1.4;
    opacity:0;transition:opacity .5s;}
  .vmod-caption.vis{opacity:1;}
  .vmod-pp{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
    width:56px;height:56px;border-radius:50%;background:rgba(255,255,255,.18);
    border:2px solid rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center;
    font-size:20px;cursor:pointer;transition:background .2s;}
  .vmod-pp:hover{background:rgba(255,255,255,.28);}
  .vmod-prog{position:absolute;bottom:0;left:0;right:0;height:3px;background:rgba(255,255,255,.15);}
  .vmod-prog-fill{height:100%;background:var(--accent);transition:width .1s linear;}
  .vmod-info{padding:18px 20px;background:var(--bg);}
  .vmod-name{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:700;}
  .vmod-tag{font-size:13px;color:var(--sub);margin-top:3px;}
  .vmod-actions{display:flex;gap:10px;margin-top:14px;}
  .vmod-close{position:absolute;top:16px;right:16px;background:rgba(0,0,0,.5);border:none;
    border-radius:99px;padding:6px 14px;color:#fff;font-size:13px;cursor:pointer;z-index:5;}
  .vmod-timer{position:absolute;bottom:20px;right:20px;font-family:'Cormorant Garamond',serif;
    font-size:38px;font-weight:700;color:var(--accent);text-shadow:0 2px 12px rgba(0,0,0,.6);}

  /* ── INVEST CONFIRM ─────────────────────────── */
  .imod-ov{position:fixed;inset:0;z-index:300;background:rgba(0,0,0,.7);
    display:flex;align-items:flex-end;animation:fadein .2s ease;}
  @keyframes fadein{from{opacity:0;}to{opacity:1;}}
  .imod{background:var(--card);border-radius:28px 28px 0 0;padding:28px 24px;width:100%;}
  .imod-emoji{font-size:40px;margin-bottom:14px;}
  .imod-title{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:700;margin-bottom:6px;}
  .imod-sub{font-size:14px;color:var(--sub);line-height:1.65;margin-bottom:22px;}
  .imod-sub strong{color:var(--text);}
  .imod-btns{display:flex;gap:10px;}
  .imod-cancel{flex:1;background:var(--pill);border:1px solid var(--border);border-radius:14px;
    padding:14px;color:var(--text);font-size:15px;font-weight:500;cursor:pointer;}
  .imod-confirm{flex:1;background:var(--accent);border:none;border-radius:14px;
    padding:14px;color:#fff;font-size:15px;font-weight:700;cursor:pointer;transition:all .2s;}
  .imod-confirm:hover{background:var(--accent2);}

  /* ── REJECT MODAL ───────────────────────────── */
  .rmod-ov{position:fixed;inset:0;z-index:300;background:rgba(0,0,0,.7);
    display:flex;align-items:flex-end;}
  .rmod{background:var(--card);border-radius:28px 28px 0 0;padding:28px 24px;width:100%;}
  .rmod-title{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:700;margin-bottom:4px;}
  .rmod-sub{font-size:14px;color:var(--sub);margin-bottom:14px;}
  .rmod-ta{width:100%;background:var(--bg2);border:1px solid var(--border);border-radius:12px;
    padding:14px;color:var(--text);font-size:14px;min-height:90px;resize:none;
    transition:border-color .2s;}
  .rmod-ta:focus{border-color:var(--accent);}
  .rmod-btns{display:flex;gap:10px;margin-top:14px;}
  .rmod-cancel{flex:1;background:var(--pill);border:1px solid var(--border);border-radius:14px;
    padding:14px;color:var(--text);font-size:14px;font-weight:500;cursor:pointer;}
  .rmod-confirm{flex:1;background:rgba(220,38,38,.85);border:none;border-radius:14px;
    padding:14px;color:#fff;font-size:14px;font-weight:700;cursor:pointer;}

  /* ── GENERAL CARD ───────────────────────────── */
  .card{background:var(--card);border:1px solid var(--border);border-radius:22px;
    padding:20px;margin-bottom:14px;transition:border-color .2s,transform .15s;cursor:pointer;}
  .card:hover{border-color:var(--bh);}
  .card:active{transform:scale(.99);}
  .card-top{display:flex;align-items:flex-start;gap:12px;margin-bottom:12px;}
  .card-emoji{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;
    justify-content:center;font-size:26px;flex-shrink:0;}
  .card-info{flex:1;min-width:0;}
  .card-name{font-family:'Cormorant Garamond',serif;font-size:19px;font-weight:700;letter-spacing:-.2px;}
  .card-tagline{font-size:13px;color:var(--sub);margin-top:2px;line-height:1.4;}
  .sector-badge{background:var(--pill);border:1px solid var(--border);border-radius:8px;
    padding:4px 9px;font-size:11px;color:var(--sub);font-weight:500;white-space:nowrap;flex-shrink:0;}

  /* ── TICKER ─────────────────────────────────── */
  .ticker{background:${dark?"rgba(167,139,250,.07)":"rgba(124,58,237,.06)"};
    border:1px solid ${dark?"rgba(167,139,250,.15)":"rgba(124,58,237,.12)"};
    border-radius:10px;padding:9px 12px;margin-bottom:12px;
    display:flex;align-items:center;gap:8px;font-size:12px;}
  .ticker-dot{width:6px;height:6px;border-radius:50%;background:var(--accent);flex-shrink:0;
    animation:pulse 1.8s ease-in-out infinite;}
  @keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.3;transform:scale(.5);}}

  /* ── PROGRESS ───────────────────────────────── */
  .prog{margin-bottom:14px;}
  .prog-row{display:flex;justify-content:space-between;margin-bottom:6px;}
  .prog-raised{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:700;}
  .prog-target{font-size:13px;color:var(--sub);}
  .prog-bar{height:5px;background:var(--bg2);border-radius:99px;overflow:hidden;}
  .prog-fill{height:100%;border-radius:99px;transition:width .5s ease;}
  .prog-meta{display:flex;justify-content:space-between;margin-top:5px;font-size:11.5px;color:var(--dim);}

  /* ── BUTTONS ────────────────────────────────── */
  .row-btns{display:flex;gap:9px;}
  .watch-btn{flex:1;background:var(--pill);border:1px solid var(--border);border-radius:12px;
    padding:11px;font-size:13.5px;font-weight:600;color:var(--text);cursor:pointer;transition:all .2s;}
  .watch-btn:hover{border-color:var(--bh);}
  .inv-btn{flex:1;border:none;border-radius:12px;padding:11px;font-size:13.5px;
    font-weight:700;cursor:pointer;transition:all .2s;color:#fff;}
  .inv-btn.fresh{background:var(--accent);}
  .inv-btn.done{background:var(--green);color:${dark?"#0a2010":"#fff"};}
  .inv-btn:hover{opacity:.88;}
  .inv-btn:active{transform:scale(.96);}
  .inv-btn.pop{animation:pop .45s ease;}
  .inv-btn-big{width:100%;border:none;border-radius:14px;padding:15px;font-size:16px;
    font-weight:700;cursor:pointer;color:#fff;transition:all .2s;}
  .inv-btn-big.fresh{background:var(--accent);}
  .inv-btn-big.done{background:var(--green);color:${dark?"#0a2010":"#fff"};}
  .inv-btn-big:hover{opacity:.88;}

  /* ── BACK BTN ───────────────────────────────── */
  .back-btn{display:flex;align-items:center;gap:5px;background:none;border:none;
    color:var(--sub);font-size:14px;cursor:pointer;padding:0;transition:color .2s;}
  .back-btn:hover{color:var(--text);}

  /* ── EXPLORE PAGE ───────────────────────────── */
  .explore-wrap{max-width:1080px;margin:0 auto;padding:20px 24px 100px;}
  .page-title{font-family:'Cormorant Garamond',serif;font-size:34px;font-weight:700;
    letter-spacing:-.5px;margin-bottom:6px;}
  .page-sub{font-size:15px;color:var(--sub);margin-bottom:20px;}
  .filter-row{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;margin-bottom:20px;}
  .chip{background:var(--card);border:1px solid var(--border);border-radius:99px;
    padding:7px 15px;font-size:13px;white-space:nowrap;cursor:pointer;color:var(--sub);
    transition:all .2s;font-weight:500;}
  .chip.on{background:var(--accent);border-color:var(--accent);color:#fff;}
  .chip:hover:not(.on){border-color:var(--bh);color:var(--text);}
  .explore-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;}
  .ex-card{background:var(--card);border:1px solid var(--border);border-radius:20px;
    overflow:hidden;cursor:pointer;transition:all .25s;}
  .ex-card:hover{border-color:var(--bh);transform:translateY(-2px);}
  .ex-card-header{height:110px;display:flex;align-items:center;justify-content:center;
    font-size:52px;position:relative;overflow:hidden;}
  .ex-card-play{position:absolute;top:8px;left:8px;background:rgba(0,0,0,.5);
    border:1px solid rgba(255,255,255,.2);color:#fff;border-radius:99px;padding:3px 10px;font-size:11px;}
  .ex-card-body{padding:14px;}
  .ex-card-name{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:700;margin-bottom:2px;}
  .ex-card-tag{font-size:12px;color:var(--sub);margin-bottom:10px;}
  .ex-card-bar{height:3px;background:var(--bg2);border-radius:3px;overflow:hidden;margin-bottom:7px;}
  .ex-card-fill{height:100%;border-radius:3px;}
  .ex-card-meta{display:flex;justify-content:space-between;font-size:12px;}
  .ex-card-pct{color:var(--accent);font-weight:700;}
  .ex-card-ticket{color:var(--dim);}

  /* ── DETAIL PAGE ────────────────────────────── */
  .detail-wrap{padding-bottom:120px;}
  .detail-hero{position:relative;height:300px;display:flex;align-items:flex-end;overflow:hidden;}
  .detail-hero-bg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:180px;opacity:.25;}
  .detail-hero-ov{position:absolute;inset:0;}
  .detail-hero-content{position:relative;z-index:2;padding:28px;width:100%;}
  .detail-back-btn{position:absolute;top:20px;left:20px;z-index:10;
    background:rgba(0,0,0,.4);border:1px solid rgba(255,255,255,.15);color:#fff;
    border-radius:99px;padding:7px 15px;font-size:13px;cursor:pointer;backdrop-filter:blur(8px);
    transition:background .2s;}
  .detail-back-btn:hover{background:rgba(0,0,0,.6);}
  .detail-play-btn{position:absolute;top:20px;right:20px;z-index:10;
    background:var(--accent);border:none;color:#fff;border-radius:99px;
    padding:7px 16px;font-size:13px;font-weight:700;cursor:pointer;transition:opacity .2s;}
  .detail-play-btn:hover{opacity:.85;}
  .detail-name{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:700;
    color:#fff;letter-spacing:-.5px;margin-bottom:4px;}
  .detail-tagline{font-size:15px;color:rgba(255,255,255,.7);}
  .detail-city{font-size:13px;color:rgba(255,255,255,.5);margin-top:3px;}
  .dsec{padding:22px 22px 0;}
  .dsec-title{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:700;
    margin-bottom:14px;display:flex;align-items:center;gap:8px;}
  .dsec-title::after{content:'';flex:1;height:1px;background:var(--border);}
  .funding-box{background:var(--card);border:1px solid var(--border);border-radius:20px;padding:22px;margin-bottom:0;}
  .funding-box-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;}
  .funding-raised-big{font-family:'Cormorant Garamond',serif;font-size:34px;font-weight:700;}
  .funding-of{font-size:13px;color:var(--sub);margin-top:2px;}
  .round-badge{padding:5px 13px;border-radius:99px;font-size:12px;font-weight:600;}
  .round-open{background:rgba(134,239,172,.12);color:var(--green);border:1px solid rgba(134,239,172,.25);}
  .round-closed{background:rgba(252,165,165,.1);color:var(--red);border:1px solid rgba(252,165,165,.2);}
  .funding-bar-big{height:7px;background:var(--bg2);border-radius:99px;overflow:hidden;margin-bottom:12px;}
  .funding-bar-big-fill{height:100%;border-radius:99px;}
  .funding-meta-row{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;}
  .fm-item-lbl{font-size:11px;color:var(--dim);margin-bottom:3px;text-transform:uppercase;letter-spacing:.5px;}
  .fm-item-val{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:700;}
  .hl-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
  .hl-card{background:var(--card2);border:1px solid var(--border);border-radius:12px;
    padding:12px;font-size:13px;font-weight:500;}
  .quote-block{background:var(--card2);border-left:3px solid var(--accent);
    border-radius:0 12px 12px 0;padding:14px 16px;}
  .quote-text{font-size:14px;font-style:italic;line-height:1.65;color:var(--sub);}
  .quote-by{font-size:12px;color:var(--accent);margin-top:8px;font-weight:600;}
  .sim-card{display:flex;align-items:center;gap:12px;background:var(--card2);
    border:1px solid var(--border);border-radius:14px;padding:14px;margin-bottom:10px;cursor:pointer;transition:border-color .2s;}
  .sim-card:hover{border-color:var(--bh);}
  .sim-emoji{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;}
  .invest-sticky{position:fixed;bottom:0;left:0;right:0;padding:14px 20px;
    background:${dark?"rgba(14,10,26,0.92)":"rgba(255,255,255,0.92)"};
    border-top:1px solid var(--border);z-index:90;backdrop-filter:blur(20px);}
  @media(min-width:768px){.invest-sticky{max-width:900px;margin:0 auto;left:50%;
    transform:translateX(-50%);border-radius:0;}}

  /* ── PORTFOLIO PAGE ─────────────────────────── */
  .port-wrap{max-width:860px;margin:0 auto;padding:24px 24px 100px;}
  .port-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:28px;}
  .port-stat{background:var(--card);border:1px solid var(--border);border-radius:18px;padding:20px;}
  .port-stat-lbl{font-size:11px;color:var(--dim);text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px;}
  .port-stat-val{font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:700;}
  .port-stat-sub{font-size:12px;color:var(--sub);margin-top:4px;}
  .alloc-section{background:var(--card);border:1px solid var(--border);border-radius:18px;
    padding:22px;margin-bottom:20px;}
  .alloc-title{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:700;margin-bottom:18px;}
  .alloc-row{margin-bottom:14px;}
  .alloc-row-top{display:flex;justify-content:space-between;font-size:13px;margin-bottom:5px;}
  .alloc-row-name{font-weight:500;}
  .alloc-row-pct{color:var(--accent);font-weight:700;}
  .alloc-bar{height:6px;background:var(--bg2);border-radius:99px;overflow:hidden;}
  .alloc-fill{height:100%;border-radius:99px;background:var(--accent);transition:width .6s ease;}
  .inv-card{background:var(--card);border:1px solid var(--border);border-radius:18px;
    padding:18px;margin-bottom:12px;display:flex;align-items:center;gap:14px;cursor:pointer;
    transition:border-color .2s;}
  .inv-card:hover{border-color:var(--bh);}
  .inv-card-emoji{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;
    justify-content:center;font-size:24px;flex-shrink:0;}
  .inv-card-info{flex:1;min-width:0;}
  .inv-card-name{font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:700;}
  .inv-card-meta{font-size:12px;color:var(--sub);margin-top:2px;}
  .inv-card-prog{margin-top:8px;}
  .inv-card-progbar{height:3px;background:var(--bg2);border-radius:3px;overflow:hidden;}
  .inv-card-progfill{height:100%;border-radius:3px;}
  .inv-card-amt{text-align:right;flex-shrink:0;}
  .inv-card-amount{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:700;color:var(--green);}
  .inv-card-pct{font-size:12px;color:var(--sub);margin-top:2px;}
  .empty-state{text-align:center;padding:60px 20px;color:var(--sub);}
  .empty-ico{font-size:52px;margin-bottom:14px;}
  .empty-title{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:700;color:var(--text);margin-bottom:6px;}

  /* ── RAISE CAPITAL PAGE ─────────────────────── */
  .raise-wrap{max-width:640px;margin:0 auto;padding:32px 24px 100px;}
  .raise-steps{display:flex;gap:10px;margin-bottom:32px;}
  .raise-step{flex:1;background:var(--card);border:1px solid var(--border);border-radius:14px;
    padding:14px;text-align:center;}
  .raise-step-num{width:28px;height:28px;border-radius:50%;background:var(--accent);color:#fff;
    font-weight:700;font-size:13px;display:flex;align-items:center;justify-content:center;margin:0 auto 8px;}
  .raise-step-text{font-size:12px;color:var(--sub);line-height:1.4;}
  .form-group{margin-bottom:18px;}
  .form-lbl{font-size:12px;font-weight:600;color:var(--sub);margin-bottom:6px;display:block;
    text-transform:uppercase;letter-spacing:.6px;}
  .form-input{width:100%;padding:12px 16px;border-radius:12px;background:var(--card);
    border:1px solid var(--border);color:var(--text);font-size:14px;transition:border-color .2s;}
  .form-input:focus{border-color:var(--accent);}
  .form-input::placeholder{color:var(--dim);}
  .form-textarea{width:100%;padding:12px 16px;border-radius:12px;background:var(--card);
    border:1px solid var(--border);color:var(--text);font-size:14px;resize:vertical;min-height:100px;
    transition:border-color .2s;}
  .form-textarea:focus{border-color:var(--accent);}
  .form-textarea::placeholder{color:var(--dim);}
  .form-select{width:100%;padding:12px 16px;border-radius:12px;background:var(--card);
    border:1px solid var(--border);color:var(--text);font-size:14px;cursor:pointer;
    appearance:none;}
  .submit-btn{width:100%;padding:15px;border-radius:14px;border:none;background:var(--accent);
    color:#fff;font-size:16px;font-weight:700;cursor:pointer;transition:opacity .2s;}
  .submit-btn:hover{opacity:.87;}
  .success-box{text-align:center;padding:40px 0;}
  .success-ico{font-size:56px;margin-bottom:16px;}
  .success-title{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:700;margin-bottom:8px;}
  .success-sub{font-size:15px;color:var(--sub);line-height:1.65;}

  /* ── PROFILE PAGE ───────────────────────────── */
  .prof-wrap{max-width:600px;margin:0 auto;padding:32px 24px 100px;}
  .prof-header{text-align:center;margin-bottom:24px;}
  .prof-avatar{width:80px;height:80px;border-radius:50%;background:var(--accent2);
    display:flex;align-items:center;justify-content:center;font-size:34px;margin:0 auto 14px;}
  .prof-name{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:700;}
  .prof-tag{font-size:14px;color:var(--sub);margin-top:4px;}
  .prof-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px;}
  .prof-stat{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:16px;text-align:center;}
  .prof-stat-val{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:700;}
  .prof-stat-lbl{font-size:11px;color:var(--dim);margin-top:3px;}
  .prof-btn{width:100%;padding:15px;background:var(--card);border:1px solid var(--border);
    border-radius:14px;color:var(--text);font-size:15px;font-weight:500;cursor:pointer;
    text-align:left;display:flex;justify-content:space-between;align-items:center;
    transition:border-color .2s;margin-bottom:10px;}
  .prof-btn:hover{border-color:var(--bh);}

  /* ── ADMIN PAGE ─────────────────────────────── */
  .adm-wrap{max-width:860px;margin:0 auto;padding:24px 24px 100px;}
  .adm-login{max-width:420px;margin:60px auto 0;text-align:center;}
  .adm-lock{font-size:48px;margin-bottom:16px;}
  .adm-login-title{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:700;margin-bottom:6px;}
  .adm-login-sub{font-size:14px;color:var(--sub);margin-bottom:24px;}
  .adm-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px;}
  .adm-stat{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:16px;}
  .adm-stat-val{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:700;margin-bottom:2px;}
  .adm-stat-lbl{font-size:11px;color:var(--dim);text-transform:uppercase;letter-spacing:.5px;}
  .adm-tabs{display:flex;gap:8px;margin-bottom:20px;}
  .adm-tab{padding:7px 16px;border-radius:99px;font-size:13px;cursor:pointer;
    border:1px solid var(--border);background:var(--card);color:var(--sub);transition:all .2s;font-weight:500;}
  .adm-tab.on{background:var(--accent);border-color:var(--accent);color:#fff;}
  .sort-row{display:flex;gap:8px;margin-bottom:14px;overflow-x:auto;}
  .sort-chip{background:var(--card);border:1px solid var(--border);border-radius:8px;
    padding:6px 12px;font-size:12px;cursor:pointer;color:var(--sub);white-space:nowrap;font-weight:500;}
  .sort-chip.on{background:${dark?"rgba(167,139,250,.15)":"rgba(124,58,237,.1)"};border-color:var(--accent);color:var(--accent);}
  .app-card{background:var(--card);border:1px solid var(--border);border-radius:16px;
    padding:18px;margin-bottom:12px;}
  .app-card-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;}
  .app-card-name{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:700;}
  .app-card-by{font-size:12px;color:var(--sub);margin-top:2px;}
  .app-card-date{font-size:11px;color:var(--dim);}
  .app-card-pitch{font-size:13px;color:var(--sub);line-height:1.55;margin-bottom:12px;}
  .app-btns{display:flex;gap:9px;}
  .app-approve{flex:1;background:rgba(134,239,172,.12);border:1px solid rgba(134,239,172,.25);
    border-radius:10px;padding:10px;color:var(--green);font-weight:700;font-size:13px;cursor:pointer;
    transition:background .2s;}
  .app-approve:hover{background:rgba(134,239,172,.2);}
  .app-reject{flex:1;background:rgba(252,165,165,.08);border:1px solid rgba(252,165,165,.2);
    border-radius:10px;padding:10px;color:var(--red);font-weight:700;font-size:13px;cursor:pointer;
    transition:background .2s;}
  .app-reject:hover{background:rgba(252,165,165,.15);}
  .live-card{background:var(--card);border:1px solid var(--border);border-radius:14px;
    padding:16px;margin-bottom:10px;display:flex;align-items:center;gap:14px;}
  .live-card-emoji{font-size:32px;}
  .live-card-info{flex:1;}
  .live-card-name{font-family:'Cormorant Garamond',serif;font-size:15px;font-weight:700;margin-bottom:2px;}
  .live-card-meta{font-size:12px;color:var(--dim);}
  .live-bar-section{flex:1;}
  .live-bar-row{display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;}
  .live-bar-pct{color:var(--accent);font-weight:700;}
  .live-bar-amt{color:var(--dim);}
  .live-bar{height:5px;background:var(--bg2);border-radius:5px;overflow:hidden;}
  .live-bar-fill{height:100%;border-radius:5px;}

  /* ── TOPBAR INNER PADDING ───────────────────── */
  .page-inner{padding:24px 24px 100px;max-width:1080px;margin:0 auto;}
`;

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark]               = useState(true);
  const [tab, setTab]                 = useState("home");
  const [detail, setDetail]           = useState(null);
  const [video, setVideo]             = useState(null);
  const [vProgress, setVProgress]     = useState(0);
  const [vPlaying, setVPlaying]       = useState(false);
  const [investments, setInvestments] = useState({});
  const [investAnim, setInvestAnim]   = useState(null);
  const [liked, setLiked]             = useState(new Set());
  const [sectorFilter, setSectorFilter] = useState("All");
  const [investConfirm, setInvestConfirm] = useState(null);
  const [showAdmin, setShowAdmin]     = useState(false);
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [adminPass, setAdminPass]     = useState("");
  const [adminPassErr, setAdminPassErr] = useState(false);
  const [adminTab, setAdminTab]       = useState("applications");
  const [adminSort, setAdminSort]     = useState("newest");
  const [applications, setApplications] = useState(PENDING_APPLICATIONS);
  const [liveStartups, setLiveStartups] = useState(STARTUPS);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [raiseForm, setRaiseForm]     = useState({company:"",founder:"",email:"",sector:"",raise:"",traction:""});
  const [raiseSubmitted, setRaiseSubmitted] = useState(false);
  const vTimer = useRef(null);

  // ── VIDEO ────────────────────────────────────────────────────────────────
  const openVideo = (s) => { setVideo(s); setVProgress(0); setVPlaying(true); };
  const closeVideo = () => { setVideo(null); setVProgress(0); setVPlaying(false); clearInterval(vTimer.current); };

  useEffect(() => {
    if (video && vPlaying) {
      vTimer.current = setInterval(() => {
        setVProgress(p => {
          if (p >= 100) { clearInterval(vTimer.current); setVPlaying(false); return 100; }
          return p + (100/45)*0.1;
        });
      }, 100);
    }
    return () => clearInterval(vTimer.current);
  }, [video, vPlaying]);

  // ── INVEST ───────────────────────────────────────────────────────────────
  const doInvest = (s) => {
    if (investments[s.id]) return;
    setInvestAnim(s.id); setTimeout(() => setInvestAnim(null), 600);
    setInvestments(p => ({...p, [s.id]: s.ticketPrice}));
    setLiveStartups(p => p.map(x => x.id===s.id
      ? {...x, raised:x.raised+x.ticketPrice, tickets:x.tickets+1, backers:x.backers+1}
      : x));
    setInvestConfirm(null);
  };

  // ── HELPERS ──────────────────────────────────────────────────────────────
  const filtered  = () => sectorFilter==="All" ? liveStartups : liveStartups.filter(s=>s.sector===sectorFilter);
  const trending  = () => [...liveStartups].sort((a,b)=>b.trendingScore-a.trendingScore).slice(0,4);
  const similar   = (s) => liveStartups.filter(x=>x.sector===s.sector && x.id!==s.id).slice(0,2);
  const backed    = () => liveStartups.filter(s=>investments[s.id]);
  const totalInv  = () => backed().reduce((a,s)=>a+s.ticketPrice, 0);
  const toggleLike= (id) => setLiked(p => { const n=new Set(p); n.has(id)?n.delete(id):n.add(id); return n; });

  const sortedApps = () => {
    const a = [...applications];
    if (adminSort==="newest") return a.sort((x,y)=>new Date(y.appliedDate)-new Date(x.appliedDate));
    if (adminSort==="oldest") return a.sort((x,y)=>new Date(x.appliedDate)-new Date(y.appliedDate));
    return a;
  };

  const approveApp = (app) => {
    setLiveStartups(p => [...p, {
      ...app, id:Date.now(), raised:0, target:1000000, ticketPrice:5000,
      totalTickets:200, tickets:0, backers:0, trendingScore:50, raisedLast24h:0,
      highlights:["Recently approved"], topInvestorQuote:"", topInvestorName:"",
      color:"#A78BFA", emoji:"🚀", pitchScript:["New startup just approved!"]
    }]);
    setApplications(p => p.filter(a=>a.id!==app.id));
  };
  const confirmReject = () => {
    setApplications(p => p.filter(a=>a.id!==rejectTarget.id));
    setRejectTarget(null); setRejectReason("");
  };

  const css = buildCSS(dark);

  // ═══════════════════════════════════════════════════════════════════════════
  // SHARED COMPONENTS
  // ═══════════════════════════════════════════════════════════════════════════

  const navIcons = {
    home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    explore: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    portfolio: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    raise: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    profile: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  };

  const goTo = (t) => { setTab(t); setDetail(null); setShowAdmin(false); };

  const TopNav = () => (
    <nav className="top-nav">
      <div className="nav-logo" onClick={() => goTo("home")}>Insta<span>Vest</span></div>
      <div className="nav-tabs">
        {[["home","Feed"],["explore","Explore"],["portfolio","Portfolio"],["raise","Raise Capital"]].map(([id,label])=>(
          <button key={id} className={`nav-tab ${tab===id&&!showAdmin?"on":""}`} onClick={()=>goTo(id)}>{label}</button>
        ))}
        <button className={`nav-tab admin-t ${showAdmin?"on":""}`}
          onClick={()=>{setShowAdmin(true);setTab("admin");}}>Admin</button>
      </div>
      <button className="theme-btn" onClick={()=>setDark(d=>!d)}>{dark?"☀️ Light":"🌙 Dark"}</button>
    </nav>
  );

  const MobileTopbar = () => (
    <div className="mobile-topbar">
      <div className="mob-logo">Insta<span>Vest</span></div>
      <button className="theme-btn" onClick={()=>setDark(d=>!d)} style={{fontSize:12,padding:"5px 10px"}}>{dark?"☀️":"🌙"}</button>
    </div>
  );

  const BottomNav = () => {
    const items = [
      {id:"home",label:"Home"},
      {id:"explore",label:"Explore"},
      {id:"portfolio",label:"Portfolio"},
      {id:"raise",label:"Raise"},
      {id:"profile",label:"Profile"},
    ];
    const cur = showAdmin ? "admin" : detail ? "" : tab;
    return (
      <nav className="bnav">
        <div className="bnav-inner">
          {items.map(item=>(
            <button key={item.id} className={`bnav-item ${cur===item.id?"on":""}`}
              onClick={()=>goTo(item.id)}>
              {navIcons[item.id]}
              <span className="bnav-lbl">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    );
  };

  const Ticker = ({s}) => (
    <div className="ticker">
      <div className="ticker-dot"/>
      <span style={{color:"var(--sub)"}}>
        <strong style={{color:"var(--accent)"}}>{fmt(s.raisedLast24h)}</strong> raised today ·{" "}
        <strong style={{color:"var(--text)"}}>{s.backers}</strong> investors
      </span>
    </div>
  );

  const ProgBar = ({s, mini}) => (
    <div className="prog">
      <div className="prog-row">
        <span className="prog-raised" style={mini?{fontSize:15}:{}}>{fmt(s.raised)}</span>
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

  const InvBtn = ({s, big}) => {
    const done = !!investments[s.id];
    const cls = `${big?"inv-btn-big":"inv-btn"} ${done?"done":"fresh"} ${investAnim===s.id?"pop":""}`;
    return (
      <button className={cls} onClick={()=>done?null:setInvestConfirm(s)}>
        {done ? `✓ Invested ₹${s.ticketPrice.toLocaleString()}` : `Invest ₹${s.ticketPrice.toLocaleString()} →`}
      </button>
    );
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // MODALS
  // ═══════════════════════════════════════════════════════════════════════════

  const VideoModal = () => {
    if (!video) return null;
    const s = video;
    const remaining = Math.max(0, Math.ceil(45*(1-vProgress/100)));
    const capIdx = Math.min(Math.floor((vProgress/100)*s.pitchScript.length), s.pitchScript.length-1);
    return (
      <div className="vmod">
        <div className="vmod-screen-wrap">
          <div className="vmod-screen">
            <div className="vmod-screen-bg" style={{background:`linear-gradient(160deg,${s.color}60,#0A0614 70%)`}}>
              <span style={{opacity:.12}}>{s.emoji}</span>
            </div>
            <div className="vmod-screen-ov"/>
            <button className="vmod-close" onClick={closeVideo}>✕ Close</button>
            <div className="vmod-captions">
              {s.pitchScript.map((line,i) => (
                <div key={i} className={`vmod-caption ${vPlaying && capIdx===i ? "vis" : ""}`}>{line}</div>
              ))}
              {!vPlaying && vProgress===0 && <div style={{color:"rgba(255,255,255,.5)",fontSize:14}}>Tap ▶ to watch the 45-second pitch</div>}
              {!vPlaying && vProgress>=100 && <div style={{color:"#fff",fontSize:16,fontFamily:"'Cormorant Garamond',serif",fontWeight:600}}>Pitch Complete 🎉</div>}
            </div>
            <div className="vmod-pp" onClick={()=>vProgress>=100?(setVProgress(0),setVPlaying(true)):setVPlaying(p=>!p)}>
              {vProgress>=100?"↺":vPlaying?"⏸":"▶"}
            </div>
            <div className="vmod-timer">{remaining>0?`0:${remaining.toString().padStart(2,"0")}`:""}</div>
            <div className="vmod-prog"><div className="vmod-prog-fill" style={{width:`${vProgress}%`}}/></div>
          </div>
        </div>
        <div className="vmod-info">
          <div className="vmod-name">{s.name}</div>
          <div className="vmod-tag">{s.tagline}</div>
          <div className="vmod-actions">
            <button className="watch-btn" onClick={closeVideo} style={{flex:1}}>Close</button>
            <InvBtn s={s}/>
          </div>
        </div>
      </div>
    );
  };

  const InvestConfirmModal = () => {
    if (!investConfirm) return null;
    const s = investConfirm;
    return (
      <div className="imod-ov" onClick={()=>setInvestConfirm(null)}>
        <div className="imod" onClick={e=>e.stopPropagation()}>
          <div className="imod-emoji">{s.emoji}</div>
          <div className="imod-title">Invest in {s.name}?</div>
          <div className="imod-sub">
            You're committing <strong>₹{s.ticketPrice.toLocaleString()}</strong> to <strong>{s.name}</strong>.
            {" "}This is a simulated investment on InstaVest MVP — no real funds are moved.
          </div>
          <div className="imod-btns">
            <button className="imod-cancel" onClick={()=>setInvestConfirm(null)}>Cancel</button>
            <button className="imod-confirm" onClick={()=>doInvest(s)}>Confirm ₹{s.ticketPrice.toLocaleString()} →</button>
          </div>
        </div>
      </div>
    );
  };

  const RejectModal = () => {
    if (!rejectTarget) return null;
    return (
      <div className="rmod-ov" onClick={()=>setRejectTarget(null)}>
        <div className="rmod" onClick={e=>e.stopPropagation()}>
          <div className="rmod-title">Reject {rejectTarget.name}?</div>
          <div className="rmod-sub">Optionally add a reason for the founder.</div>
          <textarea className="rmod-ta" placeholder="e.g. Insufficient traction, needs more revenue…"
            value={rejectReason} onChange={e=>setRejectReason(e.target.value)}/>
          <div className="rmod-btns">
            <button className="rmod-cancel" onClick={()=>setRejectTarget(null)}>Cancel</button>
            <button className="rmod-confirm" onClick={confirmReject}>Reject Application</button>
          </div>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // VIDEO CARD (TikTok-style)
  // ═══════════════════════════════════════════════════════════════════════════
  const VideoCard = ({s}) => {
    const p = pct(s.raised,s.target);
    const closed = s.raised >= s.target;
    const inv = !!investments[s.id];
    return (
      <div className="vcard" style={{minHeight:"calc(100svh - 56px - 72px)"}}>
        <div className="vcard-bg" style={{background:`linear-gradient(160deg,${s.color}50 0%,#0A0614 65%,#080312 100%)`}}>
          <span style={{opacity:.1}}>{s.emoji}</span>
        </div>
        <div className="vcard-overlay"/>
        <div className="vcard-content">
          <div className="vcard-tags">
            <span className="vcard-tag">{s.sector}</span>
            <span className="vcard-tag">{s.city}</span>
          </div>
          <div className="vcard-name" onClick={()=>setDetail(s)}>{s.name}</div>
          <div className="vcard-tag-line" onClick={()=>setDetail(s)}>{s.tagline}</div>
          <div className="vcard-founder">
            <div className="vcard-avatar">{s.founderName.split(" ").map(w=>w[0]).join("").slice(0,2)}</div>
            <div>
              <div className="vcard-fn">{s.founderName}</div>
              <div className="vcard-fr">{s.founderRole}</div>
            </div>
          </div>
          <div className="vcard-bar-row">
            <span className="vcard-bar-lbl">{closed?"Round Closed 🔒":`${p}% funded`}</span>
            <span className="vcard-bar-amt">{fmt(s.raised)} / {fmt(s.target)}</span>
          </div>
          <div className="vcard-bar-bg">
            <div className="vcard-bar-fill" style={{width:`${p}%`}}/>
          </div>
          <div className="vcard-actions">
            <button className="vcard-watch" onClick={()=>openVideo(s)}>▶ 45s</button>
            <button className={`vcard-inv ${inv?"done":""} ${investAnim===s.id?"pop":""}`}
              onClick={()=>inv?null:setInvestConfirm(s)}>
              {inv?`✓ Invested`:`Invest ₹${s.ticketPrice.toLocaleString()} →`}
            </button>
            <button className={`vcard-like ${liked.has(s.id)?"on":""}`} onClick={()=>toggleLike(s.id)}>
              {liked.has(s.id)?"❤️":"🤍"}
            </button>
          </div>
          <div className="vcard-ticket">
            {closed ? "Round fully subscribed" : `${s.totalTickets-s.tickets} tickets left · Min ₹${s.ticketPrice.toLocaleString()}`}
          </div>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // HOME PAGE (Feed)
  // ═══════════════════════════════════════════════════════════════════════════
  const HomePage = () => {
    const totalRaised = liveStartups.reduce((a,s)=>a+s.raised,0);
    const hot = trending();
    return (
      <div className="page-wrap">
        <div className="feed-layout">
          <div className="feed-phone-wrap">
            <div className="feed-phone">
              <div className="feed-scroll">
                {liveStartups.map(s=><VideoCard key={s.id} s={s}/>)}
              </div>
            </div>
            <div className="scroll-hint">↕ Scroll to explore pitches</div>
          </div>
          <div className="feed-side">
            <div className="side-headline">Discover India's<br/>next big startups.</div>
            <div className="side-sub">Watch 45-second pitches. Back the ones you believe in. Start from ₹5,000 and become part of India's startup story.</div>
            <div className="side-cards">
              <div className="side-card">
                <div className="side-card-title">📊 Platform Stats</div>
                <div className="stats-g">
                  <div><div className="stat-lbl">Startups Live</div><div className="stat-val">{liveStartups.length}</div></div>
                  <div><div className="stat-lbl">Total Raised</div><div className="stat-val">{fmt(totalRaised)}</div></div>
                  <div><div className="stat-lbl">Avg Ticket</div><div className="stat-val">₹6,200</div></div>
                  <div><div className="stat-lbl">Investors</div><div className="stat-val">12,400</div></div>
                </div>
              </div>
              <div className="side-card">
                <div className="side-card-title">🔥 Trending Now</div>
                {hot.map(s=>(
                  <div className="trend-item" key={s.id} onClick={()=>setDetail(s)}>
                    <span className="trend-emoji">{s.emoji}</span>
                    <div>
                      <div className="trend-name">{s.name}</div>
                      <div className="trend-pct">{pct(s.raised,s.target)}% funded · +{fmt(s.raisedLast24h)} today</div>
                    </div>
                    <span className="trend-arrow">→</span>
                  </div>
                ))}
              </div>
              <div className="side-card">
                <div className="side-card-title">💡 How It Works</div>
                {[["Watch 45-second pitches from founders","1"],["Like startups you believe in","2"],["Invest from ₹5,000 per ticket","3"],["Round closes when target is met","4"]].map(([t,n])=>(
                  <div className="how-step" key={n}>
                    <div className="how-num">{n}</div>
                    <div className="how-text">{t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // EXPLORE PAGE
  // ═══════════════════════════════════════════════════════════════════════════
  const ExplorePage = () => {
    const cards = filtered();
    return (
      <div className="page-wrap">
        <div className="explore-wrap">
          <div className="page-title">Explore Startups</div>
          <div className="page-sub">Browse {liveStartups.length} active funding rounds across India.</div>
          <div className="filter-row">
            {SECTORS.map(sec=>(
              <button key={sec} className={`chip ${sectorFilter===sec?"on":""}`} onClick={()=>setSectorFilter(sec)}>{sec}</button>
            ))}
          </div>
          <div className="explore-grid">
            {cards.map(s=>{
              const p = pct(s.raised,s.target);
              const closed = s.raised>=s.target;
              return (
                <div className="ex-card" key={s.id} onClick={()=>setDetail(s)}>
                  <div className="ex-card-header" style={{background:`linear-gradient(160deg,${s.color}50,${s.color}20)`}}>
                    <span>{s.emoji}</span>
                    <div className="ex-card-play" onClick={e=>{e.stopPropagation();openVideo(s);}}>▶ 45s</div>
                    {liked.has(s.id) && <div style={{position:"absolute",top:8,right:8,background:"rgba(220,38,38,.2)",border:"1px solid rgba(220,38,38,.3)",borderRadius:"99px",padding:"2px 8px",fontSize:11,color:"#FCA5A5"}}>❤️</div>}
                  </div>
                  <div className="ex-card-body">
                    <div style={{marginBottom:6}}>
                      <span style={{background:"var(--pill)",borderRadius:99,padding:"2px 8px",fontSize:11,color:"var(--sub)",fontWeight:500}}>{s.sector}</span>
                      <span style={{fontSize:11,color:"var(--dim)",marginLeft:6}}>📍{s.city}</span>
                    </div>
                    <div className="ex-card-name">{s.name}</div>
                    <div className="ex-card-tag">{s.tagline}</div>
                    <div className="ex-card-bar"><div className="ex-card-fill" style={{width:`${p}%`,background:s.color}}/></div>
                    <div className="ex-card-meta">
                      <span className="ex-card-pct">{p}% {closed?"🔒":""}</span>
                      <span className="ex-card-ticket">Min ₹{s.ticketPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // PORTFOLIO PAGE
  // ═══════════════════════════════════════════════════════════════════════════
  const PortfolioPage = () => {
    const b = backed();
    const total = totalInv();
    const sectors = b.reduce((acc,s)=>{ acc[s.sector]=(acc[s.sector]||0)+s.ticketPrice; return acc; },{});
    const maxSectorAmt = Math.max(...Object.values(sectors),1);
    return (
      <div className="page-wrap">
        <div className="port-wrap">
          <div className="page-title">My Portfolio</div>
          <div className="page-sub">Your investment activity on InstaVest.</div>
          <div className="port-summary">
            <div className="port-stat">
              <div className="port-stat-lbl">Total Invested</div>
              <div className="port-stat-val" style={{color:"var(--accent)"}}>{total>0?fmt(total):"₹0"}</div>
              <div className="port-stat-sub">{b.length} startup{b.length!==1?"s":""} backed</div>
            </div>
            <div className="port-stat">
              <div className="port-stat-lbl">Sectors</div>
              <div className="port-stat-val">{Object.keys(sectors).length}</div>
              <div className="port-stat-sub">{Object.keys(sectors).join(", ")||"—"}</div>
            </div>
            <div className="port-stat">
              <div className="port-stat-lbl">Avg Round Progress</div>
              <div className="port-stat-val">
                {b.length>0?`${Math.round(b.reduce((a,s)=>a+pct(s.raised,s.target),0)/b.length)}%`:"—"}
              </div>
              <div className="port-stat-sub">across your investments</div>
            </div>
          </div>

          {b.length>0 && (
            <div className="alloc-section">
              <div className="alloc-title">Allocation by Sector</div>
              {Object.entries(sectors).sort((a,b)=>b[1]-a[1]).map(([sec,amt])=>(
                <div className="alloc-row" key={sec}>
                  <div className="alloc-row-top">
                    <span className="alloc-row-name">{sec}</span>
                    <span className="alloc-row-pct">{Math.round(amt/total*100)}% · {fmt(amt)}</span>
                  </div>
                  <div className="alloc-bar">
                    <div className="alloc-fill" style={{width:`${(amt/maxSectorAmt)*100}%`}}/>
                  </div>
                </div>
              ))}
            </div>
          )}

          {b.length===0
            ? <div className="empty-state">
                <div className="empty-ico">💼</div>
                <div className="empty-title">No investments yet</div>
                <p style={{fontSize:14,color:"var(--sub)"}}>Browse the feed and back your first startup to build your portfolio.</p>
              </div>
            : (
              <div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,marginBottom:14}}>Your Investments</div>
                {b.map(s=>(
                  <div className="inv-card" key={s.id} onClick={()=>setDetail(s)}>
                    <div className="inv-card-emoji" style={{background:`${s.color}20`}}>{s.emoji}</div>
                    <div className="inv-card-info">
                      <div className="inv-card-name">{s.name}</div>
                      <div className="inv-card-meta">{s.sector} · {s.city}</div>
                      <div className="inv-card-prog">
                        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--dim)",marginBottom:4}}>
                          <span>{pct(s.raised,s.target)}% funded</span>
                          <span>{s.totalTickets-s.tickets} tickets left</span>
                        </div>
                        <div className="inv-card-progbar">
                          <div className="inv-card-progfill" style={{width:`${pct(s.raised,s.target)}%`,background:s.color}}/>
                        </div>
                      </div>
                    </div>
                    <div className="inv-card-amt">
                      <div className="inv-card-amount">{fmt(s.ticketPrice)}</div>
                      <div className="inv-card-pct">{pct(s.raised,s.target)}% filled</div>
                    </div>
                  </div>
                ))}
              </div>
            )
          }
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // RAISE CAPITAL PAGE
  // ═══════════════════════════════════════════════════════════════════════════
  const RaiseCapitalPage = () => {
    if (raiseSubmitted) return (
      <div className="page-wrap">
        <div className="raise-wrap">
          <div className="success-box">
            <div className="success-ico">🎉</div>
            <div className="success-title">Application Submitted!</div>
            <div className="success-sub">
              We've received your application for <strong>{raiseForm.company}</strong>.
              Our team reviews all applications within 5–7 business days.
              If selected, we'll schedule a 30-minute call and onboard you to record your 45-second pitch.
            </div>
          </div>
        </div>
      </div>
    );
    const setF = (k,v) => setRaiseForm(p=>({...p,[k]:v}));
    return (
      <div className="page-wrap">
        <div className="raise-wrap">
          <div className="page-title">Raise Capital on InstaVest</div>
          <div className="page-sub">If selected, you'll record a 45-second pitch and go live to thousands of investors across India.</div>
          <div className="raise-steps">
            {[["1","Apply below"],["2","Review (5–7 days)"],["3","Record 45s pitch"],["4","Go live"]].map(([n,t])=>(
              <div className="raise-step" key={n}>
                <div className="raise-step-num">{n}</div>
                <div className="raise-step-text">{t}</div>
              </div>
            ))}
          </div>
          {[["Company Name","company","e.g. GreenHarvest"],["Founder Name","founder","Your full name"],["Email","email","you@startup.in"]].map(([l,k,ph])=>(
            <div className="form-group" key={k}>
              <label className="form-lbl">{l}</label>
              <input className="form-input" placeholder={ph} type={k==="email"?"email":"text"}
                value={raiseForm[k]} onChange={e=>setF(k,e.target.value)}/>
            </div>
          ))}
          <div className="form-group">
            <label className="form-lbl">Sector</label>
            <select className="form-select" value={raiseForm.sector} onChange={e=>setF("sector",e.target.value)}>
              <option value="">Select sector</option>
              {SECTORS.filter(s=>s!=="All").map(s=><option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-lbl">Target Raise Amount</label>
            <input className="form-input" placeholder="e.g. ₹75,00,000" value={raiseForm.raise} onChange={e=>setF("raise",e.target.value)}/>
          </div>
          <div className="form-group">
            <label className="form-lbl">Current Traction & Stage</label>
            <textarea className="form-textarea" placeholder="Revenue, users, growth rate, key milestones…"
              value={raiseForm.traction} onChange={e=>setF("traction",e.target.value)}/>
          </div>
          <button className="submit-btn" onClick={()=>{if(raiseForm.company&&raiseForm.email)setRaiseSubmitted(true);}}>
            Submit Application →
          </button>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // PROFILE PAGE
  // ═══════════════════════════════════════════════════════════════════════════
  const ProfilePage = () => {
    const b = backed(); const total = totalInv();
    return (
      <div className="page-wrap">
        <div className="prof-wrap">
          <div className="prof-header">
            <div className="prof-avatar">👤</div>
            <div className="prof-name">Sarash</div>
            <div className="prof-tag">Early Stage Investor · India 🇮🇳</div>
          </div>
          <div className="prof-stats">
            <div className="prof-stat"><div className="prof-stat-val">{b.length}</div><div className="prof-stat-lbl">Backed</div></div>
            <div className="prof-stat"><div className="prof-stat-val">{total>0?fmt(total):"₹0"}</div><div className="prof-stat-lbl">Invested</div></div>
            <div className="prof-stat"><div className="prof-stat-val">{liveStartups.length}</div><div className="prof-stat-lbl">Live Deals</div></div>
          </div>
          <button className="prof-btn" onClick={()=>goTo("portfolio")}>
            <span>💼 My Portfolio</span><span style={{color:"var(--accent)"}}>→</span>
          </button>
          <button className="prof-btn" onClick={()=>goTo("raise")}>
            <span>🚀 Raise Capital for Your Startup</span><span style={{color:"var(--accent)"}}>→</span>
          </button>
          <button className="prof-btn" onClick={()=>{setShowAdmin(true);setAdminAuthed(false);}}>
            <span>🔐 Admin Panel</span><span style={{color:"var(--dim)"}}>→</span>
          </button>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // DETAIL PAGE
  // ═══════════════════════════════════════════════════════════════════════════
  const DetailPage = () => {
    if (!detail) return null;
    const s = detail;
    const p = pct(s.raised,s.target);
    const closed = s.raised>=s.target;
    const sim = similar(s);
    return (
      <div className="page-wrap">
        <div className="detail-wrap">
          <div className="detail-hero" style={{background:`linear-gradient(160deg,${s.color}60,${s.color}20 50%,#0A0614 100%)`}}>
            <div className="detail-hero-bg">{s.emoji}</div>
            <div className="detail-hero-ov" style={{background:"linear-gradient(to top,rgba(10,6,20,.95) 0%,transparent 60%)"}}/>
            <button className="detail-back-btn" onClick={()=>setDetail(null)}>← Back</button>
            <button className="detail-play-btn" onClick={()=>openVideo(s)}>▶ Watch 45s Pitch</button>
            <div className="detail-hero-content">
              <div style={{marginBottom:8}}>
                <span style={{background:"rgba(167,139,250,.2)",border:"1px solid rgba(167,139,250,.25)",borderRadius:99,padding:"3px 10px",fontSize:12,color:"#C4B5FD"}}>{s.sector}</span>
              </div>
              <div className="detail-name">{s.name}</div>
              <div className="detail-tagline">{s.tagline}</div>
              <div className="detail-city">📍 {s.city}</div>
            </div>
          </div>

          <div style={{maxWidth:860,margin:"0 auto"}}>
            <div className="dsec" style={{paddingTop:22}}>
              <Ticker s={s}/>
              <div className="funding-box">
                <div className="funding-box-top">
                  <div>
                    <div className="funding-raised-big">{fmt(s.raised)}</div>
                    <div className="funding-of">of {fmt(s.target)} goal</div>
                  </div>
                  <div className={`round-badge ${closed?"round-closed":"round-open"}`}>
                    {closed?"🔒 Round Closed":"🟢 Round Open"}
                  </div>
                </div>
                <div className="funding-bar-big">
                  <div className="funding-bar-big-fill" style={{width:`${p}%`,background:`linear-gradient(90deg,${s.color},${s.color}CC)`}}/>
                </div>
                <div className="funding-meta-row">
                  {[["Funded",`${p}%`],["Tickets Left",`${s.totalTickets-s.tickets}`],["Min Ticket",`₹${s.ticketPrice.toLocaleString()}`],["Investors",`${s.backers}`]].map(([l,v])=>(
                    <div key={l}><div className="fm-item-lbl">{l}</div><div className="fm-item-val">{v}</div></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="dsec">
              <div className="dsec-title">The Pitch</div>
              <p style={{fontSize:14,color:"var(--sub)",lineHeight:1.75}}>{s.pitch}</p>
            </div>

            <div className="dsec">
              <div className="dsec-title">Traction</div>
              <div className="hl-grid">
                {s.highlights.map((h,i)=><div className="hl-card" key={i}>{h}</div>)}
              </div>
            </div>

            <div className="dsec">
              <div className="dsec-title">The Founder</div>
              <div style={{display:"flex",gap:14,alignItems:"flex-start",background:"var(--card)",border:"1px solid var(--border)",borderRadius:16,padding:18}}>
                <div style={{width:52,height:52,borderRadius:"50%",background:`${s.color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:700,flexShrink:0,color:s.color}}>
                  {s.founderName.split(" ").map(w=>w[0]).join("").slice(0,2)}
                </div>
                <div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:700,fontSize:17}}>{s.founderName}</div>
                  <div style={{fontSize:13,color:"var(--accent)",marginBottom:8}}>{s.founderRole}</div>
                  <div style={{fontSize:14,color:"var(--sub)",lineHeight:1.65}}>{s.founderBio}</div>
                </div>
              </div>
            </div>

            {s.topInvestorQuote && (
              <div className="dsec">
                <div className="dsec-title">What Investors Say</div>
                <div className="quote-block">
                  <div className="quote-text">"{s.topInvestorQuote}"</div>
                  <div className="quote-by">— {s.topInvestorName}, top backer</div>
                </div>
              </div>
            )}

            {sim.length>0 && (
              <div className="dsec" style={{paddingBottom:100}}>
                <div className="dsec-title">Also in {s.sector}</div>
                {sim.map(x=>(
                  <div className="sim-card" key={x.id} onClick={()=>setDetail(x)}>
                    <div className="sim-emoji" style={{background:`${x.color}20`}}>{x.emoji}</div>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:700,fontSize:15}}>{x.name}</div>
                      <div style={{fontSize:12,color:"var(--sub)",marginTop:2}}>{x.tagline}</div>
                    </div>
                    <span style={{fontSize:13,color:"var(--accent)",fontWeight:700}}>{pct(x.raised,x.target)}% →</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="invest-sticky">
          <InvBtn s={s} big/>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // ADMIN PAGE
  // ═══════════════════════════════════════════════════════════════════════════
  const AdminPage = () => {
    if (!adminAuthed) return (
      <div className="page-wrap">
        <div className="adm-wrap">
          <div className="adm-login">
            <div className="adm-lock">🛡️</div>
            <div className="adm-login-title">Admin Access</div>
            <div className="adm-login-sub">Enter the admin password to continue.</div>
            <div className="form-group">
              <input className="form-input" type="password" placeholder="Admin password"
                value={adminPass} onChange={e=>{setAdminPass(e.target.value);setAdminPassErr(false);}}
                onKeyDown={e=>e.key==="Enter"&&(adminPass==="instavest2026"?setAdminAuthed(true):setAdminPassErr(true))}
                style={{textAlign:"center",borderColor:adminPassErr?"var(--red)":""}}/>
              {adminPassErr && <p style={{color:"var(--red)",fontSize:12,marginTop:6,textAlign:"center"}}>Incorrect. Hint: instavest2026</p>}
            </div>
            <button className="submit-btn" onClick={()=>adminPass==="instavest2026"?setAdminAuthed(true):setAdminPassErr(true)}>
              Access Panel →
            </button>
          </div>
        </div>
      </div>
    );

    const totalRaised = liveStartups.reduce((a,s)=>a+s.raised,0);
    return (
      <div className="page-wrap">
        <div className="adm-wrap">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
            <div>
              <div className="page-title" style={{marginBottom:2}}>Admin Panel</div>
              <div style={{fontSize:14,color:"var(--sub)"}}>Manage applications and live rounds</div>
            </div>
            <button style={{background:"var(--pill)",border:"1px solid var(--border)",borderRadius:99,padding:"7px 16px",color:"var(--sub)",fontSize:13,cursor:"pointer"}}
              onClick={()=>{setShowAdmin(false);setAdminAuthed(false);setTab("home");}}>← Exit</button>
          </div>

          <div className="adm-stats">
            <div className="adm-stat"><div className="adm-stat-val" style={{color:"var(--brass)"}}>{applications.length}</div><div className="adm-stat-lbl">Pending Review</div></div>
            <div className="adm-stat"><div className="adm-stat-val" style={{color:"var(--accent)"}}>{liveStartups.length}</div><div className="adm-stat-lbl">Live Startups</div></div>
            <div className="adm-stat"><div className="adm-stat-val">{fmt(totalRaised)}</div><div className="adm-stat-lbl">Total Raised</div></div>
            <div className="adm-stat"><div className="adm-stat-val">{liveStartups.filter(s=>s.raised>=s.target).length}</div><div className="adm-stat-lbl">Rounds Closed</div></div>
          </div>

          <div className="adm-tabs">
            <button className={`adm-tab ${adminTab==="applications"?"on":""}`} onClick={()=>setAdminTab("applications")}>Applications ({applications.length})</button>
            <button className={`adm-tab ${adminTab==="live"?"on":""}`} onClick={()=>setAdminTab("live")}>Live Rounds ({liveStartups.length})</button>
          </div>

          {adminTab==="applications" && (
            <>
              <div className="sort-row">
                {[["newest","Newest First"],["oldest","Oldest First"]].map(([v,l])=>(
                  <button key={v} className={`sort-chip ${adminSort===v?"on":""}`} onClick={()=>setAdminSort(v)}>{l}</button>
                ))}
              </div>
              {sortedApps().length===0
                ? <div className="empty-state"><div className="empty-ico">✅</div><div className="empty-title">All caught up!</div><p style={{fontSize:14,color:"var(--sub)"}}>No pending applications.</p></div>
                : sortedApps().map(app=>(
                  <div className="app-card" key={app.id}>
                    <div className="app-card-head">
                      <div>
                        <div className="app-card-name">{app.name}</div>
                        <div className="app-card-by">{app.founderName} · {app.city} · {app.sector}</div>
                      </div>
                      <div className="app-card-date">{app.appliedDate}</div>
                    </div>
                    <div className="app-card-pitch">{app.pitch}</div>
                    <div className="app-btns">
                      <button className="app-approve" onClick={()=>approveApp(app)}>✓ Approve</button>
                      <button className="app-reject" onClick={()=>{setRejectTarget(app);setRejectReason("");}}>✕ Reject</button>
                    </div>
                  </div>
                ))
              }
            </>
          )}

          {adminTab==="live" && liveStartups.map(s=>{
            const p = pct(s.raised,s.target);
            return (
              <div className="live-card" key={s.id}>
                <div className="live-card-emoji">{s.emoji}</div>
                <div className="live-card-info">
                  <div className="live-card-name">{s.name}</div>
                  <div className="live-card-meta">{s.sector} · {s.city}</div>
                </div>
                <div className="live-bar-section">
                  <div className="live-bar-row">
                    <span className="live-bar-pct">{p}%</span>
                    <span className="live-bar-amt">{fmt(s.raised)} / {fmt(s.target)}</span>
                  </div>
                  <div className="live-bar"><div className="live-bar-fill" style={{width:`${p}%`,background:s.color}}/></div>
                </div>
                <div style={{textAlign:"center",minWidth:55,fontSize:12,color:"var(--dim)"}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:700,color:"var(--text)"}}>{s.backers}</div>
                  investors
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════
  const renderPage = () => {
    if (showAdmin)    return <AdminPage/>;
    if (detail)       return <DetailPage/>;
    if (tab==="home")      return <HomePage/>;
    if (tab==="explore")   return <ExplorePage/>;
    if (tab==="portfolio") return <PortfolioPage/>;
    if (tab==="raise")     return <RaiseCapitalPage/>;
    if (tab==="profile")   return <ProfilePage/>;
    return <HomePage/>;
  };

  return (
    <div className={`app`}>
      <style>{css}</style>
      <TopNav/>
      <MobileTopbar/>
      {renderPage()}
      <BottomNav/>
      {video && <VideoModal/>}
      <InvestConfirmModal/>
      <RejectModal/>
    </div>
  );
}
