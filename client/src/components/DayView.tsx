import { Task } from "../types/Task";

export default function DayView({
  tasks,
  date,
  onSelect,
}: {
  tasks: Task[];
  date: string;
  onSelect: (t: Task) => void;
}) {
  const todaysTasks = tasks.filter((t) => t.date === date);

  return (
    <div className="day-view">
      <h2>{date}</h2>

      {todaysTasks.length === 0 && <p className="empty">No tasks</p>}

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
