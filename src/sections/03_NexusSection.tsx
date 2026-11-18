import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Compass, ShieldCheck, Terminal, Award } from 'lucide-react';
import { RollingText } from '../components/MicroInteractions';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════════════════
   03 · THE NEXUS (Dual-Dimension Horizontal Scroll Track — Ala MadeByKota)
   - Outer container: h-[320vh] for smooth scroll travel.
   - Inner container: sticky top-0 h-screen overflow-hidden.
   - Layer 1: Background giant hollow typography marquee (reverse parallax).
   - Layer 2: 3 Staggered Living Characters (Hiking, Spidey Thobe, Software Eng).
   - Layer 3: Monumental Spencerian "Receipts" typography & verified badges.
   - Pinned interaction: smooth hover slow-down & character spotlight captions.
   ═══════════════════════════════════════════════════════════════════════════ */

interface CharacterData {
  id: string;
  badge: string;
  title: string;
  quote: string;
  caption: string;
  imgUrl: string;
  imgAlt: string;
  accent: string;
  tagBg: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  staggerOffset: string; // vertical rhythm offset
}

const CHARACTERS: CharacterData[] = [
  {
    id: 'adventurer',
    badge: 'DIMENSION 01.A // RESILIENCE',
    title: 'The Adventurer',
    quote: 'Daya tahan fisik & ketenangan mental sebelum baris kode pertama.',
    caption: 'Tempaan ekspedisi Gunung Merbabu, alam terbuka Sentul, dan ketahanan navigasi.',
    imgUrl: '/assets/person/awalan/devis_portrait_4k_transparent.png',
    imgAlt: 'Abu Devis the Adventurer',
    accent: '#38bdf8', // sky
    tagBg: 'rgba(56, 189, 248, 0.12)',
    icon: Compass,
    staggerOffset: 'translate-y-2',
  },
  {
    id: 'spiderman',
    badge: 'DIMENSION 01.B // PERSONA',
    title: 'Regal Spider-Man',
    quote: 'With great capability comes high accountability.',
    caption: 'Identitas heroik berakar nilai adab, akhlak mulia, dan tanggung jawab moral seorang muslim.',
    imgUrl: '/assets/person/awalan/Spider-Man in a Regal Thobe.png',
    imgAlt: 'Spider-Man in a Regal Thobe',
    accent: '#f43f5e', // rose/crimson
    tagBg: 'rgba(244, 63, 94, 0.14)',
    icon: ShieldCheck,
    staggerOffset: '-translate-y-4',
  },
  {
    id: 'engineer',
    badge: 'DIMENSION 01.C // CRAFT',
    title: 'Systems Architect',
    quote: 'Presisi logika, arsitektur modular, dan rekayasa sistem skala nyata.',
    caption: 'Mahasiswa Rekayasa Perangkat Lunak IDN Polytechnic. Penempaan full-stack, Rust, dan sistem AI.',
    imgUrl: '/assets/devis_portrait_polished.png',
    imgAlt: 'Devis the Software Engineer',
    accent: '#a78bfa', // purple/iris
    tagBg: 'rgba(167, 139, 250, 0.14)',
    icon: Terminal,
    staggerOffset: 'translate-y-3',
  },
];

