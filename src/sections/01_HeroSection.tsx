import React, { useRef, useState } from 'react';
import { Globe, ArrowUpRight, Sparkles, Compass } from 'lucide-react';
import gsap from 'gsap';

interface HeroSectionProps {
  isLoading?: boolean;
}

interface FloatingRune {
  id: string;
  label: string;
  x: number;
  y: number;
  origX: number;
  origY: number;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const heroRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const locationPillRef = useRef<HTMLDivElement>(null);
  const rolePillRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLAnchorElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);

  // Live telemetry coordinates
  const [coords, setCoords] = useState({ x: 0, y: 0, speed: 0 });
  const [hudActive, setHudActive] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0, time: Date.now() });

  // Absurd floating engineering tokens (Repelling physics nodes)
  const [runes, setRunes] = useState<FloatingRune[]>([
    { id: 'r1', label: 'TRPL.ARCH', x: 14, y: 22, origX: 14, origY: 22 },
    { id: 'r2', label: 'IDN.260558302012', x: 82, y: 18, origX: 82, origY: 18 },
    { id: 'r3', label: 'LAT:06°35′S', x: 8, y: 56, origX: 8, origY: 56 },
    { id: 'r4', label: 'LON:106°47′E', x: 89, y: 54, origX: 89, origY: 54 },
    { id: 'r5', label: 'SYS:60FPS', x: 18, y: 82, origX: 18, origY: 82 },
    { id: 'r6', label: 'TS.STRICT', x: 76, y: 80, origX: 76, origY: 80 },
    { id: 'r7', label: 'BUN.ENGINE', x: 26, y: 32, origX: 26, origY: 32 },
    { id: 'r8', label: 'GSAP.KINETIC', x: 73, y: 34, origX: 73, origY: 34 },
  ]);

  // Bio text for editorial display
  const bioText =
    'TRPL student at IDN Polytechnic. Exploring software development, AI, and technology through continuous learning and hands-on projects.';

  // Parallax tilt on mouse move + kinetic calculations
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const normX = (mouseX - rect.width / 2) / (rect.width / 2);
    const normY = (mouseY - rect.height / 2) / (rect.height / 2);

    // Calculate mouse speed for HUD
    const now = Date.now();
    const dt = Math.max(1, now - lastMousePos.current.time);
    const dist = Math.hypot(mouseX - lastMousePos.current.x, mouseY - lastMousePos.current.y);
    const speed = Math.round((dist / dt) * 100);
    lastMousePos.current = { x: mouseX, y: mouseY, time: now };

    setCoords({ x: Math.round(mouseX), y: Math.round(mouseY), speed });
    setHudActive(true);

    // 1. Portrait 3D Parallax Tilt (Strictly maintained)
    if (portraitRef.current) {
      gsap.to(portraitRef.current, {
        x: normX * 18,
        y: normY * 12,
        rotateY: normX * 3.5,
        rotateX: -normY * 2.5,
        duration: 0.8,
        ease: 'power2.out',
      });
    }

    // 2. Absurd Repulsion Physics for Floating Engineering Runes
    setRunes((prev) =>
      prev.map((rune) => {
        const runePxX = (rune.origX / 100) * rect.width;
        const runePxY = (rune.origY / 100) * rect.height;
        const dx = mouseX - runePxX;
        const dy = mouseY - runePxY;
        const distance = Math.hypot(dx, dy);

        // Repel threshold 140px: run away from cursor
        if (distance < 140 && distance > 0) {
          const force = (1 - distance / 140) * 40;
          const pushX = -(dx / distance) * force;
          const pushY = -(dy / distance) * force;
          return {
            ...rune,
            x: rune.origX + (pushX / rect.width) * 100,
            y: rune.origY + (pushY / rect.height) * 100,
          };
        } else {
          // Smooth spring return to original coordinates
          return {
            ...rune,
            x: rune.x + (rune.origX - rune.x) * 0.12,
            y: rune.y + (rune.origY - rune.y) * 0.12,
          };
        }
      })
    );

    // 3. Magnetic pull on Location Pill
    if (locationPillRef.current) {
      const pillRect = locationPillRef.current.getBoundingClientRect();
      const pCenterX = pillRect.left + pillRect.width / 2;
      const pCenterY = pillRect.top + pillRect.height / 2;
      const pDist = Math.hypot(e.clientX - pCenterX, e.clientY - pCenterY);

      if (pDist < 120) {
        const pull = (1 - pDist / 120) * 16;
        gsap.to(locationPillRef.current, {
          x: ((e.clientX - pCenterX) / 120) * pull,
          y: ((e.clientY - pCenterY) / 120) * pull,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(locationPillRef.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      }
    }

    // 4. Magnetic pull on Role Pill
    if (rolePillRef.current) {
      const pillRect = rolePillRef.current.getBoundingClientRect();
      const pCenterX = pillRect.left + pillRect.width / 2;
      const pCenterY = pillRect.top + pillRect.height / 2;
      const pDist = Math.hypot(e.clientX - pCenterX, e.clientY - pCenterY);

      if (pDist < 120) {
        const pull = (1 - pDist / 120) * 16;
        gsap.to(rolePillRef.current, {
          x: ((e.clientX - pCenterX) / 120) * pull,
          y: ((e.clientY - pCenterY) / 120) * pull,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(rolePillRef.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      }
    }

    // 5. Magnetic pull on CTA Button
    if (ctaBtnRef.current) {
      const btnRect = ctaBtnRef.current.getBoundingClientRect();
      const bCenterX = btnRect.left + btnRect.width / 2;
      const bCenterY = btnRect.top + btnRect.height / 2;
      const bDist = Math.hypot(e.clientX - bCenterX, e.clientY - bCenterY);

      if (bDist < 160) {
        const pull = (1 - bDist / 160) * 22;
        gsap.to(ctaBtnRef.current, {
          x: ((e.clientX - bCenterX) / 160) * pull,
          y: ((e.clientY - bCenterY) / 160) * pull,
          scale: 1.06,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(ctaBtnRef.current, { x: 0, y: 0, scale: 1, duration: 0.7, ease: 'elastic.out(1.1, 0.35)' });
      }
    }

    // 6. Bio Text subtle 3D tilt
    if (bioRef.current) {
      gsap.to(bioRef.current, {
        rotateX: -normY * 4,
        rotateY: normX * 6,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    setHudActive(false);
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
    if (locationPillRef.current) gsap.to(locationPillRef.current, { x: 0, y: 0, duration: 0.6 });
    if (rolePillRef.current) gsap.to(rolePillRef.current, { x: 0, y: 0, duration: 0.6 });
    if (ctaBtnRef.current) gsap.to(ctaBtnRef.current, { x: 0, y: 0, scale: 1, duration: 0.6 });
    if (bioRef.current) gsap.to(bioRef.current, { rotateX: 0, rotateY: 0, duration: 0.6 });
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
            backgroundImage: 'linear-gradient(#1D4ED8 1px, transparent 1px), linear-gradient(90deg, #1D4ED8 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Absurd Interactive HUD Crosshairs following cursor */}
        {hudActive && (
          <div className="absolute inset-0 pointer-events-none z-5 transition-opacity duration-300">
            {/* Horizontal guide hair */}
            <div
              className="absolute left-0 right-0 h-[1px] bg-sky-300/20 backdrop-blur-xs"
              style={{ top: `${coords.y}px` }}
            />
            {/* Vertical guide hair */}
            <div
              className="absolute top-0 bottom-0 w-[1px] bg-sky-300/20 backdrop-blur-xs"
              style={{ left: `${coords.x}px` }}
            />
            {/* Circular HUD radar target */}
            <div
              className="absolute w-12 h-12 rounded-full border border-sky-300/40 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center animate-ping pointer-events-none"
              style={{
                left: `${coords.x}px`,
                top: `${coords.y}px`,
                animationDuration: '3s',
              }}
            />
          </div>
        )}

        {/* Absurd Floating Engineering Runes (Repelled by Mouse) */}
        {runes.map((rune) => (
          <div
            key={rune.id}
            className="absolute z-10 pointer-events-none font-mono text-[9px] sm:text-[10px] font-bold tracking-widest text-white/50 bg-blue-950/25 px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-xs shadow-xs transition-transform duration-100 ease-out hidden sm:block"
            style={{
              left: `${rune.x}%`,
              top: `${rune.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {rune.label}
          </div>
        ))}
      </div>

      {/* Top Meta Bar */}
      <div className="w-full flex items-center justify-between gap-4 z-40">
        {/* Location Status Pill (Dennis Snellenberg Style with Magnetic GSAP Spring) */}
        <div
          ref={locationPillRef}
          className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/85 hover:bg-white text-slate-900 border border-white/70 shadow-[0_4px_20px_rgba(29,78,216,0.15)] backdrop-blur-md text-xs sm:text-sm font-medium transition-colors duration-300 cursor-pointer will-change-transform"
        >
          <Globe className="w-4 h-4 text-blue-600 group-hover:rotate-180 transition-transform duration-700 ease-spring" />
          <span>Located in Bogor, Indonesia</span>
          <span className="text-[10px] font-mono text-blue-700/60 hidden md:inline ml-1">
            [06°35′S]
          </span>
        </div>

        {/* Role Pill with Magnetic Spring and Dynamic Sparkle */}
        <div
          ref={rolePillRef}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 hover:bg-white text-slate-900 border border-white/70 shadow-[0_4px_20px_rgba(29,78,216,0.15)] backdrop-blur-md text-xs sm:text-sm font-mono tracking-wide transition-colors duration-300 cursor-default will-change-transform"
        >
          <Sparkles className="w-4 h-4 text-blue-600 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="font-semibold uppercase tracking-wider text-blue-900">Software Engineering Student</span>
          {hudActive && (
            <span className="text-[10px] font-mono text-emerald-600 font-bold ml-1 hidden lg:inline animate-pulse">
              ● RADAR
            </span>
          )}
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
        - Left: Clean Editorial TRPL Student Bio with 3D tilt
        - Right: Explore Profile CTA Button with magnetic bounce
        Clean floating layout without hard horizontal cutoff line.
      */}
      <div className="w-full z-40 pt-4 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 [perspective:1000px]">
        {/* Editorial Bio Text Container */}
        <div ref={bioRef} className="relative max-w-xl will-change-transform transition-transform">
          <p className="text-xs sm:text-sm md:text-base text-white/95 font-medium leading-relaxed select-none drop-shadow-[0_2px_8px_rgba(29,78,216,0.4)]">
            {bioText}
          </p>
          {hudActive && (
            <div className="mt-1 flex items-center space-x-3 text-[10px] font-mono text-sky-200/80">
              <span className="flex items-center space-x-1">
                <Compass className="w-3 h-3 text-sky-300" />
                <span>COORDS: X={coords.x} Y={coords.y}</span>
              </span>
              <span>·</span>
              <span>VELOCITY: {coords.speed} px/s</span>
            </div>
          )}
        </div>

        {/* CTA Button with Magnetic Spring Absorption */}
        <div className="flex items-center gap-3">
          <a
            ref={ctaBtnRef}
            href="#work"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white hover:bg-white/95 text-blue-900 text-xs sm:text-sm font-semibold tracking-wide shadow-[0_4px_20px_rgba(29,78,216,0.25)] hover:shadow-[0_8px_30px_rgba(29,78,216,0.45)] group pointer-events-auto will-change-transform transition-colors"
          >
            <span>Explore Engineering Profile</span>
            <ArrowUpRight className="w-4 h-4 ml-2 text-blue-600 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};
