import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChatMessage } from "@/types";

export function ChatLine({ role = "assistant", content }: ChatMessage) {
  if (!content) {
    return null;
  }

  return (
    <div>
      <Card className="mb-2">
        <CardHeader>
          <CardTitle
            className={
              role != "assistant"
                ? "text-amber-500 dark:text-amber-200"
                : "text-blue-500 dark:text-blue-200"
            }
          >
            {role == "assistant" ? "AI" : "You"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">{content}</CardContent>
        <CardFooter>
          <CardDescription className="w-full"></CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