export const NexusSection: React.FC = () => {
  const triggerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bgMarqueeRef = useRef<HTMLDivElement>(null);
  const [hoveredChar, setHoveredChar] = useState<string | null>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const track = trackRef.current;
    const bgMarquee = bgMarqueeRef.current;
    if (!trigger || !track) return;

    const ctx = gsap.context(() => {
      // 1. Calculate precise horizontal scroll amount
      const getScrollAmount = () => {
        return -(track.scrollWidth - window.innerWidth + 120);
      };

      // 2. Main Foreground Horizontal Track ScrollTween
      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: trigger,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // 3. Background Giant Text Parallax (Drifts in counter-flow)
      if (bgMarquee) {
        gsap.to(bgMarquee, {
          x: () => -(bgMarquee.scrollWidth - window.innerWidth) * 0.45,
          ease: 'none',
          scrollTrigger: {
            trigger: trigger,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.6,
            invalidateOnRefresh: true,
          },
        });
      }
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="nexus"
      ref={triggerRef}
      className="relative z-20 w-full h-[320vh] bg-[#0A0B0E] text-slate-100 select-none"
    >
      {/* 
        ── INNER PINNED VIEWPORT (STAY LOCKED DURING 320vh SCROLL) ──
      */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between py-5 sm:py-7">
        
        {/* ── 1. AMBIENT BACKGROUND GLOW & GRAIN ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-20">
          <div
            className="absolute -top-[10%] left-[10%] w-[680px] h-[680px] rounded-full blur-[140px] opacity-40 animate-aurora-1"
            style={{
              background: 'radial-gradient(circle, #1e3a8a 0%, rgba(30, 58, 138, 0.25) 50%, transparent 75%)',
            }}
          />
          <div
            className="absolute -bottom-[15%] right-[15%] w-[740px] h-[620px] rounded-full blur-[150px] opacity-30 animate-aurora-2"
            style={{
              background: 'radial-gradient(circle, #c2410c 0%, rgba(194, 65, 12, 0.2) 45%, transparent 75%)',
            }}
          />
          <div
            className="absolute top-[40%] left-[45%] w-[500px] h-[500px] rounded-full blur-[130px] opacity-20 animate-aurora-3"
            style={{
              background: 'radial-gradient(circle, #0284c7 0%, rgba(2, 132, 199, 0.15) 55%, transparent 75%)',
            }}
          />
        </div>

        {/* Fine Noise Grain Overlay */}
        <div
          className="absolute inset-0 pointer-events-none -z-10 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />

        {/* ── 2. BACKGROUND HOLLOW MARQUEE LAYER (Ala KOTA Parallax) ── */}
        <div
          ref={bgMarqueeRef}
          className="absolute top-1/2 -translate-y-1/2 left-0 w-max pointer-events-none -z-10 whitespace-nowrap will-change-transform flex items-center select-none"
        >
          <span
            className="font-display font-black text-[18vw] uppercase tracking-tighter opacity-[0.06] text-transparent leading-none"
            style={{
              WebkitTextStroke: '2px rgba(255, 255, 255, 0.85)',
            }}
          >
            THE FORGE — RECEIPTS — THE PERSON — PROOF — THE FORGE — RECEIPTS —
          </span>
        </div>

        {/* ── 3. ARCHITECTURAL MASTHEAD (Fixed Top Telemetry) ── */}
        <div className="relative z-30 w-full flex items-start justify-between px-8 sm:px-14 shrink-0">
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.24em] text-sky-400 uppercase">
                03 // THE NEXUS
              </span>
              <span className="w-5 h-[1.5px] bg-slate-700 rounded-full inline-block" />
              <span className="font-mono text-[10px] sm:text-[10.5px] text-slate-400 font-semibold tracking-wider uppercase">
                Horizontal Traverse
              </span>
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight mt-1">
              The Forge <span className="text-sky-400/80">&</span> Receipts
            </h2>

            <div className="flex items-center gap-3 mt-1 font-mono text-[9.5px] text-slate-400 tracking-wider">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                ACTIVE TRAVERSE
              </span>
              <span className="text-slate-600">//</span>
              <span>06°35′S 106°47′E (BOGOR)</span>
            </div>
          </div>

          {/* Spacer for Top-Right Floating Navbar */}
          <div className="w-48 h-10 shrink-0 pointer-events-none" />
        </div>

        {/* 
          ── 4. MAIN HORIZONTAL TRACK (SCROLL-LINKED HORIZONTAL STAGE) ──
          Houses: Intro Callout -> 3 Staggered Characters -> Monumental Receipts -> Terminal
        */}
        <div className="relative z-20 flex-1 flex items-center overflow-visible">
          <div
            ref={trackRef}
            className="flex items-center flex-nowrap gap-16 sm:gap-24 pl-8 sm:pl-16 pr-24 will-change-transform h-full"
          >
            
            {/* ── STATION 0: INTRO RUNWAY ARCHITECTURE ── */}
            <div className="w-[320px] sm:w-[380px] shrink-0 flex flex-col justify-center text-left py-4">
              <span className="font-mono text-[9px] font-bold text-sky-400 tracking-[0.2em] uppercase mb-1.5">
                NARRATIVE INTERSECTION
              </span>

              <h3 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight uppercase leading-[0.95]">
                Three
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-amber-300">
                  Dimensions
                </span>
              </h3>

              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed mt-4">
                Gulir ke bawah untuk melintasi tiga sisi penempaan: ketahanan fisik pendaki, integritas heroik muslim, dan rekayasa sistem di IDN Polytechnic.
              </p>

              <div className="mt-6 flex items-center gap-2 text-slate-400 font-mono text-[10px]">
                <span className="w-6 h-[1px] bg-slate-600" />
                <span>SCROLL DOWN TO ADVANCE →</span>
              </div>
            </div>

            {/* ── STATION 1, 2, 3: THREE LIVING CHARACTERS (STAGGERED DEPTH) ── */}
            {CHARACTERS.map((char, idx) => {
              const Icon = char.icon;
              const isHovered = hoveredChar === char.id;

              return (
                <div
                  key={char.id}
                  onMouseEnter={() => setHoveredChar(char.id)}
                  onMouseLeave={() => setHoveredChar(null)}
                  className={`group/char relative flex flex-col items-center justify-end shrink-0 select-none transition-all duration-500 cursor-pointer ${char.staggerOffset}`}
                  style={{
                    width: 'clamp(260px, 22vw, 340px)',
                    height: 'clamp(460px, 66vh, 600px)',
                  }}
                >
                  {/* Floating Caption HUD (Reveals on Hover / Soft Breathing on Idle) */}
                  <div
                    className={`absolute -top-12 inset-x-0 mx-auto w-full max-w-[280px] rounded-xl border border-white/10 bg-slate-950/85 backdrop-blur-md p-3 text-left shadow-xl transition-all duration-300 pointer-events-none z-30 ${
                      isHovered ? 'opacity-100 -translate-y-2' : 'opacity-0 translate-y-2'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="font-mono text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: char.tagBg, color: char.accent }}
                      >
                        {char.badge}
                      </span>
                      <span className="font-mono text-[9px] text-slate-400">0{idx + 1}/03</span>
                    </div>
                    <p className="font-sans text-[11px] text-slate-200 font-medium leading-snug">
                      {char.caption}
                    </p>
                  </div>

                  {/* Soft Ground Ambient Contact Shadow */}
                  <div
                    className="absolute bottom-2 inset-x-[15%] h-6 rounded-full pointer-events-none -z-10 transition-transform duration-500 group-hover/char:scale-110"
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.95) 0%, rgba(10,11,14,0.6) 50%, transparent 75%)',
                      filter: 'blur(8px)',
                    }}
                  />

                  {/* Character Image Silhouette with Subtle Bottom Fade */}
                  <div
                    className="relative w-full h-[85%] flex items-end justify-center transition-transform duration-500 ease-out group-hover/char:scale-[1.03]"
                    style={{
                      maskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.85) 16px, black 36px)',
                      WebkitMaskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.85) 16px, black 36px)',
                    }}
                  >
                    <img
                      src={char.imgUrl}
                      alt={char.imgAlt}
                      className="h-full w-auto max-w-full object-contain object-bottom filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] pointer-events-none"
                      loading="eager"
                    />
                  </div>

                  {/* Character Monograph Plate Underneath */}
                  <div className="w-full text-center mt-3 shrink-0">
                    <div className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-wider uppercase text-slate-400">
                      <Icon className="w-3 h-3" style={{ color: char.accent }} />
                      <span>{char.title}</span>
                    </div>
                    <p className="font-sans text-[11px] text-slate-300 font-medium line-clamp-1 mt-0.5 px-2">
                      "{char.quote}"
                    </p>
                  </div>
                </div>
              );
            })}

            {/* ── STATION 4: MONUMENTAL "RECEIPTS" TYPOGRAPHY SCULPTURE ── */}
            <div className="w-[420px] sm:w-[500px] shrink-0 flex flex-col justify-center items-start text-left pl-6 border-l border-white/[0.08] py-4 select-none">
              
              <div className="flex items-center gap-2 mb-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-mono text-[10px] font-bold text-amber-300 tracking-[0.22em] uppercase">
                  DIMENSION 02 // PROOF
                </span>
              </div>

              {/* Pure Spencerian Serif Italic (Clean Luxury Without Swoosh) */}
              <div className="relative my-1 group/receipts cursor-pointer">
                <div className="absolute -inset-4 bg-amber-500/15 blur-2xl opacity-60 group-hover/receipts:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />

                <h1
                  className="font-serif italic font-extrabold text-7xl sm:text-8xl md:text-9xl tracking-tight transition-transform duration-500 group-hover/receipts:scale-[1.02]"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #FED7AA 35%, #FDBA74 70%, #FB923C 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 10px 30px rgba(234, 88, 12, 0.35))',
                  }}
                >
                  Receipts
                </h1>
              </div>

              {/* Verified Metadata Badges */}
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="font-mono text-[9px] font-bold text-amber-300 bg-amber-950/50 border border-amber-500/30 px-3 py-1 rounded-full">
                  JUARA 1 CC NAHWU
                </span>
                <span className="font-mono text-[9px] font-bold text-sky-300 bg-sky-950/50 border border-sky-500/30 px-3 py-1 rounded-full">
                  HAFIDZ QURAN TERBANYAK
                </span>
                <span className="font-mono text-[9px] font-bold text-slate-300 bg-slate-900/50 border border-slate-700/40 px-3 py-1 rounded-full">
                  SEKBEN OSIS & CYBERSEC
                </span>
              </div>

              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed mt-4 max-w-md">
                Bukan sekadar klaim. Setiap sertifikat, pengakuan lomba, dan piagam pencapaian disajikan dalam galeri monograf interaktif yang teruji dan terkurasi.
              </p>

              {/* Minimalist Action Link */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center gap-3 w-full">
                <span className="font-mono text-[9px] text-slate-500">// ARISTIDE MONOGRAPH</span>
                <a
                  href="#receipts"
                  className="group flex items-center gap-2 text-xs sm:text-sm font-display font-bold text-amber-300 hover:text-white transition-colors cursor-pointer"
                >
                  <RollingText text="INSPECT RECEIPTS" staggerMs={24} />
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-amber-400" />
                </a>
              </div>
            </div>

            {/* ── STATION 5: DUAL GATEWAY FORK TERMINAL ── */}
            <div className="w-[340px] shrink-0 flex flex-col justify-center items-start text-left pl-6 border-l border-white/[0.08] py-4">
              <span className="font-mono text-[9px] font-bold text-sky-400 tracking-[0.22em] uppercase mb-2">
                TERMINAL // DESTINATIONS
              </span>

              <h4 className="font-display font-extrabold text-2xl text-white tracking-tight uppercase">
                Choose Your
                <br />
                Dimension
              </h4>

              <div className="mt-5 space-y-3 w-full">
                <a
                  href="#character"
                  className="group w-full flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-all cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="font-mono text-[8px] text-sky-400 font-bold uppercase tracking-wider">
                      PAGE 01
                    </span>
                    <span className="font-display font-bold text-sm text-white mt-0.5">
                      The Person & Narrative
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-sky-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>

                <a
                  href="#receipts"
                  className="group w-full flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-all cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="font-mono text-[8px] text-amber-400 font-bold uppercase tracking-wider">
                      PAGE 02
                    </span>
                    <span className="font-display font-bold text-sm text-white mt-0.5">
                      The Proof & Receipts
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-amber-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* ── 5. BOTTOM EDITORIAL STATUS BAR ── */}
        <div className="relative z-30 w-full flex items-center justify-between px-8 sm:px-14 shrink-0 text-slate-400 font-mono text-[10px] tracking-wider border-t border-white/5 pt-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span>DEVIS® HORIZONTAL TRAVERSE APPARATUS</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-400">
            <span>HOLD SCROLL TO PAN TRACK</span>
            <span className="text-slate-600">//</span>
            <span className="text-sky-300 font-bold">HOVER ANY FIGURE FOR INTEL</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default NexusSection;
