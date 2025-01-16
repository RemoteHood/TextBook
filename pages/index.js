import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import CharacterSelection from '../components/CharacterSelection';
import GenreSelection from '../components/GenreSelection';

export default function Home() {
  const [pdfProcessed, setPdfProcessed] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [chapter, setChapter] = useState('');

  const handlePdfUpload = (data) => {
    setPdfProcessed(true);
    setCharacters(data.characters);
  };

  const generateChapter = async () => {
    const response = await fetch('/api/generate-chapter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ characters: selectedCharacters, genres: selectedGenres }),
    });

    if (response.ok) {
      const data = await response.json();
      setChapter(data.chapter);
    }
  };

  return (
    <div>
      <h1>Chapter Writer</h1>
      <FileUpload onUpload={handlePdfUpload} />
      {pdfProcessed && (
        <>
          <CharacterSelection
            characters={characters}
            selectedCharacters={selectedCharacters}
            setSelectedCharacters={setSelectedCharacters}
          />
          <GenreSelection
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
          />
          <button onClick={generateChapter}>Generate Chapter</button>
        </>
      )}
      {chapter && <div>{chapter}</div>}
    </div>
  );
}