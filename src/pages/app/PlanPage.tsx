import { CalendarDays, Check, Clock3 } from 'lucide-react'
import { useLearningStore } from '../../store/useLearningStore'

export function PlanPage() {
  const sessions = useLearningStore((s) => s.plan)
  const toggle = useLearningStore((s) => s.togglePlanSession)
  const completed = sessions.filter((s) => s.done).length

  return (
    <div className="page max-w-4xl py-10 md:py-14">
      <h1 className="page-title">Study plan</h1>
      <p className="mt-3 max-w-xl text-base text-muted">A flexible rhythm for your week. Mark a session complete when you finish it.</p>
      <section aria-label="Week summary" className="surface-night mt-10 rounded-xl bg-night p-7 text-on-night md:p-10">
        <div className="flex items-center justify-between">
          <div><p className="text-sm text-on-night-muted">Sessions</p><h2 className="mt-1 text-3xl">This week</h2></div>
          <CalendarDays size={26} aria-hidden="true" className="text-yellow" />
        </div>
        <div aria-hidden="true" className="mt-8 h-2 overflow-hidden rounded-full bg-on-night/20">
          <div className="h-full rounded-full bg-yellow transition-all" style={{ width: sessions.length ? `${(completed / sessions.length) * 100}%` : '0%' }} />
        </div>
        <p className="mt-3 text-sm text-on-night-muted tabular-nums">{completed} of {sessions.length} planned sessions completed</p>
      </section>
      {sessions.length ? <ul className="mt-8 space-y-3">
        {sessions.map((item) => (
          <li key={item.id} className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
            <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${item.done ? 'bg-green text-accent-deep' : 'bg-panel text-muted'}`}>
              {item.done ? <Check size={18} aria-hidden="true" /> : <Clock3 size={18} aria-hidden="true" />}
            </span>
            <div className="min-w-0 flex-1"><p className="text-sm text-muted">{item.day}</p><h3 className="mt-0.5 text-lg">{item.title}</h3><p className="mt-0.5 text-sm text-muted">{item.detail}</p></div>
            <button type="button" onClick={() => toggle(item.id)} aria-pressed={item.done}
              className={`btn min-h-10 shrink-0 ${item.done ? 'bg-green text-accent-deep' : 'btn-quiet'}`}>
              {item.done ? 'Mark as planned' : 'Mark complete'}
            </button>
          </li>
        ))}
      </ul> : <div className="card mt-8 p-10 text-center"><h2 className="text-xl">Your week is clear</h2><p className="mt-2 text-sm text-muted">Add a study session when you are ready.</p></div>}
    </div>
  )
}
