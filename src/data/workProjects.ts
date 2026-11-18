import { Project, SlotConfig, FooterCategory } from '../types/work';

/* ═══════════════════════════════════════════════════════════════════════════
   8 SHOWCASE PROJECTS (Disciplined Editorial Curation)
   Hierarchy: 1 Master Hero Card + 7 Stepped Supporting Cards
   Authentic project names, clear categories, and 1-sentence value statements.
   ═══════════════════════════════════════════════════════════════════════════ */
export const PROJECTS: Project[] = [
  // ── 01: PENTACART (Hero Card — Sky Mist / Ice Blue) ──
  {
    id: 'pentacart',
    num: '06',
    category: 'WEB APPLICATION',
    title: 'PENTACART',
    subtitle: 'Campus Procurement Platform',
    description: 'Sistem pemesanan dan pengelolaan tenant kantin kampus dalam satu platform terpadu dengan katalog QRIS mandiri.',
    longDesc: 'Katalog QRIS & pesan antar asrama mahasiswa. Memfasilitasi transaksi internal mahasiswa secara efisien, pelacakan status pesanan real-time, dan sistem rekapitulasi penjualan mandiri untuk tenant kantin asrama.',
    tags: ['Laravel', 'Livewire', 'MySQL'],
    githubUrl: 'https://github.com/DevisRoomi/pentacart-IDN',
    images: [
      { url: '/assets/projects/Pentacart.png', label: 'Katalog Multi-Tenant' },
      { url: '/assets/projects/Pentacart%202.png', label: 'Detail Pesanan' },
      { url: '/assets/projects/Pentacart%203.png', label: 'Dasbor Tenant' },
    ],
    bg: '#BAE6FD',         // Sky Mist / Ice Blue (Uniform Soft Tone)
    fg: '#0C4A6E',         // Deep Navy
    bevelColor: '#7DD3FC', // Subtle extrusion
    accentBg: 'rgba(12, 74, 110, 0.10)',
    accentFg: '#0C4A6E',
    dark: false,
  },
  // ── 02: BASOKU (Peeking Right-Top — Warm Amber / Butter) ──
  {
    id: 'basoku',
    num: '01',
    category: 'WEB APP',
    title: 'BASOKU',
    subtitle: 'Recipe & Production Cost Apparatus',
    description: 'Kalkulator adonan presisi dan estimasi HPP per porsi otomatis untuk mengontrol efisiensi biaya produksi kuliner bakso.',
    longDesc: 'Basoku dikembangkan khusus untuk pelaku UMKM kuliner bakso. Dilengkapi kalkulator adonan presisi, estimasi HPP (Harga Pokok Penjualan) per porsi otomatis, dan manajemen inventaris bahan baku real-time berbasis Laravel dan Livewire.',
    tags: ['Laravel', 'Livewire', 'MySQL'],
    githubUrl: 'https://github.com/DevisRoomi/Basoku',
    images: [
      { url: '/assets/projects/Basoku.png', label: 'Halaman Utama & Resep' },
      { url: '/assets/projects/Basoku%20Kalkulator.png', label: 'Kalkulator Adonan & Biaya' },
    ],
    bg: '#FDE047',         // Warm Amber / Butter
    fg: '#18181B',         // Deep Charcoal
    bevelColor: '#EAB308', // Amber Bevel
    accentBg: 'rgba(24, 24, 27, 0.10)',
    accentFg: '#18181B',
    dark: false,
  },
  // ── 03: TAHFIDZ KALAMUL HAFIDZ (Peeking Left-Top — Soft Iris / Lavender) ──
  {
    id: 'tahfidz',
    num: '07',
    category: 'EDUCATION',
    title: 'TAHFIDZ KALAMUL HAFIDZ',
    subtitle: 'Quran Memorization Progress Platform',
    description: 'Sistem manajemen terpadu pencatatan setoran hafalan Al-Quran, evaluasi tajwid, dan rekapitulasi kemajuan santri.',
    longDesc: 'Platform digital manajemen tahfidz Al-Quran untuk pesantren & lembaga Islam. Memudahkan ustadz dan santri mencatat setoran hafalan, penilaian kelancaran tajwid, serta menerbitkan rapor kemajuan santri per semester.',
    tags: ['Laravel', 'MySQL', 'Tailwind'],
    githubUrl: 'https://github.com/DevisRoomi/Tahfidz-Kalamul-Hafizh',
    images: [
      { url: '/assets/projects/Tahfidz%20Kalamul%20Hafidz.png', label: 'Dasbor Santri' },
      { url: '/assets/projects/Tahfidz%20Kalamul%20Hafidz%202.png', label: 'Input Setoran' },
      { url: '/assets/projects/Tahfidz%20Kalamul%20Hafidz%203.png', label: 'Laporan Hafalan' },
    ],
    bg: '#8B5CF6',         // Soft Iris / Lavender
    fg: '#FFFFFF',         // Crisp White
    bevelColor: '#6D28D9', // Deep Iris Bevel
    accentBg: 'rgba(255, 255, 255, 0.20)',
    accentFg: '#FFFFFF',
    dark: true,
  },
  // ── 04: JARVIS AI (Peeking Mid-Left — Deep Teal / Cyan) ──
  {
    id: 'jarvis',
    num: '03',
    category: 'AI ASSISTANT',
    title: 'JARVIS AI',
    subtitle: 'Autonomous Quantum Voice Assistant',
    description: 'Asisten AI suara berlatensi ultra-rendah dengan visualisasi 3D WebGL reaktif dan kendali sistem operasi native.',
    longDesc: 'DEVIS® JARVIS — Autonomous Quantum Full-Duplex Voice Assistant & Native OS Controller. Dibangun menggunakan FastAPI backend, Three.js 3D WebGL reactive visualizer, Groq LPU ultra-low latency inference, dan sintesis suara ElevenLabs.',
    tags: ['FastAPI', 'Three.js', 'Groq'],
    githubUrl: 'https://github.com/DevisRoomi/jarvis-assistant',
    images: [
      { url: '/assets/projects/DevisJarvis.png', label: 'Voice Interface & Telemetry HUD' },
    ],
    bg: '#0F766E',         // Deep Teal / Cyan
    fg: '#F0FDFA',         // Mint White
    bevelColor: '#115E59', // Darker Teal Bevel
    accentBg: 'rgba(240, 253, 250, 0.16)',
    accentFg: '#F0FDFA',
    dark: true,
  },
  // ── 05: DUITIN (Peeking Lower-Left — Slate Navy / Midnight) ──
  {
    id: 'duitin',
    num: '05',
    category: 'FINTECH',
    title: 'DUITIN',
    subtitle: 'Smart Cashflow & Expense Tracker',
    description: 'Pelacak keuangan pribadi berbasis Rust & React untuk pencatatan arus kas harian dan analitik alokasi budget bulanan.',
    longDesc: 'Aplikasi web personal finance tracker berbasis Rust & React yang dirancang untuk membantu mahasiswa dan individu pemula mencatat arus kas harian, memantau sisa saldo, serta menganalisis kebiasaan belanja bulanan dalam Rupiah (IDR).',
    tags: ['Rust', 'React', 'ChartJS'],
    githubUrl: 'https://github.com/DevisRoomi/Duitin',
    images: [
      { url: '/assets/projects/Duitin.png', label: 'Dasbor Arus Kas & Budget' },
    ],
    bg: '#1E293B',         // Slate Navy / Midnight (Dark Anchor 1)
    fg: '#F8FAFC',         // Crisp White
    bevelColor: '#0F172A', // Midnight Bevel
    accentBg: 'rgba(255, 255, 255, 0.14)',
    accentFg: '#F8FAFC',
    dark: true,
  },
  // ── 06: MATCHAVERSE (Peeking Mid-Right — Sage / Matcha Olive) ──
  {
    id: 'matchaverse',
    num: '08',
    category: 'E-COMMERCE',
    title: 'MATCHAVERSE',
    subtitle: 'Artisan Matcha Store System',
    description: 'Platform katalog e-commerce artisan matcha premium dengan keranjang interaktif, ongkir dinamis, dan checkout mulus.',
    longDesc: 'Platform e-commerce katalog artisan matcha premium dengan sistem cart interaktif, estimasi ongkir otomatis, dan checkout terintegrasi yang dibangun di atas stack Laravel 13, Alpine.js, dan Tailwind CSS.',
    tags: ['Laravel 13', 'Alpine.js', 'Tailwind'],
    githubUrl: 'https://github.com/DevisRoomi/e-commerce-laravel-13-matcha',
    images: [
      { url: '/assets/projects/Matchaverse.png', label: 'Halaman Brand' },
      { url: '/assets/projects/Matchaverse%20Katalog.png', label: 'Katalog Varian' },
    ],
    bg: '#2D5A27',         // Sage / Matcha Olive (Dark Anchor 2)
    fg: '#F8FAFC',         // White
    bevelColor: '#1E3E1A', // Dark Olive Bevel
    accentBg: 'rgba(255, 255, 255, 0.14)',
    accentFg: '#F8FAFC',
    dark: true,
  },
  // ── 07: E-REPORT (Peeking Top-Rear — Warm Terracotta / Peach) ──
  {
    id: 'e-report',
    num: '02',
    category: 'CIVIC TECH',
    title: 'E-REPORT',
    subtitle: 'Public Infrastructure Incident Platform',
    description: 'Platform pelaporan dan pemantauan kerusakan fasilitas publik terintegrasi dinas dengan tiket insiden transparan.',
    longDesc: 'Sistem informasi pelaporan infrastruktur publik dengan verifikasi berkas bertingkat, pelacakan tiket perbaikan, serta dasbor analitik respon dinas berbasis PHP Blade & MySQL.',
    tags: ['PHP', 'MySQL', 'Bootstrap'],
    githubUrl: 'https://github.com/DevisRoomi/project-e-report-abudevis-260558302012',
    images: [
      { url: '/assets/projects/E-report.png', label: 'Dasbor Insiden Publik' },
    ],
    bg: '#FDBA74',         // Warm Terracotta / Peach (Uniform Tone)
    fg: '#451A03',         // Deep Rich Espresso Terracotta (high contrast)
    bevelColor: '#EA580C', // Terracotta Bevel
    accentBg: 'rgba(69, 26, 3, 0.12)',
    accentFg: '#451A03',
    dark: false,
  },
  // ── 08: CAPYQUEST (Peeking Lower-Right — Coral Rose) ──
  {
    id: 'capyquest',
    num: '04',
    category: 'GAME DEV',
    title: 'CAPYQUEST',
    subtitle: 'Gamified Quest & Habit Engine',
    description: 'Aplikasi pembangun kebiasaan harian dengan mekanik quest petualangan interaktif capybara berbasis Bun dan React 19.',
    longDesc: 'Playful gamified quest & habit tracker. Backend Bun + Hono ultra-cepat, React 19 frontend, SQLite embedded, JWT authentication, dan TanStack Query state orchestration.',
    tags: ['Bun', 'Hono', 'React 19'],
    githubUrl: 'https://github.com/DevisRoomi/Capyquest',
    images: [
      { url: '/assets/projects/Capyquest.png', label: 'Quest Explorer' },
      { url: '/assets/projects/Capyquest%202.png', label: 'Habit Matrix' },
      { url: '/assets/projects/Capyquest%203.png', label: 'Leaderboard' },
    ],
    bg: '#F43F5E',         // Coral Rose (Playful yet sophisticated)
    fg: '#FFFFFF',         // White
    bevelColor: '#BE123C', // Deeper Rose Bevel
    accentBg: 'rgba(255, 255, 255, 0.20)',
    accentFg: '#FFFFFF',
    dark: true,
  },
];

