import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 sm:px-12 py-5 flex items-center justify-between pointer-events-auto">
      {/* Brand logo / code by */}
      <a
        href="#hero"
        className="group flex items-center gap-2 text-sm md:text-base font-mono tracking-tight text-slate-900 hover:text-blue-600 transition-colors bg-white/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/80 shadow-sm"
      >
        <span className="text-blue-600 font-bold">©</span>
        <span className="font-semibold">Code by Devis</span>
      </a>

      {/* Nav items */}
      <nav className="flex items-center gap-2 sm:gap-4 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/80 shadow-sm text-sm md:text-base font-medium">
        <a
          href="#about"
          className="relative px-3 py-1 text-slate-700 hover:text-blue-600 font-medium transition-colors"
        >
          About
        </a>
        <a
          href="#work"
          className="relative px-3 py-1 text-slate-700 hover:text-blue-600 font-medium transition-colors"
        >
          Work
        </a>
        <a
          href="#contact"
          className="relative px-3 py-1 text-slate-700 hover:text-blue-600 font-medium transition-colors"
        >
          Contact
        </a>
      </nav>
    </header>
  );
};
