import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { characters, genres } = req.body;

    try {
      const { text } = await generateText({
        model: openai('gpt-4o-mini'),
        prompt: `Generate a chapter based on the following characters: ${characters.join(', ')}. The genres are: ${genres.join(', ')}.`
      });

      const chapterTitle = generateChapterTitle(characters, genres);

      res.status(200).json({ title: chapterTitle, content: text });
    } catch (error) {
      console.error('Error generating chapter:', error);
      res.status(500).json({ error: 'Error generating chapter' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

function generateChapterTitle(characters, genres) {
  if (!characters.length || !genres.length) return "Untitled Chapter";
  const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
  return `Chapter: ${randomCharacter}'s Journey in ${genres[0]}`;
}

