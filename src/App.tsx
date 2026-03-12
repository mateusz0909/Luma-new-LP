import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const screenshots = [
  ...Array.from({ length: 10 }, (_, i) => `/screenshots/${i + 1}.png`),
  '/screenshots/appleHealthScreen.png',
  '/screenshots/haptics.png',
  '/screenshots/homeWidgets.png'
];

const CTAButton = ({ href, text, className = "" }: { href: string, text: string, className?: string }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`group relative inline-flex items-center gap-6 rounded-full p-2 pr-8 bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-700 hover:bg-white hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:-translate-y-1 ${className}`}
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
  <div className="relative w-[280px] md:w-[320px] aspect-[1170/2532] rounded-[48px] p-2 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-3xl border border-white/10 shadow-[0_0_100px_rgba(0,18,218,0.4)]">
    <div className="absolute top-4 inset-x-0 mx-auto w-24 h-7 bg-black rounded-full z-50 border border-white/10" />
    <div className="w-full h-full bg-black rounded-[40px] overflow-hidden relative border border-white/5 shadow-inner">
      {children}
    </div>
  </div>
);

export default function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  // Calculate which section is active (0, 1, or 2) based on scroll
  const activeSection = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 2]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    return activeSection.on("change", (latest) => {
      setActiveIndex(Math.min(2, Math.max(0, Math.round(latest))));
    });
  }, [activeSection]);

  // Map the 3 sections to specific screenshots: Home, Breathing, Stats
  const sectionImages = [screenshots[5], screenshots[6], screenshots[3]];

  return (
    <div className="bg-black text-white selection:bg-[#d8d628] selection:text-black font-sans min-h-screen">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full px-6 py-4 md:px-10 md:py-5 flex justify-between items-center z-50 bg-black/30 backdrop-blur-xl border-b border-white/10 shadow-sm">
        <div className="flex items-center gap-3">
          <img src="/screenshots/logo.webp" alt="Luma Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
          <div className="font-bold text-2xl tracking-tighter">LUMA.</div>
        </div>
        <a href="https://apps.apple.com/us/app/luma-breathwork-meditation/id6737122722" target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-widest hover:text-[#d8d628] transition-colors flex items-center gap-2">
          Download <ArrowRight className="w-4 h-4" />
        </a>
      </nav>

      {/* Hero Section */}
      <section className="h-[100svh] relative flex flex-col items-center justify-center overflow-hidden">
        {/* Breathing Orbs */}
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-[#0012da] blur-[120px] md:blur-[180px] mix-blend-screen"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-[#d8d628] blur-[100px] md:blur-[150px] mix-blend-screen"
        />
        
        <div className="z-10 flex flex-col items-center w-full px-4">
          <div className="text-center mix-blend-difference mb-12">
            <h1 className="text-[22vw] md:text-[18vw] leading-[0.75] font-bold tracking-tighter uppercase text-white">
              Breathe.
            </h1>
            <p className="font-serif italic text-2xl md:text-5xl mt-8 md:mt-12 text-white/90">
              The Iceman method, reimagined.
            </p>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <CTAButton href="https://apps.apple.com/us/app/luma-breathwork-meditation/id6737122722" text="Download for iOS" />
          </motion.div>
        </div>
      </section>

      {/* Editorial Statement */}
      <section className="py-[15vh] px-6 md:px-20 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          className="text-4xl md:text-6xl lg:text-8xl font-serif leading-[1.1] tracking-tight"
        >
          We believe breath is the ultimate tool for human optimization. <br className="hidden md:block"/>
          <span className="text-white/30">No paywalls. No noise. Just pure focus.</span>
        </motion.h2>
      </section>

      {/* Sticky Scroll Showcase */}
      <section ref={containerRef} className="relative px-6 md:px-20 max-w-7xl mx-auto flex flex-col md:flex-row gap-10 pb-[10vh]">
        
        {/* Left: Scrolling Text Blocks */}
        <div className="w-full md:w-1/2 flex flex-col gap-[40vh] pt-[10vh] pb-[40vh] z-10">
          
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 40 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ margin: "-40%" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            <span className="text-[#d8d628] font-mono text-xs tracking-widest border border-[#d8d628]/30 rounded-full px-4 py-1.5 w-fit">01 / RITUAL</span>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">Your daily<br/>practice.</h3>
            <p className="text-xl md:text-3xl text-white/50 font-serif italic leading-relaxed">
              Fully customizable rounds, retention times, and recovery holds. Tailored to your exact needs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 40 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ margin: "-40%" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            <span className="text-[#d8d628] font-mono text-xs tracking-widest border border-[#d8d628]/30 rounded-full px-4 py-1.5 w-fit">02 / IMMERSION</span>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">Deep<br/>focus.</h3>
            <p className="text-xl md:text-3xl text-white/50 font-serif italic leading-relaxed">
              Immersive audio, haptic feedback, and distraction-free timers. Add your own custom tracks.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 40 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ margin: "-40%" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            <span className="text-[#d8d628] font-mono text-xs tracking-widest border border-[#d8d628]/30 rounded-full px-4 py-1.5 w-fit">03 / INSIGHT</span>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">Track<br/>everything.</h3>
            <p className="text-xl md:text-3xl text-white/50 font-serif italic leading-relaxed">
              Detailed analytics, best holds, and streak tracking. Watch yourself grow over time.
            </p>
          </motion.div>

        </div>

        {/* Right: Sticky Phone Mockup */}
        <div className="w-full md:w-1/2 h-[100vh] sticky top-0 flex items-center justify-center md:justify-end pointer-events-none">
          <motion.div style={{ y: y1 }}>
            <PhoneFrame>
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  src={sectionImages[activeIndex]}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                  alt={`App screenshot ${activeIndex + 1}`}
                />
              </AnimatePresence>
            </PhoneFrame>
          </motion.div>
        </div>
      </section>

      {/* Horizontal Gallery Section */}
      <section className="py-24 overflow-hidden border-t border-white/10 bg-white/[0.02]">
        <div className="px-6 md:px-20 max-w-7xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">The Interface.</h2>
          <p className="text-xl text-white/50 font-serif italic">Designed for clarity and focus.</p>
        </div>
        
        {/* Scrolling Track */}
        <div className="relative w-full flex overflow-x-hidden">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            className="flex gap-8 px-8"
            style={{ width: "max-content" }}
          >
            {/* Double the array to create a seamless loop */}
            {[...screenshots, ...screenshots].map((src, idx) => (
              <div key={idx} className="shrink-0">
                <PhoneFrame>
                  <img src={src} alt={`Screenshot ${idx}`} className="w-full h-full object-cover" />
                </PhoneFrame>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Brutalist Grid Section */}
      <section className="border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 border-b border-white/10">
          <div className="p-12 md:p-20 flex flex-col gap-6 hover:bg-[#0012da] transition-colors duration-500 group relative overflow-hidden">
            <div className="z-10 flex flex-col gap-6 w-full md:w-2/3">
              <img src="/screenshots/applewatchicon.png" alt="Apple Watch Icon" className="w-48 h-16 object-contain object-left group-hover:scale-110 transition-transform duration-500 invert origin-left" />
              <h4 className="text-3xl font-bold tracking-tight">Apple Watch</h4>
              <p className="text-lg text-white/50 group-hover:text-white/80 transition-colors font-serif italic">Standalone sessions directly from your wrist. Leave the phone behind.</p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-[50%] md:w-[40%] rotate-[-15deg] group-hover:rotate-[-5deg] group-hover:-translate-y-4 transition-all duration-700 ease-out opacity-20 group-hover:opacity-100 drop-shadow-2xl pointer-events-none">
              <img src="/screenshots/watchscreen.png" alt="Apple Watch" className="w-full h-auto object-contain rounded-[2rem] border-4 border-white/10" />
            </div>
          </div>
          <div className="p-12 md:p-20 flex flex-col gap-6 hover:bg-[#0012da] transition-colors duration-500 group relative overflow-hidden">
            <div className="z-10 flex flex-col gap-6 w-full md:w-2/3">
              <img src="/screenshots/liveactivityIcon.png" alt="Widgets Icon" className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-500" />
              <h4 className="text-3xl font-bold tracking-tight">Widgets & Live Activities</h4>
              <p className="text-lg text-white/50 group-hover:text-white/80 transition-colors font-serif italic">Track your session on the Lock Screen and customize your Home Screen with beautiful iOS widgets.</p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-[50%] md:w-[40%] rotate-[15deg] group-hover:rotate-[5deg] group-hover:-translate-y-4 transition-all duration-700 ease-out opacity-20 group-hover:opacity-100 drop-shadow-2xl pointer-events-none">
              <img src="/screenshots/homeWidgets.png" alt="Widgets" className="w-full h-auto object-contain rounded-[2rem] border-4 border-white/10" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="p-12 md:p-20 flex flex-col gap-6 hover:bg-[#0012da] transition-colors duration-500 group relative overflow-hidden">
            <div className="z-10 flex flex-col gap-6 w-full md:w-2/3">
              <img src="/screenshots/AHicon.png" alt="Apple Health Icon" className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-500" />
              <h4 className="text-3xl font-bold tracking-tight">Apple Health</h4>
              <p className="text-lg text-white/50 group-hover:text-white/80 transition-colors font-serif italic">Seamlessly sync your mindful minutes and heart rate data.</p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-[50%] md:w-[40%] rotate-[-15deg] group-hover:rotate-[-5deg] group-hover:-translate-y-4 transition-all duration-700 ease-out opacity-20 group-hover:opacity-100 drop-shadow-2xl pointer-events-none">
              <img src="/screenshots/appleHealthScreen.png" alt="Apple Health" className="w-full h-auto object-contain rounded-[2rem] border-4 border-white/10" />
            </div>
          </div>
          <div className="p-12 md:p-20 flex flex-col gap-6 hover:bg-[#0012da] transition-colors duration-500 group relative overflow-hidden">
            <div className="z-10 flex flex-col gap-6 w-full md:w-2/3">
              <img src="/screenshots/hapticsIcon.png" alt="Haptics Icon" className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-500" />
              <h4 className="text-3xl font-bold tracking-tight">Haptics</h4>
              <p className="text-lg text-white/50 group-hover:text-white/80 transition-colors font-serif italic">Feel every breath with custom-designed haptic feedback patterns.</p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-[50%] md:w-[40%] rotate-[15deg] group-hover:rotate-[5deg] group-hover:-translate-y-4 transition-all duration-700 ease-out opacity-20 group-hover:opacity-100 drop-shadow-2xl pointer-events-none">
              <img src="/screenshots/haptics.png" alt="Haptics" className="w-full h-auto object-contain rounded-[2rem] border-4 border-white/10" />
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Footer CTA */}
      <section className="py-32 px-6 flex flex-col items-center justify-center text-center border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0012da]/10 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="z-10 flex flex-col items-center"
        >
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6">Start breathing.</h2>
          <p className="text-xl md:text-2xl text-white/50 font-serif italic mb-12 max-w-xl">
            Join thousands of others optimizing their mind and body. No paywalls. Free forever.
          </p>
          <CTAButton href="https://apps.apple.com/us/app/luma-breathwork-meditation/id6737122722" text="Get Luma Free" />
        </motion.div>
      </section>

      {/* Massive Marquee Footer */}
      <footer className="bg-[#d8d628] text-[#0012da] overflow-hidden pt-32 pb-24 flex flex-col items-center justify-center relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap text-[15vw] font-bold tracking-tighter leading-none uppercase items-center"
        >
          <span className="pr-[4vw] flex items-center gap-[4vw]">Free Forever <img src="/screenshots/logo.webp" className="w-[10vw] h-[10vw] object-contain shrink-0" alt="Logo"/> Get Luma <img src="/screenshots/logo.webp" className="w-[10vw] h-[10vw] object-contain shrink-0" alt="Logo"/></span>
          <span className="pr-[4vw] flex items-center gap-[4vw]">Free Forever <img src="/screenshots/logo.webp" className="w-[10vw] h-[10vw] object-contain shrink-0" alt="Logo"/> Get Luma <img src="/screenshots/logo.webp" className="w-[10vw] h-[10vw] object-contain shrink-0" alt="Logo"/></span>
        </motion.div>

        <div className="absolute bottom-6 w-full px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs font-bold text-[#0012da]">
          <span>© {new Date().getFullYear()} LUMA BREATHWORK</span>
          <div className="flex gap-8 tracking-widest">
            <a href="#" className="hover:text-black transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-black transition-colors">TERMS</a>
            <a href="#" className="hover:text-black transition-colors">CONTACT</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
