-- Supabase SQL Schema for STEMly
-- Winners tracking table (standalone — no daily_words dependency)

-- Drop old tables if migrating from the previous schema
DROP TABLE IF EXISTS winners CASCADE;
DROP TABLE IF EXISTS daily_words CASCADE;

-- Winners table: records every correct guess with timestamp
CREATE TABLE winners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL CHECK (char_length(username) >= 1 AND char_length(username) <= 30),
  word TEXT NOT NULL CHECK (char_length(word) = 5),
  num_guesses INTEGER NOT NULL CHECK (num_guesses >= 1 AND num_guesses <= 6),
  hints_used INTEGER NOT NULL DEFAULT 0 CHECK (hints_used >= 0 AND hints_used <= 3),
  guessed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for admin queries
CREATE INDEX idx_winners_guessed_at ON winners(guessed_at DESC);
CREATE INDEX idx_winners_username ON winners(username);
CREATE INDEX idx_winners_word ON winners(word);

-- Row Level Security
ALTER TABLE winners ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (the game client writes here)
CREATE POLICY "Allow anonymous insert on winners"
  ON winners FOR INSERT TO anon WITH CHECK (true);

-- Allow anonymous reads (for potential leaderboard features)
CREATE POLICY "Allow anonymous select on winners"
  ON winners FOR SELECT TO anon USING (true);
