import { BenchmarkFunction, OptimizationStep, AlgorithmResult } from '../types';

export const BENCHMARK_FUNCTIONS: Record<string, BenchmarkFunction> = {
  rosenbrock: {
    id: 'rosenbrock',
    name: "Rosenbrock's Valley (Banana Function)",
    formulaLatex: "f(x, y) = (1 - x)^2 + 100(y - x^2)^2",
    bounds: { xMin: -2.2, xMax: 2.2, yMin: -1.2, yMax: 3.2 },
    globalMinima: [{ x: 1, y: 1, value: 0 }],
    localMinimaCount: '1 (Global)',
    characteristics: ['Non-convex', 'Ill-conditioned curved valley', 'Standard benchmark for Newton & Quasi-Newton'],
    description: "The global minimum lies inside a long, narrow, parabolic flat valley. Finding the valley is trivial, but converging to the global minimum (1,1) is notoriously challenging for first-order gradient methods.",
    evaluate: (x, y) => Math.pow(1 - x, 2) + 100 * Math.pow(y - x * x, 2),
    gradient: (x, y) => [
      -2 * (1 - x) - 400 * x * (y - x * x),
      200 * (y - x * x)
    ],
    hessian: (x, y) => [
      [2 - 400 * y + 1200 * x * x, -400 * x],
      [-400 * x, 200]
    ]
  },
  himmelblau: {
    id: 'himmelblau',
    name: "Himmelblau's Function",
    formulaLatex: "f(x, y) = (x^2 + y - 11)^2 + (x + y^2 - 7)^2",
    bounds: { xMin: -5, xMax: 5, yMin: -5, yMax: 5 },
    globalMinima: [
      { x: 3.0, y: 2.0, value: 0 },
      { x: -2.805118, y: 3.131312, value: 0 },
      { x: -3.779310, y: -3.283186, value: 0 },
      { x: 3.584428, y: -1.848126, value: 0 }
    ],
    localMinimaCount: '4 identical global minima',
    characteristics: ['Multimodal', '4 Global Minima', '1 Local Maximum at (-0.27, -0.92)'],
    description: "Features 4 identical global minima in four quadrants separated by saddle points and a central peak. Tests algorithm basin of attraction.",
    evaluate: (x, y) => Math.pow(x * x + y - 11, 2) + Math.pow(x + y * y - 7, 2),
    gradient: (x, y) => [
      4 * x * (x * x + y - 11) + 2 * (x + y * y - 7),
      2 * (x * x + y - 11) + 4 * y * (x + y * y - 7)
    ]
  },
  ackley: {
    id: 'ackley',
    name: "Ackley's Multimodal Function",
    formulaLatex: "f(x, y) = -20 \\exp\\left(-0.2\\sqrt{0.5(x^2+y^2)}\\right) - \\exp\\left(0.5(\\cos 2\\pi x + \\cos 2\\pi y)\\right) + e + 20",
    bounds: { xMin: -4, xMax: 4, yMin: -4, yMax: 4 },
    globalMinima: [{ x: 0, y: 0, value: 0 }],
    localMinimaCount: 'Dozens of local minima ripples',
    characteristics: ['Highly Multimodal', 'Outer flat region with undulating ripples', 'Deep central funnel'],
    description: "Presents an almost flat outer region with numerous microscopic ripples that easily trap local search algorithms, surrounded by a steep central funnel at the origin.",
    evaluate: (x, y) => {
      const term1 = -20 * Math.exp(-0.2 * Math.sqrt(0.5 * (x * x + y * y)));
      const term2 = -Math.exp(0.5 * (Math.cos(2 * Math.PI * x) + Math.cos(2 * Math.PI * y)));
      return term1 + term2 + Math.E + 20;
    }
  },
  rastrigin: {
    id: 'rastrigin',
    name: "Rastrigin's Function",
    formulaLatex: "f(x, y) = 20 + (x^2 - 10\\cos(2\\pi x)) + (y^2 - 10\\cos(2\\pi y))",
    bounds: { xMin: -5.12, xMax: 5.12, yMin: -5.12, yMax: 5.12 },
    globalMinima: [{ x: 0, y: 0, value: 0 }],
    localMinimaCount: 'Grid of hundreds of local minima',
    characteristics: ['Highly Multimodal', 'Regular sinusoidal cosine modulation', 'Global baseline parabolic curvature'],
    description: "Classic test case for global optimization algorithms. Regular modulated grid of local minima creates heavy oscillation for gradient descent.",
    evaluate: (x, y) => 20 + (x * x - 10 * Math.cos(2 * Math.PI * x)) + (y * y - 10 * Math.cos(2 * Math.PI * y))
  },
  beale: {
    id: 'beale',
    name: "Beale's Function",
    formulaLatex: "f(x, y) = (1.5 - x + xy)^2 + (2.25 - x + xy^2)^2 + (2.625 - x + xy^3)^2",
    bounds: { xMin: -4.5, xMax: 4.5, yMin: -4.5, yMax: 4.5 },
    globalMinima: [{ x: 3, y: 0.5, value: 0 }],
    localMinimaCount: '1 (Global)',
    characteristics: ['Unimodal', 'Sharp corners and ridges', 'High non-linear sensitivity in y'],
    description: "Features sharp ridge lines and flat regions with very high degree polynomials in the corners. Tests resilience to steep directional curvature.",
    evaluate: (x, y) => {
      const t1 = 1.5 - x + x * y;
      const t2 = 2.25 - x + x * y * y;
      const t3 = 2.625 - x + x * y * y * y;
      return t1 * t1 + t2 * t2 + t3 * t3;
    }
  },
  sphere: {
    id: 'sphere',
    name: "Sphere (Paraboloid) Function",
    formulaLatex: "f(x, y) = x^2 + y^2",
    bounds: { xMin: -4, xMax: 4, yMin: -4, yMax: 4 },
    globalMinima: [{ x: 0, y: 0, value: 0 }],
    localMinimaCount: '1 (Convex Global)',
    characteristics: ['Strongly Convex', 'Isotropic condition number = 1', 'Ideal baseline test'],
    description: "The simplest convex bowl. Hessian is constant 2*I. All descent directions point directly to the optimum.",
    evaluate: (x, y) => x * x + y * y,
    gradient: (x, y) => [2 * x, 2 * y],
    hessian: () => [[2, 0], [0, 2]]
  },
  booth: {
    id: 'booth',
    name: "Booth's Function",
    formulaLatex: "f(x, y) = (x + 2y - 7)^2 + (2x + y - 5)^2",
    bounds: { xMin: -10, xMax: 10, yMin: -10, yMax: 10 },
    globalMinima: [{ x: 1, y: 3, value: 0 }],
    localMinimaCount: '1 (Convex Quadratic)',
    characteristics: ['Convex Quadratic', 'Elliptic contours', 'Exact solution via Linear System'],
    description: "A quadratic form representing the squared residual of a 2x2 linear system. Solvable directly via Newton's method in 1 step.",
    evaluate: (x, y) => Math.pow(x + 2 * y - 7, 2) + Math.pow(2 * x + y - 5, 2)
  },
  matyas: {
    id: 'matyas',
    name: "Matyas' Function",
    formulaLatex: "f(x, y) = 0.26(x^2 + y^2) - 0.48xy",
    bounds: { xMin: -10, xMax: 10, yMin: -10, yMax: 10 },
    globalMinima: [{ x: 0, y: 0, value: 0 }],
    localMinimaCount: '1 (Global)',
    characteristics: ['Convex plate-like', 'High aspect ratio contours', 'Diagonal ridge'],
    description: "A very shallow bowl with anisotropic eigenvalues, causing steepest descent to oscillate heavily along the diagonal.",
    evaluate: (x, y) => 0.26 * (x * x + y * y) - 0.48 * x * y
  },
  easom: {
    id: 'easom',
    name: "Easom's Needle-in-a-Haystack Function",
    formulaLatex: "f(x, y) = -\\cos(x)\\cos(y)\\exp\\left(-((x-\\pi)^2 + (y-\\pi)^2)\\right)",
    bounds: { xMin: -10, xMax: 10, yMin: -10, yMax: 10 },
    globalMinima: [{ x: Math.PI, y: Math.PI, value: -1 }],
    localMinimaCount: '1 isolated global needle in flat plain',
    characteristics: ['Zero gradients almost everywhere', 'Global minimum confined to a tiny area near (π, π)'],
    description: "Nearly 99% of the search area has near-zero gradient. Demonstrates why gradient-based algorithms fail without good initialization.",
    evaluate: (x, y) => -Math.cos(x) * Math.cos(y) * Math.exp(-Math.pow(x - Math.PI, 2) - Math.pow(y - Math.PI, 2))
  },
  saddle: {
    id: 'saddle',
    name: "Monkey Saddle / Hyperbolic Paraboloid",
    formulaLatex: "f(x, y) = x^2 - y^2",
    bounds: { xMin: -3, xMax: 3, yMin: -3, yMax: 3 },
    globalMinima: [],
    localMinimaCount: '0 (Saddle point at 0,0)',
    characteristics: ['Indefinite Hessian (λ₁ > 0, λ₂ < 0)', 'Saddle point at origin', 'Zero gradient without minimum'],
    description: "Classic saddle surface illustrating indefinite Hessian eigenvalues (positive in x direction, negative in y direction).",
    evaluate: (x, y) => x * x - y * y,
    gradient: (x, y) => [2 * x, -2 * y],
    hessian: () => [[2, 0], [0, -2]]
  }
};

