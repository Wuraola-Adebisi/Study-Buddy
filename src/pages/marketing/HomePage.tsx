import { ArrowRight, ArrowUpRight, BookOpen, Brain, Compass, PencilLine } from 'lucide-react'
import { MarketingNav } from '../../components/marketing/MarketingNav'
import { HeroArtwork } from '../../components/marketing/HeroArtwork'
import { MarketingFooter } from '../../components/marketing/MarketingFooter'

type SitePage = 'home' | 'how-it-works' | 'privacy' | 'terms'
type Props = { onEnter: () => void; onNavigate: (page: SitePage) => void }

const ways = [
  { title: 'Get a clearer explanation', detail: 'Untangle a concept and see how the pieces fit.', icon: BookOpen, tone: 'way-mint' },
  { title: 'Try it for yourself', detail: 'Work through an example and learn by doing.', icon: PencilLine, tone: 'way-lilac' },
  { title: 'Check what you remember', detail: 'Use a short quiz to spot what needs another look.', icon: Brain, tone: 'way-yellow' },
  { title: 'Follow a new question', detail: 'Explore a connection that takes you somewhere useful.', icon: Compass, tone: 'way-blue' },
]

export function HomePage({ onEnter, onNavigate }: Props) {
  return (
    <div id="top" className="morrow-site">
      <MarketingNav onEnter={onEnter} onNavigate={onNavigate} />
      <main>
        <section className="home-hero">
          <div className="home-hero-copy">
            <h1>Big questions.<br /><span>Room to figure them out.</span></h1>
            <p>Morrow is a learning companion for the things you want to understand. Start with a question, take the path that makes sense, and pick it up again whenever you're ready.</p>
            <div className="home-hero-actions">
              <button onClick={onEnter} className="button-primary">Start learning <ArrowUpRight size={18} /></button>
              <button onClick={() => onNavigate('how-it-works')} className="button-quiet">See how Morrow works <ArrowRight size={17} /></button>
            </div>
            <div className="home-trust-note"><span className="note-dot" /> Your curiosity sets the pace.</div>
          </div>
          <div className="home-hero-art">
            <HeroArtwork />
            <div className="hero-photo-card">
              <img src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=720&q=85" alt="Open notebook and pen on a desk" />
              <span>Make a note of what matters.</span>
            </div>
          </div>
        </section>

        <section className="home-intro">
          <div className="home-intro-photo">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1100&q=85" alt="A small group learning and sharing ideas around a table" loading="lazy" />
          </div>
          <div className="home-intro-copy">
            <h2>Learning should move with you.</h2>
            <p>Some days you want a simple explanation. Other days you want to practise, test your memory, or chase a side question. You can change direction without starting from scratch.</p>
            <button className="text-link" onClick={() => onNavigate('how-it-works')}>Get to know the approach <ArrowRight size={17} /></button>
          </div>
        </section>

        <section className="home-ways">
          <div className="home-section-heading">
            <h2>Find your way into an idea.</h2>
            <p>Choose the kind of help that fits what you need right now. You can switch approaches whenever you like.</p>
          </div>
          <div className="ways-grid">
            {ways.map(({ title, detail, icon: Icon, tone }) => (
              <button key={title} className={`way-card ${tone}`} onClick={onEnter}>
                <span className="way-icon"><Icon size={21} /></span>
                <span className="way-card-title">{title}</span>
                <span className="way-card-detail">{detail}</span>
                <span className="way-card-action">Explore in Morrow <ArrowUpRight size={16} /></span>
              </button>
            ))}
          </div>
        </section>

        <section className="home-photo-banner">
          <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=85" alt="A learner working through material on a laptop" loading="lazy" />
          <div><h2>Keep the thread.<br />Come back to it.</h2><p>Your learning spaces help you organise the subjects you're exploring and see where to continue.</p><button onClick={onEnter} className="button-light">Open your learning space <ArrowUpRight size={17} /></button></div>
        </section>

        <section className="home-final">
          <h2>What have you been<br />meaning to understand?</h2>
          <button onClick={onEnter} className="button-primary">Start with a question <ArrowUpRight size={18} /></button>
        </section>
      </main>
      <MarketingFooter onEnter={onEnter} onNavigate={onNavigate} />
    </div>
  )
}
