import {ArrowLeft,BookOpen,Home,Library,ListChecks,Menu,Target,X} from 'lucide-react'
import {useState} from 'react'
import {Wordmark} from '../brand/Wordmark'
export type WorkspacePage='overview'|'study'|'materials'|'progress'|'plan'|'settings'
const links:{id:WorkspacePage;label:string;icon:typeof Home}[]=[{id:'overview',label:'Overview',icon:Home},{id:'study',label:'Study room',icon:BookOpen},{id:'materials',label:'Materials',icon:Library},{id:'progress',label:'Progress',icon:Target},{id:'plan',label:'Study plan',icon:ListChecks}]
type Props={page:WorkspacePage;onNavigate:(page:WorkspacePage)=>void;onExit:()=>void}
export function AppHeader({page,onNavigate,onExit}:Props){
 const[menuOpen,setMenuOpen]=useState(false)
 return <header className="workspace-nav">
  <div className="workspace-nav-inner">
   <div className="workspace-nav-brand"><button onClick={onExit} aria-label="Back to Morrow homepage"><Wordmark/></button><span>YOUR LEARNING SPACE</span></div>
   <nav className="workspace-links">{links.map(({id,label,icon:Icon})=><button key={id} onClick={()=>onNavigate(id)} className={page===id?'is-current':''}><Icon size={16}/>{label}</button>)}</nav>
   <div className="workspace-nav-actions"><button onClick={()=>onNavigate('settings')} className="workspace-avatar">W</button><button onClick={onExit} className="workspace-exit"><ArrowLeft size={15}/> Website</button><button onClick={()=>setMenuOpen(!menuOpen)} className="workspace-menu" aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen?<X size={19}/>:<Menu size={19}/>}</button></div>
  </div>
  {menuOpen&&<nav className="workspace-mobile-links">{links.map(({id,label,icon:Icon})=><button key={id} onClick={()=>{onNavigate(id);setMenuOpen(false)}} className={page===id?'is-current':''}><Icon size={17}/>{label}</button>)}<button onClick={onExit}><ArrowLeft size={16}/> Back to website</button></nav>}
 </header>
}
