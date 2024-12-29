import { DocumentInterface } from "@langchain/core/documents";
import { Annotation, MessagesAnnotation } from "@langchain/langgraph";

export const GraphAnnotation = Annotation.Root({
  ...MessagesAnnotation.spec,
  summary: Annotation<string>({
    reducer: (x, y) => y ?? x ?? "",
  }),
  question: Annotation<string>({
    reducer: (x, y) => y ?? x ?? "",
  }),
  documents: Annotation<DocumentInterface["pageContent"][]>({
    reducer: (x, y) => y ?? x ?? [],
  }),
});