import Chat from "@/components/chat";

export default function Home() {
  return (
    <div className="container w-full flex flex-col justify-center max-w-[800px] min-h-[100vh] md:min-h-min flex-1 pt-4">
      <Chat />
    </div>
  );
}
