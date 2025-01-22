import { useState } from 'react';
import FileUpload from '../components/FileUpload';

export default function Home() {
  const [uploaded, setUploaded] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          PDF Quiz Generator
        </h1>
        <p className="text-gray-600 max-w-xl">
          Upload a PDF to generate an interactive quiz based on its content using the AI SDK and Google's Gemini Pro.
        </p>
      </div>

      {/* Upload Area */}
      <div className="w-full max-w-2xl">
        <FileUpload onUpload={() => setUploaded(true)} />
      </div>

      {/* Upload Status */}
      {uploaded && (
        <p className="mt-4 text-green-600">PDF uploaded successfully!</p>
      )}
    </div>
  );
}


