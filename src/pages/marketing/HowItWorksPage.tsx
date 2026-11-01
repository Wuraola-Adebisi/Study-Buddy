import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { MarketingNav } from '../../components/marketing/MarketingNav'
import { MarketingFooter } from '../../components/marketing/MarketingFooter'

type SitePage = 'home' | 'how-it-works' | 'privacy' | 'terms'
type Props = { onEnter: () => void; onNavigate: (page: SitePage) => void }

const steps = [
  { number: '01', title: 'Bring the question', copy: 'Start with a subject, a specific question, or a goal you want to work towards. You do not need to know exactly where to begin.' },
  { number: '02', title: 'Choose how to explore it', copy: 'Ask for an explanation, practise with an example, take a quiz, review an idea, or follow a related question.' },
  { number: '03', title: 'Keep your place', copy: 'Create separate learning spaces for different subjects. Your progress stays organised so you can return to the topics you are exploring.' },
]

export function HowItWorksPage({ onEnter, onNavigate }: Props) {
  return (
    <div className="morrow-site">
      <MarketingNav active="how-it-works" onEnter={onEnter} onNavigate={onNavigate} />
      <main className="content-page">
        <section className="content-hero"><div className="content-hero-inner">
          <h1>A more flexible way<br />to learn something.</h1>
          <p>Morrow gives your curiosity a place to go. There is no fixed course to keep up with and no single right way to work through a subject.</p>
        </div></section>
        <section className="how-feature">
          <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1100&q=85" alt="Study notes and books arranged across a desk" />
          <div><h2>Begin with what you actually want to know.</h2><p>Maybe you are learning a new skill, revisiting a subject, preparing for an exam, or trying to make sense of one stubborn concept. Start there. Give the topic a name and open a learning space for it.</p><p>You can keep different interests separate, so a new question does not get lost in an old one.</p></div>
        </section>
        <section className="how-steps"><div className="how-steps-inner">
          <h2>From first question to next step.</h2>
          <div className="how-step-list">{steps.map((step) => <article className="how-step" key={step.number}><span className="how-step-number">{step.number}</span><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div>
        </div></section>
        <section className="how-feature how-feature-reverse">
          <div><h2>Change your approach when you need to.</h2><p>Learning is not always linear. Sometimes an explanation is enough. Sometimes you need to work through an example or test what you remember.</p><p>Morrow is organised around five ways to work with an idea: Explain, Practice, Quiz, Review, and Explore. Move between them as your understanding develops.</p><button onClick={onEnter} className="button-primary">Explore the learning space <ArrowUpRight size={17} /></button></div>
          <img src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1100&q=85" alt="Student working with notes and a laptop" loading="lazy" />
        </section>
        <section className="how-note"><div><h2>Ready to follow a question?</h2><p>Start with one subject. The next step can be small.</p></div><button onClick={onEnter} className="button-primary">Start learning <ArrowRight size={17} /></button></section>
      </main>
      <MarketingFooter onEnter={onEnter} onNavigate={onNavigate} />
    </div>
  )
}
