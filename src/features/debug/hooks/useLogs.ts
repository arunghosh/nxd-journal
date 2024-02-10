import { useServiceSync } from "@/hooks";
import { promptLogger } from "../services/log.service";

export function useLogs() {
  const logs = useServiceSync(promptLogger, () => promptLogger.getItems());

  return {
    logs,
  };
}
