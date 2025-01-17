import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import ProgressIndicator from '../components/ProgressIndicator';
import styles from '../styles/globals.css';

export default function Home() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStage, setProcessingStage] = useState(null);
  const [processComplete, setProcessComplete] = useState(null);

  const handleUploadProgress = (progress) => {
    setUploadProgress(progress);
  };

  const handleProcessingStage = (stage) => {
    setProcessingStage(stage);
  };

  const handleProcessComplete = (data) => {
    setProcessComplete(data);
  };

  return (
    <div className="container">
      <h1>Upload Your PDF</h1>
      <FileUpload
        onUploadProgress={handleUploadProgress}
        onProcessingStage={handleProcessingStage}
        onProcessComplete={handleProcessComplete}
      />
      {processingStage && (
        <ProgressIndicator
          uploadProgress={uploadProgress}
          processingStage={processingStage}
        />
      )}
      {processComplete && (
        <div>
          <h2>Summary</h2>
          <p>{processComplete.summary}</p>
          <h2>Processed Text</h2>
          <p>{processComplete.processedText}</p>
          <h2>Characters</h2>
          <p>{processComplete.characters}</p>
        </div>
      )}
    </div>
  );
}


