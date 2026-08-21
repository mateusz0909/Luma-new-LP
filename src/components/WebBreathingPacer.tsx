import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Sparkles } from 'lucide-react';

interface BreathingPreset {
  id: string;
  name: string;
  patternName: string;
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
  color: string;
  glowColor: string;
  description: string;
}

const PRESETS: BreathingPreset[] = [
  {
    id: 'box_breathing',
    name: 'Box Breathing',
    patternName: '4-4-4-4',
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
    color: '#49cfff',
    glowColor: 'rgba(73, 207, 255, 0.4)',
    description: 'Used by Navy SEALs to regain calm and laser focus under high stress.'
  },
  {
    id: 'sleep_478',
    name: '4-7-8 Deep Sleep',
    patternName: '4-7-8',
    inhale: 4,
    hold1: 7,
    exhale: 8,
    hold2: 0,
    color: '#d18dff',
    glowColor: 'rgba(209, 141, 255, 0.4)',
    description: 'Dr. Weil method to stimulate the vagus nerve and slow heart rate for sleep.'
  },
  {
    id: 'wim_hof_warmup',
    name: 'Wim Hof Rhythm',
    patternName: '2.5-2.5-15',
    inhale: 2.5,
    hold1: 0,
    exhale: 2.5,
    hold2: 15,
    color: '#00f0ff',
    glowColor: 'rgba(0, 240, 255, 0.4)',
    description: 'Energizing rhythmic breathing followed by calm empty retention.'
  },
  {
    id: 'panic_relief',
    name: 'Anxiety Relief',
    patternName: '4-6',
    inhale: 4,
    hold1: 0,
    exhale: 6,
    hold2: 0,
    color: '#77d78a',
    glowColor: 'rgba(119, 215, 138, 0.4)',
    description: 'Extended exhalations activate baroreceptors and instantly lower adrenaline.'
  },
  {
    id: 'focus_energize',
    name: 'Focus & Balance',
    patternName: '4-4',
    inhale: 4,
    hold1: 0,
    exhale: 4,
    hold2: 0,
    color: '#ff9a5c',
    glowColor: 'rgba(255, 154, 92, 0.4)',
    description: 'Equal rhythmic breathing creates coherent brainwave states for deep work.'
  }
];

