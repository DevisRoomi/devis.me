import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Play } from 'lucide-react';
import { ProjectInspectorModal, ProjectData } from '../components/ProjectInspectorModal';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS: ProjectData[] = [
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
    id: 'ereport',
    num: '02',
    title: 'E-REPORT',
    tagline: 'Civic Infrastructure Complaint & Documentation System',
    category: 'Civic Telemetry & Full-Stack TRPL Engineering',
    description: 'Platform tata kelola aduan infrastruktur sipil terstandar dengan verifikasi status laporan terintegrasi, logging audit otomatis, serta uji kualitas ketat berbasis 38 Pest tests & 181 assertions passed.',
    tags: ['LARAVEL 12', 'LIVEWIRE', 'PEST PHP', 'MYSQL / SQLITE'],
    metrics: '38 Pest Tests · 181 Assertions (100% Passing)',
    githubUrl: 'https://github.com/DevisRoomi',
    previewTheme: 'ereport',
  },
  {
    id: 'setoran-companion',
    num: '03',
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
    num: '04',
    title: 'DEVIS® 3D ORBITAL',
    tagline: 'Mathematical Radial Arc & Kinetic Dial Controller',
    category: 'Creative Front-End & Spatial Computing',
    description: 'Mesin carousel 3D radial non-WebGL dengan kalkulasi trigonometri native, synched rotary dial controller, serta transisi kurva preserve-3d yang super mulus di 60 FPS.',
    tags: ['TYPESCRIPT', 'CSS 3D MATRIX', 'GSAP CORE', 'TRIGONOMETRY'],
    metrics: '100/100 Lighthouse Performance · Zero Frame Drops',
    githubUrl: 'https://github.com/DevisRoomi',
    previewTheme: 'orbital',
  },
  {
    id: 'japanese-task',
    num: '05',
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
    id: 'capyquest',
    num: '06',
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
    id: 'spatial-3d',
    num: '07',
    title: '3D SPATIAL KINETICS',
    tagline: 'Interactive 3D Geometry & Realtime Canvas Showcase',
    category: 'Creative Engineering & Spatial Graphics',
    description: 'Eksperimen grafika 3D interaktif real-time dengan rotasi orbital matematis, proyeksi vertex kawat 3D tanpa beban library berat, dan akselerasi hardware penuh.',
    tags: ['HTML5 CANVAS', '3D WIREFRAME', 'TRIGONOMETRY', 'GPU ACCELERATED'],
    metrics: '60 FPS Smooth Render · Sub-millisecond Matrix Math',
    githubUrl: 'https://github.com/DevisRoomi',
    previewTheme: 'spatial',
  },
];