// Numerical differentiation helpers
export function computeNumericalGradient(
  fn: (x: number, y: number) => number,
  x: number,
  y: number,
  h = 1e-5
): [number, number] {
  const dfdx = (fn(x + h, y) - fn(x - h, y)) / (2 * h);
  const dfdy = (fn(x, y + h) - fn(x, y - h)) / (2 * h);
  return [dfdx, dfdy];
}

export function computeNumericalHessian(
  fn: (x: number, y: number) => number,
  x: number,
  y: number,
  h = 1e-4
): [[number, number], [number, number]] {
  const f_c = fn(x, y);
  const f_xx = (fn(x + h, y) - 2 * f_c + fn(x - h, y)) / (h * h);
  const f_yy = (fn(x, y + h) - 2 * f_c + fn(x, y - h)) / (h * h);
  const f_xy = (fn(x + h, y + h) - fn(x + h, y - h) - fn(x - h, y + h) + fn(x - h, y - h)) / (4 * h * h);
  return [
    [f_xx, f_xy],
    [f_xy, f_yy]
  ];
}

// 2x2 Matrix Eigenvalues & Definiteness
export function analyze2x2Matrix(A: [[number, number], [number, number]]) {
  const a = A[0][0];
  const b = A[0][1];
  const c = A[1][0];
  const d = A[1][1];

  const trace = a + d;
  const det = a * d - b * c;
  const discriminant = Math.sqrt(Math.max(0, trace * trace - 4 * det));
  
  const lambda1 = (trace + discriminant) / 2;
  const lambda2 = (trace - discriminant) / 2;

  // Leading principal minors
  const minor1 = a;
  const minor2 = det;

  let classification: 'Positive Definite (Local Min)' | 'Negative Definite (Local Max)' | 'Indefinite (Saddle Point)' | 'Positive Semi-Definite' | 'Negative Semi-Definite' | 'Singular / Inconclusive' = 'Singular / Inconclusive';

  if (minor1 > 1e-7 && minor2 > 1e-7) {
    classification = 'Positive Definite (Local Min)';
  } else if (minor1 < -1e-7 && minor2 > 1e-7) {
    classification = 'Negative Definite (Local Max)';
  } else if (minor2 < -1e-7) {
    classification = 'Indefinite (Saddle Point)';
  } else if (minor2 >= -1e-7 && minor2 <= 1e-7) {
    if (minor1 >= 0) classification = 'Positive Semi-Definite';
    else classification = 'Negative Semi-Definite';
  }

  // Condition number
  const absL1 = Math.abs(lambda1);
  const absL2 = Math.abs(lambda2);
  const conditionNumber = Math.min(absL1, absL2) > 1e-9 ? Math.max(absL1, absL2) / Math.min(absL1, absL2) : Infinity;

  return {
    trace,
    det,
    lambda1,
    lambda2,
    minor1,
    minor2,
    classification,
    conditionNumber
  };
}

