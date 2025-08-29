"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useUpdateTodo, useDeleteTodo } from "@/hooks/use-todos"
import type { Todo } from "@/lib/api"
import { Trash2, Loader2 } from "lucide-react"

interface TodoItemProps {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const updateTodo = useUpdateTodo()
  const deleteTodo = useDeleteTodo()

  const handleToggle = () => {
    updateTodo.mutate({
      id: todo.id,
      data: { completed: !todo.completed },
    })
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteTodo.mutateAsync(todo.id)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={handleToggle}
        disabled={updateTodo.isPending}
        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
      />

      <span
        className={`flex-1 text-sm leading-relaxed ${
          todo.completed ? "line-through text-muted-foreground" : "text-card-foreground"
        }`}
      >
        {todo.title}
      </span>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        disabled={isDeleting || deleteTodo.isPending}
        className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
      >
        {isDeleting || deleteTodo.isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}
