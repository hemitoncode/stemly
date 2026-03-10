import { NextResponse } from 'next/server';
import { decryptWord } from '@/lib/crypto';

export async function POST(request: Request) {
  try {
    const { username, numGuesses, gameToken } = await request.json();

    if (!username || typeof username !== 'string' || username.trim().length === 0) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }
    if (!numGuesses || typeof numGuesses !== 'number' || numGuesses < 1 || numGuesses > 6) {
      return NextResponse.json({ error: 'numGuesses must be between 1 and 6' }, { status: 400 });
    }
    if (!gameToken || typeof gameToken !== 'string') {
      return NextResponse.json({ error: 'Missing game token' }, { status: 400 });
    }

    // Verify the token is valid
    try {
      decryptWord(gameToken);
    } catch {
      return NextResponse.json({ error: 'Invalid game token' }, { status: 400 });
    }

    // In production, store to a database here
    console.log(`Winner recorded: ${username.trim()} solved in ${numGuesses} guesses`);

    return NextResponse.json({ message: 'Winner recorded!', alreadyRecorded: false });
  } catch (error) {
    console.error('Error recording winner:', error);
    return NextResponse.json({ error: 'Failed to record winner' }, { status: 500 });
  }
}
