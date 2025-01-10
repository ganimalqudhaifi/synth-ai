import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

const chatSuggestion = [
  {
    id: 1,
    title: "Rooftop Cafes with a View",
    description:
      "Discover the best rooftop cafes in Jakarta to enjoy breathtaking city views and a relaxed atmosphere.",
    cta: "Explore Rooftop Cafes",
    category: "rooftop, city view, cafe",
    emoji: "🏙️",
  },
  {
    id: 2,
    title: "Cozy WFC-Friendly Spots",
    description:
      "Find a work-from-cafe-friendly place in Jakarta that offers a cozy atmosphere, reliable Wi-Fi, and great coffee.",
    cta: "Find WFC Spots",
    category: "WFC, cozy, cafe",
    emoji: "💻",
  },
  {
    id: 3,
    title: "Top Food Tenants to Try",
    description:
      "Get recommendations for must-try food tenants in Jakarta, from local favorites to trending culinary gems.",
    cta: "Explore Food Tenants",
    category: "food, culinary, Jakarta",
    emoji: "🍴",
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
      <div className="flex flex-col gap-4 md:flex-row">
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
