import React, { useEffect } from "react";

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
  const [bgMode, setBgMode] = React.useState("picture");
  const [bgVideo, setBgVideo] = React.useState(false);
  const [showAnnotation, setShowAnnotation] = React.useState(false);

  React.useEffect(() => {
    const hasSeenAnnotation = sessionStorage.getItem('hasSeenAnnotation');
    if (!hasSeenAnnotation) {
        setShowAnnotation(true);
    }
  }, []);

  const handleCloseAnnotation = () => {
      sessionStorage.setItem('hasSeenAnnotation', 'true');
      setShowAnnotation(false);
  };

  React.useEffect(() => {
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
      {/* Background controls (picture vs black and optional video) */}
      {/* BackgroundToggle is rendered inside the Navbar so we listen for bgChange events */}

      {/* Render background according to user settings */}
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
        {/* If the hash is pointing to a project detail, render the detail page above sections */}
        {typeof window !== "undefined" &&
          window.location.hash.startsWith("#project-") && (
            <section id="project-detail" className="min-h-screen">
              <ProjectDetail />
            </section>
          )}
        <section id="services">
          <Services />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="mywork">
          <MyWork />
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
