import { useState, useMemo } from "react";
import useTasks from "../hooks/useTasks";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import Modal from "../components/Modal";
import TaskGridFAB from "../components/TaskGridFAB";
import SearchSortBar from "../components/SearchSortBar";
import TeamPills from "../components/TeamPills";
import PomodoroOverlay from "../components/PomodoroOverlay"; 

import "./DashboardPage.css";

export default function DashboardPage() {
  const { tasks, createTask, updateTask, deleteTask } = useTasks();

  const [q, setQ] = useState("");
  const [sort, setSort] = useState("due");
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const [pomodoroTask, setPomodoroTask] = useState<any | null>(null);

  const visible = useMemo(() => {
    let arr = tasks.slice();
    if (q) {
      const qq = q.toLowerCase();
      arr = arr.filter(
        (t) =>
          (t.title || "").toLowerCase().includes(qq) ||
          (t.description || "").toLowerCase().includes(qq) ||
          (t.subject || "").toLowerCase().includes(qq)
      );
    }
    if (filter === "completed") arr = arr.filter((t) => t.completed);
    if (filter === "pending") arr = arr.filter((t) => !t.completed);

    if (sort === "due") {
      arr.sort((a, b) => (a.date || "").localeCompare(b.date || ""));
    } else if (sort === "priority") {
      const order = { high: 0, medium: 1, low: 2, undefined: 3 };
      arr.sort(
        (a, b) =>
          order[a.priority ?? "undefined"] - order[b.priority ?? "undefined"]
      );
    } else if (sort === "title") {
      arr.sort((a, b) =>
        (a.title || "").localeCompare(b.title || "")
      );
    }
    return arr;
  }, [tasks, q, sort, filter]);

  const onCreate = async (payload: any) => {
    await createTask(payload);
    setModalOpen(false);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Tasks</h1>
        <SearchSortBar
          q={q}
          onQ={setQ}
          sort={sort}
          onSort={setSort}
          filter={filter}
          onFilter={setFilter}
        />
      </div>

      <div className="grid-and-panel">
        <div className="task-grid">
          {visible.map((t) => (
            <div key={t._id} onClick={() => setSelected(t._id)}>
              <TaskCard
                task={t}
                onUpdate={updateTask}
                onDelete={deleteTask}
              />
            </div>
          ))}
        </div>

        <aside className={`detail-panel ${selected ? "open" : ""}`}>
          {selected ? (
            (() => {
              const sTask = tasks.find((x) => x._id === selected)!;
              return (
                <div className="detail-inner">
                  <button
                    className="close-panel"
                    onClick={() => setSelected(null)}
                  >
                    ×
                  </button>

                  <h2>{sTask.title}</h2>

                  <p className="meta">
                    Due: {sTask.date} • {sTask.subject || "—"}
                  </p>
                  <p>{sTask.description}</p>

                  {sTask.teamMembers?.length ? (
                    <div className="detail-team">
                      <h4>Team Members</h4>
                      <TeamPills team={sTask.teamMembers} />
                    </div>
                  ) : null}

                  <div className="detail-actions">
                    <button
                      onClick={() => {
                        updateTask(sTask._id, {
                          completed: !sTask.completed,
                        });
                        setSelected(null);
                      }}
                      className="action complete"
                    >
                      {sTask.completed ? "Unmark" : "Complete"}
                    </button>

                    <button
                      onClick={() => {
                        deleteTask(sTask._id);
                        setSelected(null);
                      }}
                      className="action delete"
                    >
                      Delete
                    </button>

                    <button
                      className="action pomo"
                      onClick={() => setPomodoroTask(sTask)}
                    >
                      Pomodoro Time!
                    </button>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="detail-empty">
              Select a task to see details
            </div>
          )}
        </aside>
      </div>

      <TaskGridFAB onClick={() => setModalOpen(true)} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <TaskForm onCreate={onCreate} />
      </Modal>

      {pomodoroTask && (
        <PomodoroOverlay
          task={pomodoroTask}
          onClose={() => setPomodoroTask(null)}
        />
      )}
    </div>
  );
}
