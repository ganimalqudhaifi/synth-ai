import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

const chatSuggestion = [
  {
    id: 1,
    title: "Art and Aesthetic Escape",
    description:
      "Find me a place in Jakarta that combines art and aesthetic vibes with a cozy atmosphere.",
    cta: "Explore Art Venues",
    category: "art, aesthetic",
    emoji: "🎨",
  },
  {
    id: 2,
    title: "Spot the Best Sunset Views",
    description:
      "Locate a scenic spot in Jakarta where you can enjoy stunning sunsets while savoring delicious food.",
    cta: "Explore Sunset Dining",
    category: "food, sunset view",
    emoji: "🌅",
  },
  {
    id: 3,
    title: "Unveil the Best Night Destinations",
    description:
      "Uncover the best nighttime hangouts in Jakarta, from city lights to cozy cafes and aesthetic spots that shine after dark.",
    cta: "Explore Night Spots",
    category: "city light, cafe, aesthetic",
    emoji: "🌙",
  },
];

type InitialChatDisplayProps = {
  sendMessage: (value: string) => void;
};

export default function InitialChatDisplay({
  sendMessage,
}: InitialChatDisplayProps) {
  return (
    <div className="place-items-center">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>SA</AvatarFallback>
      </Avatar>
      <div className="py-6 text-center">
        <h1 className="text-neutral-600">Hi, there 👋</h1>
        <p className="text-xl">How we can help?</p>
      </div>
      <div className="flex gap-x-4 ">
        {chatSuggestion.map((suggestion, index) => (
          <Card
            key={index}
            className="flex-1 cursor-pointer"
            onClick={() => sendMessage(suggestion.description)}
          >
            <CardHeader>
              <CardTitle>{suggestion.emoji}</CardTitle>
              <CardDescription>{suggestion.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
