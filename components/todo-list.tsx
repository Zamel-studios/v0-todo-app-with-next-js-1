"use client"

import { useTodos } from "@/hooks/use-todos"
import { useUIStore } from "@/lib/store"
import { TodoItem } from "./todo-item"
import { Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function TodoList() {
  const { data: todos, isLoading, error } = useTodos()
  const filter = useUIStore((state) => state.filter)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading todos...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load todos. Please try again later.</AlertDescription>
      </Alert>
    )
  }

  if (!todos || todos.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No todos yet. Add one above to get started!</p>
      </div>
    )
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
    return true // "all"
  })

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No {filter} todos found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}
