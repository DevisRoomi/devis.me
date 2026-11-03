import React, { useRef } from 'react';
import { Globe, ArrowUpRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';

interface HeroSectionProps {
  isLoading?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const heroRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  // Bio text for editorial display
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
        Centered via flexbox wrapper with subtle optical offset (-translate-x-3.5) to align head/torso axis dead-center.
        Solid 100% opaque without blur or mask fade on thighs/legs.
      */}
      <div className="absolute bottom-0 inset-x-0 flex justify-center pointer-events-none z-20">
        <div
          ref={portraitRef}
          className="relative -translate-x-3 sm:-translate-x-4 h-[72vh] sm:h-[76vh] md:h-[80vh] lg:h-[84vh] max-h-[880px] flex items-end justify-center pointer-events-none transition-transform will-change-transform"
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
      </div>

      {/* Flexible Spacer */}
      <div className="flex-1 pointer-events-none" />

      {/* 
        Bottom Section:
        - Left: Clean Editorial TRPL Student Bio
        - Right: Explore Profile CTA Button
        Clean floating layout without hard horizontal cutoff line.
      */}
      <div className="w-full z-40 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Editorial Bio Text Container */}
        <div className="relative max-w-xl">
          <p className="text-xs sm:text-sm md:text-base text-white/95 font-medium leading-relaxed select-none drop-shadow-[0_2px_8px_rgba(29,78,216,0.4)]">
            {bioText}
          </p>
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
