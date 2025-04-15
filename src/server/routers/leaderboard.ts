import { scoreInputSchema } from '@/schemas/score'
import { router, publicProcedure } from '../trpc'
import { prisma } from '@/utils/prisma'

export const leaderboardRouter = router({
  submit: publicProcedure
    .input(scoreInputSchema)
    .mutation(async ({ input }) => {
      return prisma.score.upsert({
        where: { userId: input.userId },
        update: { value: input.value },
        create: { userId: input.userId, value: input.value },
      })
    }),

  getTop: publicProcedure.query(async () => {
    return prisma.score.findMany({
      orderBy: { value: 'desc' },
      take: 10,
    })
  }),
})