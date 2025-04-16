'use client'

import { useTopScores } from '../model/useTopScores'

export default function Leaderboard() {
  const { data: scores, isLoading } = useTopScores()

  if (isLoading) return <div>Загрузка...</div>

  return (
    <div>
      <h2>🏆 Лидеры</h2>
      <ul>
        {scores?.map((score, index) => (
          <li key={score.id}>
            {index + 1}. {score.user?.name} — {score.value}
          </li>
        ))}
      </ul>
    </div>
  )
}