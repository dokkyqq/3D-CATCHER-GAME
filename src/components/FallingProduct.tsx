'use client'

import { useGLTF } from '@react-three/drei'
import { useRef, useState } from 'react'
import { Group } from 'three'
import { useFrame } from '@react-three/fiber'
import useSound from 'use-sound'
import { useStore } from '@/store/useStore'

interface FallingProductProps {
  id: string
  modelPath: string
  positionX: number
  speed?: number
  basketX: number
  onCatch: (id: string) => void
  onMiss: (id: string) => void
}

export default function FallingProduct({
  id,
  modelPath,
  positionX,
  speed = 0.035,
  basketX,
  onCatch,
  onMiss
}: FallingProductProps) {
  const { scene } = useGLTF(modelPath)
  const ref = useRef<Group>(null)
  const increaseScore = useStore(state => state.increaseScore)

  // Безопасные и ограниченные скорости вращения
  const [rotationSpeedX] = useState(() => Math.random() * 0.01 + 0.005)
  const [rotationSpeedY] = useState(() => Math.random() * 0.01 + 0.005)
  const [rotationSpeedZ] = useState(() => Math.random() * 0.005 + 0.002)

  const [isBounced, setIsBounced] = useState(false)
  const [isFallingMissed, setIsFallingMissed] = useState(false)
  const [bounceDirection] = useState(() => (Math.random() > 0.5 ? 1 : -1))
  const [hasChecked, setHasChecked] = useState(false)

  const [playHit] = useSound('/sounds/hit.mp3', { volume: 0.5 })

  useFrame(() => {
    if (!ref.current) return

    // Основное падение
    if (!isBounced && !isFallingMissed) {
      ref.current.position.y -= speed
      ref.current.rotation.x += rotationSpeedX
      ref.current.rotation.y += rotationSpeedY

      if (ref.current.position.y < -2.5 && !hasChecked) {
        setHasChecked(true)

        const px = ref.current.position.x
        const catchZoneLeft = basketX - 0.6
        const catchZoneRight = basketX + 0.6
        const edgeZoneLeft = basketX - 1.2
        const edgeZoneRight = basketX + 1.2

        if (px >= catchZoneLeft && px <= catchZoneRight) {
          playHit() // Звук попадания
          onCatch(id)
          increaseScore()
        } else if (px >= edgeZoneLeft && px <= edgeZoneRight) {
          setIsBounced(true)
          setTimeout(() => onMiss(id), 1000)
        } else {
          setTimeout(() => setIsFallingMissed(true), 1000)
        }
      }
    }

    // Анимация отскока от ручки или краёв
    else if (isBounced) {
      ref.current.position.y += 0.02
      ref.current.position.x += 0.02 * bounceDirection
      ref.current.rotation.x += rotationSpeedX
      ref.current.rotation.y += rotationSpeedY
      ref.current.rotation.z += rotationSpeedZ * bounceDirection
    }

    // Ушло мимо корзины — плавное исчезновение вниз
    else if (isFallingMissed) {
      ref.current.position.y -= 0.08
      ref.current.rotation.x += rotationSpeedX
      ref.current.rotation.y += rotationSpeedY

      if (ref.current.position.y < -5) {
        onMiss(id)
      }
    }
  })

  return (
    <primitive
      object={scene}
      ref={ref}
      position={[positionX, 5, 0]}
      scale={[0.2, 0.2, 0.2]}
    />
  )
}