'use client';

import React from 'react';

interface FooterProps {
  setActiveSection: (section: string) => void;
}

export default function Footer({ setActiveSection }: FooterProps) {
  return (
    <footer className="bg-[#FAF8F5] text-studio-dark border-t border-studio-stone pt-20 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-studio-stone">

        {/* Main big Brand coordinates column */}
        <div className="md:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection('home');
              }}
              className="flex items-center gap-3 group"
              id="brand-logo-anchor"
            >
              <img src="/img/logo.png" className="w-30 text-studio-bronze" alt="Logo" />
            </a>
          </div>

          <p className="text-xs text-neutral-600 leading-relaxed max-w-sm">
            We stand against the clinical and identical. Crafting architecture out of sustainable, ergonomic natural materials to belong organically with local histories.
          </p>

          <span className="text-[9px] text-neutral-400 font-mono block">
            D-untitled-1 Studio • © 2026 Yuditia & Rizky. All rights reserved.
          </span>
        </div>

        {/* Quick links columns */}
        <div className="md:col-span-3 space-y-4 text-left">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#8D7654] font-bold">Studio Exploration</span>
          <div className="flex flex-col gap-2.5 text-xs text-neutral-600 font-medium">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection('home');
              }}
              className="hover:text-studio-gold"
            >
              Manifesto Entry
            </a>
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection('portfolio');
              }}
              className="hover:text-studio-gold"
            >
              Selected Layouts
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection('about');
              }}
              className="hover:text-studio-gold"
            >
              Founders Practice
            </a>
            <a
              href="#planner"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection('planner');
              }}
              className="hover:text-studio-gold"
            >
              Space Area Blueprints
            </a>
          </div>
        </div>

        <div className="md:col-span-4 space-y-4 text-left">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#8D7654] font-bold">Design Foundations</span>
          <div className="bg-studio-paper p-4 border border-studio-stone/60 space-y-2">
            <p className="text-[11px] font-serif text-[#8D7654] italic">
              &quot;We believe that great design is not the result of a single idea, but a synergy of ideas from many sources.&quot;
            </p>
            <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest block text-right">— untitledD-1 Philosophy</span>
          </div>
        </div>

      </div>

      {/* Minimal Bottom Legals bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-zinc-400 uppercase tracking-[0.15em]">
        <span>Design crafted to match physical business profiles with precision</span>
        <span>Architect license: IAI 0128/6991/YUD</span>
      </div>
    </footer>
  );
}
