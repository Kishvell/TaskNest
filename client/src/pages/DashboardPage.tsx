import useTasks from "../hooks/useTasks";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import "./DashboardPage.css";

export default function DashboardPage() {
  const { tasks, createTask, updateTask, deleteTask } = useTasks();

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">Tasks</h1>

      <TaskForm onCreate={createTask} />

      <div className="task-list">
        {tasks.map((t) => (
          <TaskCard
            key={t._id}
            task={t}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}
