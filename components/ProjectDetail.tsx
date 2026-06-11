'use client';

import React, { useState, useEffect } from 'react';
import { X, MapPin, Maximize2, Calendar, ArrowLeft } from 'lucide-react';
import { Project, BriefDraft } from '@/app/types';
import { Vibrant } from 'node-vibrant/browser';

interface ProjectDetailProps {
  selectedProject: Project | null;
  onBack: () => void;
  isDetailLoading: boolean;
  setBriefDraft: React.Dispatch<React.SetStateAction<BriefDraft>>;
  setActiveSection: (section: string) => void;
}

export default function ProjectDetail({
  selectedProject,
  onBack,
  isDetailLoading,
  setBriefDraft,
  setActiveSection
}: ProjectDetailProps) {
  const [detectedColors, setDetectedColors] = useState<{ name: string; hex: string }[]>([]);
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedProject || !selectedProject.mainImage) return;

    let active = true;
    const fallbackPalette = selectedProject.colorPalette || [
      { name: 'Warm Charcoal', hex: '#1E1C1A' },
      { name: 'Bronze Accent', hex: '#8D7654' },
      { name: 'Warm Beige', hex: '#EAE5DB' },
      { name: 'Washi Cream', hex: '#FAF5EE' }
    ];

    setDetectedColors([]);

    Vibrant.from(selectedProject.mainImage)
      .getPalette()
      .then((palette) => {
        if (!active) return;

        const swatches: { name: string; hex: string }[] = [];
        if (palette.Vibrant) swatches.push({ name: 'Vibrant Accent', hex: palette.Vibrant.hex });
        if (palette.DarkVibrant) swatches.push({ name: 'Deep Structure', hex: palette.DarkVibrant.hex });
        if (palette.Muted) swatches.push({ name: 'Muted Harmony', hex: palette.Muted.hex });
        if (palette.LightVibrant || palette.LightMuted) {
          const lightSwatch = palette.LightVibrant || palette.LightMuted;
          if (lightSwatch) swatches.push({ name: 'Light Canvas', hex: lightSwatch.hex });
        }

        // Fill up to 4 if missing
        if (swatches.length < 4) {
          const names = ['Vibrant Accent', 'Deep Structure', 'Muted Harmony', 'Light Canvas'];
          fallbackPalette.forEach((fb, idx) => {
            if (swatches.length < 4 && !swatches.some(s => s.hex.toLowerCase() === fb.hex.toLowerCase())) {
              swatches.push({ name: names[swatches.length] || fb.name, hex: fb.hex });
            }
          });
        }

        setDetectedColors(swatches.slice(0, 4));
      })
      .catch((err) => {
        console.warn('Error extracting colors with node-vibrant:', err);
        if (active) {
          setDetectedColors(fallbackPalette);
        }
      });

    return () => {
      active = false;
    };
  }, [selectedProject?.mainImage, selectedProject?.colorPalette]);

  if (!selectedProject) {
    return (
      <section className="py-20 bg-studio-beige text-center">
        <p className="text-sm text-neutral-500 font-mono">No project selected.</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-studio-dark text-white text-xs font-semibold uppercase tracking-widest">
          Go Back
        </button>
      </section>
    );
  }

  return (
    <section className="py-12 bg-studio-beige border-b border-studio-stone relative">
      {/* Elegant Top Progress/Loading Bar */}
      {isDetailLoading && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-studio-gold/20 overflow-hidden z-50">
          <div className="h-full bg-studio-gold animate-infinite-loading w-1/3"></div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Navigation Action Header */}
        <div className="flex items-center justify-between border-b border-studio-stone pb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-studio-bronze hover:text-studio-gold transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Projects
          </button>

          <button
            onClick={onBack}
            className="p-2 bg-studio-paper hover:bg-studio-stone text-studio-dark transition-all border border-studio-stone/60"
            title="Close Canvas"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Title & Category Area */}
        <div className="space-y-4">
          <span className="mono-spec text-[9px] uppercase tracking-widest bg-studio-dark text-white px-2.5 py-1 inline-block">
            {selectedProject.category} category
          </span>
          <h1 className="font-serif text-3xl md:text-6xl tracking-tight text-studio-dark font-semibold leading-[1.1]">
            {selectedProject.title}
          </h1>
        </div>

        {/* Hero image cover */}
        <div className="relative aspect-[16/7] md:aspect-[16/6] bg-neutral-900 overflow-hidden border border-studio-stone">
          <img
            src={selectedProject.mainImage}
            alt={selectedProject.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale object-center opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-studio-beige/30" />
        </div>


        {/* Core Narrative Text Column Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
          {/* Project story verbatim */}
          <div className="lg:col-span-7 space-y-6">
            <h4 className="text-xs font-mono uppercase tracking-widest text-studio-bronze">Project Narrative Conception</h4>
            <p className="font-serif text-xl md:text-2xl font-light italic leading-relaxed text-[#8D7654]">
              &quot;{selectedProject.subtitle}&quot;
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed text-justify mt-2 pr-4">
              {selectedProject.fullStory || selectedProject.description}
            </p>
          </div>

          {/* Materials & Colors specification boards */}
          <div className="lg:col-span-5 space-y-8">
            {/* Color Swatch board */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-studio-dark block">
                Aesthetic Color Palette Matrix
              </span>
              <div className="grid grid-cols-2 gap-3">
                {detectedColors.length === 0 ? (
                  Array.from({ length: 4 }).map((_, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2.5 bg-studio-paper border border-studio-stone/60 animate-pulse">
                      <div className="h-8 w-8 bg-studio-stone/30 border border-studio-stone"></div>
                      <div className="text-left flex flex-col gap-1.5 flex-grow">
                        <div className="h-2.5 bg-studio-stone/30 rounded w-16"></div>
                        <div className="h-2 bg-studio-stone/20 rounded w-12"></div>
                      </div>
                    </div>
                  ))
                ) : (
                  detectedColors.map((col) => (
                    <div key={col.hex} className="flex items-center gap-3 p-2.5 bg-studio-paper border border-studio-stone/60">
                      <div className="h-8 w-8 border border-studio-stone" style={{ backgroundColor: col.hex }}></div>
                      <div className="text-left flex flex-col">
                        <span className="text-[9.5px] font-sans font-semibold text-neutral-800 leading-none">{col.name}</span>
                        <span className="text-[8px] font-mono text-zinc-500 mt-1.5 uppercase tracking-wide leading-none">{col.hex}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Tactile Material Tags list details */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] font-bold text-studio-dark block">
                Curated Materials
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedProject.materials.map((mat) => (
                  <span key={mat} className="text-[9px] font-mono text-[#8D7654] uppercase tracking-wider px-3 py-2 bg-studio-paper border border-studio-stone">
                    {mat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Photo Gallery grid showing other perspectives */}
        <div className="space-y-6 border-t border-studio-stone pt-10">
          <div className="flex flex-col space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-studio-bronze">Alternative Perspectives Gallery</span>
            <span className="text-[10px] text-zinc-400 font-sans">Click on any view below to expand fullscreen</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {selectedProject.gallery && selectedProject.gallery.length > 0 ? (
              selectedProject.gallery.map((imgUrl, colIdx) => (
                <div
                  key={colIdx}
                  onClick={() => setActiveLightboxImage(imgUrl)}
                  className="relative aspect-[4/3] bg-zinc-200 overflow-hidden border border-studio-stone cursor-zoom-in group/gallery shadow-xs hover:shadow-md transition-shadow duration-300"
                >
                  <img
                    src={imgUrl}
                    alt="Perspective render"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale group-hover/gallery:grayscale-0 group-hover/gallery:scale-103 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-[9px] uppercase font-mono tracking-widest bg-studio-dark/85 text-studio-beige px-3 py-2 border border-white/10 shadow-lg">
                      View Fullscreen
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-8 text-center bg-studio-paper border border-studio-stone/60">
                <span className="text-xs font-mono text-zinc-400">No additional gallery views available</span>
              </div>
            )}
          </div>
        </div>

        {/* Call to action bar */}
        <div className="p-8 bg-studio-paper border border-studio-stone flex flex-col sm:flex-row items-center justify-between gap-6 mt-12">
          <div className="text-left flex flex-col gap-1">
            <span className="text-[9px] font-mono text-[#8D7654] uppercase tracking-widest font-semibold">LIKE THIS SPECIFIC WORKFLOW?</span>
            <span className="text-sm font-semibold text-neutral-800 font-serif">Apply these custom traits to your consultation briefing</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="px-5 py-2.5 bg-studio-beige border border-studio-stone text-studio-dark hover:bg-studio-stone text-xs font-semibold uppercase tracking-widest transition-colors"
            >
              Back to Projects
            </button>
            <button
              onClick={() => {
                setBriefDraft(prev => ({
                  ...prev,
                  stylePreference: selectedProject.category === 'interior' ? 'Japandi Calm' : 'Modern Tropical Craft',
                  notes: `I am highly inspired by the design narrative of the "${selectedProject.title}" in ${selectedProject.location}. Let's integrate similar materials.`
                }));
                setActiveSection('contact');
              }}
              className="px-6 py-2.5 bg-studio-dark text-white hover:bg-studio-bronze text-xs font-semibold uppercase tracking-widest transition-colors"
            >
              Configure My Brief
            </button>
          </div>
        </div>

      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      {activeLightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
          onClick={() => setActiveLightboxImage(null)}
        >
          <button
            className="absolute top-6 right-6 p-3 bg-zinc-900/80 hover:bg-studio-gold text-white hover:text-studio-dark transition-all rounded-none border border-zinc-800"
            onClick={() => setActiveLightboxImage(null)}
            title="Close Lightbox"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={activeLightboxImage}
            alt="Fullscreen render perspective"
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[90vh] object-contain shadow-2xl transition-transform duration-500 scale-100"
            onClick={(e) => e.stopPropagation()} // Prevent clicking on image from closing lightbox
          />
        </div>
      )}
    </section>
  );
}
