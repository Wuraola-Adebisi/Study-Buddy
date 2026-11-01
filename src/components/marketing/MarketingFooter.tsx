import { Wordmark } from '../brand/Wordmark'

const explore = [
  { href: '#how-it-works', label: 'How it works' },
  { href: '#modes', label: 'Study modes' },
  { href: '#faq', label: 'FAQ' },
]

export function MarketingFooter({ onEnter }: { onEnter: () => void }) {
  return (
    <footer className="surface-night bg-night text-on-night">
      <div className="page py-14 md:py-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div className="max-w-sm">
            <Wordmark />
            <p className="mt-4 text-sm text-on-night-muted">
              Morrow is a front-end prototype. Study replies are simulated, and your spaces are saved in this browser
              only.
            </p>
            <button onClick={onEnter} className="btn btn-yellow mt-6">
              Start learning
            </button>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 md:flex-col">
              {explore.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="inline-flex min-h-11 min-w-11 items-center pr-4 text-sm transition-colors hover:text-yellow">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-12 border-t border-on-night/15 pt-6 text-xs text-on-night-muted">
          © {new Date().getFullYear()} Morrow
        </p>
      </div>
    </footer>
  )
}
