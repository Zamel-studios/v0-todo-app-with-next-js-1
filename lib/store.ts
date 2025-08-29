import { create } from "zustand"
import { persist } from "zustand/middleware"

export type FilterType = "all" | "active" | "completed"

interface UIState {
  filter: FilterType
  isDarkMode: boolean
  setFilter: (filter: FilterType) => void
  toggleDarkMode: () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      filter: "all",
      isDarkMode: false,
      setFilter: (filter) => set({ filter }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: "todo-ui-storage",
    },
  ),
)
