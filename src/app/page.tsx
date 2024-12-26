import Chat from "@/components/chat";
import { DarkModeToggle } from "@/components/dark-mode-toggle";

export default function Home() {
  return (
    <div>
      <div className="relative z-10 container h-screen min-w-full flex flex-col justify-center md:px-24 lg:px-52 py-10">
        <div className="px-6 flex justify-end">
          <DarkModeToggle />
        </div>
        <Chat />
      </div>
      {/* <div className="min-w-72 h-44 bg-purple-700 rounded-full absolute z-1 top-[70%] left-[70%] translate-x-[-50%] translate-y-[-50%] blur-[120px]"></div>
      <div className="min-w-48 h-32 bg-sky-700 rounded-full absolute z-1 top-[30%] left-[10%] taranslate-x-[-10%] translate-y-[-50%] blur-[90px]"></div> */}
    </div>
  );
}
