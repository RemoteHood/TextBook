// pages/index.js
import { useState, useEffect } from 'react';
import FileUpload from '../components/FileUpload';

export default function Home() {
  const [uploaded, setUploaded] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8">Under View</h1>
      
      {!uploaded ? (
        <div className="w-full max-w-md">
          <FileUpload onUpload={() => setUploaded(true)} />
        </div>
      ) : (
        <div className="w-full max-w-6xl">
          {/* Add your post-upload content here when ready */}
          <p className="text-center text-gray-600">PDF uploaded successfully!</p>
        </div>
      )}
    </div>
  );
}



