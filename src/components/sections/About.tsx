'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useThemeContext } from '@/app/providers';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { theme, themeId } = useThemeContext();

  return (
    <section className="section section-alt" id="about" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative aspect-[3/4] max-w-md mx-auto">
              {/* Decorative Frame */}
              <motion.div
                animate={{
                  rotate: [0, 2, 0, -2, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -inset-4 rounded-2xl"
                style={{
                  border: `2px solid ${theme.colors.primary}30`,
                }}
              />
              <motion.div
                animate={{
                  rotate: [0, -2, 0, 2, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -inset-8 rounded-2xl"
                style={{
                  border: `1px solid ${theme.colors.secondary}20`,
                }}
              />

              {/* Placeholder Image */}
              <div
                className="relative w-full h-full rounded-xl overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.surface}, ${theme.colors.backgroundAlt})`,
                }}
              >
                {/* Placeholder Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <div
                    className="w-32 h-32 rounded-full mb-6 animate-pulse-glow"
                    style={{
                      background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                    }}
                  />
                  <span
                    className="text-sm uppercase tracking-widest"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Portrait Coming Soon
                  </span>
                </div>

                {/* Decorative overlay based on theme */}
                {themeId === 'mystical' && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-background-alt)]" />
                )}
                {themeId === 'earthy' && (
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${theme.colors.secondary.slice(1)}' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />
                )}
              </div>

              {/* Floating Accent */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-6 top-1/4 w-12 h-12 rounded-full glow-subtle"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.primary})`,
                }}
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            {/* Section Label */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="inline-block text-sm uppercase tracking-[0.2em] mb-4"
              style={{ color: 'var(--color-primary)' }}
            >
              About the Shaman
            </motion.span>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              Anap Pandey
            </motion.h2>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="space-y-4 text-lg leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <p>
                Anap Pandey is a master of the ancient art of shamanic drumming,
                carrying forward traditions that have healed souls for millennia.
                As the founder of <span style={{ color: 'var(--color-primary)' }}>The Healing Temple</span> and{' '}
                <span style={{ color: 'var(--color-secondary)' }}>The Healing Vortex</span>,
                he creates sacred spaces where transformation becomes possible.
              </p>
              <p>
                Through the primal rhythm of the drum, Anap guides participants on
                journeys of self-discovery, releasing blockages and awakening the
                innate healing power within each person.
              </p>
            </motion.div>

            {/* Stats/Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-3 gap-4 mt-8"
            >
              {[
                { value: '15+', label: 'Years Experience' },
                { value: '1000+', label: 'Ceremonies' },
                { value: '50+', label: 'Countries' },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="card p-4 text-center"
                >
                  <div
                    className="text-2xl md:text-3xl font-bold mb-1"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs uppercase tracking-wider"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
