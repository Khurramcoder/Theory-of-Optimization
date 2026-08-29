import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Crosshair, Play, RefreshCw, ZoomIn, ZoomOut, Zap } from 'lucide-react';
import { computeNumericalGradient } from '../utils/mathEngine';

interface ContourPlot2DProps {
  fn: (x: number, y: number) => number;
  bounds?: { xMin: number; xMax: number; yMin: number; yMax: number };
  trajectory?: [number, number][];
  simplexPoints?: [number, number][];
  highlightPoints?: { x: number; y: number; label?: string; color?: string; type?: 'min' | 'max' | 'saddle' | 'current' }[];
  constraintFn?: (x: number, y: number) => number; // g(x,y) <= 0
  equalityFn?: (x: number, y: number) => number; // h(x,y) = 0
  showVectorField?: boolean;
  onPointSelect?: (x: number, y: number) => void;
  title?: string;
}

export const ContourPlot2D: React.FC<ContourPlot2DProps> = ({
  fn,
  bounds = { xMin: -3, xMax: 3, yMin: -3, yMax: 3 },
  trajectory = [],
  simplexPoints,
  highlightPoints = [],
  constraintFn,
  equalityFn,
  showVectorField = true,
  onPointSelect,
  title = '2D Contour Map & Gradient Flow',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoverCoord, setHoverCoord] = useState<{ x: number; y: number; val: number; grad: [number, number] } | null>(null);
  const [showVectors, setShowVectors] = useState(showVectorField);
  const [contourLevelsCount, setContourLevelsCount] = useState(24);

  const drawPlot = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const { xMin, xMax, yMin, yMax } = bounds;

    // Coordinate transforms
    const toScreenX = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
    const toScreenY = (y: number) => height - ((y - yMin) / (yMax - yMin)) * height;
    const toMathX = (px: number) => xMin + (px / width) * (xMax - xMin);
    const toMathY = (py: number) => yMin + ((height - py) / height) * (yMax - yMin);

    // 1. Compute grid and find min/max values
    const gridRes = 80;
    const grid: number[][] = [];
    let minVal = Infinity;
    let maxVal = -Infinity;

    for (let i = 0; i <= gridRes; i++) {
      grid[i] = [];
      const x = xMin + (i / gridRes) * (xMax - xMin);
      for (let j = 0; j <= gridRes; j++) {
        const y = yMin + (j / gridRes) * (yMax - yMin);
        let v = 0;
        try {
          v = fn(x, y);
          if (isNaN(v) || !isFinite(v)) v = 0;
        } catch {
          v = 0;
        }
        grid[i][j] = v;
        if (v < minVal) minVal = v;
        if (v > maxVal) maxVal = v;
      }
    }

    const range = Math.max(1e-4, maxVal - minVal);

    // 2. Draw Colormap raster background
    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    const stepX = width / gridRes;
    const stepY = height / gridRes;

    for (let px = 0; px < width; px += 2) {
      const mx = toMathX(px);
      for (let py = 0; py < height; py += 2) {
        const my = toMathY(py);
        let v = 0;
        try { v = fn(mx, my); } catch { v = 0; }
        
        // Log-scale normalization for extreme functions like Rosenbrock
        const norm = Math.max(0, Math.min(1, (v - minVal) / range));
        const logNorm = Math.log(1 + 9 * norm) / Math.log(10);

        // Neon color palette
        let r = 15, g = 23, b = 42; // dark slate
        if (logNorm < 0.25) {
          const t = logNorm / 0.25;
          r = 15 + t * 5;
          g = 23 + t * 90;
          b = 42 + t * 150;
        } else if (logNorm < 0.5) {
          const t = (logNorm - 0.25) / 0.25;
          r = 20 + t * 100;
          g = 113 + t * 40;
          b = 192 + t * 40;
        } else if (logNorm < 0.75) {
          const t = (logNorm - 0.5) / 0.25;
          r = 120 + t * 110;
          g = 153 - t * 80;
          b = 232 - t * 40;
        } else {
          const t = (logNorm - 0.75) / 0.25;
          r = 230 + t * 25;
          g = 73 + t * 160;
          b = 192 - t * 150;
        }

        // Shade infeasible region if constraint function present
        if (constraintFn) {
          try {
            if (constraintFn(mx, my) > 0) {
              r = Math.floor(r * 0.35 + 80);
              g = Math.floor(g * 0.35);
              b = Math.floor(b * 0.35);
            }
          } catch {}
        }

        for (let dx = 0; dx < 2 && px + dx < width; dx++) {
          for (let dy = 0; dy < 2 && py + dy < height; dy++) {
            const idx = ((py + dy) * width + (px + dx)) * 4;
            data[idx] = r;
            data[idx + 1] = g;
            data[idx + 2] = b;
            data[idx + 3] = 255;
          }
        }
      }
    }
    ctx.putImageData(imgData, 0, 0);

    // 3. Draw Contour Lines (Iso-lines)
    ctx.lineWidth = 1;
    for (let c = 0; c < contourLevelsCount; c++) {
      const levelNorm = c / contourLevelsCount;
      const targetVal = minVal + Math.pow(levelNorm, 1.8) * range;

      ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 + levelNorm * 0.25})`;
      // Marching squares or sampled isolines
      ctx.beginPath();
      for (let i = 0; i < gridRes; i++) {
        for (let j = 0; j < gridRes; j++) {
          const v00 = grid[i][j];
          const v10 = grid[i + 1][j];
          const v01 = grid[i][j + 1];
          const v11 = grid[i + 1][j + 1];

          // Check if targetVal intersects edge
          if ((v00 - targetVal) * (v10 - targetVal) < 0) {
            const frac = (targetVal - v00) / (v10 - v00);
            const x = xMin + ((i + frac) / gridRes) * (xMax - xMin);
            const y = yMin + (j / gridRes) * (yMax - yMin);
            ctx.moveTo(toScreenX(x), toScreenY(y));
            ctx.lineTo(toScreenX(x) + 1, toScreenY(y) + 1);
          }
        }
      }
      ctx.stroke();
    }

    // 4. Draw Equality Constraint Curve (e.g. h(x,y) = 0)
    if (equalityFn) {
      ctx.strokeStyle = '#ec4899'; // Pink
      ctx.lineWidth = 2.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      const nSteps = 180;
      for (let s = 0; s <= nSteps; s++) {
        const theta = (s / nSteps) * Math.PI * 2;
        const r = 2.0;
        const cx = r * Math.cos(theta);
        const cy = r * Math.sin(theta);
        const sx = toScreenX(cx);
        const sy = toScreenY(cy);
        if (s === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // 5. Draw Gradient Vector Field (Arrows)
    if (showVectors) {
      const vSamplesX = 14;
      const vSamplesY = 14;
      ctx.lineWidth = 1.2;

      for (let ix = 0; ix <= vSamplesX; ix++) {
        const mx = xMin + (ix / vSamplesX) * (xMax - xMin);
        for (let iy = 0; iy <= vSamplesY; iy++) {
          const my = yMin + (iy / vSamplesY) * (yMax - yMin);
          const [gx, gy] = computeNumericalGradient(fn, mx, my);
          const mag = Math.sqrt(gx * gx + gy * gy);
          if (mag < 1e-7) continue;

          // Steepest descent direction (-grad)
          const dirX = -gx / mag;
          const dirY = -gy / mag;

          const sx = toScreenX(mx);
          const sy = toScreenY(my);
          const len = Math.min(14, Math.max(6, Math.log10(1 + mag) * 4 + 6));

          const endX = sx + dirX * len;
          const endY = sy - dirY * len; // screen y inverted

          ctx.strokeStyle = 'rgba(6, 182, 212, 0.45)'; // Cyan
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(endX, endY);
          ctx.stroke();

          // Arrow tip
          const angle = Math.atan2(-(endY - sy), endX - sx);
          const headLen = 3.5;
          ctx.fillStyle = 'rgba(6, 182, 212, 0.6)';
          ctx.beginPath();
          ctx.moveTo(endX, endY);
          ctx.lineTo(endX - headLen * Math.cos(angle - Math.PI / 6), endY + headLen * Math.sin(angle - Math.PI / 6));
          ctx.lineTo(endX - headLen * Math.cos(angle + Math.PI / 6), endY + headLen * Math.sin(angle + Math.PI / 6));
          ctx.fill();
        }
      }
    }

    // 6. Draw Coordinate Axes & Grid Lines
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
    ctx.lineWidth = 1;
    // X-axis
    if (yMin <= 0 && yMax >= 0) {
      const y0 = toScreenY(0);
      ctx.beginPath();
      ctx.moveTo(0, y0);
      ctx.lineTo(width, y0);
      ctx.stroke();
    }
    // Y-axis
    if (xMin <= 0 && xMax >= 0) {
      const x0 = toScreenX(0);
      ctx.beginPath();
      ctx.moveTo(x0, 0);
      ctx.lineTo(x0, height);
      ctx.stroke();
    }

    // 7. Draw Trajectory Path
    if (trajectory.length > 0) {
      // Trail line
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#0284c7';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      trajectory.forEach(([tx, ty], idx) => {
        const sx = toScreenX(tx);
        const sy = toScreenY(ty);
        if (idx === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      });
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Iteration Points
      trajectory.forEach(([tx, ty], idx) => {
        const sx = toScreenX(tx);
        const sy = toScreenY(ty);
        ctx.beginPath();
        if (idx === 0) {
          // Start point: Red
          ctx.fillStyle = '#ef4444';
          ctx.arc(sx, sy, 5.5, 0, Math.PI * 2);
        } else if (idx === trajectory.length - 1) {
          // End point: Emerald
          ctx.fillStyle = '#10b981';
          ctx.arc(sx, sy, 6.5, 0, Math.PI * 2);
        } else {
          // Intermediate step: Cyan
          ctx.fillStyle = '#38bdf8';
          ctx.arc(sx, sy, 3.5, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
    }

    // 8. Draw Nelder-Mead Simplex Triangle
    if (simplexPoints && simplexPoints.length === 3) {
      ctx.strokeStyle = '#f59e0b';
      ctx.fillStyle = 'rgba(245, 158, 11, 0.25)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      const p0 = [toScreenX(simplexPoints[0][0]), toScreenY(simplexPoints[0][1])];
      const p1 = [toScreenX(simplexPoints[1][0]), toScreenY(simplexPoints[1][1])];
      const p2 = [toScreenX(simplexPoints[2][0]), toScreenY(simplexPoints[2][1])];
      ctx.moveTo(p0[0], p0[1]);
      ctx.lineTo(p1[0], p1[1]);
      ctx.lineTo(p2[0], p2[1]);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Vertex markers
      simplexPoints.forEach(([sx, sy], idx) => {
        ctx.fillStyle = idx === 0 ? '#10b981' : (idx === 2 ? '#ef4444' : '#f59e0b');
        ctx.beginPath();
        ctx.arc(toScreenX(sx), toScreenY(sy), 4.5, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // 9. Draw Highlight Points (Optima, Minima, Saddle Points)
    highlightPoints.forEach((pt) => {
      const sx = toScreenX(pt.x);
      const sy = toScreenY(pt.y);

      let col = '#10b981';
      if (pt.type === 'max') col = '#ef4444';
      if (pt.type === 'saddle') col = '#f59e0b';
      if (pt.type === 'current') col = '#06b6d4';

      ctx.fillStyle = col;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(sx, sy, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      if (pt.label) {
        ctx.fillStyle = '#f8fafc';
        ctx.font = '10px Inter, sans-serif';
        ctx.fillText(pt.label, sx + 8, sy - 4);
      }
    });

  }, [fn, bounds, trajectory, simplexPoints, highlightPoints, constraintFn, equalityFn, showVectors, contourLevelsCount]);

  useEffect(() => {
    drawPlot();
  }, [drawPlot]);

  // Click & Hover handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const { xMin, xMax, yMin, yMax } = bounds;
    const mx = xMin + (px / canvas.width) * (xMax - xMin);
    const my = yMin + ((canvas.height - py) / canvas.height) * (yMax - yMin);

    try {
      const val = fn(mx, my);
      const grad = computeNumericalGradient(fn, mx, my);
      setHoverCoord({ x: mx, y: my, val, grad });
    } catch {}
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !onPointSelect) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const { xMin, xMax, yMin, yMax } = bounds;
    const mx = xMin + (px / canvas.width) * (xMax - xMin);
    const my = yMin + ((canvas.height - py) / canvas.height) * (yMax - yMin);

    onPointSelect(mx, my);
  };

  return (
    <div className="relative w-full rounded-xl overflow-hidden glass-panel border border-slate-800 shadow-xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <Crosshair size={14} className="text-cyan-400" />
          <span className="font-semibold text-slate-200">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowVectors(!showVectors)}
            className={`px-2 py-1 rounded text-xs transition flex items-center gap-1 ${
              showVectors ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-slate-800 text-slate-400'
            }`}
          >
            <Zap size={12} />
            <span>{showVectors ? 'Vectors: ON' : 'Vectors: OFF'}</span>
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative bg-slate-950 flex items-center justify-center p-2">
        <canvas
          ref={canvasRef}
          width={500}
          height={400}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverCoord(null)}
          onClick={handleCanvasClick}
          className="rounded-lg border border-slate-800/80 cursor-crosshair max-w-full h-auto"
        />

        {/* Live Hover Coordinate Readout Overlay */}
        {hoverCoord && (
          <div className="absolute top-4 right-4 bg-slate-900/90 border border-cyan-500/30 rounded-lg p-2.5 shadow-xl text-xs font-mono backdrop-blur pointer-events-none space-y-1">
            <div className="text-slate-400">
              Point: <span className="text-cyan-300">({hoverCoord.x.toFixed(3)}, {hoverCoord.y.toFixed(3)})</span>
            </div>
            <div className="text-slate-400">
              f(x,y): <span className="text-amber-300">{hoverCoord.val.toFixed(4)}</span>
            </div>
            <div className="text-slate-400">
              ∇f: <span className="text-purple-300">[{hoverCoord.grad[0].toFixed(3)}, {hoverCoord.grad[1].toFixed(3)}]</span>
            </div>
            <div className="text-slate-400">
              ‖∇f‖: <span className="text-emerald-300">{Math.sqrt(hoverCoord.grad[0]**2 + hoverCoord.grad[1]**2).toFixed(4)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2 bg-slate-900/70 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <div>
          {onPointSelect ? '🎯 Click anywhere on the map to set starting point (x₀, y₀)' : 'Contours show equal cost curves'}
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Start
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Optimum
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" /> Trajectory
          </span>
        </div>
      </div>
    </div>
  );
};
