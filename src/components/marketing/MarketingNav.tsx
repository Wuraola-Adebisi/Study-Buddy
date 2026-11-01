import {ArrowUpRight,Menu,X} from 'lucide-react'
import {useState} from 'react'
import {Wordmark} from '../brand/Wordmark'
export function MarketingNav({onEnter}:{onEnter:()=>void}){
 const[open,setOpen]=useState(false)
 return <header className="morrow-nav">
  <div className="morrow-nav-inner">
   <a href="#top" aria-label="Morrow home" className="morrow-brand"><Wordmark/><span className="brand-note">LEARNING, IN MOTION</span></a>
   <nav className="morrow-nav-links"><a href="#the-process">The process</a><a href="#what-you-can-do">Study modes</a><a href="#faq">Questions</a></nav>
   <button onClick={onEnter} className="nav-start">Enter Morrow <ArrowUpRight size={16}/></button>
   <button className="nav-menu-toggle" aria-label="Toggle navigation" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X size={20}/>:<Menu size={20}/>}</button>
  </div>
  {open&&<nav className="morrow-mobile-nav"><a href="#the-process" onClick={()=>setOpen(false)}>The process</a><a href="#what-you-can-do" onClick={()=>setOpen(false)}>Study modes</a><a href="#faq" onClick={()=>setOpen(false)}>Questions</a><button onClick={onEnter}>Enter your learning space <ArrowUpRight size={16}/></button></nav>}
 </header>
}
