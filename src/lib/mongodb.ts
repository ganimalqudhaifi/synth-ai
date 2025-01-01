import { MongoDBAtlasVectorSearch } from '@langchain/mongodb'
import { MongoClient } from "mongodb";
import 'dotenv/config';
import { textEmbedding } from './llm';

export const client = new MongoClient(process.env.MONGODB_ATLAS_URI as string);

export const collection = client
  .db(process.env.MONGODB_ATLAS_DB_NAME as string)
  .collection(process.env.MONGODB_ATLAS_COLLECTION_NAME as string)

export const vectorStore = new MongoDBAtlasVectorSearch(textEmbedding, {
  collection: collection,
  indexName: "vector_index",
  textKey: "text",
  embeddingKey: "embedding",
})

export const retriever = vectorStore.asRetriever()