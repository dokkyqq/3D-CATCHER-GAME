'use client'

import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'

export default function BasketModel({ x }: { x: number }) {
  const gltf = useGLTF('/models/basket.glb')
  let rotation = 0
  console.log(x);
  
  if (x === -1.5) {
    rotation = 0.2
  }

  if (x === 1.5) {
    rotation = -0.2
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gltf.scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true

        // Задаём материал вручную
        child.material = new THREE.MeshStandardMaterial({
          color: '#da378b',
          metalness: 0.5,
          roughness: 0.8
        })
      }
    })
  }, [gltf])

  return (
    <primitive
      object={gltf.scene}
      position={[x, -3, 0]}
      scale={[1, 1, 1]}
      rotation={[-0.3, Math.PI, rotation]}
    />
  )
}
