"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { ServiceDialog } from "./service-dialog";
import { useState } from "react";
import { Service } from "@/generated/prisma";
import { currencyFormat } from "@/utils/format-currency";

interface ServicesListProps {
  services: Service[];
}

export function ServiceList({ services }: ServicesListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <section className="mx-auto max-w-2xl p-4">
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
            <DialogContent>
              <ServiceDialog
                closeModal={() => {
                  setIsDialogOpen(false);
                }}
              />
            </DialogContent>
          </CardHeader>

          <CardContent>
            <section className="space-y-4">
              {services.map((service) => (
                <article
                  key={service.id}
                  className="flex justify-between items-center p-2 border-b"
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
                    <Button variant="ghost" size="icon">
                      <Pencil className="text-indigo-400" />
                    </Button>

                    <div className="h-8 border" />

                    <Button variant="ghost" size="icon">
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
