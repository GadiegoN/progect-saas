import { getTimeClinic } from "../../_data-access/get-times-clinic";
import { AppointmentsList } from "./appointments-list";

export async function Appointments({ userId }: { userId: string }) {
  const user = await getTimeClinic({ userId: userId });

  return (
    <div>
      <AppointmentsList times={user.times} />
    </div>
  );
}
