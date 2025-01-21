import React from 'react';

export default function ChapterDisplay({ title, content, onGenerateNext }) {
  if (!title || !content) return <p>No chapter to display.</p>;

  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
      <button onClick={onGenerateNext}>Generate Next Chapter</button>
    </div>
  );
}


  