import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowRight, Layers, ArrowUpRight } from 'lucide-react';
import { Project, SlotConfig } from '../types/work';
import { CardWordFlip } from './MicroInteractions';

interface CardProps {
  project: Project;
  slotIndex: number;
  isActive: boolean;
  onClick: () => void;
  onImageClick: (e: React.MouseEvent, project: Project) => void;
  subSlide: number;
  onSubSlideToggle: (e: React.MouseEvent, id: string, max: number) => void;
  slots: SlotConfig[];
}

export const WorkProjectCard: React.FC<CardProps> = ({
  project,
  slotIndex,
  isActive,
  onClick,
  onImageClick,
  subSlide,
  onSubSlideToggle,
  slots,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const slot = slots[slotIndex] ?? slots[7];

  useEffect(() => {
    if (!cardRef.current) return;

    // Fluid Natural Z-Index:
    // When becoming Hero, elevate to 70 immediately so it sweeps cleanly over all cards.
    // When moving elsewhere, set to slot.z immediately so it glides at its natural layer.
    if (slotIndex === 0) {
      gsap.set(cardRef.current, { zIndex: 70 });
    } else {
      gsap.set(cardRef.current, { zIndex: slot.z });
    }

    gsap.to(cardRef.current, {
      x: slot.x,
      y: slot.y,
      rotation: slot.rot,
      width: slot.w,
      height: slot.h,
      opacity: slot.opacity,
      duration: 0.72,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, [slotIndex, slot.x, slot.y, slot.rot, slot.w, slot.h, slot.opacity, slot.z, slot]);

  const currentImg = project.images[subSlide] ?? project.images[0];

  return (
    <div
      ref={cardRef}
      onClick={!isActive ? onClick : undefined}
      className={`absolute select-none ${!isActive ? 'cursor-pointer group/card' : ''}`}
      style={{
        width: slot.w,
        height: slot.h,
        left: '50%',
        top: '50%',
        marginLeft: -slot.w / 2,
        marginTop: -slot.h / 2,
        transform: `translate(${slot.x}px, ${slot.y}px) rotate(${slot.rot}deg)`,
        zIndex: slot.z,
        opacity: slot.opacity,
        willChange: 'transform, opacity, width, height',
      }}
    >
      {/* ── 3D PHYSICAL BEVEL & MULTI-TIER AMBIENT SHADOW ── */}
      <div
        className="relative w-full h-full rounded-[20px] overflow-hidden flex flex-col justify-between p-3.5 sm:p-4 transition-shadow duration-500"
        style={{
          backgroundColor: project.bg,
          color: project.fg,
          boxShadow: isActive
            ? `0 8px 0 ${project.bevelColor}, 0 16px 28px -4px rgba(0,0,0,0.28), 0 40px 80px -15px rgba(0,0,0,0.38), inset 0 2px 1.5px rgba(255,255,255,0.7), inset 0 -3px 8px rgba(0,0,0,0.18)`
            : `0 5px 0 ${project.bevelColor}, 0 12px 24px -6px rgba(0,0,0,0.18), 0 26px 50px -12px rgba(0,0,0,0.20), inset 0 1.5px 1px rgba(255,255,255,0.5)`,
          border: project.dark ? '1.5px solid rgba(255,255,255,0.18)' : '1.5px solid rgba(0,0,0,0.12)',
        }}
      >
        {/* Specular Highlight Arc on Top Rim */}
        <div
          className="absolute top-0 left-[8%] right-[8%] h-[1.5px] pointer-events-none z-10"
          style={{
            background: project.dark
              ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.90), transparent)',
          }}
        />

        {/* ── BORDER DRAW EFFECT (SVG Line Tracing on Active Hero Card) ── */}
        {isActive && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-20 rounded-[20px] overflow-visible"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <rect
              x="0.8"
              y="0.8"
              width="98.4"
              height="98.4"
              rx="6"
              ry="6"
              pathLength="100"
              fill="none"
              stroke={project.dark ? 'rgba(255,255,255,0.90)' : project.fg}
              strokeWidth="1.5"
              className="animate-border-draw"
            />
          </svg>
        )}

        {/* ── CARD TOP: Category Pill & Number Counter ── */}
        <div className="flex items-center justify-between shrink-0 mb-1">
          <span
            className="font-mono font-bold tracking-[0.14em] uppercase px-2 py-0.5 rounded-full"
            style={{
              fontSize: isActive ? 9 : 7.5,
              backgroundColor: project.accentBg,
              color: project.accentFg,
            }}
          >
            {project.category}
          </span>

          <span
            className="font-mono font-bold tracking-wider opacity-60"
            style={{ fontSize: isActive ? 9 : 7.5 }}
          >
            {project.num} / 08
          </span>
        </div>

        {/* ── REAL PROJECT TITLE AS HEADLINE (KALEM EDITORIAL KECE BADAS) ── */}
        <div className="shrink-0 mb-1">
          <h3
            className="font-sans font-extrabold tracking-[-0.03em] leading-[1.08] uppercase transition-all duration-700 ease-out"
            style={{
              fontSize: isActive
                ? (project.title.length > 16 ? 17.5 : project.title.length > 10 ? 20.5 : 24)
                : (project.title.length > 16 ? 9.5 : project.title.length > 10 ? 11 : 12.5),
            }}
          >
            {project.title}
          </h3>

          {/* Subtitle on active card */}
          <div
            className={`overflow-hidden transition-all duration-700 ease-out ${
              isActive ? 'max-h-6 opacity-75 mt-0.5' : 'max-h-0 opacity-0 mt-0'
            }`}
          >
            <p className="font-sans text-[9.5px] font-medium tracking-wide truncate">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* ── PREVIEW IMAGE (~65% OF CARD BODY) ── */}
        <div
          onClick={isActive ? (e) => onImageClick(e, project) : undefined}
          className={`relative w-full rounded-xl overflow-hidden shrink-0 border shadow-xs transition-all duration-700 ease-out ${
            isActive ? 'cursor-pointer group/img mb-2 border-black/10' : 'mb-1 border-black/5'
          }`}
          style={{
            height: isActive ? 192 : 126,
            backgroundColor: project.dark ? '#0F172A' : '#F8FAFC',
          }}
        >
          {/* Browser / Frame Titlebar */}
          <div
            className="w-full px-2.5 py-1 flex items-center justify-between border-b shrink-0"
            style={{
              backgroundColor: project.dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
              borderColor: project.dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
            }}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80 inline-block shrink-0" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80 inline-block shrink-0" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 inline-block shrink-0" />
              {isActive && (
                <span
                  className="font-mono text-[8px] opacity-70 ml-1 truncate max-w-[130px]"
                  style={{ color: project.dark ? '#fff' : '#000' }}
                >
                  {project.subtitle}
                </span>
              )}
            </div>

            {/* Slide switcher badge */}
            {project.images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSubSlideToggle(e, project.id, project.images.length);
                }}
                className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[7.5px] font-mono font-bold transition-colors cursor-pointer shrink-0"
                style={{
                  backgroundColor: project.dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)',
                  color: project.dark ? '#fff' : '#000',
                }}
                title="Ganti screenshot"
              >
                <Layers className="w-2 h-2" />
                <span>{subSlide + 1}/{project.images.length}</span>
              </button>
            )}
          </div>

          {/* Screenshot viewport */}
          <div className="w-full h-[calc(100%-20px)] relative overflow-hidden bg-slate-900/10">
            <img
              src={currentImg.url}
              alt={currentImg.label}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105 will-change-transform"
            />
            {isActive && (
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[1px]">
                <span className="px-2.5 py-0.5 rounded-full bg-black/75 text-[9px] font-mono text-white flex items-center gap-1 font-bold shadow-md">
                  🔍 Inspect Details
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── VALUE DESCRIPTION (Shown exclusively on Active Hero Card — Smooth Collapse) ── */}
        <div
          className={`shrink-0 overflow-hidden transition-all duration-700 ease-out ${
            isActive ? 'max-h-24 opacity-90 my-1.5' : 'max-h-0 opacity-0 my-0'
          }`}
        >
          <p className="text-[10px] sm:text-[10.5px] leading-[1.42] font-medium">
            {project.description}
          </p>
        </div>

        {/* ── CARD BOTTOM ACTIONS ── */}
        <div
          className="flex items-center justify-between shrink-0 pt-1.5 border-t"
          style={{
            borderColor: project.dark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.10)',
          }}
        >
          {/* Tech tags */}
          <div className="flex items-center gap-1">
            {project.tags.slice(0, isActive ? 3 : 2).map((tag) => (
              <span
                key={tag}
                className="font-mono font-bold rounded-full text-[7.5px]"
                style={{
                  backgroundColor: project.dark
                    ? 'rgba(255, 255, 255, 0.16)'
                    : (project.id === 'basoku'
                      ? 'rgba(24, 24, 27, 0.12)'
                      : project.id === 'e-report'
                        ? 'rgba(69, 26, 3, 0.12)'
                        : project.accentBg),
                  color: project.dark
                    ? '#F8FAFC'
                    : (project.id === 'basoku'
                      ? '#18181B'
                      : project.id === 'e-report'
                        ? '#451A03'
                        : project.accentFg),
                  border: project.dark
                    ? '1px solid rgba(255, 255, 255, 0.18)'
                    : (project.id === 'basoku'
                      ? '1px solid rgba(24, 24, 27, 0.22)'
                      : project.id === 'e-report'
                        ? '1px solid rgba(69, 26, 3, 0.22)'
                        : '1px solid rgba(0, 0, 0, 0.08)'),
                  padding: '1.5px 6px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action button with Awwwards Salto Flip */}
          <div className="flex items-center gap-1.5">
            {isActive ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="group/card flex items-center gap-1 font-mono text-[9px] font-bold tracking-wider uppercase hover:opacity-80 transition-opacity"
              >
                <CardWordFlip text="EXPLORE" />
                <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
              </a>
            ) : (
              <span
                className="font-mono text-[7.5px] font-bold uppercase flex items-center gap-0.5 group-hover/card:opacity-100 transition-all"
                style={{
                  color: project.dark
                    ? '#E2E8F0'
                    : (project.id === 'basoku'
                      ? '#18181B'
                      : project.id === 'e-report'
                        ? '#451A03'
                        : project.fg),
                  opacity: project.dark ? 0.95 : (project.id === 'basoku' || project.id === 'e-report') ? 1.0 : 0.80,
                }}
              >
                <CardWordFlip text="VIEW" />
                <ArrowRight
                  className="w-2 h-2 transition-transform duration-300 group-hover/card:translate-x-0.5"
                  style={{
                    color: project.dark
                      ? '#E2E8F0'
                      : (project.id === 'basoku'
                        ? '#18181B'
                        : project.id === 'e-report'
                          ? '#451A03'
                          : project.fg),
                  }}
                />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
