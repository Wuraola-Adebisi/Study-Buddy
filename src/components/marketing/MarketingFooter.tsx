import {ArrowUpRight,ArrowUp} from 'lucide-react'
import {Wordmark} from '../brand/Wordmark'
export function MarketingFooter({onEnter}:{onEnter:()=>void}){
 return <footer className="morrow-footer">
  <div className="footer-main">
   <div className="footer-brand-col"><Wordmark light/><p>For the things you are curious about, and the ideas you are not done thinking through.</p><button onClick={onEnter}>Go to your learning space <ArrowUpRight size={16}/></button></div>
   <div className="footer-link-col"><span>FIND YOUR WAY</span><a href="#the-process">The process</a><a href="#what-you-can-do">Study modes</a><a href="#faq">Common questions</a></div>
   <div className="footer-link-col"><span>YOUR SPACE</span><button onClick={onEnter}>Open Morrow</button><a href="#top">Back to the beginning <ArrowUp size={14}/></a></div>
  </div>
  <div className="footer-bottom"><span>© {new Date().getFullYear()} Morrow</span><span>Make room to understand.</span><span>Built for curious minds.</span></div>
 </footer>
}
