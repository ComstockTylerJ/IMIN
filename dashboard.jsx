// dashboard.jsx — operational command center

function Dashboard({setPage, openTask, openCreate}){
  return (
    <div className="rise">
      <DashHero openCreate={openCreate} setPage={setPage}/>
      <div className="page" style={{marginTop:-44,position:'relative',zIndex:2}}>
        <KpiRow setPage={setPage}/>
        <div style={{display:'grid',gridTemplateColumns:'minmax(0,1.65fr) minmax(0,1fr)',gap:20,marginTop:22,alignItems:'start'}}>
          <div style={{display:'flex',flexDirection:'column',gap:20,minWidth:0}}>
            <MyWork openTask={openTask} setPage={setPage}/>
            <RequestsQueue openTask={openTask}/>
            <Workload/>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:20,minWidth:0}}>
            <ActionCenter setPage={setPage}/>
            <ActivityFeed/>
          </div>
        </div>
        <div style={{marginTop:30}}>
          <SectionHead title="Workspaces" sub="Jump back into where the work lives" icon="layers"/>
          <RecentWorkspaces setPage={setPage}/>
        </div>
      </div>
    </div>
  );
}

function DashHero({openCreate, setPage}){
  const online=['diego','lena','noah','maya','priya'];
  return (
    <div style={{position:'relative',paddingTop:40,paddingBottom:72,overflow:'hidden'}}>
      <HeroPattern/>
      <div className="page" style={{position:'relative',zIndex:1,paddingBottom:0}}>
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:24,flexWrap:'wrap'}}>
          <div>
            <div className="muted" style={{fontSize:13,fontWeight:500,display:'flex',alignItems:'center',gap:8}}>
              <Icon name="calendar" size={14}/> Friday, June 5, 2026
              <span style={{width:3,height:3,borderRadius:'50%',background:'var(--ink-4)'}}></span>
              Week 23
            </div>
            <h1 style={{fontSize:30,fontWeight:700,letterSpacing:'-.03em',margin:'8px 0 0',color:'var(--ink)'}}>
              Welcome back, Tyler!
            </h1>
            <p className="sec" style={{fontSize:14.5,margin:'6px 0 0',maxWidth:520}}>
              You have <b style={{color:'var(--ink)'}}>4 tasks</b> due today and <b style={{color:'var(--coral)'}}>2 reviews</b> awaiting your sign-off.
            </p>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:12,alignItems:'stretch'}}>
            <div className="card" style={{padding:'13px 16px',display:'flex',alignItems:'center',gap:14,boxShadow:'var(--shadow)'}}>
            <div>
              <div className="eyebrow" style={{marginBottom:5}}>Team online</div>
              <div style={{display:'flex',alignItems:'center',gap:9}}>
                <AvatarStack ids={online} size={28} max={5}/>
                <span style={{fontSize:13,color:'var(--ink-2)',fontWeight:500}}>5 of 8 active</span>
              </div>
            </div>
            <div style={{width:1,height:38,background:'var(--line)'}}></div>
            <div>
              <div className="eyebrow" style={{marginBottom:5}}>Capacity</div>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <span style={{fontSize:18,fontWeight:700,color:'var(--ink)',letterSpacing:'-.02em'}}>68%</span>
                <span style={{width:54,height:6,background:'#EEF2F7',borderRadius:4,overflow:'hidden'}}>
                  <span style={{display:'block',width:'68%',height:'100%',background:'var(--logo-grad)',borderRadius:4}}></span>
                </span>
              </div>
            </div>
            </div>
            <button onClick={()=>window.__openAskAI && window.__openAskAI()}
              style={{display:'flex',alignItems:'center',gap:12,padding:'12px 14px',borderRadius:14,cursor:'pointer',textAlign:'left',
                border:'1px solid #CBDDF5',background:'linear-gradient(180deg,#F7FAFE,#fff)',boxShadow:'var(--shadow-sm)',transition:'.15s'}}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-1px)';e.currentTarget.style.boxShadow='var(--shadow-md)';e.currentTarget.style.borderColor='#9FC1EC';}}
              onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='var(--shadow-sm)';e.currentTarget.style.borderColor='#CBDDF5';}}>
              <FleetToken size={36}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:14,fontWeight:700,letterSpacing:'-.01em',color:'var(--ink)',display:'flex',alignItems:'center',gap:7}}>Ask AI
                  <span className="badge" style={{background:'#E7EFFB',color:'#1D6BD0',height:17,fontSize:9.5,letterSpacing:'.04em'}}>COPILOT</span></div>
                <div className="muted" style={{fontSize:11.5,marginTop:1}}>Chat, delegate & watch your agents</div>
              </div>
              <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:30,height:30,borderRadius:9,background:'var(--primary)',color:'#fff',flex:'none'}}><Icon name="message" size={16}/></span>
            </button>
          </div>
        </div>
        <div style={{display:'flex',gap:10,marginTop:22,flexWrap:'wrap'}}>
          <button className="btn btn-primary" onClick={openCreate}>
            <Icon name="plus" size={16} sw={2.2}/>New Request
          </button>
          <button className="btn btn-secondary" onClick={()=>window.__openKickoff && window.__openKickoff()}>
            <Icon name="sparkle" size={16} style={{color:'#1D6BD0'}}/>Delegate to agent
          </button>
        </div>
      </div>
    </div>
  );
}

