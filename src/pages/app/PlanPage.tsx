import { CalendarDays, Check, Clock3 } from 'lucide-react'

const sessions = [
  { day: 'Monday', title: 'Revisit the habit loop', detail: '10 minutes, Review', done: true },
  { day: 'Tuesday', title: 'Practise one JavaScript concept', detail: '20 minutes, Practice', done: true },
  { day: 'Thursday', title: 'Explore a new question', detail: '15 minutes, Explore', done: false },
  { day: 'Saturday', title: 'Check what you remember', detail: '10 minutes, Quiz', done: false },
]

export function PlanPage() {
  const completed = sessions.filter((s) => s.done).length
  const nextIndex = sessions.findIndex((s) => !s.done)

  return (
    <div className="page max-w-4xl py-10 md:py-14">
      <h1 className="page-title">Study plan</h1>
      <p className="mt-3 max-w-xl text-base text-muted">
        Four short sessions this week. Skipping one does not affect the others.
      </p>

      <section aria-label="Week summary" className="surface-night mt-10 rounded-xl bg-night p-7 text-on-night md:p-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-on-night-muted">Sessions</p>
            <h2 className="mt-1 text-3xl">This week</h2>
          </div>
          <CalendarDays size={26} aria-hidden="true" className="text-yellow" />
        </div>
        <div aria-hidden="true" className="mt-8 h-2 overflow-hidden rounded-full bg-on-night/20">
          <div className="h-full rounded-full bg-yellow" style={{ width: `${(completed / sessions.length) * 100}%` }} />
        </div>
        <p className="mt-3 text-sm text-on-night-muted tabular-nums">
          {completed} of {sessions.length} planned sessions completed
        </p>
      </section>

      <ul className="mt-8 space-y-3">
        {sessions.map((item, i) => (
          <li key={item.day} className="card flex items-center gap-4 p-5">
            <span
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${
                item.done ? 'bg-green text-accent-deep' : 'bg-panel text-muted'
              }`}
            >
              {item.done ? <Check size={18} aria-hidden="true" /> : <Clock3 size={18} aria-hidden="true" />}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-muted">{item.day}</p>
              <h3 className="mt-0.5 text-lg">{item.title}</h3>
              <p className="mt-0.5 text-sm text-muted">{item.detail}</p>
            </div>
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                item.done
                  ? 'bg-accent-soft text-accent-deep'
                  : i === nextIndex
                    ? 'bg-yellow-soft text-ink'
                    : 'text-muted'
              }`}
            >
              {item.done ? 'Done' : i === nextIndex ? 'Up next' : 'Planned'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
