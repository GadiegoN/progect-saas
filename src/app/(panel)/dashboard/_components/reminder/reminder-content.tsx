"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ReminderFormData, useReminderForm } from "@/hooks/use-reminder-form";
import { createReminder } from "../../_actions/create-reminder";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ReminderContentProps {
  closeDialog: () => void;
}

export function ReminderContent({ closeDialog }: ReminderContentProps) {
  const router = useRouter();
  const form = useReminderForm();

  async function onSubmit(formData: ReminderFormData) {
    const response = await createReminder({
      description: formData.description,
    });

    if (response.error) {
      toast.error(response.error);

      return;
    }

    toast.success(response.data);
    closeDialog();
    router.refresh();
  }

  return (
    <div className="grid gap-4 py-4">
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição do lembrete</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="max-h-52"
                    placeholder="Digite a descrição do lembrete..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={!form.watch("description")}>
            Criar lembrete
          </Button>
        </form>
      </Form>
    </div>
  );
}
