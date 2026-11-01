/* The app mark and browser icon share the same open-book and sunrise motif. */
export function LogoMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="morrow-mark-bg" x1="7" y1="4" x2="57" y2="62" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3456D1" />
          <stop offset="1" stopColor="#202F91" />
        </linearGradient>
        <linearGradient id="morrow-mark-pages" x1="14" y1="28" x2="50" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#DCD7F7" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="18" fill="url(#morrow-mark-bg)" />
      <path d="M32 23.5c-5.4-5.1-11.2-7.3-18-6.6v25.8c6.9-.7 12.7 1.5 18 6.6V23.5Z" fill="url(#morrow-mark-pages)" />
      <path d="M32 23.5c5.4-5.1 11.2-7.3 18-6.6v25.8c-6.9-.7-12.7 1.5-18 6.6V23.5Z" fill="#FFFFFF" />
      <path d="M32 25.4c-5.1-4.1-10.5-5.9-16.7-5.4v17.2c6.2-.5 11.6 1.3 16.7 5.4V25.4Z" fill="#B9B0F5" />
      <path d="M32 25.4c5.1-4.1 10.5-5.9 16.7-5.4v17.2c-6.2-.5-11.6 1.3-16.7 5.4V25.4Z" fill="#DCD7F7" />
      <path d="M32 49.3V24.2" stroke="#3456D1" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M24.2 14.4a7.8 7.8 0 0 1 15.6 0" stroke="#F5CF58" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M32 5.9v3.2M21.8 9.1l2 2M42.2 9.1l-2 2" stroke="#F5CF58" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export function Wordmark() {
  return <LogoMark className="h-10 w-10" />
}
