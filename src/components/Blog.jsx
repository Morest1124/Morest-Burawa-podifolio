import { formatTextWithNumbers } from "../utils/formatTextWithNumbers";
import React, { useEffect, useMemo, useState } from "react";
import Img from "./Img";

const POSTS = [
  {
    id: "how-i-built-my-portfolio",
    title: "How I built this portfolio: from idea to pixels",
    excerpt:
      "A short walkthrough of the design decisions, the tech stack, and the little animations that make this site feel alive.",
    publishedAt: "2025-08-01",
    tags: ["frontend", "design", "react"],
    cover:
      "https://images.unsplash.com/photo-1509228627157-1f6f65b1b3a1?auto=format&fit=crop&w=1200&q=60",
    content: `I started this portfolio as an experiment in motion, color and focused content. Over several nights I iterated on the navigation, the My Work gallery, and subtle animations to make the experience feel polished.\n\nWhy motion? Because micro-interactions guide the eye and communicate intent. I leaned on IntersectionObserver for reveals and used in-card carousels for project previews. The site is intentionally static for now — projects and posts are mock data that can be replaced by a backend later.`,
  },
  {
    id: "design-systems-101",
    title: "Design systems 101: building practical components",
    excerpt:
      "A compact guide to creating reusable components, naming tokens, and keeping styles predictable across pages.",
    publishedAt: "2025-07-10",
    tags: ["ux", "design-systems"],
    cover:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=60",
    content: `Design systems are about communication more than code. Start by documenting intent and constraints, then extract components from real pages. Tokens (colors, spacing, type) let you iterate without rewriting every component.\n\nIn this project I created a small set of tokens (accent, accent-soft, accent-glow) so the theme could be swapped quickly.`,
  },
  {
    id: "javascript-performance",
    title: "Practical JavaScript performance tips",
    excerpt:
      "Small wins that add up: minimizing reflows, debouncing, and smarter renders for faster perceived performance.",
    publishedAt: "2025-06-21",
    tags: ["javascript", "performance"],
    cover:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=60",
    content: `Perceived performance matters more than raw numbers. Batch DOM updates, avoid layout thrashing, and prefer transforms for animation. Use IntersectionObserver for lazy-loading images and only animate properties that trigger compositing (transform and opacity).`,
  },
  {
    id: "design-illustration-flow",
    title: "From sketch to vector: my illustration flow",
    excerpt:
      "How I move ideas from paper sketches into clean vector illustrations for brand and UI assets.",
    publishedAt: "2025-05-05",
    tags: ["graphic", "illustration"],
    cover:
      "https://images.unsplash.com/photo-1526318472351-c75fcf070cf1?auto=format&fit=crop&w=1200&q=60",
    content: `I usually begin with a 10-minute sketch, then refine shapes in Figma or Illustrator. Keep your vector shapes simple and use masks for complex cutouts. Save color palettes as variables so illustrations adapt to themes.`,
  },
  {
    id: "accessible-web-forms",
    title: "Accessible web forms: small changes, big impact",
    excerpt:
      "Labeling, validation feedback, and keyboard-first flows that make forms usable for everyone.",
    publishedAt: "2025-04-01",
    tags: ["accessibility", "forms"],
    cover:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=60",
    content: `Always pair inputs with labels, provide inline validation, and prefer semantic HTML. Testing with a keyboard and a screen reader will reveal many issues early.`,
  },
  {
    id: "the-case-for-sass",
    title: "The case for Sass in modern builds",
    excerpt:
      "Why I still reach for Sass for component local styles even when using utility frameworks.",
    publishedAt: "2025-03-12",
    tags: ["css", "sass"],
    cover:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=60",
    content: `Sass offers convenience for local component styles, nesting, and controlled variable maps. Use it where useful, and prefer utility classes for global consistency.`,
  },
];

export default function Blog() {
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");

  const posts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return POSTS;
    return POSTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.join(" ").toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    if (selected) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [selected]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setSelected(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="blog" className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">Thoughts & Notes</h2>
          <p className="mt-2 text-sm text-gray-300">
            Short essays on design, development and process. The posts below are
            mock data — they will be served from an API in a future update.
          </p>
        </header>

        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex-1">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts, tags..."
              className="w-full px-4 py-2 rounded bg-gray-900 text-sm border border-gray-800 focus:outline-none focus:ring-2 focus:ring-[--accent]"
            />
          </div>
          <div>
            <button
              onClick={() => setQuery("")}
              className="ml-2 btn-accent px-3 py-2 text-sm rounded"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <article
              key={p.id}
              className="group bg-gray-900 border border-gray-800 rounded overflow-hidden shadow-sm"
            >
              <div className="h-40 bg-gray-800 overflow-hidden">
                <Img
                  src={p.cover}
                  alt={p.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-400">
                  {formatTextWithNumbers(new Date(p.publishedAt).toDateString())}
                </div>
                <h3 className="mt-2 font-semibold text-lg">{p.title}</h3>
                <p className="mt-2 text-sm text-gray-300 line-clamp-3">
                  {p.excerpt}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex gap-2">
                    {p.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div>
                    <button
                      onClick={() => setSelected(p)}
                      className="text-sm btn-accent px-3 py-1 rounded"
                    >
                      Read
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {selected && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-6"
          >
            <div
              onClick={() => setSelected(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            <div className="relative max-w-3xl w-full bg-gray-900 rounded shadow-lg overflow-auto max-h-[90vh]">
              <div className="h-52 overflow-hidden rounded-t">
                <img
                  src={selected.cover}
                  alt="cover"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-xs text-gray-400">
                  {formatTextWithNumbers(new Date(selected.publishedAt).toDateString())}
                </div>
                <h3 className="text-2xl font-bold mt-2 mb-3">
                  {selected.title}
                </h3>
                <div className="prose prose-invert max-w-none text-sm">
                  {selected.content.split("\n\n").map((para, i) => (
                    <p key={i}>{formatTextWithNumbers(para)}</p>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex gap-2">
                    {selected.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div>
                    <button
                      onClick={() => setSelected(null)}
                      className="btn-accent px-4 py-2 rounded"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
