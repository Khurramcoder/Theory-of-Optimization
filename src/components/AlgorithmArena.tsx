import React, { useState, useEffect, useMemo } from 'react';
import { BENCHMARK_FUNCTIONS, runSteepestDescent, runNewtonMethod2D, runQuasiNewton, runNelderMead } from '../utils/mathEngine';
import { BenchmarkFunction, AlgorithmResult } from '../types';
import { ThreeSurfaceViewer } from './ThreeSurfaceViewer';
import { ContourPlot2D } from './ContourPlot2D';
import { Play, Pause, RotateCcw, ChevronRight, Zap, Trophy, BarChart2, Activity, Sliders, CheckCircle, Flame } from 'lucide-react';
import { MathView } from './MathView';

interface AlgorithmArenaProps {
  initialFuncId?: string;
}

export const AlgorithmArena: React.FC<AlgorithmArenaProps> = ({ initialFuncId = 'rosenbrock' }) => {
  const [selectedFuncId, setSelectedFuncId] = useState<string>(initialFuncId);
  const currentFunc: BenchmarkFunction = BENCHMARK_FUNCTIONS[selectedFuncId] || BENCHMARK_FUNCTIONS.rosenbrock;

  // Starting point coordinates
  const [startX, setStartX] = useState<number>(-1.5);
  const [startY, setStartY] = useState<number>(2.0);

  // Algorithm configuration parameters
  const [learningRate, setLearningRate] = useState<number>(0.001);
  const [momentum, setMomentum] = useState<number>(0.3);
  const [quasiMethod, setQuasiMethod] = useState<'BFGS' | 'DFP'>('BFGS');
  const [activeAlgorithms, setActiveAlgorithms] = useState<Record<string, boolean>>({
    'gd': true,
    'newton': true,
    'quasi': true,
    'nelder': true,
  });

  // Playback state
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(200); // ms per step
  const [viewTab, setViewTab] = useState<'3d' | '2d' | 'metrics'>('2d');

  // Compute results for all active algorithms
  const results = useMemo(() => {
    const res: Record<string, AlgorithmResult> = {};
    const start: [number, number] = [startX, startY];

    if (activeAlgorithms['gd']) {
      res['gd'] = runSteepestDescent(currentFunc, start, learningRate, momentum, 100);
    }
    if (activeAlgorithms['newton']) {
      res['newton'] = runNewtonMethod2D(currentFunc, start, 1.0, 50);
    }
    if (activeAlgorithms['quasi']) {
      res['quasi'] = runQuasiNewton(currentFunc, start, quasiMethod, 60);
    }
    if (activeAlgorithms['nelder']) {
      res['nelder'] = runNelderMead(currentFunc, start, 0.5, 80);
    }

    return res;
  }, [currentFunc, startX, startY, learningRate, momentum, quasiMethod, activeAlgorithms]);

  const maxSteps = useMemo(() => {
    let max = 0;
    (Object.values(results) as AlgorithmResult[]).forEach((r) => {
      if (r.history.length > max) max = r.history.length;
    });
    return max || 1;
  }, [results]);

  // Handle Play Animation Loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev >= maxSteps - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, maxSteps, playbackSpeed]);

  // Selected algorithm for primary display
  const [primaryAlgo, setPrimaryAlgo] = useState<string>('quasi');
  const activeResult = results[primaryAlgo] || Object.values(results)[0];

  // Slice trajectory up to current step
  const currentTrajectory: [number, number][] = useMemo(() => {
    if (!activeResult) return [];
    const sliced = activeResult.history.slice(0, currentStepIdx + 1);
    return sliced.map((s) => [s.x, s.y || 0]);
  }, [activeResult, currentStepIdx]);

  const currentSimplex = useMemo(() => {
    if (primaryAlgo !== 'nelder' || !results['nelder']) return undefined;
    const step = results['nelder'].history[Math.min(currentStepIdx, results['nelder'].history.length - 1)];
    return step?.simplexPoints;
  }, [primaryAlgo, results, currentStepIdx]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-purple-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
              <Trophy size={14} /> Multi-Algorithm Race & Benchmark Arena
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
              Live Optimization Algorithm Showdown
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Race 4 major optimization families simultaneously on difficult non-linear landscapes: observe convergence speeds, function evaluations, and zigzagging behavior.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedFuncId}
              onChange={(e) => {
                setSelectedFuncId(e.target.value);
                setCurrentStepIdx(0);
                setIsPlaying(false);
              }}
              className="bg-slate-900 text-cyan-300 font-semibold px-3.5 py-2 rounded-xl border border-cyan-500/30 text-xs focus:outline-none focus:border-cyan-400"
            >
              {Object.values(BENCHMARK_FUNCTIONS).map((f) => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Configuration Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="text-slate-400 font-medium block mb-1">
              Starting Point X₀: <span className="font-mono text-cyan-300">{startX.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min={currentFunc.bounds.xMin}
              max={currentFunc.bounds.xMax}
              step="0.1"
              value={startX}
              onChange={(e) => {
                setStartX(parseFloat(e.target.value));
                setCurrentStepIdx(0);
              }}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <label className="text-slate-400 font-medium block mb-1">
              Starting Point Y₀: <span className="font-mono text-cyan-300">{startY.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min={currentFunc.bounds.yMin}
              max={currentFunc.bounds.yMax}
              step="0.1"
              value={startY}
              onChange={(e) => {
                setStartY(parseFloat(e.target.value));
                setCurrentStepIdx(0);
              }}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <label className="text-slate-400 font-medium block mb-1">
              GD Learning Rate (α): <span className="font-mono text-purple-300">{learningRate}</span>
            </label>
            <select
              value={learningRate}
              onChange={(e) => setLearningRate(parseFloat(e.target.value))}
              className="w-full bg-slate-900 text-slate-200 rounded-lg p-1 border border-slate-700 font-mono text-xs"
            >
              <option value={0.0001}>0.0001 (Very Cautious)</option>
              <option value={0.001}>0.001 (Standard)</option>
              <option value={0.01}>0.01 (Aggressive)</option>
              <option value={0.05}>0.05 (High / Oscillatory)</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 font-medium block mb-1">
              Quasi-Newton Formulation:
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setQuasiMethod('BFGS')}
                className={`flex-1 py-1 rounded text-xs font-semibold ${quasiMethod === 'BFGS' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
              >
                BFGS (Rank 2)
              </button>
              <button
                onClick={() => setQuasiMethod('DFP')}
                className={`flex-1 py-1 rounded text-xs font-semibold ${quasiMethod === 'DFP' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
              >
                DFP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithm Comparison Scoreboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { key: 'gd', name: 'Steepest Descent', icon: Activity, color: 'border-blue-500/30 text-blue-400' },
          { key: 'newton', name: "Newton's Method", icon: Zap, color: 'border-amber-500/30 text-amber-400' },
          { key: 'quasi', name: `Quasi-Newton (${quasiMethod})`, icon: Flame, color: 'border-cyan-500/30 text-cyan-400' },
          { key: 'nelder', name: 'Nelder-Mead Simplex', icon: Sliders, color: 'border-emerald-500/30 text-emerald-400' }
        ].map(({ key, name, icon: Icon, color }) => {
          const res = results[key];
          const isSelected = primaryAlgo === key;
          return (
            <div
              key={key}
              onClick={() => setPrimaryAlgo(key)}
              className={`p-4 rounded-xl glass-panel border cursor-pointer transition-all ${
                isSelected
                  ? 'border-cyan-400 bg-slate-900/90 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400'
                  : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 font-bold text-xs text-slate-200">
                  <Icon size={14} className={color} />
                  <span>{name}</span>
                </div>
                {res?.converged && (
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold flex items-center gap-0.5">
                    <CheckCircle size={10} /> Converged
                  </span>
                )}
              </div>

              {res ? (
                <div className="space-y-1 text-xs font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>Iterations:</span>
                    <span className="text-slate-100 font-bold">{res.iterations}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Func Evals:</span>
                    <span className="text-cyan-300">{res.funcEvaluations}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Final f(x*):</span>
                    <span className="text-amber-300">{res.finalValue.toFixed(5)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Dist to Min:</span>
                    <span className="text-emerald-400">{res.distanceToGlobalMin.toFixed(4)}</span>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-500 italic">Algorithm Disabled</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Main Simulation Viewport + Playback Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Visual Canvas (3D or 2D) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between bg-slate-900/80 p-2 rounded-xl border border-slate-800">
            {/* View switcher */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewTab('2d')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  viewTab === '2d' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                2D Contour Map
              </button>
              <button
                onClick={() => setViewTab('3d')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  viewTab === '3d' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                3D Surface
              </button>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCurrentStepIdx(0);
                  setIsPlaying(false);
                }}
                className="p-1.5 bg-slate-800 text-slate-300 rounded hover:bg-slate-700"
                title="Reset to Step 0"
              >
                <RotateCcw size={14} />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                  isPlaying ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-slate-950'
                }`}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                <span>{isPlaying ? 'Pause' : 'Play Walk'}</span>
              </button>

              <button
                onClick={() => setCurrentStepIdx((prev) => Math.min(maxSteps - 1, prev + 1))}
                className="p-1.5 bg-slate-800 text-slate-300 rounded hover:bg-slate-700"
                title="Step Forward"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Canvas Render */}
          {viewTab === '2d' ? (
            <ContourPlot2D
              fn={currentFunc.evaluate}
              bounds={currentFunc.bounds}
              trajectory={currentTrajectory}
              simplexPoints={currentSimplex}
              onPointSelect={(x, y) => {
                setStartX(x);
                setStartY(y);
                setCurrentStepIdx(0);
              }}
              title={`Trajectory: ${activeResult?.algorithmName || 'Algorithm'} (Step ${currentStepIdx + 1} / ${activeResult?.history.length || 1})`}
              highlightPoints={[
                ...currentFunc.globalMinima.map(m => ({ x: m.x, y: m.y, label: 'Global Min', type: 'min' as const }))
              ]}
            />
          ) : (
            <ThreeSurfaceViewer
              fn={currentFunc.evaluate}
              bounds={currentFunc.bounds}
              trajectory={currentTrajectory}
              simplexPoints={currentSimplex}
              title={`3D Path: ${activeResult?.algorithmName || 'Algorithm'}`}
              highlightPoints={[
                ...currentFunc.globalMinima.map(m => ({ x: m.x, y: m.y, label: 'Global Min', type: 'min' as const }))
              ]}
            />
          )}

          {/* Step Progress Slider */}
          <div className="glass-panel p-3 rounded-xl border border-slate-800 flex items-center gap-4 text-xs">
            <span className="font-semibold text-slate-300 whitespace-nowrap">
              Step {currentStepIdx + 1} of {activeResult?.history.length || 1}
            </span>
            <input
              type="range"
              min="0"
              max={Math.max(0, (activeResult?.history.length || 1) - 1)}
              value={currentStepIdx}
              onChange={(e) => {
                setCurrentStepIdx(parseInt(e.target.value));
                setIsPlaying(false);
              }}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex items-center gap-1.5 whitespace-nowrap text-slate-400">
              <span>Speed:</span>
              <select
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(parseInt(e.target.value))}
                className="bg-slate-800 text-slate-200 rounded px-1.5 py-0.5 border border-slate-700 text-xs"
              >
                <option value={500}>0.5x</option>
                <option value={200}>1x</option>
                <option value={80}>2.5x</option>
                <option value={30}>Fast</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Col: Iteration Trace Table & Convergence Telemetry */}
        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col h-[520px]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
              <BarChart2 size={14} className="text-cyan-400" />
              <span>{activeResult?.algorithmName} Iteration Log</span>
            </div>
            <span className="text-[11px] font-mono text-cyan-300">
              {activeResult?.history.length || 0} Total Steps
            </span>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-4 gap-1 py-2 text-[10px] font-semibold text-slate-400 border-b border-slate-800/60 uppercase">
            <span>Iter</span>
            <span>(x, y)</span>
            <span>f(x, y)</span>
            <span>‖∇f‖</span>
          </div>

          {/* Table Body */}
          <div className="flex-1 overflow-y-auto space-y-1 pr-1 font-mono text-xs">
            {activeResult?.history.map((step, idx) => {
              const isCurrent = idx === currentStepIdx;
              return (
                <div
                  key={idx}
                  onClick={() => setCurrentStepIdx(idx)}
                  className={`grid grid-cols-4 gap-1 p-1.5 rounded cursor-pointer transition text-[11px] ${
                    isCurrent
                      ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 font-bold'
                      : 'hover:bg-slate-800/60 text-slate-300'
                  }`}
                >
                  <span className="text-slate-400">#{step.iteration}</span>
                  <span className="truncate">({step.x.toFixed(2)}, {(step.y || 0).toFixed(2)})</span>
                  <span className="text-amber-300 truncate">{step.fVal.toFixed(4)}</span>
                  <span className="text-emerald-400 truncate">{step.gradNorm !== undefined ? step.gradNorm.toFixed(3) : '-'}</span>
                </div>
              );
            })}
          </div>

          {/* Step summary box */}
          {activeResult && activeResult.history[currentStepIdx] && (
            <div className="mt-3 p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] font-mono space-y-1">
              <div className="text-slate-400">
                Point: <span className="text-cyan-300">({activeResult.history[currentStepIdx].x.toFixed(4)}, {(activeResult.history[currentStepIdx].y || 0).toFixed(4)})</span>
              </div>
              <div className="text-slate-400">
                Objective f: <span className="text-amber-300">{activeResult.history[currentStepIdx].fVal.toFixed(6)}</span>
              </div>
              {activeResult.history[currentStepIdx].extraInfo && (
                <div className="text-purple-300 text-[10px]">
                  {activeResult.history[currentStepIdx].extraInfo}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
