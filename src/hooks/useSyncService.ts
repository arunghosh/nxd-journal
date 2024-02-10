import { useEffect, useRef, useState } from "react";
import { Subscriber } from "../utils/subscriber";

function getHash(obj: any) {
  return JSON.stringify(obj);
}

interface Options {
  debug?: boolean;
  name?: string;
}

export function useServiceSync<T>(
  service: Subscriber,
  getSnapshot: () => Array<T>,
  options?: Options
) {
  const [items, setItems] = useState<T[]>(() => getSnapshot());
  const prevHashRef = useRef<string>(getHash(""));

  useEffect(() => {
    function refresh() {
      const snapshot = getSnapshot();
      if (options?.debug) {
        console.group(options?.name);
        console.log("current", snapshot);
        console.log("previous", JSON.parse(prevHashRef.current ?? ""));
        console.groupEnd();
      }
      const currentHash = getHash(snapshot);
      if (prevHashRef.current !== currentHash) {
        prevHashRef.current = currentHash;
        setItems([...snapshot]);
      }
    }
    const unsubscribe = service.subscribe(refresh);
    refresh();
    return unsubscribe.bind(service);
  }, [getSnapshot]);

  return items;
}
