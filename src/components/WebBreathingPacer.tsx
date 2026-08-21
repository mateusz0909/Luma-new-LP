import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Sparkles, CheckCircle2 } from 'lucide-react';

type WimHofPhase = 'idle' | 'breathing' | 'retention' | 'recovery' | 'round_complete';

export function WebBreathingPacer() {
  const [phase, setPhase] = useState<WimHofPhase>('idle');
  const [round, setRound] = useState<number>(1);
  const [breathCount, setBreathCount] = useState<number>(1);
  const [totalBreaths, setTotalBreaths] = useState<number>(30);
  const [retentionSeconds, setRetentionSeconds] = useState<number>(0);
  const [recoverySecondsLeft, setRecoverySecondsLeft] = useState<number>(15);
  const [isBreathInhaling, setIsBreathInhaling] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [breathSpeed, setBreathSpeed] = useState<'normal' | 'fast' | 'slow'>('normal');

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Speed durations: inhale, exhale
  const speedConfig = {
    slow: { inhale: 2.5, exhale: 1.8 },
    normal: { inhale: 2.0, exhale: 1.4 },
    fast: { inhale: 1.5, exhale: 1.1 }
  }[breathSpeed];

  // Play gentle 432 Hz Tibetan Bowl bell
  const playSound = (freq = 432, decay = 2.5) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + decay);
    } catch {
      // AudioContext unavailable
    }
  };

  // Phase 1: Guided 30 Rhythmic Breaths
  useEffect(() => {
    if (phase !== 'breathing') return;

    let isCancelled = false;
    let currentBreath = breathCount;
    let isInhaling = true;

    setIsBreathInhaling(true);
    playSound(432, 1.2);

    const stepDuration = isInhaling ? speedConfig.inhale : speedConfig.exhale;

    const interval = setInterval(() => {
      if (isCancelled) return;

      if (isInhaling) {
        // Switch to exhale
        isInhaling = false;
        setIsBreathInhaling(false);
      } else {
        // Exhale finished -> increment breath
        currentBreath += 1;
        if (currentBreath > totalBreaths) {
          // Breaths finished -> transition to Retention
          clearInterval(interval);
          setPhase('retention');
          setRetentionSeconds(0);
          playSound(540, 3.5); // Tibetan bowl strike signaling breath hold
          return;
        }
        setBreathCount(currentBreath);
        isInhaling = true;
        setIsBreathInhaling(true);
        playSound(432, 1.2);
      }
    }, (stepDuration * 1000) / 2);

    return () => {
      isCancelled = true;
      clearInterval(interval);
    };
  }, [phase, breathCount, totalBreaths, breathSpeed, speedConfig]);

  // Phase 2: Retention (Stopwatch on empty lungs)
  useEffect(() => {
    if (phase !== 'retention') return;

    const timer = setInterval(() => {
      setRetentionSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  // Phase 3: Recovery Breath (15s countdown on full lungs)
  useEffect(() => {
    if (phase !== 'recovery') return;

    setRecoverySecondsLeft(15);
    playSound(432, 3.0);

    const timer = setInterval(() => {
      setRecoverySecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setPhase('round_complete');
          playSound(864, 4.0); // Completion harmonic
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  const handleStartSession = () => {
    setPhase('breathing');
    setBreathCount(1);
    setRetentionSeconds(0);
    setRecoverySecondsLeft(15);
  };

  const handleEndRetention = () => {
    setPhase('recovery');
  };

  const handleNextRound = () => {
    setRound((prev) => prev + 1);
    handleStartSession();
  };

  const handleReset = () => {
    setPhase('idle');
    setBreathCount(1);
    setRetentionSeconds(0);
    setRecoverySecondsLeft(15);
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-12 rounded-[36px] bg-gradient-to-b from-white/10 to-white/[0.02] backdrop-blur-2xl border border-white/10 shadow-[0_0_100px_rgba(0,18,218,0.25)] flex flex-col items-center">
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#d8d628] mb-4">
          <Sparkles className="w-3.5 h-3.5" /> Interactive Wim Hof Simulator • 432 Hz
        </div>
        <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
          Wim Hof Method Practice
        </h3>
        <p className="text-base md:text-lg text-white/60 font-serif italic max-w-xl mx-auto mt-3">
          30 deep power breaths, unforced retention on empty lungs, and a 15-second recovery hold.
        </p>
      </div>

      {/* Settings Bar (Round & Breath Target) */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-8 text-xs font-mono">
        <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-neutral-300">
          ROUND: <span className="text-[#d8d628] font-bold">{round}</span>
        </div>

        {phase === 'idle' && (
          <>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-neutral-400">Breaths:</span>
              {[20, 30, 40].map((count) => (
                <button
                  key={count}
                  onClick={() => setTotalBreaths(count)}
                  className={`px-2 py-1 rounded ${totalBreaths === count ? 'bg-[#d8d628] text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
                >
                  {count}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-neutral-400">Tempo:</span>
              {(['slow', 'normal', 'fast'] as const).map((spd) => (
                <button
                  key={spd}
                  onClick={() => setBreathSpeed(spd)}
                  className={`px-2 py-1 rounded capitalize ${breathSpeed === spd ? 'bg-[#d8d628] text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
                >
                  {spd}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Main Breathing Stage */}
      <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center my-4">
        
        {/* Glow Aura */}
        <motion.div
          animate={{
            scale: phase === 'breathing' ? (isBreathInhaling ? 1.3 : 0.85) : phase === 'retention' ? 1.05 : 1,
            opacity: phase === 'idle' ? 0.2 : 0.6
          }}
          transition={{ duration: phase === 'breathing' ? (isBreathInhaling ? speedConfig.inhale : speedConfig.exhale) : 2, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
          style={{
            backgroundColor: phase === 'retention' ? 'rgba(73, 207, 255, 0.35)' : phase === 'recovery' ? 'rgba(216, 214, 40, 0.4)' : 'rgba(0, 18, 218, 0.5)'
          }}
        />

        {/* Dynamic Orb */}
        <motion.div
          animate={{
            scale: phase === 'breathing' ? (isBreathInhaling ? 1.0 : 0.55) : phase === 'recovery' ? 1.05 : phase === 'retention' ? 0.6 : 0.75
          }}
          transition={{
            duration: phase === 'breathing' ? (isBreathInhaling ? speedConfig.inhale : speedConfig.exhale) : 0.6,
            ease: [0.45, 0.05, 0.55, 0.95]
          }}
          className="w-60 h-60 md:w-72 md:h-72 rounded-full border-2 border-white/40 flex flex-col items-center justify-center relative shadow-2xl backdrop-blur-md"
          style={{
            borderColor: phase === 'retention' ? '#49cfff' : phase === 'recovery' ? '#d8d628' : '#ffffff',
            boxShadow: phase === 'retention'
              ? '0 0 60px rgba(73, 207, 255, 0.4), inset 0 0 40px rgba(73, 207, 255, 0.3)'
              : phase === 'recovery'
              ? '0 0 60px rgba(216, 214, 40, 0.4), inset 0 0 40px rgba(216, 214, 40, 0.3)'
              : '0 0 50px rgba(0, 18, 218, 0.4), inset 0 0 30px rgba(0, 18, 218, 0.3)'
          }}
        >
          <AnimatePresence mode="wait">
            {phase === 'idle' && (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                <span className="text-sm font-mono uppercase tracking-widest text-white/50 block">READY</span>
                <span className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-1 block">Round {round}</span>
                <span className="text-xs text-neutral-400 mt-2 block">{totalBreaths} Power Breaths</span>
              </motion.div>
            )}

            {phase === 'breathing' && (
              <motion.div key="breathing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                <span className="text-xl md:text-2xl font-bold tracking-wider text-white uppercase block">
                  {isBreathInhaling ? 'Fully In' : 'Let Go'}
                </span>
                <span className="text-4xl md:text-5xl font-mono font-bold mt-2 text-[#d8d628] block">
                  {breathCount} <span className="text-xl text-white/40">/ {totalBreaths}</span>
                </span>
              </motion.div>
            )}

            {phase === 'retention' && (
              <motion.div key="retention" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center">
                <span className="text-xs font-mono uppercase tracking-widest text-[#49cfff] block">RETENTION</span>
                <span className="text-4xl md:text-6xl font-mono font-bold mt-1 text-white block">
                  {formatTime(retentionSeconds)}
                </span>
                <span className="text-[11px] text-neutral-400 mt-2 block">Hold on empty lungs</span>
              </motion.div>
            )}

            {phase === 'recovery' && (
              <motion.div key="recovery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                <span className="text-xs font-mono uppercase tracking-widest text-[#d8d628] block">RECOVERY INHALE</span>
                <span className="text-4xl md:text-6xl font-mono font-bold mt-1 text-white block">
                  {recoverySecondsLeft}s
                </span>
                <span className="text-[11px] text-neutral-400 mt-2 block">Hold full for 15s</span>
              </motion.div>
            )}

            {phase === 'round_complete' && (
              <motion.div key="complete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center px-4">
                <CheckCircle2 className="w-8 h-8 text-[#d8d628] mx-auto mb-2" />
                <span className="text-lg font-bold text-white block">Round {round} Complete!</span>
                <span className="text-xs font-mono text-[#49cfff] mt-1 block">Hold: {formatTime(retentionSeconds)}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Action Controls */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
        {phase === 'idle' && (
          <button
            onClick={handleStartSession}
            className="px-8 py-3.5 rounded-full bg-white text-black font-bold font-mono text-xs sm:text-sm tracking-wider uppercase flex items-center gap-3 hover:bg-[#d8d628] hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            <Play className="w-4 h-4 fill-current" /> Start Wim Hof Session
          </button>
        )}

        {phase === 'breathing' && (
          <button
            onClick={() => {
              setPhase('retention');
              setRetentionSeconds(0);
              playSound(540, 3.5);
            }}
            className="px-6 py-3 rounded-full bg-[#49cfff] text-black font-bold font-mono text-xs uppercase tracking-wider hover:bg-white transition-all shadow-lg"
          >
            Skip to Retention Hold →
          </button>
        )}

        {phase === 'retention' && (
          <button
            onClick={handleEndRetention}
            className="px-8 py-3.5 rounded-full bg-[#d8d628] text-black font-bold font-mono text-xs sm:text-sm tracking-wider uppercase hover:bg-white hover:scale-105 transition-all shadow-[0_0_40px_rgba(216,214,40,0.4)]"
          >
            Take Recovery Breath (Inhale)
          </button>
        )}

        {phase === 'round_complete' && (
          <button
            onClick={handleNextRound}
            className="px-8 py-3.5 rounded-full bg-white text-black font-bold font-mono text-xs sm:text-sm tracking-wider uppercase flex items-center gap-3 hover:bg-[#d8d628] hover:scale-105 transition-all shadow-lg"
          >
            Start Round {round + 1} →
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
          title={soundEnabled ? 'Mute 432 Hz Tibetan Bowl' : 'Unmute 432 Hz Tibetan Bowl'}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </div>

      {/* CTA Footer */}
      <div className="mt-10 pt-6 border-t border-white/10 w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
        <span>Practice with eyes closed using real-time Apple Watch haptic guidance:</span>
        <a
          href="https://apps.apple.com/us/app/luma-breathwork-meditation/id6737122722"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs uppercase tracking-widest text-[#d8d628] hover:underline font-bold"
        >
          Download Free on iOS & Apple Watch →
        </a>
      </div>

    </div>
  );
}
