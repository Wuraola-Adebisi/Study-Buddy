import {ArrowDown,ArrowRight,ArrowUpRight,BookOpen,Brain,Check,Compass,FileText,MessageCircleQuestion,PencilLine} from 'lucide-react'
import {MarketingNav} from '../../components/marketing/MarketingNav'
import {HeroArtwork} from '../../components/marketing/HeroArtwork'
import {MarketingFooter} from '../../components/marketing/MarketingFooter'
import {FaqSection} from '../../components/marketing/FaqSection'

const steps=[
  {number:'01',title:'Start with what you wonder about',copy:'A subject you have been meaning to understand. A question you cannot quite answer. A skill you want to build.',icon:MessageCircleQuestion},
  {number:'02',title:'Find a way into the idea',copy:'Work through an explanation, test an example, or explore a connection. Change your approach when you need to.',icon:Brain},
  {number:'03',title:'Make the knowledge yours',copy:'Return to a topic, check what you remember, and keep a record of the ground you have covered.',icon:Check}
]
const modes=[
  {name:'Explain',copy:'Get a concept into focus.',icon:BookOpen,tone:'mode-paper'},
  {name:'Practice',copy:'Try it before you feel ready.',icon:PencilLine,tone:'mode-yellow'},
  {name:'Quiz',copy:'Find out what stayed with you.',icon:Check,tone:'mode-coral'},
  {name:'Review',copy:'Give difficult ideas another pass.',icon:FileText,tone:'mode-lilac'},
  {name:'Explore',copy:'Follow the interesting detour.',icon:Compass,tone:'mode-blue'}
]
export function HomePage({onEnter}:{onEnter:()=>void}){
 return <div id="top" className="morrow-site overflow-hidden bg-paper text-ink">
  <MarketingNav onEnter={onEnter}/>
  <main>
   <section className="morrow-hero">
    <div className="morrow-hero-inner">
     <div className="morrow-hero-copy">
      <p className="hero-index"><span/> A learning companion for curious people</p>
      <h1>Learning isn't<br/><em>a straight line.</em></h1>
      <p className="hero-description">Some ideas need explaining. Some need practising. Some need you to come back tomorrow. Make space for all of it.</p>
      <div className="hero-actions"><button onClick={onEnter} className="site-button site-button-yellow">Open your learning space <ArrowUpRight size={17}/></button><a href="#the-process" className="hero-text-link">See how it works <ArrowDown size={15}/></a></div>
      <div className="hero-footnote"><span>ASK</span><i/><span>UNDERSTAND</span><i/><span>RETURN</span></div>
     </div>
     <div className="morrow-hero-art"><HeroArtwork/><p className="art-caption">One question can lead somewhere unexpected.</p></div>
    </div>
   </section>

   <section className="morrow-intro-strip" aria-label="Product summary">
    <p>Not another course catalogue.</p><span>Not a one-off answer.</span><strong>A place to keep thinking.</strong>
   </section>

   <section id="the-process" className="process-section">
    <div className="section-rail"><span>THE PROCESS</span><span>01 — 03</span></div>
    <div className="process-layout">
     <div className="process-heading"><p className="section-kicker">Curiosity, with somewhere to go</p><h2>Start anywhere.<br/><em>Build from there.</em></h2><p>Learning rarely follows a neat sequence. Morrow gives you a few useful ways to work through an idea, without forcing you into a fixed path.</p></div>
     <div className="process-steps">{steps.map(({number,title,copy,icon:Icon})=><article key={number} className="process-step"><span className="step-number">{number}</span><div className="step-copy"><h3>{title}</h3><p>{copy}</p></div><Icon className="step-icon" size={23}/></article>)}</div>
    </div>
   </section>

   <section id="what-you-can-do" className="modes-section">
    <div className="modes-heading"><div><p className="section-kicker">Five ways to work through a subject</p><h2>Different days call<br/>for different approaches.</h2></div><p>You do not have to learn in one mode. Move between them as the subject, and your understanding, changes.</p></div>
    <div className="mode-list">{modes.map(({name,copy,icon:Icon,tone},i)=><article key={name} className={`mode-item ${tone}`}><div className="mode-top"><span>0{i+1}</span><Icon size={20}/></div><h3>{name}</h3><p>{copy}</p><ArrowUpRight className="mode-arrow" size={18}/></article>)}</div>
   </section>

   <section className="materials-section">
    <div className="materials-visual"><div className="material-sheet sheet-back"><span>READING NOTES</span><i/><i/><i/><i/></div><div className="material-sheet sheet-front"><span>YOUR TOPIC</span><strong>Connect the<br/>pieces.</strong><small>Notes · Questions · Ideas</small></div><span className="material-stamp">KEEP<br/>THE<br/>THREAD</span></div>
    <div className="materials-copy"><p className="section-kicker">A space that stays organised</p><h2>Keep the thread.<br/><em>Not just the answer.</em></h2><p>Bring your subjects together, keep track of what you have explored, and make it easier to decide where to pick things up next.</p><ul><li><Check size={16}/> Separate spaces for the things you are learning</li><li><Check size={16}/> A visible record of topic progress</li><li><Check size={16}/> A study plan that leaves room for real life</li></ul><button onClick={onEnter} className="site-button site-button-ink">Explore your learning space <ArrowRight size={16}/></button></div>
   </section>

   <FaqSection/>

   <section className="morrow-last-call"><div><p className="section-kicker">Make a little room for it</p><h2>What have you been<br/><em>wondering about?</em></h2></div><button onClick={onEnter} className="site-button site-button-yellow">Start with a question <ArrowUpRight size={17}/></button><span className="last-call-mark">?</span></section>
  </main>
  <MarketingFooter onEnter={onEnter}/>
 </div>
}