// Solve 2x2 Linear System AX = B
export function solve2x2(A: [[number, number], [number, number]], B: [number, number]): [number, number] | null {
  const det = A[0][0] * A[1][1] - A[0][1] * A[1][0];
  if (Math.abs(det) < 1e-12) return null;
  const x = (B[0] * A[1][1] - A[0][1] * B[1]) / det;
  const y = (A[0][0] * B[1] - B[0] * A[1][0]) / det;
  return [x, y];
}

// 1D Optimization: Three-Point Search
export function runThreePointSearch(
  fn: (x: number) => number,
  x1: number,
  x3: number,
  maxIters = 15,
  tol = 1e-4
) {
  const steps: { iter: number; a: number; b: number; c: number; fa: number; fb: number; fc: number; intervalWidth: number }[] = [];
  let a = Math.min(x1, x3);
  let c = Math.max(x1, x3);
  let b = (a + c) / 2;

  let fa = fn(a);
  let fb = fn(b);
  let fc = fn(c);

  for (let iter = 1; iter <= maxIters; iter++) {
    const width = c - a;
    steps.push({ iter, a, b, c, fa, fb, fc, intervalWidth: width });
    if (width < tol) break;

    const xL = (a + b) / 2;
    const xR = (b + c) / 2;
    const fL = fn(xL);
    const fR = fn(xR);

    // Compare 5 points: a, xL, b, xR, c
    const points = [
      { x: a, f: fa },
      { x: xL, f: fL },
      { x: b, f: fb },
      { x: xR, f: fR },
      { x: c, f: fc }
    ];
    let minIdx = 0;
    for (let i = 1; i < points.length; i++) {
      if (points[i].f < points[minIdx].f) minIdx = i;
    }

    if (minIdx === 1) {
      // Minimum is between a and b
      c = b;
      fc = fb;
      b = xL;
      fb = fL;
    } else if (minIdx === 2) {
      // Minimum is between xL and xR
      a = xL;
      fa = fL;
      c = xR;
      fc = fR;
    } else if (minIdx === 3) {
      // Minimum is between b and c
      a = b;
      fa = fb;
      b = xR;
      fb = fR;
    } else if (minIdx === 0) {
      c = xL;
      fc = fL;
      b = (a + c) / 2;
      fb = fn(b);
    } else {
      a = xR;
      fa = fR;
      b = (a + c) / 2;
      fb = fn(b);
    }
  }

  return { steps, bestX: b, bestF: fb };
}

