import type { QuizQuestion, StyleResult } from '@/app/types';

export const STYLE_QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        id: 1,
        text: 'When you imagine your perfect Sunday afternoon, what visual scene anchors you?',
        options: [
            {
                text: 'A soft, cooling ocean breeze drifting past heavy teak slats on a textured sand stone terrace.',
                points: { 'Modern Tropical Craft': 3, 'Warm Minimalist': 1 },
                description: 'You appreciate highly regional, climate-responsive natural materials.'
            },
            {
                text: 'Absolute stillness inside a calm, beige plinth room with shadows tracing thin lines along raw lime wash.',
                points: { 'Japandi Calm': 3, 'Warm Minimalist': 2 },
                description: 'You adore extreme visual decluttering, clean lines, and soft light.'
            },
            {
                text: 'Dramatic heights, raw heavy board-marked concrete slabs, and a large black metal fireplace.',
                points: { 'Rich Brutalism': 3, 'Modern Tropical Craft': 1 },
                description: 'You are drawn to powerful geometric expressions, honesty of structural material, and weight.'
            },
            {
                text: 'Floor-to-ceiling sheets of structural glass floating seamlessly into a mountain pine valley under thin steel outlines.',
                points: { 'Contemporary Elegant': 3, 'Warm Minimalist': 1 },
                description: 'You prefer seamless panoramic boundaries, lightweight structures, and hyper-modern materials.'
            }
        ]
    },
    {
        id: 2,
        text: 'Which tactile material finish feels most deeply satisfying to your touch?',
        options: [
            {
                text: 'Rough terracotta pottery or heavily-grained rustic walnut wood.',
                points: { 'Modern Tropical Craft': 2, 'Japandi Calm': 1 },
                description: 'You prefer materials that carry historical organic craft, warmth, and textured density.'
            },
            {
                text: 'Tactile organic linen bedding, smooth white oak surfaces, and velvet lime plasters.',
                points: { 'Japandi Calm': 3, 'Warm Minimalist': 2 },
                description: 'You seek cozy comfort, supreme visual softness, and high tactility.'
            },
            {
                text: 'Cold basalt stones, structural oxidized iron sheeting, or cold dark raw metal frames.',
                points: { 'Rich Brutalism': 3 },
                description: 'You like the bold weight of materials and industrial texture integrity.'
            },
            {
                text: 'Pristinely polished quartz slabs, silky cold aluminum, and bright brushed champagne brass elements.',
                points: { 'Contemporary Elegant': 3, 'Warm Minimalist': 1 },
                description: 'You resonate with luxury metal accents, reflective sheets, and absolute precision finishes.'
            }
        ]
    },
    {
        id: 3,
        text: 'What is your absolute spatial priority when organizing a main living room?',
        options: [
            {
                text: 'Maximizing glass panel thresholds to treat the nearby garden landscape as our primary wallpaper.',
                points: { 'Modern Tropical Craft': 3, 'Contemporary Elegant': 2 },
                description: 'Biophilia and outdoor thresholds drive your spatial layout priorities.'
            },
            {
                text: 'Concealing all storage and electronics completely in clean walls to preserve flow and mindful focus.',
                points: { 'Japandi Calm': 3, 'Warm Minimalist': 3 },
                description: 'Silence, functionality, and zen organization represent your wellness priorities.'
            },
            {
                text: 'Using changes in height, double levels, or deeply recessed alcoves to create theatrical cozy niches.',
                points: { 'Rich Brutalism': 3, 'Modern Tropical Craft': 1 },
                description: 'You enjoy raw structural hierarchy, volumetric dynamic changes, and shadow play.'
            },
            {
                text: 'An expansive open-concept grid facilitating flexible entertainment layouts and elegant furniture pairings.',
                points: { 'Contemporary Elegant': 3, 'Warm Minimalist': 2 },
                description: 'You appreciate high modularity, physical spaciousness, and modern cosmopolitan layouts.'
            }
        ]
    },
    {
        id: 4,
        text: 'Which lighting condition inspires you the most?',
        options: [
            {
                text: 'Warm golden beams dappling through high timber screens into sand-colored floors.',
                points: { 'Modern Tropical Craft': 3, 'Japandi Calm': 1 },
                description: 'Dynamic, warm, sun-responsive shading filters.'
            },
            {
                text: 'Extremely soft, diffused, shadowless lighting that mimics an overcast skylight on off-white plaster.',
                points: { 'Japandi Calm': 3, 'Warm Minimalist': 2 },
                description: 'Calm, soothing ambient glow without hard light borders.'
            },
            {
                text: 'High contrast direct morning light casting harsh architectural concrete geometries across a space.',
                points: { 'Rich Brutalism': 3 },
                description: 'Shadow drama, volumetric sculpture play, and rich material contours.'
            },
            {
                text: 'Precisely positioned warm LED halo lines glow highlighting the edges of luxury ceiling bays.',
                points: { 'Contemporary Elegant': 3, 'Warm Minimalist': 1 },
                description: 'High-end hospitality lighting schemes, clean linear glows, and evening ambiance.'
            }
        ]
    }
];

