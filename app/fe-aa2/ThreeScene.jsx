"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Scene({ status }) {
  let color = "#6366f1";

  if (status === "completed") {
    color = "#22c55e";
  }

  if (status === "overdue") {
    color = "#ef4444";
  }

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={1} />

      <mesh rotation={[0.4, 0.4, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  );
}

export default function ThreeScene({ status }) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
      <Scene status={status} />
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
}