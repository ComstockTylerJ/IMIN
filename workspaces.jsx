// workspaces.jsx — internal workspace pages (no landing page; nav is a dropdown)

function WsHeader({name, icon, color, tint, setPage, action}){
  return (
    <div style={{borderBottom:'1px solid var(--line)',background:'rgba(255,255,255,.65)',backdropFilter:'blur(4px)'}}>
      <div className="page" style={{paddingTop:20,paddingBottom:18}}>
        <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',gap:16,flexWrap:'wrap'}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:7,fontSize:12.5,color:'var(--ink-3)',fontWeight:500,marginBottom:7}}>
              <span style={{cursor:'pointer'}} onClick={()=>setPage('dashboard')}>Workspaces</span>
              <Icon name="chevron_right" size={13} style={{opacity:.6}}/>
              <span style={{color:'var(--ink-2)'}}>{name}</span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:11}}>
              <h1 style={{fontSize:23,fontWeight:700,letterSpacing:'-.03em',margin:0,color:'var(--ink)'}}>{name}</h1>
            </div>
          </div>
          {action}
        </div>
      </div>
    </div>
  );
}

function WorkspaceDetail({id, setPage, openTask, openCreate, flash, onSearch}){
  const wid = (id==='workspaces') ? 'content' : id;
  const w = (wid==='content') ? CONTENT_WS : (WORKSPACES.find(x=>x.id===wid) || WORKSPACES[0]);
  if(wid==='content') return <ContentWorkspace w={w} setPage={setPage} openCreate={openCreate} flash={flash} onSearch={onSearch}/>;

  return (
    <div className="rise">
      <WsHeader name={w.name} icon={w.icon} color={w.color} tint={w.tint} setPage={setPage}
        action={<button className="btn btn-primary" onClick={openCreate}><Icon name="plus" size={16} sw={2.2}/>New item</button>}/>
      <div className="page" style={{paddingTop:24}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:22}}>
          {[['Active items',w.active,w.color],['Due today',w.today,'#F86566'],['Completed (wk)',Math.round(w.active*0.7),'#1FA98A'],['Avg cycle','2.4d','#8A63C4']].map(([l,v,c])=>(
            <div key={l} className="card card-pad">
              <div style={{fontSize:12.5,fontWeight:550,color:'var(--ink-2)',marginBottom:8}}>{l}</div>
              <div style={{fontSize:26,fontWeight:700,letterSpacing:'-.03em',color:c}}>{v}</div>
            </div>
          ))}
        </div>
        {wid==='requests'
          ? <div className="card card-pad"><SectionHead title="All Requests" icon="inbox"/><RequestsTableFull/></div>
          : (
          <div className="card card-pad">
            <SectionHead title="Recent items" sub={`Latest in ${w.name}`} icon={w.icon}
              action={<button className="btn btn-secondary btn-sm" onClick={()=>setPage('tasks')}>Open board<Icon name="arrow_right" size={14}/></button>}/>
            <div style={{display:'flex',flexDirection:'column'}}>
              {TASKS.filter((t,i)=> i%2 === (wid==='teams'?1:0)).slice(0,6).map((t,i)=>(
                <div key={t.id} onClick={()=>openTask(t.id)} style={{display:'flex',alignItems:'center',gap:13,padding:'12px 6px',borderTop:i?'1px solid var(--line)':0,cursor:'pointer',borderRadius:8}}
                  onMouseEnter={e=>e.currentTarget.style.background='var(--surface-2)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <span style={{width:8,height:8,borderRadius:'50%',background:STATUS[t.col].color}}></span>
                  <span style={{flex:1,fontSize:13.5,fontWeight:550,color:'var(--ink)'}}>{t.file}</span>
                  {t.tags.slice(0,2).map(tg=><Tag key={tg} k={tg} sm/>)}
                  <StatusPill k={t.col}/>
                  <AvatarStack ids={t.assignees} size={24} max={2}/>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------- Content workspace (search + browse + folders) ----------------
function ContentWorkspace({w, setPage, openCreate, flash, onSearch, embed}){
  const [ai,setAi]=React.useState(true);
  const [browse,setBrowse]=React.useState('Collections');
  const [query,setQuery]=React.useState('');
  const [filter,setFilter]=React.useState('');
  const tryChips=['Q3 campaign','Brand assets','Hero video'];
  const go=()=>onSearch&&onSearch(query);

  return (
    <div className={embed?'':'rise'}>
      {!embed && <WsHeader name="Content" icon={w.icon} color={w.color} tint={w.tint} setPage={setPage}/>}

      {/* search hero */}
      <div style={{position:'relative',overflow:'hidden'}}>
        <HeroPattern opacity={0.6}/>
        <div className="page" style={{position:'relative',zIndex:1,paddingTop:46,paddingBottom:42}}>
          <div style={{maxWidth:760,margin:'0 auto',textAlign:'center'}}>
            <h2 style={{fontSize:32,fontWeight:700,letterSpacing:'-.035em',margin:0,color:'var(--ink)'}}>
              What are you <span className="grad-text">looking for?</span>
            </h2>
            <div className="sec" style={{fontSize:13.5,margin:'10px 0 0',display:'flex',flexWrap:'wrap',gap:8,alignItems:'center',justifyContent:'center'}}>
              <span>Type a topic, name, or keyword — or browse below.</span>
              <span style={{color:'var(--ink-4)'}}>Try:</span>
              {tryChips.map(c=>(
                <button key={c} onClick={()=>onSearch&&onSearch(c)} className="chip" style={{height:24,fontSize:11.5,background:'rgba(255,255,255,.7)'}}>{c}</button>
              ))}
            </div>

            <div className="card" style={{marginTop:22,boxShadow:'var(--shadow-md)',borderRadius:14,overflow:'hidden',textAlign:'left'}}>
              <div style={{display:'flex',alignItems:'center',gap:12,padding:'14px 16px'}}>
                <Icon name={ai?'sparkle':'search'} size={20} style={{color:ai?'var(--violet)':'var(--ink-3)',flex:'none'}}/>
                <input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==='Enter'&&go()} placeholder={ai?'Ask anything about your content…':'Search files, folders & people…'}
                  style={{flex:1,border:0,outline:'none',fontSize:15,fontFamily:'inherit',background:'transparent',color:'var(--ink)'}}/>
                <button onClick={()=>setAi(a=>!a)} title="Toggle AI search" style={{display:'flex',padding:ai?'1.5px':0,borderRadius:999,
                  border:ai?'0':'1px solid var(--line-2)',background:ai?'var(--logo-grad)':'#fff',cursor:'pointer',transition:'.15s',flex:'none'}}>
                  <span style={{display:'flex',alignItems:'center',gap:6,height:ai?25:28,padding:'0 12px',borderRadius:999,background:'#fff',
                    fontSize:12.5,fontWeight:600,color:ai?'var(--ink)':'var(--ink-3)',transition:'.15s'}}>
                    <Icon name="sparkle" size={15} style={{color:ai?'var(--violet)':'var(--ink-4)'}}/>AI Mode
                  </span>
                </button>
                <button className="btn btn-primary btn-icon" onClick={go}><Icon name="arrow_right" size={17} sw={2.2}/></button>
              </div>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 16px',borderTop:'1px solid var(--line)',background:'var(--surface-2)'}}>
                <label style={{display:'flex',alignItems:'center',gap:8,fontSize:12.5,color:'var(--ink-2)',cursor:'pointer',minWidth:0,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                  <input type="checkbox" defaultChecked style={{accentColor:'var(--primary)',width:14,height:14,flex:'none'}}/>Search within file contents
                </label>
                <div style={{display:'flex',alignItems:'center',gap:14,fontSize:12.5,flexShrink:0,marginLeft:14}}>
                  <span className="linkish" style={{display:'flex',alignItems:'center',gap:5,whiteSpace:'nowrap'}}><Icon name="settings" size={13}/>Query Builder</span>
                  <span style={{width:1,height:13,background:'var(--line-2)'}}></span>
                  <span className="linkish" style={{display:'flex',alignItems:'center',gap:5,whiteSpace:'nowrap'}}><Icon name="history" size={13}/>Search History</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{borderTop:'1px solid var(--line)'}}>
        <div className="page" style={{paddingTop:24}}>
          {/* browse bar */}
          <div style={{display:'flex',alignItems:'center',gap:14,flexWrap:'wrap',marginBottom:18}}>
            <span style={{fontSize:13,fontWeight:600,color:'var(--ink-2)'}}>Browse</span>
            <div style={{display:'flex',gap:3,background:'#EEF1F6',padding:3,borderRadius:9}}>
              {[['Collections','collections'],['Devices','device'],['People','users']].map(([b,ic])=>(
                <button key={b} onClick={()=>setBrowse(b)} style={{display:'flex',alignItems:'center',gap:6,border:0,
                  background:browse===b?'#fff':'transparent',color:browse===b?'var(--ink)':'var(--ink-3)',fontSize:12.5,fontWeight:550,
                  padding:'6px 13px',borderRadius:7,cursor:'pointer',boxShadow:browse===b?'var(--shadow-sm)':'none',transition:'.12s'}}>
                  <Icon name={ic} size={14}/>{b}</button>
              ))}
            </div>
            <div style={{flex:1}}></div>
            <div style={{display:'flex',alignItems:'center',gap:8,height:34,padding:'0 12px',width:230,border:'1px solid var(--line-2)',background:'#fff',borderRadius:8}}>
              <Icon name="search" size={15} style={{color:'var(--ink-3)'}}/>
              <input value={filter} onChange={e=>setFilter(e.target.value)} placeholder={`Filter ${browse.toLowerCase()}…`}
                style={{flex:1,border:0,outline:'none',fontSize:13,fontFamily:'inherit',background:'transparent'}}/>
            </div>
          </div>

          {browse==='Collections' && <FolderGrid filter={filter} setPage={setPage} flash={flash}/>}
          {browse==='Devices' && <DeviceGrid filter={filter} flash={flash}/>}
          {browse==='People' && <PeopleGrid filter={filter} flash={flash}/>}
        </div>
      </div>
    </div>
  );
}

function FolderGrid({filter, setPage, flash}){
  const [favs,setFavs]=React.useState(()=>Object.fromEntries(FOLDERS.map(f=>[f.id,f.fav])));
  const list=FOLDERS.filter(f=>f.name.toLowerCase().includes(filter.toLowerCase()));
  if(!list.length) return <Empty label="No collections match your filter."/>;
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,paddingBottom:8}}>
      {list.map(f=>(
        <div key={f.id} className="card card-hover" style={{padding:'15px 16px 14px',display:'flex',flexDirection:'column',gap:10}}>
          <div style={{display:'flex',alignItems:'flex-start',gap:10}}>
            <button onClick={()=>setFavs(s=>({...s,[f.id]:!s[f.id]}))} title={favs[f.id]?'Unfavorite':'Favorite'} style={{border:0,background:'transparent',padding:0,marginTop:1,cursor:'pointer',color:favs[f.id]?'#FF9A4E':'var(--ink-4)',flex:'none'}}>
              <Icon name={favs[f.id]?'star_fill':'star'} size={18}/>
            </button>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:14,fontWeight:600,color:'var(--ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{f.name}</div>
              <div className="muted" style={{fontSize:11.5,marginTop:1}}>Updated {f.updated}</div>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8,fontSize:11.5,color:'var(--ink-3)',fontWeight:500}}>
            <span style={{display:'flex',alignItems:'center',gap:4}}><Icon name="files" size={13}/>{f.files} files</span>
            <span style={{width:3,height:3,borderRadius:'50%',background:'var(--ink-4)'}}></span>{f.size}
            <span style={{width:3,height:3,borderRadius:'50%',background:'var(--ink-4)'}}></span>{f.types}
          </div>
          <div style={{display:'flex',gap:8,marginTop:2}}>
            <button className="btn btn-primary btn-sm" style={{flex:1}} onClick={()=>setPage('tasks')}><Icon name="files" size={14}/>View Files</button>
            <button className="btn btn-ghost btn-sm" style={{border:'1px solid var(--line-2)'}} onClick={()=>flash&&flash(`${f.name} · ${f.files} files`)}>Details</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function DeviceGrid({filter, flash}){
  const list=DEVICES.filter(d=>d.name.toLowerCase().includes(filter.toLowerCase()));
  if(!list.length) return <Empty label="No connected sources match."/>;
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,paddingBottom:8}}>
      {list.map(d=>(
        <div key={d.id} className="card card-hover card-pad" style={{display:'flex',flexDirection:'column',gap:12}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <span style={{width:36,height:36,borderRadius:9,background:d.color+'1a',color:d.color,display:'flex',alignItems:'center',justifyContent:'center'}}><Icon name={d.icon} size={18}/></span>
            <span style={{display:'flex',alignItems:'center',gap:5,fontSize:11,color:'#1FA98A',fontWeight:600}}><span style={{width:6,height:6,borderRadius:'50%',background:'#1FA98A'}}></span>Synced</span>
          </div>
          <div>
            <div style={{fontSize:14,fontWeight:600,color:'var(--ink)'}}>{d.name}</div>
            <div className="muted" style={{fontSize:11.5,marginTop:2}}>{d.sub}</div>
          </div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',paddingTop:10,borderTop:'1px solid var(--line)'}}>
            <span style={{fontSize:12.5,color:'var(--ink-2)'}}><b style={{color:'var(--ink)'}}>{d.files.toLocaleString()}</b> files</span>
            <button className="btn btn-ghost btn-sm" onClick={()=>flash&&flash(`Browsing ${d.name}…`)}>Open<Icon name="chevron_right" size={14}/></button>
          </div>
        </div>
      ))}
    </div>
  );
}

function PeopleGrid({filter, flash}){
  const list=PL.filter(p=>p.name.toLowerCase().includes(filter.toLowerCase()));
  if(!list.length) return <Empty label="No people match your filter."/>;
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,paddingBottom:8}}>
      {list.map((p,i)=>(
        <div key={p.id} className="card card-hover card-pad" style={{display:'flex',alignItems:'center',gap:13}}>
          <Avatar id={p.id} size={42} ring={false}/>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:14,fontWeight:600,color:'var(--ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{p.name}</div>
            <div className="muted" style={{fontSize:11.5,marginTop:1}}>{p.role}</div>
            <div style={{marginTop:6,fontSize:11.5,color:'var(--ink-3)'}}><b style={{color:'var(--ink-2)'}}>{[18,24,42,11,33,7,29,15][i%8]}</b> files owned</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Empty({label}){
  return (
    <div className="card" style={{padding:'48px 20px',textAlign:'center',border:'1.5px dashed var(--line-2)',background:'var(--surface-2)'}}>
      <Icon name="search" size={26} style={{color:'var(--ink-4)'}}/>
      <div style={{fontSize:13.5,color:'var(--ink-3)',marginTop:8,fontWeight:500}}>{label}</div>
    </div>
  );
}

function RequestsTableFull(){
  return (
    <table className="tbl">
      <thead><tr><th>Request</th><th>Type</th><th>Submitted</th><th>Status</th><th>Reviewer</th><th>Due</th></tr></thead>
      <tbody>
        {REQUESTS.map(r=>{const s=REQ_STATUS[r.status];return(
          <tr key={r.id}>
            <td style={{color:'var(--ink)',fontWeight:550}}>{r.name}<span className="muted" style={{fontSize:11,fontWeight:400,marginLeft:6}}>{r.id}</span></td>
            <td><span className="badge" style={{background:'transparent',border:'1px solid var(--line-2)',color:REQ_TYPE[r.type]}}><span className="dot" style={{background:REQ_TYPE[r.type]}}></span>{r.type}</span></td>
            <td>{r.submitted}</td>
            <td><span className="st" style={{background:s.tint,color:s.color}}><span className="dot" style={{background:s.color}}></span>{r.status}</span></td>
            <td><div style={{display:'flex',alignItems:'center',gap:7}}><Avatar id={r.reviewer} size={22}/><span style={{fontSize:12.5}}>{PEOPLE[r.reviewer].name.split(' ')[0]}</span></div></td>
            <td style={{fontWeight:550}}>{r.due}</td>
          </tr>);})}
      </tbody>
    </table>
  );
}

function CreateModal({onClose, onCreate}){
  const [file,setFile]=React.useState('');
  const [col,setCol]=React.useState('backlog');
  const [pri,setPri]=React.useState('med');
  const [tags,setTags]=React.useState(['campaign']);
  const [assignees,setAssignees]=React.useState(['tyler']);
  React.useEffect(()=>{const esc=e=>e.key==='Escape'&&onClose();window.addEventListener('keydown',esc);return()=>window.removeEventListener('keydown',esc);},[]);
  function toggle(arr,set,v){set(arr.includes(v)?arr.filter(x=>x!==v):[...arr,v]);}
  function submit(){
    onCreate({id:'T-'+Math.floor(Math.random()*900+100),file:file||'Untitled task',col,due:'Jun 12',tags:tags.length?tags:['campaign'],assignees:assignees.length?assignees:['tyler'],priority:pri,comments:0,attachments:0,workspace:'Content',desc:''});
    onClose();
  }
  return (
    <div style={{position:'fixed',inset:0,zIndex:300,display:'flex',alignItems:'flex-start',justifyContent:'center',paddingTop:'9vh'}}>
      <div onClick={onClose} style={{position:'absolute',inset:0,background:'rgba(36,39,45,.32)',backdropFilter:'blur(2px)',animation:'fade .2s'}}></div>
      <div className="pop card" style={{position:'relative',width:'min(560px,94vw)',boxShadow:'var(--shadow-lg)',borderRadius:16,overflow:'hidden'}}>
        <div style={{padding:'18px 22px',borderBottom:'1px solid var(--line)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <span style={{width:32,height:32,borderRadius:9,background:'var(--primary-tint)',color:'var(--primary)',display:'flex',alignItems:'center',justifyContent:'center'}}><Icon name="check_square" size={17}/></span>
            <span style={{fontSize:16,fontWeight:700,letterSpacing:'-.02em'}}>Create task</span>
          </div>
          <button className="btn btn-ghost btn-icon btn-sm" onClick={onClose}><Icon name="x" size={17}/></button>
        </div>
        <div style={{padding:'20px 22px',display:'flex',flexDirection:'column',gap:18}}>
          <div>
            <label style={{fontSize:12,fontWeight:600,color:'var(--ink-3)',display:'block',marginBottom:7}}>File / task name</label>
            <input autoFocus value={file} onChange={e=>setFile(e.target.value)} placeholder="e.g. Q4 Launch — Hero Video.mp4"
              style={{width:'100%',height:40,border:'1px solid var(--line-2)',borderRadius:9,padding:'0 13px',fontSize:14,fontFamily:'inherit',outline:'none'}}
              onFocus={e=>e.target.style.borderColor='var(--blue)'} onBlur={e=>e.target.style.borderColor='var(--line-2)'}/>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            <div>
              <label style={{fontSize:12,fontWeight:600,color:'var(--ink-3)',display:'block',marginBottom:7}}>Stage</label>
              <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>{COLUMNS.map(c=><button key={c.id} className={'chip'+(col===c.id?' on':'')} onClick={()=>setCol(c.id)} style={{height:30}}>{c.label}</button>)}</div>
            </div>
            <div>
              <label style={{fontSize:12,fontWeight:600,color:'var(--ink-3)',display:'block',marginBottom:7}}>Priority</label>
              <div style={{display:'flex',gap:5}}>{Object.entries(PRIORITY).map(([k,p])=><button key={k} className={'chip'+(pri===k?' on':'')} onClick={()=>setPri(k)} style={{height:30}}>{p.label}</button>)}</div>
            </div>
          </div>
          <div>
            <label style={{fontSize:12,fontWeight:600,color:'var(--ink-3)',display:'block',marginBottom:7}}>Tags</label>
            <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>{Object.keys(TAGS).map(k=>(
              <button key={k} onClick={()=>toggle(tags,setTags,k)} className="badge" style={{cursor:'pointer',border:'1px solid',borderColor:tags.includes(k)?TAGS[k].color:'var(--line-2)',background:tags.includes(k)?TAGS[k].tint:'#fff',color:tags.includes(k)?TAGS[k].color:'var(--ink-3)',height:28}}>{TAGS[k].label}</button>
            ))}</div>
          </div>
          <div>
            <label style={{fontSize:12,fontWeight:600,color:'var(--ink-3)',display:'block',marginBottom:7}}>Assignees</label>
            <div style={{display:'flex',gap:7,flexWrap:'wrap'}}>{PL.map(p=>(
              <button key={p.id} onClick={()=>toggle(assignees,setAssignees,p.id)} title={p.name}
                style={{border:0,background:'transparent',padding:0,cursor:'pointer',borderRadius:'50%',opacity:assignees.includes(p.id)?1:0.4,
                  outline:assignees.includes(p.id)?'2px solid '+p.color:'none',outlineOffset:2,transition:'.12s'}}><Avatar id={p.id} size={30} ring={false}/></button>
            ))}</div>
          </div>
        </div>
        <div style={{padding:'14px 22px',borderTop:'1px solid var(--line)',display:'flex',justifyContent:'flex-end',gap:9,background:'var(--surface-2)'}}>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={submit}><Icon name="plus" size={16} sw={2.2}/>Create task</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { WorkspaceDetail, CreateModal, ContentWorkspace, WsHeader });
