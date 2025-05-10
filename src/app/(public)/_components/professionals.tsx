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

export function Professionals() {
  return (
    <section className="flex flex-col h-full py-16">
      <div className="flex flex-col px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center">Clínicas disponíveis</h2>
        <p className="text-lg text-gray-600 text-center">
          Aqui você pode encontrar uma lista de profissionais!
        </p>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">
          <Card className="overflow-hidden shadow-md transition-transform transform hover:scale-105">
            <CardContent>
              <div className="relative h-48">
                <Image
                  src={fotoImg}
                  alt="Card Image"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10/12">
                    <h3>Clinica Centro</h3>
                    <p className="text-sm text-gray-500">
                      Rua x, Centro, Conquista - MG
                    </p>
                  </div>

                  <div className="size-2.5 rounded-full bg-emerald-500" />
                </div>

                <Link
                  href="/agendar"
                  className="flex bg-emerald-500 cursor-pointer justify-center text-white font-semibold px-4 py-2 rounded-md hover:bg-emerald-600 transition duration-200"
                >
                  Agendar Horario
                  <ArrowRight />
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </section>
  );
}
