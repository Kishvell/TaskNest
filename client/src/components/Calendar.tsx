import { useState } from "react";
import { Task } from "../types/Task";
import "./Calendar.css";

export default function Calendar({ tasks }: { tasks: Task[] }) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="calendar-container">
      {/* Calendar Grid */}
      <div className="calendar">
        {days.map((day) => {
          const dayTasks = tasks.filter(
            (t) => Number(t.date.split("-")[2]) === day
          );

          return (
            <div className="calendar-day" key={day}>
              <h4 className="day-number">{day}</h4>

              {dayTasks.map((task) => (
                <div
                  key={task._id}
                  className="calendar-task"
                  onClick={() => setSelectedTask(task)}
                >
                  {task.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Side Panel */}
      {selectedTask && (
        <div className="task-panel">
          <button
            className="close-panel"
            onClick={() => setSelectedTask(null)}
          >
            &times;
          </button>
          <h2 className="task-title">{selectedTask.title}</h2>
          <p className="task-date">Date: {selectedTask.date}</p>
          <p className="task-desc">{selectedTask.description}</p>
        </div>
      )}
    </div>
  );
}
