// command.jsx — forensic "Command Overview" band for the homepage dashboard.
// Ported from the Sentinel Command tab, wired to the Entities (SUBJECTS / CASES) data.

const CMD_SEV = {
  critical: {color:'#DC2626', tint:'#FEF2F2', label:'Critical'},
  high:     {color:'#B5851C', tint:'#FFFBEB', label:'High'},
  info:     {color:'#0073E6', tint:'#EBF4FF', label:'Info'},
};
const CMD_KIND_ICON = {
  Travel:'route', Location:'pin_loc', Biometric:'eye', Comms:'phone', ALPR:'target', 'Co-travel':'link', Identity:'user', Signal:'signal',
};

// priority alerts · 24h
const CMD_ALERTS = [
  {tag:'Biometric', color:'#DC2626', time:'08:42',     title:'Border gate face-match', detail:'Geneva (GVA) automated gate · 98.4% confidence', subj:'SBJ-4471-K', caseId:'22-1187'},
  {tag:'Location',  color:'#DC2626', time:'08:20',     title:'Port geofence breach',   detail:'Restricted zone · Rotterdam Maasvlakte',        subj:'SBJ-9011-P', caseId:'23-0461'},
  {tag:'Comms',     color:'#B5851C', time:'Yesterday', title:'New burner device activated', detail:'Swiss SIM linked to existing handset cluster', subj:'SBJ-4471-K', caseId:'22-1187'},
  {tag:'Biometric', color:'#DC2626', time:'Yesterday', title:'Ferry terminal face-match', detail:'Marseille ferry · 95.6% confidence',           subj:'SBJ-6603-K', caseId:'21-0934'},
  {tag:'Identity',  color:'#DC2626', time:'2 days',    title:'Travel on secondary identity', detail:'Entered US as “Marc Devon” — biometric mismatch', subj:'SBJ-4471-K', caseId:'22-1187'},
];

// recent analyst activity
const CMD_ANALYST = [
  {time:'09:10', text:'Annotated travel leg DXB→GVA as cash-purchased', who:'Analyst J. Renner'},
  {time:'08:55', text:'Linked SBJ-2210-V as financier (high confidence)', who:'Analyst K. Osei'},
  {time:'08:30', text:'Uploaded HUMINT report HR-0442', who:'Analyst K. Osei'},
  {time:'Yest.', text:'Renewed surveillance authorization, Case 22-1187', who:'Supervisor M. Tan'},
  {time:'2 days', text:'Added Villa Aurelia (Marbella) to known locations', who:'Analyst K. Osei'},
];

// live-watch event pool (streams in over time)
const CMD_LIVE_POOL = [
  {sev:'critical', kind:'Biometric', title:'Face-match at border eGate · 98.4%', subj:'SBJ-4471-K', loc:'Geneva (GVA)', caseId:'22-1187'},
  {sev:'critical', kind:'Location',  title:'Crossed port geofence · vehicle convoy', subj:'SBJ-9011-P', loc:'Rotterdam', caseId:'23-0461'},
  {sev:'high',     kind:'ALPR',      title:'Plate read northbound · 124 km/h', subj:'SBJ-4471-K', loc:'A6 · Mâcon', caseId:'22-1187'},
  {sev:'high',     kind:'Location',  title:'Handset active near container depot', subj:'SBJ-8120-O', loc:'Istanbul · Tuzla', caseId:'21-0934'},
  {sev:'info',     kind:'Comms',     title:'New burner SIM activated on handset cluster', subj:'SBJ-2210-V', loc:'Swiss carrier', caseId:'22-1187'},
  {sev:'critical', kind:'Travel',    title:'Boarding pass scanned — GVA → IST, gate B12', subj:'SBJ-4471-K', loc:'Geneva Airport', caseId:'22-1187'},
  {sev:'high',     kind:'Location',  title:'Entered geofence · Warehouse 7', subj:'SBJ-1144-R', loc:'Gennevilliers', caseId:'22-1187'},
  {sev:'critical', kind:'Biometric', title:'Face-match at ferry terminal · 95.6%', subj:'SBJ-6603-K', loc:'Marseille · Ferry', caseId:'21-0934'},
  {sev:'info',     kind:'Travel',    title:'PNR booking created IST → GVA (14 JUN)', subj:'SBJ-3372-D', loc:'Turkish Airlines', caseId:'21-0934'},
  {sev:'high',     kind:'Co-travel', title:'Co-located with V. Petrov · dockside', subj:'SBJ-9043-C', loc:'Rotterdam', caseId:'23-0461'},
];

