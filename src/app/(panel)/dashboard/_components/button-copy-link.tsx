"use client";

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export function ButtonCopyLink({ userId }: { userId: string }) {
  async function handleCopyLink() {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/clinic/${userId}`
    );

    toast.success("Link de agendamento copiado com sucesso!");
  }

  return (
    <Button onClick={handleCopyLink}>
      <Copy className="size-5" />
    </Button>
  );
}
