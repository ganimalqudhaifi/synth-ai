import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";

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
  return (
    <div className="p-4 flex clear-both sticky bottom-0 bg-background">
      <Input
        type="text"
        aria-label="chat input"
        className="rounded-full"
        required
        placeholder={placeholder}
        value={input}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage(input);
            setInput("");
          }
        }}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <Button
        type="submit"
        size="icon"
        disabled={input.length < 2}
        className="ml-4 flex-none rounded-full"
        onClick={() => {
          sendMessage(input);
          setInput("");
        }}
      >
        {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
      </Button>
    </div>
  );
}
