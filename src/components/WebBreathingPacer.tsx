import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Volume2, VolumeX, RotateCcw, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

type WimHofPhase = 'idle' | 'breathing' | 'retention' | 'recovery' | 'round_complete';

export function WebBreathingPacer() {
  const [phase, setPhase] = useState<WimHofPhase>('idle');
  const [round, setRound] = useState<number>(1);
  const [breathCount, setBreathCount] = useState<number>(1);
  const [totalBreaths, setTotalBreaths] = useState<number>(30);
  const [isInhaling, setIsInhaling] = useState<boolean>(true);
  const [retentionSec, setRetentionSec] = useState<number>(0);
  const [recoverySecLeft, setRecoverySecLeft] = useState<number>(15);
  const [lastHoldTime, setLastHoldTime] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [tempo, setTempo] = useState<'slow' | 'normal' | 'fast'>('normal');

  // Timings in seconds
  const timings = {
    slow: { inhale: 2.4, exhale: 1.8 },
    normal: { inhale: 1.9, exhale: 1.3 },
    fast: { inhale: 1.4, exhale: 1.0 }
  }[tempo];

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Safe sound synthesizer
  const playTone = useCallback((freq: number, duration: number, gainVal: number = 0.15) => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(gainVal, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch {
      // Audio context suppressed
    }
  }, [soundEnabled, getAudioContext]);

  // Tibetan Singing Bowl Harmonic Chime
  const playBowlGong = useCallback((baseFreq = 432) => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      // 3 Overtones for natural Tibetan bowl resonance
      const partials = [
        { freq: baseFreq, gain: 0.18, decay: 3.5 },
        { freq: baseFreq * 2.0, gain: 0.08, decay: 2.2 },
        { freq: baseFreq * 2.76, gain: 0.04, decay: 1.8 },
      ];

      partials.forEach(({ freq, gain: gVal, decay }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(gVal, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + decay + 0.1);
      });
    } catch {
      // Audio suppressed
    }
  }, [soundEnabled, getAudioContext]);

  // ==========================================
  // PHASE 1: GUIDED POWER BREATHING LOOP
  // ==========================================
  useEffect(() => {
    if (phase !== 'breathing') return;

    let breath = 1;
    let inhaling = true;
    let timerId: ReturnType<typeof setTimeout>;

    setBreathCount(1);
    setIsInhaling(true);
    playTone(432, 0.4, 0.12); // Inhale chime

    const runStep = () => {
      if (inhaling) {
        // Was inhaling, now switch to exhale
        inhaling = false;
        setIsInhaling(false);
        playTone(324, 0.35, 0.08); // Exhale tone
        timerId = setTimeout(runStep, timings.exhale * 1000);
      } else {
        // Was exhaling, increment breath
        breath += 1;
        if (breath > totalBreaths) {
          // Finished all breaths -> Move to Retention
          setPhase('retention');
          setRetentionSec(0);
          playBowlGong(432); // Resonant gong to signal breath hold
          return;
        }

        setBreathCount(breath);
        inhaling = true;
        setIsInhaling(true);
        playTone(432, 0.4, 0.12);
        timerId = setTimeout(runStep, timings.inhale * 1000);
      }
    };

    timerId = setTimeout(runStep, timings.inhale * 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [phase, totalBreaths, timings, playTone, playBowlGong]);

  // ==========================================
  // PHASE 2: RETENTION TIMER (UPWARD STOPWATCH)
  // ==========================================
  useEffect(() => {
    if (phase !== 'retention') return;

    const startTime = performance.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((performance.now() - startTime) / 1000);
      setRetentionSec(elapsed);
    }, 250);

    return () => clearInterval(interval);
  }, [phase]);

  // ==========================================
  // PHASE 3: RECOVERY HOLD (15S COUNTDOWN)
  // ==========================================
  useEffect(() => {
    if (phase !== 'recovery') return;

    setRecoverySecLeft(15);
    playBowlGong(540); // Uplifting recovery chime

    const startTime = performance.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((performance.now() - startTime) / 1000);
      const remaining = Math.max(0, 15 - elapsed);
      setRecoverySecLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        setPhase('round_complete');
        playBowlGong(864); // Completion harmonic chime
      }
    }, 250);

    return () => clearInterval(interval);
  }, [phase, playBowlGong]);

  // Handlers
  const handleStart = () => {
    getAudioContext();
    setPhase('breathing');
  };

  const handleEndRetention = () => {
    setLastHoldTime(retentionSec);
    setPhase('recovery');
  };

  const handleNextRound = () => {
    setRound((r) => r + 1);
    setPhase('breathing');
  };

  const handleReset = () => {
    setPhase('idle');
    setBreathCount(1);
    setRetentionSec(0);
    setRecoverySecLeft(15);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-12 rounded-[36px] bg-gradient-to-b from-white/10 to-white/[0.02] backdrop-blur-2xl border border-white/10 shadow-[0_0_100px_rgba(0,18,218,0.25)] flex flex-col items-center select-none">
      
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#d8d628] mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Wim Hof Method Session
        </div>
        <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
          Guided Wim Hof Practice
        </h3>
        <p className="text-sm md:text-base text-white/60 font-serif italic max-w-lg mx-auto mt-2">
          30 deep power breaths, empty lung retention, and a 15-second recovery hold.
        </p>
      </div>

      {/* Round Pill & Settings */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6 font-mono text-xs">
        <div className="px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-white font-bold">
          ROUND {round}
        </div>

        {phase === 'idle' && (
          <>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <span className="text-neutral-400">Breaths:</span>
              {[20, 30, 40].map((count) => (
                <button
                  key={count}
                  onClick={() => setTotalBreaths(count)}
                  className={`px-2 py-0.5 rounded-md transition-all ${
                    totalBreaths === count ? 'bg-[#d8d628] text-black font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <span className="text-neutral-400">Tempo:</span>
              {(['slow', 'normal', 'fast'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTempo(t)}
                  className={`px-2 py-0.5 rounded-md capitalize transition-all ${
                    tempo === t ? 'bg-[#d8d628] text-black font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Center Breathing Orb Container */}
      <div className="relative w-72 h-72 md:w-88 md:h-88 flex items-center justify-center my-4">
        
        {/* Dynamic Glow Aura */}
        <motion.div
          animate={{
            scale: phase === 'breathing' ? (isInhaling ? 1.35 : 0.8) : phase === 'retention' ? 1.05 : phase === 'recovery' ? 1.25 : 0.9,
            opacity: phase === 'idle' ? 0.2 : 0.6
          }}
          transition={{
            duration: phase === 'breathing' ? (isInhaling ? timings.inhale : timings.exhale) : 1.2,
            ease: 'easeInOut'
          }}
          className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
          style={{
            backgroundColor:
              phase === 'retention'
                ? 'rgba(73, 207, 255, 0.4)'
                : phase === 'recovery'
                ? 'rgba(216, 214, 40, 0.45)'
                : 'rgba(0, 18, 218, 0.55)'
          }}
        />

        {/* Dynamic Orb */}
        <motion.div
          animate={{
            scale:
              phase === 'breathing'
                ? (isInhaling ? 1.0 : 0.55)
                : phase === 'recovery'
                ? 1.05
                : phase === 'retention'
                ? 0.65
                : 0.8
          }}
          transition={{
            duration: phase === 'breathing' ? (isInhaling ? timings.inhale : timings.exhale) : 0.8,
            ease: [0.45, 0.05, 0.55, 0.95]
          }}
          className="w-56 h-56 md:w-68 md:h-68 rounded-full border-2 border-white/40 flex flex-col items-center justify-center relative shadow-2xl backdrop-blur-md"
          style={{
            borderColor: phase === 'retention' ? '#49cfff' : phase === 'recovery' ? '#d8d628' : '#ffffff',
            boxShadow:
              phase === 'retention'
                ? '0 0 60px rgba(73, 207, 255, 0.4), inset 0 0 35px rgba(73, 207, 255, 0.3)'
                : phase === 'recovery'
                ? '0 0 60px rgba(216, 214, 40, 0.4), inset 0 0 35px rgba(216, 214, 40, 0.3)'
                : '0 0 50px rgba(0, 18, 218, 0.4), inset 0 0 25px rgba(0, 18, 218, 0.3)'
          }}
        >
          <AnimatePresence mode="wait">
            
            {/* 1. IDLE STATE */}
            {phase === 'idle' && (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                <span className="text-xs font-mono uppercase tracking-widest text-white/50 block">READY</span>
                <span className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-1 block">Round {round}</span>
                <span className="text-xs text-neutral-400 mt-1 block">{totalBreaths} Breaths</span>
              </motion.div>
            )}

            {/* 2. BREATHING STATE */}
            {phase === 'breathing' && (
              <motion.div key="breathing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                <span className="text-lg md:text-xl font-bold tracking-wider text-white uppercase block">
                  {isInhaling ? 'Fully In' : 'Let Go'}
                </span>
                <span className="text-4xl md:text-5xl font-mono font-bold mt-1 text-[#d8d628] block">
                  {breathCount} <span className="text-lg text-white/40">/ {totalBreaths}</span>
                </span>
              </motion.div>
            )}

            {/* 3. RETENTION STATE */}
            {phase === 'retention' && (
              <motion.div key="retention" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#49cfff] block">RETENTION</span>
                <span className="text-4xl md:text-6xl font-mono font-bold mt-1 text-white block">
                  {formatTimer(retentionSec)}
                </span>
                <span className="text-[11px] text-neutral-400 mt-1 block">Hold on empty lungs</span>
              </motion.div>
            )}

            {/* 4. RECOVERY STATE */}
            {phase === 'recovery' && (
              <motion.div key="recovery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#d8d628] block">RECOVERY INHALE</span>
                <span className="text-4xl md:text-6xl font-mono font-bold mt-1 text-white block">
                  {recoverySecLeft}s
                </span>
                <span className="text-[11px] text-neutral-400 mt-1 block">Hold full for 15s</span>
              </motion.div>
            )}

            {/* 5. ROUND COMPLETE */}
            {phase === 'round_complete' && (
              <motion.div key="complete" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center px-4">
                <CheckCircle2 className="w-8 h-8 text-[#d8d628] mx-auto mb-1.5" />
                <span className="text-base font-bold text-white block">Round {round} Complete!</span>
                <span className="text-xs font-mono text-[#49cfff] mt-1 block">Hold: {formatTimer(lastHoldTime)}</span>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3.5 mt-6">
        
        {phase === 'idle' && (
          <button
            onClick={handleStart}
            className="px-8 py-3.5 rounded-full bg-white text-black font-bold font-mono text-xs sm:text-sm tracking-wider uppercase flex items-center gap-3 hover:bg-[#d8d628] hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            <Play className="w-4 h-4 fill-current" /> Start Wim Hof Session
          </button>
        )}

        {phase === 'breathing' && (
          <button
            onClick={() => {
              setPhase('retention');
              setRetentionSec(0);
              playBowlGong(432);
            }}
            className="px-6 py-3 rounded-full bg-[#49cfff] text-black font-bold font-mono text-xs uppercase tracking-wider hover:bg-white transition-all shadow-lg flex items-center gap-2"
          >
            Skip to Breath Hold <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {phase === 'retention' && (
          <button
            onClick={handleEndRetention}
            className="px-8 py-4 rounded-full bg-[#d8d628] text-black font-bold font-mono text-xs sm:text-sm tracking-wider uppercase hover:bg-white hover:scale-105 transition-all shadow-[0_0_40px_rgba(216,214,40,0.4)]"
          >
            Take Recovery Breath (Inhale)
          </button>
        )}

        {phase === 'round_complete' && (
          <button
            onClick={handleNextRound}
            className="px-8 py-3.5 rounded-full bg-white text-black font-bold font-mono text-xs sm:text-sm tracking-wider uppercase flex items-center gap-3 hover:bg-[#d8d628] hover:scale-105 transition-all shadow-lg"
          >
            Start Round {round + 1} <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {phase !== 'idle' && (
          <button
            onClick={handleReset}
            className="p-3.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Reset Session"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-3.5 rounded-full border transition-colors ${
            soundEnabled ? 'bg-white/10 border-white/20 text-white' : 'bg-white/5 border-white/10 text-neutral-500'
          }`}
          title={soundEnabled ? 'Mute 432 Hz Sound' : 'Unmute 432 Hz Sound'}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </div>

    </div>
  );
}

export default WebBreathingPacer;
