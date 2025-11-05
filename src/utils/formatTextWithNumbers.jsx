import React from 'react';

export const formatTextWithNumbers = (text, className = "font-helvetica") => {
  if (typeof text !== 'string') {
    return text;
  }
  const parts = text.split(/(\d+,\d+|\d+)/g);
  return parts.map((part, index) => {
    if (/(\d+,\d+|\d+)/.test(part)) {
      return <span key={index} className={className}>{part}</span>;
    } else {
      return part;
    }
  });
};
