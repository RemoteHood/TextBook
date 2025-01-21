import React from 'react';

export default function ChapterDisplay({ title, content, onGenerateNext }) {
  if (!title || !content) return <p>No chapter to display.</p>;

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="mb-4">{content}</p>
      <button onClick={onGenerateNext} className="bg-green-500 text-white px-4 py-2 rounded">
        Generate Next Chapter
      </button>
    </div>
  );
}



  