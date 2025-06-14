"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Prisma } from "@/generated/prisma";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Eye, Loader2, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { cancelAppointment } from "../../_actions/cancel-appointment";
import { toast } from "sonner";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { AppointmentsDialog } from "./appointments-dialog";
import { AppointmentsButtonDate } from "./appointments-button-date";

export type AppointmentWithService = Prisma.AppointmentGetPayload<{
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
  const queryClient = useQueryClient();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [detailAppointment, setDetailAppointment] =
    useState<AppointmentWithService | null>(null);

  const { data, isLoading, refetch } = useQuery({
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
    refetchInterval: 30000,
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

  async function handleCancelAppointment(appointmentId: string) {
    const response = await cancelAppointment({ appointmentId });

    if (response.error) {
      toast.error(response.error);
    }

    queryClient.invalidateQueries({
      queryKey: ["get-appointments"],
    });
    await refetch();
    toast.success(response.data);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between py-4">
            <CardTitle className="text-xl lg:text-2xl">Agendamentos</CardTitle>
            <AppointmentsButtonDate />
          </div>
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-[calc(100vh-20rem)] lg:h-[calc(100vh-15rem)] pb-2">
            {isLoading ? (
              <div className="w-full h-32 flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" />
              </div>
            ) : (
              [...times]
                .sort((a, b) => {
                  const [aHour, aMin] = a.split(":").map(Number);
                  const [bHour, bMin] = b.split(":").map(Number);
                  return aHour - bHour || aMin - bMin;
                })
                .map((slot) => {
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
                            {occupant.name}
                          </div>
                          <div className="flex-1 text-sm text-gray-500">
                            {occupant.service.name}
                          </div>
                        </div>

                        <div className="ml-auto">
                          <div className="flex gap-px">
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setDetailAppointment(occupant);
                                }}
                              >
                                <Eye className="size-4 text-primary" />
                              </Button>
                            </DialogTrigger>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                handleCancelAppointment(occupant.id)
                              }
                            >
                              <X className="size-4 text-destructive" />
                            </Button>
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
                      <div className="flex-1 text-sm text-gray-500">
                        Disponivel
                      </div>
                    </div>
                  );
                })
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      <AppointmentsDialog appointment={detailAppointment} />
    </Dialog>
  );
}
