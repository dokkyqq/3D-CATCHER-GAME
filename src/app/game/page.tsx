import Top from '@/components/Top'
import dynamic from 'next/dynamic'

const GameScene = dynamic(() => import('@/components/GameScene'))

export default function Home() {
  return (
    <div className='relative h-[100vh] w-full overflow-hidden'>
      <Top />
      <GameScene />
    </div>
  )
}
