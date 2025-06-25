"use client";

import { useEffect, useRef } from "react";
import type { NormalizedLandmarkList } from "@mediapipe/hands";
import HandsModule from "@mediapipe/hands";
import CameraModule from "@mediapipe/camera_utils";

const Hands = HandsModule.Hands;
const Camera = CameraModule.Camera;

type Props = {
  onResults: (landmarks: NormalizedLandmarkList) => void;
};

type MediaPipeCamera = {
  start: () => Promise<void>;
  stop: () => void;
};

export default function HandTracker({ onResults }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let camera: MediaPipeCamera | null = null;

    const init = async () => {
      if (!videoRef.current) return;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      const hands = new Hands({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.8,
        minTrackingConfidence: 0.8,
      });

      hands.onResults((results) => {
        console.log("MediaPipe results:", results);
        if (results.multiHandLandmarks.length > 0) {
          onResults(results.multiHandLandmarks[0]);
        }
      });

      camera = new Camera(videoRef.current!, {
        onFrame: async () => {
          if (
            videoRef.current &&
            videoRef.current.videoWidth > 0 &&
            videoRef.current.videoHeight > 0
          ) {
            await hands.send({ image: videoRef.current! });
          }
        },
        width: 640,
        height: 480,
        facingMode: "environment",
      });

      camera.start();
    };

    init();

    return () => {
      if (camera) camera.stop();
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [onResults]);

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
