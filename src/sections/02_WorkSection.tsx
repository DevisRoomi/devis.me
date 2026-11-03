import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

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
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!pathRef.current || !sectionRef.current) return;

      const path = pathRef.current;
      const pathLength = path.getTotalLength();

      // Setup initial dash properties
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // ScrollTrigger to animate stroke along scroll progress
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      });

      // Project cards stagger fade-in
      const cards = gsap.utils.toArray<HTMLElement>('.project-card');
      cards.forEach((card) => {
        // Fallback safety: ensure card is never stuck at opacity 0
        gsap.set(card, { opacity: 1, y: 0 });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full bg-[#F8F9FA] text-[#0F172A] py-28 sm:py-36 px-6 sm:px-12 md:px-16 overflow-hidden selection:bg-crimson selection:text-white"
    >
      {/* Background Architectural Blueprint Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(15, 23, 42, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 23, 42, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* 
        The Lusion Dynamic Guiding Line (Continuous SVG Spline)
        Flows organic through the central gutter between left and right project cards,
        weaving in whitespace and NEVER intersecting card bounding boxes.
      */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden md:block overflow-hidden">
        <svg
          viewBox="0 0 1440 4800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            d="
              M 840 100
              C 840 400, 840 800, 840 1200
              C 840 1350, 600 1450, 600 1600
              C 600 1950, 600 2150, 600 2350
              C 600 2500, 840 2600, 840 2750
              C 840 3100, 840 3250, 840 3450
              C 840 3600, 600 3700, 600 3850
              C 600 4150, 720 4400, 720 4800
            "
            stroke="#2563EB"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="opacity-45"
            style={{
              filter: 'drop-shadow(0 2px 10px rgba(37, 99, 235, 0.25))',
            }}
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto z-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 sm:mb-28 border-b border-slate-300 pb-10">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-crimson animate-ping" />
              <span className="font-mono text-xs tracking-widest text-slate-500 uppercase">
                [ 02 / SELECTED WORKS ]
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight text-slate-900">
              Engineered for <br className="hidden sm:inline" />
              <span className="italic font-normal font-serif text-blue-600">Impact & Scale</span>
            </h2>
          </div>

          <div className="mt-8 md:mt-0 max-w-md">
            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              Kompilasi rekayasa perangkat lunak terpilih: kalkulator presisi F&B, platform AI komersial, gamifikasi sistem, hingga arsitektur 3D matematika berkinerja tinggi.
            </p>
            <div className="flex items-center space-x-3 mt-4 text-xs font-mono text-slate-500">
              <span>TOTAL 07 PROYEK</span>
              <span>·</span>
              <span className="text-blue-600 font-semibold">100% PRODUCTION READY</span>
            </div>
          </div>
        </div>

        {/* 
          Flagship Zig-Zag Projects (01 - 04)
        */}
        <div className="space-y-28 sm:space-y-40 mb-32">
          {PROJECTS.slice(0, 4).map((proj, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <div
                key={proj.id}
                className={`project-card relative flex flex-col ${
                  isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } items-center gap-10 lg:gap-16`}
              >
                {/* Ghost Backdrop Number */}
                <div
                  className={`absolute -top-16 sm:-top-20 ${
                    isEven ? 'left-6 lg:left-12' : 'right-6 lg:right-12'
                  } text-8xl sm:text-9xl md:text-[14rem] font-serif font-black text-slate-900/30 select-none pointer-events-none z-10 tracking-tighter`}
                >
                  {proj.num}
                </div>

                {/* Project Visual / Mockup Card */}
                <div className="w-full lg:w-3/5 group relative z-20">
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-300/80 bg-white transition-all duration-500 group-hover:shadow-[0_30px_60px_rgba(37,99,235,0.18)] group-hover:-translate-y-1.5">
                    <ProjectMockup theme={proj.previewTheme} />
                    
                    {/* Hover Overlay Action */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                      <span className="bg-white text-slate-950 font-mono text-xs font-bold px-5 py-2.5 rounded-full shadow-lg flex items-center space-x-2 tracking-wider">
                        <span>EXPLORE REPO / ARCHITECTURE</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Editorial Detail */}
                <div className="w-full lg:w-2/5 flex flex-col relative z-20 bg-white/95 lg:bg-white/90 backdrop-blur-md p-6 lg:p-7 rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                  <div className="flex items-center space-x-2.5 mb-2">
                    <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      PROYEK {proj.num}
                    </span>
                    <span className="text-xs font-mono text-slate-400">/</span>
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                      {proj.category}
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-serif font-black text-slate-950 mb-3 tracking-tight">
                    {proj.title}
                  </h3>

                  <p className="text-sm sm:text-base font-bold text-slate-900 font-sans mb-3">
                    {proj.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans mb-6 font-medium">
                    {proj.description}
                  </p>

                  {/* Monospace Tech Tag Pills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11px] font-bold bg-slate-900 text-slate-100 px-2.5 py-1 rounded shadow-xs"
                      >
                        [ {tag} ]
                      </span>
                    ))}
                  </div>

                  {/* Engineering Metric & Link */}
                  <div className="pt-4 border-t border-slate-300 flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono text-[11px] text-emerald-900 bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-300 font-bold shrink-0">
                      ✓ {proj.metrics}
                    </span>

                    {proj.liveUrl ? (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-blue-600 hover:text-blue-800 transition-colors shrink-0"
                      >
                        <span>VISIT DEMO</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <a
                        href={proj.githubUrl || 'https://github.com/DevisRoomi'}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-slate-800 hover:text-blue-600 transition-colors shrink-0"
                      >
                        <span>VIEW CODE</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 
          Engineering Index (Projects 05 - 07)
          Minimalist, Dense Editorial Table Format for Rhythm & Contrast
        */}
        <div className="border-t-2 border-slate-900 pt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="font-mono text-xs text-slate-500 uppercase tracking-widest block mb-1">
                [ 05 — 07 // EXTENDED REPERTOIRE ]
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Architecture & Systems Index
              </h3>
            </div>
            <span className="font-mono text-xs text-slate-500 hidden sm:inline">
              SORTED BY RELEVANCE
            </span>
          </div>

          <div className="divide-y divide-slate-200">
            {PROJECTS.slice(4).map((proj) => (
              <div
                key={proj.id}
                className="group py-6 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white hover:px-4 rounded-xl transition-all duration-300"
              >
                <div className="flex items-baseline space-x-4">
                  <span className="font-mono text-sm font-bold text-blue-600">
                    {proj.num}
                  </span>
                  <div>
                    <h4 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {proj.title}
                    </h4>
                    <span className="text-xs font-mono text-slate-500 block mt-0.5">
                      {proj.tagline}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 md:max-w-md">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-4 justify-between md:justify-end">
                  <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {proj.metrics}
                  </span>
                  <a
                    href={proj.githubUrl || 'https://github.com/DevisRoomi'}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-blue-600 transition-colors shadow-sm"
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
