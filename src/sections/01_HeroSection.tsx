import React from 'react';
import { Globe, ArrowUpRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative h-screen min-h-[700px] w-full bg-canvas-bg flex flex-col justify-between pt-20 pb-6 px-6 sm:px-12 overflow-hidden"
    >
      {/* Top Meta Bar */}
      <div className="w-full flex items-center justify-between gap-4 z-30 pt-2">
        {/* Location Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border-subtle/80 bg-surface/70 backdrop-blur-md text-xs sm:text-sm text-text-secondary">
          <Globe className="w-4 h-4 text-crimson animate-spin" style={{ animationDuration: '16s' }} />
          <span>Located in Bogor, Indonesia</span>
        </div>

        {/* Role with Arrow */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-text-secondary">
          <ArrowUpRight className="w-4 h-4 text-crimson" />
          <span className="tracking-wide uppercase font-semibold text-text-primary">
            Software Engineering Student
          </span>
        </div>
      </div>

      {/* Massive Sliding Marquee (Dennis Snellenberg Signature — Sits behind portrait) */}
      <div className="absolute top-[48%] -translate-y-1/2 left-0 w-full overflow-hidden select-none pointer-events-none z-10">
        <div className="animate-marquee whitespace-nowrap text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-display font-extrabold tracking-tight text-white/90 drop-shadow-lg">
          <span className="mx-6">Abu Devis Jalaluddin Rumi —</span>
          <span className="mx-6">Abu Devis Jalaluddin Rumi —</span>
          <span className="mx-6">Abu Devis Jalaluddin Rumi —</span>
        </div>
      </div>

      {/* Centerpiece: Dennis-style Portrait Card */}
      <div className="relative flex-1 flex items-center justify-center my-2 z-20 pointer-events-none">
        <div className="relative h-[48vh] sm:h-[52vh] max-h-[500px] aspect-[3/4] rounded-2xl overflow-hidden border border-border-subtle/60 shadow-2xl bg-surface/50 backdrop-blur-sm pointer-events-auto transition-transform duration-500 hover:scale-[1.02]">
          {/* Portrait Image */}
          <picture className="w-full h-full block">
            <source srcSet="/assets/hero_portrait.webp" type="image/webp" />
            <img
              src="/assets/hero_portrait.jpg"
              alt="Abu Devis Jalaluddin Rumi"
              className="w-full h-full object-cover object-bottom select-none filter contrast-[1.05] brightness-[0.98]"
              loading="eager"
            />
          </picture>

          {/* Smooth bottom fade into dark canvas */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-canvas-bg via-canvas-bg/85 to-transparent z-10 pointer-events-none" />
        </div>
      </div>

      {/* Bottom Subtitle / Tagline Block */}
      <div className="w-full z-30 pt-4 border-t border-border-subtle/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl font-normal">
          <span className="text-text-primary font-medium">TRPL student at IDN Polytechnic.</span>{' '}
          Exploring software development, AI, and technology through continuous learning and hands-on projects.
        </p>

        <a
          href="#about"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-surface hover:bg-elevated border border-border-subtle text-text-primary text-xs sm:text-sm font-medium transition-all duration-300 hover:border-crimson/50 hover:shadow-glow group pointer-events-auto"
        >
          <span>Explore Profile</span>
          <ArrowUpRight className="w-3.5 h-3.5 ml-2 text-crimson group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
};
