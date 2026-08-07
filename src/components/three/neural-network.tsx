// @ts-nocheck
"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function NeuralNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 200;
  const radius = 4;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.6 + Math.random() * 0.4);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
  });

  const nodeSize = 0.025;

  return (
    <group ref={groupRef}>
      {Array.from({ length: count }).map((_, i) => {
        const x = positions[i * 3];
        const y = positions[i * 3 + 1];
        const z = positions[i * 3 + 2];
        return (
          <Float key={i} speed={1 + Math.random() * 2} floatIntensity={0.3}>
            <mesh position={[x, y, z]}>
              <sphereGeometry args={[nodeSize, 8, 8]} />
              <meshBasicMaterial
                color={new THREE.Color().setHSL(0.58 + Math.random() * 0.08, 0.8, 0.6)}
                transparent
                opacity={0.6 + Math.random() * 0.4}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

function Connections() {
  const linesRef = useRef<THREE.Group>(null);
  const connectionCount = 80;

  const lines = useMemo(() => {
    const result: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];
    const radius = 3.6;

    for (let i = 0; i < connectionCount; i++) {
      const theta1 = Math.random() * Math.PI * 2;
      const phi1 = Math.acos(2 * Math.random() - 1);
      const r1 = radius * (0.6 + Math.random() * 0.4);

      const theta2 = theta1 + (Math.random() - 0.5) * 1.5;
      const phi2 = phi1 + (Math.random() - 0.5) * 1.5;
      const r2 = radius * (0.6 + Math.random() * 0.4);

      result.push({
        start: new THREE.Vector3(
          r1 * Math.sin(phi1) * Math.cos(theta1),
          r1 * Math.sin(phi1) * Math.sin(theta1),
          r1 * Math.cos(phi1)
        ),
        end: new THREE.Vector3(
          r2 * Math.sin(phi2) * Math.cos(theta2),
          r2 * Math.sin(phi2) * Math.sin(theta2),
          r2 * Math.cos(phi2)
        ),
      });
    }
    return result;
  }, []);

  useFrame((state) => {
    if (!linesRef.current) return;
    linesRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    linesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
  });

  return (
    <group ref={linesRef}>
      {lines.map((line, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                line.start.x,
                line.start.y,
                line.start.z,
                line.end.x,
                line.end.y,
                line.end.z,
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={new THREE.Color().setHSL(0.52, 0.7, 0.5)}
            transparent
            opacity={0.08 + Math.random() * 0.12}
          />
        </line>
      ))}
    </group>
  );
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const count = 500;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#3b82f6"
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#3b82f6" />
      <pointLight position={[-5, -3, -2]} intensity={0.4} color="#06b6d4" />
    </>
  );
}

export function NeuralNetwork() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10" />
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <SceneLights />
        <NeuralNodes />
        <Connections />
        <ParticleField />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}