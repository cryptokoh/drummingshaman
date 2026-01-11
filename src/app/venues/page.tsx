'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useThemeContext } from '@/app/providers';
import { ThemeSelector } from '@/components/ThemeSelector';

type VenueCategory = 'all' | 'festivals' | 'corporate' | 'retreats' | 'private' | 'international';

interface Venue {
  id: string;
  name: string;
  location: string;
  country: string;
  year: string;
  category: VenueCategory;
  description: string;
  highlight?: string;
  attendees?: string;
  image?: string;
}

const venues: Venue[] = [
  // Festivals
  {
    id: 'burning-man',
    name: 'Burning Man',
    location: 'Black Rock Desert, Nevada',
    country: 'USA',
    year: '2023',
    category: 'festivals',
    description: 'Sacred drumming ceremony at sunrise on the playa, gathering 500+ souls.',
    highlight: 'Featured Performer',
    attendees: '500+',
  },
  {
    id: 'lightning-bottle',
    name: 'Lightning in a Bottle',
    location: 'Buena Vista Lake, California',
    country: 'USA',
    year: '2023',
    category: 'festivals',
    description: 'Multi-day drum journey workshops and healing circles.',
    attendees: '350+',
  },
  {
    id: 'envision',
    name: 'Envision Festival',
    location: 'Uvita',
    country: 'Costa Rica',
    year: '2024',
    category: 'festivals',
    description: 'Jungle drumming ceremonies connecting earth and spirit.',
    highlight: 'Headliner',
    attendees: '800+',
  },
  {
    id: 'bali-spirit',
    name: 'Bali Spirit Festival',
    location: 'Ubud, Bali',
    country: 'Indonesia',
    year: '2023',
    category: 'festivals',
    description: 'Ancient rhythms merge with Balinese sacred traditions.',
    attendees: '600+',
  },
  // Corporate
  {
    id: 'google',
    name: 'Google Wellness Summit',
    location: 'Mountain View, California',
    country: 'USA',
    year: '2024',
    category: 'corporate',
    description: 'Team bonding through rhythm - 12 teams, one heartbeat.',
    highlight: 'Keynote Experience',
    attendees: '200+',
  },
  {
    id: 'salesforce',
    name: 'Salesforce Dreamforce',
    location: 'San Francisco, California',
    country: 'USA',
    year: '2023',
    category: 'corporate',
    description: 'Mindfulness drumming session for executive wellness track.',
    attendees: '150+',
  },
  {
    id: 'meta-wellness',
    name: 'Meta Wellness Week',
    location: 'Menlo Park, California',
    country: 'USA',
    year: '2024',
    category: 'corporate',
    description: 'Interactive drum circle for employee wellbeing initiative.',
    attendees: '300+',
  },
  // Retreats
  {
    id: 'esalen',
    name: 'Esalen Institute',
    location: 'Big Sur, California',
    country: 'USA',
    year: '2024',
    category: 'retreats',
    description: 'Week-long immersive shamanic drumming retreat.',
    highlight: 'Resident Teacher',
    attendees: '40+',
  },
  {
    id: 'rythmia',
    name: 'Rythmia Life Advancement',
    location: 'Guanacaste',
    country: 'Costa Rica',
    year: '2023',
    category: 'retreats',
    description: 'Integration drumming sessions for transformation guests.',
    attendees: '60+',
  },
  {
    id: 'kripalu',
    name: 'Kripalu Center',
    location: 'Stockbridge, Massachusetts',
    country: 'USA',
    year: '2024',
    category: 'retreats',
    description: 'Sound healing and rhythm therapy certification program.',
    attendees: '80+',
  },
  {
    id: 'omega',
    name: 'Omega Institute',
    location: 'Rhinebeck, New York',
    country: 'USA',
    year: '2023',
    category: 'retreats',
    description: 'Summer workshop series on indigenous drumming practices.',
    attendees: '100+',
  },
  // Private
  {
    id: 'celebrity-wedding',
    name: 'Private Celebration',
    location: 'Malibu, California',
    country: 'USA',
    year: '2024',
    category: 'private',
    description: 'Exclusive sunset drumming ceremony for intimate gathering.',
    highlight: 'VIP Event',
    attendees: '75+',
  },
  {
    id: 'yacht-ceremony',
    name: 'Ocean Ceremony',
    location: 'Mediterranean Sea',
    country: 'International Waters',
    year: '2023',
    category: 'private',
    description: 'Full moon drum circle on private yacht.',
    attendees: '30+',
  },
  // International
  {
    id: 'india-pilgrimage',
    name: 'Rishikesh Retreat',
    location: 'Rishikesh, Uttarakhand',
    country: 'India',
    year: '2024',
    category: 'international',
    description: 'Sacred drumming on the banks of the Ganges.',
    highlight: 'Spiritual Pilgrimage',
    attendees: '120+',
  },
  {
    id: 'peru-machu',
    name: 'Machu Picchu Ceremony',
    location: 'Sacred Valley',
    country: 'Peru',
    year: '2023',
    category: 'international',
    description: 'Ancient Andean rhythms at sunrise over the citadel.',
    highlight: 'Once in a Lifetime',
    attendees: '50+',
  },
  {
    id: 'japan-temple',
    name: 'Kyoto Temple Sessions',
    location: 'Kyoto',
    country: 'Japan',
    year: '2024',
    category: 'international',
    description: 'East meets West - taiko fusion workshops.',
    attendees: '85+',
  },
  {
    id: 'morocco',
    name: 'Sahara Desert Gathering',
    location: 'Merzouga Desert',
    country: 'Morocco',
    year: '2023',
    category: 'international',
    description: 'Drumming under the stars in the ancient desert.',
    attendees: '70+',
  },
];

