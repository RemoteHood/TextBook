import React from 'react';

export default function Sidebar({ characters, genres, onSelect }) {
  return (
    <div className="w-64 bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-2">Characters</h2>
      <ul className="mb-4">
        {characters.map((char, index) => (
          <li key={index} className="cursor-pointer hover:text-blue-500" onClick={() => onSelect('character', char)}>
            {char}
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mb-2">Genres</h2>
      <ul>
        {genres.map((genre, index) => (
          <li key={index} className="cursor-pointer hover:text-blue-500" onClick={() => onSelect('genre', genre)}>
            {genre}
          </li>
        ))}
      </ul>
    </div>
  );
}



  