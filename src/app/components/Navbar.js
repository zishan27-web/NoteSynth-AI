'use client';

import Link from 'next/link';

export default function Navbar({ onMenuClick }) {
  return (
    <nav className="p-3 bg-slate-950 border-b border-gray-700 text-white">
      <div className="flex justify-between items-center">
        {/* Hamburger Menu Button */}
        <button onClick={onMenuClick} className="p-2 rounded-3xl bg-gray-800">
          <img src="/menu.png" alt="Open sidebar" className="w-3 h-3 invert hover:cursor-pointer hover:scale-110 transition-transform duration-400 " />
        </button>

        <Link href="/" className="text-3xl font-bold text-amber-500">
          NoteSynth AI
        </Link>

        {/* Placeholder for future login button */}
        <div className="w-8">
            <button>
                
            </button>
        </div>
      </div>
    </nav>
  );
}