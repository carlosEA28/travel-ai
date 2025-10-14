import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const FeatureOnboardingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-8">
      <div className="flex flex-col items-center gap-6 text-center ">
        <Image
          src="/MeditatingDoodle.svg"
          alt="Logo"
          className="w-full h-[400px] "
          width={0}
          height={0}
        />
        <h1 className="text-2xl font-bold text-[#0D171C]">
          Customize your trip
        </h1>

        <p className="text-base text-[#0D171C]">
          Inform your interests, budget and dates so our AI can create a custom
          itinerary for you.
        </p>

        <div className="w-full flex items-center justify-between">
          <Button className="cursor-pointer" variant={"outline"} asChild>
            <Link href="/onboarding/welcome">Previous</Link>
          </Button>

          <Button className="bg-[#12A3ED] cursor-pointer" asChild>
            <Link href="/onboarding/first-trip"> Next</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeatureOnboardingPage;
