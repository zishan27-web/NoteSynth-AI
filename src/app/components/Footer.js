import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-8 bg-black border-t border-gray-900 text-center text-gray-500 text-sm">
      <p>© {new Date().getFullYear()} NoteSynth AI. Built for students.</p>
    </footer>
  );
}