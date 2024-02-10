import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function getChatCompletion(
  prompt: string
  // functions: ChatCompletionFunctions[]
): Promise<string> {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      // {
      //   role: "system",
      //   content: "You only speak JSON and won't write text that isn't JSON",
      // },
      { role: "user", content: prompt },
    ],
    temperature: 0,
    // functions,
  });
  const resonse = completion.data.choices[0].message?.content;
  return resonse ?? "";
}
