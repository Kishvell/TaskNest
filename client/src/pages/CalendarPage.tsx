import useTasks from "../hooks/useTasks"; 
import Calendar from "../components/Calendar";
import "./CalendarPage.css";

export default function CalendarPage() {
  const { tasks } = useTasks();

  return (
    <div className="calendar-page">
      <header className="calendar-header">
          <h1>Calendar</h1>
          <p>Keep track of your tasks and schedule</p>
        </header>
      <div className="calendar-container">

        <main className="calendar-main">
          <Calendar tasks={tasks} />
        </main>
      </div>
    </div>
  );
}
