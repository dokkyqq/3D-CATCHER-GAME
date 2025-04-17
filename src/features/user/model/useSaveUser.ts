
import { saveUser } from '@/entities/user/model/save'
import { User } from '@/entities/user/model/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useSaveUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (user: User) =>
      saveUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['top-scores'] })
    },
  })
}