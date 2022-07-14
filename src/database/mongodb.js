import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let db = null;

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
  await mongoClient.connect();
  db = mongoClient.db(process.env.MONGO_DB);
  console.log('Banco de dados conectado com sucesso...');
} 
catch (error) {
  console.error(error);
}

export default db;