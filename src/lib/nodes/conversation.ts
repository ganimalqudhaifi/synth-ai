import { RemoveMessage, SystemMessage } from "@langchain/core/messages";
import { GraphAnnotation } from "../annotations";
import { streamingLlm } from "../llm";
import { tools } from "../graph";

export const conversation = async (
  state: typeof GraphAnnotation.State
): Promise<Partial<typeof GraphAnnotation.State>> => {
  const { summary } = state;
  let { messages } = state;

  const lastMessage = messages[messages.length - 1]

  if (summary) {
    const systemMessage = new SystemMessage({
      content: `Summary of conversation earlier: ${summary}`,
    });
    messages = [systemMessage, ...messages];
  }

  const model = streamingLlm.bindTools(tools)
  const response = await model.invoke(messages);

  // If the response use tool_calls move the message state to question state
  if ("tool_calls" in response && Array.isArray(response.tool_calls) && response.tool_calls.length) {
    if (typeof lastMessage.content !== "string") {
      throw new Error("Expected a string question from the messages");
    }
    const deleteMessage = new RemoveMessage({ id: lastMessage.id as string })
    return { question: lastMessage.content, messages: [deleteMessage] }
  }

  return { messages: [response] };
};