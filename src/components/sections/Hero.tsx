'use client';

import { motion } from 'framer-motion';
import { useThemeContext } from '@/app/providers';
import { ParticleField } from '../ui/ParticleField';
import { AudioToggle } from '../ui/AudioToggle';
import { ScrollIndicator } from '../ui/ScrollIndicator';

export function Hero() {
  const { theme, themeId } = useThemeContext();

  return (
    <section className="section relative overflow-hidden" id="hero">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <ParticleField themeId={themeId} />

        {/* Gradient Overlays */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, transparent 0%, var(--color-background) 70%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, transparent 60%, var(--color-background) 100%)`,
          }}
        />
      </div>

      {/* Sacred Geometry Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] opacity-5"
          style={{
            border: `1px solid var(--color-primary)`,
            borderRadius: '50%',
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] opacity-5"
          style={{
            border: `1px solid var(--color-secondary)`,
            borderRadius: '50%',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm md:text-base uppercase tracking-[0.3em] mb-6"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Experience the rhythm of healing
        </motion.p>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          style={{ fontFamily: 'var(--font-cinzel)' }}
        >
          <span className="block">The</span>
          <span className="block text-gradient glow-text">
            Drumming Shaman
          </span>
        </motion.h1>

        {/* Name */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xl md:text-2xl mb-8"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Anap Pandey
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ color: 'var(--color-text)' }}
        >
          Journey into ancient rhythms that awaken your spirit, heal your heart,
          and connect you to the sacred pulse of the universe.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#events"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-flex items-center gap-2"
          >
            <span>Find an Event</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.a>
          <motion.a
            href="#about"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary"
          >
            Learn More
          </motion.a>
        </motion.div>

        {/* Audio Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12"
        >
          <AudioToggle />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />

      {/* Decorative Elements based on Theme */}
      {themeId === 'dark' && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${theme.colors.primary}10, transparent)`,
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}
    </section>
  );
}
