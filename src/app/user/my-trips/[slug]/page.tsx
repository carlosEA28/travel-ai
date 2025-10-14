import HeaderComponent from "@/components/header";
import TripCardComponent from "../components/trip-card";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function MyTripPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <HeaderComponent />
      <div className="max-w-6xl mx-auto w-full p-6">
        <TripCardComponent />
      </div>
    </div>
  );
}
