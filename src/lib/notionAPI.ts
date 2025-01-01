import { NotionAPILoader } from "@langchain/community/document_loaders/web/notionapi";
import "dotenv/config";

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

export const notionDocs = await dbLoader.load();