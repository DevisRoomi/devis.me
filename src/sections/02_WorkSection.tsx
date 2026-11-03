import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  num: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  tags: string[];
  metrics: string;
  liveUrl?: string;
  githubUrl?: string;
  previewTheme: 'basoku' | 'soto' | 'capy' | 'tahfidz' | 'orbital' | 'task' | 'gateway';
}

const PROJECTS: Project[] = [
  {
    id: 'basoku',
    num: '01',
    title: 'BASOKU',
    tagline: 'F&B Smart Recipe Calculator & Meat Ratio Precision',
    category: 'Full-Stack Architecture & Database Engineering',
    description: 'Sistem otomasi resep kuliner cerdas yang menghitung formulasi komposisi daging sapi, proporsi tepung tapioka, estimasi tarif selepan, hingga kalkulasi margin laba kotor secara presisi.',
    tags: ['LARAVEL', 'LIVEWIRE', 'MYSQL', 'TAILWIND CSS'],
    metrics: '0.01g Formula Accuracy · 100% Realtime Yield',
    githubUrl: 'https://github.com/DevisRoomi',
    previewTheme: 'basoku',
  },
  {
    id: 'soto-sore',
    num: '02',
    title: 'SOTO SORE KALIJAMBI',
    tagline: 'AI Speech-to-Order Transcription & Commercial Engine',
    category: 'AI Application & Commercial Web Platform',
    description: 'Platform digitalisasi UMKM kuliner dengan integrasi AI Voice-to-Text cerdas yang mentranskripsi pesanan lisan pelanggan secara real-time ke tiket dapur tanpa friksi kasir manual.',
    tags: ['NEXT.JS', 'AI SPEECH RECOGNITION', 'TAILWIND CSS', 'SUPABASE'],
    metrics: '< 1.2s Audio Transcribe · 0% Missed Orders',
    githubUrl: 'https://github.com/DevisRoomi',
    previewTheme: 'soto',
  },
  {
    id: 'capyquest',
    num: '03',
    title: 'CapyQuest',
    tagline: 'Gamified Habit RPG & Daily Companion System',
    category: 'Modern TypeScript & SQLite Engineering',
    description: 'Aplikasi pelacakan kebiasaan bergaya RPG santai dengan maskot kapibara interaktif, hadiah EXP/Gold, sistem flame streak harian, dan Capy Zen Pomodoro terintegrasi.',
    tags: ['BUN RUNTIME', 'HONO API', 'REACT 19', 'BUN:SQLITE'],
    metrics: '0.4ms Native SQLite Query · 60 FPS Mascot Loop',
    githubUrl: 'https://github.com/DevisRoomi',
    previewTheme: 'capy',
  },
  {
    id: 'setoran-companion',
    num: '04',
    title: 'SETORAN COMPANION',
    tagline: 'Digital Tahfidz Qur’an Progress & Evaluation Cloud',
    category: 'Production Cloud Web Application',
    description: 'Transformasi digital sistem pencatatan hafalan Al-Qur’an pesantren. Dasbor analitik multi-santri, log juz mutqin, dan transparansi evaluasi harian berbasis cloud.',
    tags: ['REACT', 'TAILWIND CSS', 'CLOUD DATABASE', 'ANALYTICS'],
    metrics: 'Active in Production · Zero Data Inconsistency',
    liveUrl: 'https://setoran-companion.lovable.app/',
    previewTheme: 'tahfidz',
  },
  {
    id: 'orbital-engine',
    num: '05',
    title: 'DEVIS® 3D ORBITAL',
    tagline: 'Mathematical Radial Arc & Kinetic Dial Controller',
    category: 'Creative Front-End & Spatial Computing',
    description: 'Mesin carousel 3D radial non-WebGL dengan kalkulasi trigonometri native, synched rotary dial controller, serta transisi kurva preserves-3d yang super mulus di 60 FPS.',
    tags: ['TYPESCRIPT', 'CSS 3D MATRIX', 'GSAP CORE', 'TRIGONOMETRY'],
    metrics: '100/100 Lighthouse Performance · Zero Frame Drops',
    githubUrl: 'https://github.com/DevisRoomi',
    previewTheme: 'orbital',
  },
  {
    id: 'japanese-task',
    num: '06',
    title: 'ZEN TASK JAPANESE',
    tagline: 'Minimalist Architecture & Spatial Focus Workspace',
    category: 'UI/UX Craft & Clean Systems Design',
    description: 'Aplikasi produktivitas berfilosofi Ma (間) Jepang dengan tata kelola modular, hotkey keyboard ekspres, arsitektur state terisolasi, serta pengalaman interaksi tanpa distraksi.',
    tags: ['REACT 19', 'ZUSTAND', 'TAILWIND CSS', 'ACCESSIBILITY'],
    metrics: '42KB Bundle Size · Full Keyboard Navigable',
    githubUrl: 'https://github.com/DevisRoomi',
    previewTheme: 'task',
  },
  {
    id: 'microservice-gateway',
    num: '07',
    title: 'API EDGE GATEWAY',
    tagline: 'High-Throughput Reverse Proxy & Rate Limiter',
    category: 'Systems Programming & Distributed Architecture',
    description: 'Gateway API berkinerja tinggi dengan algoritma token bucket rate-limiting adaptif, caching in-memory berlatensi mikrodetik, dan observability request stream mendalam.',
    tags: ['GO / RUST', 'CONCURRENCY', 'DOCKER', 'SYSTEM MONITORING'],
    metrics: '45,000+ Req/Sec · Sub-millisecond P99',
    githubUrl: 'https://github.com/DevisRoomi',
    previewTheme: 'gateway',
  },
];

