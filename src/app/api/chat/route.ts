import { graph } from "@/lib/openai/chatModel";
import { HumanMessage } from "@langchain/core/messages";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  try {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        graph
          .stream(
            {
              messages: [new HumanMessage(question)],
            },
            {
              configurable: { thread_id: "42" },
              streamMode: "messages",
            }
          )
          .then(async (response) => {
            for await (const chunk of response) {
              chunk.forEach((item: any) => {
                if (item.content !== undefined) {
                  controller.enqueue(encoder.encode(item.content));
                }
              });
            }
            controller.close();
          })
          .catch((error) => {
            console.error("Error streaming data:", error);
            controller.error(error);
          });
      },
    });

    return new NextResponse(stream, {
      headers: { "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error processing request." },
      { status: 500 }
    );
  }
}
