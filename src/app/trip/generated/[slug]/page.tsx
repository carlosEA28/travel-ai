import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import HeaderComponent from "@/components/header";
import ItineraryTabs from "@/components/ItineraryTabs";

const GeneratedTripPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  const { slug } = await params;

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderComponent />
      <main className="container  mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <ItineraryTabs tripId={slug} />
        </div>
      </main>
    </div>
  );
};

export default GeneratedTripPage;
