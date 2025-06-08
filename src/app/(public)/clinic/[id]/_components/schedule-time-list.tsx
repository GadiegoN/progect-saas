"use client";

import { Button } from "@/components/ui/button";
import {
  isToday,
  isSlotInThePast,
  isSlotSequenceAvailable,
} from "@/utils/schedule";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface ScheduleTimeListProps {
  selectedDate: Date;
  selectedTime: string;
  requiredSlots: number;
  bloquedTimes: string[];
  availableTimeSlots: TimeSlot[];
  clinicTimes: string[];
  onSelectTime: (time: string) => void;
}

export function ScheduleTimeList({
  selectedDate,
  selectedTime,
  requiredSlots,
  bloquedTimes,
  clinicTimes,
  availableTimeSlots,
  onSelectTime,
}: ScheduleTimeListProps) {
  const dateIsToday = isToday(selectedDate);

  return (
    <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
      {availableTimeSlots
        .filter((slot) => slot.time !== "")
        .map((slot) => {
          const sequenceOk = isSlotSequenceAvailable(
            slot.time,
            requiredSlots,
            clinicTimes,
            bloquedTimes
          );
          const slotIsPast = dateIsToday && isSlotInThePast(slot.time);
          const slotEnabled = slot.available && sequenceOk && !slotIsPast;

          return (
            <Button
              type="button"
              variant={selectedTime === slot.time ? "secondary" : "outline"}
              key={slot.time}
              size="lg"
              onClick={() => slotEnabled && onSelectTime(slot.time)}
              disabled={!slotEnabled}
            >
              {slot.time}
            </Button>
          );
        })}
    </div>
  );
}
