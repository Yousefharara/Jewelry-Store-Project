"use client";
import { useState, useRef } from "react";
import HandTracker from "@/components/hand/HandTracker";
import type { NormalizedLandmarkList } from "@mediapipe/hands";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import RingModel from "@/components/ui/RingModel";
import { Group, Vector3 } from "three";

function Ring({ position }: { position: { x: number; y: number; z: number } }) {
  const ref = useRef<Group | null>(null);
  const { camera } = useThree();

  const smoothedPos = useRef(new Vector3());

  useFrame(() => {
    if (!ref.current) return;

    const ndcZ = position.z * -1.5;

    const ndcX = position.x * 2 - 1;
    const ndcY = -position.y * 2 + 1;

    const targetPos = new Vector3(ndcX, ndcY, ndcZ).unproject(camera);

    smoothedPos.current.lerp(targetPos, 0.2);

    ref.current.position.copy(smoothedPos.current);
  });

  return (
    <group ref={ref} scale={0.05}>
      <RingModel metal="platinum" gem="diamond" animate={false} />
    </group>
  );
}

export default function ARPage() {
  const [ringPos, setRingPos] = useState<{
    x: number;
    y: number;
    z: number;
  } | null>(null);

  const handleLandmarks = (landmarks: NormalizedLandmarkList) => {
    if (landmarks.length > 16) {
      const { x, y, z } = landmarks[16];
      setRingPos({ x, y, z });
    }
  };

  return (
    <div className="w-full h-screen relative">
      <h1 className="text-center text-2xl mt-2">
        Show your hand to the camera
      </h1>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <HandTracker onResults={handleLandmarks} />
      </div>

      <Canvas className="absolute inset-0 z-20 pointer-events-none">
        <PerspectiveCamera makeDefault position={[0, 0, 2]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        {ringPos && <Ring position={ringPos} />}
      </Canvas>
    </div>
  );
}
