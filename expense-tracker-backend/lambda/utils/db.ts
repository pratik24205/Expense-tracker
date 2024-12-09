import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

export const connectDB = async () => {
  if (!client.connect) await client.connect();
  return client;
};
