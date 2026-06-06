// briefings.jsx — Briefing Books workspace: build & collate briefing books

const B_SERIF = "'Spectral', Georgia, 'Times New Roman', serif";
const B_KIND = {
  memo:    {label:'Memo',     icon:'route',  color:'#8A63C4'},
  report:  {label:'Report',   icon:'file',   color:'#1D6BD0'},
  imagery: {label:'Imagery',  icon:'image',  color:'#1F9D86'},
  map:     {label:'Map',      icon:'globe',  color:'#2FB2F3'},
  assess:  {label:'Assessment',icon:'chart', color:'#FF9A4E'},
  tab:     {label:'Tab',      icon:'bookmark',color:'#E068A7'},
};
const B_STATUS = {
  draft:{label:'Draft', color:'#BC8418', tint:'#F8EFD9'},
  final:{label:'Final', color:'#1F8A5B', tint:'#E4F4F0'},
  dist: {label:'Distributed', color:'#1D6BD0', tint:'#E7EFFB'},
};
let _bsid=1; const bs=(kind,title,src)=>({id:'s'+(_bsid++),kind,title,src,pages:kind==='imagery'?2:kind==='map'?1:kind==='assess'?4:3});

const BOOKS = [
  {id:'bk1', title:"Principal's Morning Book", sub:'June 5, 2026 · 0600', status:'draft', cover:'#1D3557', contributors:['maya','tyler','noah'],
    sections:[ bs('tab','Cover & Table of Contents','tyler'), bs('memo','Overnight Highlights','maya'), bs('report','Eastern Sector — Situation','noah'), bs('imagery','Harbor Imagery Pack','diego'), bs('assess','Throughput Assessment','priya') ]},
  {id:'bk2', title:'Weekly Regional Roundup', sub:'Week 23 · Jun 1–5', status:'final', cover:'#1F8A5B', contributors:['priya','sam'],
    sections:[ bs('tab','Cover','sam'), bs('report','Regional Summary','priya'), bs('map','Activity Heat Map','noah'), bs('assess','Outlook','priya') ]},
  {id:'bk3', title:'Coordination Pre-Read', sub:'Interagency Sync · Jun 6', status:'draft', cover:'#8A63C4', contributors:['noah','tyler'],
    sections:[ bs('tab','Agenda','noah'), bs('memo','Coordination Points','noah'), bs('report','Deconfliction Notes','tyler') ]},
  {id:'bk4', title:'Leadership Decision Folder', sub:'Asset Reallocation · Jun 4', status:'dist', cover:'#C24A2E', contributors:['sam','lena'],
    sections:[ bs('tab','Cover','sam'), bs('memo','Decision Memo','sam'), bs('assess','Risk Assessment','lena'), bs('map','Coverage Map','noah') ]},
  {id:'bk5', title:'Field Team Onboarding Book', sub:'Rotation 4 · Jun 2', status:'final', cover:'#FF9A4E', contributors:['maya'],
    sections:[ bs('tab','Welcome','maya'), bs('report','Standing Requirements','maya'), bs('report','Reporting Procedures','tyler') ]},
  {id:'bk6', title:'Quarterly Posture Review', sub:'Q2 2026', status:'draft', cover:'#5568C7', contributors:['tyler','priya','sam'],
    sections:[ bs('tab','Cover','tyler'), bs('assess','Posture Assessment','priya'), bs('report','Collection Summary','sam') ]},
];

const B_LIBRARY = [
  {kind:'memo', title:'Quarterly Assessment — Port Throughput', src:'maya', meta:'M-3041 · CUI'},
  {kind:'report', title:'Convoy Movement — Sector F4', src:'noah', meta:'Updated 2h ago'},
  {kind:'imagery', title:'UAV ISR Pass — Northern Terminal', src:'diego', meta:'14 frames'},
  {kind:'map', title:'Eastern Sector Activity — Heat Map', src:'noah', meta:'Geotagged · 42 pts'},
  {kind:'assess', title:'Infrastructure Resilience — Southern Grid', src:'priya', meta:'Confidence: moderate'},
  {kind:'memo', title:'Coordination Cable — Weekly', src:'sam', meta:'Cable · CUI'},
  {kind:'report', title:'Checkpoint Report — District 7', src:'priya', meta:'Field report'},
  {kind:'imagery', title:'Thermal Capture — Depot', src:'diego', meta:'3 frames'},
  {kind:'assess', title:'Signal Activity — Coastal', src:'diego', meta:'SECRET'},
  {kind:'report', title:'Market Sentiment — Regional', src:'maya', meta:'Field note'},
];

