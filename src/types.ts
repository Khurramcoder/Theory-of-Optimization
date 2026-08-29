export type ChapterId = 
  | 'overview'
  | 'ch1-intro'
  | 'ch2-formal-def'
  | 'ch3-history'
  | 'ch4-flowchart'
  | 'ch5-requirements'
  | 'ch6-types'
  | 'ch7-constraints'
  | 'ch8-convex-functions'
  | 'ch9-convex-problems'
  | 'ch10-matrix-lab'
  | 'ch11-hessian'
  | 'ch12-unconstrained'
  | 'ch13-principal-minors'
  | 'ch14-newton-raphson'
  | 'ch15-nonlinear'
  | 'ch16-local-global'
  | 'ch17-calculus-results'
  | 'ch18-three-point'
  | 'ch19-fibonacci'
  | 'ch20-golden-section'
  | 'ch21-steepest-descent'
  | 'ch22-nelder-mead'
  | 'ch23-fletcher-powell'
  | 'ch24-lagrange'
  | 'ch25-single-constraint'
  | 'ch26-multiple-constraints'
  | 'ch27-constrained-newton'
  | 'ch28-kkt'
  | 'benchmark-functions'
  | 'algorithm-arena'
  | 'matrix-calculus-workbench'
  | 'exam-center';

export type Category = 
  | 'Foundations'
  | 'Convexity & Matrices'
  | '1D Direct Search'
  | 'Multivariable Unconstrained'
  | 'Constrained & KKT'
  | 'Laboratory & Benchmarks';

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'numerical' | 'conceptual' | 'proof' | 'algorithm-tracing';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'University Exam';
  question: string;
  latex?: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  hint?: string;
}

export interface ChapterMeta {
  id: ChapterId;
  number: number | string;
  title: string;
  subtitle: string;
  category: Category;
  iconName: string;
  estimatedMinutes: number;
  summary: string;
}

export interface BenchmarkFunction {
  id: string;
  name: string;
  formulaLatex: string;
  bounds: { xMin: number; xMax: number; yMin: number; yMax: number };
  globalMinima: { x: number; y: number; value: number }[];
  localMinimaCount?: string;
  characteristics: string[];
  description: string;
  evaluate: (x: number, y: number) => number;
  gradient?: (x: number, y: number) => [number, number];
  hessian?: (x: number, y: number) => [[number, number], [number, number]];
}

export interface OptimizationStep {
  iteration: number;
  x: number;
  y?: number;
  fVal: number;
  gradNorm?: number;
  stepSize?: number;
  extraInfo?: string;
  simplexPoints?: [number, number][];
}

export interface AlgorithmResult {
  algorithmName: string;
  converged: boolean;
  iterations: number;
  funcEvaluations: number;
  history: OptimizationStep[];
  finalPoint: [number, number] | number;
  finalValue: number;
  distanceToGlobalMin: number;
  executionTimeMs: number;
}
