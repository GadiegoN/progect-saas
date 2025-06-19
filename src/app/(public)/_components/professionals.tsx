import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import fotoImg from "../../../../public/foto1.png";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Prisma } from "@/generated/prisma";
import { PremiumBadge } from "./premiun-badge";

type UserWithSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true;
  };
}>;

interface ProfessionalsProps {
  professionals: UserWithSubscription[];
}

export function Professionals({ professionals }: ProfessionalsProps) {
  return (
    <section className="flex flex-col h-full py-16" id="profissionais">
      <div className="flex flex-col px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center">Clínicas disponíveis</h2>
        <p className="text-lg text-gray-600 text-center">
          Aqui você pode encontrar uma lista de profissionais!
        </p>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">
          {professionals.map((professional) => (
            <Card
              key={professional.id}
              className="overflow-hidden shadow-md transition-transform transform hover:scale-105"
            >
              <CardContent>
                <div className="relative h-48">
                  <Image
                    src={professional.image ?? fotoImg}
                    alt="Card Image"
                    fill
                    className="object-cover"
                  />

                  {professional?.subscription?.status && <PremiumBadge />}
                </div>

                <div className="p-4 space-y-4 min-h-40 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="w-10/12">
                      <h3 className="truncate">{professional.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {professional.address}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/clinic/${professional.id}`}
                    target="_blank"
                    className="flex bg-primary cursor-pointer justify-center text-white font-semibold px-4 py-2 rounded-md hover:bg-primary transition duration-200"
                  >
                    Agendar Horario
                    <ArrowRight />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </section>
  );
}
