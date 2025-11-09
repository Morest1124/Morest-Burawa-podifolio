import React from "react";

export default function CodeBackground() {
  // simple SVG with monospace-looking code shapes, repeated via CSS
  const svgParts = [
    "<?xml version='1.0' encoding='UTF-8'?>",
    "<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'>",
    "<rect width='100%' height='100%' fill='transparent'/>",
    "<g font-family='monospace' font-size='14' fill='%23cfcfcf' opacity='0.7'>",
    "<text x='20' y='40'>const greet = (name) =&gt; `Hello ${name}`;</text>",
    "<text x='20' y='64'>async function fetchData(url) { /* fetch JSON */ }</text>",
    "<text x='20' y='88'>/* TODO: optimize rendering */</text>",
    "<text x='20' y='112'>for (let i = 0; i &lt; items.length; i++) {</text>",
    "<text x='20' y='136'>&nbsp;&nbsp;renderItem(items[i]);</text>",
    "<text x='20' y='160'>}</text>",
    "</g>",
    "</svg>",
  ];
  const svg = svgParts.join("");

  const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

  return (
    <div
      aria-hidden
      className="code-bg"
      style={{
        backgroundImage: `url("${dataUrl}")`,
      }}
    />
  );
}
