import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

const chatSuggestion = [
  {
    id: 1,
    title: "Discover Jakarta’s Rich History",
    description:
      "Visit iconic landmarks like Monas and Kota Tua to explore Jakarta's heritage.",
    cta: "Find Historical Places",
    category: "history",
    emoji: "🏟",
  },
  {
    id: 2,
    title: "Taste Jakarta’s Culinary Delights",
    description:
      "Enjoy delicious dishes at top restaurants or popular street food spots.",
    cta: "Explore Dining Options",
    category: "food",
    emoji: "🍴",
  },
  {
    id: 3,
    title: "Experience the Vibrant City Life",
    description:
      "Explore malls, family attractions, and exciting city activities.",
    cta: "Discover Fun Activities",
    category: "entertainment",
    emoji: "🏞",
  },
];

export default function InitialChatDisplay() {
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
          <Card key={index} className="flex-1">
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
