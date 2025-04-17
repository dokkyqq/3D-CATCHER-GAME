// shared/lib/telegram.ts
'use client'

import { useEffect, useState } from 'react'

export interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  photo_url?: string
}

export const useTelegramUser = () => {
  const [user, setUser] = useState<TelegramUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsLoading(false)
      return
    }

    const checkTelegram = () => {
      if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
        const tgUser = window.Telegram.WebApp.initDataUnsafe.user
        setUser(tgUser)
        window.Telegram.WebApp.expand() // Раскрываем на весь экран
      }
      setIsLoading(false)
    }

    // Если скрипт уже загружен
    if (window.Telegram) {
      checkTelegram()
    } else {
      // Ждем загрузки скрипта Telegram
      const timer = setInterval(() => {
        if (window.Telegram) {
          clearInterval(timer)
          checkTelegram()
        }
      }, 100)

      return () => clearInterval(timer)
    }
  }, [])

  return { user, isLoading }
}