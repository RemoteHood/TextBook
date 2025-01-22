import { useState } from 'react';

export default function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (file) => {
    if (file?.type === 'application/pdf') {
      setFile(file);
      startUpload(file);
    }
  };

  const startUpload = async (file) => {
    setLoading(true);
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      onUpload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-4">
      {/* Drag & Drop Area */}
      <label className={`
        block h-48 border-2 border-dashed rounded-lg cursor-pointer
        ${loading ? 'bg-gray-100 opacity-70' : 'bg-white hover:border-blue-400'}
        ${file ? 'border-blue-400' : 'border-gray-300'}
        transition-all
      `}>
        <div className="h-full flex flex-col items-center justify-center p-4">
          <svg 
            className={`w-10 h-10 mb-4 ${file ? 'text-blue-500' : 'text-gray-400'}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
          </svg>
          
          <p className={`text-center ${file ? 'text-blue-600' : 'text-gray-500'}`}>
            {file ? file.name : 'Drag PDF here or click to upload'}
          </p>
        </div>
        
        <input
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
          disabled={loading}
        />
      </label>

      {/* Generate Button */}
      {file && (
        <button
          onClick={startUpload}
          disabled={loading}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-colors
            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
        >
          {loading ? 'Processing...' : 'Generate Quiz'}
        </button>
      )}
    </div>
  );
}