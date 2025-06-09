"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Reminder } from "@/generated/prisma";
import { Plus, Trash2 } from "lucide-react";

interface ReminderListProps {
  reminder: Reminder[];
}

export function ReminderList({ reminder }: ReminderListProps) {
  return (
    <div className="flex flex-col gap-3">
      <Card>
        <CardHeader className="">
          <div className="flex items-center justify-between py-4">
            <CardTitle className="text-xl lg:text-2xl">Lembretes</CardTitle>
            <Button variant="ghost" className="p-0">
              <Plus />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {reminder.length === 0 && (
            <article className="flex flex-wrap w-11/12 mx-auto flex-row items-center justify-center py-4 bg-muted mb-2 px-2 rounded-md">
              <p className="font-semibold">Nenhum lembrete registrado...</p>
            </article>
          )}

          {reminder.map((item) => (
            <article
              key={item.id}
              className="flex flex-wrap flex-row items-center justify-between py-2 bg-muted mb-2 px-2 rounded-md"
            >
              <p>{item.description}</p>

              <Button variant="destructive" size="sm">
                <Trash2 />
              </Button>
            </article>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
