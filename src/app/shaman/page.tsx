'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useThemeContext } from '@/app/providers';
import { ThemeSelector } from '@/components/ThemeSelector';

const journeyMilestones = [
  {
    year: '2008',
    title: 'The Awakening',
    description: 'First encounter with shamanic drumming during a transformative retreat in Peru. The rhythms opened doorways to healing that changed everything.',
    icon: '🌅',
  },
  {
    year: '2010',
    title: 'The Training',
    description: 'Began formal apprenticeship with indigenous drum keepers, learning ancient rhythms passed down through generations.',
    icon: '📿',
  },
  {
    year: '2013',
    title: 'First Ceremonies',
    description: 'Started facilitating healing circles for small groups, witnessing profound transformations in participants.',
    icon: '🔥',
  },
  {
    year: '2016',
    title: 'The Healing Temple',
    description: 'Founded The Healing Temple as a dedicated space for shamanic practices and community gathering.',
    icon: '🏛️',
  },
  {
    year: '2019',
    title: 'Global Expansion',
    description: 'Began traveling internationally, bringing drum healing to communities across 50+ countries.',
    icon: '🌍',
  },
  {
    year: '2022',
    title: 'The Healing Vortex',
    description: 'Opened The Healing Vortex in Sedona, a powerful energy center for deep transformation work.',
    icon: '🌀',
  },
  {
    year: 'Now',
    title: 'The Mission Continues',
    description: 'Teaching, healing, and spreading the ancient wisdom of rhythmic healing to all who seek transformation.',
    icon: '✨',
  },
];

const philosophyPillars = [
  {
    title: 'The Drum as Bridge',
    description: 'The drum is not just an instrument—it is a bridge between worlds, connecting the physical and spiritual realms through sacred vibration.',
    icon: '🥁',
  },
  {
    title: 'Rhythm as Medicine',
    description: 'Every beat carries healing intention. The rhythms we play are prescriptions for the soul, carefully chosen for each journey.',
    icon: '💫',
  },
  {
    title: 'Community as Container',
    description: 'Healing happens in relationship. The drum circle creates a container where individual and collective transformation interweave.',
    icon: '🤝',
  },
  {
    title: 'Nature as Teacher',
    description: 'All rhythms come from nature—the heartbeat, the waves, the wind. We learn by listening to the Earth\'s original songs.',
    icon: '🌿',
  },
];

const galleryImages = [
  { id: 1, title: 'Ceremony at Dawn', location: 'Sedona, AZ' },
  { id: 2, title: 'Full Moon Circle', location: 'Santa Fe, NM' },
  { id: 3, title: 'Mountain Retreat', location: 'Peru' },
  { id: 4, title: 'Beach Drumming', location: 'Bali' },
  { id: 5, title: 'Urban Healing', location: 'New York, NY' },
  { id: 6, title: 'Forest Journey', location: 'Oregon' },
];

