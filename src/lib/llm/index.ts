import { getChatCompletion } from "./openai";

export interface ILLMService {
  getPromoptResponse(prompt: string): Promise<string>;
}

export class OpenAIApiService implements ILLMService {

  public getPromoptResponse(prompt: string): Promise<string> {
    return getChatCompletion(prompt);
  }
}


export const LLMService = new OpenAIApiService();