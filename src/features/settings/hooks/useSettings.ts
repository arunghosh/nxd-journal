import { useLocalStorage } from "@/hooks";
import { LS_KEYS } from "@/utils/storage";

export function useSettings() {
  const [openAiKey, setOpenAiKey] = useLocalStorage<string>(LS_KEYS.OPEN_AI, {
    secure: true,
  });
  return {
    openAiKey,
    hasMandatorySettings: !!openAiKey,
    setOpenAiKey,
  };
}
