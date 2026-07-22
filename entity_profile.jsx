// entity_profile.jsx — full subject dossier + organization profile + router
// Consumes data + helpers from entities.jsx. Styled to the IMIN design system.

// ---------- full dossier data (Marcus Delacroix · SBJ-4471-K) ----------
const DOSSIERS = {
  'SBJ-4471-K': {
    priority: 'P1 · PRIORITY',
    summary: 'Dual-national operating under commercial cover (Meridian Logistics SARL); assessed as the financial conduit and coordinating broker across Operation Meridian. Travels under multiple identities and is linked to a Critical-risk logistics principal.',
    headerFacts: [
      {label:'Date of Birth', value:'19 Mar 1984 (42)'},
      {label:'Nationality', value:'FR / CA (dual)'},
      {label:'Last Known', value:'Lyon, France'},
      {label:'First Logged', value:'02 Feb 2024'},
      {label:'Handler', value:'Analyst J. Renner'},
    ],
    flags: [
      {label:'Suspected money laundering (FININT)', color:'#DC2626', tint:'#FEF2F2'},
      {label:'Weapons-trafficking nexus', color:'#DC2626', tint:'#FEF2F2'},
      {label:'Travels under multiple identities', color:'#B5851C', tint:'#FFFBEB'},
      {label:'Associate of Critical-risk subject (Sokolov)', color:'#DC2626', tint:'#FEF2F2'},
    ],
    counts: [
      {label:'Known Locations', value:'4', tab:'locations'},
      {label:'Associates', value:'7', tab:'network'},
      {label:'Travel Events', value:'6', tab:'travel'},
      {label:'Comms Channels', value:'6', tab:'comms'},
    ],
    recentActivity: [
      {color:'#DC2626', title:'Re-entered France via Geneva (auto-flag)', dateLabel:'09 JUN 2026'},
      {color:'#B5851C', title:'Cash-purchased flight DXB → GVA', dateLabel:'04 JUN 2026'},
      {color:'#0073E6', title:'Met facilitator Y. Demir, Istanbul (HUMINT)', dateLabel:'31 MAY 2026'},
    ],
    bioFields: [
      {label:'Full Name', value:'Marcus Antoine Delacroix', ...src('OSINT','A1')},
      {label:'Date of Birth', value:'19 March 1984 (42)', ...src('OSINT','A1')},
      {label:'Place of Birth', value:'Lyon, France', ...src('OSINT','A2')},
      {label:'Sex', value:'Male', ...src('OSINT','A1')},
      {label:'Nationality', value:'French / Canadian (dual)', ...src('OSINT','A1')},
      {label:'Cover Occupation', value:'Import/export consultant', ...src('HUMINT','B2')},
      {label:'Employer (cover)', value:'Meridian Logistics SARL', ...src('FININT','B1')},
      {label:'Languages', value:'FR (native), EN, RU, AR (basic)', ...src('HUMINT','C2')},
    ],
    physFields: [
      {label:'Height', value:'183 cm', ...src('FORENSIC','A2')},
      {label:'Weight', value:'81 kg', ...src('IMINT','C3')},
      {label:'Build', value:'Athletic', ...src('IMINT','B3')},
      {label:'Eyes', value:'Hazel', ...src('FORENSIC','A1')},
      {label:'Hair', value:'Dark brown, greying', ...src('IMINT','B2')},
      {label:'Distinguishing Marks', value:'Scar, left forearm; compass tattoo, R. shoulder', ...src('HUMINT','B2')},
    ],
    docs: [
      {label:'Passport · France', value:'19FR4471K', status:'Active', statusColor:'#16A34A', exhibit:'EVD-2270', scan:true, cover:'#1C3A5E'},
      {label:'Passport · Canada', value:'GA8842117', status:'Flagged', statusColor:'#B5851C', exhibit:'EVD-2271', scan:true, cover:'#6E1A20'},
      {label:'Passport · (suspect)', value:'EU0099★★★', status:'Fraudulent', statusColor:'#DC2626', exhibit:'EVD-2288', scan:true, cover:'#3A3020'},
      {label:'National ID · FR', value:'840319-69123', status:'Verified', statusColor:'#16A34A', exhibit:'—', scan:false},
    ],
    biometrics: [
      {name:'Iris Scan', status:'Enrolled', color:'#16A34A', detail:'Both eyes on file · captured 2024-02 entry', pct:100},
      {name:'DNA Profile', status:'On File', color:'#16A34A', detail:'CODIS ref DX-44719 · 20-marker STR', pct:100},
      {name:'Voiceprint', status:'Partial', color:'#B5851C', detail:'14 sec sample from intercept · low quality', pct:46},
      {name:'Gait Model', status:'Modelling', color:'#0073E6', detail:'CCTV-derived · 3 sequences, building confidence', pct:68},
    ],
    faceMatch:98.4,
    prints:['LT','LI','LM','LR','LL','RT','RI','RM','RR','RL'],
    patternOfLife: {
      window:'30-day window · 412 geolocation events · cell · ALPR · surveillance fused',
      predictability:82,
      sources:['Cell tower','ALPR','Surveillance','App geodata'],
      anchors:[
        {label:'Bed-down Location', name:'14 Rue des Capucins', sub:'Lyon 1er · nightly 22:00–07:00', revisits:'26', dwell:'248h', conf:'High', color:'#0073E6', icon:'pin_loc'},
        {label:'Work Pattern Hub', name:'Meridian Logistics', sub:'Quai Perrache · Mon–Fri 08:00–18:00', revisits:'21', dwell:'176h', conf:'High', color:'#7A4FB5', icon:'collections'},
        {label:'Top Frequented', name:'Café de la Bourse', sub:'Midday meetings · Presqu’île', revisits:'14', dwell:'31h', conf:'Med', color:'#B5851C', icon:'star_fill'},
      ],
      dayBands:[
        {hours:7,color:'#0073E6',label:'Home'},{hours:1,color:'#0E7C9E',label:''},{hours:4,color:'#7A4FB5',label:'Work'},
        {hours:1,color:'#B5851C',label:''},{hours:5,color:'#7A4FB5',label:'Work'},{hours:1,color:'#0E7C9E',label:''},
        {hours:2,color:'#B5851C',label:'Gym'},{hours:1,color:'#0E7C9E',label:''},{hours:2,color:'#0073E6',label:'Home'},
      ],
      legend:[{label:'Bed-down',color:'#0073E6'},{label:'Work',color:'#7A4FB5'},{label:'Frequent',color:'#B5851C'},{label:'Transit',color:'#0E7C9E'},{label:'Periodic',color:'#94A3B8'}],
      anomalies:[{text:'Overnight away from bed-down location', date:'04 JUN · Geneva'},{text:'Unscheduled periodic-site visit (Warehouse 7)', date:'31 MAY'}],
      locations:[
        {name:'14 Rue des Capucins', area:'Lyon 1er', type:'Bed-down', color:'#0073E6', revisits:26, dwell:'248h', avg:'9.5h', window:'22:00–07:00', last:'17 JUN', conf:'High', confColor:'#16A34A'},
        {name:'Meridian Logistics', area:'Quai Perrache', type:'Work', color:'#7A4FB5', revisits:21, dwell:'176h', avg:'8.4h', window:'Mon–Fri 08:00–18:00', last:'16 JUN', conf:'High', confColor:'#16A34A'},
        {name:'Café de la Bourse', area:'Presqu’île', type:'Frequent', color:'#B5851C', revisits:14, dwell:'31h', avg:'2.2h', window:'12:00–14:00', last:'15 JUN', conf:'Med', confColor:'#B5851C'},
        {name:'Club Sportif Lyon', area:'Lyon 2', type:'Frequent', color:'#B5851C', revisits:11, dwell:'19h', avg:'1.7h', window:'19:00–21:00', last:'14 JUN', conf:'Med', confColor:'#B5851C'},
        {name:'Residence · L. Voss', area:'Croix-Rousse', type:'Frequent', color:'#B5851C', revisits:6, dwell:'14h', avg:'2.3h', window:'Evenings', last:'11 JUN', conf:'Med', confColor:'#B5851C'},
        {name:'Part-Dieu Station', area:'Lyon 3', type:'Transit', color:'#0E7C9E', revisits:9, dwell:'4h', avg:'0.4h', window:'Variable', last:'12 JUN', conf:'High', confColor:'#16A34A'},
        {name:'Warehouse 7', area:'Gennevilliers · Paris', type:'Periodic', color:'#94A3B8', revisits:3, dwell:'22h', avg:'7.3h', window:'Overnight', last:'04 JUN', conf:'Low', confColor:'#94A3B8'},
      ],
    },
    coStats:[
      {label:'Strong correlates', value:'2', sub:'co-occurrence score ≥ 70', color:'#DC2626'},
      {label:'Shared movements · 120d', value:'100', sub:'fused travel · cell · ALPR · CCTV', color:'var(--ink)'},
      {label:'Top correlate', value:'82%', sub:'Dimitri Sokolov · always together', color:'#DC2626'},
    ],
    coTravelers:[
      {id:'SBJ-0098-S', score:92, band:'Always together', corr:82, coWith:'14 of 17 movements', events:33, last:'09 JUN', sig:{Flight:9,Cell:14,ALPR:6,CCTV:4}, note:'', timeline:[
        {date:'09 JUN', place:'Geneva GVA → Lyon LYS', type:'Flight', source:'PNR / border record', delta:'Same booking reference'},
        {date:'31 MAY', place:'Istanbul — Karaköy café', type:'CCTV', source:'Surveillance team', delta:'Arrived together'},
        {date:'22 MAY', place:'Lyon — Part-Dieu cell sector', type:'Cell', source:'Cell tower dump', delta:'Co-located ~3h'},
        {date:'14 MAY', place:'A6 motorway · Mâcon toll', type:'ALPR', source:'ALPR gantry', delta:'2 min apart'},
        {date:'02 MAY', place:'Dubai DXB → Geneva GVA', type:'Flight', source:'PNR', delta:'Adjacent seats'},
      ]},
      {id:'SBJ-2210-V', score:74, band:'Frequent', corr:59, coWith:'10 of 17 movements', events:23, last:'11 JUN', sig:{Flight:4,Cell:11,ALPR:3,CCTV:5}, note:'', timeline:[
        {date:'11 JUN', place:'Lyon — Croix-Rousse residence', type:'Cell', source:'Cell tower', delta:'Evening overlap'},
        {date:'28 MAY', place:'Paris — Gare de Lyon', type:'CCTV', source:'Station CCTV', delta:'Same train'},
        {date:'19 MAY', place:'Lyon — Presqu’île', type:'CCTV', source:'Surveillance', delta:'+8 min'},
        {date:'07 MAY', place:'Lyon LYS → Paris ORY', type:'Flight', source:'PNR', delta:'Same flight'},
      ]},
      {id:'SBJ-1144-R', score:61, band:'Frequent', corr:47, coWith:'8 of 17 movements', events:20, last:'02 JUN', sig:{Flight:3,Cell:7,ALPR:8,CCTV:2}, note:'Courier pattern — co-travel concentrated on road movements.', timeline:[
        {date:'02 JUN', place:'A7 · Vienne toll', type:'ALPR', source:'ALPR gantry', delta:'Convoy, 1 min apart'},
        {date:'27 MAY', place:'Gennevilliers · Warehouse 7', type:'ALPR', source:'ALPR', delta:'Same arrival window'},
        {date:'18 MAY', place:'Lyon — Quai Perrache', type:'Cell', source:'Cell tower', delta:'Co-located ~2h'},
        {date:'05 MAY', place:'Marseille MRS → Lyon LYS', type:'Flight', source:'PNR', delta:'Same flight'},
      ]},
      {id:'SBJ-3372-D', score:44, band:'Occasional', corr:29, coWith:'5 of 17 movements', events:11, last:'31 MAY', sig:{Flight:2,Cell:5,ALPR:1,CCTV:3}, note:'', timeline:[
        {date:'31 MAY', place:'Istanbul — Karaköy café', type:'CCTV', source:'Surveillance', delta:'Same meeting'},
        {date:'12 MAY', place:'Istanbul IST → Geneva GVA', type:'Flight', source:'PNR', delta:'Same flight'},
        {date:'29 APR', place:'Lyon — Part-Dieu', type:'Cell', source:'Cell tower', delta:'Brief overlap'},
      ]},
      {id:'SBJ-5560-B', score:38, band:'Occasional', corr:35, coWith:'6 of 17 movements', events:13, last:'08 JUN', sig:{Flight:1,Cell:9,ALPR:2,CCTV:1}, note:'Domestic partner — routine shared presence; weight discounted.', timeline:[
        {date:'08 JUN', place:'14 Rue des Capucins · Lyon 1er', type:'Cell', source:'Cell tower', delta:'Shared residence'},
        {date:'25 MAY', place:'Lyon — Bellecour', type:'CCTV', source:'Street CCTV', delta:'Together'},
        {date:'10 MAY', place:'Nice NCE → Lyon LYS', type:'Flight', source:'PNR', delta:'Same flight'},
      ]},
    ],
    crossOverlap:[
      {caseId:'21-0934', detail:'3 shared associates — Sokolov, Demir, Reyes', extra:'+ 1 shared account (Emirates NBD)'},
      {caseId:'23-4410', detail:'1 shared vehicle — AB-441-KX', extra:'+ Gennevilliers location'},
    ],
    team:[
      {name:'J. Renner', role:'Lead Analyst', initials:'JR', bg:'#0073E6'},
      {name:'K. Osei', role:'Financial Analyst', initials:'KO', bg:'#0E7C9E'},
      {name:'M. Tan', role:'Supervisor', initials:'MT', bg:'#7A4FB5'},
    ],
    tasks:[
      {title:'Translate 09 JUN SMS intercept', assignee:'J. Renner', status:'In progress', statusColor:'#B5851C', due:'Due 18 JUN'},
      {title:'Subpoena Emirates NBD records', assignee:'K. Osei', status:'Open', statusColor:'#0073E6', due:'Due 24 JUN'},
      {title:'Confirm Marbella property ownership', assignee:'K. Osei', status:'Open', statusColor:'#0073E6', due:'Due 30 JUN'},
      {title:'Forensic image of USB E-115', assignee:'Lab', status:'In progress', statusColor:'#B5851C', due:'Due 20 JUN'},
      {title:'Verify alias “Marc Devon” passport', assignee:'J. Renner', status:'Done', statusColor:'#16A34A', due:'Closed 12 JUN'},
    ],
    notes:[
      {who:'K. Osei', time:'08 JUN 16:22', text:'Helios Holdings was registered three weeks before the first wire — almost certainly purpose-built for layering.'},
      {who:'J. Renner', time:'09 JUN 09:10', text:'Re-entry via Geneva matches the February pattern. Recommend escalating intercept authorization.'},
    ],
    addresses: [
      {type:'Primary Residence', address:'14 Rue des Capucins, Apt 3B, Lyon, FR', status:'Confirmed', statusColor:'#16A34A', coords:'45.7640, 4.8357', since:'Jun 2021'},
      {type:'Suspected Safe House', address:'Warehouse 7, Port de Gennevilliers, Paris, FR', status:'Surveillance', statusColor:'#B5851C', coords:'48.9342, 2.2978', since:'Mar 2025'},
      {type:'Former Residence', address:'Flat 22, Marylebone, London, UK', status:'Vacated', statusColor:'#94A3B8', coords:'51.5205, -0.1530', since:'Vacated 2020'},
      {type:'Associate Property', address:'Villa Aurelia, Marbella, ES', status:'Frequent', statusColor:'#0073E6', coords:'36.5101, -4.8826', since:'Visits 2024–'},
    ],
    travel: [
      {dateLabel:'28 MAY 26', from:'LYS', to:'IST', mode:'Air · TK1814', doc:'FR 19FR4471K', conf:'99%', confColor:'#16A34A', flagLabel:'', ...src('OSINT','A1')},
      {dateLabel:'31 MAY 26', from:'IST', to:'DXB', mode:'Air · EK122', doc:'FR 19FR4471K', conf:'97%', confColor:'#16A34A', flagLabel:'', ...src('OSINT','A1')},
      {dateLabel:'04 JUN 26', from:'DXB', to:'GVA', mode:'Air · LX243', doc:'FR 19FR4471K', conf:'95%', confColor:'#16A34A', flagLabel:'Cash ticket', ...src('FININT','B1')},
      {dateLabel:'09 JUN 26', from:'GVA', to:'LYS', mode:'Land · A40', doc:'ID 840319', conf:'88%', confColor:'#B5851C', flagLabel:'No record', ...src('IMINT','C2')},
      {dateLabel:'12 APR 26', from:'LHR', to:'LYS', mode:'Air · BA362', doc:'FR 19FR4471K', conf:'98%', confColor:'#16A34A', flagLabel:'', ...src('OSINT','A1')},
      {dateLabel:'02 FEB 26', from:'JFK', to:'CDG', mode:'Air · AF007', doc:'CA — “Devon”', conf:'61%', confColor:'#DC2626', flagLabel:'Bio mismatch', ...src('SIGINT','C3')},
    ],
    finStats: [
      {label:'Flagged Volume · 90d', value:'€428K', color:'#DC2626'},
      {label:'Linked Accounts', value:'5', color:'var(--ink)'},
      {label:'Shell Entities', value:'3', color:'#B5851C'},
    ],
    accounts: [
      {bank:'BNP Paribas · Lyon', type:'Personal current', number:'FR76 ████ ████ 4471', status:'Monitored', statusColor:'#B5851C'},
      {bank:'Meridian Logistics SARL', type:'Business operating', number:'FR76 ████ ████ 0092', status:'Flagged', statusColor:'#DC2626'},
      {bank:'Emirates NBD · Dubai', type:'Offshore-linked', number:'AE07 ████ ████ 1180', status:'Under review', statusColor:'#B5851C'},
    ],
    wires: [
      {dateLabel:'15 MAY 26', from:'Meridian SARL', to:'Helios Holdings (CY)', amount:'€240,000', flagLabel:'Layering', ...src('FININT','A2')},
      {dateLabel:'02 MAY 26', from:'M. Delacroix', to:'Meridian SARL', amount:'€58,000', flagLabel:'', ...src('FININT','B1')},
      {dateLabel:'28 APR 26', from:'Unknown (CH)', to:'Emirates NBD', amount:'$120,000', flagLabel:'Cash-in', ...src('FININT','B2')},
      {dateLabel:'11 APR 26', from:'Meridian SARL', to:'A. Reyes', amount:'€9,500', flagLabel:'Courier fee', ...src('FININT','C2')},
    ],
    shells: [
      {name:'Meridian Logistics SARL', role:'Cover employer / primary conduit', juris:'France', status:'Confirmed', statusColor:'#DC2626', orgId:'ORG-0092'},
      {name:'Helios Holdings Ltd', role:'Offshore beneficiary', juris:'Cyprus', status:'Suspected', statusColor:'#B5851C', orgId:'ORG-7741'},
      {name:'Aurelia Estates SL', role:'Property holding vehicle', juris:'Spain', status:'Linked', statusColor:'#0073E6', orgId:'ORG-3310'},
    ],
    emails: [
      {addr:'m.delacroix@meridian-log.fr', type:'Primary business account', status:'Active', statusColor:'#16A34A'},
      {addr:'broker84@prot█████.me', type:'Encrypted — suspected operational', status:'Flagged', statusColor:'#DC2626'},
      {addr:'devon.imports@g██.de', type:'Linked to alias “Marc Devon”', status:'Monitored', statusColor:'#B5851C'},
    ],
    phones: [
      {num:'+33 6 12 ██ ██ 47', type:'Primary mobile (FR)', lastSeen:'09 Jun', status:'Intercept', statusColor:'#DC2626'},
      {num:'+41 79 ███ ██ 02', type:'Burner (CH)', lastSeen:'04 Jun', status:'Flagged', statusColor:'#B5851C'},
      {num:'+971 5█ ███ ████', type:'Dubai SIM', lastSeen:'04 Jun', status:'Dormant', statusColor:'#94A3B8'},
    ],
    commsLog: [
      {time:'09 JUN 06:12', kind:'SMS', color:'#B5851C', summary:'Inbound from +41 burner: “arrived, same as before” — flagged for translation', ...src('SIGINT','B2')},
      {time:'08 JUN 22:40', kind:'Call', color:'#0073E6', summary:'Outbound to L. Voss (SBJ-2210-V), 14 min, encrypted app', ...src('SIGINT','A2')},
      {time:'05 JUN 11:03', kind:'Email', color:'#DC2626', summary:'broker84@ → unknown: attachment (PGP), subject “invoice 7741”', ...src('SIGINT','B1')},
      {time:'31 MAY 19:55', kind:'Cell', color:'#0073E6', summary:'Handset co-located with Y. Demir tower cluster, Istanbul', ...src('SIGINT','B2')},
    ],
    associates: [
      {id:'SBJ-0098-S', name:'Dimitri Sokolov', role:'Logistics · Critical', link:'crit'},
      {id:'SBJ-2210-V', name:'Lena Voss', role:'Financier', link:'high'},
      {id:'SBJ-3372-D', name:'Yusuf Demir', role:'Facilitator', link:'med'},
      {id:'SBJ-1144-R', name:'Anton Reyes', role:'Courier', link:'low'},
      {id:'SBJ-7781-M', name:'Helena Marsh', role:'Attorney', link:'med'},
      {id:'SBJ-5560-B', name:'Claire Beaumont', role:'Domestic partner', link:'partner'},
    ],
    timeline: [
      {dateLabel:'09 JUN 2026', title:'Re-entered France via Geneva', detail:'Land crossing flagged — no advance travel record on file.', tag:'AUTO-FLAG · B2', color:'#DC2626'},
      {dateLabel:'04 JUN 2026', title:'Cash-purchased flight DXB → GVA', detail:'Ticket bought in cash 90 minutes before departure. FININT note attached.', tag:'FININT · B1', color:'#B5851C'},
      {dateLabel:'31 MAY 2026', title:'Met facilitator Yusuf Demir', detail:'HUMINT places subject with SBJ-3372-D in Istanbul, Beyoğlu district.', tag:'HUMINT · B2', color:'#0073E6'},
      {dateLabel:'15 MAY 2026', title:'Wire transfer €240,000', detail:'Meridian Logistics SARL to offshore beneficiary in Cyprus.', tag:'FININT · A2', color:'#B5851C'},
      {dateLabel:'30 APR 2026', title:'New burner phone activated', detail:'Swiss prepaid SIM joined existing handset cluster.', tag:'SIGINT · B2', color:'#0073E6'},
      {dateLabel:'02 FEB 2026', title:'Entered US under alias', detail:'Travelled as “Marc Devon”; biometric gate logged mismatch (61%).', tag:'IDENTITY · C3', color:'#DC2626'},
    ],
    evidence: [
      {exhibit:'E-101', kind:'Surveillance photo', icon:'image', title:'Subject with Y. Demir, Istanbul café', date:'31 MAY', custody:'Sealed · Lab', ...src('IMINT','A2')},
      {exhibit:'E-108', kind:'Document', icon:'file', title:'Intercepted email — “invoice 7741” (PGP)', date:'05 JUN', custody:'Decryption pending', ...src('SIGINT','B1')},
      {exhibit:'E-112', kind:'Audio', icon:'audio', title:'Call intercept — L. Voss, 14 min', date:'08 JUN', custody:'Transcribed', ...src('SIGINT','A2')},
      {exhibit:'E-114', kind:'Forensic image', icon:'cpu', title:'MacBook Pro forensic disk image', date:'10 JUN', custody:'Analyst K. Osei', ...src('FORENSIC','A1')},
      {exhibit:'E-116', kind:'Financial record', icon:'chart', title:'Helios Holdings wire confirmations', date:'16 MAY', custody:'Sealed', ...src('FININT','A2')},
      {exhibit:'E-120', kind:'Surveillance photo', icon:'image', title:'Vehicle AB-441-KX, Gennevilliers', date:'02 JUN', custody:'Sealed · Lab', ...src('IMINT','B2')},
    ],
    vehicles: [
      {make:'Audi A6 Avant', detail:'Black · 2023', plate:'AB-441-KX', country:'FR', status:'Registered to subject', statusColor:'#DC2626'},
      {make:'Range Rover Sport', detail:'Grey · 2022', plate:'4471-MBA', country:'ES', status:'Reg. Aurelia Estates', statusColor:'#B5851C'},
      {make:'BMW R1250 (motorcycle)', detail:'CCTV-derived', plate:'— unconfirmed', country:'FR', status:'Suspected', statusColor:'#94A3B8'},
    ],
    devices: [
      {type:'iPhone 15 Pro', ident:'IMEI 35████████4471', exhibit:'EVD-2291', status:'Intercept active', statusColor:'#DC2626'},
      {type:'Burner handset · Nokia', ident:'IMEI 35████████0092', exhibit:'EVD-2304', status:'Flagged', statusColor:'#B5851C'},
      {type:'MacBook Pro (laptop)', ident:'Serial C02████████', exhibit:'EVD-2310', status:'Seized', statusColor:'#0E7C9E'},
      {type:'USB drive · 256 GB', ident:'256 GB · encrypted', exhibit:'EVD-2311', status:'In analysis', statusColor:'#0073E6'},
    ],
    linkedCases: [
      {id:'22-1187', name:'Operation Meridian', role:'Primary subject', status:'Active', statusColor:'#DC2626', opened:'Opened Feb 2024'},
      {id:'21-0934', name:'Operation Tideway', role:'Person of interest', status:'Active', statusColor:'#B5851C', opened:'Opened Aug 2023'},
      {id:'23-4410', name:'Customs Referral · LYS', role:'Linked / witness', status:'Closed', statusColor:'#94A3B8', opened:'Closed Mar 2025'},
    ],
  },
};

