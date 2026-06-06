// header.jsx — sticky top navigation
const { useState, useRef, useEffect } = React;

function useClickOutside(ref, onClose){
  useEffect(()=>{
    function h(e){ if(ref.current && !ref.current.contains(e.target)) onClose(); }
    document.addEventListener('mousedown', h);
    return ()=>document.removeEventListener('mousedown', h);
  },[]);
}

function Header({page, setPage, onCreate, onSearch}){
  const [wsOpen, setWsOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const wsRef = useRef(), notifRef = useRef();
  useClickOutside(wsRef, ()=>setWsOpen(false));
  useClickOutside(notifRef, ()=>setNotifOpen(false));

  const nav = [
    {id:'dashboard', label:'Dashboard'},
    {id:'explore', label:'Explore'},
    {id:'tasks', label:'Tasks'},
    {id:'workspaces', label:'Workspaces', dropdown:true},
    {id:'metrics', label:'Metrics'},
  ];
  const isWsActive = ['workspaces','clearance','memos','prep','briefings','knowledge','upload','teams','requests','review'].includes(page);

  return (
    <header style={{position:'sticky',top:0,zIndex:100,height:'var(--header-h)',
      background:'rgba(255,255,255,0.72)',backdropFilter:'blur(18px) saturate(1.4)',
      WebkitBackdropFilter:'blur(18px) saturate(1.4)',
      borderBottom:'1px solid rgba(220,227,237,0.8)'}}>
      <div style={{maxWidth:'var(--maxw)',margin:'0 auto',height:'100%',padding:'0 28px',
        display:'flex',alignItems:'center',gap:18}}>
        <Brand size={28} onClick={()=>setPage('dashboard')}/>
        <div style={{width:1,height:26,background:'var(--line-2)',margin:'0 2px'}}></div>

        <nav style={{display:'flex',alignItems:'center',gap:3,position:'relative'}}>
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

        <button className="btn btn-ghost btn-icon" title="Messages"><Icon name="message" size={18}/></button>
        <div ref={notifRef} style={{position:'relative'}}>
          <button className="btn btn-ghost btn-icon" title="Notifications" onClick={()=>setNotifOpen(o=>!o)} style={{position:'relative'}}>
            <Icon name="bell" size={18}/>
            <span style={{position:'absolute',top:6,right:7,width:7,height:7,borderRadius:'50%',background:'var(--coral)',boxShadow:'0 0 0 2px rgba(255,255,255,.9)'}}></span>
          </button>
          {notifOpen && <NotifPanel/>}
        </div>
        <button className="btn btn-ghost btn-icon" title="Apps"><Icon name="apps" size={18}/></button>

        <button title="Tyler Chen" style={{border:0,background:'transparent',padding:0,cursor:'pointer',marginLeft:2}}>
          <span className="av" style={{width:32,height:32,background:PEOPLE.tyler.color,fontSize:12,boxShadow:'0 0 0 2px #fff, 0 1px 3px rgba(29,53,87,.2)'}}>TC</span>
        </button>
      </div>
    </header>
  );
}

function NotifPanel(){
  const items = ACTIVITY.slice(0,5);
  return (
    <div className="pop card" style={{position:'absolute',top:44,right:0,width:340,padding:0,boxShadow:'var(--shadow-lg)',borderRadius:12,overflow:'hidden'}}>
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

Object.assign(window, { Header, NotifPanel, useClickOutside });
