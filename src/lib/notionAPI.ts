import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createRetrieverTool } from "langchain/tools/retriever";
import { NotionAPILoader } from "@langchain/community/document_loaders/web/notionapi";
import "dotenv/config";
import { textEmbedding } from "./llm";

const PAGE_URL =
  "https://www.notion.so/ganimalqudhaifi/16792082eb40806db59bce67c0e72967?v=59bb3e0c289b4345931f76855bd58ab4&pvs=4";

const extractIdFromPageUrl = (url: string) => {
  const pageIdMatch = url.match(/(?<!=)[0-9a-f]{32}/)
  const Id = pageIdMatch ? pageIdMatch[0] : ""
  return Id
}


const dbLoader = new NotionAPILoader({
  clientOptions: {
    auth: process.env.NOTION_INTEGRATION_TOKEN,
  },
  id: extractIdFromPageUrl(PAGE_URL),
  type: "database",
  onDocumentLoaded: (current, total, currentTitle) => {
    console.log(`Loaded Page: ${currentTitle} (${current}/${total})`);
  },
  callerOptions: {
    maxConcurrency: 64,
  },
  propertiesAsHeader: true,
});

const dbDocs = await dbLoader.load();

const vectorStore = await MemoryVectorStore.fromDocuments(dbDocs, textEmbedding);

const retriever = vectorStore.asRetriever();

export const notionRetrieverTool = createRetrieverTool(retriever, {
  name: "retrieve_place_to_go_database",
  description:
    "Retrieve curated recommendations of places to visit in Jakarta, including attractions, food spots, art venues, and cafes.",
});
