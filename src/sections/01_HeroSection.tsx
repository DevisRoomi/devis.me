import React, { useEffect, useRef, useState } from 'react';
import { Globe, ArrowUpRight, Sparkles, RefreshCw } from 'lucide-react';
import gsap from 'gsap';

interface HeroSectionProps {
  isLoading?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isLoading = false }) => {
  const heroRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const bioContainerRef = useRef<HTMLDivElement>(null);
  const [scatterKey, setScatterKey] = useState(0);

  // Bio text for GSAP Scatter-to-Assemble animation
  const bioText =
    'TRPL student at IDN Polytechnic. Exploring software development, AI, and technology through continuous learning and hands-on projects.';

  // Parallax tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current || !portraitRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    gsap.to(portraitRef.current, {
      x: x * 18,
      y: y * 12,
      rotateY: x * 3.5,
      rotateX: -y * 2.5,
      duration: 0.8,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!portraitRef.current) return;
    gsap.to(portraitRef.current, {
      x: 0,
      y: 0,
      rotateY: 0,
      rotateX: 0,
      duration: 1.2,
      ease: 'power3.out',
    });
  };

  // GSAP Scatter-to-Assemble Text Animation for Bio
  useEffect(() => {
    if (isLoading) return;
    if (!bioContainerRef.current) return;

    const chars = bioContainerRef.current.querySelectorAll('.scatter-char');
    if (chars.length === 0) return;

    // Assemble animation using fromTo to guarantee final rendered state
    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        {
          x: () => gsap.utils.random(-80, 80),
          y: () => gsap.utils.random(-40, 40),
          rotation: () => gsap.utils.random(-25, 25),
          scale: () => gsap.utils.random(0.6, 1.4),
          opacity: 0,
          filter: 'blur(6px)',
        },
        {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.1,
          stagger: {
            amount: 0.65,
            from: 'random',
          },
          ease: 'power3.out',
          delay: 0.2,
        }
      );
    }, bioContainerRef);

    return () => ctx.revert();
  }, [scatterKey, isLoading]);

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen max-h-screen w-full flex flex-col justify-between pt-16 sm:pt-20 pb-4 sm:pb-5 px-6 sm:px-12 overflow-hidden select-none"
      style={{
        background:
          'radial-gradient(ellipse at 50% 28%, #BAE6FD 0%, #7DD3FC 24%, #38BDF8 52%, #2563EB 82%, #1D4ED8 100%)',
      }}
    >
      {/* Editorial Ambient Luminous Layer: Soft white halo & sky dispersion */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft White Center Corona behind subject */}
        <div className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[480px] bg-white/40 rounded-full blur-[100px]" />
        <div className="absolute -top-16 -left-16 w-[450px] h-[450px] bg-sky-200/50 rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-blue-600/35 rounded-full blur-[130px]" />

        {/* Minimal High-End Editorial Blueprint Grid Accent */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#1D4ED8 1px, transparent 1px), linear-gradient(90deg, #1D4ED8 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Top Meta Bar */}
      <div className="w-full flex items-center justify-between gap-4 z-40">
        {/* Location Status Pill (Dennis Snellenberg Style) */}
        <div className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/85 hover:bg-white text-slate-900 border border-white/70 shadow-[0_4px_20px_rgba(29,78,216,0.15)] backdrop-blur-md text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer">
          <Globe className="w-4 h-4 text-blue-600 group-hover:rotate-45 transition-transform duration-500" />
          <span>Located in Bogor, Indonesia</span>
        </div>

        {/* Role Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 hover:bg-white text-slate-900 border border-white/70 shadow-[0_4px_20px_rgba(29,78,216,0.15)] backdrop-blur-md text-xs sm:text-sm font-mono tracking-wide transition-all duration-300">
          <Sparkles className="w-4 h-4 text-blue-600 animate-spin" style={{ animationDuration: '9s' }} />
          <span className="font-semibold uppercase tracking-wider text-blue-900">Software Engineering Student</span>
        </div>
      </div>

      {/* 
        1. Continuous Rolling Sideways Marquee (Dennis Snellenberg Signature)
        Spans 100% of viewport edge-to-edge (w-screen) so text never cuts off before screen border.
        Placed at z-10 behind the large portrait.
      */}
      <div className="absolute bottom-[20%] sm:bottom-[22%] md:bottom-[24%] left-0 w-full overflow-hidden select-none pointer-events-none z-10">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {/* Track 1 */}
          <div className="flex items-center text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[13rem] font-sans font-black tracking-tighter text-white drop-shadow-[0_12px_32px_rgba(29,78,216,0.35)] leading-none pr-12">
            <span>Abu Devis Jalaluddin Rumi</span>
            <span className="mx-6 sm:mx-10 text-sky-100 font-light opacity-90">—</span>
            <span>Abu Devis Jalaluddin Rumi</span>
            <span className="mx-6 sm:mx-10 text-sky-100 font-light opacity-90">—</span>
          </div>
          {/* Track 2 for seamless infinite loop */}
          <div className="flex items-center text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[13rem] font-sans font-black tracking-tighter text-white drop-shadow-[0_12px_32px_rgba(29,78,216,0.35)] leading-none pr-12">
            <span>Abu Devis Jalaluddin Rumi</span>
            <span className="mx-6 sm:mx-10 text-sky-100 font-light opacity-90">—</span>
            <span>Abu Devis Jalaluddin Rumi</span>
            <span className="mx-6 sm:mx-10 text-sky-100 font-light opacity-90">—</span>
          </div>
        </div>
      </div>

      {/* 
        2. Commanding Prominent Polished Cutout Portrait
        Anchored at bottom-0, scaled up to 76vh matching user doodle, with z-20 depth over marquee.
      */}
      <div
        ref={portraitRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[68vh] sm:h-[72vh] md:h-[76vh] lg:h-[78vh] max-h-[820px] flex items-end justify-center pointer-events-none transition-transform will-change-transform z-20"
      >
        <picture className="h-full w-auto max-w-full block">
          <source srcSet="/assets/devis_portrait_polished.webp" type="image/webp" />
          <img
            src="/assets/devis_portrait_polished.png"
            alt="Abu Devis Jalaluddin Rumi"
            className="h-full w-auto max-w-full object-contain object-bottom select-none filter contrast-[1.03] brightness-[1.01] drop-shadow-[0_28px_50px_rgba(15,23,42,0.35)]"
            loading="eager"
          />
        </picture>
      </div>

      {/* Flexible Spacer */}
      <div className="flex-1 pointer-events-none" />

      {/* 
        Bottom Section:
        - Left: Scatter-to-Assemble Text Animation for TRPL Student Bio
        - Right: Explore Profile CTA Button
      */}
      <div className="w-full z-40 pt-3 border-t border-white/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 backdrop-blur-[3px]">
        {/* Scatter-to-Assemble Bio Text Container */}
        <div className="relative max-w-2xl">
          <div
            ref={bioContainerRef}
            key={scatterKey}
            className="text-xs sm:text-sm md:text-base text-white font-medium leading-relaxed select-none drop-shadow-[0_2px_8px_rgba(29,78,216,0.4)]"
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
            className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-mono text-white/80 hover:text-white transition-colors duration-200 group"
          >
            <RefreshCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
            <span className="underline decoration-dotted underline-offset-4">Replay Scatter Effect</span>
          </button>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <a
            href="#about"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white hover:bg-white/90 text-blue-900 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-[0_4px_20px_rgba(29,78,216,0.25)] hover:shadow-[0_6px_25px_rgba(29,78,216,0.35)] hover:scale-105 group pointer-events-auto"
          >
            <span>Explore Engineering Profile</span>
            <ArrowUpRight className="w-4 h-4 ml-2 text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