// 1D Optimization: Fibonacci Search
export function runFibonacciSearch(
  fn: (x: number) => number,
  a0: number,
  b0: number,
  n = 10
) {
  // Generate Fibonacci numbers
  const fib: number[] = [1, 1];
  for (let i = 2; i <= n + 2; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }

  let a = a0;
  let b = b0;
  let L = b - a;

  let x1 = a + (fib[n - 1] / fib[n + 1]) * L;
  let x2 = a + (fib[n] / fib[n + 1]) * L;
  let f1 = fn(x1);
  let f2 = fn(x2);

  const steps = [{
    k: 1,
    a,
    b,
    x1,
    x2,
    f1,
    f2,
    ratio: fib[n - 1] / fib[n + 1],
    interval: b - a
  }];

  for (let k = 2; k <= n; k++) {
    if (f1 < f2) {
      b = x2;
      x2 = x1;
      f2 = f1;
      x1 = a + (fib[n - k] / fib[n - k + 2]) * (b - a);
      f1 = fn(x1);
    } else {
      a = x1;
      x1 = x2;
      f1 = f2;
      x2 = a + (fib[n - k + 1] / fib[n - k + 2]) * (b - a);
      f2 = fn(x2);
    }
    steps.push({
      k,
      a,
      b,
      x1,
      x2,
      f1,
      f2,
      ratio: fib[n - k] / fib[n - k + 2],
      interval: b - a
    });
  }

  const bestX = (a + b) / 2;
  return { steps, bestX, bestF: fn(bestX), fibSequence: fib.slice(0, n + 2) };
}

