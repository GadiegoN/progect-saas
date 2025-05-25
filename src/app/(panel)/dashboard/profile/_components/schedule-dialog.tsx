"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScheduleDialogProps {
  hours: string[];
  selectedHours: string[];
  onToggle: (hour: string) => void;
}

export function ScheduleDialog({
  hours,
  selectedHours,
  onToggle,
}: ScheduleDialogProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="schedule">Configurar horário de funcionamento</Label>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            Clique aqui para selecionar horários
            <ArrowRight className="size-5" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Horário de funcionamento</DialogTitle>
            <DialogDescription>
              Configure o horário de funcionamento da sua clínica.
            </DialogDescription>
          </DialogHeader>

          <section className="py-4">
            <p className="text-sm text-muted-foreground mb-2">
              Clique nos horários abaixo para marcar ou desmarcar:
            </p>

            <div className="mx-auto grid grid-cols-5 gap-2">
              {hours.map((hour) => (
                <Button
                  key={hour}
                  variant={
                    selectedHours.includes(hour) ? "secondary" : "outline"
                  }
                  className={cn(
                    "w-full h-10 m-1 border text-sm",
                    selectedHours.includes(hour) && "border-primary"
                  )}
                  onClick={() => onToggle(hour)}
                >
                  {hour}
                </Button>
              ))}
            </div>
          </section>

          <DialogClose asChild>
            <Button type="submit">Salvar horário</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
