import React, { useRef, useState, useEffect, Suspense } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronDown, Play, Sparkles, BookOpen, Watch, Activity, ShieldAlert } from 'lucide-react';
import WebBreathingPacer from '../components/WebBreathingPacer';

const asset = (path: string) => `${import.meta.env?.BASE_URL || '/'}${path.startsWith('/') ? path.slice(1) : path}`;

const logoSrc = asset('screenshots/logo.webp');
const appearanceSettings = asset('screenshots/appearance-settings.webp');

const appearanceThemes = [
  {
    name: 'Aurora Lab',
    description: 'Electric cyan glow with vivid magenta accents for a sharper night mode.',
    image: asset('screenshots/Aurora Lab.webp'),
    accent: '#49cfff'
  },
  {
    name: 'Plum Midnight',
    description: 'A softer violet palette that keeps the interface dark but less severe.',
    image: asset('screenshots/Plum midnight.webp'),
    accent: '#d18dff'
  },
  {
    name: 'Ember Noir',
    description: 'Warm ember highlights for a darker, richer visual mood during sessions.',
    image: asset('screenshots/ember.webp'),
    accent: '#ff9a5c'
  },
  {
    name: 'Forest Night',
    description: 'A calmer green look for people who want less glow and more depth.',
    image: asset('screenshots/green.webp'),
    accent: '#77d78a'
  }
];

const screenshotItems = [
  { src: asset('screenshots/1.webp'), alt: 'Luma iOS breathing timer session overview and start screen' },
  { src: asset('screenshots/2.webp'), alt: 'Luma customizable breathing cycles and round duration settings' },
  { src: asset('screenshots/3.webp'), alt: 'Luma breath retention stopwatch and breath hold analytics' },
  { src: asset('screenshots/4.webp'), alt: 'Luma dark mode breathing session history and streak tracking' },
  { src: asset('screenshots/5.webp'), alt: 'Luma breathwork home dashboard and daily practice launcher' },
  { src: asset('screenshots/6.webp'), alt: 'Luma guided power breathing pacer with visual orb' },
  { src: asset('screenshots/7.webp'), alt: 'Luma recovery hold timer with 15-second lung hold countdown' },
  { src: asset('screenshots/8.webp'), alt: 'Luma audio presets and ambient meditation soundscapes' },
  { src: asset('screenshots/9.webp'), alt: 'Luma mindful minutes and breathwork statistics overview' },
  { src: asset('screenshots/10.webp'), alt: 'Luma complete breath session summary and retention records' },
  { src: asset('screenshots/applehealth-screen.webp'), alt: 'Luma Apple Health integration with mindful minutes logging' },
  { src: asset('screenshots/haptics.webp'), alt: 'Luma custom tactile haptic feedback for guided breathing' },
  { src: asset('screenshots/home-widgets.webp'), alt: 'Luma iOS Home Screen and Lock Screen breathwork widgets' }
];

const sessionVideoSrc = asset('video/luma-video.mp4');
const sessionPosterSrc = asset('video/luma-video-poster.webp');

const stickySectionItems = [
  { 
    type: 'video' as const, 
    src: sessionVideoSrc, 
    alt: 'Luma iOS app actual guided breathing session recording' 
  },
  { 
    type: 'image' as const, 
    src: screenshotItems[6].src, 
    alt: 'Luma guided breathing pacer with visual pulsing orb' 
  },
  { 
    type: 'image' as const, 
    src: screenshotItems[3].src, 
    alt: 'Luma breath retention stopwatch and hold time statistics' 
  }
];

const galleryItems = [
  { 
    type: 'image' as const, 
    src: sessionPosterSrc, 
    alt: 'Luma iOS actual breathing session recording in action' 
  },
  ...screenshotItems.map((item) => ({ type: 'image' as const, ...item }))
];

const faqs = [
  {
    id: 1,
    question: "Is Luma really 100% free with no subscriptions or ads?",
    answer: "Yes, Luma is completely free forever. There are zero subscriptions, no hidden paywalls, and no advertisements. All breathing timers, retention stopwatch tools, ambient audio, customizable themes, and Apple Watch features are fully unlocked for everyone."
  },
  {
    id: 2,
    question: "How does Luma support the Wim Hof Breathing Method?",
    answer: "Luma is purpose-built for the Wim Hof Breathing Method. It provides guided rhythmic power breathing (customizable 30–40 breaths), an automated breath retention stopwatch with round hold history, recovery breath timers (15s on full lungs), and fully customizable multi-round protocols."
  },
  {
    id: 3,
    question: "Can I practice breathwork with Luma on Apple Watch?",
    answer: "Yes! Luma includes a dedicated Apple Watch companion app. Experience tactile wrist haptics for each inhale, exhale, retention hold, and recovery phase with synchronized Apple HealthKit logging."
  },
  {
    id: 4,
    question: "Does Luma automatically sync with Apple Health (HealthKit)?",
    answer: "Yes, Luma automatically logs your Mindful Minutes and tracks heart rate metrics during breath retention protocols directly into Apple Health (HealthKit) for full recovery and HRV insights."
  },
  {
    id: 5,
    question: "Can I practice Wim Hof breathing online in my web browser?",
    answer: "Yes, our interactive Web Breathing Pacer right here on this page allows you to practice guided cyclic power breathing, retention stopwatch timing, and recovery holds directly in your desktop or mobile browser with zero installation."
  }
];

