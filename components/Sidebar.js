import React, { useState } from 'react';

export default function Sidebar({ characters = [], genres = [], onSelect }) {
  const [selected, setSelected] = useState({ type: null, value: null });

  const handleSelect = (type, value) => {
    setSelected({ type, value });
    onSelect(type, value);
  };

  return (
    <div>
      <h3>Characters</h3>
      <ul>
        {characters.map((character, index) => (
          <li
            key={index}
            onClick={() => handleSelect('character', character)}
            style={{ fontWeight: selected.type === 'character' && selected.value === character ? 'bold' : 'normal' }}
          >
            {character}
          </li>
        ))}
      </ul>
      <h3>Genres</h3>
      <ul>
        {genres.map((genre, index) => (
          <li
            key={index}
            onClick={() => handleSelect('genre', genre)}
            style={{ fontWeight: selected.type === 'genre' && selected.value === genre ? 'bold' : 'normal' }}
          >
            {genre}
          </li>
        ))}
      </ul>
    </div>
  );
}

  