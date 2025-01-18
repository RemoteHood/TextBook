import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Chapter Writer</title>
        <meta name="description" content="Upload your book and write chapters" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Chapter Writer</h1>
        <div className={styles.uploadArea}>
          <input type="file" accept=".pdf" id="fileInput" className={styles.fileInput} />
          <label htmlFor="fileInput" className={styles.fileLabel}>Upload PDF</label>
        </div>
      </main>
    </div>
  )
}
