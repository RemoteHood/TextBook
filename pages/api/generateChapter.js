import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { characters, genres } = req.body;

    try {
      const response = await openai.createCompletion({
        model: 'gpt-4o-mini',
        prompt: `Generate a chapter based on the following characters: ${characters.join(', ')}. The genres are: ${genres.join(', ')}.`,
        max_tokens: 1500,
      });

      const chapterContent = response.data.choices[0].text;
      const chapterTitle = generateChapterTitle(characters, genres);

      res.status(200).json({ title: chapterTitle, content: chapterContent });
    } catch (error) {
      res.status(500).json({ error: 'Error generating chapter' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

function generateChapterTitle(characters, genres) {
  return `Chapter: ${characters[0]}'s Adventure`;
}
