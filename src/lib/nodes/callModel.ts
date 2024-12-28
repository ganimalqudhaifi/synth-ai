import { SystemMessage } from "@langchain/core/messages";
import { GraphAnnotation } from "../annotations";
import { llm } from "../llm";

export const conversation = async (
  state: typeof GraphAnnotation.State
): Promise<Partial<typeof GraphAnnotation.State>> => {
  const { summary } = state;
  let { messages } = state;

  if (summary) {
    const systemMessage = new SystemMessage({
      content: `Summary of conversation earlier: ${summary}`,
    });
    messages = [systemMessage, ...messages];
  }

  const response = await llm.invoke(messages);
  return { messages: [response] };
};