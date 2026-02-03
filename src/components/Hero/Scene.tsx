"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform vec3 uGridColor;

  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    // Aspect ratio correction
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;

    // Apply perspective distortion (converging lines toward top)
    vec2 centeredUv = uv - 0.5;
    float perspectiveStrength = 0.4;
    float yFactor = 1.0 + centeredUv.y * perspectiveStrength;
    centeredUv.x *= yFactor;
    uv = centeredUv + 0.5;

    // Scale and aspect correct
    uv.x *= aspect;

    // Grid parameters
    float gridSize = 25.0;
    vec2 grid = uv * gridSize;

    // Create grid lines
    vec2 gridFract = fract(grid);
    float lineWidth = 0.03;

    // Horizontal and vertical lines
    float hLine = smoothstep(lineWidth, 0.0, gridFract.y) + smoothstep(1.0 - lineWidth, 1.0, gridFract.y);
    float vLine = smoothstep(lineWidth, 0.0, gridFract.x) + smoothstep(1.0 - lineWidth, 1.0, gridFract.x);
    float lines = max(hLine, vLine);

    // Mouse position (normalized and aspect corrected)
    vec2 mousePos = uMouse;

    // Apply same perspective to mouse
    vec2 centeredMouse = mousePos - 0.5;
    float mousePerspective = 1.0 + centeredMouse.y * perspectiveStrength;
    centeredMouse.x *= mousePerspective;
    mousePos = centeredMouse + 0.5;
    mousePos.x *= aspect;

    // Distance from mouse to current UV
    vec2 currentUv = uv;
    float dist = length(currentUv - mousePos);

    // Glow effect - exponential falloff
    float glowRadius = 0.15;
    float glow = exp(-dist * dist / (glowRadius * glowRadius));
    glow = pow(glow, 1.5);

    // Fade grid toward edges (softer vignette)
    vec2 vignette = smoothstep(0.0, 0.15, vUv) * smoothstep(1.0, 0.85, vUv);
    float vignetteFactor = vignette.x * vignette.y;

    // Base opacity - visible but subtle
    float baseOpacity = 0.4;

    // Final alpha with glow boost
    float alpha = lines * (baseOpacity + glow * 0.5) * vignetteFactor;

    // Color - subtle base, bright on glow
    vec3 baseColor = uGridColor * 0.4;
    vec3 glowColor = uGridColor * 2.0;
    vec3 finalColor = mix(baseColor, glowColor, glow);

    // Add slight bloom around glow area
    float bloom = glow * 0.15;
    alpha += bloom * vignetteFactor;

    // Clamp alpha
    alpha = clamp(alpha, 0.0, 0.7);

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

function PerspectiveGrid() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, size } = useThree();
  const mousePos = useRef({ x: 0.5, y: 0.5 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uGridColor: { value: new THREE.Color("#ea580c") },
    }),
    [size.width, size.height],
  );

  useFrame((state) => {
    if (!materialRef.current) return;

    // Update time
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

    // Smooth mouse tracking
    const targetX = (state.pointer.x + 1) / 2;
    const targetY = (state.pointer.y + 1) / 2;

    mousePos.current.x += (targetX - mousePos.current.x) * 0.06;
    mousePos.current.y += (targetY - mousePos.current.y) * 0.06;

    materialRef.current.uniforms.uMouse.value.set(
      mousePos.current.x,
      mousePos.current.y,
    );
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function Scene() {
  return <PerspectiveGrid />;
}
