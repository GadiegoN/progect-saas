"use client";

import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useProfileForm } from "./profile-form";
import { useSelectedHours } from "@/hooks/use-selected-hours";
import { generateTimeSlots } from "@/lib/time";
import { brazilianTimeZones } from "@/lib/timezones";
import { ProfileImage } from "./profile-image";
import { ProfileFormFields } from "./profile-form-fields";
import { ScheduleDialog } from "./schedule-dialog";

export function ProfileContent() {
  const { selectedHours, toggleHour } = useSelectedHours();
  const form = useProfileForm();

  const hours = generateTimeSlots();
  const timeZones = brazilianTimeZones;

  return (
    <div className="mx-auto">
      <Form {...form}>
        <form>
          <Card>
            <CardHeader>
              <CardTitle>Meu perfil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ProfileImage />
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
    </div>
  );
}
