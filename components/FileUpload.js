// components/FileUpload.js
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from '../styles/FileUpload.module.css';

export default function FileUpload({ onUploadProgress, onProcessingStage, onProcessComplete }) {
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {'application/pdf': ['.pdf']},
    multiple: false
  });

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      onProcessingStage('Uploading');
      const response = await fetch('/api/process-pdf', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        onProcessingStage('Processing');
        const data = await response.json();
        console.log('Processed data:', data);
        onProcessingStage('Complete');
        onProcessComplete(data);
      } else {
        throw new Error('Server responded with an error');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      onProcessingStage('Error');
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <div {...getRootProps()} className={styles.dropzone}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the PDF here ...</p>
        ) : (
          <p>Drag 'n' drop a PDF here, or click to select a file</p>
        )}
      </div>
      {file && (
        <button onClick={handleUpload} className={styles.uploadButton}>
          Upload PDF
        </button>
      )}
    </div>
  );
}

