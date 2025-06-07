"use client";

import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  DialogServiceFormData,
  useDialogServiceForm,
} from "@/hooks/use-service-form";
import { convertRealToCents } from "@/utils/convert-currency";
import { formatCurrency } from "@/utils/format-currency";
import { createNewService } from "../_actions/create-service";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface ServiceDialogProps {
  closeModal: () => void;
}

export function ServiceDialog({ closeModal }: ServiceDialogProps) {
  const form = useDialogServiceForm();

  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(values: DialogServiceFormData) {
    setLoading(true);
    const priceInCents = convertRealToCents(values.price);
    const hours = parseInt(values.hours) || 0;
    const minutes = parseInt(values.minutes) || 0;

    const duration = hours * 60 + minutes;

    const response = await createNewService({
      name: values.name,
      price: priceInCents,
      duration: duration,
    });

    setLoading(false);

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success("Serviço cadastrado com sucesso!");

    handleCloseModal();
  }

  function handleCloseModal() {
    form.reset();

    closeModal();
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Novo Serviço</DialogTitle>

        <DialogDescription>Crie um novo serviço.</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do serviço</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Digite o nome do serviço" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor do serviço</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Ex: 120,00"
                      onChange={(e) => {
                        const formatted = formatCurrency(e.target.value);
                        field.onChange(formatted);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full">
            <div className="w-full flex justify-center">
              <Label className="mb-2">Duração do serviço</Label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="hours"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="mx-auto">Horas:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="01"
                        type="number"
                        min="0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="minutes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mx-auto">Minutos</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="00"
                        type="number"
                        min="0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Adicionar serviço"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
