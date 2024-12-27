import { ChatOpenAI } from "@langchain/openai";
import {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
  MemorySaver,
  Annotation,
} from "@langchain/langgraph";
import {
  HumanMessage,
  RemoveMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { v4 as uuidv4 } from "uuid";

const llm = new ChatOpenAI({ model: "gpt-4o-mini", temperature: 1 });

const GraphAnnotation = Annotation.Root({
  ...MessagesAnnotation.spec,
  summary: Annotation<string>({
    reducer: (_, action) => action,
    default: () => "",
  }),
});

const callModel = async (
  state: typeof GraphAnnotation.State
): Promise<Partial<typeof GraphAnnotation.State>> => {
  const { summary } = state;
  let { messages } = state;

  if (summary) {
    const systemMessage = new SystemMessage({
      id: uuidv4(),
      content: `Summary of conversation earlier: ${summary}`,
    });
    messages = [systemMessage, ...messages];
  }

  const response = await llm.invoke(messages);
  return { messages: [response] };
};

function shouldContinue(
  state: typeof GraphAnnotation.State
): "summarize_conversation" | typeof END {
  const messages = state.messages;

  if (messages.length > 10) {
    return "summarize_conversation";
  }
  return END;
}

async function summarizeConversation(
  state: typeof GraphAnnotation.State
): Promise<Partial<typeof GraphAnnotation.State>> {
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
      id: uuidv4(),
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

const workflow = new StateGraph(GraphAnnotation)
  .addNode("conversation", callModel)
  .addNode("summarize_conversation", summarizeConversation)
  .addEdge(START, "conversation")
  .addConditionalEdges("conversation", shouldContinue)
  .addEdge("summarize_conversation", END);

const memory = new MemorySaver();
export const graph = workflow.compile({ checkpointer: memory });
