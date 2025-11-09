import React, { useRef, useState, useEffect } from "react";
import Img from "./Img";

export default function Video({ src, poster, className = "", autoPlay = false, loop = true, muted = true, playsInline = true, onClick }) {
  const videoRef = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduce && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  if (error) {
    return <Img src={poster} alt="video fallback" className={className} />;
  }

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      className={className}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      onError={() => setError(true)}
      onClick={onClick}
    />
  );
}
