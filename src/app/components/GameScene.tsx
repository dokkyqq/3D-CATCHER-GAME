'use client'

import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'

// import * as THREE from 'three'

import FallingProduct from './FallingProduct'

const BasketModel = dynamic(() => import('./BasketModel'))
const productModels = [
  '/models/cherry_milk.glb',
  // '/models/kitty_breggfast.glb',
  '/models/bananya_birbo.glb'
]

let width = 0
if(typeof window !== 'undefined') {
  width = window.innerWidth / 4
}

export default function GameScene() {
  const [x, setX] = useState(0)
  console.log(width);
  
  const [products, setProducts] = useState<
    Array<{ id: string; x: number; speed: number; model: string }>
  >([])

  const handleCatch = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const handleMiss = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

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

  // Генерация падающих продуктов
  useEffect(() => {
    const interval = setInterval(() => {
      const randomX = Math.random() * 3 - 1.5
      const randomSpeed = Math.random() * 0.03 + 0.015
      const randomModel =
        productModels[Math.floor(Math.random() * productModels.length)]

      setProducts(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          x: randomX,
          speed: randomSpeed,
          model: randomModel
        }
      ])
    }, 1500)

    return () => clearInterval(interval)
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
        shadows
        gl={{ antialias: true }}
        camera={{ position: [0, 2, 6], fov: 50 }}
        style={{ position: 'relative', zIndex: 3 }}
        // toneMapping={THREE.ACESFilmicToneMapping}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        {products.map(product => (
          <FallingProduct
            key={product.id}
            id={product.id}
            positionX={product.x}
            speed={product.speed}
            modelPath={product.model}
            basketX={x}
            onCatch={handleCatch}
            onMiss={handleMiss}
          />
        ))}
        <BasketModel x={x} />
      </Canvas>
    </div>
  )
}