function KpiRow({setPage}){
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:16}}>
      {KPIS.map(k=>(
        <div key={k.label} className="card card-hover card-pad" style={{cursor:'pointer',display:'flex',flexDirection:'column',gap:12}}
          onClick={()=>setPage('tasks')}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <span style={{fontSize:12.5,fontWeight:550,color:'var(--ink-2)'}}>{k.label}</span>
            <span style={{width:8,height:8,borderRadius:3,background:k.accent}}></span>
          </div>
          <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',gap:8}}>
            <div style={{display:'flex',alignItems:'baseline',gap:8}}>
              <span style={{fontSize:30,fontWeight:700,letterSpacing:'-.03em',lineHeight:1,color:'var(--ink)'}}>{k.value}</span>
              <TrendBadge {...k}/>
            </div>
          </div>
          <Sparkline data={k.spark} color={k.accent} w={170} h={30}/>
        </div>
      ))}
    </div>
  );
}

function MyWork({openTask, setPage}){
  const mine = TASKS.filter(t=>t.assignees.includes('tyler')||['T-187','T-198','T-211','T-201'].includes(t.id)).slice(0,5);
  const tabs=['Assigned','Due Soon','Needs Attention'];
  const [tab,setTab]=React.useState('Assigned');
  let list=mine;
  if(tab==='Due Soon') list=[...mine].sort((a,b)=>new Date(a.due)-new Date(b.due));
  if(tab==='Needs Attention') list=mine.filter(t=>t.priority==='urgent'||t.priority==='high'||t.col==='review');
  return (
    <div className="card card-pad">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}><Icon name="check_square" size={17} style={{color:'var(--ink-3)'}}/><span className="card-title" style={{fontSize:15.5}}>My Work</span></div>
        <div style={{display:'flex',gap:4,background:'#F2F5F9',padding:3,borderRadius:8}}>
          {tabs.map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{border:0,background:tab===t?'#fff':'transparent',color:tab===t?'var(--ink)':'var(--ink-3)',
              fontSize:12.5,fontWeight:550,padding:'5px 10px',borderRadius:6,cursor:'pointer',boxShadow:tab===t?'var(--shadow-sm)':'none',transition:'.12s'}}>{t}</button>
          ))}
        </div>
      </div>
      <div style={{display:'flex',flexDirection:'column'}}>
        {list.map((t,i)=>(
          <div key={t.id} onClick={()=>openTask(t.id)} style={{display:'flex',alignItems:'center',gap:13,padding:'11px 6px',
            borderTop:i?'1px solid var(--line)':'0',cursor:'pointer',borderRadius:8,transition:'.12s'}}
            onMouseEnter={e=>e.currentTarget.style.background='var(--surface-2)'}
            onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
            <span style={{width:8,height:8,borderRadius:'50%',background:STATUS[t.col].color,flex:'none'}}></span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13.5,fontWeight:550,color:'var(--ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{t.file}</div>
              <div style={{display:'flex',alignItems:'center',gap:8,marginTop:3}}>
                {t.tags.slice(0,2).map(tg=><Tag key={tg} k={tg} sm/>)}
                <span className="muted" style={{fontSize:11.5}}>{t.id}</span>
              </div>
            </div>
            {t.priority && (t.priority==='urgent'||t.priority==='high') && <PriorityFlag k={t.priority}/>}
            <span style={{fontSize:12,fontWeight:550,color:t.due==='Jun 4'||t.due==='Jun 5'?'var(--coral)':'var(--ink-2)',display:'flex',alignItems:'center',gap:5}}>
              <Icon name="clock" size={13}/>{t.due}
            </span>
            <AvatarStack ids={t.assignees} size={24} max={2}/>
          </div>
        ))}
      </div>
      <button className="btn btn-ghost btn-sm" style={{marginTop:8,width:'100%'}} onClick={()=>setPage('tasks')}>Open Tasks board<Icon name="arrow_right" size={14}/></button>
    </div>
  );
}

