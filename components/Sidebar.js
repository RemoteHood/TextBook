import React from 'react';

export default function Sidebar({ characters = [], genres = [], selectedCharacters = [], selectedGenres = [], onSelect }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-64">
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-4">Characters</h3>
        <div className="space-y-2">
          {characters.map((char, index) => (
            <div
              key={index}
              onClick={() => onSelect('character', char)}
              className={`p-2 rounded cursor-pointer transition-colors ${
                selectedCharacters.includes(char)
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {char}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-bold text-lg mb-4">Genres</h3>
        <div className="space-y-2">
          {genres.map((genre, index) => (
            <div
              key={index}
              onClick={() => onSelect('genre', genre)}
              className={`p-2 rounded cursor-pointer transition-colors ${
                selectedGenres.includes(genre)
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {genre}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



  