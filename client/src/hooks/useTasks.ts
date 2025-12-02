import { useEffect, useState } from "react";
import api from "../api/axios";
import { Task } from "../types/Task";

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  const createTask = async (task: Partial<Task>) => {
    await api.post("/tasks", task);
    fetchTasks();
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    await api.put(`/tasks/${id}`, updates);
    fetchTasks();
  };

  const deleteTask = async (id: string) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, createTask, updateTask, deleteTask, fetchTasks };
}
