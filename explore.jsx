// explore.jsx — Explore page: Search tab (content search) + Map tab (geospatial polygon query)

// ---------------- geospatial sample data ----------------
const GEO_KIND = {
  report:  {label:'Field Report', icon:'file',   color:'#1D6BD0', tint:'#E7EFFB'},
  imagery: {label:'Imagery',      icon:'image',  color:'#1F9D86', tint:'#E4F4F0'},
  signal:  {label:'Signal',       icon:'signal', color:'#8A63C4', tint:'#F1EBFA'},
  sensor:  {label:'Sensor',       icon:'pulse',  color:'#FF9A4E', tint:'#FFF1E4'},
  cable:   {label:'Cable',        icon:'mail',   color:'#E068A7', tint:'#FBEAF4'},
};
const GEO_TITLES = {
  report:['Port activity summary','Convoy movement note','Checkpoint report','District situation report','Infrastructure status','Patrol debrief','Market sentiment note'],
  imagery:['Satellite pass — harbor','UAV ISR frame','Coastal imagery mosaic','Overhead — depot','Thermal capture','Bridge survey frame'],
  signal:['VHF intercept','Emitter geolocation','Comms burst','Radar track','Beacon ping'],
  sensor:['Seismic array reading','Acoustic buoy telemetry','Ground sensor trip','Weather station feed','Flow-meter sample'],
  cable:['Station cable — weekly','Liaison message','Coordination cable','Advisory cable'],
};
const GEO_CLS = {U:{label:'U',color:'#8C94A3',tint:'#EFF2F6'}, CUI:{label:'CUI',color:'#1D6BD0',tint:'#E7EFFB'}, S:{label:'S',color:'#F86566',tint:'#FEECEC'}};
const VBW = 1000, VBH = 620;

function _mulberry(seed){ return function(){ let t=seed+=0x6D2B79F5; t=Math.imul(t^t>>>15,t|1); t^=t+Math.imul(t^t>>>7,t|61); return ((t^t>>>14)>>>0)/4294967296; }; }
const GEO = (function(){
  const r=_mulberry(91), kinds=Object.keys(GEO_KIND), clsKeys=['U','U','CUI','U','CUI','S','CUI'];
  const times=['12m','41m','1h','2h','5h','9h','1d','2d','3d'];
  const srcs=['tyler','maya','diego','priya','sam','noah','aria','lena'];
  const clusters=[[250,170,8],[360,300,7],[180,430,6],[700,240,9],[790,430,7],[560,130,5]];
  const out=[]; let id=1;
  clusters.forEach(([cx,cy,n])=>{
    for(let i=0;i<n;i++){
      const ang=r()*Math.PI*2, rad=18+r()*78;
      const x=Math.max(28,Math.min(VBW-28, cx+Math.cos(ang)*rad));
      const y=Math.max(28,Math.min(VBH-28, cy+Math.sin(ang)*rad*0.85));
      const kind=kinds[Math.floor(r()*kinds.length)];
      const titles=GEO_TITLES[kind];
      const col=String.fromCharCode(65+Math.floor(x/(VBW/8)));
      const row=Math.floor(y/(VBH/6))+1;
      out.push({id:id++, x, y, kind, title:titles[Math.floor(r()*titles.length)],
        cls:clsKeys[Math.floor(r()*clsKeys.length)], who:srcs[Math.floor(r()*srcs.length)],
        time:times[Math.floor(r()*times.length)], sector:col+row});
    }
  });
  return out;
})();

function geoLatLng(x,y){
  const lat=(42 - y/VBH*12), lng=(122 - x/VBW*18);
  return `${lat.toFixed(2)}°N  ${lng.toFixed(2)}°W`;
}

// stylized basemap land shapes (abstract, cartographic)
const LAND = [
  "M-20 120 C 120 70, 300 80, 360 160 C 410 226, 360 300, 420 350 C 470 392, 430 470, 320 500 C 200 534, 60 520, -20 470 Z",
  "M560 60 C 700 30, 880 60, 1020 40 L 1020 300 C 920 300, 880 360, 820 410 C 760 458, 700 430, 640 400 C 560 360, 540 300, 540 220 C 540 150, 500 90, 560 60 Z",
  "M840 470 C 900 450, 980 470, 1020 520 L 1020 660 L 800 660 C 790 580, 790 500, 840 470 Z",
];

