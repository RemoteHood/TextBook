import styles from '../styles/ProgressIndicator.module.css';

export default function ProgressIndicator({ uploadProgress, processingStage }) {
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBar} style={{ width: `${uploadProgress}%` }}></div>
      <p className={styles.progressText}>
        {processingStage ? `${processingStage}...` : `Uploading: ${uploadProgress}%`}
      </p>
    </div>
  );
}
