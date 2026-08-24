import React from 'react';
import { Timer, Clock, Award, ShieldAlert, CheckCircle2, TrendingUp, Zap, ArrowRight, HelpCircle } from 'lucide-react';

interface RetentionTimesPageProps {
  onNavigate?: (path: string) => void;
}

export function RetentionTimesPage({ onNavigate }: RetentionTimesPageProps) {
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

  const benchmarks = [
    {
      round: 'Round 1',
      beginner: '0:45 – 1:00 min',
      intermediate: '1:00 – 1:30 min',
      advanced: '1:30 – 2:00 min',
      physiology: 'Initial CO2 blowout. Oxygen saturation is high, but the nervous system is still adjusting.'
    },
    {
      round: 'Round 2',
      beginner: '1:00 – 1:30 min',
      intermediate: '1:30 – 2:15 min',
      advanced: '2:15 – 3:00 min',
      physiology: 'Deeper respiratory alkalosis. Blood pH rises (~7.55+), drastically delaying the urge to breathe.'
    },
    {
      round: 'Round 3',
      beginner: '1:15 – 1:45 min',
      intermediate: '2:00 – 2:45 min',
      advanced: '2:45 – 3:45+ min',
      physiology: 'Spleen contraction reflex triggers release of oxygen-rich erythrocytes into bloodstream.'
    },
    {
      round: 'Round 4',
      beginner: '1:30 – 2:00 min',
      intermediate: '2:15 – 3:15 min',
      advanced: '3:30 – 4:30+ min',
      physiology: 'Maximum cellular adaptation, parasympathetic dominance, and deep meditative state.'
    }
  ];

  return (
    <article className="pt-24 pb-20 px-4 sm:px-6 md:px-12 max-w-4xl mx-auto text-white leading-relaxed">
      
      {/* Header */}
      <header className="mb-12 border-b border-white/10 pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#49cfff] mb-4">
          <Clock className="w-3.5 h-3.5" /> RETENTION BENCHMARKS &bull; DATA &amp; PHYSIOLOGY
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-white leading-[1.05]">
          Wim Hof Retention Times: Averages, Benchmarks &amp; Physiology Explained
        </h1>
        <p className="text-lg sm:text-xl text-white/70 font-serif italic mb-6">
          What is a normal breath hold time in the Wim Hof Method? Discover round-by-round averages, why retention times increase with every round, and why chasing numbers can be counterproductive.
        </p>

        <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-white/50 border-t border-white/5 pt-4">
          <span>Author: Mateusz Byrtus</span>
          <span>&bull;</span>
          <span>Updated for 2026</span>
          <span>&bull;</span>
          <span>Evidence-Based Norms</span>
        </div>
      </header>

      {/* Quick Summary Card */}
      <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#d8d628] mb-1">Quick Answer</div>
          <p className="text-sm font-serif text-white/80">
            For most healthy practitioners, a normal Wim Hof retention time on empty lungs ranges from <strong>1:00 to 1:45 minutes</strong> in early rounds, expanding to <strong>2:00 to 3:00+ minutes</strong> by Round 3 and 4.
          </p>
        </div>
        <a
          href="/timer"
          onClick={(e) => handleLinkClick(e, '/timer')}
          className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#d8d628] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-md cursor-pointer"
        >
          <Timer className="w-4 h-4" /> Track Your Retention &rarr;
        </a>
      </div>

      {/* Benchmark Reference Table */}
      <section className="mb-14">
        <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">
          Wim Hof Retention Time Benchmarks (Round by Round)
        </h2>
        <p className="text-sm text-white/70 font-serif mb-6">
          All times below represent <strong>empty-lung retention holds (after a relaxed passive exhale)</strong> across a 4-round session:
        </p>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
          <table className="w-full text-left text-xs sm:text-sm font-sans">
            <thead className="bg-white/5 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#d8d628] border-b border-white/10">
              <tr>
                <th className="p-4">Round</th>
                <th className="p-4">Beginner</th>
                <th className="p-4">Intermediate</th>
                <th className="p-4">Advanced</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-white/80">
              {benchmarks.map((row) => (
                <tr key={row.round} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-mono font-bold text-white">{row.round}</td>
                  <td className="p-4 text-white/70">{row.beginner}</td>
                  <td className="p-4 font-bold text-white">{row.intermediate}</td>
                  <td className="p-4 text-[#49cfff]">{row.advanced}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Why Does Retention Increase in Later Rounds? */}
      <section className="mb-14">
        <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">
          Why Does Your Breath Hold Double in Later Rounds?
        </h2>
        <p className="text-base text-white/80 font-serif mb-4 leading-relaxed">
          Many beginners are astonished to find that while they can barely hold their breath for 45 seconds under normal conditions, they effortlessly exceed 2 or 3 minutes during Round 3 of Wim Hof breathing.
        </p>
        <p className="text-base text-white/80 font-serif mb-6 leading-relaxed">
          The reason is not that your body suddenly stores 300% more oxygen, but rather <strong>the alteration of carbon dioxide ($CO_2$) and blood pH chemistry:</strong>
        </p>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-4">
            <div className="p-2 rounded-xl bg-[#d8d628]/10 text-[#d8d628] shrink-0 mt-1">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">1. The Trigger to Breathe is $CO_2$, Not Lack of $O_2$</h3>
              <p className="text-xs sm:text-sm text-white/70 font-serif leading-relaxed">
                The human respiratory center in the brainstem (medulla oblongata) does not monitor low oxygen levels to trigger inhalation; it monitors blood acidity caused by dissolved carbon dioxide ($H_2CO_3$). By performing 30 deep power breaths, you purge $CO_2$ from your blood, eliminating the chemical trigger of "air hunger" for several minutes.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-4">
            <div className="p-2 rounded-xl bg-[#49cfff]/10 text-[#49cfff] shrink-0 mt-1">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">2. Cumulative Alkaline Shift (Respiratory Alkalosis)</h3>
              <p className="text-xs sm:text-sm text-white/70 font-serif leading-relaxed">
                With each round, blood pH shifts higher into an alkaline state (up to pH 7.6–7.75). It takes longer for metabolic $CO_2$ to accumulate and lower the pH back to the threshold that demands breathing.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-4">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 shrink-0 mt-1">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">3. The Spleen Reflex &amp; Oxygen Economy</h3>
              <p className="text-xs sm:text-sm text-white/70 font-serif leading-relaxed">
                Repetitive transient hypoxia stimulates the mammalian dive reflex and spleen contraction, releasing a bolus of stored oxygenated red blood cells into the circulation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Factors Affecting Retention Times */}
      <section className="mb-14">
        <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">
          Key Factors That Influence Your Breath Hold Daily
        </h2>
        <p className="text-base text-white/80 font-serif mb-6 leading-relaxed">
          Your retention times will naturally fluctuate by 30 to 60 seconds from day to day based on:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-serif">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <strong className="text-white block mb-1">&bull; Empty vs. Full Stomach:</strong>
            <span className="text-white/60 text-xs">Digestion consumes significant oxygen and elevates metabolic $CO_2$ production, shortening hold times by 30–40%.</span>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <strong className="text-white block mb-1">&bull; Caffeine &amp; Stimulants:</strong>
            <span className="text-white/60 text-xs">Caffeine accelerates heart rate and metabolic rate, making it harder to relax deeply during the retention phase.</span>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <strong className="text-white block mb-1">&bull; Stress &amp; Sympathetic Tone:</strong>
            <span className="text-white/60 text-xs">High cortisol and mental chatter increase muscular tension, causing rapid oxygen depletion.</span>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <strong className="text-white block mb-1">&bull; Physical Position:</strong>
            <span className="text-white/60 text-xs">Lying down flat reduces cardiovascular workload compared to upright sitting, allowing longer relaxed holds.</span>
          </div>
        </div>
      </section>

      {/* The Danger of the "Ego Trap" */}
      <section className="mb-14 p-8 rounded-3xl bg-amber-950/20 border border-amber-500/30">
        <div className="flex items-center gap-3 mb-3 text-amber-400">
          <ShieldAlert className="w-6 h-6" />
          <h2 className="text-2xl font-bold tracking-tight">The Ego Trap: Why Longer is Not Always Better</h2>
        </div>
        <p className="text-sm text-white/80 font-serif leading-relaxed mb-4">
          The Wim Hof Method is <strong>not a competitive sport</strong>. Forcing yourself to hold past painful diaphragmatic contractions or until you begin to lose consciousness provides zero additional health benefits and can lead to syncope (fainting).
        </p>
        <p className="text-sm text-white/80 font-serif leading-relaxed">
          The primary benefit comes from the <em>quality of relaxation</em> during the hold. When your body signals a clear urge to breathe, honor it without hesitation and take your 15-second recovery inhale.
        </p>
      </section>

      {/* Bottom CTA */}
      <footer className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <a
          href="/timer"
          onClick={(e) => handleLinkClick(e, '/timer')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#d8d628] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-lg"
        >
          <Timer className="w-4 h-4" /> Start Stopwatch in Web Timer &rarr;
        </a>
        <div className="flex gap-4 font-mono text-xs">
          <a href="/guide/wim-hof-method" onClick={(e) => handleLinkClick(e, '/guide/wim-hof-method')} className="text-white/60 hover:text-white">
            Step-by-Step Guide &rarr;
          </a>
          <a href="/science-and-safety" onClick={(e) => handleLinkClick(e, '/science-and-safety')} className="text-white/60 hover:text-white">
            Clinical Science &rarr;
          </a>
        </div>
      </footer>

    </article>
  );
}

export default RetentionTimesPage;
