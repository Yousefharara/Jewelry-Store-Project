// "use client";
// import { Canvas } from "@react-three/fiber";
// import { XR, createXRStore, useXR, useXRHitTest } from "@react-three/xr";
// import { useRef } from "react";
// import { Matrix4, Quaternion, Vector3, Group } from "three";
// import RingModel from "@/components/ui/RingModel";

// const store = createXRStore({
//   hitTest: true,
//   offerSession: "immersive-ar",
// });

// function RingOnFinger() {
//   const ref = useRef<Group>(null);
//   const { originReferenceSpace } = useXR();

//   const position = new Vector3();
//   const rotation = new Quaternion();
//   const matrix = new Matrix4();

//   useXRHitTest((hitTestResults) => {
//     if (!ref.current || !hitTestResults[0] || !originReferenceSpace) return;

//     const pose = hitTestResults[0].getPose(originReferenceSpace);
//     if (!pose) return;

//     matrix.fromArray(pose.transform.matrix);
//     matrix.decompose(position, rotation, new Vector3());

//     ref.current.position.copy(position);
//     ref.current.quaternion.copy(rotation);
//   }, "local-floor");

//   return (
//     <group ref={ref} scale={0.05}>
//       <RingModel gem="diamond" metal="platinum" />
//     </group>
//   );
// }

// /*
//   - I'm not sure why isn't working wiht [XRSpace, XROrigin] ??
// */

// // function RingOnFinger() {
// //   return (
// //     <XROrigin>
// //       <XRHandModel />
// //       <XRSpace space="ring-finger-tip">
// //         <group scale={0.03}>
// //           <RingModel gem="diamond" metal="platinum" />
// //         </group>
// //       </XRSpace>
// //     </XROrigin>
// //   );
// // }

// const App = () => {

//   return (
//     <>
//       <button
//         onClick={() => store.enterAR()}
//         className="bg-rose-500 rounded-md text-[16px] px-6 py-2 cursor-pointer top-10 left-10 z-10 absolute"
//       >
//         Enter AR
//       </button>

//       <Canvas style={{ width: "100vw", height: "100vh" }}>
//         <XR store={store}>
//           <RingOnFinger />
//         </XR>
//       </Canvas>
//     </>
//   );
// };

// export default App;

// "use client";
// import HandTracker from "@/components/hand/HandTracker"; // تأكد من وجوده
// import { NormalizedLandmarkList } from "@mediapipe/hands";

// export default function ARPage() {
//   const handleLandmarks = (landmarks : NormalizedLandmarkList) => {         /* ################# */
//     console.log("Landmarks detected:", landmarks);
//     // تقدر تستخدم هذه الإحداثيات لعرض الخاتم
//   };

//   return (
//     <div>
//       <h1 className="text-center text-2xl mt-4">Show your hand to the camera</h1>
//       <HandTracker onResults={handleLandmarks} />
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import HandTracker from "@/components/hand/HandTracker";
import { NormalizedLandmarkList } from "@mediapipe/hands";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Vector3 } from "three";
import RingModel from "@/components/ui/RingModel";

export default function ARPage() {
  const [ringPosition, setRingPosition] = useState<Vector3 | null>(null);

  const handleLandmarks = (landmarks: NormalizedLandmarkList) => {
    if (landmarks.length > 16) {
      const { x, y, z } = landmarks[16]; // Ring finger tip
      setRingPosition(new Vector3(x * 2 - 1, -y * 2 + 1, -z)); // normalized to WebGL
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
        {ringPosition && (
          <group position={ringPosition} scale={0.05}>
            <RingModel metal="platinum" gem="diamond" />
          </group>
        )}
      </Canvas>
    </div>
  );
}
