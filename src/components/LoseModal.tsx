'use client';

interface LoseModalProps {
  word: string;
  onClose: () => void;
}

export default function LoseModal({ word, onClose }: LoseModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 bounce-in">
      <div className="bg-[#1F2937] border border-red-500/30 rounded-2xl p-8 max-w-sm w-full shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-2 text-red-400">😔 Game Over</h2>
        <p className="text-center text-[#9CA3AF] mb-2">The word was:</p>
        <p className="text-center text-3xl font-bold text-white uppercase tracking-widest mb-6">{word}</p>
        <button
          onClick={onClose}
          className="w-full py-3 bg-[#374151] hover:bg-[#4B5563] text-white font-semibold rounded-xl transition-all active:scale-[0.98]"
        >
          Try Again! 🔬
        </button>
      </div>
    </div>
  );
}
