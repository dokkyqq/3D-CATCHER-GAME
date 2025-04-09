'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Start() {
  if (window.Telegram) {
    const tg = window.Telegram.WebApp
    const user = tg.initDataUnsafe?.user
    if (user) {
      const avatarUrl = `https://ui-avatars.com/api/?name=${user.first_name}&background=random`
      return (
        <div className='h-100vh h-full w-full bg-amber-100'>
          <div className='container mx-auto px-4'>
            <div className='flex flex-col justify-center pt-40'>
              <Image
                className='mb-5 self-center rounded-[50%]'
                src={avatarUrl}
                width={80}
                height={80}
                alt='icon'
              />
              <div className='mb-5 text-center text-2xl text-neutral-600'>
                <p>Добро пожаловать:</p>
                <p>
                  {user.first_name} {user.last_name}
                </p>
              </div>
              <Link
                href='/game'
                className='rounded-2xl bg-amber-200 p-5 text-center text-3xl text-neutral-600'
              >
                Начать игру
              </Link>
            </div>
          </div>
        </div>
      )
    }
  } else {
    return (
      <div className='h-100vh h-full w-full bg-amber-100'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col justify-center pt-40'>
            <Image
              className='mb-5 self-center rounded-[50%]'
              src={'/avatar.jpeg'}
              width={80}
              height={80}
              alt='icon'
            />
            <div className='mb-5 text-center text-2xl text-neutral-600'>
              <p>Добро пожаловать:</p>
              <p>Frederico Paretto</p>
            </div>
            <Link
              href='/game'
              className='rounded-2xl bg-amber-200 p-5 text-center text-3xl text-neutral-600'
            >
              Начать игру
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
