// termbase.jsx — Gold Copy Term Base (language glossary) — IMIN styling
// Reached from the book icon in the top nav. For the Language user type.

const TB_SERIF = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

const TB_STATUS = {
  gold:       {label:'Gold Copy',        color:'#B5851C', tint:'#FFFBEB'},
  review:     {label:'In Review',        color:'#B5851C', tint:'#FFFBEB'},
  deprecated: {label:'Deprecated',       color:'#64748B', tint:'#F1F5F9'},
  dnt:        {label:'Do Not Translate', color:'#DC2626', tint:'#FEF2F2'},
};
const TB_CAT = {
  word:   {label:'Word & Phrase', short:'Word & Phrase', icon:'comment', plural:'Words & Phrases'},
  place:  {label:'Place',         short:'Place',         icon:'pin_loc', plural:'Places'},
  formal: {label:'Formal Name',   short:'Formal Name',   icon:'bookmark',plural:'Formal Names'},
};
// reference option lists for the create / propose forms
const TB_LANG_NAMES={EN:'English',ES:'Spanish',FR:'French',DE:'German',JA:'Japanese',IT:'Italian',PT:'Portuguese'};
const TB_OPTIONS={
  langs:['EN','ES','FR','DE','JA','IT','PT'],
  domains:['Literary','Medical','General','Geography','Multiple'],
  subdomains:{
    Literary:['Idiom','Theatre & Performance','Loanword','Social / Modern','Published Title','Poetry & Verse'],
    Medical:['Diagnostic Imaging','Anatomy','Pharmacology','Procedures'],
    General:['Profession','Everyday','Forms of Address'],
    Geography:['Exonym','Cities','Countries','Regions'],
    Multiple:['Anatomy / Bookbinding','General'],
  },
  pos:['noun','verb','adjective','adverb','idiom','idiom · interjection','idiom · verbal','idiom · adverbial','interjection','noun (acronym)','noun (gerund)','proper noun','proper noun (title)','proper noun (place)'],
  registers:['formal','neutral','informal','literary','vulgar'],
  regions:['General','Spain','Lat. Am.','US','UK','Netherlands','Germany','Russia','France'],
};
const TB_DOMAIN_BY_GLOSS={literary:'Literary',medical:'Medical',names:'Geography',general:'General'};
// Each glossary is a curated cut of the Gold Copy. Opening one scopes the
// working view (filters, list, detail) to just that glossary's entries.
const TB_GLOSSARIES = [
  {id:'literary', name:'Literary Gold Copy', pair:['EN','ES'], domain:'Literary & Idiomatic', color:'#B5851C', icon:'book', owner:'maya', updated:'Mar 2026',
    desc:'Idioms, loanwords and figurative language for prose & literary translation.',
    match:e=> e.cat==='word' && ['Literary','Multiple','General'].includes(e.domain)},
  {id:'medical', name:'Medical Terminology', pair:['EN','ES'], domain:'Clinical & Diagnostic', color:'#DC2626', icon:'shield_check', owner:'priya', updated:'Jan 2026',
    desc:'Clinical, diagnostic and anatomical terms with controlled acronyms.',
    match:e=> e.domain==='Medical' || (e.sub||'').includes('Anatomy')},
  {id:'names', name:'Names & Places', pair:['EN','ES'], domain:'Proper Nouns', color:'#0073E6', icon:'pin_loc', owner:'noah', updated:'Mar 2026',
    desc:'Exonyms, published titles and other proper-name conventions.',
    match:e=> e.cat==='place' || e.cat==='formal'},
  {id:'general', name:'General Vocabulary', pair:['EN','ES'], domain:'Everyday & Professional', color:'#16A34A', icon:'comment', owner:'sam', updated:'Feb 2026',
    desc:'Common professional and everyday vocabulary with register notes.',
    match:e=> e.domain==='General' || e.domain==='Geography'},
];
function glossaryEntries(g){ return TB_ENTRIES.filter(g.match); }

