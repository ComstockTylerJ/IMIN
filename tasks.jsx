// tasks.jsx — Kanban board, filters, calendar

function TasksPage({ tasks, moveTask, openTask, openCreate }) {
  const [view, setView] = React.useState('kanban');
  const [quick, setQuick] = React.useState('all');
  const [statusFilter, setStatusFilter] = React.useState([]);

  const quickFilters = [
  { id: 'mine', label: 'Only Mine' },
  { id: 'teams', label: 'My Teams' },
  { id: 'all', label: 'All Tasks' },
  { id: 'recent', label: 'Recently Updated' },
  { id: 'soon', label: 'Due Soon' }];


  let filtered = tasks;
  if (quick === 'mine') filtered = filtered.filter((t) => t.assignees.includes('tyler') || ['T-187', 'T-198', 'T-211'].includes(t.id));
  if (quick === 'soon') filtered = filtered.filter((t) => ['Jun 4', 'Jun 5', 'Jun 6', 'Jun 7', 'Jun 8', 'Jun 9'].includes(t.due));
  if (statusFilter.length) filtered = filtered.filter((t) => statusFilter.includes(t.col));

  return (
    <div className="rise">
      <div style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--line)', background: 'rgba(255,255,255,.4)' }}>
        <HeroPattern opacity={0.7} />
        <div className="page" style={{ position: 'relative', zIndex: 1, paddingTop: 16, paddingBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-.03em', margin: 0, color: 'var(--ink)' }}>Tasks</h1>
              <p className="sec" style={{ fontSize: 13.5, margin: '3px 0 0' }}>{tasks.length} tasks across 4 stages · 5 due this week</p>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 3, background: '#EEF1F6', padding: 3, borderRadius: 9 }}>
                {[['kanban', 'columns', 'Kanban'], ['calendar', 'calendar', 'Calendar']].map(([id, ic, lb]) =>
                <button key={id} onClick={() => setView(id)} style={{ display: 'flex', alignItems: 'center', gap: 6, border: 0,
                  background: view === id ? '#fff' : 'transparent', color: view === id ? 'var(--ink)' : 'var(--ink-3)', fontSize: 13, fontWeight: 550,
                  padding: '7px 13px', borderRadius: 7, cursor: 'pointer', boxShadow: view === id ? 'var(--shadow-sm)' : 'none', transition: '.12s' }}>
                    <Icon name={ic} size={15} />{lb}</button>
                )}
              </div>
              <button className="btn btn-primary" onClick={openCreate}><Icon name="plus" size={16} sw={2.2} />New Request</button>
            </div>
          </div>
          {/* filter bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 0 18px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 7 }}>
              {quickFilters.map((q) =>
              <button key={q.id} className={'chip' + (quick === q.id ? ' on' : '')} onClick={() => setQuick(q.id)}>{q.label}</button>
              )}
            </div>
            <div style={{ width: 1, height: 22, background: 'var(--line-2)', margin: '0 3px' }}></div>
            <button className="chip"><Icon name="filter" size={13} />Status{statusFilter.length > 0 && <span style={{ background: 'var(--primary)', color: '#fff', borderRadius: 10, padding: '0 5px', fontSize: 10, marginLeft: 2 }}>{statusFilter.length}</span>}</button>
            <button className="chip"><Icon name="user" size={13} />Assignee</button>
            <button className="chip"><Icon name="clock" size={13} />Due Date</button>
            <button className="chip"><Icon name="flag" size={13} />Tags</button>
            <div style={{ flex: 1 }}></div>
            <span className="muted" style={{ fontSize: 12.5 }}>{filtered.length} shown</span>
          </div>
        </div>
      </div>

      <div className="page" style={{ paddingTop: 22 }}>
        {view === 'kanban' ?
        <Kanban tasks={filtered} moveTask={moveTask} openTask={openTask} openCreate={openCreate} /> :
        <CalendarView openTask={openTask} openCreate={openCreate} />}
      </div>
    </div>);

}

function Kanban({ tasks, moveTask, openTask, openCreate }) {
  const [dragId, setDragId] = React.useState(null);
  const [overCol, setOverCol] = React.useState(null);
  const colAccent = { backlog: '#8C94A3', in_progress: '#1D6BD0', review: '#FF9A4E', complete: '#1FA98A' };

  return (
    <div className="kanban-grid">
      {COLUMNS.map((col) => {
        const items = tasks.filter((t) => t.col === col.id);
        return (
          <div key={col.id} className={'kcol' + (overCol === col.id ? ' over' : '')}
          onDragOver={(e) => {e.preventDefault();setOverCol(col.id);}}
          onDragLeave={(e) => {if (!e.currentTarget.contains(e.relatedTarget)) setOverCol(null);}}
          onDrop={(e) => {e.preventDefault();if (dragId) moveTask(dragId, col.id);setDragId(null);setOverCol(null);}}
          style={{ background: 'rgba(247,250,253,.7)', border: '1px solid var(--line)', borderRadius: 14, padding: 10, minHeight: 200 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 6px 12px' }}>
              <span style={{ width: 9, height: 9, borderRadius: 3, background: colAccent[col.id] }}></span>
              <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)' }}>{col.label}</span>
              <span className="badge" style={{ background: '#EAEEF4', color: 'var(--ink-3)' }}>{items.length}</span>
              <div style={{ flex: 1 }}></div>
              <button className="btn btn-ghost btn-icon btn-sm" onClick={openCreate} style={{ width: 26, height: 26 }}><Icon name="plus" size={15} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 40 }}>
              {items.map((t) =>
              <div key={t.id} className={'kcard' + (dragId === t.id ? ' dragging' : '')} draggable
              onDragStart={() => setDragId(t.id)} onDragEnd={() => {setDragId(null);setOverCol(null);}}
              onClick={() => openTask(t.id)}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 9 }}>
                    <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.35 }}>{t.file}</span>
                    {(t.priority === 'urgent' || t.priority === 'high') && <PriorityFlag k={t.priority} />}
                  </div>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 11 }}>
                    {t.tags.map((tg) => <Tag key={tg} k={tg} sm />)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 11, color: 'var(--ink-3)', fontSize: 11.5, fontWeight: 500 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: ['Jun 4', 'Jun 5'].includes(t.due) ? 'var(--coral)' : 'var(--ink-3)' }}><Icon name="clock" size={13} />{t.due}</span>
                      {t.comments > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Icon name="comment" size={13} />{t.comments}</span>}
                      {t.attachments > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Icon name="paperclip" size={13} />{t.attachments}</span>}
                    </div>
                    <AvatarStack ids={t.assignees} size={22} max={2} muted />
                  </div>
                </div>
              )}
              {items.length === 0 &&
              <div style={{ padding: '22px 10px', textAlign: 'center', border: '1.5px dashed var(--line-2)', borderRadius: 10, color: 'var(--ink-4)', fontSize: 12.5 }}>
                  Drop tasks here
                </div>
              }
            </div>
          </div>);

      })}
    </div>);

}

function CalendarView({ openTask, openCreate }) {
  const [mode, setMode] = React.useState('month');
  const tagColor = (t) => TAGS[t] && TAGS[t].color || (t === 'leave' ? '#8C94A3' : t === 'campaign' ? '#1D6BD0' : '#8A63C4');
  const tagTint = (t) => TAGS[t] && TAGS[t].tint || (t === 'leave' ? '#EFF2F6' : t === 'campaign' ? '#E7EFFB' : '#F1EBFA');
  // June 2026: June 1 is a Monday
  const firstDow = new Date(2026, 5, 1).getDay(); // 1 = Monday
  const daysInMonth = 30;
  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  const dows = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 20px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-.02em' }}>June 2026</span>
          <div style={{ display: 'flex', gap: 2 }}>
            <button className="btn btn-ghost btn-icon btn-sm"><Icon name="chevron_left" size={16} /></button>
            <button className="btn btn-ghost btn-icon btn-sm"><Icon name="chevron_right" size={16} /></button>
          </div>
          <button className="btn btn-secondary btn-sm">Today</button>
        </div>
        <div style={{ display: 'flex', gap: 3, background: '#EEF1F6', padding: 3, borderRadius: 8 }}>
          {['month', 'week'].map((m) =>
          <button key={m} onClick={() => setMode(m)} style={{ border: 0, textTransform: 'capitalize', background: mode === m ? '#fff' : 'transparent',
            color: mode === m ? 'var(--ink)' : 'var(--ink-3)', fontSize: 12.5, fontWeight: 550, padding: '5px 13px', borderRadius: 6, cursor: 'pointer',
            boxShadow: mode === m ? 'var(--shadow-sm)' : 'none' }}>{m}</button>
          )}
        </div>
      </div>

      {mode === 'month' ?
      <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', borderBottom: '1px solid var(--line)' }}>
            {dows.map((d) => <div key={d} style={{ padding: '9px 12px', fontSize: 11, fontWeight: 600, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>{d}</div>)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)' }}>
            {cells.map((d, i) => {
            const evs = d ? CAL_EVENTS[d] || [] : [];
            const isToday = d === 5;
            return (
              <div key={i} onClick={() => d && openCreate()} style={{ minHeight: 108, padding: 8, borderRight: i % 7 !== 6 ? '1px solid var(--line)' : '0',
                borderBottom: i < cells.length - 7 ? '1px solid var(--line)' : '0', background: d ? isToday ? 'rgba(45,178,243,.04)' : '#fff' : 'var(--surface-2)',
                cursor: d ? 'pointer' : 'default', transition: '.12s', position: 'relative' }}
              onMouseEnter={(e) => {if (d) e.currentTarget.style.background = isToday ? 'rgba(45,178,243,.08)' : 'var(--surface-2)';}}
              onMouseLeave={(e) => {if (d) e.currentTarget.style.background = isToday ? 'rgba(45,178,243,.04)' : '#fff';}}>
                  {d && <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 5 }}>
                    <span style={{ fontSize: 12, fontWeight: isToday ? 700 : 550, color: isToday ? '#fff' : 'var(--ink-2)',
                    width: isToday ? 22 : 'auto', height: isToday ? 22 : 'auto', borderRadius: '50%', background: isToday ? 'var(--primary)' : 'transparent',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{d}</span>
                  </div>}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {evs.slice(0, 3).map((e, j) =>
                  <div key={j} onClick={(ev) => {ev.stopPropagation();openTask(TASKS[0].id);}} title={e.t}
                  style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '3px 6px', borderRadius: 5, background: tagTint(e.tag),
                    fontSize: 10.5, fontWeight: 550, color: tagColor(e.tag), whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer' }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: tagColor(e.tag), flex: 'none' }}></span>{e.t}
                      </div>
                  )}
                    {evs.length > 3 && <span className="muted" style={{ fontSize: 10.5, paddingLeft: 6 }}>+{evs.length - 3} more</span>}
                  </div>
                </div>);

          })}
          </div>
        </div> :
      <WeekView openTask={openTask} openCreate={openCreate} tagColor={tagColor} tagTint={tagTint} />}
    </div>);

}

function WeekView({ openTask, openCreate, tagColor, tagTint }) {
  const days = [['Mon', 1], ['Tue', 2], ['Wed', 3], ['Thu', 4], ['Fri', 5], ['Sat', 6], ['Sun', 7]];
  const hours = ['9 AM', '11 AM', '1 PM', '3 PM', '5 PM'];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '56px repeat(7,1fr)' }}>
      <div style={{ borderRight: '1px solid var(--line)' }}>
        <div style={{ height: 46, borderBottom: '1px solid var(--line)' }}></div>
        {hours.map((h) => <div key={h} style={{ height: 70, fontSize: 10.5, color: 'var(--ink-3)', padding: '4px 8px', textAlign: 'right', borderBottom: '1px solid var(--line)' }}>{h}</div>)}
      </div>
      {days.map(([dn, dd], ci) => {
        const evs = CAL_EVENTS[dd] || [];
        const isToday = dd === 5;
        return (
          <div key={dd} style={{ borderRight: ci < 6 ? '1px solid var(--line)' : '0' }}>
            <div style={{ height: 46, borderBottom: '1px solid var(--line)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: isToday ? 'rgba(45,178,243,.05)' : '#fff' }}>
              <span style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.04em' }}>{dn}</span>
              <span style={{ fontSize: 14, fontWeight: isToday ? 700 : 600, color: isToday ? 'var(--blue)' : 'var(--ink)' }}>{dd}</span>
            </div>
            <div style={{ position: 'relative', background: isToday ? 'rgba(45,178,243,.02)' : '#fff' }} onClick={() => openCreate()}>
              {hours.map((h, hi) => <div key={hi} style={{ height: 70, borderBottom: '1px solid var(--line)' }}></div>)}
              <div style={{ position: 'absolute', inset: 0, padding: '4px 4px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                {evs.map((e, j) =>
                <div key={j} onClick={(ev) => {ev.stopPropagation();openTask(TASKS[0].id);}}
                style={{ padding: '5px 7px', borderRadius: 6, background: tagTint(e.tag), borderLeft: `2.5px solid ${tagColor(e.tag)}`,
                  fontSize: 10.5, fontWeight: 550, color: tagColor(e.tag), cursor: 'pointer', lineHeight: 1.3 }}>{e.t}</div>
                )}
              </div>
            </div>
          </div>);

      })}
    </div>);

}

Object.assign(window, { TasksPage, Kanban, CalendarView, WeekView });