'use client';

import { LetterResult } from '@/lib/types';

interface GameBoardProps {
  guesses: string[];
  results: LetterResult[][];
  currentGuess: string;
  currentRow: number;
  maxGuesses: number;
  shakingRow: number | null;
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'correct': return 'bg-green-500 border-green-500';
    case 'present': return 'bg-yellow-500 border-yellow-500';
    case 'absent': return 'bg-[#374151] border-[#374151]';
    default: return 'bg-transparent border-[#4B5563]';
  }
}

export default function GameBoard({ guesses, results, currentGuess, currentRow, maxGuesses, shakingRow }: GameBoardProps) {
  const rows = [];
  
  for (let i = 0; i < maxGuesses; i++) {
    const cells = [];
    
    for (let j = 0; j < 5; j++) {
      let letter = '';
      let statusClass = 'bg-transparent border-[#4B5563]';
      let animClass = '';
      
      if (i < results.length) {
        // Completed guess
        letter = results[i][j].letter;
        statusClass = getStatusColor(results[i][j].status);
        animClass = 'tile-flip';
      } else if (i === currentRow) {
        // Current guess being typed
        letter = currentGuess[j] || '';
        if (letter) {
          statusClass = 'bg-transparent border-[#8B5CF6]';
          animClass = 'tile-pop';
        }
      }
      
      cells.push(
        <div
          key={j}
          className={`w-14 h-14 sm:w-16 sm:h-16 border-2 flex items-center justify-center text-2xl font-bold uppercase rounded-lg transition-all duration-300 ${statusClass} ${animClass}`}
          style={animClass === 'tile-flip' ? { animationDelay: `${j * 0.15}s`, animationFillMode: 'both' } : {}}
        >
          {letter}
        </div>
      );
    }
    
    rows.push(
      <div key={i} className={`flex gap-1.5 ${shakingRow === i ? 'row-shake' : ''}`}>
        {cells}
      </div>
    );
  }
  
  return (
    <div className="flex flex-col gap-1.5 items-center">
      {rows}
    </div>
  );
}
