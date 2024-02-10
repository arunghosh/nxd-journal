import { useCallback } from "react";
import { useServiceSync } from "@/hooks";
import { todoService } from "../services";

export function useTodos(category?: string) {
  const getSnapshot = useCallback(() => {
    return todoService.getTodoItems({ category });
  }, [category]);

  const todoItems = useServiceSync(todoService, getSnapshot, {
    debug: false,
    name: "todoList",
  });

  function addTodoItem(text: string) {
    todoService.addItem(text);
  }

  return {
    addTodoItem,
    todoItems,
  };
}
