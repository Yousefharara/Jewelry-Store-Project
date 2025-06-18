"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";

import MaterialSelector, {
  MaterialOptions,
  GemOptions,
} from "./MaterialSelector";
import ProductInfo from "./ProductInfo";
import { useProduct } from "@/context/ProductContext";

const metalMaterials: Record<MaterialOptions, THREE.Material> = {
  gold: new THREE.MeshPhysicalMaterial({
    color: "#FFD700",
    metalness: 1,
    roughness: 0.2,
    clearcoat: 1,
    reflectivity: 1,
  }),
  silver: new THREE.MeshPhysicalMaterial({
    color: "#C0C0C0",
    metalness: 1,
    roughness: 0.1,
    clearcoat: 1,
    reflectivity: 1,
  }),
  platinum: new THREE.MeshPhysicalMaterial({
    color: "#E5E4E2",
    metalness: 1,
    roughness: 0.15,
    clearcoat: 1,
    reflectivity: 1,
  }),
};

const gemMaterials: Record<GemOptions, THREE.Material> = {
  diamond: new THREE.MeshPhysicalMaterial({
    color: "#b9f2ff",
    roughness: 0,
    transmission: 1,
    thickness: 0.5,
    ior: 2.4,
  }),
  ruby: new THREE.MeshPhysicalMaterial({
    color: "#9b111e",
    roughness: 0.05,
    transmission: 0.9,
    thickness: 0.5,
    ior: 2.4,
  }),
  emerald: new THREE.MeshPhysicalMaterial({
    color: "#50C878",
    roughness: 0.05,
    transmission: 0.9,
    thickness: 0.5,
    ior: 2.4,
  }),
};

interface RingModelProps {
  metal: MaterialOptions;
  gem: GemOptions;
}

const RingModel = ({ metal, gem }: RingModelProps) => {
  const { scene } = useGLTF("/models/the_crowned_ring.glb");
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.name === "Round007_1") {
          mesh.material = metalMaterials[metal];
        } else if (mesh.name === "Round007") {
          mesh.material = gemMaterials[gem];
        }
      }
    });

    ref.current.position.set(0, -1, 0);
  }, [metal, gem]);

  let frame = 0;
  useFrame(() => {
    if (!ref.current) return;
    if (frame < 120) {
      ref.current.rotation.y += 0.05;
      const scale = THREE.MathUtils.lerp(0.1, 1, frame / 120);
      ref.current.scale.set(scale, scale, scale);
      frame++;
    }
  });

  return <primitive ref={ref} object={scene} />;
};

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
