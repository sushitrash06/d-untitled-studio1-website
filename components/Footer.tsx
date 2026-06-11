'use client';

import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ProfileData {
  fullName: string;
  headline: string;
  bio: string;
  contactEmail: string;
  phoneNumber: string;
  location: string;
  services: string[];
  skills: string[];
}

interface FooterProps {
  setActiveSection: (section: string) => void;
}


export default function Footer({ setActiveSection }: FooterProps) {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/api/profile');
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch {
        // Silently fail — fallback values will be used
      }
    }
    fetchProfile();
  }, []);

  const email = profile?.contactEmail || 'd.untitledstudio1@gmail.com';
  const phone = profile?.phoneNumber || '+62 813-1539-0886';
  const location = profile?.location || 'Jakarta Indonesia';
  const services = profile?.services || ['Architecture', 'Interior Design', '3D Render'];
  const bio = profile?.bio || 'creating design solutions for the major challenges we face today—how to build sustainably, how to create environments that are both diverse and delightful, and how to incorporate ergonomic principles.';

  // Format phone for WhatsApp link (strip spaces and dashes)
  const waPhone = phone.replace(/[\s\-\+]/g, '');

  return (
    <footer className="bg-[#FAF8F5] text-studio-dark border-t border-studio-stone pt-20 pb-12 mt-auto" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-studio-stone">

        {/* Main Brand column */}
        <div className="md:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection('home');
              }}
              className="flex items-center gap-3 group"
              id="footer-brand-logo"
            >
              <img src="/img/logo.png" className="w-30 text-studio-bronze" alt="D-Untitled-1 Studio — Architecture & Interior Design" />
            </a>
          </div>

          <p className="text-xs text-neutral-600 leading-relaxed max-w-sm">
            {bio}
          </p>

          {/* Services tags */}
          <div className="flex flex-wrap gap-2">
            {services.map((service) => (
              <span
                key={service}
                className="text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 bg-studio-paper border border-studio-stone/60 text-studio-bronze"
              >
                {service}
              </span>
            ))}
          </div>

          <span className="text-[9px] text-neutral-400 font-mono block">
            D-Untitled-1 Studio • © {new Date().getFullYear()} All rights reserved.
          </span>
        </div>

        {/* Contact Info column */}
        <div className="md:col-span-3 space-y-4 text-left">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#8D7654] font-bold">Get In Touch</span>
          <div className="space-y-3">
            {/* Email */}
            <a
              href={`mailto:${email}`}
              className="flex items-start gap-3 group hover:text-studio-gold transition-colors"
            >
              <Mail className="h-3.5 w-3.5 text-studio-bronze mt-0.5 shrink-0" />
              <div>
                <span className="text-[8px] font-mono uppercase tracking-wider text-neutral-400 block">Email</span>
                <span className="text-xs text-neutral-600 group-hover:text-studio-gold transition-colors">{email}</span>
              </div>
            </a>

            {/* Phone / WhatsApp */}
            <a
              href={`https://wa.me/${waPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 group hover:text-studio-gold transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-studio-bronze mt-0.5 shrink-0" />
              <div>
                <span className="text-[8px] font-mono uppercase tracking-wider text-neutral-400 block">WhatsApp</span>
                <span className="text-xs text-neutral-600 group-hover:text-studio-gold transition-colors">{phone}</span>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-start gap-3">
              <MapPin className="h-3.5 w-3.5 text-studio-bronze mt-0.5 shrink-0" />
              <div>
                <span className="text-[8px] font-mono uppercase tracking-wider text-neutral-400 block">Location</span>
                <span className="text-xs text-neutral-600">{location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Design Foundations column */}
        <div className="md:col-span-4 space-y-4 text-left">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#8D7654] font-bold">Design Foundations</span>
          <div className="bg-studio-paper p-4 border border-studio-stone/60 space-y-2">
            <p className="text-[11px] font-serif text-[#8D7654] italic">
              &quot;We believe that great design is not the result of a single idea, but a synergy of ideas from many sources.&quot;
            </p>
            <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest block text-right">— D-Untitled-1 Philosophy</span>
          </div>
        </div>

      </div>

      {/* Minimal Bottom Legals bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-zinc-400 uppercase tracking-[0.15em]">
        <span>Design crafted to match physical business profiles with precision</span>
      </div>
    </footer>
  );
}
