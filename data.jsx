// data.jsx — sample data for IMIN
const PEOPLE = {
  tyler:  {id:'tyler',  name:'Tyler Chen',     initials:'TC', color:'#1D6BD0', role:'Operations Lead'},
  maya:   {id:'maya',   name:'Maya Okafor',    initials:'MO', color:'#8A63C4', role:'Senior Editor'},
  diego:  {id:'diego',  name:'Diego Ramírez',  initials:'DR', color:'#F86566', role:'Motion Designer'},
  priya:  {id:'priya',  name:'Priya Nair',     initials:'PN', color:'#1FA98A', role:'Localization'},
  sam:    {id:'sam',    name:'Sam Whitfield',  initials:'SW', color:'#FF9A4E', role:'Account Manager'},
  lena:   {id:'lena',   name:'Lena Brandt',    initials:'LB', color:'#E068A7', role:'Creative Director'},
  noah:   {id:'noah',   name:'Noah Kim',       initials:'NK', color:'#2FB2F3', role:'Copywriter'},
  aria:   {id:'aria',   name:'Aria Volkov',    initials:'AV', color:'#7FC457', role:'QA Reviewer'},
};
const PL = Object.values(PEOPLE);

const TAGS = {
  campaign:{label:'Campaign', color:'#1D6BD0', tint:'#E7EFFB'},
  video:   {label:'Video',    color:'#8A63C4', tint:'#F1EBFA'},
  social:  {label:'Social',   color:'#E068A7', tint:'#FBEAF4'},
  brand:   {label:'Brand',    color:'#FF9A4E', tint:'#FFF1E4'},
  web:     {label:'Web',      color:'#2FB2F3', tint:'#E6F4FE'},
  print:   {label:'Print',    color:'#7FC457', tint:'#EEF6E6'},
  legal:   {label:'Legal',    color:'#F86566', tint:'#FEECEC'},
  loc:     {label:'Localize', color:'#1FA98A', tint:'#E4F5F0'},
};

const STATUS = {
  backlog:    {label:'Backlog',     color:'#8C94A3', tint:'#EFF2F6'},
  in_progress:{label:'In Progress', color:'#1D6BD0', tint:'#E7EFFB'},
  review:     {label:'In Review',   color:'#FF9A4E', tint:'#FFF1E4'},
  complete:   {label:'Complete',    color:'#1FA98A', tint:'#E4F5F0'},
};
const PRIORITY = {
  urgent:{label:'Urgent', color:'#F86566'},
  high:  {label:'High',   color:'#FF9A4E'},
  med:   {label:'Medium', color:'#1D6BD0'},
  low:   {label:'Low',    color:'#8C94A3'},
};

const COLUMNS = [
  {id:'backlog', label:'Backlog'},
  {id:'in_progress', label:'In Progress'},
  {id:'review', label:'Review'},
  {id:'complete', label:'Complete'},
];

