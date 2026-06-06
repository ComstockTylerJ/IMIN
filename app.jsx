// app.jsx — root, routing, shared task state
function App(){
  const [page, setPage] = React.useState('dashboard');
  const [tasks, setTasks] = React.useState(TASKS);
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [creating, setCreating] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('finance');
  const [profileId, setProfileId] = React.useState(null);
  const [deviceId, setDeviceId] = React.useState(null);
  const [topicId, setTopicId] = React.useState(null);

  function runSearch(q){ setSearchQuery((q||'').trim()||'finance'); setPage('search'); }
  function openPerson(id){ setProfileId(id); setPage('profile'); }
  function openDevice(id){ setDeviceId(id); setPage('device'); }
  function openTopic(id){ setTopicId(id); setPage('topic'); }
  window.__openPerson = openPerson;

  React.useEffect(()=>{ window.scrollTo({top:0}); }, [page]);

  function moveTask(id, col){ setTasks(ts=>ts.map(t=>t.id===id?{...t,col}:t)); }
  function openTask(id){ setSelectedTask(id); }
  function addTask(t){ setTasks(ts=>[t,...ts]); flash('Task created'); }
  function flash(msg){ setToast(msg); clearTimeout(window.__t); window.__t=setTimeout(()=>setToast(null),2400); }

  const task = tasks.find(t=>t.id===selectedTask);

  let body;
  if(page==='dashboard') body=<Dashboard setPage={setPage} openTask={openTask} openCreate={()=>setCreating(true)}/>;
  else if(page==='tasks') body=<TasksPage tasks={tasks} moveTask={moveTask} openTask={openTask} openCreate={()=>setCreating(true)}/>;
  else if(page==='metrics') body=<MetricsPage/>;
  else if(page==='explore') body=<ExplorePage setPage={setPage} openCreate={()=>setCreating(true)} flash={flash} onSearch={runSearch} openPerson={openPerson} openDevice={openDevice} openTopic={openTopic}/>;
  else if(page==='profile') body=<PersonProfile id={profileId} setPage={setPage} openTask={openTask} openDevice={openDevice} flash={flash}/>;
  else if(page==='myprofile') body=<MyProfile setPage={setPage} openTask={openTask} openDevice={openDevice} flash={flash}/>;
  else if(page==='termbase') body=<TermbaseWorkspace setPage={setPage} flash={flash}/>;
  else if(page==='device') body=<DeviceDetail id={deviceId} setPage={setPage} openPerson={openPerson} flash={flash}/>;
  else if(page==='topic') body=<TopicDetail id={topicId} setPage={setPage} openDevice={openDevice} openPerson={openPerson} flash={flash}/>;
  else if(page==='clearance') body=<ClearanceWorkspace setPage={setPage} flash={flash}/>;
  else if(page==='memos') body=<MemosWorkspace setPage={setPage} flash={flash}/>;
  else if(page==='prep') body=<PrepWorkspace setPage={setPage} flash={flash}/>;
  else if(page==='briefings') body=<BriefingsWorkspace setPage={setPage} flash={flash}/>;
  else if(page==='knowledge') body=<KnowledgeWorkspace setPage={setPage} flash={flash}/>;
  else if(page==='upload') body=<DataUploadWorkspace setPage={setPage} flash={flash}/>;
  else if(page==='search') body=<SearchResults query={searchQuery} setPage={setPage} onSearch={runSearch}/>;
  else if(page==='review') body=<ReviewQueue setPage={setPage} flash={flash} folderName={window.__reviewFolder}/>;
  else body=<WorkspaceDetail id={page} setPage={setPage} openTask={openTask} openCreate={()=>setCreating(true)} flash={flash} onSearch={runSearch}/>;

  return (
    <React.Fragment>
      <div className="mesh-bg"></div>
      <div className="shell">
        <Header page={page} setPage={setPage} onCreate={()=>setCreating(true)} onSearch={runSearch}/>
        {body}
      </div>
      {task && <TaskDrawer task={task} onClose={()=>setSelectedTask(null)} moveTask={moveTask}/>}
      {creating && <CreateModal onClose={()=>setCreating(false)} onCreate={addTask}/>}
      {toast && (
        <div className="pop" style={{position:'fixed',bottom:26,left:'50%',transform:'translateX(-50%)',zIndex:400,
          background:'var(--ink)',color:'#fff',padding:'11px 18px',borderRadius:11,fontSize:13.5,fontWeight:550,
          display:'flex',alignItems:'center',gap:9,boxShadow:'var(--shadow-lg)'}}>
          <span style={{width:18,height:18,borderRadius:'50%',background:'var(--lime)',display:'flex',alignItems:'center',justifyContent:'center'}}><Icon name="check" size={12} sw={3} style={{color:'#fff'}}/></span>
          {toast}
        </div>
      )}
    </React.Fragment>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
