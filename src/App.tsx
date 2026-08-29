import React, { useState, useEffect } from 'react';
import { ChapterId } from './types';
import { Header } from './components/Header';
import { SidebarNav } from './components/SidebarNav';
import { CourseOverview } from './components/CourseOverview';
import { ChapterViewer } from './components/ChapterViewer';
import { BenchmarkFunctionGallery } from './components/BenchmarkFunctionGallery';
import { AlgorithmArena } from './components/AlgorithmArena';
import { MatrixCalculator } from './components/MatrixCalculator';
import { ExamCenter } from './components/ExamCenter';
import { CHAPTERS_META } from './data/chaptersData';

export default function App() {
  const [currentChapter, setCurrentChapter] = useState<ChapterId>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [selectedArenaFunc, setSelectedArenaFunc] = useState<string>('rosenbrock');

  // Handle URL hash routing or direct deep-links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as ChapterId;
      if (hash && (CHAPTERS_META.some(c => c.id === hash) || ['overview', 'benchmark-functions', 'algorithm-arena', 'matrix-calculus-workbench', 'exam-center'].includes(hash))) {
        setCurrentChapter(hash);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectChapter = (id: ChapterId) => {
    setCurrentChapter(id);
    window.location.hash = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectForArena = (funcId: string) => {
    setSelectedArenaFunc(funcId);
    handleSelectChapter('algorithm-arena');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col math-grid-bg">
      {/* Top Main Navigation Header */}
      <Header
        currentChapter={currentChapter}
        onSelectChapter={handleSelectChapter}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 flex w-full max-w-[1700px] mx-auto">
        {/* Left Interactive Chapter & Module Navigation Drawer */}
        <SidebarNav
          currentChapter={currentChapter}
          onSelectChapter={handleSelectChapter}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Central Viewport Container */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* Main Landing Page / Course Dashboard */}
          {currentChapter === 'overview' && (
            <CourseOverview onSelectChapter={handleSelectChapter} />
          )}

          {/* Benchmark 3D Function Library */}
          {currentChapter === 'benchmark-functions' && (
            <BenchmarkFunctionGallery onSelectForArena={handleSelectForArena} />
          )}

          {/* Multi-Algorithm Showdown Arena */}
          {currentChapter === 'algorithm-arena' && (
            <AlgorithmArena initialFuncId={selectedArenaFunc} />
          )}

          {/* Matrix Calculus, Hessian & Principal Minors Lab */}
          {currentChapter === 'matrix-calculus-workbench' && (
            <MatrixCalculator />
          )}

          {/* University Exam & Certification Center */}
          {currentChapter === 'exam-center' && (
            <ExamCenter />
          )}

          {/* 28 Interactive Educational Chapters */}
          {currentChapter.startsWith('ch') && (
            <ChapterViewer
              chapterId={currentChapter}
              onNavigateChapter={handleSelectChapter}
              onOpenArena={() => handleSelectChapter('algorithm-arena')}
            />
          )}

          {/* Global Footer */}
          <footer className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3 font-mono">
            <div>
              🚀 <strong className="text-slate-400">Optimization Techniques Visual Explorer</strong> • University-Level Platform
            </div>
            <div>
              Mathematica & MATLAB Inspired UI • Fully Offline Capable
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
