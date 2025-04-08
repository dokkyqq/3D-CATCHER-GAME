import {create} from 'zustand'

interface GameState {
  score: number
  increaseScore: () => void
  decreaseScore: () => void
}

export const useStore = create<GameState>(set => ({
  score: 0,
  increaseScore: () => set(state => ({ score: state.score + 1 })),
  decreaseScore: () => set(state => ({ score: state.score - 1 }))
}))
