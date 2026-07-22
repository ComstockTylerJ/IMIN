// experimental.jsx — in-app "this is experimental" visual language + live examples.
// A single recognizable identity (beaker glyph, Labs-purple) marks any feature that
// comes from Labs, wherever it surfaces in the product — so users always know.

// ---- experimental accent (distinct from blue=accent, gold=warning) ----
const LAB_PURPLE   = '#6D5CC6';
const LAB_PURPLE_D = '#57499E';
const LAB_TINT     = '#EFECFB';
const LAB_BORDER   = '#D8CFF3';

(function injectLabStyles(){
  if(document.getElementById('exp-styles')) return;
  const s=document.createElement('style'); s.id='exp-styles';
  s.textContent = `
    @keyframes expGlow{0%,100%{box-shadow:0 0 0 0 rgba(109,92,198,.0);}50%{box-shadow:0 0 0 3px rgba(109,92,198,.10);}}
    .exp-wrap{position:relative;border:1px dashed ${LAB_BORDER};border-radius:var(--radius-xl);background:
      linear-gradient(180deg, rgba(239,236,251,.5), rgba(239,236,251,0) 120px);}
    .exp-tag{display:inline-flex;align-items:center;gap:5px;height:20px;padding:0 8px 0 6px;border-radius:999px;
      background:${LAB_TINT};color:${LAB_PURPLE_D};border:1px solid ${LAB_BORDER};
      font-size:10.5px;font-weight:700;letter-spacing:.03em;text-transform:uppercase;white-space:nowrap;flex:none;}
    .exp-marker{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:7px;
      background:${LAB_TINT};color:${LAB_PURPLE};border:1px solid ${LAB_BORDER};cursor:help;flex:none;transition:.14s;}
    .exp-marker:hover{background:#E6E1F8;color:${LAB_PURPLE_D};}
    .exp-pop{position:absolute;z-index:600;width:250px;background:#fff;border:1px solid var(--line);border-radius:12px;
      box-shadow:var(--shadow-lg);padding:13px 14px;}
    .cmdk-item.on{background:${LAB_TINT};}
  `;
  document.head.appendChild(s);
})();

// ---- state hook: a feature is "active" only when enrolled AND toggled on ----
function labActive(id){
  try{
    if(localStorage.getItem('imin_labs_enrolled')!=='1') return false;
    const f=JSON.parse(localStorage.getItem('imin_labs_features')||'{}');
    return !!f[id];
  }catch(e){ return false; }
}
function useLab(id){
  const [on,setOn]=React.useState(()=>labActive(id));
  React.useEffect(()=>{
    const h=()=>setOn(labActive(id));
    window.addEventListener('labs:change',h);
    window.addEventListener('storage',h);
    return ()=>{ window.removeEventListener('labs:change',h); window.removeEventListener('storage',h); };
  },[id]);
  return on;
}
function labStage(id){ const f=(window.LAB_FEATURE_BY_ID||{})[id]; return f? (LAB_STATUS[f.status]||{}).label : 'Experimental'; }
function labName(id){ const f=(window.LAB_FEATURE_BY_ID||{})[id]; return f? f.name : 'Experimental feature'; }
function openLabs(){ window.__setPage && window.__setPage('labs'); }
function turnOffLab(id){
  try{
    const f=JSON.parse(localStorage.getItem('imin_labs_features')||'{}');
    delete f[id]; localStorage.setItem('imin_labs_features', JSON.stringify(f));
    window.broadcastLabs && window.broadcastLabs();
  }catch(e){}
}

// ---- inline pill: "⚗ BETA" — sits next to a feature label ----
function ExpTag({id, label}){
  return <span className="exp-tag"><Icon name="beaker" size={12} sw={1.9}/>{label||labStage(id)}</span>;
}

