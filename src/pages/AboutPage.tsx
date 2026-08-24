import React from 'react';
import { motion } from 'motion/react';
import { User, Coffee, Heart, Shield, Code, Sparkles, ExternalLink } from 'lucide-react';

interface AboutPageProps {
  onNavigate?: (path: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
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

  const buyMeACoffeeUrl = "https://buymeacoffee.com/lumabreathwork";

  return (
    <article className="pt-24 pb-20 px-4 sm:px-6 md:px-12 max-w-4xl mx-auto text-white leading-relaxed font-sans">
      
      <motion.header 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 border-b border-white/10 pb-8"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#d8d628] mb-4">
          <User className="w-3.5 h-3.5" /> INDIE DEVELOPER &bull; MISSION &bull; E-E-A-T
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-white">
          About Luma &amp; Developer Mission
        </h1>
        <p className="text-base sm:text-lg text-white/70 font-serif italic">
          Why Luma was built as a 100% free, ad-free alternative to $80/year commercial breathwork apps.
        </p>
      </motion.header>

      <section className="space-y-8 mb-14 text-sm sm:text-base font-serif text-white/80 leading-relaxed">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-3 font-sans">The Origin Story</h2>
          <p className="mb-4">
            Luma was created as an <strong>Indie Biohacking Project</strong> by the <strong>Luma Team</strong>, an independent group of developers and longtime breathwork practitioners.
          </p>
          <p className="mb-4">
            Like thousands of others practicing the Wim Hof Method daily, we became increasingly frustrated with commercial mobile apps that charge steep annual subscriptions ($40–$80/year), bombard users with paywalls, require mandatory cloud accounts, or fail to offer a proper Apple Watch companion experience.
          </p>
          <p>
            Breathwork is a fundamental human birthright. You shouldn't need a monthly subscription just to count 30 breaths and track a retention stopwatch. We built <strong>Luma</strong> with a simple promise: <em>Zero ads, zero subscriptions, zero tracking, and pure focus forever.</em>
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
          className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 font-sans"
        >
          <h3 className="text-lg font-bold text-white mb-3">Core Pillars of Luma:</h3>
          <ul className="space-y-2 text-xs sm:text-sm font-mono text-white/80">
            <li className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400 shrink-0" />
              <span><strong>100% Private &amp; Offline:</strong> Your health data and retention records never leave your device.</span>
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d8d628] shrink-0" />
              <span><strong>Zero Paywalls:</strong> All themes, acoustic audio presets, and watchOS tools are completely unlocked.</span>
            </li>
            <li className="flex items-center gap-2">
              <Code className="w-4 h-4 text-[#49cfff] shrink-0" />
              <span><strong>High-End Engineering:</strong> Built with Web Audio synthesizers, hardware-accelerated GPU animations, and native SwiftUI.</span>
            </li>
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-3 font-sans">Support the Project</h2>
          <p className="mb-6">
            Luma is independently maintained and funded. If this app helps you find stillness, energy, or resilience in your daily routine, you can support future development and server costs by buying a coffee.
          </p>
          <a
            href={buyMeACoffeeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#d8d628] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-lg cursor-pointer"
          >
            <Coffee className="w-4 h-4" /> Support on Buy Me a Coffee &rarr;
          </a>
        </motion.div>
      </section>

      <footer className="pt-8 border-t border-white/10 flex items-center justify-between font-mono text-xs text-white/60">
        <a href="/timer" onClick={(e) => handleLinkClick(e, '/timer')} className="text-[#d8d628] hover:underline">
          &larr; Try Web Breathing Pacer
        </a>
        <span>Created by: Luma Team</span>
      </footer>

    </article>
  );
}

export default AboutPage;
