import React, { useState } from 'react';
import { ChapterId, Category } from '../types';
import { CHAPTERS_META } from '../data/chaptersData';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Trophy, 
  Grid, 
  Award, 
  Compass, 
  CheckCircle2, 
  ChevronRight, 
  X,
  Layers,
  Activity,
  Maximize,
  ShieldCheck
} from 'lucide-react';

interface SidebarNavProps {
  currentChapter: ChapterId;
  onSelectChapter: (id: ChapterId) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  currentChapter,
  onSelectChapter,
  isOpen,
  onClose
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: Category[] = [
    'Foundations',
    'Convexity & Matrices',
    '1D Direct Search',
    'Multivariable Unconstrained',
    'Constrained & KKT'
  ];

  const filteredChapters = CHAPTERS_META.filter((ch) => 
    ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ch.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ch.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    String(ch.number).includes(searchQuery)
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 sm:w-80 bg-slate-950 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header & Search Box */}
        <div className="p-4 border-b border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen size={14} className="text-cyan-400" />
              <span>Curriculum & Labs</span>
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white lg:hidden"
            >
              <X size={16} />
            </button>
          </div>

          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search 28 chapters, algorithms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 text-slate-200 pl-9 pr-3 py-2 rounded-xl text-xs border border-slate-800 focus:outline-none focus:border-cyan-500 placeholder:text-slate-500 font-mono"
            />
          </div>
        </div>

        {/* Interactive Special Tool Hub */}
        <div className="p-3 border-b border-slate-800/80 space-y-1 text-xs">
          <button
            onClick={() => { onSelectChapter('overview'); onClose(); }}
            className={`w-full text-left px-3 py-2 rounded-xl transition flex items-center justify-between font-medium ${
              currentChapter === 'overview'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <span className="flex items-center gap-2">
              <Sparkles size={14} className="text-cyan-400" />
              <span>Course Dashboard</span>
            </span>
            <ChevronRight size={12} className="text-slate-500" />
          </button>

          <button
            onClick={() => { onSelectChapter('benchmark-functions'); onClose(); }}
            className={`w-full text-left px-3 py-2 rounded-xl transition flex items-center justify-between font-medium ${
              currentChapter === 'benchmark-functions'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <span className="flex items-center gap-2">
              <Compass size={14} className="text-cyan-400" />
              <span>3D Benchmark Library</span>
            </span>
            <ChevronRight size={12} className="text-slate-500" />
          </button>

          <button
            onClick={() => { onSelectChapter('algorithm-arena'); onClose(); }}
            className={`w-full text-left px-3 py-2 rounded-xl transition flex items-center justify-between font-medium ${
              currentChapter === 'algorithm-arena'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
                : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <span className="flex items-center gap-2">
              <Trophy size={14} className="text-purple-400" />
              <span>Algorithm Race Arena</span>
            </span>
            <ChevronRight size={12} className="text-slate-500" />
          </button>

          <button
            onClick={() => { onSelectChapter('matrix-calculus-workbench'); onClose(); }}
            className={`w-full text-left px-3 py-2 rounded-xl transition flex items-center justify-between font-medium ${
              currentChapter === 'matrix-calculus-workbench'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <span className="flex items-center gap-2">
              <Grid size={14} className="text-emerald-400" />
              <span>Matrix & Hessian Lab</span>
            </span>
            <ChevronRight size={12} className="text-slate-500" />
          </button>

          <button
            onClick={() => { onSelectChapter('exam-center'); onClose(); }}
            className={`w-full text-left px-3 py-2 rounded-xl transition flex items-center justify-between font-medium ${
              currentChapter === 'exam-center'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <span className="flex items-center gap-2">
              <Award size={14} className="text-amber-400" />
              <span>University Exam Center</span>
            </span>
            <ChevronRight size={12} className="text-slate-500" />
          </button>
        </div>

        {/* 28 Chapters List Grouped by Category */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
          {categories.map((cat) => {
            const chaptersInCat = filteredChapters.filter((ch) => ch.category === cat);
            if (chaptersInCat.length === 0) return null;

            return (
              <div key={cat} className="space-y-1">
                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  {cat} ({chaptersInCat.length})
                </div>

                {chaptersInCat.map((ch) => {
                  const isCurrent = currentChapter === ch.id;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => { onSelectChapter(ch.id); onClose(); }}
                      className={`w-full text-left p-2.5 rounded-xl transition flex items-start gap-2.5 ${
                        isCurrent
                          ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-200 font-semibold shadow-md shadow-cyan-500/10'
                          : 'hover:bg-slate-900 text-slate-300'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-[10px] font-mono text-cyan-400 shrink-0 mt-0.5">
                        {ch.number}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="truncate text-slate-200 font-medium">{ch.title}</div>
                        <div className="truncate text-[10px] text-slate-400">{ch.subtitle}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
};
