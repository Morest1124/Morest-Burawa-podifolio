import React, { useState } from "react";

export default function Poster({ src, alt = "poster", className = "", style = {} }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`poster-wrapper ${className}`} style={{ position: "absolute", inset: 0, ...style }}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover absolute inset-0 transition-all duration-700 ${loaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-lg scale-105"}`}
        onLoad={() => setLoaded(true)}
      />
      {/* low-contrast blurred background using same image as LQIP until loaded */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${loaded ? "opacity-0" : "opacity-100"}`}
        style={{ backgroundImage: `url(${src})`, filter: "blur(12px) brightness(0.6)" }}
      />
    </div>
  );
}
