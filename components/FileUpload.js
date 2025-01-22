import { useState } from 'react';

export default function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = (file) => {
    if (file?.type === 'application/pdf') {
      setFile(file);
      setError('');
      handleUpload(file);
    } else {
      setError('Please select a valid PDF file');
      setFile(null);
    }
  };

  const handleUpload = async (file) => {
    setLoading(true);
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      onUpload();
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative group">
      <label 
        htmlFor="pdf-upload"
        className={`flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg transition-all
          ${error ? 'border-red-200 bg-red-50' : 'border-gray-200 hover:border-blue-400 bg-white'}
          ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <div className="text-center p-6">
          <svg
            className={`w-10 h-10 mx-auto mb-4 ${
              error ? 'text-red-400' : 'text-gray-400'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            ></path>
          </svg>
          
          <p className={`text-lg ${
            error ? 'text-red-500' : 'text-gray-600'
          } mb-2`}>
            {error || (file ? file.name : 'Drop your PDF here or click to browse')}
          </p>
          
          {!file && !error && (
            <p className="text-sm text-gray-500">
              Supported format: .pdf
            </p>
          )}
        </div>
      </label>

      <input
        id="pdf-upload"
        type="file"
        accept=".pdf"
        disabled={loading}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-lg">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Generate Quiz Button */}
      {file && !loading && !error && (
        <button
          onClick={handleUpload}
          className="w-full mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Generate Quiz
        </button>
      )}
    </div>
  );
}
