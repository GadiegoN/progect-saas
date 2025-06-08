"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProfileImage } from "@/components/ui/profile-image";
import { Prisma } from "@/generated/prisma";
import {
  AppointmentFormData,
  useAppointmentForm,
} from "@/hooks/use-schedule-form";
import { formatPhone } from "@/utils/format-phone";
import { Clock12, Loader, MapPin } from "lucide-react";
import { DateTimePicker } from "./date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { ScheduleTimeList } from "./schedule-time-list";
import { createNewAppointment } from "../_actions/create-appointments";
import { toast } from "sonner";

type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true;
    services: true;
  };
}>;

interface ScheduleContentProps {
  clinic: UserWithServiceAndSubscription;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

export function ScheduleContent({ clinic }: ScheduleContentProps) {
  const form = useAppointmentForm();
  const { watch } = form;

  const selectedDate = watch("date");
  const selectedServiceId = watch("serviceId");

  const [selectedTime, setSelectedTime] = useState<string>("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);

  const [blockedTimes, setBlockedTimes] = useState<string[]>([]);

  const fetchBlockedTimes = useCallback(
    async (date: Date): Promise<string[]> => {
      setLoadingSlots(true);

      try {
        const dateString = date.toISOString().split("T")[0];
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/schedule/get-appointments?userId=${clinic.id}&date=${dateString}`
        );

        const jsonData = await response.json();
        setLoadingSlots(false);

        return jsonData;
      } catch (err) {
        console.error(err);

        setLoadingSlots(false);
        return [];
      }
    },
    [clinic.id]
  );

  useEffect(() => {
    if (selectedDate) {
      fetchBlockedTimes(selectedDate).then((blocked) => {
        setBlockedTimes(blocked);

        const times = clinic.times || [];

        const finalSlots = times.map((time) => ({
          time,
          available: !blocked.includes(time),
        }));

        const stillAvailable = finalSlots.find(
          (slot) => slot.time === selectedTime && slot.available
        );

        if (!stillAvailable) {
          setSelectedTime("");
        }

        setAvailableTimeSlots(finalSlots);
      });
    }
  }, [
    selectedDate,
    selectedServiceId,
    clinic.times,
    fetchBlockedTimes,
    selectedTime,
  ]);

  async function handleRegisterAppointment(formData: AppointmentFormData) {
    if (!selectedTime) {
      return;
    }

    const response = await createNewAppointment({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      time: selectedTime,
      date: formData.date,
      serviceId: formData.serviceId,
      clinicId: clinic.id,
    });

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success("Consulta agendada com sucesso.");
    form.reset();
    setSelectedTime("");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-32 bg-primary" />

      <section className="container mx-auto px-4 -mt-16">
        <div className="max-w-2xl mx-auto">
          <article className="flex flex-col items-center gap-2">
            <ProfileImage imageUrl={clinic.image ?? ""} />

            <div className="mt-4" />

            <h1 className="text-2xl font-bold">{clinic.name}</h1>
            {clinic.address && (
              <div className="flex items-center gap-2">
                <MapPin />
                <span>{clinic.address}</span>
              </div>
            )}
          </article>
        </div>
      </section>

      <section className="max-w-2xl mx-auto w-full mt-6">
        <Form {...form}>
          <form
            id="schedule"
            onSubmit={form.handleSubmit(handleRegisterAppointment)}
            className="space-y-6 bg-white p-6 border rounded-md shadow-2xl mx-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu e-mail" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(XX) XXXXX-XXXX"
                      {...field}
                      onChange={(e) => {
                        const formatted = formatPhone(e.target.value);
                        field.onChange(formatted);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <Label>Data do agendamento</Label>
                  <FormControl>
                    <DateTimePicker
                      initialDate={new Date()}
                      className="w-full rounded border p-2 hover:bg-gray-100 cursor-pointer"
                      onChange={(date) => {
                        if (date) {
                          field.onChange(date);
                          setSelectedTime("");
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serviceId"
              render={({ field }) => (
                <FormItem>
                  <Label>Serviço</Label>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedTime("");
                      }}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        {clinic.services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            <span className="text-gray-700 font-bold capitalize">
                              {service.name}
                            </span>{" "}
                            - ({Math.floor(service.duration / 60)}h{" "}
                            {service.duration % 60}min)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedServiceId && (
              <div className="space-y-2">
                <Label id="schedule">Horário disponiveis</Label>

                <div className="bg-gray-100 p-4 rounded-lg">
                  {loadingSlots ? (
                    <>
                      <p className="text-center text-gray-700 font-semibold">
                        Carregando horários
                      </p>
                      <Loader className="animate-spin mx-auto" />
                    </>
                  ) : availableTimeSlots.length === 0 ? (
                    <>
                      <p className="text-center text-gray-700 font-semibold">
                        Nenhum horário disponivel
                      </p>
                      <Clock12 className="mx-auto" />
                    </>
                  ) : (
                    <ScheduleTimeList
                      onSelectTime={(time) => setSelectedTime(time)}
                      clinicTimes={clinic.times}
                      selectedDate={selectedDate}
                      selectedTime={selectedTime}
                      requiredSlots={
                        clinic.services.find(
                          (service) => service.id === selectedServiceId
                        )
                          ? Math.ceil(
                              clinic.services.find(
                                (service) => service.id === selectedServiceId
                              )!.duration / 30
                            )
                          : 1
                      }
                      bloquedTimes={blockedTimes}
                      availableTimeSlots={availableTimeSlots}
                    />
                  )}
                </div>
              </div>
            )}

            {clinic.status ? (
              <Button
                className="w-full"
                type="submit"
                disabled={
                  !watch("name") ||
                  !watch("email") ||
                  !watch("serviceId") ||
                  !watch("phone")
                    ? true
                    : false
                }
              >
                Realizar agendamento
              </Button>
            ) : (
              <p className="bg-red-500 select-none text-white text-center font-bold p-2 rounded-md cursor-not-allowed">
                Agendamentos fechados.
              </p>
            )}
          </form>
        </Form>
      </section>
    </div>
  );
}