export function WebBreathingPacer() {
  const [selectedPreset, setSelectedPreset] = useState<BreathingPreset>(PRESETS[0]);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [currentPhase, setCurrentPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Retention'>('Inhale');
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState<number>(4);
  const [scale, setScale] = useState<number>(0.5);

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play gentle 432 Hz Tibetan Bowl bell on phase changes
  const playBowlSound = (freq = 432) => {
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

      // Natural exponential decay of a singing bowl
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.5);
    } catch {
      // AudioContext unavailable
    }
  };

  useEffect(() => {
    if (!isActive) {
      setCurrentPhase('Inhale');
      setPhaseSecondsLeft(Math.ceil(selectedPreset.inhale));
      setScale(0.5);
      return;
    }

    let phaseIndex = 0;
    const phases: Array<{ name: 'Inhale' | 'Hold' | 'Exhale' | 'Retention'; duration: number; targetScale: number }> = [];

    if (selectedPreset.inhale > 0) phases.push({ name: 'Inhale', duration: selectedPreset.inhale, targetScale: 1.0 });
    if (selectedPreset.hold1 > 0) phases.push({ name: 'Hold', duration: selectedPreset.hold1, targetScale: 1.0 });
    if (selectedPreset.exhale > 0) phases.push({ name: 'Exhale', duration: selectedPreset.exhale, targetScale: 0.5 });
    if (selectedPreset.hold2 > 0) phases.push({ name: selectedPreset.id === 'wim_hof_warmup' ? 'Retention' : 'Hold', duration: selectedPreset.hold2, targetScale: 0.5 });

    let currentPhaseObj = phases[0];
    let timeLeft = currentPhaseObj.duration;
    setCurrentPhase(currentPhaseObj.name);
    setPhaseSecondsLeft(Math.ceil(timeLeft));
    setScale(currentPhaseObj.targetScale);
    playBowlSound(432);

    const interval = setInterval(() => {
      timeLeft -= 0.1;
      setPhaseSecondsLeft(Math.max(1, Math.ceil(timeLeft)));

      if (timeLeft <= 0) {
        phaseIndex = (phaseIndex + 1) % phases.length;
        currentPhaseObj = phases[phaseIndex];
        timeLeft = currentPhaseObj.duration;

        setCurrentPhase(currentPhaseObj.name);
        setPhaseSecondsLeft(Math.ceil(timeLeft));
        setScale(currentPhaseObj.targetScale);

        const freq = currentPhaseObj.name === 'Inhale' ? 432 : currentPhaseObj.name === 'Exhale' ? 324 : 540;
        playBowlSound(freq);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, selectedPreset, soundEnabled]);

  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-12 rounded-[36px] bg-gradient-to-b from-white/10 to-white/[0.02] backdrop-blur-2xl border border-white/10 shadow-[0_0_100px_rgba(0,18,218,0.25)] flex flex-col items-center">
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#d8d628] mb-4">
          <Sparkles className="w-3.5 h-3.5" /> Interactive Web Pacer • 432 Hz
        </div>
        <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
          Experience Luma in Your Browser
        </h3>
        <p className="text-base md:text-lg text-white/60 font-serif italic max-w-xl mx-auto mt-3">
          Sync your breath with the 432 Hz harmonic pulse. No download needed to try.
        </p>
      </div>

      {/* Preset Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 w-full mb-10">
        {PRESETS.map((preset) => {
          const isSelected = selectedPreset.id === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => {
                setSelectedPreset(preset);
                setIsActive(false);
              }}
              className={`p-4 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between ${
                isSelected
                  ? 'bg-white/15 border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.15)] scale-[1.02]'
                  : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/15'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs text-white leading-tight">{preset.name}</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/10 inline-block mb-2" style={{ color: preset.color }}>
                  {preset.patternName}
                </span>
                <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                  {preset.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Visual Breathing Orb */}
      <div className="relative w-72 h-72 md:w-88 md:h-88 flex items-center justify-center my-6">
        {/* Ambient Glow Aura */}
        <motion.div
          animate={{
            scale: isActive ? (scale === 1.0 ? [1, 1.3, 1.25] : [1.25, 0.85, 0.8]) : 1,
            opacity: isActive ? 0.75 : 0.25
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: selectedPreset.glowColor }}
        />

        {/* Breathing Orb */}
        <motion.div
          animate={{ scale }}
          transition={{
            duration: currentPhase === 'Inhale' ? selectedPreset.inhale : currentPhase === 'Exhale' ? selectedPreset.exhale : 0.3,
            ease: [0.45, 0.05, 0.55, 0.95]
          }}
          className="w-52 h-52 md:w-64 md:h-64 rounded-full border-2 border-white/40 flex flex-col items-center justify-center relative shadow-2xl backdrop-blur-md"
          style={{
            borderColor: selectedPreset.color,
            boxShadow: `0 0 60px ${selectedPreset.glowColor}, inset 0 0 40px ${selectedPreset.glowColor}`
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhase}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="text-center"
            >
              <span className="text-xl md:text-2xl font-bold tracking-widest text-white uppercase block">
                {isActive ? currentPhase : 'Ready'}
              </span>
              <span className="text-4xl md:text-5xl font-mono font-bold mt-1.5 block" style={{ color: selectedPreset.color }}>
                {isActive ? `${phaseSecondsLeft}s` : 'START'}
              </span>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={() => setIsActive(!isActive)}
          className="px-8 py-3.5 rounded-full bg-white text-black font-bold font-mono text-xs sm:text-sm tracking-wider uppercase flex items-center gap-3 hover:bg-[#d8d628] hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]"
        >
          {isActive ? (
            <>
              <Pause className="w-4 h-4" /> Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" /> Begin Breathwork
            </>
          )}
        </button>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-3.5 rounded-full border transition-colors ${
            soundEnabled ? 'bg-white/10 border-white/20 text-white' : 'bg-white/5 border-white/10 text-neutral-500'
          }`}
          title={soundEnabled ? 'Mute 432 Hz Tibetan Bowl' : 'Unmute 432 Hz Tibetan Bowl'}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>

        <button
          onClick={() => {
            setIsActive(false);
            setTimeout(() => setIsActive(true), 150);
          }}
          className="p-3.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Restart Cycle"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* CTA Footer */}
      <div className="mt-10 pt-6 border-t border-white/10 w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
        <span>Looking for closed-eye haptic feedback and Apple Watch tracking?</span>
        <a
          href="https://apps.apple.com/us/app/luma-breathwork-meditation/id6737122722"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs uppercase tracking-widest text-[#d8d628] hover:underline font-bold"
        >
          Get Luma Free on iOS & Watch →
        </a>
      </div>

    </div>
  );
}
