"use client";

import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import type { Mesh, PointLight } from "three";

type ShapeConfig = {
  pos: [number, number, number];
  scale: number;
  speed: number;
  geo: "torusKnot" | "octahedron" | "icosahedron";
};

const shapes: ShapeConfig[] = [
  { pos: [-3.5, 2, -2], scale: 0.6, speed: 0.3, geo: "torusKnot" },
  { pos: [3.8, -1.5, -3], scale: 0.8, speed: 0.2, geo: "octahedron" },
  { pos: [-2, -2.5, -1], scale: 0.5, speed: 0.4, geo: "icosahedron" },
  { pos: [2.5, 2.5, -4], scale: 0.7, speed: 0.25, geo: "torusKnot" },
  { pos: [0, -3, -2], scale: 0.4, speed: 0.35, geo: "octahedron" },
  { pos: [-4, 0, -3], scale: 0.55, speed: 0.3, geo: "icosahedron" },
];

function FloatingShape({ pos, scale, speed, geo }: ShapeConfig) {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += speed * 0.005;
    meshRef.current.rotation.y += speed * 0.008;
  });

  const geometry = useMemo(() => {
    switch (geo) {
      case "torusKnot":
        return <torusKnotGeometry args={[1, 0.3, 128, 16]} />;
      case "octahedron":
        return <octahedronGeometry args={[1, 0]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[1, 0]} />;
    }
  }, [geo]);

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={meshRef} position={pos} scale={scale}>
        {geometry}
        <MeshDistortMaterial
          color="#ea580c"
          roughness={0.4}
          metalness={0.8}
          distort={0.15}
          speed={1.5}
          opacity={0.15}
          transparent
        />
      </mesh>
    </Float>
  );
}

function MouseLight() {
  const lightRef = useRef<PointLight>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!lightRef.current) return;
    const x = (state.pointer.x * viewport.width) / 2;
    const y = (state.pointer.y * viewport.height) / 2;
    lightRef.current.position.set(x, y, 3);
  });

  return <pointLight ref={lightRef} intensity={2} color="#ea580c" />;
}

export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <MouseLight />
      {shapes.map((s, i) => (
        <FloatingShape key={i} {...s} />
      ))}
    </>
  );
}
