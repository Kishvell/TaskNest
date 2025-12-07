import { Task } from "../types/Task";

function toYMD(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function MonthView({
  tasks,
  month,
  year,
  onSelect,
  onSelectDay,
}: {
  tasks: Task[];
  month: number;
  year: number;
  onSelect: (t: Task) => void;
  onSelectDay: (year: number, month: number, day: number) => void;
}) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Task[] | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);

  for (let day = 1; day <= daysInMonth; day++) {
    const dateForDay = new Date(year, month, day);
    const dayIso = toYMD(dateForDay);

    const dayTasks = tasks.filter((t) => t.date === dayIso);

    cells.push(dayTasks);
  }

  return (
    <div className="calendar-wrapper">
      <div className="calendar-grid">
        {["S", "M", "T", "W", "T", "F", "S"].map((w) => (
            <div key={w} className="weekday-label">
                {w}
            </div>
        ))}

        {cells.map((cell, i) => {
          const day = i + 1 - firstDay;

          return (
            <div
              key={i}
              className="calendar-day"
              onClick={() => day > 0 && onSelectDay(year, month, day)}
            >
              {cell !== null && day > 0 && (
                <>
                  <div className="day-number">{day}</div>

                  {cell.map((task) => (
                    <div
                      key={task._id}
                      className={`day-task 
                        ${task.completed ? "completed" : ""}
                        ${task.priority ?? "undefined"}
                        `}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(task);
                      }}
                    >
                      {task.title}
                    </div>
                  ))}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
