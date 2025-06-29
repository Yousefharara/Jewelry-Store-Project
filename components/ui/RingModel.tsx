import { useRef, useEffect } from "react";
import * as THREE from "three";
import { GemOptions, MaterialOptions } from "../features/MaterialSelector";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

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
  animate?: boolean;
}

const RingModel = ({ metal, gem, animate = true }: RingModelProps) => {
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
    if (animate) {
      if (frame < 120) {
        ref.current.rotation.y += 0.05;
        const scale = THREE.MathUtils.lerp(0.1, 1, frame / 120);
        ref.current.scale.set(scale, scale, scale);
        frame++;
      }
    }
  });

  return <primitive ref={ref} object={scene} />;
};

export default RingModel;
