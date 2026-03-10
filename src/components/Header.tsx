'use client';

export default function Header() {
  return (
    <header className="text-center py-4 border-b border-[#374151]/50">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-r from-[#A78BFA] via-[#7C3AED] to-[#6D28D9] bg-clip-text text-transparent">
          STEM
        </span>
        <span className="text-[#9CA3AF]">ly</span>
      </h1>
      <p className="text-[#6B7280] text-sm mt-1">A daily STEM word puzzle</p>
    </header>
  );
}
