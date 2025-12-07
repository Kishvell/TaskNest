import { useState } from "react";
import { Task } from "../types/Task";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import DayView from "./DayView";
import "./Calendar.css";
import TeamPills from "./TeamPills";


function toYMD(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

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

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string>(today.toISOString().split("T")[0]);

  const goPrevMonth = () => {
    const newMonth = month === 0 ? 11 : month - 1;
    const newYear = month === 0 ? year - 1 : year;

    setMonth(newMonth);
    setYear(newYear);
  };

  const goNextMonth = () => {
    const newMonth = month === 11 ? 0 : month + 1;
    const newYear = month === 11 ? year + 1 : year;

    setMonth(newMonth);
    setYear(newYear);
  };

  const changeWeek = (offset: number) => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + offset * 7);
    setSelectedDate(date.toISOString().split("T")[0]);
  };

  const changeDay = (offset: number) => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + offset);
    setSelectedDate(date.toISOString().split("T")[0]);
  };

  const openDayView = (year: number, month: number, day: number) => {
    const iso = new Date(year, month, day).toISOString().split("T")[0];
    setSelectedDate(iso);
    setView("day");
  };

  return (
    <div className="calendar-container">

      <div className="calendar-header">

        <div className="view-switch">
          <button className={view === "month" ? "active" : ""} onClick={() => setView("month")}>Month</button>
          <button className={view === "week" ? "active" : ""} onClick={() => setView("week")}>Week</button>
          <button className={view === "day" ? "active" : ""} onClick={() => setView("day")}>Day</button>
        </div>

        {view === "month" && (
          <div className="month-navigation">
            <button onClick={goPrevMonth}>←</button>
            <h2>{new Date(year, month).toLocaleString("en-US", { month: "long", year: "numeric" })}</h2>
            <button onClick={goNextMonth}>→</button>
          </div>
        )}

        {view === "week" && (
          <div className="month-navigation">
            <button onClick={() => changeWeek(-1)}>←</button>

            <h2>
              {(() => {
                const d = new Date(selectedDate);
                d.setHours(0, 0, 0, 0);

                const start = new Date(d);
                start.setDate(d.getDate() - d.getDay());

                const end = new Date(start);
                end.setDate(start.getDate() + 6);

                const startStr = start.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric"
                });

                const endStr = end.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                });

                return `Week: ${startStr} – ${endStr}`;
              })()}
            </h2>

            <button onClick={() => changeWeek(1)}>→</button>
          </div>
        )}

        {view === "day" && (
          <div className="month-navigation">
            <button onClick={() => changeDay(-1)}>←</button>
            <h2>{selectedDate}</h2>
            <button onClick={() => changeDay(1)}>→</button>
          </div>
        )}
      </div>

      {view === "month" && (
        <MonthView
          tasks={tasks}
          month={month}
          year={year}
          onSelect={setSelectedTask}
          onSelectDay={openDayView}
        />
      )}

      {view === "week" && (
        <WeekView
          tasks={tasks}
          activeDate={selectedDate}
          onSelect={setSelectedTask}
          onSelectDay={(date) => {
            setSelectedDate(date);
            setView("day");
          }}
        />
      )}

      {view === "day" && (
        <DayView
          tasks={tasks}
          date={selectedDate}
          onSelect={setSelectedTask}
        />
      )}

      {selectedTask && (
      <div className="task-modal-backdrop" onClick={() => setSelectedTask(null)}>
        <div className="task-modal" onClick={(e) => e.stopPropagation()}>
          <button className="close-modal" onClick={() => setSelectedTask(null)}>×</button>

          <h2>{selectedTask.title}</h2>

          <p className="panel-date">Due Date: {selectedTask.date}</p>
          <p className="panel-desc">{selectedTask.description}</p>
          {selectedTask.teamMembers?.length ? (
            <div className="panel-team">
              <h4>Team</h4>
              <TeamPills team={selectedTask.teamMembers} />
            </div>
          ) : null}

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
      </div>
      )}

    </div>
  );
}
