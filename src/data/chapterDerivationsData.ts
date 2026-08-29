export interface DerivationStep {
  stepNumber: number;
  title: string;
  latex?: string;
  explanation: string;
  note?: string;
}

export interface ChapterDerivationContent {
  chapterId: string;
  mainTheoremTitle: string;
  theoremStatement: string;
  theoremLatex?: string;
  steps: DerivationStep[];
  conclusionLatex?: string;
  conclusionTakeaway: string;
}

export const CHAPTER_DERIVATIONS_DATA: Record<string, ChapterDerivationContent> = {
  'ch1-intro': {
    chapterId: 'ch1-intro',
    mainTheoremTitle: 'Equivalence of Maximization and Minimization via Dual Reflection',
    theoremStatement: 'Let Ω ⊆ ℝⁿ be any feasible set and let f: Ω → ℝ be any objective function. The point x* maximizes f(x) over Ω if and only if x* minimizes -f(x) over Ω, and max_{x ∈ Ω} f(x) = - min_{x ∈ Ω} [-f(x)].',
    theoremLatex: '\\mathbf{x}^* = \\arg\\max_{\\mathbf{x} \\in \\Omega} f(\\mathbf{x}) \\iff \\mathbf{x}^* = \\arg\\min_{\\mathbf{x} \\in \\Omega} \\left[ -f(\\mathbf{x}) \\right]',
    steps: [
      {
        stepNumber: 1,
        title: 'Definition of Global Maximizer',
        latex: 'f(\\mathbf{x}^*) \\ge f(\\mathbf{x}) \\quad \\forall \\mathbf{x} \\in \\Omega',
        explanation: 'By definition of a global maximum, the value attained at x* is greater than or equal to the objective value at any other feasible point in Ω.'
      },
      {
        stepNumber: 2,
        title: 'Multiplication by Negative Unity',
        latex: '-f(\\mathbf{x}^*) \\le -f(\\mathbf{x}) \\quad \\forall \\mathbf{x} \\in \\Omega',
        explanation: 'Multiplying an inequality by -1 reverses the inequality direction strictly, preserving order properties.'
      },
      {
        stepNumber: 3,
        title: 'Minimization Definition Equivalence',
        latex: 'g(\\mathbf{x}) = -f(\\mathbf{x}) \\implies g(\\mathbf{x}^*) \\le g(\\mathbf{x}) \\quad \\forall \\mathbf{x} \\in \\Omega \\implies \\mathbf{x}^* = \\arg\\min_{\\mathbf{x} \\in \\Omega} g(\\mathbf{x})',
        explanation: 'The transformed objective g(x) = -f(x) satisfies the exact formal definition of a global minimizer over Ω.'
      }
    ],
    conclusionLatex: '\\max_{\\mathbf{x} \\in \\Omega} f(\\mathbf{x}) \\equiv -\\min_{\\mathbf{x} \\in \\Omega} [-f(\\mathbf{x})]',
    conclusionTakeaway: 'This fundamental duality allows all mathematical optimization algorithms and solvers to be written purely for minimization without loss of generality.'
  },

  'ch2-formal-def': {
    chapterId: 'ch2-formal-def',
    mainTheoremTitle: 'Canonical Standard Transformation of Optimization Problems',
    theoremStatement: 'Any arbitrary general optimization problem with mixed inequalities and bounds can be converted into the canonical standard NLP format.',
    theoremLatex: '\\min_{\\mathbf{x}} f(\\mathbf{x}) \\quad \\text{s.t.} \\quad g_i(\\mathbf{x}) \\le 0 \\; (i=1,\\dots,m), \\quad h_j(\\mathbf{x}) = 0 \\; (j=1,\\dots,p)',
    steps: [
      {
        stepNumber: 1,
        title: 'Conversion of Greater-Than Inequalities',
        latex: 'u_k(\\mathbf{x}) \\ge c_k \\iff c_k - u_k(\\mathbf{x}) \\le 0 \\implies g_k(\\mathbf{x}) = c_k - u_k(\\mathbf{x}) \\le 0',
        explanation: 'Subtracting the expression from the constant bound converts any ≥ condition into a canonical ≤ 0 inequality constraint.'
      },
      {
        stepNumber: 2,
        title: 'Transformation of Non-Zero Equalities',
        latex: 'v_j(\\mathbf{x}) = d_j \\iff v_j(\\mathbf{x}) - d_j = 0 \\implies h_j(\\mathbf{x}) = v_j(\\mathbf{x}) - d_j = 0',
        explanation: 'Subtracting constant d_j shifts the equality manifold so its zero-level set corresponds precisely to the constraint.'
      },
      {
        stepNumber: 3,
        title: 'Box Bounds as Inequality Constraints',
        latex: 'x_{L,i} \\le x_i \\le x_{U,i} \\iff \\begin{cases} x_{L,i} - x_i \\le 0 \\\\ x_i - x_{U,i} \\le 0 \\end{cases}',
        explanation: 'Each coordinate box bound decomposes into two standard canonical inequalities, producing 2n total bound constraints.'
      }
    ],
    conclusionLatex: '\\mathcal{F} = \\bigcap_{i=1}^m \\{ \\mathbf{x} \\mid g_i(\\mathbf{x}) \\le 0 \\} \\cap \\bigcap_{j=1}^p \\{ \\mathbf{x} \\mid h_j(\\mathbf{x}) = 0 \\}',
    conclusionTakeaway: 'The canonical NLP form provides a universal standard interface for solver architectures.'
  },

  'ch3-history': {
    chapterId: 'ch3-history',
    mainTheoremTitle: 'Derivation of Fermat’s Stationary Tangent Principle (1636)',
    theoremStatement: 'Let f: (a, b) → ℝ be differentiable. If f attains a local extremum at x* ∈ (a, b), then f\'(x*) = 0.',
    theoremLatex: 'f\'(x^*) = \\lim_{E \\to 0} \\frac{f(x^* + E) - f(x^*)}{E} = 0',
    steps: [
      {
        stepNumber: 1,
        title: 'Fermat’s Method of Adequality',
        latex: 'f(x^* + E) \\approx f(x^*)',
        explanation: 'Pierre de Fermat considered a small hypothetical increment E and set the function value at x* + E "adequal" (approximately equal) to f(x*).'
      },
      {
        stepNumber: 2,
        title: 'Algebraic Simplification and Division by Increment',
        latex: '\\frac{f(x^* + E) - f(x^*)}{E} = 0 + \\mathcal{O}(E)',
        explanation: 'Subtracting f(x*) and dividing through by E isolates the first-order variation from higher-order terms.'
      },
      {
        stepNumber: 3,
        title: 'Vanishing Increment Limit (E → 0)',
        latex: '\\lim_{E \\to 0} \\frac{f(x^* + E) - f(x^*)}{E} = f\'(x^*) = 0',
        explanation: 'Suppressing all remaining terms containing powers of E yields the exact vanishing derivative condition.'
      }
    ],
    conclusionLatex: 'f\'(x^*) = 0',
    conclusionTakeaway: 'Fermat’s adequality laid the algebraic foundation for differential calculus and stationary point classification.'
  },

  'ch4-flowchart': {
    chapterId: 'ch4-flowchart',
    mainTheoremTitle: 'Mathematical Derivation of the Post-Optimality Sensitivity Gradient',
    theoremStatement: 'Let f*(b) = min_{x} { f(x) : g(x) ≤ b }. Under convexity and regular LICQ conditions, the derivative with respect to bound b equals the negative Lagrange multiplier.',
    theoremLatex: '\\frac{df^*(b)}{db} = -\\mu^*(b)',
    steps: [
      {
        stepNumber: 1,
        title: 'Perturbed Lagrangian Formulation',
        latex: '\\mathcal{L}(\\mathbf{x}, \\mu; b) = f(\\mathbf{x}) + \\mu (g(\\mathbf{x}) - b)',
        explanation: 'Express the optimal value function via the saddle-point formulation of the perturbed Lagrangian.'
      },
      {
        stepNumber: 2,
        title: 'Total Differentiation via Chain Rule',
        latex: '\\frac{df^*(b)}{db} = \\nabla f(\\mathbf{x}^*)^T \\frac{d\\mathbf{x}^*}{db} + \\mu^* \\left( \\nabla g(\\mathbf{x}^*)^T \\frac{d\\mathbf{x}^*}{db} - 1 \\right)',
        explanation: 'Differentiating both sides with respect to constraint perturbation b applying the multivariable chain rule.'
      },
      {
        stepNumber: 3,
        title: 'Substitution of KKT Stationarity (∇f + μ* ∇g = 0)',
        latex: '\\frac{df^*(b)}{db} = \\underbrace{\\left( \\nabla f(\\mathbf{x}^*) + \\mu^* \\nabla g(\\mathbf{x}^*) \\right)^T}_{= \\mathbf{0}} \\frac{d\\mathbf{x}^*}{db} - \\mu^* = -\\mu^*',
        explanation: 'Because stationarity holds identically at the optimal point x*, all gradient terms multiplying dx*/db vanish.'
      }
    ],
    conclusionLatex: '\\frac{df^*}{db} = -\\mu^*',
    conclusionTakeaway: 'Proves rigorously why dual multipliers represent the marginal cost (shadow price) of constraint tightening in engineering optimization.'
  },

  'ch5-requirements': {
    chapterId: 'ch5-requirements',
    mainTheoremTitle: 'Proof of Convergence Order & Decimal Precision Doubling',
    theoremStatement: 'For an iterative optimization algorithm exhibiting quadratic convergence (p = 2) with error e_k = ||x_k - x*||, the number of accurate decimal digits doubles at every single iteration.',
    theoremLatex: 'e_{k+1} \\le M e_k^2 \\implies -\\log_{10}(e_{k+1}) \\approx 2 \\left( -\\log_{10}(e_k) \\right) - \\log_{10}(M)',
    steps: [
      {
        stepNumber: 1,
        title: 'Definition of Quadratic Convergence',
        latex: 'e_{k+1} = \\|\\mathbf{x}_{k+1} - \\mathbf{x}^*\\| \\le M \\|\\mathbf{x}_k - \\mathbf{x}^*\\|^2 = M e_k^2',
        explanation: 'The error at iteration k+1 is bounded by a constant M times the square of the error at iteration k.'
      },
      {
        stepNumber: 2,
        title: 'Logarithmic Transformation to Decimal Digits',
        latex: 'd_k = -\\log_{10}(e_k) \\quad (\\text{Number of correct significant decimal digits})',
        explanation: 'An error of 10⁻⁴ corresponds to 4 correct decimal places (d_k = 4); 10⁻⁸ corresponds to 8 correct places.'
      },
      {
        stepNumber: 3,
        title: 'Recursive Propagation of Precision',
        latex: 'd_{k+1} = -\\log_{10}(e_{k+1}) \\ge -\\log_{10}(M e_k^2) = 2 d_k - \\log_{10}(M)',
        explanation: 'For small M, d_{k+1} ≈ 2 d_k, showing that precision strictly doubles from 4 digits -> 8 digits -> 16 digits.'
      }
    ],
    conclusionLatex: 'd_{k+1} \\approx 2 d_k',
    conclusionTakeaway: 'Explains why second-order methods (Newton-Raphson) reach machine precision (IEEE 754 float64 ~16 digits) in 4-6 iterations once inside the basin of attraction.'
  },

  'ch6-types': {
    chapterId: 'ch6-types',
    mainTheoremTitle: 'Derivation of Quadratic Programming Stationarity via Linear Systems',
    theoremStatement: 'For a strictly convex unconstrained Quadratic Program f(x) = ½ xᵀQx + cᵀx with Q ≻ 0, the exact optimal minimizer is obtained by solving the linear system Qx = -c.',
    theoremLatex: '\\nabla f(\\mathbf{x}^*) = \\mathbf{Q}\\mathbf{x}^* + \\mathbf{c} = \\mathbf{0} \\implies \\mathbf{x}^* = -\\mathbf{Q}^{-1}\\mathbf{c}',
    steps: [
      {
        stepNumber: 1,
        title: 'Expansion of Vector Objective Function',
        latex: 'f(\\mathbf{x}) = \\frac{1}{2} \\sum_{i=1}^n \\sum_{j=1}^n Q_{ij} x_i x_j + \\sum_{i=1}^n c_i x_i',
        explanation: 'Expressing the quadratic form in index summation notation with symmetric Q (Q_ij = Q_ji).'
      },
      {
        stepNumber: 2,
        title: 'Partial Differentiation with Respect to x_k',
        latex: '\\frac{\\partial f}{\\partial x_k} = \\frac{1}{2} \\sum_{j=1}^n Q_{kj} x_j + \\frac{1}{2} \\sum_{i=1}^n Q_{ik} x_i + c_k = \\sum_{j=1}^n Q_{kj} x_j + c_k',
        explanation: 'Due to symmetry Q_ik = Q_ki, the two summation halves combine into the k-th component of vector Qx.'
      },
      {
        stepNumber: 3,
        title: 'Matrix Vector Gradient & Stationarity',
        latex: '\\nabla f(\\mathbf{x}) = \\mathbf{Q}\\mathbf{x} + \\mathbf{c} = \\mathbf{0} \\implies \\mathbf{Q}\\mathbf{x}^* = -\\mathbf{c}',
        explanation: 'Setting the gradient vector to zero yields a linear system of n equations in n variables.'
      }
    ],
    conclusionLatex: '\\mathbf{x}^* = -\\mathbf{Q}^{-1}\\mathbf{c}',
    conclusionTakeaway: 'Connects the taxonomy of Quadratic Programming (QP) directly to the direct solvers of Linear Algebra (Cholesky, Conjugate Gradient).'
  },

  'ch7-constraints': {
    chapterId: 'ch7-constraints',
    mainTheoremTitle: 'Derivation of the Feasible Tangent Subspace for Equality Constraints',
    theoremStatement: 'Let h(x) = 0 be a set of p smooth equality constraints with Jacobian matrix J_h(x) = [∇h₁(x), ..., ∇h_p(x)]ᵀ of full rank p. The tangent space to the feasible manifold at x* is the nullspace of J_h(x*).',
    theoremLatex: 'T_{\\mathcal{M}}(\\mathbf{x}^*) = \\text{Null}(\\mathbf{J}_h(\\mathbf{x}^*)) = \\left\\{ \\mathbf{d} \\in \\mathbb{R}^n \\,\\middle|\\, \\nabla h_j(\\mathbf{x}^*)^T \\mathbf{d} = 0, \\; j = 1, \\dots, p \\right\\}',
    steps: [
      {
        stepNumber: 1,
        title: 'Smooth Feasible Trajectory Definition',
        latex: '\\gamma: (-\\epsilon, \\epsilon) \\to \\mathbb{R}^n, \\quad \\gamma(0) = \\mathbf{x}^*, \\quad h_j(\\gamma(t)) = 0 \\quad \\forall t \\in (-\\epsilon, \\epsilon)',
        explanation: 'Consider a differentiable curve γ(t) embedded entirely inside the feasible constraint manifold passing through x*.'
      },
      {
        stepNumber: 2,
        title: 'Differentiation along the Trajectory (Chain Rule)',
        latex: '\\left. \\frac{d}{dt} h_j(\\gamma(t)) \\right|_{t=0} = \\nabla h_j(\\gamma(0))^T \\gamma\'(0) = \\nabla h_j(\\mathbf{x}^*)^T \\mathbf{d} = 0',
        explanation: 'Because h_j(γ(t)) = 0 identically for all t, its time derivative at t=0 must be zero.'
      },
      {
        stepNumber: 3,
        title: 'Matrix Nullspace Characterization',
        latex: '\\mathbf{J}_h(\\mathbf{x}^*) \\mathbf{d} = \\mathbf{0} \\iff \\mathbf{d} \\in \\text{Null}(\\mathbf{J}_h(\\mathbf{x}^*))',
        explanation: 'Any tangent vector d to the feasible manifold must be orthogonal to every constraint gradient vector ∇h_j(x*).'
      }
    ],
    conclusionLatex: '\\dim(T_{\\mathcal{M}}(\\mathbf{x}^*)) = n - p',
    conclusionTakeaway: 'The feasible manifold has dimension n - p, reducing the effective degrees of freedom for the optimization algorithm.'
  },

  'ch8-convex-functions': {
    chapterId: 'ch8-convex-functions',
    mainTheoremTitle: 'Equivalence of First-Order Tangent Underestimator and Function Convexity',
    theoremStatement: 'A continuously differentiable function f: C → ℝ on open convex set C is convex if and only if f(y) ≥ f(x) + ∇f(x)ᵀ(y - x) for all x, y ∈ C.',
    theoremLatex: 'f(\\mathbf{y}) \\ge f(\\mathbf{x}) + \\nabla f(\\mathbf{x})^T(\\mathbf{y} - \\mathbf{x}) \\quad \\forall \\mathbf{x}, \\mathbf{y} \\in C',
    steps: [
      {
        stepNumber: 1,
        title: 'Secant Inequality Definition (0 < λ ≤ 1)',
        latex: 'f(\\mathbf{x} + \\lambda(\\mathbf{y} - \\mathbf{x})) \\le (1 - \\lambda) f(\\mathbf{x}) + \\lambda f(\\mathbf{y}) = f(\\mathbf{x}) + \\lambda (f(\\mathbf{y}) - f(\\mathbf{x}))',
        explanation: 'By convexity definition for the convex combination x + λ(y - x).'
      },
      {
        stepNumber: 2,
        title: 'Dividing by Parameter λ and Rearranging',
        latex: 'f(\\mathbf{y}) - f(\\mathbf{x}) \\ge \\frac{f(\\mathbf{x} + \\lambda(\\mathbf{y} - \\mathbf{x})) - f(\\mathbf{x})}{\\lambda}',
        explanation: 'Isolating the difference quotient on the right-hand side.'
      },
      {
        stepNumber: 3,
        title: 'Taking the Limit as λ → 0⁺',
        latex: 'f(\\mathbf{y}) - f(\\mathbf{x}) \\ge \\lim_{\\lambda \\to 0^+} \\frac{f(\\mathbf{x} + \\lambda(\\mathbf{y} - \\mathbf{x})) - f(\\mathbf{x})}{\\lambda} = \\nabla f(\\mathbf{x})^T (\\mathbf{y} - \\mathbf{x})',
        explanation: 'The directional derivative in direction (y - x) is precisely ∇f(x)ᵀ(y - x).'
      }
    ],
    conclusionLatex: 'f(\\mathbf{y}) \\ge f(\\mathbf{x}) + \\nabla f(\\mathbf{x})^T (\\mathbf{y} - \\mathbf{x})',
    conclusionTakeaway: 'For any convex function, the first-order Taylor tangent hyperplane serves as a global affine underestimator across the entire domain.'
  },

  'ch9-convex-problems': {
    chapterId: 'ch9-convex-problems',
    mainTheoremTitle: 'Rigorous Proof: Every Local Minimum of a Convex Function is a Global Minimum',
    theoremStatement: 'Let f: C → ℝ be convex on convex set C. If x* is a local minimum of f, then x* is a global minimum of f over C.',
    theoremLatex: 'f(\\mathbf{x}^*) \\le f(\\mathbf{y}) \\quad \\forall \\mathbf{y} \\in C',
    steps: [
      {
        stepNumber: 1,
        title: 'Proof by Contradiction Assumption',
        latex: '\\exists \\mathbf{z} \\in C \\quad \\text{such that} \\quad f(\\mathbf{z}) < f(\\mathbf{x}^*)',
        explanation: 'Assume there exists some point z in C with a strictly lower objective value than local minimum x*.'
      },
      {
        stepNumber: 2,
        title: 'Construct Convex Combination Point on Line Segment',
        latex: '\\mathbf{x}(\\lambda) = (1 - \\lambda) \\mathbf{x}^* + \\lambda \\mathbf{z} = \\mathbf{x}^* + \\lambda (\\mathbf{z} - \\mathbf{x}^*) \\quad \\text{for} \\quad \\lambda \\in (0, 1]',
        explanation: 'Because C is a convex set, x(λ) ∈ C for all λ ∈ [0, 1]. For arbitrarily small λ > 0, x(λ) is inside any local neighborhood B_δ(x*).'
      },
      {
        stepNumber: 3,
        title: 'Evaluate Function Convexity along the Segment',
        latex: 'f(\\mathbf{x}(\\lambda)) \\le (1 - \\lambda) f(\\mathbf{x}^*) + \\lambda f(\\mathbf{z}) < (1 - \\lambda) f(\\mathbf{x}^*) + \\lambda f(\\mathbf{x}^*) = f(\\mathbf{x}^*)',
        explanation: 'Since f(z) < f(x*), substituting yields f(x(λ)) < f(x*).'
      },
      {
        stepNumber: 4,
        title: 'Contradiction with Local Minimality',
        latex: 'f(\\mathbf{x}(\\lambda)) < f(\\mathbf{x}^*) \\quad \\forall \\lambda \\in (0, 1] \\implies \\text{Contradicts that } \\mathbf{x}^* \\text{ is a local minimum in } B_\\delta(\\mathbf{x}^*)',
        explanation: 'This contradicts the fact that x* is a local minimum within distance δ, so no such point z can exist.'
      }
    ],
    conclusionLatex: 'f(\\mathbf{x}^*) \\le f(\\mathbf{x}) \\quad \\forall \\mathbf{x} \\in C \\implies \\mathbf{x}^* \\text{ is the Global Minimum}',
    conclusionTakeaway: 'In convex optimization, any local search algorithm finding a local stationary minimum has unconditionally found the global optimum.'
  },

  'ch10-matrix-lab': {
    chapterId: 'ch10-matrix-lab',
    mainTheoremTitle: 'Derivation of Quadratic Form Gradient and Spectral Iso-Energy Ellipsoids',
    theoremStatement: 'Let f(x) = ½ xᵀAx - bᵀx with symmetric positive definite matrix A. Level sets {x | f(x) = c} form concentric hyper-ellipsoids whose semi-axis vectors align with the eigenvectors of A.',
    theoremLatex: 'f(\\mathbf{x}) = \\frac{1}{2} (\\mathbf{x} - \\mathbf{x}^*)^T \\mathbf{A} (\\mathbf{x} - \\mathbf{x}^*) + f^* = \\text{const}',
    steps: [
      {
        stepNumber: 1,
        title: 'Completing the Matrix Square',
        latex: 'f(\\mathbf{x}) = \\frac{1}{2} (\\mathbf{x} - \\mathbf{A}^{-1}\\mathbf{b})^T \\mathbf{A} (\\mathbf{x} - \\mathbf{A}^{-1}\\mathbf{b}) - \\frac{1}{2} \\mathbf{b}^T \\mathbf{A}^{-1} \\mathbf{b}',
        explanation: 'Centering the quadratic form around optimal minimizer x* = A⁻¹b.'
      },
      {
        stepNumber: 2,
        title: 'Spectral Orthogonal Transformation (A = Q Λ Qᵀ)',
        latex: '\\mathbf{y} = \\mathbf{Q}^T (\\mathbf{x} - \\mathbf{x}^*) \\implies \\frac{1}{2} \\mathbf{y}^T \\mathbf{\\Lambda} \\mathbf{y} = \\frac{1}{2} \\sum_{i=1}^n \\lambda_i y_i^2 = C',
        explanation: 'Transforming coordinates into the eigenvector basis diagonalizes the quadratic form into uncoupled terms.'
      },
      {
        stepNumber: 3,
        title: 'Canonical Ellipsoid Semi-Axis Lengths',
        latex: '\\sum_{i=1}^n \\frac{y_i^2}{( \\sqrt{2C / \\lambda_i} )^2} = 1 \\implies r_i = \\sqrt{\\frac{2C}{\\lambda_i}}',
        explanation: 'The length of semi-axis i is inversely proportional to the square root of eigenvalue λ_i.'
      }
    ],
    conclusionLatex: '\\text{Eccentricity Aspect Ratio} = \\frac{r_{\\max}}{r_{\\min}} = \\sqrt{\\frac{\\lambda_{\\max}}{\\lambda_{\\min}}} = \\sqrt{\\kappa(\\mathbf{A})}',
    conclusionTakeaway: 'The condition number κ(A) determines the elongation of the quadratic energy bowl.'
  },

  'ch11-hessian': {
    chapterId: 'ch11-hessian',
    mainTheoremTitle: 'Derivation of Multivariable Second-Order Taylor Expansion with Hessian Curvature',
    theoremStatement: 'Let f: ℝⁿ → ℝ be twice continuously differentiable. The directional curvature at point x in direction d is governed by the quadratic form dᵀ ∇²f(x) d.',
    theoremLatex: 'f(\\mathbf{x} + \\mathbf{d}) = f(\\mathbf{x}) + \\nabla f(\\mathbf{x})^T \\mathbf{d} + \\frac{1}{2} \\mathbf{d}^T \\mathbf{H}(\\mathbf{x}) \\mathbf{d} + o(\\|\\mathbf{d}\\|^2)',
    steps: [
      {
        stepNumber: 1,
        title: 'Single Variable Projection Function',
        latex: '\\phi(t) = f(\\mathbf{x} + t\\mathbf{d}), \\quad \\phi: [0, 1] \\to \\mathbb{R}',
        explanation: 'Parameterize the line segment from x to x + d using scalar variable t ∈ [0, 1].'
      },
      {
        stepNumber: 2,
        title: 'First and Second Time Derivatives via Multivariable Chain Rule',
        latex: '\\phi\'(t) = \\sum_{i=1}^n \\frac{\\partial f}{\\partial x_i} d_i = \\nabla f(\\mathbf{x} + t\\mathbf{d})^T \\mathbf{d}, \\quad \\phi\'\'(t) = \\sum_{i=1}^n \\sum_{j=1}^n \\frac{\\partial^2 f}{\\partial x_i \\partial x_j} d_i d_j = \\mathbf{d}^T \\mathbf{H}(\\mathbf{x} + t\\mathbf{d}) \\mathbf{d}',
        explanation: 'Applying the chain rule twice produces the gradient vector and Hessian matrix expressions.'
      },
      {
        stepNumber: 3,
        title: '1D Taylor Theorem with Integral Remainder',
        latex: '\\phi(1) = \\phi(0) + \\phi\'(0) + \\frac{1}{2} \\phi\'\'(0) + \\mathcal{O}(\\|\\mathbf{d}\\|^3)',
        explanation: 'Expanding scalar function φ(1) around t=0 and substituting back f(x), ∇f(x), and H(x).'
      }
    ],
    conclusionLatex: 'f(\\mathbf{x} + \\mathbf{d}) - f(\\mathbf{x}) \\approx \\frac{1}{2} \\mathbf{d}^T \\mathbf{H}(\\mathbf{x}^*) \\mathbf{d} > 0 \\quad (\\text{when } \\nabla f = \\mathbf{0} \\text{ and } \\mathbf{H} \\succ 0)',
    conclusionTakeaway: 'Positive definiteness of the Hessian guarantees that every perturbation vector d strictly increases the objective, proving the local minimum.'
  },

  'ch12-unconstrained': {
    chapterId: 'ch12-unconstrained',
    mainTheoremTitle: 'Derivation of the Sufficient Descent Condition (Armijo-Goldstein Line Search)',
    theoremStatement: 'Let d be a search direction satisfying ∇f(x)ᵀ d < 0. For any c₁ ∈ (0, 1), there exists a step length α > 0 such that the Armijo condition f(x + αd) ≤ f(x) + c₁ α ∇f(x)ᵀ d is satisfied.',
    theoremLatex: 'f(\\mathbf{x} + \\alpha \\mathbf{d}) \\le f(\\mathbf{x}) + c_1 \\alpha \\nabla f(\\mathbf{x})^T \\mathbf{d} \\quad (c_1 \\in (0, 1))',
    steps: [
      {
        stepNumber: 1,
        title: 'Taylor Expansion of f along Step Direction d',
        latex: 'f(\\mathbf{x} + \\alpha \\mathbf{d}) = f(\\mathbf{x}) + \\alpha \\nabla f(\\mathbf{x})^T \\mathbf{d} + o(\\alpha)',
        explanation: 'As step size α → 0, the first-order term dominates the higher-order remainder.'
      },
      {
        stepNumber: 2,
        title: 'Subtracting the Armijo Benchmark Bound',
        latex: 'f(\\mathbf{x} + \\alpha \\mathbf{d}) - \\left[ f(\\mathbf{x}) + c_1 \\alpha \\nabla f(\\mathbf{x})^T \\mathbf{d} \\right] = (1 - c_1) \\alpha \\nabla f(\\mathbf{x})^T \\mathbf{d} + o(\\alpha)',
        explanation: 'Subtracting the target Armijo line from the actual function value curve.'
      },
      {
        stepNumber: 3,
        title: 'Limit Behavior as α → 0⁺',
        latex: '\\lim_{\\alpha \\to 0^+} \\frac{f(\\mathbf{x} + \\alpha \\mathbf{d}) - f(\\mathbf{x})}{\\alpha} = \\nabla f(\\mathbf{x})^T \\mathbf{d} < c_1 \\nabla f(\\mathbf{x})^T \\mathbf{d} \\quad (\\text{since } c_1 < 1 \\text{ and } \\nabla f^T \\mathbf{d} < 0)',
        explanation: 'Because the derivative is strictly negative and c₁ < 1, the curve lies strictly below the line for all sufficiently small α.'
      }
    ],
    conclusionLatex: '\\exists \\bar{\\alpha} > 0 \\quad \\text{such that Armijo condition holds} \\quad \\forall \\alpha \\in (0, \\bar{\\alpha}]',
    conclusionTakeaway: 'Proves that backtracking line search (α ← β α) is guaranteed to terminate in finite steps.'
  },

  'ch13-principal-minors': {
    chapterId: 'ch13-principal-minors',
    mainTheoremTitle: 'Derivation of Sylvester’s Criterion via Cholesky Factorization L D Lᵀ',
    theoremStatement: 'A symmetric matrix A has all positive eigenvalues (A ≻ 0) if and only if all leading principal minors Δ_k = det(A_{1..k, 1..k}) are strictly positive.',
    theoremLatex: '\\mathbf{A} \\succ 0 \\iff \\Delta_k = \\prod_{i=1}^k d_i > 0 \\quad \\forall k = 1, \\dots, n',
    steps: [
      {
        stepNumber: 1,
        title: 'L D Lᵀ Triangular Factorization of Symmetric Matrix',
        latex: '\\mathbf{A} = \\mathbf{L} \\mathbf{D} \\mathbf{L}^T \\quad \\text{where } L_{ii} = 1, \\; L_{ij} = 0 \\; (j > i), \\quad \\mathbf{D} = \\text{diag}(d_1, d_2, \\dots, d_n)',
        explanation: 'Any symmetric matrix with non-zero pivots can be factored into a unit lower-triangular matrix L and diagonal matrix D.'
      },
      {
        stepNumber: 2,
        title: 'Determinant of the k-th Leading Submatrix',
        latex: '\\mathbf{A}_{1..k, 1..k} = \\mathbf{L}_{1..k, 1..k} \\mathbf{D}_{1..k, 1..k} \\mathbf{L}_{1..k, 1..k}^T \\implies \\Delta_k = \\det(\\mathbf{L}_k) \\det(\\mathbf{D}_k) \\det(\\mathbf{L}_k^T) = 1 \\cdot \\left( \\prod_{i=1}^k d_i \\right) \\cdot 1 = \\prod_{i=1}^k d_i',
        explanation: 'Because unit lower triangular matrices have determinant 1, the leading minor is the product of the first k pivot entries.'
      },
      {
        stepNumber: 3,
        title: 'Positive Definite Pivots Equivalence',
        latex: '\\mathbf{A} \\succ 0 \\iff \\mathbf{x}^T \\mathbf{A} \\mathbf{x} = (\\mathbf{L}^T \\mathbf{x})^T \\mathbf{D} (\\mathbf{L}^T \\mathbf{x}) > 0 \\iff d_i > 0 \\; (\\forall i) \\iff \\Delta_k > 0 \\; (\\forall k)',
        explanation: 'All pivots d_i > 0 if and only if all submatrix determinants Δ_k > 0.'
      }
    ],
    conclusionLatex: '\\Delta_1 > 0, \\; \\Delta_2 > 0, \\; \\dots, \\; \\Delta_n > 0 \\iff \\mathbf{A} \\succ 0',
    conclusionTakeaway: 'Validates Sylvester’s Criterion without computing characteristic polynomials or eigenvalues.'
  },

  'ch14-newton-raphson': {
    chapterId: 'ch14-newton-raphson',
    mainTheoremTitle: 'Derivation of Newton’s Quadratic Local Convergence Rate',
    theoremStatement: 'Let f: ℝⁿ → ℝ have Lipschitz continuous Hessian ||H(x) - H(y)|| ≤ L ||x - y||. In the neighborhood of a strict local minimum x* with H(x*) ≻ 0, the Newton iteration converges quadratically.',
    theoremLatex: '\\|\\mathbf{x}_{k+1} - \\mathbf{x}^*\\| \\le \\frac{L \\|\\mathbf{H}(\\mathbf{x}^*)^{-1}\\|}{2} \\|\\mathbf{x}_k - \\mathbf{x}^*\\|^2',
    steps: [
      {
        stepNumber: 1,
        title: 'Definition of the Newton Iteration Step',
        latex: '\\mathbf{x}_{k+1} - \\mathbf{x}^* = \\mathbf{x}_k - \\mathbf{x}^* - \\mathbf{H}(\\mathbf{x}_k)^{-1} \\nabla f(\\mathbf{x}_k)',
        explanation: 'Subtracting optimal point x* from both sides of the Newton update formula.'
      },
      {
        stepNumber: 2,
        title: 'Factoring Out the Inverse Hessian H(x_k)⁻¹',
        latex: '\\mathbf{x}_{k+1} - \\mathbf{x}^* = \\mathbf{H}(\\mathbf{x}_k)^{-1} \\left[ \\mathbf{H}(\\mathbf{x}_k)(\\mathbf{x}_k - \\mathbf{x}^*) - (\\nabla f(\\mathbf{x}_k) - \\nabla f(\\mathbf{x}^*)) \\right] \\quad (\\text{since } \\nabla f(\\mathbf{x}^*) = \\mathbf{0})',
        explanation: 'Expressing the gradient difference via the fundamental theorem of calculus.'
      },
      {
        stepNumber: 3,
        title: 'Integral Representation and Lipschitz Bound',
        latex: '\\nabla f(\\mathbf{x}_k) - \\nabla f(\\mathbf{x}^*) = \\int_0^1 \\mathbf{H}(\\mathbf{x}^* + t(\\mathbf{x}_k - \\mathbf{x}^*)) (\\mathbf{x}_k - \\mathbf{x}^*) \\, dt',
        explanation: 'Applying the Lipschitz bound ||H(x) - H(y)|| ≤ L ||x - y|| to evaluate the integral remainder.'
      },
      {
        stepNumber: 4,
        title: 'Quadratic Error Bound Result',
        latex: '\\|\\mathbf{x}_{k+1} - \\mathbf{x}^*\\| \\le \\|\\mathbf{H}(\\mathbf{x}_k)^{-1}\\| \\int_0^1 L \\, t \\|\\mathbf{x}_k - \\mathbf{x}^*\\|^2 \\, dt = \\frac{L \\|\\mathbf{H}(\\mathbf{x}_k)^{-1}\\|}{2} \\|\\mathbf{x}_k - \\mathbf{x}^*\\|^2',
        explanation: 'The integral ∫₀¹ t dt = ½, yielding the quadratic error relationship.'
      }
    ],
    conclusionLatex: '\\|\\mathbf{x}_{k+1} - \\mathbf{x}^*\\| = \\mathcal{O}(\\|\\mathbf{x}_k - \\mathbf{x}^*\\|^2)',
    conclusionTakeaway: 'Proves that Newton’s method converges quadratically near the solution.'
  },

  'ch15-nonlinear': {
    chapterId: 'ch15-nonlinear',
    mainTheoremTitle: 'Analytical Derivation of the Rosenbrock Curved Banana Valley Minimizer',
    theoremStatement: 'For the Rosenbrock function f(x, y) = (1 - x)² + 100(y - x²)², the unique global minimizer is (x*, y*) = (1, 1) with f(1, 1) = 0.',
    theoremLatex: '\\min_{(x,y) \\in \\mathbb{R}^2} \\left[ (1 - x)^2 + 100(y - x^2)^2 \\right] = 0 \\quad \\text{at} \\quad (x^*, y^*) = (1, 1)',
    steps: [
      {
        stepNumber: 1,
        title: 'Sum of Squares Non-Negativity Property',
        latex: '(1 - x)^2 \\ge 0 \\quad \\text{and} \\quad 100(y - x^2)^2 \\ge 0 \\implies f(x, y) \\ge 0 \\quad \\forall (x, y) \\in \\mathbb{R}^2',
        explanation: 'Because both terms are squared real numbers, f(x, y) is bounded below by zero.'
      },
      {
        stepNumber: 2,
        title: 'Simultaneous Vanishing Conditions',
        latex: 'f(x, y) = 0 \\iff \\begin{cases} 1 - x = 0 \\implies x = 1 \\\\ y - x^2 = 0 \\implies y = 1^2 = 1 \\end{cases}',
        explanation: 'The objective reaches its global lower bound of 0 if and only if both squared terms vanish simultaneously.'
      },
      {
        stepNumber: 3,
        title: 'Analytical Gradient System & Singularities',
        latex: '\\nabla f(x, y) = \\begin{bmatrix} -2(1 - x) - 400x(y - x^2) \\\\ 200(y - x^2) \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ 0 \\end{bmatrix} \\implies (x, y) = (1, 1)',
        explanation: 'From the second equation, y = x². Substituting into the first equation yields -2(1 - x) = 0 ⟹ x = 1, y = 1.'
      }
    ],
    conclusionLatex: '(x^*, y^*) = (1, 1), \\quad f^* = 0, \\quad \\mathbf{H}(1, 1) = \\begin{bmatrix} 802 & -400 \\\\ -400 & 200 \\end{bmatrix} \\succ 0',
    conclusionTakeaway: 'The Hessian at (1,1) has condition number κ ≈ 2508, mathematically explaining the extreme zigzagging of gradient methods.'
  },

  'ch16-local-global': {
    chapterId: 'ch16-local-global',
    mainTheoremTitle: 'Derivation of the Number of Local Minima in the N-Dimensional Rastrigin Landscape',
    theoremStatement: 'The Rastrigin multimodal benchmark function f(x) = 10n + ∑ [x_i² - 10 cos(2π x_i)] over box domain [-5.12, 5.12]ⁿ contains exactly 11ⁿ local stationary minima.',
    theoremLatex: 'N_{\\text{local minima}} = 11^n \\quad (\\text{e.g. } n=2 \\implies 121, \\; n=10 \\implies 25.9 \\times 10^9)',
    steps: [
      {
        stepNumber: 1,
        title: 'Separability of Coordinate Dimensions',
        latex: 'f(\\mathbf{x}) = \\sum_{i=1}^n g(x_i) \\quad \\text{where} \\quad g(x_i) = x_i^2 - 10\\cos(2\\pi x_i) + 10',
        explanation: 'Because f(x) is completely separable, a stationary point of f is a product of 1D stationary points of g(x_i).'
      },
      {
        stepNumber: 2,
        title: '1D Stationary Equation and Roots',
        latex: 'g\'(x) = 2x + 20\\pi \\sin(2\\pi x) = 0 \\implies x = -10\\pi \\sin(2\\pi x)',
        explanation: 'Intersections between y = x and y = -10π sin(2πx) inside [-5.12, 5.12] generate exactly 11 local minima per dimension.'
      },
      {
        stepNumber: 3,
        title: 'Combinatorial Product across n Dimensions',
        latex: 'N_{\\text{minima}} = (11)^n',
        explanation: 'In 2D, there are 11 × 11 = 121 local minima; in 10D, there are ~2.59 × 10¹⁰ local minima.'
      }
    ],
    conclusionLatex: 'N = 11^n',
    conclusionTakeaway: 'Illustrates the Curse of Dimensionality in non-convex optimization, requiring metaheuristics like Particle Swarms and Simulated Annealing.'
  },

  'ch17-calculus-results': {
    chapterId: 'ch17-calculus-results',
    mainTheoremTitle: 'Complete Proof of Second-Order Necessary and Sufficient Optimality Conditions',
    theoremStatement: 'Let f: ℝⁿ → ℝ be C². 1. (SONC): x* is local min ⟹ ∇f(x*) = 0 and ∇²f(x*) ⪰ 0. 2. (SOSC): ∇f(x*) = 0 and ∇²f(x*) ≻ 0 ⟹ x* is a strict local min.',
    theoremLatex: '\\nabla f(\\mathbf{x}^*) = \\mathbf{0} \\; \\land \\; \\nabla^2 f(\\mathbf{x}^*) \\succ 0 \\implies \\exists \\delta > 0 : f(\\mathbf{x}) > f(\\mathbf{x}^*) \\; \\forall \\mathbf{x} \\in B_\\delta(\\mathbf{x}^*), \\mathbf{x} \\ne \\mathbf{x}^*',
    steps: [
      {
        stepNumber: 1,
        title: 'Second-Order Taylor with Lagrange Remainder',
        latex: 'f(\\mathbf{x}^* + \\mathbf{d}) = f(\\mathbf{x}^*) + \\nabla f(\\mathbf{x}^*)^T \\mathbf{d} + \\frac{1}{2} \\mathbf{d}^T \\nabla^2 f(\\mathbf{x}^* + t\\mathbf{d}) \\mathbf{d} \\quad (t \\in (0, 1))',
        explanation: 'Expressing the exact value at perturbed point x* + d using the mean value remainder theorem.'
      },
      {
        stepNumber: 2,
        title: 'Application of FONC (∇f(x*) = 0)',
        latex: 'f(\\mathbf{x}^* + \\mathbf{d}) - f(\\mathbf{x}^*) = \\frac{1}{2} \\mathbf{d}^T \\nabla^2 f(\\mathbf{x}^* + t\\mathbf{d}) \\mathbf{d}',
        explanation: 'The linear gradient term vanishes identically at stationary point x*.'
      },
      {
        stepNumber: 3,
        title: 'Continuity and Spectral Lower Bound',
        latex: '\\mathbf{H}(\\mathbf{x}^*) \\succ 0 \\implies \\lambda_{\\min}(\\mathbf{H}(\\mathbf{x}^*)) = 2\\epsilon > 0 \\implies \\mathbf{d}^T \\mathbf{H}(\\mathbf{x}^* + t\\mathbf{d}) \\mathbf{d} \\ge \\epsilon \\|\\mathbf{d}\\|^2 > 0',
        explanation: 'By continuity of second derivatives, the Hessian remains strictly positive definite in a small ball ||d|| < δ.'
      }
    ],
    conclusionLatex: 'f(\\mathbf{x}^* + \\mathbf{d}) - f(\\mathbf{x}^*) \\ge \\frac{\\epsilon}{2} \\|\\mathbf{d}\\|^2 > 0 \\quad \\forall \\mathbf{d} \\ne \\mathbf{0}',
    conclusionTakeaway: 'Rigorous proof establishing that SOSC guarantees an isolated strict local minimum.'
  },

  'ch18-three-point': {
    chapterId: 'ch18-three-point',
    mainTheoremTitle: 'Derivation of the Three-Point Interval Elimination Contraction Ratio',
    theoremStatement: 'For a unimodal function f on [a, b], sampling two interior points x₁ < x₂ divides the interval into three segments. After one comparison, the interval shrinks to at most max(x₂ - a, b - x₁).',
    theoremLatex: 'L_{k+1} = \\max(x_2 - a, \\; b - x_1) = \\frac{2}{3} L_k \\quad (\\text{for equal-spaced placement})',
    steps: [
      {
        stepNumber: 1,
        title: 'Interior Point Equidistant Parameterization',
        latex: 'x_1 = a + \\frac{1}{3}(b - a), \\quad x_2 = a + \\frac{2}{3}(b - a)',
        explanation: 'Dividing interval [a, b] of length L into 3 equal subsections of length L/3.'
      },
      {
        stepNumber: 2,
        title: 'Case 1: f(x₁) < f(x₂)',
        latex: 'f(x_1) < f(x_2) \\implies x^* \\in [a, x_2] \\implies L_{\\text{new}} = x_2 - a = \\frac{2}{3} L',
        explanation: 'Sub-interval (x₂, b] is discarded, retaining [a, x₂].'
      },
      {
        stepNumber: 3,
        title: 'Case 2: f(x₁) > f(x₂)',
        latex: 'f(x_1) > f(x_2) \\implies x^* \\in [x_1, b] \\implies L_{\\text{new}} = b - x_1 = \\frac{2}{3} L',
        explanation: 'Sub-interval [a, x₁) is discarded, retaining [x₁, b].'
      }
    ],
    conclusionLatex: 'L_k = \\left( \\frac{2}{3} \\right)^k L_0',
    conclusionTakeaway: 'Guarantees geometric contraction of the uncertainty bracket for any 1D unimodal function.'
  },

  'ch19-fibonacci': {
    chapterId: 'ch19-fibonacci',
    mainTheoremTitle: 'Derivation of the Optimal Fibonacci Test Point Recurrence Formula',
    theoremStatement: 'To reuse one test point at each iteration and achieve the minimum possible final bracket over N steps, the test point intervals must be proportional to the Fibonacci sequence.',
    theoremLatex: 'L_k^* = \\frac{F_{N-k+1}}{F_{N+1}} L_0 \\quad \\text{with} \\quad F_k = F_{k-1} + F_{k-2}',
    steps: [
      {
        stepNumber: 1,
        title: 'Symmetry and Point-Reuse Condition',
        latex: 'L_{k+1}^* = L_k^* - L_{k+2}^* \\implies L_k^* = L_{k+1}^* + L_{k+2}^*',
        explanation: 'Demands that the remaining interval after discarding one subsegment equals the sum of the next two sub-intervals for reuse.'
      },
      {
        stepNumber: 2,
        title: 'Fibonacci Sequence Identification',
        latex: 'L_{N-1}^* = 2 L_N^*, \\; L_{N-2}^* = 3 L_N^*, \\; L_{N-3}^* = 5 L_N^*, \\; \\dots, \\; L_1^* = F_{N+1} L_N^*',
        explanation: 'Propagating the recurrence backward yields the standard Fibonacci sequence numbers.'
      },
      {
        stepNumber: 3,
        title: 'Final Bracket Reduction Ratio',
        latex: '\\frac{L_N^*}{L_0} = \\frac{1}{F_{N+1}}',
        explanation: 'Over N function evaluations, the uncertainty bracket is reduced by a factor of exactly 1/F_{N+1}.'
      }
    ],
    conclusionLatex: '\\frac{L_{\\text{final}}}{L_{\\text{initial}}} = \\frac{1}{F_{N+1}}',
    conclusionTakeaway: 'Fibonacci search is mathematically the optimal zero-order 1D elimination strategy for a fixed evaluation budget.'
  },

  'ch20-golden-section': {
    chapterId: 'ch20-golden-section',
    mainTheoremTitle: 'Derivation of the Golden Ratio Constant φ in Section Search',
    theoremStatement: 'The self-similarity condition for infinite point reuse without a pre-determined iteration budget N yields the golden ratio equation φ² + φ - 1 = 0, giving φ = (√5 - 1)/2 ≈ 0.618034.',
    theoremLatex: '\\phi^2 + \\phi - 1 = 0 \\implies \\phi = \\frac{\\sqrt{5} - 1}{2} \\approx 0.6180339887',
    steps: [
      {
        stepNumber: 1,
        title: 'Geometric Self-Similarity Requirement',
        latex: '\\frac{1 - r}{r} = \\frac{r}{1} \\implies 1 - r = r^2',
        explanation: 'The ratio of the smaller sub-interval (1 - r) to the larger sub-interval r must equal the ratio of the larger sub-interval r to the whole interval 1.'
      },
      {
        stepNumber: 2,
        title: 'Algebraic Quadratic Formula',
        latex: 'r^2 + r - 1 = 0 \\implies r = \\frac{-1 \\pm \\sqrt{1^2 - 4(1)(-1)}}{2(1)} = \\frac{-1 \\pm \\sqrt{5}}{2}',
        explanation: 'Solving the characteristic quadratic equation.'
      },
      {
        stepNumber: 3,
        title: 'Selecting the Positive Physical Root',
        latex: '\\phi = \\frac{\\sqrt{5} - 1}{2} \\approx 0.6180339887 \\quad (\\text{since } r > 0)',
        explanation: 'The positive root φ ≈ 0.618034 is the golden ratio conjugate.'
      }
    ],
    conclusionLatex: '1 - \\phi = \\phi^2 \\approx 0.381966, \\quad L_{k+1} = \\phi L_k',
    conclusionTakeaway: 'Golden Section search achieves steady exponential contraction with only 1 new function evaluation per iteration.'
  },

  'ch21-steepest-descent': {
    chapterId: 'ch21-steepest-descent',
    mainTheoremTitle: 'Derivation of Step Orthogonality and Optimal α for Steepest Descent',
    theoremStatement: 'Under exact line search on f(x) = ½ xᵀAx - bᵀx, consecutive gradient directions are strictly perpendicular (g_{k+1}ᵀ g_k = 0), and the optimal step size is α_k = (g_kᵀ g_k) / (g_kᵀ A g_k).',
    theoremLatex: '\\alpha_k^* = \\frac{\\mathbf{g}_k^T \\mathbf{g}_k}{\\mathbf{g}_k^T \\mathbf{A} \\mathbf{g}_k}, \\quad \\mathbf{g}_{k+1}^T \\mathbf{g}_k = 0',
    steps: [
      {
        stepNumber: 1,
        title: '1D Line Function Expansion along Negative Gradient',
        latex: '\\phi(\\alpha) = f(\\mathbf{x}_k - \\alpha \\mathbf{g}_k) = \\frac{1}{2} (\\mathbf{x}_k - \\alpha \\mathbf{g}_k)^T \\mathbf{A} (\\mathbf{x}_k - \\alpha \\mathbf{g}_k) - \\mathbf{b}^T (\\mathbf{x}_k - \\alpha \\mathbf{g}_k)',
        explanation: 'Expanding the quadratic objective along the line x(α) = x_k - α g_k.'
      },
      {
        stepNumber: 2,
        title: 'Differentiating with Respect to α and Setting to Zero',
        latex: '\\phi\'(\\alpha) = -\\mathbf{g}_k^T \\left( \\mathbf{A}(\\mathbf{x}_k - \\alpha \\mathbf{g}_k) - \\mathbf{b} \\right) = -\\mathbf{g}_k^T \\mathbf{g}_{k+1} = 0',
        explanation: 'By the chain rule, d/dα f(x_k - α g_k) = -∇f(x_{k+1})ᵀ g_k = -g_{k+1}ᵀ g_k = 0.'
      },
      {
        stepNumber: 3,
        title: 'Solving Explicitly for Optimal Step Size α*',
        latex: '-\\mathbf{g}_k^T (\\mathbf{g}_k - \\alpha \\mathbf{A}\\mathbf{g}_k) = 0 \\implies \\mathbf{g}_k^T \\mathbf{g}_k - \\alpha \\mathbf{g}_k^T \\mathbf{A}\\mathbf{g}_k = 0 \\implies \\alpha_k^* = \\frac{\\mathbf{g}_k^T \\mathbf{g}_k}{\\mathbf{g}_k^T \\mathbf{A} \\mathbf{g}_k}',
        explanation: 'Yields the exact closed-form optimal line search step length.'
      }
    ],
    conclusionLatex: '\\mathbf{g}_{k+1} \\perp \\mathbf{g}_k \\quad (\\text{Orthogonal 90° Zigzagging})',
    conclusionTakeaway: 'Orthogonality of successive steps causes severe zigzagging in narrow eccentric ravines.'
  },

  'ch22-nelder-mead': {
    chapterId: 'ch22-nelder-mead',
    mainTheoremTitle: 'Derivation of Simplex Transformation Geometry in ℝⁿ',
    theoremStatement: 'In the Nelder-Mead algorithm for ℝⁿ, the centroid x̄ of the best n vertices and the reflection vector x_r preserve volume and orientation unless contraction/expansion occurs.',
    theoremLatex: '\\mathbf{x}_r = (1 + \\alpha)\\bar{\\mathbf{x}} - \\alpha \\mathbf{x}_{n+1}, \\quad \\bar{\\mathbf{x}} = \\frac{1}{n} \\sum_{i=1}^n \\mathbf{x}_i',
    steps: [
      {
        stepNumber: 1,
        title: 'Centroid Calculation of the Best n Face',
        latex: '\\bar{\\mathbf{x}} = \\frac{1}{n} (\\mathbf{x}_1 + \\mathbf{x}_2 + \\dots + \\mathbf{x}_n)',
        explanation: 'Computes the geometric center of gravity of the n best vertices, excluding the worst vertex x_{n+1}.'
      },
      {
        stepNumber: 2,
        title: 'Reflection Vector Derivation (α = 1)',
        latex: '\\mathbf{x}_r = \\bar{\\mathbf{x}} + \\alpha (\\bar{\\mathbf{x}} - \\mathbf{x}_{n+1}) = 2\\bar{\\mathbf{x}} - \\mathbf{x}_{n+1}',
        explanation: 'Projects the worst point through the centroid to mirror the simplex.'
      },
      {
        stepNumber: 3,
        title: 'Expansion Transformation (γ = 2)',
        latex: '\\mathbf{x}_e = \\bar{\\mathbf{x}} + \\gamma (\\mathbf{x}_r - \\bar{\\mathbf{x}}) = \\bar{\\mathbf{x}} + 2(\\mathbf{x}_r - \\bar{\\mathbf{x}})',
        explanation: 'Doubles the step if the reflected point produces a new global best value.'
      }
    ],
    conclusionLatex: '\\text{Simplex Volume Ratio} = |1 + \\alpha| = 1 \\quad (\\text{for standard reflection } \\alpha=1)',
    conclusionTakeaway: 'Nelder-Mead provides derivative-free search by dynamically adjusting simplex size and shape.'
  },

  'ch23-fletcher-powell': {
    chapterId: 'ch23-fletcher-powell',
    mainTheoremTitle: 'Derivation of the BFGS Rank-2 Secant Equation Inverse Hessian Formula',
    theoremStatement: 'The BFGS inverse Hessian update formula satisfies the secant equation H_{k+1} y_k = s_k while minimizing the weighted Frobenius matrix norm ||H - H_k||_W.',
    theoremLatex: '\\mathbf{H}_{k+1} = \\left( \\mathbf{I} - \\rho_k \\mathbf{s}_k \\mathbf{y}_k^T \\right) \\mathbf{H}_k \\left( \\mathbf{I} - \\rho_k \\mathbf{y}_k \\mathbf{s}_k^T \\right) + \\rho_k \\mathbf{s}_k \\mathbf{s}_k^T \\quad \\left( \\rho_k = \\frac{1}{\\mathbf{y}_k^T \\mathbf{s}_k} \\right)',
    steps: [
      {
        stepNumber: 1,
        title: 'The Quasi-Newton Secant Condition',
        latex: '\\mathbf{B}_{k+1} \\mathbf{s}_k = \\mathbf{y}_k \\iff \\mathbf{H}_{k+1} \\mathbf{y}_k = \\mathbf{s}_k \\quad (\\mathbf{s}_k = \\mathbf{x}_{k+1} - \\mathbf{x}_k, \\; \\mathbf{y}_k = \\mathbf{g}_{k+1} - \\mathbf{g}_k)',
        explanation: 'Demands that the inverse Hessian approximation H_{k+1} maps gradient changes to displacement vectors.'
      },
      {
        stepNumber: 2,
        title: 'Rank-2 Symmetric Correction Ansatz',
        latex: '\\mathbf{H}_{k+1} = \\mathbf{H}_k + a \\mathbf{s}_k \\mathbf{s}_k^T + b (\\mathbf{H}_k \\mathbf{y}_k \\mathbf{s}_k^T + \\mathbf{s}_k \\mathbf{y}_k^T \\mathbf{H}_k) + c \\mathbf{H}_k \\mathbf{y}_k \\mathbf{y}_k^T \\mathbf{H}_k',
        explanation: 'General symmetric rank-2 update ansatz parameterized by scalar coefficients a, b, c.'
      },
      {
        stepNumber: 3,
        title: 'Substitution and Direct Verification of H_{k+1} y_k = s_k',
        latex: '\\mathbf{H}_{k+1} \\mathbf{y}_k = \\left( \\mathbf{I} - \\frac{\\mathbf{s}_k \\mathbf{y}_k^T}{\\mathbf{y}_k^T \\mathbf{s}_k} \\right) \\mathbf{H}_k \\underbrace{\\left( \\mathbf{y}_k - \\frac{\\mathbf{y}_k (\\mathbf{y}_k^T \\mathbf{s}_k)}{\\mathbf{y}_k^T \\mathbf{s}_k} \\right)}_{= \\mathbf{0}} + \\frac{\\mathbf{s}_k (\\mathbf{s}_k^T \\mathbf{y}_k)}{\\mathbf{y}_k^T \\mathbf{s}_k} = \\mathbf{s}_k',
        explanation: 'Multiplying by y_k simplifies the left product to zero, leaving s_k.'
      }
    ],
    conclusionLatex: '\\mathbf{H}_{k+1} \\mathbf{y}_k = \\mathbf{s}_k \\quad \\text{and} \\quad \\mathbf{H}_{k+1} \\succ 0',
    conclusionTakeaway: 'Proves the BFGS update preserves positive definiteness and satisfies the secant equation.'
  },

  'ch24-lagrange': {
    chapterId: 'ch24-lagrange',
    mainTheoremTitle: 'Derivation of Lagrange Multiplier Tangency via Orthogonal Gradients',
    theoremStatement: 'Let x* be a local extremum of f(x) subject to equality constraint h(x) = 0. If ∇h(x*) ≠ 0, then ∇f(x*) and ∇h(x*) must be collinear: ∇f(x*) = -λ* ∇h(x*).',
    theoremLatex: '\\nabla f(\\mathbf{x}^*) + \\lambda^* \\nabla h(\\mathbf{x}^*) = \\mathbf{0} \\iff \\nabla f(\\mathbf{x}^*) = -\\lambda^* \\nabla h(\\mathbf{x}^*)',
    steps: [
      {
        stepNumber: 1,
        title: 'Feasible Manifold Tangent Vector d',
        latex: '\\mathbf{d} \\in T_{\\mathcal{M}}(\\mathbf{x}^*) \\iff \\nabla h(\\mathbf{x}^*)^T \\mathbf{d} = 0',
        explanation: 'Any vector d tangent to the constraint curve h(x) = 0 must be orthogonal to constraint gradient ∇h(x*).'
      },
      {
        stepNumber: 2,
        title: 'Directional Derivative along Feasible Tangent',
        latex: '\\left. \\frac{d}{dt} f(\\gamma(t)) \\right|_{t=0} = \\nabla f(\\mathbf{x}^*)^T \\mathbf{d} = 0 \\quad \\forall \\mathbf{d} \\in T_{\\mathcal{M}}(\\mathbf{x}^*)',
        explanation: 'At a local extremum, the objective derivative along any feasible tangent direction must be zero.'
      },
      {
        stepNumber: 3,
        title: 'Orthogonal Complement Subspace Theorem',
        latex: '\\nabla f(\\mathbf{x}^*) \\in \\left( T_{\\mathcal{M}}(\\mathbf{x}^*) \\right)^\\perp = \\text{span}\\{\\nabla h(\\mathbf{x}^*)\\} \\implies \\nabla f(\\mathbf{x}^*) = -\\lambda^* \\nabla h(\\mathbf{x}^*)',
        explanation: 'Because ∇f(x*) is orthogonal to the nullspace of ∇h(x*), it must be a scalar multiple of ∇h(x*).'
      }
    ],
    conclusionLatex: '\\nabla f(\\mathbf{x}^*) = -\\lambda^* \\nabla h(\\mathbf{x}^*)',
    conclusionTakeaway: 'At the constrained optimum, the level curves of the objective function are tangent to the constraint manifold.'
  },

  'ch25-single-constraint': {
    chapterId: 'ch25-single-constraint',
    mainTheoremTitle: 'Derivation of Single Inequality Optimality & Multiplier Non-Negativity',
    theoremStatement: 'For min f(x) s.t. g(x) ≤ 0, the optimal multiplier μ* in ∇f(x*) + μ* ∇g(x*) = 0 must be non-negative (μ* ≥ 0).',
    theoremLatex: '\\mu^* \\ge 0 \\quad \\text{and} \\quad \\mu^* g(\\mathbf{x}^*) = 0',
    steps: [
      {
        stepNumber: 1,
        title: 'Active Boundary Case (g(x*) = 0)',
        latex: 'g(\\mathbf{x}^* + \\mathbf{d}) \\approx g(\\mathbf{x}^*) + \\nabla g(\\mathbf{x}^*)^T \\mathbf{d} \\le 0 \\implies \\nabla g(\\mathbf{x}^*)^T \\mathbf{d} \\le 0',
        explanation: 'To remain feasible, the perturbation vector d must point inward, making an angle ≥ 90° with ∇g(x*).'
      },
      {
        stepNumber: 2,
        title: 'Objective Non-Decreasing Condition',
        latex: 'f(\\mathbf{x}^* + \\mathbf{d}) - f(\\mathbf{x}^*) \\approx \\nabla f(\\mathbf{x}^*)^T \\mathbf{d} \\ge 0 \\quad \\forall \\mathbf{d} \\text{ with } \\nabla g(\\mathbf{x}^*)^T \\mathbf{d} \\le 0',
        explanation: 'At a minimum, no feasible direction can decrease the objective value.'
      },
      {
        stepNumber: 3,
        title: 'Gradient Direction Alignment (μ* ≥ 0)',
        latex: '\\nabla f(\\mathbf{x}^*) = -\\mu^* \\nabla g(\\mathbf{x}^*) \\implies \\nabla f(\\mathbf{x}^*)^T \\mathbf{d} = -\\mu^* \\underbrace{\\nabla g(\\mathbf{x}^*)^T \\mathbf{d}}_{\\le 0} \\ge 0 \\iff \\mu^* \\ge 0',
        explanation: 'Multiplying by -μ* preserves the non-negative direction if and only if μ* ≥ 0.'
      }
    ],
    conclusionLatex: '\\mu^* \\ge 0 \\quad (\\text{Dual Feasibility})',
    conclusionTakeaway: 'Proves why inequality multipliers must be non-negative (unlike unconstrained equality multipliers).'
  },

  'ch26-multiple-constraints': {
    chapterId: 'ch26-multiple-constraints',
    mainTheoremTitle: 'Derivation of Farkas’ Lemma and the Normal Cone of Active Constraints',
    theoremStatement: 'Let 𝒜(x*) be the active constraint set. If LICQ holds, the negative gradient -∇f(x*) must belong to the convex polyhedral cone generated by active constraint gradients.',
    theoremLatex: '-\\nabla f(\\mathbf{x}^*) = \\sum_{i \\in \\mathcal{A}(\\mathbf{x}^*)} \\mu_i^* \\nabla g_i(\\mathbf{x}^*) \\quad \\text{with} \\quad \\mu_i^* \\ge 0',
    steps: [
      {
        stepNumber: 1,
        title: 'Feasible Direction Cone Definition',
        latex: '\\mathcal{F} = \\left\\{ \\mathbf{d} \\in \\mathbb{R}^n \\,\\middle|\\, \\nabla g_i(\\mathbf{x}^*)^T \\mathbf{d} \\le 0 \\; (\\forall i \\in \\mathcal{A}) \\right\\}',
        explanation: 'The set of search vectors that do not violate any active inequality constraints.'
      },
      {
        stepNumber: 2,
        title: 'Descent Direction Cone Definition',
        latex: '\\mathcal{D} = \\left\\{ \\mathbf{d} \\in \\mathbb{R}^n \\,\\middle|\\, \\nabla f(\\mathbf{x}^*)^T \\mathbf{d} < 0 \\right\\}',
        explanation: 'The set of search vectors that strictly decrease the objective function.'
      },
      {
        stepNumber: 3,
        title: 'Optimality Equivalence: Empty Intersection ℱ ∩ 𝒟 = ∅',
        latex: '\\mathcal{F} \\cap \\mathcal{D} = \\emptyset \\iff \\nexists \\mathbf{d} : \\nabla g_i^T \\mathbf{d} \\le 0 \\; \\land \\; -\\nabla f^T \\mathbf{d} > 0',
        explanation: 'No feasible descent direction exists from the optimal point x*.'
      },
      {
        stepNumber: 4,
        title: 'Farkas’ Lemma Duality Application',
        latex: '-\\nabla f(\\mathbf{x}^*) = \\sum_{i \\in \\mathcal{A}} \\mu_i^* \\nabla g_i(\\mathbf{x}^*) \\quad \\text{for some } \\mu_i^* \\ge 0',
        explanation: 'By Farkas’ Lemma, the absence of a feasible descent direction is equivalent to the existence of non-negative multipliers μᵢ* ≥ 0.'
      }
    ],
    conclusionLatex: '\\nabla f(\\mathbf{x}^*) + \\sum_{i \\in \\mathcal{A}} \\mu_i^* \\nabla g_i(\\mathbf{x}^*) = \\mathbf{0}, \\quad \\mu_i^* \\ge 0',
    conclusionTakeaway: 'Farkas’ Lemma proves the necessity of the KKT stationarity condition.'
  },

  'ch27-constrained-newton': {
    chapterId: 'ch27-constrained-newton',
    mainTheoremTitle: 'Derivation of SQP Subproblem via Newton’s Method on the KKT Optimality System',
    theoremStatement: 'Applying Newton-Raphson to the nonlinear KKT system ∇_x ℒ(x, λ) = 0, h(x) = 0 is equivalent to solving a Quadratic Program with a quadratic model of the Lagrangian subject to linearized constraints.',
    theoremLatex: '\\begin{bmatrix} \\nabla_{\\mathbf{x}\\mathbf{x}}^2 \\mathcal{L}_k & \\mathbf{A}_k^T \\\\ \\mathbf{A}_k & \\mathbf{0} \\end{bmatrix} \\begin{bmatrix} \\mathbf{d}_k \\\\ \\boldsymbol{\\lambda}_{k+1} \\end{bmatrix} = -\\begin{bmatrix} \\nabla f_k \\\\ \\mathbf{h}_k \\end{bmatrix}',
    steps: [
      {
        stepNumber: 1,
        title: 'The Nonlinear KKT System of Equations',
        latex: '\\mathbf{F}(\\mathbf{x}, \\boldsymbol{\\lambda}) = \\begin{bmatrix} \\nabla f(\\mathbf{x}) + \\mathbf{A}(\\mathbf{x})^T \\boldsymbol{\\lambda} \\\\ \\mathbf{h}(\\mathbf{x}) \\end{bmatrix} = \\begin{bmatrix} \\mathbf{0} \\\\ \\mathbf{0} \\end{bmatrix} \\quad (\\mathbf{A}(\\mathbf{x}) = \\nabla \\mathbf{h}(\\mathbf{x})^T)',
        explanation: 'Expressing the first-order optimality condition as a vector root-finding problem F(x, λ) = 0.'
      },
      {
        stepNumber: 2,
        title: 'Newton Linearization of the KKT System',
        latex: '\\mathbf{F}(\\mathbf{x}_k + \\mathbf{d}, \\boldsymbol{\\lambda}_k + \\Delta \\boldsymbol{\\lambda}) \\approx \\mathbf{F}(\\mathbf{x}_k, \\boldsymbol{\\lambda}_k) + \\mathbf{J}_F(\\mathbf{x}_k, \\boldsymbol{\\lambda}_k) \\begin{bmatrix} \\mathbf{d} \\\\ \\Delta \\boldsymbol{\\lambda} \\end{bmatrix} = \\mathbf{0}',
        explanation: 'Taking the multivariable Jacobian J_F of the KKT system.'
      },
      {
        stepNumber: 3,
        title: 'KKT Matrix Block Structure',
        latex: '\\mathbf{J}_F = \\begin{bmatrix} \\nabla_{\\mathbf{x}\\mathbf{x}}^2 \\mathcal{L}(\\mathbf{x}_k, \\boldsymbol{\\lambda}_k) & \\mathbf{A}(\\mathbf{x}_k)^T \\\\ \\mathbf{A}(\\mathbf{x}_k) & \\mathbf{0} \\end{bmatrix}',
        explanation: 'The Jacobian of the KKT system has a symmetric saddle-point 2×2 block structure.'
      },
      {
        stepNumber: 4,
        title: 'Equivalence to the QP Subproblem',
        latex: '\\min_{\\mathbf{d}} \\; \\frac{1}{2} \\mathbf{d}^T \\nabla_{\\mathbf{x}\\mathbf{x}}^2 \\mathcal{L}_k \\mathbf{d} + \\nabla f_k^T \\mathbf{d} \\quad \\text{s.t.} \\quad \\mathbf{A}_k \\mathbf{d} + \\mathbf{h}_k = \\mathbf{0}',
        explanation: 'The first-order conditions of this QP subproblem reproduce the Newton-KKT linear system.'
      }
    ],
    conclusionLatex: '\\text{SQP Step} \\equiv \\text{Newton-Raphson on KKT System}',
    conclusionTakeaway: 'Sequential Quadratic Programming is Newton’s method applied directly to the constrained Lagrangian optimality equations.'
  },

  'ch28-kkt': {
    chapterId: 'ch28-kkt',
    mainTheoremTitle: 'Complete Proof of the 4 Karush-Kuhn-Tucker Conditions & Sufficiency for Convex Programs',
    theoremStatement: 'Let f, g_i be convex and h_j be affine. A feasible point x* is a global minimizer if and only if there exist multipliers (μ*, λ*) satisfying all 4 KKT conditions.',
    theoremLatex: '\\begin{cases} \\nabla f(\\mathbf{x}^*) + \\sum_{i=1}^m \\mu_i^* \\nabla g_i(\\mathbf{x}^*) + \\sum_{j=1}^p \\lambda_j^* \\nabla h_j(\\mathbf{x}^*) = \\mathbf{0} \\\\ g_i(\\mathbf{x}^*) \\le 0, \\; h_j(\\mathbf{x}^*) = 0 \\\\ \\mu_i^* \\ge 0 \\\\ \\mu_i^* g_i(\\mathbf{x}^*) = 0 \\end{cases} \\implies f(\\mathbf{x}^*) \\le f(\\mathbf{x}) \\; \\forall \\mathbf{x} \\in \\mathcal{F}',
    steps: [
      {
        stepNumber: 1,
        title: 'Lagrangian Convexity at Multipliers (μ*, λ*)',
        latex: '\\mathcal{L}(\\mathbf{x}) = f(\\mathbf{x}) + \\sum_{i=1}^m \\mu_i^* g_i(\\mathbf{x}) + \\sum_{j=1}^p \\lambda_j^* h_j(\\mathbf{x})',
        explanation: 'Because f and g_i are convex with μ_i* ≥ 0, and h_j is affine, ℒ(x) is a convex function of x.'
      },
      {
        stepNumber: 2,
        title: 'Stationarity Implies Global Minimizer of Lagrangian',
        latex: '\\nabla_{\\mathbf{x}} \\mathcal{L}(\\mathbf{x}^*) = \\mathbf{0} \\implies \\mathcal{L}(\\mathbf{x}^*) \\le \\mathcal{L}(\\mathbf{x}) \\quad \\forall \\mathbf{x} \\in \\mathbb{R}^n',
        explanation: 'For a convex function, a vanishing gradient ∇ℒ(x*) = 0 guarantees that x* is the global minimizer of ℒ(x).'
      },
      {
        stepNumber: 3,
        title: 'Evaluating Lagrangian at Optimal Point x*',
        latex: '\\mathcal{L}(\\mathbf{x}^*) = f(\\mathbf{x}^*) + \\sum_{i=1}^m \\underbrace{\\mu_i^* g_i(\\mathbf{x}^*)}_{= 0 \\text{ (Slackness)}} + \\sum_{j=1}^p \\lambda_j^* \\underbrace{h_j(\\mathbf{x}^*)}_{= 0 \\text{ (Feasibility)}} = f(\\mathbf{x}^*)',
        explanation: 'By complementary slackness and feasibility, all constraint penalty terms vanish at x*.'
      },
      {
        stepNumber: 4,
        title: 'Bounding Objective at Any Feasible Point x ∈ ℱ',
        latex: 'f(\\mathbf{x}^*) = \\mathcal{L}(\\mathbf{x}^*) \\le \\mathcal{L}(\\mathbf{x}) = f(\\mathbf{x}) + \\sum_{i=1}^m \\underbrace{\\mu_i^*}_{\\ge 0} \\underbrace{g_i(\\mathbf{x})}_{\\le 0} + \\sum_{j=1}^p \\lambda_j^* \\underbrace{h_j(\\mathbf{x})}_{= 0} \\le f(\\mathbf{x})',
        explanation: 'Because μ_i* g_i(x) ≤ 0 for any feasible x, ℒ(x) ≤ f(x), establishing f(x*) ≤ f(x).'
      }
    ],
    conclusionLatex: 'f(\\mathbf{x}^*) \\le f(\\mathbf{x}) \\quad \\forall \\mathbf{x} \\in \\mathcal{F} \\implies \\mathbf{x}^* \\text{ is the Unique/Global Minimizer}',
    conclusionTakeaway: 'Proves conclusively that for convex optimization problems, KKT conditions are both necessary and sufficient for global optimality.'
  }
};
