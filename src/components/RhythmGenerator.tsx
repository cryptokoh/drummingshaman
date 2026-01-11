'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useThemeContext } from '@/app/providers';

interface DrumPad {
  id: string;
  name: string;
  key: string;
  color: string;
  frequency: number;
}

const drumPads: DrumPad[] = [
  { id: 'kick', name: 'Bass', key: 'Q', color: '#ef4444', frequency: 80 },
  { id: 'snare', name: 'Snare', key: 'W', color: '#f97316', frequency: 200 },
  { id: 'tom1', name: 'Tom 1', key: 'E', color: '#eab308', frequency: 150 },
  { id: 'tom2', name: 'Tom 2', key: 'R', color: '#22c55e', frequency: 120 },
  { id: 'hihat', name: 'Hi-Hat', key: 'A', color: '#3b82f6', frequency: 800 },
  { id: 'crash', name: 'Crash', key: 'S', color: '#8b5cf6', frequency: 600 },
  { id: 'frame', name: 'Frame', key: 'D', color: '#ec4899', frequency: 300 },
  { id: 'shaker', name: 'Shaker', key: 'F', color: '#14b8a6', frequency: 1000 },
];

const presetRhythms = [
  {
    name: 'Heartbeat',
    description: 'Grounding 60 BPM',
    bpm: 60,
    pattern: [
      [1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
  {
    name: 'Journey',
    description: 'Shamanic 120 BPM',
    bpm: 120,
    pattern: [
      [1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 1, 0, 0, 0, 1],
    ],
  },
  {
    name: 'Trance',
    description: 'Deep journey 180 BPM',
    bpm: 180,
    pattern: [
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 0, 1, 0, 0],
    ],
  },
];

function createOscillator(audioContext: AudioContext, frequency: number, duration: number = 0.1) {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  oscillator.type = 'sine';

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}

export function RhythmGenerator() {
  const { theme } = useThemeContext();
  const [pattern, setPattern] = useState<number[][]>(
    Array(8).fill(null).map(() => Array(8).fill(0))
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [currentStep, setCurrentStep] = useState(0);
  const [activePads, setActivePads] = useState<Set<string>>(new Set());

  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize audio context on user interaction
  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // Play a single drum sound
  const playDrum = useCallback((drumId: string) => {
    const audioContext = initAudio();
    const drum = drumPads.find((d) => d.id === drumId);
    if (drum && audioContext) {
      createOscillator(audioContext, drum.frequency, 0.15);
      setActivePads((prev) => {
        const next = new Set(prev);
        next.add(drumId);
        setTimeout(() => {
          setActivePads((p) => {
            const n = new Set(p);
            n.delete(drumId);
            return n;
          });
        }, 100);
        return next;
      });
    }
  }, [initAudio]);

  // Toggle pattern cell
  const toggleCell = (padIndex: number, stepIndex: number) => {
    setPattern((prev) => {
      const newPattern = prev.map((row) => [...row]);
      newPattern[padIndex][stepIndex] = newPattern[padIndex][stepIndex] ? 0 : 1;
      return newPattern;
    });
  };

  // Play/pause sequencer
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsPlaying(false);
      setCurrentStep(0);
    } else {
      initAudio();
      setIsPlaying(true);
      const stepDuration = (60 / bpm / 2) * 1000; // 8th notes

      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          const nextStep = (prev + 1) % 8;

          // Play sounds for this step
          pattern.forEach((row, padIndex) => {
            if (row[nextStep]) {
              playDrum(drumPads[padIndex].id);
            }
          });

          return nextStep;
        });
      }, stepDuration);
    }
  }, [isPlaying, bpm, pattern, initAudio, playDrum]);

  // Load preset
  const loadPreset = (preset: typeof presetRhythms[0]) => {
    setPattern(preset.pattern);
    setBpm(preset.bpm);
  };

  // Clear pattern
  const clearPattern = () => {
    setPattern(Array(8).fill(null).map(() => Array(8).fill(0)));
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      const drum = drumPads.find((d) => d.key === key);
      if (drum) {
        playDrum(drum.id);
      }
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playDrum, togglePlay]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="card p-4 sm:p-6">
      <div className="text-center mb-6">
        <h3
          className="text-xl sm:text-2xl font-bold mb-2"
          style={{ fontFamily: 'var(--font-cinzel)' }}
        >
          Rhythm Generator
        </h3>
        <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Tap pads or use keyboard (Q, W, E, R, A, S, D, F)
        </p>
      </div>

      {/* Drum Pads */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-6">
        {drumPads.map((pad) => (
          <motion.button
            key={pad.id}
            onClick={() => playDrum(pad.id)}
            whileTap={{ scale: 0.9 }}
            className="aspect-square rounded-xl flex flex-col items-center justify-center relative overflow-hidden"
            style={{
              background: activePads.has(pad.id)
                ? pad.color
                : `${pad.color}30`,
              boxShadow: activePads.has(pad.id) ? `0 0 30px ${pad.color}` : undefined,
            }}
          >
            <span className="text-lg sm:text-xl font-bold">{pad.name}</span>
            <span
              className="text-[10px] sm:text-xs mt-1 px-2 py-0.5 rounded"
              style={{ background: 'rgba(0,0,0,0.3)' }}
            >
              {pad.key}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Sequencer Grid */}
      <div className="mb-6 overflow-x-auto">
        <div className="min-w-[400px]">
          {/* Step indicators */}
          <div className="flex gap-1 mb-2 pl-16 sm:pl-20">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full transition-all ${
                  currentStep === i && isPlaying ? 'scale-y-150' : ''
                }`}
                style={{
                  background:
                    currentStep === i && isPlaying
                      ? theme.colors.primary
                      : 'var(--color-surface)',
                }}
              />
            ))}
          </div>

          {/* Pattern rows */}
          {drumPads.map((pad, padIndex) => (
            <div key={pad.id} className="flex items-center gap-1 mb-1">
              <span
                className="w-14 sm:w-18 text-[10px] sm:text-xs font-medium truncate"
                style={{ color: pad.color }}
              >
                {pad.name}
              </span>
              {pattern[padIndex].map((cell, stepIndex) => (
                <motion.button
                  key={stepIndex}
                  onClick={() => toggleCell(padIndex, stepIndex)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`flex-1 aspect-square rounded-md transition-all ${
                    currentStep === stepIndex && isPlaying ? 'ring-2 ring-white' : ''
                  }`}
                  style={{
                    background: cell ? pad.color : `${pad.color}20`,
                    boxShadow: cell ? `0 0 10px ${pad.color}50` : undefined,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6">
        <motion.button
          onClick={togglePlay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
          }}
        >
          {isPlaying ? (
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 sm:w-6 sm:h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </motion.button>

        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm" style={{ color: 'var(--color-text-muted)' }}>
            BPM
          </span>
          <input
            type="range"
            min="40"
            max="200"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-20 sm:w-28"
          />
          <span className="text-sm sm:text-base font-bold w-8">{bpm}</span>
        </div>

        <motion.button
          onClick={clearPattern}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-2 rounded-lg text-xs sm:text-sm"
          style={{ background: 'var(--color-surface)' }}
        >
          Clear
        </motion.button>
      </div>

      {/* Presets */}
      <div>
        <h4
          className="text-xs sm:text-sm uppercase tracking-wider mb-3 text-center"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Presets
        </h4>
        <div className="flex flex-wrap justify-center gap-2">
          {presetRhythms.map((preset) => (
            <motion.button
              key={preset.name}
              onClick={() => loadPreset(preset)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2 rounded-lg text-xs sm:text-sm"
              style={{ background: 'var(--color-surface)' }}
            >
              <span className="font-semibold">{preset.name}</span>
              <span className="hidden sm:inline" style={{ color: 'var(--color-text-muted)' }}>
                {' '}
                - {preset.description}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
