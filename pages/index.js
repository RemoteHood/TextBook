// pages/index.js
import { useState, useEffect } from 'react';
import FileUpload from '../components/FileUpload';
import Sidebar from '../components/Sidebar';
import ChapterDisplay from '../components/ChapterDisplay';

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [genres] = useState(['Fantasy', 'Adventure', 'Mystery', 'Romance', 'Sci-Fi']);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // Load chapters from localStorage on initial render
  useEffect(() => {
    const savedChapters = localStorage.getItem('chapters');
    if (savedChapters) {
      const parsedChapters = JSON.parse(savedChapters);
      setChapters(parsedChapters);
      if (parsedChapters.length > 0) {
        setCurrentChapter(parsedChapters[0]);
      }
    }
  }, []);

  // Save chapters to localStorage whenever they change
  useEffect(() => {
    if (chapters.length > 0) {
      localStorage.setItem('chapters', JSON.stringify(chapters));
    }
  }, [chapters]);

  const handleUpload = async (data) => {
    setCharacters(data.characters);
  };

  const handleSelect = (type, value) => {
    if (type === 'character') {
      setSelectedCharacters(prev => 
        prev.includes(value)
          ? prev.filter(char => char !== value)
          : [...prev, value]
      );
    } else if (type === 'genre') {
      setSelectedGenres(prev =>
        prev.includes(value)
          ? prev.filter(genre => genre !== value)
          : [...prev, value]
      );
    }
  };

  const generateChapter = async () => {
    if (selectedCharacters.length === 0 || selectedGenres.length === 0) {
      alert('Please select at least one character and one genre');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/generateChapter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          characters: selectedCharacters,
          genres: selectedGenres,
          previousContent: currentChapter?.content,
        }),
      });

      const newChapter = await response.json();
      
      // Update chapters state and localStorage
      const updatedChapters = [...chapters, newChapter];
      setChapters(updatedChapters);
      setCurrentChapter(newChapter);
      setCurrentChapterIndex(updatedChapters.length - 1);
      
    } catch (error) {
      console.error('Error generating chapter:', error);
      alert('Error generating chapter');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (index) => {
    if (index >= 0 && index < chapters.length) {
      setCurrentChapter(chapters[index]);
      setCurrentChapterIndex(index);
    }
  };

  const clearAllChapters = () => {
    if (window.confirm('Are you sure you want to clear all chapters?')) {
      localStorage.removeItem('chapters');
      setChapters([]);
      setCurrentChapter(null);
      setCurrentChapterIndex(0);
    }
  };

  return (
    <div className="container">
      <h1 className="header">Story Generator</h1>
      <div className="mb-8">
        <FileUpload onUpload={handleUpload} />
      </div>
      <div className="content">
        <div className="sidebar">
          <Sidebar
            characters={characters}
            genres={genres}
            selectedCharacters={selectedCharacters}
            selectedGenres={selectedGenres}
            onSelect={handleSelect}
          />
          {chapters.length > 0 && (
            <button
              onClick={clearAllChapters}
              className="mt-4 w-full btn btn-secondary"
            >
              Clear All Chapters
            </button>
          )}
        </div>
        <div className="chapter">
          {currentChapter ? (
            <ChapterDisplay
              title={currentChapter.title}
              content={currentChapter.content}
              onGenerateNext={generateChapter}
              onNavigate={handleNavigate}
              currentChapterIndex={currentChapterIndex}
              totalChapters={chapters.length}
            />
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="text-gray-600">
                Upload a PDF and select characters and genres to generate your first chapter
              </p>
              <button
                onClick={generateChapter}
                disabled={selectedCharacters.length === 0 || selectedGenres.length === 0 || loading}
                className="btn btn-primary mt-4"
              >
                {loading ? 'Generating...' : 'Generate First Chapter'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}




