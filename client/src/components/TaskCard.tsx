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
  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-description">{task.description}</p>
        <p className="task-date">{task.date}</p>
      </div>

      <div className="task-buttons">
        <button
          onClick={() => onUpdate(task._id, { completed: !task.completed })}
          className="task-btn complete-btn"
        >
          {task.completed ? "Unmark" : "Complete"}
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="task-btn delete-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
