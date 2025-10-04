import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const WelcomeOnboardingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-8">
      <div className="flex flex-col items-center gap-6 text-center ">
        <Image
          src="/welcome1s.svg"
          alt="Logo"
          className="xl:w-full lg:w-[800px] md:w-[760px] "
          width={0}
          height={0}
        />
        <h1 className="text-2xl font-bold text-[#0D171C]">
          Bem-vindo ao seu planejador de viagens com IA
        </h1>

        <p className="text-base text-[#0D171C]">
          Crie roteiros de viagem personalizados com o poder da IA. Explore
          destinos, personalize suas preferências e embarque em aventuras
          inesquecíveis.
        </p>

        <div className="w-full flex items-center justify-between">
          <Button className="cursor-pointer" variant={"outline"} asChild>
            <Link href="/">Pular</Link>
          </Button>

          <Button className="bg-[#12A3ED] cursor-pointer" asChild>
            <Link href="/">Próximo</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeOnboardingPage;
