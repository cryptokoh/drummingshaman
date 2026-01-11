'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useThemeContext } from '@/app/providers';

const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#events', label: 'Events' },
  { href: '/shaman', label: 'Meet Anup' },
  { href: '/journey', label: 'Drum Journey' },
  { href: '/tools', label: 'Tools' },
  { href: '/#connect', label: 'Contact' },
];

export function Navigation() {
  const { theme } = useThemeContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-4'
        }`}
        style={{
          background: isScrolled ? `${theme.colors.background}ee` : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            className="text-lg sm:text-xl font-bold"
            style={{ fontFamily: 'var(--font-cinzel)' }}
          >
            <span className="text-gradient">TDS</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                whileHover={{ y: -2 }}
                className="px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg"
            style={{ background: 'var(--color-surface)' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 lg:hidden pt-20"
            style={{ background: `${theme.colors.background}f8`, backdropFilter: 'blur(20px)' }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-4 pb-20">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-medium py-3 px-6"
                  style={{ fontFamily: 'var(--font-cinzel)' }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
