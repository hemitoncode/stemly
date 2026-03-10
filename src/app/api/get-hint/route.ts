import { NextResponse } from 'next/server';
import { decryptWord } from '@/lib/crypto';
import { WORD_MAP } from '@/lib/words';

export async function POST(request: Request) {
  try {
    const { gameToken, hintIndex } = await request.json();

    if (!gameToken || typeof gameToken !== 'string') {
      return NextResponse.json({ error: 'Missing game token' }, { status: 400 });
    }

    if (typeof hintIndex !== 'number' || hintIndex < 0 || hintIndex > 2) {
      return NextResponse.json({ error: 'hintIndex must be 0, 1, or 2' }, { status: 400 });
    }

    let word: string;
    try {
      word = decryptWord(gameToken);
    } catch {
      return NextResponse.json({ error: 'Invalid or tampered game token' }, { status: 400 });
    }

    const stemWord = WORD_MAP.get(word);
    if (!stemWord) {
      return NextResponse.json({ error: 'Word data not found' }, { status: 404 });
    }

    return NextResponse.json({
      hint: stemWord.hints[hintIndex],
      category: stemWord.category,
      hintIndex,
    });
  } catch (error) {
    console.error('Error getting hint:', error);
    return NextResponse.json({ error: 'Failed to get hint' }, { status: 500 });
  }
}
