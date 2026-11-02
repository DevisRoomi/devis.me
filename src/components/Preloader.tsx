import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onLoadingComplete: () => void;
}

const WORDS = [
  'السَّلَامُ عَلَيْكُمْ',
  'Hello',
  'Bonjour',
  'Ciao',
  'Olà',
  'やあ',
  'Hallå',
  'Guten Tag',
  'Halo',
];

export const Preloader: React.FC<PreloaderProps> = ({ onLoadingComplete }) => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cycle through greeting words
  useEffect(() => {
    if (index === WORDS.length - 1) return;

    const timeout = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, index === 0 ? 320 : 180);

    return () => clearTimeout(timeout);
  }, [index]);

  // When reaching the last word ('Halo'), trigger exit animation
  useEffect(() => {
    if (index !== WORDS.length - 1 || dimension.width === 0) return;

    const { width, height } = dimension;
    const curveHeight = Math.min(250, height * 0.35);

    // Stretched downward curve during slide
    const targetCurvePath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + curveHeight} 0 ${height} Z`;
    // Flattened top path at finish
    const finalFlatPath = `M0 0 L${width} 0 L${width} 0 Q${width / 2} 0 0 0 Z`;

    const tl = gsap.timeline({
      delay: 0.25,
      onComplete: () => {
        onLoadingComplete();
      },
    });

    // 1. Text fades out smoothly
    tl.to('.preloader-text-wrap', {
      opacity: 0,
      y: -30,
      duration: 0.35,
      ease: 'power2.out',
    });

    // 2. Morph path curve downward as container slides upward
    tl.to(
      pathRef.current,
      {
        attr: { d: targetCurvePath },
        duration: 0.45,
        ease: 'power3.in',
      },
      '-=0.1'
    );

    tl.to(containerRef.current, {
      y: -height - curveHeight,
      duration: 0.85,
      ease: 'power4.inOut',
    }, '-=0.35');

    tl.to(
      pathRef.current,
      {
        attr: { d: finalFlatPath },
        duration: 0.45,
        ease: 'power3.out',
      },
      '-=0.45'
    );
  }, [index, dimension, onLoadingComplete]);

  const { width, height } = dimension;
  const initialPath =
    width > 0
      ? `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} Z`
      : '';

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-auto flex items-center justify-center bg-[#0C1446]"
      style={{ height: '100vh', width: '100vw' }}
    >
      {/* Centered Greeting Words */}
      <div className="preloader-text-wrap z-10 flex items-center justify-center gap-3 text-white">
        <span className="w-2.5 h-2.5 rounded-full bg-ice-blue inline-block animate-pulse shadow-[0_0_12px_#B3CDE0]" />
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-italiana font-normal tracking-wide text-white">
          {WORDS[index]}
        </h2>
      </div>

      {/* SVG Curve for fluid exit morphing */}
      {width > 0 && (
        <svg
          className="absolute top-0 left-0 w-full pointer-events-none fill-[#0C1446]"
          style={{ height: `calc(100% + 250px)` }}
          viewBox={`0 0 ${width} ${height + 250}`}
        >
          <path ref={pathRef} d={initialPath} />
        </svg>
      )}
    </div>
  );
};
