import { If } from "@/components";
import { getAgeInDays } from "@/utils/time";
import { useTodos } from "../hooks/useTodos";
import { TodoListItem } from "./TodoListItem";
import { COMMON_CATEGOTY, TodoItem, TodoItemStatus } from "../models";
import { AddTodoItemInput } from "./AddTodoItemInput";

export function TodoList({ category }: { category?: string }) {
  const { todoItems } = useTodos(category);
  const filteredTodos = todoItems.filter(
    (todo) =>
      todo.status === TodoItemStatus.PENDING ||
      (todo.completedAt && getAgeInDays(todo.completedAt) < 2)
  );

  // TODO: Improve the empty view with some help text (Ask ChatGPT)
  // if (!filteredTodos.length)
  //   return (
  //     <div>
  //       You don't have any pending todos
  //       <If condition={category}>&nbsp;in {category} category</If>
  //       !!!
  //     </div>
  //   );

  const categoryTodoItems: Record<string, TodoItem[]> = {};

  filteredTodos.forEach((todo) => {
    categoryTodoItems[todo.category] ??= [];
    categoryTodoItems[todo.category].push(todo);
  });

  categoryTodoItems[COMMON_CATEGOTY] ??= [];
  const categories = Object.keys(categoryTodoItems).sort();

  return (
    <div>
      {categories.map((category) => (
        <div key={category}>
          <If condition={categories.length > 1}>
            <h2 className="capitalize text mt-5 -mb-1 sub-heading text-base">
              {category}
            </h2>
          </If>
          {categoryTodoItems[category].map((item) => (
            <TodoListItem key={item.id} todo={item} />
          ))}
          <div className="mt-2">
            <AddTodoItemInput category={category} />
          </div>
        </div>
      ))}
    </div>
  );
}