function BriefingsWorkspace({setPage, flash}){
  const [openId,setOpenId]=React.useState(null);
  const [books,setBooks]=React.useState(BOOKS);
  const cur=books.find(b=>b.id===openId);
  function update(id,fn){ setBooks(arr=>arr.map(b=>b.id===id?fn(b):b)); }

  if(cur) return <BookBuilder b={cur} onBack={()=>setOpenId(null)} update={update} flash={flash}/>;

  return (
    <div className="rise">
      <WsHeader name="Briefing Books" setPage={setPage}
        action={<button className="btn btn-primary" onClick={()=>flash&&flash('New briefing book created')}><Icon name="plus" size={16} sw={2.2}/>New book</button>}/>
      <div className="page" style={{paddingTop:24}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18,paddingBottom:40}}>
          {books.map(b=>{
            const st=B_STATUS[b.status], pages=b.sections.reduce((a,s)=>a+s.pages,0);
            return (
              <div key={b.id} onClick={()=>setOpenId(b.id)} className="card card-hover" style={{padding:0,overflow:'hidden',cursor:'pointer',display:'flex'}}>
                {/* spine */}
                <div style={{width:64,flex:'none',background:b.cover,position:'relative',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <Icon name="book" size={24} style={{color:'rgba(255,255,255,.92)'}}/>
                  <div style={{position:'absolute',left:0,top:0,bottom:0,width:5,background:'rgba(255,255,255,.18)'}}></div>
                </div>
                <div style={{flex:1,minWidth:0,padding:'16px 17px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',gap:8,alignItems:'flex-start'}}>
                    <div className="muted" style={{fontSize:11.5,fontWeight:500}}>{b.sub}</div>
                    <span className="badge" style={{background:st.tint,color:st.color,height:19,flex:'none'}}>{st.label}</span>
                  </div>
                  <div style={{fontFamily:B_SERIF,fontSize:18,fontWeight:600,color:'var(--ink)',letterSpacing:'-.01em',lineHeight:1.2,margin:'5px 0 0'}}>{b.title}</div>
                  <div style={{display:'flex',alignItems:'center',gap:9,marginTop:13,paddingTop:12,borderTop:'1px solid var(--line)'}}>
                    <span style={{fontSize:11.5,color:'var(--ink-3)',fontWeight:500}}><b style={{color:'var(--ink-2)'}}>{b.sections.length}</b> sections</span>
                    <span style={{width:3,height:3,borderRadius:'50%',background:'var(--ink-4)'}}></span>
                    <span style={{fontSize:11.5,color:'var(--ink-3)',fontWeight:500}}><b style={{color:'var(--ink-2)'}}>{pages}</b> pages</span>
                    <div style={{flex:1}}></div>
                    <AvatarStack ids={b.contributors} size={22} max={3}/>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function BookBuilder({b, onBack, update, flash}){
  const [filter,setFilter]=React.useState('');
  const st=B_STATUS[b.status];
  const pages=b.sections.reduce((a,s)=>a+s.pages,0);

  function move(i,dir){
    const j=i+dir; if(j<0||j>=b.sections.length) return;
    update(b.id, bk=>{ const s=[...bk.sections]; [s[i],s[j]]=[s[j],s[i]]; return {...bk,sections:s}; });
  }
  function remove(id){ update(b.id, bk=>({...bk,sections:bk.sections.filter(s=>s.id!==id)})); }
  function add(item){
    update(b.id, bk=>({...bk,sections:[...bk.sections, bs(item.kind,item.title,item.src)]}));
    flash&&flash(`Added “${item.title}” to the book`);
  }
  const lib=B_LIBRARY.filter(x=>x.title.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="rise">
      <div style={{position:'sticky',top:'var(--header-h)',zIndex:40,background:'rgba(255,255,255,.85)',backdropFilter:'blur(10px)',borderBottom:'1px solid var(--line)'}}>
        <div className="page" style={{padding:'11px 28px',display:'flex',alignItems:'center',gap:14}}>
          <button onClick={onBack} className="btn btn-secondary btn-sm"><Icon name="chevron_left" size={15} sw={2.2}/>Books</button>
          <span style={{width:1,height:24,background:'var(--line-2)'}}></span>
          <span style={{width:28,height:28,borderRadius:7,background:b.cover,display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name="book" size={15} style={{color:'#fff'}}/></span>
          <div style={{minWidth:0,flex:1}}>
            <div style={{fontSize:13.5,fontWeight:600,color:'var(--ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{b.title}</div>
            <div className="muted" style={{fontSize:11.5}}>{b.sub} · {b.sections.length} sections · {pages} pages</div>
          </div>
          <span className="badge" style={{background:st.tint,color:st.color,height:22}}>{st.label}</span>
          <button className="btn btn-secondary btn-sm" onClick={()=>flash&&flash('Exported book as PDF')}><Icon name="download" size={14}/>Export</button>
          <button className="btn btn-primary btn-sm" onClick={()=>{update(b.id,bk=>({...bk,status:'dist'}));flash&&flash('Briefing book distributed');}}><Icon name="send" size={14}/>Distribute</button>
        </div>
      </div>

      <div className="page" style={{paddingTop:24,display:'grid',gridTemplateColumns:'minmax(0,1fr) 380px',gap:24,alignItems:'start',maxWidth:1240}}>
        {/* book contents */}
        <div className="card card-pad">
          <SectionHead title="Book contents" sub="Reorder, remove, or add materials to collate the book" icon="layers"/>
          <div style={{display:'flex',flexDirection:'column',gap:9}}>
            {b.sections.map((s,i)=>{
              const k=B_KIND[s.kind];
              return (
                <div key={s.id} style={{display:'flex',alignItems:'center',gap:13,padding:'12px 14px',border:'1px solid var(--line)',borderRadius:11,background:'#fff'}}>
                  <span style={{fontFamily:'ui-monospace,Menlo,monospace',fontSize:12,fontWeight:700,color:'var(--ink-4)',width:20,textAlign:'center',flex:'none'}}>{i+1}</span>
                  <span style={{width:34,height:34,borderRadius:9,background:k.color+'18',color:k.color,display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name={k.icon} size={16}/></span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13.5,fontWeight:600,color:'var(--ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{s.title}</div>
                    <div className="muted" style={{fontSize:11.5,marginTop:2,display:'flex',alignItems:'center',gap:6}}>{k.label} · {s.pages} {s.pages>1?'pages':'page'} <span style={{width:3,height:3,borderRadius:'50%',background:'var(--ink-4)'}}></span><Avatar id={s.src} size={14}/>{PEOPLE[s.src].name.split(' ')[0]}</div>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:2,flex:'none'}}>
                    <button className="btn btn-ghost btn-icon btn-sm" title="Move up" onClick={()=>move(i,-1)} disabled={i===0} style={{opacity:i===0?.35:1}}><Icon name="arrow_up" size={15}/></button>
                    <button className="btn btn-ghost btn-icon btn-sm" title="Move down" onClick={()=>move(i,1)} disabled={i===b.sections.length-1} style={{opacity:i===b.sections.length-1?.35:1}}><Icon name="arrow_down" size={15}/></button>
                    <button className="btn btn-ghost btn-icon btn-sm" title="Remove" onClick={()=>remove(s.id)}><Icon name="trash" size={15}/></button>
                  </div>
                </div>
              );
            })}
            {!b.sections.length && <div style={{textAlign:'center',padding:'30px',color:'var(--ink-3)',fontSize:13,border:'1.5px dashed var(--line-2)',borderRadius:12}}>Empty book — add materials from the library.</div>}
          </div>
        </div>

        {/* add materials */}
        <div style={{position:'sticky',top:'calc(var(--header-h) + 16px)'}}>
          <div className="card card-pad">
            <SectionHead title="Add materials" sub="Collate from the library" icon="plus"/>
            <div style={{display:'flex',alignItems:'center',gap:8,height:34,padding:'0 11px',border:'1px solid var(--line-2)',background:'#fff',borderRadius:8,marginBottom:12}}>
              <Icon name="search" size={15} style={{color:'var(--ink-3)'}}/>
              <input value={filter} onChange={e=>setFilter(e.target.value)} placeholder="Search materials…" style={{flex:1,border:0,outline:'none',fontSize:13,fontFamily:'inherit',background:'transparent'}}/>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:2,maxHeight:'calc(100vh - var(--header-h) - 240px)',overflowY:'auto'}}>
              {lib.map((x,i)=>{
                const k=B_KIND[x.kind];
                return (
                  <div key={i} style={{display:'flex',alignItems:'center',gap:11,padding:'9px 6px',borderTop:i?'1px solid var(--line)':0}}>
                    <span style={{width:30,height:30,borderRadius:8,background:k.color+'18',color:k.color,display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name={k.icon} size={14}/></span>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:12.5,fontWeight:550,color:'var(--ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{x.title}</div>
                      <div className="muted" style={{fontSize:11}}>{k.label} · {x.meta}</div>
                    </div>
                    <button className="btn btn-secondary btn-sm" style={{flex:'none'}} onClick={()=>add(x)}><Icon name="plus" size={13} sw={2.4}/>Add</button>
                  </div>
                );
              })}
              {!lib.length && <div style={{textAlign:'center',padding:'24px',color:'var(--ink-3)',fontSize:12.5}}>No materials match.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { BriefingsWorkspace });
