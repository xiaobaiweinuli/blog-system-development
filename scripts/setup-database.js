// Database setup script for blog system
// This would typically create tables for posts, users, analytics, etc.

console.log("Setting up database schema...")

const createTables = `
-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT,
  description TEXT,
  cover_image VARCHAR(500),
  language VARCHAR(10) DEFAULT 'en',
  status VARCHAR(20) DEFAULT 'draft',
  visibility VARCHAR(20) DEFAULT 'public',
  is_pinned BOOLEAN DEFAULT FALSE,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  author_id INTEGER,
  view_count INTEGER DEFAULT 0
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  github_id INTEGER UNIQUE,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  name VARCHAR(255),
  avatar_url VARCHAR(500),
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id),
  event_type VARCHAR(50),
  user_agent TEXT,
  ip_address INET,
  referrer VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Comments table (if you want to add comments feature)
CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id),
  author_name VARCHAR(255),
  author_email VARCHAR(255),
  content TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_language ON posts(language);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_post_id ON analytics(post_id);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics(created_at);
`

console.log("Database tables created successfully!")
console.log("Tables: posts, users, analytics, comments")
console.log("Indexes created for optimal performance")
