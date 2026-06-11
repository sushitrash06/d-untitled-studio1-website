'use client';

import React, { useState } from 'react';
import {
  Layers,
  Palette,
  Compass,
  Check,
  Hammer,
  Award,
  Sparkles,
  Clock,
  Sliders
} from 'lucide-react';
import { BriefDraft } from '@/app/types';

interface PlannerProps {
  setBriefDraft: React.Dispatch<React.SetStateAction<BriefDraft>>;
  setActiveSection: (section: string) => void;
}

export default function Planner({ setBriefDraft, setActiveSection }: PlannerProps) {
  const [plannerArea, setPlannerArea] = useState<number>(150);
  const [plannerScope, setPlannerScope] = useState<'architecture' | 'interior' | 'full'>('full');
  const [plannerMaterialTier, setPlannerMaterialTier] = useState<'classic' | 'premium' | 'curated'>('premium');

  // Interactive estimations based on architect blueprints
  const getPlanningFees = () => {
    let ratePerSqm = 0;
    if (plannerScope === 'architecture') ratePerSqm = 350000; // IDR per sqm
    else if (plannerScope === 'interior') ratePerSqm = 300000;
    else ratePerSqm = 550000; // full design integration

    if (plannerMaterialTier === 'classic') ratePerSqm *= 0.9;
    if (plannerMaterialTier === 'curated') ratePerSqm *= 1.25;

    const baseFee = plannerArea * ratePerSqm;
    return {
      fee: baseFee,
      range: `IDR ${(baseFee * 0.95).toLocaleString('id-ID', { maximumFractionDigits: 0 })} - ${(baseFee * 1.1).toLocaleString('id-ID', { maximumFractionDigits: 0 })}`,
      timeline: Math.ceil(plannerArea * 0.15 + (plannerScope === 'full' ? 45 : 30)) + ' working days',
      constructionEst: `IDR ${(plannerArea * (plannerMaterialTier === 'classic' ? 6000000 : plannerMaterialTier === 'premium' ? 9000000 : 14000000)).toLocaleString('id-ID', { maximumFractionDigits: 0 })}`
    };
  };

  const plannerOutputs = getPlanningFees();

  return (
    <section id="planner" className="py-24 bg-studio-paper border-b border-studio-stone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left Inputs Panel */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8D7654] flex items-center gap-1.5 mb-2">
                <Sliders className="h-3.5 w-3.5 text-studio-gold" /> Architectural Estimator
              </span>
              <h3 className="font-serif text-3xl md:text-4xl text-studio-dark leading-tight">
                Calculate Your <span className="italic font-light">Design Blueprint</span>
              </h3>
              <p className="text-xs text-neutral-500 mt-2">
                Select your metrics to generate an instant estimate of design fees, material outlines, and realistic project timeline expectations.
              </p>
            </div>

            {/* Area size slider */}
            <div className="bg-studio-beige p-6 border border-studio-stone space-y-4">
              <div className="flex justify-between items-baseline">
                <label className="text-xs uppercase tracking-wider text-studio-dark font-semibold">1. Land / Building Footprint Area</label>
                <span className="font-mono text-lg font-bold text-studio-bronze">{plannerArea} m²</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="10"
                value={plannerArea}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setPlannerArea(val);
                  setBriefDraft(prev => ({ ...prev, areaSize: val }));
                }}
                className="w-full accent-studio-bronze cursor-pointer h-1.5 bg-studio-stone"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                <span>50 m² (Studio Residence)</span>
                <span>1000 m² (Grand Estate)</span>
              </div>
            </div>

            {/* Scope Selection grid */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-wider text-studio-dark font-semibold block">2. Engineering / Design Service Scope</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                <button
                  onClick={() => {
                    setPlannerScope('architecture');
                    setBriefDraft(prev => ({ ...prev, projectType: 'Architecture Only' }));
                  }}
                  className={`p-4 border text-left flex flex-col justify-between h-28 relative ${plannerScope === 'architecture' ? 'bg-studio-dark text-studio-beige border-studio-dark' : 'bg-studio-beige text-studio-dark border-studio-stone hover:bg-studio-paper'}`}
                >
                  <Layers className="h-5 w-5" />
                  <div>
                    <span className="text-xs uppercase tracking-widest font-bold block">Architecture Only</span>
                    <span className="text-[10px] text-neutral-400 block mt-1">Facade, layout, framing blueprint</span>
                  </div>
                  {plannerScope === 'architecture' && <Check className="absolute top-3 right-3 h-4 w-4 text-studio-gold" />}
                </button>

                <button
                  onClick={() => {
                    setPlannerScope('interior');
                    setBriefDraft(prev => ({ ...prev, projectType: 'Interior Only' }));
                  }}
                  className={`p-4 border text-left flex flex-col justify-between h-28 relative ${plannerScope === 'interior' ? 'bg-studio-dark text-studio-beige border-studio-dark' : 'bg-studio-beige text-studio-dark border-studio-stone hover:bg-studio-paper'}`}
                >
                  <Palette className="h-5 w-5" />
                  <div>
                    <span className="text-xs uppercase tracking-widest font-bold block">Interior Consultant</span>
                    <span className="text-[10px] text-neutral-400 block mt-1">Finishes, custom joiner cabinet, tone</span>
                  </div>
                  {plannerScope === 'interior' && <Check className="absolute top-3 right-3 h-4 w-4 text-studio-gold" />}
                </button>

                <button
                  onClick={() => {
                    setPlannerScope('full');
                    setBriefDraft(prev => ({ ...prev, projectType: 'Full Design Service' }));
                  }}
                  className={`p-4 border text-left flex flex-col justify-between h-28 relative ${plannerScope === 'full' ? 'bg-studio-dark text-studio-beige border-studio-dark' : 'bg-studio-beige text-studio-dark border-studio-stone hover:bg-studio-paper'}`}
                >
                  <Compass className="h-5 w-5 text-studio-gold animate-pulse" />
                  <div>
                    <span className="text-xs uppercase tracking-widest font-bold block text-studio-gold">Full Synergy</span>
                    <span className="text-[10px] text-neutral-300 block mt-1">Complete interior + exterior layout</span>
                  </div>
                  {plannerScope === 'full' && <Check className="absolute top-3 right-3 h-4 w-4 text-studio-gold" />}
                </button>

              </div>
            </div>

            {/* Material Preference Finishes */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-wider text-studio-dark font-semibold block">3. Material Selection Tier</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'classic', label: 'Classic Standard', desc: 'Indonesian cement, local wood, quality slate', icon: Hammer },
                  { id: 'premium', label: 'Premium Elegant', desc: 'Teak wood panels, travertine slate, low-e panels', icon: Award },
                  { id: 'curated', label: 'Signature Curator', desc: 'Handcrafted rammed clay, imported stone slabs', icon: Sparkles }
                ].map((tier) => {
                  const Icon = tier.icon;
                  return (
                    <button
                      key={tier.id}
                      onClick={() => setPlannerMaterialTier(tier.id as 'classic' | 'premium' | 'curated')}
                      className={`p-4 border text-left flex flex-col justify-between h-28 relative ${plannerMaterialTier === tier.id ? 'bg-studio-dark text-studio-beige border-studio-dark' : 'bg-studio-beige text-studio-dark border-studio-stone hover:bg-studio-paper'}`}
                    >
                      <Icon className={`h-5 w-5 ${plannerMaterialTier === tier.id ? 'text-studio-gold' : ''}`} />
                      <div>
                        <span className="text-xs uppercase tracking-widest font-bold block">{tier.label}</span>
                        <span className="text-[10px] text-neutral-400 block mt-1 leading-tight">{tier.desc}</span>
                      </div>
                      {plannerMaterialTier === tier.id && <Check className="absolute top-3 right-3 h-4 w-4 text-studio-gold" />}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Results Dashboard */}
          <div className="lg:col-span-5 bg-studio-dark text-studio-beige p-8 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[500px] border border-[#B5945F]/30">
            <div className="space-y-6">
              <div className="border-b border-studio-beige/10 pb-4">
                <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-studio-gold">BLUEPRINT FORECAST REPORT</span>
                <h4 className="font-serif text-2xl tracking-wide text-white mt-1">Design Projection</h4>
              </div>

              {/* Scope Badge Summary */}
              <div className="flex gap-2">
                <span className="bg-white/10 text-white font-mono text-[9px] uppercase px-2 py-0.5 tracking-widest">{plannerScope} scope</span>
                <span className="bg-studio-gold text-studio-dark font-mono text-[9px] uppercase px-2 py-0.5 tracking-widest font-bold">{plannerMaterialTier} quality</span>
              </div>

              {/* Estimate Core Design Fee */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Estimated Studio Consultation Fee</label>
                <p className="text-2xl md:text-3xl font-serif text-studio-gold font-light">{plannerOutputs.range}</p>
                <p className="text-[9px] italic text-zinc-400">Based on IDR rate scaling of untitledD Studio-1 standards</p>
              </div>

              {/* Timeline and Construction Est */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-studio-beige/10">
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">Timeline Duration</span>
                  <span className="text-sm font-sans font-bold flex items-center gap-1.5 mt-1 text-white">
                    <Clock className="h-4 w-4 text-studio-gold" /> {plannerOutputs.timeline}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">Structural Material Cost (Est.)</span>
                  <span className="text-xs font-mono text-studio-gold block mt-1 leading-tight font-bold">{plannerOutputs.constructionEst}</span>
                </div>
              </div>

              {/* Aesthetic visual roadmap chart */}
              <div className="space-y-2 pt-4 border-t border-studio-beige/10">
                <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">Execution Timeline Blueprint</label>
                <div className="space-y-1.5 text-[9px] font-mono tracking-wider">
                  <div>
                    <div className="flex justify-between text-[#8D7654]">
                      <span>Phase 1: Concept Layout Drafting (15%)</span>
                      <span>0-12 Days</span>
                    </div>
                    <div className="w-full bg-white/10 h-1"><div className="bg-studio-gold h-full w-[15%]"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[#8D7654]">
                      <span>Phase 2: Schematic Detail Refinements (35%)</span>
                      <span>13-30 Days</span>
                    </div>
                    <div className="w-full bg-white/10 h-1"><div className="bg-[#8D7654] h-full w-[35%]"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Phase 3: Formal Engineering Clearances (30%)</span>
                      <span>31-50 Days</span>
                    </div>
                    <div className="w-full bg-white/10 h-1"><div className="bg-zinc-400 h-full w-[30%]"></div></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feed brief action shortcut */}
            <div className="mt-8 pt-4 border-t border-studio-beige/10 flex flex-col gap-2">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  setBriefDraft(prev => ({
                    ...prev,
                    areaSize: plannerArea,
                    notes: `Auto-Brief: Created projection representing a ${plannerArea}m² project using our dynamic ${plannerScope} Planner tool.`
                  }));
                  setActiveSection('contact');
                }}
                className="w-full py-3 bg-studio-gold text-studio-dark hover:bg-white uppercase text-center text-[10px] tracking-widest font-bold transition-all"
              >
                Apply Estimate to Brief
              </a>
              <span className="text-[8.5px] text-center text-zinc-500 font-mono">This estimator serves as a strategic projection guiding client workshops</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
