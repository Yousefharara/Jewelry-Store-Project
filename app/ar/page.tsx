"use client";
import { Canvas } from "@react-three/fiber";
import { XR, createXRStore, useXR, useXRHitTest } from "@react-three/xr";
import { useRef } from "react";
import { Matrix4, Quaternion, Vector3, Group } from "three";
import RingModel from "@/components/ui/RingModel";

const store = createXRStore({
  hitTest: true,
  offerSession: "immersive-ar",
});

function RingOnFinger() {
  const ref = useRef<Group>(null);
  const { originReferenceSpace } = useXR();

  const position = new Vector3();
  const rotation = new Quaternion();
  const matrix = new Matrix4();

  useXRHitTest((hitTestResults) => {
    if (!ref.current || !hitTestResults[0] || !originReferenceSpace) return;

    const pose = hitTestResults[0].getPose(originReferenceSpace);
    if (!pose) return;

    matrix.fromArray(pose.transform.matrix);
    matrix.decompose(position, rotation, new Vector3());

    ref.current.position.copy(position);
    ref.current.quaternion.copy(rotation);
  }, "local-floor");

  return (
    <group ref={ref} scale={0.05}>
      <RingModel gem="diamond" metal="platinum" />
    </group>
  );
}

/*
  - I'm not sure why isn't working wiht [XRSpace, XROrigin] ??
*/

// function RingOnFinger() {
//   return (
//     <XROrigin>
//       <XRHandModel />
//       <XRSpace space="ring-finger-tip">
//         <group scale={0.03}>
//           <RingModel gem="diamond" metal="platinum" />
//         </group>
//       </XRSpace>
//     </XROrigin>
//   );
// }

const App = () => {
  return (
    <>
      <button
        onClick={() => store.enterAR()}
        style={{
          position: "absolute",
          zIndex: 10,
          top: 20,
          left: 20,
          padding: "10px 20px",
          fontSize: "16px",
        }}
      >
        Enter AR
      </button>

      <Canvas style={{ width: "100vw", height: "100vh" }}>
        <XR store={store}>
          <RingOnFinger />
        </XR>
      </Canvas>
    </>
  );
};

export default App;
