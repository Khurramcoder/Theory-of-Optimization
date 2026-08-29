export interface ChapterTheoryContent {
  chapterId: string;
  title: string;
  summary: string;
  prerequisites: string[];
  governingEquations: {
    title: string;
    latex: string;
    description: string;
  }[];
  theorems: {
    name: string;
    statement: string;
    latex?: string;
    implication: string;
  }[];
  keyPrinciples: {
    heading: string;
    content: string;
  }[];
  algorithmSteps?: {
    step: number;
    name: string;
    description: string;
    formula?: string;
  }[];
  pitfallsAndInsights: string[];
}

export const CHAPTER_THEORY_DATA: Record<string, ChapterTheoryContent> = {
  'ch1-intro': {
    chapterId: 'ch1-intro',
    title: 'Introduction to Mathematical Optimization',
    summary: 'Optimization is the mathematical discipline of selecting the best element from a set of available alternatives. It is the cornerstone of modern engineering design, artificial intelligence loss minimization, aerospace trajectory planning, and quantitative finance.',
    prerequisites: ['Multivariable Calculus', 'Linear Algebra', 'Basic Matrix Notation'],
    governingEquations: [
      {
        title: 'Core Optimization Axiom',
        latex: '\\min_{\\mathbf{x} \\in \\Omega} f(\\mathbf{x}) \\quad \\text{where} \\quad \\Omega = \\{ \\mathbf{x} \\in \\mathbb{R}^n \\mid g_i(\\mathbf{x}) \\le 0, \\; h_j(\\mathbf{x}) = 0 \\}',
        description: 'Find a parameter vector x within feasible domain Ω that produces the smallest scalar objective value f(x).'
      },
      {
        title: 'Duality of Min-Max',
        latex: '\\max_{\\mathbf{x} \\in \\Omega} f(\\mathbf{x}) \\iff \\min_{\\mathbf{x} \\in \\Omega} -f(\\mathbf{x})',
        description: 'Every maximization problem is mathematically equivalent to minimizing the negated objective.'
      }
    ],
    theorems: [
      {
        name: 'Weierstrass Extreme Value Theorem',
        statement: 'If a real-valued function f(x) is continuous on a compact (closed and bounded) subset Ω ⊂ ℝⁿ, then f attains both a global minimum and a global maximum at least once in Ω.',
        latex: '\\exists \\mathbf{x}^*, \\mathbf{x}^{**} \\in \\Omega \\quad \\text{such that} \\quad f(\\mathbf{x}^*) \\le f(\\mathbf{x}) \\le f(\\mathbf{x}^{**}) \\quad \\forall \\mathbf{x} \\in \\Omega',
        implication: 'Guarantees the existence of optimal solutions for bounded real-world engineering problems.'
      }
    ],
    keyPrinciples: [
      {
        heading: '1. Objective Metric f(x)',
        content: 'Quantifies system performance (drag, structural mass, electrical energy dissipation, training cross-entropy error, financial portfolio risk).'
      },
      {
        heading: '2. Decision Vector x',
        content: 'An n-dimensional column vector of independent parameters that the optimizer can adjust to alter system performance.'
      },
      {
        heading: '3. Constraint Manifolds g(x) ≤ 0, h(x) = 0',
        content: 'Physical, safety, budget, or geometric boundaries restricting the allowable values of the decision vector.'
      }
    ],
    pitfallsAndInsights: [
      'Confusing local minima with the global minimum in non-convex landscapes.',
      'Failing to verify whether constraints define a non-empty feasible set (infeasibility error).',
      'Scaling variables poorly: when x₁ is order 10⁶ and x₂ is order 10⁻⁶, gradients become severely ill-conditioned.'
    ]
  },

  'ch2-formal-def': {
    chapterId: 'ch2-formal-def',
    title: 'Formal Definition of Optimization',
    summary: 'The canonical standard mathematical formulation structures any decision problem into an objective function, m inequality constraints, p equality constraints, and box bounds.',
    prerequisites: ['Vector Space ℝⁿ', 'Set Theory', 'Continuous Differentiability C¹ and C²'],
    governingEquations: [
      {
        title: 'Canonical NLP Standard Form',
        latex: '\\begin{aligned} \\text{Minimize} \\quad & f(\\mathbf{x}) \\\\ \\text{Subject to} \\quad & g_i(\\mathbf{x}) \\le 0, \\quad i = 1, \\dots, m \\\\ & h_j(\\mathbf{x}) = 0, \\quad j = 1, \\dots, p \\\\ & \\mathbf{x}_L \\le \\mathbf{x} \\le \\mathbf{x}_U, \\quad \\mathbf{x} \\in \\mathbb{R}^n \\end{aligned}',
        description: 'Standard convention where all inequalities are transformed to less-than-or-equal-to zero.'
      },
      {
        title: 'Feasible Set Definition',
        latex: '\\mathcal{F} = \\left\\{ \\mathbf{x} \\in \\mathbb{R}^n \\,\\middle|\\, g_i(\\mathbf{x}) \\le 0 \\; (\\forall i), \\; h_j(\\mathbf{x}) = 0 \\; (\\forall j), \\; \\mathbf{x}_L \\le \\mathbf{x} \\le \\mathbf{x}_U \\right\\}',
        description: 'The intersection of all constraint hyper-surfaces and half-spaces.'
      }
    ],
    theorems: [
      {
        name: 'Standard Form Equivalence Principle',
        statement: 'Any constraint of the form a(x) ≥ b can be converted to standard form as b - a(x) ≤ 0. Equalities h(x) = c convert to h(x) - c = 0.',
        latex: 'a(\\mathbf{x}) \\ge b \\iff b - a(\\mathbf{x}) \\le 0',
        implication: 'Enables universal solvers to accept uniform standardized input matrices and vector definitions.'
      }
    ],
    keyPrinciples: [
      {
        heading: 'Feasibility vs Optimality',
        content: 'A point x is feasible if x ∈ ℱ. A point x* is optimal if x* ∈ ℱ and f(x*) ≤ f(x) for all x ∈ ℱ.'
      },
      {
        heading: 'Active vs Inactive Constraints',
        content: 'At point x, constraint gᵢ is active if gᵢ(x) = 0 (on the boundary); it is inactive if gᵢ(x) < 0 (in the interior); it is violated if gᵢ(x) > 0.'
      }
    ],
    pitfallsAndInsights: [
      'Writing g(x) ≥ 0 without negating to standard form g(x) ≤ 0 leads to sign errors in dual multipliers.',
      'Over-constraining a system where p > n for equality constraints often renders the feasible set empty.'
    ]
  },

  'ch3-history': {
    chapterId: 'ch3-history',
    title: 'Historical Evolution & Milestone Timeline',
    summary: 'The timeline of mathematical optimization spans four centuries—from Fermat and Newton establishing differential calculus foundations to Dantzig, Karush-Kuhn-Tucker, Karmarkar, and modern adaptive deep learning algorithms.',
    prerequisites: ['History of Mathematics', 'Calculus Origins'],
    governingEquations: [
      {
        title: 'Fermat’s Stationary Principle (1636)',
        latex: 'f\'(x^*) = 0 \\quad \\implies \\quad \\text{Tangent line is horizontal at an extremum}',
        description: 'Pre-calculus method of adequality: roots of the derivative identify candidates for maxima/minima.'
      },
      {
        title: 'Lagrange Multiplier Equation (1788)',
        latex: '\\nabla f(\\mathbf{x}^*) + \\sum_{j=1}^p \\lambda_j \\nabla h_j(\\mathbf{x}^*) = 0',
        description: 'Joseph-Louis Lagrange unified mechanics and constrained calculus via virtual work.'
      }
    ],
    theorems: [
      {
        name: 'Historical Milestones of Optimization',
        statement: '1636: Fermat (Adequality) • 1669: Newton (Root iteration) • 1744: Euler-Lagrange (Variational calculus) • 1847: Cauchy (Steepest Descent) • 1939/1951: Karush-Kuhn-Tucker (Nonlinear duality) • 1947: George Dantzig (Simplex Algorithm for LP) • 1959: Davidon-Fletcher-Powell (Quasi-Newton) • 1984: Narendra Karmarkar (Polynomial Interior-Point LP) • 2014: Kingma & Ba (Adam optimizer for deep learning).',
        implication: 'Demonstrates the progression from analytical continuous conditions to modern large-scale numerical iterations.'
      }
    ],
    keyPrinciples: [
      {
        heading: 'Classical Era (1600–1900)',
        content: 'Focused on exact analytical solutions using calculus of variations and differential equations for mechanics and optics.'
      },
      {
        heading: 'Operational Research Era (1940–1980)',
        content: 'Spurred by WWII logistics: linear programming (Simplex), duality theory, dynamic programming (Bellman), and non-linear KKT conditions.'
      },
      {
        heading: 'Interior-Point & Machine Learning Era (1980–Present)',
        content: 'Polynomial-time interior point methods, semidefinite programming, convex duality, and stochastic adaptive gradient algorithms (Adam, RMSProp).'
      }
    ],
    pitfallsAndInsights: [
      'Assuming analytical closed-form solutions exist for general high-dimensional nonlinear problems (numerical algorithms are mandatory).',
      'Overlooking William Karush’s 1939 Master’s thesis, which discovered the KKT conditions 12 years before Kuhn & Tucker’s 1951 paper.'
    ]
  },

  'ch4-flowchart': {
    chapterId: 'ch4-flowchart',
    title: 'Engineering Modeling Flowchart & Lifecycle',
    summary: 'A disciplined 8-step engineering lifecycle translates physical reality into a solved, validated, and deployed optimal design.',
    prerequisites: ['System Engineering', 'Mathematical Abstraction'],
    governingEquations: [
      {
        title: 'Sensitivity Derivative / Dual Price',
        latex: '\\frac{\\partial f^*}{\\partial b_i} = -\\mu_i^*',
        description: 'Quantifies how much the optimal objective value improves when constraint boundary bᵢ is relaxed.'
      }
    ],
    theorems: [
      {
        name: 'Systematic 8-Step Optimization Lifecycle',
        statement: 'Step 1: Physical Problem Definition -> Step 2: Mathematical Abstraction -> Step 3: Problem Taxonomy Classification -> Step 4: Mathematical Formulation -> Step 5: Solver & Algorithm Selection -> Step 6: Numerical Execution -> Step 7: Post-Optimality Sensitivity & Verification -> Step 8: Physical Engineering Deployment.',
        implication: 'Ensures model fidelity and avoids solving the wrong problem.'
      }
    ],
    keyPrinciples: [
      {
        heading: 'Model Fidelity vs Computational Cost',
        content: 'High-fidelity PDE simulations (Navier-Stokes, FEA) require adjoint gradient formulations or surrogate kriging models.'
      },
      {
        heading: 'Post-Optimality Verification',
        content: 'Verify that the numerical solution satisfies all physical safety margins and evaluate condition numbers and shadow prices.'
      }
    ],
    pitfallsAndInsights: [
      'Jumping directly into code/solvers before verifying whether the mathematical model is convex or ill-conditioned.',
      'Treating numerical results as gospel without testing robustness against parameter variations.'
    ]
  },

  'ch5-requirements': {
    chapterId: 'ch5-requirements',
    title: 'Algorithm Performance Requirements & Complexity',
    summary: 'Evaluating optimization algorithms requires precise mathematical metrics: asymptotic convergence order, error constant, numerical stability, condition number sensitivity, and time/space complexity.',
    prerequisites: ['Limit Analysis', 'Big-O Notation', 'Numerical Precision (IEEE 754)'],
    governingEquations: [
      {
        title: 'Order of Convergence Definition',
        latex: '\\lim_{k \\to \\infty} \\frac{\\|\\mathbf{x}_{k+1} - \\mathbf{x}^*\\|}{\\|\\mathbf{x}_k - \\mathbf{x}^*\\|^p} = C',
        description: 'p = 1 is Linear (rate C < 1), 1 < p < 2 is Superlinear, p = 2 is Quadratic convergence.'
      },
      {
        title: 'Condition Number of Hessian',
        latex: '\\kappa(\\mathbf{H}) = \\frac{\\lambda_{\\max}(\\mathbf{H})}{\\lambda_{\\min}(\\mathbf{H})}',
        description: 'Measures eccentricity of level curves. High κ(H) causes severe gradient descent zigzagging.'
      }
    ],
    theorems: [
      {
        name: 'Convergence Order Hierarchy',
        statement: '• Linear (p=1): Gradient Descent (error reduces by factor C each step). • Superlinear (1<p<2): Quasi-Newton BFGS/DFP. • Quadratic (p=2): Pure Newton-Raphson (number of accurate decimal digits doubles every single iteration).',
        implication: 'Select the algorithm with the right trade-off between per-iteration computational cost and total iterations required.'
      }
    ],
    keyPrinciples: [
      {
        heading: '1. Accuracy & Termination Criteria',
        content: 'Stop when ||∇f(x_k)|| < ε_g, |f(x_{k+1}) - f(x_k)| < ε_f, and ||x_{k+1} - x_k|| < ε_x.'
      },
      {
        heading: '2. Numerical Stability',
        content: 'Resilience against round-off errors and catastrophic floating-point cancellation in finite-difference gradient approximations.'
      },
      {
        heading: '3. Computational Complexity',
        content: 'Gradient descent: O(n) per step. Quasi-Newton: O(n²) per step. Newton-Raphson: O(n³) to invert the full n×n Hessian.'
      }
    ],
    pitfallsAndInsights: [
      'Using pure Newton’s method when n > 100,000 (Hessian storage takes O(n²) memory, exceeding RAM). Use L-BFGS instead.',
      'Relying solely on step difference ||x_{k+1} - x_k|| < ε as stopping criterion (can trigger prematurely in slow-crawling flat regions).'
    ]
  },

  'ch6-types': {
    chapterId: 'ch6-types',
    title: 'Taxonomy of Optimization Problems',
    summary: 'A comprehensive classification hierarchy separates problems by variable domain (continuous vs discrete), objective/constraint linearity (LP, QP, NLP), convexity, and deterministic vs stochastic nature.',
    prerequisites: ['Linear Algebra', 'Polynomial Calculus'],
    governingEquations: [
      {
        title: 'Linear Programming (LP)',
        latex: '\\min \\mathbf{c}^T \\mathbf{x} \\quad \\text{s.t.} \\quad \\mathbf{A}\\mathbf{x} \\le \\mathbf{b}, \\quad \\mathbf{x} \\ge \\mathbf{0}',
        description: 'Both objective and all constraints are strictly affine/linear. Solved via Simplex or Primal-Dual Interior-Point.'
      },
      {
        title: 'Quadratic Programming (QP)',
        latex: '\\min \\frac{1}{2} \\mathbf{x}^T \\mathbf{Q} \\mathbf{x} + \\mathbf{c}^T \\mathbf{x} \\quad \\text{s.t.} \\quad \\mathbf{A}\\mathbf{x} \\le \\mathbf{b}, \\quad \\mathbf{E}\\mathbf{x} = \\mathbf{d}',
        description: 'Quadratic objective with linear constraints. Convex if Q is positive semidefinite.'
      }
    ],
    theorems: [
      {
        name: 'The Fundamental Dichotomy of Optimization',
        statement: 'The great watershed in optimization isn’t between linearity and nonlinearity, but between CONVEXITY and NON-CONVEXITY (R. Tyrrell Rockafellar, 1993).',
        implication: 'Convex problems are computationally tractable in polynomial time; non-convex problems are generally NP-hard.'
      }
    ],
    keyPrinciples: [
      {
        heading: 'Continuous vs Discrete/Integer (IP/MIP)',
        content: 'Integer programming involves combinatorial search over discrete lattices; solved via Branch-and-Bound and cutting planes.'
      },
      {
        heading: 'Multi-Objective & Pareto Optimality',
        content: 'When optimizing conflicting objectives [f₁(x), f₂(x)], solutions form a Pareto frontier where no objective can improve without degrading another.'
      }
    ],
    pitfallsAndInsights: [
      'Treating an integer programming problem as continuous and simply rounding the solution (often yields an infeasible or suboptimal point).',
      'Using a generic global solver for a structure that is naturally a Linear Program or Quadratic Program.'
    ]
  },

  'ch7-constraints': {
    chapterId: 'ch7-constraints',
    title: 'Constraints & Feasible Regions',
    summary: 'Constraints define the geometric boundary of allowable solutions. Understanding equality manifolds, inequality half-spaces, and boundary tangency is essential for constrained optimization.',
    prerequisites: ['Vector Calculus', 'Hyperplanes', 'Convex Sets'],
    governingEquations: [
      {
        title: 'Hyperplane Equality Manifold',
        latex: 'h_j(\\mathbf{x}) = \\mathbf{a}_j^T \\mathbf{x} - b_j = 0 \\quad \\implies \\quad \\text{Codimension-1 Affine Subspace}',
        description: 'Equality constraints reduce the problem degrees of freedom by 1 per independent constraint.'
      },
      {
        title: 'Cone of Feasible Directions',
        latex: '\\mathcal{D}(\\mathbf{x}) = \\left\\{ \\mathbf{d} \\in \\mathbb{R}^n \\,\\middle|\\, \\nabla g_i(\\mathbf{x})^T \\mathbf{d} \\le 0 \\; (\\forall i \\in \\mathcal{A}(\\mathbf{x})), \\; \\nabla h_j(\\mathbf{x})^T \\mathbf{d} = 0 \\; (\\forall j) \\right\\}',
        description: 'The set of search vectors that point into or along the interior of the feasible set.'
      }
    ],
    theorems: [
      {
        name: 'Active Set Boundary Theorem',
        statement: 'At any point x ∈ ℱ, the active set 𝒜(x) = {i | gᵢ(x) = 0} dictates the local boundary curvature and search restrictions. Inactive constraints (gᵢ(x) < 0) have no local influence on directional derivatives.',
        implication: 'Constrained algorithms can treat inactive constraints as temporarily absent during local subproblem iterations.'
      }
    ],
    keyPrinciples: [
      {
        heading: 'Linear vs Nonlinear Boundaries',
        content: 'Linear constraints form polyhedral convex sets. Nonlinear constraints can create curved, disconnected, or non-convex feasible regions.'
      },
      {
        heading: 'Degrees of Freedom',
        content: 'If there are n decision variables and p independent equality constraints, the system moves on an (n - p)-dimensional manifold.'
      }
    ],
    pitfallsAndInsights: [
      'Assuming linear equality constraints always yield feasible points (if rank(A) < rank([A|b]), the constraint system has no solution).',
      'Ignoring non-convex feasible regions: even with a convex objective, a non-convex constraint can produce multiple disconnected local minima.'
    ]
  },

  'ch8-convex-functions': {
    chapterId: 'ch8-convex-functions',
    title: 'Convex Functions & Jensen’s Inequality',
    summary: 'Convex functions represent the most well-behaved class of mathematical functions. Every secant chord lies on or above the curve, first-order Taylor approximations act as global underestimators, and the Hessian is positive semidefinite everywhere.',
    prerequisites: ['Convex Sets', 'First and Second Derivatives', 'Taylor’s Theorem'],
    governingEquations: [
      {
        title: 'Algebraic Definition (Jensen’s Inequality for 2 Points)',
        latex: 'f(\\lambda \\mathbf{x}_1 + (1-\\lambda)\\mathbf{x}_2) \\le \\lambda f(\\mathbf{x}_1) + (1-\\lambda)f(\\mathbf{x}_2) \\quad \\forall \\lambda \\in [0, 1]',
        description: 'The value of the function at any blended point is bounded above by the linear combination of the endpoints.'
      },
      {
        title: 'First-Order Convexity Characterization (Global Tangent Underestimator)',
        latex: 'f(\\mathbf{y}) \\ge f(\\mathbf{x}) + \\nabla f(\\mathbf{x})^T (\\mathbf{y} - \\mathbf{x}) \\quad \\forall \\mathbf{x}, \\mathbf{y} \\in \\text{dom}(f)',
        description: 'The first-order Taylor tangent plane always lies on or beneath the graph of the function everywhere.'
      },
      {
        title: 'Second-Order Convexity Condition',
        latex: '\\nabla^2 f(\\mathbf{x}) \\succeq 0 \\quad (\\text{Hessian is Positive Semi-Definite everywhere})',
        description: 'All eigenvalues of the Hessian matrix are non-negative for all x in the domain.'
      }
    ],
    theorems: [
      {
        name: 'Jensen’s General Inequality',
        statement: 'If f is a convex function and X is a random variable, then the expected value of the function is greater than or equal to the function of the expected value.',
        latex: '\\mathbb{E}[f(X)] \\ge f(\\mathbb{E}[X])',
        implication: 'Fundamental cornerstone in information theory, probability bounds, and machine learning variational inference (ELBO).'
      }
    ],
    keyPrinciples: [
      {
        heading: 'Strict Convexity',
        content: 'If the inequality is strict for all λ ∈ (0,1) and x₁ ≠ x₂, the function has at most one unique global minimizer.'
      },
      {
        heading: 'Epigraph Definition',
        content: 'A function f is convex if and only if its epigraph epi(f) = {(x, t) | f(x) ≤ t} is a convex set in ℝⁿ⁺¹.'
      }
    ],
    pitfallsAndInsights: [
      'Assuming that a sum of non-convex functions is always non-convex (it can be convex).',
      'Confusing a convex function with a convex set: a function graph is not a convex set, but its sublevel sets and epigraph are.'
    ]
  },

  'ch9-convex-problems': {
    chapterId: 'ch9-convex-problems',
    title: 'Convex Optimization Problems',
    summary: 'A convex optimization problem minimizes a convex objective function over a convex feasible set. The central guarantee of convex optimization is that any local minimum is unconditionally the global minimum.',
    prerequisites: ['Convex Functions', 'Convex Feasible Sets', 'First-Order Optimality'],
    governingEquations: [
      {
        title: 'Standard Form Convex Program',
        latex: '\\min f_0(\\mathbf{x}) \\quad \\text{s.t.} \\quad f_i(\\mathbf{x}) \\le 0 \\; (i=1,\\dots,m), \\quad \\mathbf{a}_j^T \\mathbf{x} = b_j \\; (j=1,\\dots,p)',
        description: 'Objective f₀ and inequality constraints fᵢ are convex; equality constraints must be strictly affine.'
      },
      {
        title: 'First-Order Optimality Condition for Convex Sets',
        latex: '\\nabla f(\\mathbf{x}^*)^T (\\mathbf{y} - \\mathbf{x}^*) \\ge 0 \\quad \\forall \\mathbf{y} \\in \\mathcal{C}',
        description: 'The negative gradient makes an obtuse angle with all feasible directions from x*.'
      }
    ],
    theorems: [
      {
        name: 'Fundamental Theorem of Convex Optimization',
        statement: 'Let f: C → ℝ be a convex function defined on a convex set C. If x* is a local minimum of f over C, then x* is a global minimum of f over C. Furthermore, if f is strictly convex, the global minimum is unique.',
        implication: 'Eliminates the danger of getting trapped in suboptimal local minima.'
      }
    ],
    keyPrinciples: [
      {
        heading: 'Affine Equality Requirement',
        content: 'Nonlinear equality constraints h(x) = 0 almost always make the feasible set non-convex, destroying global guarantees.'
      },
      {
        heading: 'Convex Sublevel Sets',
        content: 'For any α ∈ ℝ, the sublevel set S_α = {x ∈ C | f(x) ≤ α} is guaranteed to be a convex set.'
      }
    ],
    pitfallsAndInsights: [
      'Attempting to formulate nonlinear equality constraints into a convex solver (they must be relaxed or linearized).',
      'Believing that every convex problem has a solution: unconstrained f(x) = eˣ has infimum 0, but no minimum in ℝ.'
    ]
  },

  'ch10-matrix-lab': {
    chapterId: 'ch10-matrix-lab',
    title: 'Matrix Form & Linear Systems in Optimization',
    summary: 'Linear algebra is the computational engine of optimization. Quadratic forms, symmetric positive definite matrices, spectral decompositions, and condition numbers govern solver behavior and energy landscapes.',
    prerequisites: ['Matrix Multiplication', 'Eigenvalues & Eigenvectors', 'Linear Systems Ax = b'],
    governingEquations: [
      {
        title: 'Quadratic Form Formulation',
        latex: 'f(\\mathbf{x}) = \\frac{1}{2} \\mathbf{x}^T \\mathbf{A} \\mathbf{x} - \\mathbf{b}^T \\mathbf{x} + c \\quad (\\mathbf{A} = \\mathbf{A}^T)',
        description: 'Canonical quadratic energy model. The gradient is ∇f(x) = Ax - b; the Hessian is ∇²f(x) = A.'
      },
      {
        title: 'Spectral Decomposition & Energy Ellipsoids',
        latex: '\\mathbf{A} = \\mathbf{Q} \\mathbf{\\Lambda} \\mathbf{Q}^T = \\sum_{i=1}^n \\lambda_i \\mathbf{q}_i \\mathbf{q}_i^T',
        description: 'Principal axes of level-set ellipsoids align with eigenvectors qᵢ; axis lengths are proportional to 1/√λᵢ.'
      }
    ],
    theorems: [
      {
        name: 'Quadratic Minimization & Linear System Equivalence',
        statement: 'Let A be an n×n symmetric positive definite matrix. The unique global minimizer of f(x) = ½ xᵀAx - bᵀx is the exact solution to the linear system Ax = b.',
        latex: '\\nabla f(\\mathbf{x}^*) = \\mathbf{A}\\mathbf{x}^* - \\mathbf{b} = 0 \\implies \\mathbf{x}^* = \\mathbf{A}^{-1}\\mathbf{b}',
        implication: 'Connects iterative optimization algorithms (Conjugate Gradient, Steepest Descent) directly to linear equation solvers.'
      }
    ],
    keyPrinciples: [
      {
        heading: 'Positive Definiteness Test',
        content: 'Matrix A is Positive Definite (A ≻ 0) if xᵀAx > 0 for all x ≠ 0, which is true if and only if all eigenvalues λᵢ > 0.'
      },
      {
        heading: 'Condition Number Geometry',
        content: 'κ(A) = λ_max / λ_min. When κ = 1, contours are circular; when κ ≫ 1, contours are elongated narrow ravines.'
      }
    ],
    pitfallsAndInsights: [
      'Assuming an asymmetric matrix A can be used directly in quadratic forms: xᵀAx = xᵀ(½(A + Aᵀ))x, so only the symmetric part matters.',
      'Explicitly inverting matrix A⁻¹ in software instead of using Cholesky or LU factorizations (A⁻¹ is computationally slow and numerically unstable).'
    ]
  },

  'ch11-hessian': {
    chapterId: 'ch11-hessian',
    title: 'Hessian Matrix Method & Critical Point Classification',
    summary: 'The Hessian matrix of second-order partial derivatives encapsulates the multivariable curvature of a function. Eigenvalue analysis of the Hessian classifies critical points into local minima, maxima, saddle points, and valleys.',
    prerequisites: ['Partial Derivatives', 'Schwarz’s Theorem on Mixed Partials', 'Eigenvalue Theory'],
    governingEquations: [
      {
        title: 'Hessian Matrix Definition',
        latex: '\\mathbf{H}(\\mathbf{x}) = \\nabla^2 f(\\mathbf{x}) = \\begin{bmatrix} \\frac{\\partial^2 f}{\\partial x_1^2} & \\frac{\\partial^2 f}{\\partial x_1 \\partial x_2} & \\dots & \\frac{\\partial^2 f}{\\partial x_1 \\partial x_n} \\\\ \\frac{\\partial^2 f}{\\partial x_2 \\partial x_1} & \\frac{\\partial^2 f}{\\partial x_2^2} & \\dots & \\frac{\\partial^2 f}{\\partial x_2 \\partial x_n} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ \\frac{\\partial^2 f}{\\partial x_n \\partial x_1} & \\frac{\\partial^2 f}{\\partial x_n \\partial x_2} & \\dots & \\frac{\\partial^2 f}{\\partial x_n^2} \\end{bmatrix}',
        description: 'For C² functions, H(x) is symmetric due to Clairaut/Schwarz theorem: ∂²f/∂xᵢ∂xⱼ = ∂²f/∂xⱼ∂xᵢ.'
      },
      {
        title: '2D Hessian Determinant and Trace',
        latex: '\\det(\\mathbf{H}) = f_{xx} f_{yy} - f_{xy}^2 = \\lambda_1 \\lambda_2, \\quad \\text{tr}(\\mathbf{H}) = f_{xx} + f_{yy} = \\lambda_1 + \\lambda_2',
        description: 'In 2D, determinant and trace instantly reveal eigenvalue signs without solving characteristic polynomials.'
      }
    ],
    theorems: [
      {
        name: 'Critical Point Classification Theorem',
        statement: 'Let ∇f(x₀) = 0. • If H(x₀) ≻ 0 (all λᵢ > 0), x₀ is a strict Local Minimum. • If H(x₀) ≺ 0 (all λᵢ < 0), x₀ is a strict Local Maximum. • If H(x₀) has both positive and negative eigenvalues, x₀ is a Saddle Point. • If det(H(x₀)) = 0 with semi-definite eigenvalues, the test is inconclusive (higher-order derivatives required).',
        implication: 'Provides the definitive second-order test for multidimensional stationary points.'
      }
    ],
    keyPrinciples: [
      {
        heading: 'Curvature in Direction d',
        content: 'The second directional derivative in direction d is dᵀ H(x) d / ||d||². If positive, the surface curves upward.'
      },
      {
        heading: 'Saddle Points in High Dimensions',
        content: 'In deep learning neural loss landscapes (n > 10⁶), almost all critical points with ∇f = 0 are saddle points, not local minima.'
      }
    ],
    pitfallsAndInsights: [
      'Assuming det(H) > 0 guarantees a local minimum (det(H) > 0 can also mean local maximum if both eigenvalues are negative).',
      'Forgetting that semi-definite cases (det(H) = 0) can be monkey saddles or flat valleys (e.g., f(x,y) = x⁴ + y⁴ vs f(x,y) = x³ + y³).'
    ]
  },

  'ch12-unconstrained': {
    chapterId: 'ch12-unconstrained',
    title: 'Unconstrained Optimization Sandbox & Framework',
    summary: 'Unconstrained multivariable optimization forms the basis for iterative search algorithms. The general framework updates positions iteratively using search directions and step sizes.',
    prerequisites: ['Vector Calculus', 'Taylor Approximations', 'Directional Derivatives'],
    governingEquations: [
      {
        title: 'General Iterative Search Equation',
        latex: '\\mathbf{x}_{k+1} = \\mathbf{x}_k + \\alpha_k \\mathbf{d}_k',
        description: 'x_k is current position, d_k is descent search direction vector, α_k > 0 is step length (learning rate).'
      },
      {
        title: 'Descent Direction Requirement',
        latex: '\\nabla f(\\mathbf{x}_k)^T \\mathbf{d}_k < 0 \\implies \\left. \\frac{d}{d\\alpha} f(\\mathbf{x}_k + \\alpha \\mathbf{d}_k) \\right|_{\\alpha=0} < 0',
        description: 'The search direction must make an angle greater than 90° with the gradient vector to guarantee local decrease.'
      },
      {
        title: 'Armijo Sufficient Decrease Condition (Wolfe Rule 1)',
        latex: 'f(\\mathbf{x}_k + \\alpha_k \\mathbf{d}_k) \\le f(\\mathbf{x}_k) + c_1 \\alpha_k \\nabla f(\\mathbf{x}_k)^T \\mathbf{d}_k \\quad (c_1 \\in (0, 1))',
        description: 'Ensures the reduction in f is proportional to both the step length and directional derivative.'
      }
    ],
    theorems: [
      {
        name: 'Zoutendijk’s Theorem',
        statement: 'Under mild Lipschitz continuity conditions on ∇f, any line search method satisfying the Wolfe conditions guarantees that the angle between search direction d_k and negative gradient -∇f_k converges: ∑ cos²(θ_k) ||∇f_k||² < ∞.',
        implication: 'Guarantees global convergence to a stationary point (∇f → 0) provided directions do not become orthogonal to the gradient.'
      }
    ],
    keyPrinciples: [
      {
        heading: 'Exact vs Inexact Line Search',
        content: 'Exact line search finds argmin_α f(x + αd), which is expensive. Inexact backtracking line search (Armijo-Wolfe) is far faster.'
      },
      {
        heading: 'Step Size Pathology',
        content: 'Too large α causes divergence and overshoot; too small α causes stagnation and excessively slow progress.'
      }
    ],
    pitfallsAndInsights: [
      'Using a fixed constant step size α across functions with varying Lipschitz constants (causes divergence or stagnation).',
      'Choosing a search direction where ∇fᵀ d ≥ 0 (causes the function value to increase instead of decrease).'
    ]
  },

  'ch13-principal-minors': {
    chapterId: 'ch13-principal-minors',
    title: 'Principal Minor Diagonal Test (Sylvester’s Criterion)',
    summary: 'Sylvester’s Criterion provides an algebraic method to test for matrix definiteness by calculating leading principal minors of the symmetric Hessian matrix without computing eigenvalues.',
    prerequisites: ['Determinants', 'Submatrices', 'Quadratic Forms'],
    governingEquations: [
      {
        title: 'Leading Principal Minor Definition',
        latex: '\\Delta_k = \\det(\\mathbf{A}_{1..k, 1..k}) = \\det \\begin{bmatrix} a_{11} & \\dots & a_{1k} \\\\ \\vdots & \\ddots & \\vdots \\\\ a_{k1} & \\dots & a_{kk} \\end{bmatrix} \\quad (k = 1, 2, \\dots, n)',
        description: 'Determinant of the k×k top-left submatrix formed by taking the first k rows and columns.'
      },
      {
        title: 'Sylvester’s Positive Definite Criterion',
        latex: '\\mathbf{A} \\succ 0 \\iff \\Delta_1 > 0, \\; \\Delta_2 > 0, \\; \\Delta_3 > 0, \\; \\dots, \\; \\Delta_n > 0',
        description: 'Matrix A is strictly Positive Definite if and only if EVERY leading principal minor is strictly positive.'
      },
      {
        title: 'Sylvester’s Negative Definite Criterion',
        latex: '\\mathbf{A} \\prec 0 \\iff (-1)^k \\Delta_k > 0 \\iff \\Delta_1 < 0, \\; \\Delta_2 > 0, \\; \\Delta_3 < 0, \\; \\Delta_4 > 0, \\dots',
        description: 'Matrix A is Negative Definite if leading principal minors strictly alternate in sign starting negative.'
      }
    ],
    theorems: [
      {
        name: 'Sylvester’s Definiteness Theorem',
        statement: 'For any symmetric matrix A: 1. A is positive definite iff all leading principal minors Δ_k > 0. 2. A is negative definite iff (-1)ᵏ Δ_k > 0. 3. If some Δ_k violate both patterns with non-zero determinants, A is Indefinite (Saddle Point).',
        implication: 'Enables quick algebraic verification of second-order conditions in hand calculations and symbolic optimization engines.'
      }
    ],
    keyPrinciples: [
      {
        heading: 'Positive Semi-Definite Warning',
        content: 'For semi-definiteness (A ⪰ 0), checking only LEADING principal minors is insufficient. ALL principal minors (including non-leading submatrices) must be ≥ 0.'
      },
      {
        heading: '3×3 Hessian Sylvester Checklist',
        content: 'Δ₁ = a₁₁, Δ₂ = a₁₁a₂₂ - a₁₂², Δ₃ = det(A). If Δ₁>0, Δ₂>0, Δ₃>0 → Local Minimum.'
      }
    ],
    pitfallsAndInsights: [
      'Applying Sylvester’s test to an asymmetric matrix (must symmetrize the matrix first).',
      'Concluding A ⪰ 0 merely because Δ₁ ≥ 0, Δ₂ ≥ 0, Δ₃ = 0 (counterexample: [[0, 0], [0, -1]] has Δ₁=0, Δ₂=0, but is negative semi-definite).'
    ]
  },

  'ch14-newton-raphson': {
    chapterId: 'ch14-newton-raphson',
    title: 'Newton-Raphson Method & Quadratic Models',
    summary: 'The Newton-Raphson method fits a local second-order osculating paraboloid to the objective function at each iteration and jumps directly to its stationary point. Near a strict local minimum, it converges quadratically.',
    prerequisites: ['Multivariable Taylor Series', 'Matrix Inversion', 'Quadratic Forms'],
    governingEquations: [
      {
        title: '1D Newton-Raphson Optimization Step',
        latex: 'x_{k+1} = x_k - \\frac{f\'(x_k)}{f\'\'(x_k)}',
        description: 'Uses curvature f\'\'(x) to scale the descent step. Finds root of the derivative f\'(x) = 0.'
      },
      {
        title: 'Multivariable Newton Step',
        latex: '\\mathbf{x}_{k+1} = \\mathbf{x}_k - \\mathbf{H}(\\mathbf{x}_k)^{-1} \\nabla f(\\mathbf{x}_k) \\iff \\mathbf{H}(\\mathbf{x}_k) \\mathbf{d}_k = -\\nabla f(\\mathbf{x}_k)',
        description: 'Solves the linear system H d = -g to obtain the Newton step vector d_k.'
      },
      {
        title: 'Quadratic Local Convergence Rate',
        latex: '\\|\\mathbf{x}_{k+1} - \\mathbf{x}^*\\| \\le M \\|\\mathbf{x}_k - \\mathbf{x}^*\\|^2 \\quad \\text{as} \\quad k \\to \\infty',
        description: 'The error is squared each step; accurate decimal precision doubles with every single iteration near x*.'
      }
    ],
    theorems: [
      {
        name: 'Newton-Kantorovich Convergence Theorem',
        statement: 'If ∇²f(x₀) is invertible, ||H(x₀)⁻¹ ∇f(x₀)|| ≤ η, and the Hessian is Lipschitz continuous with constant L such that h = L η ||H(x₀)⁻¹|| ≤ ½, then Newton’s method converges quadratically to a unique zero of ∇f.',
        implication: 'Establishes deterministic conditions for guaranteed quadratic convergence without knowing the exact minimum beforehand.'
      }
    ],
    keyPrinciples: [
      {
        heading: 'Scale Invariance',
        content: 'Newton’s method is invariant to affine coordinate transformations (unlike gradient descent, which is heavily distorted by coordinate stretching).'
      },
      {
        heading: 'Damped & Regularized Newton (Levenberg-Marquardt)',
        content: 'When H(x) is not positive definite, replace H with (H + μI) where μ > 0 to guarantee a descent direction.'
      }
    ],
    pitfallsAndInsights: [
      'Starting far from the minimum where H(x) is negative definite: pure Newton steps jump toward local MAXIMA or saddle points.',
      'High computational cost: computing and inverting an n×n Hessian takes O(n³) operations per iteration.'
    ]
  },

  'ch15-nonlinear': {
    chapterId: 'ch15-nonlinear',
    title: 'Nonlinear Programming (NLP) & Complex Landscapes',
    summary: 'Nonlinear programming deals with non-convex, curved, and ill-conditioned objective functions and constraints. Classic benchmark testbeds highlight algorithmic vulnerabilities.',
    prerequisites: ['Non-Convex Optimization', 'Curvature Torsion', 'Benchmark Testing'],
    governingEquations: [
      {
        title: 'Rosenbrock Banana Function (Ill-Conditioned Valley)',
        latex: 'f(x, y) = (1 - x)^2 + 100(y - x^2)^2 \\quad \\implies \\quad \\text{Global Minimum at } (1, 1), \\; f^* = 0',
        description: 'Curved parabolic valley where gradient vector is almost orthogonal to the valley bottom direction.'
      },
      {
        title: 'Himmelblau Multi-Modal Function (4 Global Minima)',
        latex: 'f(x, y) = (x^2 + y - 11)^2 + (x + y^2 - 7)^2',
        description: 'Has 4 identical global minima at (3,2), (-2.805, 3.131), (-3.779, -3.283), and (3.584, -1.848).'
      }
    ],
    theorems: [
      {
        name: 'Curvature-Gradient Angle Pathology in Valleys',
        statement: 'In deep curved ravines like Rosenbrock, the gradient direction points almost entirely into the opposite steep wall rather than along the floor of the valley, causing gradient descent to take millions of tiny zigzag steps.',
        implication: 'Demands second-order or momentum-based methods to accelerate progress along curved ridges.'
      }
    ],
    keyPrinciples: [
      {
        heading: 'Anisotropic Valleys',
        content: 'Curvatures along principal directions differ by orders of magnitude (condition number κ > 1000).'
      },
      {
        heading: 'Multi-Modality',
        content: 'Nonlinear functions frequently contain multiple local minima and saddle points separated by high energy barriers.'
      }
    ],
    pitfallsAndInsights: [
      'Relying on gradient descent alone for Rosenbrock-type ravines without adaptive learning rates or momentum.',
      'Assuming that reaching ∇f ≈ 0 means finding the global minimum in non-convex landscapes.'
    ]
  },

  'ch16-local-global': {
    chapterId: 'ch16-local-global',
    title: 'Local vs Global Optima & Basins of Attraction',
    summary: 'In non-convex landscapes, the search space is divided into distinct basins of attraction. Gradient-based methods converge to the local minimum of the basin containing the initial point, requiring global meta-heuristics for multi-modal landscapes.',
    prerequisites: ['Dynamical Systems', 'Basins of Attraction', 'Stochastic Search'],
    governingEquations: [
      {
        title: 'Basin of Attraction Definition',
        latex: '\\mathcal{B}(\\mathbf{x}^*_i) = \\left\\{ \\mathbf{x}_0 \\in \\mathbb{R}^n \\,\\middle|\\, \\lim_{k \\to \\infty} \\mathcal{A}^k(\\mathbf{x}_0) = \\mathbf{x}^*_i \\right\\}',
        description: 'The set of all starting points x₀ that converge to local minimum x*ᵢ under algorithm 𝒜.'
      },
      {
        title: 'Rastrigin Highly Multi-Modal Landscape',
        latex: 'f(\\mathbf{x}) = 10n + \\sum_{i=1}^n \\left( x_i^2 - 10\\cos(2\\pi x_i) \\right)',
        description: 'Features a global parabolic trend modulated by a high-frequency grid of sinusoidal local traps.'
      }
    ],
    theorems: [
      {
        name: 'No Free Lunch Theorem (Wolpert & Macready, 1997)',
        statement: 'When averaged across all possible objective function distributions, all optimization algorithms perform identically. Superior performance on one class of problems is paid for by inferior performance on another.',
        implication: 'Domain knowledge and problem structure (convexity, smoothness, sparsity) must be leveraged to choose optimal algorithms.'
      }
    ],
    keyPrinciples: [
      {
        heading: 'Multi-Start Local Search',
        content: 'Sample starting points uniformly across the domain Ω, launch gradient descent from each, and select the minimum result.'
      },
      {
        heading: 'Meta-Heuristic Global Solvers',
        content: 'Simulated Annealing (Metropolis temperature jumps), Genetic Algorithms, Particle Swarms, and Basin Hopping.'
      }
    ],
    pitfallsAndInsights: [
      'Applying gradient descent with a single arbitrary initial guess to a highly multi-modal function (e.g. Ackley, Rastrigin).',
      'Over-sampling high-dimensional spaces: grid search in ℝ¹⁰⁰ requires 10¹⁰⁰ points (Curse of Dimensionality).'
    ]
  },

  'ch17-calculus-results': {
    chapterId: 'ch17-calculus-results',
    title: 'Results from Calculus & Optimality Conditions',
    summary: 'The rigorous calculus foundation for unconstrained optimization establishes First-Order Necessary Conditions (FONC), Second-Order Necessary Conditions (SONC), and Second-Order Sufficient Conditions (SOSC).',
    prerequisites: ['Differential Calculus', 'Taylor’s Formula with Remainder', 'Definiteness'],
    governingEquations: [
      {
        title: 'First-Order Necessary Condition (FONC / Fermat’s Rule)',
        latex: '\\mathbf{x}^* \\text{ is a local extremum of } C^1 f \\implies \\nabla f(\\mathbf{x}^*) = \\mathbf{0}',
        description: 'All first partial derivatives must vanish simultaneously at a local minimum.'
      },
      {
        title: 'Second-Order Necessary Condition (SONC)',
        latex: '\\mathbf{x}^* \\text{ is a local minimum of } C^2 f \\implies \\nabla f(\\mathbf{x}^*) = \\mathbf{0} \\quad \\text{and} \\quad \\nabla^2 f(\\mathbf{x}^*) \\succeq 0',
        description: 'The Hessian matrix must be positive semi-definite (all eigenvalues λᵢ ≥ 0).'
      },
      {
        title: 'Second-Order Sufficient Condition (SOSC)',
        latex: '\\nabla f(\\mathbf{x}^*) = \\mathbf{0} \\quad \\text{and} \\quad \\nabla^2 f(\\mathbf{x}^*) \\succ 0 \\implies \\mathbf{x}^* \\text{ is a strict local minimum}',
        description: 'Stationarity combined with strict positive definiteness guarantees a local minimum.'
      }
    ],
    theorems: [
      {
        name: 'Taylor Remainder Optimality Theorem',
        statement: 'For a C² function, f(x* + d) = f(x*) + ∇f(x*)ᵀ d + ½ dᵀ ∇²f(x* + θd) d. If ∇f(x*) = 0 and ∇²f(x*) ≻ 0, then by continuity ∇²f(x* + θd) ≻ 0 for all ||d|| < δ, ensuring f(x* + d) > f(x*).',
        implication: 'Proves conclusively that SOSC guarantees a strict local minimum.'
      }
    ],
    keyPrinciples: [
      {
        heading: 'Necessary vs Sufficient',
        content: 'FONC and SONC must hold at a minimum, but do not guarantee one (e.g. f(x)=x³ has f\'(0)=0, f\'\'(0)=0 but is not a minimum). SOSC guarantees a minimum.'
      },
      {
        heading: 'Boundary Extrema Exception',
        content: 'If the minimum lies on the boundary of a domain, ∇f(x*) does NOT have to be zero (governed instead by KKT conditions).'
      }
    ],
    pitfallsAndInsights: [
      'Assuming that ∇f(x) = 0 is sufficient for a minimum without testing the Hessian.',
      'Treating SONC (∇²f ≥ 0) as sufficient (e.g. f(x) = x³ has f\'\'(0) = 0 ≥ 0, yet x=0 is an inflection point).'
    ]
  },

  'ch18-three-point': {
    chapterId: 'ch18-three-point',
    title: 'Three-Point Interval Search (1D Elimination)',
    summary: 'For 1D unimodal functions where derivatives are unavailable or expensive, three-point interval elimination systematically evaluates test points to discard non-optimal sub-intervals.',
    prerequisites: ['1D Unimodality', 'Interval Bracketing'],
    governingEquations: [
      {
        title: '1D Unimodality Condition',
        latex: 'x_1 < x_2 < x^* \\implies f(x_1) > f(x_2) > f(x^*), \\quad x^* < x_1 < x_2 \\implies f(x^*) < f(x_1) < f(x_2)',
        description: 'The function monotonically decreases to the unique minimum x* and monotonically increases thereafter.'
      },
      {
        title: 'Three-Point Elimination Rule',
        latex: '\\text{For } a < x_1 < x_2 < b: \\quad \\begin{cases} f(x_1) < f(x_2) \\implies x^* \\in [a, x_2], & \\text{discard } (x_2, b] \\\\ f(x_1) > f(x_2) \\implies x^* \\in [x_1, b], & \\text{discard } [a, x_1) \\\\ f(x_1) = f(x_2) \\implies x^* \\in [x_1, x_2], & \\text{discard both ends} \\end{cases}',
        description: 'Elimination rule that shrinks the search bracket at every iteration.'
      }
    ],
    theorems: [
      {
        name: 'Interval Elimination Guarantee',
        statement: 'If f(x) is strictly unimodal on [a, b], the three-point elimination algorithm is guaranteed to preserve the true global minimizer x* in the retained sub-interval after every iteration.',
        implication: 'Ensures absolute convergence without computing derivatives.'
      }
    ],
    keyPrinciples: [
      {
        heading: 'Equal Interval vs Golden Ratio Placement',
        content: 'Equally spaced points reduce interval length by 1/2 or 2/3 per cycle, but require recomputing 2 new function values each iteration.'
      },
      {
        heading: 'Bracketing Phase',
        content: 'Before shrinking an interval, an initial bracket [a, b] containing a local minimum must be established (e.g. by expanding step sizes).'
      }
    ],
    pitfallsAndInsights: [
      'Applying three-point elimination to multi-modal functions (can eliminate the sub-interval containing the global minimum).',
      'Using points placed too close together in noisy functions, where floating-point noise corrupts the comparison f(x₁) < f(x₂).'
    ]
  },

  'ch19-fibonacci': {
    chapterId: 'ch19-fibonacci',
    title: 'Fibonacci Search Method',
    summary: 'The Fibonacci search method (Kiefer, 1953) is the mathematically optimal zero-order 1D search technique for a fixed budget of N function evaluations, maximizing the interval reduction ratio.',
    prerequisites: ['Fibonacci Sequence', '1D Unimodal Search', 'Recurrence Relations'],
    governingEquations: [
      {
        title: 'Fibonacci Recurrence Relation',
        latex: 'F_0 = 1, \\quad F_1 = 1, \\quad F_k = F_{k-1} + F_{k-2} \\quad (k \\ge 2) \\implies [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, \\dots]',
        description: 'Governs optimal relative test point placement at each iteration.'
      },
      {
        title: 'Dynamic Test Point Locations',
        latex: 'L_k^* = \\frac{F_{N-k+1}}{F_{N+1}} L_0, \\quad x_1^{(k)} = a_k + \\frac{F_{N-k-1}}{F_{N-k+1}}(b_k - a_k), \\quad x_2^{(k)} = a_k + \\frac{F_{N-k}}{F_{N-k+1}}(b_k - a_k)',
        description: 'Locations of the two interior test points at iteration k of N.'
      },
      {
        title: 'Total Interval Reduction Ratio',
        latex: '\\frac{L_N}{L_0} = \\frac{1 + 2\\epsilon}{F_{N+1}} \\approx \\frac{1}{F_{N+1}}',
        description: 'The search bracket shrinks by a factor of exactly 1/F_{N+1} over N evaluations.'
      }
    ],
    theorems: [
      {
        name: 'Kiefer’s Optimality Theorem (1953)',
        statement: 'Among all zero-order (derivative-free) interval elimination algorithms with a predetermined budget of N function evaluations, the Fibonacci search method minimizes the maximum possible final interval of uncertainty.',
        implication: 'Proves Fibonacci search is mathematically the most sample-efficient 1D elimination strategy possible.'
      }
    ],
    keyPrinciples: [
      {
        heading: 'Point Reuse Property',
        content: 'At every step after the first, exactly ONE of the two test points from the previous step is retained, requiring only 1 new function evaluation per step.'
      },
      {
        heading: 'Final Step Perturbation ε',
        content: 'At step N-1, the two interior points coincide at the midpoint. A tiny perturbation ε > 0 separates them to make the final comparison.'
      }
    ],
    pitfallsAndInsights: [
      'The number of iterations N must be chosen in advance based on desired final accuracy ε_tol.',
      'If additional precision is needed later, the entire Fibonacci sequence must be restarted (Golden Section search solves this limitation).'
    ]
  },

  'ch20-golden-section': {
    chapterId: 'ch20-golden-section',
    title: 'Golden Section Search Method',
    summary: 'The Golden Section search is the asymptotic limit of Fibonacci search as N → ∞. It uses the golden ratio conjugate φ ≈ 0.618034 to achieve steady interval reduction with only one new function evaluation per iteration, without requiring a pre-set evaluation budget.',
    prerequisites: ['Golden Ratio', 'Fibonacci Asymptotics', '1D Unimodal Search'],
    governingEquations: [
      {
        title: 'The Golden Ratio Constant',
        latex: '\\phi = \\frac{\\sqrt{5} - 1}{2} \\approx 0.6180339887, \\quad 1 - \\phi = \\phi^2 \\approx 0.3819660113',
        description: 'Derived from the geometric self-similarity equation: 1 - φ = φ² ⟹ φ² + φ - 1 = 0.'
      },
      {
        title: 'Interior Point Placement Rules',
        latex: 'x_1 = a + (1 - \\phi)(b - a) = a + 0.382(b - a), \\quad x_2 = a + \\phi(b - a) = a + 0.618(b - a)',
        description: 'Symmetric interior placement ensures seamless point reuse across successive iterations.'
      },
      {
        title: 'Interval Contraction Factor',
        latex: 'L_{k+1} = \\phi L_k \\approx 0.618034 L_k, \\quad L_n = \\phi^n L_0',
        description: 'The interval of uncertainty shrinks by factor φ ≈ 0.618 at every single iteration.'
      }
    ],
    theorems: [
      {
        name: 'Asymptotic Equivalence Theorem',
        statement: 'As the evaluation budget N → ∞, the ratio of consecutive Fibonacci numbers converges to the golden ratio: lim_{k → ∞} F_{k-1}/F_k = (√5 - 1)/2 = φ. Golden section search matches Fibonacci search efficiency while allowing open-ended iterations.',
        implication: 'Makes Golden Section search the practical standard for 1D line searches in optimization libraries.'
      }
    ],
    keyPrinciples: [
      {
        heading: 'Evaluation Efficiency',
        content: 'Iteration 1 requires 2 function evaluations; every subsequent iteration requires only 1 new function evaluation.'
      },
      {
        heading: 'Linear Convergence Rate',
        content: 'Linear rate of convergence with asymptotic rate constant C = φ ≈ 0.618.'
      }
    ],
    pitfallsAndInsights: [
      'Applying Golden Section search to non-unimodal functions (can converge to a local minimum or eliminate the global one).',
      'Confusing the ratio φ = 0.618 with 1/φ = 1.618 (use 0.618 for interior point contraction).'
    ]
  },

  'ch21-steepest-descent': {
    chapterId: 'ch21-steepest-descent',
    title: 'Steepest Descent / Ascent Method (Cauchy, 1847)',
    summary: 'The method of steepest descent follows the direction of the negative gradient vector -∇f(x). On ill-conditioned problems, successive search directions become mutually orthogonal, resulting in characteristic zigzagging.',
    prerequisites: ['Gradient Vector Field', 'Exact Line Search', 'Matrix Condition Number'],
    governingEquations: [
      {
        title: 'Steepest Descent Update Rule',
        latex: '\\mathbf{x}_{k+1} = \\mathbf{x}_k - \\alpha_k \\nabla f(\\mathbf{x}_k)',
        description: 'The search direction is chosen as d_k = -∇f(x_k), the direction of maximum instantaneous rate of decrease.'
      },
      {
        title: 'Optimal Step Size for Quadratic Functions (½ xᵀAx - bᵀx)',
        latex: '\\alpha_k^* = \\frac{\\mathbf{g}_k^T \\mathbf{g}_k}{\\mathbf{g}_k^T \\mathbf{A} \\mathbf{g}_k} \\quad \\text{where} \\quad \\mathbf{g}_k = \\nabla f(\\mathbf{x}_k)',
        description: 'Exact line search step size that minimizes the quadratic along direction -g_k.'
      },
      {
        title: 'Orthogonality of Successive Gradients',
        latex: '\\mathbf{g}_{k+1}^T \\mathbf{g}_k = 0 \\quad (\\text{Consecutive gradient vectors are strictly perpendicular under exact line search})',
        description: 'Because α_k minimizes f along the line, the directional derivative d/dα f(x_k - α g_k) = -g_{k+1}ᵀ g_k = 0.'
      }
    ],
    theorems: [
      {
        name: 'Kantorovich Convergence Bound for Steepest Descent',
        statement: 'For a quadratic function with symmetric positive definite matrix A having condition number κ = λ_max / λ_min, the convergence rate is bounded by: E(x_{k+1}) ≤ ((κ - 1)/(κ + 1))² E(x_k).',
        latex: '\\frac{f(\\mathbf{x}_{k+1}) - f^*}{f(\\mathbf{x}_k) - f^*} \\le \\left( \\frac{\\kappa(\\mathbf{A}) - 1}{\\kappa(\\mathbf{A}) + 1} \\right)^2',
        implication: 'When κ = 100, (99/101)² ≈ 0.96, meaning error decreases by only 4% per iteration, causing severe zigzagging.'
      }
    ],
    keyPrinciples: [
      {
        heading: 'Momentum Acceleration (Polyak Heavy-Ball)',
        content: 'v_{k+1} = β v_k - α ∇f(x_k), x_{k+1} = x_k + v_{k+1}. Dampens high-frequency oscillations across ravines and accelerates along valley floors.'
      },
      {
        heading: 'Gradient Field Geometry',
        content: 'The gradient vector ∇f is always strictly orthogonal to the local iso-contour / level surface.'
      }
    ],
    pitfallsAndInsights: [
      'Using pure steepest descent without momentum or preconditioning on ill-conditioned problems (requires thousands of zigzag steps).',
      'Setting learning rate α too high, which causes divergence (overshooting the opposite ravine wall).'
    ]
  },

  'ch22-nelder-mead': {
    chapterId: 'ch22-nelder-mead',
    title: 'Nelder-Mead Simplex Direct Search',
    summary: 'The Nelder-Mead simplex algorithm (1965) is a popular derivative-free heuristic for multivariable optimization. An n-dimensional simplex of n+1 vertices adapts dynamically to the topography through reflection, expansion, contraction, and shrinkage.',
    prerequisites: ['Geometric Simplex in ℝⁿ', 'Derivative-Free Optimization', 'Centroid Computation'],
    governingEquations: [
      {
        title: 'Simplex Vertex Ordering & Centroid',
        latex: 'f(\\mathbf{x}_1) \\le f(\\mathbf{x}_2) \\le \\dots \\le f(\\mathbf{x}_{n+1}), \\quad \\bar{\\mathbf{x}} = \\frac{1}{n} \\sum_{i=1}^n \\mathbf{x}_i \\quad (\\text{Centroid of best } n \\text{ vertices})',
        description: 'x₁ is best vertex, x_{n+1} is worst vertex. Centroid excludes the worst vertex.'
      },
      {
        title: 'Reflection & Expansion Points',
        latex: '\\mathbf{x}_r = \\bar{\\mathbf{x}} + \\alpha (\\bar{\\mathbf{x}} - \\mathbf{x}_{n+1}) \\; (\\alpha=1), \\quad \\mathbf{x}_e = \\bar{\\mathbf{x}} + \\gamma (\\mathbf{x}_r - \\bar{\\mathbf{x}}) \\; (\\gamma=2)',
        description: 'Reflects the worst vertex across the centroid; expands further if reflection is exceptionally good.'
      },
      {
        title: 'Contraction & Shrinkage',
        latex: '\\mathbf{x}_c = \\bar{\\mathbf{x}} + \\beta (\\mathbf{x}_{n+1} - \\bar{\\mathbf{x}}) \\; (\\beta=0.5), \\quad \\mathbf{x}_i \\leftarrow \\mathbf{x}_1 + \\delta (\\mathbf{x}_i - \\mathbf{x}_1) \\; (\\delta=0.5)',
        description: 'Contracts when reflection is worse than second-worst; shrinks all vertices toward the best vertex x₁ if all else fails.'
      }
    ],
    theorems: [
      {
        name: 'Derivative-Free Simplex Adaptation Property',
        statement: 'By comparing only scalar values f(x_i), the simplex elongates along gentle downward slopes, broadens across plateaus, and contracts into narrow valleys without calculating or approximating gradients.',
        implication: 'Robust to discontinuous, noisy, or non-differentiable simulation objective functions.'
      }
    ],
    keyPrinciples: [
      {
        heading: 'Standard Parameters',
        content: 'Reflection α = 1.0, Expansion γ = 2.0, Contraction β = 0.5, Shrinkage δ = 0.5.'
      },
      {
        heading: 'Simplex Degeneracy',
        content: 'When vertices collapse into a lower-dimensional line or plane, the search stagnates, requiring simplex restart.'
      }
    ],
    pitfallsAndInsights: [
      'Applying Nelder-Mead to high-dimensional problems (n > 20): simplex search becomes inefficient due to geometric degeneration.',
      'Nelder-Mead has no formal mathematical proof of convergence to stationary points for general non-convex functions in dimensions n ≥ 3.'
    ]
  },

  'ch23-fletcher-powell': {
    chapterId: 'ch23-fletcher-powell',
    title: 'Quasi-Newton & Fletcher-Powell (DFP & BFGS)',
    summary: 'Quasi-Newton methods build an iterative approximation of the inverse Hessian matrix using only gradient information. The Davidon-Fletcher-Powell (DFP) and Broyden-Fletcher-Goldfarb-Shanno (BFGS) rank-2 updates achieve superlinear convergence without computing second derivatives.',
    prerequisites: ['Secant Equation', 'Rank-1 and Rank-2 Updates', 'Hessian Approximations'],
    governingEquations: [
      {
        title: 'The Quasi-Newton Secant Equation',
        latex: '\\mathbf{H}_{k+1} \\mathbf{y}_k = \\mathbf{s}_k \\quad \\text{where} \\quad \\mathbf{s}_k = \\mathbf{x}_{k+1} - \\mathbf{x}_k, \\quad \\mathbf{y}_k = \\nabla f(\\mathbf{x}_{k+1}) - \\nabla f(\\mathbf{x}_k)',
        description: 'Demands that the inverse Hessian approximation H_{k+1} map gradient differences to displacement vectors.'
      },
      {
        title: 'DFP Rank-2 Inverse Hessian Update',
        latex: '\\mathbf{H}_{k+1}^{\\text{DFP}} = \\mathbf{H}_k + \\frac{\\mathbf{s}_k \\mathbf{s}_k^T}{\\mathbf{s}_k^T \\mathbf{y}_k} - \\frac{\\mathbf{H}_k \\mathbf{y}_k \\mathbf{y}_k^T \\mathbf{H}_k}{\\mathbf{y}_k^T \\mathbf{H}_k \\mathbf{y}_k}',
        description: 'First historical Quasi-Newton rank-2 formula (Davidon 1959, Fletcher & Powell 1963).'
      },
      {
        title: 'BFGS Rank-2 Inverse Hessian Update (Modern Standard)',
        latex: '\\mathbf{H}_{k+1}^{\\text{BFGS}} = \\left( \\mathbf{I} - \\rho_k \\mathbf{s}_k \\mathbf{y}_k^T \\right) \\mathbf{H}_k \\left( \\mathbf{I} - \\rho_k \\mathbf{y}_k \\mathbf{s}_k^T \\right) + \\rho_k \\mathbf{s}_k \\mathbf{s}_k^T \\quad \\left( \\rho_k = \\frac{1}{\\mathbf{y}_k^T \\mathbf{s}_k} \\right)',
        description: 'Self-correcting, more robust to line search inaccuracies than DFP; the industry standard.'
      }
    ],
    theorems: [
      {
        name: 'Positive Definiteness Preservation Theorem',
        statement: 'If H_k is symmetric positive definite and the line search satisfies the curvature condition y_kᵀ s_k > 0 (e.g. Wolfe conditions), then H_{k+1} updated via BFGS is unconditionally symmetric positive definite.',
        implication: 'Guarantees that every generated search direction d_{k+1} = -H_{k+1} ∇f_{k+1} is a descent direction.'
      }
    ],
    keyPrinciples: [
      {
        heading: 'Superlinear Convergence',
        content: 'Quasi-Newton achieves superlinear convergence (1 < p < 2), outperforming gradient descent (linear) at O(n²) cost per step (vs O(n³) for Newton).'
      },
      {
        heading: 'Limited-Memory L-BFGS',
        content: 'For large-scale machine learning (n > 10⁶), L-BFGS stores only the last m (typically 5–20) vectors {s_k, y_k}, avoiding n×n matrix storage.'
      }
    ],
    pitfallsAndInsights: [
      'Performing an inaccurate line search that violates y_kᵀ s_k > 0, which can destroy positive definiteness of H_k.',
      'Initializing H₀ with poor scale (standard practice: start with H₀ = I, then scale H₁ after first step by (y₀ᵀ s₀)/(y₀ᵀ y₀) I).'
    ]
  },

  'ch24-lagrange': {
    chapterId: 'ch24-lagrange',
    title: 'Lagrange Multipliers Method (Equality Constraints)',
    summary: 'The method of Lagrange Multipliers solves optimization problems subject to equality constraints h(x) = 0. At the constrained optimum, the gradient of the objective function must be a linear combination of the constraint gradients.',
    prerequisites: ['Vector Tangency', 'Implicit Function Theorem', 'Orthogonal Subspaces'],
    governingEquations: [
      {
        title: 'Lagrangian Function Definition',
        latex: '\\mathcal{L}(\\mathbf{x}, \\boldsymbol{\\lambda}) = f(\\mathbf{x}) + \\sum_{j=1}^p \\lambda_j h_j(\\mathbf{x}) = f(\\mathbf{x}) + \\boldsymbol{\\lambda}^T \\mathbf{h}(\\mathbf{x})',
        description: 'Augments the objective with constraint penalties scaled by dual multipliers λ_j.'
      },
      {
        title: 'Stationary System (First-Order Necessary Conditions)',
        latex: '\\begin{cases} \\nabla_{\\mathbf{x}} \\mathcal{L}(\\mathbf{x}^*, \\boldsymbol{\\lambda}^*) = \\nabla f(\\mathbf{x}^*) + \\sum_{j=1}^p \\lambda_j^* \\nabla h_j(\\mathbf{x}^*) = \\mathbf{0} \\\\ \\nabla_{\\boldsymbol{\\lambda}} \\mathcal{L}(\\mathbf{x}^*, \\boldsymbol{\\lambda}^*) = \\mathbf{h}(\\mathbf{x}^*) = \\mathbf{0} \\end{cases}',
        description: 'System of n + p algebraic equations in n + p unknowns (x*, λ*).'
      },
      {
        title: 'Geometric Level-Set Tangency Condition',
        latex: '\\nabla f(\\mathbf{x}^*) = -\\lambda^* \\nabla h(\\mathbf{x}^*) \\quad (\\text{Level curves of } f \\text{ are tangent to } h=0)',
        description: 'The gradient of f and the gradient of h must be collinear at the optimum.'
      }
    ],
    theorems: [
      {
        name: 'Lagrange Tangency Theorem',
        statement: 'Let x* be a local extremum of f(x) subject to h(x) = 0 with ∇h(x*) ≠ 0. Then the level surface of f passing through x* and the constraint manifold h(x) = 0 share a common tangent hyperplane at x*.',
        implication: 'If they were not tangent, moving along the constraint curve would increase or decrease f, violating optimality.'
      }
    ],
    keyPrinciples: [
      {
        heading: 'No Sign Restriction on λ',
        content: 'For equality constraints h(x) = 0, the multiplier λ_j can be positive, negative, or zero.'
      },
      {
        heading: 'Bordered Hessian Second-Order Test',
        content: 'Curvature is evaluated via the Bordered Hessian on the tangent subspace {d | ∇h(x*)ᵀ d = 0}.'
      }
    ],
    pitfallsAndInsights: [
      'Assuming the Lagrange multiplier system is always solvable when ∇h(x*) = 0 (violates Linear Independence Constraint Qualification).',
      'Forgetting that solving ∇ℒ = 0 finds all stationary points (minima, maxima, and saddle points of the constrained problem).'
    ]
  },

  'ch25-single-constraint': {
    chapterId: 'ch25-single-constraint',
    title: 'Single Constraint Optimization & Sensitivity Analysis',
    summary: 'Single inequality-constrained optimization g(x) ≤ 0 introduces the dual nature of constraints: active (boundary) vs inactive (interior). The Lagrange multiplier λ* serves as the shadow price.',
    prerequisites: ['Lagrange Multipliers', 'Sensitivity Derivatives', 'Shadow Price Economics'],
    governingEquations: [
      {
        title: 'Sensitivity Theorem / Shadow Price Identity',
        latex: '\\lambda^* = -\\frac{\\partial f^*}{\\partial b} \\quad \\text{for} \\quad g(\\mathbf{x}) \\le b',
        description: 'The optimal dual multiplier measures the marginal improvement in optimal objective value per unit relaxation of constraint bound b.'
      },
      {
        title: 'Single Inequality Kuhn-Tucker Conditions',
        latex: '\\nabla f(\\mathbf{x}^*) + \\mu^* \\nabla g(\\mathbf{x}^*) = \\mathbf{0}, \\quad g(\\mathbf{x}^*) \\le 0, \\quad \\mu^* \\ge 0, \\quad \\mu^* g(\\mathbf{x}^*) = 0',
        description: 'Either μ* = 0 (inactive constraint) or g(x*) = 0 with μ* ≥ 0 (active constraint).'
      }
    ],
    theorems: [
      {
        name: 'Envelope / Marginal Sensitivity Theorem',
        statement: 'Let f*(b) be the optimal value as a function of resource constraint bound b in g(x) ≤ b. If the problem is convex and strictly feasible, then df*(b)/db = -μ*, where μ* is the optimal dual multiplier.',
        implication: 'Provides economic shadow pricing: tells managers how much they should pay to relax a budget, capacity, or material constraint.'
      }
    ],
    keyPrinciples: [
      {
        heading: 'Inactive Case (g(x*) < 0)',
        content: 'The unconstrained minimum naturally satisfies the constraint. The multiplier is μ* = 0; relaxing b yields zero marginal benefit.'
      },
      {
        heading: 'Active Case (g(x*) = 0)',
        content: 'The constraint prevents f from decreasing further. Multivariably, ∇f(x*) points into the infeasible region; μ* > 0.'
      }
    ],
    pitfallsAndInsights: [
      'Assuming μ* can be negative for an inequality constraint g(x) ≤ 0 (μ* must be non-negative; negative μ would mean moving into the interior increases f).'
    ]
  },

  'ch26-multiple-constraints': {
    chapterId: 'ch26-multiple-constraints',
    title: 'Multiple Constraints & Active Boundaries',
    summary: 'When multiple inequality and equality constraints are present, the optimizer balances a cone of constraint gradients. Constraint qualifications (LICQ) ensure the mathematical validity of the KKT conditions.',
    prerequisites: ['Normal Cones', 'Linear Independence', 'Convex Cones (Farkas’ Lemma)'],
    governingEquations: [
      {
        title: 'Active Set Definition',
        latex: '\\mathcal{A}(\\mathbf{x}^*) = \\left\\{ i \\in \\{1, \\dots, m\\} \\,\\middle|\\, g_i(\\mathbf{x}^*) = 0 \\right\\}',
        description: 'The index set of inequality constraints that are strictly binding on the boundary at x*.'
      },
      {
        title: 'Linear Independence Constraint Qualification (LICQ)',
        latex: '\\left\\{ \\nabla g_i(\\mathbf{x}^*) \\right\\}_{i \\in \\mathcal{A}(\\mathbf{x}^*)} \\cup \\left\\{ \\nabla h_j(\\mathbf{x}^*) \\right\\}_{j=1}^p \\quad \\text{are linearly independent vectors in } \\mathbb{R}^n',
        description: 'Ensures the dual multipliers (μ*, λ*) are unique and KKT necessary conditions hold.'
      },
      {
        title: 'Gradient Cone Balance',
        latex: '-\\nabla f(\\mathbf{x}^*) \\in \\mathcal{N}_{\\mathcal{F}}(\\mathbf{x}^*) = \\left\\{ \\sum_{i \\in \\mathcal{A}} \\mu_i \\nabla g_i(\\mathbf{x}^*) + \\sum_{j=1}^p \\lambda_j \\nabla h_j(\\mathbf{x}^*) \\,\\middle|\\, \\mu_i \\ge 0 \\right\\}',
        description: 'The negative gradient must lie inside the normal cone of the feasible region at x*.'
      }
    ],
    theorems: [
      {
        name: 'Farkas’ Lemma for Linear Cones',
        statement: 'Given matrix A and vector c, exactly one of the following two systems has a solution: 1. A x ≤ 0 and cᵀ x > 0. 2. Aᵀ y = c and y ≥ 0.',
        implication: 'The fundamental algebraic theorem underpinning KKT stationarity and linear programming duality.'
      }
    ],
    keyPrinciples: [
      {
        heading: 'Active vs Inactive Gradients',
        content: 'Only active constraints contribute non-zero multipliers in the stationarity sum. Inactive constraints have μᵢ = 0.'
      },
      {
        heading: 'Degenerate Constraints',
        content: 'When constraint gradients are linearly dependent (LICQ violated), multiple multiplier solutions exist, creating numerical instability in solvers.'
      }
    ],
    pitfallsAndInsights: [
      'Assuming all constraints are active at the optimum (often only a small subset are binding).'
    ]
  },

  'ch27-constrained-newton': {
    chapterId: 'ch27-constrained-newton',
    title: 'Constrained Newton & Sequential Quadratic Programming (SQP)',
    summary: 'Sequential Quadratic Programming (SQP) is the gold standard for general nonlinear constrained optimization. At each major iteration, it models the Lagrangian with a quadratic objective and linearizes the constraints to solve a QP subproblem.',
    prerequisites: ['KKT System', 'Newton’s Method for Systems', 'Quadratic Programming'],
    governingEquations: [
      {
        title: 'The Exact KKT Nonlinear System',
        latex: '\\mathbf{F}(\\mathbf{x}, \\boldsymbol{\\lambda}) = \\begin{bmatrix} \\nabla f(\\mathbf{x}) + \\mathbf{A}(\\mathbf{x})^T \\boldsymbol{\\lambda} \\\\ \\mathbf{h}(\\mathbf{x}) \\end{bmatrix} = \\mathbf{0}',
        description: 'The system of nonlinear equations representing first-order KKT optimality.'
      },
      {
        title: 'SQP Quadratic Programming Subproblem',
        latex: '\\begin{aligned} \\min_{\\mathbf{d}} \\quad & \\frac{1}{2} \\mathbf{d}^T \\nabla_{\\mathbf{x}\\mathbf{x}}^2 \\mathcal{L}(\\mathbf{x}_k, \\boldsymbol{\\lambda}_k) \\mathbf{d} + \\nabla f(\\mathbf{x}_k)^T \\mathbf{d} \\\\ \\text{s.t.} \\quad & \\nabla g_i(\\mathbf{x}_k)^T \\mathbf{d} + g_i(\\mathbf{x}_k) \\le 0, \\quad i = 1, \\dots, m \\\\ & \\nabla h_j(\\mathbf{x}_k)^T \\mathbf{d} + h_j(\\mathbf{x}_k) = 0, \\quad j = 1, \\dots, p \\end{aligned}',
        description: 'Quadratic approximation of the Lagrangian subject to linearized constraints solved at each major step.'
      },
      {
        title: 'Merit Function for Step Acceptance (l₁ Penalty)',
        latex: '\\phi_1(\\mathbf{x}; \\sigma) = f(\\mathbf{x}) + \\sigma \\left( \\sum_{i=1}^m \\max(0, g_i(\\mathbf{x})) + \\sum_{j=1}^p |h_j(\\mathbf{x})| \\right)',
        description: 'Balances objective reduction with constraint violation penalty during line search.'
      }
    ],
    theorems: [
      {
        name: 'SQP Local Quadratic Convergence Theorem',
        statement: 'If (x*, λ*) satisfies the second-order sufficient conditions with LICQ and strict complementarity, and the exact Hessian of the Lagrangian is used, the sequence (x_k, λ_k) generated by SQP converges quadratically to (x*, λ*).',
        implication: 'Combines the quadratic speed of Newton’s method with robust constraint handling.'
      }
    ],
    keyPrinciples: [
      {
        heading: 'Quasi-Newton SQP',
        content: 'In practice, the Hessian of the Lagrangian ∇²_xx ℒ is approximated using BFGS updates on s_k = x_{k+1}-x_k and y_k = ∇_x ℒ(x_{k+1}) - ∇_x ℒ(x_k).'
      },
      {
        heading: 'Maratos Effect & Second-Order Corrections',
        content: 'Linearized constraints can cause good steps to be rejected by merit functions. Second-order correction steps resolve this.'
      }
    ],
    pitfallsAndInsights: [
      'Using an objective-only Hessian ∇²f in the SQP subproblem instead of the full Lagrangian Hessian ∇²_xx ℒ (loses constraint curvature information).',
      'Setting merit penalty parameter σ too low, which can accept steps that severely violate constraints.'
    ]
  },

  'ch28-kkt': {
    chapterId: 'ch28-kkt',
    title: 'Karush-Kuhn-Tucker (KKT) Comprehensive Laboratory',
    summary: 'The Karush-Kuhn-Tucker (KKT) conditions represent the theoretical pinnacle of mathematical optimization, generalizing Lagrange multipliers to handle inequality constraints. The four pillars—Stationarity, Primal Feasibility, Dual Feasibility, and Complementary Slackness—unify all constrained optimization.',
    prerequisites: ['Lagrangian Mechanics', 'Convex Optimization Duality', 'LICQ Constraint Qualifications'],
    governingEquations: [
      {
        title: '1. Stationarity of the Lagrangian',
        latex: '\\nabla f(\\mathbf{x}^*) + \\sum_{i=1}^m \\mu_i^* \\nabla g_i(\\mathbf{x}^*) + \\sum_{j=1}^p \\lambda_j^* \\nabla h_j(\\mathbf{x}^*) = \\mathbf{0}',
        description: 'The gradient of the objective is balanced by a conical combination of active constraint gradients.'
      },
      {
        title: '2. Primal Feasibility',
        latex: 'g_i(\\mathbf{x}^*) \\le 0 \\; (\\forall i = 1, \\dots, m), \\quad h_j(\\mathbf{x}^*) = 0 \\; (\\forall j = 1, \\dots, p)',
        description: 'The candidate solution must satisfy all original problem constraints.'
      },
      {
        title: '3. Dual Feasibility',
        latex: '\\mu_i^* \\ge 0 \\quad \\forall i = 1, \\dots, m',
        description: 'Lagrange multipliers associated with inequality constraints must be non-negative.'
      },
      {
        title: '4. Complementary Slackness',
        latex: '\\mu_i^* g_i(\\mathbf{x}^*) = 0 \\quad \\forall i = 1, \\dots, m',
        description: 'If constraint gᵢ is strictly inactive (gᵢ < 0), then μᵢ* = 0. If μᵢ* > 0, then gᵢ must be strictly binding on the boundary (gᵢ = 0).'
      }
    ],
    theorems: [
      {
        name: 'KKT Optimality Theorem',
        statement: '1. (Necessary): If x* is a local minimum of a differentiable problem satisfying LICQ, there exist unique multipliers (μ*, λ*) satisfying all 4 KKT conditions. 2. (Sufficient): If the problem is CONVEX (f, gᵢ convex, hⱼ affine), then any point x* satisfying the KKT conditions is GUARANTEED to be a global minimum.',
        implication: 'Transforms constrained continuous optimization into solving a structured system of equations and inequalities.'
      }
    ],
    keyPrinciples: [
      {
        heading: 'Second-Order Sufficient Condition (SOSC) on Subspace',
        content: 'dᵀ ∇²_xx ℒ(x*, μ*, λ*) d > 0 for all non-zero directions d in the critical cone {d | ∇gᵢ(x*)ᵀ d = 0 for i with μᵢ* > 0, ∇gᵢ(x*)ᵀ d ≤ 0 for i with μᵢ*=0, ∇hⱼ(x*)ᵀ d = 0}.'
      },
      {
        heading: 'Primal-Dual Interior Point Solvers',
        content: 'Modern interior point methods solve perturbed KKT conditions (μᵢ gᵢ = -τ) using Newton steps while driving barrier parameter τ → 0.'
      }
    ],
    pitfallsAndInsights: [
      'Applying KKT conditions when LICQ fails (e.g. cusp boundaries where ∇g₁(x*) and ∇g₂(x*) are parallel and opposing).',
      'Forgetting that for non-convex problems, KKT conditions are necessary but NOT sufficient (they identify saddle points and local maxima as well).'
    ]
  }
};
