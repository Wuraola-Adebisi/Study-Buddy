import { useEffect, useRef, useState } from 'react'
import { AppHeader, type WorkspacePage } from '../components/app/AppHeader'
import { HomePage } from '../pages/marketing/HomePage'
import { OverviewPage } from '../pages/app/OverviewPage'
import { StudyPage } from '../pages/app/StudyPage'
import { MaterialsPage } from '../pages/app/MaterialsPage'
import { ProgressPage } from '../pages/app/ProgressPage'
import { PlanPage } from '../pages/app/PlanPage'
import { SettingsPage } from '../pages/app/SettingsPage'
import { PrivacyPage } from '../pages/marketing/PrivacyPage'
import { TermsPage } from '../pages/marketing/TermsPage'
import { useLearningStore } from '../store/useLearningStore'

type LegalPage = 'privacy' | 'terms' | null

function getLegalPageFromHash(): LegalPage {
  if (window.location.hash === '#privacy') return 'privacy'
  if (window.location.hash === '#terms') return 'terms'
  return null
}

export default function App() {
  const [inWorkspace, setInWorkspace] = useState(false)
  const [page, setPage] = useState<WorkspacePage>('overview')
  const [legalPage, setLegalPage] = useState<LegalPage>(getLegalPageFromHash)
  const setActiveTopic = useLearningStore((s) => s.setActiveTopic)
  const activeTopicId = useLearningStore((s) => s.activeTopicId)
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const syncLegalPage = () => setLegalPage(getLegalPageFromHash())
    window.addEventListener('popstate', syncLegalPage)
    window.addEventListener('hashchange', syncLegalPage)
    return () => {
      window.removeEventListener('popstate', syncLegalPage)
      window.removeEventListener('hashchange', syncLegalPage)
    }
  }, [])

  useEffect(() => {
    if (!inWorkspace || legalPage) return
    window.scrollTo({ top: 0 })
    mainRef.current?.focus({ preventScroll: true })
  }, [page, inWorkspace, legalPage])

  const openLegalPage = (nextPage: Exclude<LegalPage, null>) => {
    window.history.pushState({ morrowLegalPage: nextPage }, '', `#${nextPage}`)
    setLegalPage(nextPage)
    window.scrollTo({ top: 0 })
  }

  const openStudy = (id: number) => {
    setActiveTopic(id)
    setPage('study')
    setInWorkspace(true)
  }

  if (legalPage) {
    const onBack = () => {
      if (window.history.state?.morrowLegalPage) {
        window.history.back()
      } else {
        window.history.replaceState({}, '', window.location.pathname + window.location.search)
        setLegalPage(null)
      }
    }
    return legalPage === 'privacy' ? <PrivacyPage onBack={onBack} /> : <TermsPage onBack={onBack} />
  }

  if (!inWorkspace) {
    return (
      <HomePage
        onEnter={() => {
          setPage('overview')
          setInWorkspace(true)
        }}
        onPrivacy={() => openLegalPage('privacy')}
        onTerms={() => openLegalPage('terms')}
      />
    )
  }

  return (
    <div className="min-h-screen bg-ground text-ink">
      <a href="#workspace-main" className="skip-link">Skip to content</a>
      <AppHeader page={page} onNavigate={setPage} onExit={() => setInWorkspace(false)} />
      <main id="workspace-main" ref={mainRef} tabIndex={-1} className="focus:outline-none">
        {page === 'overview' && <OverviewPage onNavigate={setPage} onStudy={openStudy} />}
        {page === 'study' && <StudyPage key={activeTopicId ?? 'study'} onBack={() => setPage('overview')} />}
        {page === 'materials' && <MaterialsPage />}
        {page === 'progress' && <ProgressPage onStudy={openStudy} />}
        {page === 'plan' && <PlanPage />}
        {page === 'settings' && <SettingsPage />}
      </main>
      <footer className="border-t border-line px-5 py-8 text-center text-xs text-muted">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <span>© {new Date().getFullYear()} Morrow</span>
          <button type="button" onClick={() => openLegalPage('privacy')} className="min-h-9 hover:text-accent">Privacy policy</button>
          <button type="button" onClick={() => openLegalPage('terms')} className="min-h-9 hover:text-accent">Terms of service</button>
          <a href="mailto:hello@learnwithmorrow.com" className="inline-flex min-h-9 items-center hover:text-accent">Contact</a>
        </div>
      </footer>
    </div>
  )
}
