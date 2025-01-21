import formidable from 'formidable';
import fs from 'fs/promises';
import pdf from 'pdf-parse';
import { OpenAI } from 'langchain/llms/openai';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const form = new formidable.IncomingForm();
    
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const file = files.pdf;
    const buffer = await fs.readFile(file.filepath);
    const data = await pdf(buffer);

    const llm = new OpenAI({
      temperature: 0.3,
      modelName: 'gpt-4',
    });

    const analysisPrompt = `
    Analyze the following text and extract:
    1. Main characters
    2. Important places
    3. Key events
    4. Timeline
    5. Brief summary

    Text: ${data.text.substring(0, 8000)}
    `;

    const analysis = await llm.predict(analysisPrompt);

    res.status(200).json({
      analysis,
      characters: extractCharacters(analysis),
      summary: extractSummary(analysis),
    });
  } catch (error) {
    console.error('Error processing upload:', error);
    res.status(500).json({ message: 'Error processing upload' });
  }
}

function extractCharacters(analysis) {
  // Simple extraction - can be improved
  const characterSection = analysis.split('Main characters:')[1]?.split('\n')[0] || '';
  return characterSection.split(',').map(char => char.trim()).filter(Boolean);
}

function extractSummary(analysis) {
  const summarySection = analysis.split('Brief summary:')[1]?.trim() || '';
  return summarySection;
}



