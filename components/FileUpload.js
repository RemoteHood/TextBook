import React, { useState } from 'react';

export default function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file before uploading.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await response.json();
      onUpload(data);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    }
  };

  return (
    <div className="mb-4">
      <input type="file" onChange={handleFileChange} accept=".pdf" className="mb-2" />
      <button onClick={handleUpload} disabled={!file} className="bg-blue-500 text-white px-4 py-2 rounded">
        Upload
      </button>
    </div>
  );
}





