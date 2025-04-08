import dynamic from 'next/dynamic'

import Top from './components/Top'

const GameScene = dynamic(() => import('./components/GameScene'))

export default function Home() {
  return (
    <div className='relative h-full w-full'>
      <Top />
      <GameScene />
    </div>
  )
}
