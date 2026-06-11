'use client';

import React from 'react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Header({ activeSection, setActiveSection }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-studio-beige/85 backdrop-blur-md border-b border-studio-stone transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
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

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 font-sans text-xs uppercase tracking-[0.15em] font-medium text-studio-dark">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection('home');
            }}
            className={`hover:text-studio-gold transition-colors relative py-1 ${activeSection === 'home' ? 'text-studio-gold' : ''}`}
          >
            Home
            {activeSection === 'home' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-studio-gold"></span>}
          </a>
          <a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection('portfolio');
            }}
            className={`hover:text-studio-gold transition-colors relative py-1 ${activeSection === 'portfolio' ? 'text-studio-gold' : ''}`}
          >
            Project
            {activeSection === 'portfolio' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-studio-gold"></span>}
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection('about');
            }}
            className={`hover:text-studio-gold transition-colors relative py-1 ${activeSection === 'about' ? 'text-studio-gold' : ''}`}
          >
            About Us
            {activeSection === 'about' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-studio-gold"></span>}
          </a>
          <a
            href="#ourpeople"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection('ourpeople');
            }}
            className={`hover:text-studio-gold transition-colors relative py-1 ${activeSection === 'ourpeople' ? 'text-studio-gold' : ''}`}
          >
            Our People
            {activeSection === 'ourpeople' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-studio-gold"></span>}
          </a>
          <a
            href="#quiz"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection('quiz');
            }}
            className={`hover:text-studio-gold transition-colors relative py-1 ${activeSection === 'quiz' ? 'text-studio-gold' : ''}`}
          >
            Style Quiz
            {activeSection === 'quiz' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-studio-gold"></span>}
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection('contact');
            }}
            className={`hover:text-studio-gold transition-colors relative py-1 ${activeSection === 'contact' ? 'text-studio-gold' : ''}`}
          >
            Inquiry
            {activeSection === 'contact' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-studio-gold"></span>}
          </a>
        </nav>

        {/* Contact action button */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection('contact');
            }}
            className="px-4 py-2 bg-studio-dark text-studio-beige hover:bg-studio-bronze text-xs uppercase tracking-widest font-semibold rounded-none transition-all duration-300 shadow-sm"
            id="header-cta-button"
          >
            Consult Now
          </a>
        </div>
      </div>
    </header>
  );
}
