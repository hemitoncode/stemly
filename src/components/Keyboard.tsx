'use client';

import { LetterStatus } from '@/lib/types';

interface KeyboardProps {
  letterStatuses: Record<string, LetterStatus>;
  onKey: (key: string) => void;
  disabled: boolean;
}

const ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫'],
];

function getKeyColor(status: LetterStatus | undefined): string {
  switch (status) {
    case 'correct': return 'bg-green-500 hover:bg-green-600 text-white';
    case 'present': return 'bg-yellow-500 hover:bg-yellow-600 text-white';
    case 'absent': return 'bg-[#1F2937] hover:bg-[#111827] text-[#6B7280]';
    default: return 'bg-[#4B5563] hover:bg-[#6B7280] text-white';
  }
}

export default function Keyboard({ letterStatuses, onKey, disabled }: KeyboardProps) {
  return (
    <div className="flex flex-col gap-1.5 items-center w-full max-w-lg mx-auto">
      {ROWS.map((row, i) => (
        <div key={i} className="flex gap-1 justify-center w-full">
          {row.map((key) => {
            const isWide = key === 'Enter' || key === '⌫';
            const status = key.length === 1 ? letterStatuses[key] : undefined;
            return (
              <button
                key={key}
                onClick={() => onKey(key === '⌫' ? 'Backspace' : key)}
                disabled={disabled}
                className={`${isWide ? 'px-3 sm:px-4 text-xs sm:text-sm' : 'w-8 sm:w-10 text-sm sm:text-base'} h-12 sm:h-14 rounded-lg font-semibold uppercase transition-all duration-150 active:scale-95 ${getKeyColor(status)} disabled:opacity-50`}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
