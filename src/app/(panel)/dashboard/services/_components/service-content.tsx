import { getAllServices } from "../_data-access/get-all-services";
import { ServiceList } from "./service-list";

interface ServiceContentProps {
  userId: string;
}

export async function ServicesContent({ userId }: ServiceContentProps) {
  const data = await getAllServices({ userId });

  return <ServiceList services={data.services || []} />;
}
