import type { Filter } from "../core/todo.types";

type Props = {
  filter: Filter;
  onChange: (f: Filter) => void;
  leftCount: number;
  onClearCompleted: () => void;
};

export default function FilterBar({ filter, onChange, leftCount, onClearCompleted }: Props) {
  return (
    <div>
      <span>{leftCount} left</span>
      <div style={{ display: "inline-flex", gap: 8, marginLeft: 12 }}>
        <button aria-pressed={filter === "all"} onClick={() => onChange("all")}>
          All
        </button>
        <button aria-pressed={filter === "active"} onClick={() => onChange("active")}>
          Active
        </button>
        <button aria-pressed={filter === "completed"} onClick={() => onChange("completed")}>
          Completed
        </button>
        <button onClick={onClearCompleted}>Clear Completed</button>
      </div>
    </div>
  );
}
