import React from 'react';
import { motion } from 'motion/react';
import { Watch, ArrowRight, Heart, Vibrate, Zap, Activity, CheckCircle2, ShieldCheck, Download } from 'lucide-react';

interface AppleWatchPageProps {
  onNavigate?: (path: string) => void;
}

export function AppleWatchPage({ onNavigate }: AppleWatchPageProps) {
  const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto text-white">
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#d8d628] mb-4">
          <Watch className="w-3.5 h-3.5" /> APPLE WATCH COMPANION &bull; TACTILE HAPTICS &bull; ZERO ADS
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 text-white leading-tight">
          Apple Watch Companion for Wim Hof Breathwork
        </h1>
        <p className="text-base sm:text-xl text-white/60 font-serif italic mb-8">
          Feel every breath pulse on your wrist while your session runs on iPhone. Tactile wrist haptics companion paired seamlessly with your iPhone.
        </p>

        <a
          href="https://apps.apple.com/us/app/luma-breathwork-meditation/id6737122722"
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="Apple Watch Page CTA Click"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#d8d628] text-black font-mono text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_50px_rgba(216,214,40,0.4)] hover:scale-105 cursor-pointer"
        >
          <Download className="w-4 h-4" /> Download Free on App Store
        </a>
      </motion.section>

      {/* Feature Showcase Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        
        {/* Card 1: Haptic Engine */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: 0 }}
          className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col gap-5"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#d8d628]/10 text-[#d8d628] flex items-center justify-center">
            <Vibrate className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Tactile Haptic Pulses</h2>
          <p className="text-sm text-white/60 font-serif italic leading-relaxed">
            Close your eyes and breathe. Custom-designed Apple Watch Taptic vibrations guide your inhale, exhale, retention hold, and recovery countdown without audio chimes.
          </p>
        </motion.div>

        {/* Card 2: Wrist Haptics Companion */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col gap-5"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#49cfff]/10 text-[#49cfff] flex items-center justify-center">
            <Watch className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Paired Wrist Companion</h2>
          <p className="text-sm text-white/60 font-serif italic leading-relaxed">
            Tactile wrist haptics companion paired with your iPhone. Feel every breath pulse on your wrist while your session runs on iPhone.
          </p>
        </motion.div>

        {/* Card 3: Apple Health Sync */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col gap-5"
        >
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Apple HealthKit Logging</h2>
          <p className="text-sm text-white/60 font-serif italic leading-relaxed">
            Automatically logs your Mindful Minutes directly into Apple Health, monitoring active heart rate and recovery metrics during retention.
          </p>
        </motion.div>

      </section>

      {/* Visual Showcase */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        className="p-8 sm:p-14 rounded-3xl bg-white/[0.02] border border-white/10 mb-20 flex flex-col md:flex-row items-center justify-between gap-10"
      >
        <div className="max-w-xl">
          <span className="text-[#d8d628] font-mono text-xs tracking-widest uppercase mb-2 block">
            WATCHOS EXPERIENCE
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Designed specifically for Apple Watch.
          </h2>
          <p className="text-base text-white/60 font-serif italic leading-relaxed mb-6">
            Unlike other breathwork apps that treat Apple Watch as an afterthought, Luma delivers a seamless companion experience built in native SwiftUI with a high-contrast dark OLED UI and rapid tap triggers.
          </p>
          <ul className="space-y-3 font-mono text-xs text-white/80">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#d8d628]" /> Synchronized companion timer with 20/30/40 breaths
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#d8d628]" /> Retention hold stopwatch with wrist tap trigger
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#d8d628]" /> 100% free with zero in-app purchases or subscriptions
            </li>
          </ul>
        </div>

        <div className="w-64 sm:w-72 drop-shadow-2xl">
          <img 
            src={asset('screenshots/watch-screen.webp')} 
            alt="Luma Apple Watch companion Wim Hof breathing app screenshot" 
            className="w-full h-auto rounded-[2.5rem] border-4 border-white/15" 
          />
        </div>
      </motion.section>

      {/* CTA Bar */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        className="text-center py-12 border-t border-white/10"
      >
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Ready to breathe without distractions?</h2>
        <p className="text-white/60 font-serif italic mb-8 max-w-xl mx-auto">
          Download Luma for iOS and Apple Watch today. Free forever.
        </p>
        <a
          href="https://apps.apple.com/us/app/luma-breathwork-meditation/id6737122722"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#d8d628] transition-all shadow-xl"
        >
          <span>Get Luma on the App Store</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </motion.section>

    </div>
  );
}

export default AppleWatchPage;
