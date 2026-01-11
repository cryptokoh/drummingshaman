export type ThemeId = 'mystical' | 'earthy' | 'modern' | 'dark';

export interface Theme {
  id: ThemeId;
  name: string;
  description: string;
  icon: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    backgroundAlt: string;
    surface: string;
    text: string;
    textMuted: string;
    glow: string;
  };
}

export const themes: Record<ThemeId, Theme> = {
  mystical: {
    id: 'mystical',
    name: 'Mystical',
    description: 'Ethereal cosmic journey',
    icon: '🌌',
    colors: {
      primary: '#7c3aed',      // Deep violet
      secondary: '#c084fc',    // Light purple
      accent: '#fbbf24',       // Gold
      background: '#0f0a1a',   // Dark cosmic
      backgroundAlt: '#1a1025', // Slightly lighter
      surface: '#251a35',      // Card surfaces
      text: '#f5f3ff',         // Light lavender
      textMuted: '#a78bfa',    // Muted purple
      glow: '#8b5cf6',         // Glow color
    },
  },
  earthy: {
    id: 'earthy',
    name: 'Earthy',
    description: 'Grounded natural spirit',
    icon: '🌿',
    colors: {
      primary: '#b45309',      // Terracotta
      secondary: '#22c55e',    // Forest green
      accent: '#d4a574',       // Sand/tan
      background: '#1a1512',   // Dark earth
      backgroundAlt: '#251f1a', // Warm brown
      surface: '#2d2620',      // Wood tone
      text: '#fef3c7',         // Warm cream
      textMuted: '#a3a38a',    // Sage
      glow: '#84cc16',         // Natural green glow
    },
  },
  modern: {
    id: 'modern',
    name: 'Modern',
    description: 'Clean spiritual minimalism',
    icon: '✨',
    colors: {
      primary: '#18181b',      // Near black
      secondary: '#71717a',    // Gray
      accent: '#d4af37',       // Classic gold
      background: '#fafafa',   // Off white
      backgroundAlt: '#f4f4f5', // Light gray
      surface: '#ffffff',      // Pure white
      text: '#18181b',         // Dark text
      textMuted: '#71717a',    // Gray text
      glow: '#d4af37',         // Gold glow
    },
  },
  dark: {
    id: 'dark',
    name: 'Immersive',
    description: 'Fire and shadow',
    icon: '🔥',
    colors: {
      primary: '#ea580c',      // Fire orange
      secondary: '#dc2626',    // Deep red
      accent: '#fbbf24',       // Ember gold
      background: '#030303',   // Pure black
      backgroundAlt: '#0a0a0a', // Near black
      surface: '#171717',      // Dark surface
      text: '#fef2f2',         // Warm white
      textMuted: '#a8a29e',    // Stone gray
      glow: '#f97316',         // Orange glow
    },
  },
};

export const themeOrder: ThemeId[] = ['mystical', 'earthy', 'modern', 'dark'];

export const defaultTheme: ThemeId = 'mystical';

export function getTheme(id: ThemeId): Theme {
  return themes[id];
}

export function getCSSVariables(theme: Theme): Record<string, string> {
  return {
    '--color-primary': theme.colors.primary,
    '--color-secondary': theme.colors.secondary,
    '--color-accent': theme.colors.accent,
    '--color-background': theme.colors.background,
    '--color-background-alt': theme.colors.backgroundAlt,
    '--color-surface': theme.colors.surface,
    '--color-text': theme.colors.text,
    '--color-text-muted': theme.colors.textMuted,
    '--color-glow': theme.colors.glow,
  };
}
