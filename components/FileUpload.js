// components/FileUpload.js
import { useState } from 'react';

export default function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('pdf', file);

    const response = await fetch('/api/process-pdf', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      onUpload(data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button type="submit">Upload PDF</button>
    </form>
  );
}
