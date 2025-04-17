'use client'

import { useSaveUser } from '@/features/user/model/useSaveUser'
import { useTelegramUser } from '@/shared/lib/telegram'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Start() {
  const { user, isLoading } = useTelegramUser()
  const { mutate: saveUser } = useSaveUser()

  // Сохраняем пользователя только при первом получении данных
  useEffect(() => {
    if (user) {
      const avatarUrl = user.photo_url || 
                       `https://ui-avatars.com/api/?name=${user.first_name}&background=random`
      saveUser({ 
        id: user.id, 
        avatar: avatarUrl, 
        name: user.first_name 
      })
    }
  }, [user, saveUser]) // Зависимости - user и saveUser

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-amber-100 flex items-center justify-center">
        <p>Загрузка...</p>
      </div>
    )
  }

  const avatarUrl = user?.photo_url || 
                   `https://ui-avatars.com/api/?name=${user?.first_name || 'User'}&background=random`

  return (
    <div className='h-screen w-full bg-amber-100'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col justify-center pt-40'>
          <Image
            className='mb-5 self-center rounded-full'
            src={avatarUrl}
            width={80}
            height={80}
            alt="User avatar"
            priority
          />
          <div className='mb-5 text-center text-2xl text-neutral-600'>
            <p>Добро пожаловать:</p>
            <p>
              {user ? `${user.first_name} ${user.last_name || ''}` : 'Гость'}
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