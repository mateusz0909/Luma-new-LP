import React from 'react';
import { motion } from 'motion/react';
import { Play, ArrowRight, ShieldAlert, CheckCircle2, HeartPulse, Brain, Zap, Clock, BookOpen, AlertTriangle } from 'lucide-react';

interface GuidePageProps {
  onNavigate?: (path: string) => void;
}

export function GuidePage({ onNavigate }: GuidePageProps) {
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
    <article className="pt-24 pb-20 px-4 sm:px-6 md:px-12 max-w-4xl mx-auto text-white leading-relaxed">
      
      {/* Header & Meta */}
      <motion.header 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 border-b border-white/10 pb-8"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#d8d628] mb-4">
          <BookOpen className="w-3.5 h-3.5" /> PILLAR GUIDE &bull; TECHNIQUE &amp; PHYSIOLOGY
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-white leading-[1.05]">
          How to Do Wim Hof Breathing Method: Step-by-Step Guide
        </h1>
        <p className="text-lg sm:text-xl text-white/70 font-serif italic mb-6">
          Master the art of cyclic hyperventilation, empty-lung retention, and recovery holds. Learn the exact 5-step protocol, underlying physiology, and critical safety guidelines.
        </p>

        <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-white/50 border-t border-white/5 pt-4">
          <span>Author: Luma Team</span>
          <span>&bull;</span>
          <span>Reading Time: 8 min</span>
          <span>&bull;</span>
          <span>Evidence-Based &bull; Clinically Verified</span>
        </div>
      </motion.header>

      {/* Critical Medical Disclaimer Box */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        className="mb-12 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200"
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-sm">
            <strong className="text-amber-400 uppercase tracking-wider block mb-1">Safety First — Absolute Warning:</strong>
            Never practice Wim Hof Method breathing in or near water (bathtubs, swimming pools, open water) or while driving or standing up. The temporary drop in carbon dioxide ($CO_2$) can suppress your urge to breathe and cause sudden syncope (*Shallow Water Blackout*). Always practice while sitting or lying down on a soft, safe surface.
          </div>
        </div>
      </motion.section>

      {/* Table of Contents */}
      <motion.nav 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        aria-label="Table of Contents" 
        className="mb-14 p-6 rounded-2xl bg-white/[0.03] border border-white/10"
      >
        <div className="font-mono text-xs uppercase tracking-widest text-[#d8d628] mb-3 font-bold">
          Table of Contents
        </div>
        <ul className="flex flex-col gap-2.5 text-sm font-serif">
          <li><a href="#what-is-wim-hof" className="text-white/80 hover:text-[#d8d628] transition-colors">1. What is the Wim Hof Method?</a></li>
          <li><a href="#5-step-protocol" className="text-white/80 hover:text-[#d8d628] transition-colors">2. The 5-Step Breathing Protocol (Step-by-Step)</a></li>
          <li><a href="#physiology" className="text-white/80 hover:text-[#d8d628] transition-colors">3. What Happens in the Body? (Physiology &amp; Chemistry)</a></li>
          <li><a href="#sensations" className="text-white/80 hover:text-[#d8d628] transition-colors">4. Common Sensations: Tingling, Lightheadedness &amp; Warmth</a></li>
          <li><a href="#routine" className="text-white/80 hover:text-[#d8d628] transition-colors">5. Ideal Practice Routine &amp; Best Timing</a></li>
          <li><a href="#contraindications" className="text-white/80 hover:text-[#d8d628] transition-colors">6. Contraindications &amp; When Not to Practice</a></li>
        </ul>
      </motion.nav>

      {/* Main Content Sections */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        id="what-is-wim-hof" 
        className="mb-14"
      >
        <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">1. What is the Wim Hof Method?</h2>
        <p className="text-base text-white/80 mb-4 leading-relaxed font-serif">
          The Wim Hof Method (WHM), popularized by Dutch extreme athlete Wim Hof ("The Iceman"), is a powerful biohacking and mindfulness discipline built on three pillars: <strong>specialized cyclic breathing</strong>, <strong>cold exposure</strong>, and <strong>mindset / commitment</strong>.
        </p>
        <p className="text-base text-white/80 mb-4 leading-relaxed font-serif">
          Rooted in ancient Tibetan <em>Tummo</em> (inner fire yoga) and <em>Pranayama</em> traditions, the breathing component combines controlled cyclic hyperventilation with intermittent hypoxia (breath retention on empty lungs). Unlike gentle relaxation breathing, WHM breathing is an active, stimulating practice designed to temporarily modulate the autonomic nervous system and trigger anti-inflammatory immune responses.
        </p>
      </motion.section>

      {/* Interactive Tool CTA Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0012da]/30 to-[#d8d628]/10 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#d8d628] block mb-1">INTERACTIVE PACER</span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Practice along with the guided online timer</h3>
          <p className="text-sm text-white/60 font-serif italic mt-1">
            Customizable tempo, round counter, and Tibetan singing bowl chimes right in your browser.
          </p>
        </div>
        <a
          href="/timer"
          onClick={(e) => handleLinkClick(e, '/timer')}
          className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#d8d628] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-lg cursor-pointer"
        >
          <Play className="w-4 h-4 fill-current" /> Open Free Web Timer &rarr;
        </a>
      </motion.div>

      {/* Step by Step Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        id="5-step-protocol" 
        className="mb-14"
      >
        <h2 className="text-3xl font-bold tracking-tight mb-6 text-white">2. The 5-Step Breathing Protocol</h2>
        <p className="text-base text-white/80 mb-8 font-serif">
          A standard session consists of <strong>3 to 4 consecutive rounds</strong>. Here is the exact breakdown of how to perform each round:
        </p>

        <div className="space-y-8">
          
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-full bg-[#d8d628] text-black font-mono font-bold flex items-center justify-center text-sm">1</span>
              <h3 className="text-xl font-bold text-white">Get into a Comfortable, Safe Position</h3>
            </div>
            <p className="text-sm text-white/70 font-serif pl-11">
              Sit cross-legged on a cushion or lie flat on your back on a yoga mat or bed. Ensure your neck and spine are relaxed so your chest and diaphragm can expand without constriction. <em>Never practice while standing.</em>
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-full bg-[#d8d628] text-black font-mono font-bold flex items-center justify-center text-sm">2</span>
              <h3 className="text-xl font-bold text-white">Perform 30 to 40 Deep Power Breaths</h3>
            </div>
            <p className="text-sm text-white/70 font-serif pl-11 mb-3">
              Take a continuous, rhythmic wave of breath:
            </p>
            <ul className="list-disc list-inside text-sm text-white/70 font-serif pl-11 space-y-1.5">
              <li><strong>Inhale fully:</strong> Draw air first into the belly, then up into the chest, and finally to the head. Inhale through either the nose or mouth.</li>
              <li><strong>Let go (Exhale passively):</strong> Do not force the air out. Simply release tension and let the lungs naturally recoil to a neutral resting state.</li>
              <li><strong>Maintain rhythm:</strong> Fully in, letting go; fully in, letting go. Repeat continuously for 30 to 40 breaths without pausing at top or bottom.</li>
            </ul>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-full bg-[#49cfff] text-black font-mono font-bold flex items-center justify-center text-sm">3</span>
              <h3 className="text-xl font-bold text-white">The Retention Phase (Hold on Empty Lungs)</h3>
            </div>
            <p className="text-sm text-white/70 font-serif pl-11">
              On the final breath (breath #30 or #40), take one last deep breath in, then exhale gently to a neutral, relaxed state. <strong>Close your airway and hold your breath on unforced empty lungs.</strong> Relax your shoulders, jaw, and mind. Stay calm and observe the sensations in your body until you feel a genuine urge to breathe (air hunger).
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-full bg-[#d8d628] text-black font-mono font-bold flex items-center justify-center text-sm">4</span>
              <h3 className="text-xl font-bold text-white">The Recovery Inhale (Hold for 15 Seconds)</h3>
            </div>
            <p className="text-sm text-white/70 font-serif pl-11">
              When your body signals the need to breathe, take one full, deep breath in to maximum lung capacity. <strong>Hold this full lung breath for 15 seconds.</strong> This instantly floods your tissues and brain with fresh oxygen. After 15 seconds, exhale softly. This completes Round 1.
            </p>
          </div>

          {/* Step 5 */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-full bg-white text-black font-mono font-bold flex items-center justify-center text-sm">5</span>
              <h3 className="text-xl font-bold text-white">Repeat for 3 to 4 Rounds</h3>
            </div>
            <p className="text-sm text-white/70 font-serif pl-11">
              Without prolonged resting, immediately begin the next cycle of 30 power breaths. You will notice that in subsequent rounds (Rounds 2, 3, and 4), your empty-lung retention time naturally expands from 1 minute to 2 or even 3 minutes.
            </p>
          </div>

        </div>
      </motion.section>

      {/* Physiology Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        id="physiology" 
        className="mb-14"
      >
        <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">3. Wim Hof Breathing Explained: What Happens in the Body?</h2>
        <p className="text-base text-white/80 mb-4 font-serif leading-relaxed">
          The power of the Wim Hof Method is rooted in precise physiological biochemistry:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="font-mono text-xs uppercase tracking-wider text-[#d8d628] mb-2 font-bold">Carbon Dioxide ($CO_2$) Washout</div>
            <h4 className="text-lg font-bold mb-2">Respiratory Alkalosis</h4>
            <p className="text-xs text-white/70 font-serif leading-relaxed">
              30 rapid deep breaths "blow off" carbon dioxide ($pCO_2$ drops drastically from ~40 mmHg to &lt;20 mmHg). This temporarily raises blood pH (alkalosis), which reduces the brainstem's chemical trigger to breathe and creates the profound sensation of peace during retention.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="font-mono text-xs uppercase tracking-wider text-[#49cfff] mb-2 font-bold">Intermittent Hypoxia</div>
            <h4 className="text-lg font-bold mb-2">Cellular Adaptation</h4>
            <p className="text-xs text-white/70 font-serif leading-relaxed">
              During the 1–3 minute breath hold, blood oxygen saturation ($SpO_2$) temporarily dips below 80%. This triggers beneficial cellular signaling: upregulation of HIF-1α (hypoxia-inducible factor), release of red blood cells via spleen contraction, and mitochondrial biogenesis.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="font-mono text-xs uppercase tracking-wider text-green-400 mb-2 font-bold">Adrenaline Surge</div>
            <h4 className="text-lg font-bold mb-2">Immune Modulation</h4>
            <p className="text-xs text-white/70 font-serif leading-relaxed">
              As proven in the landmark Radboud University study (Kox et al., 2014), cyclic power breathing stimulates the adrenal medulla to release high levels of epinephrine (adrenaline), which suppresses pro-inflammatory cytokines ($TNF-\alpha, IL-6$) and increases anti-inflammatory $IL-10$.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="font-mono text-xs uppercase tracking-wider text-purple-400 mb-2 font-bold">Vagus Nerve Reset</div>
            <h4 className="text-lg font-bold mb-2">Autonomic Flexibility</h4>
            <p className="text-xs text-white/70 font-serif leading-relaxed">
              Alternating between sympathetic activation (power breathing) and profound parasympathetic dominance (relaxed retention hold) exercises autonomic tone, lowering resting heart rate and improving heart rate variability (HRV).
            </p>
          </div>
        </div>
      </motion.section>

      {/* Sensations Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        id="sensations" 
        className="mb-14"
      >
        <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">4. Common Sensations: Tingling, Lightheadedness &amp; Warmth</h2>
        <p className="text-base text-white/80 mb-4 font-serif leading-relaxed">
          During your first sessions, you will likely experience several distinct physical sensations:
        </p>
        <ul className="space-y-3 text-sm text-white/80 font-serif">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#d8d628] shrink-0 mt-1" />
            <div><strong>Tingling in fingers, feet, and face (Paresthesia):</strong> Caused by temporary vasoconstriction and decreased ionized calcium due to respiratory alkalosis. This is completely harmless and disappears within 60 seconds of resuming normal breathing.</div>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#d8d628] shrink-0 mt-1" />
            <div><strong>Lightheadedness or euphoric clarity:</strong> A natural response to changing blood gas ratios and adrenaline release.</div>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#d8d628] shrink-0 mt-1" />
            <div><strong>Internal heat or cold waves:</strong> Autonomic nervous system activation regulating peripheral blood flow.</div>
          </li>
        </ul>
      </motion.section>

      {/* Routine & Best Time Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        id="routine" 
        className="mb-14"
      >
        <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">5. Ideal Practice Routine &amp; Best Timing</h2>
        <p className="text-base text-white/80 mb-4 font-serif leading-relaxed">
          For maximum physiological benefit, practice <strong>first thing in the morning on an empty stomach</strong> before eating breakfast or drinking caffeine. Digestion diverts blood flow to the GI tract and reduces diaphragm mobility.
        </p>
        <p className="text-base text-white/80 mb-4 font-serif leading-relaxed">
          A full 3–4 round session takes approximately <strong>12 to 15 minutes</strong>. If you incorporate cold showers, always perform the breathing session <em>before</em> entering the cold water.
        </p>
      </motion.section>

      {/* Contraindications Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        id="contraindications" 
        className="mb-14 p-8 rounded-3xl bg-red-950/20 border border-red-500/30"
      >
        <h2 className="text-2xl font-bold tracking-tight mb-3 text-red-400">6. Contraindications &amp; Safety Precautions</h2>
        <p className="text-sm text-white/80 font-serif leading-relaxed mb-4">
          While Wim Hof breathing is safe for healthy adults, it causes significant acute cardiovascular and neurochemical shifts. <strong>Do NOT practice</strong> if you have:
        </p>
        <ul className="list-disc list-inside text-xs text-white/70 font-mono space-y-2 mb-4">
          <li>Epilepsy or a history of unprovoked seizures</li>
          <li>Pregnancy (effects of temporary hypoxia on fetal circulation are unstudied)</li>
          <li>Severe cardiovascular disease, aneurysm, or uncontrolled high blood pressure</li>
          <li>History of spontaneous pneumothorax (collapsed lung)</li>
          <li>Kidney failure or metabolic disorders</li>
        </ul>
        <p className="text-xs text-white/60 font-serif italic">
          Always consult your physician before undertaking intense breath retention protocols if you have pre-existing medical conditions.
        </p>
      </motion.section>

      {/* Footer Navigation Silo */}
      <footer className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <a
          href="/timer"
          onClick={(e) => handleLinkClick(e, '/timer')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#d8d628] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-lg"
        >
          Launch Online Timer &rarr;
        </a>
        <div className="flex gap-4 font-mono text-xs">
          <a href="/retention-times" onClick={(e) => handleLinkClick(e, '/retention-times')} className="text-white/60 hover:text-white">
            Retention Times &rarr;
          </a>
          <a href="/science-and-safety" onClick={(e) => handleLinkClick(e, '/science-and-safety')} className="text-white/60 hover:text-white">
            Clinical Science &rarr;
          </a>
        </div>
      </footer>

    </article>
  );
}

export default GuidePage;

