import { GraphAnnotation } from "../annotations";
import { retriever } from "../notionAPI";

export const retrieve = async (
  state: typeof GraphAnnotation.State
): Promise<Partial<typeof GraphAnnotation.State>> => {
  console.log("---RETRIEVE---");

  const documents = await retriever
    .withConfig({ runName: "FetchRelevantDocuments" })
    .invoke(state.question);

  const documentsContent = documents.map((doc) => doc.pageContent)

  return {
    documents: documentsContent,
  };
}