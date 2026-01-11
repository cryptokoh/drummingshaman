'use client';

import { useEffect, useRef, useMemo } from 'react';
import { ThemeId, themes } from '@/lib/themes';

interface ParticleFieldProps {
  themeId: ThemeId;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  hue: number;
}

export function ParticleField({ themeId }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);

  const theme = themes[themeId];

  // Generate particles based on theme
  const particleConfig = useMemo(() => {
    switch (themeId) {
      case 'mystical':
        return { count: 80, sizeRange: [1, 4], speed: 0.3, glow: true };
      case 'earthy':
        return { count: 40, sizeRange: [2, 6], speed: 0.2, glow: false };
      case 'modern':
        return { count: 30, sizeRange: [1, 2], speed: 0.15, glow: false };
      case 'dark':
        return { count: 60, sizeRange: [1, 5], speed: 0.4, glow: true };
      default:
        return { count: 50, sizeRange: [1, 3], speed: 0.3, glow: true };
    }
  }, [themeId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleConfig.count; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size:
            particleConfig.sizeRange[0] +
            Math.random() *
              (particleConfig.sizeRange[1] - particleConfig.sizeRange[0]),
          speedX: (Math.random() - 0.5) * particleConfig.speed,
          speedY: (Math.random() - 0.5) * particleConfig.speed,
          opacity: 0.2 + Math.random() * 0.6,
          hue: Math.random() * 60 - 30, // Color variation
        });
      }
    };

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 255, g: 255, b: 255 };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const primaryRgb = hexToRgb(theme.colors.primary);
      const secondaryRgb = hexToRgb(theme.colors.secondary);

      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Blend between primary and secondary colors
        const blend = (index % 2 === 0) ? 0 : 1;
        const rgb = blend === 0 ? primaryRgb : secondaryRgb;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

        if (particleConfig.glow) {
          // Glow effect
          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.size * 3
          );
          gradient.addColorStop(
            0,
            `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${particle.opacity})`
          );
          gradient.addColorStop(
            1,
            `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`
          );
          ctx.fillStyle = gradient;
          ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        } else {
          ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${particle.opacity * 0.5})`;
        }

        ctx.fill();
      });

      // Draw connections for mystical and dark themes
      if (themeId === 'mystical' || themeId === 'dark') {
        particlesRef.current.forEach((particle, i) => {
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const other = particlesRef.current[j];
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, ${0.1 * (1 - distance / 100)})`;
              ctx.stroke();
            }
          }
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [themeId, theme.colors.primary, theme.colors.secondary, particleConfig]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.7 }}
    />
  );
}
