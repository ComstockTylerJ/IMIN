// aisearch.jsx — AI Mode: a conversational answer page with narrative text,
// inline citations and linked sources (Perplexity-style), wired from the search bar's AI Mode.

const AI_ICON = {
  documents:{icon:'file',color:'#0073E6'}, images:{icon:'image',color:'#0EA5E9'}, videos:{icon:'video',color:'#B5851C'},
  emails:{icon:'mail',color:'#475569'}, audio:{icon:'audio',color:'#0073E6'}, code:{icon:'code',color:'#475569'}, other:{icon:'files',color:'#64748B'},
  collection:{icon:'folder',color:'#0073E6'}, subject:{icon:'user',color:'#DC2626'}, device:{icon:'phone',color:'#1D3557'},
};
function aiKind(k){ return AI_ICON[k] || AI_ICON.other; }

// build a deterministic, source-grounded answer for a query
function buildAnswer(q, h){
  h = h || {};
  const ql = (q||'').toLowerCase();
  const folders = (typeof FOLDERS!=='undefined') ? FOLDERS : [];
  const results = (typeof RESULTS!=='undefined') ? RESULTS : [];
  const subs = (typeof SUBJECTS!=='undefined') ? SUBJECTS : [];

  const tokens = ql.split(/\W+/).filter(w=>w.length>3);
  const matchScore = (s)=> tokens.reduce((n,w)=> n + (s.toLowerCase().includes(w)?1:0), 0);

  const folderA = folders.slice().sort((a,b)=>matchScore(b.name)-matchScore(a.name))[0] || folders[0];
  const folderB = folders.filter(f=>!folderA||f.id!==folderA.id).sort((a,b)=>matchScore(b.name)-matchScore(a.name))[0] || folders[1];
  const rankedDocs = results.slice().sort((a,b)=>matchScore(b.title+' '+b.snippet)-matchScore(a.title+' '+a.snippet));
  const docA = rankedDocs[0], docB = rankedDocs[1];
  const entity = subs.find(s=> tokens.length && tokens.some(w=> (s.name+' '+s.alias+' '+s.id).toLowerCase().includes(w)) );

  const person = (id)=> (typeof PEOPLE!=='undefined' && PEOPLE[id]) ? PEOPLE[id].name : id;
  const openFolder = (f)=>()=>{ if(h.setPage){ window.__reviewFolder=f.name; h.setPage('review'); } };
  const openDoc = (d)=>()=> h.flash && h.flash('Opening '+d.title+'\u2026');
  const openEntity = (e)=>()=> h.openEntity && h.openEntity(e.id);

  const sources = [];
  const S = (o)=>{ o.n = sources.length+1; sources.push(o); return o.n; };
  const c1 = folderA && S({ kind:'collection', title:folderA.name, meta:folderA.files+' files \u00b7 '+folderA.size+' \u00b7 '+folderA.types, snippet:'Owned by '+person(folderA.owner)+' \u00b7 updated '+folderA.updated, onOpen:openFolder(folderA) });
  const c2 = folderB && S({ kind:'collection', title:folderB.name, meta:folderB.files+' files \u00b7 '+folderB.size, snippet:'Owned by '+person(folderB.owner)+' \u00b7 updated '+folderB.updated, onOpen:openFolder(folderB) });
  const c3 = docA && S({ kind:docA.type, title:docA.title, meta:(docA.path?docA.path.join(' / '):'')+' \u00b7 '+docA.size, snippet:docA.snippet.replace(/^\u2026|\u2026$/g,''), onOpen:openDoc(docA) });
  const c4 = docB && S({ kind:docB.type, title:docB.title, meta:(docB.path?docB.path.join(' / '):'')+' \u00b7 '+docB.size, snippet:docB.snippet.replace(/^\u2026|\u2026$/g,''), onOpen:openDoc(docB) });
  const c5 = entity && S({ kind:'subject', title:entity.name, meta:entity.id+' \u00b7 '+entity.risk+' risk \u00b7 '+entity.status, snippet:'Assessed role: '+entity.role+'. Known aliases: '+entity.aliases.join(', ')+'.', onOpen:openEntity(entity) });

  const contribCount = new Set(results.map(r=>r.who)).size || 6;
  const totalFiles = (folderA?folderA.files:0) + (folderB?folderB.files:0);

  const paras = [];
  if(folderA){
    paras.push([
      'Across the ingested material, the strongest matches for \u201c', {q:true}, '\u201d cluster in the ',
      {cite:c1, text:folderA.name+' collection'}, ' \u2014 ', String(folderA.files), ' files spanning ', folderA.types,
      folderB ? [', with a second concentration in ', {cite:c2, text:folderB.name}, '.'] : '.',
    ].flat());
  }
  if(docA){
    paras.push([
      'The most relevant single item is ', {cite:c3, text:docA.title}, ' \u2014 ', lc(docA.snippet.replace(/^\u2026|\u2026$/g,'')),
      docB ? [' A related record, ', {cite:c4, text:docB.title}, ', ', lc(docB.snippet.replace(/^\u2026|\u2026$/g,'')) ] : '',
    ].flat());
  }
  if(entity){
    paras.push([
      '\u201c', {q:true}, '\u201d also resolves to a tracked entity: ', {cite:c5, text:entity.name+' ('+entity.id+')'},
      ', currently ', entity.status.toLowerCase(), ' at ', entity.risk.toLowerCase(), ' risk. Open the dossier for the full intelligence workup.',
    ]);
  } else {
    paras.push([
      'Coverage spans roughly ', String(contribCount), ' contributors. Two items in these records are routed for review before they can be relied on in a finished product',
      docA ? [' \u2014 see ', {cite:c3, text:docA.title}, '.'] : '.',
    ].flat());
  }

  const findings = [];
  if(folderA&&folderB) findings.push({ text:totalFiles+' files match across the '+folderA.name+' and '+folderB.name+' collections.', cites:[c1,c2] });
  if(docA) findings.push({ text:'Highest-relevance document: '+docA.title+'.', cites:[c3] });
  findings.push(entity ? { text:'1 tracked subject matches this query \u2014 '+entity.name+' ('+entity.risk+' risk).', cites:[c5] }
                       : { text:'2 items are flagged for legal review before filing.', cites:docA?[c3]:[] });

  const related = [
    'Who contributed most to \u201c'+q+'\u201d?',
    'Show only items flagged for review',
    folderA ? 'Summarize the '+folderA.name+' collection' : 'Summarize the top matches',
    entity ? 'Open '+entity.name+'\u2019s dossier' : 'What changed in the last 7 days?',
  ];

  return { paras, findings, sources, related, count:results.length||42 };
}
function lc(s){ return s ? s.charAt(0).toLowerCase()+s.slice(1) : s; }