const TB_ENTRIES = [
  {id:'t1', term:'break a leg', src:'EN', tgt:'ES', cat:'word', domain:'Literary', sub:'Theatre & Performance', status:'gold',
    pos:'idiom · interjection', primary:'mucha mierda', gloss:'Theatrical good-luck idiom — direct cultural equivalent.',
    def:'An expression of good luck said to a performer before they go on stage. Not to be taken literally.',
    register:'informal', region:'General', colloquial:'Yes', orthography:'lower-case; no hyphen', related:['good luck',"knock 'em dead"],
    variants:[
      {votes:47, term:'mucha mierda', reg:'informal', note:'Standard in Spanish theatre circles. Vulgar literal sense is not felt in context.'},
      {votes:12, term:'que se rompa una pata', reg:'informal', region:'Lat. Am.', note:'Lit. ‘may a leg break’ — used in some Latin-American theatre.'},
      {votes:5,  term:'buena suerte', reg:'neutral', note:'Generic ‘good luck’. Safe but loses the theatrical color.'},
      {votes:-28, term:'romper una pierna', reg:'Rejected', note:'Literal calque. Incorrect — do not use.'},
    ],
    context:{en:'“Break a leg out there tonight,” the director whispered.', es:'—Mucha mierda esta noche —susurró el director.'},
    note:'A figurative idiom. NEVER translate word-for-word — “romper una pierna” is meaningless and reads as an error. Map to the target culture’s equivalent theatrical good-luck phrase.',
    approver:{name:'Dr. Elena Márquez', level:'Level Expert', lang:'ES', date:'Mar 2026'}},

  {id:'t2', term:'déjà vu', src:'EN', tgt:'ES', cat:'word', domain:'Literary', sub:'Loanword', status:'dnt',
    pos:'noun', primary:'déjà vu', gloss:'Keep as-is (do not translate).',
    def:'A French loanword used unchanged in both English and Spanish. Retain original spelling and diacritics.',
    register:'neutral', region:'General', colloquial:'No', orthography:'lower-case; keep accents', related:['jamais vu'],
    note:'Do Not Translate. The loanword is fully naturalised in the target language — translating or de-accenting it is an error.',
    approver:{name:'Dr. Elena Márquez', level:'Level Expert', lang:'ES', date:'Feb 2026'}},

  {id:'t3', term:'ghosting', src:'EN', tgt:'ES', cat:'word', domain:'Literary', sub:'Social / Modern', status:'review',
    pos:'noun (gerund)', primary:'dejar en visto', gloss:'Proposed — abruptly cutting off contact.',
    def:'The practice of ending a relationship by suddenly withdrawing all communication. Modern colloquial usage.',
    register:'informal', region:'General', colloquial:'Yes', orthography:'lower-case', related:['stonewalling'],
    variants:[
      {votes:9, term:'dejar en visto', reg:'informal', note:'Lit. ‘leave on seen’. Widely understood, captures the messaging-era sense.'},
      {votes:4, term:'hacer ghosting', reg:'informal', note:'Calque with the English root. Common online but contested.'},
    ],
    note:'Under review — no ratified equivalent yet. Votes are advisory until an Expert lexicographer signs off.',
    approver:null},

  {id:'t4', term:'MRI', src:'EN', tgt:'ES', cat:'word', domain:'Medical', sub:'Diagnostic Imaging', status:'gold',
    pos:'noun (acronym)', primary:'resonancia magnética (RM)', gloss:'Full term + Spanish acronym. Preferred.',
    def:'Magnetic Resonance Imaging — a diagnostic imaging technique. Render the full term with the Spanish acronym on first use.',
    register:'formal', region:'General', colloquial:'No', orthography:'expand on first use; ‘RM’ thereafter', related:['CT scan','ultrasound'],
    variants:[
      {votes:31, term:'resonancia magnética (RM)', reg:'formal', note:'Preferred clinical form. Spell out, then abbreviate.'},
      {votes:6,  term:'IRM', reg:'formal', region:'Lat. Am.', note:'‘Imagen por resonancia magnética’ — used in some Latin-American sources.'},
    ],
    note:'Never carry the English acronym “MRI” into Spanish clinical text. Use the Spanish full form and acronym.',
    approver:{name:'Dr. Raúl Sandoval', level:'Level Expert', lang:'ES', date:'Jan 2026'}},

  {id:'t5', term:'once in a blue moon', src:'EN', tgt:'ES', cat:'word', domain:'Literary', sub:'Idiom', status:'gold',
    pos:'idiom · adverbial', primary:'de Pascuas a Ramos', gloss:'Idiomatic: very infrequently.',
    def:'An idiom meaning something happens very rarely. Map to a target-language idiom, not a literal rendering.',
    register:'informal', region:'General', colloquial:'Yes', orthography:'lower-case', related:['hardly ever'],
    variants:[
      {votes:22, term:'de Pascuas a Ramos', reg:'informal', note:'Idiomatic; literally ‘from Easter to Palm Sunday’.'},
      {votes:8,  term:'cada muerte de obispo', reg:'informal', region:'Lat. Am.', note:'Equally idiomatic, more regional.'},
    ],
    context:{en:'He calls his brother once in a blue moon.', es:'Llama a su hermano de Pascuas a Ramos.'},
    note:'Choose by target region. Avoid literal ‘luna azul’, which carries none of the frequency sense.',
    approver:{name:'Dr. Elena Márquez', level:'Level Expert', lang:'ES', date:'Mar 2026'}},

  {id:'t6', term:'Schadenfreude', src:'EN', tgt:'ES', cat:'word', domain:'Literary', sub:'Loanword', status:'dnt',
    pos:'noun', primary:'Schadenfreude', gloss:'Keep as-is (do not translate).',
    def:'A German loanword for pleasure derived from another’s misfortune. Used unchanged in literary register.',
    register:'formal', region:'General', colloquial:'No', orthography:'capitalised (German noun)', related:['gloating'],
    note:'Do Not Translate. Retain capitalisation. A gloss may be added in a footnote but the headword stays German.',
    approver:{name:'Dr. Elena Márquez', level:'Level Expert', lang:'ES', date:'Feb 2026'}},

  {id:'t7', term:'spill the beans', src:'EN', tgt:'ES', cat:'word', domain:'Literary', sub:'Idiom', status:'gold',
    pos:'idiom · verbal', primary:'irse de la lengua', gloss:'To let something slip; reveal a secret.',
    def:'To disclose information, often inadvertently. Use a target-language idiom of accidental disclosure.',
    register:'informal', region:'General', colloquial:'Yes', orthography:'lower-case', related:['let the cat out of the bag'],
    variants:[
      {votes:18, term:'irse de la lengua', reg:'informal', note:'To let something slip; reveal a secret.'},
      {votes:7,  term:'descubrir el pastel', reg:'informal', note:'To give the game away; expose a scheme.'},
    ],
    note:'Pick the idiom by nuance — accidental slip vs. exposing a plot.',
    approver:{name:'Dr. Elena Márquez', level:'Level Expert', lang:'ES', date:'Mar 2026'}},

  {id:'t8', term:'spine', src:'EN', tgt:'ES', cat:'word', domain:'Multiple', sub:'Anatomy / Bookbinding', status:'gold',
    pos:'noun', primary:'el lomo', gloss:'The spine of a book; masc. noun.',
    def:'Context-dependent. ‘el lomo’ for the spine of a book; ‘la columna (vertebral)’ for the anatomical spine.',
    register:'neutral', region:'General', colloquial:'No', orthography:'lower-case', related:['column','backbone'],
    variants:[
      {votes:15, term:'el lomo', reg:'neutral', note:'Bookbinding sense — the spine of a book. Masculine.'},
      {votes:14, term:'la columna vertebral', reg:'formal', note:'Anatomical sense — the backbone. Feminine.'},
    ],
    note:'Disambiguate by domain before choosing. The two senses are not interchangeable.',
    approver:{name:'Dr. Elena Márquez', level:'Level Expert', lang:'ES', date:'Mar 2026'}},

  {id:'t9', term:'The Brothers Karamazov', src:'EN', tgt:'ES', cat:'formal', domain:'Literary', sub:'Published Title', status:'gold',
    pos:'proper noun (title)', primary:'Los hermanos Karamázov', gloss:'Canonical published title.',
    def:'The established Spanish title of Dostoevsky’s novel. Use the canonical published form, not a fresh translation.',
    register:'formal', region:'General', colloquial:'No', orthography:'title case; accent on Karamázov', related:['Crime and Punishment'],
    note:'Use the recognised published title. Re-translating canonical titles fragments the catalogue and confuses readers.',
    approver:{name:'Dr. Elena Márquez', level:'Level Expert', lang:'ES', date:'Mar 2026'}},

  {id:'t10', term:'the doctor', src:'EN', tgt:'ES', cat:'word', domain:'General', sub:'Profession', status:'gold',
    pos:'noun', primary:'el médico / la médica', gloss:'Physician. Gender by referent.',
    def:'A physician. Choose grammatical gender by the referent; both forms are standard.',
    register:'neutral', region:'General', colloquial:'No', orthography:'lower-case', related:['nurse','surgeon'],
    variants:[
      {votes:20, term:'el médico / la médica', reg:'neutral', note:'Gender agrees with the referent.'},
      {votes:11, term:'el doctor / la doctora', reg:'neutral', note:'Also correct, esp. as a courtesy title.'},
    ],
    note:'Match grammatical gender to the person referred to. Do not default to masculine when the referent is known.',
    approver:{name:'Dr. Raúl Sandoval', level:'Level Expert', lang:'ES', date:'Jan 2026'}},

  {id:'t11', term:'The Hague', src:'EN', tgt:'ES', cat:'place', domain:'Geography', sub:'Exonym', status:'gold',
    pos:'proper noun (place)', primary:'La Haya', gloss:'Established Spanish exonym.',
    def:'The Spanish exonym for the Dutch city Den Haag / ’s-Gravenhage. Use the established form.',
    register:'formal', region:'General', colloquial:'No', orthography:'title case; article ‘La’', related:['Amsterdam','Rotterdam'],
    note:'Use the recognised exonym. Do not transliterate the Dutch name.',
    approver:{name:'Dr. Elena Márquez', level:'Level Expert', lang:'ES', date:'Mar 2026'}},

  {id:'t12', term:'to kill a mockingbird', src:'EN', tgt:'ES', cat:'word', domain:'Literary', sub:'Idiom (legacy)', status:'deprecated',
    pos:'idiom', primary:'matar a un ruiseñor', gloss:'Deprecated — see published title entry.',
    def:'Legacy entry. Superseded — the literal idiom guidance conflicts with the canonical published-title handling.',
    register:'neutral', region:'General', colloquial:'No', orthography:'lower-case', related:['The Brothers Karamazov'],
    note:'Deprecated. Retained for history only. Refer to the Formal Name workflow for published titles.',
    approver:{name:'Dr. Elena Márquez', level:'Level Expert', lang:'ES', date:'Nov 2025'}},
];

// review queue — proposed changes awaiting Expert ratification
const TB_QUEUE = [
  {id:'q1', term:'ghosting', kind:'New term', src:'noah', when:'2h', note:'No Gold Copy equivalent yet — proposing “dejar en visto”.', target:'ES'},
  {id:'q2', term:'spine', kind:'Edit', src:'priya', when:'1d', note:'Add anatomical sense + gender note to disambiguate.', target:'ES'},
  {id:'q3', term:'to kill a mockingbird', kind:'Deprecation', src:'maya', when:'2d', note:'Conflicts with published-title handling — propose deprecating.', target:'ES'},
  {id:'q4', term:'résumé', kind:'New term', src:'sam', when:'3d', note:'Loanword — propose Do-Not-Translate classification.', target:'FR'},
];

// term bases — a linguist may hold access to one or many while translating
const TB_BASES = [
  {id:'lit-es', name:'Literary EN→ES', color:'#0073E6', entries:1842},
  {id:'lit-fr', name:'Literary EN→FR', color:'#B5851C', entries:1610},
  {id:'lit-de', name:'Literary EN→DE', color:'#475569', entries:1455},
  {id:'lit-ja', name:'Literary EN→JA', color:'#16A34A', entries:1188},
  {id:'med-es', name:'Medical EN→ES', color:'#DC2626', entries:3206},
];
function entryTb(e){ return e.tb || (e.domain==='Medical' ? 'med-es' : 'lit-es'); }

