import Chat from "@/components/chat";
import { DarkModeToggle } from "@/components/dark-mode-toggle";

export default function Home() {
  return (
    <div className="container h-screen min-w-full flex flex-col justify-center px-52 py-10">
      <div className="px-6 flex justify-end">
        <DarkModeToggle />
      </div>
      <Chat />
    </div>
  );
}
