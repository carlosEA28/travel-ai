import HeaderComponent from "@/components/header";
import TripCardComponent from "../components/trip-card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const MyTripPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <HeaderComponent />

      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
            </div>

            <Button asChild variant={"secondary"}>
              <Link href="/trip/create">
                Add New Trip
                <PlusIcon className="w-4 h-4 mr-2" />
              </Link>
            </Button>
          </div>

          <div className="space-y-10">
            {/* Upcoming Trips */}
            <section>
              <h2 className="text-xl font-semibold mb-6 text-gray-800">
                Upcoming
              </h2>
              <div>
                <TripCardComponent />
              </div>
            </section>

            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  All Trips
                </h2>
              </div>

              {/* Past Trip Card */}
              <TripCardComponent />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyTripPage;
