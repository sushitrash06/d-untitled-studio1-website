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
          <div className="flex items-center gap-2 px-3 py-1 bg-studio-paper border border-studio-gold/35 rounded-none text-xs uppercase tracking-widest text-[#8D7654] font-medium font-mono">
            <Sparkles className="h-3 w-3 animate-pulse" /> Architecture & Interior Studio
          </div>

          <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-studio-dark leading-[1.1]" id="hero-main-title">
            Crafting <span className="italic font-light">spatial poetry</span> out of raw natural materials.
          </h1>

          <p className="text-base text-neutral-600 leading-relaxed font-sans mt-2">
            We believe architectural layouts must respond directly to regional topography, sustainable ergonomics, and tactile memory. Explore the award-winning design solutions of Yuditia and Rizky Chandra.
          </p>

          {/* Micro Specs of current background project */}
          {slideProjects[heroSlideIndex] && (
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-studio-bronze font-mono bg-studio-paper/40 backdrop-blur-md p-3 border border-studio-stone w-full max-w-md">
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-studio-gold" /> {slideProjects[heroSlideIndex].location}
              </div>
              <div className="flex items-center gap-1">
                <Layers className="h-3.5 w-3.5 text-studio-gold" /> {slideProjects[heroSlideIndex].area}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-studio-gold" /> Concept {slideProjects[heroSlideIndex].year}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection('portfolio');
              }}
              className="px-6 py-4 bg-studio-dark text-studio-beige hover:bg-studio-bronze flex items-center gap-3 uppercase text-xs tracking-[0.2em] font-bold transition-all duration-300"
            >
              View Portfolio <ChevronRight className="h-4 w-4" />
            </a>
            <a
              href="#planner"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection('planner');
              }}
              className="px-6 py-4 border border-studio-dark text-studio-dark hover:bg-studio-paper flex items-center gap-2 uppercase text-xs tracking-[0.2em] font-bold transition-all duration-300"
            >
              Space Fee Estimator <Sliders className="h-4 w-4" />
            </a>
          </div>

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
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#8D7654] font-mono mb-3 flex items-center gap-1">
            <RotateCw className="h-3 w-3 animate-spin" style={{ animationDuration: '6s' }} /> Click Card to Spin
          </span>

          {/* 3D Card container */}
          <div
            className="relative w-full max-w-[400px] aspect-[1.75/1] cursor-pointer"
            style={{ perspective: '1200px' }}
            onClick={() => setIsCardFlipped(!isCardFlipped)}
            id="business-card-rotator"
          >
            <div
              className="w-full h-full relative duration-700 ease-out transform-style-3d"
              style={{ transform: isCardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >

              {/* CARD FRONT SIDE (Elegant Logo Branding) */}
              <div className="absolute inset-0 w-full h-full backface-hidden bg-[#FAF8F5] p-6 rounded-lg shadow-xl border border-studio-stone/60 flex flex-col justify-between">
                {/* Card top bar */}
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-neutral-400">UNTITLEDD STUDIO-1 © 2026</span>
                  <div className="h-1.5 w-1.5 rounded-full bg-studio-gold"></div>
                </div>

                {/* Card giant central minimalist logo */}
                <div className="flex flex-col items-center justify-center py-2">
                  <span className="flex items-center gap-3 group" id="brand-logo-anchor">
                    <img src="/img/logo.png" className="w-30 text-studio-bronze" alt="Logo" />
                  </span>
                </div>

                {/* Aesthetic card bottom accents */}
                <div className="flex justify-between items-end border-t border-studio-stone/40 pt-2">
                  <span className="text-[8px] font-mono text-[#8D7654] uppercase tracking-wider">Jakarta • Bali • Bandung</span>
                  <span className="text-[7px] font-mono text-neutral-400">Architects & Designers</span>
                </div>
              </div>

              {/* CARD BACK SIDE (Contact Yuditia Detail) */}
              <div
                className="absolute inset-0 w-full h-full backface-hidden bg-[#FAF8F5] p-6 rounded-lg shadow-xl border border-studio-stone/60 flex flex-col justify-between"
                style={{ transform: 'rotateY(180deg)' }}
              >
                <div className="flex justify-between items-start w-full">
                  {/* Founder identity */}
                  <div>
                    <h3 className="font-serif text-base tracking-[0.05em] font-semibold text-studio-dark leading-none">YUDITIA</h3>
                    <p className="font-serif italic text-xs text-studio-bronze mt-1">Architect</p>
                  </div>

                  {/* QR Code Mockup (Interactive direct link) */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy('https://www.UntitledDstudioOne.co.id', 'web');
                    }}
                    className="border border-studio-stone bg-white p-1 rounded hover:scale-105 transition-transform"
                    title="Copy Website Link"
                  >
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.UntitledDstudioOne.co.id&color=1E1C1A&bgcolor=FAF8F5"
                      alt="QR Code Website"
                      className="h-11 w-11"
                    />
                  </div>
                </div>

                {/* Contacts Column */}
                <div className="flex flex-col gap-1.5 my-1 text-left">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy('www.UntitledDstudioOne.co.id', 'web');
                    }}
                    className="text-[9.5px] font-mono text-left text-neutral-600 hover:text-studio-gold flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8D7654]"></span> www.UntitledDstudioOne.co.id
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy('+62 89601286991', 'phone');
                    }}
                    className="text-[9.5px] font-mono text-left text-neutral-600 hover:text-studio-gold flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8D7654]"></span> +62 896-0128-6991
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy('UntitleDstudioOne@gmail.com', 'email');
                    }}
                    className="text-[9.5px] font-mono text-left text-neutral-600 hover:text-studio-gold flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8D7654]"></span> UntitleDstudioOne@gmail.com
                  </button>
                </div>

                <div className="border-t border-studio-stone/45 pt-1.5 flex justify-between items-center">
                  <span className="text-[7.5px] font-mono text-[#8D7654] uppercase tracking-widest leading-none">Partner: Rizky Chandra</span>
                  <span className="text-[7px] text-zinc-400 font-mono italic">Click item to copy</span>
                </div>
              </div>

            </div>
          </div>

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
