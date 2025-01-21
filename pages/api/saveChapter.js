import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const chapter = req.body;
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db('textbook');
    
    await db.collection('chapters').insertOne(chapter);
    
    await client.close();
    res.status(200).json({ message: 'Chapter saved successfully' });
  } catch (error) {
    console.error('Error saving chapter:', error);
    res.status(500).json({ message: 'Error saving chapter' });
  }
}



