// features/game/model/useGameState.ts
import { create } from 'zustand'

type GameState = {
  score: number
  misses: number
  addScore: (v: number) => void
  increaseScore: () => void
  addMiss: () => void
  reset: () => void
}

export const useGameState = create<GameState>(set => ({
  score: 0,
  misses: 0,
  increaseScore: () => set(s => ({ score: s.score + 1 })),
  addScore: v => set(s => ({ score: s.score + v })),
  addMiss: () => set(s => ({ misses: s.misses + 1 })),
  reset: () => set({ score: 0, misses: 0 })
}))
