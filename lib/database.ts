import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER || 'rohanmalhotra', // Your macOS username
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'prism_auth',
  password: process.env.DB_PASSWORD || '', // Empty for local development
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Test the connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL connection error:', err);
});

export default pool;
