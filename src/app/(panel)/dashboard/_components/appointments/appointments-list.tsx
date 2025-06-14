"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Prisma } from "@/generated/prisma";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

type AppointmentWithService = Prisma.AppointmentGetPayload<{
  include: {
    service: true;
  };
}>;

interface AppointmentsListProps {
  times: string[];
}

export function AppointmentsList({ times }: AppointmentsListProps) {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");

  const { data, isLoading } = useQuery({
    queryKey: ["get-appointments", date],
    queryFn: async () => {
      let activeDate = date;

      if (!activeDate) {
        const today = format(new Date(), "yyyy-MM-dd");
        activeDate = today;
      }

      const url = `${process.env.NEXT_PUBLIC_URL}/api/clinic/appointments?date=${activeDate}`;

      const response = await fetch(url);

      const json = (await response.json()) as AppointmentWithService[];

      console.log(json);

      if (!response.ok) {
        return [];
      }

      return json;
    },
    staleTime: 20000,
  });

  const occupantMap: Record<string, AppointmentWithService> = {};

  if (data && data.length > 0) {
    for (const appointments of data) {
      const reqSlots = Math.ceil(appointments.service.duration / 30);

      const startIndex = times.indexOf(appointments.time);

      if (startIndex !== -1) {
        for (let i = 0; i < reqSlots; i++) {
          const slotIndex = startIndex + i;

          if (slotIndex < times.length) {
            occupantMap[times[slotIndex]] = appointments;
          }
        }
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between py-4">
          <CardTitle className="text-xl lg:text-2xl">Agendamentos</CardTitle>
          <button>Selecionar Data</button>
        </div>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[calc(100vh-20rem)] lg:h-[calc(100vh-15rem)]">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Loader2 className="animate-spin text-primary" />
            </div>
          ) : (
            times.map((slot) => {
              const occupant = occupantMap[slot];

              if (occupant) {
                return (
                  <div
                    key={slot}
                    className="flex items-center py-2 px-6 border-t last:border-b"
                  >
                    <div className="w-16 text-sm font-semibold">{slot}</div>
                    <div className="">
                      <div className="text-sm font-semibold">
                        {occupant.name} - {occupant.phone}
                      </div>
                      <div className="flex-1 text-sm text-gray-500">
                        {occupant.email}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={slot}
                  className="flex items-center py-2 px-6 border-t last:border-b"
                >
                  <div className="w-16 text-sm font-semibold">{slot}</div>
                  <div className="flex-1 text-sm text-gray-500">Disponivel</div>
                </div>
              );
            })
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
