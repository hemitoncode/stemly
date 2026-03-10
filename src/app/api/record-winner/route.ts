import { NextResponse } from 'next/server';
import { decryptWord } from '@/lib/crypto';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { username, numGuesses, gameToken, hintsUsed } = await request.json();

    if (!username || typeof username !== 'string' || username.trim().length === 0) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }
    if (!numGuesses || typeof numGuesses !== 'number' || numGuesses < 1 || numGuesses > 6) {
      return NextResponse.json({ error: 'numGuesses must be between 1 and 6' }, { status: 400 });
    }
    if (!gameToken || typeof gameToken !== 'string') {
      return NextResponse.json({ error: 'Missing game token' }, { status: 400 });
    }
    const validHintsUsed = typeof hintsUsed === 'number' && hintsUsed >= 0 && hintsUsed <= 3 ? hintsUsed : 0;

    // Verify the token is valid and extract the word
    let word: string;
    try {
      word = decryptWord(gameToken);
    } catch {
      return NextResponse.json({ error: 'Invalid game token' }, { status: 400 });
    }

    const guessedAt = new Date().toISOString();

    // Fire-and-forget: insert into Supabase but don't block the response
    supabase
      .from('winners')
      .insert({
        username: username.trim(),
        word,
        num_guesses: numGuesses,
        hints_used: validHintsUsed,
        guessed_at: guessedAt,
      })
      .then(({ error }) => {
        if (error) {
          console.error('Supabase insert error:', error);
        }
      });

    return NextResponse.json({ message: 'Winner recorded!', alreadyRecorded: false });
  } catch (error) {
    console.error('Error recording winner:', error);
    return NextResponse.json({ error: 'Failed to record winner' }, { status: 500 });
  }
}
