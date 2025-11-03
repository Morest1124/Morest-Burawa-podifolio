import React, { useEffect, useState, useRef } from "react";

export default function BackgroundToggle({ onChange }) {
  const [mode, setMode] = useState("picture"); // 'picture' or 'black'
  const [video, setVideo] = useState(false);
  const [visible, setVisible] = useState(true); // show only when services section is in view
  const obsRef = useRef(null);
  const [showHint, setShowHint] = useState(false);

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
      window.dispatchEvent(
        new CustomEvent("bgChange", { detail: { mode, video } })
      );
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

  // show a one-time hint when user first switches to Black
  useEffect(() => {
    try {
      const shown = localStorage.getItem("bgHintShown");
      if (mode === "black" && !shown) {
        setShowHint(true);
        localStorage.setItem("bgHintShown", "true");
        const t = setTimeout(() => setShowHint(false), 3800);
        return () => clearTimeout(t);
      }
    } catch (e) {}
  }, [mode]);

  // Render always (so we can animate) but hide on very small screens and when not visible
  return (
    <div
      className={`hidden sm:inline-flex items-center gap-2 p-1 sm:p-2 bg-black/30 rounded-md text-gray-200 transition-all duration-300 ease-in-out transform ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-1 pointer-events-none"
      }`}
    >
      {/* Black button - slightly smaller */}
      <div className="relative group">
        <button
          onClick={() => {
            setMode("black");
            setVideo(false);
          }}
          aria-pressed={mode === "black"}
          title="Use black background"
          className={`px-2 py-1 sm:px-3 sm:py-1 rounded ${
            mode === "black" ? "bg-accent-soft text-black" : "bg-black/10"
          } text-xs sm:text-sm`}
        >
          Black
        </button>
        <span className="absolute -top-9 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Black background
        </span>
      </div>

      {/* Video icon - if black is active show an enable-video action that switches back to picture+video */}
      <div className="relative group">
        {mode === "black" ? (
          <button
            onClick={() => {
              // switch back to picture mode and enable video
              setMode("picture");
              setVideo(true);
            }}
            aria-label="Enable background video (switch to picture)"
            title="Enable background video (switch to picture)"
            className="p-1 sm:p-2 rounded bg-black/10 flex items-center justify-center"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-200"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path d="M23 7l-7 5v-3.5L23 7z" fill="currentColor" />
              <rect
                x="1"
                y="5"
                width="15"
                height="12"
                rx="2"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </button>
        ) : (
          <button
            onClick={() => setVideo((v) => !v)}
            aria-pressed={video}
            aria-label={
              video ? "Disable background video" : "Enable background video"
            }
            title={
              video ? "Disable background video" : "Enable background video"
            }
            className={`p-1 sm:p-2 rounded ${
              video ? "bg-accent-soft text-black" : "bg-black/10"
            } flex items-center justify-center`}
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path d="M23 7l-7 5v-3.5L23 7z" fill="currentColor" />
              <rect
                x="1"
                y="5"
                width="15"
                height="12"
                rx="2"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </button>
        )}

        <span className="absolute -top-9 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {mode === "black"
            ? "Enable video (switch to picture)"
            : video
            ? "Video on"
            : "Video off"}
        </span>
      </div>

      {/* transient hint bubble when first switching to black */}
      {showHint && (
        <div className="absolute mt-2 bg-accent text-black text-xs px-3 py-1 rounded shadow-lg">
          Tap the icon to return to picture + video
        </div>
      )}
    </div>
  );
}
