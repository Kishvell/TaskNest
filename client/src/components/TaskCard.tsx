import { Task } from "../types/Task";
import "./TaskCard.css";

export default function TaskCard({
  task,
  onUpdate,
  onDelete,
}: {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}) {
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdate(task._id, { completed: !task.completed });
  };

  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`} aria-live="polite">
      <div className="task-top">
        <span className={`priority ${task.priority || "none"}`}>{(task.priority || "").toUpperCase()}</span>
        <div className="task-date">{task.date}</div>
      </div>

      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-description">{task.description}</p>
      </div>

      <div className="task-buttons">
        <button onClick={handleToggle} className="task-btn complete-btn">
          {task.completed ? "Unmark" : "Complete"}
        </button>
        <button onClick={(e)=>{ e.stopPropagation(); onDelete(task._id); }} className="task-btn delete-btn">Delete</button>
      </div>
    </div>
  );
}
