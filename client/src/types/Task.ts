export interface Task {
  _id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
}

// interfaces for group tasks
export interface GroupColumnTask {
  _id: string;
  title: string;
  cards: GroupCardTask[];
}

export interface GroupCardTask {
  _id: string;
  title: string;
  description: string;
}

export interface GroupUser {
  _id: string;
  name: string;
}