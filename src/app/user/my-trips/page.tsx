import TripCardComponent from "./components/trip-card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function MyTripsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }
  return (
    <div className="container mx-auto py-8 px-4">
      <TripCardComponent />
    </div>
  );
}
