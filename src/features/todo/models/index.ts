import { EntityWithID } from "@/utils/key";

export enum TodoItemStatus {
  PENDING = "pending",
  // PROGRESS = "progress",
  COMPLETED = "completed",
  // BLOCKED = "blocked",
}

export const COMMON_CATEGOTY = "common";

export interface TodoItem extends EntityWithID {
  text: string;
  category: string;
  status: TodoItemStatus;
  addedAt: Date;
  completedAt?: Date | null;
}

export interface TodoList {
  items: Array<TodoItem>;
}
