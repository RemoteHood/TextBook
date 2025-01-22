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
      await new Promise(resolve => setTimeout(resolve, 1000));
      onUpload();
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Drag & Drop Area */}
      <label
        className={`
          flex flex-col items-center justify-center 
          h-48 border-2 border-dashed rounded-lg
          ${error ? 'border-red-200 bg-red-50' : 'border-gray-300 bg-white'}
          ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          transition-all
        `}
      >
        <div className="text-center p-4">
          <svg
            className={`w-8 h-8 mx-auto mb-3 ${error ? 'text-red-400' : 'text-gray-400'}`}
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
          
          <p className={`text-sm ${error ? 'text-red-500' : 'text-gray-600'}`}>
            {error || (file ? file.name : 'Drop your PDF here or click to browse')}
          </p>
        </div>
        
        <input
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </label>

      {/* Generate Quiz Button */}
      {file && !loading && (
        <button
          onClick={handleUpload}
          className="w-full py-2.5 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          {loading ? 'Processing...' : 'Generate Quiz'}
        </button>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  );
}
