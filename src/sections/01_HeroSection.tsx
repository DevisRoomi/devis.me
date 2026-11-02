import React, { useEffect, useRef, useState } from 'react';
import { Globe, ArrowUpRight, Sparkles, RefreshCw } from 'lucide-react';
import gsap from 'gsap';

interface HeroSectionProps {
  isLoading?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isLoading = false }) => {
  const heroRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const nameContainerRef = useRef<HTMLDivElement>(null);
  const bioContainerRef = useRef<HTMLDivElement>(null);
  const [scatterKey, setScatterKey] = useState(0);

  // Mouse coordinate state for proximity physics
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, active: false });

  // Bio text for Scatter-to-Assemble animation
  const bioText =
    'TRPL student at IDN Polytechnic. Exploring software development, AI, and technology through continuous learning and hands-on projects.';

  // 1. Mouse move handler for proximity effects on interactive text
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x, y, active: true });

    // Subtle 3D portrait parallax
    if (portraitRef.current) {
      gsap.to(portraitRef.current, {
        x: x * 0.02,
        y: y * 0.02,
        rotateY: x * 0.015,
        rotateX: -y * 0.015,
        duration: 0.8,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0, active: false });
    if (portraitRef.current) {
      gsap.to(portraitRef.current, {
        x: 0,
        y: 0,
        rotateY: 0,
        rotateX: 0,
        duration: 1.2,
        ease: 'power3.out',
      });
    }
  };

  // 2. Playful cute bounce on name characters when hovered
  const handleCharHover = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = e.currentTarget;
    gsap.killTweensOf(el);
    const randomAngle = (Math.random() - 0.5) * 35;
    const randomY = -12 - Math.random() * 14;

    gsap.timeline()
      .to(el, {
        y: randomY,
        rotation: randomAngle,
        scale: 1.25,
        color: '#FFFFFF',
        textShadow: '0 0 20px rgba(179, 205, 224, 0.9), 0 0 40px rgba(43, 92, 146, 0.8)',
        duration: 0.22,
        ease: 'back.out(2)',
      })
      .to(el, {
        y: 0,
        rotation: 0,
        scale: 1,
        color: 'inherit',
        textShadow: '0 10px 30px rgba(12, 20, 70, 0.9)',
        duration: 0.65,
        ease: 'elastic.out(1.2, 0.35)',
      });
  };

  // 3. GSAP Scatter-to-Assemble Text Animation for Bio
  useEffect(() => {
    if (isLoading) return;
    if (!bioContainerRef.current) return;

    const chars = bioContainerRef.current.querySelectorAll('.scatter-char');
    if (chars.length === 0) return;

    // Initial state: letters completely scattered across space with blur
    gsap.set(chars, {
      x: () => gsap.utils.random(-140, 140),
      y: () => gsap.utils.random(-90, 90),
      rotation: () => gsap.utils.random(-45, 45),
      scale: () => gsap.utils.random(0.2, 1.8),
      opacity: 0,
      filter: 'blur(10px)',
    });

    // Assemble animation: smooth easing to crisp original positions
    const ctx = gsap.context(() => {
      gsap.to(chars, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.5,
        stagger: {
          amount: 0.9,
          from: 'random',
        },
        ease: 'power3.out',
        delay: 0.4,
      });
    }, bioContainerRef);

    return () => ctx.revert();
  }, [scatterKey, isLoading]);

  // Name split into individual characters for cute playful wave
  const nameString = 'Abu Devis Jalaluddin Rumi';

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen max-h-screen w-full flex flex-col justify-between pt-16 sm:pt-20 pb-4 sm:pb-6 px-6 sm:px-12 overflow-hidden select-none"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #1e3d6e 0%, #132752 45%, #0C1446 85%)',
      }}
    >
      {/* Starry Night Sparkles & Celestial Subtle Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Indigo Mesh Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#2B5C92]/25 rounded-full blur-[130px]" />
        <div className="absolute bottom-10 left-1/4 w-[450px] h-[350px] bg-[#162B67]/35 rounded-full blur-[110px]" />

        {/* Ambient Twinkling Micro Stars */}
        <svg className="absolute inset-0 w-full h-full opacity-65" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="star-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#B3CDE0" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#2B5C92" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Twinkling star particles */}
          {[
            { cx: '12%', cy: '18%', r: 2.0, dur: '3.2s' },
            { cx: '22%', cy: '35%', r: 1.5, dur: '4.5s' },
            { cx: '35%', cy: '14%', r: 2.2, dur: '2.8s' },
            { cx: '48%', cy: '22%', r: 1.2, dur: '5.1s' },
            { cx: '64%', cy: '16%', r: 2.5, dur: '3.7s' },
            { cx: '78%', cy: '28%', r: 1.8, dur: '4.2s' },
            { cx: '88%', cy: '19%', r: 2.0, dur: '3.0s' },
            { cx: '15%', cy: '72%', r: 1.6, dur: '4.8s' },
            { cx: '82%', cy: '68%', r: 2.4, dur: '3.5s' },
            { cx: '92%', cy: '82%', r: 1.4, dur: '4.0s' },
            { cx: '28%', cy: '85%', r: 2.0, dur: '3.3s' },
            { cx: '72%', cy: '88%', r: 1.5, dur: '5.0s' },
          ].map((star, i) => (
            <circle
              key={i}
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              fill="url(#star-glow)"
              className="animate-pulse"
              style={{ animationDuration: star.dur }}
            />
          ))}

          {/* Subtle Constellation Lines */}
          <line x1="12%" y1="18%" x2="22%" y2="35%" stroke="#B3CDE0" strokeWidth="0.5" strokeDasharray="3 4" strokeOpacity="0.25" />
          <line x1="22%" y1="35%" x2="35%" y2="14%" stroke="#B3CDE0" strokeWidth="0.5" strokeDasharray="3 4" strokeOpacity="0.25" />
          <line x1="64%" y1="16%" x2="78%" y2="28%" stroke="#B3CDE0" strokeWidth="0.5" strokeDasharray="3 4" strokeOpacity="0.25" />
          <line x1="78%" y1="28%" x2="88%" y2="19%" stroke="#B3CDE0" strokeWidth="0.5" strokeDasharray="3 4" strokeOpacity="0.25" />
        </svg>

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#B3CDE0 1px, transparent 1px), linear-gradient(90deg, #B3CDE0 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Top Meta Bar */}
      <div className="w-full flex items-center justify-between gap-4 z-30 pt-2">
        {/* Location Status Pill with interactive magnetic drift */}
        <div
          className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-soft-indigo/50 bg-[#0C1446]/60 backdrop-blur-md text-xs sm:text-sm text-ice-blue shadow-[0_4px_20px_rgba(12,20,70,0.5)] transition-all duration-300 hover:border-ice-blue/60 hover:scale-105 cursor-pointer"
          style={{
            transform: mousePos.active
              ? `translate3d(${mousePos.x * 0.015}px, ${mousePos.y * 0.015}px, 0)`
              : undefined,
          }}
        >
          <Globe className="w-4 h-4 text-ice-blue group-hover:text-white group-hover:rotate-45 transition-all duration-500" />
          <span className="font-sans">Bogor, Indonesia • 06°35'S 106°47'E</span>
        </div>

        {/* Role with Arrow & Proximity shift */}
        <div
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-ice-blue/80 transition-transform duration-300 hover:text-white cursor-pointer"
          style={{
            transform: mousePos.active
              ? `translate3d(${mousePos.x * -0.015}px, ${mousePos.y * -0.015}px, 0)`
              : undefined,
          }}
        >
          <Sparkles className="w-4 h-4 text-ice-blue animate-spin" style={{ animationDuration: '10s' }} />
          <span className="tracking-widest uppercase font-semibold text-white drop-shadow-[0_2px_8px_rgba(43,92,146,0.6)]">
            TRPL Software Engineer
          </span>
        </div>
      </div>

      {/* Center Stage: Enlarged Cutout Portrait + Floating Foreground Name Across Torso */}
      <div className="relative flex-1 flex items-center justify-center my-0 z-20 w-full max-w-7xl mx-auto">
        {/* Enlarged Subject Cutout (Bromo background removed completely) */}
        <div
          ref={portraitRef}
          className="relative w-full h-[45vh] sm:h-[49vh] md:h-[53vh] max-h-[520px] flex items-end justify-center pointer-events-none transition-transform will-change-transform"
        >
          {/* Subtle Backglow behind subject */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] rounded-full bg-soft-indigo/35 blur-[90px] -z-10 pointer-events-none" />

          {/* Clean Cutout Image */}
          <picture className="h-full w-auto max-w-full block relative z-10 pointer-events-auto">
            <source srcSet="/assets/hero_portrait_cutout.webp" type="image/webp" />
            <img
              src="/assets/hero_portrait_cutout.png"
              alt="Abu Devis Jalaluddin Rumi"
              className="h-full w-auto max-w-full object-contain object-bottom select-none filter contrast-[1.04] brightness-[1.02] drop-shadow-[0_20px_45px_rgba(12,20,70,0.85)]"
              loading="eager"
            />
          </picture>

          {/* 
            FOREGROUND NAME: Sits directly in front of the portrait at stomach/belly height 
            Font: Cormorant Garamond luxury editorial
            Features: Cute playful bouncing letter physics on hover, magnetic offset 
          */}
          <div
            ref={nameContainerRef}
            className="absolute bottom-[2%] sm:bottom-[3%] md:bottom-[4%] left-0 w-full z-30 pointer-events-none flex flex-col items-center justify-center text-center px-4"
          >
            <div
              className="pointer-events-auto inline-block cursor-default group"
              style={{
                transform: mousePos.active
                  ? `translate3d(${mousePos.x * 0.025}px, ${mousePos.y * 0.02}px, 0)`
                  : undefined,
                transition: 'transform 0.15s ease-out',
              }}
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif italic font-normal tracking-tight text-white drop-shadow-[0_12px_30px_rgba(12,20,70,0.95)] leading-none select-none">
                {nameString.split('').map((char, index) => {
                  if (char === ' ') {
                    return <span key={index} className="inline-block w-2.5 sm:w-4 md:w-5" />;
                  }
                  return (
                    <span
                      key={index}
                      onMouseEnter={handleCharHover}
                      className="name-char inline-block cursor-pointer transition-colors duration-200 hover:text-ice-blue will-change-transform select-none"
                      style={{
                        display: 'inline-block',
                      }}
                    >
                      {char}
                    </span>
                  );
                })}
              </h1>

              {/* Sub-label under name with gentle pulse */}
              <div className="flex items-center justify-center gap-3 mt-1.5 sm:mt-2 opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="h-[1px] w-6 sm:w-12 bg-ice-blue/50" />
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-ice-blue/90 drop-shadow-[0_2px_10px_rgba(43,92,146,0.8)]">
                  DEVIS® • ARCHITECTURAL SOFTWARE ENGINEER
                </span>
                <span className="h-[1px] w-6 sm:w-12 bg-ice-blue/50" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
        Bottom Section:
        - Left: Scatter-to-Assemble Text Animation for TRPL Student Bio
        - Right: Explore Profile CTA Button
      */}
      <div className="w-full z-30 pt-4 border-t border-soft-indigo/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 backdrop-blur-[2px]">
        {/* Scatter-to-Assemble Bio Text Container */}
        <div className="relative max-w-2xl">
          <div
            ref={bioContainerRef}
            key={scatterKey}
            className="text-sm sm:text-base md:text-lg text-ice-blue/90 leading-relaxed font-normal select-none"
            style={{
              transform: mousePos.active
                ? `translate3d(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px, 0)`
                : undefined,
              transition: 'transform 0.25s ease-out',
            }}
          >
            {bioText.split(' ').map((word, wIdx) => (
              <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.32em]">
                {word.split('').map((char, cIdx) => (
                  <span
                    key={cIdx}
                    className="scatter-char inline-block will-change-transform"
                    style={{ display: 'inline-block' }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </div>

          {/* Mini Interactive Re-scatter Trigger Button */}
          <button
            onClick={() => setScatterKey((prev) => prev + 1)}
            title="Re-play Scatter Animation"
            className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-mono text-ice-blue/60 hover:text-white transition-colors duration-200 group"
          >
            <RefreshCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
            <span className="underline decoration-dotted underline-offset-4">Replay Scatter Effect</span>
          </button>
        </div>

        {/* CTA Button with Starry Accent */}
        <div className="flex items-center gap-3">
          <a
            href="#about"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-soft-indigo/40 hover:bg-soft-indigo/80 border border-ice-blue/40 hover:border-ice-blue text-white text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 hover:shadow-[0_0_25px_rgba(179,205,224,0.4)] group pointer-events-auto"
            style={{
              transform: mousePos.active
                ? `translate3d(${mousePos.x * -0.015}px, ${mousePos.y * -0.015}px, 0)`
                : undefined,
            }}
          >
            <span>Explore Engineering Profile</span>
            <ArrowUpRight className="w-4 h-4 ml-2 text-ice-blue group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
