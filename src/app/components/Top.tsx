'use client'

import Image from 'next/image'

import { useStore } from '@/store/useStore'

export default function Top() {
  const score = useStore(state => state.score)
  return (
    <div className='absolute top-0 z-10 flex h-14 w-full justify-end rounded-br-2xl rounded-bl-2xl bg-fuchsia-300 p-2 opacity-80'>
      <div className='mr-3 flex items-center gap-2'>
        <Image src={'/coin.svg'} width={40} height={40} />
        <span className='text-4xl'>{score}</span>
      </div>
    </div>
  )
}
