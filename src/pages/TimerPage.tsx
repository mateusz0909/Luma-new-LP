import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Code2, Copy, Check, ArrowRight, BookOpen, ShieldAlert, Zap } from 'lucide-react';
import WebBreathingPacer from '../components/WebBreathingPacer';

interface TimerPageProps {
  onNavigate?: (path: string) => void;
}

export function TimerPage({ onNavigate }: TimerPageProps) {
  const [isEmbed, setIsEmbed] = useState(false);
  const [embedCopied, setEmbedCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      setIsEmbed(urlParams.get('embed') === 'true');
    }
  }, []);

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

  const embedSnippet = `<iframe src="https://luma-breath.work/timer?embed=true" width="100%" height="560" frameborder="0" style="border-radius:24px;overflow:hidden;" allow="autoplay"></iframe>\n<p style="font-size:12px;text-align:center;"><small>Powered by <a href="https://luma-breath.work/" target="_blank" rel="noopener">Luma Free Breathwork Pacer</a></small></p>`;

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(embedSnippet);
    setEmbedCopied(true);
    setTimeout(() => setEmbedCopied(false), 2500);
  };

  // If viewed inside an iframe as an embedded widget:
  if (isEmbed) {
    return (
      <div className="bg-black text-white min-h-screen p-4 flex flex-col items-center justify-center font-sans">
        <WebBreathingPacer />
        <div className="mt-4 text-center font-mono text-[11px] text-white/50">
          Powered by <a href="https://luma-breath.work" target="_blank" rel="noopener noreferrer" className="text-[#d8d628] underline">Luma Free Wim Hof Timer</a>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
      
      {/* Above-the-Fold: Main Web Breathing Pacer */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16"
      >
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-[#49cfff] font-mono text-xs tracking-widest border border-[#49cfff]/30 rounded-full px-4 py-1.5 inline-flex mb-4">
            ONLINE BREATHWORK PACER &bull; ZERO ADS &bull; 100% FREE
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Free Wim Hof Breathing Timer Online
          </h1>
          <p className="text-base sm:text-xl text-white/60 font-serif italic mt-3">
            Customizable power breathing rounds, empty-lung retention stopwatch, and 15-second recovery hold with acoustic Tibetan singing bowl audio.
          </p>
        </div>

        {/* Primary Interactive Pacer Tool */}
        <div className="my-6">
          <WebBreathingPacer />
        </div>

      {/* Keyboard Shortcuts Helper */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-white/50 mt-6 text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <Zap className="w-3.5 h-3.5 text-[#d8d628]" /> Web Audio Synthesizer Enabled
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> Never practice in water or while driving
          </span>
        </div>

        {/* SEO Explanatory Content for Top Queries */}
        <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-white/[0.02] border border-white/10 mt-12 text-left">
          <h2 className="text-2xl font-bold tracking-tight mb-4">How to Use This Free Wim Hof Timer</h2>
          <p className="text-white/70 leading-relaxed mb-6">
            This 100% free online Wim Hof method breathing timer is designed to guide your daily practice directly in your browser without requiring you to download an app or pay for expensive subscriptions. The rhythmic pacer automatically counts your power breaths and records your retention stopwatch metrics.
          </p>
          <h3 className="text-lg font-bold tracking-tight mb-3">Customizing Your Breathing Setup</h3>
          <ul className="list-disc list-inside text-white/70 space-y-2 mb-6">
            <li><strong>Power Breaths:</strong> Tap the settings gear to adjust the number of breaths per round (default is 30, but many practitioners prefer 35 or 40).</li>
            <li><strong>Retention Stopwatch:</strong> After your last exhalation, simply tap the screen or hit Spacebar to start the breath hold stopwatch. Tap again when you feel the urge to breathe.</li>
            <li><strong>Acoustic Sounds:</strong> The pacer features custom Tibetan singing bowl audio synthesized in real-time. Ensure your volume is up.</li>
          </ul>
        </div>
      </motion.section>

      {/* Instructions & Features Grid */}

      <section className="border-t border-white/10 pt-16 grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.5, delay: 0 }}
          className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col gap-4"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#d8d628]/10 border border-[#d8d628]/30 flex items-center justify-center font-bold text-[#d8d628]">
            01
          </div>
          <h2 className="text-2xl font-bold tracking-tight">30 Deep Power Breaths</h2>
          <p className="text-sm text-white/60 font-serif italic leading-relaxed">
            Follow the expanding visual sphere: inhale deeply through nose or mouth into the belly and chest, then let go passively without forcing the exhale.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col gap-4"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#49cfff]/10 border border-[#49cfff]/30 flex items-center justify-center font-bold text-[#49cfff]">
            02
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Retention Hold (Empty Lungs)</h2>
          <p className="text-sm text-white/60 font-serif italic leading-relaxed">
            After the last breath, exhale gently and hold your breath on unforced empty lungs. The stopwatch counts up your retention record without pressure.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col gap-4"
        >
          <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white">
            03
          </div>
          <h2 className="text-2xl font-bold tracking-tight">15s Recovery Inhale</h2>
          <p className="text-sm text-white/60 font-serif italic leading-relaxed">
            When you feel the urge to breathe, take one full deep breath and hold for 15 seconds to reoxygenate and reset your nervous system for the next round.
          </p>
        </motion.div>
      </section>

      {/* Embeddable Widget Generator for Biohackers & Bloggers */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.6 }}
        className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950/40 via-purple-950/20 to-black border border-white/15 mb-16"
      >
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#d8d628] mb-3">
            <Code2 className="w-3.5 h-3.5" /> FREE EMBEDDABLE WIDGET
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Embed this Wim Hof Timer on your website or blog
          </h2>
          <p className="text-base text-white/60 font-serif italic mb-6 leading-relaxed">
            Are you writing an article about breathwork, cold exposure, yoga, or biohacking? You can embed this ad-free, interactive pacer widget directly into your WordPress, Ghost, or custom website for free.
          </p>

          <div className="relative bg-black/80 border border-white/15 rounded-2xl p-4 font-mono text-xs text-white/70 overflow-x-auto mb-4">
            <code>{embedSnippet}</code>
          </div>

          <button
            onClick={copyEmbedCode}
            aria-label="Copy embed HTML snippet"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#d8d628] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-all cursor-pointer shadow-lg"
          >
            {embedCopied ? <Check className="w-4 h-4 text-green-700" /> : <Copy className="w-4 h-4" />}
            {embedCopied ? 'Embed Snippet Copied to Clipboard!' : 'Copy Embed Code (HTML)'}
          </button>
        </div>
      </motion.section>

      {/* Internal Link to Full Guide */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.6 }}
        className="text-center py-10 border-t border-white/10"
      >
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">Want to master the physiology and safety rules?</h2>
        <p className="text-white/60 font-serif italic mb-6 max-w-xl mx-auto">
          Read our in-depth step-by-step tutorial covering round pacing, hypocapnia, and clinical trials.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/guide/wim-hof-method"
            onClick={(e) => handleLinkClick(e, '/guide/wim-hof-method')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#d8d628] transition-all"
          >
            <BookOpen className="w-4 h-4" /> Read the Complete Wim Hof Guide &rarr;
          </a>
          <a
            href="/retention-times"
            onClick={(e) => handleLinkClick(e, '/retention-times')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/15 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all"
          >
            See Average Retention Times &rarr;
          </a>
        </div>
      </motion.section>

    </div>
  );
}

export default TimerPage;
