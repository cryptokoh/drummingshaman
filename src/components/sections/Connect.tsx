'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useThemeContext } from '@/app/providers';

export function Connect() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { theme, themeId } = useThemeContext();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder - form submission will be handled in Phase 3
    console.log('Form submitted:', formState);
    alert('Thank you for your message! Contact form will be fully functional soon.');
  };

  return (
    <section className="section" id="connect" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span
            className="inline-block text-sm uppercase tracking-[0.2em] mb-4"
            style={{ color: 'var(--color-primary)' }}
          >
            Get in Touch
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-cinzel)' }}
          >
            Begin Your Journey
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Ready to experience the transformative power of shamanic drumming?
            Reach out to book a session, inquire about events, or simply connect.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="card p-8">
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none"
                    style={{
                      background: 'var(--color-background)',
                      border: `1px solid var(--color-surface)`,
                      color: 'var(--color-text)',
                    }}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none"
                    style={{
                      background: 'var(--color-background)',
                      border: `1px solid var(--color-surface)`,
                      color: 'var(--color-text)',
                    }}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Subject
                  </label>
                  <select
                    value={formState.subject}
                    onChange={(e) =>
                      setFormState({ ...formState, subject: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none"
                    style={{
                      background: 'var(--color-background)',
                      border: `1px solid var(--color-surface)`,
                      color: 'var(--color-text)',
                    }}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="booking">Book a Private Session</option>
                    <option value="event">Event Information</option>
                    <option value="workshop">Workshop Inquiry</option>
                    <option value="corporate">Corporate Wellness</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Your Message
                  </label>
                  <textarea
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none resize-none"
                    style={{
                      background: 'var(--color-background)',
                      border: `1px solid var(--color-surface)`,
                      color: 'var(--color-text)',
                    }}
                    placeholder="Tell us about your journey..."
                    required
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary py-4 text-lg"
                >
                  Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Contact Info & Social */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Quick Links */}
            <div className="card p-8">
              <h3
                className="text-xl font-bold mb-6"
                style={{ fontFamily: 'var(--font-cinzel)' }}
              >
                Quick Links
              </h3>
              <div className="space-y-4">
                {[
                  {
                    label: 'The Healing Temple',
                    icon: '🏛️',
                    link: '#',
                  },
                  {
                    label: 'The Healing Vortex',
                    icon: '🌀',
                    link: '#',
                  },
                  {
                    label: 'Book a Private Session',
                    icon: '📅',
                    link: '#',
                  },
                ].map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.link}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 p-3 rounded-lg transition-all"
                    style={{
                      background: 'var(--color-background)',
                    }}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span
                      className="font-medium"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {item.label}
                    </span>
                    <svg
                      className="w-5 h-5 ml-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="card p-8">
              <h3
                className="text-xl font-bold mb-6"
                style={{ fontFamily: 'var(--font-cinzel)' }}
              >
                Connect on Social
              </h3>
              <div className="flex gap-4">
                {[
                  { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                  { name: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                  { name: 'YouTube', icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href="#"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full flex items-center justify-center glow-subtle"
                    style={{
                      background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                    }}
                    title={social.name}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={social.icon} />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="card p-8">
              <h3
                className="text-xl font-bold mb-3"
                style={{ fontFamily: 'var(--font-cinzel)' }}
              >
                Stay Connected
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Subscribe for event updates, healing insights, and exclusive
                content.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-lg focus:outline-none"
                  style={{
                    background: 'var(--color-background)',
                    border: `1px solid var(--color-surface)`,
                    color: 'var(--color-text)',
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-lg font-semibold"
                  style={{
                    background: theme.colors.primary,
                    color: themeId === 'modern' ? '#fff' : 'var(--color-text)',
                  }}
                >
                  Join
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
