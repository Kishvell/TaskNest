import useTasks from "../hooks/useTasks";
import Calendar from "../components/Calendar";
import "./CalendarPage.css";

export default function CalendarPage() {
  const { tasks, updateTask, deleteTask } = useTasks();

  const toggleTask = (task: any) => {
    updateTask(task._id, { completed: !task.completed });
  };

  return (
    <div className="calendar-page">
      <header className="calendar-header">
        <h1>Calendar</h1>
        <p>Keep track of your tasks and schedule</p>
      </header>

      <main className="calendar-main">
        <Calendar
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </main>
    </div>
  );
}
