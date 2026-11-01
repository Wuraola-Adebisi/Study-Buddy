import { ArrowLeft, ArrowUpRight, BookOpen, Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { modeDescriptions } from '../../data/learning'
import { useLearningStore } from '../../store/useLearningStore'
import type { ChatMessage, LearningMode } from '../../types'

const modes: LearningMode[] = ['Explain', 'Practice', 'Quiz', 'Review', 'Explore']

const responses: Record<LearningMode, string> = {
  Explain:
    'Let’s build a clear mental model first. I’ll break the idea into smaller parts, connect it to something familiar, and check whether the explanation makes sense to you.',
  Practice:
    'Let’s work through a real example. I’ll give you a situation to think about, then we can unpack your approach together.',
  Quiz: 'Quick knowledge check. Try answering from memory before looking anything up. I’ll explain the reasoning after your answer.',
  Review:
    'Let’s revisit what you have covered. Start by recalling the main idea in your own words, then we’ll identify anything that needs another pass.',
  Explore:
    'Let’s follow the question a little further. We can connect this topic to related ideas and see where the interesting edges are.',
}

export function StudyPage({ onBack }: { onBack: () => void }) {
  const topics = useLearningStore((s) => s.topics)
  const activeId = useLearningStore((s) => s.activeTopicId)
  const topic = topics.find((t) => t.id === activeId) ?? topics[0]
  const [mode, setMode] = useState<LearningMode>('Explain')
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: 'assistant',
      content: 'Let’s take this one step at a time. What part of this topic would you like to understand first?',
    },
  ])
  const logRef = useRef<HTMLDivElement>(null)

  /* Keep the newest message in view as the conversation grows. */
  useEffect(() => {
    const log = logRef.current
    if (log) log.scrollTop = log.scrollHeight
  }, [messages])

  const send = (content: string) => {
    if (!content.trim()) return
    setMessages((current) => [
      ...current,
      { id: Date.now(), role: 'user', content },
      { id: Date.now() + 1, role: 'assistant', content: responses[mode] },
    ])
    setDraft('')
  }

  return (
    <div className="page py-8 md:py-10">
      <button onClick={onBack} className="link-action -ml-3 mb-4 px-3 text-muted hover:text-accent">
        <ArrowLeft size={16} aria-hidden="true" /> All learning spaces
      </button>

      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-1 text-sm text-muted">{topic?.area ?? 'Your topic'}</p>
          <h1 className="page-title">{topic?.name ?? 'Study room'}</h1>
        </div>
        <p className="inline-flex items-center gap-2 self-start rounded-md bg-green px-4 py-2 text-sm font-medium tabular-nums">
          <BookOpen size={16} aria-hidden="true" />
          {topic?.progress ?? 0}% explored
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <section aria-label="Learning conversation" className="card flex flex-col overflow-hidden rounded-xl">
          <div className="border-b border-line px-5 py-4">
            <h2 className="text-lg">Learning conversation</h2>
            <p className="mt-0.5 text-sm text-muted">Mode: {mode}. {modeDescriptions[mode]}.</p>
          </div>

          <div role="group" aria-label="Learning mode" className="flex flex-wrap gap-2 border-b border-line px-4 py-3">
            {modes.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                aria-pressed={mode === item}
                className={`min-h-11 rounded-md px-5 text-sm font-medium transition-colors ${
                  mode === item ? 'bg-accent text-on-accent' : 'bg-panel text-muted hover:text-ink'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div
            ref={logRef}
            role="log"
            aria-live="polite"
            aria-label="Conversation"
            className="h-80 space-y-5 overflow-y-auto bg-ground p-5 md:h-96 md:p-7 lg:h-[28rem]"
          >
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : ''}`}>
                <p
                  className={`max-w-[85%] whitespace-pre-wrap rounded-lg px-5 py-4 text-base ${
                    m.role === 'user'
                      ? 'rounded-br-sm bg-accent text-on-accent'
                      : 'rounded-bl-sm border border-line bg-surface text-ink'
                  }`}
                >
                  {m.content}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-line p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4">
              <button type="button" onClick={() => send('Can you give me a real-life example?')} className="link-action">
                Give me an example <ArrowUpRight size={14} aria-hidden="true" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(draft)
              }}
              className="flex items-end gap-3 rounded-lg border border-field bg-surface p-3"
            >
              <label htmlFor="study-draft" className="sr-only">
                Your message
              </label>
              <textarea
                id="study-draft"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    send(draft)
                  }
                }}
                rows={2}
                placeholder="Ask a question or share how you're thinking about it..."
                className="min-h-12 flex-1 resize-none bg-transparent py-2 text-base placeholder:text-muted focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={!draft.trim()}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-accent text-on-accent hover:bg-accent-deep"
              >
                <Send size={18} aria-hidden="true" />
              </button>
            </form>
          </div>
        </section>

        <aside className="space-y-4" aria-label="Topic summary">
          <section className="surface-night rounded-xl bg-night p-6 text-on-night">
            <h2 className="font-body text-sm font-medium text-on-night-muted">Your learning record</h2>
            <p className="mt-4 font-display text-4xl font-semibold tabular-nums">{topic?.progress ?? 0}%</p>
            <p className="mt-1 text-sm text-on-night-muted">Progress in this space</p>
            <div aria-hidden="true" className="mt-5 h-1.5 overflow-hidden rounded-full bg-on-night/20">
              <div className="h-full rounded-full bg-yellow" style={{ width: `${topic?.progress ?? 0}%` }} />
            </div>
            <p className="mt-6 flex items-center justify-between border-t border-on-night/15 pt-4 text-sm text-on-night-muted">
              <span>Concepts explored</span>
              <strong className="font-semibold tabular-nums text-on-night">{topic?.concepts ?? 0}</strong>
            </p>
          </section>
          <section className="card p-6">
            <h2 className="text-lg">A useful next step</h2>
            <p className="mt-2 text-sm text-muted">
              After an explanation, try closing your notes and describing the idea from memory.
            </p>
            <p className="mt-4 inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-deep">
              Retrieval practice
            </p>
          </section>
        </aside>
      </div>
    </div>
  )
}
