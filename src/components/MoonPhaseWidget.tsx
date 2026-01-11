'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useThemeContext } from '@/app/providers';

interface MoonData {
  phase: string;
  illumination: number;
  age: number;
  emoji: string;
  message: string;
  ceremony: string;
}

function getMoonPhase(date: Date = new Date()): MoonData {
  // Calculate moon phase using a simplified algorithm
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Reference new moon: January 6, 2000
  const refDate = new Date(2000, 0, 6);
  const currentDate = new Date(year, month - 1, day);
  const daysSinceRef = Math.floor((currentDate.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));

  // Moon cycle is approximately 29.53 days
  const moonCycle = 29.53;
  const age = daysSinceRef % moonCycle;
  const normalizedAge = age < 0 ? age + moonCycle : age;

  // Calculate illumination (0-100)
  const illumination = Math.round(
    (1 - Math.cos((normalizedAge / moonCycle) * 2 * Math.PI)) * 50
  );

  // Determine phase
  const phases: { name: string; emoji: string; message: string; ceremony: string }[] = [
    { name: 'New Moon', emoji: '🌑', message: 'Time for new beginnings and setting intentions', ceremony: 'Perfect for intention-setting ceremonies' },
    { name: 'Waxing Crescent', emoji: '🌒', message: 'Your intentions are taking root', ceremony: 'Ideal for growth and manifestation work' },
    { name: 'First Quarter', emoji: '🌓', message: 'Take action on your goals', ceremony: 'Good for empowerment ceremonies' },
    { name: 'Waxing Gibbous', emoji: '🌔', message: 'Refine and adjust your path', ceremony: 'Focus on refinement rituals' },
    { name: 'Full Moon', emoji: '🌕', message: 'Celebrate and release what no longer serves', ceremony: 'Powerful for release ceremonies' },
    { name: 'Waning Gibbous', emoji: '🌖', message: 'Share your wisdom and gratitude', ceremony: 'Time for gratitude practices' },
    { name: 'Last Quarter', emoji: '🌗', message: 'Let go and forgive', ceremony: 'Ideal for forgiveness rituals' },
    { name: 'Waning Crescent', emoji: '🌘', message: 'Rest and reflect before renewal', ceremony: 'Best for meditation and rest' },
  ];

  const phaseIndex = Math.floor((normalizedAge / moonCycle) * 8) % 8;
  const currentPhase = phases[phaseIndex];

  return {
    phase: currentPhase.name,
    illumination,
    age: Math.round(normalizedAge),
    emoji: currentPhase.emoji,
    message: currentPhase.message,
    ceremony: currentPhase.ceremony,
  };
}

function getUpcomingMoons(count: number = 4): { date: Date; phase: string; emoji: string }[] {
  const moons: { date: Date; phase: string; emoji: string }[] = [];
  const today = new Date();
  const moonCycle = 29.53;

  // Find next new moon
  let checkDate = new Date(today);
  for (let i = 0; i < 30; i++) {
    const moonData = getMoonPhase(checkDate);
    if (moonData.phase === 'New Moon' && checkDate > today) {
      moons.push({ date: new Date(checkDate), phase: 'New Moon', emoji: '🌑' });
      break;
    }
    checkDate.setDate(checkDate.getDate() + 1);
  }

  // Find next full moon
  checkDate = new Date(today);
  for (let i = 0; i < 30; i++) {
    const moonData = getMoonPhase(checkDate);
    if (moonData.phase === 'Full Moon' && checkDate > today) {
      moons.push({ date: new Date(checkDate), phase: 'Full Moon', emoji: '🌕' });
      break;
    }
    checkDate.setDate(checkDate.getDate() + 1);
  }

  // Sort by date
  moons.sort((a, b) => a.date.getTime() - b.date.getTime());

  return moons.slice(0, count);
}

