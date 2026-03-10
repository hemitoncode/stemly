export interface DailyWord {
  id: string;
  word: string;
  date: string;
  created_at: string;
}

export interface Winner {
  id: string;
  username: string;
  word_date: string;
  guessed_at: string;
  num_guesses: number;
}

export type LetterStatus = 'correct' | 'present' | 'absent' | 'empty';

export interface LetterResult {
  letter: string;
  status: LetterStatus;
}

export interface GameState {
  guesses: string[];
  results: LetterResult[][];
  currentGuess: string;
  gameOver: boolean;
  won: boolean;
  maxGuesses: number;
}
