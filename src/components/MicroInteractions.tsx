import React, { useRef } from 'react';
import gsap from 'gsap';

/* ═══════════════════════════════════════════════════════════════════════════
   AWWWARDS-LEVEL MICRO-INTERACTIONS
   1. RollingText: Staggered letter-by-letter slot machine / split-text flip
      - Original letter translates 0 -> -100%
      - Cloned letter translates +100% -> 0
      - Text NEVER disappears; always loops or returns seamlessly!
   2. WordFlip: Clean single-word flip for category buttons
   3. CardWordFlip: Hover flip for card action buttons (.group/card)
   4. MagneticButton: Cursor-following magnetic attraction with elastic snapback
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * 1. RollingText
 * Staggered per-letter vertical roll.
 * When parent .group is hovered, each letter flips up sequentially like a wave.
 */
interface RollingTextProps {
  text: string;
  className?: string;
  staggerMs?: number;
}

export const RollingText: React.FC<RollingTextProps> = ({
  text,
  className = '',
  staggerMs = 24,
}) => {
  return (
    <span className={`inline-flex items-center overflow-hidden select-none ${className}`}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="relative inline-flex flex-col overflow-hidden h-[1.18em]"
        >
          {/* Default visible letter (moves from 0 to -100%) */}
          <span
            className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full leading-tight"
            style={{ transitionDelay: `${i * staggerMs}ms` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
          {/* Cloned letter (starts at +100%, moves to 0 on hover) */}
          <span
            className="absolute top-0 left-0 inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-full group-hover:translate-y-0 leading-tight"
            style={{ transitionDelay: `${i * staggerMs}ms` }}
            aria-hidden="true"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </span>
  );
};

/**
 * 2. WordFlip
 * Entire word flips upward in one clean motion on hover (targets .group).
 * Perfect for category lists to avoid visual noise while providing crisp feedback.
 */
interface WordFlipProps {
  text: string;
  className?: string;
}

export const WordFlip: React.FC<WordFlipProps> = ({ text, className = '' }) => {
  return (
    <span className={`relative inline-flex flex-col overflow-hidden h-[1.18em] ${className}`}>
      <span className="inline-block transition-transform duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full leading-tight">
        {text}
      </span>
      <span
        className="absolute top-0 left-0 inline-block transition-transform duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-full group-hover:translate-y-0 leading-tight font-bold"
        aria-hidden="true"
      >
        {text}
      </span>
    </span>
  );
};

/**
 * 3. CardWordFlip
 * Specific word flip that responds to card hover (.group/card).
 * Used for "VIEW" and "EXPLORE" buttons inside project cards.
 */
export const CardWordFlip: React.FC<WordFlipProps> = ({ text, className = '' }) => {
  return (
    <span className={`relative inline-flex flex-col overflow-hidden h-[1.18em] ${className}`}>
      <span className="inline-block transition-transform duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/card:-translate-y-full leading-tight">
        {text}
      </span>
      <span
        className="absolute top-0 left-0 inline-block transition-transform duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-full group-hover/card:translate-y-0 leading-tight font-extrabold"
        aria-hidden="true"
      >
        {text}
      </span>
    </span>
  );
};

/**
 * 4. MagneticButton
 * Premium interactive button that magnetically follows the cursor within its bounds
 * and snaps back with an organic elastic spring on exit.
 */
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  strength?: number;
  style?: React.CSSProperties;
  title?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  href,
  onClick,
  strength = 0.35,
  style,
  title,
}) => {
  const btnRef = useRef<any>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, {
      x: relX * strength,
      y: relY * strength,
      duration: 0.32,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    const el = btnRef.current;
    if (!el) return;
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.65,
      ease: 'elastic.out(1, 0.38)',
    });
  };

  const commonProps = {
    ref: btnRef,
    className: `group inline-flex items-center cursor-pointer will-change-transform select-none ${className}`,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style,
    title,
  };

  if (href) {
    return (
      <a href={href} {...commonProps}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} {...commonProps}>
      {children}
    </button>
  );
};
