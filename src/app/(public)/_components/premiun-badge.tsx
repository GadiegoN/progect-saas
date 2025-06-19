import { Star } from "lucide-react";

export function PremiumBadge() {
  return (
    <div className="absolute top-0 right-0 bg-yellow-500 size-12 z-10 rounded-bl-full flex items-center justify-center">
      <Star className="text-white ml-2 mb-2" />
    </div>
  );
}
