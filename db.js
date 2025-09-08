import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,           // university5
  waitForConnections: true,
  connectionLimit: 10,
});

const db = pool.promise();

export async function pingDB() {
  const [rows] = await db.query('SELECT DATABASE() AS db, NOW() AS now');
  console.log('✅ Connected to DB:', rows[0].db, 'at', rows[0].now);
}

export default db;
