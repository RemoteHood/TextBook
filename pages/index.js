import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import Sidebar from '../components/Sidebar';
import ChapterDisplay from '../components/ChapterDisplay';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [genres, setGenres] = useState(['Fantasy', 'Adventure', 'Mystery']);
  const [chapter, setChapter] = useState(null);

  const handleUpload = (data) => {
    setCharacters(data.characters);
  };

  const handleSelect = (type, value) => {
    if (type === 'character') {
      setCharacters((prev) => [...prev, value]);
    } else if (type === 'genre') {
      setGenres((prev) => [...prev, value]);
    }
  };

  const handleGenerateChapter = async () => {
    const response = await fetch('/api/generateChapter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ characters, genres }),
    });

    const data = await response.json();
    setChapter(data);
  };

  return (
    <div className={styles.container}>
      <h1>PDF Story Generator</h1>
      <FileUpload onUpload={handleUpload} />
      <div className={styles.content}>
        <Sidebar characters={characters} genres={genres} onSelect={handleSelect} />
        <div className={styles.main}>
          <button onClick={handleGenerateChapter}>Generate Chapter</button>
          {chapter && <ChapterDisplay title={chapter.title} content={chapter.content} />}
        </div>
      </div>
    </div>
  );
}

