// labs.jsx — Labs / beta feature opt-in workspace
const LAB_STATUS = {
  alpha:        {label:'Alpha',        tint:'var(--coral-t)',  color:'var(--coral)'},
  beta:         {label:'Beta',         tint:'var(--blue-t)',   color:'var(--blue)'},
  experimental: {label:'Experimental', tint:'var(--orange-t)', color:'var(--orange)'},
};

const LAB_GROUPS = [
  {
    cat:'AI & Agents',
    icon:'sparkle',
    features:[
      {id:'autonomous_agents', name:'Autonomous agent runs', status:'alpha', icon:'route',
        desc:'Let agents complete multi-step missions end-to-end without pausing at approval gates. You review only the final result.',
        note:'Skips human-in-the-loop checkpoints — not recommended on active matters.'},
      {id:'semantic_search', name:'Semantic evidence search', status:'beta', icon:'search',
        desc:'Ask questions in plain language across every document, device and transcript. Ranks by meaning, not just keywords.'},
      {id:'auto_memos', name:'Auto-drafted memos', status:'alpha', icon:'pen',
        desc:'Generate a first-draft legal memo from a briefing packet, complete with citations to source exhibits.',
        note:'Drafts require attorney review before use.'},
    ],
  },
  {
    cat:'Review & Analysis',
    icon:'shield',
    features:[
      {id:'privilege_detect', name:'Smart privilege detection', status:'beta', icon:'shield_check',
        desc:'Automatically flags likely attorney-client privileged material in the review queue as documents are ingested.'},
      {id:'predictive_coding', name:'Predictive coding suggestions', status:'experimental', icon:'target',
        desc:'Learns from your relevance calls and pre-suggests coding decisions on the rest of the set.',
        note:'Accuracy improves after ~200 manual codes.'},
      {id:'timeline_recon', name:'Timeline reconstruction', status:'alpha', icon:'history',
        desc:'Builds an interactive chronology of events automatically from dates found across evidence and communications.'},
    ],
  },
  {
    cat:'Workspace & Productivity',
    icon:'sliders',
    features:[
      {id:'command_palette', name:'Command palette', status:'beta', icon:'code',
        desc:'Press \u2318K anywhere to jump to any workspace, task or record and run quick actions without the mouse.'},
      {id:'voice_dictation', name:'Voice dictation', status:'beta', icon:'mic',
        desc:'Dictate memos and notes with on-device transcription and automatic term-base formatting.'},
      {id:'live_cursors', name:'Live collaboration cursors', status:'experimental', icon:'users',
        desc:'See teammates\u2019 cursors and selections in real time while co-editing a workspace.',
        note:'May affect performance on large boards.'},
    ],
  },
];

const ALL_LAB_FEATURES = LAB_GROUPS.flatMap(g=>g.features);
const LAB_FEATURE_BY_ID = Object.fromEntries(ALL_LAB_FEATURES.map(f=>[f.id, f]));
function broadcastLabs(){ try{ window.dispatchEvent(new CustomEvent('labs:change')); }catch(e){} }

function LabToggle({on, onChange, disabled, size='md'}){
  const w = size==='lg'?52:42, h = size==='lg'?30:24, k = h-4, tx = on?(w-h+2):2;
  return (
    <button role="switch" aria-checked={on} disabled={disabled} onClick={()=>!disabled&&onChange(!on)}
      style={{position:'relative',width:w,height:h,borderRadius:999,border:0,padding:0,flex:'none',
        background:on?'var(--accent)':'var(--line-2)',opacity:disabled?.4:1,
        cursor:disabled?'not-allowed':'pointer',transition:'background .22s cubic-bezier(.2,.8,.3,1)'}}>
      <span style={{position:'absolute',top:2,left:tx,width:k,height:k,borderRadius:'50%',background:'#fff',
        boxShadow:'0 1px 3px rgba(15,23,42,.3)',transition:'left .22s cubic-bezier(.2,.8,.3,1)'}}></span>
    </button>
  );
}

function LabStatusPill({status}){
  const s = LAB_STATUS[status];
  return <span className="badge" style={{background:s.tint,color:s.color,height:20,fontSize:10.5,fontWeight:600,letterSpacing:'.02em',textTransform:'uppercase'}}>{s.label}</span>;
}

