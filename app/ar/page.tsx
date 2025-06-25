"use client";
import { useState, useRef } from "react";
import HandTracker from "@/components/hand/HandTracker";
import type { NormalizedLandmarkList } from "@mediapipe/hands";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import RingModel from "@/components/ui/RingModel";
import { Group, Vector3 } from "three";

function Ring({ position }: { position: { x: number; y: number; z: number } }) {
  const ref = useRef<Group | null>(null);
  const targetPos = new Vector3(position.x, position.y, position.z);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.lerp(targetPos, 0.1);
    }
  });

  return (
    <group ref={ref} scale={0.05}>
      <RingModel metal="platinum" gem="diamond" />
    </group>
  );
}

export default function ARPage() {
  const [ringPos, setRingPos] = useState<{ x: number; y: number; z: number } | null>(null);

  const handleLandmarks = (landmarks: NormalizedLandmarkList) => {
    if (landmarks.length > 16) {
      const { x, y, z } = landmarks[16];
      setRingPos({
        x: x * 2 - 1,
        y: -y * 2 + 1,
        z: -z * 5,
      });
    }
  };

  return (
    <div className="w-full h-screen relative">
      <h1 className="text-center text-2xl mt-2">Show your hand to the camera</h1>

      <div className="w-full h-[60vh]">
        <HandTracker onResults={handleLandmarks} />
      </div>

      <Canvas className="w-full h-[40vh]">
        <PerspectiveCamera makeDefault position={[0, 0, 2]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        {ringPos && <Ring position={ringPos} />}
      </Canvas>
    </div>
  );
}
