import { useState } from "react";
import { Task } from "../types/Task";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import DayView from "./DayView";
import "./Calendar.css";

export default function Calendar({
  tasks,
  onToggle,
  onDelete,
}: {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
}) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [view, setView] = useState<"month" | "week" | "day">("month");

  // Month navigation
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const goPrevMonth = () => {
    setMonth((m) => (m === 0 ? 11 : m - 1));
    if (month === 0) setYear((y) => y - 1);
  };

  const goNextMonth = () => {
    setMonth((m) => (m === 11 ? 0 : m + 1));
    if (month === 11) setYear((y) => y + 1);
  };

  return (
    <div className="calendar-container">
      
      {/* Top Controls */}
      <div className="calendar-header">
        <div className="view-switch">
          <button
            className={view === "month" ? "active" : ""}
            onClick={() => setView("month")}
          >
            Month
          </button>
          <button
            className={view === "week" ? "active" : ""}
            onClick={() => setView("week")}
          >
            Week
          </button>
          <button
            className={view === "day" ? "active" : ""}
            onClick={() => setView("day")}
          >
            Day
          </button>
        </div>

        {view === "month" && (
          <div className="month-navigation">
            <button onClick={goPrevMonth}>←</button>
            <h2>
              {new Date(year, month).toLocaleString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <button onClick={goNextMonth}>→</button>
          </div>
        )}
      </div>

      {view === "month" && (
        <MonthView
          tasks={tasks}
          month={month}
          year={year}
          onSelect={setSelectedTask}
        />
      )}

      {view === "week" && (
        <WeekView tasks={tasks} onSelect={setSelectedTask} />
      )}

      {view === "day" && (
        <DayView tasks={tasks} onSelect={setSelectedTask} />
      )}

      {/* Side Panel */}
      {selectedTask && (
        <div className="task-panel">
          <button className="close-panel" onClick={() => setSelectedTask(null)}>
            &times;
          </button>

          <h2>{selectedTask.title}</h2>

          <p className="panel-date">Date: {selectedTask.date}</p>
          <p className="panel-desc">{selectedTask.description}</p>

          <div className="panel-actions">
            <button onClick={() => onToggle(selectedTask)} className="complete">
              {selectedTask.completed ? "Unmark" : "Complete"}
            </button>
            <button
              onClick={() => {
                onDelete(selectedTask._id);
                setSelectedTask(null);
              }}
              className="delete"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
