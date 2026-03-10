import { NextResponse } from 'next/server';
import { decryptWord } from '@/lib/crypto';
import { LetterResult } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const { guess, gameToken } = await request.json();

    if (!guess || typeof guess !== 'string' || !/^[a-z]{5}$/.test(guess)) {
      return NextResponse.json(
        { error: 'Invalid guess. Must be exactly 5 lowercase letters.' },
        { status: 400 }
      );
    }

    if (!gameToken || typeof gameToken !== 'string') {
      return NextResponse.json(
        { error: 'Missing game token. Start a new game.' },
        { status: 400 }
      );
    }

    let target: string;
    try {
      target = decryptWord(gameToken);
    } catch {
      return NextResponse.json(
        { error: 'Invalid or tampered game token. Start a new game.' },
        { status: 400 }
      );
    }

    if (!/^[a-z]{5}$/.test(target)) {
      return NextResponse.json(
        { error: 'Corrupted game token. Start a new game.' },
        { status: 400 }
      );
    }

    const results: LetterResult[] = new Array(5);
    const targetLetters = target.split('');
    const guessLetters = guess.split('');
    const used = new Array(5).fill(false);

    // First pass: correct positions
    for (let i = 0; i < 5; i++) {
      if (guessLetters[i] === targetLetters[i]) {
        results[i] = { letter: guessLetters[i], status: 'correct' };
        used[i] = true;
      }
    }

    // Second pass: present or absent
    for (let i = 0; i < 5; i++) {
      if (results[i]) continue;
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
