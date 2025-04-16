'use client'

import { useQuery } from '@tanstack/react-query'
import { getTopScores } from '@/entities/score/model/getTopScores'

export function useTopScores() {
  return useQuery({
    queryKey: ['top-scores'],
    queryFn: () => getTopScores(),
  })
}