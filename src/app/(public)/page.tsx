import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Professionals } from "./_components/professionals";

export default function Home() {
  return (
    <main className="flex flex-col justify-between min-h-screen pt-10">
      <Header />

      <div>
        <Hero />

        <Professionals />
      </div>

      <Footer />
    </main>
  );
}
