import React, { useEffect, useState } from "react";
import Img from "./Img";

export default function ProjectDetail() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjectDetails() {
      const hash = window.location.hash || "";
      if (!hash.startsWith("#project-")) {
        setLoading(false);
        setProject(null);
        return;
      }

      const idOrSlug = hash.replace("#project-", "");
      setLoading(true);
      setError(null);

      try {
        const apiUrl = `https://binaryblade24.pythonanywhere.com/api/projects/${idOrSlug}/`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Project not found or API error (status: ${response.status})`);
        }
        const data = await response.json();
        setProject(data);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch project details:", e);
        setProject(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProjectDetails();
    window.addEventListener("hashchange", fetchProjectDetails);
    return () => window.removeEventListener("hashchange", fetchProjectDetails);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Loading Project...</h2>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Project not found</h2>
          <p className="mt-2 text-sm text-gray-400">
            {error ? `Error: ${error}` : "Try selecting a project from My Work."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-black/40">
      <div className="max-w-5xl mx-auto bg-gray-900 border border-accent rounded-lg overflow-hidden">
        <div className="w-full h-64 sm:h-80 bg-black/20 relative">
          {project.images.map((src, i) => (
            <Img key={src} src={src} alt={`${project.title} ${i + 1}`} className="w-full h-full object-cover absolute inset-0" />
          ))}
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{project.title}</h1>
              <div className="mt-2 text-sm text-gray-400">
                {project.tech.join(" • ")} — {project.year}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {project.frontendLive && (
                <a href={project.frontendLive} target="_blank" rel="noreferrer" className="btn-accent px-4 py-2 rounded">
                  Front-end Live
                </a>
              )}
              {project.backendLive && (
                <a href={project.backendLive} target="_blank" rel="noreferrer" className="px-4 py-2 rounded bg-black/20">
                  Back-end Live
                </a>
              )}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold">Overview</h3>
              <p className="mt-2 text-sm text-gray-300">{project.desc}</p>

              <h4 className="mt-4 font-semibold">Case Study</h4>
              <div className="mt-2 prose prose-invert max-w-none text-sm">
                {project.caseStudy}
              </div>
            </div>

            <aside className="bg-black/10 p-4 rounded">
              <h4 className="font-semibold">Design Use Case</h4>
              <p className="mt-2 text-sm text-gray-300">{project.designUseCase}</p>

              <h4 className="mt-4 font-semibold">Tech</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded bg-gray-800">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6">
                <button
                  onClick={() => (window.location.hash = "#mywork")}
                  className="px-3 py-2 rounded btn-accent"
                >
                  Back to My Work
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
