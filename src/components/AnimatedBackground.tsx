import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export type BackgroundMode = 'bio-neural' | 'molecular' | 'quantum-fluid';

interface AnimatedBackgroundProps {
  mode?: BackgroundMode;
  onModeChange?: (mode: BackgroundMode) => void;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  mode = 'bio-neural',
  onModeChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentMode, setCurrentMode] = useState<BackgroundMode>(mode);
  const [isHoveredControls, setIsHoveredControls] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef({ y: 0, targetY: 0 });

  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 85;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Particle parameters
    const particleCount = currentMode === 'molecular' ? 160 : currentMode === 'quantum-fluid' ? 240 : 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Color definitions based on mode
    const colorA = new THREE.Color(
      currentMode === 'molecular' ? 0x10b981 : currentMode === 'quantum-fluid' ? 0x8b5cf6 : 0x06b6d4
    );
    const colorB = new THREE.Color(
      currentMode === 'molecular' ? 0x38bdf8 : currentMode === 'quantum-fluid' ? 0x06b6d4 : 0x6366f1
    );

    const radius = 60;
    for (let i = 0; i < particleCount; i++) {
      let x = 0, y = 0, z = 0;

      if (currentMode === 'molecular') {
        // Hexagonal / molecular grid structure
        const u = (i % 12) - 6;
        const v = Math.floor(i / 12) - 6;
        x = u * 10 + (v % 2 === 0 ? 0 : 5) + (Math.random() - 0.5) * 4;
        y = v * 8 + (Math.random() - 0.5) * 4;
        z = (Math.random() - 0.5) * 30;
      } else if (currentMode === 'quantum-fluid') {
        // Wavy fluid field
        const theta = (i / particleCount) * Math.PI * 4;
        const r = 10 + ((i % 20) / 20) * radius;
        x = Math.cos(theta) * r + (Math.random() - 0.5) * 6;
        y = Math.sin(theta) * r + (Math.random() - 0.5) * 6;
        z = Math.sin(i * 0.2) * 20;
      } else {
        // Bio-neural 3D cluster
        const phi = Math.acos(-1 + (2 * i) / particleCount);
        const theta = Math.sqrt(particleCount * Math.PI) * phi;
        const r = 25 + Math.random() * 35;
        x = r * Math.cos(theta) * Math.sin(phi);
        y = r * Math.sin(theta) * Math.sin(phi);
        z = r * Math.cos(phi) * 0.7;
      }

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      velocities[i * 3] = (Math.random() - 0.5) * 0.05;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05;

      const mixed = colorA.clone().lerp(colorB, Math.random());
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Point Material with soft glow circle texture
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(56, 189, 248, 0.8)');
      grad.addColorStop(0.7, 'rgba(6, 182, 212, 0.2)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const pointMaterial = new THREE.PointsMaterial({
      size: currentMode === 'molecular' ? 3.5 : 3.0,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pointCloud = new THREE.Points(geometry, pointMaterial);
    scene.add(pointCloud);

    // Connected Synapse/Bond Lines
    const maxConnections = particleCount * 6;
    const linePositions = new Float32Array(maxConnections * 3 * 2);
    const lineColors = new Float32Array(maxConnections * 3 * 2);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // Mouse & Scroll Handlers
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollRef.current.targetY = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      scrollRef.current.y += (scrollRef.current.targetY - scrollRef.current.y) * 0.05;

      const pos = geometry.attributes.position.array as Float32Array;
      const connectionDistance = currentMode === 'molecular' ? 14 : currentMode === 'quantum-fluid' ? 16 : 18;
      let lineIndex = 0;

      // Animate Particles
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Wave physics based on mode & time
        if (currentMode === 'quantum-fluid') {
          pos[i3] = originalPositions[i3] + Math.sin(elapsedTime * 1.2 + originalPositions[i3 + 1] * 0.1) * 3;
          pos[i3 + 1] = originalPositions[i3 + 1] + Math.cos(elapsedTime * 1.5 + originalPositions[i3] * 0.1) * 3;
          pos[i3 + 2] = originalPositions[i3 + 2] + Math.sin(elapsedTime * 0.8 + originalPositions[i3 + 2] * 0.1) * 4;
        } else if (currentMode === 'molecular') {
          pos[i3] += velocities[i3];
          pos[i3 + 1] += velocities[i3 + 1];
          pos[i3 + 2] += velocities[i3 + 2];

          // Restoring force to lattice node
          pos[i3] += (originalPositions[i3] - pos[i3]) * 0.02;
          pos[i3 + 1] += (originalPositions[i3 + 1] - pos[i3 + 1]) * 0.02;
          pos[i3 + 2] += (originalPositions[i3 + 2] - pos[i3 + 2]) * 0.02;
        } else {
          // Bio-neural subtle synaptic oscillation
          pos[i3] = originalPositions[i3] + Math.sin(elapsedTime * 0.8 + i * 0.2) * 2;
          pos[i3 + 1] = originalPositions[i3 + 1] + Math.cos(elapsedTime * 0.9 + i * 0.2) * 2;
          pos[i3 + 2] = originalPositions[i3 + 2] + Math.sin(elapsedTime * 0.6 + i * 0.3) * 2;
        }

        // Interactive mouse deflection in 3D
        const dx = pos[i3] - mouseRef.current.x * 40;
        const dy = pos[i3 + 1] - mouseRef.current.y * 40;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 22) {
          const force = (22 - dist) / 22;
          pos[i3] += (dx / dist) * force * 1.5;
          pos[i3 + 1] += (dy / dist) * force * 1.5;
        }

        // Check connections for lines
        for (let j = i + 1; j < particleCount; j++) {
          const j3 = j * 3;
          const distSq =
            (pos[i3] - pos[j3]) ** 2 +
            (pos[i3 + 1] - pos[j3 + 1]) ** 2 +
            (pos[i3 + 2] - pos[j3 + 2]) ** 2;

          if (distSq < connectionDistance * connectionDistance && lineIndex < maxConnections - 1) {
            const alpha = 1.0 - Math.sqrt(distSq) / connectionDistance;

            linePositions[lineIndex * 6] = pos[i3];
            linePositions[lineIndex * 6 + 1] = pos[i3 + 1];
            linePositions[lineIndex * 6 + 2] = pos[i3 + 2];
            linePositions[lineIndex * 6 + 3] = pos[j3];
            linePositions[lineIndex * 6 + 4] = pos[j3 + 1];
            linePositions[lineIndex * 6 + 5] = pos[j3 + 2];

            const colI_R = colors[i3] * alpha * 0.8;
            const colI_G = colors[i3 + 1] * alpha * 0.8;
            const colI_B = colors[i3 + 2] * alpha * 0.8;

            lineColors[lineIndex * 6] = colI_R;
            lineColors[lineIndex * 6 + 1] = colI_G;
            lineColors[lineIndex * 6 + 2] = colI_B;
            lineColors[lineIndex * 6 + 3] = colI_R;
            lineColors[lineIndex * 6 + 4] = colI_G;
            lineColors[lineIndex * 6 + 5] = colI_B;

            lineIndex++;
          }
        }
      }

      geometry.attributes.position.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineIndex * 2);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      // Rotate scene subtly based on time and scroll position
      pointCloud.rotation.y = elapsedTime * 0.04 + scrollRef.current.y * Math.PI * 1.5;
      pointCloud.rotation.x = mouseRef.current.y * 0.25 + scrollRef.current.y * 0.5;
      pointCloud.rotation.z = mouseRef.current.x * 0.15;

      lineMesh.rotation.copy(pointCloud.rotation);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      lineGeometry.dispose();
      pointMaterial.dispose();
      lineMaterial.dispose();
      particleTexture.dispose();
    };
  }, [currentMode]);

  const modes: { id: BackgroundMode; label: string; icon: string }[] = [
    { id: 'bio-neural', label: 'Bio-Neural Web', icon: '🧠' },
    { id: 'molecular', label: 'Molecular Lattice', icon: '🧬' },
    { id: 'quantum-fluid', label: 'Quantum Fluid', icon: '⚛️' },
  ];

  const handleSelectMode = (newMode: BackgroundMode) => {
    setCurrentMode(newMode);
    if (onModeChange) onModeChange(newMode);
  };

  return (
    <>
      {/* Three.js Canvas Container */}
      <div
        ref={containerRef}
        id="three-background-canvas"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{ opacity: 0.88 }}
      />

      {/* Floating Interactive 3D Canvas Mode Switcher Badge */}
      <div
        id="bg-mode-switcher"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-1.5 p-1.5 rounded-full bg-slate-950/80 border border-cyan-500/20 backdrop-blur-md shadow-2xl text-xs text-slate-300 transition-all duration-300 hover:border-cyan-400/50"
        onMouseEnter={() => setIsHoveredControls(true)}
        onMouseLeave={() => setIsHoveredControls(false)}
      >
        <span className="px-2.5 py-1 text-[11px] font-mono text-cyan-400 flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
          3D Canvas:
        </span>
        <div className="flex items-center gap-1">
          {modes.map((m) => (
            <button
              key={m.id}
              id={`bg-mode-btn-${m.id}`}
              onClick={() => handleSelectMode(m.id)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all duration-200 flex items-center gap-1 ${
                currentMode === m.id
                  ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span>{m.icon}</span>
              <span className="hidden sm:inline">{m.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
