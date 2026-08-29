import React, { useState } from 'react';
import { ChapterId } from '../types';
import { CHAPTERS_META } from '../data/chaptersData';
import { ThreeSurfaceViewer } from './ThreeSurfaceViewer';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Trophy, 
  Grid, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Zap,
  TrendingDown
} from 'lucide-react';

interface CourseOverviewProps {
  onSelectChapter: (id: ChapterId) => void;
}

export const CourseOverview: React.FC<CourseOverviewProps> = ({ onSelectChapter }) => {
  // Rich multimodal demonstration function for the hero landscape
  // Has hills, valleys, saddle points, local minima, local maxima, and global minimum
  const heroLandscapeFn = (x: number, y: number) => {
    return (
      0.5 * (x * x + y * y) -
      2 * Math.cos(2 * x) * Math.cos(2 * y) +
      0.8 * Math.sin(3 * x) -
      0.5 * Math.sin(2 * y)
    );
  };

  return (
    <div className="space-y-8">
      {/* Hero 3D Optimization Landscape Dashboard */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
              <Sparkles size={13} className="text-cyan-400" />
              <span>Interactive University-Level Platform</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
              OPTIMIZATION <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                TECHNIQUES
              </span> <br />
              VISUAL EXPLORER
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              Master Optimization Theory, Convex Analysis, Multivariable Calculus, Numerical Methods, and Karush-Kuhn-Tucker (KKT) conditions through immersive 60 FPS 3D simulations, real-time algorithm visualizers, and step-by-step mathematical proofs.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onSelectChapter('ch1-intro')}
                className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition flex items-center gap-2"
              >
                <span>Start Chapter 1: Introduction</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={() => onSelectChapter('algorithm-arena')}
                className="px-4 py-2.5 bg-slate-900/90 hover:bg-slate-800 text-purple-300 border border-purple-500/40 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2"
              >
                <Trophy size={14} className="text-purple-400" />
                <span>Algorithm Race Arena</span>
              </button>
            </div>

            {/* Feature Badges */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-800/80 text-center font-mono">
              <div className="p-2 bg-slate-900/50 rounded-lg border border-slate-800/80">
                <div className="text-base font-bold text-cyan-400">28</div>
                <div className="text-[10px] text-slate-400">Chapters</div>
              </div>
              <div className="p-2 bg-slate-900/50 rounded-lg border border-slate-800/80">
                <div className="text-base font-bold text-purple-400">9+</div>
                <div className="text-[10px] text-slate-400">3D Functions</div>
              </div>
              <div className="p-2 bg-slate-900/50 rounded-lg border border-slate-800/80">
                <div className="text-base font-bold text-emerald-400">60 FPS</div>
                <div className="text-[10px] text-slate-400">WebGL Sim</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Interactive 3D Terrain */}
          <div className="lg:col-span-7">
            <ThreeSurfaceViewer
              fn={heroLandscapeFn}
              bounds={{ xMin: -3.5, xMax: 3.5, yMin: -3.5, yMax: 3.5 }}
              title="Interactive Optimization Landscape: Hills, Valleys & Saddles"
              autoRotate={true}
              highlightPoints={[
                { x: 0, y: 0, label: 'Local Max (Peak)', type: 'max' },
                { x: 1.57, y: 1.57, label: 'Global Min (Valley)', type: 'min' },
                { x: -1.57, y: -1.57, label: 'Global Min', type: 'min' },
                { x: 1.57, y: 0, label: 'Saddle Point', type: 'saddle' }
              ]}
            />
          </div>
        </div>
      </div>

      {/* Course Core Modules Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
              <BookOpen size={20} className="text-cyan-400" />
              <span>Complete Curriculum Modules</span>
            </h2>
            <p className="text-xs text-slate-400">
              Structured from mathematical foundations to advanced non-linear constrained algorithms.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: '1. Foundations of Optimization',
              chapters: 'Chapters 1 - 7, 17',
              icon: Compass,
              color: 'text-cyan-400',
              borderColor: 'border-cyan-500/30',
              desc: 'Formulation, modeling flowcharts, algorithm performance criteria, taxonomy, and feasible region bounds.',
              targetId: 'ch1-intro' as ChapterId
            },
            {
              title: '2. Convexity & Matrix Calculus',
              chapters: 'Chapters 8 - 11, 13',
              icon: Cpu,
              color: 'text-purple-400',
              borderColor: 'border-purple-500/30',
              desc: 'Convex functions, Jensen’s inequality, Hessian matrices, Sylvester’s principal minors, and spectral analysis.',
              targetId: 'ch8-convex-functions' as ChapterId
            },
            {
              title: '3. 1D Direct Elimination Search',
              chapters: 'Chapters 18 - 20',
              icon: TrendingDown,
              color: 'text-emerald-400',
              borderColor: 'border-emerald-500/30',
              desc: 'Three-point search, Fibonacci search with exact reduction budgets, and Golden Section optimization (φ ≈ 0.618).',
              targetId: 'ch20-golden-section' as ChapterId
            },
            {
              title: '4. Multivariable Unconstrained',
              chapters: 'Chapters 12, 14 - 16, 21 - 23',
              icon: Layers,
              color: 'text-amber-400',
              borderColor: 'border-amber-500/30',
              desc: 'Steepest descent, Newton-Raphson quadratic models, Nelder-Mead simplex, and Quasi-Newton (DFP / BFGS).',
              targetId: 'ch21-steepest-descent' as ChapterId
            },
            {
              title: '5. Constrained Optimization & KKT',
              chapters: 'Chapters 24 - 28',
              icon: Zap,
              color: 'text-rose-400',
              borderColor: 'border-rose-500/30',
              desc: 'Lagrange multipliers, shadow prices, multi-constraint cones, SQP, and full Karush-Kuhn-Tucker (KKT) laboratory.',
              targetId: 'ch28-kkt' as ChapterId
            },
            {
              title: '6. Laboratories & Exam Center',
              chapters: 'Interactive Workbenches',
              icon: Award,
              color: 'text-blue-400',
              borderColor: 'border-blue-500/30',
              desc: 'Benchmark function gallery, live algorithm showdown arena, matrix calculator, and university certification exams.',
              targetId: 'benchmark-functions' as ChapterId
            }
          ].map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <div
                key={idx}
                onClick={() => onSelectChapter(mod.targetId)}
                className={`p-5 rounded-2xl glass-panel border ${mod.borderColor} hover:border-cyan-400 cursor-pointer transition-all hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Icon size={20} className={mod.color} />
                    <span className="text-[10px] font-mono font-semibold text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                      {mod.chapters}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-100">{mod.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{mod.desc}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-semibold">
                  <span>Explore Module</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 28 Chapters Quick-Select Index */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <BookOpen size={16} className="text-cyan-400" />
            <span>Complete 28-Chapter University Directory</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">Chapters 1 through 28</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {CHAPTERS_META.map((ch) => (
            <button
              key={ch.id}
              onClick={() => onSelectChapter(ch.id)}
              className="text-left p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 transition group flex items-start gap-2.5"
            >
              <span className="w-5 h-5 rounded bg-slate-800 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 text-slate-400 flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5 transition">
                {ch.number}
              </span>
              <div className="flex-1 min-w-0">
                <div className="truncate text-xs font-medium text-slate-200 group-hover:text-cyan-300 transition">
                  {ch.title}
                </div>
                <div className="truncate text-[10px] text-slate-500">
                  {ch.subtitle}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
