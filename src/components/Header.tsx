import React from 'react';
import { ChapterId } from '../types';
import { Sparkles, Menu, Compass, Trophy, Grid, Award, Layers, Search } from 'lucide-react';

interface HeaderProps {
  currentChapter: ChapterId;
  onSelectChapter: (id: ChapterId) => void;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentChapter,
  onSelectChapter,
  onToggleSidebar
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-cyan-500/20 px-4 lg:px-8 py-3.5 flex items-center justify-between">
      {/* Brand & Mobile Hamburger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 lg:hidden hover:text-white"
          title="Toggle Navigation Menu"
        >
          <Menu size={18} />
        </button>

        <div 
          onClick={() => onSelectChapter('overview')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition">
            <Sparkles size={18} className="text-slate-950" />
          </div>
          <div>
            <div className="font-extrabold text-sm sm:text-base tracking-tight text-slate-100 flex items-center gap-1.5">
              <span>OPTIMIZATION TECHNIQUES</span>
              <span className="text-cyan-400 text-xs px-1.5 py-0.2 bg-cyan-500/10 border border-cyan-500/30 rounded font-mono">
                VISUAL EXPLORER
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono hidden sm:block">
              University-Level 3D Simulation & Mathematics Laboratory
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Tool Buttons */}
      <div className="flex items-center gap-2 text-xs font-medium">
        <button
          onClick={() => onSelectChapter('benchmark-functions')}
          className={`px-3 py-1.5 rounded-lg border transition hidden sm:flex items-center gap-1.5 ${
            currentChapter === 'benchmark-functions'
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
              : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
          }`}
        >
          <Compass size={13} className="text-cyan-400" />
          <span>3D Landscapes</span>
        </button>

        <button
          onClick={() => onSelectChapter('algorithm-arena')}
          className={`px-3 py-1.5 rounded-lg border transition hidden md:flex items-center gap-1.5 ${
            currentChapter === 'algorithm-arena'
              ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
              : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
          }`}
        >
          <Trophy size={13} className="text-purple-400" />
          <span>Algorithm Arena</span>
        </button>

        <button
          onClick={() => onSelectChapter('matrix-calculus-workbench')}
          className={`px-3 py-1.5 rounded-lg border transition hidden lg:flex items-center gap-1.5 ${
            currentChapter === 'matrix-calculus-workbench'
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
              : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
          }`}
        >
          <Grid size={13} className="text-emerald-400" />
          <span>Matrix Lab</span>
        </button>

        <button
          onClick={() => onSelectChapter('exam-center')}
          className={`px-3 py-1.5 rounded-lg border transition flex items-center gap-1.5 ${
            currentChapter === 'exam-center'
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
              : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
          }`}
        >
          <Award size={13} className="text-amber-400" />
          <span>Exam Center</span>
        </button>
      </div>
    </header>
  );
};
