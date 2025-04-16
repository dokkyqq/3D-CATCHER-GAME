import { User } from '@/entities/user/model/types'


// entities/score/model/types.ts
export type Score = {
  id: string
  value: number
  created_at: string
  user: User
}