-- PostgreSQL Database Schema for Prism Authentication
-- Run this script to create the necessary tables

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255), -- NULL for Google OAuth users
    full_name VARCHAR(255),
    google_id VARCHAR(255) UNIQUE, -- Google's unique user ID
    google_picture TEXT, -- Google profile picture URL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create authentication_logs table to track sign-ins/sign-ups
CREATE TABLE IF NOT EXISTS authentication_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(50) NOT NULL, -- 'signin' or 'signup'
    auth_method VARCHAR(50) NOT NULL, -- 'email' or 'google'
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);
CREATE INDEX IF NOT EXISTS idx_auth_logs_user_id ON authentication_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_auth_logs_created_at ON authentication_logs(created_at);
