import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  isLoading?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const heroRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const singleSpanRef = useRef<HTMLSpanElement>(null);

  // Marquee velocity state
  const offsetRef = useRef<number>(0);
  const currentSpeedRef = useRef<number>(-1.6); // default leftward drift
  const targetSpeedRef = useRef<number>(-1.6);
  const lastMouseXRef = useRef<number>(0);
  const isHoveredOnTextRef = useRef<boolean>(false);

  // Check prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  // Kinetic Interactive Marquee Animation Loop
  useEffect(() => {
    if (prefersReducedMotion) return;

    let animId: number;

    const tick = () => {
      if (trackRef.current && singleSpanRef.current) {
        const singleWidth = singleSpanRef.current.offsetWidth || 1200;

        // Smooth acceleration / deceleration toward targetSpeed
        currentSpeedRef.current +=
          (targetSpeedRef.current - currentSpeedRef.current) * 0.08;

        offsetRef.current += currentSpeedRef.current;

        // Seamless infinite loop wrapping in both directions
        if (offsetRef.current <= -singleWidth) {
          offsetRef.current += singleWidth;
        } else if (offsetRef.current >= 0) {
          offsetRef.current -= singleWidth;
        }

        trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [prefersReducedMotion]);

  // Mouse Move Interaction: Parallax on portrait + dynamic marquee steering
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion || !heroRef.current) return;

    const rect = heroRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const normX = (mouseX - rect.width / 2) / (rect.width / 2);
    const normY = (mouseY - rect.height / 2) / (rect.height / 2);

    // 1. Subtle 3D portrait parallax
    if (portraitRef.current) {
      gsap.to(portraitRef.current, {
        x: normX * 14,
        y: normY * 8,
        rotateY: normX * 3,
        rotateX: -normY * 2,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    // 2. Dynamic marquee steering based on mouse velocity
    const deltaX = e.clientX - lastMouseXRef.current;
    lastMouseXRef.current = e.clientX;

    if (isHoveredOnTextRef.current) {
      if (Math.abs(deltaX) > 1) {
        targetSpeedRef.current = deltaX > 0 ? 1.8 : -2.4;
      } else {
        targetSpeedRef.current = -0.3; // dramatically slowed down crawl
      }
    }
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return;

    if (portraitRef.current) {
      gsap.to(portraitRef.current, {
        x: 0,
        y: 0,
        rotateY: 0,
        rotateX: 0,
        duration: 1.2,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }

    isHoveredOnTextRef.current = false;
    targetSpeedRef.current = -1.6; // return to normal flow
  };

  // Text hover triggers
  const handleTextMouseEnter = () => {
    isHoveredOnTextRef.current = true;
    targetSpeedRef.current = -0.3;
  };

  const handleTextMouseLeave = () => {
    isHoveredOnTextRef.current = false;
    targetSpeedRef.current = -1.6;
  };

  // Stacking Sections with Scale-Down Parallax (Scrubbed smoothly via GSAP ScrollTrigger)
  useEffect(() => {
    if (prefersReducedMotion || !heroRef.current) return;

    // Ensure pristine full-bleed initial state: scale 1, full brightness, 0 border radius
    gsap.set(heroRef.current, {
      scale: 1,
      filter: 'brightness(1)',
      borderRadius: '0px',
      transformOrigin: 'center top',
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        {
          scale: 1,
          filter: 'brightness(1)',
          borderRadius: '0px',
        },
        {
          scale: 0.92,
          filter: 'brightness(0.65)',
          borderRadius: '28px',
          transformOrigin: 'center top',
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="sticky top-0 z-10 h-screen max-h-screen w-full flex flex-col justify-between pt-24 pb-8 px-6 sm:px-12 md:px-16 overflow-hidden select-none origin-top will-change-transform"
      style={{
        background:
          'radial-gradient(ellipse at 50% 44%, #7DD3FC 0%, #38BDF8 26%, #2563EB 58%, #1D4ED8 80%, #1538A6 100%)',
      }}
    >
      {/* 1. Subtle Organic Film Grain Overlay */}
      <div className="film-grain-overlay" />

      {/* 2. Solusi 2: Balanced Ambient Lighting (Tidak bocor ke area navbar) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft volumetric halo centered behind torso & shoulders */}
        <div className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[520px] bg-white/30 rounded-full blur-[130px]" />
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-blue-700/30 rounded-full blur-[130px]" />
        <div className="absolute -bottom-28 -right-28 w-[640px] h-[640px] bg-blue-900/40 rounded-full blur-[140px]" />

        {/* Blueprint hairline grid */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(#1D4ED8 1px, transparent 1px), linear-gradient(90deg, #1D4ED8 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Spacer to push content naturally */}
      <div className="w-full flex-1" />

      {/* 
        3. Sandwich Layer 1 (Back): Tall, Condensed Editorial Marquee (Level Bahu & Leher)
        Ref: Drama Owns aesthetic.
      */}
      <div
        onMouseEnter={handleTextMouseEnter}
        onMouseLeave={handleTextMouseLeave}
        className="absolute bottom-[28%] sm:bottom-[30%] md:bottom-[32%] lg:bottom-[34%] left-0 w-full overflow-hidden select-none z-10 cursor-pointer py-4"
      >
        <div
          ref={trackRef}
          className="flex whitespace-nowrap will-change-transform"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          {/* Loop Segment 1 */}
          <span
            ref={singleSpanRef}
            className="flex items-center text-[18vw] sm:text-[17vw] md:text-[15vw] lg:text-[14vw] font-bebas font-normal tracking-wide text-white drop-shadow-[0_16px_40px_rgba(29,78,216,0.3)] leading-none shrink-0 pr-8 sm:pr-14"
          >
            ABU DEVIS JALALUDDIN RUMI <span className="mx-6 sm:mx-10 text-sky-200/70 font-light">—</span>
          </span>

          {/* Loop Segment 2 */}
          <span className="flex items-center text-[18vw] sm:text-[17vw] md:text-[15vw] lg:text-[14vw] font-bebas font-normal tracking-wide text-white drop-shadow-[0_16px_40px_rgba(29,78,216,0.3)] leading-none shrink-0 pr-8 sm:pr-14">
            ABU DEVIS JALALUDDIN RUMI <span className="mx-6 sm:mx-10 text-sky-200/70 font-light">—</span>
          </span>

          {/* Loop Segment 3 */}
          <span className="flex items-center text-[18vw] sm:text-[17vw] md:text-[15vw] lg:text-[14vw] font-bebas font-normal tracking-wide text-white drop-shadow-[0_16px_40px_rgba(29,78,216,0.3)] leading-none shrink-0 pr-8 sm:pr-14">
            ABU DEVIS JALALUDDIN RUMI <span className="mx-6 sm:mx-10 text-sky-200/70 font-light">—</span>
          </span>
        </div>
      </div>

      {/* 
        4. Sandwich Layer 2 (Front): Commanding Cutout Portrait with Breathing Room
        Scaled to 80-84vh to provide a generous, comfortable gap below the floating navbar.
      */}
      <div className="absolute bottom-0 inset-x-0 flex justify-center pointer-events-none z-20">
        <div
          ref={portraitRef}
          className="relative -translate-x-2 sm:-translate-x-3 h-[76vh] sm:h-[80vh] md:h-[82vh] lg:h-[84vh] max-h-[860px] flex items-end justify-center pointer-events-none will-change-transform"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          <picture className="h-full w-auto max-w-full block">
            <source srcSet="/assets/devis_portrait_polished.webp" type="image/webp" />
            <img
              src="/assets/devis_portrait_polished.png"
              alt="Abu Devis Jalaluddin Rumi"
              className="h-full w-auto max-w-full object-contain object-bottom select-none filter contrast-[1.03] brightness-[1.01] drop-shadow-[0_32px_60px_rgba(15,23,42,0.4)]"
              loading="eager"
            />
          </picture>
        </div>
      </div>

      {/* 
        5. Clean Minimalist Bottom Horizon (Ref: Drama Owns)
      */}
      <div className="w-full z-30 flex items-center justify-between text-white/90 text-xs sm:text-sm font-mono tracking-wider pointer-events-none">
        {/* Left: Clean Tagline */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
          <span>Software Engineering · IDN Polytechnic</span>
        </div>

        {/* Right: Clean Origin / Telemetry */}
        <div className="hidden sm:flex items-center gap-2 text-white/80 pointer-events-auto">
          <span>Bogor, Indonesia</span>
          <span className="text-white/40">//</span>
          <span className="text-sky-200">06°35′S 106°47′E</span>
        </div>
      </div>
    </section>
  );
};
