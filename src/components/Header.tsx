import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-40 px-6 sm:px-12 py-6 flex items-center justify-between pointer-events-auto text-white">
      {/* Brand logo / code by */}
      <a
        href="#hero"
        className="group flex items-center gap-2 text-sm md:text-base font-mono tracking-tight hover:text-ice-blue transition-colors"
      >
        <span className="text-ice-blue font-bold">©</span>
        <span className="font-medium">Code by Devis</span>
      </a>

      {/* Nav items */}
      <nav className="flex items-center gap-6 sm:gap-10 text-sm md:text-base font-medium">
        <a
          href="#about"
          className="relative py-1 text-ice-blue/80 hover:text-white transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-ice-blue hover:after:w-full after:transition-all after:duration-300"
        >
          About
        </a>
        <a
          href="#work"
          className="relative py-1 text-ice-blue/80 hover:text-white transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-ice-blue hover:after:w-full after:transition-all after:duration-300"
        >
          Work
        </a>
        <a
          href="#contact"
          className="relative py-1 text-ice-blue/80 hover:text-white transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-ice-blue hover:after:w-full after:transition-all after:duration-300"
        >
          Contact
        </a>
      </nav>
    </header>
  );
};
