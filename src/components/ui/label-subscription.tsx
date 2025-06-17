import Link from "next/link";
import { Button } from "./button";

export function LabelSubscription({ expired }: { expired: boolean }) {
  return (
    <div className="bg-destructive/60 text-white text-sm md:text-base px-3 py-2 my-4 rounded-md flex flex-col gap-4 md:flex-row items-center justify-between">
      <div>
        {expired ? (
          <h3 className="font-medium text-base">
            Você não possui um plano ativo.
          </h3>
        ) : (
          <h3 className="font-medium text-base">
            Você excedeu o limite do seu plano.
          </h3>
        )}

        <p className="text-sm text-gray-200">
          Acesse seu plano para verificar os detalhes.
        </p>
      </div>

      <Button
        variant="destructive"
        className="hover:underline mb-4 md:mb-0"
        asChild
      >
        <Link href="/dashboard/plans">Acessar planos</Link>
      </Button>
    </div>
  );
}
