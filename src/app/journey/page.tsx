'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useThemeContext } from '@/app/providers';
import { ThemeSelector } from '@/components/ThemeSelector';

type JourneyIntention = 'healing' | 'clarity' | 'energy' | 'peace';

const intentions: { id: JourneyIntention; title: string; description: string; icon: string; color: string }[] = [
  {
    id: 'healing',
    title: 'Healing',
    description: 'Release what no longer serves you and invite restoration',
    icon: '💚',
    color: '#22c55e',
  },
  {
    id: 'clarity',
    title: 'Clarity',
    description: 'Clear the mental fog and find your inner wisdom',
    icon: '💎',
    color: '#3b82f6',
  },
  {
    id: 'energy',
    title: 'Energy',
    description: 'Awaken your vitality and ignite your inner fire',
    icon: '🔥',
    color: '#f97316',
  },
  {
    id: 'peace',
    title: 'Peace',
    description: 'Settle into stillness and embrace deep calm',
    icon: '🕊️',
    color: '#a855f7',
  },
];

const breathPhases = ['Breathe In', 'Hold', 'Breathe Out', 'Rest'];

function BreathingCircle({ phase, progress }: { phase: number; progress: number }) {
  const { theme } = useThemeContext();
  const scales = [1.3, 1.3, 1, 1]; // in, hold, out, rest
  const currentScale = scales[phase];

  return (
    <div className="relative w-32 h-32 sm:w-48 sm:h-48">
      {/* Outer ring */}
      <motion.div
        animate={{ scale: currentScale }}
        transition={{ duration: phase === 0 || phase === 2 ? 4 : 0.1 }}
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from 0deg, ${theme.colors.primary}, ${theme.colors.secondary}, ${theme.colors.primary})`,
          opacity: 0.3,
        }}
      />

      {/* Progress ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          stroke={theme.colors.primary}
          strokeWidth="2"
          strokeDasharray={`${progress * 283} 283`}
          className="transition-all duration-100"
        />
      </svg>

      {/* Inner circle */}
      <motion.div
        animate={{ scale: currentScale * 0.7 }}
        transition={{ duration: phase === 0 || phase === 2 ? 4 : 0.1 }}
        className="absolute inset-4 sm:inset-6 rounded-full flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${theme.colors.primary}40, ${theme.colors.secondary}40)`,
          boxShadow: `0 0 40px ${theme.colors.glow}`,
        }}
      >
        <span className="text-sm sm:text-lg font-medium text-center px-2">
          {breathPhases[phase]}
        </span>
      </motion.div>
    </div>
  );
}

function AudioVisualizer({ isPlaying, intensity }: { isPlaying: boolean; intensity: number }) {
  const { theme } = useThemeContext();
  const bars = 32;

  return (
    <div className="flex items-end justify-center gap-0.5 sm:gap-1 h-16 sm:h-24">
      {Array.from({ length: bars }).map((_, i) => {
        const baseHeight = Math.sin((i / bars) * Math.PI) * 0.5 + 0.3;
        const randomFactor = isPlaying ? Math.random() * 0.5 + 0.5 : 0.2;
        const height = baseHeight * randomFactor * intensity;

        return (
          <motion.div
            key={i}
            animate={{ height: `${height * 100}%` }}
            transition={{ duration: 0.1 }}
            className="w-1 sm:w-1.5 rounded-full"
            style={{
              background: `linear-gradient(to top, ${theme.colors.primary}, ${theme.colors.secondary})`,
              minHeight: '4px',
            }}
          />
        );
      })}
    </div>
  );
}

function PulsingOrbs({ intention }: { intention: JourneyIntention }) {
  const intentionData = intentions.find((i) => i.id === intention)!;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.3, 0],
            scale: [0.5, 2, 3],
            x: [0, (i - 2) * 100],
            y: [0, (i % 2 === 0 ? -1 : 1) * 50],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 1.5,
            ease: 'easeOut',
          }}
          className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            background: `radial-gradient(circle, ${intentionData.color}40, transparent)`,
          }}
        />
      ))}
    </div>
  );
}

