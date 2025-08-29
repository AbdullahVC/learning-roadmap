import type { Todo, Filter } from "./todo.types";

/** Tamamlanmamış görev sayısı */
export function leftCount(todos: Todo[]): number {
  return todos.filter((t) => !t.completed).length;
}

/** Filtreye göre görünür liste */
export function filterTodos(todos: Todo[], filter: Filter): Todo[] {
  switch (filter) {
    case "active":
      return todos.filter((t) => !t.completed);
    case "completed":
      return todos.filter((t) => t.completed);
    default:
      return todos;
  }
}
