"use client"

import { useTodos } from "@/hooks/use-todos"

export function TodoStats() {
  const { data: todos } = useTodos()

  if (!todos || todos.length === 0) return null

  const totalCount = todos.length
  const completedCount = todos.filter((todo) => todo.completed).length
  const activeCount = totalCount - completedCount
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground">
            <span className="font-medium text-foreground">{activeCount}</span> active
          </span>
          <span className="text-muted-foreground">
            <span className="font-medium text-foreground">{completedCount}</span> completed
          </span>
        </div>
        <div className="text-muted-foreground">
          <span className="font-medium text-foreground">{completionPercentage}%</span> done
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 w-full bg-muted rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${completionPercentage}%` }}
        />
      </div>
    </div>
  )
}
