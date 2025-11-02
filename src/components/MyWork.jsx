import React, { useMemo, useState, useEffect, useRef } from "react";

const ALL_PROJECTS = [
  // initial 6 projects (2 per category) - now each project has multiple images
  {
    id: 1,
    title: "Landing Page Redesign",
    category: "frontend",
    desc: "Responsive landing page with animations.",
    link: "#",
    images: [
      "https://picsum.photos/seed/1a/1200/800",
      "https://picsum.photos/seed/1b/1200/800",
      "https://picsum.photos/seed/1c/1200/800",
    ],
  },
  {
    id: 2,
    title: "Component Library",
    category: "frontend",
    desc: "Reusable UI components and design tokens.",
    link: "#",
    images: [
      "https://picsum.photos/seed/2a/1200/800",
      "https://picsum.photos/seed/2b/1200/800",
    ],
  },
  {
    id: 3,
    title: "API for eCommerce",
    category: "backend",
    desc: "REST API with authentication and payments.",
    link: "#",
    images: [
      "https://picsum.photos/seed/3a/1200/800",
      "https://picsum.photos/seed/3b/1200/800",
    ],
  },
  {
    id: 4,
    title: "Realtime Chat Service",
    category: "backend",
    desc: "Websocket-based chat backend with presence.",
    link: "#",
    images: [
      "https://picsum.photos/seed/4a/1200/800",
      "https://picsum.photos/seed/4b/1200/800",
      "https://picsum.photos/seed/4c/1200/800",
    ],
  },
  {
    id: 5,
    title: "Branding Suite",
    category: "design",
    desc: "Visual identity, logos and style guides.",
    link: "#",
    images: [
      "https://picsum.photos/seed/5a/1200/800",
      "https://picsum.photos/seed/5b/1200/800",
    ],
  },
  {
    id: 6,
    title: "Marketing Assets",
    category: "design",
    desc: "Ad creatives and social templates.",
    link: "#",
    images: [
      "https://picsum.photos/seed/6a/1200/800",
      "https://picsum.photos/seed/6b/1200/800",
    ],
  },
  // extra projects revealed by Show more
  {
    id: 7,
    title: "Performance Optimizations",
    category: "frontend",
    desc: "Reduced bundle size and improved metrics.",
    link: "#",
    images: ["https://picsum.photos/seed/7a/1200/800", "https://picsum.photos/seed/7b/1200/800"],
  },
  {
    id: 8,
    title: "Accessibility Audit",
    category: "frontend",
    desc: "WCAG audit and fixes across the product.",
    link: "#",
    images: ["https://picsum.photos/seed/8a/1200/800", "https://picsum.photos/seed/8b/1200/800"],
  },
  {
    id: 9,
    title: "Microservices Split",
    category: "backend",
    desc: "Refactor monolith into microservices.",
    link: "#",
    images: ["https://picsum.photos/seed/9a/1200/800", "https://picsum.photos/seed/9b/1200/800"],
  },
  {
    id: 10,
    title: "Search Indexing",
    category: "backend",
    desc: "Fast, scalable search with indexing.",
    link: "#",
    images: ["https://picsum.photos/seed/10a/1200/800", "https://picsum.photos/seed/10b/1200/800"],
  },
  {
    id: 11,
    title: "Illustration Pack",
    category: "design",
    desc: "Custom illustrations for onboarding flows.",
    link: "#",
    images: ["https://picsum.photos/seed/11a/1200/800", "https://picsum.photos/seed/11b/1200/800"],
  },
  {
    id: 12,
    title: "Print Collateral",
    category: "design",
    desc: "Business cards, flyers and posters.",
    link: "#",
    images: ["https://picsum.photos/seed/12a/1200/800", "https://picsum.photos/seed/12b/1200/800"],
  },
];

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Front-end" },
  { id: "backend", label: "Back-end" },
  { id: "design", label: "Graphic Design" },
];

