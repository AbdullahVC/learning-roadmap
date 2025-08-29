import type { Todo, TodoId } from "./todo.types";

export function addTodo(list: Todo[], title: string): Todo[] {
  const trimmed = title.trim();
  if (!trimmed) return list;
  const todo: Todo = {
    id: crypto.randomUUID(),
    title: trimmed,
    completed: false,
    createdAt: Date.now(),
  };
  return [todo, ...list];
}

export function toggleTodo(list: Todo[], id: TodoId): Todo[] {
  return list.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
}

export function editTodo(list: Todo[], id: TodoId, title: string): Todo[] {
  const trimmed = title.trim();
  if (!trimmed) return list;
  return list.map((t) => (t.id === id ? { ...t, title: trimmed } : t));
}

export function removeTodo(list: Todo[], id: TodoId): Todo[] {
  return list.filter((t) => t.id !== id);
}

export function clearCompleted(list: Todo[]): Todo[] {
  return list.filter((t) => !t.completed);
}
