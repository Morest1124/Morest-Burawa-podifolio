import { formatTextWithNumbers } from "../utils/formatTextWithNumbers";
import React, { useEffect, useMemo, useState } from "react";
import Img from "./Img";

export default function Blog() {
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  
  // State for API data
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    async function fetchPosts() {
      try {
        const apiUrl = `https://binaryblade24.pythonanywhere.com/api/blog-posts/`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllPosts(data);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch blog posts:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const posts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allPosts;
    return allPosts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.meta_description.toLowerCase().includes(q) ||
        p.tags.toLowerCase().includes(q)
    );
  }, [query, allPosts]);

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
          <p className="mt-2 text-sm text-gray-300 text-center">
            Short essays on design, development and process.
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

        {loading && <div className="text-center py-10">Loading posts...</div>}
        {error && <div className="text-center py-10 text-red-500">Error fetching posts: {error}</div>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <article
                key={p.id}
                className="group bg-gray-900 border border-gray-800 rounded overflow-hidden shadow-sm"
              >
                <div className="h-40 bg-gray-800 overflow-hidden">
                  <Img
                    src={p.image_url}
                    alt={p.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <div className="text-xs text-gray-400">
                    {formatTextWithNumbers(new Date(p.published_date).toDateString())}
                  </div>
                  <h3 className="mt-2 font-semibold text-lg text-center">{p.title}</h3>
                  <p className="mt-2 text-sm text-gray-300 line-clamp-3 text-center">
                    {p.meta_description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex gap-2">
                      {p.tags.split(',').slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300"
                        >
                          {t.trim()}
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
        )}

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
                  src={selected.image_url}
                  alt="cover"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-xs text-gray-400">
                  {formatTextWithNumbers(new Date(selected.published_date).toDateString())}
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
                    {selected.tags.split(',').map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300"
                      >
                        {t.trim()}
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
