'use client'

import { trpc } from '@/utils/trpc'
import { inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '@/server/routers'

type Scores = inferRouterOutputs<AppRouter>['leaderboard']['getTop']

export default function Leaderboard() {
  const { data: scores, isLoading } = trpc.leaderboard.getTop.useQuery()

  if (isLoading || !scores) return <div>Загрузка...</div>

  return (
    <div>
      <h2>🏆 Лидеры</h2>
      <ul>
        {scores.map((s: Scores[number], i) => (
          <li key={s.userId}>
            {i + 1}. {s.user?.name ?? s.userId} — {s.value}
          </li>
        ))}
      </ul>
    </div>
  )
}