import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Wordmark } from '../brand/Wordmark'

const links = [
  { href: '#how-it-works', label: 'How it works' },
  { href: '#modes', label: 'Study modes' },
  { href: '#faq', label: 'FAQ' },
]

export function MarketingNav({ onEnter }: { onEnter: () => void }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-ground/90 backdrop-blur-md">
      <div className="page flex h-[4.5rem] items-center justify-between">
        <a href="#top" aria-label="Morrow home" className="inline-flex min-h-11 items-center">
          <Wordmark />
        </a>
        <nav aria-label="Main" className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center rounded-md px-4 text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={onEnter} className="btn btn-primary hidden md:inline-flex">
            Start learning
          </button>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-md border border-ink md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="absolute left-0 right-0 top-full grid gap-1 border-b border-line bg-ground px-5 pb-5 pt-2 shadow-card md:hidden"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center border-b border-line text-base font-medium"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setOpen(false)
              onEnter()
            }}
            className="btn btn-primary mt-3 min-h-12"
          >
            Start learning
          </button>
        </nav>
      )}
    </header>
  )
}