const CTAButton = ({ href, text, ariaLabel, eventName = "App Store Hero Click", className = "" }: { href: string, text: string, ariaLabel?: string, eventName?: string, className?: string }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel || text}
    data-umami-event={eventName}
    className={`group relative inline-flex items-center gap-6 rounded-full p-2 pr-8 bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-700 hover:bg-white hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:-translate-y-1 cursor-pointer ${className}`}
  >
    <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-[#d8d628] text-black transition-all duration-700 group-hover:scale-90 group-hover:bg-black group-hover:text-white">
      <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-700 ease-[cubic-bezier(0.87,0,0.13,1)]" />
    </div>
    <span className="relative z-10 font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-white group-hover:text-black transition-colors duration-700 font-bold">
      {text}
    </span>
  </a>
);

const PhoneFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="relative w-[260px] sm:w-[280px] md:w-[320px] aspect-[1170/2532] rounded-[44px] md:rounded-[48px] p-2 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-3xl border border-white/10 shadow-[0_0_80px_rgba(0,18,218,0.3)]">
    <div className="absolute top-4 inset-x-0 mx-auto w-24 h-7 bg-black rounded-full z-50 border border-white/10" />
    <div className="w-full h-full bg-black rounded-[36px] md:rounded-[40px] overflow-hidden relative border border-white/5 shadow-inner">
      {children}
    </div>
  </div>
);