// due dates relative to "today" June 5 2026
function mk(id, file, col, due, tags, who, pri, opts={}){
  return {id, file, col, due, tags, assignees:who, priority:pri,
    comments:opts.c||0, attachments:opts.a||0, workspace:opts.ws||'Content',
    desc:opts.desc||'', updates:opts.updates||0, ...opts};
}
const TASKS = [
  mk('T-204','Q3 Brand Campaign — Hero Cut.mp4','in_progress','Jun 6',['campaign','video'],['diego','lena'],'urgent',{c:8,a:3,desc:'Final hero edit for the Q3 launch. Color grade approved; awaiting motion title pass.'}),
  mk('T-198','Acme Rebrand — Style Guide.pdf','review','Jun 5',['brand','print'],['lena','maya'],'high',{c:4,a:2,desc:'Full visual identity guidelines. Needs creative director sign-off before client delivery.'}),
  mk('T-211','Spring Social — Reel Pack (12).zip','in_progress','Jun 9',['social','video'],['tyler','noah'],'med',{c:2,a:12,desc:'Twelve short-form reels for the spring push across IG + TikTok.'}),
  mk('T-187','Landing Page — Pricing Refresh','review','Jun 4',['web'],['tyler','noah'],'high',{c:6,a:1,desc:'Copy + layout refresh for the pricing page experiment.'}),
  mk('T-220','FR/DE Localization — Launch Email','backlog','Jun 12',['loc','campaign'],['tyler','priya'],'med',{c:1,a:0,desc:'Translate and adapt the launch email for French and German markets.'}),
  mk('T-176','Investor Deck — Visual Polish','complete','Jun 2',['brand','print'],['tyler','lena'],'med',{c:11,a:5,desc:'Series B narrative deck refinement.'}),
  mk('T-215','Trademark Clearance — “Northwind”','backlog','Jun 14',['legal'],['sam'],'high',{c:0,a:1,ws:'Requests',desc:'Clearance check for the proposed product name ahead of filing.'}),
  mk('T-201','Homepage Hero — Variant Test','in_progress','Jun 8',['web','campaign'],['noah','priya'],'low',{c:3,a:2,desc:'A/B variant of homepage hero messaging.'}),
  mk('T-193','Podcast Series — Cover Art','review','Jun 7',['brand','social'],['diego'],'med',{c:5,a:4,desc:'Cover art system for the new 8-episode series.'}),
  mk('T-184','Annual Report — Infographics','complete','Jun 1',['print','brand'],['maya','aria'],'low',{c:9,a:6,desc:'Data visualizations for the FY annual report.'}),
  mk('T-222','Accessibility Audit — Web App','backlog','Jun 16',['web','legal'],['aria'],'med',{c:0,a:0,desc:'WCAG 2.2 AA audit pass on the marketing site.'}),
  mk('T-209','Holiday Teaser — Storyboard','in_progress','Jun 10',['video','campaign'],['lena','diego'],'high',{c:2,a:3,desc:'Storyboard for the 30s holiday teaser spot.'}),
  mk('T-167','Press Kit — Photography Set','complete','May 30',['brand'],['sam','maya'],'low',{c:7,a:18,desc:'Curated press photography and bios.'}),
  mk('T-218','Newsletter Template — Modular','backlog','Jun 18',['web','social'],['noah'],'low',{c:0,a:0,desc:'Reusable modular newsletter system in the ESP.'}),
];

const REQUESTS = [
  {id:'R-88', name:'“Northwind” Name Clearance',  type:'Clearance', submitted:'Jun 3', status:'In Review', reviewer:'sam',   due:'Jun 9'},
  {id:'R-91', name:'FR/DE Launch Email Copy',      type:'Language',  submitted:'Jun 4', status:'Submitted', reviewer:'priya', due:'Jun 12'},
  {id:'R-84', name:'Q3 Hero Cut — Legal Review',   type:'Review',    submitted:'Jun 2', status:'In Review', reviewer:'aria',  due:'Jun 6'},
  {id:'R-90', name:'Style Guide — Final Approval',  type:'Approval',  submitted:'Jun 3', status:'Approved',  reviewer:'lena',  due:'Jun 5'},
  {id:'R-79', name:'Pricing Page Copy — Sign-off',  type:'Approval',  submitted:'May 31',status:'Completed', reviewer:'tyler', due:'Jun 2'},
  {id:'R-92', name:'Reel Pack — Music Licensing',  type:'Clearance', submitted:'Jun 4', status:'Submitted', reviewer:'sam',   due:'Jun 13'},
  {id:'R-77', name:'Investor Deck — Disclaimer',    type:'Language',  submitted:'May 29',status:'Rejected',  reviewer:'aria',  due:'Jun 1'},
];
const REQ_STATUS = {
  'Submitted':{color:'#8C94A3', tint:'#EFF2F6'},
  'In Review':{color:'#FF9A4E', tint:'#FFF1E4'},
  'Approved': {color:'#1FA98A', tint:'#E4F5F0'},
  'Rejected': {color:'#F86566', tint:'#FEECEC'},
  'Completed':{color:'#1D6BD0', tint:'#E7EFFB'},
};
const REQ_TYPE = {
  'Language': '#1FA98A','Review':'#1D6BD0','Approval':'#8A63C4','Clearance':'#FF9A4E'
};

