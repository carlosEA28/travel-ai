import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const FirstTripOnboardingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-8">
      <div className="flex flex-col items-center gap-3 text-center ">
        <h1 className="text-2xl font-bold text-[#0D171C]">
          Planeje sua primeira viagem
        </h1>

        <p className="text-base text-[#0D171C]">
          Começe a planejar a sua viagem dos sonhos com TravelAI. É fácil,
          rápido e feito especialmente para você.
        </p>

        <Image
          src="/DoogieDoodle.svg"
          alt="Logo"
          className="w-full h-[400px]"
          width={0}
          height={0}
        />

        <Button className="bg-[#12A3ED] cursor-pointer w-full" asChild>
          <Link href="/trip/create">Criar minha primeira viagem</Link>
        </Button>
      </div>
    </div>
  );
};

export default FirstTripOnboardingPage;
