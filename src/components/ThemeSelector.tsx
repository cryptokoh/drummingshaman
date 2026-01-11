'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeContext } from '@/app/providers';
import { themes, themeOrder, ThemeId, Theme } from '@/lib/themes';

// Mini preview component showing how theme would look
function ThemePreview({ theme }: { theme: Theme }) {
  return (
    <div
      className="w-24 h-16 sm:w-32 sm:h-20 rounded-lg overflow-hidden relative"
      style={{ background: theme.colors.background }}
    >
      {/* Mini header */}
      <div
        className="h-3 sm:h-4 flex items-center px-1.5"
        style={{ background: theme.colors.backgroundAlt }}
      >
        <div
          className="w-4 sm:w-6 h-1 rounded-full"
          style={{ background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})` }}
        />
      </div>

      {/* Mini content */}
      <div className="p-1.5 sm:p-2">
        {/* Title placeholder */}
        <div
          className="w-12 sm:w-16 h-1.5 sm:h-2 rounded-full mb-1"
          style={{ background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})` }}
        />
        {/* Text placeholders */}
        <div
          className="w-full h-1 rounded-full mb-0.5"
          style={{ background: theme.colors.textMuted + '40' }}
        />
        <div
          className="w-3/4 h-1 rounded-full mb-1.5"
          style={{ background: theme.colors.textMuted + '40' }}
        />
        {/* Mini cards */}
        <div className="flex gap-1">
          <div
            className="flex-1 h-3 sm:h-4 rounded"
            style={{ background: theme.colors.surface }}
          >
            <div
              className="w-1/2 h-full rounded opacity-50"
              style={{ background: theme.colors.primary }}
            />
          </div>
          <div
            className="flex-1 h-3 sm:h-4 rounded"
            style={{ background: theme.colors.surface }}
          >
            <div
              className="w-1/2 h-full rounded opacity-50"
              style={{ background: theme.colors.secondary }}
            />
          </div>
        </div>
      </div>

      {/* Mini button */}
      <div
        className="absolute bottom-1 right-1 w-4 sm:w-5 h-1.5 sm:h-2 rounded-full"
        style={{
          background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
          boxShadow: `0 0 4px ${theme.colors.glow}`,
        }}
      />
    </div>
  );
}

export function ThemeSelector() {
  const { themeId, setTheme, mounted } = useThemeContext();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredTheme, setHoveredTheme] = useState<ThemeId | null>(null);

  if (!mounted) return null;

  const currentTheme = themes[themeId];
  const previewTheme = hoveredTheme ? themes[hoveredTheme] : null;

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
            {/* Live Preview */}
            <AnimatePresence mode="wait">
              {previewTheme && (
                <motion.div
                  key={hoveredTheme}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-2 overflow-hidden"
                >
                  <div className="p-2 rounded-lg" style={{ background: 'var(--color-background)' }}>
                    <p className="text-[10px] sm:text-xs mb-1.5 text-center" style={{ color: 'var(--color-text-muted)' }}>
                      Preview
                    </p>
                    <ThemePreview theme={previewTheme} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col gap-1.5 sm:gap-2">
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
                    onMouseEnter={() => setHoveredTheme(id)}
                    onMouseLeave={() => setHoveredTheme(null)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-2 sm:gap-3 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-300 ${
                      isActive
                        ? ''
                        : 'hover:bg-[var(--color-background-alt)]'
                    }`}
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, ${theme.colors.primary}25, ${theme.colors.secondary}25)`
                        : undefined,
                      boxShadow: isActive
                        ? `inset 0 0 0 2px ${theme.colors.primary}`
                        : undefined,
                    }}
                  >
                    {/* Theme Color Preview */}
                    <div className="relative flex-shrink-0">
                      <motion.div
                        animate={isActive ? {
                          boxShadow: [
                            `0 0 10px ${theme.colors.glow}`,
                            `0 0 20px ${theme.colors.glow}`,
                            `0 0 10px ${theme.colors.glow}`,
                          ]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                        style={{
                          background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                        }}
                      />
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 rounded-full flex items-center justify-center text-[8px] sm:text-[10px]"
                          style={{
                            background: theme.colors.accent,
                            color: '#fff',
                          }}
                        >
                          ✓
                        </motion.div>
                      )}
                    </div>

                    {/* Theme Info */}
                    <div className="text-left min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm sm:text-base">{theme.icon}</span>
                        <span className="font-semibold text-xs sm:text-sm truncate">
                          {theme.name}
                        </span>
                      </div>
                      <span
                        className="text-[10px] sm:text-xs hidden sm:block truncate"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {theme.description}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Keyboard hint */}
            <div className="hidden sm:block mt-2 pt-2 border-t text-center" style={{ borderColor: 'var(--color-surface)' }}>
              <span className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
                Hover for preview
              </span>
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
          className="absolute inset-0 flex items-center justify-center text-xl sm:text-2xl"
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
