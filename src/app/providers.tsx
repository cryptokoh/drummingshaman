'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Theme, ThemeId } from '@/lib/themes';

interface ThemeContextValue {
  theme: Theme;
  themeId: ThemeId;
  setTheme: (id: ThemeId) => void;
  cycleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const themeState = useTheme();

  return (
    <ThemeContext.Provider value={themeState}>
      <div
        className="theme-transition"
        style={{
          minHeight: '100vh',
          opacity: themeState.mounted ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
