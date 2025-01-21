import { useState, useEffect } from 'react';
import FileUpload from '../components/FileUpload';
import Sidebar from '../components/Sidebar';
import ChapterDisplay from '../components/ChapterDisplay';

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [genres, setGenres] = useState(['Fantasy', 'Adventure', 'Mystery']);
  const [chapter, setChapter] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChapters = async () => {
      const response = await fetch('/api/loadChapters');
      const data = await response.json();
      setChapters(data);
    };

    fetchChapters();
  }, []);

  const handleUpload = (data) => {
    setCharacters(data.characters);
  };

  const handleSelect = (type, value) => {
    if (type === 'character' && !characters.includes(value)) {
      setCharacters((prev) => [...prev, value]);
    } else if (type === 'genre' && !genres.includes(value)) {
      setGenres((prev) => [...prev, value]);
    }
  };

  const handleGenerateChapter = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generateChapter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ characters, genres }),
      });

      const data = await response.json();
      setChapter(data);
      setChapters((prev) => [...prev, data]);
      setCurrentChapterIndex(chapters.length);

      await fetch('/api/saveChapter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Error generating chapter:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateNextChapter = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generateChapter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ characters, genres, previousContent: chapter.content }),
      });

      const data = await response.json();
      setChapter(data);
      setChapters((prev) => [...prev, data]);
      setCurrentChapterIndex(chapters.length + 1);

      await fetch('/api/saveChapter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Error generating next chapter:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (index) => {
    setCurrentChapterIndex(index);
    setChapter(chapters[index]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">PDF Story Generator</h1>
      <FileUpload onUpload={handleUpload} />
      <div className="flex">
        <Sidebar characters={characters} genres={genres} onSelect={handleSelect} />
        <div className="flex-1 ml-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            onClick={handleGenerateChapter}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Chapter'}
          </button>
          {chapter && (
            <ChapterDisplay
              title={chapter.title}
              content={chapter.content}
              onGenerateNext={handleGenerateNextChapter}
            />
          )}
          <div className="mt-4">
            {chapters.map((chapter, index) => (
              <button
                key={index}
                onClick={() => handleNavigate(index)}
                className="mr-2 mb-2 bg-gray-200 px-2 py-1 rounded"
              >
                Chapter {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}




