// entities.jsx — Subject Registry ("Entities"): forensic subjects + organizations
// Ported from the Sentinel forensic-intelligence dataset, restyled to the IMIN design system.

// ---- risk tiers (mapped to IMIN palette) ----
const RISK = {
  Critical: {label:'Critical', color:'#DC2626', tint:'#FEF2F2', rank:0},
  Elevated: {label:'Elevated', color:'#B5851C', tint:'#FFFBEB', rank:1},
  Moderate: {label:'Moderate', color:'#0073E6', tint:'#EBF4FF', rank:2},
  Cleared:  {label:'Cleared',  color:'#16A34A', tint:'#F0FDF4', rank:3},
};
function riskMeta(r){ return RISK[r] || RISK.Moderate; }

// ---- intelligence source disciplines ----
const SRC = {
  HUMINT:  {color:'#B5851C', label:'HUMINT'},
  SIGINT:  {color:'#0073E6', label:'SIGINT'},
  OSINT:   {color:'#16A34A', label:'OSINT'},
  FININT:  {color:'#475569', label:'FININT'},
  IMINT:   {color:'#0EA5E9', label:'IMINT'},
  FORENSIC:{color:'#0E7C9E', label:'FORENSIC'},
};
function SrcTag({type, grade}){
  const s = SRC[type] || {color:'#64748B', label:type};
  return (
    <span title={`${s.label} · confidence ${grade}`} style={{display:'inline-flex',alignItems:'center',gap:5,height:19,padding:'0 7px',borderRadius:5,
      fontFamily:'ui-monospace,Menlo,monospace',fontSize:10,fontWeight:600,letterSpacing:'.02em',color:s.color,background:s.color+'14',border:'1px solid '+s.color+'2e',flex:'none'}}>
      {s.label} · {grade}
    </span>
  );
}
function src(type, grade){ return {srcType:type, srcGrade:grade}; }

// ---- cases / operations ----
const CASES = {
  '22-1187': {op:'Operation Meridian',  short:'Meridian',  dot:'#B5851C'},
  '21-0934': {op:'Operation Tideway',   short:'Tideway',   dot:'#DC2626'},
  '23-0461': {op:'Operation Northgate', short:'Northgate', dot:'#0073E6'},
};

// ---- subject registry ----
const SUBJECTS = [
  {id:'SBJ-4471-K', caseId:'22-1187', name:'Marcus A. Delacroix', alias:'Marc Devon', aliases:['Marc Devon','M. Croft','“The Broker”'], nat:'France / Canada', dob:'19 Mar 1984 (42)', risk:'Elevated', status:'Active Surveillance', lastSeen:'09 JUN', initials:'MD', role:'Import/export consultant (cover)'},
  {id:'SBJ-0098-S', caseId:'22-1187', name:'Dimitri Sokolov', alias:'D. Sokol', aliases:['D. Sokol'], nat:'Russia', risk:'Critical', status:'Wanted', lastSeen:'30 MAY', initials:'DS', role:'Logistics principal'},
  {id:'SBJ-2210-V', caseId:'22-1187', name:'Lena Voss', alias:'L. Engel', aliases:['L. Engel'], nat:'Germany', risk:'Elevated', status:'Under Investigation', lastSeen:'07 JUN', initials:'LV', role:'Financier'},
  {id:'SBJ-1144-R', caseId:'22-1187', name:'Anton Reyes', alias:'Toni R.', aliases:['Toni R.'], nat:'Spain', risk:'Moderate', status:'Surveillance', lastSeen:'02 JUN', initials:'AR', role:'Courier'},
  {id:'SBJ-5560-B', caseId:'22-1187', name:'Claire Beaumont', alias:'C. Roux', aliases:['C. Roux'], nat:'France', risk:'Cleared', status:'Cleared', lastSeen:'08 JUN', initials:'CB', role:'Domestic partner'},
  {id:'SBJ-3372-D', caseId:'21-0934', name:'Yusuf Demir', alias:'Y. Demir', aliases:['Y. Demir'], nat:'Türkiye', risk:'Moderate', status:'Person of Interest', lastSeen:'31 MAY', initials:'YD', role:'Facilitator'},
  {id:'SBJ-6603-K', caseId:'21-0934', name:'Karim Haddad', alias:'K. Haddad', aliases:['K. Haddad'], nat:'Lebanon', risk:'Critical', status:'Wanted', lastSeen:'18 APR', initials:'KH', role:'Broker'},
  {id:'SBJ-8120-O', caseId:'21-0934', name:'Sabri Öz', alias:'S. Oz', aliases:['S. Oz'], nat:'Türkiye', risk:'Elevated', status:'Under Investigation', lastSeen:'06 JUN', initials:'SÖ', role:'Logistics facilitation'},
  {id:'SBJ-8205-K', caseId:'21-0934', name:'Nadia Khoury', alias:'N. Khoury', aliases:['N. Khoury'], nat:'Lebanon', risk:'Moderate', status:'Person of Interest', lastSeen:'03 JUN', initials:'NK', role:'Associate'},
  {id:'SBJ-9011-P', caseId:'23-0461', name:'Viktor Petrov', alias:'V. Petroff', aliases:['V. Petroff'], nat:'Russia', risk:'Critical', status:'Wanted', lastSeen:'12 JUN', initials:'VP', role:'Port operations'},
  {id:'SBJ-9043-C', caseId:'23-0461', name:'Elena Costa', alias:'E. Costa', aliases:['E. Costa'], nat:'Italy', risk:'Moderate', status:'Surveillance', lastSeen:'10 JUN', initials:'EC', role:'Associate'},
  {id:'SBJ-7781-M', caseId:'23-0461', name:'Helena Marsh', alias:'H. Marsh', aliases:['H. Marsh'], nat:'United Kingdom', risk:'Cleared', status:'Cleared', lastSeen:'20 MAY', initials:'HM', role:'Attorney'},
];

