import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Volume2, VolumeX, RotateCcw, Sparkles, CheckCircle2, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';

export type WimHofPhase = 'idle' | 'breathing' | 'retention' | 'recovery' | 'round_complete';

export function WebBreathingPacer() {
  const [phase, setPhase] = useState<WimHofPhase>('idle');
  const [round, setRound] = useState<number>(1);
  const [breathCount, setBreathCount] = useState<number>(1);
  const [totalBreaths, setTotalBreaths] = useState<number>(30);
  const [isInhaling, setIsInhaling] = useState<boolean>(true);
  const [retentionSec, setRetentionSec] = useState<number>(0);
  const [recoverySecLeft, setRecoverySecLeft] = useState<number>(15);
  const [roundHistory, setRoundHistory] = useState<Array<{ round: number; holdSec: number }>>([]);
  const [lastHoldTime, setLastHoldTime] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [tempo, setTempo] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const wakeLockRef = useRef<any>(null);

  // Tempo configuration (seconds)
  const tempoConfig = useMemo(() => ({
    slow: { inhale: 2.2, exhale: 1.6 },
    normal: { inhale: 1.8, exhale: 1.2 },
    fast: { inhale: 1.4, exhale: 1.0 }
  }), []);

  const currentTiming = tempoConfig[tempo];

  // Screen Wake Lock to prevent screen sleep during long breath holds
  useEffect(() => {
    const requestWakeLock = async () => {
      if ('wakeLock' in navigator && (phase === 'breathing' || phase === 'retention' || phase === 'recovery')) {
        try {
          if (!wakeLockRef.current) {
            wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
          }
        } catch {
          // Wake lock request failed / suppressed
        }
      } else if (wakeLockRef.current && (phase === 'idle' || phase === 'round_complete')) {
        try {
          await wakeLockRef.current.release();
          wakeLockRef.current = null;
        } catch {
          // release suppressed
        }
      }
    };

    requestWakeLock();

    return () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release().catch(() => {});
        wakeLockRef.current = null;
      }
    };
  }, [phase]);

  // Haptic feedback trigger
  const triggerHaptic = useCallback((pattern: number | number[]) => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Suppress
      }
    }
  }, []);

  // =========================================================
  // Web Audio Context & High-End Acoustic Tibetan Singing Bowl
  // =========================================================
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudioContext = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          audioCtxRef.current = new AudioCtx();
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
    } catch {
      // AudioContext unavailable
    }
  }, []);

  const playTibetanBowl = useCallback((baseFreq = 216, decay = 4.0, volume = 0.25) => {
    if (!soundEnabled) return;
    try {
      initAudioContext();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const now = ctx.currentTime;

      // Master output with gentle lowpass filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(850, now);
      filter.Q.setValueAtTime(1.5, now);

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, now);

      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      // Acoustic Tibetan Bowl Partials (Fundamental + Warm Overtones + Sub-bass)
      const harmonics = [
        { freq: baseFreq, gain: 0.7, d: decay },
        { freq: baseFreq * 0.5, gain: 0.45, d: decay * 1.2 },
        { freq: baseFreq * 2.01, gain: 0.3, d: decay * 0.8 },
        { freq: baseFreq * 2.76, gain: 0.15, d: decay * 0.6 },
        { freq: baseFreq * 4.04, gain: 0.06, d: decay * 0.4 },
      ];

      harmonics.forEach(({ freq, gain: g, d }) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gainNode.gain.setValueAtTime(0.0001, now);
        gainNode.gain.exponentialRampToValueAtTime(g, now + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + d);

        osc.connect(gainNode);
        gainNode.connect(filter);

        osc.start(now);
        osc.stop(now + d + 0.1);
      });
    } catch {
      // Audio suppressed
    }
  }, [soundEnabled, initAudioContext]);

  const playBreathChime = useCallback((isInhale: boolean) => {
    if (!soundEnabled) return;
    try {
      initAudioContext();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const now = ctx.currentTime;
      const freq = isInhale ? 288 : 216;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.05, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      osc.connect(gain);
      gain.connect(filter);
      filter.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.7);
    } catch {
      // Audio suppressed
    }
  }, [soundEnabled, initAudioContext]);

  // =========================================================
  // State Machine & Breathing Loop
  // =========================================================
  const stateRef = useRef({
    phase: 'idle' as WimHofPhase,
    breath: 1,
    totalBreaths: 30,
    isInhaling: true,
    timing: currentTiming,
    timerId: null as ReturnType<typeof setTimeout> | null,
  });

  stateRef.current.phase = phase;
  stateRef.current.totalBreaths = totalBreaths;
  stateRef.current.timing = currentTiming;

  useEffect(() => {
    if (phase !== 'breathing') {
      if (stateRef.current.timerId) {
        clearTimeout(stateRef.current.timerId);
        stateRef.current.timerId = null;
      }
      return;
    }

    stateRef.current.breath = 1;
    stateRef.current.isInhaling = true;
    setBreathCount(1);
    setIsInhaling(true);
    playTibetanBowl(216, 3.0, 0.2);

    const scheduleNext = () => {
      if (stateRef.current.phase !== 'breathing') return;

      const { isInhaling: currentlyInhaling, breath: currBreath, totalBreaths: maxBreaths, timing } = stateRef.current;

      if (currentlyInhaling) {
        stateRef.current.isInhaling = false;
        setIsInhaling(false);
        playBreathChime(false);
        stateRef.current.timerId = setTimeout(scheduleNext, timing.exhale * 1000);
      } else {
        const nextBreath = currBreath + 1;

        if (nextBreath > maxBreaths) {
          setPhase('retention');
          setRetentionSec(0);
          playTibetanBowl(216, 4.5, 0.35);
          return;
        }

        stateRef.current.breath = nextBreath;
        stateRef.current.isInhaling = true;
        setBreathCount(nextBreath);
        setIsInhaling(true);
        playBreathChime(true);
        stateRef.current.timerId = setTimeout(scheduleNext, timing.inhale * 1000);
      }
    };

    stateRef.current.timerId = setTimeout(scheduleNext, currentTiming.inhale * 1000);

    return () => {
      if (stateRef.current.timerId) {
        clearTimeout(stateRef.current.timerId);
        stateRef.current.timerId = null;
      }
    };
  }, [phase, currentTiming, playTibetanBowl, playBreathChime]);

  // Retention Stopwatch
  useEffect(() => {
    if (phase !== 'retention') return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setRetentionSec(elapsed);
    }, 200);

    return () => clearInterval(interval);
  }, [phase]);

  // Recovery Countdown (15s)
  useEffect(() => {
    if (phase !== 'recovery') return;

    setRecoverySecLeft(15);
    playTibetanBowl(288, 3.5, 0.3);

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, 15 - elapsed);
      setRecoverySecLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        setPhase('round_complete');
        playTibetanBowl(432, 4.0, 0.3);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [phase, playTibetanBowl]);

  // UI Handlers
  const handleStart = useCallback(() => {
    initAudioContext();
    setPhase('breathing');
  }, [initAudioContext]);

  const handleEndRetention = useCallback(() => {
    triggerHaptic(100);
    setLastHoldTime(retentionSec);
    setRoundHistory((prev) => [...prev.filter((p) => p.round !== round), { round, holdSec: retentionSec }]);
    setPhase('recovery');
  }, [retentionSec, round, triggerHaptic]);

  const handleNextRound = useCallback(() => {
    setRound((r) => r + 1);
    setPhase('breathing');
  }, []);

  const handleReset = useCallback(() => {
    if (stateRef.current.timerId) {
      clearTimeout(stateRef.current.timerId);
      stateRef.current.timerId = null;
    }
    setPhase('idle');
    setBreathCount(1);
    setIsInhaling(true);
    setRetentionSec(0);
    setRecoverySecLeft(15);
  }, []);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard Shortcuts (Space, M, R)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (phase === 'idle') handleStart();
        else if (phase === 'breathing') {
          if (stateRef.current.timerId) {
            clearTimeout(stateRef.current.timerId);
            stateRef.current.timerId = null;
          }
          setPhase('retention');
          setRetentionSec(0);
          playTibetanBowl(216, 4.5, 0.35);
        } else if (phase === 'retention') handleEndRetention();
        else if (phase === 'round_complete') handleNextRound();
      } else if (e.key === 'm' || e.key === 'M') {
        setSoundEnabled((prev) => !prev);
      } else if (e.key === 'r' || e.key === 'R') {
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, handleStart, handleEndRetention, handleNextRound, handleReset, playTibetanBowl]);

  const formatTimer = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Progress calculations for the SVG Gauge
  const progressRatio = useMemo(() => {
    if (phase === 'breathing') {
      return breathCount / totalBreaths;
    }
    if (phase === 'recovery') {
      return (15 - recoverySecLeft) / 15;
    }
    if (phase === 'round_complete') {
      return 1;
    }
    return 0;
  }, [phase, breathCount, totalBreaths, recoverySecLeft]);

  const circumference = 2 * Math.PI * 136; // radius 136
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <div
      ref={containerRef}
      className={`w-full max-w-4xl mx-auto rounded-[32px] sm:rounded-[40px] bg-gradient-to-b from-[#111116] to-[#08080a] border border-white/10 shadow-[0_0_80px_rgba(0,18,218,0.2)] flex flex-col items-center justify-between select-none relative overflow-hidden transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none max-w-none p-6 sm:p-12 justify-center gap-8' : 'p-6 sm:p-10 md:p-12'
      }`}
    >
      {/* Subtle Background Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000 opacity-40 blur-[100px]"
        style={{
          background:
            phase === 'retention'
              ? 'radial-gradient(circle at center, rgba(73,207,255,0.3) 0%, transparent 70%)'
              : phase === 'recovery'
              ? 'radial-gradient(circle at center, rgba(216,214,40,0.35) 0%, transparent 70%)'
              : phase === 'round_complete'
              ? 'radial-gradient(circle at center, rgba(74,222,128,0.3) 0%, transparent 70%)'
              : 'radial-gradient(circle at center, rgba(0,18,218,0.4) 0%, transparent 70%)',
        }}
      />

      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between z-10 mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono tracking-wider text-[#d8d628]">
          <Sparkles className="w-3 h-3" />
          <span className="uppercase font-semibold">Round {round}</span>
        </div>

        {/* Action Controls: Sound & Fullscreen */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            data-umami-event="Audio Mute Toggled"
            aria-label={soundEnabled ? 'Mute Tibetan Bowl Sound' : 'Unmute Tibetan Bowl Sound'}
            className={`p-2 sm:p-2.5 rounded-full border transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                : 'bg-white/5 border-white/10 text-neutral-500 hover:text-neutral-300'
            }`}
            title={soundEnabled ? 'Mute Sound (M)' : 'Unmute Sound (M)'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            className="p-2 sm:p-2.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Zen Mode'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Configuration Selectors (Idle Phase Only) */}
      {phase === 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-6 z-10 font-mono text-xs"
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="text-white/40 uppercase tracking-wider text-[10px]">Breaths:</span>
            {[20, 30, 40].map((count) => (
              <button
                key={count}
                onClick={() => setTotalBreaths(count)}
                aria-label={`Set breathing cycle to ${count} breaths`}
                className={`px-2.5 py-0.5 rounded-md transition-all cursor-pointer ${
                  totalBreaths === count
                    ? 'bg-[#d8d628] text-black font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {count}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="text-white/40 uppercase tracking-wider text-[10px]">Pace:</span>
            {(['slow', 'normal', 'fast'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTempo(t)}
                aria-label={`Set breathing tempo to ${t}`}
                className={`px-2.5 py-0.5 rounded-md capitalize transition-all cursor-pointer ${
                  tempo === t
                    ? 'bg-[#49cfff] text-black font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Breathing Arena & Precision SVG Ring */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-88 md:h-88 flex items-center justify-center my-2 sm:my-4 z-10">
        
        {/* SVG Circular Track & Progress Stroke */}
        <svg className="absolute w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 300 300">
          {/* Background Track */}
          <circle
            cx="150"
            cy="150"
            r="136"
            fill="none"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="4"
          />

          {/* Active Progress Arc */}
          {(phase === 'breathing' || phase === 'recovery' || phase === 'round_complete') && (
            <circle
              cx="150"
              cy="150"
              r="136"
              fill="none"
              stroke={phase === 'recovery' ? '#d8d628' : phase === 'round_complete' ? '#4ade80' : '#49cfff'}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              style={{
                strokeDashoffset,
                transition: phase === 'recovery' ? 'stroke-dashoffset 0.2s linear' : 'stroke-dashoffset 0.4s ease-out',
              }}
            />
          )}
        </svg>

        {/* Ambient Pulsating Glow */}
        <div
          className="absolute inset-4 rounded-full blur-2xl transition-all duration-700 pointer-events-none"
          style={{
            transform:
              phase === 'breathing'
                ? isInhaling
                  ? 'scale(1.25)'
                  : 'scale(0.85)'
                : phase === 'retention'
                ? 'scale(1.0)'
                : phase === 'recovery'
                ? 'scale(1.2)'
                : 'scale(0.9)',
            backgroundColor:
              phase === 'retention'
                ? 'rgba(73, 207, 255, 0.35)'
                : phase === 'recovery'
                ? 'rgba(216, 214, 40, 0.4)'
                : phase === 'round_complete'
                ? 'rgba(74, 222, 128, 0.35)'
                : 'rgba(0, 18, 218, 0.45)',
            opacity: phase === 'idle' ? 0.3 : 0.7,
          }}
        />

        {/* Central Frosted Glass Orb */}
        <div
          className="w-48 h-48 sm:w-60 sm:h-60 md:w-68 md:h-68 rounded-full border border-white/20 flex flex-col items-center justify-center relative shadow-2xl backdrop-blur-xl transition-transform"
          style={{
            transform:
              phase === 'breathing'
                ? isInhaling
                  ? 'scale(1.0)'
                  : 'scale(0.68)'
                : phase === 'recovery'
                ? 'scale(1.05)'
                : phase === 'retention'
                ? 'scale(0.75)'
                : 'scale(0.85)',
            transitionDuration:
              phase === 'breathing'
                ? `${isInhaling ? currentTiming.inhale : currentTiming.exhale}s`
                : '0.8s',
            transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
            borderColor:
              phase === 'retention'
                ? '#49cfff'
                : phase === 'recovery'
                ? '#d8d628'
                : phase === 'round_complete'
                ? '#4ade80'
                : 'rgba(255, 255, 255, 0.3)',
            boxShadow:
              phase === 'retention'
                ? '0 0 50px rgba(73, 207, 255, 0.35), inset 0 0 30px rgba(73, 207, 255, 0.2)'
                : phase === 'recovery'
                ? '0 0 50px rgba(216, 214, 40, 0.35), inset 0 0 30px rgba(216, 214, 40, 0.2)'
                : '0 0 40px rgba(0, 18, 218, 0.35), inset 0 0 20px rgba(0, 18, 218, 0.2)',
          }}
        >
          {/* Phase Readouts */}
          <AnimatePresence mode="wait">
            {phase === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center px-4"
              >
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/50 block">READY</span>
                <span className="text-xl sm:text-3xl font-bold tracking-tight text-white mt-1 block">Round {round}</span>
                <span className="text-[11px] sm:text-xs text-white/40 font-mono mt-1 block">{totalBreaths} Breaths</span>
              </motion.div>
            )}

            {phase === 'breathing' && (
              <motion.div
                key="breathing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center px-4"
              >
                <span className="text-sm sm:text-lg font-bold tracking-widest text-white uppercase block transition-all font-mono">
                  {isInhaling ? 'Fully In' : 'Let Go'}
                </span>
                <span className="text-3xl sm:text-5xl font-mono font-bold mt-1 text-[#d8d628] block tabular-nums">
                  {breathCount} <span className="text-sm sm:text-base text-white/40 font-normal">/ {totalBreaths}</span>
                </span>
              </motion.div>
            )}

            {phase === 'retention' && (
              <motion.div
                key="retention"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center px-4"
              >
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#49cfff] block font-bold">
                  RETENTION HOLD
                </span>
                <span className="text-3xl sm:text-5xl md:text-6xl font-mono font-bold mt-1 text-white block tabular-nums">
                  {formatTimer(retentionSec)}
                </span>
                <span className="text-[10px] sm:text-[11px] text-white/40 font-serif italic mt-1 block">
                  Hold on empty lungs
                </span>
              </motion.div>
            )}

            {phase === 'recovery' && (
              <motion.div
                key="recovery"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center px-4"
              >
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#d8d628] block font-bold">
                  RECOVERY HOLD
                </span>
                <span className="text-3xl sm:text-5xl md:text-6xl font-mono font-bold mt-1 text-white block tabular-nums">
                  {recoverySecLeft}s
                </span>
                <span className="text-[10px] sm:text-[11px] text-white/40 font-serif italic mt-1 block">
                  Hold full for 15s
                </span>
              </motion.div>
            )}

            {phase === 'round_complete' && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center px-4"
              >
                <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#4ade80] mx-auto mb-1" />
                <span className="text-sm sm:text-base font-bold text-white block">Round {round} Complete</span>
                <span className="text-xs sm:text-sm font-mono text-[#49cfff] mt-0.5 block">
                  Hold: {formatTimer(lastHoldTime)}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-4 sm:mt-6 z-10">
        {phase === 'idle' && (
          <button
            onClick={handleStart}
            data-umami-event="Wim Hof Session Started"
            aria-label="Start Wim Hof breathing session"
            className="px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-white text-black font-bold font-mono text-xs sm:text-sm tracking-wider uppercase flex items-center gap-3 hover:bg-[#d8d628] hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.25)] cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" /> Start Session
          </button>
        )}

        {phase === 'breathing' && (
          <button
            onClick={() => {
              if (stateRef.current.timerId) {
                clearTimeout(stateRef.current.timerId);
                stateRef.current.timerId = null;
              }
              setPhase('retention');
              setRetentionSec(0);
              playTibetanBowl(216, 4.5, 0.35);
            }}
            data-umami-event="Skip to Retention Clicked"
            aria-label="Skip power breathing and start retention hold stopwatch"
            className="px-6 sm:px-8 py-3.5 rounded-full bg-[#49cfff] text-black font-bold font-mono text-xs sm:text-sm uppercase tracking-wider hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2 cursor-pointer"
          >
            Skip to Breath Hold <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {phase === 'retention' && (
          <button
            onClick={handleEndRetention}
            data-umami-event="Recovery Breath Clicked"
            aria-label="Take recovery breath and start 15-second lung hold"
            className="px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#d8d628] text-black font-bold font-mono text-xs sm:text-sm tracking-wider uppercase hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(216,214,40,0.35)] cursor-pointer"
          >
            Take Recovery Breath
          </button>
        )}

        {phase === 'round_complete' && (
          <button
            onClick={handleNextRound}
            data-umami-event="Start Next Round Clicked"
            aria-label={`Start Round ${round + 1}`}
            className="px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-white text-black font-bold font-mono text-xs sm:text-sm tracking-wider uppercase flex items-center gap-3 hover:bg-[#d8d628] hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
          >
            Start Round {round + 1} <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {phase !== 'idle' && (
          <button
            onClick={handleReset}
            data-umami-event="Pacer Reset Clicked"
            aria-label="Reset Wim Hof breathing session"
            className="p-3.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Reset Session (R)"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </div>

      {/* Completed Rounds History */}
      {roundHistory.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 z-10 animate-in fade-in duration-300">
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 mr-1">Session Holds:</span>
          {roundHistory.map((item) => (
            <span
              key={item.round}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] text-[#49cfff]"
            >
              <span className="text-white/40">R{item.round}:</span> {formatTimer(item.holdSec)}
            </span>
          ))}
        </div>
      )}

      {/* Keyboard Shortcut Footer Pill */}
      <div className="mt-4 sm:mt-6 pt-3 border-t border-white/5 flex items-center justify-center gap-4 text-[11px] font-mono text-white/30">
        <span className="inline-flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/60 text-[10px]">Space</kbd> Action
        </span>
        <span className="inline-flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/60 text-[10px]">M</kbd> Mute
        </span>
        <span className="inline-flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/60 text-[10px]">R</kbd> Reset
        </span>
      </div>

    </div>
  );
}

export default WebBreathingPacer;