// ---------- small presentation helpers ----------
function DossierStat({value, label, color, onClick}){
  return (
    <div className="card card-pad" onClick={onClick} style={{cursor:onClick?'pointer':'default'}}>
      <div style={{fontSize:24,fontWeight:700,letterSpacing:'-.02em',color:color||'var(--ink)',lineHeight:1}}>{value}</div>
      <div className="muted" style={{fontSize:12,marginTop:6,fontWeight:500}}>{label}</div>
    </div>
  );
}
function SrcRow({label, value, srcType, srcGrade, last}){
  return (
    <div style={{display:'flex',alignItems:'center',gap:12,padding:'9px 0',borderTop:'1px solid var(--line)'}}>
      <span style={{fontSize:12.5,color:'var(--ink-3)',width:150,flex:'none'}}>{label}</span>
      <span style={{flex:1,minWidth:0,fontSize:13,color:'var(--ink)',fontWeight:550}}>{value}</span>
      {srcType && <SrcTag type={srcType} grade={srcGrade}/>}
    </div>
  );
}
function StatusChip({label, color}){
  return <span className="badge" style={{background:color+'18',color,height:20,fontSize:10.5,fontWeight:600,flex:'none'}}>{label}</span>;
}
const LINK_META = {
  crit:{color:'#DC2626', label:'Critical link'},
  high:{color:'#B5851C', label:'Financial / high'},
  partner:{color:'#0073E6', label:'Partner'},
  med:{color:'#64748B', label:'Supporting'},
  low:{color:'#94A3B8', label:'Peripheral'},
};

