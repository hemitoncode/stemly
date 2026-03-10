'use client';

import { useEffect } from 'react';

interface ToastProps {
  message: string;
  onDismiss: () => void;
  duration?: number;
}

export default function Toast({ message, onDismiss, duration = 2000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [onDismiss, duration]);

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bounce-in">
      <div className="bg-white text-[#1F2937] px-6 py-3 rounded-xl font-semibold shadow-lg">
        {message}
      </div>
    </div>
  );
}
