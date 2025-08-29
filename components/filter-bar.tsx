"use client"

import { Button } from "@/components/ui/button"
import { useUIStore } from "@/lib/store"
import { useTodos, useDeleteTodo } from "@/hooks/use-todos"
import { Trash2, Loader2 } from "lucide-react"
import { useState } from "react"

export function FilterBar() {
  const { filter, setFilter } = useUIStore()
  const { data: todos } = useTodos()
  const deleteTodo = useDeleteTodo()
  const [isClearingCompleted, setIsClearingCompleted] = useState(false)

  if (!todos) return null

  const allCount = todos.length
  const activeCount = todos.filter((todo) => !todo.completed).length
  const completedCount = todos.filter((todo) => todo.completed).length

  const handleClearCompleted = async () => {
    const completedTodos = todos.filter((todo) => todo.completed)
    if (completedTodos.length === 0) return

    setIsClearingCompleted(true)
    try {
      // Delete all completed todos
      await Promise.all(completedTodos.map((todo) => deleteTodo.mutateAsync(todo.id)))
    } finally {
      setIsClearingCompleted(false)
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      {/* Filter Buttons */}
      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
          className="capitalize relative"
        >
          All
          {allCount > 0 && (
            <span className="ml-2 px-1.5 py-0.5 text-xs bg-muted text-muted-foreground rounded-full">{allCount}</span>
          )}
        </Button>

        <Button
          variant={filter === "active" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("active")}
          className="capitalize relative"
        >
          Active
          {activeCount > 0 && (
            <span className="ml-2 px-1.5 py-0.5 text-xs bg-muted text-muted-foreground rounded-full">
              {activeCount}
            </span>
          )}
        </Button>

        <Button
          variant={filter === "completed" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("completed")}
          className="capitalize relative"
        >
          Completed
          {completedCount > 0 && (
            <span className="ml-2 px-1.5 py-0.5 text-xs bg-muted text-muted-foreground rounded-full">
              {completedCount}
            </span>
          )}
        </Button>
      </div>

      {/* Clear Completed Button */}
      {completedCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearCompleted}
          disabled={isClearingCompleted}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          {isClearingCompleted ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Trash2 className="h-4 w-4 mr-2" />
          )}
          Clear Completed
        </Button>
      )}
    </div>
  )
}
