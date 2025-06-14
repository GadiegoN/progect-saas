import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Professionals } from "./_components/professionals";
import { getProfessionals } from "./_data-access/get-professionals";

export const revalidade = 300;

export default async function Home() {
  const professionals = await getProfessionals();

  return (
    <main className="flex flex-col justify-between min-h-screen pt-10">
      <Header />

      <div>
        <Hero />

        <Professionals professionals={professionals} />
      </div>

      <Footer />
    </main>
  );
}
