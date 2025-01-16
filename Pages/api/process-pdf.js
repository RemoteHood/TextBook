// pages/api/process-pdf.js
import { OpenAI } from 'openai';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error parsing form data' });
      }
      try {
        const pdfPath = files.pdf.path;
        const loader = new PDFLoader(pdfPath);
        const pages = await loader.load();
        const docs = await textSplitter.splitDocuments(pages);
        const fullText = docs.map(doc => doc.pageContent).join(' ');

        const summary = await generateSummary(fullText);
        const processedText = await processText(summary);
        const characters = await extractCharacters(processedText);

        res.status(200).json({ summary, processedText, characters });
      } catch (error) {
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
  return response.choices[0].message.content.split('\n');
}