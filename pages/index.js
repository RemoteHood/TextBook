// pages/index.js
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function PDFUploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf']
    },
    onDrop: acceptedFiles => {
      setUploadedFiles(acceptedFiles);
    }
  });

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        Upload Your PDF
      </h1>
      
      <div 
        {...getRootProps()} 
        className={`
          w-full max-w-xl p-12 border-2 rounded-xl text-center cursor-pointer transition-all duration-300
          ${isDragActive 
            ? 'border-blue-500 bg-gray-900 text-blue-400' 
            : 'border-gray-600 bg-gray-800 text-gray-400 hover:border-blue-500'
          }
        `}
      >
        <input {...getInputProps()} />
        
        {isDragActive ? (
          <p className="text-blue-400">Drop the PDF here ...</p>
        ) : (
          <div>
            <p className="text-lg">
              Drag 'n' drop a PDF file here, or click to select a file
            </p>
            <em className="text-sm text-gray-500 mt-2 block">
              (Only *.pdf files will be accepted)
            </em>
          </div>
        )}
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-6 text-white">
          <h2 className="text-xl mb-2">Uploaded Files:</h2>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index} className="bg-gray-800 p-2 rounded mb-2">
                {file.name} - {Math.round(file.size / 1024)} KB
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}