// ---- organizations ----
const ORGS = [
  {id:'ORG-0092', name:'Meridian Logistics SARL', type:'Front company', juris:'France · Lyon', reg:'RCS Lyon 814 092 551', incorporated:'Mar 2019', status:'Confirmed conduit', risk:'Critical', caseId:'22-1187', role:'Cover employer / primary financial conduit', initials:'ML', people:['SBJ-4471-K','SBJ-2210-V','SBJ-1144-R'],
    accounts:[{bank:'BNP Paribas · Lyon', num:'FR76 ████ 0092', status:'Flagged', statusColor:'#DC2626'}],
    flows:[{date:'15 MAY', cp:'→ Helios Holdings (CY)', amount:'€240,000', flag:'Layering'},{date:'11 APR', cp:'→ A. Reyes', amount:'€9,500', flag:''}],
    note:'Invoice volume inconsistent with declared freight tonnage; assessed primary laundering vehicle.'},
  {id:'ORG-7741', name:'Helios Holdings Ltd', type:'Shell / holding', juris:'Cyprus · Nicosia', reg:'HE 411 872', incorporated:'Apr 2026', status:'Suspected beneficiary', risk:'Elevated', caseId:'22-1187', role:'Offshore beneficiary', initials:'HH', people:['SBJ-4471-K'],
    accounts:[{bank:'Emirates NBD · Dubai', num:'AE07 ████ 1180', status:'Under review', statusColor:'#B5851C'}],
    flows:[{date:'15 MAY', cp:'← Meridian Logistics', amount:'€240,000', flag:'Layering'}],
    note:'Incorporated three weeks before the first inbound wire — purpose-built for layering.'},
  {id:'ORG-3310', name:'Aurelia Estates SL', type:'Property vehicle', juris:'Spain · Marbella', reg:'B-93 441 220', incorporated:'Sep 2022', status:'Linked', risk:'Moderate', caseId:'22-1187', role:'Property holding vehicle', initials:'AE', people:['SBJ-4471-K'],
    accounts:[], flows:[],
    note:'Holds Villa Aurelia (Marbella) and vehicle registration 4471-MBA.'},
  {id:'ORG-5521', name:'Bosphorus Freight Co.', type:'Front company', juris:'Türkiye · Istanbul', reg:'IST 5521-K', incorporated:'Jan 2021', status:'Under investigation', risk:'Elevated', caseId:'21-0934', role:'Logistics facilitation', initials:'BF', people:['SBJ-3372-D','SBJ-8120-O'],
    accounts:[], flows:[],
    note:'Container manifests under review; central node of the Tideway logistics chain.'},
];

