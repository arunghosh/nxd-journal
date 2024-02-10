import { Subscriber } from "@/utils/subscriber";
import { IDGenerator } from "@/utils/key";
import { capitalizeFirstLetter } from "@/utils/string";
import { COMMON_CATEGOTY, TodoItem, TodoItemStatus } from "../models";

interface ItemFilter {
  category?: string;
  status?: TodoItemStatus;
}
class TodoService extends Subscriber {
  private _todoItems: TodoItem[] = [];
  private _idGenerator = new IDGenerator();

  get activeCategories(): string[] {
    const allCategories = this.getTodoItems({
      status: TodoItemStatus.PENDING,
    }).map((i) => i.category);
    return Array.from(new Set(allCategories));
  }

  setItems(items: TodoItem[]) {
    if (!items?.length) return;
    this._todoItems = items;
    this._idGenerator.refresh(items);
    this.notify();
  }

  getTodoItems(filter?: ItemFilter) {
    let result = this._todoItems;
    if (filter) {
      if (filter.category)
        result = result.filter((i) => i.category === filter.category);
      if (filter.status)
        result = result.filter((i) => i.status === filter.status);
    }
    return result;
  }

  addItem(text: string, category?: string) {
    this._todoItems.push({
      id: this._idGenerator.getNext(),
      text: capitalizeFirstLetter(text),
      status: TodoItemStatus.PENDING,
      addedAt: new Date(),
      category: category ?? COMMON_CATEGOTY,
    });
    this.notify();
  }

  updateItemByText(text: string, status: TodoItemStatus) {
    const item = this._findItemByText(text);
    this._updateStatus(item, status);
  }

  toggleCompletedStatus(item: TodoItem) {
    let status: TodoItemStatus | null = null;
    if (item.status === TodoItemStatus.COMPLETED)
      status = TodoItemStatus.PENDING;
    if (item.status === TodoItemStatus.PENDING)
      status = TodoItemStatus.COMPLETED;
    if (status) this.updateItemByText(item.text, status);
  }

  _updateStatus(item: TodoItem, status: TodoItemStatus) {
    item.status = status;
    item.completedAt = null;
    if (status === TodoItemStatus.COMPLETED) item.completedAt = new Date();
    this.notify();
  }

  _findItemByText(text: string) {
    const item = this._todoItems.find((ti) => ti.text === text);
    if (!item) {
      throw new Error("Item not found");
    }
    return item;
  }
}

export const todoService = new TodoService();
