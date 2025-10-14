import { GetAllTrips } from "@/actions/trip/get-all-trips";
import Image from "next/image";
import { toast } from "sonner";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { PlaneTakeoffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const TripCardComponent = async () => {
  const trips = await GetAllTrips();

  if (!trips) {
    return toast.error("Error fetching trips");
  }

  if (!trips || trips.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <PlaneTakeoffIcon />
          </EmptyMedia>
          <EmptyTitle>Apearently you dont have trips</EmptyTitle>
          <EmptyDescription>
            Click the button below to create your first trip
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild variant={"secondary"}>
            <Link href="/trip/create">Create trip</Link>
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="space-y-10 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Upcoming</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <Link 
              key={trip.id}
              href={`/trip/generated/${trip.id}`}
              className="block"
            >
              <div
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="relative h-48">
                  <Image
                    src={trip.coverImageUrl!}
                    alt={trip.destination}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg text-gray-900">
                        {trip.destination}
                      </h3>
                      <p className="text-[#4D8099]">
                        {new Date(trip.startDate).toLocaleDateString()} -{" "}
                        {new Date(trip.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TripCardComponent;
