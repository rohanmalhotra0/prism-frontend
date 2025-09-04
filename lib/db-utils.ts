import pool from './database';

export interface User {
  id: number;
  email: string;
  password_hash?: string;
  full_name?: string;
  google_id?: string;
  google_picture?: string;
  created_at: Date;
  updated_at: Date;
}

export interface AuthLog {
  id: number;
  user_id: number;
  action: 'signin' | 'signup';
  auth_method: 'email' | 'google';
  ip_address?: string;
  user_agent?: string;
  created_at: Date;
}

// Create a new user
export async function createUser(userData: {
  email: string;
  password_hash?: string;
  full_name?: string;
  google_id?: string;
  google_picture?: string;
}): Promise<User> {
  const query = `
    INSERT INTO users (email, password_hash, full_name, google_id, google_picture)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  
  const values = [
    userData.email,
    userData.password_hash || null,
    userData.full_name || null,
    userData.google_id || null,
    userData.google_picture || null
  ];
  
  const result = await pool.query(query, values);
  return result.rows[0];
}

// Find user by email
export async function findUserByEmail(email: string): Promise<User | null> {
  const query = 'SELECT * FROM users WHERE email = $1';
  const result = await pool.query(query, [email]);
  return result.rows[0] || null;
}

// Find user by Google ID
export async function findUserByGoogleId(googleId: string): Promise<User | null> {
  const query = 'SELECT * FROM users WHERE google_id = $1';
  const result = await pool.query(query, [googleId]);
  return result.rows[0] || null;
}

// Log authentication action
export async function logAuthAction(logData: {
  user_id: number;
  action: 'signin' | 'signup';
  auth_method: 'email' | 'google';
  ip_address?: string;
  user_agent?: string;
}): Promise<AuthLog> {
  const query = `
    INSERT INTO authentication_logs (user_id, action, auth_method, ip_address, user_agent)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  
  const values = [
    logData.user_id,
    logData.action,
    logData.auth_method,
    logData.ip_address || null,
    logData.user_agent || null
  ];
  
  const result = await pool.query(query, values);
  return result.rows[0];
}

// Get user authentication history
export async function getUserAuthHistory(userId: number): Promise<AuthLog[]> {
  const query = `
    SELECT * FROM authentication_logs 
    WHERE user_id = $1 
    ORDER BY created_at DESC 
    LIMIT 10
  `;
  
  const result = await pool.query(query, [userId]);
  return result.rows;
}
