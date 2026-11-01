import { Bell, UserRound } from 'lucide-react'

export function SettingsPage() {
  return (
    <div className="page max-w-3xl py-10 md:py-14">
      <h1 className="page-title">Settings</h1>
      <p className="mt-3 text-base text-muted">Profile and learning preferences.</p>

      <div className="mt-9 space-y-4">
        <section className="card p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-md bg-yellow-soft text-ink">
              <UserRound size={19} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg">Your profile</h2>
              <p className="text-sm text-muted">Name shown in your workspace.</p>
            </div>
          </div>
          <label htmlFor="display-name" className="field-label mt-6">
            Display name
          </label>
          <input id="display-name" defaultValue="Wuraola" autoComplete="given-name" className="field max-w-sm" />
        </section>

        <section className="card p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-md bg-accent-soft text-accent-deep">
              <Bell size={19} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg">Learning preferences</h2>
              <p className="text-sm text-muted">These controls will be connected to your learner profile.</p>
            </div>
          </div>
          <p className="mt-5 text-sm text-muted">
            Preferred explanation style, learning level, and reminder settings will live here when account profiles are
            connected.
          </p>
        </section>
      </div>
    </div>
  )
}
