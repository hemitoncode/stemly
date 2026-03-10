'use client';

import { useState } from 'react';

interface WinModalProps {
  numGuesses: number;
  onSubmit: (username: string) => void;
  isSubmitting: boolean;
  submitted: boolean;
}

export default function WinModal({ numGuesses, onSubmit, isSubmitting, submitted }: WinModalProps) {
  const [username, setUsername] = useState('');

  const getMessage = () => {
    if (numGuesses === 1) return '🤯 Genius!';
    if (numGuesses === 2) return '🔬 Magnificent!';
    if (numGuesses === 3) return '🧬 Impressive!';
    if (numGuesses === 4) return '🔭 Splendid!';
    if (numGuesses === 5) return '⚗️ Great!';
    return '🧪 Phew!';
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 bounce-in">
      <div className="bg-[#1F2937] border border-[#7C3AED]/50 rounded-2xl p-8 max-w-sm w-full shadow-2xl shadow-purple-900/30">
        <h2 className="text-3xl font-bold text-center mb-2 text-[#A78BFA]">{getMessage()}</h2>
        <p className="text-center text-[#9CA3AF] mb-6">
          You solved it in <span className="text-[#8B5CF6] font-bold">{numGuesses}</span> {numGuesses === 1 ? 'guess' : 'guesses'}!
        </p>
        
        {!submitted ? (
          <form onSubmit={(e) => { e.preventDefault(); if (username.trim()) onSubmit(username.trim()); }} className="space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name for the leaderboard"
              className="w-full px-4 py-3 bg-[#374151] border border-[#4B5563] rounded-xl text-white placeholder-[#6B7280] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all"
              maxLength={30}
              autoFocus
            />
            <button
              type="submit"
              disabled={!username.trim() || isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:from-[#8B5CF6] hover:to-[#7C3AED] text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {isSubmitting ? 'Submitting...' : 'Record My Score! 🏆'}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-green-400 font-semibold text-lg">✅ Score recorded!</p>
            <p className="text-[#6B7280] text-sm mt-2">Click &quot;New Game&quot; below for another STEM word!</p>
          </div>
        )}
      </div>
    </div>
  );
}
