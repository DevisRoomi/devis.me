import React, { useState, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { RollingText } from '../components/MicroInteractions';

/* ═══════════════════════════════════════════════════════════════════════════
   03 · THE NEXUS (Dual-Dimension Gateway — Bespoke Cardless Art Installation)
   - Zero generic cards / zero boxes.
   - Left: Devis Silhouette standing in dark void with Spiderman Spotlight Reveal.
   - Right: Liquid Spencerian Script "Receipts" (Coca-Cola style) + Verified Stats.
   - Background: Dark #030612, Multi-tier Animated Aurora Glow, Noise Grain.
   ═══════════════════════════════════════════════════════════════════════════ */

export const NexusSection: React.FC = () => {
  const [lens, setLens] = useState({ x: 0, y: 0, active: false });
  const heroContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroContainerRef.current) return;
    const rect = heroContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLens({ x, y, active: true });
  };

  const handleMouseLeave = () => {
    setLens((prev) => ({ ...prev, active: false }));
  };

  return (
    <section
      id="nexus"
      className="relative z-20 w-full min-h-screen bg-[#030612] text-slate-100 overflow-hidden flex flex-col justify-between select-none py-6 sm:py-8"
      style={{
        boxShadow: '0 -40px 100px -20px rgba(3,6,18,0.98)',
      }}
    >
      {/* ── 1. ANIMATED AURORA GLOW MESH (Fluid Organic Drift) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Glow 1: Deep Sapphire / Indigo (Behind Hero Devis) */}
        <div
          className="absolute -top-[10%] left-[8%] w-[620px] sm:w-[740px] h-[620px] sm:h-[740px] rounded-full blur-[130px] sm:blur-[160px] opacity-75 animate-aurora-1"
          style={{
            background: 'radial-gradient(circle, #1e40af 0%, rgba(30, 64, 175, 0.45) 50%, transparent 75%)',
          }}
        />

        {/* Glow 2: Electric Cobalt / Amber Embers (Behind Receipts) */}
        <div
          className="absolute -bottom-[15%] right-[5%] w-[680px] sm:w-[840px] h-[580px] sm:h-[680px] rounded-full blur-[140px] sm:blur-[170px] opacity-65 animate-aurora-2"
          style={{
            background: 'radial-gradient(circle, #1d4ed8 0%, #1e3a8a 35%, rgba(234, 88, 12, 0.22) 65%, transparent 80%)',
          }}
        />

        {/* Glow 3: Electric Cyan Core (Center Crossroad) */}
        <div
          className="absolute top-[35%] left-[38%] w-[420px] sm:w-[560px] h-[420px] sm:h-[560px] rounded-full blur-[125px] sm:blur-[140px] opacity-45 animate-aurora-3"
          style={{
            background: 'radial-gradient(circle, #0284c7 0%, rgba(15, 118, 110, 0.45) 55%, transparent 75%)',
          }}
        />
      </div>

      {/* ── 2. FINE-GRAINED SVG NOISE TEXTURE (Anti-Banding) ── */}
      <div
        className="absolute inset-0 pointer-events-none -z-5 opacity-[0.038] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* ── 3. ARCHITECTURAL MASTHEAD / TELEMETRY ── */}
      <div className="relative z-30 w-full flex items-start justify-between px-8 sm:px-14 pt-4 sm:pt-6 shrink-0">
        <div className="flex flex-col">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.24em] text-sky-400 uppercase">
              03 // THE NEXUS
            </span>
            <span className="w-5 h-[1.5px] bg-slate-600 rounded-full inline-block" />
            <span className="font-mono text-[10px] sm:text-[10.5px] text-slate-400 font-semibold tracking-wider">
              DUAL DIMENSION GATEWAY
            </span>
          </div>

          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight mt-1">
            The Person <span className="text-sky-400/80">&</span> Receipts
          </h2>
        </div>

        {/* Right Telemetry */}
        <div className="hidden sm:flex flex-col items-end text-right font-mono text-[10px] text-slate-400 tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
            <span className="text-slate-300 font-bold">PORTAL READY</span>
          </div>
          <span className="text-slate-400 mt-0.5">06°35′S 106°47′E // BOGOR</span>
        </div>
      </div>

      {/* 
        ── 4. MAIN CARDLESS STAGE (Organic Free-Flowing Dual Poles) ──
        NO CARDS, NO BOXES: Raw character presence + typographic sculpture
      */}
      <div className="relative z-20 flex-1 flex items-center justify-center px-6 sm:px-12 md:px-16 py-6 sm:py-10">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* ═════════════════════════════════════════════════════════════════
              POLE 1 (LEFT): HERO DEVIS & SPIDERMAN SPOTLIGHT LENS (lg:col-span-7)
              ═════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 flex flex-col md:flex-row items-center md:items-end justify-center lg:justify-start gap-8 sm:gap-10 group/hero">
            
            {/* The Living Figure Container (Pure Silhouette in the Atmosphere) */}
            <div
              ref={heroContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative h-[480px] sm:h-[540px] md:h-[590px] aspect-[1357/4096] shrink-0 cursor-crosshair select-none"
            >
              {/* Soft Ground Ambient Shadow */}
              <div
                className="absolute -bottom-2 inset-x-[-15%] h-8 rounded-full pointer-events-none -z-10"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(2,6,23,0.5) 50%, transparent 75%)',
                  filter: 'blur(8px)',
                }}
              />

              {/* Layer 1: Authentic Devis Adventurer Portrait */}
              <img
                src="/assets/person/awalan/devis_portrait_4k_transparent.png"
                alt="Abu Devis Jalaluddin Rumi"
                className="w-full h-full object-contain object-bottom filter drop-shadow-[0_24px_45px_rgba(2,6,23,0.8)] pointer-events-none"
                loading="eager"
              />

              {/* Layer 2: Spider-Man in a Regal Thobe (Masked Spotlight Reveal) */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 overflow-hidden"
                style={{
                  opacity: lens.active ? 1 : 0,
                  maskImage: lens.active
                    ? `radial-gradient(circle 140px at ${lens.x}px ${lens.y}px, black 35%, rgba(0,0,0,0.85) 65%, transparent 100%)`
                    : 'none',
                  WebkitMaskImage: lens.active
                    ? `radial-gradient(circle 140px at ${lens.x}px ${lens.y}px, black 35%, rgba(0,0,0,0.85) 65%, transparent 100%)`
                    : 'none',
                }}
              >
                <img
                  src="/assets/person/awalan/Spider-Man in a Regal Thobe.png"
                  alt="Spider-Man in a Regal Thobe"
                  className="absolute h-[105%] w-auto max-w-none left-1/2 -translate-x-1/2 top-[-2%] object-contain object-bottom filter drop-shadow-[0_24px_50px_rgba(220,38,38,0.5)]"
                  loading="eager"
                />
              </div>

              {/* Floating Lens HUD Ring / Crosshair Indicator when Active */}
              {lens.active && (
                <div
                  className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-sky-400/40 shadow-[0_0_35px_rgba(56,189,248,0.3)] flex items-center justify-center transition-transform duration-75"
                  style={{ left: lens.x, top: lens.y }}
                >
                  <span className="absolute top-2 font-mono text-[8px] font-bold text-sky-200 tracking-widest uppercase bg-slate-950/85 px-2 py-0.5 rounded-full border border-sky-400/50 shadow-md">
                    REVEAL // REGAL HERO
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
                </div>
              )}

              {/* Hint badge on idle */}
              {!lens.active && (
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none px-3 py-1 rounded-full bg-slate-950/80 border border-sky-400/40 backdrop-blur-md flex items-center gap-2 shadow-lg animate-bounce">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                  <span className="font-mono text-[9px] text-sky-200 font-semibold tracking-wider whitespace-nowrap">
                    HOVER BODY TO REVEAL
                  </span>
                </div>
              )}
            </div>

            {/* Left Pole Typography (Pure Editorial Spine, No Box) */}
            <div className="flex flex-col text-left max-w-sm pb-4">
              <span className="font-mono text-[9.5px] font-bold text-sky-400 tracking-[0.2em] uppercase mb-1">
                DIMENSION 01 // ME
              </span>

              <h3 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase leading-none">
                The Forge
              </h3>

              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed mt-2.5">
                Menyingkap sisi autentik: akar ilmu klasik Nahwu, amanah kepemimpinan OSIS, ketangguhan fisik pendakian Merbabu, hingga rekayasa sistem di IDN Polytechnic.
              </p>

              {/* Minimalist Floating Action Link */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center gap-3">
                <a
                  href="#character"
                  className="group flex items-center gap-2 text-xs sm:text-sm font-display font-bold text-sky-300 hover:text-white transition-colors cursor-pointer"
                >
                  <RollingText text="ENTER THE STORY" staggerMs={24} />
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-sky-400" />
                </a>
                <span className="font-mono text-[9px] text-slate-500">// 18+ NARRATIVES</span>
              </div>
            </div>
          </div>

          {/* ═════════════════════════════════════════════════════════════════
              POLE 2 (RIGHT): TYPOGRAPHIC SCULPTURE "RECEIPTS" (lg:col-span-5)
              Fluid Spencerian Script + High-Contrast Accreditations
              ═════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 flex flex-col justify-center items-start lg:items-end text-left lg:text-right pl-0 lg:pl-4">
            
            <div className="max-w-md flex flex-col items-start lg:items-end">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                <span className="font-mono text-[10px] font-bold text-amber-300 tracking-[0.22em] uppercase">
                  DIMENSION 02 // PROOF
                </span>
              </div>

              {/* ── BESPOKE SPENCERIAN SCRIPT "Receipts" (Coca-Cola Style Dynamic Swirl) ── */}
              <div className="relative my-2 group/script cursor-pointer">
                {/* Ambient Script Underglow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-rose-500/15 to-sky-500/20 blur-2xl opacity-60 group-hover/script:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />

                {/* Flowing Spencerian SVG Typography with Dynamic Liquid Swirl */}
                <svg
                  viewBox="0 0 540 160"
                  className="w-[280px] sm:w-[360px] md:w-[420px] h-auto overflow-visible select-none transition-transform duration-500 group-hover/script:scale-[1.03]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="cocaColaGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="30%" stopColor="#FED7AA" />
                      <stop offset="70%" stopColor="#FDBA74" />
                      <stop offset="100%" stopColor="#FB923C" />
                    </linearGradient>

                    <linearGradient id="ribbonUnderline" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FB923C" stopOpacity="0.1" />
                      <stop offset="40%" stopColor="#FDBA74" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
                    </linearGradient>

                    <filter id="scriptDropShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#EA580C" floodOpacity="0.45" />
                    </filter>
                  </defs>

                  {/* Dynamic Script Typography */}
                  <text
                    x="20"
                    y="105"
                    className="font-serif italic font-extrabold"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: '115px',
                      letterSpacing: '-0.02em',
                      fill: 'url(#cocaColaGlow)',
                      filter: 'url(#scriptDropShadow)',
                    }}
                  >
                    Receipts
                  </text>

                  {/* Iconic Dynamic Underline Swirl Ribbon (Coca-Cola Signature Flourish) */}
                  <path
                    d="M 18 122 C 140 120, 260 148, 480 124 C 510 120, 520 110, 490 114 C 360 132, 180 136, 32 142"
                    stroke="url(#ribbonUnderline)"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-700 group-hover/script:stroke-white"
                  />
                  <circle cx="490" cy="114" r="3.5" fill="#FFFFFF" className="animate-pulse" />
                </svg>
              </div>

              {/* Verified Metadata Counters */}
              <div className="mt-3 flex flex-wrap gap-2 justify-start lg:justify-end">
                <span className="font-mono text-[9px] font-bold text-amber-300 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-full">
                  JUARA 1 CC NAHWU
                </span>
                <span className="font-mono text-[9px] font-bold text-sky-300 bg-sky-950/60 border border-sky-500/30 px-3 py-1 rounded-full">
                  HAFIDZ QURAN TERBANYAK
                </span>
                <span className="font-mono text-[9px] font-bold text-slate-300 bg-slate-900/60 border border-slate-700/40 px-3 py-1 rounded-full">
                  SEKBEN OSIS & CYBERSEC
                </span>
              </div>

              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed mt-3.5">
                Bukan sekadar klaim. Setiap sertifikat, pengakuan lomba, dan piagam pencapaian disajikan dalam galeri monograf interaktif berstandar Aristide Benoist.
              </p>

              {/* Minimalist Floating Action Link */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center gap-3 justify-start lg:justify-end w-full">
                <span className="font-mono text-[9px] text-slate-500">// SHOWCASE SLIDES</span>
                <a
                  href="#receipts"
                  className="group flex items-center gap-2 text-xs sm:text-sm font-display font-bold text-amber-300 hover:text-white transition-colors cursor-pointer"
                >
                  <RollingText text="INSPECT RECEIPTS" staggerMs={24} />
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-amber-400" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── 5. BOTTOM EDITORIAL STATUS BAR ── */}
      <div className="relative z-30 w-full flex items-center justify-between px-8 sm:px-14 pb-4 sm:pb-6 shrink-0 text-slate-400 font-mono text-[10px] tracking-wider border-t border-white/5 pt-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span>DEVIS® PORTAL APPARATUS // THE NEXUS</span>
        </div>
        <div className="hidden sm:block text-slate-400">
          <span>SCROLL TO ADVANCE // HOVER FIGURE FOR SPIDER-MAN REVEAL</span>
        </div>
      </div>
    </section>
  );
};

export default NexusSection;
