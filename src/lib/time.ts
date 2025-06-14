export function generateTimeSlots(): string[] {
  const timeSlots: string[] = [];
  const startTime = 5;
  const endTime = 24;
  const interval = 30;

  for (let hour = startTime; hour < endTime; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const timeSlot = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      timeSlots.push(timeSlot);
    }
  }

  return timeSlots;
}
