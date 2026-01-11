'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useThemeContext } from '@/app/providers';

// Placeholder events data
const upcomingEvents = [
  {
    id: 1,
    title: 'Full Moon Healing Ceremony',
    date: 'February 12, 2025',
    time: '7:00 PM',
    location: 'The Healing Temple',
    city: 'Santa Fe, NM',
    type: 'Ceremony',
    spotsLeft: 8,
  },
  {
    id: 2,
    title: 'Shamanic Drumming Workshop',
    date: 'February 22-23, 2025',
    time: '10:00 AM',
    location: 'The Healing Vortex',
    city: 'Sedona, AZ',
    type: 'Workshop',
    spotsLeft: 12,
  },
  {
    id: 3,
    title: 'Sound Journey & Drum Circle',
    date: 'March 1, 2025',
    time: '6:30 PM',
    location: 'Community Center',
    city: 'Los Angeles, CA',
    type: 'Circle',
    spotsLeft: 25,
  },
];

export function Events() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { theme, themeId } = useThemeContext();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Ceremony':
        return theme.colors.primary;
      case 'Workshop':
        return theme.colors.secondary;
      case 'Circle':
        return theme.colors.accent;
      default:
        return theme.colors.primary;
    }
  };

  return (
    <section className="section section-alt" id="events" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span
            className="inline-block text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-3 sm:mb-4"
            style={{ color: 'var(--color-primary)' }}
          >
            Upcoming Events
          </span>
          <h2
            className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4"
            style={{ fontFamily: 'var(--font-cinzel)' }}
          >
            Where's the Drumming Shaman Next?
          </h2>
          <p
            className="text-sm sm:text-lg max-w-2xl mx-auto px-2"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Join Anup at one of his transformative events and experience the
            healing power of the drum firsthand.
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.15 }}
              whileHover={{ y: -8 }}
              className="card card-hover overflow-hidden group"
            >
              {/* Event Type Badge */}
              <div
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs uppercase tracking-wider font-semibold"
                style={{
                  background: `${getTypeColor(event.type)}20`,
                  color: getTypeColor(event.type),
                }}
              >
                {event.type}
              </div>

              <div className="p-4 sm:p-6">
                {/* Date */}
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex flex-col items-center justify-center"
                    style={{ background: `${theme.colors.primary}20` }}
                  >
                    <span
                      className="text-[10px] sm:text-xs uppercase"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {event.date.split(' ')[0].slice(0, 3)}
                    </span>
                    <span
                      className="text-sm sm:text-lg font-bold"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {event.date.split(' ')[1].replace(',', '')}
                    </span>
                  </div>
                  <div>
                    <div
                      className="text-sm sm:text-base font-semibold"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {event.date}
                    </div>
                    <div
                      className="text-xs sm:text-sm"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {event.time}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="text-base sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-gradient transition-all leading-tight"
                  style={{ fontFamily: 'var(--font-cinzel)' }}
                >
                  {event.title}
                </h3>

                {/* Location */}
                <div className="flex items-start gap-2 mb-3 sm:mb-4">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <div
                      className="text-xs sm:text-sm font-medium"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {event.location}
                    </div>
                    <div
                      className="text-xs sm:text-sm"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {event.city}
                    </div>
                  </div>
                </div>

                {/* Spots & CTA */}
                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-[var(--color-surface)]">
                  <span
                    className="text-xs sm:text-sm"
                    style={{
                      color:
                        event.spotsLeft < 10
                          ? theme.colors.accent
                          : 'var(--color-text-muted)',
                    }}
                  >
                    {event.spotsLeft} spots left
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all"
                    style={{
                      background: theme.colors.primary,
                      color: themeId === 'modern' ? '#fff' : 'var(--color-text)',
                    }}
                  >
                    Reserve Spot
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Events CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary inline-flex items-center gap-2"
          >
            <span>View All Events</span>
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
          </motion.button>
        </motion.div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="mt-10 sm:mt-16"
        >
          <div
            className="aspect-[16/9] sm:aspect-[21/9] rounded-xl sm:rounded-2xl overflow-hidden relative"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.surface}, ${theme.colors.backgroundAlt})`,
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <svg
                className="w-10 h-10 sm:w-16 sm:h-16 mb-3 sm:mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              <span
                className="text-xs sm:text-sm uppercase tracking-widest"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Interactive Map Coming Soon
              </span>
            </div>

            {/* Decorative Location Pins */}
            {[
              { x: '20%', y: '40%' },
              { x: '35%', y: '55%' },
              { x: '75%', y: '35%' },
            ].map((pos, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [-5, 5, -5],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
                className="absolute w-4 h-4"
                style={{
                  left: pos.x,
                  top: pos.y,
                  background: theme.colors.primary,
                  borderRadius: '50% 50% 50% 0',
                  transform: 'rotate(-45deg)',
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
