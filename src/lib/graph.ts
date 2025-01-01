import { END, MemorySaver, START, StateGraph } from "@langchain/langgraph";
import { GraphAnnotation } from "./annotations";
import { conversation } from "./nodes/conversation";
import { summarizeConversation } from "./nodes/summarizeConversations";
import { generate } from "./nodes/generate";
import { retrieve } from "./nodes/retrieve";
import { notionRetrieverTool } from "./tools";

export const tools = [notionRetrieverTool]

function shouldSummarize(
  state: typeof GraphAnnotation.State
): "summarize_conversation" | typeof END {
  const messages = state.messages;

  if (messages.length > 10) {
    return "summarize_conversation";
  }
  return END;
}

function shouldRetrieve(state: typeof GraphAnnotation.State): string {
  const { question } = state;
  console.log("---DECIDE TO RETRIEVE---");

  if (question) {
    console.log("---DECISION: RETRIEVE---");
    return "retrieve";
  }

  return shouldSummarize(state)
}

const workflow = new StateGraph(GraphAnnotation)
  .addNode("conversation", conversation)
  .addNode("summarize_conversation", summarizeConversation)
  .addNode("retrieve", retrieve)
  .addNode("generate", generate)

  .addEdge(START, "conversation")
  .addConditionalEdges("conversation", shouldRetrieve)
  .addEdge("retrieve", "generate")
  .addConditionalEdges("generate", shouldSummarize)
  .addEdge("summarize_conversation", END);


export const graph = workflow.compile({ checkpointer: new MemorySaver });