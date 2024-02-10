import { getAge } from "@/utils/time";
import { TodoItem, TodoItemStatus } from "../models";
import { todoService } from "../services";

interface Props {
  todo: TodoItem;
}

function CheckIcon() {
  return (
    <span className="flex items-center justify-center w-5 h-5 text-transparent border-2 border-slate-300 rounded-full">
      <svg
        className="w-4 h-4 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

export function TodoListItem({ todo }: Props) {
  const checked = todo.status === TodoItemStatus.COMPLETED;
  return (
    <div>
      <div>
        <input
          readOnly
          className="hidden"
          type="checkbox"
          id={`${todo.id}`}
          checked={checked}
          onClick={() => todoService.toggleCompletedStatus(todo)}
        />
        <label
          className="flex items-center my-3 pr-2 rounded cursor-pointer hover:bg-slate-100"
          htmlFor={`${todo.id}`}
        >
          <CheckIcon />
          <span className="ml-4 text-sm leading-4">
            {todo.text}
            <div className="text-slate-400 text-xs ml-2 mt-1 inline">
              {getAge(todo.addedAt)}
            </div>
          </span>
        </label>
      </div>
    </div>
  );
}
