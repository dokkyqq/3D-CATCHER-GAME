import { z } from 'zod'

export const scoreInputSchema = z.object({
  userId: z.string(),
  value: z.number().int().min(0)
})

export type ScoreInput = z.infer<typeof scoreInputSchema>