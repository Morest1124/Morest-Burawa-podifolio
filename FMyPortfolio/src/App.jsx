import React, { useEffect, useState } from "react";

import About from "./components/About";
import Services from "./components/Services";
import Contacts from "./components/Contacts";
import MyWork from "./components/MyWork";
import Blog from "./components/Blog";
import ProjectDetail from "./components/ProjectDetail";
import CodeBackground from "./components/CodeBackground";
import BackgroundVideo from "./components/BackgroundVideo";
import Poster from "./components/Poster";
import Navbar from "./components/Navbar";
import back from "./assets/back.jpg";
import codeVideo from "./assets/code.mp4";

function App() {
  const [bgMode, setBgMode] = useState("picture");
  const [bgVideo, setBgVideo] = useState(false);
  const [showAnnotation, setShowAnnotation] = useState(false);

  // State for projects, lifted up
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects once in the main App component
  useEffect(() => {
    async function fetchProjects() {
      try {
        const apiUrl = "https://BinaryBlade24.pythonanywhere.com/api/projects/";
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch projects:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  useEffect(() => {
    const hasSeenAnnotation = sessionStorage.getItem('hasSeenAnnotation');
    if (!hasSeenAnnotation) {
        setShowAnnotation(true);
    }
  }, []);

  const handleCloseAnnotation = () => {
      sessionStorage.setItem('hasSeenAnnotation', 'true');
      setShowAnnotation(false);
  };

  useEffect(() => {
    try {
      const m = localStorage.getItem("bgMode");
      const v = localStorage.getItem("bgVideo");
      if (m) setBgMode(m);
      if (v) setBgVideo(v === "true");
    } catch (e) {}

    function onBgChange(e) {
      const { mode, video } = e.detail || {};
      if (mode) setBgMode(mode);
      if (typeof video === "boolean") setBgVideo(video);
    }
    window.addEventListener("bgChange", onBgChange);
    return () => window.removeEventListener("bgChange", onBgChange);
  }, []);

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

  // Ensure any leftover body overflow lock is cleared on mount (fixes stuck no-scroll state)
  useEffect(() => {
    document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  return (
    <>
      {showAnnotation && (
        <div className="annotation annotation-animation">
            <p>Click the logo to change the background.</p>
            <button onClick={handleCloseAnnotation} style={{position: 'absolute', top: '-5px', right: '1px', background: 'none', border: 'none', color: 'white', fontSize: '16px', cursor: 'pointer'}}>&times;</button>
        </div>
      )}
      <Navbar />
      <CodeBackground />
      {bgMode === "picture" && (
        <>
          {bgVideo ? (
            <BackgroundVideo
              src={codeVideo}
              fallbackSrc="code.mp4"
              poster="back"
              tint="rgba(0,0,0,0.48)"
            />
          ) : (
            <Poster
              src={back}
              className="fixed inset-0 -z-10"
              tint="rgba(0, 50, 150, 0.3)"
            />
          )}
        </>
      )}

      {bgMode === "black" && (
        <div className="bg-black-layer fixed inset-0 -z-10 bg-black" />
      )}
      <main className="font-grotesk">
        {typeof window !== "undefined" &&
          window.location.hash.startsWith("#project-") && (
            <section id="project-detail" className="min-h-screen">
              <ProjectDetail projects={projects} />
            </section>
          )}
        <section id="services">
          <Services />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="mywork">
          <MyWork allProjects={projects} loading={loading} error={error} />
        </section>
        <section id="contacts">
          <Contacts />
        </section>
        <section id="blog">
          <Blog />
        </section>
      </main>
    </>
  );
}

export default App;
