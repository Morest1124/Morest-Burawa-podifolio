import React, { useEffect, useState, useRef } from "react";

const NAV_ITEMS = [
  {
    id: "services",
    label: "Services",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.4 15a1 1 0 0 0 .2 1.1l.8.8a1 1 0 0 1 0 1.4l-1 1a1 1 0 0 1-1.4 0l-.8-.8a1 1 0 0 0-1.1-.2 7 7 0 0 1-2.2.4 7 7 0 0 1-2.2-.4 1 1 0 0 0-1.1.2l-.8.8a1 1 0 0 1-1.4 0l-1-1a1 1 0 0 1 0-1.4l.8-.8a1 1 0 0 0 .2-1.1 7 7 0 0 1-.4-2.2 7 7 0 0 1 .4-2.2 1 1 0 0 0-.2-1.1l-.8-.8a1 1 0 0 1 0-1.4l1-1a1 1 0 0 1 1.4 0l.8.8a1 1 0 0 0 1.1.2c.7-.3 1.4-.5 2.2-.5s1.5.2 2.2.5a1 1 0 0 0 1.1-.2l.8-.8a1 1 0 0 1 1.4 0l1 1a1 1 0 0 1 0 1.4l-.8.8a1 1 0 0 0-.2 1.1c.3.7.5 1.4.5 2.2s-.2 1.5-.5 2.2z"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "about",
    label: "About",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M12 8v.01M11 12h1v4h1"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "mywork",
    label: "My Work",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect
          x="3"
          y="7"
          width="18"
          height="13"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M7 4h10v3H7z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "contacts",
    label: "Contacts",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M22 6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12l4-2 4 2 4-2 4 2V6z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "blog",
    label: "Blog",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M21 15V6a2 2 0 0 0-2-2H7l-4 4v9a2 2 0 0 0 2 2h12"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 7v6"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Navbar() {
  const [active, setActive] = useState("services");
  const navRef = React.useRef(null);
  const flashTimer = React.useRef(null);
  const [backgroundState, setBackgroundState] = useState(0);
  const [servicesVisible, setServicesVisible] = useState(true);
  const obsRef = useRef(null);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    try {
      const state = localStorage.getItem("backgroundState");
      if (state) {
        setBackgroundState(Number(state));
      }
      const hintShown = localStorage.getItem("logoHintShown");
      if (!hintShown) {
        setShowHint(true);
        localStorage.setItem("logoHintShown", "true");
        const t = setTimeout(() => setShowHint(false), 3800);
        return () => clearTimeout(t);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("backgroundState", String(backgroundState));
    } catch (e) {}

    let mode = 'picture';
    let video = true;

    if (backgroundState === 1) {
      mode = 'black';
      video = false;
    } else if (backgroundState === 2) {
      mode = 'picture';
      video = false;
    }

    try {
      window.dispatchEvent(
        new CustomEvent("bgChange", { detail: { mode, video } })
      );
    } catch (e) {}
  }, [backgroundState]);

  useEffect(() => {
    const target = document.getElementById("services");
    if (!target) {
      setServicesVisible(true);
      return;
    }
    obsRef.current = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        setServicesVisible(Boolean(e && e.isIntersecting));
      },
      { root: null, threshold: 0.45 }
    );
    obsRef.current.observe(target);
    return () => {
      try {
        obsRef.current && obsRef.current.disconnect();
      } catch (e) {}
    };
  }, []);

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

  useEffect(() => {
    if (!navRef.current) return;
    navRef.current.classList.add("flash");
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => {
      navRef.current && navRef.current.classList.remove("flash");
    }, 520);
    return () => {
      if (flashTimer.current) clearTimeout(flashTimer.current);
    };
  }, [active]);

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (!servicesVisible) {
      document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
    } else {
      setBackgroundState((s) => (s + 1) % 3);
    }
  };

  const handleLinkClick = (e, id) => {
    e && e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav
      ref={navRef}
      className="nav fixed top-3 left-3 right-3 z-50 flex items-center justify-between gap-4 px-4 py-3 rounded-xl bg-black/60 border-accent backdrop-blur-md shadow-lg"
      aria-label="Primary navigation"
    >
      <a
        href="#services"
        onClick={handleLogoClick}
        className="logo text-lg sm:text-xl font-bold tracking-wider cursor-pointer"
        aria-label="Morest Burawa - go to services or change background"
      >
        Morest Burawa
        {showHint && (
          <div className="absolute mt-2 bg-accent text-black text-xs px-3 py-1 rounded shadow-lg">
            Click my name to change the background
          </div>
        )}
      </a>

      <ul className="flex items-center gap-3 m-0 p-0 list-none" role="menubar">
        {NAV_ITEMS.map((item) => (
          <li key={item.id} role="none">
            <a
              href={`#${item.id}`}
              role="menuitem"
              aria-current={active === item.id ? "page" : undefined}
              onClick={(e) => handleLinkClick(e, item.id)}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-md font-semibold transition-colors duration-150 transform ${
                active === item.id
                  ? "bg-accent-soft shadow-accent"
                  : "hover:-translate-y-0.5"
              }`}
            >
              <span className="icon" aria-hidden>
                {item.icon}
              </span>
              <span className="label hidden sm:inline-block text-sm">
                {item.label}
              </span>
              <span
                className={`pulse ${active === item.id ? "block" : "hidden"}`}
                aria-hidden
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}