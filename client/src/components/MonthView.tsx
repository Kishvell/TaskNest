import { Task } from "../types/Task";

export default function MonthView({
  tasks,
  month,
  year,
  onSelect,
}: {
  tasks: Task[];
  month: number;
  year: number;
  onSelect: (t: Task) => void;
}) {
  const firstDay = new Date(year, month, 1).getDay(); 
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const grid: (Task[] | null)[] = [];

  for (let i = 0; i < firstDay; i++) grid.push(null);

  for (let day = 1; day <= daysInMonth; day++) {
    const dayTasks = tasks.filter((t) => {
      if (!t.date) return false;
      const [y, m, d] = t.date.split("-").map(Number);
      return y === year && m - 1 === month && d === day;
    });

    grid.push(dayTasks);
  }

  return (
    <div className="calendar-grid">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((w) => (
        <div key={w} className="weekday-label">
          {w}
        </div>
      ))}

      {grid.map((cell, i) => (
        <div key={i} className="calendar-day">
          {cell !== null && (
            <>
              <div className="day-number">{i + 1 - firstDay}</div>
              {cell.map((task) => (
                <div
                  key={task._id}
                  className={`day-task ${task.completed ? "completed" : ""}`}
                  onClick={() => onSelect(task)}
                >
                  {task.title}
                </div>
              ))}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
