import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, EyeOff } from 'lucide-react';

interface PrivacyPageProps {
  onNavigate?: (path: string) => void;
}

export function PrivacyPage({ onNavigate }: PrivacyPageProps) {
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
      
      <motion.header 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 border-b border-white/10 pb-8"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-xs font-mono text-green-400 mb-4">
          <ShieldCheck className="w-3.5 h-3.5" /> PRIVACY POLICY &bull; ZERO DATA COLLECTION
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-white">
          Privacy Policy
        </h1>
        <p className="text-base sm:text-lg text-white/70 font-serif italic">
          Luma is designed with strict offline-first principles. We do not collect, sell, track, or transmit your personal or health data.
        </p>
      </motion.header>

      <section className="space-y-6 text-sm text-white/80 font-serif leading-relaxed mb-14">
        <div>
          <h2 className="text-xl font-bold text-white mb-2 font-sans">1. Information We Do NOT Collect</h2>
          <p>
            Luma does not require you to create an account, enter an email address, or provide any personal information. We do not track your IP address or monitor your individual breathwork sessions.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-2 font-sans">2. Apple HealthKit Data</h2>
          <p>
            If you enable Apple Health integration on your iPhone or Apple Watch, Luma reads and writes mindful minutes and heart rate strictly within your device's local HealthKit database. This health data is never sent to external servers or third parties.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-2 font-sans">3. Analytics &amp; Cookies</h2>
          <p>
            On our web page (luma-breath.work), we utilize Umami / Vercel privacy-respecting analytics to track aggregated page visit counts without using invasive advertising cookies, personal identifiers, or cross-site fingerprinting.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-2 font-sans">4. Contact Information</h2>
          <p>
            If you have questions regarding this privacy policy, you may contact the Luma Team directly at: <code className="text-[#d8d628] font-mono">contact@luma-breath.work</code>.
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

export default PrivacyPage;
