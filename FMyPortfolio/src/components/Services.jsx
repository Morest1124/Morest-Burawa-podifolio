import React from "react";

export default function Services() {
  return (
    <>
      <section className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-4xl w-full p-8 rounded-lg bg-transparent">
          <h1 className="text-3xl sm:text-4xl font-bold">
            What I do —{" "}
            <span className="highlight-blonde">
              Building Elegant and Powerful Applications that Transform Ideas
              into Reality.
            </span>
          </h1>

          <p className="mt-4">
            I am a dedicated Software Engineer specializing in full-stack
            application development. I enjoy crafting responsive web solutions
            using modern technologies like React, Tailwind CSS, Django REST
            framework and docker, while also applying DevOps practices,
            continuously aiming to deliver high-quality, comprehensive,
            user-centric software solutions.
          </p>

          <div className="mt-6">
            <a
              href="#mywork"
              className="inline-block px-4 py-2 rounded btn-accent"
            >
              See case studies
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
