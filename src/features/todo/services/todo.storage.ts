import { TodoItem } from "../models";
import { LS_KEYS, LocalStorage } from "@/utils/storage";
import { todoService } from "./todo.service";

export class TodoStorageSync {
  private static _key = LS_KEYS.TODOS;
  private static _isSynced = false;

  public static get isSynced() {
    return this._isSynced;
  }

  private static _load() {
    const items = JSON.parse(
      localStorage.getItem(this._key) ?? "[]"
    ) as Array<TodoItem>;
    if (items?.length) {
      items.forEach(
        (item) =>
          (item.addedAt = item.addedAt ? new Date(item.addedAt) : new Date())
      );
    }
    todoService.setItems(items);
    this._isSynced = true;
  }

  private static _onChange() {
    const items = todoService.getTodoItems();
    LocalStorage.set(LS_KEYS.TODOS, JSON.stringify(items));
  }

  static clean() {
    todoService.unsubscribe(this._onChange);
  }

  static init() {
    this._load();
    setImmediate(() => {
      todoService.subscribe(this._onChange);
    });
  }
}
