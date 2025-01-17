import openai from '../../lib/openai';
import formidable from 'formidable';
import fs from 'fs';
import pdfParse from 'pdf-parse';

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
        return res.status(500).json({ error: 'Error parsing form data' });
      }
      try {
        const pdfPath = files.pdf.filepath;
        const dataBuffer = fs.readFileSync(pdfPath);
        const data = await pdfParse(dataBuffer);

        const fullText = data.text;
        const summary = await generateSummary(fullText);
        const processedText = await processText(summary);
        const characters = await extractCharacters(processedText);

        // Delete the temporary file
        fs.unlinkSync(pdfPath);

        res.status(200).json({ summary, processedText, characters: characters.join('\n') });
      } catch (error) {
        console.error('Error processing PDF:', error);
        res.status(500).json({ error: 'Error processing PDF' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function generateSummary(text) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant that summarizes documents." },
      { role: "user", content: `Please summarize the following document:\n\n${text}` }
    ],
    max_tokens: 1000
  });
  return response.choices[0].message.content;
}

async function processText(text) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are an expert in literary analysis." },
      { role: "user", content: `Analyze the following text from a novel and provide:
        1. A brief summary (2-3 sentences)
        2. Key events (bullet points)
        3. Character mentions
        4. Any notable time references
        Text: ${text}` }
    ]
  });
  return response.choices[0].message.content;
}

async function extractCharacters(text) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are an expert in literary analysis and character identification." },
      { role: "user", content: `Identify all the characters from the following text and present them in a clear, organized list: ${text}` }
    ]
  });

  const responseContent = response.choices[0].message.content;

  if (typeof responseContent !== 'string') {
    throw new TypeError('Response content is not a string');
  }

  return responseContent.split('\n');
}
