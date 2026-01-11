'use client';

import { useState, useEffect, useCallback } from 'react';
import { ThemeId, defaultTheme, themes, getCSSVariables } from '@/lib/themes';

const STORAGE_KEY = 'drumming-shaman-theme';

export function useTheme() {
  const [themeId, setThemeId] = useState<ThemeId>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    if (stored && themes[stored]) {
      setThemeId(stored);
    }
  }, []);

  // Apply CSS variables when theme changes
  useEffect(() => {
    if (!mounted) return;

    const theme = themes[themeId];
    const variables = getCSSVariables(theme);
    const root = document.documentElement;

    // Apply CSS variables
    Object.entries(variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Set data attribute for additional styling hooks
    root.setAttribute('data-theme', themeId);

    // Persist to localStorage
    localStorage.setItem(STORAGE_KEY, themeId);
  }, [themeId, mounted]);

  const setTheme = useCallback((id: ThemeId) => {
    setThemeId(id);
  }, []);

  const cycleTheme = useCallback(() => {
    const order: ThemeId[] = ['mystical', 'earthy', 'modern', 'dark'];
    const currentIndex = order.indexOf(themeId);
    const nextIndex = (currentIndex + 1) % order.length;
    setThemeId(order[nextIndex]);
  }, [themeId]);

  return {
    theme: themes[themeId],
    themeId,
    setTheme,
    cycleTheme,
    mounted,
  };
}
