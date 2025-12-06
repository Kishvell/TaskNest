import { useEffect, useState } from "react";
import api from "../api/axios";
import { Task } from "../types/Task";

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get<Task[]>("/tasks");
      setTasks(res.data);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (task: Partial<Task>) => {
    await api.post("/tasks", task);
    await fetchTasks();
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    await api.put(`/tasks/${id}`, updates);
    setTasks(prev => prev.map(t => t._id === id ? { ...t, ...updates } : t));
  };

  const deleteTask = async (id: string) => {
    await api.delete(`/tasks/${id}`);
    setTasks(prev => prev.filter(t => t._id !== id));
  };

  useEffect(()=>{ fetchTasks(); }, []);

  return { tasks, loading, fetchTasks, createTask, updateTask, deleteTask, setTasks };
}