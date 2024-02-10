import { TodoItem, TodoItemStatus } from "../models";

const TODO_AS_ARRAY = true;

function getTodoTextArray(
  todos: Array<TodoItem>,
  status: TodoItemStatus
): string {
  return JSON.stringify(
    todos.filter((t) => t.status === status).map((t) => t.text)
  );
}

function getTodoListMarkdown(
  todos: Array<TodoItem>,
  status: TodoItemStatus
): string {
  return todos
    .filter((t) => t.status === status)
    .map((t, i) => `${i + 1}. ${t.text}`)
    .join("\n");
}

const todoSerializer = TODO_AS_ARRAY ? getTodoTextArray : getTodoListMarkdown;

export const NEW_TODO_PROMPT = (text: string, _todos: Array<TodoItem>) => `
**Extract Todos**

input_text: """
${text}
"""

Instructions: """
1. Extract the list of todos with category from input_text. 
2. Categories can be work, personal, shopping, health, or a custom category.
3. Iterate through the todos and remove any todo that is in completed state.
"""

Output: """
Your response should be formatted as a JSON object with key "newTodos". And "newTodos" should be a JSON array of objects having new todo text and category.
Example Output:
{
  "newTodos": [{
    text: "<todo text>",
    category: "<category>"
  }]
}
"""
`;

export const UPDATE_TODO_PROMPT = (text: string, todos: Array<TodoItem>) => `
**Identify Completed Todos**

You have been given a list of todos and user_input. Based on user_input, determine subset of todos are completed.

todos: """
${todoSerializer(todos, TodoItemStatus.PENDING)}
"""

user_input: """
${text}
"""

Instructions: """
1. Split user_input to multiple sentences if refering to mulitple items.
2. Analyse each todo in todos and select todos that meet all the below conditions.
"""

Conditions: """
1. The user_input should mention the todo.
2. The user_input should convey that the item is complete.
3. The tense of the user_input should be past.
"""

Output: """
The output should be subset of todos that meet the above conditions.
Output is formatted as a JSON array of strings, with the key "completedTodos". 
Example Output:
{
  "completedTodos": ["Completed Todo 1", "Completed Todo 2"]
}
`;