function FeatureCard({f, on, enrolled, onToggle}){
  return (
    <div className="card card-pad" style={{display:'flex',gap:14,alignItems:'flex-start',
      borderColor:on&&enrolled?'var(--accent)':'var(--line)',
      boxShadow:on&&enrolled?'0 0 0 1px var(--accent), var(--shadow-sm)':'var(--shadow-sm)',
      opacity:enrolled?1:.62,transition:'border-color .18s, box-shadow .18s, opacity .18s'}}>
      <span style={{width:38,height:38,borderRadius:10,flex:'none',display:'flex',alignItems:'center',justifyContent:'center',
        background:on&&enrolled?'var(--accent-subtle)':'var(--hover)',color:on&&enrolled?'var(--accent)':'var(--ink-2)',transition:'.18s'}}>
        <Icon name={f.icon} size={19}/>
      </span>
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:3}}>
          <span style={{fontSize:14,fontWeight:600,color:'var(--ink)'}}>{f.name}</span>
          <LabStatusPill status={f.status}/>
        </div>
        <p style={{margin:0,fontSize:12.75,lineHeight:1.5,color:'var(--ink-2)',textWrap:'pretty'}}>{f.desc}</p>
        {f.note && (
          <div style={{display:'flex',alignItems:'center',gap:6,marginTop:8,fontSize:11.5,color:'var(--warning-text)',fontWeight:500}}>
            <Icon name="alert" size={13} style={{flex:'none'}}/>
            <span>{f.note}</span>
          </div>
        )}
      </div>
      <div style={{paddingTop:2}}>
        <LabToggle on={on} disabled={!enrolled} onChange={v=>onToggle(f, v)}/>
      </div>
    </div>
  );
}

