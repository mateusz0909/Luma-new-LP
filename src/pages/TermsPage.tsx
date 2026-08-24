import React from 'react';
import { FileText } from 'lucide-react';

interface TermsPageProps {
  onNavigate?: (path: string) => void;
}

export function TermsPage({ onNavigate }: TermsPageProps) {
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

  return (
    <article className="pt-24 pb-20 px-4 sm:px-6 md:px-12 max-w-4xl mx-auto text-white leading-relaxed font-sans">
      
      <header className="mb-12 border-b border-white/10 pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/60 mb-4">
          <FileText className="w-3.5 h-3.5" /> LEGAL AGREEMENT
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-white">
          Terms of Service
        </h1>
        <p className="text-base sm:text-lg text-white/70 font-serif italic">
          Terms and conditions for using Luma web tools and iOS/watchOS applications.
        </p>
      </header>

      <section className="space-y-6 text-sm text-white/80 font-serif leading-relaxed mb-14">
        <div>
          <h2 className="text-xl font-bold text-white mb-2 font-sans">1. Acceptance of Terms</h2>
          <p>
            By accessing the Luma website (luma-breath.work) or using the Luma application on iOS or watchOS, you agree to comply with and be bound by these Terms of Service.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-2 font-sans">2. Health &amp; Liability Waiver</h2>
          <p className="mb-2">
            Breathwork practices involving cyclic hyperventilation and retention carry inherent physiological risks. By using Luma, you acknowledge that you are practicing voluntarily and at your own risk.
          </p>
          <p>
            You agree NEVER to practice breath retention while in water (pools, bathtubs, open water) or while operating motor vehicles. Luma and its creators assume zero liability for injuries, fainting, accidents, or adverse health events resulting from the practice.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-2 font-sans">3. Intellectual Property</h2>
          <p>
            Luma's software code, visual design, and acoustic Tibetan bowl audio synthesizers are the intellectual property of Mateusz Byrtus. "Wim Hof" and "Wim Hof Method" are registered trademarks of Innerfire B.V. Luma is an independent application compatible with breathwork methods and is not officially affiliated with or endorsed by Innerfire B.V.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-2 font-sans">4. Free Service</h2>
          <p>
            Luma is provided as a free service "as is", without warranties of any kind.
          </p>
        </div>
      </section>

      <footer className="pt-8 border-t border-white/10 flex items-center justify-between font-mono text-xs text-white/60">
        <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="text-[#d8d628] hover:underline">
          &larr; Return to Home
        </a>
        <span>Effective Date: August 2026</span>
      </footer>

    </article>
  );
}

export default TermsPage;
