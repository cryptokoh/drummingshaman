'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeContext } from '@/app/providers';

export function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { theme } = useThemeContext();

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    // For now, we'll use a placeholder - in production, you'd have actual drum audio
    // This creates a gentle ambient sound using the Web Audio API as a placeholder
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      try {
        // Placeholder: In production, set audioRef.current.src to your audio file
        // For now, we'll just simulate the toggle
        setIsPlaying(true);
      } catch (error) {
        console.error('Audio playback failed:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <motion.button
      onClick={toggleAudio}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300"
      style={{
        background: isPlaying
          ? `linear-gradient(135deg, ${theme.colors.primary}40, ${theme.colors.secondary}40)`
          : 'var(--color-surface)',
        border: `1px solid ${isPlaying ? theme.colors.primary : 'var(--color-text-muted)'}40`,
      }}
    >
      {/* Audio Icon */}
      <div className="relative w-6 h-6">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin"
              style={{ borderColor: `var(--color-primary)` }}
            />
          ) : isPlaying ? (
            <motion.svg
              key="playing"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M15.536 8.464a5 5 0 010 7.072M12 6a7 7 0 010 12M8.464 8.464a5 5 0 000 7.072" />
              {/* Sound waves animation */}
              <motion.path
                d="M18.364 5.636a9 9 0 010 12.728"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.svg>
          ) : (
            <motion.svg
              key="muted"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </div>

      {/* Text */}
      <span
        className="text-sm font-medium"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {isPlaying ? 'Ambient Drums Playing' : 'Enable Ambient Sound'}
      </span>

      {/* Equalizer Bars (visible when playing) */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            className="flex items-end gap-0.5 h-4 ml-2"
          >
            {[0.6, 1, 0.4, 0.8, 0.5].map((height, i) => (
              <motion.div
                key={i}
                className="w-1 rounded-full"
                style={{ background: theme.colors.primary }}
                animate={{
                  height: ['40%', `${height * 100}%`, '40%'],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
