import React, { useState, useMemo } from 'react';
import { ChapterId } from '../types';
import { CHAPTERS_META, CHAPTER_QUIZZES } from '../data/chaptersData';
import { CHAPTER_THEORY_DATA } from '../data/chapterTheoryData';
import { CHAPTER_DERIVATIONS_DATA } from '../data/chapterDerivationsData';
import { MathView } from './MathView';
import { ThreeSurfaceViewer } from './ThreeSurfaceViewer';
import { ContourPlot2D } from './ContourPlot2D';
import { BENCHMARK_FUNCTIONS, runThreePointSearch, runFibonacciSearch, runGoldenSectionSearch, runNewtonRaphson1D, analyze2x2Matrix } from '../utils/mathEngine';
import { 
  BookOpen, 
  CheckCircle, 
  HelpCircle, 
  Layers, 
  Play, 
  RotateCcw, 
  Sparkles, 
  Sliders, 
  Award, 
  ArrowRight, 
  ChevronRight,
  TrendingDown,
  Info,
  ShieldCheck,
  Zap,
  RefreshCw,
  AlertTriangle,
  FileText,
  Activity,
  Compass,
  Cpu,
  Target
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ChapterViewerProps {
  chapterId: ChapterId;
  onNavigateChapter: (id: ChapterId) => void;
  onOpenArena?: () => void;
}

export const ChapterViewer: React.FC<ChapterViewerProps> = ({
  chapterId,
  onNavigateChapter,
  onOpenArena,
}) => {
  const meta = CHAPTERS_META.find((c) => c.id === chapterId) || CHAPTERS_META[0];
  const quizzes = CHAPTER_QUIZZES[chapterId] || [];
  const theoryData = CHAPTER_THEORY_DATA[chapterId] || CHAPTER_THEORY_DATA['ch1-intro'];
  const derivationData = CHAPTER_DERIVATIONS_DATA[chapterId] || CHAPTER_DERIVATIONS_DATA['ch1-intro'];

  // Active sub-tab within the chapter
  const [activeTab, setActiveTab] = useState<'theory' | 'simulation' | 'derivation' | 'engineering' | 'quiz'>('theory');

  // Chapter Engineering Case Studies selector & interactive params
  const [engApp, setEngApp] = useState<'aero' | 'ml' | 'portfolio' | 'struct' | 'route'>('aero');
  
  // Aerospace Drag interactive sliders
  const [aeroAoA, setAeroAoA] = useState<number>(3.5); // Angle of attack in degrees
  const [aeroMach, setAeroMach] = useState<number>(0.78); // Mach number
  const [aeroThickness, setAeroThickness] = useState<number>(12); // t/c percentage

  // Portfolio interactive slider
  const [targetReturn, setTargetReturn] = useState<number>(12); // 12%

  // Chapter 8: Convexity Jensen test parameters
  const [jensenX1, setJensenX1] = useState<number>(-1.5);
  const [jensenX2, setJensenX2] = useState<number>(1.8);
  const [jensenLambda, setJensenLambda] = useState<number>(0.4);

  // 1D Search simulator states (Ch 18, 19, 20, 14)
  const [oneDMethod, setOneDMethod] = useState<'golden' | 'fib' | 'three_point' | 'newton'>('golden');

  // Interactive Quiz States
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [revealedExplanations, setRevealedExplanations] = useState<Record<string, boolean>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const handleSelectAnswer = (qId: string, answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: answer }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    quizzes.forEach((q) => {
      if (selectedAnswers[q.id] === String(q.correctAnswer)) {
        score++;
      }
    });
    setQuizScore(score);
    if (score === quizzes.length && quizzes.length > 0) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  // Find next chapter in sequence
  const currentIdx = CHAPTERS_META.findIndex((c) => c.id === chapterId);
  const nextChapter = currentIdx < CHAPTERS_META.length - 1 ? CHAPTERS_META[currentIdx + 1] : null;
  const prevChapter = currentIdx > 0 ? CHAPTERS_META[currentIdx - 1] : null;

  // Chapter-specific default surface function for preview
  const previewFn = useMemo(() => {
    switch (chapterId) {
      case 'ch8-convex-functions':
      case 'ch9-convex-problems':
      case 'ch10-matrix-lab':
        return (x: number, y: number) => 0.5 * (x * x + 3 * y * y);
      case 'ch11-hessian':
      case 'ch13-principal-minors':
        return (x: number, y: number) => x * x - y * y; // Saddle
      case 'ch15-nonlinear':
      case 'ch21-steepest-descent':
      case 'ch23-fletcher-powell':
        return (x: number, y: number) => Math.pow(1 - x, 2) + 20 * Math.pow(y - x * x, 2); // Scaled Rosenbrock
      case 'ch16-local-global':
        return (x: number, y: number) => (x * x - 5 * Math.cos(2 * Math.PI * x)) + (y * y - 5 * Math.cos(2 * Math.PI * y)) + 10; // Rastrigin
      case 'ch24-lagrange':
      case 'ch25-single-constraint':
      case 'ch28-kkt':
        return (x: number, y: number) => (x - 1) * (x - 1) + (y - 2) * (y - 2);
      default:
        return (x: number, y: number) => x * x + y * y;
    }
  }, [chapterId]);

  return (
    <div className="space-y-6">
      {/* Chapter Title & Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/20 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/30">
                Chapter {meta.number}
              </span>
              <span>•</span>
              <span className="text-purple-300">{meta.category}</span>
              <span>•</span>
              <span className="text-slate-400">{meta.estimatedMinutes} mins study</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100 tracking-tight">
              {meta.title}
            </h1>
            <p className="text-base text-cyan-300/90 font-medium mt-1">
              {meta.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
              {theoryData?.summary || meta.summary}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            {prevChapter && (
              <button
                onClick={() => onNavigateChapter(prevChapter.id)}
                className="px-3 py-2 bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition"
                title={`Previous: Ch ${prevChapter.number}`}
              >
                ← Ch {prevChapter.number}
              </button>
            )}
            {nextChapter && (
              <button
                onClick={() => onNavigateChapter(nextChapter.id)}
                className="px-4 py-2 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/40 rounded-xl text-xs font-semibold transition flex items-center gap-2"
              >
                <span>Next: Ch {nextChapter.number}</span>
                <ChevronRight size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-6 mt-6 border-t border-slate-800 text-xs font-medium">
          {[
            { id: 'theory', label: 'Theory & Mathematics', icon: BookOpen },
            { id: 'simulation', label: '3D Simulation & Sandbox', icon: Sparkles },
            { id: 'derivation', label: 'Mathematical Derivation', icon: Layers },
            { id: 'engineering', label: 'Engineering Case Studies', icon: Award },
            { id: 'quiz', label: `Practice Quiz (${quizzes.length})`, icon: HelpCircle },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition flex items-center gap-1.5 ${
                activeTab === id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
              }`}
            >
              <Icon size={14} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: THEORY & MATHEMATICS */}
      {activeTab === 'theory' && (
        <div className="space-y-6">
          {/* Prerequisites & Overview Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  <BookOpen size={20} className="text-cyan-400" />
                  <span>Theoretical Framework & Core Concepts</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Rigorous mathematical foundations for {meta.title}
                </p>
              </div>

              {theoryData?.prerequisites && (
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="text-slate-400 text-[11px] font-mono mr-1">Prerequisites:</span>
                  {theoryData.prerequisites.map((p, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[11px]">
                      {p}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {theoryData?.summary}
            </p>

            {/* Governing Equations Section */}
            {theoryData?.governingEquations && theoryData.governingEquations.length > 0 && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                  <FileText size={15} />
                  <span>Governing Mathematical Equations</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {theoryData.governingEquations.map((eq, eqIdx) => (
                    <div key={eqIdx} className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/30 transition space-y-3 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-cyan-300 block">{eq.title}</span>
                        <MathView math={eq.latex} block />
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-2">
                        {eq.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rigorous Mathematical Theorems Section */}
            {theoryData?.theorems && theoryData.theorems.length > 0 && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  <ShieldCheck size={15} />
                  <span>Mathematical Theorems & Analytical Guarantees</span>
                </div>
                <div className="space-y-4">
                  {theoryData.theorems.map((thm, thmIdx) => (
                    <div key={thmIdx} className="p-5 rounded-xl bg-slate-900/80 border border-emerald-500/20 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span>Theorem: {thm.name}</span>
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                        {thm.statement}
                      </p>
                      {thm.latex && <MathView math={thm.latex} block />}
                      <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400 leading-relaxed">
                        <strong className="text-emerald-400 font-medium">Engineering & Computational Implication: </strong>
                        {thm.implication}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Theoretical Principles */}
            {theoryData?.keyPrinciples && theoryData.keyPrinciples.length > 0 && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  <Zap size={15} />
                  <span>Fundamental Principles & Physical Intuition</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {theoryData.keyPrinciples.map((kp, kpIdx) => (
                    <div key={kpIdx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                      <div className="text-xs font-bold text-amber-300">{kp.heading}</div>
                      <p className="text-xs text-slate-400 leading-relaxed">{kp.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Algorithm Steps (if present) */}
            {theoryData?.algorithmSteps && theoryData.algorithmSteps.length > 0 && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                  <Activity size={15} />
                  <span>Algorithmic Execution Pipeline</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {theoryData.algorithmSteps.map((st) => (
                    <div key={st.step} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[11px] font-bold flex items-center justify-center border border-cyan-500/30">
                          {st.step}
                        </span>
                        <span className="text-xs font-bold text-slate-200">{st.name}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{st.description}</p>
                      {st.formula && <MathView math={st.formula} block className="text-xs my-1" />}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pitfalls and Insights */}
            {theoryData?.pitfallsAndInsights && theoryData.pitfallsAndInsights.length > 0 && (
              <div className="p-5 rounded-xl bg-slate-900/90 border border-rose-500/20 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
                  <AlertTriangle size={15} />
                  <span>Critical Mathematical Pitfalls & Expert Insights</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {theoryData.pitfallsAndInsights.map((pit, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">•</span>
                      <span className="leading-relaxed">{pit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Interactive Quick Preview Sandbox */}
          <div className="glass-panel p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                <Sparkles size={16} className="text-cyan-400" />
                <span>Interactive 3D Energy Surface & Contour Preview</span>
              </h4>
              {onOpenArena && (
                <button
                  onClick={onOpenArena}
                  className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-lg text-xs font-semibold hover:bg-cyan-500/30 transition flex items-center gap-1"
                >
                  <span>Open in Algorithm Arena</span>
                  <ArrowRight size={12} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ThreeSurfaceViewer
                fn={previewFn}
                bounds={{ xMin: -3, xMax: 3, yMin: -3, yMax: 3 }}
                title={`3D Energy Landscape for ${meta.title}`}
              />
              <ContourPlot2D
                fn={previewFn}
                bounds={{ xMin: -3, xMax: 3, yMin: -3, yMax: 3 }}
                title="2D Gradient Flow & Iso-Contour Map"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 3D SIMULATION & SANDBOX */}
      {activeTab === 'simulation' && (
        <div className="space-y-6">
          {/* Jensen Inequality Secant Verifier for Chapter 8 */}
          {chapterId === 'ch8-convex-functions' ? (
            <div className="glass-panel p-6 rounded-xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Sparkles size={16} className="text-cyan-400" />
                <span>Interactive Secant Chord Test (Jensen's Inequality)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Point x₁: {jensenX1.toFixed(2)}</label>
                  <input
                    type="range"
                    min="-3"
                    max="3"
                    step="0.1"
                    value={jensenX1}
                    onChange={(e) => setJensenX1(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Point x₂: {jensenX2.toFixed(2)}</label>
                  <input
                    type="range"
                    min="-3"
                    max="3"
                    step="0.1"
                    value={jensenX2}
                    onChange={(e) => setJensenX2(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Weight λ: {jensenLambda.toFixed(2)}</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={jensenLambda}
                    onChange={(e) => setJensenLambda(parseFloat(e.target.value))}
                    className="w-full accent-purple-400"
                  />
                </div>
              </div>

              {/* Live inequality verification computation */}
              {(() => {
                const f = (x: number) => x * x + 1; // convex quadratic
                const xBlend = jensenLambda * jensenX1 + (1 - jensenLambda) * jensenX2;
                const fBlend = f(xBlend);
                const chordVal = jensenLambda * f(jensenX1) + (1 - jensenLambda) * f(jensenX2);
                const isConvexVerified = fBlend <= chordVal + 1e-6;

                return (
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 font-mono text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block text-[11px]">Function Value at Blend f(λx₁ + (1-λ)x₂):</span>
                        <span className="text-cyan-300 font-bold text-sm">{fBlend.toFixed(4)}</span>
                      </div>
                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block text-[11px]">Secant Chord Value λf(x₁) + (1-λ)f(x₂):</span>
                        <span className="text-purple-300 font-bold text-sm">{chordVal.toFixed(4)}</span>
                      </div>
                    </div>

                    <div className={`p-3 rounded-lg flex items-center gap-2 font-sans font-bold text-xs ${
                      isConvexVerified ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}>
                      <CheckCircle size={16} />
                      <span>
                        {isConvexVerified 
                          ? `✓ Inequality Holds: ${fBlend.toFixed(4)} ≤ ${chordVal.toFixed(4)} (Convexity Verified)` 
                          : '✗ Inequality Violated (Function is Non-Convex)'}
                      </span>
                    </div>
                  </div>
                );
              })()}

              <ThreeSurfaceViewer
                fn={(x, y) => x * x + y * y}
                bounds={{ xMin: -3, xMax: 3, yMin: -3, yMax: 3 }}
                title="3D Convex Paraboloid Bowl f(x,y) = x² + y²"
                highlightPoints={[
                  { x: jensenX1, y: 0, label: 'x₁', type: 'current' },
                  { x: jensenX2, y: 0, label: 'x₂', type: 'current' },
                  { x: jensenLambda * jensenX1 + (1 - jensenLambda) * jensenX2, y: 0, label: 'Blend', type: 'min' }
                ]}
              />
            </div>
          ) : (
            /* General Simulation View for other chapters */
            <div className="space-y-6">
              <div className="glass-panel p-6 rounded-xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Sparkles size={16} className="text-cyan-400" />
                  <span>3D Multivariable Landscape & Interactive Explorer</span>
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ThreeSurfaceViewer
                    fn={previewFn}
                    bounds={{ xMin: -5, xMax: 5, yMin: -5, yMax: 5 }}
                    title={`3D Simulation for ${meta.title}`}
                  />
                  <ContourPlot2D
                    fn={previewFn}
                    bounds={{ xMin: -5, xMax: 5, yMin: -5, yMax: 5 }}
                    title="2D Iso-Contour Map"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MATHEMATICAL DERIVATIONS & PROOFS */}
      {activeTab === 'derivation' && (
        <div className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-800 space-y-6">
          <div className="border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
              <Layers size={16} />
              <span>Rigorous Mathematical Proof & Derivation</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
              {derivationData.mainTheoremTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              {derivationData.theoremStatement}
            </p>
            {derivationData.theoremLatex && (
              <MathView math={derivationData.theoremLatex} block className="my-3 text-cyan-300" />
            )}
          </div>

          {/* Sequential Step-by-Step Derivation */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Step-by-Step Proof Progression
            </h4>
            {derivationData.steps.map((step) => (
              <div key={step.stepNumber} className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center">
                      {step.stepNumber}
                    </span>
                    <span className="font-bold text-sm text-cyan-300">{step.title}</span>
                  </div>
                </div>
                {step.latex && <MathView math={step.latex} block />}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {step.explanation}
                </p>
                {step.note && (
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-400 font-mono">
                    <span className="text-purple-400 font-bold">Note: </span>
                    {step.note}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Derivation Conclusion & Final Insight */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-cyan-950/40 via-slate-900/90 to-purple-950/40 border border-cyan-500/30 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
              <CheckCircle size={16} className="text-cyan-400" />
              <span>Q.E.D. / Theoretical Conclusion</span>
            </div>
            {derivationData.conclusionLatex && (
              <MathView math={derivationData.conclusionLatex} block />
            )}
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              <strong className="text-cyan-300 font-medium">Key Takeaway: </strong>
              {derivationData.conclusionTakeaway}
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: ENGINEERING CASE STUDIES */}
      {activeTab === 'engineering' && (
        <div className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Award size={18} className="text-cyan-400" />
                <span>Real-World Engineering & Industrial Case Studies</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Explore how optimization techniques are formulated and deployed in mission-critical real-world systems.
              </p>
            </div>

            {/* Application Switcher */}
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { id: 'aero', label: 'Aerospace Drag' },
                { id: 'ml', label: 'ML Deep Learning' },
                { id: 'portfolio', label: 'Finance Markowitz' },
                { id: 'struct', label: 'Structural Truss' },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setEngApp(id as any)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition ${
                    engApp === id ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Case study contents: Aerospace Drag */}
          {engApp === 'aero' && (
            <div className="p-5 sm:p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-5 text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h4 className="text-base sm:text-lg font-bold text-cyan-300 flex items-center gap-2">
                  <span>✈️ Aerodynamic Airfoil Wing Drag Minimization</span>
                </h4>
                <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-mono">
                  Problem Class: Non-Convex NLP with Navier-Stokes PDE Constraints
                </span>
              </div>

              <p className="text-slate-300 leading-relaxed">
                In commercial transport aircraft design (e.g. Boeing 787, Airbus A350), aeronautical engineers minimize total aerodynamic drag coefficient <MathView math="C_D(\mathbf{x})" /> at transonic cruise (Mach 0.78–0.85) subject to minimum required lift, internal fuel tank volume, buffet margins, and structural bending stiffness.
              </p>

              {/* Governing Mathematical Model */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-slate-400 block">Aerodynamic Formulation:</span>
                <MathView
                  math={`\\begin{aligned}
\\text{Minimize} \\quad & C_D(\\mathbf{x}) = C_{D,\\text{induced}}(\\mathbf{x}) + C_{D,\\text{friction}}(\\mathbf{x}) + C_{D,\\text{wave}}(\\mathbf{x}) \\\\[4pt]
\\text{Subject to} \\quad & C_L(\\mathbf{x}) \\ge C_{L,\\text{cruise}} = 0.50 \\quad (\\text{Lift Equilibrium}) \\\\[2pt]
& t_{\\text{max}}(\\mathbf{x}) \\ge 0.12 \\cdot c \\quad (\\text{Fuel Tank Volume & Spar Depth}) \\\\[2pt]
& M_{\\text{crit}}(\\mathbf{x}) \\ge M_{\\text{cruise}} + 0.04 \\quad (\\text{Transonic Buffet Margin}) \\\\[2pt]
& C_M(\\mathbf{x}) \\ge -0.08 \\quad (\\text{Pitch Trim Limits})
\\end{aligned}`}
                  block
                />
              </div>

              {/* Interactive Aerospace Parameter Explorer */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-cyan-300 font-mono">Interactive Airfoil Drag Sensitivity:</span>
                  <span className="text-slate-400">Live Computational Aerodynamics Model</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">Angle of Attack α: <span className="text-cyan-300 font-bold">{aeroAoA.toFixed(1)}°</span></label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.5"
                      value={aeroAoA}
                      onChange={(e) => setAeroAoA(parseFloat(e.target.value))}
                      className="w-full accent-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Mach Number M: <span className="text-cyan-300 font-bold">{aeroMach.toFixed(2)}</span></label>
                    <input
                      type="range"
                      min="0.5"
                      max="0.95"
                      step="0.01"
                      value={aeroMach}
                      onChange={(e) => setAeroMach(parseFloat(e.target.value))}
                      className="w-full accent-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Thickness Ratio t/c: <span className="text-cyan-300 font-bold">{aeroThickness}%</span></label>
                    <input
                      type="range"
                      min="8"
                      max="18"
                      step="1"
                      value={aeroThickness}
                      onChange={(e) => setAeroThickness(parseFloat(e.target.value))}
                      className="w-full accent-cyan-400"
                    />
                  </div>
                </div>

                {/* Real-time Computed Aerodynamic Metrics */}
                {(() => {
                  const rad = (aeroAoA * Math.PI) / 180;
                  const CL = 2 * Math.PI * rad * 0.9;
                  const CD0 = 0.008 + 0.0005 * (aeroThickness - 10);
                  const CDi = (CL * CL) / (Math.PI * 9.5 * 0.85);
                  const Mcrit = 0.86 - 0.1 * (aeroThickness / 100) - 0.1 * CL;
                  const CDwave = aeroMach > Mcrit ? 20 * Math.pow(aeroMach - Mcrit, 3) : 0;
                  const CDtotal = CD0 + CDi + CDwave;
                  const LDratio = CDtotal > 0 ? CL / CDtotal : 0;

                  return (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block text-[11px]">Lift Coeff C_L:</span>
                        <span className="text-cyan-300 font-bold text-sm">{CL.toFixed(3)}</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block text-[11px]">Total Drag C_D:</span>
                        <span className="text-purple-300 font-bold text-sm">{CDtotal.toFixed(4)}</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block text-[11px]">Wave Drag C_D,wave:</span>
                        <span className={`font-bold text-sm ${CDwave > 0.005 ? 'text-rose-400' : 'text-emerald-300'}`}>
                          {CDwave.toFixed(4)}
                        </span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block text-[11px]">L/D Efficiency:</span>
                        <span className="text-emerald-300 font-bold text-sm">{LDratio.toFixed(1)}</span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-slate-950/80 rounded-lg border border-slate-800">
                  <div className="font-bold text-cyan-300 mb-1 flex items-center gap-1.5">
                    <span>Design Variables</span>
                    <MathView math="\mathbf{x}" />
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Class-Shape Transformation (CST) parameterized polynomial surface coefficients, section camber, twist angle distribution, and spanwise thickness chord.
                  </p>
                </div>
                <div className="p-3.5 bg-slate-950/80 rounded-lg border border-slate-800">
                  <div className="font-bold text-emerald-300 mb-1">Optimization Solvers Employed</div>
                  <p className="text-slate-400 leading-relaxed">
                    Sequential Quadratic Programming (SQP) and Interior-Point NLP solvers coupled with continuous/discrete Adjoint-State Reynolds-Averaged Navier-Stokes (RANS) gradient evaluations.
                  </p>
                </div>
              </div>
            </div>
          )}

          {engApp === 'ml' && (
            <div className="p-5 sm:p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4 text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h4 className="text-base sm:text-lg font-bold text-purple-300">🤖 Deep Neural Network Empirical Risk Minimization</h4>
                <span className="px-2.5 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-mono">
                  Problem Class: Large-Scale Stochastic Non-Convex Optimization
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Training deep neural networks and Large Language Models (LLMs) with billions of parameter weights <MathView math="\mathbf{w}" /> constitutes solving an unconstrained empirical loss minimization over billions of training token tokens.
              </p>
              <MathView
                math={`\\min_{\\mathbf{w}} \\; \\mathcal{L}(\\mathbf{w}) = \\frac{1}{|\\mathcal{B}|} \\sum_{i \\in \\mathcal{B}} \\ell\\left(f_{\\mathbf{w}}(\\mathbf{x}_i), y_i\\right) + \\frac{\\lambda}{2} \\|\\mathbf{w}\\|_2^2`}
                block
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800">
                  <strong className="text-purple-300 block mb-1">AdamW Update Rule:</strong>
                  <p className="text-slate-400">
                    Maintains exponentially decaying moving averages of past gradients <MathView math="\mathbf{m}_t" /> and squared gradients <MathView math="\mathbf{v}_t" /> with decoupled weight decay.
                  </p>
                </div>
                <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800">
                  <strong className="text-emerald-300 block mb-1">Convergence Dynamics:</strong>
                  <p className="text-slate-400">
                    Navigates highly non-convex loss surfaces, escaping saddle points through stochastic noise and adaptive coordinate-wise learning rates.
                  </p>
                </div>
              </div>
            </div>
          )}

          {engApp === 'portfolio' && (
            <div className="p-5 sm:p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4 text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h4 className="text-base sm:text-lg font-bold text-emerald-300">📈 Markowitz Mean-Variance Portfolio Frontier</h4>
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-mono">
                  Problem Class: Strictly Convex Quadratic Program (QP)
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                In quantitative finance and algorithmic trading, asset managers compute capital allocation weights <MathView math="\mathbf{w} \in \mathbb{R}^n" /> across assets to minimize total portfolio variance (volatility risk) subject to achieving a target expected return.
              </p>
              <MathView
                math={`\\begin{aligned}
\\text{Minimize} \\quad & \\mathbf{w}^T \\mathbf{\\Sigma} \\mathbf{w} \\quad (\\text{Portfolio Volatility Variance}) \\\\[4pt]
\\text{Subject to} \\quad & \\mathbf{w}^T \\mathbf{\\mu} \\ge R_{\\text{target}} \\quad (\\text{Required Expected Return}) \\\\[2pt]
& \\mathbf{1}^T \\mathbf{w} = 1 \\quad (\\text{100\\% Capital Budget Allocation}) \\\\[2pt]
& w_i \\ge 0 \\quad (\\text{No Short-Selling Constraint})
\\end{aligned}`}
                block
              />
              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 text-slate-400 text-xs">
                <strong className="text-emerald-300">Analytical Property:</strong> Because covariance matrix <MathView math="\mathbf{\Sigma} \succ 0" /> is strictly positive definite, this is a strictly convex QP with a globally unique Pareto-optimal solution found instantaneously by Interior Point / KKT solvers.
              </div>
            </div>
          )}

          {engApp === 'struct' && (
            <div className="p-5 sm:p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4 text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h4 className="text-base sm:text-lg font-bold text-amber-300">🏗️ Structural 25-Bar Transmission Tower Truss Optimization</h4>
                <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-mono">
                  Problem Class: Non-linear Constrained Structural Optimization
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Minimizing total steel mass <MathView math="M(\mathbf{A})" /> of an aerospace gantry or transmission tower subject to maximum allowable tension/compression yield limits and nodal deflection constraints under hurricane wind loads.
              </p>
              <MathView
                math={`\\begin{aligned}
\\text{Minimize} \\quad & M(\\mathbf{A}) = \\sum_{i=1}^m \\rho_i L_i A_i \\quad (\\text{Total Structural Mass}) \\\\[4pt]
\\text{Subject to} \\quad & |\\sigma_i(\\mathbf{A})| \\le \\sigma_{\\text{allowable}}, \\quad i = 1, \\dots, m \\quad (\\text{Stress Yield Limits}) \\\\[2pt]
& \\delta_j(\\mathbf{A}) \\le \\delta_{\\text{max}}, \\quad j = 1, \\dots, p \\quad (\\text{Joint Deflections}) \\\\[2pt]
& A_{\\text{min}} \\le A_i \\le A_{\\text{max}} \\quad (\\text{Standard Member Bar Sizing})
\\end{aligned}`}
                block
              />
              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 text-slate-400 text-xs">
                <strong className="text-amber-300">Algorithms Deployed:</strong> Method of Moving Asymptotes (MMA), Sequential Linear Programming (SLP), and Finite Element Analysis (FEA) adjoint sensitivities.
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: PRACTICE QUIZ */}
      {activeTab === 'quiz' && (
        <div className="glass-panel p-6 sm:p-8 rounded-xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <HelpCircle size={18} className="text-cyan-400" />
                <span>Chapter {meta.number} Practice Questions</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Test your mastery of optimization concepts, proofs, and numerical calculations.
              </p>
            </div>

            {quizScore !== null && (
              <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                Score: {quizScore} / {quizzes.length}
              </div>
            )}
          </div>

          {quizzes.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No specific quiz bank configured for this chapter yet. Explore the University Exam Center for all-chapter comprehensive tests!
            </div>
          ) : (
            <div className="space-y-6">
              {quizzes.map((q, qIndex) => {
                const isAnswered = selectedAnswers[q.id] !== undefined;
                const isCorrect = selectedAnswers[q.id] === String(q.correctAnswer);
                const isRevealed = revealedExplanations[q.id] || quizScore !== null;

                return (
                  <div key={q.id} className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="font-medium text-sm text-slate-200 flex items-start gap-2.5">
                        <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold shrink-0">
                          Q{qIndex + 1}
                        </span>
                        <span>{q.question}</span>
                      </div>
                      <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border ${
                        q.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' :
                        q.difficulty === 'Intermediate' ? 'bg-amber-500/10 text-amber-300 border-amber-500/20' :
                        'bg-rose-500/10 text-rose-300 border-rose-500/20'
                      }`}>
                        {q.difficulty}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, optIndex) => {
                        const isSelected = selectedAnswers[q.id] === String(optIndex);
                        const isThisCorrect = optIndex === q.correctAnswer;
                        let btnStyle = 'bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-800';

                        if (isRevealed) {
                          if (isThisCorrect) {
                            btnStyle = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold';
                          } else if (isSelected) {
                            btnStyle = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
                          }
                        } else if (isSelected) {
                          btnStyle = 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold';
                        }

                        return (
                          <button
                            key={optIndex}
                            onClick={() => handleSelectAnswer(q.id, String(optIndex))}
                            className={`p-3 rounded-lg border text-left transition flex items-center gap-2 ${btnStyle}`}
                          >
                            <span className="font-mono text-slate-500 font-bold">{String.fromCharCode(65 + optIndex)}.</span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {isRevealed && (
                      <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800/80 text-xs text-slate-400 space-y-1">
                        <div className="font-bold text-cyan-300">Explanation:</div>
                        <p className="leading-relaxed">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    setSelectedAnswers({});
                    setQuizScore(null);
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <RotateCcw size={14} />
                  <span>Reset</span>
                </button>
                <button
                  onClick={handleSubmitQuiz}
                  className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
                >
                  <CheckCircle size={14} />
                  <span>Grade Quiz ({Object.keys(selectedAnswers).length}/{quizzes.length})</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
