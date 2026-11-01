import { MarketingNav } from '../../components/marketing/MarketingNav'
import { MarketingFooter } from '../../components/marketing/MarketingFooter'

type SitePage = 'home' | 'how-it-works' | 'privacy' | 'terms'
type Props = { page: 'privacy' | 'terms'; onEnter: () => void; onNavigate: (page: SitePage) => void }

const privacySections = [
  { id: 'information', title: 'Information this version uses', body: 'Morrow currently stores learning-space names, subject areas, progress and related learning activity in your browser using local browser storage. This information is used to display your learning spaces and progress on the device and browser where you created them.' },
  { id: 'local-storage', title: 'Local storage and your control', body: 'This version does not require an account. The learning-space data described above is stored in your browser, not in a Morrow account or a Morrow-hosted database. Clearing your browser site data may remove it. If you use a shared device, other people with access to the same browser profile may be able to see locally stored information.' },
  { id: 'uploads', title: 'Files and learning materials', body: 'File upload and document processing are not currently active features. Do not rely on this version to store or back up your personal documents.' },
  { id: 'ai', title: 'AI and automated processing', body: 'Live AI-powered learning responses and server-side retrieval are not currently connected in this version. Some study interactions use sample or simulated content. This policy will need to be updated before any external AI provider or server-side processing is introduced.' },
  { id: 'sharing', title: 'Sharing and disclosure', body: 'Morrow does not currently provide a feature for sharing learning spaces with other users. We do not describe browser-local learning data as being synced to an account or shared across devices.' },
  { id: 'security', title: 'Security and retention', body: 'Browser-local data remains in the browser profile until it is cleared by you or by browser/device settings. Keep your device and browser profile secure, particularly if other people can access them.' },
  { id: 'changes', title: 'Changes to this policy', body: 'This policy will change as Morrow adds accounts, uploads, synchronisation or external services. The policy shown on this page should be reviewed whenever those features are introduced.' },
]

const termsSections = [
  { id: 'service', title: 'Using Morrow', body: 'Morrow is a learning companion intended to help you organise subjects, explore ideas and practise what you are learning. You may use it for lawful personal learning and educational purposes.' },
  { id: 'current-features', title: 'Current product features', body: 'Features may include learning spaces, study modes, sample learning material, progress views and planning tools. Some interactions currently use sample or simulated content. Features may change as the product develops.' },
  { id: 'your-content', title: 'Your content and responsibility', body: 'You are responsible for the material and information you choose to enter. Do not submit content that you do not have the right to use, or sensitive personal information that is not necessary for your learning.' },
  { id: 'learning', title: 'Educational information', body: 'Morrow is a learning aid, not a substitute for professional, medical, legal, financial or other expert advice. Explanations and generated or sample learning content may be incomplete or inaccurate. Check important information against reliable sources.' },
  { id: 'availability', title: 'Availability and data', body: 'The service is provided as it currently exists and may be changed, interrupted or unavailable. In this version, learning-space data is stored in your browser. Clearing browser data or changing devices may make that information unavailable.' },
  { id: 'acceptable-use', title: 'Acceptable use', body: 'Do not misuse the service, attempt to disrupt its operation, interfere with other users, introduce malicious code, or use it in a way that violates applicable law or another person’s rights.' },
  { id: 'changes', title: 'Updates to these terms', body: 'These terms may be updated as Morrow develops. Continued use after updated terms are published means you accept the revised terms, to the extent permitted by applicable law.' },
]

export function LegalPage({ page, onEnter, onNavigate }: Props) {
  const isPrivacy = page === 'privacy'
  const sections = isPrivacy ? privacySections : termsSections
  return (
    <div className="morrow-site">
      <MarketingNav active={page} onEnter={onEnter} onNavigate={onNavigate} />
      <main className="content-page">
        <section className="content-hero"><div className="content-hero-inner">
          <h1>{isPrivacy ? 'Privacy, in plain language.' : 'Terms of service.'}</h1>
          <p>{isPrivacy ? 'A straightforward explanation of what this version of Morrow stores, where it is stored, and what is not connected yet.' : 'The ground rules for using Morrow as it exists today.'}</p>
        </div></section>
        <div className="legal-layout">
          <aside className="legal-aside"><strong>On this page</strong>{sections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}</aside>
          <article className="legal-content">
            <h1>{isPrivacy ? 'Privacy policy' : 'Terms of service'}</h1>
            <p className="legal-updated">Last updated: 1 November 2026</p>
            {sections.map((section) => <section id={section.id} key={section.id}><h2>{section.title}</h2><p>{section.body}</p></section>)}
            {isPrivacy && <section id="your-choices"><h2>Your choices</h2><p>You can remove locally stored Morrow data by clearing this site's data in your browser settings. This may also remove other site preferences. Export and account synchronisation are not currently available.</p></section>}
          </article>
        </div>
      </main>
      <MarketingFooter onEnter={onEnter} onNavigate={onNavigate} />
    </div>
  )
}
