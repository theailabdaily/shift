<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>SHIFT — IK Category Intelligence OS v2</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='7' fill='%23F5A623'/><text x='16' y='23' font-size='19' text-anchor='middle' fill='%2307071A' font-family='Arial Black' font-weight='900'>S</text></svg>"/>
<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Space+Grotesk:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}html,body{height:100%;overflow:hidden}
body{font-family:'Space Grotesk',sans-serif;background:#07071A;color:#E2E8F4;background-image:radial-gradient(circle at 22px 22px,rgba(245,166,35,0.022) 1px,transparent 0);background-size:44px 44px}
::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-track{background:#07071A}::-webkit-scrollbar-thumb{background:#F5A623;border-radius:2px}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.2}}@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@keyframes scanLine{0%{left:-60%}100%{left:160%}}@keyframes spin{to{transform:rotate(360deg)}}
.d1{animation:pulse 1.3s 0s infinite ease-in-out}.d2{animation:pulse 1.3s .22s infinite ease-in-out}.d3{animation:pulse 1.3s .44s infinite ease-in-out}
.fu{animation:fadeUp .32s ease forwards}.spin{animation:spin 1s linear infinite}
button{cursor:pointer;font-family:inherit}button:active{transform:scale(0.97)}textarea{resize:none;font-family:inherit}textarea:focus,input:focus{outline:none}
.pcard:hover{border-color:rgba(245,166,35,0.4)!important;background:rgba(245,166,35,0.06)!important}
.pill:hover{border-color:rgba(245,166,35,0.45)!important;color:#F5A623!important}
.nav-item:hover{background:rgba(255,255,255,0.04)!important}.nav-item:hover .nav-lbl{opacity:1!important}
.mod-card:hover{border-color:rgba(255,255,255,0.1)!important;transform:translateY(-1px)}.comp-card:hover{border-color:rgba(255,255,255,0.12)!important;transform:translateY(-1px)}
.chat-msg{animation:fadeUp .25s ease forwards}
</style>
</head>
<body style="height:100%"><div id="root" style="height:100%"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js"></script>
<script type="text/babel">
const {useState,useEffect,useCallback,useMemo,useRef}=React;

const COMP=[
  {id:"scaler",     n:"Scaler",               tier:"DIRECT",  threat:"HIGH",  rev:"₹366 Cr",   revFY:"FY25",fund:"$76.5M",      price:"₹3–4L",    stu:"500K+",  ai25:"IIT Roorkee AI Engineering; IIM-T Business & AI PGP (Dec 2025); Scaler School of Technology",gap:"No FAANG-instructor model; less interview-outcome intensity; early-mid career skew",vsIK:"Closest domestic rival. Lower price, higher volume. IK wins on instructor pedigree + MAANG conversion rate. Watch their IIT partnerships closely — they're building credibility fast.",prof:["SWE","DATA"]},
  {id:"codninjas",  n:"Coding Ninjas",         tier:"DIRECT",  threat:"MEDIUM",rev:"₹67 Cr",    revFY:"FY25",fund:"Info Edge",   price:"₹30K–1.5L",stu:"150K+",  ai25:"IIT-G/M/P/Mandi GenAI certs; Ninja AI interview prep; IBM co-developed tracks; NSDC partner",gap:"Student/early-career focus; not experienced engineers targeting MAANG; smaller scale",vsIK:"Competes on DSA/interview prep but at earlier career stage. Ninja AI is a direct signal — they see IK's market. Info Edge backing gives them runway.",prof:["SWE"]},
  {id:"upgrad",     n:"upGrad",                tier:"ADJACENT",threat:"MEDIUM",rev:"₹1,943 Cr", revFY:"FY25",fund:"$766M",       price:"₹2–5L",    stu:"2M+",    ai25:"50+ GenAI/AI programs; PG programs with AI tracks; acquiring Unacademy",gap:"Generalist MBA/degree/career-switch focus; not FAANG interview prep; burning cash at scale",vsIK:"Brand overlap at top of funnel. IK wins for 3–8 yr experienced engineers. upGrad wins for career-switchers + degree seekers. Their AI course quality is uneven.",prof:["MGR","DATA"]},
  {id:"simpli",     n:"Simplilearn",           tier:"ADJACENT",threat:"MEDIUM",rev:"₹556 Cr",   revFY:"FY25",fund:"$118M",       price:"₹50K–3L",  stu:"1.5M+",  ai25:"GenAI certification bootcamps; live classes surged 65% FY25; self-paced collapsed 95%",gap:"Certification mill; no live FAANG instructor model; declining self-paced revenue is existential signal",vsIK:"Competes on breadth at lower price. IK wins on depth + outcome. Simplilearn's revenue decline from ₹750Cr→₹556Cr is an opportunity — their students are searching for better.",prof:["SWE","DATA","SYS"]},
  {id:"gl",         n:"Great Learning",        tier:"ADJACENT",threat:"MEDIUM",rev:"$118M",      revFY:"FY24",fund:"Byju's/creditors",price:"₹2–5L", stu:"11M+",   ai25:"MS in AI partnerships; 1,200+ programs; AI/ML specializations; profitable FY24",gap:"University-PG focus; not interview-outcome intense; Byju's creditor debt overhang",vsIK:"Competes for same price bracket and AI-curious professionals. IK's FAANG-instructor + outcome focus is a clear differentiator. Their $118M revenue shows the market is real.",prof:["DATA","MGR"]},
  {id:"emeritus",   n:"Emeritus (Eruditus)",   tier:"GLOBAL",  threat:"LOW",   rev:"₹3,733 Cr", revFY:"FY24",fund:"$150M TPG",   price:"₹4–12L",   stu:"1M+",    ai25:"MIT/Wharton AI programs; enterprise AI grew 45%; named #1 EdTech globally (TIME)",gap:"Executive ed; not IC engineers; no interview prep; completely different ICP",vsIK:"No meaningful ICP overlap. Competes for senior managers. Interesting as a market-size signal and a potential distribution model to watch.",prof:["MGR"]},
  {id:"coursera",   n:"Coursera",              tier:"GLOBAL",  threat:"MEDIUM",rev:"$757M",      revFY:"FY25",fund:"Public COUR", price:"₹2K–80K/mo",stu:"197M",  ai25:"Google GenAI cert; DeepLearning.AI; NSQF aligned India 2025; merging with Udemy H2 2026",gap:"Self-paced; no live instructors; no interview prep; $27M loss in Q4 alone",vsIK:"Indirect competitor. Students compare cost: Coursera ($50/mo) vs IK (₹2L+). IK must clearly articulate the live-instructor outcome premium. Coursera+Udemy merger creates a giant.",prof:["SWE","DATA","AI"]},
  {id:"udacity",    n:"Udacity (Accenture)",   tier:"GLOBAL",  threat:"LOW",   rev:"~$90M",      revFY:"FY24",fund:"Accenture",  price:"₹1–4L",    stu:"16.9M",  ai25:"AI Nanodegrees; accredited Master's in AI; pivoting to enterprise/LearnVantage",gap:"Enterprise focus post-Accenture; India pull reduced; no interview prep",vsIK:"Minimal overlap now. Accenture pivot means less individual learner competition. Their mentor-review model is an interesting quality signal worth watching.",prof:["SWE","DATA"]},
  {id:"guvi",       n:"GUVI (HCL)",            tier:"ADJACENT",threat:"LOW",   rev:"₹72 Cr",    revFY:"FY25",fund:"HCL majority",price:"₹10K–50K", stu:"4.8M",   ai25:"Vernacular AI/ML courses; 20+ Indian languages; HCL corporate training pipeline",gap:"Tier-2/3 vernacular audience; not MAANG professionals; ₹10K ticket vs IK's ₹2L+",vsIK:"Completely different ICP. No threat. HCL backing = interesting corporate training signal. Watch vernacular AI adoption as an early-career pipeline into premium programs like IK.",prof:["SWE"]},
  {id:"newton",     n:"Newton School",         tier:"ADJACENT",threat:"LOW",   rev:"₹39 Cr",    revFY:"FY25",fund:"$31M",       price:"ISA/₹1.5L",stu:"4,500+",  ai25:"B.Tech CS + AI with Rishihood University; ISA pivot to prepaid",gap:"Entry-level bootcamp; no experienced-engineer track; small scale",vsIK:"Different life stage. Early-career coding pivot vs IK's experienced-professional MAANG prep. Their ISA→prepaid pivot mirrors the industry's rejection of ISA risk.",prof:["SWE"]},
  {id:"masai",      n:"Masai School",          tier:"ADJACENT",threat:"LOW",   rev:"~₹100 Cr",  revFY:"FY25",fund:"VC-backed",  price:"ISA/₹1L",  stu:"10K+",   ai25:"Misogi AI for international recruiters; IIT/IIM partnerships; EBITDA positive Jan 2025",gap:"Early career coding bootcamp; ISA model; not MAANG professionals",vsIK:"No real overlap. Their near-profitability with ISA model is interesting. International hiring angle (Misogi) could be a signal for IK's US market.",prof:["SWE"]},
  {id:"intellipaat",n:"Intellipaat",           tier:"ADJACENT",threat:"MEDIUM",rev:"~$55M est",  revFY:"est", fund:"Bootstrapped",price:"₹50K–2L",  stu:"600K+",  ai25:"AI/ML/GenAI certifications; 150+ courses; bootstrapped and profitable",gap:"Certification-only; no live FAANG instructors; no outcome guarantees; commoditized",vsIK:"Competes on price/breadth. IK wins on depth. Intellipaat's certification model is most vulnerable to AI commoditization. Their ₹50K courses directly undercut IK's perceived value.",prof:["SWE","DATA","SYS"]},
  {id:"almabetter", n:"AlmaBetter",            tier:"ADJACENT",threat:"LOW",   rev:"<₹10 Cr",   revFY:"FY24",fund:"$2.7M",      price:"ISA",       stu:"small",  ai25:"IIT Guwahati GenAI certs; small scale",gap:"Small scale; early career; ISA model; minimal revenue; not a threat",vsIK:"Not a threat. Included for completeness.",prof:["SWE","DATA"]},
  {id:"linkedin",   n:"LinkedIn Learning",     tier:"GLOBAL",  threat:"LOW",   rev:"Microsoft",  revFY:"-",   fund:"Microsoft", price:"₹1.5K/mo", stu:"enterprise",ai25:"AI/GenAI curated paths; Career Coach AI; 22,000+ courses",gap:"Corporate/enterprise only; self-paced; no interview prep; no live instructors",vsIK:"Different channel (HR budgets vs personal investment). Could be a distribution partner, not a competitor. 'IK on LinkedIn Learning' is an opportunity.",prof:["MGR","SWE"]},
  {id:"ineuron",    n:"iNeuron (by PW)",       tier:"DEFUNCT", threat:"NONE",  rev:"absorbed",   revFY:"-",   fund:"absorbed",  price:"-",         stu:"-",      ai25:"Absorbed by PhysicsWallah; no longer independent brand",gap:"Defunct — no longer relevant",vsIK:"PW absorbed iNeuron and restructured. PW IPO (₹3,480 Cr, Nov 2025) listed 33–42% premium. PW is now the #1 funded EdTech in India — watch if they ever enter professional upskilling.",prof:[]},
  {id:"stoa",       n:"Stoa School",           tier:"DEFUNCT", threat:"NONE",  rev:"₹15.9 Cr",  revFY:"FY23",fund:"shut down",  price:"-",         stu:"-",      ai25:"Shut down late 2024 after 4 years. Business ed without placement outcomes failed.",gap:"Defunct. Validates IK's outcome-first thesis.",vsIK:"Key lesson: even well-funded business ed (backed by Kamath, Shah, Biyani) fails without placement outcomes. IK's outcome focus is right.",prof:[]},
];

const MKT={
  size:{val:"$7.5B",yr:2025,proj:"$29–33B",projYr:2030,cagr:"28%",src:"IBEF/IMARC 2025"},
  aiPrem:"56%",aiShare:"11.7%",aiGrowth:"40% YoY",aiRoles:"450,000+",proj26:"1M+ roles by end 2026",
  cats:[
    {n:"GenAI / Agentic AI",      cagr:"54%",dem:5,prem:"40%",ik:"STRONG",   ikC:"#50D2A0",note:"IK core strength. PwC co-brand is a key differentiator. Global agentic AI market $5.1B → $47B by 2030."},
    {n:"AI Product Management",   cagr:"60%+",dem:5,prem:"35%",ik:"LAUNCHING",ikC:"#F5A623",note:"IK launched AI PM track late 2025. Market wide open — few credible programs with FAANG PM instructors."},
    {n:"AI TPM / Program Mgmt",   cagr:"55%+",dem:5,prem:"30%",ik:"LAUNCHING",ikC:"#F5A623",note:"Emerging fast. Enterprise hiring AI TPMs. IK TPM brochure exists — needs stronger go-to-market."},
    {n:"ML Engineering",          cagr:"40%", dem:4,prem:"30%",ik:"STRONG",   ikC:"#50D2A0",note:"Flagship ML Program (6m) covers this deeply. Scaler IIT-Roorkee is catching up. IK must emphasize FAANG outcomes."},
    {n:"Cyber Security",          cagr:"30%", dem:4,prem:"25%",ik:"WEAK",     ikC:"#FF6B6B",note:"Tech brochure covers SRE/Cloud/Security track. No standalone flagship. White space for IK — no competitor has a FAANG-focused Cyber Security interview prep."},
    {n:"Cloud / AWS Architecture",cagr:"22%", dem:4,prem:"20%",ik:"MODERATE", ikC:"#F5A623",note:"Covered in Tech track. AWS is a hiring requirement at most companies. Not a standalone hero course yet."},
    {n:"Data Engineering",        cagr:"28%", dem:4,prem:"20%",ik:"MODERATE", ikC:"#F5A623",note:"DE brochure exists. Competitive segment. Need stronger FAANG-DE differentiation vs Great Learning/Scaler."},
    {n:"SRE / DevOps / Platform", cagr:"25%", dem:3,prem:"20%",ik:"WEAK",     ikC:"#FF6B6B",note:"Covered in Tech brochure but not a flagship track. SRE at Google/Meta pays ₹1.5 Cr+. Huge opportunity."},
  ],
  maang:{entry:"₹26–50 LPA",mid:"₹50–90 LPA",senior:"₹1.5 Cr+",staff:"₹2.5 Cr+",topOffer:"$1.28M (IK alumni claim)"},
  services:{entry:"₹3.36–4.5 LPA",mid:"₹8–16 LPA",senior:"₹14–38 LPA"},
  mult:"4–10×",
  topCos:["Google India","Microsoft India","Amazon India","Meta","Apple","Flipkart","Swiggy","Meesho","Razorpay","Zomato","PhonePe","Atlassian","Adobe","Uber India","PayPal","Samsung R&D","Salesforce","Oracle","SAP Labs","Walmart Global Tech"],
  ikFacts:{alumni:"27,000+",instructors:"700+ FAANG",instrExp:"13+ yrs avg",funding:"$10M Blume 2024",pricing:"₹1.5–8L/course",pwcPartner:"PwC India Agentic AI Bootcamp",topOffer:"$1.28M alumni claim",profitable:"Yes (pre-funding)"},
};

const IK_COURSES=[
  {n:"GenAI+Agentic AI Lab — SWE",       tp:"AI+PREP",cats:"SWE·AI",        d:"30w"},
  {n:"GenAI+Agentic AI Lab — TPM",       tp:"AI+PREP",cats:"MGR",           d:"30w"},
  {n:"GenAI+Agentic AI Lab — PM",        tp:"AI+PREP",cats:"MGR",           d:"24w"},
  {n:"GenAI+Agentic AI Lab — EM",        tp:"AI+PREP",cats:"MGR",           d:"30w"},
  {n:"GenAI+Agentic AI Lab — All Roles", tp:"AI ONLY",cats:"ALL",           d:"3m"},
  {n:"Frontend Engineering Masterclass", tp:"PREP",   cats:"SWE",           d:"3m"},
  {n:"Technical PM Masterclass",         tp:"PREP",   cats:"MGR",           d:"3m"},
  {n:"Technical Program Mgr Masterclass",tp:"PREP",   cats:"MGR",           d:"3m"},
  {n:"Eng. Manager Masterclass",         tp:"PREP",   cats:"MGR",           d:"3m"},
  {n:"Full Stack Masterclass",           tp:"PREP",   cats:"SWE",           d:"3m"},
  {n:"Backend Engineering Masterclass",  tp:"PREP",   cats:"SWE",           d:"3m"},
  {n:"PwC Agentic AI Bootcamp",          tp:"AI ONLY",cats:"SWE·MGR·DATA",  d:"12w"},
  {n:"Flagship ML Program",             tp:"AI+PREP",cats:"AI·DATA",        d:"6m"},
];
const TC={"AI+PREP":"#F5A623","AI ONLY":"#9B6FD4","PREP":"#4ECDC4"};
const PROFILES=[
  {id:"backend",  l:"Backend Engineer",  t:"SWE"},{id:"fullstack",l:"Full Stack Engineer",t:"SWE"},
  {id:"frontend", l:"Frontend Engineer", t:"SWE"},{id:"test",    l:"Test Engineer",      t:"SWE"},
  {id:"android",  l:"Android Engineer",  t:"SWE"},{id:"ios",     l:"iOS Engineer",       t:"SWE"},
  {id:"ml",       l:"ML Engineer",       t:"AI"}, {id:"data-eng",l:"Data Engineer",      t:"DATA"},
  {id:"em",       l:"Eng. Manager",      t:"MGR"},{id:"tpm",     l:"TPM",                t:"MGR"},
  {id:"pm",       l:"Product Manager",   t:"MGR"},{id:"ds",      l:"Data Scientist",     t:"DATA"},
  {id:"da",       l:"Data Analyst/BA",   t:"DATA"},{id:"embedded",l:"Embedded Systems",  t:"SYS"},
  {id:"cloud",    l:"AWS Architect",     t:"SYS"},{id:"sre",     l:"SRE",               t:"SYS"},
  {id:"security", l:"Cyber Security",    t:"SYS"},{id:"ai-eng",  l:"AI Engineer ✦",     t:"AI"},
];
const TAG={SWE:{c:"#4ECDC4",bg:"rgba(78,205,196,0.12)"},AI:{c:"#F5A623",bg:"rgba(245,166,35,0.12)"},DATA:{c:"#B06BE3",bg:"rgba(176,107,227,0.12)"},MGR:{c:"#FF6B6B",bg:"rgba(255,107,107,0.12)"},SYS:{c:"#6B8FFF",bg:"rgba(107,143,255,0.12)"}};
const MOD={
  home:  {c:"#F5A623",label:"HOME",          sub:"Command Center",     icon:"⬡"},
  market:{c:"#6366F1",label:"MARKET INTEL",  sub:"Category Growth",    icon:"◫"},
  rivals:{c:"#FF6B6B",label:"RIVALS",        sub:"16 Competitors",     icon:"◉"},
  hiring:{c:"#4ECDC4",label:"HIRING",        sub:"18 Profiles",        icon:"◈"},
  signals:{c:"#F5A623",label:"SIGNALS",      sub:"Daily Briefing",     icon:"⚡"},
  engine:{c:"#50D2A0",label:"LAUNCH ENGINE", sub:"Course Scorer",      icon:"▶"},
  catmgr:{c:"#A855F7",label:"CATEGORY MGR",  sub:"AI Strategy Advisor",icon:"◧"},
};
const QUICK_IDEAS=["AI Product Manager Bootcamp","AI TPM Certification","AI Solutions Architect","AI Security Engineer","Agentic AI for Data Scientists","AI Engineering Manager","AI Infrastructure Engineer","AI Evaluation Engineer"];
const TIER_C={"DIRECT":"#FF6B6B","ADJACENT":"#F5A623","GLOBAL":"#6B8FFF","DEFUNCT":"#3A3A55"};
const THREAT_C={"HIGH":"#FF6B6B","MEDIUM":"#F5A623","LOW":"#50D2A0","NONE":"#3A3A55"};

const LS={
  get:(k)=>{try{const v=localStorage.getItem("shift_"+k);return v?JSON.parse(v):null}catch{return null}},
  set:(k,v)=>{try{localStorage.setItem("shift_"+k,JSON.stringify({data:v,ts:Date.now()}))}catch{}},
};
function timeSince(ts){if(!ts)return null;const m=Math.floor((Date.now()-ts)/60000);if(m<1)return"just now";if(m<60)return`${m}m ago`;const h=Math.floor(m/60);if(h<24)return`${h}h ago`;return`${Math.floor(h/24)}d ago`;}
function greet(){const h=new Date().getHours();if(h<12)return"Good morning";if(h<17)return"Good afternoon";return"Good evening";}
function parseScores(txt){if(!txt)return null;const ms=txt.match(/(\d+)\/10/g);const tot=txt.match(/(\d+)\/50/);const verd=txt.match(/LAUNCH NOW|TEST FIRST|WATCH & WAIT|SKIP/);if(!ms||ms.length<5)return null;return{scores:ms.slice(0,5).map(s=>parseInt(s)),total:tot?parseInt(tot[1]):null,verdict:verd?verd[0]:null};}

const PROMPTS={
  signals:()=>`Today is ${new Date().toLocaleDateString("en-IN",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}.
Search for latest AI and tech career news from past 7 days. Find:
1. New AI job roles created at tech companies (Google,Microsoft,Amazon,Meta,Indian unicorns)
2. Major AI product/agent framework launches
3. EdTech news: new courses by upGrad,Scaler,Simplilearn or any platform
4. Tech hiring trends India: which AI skills companies now require
5. Enterprise/government AI adoption in India driving training demand
Format as 5 signals:
SIGNAL 1: [HEADLINE IN CAPS]
WHAT HAPPENED: [2 sentences]
WHY IT MATTERS: [1 sentence for India career education]
COURSE SIGNAL: [Course IK should consider]
---
SIGNAL 2-5: same format. Use real company names.`,
  rivals_refresh:()=>`Search for news past 30 days about: upGrad,Scaler,Simplilearn,Great Learning,GUVI,Coursera India,Coding Ninjas,Masai School,Newton School,Emeritus.
Find: new AI/tech course launches,pricing changes,partnerships,marketing,MAANG prep programs,funding.
For each with notable news:
COMPETITOR: [name]
MOVE: [what they did 2 sentences]
THREAT TO IK: [High/Medium/Low] — [why]
IK COUNTER: [specific action IK should take]
For no news: "[name] — No major moves detected."
End: BIGGEST THREAT THIS MONTH + IK'S BIGGEST OPEN GAP`,
  hiring:(p)=>`Search current job market data for "${p}" roles in India 2025-2026. Use LinkedIn India,Naukri,Indeed,Glassdoor.
DEMAND: [High/Medium/Low] — [reason]
JOB VOLUME: [approx open positions India]
TOP 5 SKILLS: [most demanded in current JDs]
NEW AI SKILLS IN THIS ROLE: [AI/ML/agent skills now in JDs]
SALARY RANGE: Rs X-Y LPA [3-8 years India]
TOP HIRING COMPANIES: [5 specific companies]
TREND: [Growing/Stable/Declining] — [reason]
COURSE OPPORTUNITY: [Specific gap IK should fill]`,
  engine:(idea)=>`Analyze course launch opportunity for Interview Kickstart: "${idea}"
IK: Indian EdTech, FAANG/MAANG interview prep + Agentic AI. Market: India. Target: experienced tech professionals 3-10 yrs. Premium Rs 1.5-8L pricing.
Search: Indian job postings for ${idea} skills,salary premium,Indian EdTech competitors offering this,market size,demand trend.
=== OPPORTUNITY: ${idea.toUpperCase()} ===
Market Size: [X]/10 [Reason]
Hiring Demand: [X]/10 [Reason]
Salary Impact: [X]/10 [Reason]
Competition: [X]/10 [10=no competition] [Reason]
Build Difficulty: [X]/10 [10=easy] [Reason]
---
TOTAL LAUNCH SCORE: [X]/50
VERDICT: LAUNCH NOW / TEST FIRST / WATCH & WAIT / SKIP
POSITIONING: [2 sentences how IK differentiates]
FIRST MOVE: [single most important next step]
INDIA MARKET SIZE: Rs X crore addressable`,
  catmgr:(history,msg)=>{
    const cs=COMP.filter(c=>c.tier!=="DEFUNCT").map(c=>`${c.n}(${c.tier},${c.threat} threat,Rev:${c.rev},Fund:${c.fund},Price:${c.price})`).join("; ");
    const cats=MKT.cats.map(c=>`${c.n}:${c.cagr} CAGR,IK=${c.ik}`).join("; ");
    const courses=IK_COURSES.map(c=>`${c.n}(${c.tp},${c.d})`).join("; ");
    return{
      system:`You are the Virtual Category Manager for Interview Kickstart (IK), India's premium MAANG interview prep + Agentic AI upskilling platform.

IK FACTS: Alumni:27,000+ | FAANG Instructors:700+ | Avg Instructor Exp:13+ yrs | Funding:$10M Blume Ventures (Feb 2024, bootstrapped profitable before) | Pricing:Rs 1.5-8L per course | PwC India partnership for Agentic AI Bootcamp | MAANG top offer: $1.28M
COURSES: ${courses}

MARKET: India EdTech $7.5B(2025)->$29-33B by 2030, 28% CAGR | AI wage premium: 56% (PwC 2025) | AI job postings India: 11.7% of all tech JDs | MAANG vs IT services: 4-10x salary multiplier | Category growth: ${cats}

COMPETITORS (active): ${cs}

YOUR ROLE: Senior Category Strategy Advisor. Be specific, direct, data-driven. Reference real competitor names, revenue figures, IK courses. Think like a P&L owner. Give actionable next steps with timelines and revenue estimates. No fluff. When asked about launching courses, use the 5-dimension scoring framework (Market Size, Hiring Demand, Salary Impact, Competition, Build Difficulty each /10). When asked about competitors, reference their specific revenue and recent moves. Always end with a concrete recommendation.`,
      messages:[...history,{role:"user",content:msg}]
    };
  },
};

function ScanBtn({label,onClick,isLoading,disabled,color="#F5A623"}){
  return(<button onClick={onClick} disabled={isLoading||disabled}
    onMouseEnter={e=>{if(!isLoading&&!disabled)e.currentTarget.style.background=color+"26"}}
    onMouseLeave={e=>{if(!isLoading&&!disabled)e.currentTarget.style.background=color+"12"}}
    style={{display:"flex",alignItems:"center",gap:10,padding:"11px 22px",background:isLoading||disabled?"#111128":color+"12",border:`1px solid ${isLoading||disabled?"#252540":color}`,borderRadius:8,marginBottom:18,transition:"all 0.18s",opacity:disabled?0.45:1}}>
    <span style={{width:8,height:8,borderRadius:"50%",background:color,flexShrink:0,animation:isLoading?"pulse 1s infinite ease-in-out":"none"}}/>
    <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:11,color:isLoading||disabled?"#5A6080":color,letterSpacing:"0.1em"}}>{isLoading?"SCANNING LIVE SOURCES...":label}</span>
  </button>);
}
function LoadBox({label}){
  return(<div style={{padding:"26px",background:"#0D0D24",border:"1px solid #1E1E3F",borderRadius:10,textAlign:"center",marginBottom:18,position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"#1E1E3F"}}>
      <div style={{position:"absolute",top:0,height:"100%",width:"55%",background:"linear-gradient(90deg,transparent,#F5A623,transparent)",animation:"scanLine 1.4s linear infinite"}}/>
    </div>
    <div style={{display:"flex",justifyContent:"center",gap:7,marginBottom:10}}>
      <div className="d1" style={{width:8,height:8,borderRadius:"50%",background:"#F5A623"}}/><div className="d2" style={{width:8,height:8,borderRadius:"50%",background:"#F5A623"}}/><div className="d3" style={{width:8,height:8,borderRadius:"50%",background:"#F5A623"}}/>
    </div>
    <div style={{fontSize:12,color:"#F5A623",fontFamily:"'Space Mono',monospace",letterSpacing:"0.06em"}}>{label}</div>
    <div style={{fontSize:10,color:"#3A3A55",marginTop:5,fontFamily:"'Space Mono',monospace"}}>searching live sources · analyzing · synthesizing</div>
  </div>);
}
function IBox({text,ts,color="#F5A623"}){
  const [cop,setCop]=useState(false);
  return(<div className="fu" style={{background:"#0D0D24",border:"1px solid #1E1E3F",borderLeft:`3px solid ${color}`,borderRadius:10,padding:"18px 20px",marginBottom:18}}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
      <div style={{display:"flex",alignItems:"center",gap:7}}>
        <div style={{width:6,height:6,borderRadius:"50%",background:"#4ECDC4"}}/>
        <span style={{fontSize:9,color:"#4ECDC4",fontFamily:"'Space Mono',monospace",letterSpacing:"0.1em"}}>REPORT{ts?` · ${timeSince(ts)}`:""}</span>
      </div>
      <button onClick={()=>{navigator.clipboard.writeText(text).then(()=>{setCop(true);setTimeout(()=>setCop(false),2000)})}} style={{padding:"3px 9px",background:"rgba(245,166,35,0.07)",border:"1px solid rgba(245,166,35,0.25)",borderRadius:5,fontSize:9,color:cop?"#4ECDC4":"#F5A623",fontFamily:"'Space Mono',monospace",fontWeight:700}}>{cop?"COPIED ✓":"COPY"}</button>
    </div>
    <pre style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:12.5,lineHeight:1.82,color:"#D0D8EE",whiteSpace:"pre-wrap",wordBreak:"break-word"}}>{text}</pre>
  </div>);
}
function EHint({msg}){return(<div style={{padding:"22px",background:"#0D0D24",border:"1px dashed #1E1E3F",borderRadius:10,textAlign:"center",color:"#2E2E4A",fontSize:11,fontFamily:"'Space Mono',monospace"}}>{msg}</div>);}
function SBar({label,score,color}){return(<div style={{marginBottom:11}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:11,color:"#A0A8C0"}}>{label}</span><span style={{fontSize:11,fontFamily:"'Space Mono',monospace",color,fontWeight:700}}>{score}/10</span></div><div style={{background:"#1E1E3F",borderRadius:4,height:5,overflow:"hidden"}}><div style={{height:"100%",width:`${score*10}%`,background:color,borderRadius:4,transition:"width 0.8s ease"}}/></div></div>);}
function ScoreCard({text,ts}){
  const p=useMemo(()=>parseScores(text),[text]);
  const vc=p?.verdict?{"LAUNCH NOW":"#50D2A0","TEST FIRST":"#F5A623","WATCH & WAIT":"#FF9A3C","SKIP":"#FF6B6B"}[p.verdict]||"#F5A623":"#F5A623";
  const DIMS=["Market Size","Hiring Demand","Salary Impact","Competition (10=none)","Build Ease (10=easy)"];
  return(<div className="fu">{p&&(<div style={{background:"#0D0D24",border:`1px solid ${vc}33`,borderRadius:10,padding:"18px",marginBottom:12}}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
      <div><div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:17,color:vc,marginBottom:1}}>{p.verdict||"SCORED"}</div>{p.total&&<div style={{fontSize:10,color:"#5A6080",fontFamily:"'Space Mono',monospace"}}>LAUNCH SCORE: {p.total}/50</div>}</div>
      <div style={{padding:"7px 14px",background:vc+"1A",border:`1px solid ${vc}44`,borderRadius:8,fontFamily:"'Space Mono',monospace",fontSize:18,fontWeight:700,color:vc}}>{p.total}/50</div>
    </div>
    {DIMS.map((d,i)=>p.scores[i]!=null&&<SBar key={i} label={d} score={p.scores[i]} color={vc}/>)}
  </div>)}<IBox text={text} ts={ts}/></div>);
}

