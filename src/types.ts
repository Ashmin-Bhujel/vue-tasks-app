export interface Task {
  id: string;
  value: string;
  done: boolean;
}

export type FilterType = "all" | "todo" | "done";
