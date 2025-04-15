// utils/trpc.ts
'use client'

import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '@/server/routers'

export const trpc = createTRPCReact<AppRouter>()

export const leaderboard = {
  getTopScores: trpc.leaderboard.getTop.useQuery,
  submit: trpc.leaderboard.submit.useMutation
}