// ===================== Explore page =====================
function ExplorePage({setPage, openCreate, flash, onSearch}){
  const [tab,setTab]=React.useState('search');
  const tabs=[{id:'search',label:'Search',icon:'search'},{id:'map',label:'Map',icon:'globe'}];
  return (
    <div className="rise">
      <div style={{borderBottom:'1px solid var(--line)',background:'rgba(255,255,255,.65)',backdropFilter:'blur(4px)'}}>
        <div className="page" style={{paddingTop:20,paddingBottom:0}}>
          <div style={{display:'flex',alignItems:'center',gap:7,fontSize:12.5,color:'var(--ink-3)',fontWeight:500,marginBottom:7}}>
            <span style={{cursor:'pointer'}} onClick={()=>setPage('dashboard')}>Home</span>
            <Icon name="chevron_right" size={13} style={{opacity:.6}}/>
            <span style={{color:'var(--ink-2)'}}>Explore</span>
          </div>
          <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',gap:16,flexWrap:'wrap'}}>
            <div>
              <h1 style={{fontSize:23,fontWeight:700,letterSpacing:'-.03em',margin:0,color:'var(--ink)'}}>Explore</h1>
              <p className="muted" style={{fontSize:13,margin:'4px 0 0'}}>Search across everything, or query geotagged data by drawing an area.</p>
            </div>
          </div>
          <div style={{display:'flex',justifyContent:'center',gap:2,marginTop:16}}>
            {tabs.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} style={{display:'flex',alignItems:'center',gap:8,border:0,background:'transparent',
                padding:'10px 14px',cursor:'pointer',fontSize:13.5,fontWeight:tab===t.id?600:500,
                color:tab===t.id?'var(--blue)':'var(--ink-3)',position:'relative'}}>
                <Icon name={t.icon} size={16}/>{t.label}
                {tab===t.id && <span style={{position:'absolute',left:8,right:8,bottom:-1,height:2.5,background:'var(--blue)',borderRadius:2}}></span>}
              </button>
            ))}
          </div>
        </div>
      </div>
      {tab==='search'
        ? <ContentWorkspace embed w={CONTENT_WS} setPage={setPage} openCreate={openCreate} flash={flash} onSearch={onSearch}/>
        : <MapSearch flash={flash} setPage={setPage}/>}
    </div>
  );
}

// ===================== Map / geospatial search =====================
function pointInPoly(p, poly){
  let inside=false;
  for(let i=0,j=poly.length-1;i<poly.length;j=i++){
    const xi=poly[i].x, yi=poly[i].y, xj=poly[j].x, yj=poly[j].y;
    const hit=((yi>p.y)!==(yj>p.y)) && (p.x < (xj-xi)*(p.y-yi)/(yj-yi)+xi);
    if(hit) inside=!inside;
  }
  return inside;
}
function polyArea(poly){
  let a=0;
  for(let i=0,j=poly.length-1;i<poly.length;j=i++){ a += (poly[j].x+poly[i].x)*(poly[j].y-poly[i].y); }
  return Math.abs(a/2);
}
function dist(a,b){ return Math.hypot(a.x-b.x, a.y-b.y); }

