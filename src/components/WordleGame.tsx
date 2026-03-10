'use client';

import { useState, useEffect, useCallback } from 'react';
import { LetterResult, LetterStatus } from '@/lib/types';
import GameBoard from './GameBoard';
import Keyboard from './Keyboard';
import WinModal from './WinModal';
import LoseModal from './LoseModal';
import Header from './Header';
import Toast from './Toast';
import HintButton from './HintButton';

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;
const STORAGE_KEY = 'stemly_game_token';

export default function WordleGame() {
  const [gameToken, setGameToken] = useState<string | null>(null);
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
  const [initializing, setInitializing] = useState(true);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hints, setHints] = useState<string[]>([]);
  const [hintCategory, setHintCategory] = useState<string | null>(null);
  const [isHintLoading, setIsHintLoading] = useState(false);
  const MAX_HINTS = 3;

  const showToast = useCallback((msg: string) => {
    setToast(msg);
  }, []);

  // Initialize game: fetch a new token and store in localStorage
  const startNewGame = useCallback(async () => {
    setInitializing(true);
    try {
      const res = await fetch('/api/new-game');
      if (!res.ok) throw new Error('Failed to start new game');
      const data = await res.json();
      localStorage.setItem(STORAGE_KEY, data.gameToken);
      setGameToken(data.gameToken);
      setGuesses([]);
      setResults([]);
      setCurrentGuess('');
      setGameOver(false);
      setWon(false);
      setLostWord('');
      setShowLoseModal(false);
      setLetterStatuses({});
      setSubmitted(false);
      setHintsUsed(0);
      setHints([]);
      setHintCategory(null);
    } catch (err) {
      console.error('Failed to initialize game:', err);
      showToast('Failed to start game. Retrying...');
      setTimeout(async () => {
        try {
          const res = await fetch('/api/new-game');
          if (!res.ok) throw new Error('Retry failed');
          const data = await res.json();
          localStorage.setItem(STORAGE_KEY, data.gameToken);
          setGameToken(data.gameToken);
        } catch {
          showToast('Could not connect to server.');
        }
      }, 2000);
    } finally {
      setInitializing(false);
    }
  }, [showToast]);

  // On mount, always start a fresh game
  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  const handleRequestHint = useCallback(async () => {
    if (!gameToken || hintsUsed >= MAX_HINTS || isHintLoading) return;
    setIsHintLoading(true);
    try {
      const res = await fetch('/api/get-hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameToken, hintIndex: hintsUsed }),
      });
      if (!res.ok) {
        showToast('Failed to get hint');
        setIsHintLoading(false);
        return;
      }
      const data = await res.json();
      setHints(prev => [...prev, data.hint]);
      setHintCategory(data.category);
      setHintsUsed(prev => prev + 1);
    } catch (err) {
      showToast('Network error getting hint');
      console.error(err);
    }
    setIsHintLoading(false);
  }, [gameToken, hintsUsed, isHintLoading, showToast]);

  const handleKey = useCallback(async (key: string) => {
    if (gameOver || isLoading || !gameToken) return;

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
          body: JSON.stringify({ guess: currentGuess.toLowerCase(), gameToken }),
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
          try {
            const revealRes = await fetch('/api/reveal-word', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ gameToken }),
            });
            const revealData = await revealRes.json();
            setLostWord(revealData.word || '?????');
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
  }, [currentGuess, gameOver, guesses, isLoading, letterStatuses, results, showToast, gameToken]);

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
        body: JSON.stringify({ username, numGuesses: guesses.length, gameToken }),
      });
      setSubmitted(true);
    } catch (err) {
      showToast('Failed to record score');
      console.error(err);
    }
    setIsSubmitting(false);
  };

  if (initializing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Header />
        <div className="mt-8 text-[#8B5CF6] text-lg animate-pulse">Loading your puzzle...</div>
      </div>
    );
  }

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

        <HintButton
          hintsUsed={hintsUsed}
          maxHints={MAX_HINTS}
          hints={hints}
          category={hintCategory}
          onRequestHint={handleRequestHint}
          disabled={gameOver}
          isLoading={isHintLoading}
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
        <button
          onClick={startNewGame}
          className="text-[#8B5CF6] hover:text-[#A78BFA] underline mr-4 transition-colors"
        >
          New Game
        </button>
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
