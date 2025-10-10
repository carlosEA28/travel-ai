import { GetAllTrips } from "@/actions/trip/get-all-trips";
import Image from "next/image";
import { toast } from "sonner";

const TripCardComponent = async () => {
  const trips = await GetAllTrips();

  if (!trips) {
    return toast.error("Error fetching trips");
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
      {trips.map((trip) => (
        <div
          key={trip.id}
          className="bg-white  rounded-xl shadow-md overflow-hidden border border-gray-100"
        >
          <div className="relative  h-48">
            <Image
              src={trip.coverImageUrl!}
              alt={trip.destination}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg text-gray-900">
                  {trip.destination}
                </h3>
                <p className="text-[#4D8099]">
                  {trip.startDate.toDateString()} -{" "}
                  {trip.endDate.toDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TripCardComponent;
