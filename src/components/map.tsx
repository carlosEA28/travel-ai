import { GetTripById } from "@/actions/trip/get-trip-by-id";
import {
  Map,
  MapMarker,
  MapPopup,
  MapTileLayer,
  MapZoomControl,
} from "@/components/ui/map";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MapPin } from "lucide-react";
import React from "react";

interface LocationPageProps {
  tripId: string;
}

const MapComponent = async ({ tripId }: LocationPageProps) => {
  const trip = await GetTripById(tripId);
  const days = trip.dayPlans;

  const activitiesWithLocation = days.flatMap((day) =>
    day.activities.filter(
      (activity) =>
        activity.lat !== null &&
        activity.lng !== null &&
        !isNaN(activity.lat) &&
        !isNaN(activity.lng)
    )
  );

  const centerLat =
    activitiesWithLocation.length > 0
      ? activitiesWithLocation.reduce((sum, act) => sum + (act.lat || 0), 0) /
        activitiesWithLocation.length
      : 43.60482759573559;

  const centerLng =
    activitiesWithLocation.length > 0
      ? activitiesWithLocation.reduce((sum, act) => sum + (act.lng || 0), 0) /
        activitiesWithLocation.length
      : 1.411316557139571;

  return (
    <div className="flex h-full overflow-hidden w-full gap-4 p-4">
      <div className="h-full w-[400px] flex-shrink-0 rounded-md border overflow-hidden">
        <ScrollArea className="h-full w-full">
          <div className="p-4">
            {days.map((day) => (
              <div key={day.id} className="mb-4">
                <h2 className="mb-2 font-semibold">Day {day.dayNumber}</h2>
                <div className="space-y-3">
                  {day.activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#F0F2F5] text-[#121717]">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-[#121717] line-clamp-1">
                          {activity.title}
                        </h3>
                        {activity.description && (
                          <p className="mt-1 line-clamp-2 text-xs text-[#121717]">
                            {activity.description}
                          </p>
                        )}
                        {activity.locationName && (
                          <p className="mt-1 text-xs text-blue-600">
                            📍 {activity.locationName}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 rounded-md border">
        <Map center={[centerLat, centerLng]} className="h-full w-full">
          <MapTileLayer />
          <MapZoomControl />
          {activitiesWithLocation.map((activity) => (
            <MapMarker
              key={activity.id}
              position={[activity.lat!, activity.lng!]}
            >
              <MapPopup>{activity.locationName || "Free day"}</MapPopup>
            </MapMarker>
          ))}
        </Map>
      </div>
    </div>
  );
};

export default MapComponent;
