import { ArrowLeft, BookOpen, RotateCcw, Send, Sparkles } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { modeDescriptions } from '../../data/learning'
import { useLearningStore } from '../../store/useLearningStore'
import type { ChatMessage, LearningMode } from '../../types'

const modes: LearningMode[] = ['Explain', 'Practice', 'Quiz', 'Review', 'Explore']
const prompts: Record<LearningMode, string[]> = {
  Explain: ['Explain the core idea simply', 'Can you use an analogy?', 'What are the common misconceptions?'],
  Practice: ['Give me a beginner exercise', 'Walk me through an example', 'Make it a little harder'],
  Quiz: ['Start a 3-question quiz', 'Ask me a question', 'Explain why the answer is correct'],
  Review: ['Summarise the key ideas', 'What should I remember?', 'Help me recall without notes'],
  Explore: ['How does this connect to real life?', 'What should I learn next?', 'Go one level deeper'],
}

type Domain = 'code' | 'psychology' | 'design' | 'finance' | 'science' | 'general'
function domainFor(topic: { name: string; area: string }): Domain {
  const text = `${topic.name} ${topic.area}`.toLowerCase()
  if (/javascript|program|code|develop|react|html|css|algorithm/.test(text)) return 'code'
  if (/psych|habit|behavio|mind|emotion|learning/.test(text)) return 'psychology'
  if (/design|composition|visual|typograph|colour|color|layout/.test(text)) return 'design'
  if /finance|money|budget|saving|invest|econom/.test(text)) return 'finance'
  if /science|climate|biology|ecosystem|physics|chemistry/.test(text)) return 'science'
  return 'general'
}

const explain: Record<Domain, string> = {
  code: 'A useful way to understand this is to treat it as a set of instructions the browser or runtime follows. First identify the input, then the transformation, then the result. Try tracing one small example before adding complexity.',
  psychology: 'Think of this as a pattern linking a situation, your response, and what happens afterward. The context matters: the same behaviour can serve different needs in different situations. Look for the trigger and the consequence before drawing conclusions.',
  design: 'Start with what the viewer needs to notice first. Then organise the supporting elements by hierarchy, contrast, spacing, and alignment. If every element competes for attention, the composition has no clear entry point.',
  finance: 'Separate the decision into three parts: what comes in, what must go out, and what you want to set aside. A useful plan starts with actual cash flow and timing, not just totals. Then test it against an ordinary week.',
  science: 'Build the explanation from observable parts: what is interacting, what changes, and what evidence supports the relationship? A model is useful when it explains observations and helps predict what might happen next.',
  general: 'Let’s break the topic into three parts: the central idea, how its pieces relate, and where it shows up in practice. The goal is not to memorise a definition but to explain the idea in your own words and recognise it in a new example.',
}

const practice: Record<Domain, string> = {
  code: 'Try this: predict what the code will return before running it. Then change one input and explain why the output changed. What did you expect, and what happened?',
  psychology: 'Try this: describe a recent, ordinary example of the pattern. Identify the situation, the behaviour, and the result. What alternative explanation could also fit?',
  design: 'Try this: look at a page or poster you saw today. Identify its first focal point, then one choice that supports hierarchy and one that distracts from it. What would you adjust?',
  finance: 'Try this: imagine receiving income on two different dates while a bill is due in between. Map the timing, decide what to reserve first, and explain the trade-off.',
  science: 'Try this: make a prediction about what would change if one part of the system were removed or increased. State your reasoning, then identify what evidence would test it.',
  general: 'Try this: invent a real-world example, explain how the idea applies, and identify one case where it might not apply. That boundary is often where understanding gets sharper.',
}

