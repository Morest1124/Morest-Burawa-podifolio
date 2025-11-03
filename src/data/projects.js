export const ALL_PROJECTS = [
  {
    id: 1,
    slug: "landing-page-redesign",
    title: "Landing Page Redesign",
    category: "frontend",
    desc: "Responsive landing page with animations.",
    images: [
      "https://picsum.photos/seed/1a/1200/800",
      "https://picsum.photos/seed/1b/1200/800",
      "https://picsum.photos/seed/1c/1200/800",
    ],
    media: [
      {
        type: "video",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        poster: "https://picsum.photos/seed/1a/1200/800",
      },
      { type: "image", src: "https://picsum.photos/seed/1b/1200/800" },
    ],
    frontendLive: "https://example.com/landing",
    backendLive: null,
    designUseCase:
      "Designed hero variations and micro-interactions for higher conversion; assets include responsive SVGs and a mobile-first layout.",
    caseStudy:
      "This project focused on increasing conversion by simplifying the hero and adding subtle motion. Performance budgets were kept tight and images were lazy-loaded.",
    tech: ["React", "Tailwind", "Vite"],
    year: 2025,
  },
  {
    id: 2,
    slug: "component-library",
    title: "Component Library",
    category: "frontend",
    desc: "Reusable UI components and design tokens.",
    images: [
      "https://picsum.photos/seed/2a/1200/800",
      "https://picsum.photos/seed/2b/1200/800",
    ],
    frontendLive: "https://example.com/components",
    backendLive: null,
    designUseCase:
      "Created token maps (colors, spacing) and Storybook pages for designers and engineers to collaborate.",
    caseStudy:
      "Built a small component library to speed up development across products. Emphasis on accessibility and visual regression tests.",
    tech: ["React", "Tailwind", "Storybook"],
    year: 2024,
  },
  {
    id: 3,
    slug: "ecommerce-api",
    title: "API for eCommerce",
    category: "backend",
    desc: "REST API with authentication and payments.",
    images: [
      "https://picsum.photos/seed/3a/1200/800",
      "https://picsum.photos/seed/3b/1200/800",
    ],
    media: [
      { type: "image", src: "https://picsum.photos/seed/3a/1200/800" },
      {
        type: "video",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        poster: "https://picsum.photos/seed/3b/1200/800",
      },
    ],
    frontendLive: null,
    backendLive: "https://api.example.com",
    designUseCase: "N/A",
    caseStudy:
      "Designed a REST API with JWT auth, product catalog endpoints, and webhooks for payments. Documentation was delivered via OpenAPI.",
    tech: ["Node.js", "Express", "Postgres"],
    year: 2025,
  },
  {
    id: 4,
    slug: "realtime-chat-service",
    title: "Realtime Chat Service",
    category: "backend",
    desc: "Websocket-based chat backend with presence.",
    images: [
      "https://picsum.photos/seed/4a/1200/800",
      "https://picsum.photos/seed/4b/1200/800",
      "https://picsum.photos/seed/4c/1200/800",
    ],
    media: [
      { type: "image", src: "https://picsum.photos/seed/4a/1200/800" },
      { type: "image", src: "https://picsum.photos/seed/4b/1200/800" },
      {
        type: "video",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        poster: "https://picsum.photos/seed/4c/1200/800",
      },
    ],
    frontendLive: null,
    backendLive: "https://chat.example.com",
    designUseCase: "N/A",
    caseStudy:
      "Implemented socket-based presence and message delivery guarantees. Scalability using Redis pub/sub and horizontal workers.",
    tech: ["Go", "Redis", "Websockets"],
    year: 2024,
  },
  {
    id: 5,
    slug: "branding-suite",
    title: "Branding Suite",
    category: "design",
    desc: "Visual identity, logos and style guides.",
    images: [
      "https://picsum.photos/seed/5a/1200/800",
      "https://picsum.photos/seed/5b/1200/800",
    ],
    media: [
      {
        type: "video",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        poster: "https://picsum.photos/seed/5a/1200/800",
      },
      { type: "image", src: "https://picsum.photos/seed/5b/1200/800" },
    ],
    frontendLive: null,
    backendLive: null,
    designUseCase:
      "Full identity for product launch — logos, color systems, and collateral templates for print and web.",
    caseStudy:
      "Developed a cohesive identity system with scalable logo variants and a color system optimized for accessibility.",
    tech: ["Figma", "Illustrator"],
    year: 2023,
  },
  {
    id: 6,
    slug: "marketing-assets",
    title: "Marketing Assets",
    category: "design",
    desc: "Ad creatives and social templates.",
    images: [
      "https://picsum.photos/seed/6a/1200/800",
      "https://picsum.photos/seed/6b/1200/800",
    ],
    frontendLive: null,
    backendLive: null,
    designUseCase:
      "Templates for paid ads and social channels, sized for mobile-first consumption.",
    caseStudy:
      "Created a set of templates that reduced asset production time by 60%.",
    tech: ["Photoshop", "Canva"],
    year: 2024,
  },
  // extras
  {
    id: 7,
    slug: "performance-optimizations",
    title: "Performance Optimizations",
    category: "frontend",
    desc: "Reduced bundle size and improved metrics.",
    images: ["https://picsum.photos/seed/7a/1200/800"],
    frontendLive: "https://example.com/perf",
    backendLive: null,
    designUseCase: "N/A",
    caseStudy:
      "Tree-shaken bundles and code-splitting led to a 40% faster Largest Contentful Paint.",
    tech: ["Webpack", "Lighthouse"],
    year: 2025,
  },
  {
    id: 8,
    slug: "accessibility-audit",
    title: "Accessibility Audit",
    category: "frontend",
    desc: "WCAG audit and fixes across the product.",
    images: ["https://picsum.photos/seed/8a/1200/800"],
    frontendLive: null,
    backendLive: null,
    designUseCase: "N/A",
    caseStudy:
      "Performed automated and manual testing, fixed focus order, and improved contrast ratios.",
    tech: ["axe", "Cypress"],
    year: 2024,
  },
  {
    id: 9,
    slug: "microservices-split",
    title: "Microservices Split",
    category: "backend",
    desc: "Refactor monolith into microservices.",
    images: ["https://picsum.photos/seed/9a/1200/800"],
    frontendLive: null,
    backendLive: "https://micro.example.com",
    designUseCase: "N/A",
    caseStudy:
      "Separated services and introduced service discovery, CI pipelines and contract tests.",
    tech: ["Kubernetes", "Docker"],
    year: 2023,
  },
  {
    id: 10,
    slug: "search-indexing",
    title: "Search Indexing",
    category: "backend",
    desc: "Fast, scalable search with indexing.",
    images: ["https://picsum.photos/seed/10a/1200/800"],
    frontendLive: null,
    backendLive: "https://search.example.com",
    designUseCase: "N/A",
    caseStudy:
      "Built a scalable index with incremental updates and relevance tuning.",
    tech: ["Elasticsearch", "Python"],
    year: 2024,
  },
  {
    id: 11,
    slug: "illustration-pack",
    title: "Illustration Pack",
    category: "design",
    desc: "Custom illustrations for onboarding flows.",
    images: ["https://picsum.photos/seed/11a/1200/800"],
    frontendLive: null,
    backendLive: null,
    designUseCase:
      "Illustrations were used in onboarding to explain features visually.",
    caseStudy:
      "Delivered a pack of 20 SVG illustrations with multiple color variants.",
    tech: ["Illustrator", "SVG"],
    year: 2022,
  },
  {
    id: 12,
    slug: "print-collateral",
    title: "Print Collateral",
    category: "design",
    desc: "Business cards, flyers and posters.",
    images: ["https://picsum.photos/seed/12a/1200/800"],
    frontendLive: null,
    backendLive: null,
    designUseCase: "Print-ready templates for events and sales teams.",
    caseStudy: "Created CMYK-ready assets and dielines for local print shops.",
    tech: ["InDesign"],
    year: 2021,
  },
];

export function getProjectByIdOrSlug(idOrSlug) {
  if (!idOrSlug) return null;
  const asNum = Number(idOrSlug);
  return (
    ALL_PROJECTS.find((p) => p.id === asNum || p.slug === idOrSlug) || null
  );
}

export default ALL_PROJECTS;