// blue ratified check
function Verified({size=18}){
  return <span title="Ratified" style={{display:'inline-flex',width:size,height:size,borderRadius:'50%',background:'var(--blue)',color:'#fff',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name="check" size={size*0.62} sw={3}/></span>;
}
function LangPair({src, tgt}){
  return (
    <span style={{display:'inline-flex',alignItems:'center',gap:6,fontSize:11,fontWeight:700,color:'var(--ink-3)',letterSpacing:'.03em'}}>
      <span>{src}</span><Icon name="arrow_right" size={12} sw={2} style={{opacity:.6}}/><span>{tgt}</span>
    </span>
  );
}

function TermbaseWorkspace({setPage, flash}){
  const [tab,setTab]=React.useState('glossary');
  const [glossaryId,setGlossaryId]=React.useState(null);   // null = overview
  const [cat,setCat]=React.useState('all');
  const [status,setStatus]=React.useState('any');
  const [tb,setTb]=React.useState('all');
  const [q,setQ]=React.useState('');
  const [sort,setSort]=React.useState('az');
  const [sel,setSel]=React.useState(null);
  const [modal,setModal]=React.useState(null);   // 'term' | 'glossary'

  const glossary = TB_GLOSSARIES.find(g=>g.id===glossaryId) || null;
  function openGlossary(g){
    const scoped=TB_ENTRIES.filter(g.match);
    setCat('all'); setStatus('any'); setTb('all'); setQ(''); setSort('az');
    setSel(scoped[0]?scoped[0].id:null);
    setGlossaryId(g.id);
  }
  function backToIndex(){ setGlossaryId(null); }
  const inGlossary = tab==='glossary' && glossary;

  return (
    <div className="rise">
      {/* header band */}
      <div style={{borderBottom:'1px solid var(--line)',background:'rgba(255,255,255,.65)',backdropFilter:'blur(4px)'}}>
        <div style={{maxWidth:1560,margin:'0 auto',padding:'0 28px'}}>
          <div style={{display:'flex',alignItems:'center',gap:7,fontSize:12.5,color:'var(--ink-3)',fontWeight:500,padding:'14px 0 0'}}>
            <span style={{cursor:'pointer'}} onClick={()=>setPage('dashboard')}>Home</span>
            <Icon name="chevron_right" size={13} style={{opacity:.6}}/>
            <span style={{cursor:inGlossary?'pointer':'default',color:inGlossary?'var(--ink-3)':'var(--ink-2)'}} onClick={()=>inGlossary&&backToIndex()}>Glossaries</span>
            {inGlossary && <React.Fragment><Icon name="chevron_right" size={13} style={{opacity:.6}}/><span style={{color:'var(--ink-2)'}}>{glossary.name}</span></React.Fragment>}
          </div>
          <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',gap:24,marginTop:6}}>
            <div style={{display:'flex',alignItems:'flex-end',gap:24,minWidth:0}}>
              <h1 style={{fontSize:18.5,fontWeight:700,letterSpacing:'-.03em',margin:0,color:'var(--ink)',paddingBottom:13,flex:'none'}}>Term base</h1>
              <div style={{display:'flex',gap:22}}>
                {[['glossary','Glossaries','book'],['queue','Review Queue','clock']].map(([id,label,icon])=>(
                  <button key={id} onClick={()=>setTab(id)} style={{display:'flex',alignItems:'center',gap:7,border:0,background:'transparent',
                    padding:'13px 0',cursor:'pointer',fontSize:13.5,fontWeight:tab===id?600:500,position:'relative',
                    color:tab===id?'var(--blue)':'var(--ink-3)'}}>
                    <Icon name={icon} size={15}/>{label}
                    {id==='queue' && <span style={{fontSize:11,fontWeight:700,background:'#FFFBEB',color:'#B5851C',borderRadius:999,padding:'1px 7px'}}>{TB_QUEUE.length}</span>}
                    {tab===id && <span style={{position:'absolute',left:0,right:0,bottom:-1,height:2.5,background:'var(--blue)',borderRadius:2}}></span>}
                  </button>
                ))}
              </div>
            </div>
            {tab==='glossary' && (inGlossary
              ? <button className="btn btn-primary btn-sm" style={{marginBottom:10}} onClick={()=>setModal('term')}><Icon name="plus" size={15} sw={2.2}/>New term</button>
              : <button className="btn btn-primary btn-sm" style={{marginBottom:10}} onClick={()=>setModal('glossary')}><Icon name="plus" size={15} sw={2.2}/>New glossary</button>)}
          </div>
        </div>
      </div>

      {tab==='queue'
        ? <TermReviewQueue setTab={setTab} setSel={setSel} setStatus={setStatus} flash={flash}/>
        : glossary
          ? <GlossaryBrowser glossary={glossary} onBack={backToIndex} {...{cat,setCat,status,setStatus,tb,setTb,q,setQ,sort,setSort,sel,setSel,flash}}/>
          : <GlossaryIndex onOpen={openGlossary} flash={flash} onNewGlossary={()=>setModal('glossary')}/>}

      {modal==='term' && <NewTermModal glossary={glossary} onClose={()=>setModal(null)} flash={flash}/>}
      {modal==='glossary' && <NewGlossaryModal onClose={()=>setModal(null)} flash={flash}/>}
    </div>
  );
}

// ===== glossary index — cards of available glossaries =====
function GlossaryIndex({onOpen, flash, onNewGlossary}){
  return (
    <div style={{maxWidth:1320,margin:'0 auto',padding:'24px 28px 48px'}}>
      <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',gap:16,marginBottom:18}}>
        <div>
          <div style={{fontSize:15.5,fontWeight:700,letterSpacing:'-.01em',color:'var(--ink)'}}>Your glossaries</div>
          <div className="muted" style={{fontSize:12.5,marginTop:2}}>Pick a glossary to browse, search and propose entries. Every entry is Level-Expert ratified.</div>
        </div>
        <span className="badge" style={{background:'#FFFBEB',color:'#B5851C',height:24,fontWeight:700,border:'1px solid #EBDFC2'}}><Icon name="shield_check" size={13}/>Gold Copy</span>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(296px,1fr))',gap:16}}>
        {TB_GLOSSARIES.map(g=>{
          const ents=glossaryEntries(g);
          const gold=ents.filter(e=>e.status==='gold').length;
          const review=ents.filter(e=>e.status==='review').length;
          const dnt=ents.filter(e=>e.status==='dnt').length;
          return (
            <div key={g.id} onClick={()=>onOpen(g)} className="card card-hover" style={{padding:0,overflow:'hidden',cursor:'pointer',display:'flex',flexDirection:'column'}}>
              <div style={{padding:'17px 18px 15px',display:'flex',flexDirection:'column',gap:11,flex:1}}>
                <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:10}}>
                  <span style={{width:42,height:42,borderRadius:11,background:'var(--surface-2)',color:'var(--ink-3)',border:'1px solid var(--line)',display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name={g.icon} size={21}/></span>
                  <span style={{display:'inline-flex',alignItems:'center',gap:5,fontSize:11,fontWeight:700,color:'var(--ink-3)',letterSpacing:'.03em',background:'var(--surface-2)',border:'1px solid var(--line)',borderRadius:999,padding:'3px 9px'}}>
                    {g.pair[0]}<Icon name="arrow_right" size={11} sw={2} style={{opacity:.6}}/>{g.pair[1]}
                  </span>
                </div>
                <div>
                  <div style={{fontFamily:TB_SERIF,fontSize:17,fontWeight:650,letterSpacing:'-.01em',color:'var(--ink)'}}>{g.name}</div>
                  <div className="muted" style={{fontSize:11.5,fontWeight:600,marginTop:2,color:'var(--accent)'}}>{g.domain}</div>
                </div>
                <p style={{fontSize:12.5,color:'var(--ink-2)',lineHeight:1.5,margin:0,flex:1}}>{g.desc}</p>
                <div style={{display:'flex',alignItems:'center',gap:9,flexWrap:'wrap'}}>
                  <span style={{fontSize:13,fontWeight:700,color:'var(--ink)'}}>{ents.length}<span className="muted" style={{fontWeight:500,fontSize:11.5}}> entries</span></span>
                  {gold>0 && <span style={{display:'inline-flex',alignItems:'center',gap:4,fontSize:11,fontWeight:600,color:'#B5851C'}}><span style={{width:7,height:7,borderRadius:'50%',background:'#B5851C'}}></span>{gold} gold</span>}
                  {review>0 && <span style={{display:'inline-flex',alignItems:'center',gap:4,fontSize:11,fontWeight:600,color:'#0073E6'}}><span style={{width:7,height:7,borderRadius:'50%',background:'#0073E6'}}></span>{review} review</span>}
                  {dnt>0 && <span style={{display:'inline-flex',alignItems:'center',gap:4,fontSize:11,fontWeight:600,color:'#DC2626'}}><span style={{width:7,height:7,borderRadius:'50%',background:'#DC2626'}}></span>{dnt} DNT</span>}
                </div>
              </div>
              <div style={{borderTop:'1px solid var(--line)',background:'var(--surface-2)',padding:'10px 18px',display:'flex',alignItems:'center',gap:9}}>
                <Avatar id={g.owner} size={22}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:11.5,fontWeight:600,color:'var(--ink-2)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{PEOPLE[g.owner].name}</div>
                  <div className="muted" style={{fontSize:10.5}}>Updated {g.updated}</div>
                </div>
                <span style={{display:'inline-flex',alignItems:'center',gap:5,fontSize:12,fontWeight:600,color:'var(--blue)'}}>Open<Icon name="arrow_right" size={14}/></span>
              </div>
            </div>
          );
        })}

        {/* create */}
        <button onClick={()=>onNewGlossary&&onNewGlossary()}
          style={{border:'1.5px dashed var(--line-2)',background:'var(--surface-2)',borderRadius:'var(--radius-xl)',cursor:'pointer',
            display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:10,padding:'30px 20px',minHeight:200,transition:'.14s',fontFamily:'inherit'}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--blue)';e.currentTarget.style.background='var(--blue-t)';}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--line-2)';e.currentTarget.style.background='var(--surface-2)';}}>
          <span style={{width:42,height:42,borderRadius:11,background:'#fff',color:'var(--blue)',border:'1px solid var(--line)',display:'flex',alignItems:'center',justifyContent:'center'}}><Icon name="plus" size={21} sw={2.2}/></span>
          <div style={{fontSize:13.5,fontWeight:600,color:'var(--ink-2)'}}>New glossary</div>
          <div className="muted" style={{fontSize:11.5,textAlign:'center',maxWidth:200,lineHeight:1.45}}>Start a glossary for a new domain or language pair.</div>
        </button>
      </div>
    </div>
  );
}

