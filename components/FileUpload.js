import { useState } from 'react';

export default function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    onUpload(data);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".pdf" />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
