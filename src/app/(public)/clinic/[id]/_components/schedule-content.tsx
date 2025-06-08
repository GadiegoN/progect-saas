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
import { Label } from "@/components/ui/label";
import { ProfileImage } from "@/components/ui/profile-image";
import { Prisma } from "@/generated/prisma";
import { useAppointmentForm } from "@/hooks/use-schedule-form";
import { formatPhone } from "@/utils/format-phone";
import { MapPin } from "lucide-react";
import { DateTimePicker } from "./date-picker";

type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true;
    services: true;
  };
}>;

interface ScheduleContentProps {
  clinic: UserWithServiceAndSubscription;
}

export function ScheduleContent({ clinic }: ScheduleContentProps) {
  const form = useAppointmentForm();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-32 bg-emerald-500" />

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
          <form className="space-y-6 bg-white p-6 border rounded-md shadow-2xl mx-2">
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
                      {...field}
                      placeholder="(XX) XXXXX-XXXX"
                      onChange={(e) => {
                        const formatedValue = formatPhone(e.target.value);
                        field.onChange(formatedValue);
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
                  <FormLabel>Data do agendamento</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      initialDate={new Date()}
                      className="w-full rounded border p-2 hover:bg-gray-100 cursor-pointer"
                      onChange={(date) => {
                        if (date) {
                          field.onChange(date);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </section>
    </div>
  );
}