const categories = [
  { id: 'all', label: 'All Venues', icon: '🌍' },
  { id: 'festivals', label: 'Festivals', icon: '🎪' },
  { id: 'corporate', label: 'Corporate', icon: '🏢' },
  { id: 'retreats', label: 'Retreats', icon: '🏔️' },
  { id: 'private', label: 'Private', icon: '✨' },
  { id: 'international', label: 'International', icon: '🌏' },
];

const stats = [
  { value: '50+', label: 'Venues', icon: '🏛️' },
  { value: '15', label: 'Countries', icon: '🌍' },
  { value: '10,000+', label: 'Lives Touched', icon: '💫' },
  { value: '8', label: 'Years', icon: '⏳' },
];

function VenueCard({ venue, index }: { venue: Venue; index: number }) {
  const { theme } = useThemeContext();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.02 : 1,
          y: isHovered ? -5 : 0,
        }}
        className="card overflow-hidden h-full"
        style={{
          background: isHovered
            ? `linear-gradient(135deg, ${theme.colors.primary}15, ${theme.colors.secondary}15)`
            : undefined,
        }}
      >
        {/* Image placeholder with gradient overlay */}
        <div
          className="h-32 sm:h-40 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.primary}40, ${theme.colors.secondary}40)`,
          }}
        >
          {/* Animated pattern */}
          <motion.div
            animate={{
              backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%',
            }}
            transition={{ duration: 3, repeat: isHovered ? Infinity : 0 }}
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                ${theme.colors.primary}20 0px,
                ${theme.colors.primary}20 10px,
                transparent 10px,
                transparent 20px
              )`,
              backgroundSize: '200% 200%',
            }}
          />

          {/* Country flag emoji */}
          <div
            className="absolute top-3 left-3 text-2xl sm:text-3xl"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            }}
          >
            {venue.country === 'USA' && '🇺🇸'}
            {venue.country === 'Costa Rica' && '🇨🇷'}
            {venue.country === 'Indonesia' && '🇮🇩'}
            {venue.country === 'India' && '🇮🇳'}
            {venue.country === 'Peru' && '🇵🇪'}
            {venue.country === 'Japan' && '🇯🇵'}
            {venue.country === 'Morocco' && '🇲🇦'}
            {venue.country === 'International Waters' && '🚢'}
          </div>

          {/* Highlight badge */}
          {venue.highlight && (
            <motion.div
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                color: '#fff',
              }}
            >
              {venue.highlight}
            </motion.div>
          )}

          {/* Year badge */}
          <div
            className="absolute bottom-3 right-3 px-2 py-1 rounded text-xs font-medium"
            style={{
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {venue.year}
          </div>

          {/* Venue icon based on category */}
          <motion.div
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
              rotate: isHovered ? [0, 10, -10, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-3 left-3 text-4xl sm:text-5xl"
            style={{
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
            }}
          >
            {venue.category === 'festivals' && '🎪'}
            {venue.category === 'corporate' && '🏢'}
            {venue.category === 'retreats' && '🏔️'}
            {venue.category === 'private' && '✨'}
            {venue.category === 'international' && '🌏'}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3
            className="text-base sm:text-lg font-bold mb-1"
            style={{ fontFamily: 'var(--font-cinzel)' }}
          >
            {venue.name}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <svg
              className="w-3.5 h-3.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ color: theme.colors.primary }}
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
            <span
              className="text-xs sm:text-sm truncate"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {venue.location}
            </span>
          </div>

          <p
            className="text-xs sm:text-sm mb-3 line-clamp-2"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {venue.description}
          </p>

          {/* Attendees */}
          {venue.attendees && (
            <div className="flex items-center gap-2">
              <span className="text-lg">👥</span>
              <span
                className="text-xs font-semibold"
                style={{
                  background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {venue.attendees} participants
              </span>
            </div>
          )}
        </div>

        {/* Hover glow effect */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 30px ${theme.colors.glow}40`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

