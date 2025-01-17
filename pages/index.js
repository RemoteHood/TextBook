import { useState } from 'react';
import styles from '../styles/Home.module.css';
import FileUpload from '../components/FileUpload';
import ProgressIndicator from '../components/ProgressIndicator';

export default function Home() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStage, setProcessingStage] = useState('');
  const [processedData, setProcessedData] = useState(null);

  const handleUploadProgress = (progress) => {
    setUploadProgress(progress);
  };

  const handleProcessingStage = (stage) => {
    setProcessingStage(stage);
  };

  const handleProcessComplete = (data) => {
    setProcessedData(data);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <FileUpload 
          onUploadProgress={handleUploadProgress}
          onProcessingStage={handleProcessingStage}
          onProcessComplete={handleProcessComplete}
        />
        {(uploadProgress > 0 || processingStage) && (
          <ProgressIndicator 
            uploadProgress={uploadProgress}
            processingStage={processingStage}
          />
        )}
        {processedData && (
          <div className={styles.processedData}>
            <h2>Processed Data</h2>
            <h3>Summary</h3>
            <p>{processedData.summary}</p>
            <h3>Processed Text</h3>
            <p>{processedData.processedText}</p>
            <h3>Characters</h3>
            <p>{processedData.characters}</p>
          </div>
        )}
      </main>
    </div>
  );
}