// ---- lookups ----
const SUBJ_BY_ID = {}; SUBJECTS.forEach(s=>SUBJ_BY_ID[s.id]=s);
const ORG_BY_ID = {};  ORGS.forEach(o=>ORG_BY_ID[o.id]=o);
function isOrgId(id){ return /^ORG-/.test(id||''); }
function entityById(id){ return SUBJ_BY_ID[id] || ORG_BY_ID[id] || null; }

// events referencing subjects (drives per-subject "recent activity")
const SUBJECT_EVENTS = [
  {subj:'SBJ-4471-K', tag:'Biometric', color:'#DC2626', date:'09 JUN 2026', title:'Border gate face-match', detail:'Geneva (GVA) automated gate · 98.4% confidence'},
  {subj:'SBJ-4471-K', tag:'Financial', color:'#B5851C', date:'04 JUN 2026', title:'Cash-purchased flight DXB → GVA', detail:'Ticket bought in cash 90 minutes before departure'},
  {subj:'SBJ-4471-K', tag:'Identity',  color:'#DC2626', date:'02 FEB 2026', title:'Travel on secondary identity', detail:'Entered US as “Marc Devon” — biometric mismatch'},
  {subj:'SBJ-9011-P', tag:'Location',  color:'#DC2626', date:'12 JUN 2026', title:'Port geofence breach', detail:'Restricted zone · Rotterdam Maasvlakte'},
  {subj:'SBJ-6603-K', tag:'Biometric', color:'#DC2626', date:'—', title:'Ferry terminal face-match', detail:'Marseille ferry · 95.6% confidence'},
  {subj:'SBJ-8120-O', tag:'Location',  color:'#B5851C', date:'06 JUN 2026', title:'Handset active near container depot', detail:'Istanbul · Tuzla'},
  {subj:'SBJ-2210-V', tag:'Comms',     color:'#0073E6', date:'—', title:'New burner SIM activated', detail:'Swiss carrier · linked to handset cluster'},
  {subj:'SBJ-3372-D', tag:'Travel',    color:'#0073E6', date:'—', title:'PNR booking created IST → GVA', detail:'Turkish Airlines · 14 JUN'},
];
function subjectEvents(id){ return SUBJECT_EVENTS.filter(e=>e.subj===id); }

// associates: same-case peers (Delacroix gets a curated network in the dossier)
function subjectAssociates(id){
  const s = SUBJ_BY_ID[id]; if(!s) return [];
  return SUBJECTS.filter(x=>x.id!==id && x.caseId===s.caseId);
}
function subjectOrgs(id){ return ORGS.filter(o=>o.people.includes(id)); }

// ---- avatar (initials tinted by risk) ----
function EntAvatar({ent, size=40, square}){
  const rc = riskMeta(ent.risk).color;
  return (
    <span style={{width:size,height:size,flex:'none',borderRadius:square?Math.round(size*0.26):'50%',
      background:rc,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',
      fontSize:Math.round(size*0.36),fontWeight:700,letterSpacing:'.01em',boxShadow:'0 0 0 2px #fff'}}>{ent.initials}</span>
  );
}
function RiskBadge({risk, sm}){
  const m = riskMeta(risk);
  return <span className="badge" style={{background:m.tint,color:m.color,height:sm?19:21,fontSize:sm?10.5:11.5,fontWeight:600}}>
    <span style={{width:5.5,height:5.5,borderRadius:'50%',background:m.color}}></span>{m.label}</span>;
}
function CaseTag({caseId, sm}){
  const c = CASES[caseId]; if(!c) return null;
  return <span className="badge" style={{background:'var(--surface-2)',color:'var(--ink-2)',border:'1px solid var(--line)',height:sm?18:20,fontSize:sm?10:10.5}}>
    <span style={{width:5,height:5,borderRadius:'50%',background:c.dot}}></span>{c.short}</span>;
}

