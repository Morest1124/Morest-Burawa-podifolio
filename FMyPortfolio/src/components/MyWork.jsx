import { formatTextWithNumbers } from "../utils/formatTextWithNumbers";
import React, { useMemo, useState, useEffect, useRef } from "react";
import Img from "./Img";
import Lightbox from "./Lightbox";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Front-end" },
  { id: "backend", label: "Back-end" },
  { id: "design", label: "Graphic Design" },
];

function ProjectCard({ p, onOpen, onOpenLightbox }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  // Use image_url from the API, with fallbacks
  const images = p.images && p.images.length ? p.images : [p.image_url || p.image];

  useEffect(() => {
    // autoplay every 3s
    if (paused || !images || images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, [images, images.length, paused]);

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
      className="group project-card relative overflow-hidden rounded-lg border border-accent shadow-sm bg-black/30 flex flex-col h-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex-grow">
        <div className="w-full h-40 sm:h-44 lg:h-36 bg-black/20 overflow-hidden relative">
          {images.map((src, i) => (
            <div
              key={src || i}
              role="button"
              tabIndex={0}
              onClick={() => onOpenLightbox && onOpenLightbox(images, i, p.title)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onOpenLightbox && onOpenLightbox(images, i, p.title);
              }}
              aria-label={`Open full image ${i + 1} for ${p.title}`}
              className={`absolute inset-0 block w-full h-full ${
                i === index ? "opacity-100 scale-100" : "opacity-0 scale-95"
              } transition-opacity duration-700 ease-out cursor-zoom-in`}
              style={{ transformOrigin: "center" }}
            >
              <Img
                src={src}
                alt={`${p.title} ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          ))}

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
                    className={`w-2 h-2 rounded-full transition-opacity ${
                      dotIdx === index
                        ? "dot-accent"
                        : "bg-[rgba(255,255,255,0.18)]"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          <button
            onClick={() => {
              const slug = p.slug || p.id;
              window.location.hash = `project-${slug}`;
            }}
            aria-label={`Open full details for ${p.title}`}
            className="absolute right-2 top-2 z-20 rounded-full bg-black/40 p-1 text-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
          >
            
          </button>
        </div>

        <div className="p-4 max-h-52 sm:max-h-60 overflow-auto content-area">
          <h3 className="font-semibold text-lg">{p.title}</h3>
          {/* Use summary from the API, with fallback to description */}
          <p className="mt-2 text-sm">{formatTextWithNumbers(p.summary || p.description)}</p>
        </div>
      </div>

      <div className="p-4 pt-0 view-button-container">
        <button
          onClick={() => onOpen && onOpen(p)}
          className="w-full inline-flex items-center justify-center rounded-md px-3 py-2 btn-accent view-button"
          aria-label={`Open ${p.title}`}
        >
          View →
        </button>
      </div>
    </article>
  );
}

export default function MyWork() {
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [active, setActive] = useState("all");
  const [showMore, setShowMore] = useState(false);
  const [modalProject, setModalProject] = useState(null);
  const [modalIndex, setModalIndex] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/projects/`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllProjects(data);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch projects:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const visibleProjects = useMemo(() => {
    // Use the new 'allProjects' state which is populated from the API
    const list = allProjects.filter((p) =>
      active === "all" ? true : p.categories.includes(active) // Assuming categories is an array of strings
    );
    if (!showMore) {
      return active === "all" ? list.slice(0, 6) : list.slice(0, 2);
    }
    return list;
  }, [active, showMore, allProjects]);

  useEffect(() => {
    function onKey(e) {
      if (!modalProject) return;
      if (e.key === "Escape") setModalProject(null);
      if (e.key === "ArrowLeft")
        setModalIndex((m) => (m - 1 + (modalProject.images?.length || 1)) % (modalProject.images?.length || 1));
      if (e.key === "ArrowRight")
        setModalIndex((m) => (m + 1) % (modalProject.images?.length || 1));
    }
    if (modalProject) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [modalProject]);

  useEffect(() => {
    if (lightbox) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [lightbox]);

  return (
    <section className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold">My Work</h2>
            <p className="mt-2">Selected projects, case studies and links to live demos.</p>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <div className="text-sm opacity-70">Jump to:</div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setActive("frontend");
                  setShowMore(false);
                }}
                className={`category-pill ${active === "frontend" ? "active" : ""}`}
                aria-pressed={active === "frontend"}
                aria-label="Show front-end projects"
              >
                <svg className="category-icon w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <rect x="3" y="5" width="18" height="12" rx="1" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M7 3h10v2H7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="ml-2">Front-end</span>
              </button>

              <button
                onClick={() => {
                  setActive("backend");
                  setShowMore(false);
                }}
                className={`category-pill ${active === "backend" ? "active" : ""}`}
                aria-pressed={active === "backend"}
                aria-label="Show back-end projects"
              >
                <svg className="category-icon w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <rect x="4" y="4" width="16" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="4" y="14" width="16" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                <span className="ml-2">Back-end</span>
              </button>

              <button
                onClick={() => {
                  setActive("design");
                  setShowMore(false);
                }}
                className={`category-pill ${active === "design" ? "active" : ""}`}
                aria-pressed={active === "design"}
                aria-label="Show design projects"
              >
                <svg className="category-icon w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M12 2l3 6 6 3-6 3-3 6-3-6-6-3 6-3 3-6z" stroke="currentColor" strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="ml-2">Graphic Design</span>
              </button>

              <button
                onClick={() => {
                  setActive("all");
                  setShowMore(false);
                }}
                className={`px-3 py-1 rounded-md font-medium transition ${active === "all" ? "bg-accent-soft" : "bg-black/20 hover:bg-black/10"}`}
                aria-pressed={active === "all"}
                aria-label="Show all projects"
              >
                All
              </button>
            </div>
          </div>
        </div>

        {/* Mobile category nav */}
        <div className="sm:hidden mb-6">
          <select
            className="w-full bg-black/20 p-2 rounded-md"
            value={active}
            onChange={(e) => {
              setActive(e.target.value);
              setShowMore(false);
            }}
            aria-label="Select project category"
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Add loading and error handling */}
        {loading && <div className="text-center py-10">Loading projects...</div>}
        {error && <div className="text-center py-10 text-red-500">Error fetching projects: {error}</div>}
        
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProjects.map((p) => (
                <ProjectCard
                  key={p.id}
                  p={p}
                  onOpen={(proj) => {
                    setModalProject(proj);
                    setModalIndex(0);
                  }}
                  onOpenLightbox={(images, startIndex, title) => setLightbox({ images, startIndex, title })}
                />
              ))}
            </div>

            {allProjects.length > 6 && (
              <div className="mt-8 flex items-center justify-center gap-4">
                <button onClick={() => setShowMore((s) => !s)} className="px-5 py-2 rounded-md font-semibold transition btn-accent">
                  {showMore ? "Show less" : "Show more"}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal for project details */}
      {modalProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={modalProject.title}
          className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalProject(null);
          }}
        >
          <div className="modal-dialog relative w-full max-w-4xl bg-black/90 border border-accent rounded-lg overflow-hidden">
            <button onClick={() => setModalProject(null)} aria-label="Close project" className="modal-close absolute right-3 top-3 text-xl p-1 bg-black/30 rounded">
              ✕
            </button>

            <div className="w-full h-64 sm:h-80 bg-black/20 relative">
              {(modalProject.images || [modalProject.image_url]).map((src, i) => (
                <div
                  key={src || i}
                  role="button"
                  tabIndex={0}
                  onClick={() => setLightbox({ images: modalProject.images || [modalProject.image_url], startIndex: i, title: modalProject.title })}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setLightbox({ images: modalProject.images || [modalProject.image_url], startIndex: i, title: modalProject.title });
                  }}
                  aria-label={`Open full image ${i + 1} for ${modalProject.title}`}
                  className={`absolute inset-0 block w-full h-full transition-opacity duration-500 ${i === modalIndex ? "opacity-100" : "opacity-0"} cursor-zoom-in`}
                >
                  <Img src={src} alt={`${modalProject.title} ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
                </div>
              ))}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setModalIndex((m) => (m - 1 + (modalProject.images?.length || 1)) % (modalProject.images?.length || 1));
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/40 p-2"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setModalIndex((m) => (m + 1) % (modalProject.images?.length || 1));
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/40 p-2"
                aria-label="Next image"
              >
                ›
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold">{modalProject.title}</h3>
              <p className="mt-3 text-sm">{modalProject.summary || modalProject.description}</p>

              <div className="mt-6 flex items-center gap-3">
                <a href={modalProject.live_link || "#"} target="_blank" rel="noreferrer" className="px-4 py-2 rounded btn-accent">
                  Open Live
                </a>
                <a href={modalProject.repo_link || "#"} target="_blank" rel="noreferrer" className="px-4 py-2 rounded bg-black/20 ml-2">
                  View Code
                </a>
                <button onClick={() => { const slug = modalProject.slug || modalProject.id; window.location.hash = `project-${slug}`; }} className="px-4 py-2 rounded bg-black/20 ml-2">
                  Full details
                </button>
                <button onClick={() => setModalProject(null)} className="px-4 py-2 rounded bg-black/20">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox overlay */}
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.startIndex}
          title={lightbox.title}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
}
