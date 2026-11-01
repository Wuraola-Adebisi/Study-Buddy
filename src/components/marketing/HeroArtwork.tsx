import type { CSSProperties } from 'react'
import { ArrowUpRight, BookOpen, Check, CircleHelp } from 'lucide-react'

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

/* Decorative illustration of the product. Hidden from assistive technology. */
export function HeroArtwork() {
  return (
    <div aria-hidden="true" className="@container mx-auto w-full max-w-xl">
      <div className="relative flex flex-col gap-4 sm:block sm:aspect-[1.04/1]">
        <div className="paper-grid absolute inset-[7%] hidden rounded-[42%] border border-line sm:block" />
        <div className="orbit absolute inset-[1%] hidden rounded-full border border-dashed border-accent/30 sm:block" />
        <span className="absolute left-[8%] top-[10%] hidden h-3.5 w-3.5 rounded-full bg-coral sm:block" />
        <span className="absolute right-[12%] top-[16%] hidden h-2.5 w-2.5 rounded-full bg-accent sm:block" />
        <span className="absolute bottom-[12%] right-[10%] hidden h-2.5 w-2.5 rounded-full bg-yellow sm:block" />

        <div
          className="settle art-note w-11/12 -rotate-2 self-start rounded-lg border border-line bg-surface p-5 shadow-float"
          style={delay(0)}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-accent">A learning note</span>
            <BookOpen size={18} className="text-muted" />
          </div>
          <p className="mt-4 font-display text-art font-bold text-ink">Why do habits become automatic?</p>
          <p className="mt-3 flex items-center gap-2 text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Psychology, 6 min read
          </p>
          <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
            <span className="text-xs text-muted">A question worth keeping</span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-on-accent">
              <ArrowUpRight size={15} />
            </span>
          </div>
        </div>

        <div
          className="settle art-try w-10/12 rotate-1 self-end rounded-lg bg-yellow p-5 text-ink shadow-float"
          style={delay(140)}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium">Try it yourself</span>
            <CircleHelp size={17} />
          </div>
          <p className="mt-3 font-display text-art-sm font-bold">What makes a cue easy to notice?</p>
          <div className="mt-4 flex items-center gap-2 rounded-md bg-surface/70 p-2.5 text-xs">
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-on-accent">
              <Check size={12} />
            </span>
            Your turn to think
          </div>
        </div>

        <div
          className="settle art-progress w-10/12 rotate-1 self-start rounded-lg bg-accent p-5 text-on-accent shadow-float"
          style={delay(280)}
        >
          <span className="text-xs text-on-accent-muted">Your understanding</span>
          <div className="mt-3 flex items-end justify-between gap-3">
            <span className="font-display text-art-num font-bold tabular-nums">68%</span>
            <span className="mb-1 text-xs text-on-accent-muted">Habit formation</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface/25">
            <div className="h-full rounded-full bg-yellow" style={{ width: '68%' }} />
          </div>
        </div>

        <span className="art-badge hidden h-12 w-12 place-items-center rounded-full bg-coral font-display text-xl font-bold text-ink shadow-card sm:grid">
          ?
        </span>
      </div>
    </div>
  )
}
