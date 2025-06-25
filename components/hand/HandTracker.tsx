// "use client";
// import { NormalizedLandmarkList } from "@mediapipe/hands";
// import { useEffect, useRef } from "react";

// import HandsModule from "@mediapipe/hands";
// import CameraModule from "@mediapipe/camera_utils";

// const Hands = HandsModule.Hands;
// const Camera = CameraModule.Camera;

// type Props = {
//   onLandmarks: (landmarks: NormalizedLandmarkList) => void;
// };

// export default function HandTracker({ onLandmarks }: Props) {
//   const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     const hands = new Hands({
//       locateFile: (file) =>
//         `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
//     });

//     hands.setOptions({
//       maxNumHands: 1,
//       modelComplexity: 1,
//       minDetectionConfidence: 0.8,
//       minTrackingConfidence: 0.8,
//     });

//     hands.onResults((results) => {
//       if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
//         onLandmarks(results.multiHandLandmarks[0]);
//       }
//     });

//     if (
//       typeof window !== "undefined" && videoRef.current
//     ) {
//       const camera = new Camera(videoRef.current, {
//         onFrame: async () => {
//           await hands.send({ image: videoRef.current! });
//         },
//         width: 640,
//         height: 480,
//       });

//       camera.start();
//     }
//   }, [onLandmarks]);

//   return (
//     <video
//       ref={videoRef}
//       style={{
//         display: "none", // نخفي الفيديو، نستخدمه فقط للتحليل
//       }}
//     />
//   );
// }

// "use client";
// import { useEffect, useRef } from "react";

// type Props = {
//   onResults?: (landmarks: any) => void;
// };

// export default function HandTracker({ onResults }: Props) {
//   const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     const loadMediaPipe = async () => {
//       const { Hands } = await import("@mediapipe/hands");
//       const { Camera } = await import("@mediapipe/camera_utils");

//       const hands = new Hands({
//         locateFile: (file) =>
//           `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
//       });

//       hands.setOptions({
//         maxNumHands: 1,
//         modelComplexity: 1,
//         minDetectionConfidence: 0.8,
//         minTrackingConfidence: 0.5,
//       });

//       hands.onResults((results) => {
//         if (onResults) onResults(results);
//       });

//       if (videoRef.current) {
//         const camera = new Camera(videoRef.current, {
//           onFrame: async () => {
//             await hands.send({ image: videoRef.current! });
//           },
//           width: 640,
//           height: 480,
//         });
//         camera.start();
//       }
//     };

//     loadMediaPipe();
//   }, [onResults]);

//   return (
//     <video
//       ref={videoRef}
//       style={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         zIndex: -1,
//         width: "100vw",
//         height: "100vh",
//         objectFit: "cover",
//       }}
//       autoPlay
//       playsInline
//       muted
//     />
//   );
// }


// // components/hand/HandTracker.tsx
// "use client";
// import { useEffect, useRef } from "react";
// import type { NormalizedLandmarkList } from "@mediapipe/hands";

// import HandsModule from "@mediapipe/hands";
// import CameraModule from "@mediapipe/camera_utils";

// const Hands = HandsModule.Hands;
// const Camera = CameraModule.Camera;

// type Props = {
//   onResults: (landmarks: NormalizedLandmarkList) => void;
// };

// export default function HandTracker({ onResults }: Props) {
//   const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     if (!videoRef.current) return;

//     const hands = new Hands({
//       locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
//     });

//     hands.setOptions({
//       maxNumHands: 1,
//       modelComplexity: 1,
//       minDetectionConfidence: 0.8,
//       minTrackingConfidence: 0.8,
//     });

//     hands.onResults((results) => {
//       if (results.multiHandLandmarks.length > 0) {
//         onResults(results.multiHandLandmarks[0]);
//       }
//     });

//        // ✅ هنا تحط كود الطباعة
//     hands.onResults((results) => {
//       console.log("MediaPipe results:", results); // ✨ اطبع النتائج
//       // if (results.multiHandLandmarks && onResults) {
//       //   onResults(results.multiHandLandmarks[0]);
//       // }
//     });

//     const camera = new Camera(videoRef.current, {
//       onFrame: async () => {
//         await hands.send({ image: videoRef.current! });
//       },
//       width: 640,
//       height: 480,
//     });

//     camera.start();

//     return () => {
//       camera.stop();
//     };
//   }, [onResults]);

//   return (
//     <div className="flex justify-center mt-4">
//       <video ref={videoRef} style={{ transform: "scaleX(-1)" }} autoPlay muted playsInline />
//     </div>
//   );
// }


// components/hand/HandTracker.tsx
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

export default function HandTracker({ onResults }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

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

    // ✅ فقط مرة وحدة: استقبل النتائج واطبعها وأرسلها
    hands.onResults((results) => {
      console.log("MediaPipe results:", results); // 👈 للتأكد فقط
      if (
        results.multiHandLandmarks &&
        results.multiHandLandmarks.length > 0
      ) {
        onResults(results.multiHandLandmarks[0]); // 👈 أول يد فقط
      } else {
        onResults([]); // 👈 فارغ عند عدم وجود يد
      }
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await hands.send({ image: videoRef.current! });
      },
      width: 640,
      height: 480,
    });

    camera.start();

    return () => {
      camera.stop();
    };
  }, [onResults]);

  return (
    <div className="flex justify-center mt-4">
      <video
        ref={videoRef}
        style={{ transform: "scaleX(-1)" }}
        autoPlay
        muted
        playsInline
      />
    </div>
  );
}


