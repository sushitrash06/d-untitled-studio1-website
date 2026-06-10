'use client';

import { useState, useEffect } from 'react';
import {
  Layers,
  Grid,
  MapPin,
  Calendar,
  Maximize2,
  Hammer,
  Palette,
  Clock,
  ArrowUpRight,
  Phone,
  Mail,
  Check,
  ChevronRight,
  X,
  User,
  Sparkles,
  Compass,
  Sliders,
  RotateCw,
  Award
} from 'lucide-react';
import { PORTFOLIO_PROJECTS, STYLE_QUIZ_QUESTIONS, STYLE_RESULTS } from './data';
import { Project, BriefDraft, StyleResult } from './types';

// Custom Crisp Vector SVG Logo of untitledD Studio-1
const LogoSVG = ({ className = "h-10 w-10", strokeColor = "currentColor" }: { className?: string, strokeColor?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    id="studio-logo-vector"
  >
    {/* Left tall building with sloped roof */}
    <path
      d="M 32,85 L 32,32 L 52,15 L 52,85"
      stroke={strokeColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Right shorter flat building */}
    <path
      d="M 52,85 L 52,42 L 72,42 L 72,85"
      stroke={strokeColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Ground base line */}
    <line
      x1="20"
      y1="85"
      x2="80"
      y2="85"
      stroke={strokeColor}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default function App() {
  // Navigation active section tracking
  const [activeSection, setActiveSection] = useState('home');

  // Business Card 3D Flip state
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [copiedText, setCopiedText] = useState<'none' | 'email' | 'phone' | 'web'>('none');

  // Portfolio states
  const [portfolioFilter, setPortfolioFilter] = useState<'all' | 'residential' | 'interior' | 'commercial' | 'concept'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  // Dynamic Projects states
  const [projects, setProjects] = useState<Project[]>(PORTFOLIO_PROJECTS);
  const [isProjectsLoading, setIsProjectsLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  // Load projects list from API proxy on mount
  useEffect(() => {
    async function loadProjects() {
      try {
        setIsProjectsLoading(true);
        const res = await fetch('/api/projects');
        if (!res.ok) {
          throw new Error(`Failed to load projects: ${res.statusText}`);
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          setProjects(data);
        } else if (data && data.error) {
          throw new Error(data.error);
        }
      } catch (err: unknown) {
        console.error('Error fetching dynamic projects, using static fallback:', err);
        // fallback to initial state (PORTFOLIO_PROJECTS)
      } finally {
        setIsProjectsLoading(false);
      }
    }
    loadProjects();
  }, []);

  // Fetch detailed project dynamically
  const handleSelectProject = async (project: Project) => {
    setSelectedProject(project);
    setIsDetailLoading(true);
    try {
      const res = await fetch(`/api/projects/${project.id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch project detail');
      }
      const detailedProject = await res.json();
      setSelectedProject(detailedProject);
    } catch (err) {
      console.error('Error fetching project detail, using fallback list data:', err);
    } finally {
      setIsDetailLoading(false);
    }
  };

  // Style Quiz states
  const [quizScore, setQuizScore] = useState<{ [key: string]: number }>({});
  const [quizStep, setQuizStep] = useState<number>(0); // 0 = start, 1-4 = questions, 5 = results
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [calculatedStyle, setCalculatedStyle] = useState<StyleResult | null>(null);

  // Planner Slider budget state
  const [plannerArea, setPlannerArea] = useState<number>(150);
  const [plannerScope, setPlannerScope] = useState<'architecture' | 'interior' | 'full'>('full');
  const [plannerMaterialTier, setPlannerMaterialTier] = useState<'classic' | 'premium' | 'curated'>('premium');

  // Submit complete state
  const [isBriefSubmitted, setIsBriefSubmitted] = useState(false);

  // Client Brief Draft State (Persisted in localStorage in React Lifecycles)
  const [briefDraft, setBriefDraft] = useState<BriefDraft>(() => {
    const defaultDraft: BriefDraft = {
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
    };
    try {
      const saved = localStorage.getItem('untitled_brief_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return { ...defaultDraft, ...parsed };
        }
      }
    } catch {
      // ignore
    }
    return defaultDraft;
  });

  // Save brief draft to localStorage on change
  useEffect(() => {
    localStorage.setItem('untitled_brief_draft', JSON.stringify(briefDraft));
  }, [briefDraft]);

  // Toast copier
  const handleCopy = (text: string, type: 'email' | 'phone' | 'web') => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText('none'), 3000);
  };

  // Hero slideshow auto rotation (every 8s)
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % 3);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Filter projects
  const filteredProjects = projects.filter(p => {
    if (portfolioFilter === 'all') return true;
    return p.category === portfolioFilter;
  });

  // Run style score diagnostic
  const handleQuizAnswer = (questionIndex: number, optionIndex: number, points: { [style: string]: number }) => {
    const nextAnswers = [...quizAnswers, optionIndex];
    setQuizAnswers(nextAnswers);

    const nextScore = { ...quizScore };
    Object.keys(points).forEach(styleKey => {
      nextScore[styleKey] = (nextScore[styleKey] || 0) + points[styleKey];
    });
    setQuizScore(nextScore);

    if (quizStep < STYLE_QUIZ_QUESTIONS.length) {
      setQuizStep(prev => prev + 1);
    } else {
      // Analyze results on end
      let winnerStyle = 'Warm Minimalist';
      let maxPoints = 0;
      Object.keys(nextScore).forEach(styleKey => {
        if (nextScore[styleKey] > maxPoints) {
          maxPoints = nextScore[styleKey];
          winnerStyle = styleKey;
        }
      });
      setCalculatedStyle(STYLE_RESULTS[winnerStyle]);
      setBriefDraft(prev => ({ ...prev, stylePreference: winnerStyle }));
      setQuizStep(5); // results page
    }
  };

  const resetQuiz = () => {
    setQuizScore({});
    setQuizAnswers([]);
    setQuizStep(0);
    setCalculatedStyle(null);
  };

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
    <div className="min-h-screen bg-studio-beige text-studio-dark font-sans flex flex-col selection:bg-studio-gold selection:text-white antialiased">

      {/* SECTION 1: ELEGANT STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-studio-beige/85 backdrop-blur-md border-b border-studio-stone transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group" id="brand-logo-anchor">
            <LogoSVG className="h-9 w-9 text-studio-bronze group-hover:scale-105 transition-transform" strokeColor="#8D7654" />
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-[0.15em] font-semibold text-studio-dark leading-none">untitledD</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-studio-bronze mt-1">Studio-1</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 font-sans text-xs uppercase tracking-[0.15em] font-medium text-studio-dark">
            <a href="#home" onClick={() => setActiveSection('home')} className={`hover:text-studio-gold transition-colors relative py-1 ${activeSection === 'home' ? 'text-studio-gold' : ''}`}>Home{activeSection === 'home' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-studio-gold"></span>}</a>
            <a href="#portfolio" onClick={() => setActiveSection('portfolio')} className={`hover:text-studio-gold transition-colors relative py-1 ${activeSection === 'portfolio' ? 'text-studio-gold' : ''}`}>Portfolio{activeSection === 'portfolio' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-studio-gold"></span>}</a>
            <a href="#about" onClick={() => setActiveSection('about')} className={`hover:text-studio-gold transition-colors relative py-1 ${activeSection === 'about' ? 'text-studio-gold' : ''}`}>Our Studio{activeSection === 'about' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-studio-gold"></span>}</a>
            <a href="#philosophy" onClick={() => setActiveSection('philosophy')} className={`hover:text-studio-gold transition-colors relative py-1 ${activeSection === 'philosophy' ? 'text-studio-gold' : ''}`}>Philosophy{activeSection === 'philosophy' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-studio-gold"></span>}</a>
            <a href="#planner" onClick={() => setActiveSection('planner')} className={`hover:text-studio-gold transition-colors relative py-1 ${activeSection === 'planner' ? 'text-studio-gold' : ''}`}>Studio Planner{activeSection === 'planner' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-studio-gold"></span>}</a>
            <a href="#quiz" onClick={() => setActiveSection('quiz')} className={`hover:text-studio-gold transition-colors relative py-1 ${activeSection === 'quiz' ? 'text-studio-gold' : ''}`}>Style Quiz{activeSection === 'quiz' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-studio-gold"></span>}</a>
            <a href="#contact" onClick={() => setActiveSection('contact')} className={`hover:text-studio-gold transition-colors relative py-1 ${activeSection === 'contact' ? 'text-studio-gold' : ''}`}>Inquiry{activeSection === 'contact' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-studio-gold"></span>}</a>
          </nav>

          {/* Contact action button */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="px-4 py-2 bg-studio-dark text-studio-beige hover:bg-studio-bronze text-xs uppercase tracking-widest font-semibold rounded-none transition-all duration-300 shadow-sm"
              id="header-cta-button"
            >
              Consult Now
            </a>
          </div>
        </div>
      </header>

      {/* SECTION 2: HERO INTERACTIVE WORK SLIDESHOW */}
      <section id="home" className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden border-b border-studio-stone">
        {/* Animated Slide Backdrops */}
        <div className="absolute inset-0 z-0">
          {projects.slice(0, Math.min(3, projects.length)).map((proj, idx) => (
            <div
              key={proj.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${heroSlideIndex === idx ? 'opacity-100' : 'opacity-0'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-studio-beige via-studio-beige/90 to-transparent z-10" />
              <img
                src={proj.mainImage}
                alt={proj.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center scale-105 animate-subtle-zoom"
              />
            </div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Main Manifesto */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6 max-w-2xl">
            <div className="flex items-center gap-2 px-3 py-1 bg-studio-paper border border-studio-gold/35 rounded-none text-xs uppercase tracking-widest text-[#8D7654] font-medium font-mono">
              <Sparkles className="h-3 w-3 animate-pulse" /> Architecture & Interior Studio
            </div>

            <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-studio-dark leading-[1.1]" id="hero-main-title">
              Crafting <span className="italic font-light">spatial poetry</span> out of raw natural materials.
            </h1>

            <p className="text-base text-neutral-600 leading-relaxed font-sans mt-2">
              We believe architectural layouts must respond directly to regional topography, sustainable ergonomics, and tactile memory. Explore the award-winning design solutions of Yuditia and Rizky Chandra.
            </p>

            {/* Micro Specs of current background project */}
            {projects[heroSlideIndex] && (
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-studio-bronze font-mono bg-studio-paper/40 backdrop-blur-md p-3 border border-studio-stone w-full max-w-md">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-studio-gold" /> {projects[heroSlideIndex].location}
                </div>
                <div className="flex items-center gap-1">
                  <Layers className="h-3.5 w-3.5 text-studio-gold" /> {projects[heroSlideIndex].area}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-studio-gold" /> Concept {projects[heroSlideIndex].year}
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="#portfolio"
                className="px-6 py-4 bg-studio-dark text-studio-beige hover:bg-studio-bronze flex items-center gap-3 uppercase text-xs tracking-[0.2em] font-bold transition-all duration-300"
              >
                View Portfolio <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="#planner"
                className="px-6 py-4 border border-studio-dark text-studio-dark hover:bg-studio-paper flex items-center gap-2 uppercase text-xs tracking-[0.2em] font-bold transition-all duration-300"
              >
                Space Fee Estimator <Sliders className="h-4 w-4" />
              </a>
            </div>

            {/* Slider Dots indicators */}
            <div className="mt-12 flex items-center gap-3">
              {projects.slice(0, Math.min(3, projects.length)).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setHeroSlideIndex(idx)}
                  className={`h-2 transition-all duration-300 ${heroSlideIndex === idx ? 'w-10 bg-studio-gold' : 'w-2 bg-studio-stone hover:bg-studio-gold'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* SECTION 2A: TACTILE BUSINESS CARD HOLOGRAPHIC ROTATOR (Right Column) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#8D7654] font-mono mb-3 flex items-center gap-1">
              <RotateCw className="h-3 w-3 animate-spin" style={{ animationDuration: '6s' }} /> Click Card to Spin
            </span>

            {/* 3D Card container */}
            <div
              className="relative w-full max-w-[400px] aspect-[1.75/1] cursor-pointer"
              style={{ perspective: '1200px' }}
              onClick={() => setIsCardFlipped(!isCardFlipped)}
              id="business-card-rotator"
            >
              <div
                className="w-full h-full relative duration-700 ease-out transform-style-3d"
                style={{ transform: isCardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
              >

                {/* CARD FRONT SIDE (Elegant Logo Branding) */}
                <div className="absolute inset-0 w-full h-full backface-hidden bg-[#FAF8F5] p-6 rounded-lg shadow-xl border border-studio-stone/60 flex flex-col justify-between">
                  {/* Card top bar */}
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-neutral-400">UNTITLEDD STUDIO-1 © 2026</span>
                    <div className="h-1.5 w-1.5 rounded-full bg-studio-gold"></div>
                  </div>

                  {/* Card giant central minimalist logo */}
                  <div className="flex flex-col items-center justify-center py-2">
                    <LogoSVG className="h-16 w-16 text-studio-bronze" strokeColor="#8D7654" />
                    <div className="text-center mt-2">
                      <h2 className="font-serif text-xl tracking-[0.2em] font-semibold text-studio-dark uppercase leading-none">untitledD</h2>
                      <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-[#8D7654]">Studio-1</span>
                    </div>
                  </div>

                  {/* Aesthetic card bottom accents */}
                  <div className="flex justify-between items-end border-t border-studio-stone/40 pt-2">
                    <span className="text-[8px] font-mono text-[#8D7654] uppercase tracking-wider">Jakarta • Bali • Bandung</span>
                    <span className="text-[7px] font-mono text-neutral-400">Architects & Designers</span>
                  </div>
                </div>

                {/* CARD BACK SIDE (Contact Yuditia Detail) */}
                <div
                  className="absolute inset-0 w-full h-full backface-hidden bg-[#FAF8F5] p-6 rounded-lg shadow-xl border border-studio-stone/60 flex flex-col justify-between"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <div className="flex justify-between items-start w-full">
                    {/* Founder identity */}
                    <div>
                      <h3 className="font-serif text-base tracking-[0.05em] font-semibold text-studio-dark leading-none">YUDITIA</h3>
                      <p className="font-serif italic text-xs text-studio-bronze mt-1">Architect</p>
                    </div>

                    {/* QR Code Mockup (Interactive direct link) */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy('https://www.UntitledDstudioOne.co.id', 'web');
                      }}
                      className="border border-studio-stone bg-white p-1 rounded hover:scale-105 transition-transform"
                      title="Copy Website Link"
                    >
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.UntitledDstudioOne.co.id&color=1E1C1A&bgcolor=FAF8F5"
                        alt="QR Code Website"
                        className="h-11 w-11"
                      />
                    </div>
                  </div>

                  {/* Contacts Column */}
                  <div className="flex flex-col gap-1.5 my-1 text-left">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy('www.UntitledDstudioOne.co.id', 'web');
                      }}
                      className="text-[9.5px] font-mono text-left text-neutral-600 hover:text-studio-gold flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8D7654]"></span> www.UntitledDstudioOne.co.id
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy('+62 89601286991', 'phone');
                      }}
                      className="text-[9.5px] font-mono text-left text-neutral-600 hover:text-studio-gold flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8D7654]"></span> +62 896-0128-6991
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy('UntitleDstudioOne@gmail.com', 'email');
                      }}
                      className="text-[9.5px] font-mono text-left text-neutral-600 hover:text-studio-gold flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8D7654]"></span> UntitleDstudioOne@gmail.com
                    </button>
                  </div>

                  <div className="border-t border-studio-stone/45 pt-1.5 flex justify-between items-center">
                    <span className="text-[7.5px] font-mono text-[#8D7654] uppercase tracking-widest leading-none">Partner: Rizky Chandra</span>
                    <span className="text-[7px] text-zinc-400 font-mono italic">Click item to copy</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Direct Copy Notifications Helper Toast */}
            {copiedText !== 'none' && (
              <div className="mt-3 px-3 py-1 bg-studio-dark text-studio-beige text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5 shadow-md">
                <Check className="h-3.5 w-3.5 text-studio-gold" /> Copied {copiedText === 'web' ? 'Website URL' : copiedText === 'phone' ? 'Phone Line' : 'Email address'}!
              </div>
            )}
          </div>

        </div>
      </section>

      {/* SECTION 3: FILTERABLE BENTO-GRID ARCHITECTURAL PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-studio-beige border-b border-studio-stone">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Portfolio Header Title */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="mono-spec text-[10px] uppercase tracking-[0.25em] text-[#8D7654] font-medium flex items-center gap-1.5 mb-1">
                <Grid className="h-3 w-3 text-studio-gold" /> Curated Gallery
              </span>
              <h2 className="font-serif text-3xl md:text-5xl tracking-tight text-studio-dark">
                Selected <span className="italic font-light">Architectural Works</span>
              </h2>
            </div>

            {/* Aesthetic Fine Art filter panels */}
            <div className="flex flex-wrap items-center gap-1 bg-studio-paper p-1 border border-studio-stone">
              {(['all', 'residential', 'interior', 'commercial', 'concept'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setPortfolioFilter(filter)}
                  className={`px-4 py-2 hover:text-studio-dark text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-300 ${portfolioFilter === filter ? 'bg-studio-dark text-studio-beige border border-studio-dark' : 'text-neutral-500 hover:bg-studio-stone/20'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Asymmetric Image Layout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="portfolio-bento-grid">
            {isProjectsLoading ? (
              // Premium Skeleton Loader Elements
              Array.from({ length: 6 }).map((_, idx) => {
                const isLarge = idx === 0 || idx === 4;
                return (
                  <div
                    key={`skeleton-${idx}`}
                    className={`bg-studio-paper border border-studio-stone/60 overflow-hidden flex flex-col justify-between animate-pulse ${isLarge ? 'md:col-span-2' : ''}`}
                  >
                    {/* Photo Skeleton */}
                    <div className="relative aspect-[16/10] bg-studio-stone/30 w-full"></div>
                    {/* Content Skeleton */}
                    <div className="p-6 bg-studio-beige border-t border-studio-stone/40 flex flex-col justify-between grow">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <div className="h-3 bg-studio-stone/30 rounded w-1/4"></div>
                          <div className="h-3 bg-studio-stone/30 rounded w-12"></div>
                        </div>
                        <div className="h-6 bg-studio-stone/30 rounded w-3/4 mt-2"></div>
                        <div className="h-4 bg-studio-stone/30 rounded w-full mt-2"></div>
                      </div>
                      <div className="mt-6 pt-4 border-t border-studio-stone/40 flex items-center justify-between">
                        <div className="flex gap-2">
                          <div className="h-4 bg-studio-stone/30 rounded w-10"></div>
                          <div className="h-4 bg-studio-stone/30 rounded w-10"></div>
                        </div>
                        <div className="h-4 bg-studio-stone/30 rounded w-20"></div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : filteredProjects.length === 0 ? (
              <div className="col-span-full py-20 text-center">
                <p className="text-sm text-neutral-500 font-mono">No projects found in this category.</p>
              </div>
            ) : (
              filteredProjects.map((project, index) => {
                // Create dynamic bento shapes by spanning key items
                const isLarge = index === 0 || index === 4;
                return (
                  <div
                    key={project.id}
                    onClick={() => handleSelectProject(project)}
                    className={`group relative bg-studio-paper border border-studio-stone cursor-pointer overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${isLarge ? 'md:col-span-2' : ''}`}
                  >
                    {/* Photo Container */}
                    <div className="relative aspect-[16/10] overflow-hidden w-full">
                      {/* Aesthetic overlay tag */}
                      <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-studio-dark/80 backdrop-blur-md text-white font-mono text-[9px] uppercase tracking-widest">
                        {project.category}
                      </div>
                      {/* Image */}
                      <img
                        src={project.mainImage}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-studio-dark via-transparent to-transparent opacity-80 z-0" />
                    </div>

                    {/* Card Info Details */}
                    <div className="p-6 bg-studio-beige border-t border-studio-stone flex flex-col justify-between grow">
                      <div>
                        <div className="flex justify-between items-center text-xs font-mono text-studio-bronze mb-2">
                          <span>{project.location}</span>
                          <span>{project.year}</span>
                        </div>
                        <h3 className="font-serif text-xl md:text-2xl text-studio-dark group-hover:text-studio-gold transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-xs text-neutral-500 line-clamp-2 mt-2 leading-relaxed">
                          {project.subtitle}
                        </p>
                      </div>

                      {/* Bottom visual tags and action */}
                      <div className="mt-4 pt-4 border-t border-studio-stone/60 flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {project.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[9px] font-mono text-neutral-400 bg-studio-paper px-1.5 py-0.5">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#8D7654] flex items-center gap-1 group-hover:translate-x-1.5 transition-transform duration-300">
                          View Canvas <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>
      </section>

      {/* SECTION 4: FULL PHILOSOPHY & ABOUT US SECTION FROM USER'S DESIGN */}
      <section id="about" className="py-24 bg-[#FAF8F5] border-b border-studio-stone relative overflow-hidden">
        {/* Abstract background logo watermark */}
        <div className="absolute -right-20 top-20 opacity-[0.03] select-none pointer-events-none transform rotate-12">
          <LogoSVG className="h-96 w-96 text-studio-dark" strokeColor="#1E1C1A" />
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
                <LogoSVG className="h-20 w-20 text-studio-bronze shrink-0" strokeColor="#8D7654" />
                <div className="flex flex-col text-left">
                  <span className="font-serif text-2xl font-bold tracking-[0.1em] text-studio-dark leading-none">untitledD</span>
                  <span className="font-mono text-xs uppercase tracking-[0.4em] text-studio-bronze mt-2">Studio-1</span>
                </div>
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

          {/* Section 4B: Loyal Reconstruction of "Our People" Section from Image 2 */}
          <div className="mt-28">
            <div className="inline-block relative mb-12">
              <div className="bg-[#DBCFB3]/50 text-studio-dark font-serif text-xl md:text-2xl px-6 py-2 pb-3 tracking-widest uppercase relative z-10 font-light pr-12 shadow-sm border-l-4 border-studio-bronze">
                Our People
              </div>
              <div className="absolute -bottom-1 -right-1 w-full h-full bg-[#E5D7BE]/30 -z-0"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">

              {/* Leader 1 - Yuditia */}
              <div className="flex flex-col lg:flex-row items-start gap-6 bg-studio-paper p-6 border border-studio-stone/60 group">
                {/* Portrait container with loyal monochrome photo styling */}
                <div className="w-full lg:w-48 aspect-square relative overflow-hidden bg-zinc-200 shrink-0 border border-studio-stone flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400"
                    alt="Yuditia portrait"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale object-top transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-transparent group-hover:bg-[#C5A880]/10 transition-colors duration-300" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-serif text-2xl font-semibold text-studio-dark uppercase">Yuditia</h4>
                    <span className="text-[10px] uppercase tracking-widest text-[#8D7654] font-mono">Senior Architect</span>
                  </div>
                  <div className="h-[1px] w-full bg-studio-stone"></div>
                  <p className="text-xs text-neutral-600 leading-relaxed text-justify">
                    Yuditia brings over a decade of experience spanning residential, commercial, and institutional projects. Passionate from strong conceptualization to precise planning and project oversight. Committed to creating spaces that are not only aesthetically refined but functionally responsive, incorporating local microclimates and absolute structural safety.
                  </p>
                </div>
              </div>

              {/* Leader 2 - Rizky Chandra */}
              <div className="flex flex-col lg:flex-row items-start gap-6 bg-studio-paper p-6 border border-studio-stone/60 group">
                {/* Portrait container with loyal monochrome photo styling */}
                <div className="w-full lg:w-48 aspect-square relative overflow-hidden bg-zinc-200 shrink-0 border border-studio-stone flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400"
                    alt="Rizky Chandra portrait"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale object-top transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-transparent group-hover:bg-[#C5A880]/10 transition-colors duration-300" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-serif text-2xl font-semibold text-studio-dark uppercase">Rizky Chandra</h4>
                    <span className="text-[10px] uppercase tracking-widest text-[#8D7654] font-mono">Interior Director</span>
                  </div>
                  <div className="h-[1px] w-full bg-studio-stone"></div>
                  <p className="text-xs text-neutral-600 leading-relaxed text-justify">
                    Rizky Chandra has contributed to the industry through his specialized work in architecture and interior consulting, specializing in project design coordination and interior team leadership. His career reflects an agile ability to move seamlessly between heavy creative design exploration and practical management, creating magnificent functional atmospheres.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: INTERACTIVE ESTIMATION & FEE CALCULATOR */}
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
                    className={`p-4 border text-left flex flex-col justify-between h-28 relative ${plannerScope === 'full' ? 'bg-studio-dark text-studio-beige border-studio-dark' : 'bg-studio-beige text-studio-dark border-studio-dark'}`}
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
                  onClick={() => {
                    setBriefDraft(prev => ({
                      ...prev,
                      areaSize: plannerArea,
                      notes: `Auto-Brief: Created projection representing a ${plannerArea}m² project using our dynamic ${plannerScope} Planner tool.`
                    }));
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

      {/* SECTION 6: THE DIAGNOSTIC ARCHITECTURAL STYLE MATCH QUIZ */}
      <section id="quiz" className="py-24 bg-[#FAF8F5] border-b border-studio-stone">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <div className="text-center space-y-3 mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-studio-bronze flex items-center justify-center gap-1">
              <Compass className="h-3.5 w-3.5" /> Design Diagnostic
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-studio-dark">
              Discover Your <span className="italic font-light">Architectural Style</span>
            </h2>
            <p className="text-xs text-neutral-500 max-w-lg mx-auto leading-relaxed">
              Uncover the layout aesthetics, textures, and palettes that reflect your subconscious priorities. Let Yuditia and Rizky Chandra build your signature space.
            </p>
          </div>

          <div className="bg-studio-paper p-8 border border-studio-stone/80 relative overflow-hidden shadow-sm" id="style-quiz-panel">

            {/* PROGRESS LINE */}
            {quizStep > 0 && quizStep < 5 && (
              <div className="w-full bg-studio-stone h-1 mb-8 rounded-full overflow-hidden">
                <div
                  className="bg-studio-gold h-full transition-all duration-300"
                  style={{ width: `${(quizStep / STYLE_QUIZ_QUESTIONS.length) * 100}%` }}
                ></div>
              </div>
            )}

            {/* STEP 0: ENTRY BOARD */}
            {quizStep === 0 && (
              <div className="text-center py-12 space-y-6">
                <div className="inline-flex p-3 bg-studio-beige border border-studio-stone rounded-full">
                  <Compass className="h-8 w-8 text-studio-gold" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl tracking-wide text-studio-dark">What environment truly calms you?</h3>
                  <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
                    Rather than copying popular presets, find your layout matrix. Answer these 4 sensory questions from our senior designers.
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => setQuizStep(1)}
                    className="px-6 py-3 bg-studio-dark text-studio-beige text-xs uppercase tracking-widest font-bold hover:bg-[#8D7654] transition-all"
                  >
                    Start Architectural Quiz
                  </button>
                </div>
              </div>
            )}

            {/* QUESTIONS STATE CARD (1 - 4) */}
            {quizStep >= 1 && quizStep <= STYLE_QUIZ_QUESTIONS.length && (
              <div className="space-y-6">
                <div className="flex justify-between text-xs font-mono text-studio-bronze uppercase">
                  <span>Question {quizStep} of {STYLE_QUIZ_QUESTIONS.length}</span>
                  <span>untitledD Studio-1 Standards</span>
                </div>

                <h3 className="font-serif text-xl md:text-2xl text-studio-dark border-l-2 border-studio-gold pl-4 leading-relaxed">
                  {STYLE_QUIZ_QUESTIONS[quizStep - 1].text}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {STYLE_QUIZ_QUESTIONS[quizStep - 1].options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleQuizAnswer(quizStep, oIdx, opt.points)}
                      className="p-5 border border-studio-stone bg-studio-beige text-left hover:bg-studio-paper hover:border-[#8D7654] transition-all flex flex-col gap-2 relative group cursor-pointer"
                    >
                      <span className="text-xs font-sans text-neutral-700 leading-relaxed font-semibold">
                        {opt.text}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400 group-hover:text-studio-gold mt-1">
                        {opt.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: RESULTS CANVAS */}
            {quizStep === 5 && calculatedStyle && (
              <div className="space-y-8 animate-fade-in py-4">
                <div className="border-b border-studio-stone pb-4 flex flex-col md:flex-row items-baseline justify-between gap-4">
                  <div>
                    <span className="text-[9px] font-mono text-studio-gold uppercase tracking-[0.2em]">Diagnostic Result</span>
                    <h3 className="font-serif text-3xl md:text-4xl text-studio-dark mt-1 font-semibold">{calculatedStyle.name}</h3>
                  </div>
                  <span className="text-xs font-mono text-neutral-400">Match score compatibility: {calculatedStyle.percentage}%</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Styling Narrative */}
                  <div className="md:col-span-2 space-y-4">
                    <p className="font-serif italic text-[#8D7654] text-base leading-relaxed">
                      &quot;{calculatedStyle.tagline}&quot;
                    </p>
                    <p className="text-xs text-neutral-600 leading-relaxed text-justify">
                      {calculatedStyle.description}
                    </p>

                    {/* Highly aesthetic color scheme swatches */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] font-mono text-[#8D7654] uppercase tracking-widest block">Signature Swatch Matrix</span>
                      <div className="flex items-center gap-2">
                        {calculatedStyle.colorTheme.map((hex, hIdx) => (
                          <div key={hIdx} className="flex flex-col items-center gap-1.5">
                            <div className="h-10 w-10 border border-studio-stone shadow-sm" style={{ backgroundColor: hex }}></div>
                            <span className="text-[8px] font-mono text-zinc-500">{hex}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Materials list */}
                  <div className="bg-studio-beige p-6 border border-studio-stone space-y-4">
                    <span className="text-[10px] font-mono text-studio-bronze uppercase tracking-widest block font-bold border-b border-studio-stone pb-2">Material Board Recommendation</span>
                    <div className="flex flex-col gap-2">
                      {calculatedStyle.recommendedMaterials.map((mat, mIdx) => (
                        <div key={mIdx} className="flex items-center gap-2 text-xs font-sans text-neutral-700 font-semibold">
                          <span className="h-1.5 w-1.5 rounded-full bg-studio-gold"></span>
                          {mat}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Showcase matching studio portfolios directly! */}
                <div className="border-t border-studio-stone pt-6 space-y-3">
                  <span className="text-[10px] font-mono text-[#8D7654] uppercase tracking-widest block">Our Projects reflecting your preference</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {projects.filter(p => {
                      if (calculatedStyle.name === 'Warm Minimalist' || calculatedStyle.name === 'Japandi Calm') {
                        return p.category === 'interior';
                      }
                      if (calculatedStyle.name === 'Modern Tropical Craft') {
                        return p.category === 'residential';
                      }
                      if (calculatedStyle.name === 'Rich Brutalism') {
                        return p.category === 'concept' || p.category === 'commercial';
                      }
                      if (calculatedStyle.name === 'Contemporary Elegant') {
                        return p.category === 'commercial' || p.category === 'residential';
                      }
                      return true;
                    }).slice(0, 2).map(p => (
                      <div
                        key={p.id}
                        onClick={() => handleSelectProject(p)}
                        className="p-3 border border-studio-stone bg-studio-beige hover:border-studio-gold cursor-pointer flex gap-3 items-center group transition-colors"
                      >
                        <img src={p.mainImage} alt={p.title} referrerPolicy="no-referrer" className="h-12 w-16 object-cover bg-zinc-100" />
                        <div className="text-left">
                          <h4 className="font-serif text-sm font-semibold text-studio-dark group-hover:text-studio-gold transition-colors">{p.title}</h4>
                          <span className="text-[9px] font-mono text-neutral-400 capitalize">{p.location}</span>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-studio-bronze ml-auto group-hover:translate-x-0.5" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between gap-4 flex-wrap border-t border-studio-stone/60">
                  <button
                    onClick={resetQuiz}
                    className="px-4 py-2 border border-studio-stone text-studio-dark hover:bg-studio-beige text-xs font-mono uppercase tracking-widest"
                  >
                    Retake Consultation
                  </button>
                  <a
                    href="#contact"
                    className="px-6 py-2.5 bg-studio-dark text-white hover:bg-[#8D7654] text-xs font-mono uppercase tracking-widest font-bold"
                  >
                    Configure My Style Brief
                  </a>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* SECTION 7: DETAILED CLINICAL WORKSHOP CLIENT BRIEFING FORM */}
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
              <div className="border-t border-studio-stone/60 pt-6 space-y-3 hidden lg:block text-xs font-sans text-neutral-600 font-semibold uppercase tracking-wider">
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
                      onClick={() => {
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
                      }}
                      className="px-6 py-2.5 border border-studio-dark text-studio-dark text-xs uppercase tracking-widest font-mono font-bold hover:bg-studio-beige transition-all cursor-pointer"
                    >
                      Buat Brief Baru
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  setIsBriefSubmitted(true);
                }} className="space-y-6 text-left">

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

      {/* SECTION 8: FULLSCREEN DETAILED PORTFOLIO MODAL DRAWER */}
      {selectedProject && (
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
                <a
                  href="#contact"
                  onClick={() => {
                    setBriefDraft(prev => ({
                      ...prev,
                      stylePreference: selectedProject.category === 'interior' ? 'Japandi Calm' : 'Modern Tropical Craft',
                      notes: `I am highly inspired by the design narrative of the "${selectedProject.title}" in ${selectedProject.location}. Let's integrate similar materials.`
                    }));
                    setSelectedProject(null);
                  }}
                  className="px-5 py-2 bg-studio-dark text-white hover:bg-studio-bronze text-xs font-semibold uppercase tracking-widest"
                >
                  Configure My Brief
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SECTION 9: STUDIO FOOTER WITH BRAND LOGO Watermarks */}
      <footer className="bg-[#FAF8F5] text-studio-dark border-t border-studio-stone pt-20 pb-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-studio-stone">

          {/* Main big Brand coordinates column */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <LogoSVG className="h-11 w-11 text-studio-bronze" strokeColor="#8D7654" />
              <div className="flex flex-col text-left">
                <span className="font-serif text-xl tracking-[0.1em] font-semibold text-studio-dark leading-none">untitledD</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-studio-bronze mt-1">Studio-1</span>
              </div>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed max-w-sm">
              We stand against the clinical and identical. Crafting architecture out of sustainable, ergonomic natural materials to belong organically with local histories.
            </p>

            <span className="text-[9px] text-neutral-400 font-mono block">
              untitledD-1 Studio • © 2026 Yuditia & Rizky. All rights reserved.
            </span>
          </div>

          {/* Quick links columns */}
          <div className="md:col-span-3 space-y-4 text-left">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#8D7654] font-bold">Studio Exploration</span>
            <div className="flex flex-col gap-2.5 text-xs text-neutral-600 font-medium">
              <a href="#home" className="hover:text-studio-gold">Manifesto Entry</a>
              <a href="#portfolio" className="hover:text-studio-gold">Selected Layouts</a>
              <a href="#about" className="hover:text-studio-gold">Founders Practice</a>
              <a href="#planner" className="hover:text-studio-gold">Space Area Blueprints</a>
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

    </div>
  );
}
