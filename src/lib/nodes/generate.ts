import { GraphAnnotation } from "../annotations";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { streamingLlm } from "../llm";


export async function generate(state: typeof GraphAnnotation.State): Promise<Partial<typeof GraphAnnotation.State>> {
  console.log("---GENERATE---");

  const { question, documents } = state;

  if (!documents) {
    throw new Error("No documents found in tha state")
  }

  if (!question) {
    throw new Error("No question found in tha state")
  }

  const prompt = ChatPromptTemplate.fromMessages([
    ["human", `You are an assistant designed to answer questions using the provided context. If you are unsure of the answer, respond with "I don't know." Keep your response concise, formatted in Markdown, and limited to three sentences.
    Question: {question} 
    Context: {context} 
    Answer:`],
  ])

  const ragChain = prompt.pipe(streamingLlm);

  const response = await ragChain.invoke({
    context: documents,
    question,
  });

  return {
    messages: [response], question: "",
  };
}