export const STYLE_RESULTS: { [key: string]: StyleResult } = {
    'Warm Minimalist': {
        name: 'Warm Minimalist',
        tagline: 'Refined restraint, soft warm textures, and quiet high-end comfort.',
        description: 'You seek deep visual silence but refuse to let it feel clinical. Your perfect environment centers clean alignments, hidden functional modules, warm sandy wash backdrops, natural travertine blocks, and exceptionally soft linens. Your home is a warm monastery of personal focus.',
        percentage: 88,
        recommendedMaterials: ['White Travertine Limestone', 'Honed White Oak', 'Bouclé Wool Fabrics', 'Matte Chalk washed paint'],
        colorTheme: ['#FAF8F5', '#EAE5DB', '#BEB5A5', '#7A7365'],
        sampleProjectIds: ['japandi-living', 'clay-kitchen']
    },
    'Modern Tropical Craft': {
        name: 'Modern Tropical Craft',
        tagline: 'Biophilic thresholds, heavy cooling timbers, and structural local stone weaves.',
        description: 'You believe a tropical building must belong to its earth. Your signature style relies on wide cantilevering concrete eaves, sliding teak louvers that diffuse breeze and rain, dark volcanic stone surfaces, and structural basalt. You value natural materials that age gracefully with a beautiful patina.',
        percentage: 92,
        recommendedMaterials: ['Terracotta Tile cladding', 'Reclaimed Old Indonesian Teakwood', 'Rough basalt stone walling', 'Brass accents'],
        colorTheme: ['#FAF8F5', '#8D7654', '#4A4C48', '#2A2927'],
        sampleProjectIds: ['oasis-house', 'canopy-residence']
    },
    'Japandi Calm': {
        name: 'Japandi Calm',
        tagline: 'Quiet Japanese spatial poetry meets cozy Scandinavian functionalism.',
        description: 'The core tenets of Wabi-Sabi—appreciating the beauty in slight rustic asymmetry and impermanence—guide your vision. You appreciate Tatami grid arrangements, sliding washi screens, low-slung solid-oak tables, and extremely clean concealed shelving wardrobes. Your rooms possess an almost spiritual lightness.',
        percentage: 95,
        recommendedMaterials: ['Siberian Larch Timber', 'Original Japanese Washi Paper', 'Woven Tatami reed mats', 'Textured lime mortar'],
        colorTheme: ['#FAF5EE', '#E3CEB1', '#949E8C', '#373634'],
        sampleProjectIds: ['japandi-living', 'clay-kitchen']
    },
    'Rich Brutalism': {
        name: 'Rich Brutalism',
        tagline: 'Heavy architectural mass, concrete board markings, and majestic volumes.',
        description: 'You are an absolute lover of pure architecture, structural geometry, and material truth. You like the dramatic, solid contrast of exposed raw concrete frames, dark iron structural spans, heavy stone plinths, and warm cozy fire alcoves. You value monumental silhouettes and beautiful shadow play.',
        percentage: 84,
        recommendedMaterials: ['Raw Board-marked concrete', 'Structural black carbon steel H Beams', 'Monolithic granite steps', 'Lava flagstone decks'],
        colorTheme: ['#FAF8F5', '#877B6D', '#B8B3AC', '#21201E'],
        sampleProjectIds: ['monolith-pavilion', 'inbetween-office']
    },
    'Contemporary Elegant': {
        name: 'Contemporary Elegant',
        tagline: 'Expansive structural glass panels, structural floating plates, and fine precision metal trim.',
        description: 'Your design tastes resemble a cosmopolitan five-star architectural retreat. Your ideal environment utilizes massive floor-to-ceiling Low-E glass grids, floating architectural ceiling plates with integrated LED runs, massive marble slabs, and beautiful champagne-colored metal brackets.',
        percentage: 90,
        recommendedMaterials: ['Low-E Double glazing glass', 'Brushed Champagne Metal framing', 'Honed Calacatta Marble slabs', 'Fluted White Limestone blocks'],
        colorTheme: ['#FAF8F5', '#F0ECE3', '#C5A880', '#1C1D1E'],
        sampleProjectIds: ['canopy-residence', 'inbetween-office']
    }
};
