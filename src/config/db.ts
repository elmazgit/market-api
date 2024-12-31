import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env or .env.production
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false, // Enable SSL in production
});

// Test the database connection
const testConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Database connected:', res.rows[0]);
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
};

// Export the pool to be used in other parts of the app
export { pool as db, testConnection };
