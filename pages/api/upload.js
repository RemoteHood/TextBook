import formidable from 'formidable';
import fs from 'fs';
import pdf from 'pdf-parse';
import { Configuration, OpenAIApi } from 'openai';

export const config = {
  api: {
    bodyParser: false,
  },
};

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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
  try {
    const response = await openai.createCompletion({
      model: "gpt-4o-mini",
      prompt: `Identify and list the main characters in the following text. After each full name place "/n" in between. Only include names of people or beings, not places or objects:\n\n${text.substring(0, 2000)}`,
      max_tokens: 1500,
      temperature: 0.5,
    });

    const characterList = response.data.choices[0].text.trim().split('\n');
    return characterList.map(char => char.replace(/^\d+\.\s*/, '').trim()).filter(char => char !== '');
  } catch (error) {
    console.error('Error identifying characters:', error);
    return ['Error identifying characters'];
  }
}

async function generateSummary(text) {
  try {
    const response = await openai.createCompletion({
      model: "gpt-4o-mini",
      prompt: `Summarize the following text in 3-4 sentences:\n\n${text.substring(0, 2000)}`,
      max_tokens: 1500,
      temperature: 0.7,
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error generating summary:', error);
    return 'Error generating summary';
  }
}
