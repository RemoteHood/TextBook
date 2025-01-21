import formidable from 'formidable';
import fs from 'fs/promises';
import pdf from 'pdf-parse';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

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
        const chunks = splitTextIntoChunks(text, 2000); // Split text into chunks of 2000 characters
        const characters = await Promise.all(chunks.map(chunk => identifyCharacters(chunk)));
        const summary = await generateSummary(text);

        res.status(200).json({ text, characters: flattenArray(characters), summary });
      });
    } catch (error) {
      console.error('Error handling request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

function splitTextIntoChunks(text, chunkSize) {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks;
}

function flattenArray(array) {
  return array.reduce((acc, val) => acc.concat(val), []);
}

async function identifyCharacters(chunk) {
  try {
    const { text } = await generateText({
      model: openai('gpt-4'),
      prompt: `Please identify and list all character names mentioned in the following text. Only return the names as a comma-separated list:\n\n${chunk}`
    });

    return text.split(',').map(char => char.trim());
  } catch (error) {
    console.error('Error identifying characters:', error);
    throw new Error('Failed to identify characters');
  }
}

async function generateSummary(text) {
  try {
    const { text } = await generateText({
      model: openai('gpt-4'),
      prompt: `Please generate a brief summary of the following text:\n\n${text}`
    });

    return text;
  } catch (error) {
    console.error('Error generating summary:', error);
    throw new Error('Failed to generate summary');
  }
}


