import { BookOpen, CircleHelp, Compass, PencilLine, RotateCcw } from 'lucide-react'
import { MarketingNav } from '../../components/marketing/MarketingNav'
import { HeroArtwork } from '../../components/marketing/HeroArtwork'
import { MarketingFooter } from '../../components/marketing/MarketingFooter'
import { FaqSection } from '../../components/marketing/FaqSection'

const sampleSpaces = [
  { name: 'Understanding JavaScript', progress: 42 },
  { name: 'The psychology of habits', progress: 26 },
  { name: 'Visual composition', progress: 18 },
]

const steps = [
  { title: 'Start a learning space', text: 'Name the topic you want to learn. Each topic gets its own space.' },
  { title: 'Ask in the study room', text: 'Type a question or describe what you already understand.' },
  { title: 'Change how you study', text: 'Switch between explaining, practice, quizzes, review and exploring.' },
  { title: 'Come back to it', text: 'Your progress and plan are saved, so the next session starts where you stopped.' },
]

const modes = [
  { name: 'Explain', text: 'Breaks an idea into smaller parts.', icon: BookOpen, tone: 'bg-surface' },
  { name: 'Practice', text: 'Gives you an example to work through.', icon: PencilLine, tone: 'bg-yellow' },
  { name: 'Quiz', text: 'Asks you questions from memory.', icon: CircleHelp, tone: 'bg-coral' },
  { name: 'Review', text: 'Goes back over what you covered.', icon: RotateCcw, tone: 'bg-lilac' },
  { name: 'Explore', text: 'Follows related questions.', icon: Compass, tone: 'bg-green' },
]

export function HomePage({ onEnter }: { onEnter: () => void }) {
  return (
    <div id="top" className="bg-ground text-ink">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <MarketingNav onEnter={onEnter} />
      <main id="main">
        <section className="page grid items-center gap-12 pb-section pt-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-8 lg:pt-16">
          <div>
            <h1 className="max-w-2xl font-display text-display font-bold">
              A study companion that remembers where you stopped.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted">
              Pick a topic and ask questions. Morrow explains, sets practice and quizzes you, and keeps your progress
              so the next session starts with context.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={onEnter} className="btn btn-primary btn-lg">
                Start learning
              </button>
              <a href="#how-it-works" className="btn btn-quiet btn-lg">
                How it works
              </a>
            </div>
          </div>
          <HeroArtwork />
        </section>

        <section className="page pb-section">
          <h2 className="max-w-xl text-heading font-bold">Everything for a topic stays in one place.</h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <article className="rounded-xl bg-accent p-7 text-on-accent lg:col-span-2 lg:p-9">
              <h3 className="text-2xl font-bold">Learning spaces</h3>
              <p className="mt-2 max-w-md text-base text-on-accent-muted">
                One space per subject. The conversation, progress and materials for it stay together.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                {sampleSpaces.map((space) => (
                  <li key={space.name} className="rounded-md bg-surface p-4 text-ink">
                    <p className="min-h-12 text-sm font-semibold">{space.name}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <div aria-hidden="true" className="h-1.5 flex-1 overflow-hidden rounded-full bg-panel">
                        <div className="h-full rounded-full bg-accent" style={{ width: `${space.progress}%` }} />
                      </div>
                      <span className="text-xs font-semibold tabular-nums">{space.progress}%</span>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
            <article className="flex flex-col rounded-xl bg-yellow p-7 lg:p-9">
              <h3 className="text-2xl font-bold">Study room</h3>
              <p className="mt-2 text-base">Ask a question, or describe an idea in your own words.</p>
              <div aria-hidden="true" className="mt-6 flex flex-1 flex-col justify-end gap-2 text-sm">
                <p className="ml-auto max-w-[85%] rounded-md rounded-br-sm bg-ink px-3 py-2 text-on-night">
                  Why does a loop need an exit condition?
                </p>
                <p className="max-w-[85%] rounded-md rounded-bl-sm bg-surface px-3 py-2">
                  Let’s break it into smaller parts.
                </p>
              </div>
            </article>
            <article className="rounded-xl bg-lilac p-7 lg:p-9">
              <h3 className="text-2xl font-bold">Progress</h3>
              <p className="mt-2 text-base text-muted">A percentage and a concept count for every space.</p>
            </article>
            <article className="rounded-xl bg-green p-7 lg:p-9">
              <h3 className="text-2xl font-bold">Weekly plan</h3>
              <p className="mt-2 text-base text-muted">A few short sessions each week. Missing one changes nothing else.</p>
            </article>
            <article className="rounded-xl bg-coral-soft p-7 lg:p-9">
              <h3 className="text-2xl font-bold">Materials shelf</h3>
              <p className="mt-2 text-base text-muted">Keep useful notes and reading alongside the topics you are learning.</p>
            </article>
          </div>
        </section>

        <section id="how-it-works" className="bg-surface">
          <div className="page py-section">
            <h2 className="max-w-xl text-heading font-bold">How it works</h2>
            <ol className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map(({ title, text }, i) => (
                <li key={title} className="border-t-2 border-ink pt-5">
                  <span className="font-display text-4xl font-bold text-accent">{i + 1}</span>
                  <h3 className="mt-3 text-xl font-bold">{title}</h3>
                  <p className="mt-2 text-base text-muted">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="modes" className="surface-night bg-accent py-section text-on-accent">
          <div className="page">
            <h2 className="max-w-xl text-heading font-bold">Study the same topic five ways.</h2>
            <p className="mt-4 max-w-lg text-base text-on-accent-muted">
              Some days you need an explanation. Other days you need to test yourself.
            </p>
            <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
              {modes.map(({ name, text, icon: Icon, tone }, i) => (
                <li
                  key={name}
                  className={`flex min-h-44 flex-col justify-between rounded-lg p-5 text-ink ${tone} ${
                    i === modes.length - 1 ? 'col-span-2 md:col-span-1' : ''
                  }`}
                >
                  <Icon size={22} aria-hidden="true" />
                  <div>
                    <h3 className="text-xl font-bold">{name}</h3>
                    <p className="mt-1 text-sm">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FaqSection />

        <section className="page pb-section">
          <div className="flex flex-col gap-6 rounded-xl bg-yellow px-7 py-10 md:flex-row md:items-center md:justify-between md:px-12 md:py-14">
            <div>
              <h2 className="max-w-xl text-heading font-bold">Start your first learning space.</h2>
              <p className="mt-3 max-w-lg text-base">Pick a topic and ask the first question.</p>
            </div>
            <button onClick={onEnter} className="btn btn-ink btn-lg shrink-0 self-start md:self-auto">
              Start learning
            </button>
          </div>
        </section>
      </main>
      <MarketingFooter onEnter={onEnter} />
    </div>
  )
}
