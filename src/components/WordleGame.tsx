'use client';

import { useState, useEffect, useCallback } from 'react';
import { LetterResult, LetterStatus } from '@/lib/types';
import GameBoard from './GameBoard';
import Keyboard from './Keyboard';
import WinModal from './WinModal';
import LoseModal from './LoseModal';
import Header from './Header';
import Toast from './Toast';

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

export default function WordleGame() {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [results, setResults] = useState<LetterResult[][]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [lostWord, setLostWord] = useState('');
  const [showLoseModal, setShowLoseModal] = useState(false);
  const [letterStatuses, setLetterStatuses] = useState<Record<string, LetterStatus>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [shakingRow, setShakingRow] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
  }, []);

  const handleKey = useCallback(async (key: string) => {
    if (gameOver || isLoading) return;

    if (key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1));
      return;
    }

    if (key === 'Enter') {
      if (currentGuess.length !== WORD_LENGTH) {
        showToast('Not enough letters');
        setShakingRow(guesses.length);
        setTimeout(() => setShakingRow(null), 300);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch('/api/validate-guess', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ guess: currentGuess.toLowerCase() }),
        });
        
        const data = await res.json();
        
        if (!res.ok) {
          showToast(data.error || 'Invalid guess');
          setShakingRow(guesses.length);
          setTimeout(() => setShakingRow(null), 300);
          setIsLoading(false);
          return;
        }

        const newGuesses = [...guesses, currentGuess.toLowerCase()];
        const newResults = [...results, data.results];
        
        setGuesses(newGuesses);
        setResults(newResults);
        setCurrentGuess('');

        // Update keyboard letter statuses
        const newStatuses = { ...letterStatuses };
        data.results.forEach((r: LetterResult) => {
          const current = newStatuses[r.letter];
          if (r.status === 'correct') {
            newStatuses[r.letter] = 'correct';
          } else if (r.status === 'present' && current !== 'correct') {
            newStatuses[r.letter] = 'present';
          } else if (r.status === 'absent' && !current) {
            newStatuses[r.letter] = 'absent';
          }
        });
        setLetterStatuses(newStatuses);

        if (data.isCorrect) {
          setWon(true);
          setGameOver(true);
        } else if (newGuesses.length >= MAX_GUESSES) {
          // Fetch the word to show in lose modal
          try {
            const wordRes = await fetch('/api/daily-word');
            const wordData = await wordRes.json();
            // We need the actual word for the lose screen — add a reveal endpoint or decode
            setLostWord(atob(wordData.wordId));
          } catch {
            setLostWord('?????');
          }
          setGameOver(true);
          setTimeout(() => setShowLoseModal(true), 1500);
        }
      } catch (err) {
        showToast('Network error. Try again.');
        console.error(err);
      }
      setIsLoading(false);
      return;
    }

    // Regular letter
    if (/^[a-zA-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(prev => prev + key.toLowerCase());
    }
  }, [currentGuess, gameOver, guesses, isLoading, letterStatuses, results, showToast]);

  // Physical keyboard listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      handleKey(e.key);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleKey]);

  const handleWinSubmit = async (username: string) => {
    setIsSubmitting(true);
    try {
      await fetch('/api/record-winner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, numGuesses: guesses.length }),
      });
      setSubmitted(true);
    } catch (err) {
      showToast('Failed to record score');
      console.error(err);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
      
      <main className="flex-1 flex flex-col items-center justify-center gap-6 p-4 max-w-lg mx-auto w-full">
        <GameBoard
          guesses={guesses}
          results={results}
          currentGuess={currentGuess}
          currentRow={guesses.length}
          maxGuesses={MAX_GUESSES}
          shakingRow={shakingRow}
        />
        
        <Keyboard
          letterStatuses={letterStatuses}
          onKey={handleKey}
          disabled={gameOver || isLoading}
        />
        
        {isLoading && (
          <div className="text-[#8B5CF6] text-sm animate-pulse">Checking...</div>
        )}
      </main>

      <footer className="text-center py-3 text-[#4B5563] text-xs border-t border-[#374151]/30">
        Built with 🔬 for STEM enthusiasts
      </footer>

      {won && (
        <WinModal
          numGuesses={guesses.length}
          onSubmit={handleWinSubmit}
          isSubmitting={isSubmitting}
          submitted={submitted}
        />
      )}
      
      {showLoseModal && (
        <LoseModal word={lostWord} onClose={() => setShowLoseModal(false)} />
      )}
    </div>
  );
}
