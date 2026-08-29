import React, { useState } from 'react';
import { BENCHMARK_FUNCTIONS } from '../utils/mathEngine';
import { BenchmarkFunction } from '../types';
import { MathView } from './MathView';
import { ThreeSurfaceViewer } from './ThreeSurfaceViewer';
import { ContourPlot2D } from './ContourPlot2D';
import { Layers, Compass, Sparkles, CheckCircle2, Info, ArrowRight } from 'lucide-react';

interface BenchmarkFunctionGalleryProps {
  onSelectForArena?: (funcId: string) => void;
}

export const BenchmarkFunctionGallery: React.FC<BenchmarkFunctionGalleryProps> = ({ onSelectForArena }) => {
  const [selectedFuncId, setSelectedFuncId] = useState<string>('rosenbrock');
  const [viewMode, setViewMode] = useState<'3d' | '2d' | 'both'>('both');
  const [testPoint, setTestPoint] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const currentFunc: BenchmarkFunction = BENCHMARK_FUNCTIONS[selectedFuncId] || BENCHMARK_FUNCTIONS.rosenbrock;

  const testValue = currentFunc.evaluate(testPoint.x, testPoint.y);
  const testGrad = currentFunc.gradient ? currentFunc.gradient(testPoint.x, testPoint.y) : [0, 0];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
              <Sparkles size={14} /> Interactive Benchmark Function Library
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
              Standard Mathematical Optimization Test Landscapes
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Famous benchmark test functions with unique geometric properties (banana valleys, multimodal ripples, needle funnels, and flat ridges) used worldwide to evaluate numerical optimization algorithms.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('both')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                viewMode === 'both' ? 'bg-cyan-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Side-by-Side (3D + 2D)
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                viewMode === '3d' ? 'bg-cyan-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              3D Surface Only
            </button>
            <button
              onClick={() => setViewMode('2d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                viewMode === '2d' ? 'bg-cyan-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              2D Contours Only
            </button>
          </div>
        </div>

        {/* Function Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-4 border-t border-slate-800/80 mt-4">
          {Object.values(BENCHMARK_FUNCTIONS).map((fn) => {
            const isSelected = fn.id === selectedFuncId;
            return (
              <button
                key={fn.id}
                onClick={() => {
                  setSelectedFuncId(fn.id);
                  setTestPoint({
                    x: (fn.bounds.xMin + fn.bounds.xMax) / 4,
                    y: (fn.bounds.yMin + fn.bounds.yMax) / 4
                  });
                }}
                className={`px-3.5 py-2 rounded-xl text-xs whitespace-nowrap font-medium transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span>{fn.name.split('(')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Function Details & Formula Card */}
      <div className="glass-panel p-5 rounded-xl border border-slate-800 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              {currentFunc.name}
            </h3>
            {onSelectForArena && (
              <button
                onClick={() => onSelectForArena(currentFunc.id)}
                className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-lg text-xs font-semibold hover:bg-purple-500/30 transition flex items-center gap-1"
              >
                <span>Test in Arena</span>
                <ArrowRight size={12} />
              </button>
            )}
          </div>

          <MathView math={currentFunc.formulaLatex} block className="text-sm" />

          <p className="text-xs text-slate-300 leading-relaxed">
            {currentFunc.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            {currentFunc.characteristics.map((c, i) => (
              <span key={i} className="px-2.5 py-0.5 rounded-full bg-slate-800/90 text-cyan-300 border border-slate-700 text-[11px]">
                ✦ {c}
              </span>
            ))}
          </div>
        </div>

        {/* Global Minima & Interactive Probe Inspector */}
        <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 space-y-3 text-xs">
          <div className="font-semibold text-slate-200 flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-emerald-400" />
            Global Minima Coordinates:
          </div>
          <div className="space-y-1.5">
            {currentFunc.globalMinima.length > 0 ? (
              currentFunc.globalMinima.map((m, idx) => (
                <div key={idx} className="p-2 rounded bg-slate-950/80 border border-slate-800 font-mono text-[11px] flex justify-between">
                  <span className="text-emerald-400">x* = ({m.x.toFixed(3)}, {m.y.toFixed(3)})</span>
                  <span className="text-slate-400">f* = {m.value.toFixed(4)}</span>
                </div>
              ))
            ) : (
              <div className="text-amber-400 font-mono">No minimum (Saddle Point at 0,0)</div>
            )}
          </div>

          <div className="pt-2 border-t border-slate-800">
            <div className="font-semibold text-slate-300 mb-1 flex items-center justify-between">
              <span>Interactive Probe Value:</span>
              <span className="font-mono text-cyan-400">f({testPoint.x.toFixed(2)}, {testPoint.y.toFixed(2)}) = {testValue.toFixed(4)}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <label className="text-[10px] text-slate-400">Probe X: {testPoint.x.toFixed(2)}</label>
                <input
                  type="range"
                  min={currentFunc.bounds.xMin}
                  max={currentFunc.bounds.xMax}
                  step="0.05"
                  value={testPoint.x}
                  onChange={(e) => setTestPoint({ ...testPoint, x: parseFloat(e.target.value) })}
                  className="w-full accent-cyan-400"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400">Probe Y: {testPoint.y.toFixed(2)}</label>
                <input
                  type="range"
                  min={currentFunc.bounds.yMin}
                  max={currentFunc.bounds.yMax}
                  step="0.05"
                  value={testPoint.y}
                  onChange={(e) => setTestPoint({ ...testPoint, y: parseFloat(e.target.value) })}
                  className="w-full accent-cyan-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visualizers Area */}
      <div className={`grid gap-6 ${viewMode === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        {(viewMode === 'both' || viewMode === '3d') && (
          <ThreeSurfaceViewer
            fn={currentFunc.evaluate}
            bounds={currentFunc.bounds}
            title={`3D Surface: ${currentFunc.name}`}
            highlightPoints={[
              ...currentFunc.globalMinima.map(m => ({ x: m.x, y: m.y, label: 'Global Min', type: 'min' as const })),
              { x: testPoint.x, y: testPoint.y, label: 'Probe', type: 'current' as const }
            ]}
          />
        )}

        {(viewMode === 'both' || viewMode === '2d') && (
          <ContourPlot2D
            fn={currentFunc.evaluate}
            bounds={currentFunc.bounds}
            title={`2D Iso-Contours: ${currentFunc.name}`}
            onPointSelect={(x, y) => setTestPoint({ x, y })}
            highlightPoints={[
              ...currentFunc.globalMinima.map(m => ({ x: m.x, y: m.y, label: 'Min', type: 'min' as const })),
              { x: testPoint.x, y: testPoint.y, label: 'Probe', type: 'current' as const }
            ]}
          />
        )}
      </div>
    </div>
  );
};
