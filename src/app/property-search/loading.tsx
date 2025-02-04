import { HomeIcon } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Skeleton className="size-20 rounded-full bg-sky-950 text-white flex justify-center items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <HomeIcon />
      </Skeleton>
    </>
  );
}