export function MoonPhaseWidget({ compact = false }: { compact?: boolean }) {
  const { theme } = useThemeContext();
  const [moonData, setMoonData] = useState<MoonData | null>(null);
  const [upcomingMoons, setUpcomingMoons] = useState<{ date: Date; phase: string; emoji: string }[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setMoonData(getMoonPhase());
    setUpcomingMoons(getUpcomingMoons());
  }, []);

  if (!moonData) return null;

  if (compact) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="card p-4 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">{moonData.emoji}</span>
          <div>
            <p className="font-semibold text-sm">{moonData.phase}</p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              {moonData.illumination}% illuminated
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-5 sm:p-6"
    >
      {/* Current Phase */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6">
        {/* Moon Visualization */}
        <div className="relative">
          <motion.div
            animate={{
              boxShadow: [
                `0 0 20px ${theme.colors.primary}40`,
                `0 0 40px ${theme.colors.primary}60`,
                `0 0 20px ${theme.colors.primary}40`,
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.surface}, ${theme.colors.backgroundAlt})`,
            }}
          >
            {/* Illumination overlay */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `linear-gradient(${90 + (moonData.age / 29.53) * 360}deg,
                  ${theme.colors.primary}${Math.round(moonData.illumination * 2.55).toString(16).padStart(2, '0')} 0%,
                  transparent 50%)`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-4xl sm:text-5xl">
              {moonData.emoji}
            </div>
          </motion.div>

          {/* Illumination Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="none"
              stroke={theme.colors.primary}
              strokeWidth="2"
              strokeDasharray={`${moonData.illumination * 3.01} 301`}
              className="opacity-50"
            />
          </svg>
        </div>

        {/* Phase Info */}
        <div className="text-center sm:text-left flex-1">
          <h3
            className="text-xl sm:text-2xl font-bold mb-1"
            style={{ fontFamily: 'var(--font-cinzel)' }}
          >
            {moonData.phase}
          </h3>
          <p className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>
            Day {moonData.age} of lunar cycle • {moonData.illumination}% illuminated
          </p>
          <p className="text-sm sm:text-base" style={{ color: theme.colors.accent }}>
            {moonData.message}
          </p>
        </div>
      </div>

      {/* Ceremony Suggestion */}
      <div
        className="p-3 sm:p-4 rounded-lg mb-4"
        style={{ background: `${theme.colors.primary}10` }}
      >
        <p className="text-xs sm:text-sm">
          <span className="font-semibold" style={{ color: theme.colors.primary }}>
            Ceremony Tip:
          </span>{' '}
          <span style={{ color: 'var(--color-text-muted)' }}>{moonData.ceremony}</span>
        </p>
      </div>

      {/* Upcoming Moons */}
      {upcomingMoons.length > 0 && (
        <div>
          <h4
            className="text-xs sm:text-sm uppercase tracking-wider mb-3"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Upcoming
          </h4>
          <div className="flex flex-wrap gap-2">
            {upcomingMoons.map((moon, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-3 py-2 rounded-full text-xs sm:text-sm"
                style={{ background: 'var(--color-surface)' }}
              >
                <span>{moon.emoji}</span>
                <span>{moon.phase}</span>
                <span style={{ color: 'var(--color-text-muted)' }}>
                  {moon.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export function MoonPhaseCalendar() {
  const { theme } = useThemeContext();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: { date: Date; moon: MoonData }[] = [];

    for (let d = 1; d <= lastDay.getDate(); d++) {
      const dayDate = new Date(year, month, d);
      days.push({ date: dayDate, moon: getMoonPhase(dayDate) });
    }

    // Add padding for first week
    const startPadding = firstDay.getDay();
    for (let i = 0; i < startPadding; i++) {
      days.unshift({ date: new Date(year, month, -i), moon: getMoonPhase(new Date(year, month, -i)) });
    }

    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const today = new Date();

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <div className="card p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <motion.button
          onClick={prevMonth}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full"
          style={{ background: 'var(--color-surface)' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        <h3
          className="text-lg sm:text-xl font-bold"
          style={{ fontFamily: 'var(--font-cinzel)' }}
        >
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>

        <motion.button
          onClick={nextMonth}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full"
          style={{ background: 'var(--color-surface)' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div
            key={i}
            className="text-center text-xs font-semibold py-2"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.slice(0, 42).map((day, index) => {
          const isCurrentMonth = day.date.getMonth() === currentMonth.getMonth();
          const isToday =
            day.date.getDate() === today.getDate() &&
            day.date.getMonth() === today.getMonth() &&
            day.date.getFullYear() === today.getFullYear();
          const isSpecialPhase = day.moon.phase === 'Full Moon' || day.moon.phase === 'New Moon';

          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className={`aspect-square flex flex-col items-center justify-center rounded-lg text-xs sm:text-sm cursor-pointer transition-all ${
                !isCurrentMonth ? 'opacity-30' : ''
              }`}
              style={{
                background: isToday
                  ? `linear-gradient(135deg, ${theme.colors.primary}30, ${theme.colors.secondary}30)`
                  : isSpecialPhase
                  ? `${theme.colors.accent}15`
                  : 'transparent',
                border: isToday ? `2px solid ${theme.colors.primary}` : undefined,
              }}
            >
              <span className="text-base sm:text-lg leading-none">{day.moon.emoji}</span>
              <span className="mt-0.5">{day.date.getDate()}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 mt-4 pt-4 border-t" style={{ borderColor: 'var(--color-surface)' }}>
        <div className="flex items-center gap-1 text-xs">
          <span>🌑</span>
          <span style={{ color: 'var(--color-text-muted)' }}>New</span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <span>🌓</span>
          <span style={{ color: 'var(--color-text-muted)' }}>Quarter</span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <span>🌕</span>
          <span style={{ color: 'var(--color-text-muted)' }}>Full</span>
        </div>
      </div>
    </div>
  );
}