function FilterGroup({label, items, value, onSet}){
  return (
    <div style={{marginBottom:22}}>
      <div className="eyebrow" style={{marginBottom:9}}>{label}</div>
      <div style={{display:'flex',flexDirection:'column',gap:1}}>
        {items.map(it=>{
          const on=value===it.id;
          return (
            <button key={it.id} onClick={()=>onSet(it.id)}
              style={{display:'flex',alignItems:'center',gap:9,width:'100%',padding:'7px 9px',border:0,borderRadius:8,cursor:'pointer',textAlign:'left',
                background:on?'var(--blue-t)':'transparent',color:on?'var(--blue)':'var(--ink-2)',fontFamily:'inherit'}}
              onMouseEnter={e=>{if(!on)e.currentTarget.style.background='var(--hover)';}}
              onMouseLeave={e=>{if(!on)e.currentTarget.style.background='transparent';}}>
              {it.dot && <span style={{width:8,height:8,borderRadius:'50%',background:it.dot,flex:'none'}}></span>}
              {it.icon && <Icon name={it.icon} size={15} style={{flex:'none',opacity:.85}}/>}
              <span style={{flex:1,minWidth:0,fontSize:13,fontWeight:on?600:500,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{it.label}</span>
              <span style={{fontSize:11.5,fontWeight:600,color:on?'var(--blue)':'var(--ink-4)',fontVariantNumeric:'tabular-nums'}}>{it.count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function useViewportWidth(){
  const [w,setW]=React.useState(typeof window!=='undefined'?window.innerWidth:1280);
  React.useEffect(()=>{ const h=()=>setW(window.innerWidth); window.addEventListener('resize',h); return ()=>window.removeEventListener('resize',h); },[]);
  return w;
}

function GlossaryBrowser({glossary,onBack,cat,setCat,status,setStatus,tb,setTb,q,setQ,sort,setSort,sel,setSel,flash}){
  const w=useViewportWidth();
  const wide=w>=1024;
  const stick={position:'sticky',top:'calc(var(--header-h) + 16px)'};

  const all=glossary ? TB_ENTRIES.filter(glossary.match) : TB_ENTRIES;
  const counts={
    cat:{all:all.length, word:0,place:0,formal:0},
    status:{any:all.length, gold:0,review:0,deprecated:0,dnt:0},
  };
  const tbCount={};
  all.forEach(e=>{counts.cat[e.cat]++; counts.status[e.status]++; const kk=entryTb(e); tbCount[kk]=(tbCount[kk]||0)+1;});

  let list=all.filter(e=>(cat==='all'||e.cat===cat)&&(status==='any'||e.status===status)&&(tb==='all'||entryTb(e)===tb)
    &&(!q.trim()||e.term.toLowerCase().includes(q.toLowerCase())||(e.primary||'').toLowerCase().includes(q.toLowerCase())));
  list=[...list].sort((a,b)=> sort==='az'
    ? a.term.toLowerCase().localeCompare(b.term.toLowerCase())
    : (a.status==='gold'?0:1)-(b.status==='gold'?0:1) || a.term.toLowerCase().localeCompare(b.term.toLowerCase()));
  const cur=all.find(e=>e.id===sel)||null;

  return (
    <div style={{maxWidth:1560,margin:'0 auto',padding:'22px 28px 48px',
      display:'grid',gridTemplateColumns:wide?'236px 372px minmax(360px,1fr)':'200px minmax(0,1fr)',gap:wide?24:20,alignItems:'start'}}>

      {/* LEFT RAIL — identity + filters */}
      <div style={wide?stick:undefined}>
        {glossary ? (
          <React.Fragment>
            <button onClick={onBack} style={{display:'inline-flex',alignItems:'center',gap:6,border:0,background:'transparent',color:'var(--ink-3)',fontSize:12,fontWeight:600,cursor:'pointer',padding:0,marginBottom:12}}>
              <Icon name="chevron_left" size={14} sw={2.2}/>All glossaries
            </button>
            <div style={{display:'flex',gap:11,marginBottom:22}}>
              <span style={{width:32,height:32,borderRadius:9,background:glossary.color,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name={glossary.icon} size={18}/></span>
              <div style={{minWidth:0}}>
                <div className="eyebrow" style={{color:glossary.color}}>{glossary.pair[0]} → {glossary.pair[1]}</div>
                <div style={{fontSize:13.5,fontWeight:700,color:'var(--ink)',letterSpacing:'-.01em',lineHeight:1.25,marginTop:1}}>{glossary.name}</div>
                <div className="muted" style={{fontSize:11,lineHeight:1.45,marginTop:5}}>{glossary.desc}</div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div style={{display:'flex',gap:11,marginBottom:22}}>
            <span style={{width:30,height:30,borderRadius:'50%',background:'var(--primary)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name="check" size={16} sw={3}/></span>
            <div style={{minWidth:0}}>
              <div className="eyebrow" style={{color:'#B5851C'}}>Gold Copy</div>
              <div style={{fontSize:13.5,fontWeight:700,color:'var(--ink)',letterSpacing:'-.01em',lineHeight:1.25,marginTop:1}}>Approved master term base</div>
              <div className="muted" style={{fontSize:11,lineHeight:1.45,marginTop:5}}>Every entry is Level-Expert ratified. Use it as your single source of truth.</div>
            </div>
          </div>
        )}

        <FilterGroup label="Category" value={cat} onSet={setCat} items={[
          {id:'all', icon:'layers', label:'All entries', count:counts.cat.all},
          {id:'word', icon:TB_CAT.word.icon, label:TB_CAT.word.plural, count:counts.cat.word},
          {id:'place', icon:TB_CAT.place.icon, label:TB_CAT.place.plural, count:counts.cat.place},
          {id:'formal', icon:TB_CAT.formal.icon, label:TB_CAT.formal.plural, count:counts.cat.formal},
        ]}/>
        <FilterGroup label="Status" value={status} onSet={setStatus} items={[
          {id:'any', icon:'layers', label:'Any status'},
          {id:'gold', icon:'check', label:'Gold Copy', count:counts.status.gold},
          {id:'review', icon:'history', label:'In Review', count:counts.status.review},
          {id:'deprecated', icon:'trash', label:'Deprecated', count:counts.status.deprecated},
          {id:'dnt', icon:'globe', label:'Do Not Translate', count:counts.status.dnt},
        ]}/>
        <FilterGroup label="Term base" value={tb} onSet={setTb} items={[
          {id:'all', icon:'book', label:'All term bases', count:glossary?counts.cat.all:undefined},
          ...TB_BASES.map(b=>({id:b.id, dot:b.color, label:b.name, count:glossary?(tbCount[b.id]||0):b.entries.toLocaleString()})),
        ]}/>
      </div>

      {/* MIDDLE — list */}
      <div style={{minWidth:0}}>
        <div style={{display:'flex',alignItems:'center',gap:8,height:42,padding:'0 14px',border:'1px solid var(--line-2)',background:'#fff',borderRadius:10,boxShadow:'var(--shadow-sm)',marginBottom:14}}>
          <Icon name="search" size={17} style={{color:'var(--ink-3)'}}/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search the glossary…" style={{flex:1,border:0,outline:'none',fontSize:13.5,fontFamily:'inherit',background:'transparent',color:'var(--ink)'}}/>
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
          <span className="muted" style={{fontSize:12.5,fontWeight:500}}>{list.length} of {all.length} entries</span>
          <div style={{display:'flex',gap:3,background:'var(--surface-2)',padding:3,borderRadius:8,border:'1px solid var(--line)'}}>
            {[['az','A–Z'],['gold','Gold first']].map(([id,label])=>(
              <button key={id} onClick={()=>setSort(id)} style={{height:26,padding:'0 11px',borderRadius:6,border:0,cursor:'pointer',fontSize:12,fontWeight:600,fontFamily:'inherit',
                background:sort===id?'#fff':'transparent',color:sort===id?'var(--ink)':'var(--ink-3)',boxShadow:sort===id?'0 1px 2px rgba(29,53,87,.1)':'none'}}>{label}</button>
            ))}
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:9}}>
          {list.map(e=>{
            const st=TB_STATUS[e.status], k=TB_CAT[e.cat], on=sel===e.id;
            return (
              <div key={e.id} onClick={()=>setSel(e.id)} className="card card-hover"
                style={{padding:'14px 16px',cursor:'pointer',borderColor:on?'var(--blue)':'var(--line)',boxShadow:on?'0 0 0 1px var(--blue), var(--shadow-sm)':'var(--shadow-sm)'}}>
                <div style={{display:'flex',alignItems:'center',gap:9,justifyContent:'space-between'}}>
                  <div style={{display:'flex',alignItems:'center',gap:9,minWidth:0}}>
                    <span style={{fontFamily:TB_SERIF,fontSize:18,fontWeight:600,color:'var(--ink)',letterSpacing:'-.01em',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{e.term}</span>
                    {e.status==='gold' && <Verified size={16}/>}
                    {e.status==='review' && <Icon name="clock" size={15} style={{color:TB_STATUS.review.color,flex:'none'}}/>}
                    {e.status==='deprecated' && <Icon name="history" size={15} style={{color:TB_STATUS.deprecated.color,flex:'none'}}/>}
                  </div>
                  <LangPair src={e.src} tgt={e.tgt}/>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:8,marginTop:8,flexWrap:'wrap'}}>
                  <span className="badge" style={{background:'var(--surface-2)',color:'var(--ink-2)',border:'1px solid var(--line)',height:20}}><Icon name={k.icon} size={11}/>{k.short}</span>
                  <span className="muted" style={{fontSize:11.5}}>·  {e.domain}</span>
                  {e.status==='dnt' && <span className="badge" style={{background:st.tint,color:st.color,height:20,fontSize:10.5,fontWeight:700}}>DNT</span>}
                </div>
                {e.gloss && <div style={{fontSize:12.5,color:'var(--ink-2)',lineHeight:1.5,marginTop:9}}>
                  <span style={{fontWeight:600,color:e.status==='dnt'?'var(--ink)':'var(--blue)'}}>{e.primary}</span>
                  <span className="muted"> — {e.gloss}</span>
                </div>}
              </div>
            );
          })}
          {!list.length && <div style={{textAlign:'center',padding:'40px',color:'var(--ink-3)',fontSize:13,border:'1.5px dashed var(--line-2)',borderRadius:12}}>No entries match these filters.</div>}
        </div>
      </div>

      {/* RIGHT — detail */}
      <div style={wide?stick:{gridColumn:'1 / -1'}}>
        {cur ? <TermDetail e={cur} flash={flash}/> : (
          <div className="card card-pad" style={{textAlign:'center',padding:'48px 24px',color:'var(--ink-3)'}}>
            <Icon name="comment" size={26} style={{opacity:.4}}/>
            <div style={{fontSize:13,marginTop:10}}>Select a term to see its full entry.</div>
          </div>
        )}
      </div>
    </div>
  );
}

function MetaCell({label, value}){
  return (
    <div>
      <div style={{fontSize:11,fontWeight:600,letterSpacing:'.04em',textTransform:'uppercase',color:'var(--ink-3)'}}>{label}</div>
      <div style={{fontSize:13.5,color:'var(--ink)',fontWeight:550,lineHeight:1.4,marginTop:3}}>{value}</div>
    </div>
  );
}

function TermDetail({e, flash}){
  const st=TB_STATUS[e.status], k=TB_CAT[e.cat];
  return (
    <div className="card" style={{padding:0,overflow:'hidden',maxHeight:'calc(100vh - var(--header-h) - 40px)',display:'flex',flexDirection:'column'}}>
      <div style={{overflowY:'auto',padding:'18px 20px'}}>
        {/* header */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:10,marginBottom:10}}>
          <span className="badge" style={{background:'var(--surface-2)',color:'var(--ink-2)',border:'1px solid var(--line)',height:21}}><Icon name={k.icon} size={11}/>{k.label}</span>
          <LangPair src={e.src} tgt={e.tgt}/>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <h2 style={{fontFamily:TB_SERIF,fontSize:27,fontWeight:600,color:'var(--ink)',letterSpacing:'-.01em',margin:0,lineHeight:1.1}}>{e.term}</h2>
          {e.status==='gold' && <Verified size={20}/>}
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10,marginTop:8,flexWrap:'wrap'}}>
          <span style={{fontFamily:TB_SERIF,fontStyle:'italic',fontSize:14,color:'var(--ink-3)'}}>{e.pos}</span>
          <span className="badge" style={{background:st.tint,color:st.color,height:21,fontWeight:600}}>{e.status==='gold'&&<Icon name="check" size={12}/>}{st.label}</span>
        </div>
        <p style={{fontSize:13.5,color:'var(--ink-2)',lineHeight:1.55,margin:'14px 0 0'}}>{e.def}</p>

        {/* variants */}
        {e.variants && e.variants.length>0 && (
          <div style={{marginTop:22}}>
            <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:12}}>
              <Icon name="signal" size={14} style={{color:'var(--ink-3)'}}/>
              <span className="eyebrow">Variants &amp; Synonyms</span>
              <span className="eyebrow" style={{color:'var(--ink-4)'}}>· Votes are advisory</span>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              {e.variants.map((v,i)=>{
                const rejected=v.reg==='Rejected', pos=v.votes>=0, isGold=!rejected && v.term===e.primary;
                return (
                  <div key={i} style={{display:'flex',gap:14}}>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:26,flex:'none',paddingTop:1}}>
                      <Icon name="arrow_up" size={14} sw={2.2} style={{color:'var(--ink-4)'}}/>
                      <span style={{fontSize:13,fontWeight:700,lineHeight:1.35,fontVariantNumeric:'tabular-nums',color:rejected?'var(--coral)':pos?'var(--success)':'var(--ink-3)'}}>{pos?'+':''}{v.votes}</span>
                      <Icon name="arrow_down" size={14} sw={2.2} style={{color:'var(--ink-4)'}}/>
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
                        <span style={{fontFamily:TB_SERIF,fontSize:16,fontWeight:600,color:rejected?'var(--ink-3)':'var(--ink)',textDecoration:rejected?'line-through':'none',letterSpacing:'-.01em'}}>{v.term}</span>
                        {isGold && <Verified size={15}/>}
                        {rejected && <span className="badge" style={{background:'var(--coral-t)',color:'var(--coral)',height:19}}><Icon name="trash" size={11}/>Rejected</span>}
                        <span style={{flex:1}}></span>
                        {!rejected && v.reg && <span className="badge" style={{background:'#fff',color:'var(--ink-3)',border:'1px solid var(--line-2)',height:19,borderRadius:999,fontSize:10.5}}>{v.reg}</span>}
                        {v.region && <span className="badge" style={{background:'#fff',color:'var(--ink-3)',border:'1px solid var(--line-2)',height:19,borderRadius:999,fontSize:10.5}}>{v.region}</span>}
                      </div>
                      {v.note && <div style={{fontSize:12.5,color:'var(--ink-2)',lineHeight:1.5,marginTop:4}}>{v.note}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* in context */}
        {e.context && (
          <div style={{marginTop:22}}>
            <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:10}}>
              <Icon name="comment" size={14} style={{color:'var(--ink-3)'}}/>
              <span className="eyebrow">In context</span>
            </div>
            <div style={{background:'var(--surface-2)',border:'1px solid var(--line)',borderRadius:11,padding:'14px 16px',display:'flex',flexDirection:'column',gap:12}}>
              <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
                <span className="kbd" style={{flex:'none',marginTop:2}}>EN</span>
                <p style={{fontFamily:TB_SERIF,fontSize:14.5,color:'var(--ink)',lineHeight:1.5,margin:0}}>{e.context.en}</p>
              </div>
              <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
                <span className="kbd" style={{flex:'none',marginTop:2}}>ES</span>
                <p style={{fontFamily:TB_SERIF,fontStyle:'italic',fontSize:14.5,color:'var(--accent)',lineHeight:1.5,margin:0}}>{e.context.es}</p>
              </div>
            </div>
          </div>
        )}

        {/* lexicographer's note */}
        {e.note && (
          <div style={{marginTop:22}}>
            <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:10}}>
              <Icon name="sparkle" size={14} style={{color:'var(--accent)'}}/>
              <span className="eyebrow" style={{color:'var(--accent)'}}>Lexicographer’s Note</span>
            </div>
            <div style={{padding:'14px 16px',borderRadius:11,background:'var(--accent-subtle)',border:'1px solid #CBDDF5'}}>
              <p style={{fontSize:13,color:'var(--ink-2)',lineHeight:1.6,margin:0}}>{e.note}</p>
            </div>
          </div>
        )}

        {/* entry data */}
        <div style={{marginTop:24,paddingTop:20,borderTop:'1px solid var(--line)'}}>
          <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:16}}>
            <Icon name="help" size={14} style={{color:'var(--ink-3)'}}/>
            <span className="eyebrow">Entry data</span>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'18px 48px'}}>
            <MetaCell label="Domain" value={e.domain}/>
            <MetaCell label="Sub-domain" value={e.sub}/>
            <MetaCell label="Part of speech" value={e.pos}/>
            <MetaCell label="Register / Style" value={e.register}/>
            <MetaCell label="Region" value={e.region}/>
            <MetaCell label="Colloquial / Slang" value={e.colloquial}/>
            <MetaCell label="Orthography" value={e.orthography}/>
          </div>
          {e.related && e.related.length>0 && (
            <div style={{marginTop:18}}>
              <div style={{fontSize:11,fontWeight:600,letterSpacing:'.04em',textTransform:'uppercase',color:'var(--ink-3)',marginBottom:7}}>Related</div>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                {e.related.map(r=><span key={r} className="badge" style={{background:'var(--blue-t)',color:'var(--blue)',height:22,borderRadius:999}}>{r}</span>)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* footer — approval */}
      <div style={{borderTop:'1px solid var(--line)',background:'var(--surface-2)',padding:'12px 18px',display:'flex',alignItems:'center',gap:11}}>
        {e.approver ? (
          <>
            <Verified size={20}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:12.5,fontWeight:600,color:'var(--ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>Approved by {e.approver.name}</div>
              <div className="muted" style={{fontSize:11}}>{e.approver.level} · {e.approver.lang} · {e.approver.date}</div>
            </div>
          </>
        ) : (
          <>
            <Icon name="clock" size={18} style={{color:TB_STATUS.review.color,flex:'none'}}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:12.5,fontWeight:600,color:'var(--ink)'}}>Awaiting ratification</div>
              <div className="muted" style={{fontSize:11}}>No Expert sign-off yet</div>
            </div>
          </>
        )}
        <button className="btn btn-secondary btn-sm" style={{flex:'none'}} onClick={()=>flash&&flash('Propose an edit to “'+e.term+'”')}><Icon name="pen" size={13}/>Propose edit</button>
      </div>
    </div>
  );
}

const TB_QKIND={'New term':{color:'#16A34A',tint:'#F0FDF4',icon:'plus'},'Edit':{color:'#0073E6',tint:'#EBF4FF',icon:'pen'},'Deprecation':{color:'#64748B',tint:'#F1F5F9',icon:'history'}};
function TermReviewQueue({setTab, setSel, setStatus, flash}){
  return (
    <div style={{maxWidth:920,margin:'0 auto',padding:'24px 28px 48px'}}>
      <div className="card card-pad" style={{marginBottom:18,display:'flex',alignItems:'center',gap:13,background:'linear-gradient(180deg,#FFFCF4,#fff)',borderColor:'#F4E6C2'}}>
        <span style={{width:38,height:38,borderRadius:10,background:'#FFFBEB',color:'#B5851C',display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name="clock" size={19}/></span>
        <div style={{flex:1}}>
          <div style={{fontSize:14.5,fontWeight:700,color:'var(--ink)',letterSpacing:'-.01em'}}>{TB_QUEUE.length} proposals awaiting ratification</div>
          <div className="muted" style={{fontSize:12.5,marginTop:2}}>Expert lexicographers review new terms, edits and deprecations before they enter the Gold Copy.</div>
        </div>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:11}}>
        {TB_QUEUE.map(item=>{
          const kk=TB_QKIND[item.kind];
          return (
            <div key={item.id} className="card card-pad" style={{padding:'15px 18px'}}>
              <div style={{display:'flex',alignItems:'flex-start',gap:13}}>
                <span style={{width:36,height:36,borderRadius:9,background:kk.tint,color:kk.color,display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name={kk.icon} size={17}/></span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:'flex',alignItems:'center',gap:9,flexWrap:'wrap'}}>
                    <span style={{fontFamily:TB_SERIF,fontSize:17,fontWeight:600,color:'var(--ink)',letterSpacing:'-.01em'}}>{item.term}</span>
                    <span className="badge" style={{background:kk.tint,color:kk.color,height:20,fontWeight:600}}>{item.kind}</span>
                    <span className="badge" style={{background:'var(--surface-2)',color:'var(--ink-3)',border:'1px solid var(--line)',height:20,fontSize:10.5}}>EN→{item.target}</span>
                  </div>
                  <div style={{fontSize:12.5,color:'var(--ink-2)',lineHeight:1.5,marginTop:6}}>{item.note}</div>
                  <div style={{display:'flex',alignItems:'center',gap:7,marginTop:9,fontSize:11.5,color:'var(--ink-3)'}}>
                    <Avatar id={item.src} size={18}/>Proposed by {PEOPLE[item.src].name.split(' ')[0]}<span style={{width:3,height:3,borderRadius:'50%',background:'var(--ink-4)'}}></span>{item.when} ago
                  </div>
                </div>
                <div style={{display:'flex',gap:7,flex:'none'}}>
                  <button className="btn btn-secondary btn-sm" onClick={()=>flash&&flash('Returned “'+item.term+'” to proposer')}>Decline</button>
                  <button className="btn btn-primary btn-sm" onClick={()=>flash&&flash('Ratified “'+item.term+'” into the Gold Copy')}><Icon name="check" size={14}/>Ratify</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { TermbaseWorkspace });

/* ===== shared form controls (IMIN-styled) ===== */
function TBField({label, req, hint, children, style}){
  return (
    <div style={style}>
      {label && <label style={{display:'block',fontSize:12,fontWeight:600,color:'var(--ink-2)',marginBottom:hint?3:6}}>{label}{req && <span style={{color:'var(--danger)',marginLeft:3}}>*</span>}</label>}
      {hint && <div style={{fontSize:11.5,color:'var(--ink-3)',lineHeight:1.45,marginBottom:7}}>{hint}</div>}
      {children}
    </div>
  );
}
function TBSwitch({on, onChange}){
  return (
    <button type="button" onClick={()=>onChange(!on)} style={{width:40,height:23,borderRadius:999,border:0,padding:0,cursor:'pointer',flex:'none',
      background:on?'var(--accent)':'var(--line-2)',position:'relative',transition:'background .16s'}}>
      <span style={{position:'absolute',top:2,left:on?19:2,width:19,height:19,borderRadius:'50%',background:'#fff',boxShadow:'0 1px 2px rgba(0,0,0,.25)',transition:'left .16s'}}></span>
    </button>
  );
}
function TBSeg({value, onChange, options}){
  return (
    <div className="tb-seg">
      {options.map(o=><button type="button" key={o.value} className={value===o.value?'on':''} onClick={()=>onChange(o.value)}>{o.label}</button>)}
    </div>
  );
}
function TBToggleField({label, hint, on, onChange}){
  return (
    <div style={{display:'flex',alignItems:'center',gap:12,padding:'11px 13px',border:'1px solid var(--line)',borderRadius:10,background:'var(--surface-2)'}}>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:12.5,fontWeight:600,color:'var(--ink)'}}>{label}</div>
        <div style={{fontSize:11,color:'var(--ink-3)',lineHeight:1.4,marginTop:1}}>{hint}</div>
      </div>
      <TBSwitch on={on} onChange={onChange}/>
    </div>
  );
}
function TBSection({step, title, children}){
  return (
    <div style={{padding:'20px 0',borderTop:'1px solid var(--line)'}}>
      <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:15}}>
        <span style={{width:22,height:22,borderRadius:6,background:'var(--primary-tint)',color:'var(--primary)',fontSize:11.5,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}>{step}</span>
        <span style={{fontSize:14,fontWeight:650,color:'var(--ink)',letterSpacing:'-.01em'}}>{title}</span>
      </div>
      {children}
    </div>
  );
}
function TBModal({title, sub, icon='plus', width=920, onClose, children, footer}){
  React.useEffect(()=>{
    const h=e=>{ if(e.key==='Escape') onClose(); };
    window.addEventListener('keydown',h); return ()=>window.removeEventListener('keydown',h);
  },[onClose]);
  return (
    <div onMouseDown={e=>{ if(e.target===e.currentTarget) onClose(); }}
      style={{position:'fixed',inset:0,zIndex:300,background:'rgba(36,39,45,.42)',backdropFilter:'blur(2px)',display:'grid',placeItems:'center',padding:24,animation:'fade .15s'}}>
      <div style={{background:'#fff',borderRadius:'var(--radius-xl)',boxShadow:'var(--shadow-lg)',width,maxWidth:'96vw',maxHeight:'92vh',display:'flex',flexDirection:'column',overflow:'hidden',animation:'rise .28s cubic-bezier(.2,.8,.3,1) both'}}>
        <div style={{display:'flex',alignItems:'center',gap:13,padding:'17px 22px',borderBottom:'1px solid var(--line)',flex:'none'}}>
          <span style={{width:34,height:34,borderRadius:9,background:'var(--primary)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name={icon} size={18} sw={2.2}/></span>
          <div style={{flex:1,minWidth:0}}>
            <h2 style={{fontSize:18,fontWeight:700,letterSpacing:'-.02em',margin:0,color:'var(--ink)'}}>{title}</h2>
            {sub && <p style={{fontSize:12.5,color:'var(--ink-3)',margin:'2px 0 0'}}>{sub}</p>}
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-icon" style={{flex:'none'}}><Icon name="x" size={19}/></button>
        </div>
        <div style={{overflowY:'auto',padding:'0 22px'}}>{children}</div>
        <div style={{display:'flex',alignItems:'center',gap:10,padding:'13px 22px',borderTop:'1px solid var(--line)',background:'var(--surface-2)',flex:'none'}}>{footer}</div>
      </div>
    </div>
  );
}

/* ===== Add a new term — fields mirror the glossary entry exactly ===== */
function NewTermModal({glossary, onClose, flash}){
  const O=TB_OPTIONS, g=glossary;
  const dom0 = g ? (TB_DOMAIN_BY_GLOSS[g.id]||'Literary') : 'Literary';
  const blank={
    cat:'word', from:g?g.pair[0]:'EN', to:g?g.pair[1]:'ES',
    term:'', gloss:'', def:'', dnt:false, colloquial:false,
    pos:'noun', register:'neutral', region:'General', orthography:'',
    domain:dom0, sub:(O.subdomains[dom0]||['General'])[0],
    exEn:'', exEs:'', note:'', related:'',
    variants:[{term:'', reg:'neutral', region:'', note:''}],
  };
  const [f,setF]=React.useState(blank);
  const set=(k,v)=>setF(s=>({...s,[k]:v}));
  const subs=O.subdomains[f.domain]||['General'];
  const setVar=(i,k,v)=>setF(s=>({...s,variants:s.variants.map((x,j)=>j===i?{...x,[k]:v}:x)}));
  const addVar=()=>setF(s=>({...s,variants:[...s.variants,{term:'',reg:'neutral',region:'',note:''}]}));
  const delVar=(i)=>setF(s=>({...s,variants:s.variants.filter((_,j)=>j!==i)}));
  const valid=f.term.trim() && f.variants.some(v=>v.term.trim());

  function submit(again){
    flash && flash('Submitted “'+f.term.trim()+'” — added to the Review Queue for sign-off');
    if(again){ setF({...blank}); } else { onClose(); }
  }

  const cats=[
    {id:'word', icon:TB_CAT.word.icon, name:'Word & Phrase', desc:'Idioms, collocations, everyday vocabulary'},
    {id:'place', icon:TB_CAT.place.icon, name:'Place', desc:'Toponyms, exonyms, locations'},
    {id:'formal', icon:TB_CAT.formal.icon, name:'Formal Name', desc:'Titles, published works, proper names'},
  ];

  const footer=(
    <React.Fragment>
      <div style={{display:'flex',alignItems:'center',gap:7,fontSize:11.5,color:'var(--warning-text)',background:'var(--warning-t)',border:'1px solid #EBDFC2',borderRadius:8,padding:'6px 10px',lineHeight:1.35}}>
        <Icon name="history" size={14} style={{flex:'none'}}/>Goes to the Review Queue for Level-Expert sign-off before it joins the Gold Copy.
      </div>
      <span style={{flex:1}}></span>
      <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
      <button className="btn btn-secondary btn-sm" disabled={!valid} style={{opacity:valid?1:.5}} onClick={()=>submit(true)}><Icon name="plus" size={14}/>Save &amp; add another</button>
      <button className="btn btn-primary btn-sm" disabled={!valid} style={{opacity:valid?1:.5}} onClick={()=>submit(false)}><Icon name="send" size={14}/>Submit for review</button>
    </React.Fragment>
  );

  return (
    <TBModal title="Add a new term" sub="Propose an entry for the Gold Copy — reviewed before it goes live." onClose={onClose} footer={footer}>
      {/* 1 — where & what */}
      <TBSection step="1" title="Where & what">
        {g && (
          <div style={{display:'flex',alignItems:'center',gap:10,padding:'10px 13px',border:'1px solid '+g.color+'40',background:'linear-gradient(180deg,'+g.color+'12,#fff)',borderRadius:10,marginBottom:16}}>
            <span style={{width:28,height:28,borderRadius:7,background:g.color,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name={g.icon} size={15}/></span>
            <div style={{fontSize:12.5,color:'var(--ink-2)'}}>Adding to <strong style={{color:'var(--ink)'}}>{g.name}</strong> — <span style={{fontWeight:600,color:g.color}}>{g.pair[0]} → {g.pair[1]}</span>, {g.domain}.</div>
          </div>
        )}
        <TBField label="Category" req>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10}}>
            {cats.map(k=>(
              <div key={k.id} className={"tb-kind"+(f.cat===k.id?' on':'')} onClick={()=>set('cat',k.id)}>
                <Icon name={k.icon} size={19} style={{color:f.cat===k.id?'var(--accent)':'var(--ink-3)'}}/>
                <span style={{fontSize:13,fontWeight:600,color:'var(--ink)'}}>{k.name}</span>
                <span style={{fontSize:11,color:'var(--ink-3)',lineHeight:1.4}}>{k.desc}</span>
              </div>
            ))}
          </div>
        </TBField>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginTop:16}}>
          <TBField label="From (source)">
            <select className="tb-in" value={f.from} onChange={e=>set('from',e.target.value)}>
              {O.langs.map(l=><option key={l} value={l}>{TB_LANG_NAMES[l]} ({l})</option>)}
            </select>
          </TBField>
          <TBField label="To (target)">
            <select className="tb-in" value={f.to} onChange={e=>set('to',e.target.value)}>
              {O.langs.map(l=><option key={l} value={l}>{TB_LANG_NAMES[l]} ({l})</option>)}
            </select>
          </TBField>
        </div>
      </TBSection>

      {/* 2 — the term & variants */}
      <TBSection step="2" title="The term & its variants">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
          <TBField label={'Term in '+TB_LANG_NAMES[f.from]+' (source)'} req hint="The word, phrase or idiom as it appears.">
            <input className="tb-in" style={{fontFamily:TB_SERIF,fontSize:15.5}} value={f.term} onChange={e=>set('term',e.target.value)} placeholder="e.g. break a leg"/>
          </TBField>
          <TBField label="Short gloss" hint="One-line summary shown in the list.">
            <input className="tb-in" value={f.gloss} onChange={e=>set('gloss',e.target.value)} placeholder="e.g. ‘good luck’ before a performance"/>
          </TBField>
        </div>
        <TBField label="Definition" hint="The fuller entry definition shown at the top of the term." style={{marginTop:16}}>
          <textarea className="tb-in" value={f.def} onChange={e=>set('def',e.target.value)} placeholder="What it means, and any guidance on how to render it in the target language…"/>
        </TBField>
        <div style={{marginTop:16}}>
          <label style={{display:'block',fontSize:12,fontWeight:600,color:'var(--ink-2)',marginBottom:3}}>
            {f.dnt?('Keep as-is in '+TB_LANG_NAMES[f.to]):('Variants & synonyms in '+TB_LANG_NAMES[f.to])} <span style={{color:'var(--danger)',marginLeft:3}}>*</span>
          </label>
          <div style={{fontSize:11.5,color:'var(--ink-3)',lineHeight:1.45,marginBottom:9}}>Add every accepted rendering. A Level Expert marks the gold variant; the floor up/down-votes the rest as advisory signals.</div>
          <div style={{display:'flex',flexDirection:'column',gap:9}}>
            {f.variants.map((v,i)=>(
              <div key={i} style={{border:'1px solid var(--line)',borderRadius:10,padding:'11px 12px',background:'var(--surface-2)'}}>
                <div style={{display:'flex',gap:8,alignItems:'center'}}>
                  <input className="tb-in" style={{fontFamily:TB_SERIF,fontSize:14.5,flex:'1 1 44%'}} value={v.term} onChange={e=>setVar(i,'term',e.target.value)} placeholder={i===0?'Primary rendering':'Another variant'}/>
                  <select className="tb-in" style={{flex:'0 0 120px'}} value={v.reg} onChange={e=>setVar(i,'reg',e.target.value)}>
                    {O.registers.map(r=><option key={r} value={r}>{r}</option>)}
                  </select>
                  <input className="tb-in" style={{flex:'0 0 110px'}} value={v.region} onChange={e=>setVar(i,'region',e.target.value)} placeholder="region"/>
                  {f.variants.length>1 && <button className="btn btn-ghost btn-icon btn-sm" style={{flex:'none'}} onClick={()=>delVar(i)}><Icon name="trash" size={15}/></button>}
                </div>
                <input className="tb-in" style={{marginTop:8}} value={v.note} onChange={e=>setVar(i,'note',e.target.value)} placeholder="Note on usage / nuance (optional)"/>
              </div>
            ))}
          </div>
          {!f.dnt && <button className="btn btn-secondary btn-sm" style={{marginTop:9}} onClick={addVar}><Icon name="plus" size={14}/>Add variant</button>}
        </div>
      </TBSection>

      {/* 3 — grammar & form */}
      <TBSection step="3" title="Grammar & form">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
          <TBToggleField label="Do Not Translate" hint="Loanword / brand — keep the source form as-is." on={f.dnt} onChange={v=>set('dnt',v)}/>
          <TBToggleField label="Colloquial / slang" hint="Informal, regional, or non-standard." on={f.colloquial} onChange={v=>set('colloquial',v)}/>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:14}}>
          <TBField label="Part of speech">
            <select className="tb-in" value={f.pos} onChange={e=>set('pos',e.target.value)}>
              {O.pos.map(p=><option key={p} value={p}>{p}</option>)}
            </select>
          </TBField>
          <TBField label="Register / style">
            <select className="tb-in" value={f.register} onChange={e=>set('register',e.target.value)}>
              {O.registers.map(r=><option key={r} value={r}>{r}</option>)}
            </select>
          </TBField>
          <TBField label="Orthography" hint="Casing, accents, italics.">
            <input className="tb-in" value={f.orthography} onChange={e=>set('orthography',e.target.value)} placeholder="e.g. retain accents"/>
          </TBField>
        </div>
      </TBSection>

      {/* 4 — classification */}
      <TBSection step="4" title="Classification">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:14}}>
          <TBField label="Domain">
            <select className="tb-in" value={f.domain} onChange={e=>{ set('domain',e.target.value); set('sub',(O.subdomains[e.target.value]||['General'])[0]); }}>
              {O.domains.map(d=><option key={d} value={d}>{d}</option>)}
            </select>
          </TBField>
          <TBField label="Sub-domain">
            <select className="tb-in" value={f.sub} onChange={e=>set('sub',e.target.value)}>
              {subs.map(d=><option key={d} value={d}>{d}</option>)}
            </select>
          </TBField>
          <TBField label="Region / variety">
            <select className="tb-in" value={f.region} onChange={e=>set('region',e.target.value)}>
              {O.regions.map(r=><option key={r} value={r}>{r}</option>)}
            </select>
          </TBField>
        </div>
      </TBSection>

      {/* 5 — context & notes */}
      <TBSection step="5" title="Context & notes">
        <TBField label="In context" hint="Show the term at work in both languages." style={{marginBottom:16}}>
          <input className="tb-in" style={{fontFamily:TB_SERIF,fontSize:14.5,marginBottom:8}} value={f.exEn} onChange={e=>set('exEn',e.target.value)} placeholder={'Source ('+f.from+')'}/>
          <input className="tb-in" style={{fontFamily:TB_SERIF,fontSize:14.5,fontStyle:'italic',color:'var(--ink-2)'}} value={f.exEs} onChange={e=>set('exEs',e.target.value)} placeholder={'Translation ('+f.to+')'}/>
        </TBField>
        <TBField label="Related terms" hint="Comma-separated headwords." style={{marginBottom:16}}>
          <input className="tb-in" value={f.related} onChange={e=>set('related',e.target.value)} placeholder="e.g. good luck, knock 'em dead"/>
        </TBField>
        <TBField label="Lexicographer’s note">
          <textarea className="tb-in" value={f.note} onChange={e=>set('note',e.target.value)} placeholder="Pitfalls, false friends, when NOT to use this…"/>
        </TBField>
      </TBSection>
    </TBModal>
  );
}

