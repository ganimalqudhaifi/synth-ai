"use client";

import { useRef, useState } from "react";
import { InputMessage } from "./input-message";
import { ChatMessage } from "@/types";
import InitialChatDisplay from "./initial-chat-display";
import { ChatLine } from "./chat-line";
import { scrollToBottom } from "@/lib/utils";

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
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updateMessages = (message: ChatMessage) => {
    setMessages((previousMessages) => [...previousMessages, message]);
  };

  const updateLastMessageContent = (newContent: string) => {
    setMessages((previousMessages) => {
      const updatedMessages = [...previousMessages];
      const lastMessageIndex = updatedMessages.length - 1;
      if (lastMessageIndex >= 0) {
        updatedMessages[lastMessageIndex] = {
          ...updatedMessages[lastMessageIndex],
          content: updatedMessages[lastMessageIndex].content + newContent,
        };
      }
      return updatedMessages;
    });
    setTimeout(() => scrollToBottom(containerRef), 100);
  };

  const sendQuestion = async (question: string) => {
    setIsLoading(true);
    updateMessages({ role: "user", content: question });

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!response.body) return;

      updateMessages({ role: "assistant", content: "" });

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        console.log({ chunk });
        updateLastMessageContent(chunk);
      }
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
      <div className="p-6 flex-grow overflow-auto" ref={containerRef}>
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
