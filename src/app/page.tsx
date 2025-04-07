import dynamic from 'next/dynamic'

const GameScene = dynamic(() => import('./components/GameScene'))

export default function Home() {
  return (
    <div className='h-full w-full'>
      <GameScene />
    </div>
  )
}
