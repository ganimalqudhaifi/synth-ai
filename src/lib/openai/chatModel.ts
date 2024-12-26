import { ChatOpenAI } from "@langchain/openai";
import {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
  MemorySaver,
} from "@langchain/langgraph";
import { SystemMessage } from "@langchain/core/messages";

const llm = new ChatOpenAI({ model: "gpt-4o-mini", temperature: 1 });

const callModel = async (state: typeof MessagesAnnotation.State) => {
  const systemPrompt =
    "You are a helpful assistant. " +
    "Answer all questions to the best of your ability.";

  const messages = [new SystemMessage(systemPrompt), ...state.messages];

  const response = await llm.invoke(messages);

  return { messages: [response] };
};

const workflow = new StateGraph(MessagesAnnotation)
  .addNode("model", callModel)
  .addEdge(START, "model")
  .addEdge("model", END);

const memory = new MemorySaver();
export const graph = workflow.compile({ checkpointer: memory });
