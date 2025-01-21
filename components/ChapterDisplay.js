import React from 'react';

export default function ChapterDisplay({ title, content, onGenerateNext, onNavigate, currentChapterIndex, totalChapters }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="prose max-w-none mb-6">
        {content}
      </div>
      <div className="flex justify-between items-center">
        <div className="space-x-4">
          <button
            onClick={() => onNavigate(currentChapterIndex - 1)}
            disabled={currentChapterIndex === 0}
            className="btn btn-secondary disabled:opacity-50"
          >
            Previous Chapter
          </button>
          <button
            onClick={() => onNavigate(currentChapterIndex + 1)}
            disabled={currentChapterIndex === totalChapters - 1}
            className="btn btn-secondary disabled:opacity-50"
          >
            Next Chapter
          </button>
        </div>
        <button
          onClick={onGenerateNext}
          className="btn btn-primary"
        >
          Generate Next Chapter
        </button>
      </div>
    </div>
  );
}


  