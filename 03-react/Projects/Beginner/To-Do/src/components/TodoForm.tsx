import { useState } from "react";

type Props = { onAdd: (title: string) => void };

export default function TodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    onAdd(trimmed);
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        aria-label="todo-input"
        placeholder="Add a task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
