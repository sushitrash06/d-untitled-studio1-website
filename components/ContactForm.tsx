'use client';

import React, { useState } from 'react';
import { Mail, Phone, Check } from 'lucide-react';
import { BriefDraft } from '@/app/types';

interface ContactFormProps {
  briefDraft: BriefDraft;
  setBriefDraft: React.Dispatch<React.SetStateAction<BriefDraft>>;
}

export default function ContactForm({ briefDraft, setBriefDraft }: ContactFormProps) {
  const [isBriefSubmitted, setIsBriefSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBriefSubmitted(true);
  };

  const handleReset = () => {
    setIsBriefSubmitted(false);
    setBriefDraft({
      name: '',
      email: '',
      phone: '',
      projectType: 'residential',
      areaSize: 150,
      budgetRange: 'IDR 1.5 Billion - 3 Billion',
      stylePreference: 'Warm Minimalist',
      preferredContact: 'email',
      notes: '',
      currentStep: 1
    });
  };

  return (
    <section id="contact" className="py-24 bg-studio-beige border-b border-studio-stone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left Column Contact details */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#8D7654] mb-2 block">Connect With Us</span>
              <h3 className="font-serif text-3xl md:text-5xl text-studio-dark tracking-tight leading-[1.1]">
                Commission a <span className="italic font-light">Custom Sanctuary</span>
              </h3>
              <p className="text-xs text-neutral-600 mt-4 leading-relaxed text-justify">
                Every exceptional structure begins with a conversation. We accept a limited number of residential and commercial commissions each year to ensure Yuditia and Rizky Chandra maintain direct, personal oversight over every project line.
              </p>

              {/* Cards Contact Links Details */}
              <div className="mt-8 space-y-4" id="address-block">
                <div className="flex gap-4 items-start p-4 bg-studio-paper border border-studio-stone/80">
                  <div className="p-2.5 bg-studio-beige rounded-none text-studio-bronze shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#8D7654] block">EMAIL COORDINATE</span>
                    <p className="text-sm font-semibold text-neutral-800 mt-1">UntitleDstudioOne@gmail.com</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 bg-studio-paper border border-studio-stone/80">
                  <div className="p-2.5 bg-studio-beige rounded-none text-studio-bronze shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#8D7654] block">COMMUNICATION LINE (WA)</span>
                    <p className="text-sm font-semibold text-neutral-800 mt-1">+62 896-0128-6991</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Minimalist interactive checklist of values */}
            <div className="border-t border-studio-stone/60 pt-6 space-y-3 hidden lg:block text-xs font-sans text-neutral-600 font-semibold uppercase tracking-wider text-left">
              <div className="flex items-center gap-2"><Check className="h-4 w-4 text-studio-gold" /> Personal site surveying by founders</div>
              <div className="flex items-center gap-2"><Check className="h-4 w-4 text-studio-gold" /> Full 3D structural rendering reviews</div>
              <div className="flex items-center gap-2"><Check className="h-4 w-4 text-studio-gold" /> Materials tracking on local craft sites</div>
            </div>
          </div>

          {/* Right Column Custom Brief form */}
          <div className="lg:col-span-7 bg-studio-paper p-8 border border-studio-stone/80 shadow-md">
            <div className="border-b border-studio-stone/50 pb-4 mb-6 flex justify-between items-baseline">
              <span className="font-mono text-[10px] text-[#8D7654] uppercase tracking-wider">Dynamic Client Brief Setup</span>
              <span className="text-[10px] font-mono text-[#8D7654] uppercase tracking-wider">Draft Auto-Saved</span>
            </div>

            {isBriefSubmitted ? (
              <div className="text-center py-12 space-y-6 animate-fade-in text-studio-dark">
                <div className="inline-flex p-3 bg-studio-beige border border-studio-gold rounded-full text-studio-bronze">
                  <Check className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl tracking-wide text-studio-dark">Brief Terkirim!</h3>
                  <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
                    Terima kasih, <strong className="text-studio-dark">{briefDraft.name || 'Pengunjung'}</strong>. Brief portofolio Anda telah dikirim ke Tim Yuditia & Rizky Chandra untuk project <strong className="text-studio-dark">{briefDraft.stylePreference}</strong> Anda. Kami akan menghubungi Anda kembali dalam 1-2 hari kerja.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-2.5 border border-studio-dark text-studio-dark text-xs uppercase tracking-widest font-mono font-bold hover:bg-studio-beige transition-all cursor-pointer"
                  >
                    Buat Brief Baru
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-left">

                {/* Visual live brief card teaser updates live */}
                <div className="bg-studio-dark text-studio-beige p-4 font-mono text-[10.5px] leading-relaxed tracking-wide border border-studio-gold">
                  <span className="text-[8px] uppercase text-studio-gold font-bold block mb-1">LIVE BRIEF PROJECTION</span>
                  &quot;Brief details for a <span className="text-white font-bold">{briefDraft.areaSize} m²</span> project styled with <span className="text-white font-bold">{briefDraft.stylePreference}</span> principles. Preferred service focus: <span className="text-white underline">{briefDraft.projectType}</span>.&quot;
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-600 block uppercase tracking-widest font-bold">Your Name / Company</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Amanda Adiguna"
                      value={briefDraft.name}
                      onChange={(e) => setBriefDraft({ ...briefDraft, name: e.target.value })}
                      className="w-full bg-studio-beige border border-studio-stone p-3 text-xs focus:ring-1 focus:ring-studio-gold outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-600 block uppercase tracking-widest font-bold">CONTACT EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. amanda@domain.com"
                      value={briefDraft.email}
                      onChange={(e) => setBriefDraft({ ...briefDraft, email: e.target.value })}
                      className="w-full bg-studio-beige border border-studio-stone p-3 text-xs focus:ring-1 focus:ring-studio-gold outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-600 block uppercase tracking-widest font-bold">Phone Line / Whatsapp</label>
                    <input
                      type="text"
                      placeholder="e.g. +62 812-3456-7890"
                      value={briefDraft.phone}
                      onChange={(e) => setBriefDraft({ ...briefDraft, phone: e.target.value })}
                      className="w-full bg-studio-beige border border-studio-stone p-3 text-xs focus:ring-1 focus:ring-studio-gold outline-none"
                    />
                  </div>

                  {/* Preferred Contact Mode */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-600 block uppercase tracking-widest font-bold">Preferred Contact Method</label>
                    <select
                      value={briefDraft.preferredContact}
                      onChange={(e) => setBriefDraft({ ...briefDraft, preferredContact: e.target.value as 'phone' | 'email' | 'whatsapp' })}
                      className="w-full bg-studio-beige border border-studio-stone p-3 text-xs focus:ring-1 focus:ring-studio-gold outline-none"
                    >
                      <option value="email">Email correspondence</option>
                      <option value="whatsapp">Whatsapp Direct Chat</option>
                      <option value="phone">Standard Voice Call</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Scope dropdown */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-600 block uppercase tracking-widest font-bold">Space Service Intent</label>
                    <select
                      value={briefDraft.projectType}
                      onChange={(e) => setBriefDraft({ ...briefDraft, projectType: e.target.value })}
                      className="w-full bg-studio-beige border border-studio-stone p-3 text-xs focus:ring-1 focus:ring-studio-gold outline-none"
                    >
                      <option value="residential">Residential Villa / House Design</option>
                      <option value="commercial">Retail Cafe / Shared Office Lounge</option>
                      <option value="interior">Interior Redesign / Custom furniture</option>
                      <option value="concept">Experimental Landmark Concept</option>
                      <option value="Full Design Integration">Full Studio Architecture Bundle</option>
                    </select>
                  </div>

                  {/* Aesthetic style sync */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-600 block uppercase tracking-widest font-bold">Core Style Diagnostic Vibe</label>
                    <select
                      value={briefDraft.stylePreference}
                      onChange={(e) => setBriefDraft({ ...briefDraft, stylePreference: e.target.value })}
                      className="w-full bg-studio-beige border border-studio-stone p-3 text-xs focus:ring-1 focus:ring-studio-gold outline-none"
                    >
                      <option value="Warm Minimalist">Warm Minimalist (Oak & Limestone)</option>
                      <option value="Modern Tropical Craft">Modern Tropical Craft (Teak & Cliff)</option>
                      <option value="Japandi Calm">Japandi Calm (Washi Paper & Cedar)</option>
                      <option value="Rich Brutalism">Rich Brutalism (Board Concrete & Steel)</option>
                      <option value="Contemporary Elegant">Contemporary Elegant (Glass & Marble)</option>
                    </select>
                  </div>
                </div>

                {/* Narrative Description Notes */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-zinc-600 block uppercase tracking-widest font-bold">Detailed design goals / topography notes</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your site details, specific materials you love, climatic concerns, or desired timelines..."
                    value={briefDraft.notes}
                    onChange={(e) => setBriefDraft({ ...briefDraft, notes: e.target.value })}
                    className="w-full bg-studio-beige border border-studio-stone p-3 text-xs focus:ring-1 focus:ring-studio-gold outline-none resize-none"
                  ></textarea>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-4 bg-studio-dark text-studio-beige hover:bg-studio-bronze uppercase text-xs tracking-widest font-bold transition-colors"
                  >
                    Submit Design Brief Workshop
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
