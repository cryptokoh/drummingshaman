'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useThemeContext } from '@/app/providers';

const testimonials = [
  {
    quote:
      "The drumming session was unlike anything I've experienced. I felt layers of stress melt away and reconnected with a part of myself I'd forgotten existed.",
    author: 'Sarah M.',
    location: 'New York, USA',
  },
  {
    quote:
      "Anup creates such a safe and powerful space. The rhythms took me on a journey that brought deep healing and clarity.",
    author: 'Marcus J.',
    location: 'London, UK',
  },
  {
    quote:
      "After years of meditation, I thought I knew inner peace. The drumming ceremony showed me there are depths I hadn't touched.",
    author: 'Yuki T.',
    location: 'Tokyo, Japan',
  },
];

const offerings = [
  {
    title: 'Book a Class',
    description:
      'Learn the ancient art of shamanic drumming in structured classes for all skill levels.',
    icon: '📚',
  },
  {
    title: 'Join a Drum Circle',
    description:
      'Experience the healing power of community drumming in our regular drum circle gatherings.',
    icon: '🥁',
  },
  {
    title: 'Corporate Team Bonding',
    description:
      'Bring the power of rhythmic healing to your organization at your venue for unique team building.',
    icon: '🏢',
  },
  {
    title: 'Party Drum Circle',
    description:
      'Make your celebration unforgettable with an energizing drum circle experience for your guests.',
    icon: '🎉',
  },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { theme } = useThemeContext();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section className="section" id="experience" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span
            className="inline-block text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-3 sm:mb-4"
            style={{ color: 'var(--color-primary)' }}
          >
            The Experience
          </span>
          <h2
            className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
            style={{ fontFamily: 'var(--font-cinzel)' }}
          >
            What is Shamanic Drumming?
          </h2>
          <p
            className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            For over 40,000 years, cultures around the world have used rhythmic
            drumming to access altered states of consciousness, promote healing,
            and connect with the spiritual realm. The steady beat entrains
            brainwaves to theta frequencies, opening doorways to profound inner
            experiences.
          </p>
        </motion.div>

        {/* Offerings Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-20"
        >
          {offerings.map((offering, index) => (
            <motion.div
              key={offering.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="card card-hover p-3 sm:p-6 text-center"
            >
              <div className="text-2xl sm:text-4xl mb-2 sm:mb-4">{offering.icon}</div>
              <h3
                className="text-sm sm:text-xl font-bold mb-1 sm:mb-3 leading-tight"
                style={{ fontFamily: 'var(--font-cinzel)' }}
              >
                {offering.title}
              </h3>
              <p
                className="text-xs sm:text-sm hidden sm:block"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {offering.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative"
        >
          <div className="text-center mb-8">
            <span
              className="inline-block text-sm uppercase tracking-[0.2em] mb-2"
              style={{ color: 'var(--color-primary)' }}
            >
              Testimonials
            </span>
            <h3
              className="text-2xl font-bold"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              Voices of Transformation
            </h3>
          </div>

          {/* Testimonial Card */}
          <div className="max-w-3xl mx-auto">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="card p-5 sm:p-8 md:p-12 text-center relative"
            >
              {/* Quote Mark */}
              <div
                className="absolute -top-2 sm:-top-4 left-4 sm:left-8 text-4xl sm:text-6xl opacity-20"
                style={{ color: 'var(--color-primary)', fontFamily: 'serif' }}
              >
                "
              </div>

              <p className="text-base sm:text-xl md:text-2xl leading-relaxed mb-4 sm:mb-8 italic">
                {testimonials[activeTestimonial].quote}
              </p>

              <div>
                <div
                  className="font-bold text-sm sm:text-base"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {testimonials[activeTestimonial].author}
                </div>
                <div
                  className="text-xs sm:text-sm"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {testimonials[activeTestimonial].location}
                </div>
              </div>
            </motion.div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center gap-3 mt-4 sm:mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className="w-4 h-4 sm:w-3 sm:h-3 rounded-full transition-all duration-300"
                  style={{
                    background:
                      index === activeTestimonial
                        ? theme.colors.primary
                        : `${theme.colors.primary}30`,
                    transform:
                      index === activeTestimonial ? 'scale(1.3)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Video Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 sm:mt-20"
        >
          <div
            className="aspect-video max-w-4xl mx-auto rounded-xl sm:rounded-2xl overflow-hidden relative"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.surface}, ${theme.colors.backgroundAlt})`,
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center cursor-pointer glow"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                }}
              >
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
              <span
                className="mt-3 sm:mt-4 text-xs sm:text-sm uppercase tracking-widest"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Video Coming Soon
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