const ACTIVITY = [
  {who:'lena',  verb:'approved', what:'Style Guide — Final Approval', kind:'approval', t:'12m'},
  {who:'diego', verb:'moved',    what:'Q3 Brand Campaign — Hero Cut to In Progress', kind:'status', t:'34m'},
  {who:'aria',  verb:'completed review on', what:'Annual Report — Infographics', kind:'review', t:'1h'},
  {who:'noah',  verb:'commented on', what:'Landing Page — Pricing Refresh', kind:'comment', t:'2h'},
  {who:'sam',   verb:'assigned',  what:'Trademark Clearance — “Northwind” to you', kind:'assign', t:'3h'},
  {who:'maya',  verb:'attached 2 files to', what:'Acme Rebrand — Style Guide', kind:'attach', t:'4h'},
  {who:'priya', verb:'submitted', what:'FR/DE Launch Email Copy request', kind:'request', t:'5h'},
];
const ACT_KIND = {
  approval:{icon:'check', color:'#1FA98A', tint:'#E4F5F0'},
  status:  {icon:'columns', color:'#1D6BD0', tint:'#E7EFFB'},
  review:  {icon:'eye', color:'#FF9A4E', tint:'#FFF1E4'},
  comment: {icon:'comment', color:'#8A63C4', tint:'#F1EBFA'},
  assign:  {icon:'user', color:'#E068A7', tint:'#FBEAF4'},
  attach:  {icon:'paperclip', color:'#2FB2F3', tint:'#E6F4FE'},
  request: {icon:'inbox', color:'#7FC457', tint:'#EEF6E6'},
};

const KPIS = [
  {label:'Open Tasks',       value:42, delta:+6,  dir:'up',   neutral:true,  accent:'#1D6BD0', spark:[28,30,29,33,31,36,38,40,42]},
  {label:'Overdue',          value:5,  delta:-2,  dir:'down', good:true,     accent:'#F86566', spark:[9,8,8,7,7,6,6,5,5]},
  {label:'Completed (wk)',   value:38, delta:+12, dir:'up',   good:true,     accent:'#1FA98A', spark:[18,22,21,26,28,30,33,35,38]},
  {label:'Active Projects',  value:14, delta:+1,  dir:'up',   neutral:true,  accent:'#8A63C4', spark:[11,12,12,13,12,13,13,14,14]},
  {label:'Awaiting Approval',value:7,  delta:+3,  dir:'up',   bad:true,      accent:'#FF9A4E', spark:[3,4,3,5,4,6,5,6,7]},
];

const WORKLOAD = [
  {who:'diego', load:96}, {who:'lena', load:88}, {who:'noah', load:72},
  {who:'maya', load:64}, {who:'priya', load:55}, {who:'aria', load:43}, {who:'sam', load:38},
];

const WORKSPACES = [
  {id:'content',  name:'Content',  icon:'file',   color:'#1D6BD0', tint:'#E7EFFB', active:38, today:6,  desc:'Production tasks, files & content workflows'},
  {id:'teams',    name:'Teams',    icon:'users',  color:'#8A63C4', tint:'#F1EBFA', active:8,  today:2,  desc:'People, capacity, availability & leave'},
  {id:'requests', name:'Requests', icon:'inbox',  color:'#FF9A4E', tint:'#FFF1E4', active:12, today:4,  desc:'Language, review, approval & clearance'},
  {id:'review',   name:'Review',   icon:'eye',    color:'#1FA98A', tint:'#E4F5F0', active:9,  today:3,  desc:'QA passes, sign-offs & change history'},
];