function cmdOpen(id){ window.__openEntity && window.__openEntity(id); }
function cmdSubjName(id){ const s=SUBJ_BY_ID[id]; return s?s.name:id; }

// ---- live watch (streaming) ----
function LiveWatch(){
  const idRef = React.useRef(0);
  const poolRef = React.useRef(0);
  const mk = (base, fresh)=>({...base, id:'lv'+(idRef.current++), ts:Date.now(), fresh:!!fresh});
  const [events,setEvents] = React.useState(()=>CMD_LIVE_POOL.slice(0,5).map((e,i)=>({...e, id:'lv'+(idRef.current++), ts:Date.now()-(i+1)*24000, fresh:false})));
  const [paused,setPaused] = React.useState(false);
  const [total,setTotal] = React.useState(37);
  const [disp,setDisp] = React.useState({});
  const [ack,setAck] = React.useState({});
  const [,setTick] = React.useState(0);

  React.useEffect(()=>{
    const t=setInterval(()=>setTick(n=>n+1), 3000);
    return ()=>clearInterval(t);
  },[]);
  React.useEffect(()=>{
    if(paused) return;
    const t=setInterval(()=>{
      poolRef.current=(poolRef.current+1)%CMD_LIVE_POOL.length;
      setEvents(evs=>[mk(CMD_LIVE_POOL[poolRef.current], true), ...evs].slice(0,12));
      setTotal(n=>n+1);
    }, 7000);
    return ()=>clearInterval(t);
  },[paused]);

  const now=Date.now();
  const rel=(ts)=>{ let s=Math.max(0,Math.round((now-ts)/1000)); if(s<5)return 'live'; if(s<60)return s+'s ago'; const m=Math.floor(s/60); if(m<60)return m+'m ago'; return Math.floor(m/60)+'h ago'; };
  const critical=events.filter(e=>e.sev==='critical').length;

  return (
    <div className="card" style={{padding:0,overflow:'hidden'}}>
      <div style={{padding:'13px 18px',borderBottom:'1px solid var(--line)',display:'flex',alignItems:'center',justifyContent:'space-between',gap:14,flexWrap:'wrap',background:'linear-gradient(90deg,#FEF4F3,#fff 55%)'}}>
        <div style={{display:'flex',alignItems:'center',gap:11}}>
          <span style={{width:9,height:9,borderRadius:'50%',background:'#DC2626',flex:'none',animation:'blink 1.5s steps(1) infinite'}}></span>
          <span style={{fontSize:12,fontWeight:700,letterSpacing:'.12em',color:'var(--ink)'}}>LIVE WATCH</span>
          <span className="muted" style={{fontSize:11.5}}>real-time feed · travel · location · biometric · comms</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:11,flexWrap:'wrap'}}>
          <span className="badge" style={{background:'#FEF2F2',color:'#DC2626',border:'1px solid #F3C9C4',height:24,fontSize:10.5,fontWeight:700,letterSpacing:'.04em',fontFamily:'ui-monospace,Menlo,monospace'}}>{critical} CRITICAL</span>
          <span className="muted" style={{fontSize:11,fontFamily:'ui-monospace,Menlo,monospace'}}>{total} events today</span>
          <button className="btn btn-secondary btn-sm" onClick={()=>setPaused(p=>!p)}><span style={{width:7,height:7,borderRadius:1,background:'currentColor',flex:'none'}}></span>{paused?'Resume feed':'Pause feed'}</button>
        </div>
      </div>
      <div style={{maxHeight:320,overflowY:'auto'}}>
        {events.map((e,i)=>{
          const sm=CMD_SEV[e.sev]||CMD_SEV.info, c=CASES[e.caseId], disptd=!!disp[e.id], acked=!!ack[e.id];
          const fresh=e.fresh && (now-e.ts)<6000;
          return (
            <div key={e.id} style={{display:'flex',gap:13,padding:'13px 18px',borderTop:i?'1px solid var(--line)':0,alignItems:'center',background:fresh?'#F4F8FF':'#fff',transition:'background .7s ease'}}>
              <span style={{width:5,flex:'none',alignSelf:'stretch',borderRadius:3,background:sm.color}}></span>
              <span style={{width:34,height:34,flex:'none',borderRadius:9,background:sm.tint,color:sm.color,display:'flex',alignItems:'center',justifyContent:'center'}}><Icon name={CMD_KIND_ICON[e.kind]||'target'} size={17}/></span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:'flex',alignItems:'center',gap:9,flexWrap:'wrap'}}>
                  <span style={{fontSize:9.5,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:sm.color,fontFamily:'ui-monospace,Menlo,monospace'}}>{e.kind}</span>
                  {c && <span className="badge" style={{background:'var(--surface-2)',color:'var(--ink-3)',border:'1px solid var(--line)',height:18,fontSize:9.5}}><span style={{width:5,height:5,borderRadius:'50%',background:c.dot}}></span>{c.short}</span>}
                  <span className="muted" style={{fontSize:10,fontFamily:'ui-monospace,Menlo,monospace'}}>{rel(e.ts)}</span>
                  {fresh && <span className="badge" style={{background:'var(--blue-t)',color:'var(--blue)',height:15,fontSize:8.5,fontWeight:700,letterSpacing:'.08em',padding:'0 5px'}}>NEW</span>}
                </div>
                <div style={{fontSize:13,fontWeight:550,color:'var(--ink)',marginTop:5,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{e.title}</div>
                <div className="muted" style={{fontSize:11.5,marginTop:3,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{cmdSubjName(e.subj)} · {e.subj} · {e.loc}</div>
              </div>
              <div style={{flex:'none',display:'flex',alignItems:'center',gap:8}}>
                {disptd ? (
                  <span className="badge" style={{background:'#F0FDF4',color:'#16A34A',border:'1px solid #C5E2D0',height:26,fontSize:9.5,fontWeight:700,letterSpacing:'.04em'}}><Icon name="check" size={12} sw={2.6}/>UNITS DISPATCHED</span>
                ) : acked ? (
                  <span className="badge" style={{background:'var(--surface-2)',color:'var(--ink-3)',border:'1px solid var(--line)',height:26,fontSize:9.5,fontWeight:700,letterSpacing:'.04em'}}>ACKNOWLEDGED</span>
                ) : (
                  <React.Fragment>
                    {e.sev!=='info' && <button onClick={()=>setDisp(d=>({...d,[e.id]:true}))} style={{display:'inline-flex',alignItems:'center',gap:6,border:0,background:'#DC2626',color:'#fff',borderRadius:7,padding:'7px 11px',cursor:'pointer',fontSize:11,fontWeight:600}}><Icon name="bell" size={13}/>Dispatch</button>}
                    <button className="btn btn-secondary btn-sm" onClick={()=>setAck(a=>({...a,[e.id]:true}))}>Ack</button>
                  </React.Fragment>
                )}
                <button className="btn btn-ghost btn-icon btn-sm" title="Open subject" style={{border:'1px solid var(--line-2)'}} onClick={()=>cmdOpen(e.subj)}><Icon name="chevron_right" size={15}/></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CommandCenter(){
  const critical = SUBJECTS.filter(s=>s.risk==='Critical').length;
  const stats = [
    {label:'Active subjects', value:SUBJECTS.length, delta:'+2', dir:'up'},
    {label:'Open operations', value:Object.keys(CASES).length, delta:'+1', dir:'up'},
    {label:'Alerts · 24h',    value:CMD_ALERTS.length, delta:'+4', dir:'up', danger:true},
    {label:'Critical risk',   value:critical, delta:'0', dir:'flat'},
  ];
  const watchlist = [...SUBJECTS].sort((a,b)=>riskMeta(a.risk).rank-riskMeta(b.risk).rank).slice(0,5);
  const ops = [
    {id:'22-1187', op:'Operation Meridian',  status:'Active · Authorized', dot:'#B5851C'},
    {id:'21-0934', op:'Operation Tideway',   status:'Active · Authorized', dot:'#DC2626'},
    {id:'23-0461', op:'Operation Northgate', status:'Monitoring',          dot:'#0073E6'},
  ].map(o=>({...o, count:SUBJECTS.filter(s=>s.caseId===o.id).length}));

  const cardHead = (title, right) => (
    <div style={{padding:'14px 18px',borderBottom:'1px solid var(--line)',display:'flex',alignItems:'center',justifyContent:'space-between',gap:10}}>
      <span className="eyebrow">{title}</span>{right}
    </div>
  );

  return (
    <div style={{display:'flex',flexDirection:'column',gap:20,marginBottom:20}}>
      {/* header + case-intelligence stats */}
      <div className="card card-pad">
        <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',gap:14,flexWrap:'wrap',marginBottom:16}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <span style={{width:34,height:34,borderRadius:9,background:'var(--primary-tint)',color:'var(--primary)',display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name="shield" size={18}/></span>
            <div>
              <div className="card-title" style={{fontSize:15.5}}>Command Overview</div>
              <div className="muted" style={{fontSize:12.5,marginTop:1}}>All operations active · 3 analysts on watch · live case intelligence</div>
            </div>
          </div>
          <span style={{display:'inline-flex',alignItems:'center',gap:7,background:'#fff',border:'1px solid var(--line)',borderRadius:8,padding:'8px 12px',fontSize:12,fontWeight:500,color:'var(--ink-2)'}}>
            <span style={{width:7,height:7,borderRadius:'50%',background:'#16A34A'}}></span>Feeds nominal
          </span>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)'}}>
          {stats.map((k,i)=>(
            <div key={k.label} style={{borderLeft:i?'1px solid var(--line)':'0',padding:i?'2px 18px':'2px 18px 2px 2px'}}>
              <div style={{fontSize:12,fontWeight:550,color:'var(--ink-2)'}}>{k.label}</div>
              <div style={{display:'flex',alignItems:'baseline',gap:8,marginTop:8}}>
                <span style={{fontSize:28,fontWeight:700,letterSpacing:'-.03em',lineHeight:1,color:'var(--ink)',fontVariantNumeric:'tabular-nums'}}>{k.value}</span>
                <span style={{fontSize:11.5,fontWeight:600,color:k.danger?'#DC2626':(k.dir==='flat'?'var(--ink-3)':'#16A34A'),display:'flex',alignItems:'center',gap:1}}>
                  {k.dir!=='flat' && <Icon name={k.dir==='up'?'arrow_up':'arrow_down'} size={11} sw={2.4}/>}{k.delta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* live watch */}
      <LiveWatch/>

      {/* alerts · watchlist · operations */}
      <div style={{display:'grid',gridTemplateColumns:'1.6fr 1.15fr 1.15fr',gap:20,alignItems:'start'}}>
        {/* priority alerts */}
        <div className="card" style={{padding:0,overflow:'hidden'}}>
          {cardHead('Priority Alerts · 24h', <span className="muted" style={{fontSize:11,fontFamily:'ui-monospace,Menlo,monospace'}}>{CMD_ALERTS.length} active</span>)}
          {CMD_ALERTS.map((a,i)=>{
            const c=CASES[a.caseId];
            return (
              <div key={i} onClick={()=>cmdOpen(a.subj)} style={{display:'flex',gap:14,padding:'14px 18px',borderTop:i?'1px solid var(--line)':0,cursor:'pointer',transition:'.12s'}}
                onMouseEnter={e=>e.currentTarget.style.background='var(--surface-2)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <span style={{width:6,flex:'none',alignSelf:'stretch',borderRadius:3,background:a.color}}></span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:'flex',alignItems:'center',gap:9,flexWrap:'wrap'}}>
                    <span style={{fontSize:9.5,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:a.color,fontFamily:'ui-monospace,Menlo,monospace'}}>{a.tag}</span>
                    <span className="muted" style={{fontSize:10,fontFamily:'ui-monospace,Menlo,monospace'}}>{a.time}</span>
                    {c && <span style={{display:'inline-flex',alignItems:'center',gap:5,fontSize:9,fontWeight:600,color:'var(--ink-3)'}}><span style={{width:6,height:6,borderRadius:'50%',background:c.dot}}></span>{c.short}</span>}
                  </div>
                  <div style={{fontSize:13.5,fontWeight:600,color:'var(--ink)',marginTop:6}}>{a.title}</div>
                  <div className="muted" style={{fontSize:12,marginTop:3,lineHeight:1.4}}>{a.detail}</div>
                </div>
                <span className="muted" style={{fontSize:11,fontFamily:'ui-monospace,Menlo,monospace',alignSelf:'center',flex:'none'}}>{a.subj}</span>
              </div>
            );
          })}
        </div>

        {/* watchlist */}
        <div className="card" style={{padding:0,overflow:'hidden'}}>
          {cardHead('Watchlist', <span className="linkish" style={{fontSize:11.5,cursor:'pointer'}} onClick={()=>window.__setPage&&window.__setPage('explore')}>View all</span>)}
          {watchlist.map((w,i)=>(
            <div key={w.id} onClick={()=>cmdOpen(w.id)} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 18px',borderTop:i?'1px solid var(--line)':0,cursor:'pointer',transition:'.12s'}}
              onMouseEnter={e=>e.currentTarget.style.background='var(--surface-2)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              <EntAvatar ent={w} size={36} square/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:600,color:'var(--ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{w.name}</div>
                <div style={{display:'flex',alignItems:'center',gap:7,marginTop:3}}>
                  <span style={{fontSize:10.5,fontFamily:'ui-monospace,Menlo,monospace',color:'var(--ink-3)'}}>{w.id}</span>
                  <CaseTag caseId={w.caseId} sm/>
                </div>
              </div>
              <span style={{fontSize:9.5,fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase',color:riskMeta(w.risk).color,fontFamily:'ui-monospace,Menlo,monospace',flex:'none'}}>{w.risk}</span>
            </div>
          ))}
        </div>

        {/* active operations */}
        <div className="card" style={{padding:0,overflow:'hidden'}}>
          {cardHead('Active Operations', <span className="muted" style={{fontSize:11,fontFamily:'ui-monospace,Menlo,monospace'}}>{ops.length}</span>)}
          {ops.map((o,i)=>(
            <div key={o.id} style={{display:'flex',alignItems:'center',gap:12,padding:'14px 18px',borderTop:i?'1px solid var(--line)':0}}>
              <span style={{width:34,height:34,flex:'none',borderRadius:9,background:o.dot+'1a',color:o.dot,display:'flex',alignItems:'center',justifyContent:'center'}}><Icon name="gavel" size={16}/></span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:600,color:'var(--ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{o.op}</div>
                <div style={{display:'flex',alignItems:'center',gap:7,marginTop:3}}>
                  <span className="muted" style={{fontSize:10.5,fontFamily:'ui-monospace,Menlo,monospace'}}>{o.id}</span>
                  <span style={{display:'inline-flex',alignItems:'center',gap:5,fontSize:11,fontWeight:500,color:'var(--ink-3)'}}><span style={{width:6,height:6,borderRadius:'50%',background:o.dot}}></span>{o.status}</span>
                </div>
              </div>
              <span className="badge" style={{background:'var(--surface-2)',color:'var(--ink-2)',border:'1px solid var(--line)',height:20,flex:'none'}}>{o.count} subj</span>
            </div>
          ))}
          <div style={{padding:'14px 18px',borderTop:'1px solid var(--line)'}}>
            <div className="eyebrow" style={{marginBottom:10}}>Recent analyst activity</div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {CMD_ANALYST.slice(0,4).map((a,i)=>(
                <div key={i} style={{display:'flex',gap:11}}>
                  <span className="muted" style={{fontSize:10.5,fontFamily:'ui-monospace,Menlo,monospace',flex:'none',width:44,paddingTop:1}}>{a.time}</span>
                  <div style={{minWidth:0}}>
                    <div style={{fontSize:12,color:'var(--ink-2)',lineHeight:1.4}}>{a.text}</div>
                    <div className="muted" style={{fontSize:10.5,marginTop:2}}>{a.who}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CommandCenter, LiveWatch });
