import { chain } from "@/lib/openai/chatModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  try {
    const stream = await chain.stream(question);

    return new NextResponse(stream, {
      headers: {
        "content-type": "text/event-stream",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error processing request." },
      { status: 500 }
    );
  }
}