// calendar events for June 2026 (day -> events)
const CAL_EVENTS = {
  4:[{t:'Pricing copy due', tag:'web'}],
  5:[{t:'Style guide sign-off', tag:'brand'},{t:'Hero legal review', tag:'legal'}],
  6:[{t:'Q3 Hero Cut due', tag:'video'}],
  7:[{t:'Podcast cover art', tag:'brand'}],
  8:[{t:'Hero variant test', tag:'web'}],
  9:[{t:'Reel pack delivery', tag:'social'},{t:'Name clearance', tag:'legal'}],
  10:[{t:'Holiday storyboard', tag:'video'}],
  11:[{t:'Diego — PTO', tag:'leave'}],
  12:[{t:'FR/DE email', tag:'loc'},{t:'Diego — PTO', tag:'leave'}],
  14:[{t:'Trademark clearance', tag:'legal'}],
  16:[{t:'A11y audit', tag:'web'}],
  18:[{t:'Newsletter template', tag:'social'}],
  19:[{t:'Maya — PTO', tag:'leave'}],
  23:[{t:'Q3 Campaign launch', tag:'campaign'}],
};

// Content workspace — collections / folders
const FOLDERS = [
  {id:'f1', name:'Q3 Brand Campaign', updated:'Jun 5', files:42, size:'3.8 GB', types:'MP4, AE, PDF', color:'#1D6BD0', fav:true,  owner:'lena'},
  {id:'f2', name:'Acme Rebrand', updated:'Jun 4', files:28, size:'1.2 GB', types:'AI, PDF, PNG', color:'#FF9A4E', fav:true,  owner:'maya'},
  {id:'f3', name:'Spring Social Pack', updated:'Jun 3', files:64, size:'2.1 GB', types:'MP4, JPG', color:'#E068A7', fav:false, owner:'diego'},
  {id:'f4', name:'Investor Materials', updated:'Jun 2', files:16, size:'240 MB', types:'KEY, PDF', color:'#5568C7', fav:false, owner:'sam'},
  {id:'f5', name:'Press Kit', updated:'May 30', files:38, size:'4.6 GB', types:'JPG, RAW', color:'#7FC457', fav:true,  owner:'maya'},
  {id:'f6', name:'Web Refresh', updated:'Jun 4', files:22, size:'180 MB', types:'Figma, PNG', color:'#2FB2F3', fav:false, owner:'noah'},
  {id:'f7', name:'Holiday Teaser', updated:'Jun 6', files:12, size:'1.9 GB', types:'MP4, AE', color:'#8A63C4', fav:false, owner:'diego'},
  {id:'f8', name:'Localization Hub', updated:'Jun 1', files:31, size:'96 MB', types:'DOCX, SRT', color:'#1FA98A', fav:false, owner:'priya'},
];
const DEVICES = [
  {id:'d1', name:'Frame.io', sub:'Video review · synced 4m ago', files:128, color:'#1D6BD0', icon:'device'},
  {id:'d2', name:'Google Drive', sub:'Shared drive · synced 1h ago', files:642, color:'#1FA98A', icon:'device'},
  {id:'d3', name:'Dropbox', sub:'Team folder · synced 2h ago', files:318, color:'#2FB2F3', icon:'device'},
  {id:'d4', name:'Studio NAS', sub:'On-prem · synced 12m ago', files:1840, color:'#8A63C4', icon:'device'},
];

Object.assign(window, {
  PEOPLE, PL, TAGS, STATUS, PRIORITY, COLUMNS, TASKS, REQUESTS, REQ_STATUS, REQ_TYPE,
  ACTIVITY, ACT_KIND, KPIS, WORKLOAD, WORKSPACES, CAL_EVENTS, FOLDERS, DEVICES
});
