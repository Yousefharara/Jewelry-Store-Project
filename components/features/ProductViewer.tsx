"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import MaterialSelector, {
  MaterialOptions,
  GemOptions,
} from "./MaterialSelector";
import ProductInfo from "./ProductInfo";
import { useProduct } from "@/context/ProductContext";
import RingModel from "../ui/RingModel";

export default function ProductViewer() {
  const { selectedMetal, selectedGem, setSelectedMetal, setSelectedGem } =
    useProduct();

  const metalOptions = [
    { label: "Gold", value: "gold" },
    { label: "Silver", value: "silver" },
    { label: "Platinum", value: "platinum" },
  ];

  const gemOptions = [
    { label: "Diamond", value: "diamond" },
    { label: "Ruby", value: "ruby" },
    { label: "Emerald", value: "emerald" },
  ];

  return (
    <div className="flex flex-col md:mb-0 mb-7 w-full md:flex-row">
      <div className="flex flex-col items-center w-full">
        <div className="flex gap-6 mt-6">
          <MaterialSelector
            label="Select Metal"
            value={selectedMetal}
            options={metalOptions}
            onChange={(val) => setSelectedMetal(val as MaterialOptions)}
          />
          <MaterialSelector
            label="Select Gem"
            value={selectedGem}
            options={gemOptions}
            onChange={(val) => setSelectedGem(val as GemOptions)}
          />
        </div>

        <div className="h-[50vh] w-full flex justify-center items-center mt-6">
          <Canvas shadows>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
            <ambientLight intensity={0.6} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={1.2}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <RingModel metal={selectedMetal} gem={selectedGem} />
            <OrbitControls
              enableZoom
              minDistance={2}
              maxDistance={4}
              target={[0, 0, 0]}
              autoRotate
              autoRotateSpeed={2.0}
            />
          </Canvas>
        </div>
      </div>

      <ProductInfo metal={selectedMetal} gem={selectedGem} />
    </div>
  );
}
