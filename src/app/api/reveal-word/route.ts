import { NextResponse } from 'next/server';
import { decryptWord } from '@/lib/crypto';

export async function POST(request: Request) {
  try {
    const { gameToken } = await request.json();

    if (!gameToken || typeof gameToken !== 'string') {
      return NextResponse.json({ error: 'Missing game token' }, { status: 400 });
    }

    let word: string;
    try {
      word = decryptWord(gameToken);
    } catch {
      return NextResponse.json({ error: 'Invalid game token' }, { status: 400 });
    }

    return NextResponse.json({ word });
  } catch (error) {
    console.error('Error revealing word:', error);
    return NextResponse.json({ error: 'Failed to reveal word' }, { status: 500 });
  }
}
