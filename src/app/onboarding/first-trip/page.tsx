import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const FirstTripOnboardingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-8">
      <div className="flex flex-col items-center gap-3 text-center ">
        <h1 className="text-2xl font-bold text-[#0D171C]">
          Plan your first trip
        </h1>

        <p className="text-base text-[#0D171C]">
          Start planning your dream trip with TravelAI. It&apos;s easy, fast,
          and made just for you.
        </p>

        <Image
          src="/DoogieDoodle.svg"
          alt="Logo"
          className="w-full h-[400px]"
          width={0}
          height={0}
        />

        <Button className="bg-[#12A3ED] cursor-pointer w-full" asChild>
          <Link href="/trip/create">Create my first trip</Link>
        </Button>
      </div>
    </div>
  );
};

export default FirstTripOnboardingPage;
