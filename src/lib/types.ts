export type LetterStatus = 'correct' | 'present' | 'absent' | 'empty';

export interface LetterResult {
  letter: string;
  status: LetterStatus;
}

export interface GameState {
  gameToken: string;
  guesses: string[];
  results: LetterResult[][];
  currentGuess: string;
  gameOver: boolean;
  won: boolean;
  maxGuesses: number;
}
