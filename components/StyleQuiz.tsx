'use client';

import React, { useState } from 'react';
import { Compass, ArrowUpRight } from 'lucide-react';
import { Project, BriefDraft, StyleResult } from '@/app/types';
import { STYLE_QUIZ_QUESTIONS, STYLE_RESULTS } from './QuizData';

interface StyleQuizProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  setBriefDraft: React.Dispatch<React.SetStateAction<BriefDraft>>;
  setActiveSection: (section: string) => void;
}

export default function StyleQuiz({
  projects,
  onSelectProject,
  setBriefDraft,
  setActiveSection
}: StyleQuizProps) {
  // Quiz states
  const [quizScore, setQuizScore] = useState<{ [key: string]: number }>({});
  const [quizStep, setQuizStep] = useState<number>(0); // 0 = start, 1-4 = questions, 5 = results
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [calculatedStyle, setCalculatedStyle] = useState<StyleResult | null>(null);

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

  return (
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
                      onClick={() => onSelectProject(p)}
                      className="p-3 border border-studio-stone bg-studio-beige hover:border-studio-gold cursor-pointer flex gap-3 items-center group transition-colors text-left"
                    >
                      <img src={p.mainImage} alt={p.title} referrerPolicy="no-referrer" className="h-12 w-16 object-cover bg-zinc-100" />
                      <div>
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
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection('contact');
                  }}
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
  );
}