// High-fidelity programmatic vector mockup renderers
const ProjectMockup: React.FC<{ theme: Project['previewTheme'] }> = ({ theme }) => {
  switch (theme) {
    case 'basoku':
      return (
        <div className="w-full h-full bg-[#030712] p-6 sm:p-8 flex flex-col justify-between font-mono text-xs select-none border border-slate-800 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block shadow-[0_0_8px_rgba(244,63,94,0.7)]" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block shadow-[0_0_8px_rgba(245,158,11,0.7)]" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
              <span className="text-white font-bold ml-2 text-xs tracking-wider">BASOKU // ENGINE v2.4</span>
            </div>
            <span className="text-emerald-400 font-bold text-[10px] bg-emerald-950/90 px-2.5 py-1 rounded border border-emerald-500/50">
              ● LIVE SYNC
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 my-4">
            <div className="bg-[#0b0f19] p-4 rounded-xl border border-slate-800 shadow-md">
              <span className="text-slate-400 font-sans block text-[11px] font-semibold mb-1">DAGING SAPI SEGAR</span>
              <span className="text-2xl sm:text-3xl font-black text-white tracking-wide">12.50 <span className="text-xs font-normal text-slate-400 font-mono">KG</span></span>
              <div className="w-full bg-slate-900 rounded-full h-2 mt-2.5 overflow-hidden border border-slate-800">
                <div className="bg-blue-500 h-full w-[70%] shadow-[0_0_12px_#3b82f6]" />
              </div>
            </div>
            <div className="bg-[#0b0f19] p-4 rounded-xl border border-slate-800 shadow-md">
              <span className="text-slate-400 font-sans block text-[11px] font-semibold mb-1">TEPUNG TAPIOKA SPESIAL</span>
              <span className="text-2xl sm:text-3xl font-black text-white tracking-wide">3.75 <span className="text-xs font-normal text-slate-400 font-mono">KG</span></span>
              <div className="w-full bg-slate-900 rounded-full h-2 mt-2.5 overflow-hidden border border-slate-800">
                <div className="bg-indigo-500 h-full w-[30%] shadow-[0_0_12px_#6366f1]" />
              </div>
            </div>
          </div>

          <div className="bg-[#0b0f19] rounded-xl p-4 border border-slate-800 shadow-inner">
            <div className="flex justify-between items-center text-xs mb-1.5 font-bold">
              <span className="text-slate-300 font-sans">ESTIMASI HASIL PRODUKSI</span>
              <span className="text-emerald-400 font-mono tracking-wider font-bold">~ 650 BUTIR</span>
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-400">
              <span className="font-sans">BIAYA PRODUKSI</span>
              <span className="font-mono text-white font-semibold">RP 1.425.000 (MARGIN 42%)</span>
            </div>
          </div>
        </div>
      );

    case 'soto':
      return (
        <div className="w-full h-full bg-[#18181B] p-5 sm:p-7 flex flex-col justify-between font-sans select-none">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-zinc-300 text-xs font-mono font-medium tracking-wider">AI SPEECH TRANSCRIBER</span>
            </div>
            <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded">LATENCY: 840ms</span>
          </div>

          <div className="my-auto py-2">
            <div className="flex items-end justify-center space-x-1.5 h-14 mb-4">
              {[40, 75, 95, 60, 85, 100, 70, 90, 45, 65, 80, 50, 95, 30].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-red-600 to-amber-400 rounded-full transition-all duration-300"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-lg p-3 text-center">
              <p className="text-xs text-zinc-200 italic font-mono">
                "Soto Sore 2 mangkok pisah kuah, sate telur puyuh 3 tusuk, es teh manis."
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-2 border-t border-zinc-850">
            <span>TABLE #08 · CONFIRMED</span>
            <span className="text-amber-400 font-semibold">TICKET #1042 DISPATCHED</span>
          </div>
        </div>
      );

    case 'capy':
      return (
        <div className="w-full h-full bg-[#1E293B] p-5 sm:p-7 flex flex-col justify-between select-none">
          <div className="flex items-center justify-between border-b border-slate-700 pb-3">
            <div className="flex items-center space-x-2">
              <span className="text-base">🦫</span>
              <span className="text-white text-xs font-bold tracking-wider font-mono">CAPYQUEST v1.0</span>
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono">
              <span className="text-amber-300 font-bold">🪙 1,240 G</span>
              <span className="text-rose-400 font-bold">🔥 14 DAYS</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 my-3 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/70">
            <div className="w-16 h-16 rounded-xl bg-amber-900/40 border border-amber-600/40 flex items-center justify-center text-3xl shadow-inner">
              🛀
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-white text-xs font-bold">Master Capy</span>
                <span className="text-[10px] font-mono text-emerald-400">LVL 18 (TRPL)</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mb-1.5">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-[82%]" />
              </div>
              <span className="text-[10px] text-slate-400 font-mono">EXP: 8,420 / 10,000 EXP</span>
            </div>
          </div>

          <div className="flex items-center justify-between bg-slate-900/70 px-3 py-2 rounded-lg text-[11px] font-mono text-slate-300">
            <span>QUEST: 2H DEEP CODING SESSION</span>
            <span className="text-emerald-400 font-bold">+250 EXP</span>
          </div>
        </div>
      );

    case 'tahfidz':
      return (
        <div className="w-full h-full bg-[#0F172A] p-5 sm:p-7 flex flex-col justify-between select-none">
          <div className="flex items-center justify-between border-b border-slate-700 pb-3">
            <span className="text-emerald-400 text-xs font-mono font-bold tracking-wider">SETORAN COMPANION</span>
            <span className="text-[10px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 px-2 py-0.5 rounded">
              CLOUD SYNCED
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 my-auto py-2">
            <div className="bg-slate-800/70 p-2.5 rounded-lg border border-slate-700/70 text-center">
              <span className="text-[10px] font-mono text-slate-400 block">JUZ MUTQIN</span>
              <span className="text-xl font-bold text-white font-mono">30 <span className="text-xs font-normal text-emerald-400">JUZ</span></span>
            </div>
            <div className="bg-slate-800/70 p-2.5 rounded-lg border border-slate-700/70 text-center">
              <span className="text-[10px] font-mono text-slate-400 block">SETORAN HARIAN</span>
              <span className="text-xl font-bold text-emerald-300 font-mono">2.5 <span className="text-xs font-normal text-slate-400">HAL</span></span>
            </div>
            <div className="bg-slate-800/70 p-2.5 rounded-lg border border-slate-700/70 text-center">
              <span className="text-[10px] font-mono text-slate-400 block">PREDIKAT</span>
              <span className="text-base font-bold text-amber-300 font-mono mt-1 block">MUMTAZ</span>
            </div>
          </div>

          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-300 flex justify-between items-center">
            <span>SURAH AN-NABA (AYAT 1-40)</span>
            <span className="text-emerald-400 font-semibold">TERVERIFIKASI USTADZ</span>
          </div>
        </div>
      );

    case 'orbital':
      return (
        <div className="w-full h-full bg-[#0A0D1A] p-5 sm:p-7 flex flex-col justify-between font-mono select-none">
          <div className="flex items-center justify-between border-b border-indigo-900/60 pb-3">
            <span className="text-indigo-400 text-xs font-bold tracking-wider">3D RADIAL ORBIT ENGINE</span>
            <span className="text-[10px] text-cyan-300 bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded">60 FPS MATRIX</span>
          </div>

          <div className="relative my-auto flex items-center justify-center py-4">
            <div className="w-24 h-24 rounded-full border border-indigo-500/30 flex items-center justify-center animate-spin" style={{ animationDuration: '16s' }}>
              <div className="w-16 h-16 rounded-full border border-dashed border-cyan-400/50 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_15px_#3b82f6]" />
              </div>
            </div>
            <div className="absolute text-[10px] text-indigo-300 bottom-0">
              θ = 51.42° · radius: 520px
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] text-slate-400 border-t border-indigo-950 pt-2">
            <span>ROTARY DIAL: SYNCHED</span>
            <span className="text-cyan-400">PRESERVE-3D NATIVE</span>
          </div>
        </div>
      );

    case 'task':
      return (
        <div className="w-full h-full bg-[#18181B] p-5 sm:p-7 flex flex-col justify-between font-mono select-none">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <span className="text-zinc-200 text-xs font-medium tracking-widest uppercase">禅 ZEN TASK</span>
            <span className="text-[10px] text-zinc-400">MA SPACE (間)</span>
          </div>

          <div className="space-y-2.5 my-auto py-2">
            {[
              { text: 'Refactor AST parsing pipeline', done: true },
              { text: 'Zero-overhead memory bounds check', done: true },
              { text: 'Verify WebGL matrix interpolation', done: false },
            ].map((t, idx) => (
              <div key={idx} className="flex items-center space-x-2.5 text-xs">
                <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center text-[10px] ${t.done ? 'bg-zinc-200 text-zinc-950 border-zinc-200 font-bold' : 'border-zinc-700'}`}>
                  {t.done ? '✓' : ''}
                </span>
                <span className={`${t.done ? 'text-zinc-400 line-through' : 'text-zinc-200 font-sans'}`}>{t.text}</span>
              </div>
            ))}
          </div>

          <div className="text-[10px] text-zinc-400 flex justify-between pt-2 border-t border-zinc-850">
            <span>HOTKEY: [CMD + K]</span>
            <span className="text-zinc-300">2 / 3 COMPLETED</span>
          </div>
        </div>
      );

    case 'gateway':
      return (
        <div className="w-full h-full bg-[#090D16] p-5 sm:p-7 flex flex-col justify-between font-mono select-none">
          <div className="flex items-center justify-between border-b border-blue-900/50 pb-3">
            <span className="text-blue-400 text-xs font-bold tracking-wider">EDGE REVERSE PROXY</span>
            <span className="text-emerald-400 text-[10px] bg-emerald-950/70 border border-emerald-800/60 px-2 py-0.5 rounded">ONLINE</span>
          </div>

          <div className="my-auto py-2 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">P99 LATENCY</span>
              <span className="text-emerald-300 font-bold">0.82 ms</span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[25%]" />
            </div>
            <div className="flex justify-between items-center text-xs pt-1">
              <span className="text-slate-400">THROUGHPUT</span>
              <span className="text-blue-300 font-bold">48,210 RPS</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] text-slate-400 border-t border-blue-950 pt-2">
            <span>ALGO: TOKEN BUCKET</span>
            <span className="text-blue-400">0 DROPPED</span>
          </div>
        </div>
      );
  }
};

export const WorkSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Light tracer animation along the vertical architectural spine
      if (pathRef.current && sectionRef.current) {
        gsap.fromTo(
          pathRef.current,
          { y: 0 },
          {
            y: '4000px',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1,
            },
          }
        );
      }

      // Project cards stagger fade-in
      const cards = gsap.utils.toArray<HTMLElement>('.project-card');
      cards.forEach((card) => {
        // Project watermark subtle parallax
        const watermark = card.querySelector('.project-watermark');
        if (watermark) {
          gsap.fromTo(
            watermark,
            { y: -30 },
            {
              y: 30,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full bg-[#EFEFED] text-[#121316] py-32 sm:py-44 px-6 sm:px-12 md:px-16 overflow-hidden selection:bg-crimson selection:text-white"
    >
      {/* Editorial Grain Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply z-1"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Diffuse Outer Ambient Glow */}
      <div className="absolute top-[12%] left-[18%] w-[520px] h-[520px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[52%] right-[12%] w-[620px] h-[620px] bg-slate-400/10 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* 
        The Architectural Spine (Precision Center Guideline with Radial Gradient Mask)
        Centered exactly at x=50%, fade smoothly at top and bottom edges
      */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden md:flex justify-center overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_88%,transparent_100%)]">
        <div 
          className="w-[1.5px] h-full bg-gradient-to-b from-transparent via-blue-500/35 to-transparent relative"
          style={{
            boxShadow: '0 0 16px rgba(59, 130, 246, 0.3)',
          }}
        >
          {/* Kinetic light pulse tracer traversing down the spine */}
          <div 
            ref={pathRef}
            className="absolute top-0 left-[-1px] w-[3.5px] h-32 bg-gradient-to-b from-transparent via-blue-400 to-transparent rounded-full opacity-80"
          />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto z-20">
        {/* Section Masthead (Dennis Snellenberg High-End Editorial) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 sm:mb-36 border-b border-[#121316]/15 pb-12">
          <div>
            <div className="flex items-center space-x-3 mb-5">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
              <span className="font-mono text-[11px] tracking-[0.25em] text-[#121316]/60 uppercase font-semibold">
                [ 02 / SELECTED WORKS ]
              </span>
            </div>
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-serif font-black tracking-tight text-[#121316] leading-[0.95]">
              Engineered for <br />
              <span className="italic font-normal font-serif text-blue-600">Impact & Scale</span>
            </h2>
          </div>

          <div className="mt-8 md:mt-0 max-w-md">
            <p className="text-sm sm:text-base text-[#121316]/75 font-sans leading-relaxed">
              Kompilasi rekayasa perangkat lunak terpilih: kalkulator presisi F&B, platform AI komersial, gamifikasi sistem, hingga arsitektur 3D matematika berkinerja tinggi.
            </p>
            <div className="flex items-center space-x-3 mt-5 text-[11px] font-mono text-[#121316]/50">
              <span className="font-bold text-[#121316]">TOTAL 07 PROYEK</span>
              <span>·</span>
              <span className="text-blue-600 font-bold">100% PRODUCTION READY</span>
            </div>
          </div>
        </div>

        {/* 
          Flagship Zig-Zag Projects (01 - 04)
          Open Editorial Architecture (Floating Canvas Layout)
        */}
        <div className="space-y-36 sm:space-y-48 mb-40">
          {PROJECTS.slice(0, 4).map((proj, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <div
                key={proj.id}
                className={`project-card relative flex flex-col ${
                  isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } items-center gap-12 lg:gap-20`}
              >
                {/* Ghost Backdrop Number Watermark (Architectural Luxury Depth) */}
                <div
                  className={`project-watermark absolute -top-24 sm:-top-32 ${
                    isEven ? '-left-6 sm:-left-12' : '-right-6 sm:-right-12'
                  } text-9xl sm:text-[14rem] md:text-[18rem] font-serif font-black text-[#121316]/[0.05] select-none pointer-events-none z-0 tracking-tighter leading-none`}
                >
                  {proj.num}
                </div>

                {/* Project Visual / Editorial Architectural Device */}
                <div className="w-full lg:w-3/5 group relative z-10 [perspective:1000px]">
                  {/* Subtle Glow Backdrop on Canvas */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/10 to-indigo-600/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-[#121316]/15 bg-[#050811] transition-all duration-700 ease-out group-hover:shadow-[0_35px_80px_rgba(37,99,235,0.22)] group-hover:-translate-y-2">
                    <ProjectMockup theme={proj.previewTheme} />
                    
                    {/* Hover Overlay Action */}
                    <div className="absolute inset-0 bg-[#050811]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                      <a
                        href={proj.liveUrl || proj.githubUrl || 'https://github.com/DevisRoomi'}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-white text-slate-950 font-mono text-xs font-bold px-6 py-3 rounded-full shadow-2xl flex items-center space-x-2 tracking-wider hover:scale-105 transition-transform"
                      >
                        <span>EXPLORE REPO / ARCHITECTURE</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Project Open Editorial Detail (Clean Typography Directly on Canvas) */}
                <div className="w-full lg:w-2/5 flex flex-col relative z-10">
                  {/* Category Taxonomy & Project Index */}
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="font-mono text-xs font-bold tracking-widest text-blue-600">
                      {proj.num} //
                    </span>
                    <span className="text-[11px] font-mono text-[#121316]/60 uppercase tracking-widest font-semibold">
                      {proj.category}
                    </span>
                  </div>

                  {/* Project Title (High-End Serif Display) */}
                  <h3 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-[#121316] mb-3 tracking-tight leading-none">
                    {proj.title}
                  </h3>

                  {/* Editorial Tagline */}
                  <p className="text-base sm:text-lg font-sans font-semibold text-[#121316] mb-4 leading-snug">
                    {proj.tagline}
                  </p>

                  {/* Deep Description */}
                  <p className="text-sm sm:text-base text-[#121316]/80 leading-relaxed font-sans mb-7 font-normal">
                    {proj.description}
                  </p>

                  {/* Monospace Micro-Pills */}
                  <div className="flex flex-wrap gap-2 mb-7">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11px] font-medium text-[#121316]/80 bg-white/70 border border-[#121316]/10 px-3 py-1 rounded-md tracking-wider uppercase shadow-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer Metrics & Direct Action */}
                  <div className="pt-5 border-t border-[#121316]/15 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-2 font-mono text-xs text-[#121316]/90">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span className="font-semibold">{proj.metrics}</span>
                    </div>

                    <a
                      href={proj.liveUrl || proj.githubUrl || 'https://github.com/DevisRoomi'}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#121316] hover:text-blue-600 transition-colors"
                    >
                      <span className="tracking-wider underline underline-offset-4 decoration-[#121316]/30 group-hover:decoration-blue-600">
                        {proj.liveUrl ? 'VISIT PRODUCTION' : 'VIEW ARCHITECTURE'}
                      </span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 
          Engineering Index (Projects 05 - 07)
          Minimalist, Dense High-End Editorial Table Format
        */}
        <div className="border-t-2 border-[#121316] pt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="font-mono text-xs text-[#121316]/60 uppercase tracking-widest block mb-2 font-semibold">
                [ 05 — 07 // EXTENDED REPERTOIRE ]
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif font-black text-[#121316]">
                Architecture & Systems Index
              </h3>
            </div>
            <span className="font-mono text-xs text-[#121316]/50 mt-2 sm:mt-0">
              HIGH-THROUGHPUT & CREATIVE CODE
            </span>
          </div>

          <div className="divide-y divide-[#121316]/10">
            {PROJECTS.slice(4).map((proj) => (
              <div
                key={proj.id}
                className="group py-7 sm:py-9 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#121316]/[0.03] px-2 sm:px-4 rounded-xl transition-all duration-300"
              >
                <div className="flex items-baseline space-x-5">
                  <span className="font-mono text-sm font-bold text-blue-600">
                    {proj.num}
                  </span>
                  <div>
                    <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#121316] group-hover:text-blue-600 transition-colors">
                      {proj.title}
                    </h4>
                    <span className="text-xs font-mono text-[#121316]/60 block mt-1">
                      {proj.tagline}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 md:max-w-md">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono text-[#121316]/65 bg-[#121316]/[0.04] border border-[#121316]/10 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-6 justify-between md:justify-end">
                  <span className="text-xs font-mono text-[#121316]/75">
                    {proj.metrics}
                  </span>
                  <a
                    href={proj.githubUrl || 'https://github.com/DevisRoomi'}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-[#121316] text-white flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300 shadow-md group-hover:scale-110"
                    aria-label={`View ${proj.title}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
