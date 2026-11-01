import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Wordmark } from '../brand/Wordmark'

type SitePage = 'home' | 'how-it-works' | 'privacy' | 'terms'
type Props = { onEnter: () => void; onNavigate: (page: SitePage) => void; active?: SitePage }

export function MarketingNav({ onEnter, onNavigate, active = 'home' }: Props) {
  const [open, setOpen] = useState(false)
  const links: { label: string; page: SitePage }[] = [
    { label: 'How it works', page: 'how-it-works' },
    { label: 'Privacy', page: 'privacy' },
  ]
  const go = (page: SitePage) => { setOpen(false); onNavigate(page) }

  return (
    <header className="morrow-nav">
      <div className="morrow-nav-inner">
        <button type="button" aria-label="Morrow home" className="morrow-brand" onClick={() => go('home')}>
          <Wordmark /><span className="brand-note">A LITTLE MORE CURIOUS</span>
        </button>
        <nav className="morrow-nav-links" aria-label="Main navigation">
          {links.map((link) => <button key={link.page} onClick={() => go(link.page)} className={active === link.page ? 'active' : ''}>{link.label}</button>)}
        </nav>
        <button onClick={onEnter} className="nav-start">Open Morrow <ArrowUpRight size={17} /></button>
        <button className="nav-menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
      {open && <nav className="morrow-mobile-nav" aria-label="Mobile navigation">
        {links.map((link) => <button key={link.page} onClick={() => go(link.page)}>{link.label}<ArrowUpRight size={15} /></button>)}
        <button onClick={() => go('terms')}>Terms of service<ArrowUpRight size={15} /></button>
        <button onClick={onEnter}>Open your learning space<ArrowUpRight size={15} /></button>
      </nav>}
    </header>
  )
}
