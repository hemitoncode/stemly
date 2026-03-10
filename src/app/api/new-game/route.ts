import { NextResponse } from 'next/server';
import { encryptWord } from '@/lib/crypto';
import { VALID_STEM_WORDS } from '@/lib/words';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const index = Math.floor(Math.random() * VALID_STEM_WORDS.length);
    const word = VALID_STEM_WORDS[index];
    const gameToken = encryptWord(word);
    
    return NextResponse.json({
      gameToken,
      wordLength: 5,
    });
  } catch (error) {
    console.error('Error creating new game:', error);
    return NextResponse.json({ error: 'Failed to create new game' }, { status: 500 });
  }
}