/* ===== Create a new glossary — fields mirror the glossary card ===== */
function NewGlossaryModal({onClose, flash}){
  const O=TB_OPTIONS;
  const icons=['book','shield_check','pin_loc','comment','globe','bookmark'];
  const colors=['#B5851C','#DC2626','#0073E6','#16A34A','#1D3557','#0EA5E9'];
  const [f,setF]=React.useState({name:'',from:'EN',to:'ES',domain:'',desc:'',icon:'book',color:'#0073E6'});
  const set=(k,v)=>setF(s=>({...s,[k]:v}));
  const valid=f.name.trim() && f.domain.trim();
  function submit(){ flash && flash('Created glossary “'+f.name.trim()+'” — '+f.from+' → '+f.to); onClose(); }

  const footer=(
    <React.Fragment>
      <span style={{flex:1}}></span>
      <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
      <button className="btn btn-primary btn-sm" disabled={!valid} style={{opacity:valid?1:.5}} onClick={submit}><Icon name="check" size={14} sw={2.4}/>Create glossary</button>
    </React.Fragment>
  );

  return (
    <TBModal title="New glossary" sub="Start a curated cut of the Gold Copy for a domain or language pair." icon="book" width={560} onClose={onClose} footer={footer}>
      <div style={{padding:'20px 0'}}>
        {/* preview */}
        <div style={{display:'flex',alignItems:'center',gap:12,padding:'14px 15px',borderRadius:11,border:'1px solid '+f.color+'40',background:'linear-gradient(180deg,'+f.color+'12,#fff)',marginBottom:20}}>
          <span style={{width:40,height:40,borderRadius:10,background:f.color,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><Icon name={f.icon} size={20}/></span>
          <div style={{minWidth:0}}>
            <div style={{fontFamily:TB_SERIF,fontSize:16,fontWeight:650,color:'var(--ink)',letterSpacing:'-.01em'}}>{f.name.trim()||'Glossary name'}</div>
            <div style={{fontSize:11.5,fontWeight:600,color:f.color,marginTop:1}}>{f.from} → {f.to}{f.domain?' · '+f.domain:''}</div>
          </div>
        </div>

        <TBField label="Glossary name" req style={{marginBottom:16}}>
          <input className="tb-in" style={{fontFamily:TB_SERIF,fontSize:15}} value={f.name} onChange={e=>set('name',e.target.value)} placeholder="e.g. Literary Gold Copy"/>
        </TBField>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:16}}>
          <TBField label="Source language">
            <select className="tb-in" value={f.from} onChange={e=>set('from',e.target.value)}>
              {O.langs.map(l=><option key={l} value={l}>{TB_LANG_NAMES[l]} ({l})</option>)}
            </select>
          </TBField>
          <TBField label="Target language">
            <select className="tb-in" value={f.to} onChange={e=>set('to',e.target.value)}>
              {O.langs.map(l=><option key={l} value={l}>{TB_LANG_NAMES[l]} ({l})</option>)}
            </select>
          </TBField>
        </div>
        <TBField label="Domain" req hint="The subject area this glossary covers." style={{marginBottom:16}}>
          <input className="tb-in" value={f.domain} onChange={e=>set('domain',e.target.value)} placeholder="e.g. Literary & Idiomatic"/>
        </TBField>
        <TBField label="Description" style={{marginBottom:16}}>
          <textarea className="tb-in" value={f.desc} onChange={e=>set('desc',e.target.value)} placeholder="What kinds of entries belong here…"/>
        </TBField>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          <TBField label="Icon">
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {icons.map(ic=>(
                <button type="button" key={ic} onClick={()=>set('icon',ic)} style={{width:36,height:36,borderRadius:9,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',
                  border:'1.5px solid '+(f.icon===ic?'var(--accent)':'var(--line)'),background:f.icon===ic?'var(--accent-subtle)':'#fff',color:f.icon===ic?'var(--accent)':'var(--ink-3)'}}><Icon name={ic} size={18}/></button>
              ))}
            </div>
          </TBField>
          <TBField label="Accent colour">
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {colors.map(c=>(
                <button type="button" key={c} onClick={()=>set('color',c)} style={{width:36,height:36,borderRadius:9,cursor:'pointer',border:'2px solid '+(f.color===c?'var(--ink)':'transparent'),background:'#fff',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <span style={{width:22,height:22,borderRadius:6,background:c}}></span>
                </button>
              ))}
            </div>
          </TBField>
        </div>
      </div>
    </TBModal>
  );
}
