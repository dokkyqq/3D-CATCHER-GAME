import { supabase } from '@/shared/lib/supabase'
import { Score } from './types'

export async function getTopScores(): Promise<Score[]> {
  const { data, error } = await supabase
    .from('scores')
    .select('id, value, created_at, user:users(id, name, avatar)')
    .order('value', { ascending: false })
    .limit(10)

  if (error) throw new Error(error.message)

  // Приводим user к объекту, если вдруг массив
  const normalized = (data ?? []).map((item) => ({
    ...item,
    user: Array.isArray(item.user) ? item.user[0] : item.user,
  }))

  return normalized
}