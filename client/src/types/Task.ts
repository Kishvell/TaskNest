export type Priority = "low" | "medium" | "high" | undefined;

export interface Task {
  _id: string;
  user?: string; 
  title: string;
  description?: string;
  date?: string; 
  completed?: boolean;
  priority?: Priority;
  subject?: string;
  teamMembers?: string[]; 
  createdAt?: string;
  updatedAt?: string;
}
