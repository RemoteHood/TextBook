// components/GenreSelection.js
import React from 'react';

const genres = ["Romance", "Mystery", "Thriller", "Crime", "Fantasy", "Science Fiction", "Historical Fiction", "Horror", "Paranormal", "Dystopian", "Adventure", "Humor", "same"];

export default function GenreSelection({ selectedGenres, setSelectedGenres }) {
  const handleGenreChange = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  return (
    <div>
      <h2>Select Genres</h2>
      {genres.map((genre, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id={`genre-${index}`}
            checked={selectedGenres.includes(genre)}
            onChange={() => handleGenreChange(genre)}
          />
          <label htmlFor={`genre-${index}`}>{genre}</label>
        </div>
      ))}
    </div>
  );
}