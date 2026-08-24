import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, BookOpen, ExternalLink, Activity, Heart, AlertOctagon, CheckCircle2, Zap, Brain, Microscope } from 'lucide-react';

interface ScienceSafetyPageProps {
  onNavigate?: (path: string) => void;
}

export function ScienceSafetyPage({ onNavigate }: ScienceSafetyPageProps) {
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
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 border-b border-white/10 pb-8"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-green-400 mb-4">
          <Microscope className="w-3.5 h-3.5" /> CLINICAL EVIDENCE &bull; BIOCHEMISTRY &bull; SAFETY
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-white leading-[1.05]">
          The Science &amp; Safety of Wim Hof Breathwork: Clinical Trials &amp; Physiology
        </h1>
        <p className="text-lg sm:text-xl text-white/70 font-serif italic mb-6">
          A peer-reviewed scientific overview of the autonomic, immune, and neurochemical mechanisms behind cyclic hyperventilation, paired with life-saving safety protocols.
        </p>

        <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-white/50 border-t border-white/5 pt-4">
          <span>Author: Luma Team</span>
          <span>&bull;</span>
          <span>Peer-Reviewed Citations Included</span>
          <span>&bull;</span>
          <span>YMYL Health Compliance</span>
        </div>
      </motion.header>

      {/* Critical Shallow Water Blackout Warning */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        className="mb-14 p-8 rounded-3xl bg-red-950/30 border-2 border-red-500/40 text-red-100 shadow-2xl"
      >
        <div className="flex items-start gap-4">
          <AlertOctagon className="w-8 h-8 text-red-400 shrink-0 mt-1" />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-red-300 uppercase tracking-tight mb-2">
              Life-or-Death Safety Rule: Never Practice in Water
            </h2>
            <p className="text-sm text-red-200/90 font-serif leading-relaxed mb-4">
              Practicing Wim Hof breathing in a swimming pool, bathtub, shower, or open water has resulted in fatal drownings worldwide due to <strong>Shallow Water Blackout (Hypoxic Syncope)</strong>.
            </p>
            <div className="p-4 rounded-xl bg-black/40 border border-red-500/20 text-xs font-mono text-red-200 space-y-1.5">
              <div><strong>How it happens:</strong> Hyperventilation blows off $CO_2$, disabling your body's urge to inhale.</div>
              <div>Oxygen continues to deplete during the hold without any discomfort or warning signs.</div>
              <div>The brain blacks out from hypoxia ($SpO_2$ &lt; 55%) before $CO_2$ rises high enough to trigger gasping. Underwater, the subconscious inhalation causes instant fatal water aspiration.</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 1: Landmark Clinical Research */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <h2 className="text-3xl font-bold tracking-tight mb-6 text-white">
          1. Landmark Clinical Studies: Radboud University &amp; Beyond
        </h2>
        <p className="text-base text-white/80 font-serif mb-6 leading-relaxed">
          For decades, medical science believed the human autonomic nervous system and innate immune response could not be consciously influenced. That paradigm was shattered by research conducted at <strong>Radboud University Medical Center (Nijmegen, Netherlands)</strong>.
        </p>

        {/* Study 1: PNAS 2014 */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 mb-6">
          <div className="flex items-center justify-between gap-4 mb-2">
            <span className="font-mono text-xs text-[#d8d628] uppercase tracking-wider font-bold">PNAS (2014) &bull; Kox et al.</span>
            <a 
              href="https://doi.org/10.1073/pnas.1322174111" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-mono text-white/50 hover:text-white flex items-center gap-1"
            >
              DOI: 10.1073/pnas.1322174111 <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            Voluntary Activation of the Sympathetic Nervous System &amp; Attenuation of Innate Immunity
          </h3>
          <p className="text-sm text-white/70 font-serif leading-relaxed mb-4">
            In this randomized controlled trial, 24 healthy volunteers were injected with bacterial endotoxin (Escherichia coli LPS). The 12 individuals trained in the Wim Hof breathing and cold exposure protocol showed:
          </p>
          <ul className="list-disc list-inside text-xs sm:text-sm text-white/80 font-mono space-y-1.5 pl-2">
            <li><strong>Dramatic Adrenaline Surge:</strong> Plasma epinephrine levels peaked higher than individuals undergoing their first bungee jump.</li>
            <li><strong>Suppression of Inflammation:</strong> Significant attenuation of pro-inflammatory cytokines ($TNF-\alpha$, $IL-6$, and $IL-8$).</li>
            <li><strong>Surge in Anti-Inflammatory Cytokines:</strong> Markedly higher levels of $IL-10$, resulting in significantly reduced fever and flu-like symptoms.</li>
          </ul>
        </div>

        {/* Study 2: NeuroImage 2018 */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 mb-6">
          <div className="flex items-center justify-between gap-4 mb-2">
            <span className="font-mono text-xs text-[#49cfff] uppercase tracking-wider font-bold">NeuroImage (2018) &bull; Muzik et al.</span>
            <a 
              href="https://doi.org/10.1016/j.neuroimage.2018.01.067" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-mono text-white/50 hover:text-white flex items-center gap-1"
            >
              DOI: 10.1016/j.neuroimage.2018.01.067 <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            "Brain Over Body": Neuroimaging the Neural Mechanisms of Autonomic Control
          </h3>
          <p className="text-sm text-white/70 font-serif leading-relaxed">
            fMRI and PET scans demonstrated that WHM practices activate the <strong>periaqueductal gray (PAG)</strong> and anterior insula—brain regions responsible for endogenous pain suppression, stress resilience, and thermo-regulation.
          </p>
        </div>
      </motion.section>

      {/* Section 2: The Biochemistry (Alkalosis, Bohr Effect, Hypoxia) */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <h2 className="text-3xl font-bold tracking-tight mb-6 text-white">
          2. The Biochemistry: Why Hands Tingle &amp; Blood Alkalinity
        </h2>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <h3 className="text-xl font-bold text-white mb-2">Why Do Your Hands and Face Tingle? (Tetany &amp; Paresthesia)</h3>
            <p className="text-sm text-white/70 font-serif leading-relaxed mb-3">
              During rapid power breathing, alveolar ventilation blows off enormous amounts of dissolved $CO_2$. In the blood, carbonic acid decreases:
            </p>
            <div className="p-3 rounded-xl bg-black/60 font-mono text-xs text-[#d8d628] text-center my-2">
              CO2 + H2O &harr; H2CO3 &harr; H+ + HCO3-
            </div>
            <p className="text-sm text-white/70 font-serif leading-relaxed">
              As hydrogen ion concentration (H+) drops, blood pH rises from normal 7.40 up to 7.60–7.75 (<strong>acute respiratory alkalosis</strong>). This causes plasma proteins (albumin) to bind more free ionized calcium (Ca2+). The temporary dip in ionized calcium hyperexcites peripheral motor and sensory nerves, generating the harmless tingling sensation in fingers, toes, and lips.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <h3 className="text-xl font-bold text-white mb-2">The Bohr Effect &amp; Oxygen Release</h3>
            <p className="text-sm text-white/70 font-serif leading-relaxed">
              Under alkaline conditions, the oxygen-hemoglobin dissociation curve shifts to the left (The Bohr Effect). Hemoglobin binds oxygen more tightly, decreasing initial tissue offloading. When you enter the retention phase, accumulating $CO_2$ gradually normalizes pH, allowing oxygen to be smoothly delivered to mitochondrial cytochrome-c oxidase precisely when cellular oxygen levels drop.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Section 3: Absolute Contraindications */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        className="mb-14 p-8 rounded-3xl bg-white/[0.02] border border-white/10"
      >
        <h2 className="text-2xl font-bold tracking-tight mb-4 text-white">
          3. Absolute Contraindications &amp; Medical Disclaimer
        </h2>
        <p className="text-sm text-white/70 font-serif mb-4 leading-relaxed">
          Because Wim Hof breathing causes acute surges in epinephrine, transient hypoxemia, and blood pressure fluctuations, it is <strong>strictly contraindicated</strong> for:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-white/80">
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20">
            &bull; Epilepsy or history of seizures
          </div>
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20">
            &bull; Pregnancy / Breastfeeding
          </div>
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20">
            &bull; Coronary artery disease or angina
          </div>
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20">
            &bull; Uncontrolled hypertension / aneurysms
          </div>
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20">
            &bull; History of stroke or transient ischemic attack
          </div>
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20">
            &bull; Severe kidney disease or chronic metabolic illness
          </div>
        </div>
      </motion.section>

      {/* Section 4: Academic Citations */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        className="mb-14 p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-xs font-mono text-white/60"
      >
        <div className="font-bold text-white uppercase tracking-wider mb-3">Academic References &amp; Clinical Citations:</div>
        <ol className="list-decimal list-inside space-y-2 leading-relaxed">
          <li>Kox M, et al. (2014). <em>Voluntary activation of the sympathetic nervous system and attenuation of the innate immune response in humans.</em> Proc Natl Acad Sci USA, 111(20):7379-7384.</li>
          <li>Zwaag J, et al. (2020). <em>The Effects of Cold Exposure Training and a Breathing Exercise on the Inflammatory Response in Humans.</em> NeuroImage, 219:117023.</li>
          <li>Muzik O, et al. (2018). <em>"Brain over body"–A study on the willful regulation of autonomic function during cold exposure.</em> NeuroImage, 172:632-641.</li>
          <li>van Middendorp H, et al. (2016). <em>The role of self-efficacy in voluntary immune modulation.</em> Psychoneuroendocrinology, 68:1-8.</li>
        </ol>
      </motion.section>

      {/* Footer */}
      <footer className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <a
          href="/timer"
          onClick={(e) => handleLinkClick(e, '/timer')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#d8d628] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-lg"
        >
          Launch Free Web Timer &rarr;
        </a>
        <div className="flex gap-4 font-mono text-xs">
          <a href="/guide/wim-hof-method" onClick={(e) => handleLinkClick(e, '/guide/wim-hof-method')} className="text-white/60 hover:text-white">
            Breathing Protocol &rarr;
          </a>
          <a href="/medical-disclaimer" onClick={(e) => handleLinkClick(e, '/medical-disclaimer')} className="text-white/60 hover:text-white">
            Medical Disclaimer &rarr;
          </a>
        </div>
      </footer>

    </article>
  );
}

export default ScienceSafetyPage;
