export type TodoId = string;

export type Filter = "all" | "active" | "completed";

export interface Todo {
  id: TodoId;
  title: string;
  completed: boolean;
  createdAt: number; // Date.now()
}
