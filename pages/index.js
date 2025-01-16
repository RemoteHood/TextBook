import { useState } from 'react';
import styles from '../styles/Home.module.css';
import FileUpload from '../components/FileUpload';
import ProgressIndicator from '../components/ProgressIndicator';

export default function Home() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStage, setProcessingStage] = useState('');

  const handleUploadProgress = (progress) => {
    setUploadProgress(progress);
  };

  const handleProcessingStage = (stage) => {
    setProcessingStage(stage);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <FileUpload 
          onUploadProgress={handleUploadProgress}
          onProcessingStage={handleProcessingStage}
        />
        {(uploadProgress > 0 || processingStage) && (
          <ProgressIndicator 
            uploadProgress={uploadProgress}
            processingStage={processingStage}
          />
        )}
      </main>
    </div>
  );
}
