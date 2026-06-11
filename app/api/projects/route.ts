import { NextResponse } from 'next/server';
import { Project } from '../../types';

interface ExternalProject {
  id: string;
  title: string;
  role?: string;
  createdAt?: string;
  description?: string | null;
  thumbnail?: string;
  images?: string[];
  techStacks?: string[];
}

// Category mapper based on title and role
function mapApiCategory(role: string = '', title: string = ''): 'residential' | 'commercial' | 'interior' | 'concept' {
  const r = role.toLowerCase();
  const t = title.toLowerCase();
  if (t.includes('preschool') || t.includes('education') || t.includes('cafe') || t.includes('office') || t.includes('lounge') || t.includes('commercial')) {
    return 'commercial';
  }
  if (r.includes('interior')) {
    return 'interior';
  }
  if (t.includes('house') || t.includes('residence') || t.includes('villa') || t.includes('home') || t.includes('residential')) {
    return 'residential';
  }
  return 'concept';
}

// Location extractor from parentheses in title
function extractLocation(title: string): string {
  const match = title.match(/\(([^)]+)\)$/);
  if (match) {
    return match[1];
  }
  return 'Indonesia';
}

// Area extractor from description
function extractArea(description: string | null): string {
  if (!description) return '150 m²';
  const match = description.match(/(\d+)\s*(m²|sqm|sq m)/i);
  if (match) {
    return `${match[1]} m²`;
  }
  return '150 m²';
}

// Subtitle generator from description
function getSubtitle(description: string | null, role: string): string {
  if (!description) {
    return `${role} project prioritizing sustainable layout execution and tactile harmony.`;
  }
  const clean = description.replace(/\n+/g, ' ');
  if (clean.length > 120) {
    return clean.substring(0, 117) + '...';
  }
  return clean;
}

// Material list mapper
function getMaterials(role: string = '', title: string = ''): string[] {
  const r = role.toLowerCase();
  const t = title.toLowerCase();
  if (r.includes('interior')) {
    return ['Teak Wood Panels', 'Travertine Slate', 'Linen Fabrics', 'Lime wash plaster'];
  }
  if (t.includes('concrete') || t.includes('brutalism')) {
    return ['Exposed Concrete', 'Carbon Steel', 'Basalt Stone', 'Lava slate'];
  }
  return ['Teak Wood', 'Limestone', 'Premium Low-E Glass', 'Local Masonry'];
}

// Color palette generator based on category
function getColorPalette(category: string): { name: string; hex: string }[] {
  switch (category) {
    case 'interior':
      return [
        { name: 'Washi Cream', hex: '#FAF5EE' },
        { name: 'Natural Oak', hex: '#E3CEB1' },
        { name: 'Warm Charcoal', hex: '#373634' },
        { name: 'Calm Sage', hex: '#949E8C' }
      ];
    case 'commercial':
      return [
        { name: 'Clay Red', hex: '#A85B49' },
        { name: 'Co-Steel Black', hex: '#1A1A1C' },
        { name: 'Forest Moss', hex: '#4E5A44' },
        { name: 'Terrazzo Grey', hex: '#D6D5D2' }
      ];
    case 'residential':
      return [
        { name: 'Teak Ochre', hex: '#8D7654' },
        { name: 'Volcanic Basalt', hex: '#2A2927' },
        { name: 'Warm Lime Wash', hex: '#EAE5DB' },
        { name: 'Cliff Slate', hex: '#4A4C48' }
      ];
    default:
      return [
        { name: 'Limestone Gray', hex: '#B8B3AC' },
        { name: 'Shadow Charcoal', hex: '#21201E' },
        { name: 'Merbau Auburn', hex: '#634434' },
        { name: 'Mountain Slate', hex: '#686B69' }
      ];
  }
}

// Tags list generator
function getTags(techStacks: string[] = [], role: string = ''): string[] {
  const baseTags = techStacks.length > 0 ? techStacks : ['3D Modeling', 'Concept Drafting'];
  if (role.toLowerCase().includes('interior')) {
    return [...baseTags, 'Interior Details', 'Material Selection'];
  }
  return [...baseTags, 'Architectural Eaves', 'Structural Layout'];
}

export async function GET() {
  const userId = process.env.PROJECTS_USER_ID;
  const apiBase = process.env.API_BASE_URL;
  if (!userId || !apiBase) {
    return NextResponse.json({ error: 'PROJECTS_USER_ID or API_BASE_URL not configured in environment' }, { status: 500 });
  }

  try {
    const res = await fetch(`${apiBase}/projects/public/${userId}`, {
      next: { revalidate: 60 } // Cache list for 60 seconds
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch from remote API: ${res.statusText}`);
    }

    const externalProjects = await res.json();

    if (!Array.isArray(externalProjects)) {
      throw new Error('API response is not an array of projects');
    }

    const mappedProjects: Project[] = externalProjects.map((proj: ExternalProject) => {
      const category = mapApiCategory(proj.role, proj.title);
      return {
        id: proj.id,
        title: proj.title,
        category: category,
        location: extractLocation(proj.title),
        year: proj.createdAt ? new Date(proj.createdAt).getFullYear().toString() : '2026',
        area: extractArea(proj.description || null),
        subtitle: getSubtitle(proj.description || null, proj.role || 'Architect'),
        description: proj.description || 'Architectural project by Yuditia and Rizky Chandra.',
        fullStory: proj.description || 'Architectural project detailing volumetric layout designs, climatic responsiveness, and spatial integrity.',
        materials: getMaterials(proj.role, proj.title),
        colorPalette: getColorPalette(category),
        mainImage: proj.thumbnail || (proj.images && proj.images.length > 0 ? proj.images[0] : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200'),
        gallery: proj.images && proj.images.length > 0 ? proj.images : (proj.thumbnail ? [proj.thumbnail] : []),
        tags: getTags(proj.techStacks, proj.role)
      };
    });

    return NextResponse.json(mappedProjects);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error fetching/mapping projects:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
