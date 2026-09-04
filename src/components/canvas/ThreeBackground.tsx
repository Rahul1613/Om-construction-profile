"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Particle Grid Settings
    const numParticles = 40 * 40;
    const positions = new Float32Array(numParticles * 3);
    const gap = 6;
    
    let k = 0;
    for (let i = 0; i < 40; i++) {
      for (let j = 0; j < 40; j++) {
        // Center the grid around (0,0,0)
        positions[k] = (i - 20) * gap; // x
        positions[k + 1] = (j - 20) * gap; // y
        positions[k + 2] = 0; // z
        k += 3;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Custom Round Particle Texture
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);

    // Particle Material (Steel Blue Color)
    const material = new THREE.PointsMaterial({
      color: 0x172a45,
      size: 1.5,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Grid lines for structural engineering blueprint look
    const gridGeometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];
    
    // Connect particles with lines horizontally and vertically
    for (let i = 0; i < 40; i++) {
      for (let j = 0; j < 40; j++) {
        // Horizontal connection
        if (i < 39) {
          linePositions.push(
            (i - 20) * gap, (j - 20) * gap, 0,
            (i + 1 - 20) * gap, (j - 20) * gap, 0
          );
        }
        // Vertical connection
        if (j < 39) {
          linePositions.push(
            (i - 20) * gap, (j - 20) * gap, 0,
            (i - 20) * gap, (j + 1 - 20) * gap, 0
          );
        }
      }
    }
    
    gridGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0f223f,
      transparent: true,
      opacity: 0.12,
    });
    
    const gridLines = new THREE.LineSegments(gridGeometry, lineMaterial);
    scene.add(gridLines);

    // Light source
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX - window.innerWidth / 2) * 0.08;
      targetMouseY = (event.clientY - window.innerHeight / 2) * 0.08;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    let count = 0;
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      count += 0.01;
      
      // Interpolate mouse movements for smoothness
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Wave physics animation on the grid
      const positionsAttr = particles.geometry.attributes.position as THREE.BufferAttribute;
      const posArray = positionsAttr.array as Float32Array;
      
      const linePosAttr = gridLines.geometry.attributes.position as THREE.BufferAttribute;
      const linePosArray = linePosAttr.array as Float32Array;

      let idx = 0;

      for (let i = 0; i < 40; i++) {
        for (let j = 0; j < 40; j++) {
          const x = (i - 20) * gap;
          const y = (j - 20) * gap;
          
          // Ripple equation + mouse displacement
          const distanceToMouse = Math.sqrt(
            Math.pow(x - mouseX, 2) + Math.pow(y + mouseY, 2)
          );
          
          const displacement = Math.sin(distanceToMouse * 0.1 - count * 2) * 3 * (25 / (distanceToMouse + 25));
          const waveZ = Math.sin(i * 0.15 + count) * 4 + Math.sin(j * 0.15 + count) * 4 + displacement;

          posArray[idx + 2] = waveZ;
          idx += 3;
        }
      }
      
      // Update line segments based on particle heights
      let lineCounter = 0;
      for (let i = 0; i < 40; i++) {
        for (let j = 0; j < 40; j++) {
          // Find particle height
          const p1Idx = (i * 40 + j) * 3;
          const z1 = posArray[p1Idx + 2];
          
          if (i < 39) {
            const p2Idx = ((i + 1) * 40 + j) * 3;
            const z2 = posArray[p2Idx + 2];
            linePosArray[lineCounter + 2] = z1;
            linePosArray[lineCounter + 5] = z2;
            lineCounter += 6;
          }
          
          if (j < 39) {
            const p2Idx = (i * 40 + (j + 1)) * 3;
            const z2 = posArray[p2Idx + 2];
            linePosArray[lineCounter + 2] = z1;
            linePosArray[lineCounter + 5] = z2;
            lineCounter += 6;
          }
        }
      }

      particles.geometry.attributes.position.needsUpdate = true;
      gridLines.geometry.attributes.position.needsUpdate = true;

      // Slow rotation
      particles.rotation.z = count * 0.05;
      gridLines.rotation.z = count * 0.05;

      // Camera responds to mouse
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-brand-charcoal select-none"
      style={{ opacity: 0.8 }}
    />
  );
}
