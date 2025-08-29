import { useEffect, useMemo, useState } from "react";
import type { Filter, Todo } from "./core/todo.types";
import { filterTodos, leftCount } from "./core/todo.selectors";
import { loadTodos, saveTodos } from "./services/todo.storage";
import { addTodo, toggleTodo, editTodo, removeTodo, clearCompleted } from "./core/todo.store";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import FilterBar from "./components/FilterBar";

export default function App() {
  // ---- state
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  // ---- ilk yüklemede localStorage'tan oku
  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  // ---- todos değiştikçe kaydet
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  // ---- türetilmiş veriler
  const visible = useMemo(() => filterTodos(todos, filter), [todos, filter]);
  const remaining = useMemo(() => leftCount(todos), [todos]);

  // ---- handler'lar
  function handleAdd(title: string) {
    setTodos((prev) => addTodo(prev, title));
  }
  function handleToggle(id: string) {
    setTodos((prev) => toggleTodo(prev, id));
  }
  function handleEdit(id: string, title: string) {
    setTodos((prev) => editTodo(prev, id, title));
  }
  function handleDelete(id: string) {
    setTodos((prev) => removeTodo(prev, id));
  }
  function handleClearCompleted() {
    setTodos((prev) => clearCompleted(prev));
  }

  return (
    <main style={{ maxWidth: 720, margin: "2rem auto", padding: "0 1rem" }}>
      <h1>✅ To-Do (React + TS)</h1>

      <section style={{ marginTop: 12 }}>
        <TodoForm onAdd={handleAdd} />
      </section>

      <section style={{ marginTop: 12 }}>
        <FilterBar
          filter={filter}
          onChange={setFilter}
          leftCount={remaining}
          onClearCompleted={handleClearCompleted}
        />
      </section>

      <section style={{ marginTop: 12 }}>
        <TodoList
          todos={visible}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>
    </main>
  );
}
