import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getDailyWord } from '@/lib/daily-word-service';

export async function POST(request: Request) {
  try {
    const { username, numGuesses } = await request.json();

    if (!username || typeof username !== 'string' || username.trim().length === 0) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }
    if (!numGuesses || typeof numGuesses !== 'number' || numGuesses < 1 || numGuesses > 6) {
      return NextResponse.json(
        { error: 'numGuesses must be between 1 and 6' },
        { status: 400 }
      );
    }

    const { date } = await getDailyWord();

    // Check if already recorded
    const { data: existing } = await supabase
      .from('winners')
      .select('id')
      .eq('username', username.trim())
      .eq('word_date', date)
      .single();

    if (existing) {
      return NextResponse.json({ message: 'Already recorded', alreadyRecorded: true });
    }

    const { error } = await supabase
      .from('winners')
      .insert({
        username: username.trim(),
        word_date: date,
        num_guesses: numGuesses,
      });

    if (error) throw error;

    return NextResponse.json({ message: 'Winner recorded!', alreadyRecorded: false });
  } catch (error) {
    console.error('Error recording winner:', error);
    return NextResponse.json({ error: 'Failed to record winner' }, { status: 500 });
  }
}
