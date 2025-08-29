"use client"

import { Button } from "@/components/ui/button"
import { useUIStore } from "@/lib/store"
import { ArrowLeft, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export default function AboutPage() {
  const { isDarkMode, toggleDarkMode } = useUIStore()

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Todos
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

        {/* Main Content */}
        <div className="text-center py-16">
          <h1 className="text-4xl font-bold text-foreground mb-6 text-balance">About Todo App</h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto text-pretty">
            A simple, modern todo application built with Next.js, TanStack Query, and Zustand to help you stay organized
            and productive.
          </p>

          <div className="mt-12 p-6 bg-card border border-border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-card-foreground mb-4">Features</h2>
            <ul className="text-sm text-muted-foreground space-y-2 text-left max-w-sm mx-auto">
              <li>• Add, toggle, and delete tasks</li>
              <li>• Filter by all, active, or completed</li>
              <li>• Dark mode support</li>
              <li>• Mobile-responsive design</li>
              <li>• Real-time data synchronization</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
