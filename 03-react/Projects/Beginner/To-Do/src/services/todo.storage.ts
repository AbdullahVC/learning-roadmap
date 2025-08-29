import type { Todo } from "../core/todo.types";

const STORAGE_KEY = "todos";

/** localStorage'tan todo listesini oku */
export function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Todo[]) : [];
  } catch {
    return [];
  }
}

/** todo listesini localStorage'a kaydet */
export function saveTodos(todos: Todo[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    // hata olsa bile sessiz geç
  }
}
