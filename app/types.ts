/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
    id: string;
    title: string;
    category: 'residential' | 'commercial' | 'interior' | 'concept';
    location: string;
    year: string;
    area: string; // e.g., "350 m²"
    subtitle: string;
    description: string;
    fullStory: string;
    materials: string[];
    colorPalette: { name: string; hex: string }[];
    mainImage: string;
    gallery: string[];
    tags: string[];
}

export interface QuizQuestion {
    id: number;
    text: string;
    options: {
        text: string;
        points: { [style: string]: number };
        description: string;
    }[];
}

export interface StyleResult {
    name: string;
    tagline: string;
    description: string;
    percentage: number;
    recommendedMaterials: string[];
    colorTheme: string[];
    sampleProjectIds: string[];
}

export interface BriefDraft {
    name: string;
    email: string;
    phone: string;
    projectType: string;
    areaSize: number;
    budgetRange: string;
    stylePreference: string;
    preferredContact: 'phone' | 'email' | 'whatsapp';
    notes: string;
    currentStep: number;
}
