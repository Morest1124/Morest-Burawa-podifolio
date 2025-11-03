import React, { useEffect, useState } from "react";

export default function Lightbox({ images = [], startIndex = 0, title = "", onClose }) {
  const [index, setIndex] = useState(startIndex);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose && onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  function prev() {
    setIndex((i) => (i - 1 + images.length) % images.length);
    setZoomed(false);
  }
  function next() {
    setIndex((i) => (i + 1) % images.length);
    setZoomed(false);
  }

  if (!images || !images.length) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title || "Image viewer"}
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 p-4"
      onClick={(e) => {
        // close when clicking backdrop
        if (e.target === e.currentTarget) onClose && onClose();
      }}
    >
      <button
        onClick={() => onClose && onClose()}
        aria-label="Close"
        className="absolute right-4 top-4 text-white bg-black/40 rounded-full p-2"
      >
        ✕
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        aria-label="Previous"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/40 rounded-full p-2"
      >
        ‹
      </button>

      <div className="max-w-[95%] max-h-[85%] flex items-center justify-center">
        <img
          src={images[index]}
          alt={`${title} ${index + 1}`}
          className={`max-w-full max-h-full object-contain transition-transform duration-200 ${zoomed ? 'scale-125' : 'scale-100'}`}
          onClick={(e) => {
            e.stopPropagation();
            setZoomed((z) => !z);
          }}
        />
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        aria-label="Next"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/40 rounded-full p-2"
      >
        ›
      </button>

      <div className="absolute bottom-6 text-xs text-white/90 text-center w-full px-4">
        <div>{title}</div>
        <div className="mt-1">{index + 1} / {images.length} — click image to zoom</div>
      </div>
    </div>
  );
}
