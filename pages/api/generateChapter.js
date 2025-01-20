import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { characters, genres } = req.body;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a creative writer tasked with generating a chapter for a story."
          },
          {
            role: "user",
            content: `Generate a chapter based on the following characters: ${characters.join(', ')}. The genres are: ${genres.join(', ')}.`
          }
        ],
        max_tokens: 1000
      });

      const chapterContent = completion.choices[0].message.content;
      const chapterTitle = generateChapterTitle(characters, genres);

      res.status(200).json({ title: chapterTitle, content: chapterContent });
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