// 1D Optimization: Golden Section Search
export function runGoldenSectionSearch(
  fn: (x: number) => number,
  a0: number,
  b0: number,
  maxIters = 15,
  tol = 1e-5
) {
  const phi = (Math.sqrt(5) - 1) / 2; // 0.6180339887...
  let a = a0;
  let b = b0;

  let x1 = b - phi * (b - a);
  let x2 = a + phi * (b - a);
  let f1 = fn(x1);
  let f2 = fn(x2);

  const steps = [{
    iter: 1,
    a,
    b,
    x1,
    x2,
    f1,
    f2,
    interval: b - a
  }];

  for (let iter = 2; iter <= maxIters; iter++) {
    if (b - a < tol) break;

    if (f1 < f2) {
      b = x2;
      x2 = x1;
      f2 = f1;
      x1 = b - phi * (b - a);
      f1 = fn(x1);
    } else {
      a = x1;
      x1 = x2;
      f1 = f2;
      x2 = a + phi * (b - a);
      f2 = fn(x2);
    }

    steps.push({
      iter,
      a,
      b,
      x1,
      x2,
      f1,
      f2,
      interval: b - a
    });
  }

  const bestX = (a + b) / 2;
  return { steps, bestX, bestF: fn(bestX), phi };
}

// 1D Newton-Raphson
export function runNewtonRaphson1D(
  fn: (x: number) => number,
  x0: number,
  maxIters = 20,
  tol = 1e-6
) {
  const steps: { iter: number; x: number; fx: number; fprime: number; fdouble: number; step: number }[] = [];
  let x = x0;
  const h = 1e-4;

  for (let iter = 1; iter <= maxIters; iter++) {
    const fx = fn(x);
    const fprime = (fn(x + h) - fn(x - h)) / (2 * h);
    const fdouble = (fn(x + h) - 2 * fx + fn(x - h)) / (h * h);

    if (Math.abs(fdouble) < 1e-12) {
      steps.push({ iter, x, fx, fprime, fdouble, step: 0 });
      break;
    }

    const step = -fprime / fdouble;
    steps.push({ iter, x, fx, fprime, fdouble, step });

    x = x + step;
    if (Math.abs(step) < tol || Math.abs(fprime) < tol) break;
  }

  return { steps, bestX: x, bestF: fn(x) };
}

// Multivariable Steepest Descent (Gradient Descent)
export function runSteepestDescent(
  func: BenchmarkFunction,
  start: [number, number],
  learningRate = 0.01,
  momentum = 0.0,
  maxIters = 100,
  tol = 1e-5
): AlgorithmResult {
  const startTime = performance.now();
  let x = start[0];
  let y = start[1];
  let vx = 0;
  let vy = 0;
  let evals = 0;

  const history: OptimizationStep[] = [];
  let converged = false;

  for (let iter = 0; iter < maxIters; iter++) {
    const fVal = func.evaluate(x, y);
    evals++;
    const [gx, gy] = func.gradient ? func.gradient(x, y) : computeNumericalGradient(func.evaluate, x, y);
    evals += 2;
    const gradNorm = Math.sqrt(gx * gx + gy * gy);

    history.push({
      iteration: iter,
      x,
      y,
      fVal,
      gradNorm,
      stepSize: learningRate
    });

    if (gradNorm < tol) {
      converged = true;
      break;
    }

    // Update with momentum
    vx = momentum * vx - learningRate * gx;
    vy = momentum * vy - learningRate * gy;

    x += vx;
    y += vy;

    // Safety bounding
    x = Math.max(func.bounds.xMin, Math.min(func.bounds.xMax, x));
    y = Math.max(func.bounds.yMin, Math.min(func.bounds.yMax, y));
  }

  const execTime = performance.now() - startTime;
  const globalMin = func.globalMinima[0] || { x: 0, y: 0, value: 0 };
  const dist = Math.sqrt(Math.pow(x - globalMin.x, 2) + Math.pow(y - globalMin.y, 2));

  return {
    algorithmName: 'Steepest Descent',
    converged,
    iterations: history.length,
    funcEvaluations: evals,
    history,
    finalPoint: [x, y],
    finalValue: func.evaluate(x, y),
    distanceToGlobalMin: dist,
    executionTimeMs: execTime
  };
}