function SHIFT(){
  const [tab,setTab]=useState("home");
  const [ld,setLd]=useState({});
  const [cache,setCache]=useState({});
  const [prof,setProf]=useState(null);
  const [catF,setCatF]=useState("ALL");
  const [compF,setCompF]=useState("ALL");
  const [selC,setSelC]=useState(null);
  const [idea,setIdea]=useState("");
  const [now,setNow]=useState(new Date());
  const [fullSc,setFullSc]=useState(false);
  const [scanCount,setScanCount]=useState(0);
  const [chatH,setChatH]=useState([]);
  const [chatIn,setChatIn]=useState("");
  const chatRef=useRef(null);

  useEffect(()=>{
    const loaded={};
    ["signals","rivals_live"].forEach(k=>{const v=LS.get(k);if(v)loaded[k]=v;});
    PROFILES.forEach(p=>{const v=LS.get("h_"+p.id);if(v)loaded["h_"+p.id]=v;});
    const el=LS.get("engine_latest");if(el)loaded.engine_latest=el;
    const sc=LS.get("scan_count");if(sc)setScanCount(sc.data||0);
    const ch=LS.get("chat_history");if(ch)setChatH(ch.data||[]);
    setCache(loaded);
  },[]);

  useEffect(()=>{const t=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(t);},[]);
  useEffect(()=>{if(chatRef.current)chatRef.current.scrollTop=chatRef.current.scrollHeight;},[chatH]);

  const scan=useCallback(async(body,key)=>{
    setLd(p=>({...p,[key]:true}));
    try{
      const r=await fetch("/api/scan",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
      const d=await r.json();
      const txt=(d.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("\n").trim()||d.error||"Scan complete.";
      const entry={data:txt,ts:Date.now()};
      LS.set(key,txt);setCache(p=>({...p,[key]:entry}));
      const nc=scanCount+1;setScanCount(nc);LS.set("scan_count",nc);
    }catch(e){
      setCache(p=>({...p,[key]:{data:`Error: ${e.message}\n\nFix: Add ANTHROPIC_API_KEY in Vercel Dashboard → Settings → Environment Variables`,ts:Date.now()}}));
    }
    setLd(p=>({...p,[key]:false}));
  },[scanCount]);

  const run=(prompt,key)=>scan({model:"claude-sonnet-4-20250514",max_tokens:1000,tools:[{type:"web_search_20250305",name:"web_search"}],messages:[{role:"user",content:prompt}]},key);

  const chat=useCallback(async(msg)=>{
    const nh=[...chatH,{role:"user",content:msg}];setChatH(nh);setChatIn("");setLd(p=>({...p,catmgr:true}));
    try{
      const {system,messages}=PROMPTS.catmgr(chatH,msg);
      const r=await fetch("/api/scan",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system,messages})});
      const d=await r.json();
      const txt=(d.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("\n").trim()||d.error||"No response.";
      const updated=[...nh,{role:"assistant",content:txt}];setChatH(updated);LS.set("chat_history",updated);
    }catch(e){setChatH(h=>[...h,{role:"assistant",content:`Error: ${e.message}`}]);}
    setLd(p=>({...p,catmgr:false}));
  },[chatH]);

  const fullScan=useCallback(async()=>{setFullSc(true);await Promise.all([run(PROMPTS.signals(),"signals"),run(PROMPTS.rivals_refresh(),"rivals_live")]);setFullSc(false);},[scan]);

  const tsStr=now.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit",second:"2-digit"});
  const dtStr=now.toLocaleDateString("en-IN",{weekday:"short",day:"2-digit",month:"short",year:"numeric"});

  const rHome=()=>{
    const sc=PROFILES.filter(p=>cache["h_"+p.id]).length;
    return(<div>
      <div style={{marginBottom:22}}><div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:22,color:"#E2E8F4",marginBottom:3}}>{greet()}, Category Architect</div><div style={{fontSize:11,color:"#5A6080",fontFamily:"'Space Mono',monospace"}}>{dtStr} · {PROFILES.length} profiles · {COMP.filter(c=>c.tier!=="DEFUNCT").length} competitors · {IK_COURSES.length} courses · {scanCount} scans</div></div>
      <div style={{background:"#0D0D24",border:"1px solid #1E1E3F",borderRadius:10,padding:"16px 18px",marginBottom:20}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
          <div><div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:14,color:"#E2E8F4",marginBottom:2}}>Full Intelligence Scan</div><div style={{fontSize:11,color:"#5A6080"}}>Runs SIGNALS + RIVALS simultaneously ~20 seconds</div></div>
          <button onClick={fullScan} disabled={fullSc}
            onMouseEnter={e=>{if(!fullSc)e.currentTarget.style.background="rgba(245,166,35,0.18)"}}
            onMouseLeave={e=>{if(!fullSc)e.currentTarget.style.background="rgba(245,166,35,0.08)"}}
            style={{display:"flex",alignItems:"center",gap:8,padding:"10px 20px",background:fullSc?"#111128":"rgba(245,166,35,0.08)",border:`1px solid ${fullSc?"#252540":"#F5A623"}`,borderRadius:8,transition:"all 0.18s",flexShrink:0}}>
            {fullSc?<span className="spin" style={{fontSize:12,color:"#F5A623"}}>◌</span>:<span style={{color:"#F5A623",fontSize:11}}>⚡</span>}
            <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:11,color:fullSc?"#5A6080":"#F5A623",letterSpacing:"0.08em"}}>{fullSc?"SCANNING...":"RUN FULL SCAN"}</span>
          </button>
        </div>
        {fullSc&&<div style={{display:"flex",gap:18,marginTop:12,flexWrap:"wrap"}}>
          {["signals","rivals_live"].map(k=>(<div key={k} style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:"#F5A623",animation:ld[k]?"pulse 1s infinite":"none",opacity:cache[k]&&!ld[k]?0.4:1}}/>
            <span style={{fontSize:9,fontFamily:"'Space Mono',monospace",color:ld[k]?"#F5A623":cache[k]?"#4ECDC4":"#3A3A55",letterSpacing:"0.07em"}}>{k.replace("_live"," INTEL").toUpperCase()} {cache[k]&&!ld[k]?"✓":""}</span>
          </div>))}
        </div>}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:9,marginBottom:24}}>
        {Object.entries(MOD).filter(([k])=>k!=="home").map(([key,mod])=>{
          const isH=key==="hiring",isCat=key==="catmgr",isM=key==="market",isR=key==="rivals";
          const ce=isH||isCat||isM||isR?null:cache[key];
          const fresh=ce?.ts?timeSince(ce.ts):null;
          return(<div key={key} className="mod-card" onClick={()=>setTab(key)}
            style={{background:"#0D0D24",border:"1px solid #1E1E3F",borderRadius:10,padding:"14px",cursor:"pointer",transition:"all 0.18s",borderTop:`2px solid ${mod.c}44`}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:9}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:15,color:mod.c}}>{mod.icon}</span>
                <div><div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:11,color:mod.c,letterSpacing:"0.08em"}}>{mod.label}</div><div style={{fontSize:8,color:"#3A3A55",fontFamily:"'Space Mono',monospace"}}>{mod.sub}</div></div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:4}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:isM||isR||isCat?"#50D2A0":isH?(sc>0?"#4ECDC4":"#3A3A55"):(fresh?"#50D2A0":"#3A3A55"),animation:ld[key]?"pulse 1s infinite":"none"}}/>
                <span style={{fontSize:8,fontFamily:"'Space Mono',monospace",color:"#3A3A55"}}>{isM?"STATIC":isR?"16 LOADED":isCat?"READY":isH?(sc>0?`${sc} scanned`:"N/A"):(fresh||"N/A")}</span>
              </div>
            </div>
            <div style={{fontSize:11,color:"#5A6080",lineHeight:1.6,marginBottom:9,minHeight:30}}>{isM?"Pre-loaded from June 2026 research":isR?"16 competitors pre-loaded. Click expand.":isCat?"Ask IK's virtual strategy advisor anything":isH?`${sc} of 18 profiles cached`:(ce?.data?.substring(0,75)+"..."||"Run scan to populate")}</div>
            <div style={{fontSize:9,color:mod.c,fontFamily:"'Space Mono',monospace",letterSpacing:"0.08em"}}>→ OPEN</div>
          </div>);
        })}
      </div>
      <div style={{background:"#0D0D24",border:"1px solid rgba(245,166,35,0.15)",borderRadius:10,padding:"16px 18px"}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:13,color:"#F5A623",marginBottom:12,letterSpacing:"0.06em"}}>IK SNAPSHOT — June 2026</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:8}}>
          {Object.entries(MKT.ikFacts).map(([k,v])=>(<div key={k} style={{background:"#111128",borderRadius:8,padding:"9px 11px"}}>
            <div style={{fontSize:8,color:"#5A6080",fontFamily:"'Space Mono',monospace",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:3}}>{k.replace(/([A-Z])/g," $1").trim()}</div>
            <div style={{fontSize:12,color:"#E2E8F4",fontWeight:600,lineHeight:1.3}}>{v}</div>
          </div>))}
        </div>
      </div>
    </div>);
  };

  const rMarket=()=>(<div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))",gap:9,marginBottom:20}}>
      {[{l:"India EdTech 2025",v:MKT.size.val,sub:`${MKT.size.cagr} CAGR`,c:"#6366F1"},{l:"Projected 2030",v:MKT.size.proj,sub:MKT.size.src,c:"#6366F1"},{l:"AI Wage Premium",v:MKT.aiPrem,sub:"PwC 2025 Barometer",c:"#F5A623"},{l:"AI Job Postings",v:MKT.aiShare,sub:"of Indian tech JDs",c:"#50D2A0"},{l:"Active AI Roles",v:MKT.aiRoles,sub:"India job listings",c:"#4ECDC4"},{l:"MAANG vs Services",v:MKT.mult,sub:"salary multiplier",c:"#FF6B6B"}].map((s,i)=>(
        <div key={i} style={{background:"#0D0D24",border:`1px solid ${s.c}22`,borderRadius:10,padding:"13px 14px",borderTop:`2px solid ${s.c}66`}}>
          <div style={{fontSize:9,color:"#5A6080",fontFamily:"'Space Mono',monospace",marginBottom:5,letterSpacing:"0.07em"}}>{s.l.toUpperCase()}</div>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:20,color:s.c,marginBottom:3}}>{s.v}</div>
          <div style={{fontSize:9,color:"#3A3A55",fontFamily:"'Space Mono',monospace"}}>{s.sub}</div>
        </div>
      ))}
    </div>
    <div style={{background:"#0D0D24",border:"1px solid #1E1E3F",borderRadius:10,padding:"16px 18px",marginBottom:18}}>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:13,color:"#E2E8F4",marginBottom:14,letterSpacing:"0.05em"}}>CATEGORY GROWTH INTELLIGENCE — IK Coverage Assessment</div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
          <thead><tr style={{borderBottom:"1px solid #1E1E3F"}}>{["Category","CAGR","Demand","Salary Premium","IK Coverage","Strategic Note"].map(h=>(<th key={h} style={{textAlign:"left",padding:"7px 10px",color:"#5A6080",fontFamily:"'Space Mono',monospace",fontSize:8,letterSpacing:"0.08em",whiteSpace:"nowrap"}}>{h.toUpperCase()}</th>))}</tr></thead>
          <tbody>{MKT.cats.map((c,i)=>(<tr key={i} style={{borderBottom:"1px solid #0F0F28"}}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.02)"}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <td style={{padding:"9px 10px",color:"#D0D8EE",fontWeight:600,whiteSpace:"nowrap"}}>{c.n}</td>
            <td style={{padding:"9px 10px",fontFamily:"'Space Mono',monospace",color:"#F5A623",fontWeight:700,whiteSpace:"nowrap"}}>{c.cagr}</td>
            <td style={{padding:"9px 10px"}}><div style={{display:"flex",gap:3}}>{[1,2,3,4,5].map(n=><div key={n} style={{width:7,height:7,borderRadius:2,background:n<=c.dem?"#F5A623":"#1E1E3F"}}/>)}</div></td>
            <td style={{padding:"9px 10px",color:"#A0A8C0",fontFamily:"'Space Mono',monospace",whiteSpace:"nowrap"}}>{c.prem}</td>
            <td style={{padding:"9px 10px"}}><span style={{fontSize:8,fontWeight:700,padding:"2px 7px",borderRadius:5,background:c.ikC+"1A",color:c.ikC,fontFamily:"'Space Mono',monospace",whiteSpace:"nowrap"}}>{c.ik}</span></td>
            <td style={{padding:"9px 10px",color:"#5A6080",fontSize:10.5,lineHeight:1.4}}>{c.note}</td>
          </tr>))}</tbody>
        </table>
      </div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:18}}>
      {[{title:"MAANG / Big Tech",data:MKT.maang,c:"#50D2A0"},{title:"IT Services (TCS/Infosys/Wipro)",data:MKT.services,c:"#FF6B6B"}].map((s,i)=>(
        <div key={i} style={{background:"#0D0D24",border:`1px solid ${s.c}22`,borderRadius:10,padding:"14px"}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:11,color:s.c,marginBottom:10,letterSpacing:"0.06em"}}>{s.title}</div>
          {Object.entries(s.data).map(([k,v])=>(<div key={k} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #0F0F28"}}>
            <span style={{fontSize:10,color:"#7A82A0",textTransform:"capitalize"}}>{k}</span>
            <span style={{fontSize:11,fontFamily:"'Space Mono',monospace",color:"#E2E8F4",fontWeight:600}}>{v}</span>
          </div>))}
        </div>
      ))}
    </div>
    <div style={{background:"#0D0D24",border:"1px solid #1E1E3F",borderRadius:10,padding:"14px 16px"}}>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:12,color:"#E2E8F4",marginBottom:10,letterSpacing:"0.05em"}}>TOP HIRING COMPANIES IN INDIA</div>
      <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>{MKT.topCos.map(c=>(<div key={c} style={{padding:"4px 11px",background:"#111128",border:"1px solid #1E1E3F",borderRadius:20,fontSize:10,color:"#A0A8C0"}}>{c}</div>))}</div>
    </div>
  </div>);

  const rRivals=()=>{
    const tiers=["ALL","DIRECT","ADJACENT","GLOBAL","DEFUNCT"];
    const filtered=compF==="ALL"?COMP:COMP.filter(c=>c.tier===compF);
    const sorted=[...filtered].sort((a,b)=>({HIGH:0,MEDIUM:1,LOW:2,NONE:3}[a.threat]||3)-({HIGH:0,MEDIUM:1,LOW:2,NONE:3}[b.threat]||3));
    return(<div>
      <p style={{color:"#7A82A0",fontSize:12.5,lineHeight:1.75,marginBottom:14}}>Pre-loaded from June 2026 deep research. 14 active + 2 defunct. Click any card to expand full analysis. Refresh for latest moves.</p>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10,marginBottom:16}}>
        <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>{tiers.map(t=>{const a=compF===t,c=TIER_C[t]||"#F5A623";return(<button key={t} onClick={()=>setCompF(t)} style={{padding:"5px 13px",background:a?c+"1A":"#0D0D24",border:`1px solid ${a?c:"#1E1E3F"}`,borderRadius:20,fontSize:10,fontWeight:600,color:a?c:"#5A6080",transition:"all 0.15s",fontFamily:"'Space Mono',monospace"}}>{t}</button>);})}</div>
        <ScanBtn label="REFRESH LIVE INTEL" onClick={()=>run(PROMPTS.rivals_refresh(),"rivals_live")} isLoading={ld.rivals_live} color="#FF6B6B"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:9,marginBottom:18}}>
        {sorted.map(c=>{
          const tc=TIER_C[c.tier]||"#F5A623",thr=THREAT_C[c.threat]||"#3A3A55";
          const isSel=selC===c.id;
          return(<div key={c.id} className="comp-card" onClick={()=>setSelC(isSel?null:c.id)}
            style={{background:isSel?"#0F0F28":"#0D0D24",border:`1px solid ${isSel?thr+"44":"#1E1E3F"}`,borderRadius:10,padding:"13px 14px",cursor:"pointer",transition:"all 0.18s",borderTop:`2px solid ${thr}44`}}>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:9}}>
              <div>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:13,color:"#E2E8F4",marginBottom:5}}>{c.n}</div>
                <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                  <span style={{fontSize:8,fontWeight:700,padding:"2px 7px",borderRadius:4,background:tc+"1A",color:tc,fontFamily:"'Space Mono',monospace"}}>{c.tier}</span>
                  <span style={{fontSize:8,fontWeight:700,padding:"2px 7px",borderRadius:4,background:thr+"1A",color:thr,fontFamily:"'Space Mono',monospace"}}>⚠ {c.threat}</span>
                </div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:12,fontFamily:"'Space Mono',monospace",color:"#E2E8F4",fontWeight:700}}>{c.rev}</div><div style={{fontSize:8,color:"#3A3A55",fontFamily:"'Space Mono',monospace"}}>{c.revFY}</div></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5,marginBottom:9}}>
              {[["FUND",c.fund],["PRICE",c.price],["STUDENTS",c.stu],["2025 AI",c.ai25.substring(0,40)+"..."]].map(([l,v])=>(<div key={l} style={{background:"#111128",borderRadius:6,padding:"5px 7px"}}>
                <div style={{fontSize:7,color:"#3A3A55",fontFamily:"'Space Mono',monospace",letterSpacing:"0.07em",marginBottom:2}}>{l}</div>
                <div style={{fontSize:10,color:"#A0A8C0",lineHeight:1.3}}>{v}</div>
              </div>))}
            </div>
            {isSel&&(<div className="fu">
              <div style={{padding:"9px",background:"rgba(255,107,107,0.05)",border:"1px solid rgba(255,107,107,0.15)",borderRadius:7,marginBottom:7}}><div style={{fontSize:8,color:"#FF6B6B",fontFamily:"'Space Mono',monospace",marginBottom:3}}>FULL 2025 AI MOVE</div><div style={{fontSize:10.5,color:"#D0D8EE",lineHeight:1.6}}>{c.ai25}</div></div>
              <div style={{padding:"9px",background:"rgba(80,210,160,0.04)",border:"1px solid rgba(80,210,160,0.12)",borderRadius:7,marginBottom:7}}><div style={{fontSize:8,color:"#50D2A0",fontFamily:"'Space Mono',monospace",marginBottom:3}}>IK'S GAP TO EXPLOIT</div><div style={{fontSize:10.5,color:"#D0D8EE",lineHeight:1.6}}>{c.gap}</div></div>
              <div style={{padding:"9px",background:"rgba(245,166,35,0.04)",border:"1px solid rgba(245,166,35,0.12)",borderRadius:7,marginBottom:7}}><div style={{fontSize:8,color:"#F5A623",fontFamily:"'Space Mono',monospace",marginBottom:3}}>vs IK ANALYSIS</div><div style={{fontSize:10.5,color:"#D0D8EE",lineHeight:1.6}}>{c.vsIK}</div></div>
              {c.prof.length>0&&<div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{c.prof.map(p=><span key={p} style={{fontSize:8,fontWeight:700,padding:"2px 7px",borderRadius:4,background:TAG[p]?.bg||"#1E1E3F",color:TAG[p]?.c||"#A0A8C0",fontFamily:"'Space Mono',monospace"}}>{p}</span>)}</div>}
            </div>)}
            <div style={{fontSize:9,color:"#3A3A55",fontFamily:"'Space Mono',monospace",marginTop:7}}>{isSel?"▲ COLLAPSE":"▼ EXPAND ANALYSIS"}</div>
          </div>);
        })}
      </div>
      {ld.rivals_live&&<LoadBox label="Scanning competitor activity..."/>}
      {!ld.rivals_live&&cache.rivals_live&&<IBox text={cache.rivals_live.data} ts={cache.rivals_live.ts} color="#FF6B6B"/>}
    </div>);
  };

  const rHiring=()=>{
    const cats=["ALL","SWE","AI","DATA","MGR","SYS"];
    const filtered=catF==="ALL"?PROFILES:PROFILES.filter(p=>p.t===catF);
    const sk="h_"+prof;
    return(<div>
      <p style={{color:"#7A82A0",fontSize:12.5,lineHeight:1.75,marginBottom:14}}>Select any of 18 profiles. Scans live job market data — demand, skills, AI additions, salary, course opportunities.</p>
      <div style={{display:"flex",gap:7,marginBottom:14,flexWrap:"wrap"}}>{cats.map(c=>{const a=catF===c,tc=c==="ALL"?{c:"#E2E8F4"}:TAG[c]||{c:"#E2E8F4"};return(<button key={c} onClick={()=>setCatF(c)} style={{padding:"5px 13px",background:a?(c==="ALL"?"rgba(245,166,35,0.12)":tc.c+"1A"):"#0D0D24",border:`1px solid ${a?(c==="ALL"?"#F5A623":tc.c):"#1E1E3F"}`,borderRadius:20,fontSize:10,fontWeight:600,color:a?(c==="ALL"?"#F5A623":tc.c):"#5A6080",transition:"all 0.15s",fontFamily:"'Space Mono',monospace"}}>{c}</button>);})}</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(136px,1fr))",gap:7,marginBottom:16}}>
        {filtered.map(p=>{const tc=TAG[p.t];const sel=prof===p.id;const hc=!!cache["h_"+p.id];
          return(<button key={p.id} onClick={()=>setProf(p.id)} className="pcard"
            style={{background:sel?"rgba(245,166,35,0.08)":"#0D0D24",border:`1px solid ${sel?"#F5A623":"#1E1E3F"}`,borderRadius:8,padding:"9px 11px",textAlign:"left",transition:"all 0.15s",position:"relative"}}>
            {hc&&<div style={{position:"absolute",top:5,right:6,width:6,height:6,borderRadius:"50%",background:"#50D2A0"}}/>}
            <div style={{fontSize:10.5,fontWeight:600,color:sel?"#F5A623":"#D0D8EE",marginBottom:6,lineHeight:1.3,paddingRight:8}}>{p.l}</div>
            <span style={{fontSize:8,fontWeight:700,padding:"2px 6px",borderRadius:4,background:tc.bg,color:tc.c,fontFamily:"'Space Mono',monospace"}}>{p.t}</span>
          </button>);
        })}
      </div>
      {prof?(
        <>
          <div style={{padding:"9px 13px",background:"rgba(78,205,196,0.05)",border:"1px solid rgba(78,205,196,0.2)",borderRadius:8,marginBottom:12,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span style={{color:"#4ECDC4",fontSize:10,fontWeight:700,fontFamily:"'Space Mono',monospace",letterSpacing:"0.08em"}}>SELECTED → {PROFILES.find(p=>p.id===prof)?.l}</span>
            {cache[sk]&&<span style={{fontSize:9,color:"#50D2A0",fontFamily:"'Space Mono',monospace"}}>cached {timeSince(cache[sk].ts)}</span>}
          </div>
          <ScanBtn label={`SCAN: ${(PROFILES.find(p=>p.id===prof)?.l||"").toUpperCase()}`}
            onClick={()=>{const pl=PROFILES.find(p=>p.id===prof)?.l;run(PROMPTS.hiring(pl),"h_"+prof);}}
            isLoading={ld["h_"+prof]} color="#4ECDC4"/>
          {ld["h_"+prof]&&<LoadBox label={`Scanning job market for ${PROFILES.find(p=>p.id===prof)?.l}...`}/>}
          {!ld["h_"+prof]&&cache[sk]&&<IBox text={cache[sk].data} ts={cache[sk].ts} color="#4ECDC4"/>}
        </>
      ):<EHint msg="↑  Select a profile above to scan its job market intelligence"/>}
    </div>);
  };

  const rSignals=()=>(<div>
    <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>{[["S","Signals"],["H","Hiring"],["I","Intelligence"],["F","Funding"],["T","Trends"]].map(([l,w])=>(<div key={l} style={{background:"#0D0D24",border:"1px solid #1E1E3F",borderRadius:8,padding:"6px 13px",display:"flex",alignItems:"center",gap:7}}><span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:17,color:"#F5A623"}}>{l}</span><span style={{fontSize:11,color:"#A0A8C0"}}>{w}</span></div>))}</div>
    <p style={{color:"#7A82A0",fontSize:12.5,lineHeight:1.75,marginBottom:16}}>Daily intelligence briefing. Scans live AI industry news, job role trends, EdTech moves, and hiring signals. Run every morning.</p>
    <ScanBtn label="RUN MORNING BRIEFING" onClick={()=>run(PROMPTS.signals(),"signals")} isLoading={ld.signals}/>
    {ld.signals&&<LoadBox label="Scanning live intelligence sources..."/>}
    {!ld.signals&&cache.signals&&<IBox text={cache.signals.data} ts={cache.signals.ts}/>}
    {!ld.signals&&!cache.signals&&<EHint msg="↑  Hit 'Run Morning Briefing' to get today's intelligence"/>}
  </div>);

  const rEngine=()=>(<div>
    <p style={{color:"#7A82A0",fontSize:12.5,lineHeight:1.75,marginBottom:16}}>Enter any course idea. Scores across 5 dimensions, gives a launch verdict, positioning angle, and first move.</p>
    <div style={{marginBottom:13}}><label style={{display:"block",fontSize:10,color:"#50D2A0",fontWeight:700,marginBottom:5,textTransform:"uppercase",letterSpacing:"0.1em",fontFamily:"'Space Mono',monospace"}}>Course Idea</label>
      <textarea value={idea} onChange={e=>setIdea(e.target.value)} rows={3} placeholder="e.g.  AI Product Manager Bootcamp,  Agentic AI for TPMs..."
        onFocus={e=>e.target.style.borderColor="rgba(80,210,160,0.5)"} onBlur={e=>e.target.style.borderColor="#1E1E3F"}
        style={{width:"100%",background:"#0D0D24",border:"1px solid #1E1E3F",borderRadius:8,padding:"11px 13px",color:"#E2E8F4",fontSize:12.5,lineHeight:1.6,transition:"border-color 0.2s"}}/></div>
    <div style={{marginBottom:16}}><div style={{fontSize:9,color:"#3A3A55",marginBottom:6,fontFamily:"'Space Mono',monospace",letterSpacing:"0.1em"}}>QUICK IDEAS →</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{QUICK_IDEAS.map(q=><button key={q} onClick={()=>setIdea(q)} className="pill" style={{padding:"4px 10px",background:"#0D0D24",border:"1px solid #1E1E3F",borderRadius:20,fontSize:10,color:"#7A82A0",transition:"all 0.15s"}}>{q}</button>)}</div></div>
    <ScanBtn label="SCORE THIS OPPORTUNITY" onClick={()=>{if(idea.trim())run(PROMPTS.engine(idea.trim()),"engine_latest");}} isLoading={ld.engine_latest} disabled={!idea.trim()} color="#50D2A0"/>
    {ld.engine_latest&&<LoadBox label="Scoring market opportunity..."/>}
    {!ld.engine_latest&&cache.engine_latest&&<ScoreCard text={cache.engine_latest.data} ts={cache.engine_latest.ts}/>}
    {!ld.engine_latest&&!cache.engine_latest&&<EHint msg="↑  Enter a course idea and hit 'Score This Opportunity'"/>}
  </div>);

  const SUGG=["Which competitor threatens our ML Engineer course most?","What course should IK launch in the next 90 days?","How do we counter Scaler's IIT partnership?","Score IK's competitive position in Agentic AI","Revenue potential of an AI Security Engineer course?","Which IK profiles have the least competition?","Analyze upGrad's AI pivot and its impact on IK","What's leaving money on the table for IK right now?","Where should IK expand beyond MAANG prep?","How do we defend against Coursera pricing pressure?"];

  const rCatMgr=()=>(<div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 178px)"}}>
    <p style={{color:"#7A82A0",fontSize:12.5,lineHeight:1.75,marginBottom:12,flexShrink:0}}>Pre-loaded with IK's full course portfolio, all 16 competitors, June 2026 market data. Acts as your senior Category Strategist. Enter to send.</p>
    {chatH.length===0&&(<div style={{marginBottom:14,flexShrink:0}}><div style={{fontSize:9,color:"#3A3A55",marginBottom:6,fontFamily:"'Space Mono',monospace",letterSpacing:"0.1em"}}>SUGGESTED QUESTIONS →</div><div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{SUGG.map(q=><button key={q} onClick={()=>chat(q)} className="pill" style={{padding:"4px 10px",background:"#0D0D24",border:"1px solid #1E1E3F",borderRadius:20,fontSize:10,color:"#7A82A0",transition:"all 0.15s",textAlign:"left"}}>{q}</button>)}</div></div>)}
    <div ref={chatRef} style={{flex:1,overflowY:"auto",background:"#0A0A1E",borderRadius:10,border:"1px solid #1E1E3F",padding:"14px",marginBottom:10,minHeight:160}}>
      {chatH.length===0?(<div style={{textAlign:"center",padding:"36px 20px",color:"#2E2E4A",fontFamily:"'Space Mono',monospace",fontSize:11}}>◧ Virtual Category Manager ready<br/><span style={{fontSize:9,marginTop:7,display:"block"}}>Context: 13 courses · 16 competitors · June 2026 market data</span></div>):(
        chatH.map((m,i)=>(<div key={i} className="chat-msg" style={{marginBottom:14,display:"flex",gap:9,flexDirection:m.role==="user"?"row-reverse":"row"}}>
          <div style={{width:26,height:26,borderRadius:"50%",background:m.role==="user"?"rgba(245,166,35,0.2)":"rgba(168,85,247,0.2)",border:`1px solid ${m.role==="user"?"rgba(245,166,35,0.4)":"rgba(168,85,247,0.4)"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:10,color:m.role==="user"?"#F5A623":"#A855F7",fontFamily:"'Syne',sans-serif",fontWeight:700}}>{m.role==="user"?"U":"AI"}</div>
          <div style={{background:m.role==="user"?"rgba(245,166,35,0.05)":"rgba(168,85,247,0.05)",border:`1px solid ${m.role==="user"?"rgba(245,166,35,0.12)":"rgba(168,85,247,0.1)"}`,borderRadius:10,padding:"11px 13px",maxWidth:"85%"}}>
            <pre style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:12.5,lineHeight:1.78,color:"#D0D8EE",whiteSpace:"pre-wrap",wordBreak:"break-word"}}>{m.content}</pre>
          </div>
        </div>))
      )}
      {ld.catmgr&&(<div style={{display:"flex",gap:6,padding:"8px"}}><div className="d1" style={{width:7,height:7,borderRadius:"50%",background:"#A855F7"}}/><div className="d2" style={{width:7,height:7,borderRadius:"50%",background:"#A855F7"}}/><div className="d3" style={{width:7,height:7,borderRadius:"50%",background:"#A855F7"}}/></div>)}
    </div>
    <div style={{display:"flex",gap:9,flexShrink:0}}>
      <textarea value={chatIn} onChange={e=>setChatIn(e.target.value)}
        onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey&&chatIn.trim()){e.preventDefault();chat(chatIn.trim());}}}
        placeholder="Ask the Category Manager... (Enter to send, Shift+Enter for newline)" rows={2}
        onFocus={e=>e.target.style.borderColor="rgba(168,85,247,0.5)"} onBlur={e=>e.target.style.borderColor="#1E1E3F"}
        style={{flex:1,background:"#0D0D24",border:"1px solid #1E1E3F",borderRadius:8,padding:"11px 13px",color:"#E2E8F4",fontSize:12.5,lineHeight:1.5,transition:"border-color 0.2s"}}/>
      <button onClick={()=>{if(chatIn.trim())chat(chatIn.trim());}} disabled={!chatIn.trim()||ld.catmgr}
        style={{padding:"11px 16px",background:chatIn.trim()&&!ld.catmgr?"rgba(168,85,247,0.12)":"#111128",border:`1px solid ${chatIn.trim()&&!ld.catmgr?"#A855F7":"#252540"}`,borderRadius:8,color:chatIn.trim()&&!ld.catmgr?"#A855F7":"#3A3A55",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:11,letterSpacing:"0.08em",transition:"all 0.18s",alignSelf:"stretch"}}>SEND</button>
      {chatH.length>0&&<button onClick={()=>{setChatH([]);LS.set("chat_history",[]);}} style={{padding:"11px 13px",background:"#0D0D24",border:"1px solid #1E1E3F",borderRadius:8,color:"#3A3A55",fontSize:10,fontFamily:"'Space Mono',monospace",alignSelf:"stretch",transition:"all 0.15s"}} onMouseEnter={e=>e.currentTarget.style.color="#FF6B6B"} onMouseLeave={e=>e.currentTarget.style.color="#3A3A55"}>CLEAR</button>}
    </div>
  </div>);

  const cm=MOD[tab];
  return(<div style={{display:"flex",flexDirection:"column",height:"100vh",overflow:"hidden"}}>
    <div style={{height:50,flexShrink:0,padding:"0 20px",borderBottom:"1px solid #1A1A35",display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(7,7,26,0.98)",zIndex:200,boxShadow:"0 1px 0 0 rgba(245,166,35,0.07)"}}>
      <div style={{display:"flex",alignItems:"center",gap:11}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:22,color:"#F5A623",letterSpacing:"-0.02em",lineHeight:1}}>SHIFT</div>
        <div style={{width:1,height:22,background:"#1A1A35"}}/>
        <div><div style={{fontSize:8,color:"#3A3A55",fontFamily:"'Space Mono',monospace",letterSpacing:"0.1em"}}>SKILLS · HIRING · INTELLIGENCE · FUNDING · TRENDS</div><div style={{fontSize:8,color:"#1E1E2E",fontFamily:"'Space Mono',monospace"}}>Interview Kickstart · Category Intelligence OS v2</div></div>
      </div>
      <div style={{textAlign:"right"}}>
        <div style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#F5A623",letterSpacing:"0.05em"}}>{tsStr}</div>
        <div style={{fontFamily:"'Space Mono',monospace",fontSize:8,color:"#3A3A55",marginTop:1}}>{dtStr}</div>
      </div>
    </div>
    <div style={{display:"flex",flex:1,overflow:"hidden"}}>
      <div style={{width:182,flexShrink:0,background:"#0A0A1E",borderRight:"1px solid #1A1A35",display:"flex",flexDirection:"column",overflowY:"auto"}}>
        <div style={{flex:1,padding:"9px 0"}}>
          {Object.entries(MOD).map(([key,mod])=>{const active=tab===key;return(<button key={key} onClick={()=>setTab(key)} className="nav-item" style={{width:"100%",padding:"9px 14px",background:active?mod.c+"14":"transparent",border:"none",borderLeft:`3px solid ${active?mod.c:"transparent"}`,textAlign:"left",transition:"all 0.15s",display:"block"}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:13,opacity:active?1:0.4,color:mod.c}}>{mod.icon}</span>
              <div><div className="nav-lbl" style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:10,color:active?mod.c:"#4A4A65",letterSpacing:"0.08em",opacity:active?1:0.8,transition:"opacity 0.15s"}}>{mod.label}</div><div style={{fontSize:7,color:active?"#5A6080":"#252535",fontFamily:"'Space Mono',monospace"}}>{mod.sub}</div></div>
            </div>
          </button>);
          })}
        </div>
        <div style={{padding:"11px 14px",borderTop:"1px solid #1A1A35"}}>
          <div style={{fontSize:8,color:"#2E2E4E",fontFamily:"'Space Mono',monospace",marginBottom:2}}>TOTAL SCANS</div>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:18,color:"#F5A623"}}>{scanCount}</div>
          <div style={{fontSize:7,color:"#2E2E4E",fontFamily:"'Space Mono',monospace",marginTop:4}}>v2.0 · SHIFT by IK</div>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:tab==="catmgr"?"22px 26px 0":"22px 26px 56px"}}>
        <div style={{maxWidth:tab==="market"||tab==="rivals"?1000:840,margin:"0 auto"}}>
          {tab!=="home"&&(<div style={{marginBottom:18}}><h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:19,color:cm?.c||"#E2E8F4",marginBottom:2,letterSpacing:"-0.01em"}}>{cm?.label}</h1><div style={{fontSize:8,color:"#3A3A55",fontFamily:"'Space Mono',monospace",letterSpacing:"0.1em"}}>{cm?.sub}</div></div>)}
          {tab==="home"    &&rHome()}
          {tab==="market"  &&rMarket()}
          {tab==="rivals"  &&rRivals()}
          {tab==="hiring"  &&rHiring()}
          {tab==="signals" &&rSignals()}
          {tab==="engine"  &&rEngine()}
          {tab==="catmgr"  &&rCatMgr()}
        </div>
      </div>
    </div>
  </div>);
}
ReactDOM.render(<SHIFT/>,document.getElementById("root"));
</script></body></html>