// ===================== Entities browse grid =====================
function EntitiesGrid({filter, flash, openEntity, view='card', favs={}, toggleFav=()=>{}, favOnly=false}){
  const [kind,setKind]=React.useState('all');   // all | subjects | orgs
  const [risk,setRisk]=React.useState('All');
  const [detail,setDetail]=React.useState(null);
  const f=(filter||'').toLowerCase();

  const subjRows = SUBJECTS.map(s=>({...s, entKind:'subject'}));
  const orgRows  = ORGS.map(o=>({...o, entKind:'org', alias:o.type, nat:o.juris, lastSeen:'—'}));
  let list = kind==='orgs' ? orgRows : kind==='subjects' ? subjRows : subjRows.concat(orgRows);
  list = list.filter(e=>{
    const hay = (e.name+' '+(e.alias||'')+' '+e.id+' '+(e.nat||'')+' '+(e.status||'')).toLowerCase();
    const matchQ = !f || hay.includes(f);
    const matchR = risk==='All' || e.risk===risk;
    const matchFav = !favOnly || favs[e.id];
    return matchQ && matchR && matchFav;
  });

  const riskFilters = ['All','Critical','Elevated','Moderate','Cleared'];
  const kindTabs = [['all','All'],['subjects','Subjects'],['orgs','Organizations']];

  const toolbar = (
    <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap',marginBottom:16}}>
      <div style={{display:'flex',gap:3,background:'#EEF1F6',padding:3,borderRadius:9}}>
        {kindTabs.map(([id,lb])=>(
          <button key={id} onClick={()=>setKind(id)} style={{border:0,cursor:'pointer',fontSize:12.5,fontWeight:550,padding:'6px 13px',borderRadius:7,transition:'.12s',
            background:kind===id?'#fff':'transparent',color:kind===id?'var(--ink)':'var(--ink-3)',boxShadow:kind===id?'var(--shadow-sm)':'none'}}>{lb}</button>
        ))}
      </div>
      <div style={{width:1,height:22,background:'var(--line-2)'}}></div>
      <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
        {riskFilters.map(r=>{
          const on=risk===r, m=r==='All'?null:riskMeta(r);
          return <button key={r} onClick={()=>setRisk(r)} className={'chip'+(on?' on':'')} style={{height:28,fontSize:12}}>
            {m && <span style={{width:7,height:7,borderRadius:'50%',background:on?'#fff':m.color}}></span>}{r}</button>;
        })}
      </div>
      <div style={{flex:1}}></div>
      <span className="muted" style={{fontSize:12.5}}>{list.length} {list.length===1?'record':'records'}</span>
    </div>
  );

  if(!list.length) return (<React.Fragment>{toolbar}<Empty label={favOnly?"No favorite entities yet.":"No entities match your filter."}/></React.Fragment>);

  return (
    <React.Fragment>
      {toolbar}
      {view==='list' ? (
        <div className="card" style={{padding:0,overflow:'hidden'}}>
          <div style={{display:'grid',gridTemplateColumns:'2.4fr 1.1fr 1.2fr 1.1fr 0.9fr 150px',gap:14,padding:'11px 18px',background:'var(--surface-2)',borderBottom:'1px solid var(--line)'}}>
            {['Entity','ID','Nationality / Juris.','Risk','Last seen',''].map((h,i)=>(
              <span key={i} className="eyebrow" style={{fontSize:10}}>{h}</span>
            ))}
          </div>
          {list.map((e,i)=>(
            <div key={e.id} style={{display:'grid',gridTemplateColumns:'2.4fr 1.1fr 1.2fr 1.1fr 0.9fr 150px',gap:14,alignItems:'center',padding:'11px 18px',borderTop:i?'1px solid var(--line)':0}}>
              <div style={{display:'flex',alignItems:'center',gap:11,minWidth:0}}>
                <FavStar on={!!favs[e.id]} onToggle={()=>toggleFav(e.id)} size={15}/>
                <EntAvatar ent={e} size={34} square={e.entKind==='org'}/>
                <div style={{minWidth:0}}>
                  <div style={{fontSize:13.5,fontWeight:600,color:'var(--ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{e.name}</div>
                  <div className="muted" style={{fontSize:11.5,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{e.entKind==='org'?e.type:('aka '+e.alias)}</div>
                </div>
              </div>
              <span style={{fontFamily:'ui-monospace,Menlo,monospace',fontSize:11.5,color:'var(--ink-2)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{e.id}</span>
              <span style={{fontSize:12.5,color:'var(--ink-2)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{e.nat}</span>
              <span><RiskBadge risk={e.risk}/></span>
              <span style={{fontSize:12.5,color:'var(--ink-3)'}}>{e.lastSeen}</span>
              <div style={{justifySelf:'end'}}><CardActions stacked viewLabel="Open" onView={()=>openEntity&&openEntity(e.id)} onDetails={()=>setDetail(e)}/></div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,paddingBottom:8}}>
          {list.map(e=>(
            <div key={e.id} className="card card-hover card-pad" style={{display:'flex',flexDirection:'column',gap:13}}>
              <div style={{display:'flex',alignItems:'flex-start',gap:12}}>
                <EntAvatar ent={e} size={44} square={e.entKind==='org'}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:14,fontWeight:600,color:'var(--ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{e.name}</div>
                  <div className="muted" style={{fontSize:11.5,marginTop:1,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{e.entKind==='org'?e.type:('aka '+e.alias)}</div>
                </div>
                <FavStar on={!!favs[e.id]} onToggle={()=>toggleFav(e.id)}/>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:7,flexWrap:'wrap'}}>
                <RiskBadge risk={e.risk} sm/>
                <CaseTag caseId={e.caseId} sm/>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:7,paddingTop:11,borderTop:'1px solid var(--line)'}}>
                <div style={{display:'flex',justifyContent:'space-between',gap:8,fontSize:12}}>
                  <span style={{color:'var(--ink-4)'}}>ID</span>
                  <span style={{fontFamily:'ui-monospace,Menlo,monospace',color:'var(--ink-2)',fontWeight:600}}>{e.id}</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',gap:8,fontSize:12}}>
                  <span style={{color:'var(--ink-4)'}}>{e.entKind==='org'?'Jurisdiction':'Nationality'}</span>
                  <span style={{color:'var(--ink-2)',fontWeight:550,textAlign:'right',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',maxWidth:'62%'}}>{e.nat}</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',gap:8,fontSize:12}}>
                  <span style={{color:'var(--ink-4)'}}>Status</span>
                  <span style={{color:'var(--ink-2)',fontWeight:550,textAlign:'right',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',maxWidth:'62%'}}>{e.status}</span>
                </div>
              </div>
              <CardActions viewLabel="Open" onView={()=>openEntity&&openEntity(e.id)} onDetails={()=>setDetail(e)}/>
            </div>
          ))}
        </div>
      )}
      {detail && <EntityQuickDetails e={detail} onClose={()=>setDetail(null)} onView={()=>{setDetail(null);openEntity&&openEntity(detail.id);}}/>}
    </React.Fragment>
  );
}

function EntityQuickDetails({e, onClose, onView}){
  const isOrg = e.entKind==='org';
  const c = CASES[e.caseId];
  return (
    <InfoModal title={e.name} sub={isOrg?(e.type+' · '+e.juris):(e.role+' · '+e.nat)} icon={isOrg?'collections':'user'}
      onClose={onClose} onView={onView} viewLabel={isOrg?'Open profile':'Open dossier'} viewIcon="arrow_right">
      <InfoSection title="Assessment">
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <RiskBadge risk={e.risk}/>
          <span className="badge" style={{background:'var(--hover)',color:'var(--ink-2)',height:24}}>{e.status}</span>
          {c && <span className="badge" style={{background:'var(--surface-2)',color:'var(--ink-2)',border:'1px solid var(--line)',height:24}}><span style={{width:6,height:6,borderRadius:'50%',background:c.dot}}></span>{c.op}</span>}
        </div>
      </InfoSection>
      <InfoSection title="Details">
        <InfoRows rows={isOrg ? [
          ['Entity ID', e.id],
          ['Type', e.type],
          ['Jurisdiction', e.juris],
          ['Registration', e.reg],
          ['Incorporated', e.incorporated],
          ['Role', e.role],
          ['Linked people', String(e.people.length)],
        ] : [
          ['Subject ID', e.id],
          ['Known aliases', e.aliases.join(', ')],
          ['Nationality', e.nat],
          e.dob ? ['Date of birth', e.dob] : null,
          ['Assessed role', e.role],
          ['Status', e.status],
          ['Last seen', e.lastSeen],
        ]}/>
      </InfoSection>
    </InfoModal>
  );
}

Object.assign(window, {
  RISK, riskMeta, SRC, SrcTag, src, CASES, SUBJECTS, ORGS, SUBJ_BY_ID, ORG_BY_ID, isOrgId, entityById,
  subjectEvents, subjectAssociates, subjectOrgs, EntAvatar, RiskBadge, CaseTag, EntitiesGrid, EntityQuickDetails,
});
