const [message, setMessage] = useState(null);

const handleUpload = async () => {
  if (!file) {
    setMessage("Please select a file first.");
    return;
  }

  setMessage("Uploading...");
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setMessage("Upload successful!");
    onUpload(data);
  } catch (error) {
    setMessage("Error uploading file.");
    console.error(error);
  }
};

return (
  <div>
    <input type="file" onChange={handleFileChange} accept=".pdf" />
    <button onClick={handleUpload} disabled={!file}>Upload</button>
    {message && <p>{message}</p>}
  </div>
);