// High-fidelity programmatic vector mockup renderers
const ProjectMockup: React.FC<{ theme: ProjectData['previewTheme'] }> = ({ theme }) => {
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

    case 'ereport':
      return (
        <div className="w-full h-full bg-[#070D14] p-5 sm:p-7 flex flex-col justify-between font-mono select-none border border-emerald-900/40 shadow-2xl">
          <div className="flex items-center justify-between border-b border-emerald-900/40 pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span className="text-emerald-300 text-xs font-mono font-bold tracking-wider">E-REPORT // DISPATCH SYSTEM</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
              TRPL IDN · SEMESTER 1
            </span>
          </div>

          <div className="my-3 space-y-2.5">
            <div className="p-3 bg-[#0d1624] rounded-lg border border-emerald-900/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-mono">TIKET #ERP-2026-092</span>
                <span className="text-xs font-bold text-white font-sans">Jalan Rusak / Lubang Berbahaya</span>
              </div>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                DISPATCHED
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
              <div className="p-2 bg-[#0d1624] rounded border border-emerald-900/30">
                <span className="text-slate-400 block">PEST TEST SUITE</span>
                <span className="text-emerald-400 font-bold text-xs">38 TESTS PASS</span>
              </div>
              <div className="p-2 bg-[#0d1624] rounded border border-emerald-900/30">
                <span className="text-slate-400 block">ASSERTIONS</span>
                <span className="text-emerald-400 font-bold text-xs">181 VERIFIED</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-emerald-900/40">
            <span>LIVEWIRE 3 · LARAVEL 12</span>
            <span className="text-emerald-400 font-bold">● SYSTEM OPERATIONAL</span>
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
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <span className="text-slate-200 text-xs font-bold font-mono tracking-wide">SETORAN COMPANION</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
              CLOUD SYNC
            </span>
          </div>

          <div className="my-3 space-y-2.5">
            <div className="bg-slate-800/60 border border-slate-700/50 p-3 rounded-xl">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-semibold">SURAH AL-KAHF (1 - 110)</span>
                <span className="text-emerald-400 font-mono font-bold">MUTQIN</span>
              </div>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-full" />
              </div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/50 p-3 rounded-xl">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-semibold">JUZ 30 (AN-NABA - AN-NAS)</span>
                <span className="text-blue-400 font-mono font-bold">94% EVALUATED</span>
              </div>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[94%]" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
            <span>MULTI-SANTRI DATABASE</span>
            <span className="text-slate-200">ZERO DATA LOSS</span>
          </div>
        </div>
      );

    case 'orbital':
      return (
        <div className="w-full h-full bg-[#05060A] p-6 sm:p-8 flex flex-col justify-between font-mono text-xs select-none border border-blue-900/30">
          <div className="flex items-center justify-between border-b border-blue-950 pb-3">
            <span className="text-blue-400 font-bold tracking-widest text-[11px]">DEVIS® ORBITAL MATH MATRIX</span>
            <span className="text-slate-400 text-[10px]">CSS 3D · NO THREE.JS</span>
          </div>

          <div className="relative my-auto flex items-center justify-center py-4">
            <div className="w-40 h-40 rounded-full border border-blue-500/20 flex items-center justify-center animate-spin-slow">
              <div className="w-28 h-28 rounded-full border border-dashed border-blue-400/30 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                  3D
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] text-slate-500 pt-3 border-t border-blue-950">
            <span>TRANSFORM: PRESERVE-3D</span>
            <span className="text-blue-400 font-semibold">60 FPS SMOOTH LERP</span>
          </div>
        </div>
      );

    case 'task':
      return (
        <div className="w-full h-full bg-[#121214] p-5 sm:p-7 flex flex-col justify-between select-none">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <span className="text-xs font-mono tracking-widest text-zinc-300">ZEN TASK // MA AESTHETIC</span>
            <span className="text-[10px] font-mono text-zinc-500">ZUSTAND ISOLATED</span>
          </div>

          <div className="my-3 space-y-2 font-mono text-xs">
            <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 flex items-center space-x-2">
              <span className="text-emerald-400">✓</span>
              <span>Architectural core separation</span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 flex items-center space-x-2">
              <span className="text-emerald-400">✓</span>
              <span>Full keyboard express navigation</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 pt-2 border-t border-zinc-800">
            <span>42KB BUNDLE SIZE</span>
            <span className="text-zinc-300">100% ACCESSIBLE</span>
          </div>
        </div>
      );

    case 'spatial':
      return (
        <div className="w-full h-full bg-[#05060A] p-5 sm:p-7 flex flex-col justify-between select-none border border-sky-900/30">
          <div className="flex items-center justify-between border-b border-sky-950 pb-3">
            <span className="text-xs font-mono font-bold tracking-widest text-sky-400">3D SPATIAL KINETICS</span>
            <span className="text-[10px] font-mono text-sky-400/60">GPU ACCELERATED</span>
          </div>

          <div className="relative my-auto flex items-center justify-center py-4">
            <div className="w-32 h-20 border border-sky-500/40 rounded-lg flex items-center justify-center text-sky-300 font-mono text-xs shadow-[0_0_20px_rgba(56,189,248,0.2)]">
              [ 3D MESH ]
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 pt-2 border-t border-sky-950">
            <span>REALTIME CANVAS MATRIX</span>
            <span className="text-sky-400 font-semibold">CLICK TO INTERACT</span>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export const WorkSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<HTMLDivElement>(null);

  // Magnetic cursor tracker states
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [lensVisible, setLensVisible] = useState(false);

  // Selected project for interactive inspection modal
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Light pulse tracer traversing the architectural spine
      if (pathRef.current) {
        gsap.fromTo(
          pathRef.current,
          { top: '0%' },
          {
            top: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom bottom',
              scrub: 1,
            },
          }
        );
      }

      // Parallax effect on watermarks
      const watermarks = document.querySelectorAll('.project-watermark');
      watermarks.forEach((wm) => {
        gsap.fromTo(
          wm,
          { y: -30 },
          {
            y: 30,
            ease: 'none',
            scrollTrigger: {
              trigger: wm.closest('.project-card'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full bg-[#EFEFED] text-[#121316] pt-24 sm:pt-32 pb-32 sm:pb-44 px-6 sm:px-12 md:px-16 overflow-hidden selection:bg-crimson selection:text-white"
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
      <div className="absolute inset-0 pointer-events-none z-0 hidden md:flex justify-center overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,transparent_15%,black_22%,black_88%,transparent_100%)]">
        <div 
          className="w-[1.5px] h-full bg-gradient-to-b from-blue-500/80 via-blue-500/35 to-transparent relative"
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

      {/* Floating Magnetic Interaction Cursor Lens (Awwwards Creative Interaction) */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-50 transition-opacity duration-300 ease-out hidden lg:block ${
          lensVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <div className="w-28 h-28 rounded-full bg-blue-600/90 text-white backdrop-blur-md flex flex-col items-center justify-center shadow-[0_10px_35px_rgba(37,99,235,0.45)] border border-white/20 scale-100 transition-transform duration-200">
          <Play className="w-4 h-4 mb-0.5 fill-white" />
          <span className="font-mono text-[8px] font-bold tracking-widest uppercase text-center px-1">
            TEST ARTIFACT
          </span>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto z-20">
        {/* Section Masthead (Dennis Snellenberg High-End Editorial) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 sm:mb-44 border-b border-[#121316]/10 pb-16 sm:pb-20">
          <div>
            <div className="flex items-center space-x-3 mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block shadow-[0_0_10px_rgba(37,99,235,0.6)]" />
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
              Kompilasi rekayasa perangkat lunak terpilih: kalkulator presisi F&B, sistem tata kelola aduan infrastruktur sipil, platform tahfidz cloud, gamifikasi produktivitas, hingga kalkulasi 3D matematika berkinerja tinggi.
            </p>
            <div className="flex items-center space-x-3 mt-5 text-[11px] font-mono text-[#121316]/50">
              <span className="font-bold text-[#121316]">TOTAL 07 PROYEK</span>
              <span>·</span>
              <span className="text-emerald-600 font-bold">100% VERIFIED ARTIFACTS</span>
            </div>
          </div>
        </div>

        {/* 
          Flagship Zig-Zag Projects (01 - 04)
          Open Editorial Architecture (Floating Canvas Layout with Interactive Hover Focus)
        */}
        <div className="space-y-36 sm:space-y-48 mb-40">
          {PROJECTS.slice(0, 4).map((proj, idx) => {
            const isEven = idx % 2 === 1;
            const isHovered = hoveredProjectId === proj.id;
            const isAnyHovered = hoveredProjectId !== null;

            return (
              <div
                key={proj.id}
                onMouseEnter={() => {
                  setHoveredProjectId(proj.id);
                  setLensVisible(true);
                }}
                onMouseLeave={() => {
                  setHoveredProjectId(null);
                  setLensVisible(false);
                }}
                onClick={() => setSelectedProject(proj)}
                className={`project-card relative flex flex-col ${
                  isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } items-center gap-12 lg:gap-20 transition-all duration-700 cursor-pointer ${
                  isAnyHovered && !isHovered ? 'opacity-35 filter blur-[0.8px] scale-[0.98]' : 'opacity-100 scale-100'
                }`}
              >
                {/* Ghost Backdrop Number Watermark (Architectural Luxury Depth) */}
                <span
                  className="project-watermark absolute -top-16 sm:-top-28 text-[9rem] sm:text-[14rem] md:text-[18rem] font-serif font-black text-[#121316]/[0.05] select-none pointer-events-none leading-none z-0"
                  style={{
                    left: isEven ? 'auto' : '-2rem',
                    right: isEven ? '-2rem' : 'auto',
                  }}
                >
                  {proj.num}
                </span>

                {/* 
                  Media/Mockup Showcase Container (55% width on desktop)
                  Dark Floating Card with 3D Perspective Elevation
                */}
                <div className="w-full lg:w-[56%] z-10 [perspective:1000px]">
                  <div
                    className={`relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-2xl overflow-hidden bg-[#0A0B0E] border border-[#121316]/10 shadow-[0_20px_60px_-15px_rgba(18,19,22,0.15)] transition-all duration-500 ease-out ${
                      isHovered
                        ? 'shadow-[0_30px_90px_-15px_rgba(37,99,235,0.25)] border-blue-500/40 -translate-y-2 rotate-x-1'
                        : 'hover:shadow-2xl'
                    }`}
                  >
                    {/* Ambient subtle glow inside card on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-indigo-600/5 transition-opacity duration-500 pointer-events-none z-10 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`}
                    />

                    {/* Vector programmatic preview */}
                    <ProjectMockup theme={proj.previewTheme} />
                  </div>
                </div>

                {/* 
                  Editorial Storytelling Container (45% width on desktop)
                  Asymmetrical Typography & Snellenberg Hierarchy
                */}
                <div className="w-full lg:w-[44%] z-10">
                  {/* Category & Serial Pill */}
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="font-mono text-xs font-bold text-blue-600 tracking-wider">
                      [ {proj.num} ]
                    </span>
                    <span className="w-6 h-[1px] bg-[#121316]/20" />
                    <span className="font-mono text-[11px] uppercase tracking-widest text-[#121316]/60 font-semibold">
                      {proj.category}
                    </span>
                  </div>

                  {/* Main Headline */}
                  <div className="flex items-center space-x-3 mb-3 group">
                    <h3 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-[#121316] tracking-tight leading-none group-hover:text-blue-600 transition-colors duration-300">
                      {proj.title}
                    </h3>
                    <ArrowUpRight
                      className={`w-6 h-6 text-blue-600 transition-all duration-300 ${
                        isHovered ? 'opacity-100 translate-x-1 -translate-y-1' : 'opacity-0 translate-x-0 translate-y-0'
                      }`}
                    />
                  </div>

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

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(proj);
                      }}
                      className="group inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#121316] hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      <span className="tracking-wider underline underline-offset-4 decoration-[#121316]/30 group-hover:decoration-blue-600">
                        LAUNCH SIMULATOR & ARTIFACT
                      </span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
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
                onClick={() => setSelectedProject(proj)}
                className="group py-7 sm:py-9 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#121316]/[0.03] px-2 sm:px-4 rounded-xl transition-all duration-300 cursor-pointer"
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
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(proj);
                    }}
                    className="w-10 h-10 rounded-full bg-[#121316] text-white flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300 shadow-md group-hover:scale-110 cursor-pointer"
                    aria-label={`View ${proj.title}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Project Inspector Modal Dialog */}
      <ProjectInspectorModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
