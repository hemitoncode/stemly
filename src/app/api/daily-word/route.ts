import { NextResponse } from 'next/server';
import { getDailyWord } from '@/lib/daily-word-service';

export async function GET() {
  try {
    const { word, date } = await getDailyWord();
    // Return metadata only, never the word itself
    const wordId = Buffer.from(word).toString('base64');
    return NextResponse.json({ date, wordLength: word.length, wordId });
  } catch (error) {
    console.error('Error getting daily word:', error);
    return NextResponse.json({ error: 'Failed to get daily word' }, { status: 500 });
  }
}
