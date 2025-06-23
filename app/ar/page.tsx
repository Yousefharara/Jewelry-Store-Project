// "use client";

// import { Canvas } from "@react-three/fiber";
// import { XR, createXRStore } from "@react-three/xr";
// import { useProduct } from "@/context/ProductContext";
// import RingModel from "@/components/ui/RingModel";

// const store = createXRStore();

// export default function ARPage() {
//   const { selectedMetal, selectedGem } = useProduct();

//   return (
//     <>
//       <button onClick={() => store.enterAR()} className="mb-4 px-4 py-2 bg-blue-600 text-white rounded">Enter AR</button>

//       <Canvas>
//         <XR store={store}>
//           <ambientLight intensity={0.5} />
//           <directionalLight position={[5, 5, 5]} intensity={1} />
//           <RingModel metal={selectedMetal} gem={selectedGem} />
//         </XR>
//       </Canvas>
//     </>
//   );
// }


// "use client";
// import { Canvas } from "@react-three/fiber";
// import { XR, createXRStore, useXR, useXRHitTest } from "@react-three/xr";
// import { useRef } from "react";
// import { Group, Matrix4, Vector3, Quaternion } from "three";
// import RingModel from "@/components/ui/RingModel";

// const store = createXRStore();

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
//     <group ref={ref} scale={0.02}>
//       <RingModel gem="diamond" metal="platinum" />
//     </group>
//   );
// }

// export default function App() {
//   return (
//     <>
//       <button onClick={() => store.enterAR()}>Enter AR</button>
//       <Canvas style={{ width: "100vw", height: "100vh" }}>
//         <XR store={store} sessionInit={{ requiredFeatures: ["hit-test"] }}>
//           <RingOnFinger />
//         </XR>
//       </Canvas>
//     </>
//   );
// }


"use client";
import { Canvas } from "@react-three/fiber";
import { XR, XRHandModel, XRHitTest, createXRStore, useXR, useXRHitTest, useXRInputSourceStateContext } from "@react-three/xr";
import { useRef } from "react";
import { Group, Matrix4, Vector3, Quaternion } from "three";
import RingModel from "@/components/ui/RingModel";

const matrixHelper = new Matrix4()
const hitTestPosition = new Vector3()

// 1. مكون يد اليمين - يجب أن يبدأ بحرف كبير (React Component)
function RightHand() {
  const state = useXRInputSourceStateContext("hand"); // بدل useXRHandState

  return (
    <>
      <XRHandModel />
      <XRHitTest
        space={state.inputSource.targetRaySpace}
        onResults={(results, getWorldMatrix) => {
          if (results.length === 0) return;
          getWorldMatrix(matrixHelper, results[0]);
          hitTestPosition.setFromMatrixPosition(matrixHelper);
        }}
      />
    </>
  );
}


// const store = createXRStore();


const store = createXRStore({
  hand: {
    right: RightHand
  },
})


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
  }, "local-floor"); // Use 'local-floor' reference space for hit-test

  return (
    <group ref={ref} scale={0.05}>
      <RingModel gem="diamond" metal="platinum" />
    </group>
  );
}

export default function App() {
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


        <XR
          store={store}
        >
          <RingOnFinger />
        </XR>
      </Canvas>
    </>
  );
}
