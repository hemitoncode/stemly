# 🔬 STEMly — Daily STEM Word Puzzle

A Wordle-inspired daily puzzle game featuring STEM vocabulary. Built with Next.js, Supabase, and a Galaxy purple theme.

## Features

- **Daily STEM words** — A new science/tech/engineering/math word every day
- **Wordle mechanics** — 6 guesses, color-coded feedback (green/yellow/grey)
- **Supabase backend** — Daily words auto-populate; winners stored with timestamps
- **Galaxy theme** — Purple & grey color palette with smooth animations
- **Keyboard support** — Physical + on-screen keyboard

## Getting Started

### 1. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL in `supabase-schema.sql` in the Supabase SQL Editor
3. Copy your project URL and anon key

### 2. Configure environment

```bash
cp .env.local.example .env.local  # or edit .env.local directly
```

Set these values in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Run the app

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to play!

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/daily-word` | GET | Returns today's date and word metadata (never the word itself) |
| `/api/validate-guess` | POST | Validates a 5-letter guess against today's word |
| `/api/record-winner` | POST | Records a winning player with their guess count |

## Database Schema

- **`daily_words`** — Stores one STEM word per day (auto-populated on first request)
- **`winners`** — Stores usernames, dates, and guess counts for admin review

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (Galaxy purple/grey theme)
- **Supabase** (PostgreSQL)

