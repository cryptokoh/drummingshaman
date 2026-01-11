'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useThemeContext } from '@/app/providers';
import { ThemeSelector } from '@/components/ThemeSelector';
import { MoonPhaseWidget, MoonPhaseCalendar } from '@/components/MoonPhaseWidget';
import { RhythmGenerator } from '@/components/RhythmGenerator';

type ToolTab = 'moon' | 'rhythm';

export default function ToolsPage() {
  const { theme } = useThemeContext();
  const [activeTab, setActiveTab] = useState<ToolTab>('moon');

  const tabs = [
    { id: 'moon' as ToolTab, label: 'Moon Phases', icon: '🌙' },
    { id: 'rhythm' as ToolTab, label: 'Rhythm Generator', icon: '🥁' },
  ];

  return (
    <main className="min-h-screen py-16 sm:py-20 px-4" style={{ background: 'var(--color-background)' }}>
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
        <span className="hidden sm:inline">Back to Home</span>
      </motion.a>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1
            className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4"
            style={{ fontFamily: 'var(--font-cinzel)' }}
          >
            Sacred Tools
          </h1>
          <p
            className="text-sm sm:text-lg max-w-xl mx-auto"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Resources for your spiritual practice and drumming journey
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div
            className="inline-flex rounded-xl p-1"
            style={{ background: 'var(--color-surface)' }}
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all flex items-center gap-2`}
                style={{
                  background: activeTab === tab.id
                    ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`
                    : 'transparent',
                  color: activeTab === tab.id ? '#fff' : 'var(--color-text-muted)',
                }}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'moon' && (
            <div className="space-y-6">
              <MoonPhaseWidget />
              <MoonPhaseCalendar />

              {/* Moon Info */}
              <div className="card p-5 sm:p-6">
                <h3
                  className="text-lg sm:text-xl font-bold mb-4"
                  style={{ fontFamily: 'var(--font-cinzel)' }}
                >
                  Drumming with the Moon
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg" style={{ background: 'var(--color-surface)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🌑</span>
                      <span className="font-semibold">New Moon</span>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      Best for intention setting, quiet reflection, and beginning new practices.
                      Use soft, slow rhythms to go inward.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg" style={{ background: 'var(--color-surface)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🌕</span>
                      <span className="font-semibold">Full Moon</span>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      Peak energy for release ceremonies and celebration.
                      Build to powerful rhythms for emotional release.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rhythm' && (
            <div className="space-y-6">
              <RhythmGenerator />

              {/* Rhythm Tips */}
              <div className="card p-5 sm:p-6">
                <h3
                  className="text-lg sm:text-xl font-bold mb-4"
                  style={{ fontFamily: 'var(--font-cinzel)' }}
                >
                  Shamanic Rhythm Guide
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💓</span>
                    <div>
                      <span className="font-semibold">60 BPM - The Heartbeat</span>
                      <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        Grounding rhythm that syncs with a resting heart. Perfect for meditation and centering.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🚶</span>
                    <div>
                      <span className="font-semibold">120 BPM - The Journey</span>
                      <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        Traditional shamanic journey tempo. Induces light trance states for inner exploration.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🌀</span>
                    <div>
                      <span className="font-semibold">180+ BPM - The Trance</span>
                      <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        Deep journey rhythm for experienced practitioners. Facilitates profound altered states.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
            Ready for a deeper experience?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <motion.a
              href="/journey"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-sm"
            >
              Start a Drum Journey
            </motion.a>
            <motion.a
              href="/#events"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary text-sm"
            >
              Find an Event
            </motion.a>
          </div>
        </motion.div>
      </div>

      <ThemeSelector />
    </main>
  );
}