const quiz: Record<Domain, string> = {
  code: 'Quick check: when debugging a small function, which is the strongest first step? A) Rewrite it from scratch. B) Reproduce the issue with a small input and inspect the expected vs actual result. C) Add more features. Reply A, B, or C and explain your choice.',
  psychology: 'Quick check: to understand a repeated behaviour, what is most useful to examine first? A) Label the person. B) Look at context, trigger, behaviour, and consequence. C) Assume one cause. Reply A, B, or C and explain.',
  design: 'Quick check: what most directly helps establish visual hierarchy? A) Make every element equally prominent. B) Use contrast, scale, spacing, and placement intentionally. C) Add more decorative elements. Reply A, B, or C and explain.',
  finance: 'Quick check: a budget looks balanced monthly, but a bill arrives before payday. What should you inspect? A) Only monthly totals. B) Cash-flow timing and money already committed. C) Ignore the due date. Reply A, B, or C and explain.',
  science: 'Quick check: what makes a scientific explanation stronger? A) It sounds intuitive. B) It is testable and consistent with evidence. C) It cannot be challenged. Reply A, B, or C and explain.',
  general: 'Quick check: which approach usually builds durable understanding? A) Reread until familiar. B) Retrieve the idea from memory and apply it to a new example. C) Memorise isolated words. Reply A, B, or C and explain.',
}

function responseFor(mode: LearningMode, domain: Domain, input: string, turn: number): string {
  const text = input.toLowerCase()
  if (/^(a|b|c)[.! ]*$/.test(text.trim())) {
    const correct = domain === 'code' ? 'B' : domain === 'psychology' ? 'B' : domain === 'design' ? 'B' : domain === 'finance' ? 'B' : domain === 'science' ? 'B' : 'B'
    return text.trim().startsWith(correct.toLowerCase())
      ? 'That’s the strongest choice. The important part is the reasoning behind it, not just selecting a letter. Can you explain the principle in your own words?'
      : 'Not quite. Consider which option relies on evidence, context, and a process you can actually test. Want to try again, or should I unpack each option?'
  }
  if (/example|real.?life|analogy/.test(text)) return practice[domain]
  if (/why|because|reason|correct|explain/.test(text)) return 'The reasoning is this: a good explanation connects the principle to observable details, then shows how those details lead to the outcome. Check whether each step follows, and consider what would change the conclusion.'
  if (/harder|challenge|advanced|next level/.test(text)) return `Let’s increase the difficulty. Take the central idea in **${domain === 'code' ? 'your code' : domain === 'design' ? 'a composition' : domain === 'finance' ? 'a financial decision' : domain === 'science' ? 'a system' : 'a real situation'}** and apply it where two factors interact. Explain which factor matters most and why.`
  if (/summar|key idea|remember|recall|review/.test(text)) return 'Here is a compact review: **1.** State the central principle without notes. **2.** Explain how its parts connect. **3.** Give a concrete example. **4.** Name a limitation or common misconception. If any step feels difficult, that is the best place to focus next.'
  if (/misconception|mistake|confus/.test(text)) return 'A common trap is remembering a label while missing the relationship underneath it. Another is treating a useful rule as universal. Ask: what conditions make this explanation work, and what evidence would show that it does not?'
  if (/next|related|connect|deeper/.test(text)) return 'A productive next step is to compare this idea with a neighbouring concept: what do they share, and where do their assumptions differ? The contrast often makes both easier to understand.'
  switch (mode) {
    case 'Explain': return `${explain[domain]}\n\nWhich part should we zoom in on: the definition, how it works, or a practical example?`
    case 'Practice': return practice[domain]
    case 'Quiz': return quiz[domain]
    case 'Review': return 'Let’s use active recall. Without checking notes, write one sentence explaining the main idea, one example, and one question you still have. I’ll help you examine your response.'
    case 'Explore': return 'Let’s extend the idea. Consider its relationship to a neighbouring concept, then ask what changes when the context changes. What connection are you most curious about?'
  }
}

