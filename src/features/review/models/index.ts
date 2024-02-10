import { NewTodoPromptRespose } from "@/features/todo";

export enum ReviewAction {
  NEW_TODO = "new-todo",
  COMPLETE_TODO = "complete-todo",
}

export interface ChangeParams {
  newTodos?: Array<NewTodoPromptRespose>;
  completedTodos?: Array<string>;
}

export enum ReviewStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

export interface ReviewItem {
  id: number;
  action: ReviewAction;
  text: string;
  status: ReviewStatus;
  addInfo?: {
    category?: string;
  };
}
