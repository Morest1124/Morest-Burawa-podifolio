import React from 'react';

export const formatTextWithNumbers = (text, monospaceNumbers = false) => {
  if (typeof text !== 'string') {
    return text;
  }
  const parts = text.split(/(\d+)/g); // Split by numbers, keeping the numbers in the array
  const className = monospaceNumbers ? "font-monospace" : "font-numeric";
  return parts.map((part, index) => {
    if (/\d+/.test(part)) {
      return <span key={index} className={className}>{part}</span>;
    } else {
      return part;
    }
  });
};
