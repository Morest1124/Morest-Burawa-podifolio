import React, { useState } from "react";

// Simple image component that falls back to an inline SVG if the remote image fails to load.
export default function Img({ src, alt = "image", className = "", style = {}, ...rest }) {
  const [failed, setFailed] = useState(false);

  const fallback = `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'>
      <rect width='100%' height='100%' fill='#0b0b0b' />
      <g fill='%23FFD66B' font-family='Arial, Helvetica, sans-serif' font-weight='700'>
        <text x='50%' y='45%' font-size='32' text-anchor='middle'>Image unavailable</text>
        <text x='50%' y='55%' font-size='20' text-anchor='middle' fill='%23CCCCCC'>Unable to load remote image</text>
      </g>
    </svg>
  `)}`;

  return (
    <img
      src={failed ? fallback : src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}