function MapSearch({flash, setPage}){
  const svgRef=React.useRef(null);
  const [active,setActive]=React.useState({report:true,imagery:true,signal:true,sensor:true,cable:true});
  const [pts,setPts]=React.useState([]);
  const [mode,setMode]=React.useState('idle');   // idle | draw | done
  const [cursor,setCursor]=React.useState(null);
  const [hover,setHover]=React.useState(null);    // hovered marker id
  const [drag,setDrag]=React.useState(null);      // vertex index being dragged

  const CLOSE_R=18;
  const visible=GEO.filter(g=>active[g.kind]);

  function toMap(e){
    const r=svgRef.current.getBoundingClientRect();
    return {x:(e.clientX-r.left)/r.width*VBW, y:(e.clientY-r.top)/r.height*VBH};
  }
  function start(){ setMode('draw'); setPts([]); setCursor(null); }
  function clear(){ setMode('idle'); setPts([]); setCursor(null); }
  function close(arr){
    let p=arr||pts;
    if(p.length>=2 && dist(p[p.length-1],p[0])<CLOSE_R) p=p.slice(0,-1);
    if(p.length<3) return;
    setPts(p); setMode('done'); setCursor(null);
  }
  function onClick(e){
    if(mode!=='draw') return;
    const p=toMap(e);
    if(pts.length>=3 && dist(p,pts[0])<CLOSE_R){ close(pts); return; }
    setPts(a=>[...a,p]);
  }
  function onMove(e){ if(mode==='draw') setCursor(toMap(e)); }

  // vertex drag
  React.useEffect(()=>{
    if(drag===null) return;
    function mv(e){ const p=toMap(e); setPts(a=>a.map((v,i)=>i===drag?p:v)); }
    function up(){ setDrag(null); }
    window.addEventListener('mousemove',mv); window.addEventListener('mouseup',up);
    return ()=>{ window.removeEventListener('mousemove',mv); window.removeEventListener('mouseup',up); };
  },[drag]);
  // esc to cancel
  React.useEffect(()=>{
    function k(e){ if(e.key==='Escape') clear(); }
    window.addEventListener('keydown',k); return ()=>window.removeEventListener('keydown',k);
  },[]);

  const inside = React.useMemo(()=> mode==='done' ? visible.filter(g=>pointInPoly(g,pts)) : [], [mode,pts,active]);
  const insideIds = React.useMemo(()=>new Set(inside.map(g=>g.id)),[inside]);
  const areaKm = mode==='done' ? Math.round(polyArea(pts)*0.56) : 0;

  const polyStr = pts.map(p=>`${p.x},${p.y}`).join(' ');
  const drawStr = cursor && mode==='draw' ? polyStr+` ${cursor.x},${cursor.y}` : polyStr;

  return (
    <div className="page" style={{paddingTop:22}}>
      {/* toolbar */}
      <div style={{display:'flex',alignItems:'center',gap:12,flexWrap:'wrap',marginBottom:14}}>
        <button onClick={mode==='idle'?start:start} className={'btn '+(mode!=='idle'?'btn-primary':'btn-secondary')}
          style={mode!=='idle'?{}:{borderColor:'var(--line-2)'}}>
          <Icon name="polygon" size={16}/>{mode==='idle'?'Draw area':'Redraw'}
        </button>
        <button onClick={clear} className="btn btn-ghost btn-sm" disabled={!pts.length}
          style={{opacity:pts.length?1:.45,pointerEvents:pts.length?'auto':'none',border:'1px solid var(--line-2)'}}>
          <Icon name="trash" size={14}/>Clear
        </button>
        <div style={{display:'flex',alignItems:'center',gap:7,fontSize:12.5,color:'var(--ink-3)',fontWeight:500}}>
          <Icon name={mode==='draw'?'pin_loc':'globe'} size={14} style={{color:'var(--ink-4)'}}/>
          {mode==='idle' && 'Draw a polygon to query geotagged data within it'}
          {mode==='draw' && 'Click to add points · click the first point (or double-click) to close'}
          {mode==='done' && 'Drag any point to refine the area'}
        </div>
        <div style={{flex:1}}></div>
        <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
          {Object.entries(GEO_KIND).map(([k,v])=>(
            <button key={k} onClick={()=>setActive(a=>({...a,[k]:!a[k]}))}
              style={{display:'inline-flex',alignItems:'center',gap:6,height:28,padding:'0 10px',borderRadius:999,cursor:'pointer',
                fontSize:12,fontWeight:550,transition:'.12s',
                border:'1px solid '+(active[k]?v.color:'var(--line-2)'),
                background:active[k]?v.tint:'#fff', color:active[k]?v.color:'var(--ink-4)'}}>
              <span style={{width:8,height:8,borderRadius:'50%',background:active[k]?v.color:'var(--ink-4)'}}></span>{v.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) 372px',gap:20,alignItems:'start'}}>
        {/* MAP */}
        <div className="card" style={{padding:0,overflow:'hidden',position:'relative'}}>
          <svg ref={svgRef} viewBox={`0 0 ${VBW} ${VBH}`} width="100%" style={{display:'block',aspectRatio:`${VBW}/${VBH}`,
            cursor:mode==='draw'?'crosshair':'default', background:'#E7EEF7', userSelect:'none'}}
            onClick={onClick} onMouseMove={onMove} onDoubleClick={()=>mode==='draw'&&close(pts)}>
            {/* water grain */}
            <defs>
              <pattern id="grid" width="62.5" height="62" patternUnits="userSpaceOnUse">
                <path d="M62.5 0H0V62" fill="none" stroke="#CFDDEC" strokeWidth="1"/>
              </pattern>
              <linearGradient id="landg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#F4F2EA"/><stop offset="1" stopColor="#ECE8DC"/>
              </linearGradient>
            </defs>
            <rect width={VBW} height={VBH} fill="url(#grid)"/>
            {/* land */}
            {LAND.map((d,i)=><path key={i} d={d} fill="url(#landg)" stroke="#D8D2C2" strokeWidth="1.5"/>)}
            {/* graticule labels */}
            {[1,2,3,4].map(i=>(
              <text key={'lx'+i} x={i*VBW/5} y={14} fontSize="10" fill="#9DB0C6" textAnchor="middle" fontWeight="500">{(122-i*VBW/5/VBW*18).toFixed(0)}°W</text>
            ))}
            {[1,2,3,4].map(i=>(
              <text key={'ly'+i} x={6} y={i*VBH/5+3} fontSize="10" fill="#9DB0C6" fontWeight="500">{(42-i*VBH/5/VBH*12).toFixed(0)}°N</text>
            ))}

            {/* markers */}
            {visible.map(g=>{
              const v=GEO_KIND[g.kind];
              const isIn = mode==='done' && insideIds.has(g.id);
              const dim = mode==='done' && !isIn;
              const hot = hover===g.id;
              const r = isIn?7:5.2;
              return (
                <g key={g.id} opacity={dim?0.22:1} style={{transition:'opacity .25s'}}
                  onMouseEnter={()=>setHover(g.id)} onMouseLeave={()=>setHover(null)}>
                  {(isIn||hot) && <circle cx={g.x} cy={g.y} r={r+6} fill={v.color} opacity="0.16"/>}
                  <circle cx={g.x} cy={g.y} r={hot?r+1.5:r} fill={v.color} stroke="#fff" strokeWidth="1.6"
                    style={{transition:'r .12s'}}/>
                  <title>{g.title} · {GEO_KIND[g.kind].label} · {g.sector}</title>
                </g>
              );
            })}

            {/* polygon */}
            {pts.length>0 && (mode==='done'
              ? <polygon points={polyStr} fill="rgba(29,107,208,.13)" stroke="#1D6BD0" strokeWidth="2.2" strokeLinejoin="round"/>
              : <polyline points={drawStr} fill="rgba(29,107,208,.08)" stroke="#1D6BD0" strokeWidth="2.2" strokeDasharray="2 0" strokeLinejoin="round" strokeLinecap="round"/>
            )}
            {/* vertices */}
            {pts.map((p,i)=>{
              const first = i===0;
              const closeable = mode==='draw' && first && pts.length>=3;
              return (
                <circle key={i} cx={p.x} cy={p.y} r={closeable?8:5.5}
                  fill={closeable?'#1D6BD0':'#fff'} stroke="#1D6BD0" strokeWidth="2.2"
                  style={{cursor:mode==='done'?'grab':'pointer'}}
                  onMouseDown={e=>{ if(mode==='done'){ e.stopPropagation(); setDrag(i);} }}/>
              );
            })}

            {/* compass + scale */}
            <g transform={`translate(${VBW-46},42)`}>
              <circle r="17" fill="rgba(255,255,255,.85)" stroke="#D8D2C2" strokeWidth="1"/>
              <path d="M0 -11 L4 2 L0 -1 L-4 2 Z" fill="#F86566"/>
              <text y="-12" fontSize="8.5" fill="#5F6773" textAnchor="middle" fontWeight="700" dy="-1">N</text>
            </g>
            <g transform={`translate(28,${VBH-26})`}>
              <rect x="0" y="0" width="84" height="4" fill="#5F6773" rx="1"/>
              <text x="0" y="-5" fontSize="9.5" fill="#5F6773" fontWeight="600">50 km</text>
            </g>
          </svg>

          {/* coord readout */}
          <div style={{position:'absolute',left:12,top:12,display:'flex',alignItems:'center',gap:7,
            background:'rgba(255,255,255,.9)',border:'1px solid var(--line)',borderRadius:8,padding:'5px 10px',
            fontSize:11.5,fontWeight:600,color:'var(--ink-2)',fontFamily:'ui-monospace,Menlo,monospace',boxShadow:'var(--shadow-sm)'}}>
            <Icon name="target" size={13} style={{color:'var(--blue)'}}/>
            {cursor?geoLatLng(cursor.x,cursor.y):'—'}
          </div>

          {/* idle CTA overlay */}
          {mode==='idle' && pts.length===0 && (
            <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',pointerEvents:'none'}}>
              <div className="pop" style={{background:'rgba(255,255,255,.94)',border:'1px solid var(--line)',borderRadius:14,padding:'18px 22px',
                textAlign:'center',boxShadow:'var(--shadow-md)',pointerEvents:'auto',maxWidth:300}}>
                <span style={{width:42,height:42,borderRadius:11,background:'var(--blue-t)',color:'var(--blue)',display:'inline-flex',alignItems:'center',justifyContent:'center'}}><Icon name="polygon" size={21}/></span>
                <div style={{fontSize:14.5,fontWeight:700,color:'var(--ink)',marginTop:11}}>Query by area</div>
                <div className="muted" style={{fontSize:12.5,marginTop:4,lineHeight:1.5}}>Draw a polygon to return every geotagged item that falls inside it.</div>
                <button className="btn btn-primary btn-sm" style={{marginTop:13}} onClick={start}><Icon name="polygon" size={14}/>Draw area</button>
              </div>
            </div>
          )}
        </div>

        {/* RESULTS */}
        <div style={{position:'sticky',top:'calc(var(--header-h) + 16px)',display:'flex',flexDirection:'column',gap:12}}>
          <div className="card card-pad">
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:10}}>
              <div style={{display:'flex',alignItems:'center',gap:9}}>
                <span style={{width:30,height:30,borderRadius:8,background:'var(--blue-t)',color:'var(--blue)',display:'flex',alignItems:'center',justifyContent:'center'}}><Icon name="pin_loc" size={16}/></span>
                <div>
                  <div style={{fontSize:14,fontWeight:700,color:'var(--ink)',letterSpacing:'-.01em'}}>{mode==='done'?'In selected area':'Geotagged data'}</div>
                  <div className="muted" style={{fontSize:11.5}}>{mode==='done'?`≈ ${areaKm.toLocaleString()} km² · ${pts.length} vertices`:`${visible.length} items on map`}</div>
                </div>
              </div>
              {mode==='done' && <span style={{fontSize:22,fontWeight:700,color:'var(--blue)',letterSpacing:'-.02em'}}>{inside.length}</span>}
            </div>

            {mode!=='done' && (
              <div style={{marginTop:14,borderTop:'1px solid var(--line)',paddingTop:14}}>
                <div className="eyebrow" style={{marginBottom:10}}>On map by type</div>
                <div style={{display:'flex',flexDirection:'column',gap:9}}>
                  {Object.entries(GEO_KIND).map(([k,v])=>{
                    const n=GEO.filter(g=>g.kind===k).length;
                    return (
                      <div key={k} style={{display:'flex',alignItems:'center',gap:10}}>
                        <span style={{width:24,height:24,borderRadius:7,background:v.tint,color:v.color,display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name={v.icon} size={13}/></span>
                        <span style={{flex:1,fontSize:13,color:'var(--ink-2)',fontWeight:500}}>{v.label}</span>
                        <span style={{fontSize:12.5,fontWeight:600,color:'var(--ink-3)'}}>{n}</span>
                      </div>
                    );
                  })}
                </div>
                <div style={{marginTop:14,fontSize:12.5,color:'var(--ink-3)',lineHeight:1.5,background:'var(--surface-2)',border:'1px solid var(--line)',borderRadius:10,padding:'11px 13px'}}>
                  <Icon name="polygon" size={13} style={{color:'var(--blue)',verticalAlign:'-2px',marginRight:6}}/>
                  Draw an area on the map to filter these down to a specific region.
                </div>
              </div>
            )}
          </div>

          {mode==='done' && (
            <div className="card card-pad" style={{maxHeight:'calc(100vh - var(--header-h) - 190px)',overflowY:'auto'}}>
              {inside.length===0 ? (
                <div style={{textAlign:'center',padding:'24px 8px'}}>
                  <span style={{width:38,height:38,borderRadius:10,background:'var(--surface-2)',color:'var(--ink-4)',display:'inline-flex',alignItems:'center',justifyContent:'center',border:'1px solid var(--line)'}}><Icon name="search" size={18}/></span>
                  <div style={{fontSize:13,color:'var(--ink-3)',marginTop:9,fontWeight:500}}>No geotagged items in this area.</div>
                  <button className="btn btn-secondary btn-sm" style={{marginTop:12}} onClick={start}>Redraw area</button>
                </div>
              ) : (
                <div style={{display:'flex',flexDirection:'column',gap:2}}>
                  {inside.map((g,i)=>{
                    const v=GEO_KIND[g.kind], c=GEO_CLS[g.cls];
                    return (
                      <div key={g.id} onMouseEnter={()=>setHover(g.id)} onMouseLeave={()=>setHover(null)}
                        onClick={()=>flash&&flash(`Opening ${g.title}…`)}
                        style={{display:'flex',gap:11,padding:'10px 8px',borderTop:i?'1px solid var(--line)':0,cursor:'pointer',borderRadius:8,
                          background:hover===g.id?'var(--surface-2)':'transparent',transition:'.12s'}}>
                        <span style={{width:30,height:30,borderRadius:8,background:v.tint,color:v.color,display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name={v.icon} size={15}/></span>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontSize:13,fontWeight:600,color:'var(--ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{g.title}</div>
                          <div style={{display:'flex',alignItems:'center',gap:7,marginTop:3,fontSize:11.5,color:'var(--ink-3)'}}>
                            <span style={{fontFamily:'ui-monospace,Menlo,monospace'}}>{g.sector}</span>
                            <span style={{width:3,height:3,borderRadius:'50%',background:'var(--ink-4)'}}></span>
                            <Avatar id={g.who} size={15}/>{PEOPLE[g.who].name.split(' ')[0]}
                            <span style={{width:3,height:3,borderRadius:'50%',background:'var(--ink-4)'}}></span>{g.time}
                          </div>
                        </div>
                        <span className="badge" style={{background:c.tint,color:c.color,height:19,flex:'none',alignSelf:'flex-start'}}>{c.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}
              {inside.length>0 && (
                <div style={{display:'flex',gap:8,marginTop:13,paddingTop:13,borderTop:'1px solid var(--line)'}}>
                  <button className="btn btn-primary btn-sm" style={{flex:1}} onClick={()=>flash&&flash(`${inside.length} items added to a new collection`)}><Icon name="download" size={14}/>Export {inside.length}</button>
                  <button className="btn btn-secondary btn-sm" onClick={()=>flash&&flash('Saved area query')}><Icon name="bookmark" size={14}/>Save</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ExplorePage, MapSearch });
