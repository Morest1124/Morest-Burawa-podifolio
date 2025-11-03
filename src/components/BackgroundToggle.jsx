import React, { useEffect, useState, useRef } from "react";

export default function BackgroundToggle({ onChange }) {
  const [mode, setMode] = useState("picture"); // 'picture' or 'black'
  const [video, setVideo] = useState(false);
  const [visible, setVisible] = useState(true); // show only when services section is in view
  const obsRef = useRef(null);

  useEffect(() => {
    try {
      const m = localStorage.getItem("bgMode");
      const v = localStorage.getItem("bgVideo");
      if (m) setMode(m);
      if (v) setVideo(v === "true");
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("bgMode", mode);
      localStorage.setItem("bgVideo", String(video));
    } catch (e) {}
    // dispatch a global event so other components (App) can respond
    try {
      window.dispatchEvent(new CustomEvent("bgChange", { detail: { mode, video } }));
    } catch (e) {}
    if (onChange) onChange({ mode, video });
  }, [mode, video]);

  // show/hide toggle depending on whether the 'services' section is visible
  useEffect(() => {
    const target = document.getElementById("services");
    if (!target) {
      // if no services section exists yet, keep visible
      setVisible(true);
      return;
    }
    obsRef.current = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        setVisible(Boolean(e && e.isIntersecting));
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

  if (!visible) return null;

  return (
    <div className="inline-flex items-center gap-2 p-1 sm:p-2 bg-black/30 rounded-md text-gray-200">
      {/* Black button - slightly smaller */}
      <div className="relative group">
        <button
          onClick={() => {
            setMode("black");
            setVideo(false);
          }}
          aria-pressed={mode === "black"}
          title="Use black background"
          className={`px-2 py-1 sm:px-3 sm:py-1 rounded ${mode === "black" ? "bg-accent-soft text-black" : "bg-black/10"} text-xs sm:text-sm`}
        >
          Black
        </button>
        <span className="absolute -top-9 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Black background
        </span>
      </div>

      {/* Video icon - hide when black is active */}
      {mode !== "black" && (
        <div className="relative group">
          <button
            onClick={() => setVideo((v) => !v)}
            aria-pressed={video}
            aria-label={video ? "Disable background video" : "Enable background video"}
            title={video ? "Disable background video" : "Enable background video"}
            className={`p-1 sm:p-2 rounded ${video ? "bg-accent-soft text-black" : "bg-black/10"} flex items-center justify-center`}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M23 7l-7 5v-3.5L23 7z" fill="currentColor" />
              <rect x="1" y="5" width="15" height="12" rx="2" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
          </button>
          <span className="absolute -top-9 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {video ? "Video on" : "Video off"}
          </span>
        </div>
      )}
    </div>
  );
}
