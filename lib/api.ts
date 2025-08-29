export interface Todo {
  id: number
  title: string
  completed: boolean
  userId: number
}

export interface CreateTodoData {
  title: string
  completed?: boolean
  userId?: number
}

const API_BASE = "https://jsonplaceholder.typicode.com"

export const todoApi = {
  // Fetch all todos
  getTodos: async (): Promise<Todo[]> => {
    const response = await fetch(`${API_BASE}/todos`)
    if (!response.ok) {
      throw new Error("Failed to fetch todos")
    }
    return response.json()
  },

  // Create a new todo
  createTodo: async (data: CreateTodoData): Promise<Todo> => {
    const response = await fetch(`${API_BASE}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        userId: data.userId || 1,
        completed: data.completed || false,
      }),
    })
    if (!response.ok) {
      throw new Error("Failed to create todo")
    }
    return response.json()
  },

  // Update a todo
  updateTodo: async (id: number, data: Partial<Todo>): Promise<Todo> => {
    const response = await fetch(`${API_BASE}/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error("Failed to update todo")
    }
    return response.json()
  },

  // Delete a todo
  deleteTodo: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE}/todos/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("Failed to delete todo")
    }
  },
}
