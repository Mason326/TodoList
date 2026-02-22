export enum TaskStatus {
  completed,
  uncompleted,
}

export interface ITask {
  task_id: string;
  task_name: string;
  created_at: Date;
  task_status: TaskStatus;
  project_id: string;
  user_id: string;
  updated_at: Date | null;
}

export interface IProject {
  project_id: string;
  project_name: string;
  created_at: Date;
  project_due_date: Date;
  project_description: string | null;
  user_id: string;
}
