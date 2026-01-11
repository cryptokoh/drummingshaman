'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeContext } from '@/app/providers';
import { themes, themeOrder, ThemeId } from '@/lib/themes';

export function ThemeSelector() {
  const { themeId, setTheme, mounted } = useThemeContext();
  const [isOpen, setIsOpen] = useState(false);

  if (!mounted) return null;

  const currentTheme = themes[themeId];

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Expanded Theme Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="absolute bottom-16 sm:bottom-20 right-0 p-2 sm:p-3 rounded-xl sm:rounded-2xl card"
            style={{
              background: `color-mix(in srgb, var(--color-surface) 95%, transparent)`,
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex flex-col gap-2">
              {themeOrder.map((id) => {
                const theme = themes[id];
                const isActive = id === themeId;

                return (
                  <motion.button
                    key={id}
                    onClick={() => {
                      setTheme(id);
                      setIsOpen(false);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 ${
                      isActive
                        ? ''
                        : 'hover:bg-[var(--color-background-alt)]'
                    }`}
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, ${theme.colors.primary}20, ${theme.colors.secondary}20)`
                        : undefined,
                      boxShadow: isActive
                        ? `inset 0 0 0 2px ${theme.colors.primary}`
                        : undefined,
                    }}
                  >
                    {/* Theme Color Preview */}
                    <div className="relative">
                      <div
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
                        style={{
                          background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                          boxShadow: isActive
                            ? `0 0 15px ${theme.colors.glow}`
                            : undefined,
                        }}
                      />
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute inset-0 rounded-full"
                          style={{
                            boxShadow: `0 0 0 2px ${theme.colors.accent}`,
                          }}
                        />
                      )}
                    </div>

                    {/* Theme Info */}
                    <div className="text-left">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="text-base sm:text-lg">{theme.icon}</span>
                        <span className="font-semibold text-xs sm:text-sm">
                          {theme.name}
                        </span>
                      </div>
                      <span
                        className="text-[10px] sm:text-xs hidden sm:block"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {theme.description}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Orb Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full cursor-pointer"
        style={{
          background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
        }}
      >
        {/* Animated Glow Ring */}
        <motion.div
          animate={{
            boxShadow: isOpen
              ? `0 0 30px ${currentTheme.colors.glow}, 0 0 60px ${currentTheme.colors.glow}40`
              : `0 0 20px ${currentTheme.colors.glow}80, 0 0 40px ${currentTheme.colors.glow}40`,
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 rounded-full"
        />

        {/* Icon */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', damping: 15 }}
          className="absolute inset-0 flex items-center justify-center text-2xl"
        >
          {isOpen ? '✕' : currentTheme.icon}
        </motion.div>

        {/* Pulse Effect */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
          }}
        />
      </motion.button>

      {/* Label on Hover - hidden on mobile */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap"
          >
            <span
              className="text-sm px-3 py-1.5 rounded-full"
              style={{
                background: 'var(--color-surface)',
                color: 'var(--color-text-muted)',
              }}
            >
              Change Theme
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
