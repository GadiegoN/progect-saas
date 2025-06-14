import { Loader2 } from "lucide-react";

export function Loading() {
  return (
    <div className="w-full h-96 flex justify-center items-center">
      <Loader2 className="animate-spin text-primary" />
    </div>
  );
}
