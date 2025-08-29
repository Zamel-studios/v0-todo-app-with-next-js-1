import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { todoApi, type Todo } from "@/lib/api"

const TODOS_QUERY_KEY = ["todos"]

export function useTodos() {
  return useQuery({
    queryKey: TODOS_QUERY_KEY,
    queryFn: todoApi.getTodos,
  })
}

export function useCreateTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: todoApi.createTodo,
    onSuccess: (newTodo) => {
      queryClient.setQueryData<Todo[]>(TODOS_QUERY_KEY, (old) => {
        if (!old) return [newTodo]
        return [newTodo, ...old]
      })
    },
  })
}

export function useUpdateTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Todo> }) => todoApi.updateTodo(id, data),
    onSuccess: (updatedTodo) => {
      queryClient.setQueryData<Todo[]>(TODOS_QUERY_KEY, (old) => {
        if (!old) return [updatedTodo]
        return old.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      })
    },
  })
}

export function useDeleteTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: todoApi.deleteTodo,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Todo[]>(TODOS_QUERY_KEY, (old) => {
        if (!old) return []
        return old.filter((todo) => todo.id !== deletedId)
      })
    },
  })
}
