'use client';

import { motion } from 'framer-motion';
import { useThemeContext } from '@/app/providers';

export function Footer() {
  const { theme } = useThemeContext();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="py-12 px-6"
      style={{ background: 'var(--color-background-alt)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              <span className="text-gradient">The Drumming Shaman</span>
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Ancient rhythms for modern healing. Experience the transformative
              power of shamanic drumming with Anap Pandey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-bold mb-4 uppercase tracking-wider text-sm"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Explore
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'About', href: '#about' },
                { label: 'Experience', href: '#experience' },
                { label: 'Events', href: '#events' },
                { label: 'Contact', href: '#connect' },
              ].map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-sm transition-colors"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sister Sites */}
          <div>
            <h4
              className="font-bold mb-4 uppercase tracking-wider text-sm"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Sacred Spaces
            </h4>
            <ul className="space-y-3">
              <li>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: 'var(--color-primary)' }}
                >
                  <span>🏛️</span>
                  <span>The Healing Temple</span>
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: 'var(--color-secondary)' }}
                >
                  <span>🌀</span>
                  <span>The Healing Vortex</span>
                </motion.a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-8"
          style={{ background: `${theme.colors.primary}20` }}
        />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p
            className="text-sm"
            style={{ color: 'var(--color-text-muted)' }}
          >
            &copy; {currentYear} The Drumming Shaman. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm transition-colors hover:underline"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm transition-colors hover:underline"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Terms of Service
            </a>
          </div>
        </div>

        {/* Sacred Geometry Decoration */}
        <div className="relative mt-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="mx-auto w-16 h-16 opacity-10"
            style={{
              border: `1px solid ${theme.colors.primary}`,
              borderRadius: '50%',
            }}
          >
            <div
              className="absolute inset-2"
              style={{
                border: `1px solid ${theme.colors.secondary}`,
                borderRadius: '50%',
              }}
            />
            <div
              className="absolute inset-4"
              style={{
                border: `1px solid ${theme.colors.accent}`,
                borderRadius: '50%',
              }}
            />
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
