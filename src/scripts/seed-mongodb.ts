import { client, collection, vectorStore } from "../lib/mongodb";
import { notionDocs } from "../lib/notionAPI";
import 'dotenv/config'

(async () => {
  await collection.deleteMany({})

  console.log("---START SEEDING---")

  for (const doc of notionDocs) {
    await vectorStore.addDocuments([doc])
    console.log("Successfully processed & saved record:", doc.metadata.properties._title);
  }
  try {
    console.log("---DATABASE SEEDING COMPLETED---")
  } catch (error) {
    console.log("---ERROR SEEDING DATABASE---")
    console.error(error)
  } finally {
    client.close()
  }
})()