function ProjectCard({ p, onOpen }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  const images = p.images && p.images.length ? p.images : [p.image];

  useEffect(() => {
    // autoplay every 3s
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, [images.length, paused]);

  function goPrev(e) {
    e && e.preventDefault();
    setIndex((i) => (i - 1 + images.length) % images.length);
  }

  function goNext(e) {
    e && e.preventDefault();
    setIndex((i) => (i + 1) % images.length);
  }

  return (
    <article
      className="group relative overflow-hidden rounded-lg border border-accent shadow-sm bg-black/30"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="w-full h-40 sm:h-44 lg:h-36 bg-black/20 overflow-hidden relative">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${p.title} ${i + 1}`}
            loading="lazy"
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-700 ease-out ${i === index ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            style={{
              transformOrigin: 'center',
            }}
          />
        ))}

        {/* Prev / Next controls (visible on hover) */}
        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              aria-label={`Previous image for ${p.title}`}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/40 p-1 text-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
            >
              ‹
            </button>
            <button
              onClick={goNext}
              aria-label={`Next image for ${p.title}`}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/40 p-1 text-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
            >
              ›
            </button>
            <div className="absolute left-3 bottom-3 z-10 flex items-center gap-2">
                {images.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setIndex(dotIdx)}
                  aria-label={`Show image ${dotIdx + 1} for ${p.title}`}
                  className={`w-2 h-2 rounded-full transition-opacity ${dotIdx === index ? "dot-accent" : "bg-[rgba(255,255,255,0.18)]"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-4 max-h-36 sm:max-h-44 overflow-auto content-area">
        <h3 className="font-semibold text-lg">{p.title}</h3>
        <p className="mt-2 text-sm">{p.desc}</p>
      </div>

      <button
        onClick={() => onOpen && onOpen(p)}
        className="absolute inset-x-4 bottom-4 inline-flex items-center justify-center rounded-md px-3 py-2 btn-accent opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
        aria-label={`Open ${p.title}`}
      >
        View →
      </button>
    </article>
  );
}

export default function MyWork() {
  const [active, setActive] = useState("all");
  const [showMore, setShowMore] = useState(false);
  const [modalProject, setModalProject] = useState(null);
  const [modalIndex, setModalIndex] = useState(0);

  const visibleProjects = useMemo(() => {
    const list = ALL_PROJECTS.filter((p) => active === "all" ? true : p.category === active);
    if (!showMore) {
      // show first 6 when showing all, otherwise show first 2 for a filtered category
      return active === "all" ? list.slice(0, 6) : list.slice(0, 2);
    }
    return list;
  }, [active, showMore]);

  // lock body scroll and add keyboard handlers when modal is open
  useEffect(() => {
    function onKey(e) {
      if (!modalProject) return;
      if (e.key === 'Escape') setModalProject(null);
      if (e.key === 'ArrowLeft') setModalIndex((m) => (m - 1 + modalProject.images.length) % modalProject.images.length);
      if (e.key === 'ArrowRight') setModalIndex((m) => (m + 1) % modalProject.images.length);
    }
    if (modalProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [modalProject]);

  return (
    <section className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold">My Work</h2>
            <p className="mt-2">Selected projects, case studies and links to live demos.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm opacity-70">Filter:</span>
            <nav className="inline-flex gap-2" aria-label="Project categories">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { setActive(c.id); setShowMore(false); }}
                  className={`px-3 py-1 rounded-md font-medium transition ${active === c.id ? "bg-accent-soft" : "bg-black/20 hover:bg-black/10"}`}
                  aria-pressed={active === c.id}
                >
                  {c.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile category nav */}
        <div className="sm:hidden mb-6">
          <select
            className="w-full bg-black/20 p-2 rounded-md"
            value={active}
            onChange={(e) => { setActive(e.target.value); setShowMore(false); }}
            aria-label="Select project category"
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((p) => (
            <ProjectCard key={p.id} p={p} onOpen={(proj) => { setModalProject(proj); setModalIndex(0); }} />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => setShowMore((s) => !s)}
            className="px-5 py-2 rounded-md font-semibold transition btn-accent"
          >
            {showMore ? "Show less" : "Show more"}
          </button>
        </div>
      </div>

      {/* Modal for project details */}
      {modalProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={modalProject.title}
          className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setModalProject(null); }}
        >
          <div className="modal-dialog relative w-full max-w-4xl bg-black/90 border border-accent rounded-lg overflow-hidden">
            <button
              onClick={() => setModalProject(null)}
              aria-label="Close project"
              className="modal-close absolute right-3 top-3 text-xl p-1 bg-black/30 rounded"
            >
              ✕
            </button>

            <div className="w-full h-64 sm:h-80 bg-black/20 relative">
              {modalProject.images.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`${modalProject.title} ${i + 1}`}
                  loading="lazy"
                  className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${i === modalIndex ? 'opacity-100' : 'opacity-0'}`}
                />
              ))}

              <button
                onClick={(e) => { e.stopPropagation(); setModalIndex((m) => (m - 1 + modalProject.images.length) % modalProject.images.length); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/40 p-2"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setModalIndex((m) => (m + 1) % modalProject.images.length); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/40 p-2"
                aria-label="Next image"
              >
                ›
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold">{modalProject.title}</h3>
              <p className="mt-3 text-sm">{modalProject.desc}</p>

              <div className="mt-6 flex items-center gap-3">
                <a href={modalProject.link} className="px-4 py-2 rounded btn-accent">Open Live</a>
                <button onClick={() => setModalProject(null)} className="px-4 py-2 rounded bg-black/20">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
