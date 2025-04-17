import { supabase } from '@/shared/lib/supabase'

interface TelegramUser {
  id: number       // Telegram user ID (числовой)
  name: string     // Имя пользователя
  avatar: string   // Ссылка на аватар
}

export async function saveUser(user: TelegramUser) {
  // Конвертируем числовой ID Telegram в строку для UUID
  const userId = `telegram_${user.id}`

  const { data, error } = await supabase
    .from('users')
    .upsert([{
      id: userId,          // Используем строковый ID
      telegram_id: user.id, // Сохраняем оригинальный ID Telegram
      name: user.name,
      avatar: user.avatar,
      updated_at: new Date().toISOString()
    }])
    .select()

  if (error) {
    console.error('Ошибка при сохранении пользователя:', error.message)
    throw error // Лучше пробрасывать оригинальную ошибку
  }

  return data
}