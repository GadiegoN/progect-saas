"use client";

import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useSelectedHours } from "@/hooks/use-selected-hours";
import { generateTimeSlots } from "@/lib/time";
import { brazilianTimeZones } from "@/lib/timezones";
import { ProfileImage } from "./profile-image";
import { ProfileFormFields } from "./profile-form-fields";
import { ScheduleDialog } from "./schedule-dialog";
import { Subscription, User } from "@/generated/prisma";
import { ProfileFormData, useProfileForm } from "@/hooks/use-profile-form";
import { updateProfile } from "../_actions/update-profile";
import { toast } from "sonner";
import { extractPhoneNumber } from "@/utils/format-phone";

interface ProfileContentProps {
  user: User & {
    subscription: Subscription | null;
  };
}

export function ProfileContent({ user }: ProfileContentProps) {
  const { selectedHours, toggleHour } = useSelectedHours(user.times ?? []);
  const form = useProfileForm({
    address: user.address || null,
    name: user.name || null,
    phone: user.phone || null,
    status: user.status,
    timezone: user.timezone || "America/Sao_Paulo",
  });

  const hours = generateTimeSlots();
  const timeZones = brazilianTimeZones;

  async function onSubmit(values: ProfileFormData) {
    const extractValue = extractPhoneNumber(values.phone || "");

    const { name, address, phone, status, timezone } = values;
    const response = await updateProfile({
      name,
      address,
      phone: extractValue,
      status: status === "active" ? true : false,
      times: selectedHours || [],
      timezone,
    });

    if (response.error) {
      toast.error("Erro ao atualizar o perfil", { closeButton: true });
      return;
    }

    if (response.success) {
      toast.success("Peril atualizado com sucesso", { closeButton: true });
      return;
    }
  }

  return (
    <div className="mx-auto">
      <Form {...form}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="max-w-2xl">
              <CardHeader>
                <CardTitle className="text-xl p-4">Meu perfil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ProfileImage imageUrl={user.image ?? ""} />
                <div className="space-y-4 p-4">
                  <ProfileFormFields form={form} timeZones={timeZones} />
                  <ScheduleDialog
                    hours={hours}
                    selectedHours={selectedHours}
                    onToggle={toggleHour}
                  />
                  <Button className="w-full" type="submit">
                    Salvar alterações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </Form>
    </div>
  );
}
