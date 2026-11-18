import React, { useState, useEffect, useCallback } from 'react';
import { ExternalLink, X, Code2 } from 'lucide-react';
import { Project } from '../types/work';

interface ModalProps {
  project: Project | null;
  onClose: () => void;
  origin: { x: number; y: number; w: number; h: number } | null;
}

export const DetailInspectorModal: React.FC<ModalProps> = ({ project, onClose, origin }) => {
  const [imgIdx, setImgIdx] = useState<number>(0);
  const [closing, setClosing] = useState<boolean>(false);

  useEffect(() => {
    if (project) {
      setImgIdx(0);
      setClosing(false);
    }
  }, [project]);

  const close = useCallback(() => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      onClose();
      setClosing(false);
    }, 320);
  }, [closing, onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  if (!project) return null;

  const vw = typeof window !== 'undefined' ? window.innerWidth : 1440;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
  const ox = origin ? origin.x + origin.w / 2 - vw / 2 : 0;
  const oy = origin ? origin.y + origin.h / 2 - vh / 2 : 0;
  const sx = origin ? Math.max(0.1, origin.w / 680) : 0.1;
  const sy = origin ? Math.max(0.1, origin.h / 520) : 0.1;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      onClick={close}
      style={{
        background: closing ? 'rgba(2,6,20,0)' : 'rgba(5,9,20,0.80)',
        backdropFilter: closing ? 'blur(0px)' : 'blur(16px)',
        transition: 'all 0.32s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden flex flex-col text-white"
        style={{
          maxHeight: '90vh',
          backgroundColor: '#0E1118',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 50px 120px -20px rgba(0,0,0,0.7)',
          transform: closing
            ? `translate3d(${ox}px, ${oy}px, 0) scale(${sx}, ${sy})`
            : 'translate3d(0, 0, 0) scale(1)',
          opacity: closing ? 0 : 1,
          transition: closing
            ? 'transform 0.32s cubic-bezier(0.32, 0, 0.67, 0), opacity 0.28s ease'
            : 'transform 0.40s cubic-bezier(0.34, 1.35, 0.64, 1), opacity 0.32s ease',
        }}
      >
        {/* Topbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300">
              {project.category}
            </span>
            <h2 className="font-display font-black text-xl text-white">
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={close}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Tutup (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* Main Image Frame */}
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/50 shadow-inner">
            <img
              src={project.images[imgIdx]?.url ?? project.images[0].url}
              alt={project.images[imgIdx]?.label ?? project.title}
              className="w-full max-h-[340px] object-contain mx-auto bg-slate-950"
            />
            {project.images.length > 1 && (
              <div className="flex gap-2 p-2 bg-black/70 border-t border-white/10 overflow-x-auto">
                {project.images.map((im, i) => (
                  <button
                    key={im.url}
                    type="button"
                    onClick={() => setImgIdx(i)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      imgIdx === i
                        ? 'bg-white/25 text-white font-bold shadow-xs'
                        : 'text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {im.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Subtitle & Value Description */}
          <div>
            <h3 className="font-semibold text-base text-slate-200 mb-1">
              {project.subtitle}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {project.longDesc}
            </p>
          </div>

          {/* Tech Stack Tags */}
          <div>
            <span className="font-mono text-[10px] tracking-widest text-slate-500 uppercase block mb-1.5">
              Tech Stack & Apparatus
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300"
                >
                  <Code2 className="w-3.5 h-3.5 text-blue-400" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 flex items-center justify-between px-6 py-4 border-t border-white/10 bg-slate-900/80">
          <span className="font-mono text-[10px] text-slate-500">
            Tekan ESC atau klik di luar untuk menutup
          </span>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black font-mono text-xs font-bold hover:bg-slate-200 transition-colors shadow-sm"
          >
            <span>Lihat Repository GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
