'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  MapPin,
  Layers,
  Calendar,
  ChevronRight,
  Sliders,
  RotateCw,
  Check
} from 'lucide-react';
import { Project } from '@/app/types';

interface HeroProps {
  projects: Project[];
  setActiveSection: (section: string) => void;
}

export default function Hero({ projects, setActiveSection }: HeroProps) {
  // Slideshow state
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  // Business Card 3D Flip state
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [copiedText, setCopiedText] = useState<'none' | 'email' | 'phone' | 'web'>('none');

  // Hero slideshow auto rotation (every 8s)
  useEffect(() => {
    if (projects.length === 0) return;
    const interval = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % Math.min(3, projects.length));
    }, 8000);
    return () => clearInterval(interval);
  }, [projects]);

  const handleCopy = (text: string, type: 'email' | 'phone' | 'web') => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText('none'), 3000);
  };

  const slideProjects = projects.slice(0, Math.min(3, projects.length));

  return (
    <section id="home" className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden border-b border-studio-stone">
      {/* Animated Slide Backdrops */}
      <div className="absolute inset-0 z-0">
        {slideProjects.map((proj, idx) => (
          <div
            key={proj.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${heroSlideIndex === idx ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-studio-beige via-studio-beige/90 to-transparent z-10" />
            <img
              src={proj.mainImage}
              alt={proj.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center scale-105 animate-subtle-zoom"
            />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Main Manifesto */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 max-w-2xl">


          <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-studio-dark leading-[1.1]" id="hero-main-title">
            Crafting <span className="italic font-light">spatial poetry</span> out of raw natural materials.
          </h1>

          <p className="text-base text-neutral-600 leading-relaxed font-sans mt-2">
            We believe architectural layouts must respond directly to regional topography, sustainable ergonomics, and tactile memory. Explore the award-winning design solutions of Yuditia and Rizky Chandra.
          </p>


          {/* Slider Dots indicators */}
          {slideProjects.length > 1 && (
            <div className="mt-12 flex items-center gap-3">
              {slideProjects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setHeroSlideIndex(idx)}
                  className={`h-2 transition-all duration-300 ${heroSlideIndex === idx ? 'w-10 bg-studio-gold' : 'w-2 bg-studio-stone hover:bg-studio-gold'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* SECTION 2A: TACTILE BUSINESS CARD HOLOGRAPHIC ROTATOR (Right Column) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          {/* Direct Copy Notifications Helper Toast */}
          {copiedText !== 'none' && (
            <div className="mt-3 px-3 py-1 bg-studio-dark text-studio-beige text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5 shadow-md">
              <Check className="h-3.5 w-3.5 text-studio-gold" /> Copied {copiedText === 'web' ? 'Website URL' : copiedText === 'phone' ? 'Phone Line' : 'Email address'}!
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
