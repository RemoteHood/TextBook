// pages/api/generate-next-chapter.js
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { previousChapter, genres, processedText, overallSummary } = req.body;
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a skilled novelist, able to create engaging and well-structured chapters." },
          { role: "user", content: `Generate the next chapter of a story that continues from the following chapter. The genres of the story should be: ${genres.join(', ')}. If one of the genres is 'same', maintain the original style and genre of the author. Follow these guidelines:
            1. Write a cohesive narrative of about 1500-2000 words.
            2. Do not include a chapter title or number.
            3. Ensure the writing style and elements align with the chosen genres.
            Here is the previous chapter for context:
            Previous Chapter: ${previousChapter}
            Processed Text: ${processedText}
            Overall Summary: ${overallSummary}
            Begin the next chapter now:` }
        ]
      });
      res.status(200).json({ chapter: response.choices[0].message.content });
    } catch (error) {
      res.status(500).json({ error: 'Error generating next chapter' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}