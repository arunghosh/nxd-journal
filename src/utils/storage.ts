import { decrypt, encrypt } from "./crypto";

const Window = window as any;

export const LS_KEYS = {
  OPEN_AI: "__open_ai_key__",
  TODOS: "__self__todos__",
  USER_INPUTS: "__self__user_inputs__",
  REVIEWS: "__self__reviews__",
  LLM_LOGS: "__llm_logs__",
};

export const LocalStorage = {
  _dispatch(key: string) {
    const event = new StorageEvent("storage", {
      key,
    });
    window.dispatchEvent(event);
  },
  set<T>(key: string, value: T, secure?: boolean): void {
    let serialized =
      typeof value === "object" ? JSON.stringify(value) : `${value}`;
    if (secure) {
      serialized = encrypt(serialized);
    }

    Window.localStorage?.setItem(key, serialized);
    this._dispatch(key);
  },
  remove(key: string) {
    Window.localStorage?.removeItem(key);
    this._dispatch(key);
  },
  get<T>(key: string, secure?: boolean): T | undefined {
    let value: string | T = Window.localStorage?.getItem(key);
    if (secure) value = decrypt(value as string) ?? "";
    return tryParse(value as string) as T;
  },
};

function tryParse(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}