// render a run of segments (strings, {q}, {cite,text})
function Segments({ segs, q, onCite }){
  return segs.map((s,i)=>{
    if(typeof s === 'string') return <React.Fragment key={i}>{s}</React.Fragment>;
    if(s.q) return <b key={i} style={{color:'var(--ink)',fontWeight:600}}>{q}</b>;
    if(s.cite) return <React.Fragment key={i}><b style={{color:'var(--ink)',fontWeight:600}}>{s.text}</b><CiteChip n={s.cite} onClick={()=>onCite&&onCite(s.cite)}/></React.Fragment>;
    return null;
  });
}
function CiteChip({ n, onClick }){
  return (
    <button onClick={onClick} title={'Source '+n} style={{display:'inline-flex',alignItems:'center',justifyContent:'center',minWidth:16,height:16,padding:'0 4px',
      margin:'0 2px',verticalAlign:'top',borderRadius:5,border:'1px solid var(--line-2)',background:'var(--surface-2)',color:'var(--blue)',
      fontSize:10,fontWeight:700,fontFamily:'ui-monospace,Menlo,monospace',cursor:'pointer',lineHeight:1,transform:'translateY(1px)'}}>{n}</button>
  );
}

function AIMessage({ q, first, ctx }){
  const ans = React.useMemo(()=>buildAnswer(q, ctx), [q]);
  const [analyzing,setAnalyzing]=React.useState(!!first ? true : true);
  const [hl,setHl]=React.useState(null);
  React.useEffect(()=>{ const t=setTimeout(()=>setAnalyzing(false), 850); return ()=>clearTimeout(t); },[]);
  function onCite(n){ setHl(n); clearTimeout(window.__aiHl); window.__aiHl=setTimeout(()=>setHl(null), 1600); }

  return (
    <div style={{marginBottom:34}}>
      {/* question */}
      <div style={{display:'flex',alignItems:'flex-start',gap:12,marginBottom:18}}>
        <span className="av" style={{width:30,height:30,background:(typeof PEOPLE!=='undefined'?PEOPLE.tyler.color:'#0073E6'),fontSize:12,flex:'none'}}>TC</span>
        <h1 style={{fontSize:22,fontWeight:700,letterSpacing:'-.02em',color:'var(--ink)',margin:0,lineHeight:1.3,paddingTop:2}}>{q}</h1>
      </div>

      {/* answer */}
      <div style={{display:'flex',gap:12}}>
        <span style={{width:30,height:30,flex:'none',borderRadius:9,background:'var(--logo-grad,linear-gradient(135deg,#0073E6,#7364C2,#E0648F))',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 2px 8px rgba(115,100,194,.3)'}}><Icon name="sparkle" size={16} style={{color:'#fff'}}/></span>
        <div style={{flex:1,minWidth:0}}>
          {analyzing ? (
            <div style={{display:'flex',flexDirection:'column',gap:11,paddingTop:5}}>
              <div style={{fontSize:13,color:'var(--violet)',fontWeight:600,display:'flex',alignItems:'center',gap:8,marginBottom:2}}>
                <Icon name="sparkle" size={14}/><span style={{animation:'blink 1.1s ease-in-out infinite'}}>Reading the top matches…</span>
              </div>
              {['96%','99%','78%'].map((w,i)=><div key={i} style={{height:11,width:w,borderRadius:5,background:'var(--surface-2)',position:'relative',overflow:'hidden'}}><div className="prog-sheen"></div></div>)}
            </div>
          ) : (
            <React.Fragment>
              <div style={{fontSize:15,lineHeight:1.72,color:'var(--ink-2)',textWrap:'pretty'}}>
                {ans.paras.map((p,i)=>(
                  <p key={i} style={{margin:i?'14px 0 0':0}}><Segments segs={p} q={q} onCite={onCite}/></p>
                ))}
              </div>

              {/* key findings */}
              <div style={{marginTop:20,border:'1px solid var(--line)',borderRadius:12,padding:'15px 17px',background:'var(--surface-2)'}}>
                <div className="eyebrow" style={{marginBottom:11}}>Key findings</div>
                <div style={{display:'flex',flexDirection:'column',gap:10}}>
                  {ans.findings.map((f,i)=>(
                    <div key={i} style={{display:'flex',gap:10,fontSize:13.5,color:'var(--ink-2)',lineHeight:1.5}}>
                      <span style={{width:6,height:6,borderRadius:'50%',background:'var(--blue)',flex:'none',marginTop:7}}></span>
                      <span>{f.text}{f.cites.map(n=><CiteChip key={n} n={n} onClick={()=>onCite(n)}/>)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* sources */}
              <div style={{marginTop:22}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
                  <span className="eyebrow">Sources</span>
                  <span className="badge" style={{background:'var(--surface-2)',color:'var(--ink-3)',border:'1px solid var(--line)',height:19,fontSize:10.5}}>{ans.sources.length}</span>
                  <span style={{flex:1,height:1,background:'var(--line)'}}></span>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                  {ans.sources.map(s=>{ const k=aiKind(s.kind), on=hl===s.n; return (
                    <button key={s.n} onClick={s.onOpen} style={{display:'flex',gap:11,alignItems:'flex-start',textAlign:'left',border:'1px solid '+(on?'var(--blue)':'var(--line)'),
                      background:on?'var(--blue-t)':'#fff',borderRadius:11,padding:'12px 13px',cursor:'pointer',transition:'.15s',boxShadow:on?'0 0 0 1px var(--blue)':'none'}}
                      onMouseEnter={e=>{ if(!on){e.currentTarget.style.borderColor='var(--line-2)';e.currentTarget.style.background='var(--surface-2)';} }}
                      onMouseLeave={e=>{ if(!on){e.currentTarget.style.borderColor='var(--line)';e.currentTarget.style.background='#fff';} }}>
                      <span style={{width:28,height:28,flex:'none',borderRadius:8,background:k.color+'18',color:k.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,position:'relative'}}>
                        <Icon name={k.icon} size={14}/>
                        <span style={{position:'absolute',top:-6,left:-6,width:16,height:16,borderRadius:5,background:'var(--ink)',color:'#fff',fontSize:9,fontFamily:'ui-monospace,Menlo,monospace',display:'flex',alignItems:'center',justifyContent:'center'}}>{s.n}</span>
                      </span>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:12.5,fontWeight:600,color:'var(--ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{s.title}</div>
                        <div className="muted" style={{fontSize:10.5,marginTop:2,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{s.meta}</div>
                        <div style={{fontSize:11.5,color:'var(--ink-3)',marginTop:5,lineHeight:1.4,display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{s.snippet}</div>
                      </div>
                      <Icon name="arrow_right" size={14} style={{color:'var(--ink-4)',flex:'none'}}/>
                    </button>
                  );})}
                </div>
              </div>

              {/* related */}
              <div style={{marginTop:22}}>
                <div className="eyebrow" style={{marginBottom:10}}>Related</div>
                <div style={{display:'flex',flexDirection:'column',gap:1}}>
                  {ans.related.map((r,i)=>(
                    <button key={i} onClick={()=>ctx.ask&&ctx.ask(r)} style={{display:'flex',alignItems:'center',gap:10,width:'100%',textAlign:'left',border:0,borderTop:'1px solid var(--line)',
                      background:'transparent',padding:'12px 6px',cursor:'pointer',fontSize:14,color:'var(--ink)',fontWeight:500,transition:'.12s'}}
                      onMouseEnter={e=>e.currentTarget.style.background='var(--surface-2)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                      <Icon name="plus" size={15} sw={2} style={{color:'var(--blue)',flex:'none'}}/>
                      <span style={{flex:1}}>{r}</span>
                      <Icon name="arrow_right" size={15} style={{color:'var(--ink-4)',flex:'none'}}/>
                    </button>
                  ))}
                </div>
              </div>

              <div className="muted" style={{fontSize:11.5,marginTop:20,display:'flex',alignItems:'center',gap:6}}>
                <Icon name="sparkle" size={12} style={{color:'var(--violet)'}}/>Synthesized from the top {ans.count.toLocaleString()} matches · AI can be imprecise — verify against the cited sources.
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

function AISearchPage({ query, setPage, onSearch, openEntity, flash }){
  const [msgs,setMsgs] = React.useState(()=> query ? [query] : []);
  const [draft,setDraft] = React.useState('');
  const endRef = React.useRef(null);

  React.useEffect(()=>{ setMsgs(query ? [query] : []); }, [query]);

  function ask(text){
    const t=(text||'').trim(); if(!t) return;
    setMsgs(m=>[...m, t]); setDraft('');
    setTimeout(()=>{ endRef.current && (endRef.current.scrollTop = endRef.current.scrollHeight); }, 60);
  }
  const ctx = { setPage, openEntity, flash, ask };

  return (
    <div className="rise">
      {/* header */}
      <div style={{borderBottom:'1px solid var(--line)',background:'rgba(255,255,255,.65)',backdropFilter:'blur(4px)'}}>
        <div className="page" style={{paddingTop:14,paddingBottom:14,maxWidth:900}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <button onClick={()=>setPage('explore')} className="btn btn-secondary btn-sm"><Icon name="chevron_left" size={15} sw={2.2}/>Explore</button>
            <span style={{width:1,height:22,background:'var(--line-2)'}}></span>
            <span style={{display:'inline-flex',alignItems:'center',gap:8,fontSize:13.5,fontWeight:600,color:'var(--ink)'}}>
              <span style={{width:26,height:26,borderRadius:8,background:'var(--logo-grad,linear-gradient(135deg,#0073E6,#7364C2,#E0648F))',display:'flex',alignItems:'center',justifyContent:'center'}}><Icon name="sparkle" size={14} style={{color:'#fff'}}/></span>
              AI Answers
            </span>
            <span className="badge" style={{background:'var(--violet-t)',color:'var(--violet)',height:18,fontSize:10,fontWeight:700,letterSpacing:'.04em'}}>BETA</span>
            <div style={{flex:1}}></div>
            <button onClick={()=>onSearch&&onSearch(query)} className="btn btn-ghost btn-sm" style={{border:'1px solid var(--line-2)'}}><Icon name="list" size={14}/>View as results</button>
          </div>
        </div>
      </div>

      {/* thread */}
      <div className="page" style={{paddingTop:28,paddingBottom:150,maxWidth:900}}>
        {msgs.length===0 ? (
          <div style={{textAlign:'center',padding:'60px 20px'}}>
            <span style={{width:52,height:52,borderRadius:14,background:'var(--logo-grad,linear-gradient(135deg,#0073E6,#7364C2,#E0648F))',display:'inline-flex',alignItems:'center',justifyContent:'center'}}><Icon name="sparkle" size={26} style={{color:'#fff'}}/></span>
            <div style={{fontSize:18,fontWeight:700,color:'var(--ink)',marginTop:14}}>Ask anything about your content</div>
            <div className="muted" style={{fontSize:13.5,marginTop:6,maxWidth:420,marginLeft:'auto',marginRight:'auto',lineHeight:1.5}}>Get a synthesized answer with citations and links back to the files, exhibits and subjects it drew from.</div>
          </div>
        ) : msgs.map((m,i)=>(
          <AIMessage key={i+'|'+m} q={m} first={i===msgs.length-1} ctx={ctx}/>
        ))}
      </div>

      {/* composer */}
      <div style={{position:'fixed',left:0,right:0,bottom:0,zIndex:50,padding:'0 0 22px',pointerEvents:'none'}}>
        <div className="page" style={{maxWidth:900,paddingBottom:0}}>
          <div className="card" style={{display:'flex',alignItems:'center',gap:12,padding:'11px 14px',boxShadow:'var(--shadow-lg)',borderRadius:14,pointerEvents:'auto',background:'#fff'}}>
            <Icon name="sparkle" size={19} style={{color:'var(--violet)',flex:'none'}}/>
            <input value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>e.key==='Enter'&&ask(draft)}
              placeholder="Ask a follow-up…" style={{flex:1,border:0,outline:'none',fontSize:15,fontFamily:'inherit',background:'transparent',color:'var(--ink)'}}/>
            <button className="btn btn-primary btn-icon" onClick={()=>ask(draft)} disabled={!draft.trim()} style={draft.trim()?{}:{opacity:.5,pointerEvents:'none'}}><Icon name="arrow_right" size={17} sw={2.2}/></button>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AISearchPage, buildAnswer });
