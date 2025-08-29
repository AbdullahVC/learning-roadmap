import { useEffect, useRef, useState } from "react";
import type { Todo } from "../core/todo.types";

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({ todo, onToggle, onEdit, onDelete }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  function startEdit() {
    setDraft(todo.title);
    setEditing(true);
  }

  function save() {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== todo.title) onEdit(todo.id, trimmed);
    setEditing(false);
  }

  function cancel() {
    setDraft(todo.title);
    setEditing(false);
  }

  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label="toggle"
      />

      {editing ? (
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") cancel();
          }}
          aria-label="edit todo title"
        />
      ) : (
        <span onDoubleClick={startEdit} style={{ marginRight: 8 }}>
          {todo.title}
        </span>
      )}

      {!editing && (
        <>
          <button onClick={startEdit} aria-label="edit">
            Edit
          </button>
          <button onClick={() => onDelete(todo.id)} aria-label="delete">
            Delete
          </button>
        </>
      )}
    </div>
  );
}
