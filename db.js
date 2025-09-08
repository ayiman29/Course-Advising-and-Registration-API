import mysql from 'mysql2';


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',        
  password: '',       
  database: 'university5', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


const db = pool.promise();

export async function pingDB() {
  try {
    const [rows] = await db.query('SELECT DATABASE() AS db, NOW() AS now');
    console.log('✅ Connected to DB:', rows[0].db, 'at', rows[0].now);
  } catch (err) {
    console.error('❌ DB connection failed:', err.message);
  }
}

export default db;
