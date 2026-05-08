-- ============================================
-- College Discovery Platform - PostgreSQL Schema
-- ============================================

-- Create Database (run separately)
-- CREATE DATABASE college_platform;

-- Drop tables if exists (for fresh setup)
DROP TABLE IF EXISTS college_reviews CASCADE;
DROP TABLE IF EXISTS saved_colleges CASCADE;
DROP TABLE IF EXISTS college_courses CASCADE;
DROP TABLE IF EXISTS colleges CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ========================
-- USERS TABLE
-- ========================
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- COLLEGES TABLE
-- ========================
CREATE TABLE colleges (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  state VARCHAR(100) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  fees_per_year INTEGER NOT NULL,
  rating DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 5),
  placement_percentage INTEGER CHECK (placement_percentage >= 0 AND placement_percentage <= 100),
  type VARCHAR(50) DEFAULT 'Private', -- Public / Private / Deemed
  established_year INTEGER,
  website VARCHAR(255),
  phone VARCHAR(20),
  email_contact VARCHAR(255),
  address TEXT,
  accreditation VARCHAR(50),
  total_students INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- COLLEGE COURSES TABLE
-- ========================
CREATE TABLE college_courses (
  id SERIAL PRIMARY KEY,
  college_id INTEGER NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
  course VARCHAR(150) NOT NULL,
  duration VARCHAR(50),
  fees INTEGER
);

-- ========================
-- SAVED COLLEGES TABLE
-- ========================
CREATE TABLE saved_colleges (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  college_id INTEGER NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, college_id)
);

-- ========================
-- COLLEGE REVIEWS TABLE
-- ========================
CREATE TABLE college_reviews (
  id SERIAL PRIMARY KEY,
  college_id INTEGER NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, college_id)
);

-- Indexes
CREATE INDEX idx_colleges_location ON colleges(location);
CREATE INDEX idx_colleges_rating ON colleges(rating DESC);
CREATE INDEX idx_colleges_fees ON colleges(fees_per_year);
CREATE INDEX idx_saved_colleges_user ON saved_colleges(user_id);
CREATE INDEX idx_college_courses_college ON college_courses(college_id);
