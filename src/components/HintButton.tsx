'use client';

interface HintButtonProps {
  hintsUsed: number;
  maxHints: number;
  hints: string[];
  category: string | null;
  onRequestHint: () => void;
  disabled: boolean;
  isLoading: boolean;
}

export default function HintButton({ hintsUsed, maxHints, hints, category, onRequestHint, disabled, isLoading }: HintButtonProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Hint display area */}
      {hints.length > 0 && (
        <div className="mb-3 space-y-2">
          {category && (
            <div className="text-center">
              <span className="inline-block px-3 py-1 bg-[#7C3AED]/20 border border-[#7C3AED]/40 rounded-full text-[#A78BFA] text-xs font-medium">
                📚 {category}
              </span>
            </div>
          )}
          {hints.map((hint, i) => (
            <div
              key={i}
              className="bg-[#1F2937]/80 border border-[#4B5563]/50 rounded-lg px-4 py-2.5 text-sm text-[#D1D5DB] bounce-in"
            >
              <span className="text-[#8B5CF6] font-semibold mr-2">Hint {i + 1}:</span>
              {hint}
            </div>
          ))}
        </div>
      )}

      {/* Hint button */}
      <button
        onClick={onRequestHint}
        disabled={disabled || hintsUsed >= maxHints || isLoading}
        className="w-full py-2.5 px-4 bg-[#7C3AED]/20 hover:bg-[#7C3AED]/30 border border-[#7C3AED]/40 hover:border-[#7C3AED]/60 text-[#A78BFA] font-medium rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <span className="animate-pulse">Loading hint...</span>
        ) : hintsUsed >= maxHints ? (
          <span>No hints remaining</span>
        ) : (
          <>
            <span>💡 Use Hint</span>
            <span className="text-xs opacity-70">({maxHints - hintsUsed} remaining)</span>
          </>
        )}
      </button>
    </div>
  );
}
