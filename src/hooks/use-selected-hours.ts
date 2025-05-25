import { useState } from "react";

export function useSelectedHours(initial: string[] = []) {
  const [selectedHours, setSelectedHours] = useState<string[]>(initial);

  const toggleHour = (hour: string) => {
    setSelectedHours((prev) =>
      prev.includes(hour) ? prev.filter((h) => h !== hour) : [...prev, hour]
    );
  };

  return {
    selectedHours,
    toggleHour,
    setSelectedHours,
  };
}