// Multivariable Newton's Method (2D)
export function runNewtonMethod2D(
  func: BenchmarkFunction,
  start: [number, number],
  damping = 1.0,
  maxIters = 50,
  tol = 1e-5
): AlgorithmResult {
  const startTime = performance.now();
  let x = start[0];
  let y = start[1];
  let evals = 0;

  const history: OptimizationStep[] = [];
  let converged = false;

  for (let iter = 0; iter < maxIters; iter++) {
    const fVal = func.evaluate(x, y);
    evals++;
    const [gx, gy] = func.gradient ? func.gradient(x, y) : computeNumericalGradient(func.evaluate, x, y);
    evals += 2;
    const H = func.hessian ? func.hessian(x, y) : computeNumericalHessian(func.evaluate, x, y);
    evals += 4;
    const gradNorm = Math.sqrt(gx * gx + gy * gy);

    history.push({
      iteration: iter,
      x,
      y,
      fVal,
      gradNorm
    });

    if (gradNorm < tol) {
      converged = true;
      break;
    }

    // Solve H * delta = -grad
    const delta = solve2x2(H, [-gx, -gy]);
    if (!delta || isNaN(delta[0]) || isNaN(delta[1])) {
      // Hessian singular or indefinite; fallback to dampened steepest descent
      x -= 0.01 * gx;
      y -= 0.01 * gy;
    } else {
      x += damping * delta[0];
      y += damping * delta[1];
    }

    x = Math.max(func.bounds.xMin, Math.min(func.bounds.xMax, x));
    y = Math.max(func.bounds.yMin, Math.min(func.bounds.yMax, y));
  }

  const execTime = performance.now() - startTime;
  const globalMin = func.globalMinima[0] || { x: 0, y: 0, value: 0 };
  const dist = Math.sqrt(Math.pow(x - globalMin.x, 2) + Math.pow(y - globalMin.y, 2));

  return {
    algorithmName: "Newton's Method",
    converged,
    iterations: history.length,
    funcEvaluations: evals,
    history,
    finalPoint: [x, y],
    finalValue: func.evaluate(x, y),
    distanceToGlobalMin: dist,
    executionTimeMs: execTime
  };
}

