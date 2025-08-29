"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCreateTodo } from "@/hooks/use-todos"
import { Plus, Loader2 } from "lucide-react"

export function AddTodoForm() {
  const [title, setTitle] = useState("")
  const createTodo = useCreateTodo()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    try {
      await createTodo.mutateAsync({ title: title.trim() })
      setTitle("")
    } catch (error) {
      // Error handling is managed by TanStack Query
      console.error("Failed to create todo:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={createTodo.isPending}
        className="flex-1 bg-input border-border focus:ring-2 focus:ring-ring focus:border-transparent"
      />
      <Button
        type="submit"
        disabled={!title.trim() || createTodo.isPending}
        className="bg-primary hover:bg-primary/90 text-primary-foreground px-4"
      >
        {createTodo.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
      </Button>
    </form>
  )
}
