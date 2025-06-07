import { getAllServices } from "../_data-access/get-all-services";
import { ServiceList } from "./service-list";

interface ServiceContentProps {
  userId: string;
}

export async function ServicesContent({ userId }: ServiceContentProps) {
  const data = await getAllServices({ userId });

  console.log("Fetched services:", data);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello Services!</h1>
      <p className="mt-4 text-gray-600">This is the services page content.</p>

      <ServiceList services={data.services || []} />
    </div>
  );
}
