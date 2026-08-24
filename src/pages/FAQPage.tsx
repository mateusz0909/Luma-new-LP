import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, Sparkles, ArrowRight, ShieldAlert } from 'lucide-react';

interface FAQPageProps {
  onNavigate?: (path: string) => void;
}

export function FAQPage({ onNavigate }: FAQPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

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

  const faqCategories = [
    {
      category: '1. App, Privacy & Cost',
      items: [
        {
          id: 1,
          q: 'Is Luma really 100% free with no subscriptions or ads?',
          a: 'Yes. Luma was created as an indie biohacking project born out of frustration with commercial apps charging $50–$80/year for simple breathing clocks. There are zero subscriptions, no hidden paywalls, no tracking, and no advertisements. All features, audio synthesizers, Apple Watch companion mode, and custom themes are unlocked forever.'
        },
        {
          id: 2,
          q: 'Can I use Luma on my Apple Watch?',
          a: 'Yes. Luma includes a dedicated Apple Watch companion app. It pairs directly with your iPhone to deliver tactile wrist haptics for every inhale, exhale, retention hold, and recovery breath so you can feel every breath pulse on your wrist while your session runs on iPhone.'
        },
        {
          id: 3,
          q: 'Does Luma sync with Apple Health?',
          a: 'Yes. Luma automatically logs your Mindful Minutes and tracks active heart rate data during sessions directly into Apple Health (HealthKit).'
        },
        {
          id: 4,
          q: 'Can I practice in my web browser without installing anything?',
          a: 'Yes. Our full interactive Web Breathing Pacer is available directly at https://luma-breath.work/timer, complete with Tibetan bowl acoustic sounds and custom tempos.'
        }
      ]
    },
    {
      category: '2. Breathing Technique & Routine',
      items: [
        {
          id: 5,
          q: 'Should I breathe through my nose or my mouth?',
          a: 'You can breathe through either. Wim Hof recommends using whatever airway allows you to draw in the greatest volume of air smoothly. Many practitioners inhale deeply through the nose and release passively through relaxed lips.'
        },
        {
          id: 6,
          q: 'Do I hold my breath on full lungs or empty lungs during the retention phase?',
          a: 'The main retention phase is performed on unforced empty lungs (after a relaxed, passive exhale). Once you feel the urge to breathe, you take one deep recovery breath in and hold on full lungs for 15 seconds.'
        },
        {
          id: 7,
          q: 'How many rounds should I do each day?',
          a: 'A standard daily session consists of 3 to 4 rounds (each round having 30 to 40 power breaths followed by empty-lung retention and a 15-second recovery hold). The entire routine takes 12 to 15 minutes.'
        },
        {
          id: 8,
          q: 'What is the best time of day to do Wim Hof breathing?',
          a: 'The ideal time is first thing in the morning on an empty stomach, before consuming caffeine or breakfast. Doing breathwork on an empty stomach enhances diaphragm mobility and prevents digestive metabolic oxygen consumption.'
        },
        {
          id: 9,
          q: 'Should I do breathwork before or after a cold shower?',
          a: 'Always perform your breathing session BEFORE taking a cold shower or ice bath. Never practice breath retention while standing under the cold water due to the risk of fainting (Shallow Water Blackout).'
        }
      ]
    },
    {
      category: '3. Physiology & Physical Sensations',
      items: [
        {
          id: 10,
          q: 'Why do my hands, face, and lips tingle during breathing?',
          a: 'Tingling (paresthesia) is a natural result of respiratory alkalosis. Rapid power breathing expels large amounts of carbon dioxide (CO2), causing blood pH to rise. This temporarily lowers free ionized calcium in the blood, causing peripheral sensory nerves to tingle. It is completely harmless and subsides within 60 seconds after returning to normal breathing.'
        },
        {
          id: 11,
          q: 'Why does my breath hold time get longer with each round?',
          a: 'Your brainstem triggers the urge to breathe based on rising CO2 levels (blood acidity), not lack of oxygen. With each subsequent round, you blow off more baseline CO2 and enter deeper respiratory alkalosis, delaying the physiological "air hunger" reflex.'
        },
        {
          id: 12,
          q: 'Is it normal to hear ringing in the ears (tinnitus)?',
          a: 'Yes, temporary tinnitus or light auditory buzzing is common during deep hyperventilation due to acute shifts in blood pressure, alkalosis, and inner ear microcirculation. It typically resolves within minutes after the session.'
        }
      ]
    },
    {
      category: '4. Safety & Health Warnings',
      items: [
        {
          id: 13,
          q: 'Why is it dangerous to practice Wim Hof breathing in water?',
          a: 'Hyperventilation suppresses the CO2 trigger that warns your brain you need to breathe. In water, if oxygen drops below critical levels before CO2 rises, you can lose consciousness without warning (Shallow Water Blackout) and drown instantaneously. Never practice in pools, bathtubs, or open water.'
        },
        {
          id: 14,
          q: 'Who should not practice the Wim Hof Method?',
          a: 'People with epilepsy or a history of seizures, pregnant women, individuals with severe cardiovascular disease, aneurysms, kidney failure, or uncontrolled high blood pressure must avoid intense cyclic hyperventilation.'
        }
      ]
    }
  ];

  return (
    <article className="pt-24 pb-20 px-4 sm:px-6 md:px-12 max-w-4xl mx-auto text-white leading-relaxed">
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 border-b border-white/10 pb-8"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#d8d628] mb-4">
          <HelpCircle className="w-3.5 h-3.5" /> KNOWLEDGE BASE &bull; FREQUENTLY ASKED QUESTIONS
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-white leading-[1.05]">
          Wim Hof Breathwork &amp; Luma FAQ
        </h1>
        <p className="text-lg sm:text-xl text-white/70 font-serif italic mb-6">
          Everything you need to know about cyclic hyperventilation, retention stopwatch timing, Apple Watch haptics, tingling sensations, and safety rules.
        </p>
      </motion.header>

      {/* Safety Warning */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5 }}
        className="mb-12 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm font-serif"
      >
        <strong className="text-amber-400 font-mono text-xs uppercase block mb-1">Safety Note:</strong>
        Always practice seated or lying down in a safe, dry environment. Never practice in water or while driving.
      </motion.div>

      {/* Categorized FAQ Accordion */}
      <div className="space-y-12 mb-16">
        {faqCategories.map((group) => (
          <motion.section 
            key={group.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-3">
              {group.category}
            </h2>
            <div className="divide-y divide-white/10 border-b border-white/10">
              {group.items.map((item) => {
                const isOpen = openFaq === item.id;
                return (
                  <div key={item.id} className="py-6 transition-colors">
                    <button
                      onClick={() => toggleFaq(item.id)}
                      className="flex justify-between items-center w-full text-left gap-6 cursor-pointer group"
                      aria-expanded={isOpen}
                    >
                      <span className="text-lg sm:text-xl font-bold text-white group-hover:text-[#d8d628] transition-colors">
                        {item.q}
                      </span>
                      <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0 group-hover:border-[#d8d628]/40 transition-all">
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#d8d628]' : 'text-white/70'}`} />
                      </div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <p className="mt-4 text-sm sm:text-base text-white/70 font-serif italic leading-relaxed pr-6">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.section>
        ))}
      </div>

      {/* Footer Silo Links */}
      <footer className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <a
          href="/timer"
          onClick={(e) => handleLinkClick(e, '/timer')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#d8d628] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-lg"
        >
          Launch Online Timer &rarr;
        </a>
        <div className="flex gap-4 font-mono text-xs">
          <a href="/guide/wim-hof-method" onClick={(e) => handleLinkClick(e, '/guide/wim-hof-method')} className="text-white/60 hover:text-white">
            Full Method Guide &rarr;
          </a>
          <a href="/retention-times" onClick={(e) => handleLinkClick(e, '/retention-times')} className="text-white/60 hover:text-white">
            Retention Benchmarks &rarr;
          </a>
        </div>
      </footer>

    </article>
  );
}

export default FAQPage;

