import { ArrowUpRight } from 'lucide-react'
import { Wordmark } from '../brand/Wordmark'

type SitePage = 'home' | 'how-it-works' | 'privacy' | 'terms'
type Props = { onEnter: () => void; onNavigate: (page: SitePage) => void }

export function MarketingFooter({ onEnter, onNavigate }: Props) {
  return (
    <footer className="morrow-footer">
      <div className="footer-main">
        <div className="footer-brand-col">
          <Wordmark light />
          <p>A place to follow a question, work through an idea, and keep learning at your own pace.</p>
          <button onClick={onEnter}>Go to your learning space <ArrowUpRight size={16} /></button>
        </div>
        <div className="footer-link-col">
          <span>EXPLORE</span>
          <button onClick={() => onNavigate('home')}>Home</button>
          <button onClick={() => onNavigate('how-it-works')}>How it works</button>
          <button onClick={onEnter}>Your learning space</button>
        </div>
        <div className="footer-link-col">
          <span>THE DETAILS</span>
          <button onClick={() => onNavigate('privacy')}>Privacy policy</button>
          <button onClick={() => onNavigate('terms')}>Terms of service</button>
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Morrow</span><span>Make room to understand.</span><span>Take your time. Follow the thread.</span></div>
    </footer>
  )
}
