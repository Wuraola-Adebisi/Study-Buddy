/* Same drawing as public/favicon.svg, so the tab icon and the logo match. */
export function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="9" className="fill-accent" />
      <path
        d="M6 22.5V11.5M6 16.2C6 12.9 7.9 11.2 10.5 11.2C13.1 11.2 14.5 12.9 14.5 15.6V22.5M14.5 16.2C14.5 12.9 16.4 11.2 19 11.2C21.6 11.2 23 12.9 23 15.6V22.5"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-surface"
      />
      <circle cx="27" cy="22" r="1.8" className="fill-coral" />
    </svg>
  )
}

export function Wordmark({ onDark = false }: { onDark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-display text-2xl font-bold tracking-tight ${
        onDark ? 'text-on-night' : 'text-ink'
      }`}
    >
      <LogoMark />
      <span>
        morrow<span className="text-coral">.</span>
      </span>
    </span>
  )
}