// High-Performance Lazy Video Component (preload="none" + IntersectionObserver)
const AppVideoPlayer = ({ src, poster }: { src: string; poster: string; key?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsNearViewport(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '300px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.muted = true;
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full cursor-pointer select-none group"
      onClick={togglePlay}
      role="button"
      tabIndex={0}
      aria-label={isPlaying ? "Pause app demonstration video" : "Play app demonstration video"}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') togglePlay(e as any); }}
    >
      {isNearViewport ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          preload="none"
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <img src={poster} alt="Luma Video Demo Poster" className="w-full h-full object-cover" loading="lazy" />
      )}

      {/* Trigger Overlay */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/45 backdrop-blur-[2px] p-4 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#d8d628] text-black flex items-center justify-center shadow-[0_0_35px_rgba(216,214,40,0.7)] group-hover:scale-110 transition-transform">
              <Play className="w-7 h-7 ml-1 fill-current" />
            </div>
            <span className="mt-3.5 font-mono text-[11px] font-bold uppercase tracking-wider text-white bg-black/80 px-3.5 py-1.5 rounded-full border border-white/20 shadow-lg">
              Tap to Play Demo &#9654;
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Badge */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/85 border border-white/20 backdrop-blur-xl text-[10px] font-mono uppercase tracking-wider text-white shadow-xl pointer-events-none whitespace-nowrap">
        <span className="relative flex h-2 w-2">
          {isPlaying ? (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </>
          ) : (
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400"></span>
          )}
        </span>
        <span>{isPlaying ? 'Live App Preview' : 'Tap Phone to Play'}</span>
      </div>
    </div>
  );
};

interface HomePageProps {
  onNavigate?: (path: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const activeSection = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 2]);
  const [activeIndex, setActiveIndex] = useState(0);
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

  useEffect(() => {
    return activeSection.on("change", (latest) => {
      setActiveIndex(Math.min(2, Math.max(0, Math.round(latest))));
    });
  }, [activeSection]);

  return (
    <div className="bg-black text-white selection:bg-[#d8d628] selection:text-black font-sans min-h-screen">
      
      {/* Hero Section */}
      <section className="h-[100svh] relative flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-[#0012da] blur-[100px] md:blur-[160px] mix-blend-screen luma-orb-blue" />
        <div className="absolute w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-[#d8d628] blur-[80px] md:blur-[140px] mix-blend-screen luma-orb-yellow" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="z-10 flex flex-col items-center w-full px-4 text-center"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#d8d628] border border-[#d8d628]/30 rounded-full px-4 py-1.5 inline-flex mb-6 backdrop-blur-md bg-black/40">
            100% FREE &bull; ZERO ADS &bull; APPLE WATCH READY
          </span>
          <div className="mb-8 md:mb-12">
            <h1 className="text-[20vw] md:text-[18vw] leading-[0.8] font-bold tracking-tighter uppercase text-white">
              <span className="block">Breathe.</span>
              <span className="sr-only">Free Wim Hof Breathing Method App &amp; Guided Retention Timer</span>
            </h1>
            <p className="font-serif italic text-xl sm:text-2xl md:text-5xl mt-6 md:mt-10 text-white/90 max-w-4xl mx-auto font-normal">
              The Wim Hof Method, reimagined. Free breathwork app, online guided pacer &amp; retention timer.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <CTAButton 
              href="https://apps.apple.com/us/app/luma-breathwork-meditation/id6737122722" 
              text="Download for iOS" 
              ariaLabel="Download Luma for iOS from App Store"
              eventName="App Store Hero Click"
            />
            <a
              href="/timer"
              onClick={(e) => handleLinkClick(e, '/timer')}
              className="px-6 py-3.5 rounded-full bg-white/10 border border-white/15 text-white font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
              Launch Web Timer &rarr;
            </a>
          </div>
        </motion.div>
      </section>

      {/* Editorial Statement (Blockquote semantic tag) */}
      <section className="py-[12vh] md:py-[15vh] px-6 md:px-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#d8d628] border border-[#d8d628]/30 rounded-full px-4 py-1.5 inline-block">
            OUR PHILOSOPHY
          </span>
        </motion.div>
        <motion.blockquote 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.15] tracking-tight"
        >
          We believe conscious breathwork is the ultimate tool for human resilience and nervous system regulation. <br className="hidden md:block"/>
          <span className="text-white/60">No subscriptions. No paywalls. No noise. Just pure focus.</span>
        </motion.blockquote>
      </section>

      {/* Showcase Section */}
      <section ref={containerRef} className="relative px-6 md:px-20 max-w-7xl mx-auto pb-[10vh]" aria-label="Practice Architecture">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#d8d628] border border-[#d8d628]/30 rounded-full px-4 py-1.5 inline-block">
            PRACTICE ARCHITECTURE
          </span>
          <h2 className="sr-only">Wim Hof Breathwork Protocol: Daily Ritual, Sensory Immersion &amp; Retention Analytics</h2>
        </motion.div>
        
        {/* Mobile View: Cards */}
        <div className="flex flex-col gap-16 md:hidden">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-6 p-6 rounded-[2.5rem] bg-white/[0.03] border border-white/10"
          >
            <div className="w-full flex flex-col gap-3">
              <span className="text-[#d8d628] font-mono text-xs tracking-widest border border-[#d8d628]/30 rounded-full px-3 py-1 w-fit">01 / RITUAL</span>
              <h3 className="text-3xl font-bold tracking-tight">Your daily breath ritual.</h3>
              <p className="text-base text-white/60 font-serif italic">
                Tailor your 30–40 power breath cycles, unforced empty-lung retentions, and 15-second recovery holds with seamless fluidity.
              </p>
            </div>
            <PhoneFrame>
              <AppVideoPlayer src={sessionVideoSrc} poster={sessionPosterSrc} />
            </PhoneFrame>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-6 p-6 rounded-[2.5rem] bg-white/[0.03] border border-white/10"
          >
            <div className="w-full flex flex-col gap-3">
              <span className="text-[#d8d628] font-mono text-xs tracking-widest border border-[#d8d628]/30 rounded-full px-3 py-1 w-fit">02 / IMMERSION</span>
              <h3 className="text-3xl font-bold tracking-tight">Deep sensory focus.</h3>
              <p className="text-base text-white/60 font-serif italic">
                Immerse in acoustic Tibetan singing bowls, tactile Apple Watch wrist haptics, and distraction-free dark OLED visual pacing.
              </p>
            </div>
            <PhoneFrame>
              <img src={screenshotItems[6].src} alt={screenshotItems[6].alt} loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </PhoneFrame>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-6 p-6 rounded-[2.5rem] bg-white/[0.03] border border-white/10"
          >
            <div className="w-full flex flex-col gap-3">
              <span className="text-[#d8d628] font-mono text-xs tracking-widest border border-[#d8d628]/30 rounded-full px-3 py-1 w-fit">03 / INSIGHT</span>
              <h3 className="text-3xl font-bold tracking-tight">Track retention metrics.</h3>
              <p className="text-base text-white/60 font-serif italic">
                Analyze retention time trends across rounds, celebrate personal best holds, and sync Mindful Minutes effortlessly with Apple Health.
              </p>
            </div>
            <PhoneFrame>
              <img src={screenshotItems[3].src} alt={screenshotItems[3].alt} loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </PhoneFrame>
          </motion.div>
        </div>

        {/* Desktop View: Sticky scroll */}
        <div className="hidden md:flex flex-row gap-10">
          <div className="w-1/2 flex flex-col gap-[40vh] pt-[10vh] pb-[40vh] z-10">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-8"
            >
              <span className="text-[#d8d628] font-mono text-xs tracking-widest border border-[#d8d628]/30 rounded-full px-4 py-1.5 w-fit">01 / RITUAL</span>
              <h3 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">Your daily<br/>breath ritual.</h3>
              <p className="text-xl md:text-3xl text-white/70 font-serif italic leading-relaxed">
                Tailor your 30–40 power breath cycles, unforced empty-lung retentions, and 15-second recovery holds with seamless fluidity.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-8"
            >
              <span className="text-[#d8d628] font-mono text-xs tracking-widest border border-[#d8d628]/30 rounded-full px-4 py-1.5 w-fit">02 / IMMERSION</span>
              <h3 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">Deep<br/>sensory focus.</h3>
              <p className="text-xl md:text-3xl text-white/70 font-serif italic leading-relaxed">
                Immerse in acoustic Tibetan singing bowls, tactile Apple Watch wrist haptics, and distraction-free dark OLED visual pacing.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-8"
            >
              <span className="text-[#d8d628] font-mono text-xs tracking-widest border border-[#d8d628]/30 rounded-full px-4 py-1.5 w-fit">03 / INSIGHT</span>
              <h3 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">Track retention<br/>metrics.</h3>
              <p className="text-xl md:text-3xl text-white/70 font-serif italic leading-relaxed">
                Analyze retention time trends across rounds, celebrate personal best holds, and sync Mindful Minutes effortlessly with Apple Health.
              </p>
            </motion.div>
          </div>

          <div className="w-1/2 h-[100vh] sticky top-0 flex items-center justify-end">
            <motion.div style={{ y: y1 }}>
              <PhoneFrame>
                <AnimatePresence mode="wait">
                  {stickySectionItems[activeIndex].type === 'video' ? (
                    <motion.div
                      key="sticky-session-video"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      <AppVideoPlayer
                        src={stickySectionItems[activeIndex].src}
                        poster={sessionPosterSrc}
                      />
                    </motion.div>
                  ) : (
                    <motion.img
                      key={`sticky-screenshot-${activeIndex}`}
                      src={stickySectionItems[activeIndex].src}
                      alt={stickySectionItems[activeIndex].alt}
                      loading="lazy"
                      decoding="async"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover"
                    />
                  )}
                </AnimatePresence>
              </PhoneFrame>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Web Breathing Pacer Section */}
      <section className="py-20 px-6 md:px-20 max-w-7xl mx-auto border-t border-white/10" aria-label="Web Breathing Pacer">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="text-[#49cfff] font-mono text-xs tracking-widest border border-[#49cfff]/30 rounded-full px-4 py-1.5 inline-flex mb-4">
            FREE ONLINE BREATHING PACER
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Free Online Wim Hof Breathing Timer &amp; Guided Pacer</h2>
          <p className="text-white/70 font-serif italic text-base md:text-lg mt-2">
            Experience guided cyclic power breathing, acoustic Tibetan bowl sound chimes, and automatic breath hold retention stopwatch directly in your browser.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <Suspense fallback={
            <div className="w-full max-w-4xl mx-auto h-[480px] rounded-[32px] bg-white/[0.02] border border-white/10 flex flex-col items-center justify-center gap-4 text-white/70 font-mono text-sm">
              <div className="w-8 h-8 rounded-full border-2 border-[#49cfff] border-t-transparent animate-spin" />
              <span>Loading Web Breathing Pacer...</span>
            </div>
          }>
            <WebBreathingPacer />
          </Suspense>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 overflow-hidden border-t border-white/10 bg-white/[0.02]" aria-label="Interface Showcase">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6 }}
          className="px-6 md:px-20 max-w-7xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">Pure Focus: The Breathwork &amp; Retention Timer Interface</h2>
          <p className="text-xl text-white/70 font-serif italic">Engineered with OLED black aesthetics, smooth spring animations, and distraction-free breathing rounds.</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="relative w-full flex overflow-x-hidden"
        >
          <div className="luma-marquee-track gap-8 px-8">
            {galleryItems.map((item, idx) => (
              <div key={`gallery-primary-${idx}`} className="shrink-0">
                <PhoneFrame>
                  <img src={item.src} alt={item.alt} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </PhoneFrame>
              </div>
            ))}
            {galleryItems.map((item, idx) => (
              <div key={`gallery-dup-${idx}`} className="shrink-0" aria-hidden="true">
                <PhoneFrame>
                  <img src={item.src} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </PhoneFrame>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Appearance Themes Section */}
      <section className="border-t border-white/10 py-24 md:py-32 overflow-hidden bg-[radial-gradient(circle_at_top,#ffffff0d,transparent_35%),linear-gradient(180deg,#000000_0%,#050814_100%)]" aria-label="Appearance Themes">
        <div className="px-6 md:px-20 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-14 md:mb-20"
          >
            <span className="text-[#d8d628] font-mono text-xs tracking-widest border border-[#d8d628]/30 rounded-full px-4 py-1.5 inline-flex">CUSTOMIZABLE THEMES</span>
            <h2 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95]">Customizable OLED Themes: Change the Mood, Keep the Flow</h2>
            <p className="mt-6 text-xl md:text-2xl text-white/70 font-serif italic leading-relaxed">Choose between glowing neon orbs, deep plum midnight, or calm forest hues tailored for morning or bedtime breathwork.</p>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 md:gap-12 items-start">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.6 }}
              className="relative rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 md:p-10 overflow-hidden"
            >
              <div className="relative z-10 flex flex-col gap-8">
                <div>
                  <div className="text-white/70 font-mono text-xs tracking-[0.2em] uppercase mb-4">Theme Settings</div>
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tighter leading-none">One tap, completely different feel.</h3>
                </div>
                <div className="self-center xl:self-start">
                  <PhoneFrame>
                    <img src={appearanceSettings} alt="Luma appearance and theme settings" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </PhoneFrame>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {appearanceThemes.map((theme, i) => (
                <motion.div
                  key={theme.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative min-h-[480px] sm:min-h-[520px] rounded-[2rem] border border-white/10 overflow-hidden bg-white/[0.03] group"
                  style={{ background: `radial-gradient(circle at top left, ${theme.accent}22, transparent 35%), linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)` }}
                >
                  <div className="relative z-10 p-7 md:p-8 max-w-[75%] sm:max-w-[70%]">
                    <div className="w-3 h-3 rounded-full mb-5" style={{ backgroundColor: theme.accent }} />
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-none">{theme.name}</h3>
                    <p className="mt-4 text-sm sm:text-base md:text-lg text-white/70 font-serif italic leading-relaxed">{theme.description}</p>
                  </div>
                  <div className="absolute right-[-6%] bottom-[-10%] w-[62%] md:w-[58%] rotate-[12deg] group-hover:rotate-[7deg] transition-transform duration-700 ease-out drop-shadow-2xl">
                    <PhoneFrame>
                      <img src={theme.image} alt={`Luma ${theme.name} theme screenshot`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                    </PhoneFrame>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brutalist Grid Section */}
      <section className="border-t border-white/10" aria-label="Ecosystem and Sensory Features">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5 }}
          className="px-6 md:px-20 py-8 max-w-7xl mx-auto border-b border-white/10"
        >
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#49cfff] border border-[#49cfff]/30 rounded-full px-4 py-1.5 inline-block">
            ECOSYSTEM &amp; SENSORY INTEGRATION
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 border-b border-white/10">
          <motion.article 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6 }}
            className="p-10 sm:p-12 md:p-20 flex flex-col gap-6 hover:bg-white/[0.04] transition-colors duration-500 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.01] group-hover:bg-[#49cfff]/[0.06] rounded-full blur-3xl pointer-events-none transition-colors duration-700" />
            <div className="z-10 flex flex-col gap-6 w-full md:w-2/3">
              <img src={asset('screenshots/applewatch-icon.webp')} alt="Apple Watch App icon" width="192" height="64" loading="lazy" decoding="async" className="w-48 h-16 object-contain object-left group-hover:scale-105 transition-transform duration-500 invert origin-left" />
              <h3 className="text-3xl font-bold tracking-tight">Apple Watch Companion App</h3>
              <p className="text-lg text-white/70 group-hover:text-white transition-colors font-serif italic">Feel every inhale, exhale, and retention hold with synchronized tactile wrist haptics while your session runs on iPhone.</p>
              <a href="/apple-watch" onClick={(e) => handleLinkClick(e, '/apple-watch')} className="font-mono text-xs uppercase tracking-wider text-[#d8d628] group-hover:text-white flex items-center gap-1">
                Learn more &rarr;
              </a>
            </div>
            <div className="absolute -bottom-10 -right-10 w-[50%] md:w-[40%] rotate-[-15deg] group-hover:rotate-[-5deg] group-hover:-translate-y-4 transition-all duration-700 ease-out opacity-40 group-hover:opacity-100 drop-shadow-2xl pointer-events-none">
              <img src={asset('screenshots/watch-screen.webp')} alt="Luma Apple Watch companion app timer and haptics" loading="lazy" decoding="async" className="w-full h-auto object-contain rounded-[2rem] border-4 border-white/10" />
            </div>
          </motion.article>

          <motion.article 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-10 sm:p-12 md:p-20 flex flex-col gap-6 hover:bg-white/[0.04] transition-colors duration-500 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.01] group-hover:bg-[#49cfff]/[0.06] rounded-full blur-3xl pointer-events-none transition-colors duration-700" />
            <div className="z-10 flex flex-col gap-6 w-full md:w-2/3">
              <img src={asset('screenshots/liveactivity-icon.webp')} alt="iOS Live Activities & Lock Screen Widgets icon" width="48" height="48" loading="lazy" decoding="async" className="w-12 h-12 object-contain group-hover:scale-105 transition-transform duration-500" />
              <h3 className="text-3xl font-bold tracking-tight">iOS Widgets &amp; Live Activities</h3>
              <p className="text-lg text-white/70 group-hover:text-white transition-colors font-serif italic">Monitor active breathing sessions directly on Dynamic Island and Lock Screen, with streak widgets for your Home Screen.</p>
            </div>
            <div className="absolute -bottom-24 -right-10 w-[50%] md:w-[40%] rotate-[15deg] group-hover:rotate-[5deg] group-hover:-translate-y-4 transition-all duration-700 ease-out opacity-40 group-hover:opacity-100 drop-shadow-2xl pointer-events-none">
              <img src={asset('screenshots/home-widgets.webp')} alt="Luma iOS Home Screen and Lock Screen breathwork widgets" loading="lazy" decoding="async" className="w-full h-auto object-contain rounded-[2rem] border-4 border-white/10" />
            </div>
          </motion.article>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
          <motion.article 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6 }}
            className="p-10 sm:p-12 md:p-20 flex flex-col gap-6 hover:bg-white/[0.04] transition-colors duration-500 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.01] group-hover:bg-[#49cfff]/[0.06] rounded-full blur-3xl pointer-events-none transition-colors duration-700" />
            <div className="z-10 flex flex-col gap-6 w-full md:w-2/3">
              <img src={asset('screenshots/ah-icon.webp')} alt="Apple Health Integration icon" width="48" height="48" loading="lazy" decoding="async" className="w-12 h-12 object-contain group-hover:scale-105 transition-transform duration-500" />
              <h3 className="text-3xl font-bold tracking-tight">Apple HealthKit Sync</h3>
              <p className="text-lg text-white/70 group-hover:text-white transition-colors font-serif italic">Automatically log your Mindful Minutes and track heart rate variability (HRV) trends during breath retention protocols.</p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-[50%] md:w-[40%] rotate-[-15deg] group-hover:rotate-[-5deg] group-hover:-translate-y-4 transition-all duration-700 ease-out opacity-40 group-hover:opacity-100 drop-shadow-2xl pointer-events-none">
              <img src={asset('screenshots/applehealth-screen.webp')} alt="Luma Mindful Minutes syncing with Apple Health" loading="lazy" decoding="async" className="w-full h-auto object-contain rounded-[2rem] border-4 border-white/10" />
            </div>
          </motion.article>

          <motion.article 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-10 sm:p-12 md:p-20 flex flex-col gap-6 hover:bg-white/[0.04] transition-colors duration-500 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.01] group-hover:bg-[#49cfff]/[0.06] rounded-full blur-3xl pointer-events-none transition-colors duration-700" />
            <div className="z-10 flex flex-col gap-6 w-full md:w-2/3">
              <img src={asset('screenshots/haptics-icon.webp')} alt="Haptic Vibration Feedback icon" width="48" height="48" loading="lazy" decoding="async" className="w-12 h-12 object-contain group-hover:scale-105 transition-transform duration-500" />
              <h3 className="text-3xl font-bold tracking-tight">Precision Sensory Haptics</h3>
              <p className="text-lg text-white/70 group-hover:text-white transition-colors font-serif italic">Close your eyes and breathe in total darkness. Tailored vibration envelopes guide your pacing without screen glare.</p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-[50%] md:w-[40%] rotate-[15deg] group-hover:rotate-[5deg] group-hover:-translate-y-4 transition-all duration-700 ease-out opacity-40 group-hover:opacity-100 drop-shadow-2xl pointer-events-none">
              <img src={asset('screenshots/haptics.webp')} alt="Luma custom haptic feedback patterns for breathing" loading="lazy" decoding="async" className="w-full h-auto object-contain rounded-[2rem] border-4 border-white/10" />
            </div>
          </motion.article>
        </div>
      </section>

      {/* Knowledge & Physiology Hub Section */}
      <section className="border-t border-white/10 py-24 md:py-32 px-6 md:px-20 max-w-7xl mx-auto" aria-label="Knowledge and Physiology Hub">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14 md:mb-20"
        >
          <span className="text-[#d8d628] font-mono text-xs tracking-widest border border-[#d8d628]/30 rounded-full px-4 py-1.5 inline-flex">
            KNOWLEDGE &amp; PHYSIOLOGY HUB
          </span>
          <h2 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] text-white">
            Master the Science Behind the Breath.
          </h2>
          <p className="mt-6 text-xl md:text-2xl text-white/70 font-serif italic leading-relaxed">
            Deep-dive into peer-reviewed clinical research, normative retention benchmarks, full method tutorials, and our Apple Watch companion architecture.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Card 1: Method Guide */}
          <motion.article 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5 }}
            className="relative rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 sm:p-10 flex flex-col justify-between group hover:border-[#d8d628]/40 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d8d628]/[0.04] rounded-full blur-3xl pointer-events-none group-hover:bg-[#d8d628]/[0.08] transition-colors duration-500" />
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="font-mono text-xs tracking-widest text-[#d8d628] uppercase border border-[#d8d628]/30 rounded-full px-3 py-1">
                  TUTORIAL &bull; 5-STEP PROTOCOL
                </span>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#d8d628] group-hover:scale-110 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-[#d8d628] transition-colors">
                How to Do Wim Hof Breathing
              </h3>
              <p className="mt-4 text-base sm:text-lg text-white/70 font-serif italic leading-relaxed">
                A comprehensive step-by-step masterclass covering cyclic hyperventilation, empty-lung retention technique, and the 15-second recovery breath.
              </p>
            </div>
            <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
              <a 
                href="/guide/wim-hof-method" 
                onClick={(e) => handleLinkClick(e, '/guide/wim-hof-method')}
                className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-white group-hover:text-[#d8d628] font-bold transition-all"
              >
                <span className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-[#d8d628] group-hover:text-black transition-all">
                  <ArrowRight className="w-3.5 h-3.5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                </span>
                Read Full Method Guide &rarr;
              </a>
            </div>
          </motion.article>

          {/* Card 2: Retention Times */}
          <motion.article 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 sm:p-10 flex flex-col justify-between group hover:border-[#49cfff]/40 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#49cfff]/[0.04] rounded-full blur-3xl pointer-events-none group-hover:bg-[#49cfff]/[0.08] transition-colors duration-500" />
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="font-mono text-xs tracking-widest text-[#49cfff] uppercase border border-[#49cfff]/30 rounded-full px-3 py-1">
                  PHYSIOLOGY &bull; ROUND BENCHMARKS
                </span>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#49cfff] group-hover:scale-110 transition-transform">
                  <Activity className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-[#49cfff] transition-colors">
                Retention Times &amp; Physiology
              </h3>
              <p className="mt-4 text-base sm:text-lg text-white/70 font-serif italic leading-relaxed">
                Understand normative breath-hold durations across rounds 1 to 4, hypocapnia, cellular oxygenation, and why retentions naturally extend.
              </p>
            </div>
            <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
              <a 
                href="/retention-times" 
                onClick={(e) => handleLinkClick(e, '/retention-times')}
                className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-white group-hover:text-[#49cfff] font-bold transition-all"
              >
                <span className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-[#49cfff] group-hover:text-black transition-all">
                  <ArrowRight className="w-3.5 h-3.5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                </span>
                Explore Retention Benchmarks &rarr;
              </a>
            </div>
          </motion.article>

          {/* Card 3: Science & Safety */}
          <motion.article 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 sm:p-10 flex flex-col justify-between group hover:border-[#d8d628]/40 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d8d628]/[0.04] rounded-full blur-3xl pointer-events-none group-hover:bg-[#d8d628]/[0.08] transition-colors duration-500" />
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="font-mono text-xs tracking-widest text-[#d8d628] uppercase border border-[#d8d628]/30 rounded-full px-3 py-1">
                  CLINICAL RESEARCH &bull; E-E-A-T
                </span>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#d8d628] group-hover:scale-110 transition-transform">
                  <ShieldAlert className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-[#d8d628] transition-colors">
                Science &amp; Safety Guidelines
              </h3>
              <p className="mt-4 text-base sm:text-lg text-white/70 font-serif italic leading-relaxed">
                Examine the Radboud University trials, respiratory alkalosis, autonomic nervous system modulation, and vital medical contraindications.
              </p>
            </div>
            <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
              <a 
                href="/science-and-safety" 
                onClick={(e) => handleLinkClick(e, '/science-and-safety')}
                className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-white group-hover:text-[#d8d628] font-bold transition-all"
              >
                <span className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-[#d8d628] group-hover:text-black transition-all">
                  <ArrowRight className="w-3.5 h-3.5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                </span>
                Read Clinical Science &rarr;
              </a>
            </div>
          </motion.article>

          {/* Card 4: Apple Watch App */}
          <motion.article 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 sm:p-10 flex flex-col justify-between group hover:border-[#49cfff]/40 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#49cfff]/[0.04] rounded-full blur-3xl pointer-events-none group-hover:bg-[#49cfff]/[0.08] transition-colors duration-500" />
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="font-mono text-xs tracking-widest text-[#49cfff] uppercase border border-[#49cfff]/30 rounded-full px-3 py-1">
                  COMPANION &bull; TACTILE HAPTICS
                </span>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#49cfff] group-hover:scale-110 transition-transform">
                  <Watch className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-[#49cfff] transition-colors">
                Apple Watch Companion App
              </h3>
              <p className="mt-4 text-base sm:text-lg text-white/70 font-serif italic leading-relaxed">
                Experience eyes-free breath pacing with distinct wrist vibration envelopes for inhales, exhales, and retentions with automatic HealthKit logging.
              </p>
            </div>
            <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
              <a 
                href="/apple-watch" 
                onClick={(e) => handleLinkClick(e, '/apple-watch')}
                className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-white group-hover:text-[#49cfff] font-bold transition-all"
              >
                <span className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-[#49cfff] group-hover:text-black transition-all">
                  <ArrowRight className="w-3.5 h-3.5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                </span>
                Explore Watch App &rarr;
              </a>
            </div>
          </motion.article>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-white/10 py-24 md:py-32 px-6 md:px-20 max-w-7xl mx-auto" aria-label="Frequently Asked Questions">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14 md:mb-20"
        >
          <span className="text-[#d8d628] font-mono text-xs tracking-widest border border-[#d8d628]/30 rounded-full px-4 py-1.5 inline-flex">
            FAQ / KNOWLEDGE
          </span>
          <h2 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95]">
            Frequently Asked Questions: Wim Hof Breathwork &amp; Luma App
          </h2>
          <p className="mt-6 text-xl md:text-2xl text-white/70 font-serif italic leading-relaxed">
            Clear, science-backed answers regarding cyclic hyperventilation, breath hold physiology, Apple Watch haptics, and our 100% free philosophy.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
          className="divide-y divide-white/10 border-y border-white/10"
        >
          {faqs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div key={faq.id} className="py-6 md:py-8 transition-colors">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="flex justify-between items-center w-full text-left gap-6 cursor-pointer group"
                  aria-expanded={isOpen}
                  aria-label={`Toggle FAQ: ${faq.question}`}
                >
                  <span className="text-xl md:text-3xl font-bold tracking-tight text-white group-hover:text-[#d8d628] transition-colors">
                    {faq.question}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0 group-hover:border-[#d8d628]/40 group-hover:bg-[#d8d628]/10 transition-all">
                    <ChevronDown
                      className={`w-5 h-5 text-white/70 group-hover:text-[#d8d628] transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#d8d628]' : ''
                      }`}
                    />
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
                      <p className="mt-4 md:mt-6 text-base md:text-xl text-white/75 font-serif italic leading-relaxed max-w-4xl pr-12">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

        <div className="mt-10 text-center">
          <a
            href="/faq"
            onClick={(e) => handleLinkClick(e, '/faq')}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#d8d628] hover:text-white"
          >
            View all 20+ breathwork questions &rarr;
          </a>
        </div>
      </section>

      {/* Pre-Footer CTA */}
      <section className="py-32 px-6 flex flex-col items-center justify-center text-center border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0012da]/10 pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="z-10 flex flex-col items-center"
        >
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6">Start your daily breathwork practice.</h2>
          <p className="text-xl md:text-2xl text-white/70 font-serif italic mb-12 max-w-xl">
            Unlock mental clarity, nervous system resilience, and deep recovery. Zero subscriptions. 100% free forever.
          </p>
          <CTAButton 
            href="https://apps.apple.com/us/app/luma-breathwork-meditation/id6737122722" 
            text="Get Luma Free on App Store" 
            ariaLabel="Get Luma Free for iOS from Apple App Store"
            eventName="App Store PreFooter Click"
          />
        </motion.div>
      </section>

      {/* Massive Marquee Banner */}
      <div className="bg-black border-y border-white/10 overflow-hidden py-12 md:py-16 flex flex-col items-center justify-center relative">
        <div className="luma-marquee-footer whitespace-nowrap text-[10vw] md:text-[8vw] font-bold tracking-tighter leading-none uppercase items-center text-white/20 select-none">
          <span className="pr-[4vw] flex items-center gap-[4vw]">
            Free Forever <img src={logoSrc} loading="lazy" decoding="async" className="w-[6vw] h-[6vw] object-contain shrink-0 opacity-40" alt="Luma App Logo"/> 
            Get Luma <img src={logoSrc} loading="lazy" decoding="async" className="w-[6vw] h-[6vw] object-contain shrink-0 opacity-40" alt="Luma App Logo"/>
          </span>
          <span className="pr-[4vw] flex items-center gap-[4vw]" aria-hidden="true">
            Free Forever <img src={logoSrc} loading="lazy" decoding="async" className="w-[6vw] h-[6vw] object-contain shrink-0 opacity-40" alt=""/> 
            Get Luma <img src={logoSrc} loading="lazy" decoding="async" className="w-[6vw] h-[6vw] object-contain shrink-0 opacity-40" alt=""/>
          </span>
        </div>
      </div>

    </div>
  );
}

export default HomePage;
