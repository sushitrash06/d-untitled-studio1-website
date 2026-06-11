'use client';

import React from 'react';

interface AboutProps {
  setActiveSection: (section: string) => void;
}

export default function About({ setActiveSection }: AboutProps) {
  return (
    <section id="about" className="py-10 bg-[#FAF8F5] border-b border-studio-stone relative overflow-hidden" aria-label="About D-Untitled-1 Studio">
      {/* Abstract background logo watermark */}
      <div className="absolute -right-20 top-20 opacity-[0.03] select-none pointer-events-none transform rotate-12">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main heading */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-studio-bronze">Who We Are</span>
          <h2 className="font-serif text-4xl md:text-5xl text-studio-dark mt-1">About Our Practice</h2>
          <div className="h-0.5 w-16 bg-studio-gold mt-2"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left Block: Logo vector & Founding Description */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <div className="flex items-center gap-4 bg-studio-paper p-6 border border-studio-stone/60">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection('home');
                }}
                className="flex items-center gap-3 group"
                id="brand-logo-anchor"
              >
                <img src="/img/logo.png" className="w-30 text-studio-bronze" alt="D-Untitled-1 Studio Logo — Architecture & Interior Design" />
              </a>
            </div>

            <div className="space-y-6 text-neutral-600 leading-relaxed text-sm text-justify">
              <p>
                <strong className="text-studio-dark">untitledDStudio-1</strong> was founded by two passionate Indonesian architects, <strong className="text-studio-dark">Rizky Chandra</strong> and <strong className="text-studio-dark">Yuditia</strong>, who share a common vision in redefining modern architectural practice. Established in 2015, the studio emerged from their shared commitment to create thoughtful, functional, and forward-thinking design solutions.
              </p>
              <p>
                With over a decade of combined experience across various scale residential, commercial, and institutional projects, untitledDStudio-1 thrives at the intersection of conceptual aesthetic creativity, regional heritage, and robust technical precision.
              </p>
            </div>
          </div>

          {/* Right Block: Design Philosophy Box as drawn in Image 2 */}
          <div className="lg:col-span-7 flex flex-col space-y-10" id="philosophy">

            {/* Image 2 loyal styled banner block */}
            <div className="relative">
              {/* Horizontal Bronze Header Bar wrapper from Image 2 layout */}
              <div className="inline-block relative">
                <div className="bg-[#DBCFB3]/50 text-studio-dark font-serif text-2xl md:text-3xl px-8 py-3 tracking-widest uppercase relative z-10 font-light pr-20 shadow-sm border-l-4 border-studio-bronze">
                  Design Philosophy
                </div>
                <div className="absolute -bottom-1 -right-1 w-full h-full bg-[#E5D7BE]/30 -z-0"></div>
              </div>

              {/* Body paragraph copy verbatim */}
              <div className="mt-8 bg-[#FAF8F5] border border-studio-stone/60 p-8 space-y-6 leading-relaxed text-sm text-neutral-600 text-justify">
                <p>
                  <strong className="text-studio-dark">untitledDStudio-1</strong> is passionate about creating design solutions for the major challenges we face today—how to build sustainably, how to create environments that are both diverse and delightful, and how to incorporate ergonomic principles.
                </p>
                <p>
                  We believe design should respond to real problems, client needs, and local contexts. Locality is a core element in all of our work, inspiring us to combine contemporary architecture with environmental and cultural relevance.
                </p>
                <p className="border-l-2 border-studio-bronze pl-4 italic font-medium text-studio-dark">
                  We believe that great design is not the result of a single idea, but a synergy of ideas from many sources. That&apos;s why in every project, we collaborate closely with clients and partners to create meaningful, thoughtful design solutions.
                </p>
              </div>
            </div>

          </div>

        </div>



      </div>
    </section>
  );
}
