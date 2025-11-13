import React, { useEffect, useState } from "react";
import Img from "./Img";

export default function ProjectDetail({ projects = [] }) {
  const [project, setProject] = useState(null);

  useEffect(() => {
    function resolveFromHash() {
      if (projects.length === 0) {
        return;
      }
      const h = window.location.hash || "";
      if (h.startsWith("#project-")) {
        const idOrSlug = h.replace("#project-", "");
        const p = projects.find(
          (proj) => String(proj.id) === idOrSlug || proj.slug === idOrSlug
        );
        setProject(p);
      } else {
        setProject(null);
      }
    }

    resolveFromHash();
    window.addEventListener("hashchange", resolveFromHash);
    return () => window.removeEventListener("hashchange", resolveFromHash);
  }, [projects]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Project not found</h2>
          <p className="mt-2 text-sm text-gray-400">
            The project list may still be loading or the link is incorrect.
          </p>
          <a href="#mywork" className="mt-4 inline-block btn-accent px-4 py-2 rounded">
            Back to My Work
          </a>
        </div>
      </div>
    );
  }

  const projectImages = project.images || (project.image_url ? [project.image_url] : []);

  return (
    <div className="min-h-screen p-6 bg-black/40">
      <div className="max-w-5xl mx-auto bg-gray-900 border border-accent rounded-lg overflow-hidden">
        <div className="w-full h-64 sm:h-80 bg-black/20 relative">
          {projectImages.length > 0 ? (
            projectImages.map((src, i) => (
              <Img key={src || i} src={src} alt={`${project.title} ${i + 1}`} className="w-full h-full object-cover absolute inset-0" />
            ))
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <p>No image available</p>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{project.title}</h1>
              <div className="mt-2 text-sm text-gray-400">
                {(project.technologies?.map(t => t.name) || []).join(" • ")}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {project.live_link && (
                <a href={project.live_link} target="_blank" rel="noreferrer" className="btn-accent px-4 py-2 rounded">
                  Live Demo
                </a>
              )}
              {project.repo_link && (
                <a href={project.repo_link} target="_blank" rel="noreferrer" className="px-4 py-2 rounded bg-black/20">
                  View Code
                </a>
              )}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold">Overview</h3>
              <p className="mt-2 text-sm text-gray-300">{project.description}</p>

              {project.problem_solved && (
                <>
                  <h4 className="mt-4 font-semibold">Problem Solved</h4>
                  <p className="mt-2 text-sm text-gray-300">{project.problem_solved}</p>
                </>
              )}
            </div>

            <aside className="bg-black/10 p-4 rounded">
              <h4 className="font-semibold">My Role</h4>
              <p className="mt-2 text-sm text-gray-300">{project.my_role}</p>

              <h4 className="mt-4 font-semibold">Technologies</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {(project.technologies?.map(t => t.name) || []).map((name) => (
                  <span key={name} className="text-xs px-2 py-1 rounded bg-gray-800">
                    {name}
                  </span>
                ))}
              </div>

              <div className="mt-6">
                <a href="#mywork" className="px-3 py-2 rounded btn-accent">
                  Back to My Work
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
