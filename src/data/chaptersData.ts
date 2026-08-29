import { ChapterMeta, QuizQuestion } from '../types';

export const CHAPTERS_META: ChapterMeta[] = [
  {
    id: 'ch1-intro',
    number: 1,
    title: 'Introduction to Optimization',
    subtitle: 'Real-World Applications, Foundations & Principles',
    category: 'Foundations',
    iconName: 'Compass',
    estimatedMinutes: 15,
    summary: 'Discover how optimization powers aerospace wing design, autonomous route planning, deep learning model training, and Markowitz portfolio allocation.'
  },
  {
    id: 'ch2-formal-def',
    number: 2,
    title: 'Formal Definition of Optimization',
    subtitle: 'Standard Mathematical Problem Formulation',
    category: 'Foundations',
    iconName: 'Code',
    estimatedMinutes: 12,
    summary: 'Rigorous formulation of minimizing f(x) subject to inequality constraints g(x) ≤ 0 and equality constraints h(x) = 0.'
  },
  {
    id: 'ch3-history',
    number: 3,
    title: 'Historical Evolution & Timeline',
    subtitle: 'From Fermat & Newton to Modern Deep Learning',
    category: 'Foundations',
    iconName: 'History',
    estimatedMinutes: 10,
    summary: 'Interactive timeline spanning Fermat, Newton, Euler, Lagrange, Dantzig (Simplex), Karush-Kuhn-Tucker, Karmarkar, and modern Adam optimizers.'
  },
  {
    id: 'ch4-flowchart',
    number: 4,
    title: 'Engineering Modeling Flowchart',
    subtitle: '8-Step Systematic Lifecycle of Optimization',
    category: 'Foundations',
    iconName: 'GitBranch',
    estimatedMinutes: 12,
    summary: 'From physical problem identification and mathematical abstraction to solver selection, verification, sensitivity analysis, and deployment.'
  },
  {
    id: 'ch5-requirements',
    number: 5,
    title: 'Algorithm Performance Requirements',
    subtitle: 'Accuracy, Stability, Convergence, Complexity & Robustness',
    category: 'Foundations',
    iconName: 'Gauge',
    estimatedMinutes: 14,
    summary: 'Compare optimization algorithms across convergence orders (Linear, Superlinear, Quadratic), numerical stability, and robustness under noise.'
  },
  {
    id: 'ch6-types',
    number: 6,
    title: 'Taxonomy of Optimization Problems',
    subtitle: 'Classification Hierarchy & Problem Classes',
    category: 'Foundations',
    iconName: 'Network',
    estimatedMinutes: 15,
    summary: 'Explore the complete tree: Linear (LP), Quadratic (QP), Nonlinear (NLP), Convex, Integer (IP/MIP), Global, and Multi-Objective (Pareto).'
  },
  {
    id: 'ch7-constraints',
    number: 7,
    title: 'Constraints & Feasible Regions',
    subtitle: '3D Manifolds, Inequality Volumes & Boundaries',
    category: 'Foundations',
    iconName: 'ShieldCheck',
    estimatedMinutes: 16,
    summary: 'Interactive 3D simulator demonstrating equality manifolds g(x)=0, inequality half-spaces g(x)≤0, and active constraint boundaries.'
  },
  {
    id: 'ch8-convex-functions',
    number: 8,
    title: 'Convex Functions & Jensen’s Inequality',
    subtitle: 'Secant Line Verifier, Epigraph & Hessian Test',
    category: 'Convexity & Matrices',
    iconName: 'Activity',
    estimatedMinutes: 18,
    summary: 'Interactive chord test verifying f(λx₁ + (1-λ)x₂) ≤ λf(x₁) + (1-λ)f(x₂), first-order tangent support, and positive semi-definite Hessians.'
  },
  {
    id: 'ch9-convex-problems',
    number: 9,
    title: 'Convex Optimization Problems',
    subtitle: 'Why Local Minima are Guaranteed Global Minima',
    category: 'Convexity & Matrices',
    iconName: 'Award',
    estimatedMinutes: 15,
    summary: 'Rigorous proof and visual demonstration of why any local optimum on a convex objective over a convex set is the unique global optimum.'
  },
  {
    id: 'ch10-matrix-lab',
    number: 10,
    title: 'Matrix Form & Linear Systems',
    subtitle: 'AX = B, Quadratic Forms & Spectral Geometry',
    category: 'Convexity & Matrices',
    iconName: 'Grid',
    estimatedMinutes: 20,
    summary: 'Interactive matrix laboratory: compute condition numbers, visualize quadratic energy ellipsoids xᵀAx, and solve linear systems in real time.'
  },
  {
    id: 'ch11-hessian',
    number: 11,
    title: 'Hessian Matrix Method',
    subtitle: 'Multivariable Curvature, Eigenvalues & Critical Points',
    category: 'Convexity & Matrices',
    iconName: 'Cpu',
    estimatedMinutes: 18,
    summary: 'Calculate Gradient ∇f, Hessian H(x), and Eigenvalues λ₁, λ₂ to classify local minima, maxima, and saddle points on 3D surfaces.'
  },
  {
    id: 'ch12-unconstrained',
    number: 12,
    title: 'Unconstrained Optimization Sandbox',
    subtitle: 'Multivariable Search Without Boundary Restrictions',
    category: 'Multivariable Unconstrained',
    iconName: 'Maximize',
    estimatedMinutes: 16,
    summary: 'Explore multidimensional search spaces freely, tracking particle trajectories, descent directions, and energy level curves.'
  },
  {
    id: 'ch13-principal-minors',
    number: 13,
    title: 'Principal Minor Diagonal Test',
    subtitle: 'Sylvester’s Criterion for Matrix Definiteness',
    category: 'Convexity & Matrices',
    iconName: 'CheckSquare',
    estimatedMinutes: 15,
    summary: 'Compute leading principal minors Δ₁, Δ₂, ..., Δₙ to test for Positive Definite, Negative Definite, and Indefinite matrices without full diagonalization.'
  },
  {
    id: 'ch14-newton-raphson',
    number: 14,
    title: 'Newton-Raphson Method',
    subtitle: 'Quadratic Taylor Models & Fast Quadratic Convergence',
    category: 'Multivariable Unconstrained',
    iconName: 'TrendingUp',
    estimatedMinutes: 20,
    summary: 'Interactive tangent approximations in 1D (xₙ₊₁ = xₙ - f\'/f\'\') and multivariable Hessian inverse steps (x_{k+1} = x_k - H⁻¹∇f).'
  },
  {
    id: 'ch15-nonlinear',
    number: 15,
    title: 'Nonlinear Programming (NLP)',
    subtitle: 'Rosenbrock Valley, Himmelblau & Beale Functions',
    category: 'Multivariable Unconstrained',
    iconName: 'Mountain',
    estimatedMinutes: 20,
    summary: 'Study non-convex optimization on classic benchmark functions with curved narrow valleys, multiple global minima, and ill-conditioned ridges.'
  },
  {
    id: 'ch16-local-global',
    number: 16,
    title: 'Local vs Global Optima Terrain',
    subtitle: 'Multi-Particle Swarms & Basins of Attraction',
    category: 'Multivariable Unconstrained',
    iconName: 'Globe',
    estimatedMinutes: 18,
    summary: 'Visual simulation of multi-particle search swarms escaping local traps in multi-modal landscapes like Rastrigin and Ackley.'
  },
  {
    id: 'ch17-calculus-results',
    number: 17,
    title: 'Results from Calculus & Optimality',
    subtitle: 'FONC (∇f=0) & SONC/SOSC (Hessian Definiteness)',
    category: 'Foundations',
    iconName: 'BookOpen',
    estimatedMinutes: 15,
    summary: 'Fermat’s Theorem, First-Order Necessary Conditions (FONC), Second-Order Necessary (SONC) and Sufficient Conditions (SOSC).'
  },
  {
    id: 'ch18-three-point',
    number: 18,
    title: 'Three-Point Interval Search',
    subtitle: 'Direct Elimination for 1D Unimodal Functions',
    category: '1D Direct Search',
    iconName: 'Filter',
    estimatedMinutes: 15,
    summary: 'Step-by-step bracketing algorithm: sample three points, evaluate function values, and eliminate non-optimal intervals systematically.'
  },
  {
    id: 'ch19-fibonacci',
    number: 19,
    title: 'Fibonacci Search Method',
    subtitle: 'Optimal Reduction Ratio with Fixed Evaluation Budget',
    category: '1D Direct Search',
    iconName: 'Hash',
    estimatedMinutes: 18,
    summary: 'Interactive simulator generating exact Fibonacci ratios F_{n-k+1}/F_{n+1} to achieve the mathematically optimal interval reduction in N steps.'
  },
  {
    id: 'ch20-golden-section',
    number: 20,
    title: 'Golden Section Search',
    subtitle: 'Asymptotic Optimal Ratio φ = (√5 - 1)/2 ≈ 0.618034',
    category: '1D Direct Search',
    iconName: 'Sparkles',
    estimatedMinutes: 18,
    summary: 'Explore the golden ratio interval elimination technique requiring only ONE new function evaluation per iteration.'
  },
  {
    id: 'ch21-steepest-descent',
    number: 21,
    title: 'Steepest Descent / Ascent Method',
    subtitle: 'Gradient Vector Field, Learning Rates & Zigzagging',
    category: 'Multivariable Unconstrained',
    iconName: 'ArrowDownRight',
    estimatedMinutes: 20,
    summary: 'Interactive gradient descent: observe how step sizes (α) cause slow zigzagging in eccentric valleys, and how Momentum accelerates convergence.'
  },
  {
    id: 'ch22-nelder-mead',
    number: 22,
    title: 'Nelder-Mead Simplex Direct Search',
    subtitle: 'Derivative-Free Reflection, Expansion, Contraction & Shrinkage',
    category: 'Multivariable Unconstrained',
    iconName: 'Triangle',
    estimatedMinutes: 22,
    summary: 'Watch an animated 2D geometric simplex triangle walk, reflect, expand, contract, and shrink down into complex local minima without derivatives.'
  },
  {
    id: 'ch23-fletcher-powell',
    number: 23,
    title: 'Quasi-Newton & Fletcher-Powell (DFP/BFGS)',
    subtitle: 'Rank-1 and Rank-2 Inverse Hessian Approximations',
    category: 'Multivariable Unconstrained',
    iconName: 'Sliders',
    estimatedMinutes: 22,
    summary: 'Interactive comparison between Davidon-Fletcher-Powell (DFP) and Broyden-Fletcher-Goldfarb-Shanno (BFGS) inverse Hessian updates.'
  },
  {
    id: 'ch24-lagrange',
    number: 24,
    title: 'Lagrange Multipliers Method',
    subtitle: 'Equality Constraints & Tangency Conditions (∇f = λ∇g)',
    category: 'Constrained & KKT',
    iconName: 'Anchor',
    estimatedMinutes: 22,
    summary: 'Stunning 3D visualization showing why level curves of the objective f(x) must be tangent to constraint curves g(x)=0 at the optimum.'
  },
  {
    id: 'ch25-single-constraint',
    number: 25,
    title: 'Single Constraint Optimization',
    subtitle: 'Shadow Prices & Sensitivity Analysis of Dual Variable λ',
    category: 'Constrained & KKT',
    iconName: 'Lock',
    estimatedMinutes: 16,
    summary: 'Understand the economic and engineering interpretation of the Lagrange multiplier λ as the marginal rate of improvement (∂f*/∂b).'
  },
  {
    id: 'ch26-multiple-constraints',
    number: 26,
    title: 'Multiple Constraints & Active Boundaries',
    subtitle: 'Cones of Feasible Directions & Gradient Sums',
    category: 'Constrained & KKT',
    iconName: 'Layers',
    estimatedMinutes: 20,
    summary: 'Feasible region simulator with multiple linear and non-linear boundary curves: identify active vs inactive constraints and normal cones.'
  },
  {
    id: 'ch27-constrained-newton',
    number: 27,
    title: 'Constrained Newton & SQP Solver',
    subtitle: 'Sequential Quadratic Programming & KKT Linear Systems',
    category: 'Constrained & KKT',
    iconName: 'Zap',
    estimatedMinutes: 20,
    summary: 'Solve constrained nonlinear optimization problems by solving a sequence of quadratic programming subproblems via Newton iterations.'
  },
  {
    id: 'ch28-kkt',
    number: 28,
    title: 'Karush-Kuhn-Tucker (KKT) Comprehensive Lab',
    subtitle: 'Primal & Dual Feasibility, Slackness & Stationarity',
    category: 'Constrained & KKT',
    iconName: 'ShieldAlert',
    estimatedMinutes: 25,
    summary: 'The pinnacle of nonlinear optimization: full 4-condition KKT laboratory with real-time verification of active constraints and dual multipliers μᵢ, λⱼ.'
  }
];

