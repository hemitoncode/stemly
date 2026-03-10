-- Supabase SQL Schema for STEMly
-- Run this in the Supabase SQL Editor to set up your database

-- Daily words table
CREATE TABLE IF NOT EXISTS daily_words (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  word TEXT NOT NULL CHECK (length(word) = 5),
  date DATE NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Winners table
CREATE TABLE IF NOT EXISTS winners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL,
  word_date DATE NOT NULL REFERENCES daily_words(date),
  guessed_at TIMESTAMPTZ DEFAULT now(),
  num_guesses INTEGER NOT NULL CHECK (num_guesses >= 1 AND num_guesses <= 6)
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_daily_words_date ON daily_words(date);
CREATE INDEX IF NOT EXISTS idx_winners_word_date ON winners(word_date);
CREATE INDEX IF NOT EXISTS idx_winners_username ON winners(username);

-- Row Level Security (optional, for production)
ALTER TABLE daily_words ENABLE ROW LEVEL SECURITY;
ALTER TABLE winners ENABLE ROW LEVEL SECURITY;

-- Allow anonymous reads on daily_words (word is never exposed directly)
CREATE POLICY "Allow anonymous insert on daily_words"
  ON daily_words FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anonymous select on daily_words"
  ON daily_words FOR SELECT TO anon USING (true);

-- Allow anonymous inserts on winners
CREATE POLICY "Allow anonymous insert on winners"
  ON winners FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anonymous select on winners"
  ON winners FOR SELECT TO anon USING (true);
