import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "STEMly - Daily STEM Word Puzzle",
  description: "A Wordle-inspired daily puzzle game featuring STEM vocabulary. Test your science, technology, engineering, and math knowledge!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
