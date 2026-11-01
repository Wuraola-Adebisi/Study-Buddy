import { ArrowLeft, BookOpen, Home, Library, ListChecks, Menu, Target, X } from 'lucide-react'
import { useState } from 'react'
import { Wordmark } from '../brand/Wordmark'

export type WorkspacePage = 'overview' | 'study' | 'materials' | 'progress' | 'plan' | 'settings'

const links: { id: WorkspacePage; label: string; icon: typeof Home }[] = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'study', label: 'Study room', icon: BookOpen },
  { id: 'materials', label: 'Materials', icon: Library },
  { id: 'progress', label: 'Progress', icon: Target },
  { id: 'plan', label: 'Study plan', icon: ListChecks },
]

type Props = { page: WorkspacePage; onNavigate: (page: WorkspacePage) => void; onExit: () => void }

export function AppHeader({ page, onNavigate, onExit }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-ground/90 backdrop-blur-md">
      <div className="page flex h-[4.5rem] items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <button onClick={onExit} aria-label="Back to Morrow homepage" className="inline-flex min-h-11 items-center">
            <Wordmark />
          </button>
          <nav aria-label="Workspace" className="hidden items-center gap-1 lg:flex">
            {links.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                aria-current={page === id ? 'page' : undefined}
                className={`min-h-11 rounded-md px-4 text-sm font-medium transition-colors ${
                  page === id ? 'bg-accent-soft text-accent' : 'text-muted hover:bg-surface hover:text-ink'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onExit}
            className="hidden min-h-11 items-center gap-2 rounded-md px-3 text-sm font-medium text-muted transition-colors hover:text-accent sm:inline-flex"
          >
            <ArrowLeft size={15} aria-hidden="true" /> Website
          </button>
          <button
            onClick={() => onNavigate('settings')}
            aria-label="Open settings"
            aria-current={page === 'settings' ? 'page' : undefined}
            className="grid h-11 w-11 place-items-center rounded-full bg-yellow font-display text-base font-semibold text-ink"
          >
            W
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="grid h-11 w-11 place-items-center rounded-md border border-ink lg:hidden"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            aria-controls="workspace-menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav id="workspace-menu" aria-label="Workspace" className="grid gap-1 border-t border-line bg-ground p-3 lg:hidden">
          {links.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                onNavigate(id)
                setMenuOpen(false)
              }}
              aria-current={page === id ? 'page' : undefined}
              className={`flex min-h-12 items-center gap-3 rounded-md px-4 text-left text-base font-medium ${
                page === id ? 'bg-accent-soft text-accent' : 'text-muted'
              }`}
            >
              <Icon size={18} aria-hidden="true" />
              {label}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}
