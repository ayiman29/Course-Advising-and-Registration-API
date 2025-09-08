import pool from '../db.js';
import bcrypt from 'bcrypt';

export async function createUser(email, name, password) {
  const hashedPassword = await bcrypt.hash(password, 10); 
  await pool.query(
    `INSERT INTO user (email, name, password) VALUES (?, ?, ?)`,
    [email, name, hashedPassword]
  );
  return { email, name };
}

export async function findUserByEmail(email) {
  const [rows] = await pool.query(
    `SELECT * FROM user WHERE email = ?`,
    [email]
  );
  return rows[0];
}

export async function getUserRole(email) {
  let [rows] = await pool.query(
    `SELECT student_id, credit, status FROM student WHERE email = ?`,
    [email]
  );
  if (rows.length > 0) return { role: 'student', ...rows[0] };

  [rows] = await pool.query(
    `SELECT advisor_id FROM advisor WHERE email = ?`,
    [email]
  );
  if (rows.length > 0) return { role: 'advisor', ...rows[0] };

  [rows] = await pool.query(
    `SELECT registrar_id FROM registrar WHERE email = ?`,
    [email]
  );
  if (rows.length > 0) return { role: 'registrar', ...rows[0] };

  return null;
}
