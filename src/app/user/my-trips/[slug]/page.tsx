import HeaderComponent from "@/components/header";
import TripCardComponent from "../components/trip-card";

export default async function MyTripPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <HeaderComponent />
      <div className="max-w-6xl mx-auto w-full p-6">
        <TripCardComponent />
      </div>
    </div>
  );
}
