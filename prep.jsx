// prep.jsx — Prep workspace: draft memos & assessments from templates

const P_SERIF = "'Spectral', Georgia, 'Times New Roman', serif";
const P_MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const PREP_TEMPLATES = [
  {id:'intel', name:'Intelligence Memo', icon:'file', color:'#1D6BD0', tint:'#E7EFFB', sections:['Bottom line','Background','Assessment','Outlook'], desc:'Standard finished-intelligence format'},
  {id:'decision', name:'Decision Memo', icon:'check_square', color:'#8A63C4', tint:'#F1EBFA', sections:['Issue','Options','Recommendation','Decision'], desc:'For a specific approve/disapprove call'},
  {id:'talking', name:'Talking Points', icon:'message', color:'#1F9D86', tint:'#E4F4F0', sections:['Purpose','Points','Anticipated Q&A'], desc:'Bullet points for a briefing or call'},
  {id:'assess', name:'Assessment', icon:'chart', color:'#FF9A4E', tint:'#FFF1E4', sections:['Key judgments','Evidence','Confidence','Gaps'], desc:'Analytic assessment with confidence'},
];
const PREP_DRAFTS = [
  {id:'D-118', title:'Eastern Sector — Activity Trend', tmpl:'intel', cls:'CUI', progress:72, edited:'4m ago', words:640, collab:['maya','noah']},
  {id:'D-114', title:'Reallocation Follow-on — 30 Day', tmpl:'decision', cls:'S', progress:45, edited:'1h ago', words:310, collab:['sam']},
  {id:'D-109', title:'Coastal Sensor Coverage Gaps', tmpl:'assess', cls:'CUI', progress:88, edited:'3h ago', words:910, collab:['priya','diego']},
  {id:'D-103', title:'Weekly Sync — Coordination Points', tmpl:'talking', cls:'U', progress:30, edited:'yesterday', words:180, collab:['tyler']},
];
const P_CLS = {U:{label:'UNCLASSIFIED',color:'#1F8A5B'}, CUI:{label:'CUI',color:'#1D6BD0'}, S:{label:'SECRET // NOFORN',color:'#C24A2E'}};

