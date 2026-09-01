import React, { useState } from 'react';
import { Coffee, Heart, Check, Copy, AlertTriangle, ShieldCheck, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const logoSrc = `${import.meta.env?.BASE_URL || '/'}screenshots/logo.webp`;
  const supportUrl = "https://ko-fi.com/mateusz_b";

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith('http')) return;
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(supportUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-[#0c0c0e] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Top Safety Warning Banner (Crucial for E-E-A-T & Health YMYL) */}
        <div className="mb-14 p-5 rounded-2xl bg-white/[0.03] border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-mono text-white/80">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="leading-relaxed">
            <span className="font-bold text-amber-400 uppercase tracking-wider block sm:inline mr-2">Medical &amp; Safety Warning:</span>
            Never practice cyclic hyperventilation or breath retention in water (pools, bathtubs, open water) or while driving/operating machinery. Always practice sitting or lying down in a safe space.
            <a 
              href="/medical-disclaimer" 
              onClick={(e) => handleLinkClick(e, '/medical-disclaimer')}
              className="text-[#d8d628] underline underline-offset-2 ml-2 hover:text-white"
            >
              Read full medical disclaimer &rarr;
            </a>
          </div>
        </div>

        {/* 4-Column Structured Link Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-white/10 text-sm">
          
          {/* Column 1: Brand & Tools */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5 mb-1">
              <img src={logoSrc} alt="Luma Logo" width="28" height="28" className="w-6 h-6 object-contain" />
              <span className="font-bold text-lg tracking-tighter">LUMA.</span>
            </div>
            <p className="text-xs text-white/50 font-serif italic leading-relaxed">
              100% free, private, and distraction-free breathwork and retention timer for web, iOS, and Apple Watch.
            </p>
            <div className="mt-2 flex flex-col gap-2 font-mono text-xs text-white/70">
              <a href="/timer" onClick={(e) => handleLinkClick(e, '/timer')} className="hover:text-[#d8d628] transition-colors">
                &bull; Online Web Pacer
              </a>
              <a href="/retention-times" onClick={(e) => handleLinkClick(e, '/retention-times')} className="hover:text-[#d8d628] transition-colors">
                &bull; Retention Benchmarks
              </a>
            </div>
          </div>

          {/* Column 2: Knowledge & Guides */}
          <div className="flex flex-col gap-3">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#d8d628] mb-1">
              Knowledge Hub
            </div>
            <a href="/guide/wim-hof-method" onClick={(e) => handleLinkClick(e, '/guide/wim-hof-method')} className="text-white/70 hover:text-white transition-colors">
              How to Do Wim Hof Method
            </a>
            <a href="/science-and-safety" onClick={(e) => handleLinkClick(e, '/science-and-safety')} className="text-white/70 hover:text-white transition-colors">
              Science, Alkalosis &amp; Safety
            </a>
            <a href="/retention-times" onClick={(e) => handleLinkClick(e, '/retention-times')} className="text-white/70 hover:text-white transition-colors">
              Average Retention Times
            </a>
            <a href="/faq" onClick={(e) => handleLinkClick(e, '/faq')} className="text-white/70 hover:text-white transition-colors">
              Breathwork FAQ &amp; Guides
            </a>
          </div>

          {/* Column 3: Apps & Ecosystem */}
          <div className="flex flex-col gap-3">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#49cfff] mb-1">
              Ecosystem
            </div>
            <a href="/apple-watch" onClick={(e) => handleLinkClick(e, '/apple-watch')} className="text-white/70 hover:text-white transition-colors">
              Apple Watch Companion App
            </a>
            <a 
              href="https://apps.apple.com/us/app/luma-breathwork-meditation/id6737122722" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/70 hover:text-white transition-colors flex items-center gap-1.5"
            >
              Download for iOS <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-xs text-white/40 font-mono">
              Apple HealthKit Sync &bull; Haptics
            </span>
          </div>

          {/* Column 4: Trust, Author & Legal */}
          <div className="flex flex-col gap-3">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-white/40 mb-1">
              Trust &amp; Legal
            </div>
            <a href="/about" onClick={(e) => handleLinkClick(e, '/about')} className="text-white/70 hover:text-white transition-colors">
              About Luma &amp; Mission
            </a>
            <a href="/medical-disclaimer" onClick={(e) => handleLinkClick(e, '/medical-disclaimer')} className="text-white/70 hover:text-white transition-colors">
              Medical Disclaimer
            </a>
            <a href="/privacy" onClick={(e) => handleLinkClick(e, '/privacy')} className="text-white/70 hover:text-white transition-colors">
              Privacy Policy (No Tracking)
            </a>
            <a href="/terms" onClick={(e) => handleLinkClick(e, '/terms')} className="text-white/70 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>

        </div>

        {/* Bottom Bar with Indie Support */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-white/60">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            <span>&copy; {new Date().getFullYear()} LUMA BREATHWORK. 100% Free &amp; Ad-Free Forever.</span>
          </div>

          <button
            onClick={() => setShowModal(true)}
            data-umami-event="Support Developer Modal Opened"
            aria-label="Open developer support modal"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-[#d8d628] font-bold hover:bg-[#d8d628] hover:text-black transition-all cursor-pointer"
          >
            <Coffee className="w-4 h-4" /> Support Indie Development ☕
          </button>
        </div>

      </div>

      {/* Support Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div 
            role="dialog"
            aria-modal="true"
            aria-labelledby="support-modal-title"
            className="bg-[#121216] border border-white/15 rounded-[32px] p-8 max-w-lg w-full text-white shadow-2xl relative"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#d8d628] text-black flex items-center justify-center font-bold text-lg">
                  ☕
                </div>
                <h3 id="support-modal-title" className="text-xl font-bold tracking-tight">Support Luma Project</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                aria-label="Close support modal"
                className="text-neutral-400 hover:text-white text-lg font-bold cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-neutral-300 font-serif italic leading-relaxed mb-6">
              Luma was crafted out of frustration with $80/year subscriptions for simple breathing clocks.
              It is 100% free, private, and offline forever. If Luma enhances your daily breathwork, you can support indie development by buying a coffee.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href={supportUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="Ko-fi Outbound Click"
                aria-label="Support on Ko-fi"
                className="w-full py-4 rounded-2xl bg-[#d8d628] text-black font-bold font-mono text-sm uppercase tracking-wider text-center hover:bg-white transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Coffee className="w-4 h-4" /> Support on Ko-fi &rarr;
              </a>

              <button
                onClick={handleCopyLink}
                data-umami-event="Support Link Copied"
                aria-label={copied ? 'Support link copied to clipboard' : 'Copy support link to clipboard'}
                className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-neutral-300 font-mono text-xs uppercase tracking-wider hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Link Copied to Clipboard!' : 'Copy Support Link'}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
