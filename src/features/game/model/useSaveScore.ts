// features/game/model/useSaveScore.ts
import { saveScore } from '@/entities/score/model/save'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useSaveScore() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, value }: { userId: number; value: number }) =>
      saveScore(userId, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['top-scores'] })
    },
  })
}