// Quasi-Newton: Fletcher-Powell (DFP / BFGS)
export function runQuasiNewton(
  func: BenchmarkFunction,
  start: [number, number],
  method: 'DFP' | 'BFGS' = 'BFGS',
  maxIters = 60,
  tol = 1e-5
): AlgorithmResult {
  const startTime = performance.now();
  let x = start[0];
  let y = start[1];
  let evals = 0;

  // Initialize inverse Hessian approximation H = I_2
  let H: [[number, number], [number, number]] = [[1, 0], [0, 1]];

  let [gx, gy] = func.gradient ? func.gradient(x, y) : computeNumericalGradient(func.evaluate, x, y);
  evals += 2;

  const history: OptimizationStep[] = [];
  let converged = false;

  for (let iter = 0; iter < maxIters; iter++) {
    const fVal = func.evaluate(x, y);
    evals++;
    const gradNorm = Math.sqrt(gx * gx + gy * gy);

    history.push({
      iteration: iter,
      x,
      y,
      fVal,
      gradNorm
    });

    if (gradNorm < tol) {
      converged = true;
      break;
    }

    // Search direction d = -H * g
    const dx = -(H[0][0] * gx + H[0][1] * gy);
    const dy = -(H[1][0] * gx + H[1][1] * gy);

    // Backtracking line search for alpha
    let alpha = 1.0;
    const c1 = 1e-4;
    const dirDotGrad = dx * gx + dy * gy;

    // Guard if search direction is not descent
    const actualDx = dirDotGrad < 0 ? dx : -gx;
    const actualDy = dirDotGrad < 0 ? dy : -gy;

    for (let ls = 0; ls < 12; ls++) {
      const fNext = func.evaluate(x + alpha * actualDx, y + alpha * actualDy);
      evals++;
      if (fNext <= fVal + c1 * alpha * (actualDx * gx + actualDy * gy) || alpha < 1e-6) {
        break;
      }
      alpha *= 0.5;
    }

    const s: [number, number] = [alpha * actualDx, alpha * actualDy];
    const xNext = Math.max(func.bounds.xMin, Math.min(func.bounds.xMax, x + s[0]));
    const yNext = Math.max(func.bounds.yMin, Math.min(func.bounds.yMax, y + s[1]));

    const [gxNext, gyNext] = func.gradient ? func.gradient(xNext, yNext) : computeNumericalGradient(func.evaluate, xNext, yNext);
    evals += 2;

    const gamma: [number, number] = [gxNext - gx, gyNext - gy];
    const sDotGamma = s[0] * gamma[0] + s[1] * gamma[1];

    if (sDotGamma > 1e-10) {
      if (method === 'DFP') {
        // DFP inverse Hessian update:
        // H_next = H + (s s^T)/(s^T gamma) - (H gamma gamma^T H)/(gamma^T H gamma)
        const Hg: [number, number] = [
          H[0][0] * gamma[0] + H[0][1] * gamma[1],
          H[1][0] * gamma[0] + H[1][1] * gamma[1]
        ];
        const gHg = gamma[0] * Hg[0] + gamma[1] * Hg[1];

        if (gHg > 1e-10) {
          const term1_00 = (s[0] * s[0]) / sDotGamma;
          const term1_01 = (s[0] * s[1]) / sDotGamma;
          const term1_11 = (s[1] * s[1]) / sDotGamma;

          const term2_00 = (Hg[0] * Hg[0]) / gHg;
          const term2_01 = (Hg[0] * Hg[1]) / gHg;
          const term2_11 = (Hg[1] * Hg[1]) / gHg;

          H = [
            [H[0][0] + term1_00 - term2_00, H[0][1] + term1_01 - term2_01],
            [H[1][0] + term1_01 - term2_01, H[1][1] + term1_11 - term2_11]
          ];
        }
      } else {
        // BFGS update formula
        const rho = 1.0 / sDotGamma;
        // V = I - rho * s * gamma^T
        const V00 = 1 - rho * s[0] * gamma[0];
        const V01 = -rho * s[0] * gamma[1];
        const V10 = -rho * s[1] * gamma[0];
        const V11 = 1 - rho * s[1] * gamma[1];

        // H_temp = V^T * H * V
        const HV00 = H[0][0] * V00 + H[0][1] * V10;
        const HV01 = H[0][0] * V01 + H[0][1] * V11;
        const HV10 = H[1][0] * V00 + H[1][1] * V10;
        const HV11 = H[1][0] * V01 + H[1][1] * V11;

        const VTHV00 = V00 * HV00 + V10 * HV10;
        const VTHV01 = V00 * HV01 + V10 * HV11;
        const VTHV10 = V01 * HV00 + V11 * HV10;
        const VTHV11 = V01 * HV01 + V11 * HV11;

        H = [
          [VTHV00 + rho * s[0] * s[0], VTHV01 + rho * s[0] * s[1]],
          [VTHV10 + rho * s[1] * s[0], VTHV11 + rho * s[1] * s[1]]
        ];
      }
    }

    x = xNext;
    y = yNext;
    gx = gxNext;
    gy = gyNext;
  }

  const execTime = performance.now() - startTime;
  const globalMin = func.globalMinima[0] || { x: 0, y: 0, value: 0 };
  const dist = Math.sqrt(Math.pow(x - globalMin.x, 2) + Math.pow(y - globalMin.y, 2));

  return {
    algorithmName: `Quasi-Newton (${method})`,
    converged,
    iterations: history.length,
    funcEvaluations: evals,
    history,
    finalPoint: [x, y],
    finalValue: func.evaluate(x, y),
    distanceToGlobalMin: dist,
    executionTimeMs: execTime
  };
}

