'use client';

import React, { useState } from 'react';
import { Grid, ArrowUpRight } from 'lucide-react';
import { Project } from '@/app/types';

interface PortfolioProps {
  projects: Project[];
  isProjectsLoading: boolean;
  onSelectProject: (project: Project) => void;
}

export default function Portfolio({ projects, isProjectsLoading, onSelectProject }: PortfolioProps) {
  const [portfolioFilter, setPortfolioFilter] = useState<'all' | 'architecture' | 'interior'>('all');

  const filteredProjects = projects.filter(p => {
    if (portfolioFilter === 'all') return true;
    if (portfolioFilter === 'interior') return p.category === 'interior';
    return p.category !== 'interior';
  });

  const getBentoClasses = (index: number) => {
    switch (index) {
      case 0: // oasis-house
        return 'md:col-span-1 md:row-span-1 h-[320px] md:h-auto';
      case 1: // japandi-living
        return 'md:col-span-1 md:row-span-1 h-[320px] md:h-auto';
      case 2: // inbetween-office (Tiger layout position)
        return 'md:col-span-2 md:row-span-2 h-[450px] md:h-auto';
      case 3: // monolith-pavilion (Sunset layout position)
        return 'md:col-span-2 md:row-span-2 h-[450px] md:h-auto';
      case 4: // clay-kitchen
        return 'md:col-span-1 md:row-span-1 h-[320px] md:h-auto';
      case 5: // canopy-residence
        return 'md:col-span-1 md:row-span-1 h-[320px] md:h-auto';
      default:
        return 'md:col-span-1 md:row-span-1 h-[320px] md:h-auto';
    }
  };

  const gridClass = portfolioFilter === 'all'
    ? 'grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 md:auto-rows-[240px] gap-8'
    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';

  return (
    <section id="portfolio" className="py-10 bg-studio-beige border-b border-studio-stone" aria-label="Our Architecture and Interior Design Projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Portfolio Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="mono-spec text-[10px] uppercase tracking-[0.25em] text-[#8D7654] font-medium flex items-center gap-1.5 mb-1">
              <Grid className="h-3 w-3 text-studio-gold" /> Curated Gallery
            </span>
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight text-studio-dark">
              <span className="italic font-light">Our Projects</span>
            </h2>
          </div>

          {/* Aesthetic filter panels */}
          <div className="flex flex-wrap items-center gap-1 bg-studio-paper p-1 border border-studio-stone">
            {(['all', 'architecture', 'interior'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setPortfolioFilter(filter)}
                className={`px-4 py-2 hover:text-studio-dark text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-300 ${portfolioFilter === filter ? 'bg-studio-dark text-studio-beige border border-studio-dark' : 'text-neutral-500 hover:bg-studio-stone/20'}`}
              >
                {filter === 'all' ? 'All' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Image Layout Grid */}
        <div className={gridClass} id="portfolio-bento-grid">
          {isProjectsLoading ? (
            // Premium Skeleton Loader Elements
            Array.from({ length: 6 }).map((_, idx) => {
              return (
                <div
                  key={`skeleton-${idx}`}
                  className={`bg-studio-paper border border-studio-stone/60 overflow-hidden flex flex-col justify-between animate-pulse ${portfolioFilter === 'all' ? getBentoClasses(idx) : 'h-[380px]'}`}
                >
                  {/* Photo Skeleton */}
                  <div className="relative overflow-hidden flex-grow min-h-[140px] bg-studio-stone/30 w-full"></div>
                  {/* Content Skeleton */}
                  <div className="p-6 bg-studio-beige border-t border-studio-stone/40 flex flex-col justify-between shrink-0">
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
              const cardClass = portfolioFilter === 'all' ? getBentoClasses(index) : 'h-[380px]';
              return (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className={`group relative bg-studio-paper border border-studio-stone cursor-pointer overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${cardClass}`}
                >
                  {/* Photo Container */}
                  <div className="relative overflow-hidden flex-grow min-h-[140px] w-full">
                    {/* Aesthetic overlay tag */}
                    <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-studio-dark/80 backdrop-blur-md text-white font-mono text-[9px] uppercase tracking-widest">
                      {project.category}
                    </div>
                    {/* Image */}
                    <img
                      src={project.mainImage}
                      alt={`${project.title} — ${project.category} design project in ${project.location}, ${project.year}`}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-studio-dark via-transparent to-transparent opacity-80 z-0" />
                  </div>

                  {/* Card Info Details */}
                  <div className="p-6 bg-studio-beige border-t border-studio-stone flex flex-col justify-between shrink-0">
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
  );
}
