import { ArrowUpRight, CalendarDays, Plus, Target } from 'lucide-react'
import { useRef, useState } from 'react'
import { useLearningStore } from '../../store/useLearningStore'
import { toneFor } from '../../lib/tones'
import type { LearningTopic } from '../../types'
import type { WorkspacePage } from '../../components/app/AppHeader'

export function OverviewPage({
  onNavigate,
  onStudy,
}: {
  onNavigate: (p: WorkspacePage) => void
  onStudy: (id: number) => void
}) {
  const topics = useLearningStore((s) => s.topics)
  const activeId = useLearningStore((s) => s.activeTopicId)
  const addTopic = useLearningStore((s) => s.addTopic)
  const plan = useLearningStore((s) => s.plan)
  const completedSessions = plan.filter((session) => session.done).length
  const [name, setName] = useState('')
  const [area, setArea] = useState('Something new')
  const dialogRef = useRef<HTMLDialogElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  const lastTopic = topics.find((t) => t.id === activeId) ?? topics[0]

  const openDialog = () => {
    dialogRef.current?.showModal()
    /* Focus the field on pointer devices only, so touch keyboards do not pop up uninvited. */
    if (window.matchMedia('(pointer: fine)').matches) nameRef.current?.focus()
  }
  const closeDialog = () => dialogRef.current?.close()

  const create = () => {
    if (!name.trim()) return
    addTopic(name.trim(), area.trim() || 'Something new')
    setName('')
    setArea('Something new')
    closeDialog()
  }

  return (
    <div className="page py-10 md:py-14">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="page-title">Overview</h1>
          <p className="mt-3 text-base text-muted">Continue a topic or start a new one.</p>
        </div>
        <button onClick={openDialog} className="btn btn-primary min-h-12 self-start">
          <Plus size={17} aria-hidden="true" /> New learning space
        </button>
      </div>

      <section aria-label="Continue and plan" className="mb-14 grid gap-4 md:grid-cols-[1.4fr_.6fr]">
        <button
          onClick={() => onStudy(lastTopic?.id ?? 1)}
          className="surface-night group flex min-h-60 flex-col justify-between rounded-xl bg-night p-7 text-left text-on-night md:p-9"
        >
          <span>
            <span className="text-sm text-on-night-muted">Pick up where you left off</span>
            <span className="mt-4 block max-w-md font-display text-3xl font-bold md:text-4xl">
              {lastTopic?.name ?? 'Start a new learning space'}
            </span>
          </span>
          <span className="flex items-center justify-between">
            <span className="text-sm text-on-night-muted">Continue your last topic</span>
            <span className="grid h-11 w-11 place-items-center rounded-md bg-yellow text-ink transition-transform duration-150 group-hover:translate-x-0.5">
              <ArrowUpRight size={19} aria-hidden="true" />
            </span>
          </span>
        </button>

        <button
          onClick={() => onNavigate('plan')}
          className="flex min-h-60 flex-col justify-between rounded-xl bg-green p-7 text-left"
        >
          <span className="flex items-center justify-between">
            <span className="text-sm font-medium">This week</span>
            <CalendarDays size={20} aria-hidden="true" />
          </span>
          <span>
            <span className="block font-display text-4xl font-bold tabular-nums">{completedSessions} of {plan.length}</span>
            <span className="mt-1 block text-sm text-muted">planned sessions done</span>
          </span>
          <span className="text-sm font-semibold text-accent-deep">Open study plan</span>
        </button>
      </section>

      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Learning spaces</h2>
          <p className="mt-1 text-sm text-muted">One space for each subject you are working on.</p>
        </div>
        <button onClick={() => onNavigate('progress')} className="link-action hidden sm:inline-flex">
          See your progress
        </button>
      </div>

      <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {topics.map((topic: LearningTopic, i) => (
          <li key={topic.id}>
            <button
              onClick={() => onStudy(topic.id)}
              className="card group block h-full w-full p-6 text-left transition-colors hover:border-accent"
            >
              <span className="flex items-center justify-between">
                <span className={`rounded-full px-3 py-1 text-xs font-medium text-ink ${toneFor(i)}`}>{topic.area}</span>
                <ArrowUpRight size={18} aria-hidden="true" className="text-muted group-hover:text-accent" />
              </span>
              <span className="mt-8 block min-h-14 font-display text-xl font-semibold leading-snug">{topic.name}</span>
              <span className="mt-6 flex items-center justify-between text-sm text-muted">
                <span>{topic.concepts} concepts explored</span>
                <strong className="font-semibold tabular-nums text-ink">{topic.progress}%</strong>
              </span>
              <span aria-hidden="true" className="mt-3 block h-1.5 overflow-hidden rounded-full bg-panel">
                <span className="block h-full rounded-full bg-accent" style={{ width: `${topic.progress}%` }} />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <section className="card mt-14 flex flex-col justify-between gap-6 p-7 md:flex-row md:items-center md:px-9">
        <div className="flex items-start gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-accent-soft text-accent">
            <Target size={20} aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-xl font-bold">Practise recall</h3>
            <p className="mt-1 max-w-xl text-sm text-muted">
              Explain an idea from memory to find what you understand and what needs another look.
            </p>
          </div>
        </div>
        <button onClick={() => onStudy(lastTopic?.id ?? 1)} className="link-action self-start md:self-center">
          Practise an idea
        </button>
      </section>

      <dialog
        ref={dialogRef}
        aria-labelledby="new-space-title"
        className="m-auto w-[calc(100%-2.5rem)] max-w-md rounded-xl bg-ground p-0 text-ink shadow-float backdrop:bg-night/50"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            create()
          }}
          className="p-7"
        >
          <h2 id="new-space-title" className="text-2xl">
            Start a learning space
          </h2>
          <label htmlFor="topic-name" className="field-label mt-6">
            What do you want to learn?
          </label>
          <input
            ref={nameRef}
            id="topic-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="off"
            className="field"
            placeholder="For example, the basics of photography"
          />
          <label htmlFor="topic-area" className="field-label mt-5">
            Area
          </label>
          <input
            id="topic-area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            autoComplete="off"
            className="field"
          />
          <div className="mt-7 flex gap-3">
            <button type="submit" className="btn btn-primary min-h-12 flex-1">
              Create learning space
            </button>
            <button type="button" onClick={closeDialog} className="btn btn-quiet min-h-12">
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </div>
  )
}
