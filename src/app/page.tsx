import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-[calc(100vh-96px)] max-md:h-screen w-full overflow-auto">
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: `url("/background.webp")`,
          filter: "blur(5px)",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
      </div>

      <div className="relative z-10 text-white p-10 flex flex- h-full col items-center justify-center text-3xl uppercase font-bold tracking-widest">
        <h1 className="flex flex-col max-w-3/4 text-center">
          <span>Find your new home</span>
          <span>with fire homes</span>

          <Button
            className="mt-6 max-w-96 px-10 py-6 mx-auto text-xl"
            style={{
              WebkitAppearance: "none",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <Search />
            <Link
              href="/property-search"
              className="uppercase tracking-widest hover:underline"
            >
              Search Properties
            </Link>
          </Button>
        </h1>
      </div>
    </div>
  );
}
