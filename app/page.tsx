'use client';

import { useState, useEffect } from 'react';
import { PORTFOLIO_PROJECTS } from './data';
import { Project, BriefDraft } from './types';

// Component imports
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Portfolio from '@/components/Portfolio';
import About from '@/components/About';
import StyleQuiz from '@/components/StyleQuiz';
import ContactForm from '@/components/ContactForm';
import ProjectModal from '@/components/ProjectModal';
import Footer from '@/components/Footer';
import OurPeople from '@/components/OurPeople';

export default function App() {
  // Navigation active section tracking
  const [activeSection, setActiveSection] = useState('home');

  // Shared Portfolio states
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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

  // Client Brief Draft State (Persisted in localStorage)
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

  // Scroll to top when active section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-studio-beige text-studio-dark font-sans flex flex-col selection:bg-studio-gold selection:text-white antialiased">
      {/* SECTION 1: HEADER */}
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* DYNAMIC SECTION CONTENT */}
      <main className="flex-grow">
        {activeSection === 'home' && (
          <Hero projects={projects} setActiveSection={setActiveSection} />
        )}
        {activeSection === 'portfolio' && (
          <Portfolio
            projects={projects}
            isProjectsLoading={isProjectsLoading}
            onSelectProject={handleSelectProject}
          />
        )}
        {(activeSection === 'about' || activeSection === 'philosophy') && (
          <About setActiveSection={setActiveSection} />
        )}
        {activeSection === 'ourpeople' && (
          <OurPeople setActiveSection={setActiveSection} />
        )}
        {activeSection === 'quiz' && (
          <StyleQuiz
            projects={projects}
            onSelectProject={handleSelectProject}
            setBriefDraft={setBriefDraft}
            setActiveSection={setActiveSection}
          />
        )}
        {activeSection === 'contact' && (
          <ContactForm briefDraft={briefDraft} setBriefDraft={setBriefDraft} />
        )}
      </main>

      {/* SECTION 8: PROJECT DETAILS MODAL */}
      <ProjectModal
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        isDetailLoading={isDetailLoading}
        setBriefDraft={setBriefDraft}
        setActiveSection={setActiveSection}
      />

      {/* SECTION 9: FOOTER */}
      <Footer setActiveSection={setActiveSection} />
    </div>
  );
}