// Nelder-Mead Simplex Direct Search (2D)
export function runNelderMead(
  func: BenchmarkFunction,
  start: [number, number],
  stepSize = 0.5,
  maxIters = 80,
  tol = 1e-4
): AlgorithmResult {
  const startTime = performance.now();
  let evals = 0;

  // Coefficients
  const alpha = 1.0; // Reflection
  const gamma = 2.0; // Expansion
  const rho = 0.5;   // Contraction
  const sigma = 0.5; // Shrinkage

  // Initial simplex of 3 vertices in 2D
  let simplex: { p: [number, number]; val: number }[] = [
    { p: [start[0], start[1]], val: func.evaluate(start[0], start[1]) },
    { p: [start[0] + stepSize, start[1]], val: func.evaluate(start[0] + stepSize, start[1]) },
    { p: [start[0], start[1] + stepSize], val: func.evaluate(start[0], start[1] + stepSize) }
  ];
  evals += 3;

  const history: OptimizationStep[] = [];
  let converged = false;

  for (let iter = 0; iter < maxIters; iter++) {
    // 1. Order vertices: best, good, worst
    simplex.sort((a, b) => a.val - b.val);
    const best = simplex[0];
    const good = simplex[1];
    const worst = simplex[2];

    const simplexPoints: [number, number][] = [best.p, good.p, worst.p];
    history.push({
      iteration: iter,
      x: best.p[0],
      y: best.p[1],
      fVal: best.val,
      simplexPoints,
      extraInfo: `Best: (${best.p[0].toFixed(2)}, ${best.p[1].toFixed(2)}) f=${best.val.toFixed(4)}`
    });

    // Check convergence: standard deviation of vertex function values
    const mean = (best.val + good.val + worst.val) / 3;
    const stdDev = Math.sqrt(((best.val - mean) ** 2 + (good.val - mean) ** 2 + (worst.val - mean) ** 2) / 3);
    if (stdDev < tol) {
      converged = true;
      break;
    }

    // 2. Centroid of all vertices except worst
    const x0: [number, number] = [
      (best.p[0] + good.p[0]) / 2,
      (best.p[1] + good.p[1]) / 2
    ];

    // 3. Reflection
    const xr: [number, number] = [
      x0[0] + alpha * (x0[0] - worst.p[0]),
      x0[1] + alpha * (x0[1] - worst.p[1])
    ];
    const fr = func.evaluate(xr[0], xr[1]);
    evals++;

    if (best.val <= fr && fr < good.val) {
      // Accept reflection
      simplex[2] = { p: xr, val: fr };
    } else if (fr < best.val) {
      // 4. Expansion
      const xe: [number, number] = [
        x0[0] + gamma * (xr[0] - x0[0]),
        x0[1] + gamma * (xr[1] - x0[1])
      ];
      const fe = func.evaluate(xe[0], xe[1]);
      evals++;
      if (fe < fr) {
        simplex[2] = { p: xe, val: fe };
      } else {
        simplex[2] = { p: xr, val: fr };
      }
    } else {
      // 5. Contraction
      if (fr < worst.val) {
        // Outside contraction
        const xc: [number, number] = [
          x0[0] + rho * (xr[0] - x0[0]),
          x0[1] + rho * (xr[1] - x0[1])
        ];
        const fc = func.evaluate(xc[0], xc[1]);
        evals++;
        if (fc <= fr) {
          simplex[2] = { p: xc, val: fc };
          continue;
        }
      } else {
        // Inside contraction
        const xc: [number, number] = [
          x0[0] + rho * (worst.p[0] - x0[0]),
          x0[1] + rho * (worst.p[1] - x0[1])
        ];
        const fc = func.evaluate(xc[0], xc[1]);
        evals++;
        if (fc < worst.val) {
          simplex[2] = { p: xc, val: fc };
          continue;
        }
      }

      // 6. Shrinkage towards best vertex
      for (let i = 1; i < 3; i++) {
        simplex[i].p = [
          best.p[0] + sigma * (simplex[i].p[0] - best.p[0]),
          best.p[1] + sigma * (simplex[i].p[1] - best.p[1])
        ];
        simplex[i].val = func.evaluate(simplex[i].p[0], simplex[i].p[1]);
        evals++;
      }
    }
  }

  const execTime = performance.now() - startTime;
  const bestPoint = simplex[0].p;
  const globalMin = func.globalMinima[0] || { x: 0, y: 0, value: 0 };
  const dist = Math.sqrt(Math.pow(bestPoint[0] - globalMin.x, 2) + Math.pow(bestPoint[1] - globalMin.y, 2));

  return {
    algorithmName: 'Nelder-Mead Simplex',
    converged,
    iterations: history.length,
    funcEvaluations: evals,
    history,
    finalPoint: bestPoint,
    finalValue: simplex[0].val,
    distanceToGlobalMin: dist,
    executionTimeMs: execTime
  };
}
