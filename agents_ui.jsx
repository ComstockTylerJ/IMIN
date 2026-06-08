// agents_ui.jsx — shared agent visual primitives

// diamond path borrowed from the IMIN logo motif (64×64 viewBox)
const DIAMOND_D = "M32 9 C 41 23, 41 23, 55 32 C 41 41, 41 41, 32 55 C 23 41, 23 41, 9 32 C 23 23, 23 23, 32 9 Z";

// ---- the agent token: a diamond glyph (reuses the logo's diamond language) ----
// glyph tweak: 'diamond' | 'square' | 'mono'
function AgentToken({id, size=40, glyph='diamond', live=false, flat=false}){
  const a = AGENTS[id]; if(!a) return null;
  const inner = Math.round(size*0.46);
  const ring = live ? (
    <span style={{position:'absolute',inset:-3,borderRadius:glyph==='square'?Math.round(size*0.32):'50%',
      boxShadow:`0 0 0 2px ${a.color}`,opacity:.0,animation:'agentPulse 2.2s ease-out infinite'}}></span>
  ) : null;

  if(glyph==='mono'){
    return (
      <span style={{position:'relative',display:'inline-flex'}}>
        {ring}
        <span style={{width:size,height:size,borderRadius:Math.round(size*0.3),background:flat?a.color:a.tint,
          color:flat?'#fff':a.color,display:'flex',alignItems:'center',justifyContent:'center',flex:'none',
          fontSize:Math.round(size*0.36),fontWeight:700,letterSpacing:'-.02em',
          border:flat?'none':`1.5px solid ${a.color}33`,boxShadow:'0 1px 2px rgba(29,53,87,.12)'}}>
          {a.code.slice(0,2)}
        </span>
      </span>
    );
  }
  if(glyph==='square'){
    return (
      <span style={{position:'relative',display:'inline-flex'}}>
        {ring}
        <span style={{width:size,height:size,borderRadius:Math.round(size*0.28),background:flat?a.color:a.tint,
          display:'flex',alignItems:'center',justifyContent:'center',flex:'none',
          border:flat?'none':`1.5px solid ${a.color}33`,boxShadow:'0 1px 2px rgba(29,53,87,.12)'}}>
          <Icon name={a.icon} size={inner} sw={1.9} style={{color:flat?'#fff':a.color}}/>
        </span>
      </span>
    );
  }
  // diamond (default)
  return (
    <span style={{position:'relative',display:'inline-flex',width:size,height:size}}>
      {live && <span style={{position:'absolute',inset:0,animation:'agentPulse 2.4s ease-out infinite'}}>
        <svg width={size} height={size} viewBox="0 0 64 64"><path d={DIAMOND_D} fill="none" stroke={a.color} strokeWidth="2"/></svg>
      </span>}
      <svg width={size} height={size} viewBox="0 0 64 64" style={{display:'block',filter:'drop-shadow(0 1px 2px rgba(29,53,87,.14))'}}>
        <path d={DIAMOND_D} fill={flat?a.color:a.tint} stroke={flat?'none':a.color} strokeWidth="2" strokeLinejoin="round"/>
      </svg>
      <span style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Icon name={a.icon} size={inner} sw={1.9} style={{color:flat?'#fff':a.color}}/>
      </span>
    </span>
  );
}

// the multi-agent "fleet" diamond — logo gradient fill
function FleetToken({size=40}){
  return (
    <span style={{position:'relative',display:'inline-flex',width:size,height:size}}>
      <svg width={size} height={size} viewBox="0 0 64 64" style={{display:'block',filter:'drop-shadow(0 2px 4px rgba(29,53,87,.18))'}}>
        <defs>
          <linearGradient id="fleetG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2FB2F3"/><stop offset=".3" stopColor="#1D6BD0"/>
            <stop offset=".55" stopColor="#7364C2"/><stop offset=".78" stopColor="#E0648F"/><stop offset="1" stopColor="#FF9A4E"/>
          </linearGradient>
        </defs>
        <path d={DIAMOND_D} fill="url(#fleetG)"/>
      </svg>
      <span style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Icon name="cpu" size={Math.round(size*0.44)} sw={2} style={{color:'#fff'}}/>
      </span>
    </span>
  );
}

function RunStatusPill({k, sm}){
  const s = RUN_STATUS[k]; if(!s) return null;
  return (
    <span className="st" style={{background:s.tint, color:s.color, height:sm?21:23, fontSize:sm?11:11.5, whiteSpace:'nowrap'}}>
      {s.live
        ? <span style={{position:'relative',width:7,height:7,flex:'none'}}>
            <span style={{position:'absolute',inset:0,borderRadius:'50%',background:s.color}}></span>
            <span style={{position:'absolute',inset:0,borderRadius:'50%',background:s.color,animation:'livePing 1.6s ease-out infinite'}}></span>
          </span>
        : <span className="dot" style={{background:s.color}}></span>}
      {s.label}
    </span>
  );
}

// thin progress bar with the agent's color
function RunProgress({value, color, h=5, animated=false}){
  return (
    <span style={{display:'block',width:'100%',height:h,background:'#ECEFF4',borderRadius:h,overflow:'hidden',position:'relative'}}>
      <span style={{display:'block',width:value+'%',height:'100%',background:color,borderRadius:h,
        transition:'width .9s cubic-bezier(.2,.8,.3,1)',position:'relative',overflow:'hidden'}}>
        {animated && <span className="prog-sheen"></span>}
      </span>
    </span>
  );
}

// autonomy chip
function AutonomyChip({mode, sm}){
  const m = AUTONOMY[mode]; if(!m) return null;
  return (
    <span className="badge" style={{background:m.color+'14', color:m.color, height:sm?20:22, fontSize:sm?10.5:11.5, gap:5}}>
      <Icon name={m.icon} size={sm?11:12} sw={2}/>{m.label}
    </span>
  );
}

Object.assign(window, { AgentToken, FleetToken, RunStatusPill, RunProgress, AutonomyChip, DIAMOND_D });
