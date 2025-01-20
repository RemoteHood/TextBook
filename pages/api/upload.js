import formidable from 'formidable';
import fs from 'fs/promises';
import pdf from 'pdf-parse';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const form = new formidable.IncomingForm();
      form.uploadDir = "/tmp"; // Temporary directory for uploads
      form.keepExtensions = true; // Keep file extensions

      form.parse(req, async (err, fields, files) => {
        if (err) {
          return res.status(500).json({ error: 'Error parsing the file' });
        }

        const filePath = files.file.filepath || files.file.path; // Adjust for formidable version
        const dataBuffer = await fs.readFile(filePath); // Use Promises API
        const data = await pdf(dataBuffer);

        const text = data.text;
        const characters = await identifyCharacters(text);
        const summary = await generateSummary(text);

        res.status(200).json({ text, characters, summary });
      });
    } catch (error) {
      console.error('Error handling request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

async function identifyCharacters(text) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4", // Updated to a valid model
      messages: [
        { role: "system", content: "You are a helpful assistant that identifies character names in text." },
        { role: "user", content: `Please identify and list all character names mentioned in the following text. Only return the names as a comma-separated list:\n\n${text}` }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return completion.choices[0].message.content.split(',').map(char => char.trim());
  } catch (error) {
    console.error('Error identifying characters:', error);
    throw new Error('Failed to identify characters');
  }
}

async function generateSummary(text) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4", // Updated to a valid model
      messages: [
        { role: "system", content: "You are a helpful assistant that generates concise summaries of text." },
        { role: "user", content: `Please generate a brief summary of the following text:\n\n${text}` }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating summary:', error);
    throw new Error('Failed to generate summary');
  }
}

