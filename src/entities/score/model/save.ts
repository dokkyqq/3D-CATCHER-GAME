'use server'

import { supabase } from '@/shared/lib/supabase'

export async function saveScore(userId: number, value: number) {
   const userIdTg = `telegram_${userId}`
  const { error } = await supabase.from('scores').insert([{ user_id: userIdTg, value }])
  if (error) throw new Error(error.message)
}