function RequestsQueue({openTask}){
  return (
    <div className="card card-pad">
      <SectionHead title="Requests Queue" sub="Language, review, approval & clearance" icon="inbox"
        action={<button className="btn btn-ghost btn-sm">View all<Icon name="chevron_right" size={14}/></button>}/>
      <div style={{overflowX:'auto',margin:'0 -8px'}}>
        <table className="tbl">
          <thead><tr>
            <th>Request</th><th>Type</th><th>Submitted</th><th>Status</th><th>Reviewer</th><th>Due</th>
          </tr></thead>
          <tbody>
            {REQUESTS.slice(0,6).map(r=>{
              const s=REQ_STATUS[r.status];
              return (
                <tr key={r.id}>
                  <td style={{color:'var(--ink)',fontWeight:550,maxWidth:200}}>
                    <div style={{whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{r.name}</div>
                    <span className="muted" style={{fontSize:11,fontWeight:400}}>{r.id}</span>
                  </td>
                  <td><span className="badge" style={{background:'transparent',border:'1px solid var(--line-2)',color:REQ_TYPE[r.type]}}><span className="dot" style={{background:REQ_TYPE[r.type]}}></span>{r.type}</span></td>
                  <td>{r.submitted}</td>
                  <td><span className="st" style={{background:s.tint,color:s.color}}><span className="dot" style={{background:s.color}}></span>{r.status}</span></td>
                  <td><div style={{display:'flex',alignItems:'center',gap:7}}><Avatar id={r.reviewer} size={22}/><span style={{fontSize:12.5}}>{PEOPLE[r.reviewer].name.split(' ')[0]}</span></div></td>
                  <td style={{color:r.due==='Jun 5'||r.due==='Jun 6'?'var(--coral)':'var(--ink-2)',fontWeight:550}}>{r.due}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Workload(){
  return (
    <div className="card card-pad">
      <SectionHead title="Team Workload" sub="Current utilization & bottlenecks this week" icon="users"/>
      <div style={{display:'flex',flexDirection:'column',gap:13}}>
        {WORKLOAD.map(w=>{
          const p=PEOPLE[w.who];
          const over=w.load>=90, high=w.load>=75;
          const c=over?'var(--coral)':high?'var(--orange)':'var(--lime)';
          return (
            <div key={w.who} style={{display:'flex',alignItems:'center',gap:13}}>
              <Avatar id={w.who} size={28}/>
              <div style={{width:96,flex:'none'}}>
                <div style={{fontSize:12.5,fontWeight:550,color:'var(--ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{p.name.split(' ')[0]} {p.name.split(' ')[1][0]}.</div>
                <div className="muted" style={{fontSize:10.5}}>{p.role}</div>
              </div>
              <div style={{flex:1,height:8,background:'#EEF2F7',borderRadius:5,overflow:'hidden'}}>
                <div style={{width:w.load+'%',height:'100%',background:c,borderRadius:5,transition:'width .8s cubic-bezier(.2,.8,.3,1)'}}></div>
              </div>
              <span style={{fontSize:12.5,fontWeight:600,width:38,textAlign:'right',color:over?'var(--coral)':'var(--ink-2)'}}>{w.load}%</span>
              {over && <span className="badge" style={{background:'var(--coral-t)',color:'var(--coral)'}}>Bottleneck</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ActionCenter({setPage}){
  const agNeed = (typeof needsYou!=='undefined') ? needsYou().length : 0;
  const items=[
    {label:'Agents need you', count:agNeed, icon:'cpu', color:'#1D6BD0', tint:'#E7EFFB', sub:'Agents paused for your sign-off', go:'agents', agent:true},
    {label:'Triage', count:9, icon:'inbox', color:'#1D6BD0', tint:'#E7EFFB', sub:'New items awaiting sorting', go:'requests'},
    {label:'Clearance', count:2, icon:'megaphone', color:'#1F9D86', tint:'#E4F4F0', sub:'Statements pending your screen', go:'clearance'},
    {label:'Memos', count:4, icon:'route', color:'#8A63C4', tint:'#F1EBFA', sub:'Awaiting your concurrence', go:'memos'},
    {label:'Prep', count:3, icon:'pen', color:'#FF9A4E', tint:'#FFF1E4', sub:'Drafts in progress', go:'prep'},
  ];
  return (
    <div className="card card-pad">
      <SectionHead title="Action Center" sub="Items that need you" icon="flame"/>
      <div style={{display:'flex',flexDirection:'column',gap:9}}>
        {items.map(it=>(
          <button key={it.label} onClick={()=>setPage(it.go)} style={{display:'flex',alignItems:'center',gap:12,padding:'11px 12px',
            border:'1px solid '+(it.agent?'#CBDDF5':'var(--line)'),borderRadius:10,background:it.agent?'linear-gradient(180deg,#F7FAFE,#fff)':'#fff',cursor:'pointer',textAlign:'left',transition:'.15s'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=it.color;e.currentTarget.style.background=it.tint+'55';}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=it.agent?'#CBDDF5':'var(--line)';e.currentTarget.style.background=it.agent?'linear-gradient(180deg,#F7FAFE,#fff)':'#fff';}}>
            <span style={{flex:'none'}}>{it.agent ? <FleetToken size={36}/> : <span style={{width:36,height:36,borderRadius:9,background:it.tint,color:it.color,display:'flex',alignItems:'center',justifyContent:'center'}}><Icon name={it.icon} size={18}/></span>}</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13.5,fontWeight:600,color:'var(--ink)'}}>{it.label}</div>
              <div className="muted" style={{fontSize:11.5}}>{it.sub}</div>
            </div>
            <span style={{fontSize:19,fontWeight:700,color:it.color,letterSpacing:'-.02em'}}>{it.count}</span>
            <Icon name="chevron_right" size={16} style={{color:'var(--ink-4)'}}/>
          </button>
        ))}
      </div>
    </div>
  );
}

function ActivityFeed(){
  return (
    <div className="card card-pad">
      <SectionHead title="Team Activity" sub="Live across all workspaces" icon="history"/>
      <div style={{position:'relative'}}>
        <div style={{position:'absolute',left:14,top:6,bottom:6,width:2,background:'var(--line)'}}></div>
        <div style={{display:'flex',flexDirection:'column',gap:2}}>
          {ACTIVITY.map((a,i)=>{
            const k=ACT_KIND[a.kind];
            return (
              <div key={i} style={{display:'flex',gap:13,padding:'8px 0',position:'relative'}}>
                <span style={{width:30,height:30,borderRadius:9,background:k.tint,color:k.color,display:'flex',alignItems:'center',justifyContent:'center',flex:'none',zIndex:1,boxShadow:'0 0 0 3px #fff'}}><Icon name={k.icon} size={15}/></span>
                <div style={{flex:1,fontSize:12.5,lineHeight:1.5,color:'var(--ink-2)',paddingTop:2}}>
                  <b style={{color:'var(--ink)',fontWeight:600}}>{PEOPLE[a.who].name.split(' ')[0]}</b> {a.verb} <span style={{color:'var(--ink)',fontWeight:500}}>{a.what}</span>
                  <div className="muted" style={{fontSize:11,marginTop:1}}>{a.t} ago</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function RecentWorkspaces({setPage}){
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16}}>
      {WORKSPACES.map(w=>(
        <div key={w.id} className="card card-hover card-pad" style={{cursor:'pointer',display:'flex',flexDirection:'column',gap:14}} onClick={()=>setPage(w.id)}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <span style={{width:40,height:40,borderRadius:11,background:w.tint,color:w.color,display:'flex',alignItems:'center',justifyContent:'center'}}><Icon name={w.icon} size={20}/></span>
            <Icon name="arrow_right" size={17} style={{color:'var(--ink-4)'}}/>
          </div>
          <div>
            <div style={{fontSize:15,fontWeight:600,color:'var(--ink)'}}>{w.name}</div>
            <div className="muted" style={{fontSize:12,marginTop:2,lineHeight:1.4}}>{w.desc}</div>
          </div>
          <div style={{display:'flex',gap:16,paddingTop:2,borderTop:'1px solid var(--line)',marginTop:2,paddingTop:11}}>
            <div><span style={{fontSize:17,fontWeight:700,color:'var(--ink)'}}>{w.active}</span><span className="muted" style={{fontSize:11,marginLeft:5}}>active</span></div>
            <div><span style={{fontSize:17,fontWeight:700,color:w.color}}>{w.today}</span><span className="muted" style={{fontSize:11,marginLeft:5}}>today</span></div>
          </div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { Dashboard });
