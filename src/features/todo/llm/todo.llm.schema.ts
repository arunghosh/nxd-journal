import { TodoItemStatus } from "../models";

// Check if tools to convert typescript to schema
const todoItemBaseSchema = {
  text: { type: "string" },
  status: { type: "string", enum: Object.values(TodoItemStatus) },
};

export const updatedTodoListFunction = {
  name: "update_todos",
  parameters: {
    type: "object",
    properties: {
      todos: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            ...todoItemBaseSchema,
          },
          required: ["id", "text", "status"],
        },
      },
    },
  },
};

export const newTodoListFunction = {
  name: "get_new_todos",
  parameters: {
    type: "array",
    items: {
      type: "object",
      properties: {
        ...todoItemBaseSchema,
      },
      required: ["text"],
    },
  },
};