// ---- compact icon marker with hover/click explainer — for dense spots ----
function ExpMarker({id, place='bottom'}){
  const [open,setOpen]=React.useState(false);
  const ref=React.useRef(null);
  React.useEffect(()=>{
    if(!open) return;
    const h=(e)=>{ if(ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown',h); return ()=>document.removeEventListener('mousedown',h);
  },[open]);
  const pos = place==='top'
    ? {bottom:'calc(100% + 8px)', right:0}
    : {top:'calc(100% + 8px)', right:0};
  return (
    <span ref={ref} style={{position:'relative',display:'inline-flex'}}>
      <span className="exp-marker" title="Experimental feature" onMouseEnter={()=>setOpen(true)}
        onClick={(e)=>{e.stopPropagation();setOpen(o=>!o);}}>
        <Icon name="beaker" size={13} sw={1.8}/>
      </span>
      {open && (
        <span className="exp-pop pop" style={pos} onMouseLeave={()=>setOpen(false)} onClick={e=>e.stopPropagation()}>
          <ExpExplainer id={id}/>
        </span>
      )}
    </span>
  );
}

// shared explainer body used by marker popover + banner
function ExpExplainer({id, compact}){
  return (
    <React.Fragment>
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:7}}>
        <span style={{width:26,height:26,borderRadius:8,background:LAB_TINT,color:LAB_PURPLE,display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name="beaker" size={15}/></span>
        <div style={{minWidth:0}}>
          <div style={{fontSize:12.5,fontWeight:700,color:'var(--ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{labName(id)}</div>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:'.05em',textTransform:'uppercase',color:LAB_PURPLE_D}}>Labs · {labStage(id)}</div>
        </div>
      </div>
      <p style={{margin:'0 0 10px',fontSize:11.75,lineHeight:1.5,color:'var(--ink-2)',textWrap:'pretty'}}>
        An experimental feature from Labs. It may change, misbehave, or be removed, and might never ship.
      </p>
      <div style={{display:'flex',gap:8}}>
        <button className="btn btn-secondary btn-sm" style={{flex:1}} onClick={openLabs}><Icon name="sliders" size={13}/>Manage in Labs</button>
        <button className="btn btn-ghost btn-sm" onClick={()=>turnOffLab(id)}>Turn off</button>
      </div>
    </React.Fragment>
  );
}

// ---- full banner: sits at the top of an experimental panel/feature ----
function ExpBanner({id}){
  return (
    <div style={{display:'flex',alignItems:'center',gap:12,padding:'10px 14px',borderBottom:`1px dashed ${LAB_BORDER}`,
      background:LAB_TINT}}>
      <span style={{width:30,height:30,borderRadius:9,background:'#fff',color:LAB_PURPLE,border:`1px solid ${LAB_BORDER}`,display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name="beaker" size={17}/></span>
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <span style={{fontSize:12.5,fontWeight:700,color:'var(--ink)'}}>Experimental</span>
          <ExpTag id={id}/>
        </div>
        <div style={{fontSize:11.5,color:'var(--ink-2)',marginTop:1}}>Part of Labs — may change, break, or be removed at any time.</div>
      </div>
      <button className="btn btn-secondary btn-sm" onClick={openLabs}><Icon name="sliders" size={13}/>Manage in Labs</button>
      <button className="btn btn-ghost btn-icon btn-sm" title="Turn off" onClick={()=>turnOffLab(id)}><Icon name="x" size={15}/></button>
    </div>
  );
}

/* ================= LIVE IN-APP EXAMPLES ================= */

// EXAMPLE 1 — Semantic evidence search (Beta): a whole experimental panel, banner pattern.
function ExpSemanticSearch(){
  const on = useLab('semantic_search');
  const [q,setQ]=React.useState('');
  if(!on) return null;
  const chips=['Who financed the Rotterdam shipments?','Devices co-located with SBJ-4471-K','Payments over €50k since March'];
  return (
    <div className="exp-wrap" style={{overflow:'hidden',marginBottom:20}}>
      <ExpBanner id="semantic_search"/>
      <div style={{padding:'16px 18px'}}>
        <div style={{display:'flex',alignItems:'center',gap:11,border:'1px solid var(--line-2)',borderRadius:11,padding:'11px 14px',background:'#fff',boxShadow:'var(--shadow-sm)'}}>
          <Icon name="sparkle" size={18} style={{color:LAB_PURPLE,flex:'none'}}/>
          <input value={q} onChange={e=>setQ(e.target.value)}
            placeholder="Ask across all evidence in plain language…"
            style={{flex:1,border:0,outline:0,fontSize:14,fontFamily:'inherit',background:'transparent',color:'var(--ink)'}}
            onKeyDown={e=>{ if(e.key==='Enter'){ window.__runAISearch && window.__runAISearch(q||chips[0]); } }}/>
          <button className="btn btn-sm" style={{background:LAB_PURPLE,color:'#fff'}} onClick={()=>window.__runAISearch&&window.__runAISearch(q||chips[0])}>Search<Icon name="arrow_right" size={13}/></button>
        </div>
        <div style={{display:'flex',gap:8,marginTop:12,flexWrap:'wrap'}}>
          {chips.map(c=>(
            <button key={c} onClick={()=>{setQ(c);window.__runAISearch&&window.__runAISearch(c);}}
              style={{border:`1px solid ${LAB_BORDER}`,background:'#fff',color:'var(--ink-2)',fontSize:12,fontWeight:500,
                padding:'6px 11px',borderRadius:999,cursor:'pointer',fontFamily:'inherit'}}>{c}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Host for dashboard-level experimental examples (extend as more features graduate)
function InAppExperiments(){
  return <ExpSemanticSearch/>;
}

// EXAMPLE 3 — Command palette (Beta): a functional experimental feature, ⌘K.
const CMDK_ITEMS = [
  {label:'Dashboard', icon:'grid', hint:'Go', run:()=>window.__setPage&&window.__setPage('dashboard')},
  {label:'Explore', icon:'search', hint:'Go', run:()=>window.__setPage&&window.__setPage('explore')},
  {label:'Tasks', icon:'check_square', hint:'Go', run:()=>window.__setPage&&window.__setPage('tasks')},
  {label:'Metrics', icon:'chart', hint:'Go', run:()=>window.__setPage&&window.__setPage('metrics')},
  {label:'Tools', icon:'tools', hint:'Go', run:()=>window.__setPage&&window.__setPage('tools')},
  {label:'Term base', icon:'book', hint:'Go', run:()=>window.__setPage&&window.__setPage('termbase')},
  {label:'Clearance', icon:'megaphone', hint:'Workspace', run:()=>window.__setPage&&window.__setPage('clearance')},
  {label:'Memos', icon:'route', hint:'Workspace', run:()=>window.__setPage&&window.__setPage('memos')},
  {label:'Review queue', icon:'shield', hint:'Workspace', run:()=>window.__setPage&&window.__setPage('review')},
  {label:'Labs', icon:'beaker', hint:'Beta', run:()=>window.__setPage&&window.__setPage('labs')},
  {label:'Ask Donovan', icon:'message', hint:'AI', run:()=>window.__openAskAI&&window.__openAskAI()},
  {label:'Delegate to agent', icon:'sparkle', hint:'AI', run:()=>window.__openKickoff&&window.__openKickoff()},
];
function CommandPalette(){
  const enabled = useLab('command_palette');
  const [open,setOpen]=React.useState(false);
  const [q,setQ]=React.useState('');
  const [sel,setSel]=React.useState(0);
  const inputRef=React.useRef(null);

  React.useEffect(()=>{
    function key(e){
      if((e.metaKey||e.ctrlKey) && e.key.toLowerCase()==='k'){
        if(!labActive('command_palette')) return; // silently inert when off
        e.preventDefault(); setOpen(o=>!o);
      } else if(e.key==='Escape'){ setOpen(false); }
    }
    function openEvt(){ if(labActive('command_palette')) setOpen(true); }
    window.addEventListener('keydown',key);
    window.addEventListener('cmdk:open',openEvt);
    return ()=>{ window.removeEventListener('keydown',key); window.removeEventListener('cmdk:open',openEvt); };
  },[]);
  React.useEffect(()=>{ if(!enabled) setOpen(false); },[enabled]);
  React.useEffect(()=>{ if(open){ setQ(''); setSel(0); setTimeout(()=>inputRef.current&&inputRef.current.focus(),30); } },[open]);

  if(!open) return null;
  const ql=q.trim().toLowerCase();
  const list = ql? CMDK_ITEMS.filter(i=>i.label.toLowerCase().includes(ql)) : CMDK_ITEMS;
  const run=(it)=>{ setOpen(false); it && it.run && it.run(); };

  return (
    <div style={{position:'fixed',inset:0,zIndex:500,display:'flex',alignItems:'flex-start',justifyContent:'center',paddingTop:'12vh'}}
      onMouseDown={()=>setOpen(false)}>
      <div style={{position:'fixed',inset:0,background:'rgba(36,39,45,.34)',backdropFilter:'blur(2px)',animation:'fade .16s'}}></div>
      <div className="pop card" style={{position:'relative',width:'min(600px,94vw)',borderRadius:14,overflow:'hidden',boxShadow:'var(--shadow-lg)'}}
        onMouseDown={e=>e.stopPropagation()}>
        <div style={{display:'flex',alignItems:'center',gap:11,padding:'14px 16px',borderBottom:'1px solid var(--line)'}}>
          <Icon name="search" size={18} style={{color:'var(--ink-3)',flex:'none'}}/>
          <input ref={inputRef} value={q}
            onChange={e=>{setQ(e.target.value);setSel(0);}}
            onKeyDown={e=>{
              if(e.key==='ArrowDown'){e.preventDefault();setSel(s=>Math.min(s+1,list.length-1));}
              else if(e.key==='ArrowUp'){e.preventDefault();setSel(s=>Math.max(s-1,0));}
              else if(e.key==='Enter'){e.preventDefault();run(list[sel]);}
            }}
            placeholder="Jump to a page or run an action…"
            style={{flex:1,border:0,outline:0,fontSize:15,fontFamily:'inherit',background:'transparent',color:'var(--ink)'}}/>
          <ExpTag id="command_palette"/>
        </div>
        <div style={{maxHeight:340,overflowY:'auto',padding:6}}>
          {list.length===0 && <div className="muted" style={{padding:'22px',textAlign:'center',fontSize:13}}>No matches</div>}
          {list.map((it,i)=>(
            <button key={it.label} className={'cmdk-item'+(i===sel?' on':'')} onMouseEnter={()=>setSel(i)} onClick={()=>run(it)}
              style={{display:'flex',alignItems:'center',gap:12,width:'100%',padding:'10px 11px',border:0,background:i===sel?LAB_TINT:'transparent',borderRadius:9,textAlign:'left',cursor:'pointer'}}>
              <span style={{width:30,height:30,borderRadius:8,background:'var(--hover)',color:'var(--ink-2)',display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name={it.icon} size={16}/></span>
              <span style={{flex:1,fontSize:13.5,fontWeight:550,color:'var(--ink)'}}>{it.label}</span>
              <span className="muted" style={{fontSize:11}}>{it.hint}</span>
            </button>
          ))}
        </div>
        <div style={{display:'flex',alignItems:'center',gap:8,padding:'9px 14px',borderTop:'1px solid var(--line)',background:LAB_TINT}}>
          <Icon name="beaker" size={14} style={{color:LAB_PURPLE}}/>
          <span style={{fontSize:11.5,color:LAB_PURPLE_D,fontWeight:550}}>Experimental Labs feature · may change or break</span>
          <div style={{flex:1}}></div>
          <span className="linkish" style={{fontSize:11.5}} onClick={()=>run({run:openLabs})}>Manage</span>
        </div>
      </div>
    </div>
  );
}

// header entry that appears only when the palette is enabled
function CommandPaletteEntry(){
  const on = useLab('command_palette');
  if(!on) return null;
  const mac = typeof navigator!=='undefined' && /Mac/.test(navigator.platform);
  return (
    <button className="navlink" title="Command palette (experimental)"
      onClick={()=>window.dispatchEvent(new CustomEvent('cmdk:open'))}
      style={{height:34,gap:8,padding:'0 10px',border:`1px solid ${LAB_BORDER}`,background:LAB_TINT}}>
      <Icon name="beaker" size={15} style={{color:LAB_PURPLE}}/>
      <span className="kbd" style={{borderColor:LAB_BORDER,color:LAB_PURPLE_D}}>{mac?'\u2318':'Ctrl'} K</span>
    </button>
  );
}

// mounted once, globally
function ExperimentalGlobal(){
  return <CommandPalette/>;
}

// gated helpers — render marker only when the feature is active
function ExpTagIf({id, label}){ return useLab(id) ? <ExpTag id={id} label={label}/> : null; }
function ExpMarkerIf({id, place}){ return useLab(id) ? <ExpMarker id={id} place={place}/> : null; }

Object.assign(window, {
  useLab, labActive, ExpTag, ExpMarker, ExpTagIf, ExpMarkerIf, ExpBanner, ExpExplainer, ExpSemanticSearch,
  InAppExperiments, CommandPalette, CommandPaletteEntry, ExperimentalGlobal,
  LAB_PURPLE, LAB_TINT, LAB_BORDER,
});
