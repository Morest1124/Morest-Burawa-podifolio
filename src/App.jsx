import React, { useEffect } from "react";

import About from "./components/About";
import Services from "./components/Services";
import Contacts from "./components/Contacts";
import MyWork from "./components/MyWork";
import Blog from "./components/Blog";
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
      <main>
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
