// pages/api/upload.js
import { IncomingForm } from 'formidable';
import fs from 'fs/promises';
import pdf from 'pdf-parse';
import { OpenAI } from '@langchain/openai';

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
    // Create uploads directory if it doesn't exist
    const uploadDir = './uploads';
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir);
    }

    const form = new IncomingForm({
      uploadDir,
      keepExtensions: true,
    });

    // Parse the form
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    // Get the uploaded file
    const file = Array.isArray(files.pdf) ? files.pdf[0] : files.pdf;
    
    if (!file) {
      throw new Error('No file uploaded');
    }

    // Read and parse the PDF
    const buffer = await fs.readFile(file.filepath);
    const data = await pdf(buffer);

    if (!data || !data.text) {
      throw new Error('Could not extract text from PDF');
    }

    // Initialize OpenAI
    const llm = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      temperature: 0.3,
    });

    const analysisPrompt = `
    Please analyze this text and extract the following information:
    1. List of main characters (only names)
    2. Brief summary (2-3 sentences)

    Text: ${data.text.substring(0, 4000)}

    Please format your response exactly like this:
    CHARACTERS:
    [list of character names separated by commas]
    SUMMARY:
    [your summary]
    `;

    const analysis = await llm.invoke(analysisPrompt);

    // Clean up temporary file
    try {
      await fs.unlink(file.filepath);
    } catch (error) {
      console.error('Error deleting temp file:', error);
    }

    // Parse the response
    const characters = analysis.split('CHARACTERS:')[1]?.split('SUMMARY:')[0]?.trim().split(',').map(char => char.trim()) || [];
    const summary = analysis.split('SUMMARY:')[1]?.trim() || '';

    res.status(200).json({
      characters,
      summary
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      error: error.message || 'Error processing upload',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}


