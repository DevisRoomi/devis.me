import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { Project } from '../types/work';
import { PROJECTS, SLOTS, FOOTER_CATEGORIES } from '../data/workProjects';
import { WorkProjectCard } from '../components/WorkProjectCard';
import { DetailInspectorModal } from '../components/DetailInspectorModal';
import { RollingText, WordFlip } from '../components/MicroInteractions';

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN SELECTED WORKS SECTION (Curated Editorial 8-Card Showcase)
   Architecture: Modularized data & subcomponents with 100% parity
   ═══════════════════════════════════════════════════════════════════════════ */
export const WorkSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [subSlideMap, setSubSlideMap] = useState<Record<string, number>>({});
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [modalOrigin, setModalOrigin] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef<number>(0);

  const getSlotIndex = useCallback(
    (projectIdx: number) => {
      const offset = (projectIdx - activeIndex + PROJECTS.length) % PROJECTS.length;
      return offset < SLOTS.length ? offset : SLOTS.length - 1;
    },
    [activeIndex]
  );

  const advance = useCallback((step: number) => {
    setActiveIndex((prev) => (prev + step + PROJECTS.length) % PROJECTS.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalProject) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') advance(1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') advance(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [advance, modalProject]);

  // Eager in-memory preload of all 8 project primary screenshots for instantaneous performance
  useEffect(() => {
    PROJECTS.forEach((p) => {
      p.images.forEach((img) => {
        const i = new Image();
        i.src = img.url;
      });
    });
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) advance(dx < 0 ? 1 : -1);
  };

  const toggleSubSlide = (e: React.MouseEvent, id: string, max: number) => {
    e.stopPropagation();
    setSubSlideMap((prev) => ({
      ...prev,
      [id]: ((prev[id] ?? 0) + 1) % max,
    }));
  };

  const openModal = (e: React.MouseEvent, p: Project) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setModalOrigin({ x: r.left, y: r.top, w: r.width, h: r.height });
    setModalProject(p);
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="selected-works relative z-20 w-full h-screen max-h-[960px] min-h-[700px] flex flex-col justify-between select-none overflow-hidden bg-slate-100"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 
        ── SUBTLE ATMOSPHERIC BACKGROUND LAYER (Ultra-Clean Glass Atmosphere) ──
        Scaled to eliminate edge artifacts/seams, with a delicate blur to eliminate shadow grain
      */}
      <div
        className="absolute inset-[-2%] pointer-events-none opacity-30 mix-blend-multiply will-change-transform"
        style={{
          backgroundImage: "url('/images/crystal-ribbon-hd.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(1.5px)',
          transform: 'scale(1.03)',
        }}
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/70 via-transparent to-slate-200/50" />

      {/* Localized Calming Backdrop Blur directly behind cards */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-[50px] bg-white/75 backdrop-blur-[8px] pointer-events-none -z-10 shadow-[0_0_120px_50px_rgba(255,255,255,0.9)]" />

      {/* ── TOP ARCHITECTURAL NOTCHED FOLDER TAB (Connecting Section 1 to Section 2) ── */}
      <div className="relative z-30 w-full flex items-start justify-between px-8 sm:px-14 pt-6 sm:pt-7 shrink-0">
        <div className="flex flex-col">
          <div className="flex items-center gap-2.5">
            <span className="font-display font-extrabold text-[15px] tracking-tight text-slate-900">
              Devis
            </span>
            <span className="w-7 h-[1.5px] bg-slate-400/80 rounded-full inline-block" />
            <span className="font-mono text-[10.5px] text-slate-500 font-semibold tracking-wider">
              Portfolio 2026
            </span>
          </div>
          <p className="font-sans text-[11px] text-slate-500 font-medium leading-snug mt-1">
            Designing Tomorrow
            <br />
            With Technology
          </p>
        </div>

        {/* Notched Folder Tab Anchor Center */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-slate-300/80 shadow-xs backdrop-blur-sm mr-28 sm:mr-36">
          <span className="font-mono text-[9.5px] font-bold text-slate-700 tracking-wider uppercase">
            02 Selected Projects
          </span>
        </div>

        {/* Spacer for Right Minimalist Floating Navbar */}
        <div className="w-16 h-8 shrink-0 pointer-events-none" />
      </div>

      {/* ── CENTER STAGE: 1 DOMINANT HERO CARD, 7 STEPPED SUPPORTING CARDS ── */}
      <div
        className="relative flex-1 flex items-center justify-center -translate-y-3 my-0 py-2"
        style={{ perspective: 1800, perspectiveOrigin: '50% 48%' }}
      >
        {PROJECTS.map((proj, i) => {
          const slotIdx = getSlotIndex(i);
          return (
            <WorkProjectCard
              key={proj.id}
              project={proj}
              slotIndex={slotIdx}
              isActive={slotIdx === 0}
              onClick={() => setActiveIndex(i)}
              onImageClick={openModal}
              subSlide={subSlideMap[proj.id] ?? 0}
              onSubSlideToggle={toggleSubSlide}
              slots={SLOTS}
            />
          );
        })}
      </div>

      {/* ── BOTTOM BAR (Clean Editorial Footer with Interactive Category State) ── */}
      <div className="relative z-30 w-full flex items-center justify-between px-8 sm:px-14 pb-6 sm:pb-8 shrink-0">
        {/* Left: Interactive Category Indicators */}
        <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10.5px] tracking-wider">
          {FOOTER_CATEGORIES.map((cat, idx) => {
            const isCatActive = cat.match(PROJECTS[activeIndex].category.toUpperCase());
            return (
              <React.Fragment key={cat.label}>
                <button
                  type="button"
                  onClick={() => {
                    const targetIdx = PROJECTS.findIndex((p) =>
                      cat.match(p.category.toUpperCase())
                    );
                    if (targetIdx !== -1) setActiveIndex(targetIdx);
                  }}
                  className={`group flex items-center gap-1.5 px-2 py-0.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isCatActive
                      ? 'text-slate-950 font-bold bg-white/95 border border-slate-300 shadow-xs'
                      : 'text-slate-400 hover:text-slate-900 font-semibold'
                  }`}
                  title={`Tampilkan kategori ${cat.label}`}
                >
                  {isCatActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shadow-[0_0_6px_#38bdf8] shrink-0" />
                  )}
                  <WordFlip text={cat.label} />
                </button>
                {idx < FOOTER_CATEGORIES.length - 1 && (
                  <span className="text-slate-300 select-none text-[9px]">/</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Right: Synced Index Number & Devis Next Button with Awwwards Staggered Rolling Text */}
        <div className="flex items-center gap-5">
          <span className="font-mono text-[11px] text-slate-700 hidden sm:inline font-bold tracking-wider">
            {PROJECTS[activeIndex].num} / {String(PROJECTS.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={() => advance(1)}
            className="flex items-center gap-2 font-display font-extrabold text-sm text-slate-900 hover:text-black transition-colors cursor-pointer group py-1"
          >
            <RollingText text="Devis" staggerMs={32} className="font-display font-extrabold text-sm" />
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>
        </div>
      </div>

      {/* ── DETAIL INSPECTOR MODAL (macOS Genie Zoom) ── */}
      <DetailInspectorModal
        project={modalProject}
        onClose={() => setModalProject(null)}
        origin={modalOrigin}
      />
    </section>
  );
};

export default WorkSection;