function WorldMapVisualization() {
  const { theme } = useThemeContext();

  // Simplified world representation with dots for locations
  const locations = [
    { x: 20, y: 45, label: 'California', count: 8 },
    { x: 25, y: 50, label: 'Nevada', count: 1 },
    { x: 28, y: 55, label: 'New York', count: 2 },
    { x: 22, y: 65, label: 'Costa Rica', count: 2 },
    { x: 30, y: 70, label: 'Peru', count: 1 },
    { x: 48, y: 50, label: 'Morocco', count: 1 },
    { x: 70, y: 55, label: 'India', count: 1 },
    { x: 80, y: 50, label: 'Japan', count: 1 },
    { x: 82, y: 60, label: 'Indonesia', count: 1 },
  ];

  return (
    <div
      className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${theme.colors.primary}20, ${theme.colors.secondary}20)`,
      }}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(${theme.colors.primary}20 1px, transparent 1px),
            linear-gradient(90deg, ${theme.colors.primary}20 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Location dots */}
      {locations.map((loc, i) => (
        <motion.div
          key={loc.label}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.1, type: 'spring' }}
          className="absolute"
          style={{
            left: `${loc.x}%`,
            top: `${loc.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Pulse ring */}
          <motion.div
            animate={{
              scale: [1, 2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="absolute w-4 h-4 rounded-full"
            style={{
              background: theme.colors.primary,
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* Dot */}
          <motion.div
            whileHover={{ scale: 1.5 }}
            className="relative w-3 h-3 sm:w-4 sm:h-4 rounded-full cursor-pointer z-10"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
              boxShadow: `0 0 15px ${theme.colors.glow}`,
            }}
          >
            {/* Count badge */}
            <span
              className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold whitespace-nowrap px-1.5 py-0.5 rounded"
              style={{
                background: theme.colors.surface,
                color: theme.colors.primary,
              }}
            >
              {loc.count}
            </span>
          </motion.div>
        </motion.div>
      ))}

      {/* Title overlay */}
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <span
          className="text-xs sm:text-sm px-3 py-1.5 rounded-full"
          style={{
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
          }}
        >
          🌍 Spreading rhythm across the globe
        </span>
      </div>
    </div>
  );
}