function PrepWorkspace({setPage, flash}){
  const [editing,setEditing]=React.useState(null); // {draft} or {tmpl}
  function openDraft(d){ setEditing({draft:d, tmpl:PREP_TEMPLATES.find(t=>t.id===d.tmpl)}); }
  function newDraft(t){ setEditing({draft:null, tmpl:t}); }

  if(editing) return <PrepEditor cfg={editing} onBack={()=>setEditing(null)} setPage={setPage} flash={flash}/>;

  return (
    <div className="rise">
      <WsHeader name="Prep" setPage={setPage}
        action={<button className="btn btn-primary" onClick={()=>newDraft(PREP_TEMPLATES[0])}><Icon name="plus" size={16} sw={2.2}/>New draft</button>}/>
      <div className="page" style={{paddingTop:24}}>
        <SectionHead title="Start from a template" sub="Structured formats that route cleanly into Memos" icon="text"/>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:30}}>
          {PREP_TEMPLATES.map(t=>(
            <button key={t.id} onClick={()=>newDraft(t)} className="card card-hover" style={{padding:'16px 17px',textAlign:'left',cursor:'pointer',border:'1px solid var(--line)',display:'flex',flexDirection:'column',gap:12}}>
              <span style={{width:40,height:40,borderRadius:11,background:t.tint,color:t.color,display:'flex',alignItems:'center',justifyContent:'center'}}><Icon name={t.icon} size={20}/></span>
              <div>
                <div style={{fontSize:14.5,fontWeight:600,color:'var(--ink)'}}>{t.name}</div>
                <div className="muted" style={{fontSize:12,marginTop:3,lineHeight:1.4}}>{t.desc}</div>
              </div>
              <div style={{display:'flex',gap:5,flexWrap:'wrap',marginTop:2}}>
                {t.sections.map(s=><span key={s} className="badge" style={{background:'var(--surface-2)',color:'var(--ink-3)',border:'1px solid var(--line)',height:20,fontWeight:500}}>{s}</span>)}
              </div>
            </button>
          ))}
        </div>

        <SectionHead title="Your drafts" sub="Pick up where you left off" icon="pen"/>
        <div className="card card-pad">
          <div style={{display:'flex',flexDirection:'column'}}>
            {PREP_DRAFTS.map((d,i)=>{
              const t=PREP_TEMPLATES.find(x=>x.id===d.tmpl), cls=P_CLS[d.cls];
              return (
                <div key={d.id} onClick={()=>openDraft(d)} style={{display:'flex',alignItems:'center',gap:14,padding:'13px 6px',borderTop:i?'1px solid var(--line)':0,cursor:'pointer',borderRadius:8}}
                  onMouseEnter={e=>e.currentTarget.style.background='var(--surface-2)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <span style={{width:36,height:36,borderRadius:9,background:t.tint,color:t.color,display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name={t.icon} size={17}/></span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:14,fontWeight:600,color:'var(--ink)'}}>{d.title}</div>
                    <div style={{display:'flex',alignItems:'center',gap:9,marginTop:3,fontSize:11.5,color:'var(--ink-3)'}}>
                      <span style={{fontWeight:600,color:cls.color}}>{cls.label}</span>
                      <span style={{width:3,height:3,borderRadius:'50%',background:'var(--ink-4)'}}></span>{t.name}
                      <span style={{width:3,height:3,borderRadius:'50%',background:'var(--ink-4)'}}></span>{d.words} words
                      <span style={{width:3,height:3,borderRadius:'50%',background:'var(--ink-4)'}}></span>edited {d.edited}
                    </div>
                  </div>
                  <div style={{width:120,flex:'none'}}>
                    <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'var(--ink-3)',marginBottom:4}}><span>Draft</span><span style={{fontWeight:600,color:'var(--ink-2)'}}>{d.progress}%</span></div>
                    <div style={{height:6,background:'#EEF2F7',borderRadius:4,overflow:'hidden'}}><div style={{width:d.progress+'%',height:'100%',background:'var(--logo-grad)',borderRadius:4}}></div></div>
                  </div>
                  <AvatarStack ids={d.collab} size={24} max={3}/>
                  <Icon name="chevron_right" size={16} style={{color:'var(--ink-4)',flex:'none'}}/>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const ASSIST=[
  {label:'Draft the bottom line', icon:'sparkle', ins:'\n\nBOTTOM LINE: We assess with moderate confidence that activity in the sector reflects a deliberate shift rather than seasonal variation.\n'},
  {label:'Insert a source line', icon:'paperclip', ins:'\n[Source: field report FR-2291, imagery pass IMG-0473 — corroborating]\n'},
  {label:'Suggest a confidence note', icon:'shield', ins:'\nConfidence is moderate, constrained by gaps in recent reporting.\n'},
  {label:'Tighten this paragraph', icon:'pen', flash:'Tightened — removed 2 hedges and 14 words'},
];

function PrepEditor({cfg, onBack, setPage, flash}){
  const t=cfg.tmpl, d=cfg.draft;
  const [title,setTitle]=React.useState(d?d.title:'Untitled '+t.name);
  const [cls,setCls]=React.useState(d?d.cls:'CUI');
  const [active,setActive]=React.useState(0);
  const [body,setBody]=React.useState(()=>t.sections.map(()=> ''));
  const taRef=React.useRef(null);

  function setSec(v){ setBody(b=>b.map((x,i)=>i===active?v:x)); }
  function assist(a){
    if(a.flash){ flash&&flash(a.flash); return; }
    setBody(b=>b.map((x,i)=>i===active?(x+a.ins):x));
    flash&&flash('Inserted suggestion');
  }
  const clsC=P_CLS[cls];

  return (
    <div className="rise">
      <div style={{position:'sticky',top:'var(--header-h)',zIndex:40,background:'rgba(255,255,255,.85)',backdropFilter:'blur(10px)',borderBottom:'1px solid var(--line)'}}>
        <div className="page" style={{padding:'11px 28px',display:'flex',alignItems:'center',gap:14}}>
          <button onClick={onBack} className="btn btn-secondary btn-sm"><Icon name="chevron_left" size={15} sw={2.2}/>Prep</button>
          <span style={{width:1,height:24,background:'var(--line-2)'}}></span>
          <span style={{width:28,height:28,borderRadius:8,background:t.tint,color:t.color,display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name={t.icon} size={15}/></span>
          <div style={{minWidth:0,flex:1}}>
            <div style={{fontSize:13.5,fontWeight:600,color:'var(--ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{title}</div>
            <div className="muted" style={{fontSize:11.5}}>{t.name} · Draft</div>
          </div>
          <span style={{display:'flex',alignItems:'center',gap:6,fontSize:11.5,color:'var(--ink-3)',fontWeight:500}}><span style={{width:6,height:6,borderRadius:'50%',background:'#1F8A5B'}}></span>Auto-saved</span>
          <button className="btn btn-secondary btn-sm" onClick={()=>flash&&flash('Saved to drafts')}><Icon name="check" size={14}/>Save</button>
          <button className="btn btn-primary btn-sm" onClick={()=>{flash&&flash('Submitted to Memos for review');setPage('memos');}}><Icon name="send" size={14}/>Submit to review</button>
        </div>
      </div>

      <div className="page" style={{paddingTop:24,display:'grid',gridTemplateColumns:'190px minmax(0,1fr) 280px',gap:22,alignItems:'start',maxWidth:1280}}>
        {/* outline */}
        <div style={{position:'sticky',top:'calc(var(--header-h) + 16px)'}}>
          <div className="eyebrow" style={{marginBottom:10}}>Sections</div>
          <div style={{display:'flex',flexDirection:'column',gap:3}}>
            {t.sections.map((s,i)=>(
              <button key={s} onClick={()=>setActive(i)} style={{display:'flex',alignItems:'center',gap:9,border:0,background:active===i?'var(--blue-t)':'transparent',
                color:active===i?'var(--blue)':'var(--ink-2)',padding:'9px 11px',borderRadius:8,cursor:'pointer',textAlign:'left',fontSize:13,fontWeight:active===i?600:500,transition:'.12s'}}>
                <span style={{width:20,height:20,borderRadius:6,background:active===i?'var(--blue)':'var(--line)',color:active===i?'#fff':'var(--ink-3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,flex:'none'}}>{i+1}</span>
                <span style={{flex:1}}>{s}</span>
                {body[i].trim() && <Icon name="check" size={13} sw={2.6} style={{color:'#1F8A5B'}}/>}
              </button>
            ))}
          </div>
        </div>

        {/* editor */}
        <div className="card" style={{padding:0,overflow:'hidden',minHeight:560}}>
          <div style={{background:clsC.color,color:'#fff',textAlign:'center',fontSize:11,fontWeight:700,letterSpacing:'.12em',padding:'5px'}}>{clsC.label}</div>
          <div style={{padding:'30px 48px 40px'}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}>
              {Object.keys(P_CLS).map(k=>(
                <button key={k} onClick={()=>setCls(k)} className={'chip'+(cls===k?' on':'')} style={{height:26,fontSize:11.5}}>{k}</button>
              ))}
              <div style={{flex:1}}></div>
              <span className="muted" style={{fontSize:11.5,fontFamily:P_MONO}}>{(body.join(' ').trim().split(/\s+/).filter(Boolean).length)} words</span>
            </div>
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Memo title"
              style={{width:'100%',border:0,outline:'none',fontFamily:P_SERIF,fontSize:27,fontWeight:700,letterSpacing:'-.015em',color:'var(--ink)',background:'transparent',marginBottom:6}}/>
            <div style={{height:1,background:'var(--line)',margin:'10px 0 22px'}}></div>
            <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:12}}>
              <span style={{fontFamily:P_MONO,fontSize:11,fontWeight:700,letterSpacing:'.08em',color:t.color,textTransform:'uppercase'}}>{active+1}. {t.sections[active]}</span>
            </div>
            <textarea ref={taRef} value={body[active]} onChange={e=>setSec(e.target.value)} autoFocus
              placeholder={`Write the “${t.sections[active]}” section…`}
              style={{width:'100%',minHeight:300,border:0,outline:'none',resize:'vertical',fontFamily:P_SERIF,fontSize:16.5,lineHeight:1.72,color:'#2A2C30',background:'transparent'}}/>
          </div>
        </div>

        {/* assist */}
        <div style={{position:'sticky',top:'calc(var(--header-h) + 16px)',display:'flex',flexDirection:'column',gap:14}}>
          <div className="card card-pad">
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
              <span style={{width:26,height:26,borderRadius:8,background:'var(--violet-t)',color:'var(--violet)',display:'flex',alignItems:'center',justifyContent:'center'}}><Icon name="sparkle" size={15}/></span>
              <span style={{fontSize:13.5,fontWeight:700,color:'var(--ink)'}}>Drafting assist</span>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:7}}>
              {ASSIST.map(a=>(
                <button key={a.label} onClick={()=>assist(a)} style={{display:'flex',alignItems:'center',gap:10,border:'1px solid var(--line)',background:'#fff',
                  padding:'10px 11px',borderRadius:9,cursor:'pointer',textAlign:'left',transition:'.12s'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--violet)';e.currentTarget.style.background='var(--violet-t)';}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--line)';e.currentTarget.style.background='#fff';}}>
                  <Icon name={a.icon} size={15} style={{color:'var(--violet)',flex:'none'}}/>
                  <span style={{fontSize:12.5,fontWeight:550,color:'var(--ink-2)'}}>{a.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="card card-pad" style={{background:'var(--surface-2)'}}>
            <div className="eyebrow" style={{marginBottom:8}}>Pre-flight checks</div>
            {[['Classification set',true],['All sections filled',body.every(b=>b.trim())],['Sourcing present',body.join('').includes('Source')]].map(([l,ok])=>(
              <div key={l} style={{display:'flex',alignItems:'center',gap:9,padding:'5px 0',fontSize:12.5,color:'var(--ink-2)'}}>
                <span style={{width:18,height:18,borderRadius:'50%',background:ok?'#E4F4F0':'#EFF2F6',color:ok?'#1F8A5B':'var(--ink-4)',display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name={ok?'check':'x'} size={11} sw={3}/></span>
                {l}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PrepWorkspace });
