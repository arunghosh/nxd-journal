import { userInputService } from ".";
import { LS_KEYS, LocalStorage } from "@/utils/storage";
import { UserInput } from "../models";

export class UserInputStorageSync {
  static _load() {
    const items = JSON.parse(
      localStorage.getItem(LS_KEYS.USER_INPUTS) ?? "[]"
    ) as Array<UserInput>;
    if (items?.length)
      items.forEach(
        (item) => (item.time = item.time ? new Date(item.time) : new Date())
      );
    userInputService.items = items;
  }

  static _onChange() {
    const items = userInputService.getItems();
    LocalStorage.set(LS_KEYS.USER_INPUTS, JSON.stringify(items));
  }

  static init() {
    userInputService.subscribe(this._onChange);
    this._load();
  }
}
