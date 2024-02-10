import { LS_KEYS, LocalStorage } from "@/utils/storage";
import { LogItem, promptLogger } from "./log.service";

export class PromptLogStorageSync {
  private static _key = LS_KEYS.LLM_LOGS;

  private static _load() {
    const items = JSON.parse(
      localStorage.getItem(this._key) ?? "[]"
    ) as Array<LogItem>;
    promptLogger.items = items;
  }

  static onChange() {
    const items = promptLogger.getItems();
    // Store only the last 12
    LocalStorage.set(PromptLogStorageSync._key, JSON.stringify(items.slice(-12)));
  }

  static init() {
    promptLogger.subscribe(PromptLogStorageSync.onChange);
    this._load();
  }
}
