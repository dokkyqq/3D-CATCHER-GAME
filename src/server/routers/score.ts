// server/routers/score.ts
import { prisma } from '@/utils/prisma'
import { publicProcedure, router } from '../trpc'
import { scoreInputSchema } from '@/schemas/score'

export const scoreRouter = router({
  post: publicProcedure
    .input(scoreInputSchema)
    .mutation(async ({ input }) => {
      const { userId, value } = input
      return prisma.score.upsert({
        where: { userId },
        update: { value },
        create: { userId, value }
      })
    })
})