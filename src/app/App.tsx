import { useEffect, useRef, useState } from 'react'
import { AppHeader, type WorkspacePage } from '../components/app/AppHeader'
import { HomePage } from '../pages/marketing/HomePage'
import { OverviewPage } from '../pages/app/OverviewPage'
import { StudyPage } from '../pages/app/StudyPage'
import { MaterialsPage } from '../pages/app/MaterialsPage'
import { ProgressPage } from '../pages/app/ProgressPage'
import { PlanPage } from '../pages/app/PlanPage'
import { SettingsPage } from '../pages/app/SettingsPage'
import { useLearningStore } from '../store/useLearningStore'

export default function App() {
  const [inWorkspace, setInWorkspace] = useState(false)
  const [page, setPage] = useState<WorkspacePage>('overview')
  const setActiveTopic = useLearningStore((s) => s.setActiveTopic)
  const mainRef = useRef<HTMLElement>(null)

  /* Each workspace page starts at the top, with focus moved to the content. */
  useEffect(() => {
    if (!inWorkspace) return
    window.scrollTo({ top: 0 })
    mainRef.current?.focus({ preventScroll: true })
  }, [page, inWorkspace])

  const openStudy = (id: number) => {
    setActiveTopic(id)
    setPage('study')
    setInWorkspace(true)
  }

  if (!inWorkspace) {
    return (
      <HomePage
        onEnter={() => {
          setPage('overview')
          setInWorkspace(true)
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-ground text-ink">
      <a href="#workspace-main" className="skip-link">
        Skip to content
      </a>
      <AppHeader page={page} onNavigate={setPage} onExit={() => setInWorkspace(false)} />
      <main id="workspace-main" ref={mainRef} tabIndex={-1} className="focus:outline-none">
        {page === 'overview' && <OverviewPage onNavigate={setPage} onStudy={openStudy} />}
        {page === 'study' && <StudyPage onBack={() => setPage('overview')} />}
        {page === 'materials' && <MaterialsPage />}
        {page === 'progress' && <ProgressPage onStudy={openStudy} />}
        {page === 'plan' && <PlanPage />}
        {page === 'settings' && <SettingsPage />}
      </main>
      <footer className="border-t border-line px-5 py-8 text-center text-xs text-muted">
        Morrow
      </footer>
    </div>
  )
}
