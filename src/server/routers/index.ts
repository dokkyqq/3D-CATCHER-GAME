import { initTRPC } from '@trpc/server'
import { leaderboardRouter } from './leaderboard'

const t = initTRPC.create()

export const appRouter = t.router({
  leaderboard: leaderboardRouter,
})

export type AppRouter = typeof appRouter