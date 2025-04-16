import { supabase } from '@/shared/lib/supabase'

// Функция для сохранения пользователя в базе данных
export async function saveUser(user: {
  id: number, // Telegram user ID
  name: string, // Имя пользователя
  avatar: string // Ссылка на аватар
}) {
  const { data, error } = await supabase
    .from('users')
    .upsert([{
      id: user.id, // Используем id пользователя Telegram
      name: user.name,
      avatar: user.avatar,
    }])
    .select()

  if (error) {
    console.error('Ошибка при сохранении пользователя:', error)
    throw new Error('Не удалось сохранить пользователя')
  }

  return data
}