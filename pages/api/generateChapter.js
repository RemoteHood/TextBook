import { OpenAI } from '@langchain/openai'; // Updated import
import { PromptTemplate } from '@langchain/core/prompts'; // Updated import

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { characters, genres, previousContent } = req.body;

    const llm = new OpenAI({
      temperature: 0.7,
      modelName: 'gpt-4',
    });

    const template = `
    Write a chapter for a story with the following requirements:
    Characters: ${characters.join(', ')}
    Genres: ${genres.join(', ')}
    ${previousContent ? `Previous content: ${previousContent}` : ''}
    
    Create an engaging chapter that advances the story while maintaining consistency with the characters and genres.
    Include character interactions, plot development, and appropriate atmosphere for the genres.
    
    The chapter should be between 1000-1500 words.
    `;

    const prompt = new PromptTemplate({
      template,
      inputVariables: [],
    });

    const formattedPrompt = await prompt.format({});
    const result = await llm.predict(formattedPrompt);

    const chapter = {
      title: `Chapter ${Math.floor(Math.random() * 1000)}`,
      content: result,
      characters,
      genres,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(chapter);
  } catch (error) {
    console.error('Error generating chapter:', error);
    res.status(500).json({ message: 'Error generating chapter' });
  }
}