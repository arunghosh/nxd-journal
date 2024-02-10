import { useServiceSync } from "@/hooks";
import { todoService } from "..";

export function useCategories() {
  const categories = useServiceSync(
    todoService,
    () => todoService.activeCategories
  );
  return categories;
}
