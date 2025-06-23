'use client'

import { Canvas } from '@react-three/fiber'
import { XR, createXRStore } from '@react-three/xr'
import RingModel from '../ui/RingModel'
import { useProduct } from '@/context/ProductContext'

const store = createXRStore()

export default function VRViewer() {
  const { selectedMetal, selectedGem } = useProduct()

  return (
    <>
      <button 
        onClick={() => store.enterVR()}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Enter VR
      </button>

      <Canvas>
        <XR store={store}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <RingModel metal={selectedMetal} gem={selectedGem} />
        </XR>
      </Canvas>
    </>
  )
}
