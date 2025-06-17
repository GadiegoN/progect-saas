import { canPermission } from "@/utils/permissions/can-permission";
import { getAllServices } from "../_data-access/get-all-services";
import { ServiceList } from "./service-list";
import { LabelSubscription } from "@/components/ui/label-subscription";

interface ServiceContentProps {
  userId: string;
}

export async function ServicesContent({ userId }: ServiceContentProps) {
  const data = await getAllServices({ userId });
  const permissions = await canPermission({ type: "service" });

  return (
    <>
      {!permissions.hasPermission && (
        <LabelSubscription expired={permissions.expired} />
      )}
      <ServiceList services={data.services || []} permission={permissions} />
    </>
  );
}
