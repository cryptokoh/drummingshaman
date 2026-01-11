'use client';

import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Events } from '@/components/sections/Events';
import { Connect } from '@/components/sections/Connect';
import { Footer } from '@/components/sections/Footer';
import { ThemeSelector } from '@/components/ThemeSelector';
import { Navigation } from '@/components/Navigation';

export default function Home() {
  return (
    <main className="relative">
      {/* Navigation */}
      <Navigation />

      {/* Theme Selector - Fixed Position */}
      <ThemeSelector />

      {/* Page Sections */}
      <Hero />
      <About />
      <Experience />
      <Events />
      <Connect />
      <Footer />
    </main>
  );
}
