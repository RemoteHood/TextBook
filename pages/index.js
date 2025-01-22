import { useState } from 'react';
import FileUpload from '../components/FileUpload';

export default function Home() {
  const [uploaded, setUploaded] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Under View</h1>
      
      {/* Drag & Drop Area */}
      {!uploaded && (
        <div className="w-full max-w-2xl px-4">
          <FileUpload onUpload={() => setUploaded(true)} />
        </div>
      )}
      
      {/* Empty State After Upload (We'll add content here later) */}
      {uploaded && (
        <div className="text-center text-gray-600">
          <p>PDF successfully uploaded!</p>
        </div>
      )}
    </div>
  );
}



