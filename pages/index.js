import { useState } from 'react';
import FileUpload from '../components/FileUpload';

export default function Home() {
  const [uploaded, setUploaded] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">PDF Quiz Generator</h1>
      
      {/* Subtitle */}
      <p className="text-lg text-gray-600 mb-8 text-center">
        Upload a PDF to generate an interactive quiz based on its content using the AI SDK and Google's Gemini Pro.
      </p>

      {/* Drag & Drop Area */}
      {!uploaded ? (
        <div className="w-full max-w-2xl">
          <FileUpload onUpload={() => setUploaded(true)} />
        </div>
      ) : (
        <div className="text-center text-gray-600">
          <p>PDF uploaded successfully!</p>
        </div>
      )}
    </div>
  );
}


