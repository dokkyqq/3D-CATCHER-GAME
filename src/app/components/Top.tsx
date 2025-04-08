'use client'

import { useStore } from '@/store/useStore'

export default function Top() {
  const score = useStore(state => state.score)
  return (
    <div className='absolute top-0 z-10 flex h-12 w-full rounded-br-2xl rounded-bl-2xl bg-fuchsia-300 opacity-80'>
      <span className='self-end'>{score}</span>
    </div>
  )
}
