import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Volume2, VolumeX, RotateCcw, Sparkles, CheckCircle2, ChevronRight, Wind } from 'lucide-react';

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

  // Static tempo timings (seconds)
  const tempoConfig = useMemo(() => ({
    slow: { inhale: 2.2, exhale: 1.6 },
    normal: { inhale: 1.8, exhale: 1.2 },
    fast: { inhale: 1.4, exhale: 1.0 }
  }), []);

  const currentTiming = tempoConfig[tempo];

  // Web Audio Context & High-End Acoustic Tibetan Singing Bowl Synth
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

  // Rich Organic Tibetan Singing Bowl Sound (Deep Warm Resonance, Low-pass Filtered, NO Tamagotchi beeps)
  const playTibetanBowl = useCallback((baseFreq = 216, decay = 4.0, volume = 0.25) => {
    if (!soundEnabled) return;
    try {
      initAudioContext();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const now = ctx.currentTime;

      // Master output & Warm Lowpass Filter (eliminates all harsh digital high-pitch beeps)
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, now);
      filter.Q.setValueAtTime(1.5, now);

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, now);

      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      // Acoustic Tibetan Bowl Partials (Fundamental + Warm Overtones + Sub-bass)
      const harmonics = [
        { freq: baseFreq, gain: 0.7, d: decay },
        { freq: baseFreq * 0.5, gain: 0.4, d: decay * 1.2 }, // Sub-bass body
        { freq: baseFreq * 2.01, gain: 0.35, d: decay * 0.8 },
        { freq: baseFreq * 2.76, gain: 0.18, d: decay * 0.6 },
        { freq: baseFreq * 4.04, gain: 0.08, d: decay * 0.4 },
      ];

      harmonics.forEach(({ freq, gain: g, d }) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Soft smooth acoustic strike envelope (no sudden digital clicks)
        gainNode.gain.setValueAtTime(0.0001, now);
        gainNode.gain.exponentialRampToValueAtTime(g, now + 0.06);
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

  // Gentle organic breath pulse chime
  const playBreathChime = useCallback((isInhale: boolean) => {
    if (!soundEnabled) return;
    try {
      initAudioContext();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const now = ctx.currentTime;
      const freq = isInhale ? 288 : 216; // Warm subtle deep tones

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.06, now + 0.08);
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
      // suppress
    }
  }, [soundEnabled, initAudioContext]);

  // =========================================================
  // ROBUST STATE MACHINE & BREATHING LOOP (Ref-Driven)
  // =========================================================
  const stateRef = useRef({
    phase: 'idle' as WimHofPhase,
    breath: 1,
    totalBreaths: 30,
    isInhaling: true,
    timing: currentTiming,
    timerId: null as ReturnType<typeof setTimeout> | null,
  });

  // Keep ref synchronized
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
    playTibetanBowl(216, 3.0, 0.2); // Start of round gong

    const scheduleNext = () => {
      if (stateRef.current.phase !== 'breathing') return;

      const { isInhaling: currentlyInhaling, breath: currBreath, totalBreaths: maxBreaths, timing } = stateRef.current;

      if (currentlyInhaling) {
        // Switch to Exhale
        stateRef.current.isInhaling = false;
        setIsInhaling(false);
        playBreathChime(false);

        stateRef.current.timerId = setTimeout(scheduleNext, timing.exhale * 1000);
      } else {
        // Exhale finished -> increment breath
        const nextBreath = currBreath + 1;

        if (nextBreath > maxBreaths) {
          // Finished all 30 breaths -> Transition to Retention Hold
          setPhase('retention');
          setRetentionSec(0);
          playTibetanBowl(216, 4.5, 0.35); // Deep singing bowl gong entering retention
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

  // =========================================================
  // RETENTION STOPWATCH (Counts up accurately)
  // =========================================================
  useEffect(() => {
    if (phase !== 'retention') return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setRetentionSec(elapsed);
    }, 200);

    return () => clearInterval(interval);
  }, [phase]);

  // =========================================================
  // RECOVERY COUNTDOWN (15s on full lungs)
  // =========================================================
  useEffect(() => {
    if (phase !== 'recovery') return;

    setRecoverySecLeft(15);
    playTibetanBowl(288, 3.5, 0.3); // Warm uplifting chime

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, 15 - elapsed);
      setRecoverySecLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        setPhase('round_complete');
        playTibetanBowl(432, 4.0, 0.3); // Harmonious completion bell
      }
    }, 200);

    return () => clearInterval(interval);
  }, [phase, playTibetanBowl]);

  // UI Handlers
  const handleStart = () => {
    initAudioContext();
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
    if (stateRef.current.timerId) {
      clearTimeout(stateRef.current.timerId);
      stateRef.current.timerId = null;
    }
    setPhase('idle');
    setBreathCount(1);
    setIsInhaling(true);
    setRetentionSec(0);
    setRecoverySecLeft(15);
  };

  const formatTimer = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-12 rounded-[36px] bg-gradient-to-b from-white/10 to-white/[0.02] backdrop-blur-2xl border border-white/10 shadow-[0_0_100px_rgba(0,18,218,0.25)] flex flex-col items-center select-none">
      
      {/* Top Badge & Header */}
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

      {/* Round Pill & Config Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6 font-mono text-xs">
        <div className="px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-white font-bold tracking-wider">
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

      {/* Breathing Arena */}
      <div className="relative w-72 h-72 md:w-88 md:h-88 flex items-center justify-center my-4">
        
        {/* Ambient Glow */}
        <div
          className="absolute inset-0 rounded-full blur-3xl transition-all duration-1000 pointer-events-none"
          style={{
            transform: phase === 'breathing' ? (isInhaling ? 'scale(1.3)' : 'scale(0.85)') : phase === 'retention' ? 'scale(1.05)' : phase === 'recovery' ? 'scale(1.25)' : 'scale(0.9)',
            backgroundColor:
              phase === 'retention'
                ? 'rgba(73, 207, 255, 0.4)'
                : phase === 'recovery'
                ? 'rgba(216, 214, 40, 0.45)'
                : 'rgba(0, 18, 218, 0.55)',
            opacity: phase === 'idle' ? 0.25 : 0.65
          }}
        />

        {/* Central Orb with Hardware-Accelerated Smooth CSS Easing */}
        <div
          className="w-56 h-56 md:w-68 md:h-68 rounded-full border-2 flex flex-col items-center justify-center relative shadow-2xl backdrop-blur-md transition-transform"
          style={{
            transform:
              phase === 'breathing'
                ? (isInhaling ? 'scale(1.0)' : 'scale(0.62)')
                : phase === 'recovery'
                ? 'scale(1.05)'
                : phase === 'retention'
                ? 'scale(0.68)'
                : 'scale(0.82)',
            transitionDuration:
              phase === 'breathing'
                ? `${isInhaling ? currentTiming.inhale : currentTiming.exhale}s`
                : '0.8s',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            borderColor: phase === 'retention' ? '#49cfff' : phase === 'recovery' ? '#d8d628' : '#ffffff',
            boxShadow:
              phase === 'retention'
                ? '0 0 60px rgba(73, 207, 255, 0.4), inset 0 0 35px rgba(73, 207, 255, 0.3)'
                : phase === 'recovery'
                ? '0 0 60px rgba(216, 214, 40, 0.4), inset 0 0 35px rgba(216, 214, 40, 0.3)'
                : '0 0 50px rgba(0, 18, 218, 0.4), inset 0 0 25px rgba(0, 18, 218, 0.3)'
          }}
        >
          {/* Phase Content */}
          {phase === 'idle' && (
            <div className="text-center">
              <span className="text-xs font-mono uppercase tracking-widest text-white/50 block">READY</span>
              <span className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-1 block">Round {round}</span>
              <span className="text-xs text-neutral-400 mt-1 block">{totalBreaths} Breaths</span>
            </div>
          )}

          {phase === 'breathing' && (
            <div className="text-center">
              <span className="text-lg md:text-xl font-bold tracking-wider text-white uppercase block transition-all">
                {isInhaling ? 'Fully In' : 'Let Go'}
              </span>
              <span className="text-4xl md:text-5xl font-mono font-bold mt-1 text-[#d8d628] block">
                {breathCount} <span className="text-lg text-white/40">/ {totalBreaths}</span>
              </span>
            </div>
          )}

          {phase === 'retention' && (
            <div className="text-center animate-in fade-in zoom-in duration-300">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#49cfff] block">RETENTION</span>
              <span className="text-4xl md:text-6xl font-mono font-bold mt-1 text-white block">
                {formatTimer(retentionSec)}
              </span>
              <span className="text-[11px] text-neutral-400 mt-1 block">Hold on empty lungs</span>
            </div>
          )}

          {phase === 'recovery' && (
            <div className="text-center animate-in fade-in zoom-in duration-300">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#d8d628] block">RECOVERY INHALE</span>
              <span className="text-4xl md:text-6xl font-mono font-bold mt-1 text-white block">
                {recoverySecLeft}s
              </span>
              <span className="text-[11px] text-neutral-400 mt-1 block">Hold full for 15s</span>
            </div>
          )}

          {phase === 'round_complete' && (
            <div className="text-center px-4 animate-in fade-in duration-300">
              <CheckCircle2 className="w-8 h-8 text-[#d8d628] mx-auto mb-1.5" />
              <span className="text-base font-bold text-white block">Round {round} Complete!</span>
              <span className="text-xs font-mono text-[#49cfff] mt-1 block">Hold: {formatTimer(lastHoldTime)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3.5 mt-6">
        
        {phase === 'idle' && (
          <button
            onClick={handleStart}
            data-umami-event="Wim Hof Session Started"
            className="px-8 py-3.5 rounded-full bg-white text-black font-bold font-mono text-xs sm:text-sm tracking-wider uppercase flex items-center gap-3 hover:bg-[#d8d628] hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" /> Start Wim Hof Session
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
            className="px-6 py-3 rounded-full bg-[#49cfff] text-black font-bold font-mono text-xs uppercase tracking-wider hover:bg-white transition-all shadow-lg flex items-center gap-2 cursor-pointer"
          >
            Skip to Breath Hold <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {phase === 'retention' && (
          <button
            onClick={handleEndRetention}
            data-umami-event="Recovery Breath Clicked"
            className="px-8 py-4 rounded-full bg-[#d8d628] text-black font-bold font-mono text-xs sm:text-sm tracking-wider uppercase hover:bg-white hover:scale-105 transition-all shadow-[0_0_40px_rgba(216,214,40,0.4)] cursor-pointer"
          >
            Take Recovery Breath (Inhale)
          </button>
        )}

        {phase === 'round_complete' && (
          <button
            onClick={handleNextRound}
            data-umami-event="Start Next Round Clicked"
            className="px-8 py-3.5 rounded-full bg-white text-black font-bold font-mono text-xs sm:text-sm tracking-wider uppercase flex items-center gap-3 hover:bg-[#d8d628] hover:scale-105 transition-all shadow-lg cursor-pointer"
          >
            Start Round {round + 1} <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {phase !== 'idle' && (
          <button
            onClick={handleReset}
            data-umami-event="Pacer Reset Clicked"
            className="p-3.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Reset Session"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          data-umami-event="Audio Mute Toggled"
          className={`p-3.5 rounded-full border transition-colors cursor-pointer ${
            soundEnabled ? 'bg-white/10 border-white/20 text-white' : 'bg-white/5 border-white/10 text-neutral-500'
          }`}
          title={soundEnabled ? 'Mute Tibetan Bowl Sound' : 'Unmute Tibetan Bowl Sound'}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </div>

    </div>
  );
}

export default WebBreathingPacer;
