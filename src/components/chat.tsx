"use client";

import { useState } from "react";
import { InputMessage } from "./input-message";
import { ChatMessage } from "@/types";
import InitialChatDisplay from "./initial-chat-display";
import { ChatLine } from "./chat-line";

const initialMessage: ChatMessage[] = [
  {
    role: "assistant",
    content: "Hi there! How can I assist you today? 😊",
  },
];

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessage);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateMessages = (message: ChatMessage) => {
    setMessages((previousMessages) => [...previousMessages, message]);
  };

  const sendQuestion = async (question: string) => {
    setIsLoading(true);
    updateMessages({ role: "user", content: question });

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const { answer } = await response.json();
      console.log("jawaban: ", answer);

      updateMessages({ role: "assistant", content: answer });
    } catch (error) {
      console.log("Error occured ", error);
    } finally {
      setIsLoading(false);
    }
  };

  let placeholder = "Type a message to start ...";

  if (messages?.length > 2) {
    placeholder = "Type to continue your conversation";
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 flex-grow overflow-auto">
        {messages.length <= 0 ? (
          <InitialChatDisplay />
        ) : (
          messages.map(({ content, role }, index) => (
            <ChatLine key={index} role={role} content={content} />
          ))
        )}
      </div>
      <InputMessage
        input={input}
        isLoading={isLoading}
        placeholder={placeholder}
        setInput={setInput}
        sendMessage={sendQuestion}
      />
    </div>
  );
}