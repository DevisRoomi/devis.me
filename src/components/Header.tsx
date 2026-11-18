import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { RollingText, MagneticButton } from './MicroInteractions';

const NAV_ITEMS = [
  { label: 'Work', href: '#work' },
  { label: 'Nexus', href: '#nexus' },
  { label: 'Skills', href: '#foundation' },
];

export const Header: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [navTheme, setNavTheme] = useState<'hero' | 'work' | 'nexus'>('hero');

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const heroThreshold = window.innerHeight * 0.4;
      const workEl = document.getElementById('work');
      const nexusEl = document.getElementById('nexus');

      if (nexusEl && y >= nexusEl.offsetTop - 120) {
        setNavTheme('nexus');
      } else if (workEl && y >= heroThreshold) {
        setNavTheme('work');
      } else {
        setNavTheme('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const lenis = (window as unknown as { __lenis?: any }).__lenis;
    const target = document.querySelector(href);
    if (lenis && target) {
      lenis.scrollTo(target, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isShifted = navTheme === 'work' || navTheme === 'nexus';
  const isLight = navTheme === 'work' || navTheme === 'nexus';

  return (
    <header className="fixed top-3.5 sm:top-4 inset-x-0 z-50 pointer-events-none px-4 sm:px-8">
      {/* 
        ── DYNAMIC CONTEXTUAL MORPHING NAVBAR ──
        Section 1 (Hero): Centered at 50%, Smoked Navy Glass
        Section 2 (Work) & Section 3 (Nexus): Right-aligned, Clean Warm Editorial Light Theme
      */}
      <nav
        className={`pointer-events-auto absolute flex items-center gap-1 sm:gap-2 px-3 py-1.5 rounded-full will-change-transform ${
          isLight
            ? 'bg-white/90 backdrop-blur-xl border border-slate-300/80 shadow-[0_8px_30px_rgba(15,23,42,0.08)] text-slate-800'
            : 'bg-[#060b17]/85 hover:bg-[#060b17]/90 backdrop-blur-2xl border border-white/20 shadow-[0_12px_40px_rgba(2,8,24,0.55)] text-slate-200'
        }`}
        style={{
          left: isShifted ? 'calc(100% - clamp(1rem, 6vw, 7.5rem))' : '50%',
          transform: isShifted ? 'translate3d(-100%, 0, 0)' : 'translate3d(-50%, 0, 0)',
          transition:
            'left 0.85s cubic-bezier(0.25, 1, 0.5, 1), transform 0.85s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease, color 0.5s ease',
        }}
      >
        {/* Center Nav Links with Staggered Rolling Text */}
        <div className="flex items-center gap-0.5 sm:gap-1 px-1">
          {NAV_ITEMS.map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`group relative px-3 sm:px-3.5 py-1 text-xs sm:text-[13px] font-medium tracking-wide rounded-full transition-all duration-200 cursor-pointer ${
                isLight
                  ? hoveredIdx === idx
                    ? 'text-slate-950 bg-slate-100 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-950'
                  : hoveredIdx === idx
                    ? 'text-white bg-white/15 shadow-inner'
                    : 'text-slate-200 hover:text-white'
              }`}
            >
              <RollingText text={item.label} staggerMs={20} />
            </a>
          ))}
        </div>

        {/* Right Action Button: Magnetic CTA with Rolling Text */}
        <MagneticButton
          href="mailto:abudevis@gmail.com"
          strength={0.32}
          className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold tracking-tight transition-all duration-200 shrink-0 shadow-sm active:scale-95 ${
            isLight
              ? 'bg-slate-900 hover:bg-black text-white shadow-[0_4px_14px_rgba(15,23,42,0.18)]'
              : 'bg-white hover:bg-slate-100 text-[#08132e] shadow-[0_4px_16px_rgba(255,255,255,0.25)]'
          }`}
        >
          <RollingText text="Let's Talk" staggerMs={18} />
          <ArrowUpRight
            className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ml-1 ${
              isLight ? 'text-white' : 'text-[#08132e]'
            }`}
          />
        </MagneticButton>
      </nav>
    </header>
  );
};

export default Header;
