export const ALL_PROJECTS = [
  {
    id: 1,
    slug: "freelancing-website",
    title: "Freelancing Website",
    category: "frontend",
    desc: "A platform for freelancers to showcase their work and connect with clients.",
    images: [
      "https://picsum.photos/seed/1a/1200/800",
      "https://picsum.photos/seed/1b/1200/800",
    ],
    frontendLive: "https://alx-front-end-develop-capstone-proj.vercel.app/",
    backendLive: "https://binaryblade24-api.onrender.com",
    caseStudy:
      "Developed a full-stack freelancing platform with a React front-end and a Django REST Framework back-end. Implemented JWT for secure authentication.",
    tech: ["React", "Tailwind CSS", "Django REST Framework", "JWT"],
    year: 2025,
  },
  {
    id: 2,
    slug: "contact-conversion-tool",
    title: "Contact Conversion Tool",
    category: "frontend",
    desc: "A tool to convert contact details into an importable format for mobile phones.",
    images: [
      "https://picsum.photos/seed/2a/1200/800",
      "https://picsum.photos/seed/2b/1200/800",
    ],
    frontendLive: null,
    backendLive: null,
    caseStudy:
      "Constructed a conversion website that creates an importable format of contact details directly into a mobile phone, simplifying contact management.",
    tech: ["JavaScript", "HTML", "CSS"],
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
];

export function getProjectByIdOrSlug(idOrSlug) {
  if (!idOrSlug) return null;
  const asNum = Number(idOrSlug);
  return (
    ALL_PROJECTS.find((p) => p.id === asNum || p.slug === idOrSlug) || null
  );
}

export default ALL_PROJECTS;
