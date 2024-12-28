import { HumanMessage, RemoveMessage } from "@langchain/core/messages";
import { GraphAnnotation } from "../annotations";
import { llm } from "../llm";

export const summarizeConversation = async (
  state: typeof GraphAnnotation.State
): Promise<Partial<typeof GraphAnnotation.State>> => {
  const { summary, messages } = state;
  let summaryMessage: string;

  if (summary) {
    summaryMessage =
      `This is summary of the conversation to date: ${summary}\n\n` +
      "Extend the summary by taking into account the new messages above:";
  } else {
    summaryMessage = "Create a summary of the conversation above:";
  }

  const allMessages = [
    ...messages,
    new HumanMessage({
      content: summaryMessage,
    }),
  ];

  const response = await llm.invoke(allMessages);
  const deleteMessages = messages
    .slice(0, -2)
    .map((m) => new RemoveMessage({ id: m.id as string }));
  if (typeof response.content !== "string") {
    throw new Error("Expected a string response from the model");
  }
  return { summary: response.content, messages: deleteMessages };
}