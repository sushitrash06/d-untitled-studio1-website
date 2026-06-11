'use client';

import React from 'react';
import { Sparkle } from 'lucide-react';

interface WhatWeOfferProps {
  setActiveSection: (section: string) => void;
}

const ArchitectureIcon = () => (
  <svg className="h-10 w-10 text-studio-bronze" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="12" width="26" height="22" rx="1.5" />
    <path d="M14 12v22" />
    <path d="M4 23h18" />
    <path d="M14 23c4 0 6 2 6 5" />
    <path d="M30 6l4 4-10 10h-4v-4L30 6z" />
  </svg>
);

const InteriorIcon = () => (
  <svg className="h-10 w-10 text-studio-bronze" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="8" width="12" height="10" rx="1" />
    <path d="M8 15l3-3 4 3" />
    <circle cx="14" cy="11" r="1" />
    <path d="M31 10l2 6h-6l2-6" />
    <path d="M31 16v18" />
    <path d="M29 34h4" />
    <path d="M8 26h18v6H8v-6z" />
    <path d="M6 28v4h2" />
    <path d="M26 28v4h2" />
    <path d="M10 26c0-3 2-4 5-4h4c3 0 5 1 5 4" />
  </svg>
);

const CustomFurnitureIcon = () => (
  <svg className="h-10 w-10 text-studio-bronze" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 24c0-6 2-8 10-8s10 2 10 8" />
    <path d="M8 24h24v6H8v-6z" />
    <path d="M10 30l-1 4" />
    <path d="M30 30l1 4" />
    <path d="M12 24c0-2 1-3 3-3h10c2 0 3 1 3 3" />
  </svg>
);

const StylingFinishingIcon = () => (
  <svg className="h-10 w-10 text-studio-gold" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 34c0-4 3-7 3-12v-4h4v4c0 5 3 8 3 12a2 2 0 0 1-2 2H18a2 2 0 0 1-2-2z" />
    <path d="M21 18V6" />
    <path d="M21 14c2-1 3-3 3-3" />
    <path d="M21 10c-2-1-3-3-3-3" />
    <circle cx="24" cy="11" r="1.5" />
    <circle cx="18" cy="7" r="1.5" />
    <circle cx="21" cy="5" r="1.5" />
    <path d="M30 28h6a3 3 0 0 1-3 3h-3v-3z" />
  </svg>
);

export default function WhatWeOffer({ setActiveSection }: WhatWeOfferProps) {
  return (
    <section id="offers" className="py-20 bg-studio-beige border-b border-studio-stone" aria-label="Our Architecture and Interior Design Services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-3xl">
            {/* Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-studio-paper border border-studio-stone text-[10px] uppercase tracking-widest text-studio-bronze font-mono">
              <Sparkle className="h-3 w-3 text-studio-gold fill-studio-gold" /> What We Offer
            </div>
            {/* Main Title */}
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight text-studio-dark leading-[1.2]">
              Design services <span className="italic font-light">shaped</span> <br className="hidden md:inline" />
              around <span className="italic font-light">space, story, and material.</span>
            </h2>
          </div>
          {/* Subtitle description on the right */}
          <div className="lg:max-w-sm lg:pt-8">
            <p className="text-sm text-neutral-600 leading-relaxed">
              From spatial planning to interior styling, we craft thoughtful environments with natural textures, balanced proportion, and refined details.
            </p>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-studio-stone divide-y md:divide-y-0 lg:divide-x divide-studio-stone bg-studio-beige">
          
          {/* Card 01 */}
          <div className="p-8 flex flex-col justify-between h-[520px] group transition-all duration-300 hover:bg-studio-paper">
            <div className="space-y-5">
              <span className="font-mono text-xs text-studio-bronze block">01</span>
              <div className="pt-1">
                <ArchitectureIcon />
              </div>
              <div className="space-y-2 pt-2">
                <h3 className="font-serif text-xl font-semibold text-studio-dark leading-tight">
                  Architecture <br /> Planning
                </h3>
                <div className="h-[1px] w-full bg-studio-stone/80 my-3"></div>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Conceptual layouts, spatial flow, facade direction, and site-responsive planning.
                </p>
              </div>
            </div>
            {/* Card Image */}
            <div className="h-44 w-full overflow-hidden mt-6 relative border border-studio-stone/60">
              <img
                src="/img/offer_arch_planning.png"
                alt="Architecture Planning Service — conceptual layouts and site-responsive spatial flow design"
                loading="lazy"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-102 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Card 02 */}
          <div className="p-8 flex flex-col justify-between h-[520px] group transition-all duration-300 hover:bg-studio-paper">
            <div className="space-y-5">
              <span className="font-mono text-xs text-studio-bronze block">02</span>
              <div className="pt-1">
                <InteriorIcon />
              </div>
              <div className="space-y-2 pt-2">
                <h3 className="font-serif text-xl font-semibold text-studio-dark leading-tight">
                  Interior <br /> Design
                </h3>
                <div className="h-[1px] w-full bg-studio-stone/80 my-3"></div>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Material selection, moodboard, furniture layout, lighting, and interior detailing.
                </p>
              </div>
            </div>
            {/* Card Image */}
            <div className="h-44 w-full overflow-hidden mt-6 relative border border-studio-stone/60">
              <img
                src="/img/offer_interior_design.png"
                alt="Interior Design Service — material selection, moodboard, and furniture layout"
                loading="lazy"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-102 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Card 03 */}
          <div className="p-8 flex flex-col justify-between h-[520px] group transition-all duration-300 hover:bg-studio-paper">
            <div className="space-y-5">
              <span className="font-mono text-xs text-studio-bronze block">03</span>
              <div className="pt-1">
                <CustomFurnitureIcon />
              </div>
              <div className="space-y-2 pt-2">
                <h3 className="font-serif text-xl font-semibold text-studio-dark leading-tight">
                  Custom <br /> Furniture
                </h3>
                <div className="h-[1px] w-full bg-studio-stone/80 my-3"></div>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Bespoke built-ins and furniture pieces designed to complement the space.
                </p>
              </div>
            </div>
            {/* Card Image */}
            <div className="h-44 w-full overflow-hidden mt-6 relative border border-studio-stone/60">
              <img
                src="/img/offer_custom_furniture.png"
                alt="Custom Furniture Service — bespoke built-ins and handcrafted furniture pieces"
                loading="lazy"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-102 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Card 04 - Featured Dark Card */}
          <div className="p-8 flex flex-col justify-between h-[520px] bg-studio-dark text-studio-beige border-none relative group overflow-hidden">
            <div className="space-y-5 z-10">
              <span className="font-mono text-xs text-studio-gold block">04</span>
              <div className="pt-1">
                <StylingFinishingIcon />
              </div>
              <div className="space-y-2 pt-2">
                <h3 className="font-serif text-xl font-semibold text-white leading-tight">
                  Styling & <br /> Finishing
                </h3>
                <div className="h-[1px] w-full bg-zinc-800 my-3"></div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Final layer curation: decor, artwork, textures, and tactile accents.
                </p>
              </div>
            </div>
            {/* Card Image */}
            <div className="h-44 w-full overflow-hidden mt-6 relative border border-zinc-800 z-10">
              <img
                src="/img/offer_styling_finishing.png"
                alt="Styling & Finishing Service — final layer decor curation with artwork and tactile accents"
                loading="lazy"
                className="w-full h-full object-cover grayscale transition-all duration-500 scale-102 group-hover:scale-105"
              />
            </div>
            {/* Subtle background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          </div>

        </div>

      </div>
    </section>
  );
}
