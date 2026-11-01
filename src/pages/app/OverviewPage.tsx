import { ArrowRight, ArrowUpRight, BookOpen, Clock3, Plus, Search, X } from 'lucide-react'
import { useMemo, useState, type FormEvent } from 'react'
import { useLearningStore } from '../../store/useLearningStore'
import type { LearningTopic } from '../../types'
import type { WorkspacePage } from '../../components/app/AppHeader'

const shortcuts: { label: string; page: WorkspacePage }[] = [{ label: 'Browse your materials', page: 'materials' }, { label: 'Plan a study session', page: 'plan' }, { label: 'Review your progress', page: 'progress' }]

export function OverviewPage({ onNavigate, onStudy }: { onNavigate: (page: WorkspacePage) => void; onStudy: (id: number) => void }) {
  const topics = useLearningStore((state) => state.topics)
  const addTopic = useLearningStore((state) => state.addTopic)
  const [showCreate, setShowCreate] = useState(false)
  const [name, setName] = useState('')
  const [area, setArea] = useState('Something new')
  const [search, setSearch] = useState('')
  const filteredTopics = useMemo(() => topics.filter((topic) => `${topic.name} ${topic.area}`.toLowerCase().includes(search.toLowerCase())), [topics, search])
  const recentTopic = topics[0]

  const createSpace = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name.trim()) return
    addTopic(name.trim(), area.trim() || 'Something new')
    setName('')
    setArea('Something new')
    setShowCreate(false)
  }

  return (
    <main className="dashboard-page">
      <div className="dashboard-welcome">
        <div><h1>Where would you like to begin?</h1><p>Your learning space is ready when you are. Pick up a topic or start something new.</p></div>
        <button className="dashboard-create" onClick={() => setShowCreate(true)}><Plus size={18} /> New learning space</button>
      </div>

      <section className="dashboard-start">
        <div className="dashboard-start-copy">
          <div className="dashboard-start-icon"><BookOpen size={22} /></div>
          <div><h2>Start with a question.</h2><p>Choose a subject, ask about an idea, or tell Morrow what you want to get better at.</p></div>
          <button onClick={() => recentTopic ? onStudy(recentTopic.id) : setShowCreate(true)} className="dashboard-start-button">{recentTopic ? 'Continue learning' : 'Create your first space'} <ArrowUpRight size={17} /></button>
        </div>
        <img src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=85" alt="Notebook open with handwritten study notes" />
      </section>

      <section className="dashboard-spaces">
        <div className="dashboard-section-heading">
          <div><h2>Your learning spaces</h2><p>Keep different subjects and goals in their own place.</p></div>
          <label className="dashboard-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a learning space" aria-label="Find a learning space" /></label>
        </div>
        {filteredTopics.length ? <div className="dashboard-topic-grid">
          {filteredTopics.map((topic: LearningTopic, index: number) => (
            <article key={topic.id} className={`dashboard-topic topic-${index % 4}`}>
              <button className="dashboard-topic-open" onClick={() => onStudy(topic.id)} aria-label={`Open ${topic.name}`}>
                <span className="dashboard-topic-area">{topic.area}</span><ArrowUpRight size={18} />
                <h3>{topic.name}</h3>
                <span className="dashboard-topic-meta">{topic.concepts} ideas explored <span>{topic.progress}%</span></span>
                <span className="dashboard-progress"><span style={{ width: `${topic.progress}%` }} /></span>
                <span className="dashboard-topic-continue">Open learning space <ArrowRight size={15} /></span>
              </button>
            </article>
          ))}
        </div> : <div className="dashboard-empty"><p>{search ? 'No learning spaces match that search.' : 'Your first learning space is waiting.'}</p><button onClick={() => setShowCreate(true)}>Create a learning space <ArrowRight size={16} /></button></div>}
      </section>

      <section className="dashboard-next">
        <div className="dashboard-next-copy"><Clock3 size={19} /><div><h2>Not sure where to start?</h2><p>Choose a starting point. You can shape the session as you go.</p></div></div>
        <div className="dashboard-suggestions">{shortcuts.map((shortcut) => <button key={shortcut.page} onClick={() => onNavigate(shortcut.page)}>{shortcut.label}<ArrowUpRight size={15} /></button>)}</div>
      </section>

      {showCreate && <div className="dashboard-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowCreate(false) }}>
        <form className="dashboard-dialog" onSubmit={createSpace} aria-labelledby="create-space-title">
          <div className="dashboard-dialog-heading"><div><span className="dashboard-dialog-icon"><Plus size={19} /></span><h2 id="create-space-title">Create a learning space</h2></div><button type="button" onClick={() => setShowCreate(false)} aria-label="Close dialog"><X size={20} /></button></div>
          <p>Give this subject a name. You can change direction as you learn.</p>
          <label htmlFor="space-name">What would you like to learn?</label>
          <input id="space-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. The science of sleep" required autoComplete="off" />
          <label htmlFor="space-area">Subject or area</label>
          <input id="space-area" value={area} onChange={(event) => setArea(event.target.value)} placeholder="e.g. Science, Design, History" />
          <div className="dashboard-dialog-actions"><button type="button" className="dialog-cancel" onClick={() => setShowCreate(false)}>Cancel</button><button type="submit" className="dialog-submit">Create space <ArrowRight size={16} /></button></div>
        </form>
      </div>}
    </main>
  )
}
