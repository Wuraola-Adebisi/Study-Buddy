import { ArrowUpRight, BookOpen, Check, CircleHelp } from 'lucide-react'

export function HeroArtwork() {
  return (
    <div className="relative mx-auto aspect-[1.04/1] w-full max-w-[560px]">
      <div className="hero-grid absolute inset-[7%] rounded-[42%] border border-ink/10" />
      <div className="learning-orbit absolute inset-[1%] rounded-full border border-dashed border-blue/25" />
      <div className="absolute left-[8%] top-[13%] h-4 w-4 rounded-full bg-coral" />
      <div className="absolute right-[12%] top-[18%] h-3 w-3 rounded-full bg-yellow" />
      <div className="absolute bottom-[13%] left-[18%] h-3 w-3 rounded-full bg-blue" />

      <div className="absolute left-[15%] top-[22%] w-[64%] -rotate-[8deg] rounded-[22px] border border-ink/10 bg-white p-5 shadow-[0_22px_60px_rgba(25,59,54,.10)] sm:p-7">
        <div className="mb-6 flex items-center justify-between text-muted"><span className="text-[12px] font-semibold">A question to explore</span><BookOpen size={18} /></div>
        <p className="font-display text-[clamp(22px,3vw,35px)] font-semibold leading-[1.1] tracking-[-1.4px]">Why do habits become automatic?</p>
        <div className="mt-6 h-px bg-line" />
        <div className="mt-4 flex items-center justify-between"><span className="text-[12px] text-muted">Keep following the idea</span><span className="grid h-9 w-9 place-items-center rounded-full bg-blue text-white"><ArrowUpRight size={16} /></span></div>
      </div>

      <div className="absolute right-[1%] top-[47%] w-[43%] rotate-[7deg] rounded-[18px] bg-yellow p-4 shadow-[0_18px_42px_rgba(25,59,54,.12)] sm:p-5">
        <div className="mb-5 flex items-center justify-between"><span className="text-[12px] font-semibold">Try an example</span><CircleHelp size={17} /></div>
        <p className="font-display text-[17px] font-semibold leading-tight sm:text-[21px]">What makes a cue easy to notice?</p>
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/70 p-3 text-[11px]"><span className="grid h-5 w-5 place-items-center rounded-full bg-blue text-white"><Check size={11} /></span>Your turn to think</div>
      </div>

      <div className="absolute bottom-[8%] left-[5%] w-[48%] rotate-[4deg] rounded-[18px] bg-blue p-4 text-white shadow-[0_18px_42px_rgba(25,59,54,.16)] sm:p-5">
        <p className="font-display text-[22px] font-bold leading-tight sm:text-[28px]">Make sense<br />of the pieces.</p>
        <p className="mt-3 text-[12px] text-white/80">One idea at a time.</p>
      </div>
      <div className="absolute bottom-[10%] right-[8%] grid h-[54px] w-[54px] place-items-center rounded-full border border-ink/10 bg-coral text-white shadow-lg"><span className="font-display text-[22px] font-bold">?</span></div>
    </div>
  )
}
