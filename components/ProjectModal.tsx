
import React from 'react';
import { X, MapPin, Maximize2, Calendar, User } from 'lucide-react';
import { Project, BriefDraft } from '@/app/types';

interface ProjectModalProps {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  isDetailLoading: boolean;
  setBriefDraft: React.Dispatch<React.SetStateAction<BriefDraft>>;
  setActiveSection: (section: string) => void;
}

export default function ProjectModal({
  selectedProject,
  setSelectedProject,
  isDetailLoading,
  setBriefDraft,
  setActiveSection
}: ProjectModalProps) {
  if (!selectedProject) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-studio-dark/85 backdrop-blur-sm flex items-center justify-center p-4 py-8 animate-fade-in">
      <div className="bg-studio-beige max-w-5xl w-full border border-studio-stone rounded-none max-h-[90vh] overflow-y-auto flex flex-col justify-between shadow-2xl relative text-left">
        {/* Elegant Top Progress/Loading Bar */}
        {isDetailLoading && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-studio-gold/20 overflow-hidden z-50">
            <div className="h-full bg-studio-gold animate-infinite-loading w-1/3"></div>
          </div>
        )}

        {/* Close trigger cross */}
        <button
          onClick={() => setSelectedProject(null)}
          className="absolute top-4 right-4 z-40 p-2 bg-studio-dark/80 backdrop-blur-md text-white border border-white/20 hover:bg-studio-gold hover:text-studio-dark transition-all rounded-none"
          title="Close Details View"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Body Header image cover */}
        <div className="relative aspect-[16/6] md:aspect-[16/5] bg-neutral-900 overflow-hidden shrink-0">
          <img src={selectedProject.mainImage} alt={selectedProject.title} referrerPolicy="no-referrer" className="w-full h-full object-cover grayscale object-center opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-studio-beige z-10" />
          <div className="absolute bottom-4 left-6 md:left-10 z-20">
            <span className="mono-spec text-[8.5px] uppercase tracking-widest bg-studio-dark text-white px-2 py-0.5">{selectedProject.category} category</span>
            <h3 className="font-serif text-3xl md:text-5xl tracking-tight text-studio-dark font-semibold mt-2">{selectedProject.title}</h3>
          </div>
        </div>

        {/* Core Specs panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-y border-studio-stone bg-studio-paper divide-x divide-studio-stone">
          <div className="p-4 flex flex-col items-center justify-center text-center">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest leading-none">LOCATION</span>
            <span className="text-sm font-semibold text-neutral-800 flex items-center gap-1.5 mt-2 font-serif uppercase"><MapPin className="h-3.5 w-3.5 text-studio-gold" /> {selectedProject.location}</span>
          </div>
          <div className="p-4 flex flex-col items-center justify-center text-center">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest leading-none">SQM SCALE FOOTPRINT</span>
            <span className="text-sm font-semibold text-neutral-800 flex items-center gap-1.5 mt-2 font-serif uppercase"><Maximize2 className="h-3.5 w-3.5 text-studio-gold" /> {selectedProject.area}</span>
          </div>
          <div className="p-4 flex flex-col items-center justify-center text-center">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest leading-none">COMMISSION YEAR</span>
            <span className="text-sm font-semibold text-neutral-800 flex items-center gap-1.5 mt-2 font-serif uppercase"><Calendar className="h-3.5 w-3.5 text-studio-gold" /> {selectedProject.year}</span>
          </div>
          <div className="p-4 flex flex-col items-center justify-center text-center">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest leading-none">ARCHITECTURE TEAM</span>
            <span className="text-sm font-semibold text-neutral-800 flex items-center gap-1.5 mt-2 font-serif uppercase"><User className="h-3.5 w-3.5 text-studio-gold" /> Yuditia & Rizky</span>
          </div>
        </div>

        {/* Core Narrative Text Column Details */}
        <div className="p-6 md:p-10 space-y-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Project story verbatim */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-studio-bronze">Project Narrative Conception</h4>
              <p className="font-serif text-lg md:text-xl font-light italic leading-relaxed text-[#8D7654]">
                &quot;{selectedProject.subtitle}&quot;
              </p>
              <p className="text-xs text-neutral-600 leading-relaxed text-justify mt-2 shrink pr-4">
                {selectedProject.fullStory}
              </p>
            </div>

            {/* Materials & Colors specification boards */}
            <div className="lg:col-span-5 space-y-8">

              {/* Color Swatch board */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-studio-dark block">Aesthetic Color Palette Matrix</span>
                <div className="grid grid-cols-2 gap-3">
                  {selectedProject.colorPalette.map((col) => (
                    <div key={col.hex} className="flex items-center gap-3 p-2 bg-studio-paper border border-studio-stone/60">
                      <div className="h-8 w-8 border border-studio-stone" style={{ backgroundColor: col.hex }}></div>
                      <div className="text-left flex flex-col">
                        <span className="text-[9.5px] font-sans font-semibold text-neutral-800 leading-none">{col.name}</span>
                        <span className="text-[8px] font-mono text-zinc-500 mt-1 uppercase tracking-wide leading-none">{col.hex}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tactile Material Tags list details */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] font-bold text-studio-dark block">Curated Materials</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedProject.materials.map((mat) => (
                    <span key={mat} className="text-[9px] font-mono text-[#8D7654] uppercase tracking-wider px-2.5 py-1.5 bg-studio-paper border border-studio-stone">
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Photo Collage grid showing other perspectives */}
          <div className="space-y-4 border-t border-studio-stone pt-8">
            <span className="text-xs font-mono uppercase tracking-widest text-studio-bronze">Alternative Perspectives Collage</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {selectedProject.gallery.map((imgUrl, colIdx) => (
                <div key={colIdx} className="relative aspect-[4/3] bg-zinc-200 overflow-hidden border border-studio-stone">
                  <img src={imgUrl} alt="Perspective" referrerPolicy="no-referrer" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Bottom Call action bar */}
        <div className="p-6 bg-studio-paper border-t border-studio-stone flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left flex flex-col">
            <span className="text-[9px] font-mono text-zinc-400">LIKE THIS SPECIFIC WORKFLOW?</span>
            <span className="text-xs font-semibold text-neutral-800 font-serif">Apply these custom traits to your consultation briefing</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedProject(null)}
              className="px-4 py-2 bg-studio-beige border border-studio-stone text-studio-dark hover:bg-studio-stone text-xs font-semibold uppercase tracking-widest"
            >
              Close Canvas
            </button>
            <button
              onClick={() => {
                setBriefDraft(prev => ({
                  ...prev,
                  stylePreference: selectedProject.category === 'interior' ? 'Japandi Calm' : 'Modern Tropical Craft',
                  notes: `I am highly inspired by the design narrative of the "${selectedProject.title}" in ${selectedProject.location}. Let's integrate similar materials.`
                }));
                setSelectedProject(null);
                setActiveSection('contact');
              }}
              className="px-5 py-2 bg-studio-dark text-white hover:bg-studio-bronze text-xs font-semibold uppercase tracking-widest"
            >
              Configure My Brief
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
