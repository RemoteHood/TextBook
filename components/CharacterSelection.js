// components/CharacterSelection.js
import React from 'react';

export default function CharacterSelection({ characters, selectedCharacters, setSelectedCharacters }) {
  const handleCharacterChange = (character) => {
    if (selectedCharacters.includes(character)) {
      setSelectedCharacters(selectedCharacters.filter(c => c !== character));
    } else {
      setSelectedCharacters([...selectedCharacters, character]);
    }
  };

  return (
    <div>
      <h2>Select Characters</h2>
      {characters.map((character, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id={`character-${index}`}
            checked={selectedCharacters.includes(character)}
            onChange={() => handleCharacterChange(character)}
          />
          <label htmlFor={`character-${index}`}>{character}</label>
        </div>
      ))}
    </div>
  );
}