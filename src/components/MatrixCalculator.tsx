import React, { useState, useMemo } from 'react';
import { analyze2x2Matrix, solve2x2, computeNumericalGradient, computeNumericalHessian } from '../utils/mathEngine';
import { MathView } from './MathView';
import { ThreeSurfaceViewer } from './ThreeSurfaceViewer';
import { Grid, Cpu, CheckSquare, Sparkles, ArrowRight, RefreshCw, Layers } from 'lucide-react';

export const MatrixCalculator: React.FC = () => {
  // 2x2 Matrix elements
  const [a11, setA11] = useState<number>(4);
  const [a12, setA12] = useState<number>(1);
  const [a21, setA21] = useState<number>(1);
  const [a22, setA22] = useState<number>(3);

  // Vector B for AX = B
  const [b1, setB1] = useState<number>(6);
  const [b2, setB2] = useState<number>(7);

  // Multivariable custom function test point for Hessian test
  const [funcChoice, setFuncChoice] = useState<'custom_poly' | 'saddle' | 'rosenbrock' | 'bowl'>('bowl');
  const [evalX, setEvalX] = useState<number>(0);
  const [evalY, setEvalY] = useState<number>(0);

  // Build matrix
  const A: [[number, number], [number, number]] = useMemo(() => [
    [a11, a12],
    [a21, a22]
  ], [a11, a12, a21, a22]);

  // Matrix analysis
  const analysis = useMemo(() => analyze2x2Matrix(A), [A]);
  const sol = useMemo(() => solve2x2(A, [b1, b2]), [A, b1, b2]);

  // Quadratic form function f(x,y) = [x, y] * A * [x, y]^T
  const quadFormFn = useMemo(() => {
    return (x: number, y: number) => {
      return a11 * x * x + (a12 + a21) * x * y + a22 * y * y;
    };
  }, [a11, a12, a21, a22]);

  // Preset Matrices
  const loadPreset = (type: 'pos_def' | 'neg_def' | 'saddle' | 'ill_cond' | 'singular') => {
    if (type === 'pos_def') {
      setA11(5); setA12(1); setA21(1); setA22(4);
    } else if (type === 'neg_def') {
      setA11(-4); setA12(1); setA21(1); setA22(-3);
    } else if (type === 'saddle') {
      setA11(3); setA12(0); setA21(0); setA22(-3);
    } else if (type === 'ill_cond') {
      setA11(100); setA12(99); setA21(99); setA22(100);
    } else if (type === 'singular') {
      setA11(2); setA12(4); setA21(1); setA22(2);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 relative overflow-hidden">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
          <Grid size={14} /> Matrix Calculus & Spectral Analysis Laboratory
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
          Hessian Matrices, Principal Minors & Quadratic Forms
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Directly inspect eigenvalues, Sylvester's Leading Principal Minors criterion, condition numbers, and quadratic energy ellipsoids <span className="font-mono text-cyan-300">Q(x) = xᵀAx</span>.
        </p>

        {/* Preset Buttons */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-800 text-xs">
          <span className="text-slate-400 font-medium mr-1">Quick Presets:</span>
          <button
            onClick={() => loadPreset('pos_def')}
            className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30"
          >
            Positive Definite (Local Min)
          </button>
          <button
            onClick={() => loadPreset('neg_def')}
            className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30"
          >
            Negative Definite (Local Max)
          </button>
          <button
            onClick={() => loadPreset('saddle')}
            className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30"
          >
            Indefinite (Saddle Point)
          </button>
          <button
            onClick={() => loadPreset('ill_cond')}
            className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30"
          >
            Ill-Conditioned (High κ)
          </button>
          <button
            onClick={() => loadPreset('singular')}
            className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
          >
            Singular (det = 0)
          </button>
        </div>
      </div>

      {/* Interactive Matrix Editor + Analysis Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Matrix Inputs & Linear System */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <Cpu size={16} className="text-cyan-400" />
              <span>Interactive 2x2 Matrix A & Vector B</span>
            </h3>

            <div className="flex items-center gap-4 justify-center py-2 font-mono">
              {/* Matrix A Box */}
              <div className="relative p-2 bg-slate-900/90 rounded-xl border-2 border-cyan-500/30 flex flex-col gap-2">
                <div className="text-[10px] text-cyan-400 font-sans text-center font-bold">Matrix A</div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={a11}
                    onChange={(e) => setA11(parseFloat(e.target.value) || 0)}
                    className="w-14 text-center bg-slate-950 text-cyan-300 font-bold p-2 rounded border border-slate-700 text-sm focus:border-cyan-400 focus:outline-none"
                  />
                  <input
                    type="number"
                    value={a12}
                    onChange={(e) => setA12(parseFloat(e.target.value) || 0)}
                    className="w-14 text-center bg-slate-950 text-cyan-300 font-bold p-2 rounded border border-slate-700 text-sm focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={a21}
                    onChange={(e) => setA21(parseFloat(e.target.value) || 0)}
                    className="w-14 text-center bg-slate-950 text-cyan-300 font-bold p-2 rounded border border-slate-700 text-sm focus:border-cyan-400 focus:outline-none"
                  />
                  <input
                    type="number"
                    value={a22}
                    onChange={(e) => setA22(parseFloat(e.target.value) || 0)}
                    className="w-14 text-center bg-slate-950 text-cyan-300 font-bold p-2 rounded border border-slate-700 text-sm focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <span className="text-xl text-slate-500 font-bold">×</span>

              {/* Vector X Box */}
              <div className="p-2 bg-slate-900/50 rounded-xl border border-slate-800 flex flex-col gap-2 text-center text-xs">
                <div className="text-[10px] text-purple-400 font-sans font-bold">Vector X</div>
                <div className="p-2 bg-slate-950/80 rounded border border-slate-800 text-purple-300 font-bold w-10">x₁</div>
                <div className="p-2 bg-slate-950/80 rounded border border-slate-800 text-purple-300 font-bold w-10">x₂</div>
              </div>

              <span className="text-xl text-slate-500 font-bold">=</span>

              {/* Vector B Box */}
              <div className="p-2 bg-slate-900/90 rounded-xl border-2 border-emerald-500/30 flex flex-col gap-2">
                <div className="text-[10px] text-emerald-400 font-sans text-center font-bold">Vector B</div>
                <input
                  type="number"
                  value={b1}
                  onChange={(e) => setB1(parseFloat(e.target.value) || 0)}
                  className="w-14 text-center bg-slate-950 text-emerald-300 font-bold p-2 rounded border border-slate-700 text-sm focus:border-emerald-400 focus:outline-none"
                />
                <input
                  type="number"
                  value={b2}
                  onChange={(e) => setB2(parseFloat(e.target.value) || 0)}
                  className="w-14 text-center bg-slate-950 text-emerald-300 font-bold p-2 rounded border border-slate-700 text-sm focus:border-emerald-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Solution output */}
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono">
              <div className="text-slate-400 mb-1">Linear System Solution X = A⁻¹B:</div>
              {sol ? (
                <div className="text-emerald-400 font-bold text-sm">
                  x₁ = {sol[0].toFixed(4)}, &nbsp; x₂ = {sol[1].toFixed(4)}
                </div>
              ) : (
                <div className="text-rose-400 font-bold">Matrix is Singular (det = 0). No unique solution!</div>
              )}
            </div>
          </div>

          {/* Sylvester's Criterion & Minors Inspector */}
          <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-3">
            <h4 className="font-bold text-xs text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <CheckSquare size={14} className="text-cyan-400" />
              <span>Sylvester's Principal Minor Test</span>
            </h4>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between p-2 rounded bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400">1st Leading Minor (Δ₁ = a₁₁):</span>
                <span className={`font-bold ${analysis.minor1 > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {analysis.minor1.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400">2nd Leading Minor (Δ₂ = det A):</span>
                <span className={`font-bold ${analysis.minor2 > 0 ? 'text-emerald-400' : (analysis.minor2 < 0 ? 'text-amber-400' : 'text-slate-400')}`}>
                  {analysis.minor2.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Classification banner */}
            <div className="p-3 rounded-lg bg-slate-900 border border-cyan-500/30 text-xs space-y-1">
              <div className="text-slate-400">Definiteness Classification:</div>
              <div className="text-cyan-300 font-bold text-sm font-sans flex items-center gap-1.5">
                <Sparkles size={14} className="text-cyan-400" />
                {analysis.classification}
              </div>
            </div>

            {/* Spectral properties */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
              <div className="p-2 bg-slate-900/60 rounded border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Eigenvalue λ₁</span>
                <span className="text-purple-300 font-bold">{analysis.lambda1.toFixed(3)}</span>
              </div>
              <div className="p-2 bg-slate-900/60 rounded border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Eigenvalue λ₂</span>
                <span className="text-purple-300 font-bold">{analysis.lambda2.toFixed(3)}</span>
              </div>
              <div className="p-2 bg-slate-900/60 rounded border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Matrix Trace</span>
                <span className="text-slate-200 font-bold">{analysis.trace.toFixed(2)}</span>
              </div>
              <div className="p-2 bg-slate-900/60 rounded border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Condition Number κ</span>
                <span className="text-amber-300 font-bold">{isFinite(analysis.conditionNumber) ? analysis.conditionNumber.toFixed(2) : '∞'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: 3D Quadratic Form Surface / Landscape */}
        <div className="lg:col-span-7 space-y-4">
          <ThreeSurfaceViewer
            fn={quadFormFn}
            bounds={{ xMin: -3, xMax: 3, yMin: -3, yMax: 3 }}
            title={`Quadratic Form: Q(x,y) = ${a11}x² + ${(a12 + a21)}xy + ${a22}y²`}
            highlightPoints={[
              { x: 0, y: 0, label: 'Origin (0,0)', type: analysis.classification.includes('Min') ? 'min' : (analysis.classification.includes('Max') ? 'max' : 'saddle') }
            ]}
          />

          {/* Mathematical Explanation Card */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
            <h4 className="font-bold text-slate-100 flex items-center gap-1.5">
              <Layers size={14} className="text-cyan-400" />
              <span>Geometric Interpretation of Matrix Definiteness</span>
            </h4>
            <p className="leading-relaxed">
              For a symmetric matrix <span className="font-mono text-cyan-300">A</span>, the quadratic form <span className="font-mono text-cyan-300">Q(x) = xᵀAx</span> defines an energy surface:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400 pl-2">
              <li><strong className="text-emerald-300">Positive Definite (λ₁ &gt; 0, λ₂ &gt; 0):</strong> Upward convex paraboloid (bowl). Strictly unique global minimum at the origin.</li>
              <li><strong className="text-rose-300">Negative Definite (λ₁ &lt; 0, λ₂ &lt; 0):</strong> Downward concave dome. Unique global maximum at origin.</li>
              <li><strong className="text-amber-300">Indefinite (λ₁ &gt; 0, λ₂ &lt; 0):</strong> Hyperbolic paraboloid (monkey saddle). Minimum along one axis, maximum along the other.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
