import React, { useState, useEffect, useRef } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Sliders, Play, ShieldCheck, Cpu, Database, Layers } from 'lucide-react';

export interface ProjectData {
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
  previewTheme: 'basoku' | 'ereport' | 'capy' | 'tahfidz' | 'orbital' | 'task' | 'spatial';
}

interface ProjectInspectorModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectInspectorModal: React.FC<ProjectInspectorModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'simulator' | 'blueprint'>('simulator');

  // Simulator states for Basoku
  const [meatKg, setMeatKg] = useState<number>(5);
  const [flourKg, setFlourKg] = useState<number>(1.2);
  const [meatPrice, setMeatPrice] = useState<number>(125000);

  // Simulator states for E-Report
  const [reportType, setReportType] = useState<string>('Jalan Rusak / Lubang');
  const [reportLocation, setReportLocation] = useState<string>('Jl. Raya Jonggol - Cileungsi KM 14');
  const [reportStatus, setReportStatus] = useState<'idle' | 'submitting' | 'dispatched' | 'verified'>('idle');

  // Simulator states for Zen Task
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Refactor state isolation module', done: true },
    { id: 2, title: 'Verify Lighthouse score >= 98', done: true },
    { id: 3, title: 'Implement keyboard shortcut handlers', done: false },
    { id: 4, title: 'Audit contrast ratio according to WCAG AAA', done: false },
  ]);
  const [timerSeconds, setTimerSeconds] = useState(1500);
  const [timerRunning, setTimerRunning] = useState(false);

  // Simulator states for CapyQuest
  const [capyExp, setCapyExp] = useState(380);
  const [capyGold, setCapyGold] = useState(120);
  const [capyStreak, setCapyStreak] = useState(8);

  // Simulator states for 3D Orbital
  const [orbitalAngle, setOrbitalAngle] = useState(45);

  // Canvas for 3D Wireframe Car / Spatial
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotAngleRef = useRef({ x: 0.3, y: 0.6 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Pomodoro timer tick
  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds((s) => s - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  // 3D Canvas Wireframe Animation Loop
  useEffect(() => {
    if (project?.previewTheme !== 'spatial' || activeTab !== 'simulator') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    // Define 3D wireframe car / vehicle chassis vertices
    const vertices: [number, number, number][] = [
      // Chassis base
      [-1.4, -0.2, -0.7], [1.4, -0.2, -0.7], [1.4, -0.2, 0.7], [-1.4, -0.2, 0.7],
      // Hood & Cabin
      [-1.3, 0.2, -0.65], [-0.4, 0.2, -0.65], [0.3, 0.6, -0.55], [0.9, 0.6, -0.55],
      [1.2, 0.2, -0.65], [1.3, 0.2, -0.65],
      [-1.3, 0.2, 0.65], [-0.4, 0.2, 0.65], [0.3, 0.6, 0.55], [0.9, 0.6, 0.55],
      [1.2, 0.2, 0.65], [1.3, 0.2, 0.65],
    ];

    const edges: [number, number][] = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 8], [8, 9],
      [10, 11], [11, 12], [12, 13], [13, 14], [14, 15],
      [0, 4], [1, 9], [2, 15], [3, 10],
      [5, 11], [6, 12], [7, 13], [8, 14],
      [4, 10], [9, 15],
    ];

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const scale = 110;

      if (!isDraggingRef.current) {
        rotAngleRef.current.y += 0.012;
      }

      const ax = rotAngleRef.current.x;
      const ay = rotAngleRef.current.y;

      // Project vertices
      const projected = vertices.map(([vx, vy, vz]) => {
        // Rotate Y
        const x1 = vx * Math.cos(ay) + vz * Math.sin(ay);
        const z1 = -vx * Math.sin(ay) + vz * Math.cos(ay);
        // Rotate X
        const y2 = vy * Math.cos(ax) - z1 * Math.sin(ax);
        const z2 = vy * Math.sin(ax) + z1 * Math.cos(ax);

        const depth = 3.5 / (3.5 + z2);
        return {
          px: cx + x1 * scale * depth,
          py: cy - y2 * scale * depth,
          depth,
        };
      });

      // Draw grid floor
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
      ctx.lineWidth = 1;
      for (let g = -2; g <= 2; g += 0.5) {
        const p1x = cx + g * scale * 0.7;
        const p1y = cy + 60;
        ctx.beginPath();
        ctx.arc(p1x, p1y, 2, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw edges
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.6;
      edges.forEach(([i, j]) => {
        const pA = projected[i];
        const pB = projected[j];
        ctx.beginPath();
        ctx.moveTo(pA.px, pA.py);
        ctx.lineTo(pB.px, pB.py);
        ctx.stroke();
      });

      // Draw vertex joints
      ctx.fillStyle = '#60a5fa';
      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.px, p.py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [project, activeTab]);

  if (!project) return null;

  // Calculation for Basoku
  const totalWeightKg = meatKg + flourKg + meatKg * 0.25; // with ice & seasonings
  const meatballCount = Math.round((totalWeightKg * 1000) / 16); // 16g per meatball
  const meatCost = meatKg * meatPrice;
  const flourCost = flourKg * 14000;
  const grindingFee = (meatKg + flourKg) * 4000;
  const totalCost = meatCost + flourCost + grindingFee + 35000; // spices
  const costPerPiece = Math.round(totalCost / Math.max(1, meatballCount));
  const suggestedSellingPrice = 1800;
  const grossRevenue = meatballCount * suggestedSellingPrice;
  const grossProfit = grossRevenue - totalCost;
  const marginPct = ((grossProfit / Math.max(1, grossRevenue)) * 100).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300" 
      />

      {/* Modal Dialog Card */}
      <div 
        className="relative w-full max-w-5xl bg-[#0B0C0E] border border-white/15 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] text-white overflow-hidden z-10 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#121316]">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs font-bold text-blue-500 bg-blue-500/10 border border-blue-500/30 px-2.5 py-1 rounded">
              [ PROJ / {project.num} ]
            </span>
            <div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                {project.title}
                <span className="text-xs font-mono font-normal text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  LIVE ARTIFACT
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono hidden sm:block">
                {project.category}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold transition-colors"
              >
                <span>OPEN LIVE APP</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-white/10 bg-[#0F1013] px-6">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`py-3 px-4 font-mono text-xs font-bold border-b-2 transition-all flex items-center space-x-2 ${
              activeTab === 'simulator'
                ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>INTERACTIVE SYSTEM SIMULATOR</span>
          </button>
          <button
            onClick={() => setActiveTab('blueprint')}
            className={`py-3 px-4 font-mono text-xs font-bold border-b-2 transition-all flex items-center space-x-2 ${
              activeTab === 'blueprint'
                ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>ARCHITECTURE & BENCHMARKS</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 font-sans">
          {activeTab === 'simulator' ? (
            <div>
              {/* Basoku Realtime Meat & Ratio Calculator */}
              {project.previewTheme === 'basoku' && (
                <div className="space-y-6">
                  <div className="bg-[#121316] border border-white/10 rounded-xl p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                      <div className="flex items-center space-x-2">
                        <Sliders className="w-4 h-4 text-rose-500" />
                        <h4 className="font-mono text-sm font-bold text-white tracking-wide uppercase">
                          Basoku Smart Recipe Formula Calculator
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">
                        MATHEMATICAL YIELD ENGINE
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <label className="text-xs font-mono text-slate-300 block mb-2">
                          DAGING SAPI (KG): <span className="text-rose-400 font-bold">{meatKg} kg</span>
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="25"
                          step="0.5"
                          value={meatKg}
                          onChange={(e) => setMeatKg(parseFloat(e.target.value))}
                          className="w-full accent-rose-500 cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                          <span>1 kg</span>
                          <span>12.5 kg</span>
                          <span>25 kg</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-300 block mb-2">
                          TEPUNG TAPIOKA (KG): <span className="text-amber-400 font-bold">{flourKg} kg</span>
                        </label>
                        <input
                          type="range"
                          min="0.2"
                          max="8"
                          step="0.1"
                          value={flourKg}
                          onChange={(e) => setFlourKg(parseFloat(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                          <span>0.2 kg</span>
                          <span>Proporsi {(flourKg / meatKg).toFixed(2)}x</span>
                          <span>8 kg</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-300 block mb-2">
                          HARGA DAGING/KG: <span className="text-emerald-400 font-bold">Rp {meatPrice.toLocaleString()}</span>
                        </label>
                        <input
                          type="range"
                          min="90000"
                          max="160000"
                          step="5000"
                          value={meatPrice}
                          onChange={(e) => setMeatPrice(parseInt(e.target.value))}
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                          <span>Rp 90k</span>
                          <span>Rp 125k</span>
                          <span>Rp 160k</span>
                        </div>
                      </div>
                    </div>

                    {/* Calculated Output Matrix */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#090A0C] border border-white/10 font-mono text-center">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">ESTIMASI HASIL</span>
                        <span className="text-xl sm:text-2xl font-bold text-white">{meatballCount}</span>
                        <span className="text-[10px] text-slate-500 block">Butir Bakso @16g</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">TOTAL BIAYA HPP</span>
                        <span className="text-xl sm:text-2xl font-bold text-amber-400">Rp {costPerPiece}</span>
                        <span className="text-[10px] text-slate-500 block">per Butir</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">PROYEKSI OMSET</span>
                        <span className="text-xl sm:text-2xl font-bold text-emerald-400">Rp {grossRevenue.toLocaleString()}</span>
                        <span className="text-[10px] text-slate-500 block">@Rp {suggestedSellingPrice}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">MARGIN LABA</span>
                        <span className="text-xl sm:text-2xl font-bold text-rose-400">{marginPct}%</span>
                        <span className="text-[10px] text-slate-500 block">+Rp {grossProfit.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* E-Report Civic Infrastructure Dispatch Simulator */}
              {project.previewTheme === 'ereport' && (
                <div className="space-y-6">
                  <div className="bg-[#121316] border border-white/10 rounded-xl p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                      <div className="flex items-center space-x-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <h4 className="font-mono text-sm font-bold text-white tracking-wide uppercase">
                          E-Report Civic Complaint Dispatch Simulation
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        38 PEST TESTS · 181 ASSERTIONS (PASS)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label className="text-xs font-mono text-slate-400 block mb-1.5">
                          KATEGORI INFRASTRUKTUR SIPIL:
                        </label>
                        <select
                          value={reportType}
                          onChange={(e) => setReportType(e.target.value)}
                          className="w-full bg-[#090A0C] border border-white/15 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-hidden focus:border-blue-500"
                        >
                          <option>Jalan Rusak / Lubang Berbahaya</option>
                          <option>Penerangan Jalan Umum (PJU) Mati</option>
                          <option>Saluran Drainase Tersumbat / Banjir</option>
                          <option>Fasilitas Jembatan Retak</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-400 block mb-1.5">
                          LOKASI LAPORAN (GEO-COORDINATE):
                        </label>
                        <input
                          type="text"
                          value={reportLocation}
                          onChange={(e) => setReportLocation(e.target.value)}
                          className="w-full bg-[#090A0C] border border-white/15 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-hidden focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Dispatch Action & Timeline */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-[#090A0C] border border-white/10">
                      <div className="space-y-1">
                        <span className="text-xs font-mono text-slate-400 block">
                          STATUS TIKET: <span className="text-white font-bold">{reportStatus === 'idle' ? 'DRAFT DISPATCH' : 'LAPORAN TERVERIFIKASI'}</span>
                        </span>
                        <div className="flex items-center space-x-2 text-[10px] font-mono text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Autentikasi Hak Akses Mahasiswa TRPL IDN Sukses</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setReportStatus('submitting');
                          setTimeout(() => setReportStatus('dispatched'), 800);
                        }}
                        className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all shadow-md active:scale-95"
                      >
                        {reportStatus === 'submitting' ? 'DISPATCHING...' : 'DISPATCH LAPORAN'}
                      </button>
                    </div>

                    {reportStatus === 'dispatched' && (
                      <div className="mt-4 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center justify-between animate-in fade-in">
                        <div>
                          <strong>TIKET #ERP-2026-092 DITERBITKAN:</strong> Petugas teknis dinas PUPR ditugaskan. Log verifikasi tersimpan di SQLite/MySQL.
                        </div>
                        <button
                          onClick={() => setReportStatus('idle')}
                          className="text-[10px] underline hover:text-white"
                        >
                          RESET SIMULASI
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Setoran Companion Live Cloud App Iframe / Embed */}
              {project.previewTheme === 'tahfidz' && (
                <div className="space-y-4">
                  <div className="bg-[#121316] border border-white/10 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-mono text-xs font-bold text-white">
                        LIVE PRODUCTION URL: setoran-companion.lovable.app
                      </span>
                    </div>
                    <a
                      href="https://setoran-companion.lovable.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold inline-flex items-center gap-1.5"
                    >
                      <span>LAUNCH FULLSCREEN</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="relative w-full h-[380px] rounded-xl overflow-hidden border border-white/15 bg-white">
                    <iframe
                      src="https://setoran-companion.lovable.app/"
                      title="Setoran Companion Live App"
                      className="w-full h-full border-0"
                    />
                  </div>
                </div>
              )}

              {/* 3D Orbital Rotary Dial Simulator */}
              {project.previewTheme === 'orbital' && (
                <div className="space-y-6">
                  <div className="bg-[#121316] border border-white/10 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                      <h4 className="font-mono text-sm font-bold text-white tracking-wide uppercase">
                        Trigonometric Rotary Arc Controller (No-WebGL)
                      </h4>
                      <span className="text-xs font-mono text-blue-400">
                        ANGLE: {orbitalAngle}° / {(orbitalAngle * Math.PI / 180).toFixed(3)} rad
                      </span>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-around gap-8 py-4">
                      {/* Interactive CSS 3D Dial */}
                      <div className="relative w-48 h-48 rounded-full border-2 border-dashed border-blue-500/40 flex items-center justify-center [perspective:600px]">
                        <div 
                          className="w-36 h-36 rounded-full border-2 border-blue-500 flex items-center justify-center transition-transform duration-300 shadow-[0_0_25px_rgba(59,130,246,0.3)] bg-blue-950/20"
                          style={{ transform: `rotate(${orbitalAngle}deg)` }}
                        >
                          <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_10px_#ffffff] absolute top-1" />
                          <span className="font-mono text-xs font-bold text-blue-300">
                            {orbitalAngle}°
                          </span>
                        </div>
                      </div>

                      {/* Angular Controls & Coordinates Readout */}
                      <div className="space-y-4 max-w-sm font-mono text-xs">
                        <div className="space-y-2">
                          <label className="text-slate-400 block">DRAG ANGLE CONTROLLER:</label>
                          <input
                            type="range"
                            min="0"
                            max="360"
                            value={orbitalAngle}
                            onChange={(e) => setOrbitalAngle(parseInt(e.target.value))}
                            className="w-full accent-blue-500 cursor-pointer"
                          />
                        </div>

                        <div className="p-3 rounded-lg bg-[#090A0C] border border-white/10 space-y-1 text-slate-300 text-[11px]">
                          <div>COS(θ): <span className="text-blue-400 font-bold">{Math.cos(orbitalAngle * Math.PI / 180).toFixed(4)}</span></div>
                          <div>SIN(θ): <span className="text-emerald-400 font-bold">{Math.sin(orbitalAngle * Math.PI / 180).toFixed(4)}</span></div>
                          <div>MATRIX3D: <span className="text-purple-400 font-bold">preserve-3d @ 60 FPS</span></div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {[0, 45, 90, 180, 270].map((deg) => (
                            <button
                              key={deg}
                              onClick={() => setOrbitalAngle(deg)}
                              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-white text-[11px] border border-white/10"
                            >
                              {deg}°
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Zen Task Japanese Task & Pomodoro Simulator */}
              {project.previewTheme === 'task' && (
                <div className="space-y-6">
                  <div className="bg-[#121316] border border-white/10 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                      <h4 className="font-mono text-sm font-bold text-white tracking-wide uppercase">
                        Zen Task Japanese Ma (間) Flow Simulator
                      </h4>
                      <div className="flex items-center space-x-2 font-mono text-xs text-amber-400">
                        <span>POMODORO:</span>
                        <span className="font-bold text-white">
                          {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
                        </span>
                        <button
                          onClick={() => setTimerRunning(!timerRunning)}
                          className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-[10px]"
                        >
                          {timerRunning ? 'PAUSE' : 'START'}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4 font-mono text-xs">
                      {tasks.map((t) => (
                        <div
                          key={t.id}
                          onClick={() => {
                            setTasks(tasks.map((item) => (item.id === t.id ? { ...item, done: !item.done } : item)));
                          }}
                          className={`p-3 rounded-lg border cursor-pointer flex items-center justify-between transition-all ${
                            t.done
                              ? 'bg-white/[0.02] border-white/5 text-slate-500 line-through'
                              : 'bg-white/[0.05] border-white/15 text-white hover:border-amber-400/50'
                          }`}
                        >
                          <span>{t.title}</span>
                          <span className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${t.done ? 'bg-amber-500 border-amber-500 text-black' : 'border-slate-500'}`}>
                            {t.done ? '✓' : ''}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CapyQuest Gamified Habit RPG */}
              {project.previewTheme === 'capy' && (
                <div className="space-y-6">
                  <div className="bg-[#121316] border border-white/10 rounded-xl p-6 font-mono text-xs">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                      <h4 className="text-sm font-bold text-amber-400 tracking-wide uppercase">
                        CapyQuest Habit RPG & SQLite Fast Store
                      </h4>
                      <span className="text-[11px] text-slate-400">0.4ms Native SQLite Query</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                      <div className="p-3 bg-[#090A0C] border border-white/10 rounded-lg">
                        <span className="text-[10px] text-slate-400 block">EXP EARNED</span>
                        <span className="text-xl font-bold text-purple-400">{capyExp} XP</span>
                      </div>
                      <div className="p-3 bg-[#090A0C] border border-white/10 rounded-lg">
                        <span className="text-[10px] text-slate-400 block">GOLD COINS</span>
                        <span className="text-xl font-bold text-amber-400">{capyGold} G</span>
                      </div>
                      <div className="p-3 bg-[#090A0C] border border-white/10 rounded-lg">
                        <span className="text-[10px] text-slate-400 block">DAILY STREAK</span>
                        <span className="text-xl font-bold text-rose-400">🔥 {capyStreak} Days</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setCapyExp((e) => e + 50);
                        setCapyGold((g) => g + 25);
                        setCapyStreak((s) => s + 1);
                      }}
                      className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase transition-all shadow-md active:scale-98"
                    >
                      Complete Daily Habit (+50 EXP, +25 GOLD)
                    </button>
                  </div>
                </div>
              )}

              {/* 3D Spatial Interactive Wireframe Model */}
              {project.previewTheme === 'spatial' && (
                <div className="space-y-6">
                  <div className="bg-[#121316] border border-white/10 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                      <h4 className="font-mono text-sm font-bold text-white tracking-wide uppercase">
                        Interactive 3D Kinetic Wireframe (Realtime Canvas Model)
                      </h4>
                      <span className="text-xs font-mono text-sky-400">
                        DRAG TO ROTATE 360°
                      </span>
                    </div>

                    <div className="relative w-full h-[320px] bg-[#050608] border border-white/10 rounded-xl overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing">
                      <canvas
                        ref={canvasRef}
                        width={600}
                        height={320}
                        onMouseDown={(e) => {
                          isDraggingRef.current = true;
                          lastMouseRef.current = { x: e.clientX, y: e.clientY };
                        }}
                        onMouseMove={(e) => {
                          if (!isDraggingRef.current) return;
                          const dx = e.clientX - lastMouseRef.current.x;
                          const dy = e.clientY - lastMouseRef.current.y;
                          rotAngleRef.current.y += dx * 0.01;
                          rotAngleRef.current.x += dy * 0.01;
                          lastMouseRef.current = { x: e.clientX, y: e.clientY };
                        }}
                        onMouseUp={() => { isDraggingRef.current = false; }}
                        onMouseLeave={() => { isDraggingRef.current = false; }}
                        className="w-full h-full block"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Technical Blueprint & Benchmark Tab */
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#121316] border border-white/10 rounded-xl p-5">
                  <div className="flex items-center space-x-2 text-blue-400 mb-3 font-mono text-xs font-bold">
                    <Cpu className="w-4 h-4" />
                    <span>SYSTEM ARCHITECTURE & DESIGN</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
                    {project.description}
                  </p>
                  <div className="space-y-2 font-mono text-xs text-slate-400">
                    <div>CATEGORY: <span className="text-white font-bold">{project.category}</span></div>
                    <div>TELEMETRY: <span className="text-emerald-400 font-bold">{project.metrics}</span></div>
                  </div>
                </div>

                <div className="bg-[#121316] border border-white/10 rounded-xl p-5">
                  <div className="flex items-center space-x-2 text-emerald-400 mb-3 font-mono text-xs font-bold">
                    <Database className="w-4 h-4" />
                    <span>TECH STACK FORMULATION</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded bg-white/5 border border-white/10 font-mono text-[11px] text-slate-200 uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                    <a
                      href={project.githubUrl || 'https://github.com/DevisRoomi'}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>INSPECT SOURCE CODE</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
