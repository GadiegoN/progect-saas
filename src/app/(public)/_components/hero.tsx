import Image from "next/image";
import DoctorImg from "../../../../public/doctor-hero.png";
export function Hero() {
  return (
    <section className="flex bg-gray-50 pb-10 lg:pb-0 pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <article className="flex-[2] max-w-3xl space-y-4 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl lg:text-5xl max-w-2xl tracking-tight">
              Encontre os melhores profissionais em um unico local!
            </h1>

            <p className="text-gray-600 text-lg lg:text-xl">
              Ajudamos você a encontrar o profissional ideal para o seu projeto.
              Com uma ampla variedade de categorias e profissionais
              qualificados, você pode comparar preços, ler avaliações e escolher
              o melhor para você.
            </p>

            <button className="bg-emerald-500 cursor-pointer w-fit text-white font-semibold px-4 py-2 rounded-md hover:bg-emerald-600 transition duration-200">
              Encontre uma clinica
            </button>
          </article>

          <div className="hidden lg:block">
            <Image
              src={DoctorImg}
              alt="Hero Image"
              width={340}
              height={400}
              className="object-contain"
              quality={100}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