// ===================== Subject dossier =====================
function SubjectDossier({id, setPage, openEntity, flash}){
  const s = SUBJ_BY_ID[id] || SUBJECTS[0];
  const D = DOSSIERS[s.id] || null;
  const m = riskMeta(s.risk);
  const [tab,setTab]=React.useState('overview');
  React.useEffect(()=>{ setTab('overview'); }, [s.id]);

  const cs = CASES[s.caseId];
  const orgs = subjectOrgs(s.id);
  const assocFull = D ? D.associates.map(a=>({...a, ent:SUBJ_BY_ID[a.id]})).filter(a=>a.ent) : [];
  const assocLite = !D ? subjectAssociates(s.id) : [];
  const events = subjectEvents(s.id);

  const tabDef = D ? [
    ['overview','Overview'],['identity','Identity'],['biometrics','Biometrics'],['locations','Locations'],
    ['pattern','Pattern of Life'],['network','Network'],['cotravel','Co-Travel'],['travel','Travel'],
    ['financial','Financial'],['comms','Comms'],['assets','Assets'],['evidence','Evidence'],['cases','Cases'],['tasking','Tasking'],['timeline','Timeline'],
  ] : [['overview','Overview']];

  // ---- header ----
  const header = (
    <div style={{borderBottom:'1px solid var(--line)',background:'rgba(255,255,255,.65)',backdropFilter:'blur(4px)'}}>
      <div className="page" style={{paddingTop:16,paddingBottom:D?0:18}}>
        <div style={{display:'flex',alignItems:'center',gap:7,fontSize:12.5,color:'var(--ink-3)',fontWeight:500,marginBottom:16}}>
          <span style={{cursor:'pointer'}} onClick={()=>setPage('dashboard')}>Home</span>
          <Icon name="chevron_right" size={13} style={{opacity:.6}}/>
          <span style={{cursor:'pointer'}} onClick={()=>setPage('explore')}>Explore</span>
          <Icon name="chevron_right" size={13} style={{opacity:.6}}/>
          <span style={{cursor:'pointer'}} onClick={()=>setPage('explore')}>Entities</span>
          <Icon name="chevron_right" size={13} style={{opacity:.6}}/>
          <span style={{color:'var(--ink-2)',fontFamily:'ui-monospace,Menlo,monospace'}}>{s.id}</span>
        </div>
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:20,flexWrap:'wrap'}}>
          <div style={{display:'flex',alignItems:'flex-start',gap:18,minWidth:0}}>
            <EntAvatar ent={s} size={72}/>
            <div style={{minWidth:0}}>
              <div style={{display:'flex',alignItems:'center',gap:11,flexWrap:'wrap'}}>
                <h1 style={{fontSize:25,fontWeight:700,letterSpacing:'-.03em',margin:0,color:'var(--ink)'}}>{s.name}</h1>
                <RiskBadge risk={s.risk}/>
                {D && <span className="badge" style={{background:'#FEF2F2',color:'#DC2626',height:21,fontWeight:700,fontSize:10.5,letterSpacing:'.04em'}}>{D.priority}</span>}
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8,marginTop:11,flexWrap:'wrap'}}>
                <span style={{fontSize:12.5,color:'var(--ink-3)',fontWeight:500}}>Known aliases:</span>
                {s.aliases.map(a=>(
                  <span key={a} style={{fontFamily:'ui-monospace,Menlo,monospace',fontSize:12,color:'var(--ink-2)',background:'var(--surface-2)',border:'1px solid var(--line)',padding:'3px 8px',borderRadius:5}}>{a}</span>
                ))}
              </div>
              <div style={{display:'flex',alignItems:'center',gap:9,marginTop:9,fontSize:12.5,color:'var(--ink-3)',flexWrap:'wrap'}}>
                <span>{s.status}</span>
                <span style={{width:3,height:3,borderRadius:'50%',background:'var(--ink-4)'}}></span>
                <span>{s.nat}</span>
                <span style={{width:3,height:3,borderRadius:'50%',background:'var(--ink-4)'}}></span>
                <span>Last seen {s.lastSeen}</span>
                {cs && <><span style={{width:3,height:3,borderRadius:'50%',background:'var(--ink-4)'}}></span><span style={{display:'inline-flex',alignItems:'center',gap:5}}><span style={{width:6,height:6,borderRadius:'50%',background:cs.dot}}></span>{cs.op}</span></>}
              </div>
            </div>
          </div>
          <div style={{display:'flex',gap:9,flexWrap:'wrap'}}>
            <button className="btn btn-primary btn-sm" onClick={()=>flash&&flash('Flagged for review')}><Icon name="flag" size={15}/>Flag for review</button>
            <button className="btn btn-secondary btn-sm" onClick={()=>flash&&flash('Generating dossier report…')}><Icon name="file" size={15}/>Report</button>
            <button className="btn btn-ghost btn-sm" style={{border:'1px solid var(--line-2)',padding:'0 10px'}} onClick={()=>flash&&flash('More actions')}><Icon name="more" size={16}/></button>
          </div>
        </div>
        {D && (
          <div style={{display:'flex',gap:2,marginTop:16,overflowX:'auto'}}>
            {tabDef.map(([k,lb])=>(
              <button key={k} onClick={()=>setTab(k)} style={{border:0,background:'transparent',cursor:'pointer',padding:'11px 14px',fontSize:13,fontWeight:tab===k?600:500,
                color:tab===k?'var(--blue)':'var(--ink-3)',borderBottom:'2px solid '+(tab===k?'var(--blue)':'transparent'),whiteSpace:'nowrap'}}>{lb}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="rise">
      {header}
      <div className="page" style={{paddingTop:24}}>
        {(!D || tab==='overview') && <DossierOverview s={s} D={D} cs={cs} orgs={orgs} assocFull={assocFull} assocLite={assocLite} events={events} setTab={setTab} openEntity={openEntity} setPage={setPage} flash={flash}/>}
        {D && tab==='identity' && <IdentitySection D={D} flash={flash}/>}
        {D && tab==='biometrics' && <BiometricsSection D={D}/>}
        {D && tab==='locations' && <LocationsSection D={D} flash={flash}/>}
        {D && tab==='travel' && <TravelSection D={D}/>}
        {D && tab==='pattern' && <PatternOfLifeSection D={D}/>}
        {D && tab==='cotravel' && <CoTravelSection D={D} openEntity={openEntity}/>}
        {D && tab==='assets' && <AssetsSection D={D} flash={flash}/>}
        {D && tab==='cases' && <CasesSection D={D}/>}
        {D && tab==='tasking' && <TaskingSection D={D} flash={flash}/>}
        {D && tab==='financial' && <FinancialSection D={D} openEntity={openEntity}/>}
        {D && tab==='comms' && <CommsSection D={D}/>}
        {D && tab==='network' && <NetworkSection assoc={assocFull} openEntity={openEntity}/>}
        {D && tab==='timeline' && <TimelineSection D={D}/>}
        {D && tab==='evidence' && <EvidenceSection D={D} flash={flash}/>}
      </div>
    </div>
  );
}

// ---- two-column layout helper ----
function TwoCol({main, side}){
  return <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) 340px',gap:20,alignItems:'start'}}>{main}<div style={{display:'flex',flexDirection:'column',gap:16}}>{side}</div></div>;
}

function DossierOverview({s, D, cs, orgs, assocFull, assocLite, events, setTab, openEntity, setPage, flash}){
  const assoc = D ? assocFull : assocLite.map(e=>({id:e.id, name:e.name, role:e.role, ent:e, link:'med'}));
  const main = (
    <div style={{display:'flex',flexDirection:'column',gap:20,minWidth:0}}>
      {/* assessment */}
      <div className="card card-pad">
        <SectionHead icon="shield" title="Assessment" sub={cs?cs.op:'—'}/>
        <p style={{fontSize:13.5,lineHeight:1.65,color:'var(--ink-2)',margin:0,textWrap:'pretty'}}>
          {D ? D.summary : `${s.name} (${s.role}) is tracked under ${cs?cs.op:'an open case'} at ${riskMeta(s.risk).label.toLowerCase()} risk. Status: ${s.status}. Extended intelligence workup is held in the case system; the records ingested to date are summarised below.`}
        </p>
        {D && (
          <div style={{display:'flex',flexWrap:'wrap',gap:8,marginTop:16}}>
            {D.flags.map(f=>(
              <span key={f.label} className="badge" style={{background:f.tint,color:f.color,height:26,fontSize:12,fontWeight:600}}><Icon name="flag" size={12}/>{f.label}</span>
            ))}
          </div>
        )}
      </div>

      {/* counts */}
      {D && (
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14}}>
          {D.counts.map(c=>(
            <DossierStat key={c.label} value={c.value} label={c.label} onClick={()=>setTab(c.tab)}/>
          ))}
        </div>
      )}

      {/* recent activity */}
      <div className="card card-pad">
        <SectionHead icon="history" title="Recent activity"/>
        {(D?D.recentActivity:events).length===0 ? (
          <div className="muted" style={{fontSize:13,padding:'6px 0'}}>No ingested events for this subject yet.</div>
        ) : (
          <div style={{display:'flex',flexDirection:'column'}}>
            {(D?D.recentActivity:events).map((a,i,arr)=>(
              <div key={i} style={{display:'flex',gap:13,position:'relative'}}>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',flex:'none',paddingTop:3}}>
                  <span style={{width:11,height:11,borderRadius:'50%',background:a.color,boxShadow:'0 0 0 3px '+a.color+'22'}}></span>
                  {i<arr.length-1 && <span style={{width:2,flex:1,background:'var(--line)',minHeight:20}}></span>}
                </div>
                <div style={{flex:1,minWidth:0,paddingBottom:i<arr.length-1?16:0}}>
                  <div style={{fontSize:13.5,fontWeight:600,color:'var(--ink)'}}>{a.title}</div>
                  {a.detail && <div className="muted" style={{fontSize:12.5,marginTop:3,lineHeight:1.45}}>{a.detail}</div>}
                  <div className="muted" style={{fontSize:11.5,marginTop:4}}>{a.dateLabel||a.date}{a.tag?' · '+a.tag:''}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* associates */}
      <div className="card card-pad">
        <SectionHead icon="link" title="Known associates" sub={`${assoc.length} linked`}
          action={D && <span className="linkish" style={{fontSize:12.5,cursor:'pointer'}} onClick={()=>setTab('network')}>View network</span>}/>
        {assoc.length===0 ? <div className="muted" style={{fontSize:13,padding:'6px 0'}}>No linked subjects on file.</div> : (
          <div style={{display:'flex',flexDirection:'column',gap:2}}>
            {assoc.map((a,i)=>{
              const lm = LINK_META[a.link]||LINK_META.med;
              return (
                <div key={a.id} onClick={()=>openEntity&&openEntity(a.id)}
                  style={{display:'flex',alignItems:'center',gap:12,padding:'10px 8px',margin:'0 -8px',borderTop:i?'1px solid var(--line)':0,cursor:'pointer',borderRadius:8,transition:'.12s'}}
                  onMouseEnter={e=>e.currentTarget.style.background='var(--surface-2)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <EntAvatar ent={a.ent} size={34}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13.5,fontWeight:600,color:'var(--ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{a.name}</div>
                    <div className="muted" style={{fontSize:11.5}}>{a.role} · {a.ent.id}</div>
                  </div>
                  <span style={{display:'inline-flex',alignItems:'center',gap:5,fontSize:11,fontWeight:600,color:lm.color}}><span style={{width:7,height:7,borderRadius:'50%',background:lm.color}}></span>{lm.label}</span>
                  <Icon name="chevron_right" size={15} style={{color:'var(--ink-4)',flex:'none'}}/>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  const side = (
    <React.Fragment>
      {/* identity snapshot */}
      <div className="card card-pad">
        <div className="eyebrow" style={{marginBottom:6}}>Identity</div>
        <InfoRows rows={[
          ['Subject ID', s.id],
          ...(D ? D.headerFacts.map(f=>[f.label, f.value]) : [['Nationality', s.nat],['Assessed role', s.role],['Status', s.status],['Last seen', s.lastSeen]]),
        ]}/>
      </div>
      {/* cases */}
      <div className="card card-pad">
        <div className="eyebrow" style={{marginBottom:11}}>Linked cases</div>
        <div style={{display:'flex',flexDirection:'column',gap:2}}>
          {(D?D.linkedCases:[{id:s.caseId, name:cs?cs.op:'—', role:'Subject', status:'Active', statusColor:'#B5851C', opened:''}]).map((c,i)=>(
            <div key={c.id} style={{display:'flex',alignItems:'center',gap:11,padding:'9px 8px',margin:'0 -8px',borderTop:i?'1px solid var(--line)':0,borderRadius:8}}>
              <span style={{width:28,height:28,borderRadius:8,background:'var(--primary-tint)',color:'var(--primary)',display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name="gavel" size={15}/></span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:12.5,fontWeight:600,color:'var(--ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{c.name}</div>
                <div className="muted" style={{fontSize:11,marginTop:1}}>{c.role}{c.opened?' · '+c.opened:''}</div>
              </div>
              <StatusChip label={c.status} color={c.statusColor}/>
            </div>
          ))}
        </div>
      </div>
      {/* linked orgs */}
      {orgs.length>0 && (
        <div className="card card-pad">
          <div className="eyebrow" style={{marginBottom:11}}>Linked organizations · {orgs.length}</div>
          <div style={{display:'flex',flexDirection:'column',gap:2}}>
            {orgs.map((o,i)=>(
              <div key={o.id} onClick={()=>openEntity&&openEntity(o.id)}
                style={{display:'flex',alignItems:'center',gap:11,padding:'9px 8px',margin:'0 -8px',borderTop:i?'1px solid var(--line)':0,cursor:'pointer',borderRadius:8,transition:'.12s'}}
                onMouseEnter={e=>e.currentTarget.style.background='var(--surface-2)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <EntAvatar ent={o} size={28} square/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:12.5,fontWeight:600,color:'var(--ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{o.name}</div>
                  <div className="muted" style={{fontSize:11,marginTop:1}}>{o.type}</div>
                </div>
                <Icon name="chevron_right" size={15} style={{color:'var(--ink-4)',flex:'none'}}/>
              </div>
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );

  return <TwoCol main={main} side={side}/>;
}

// ---- identity ----
function IdentitySection({D, flash}){
  return (
    <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',gap:20,alignItems:'start'}}>
      <div className="card card-pad">
        <SectionHead icon="user" title="Biographic"/>
        {D.bioFields.map(f=><SrcRow key={f.label} {...f}/>)}
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:20}}>
        <div className="card card-pad">
          <SectionHead icon="eye" title="Physical description"/>
          {D.physFields.map(f=><SrcRow key={f.label} {...f}/>)}
        </div>
        <div className="card card-pad">
          <SectionHead icon="file" title="Identity documents"/>
          <div style={{display:'flex',flexDirection:'column',gap:2}}>
            {D.docs.map((d,i)=>(
              <div key={i} onClick={()=>d.scan&&flash&&flash('Opening scan '+d.exhibit+' ↗')}
                style={{display:'flex',alignItems:'center',gap:12,padding:'11px 8px',margin:'0 -8px',borderTop:i?'1px solid var(--line)':0,cursor:d.scan?'pointer':'default',borderRadius:8,transition:'.12s'}}
                onMouseEnter={e=>{if(d.scan)e.currentTarget.style.background='var(--surface-2)';}} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <PassportThumb doc={d}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:600,color:'var(--ink)'}}>{d.label}</div>
                  <div className="muted" style={{fontSize:11.5,fontFamily:'ui-monospace,Menlo,monospace'}}>{d.value} · {d.exhibit}</div>
                </div>
                <StatusChip label={d.status} color={d.statusColor}/>
                {d.scan && <button className="btn btn-secondary btn-sm" onClick={(e)=>{e.stopPropagation();flash&&flash('Opening scan '+d.exhibit+' ↗');}} style={{flex:'none'}}><Icon name="zoom_in" size={13}/>View</button>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- biometrics ----
function BiometricsSection({D}){
  return (
    <div style={{display:'grid',gridTemplateColumns:'0.9fr 1fr 1fr',gap:20,alignItems:'start'}}>
      {/* facial recognition */}
      <div className="card card-pad">
        <div className="eyebrow" style={{marginBottom:12}}>Facial recognition</div>
        <div style={{position:'relative',background:'#10151C',borderRadius:10,aspectRatio:'1/1',overflow:'hidden'}}>
          <svg viewBox="0 0 100 100" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
            <circle cx="50" cy="42" r="24" fill="#2A3340"/>
            <path d="M14 100c0-22 16-36 36-36s36 14 36 36z" fill="#2A3340"/>
          </svg>
          <div style={{position:'absolute',inset:14,border:'1px dashed #3C4654',borderRadius:6}}></div>
          <div style={{position:'absolute',left:'30%',top:'38%',width:8,height:8,border:'1px solid #0073E6'}}></div>
          <div style={{position:'absolute',left:'62%',top:'38%',width:8,height:8,border:'1px solid #0073E6'}}></div>
          <div style={{position:'absolute',left:'46%',top:'54%',width:8,height:8,border:'1px solid #0073E6'}}></div>
        </div>
        <div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between',marginTop:14}}>
          <span style={{fontSize:12,color:'var(--ink-3)',fontWeight:500}}>Gallery match</span>
          <span style={{fontSize:20,fontWeight:700,color:'#16A34A',fontVariantNumeric:'tabular-nums'}}>{D.faceMatch}%</span>
        </div>
        <div style={{height:6,borderRadius:3,background:'var(--line)',marginTop:9,overflow:'hidden'}}><div style={{width:D.faceMatch+'%',height:'100%',background:'#16A34A'}}></div></div>
      </div>
      {/* fingerprints */}
      <div className="card card-pad">
        <div className="eyebrow" style={{marginBottom:12}}>Fingerprints · 10/10</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:7}}>
          {D.prints.map(id=>(
            <div key={id} style={{aspectRatio:'3/4',borderRadius:6,background:'#10151C',display:'flex',alignItems:'flex-end',justifyContent:'center',paddingBottom:4,position:'relative',overflow:'hidden'}}>
              <svg viewBox="0 0 24 30" style={{position:'absolute',inset:3,width:'calc(100% - 6px)',height:'auto',opacity:.5}} fill="none" stroke="#5A6B7C" strokeWidth="1"><path d="M4 14c0-5 3.6-9 8-9s8 4 8 9M7 15c0-3.4 2.2-6 5-6s5 2.6 5 6M10 16c0-1.8 1-3 2-3s2 1.2 2 3"/></svg>
              <span style={{fontSize:7,fontFamily:'ui-monospace,Menlo,monospace',color:'#5C6675',position:'relative'}}>{id}</span>
            </div>
          ))}
        </div>
      </div>
      {/* modalities */}
      <div style={{display:'flex',flexDirection:'column',gap:14}}>
        {D.biometrics.map(b=>(
          <div key={b.name} className="card card-pad">
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:10}}>
              <span style={{fontSize:13.5,fontWeight:600,color:'var(--ink)'}}>{b.name}</span>
              <StatusChip label={b.status} color={b.color}/>
            </div>
            <div className="muted" style={{fontSize:12,marginTop:7,lineHeight:1.4}}>{b.detail}</div>
            <div style={{height:6,borderRadius:3,background:'var(--line)',marginTop:11,overflow:'hidden'}}>
              <div style={{width:b.pct+'%',height:'100%',background:b.color,borderRadius:3}}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- locations ----
function LocationsSection({D, flash}){
  return (
    <div className="card card-pad">
      <SectionHead icon="pin_loc" title="Known locations" sub={`${D.addresses.length} sites`}/>
      <div style={{display:'flex',flexDirection:'column',gap:2}}>
        {D.addresses.map((a,i)=>(
          <div key={i} style={{display:'flex',alignItems:'flex-start',gap:13,padding:'13px 8px',margin:'0 -8px',borderTop:i?'1px solid var(--line)':0}}>
            <span style={{width:34,height:34,borderRadius:9,background:a.statusColor+'18',color:a.statusColor,display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name="pin_loc" size={16}/></span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:'flex',alignItems:'center',gap:9,flexWrap:'wrap'}}>
                <span style={{fontSize:13.5,fontWeight:600,color:'var(--ink)'}}>{a.type}</span>
                <StatusChip label={a.status} color={a.statusColor}/>
              </div>
              <div style={{fontSize:12.5,color:'var(--ink-2)',marginTop:4}}>{a.address}</div>
              <div className="muted" style={{fontSize:11.5,marginTop:3,fontFamily:'ui-monospace,Menlo,monospace'}}>{a.coords} · {a.since}</div>
            </div>
            <button className="btn btn-ghost btn-icon btn-sm" title="Open in map" onClick={()=>flash&&flash('Opening location in map ↗')}><Icon name="map" size={15}/></button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- travel ----
function TravelSection({D}){
  return (
    <div className="card" style={{padding:0,overflow:'hidden'}}>
      <div style={{padding:'16px 20px',borderBottom:'1px solid var(--line)'}}><SectionHead icon="route" title="Travel history" sub={`${D.travel.length} events`}/></div>
      <div style={{display:'grid',gridTemplateColumns:'0.9fr 1fr 1.1fr 1.2fr 0.9fr 1fr',gap:14,padding:'11px 20px',background:'var(--surface-2)',borderBottom:'1px solid var(--line)'}}>
        {['Date','Route','Mode','Document','Confidence','Source'].map(h=><span key={h} className="eyebrow" style={{fontSize:10}}>{h}</span>)}
      </div>
      {D.travel.map((t,i)=>(
        <div key={i} style={{display:'grid',gridTemplateColumns:'0.9fr 1fr 1.1fr 1.2fr 0.9fr 1fr',gap:14,alignItems:'center',padding:'12px 20px',borderTop:i?'1px solid var(--line)':0}}>
          <span style={{fontSize:12.5,color:'var(--ink-2)',fontWeight:550}}>{t.dateLabel}</span>
          <span style={{fontSize:13,fontWeight:600,color:'var(--ink)',display:'flex',alignItems:'center',gap:6}}>{t.from}<Icon name="arrow_right" size={12} style={{color:'var(--ink-4)'}}/>{t.to}</span>
          <span style={{fontSize:12.5,color:'var(--ink-2)'}}>{t.mode}</span>
          <span style={{fontSize:12,color:'var(--ink-2)',fontFamily:'ui-monospace,Menlo,monospace',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{t.doc}{t.flagLabel && <span style={{marginLeft:6,fontFamily:'Inter',color:'#DC2626',fontWeight:600}}>· {t.flagLabel}</span>}</span>
          <span style={{fontSize:12.5,fontWeight:600,color:t.confColor}}>{t.conf}</span>
          <span><SrcTag type={t.srcType} grade={t.srcGrade}/></span>
        </div>
      ))}
    </div>
  );
}

// ---- financial ----
function FinancialSection({D, openEntity}){
  return (
    <div style={{display:'flex',flexDirection:'column',gap:20}}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14}}>
        {D.finStats.map(f=><DossierStat key={f.label} value={f.value} label={f.label} color={f.color}/>)}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',gap:20,alignItems:'start'}}>
        <div className="card card-pad">
          <SectionHead icon="chart" title="Linked accounts"/>
          <div style={{display:'flex',flexDirection:'column',gap:2}}>
            {D.accounts.map((a,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:11,padding:'11px 8px',margin:'0 -8px',borderTop:i?'1px solid var(--line)':0}}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:600,color:'var(--ink)'}}>{a.bank}</div>
                  <div className="muted" style={{fontSize:11.5}}>{a.type} · <span style={{fontFamily:'ui-monospace,Menlo,monospace'}}>{a.number}</span></div>
                </div>
                <StatusChip label={a.status} color={a.statusColor}/>
              </div>
            ))}
          </div>
        </div>
        <div className="card card-pad">
          <SectionHead icon="link" title="Shell / linked entities"/>
          <div style={{display:'flex',flexDirection:'column',gap:2}}>
            {D.shells.map((sh,i)=>(
              <div key={i} onClick={()=>openEntity&&openEntity(sh.orgId)}
                style={{display:'flex',alignItems:'center',gap:11,padding:'11px 8px',margin:'0 -8px',borderTop:i?'1px solid var(--line)':0,cursor:'pointer',borderRadius:8,transition:'.12s'}}
                onMouseEnter={e=>e.currentTarget.style.background='var(--surface-2)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <span style={{width:30,height:30,borderRadius:8,background:'var(--surface-2)',border:'1px solid var(--line)',color:'var(--ink-3)',display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name="collections" size={15}/></span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:600,color:'var(--ink)'}}>{sh.name}</div>
                  <div className="muted" style={{fontSize:11.5}}>{sh.role} · {sh.juris}</div>
                </div>
                <StatusChip label={sh.status} color={sh.statusColor}/>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card" style={{padding:0,overflow:'hidden'}}>
        <div style={{padding:'16px 20px',borderBottom:'1px solid var(--line)'}}><SectionHead icon="history" title="Flagged transactions"/></div>
        <div style={{display:'grid',gridTemplateColumns:'0.9fr 1fr 1fr 0.9fr 0.9fr 1fr',gap:14,padding:'11px 20px',background:'var(--surface-2)',borderBottom:'1px solid var(--line)'}}>
          {['Date','From','To','Amount','Flag','Source'].map(h=><span key={h} className="eyebrow" style={{fontSize:10}}>{h}</span>)}
        </div>
        {D.wires.map((w,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'0.9fr 1fr 1fr 0.9fr 0.9fr 1fr',gap:14,alignItems:'center',padding:'12px 20px',borderTop:i?'1px solid var(--line)':0}}>
            <span style={{fontSize:12.5,color:'var(--ink-2)',fontWeight:550}}>{w.dateLabel}</span>
            <span style={{fontSize:12.5,color:'var(--ink-2)'}}>{w.from}</span>
            <span style={{fontSize:12.5,color:'var(--ink-2)'}}>{w.to}</span>
            <span style={{fontSize:13,fontWeight:700,color:'var(--ink)'}}>{w.amount}</span>
            <span>{w.flagLabel ? <span className="badge" style={{background:'#FEF2F2',color:'#DC2626',height:19,fontSize:10.5}}>{w.flagLabel}</span> : <span className="muted" style={{fontSize:12}}>—</span>}</span>
            <span><SrcTag type={w.srcType} grade={w.srcGrade}/></span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- comms ----
function CommsSection({D}){
  return (
    <div style={{display:'flex',flexDirection:'column',gap:20}}>
      <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',gap:20,alignItems:'start'}}>
        <div className="card card-pad">
          <SectionHead icon="mail" title="Email accounts"/>
          <div style={{display:'flex',flexDirection:'column',gap:2}}>
            {D.emails.map((e,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:11,padding:'11px 8px',margin:'0 -8px',borderTop:i?'1px solid var(--line)':0}}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:12.5,fontWeight:600,color:'var(--ink)',fontFamily:'ui-monospace,Menlo,monospace',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{e.addr}</div>
                  <div className="muted" style={{fontSize:11.5,marginTop:2}}>{e.type}</div>
                </div>
                <StatusChip label={e.status} color={e.statusColor}/>
              </div>
            ))}
          </div>
        </div>
        <div className="card card-pad">
          <SectionHead icon="phone" title="Phone numbers"/>
          <div style={{display:'flex',flexDirection:'column',gap:2}}>
            {D.phones.map((p,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:11,padding:'11px 8px',margin:'0 -8px',borderTop:i?'1px solid var(--line)':0}}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:12.5,fontWeight:600,color:'var(--ink)',fontFamily:'ui-monospace,Menlo,monospace'}}>{p.num}</div>
                  <div className="muted" style={{fontSize:11.5,marginTop:2}}>{p.type} · last {p.lastSeen}</div>
                </div>
                <StatusChip label={p.status} color={p.statusColor}/>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card card-pad">
        <SectionHead icon="message" title="Intercept log"/>
        <div style={{display:'flex',flexDirection:'column',gap:2}}>
          {D.commsLog.map((c,i)=>(
            <div key={i} style={{display:'flex',alignItems:'flex-start',gap:12,padding:'12px 8px',margin:'0 -8px',borderTop:i?'1px solid var(--line)':0}}>
              <span style={{width:30,height:30,borderRadius:8,background:c.color+'18',color:c.color,display:'flex',alignItems:'center',justifyContent:'center',flex:'none',fontSize:10,fontWeight:700}}>{c.kind.slice(0,3).toUpperCase()}</span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,color:'var(--ink-2)',lineHeight:1.5}}>{c.summary}</div>
                <div className="muted" style={{fontSize:11.5,marginTop:4}}>{c.time}</div>
              </div>
              <SrcTag type={c.srcType} grade={c.srcGrade}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- network ----
function NetworkSection({assoc, openEntity}){
  return (
    <div className="card card-pad">
      <SectionHead icon="link" title="Association network" sub={`${assoc.length} linked entities · centered on this subject`}/>
      <div style={{display:'flex',gap:16,flexWrap:'wrap',marginBottom:16}}>
        {Object.entries(LINK_META).map(([k,v])=>(
          <span key={k} style={{display:'inline-flex',alignItems:'center',gap:6,fontSize:11.5,color:'var(--ink-3)',fontWeight:500}}><span style={{width:8,height:8,borderRadius:'50%',background:v.color}}></span>{v.label}</span>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
        {assoc.map(a=>{
          const lm=LINK_META[a.link]||LINK_META.med;
          return (
            <div key={a.id} onClick={()=>openEntity&&openEntity(a.id)}
              style={{display:'flex',alignItems:'center',gap:12,border:'1px solid var(--line)',borderLeft:'3px solid '+lm.color,borderRadius:10,padding:'13px 15px',cursor:'pointer',transition:'.12s'}}
              onMouseEnter={e=>e.currentTarget.style.background='var(--surface-2)'} onMouseLeave={e=>e.currentTarget.style.background='#fff'}>
              <EntAvatar ent={a.ent} size={40}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <span style={{fontSize:13.5,fontWeight:600,color:'var(--ink)'}}>{a.name}</span>
                  <RiskBadge risk={a.ent.risk} sm/>
                </div>
                <div className="muted" style={{fontSize:11.5,marginTop:2}}>{a.role} · {a.ent.id}</div>
              </div>
              <span style={{fontSize:11,fontWeight:600,color:lm.color,whiteSpace:'nowrap'}}>{lm.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---- timeline ----
function TimelineSection({D}){
  return (
    <div className="card card-pad">
      <SectionHead icon="history" title="Case timeline" sub={`${D.timeline.length} events`}/>
      <div style={{display:'flex',flexDirection:'column'}}>
        {D.timeline.map((t,i,arr)=>(
          <div key={i} style={{display:'flex',gap:14,position:'relative'}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',flex:'none',paddingTop:3}}>
              <span style={{width:12,height:12,borderRadius:'50%',background:t.color,boxShadow:'0 0 0 3px '+t.color+'22'}}></span>
              {i<arr.length-1 && <span style={{width:2,flex:1,background:'var(--line)',minHeight:22}}></span>}
            </div>
            <div style={{flex:1,minWidth:0,paddingBottom:i<arr.length-1?18:0}}>
              <div style={{display:'flex',alignItems:'center',gap:9,flexWrap:'wrap'}}>
                <span style={{fontSize:13.5,fontWeight:600,color:'var(--ink)'}}>{t.title}</span>
                <span className="badge" style={{background:t.color+'18',color:t.color,height:18,fontSize:10,fontWeight:700,letterSpacing:'.03em'}}>{t.tag}</span>
                <span className="muted" style={{fontSize:11.5,marginLeft:'auto'}}>{t.dateLabel}</span>
              </div>
              <div className="muted" style={{fontSize:12.5,marginTop:4,lineHeight:1.45}}>{t.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- evidence ----
function EvidenceSection({D, flash}){
  return (
    <div style={{display:'flex',flexDirection:'column',gap:20}}>
      <div style={{display:'flex',alignItems:'center',gap:14,padding:'14px 16px',background:'#F0FDF4',border:'1px solid #C5E2D0',borderRadius:11}}>
        <span style={{width:36,height:36,flex:'none',borderRadius:9,background:'#fff',border:'1px solid #C5E2D0',color:'#1E7A46',display:'flex',alignItems:'center',justifyContent:'center'}}><Icon name="shield_check" size={18}/></span>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:12.5,fontWeight:600,color:'#1F5C50'}}>Exhibits are maintained in the Evidence System</div>
          <div style={{fontSize:11.5,color:'#4C7A6F',marginTop:2}}>The records below are linked references — open one to view full media, hashes and chain of custody.</div>
        </div>
        <span style={{fontSize:11,color:'#4C7A6F',fontFamily:'ui-monospace,Menlo,monospace',flex:'none'}}>{D.evidence.length} linked · sync 10 JUN</span>
      </div>
      <div className="card card-pad">
        <SectionHead icon="files" title="Linked evidence" sub={`${D.evidence.length} exhibits`}/>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14}}>
          {D.evidence.map(e=>(
            <div key={e.exhibit} onClick={()=>flash&&flash('Opening exhibit '+e.exhibit+' ↗')} className="card-hover"
              style={{border:'1px solid var(--line)',borderRadius:11,padding:14,cursor:'pointer',display:'flex',flexDirection:'column',gap:10}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <span style={{width:34,height:34,borderRadius:9,background:'var(--surface-2)',border:'1px solid var(--line)',color:'var(--ink-3)',display:'flex',alignItems:'center',justifyContent:'center'}}><Icon name={e.icon} size={17}/></span>
                <span style={{fontFamily:'ui-monospace,Menlo,monospace',fontSize:11,color:'var(--ink-3)',fontWeight:600}}>{e.exhibit}</span>
              </div>
              <div style={{fontSize:13,fontWeight:600,color:'var(--ink)',lineHeight:1.4}}>{e.title}</div>
              <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
                <span className="badge" style={{background:'var(--surface-2)',color:'var(--ink-3)',border:'1px solid var(--line)',height:18,fontSize:10}}>{e.kind}</span>
                <SrcTag type={e.srcType} grade={e.srcGrade}/>
              </div>
              <div className="muted" style={{fontSize:11.5}}>{e.date} · {e.custody}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- assets (vehicles + seized devices) ----
function AssetsSection({D, flash}){
  return (
    <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',gap:20,alignItems:'start'}}>
      <div className="card card-pad">
        <SectionHead icon="route" title="Vehicles" sub={`${D.vehicles.length} associated`}/>
        <div style={{display:'flex',flexDirection:'column',gap:2}}>
          {D.vehicles.map((v,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 8px',margin:'0 -8px',borderTop:i?'1px solid var(--line)':0}}>
              <span style={{width:38,height:38,borderRadius:9,background:'var(--surface-2)',border:'1px solid var(--line)',color:'var(--ink-3)',display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name="route" size={18}/></span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:600,color:'var(--ink)'}}>{v.make}</div>
                <div style={{display:'flex',alignItems:'center',gap:9,marginTop:5}}>
                  <span style={{fontSize:11.5,fontFamily:'ui-monospace,Menlo,monospace',color:'var(--ink-2)',background:'var(--surface-2)',border:'1px solid var(--line)',padding:'2px 7px',borderRadius:4}}>{v.country} · {v.plate}</span>
                  <span className="muted" style={{fontSize:11}}>{v.detail}</span>
                </div>
              </div>
              <StatusChip label={v.status} color={v.statusColor}/>
            </div>
          ))}
        </div>
      </div>
      <div className="card card-pad">
        <SectionHead icon="cpu" title="Seized devices" sub={`${D.devices.length} in evidence`}/>
        <div style={{display:'flex',flexDirection:'column',gap:2}}>
          {D.devices.map((d,i)=>(
            <div key={i} onClick={()=>flash&&flash('Opening device '+d.exhibit+' ↗')}
              style={{display:'flex',alignItems:'center',gap:12,padding:'12px 8px',margin:'0 -8px',borderTop:i?'1px solid var(--line)':0,cursor:'pointer',borderRadius:8,transition:'.12s'}}
              onMouseEnter={e=>e.currentTarget.style.background='var(--surface-2)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              <span style={{width:36,height:36,borderRadius:9,background:'var(--surface-2)',border:'1px solid var(--line)',color:'var(--ink-3)',display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name="phone" size={17}/></span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}><span style={{fontSize:13,fontWeight:600,color:'var(--ink)'}}>{d.type}</span><span style={{fontFamily:'ui-monospace,Menlo,monospace',fontSize:10.5,color:'var(--ink-3)'}}>{d.exhibit}</span></div>
                <div className="muted" style={{fontSize:11.5,marginTop:3,fontFamily:'ui-monospace,Menlo,monospace'}}>{d.ident}</div>
              </div>
              <StatusChip label={d.status} color={d.statusColor}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- pattern of life ----
function PatternOfLifeSection({D}){
  const P = D.patternOfLife;
  const maxWeight = Math.max(...P.locations.map(l=>l.revisits));
  return (
    <div style={{display:'flex',flexDirection:'column',gap:18}}>
      <div className="muted" style={{fontSize:13}}>{P.window}</div>
      {/* anchors */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
        {P.anchors.map(a=>(
          <div key={a.name} className="card" style={{borderLeft:'3px solid '+a.color,padding:'17px 18px'}}>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <span style={{width:30,height:30,flex:'none',borderRadius:8,background:a.color+'1a',color:a.color,display:'flex',alignItems:'center',justifyContent:'center'}}><Icon name={a.icon} size={16}/></span>
              <span className="eyebrow">{a.label}</span>
            </div>
            <div style={{fontSize:16,fontWeight:700,color:'var(--ink)',marginTop:13,letterSpacing:'-.01em'}}>{a.name}</div>
            <div className="muted" style={{fontSize:11.5,marginTop:5}}>{a.sub}</div>
            <div style={{display:'flex',gap:22,marginTop:15,paddingTop:13,borderTop:'1px solid var(--line)'}}>
              <div><div style={{fontSize:18,fontWeight:700,color:'var(--ink)',fontVariantNumeric:'tabular-nums'}}>{a.revisits}</div><div className="eyebrow" style={{marginTop:5,fontSize:9.5}}>Revisits</div></div>
              <div><div style={{fontSize:18,fontWeight:700,color:'var(--ink)',fontVariantNumeric:'tabular-nums'}}>{a.dwell}</div><div className="eyebrow" style={{marginTop:5,fontSize:9.5}}>Total dwell</div></div>
              <div><div style={{fontSize:18,fontWeight:700,color:a.color}}>{a.conf}</div><div className="eyebrow" style={{marginTop:5,fontSize:9.5}}>Confidence</div></div>
            </div>
          </div>
        ))}
      </div>
      {/* daily rhythm + analysis */}
      <div style={{display:'grid',gridTemplateColumns:'1.4fr 1fr',gap:18,alignItems:'start'}}>
        <div className="card card-pad">
          <SectionHead icon="clock" title="Daily rhythm" sub="typical 24h"/>
          <div style={{display:'flex',height:40,borderRadius:8,overflow:'hidden',border:'1px solid var(--line)'}}>
            {P.dayBands.map((b,i)=>(
              <div key={i} style={{flex:b.hours,background:b.color,display:'flex',alignItems:'center',justifyContent:'center'}}><span style={{fontSize:9,fontWeight:600,color:'#fff',opacity:.95}}>{b.label}</span></div>
            ))}
          </div>
          <div style={{display:'flex',justifyContent:'space-between',marginTop:8}}>
            {['00','06','12','18','24'].map(h=><span key={h} style={{fontSize:10,fontFamily:'ui-monospace,Menlo,monospace',color:'var(--ink-3)'}}>{h}</span>)}
          </div>
          <div style={{display:'flex',flexWrap:'wrap',gap:14,marginTop:16}}>
            {P.legend.map(l=><span key={l.label} style={{display:'inline-flex',alignItems:'center',gap:6,fontSize:11.5,color:'var(--ink-3)',fontWeight:500}}><span style={{width:8,height:8,borderRadius:'50%',background:l.color}}></span>{l.label}</span>)}
          </div>
        </div>
        <div className="card card-pad">
          <SectionHead icon="pulse" title="Pattern analysis"/>
          <div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between'}}>
            <span style={{fontSize:12.5,color:'var(--ink-2)'}}>Predictability index</span>
            <span style={{fontSize:16,fontWeight:700,color:'#16A34A'}}>{P.predictability}%</span>
          </div>
          <div style={{height:7,borderRadius:4,background:'var(--line)',marginTop:9,overflow:'hidden'}}><div style={{width:P.predictability+'%',height:'100%',background:'#16A34A'}}></div></div>
          <div className="eyebrow" style={{margin:'18px 0 9px'}}>Pattern anomalies</div>
          {P.anomalies.map((a,i)=>(
            <div key={i} style={{display:'flex',gap:10,padding:'9px 0',borderTop:i?'1px solid var(--line)':0}}>
              <span style={{width:7,height:7,borderRadius:'50%',flex:'none',marginTop:5,background:'#DC2626'}}></span>
              <div><div style={{fontSize:12.5,color:'var(--ink-2)',lineHeight:1.4}}>{a.text}</div><div className="muted" style={{fontSize:10.5,marginTop:3,fontFamily:'ui-monospace,Menlo,monospace'}}>{a.date}</div></div>
            </div>
          ))}
          <div className="eyebrow" style={{margin:'16px 0 9px'}}>Fused sources</div>
          <div style={{display:'flex',gap:7,flexWrap:'wrap'}}>
            {P.sources.map(s=><span key={s} className="badge" style={{background:'var(--surface-2)',color:'var(--ink-2)',border:'1px solid var(--line)',height:24}}>{s}</span>)}
          </div>
        </div>
      </div>
      {/* location significance */}
      <div className="card" style={{padding:0,overflow:'hidden'}}>
        <div style={{padding:'15px 20px',borderBottom:'1px solid var(--line)',display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
          <SectionHead icon="pin_loc" title="Location significance"/>
          <span className="muted" style={{fontSize:11.5}}>ranked by pattern weight (revisits × dwell)</span>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1.9fr 0.9fr 0.7fr 0.7fr 1.2fr 0.7fr 0.7fr',gap:14,padding:'11px 20px',background:'var(--surface-2)',borderBottom:'1px solid var(--line)'}}>
          {['Location','Type','Revisits','Dwell','Typical window','Last','Conf.'].map(h=><span key={h} className="eyebrow" style={{fontSize:10}}>{h}</span>)}
        </div>
        {P.locations.map((l,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'1.9fr 0.9fr 0.7fr 0.7fr 1.2fr 0.7fr 0.7fr',gap:14,alignItems:'center',padding:'12px 20px',borderTop:i?'1px solid var(--line)':0}}>
            <div style={{display:'flex',alignItems:'center',gap:11,minWidth:0}}>
              <span style={{width:10,height:10,borderRadius:'50%',flex:'none',background:l.color}}></span>
              <div style={{minWidth:0}}><div style={{fontSize:13,fontWeight:600,color:'var(--ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{l.name}</div><div className="muted" style={{fontSize:10.5}}>{l.area}</div></div>
            </div>
            <span style={{fontSize:11,fontWeight:600,color:l.color,textTransform:'uppercase',letterSpacing:'.03em'}}>{l.type}</span>
            <span style={{fontSize:13,fontWeight:700,color:'var(--ink)',fontVariantNumeric:'tabular-nums'}}>{l.revisits}</span>
            <span style={{fontSize:12,color:'var(--ink-2)',fontFamily:'ui-monospace,Menlo,monospace'}}>{l.dwell}</span>
            <span style={{fontSize:12,color:'var(--ink-2)'}}>{l.window}</span>
            <span style={{fontSize:11.5,color:'var(--ink-3)',fontFamily:'ui-monospace,Menlo,monospace'}}>{l.last}</span>
            <span style={{fontSize:11,fontWeight:600,color:l.confColor,textTransform:'uppercase'}}>{l.conf}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- co-travel ----
const CO_SIG = {Flight:'#0073E6', Cell:'#7A4FB5', ALPR:'#0E7C9E', CCTV:'#475569'};
const CO_SIGNAME = {Flight:'Flights / PNR', Cell:'Cell co-location', ALPR:'ALPR', CCTV:'CCTV / surveillance'};
const CO_BAND = {'Always together':{color:'#DC2626',bg:'#FEF2F2'}, 'Frequent':{color:'#B5851C',bg:'#FFFBEB'}, 'Occasional':{color:'#64748B',bg:'#F1F5F9'}};
function CoTravelSection({D, openEntity}){
  const list = D.coTravelers;
  const [selId,setSelId] = React.useState(list[0].id);
  const sel = list.find(c=>c.id===selId) || list[0];
  const selEnt = SUBJ_BY_ID[sel.id];
  const sigMax = Math.max(...Object.values(sel.sig));
  const legend = [['Flight','Flights / PNR'],['Cell','Cell co-location'],['ALPR','ALPR'],['CCTV','CCTV / surveillance']];
  return (
    <div style={{display:'flex',flexDirection:'column',gap:18}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:16,flexWrap:'wrap'}}>
        <span className="muted" style={{fontSize:13,maxWidth:640}}>Subjects repeatedly co-located with this subject across travel, cell, ALPR and surveillance data — ranked by co-occurrence strength over a 120-day window.</span>
        <div style={{display:'flex',gap:14,flexWrap:'wrap'}}>
          {legend.map(([k,lb])=><span key={k} style={{display:'inline-flex',alignItems:'center',gap:6,fontSize:11,color:'var(--ink-3)',fontWeight:500}}><span style={{width:9,height:9,borderRadius:3,background:CO_SIG[k]}}></span>{lb}</span>)}
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
        {D.coStats.map(s=><DossierStat key={s.label} value={s.value} label={s.label+' · '+s.sub} color={s.color}/>)}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1.1fr 1fr',gap:18,alignItems:'start'}}>
        {/* ranked list */}
        <div className="card" style={{padding:0,overflow:'hidden'}}>
          <div style={{padding:'14px 18px',borderBottom:'1px solid var(--line)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <span className="eyebrow">Ranked co-travelers</span>
            <span className="muted" style={{fontSize:11}}>select to inspect shared movements</span>
          </div>
          <div style={{padding:12,display:'flex',flexDirection:'column',gap:10}}>
            {list.map(ct=>{
              const ent = SUBJ_BY_ID[ct.id], bm = CO_BAND[ct.band]||CO_BAND.Occasional, on = selId===ct.id;
              return (
                <button key={ct.id} onClick={()=>setSelId(ct.id)} style={{textAlign:'left',border:'1px solid '+(on?'var(--blue)':'var(--line)'),background:on?'#F5F8FF':'#fff',borderRadius:10,padding:'13px 15px',cursor:'pointer',boxShadow:on?'0 0 0 1px var(--blue)':'none',transition:'.12s'}}>
                  <div style={{display:'flex',alignItems:'center',gap:12}}>
                    <EntAvatar ent={ent} size={40}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
                        <span style={{fontSize:14,fontWeight:600,color:'var(--ink)'}}>{ent.name}</span>
                        <span className="badge" style={{background:bm.bg,color:bm.color,height:18,fontSize:10,fontWeight:600}}>{ct.band}</span>
                      </div>
                      <div className="muted" style={{fontSize:11,marginTop:4,fontFamily:'ui-monospace,Menlo,monospace'}}>{ct.id} · {ct.events} shared events · last {ct.last}</div>
                    </div>
                    <div style={{flex:'none',textAlign:'right'}}><div style={{fontSize:19,fontWeight:700,color:bm.color,fontVariantNumeric:'tabular-nums'}}>{ct.score}</div><div className="eyebrow" style={{marginTop:3,fontSize:9}}>score</div></div>
                  </div>
                  <div style={{marginTop:12}}>
                    <div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between',marginBottom:6}}>
                      <span className="eyebrow">Co-occurrence</span>
                      <span style={{fontSize:11,fontWeight:600,color:'var(--ink-2)',fontFamily:'ui-monospace,Menlo,monospace'}}>{ct.corr}% · {ct.coWith}</span>
                    </div>
                    <div style={{height:6,borderRadius:3,background:'var(--line)',overflow:'hidden'}}><div style={{width:ct.corr+'%',height:'100%',background:bm.color}}></div></div>
                  </div>
                  <div style={{display:'flex',gap:7,marginTop:11,flexWrap:'wrap'}}>
                    {Object.keys(ct.sig).map(k=><span key={k} style={{display:'inline-flex',alignItems:'center',gap:6,fontSize:10.5,fontFamily:'ui-monospace,Menlo,monospace',fontWeight:600,color:CO_SIG[k],background:CO_SIG[k]+'1a',padding:'5px 9px',borderRadius:6}}><span style={{width:7,height:7,borderRadius:2,background:CO_SIG[k]}}></span>{k} {ct.sig[k]}</span>)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        {/* selected detail */}
        <div className="card" style={{padding:0,overflow:'hidden',alignSelf:'start'}}>
          <div style={{padding:'16px 18px',borderBottom:'1px solid var(--line)',display:'flex',alignItems:'center',gap:13}}>
            <EntAvatar ent={selEnt} size={42}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:'flex',alignItems:'center',gap:9}}><span style={{fontSize:16,fontWeight:700,color:'var(--ink)'}}>{selEnt.name}</span><RiskBadge risk={selEnt.risk} sm/></div>
              <div className="muted" style={{fontSize:11.5,marginTop:4}}>Co-located on {sel.coWith} ({sel.corr}%)</div>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={()=>openEntity&&openEntity(sel.id)} style={{flex:'none'}}>Open<Icon name="chevron_right" size={14}/></button>
          </div>
          {sel.note && <div style={{margin:'14px 18px 0',padding:'10px 13px',background:'#FFFBEB',border:'1px solid #EBD9B8',borderRadius:8,fontSize:11.5,color:'#8A6312',lineHeight:1.4}}>{sel.note}</div>}
          <div style={{padding:'16px 18px 6px'}}>
            <div className="eyebrow" style={{marginBottom:12}}>Evidence mix</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:13}}>
              {Object.keys(sel.sig).map(k=>(
                <div key={k}>
                  <div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between'}}><span style={{fontSize:11,color:'var(--ink-2)'}}>{CO_SIGNAME[k]}</span><span style={{fontSize:12,fontWeight:600,color:CO_SIG[k],fontFamily:'ui-monospace,Menlo,monospace'}}>{sel.sig[k]}</span></div>
                  <div style={{height:6,borderRadius:3,background:'var(--line)',marginTop:6,overflow:'hidden'}}><div style={{width:Math.round(sel.sig[k]/sigMax*100)+'%',height:'100%',background:CO_SIG[k]}}></div></div>
                </div>
              ))}
            </div>
          </div>
          <div style={{padding:'6px 18px 16px'}}>
            <div className="eyebrow" style={{margin:'12px 0 8px'}}>Shared movements</div>
            {sel.timeline.map((t,i)=>(
              <div key={i} style={{display:'flex',gap:13,padding:'11px 0',borderTop:i?'1px solid var(--line)':0}}>
                <div style={{flex:'none',width:52,fontSize:11,fontFamily:'ui-monospace,Menlo,monospace',color:'var(--ink-3)'}}>{t.date}</div>
                <div style={{flex:'none',display:'flex',flexDirection:'column',alignItems:'center',paddingTop:3}}>
                  <span style={{width:9,height:9,borderRadius:2,background:CO_SIG[t.type]||'#94A3B8'}}></span>
                  {i<sel.timeline.length-1 && <span style={{flex:1,width:2,background:'var(--line)',marginTop:4,minHeight:14}}></span>}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}><span style={{fontSize:12.5,fontWeight:600,color:'var(--ink)'}}>{t.place}</span><span className="badge" style={{background:(CO_SIG[t.type]||'#94A3B8')+'1a',color:CO_SIG[t.type]||'#94A3B8',height:17,fontSize:10}}>{t.type}</span></div>
                  <div className="muted" style={{fontSize:10.5,marginTop:4}}>{t.source} · {t.delta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- cases ----
function CasesSection({D}){
  return (
    <div style={{display:'grid',gridTemplateColumns:'1.4fr 1fr',gap:18,alignItems:'start'}}>
      <div style={{display:'flex',flexDirection:'column',gap:14}}>
        {D.linkedCases.map(c=>(
          <div key={c.id} className="card card-hover" style={{padding:18,display:'flex',gap:16,alignItems:'center'}}>
            <span style={{width:46,height:46,flex:'none',borderRadius:10,background:'var(--surface-2)',border:'1px solid var(--line)',color:'var(--ink-3)',display:'flex',alignItems:'center',justifyContent:'center'}}><Icon name="gavel" size={22}/></span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <span style={{fontSize:11,fontFamily:'ui-monospace,Menlo,monospace',color:'var(--ink-3)',fontWeight:600}}>CASE {c.id}</span>
                {c.role==='Primary subject' && <span className="badge" style={{background:'var(--blue-t)',color:'var(--blue)',height:17,fontSize:9.5,fontWeight:700,letterSpacing:'.05em'}}>PRIMARY</span>}
              </div>
              <div style={{fontSize:15,fontWeight:700,color:'var(--ink)',marginTop:7,letterSpacing:'-.01em'}}>{c.name}</div>
              <div className="muted" style={{fontSize:11.5,marginTop:5}}>{c.role} · {c.opened}</div>
            </div>
            <span style={{display:'inline-flex',alignItems:'center',gap:7,fontSize:11,fontWeight:600,color:c.statusColor}}><span style={{width:7,height:7,borderRadius:'50%',background:c.statusColor}}></span>{c.status}</span>
          </div>
        ))}
      </div>
      <div className="card card-pad">
        <SectionHead icon="link" title="Cross-case overlap"/>
        <div style={{display:'flex',flexDirection:'column',gap:2}}>
          {D.crossOverlap.map((co,i)=>(
            <div key={i} style={{padding:'14px 8px',margin:'0 -8px',borderTop:i?'1px solid var(--line)':0}}>
              <div style={{fontSize:11,fontWeight:600,color:'var(--blue)',fontFamily:'ui-monospace,Menlo,monospace'}}>↔ CASE {co.caseId}</div>
              <div style={{fontSize:13,color:'var(--ink)',fontWeight:550,marginTop:8}}>{co.detail}</div>
              <div className="muted" style={{fontSize:11.5,marginTop:4}}>{co.extra}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- tasking ----
function TaskingSection({D, flash}){
  const [draft,setDraft] = React.useState('');
  const [notes,setNotes] = React.useState(D.notes);
  function post(){
    const t = draft.trim(); if(!t) return;
    setNotes(n=>[{who:'J. Renner', time:'17 JUN '+new Date().toTimeString().slice(0,5), text:t, mine:true}, ...n]);
    setDraft(''); flash&&flash('Note posted');
  }
  const ini = who => (who.match(/[A-Z]/g)||['?']).slice(0,2).join('');
  return (
    <div style={{display:'grid',gridTemplateColumns:'1.5fr 1fr',gap:18,alignItems:'start'}}>
      <div style={{display:'flex',flexDirection:'column',gap:18}}>
        <div className="card card-pad">
          <SectionHead icon="check_square" title="Open leads & tasks" sub={`${D.tasks.length} items`}/>
          <div style={{display:'flex',flexDirection:'column',gap:2}}>
            {D.tasks.map((t,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:13,padding:'12px 8px',margin:'0 -8px',borderTop:i?'1px solid var(--line)':0}}>
                <span style={{width:9,height:9,borderRadius:'50%',flex:'none',background:t.statusColor}}></span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:550,color:'var(--ink)'}}>{t.title}</div>
                  <div className="muted" style={{fontSize:11,marginTop:4}}>{t.assignee} · {t.due}</div>
                </div>
                <StatusChip label={t.status} color={t.statusColor}/>
              </div>
            ))}
          </div>
        </div>
        <div className="card card-pad">
          <SectionHead icon="comment" title="Analyst notes"/>
          <textarea value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Add an analyst note…"
            style={{width:'100%',minHeight:62,resize:'vertical',border:'1px solid var(--line-2)',borderRadius:8,padding:'11px 13px',fontSize:12.5,lineHeight:1.5,fontFamily:'inherit',color:'var(--ink)',outline:'none',boxSizing:'border-box'}}/>
          <div style={{display:'flex',justifyContent:'flex-end',marginTop:10}}>
            <button className="btn btn-primary btn-sm" onClick={post} disabled={!draft.trim()} style={draft.trim()?{}:{opacity:.5,pointerEvents:'none'}}>Post note</button>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:2,marginTop:8}}>
            {notes.map((n,i)=>(
              <div key={i} style={{display:'flex',gap:13,padding:'13px 8px',margin:'0 -8px',borderTop:'1px solid var(--line)'}}>
                <span style={{width:32,height:32,flex:'none',borderRadius:'50%',background:n.mine?'#0073E6':'#475569',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700}}>{ini(n.who)}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:'flex',alignItems:'center',gap:9}}><span style={{fontSize:12,fontWeight:600,color:'var(--ink)'}}>{n.who}</span><span className="muted" style={{fontSize:10,fontFamily:'ui-monospace,Menlo,monospace'}}>{n.time}</span></div>
                  <div style={{fontSize:12.5,color:'var(--ink-2)',marginTop:5,lineHeight:1.5}}>{n.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card card-pad">
        <SectionHead icon="users" title="Assigned team"/>
        <div style={{display:'flex',flexDirection:'column',gap:2}}>
          {D.team.map((tm,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:13,padding:'12px 8px',margin:'0 -8px',borderTop:i?'1px solid var(--line)':0}}>
              <span style={{width:38,height:38,flex:'none',borderRadius:'50%',background:tm.bg,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700}}>{tm.initials}</span>
              <div><div style={{fontSize:13,fontWeight:600,color:'var(--ink)'}}>{tm.name}</div><div className="muted" style={{fontSize:11,marginTop:3}}>{tm.role}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- passport thumbnail ----
function PassportThumb({doc}){
  if(!doc.scan) return (
    <span title="No scan on file" style={{width:30,height:38,flex:'none',borderRadius:4,border:'1px dashed var(--line-2)',background:'var(--surface-2)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--ink-4)'}}><Icon name="file" size={14}/></span>
  );
  return (
    <span title="View scan" style={{position:'relative',width:30,height:38,flex:'none',borderRadius:4,border:'1px solid rgba(0,0,0,.22)',background:doc.cover,boxShadow:'0 1px 3px rgba(15,20,27,.18)',overflow:'hidden',display:'block'}}>
      <span style={{position:'absolute',left:'50%',top:9,transform:'translateX(-50%)',width:9,height:9,borderRadius:'50%',border:'1px solid rgba(214,188,120,.85)'}}></span>
      <span style={{position:'absolute',left:5,right:5,bottom:11,height:2,borderRadius:1,background:'rgba(214,188,120,.55)'}}></span>
      <span style={{position:'absolute',left:5,right:5,bottom:6,height:2,borderRadius:1,background:'rgba(214,188,120,.38)'}}></span>
    </span>
  );
}

// ===================== Organization profile =====================
function OrgProfile({id, setPage, openEntity, flash}){
  const o = ORG_BY_ID[id] || ORGS[0];
  const m = riskMeta(o.risk);
  const cs = CASES[o.caseId];
  const people = o.people.map(pid=>SUBJ_BY_ID[pid]).filter(Boolean);

  const main = (
    <div style={{display:'flex',flexDirection:'column',gap:20,minWidth:0}}>
      <div className="card card-pad">
        <SectionHead icon="shield" title="Assessment" sub={cs?cs.op:'—'}/>
        <p style={{fontSize:13.5,lineHeight:1.65,color:'var(--ink-2)',margin:0,textWrap:'pretty'}}>{o.note}</p>
      </div>
      {o.people.length>0 && (
        <div className="card card-pad">
          <SectionHead icon="users" title="Linked people" sub={`${people.length} subjects`}/>
          <div style={{display:'flex',flexDirection:'column',gap:2}}>
            {people.map((p,i)=>(
              <div key={p.id} onClick={()=>openEntity&&openEntity(p.id)}
                style={{display:'flex',alignItems:'center',gap:12,padding:'10px 8px',margin:'0 -8px',borderTop:i?'1px solid var(--line)':0,cursor:'pointer',borderRadius:8,transition:'.12s'}}
                onMouseEnter={e=>e.currentTarget.style.background='var(--surface-2)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <EntAvatar ent={p} size={34}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13.5,fontWeight:600,color:'var(--ink)'}}>{p.name}</div>
                  <div className="muted" style={{fontSize:11.5}}>{p.role} · {p.id}</div>
                </div>
                <RiskBadge risk={p.risk} sm/>
                <Icon name="chevron_right" size={15} style={{color:'var(--ink-4)',flex:'none'}}/>
              </div>
            ))}
          </div>
        </div>
      )}
      {o.accounts.length>0 && (
        <div className="card card-pad">
          <SectionHead icon="chart" title="Accounts"/>
          <div style={{display:'flex',flexDirection:'column',gap:2}}>
            {o.accounts.map((a,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:11,padding:'11px 8px',margin:'0 -8px',borderTop:i?'1px solid var(--line)':0}}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:600,color:'var(--ink)'}}>{a.bank}</div>
                  <div className="muted" style={{fontSize:11.5,fontFamily:'ui-monospace,Menlo,monospace'}}>{a.num}</div>
                </div>
                <StatusChip label={a.status} color={a.statusColor}/>
              </div>
            ))}
          </div>
        </div>
      )}
      {o.flows.length>0 && (
        <div className="card card-pad">
          <SectionHead icon="history" title="Financial flows"/>
          <div style={{display:'flex',flexDirection:'column',gap:2}}>
            {o.flows.map((fl,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'11px 8px',margin:'0 -8px',borderTop:i?'1px solid var(--line)':0}}>
                <span style={{fontSize:12,color:'var(--ink-3)',width:60,flex:'none',fontWeight:550}}>{fl.date}</span>
                <span style={{flex:1,fontSize:12.5,color:'var(--ink-2)'}}>{fl.cp}</span>
                <span style={{fontSize:13,fontWeight:700,color:'var(--ink)'}}>{fl.amount}</span>
                {fl.flag && <span className="badge" style={{background:'#FEF2F2',color:'#DC2626',height:19,fontSize:10.5}}>{fl.flag}</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const side = (
    <div className="card card-pad">
      <div className="eyebrow" style={{marginBottom:11}}>Registration</div>
      <InfoRows rows={[
        ['Entity ID', o.id],
        ['Type', o.type],
        ['Jurisdiction', o.juris],
        ['Registration', o.reg],
        ['Incorporated', o.incorporated],
        ['Role', o.role],
        ['Status', o.status],
      ]}/>
    </div>
  );

  return (
    <div className="rise">
      <div style={{borderBottom:'1px solid var(--line)',background:'rgba(255,255,255,.65)',backdropFilter:'blur(4px)'}}>
        <div className="page" style={{paddingTop:16,paddingBottom:20}}>
          <div style={{display:'flex',alignItems:'center',gap:7,fontSize:12.5,color:'var(--ink-3)',fontWeight:500,marginBottom:16}}>
            <span style={{cursor:'pointer'}} onClick={()=>setPage('dashboard')}>Home</span>
            <Icon name="chevron_right" size={13} style={{opacity:.6}}/>
            <span style={{cursor:'pointer'}} onClick={()=>setPage('explore')}>Entities</span>
            <Icon name="chevron_right" size={13} style={{opacity:.6}}/>
            <span style={{color:'var(--ink-2)',fontFamily:'ui-monospace,Menlo,monospace'}}>{o.id}</span>
          </div>
          <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:20,flexWrap:'wrap'}}>
            <div style={{display:'flex',alignItems:'center',gap:18,minWidth:0}}>
              <EntAvatar ent={o} size={64} square/>
              <div style={{minWidth:0}}>
                <div style={{display:'flex',alignItems:'center',gap:11,flexWrap:'wrap'}}>
                  <h1 style={{fontSize:24,fontWeight:700,letterSpacing:'-.03em',margin:0,color:'var(--ink)'}}>{o.name}</h1>
                  <RiskBadge risk={o.risk}/>
                </div>
                <div style={{fontSize:13.5,color:'var(--ink-2)',fontWeight:550,marginTop:6}}>{o.type} · {o.role}</div>
                <div style={{display:'flex',alignItems:'center',gap:9,marginTop:7,fontSize:12.5,color:'var(--ink-3)',flexWrap:'wrap'}}>
                  <span style={{display:'flex',alignItems:'center',gap:5}}><Icon name="pin_loc" size={13}/>{o.juris}</span>
                  <span style={{width:3,height:3,borderRadius:'50%',background:'var(--ink-4)'}}></span>
                  <span>{o.status}</span>
                  {cs && <><span style={{width:3,height:3,borderRadius:'50%',background:'var(--ink-4)'}}></span><span style={{display:'inline-flex',alignItems:'center',gap:5}}><span style={{width:6,height:6,borderRadius:'50%',background:cs.dot}}></span>{cs.op}</span></>}
                </div>
              </div>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={()=>flash&&flash('Generating entity report…')}><Icon name="file" size={15}/>Report</button>
          </div>
        </div>
      </div>
      <div className="page" style={{paddingTop:24}}><TwoCol main={main} side={side}/></div>
    </div>
  );
}

// ===================== router =====================
function EntityProfile({id, setPage, openEntity, flash}){
  if(isOrgId(id)) return <OrgProfile id={id} setPage={setPage} openEntity={openEntity} flash={flash}/>;
  return <SubjectDossier id={id} setPage={setPage} openEntity={openEntity} flash={flash}/>;
}

Object.assign(window, { DOSSIERS, EntityProfile, SubjectDossier, OrgProfile });
