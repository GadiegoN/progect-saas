import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppointmentWithService } from "./appointments-list";
import { currencyFormat } from "@/utils/format-currency";
import { format } from "date-fns";

interface AppointmentsDialogProps {
  appointment: AppointmentWithService | null;
}

export function AppointmentsDialog({ appointment }: AppointmentsDialogProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Detalhe do agendamento</DialogTitle>
        <DialogDescription>
          Veja todos os detalhes do agendamento.
        </DialogDescription>
      </DialogHeader>

      <div className="py-4">
        {appointment && (
          <article>
            <p className="text-gray-500">
              <span className="font-semibold text-gray-950">
                Horario Agendado:{" "}
              </span>
              {appointment.time}
            </p>
            <p className="text-gray-500">
              <span className="font-semibold text-gray-950">Nome: </span>
              {appointment.name}
            </p>
            <p className="text-gray-500">
              <span className="font-semibold text-gray-950">Data: </span>
              {new Intl.DateTimeFormat("pt-BR", {
                timeZone: "UTC",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }).format(new Date(appointment.appointmentDate))}
            </p>
            <p className="text-gray-500">
              <span className="font-semibold text-gray-950">Telefone: </span>
              {appointment.phone}
            </p>
            <p className="text-gray-500">
              <span className="font-semibold text-gray-950">Email: </span>
              {appointment.email}
            </p>

            <section className="bg-gray-200 mt-4 p-2 rounded-md">
              <p className="text-gray-500">
                <span className="font-semibold text-gray-950">Serviço: </span>
                {appointment.service.name}
              </p>
              <p className="text-gray-500">
                <span className="font-semibold text-gray-950">Valor: </span>
                {currencyFormat(appointment.service.price / 100)}
              </p>
            </section>
          </article>
        )}
      </div>
    </DialogContent>
  );
}
