import { useState } from "react";
import { Task } from "../types/Task";
import "./TaskForm.css";
import api from "../api/axios";

export default function TaskForm({
  onCreate,
}: {
  onCreate: (task: Partial<Task>) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState<"low"|"medium"|"high">("medium");
  const [subject, setSubject] = useState("");
  const [teamEmails, setTeamEmails] = useState(""); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let teamMembers: string[] = [];
    if (teamEmails.trim()) {
      const emails = teamEmails.split(",").map(s=>s.trim()).filter(Boolean);
      
      try {
        const res = await api.post("/users/resolve", { emails }); 
        teamMembers = res.data.ids; 
      } catch {
        teamMembers = [];
      }
    }

    onCreate({ title, description, date, priority, subject, teamMembers });
    setTitle("");
    setDescription("");
    setDate("");
    setPriority("medium");
    setSubject("");
    setTeamEmails("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input type="text" placeholder="Task title" required value={title} onChange={(e)=>setTitle(e.target.value)} />
      <input type="date" required value={date} onChange={(e)=>setDate(e.target.value)} />
      <select value={priority} onChange={(e)=>setPriority(e.target.value as any)}>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <input type="text" placeholder="Subject / Project" value={subject} onChange={(e)=>setSubject(e.target.value)} />
      <input type="text" placeholder="Team member emails (comma separated)" value={teamEmails} onChange={(e)=>setTeamEmails(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
      <button type="submit">Add Task</button>
    </form>
  );
}
