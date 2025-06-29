"use client";

import { useEffect, useRef } from "react";
import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import type { NormalizedLandmark } from "@mediapipe/tasks-vision";

type Props = {
  onResults: (landmarks: NormalizedLandmark[]) => void;
};

export default function HandTracker({ onResults }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let landmarker: HandLandmarker | null = null;
    let stream: MediaStream | null = null;
    let animationId: number;

    const init = async () => {
      if (!videoRef.current) return;
      if (videoRef.current.srcObject) {
        console.log("Camera already initialized, skipping re-init");
        return;
      }
      console.log("Hand tracking initialized successfully!");

      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
      );

      landmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numHands: 1,
      });

      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: 320, height: 240 },
      });
      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      let lastTime = -1;

      const predict = async () => {
        if (!videoRef.current || !landmarker) return;
        const now = performance.now();

        if (videoRef.current.currentTime !== lastTime) {
          lastTime = videoRef.current.currentTime;

          const result = landmarker.detectForVideo(videoRef.current, now);

          if (result.landmarks && result.landmarks.length > 0) {
            const ringTip = result.landmarks[0][16];
            console.log("Ring tip landmark:", ringTip);
            onResults(result.landmarks[0]);
          }
        }

        animationId = requestAnimationFrame(predict);
      };

      predict();
    };

    init();

    return () => {
      cancelAnimationFrame(animationId);
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div className="flex justify-center mt-4">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        width={640}
        height={480}
        style={{ transform: "scaleX(-1)", borderRadius: 8 }}
      />
    </div>
  );
}
