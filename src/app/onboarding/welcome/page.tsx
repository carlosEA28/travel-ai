import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const WelcomeOnboardingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-8">
      <div className="flex flex-col items-center gap-6 text-center ">
        <Image
          src="/GroovySittingDoodle.svg"
          alt="Logo"
          className="w-full h-[400px]"
          width={0}
          height={0}
        />
        <h1 className="text-2xl font-bold text-[#0D171C]">
          Welcome to TravelAI
        </h1>

        <p className="text-base text-[#0D171C]">
          Create personalized travel itineraries with the power of AI. Explore
          destinations, customize your preferences, and embark on unforgettable
          adventures.
        </p>

        <div className="w-full flex items-center justify-between">
          <Button className="cursor-pointer" variant={"outline"} asChild>
            <Link href="/">Skip</Link>
          </Button>

          <Button
            className="bg-[#12A3ED] hover:bg-[#0E8DD0] transition-colors cursor-pointer"
            asChild
          >
            <Link href="/onboarding/feature">Next</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeOnboardingPage;