function LabsPage({setPage, flash}){
  const [enrolled, setEnrolled] = React.useState(()=>{ try{ return localStorage.getItem('imin_labs_enrolled')==='1'; }catch(e){ return false; } });
  const [feats, setFeats] = React.useState(()=>{ try{ return JSON.parse(localStorage.getItem('imin_labs_features')||'{}'); }catch(e){ return {}; } });

  React.useEffect(()=>{ try{ localStorage.setItem('imin_labs_enrolled', enrolled?'1':'0'); }catch(e){} }, [enrolled]);
  React.useEffect(()=>{ try{ localStorage.setItem('imin_labs_features', JSON.stringify(feats)); }catch(e){} }, [feats]);

  const enabledCount = ALL_LAB_FEATURES.filter(f=>feats[f.id]).length;

  function toggleEnroll(v){
    setEnrolled(v);
    broadcastLabs();
    flash && flash(v?'You\u2019re in \u2014 experimental features unlocked':'Left the Labs program');
  }
  function toggleFeature(f, v){
    setFeats(prev=>({...prev, [f.id]:v}));
    broadcastLabs();
    flash && flash((v?'Enabled':'Disabled')+' \u00B7 '+f.name);
  }
  function disableAll(){
    setFeats({});
    broadcastLabs();
    flash && flash('All experimental features turned off');
  }

  return (
    <div className="rise">
      {/* hero */}
      <div style={{position:'relative',overflow:'hidden',borderBottom:'1px solid var(--line)',background:'rgba(255,255,255,.4)'}}>
        <HeroPattern opacity={0.7}/>
        <div className="page" style={{position:'relative',zIndex:1,paddingTop:34,paddingBottom:28}}>
          <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',gap:20,flexWrap:'wrap'}}>
            <div style={{display:'flex',gap:18,alignItems:'center'}}>
              <span style={{width:56,height:56,borderRadius:16,flex:'none',display:'flex',alignItems:'center',justifyContent:'center',
                background:'linear-gradient(150deg,#1D3557,#0073E6)',color:'#fff',boxShadow:'0 8px 22px rgba(0,115,230,.28)'}}>
                <Icon name="beaker" size={28} sw={1.6}/>
              </span>
              <div>
                <div className="eyebrow" style={{marginBottom:6}}>Beta Program</div>
                <h1 style={{fontSize:26,fontWeight:700,letterSpacing:'-.03em',margin:0,color:'var(--ink)'}}>Labs</h1>
                <p className="sec" style={{fontSize:14,margin:'5px 0 0'}}>Try experimental features before they ship — and help decide what does.</p>
              </div>
            </div>
            <div style={{display:'flex',gap:10,alignItems:'center'}}>
              {enrolled && enabledCount>0 && (
                <button className="btn btn-secondary btn-sm" onClick={disableAll}><Icon name="x" size={14}/>Turn all off</button>
              )}
              <span className="badge" style={{background:enrolled?'var(--success-t)':'var(--hover)',color:enrolled?'var(--success)':'var(--ink-3)',height:26,padding:'0 11px',fontSize:12}}>
                <span className="dot" style={{background:enrolled?'var(--success)':'var(--ink-4)'}}></span>
                {enrolled? (enabledCount+' active') : 'Not enrolled'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="page" style={{paddingTop:24,display:'grid',gridTemplateColumns:'minmax(0,1fr) 316px',gap:24,alignItems:'start'}}>
        {/* main column */}
        <div style={{display:'flex',flexDirection:'column',gap:22}}>
          {/* enrollment / disclaimer card */}
          <div className="card" style={{overflow:'hidden',borderColor:enrolled?'var(--accent)':'var(--line-2)',
            boxShadow:enrolled?'0 0 0 1px var(--accent), var(--shadow)':'var(--shadow)'}}>
            <div style={{display:'flex',alignItems:'center',gap:16,padding:'18px 20px',
              background:enrolled?'var(--accent-subtle)':'var(--surface-2)',borderBottom:'1px solid var(--line)'}}>
              <span style={{width:40,height:40,borderRadius:11,flex:'none',display:'flex',alignItems:'center',justifyContent:'center',
                background:enrolled?'var(--accent)':'#fff',color:enrolled?'#fff':'var(--ink-2)',border:enrolled?'0':'1px solid var(--line-2)'}}>
                <Icon name={enrolled?'check':'flask'} size={20} sw={enrolled?3:1.7}/>
              </span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:15,fontWeight:650,color:'var(--ink)'}}>{enrolled?'You\u2019re in the Labs program':'Join the Labs program'}</div>
                <div style={{fontSize:12.75,color:'var(--ink-2)',marginTop:1}}>{enrolled?'Toggle individual features on or off below.':'Opt in to unlock the experimental features on this page.'}</div>
              </div>
              <LabToggle on={enrolled} size="lg" onChange={toggleEnroll}/>
            </div>
            <div style={{padding:'16px 20px 18px'}}>
              <div style={{fontSize:12.5,fontWeight:600,color:'var(--ink-2)',marginBottom:11,display:'flex',alignItems:'center',gap:7}}>
                <Icon name="alert" size={15} style={{color:'var(--warning-text)'}}/>Before you opt in
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px 22px'}}>
                {[
                  ['sync','Rough around the edges','Features here are under active development. They can change, misbehave, or be removed without notice.'],
                  ['route','May never ship','Experiments are how we learn what works. Some graduate to the product; many don\u2019t.'],
                  ['database','Runs on live data','You\u2019re working with real matters. Use judgment before enabling anything on active, sensitive work.'],
                  ['sliders','Reversible anytime','Flip any switch off and the feature disappears immediately. Nothing here is permanent.'],
                ].map(([ic,t,d])=>(
                  <div key={t} style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                    <span style={{color:'var(--ink-3)',marginTop:1,flex:'none'}}><Icon name={ic} size={15}/></span>
                    <div>
                      <div style={{fontSize:12.75,fontWeight:600,color:'var(--ink)'}}>{t}</div>
                      <div style={{fontSize:12,lineHeight:1.5,color:'var(--ink-3)',marginTop:1,textWrap:'pretty'}}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* feature groups */}
          {LAB_GROUPS.map(g=>(
            <div key={g.cat}>
              <SectionHead title={g.cat} icon={g.icon}
                sub={g.features.filter(f=>feats[f.id]).length+' of '+g.features.length+' on'}/>
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                {g.features.map(f=>(
                  <FeatureCard key={f.id} f={f} on={!!feats[f.id]} enrolled={enrolled} onToggle={toggleFeature}/>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* sidebar */}
        <aside style={{position:'sticky',top:'calc(var(--header-h) + 40px)',display:'flex',flexDirection:'column',gap:16}}>
          <div className="card card-pad">
            <div style={{fontSize:13.5,fontWeight:650,color:'var(--ink)',marginBottom:6}}>What is Labs?</div>
            <p style={{margin:0,fontSize:12.5,lineHeight:1.55,color:'var(--ink-2)',textWrap:'pretty'}}>
              A preview shelf for capabilities the team is still building. Opting in lets you test them on your real work and shape where they go next.
            </p>
            <div className="divider" style={{margin:'14px 0'}}></div>
            <div style={{display:'flex',flexDirection:'column',gap:11}}>
              {[
                [LAB_STATUS.alpha,'Early, unstable, may break'],
                [LAB_STATUS.beta,'Working, still being refined'],
                [LAB_STATUS.experimental,'A concept we\u2019re testing'],
              ].map(([s,d])=>(
                <div key={s.label} style={{display:'flex',alignItems:'center',gap:10}}>
                  <span className="badge" style={{background:s.tint,color:s.color,height:20,fontSize:10.5,fontWeight:600,textTransform:'uppercase',minWidth:82,justifyContent:'center'}}>{s.label}</span>
                  <span style={{fontSize:12,color:'var(--ink-2)'}}>{d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card card-pad" style={{background:'var(--surface-2)'}}>
            <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:7}}>
              <span style={{color:'var(--accent)'}}><Icon name="megaphone" size={17}/></span>
              <span style={{fontSize:13.5,fontWeight:650,color:'var(--ink)'}}>Tell us what you think</span>
            </div>
            <p style={{margin:'0 0 12px',fontSize:12.5,lineHeight:1.55,color:'var(--ink-2)',textWrap:'pretty'}}>
              Your feedback on these experiments directly decides what graduates to the platform.
            </p>
            <button className="btn btn-secondary btn-sm" style={{width:'100%'}} onClick={()=>flash&&flash('Feedback form coming soon')}>
              <Icon name="comment" size={14}/>Share feedback
            </button>
          </div>

          <div style={{fontSize:11.5,color:'var(--ink-3)',lineHeight:1.55,padding:'0 4px',textWrap:'pretty'}}>
            Questions about a feature? Reach the platform team in <span className="linkish">#mcaap-labs</span>.
          </div>
        </aside>
      </div>
    </div>
  );
}

Object.assign(window, { LabsPage, LabToggle, LAB_GROUPS, LAB_STATUS, LAB_FEATURE_BY_ID, ALL_LAB_FEATURES, broadcastLabs });
