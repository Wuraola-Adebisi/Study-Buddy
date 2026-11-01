import { ArrowUpRight, BookOpen, Target } from 'lucide-react'
import { useLearningStore } from '../../store/useLearningStore'

type StatProps = { icon: typeof Target; label: string; value: string; tone: string }

function Stat({ icon: Icon, label, value, tone }: StatProps) {
  return (
    <div className="card p-6">
      <span className={`grid h-10 w-10 place-items-center rounded-md text-accent-deep ${tone}`}>
        <Icon size={19} aria-hidden="true" />
      </span>
      <p className="mt-5 text-sm text-muted">{label}</p>
      <strong className="mt-1 block font-display text-4xl font-semibold tabular-nums">{value}</strong>
    </div>
  )
}

export function ProgressPage({ onStudy }: { onStudy: (id: number) => void }) {
  const topics = useLearningStore((s) => s.topics)
  const avg = topics.length ? Math.round(topics.reduce((sum, t) => sum + t.progress, 0) / topics.length) : 0
  const concepts = topics.reduce((sum, t) => sum + t.concepts, 0)

  return (
    <div className="page py-10 md:py-14">
      <h1 className="page-title">Your progress</h1>
      <p className="mt-3 max-w-xl text-base text-muted">
        Starter progress is illustrative, not a measure of mastery. Concept counts record correct quiz checks.
      </p>

      <div className="my-10 grid gap-3 sm:grid-cols-3">
        <Stat icon={Target} label="Average progress" value={`${avg}%`} tone="bg-accent-soft" />
        <Stat icon={BookOpen} label="Learning spaces" value={String(topics.length)} tone="bg-yellow-soft" />
        <Stat icon={ArrowUpRight} label="Concepts explored" value={String(concepts)} tone="bg-green" />
      </div>

      <h2 className="mb-4 text-2xl">By learning space</h2>
      <ul className="space-y-3">
        {topics.map((topic) => (
          <li key={topic.id} className="card flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1">
              <p className="text-sm text-muted">{topic.area}</p>
              <h3 className="mt-1 text-xl">{topic.name}</h3>
              <p className="mt-1 text-sm text-muted">
                {topic.concepts} concepts explored. Last active {topic.updated.toLowerCase()}.
              </p>
              <div aria-hidden="true" className="mt-4 h-1.5 max-w-lg overflow-hidden rounded-full bg-panel">
                <div className="h-full rounded-full bg-accent" style={{ width: `${topic.progress}%` }} />
              </div>
            </div>
            <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end sm:gap-1">
              <strong className="font-display text-3xl font-semibold tabular-nums">{topic.progress}%</strong>
              <button onClick={() => onStudy(topic.id)} className="link-action">
                Continue <ArrowUpRight size={15} aria-hidden="true" />
                <span className="sr-only"> {topic.name}</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
