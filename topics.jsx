// topics.jsx — Topics lens: browse data by theme

function TopicsGrid({filter, openTopic}){
  const f=(filter||'').toLowerCase();
  const list=TOPICS.filter(t=>t.name.toLowerCase().includes(f) || t.desc.toLowerCase().includes(f));
  if(!list.length) return <Empty label="No topics match your filter."/>;
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,paddingBottom:8}}>
      {list.map(t=>(
        <div key={t.id} className="card card-hover card-pad" onClick={()=>openTopic&&openTopic(t.id)}
          style={{display:'flex',flexDirection:'column',gap:13,cursor:'pointer'}}>
          <div style={{display:'flex',alignItems:'flex-start',gap:12}}>
            <span style={{width:40,height:40,borderRadius:11,background:t.color+'1a',color:t.color,display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name={t.icon} size={20}/></span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:14.5,fontWeight:600,color:'var(--ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',letterSpacing:'-.01em'}}>{t.name}</div>
              <div className="muted" style={{fontSize:11.5,marginTop:2,lineHeight:1.4,display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{t.desc}</div>
            </div>
          </div>
          <div style={{display:'flex',gap:0,paddingTop:11,borderTop:'1px solid var(--line)'}}>
            <div style={{flex:1,textAlign:'center'}}>
              <div style={{fontSize:15,fontWeight:700,color:'var(--ink)',letterSpacing:'-.01em'}}>{t.items}</div>
              <div style={{fontSize:10.5,color:'var(--ink-4)',fontWeight:500,marginTop:1}}>Items</div>
            </div>
            <div style={{width:1,background:'var(--line)'}}></div>
            <div style={{flex:1,textAlign:'center'}}>
              <div style={{fontSize:15,fontWeight:700,color:'var(--ink)',letterSpacing:'-.01em'}}>{t.collections.length}</div>
              <div style={{fontSize:10.5,color:'var(--ink-4)',fontWeight:500,marginTop:1}}>Collections</div>
            </div>
            <div style={{width:1,background:'var(--line)'}}></div>
            <div style={{flex:1,textAlign:'center'}}>
              <div style={{fontSize:15,fontWeight:700,color:'var(--ink)',letterSpacing:'-.01em'}}>{t.devices.length}</div>
              <div style={{fontSize:10.5,color:'var(--ink-4)',fontWeight:500,marginTop:1}}>Devices</div>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:8}}>
            <AvatarStack ids={t.people} size={22} max={4}/>
            <span className="muted" style={{fontSize:11.5,display:'flex',alignItems:'center',gap:5}}><Icon name="clock" size={12}/>{t.updated}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------- Topic detail page ----------
function TopicMiniRow({icon, color, title, sub, badge, onClick}){
  return (
    <div onClick={onClick}
      style={{display:'flex',alignItems:'center',gap:11,padding:'10px 8px',margin:'0 -8px',cursor:'pointer',borderRadius:8,transition:'.12s'}}
      onMouseEnter={e=>e.currentTarget.style.background='var(--surface-2)'}
      onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
      <span style={{width:30,height:30,borderRadius:8,background:color+'1a',color:color,display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name={icon} size={15}/></span>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:13,fontWeight:600,color:'var(--ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{title}</div>
        <div className="muted" style={{fontSize:11.5,marginTop:1,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{sub}</div>
      </div>
      {badge}
      <Icon name="chevron_right" size={15} style={{color:'var(--ink-4)',flex:'none'}}/>
    </div>
  );
}

function TopicDetail({id, setPage, openDevice, openPerson, flash}){
  const t = TOPICS.find(x=>x.id===id) || TOPICS[0];
  const cols = t.collections.map(fid=>FOLDERS.find(f=>f.id===fid)).filter(Boolean);
  const devs = t.devices.map(did=>DEVICES.find(d=>d.id===did)).filter(Boolean);
  const ppl = t.people.map(pid=>PEOPLE[pid]).filter(Boolean);

  return (
    <div className="rise">
      {/* header band */}
      <div style={{borderBottom:'1px solid var(--line)',background:'rgba(255,255,255,.65)',backdropFilter:'blur(4px)'}}>
        <div className="page" style={{paddingTop:16,paddingBottom:20}}>
          <div style={{display:'flex',alignItems:'center',gap:7,fontSize:12.5,color:'var(--ink-3)',fontWeight:500,marginBottom:16}}>
            <span style={{cursor:'pointer'}} onClick={()=>setPage('dashboard')}>Home</span>
            <Icon name="chevron_right" size={13} style={{opacity:.6}}/>
            <span style={{cursor:'pointer'}} onClick={()=>setPage('explore')}>Explore</span>
            <Icon name="chevron_right" size={13} style={{opacity:.6}}/>
            <span style={{color:'var(--ink-2)'}}>{t.name}</span>
          </div>
          <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',gap:20,flexWrap:'wrap'}}>
            <div style={{display:'flex',alignItems:'center',gap:18,minWidth:0}}>
              <span style={{width:64,height:64,borderRadius:15,background:t.color+'1a',color:t.color,display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name={t.icon} size={30}/></span>
              <div style={{minWidth:0}}>
                <h1 style={{fontSize:25,fontWeight:700,letterSpacing:'-.03em',margin:0,color:'var(--ink)'}}>{t.name}</h1>
                <p className="muted" style={{fontSize:13.5,margin:'6px 0 0',maxWidth:520,lineHeight:1.5}}>{t.desc}</p>
              </div>
            </div>
            <div style={{display:'flex',gap:9,flexWrap:'wrap'}}>
              <button className="btn btn-primary btn-sm" onClick={()=>flash&&flash(`Opening ${t.items} items in ${t.name}…`)}><Icon name="layers" size={15}/>Open all items</button>
              <button className="btn btn-secondary btn-sm" onClick={()=>flash&&flash('Lens saved')}><Icon name="bookmark" size={15}/>Save lens</button>
              <button className="btn btn-ghost btn-sm" style={{border:'1px solid var(--line-2)',padding:'0 10px'}} onClick={()=>flash&&flash('More actions')}><Icon name="more" size={16}/></button>
            </div>
          </div>
        </div>
      </div>

      {/* body */}
      <div className="page" style={{paddingTop:24}}>
        <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) 340px',gap:20,alignItems:'start'}}>
          {/* MAIN */}
          <div style={{display:'flex',flexDirection:'column',gap:20,minWidth:0}}>
            {/* stat tiles */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14}}>
              {[['Items',t.items,'layers','#1D6BD0'],['Collections',cols.length,'collections','#8A63C4'],['Devices',devs.length,'phone','#1FA98A'],['Contributors',ppl.length,'users','#FF9A4E']].map(([l,v,ic,c])=>(
                <div key={l} className="card card-pad" style={{display:'flex',alignItems:'center',gap:13}}>
                  <span style={{width:38,height:38,borderRadius:10,background:c+'1a',color:c,display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name={ic} size={19}/></span>
                  <div>
                    <div style={{fontSize:22,fontWeight:700,color:'var(--ink)',letterSpacing:'-.02em',lineHeight:1}}>{v}</div>
                    <div className="muted" style={{fontSize:11.5,marginTop:3,fontWeight:500}}>{l}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* collections */}
            <div className="card card-pad">
              <SectionHead icon="collections" title="Collections" sub={`${cols.length} in this topic`}/>
              {cols.length===0 ? <div className="muted" style={{fontSize:13,padding:'8px 0'}}>No collections tagged to this topic yet.</div> : (
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2px 24px'}}>
                  {cols.map(f=>(
                    <TopicMiniRow key={f.id} icon="folder" color={f.color} title={f.name} sub={`${f.files} files · ${f.size}`}
                      onClick={()=>{window.__reviewFolder=f.name;setPage('review');}}/>
                  ))}
                </div>
              )}
            </div>

            {/* devices */}
            <div className="card card-pad">
              <SectionHead icon="phone" title="Devices" sub={`${devs.length} in this topic`}/>
              {devs.length===0 ? <div className="muted" style={{fontSize:13,padding:'8px 0'}}>No devices tagged to this topic.</div> : (
                <div style={{display:'flex',flexDirection:'column'}}>
                  {devs.map((d,i)=>{ const ty=DEVICE_TYPE[d.type], stt=DEVICE_STATUS[d.status]; return (
                    <div key={d.id} style={{borderTop:i?'1px solid var(--line)':0}}>
                      <TopicMiniRow icon={ty.icon} color={d.color} title={d.name}
                        sub={<span style={{fontFamily:'ui-monospace,Menlo,monospace'}}>{d.ev}</span>}
                        badge={<span className="badge" style={{background:stt.tint,color:stt.color,height:19,fontSize:10.5,flex:'none'}}>{stt.label}</span>}
                        onClick={()=>openDevice&&openDevice(d.id)}/>
                    </div>
                  );})}
                </div>
              )}
            </div>
          </div>

          {/* SIDEBAR */}
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <div className="card card-pad">
              <div className="eyebrow" style={{marginBottom:11}}>Contributors · {ppl.length}</div>
              <div style={{display:'flex',flexDirection:'column',gap:2}}>
                {ppl.map((p,i)=>(
                  <div key={p.id} onClick={()=>openPerson&&openPerson(p.id)}
                    style={{display:'flex',alignItems:'center',gap:11,padding:'9px 8px',margin:'0 -8px',borderTop:i?'1px solid var(--line)':0,cursor:'pointer',borderRadius:8,transition:'.12s'}}
                    onMouseEnter={e=>e.currentTarget.style.background='var(--surface-2)'}
                    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    <Avatar id={p.id} size={32} ring={false}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:13,fontWeight:600,color:'var(--ink)'}}>{p.name}</div>
                      <div className="muted" style={{fontSize:11.5,marginTop:1,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{p.role}</div>
                    </div>
                    <Icon name="chevron_right" size={15} style={{color:'var(--ink-4)',flex:'none'}}/>
                  </div>
                ))}
              </div>
            </div>

            <div className="card card-pad" style={{display:'flex',gap:12,alignItems:'flex-start'}}>
              <span style={{width:34,height:34,borderRadius:9,background:t.color+'1a',color:t.color,display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name="bulb" size={18}/></span>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:'var(--ink)'}}>About this lens</div>
                <div className="muted" style={{fontSize:11.5,marginTop:3,lineHeight:1.5}}>Topics cluster related content, devices and people so you can browse everything connected to a theme in one place. Last updated {t.updated}.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TopicsGrid, TopicDetail });
