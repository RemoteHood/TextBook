import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db('textbook');
    const chapters = await db.collection('chapters').find().toArray();
    
    await client.close();
    res.status(200).json(chapters);
  } catch (error) {
    console.error('Error loading chapters:', error);
    res.status(500).json({ message: 'Error loading chapters' });
  }
}

