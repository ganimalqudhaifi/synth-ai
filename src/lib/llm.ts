import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";

export const llm = new ChatOpenAI({ model: "gpt-4o-mini", temperature: 1 });
export const streamingLlm = new ChatOpenAI({ model: "gpt-4o-mini", temperature: 0, streaming: true });
export const highQualityLlm = new ChatOpenAI({ model: "gpt-4o", temperature: 0 });

export const textEmbedding = new OpenAIEmbeddings({ model: "text-embedding-3-small" });