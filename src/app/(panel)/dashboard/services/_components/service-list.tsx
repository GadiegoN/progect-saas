"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { ServiceDialog } from "./service-dialog";
import { useState } from "react";
import { Service } from "@/generated/prisma";
import { currencyFormat } from "@/utils/format-currency";
import { deleteService } from "../_actions/delete-service";
import { toast } from "sonner";

interface ServicesListProps {
  services: Service[];
}

export function ServiceList({ services }: ServicesListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editingService, setEditingService] = useState<null | Service>(null);

  async function handleDeleteService(serviceId: string) {
    const response = await deleteService({ serviceId: serviceId });

    if (response.error) {
      toast.error(response.error);

      return;
    }

    toast.success(response.data);
  }

  function handleEditService(service: Service) {
    setEditingService(service);
    setIsDialogOpen(true);
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) {
          setEditingService(null);
        }
      }}
    >
      <section className="ml-2 max-w-2xl p-4">
        <Card>
          <CardHeader className="flex justify-between items-center p-4 border-b border-gray-300">
            <CardTitle className="text-xl md:text-2xl font-bold">
              Serviços
            </CardTitle>

            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent
              onInteractOutside={(e) => {
                e.preventDefault();
                setIsDialogOpen(false);
                setEditingService(null);
              }}
            >
              <ServiceDialog
                closeModal={() => {
                  setIsDialogOpen(false);
                  setEditingService(null);
                }}
                serviceId={editingService ? editingService.id : undefined}
                initialValues={
                  editingService
                    ? {
                        name: editingService.name,
                        price: (editingService.price / 100)
                          .toFixed(2)
                          .replace(".", ","),
                        hours: Math.floor(
                          editingService.duration / 60
                        ).toString(),
                        minutes: (editingService.duration % 60).toString(),
                      }
                    : undefined
                }
              />
            </DialogContent>
          </CardHeader>

          <CardContent>
            <section>
              {services.map((service) => (
                <article
                  key={service.id}
                  className="flex justify-between items-center p-2 border-b hover:bg-gray-50 rounded-b-md"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-medium line-clamp-1 truncate max-w-48 md:max-w-64 lg:max-w-96">
                      {service.name}
                    </span>
                    <span>-</span>
                    <span className="font-medium">
                      {currencyFormat(service.price / 100)}
                    </span>
                  </div>

                  <div className="flex gap-1 items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={() => {
                        handleEditService(service);
                      }}
                    >
                      <Pencil className="text-indigo-400" />
                    </Button>

                    <div className="h-8 border" />

                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={() => {
                        handleDeleteService(service.id);
                      }}
                    >
                      <Trash2 className="text-red-400" />
                    </Button>
                  </div>
                </article>
              ))}
            </section>
          </CardContent>
        </Card>
      </section>
    </Dialog>
  );
}
