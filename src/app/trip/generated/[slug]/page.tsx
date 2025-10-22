import HeaderComponent from "@/components/header";
import ItineraryTabs from "@/components/ItineraryTabs";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { headers } from "next/headers";

type GeneratedTripPageParams = {
  params: Promise<{
    slug: string;
  }>;
};

const GeneratedTripPage = async ({ params }: GeneratedTripPageParams) => {
  const { slug } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderComponent />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Suspense fallback={<div>Loading trip details...</div>}>
            <ItineraryTabs tripId={slug} />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default GeneratedTripPage;
