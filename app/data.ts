import type { Project, QuizQuestion, StyleResult } from './types';

export const PORTFOLIO_PROJECTS: Project[] = [
    {
        id: 'oasis-house',
        title: 'Oasis Cliff House',
        category: 'residential',
        location: 'Uluwatu, Bali',
        year: '2023',
        area: '420 m²',
        subtitle: 'Modern tropical villa blending seamlessly into the volcanic cliffside.',
        description: 'Adapting to the raw topography of Bali\'s south ridge, Oasis House employs boardmarked concrete and moveable teak screens to regulate marine breezes and frame boundless Indian Ocean horizons.',
        fullStory: 'Perched on a dramatic 45-degree volcanic cliff, the design challenge of Oasis House lay in celebrating the precipice while providing complete climatic and geological structural integrity. The building consists of three staggered concrete cantilevers that mimic the geological layering of the cliff. Movable floor-to-ceiling teak louvers act as a living skin, mitigating Bali\'s harsh western sun while allowing cooling sea breezes to filter through. Rainwater harvesting networks are integrated directly into the overhang grids, feeding the lush vertical garden atriums.',
        materials: ['Board-Marked Concrete', 'Reclaimed Old Teakwood', 'Natural Andesite Slate', 'Ocean Lava Stone'],
        colorPalette: [
            { name: 'Teak Ochre', hex: '#8D7654' },
            { name: 'Volcanic Basalt', hex: '#2A2927' },
            { name: 'Warm Lime Wash', hex: '#EAE5DB' },
            { name: 'Cliff Slate', hex: '#4A4C48' }
        ],
        mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
        gallery: [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200',
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200'
        ],
        tags: ['Cliffside', 'Teak Louvers', 'Infinity Edge', 'Eco Concrete']
    },
    {
        id: 'japandi-living',
        title: 'Japandi Serenity Penthouse',
        category: 'interior',
        location: 'Senopati, Jakarta',
        year: '2024',
        area: '180 m²',
        subtitle: 'Minimalist apartment loft fusing clean Japanese discipline with Scandinavian warmth.',
        description: 'A sensory rediscovery of a high-rise space in central Jakarta. Standard partitions are removed to favor floating paper screens, low-slung solid timber frames, and hand-plastered chalk wall textures.',
        fullStory: 'Designed for a writer seeking respite from the hectic Jakarta skyline, this penthouse interior is an exercise in restraint. The entire floor plan revolves around a Japanese "ma" concept—embracing empty space. Standard drywall partitions were replaced with sand-blasted glass panels and sliding Japanese washi paper screens, allowing natural light to penetrate deep into the home. Every piece of joinery is custom-built close to the floor to create an increased sense of spatial height, honoring the traditional tatami seating posture.',
        materials: ['Siberian Larch Wood', 'Handmade Washi Paper', 'Washed Linen', 'Honed Travertine'],
        colorPalette: [
            { name: 'Washi Cream', hex: '#FAF5EE' },
            { name: 'Natural Larch', hex: '#E3CEB1' },
            { name: 'Calm Sage', hex: '#949E8C' },
            { name: 'Honed Charcoal', hex: '#373634' }
        ],
        mainImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200',
        gallery: [
            'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200',
            'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200',
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200'
        ],
        tags: ['Tatami Grid', 'Chalk Plaster', 'Concealed Cabinetry', 'Soft Diffuse Light']
    },
    {
        id: 'inbetween-office',
        title: 'Fluid Mountain Lounge',
        category: 'commercial',
        location: 'Dago Cafe & Office, Bandung',
        year: '2022',
        area: '620 m²',
        subtitle: 'Co-working hub and cafe celebrating double-height spaces and indoor forest atriums.',
        description: 'An open collective workspace utilizing light industrial elements, local masonry, and floating steel bridges to blend community work dining with temperate mountain microclimates.',
        fullStory: 'Located in the hills of Bandung, this project blurs the boundaries between public cafe and private co-working office. Utilizing the mild weather of Bandung, we integrated a full-height glass atrium containing real tree specimens that acts as a natural separator. An overhead bridge structure links the dynamic brainstorm rooms with quiet desks, creating a physical sense of shared architectural movement.',
        materials: ['Powder-Coated Carbon Steel', 'Terrazzo Tile Inserts', 'Ribbed Fluted Glass', 'Exposed Structural Bricks'],
        colorPalette: [
            { name: 'Clay Red', hex: '#A85B49' },
            { name: 'Co-Steel Black', hex: '##1A1A1C' },
            { name: 'Forest Moss', hex: '#4E5A44' },
            { name: 'Soft Terrazzo Grey', hex: '#D6D5D2' }
        ],
        mainImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200',
        gallery: [
            'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200',
            'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200',
            'https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=1200'
        ],
        tags: ['Atrium', 'Double Height Lounge', 'Industrial Steel', 'Linear Grids']
    },
    {
        id: 'monolith-pavilion',
        title: 'The Monolith Pavilion',
        category: 'concept',
        location: 'Sleman, Yogyakarta',
        year: '2023',
        area: '120 m²',
        subtitle: 'A conceptual concrete retreat celebrating Javanese shadow play and silence.',
        description: 'An experimental pavilion exploring tropical thermal massing. Using heavily recessed wall spaces and geometric light tunnels to foster silence and cooling shade.',
        fullStory: 'Crafted as an architectural sanctuary outside Yogyakarta, the Monolith Pavilion is our study on light and darkness. Drawing inspiration from local ancient temples (Candi) and traditional Javanese structural shadow principles, the pavilion features heavy earth-colored concrete walls that block convective regional heat during peak hours and slow-release evening warmth. There are no traditional glass windows—only narrow, geometric light slots that cast moving, cosmic shadows throughout the limestone columns.',
        materials: ['Earth-rammed local Concrete', 'Basalt Stone Pavers', 'Patinated Copper Flutes', 'Lime Wash'],
        colorPalette: [
            { name: 'Soil Ochre', hex: '#877B6D' },
            { name: 'Limestone Gray', hex: '#B8B3AC' },
            { name: 'Acid Green Accent', hex: '#63654E' },
            { name: 'Shadow Charcoal', hex: '#21201E' }
        ],
        mainImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200',
        gallery: [
            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200',
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200'
        ],
        tags: ['Shadow Geometry', 'Thermal Mass', 'Rammed Earth', 'Sacred Pavilion']
    },
    {
        id: 'clay-kitchen',
        title: 'Terracotta Culinary Study',
        category: 'interior',
        location: 'Canggu, Bali',
        year: '2024',
        area: '85 m²',
        subtitle: 'Highly aesthetic organic kitchen utilizing warm regional clays and massive walnut wood carvings.',
        description: 'An open-concept kitchen and island set designed around tactile, earthy surfaces. Terracotta plastered details are accented by raw quartz structures and warm copper hardware.',
        fullStory: 'The kitchen is no longer a hidden service zone but a spatial theater of culinary art and connection. Designed for a renowned dynamic chef in Bali, this kitchen features a massive 3.2-meter singular block island carved from custom-cast red clay terrazzo. Overhead, warm copper light fixtures patinate with age, matching the warm tactile tone of the surrounding clay lime-wash walls.',
        materials: ['Terracotta Lime wash', 'Walnut Wood', 'Red Quartz Block', 'Aged Patinated Copper'],
        colorPalette: [
            { name: 'Terracotta Rust', hex: '#C2745D' },
            { name: 'Warm Walnut', hex: '#5E4A3B' },
            { name: 'Sandy Lime wash', hex: '#E6DDD0' },
            { name: 'Patinated Bronze', hex: '#453E3A' }
        ],
        mainImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200',
        gallery: [
            'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200',
            'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200'
        ],
        tags: ['Earthy Luxe', 'Monolithic Island', 'Concealed Kitchen', 'Rich Clay Warmth']
    },
    {
        id: 'canopy-residence',
        title: 'The Great Canopy Villa',
        category: 'residential',
        location: 'Sentul, West Java',
        year: '2023',
        area: '540 m²',
        subtitle: 'Ultra-luxurious home shaded beneath a hovering steel structure.',
        description: 'Nestled on a steep highland forest plot in Sentul, the Canopy Residence utilizes bold, lightweight steel architecture to host fluid family living under a single protective shadow layer.',
        fullStory: 'To protect the building from Sentul\'s heavy daily tropical rainfall and intense high humidity, the residence is styled with a gigantic, floating dark steel roof cantilevered outward by over 5 meters. Beneath this steel wing, elegant glass pavilions house separate living quarters, separated by dry and wet stone courtyards that capture natural visual microclimates and constant ventilation.',
        materials: ['Isolate Carbon Steel H-Beams', 'Fluted Ivory Limestone', 'Premium Insulated Low-E Glass', 'Solid Merbau Timber'],
        colorPalette: [
            { name: 'Warm Chalk', hex: '#F0ECE3' },
            { name: 'Iron Black', hex: '#1C1D1E' },
            { name: 'Merbau Auburn', hex: '#634434' },
            { name: 'Mountain Slate', hex: '#686B69' }
        ],
        mainImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200',
        gallery: [
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200',
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200'
        ],
        tags: ['Steel Canopy', 'Highend Forest Ret', 'Low-E Glazing', 'Linear Stone Walls']
    }
];

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
