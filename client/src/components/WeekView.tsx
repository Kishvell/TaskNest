import { Task } from "../types/Task";

function toYMD(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function WeekView({
  tasks,
  activeDate,
  onSelect,
  onSelectDay,
}: {
  tasks: Task[];
  activeDate: string;
  onSelect: (t: Task) => void;
  onSelectDay: (date: string) => void;
}) {
  const refDate = new Date(activeDate);

  const weekStart = new Date(refDate);
  weekStart.setHours(0, 0, 0, 0);
  weekStart.setDate(refDate.getDate() - refDate.getDay());

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    d.setHours(0, 0, 0, 0);
    return d;
  });

  return (
    <div className="week-grid">
      {days.map((d, i) => {
        const iso = toYMD(d);
        const dayTasks = tasks.filter((t) => t.date === iso);

        return (
          <div
            key={i}
            className="week-day"
            onClick={() => onSelectDay(iso)}
            style={{ cursor: "pointer" }}
          >
            <div className="week-day-number">{d.getDate()}</div>

            <div className="week-day-label">
              {d.toLocaleDateString("en-US", { weekday: "short" })}
            </div>

            {dayTasks.map((task) => (
              <div
                key={task._id}
                className={`day-task ${task.completed ? "completed" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(task);
                }}
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
