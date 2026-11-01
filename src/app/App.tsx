import { useState } from 'react'
import { AppHeader, type WorkspacePage } from '../components/app/AppHeader'
import { HomePage } from '../pages/marketing/HomePage'
import { HowItWorksPage } from '../pages/marketing/HowItWorksPage'
import { LegalPage } from '../pages/marketing/LegalPage'
import { OverviewPage } from '../pages/app/OverviewPage'
import { StudyPage } from '../pages/app/StudyPage'
import { MaterialsPage } from '../pages/app/MaterialsPage'
import { ProgressPage } from '../pages/app/ProgressPage'
import { PlanPage } from '../pages/app/PlanPage'
import { SettingsPage } from '../pages/app/SettingsPage'
import { useLearningStore } from '../store/useLearningStore'

type SitePage = 'home' | 'how-it-works' | 'privacy' | 'terms'

export default function App() {
  const [sitePage, setSitePage] = useState<SitePage>('home')
  const [inWorkspace, setInWorkspace] = useState(false)
  const [page, setPage] = useState<WorkspacePage>('overview')
  const setActiveTopic = useLearningStore((state) => state.setActiveTopic)

  const openStudy = (id: number) => {
    setActiveTopic(id)
    setPage('study')
    setInWorkspace(true)
  }
  const enterWorkspace = () => {
    setPage('overview')
    setInWorkspace(true)
  }
  const navigateSite = (next: SitePage) => {
    setSitePage(next)
    setInWorkspace(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (inWorkspace) {
    return (
      <div className="workspace-shell">
        <AppHeader page={page} onNavigate={setPage} onExit={() => { setInWorkspace(false); setSitePage('home') }} />
        {page === 'overview' && <OverviewPage onNavigate={setPage} onStudy={openStudy} />}
        {page === 'study' && <StudyPage onBack={() => setPage('overview')} />}
        {page === 'materials' && <MaterialsPage />}
        {page === 'progress' && <ProgressPage onStudy={openStudy} />}
        {page === 'plan' && <PlanPage />}
        {page === 'settings' && <SettingsPage />}
        <footer className="workspace-footer">Morrow <span>·</span> Make room to understand.</footer>
      </div>
    )
  }

  if (sitePage === 'how-it-works') return <HowItWorksPage onEnter={enterWorkspace} onNavigate={navigateSite} />
  if (sitePage === 'privacy' || sitePage === 'terms') return <LegalPage page={sitePage} onEnter={enterWorkspace} onNavigate={navigateSite} />
  return <HomePage onEnter={enterWorkspace} onNavigate={navigateSite} />
}