export default function VenuesPage() {
  const { theme } = useThemeContext();
  const [activeCategory, setActiveCategory] = useState<VenueCategory>('all');
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  const filteredVenues =
    activeCategory === 'all'
      ? venues
      : venues.filter((v) => v.category === activeCategory);

  return (
    <main
      className="min-h-screen py-16 sm:py-20 px-4"
      style={{ background: 'var(--color-background)' }}
    >
      {/* Back Button */}
      <motion.a
        href="/"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50 flex items-center gap-2 px-3 py-2 sm:px-4 rounded-full text-xs sm:text-sm"
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

      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="text-4xl sm:text-6xl mb-4"
          >
            🌍
          </motion.div>

          <h1
            className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4"
            style={{ fontFamily: 'var(--font-cinzel)' }}
          >
            <span className="text-gradient">Where The Drums</span>
            <br />
            <span className="text-gradient">Have Traveled</span>
          </h1>

          <p
            className="text-sm sm:text-lg max-w-2xl mx-auto mb-8"
            style={{ color: 'var(--color-text-muted)' }}
          >
            From ancient temples to modern stages, the sacred rhythms have echoed
            across continents, touching hearts and awakening souls.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              onMouseEnter={() => setHoveredStat(i)}
              onMouseLeave={() => setHoveredStat(null)}
              whileHover={{ scale: 1.05, y: -5 }}
              className="card p-4 sm:p-6 text-center relative overflow-hidden"
            >
              <motion.div
                animate={{
                  scale: hoveredStat === i ? 1.2 : 1,
                }}
                className="text-2xl sm:text-3xl mb-2"
              >
                {stat.icon}
              </motion.div>

              <div
                className="text-2xl sm:text-4xl font-bold mb-1"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {stat.value}
              </div>

              <div
                className="text-xs sm:text-sm font-medium"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {stat.label}
              </div>

              {/* Glow effect */}
              <motion.div
                animate={{
                  opacity: hoveredStat === i ? 0.3 : 0,
                }}
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at center, ${theme.colors.glow}, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* World Map Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 sm:mb-12"
        >
          <WorldMapVisualization />
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as VenueCategory)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5"
                style={{
                  background:
                    activeCategory === cat.id
                      ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`
                      : 'var(--color-surface)',
                  color: activeCategory === cat.id ? '#fff' : 'var(--color-text-muted)',
                }}
              >
                <span>{cat.icon}</span>
                <span className="hidden sm:inline">{cat.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Venues Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {filteredVenues.map((venue, i) => (
              <VenueCard key={venue.id} venue={venue} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredVenues.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <span className="text-4xl mb-4 block">🥁</span>
            <p style={{ color: 'var(--color-text-muted)' }}>
              New venues coming soon...
            </p>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <div
            className="card p-6 sm:p-8 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.primary}15, ${theme.colors.secondary}15)`,
            }}
          >
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20"
              style={{
                background: `conic-gradient(from 0deg, ${theme.colors.primary}, ${theme.colors.secondary}, ${theme.colors.primary})`,
              }}
            />

            <h3
              className="text-xl sm:text-2xl font-bold mb-3"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              Bring The Drums To Your Venue
            </h3>

            <p
              className="text-sm sm:text-base mb-6 max-w-lg mx-auto"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Whether it&apos;s a festival, corporate event, wellness retreat, or private
              celebration, let the sacred rhythms transform your space.
            </p>

            <motion.a
              href="/#connect"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center gap-2"
            >
              <span>Book a Performance</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.a>
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <blockquote className="max-w-2xl mx-auto">
            <span className="text-4xl mb-4 block">&ldquo;</span>
            <p
              className="text-sm sm:text-lg italic mb-4"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Every venue becomes sacred ground when the drums begin to speak.
              From desert sands to mountain peaks, the rhythm finds its way home
              in every heart.
            </p>
            <footer>
              <cite
                className="not-italic font-semibold"
                style={{
                  background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                — Anup Pandey, The Drumming Shaman
              </cite>
            </footer>
          </blockquote>
        </motion.div>
      </div>

      <ThemeSelector />
    </main>
  );
}