function TimelineItem({ milestone, index, isLast }: { milestone: typeof journeyMilestones[0]; index: number; isLast: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { theme } = useThemeContext();
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative">
      {/* Connection Line */}
      {!isLast && (
        <div
          className="absolute left-1/2 top-20 w-px h-full -translate-x-1/2 hidden md:block"
          style={{ background: `linear-gradient(to bottom, ${theme.colors.primary}40, transparent)` }}
        />
      )}

      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`flex flex-col md:flex-row items-center gap-4 md:gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      >
        {/* Content Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`flex-1 card p-5 sm:p-6 ${isEven ? 'md:text-right' : 'md:text-left'} text-center md:text-inherit`}
        >
          <span
            className="text-xs sm:text-sm uppercase tracking-widest mb-2 block"
            style={{ color: theme.colors.accent }}
          >
            {milestone.year}
          </span>
          <h3
            className="text-lg sm:text-xl font-bold mb-2"
            style={{ fontFamily: 'var(--font-cinzel)' }}
          >
            {milestone.title}
          </h3>
          <p
            className="text-sm sm:text-base leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {milestone.description}
          </p>
        </motion.div>

        {/* Center Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-2xl sm:text-3xl z-10 flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
            boxShadow: `0 0 30px ${theme.colors.glow}`,
          }}
        >
          {milestone.icon}
        </motion.div>

        {/* Spacer for alignment */}
        <div className="flex-1 hidden md:block" />
      </motion.div>
    </div>
  );
}

export default function ShamanPage() {
  const { theme, themeId } = useThemeContext();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const [activeGalleryItem, setActiveGalleryItem] = useState(0);

  return (
    <main className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-[80vh] sm:min-h-screen relative flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 30% 50%, ${theme.colors.primary}20, transparent 50%),
                          radial-gradient(circle at 70% 50%, ${theme.colors.secondary}20, transparent 50%)`,
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          {/* Portrait Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-6 sm:mb-8"
          >
            <div
              className="w-32 h-32 sm:w-48 sm:h-48 mx-auto rounded-full relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.surface}, ${theme.colors.backgroundAlt})`,
                boxShadow: `0 0 60px ${theme.colors.glow}`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-16 h-16 sm:w-24 sm:h-24 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                  }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs sm:text-sm uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
                  Photo Soon
                </span>
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6"
            style={{ fontFamily: 'var(--font-cinzel)' }}
          >
            <span className="text-gradient">Anup Pandey</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="text-base sm:text-xl md:text-2xl mb-4 sm:mb-6"
            style={{ color: 'var(--color-text-muted)' }}
          >
            The Drumming Shaman
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed px-2"
            style={{ color: 'var(--color-text-muted)' }}
          >
            For over 15 years, I have dedicated my life to the sacred art of shamanic drumming,
            guiding thousands of souls on journeys of healing, discovery, and transformation.
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="mt-10 sm:mt-16"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
                My Journey
              </span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: theme.colors.primary }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <span
              className="inline-block text-xs sm:text-sm uppercase tracking-[0.2em] mb-3"
              style={{ color: theme.colors.primary }}
            >
              The Path
            </span>
            <h2
              className="text-2xl sm:text-4xl md:text-5xl font-bold"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              A Journey of Transformation
            </h2>
          </motion.div>

          <div className="space-y-8 sm:space-y-12">
            {journeyMilestones.map((milestone, index) => (
              <TimelineItem
                key={milestone.year}
                milestone={milestone}
                index={index}
                isLast={index === journeyMilestones.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 sm:py-24 px-4" style={{ background: 'var(--color-background-alt)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-16"
          >
            <span
              className="inline-block text-xs sm:text-sm uppercase tracking-[0.2em] mb-3"
              style={{ color: theme.colors.primary }}
            >
              Philosophy
            </span>
            <h2
              className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              The Way of the Drum
            </h2>
            <p
              className="text-sm sm:text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--color-text-muted)' }}
            >
              These principles guide every ceremony, every beat, every healing journey.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {philosophyPillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="card p-5 sm:p-8 relative overflow-hidden group"
              >
                {/* Hover Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${theme.colors.primary}10, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  <span className="text-3xl sm:text-4xl mb-3 sm:mb-4 block">{pillar.icon}</span>
                  <h3
                    className="text-lg sm:text-xl font-bold mb-2 sm:mb-3"
                    style={{ fontFamily: 'var(--font-cinzel)' }}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    className="text-sm sm:text-base leading-relaxed"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-16"
          >
            <span
              className="inline-block text-xs sm:text-sm uppercase tracking-[0.2em] mb-3"
              style={{ color: theme.colors.primary }}
            >
              Gallery
            </span>
            <h2
              className="text-2xl sm:text-4xl md:text-5xl font-bold"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              Moments of Healing
            </h2>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, zIndex: 10 }}
                onClick={() => setActiveGalleryItem(index)}
                className={`relative aspect-square rounded-lg sm:rounded-xl overflow-hidden cursor-pointer group ${
                  index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.surface}, ${theme.colors.backgroundAlt})`,
                }}
              >
                {/* Placeholder Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mb-2 sm:mb-3"
                    style={{
                      background: `linear-gradient(135deg, ${theme.colors.primary}40, ${theme.colors.secondary}40)`,
                    }}
                  />
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider text-center" style={{ color: 'var(--color-text-muted)' }}>
                    {image.title}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-3 sm:p-4"
                  style={{
                    background: `linear-gradient(to top, ${theme.colors.background}ee, transparent)`,
                  }}
                >
                  <div>
                    <p className="font-semibold text-xs sm:text-sm">{image.title}</p>
                    <p className="text-[10px] sm:text-xs" style={{ color: 'var(--color-text-muted)' }}>{image.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4" style={{ background: 'var(--color-background-alt)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2
            className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6"
            style={{ fontFamily: 'var(--font-cinzel)' }}
          >
            Ready to Begin Your Journey?
          </h2>
          <p
            className="text-sm sm:text-lg mb-6 sm:mb-8"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Whether you seek healing, growth, or simply a new experience,
            the drum awaits to guide your path.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <motion.a
              href="/#events"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Find an Event
            </motion.a>
            <motion.a
              href="/#connect"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary"
            >
              Get in Touch
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Back to Home */}
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

      <ThemeSelector />
    </main>
  );
}