export default function JourneyPage() {
  const { theme } = useThemeContext();
  const [stage, setStage] = useState<'select' | 'prepare' | 'journey' | 'complete'>('select');
  const [selectedIntention, setSelectedIntention] = useState<JourneyIntention | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [breathPhase, setBreathPhase] = useState(0);
  const [breathProgress, setBreathProgress] = useState(0);
  const [journeyTime, setJourneyTime] = useState(0);
  const [audioIntensity, setAudioIntensity] = useState(0.5);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const breathTimerRef = useRef<NodeJS.Timeout | null>(null);

  const journeyDuration = 180; // 3 minutes for demo

  // Breathing cycle
  useEffect(() => {
    if (stage !== 'journey' || !isPlaying) return;

    const phaseDurations = [4000, 2000, 4000, 2000]; // in, hold, out, rest
    let currentPhase = 0;
    let startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const phaseDuration = phaseDurations[currentPhase];
      const progress = Math.min(elapsed / phaseDuration, 1);
      setBreathProgress(progress);

      if (elapsed >= phaseDuration) {
        currentPhase = (currentPhase + 1) % 4;
        setBreathPhase(currentPhase);
        startTime = Date.now();
      }

      breathTimerRef.current = setTimeout(tick, 50);
    };

    tick();

    return () => {
      if (breathTimerRef.current) clearTimeout(breathTimerRef.current);
    };
  }, [stage, isPlaying]);

  // Journey timer
  useEffect(() => {
    if (stage !== 'journey' || !isPlaying) return;

    timerRef.current = setInterval(() => {
      setJourneyTime((t) => {
        if (t >= journeyDuration) {
          setStage('complete');
          setIsPlaying(false);
          return t;
        }
        return t + 1;
      });

      // Vary audio intensity
      setAudioIntensity(0.3 + Math.random() * 0.7);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [stage, isPlaying]);

  const startJourney = () => {
    setStage('prepare');
    setTimeout(() => {
      setStage('journey');
      setIsPlaying(true);
    }, 3000);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const endJourney = () => {
    setIsPlaying(false);
    setStage('complete');
  };

  const resetJourney = () => {
    setStage('select');
    setSelectedIntention(null);
    setJourneyTime(0);
    setBreathPhase(0);
    setBreathProgress(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <main className="min-h-screen relative" style={{ background: 'var(--color-background)' }}>
      {/* Back Button */}
      <motion.a
        href="/"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50 flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm"
        style={{
          background: 'var(--color-surface)',
          color: 'var(--color-text-muted)',
        }}
        whileHover={{ x: -3 }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">Exit Journey</span>
      </motion.a>

      <AnimatePresence mode="wait">
        {/* Intention Selection */}
        {stage === 'select' && (
          <motion.div
            key="select"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
          >
            <motion.div
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              className="text-center mb-10 sm:mb-12"
            >
              <h1
                className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4"
                style={{ fontFamily: 'var(--font-cinzel)' }}
              >
                Virtual Drum Journey
              </h1>
              <p
                className="text-sm sm:text-lg max-w-xl mx-auto"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Set your intention and let the rhythms guide you inward
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-2xl w-full mb-8">
              {intentions.map((intention, index) => (
                <motion.button
                  key={intention.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedIntention(intention.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`card p-4 sm:p-6 text-center transition-all ${
                    selectedIntention === intention.id ? 'ring-2' : ''
                  }`}
                  style={{
                    borderColor: selectedIntention === intention.id ? intention.color : undefined,
                    boxShadow: selectedIntention === intention.id ? `0 0 20px ${intention.color}40` : undefined,
                  }}
                >
                  <span className="text-3xl sm:text-4xl mb-2 sm:mb-3 block">{intention.icon}</span>
                  <h3 className="text-base sm:text-lg font-bold mb-1" style={{ fontFamily: 'var(--font-cinzel)' }}>
                    {intention.title}
                  </h3>
                  <p className="text-xs sm:text-sm hidden sm:block" style={{ color: 'var(--color-text-muted)' }}>
                    {intention.description}
                  </p>
                </motion.button>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: selectedIntention ? 1 : 0.5 }}
              onClick={startJourney}
              disabled={!selectedIntention}
              whileHover={selectedIntention ? { scale: 1.05 } : {}}
              whileTap={selectedIntention ? { scale: 0.95 } : {}}
              className="btn-primary px-8 py-3 text-base sm:text-lg"
            >
              Begin Journey
            </motion.button>
          </motion.div>
        )}

        {/* Preparation */}
        {stage === 'prepare' && (
          <motion.div
            key="prepare"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center px-4"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mb-8"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                boxShadow: `0 0 60px ${theme.colors.glow}`,
              }}
            />
            <p className="text-lg sm:text-2xl" style={{ fontFamily: 'var(--font-cinzel)' }}>
              Find a comfortable position...
            </p>
            <p className="text-sm sm:text-base mt-2" style={{ color: 'var(--color-text-muted)' }}>
              Close your eyes and take a deep breath
            </p>
          </motion.div>
        )}

        {/* Active Journey */}
        {stage === 'journey' && selectedIntention && (
          <motion.div
            key="journey"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center px-4 relative"
          >
            <PulsingOrbs intention={selectedIntention} />

            <div className="relative z-10 flex flex-col items-center">
              {/* Timer */}
              <div className="mb-6 sm:mb-8 text-center">
                <span className="text-3xl sm:text-5xl font-bold" style={{ fontFamily: 'var(--font-cinzel)' }}>
                  {formatTime(journeyTime)}
                </span>
                <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                  / {formatTime(journeyDuration)}
                </p>
              </div>

              {/* Breathing Circle */}
              <BreathingCircle phase={breathPhase} progress={breathProgress} />

              {/* Audio Visualizer */}
              <div className="mt-8 sm:mt-12 w-full max-w-xs sm:max-w-md">
                <AudioVisualizer isPlaying={isPlaying} intensity={audioIntensity} />
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4 mt-8 sm:mt-12">
                <motion.button
                  onClick={togglePlayPause}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                  }}
                >
                  {isPlaying ? (
                    <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </motion.button>

                <motion.button
                  onClick={endJourney}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-full text-sm"
                  style={{
                    background: 'var(--color-surface)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  End Early
                </motion.button>
              </div>

              {/* Intention Reminder */}
              <p className="mt-6 sm:mt-8 text-sm sm:text-base" style={{ color: 'var(--color-text-muted)' }}>
                Intention: <span style={{ color: intentions.find(i => i.id === selectedIntention)?.color }}>
                  {intentions.find(i => i.id === selectedIntention)?.title}
                </span>
              </p>
            </div>
          </motion.div>
        )}

        {/* Completion */}
        {stage === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="text-5xl sm:text-7xl mb-6"
            >
              ✨
            </motion.div>

            <h2
              className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              Journey Complete
            </h2>

            <p
              className="text-sm sm:text-lg max-w-md mb-2"
              style={{ color: 'var(--color-text-muted)' }}
            >
              You journeyed for <span style={{ color: theme.colors.accent }}>{formatTime(journeyTime)}</span>
            </p>

            <p
              className="text-sm sm:text-base max-w-md mb-8"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Take a moment to integrate your experience before returning to the world.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <motion.button
                onClick={resetJourney}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                New Journey
              </motion.button>
              <motion.a
                href="/"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
              >
                Return Home
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ThemeSelector />
    </main>
  );
}