export const CHAPTER_QUIZZES: Record<string, QuizQuestion[]> = {
  'ch1-intro': [
    {
      id: 'q1-1',
      type: 'multiple-choice',
      difficulty: 'Beginner',
      question: 'What is the fundamental goal of mathematical optimization?',
      options: [
        'Finding any solution that satisfies constraints',
        'Finding the best feasible solution that minimizes or maximizes an objective function',
        'Computing matrix determinants in polynomial time',
        'Generating random sample trajectories'
      ],
      correctAnswer: 'Finding the best feasible solution that minimizes or maximizes an objective function',
      explanation: 'Optimization seeks an extreme value (minimum or maximum) of an objective function within a designated feasible domain.'
    },
    {
      id: 'q1-2',
      type: 'conceptual',
      difficulty: 'Intermediate',
      question: 'In Machine Learning loss minimization, what role does the objective function play?',
      options: [
        'It measures empirical risk/prediction error that gradient descent minimizes',
        'It increases model parameter weights linearly',
        'It defines the number of hidden layers',
        'It acts as an equality constraint on dataset size'
      ],
      correctAnswer: 'It measures empirical risk/prediction error that gradient descent minimizes',
      explanation: 'Training a machine learning model is an optimization problem where loss functions (e.g. Mean Squared Error or Cross-Entropy) are minimized with respect to weights.'
    }
  ],
  'ch8-convex-functions': [
    {
      id: 'q8-1',
      type: 'proof',
      difficulty: 'Advanced',
      question: 'Which of the following is the algebraic definition of a convex function for all x₁, x₂ and λ ∈ [0, 1]?',
      latex: 'f(\\lambda x_1 + (1-\\lambda) x_2) \\le \\lambda f(x_1) + (1-\\lambda) f(x_2)',
      options: [
        'f(\\lambda x_1 + (1-\\lambda)x_2) \\le \\lambda f(x_1) + (1-\\lambda)f(x_2)',
        'f(\\lambda x_1 + (1-\\lambda)x_2) \\ge \\lambda f(x_1) + (1-\\lambda)f(x_2)',
        'f(x_1 + x_2) = f(x_1) + f(x_2)',
        'f(x) \\ge 0 \\quad \\forall x'
      ],
      correctAnswer: 'f(\\lambda x_1 + (1-\\lambda)x_2) \\le \\lambda f(x_1) + (1-\\lambda)f(x_2)',
      explanation: 'Geometrically, a function is convex if the line segment (secant/chord) between any two points on its graph lies on or above the graph of the function.'
    },
    {
      id: 'q8-2',
      type: 'numerical',
      difficulty: 'Intermediate',
      question: 'A twice-differentiable function f(x, y) has Hessian determinant det(H) = 4 and trace(H) = 5 everywhere. Is f convex?',
      options: [
        'Yes, because both eigenvalues are strictly positive (Positive Definite)',
        'No, because trace is greater than determinant',
        'Inconclusive without knowing the gradient',
        'Concave'
      ],
      correctAnswer: 'Yes, because both eigenvalues are strictly positive (Positive Definite)',
      explanation: 'When det(H) > 0 and trace(H) > 0 for a 2x2 symmetric matrix, both eigenvalues are strictly positive (λ₁, λ₂ > 0), making the Hessian Positive Definite everywhere, which proves strict convexity.'
    }
  ],
  'ch11-hessian': [
    {
      id: 'q11-1',
      type: 'multiple-choice',
      difficulty: 'Intermediate',
      question: 'If at a stationary point ∇f(x₀) = 0, the Hessian matrix has eigenvalues λ₁ = 4 and λ₂ = -2, what type of critical point is x₀?',
      options: [
        'Local Minimum',
        'Local Maximum',
        'Saddle Point',
        'Global Maximum'
      ],
      correctAnswer: 'Saddle Point',
      explanation: 'When eigenvalues have mixed signs (one positive, one negative), the Hessian is Indefinite, which signifies a Saddle Point.'
    }
  ],
  'ch14-newton-raphson': [
    {
      id: 'q14-1',
      type: 'algorithm-tracing',
      difficulty: 'University Exam',
      question: 'What is the theoretical convergence rate of Newton’s method in the neighborhood of a strict local minimum where H(x*) is positive definite and Lipschitz continuous?',
      options: [
        'Linear Convergence (Rate = 1)',
        'Superlinear Convergence',
        'Quadratic Convergence (Rate = 2)',
        'Cubic Convergence (Rate = 3)'
      ],
      correctAnswer: 'Quadratic Convergence (Rate = 2)',
      explanation: 'Newton’s method exhibits Quadratic local convergence: ||x_{k+1} - x*|| ≤ M ||x_k - x*||², doubling the number of correct digits each iteration near the optimum.'
    }
  ],
  'ch20-golden-section': [
    {
      id: 'q20-1',
      type: 'numerical',
      difficulty: 'Intermediate',
      question: 'What is the exact reduction ratio φ used in the Golden Section search?',
      latex: '\\phi = \\frac{\\sqrt{5} - 1}{2} \\approx 0.6180339887',
      options: [
        '0.500000',
        '0.618034',
        '0.707106',
        '0.866025'
      ],
      correctAnswer: '0.618034',
      explanation: 'The golden ratio conjugate (sqrt(5)-1)/2 ≈ 0.618034 allows one of the two internal test points to be reused in the next iteration.'
    }
  ],
  'ch28-kkt': [
    {
      id: 'q28-1',
      type: 'proof',
      difficulty: 'University Exam',
      question: 'Which of the following conditions represents Complementary Slackness for inequality constraints gᵢ(x) ≤ 0 with Lagrange multipliers μᵢ ≥ 0?',
      latex: '\\mu_i g_i(x^*) = 0 \\quad \\forall i = 1, \\dots, m',
      options: [
        '\\mu_i g_i(x^*) = 0 \\quad \\forall i',
        '\\mu_i + g_i(x^*) = 0',
        '\\nabla g_i(x^*) = 0',
        '\\mu_i \\le 0'
      ],
      correctAnswer: '\\mu_i g_i(x^*) = 0 \\quad \\forall i',
      explanation: 'Complementary slackness dictates that if a constraint is inactive (g_i(x*) < 0), its multiplier must be zero (μ_i = 0). Conversely, if μ_i > 0, the constraint must be active on the boundary (g_i(x*) = 0).'
    }
  ]
};
