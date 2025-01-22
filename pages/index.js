// pages/index.js
import { useState } from 'react';
import FileUpload from '../components/FileUpload';

export default function Home() {
  const [uploaded, setUploaded] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Under View</h1>
      
      {!uploaded && (
        <div className="w-full flex justify-center">
          <FileUpload onUpload={() => setUploaded(true)} />
        </div>
      )}
      
      {uploaded && (
        <div className="text-center text-sm text-gray-600">
          PDF uploaded successfully!
        </div>
      )}
    </div>
  );
}


