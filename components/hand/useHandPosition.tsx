"use client";
import { useState, useCallback } from "react";
import HandTracker from "./HandTracker";

import { NormalizedLandmarkList } from "@mediapipe/hands";
export default function useHandPosition() {
  const [position, setPosition] = useState<{
    x: number;
    y: number;
    z: number;
  } | null>(null);

  const handleLandmarks = useCallback((landmarks: NormalizedLandmarkList) => {
    const ringTip = landmarks[16];
    setPosition({ x: ringTip.x, y: ringTip.y, z: ringTip.z });
  }, []);

  const tracker = <HandTracker onResults={handleLandmarks} />;

  return { position, tracker };
}
