'use client';

import React, { useState } from 'react';
import { Grid, ArrowUpRight } from 'lucide-react';
import { Project } from '@/app/types';

interface PortfolioProps {
  projects: Project[];
  isProjectsLoading: boolean;
  onSelectProject: (project: Project) => void;
}

export default function Portfolio({
  projects,
  isProjectsLoading,
  onSelectProject,
}: PortfolioProps) {
  const [portfolioFilter, setPortfolioFilter] = useState<
    'all' | 'architecture' | 'interior'
  >('all');

  const filteredProjects = projects.filter((p) => {
    if (portfolioFilter === 'all') return true;
    if (portfolioFilter === 'interior') return p.category === 'interior';
    return p.category !== 'interior';
  });

  const getCardHeight = (index: number) => {
    const heights = [
      'h-[420px]',
      'h-[360px]',
      'h-[520px]',
      'h-[300px]',
      'h-[460px]',
      'h-[340px]',
      'h-[500px]',
      'h-[380px]',
    ];

    return heights[index % heights.length];
  };

  return (
    <section
      id="portfolio"
      className="py-10 bg-studio-beige border-b border-studio-stone"
      aria-label="Our Architecture and Interior Design Projects"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="mono-spec text-[10px] uppercase tracking-[0.25em] text-[#8D7654] font-medium flex items-center gap-1.5 mb-1">
              <Grid className="h-3 w-3 text-studio-gold" />
              Curated Gallery
            </span>

            <h2 className="font-serif text-3xl md:text-5xl tracking-tight text-studio-dark">
              <span className="italic font-light">Our Projects</span>
            </h2>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap items-center gap-1 bg-studio-paper p-1 border border-studio-stone">
            {(['all', 'architecture', 'interior'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setPortfolioFilter(filter)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-300 ${portfolioFilter === filter
                  ? 'bg-studio-dark text-studio-beige border border-studio-dark'
                  : 'text-neutral-500 hover:text-studio-dark hover:bg-studio-stone/20'
                  }`}
              >
                {filter === 'all' ? 'All' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Layout */}
        <div
          id="portfolio-masonry"
          className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]"
        >
          {isProjectsLoading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={`skeleton-${idx}`}
                className={`mb-6 break-inside-avoid relative overflow-hidden bg-studio-paper border border-studio-stone/60 animate-pulse ${getCardHeight(
                  idx
                )}`}
              >
                <div className="absolute inset-0 bg-studio-stone/30" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="h-3 bg-studio-stone/40 rounded w-24 mb-3" />
                  <div className="h-7 bg-studio-stone/40 rounded w-2/3" />
                </div>
              </div>
            ))
          ) : filteredProjects.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-sm text-neutral-500 font-mono">
                No projects found in this category.
              </p>
            </div>
          ) : (
            filteredProjects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                onClick={() => onSelectProject(project)}
                className={`group mb-6 break-inside-avoid relative block w-full overflow-hidden text-left bg-studio-paper border border-studio-stone cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${getCardHeight(
                  index
                )}`}
                aria-label={`View ${project.title}`}
              >
                <img
                  src={project.mainImage}
                  alt={`${project.title} — ${project.category} design project in ${project.location}`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-all duration-500 group-hover:from-black/95 group-hover:via-black/35" />

                <div className="absolute inset-0 border border-white/0 transition-all duration-500 group-hover:border-white/20" />

                <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-8">
                  <div className="transition-all duration-500 group-hover:-translate-y-2">
                    <span className="mb-2 block text-[10px] font-mono uppercase tracking-[0.22em] text-white/60">
                      {project.category}
                    </span>

                    <h3 className="font-serif text-2xl md:text-3xl leading-tight text-white">
                      {project.title}
                    </h3>

                    <p className="mt-2 max-w-sm text-xs leading-relaxed text-white/65 line-clamp-2 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      {project.subtitle}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      View Project
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </section>
  );
}