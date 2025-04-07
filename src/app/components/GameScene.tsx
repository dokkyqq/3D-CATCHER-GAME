'use client'

import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'

const BasketModel = dynamic(() => import('./BasketModel'))

const width = window.innerWidth

export default function GameScene() {
  const [x, setX] = useState(0)

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    const percentX = touch.clientX / width
    const posX = (percentX - 0.5) * 4
    // Ограничиваем движение корзины
    const minX = -1.5
    const maxX = 1.5
    const finalPosX = Math.max(minX, Math.min(maxX, posX))

    // Обновляем состояние с новой позицией
    console.log(width)
    setX(finalPosX)
  }, [])

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        touchAction: 'none',
        background: 'linear-gradient(45deg, #ff6ec7, #ff9a8b, #ff77b8)',
        backgroundSize: '400% 400%',
        animation: 'gradient 5s ease infinite', // Анимация плавного градиента
        zIndex: -1
      }}
      onTouchMove={handleTouchMove} // Обработчик движения касания
    >
      {/* Анимация облаков */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '500%',
          height: '100%',
          background:
            'url(https://www.transparenttextures.com/patterns/asfalt-light.png)',
          animation: 'clouds 50s linear infinite',
          zIndex: 1
        }}
      ></div>

      {/* 3D сцена с корзиной */}
      <Canvas
        style={{ position: 'relative', zIndex: 3 }}
        camera={{ position: [0, 2, 6] }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <pointLight position={[10, 10, 10]} />
        <BasketModel x={x} />
      </Canvas>
    </div>
  )
}
