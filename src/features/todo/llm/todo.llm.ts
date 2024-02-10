import { Logger } from "@/utils/logger";
import { LLMService } from "@/lib/llm";
import { promptLogger } from "@/features/debug/services/log.service";
import {
  NEW_TODO_PROMPT,
  UPDATE_TODO_PROMPT,
} from "./todo.llm.prompts";
import { TodoItem } from "../models";
import { NewTodoPromptRespose } from "../dtos";

export function debugPromptReponse(prompt: string, response: object) {
  promptLogger.addLog(
    `/// LLM Prompt: ///\n${prompt}\n\n/// LLM Response: ///\n${JSON.stringify(
      response
    )}`
  );
  Logger.debug(prompt);
  Logger.debug(response);
}

function getRandomInteger() {
  return Math.floor(Math.random() * 100);
}

function getMockTodoTexts(count: number = 1): Promise<Array<string>> {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          Array.from(new Array(count)).map(() => "Some random text to make the sentense longer for task " + getRandomInteger())
        ),
      2000
    )
  );
}

const MOCK_RESPONSE = process.env.VITE_MOCK_LLM_RESPONSE;

export async function getCompletedTodos(
  message: string,
  todos: Array<TodoItem>
): Promise<Array<string>> {
  if (!todos.length) return [];
  const prompt = UPDATE_TODO_PROMPT(message, todos);

  if (MOCK_RESPONSE) {
    const mockResponse = await getMockTodoTexts(0);
    debugPromptReponse(prompt, mockResponse);
    return mockResponse;
  }

  const response = JSON.parse(await LLMService.getPromoptResponse(prompt));
  debugPromptReponse(prompt, response);
  const data = (response.completedTodos ?? []) as Array<string>;
  return data;
}

export async function getNewTodos(
  message: string,
  existingTodos: Array<TodoItem>
): Promise<Array<NewTodoPromptRespose>> {
  if (message.length < 4) return [];
  const prompt = NEW_TODO_PROMPT(message, existingTodos);

  if (MOCK_RESPONSE) {
    const mockResponse = await getMockTodoTexts(3);
    debugPromptReponse(prompt, mockResponse);
    return mockResponse.map((text) => ({ text, category: "health" }));
  }

  const response = JSON.parse(await LLMService.getPromoptResponse(prompt));
  debugPromptReponse(prompt, response);
  // Filter out noise like `None`
  const todos = ((response.newTodos ?? []) as [NewTodoPromptRespose]).filter(
    (todo) => todo.text.length > 4
  );
  return todos;
}
