import fs from 'fs/promises';
import path from 'path';

const chaptersFilePath = path.join(process.cwd(), 'data', 'chapters.json');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      if (await fs.access(chaptersFilePath).then(() => true).catch(() => false)) {
        const data = await fs.readFile(chaptersFilePath, 'utf-8');
        const chapters = JSON.parse(data);
        res.status(200).json(chapters);
      } else {
        res.status(200).json([]);
      }
    } catch (error) {
      console.error('Error loading chapters:', error);
      res.status(500).json({ error: 'Error loading chapters' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

