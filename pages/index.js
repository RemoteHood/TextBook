// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile?.type === 'application/pdf') {
      setFile(selectedFile);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">PDF Quiz Generator</h1>

      {/* Drag & Drop Box */}
      <label className="w-full max-w-md h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-white cursor-pointer hover:border-blue-400 transition-colors">
        <input
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFileChange}
        />
        
        <svg
          className="w-8 h-8 text-gray-400 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
        
        <p className="text-gray-500">
          {file ? file.name : 'Drop PDF here or click to browse'}
        </p>
      </label>

      {/* Upload Button */}
      {file && (
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => console.log('File ready:', file)}
        >
          Upload PDF
        </button>
      )}
    </div>
  );
}