export function StudyPage({ onBack }: { onBack: () => void }) {
  const topics = useLearningStore((s) => s.topics)
  const activeId = useLearningStore((s) => s.activeTopicId)
  const sessions = useLearningStore((s) => s.sessions)
  const saveSession = useLearningStore((s) => s.saveSession)
  const recordActivity = useLearningStore((s) => s.recordActivity)
  const topic = topics.find((t) => t.id === activeId) ?? topics[0]
  const domain = useMemo(() => domainFor(topic ?? { name: 'Learning', area: '' }), [topic])
  const saved = activeId ? sessions[activeId] : undefined
  const [mode, setMode] = useState<LearningMode>(saved?.mode ?? 'Explain')
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>(saved?.messages ?? [{
    id: 1, role: 'assistant',
    content: `Welcome to **${topic?.name ?? 'your learning space'}**. Choose a mode above, or tell me what you are trying to understand. We can work through an idea, practise it, or check what you remember.`,
  }])
  const [error, setError] = useState('')\n  const [activityTotal, setActivityTotal] = useState(saved?.activityCount ?? 0)
  const logRef = useRef<HTMLDivElement>(null)
  const activityCount = activityTotal

  useEffect(() => {
    if (!activeId) return
    saveSession(activeId, { messages, mode, activityCount })
  }, [activeId, messages, mode, activityCount, saveSession])

  useEffect(() => {
    const log = logRef.current
    if (log) log.scrollTop = log.scrollHeight
  }, [messages])

  const send = (raw: string) => {
    const content = raw.trim()
    if (!content) {
      setError('Write a question or choose a prompt to continue.')
      return
    }
    if (content.length > 1200) {
      setError('Keep your message under 1,200 characters.')
      return
    }
    setError('')
    const userMessage: ChatMessage = { id: Date.now(), role: 'user', content }
    const assistantMessage: ChatMessage = {
      id: Date.now() + 1,
      role: 'assistant',
      content: responseFor(mode, domain, content, messages.length),
    }
    setMessages((current) => [...current, userMessage, assistantMessage])
    setDraft('')
    recordActivity(activeId ?? topic?.id ?? 1, mode === 'Quiz' || mode === 'Practice' ? 1 : 0)\n    setActivityTotal((count) => count + 1)
  }

  const changeMode = (next: LearningMode) => {
    setMode(next)
    setError('')
    if (next === mode) return
    setMessages((current) => [...current, {
      id: Date.now(),
      role: 'assistant',
      content: `**${next} mode.** ${modeDescriptions[next]}. ${next === 'Quiz' ? quiz[domain] : next === 'Practice' ? practice[domain] : next === 'Explain' ? explain[domain] : next === 'Review' ? 'Let’s retrieve the main idea from memory, then revisit what needs reinforcement.' : 'Let’s connect this topic to another idea or a practical situation.'}`,
    }])
  }

  const reset = () => {
    setMessages([{
      id: Date.now(), role: 'assistant',
      content: `Let’s begin again with **${topic?.name ?? 'this topic'}**. What would you like to work on?`,
    }])
    setError('')
  }

  return (
    <div className="page py-6 md:py-10">
      <button onClick={onBack} type="button" className="link-action -ml-3 mb-4 px-3 text-muted hover:text-accent">
        <ArrowLeft size={16} aria-hidden="true" /> All learning spaces
      </button>

      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="min-w-0">
          <p className="mb-1 text-sm text-muted">{topic?.area ?? 'Your topic'}</p>
          <h1 className="page-title break-words">{topic?.name ?? 'Study room'}</h1>
        </div>
        <p className="inline-flex items-center gap-2 self-start rounded-md bg-green px-4 py-2 text-sm font-medium tabular-nums">
          <BookOpen size={16} aria-hidden="true" /> {topic?.progress ?? 0}% explored
        </p>
      </div>

      <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <section aria-label="Learning conversation" className="card flex min-w-0 flex-col overflow-hidden rounded-xl">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line px-4 py-4 sm:px-5">
            <div>
              <h2 className="text-lg">Learning conversation</h2>
              <p className="mt-0.5 text-sm text-muted">Mode: {mode}. {modeDescriptions[mode]}.</p>
            </div>
            <button type="button" onClick={reset} className="link-action min-h-9 text-xs" aria-label="Restart conversation">
              <RotateCcw size={14} /> Restart
            </button>
          </div>

          <div role="group" aria-label="Learning mode" className="flex flex-wrap gap-2 border-b border-line px-3 py-3 sm:px-4">
            {modes.map((item) => (
              <button key={item} type="button" onClick={() => changeMode(item)} aria-pressed={mode === item}
                className={`min-h-10 rounded-md px-3 sm:px-4 text-sm font-medium transition-colors ${mode === item ? 'bg-accent text-on-accent' : 'bg-panel text-muted hover:text-ink'}`}>
                {item}
              </button>
            ))}
          </div>

          <div ref={logRef} role="log" aria-live="polite" aria-relevant="additions" aria-label="Conversation"
            className="min-h-72 max-h-[min(58vh,34rem)] space-y-5 overflow-y-auto bg-ground p-4 sm:p-5 md:p-7">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : ''}`}>
                <div className={`max-w-[94%] whitespace-pre-wrap break-words rounded-lg px-4 py-3 text-sm sm:max-w-[85%] sm:px-5 sm:py-4 sm:text-base ${m.role === 'user' ? 'rounded-br-sm bg-accent text-on-accent' : 'rounded-bl-sm border border-line bg-surface text-ink'}`}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-line p-3 sm:p-4">
            <div className="mb-3 flex items-center gap-2 text-xs font-medium text-muted"><Sparkles size={14} aria-hidden="true" /> Try a prompt</div>
            <div className="mb-4 flex flex-wrap gap-2">
              {prompts[mode].map((prompt) => (
                <button key={prompt} type="button" onClick={() => send(prompt)}
                  className="min-h-9 rounded-full border border-line bg-surface px-3 text-xs text-ink transition-colors hover:border-accent hover:text-accent">
                  {prompt}
                </button>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); send(draft) }} className="flex items-end gap-2 rounded-lg border border-field bg-surface p-2 sm:gap-3 sm:p-3">
              <label htmlFor="study-draft" className="sr-only">Your message</label>
              <textarea id="study-draft" value={draft} maxLength={1200}
                onChange={(e) => { setDraft(e.target.value); if (error) setError('') }}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(draft) } }}
                rows={2} placeholder="Ask a question or share how you're thinking…"
                className="min-h-12 min-w-0 flex-1 resize-y bg-transparent py-2 text-base placeholder:text-muted focus:outline-none" />
              <button type="submit" aria-label="Send message" disabled={!draft.trim()}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-accent text-on-accent hover:bg-accent-deep">
                <Send size={18} aria-hidden="true" />
              </button>
            </form>
            {error && <p role="alert" className="mt-2 text-sm text-coral">{error}</p>}
            <p className="mt-2 text-right text-xs text-muted">{draft.length}/1,200 · Enter to send, Shift + Enter for a new line</p>
          </div>
        </section>

        <aside className="space-y-4" aria-label="Topic summary">
          <section className="surface-night rounded-xl bg-night p-5 sm:p-6 text-on-night">
            <h2 className="font-body text-sm font-medium text-on-night-muted">Your learning record</h2>
            <p className="mt-4 font-display text-4xl font-semibold tabular-nums">{topic?.progress ?? 0}%</p>
            <p className="mt-1 text-sm text-on-night-muted">Progress in this space</p>
            <div aria-hidden="true" className="mt-5 h-1.5 overflow-hidden rounded-full bg-on-night/20">
              <div className="h-full rounded-full bg-yellow transition-all" style={{ width: `${topic?.progress ?? 0}%` }} />
            </div>
            <p className="mt-6 flex items-center justify-between border-t border-on-night/15 pt-4 text-sm text-on-night-muted">
              <span>Concepts explored</span><strong className="font-semibold tabular-nums text-on-night">{topic?.concepts ?? 0}</strong>
            </p>
          </section>
          <section className="card p-5 sm:p-6">
            <h2 className="text-lg">A useful next step</h2>
            <p className="mt-2 text-sm text-muted">After an explanation, try closing your notes and describing the idea from memory. Then compare what you recalled.</p>
            <p className="mt-4 inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-deep">Retrieval practice</p>
          </section>
        </aside>
      </div>
    </div>
  )
}