export const HERO_W = 295;
export const HERO_H = 410;
export const SUB_W = 232;
export const SUB_H = 318;

export const SLOTS: SlotConfig[] = [
  // 0: CENTER HERO CARD — Clear master focal point, perfectly upright
  { x: 0,    y: -14,  rot: 0,    w: HERO_W, h: HERO_H, z: 65, opacity: 1.00 },
  // 1: RIGHT FLANK (On-Deck: enters to Center on Next)
  { x: 238,  y: -6,   rot: 6.0,  w: SUB_W,  h: SUB_H,  z: 46, opacity: 0.96 },
  // 2: LOWER-RIGHT
  { x: 148,  y: 94,   rot: 3.5,  w: SUB_W,  h: SUB_H,  z: 42, opacity: 0.94 },
  // 3: TOP-RIGHT
  { x: 172,  y: -128, rot: 5.0,  w: SUB_W,  h: SUB_H,  z: 38, opacity: 0.98 },
  // 4: TOP-REAR HORIZON (Deepest rear)
  { x: 8,    y: -176, rot: -1.5, w: 226,    h: 312,    z: 28, opacity: 0.90 },
  // 5: TOP-LEFT
  { x: -172, y: -128, rot: -5.0, w: SUB_W,  h: SUB_H,  z: 38, opacity: 0.98 },
  // 6: LOWER-LEFT
  { x: -148, y: 94,   rot: -3.5, w: SUB_W,  h: SUB_H,  z: 42, opacity: 0.94 },
  // 7: LEFT FLANK (Egress: departs from Center on Next)
  { x: -238, y: -6,   rot: -6.0, w: SUB_W,  h: SUB_H,  z: 46, opacity: 0.96 },
];

export const FOOTER_CATEGORIES: FooterCategory[] = [
  { label: 'Web App', match: (c: string) => c.includes('WEB') },
  { label: 'Civic Tech', match: (c: string) => c.includes('CIVIC') },
  { label: 'AI', match: (c: string) => c.includes('AI') },
  { label: 'Fintech', match: (c: string) => c.includes('FINTECH') },
  { label: 'E-Commerce', match: (c: string) => c.includes('COMMERCE') },
  { label: 'Education', match: (c: string) => c.includes('EDUCATION') },
  { label: 'Game Dev', match: (c: string) => c.includes('GAME') },
];
