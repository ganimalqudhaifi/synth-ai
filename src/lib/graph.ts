import { END, MemorySaver, START, StateGraph } from "@langchain/langgraph";
import { GraphAnnotation } from "./annotations";
import { conversation } from "./nodes/callModel";
import { summarizeConversation } from "./nodes/summarizeConversations";

function shouldContinue(
  state: typeof GraphAnnotation.State
): "summarize_conversation" | typeof END {
  const messages = state.messages;

  if (messages.length > 10) {
    return "summarize_conversation";
  }
  return END;
}

const workflow = new StateGraph(GraphAnnotation)
  .addNode("conversation", conversation)
  .addNode("summarize_conversation", summarizeConversation)

  .addEdge(START, "conversation")
  .addConditionalEdges("conversation", shouldContinue)
  .addEdge("summarize_conversation", END);


export const graph = workflow.compile({ checkpointer: new MemorySaver });