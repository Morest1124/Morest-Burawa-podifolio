import React, { useEffect, useRef, useState } from "react";

export default function BackgroundVideo({ src, poster, tint = "rgba(0,0,0,0.35)", label = "Behind the scenes" }) {
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const prefersReduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduce) {
      setPlaying(false);
      if (videoRef.current) videoRef.current.pause();
    }
  }, []);

  function toggle() {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play().catch((err) => {
        console.warn("BackgroundVideo: play() failed", err);
        setError(true);
      });
      setPlaying(true);
    }
  }

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover absolute inset-0"
        autoPlay
        muted
        loop
        playsInline
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={(e) => {
          console.error("BackgroundVideo error", e);
          setError(true);
        }}
      />
      <div style={{ background: tint }} className="absolute inset-0" />

      {/* Control button (enable pointer events) */}
      <div className="pointer-events-auto fixed right-4 bottom-6 z-50">
        <button
          onClick={toggle}
          className="px-3 py-2 rounded bg-black/50 text-sm"
          aria-pressed={!playing}
        >
          {/* {error ? "Background video unavailable" : (playing ? "Pause background video" : "Play background video")} */}
        </button>
      </div>
    </div>
  );
}
