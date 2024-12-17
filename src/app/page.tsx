import { DarkModeToggle } from "@/components/dark-mode-toggle";

export default function Home() {
  return (
    <div className="relative container min-h-screen min-w-full flex justify-center items-center">
      <DarkModeToggle />
    </div>
  );
}
