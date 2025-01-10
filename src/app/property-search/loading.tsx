import { HomeIcon } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div className="max-w-screen-lg mx-auto">
        <h1 className="text-4xl font-bold p-5">Property search</h1>
      </div>
      <Skeleton className="size-20 rounded-full bg-sky-950 text-white flex justify-center items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <HomeIcon />
      </Skeleton>
    </>
  );
}
