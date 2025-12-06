import { Task } from "../types/Task";

export default function DayView({
  tasks,
  onSelect,
}: {
  tasks: Task[];
  onSelect: (t: Task) => void;
}) {
  const today = new Date().toISOString().split("T")[0];
  const todaysTasks = tasks.filter((t) => t.date === today);

  return (
    <div className="day-view">
      <h2>Today</h2>

      {todaysTasks.length === 0 && (
        <p className="empty">No tasks today</p>
      )}

      {todaysTasks.map((task) => (
        <div
          key={task._id}
          className={`day-task large ${task.completed ? "completed" : ""}`}
          onClick={() => onSelect(task)}
        >
          <strong>{task.title}</strong>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
}
