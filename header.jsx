// header.jsx — sticky top navigation
const { useState, useRef, useEffect } = React;

function useClickOutside(ref, onClose){
  useEffect(()=>{
    function h(e){ if(ref.current && !ref.current.contains(e.target)) onClose(); }
    document.addEventListener('mousedown', h);
    return ()=>document.removeEventListener('mousedown', h);
  },[]);
}

function Header({page, setPage, onCreate, onSearch, navMode, setNavMode}){
  const [wsOpen, setWsOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const wsRef = useRef(), notifRef = useRef(), avRef = useRef();
  const [avOpen, setAvOpen] = useState(false);
  useClickOutside(wsRef, ()=>setWsOpen(false));
  useClickOutside(notifRef, ()=>setNotifOpen(false));
  useClickOutside(avRef, ()=>setAvOpen(false));

  const nav = [
    {id:'dashboard', label:'Dashboard'},
    {id:'tasks', label:'Tasks'},
    {id:'workspaces', label:'Workspaces', dropdown:true},
    {id:'metrics', label:'Metrics'},
  ];
  const isWsActive = ['workspaces','content','teams','requests','review'].includes(page);

  React.useEffect(()=>{ setDrawerOpen(false); setSearchOpen(false); }, [page]);

  return (
    <header style={{position:'sticky',top:0,zIndex:100,height:'var(--header-h)',
      background:'rgba(255,255,255,0.72)',backdropFilter:'blur(18px) saturate(1.4)',
      WebkitBackdropFilter:'blur(18px) saturate(1.4)',
      borderBottom:'1px solid rgba(220,227,237,0.8)'}}>
      <div className="header-inner" style={{maxWidth:'var(--maxw)',margin:'0 auto',height:'100%',padding:'0 28px',
        display:'flex',alignItems:'center',gap:18}}>

        {/* hamburger (mobile only) */}
        <button className="btn btn-ghost btn-icon only-mobile" title="Menu" onClick={()=>setDrawerOpen(true)} style={{marginLeft:-8,marginRight:-4}}>
          <Icon name="menu" size={20}/>
        </button>

        <Brand size={28} onClick={()=>setPage('dashboard')}/>
        <div className="hide-mobile" style={{width:1,height:26,background:'var(--line-2)',margin:'0 2px'}}></div>

        <nav className="nav-desktop" style={{display:'flex',alignItems:'center',gap:3,position:'relative'}}>
          {nav.map(n=> n.dropdown ? (
            <div key={n.id} ref={wsRef} style={{position:'relative'}}>
              <button className={'navlink'+(isWsActive?' active':'')} onClick={()=>{setWsOpen(o=>!o);}}>
                {n.label}<Icon name="chevron_down" size={14} sw={2} style={{transition:'transform .15s',transform:wsOpen?'rotate(180deg)':'none',opacity:.6}}/>
              </button>
              {wsOpen && (
                <div className="pop card" style={{position:'absolute',top:42,left:0,width:288,padding:7,
                  boxShadow:'var(--shadow-lg)',borderRadius:12}}>
                  {WORKSPACES.map(w=>(
                    <button key={w.id} onClick={()=>{setPage(w.id);setWsOpen(false);}}
                      style={{display:'flex',gap:11,alignItems:'center',width:'100%',padding:'9px 10px',border:0,
                        background:'transparent',borderRadius:8,textAlign:'left',cursor:'pointer'}}
                      onMouseEnter={e=>e.currentTarget.style.background='var(--hover)'}
                      onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                      <span style={{width:34,height:34,borderRadius:9,background:w.tint,color:w.color,
                        display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}>
                        <Icon name={w.icon} size={17}/></span>
                      <span style={{flex:1,minWidth:0}}>
                        <span style={{display:'block',fontSize:13.5,fontWeight:600,color:'var(--ink)'}}>{w.name}</span>
                        <span style={{display:'block',fontSize:11.5,color:'var(--ink-3)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{w.desc}</span>
                      </span>
                      <span className="badge" style={{background:'#F2F5F9',color:'var(--ink-3)'}}>{w.active}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <button key={n.id} className={'navlink'+(page===n.id?' active':'')} onClick={()=>setPage(n.id)}>{n.label}</button>
          ))}
        </nav>

        <div style={{flex:1}}></div>

        {/* search (desktop) */}
        <button className="search-desktop" onClick={()=>onSearch&&onSearch('finance')} style={{display:'flex',alignItems:'center',gap:8,height:36,padding:'0 12px',width:230,
          border:'1px solid var(--line-2)',background:'rgba(255,255,255,.6)',borderRadius:8,color:'var(--ink-3)',
          fontSize:13,cursor:'pointer',transition:'.15s'}}
          onMouseEnter={e=>e.currentTarget.style.background='#fff'}
          onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,.6)'}>
          <Icon name="search" size={16}/><span style={{flex:1,textAlign:'left'}}>Search…</span>
          <span className="kbd">⌘K</span>
        </button>

        {/* search icon (mobile) */}
        <button className="btn btn-ghost btn-icon only-mobile" title="Search" onClick={()=>setSearchOpen(true)}><Icon name="search" size={19}/></button>

        <div className="header-actions-desktop" style={{display:'flex',alignItems:'center',gap:6}}>
          <button className="btn btn-ghost btn-icon" title="Messages"><Icon name="message" size={18}/></button>
        </div>
        <div ref={notifRef} style={{position:'relative'}}>
          <button className="btn btn-ghost btn-icon" title="Notifications" onClick={()=>setNotifOpen(o=>!o)} style={{position:'relative'}}>
            <Icon name="bell" size={18}/>
            <span style={{position:'absolute',top:6,right:7,width:7,height:7,borderRadius:'50%',background:'var(--coral)',boxShadow:'0 0 0 2px rgba(255,255,255,.9)'}}></span>
          </button>
          {notifOpen && <NotifPanel/>}
        </div>
        <button className="btn btn-ghost btn-icon header-actions-desktop" title="Apps"><Icon name="apps" size={18}/></button>

        {/* avatar + menu */}
        <div ref={avRef} style={{position:'relative'}}>
          <button title="Tyler Chen" onClick={()=>setAvOpen(o=>!o)} style={{border:0,background:'transparent',padding:0,cursor:'pointer',marginLeft:2,display:'flex'}}>
            <span className="av" style={{width:32,height:32,background:PEOPLE.tyler.color,fontSize:12,boxShadow:'0 0 0 2px #fff, 0 1px 3px rgba(29,53,87,.2)'}}>TC</span>
          </button>
          {avOpen && <AvatarMenu navMode={navMode} setNavMode={setNavMode} onClose={()=>setAvOpen(false)} setPage={setPage}/>}
        </div>
      </div>

      {/* mobile search overlay — portaled to body so backdrop-filter on <header> doesn't clip it */}
      {searchOpen && ReactDOM.createPortal(
        <div className="search-overlay">
          <Icon name="search" size={18} style={{color:'var(--ink-3)',flex:'none'}}/>
          <input autoFocus placeholder="Search files, folders & people…" 
            onKeyDown={e=>{if(e.key==='Enter'){onSearch&&onSearch(e.target.value||'finance');setSearchOpen(false);}}}
            style={{flex:1,border:0,outline:'none',fontSize:15,fontFamily:'inherit',background:'transparent'}}/>
          <button className="btn btn-ghost btn-icon" onClick={()=>setSearchOpen(false)}><Icon name="x" size={19}/></button>
        </div>, document.body)}

      {/* mobile nav drawer — portaled to body for the same reason */}
      {drawerOpen && ReactDOM.createPortal(
        <NavDrawer page={page} setPage={setPage} isWsActive={isWsActive} onClose={()=>setDrawerOpen(false)} navMode={navMode} setNavMode={setNavMode}/>,
        document.body)}
    </header>
  );
}

function NavDrawer({page, setPage, isWsActive, onClose, navMode, setNavMode}){
  const main = [
    {id:'dashboard', label:'Dashboard', icon:'grid'},
    {id:'tasks', label:'Tasks', icon:'check_square'},
    {id:'metrics', label:'Metrics', icon:'chart'},
  ];
  const go = (id)=>{ setPage(id); onClose(); };
  return (
    <React.Fragment>
      <div className="drawer-scrim" onClick={onClose}></div>
      <aside className="nav-drawer">
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'15px 16px 14px',borderBottom:'1px solid var(--line)'}}>
          <Brand size={28} onClick={()=>go('dashboard')}/>
          <button className="btn btn-ghost btn-icon" onClick={onClose}><Icon name="x" size={20}/></button>
        </div>
        <div style={{flex:1,overflowY:'auto',padding:'10px 10px'}}>
          {main.map(m=>(
            <button key={m.id} className={'nav-drawer-item'+(page===m.id?' active':'')} onClick={()=>go(m.id)}>
              <span className="di"><Icon name={m.icon} size={19}/></span>{m.label}
            </button>
          ))}
          <div style={{padding:'14px 18px 6px',fontSize:11,fontWeight:600,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--ink-4)'}}>Workspaces</div>
          {WORKSPACES.map(w=>(
            <button key={w.id} className={'nav-drawer-item'+(page===w.id?' active':'')} onClick={()=>go(w.id)}>
              <span className="di" style={{color:w.color}}><Icon name={w.icon} size={18}/></span>{w.name}
              <span style={{flex:1}}></span><span className="badge" style={{background:'#F2F5F9',color:'var(--ink-3)'}}>{w.active}</span>
            </button>
          ))}
          <div style={{height:1,background:'var(--line)',margin:'10px 8px'}}></div>
          <button className="nav-drawer-item" onClick={onClose}><span className="di"><Icon name="user" size={19}/></span>User Profile</button>
          <button className="nav-drawer-item" onClick={onClose}><span className="di"><Icon name="settings" size={19}/></span>Settings</button>
          <button className="nav-drawer-item" onClick={onClose}><span className="di"><Icon name="logout" size={19}/></span>Logout</button>
        </div>
        <div style={{padding:'12px 14px',borderTop:'1px solid var(--line)',display:'flex',alignItems:'center',gap:11}}>
          <span className="av" style={{width:36,height:36,background:PEOPLE.tyler.color,fontSize:13}}>TC</span>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:13.5,fontWeight:600,color:'var(--ink)'}}>Tyler Chen</div>
            <div className="muted" style={{fontSize:11.5}}>Operations Lead</div>
          </div>
        </div>
      </aside>
    </React.Fragment>
  );
}

function AvatarMenu({navMode, setNavMode, onClose, setPage, posStyle}){
  const items=[
    {label:'Profile', icon:'user'},
    {label:'Settings', icon:'settings'},
  ];
  return (
    <div className="pop card" style={{position:'absolute',width:248,padding:7,boxShadow:'var(--shadow-lg)',borderRadius:12,zIndex:120,...(posStyle||{top:46,right:0})}}>
      <div style={{display:'flex',alignItems:'center',gap:11,padding:'8px 9px 11px'}}>
        <span className="av" style={{width:38,height:38,background:PEOPLE.tyler.color,fontSize:14}}>TC</span>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:13.5,fontWeight:600,color:'var(--ink)'}}>Tyler Chen</div>
          <div className="muted" style={{fontSize:11.5}}>tyler@imin.co</div>
        </div>
      </div>
      <div style={{height:1,background:'var(--line)',margin:'2px 4px 6px'}}></div>

      {/* nav toggle */}
      <div style={{padding:'4px 9px 8px'}}>
        <div style={{fontSize:11.5,fontWeight:600,color:'var(--ink-3)',marginBottom:7,display:'flex',alignItems:'center',gap:6}}>
          <Icon name="columns" size={13}/>Navigation layout
        </div>
        <div style={{display:'flex',gap:3,background:'#EEF1F6',padding:3,borderRadius:9}}>
          {[['top','Top nav','columns'],['side','Side nav','layers']].map(([id,lb,ic])=>(
            <button key={id} onClick={()=>setNavMode(id)} style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:6,border:0,
              background:navMode===id?'#fff':'transparent',color:navMode===id?'var(--ink)':'var(--ink-3)',fontSize:12.5,fontWeight:550,
              padding:'7px 8px',borderRadius:7,cursor:'pointer',boxShadow:navMode===id?'var(--shadow-sm)':'none',transition:'.12s'}}>
              <Icon name={ic} size={14}/>{lb}</button>
          ))}
        </div>
      </div>
      <div style={{height:1,background:'var(--line)',margin:'6px 4px'}}></div>
      {items.map(it=>(
        <button key={it.label} className="nav-drawer-item" style={{height:40,fontSize:13.5,borderRadius:8}} onClick={onClose}>
          <span className="di"><Icon name={it.icon} size={17}/></span>{it.label}
        </button>
      ))}
      <button className="nav-drawer-item" style={{height:40,fontSize:13.5,borderRadius:8,color:'var(--coral)'}} onClick={onClose}>
        <span className="di"><Icon name="logout" size={17}/></span>Logout
      </button>
    </div>
  );
}

function SideNav({page, setPage, onSearch, navMode, setNavMode}){
  const [wsExpand, setWsExpand] = useState(true);
  const [avOpen, setAvOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const avRef = useRef(), notifRef = useRef();
  useClickOutside(avRef, ()=>setAvOpen(false));
  useClickOutside(notifRef, ()=>setNotifOpen(false));
  const isWsActive = ['workspaces','content','teams','requests','review'].includes(page);
  const main = [
    {id:'dashboard', label:'Dashboard', icon:'grid'},
    {id:'tasks', label:'Tasks', icon:'check_square'},
  ];
  return (
    <aside className="side-rail">
      <div style={{padding:'16px 18px 12px'}}>
        <Brand size={28} onClick={()=>setPage('dashboard')}/>
      </div>
      <div style={{padding:'0 12px 10px'}}>
        <button onClick={()=>onSearch&&onSearch('finance')} style={{display:'flex',alignItems:'center',gap:9,width:'100%',height:38,padding:'0 11px',
          border:'1px solid var(--line-2)',background:'#fff',borderRadius:9,color:'var(--ink-3)',fontSize:13,cursor:'pointer',transition:'.15s'}}
          onMouseEnter={e=>e.currentTarget.style.background='var(--hover)'} onMouseLeave={e=>e.currentTarget.style.background='#fff'}>
          <Icon name="search" size={16}/><span style={{flex:1,textAlign:'left'}}>Search…</span><span className="kbd">⌘K</span>
        </button>
      </div>
      <div style={{padding:'4px 12px',flex:1,overflowY:'auto'}}>
        {main.map(m=>(
          <button key={m.id} className={'nav-drawer-item'+(page===m.id?' active':'')} onClick={()=>setPage(m.id)}>
            <span className="di"><Icon name={m.icon} size={19}/></span>{m.label}
          </button>
        ))}
        <button className={'nav-drawer-item'+(isWsActive?' active':'')} onClick={()=>setWsExpand(e=>!e)}>
          <span className="di"><Icon name="layers" size={19}/></span>Workspaces
          <span style={{flex:1}}></span>
          <Icon name="chevron_down" size={15} style={{transform:wsExpand?'rotate(180deg)':'none',transition:'.15s',opacity:.6}}/>
        </button>
        {wsExpand && (
          <div style={{paddingLeft:14,marginTop:1}}>
            {WORKSPACES.map(w=>(
              <button key={w.id} className={'nav-drawer-item'+(page===w.id?' active':'')} style={{height:42}} onClick={()=>setPage(w.id)}>
                <span className="di" style={{color:w.color}}><Icon name={w.icon} size={17}/></span>
                <span style={{fontSize:13.5}}>{w.name}</span>
                <span style={{flex:1}}></span><span className="badge" style={{background:'#F2F5F9',color:'var(--ink-3)'}}>{w.active}</span>
              </button>
            ))}
          </div>
        )}
        <button className={'nav-drawer-item'+(page==='metrics'?' active':'')} onClick={()=>setPage('metrics')}>
          <span className="di"><Icon name="chart" size={19}/></span>Metrics
        </button>
      </div>
      <div style={{padding:'10px 12px',borderTop:'1px solid var(--line)',display:'flex',alignItems:'center',gap:8,position:'relative'}}>
        <div ref={avRef} style={{position:'relative',flex:1,minWidth:0}}>
          <button onClick={()=>setAvOpen(o=>!o)} style={{display:'flex',alignItems:'center',gap:10,width:'100%',border:0,background:'transparent',padding:'4px 4px',borderRadius:9,cursor:'pointer'}}
            onMouseEnter={e=>e.currentTarget.style.background='var(--hover)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
            <span className="av" style={{width:34,height:34,background:PEOPLE.tyler.color,fontSize:12}}>TC</span>
            <span style={{flex:1,minWidth:0,textAlign:'left'}}>
              <span style={{display:'block',fontSize:13,fontWeight:600,color:'var(--ink)'}}>Tyler Chen</span>
              <span className="muted" style={{display:'block',fontSize:11}}>Operations Lead</span>
            </span>
            <Icon name="chevron_down" size={15} style={{opacity:.5,flex:'none'}}/>
          </button>
          {avOpen && <AvatarMenu navMode={navMode} setNavMode={setNavMode} setPage={setPage} onClose={()=>setAvOpen(false)} posStyle={{bottom:'calc(100% + 6px)',left:4,right:4,width:'auto'}}/>}
        </div>
        <div ref={notifRef} style={{position:'relative',flex:'none'}}>
          <button className="btn btn-ghost btn-icon" title="Notifications" onClick={()=>setNotifOpen(o=>!o)} style={{position:'relative'}}>
            <Icon name="bell" size={18}/>
            <span style={{position:'absolute',top:6,right:7,width:7,height:7,borderRadius:'50%',background:'var(--coral)',boxShadow:'0 0 0 2px #fff'}}></span>
          </button>
          {notifOpen && <NotifPanel posStyle={{bottom:'calc(100% + 6px)',left:0}}/>}
        </div>
      </div>
    </aside>
  );
}

function NotifPanel({posStyle}){
  const items = ACTIVITY.slice(0,5);
  return (
    <div className="pop card" style={{position:'absolute',width:340,padding:0,boxShadow:'var(--shadow-lg)',borderRadius:12,overflow:'hidden',zIndex:120,...(posStyle||{top:44,right:0})}}>
      <div style={{padding:'13px 16px',borderBottom:'1px solid var(--line)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontWeight:600,fontSize:14}}>Notifications</span>
        <span className="linkish" style={{fontSize:12.5}}>Mark all read</span>
      </div>
      <div style={{maxHeight:360,overflowY:'auto'}}>
        {items.map((a,i)=>{
          const k=ACT_KIND[a.kind];
          return (
            <div key={i} style={{display:'flex',gap:11,padding:'12px 16px',borderBottom:i<items.length-1?'1px solid var(--line)':'0',cursor:'pointer'}}
              onMouseEnter={e=>e.currentTarget.style.background='var(--surface-2)'}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              <span style={{width:30,height:30,borderRadius:8,background:k.tint,color:k.color,display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name={k.icon} size={15}/></span>
              <div style={{flex:1,fontSize:12.5,lineHeight:1.45,color:'var(--ink-2)'}}>
                <b style={{color:'var(--ink)',fontWeight:600}}>{PEOPLE[a.who].name}</b> {a.verb} <b style={{color:'var(--ink)',fontWeight:550}}>{a.what}</b>
                <div className="muted" style={{fontSize:11,marginTop:2}}>{a.t} ago</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { Header, SideNav, NotifPanel, useClickOutside });
