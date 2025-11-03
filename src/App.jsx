import React, { useEffect } from "react";

import About from "./components/About";
import Services from "./components/Services";
import Contacts from "./components/Contacts";
import MyWork from "./components/MyWork";
import Blog from "./components/Blog";
import ProjectDetail from "./components/ProjectDetail";
import CodeBackground from "./components/CodeBackground";
import BackgroundVideo from "./components/BackgroundVideo";
import Navbar from "./components/Navbar";

function App() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll("main section").forEach((s) => {
      s.classList.add("reveal");
      obs.observe(s);
    });
    return () => obs.disconnect();
  }, []);
  return (
    <>
      <Navbar />
      <CodeBackground />
      {/* Background video (autoplays muted). Uses a public sample; replace with your own webm for best perf */}
      <BackgroundVideo
        // src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        poster="https://picsum.photos/seed/hero/1200/800"
        tint="rgba(0,0,0,0.48)"
      />
      <main>
        {/* If the hash is pointing to a project detail, render the detail page above sections */}
        {typeof window !== "undefined" &&
          window.location.hash.startsWith("#project-") && (
            <section id="project-detail" className="min-h-screen">
              <ProjectDetail />
            </section>
          )}
        <section id="services" className="min-h-screen">
          <Services />
        </section>
        <section id="about" className="min-h-screen">
          <About />
        </section>
        <section id="mywork" className="min-h-screen">
          <MyWork />
        </section>
        <section id="contacts" className="min-h-screen">
          <Contacts />
        </section>
        <section id="blog" className="min-h-screen">
          <Blog />
        </section>
      </main>
    </>
  );
}

export default App;
