import React, { useEffect, useState, useRef } from "react";

const NAV_ITEMS = [
  {
    id: "services",
    label: "Services",
  },
  {
    id: "about",
    label: "About",
  },
  {
    id: "mywork",
    label: "My Work",
  },
  {
    id: "contacts",
    label: "Contacts",
  },
  {
    id: "blog",
    label: "Blog",
  },
];
export default function Navbar() {
  const [active, setActive] = useState("services");
  const [backgroundState, setBackgroundState] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);




  useEffect(() => {
    try {
      localStorage.setItem("backgroundState", String(backgroundState));
    } catch (e) {}

    let mode = "picture";
    let video = true;

    if (backgroundState === 1) {
      mode = "black";
      video = false;
    }

    try {
      window.dispatchEvent(
        new CustomEvent("bgChange", { detail: { mode, video } })
      );
    } catch (e) {}
  }, [backgroundState]);

  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(
      Boolean
    );
    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      {
        root: null,
        rootMargin: "-20% 0px -40% 0px",
        threshold: [0.2, 0.5, 0.75],
      }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);







  const handleLogoClick = (e) => {
    e.preventDefault();
    setBackgroundState((s) => (s + 1) % 2);
  };

  const handleLinkClick = (e, id) => {
    e && e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className="nav fixed top-3 left-3 z-50 flex items-center justify-between gap-4 px-4 py-3 rounded-xl bg-black/60 border-accent backdrop-blur-md shadow-lg"

    >
      <a
        href="#services"
        onClick={handleLogoClick}
        className="logo text-lg sm:text-xl font-bold tracking-wider cursor-pointer"
      >
        Morest Burawa

      </a>

      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </button>
      </div>

      <ul
        className={`nav-items md:flex items-center gap-3 m-0 p-0 list-none ${
          isMenuOpen ? "flex flex-col absolute top-16 left-0 right-0 bg-black/80 rounded-md shadow-lg" : "hidden"
        }}`}
      >
        {NAV_ITEMS.map((item) => (
          <li key={item.id} className="w-full text-center">
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                handleLinkClick(e, item.id);
                setIsMenuOpen(false);
              }}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-md font-semibold transition-colors duration-150 transform hover:-translate-y-0.5 ${active === item.id ? 'active' : ''}`}
            >
              <span className="label text-sm">
                {item.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}