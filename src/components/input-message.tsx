"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useRef } from "react";

type InputMessageProps = {
  input: string;
  setInput: (value: string) => void;
  sendMessage: (value: string) => void;
  placeholder: string;
  isLoading: boolean;
};

export function InputMessage({
  input,
  setInput,
  sendMessage,
  placeholder,
  isLoading,
}: InputMessageProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      console.log("h", textareaRef.current.style.height);
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${
        textareaRef.current.scrollHeight + 2
      }px`;
    }
  };

  return (
    <div className="p-4 flex clear-both sticky bottom-0 bg-background items-end pb-8">
      <Textarea
        aria-label="chat input"
        ref={textareaRef}
        className="resize-none max-h-36"
        required
        placeholder={placeholder}
        value={input}
        disabled={isLoading}
        onInput={adjustTextareaHeight}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            sendMessage(input);
            setInput("");
            if (textareaRef.current) {
              textareaRef.current.style.height = "auto";
            }
          }
        }}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <Button
        type="submit"
        size="icon"
        disabled={input.length < 2 || isLoading}
        className="ml-4 flex-none rounded-full"
        onClick={() => {
          sendMessage(input);
          setInput("");
          if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
          }
        }}
      >
        {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
      </Button>
    </div>
  );
}
