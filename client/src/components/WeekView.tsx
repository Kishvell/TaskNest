import { Task } from "../types/Task";

export default function WeekView({
  tasks,
  onSelect,
}: {
  tasks: Task[];
  onSelect: (t: Task) => void;
}) {
  const today = new Date();
  const currentWeekTasks = tasks.filter((t) => {
    if (!t.date) return false;
    const dt = new Date(t.date);
    const diff = dt.getDate() - today.getDate();
    return Math.abs(diff) < 7;
  });

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - today.getDay() + i);
    return d;
  });

  return (
    <div className="week-grid">
      {days.map((d, i) => {
        const ds = currentWeekTasks.filter((t) => t.date === d.toISOString().split("T")[0]);

        return (
          <div key={i} className="week-day">
            <div className="week-day-label">
              {d.toLocaleDateString("en-US", { weekday: "short" })}
            </div>

            {ds.map((task) => (
              <div
                key={task._id}
                className={`day-task ${task.completed ? "completed" : ""}`}
                onClick={() => onSelect(task)}
              >
                {task.title}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
