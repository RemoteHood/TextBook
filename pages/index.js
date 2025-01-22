import { useState } from 'react';
import FileUpload from '../components/FileUpload';

export default function Home() {
  const [uploaded, setUploaded] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">PDF Quiz Generator</h1>
        <p className="text-gray-600">
          Upload a PDF to generate an interactive quiz using AI
        </p>
      </div>

      {/* Upload Component */}
      <FileUpload onUpload={() => setUploaded(true)} />

      {/* Status Message */}
      {uploaded && <p className="mt-4 text-green-600">PDF uploaded successfully!</p>}
    </div>
  );
}

