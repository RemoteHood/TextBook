import fs from 'fs/promises';
import path from 'path';

const chaptersFilePath = path.join(process.cwd(), 'data', 'chapters.json');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, content } = req.body;

    try {
      let chapters = [];
      if (await fs.exists(chaptersFilePath)) {
        const data = await fs.readFile(chaptersFilePath, 'utf-8');
        chapters = JSON.parse(data);
      }

      chapters.push({ title, content });
      await fs.writeFile(chaptersFilePath, JSON.stringify(chapters, null, 2));

      res.status(200).json({ message: 'Chapter saved successfully' });
    } catch (error) {
      console.error('Error saving chapter:', error);
      res.status(500).json({ error: 'Error saving chapter' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

