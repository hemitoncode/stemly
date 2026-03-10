import { NextResponse } from 'next/server';
import { getDailyWord } from '@/lib/daily-word-service';
import { LetterResult } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const { guess } = await request.json();

    if (!guess || typeof guess !== 'string' || !/^[a-z]{5}$/.test(guess)) {
      return NextResponse.json(
        { error: 'Invalid guess. Must be exactly 5 lowercase letters.' },
        { status: 400 }
      );
    }

    const { word: target } = await getDailyWord();
    const results: LetterResult[] = new Array(5);
    const targetLetters = target.split('');
    const guessLetters = guess.split('');

    // Track which target positions are "used"
    const used = new Array(5).fill(false);

    // First pass: mark correct positions (green)
    for (let i = 0; i < 5; i++) {
      if (guessLetters[i] === targetLetters[i]) {
        results[i] = { letter: guessLetters[i], status: 'correct' };
        used[i] = true;
      }
    }

    // Second pass: mark present (yellow) or absent (grey)
    for (let i = 0; i < 5; i++) {
      if (results[i]) continue; // already marked correct

      const targetIndex = targetLetters.findIndex(
        (letter, j) => letter === guessLetters[i] && !used[j]
      );

      if (targetIndex !== -1) {
        results[i] = { letter: guessLetters[i], status: 'present' };
        used[targetIndex] = true;
      } else {
        results[i] = { letter: guessLetters[i], status: 'absent' };
      }
    }

    const isCorrect = guess === target;
    return NextResponse.json({ results, isCorrect });
  } catch (error) {
    console.error('Error validating guess:', error);
    return NextResponse.json({ error: 'Failed to validate guess' }, { status: 500 });
  }
}
