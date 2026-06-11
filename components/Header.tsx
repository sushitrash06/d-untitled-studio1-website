'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Header({ activeSection, setActiveSection }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-studio-beige/85 backdrop-blur-md border-b border-studio-stone transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection('home');
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 group"
            id="brand-logo-anchor"
          >
            <img src="/img/logo.png" className="w-30 text-studio-bronze" alt="D-Untitled-1 Studio — Architecture & Interior Design" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 font-sans text-xs uppercase tracking-[0.15em] font-medium text-studio-dark" aria-label="Main navigation">
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
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection('services');
              }}
              className={`hover:text-studio-gold transition-colors relative py-1 ${activeSection === 'services' ? 'text-studio-gold' : ''}`}
            >
              Services
              {activeSection === 'services' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-studio-gold"></span>}
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

          {/* Contact and Toggle Panel Bar */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/6281315390886"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-block px-4 py-2 bg-studio-dark text-studio-beige hover:bg-studio-bronze text-xs uppercase tracking-widest font-semibold rounded-none transition-all duration-300 shadow-sm"
              id="header-cta-button"
            >
              Consult Now
            </a>

            {/* Hamburger Icon Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-studio-dark hover:text-studio-gold hover:bg-studio-paper transition-all border border-studio-stone/60"
              aria-label="Toggle Navigation Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Sidebar Backdrop */}
      <div
        className={`fixed inset-0 z-45 bg-studio-dark/55 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Drawer Navigation Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-studio-beige border-l border-studio-stone p-6 shadow-2xl flex flex-col justify-between transition-transform duration-300 transform lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="space-y-6">
          {/* Header of Drawer */}
          <div className="flex items-center justify-between border-b border-studio-stone pb-4">
            <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">Navigation</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 bg-studio-paper hover:bg-studio-stone text-studio-dark transition-all border border-studio-stone/60"
              title="Close Drawer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation Links list */}
          <nav className="flex flex-col gap-4 font-sans text-xs uppercase tracking-[0.15em] font-medium text-studio-dark text-left" aria-label="Mobile navigation">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection('home');
                setIsMobileMenuOpen(false);
              }}
              className={`hover:text-studio-gold transition-colors py-2 flex items-center justify-between border-b border-studio-stone/30 ${activeSection === 'home' ? 'text-studio-gold font-bold' : ''}`}
            >
              Home
              {activeSection === 'home' && <span className="h-1.5 w-1.5 rounded-full bg-studio-gold"></span>}
            </a>
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection('portfolio');
                setIsMobileMenuOpen(false);
              }}
              className={`hover:text-studio-gold transition-colors py-2 flex items-center justify-between border-b border-studio-stone/30 ${activeSection === 'portfolio' ? 'text-studio-gold font-bold' : ''}`}
            >
              Project
              {activeSection === 'portfolio' && <span className="h-1.5 w-1.5 rounded-full bg-studio-gold"></span>}
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection('services');
                setIsMobileMenuOpen(false);
              }}
              className={`hover:text-studio-gold transition-colors py-2 flex items-center justify-between border-b border-studio-stone/30 ${activeSection === 'services' ? 'text-studio-gold font-bold' : ''}`}
            >
              Services
              {activeSection === 'services' && <span className="h-1.5 w-1.5 rounded-full bg-studio-gold"></span>}
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection('about');
                setIsMobileMenuOpen(false);
              }}
              className={`hover:text-studio-gold transition-colors py-2 flex items-center justify-between border-b border-studio-stone/30 ${activeSection === 'about' ? 'text-studio-gold font-bold' : ''}`}
            >
              About Us
              {activeSection === 'about' && <span className="h-1.5 w-1.5 rounded-full bg-studio-gold"></span>}
            </a>
            <a
              href="#ourpeople"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection('ourpeople');
                setIsMobileMenuOpen(false);
              }}
              className={`hover:text-studio-gold transition-colors py-2 flex items-center justify-between border-b border-studio-stone/30 ${activeSection === 'ourpeople' ? 'text-studio-gold font-bold' : ''}`}
            >
              Our People
              {activeSection === 'ourpeople' && <span className="h-1.5 w-1.5 rounded-full bg-studio-gold"></span>}
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection('contact');
                setIsMobileMenuOpen(false);
              }}
              className={`hover:text-studio-gold transition-colors py-2 flex items-center justify-between border-b border-studio-stone/30 ${activeSection === 'contact' ? 'text-studio-gold font-bold' : ''}`}
            >
              Inquiry
              {activeSection === 'contact' && <span className="h-1.5 w-1.5 rounded-full bg-studio-gold"></span>}
            </a>
          </nav>
        </div>

        {/* Bottom Contact Drawer details */}
        <div className="space-y-4 pt-6 border-t border-studio-stone">
          <a
            href="https://wa.me/6281315390886"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-studio-dark text-studio-beige hover:bg-studio-bronze text-center text-xs uppercase tracking-widest font-semibold block transition-all duration-300 shadow-sm"
          >
            Consult Now
          </a>
          <span className="text-[8px] font-mono text-zinc-400 block text-center uppercase tracking-widest">
            d-untitled-1 Studio • © 2026
          </span>
        </div>
      </div>
    </>
  );
}
