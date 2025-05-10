import { Header } from "./_components/header";
import { Hero } from "./_components/hero";

export default function Home() {
  return (
    <main className="flex flex-col justify-between min-h-screen pt-24">
      <Header />

      <div>
        <Hero />
      </div>
    </main>
  );
}
