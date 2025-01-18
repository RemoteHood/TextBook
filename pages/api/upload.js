import formidable from 'formidable';
import fs from 'fs';
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
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: 'Error parsing the file' });
        return;
      }

      const filePath = files.file.filepath;
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdf(dataBuffer);

      const text = data.text;
      const characters = await identifyCharacters(text);
      const summary = await generateSummary(text);

      res.status(200).json({ text, characters, summary });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

async function identifyCharacters(text) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant that identifies character names in text." },
      { role: "user", content: `Please identify and list all character names mentioned in the following text. Only return the names as a comma-separated list:\n\n${text}` }
    ],
    temperature: 0.7,
    max_tokens: 1000
  });

  return completion.choices[0].message.content.split(',').map(char => char.trim());
}

async function generateSummary(text) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant that generates concise summaries of text." },
      { role: "user", content: `Please generate a brief summary of the following text:\n\n${text}` }
    ],
    temperature: 0.7,
    max_tokens: 1000
  });

  return completion.choices[0].message.content;
}

