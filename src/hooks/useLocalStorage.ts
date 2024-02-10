import { useState, useEffect } from "react";
import { LocalStorage } from "../utils/storage";

type SetValue<T> = (newValue: T) => void;

type Config = {
  secure?: boolean
}

export function useLocalStorage<T>(key: string, config?: Config): [T | undefined, SetValue<T>] {
  const [value, setValue] = useState<T | undefined>(() => {
    const storedValue = LocalStorage.get<T>(key, config?.secure);
    return storedValue;
  });

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        setValue(LocalStorage.get(key, config?.secure));
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  useEffect(() => {
    if (!value) LocalStorage.remove(key);
    else LocalStorage.set(key, value, config?.secure);
  }, [key, value]);

  return [value, setValue];
}
