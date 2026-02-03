"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, lazy, useState, useEffect } from "react";

const Scene = lazy(() => import("./Scene"));

const HeroBackground = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  if (reducedMotion) {
    return (
      <div
        className="absolute inset-0 z-0 bg-gradient-to-br from-background via-[rgb(39,39,42)] to-background opacity-60"
        aria-hidden="true"
      />
    );
  }

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        orthographic
        camera={{ zoom: 1, position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroBackground;
