import HeaderComponent from "@/components/header";
import MapComponent from "@/components/map";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const LocationsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  const { slug } = await params;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <HeaderComponent />

      <main className="flex-1 w-full overflow-hidden">
        <MapComponent tripId={slug} />
      </main>
    </div>
  );
};

export default LocationsPage;
