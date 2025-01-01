import { createRetrieverTool } from "langchain/tools/retriever";
import { retriever } from "./mongodb";

export const notionRetrieverTool = createRetrieverTool(retriever, {
  name: "retrieve_place_to_go_database",
  description:
    "Retrieve curated recommendations of places to visit in Jakarta, including attractions, food spots, art venues, and cafes.",
});