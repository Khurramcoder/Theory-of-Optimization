import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { RotateCw, Eye, Maximize2, Layers, Compass, Play, Pause, RefreshCw } from 'lucide-react';

interface ThreeSurfaceViewerProps {
  fn: (x: number, y: number) => number;
  bounds?: { xMin: number; xMax: number; yMin: number; yMax: number };
  resolution?: number;
  trajectory?: [number, number][];
  simplexPoints?: [number, number][];
  highlightPoints?: { x: number; y: number; label?: string; color?: string; type?: 'min' | 'max' | 'saddle' | 'current' }[];
  showContours?: boolean;
  showVectors?: boolean;
  constraintFn?: (x: number, y: number) => number; // e.g. g(x,y) = 0
  colorScheme?: 'neon' | 'viridis' | 'plasma' | 'fire';
  heightScale?: number;
  title?: string;
  autoRotate?: boolean;
}

export const ThreeSurfaceViewer: React.FC<ThreeSurfaceViewerProps> = ({
  fn,
  bounds = { xMin: -3, xMax: 3, yMin: -3, yMax: 3 },
  resolution = 64,
  trajectory,
  simplexPoints,
  highlightPoints = [],
  showContours = true,
  showVectors = false,
  constraintFn,
  colorScheme = 'neon',
  heightScale = 1.0,
  title,
  autoRotate: initialAutoRotate = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const surfaceMeshRef = useRef<THREE.Mesh | null>(null);
  const trajectoryGroupRef = useRef<THREE.Group | null>(null);
  const pointsGroupRef = useRef<THREE.Group | null>(null);
  const vectorGroupRef = useRef<THREE.Group | null>(null);
  const constraintMeshRef = useRef<THREE.Mesh | null>(null);

  const [isRotating, setIsRotating] = useState(initialAutoRotate);
  const [wireframe, setWireframe] = useState(false);
  const [surfaceResolution, setSurfaceResolution] = useState(resolution);
  const [zScale, setZScale] = useState(heightScale);

  // Color mapping helper
  const getColor = (normalizedZ: number, scheme: string): THREE.Color => {
    const t = Math.max(0, Math.min(1, normalizedZ));
    const col = new THREE.Color();
    if (scheme === 'neon') {
      // Dark Blue -> Cyan -> Purple -> Magenta -> Bright Yellow
      if (t < 0.25) col.lerpColors(new THREE.Color(0x0f172a), new THREE.Color(0x06b6d4), t / 0.25);
      else if (t < 0.5) col.lerpColors(new THREE.Color(0x06b6d4), new THREE.Color(0x8b5cf6), (t - 0.25) / 0.25);
      else if (t < 0.75) col.lerpColors(new THREE.Color(0x8b5cf6), new THREE.Color(0xec4899), (t - 0.5) / 0.25);
      else col.lerpColors(new THREE.Color(0xec4899), new THREE.Color(0xfacc15), (t - 0.75) / 0.25);
    } else if (scheme === 'viridis') {
      if (t < 0.33) col.lerpColors(new THREE.Color(0x440154), new THREE.Color(0x31688e), t / 0.33);
      else if (t < 0.66) col.lerpColors(new THREE.Color(0x31688e), new THREE.Color(0x35b779), (t - 0.33) / 0.33);
      else col.lerpColors(new THREE.Color(0x35b779), new THREE.Color(0xfde725), (t - 0.66) / 0.34);
    } else if (scheme === 'plasma') {
      if (t < 0.33) col.lerpColors(new THREE.Color(0x0d0887), new THREE.Color(0x7e03a8), t / 0.33);
      else if (t < 0.66) col.lerpColors(new THREE.Color(0x7e03a8), new THREE.Color(0xcc4778), (t - 0.33) / 0.33);
      else col.lerpColors(new THREE.Color(0xcc4778), new THREE.Color(0xf0f921), (t - 0.66) / 0.34);
    } else {
      // Fire
      if (t < 0.33) col.lerpColors(new THREE.Color(0x180000), new THREE.Color(0xbd0000), t / 0.33);
      else if (t < 0.66) col.lerpColors(new THREE.Color(0xbd0000), new THREE.Color(0xf97316), (t - 0.33) / 0.33);
      else col.lerpColors(new THREE.Color(0xf97316), new THREE.Color(0xfef08a), (t - 0.66) / 0.34);
    }
    return col;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030712);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(12, 10, 14);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.2);
    dirLight1.position.set(15, 25, 15);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 0.9);
    dirLight2.position.set(-15, -10, -15);
    scene.add(dirLight2);

    // Floor Grid
    const gridHelper = new THREE.GridHelper(16, 16, 0x06b6d4, 0x1e293b);
    gridHelper.position.y = -4;
    scene.add(gridHelper);

    // Axes
    const axesHelper = new THREE.AxesHelper(6);
    scene.add(axesHelper);

    // Groups
    const trajGroup = new THREE.Group();
    scene.add(trajGroup);
    trajectoryGroupRef.current = trajGroup;

    const ptsGroup = new THREE.Group();
    scene.add(ptsGroup);
    pointsGroupRef.current = ptsGroup;

    const vecGroup = new THREE.Group();
    scene.add(vecGroup);
    vectorGroupRef.current = vecGroup;

    // Mouse Interaction (Orbit Controls logic)
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let spherical = { radius: 20, theta: Math.PI / 4, phi: Math.PI / 3.2 };

    const updateCameraPos = () => {
      camera.position.x = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
      camera.position.y = spherical.radius * Math.cos(spherical.phi);
      camera.position.z = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
      camera.lookAt(0, 0, 0);
    };
    updateCameraPos();

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      spherical.theta -= dx * 0.008;
      spherical.phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.02, spherical.phi - dy * 0.008));
      updateCameraPos();
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      spherical.radius = Math.max(5, Math.min(60, spherical.radius + e.deltaY * 0.02));
      updateCameraPos();
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('wheel', onWheel, { passive: false });

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (isRotating && !isDragging) {
        spherical.theta += 0.005;
        updateCameraPos();
      }
      renderer.render(scene, camera);
    };
    animate();

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height || 450;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('wheel', onWheel);
      renderer.dispose();
    };
  }, [isRotating]);

  // Re-build 3D Surface Mesh whenever fn, bounds, surfaceResolution, colorScheme, zScale changes
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    if (surfaceMeshRef.current) {
      scene.remove(surfaceMeshRef.current);
      surfaceMeshRef.current.geometry.dispose();
      (surfaceMeshRef.current.material as THREE.Material).dispose();
      surfaceMeshRef.current = null;
    }

    const nx = surfaceResolution;
    const ny = surfaceResolution;
    const { xMin, xMax, yMin, yMax } = bounds;

    // Evaluate grid values and find min/max
    const zVals: number[][] = [];
    let minZ = Infinity;
    let maxZ = -Infinity;

    for (let i = 0; i <= nx; i++) {
      zVals[i] = [];
      const x = xMin + (i / nx) * (xMax - xMin);
      for (let j = 0; j <= ny; j++) {
        const y = yMin + (j / ny) * (yMax - yMin);
        let z = 0;
        try {
          z = fn(x, y);
          if (isNaN(z) || !isFinite(z)) z = 0;
        } catch {
          z = 0;
        }
        // Cap extreme heights for visual stability
        z = Math.max(-50, Math.min(50, z));
        zVals[i][j] = z;
        if (z < minZ) minZ = z;
        if (z > maxZ) maxZ = z;
      }
    }

    const zRange = Math.max(1e-4, maxZ - minZ);

    // Three.js Plane Geometry
    const geom = new THREE.PlaneGeometry(12, 12, nx, ny);
    const posAttr = geom.attributes.position;
    const colors: number[] = [];

    // Map plane vertices
    for (let i = 0; i <= nx; i++) {
      for (let j = 0; j <= ny; j++) {
        // PlaneGeometry vertex index
        const idx = j * (nx + 1) + i;
        const z = zVals[i][j];
        const normalizedZ = (z - minZ) / zRange;
        // height in 3D scene (scale to ~ -3 to +4 range)
        const sceneZ = ((normalizedZ - 0.5) * 6) * zScale;
        posAttr.setZ(idx, sceneZ);

        const col = getColor(normalizedZ, colorScheme);
        colors.push(col.r, col.g, col.b);
      }
    }

    geom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geom.computeVertexNormals();

    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      wireframe: wireframe,
      roughness: 0.25,
      metalness: 0.15,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geom, mat);
    mesh.rotation.x = -Math.PI / 2; // Lie flat in XZ plane
    scene.add(mesh);
    surfaceMeshRef.current = mesh;

    // Build Trajectory Line & Points
    if (trajectoryGroupRef.current) {
      const tGroup = trajectoryGroupRef.current;
      while (tGroup.children.length > 0) {
        const obj = tGroup.children[0] as THREE.Mesh;
        tGroup.remove(obj);
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) (obj.material as THREE.Material).dispose();
      }

      if (trajectory && trajectory.length > 1) {
        const points3D: THREE.Vector3[] = [];
        trajectory.forEach(([px, py], stepIdx) => {
          // Normalize to scene coords
          const normX = ((px - xMin) / (xMax - xMin) - 0.5) * 12;
          const normY = ((py - yMin) / (yMax - yMin) - 0.5) * 12;
          let val = 0;
          try { val = fn(px, py); } catch { val = 0; }
          const normZ = (((val - minZ) / zRange - 0.5) * 6) * zScale + 0.08; // slightly above surface
          points3D.push(new THREE.Vector3(normX, normZ, normY));

          // Sphere at each iteration point
          const sphereGeom = new THREE.SphereGeometry(stepIdx === trajectory.length - 1 ? 0.25 : 0.12, 16, 16);
          const sphereMat = new THREE.MeshStandardMaterial({
            color: stepIdx === 0 ? 0xef4444 : (stepIdx === trajectory.length - 1 ? 0x10b981 : 0x38bdf8),
            emissive: stepIdx === trajectory.length - 1 ? 0x059669 : 0x0284c7,
            emissiveIntensity: 0.6
          });
          const sphere = new THREE.Mesh(sphereGeom, sphereMat);
          sphere.position.set(normX, normZ, normY);
          tGroup.add(sphere);
        });

        // Glowing Trajectory Tube
        const curve = new THREE.CatmullRomCurve3(points3D);
        const tubeGeom = new THREE.TubeGeometry(curve, Math.min(100, trajectory.length * 4), 0.06, 8, false);
        const tubeMat = new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          emissive: 0x0284c7,
          emissiveIntensity: 0.8,
          roughness: 0.2
        });
        const tube = new THREE.Mesh(tubeGeom, tubeMat);
        tGroup.add(tube);
      }
    }

    // Build Simplex Triangle in Nelder-Mead
    if (simplexPoints && simplexPoints.length === 3 && trajectoryGroupRef.current) {
      const sGroup = trajectoryGroupRef.current;
      const sVerts: THREE.Vector3[] = simplexPoints.map(([px, py]) => {
        const normX = ((px - xMin) / (xMax - xMin) - 0.5) * 12;
        const normY = ((py - yMin) / (yMax - yMin) - 0.5) * 12;
        let val = 0;
        try { val = fn(px, py); } catch { val = 0; }
        const normZ = (((val - minZ) / zRange - 0.5) * 6) * zScale + 0.15;
        return new THREE.Vector3(normX, normZ, normY);
      });

      const lineGeom = new THREE.BufferGeometry().setFromPoints([...sVerts, sVerts[0]]);
      const lineMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, linewidth: 3 });
      const line = new THREE.Line(lineGeom, lineMat);
      sGroup.add(line);
    }

    // Highlight Minima/Maxima Markers
    if (pointsGroupRef.current) {
      const pGroup = pointsGroupRef.current;
      while (pGroup.children.length > 0) {
        const obj = pGroup.children[0] as THREE.Mesh;
        pGroup.remove(obj);
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) (obj.material as THREE.Material).dispose();
      }

      highlightPoints.forEach((pt) => {
        const normX = ((pt.x - xMin) / (xMax - xMin) - 0.5) * 12;
        const normY = ((pt.y - yMin) / (yMax - yMin) - 0.5) * 12;
        let val = 0;
        try { val = fn(pt.x, pt.y); } catch { val = 0; }
        const normZ = (((val - minZ) / zRange - 0.5) * 6) * zScale + 0.2;

        let colHex = 0x10b981; // Green for min
        if (pt.type === 'max') colHex = 0xef4444; // Red for max
        if (pt.type === 'saddle') colHex = 0xf59e0b; // Amber for saddle
        if (pt.type === 'current') colHex = 0x06b6d4; // Cyan for current

        const markerGeom = new THREE.OctahedronGeometry(0.28, 0);
        const markerMat = new THREE.MeshStandardMaterial({
          color: colHex,
          emissive: colHex,
          emissiveIntensity: 0.9,
          wireframe: false
        });
        const marker = new THREE.Mesh(markerGeom, markerMat);
        marker.position.set(normX, normZ, normY);
        pGroup.add(marker);

        // Vertical guide line to floor
        const guideGeom = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(normX, -4, normY),
          new THREE.Vector3(normX, normZ, normY)
        ]);
        const guideMat = new THREE.LineDashedMaterial({ color: colHex, dashSize: 0.2, gapSize: 0.1 });
        const guideLine = new THREE.Line(guideGeom, guideMat);
        pGroup.add(guideLine);
      });
    }

    // Constraint Surface/Curve
    if (constraintFn && scene) {
      if (constraintMeshRef.current) {
        scene.remove(constraintMeshRef.current);
        constraintMeshRef.current.geometry.dispose();
        (constraintMeshRef.current.material as THREE.Material).dispose();
        constraintMeshRef.current = null;
      }

      // Sample constraint curve g(x,y) = 0 and build line/curtain
      const curvePoints: THREE.Vector3[] = [];
      const steps = 120;
      for (let s = 0; s <= steps; s++) {
        const theta = (s / steps) * Math.PI * 2;
        // Search along rays
        const r = 2.0; // sample radius
        const cx = r * Math.cos(theta);
        const cy = r * Math.sin(theta);
        const normX = ((cx - xMin) / (xMax - xMin) - 0.5) * 12;
        const normY = ((cy - yMin) / (yMax - yMin) - 0.5) * 12;
        let val = 0;
        try { val = fn(cx, cy); } catch { val = 0; }
        const normZ = (((val - minZ) / zRange - 0.5) * 6) * zScale + 0.05;
        curvePoints.push(new THREE.Vector3(normX, normZ, normY));
      }

      const cLineGeom = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const cLineMat = new THREE.LineBasicMaterial({ color: 0xec4899, linewidth: 3 });
      const cLine = new THREE.Line(cLineGeom, cLineMat);
      scene.add(cLine);
      constraintMeshRef.current = cLine as any;
    }

  }, [fn, bounds, surfaceResolution, colorScheme, zScale, wireframe, trajectory, simplexPoints, highlightPoints, constraintFn]);

  return (
    <div className="relative w-full rounded-xl overflow-hidden glass-panel border border-cyan-500/20 shadow-2xl flex flex-col">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 backdrop-blur text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-semibold text-slate-200 tracking-wide">
            {title || '3D Multivariable Surface Explorer'}
          </span>
          <span className="text-slate-400 font-mono">
            [x: {bounds.xMin}..{bounds.xMax}, y: {bounds.yMin}..{bounds.yMax}]
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`px-2 py-1 rounded flex items-center gap-1.5 transition ${
              isRotating ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/40' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Auto Orbit Rotation"
          >
            {isRotating ? <Pause size={13} /> : <Play size={13} />}
            <span>Auto Spin</span>
          </button>

          <button
            onClick={() => setWireframe(!wireframe)}
            className={`px-2 py-1 rounded flex items-center gap-1.5 transition ${
              wireframe ? 'bg-purple-500/30 text-purple-300 border border-purple-500/40' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle Wireframe Mesh"
          >
            <Layers size={13} />
            <span>Wireframe</span>
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div 
        ref={containerRef} 
        className="w-full h-[380px] sm:h-[450px] relative cursor-grab active:cursor-grabbing bg-slate-950"
      />

      {/* Floating 3D Navigation Controls Bar */}
      <div className="px-4 py-2 bg-slate-900/80 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span className="font-medium text-slate-300 flex items-center gap-1">
            <Compass size={14} className="text-cyan-400" /> Height Scale:
          </span>
          <input
            type="range"
            min="0.2"
            max="2.5"
            step="0.1"
            value={zScale}
            onChange={(e) => setZScale(parseFloat(e.target.value))}
            className="w-24 accent-cyan-400 cursor-pointer"
          />
          <span className="font-mono text-cyan-300">{zScale.toFixed(1)}x</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-medium text-slate-300">Resolution:</span>
          <select
            value={surfaceResolution}
            onChange={(e) => setSurfaceResolution(parseInt(e.target.value))}
            className="bg-slate-800 text-slate-200 rounded px-2 py-0.5 border border-slate-700 font-mono text-xs focus:outline-none focus:border-cyan-500"
          >
            <option value={32}>Low (32x32 - Fast)</option>
            <option value={64}>Standard (64x64)</option>
            <option value={96}>Ultra High (96x96)</option>
          </select>
        </div>

        <div className="text-[11px] text-slate-400 italic">
          💡 Drag to rotate • Scroll to zoom • Right-click to pan
        </div>
      </div>
    </div>
  );
};
