"use client"

import { AddTodoForm } from "@/components/add-todo-form"
import { TodoList } from "@/components/todo-list"
import { FilterBar } from "@/components/filter-bar"
import { TodoStats } from "@/components/todo-stats"
import { Button } from "@/components/ui/button"
import { useUIStore } from "@/lib/store"
import { Moon, Sun, Info } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export default function HomePage() {
  const { isDarkMode, toggleDarkMode } = useUIStore()

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "1":
            e.preventDefault()
            useUIStore.getState().setFilter("all")
            break
          case "2":
            e.preventDefault()
            useUIStore.getState().setFilter("active")
            break
          case "3":
            e.preventDefault()
            useUIStore.getState().setFilter("completed")
            break
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground text-balance">Todo List</h1>
          <div className="flex items-center gap-2">
            <Link href="/about">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Info className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="text-muted-foreground hover:text-foreground"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Add Todo Form */}
        <div className="mb-6">
          <AddTodoForm />
        </div>

        {/* Todo Stats */}
        <TodoStats />

        {/* Filter Bar */}
        <FilterBar />

        {/* Todo List */}
        <TodoList />

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">Built with Next.js, TanStack Query, and Zustand</p>
          <p className="text-xs text-muted-foreground mt-1">
            Keyboard shortcuts: Ctrl/Cmd + 1 (All), 2 (Active), 3 (Completed)
          </p>
        </div>
      </div>
    </div>
  )
}
