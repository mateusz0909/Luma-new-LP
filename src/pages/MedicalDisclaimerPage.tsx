import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, ShieldAlert, HeartPulse, CheckCircle2 } from 'lucide-react';

interface MedicalDisclaimerPageProps {
  onNavigate?: (path: string) => void;
}

export function MedicalDisclaimerPage({ onNavigate }: MedicalDisclaimerPageProps) {
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400 mb-4">
          <AlertTriangle className="w-3.5 h-3.5" /> MEDICAL &amp; SAFETY POLICY
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-white">
          Medical Disclaimer &amp; Safety Guidelines
        </h1>
        <p className="text-base sm:text-lg text-white/70 font-serif italic">
          Important health disclosures regarding the Wim Hof Method, breath retention, and physiological contraindications.
        </p>
      </motion.header>

      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        className="mb-10 p-8 rounded-3xl bg-red-950/20 border-2 border-red-500/30 text-red-100"
      >
        <h2 className="text-2xl font-bold text-red-400 mb-3 uppercase tracking-wider">
          1. Never Practice In or Near Water (Shallow Water Blackout)
        </h2>
        <p className="text-sm font-serif leading-relaxed mb-4 text-red-100/90">
          The breathing exercises featured in Luma involve controlled cyclic hyperventilation, which purges carbon dioxide ($CO_2$) from your bloodstream. Because $CO_2$ is the primary chemical trigger that prompts breathing, its absence can lead to sudden loss of consciousness without warning.
        </p>
        <p className="text-xs font-mono text-red-200">
          <strong>ABSOLUTE PROHIBITION:</strong> Never practice while swimming, in a bathtub, pool, shower, freediving, or while operating a motor vehicle or heavy machinery. Always practice while seated or lying down in a safe, dry environment.
        </p>
      </motion.section>

      <section className="mb-10 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">2. General Health Disclosure</h2>
          <p className="text-sm text-white/80 font-serif leading-relaxed">
            The content, tools, timers, and guides provided by Luma (luma-breath.work) are for educational, biohacking, and mindfulness purposes only. Luma is not a medical device, nor does it provide professional medical diagnosis, treatment, or therapy.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-3">3. Absolute Contraindications</h2>
          <p className="text-sm text-white/80 font-serif leading-relaxed mb-3">
            Do NOT perform cyclic hyperventilation or extended breath holds if you have any of the following conditions:
          </p>
          <ul className="list-disc list-inside text-xs font-mono text-white/70 space-y-1.5 pl-2">
            <li>Epilepsy or a personal/family history of unprovoked seizures</li>
            <li>Pregnancy or breastfeeding</li>
            <li>Cardiovascular conditions (angina, coronary artery disease, heart arrhythmias)</li>
            <li>Uncontrolled high blood pressure (hypertension) or brain aneurysms</li>
            <li>History of stroke or transient ischemic attacks (TIA)</li>
            <li>Spontaneous pneumothorax (collapsed lung history)</li>
            <li>Kidney failure or chronic metabolic disorders</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-3">4. Physical Sensations (Tingling &amp; Lightheadedness)</h2>
          <p className="text-sm text-white/80 font-serif leading-relaxed">
            During power breathing, it is common to experience tingling in the hands, feet, and face, as well as lightheadedness. These are natural physiological responses to temporary respiratory alkalosis. If you ever feel severe dizziness or discomfort, stop the power breathing and resume normal, relaxed breathing immediately.
          </p>
        </div>
      </section>

      <footer className="pt-8 border-t border-white/10 flex items-center justify-between font-mono text-xs text-white/60">
        <a href="/timer" onClick={(e) => handleLinkClick(e, '/timer')} className="text-[#d8d628] hover:underline">
          &larr; Return to Web Timer
        </a>
        <span>Last Updated: August 2026</span>
      </footer>

    </article>
  );
}

export default MedicalDisclaimerPage;
