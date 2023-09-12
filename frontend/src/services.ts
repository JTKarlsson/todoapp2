import { Todo } from "./App";

const API_BASE_URL = 'http://localhost:3000'; 

export const apiService = {
  async createTodo(title: string): Promise<Todo> {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error('Failed to create todo');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  async getTodos(): Promise<Todo[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`);
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  },

  async updateTodo(id: number, updatedTodo: Todo): Promise<Todo> {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  async deleteTodo(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
    } catch (error) {
      throw error;
    }
  },
};
