'use client'

import Image from 'next/image'

import { useGameState } from '@/store/useStore'

export default function Top() {
  const score = useGameState(state => state.score)
  const miss = useGameState(state => state.misses)
  return (
    <div className='absolute top-0 z-10 flex h-14 w-full items-center justify-end rounded-br-2xl rounded-bl-2xl bg-fuchsia-300 p-2 opacity-80'>
      <div className='mr-5 text-4xl text-red-500'>{miss}</div>
      <div className='mr-3 flex items-center gap-2'>
        <Image src={'/coin.svg'} width={40} height={40} alt='coin' />
        <span className='text-4xl'>{score}</span>
      </div>
    </div>
  )
}
