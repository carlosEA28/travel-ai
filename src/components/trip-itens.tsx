import { Separator } from "@radix-ui/react-separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Download, CircleSmall, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GetTripById } from "@/actions/trip/get-trip-by-id";

const TripItensComponent = async ({ tripId }: { tripId: string }) => {
  // const handleExport = async () => {};

  const trip = await GetTripById(tripId);

  return (
    <div className="w-full">
      {/* Título + Botão */}
      <div className="flex w-full items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">
          Sua Viagem para {trip.destination}
        </h1>
        <Button variant={"secondary"} className="flex items-center gap-2">
          <Download size={18} />
          Exportar Itinerário
        </Button>
      </div>

      {/* Tabs */}
      <Tabs
        defaultValue={trip.dayPlans[0]?.dayNumber.toString() || "Day 1"}
        className="w-full"
      >
        <TabsList className="flex w-full justify-start border-b border-gray-200 p-0 mb-8 overflow-x-auto">
          {trip.dayPlans.map((item) => (
            <TabsTrigger
              key={item.dayNumber}
              value={item.dayNumber.toString()}
              className="
            rounded-none 
            border-b-2 
            border-b-transparent 
            bg-transparent 
            px-4 py-2 
            font-semibold 
            text-muted-foreground 
            shadow-none 
            transition-colors 
            hover:bg-gray-100 
            hover:text-primary 
          "
            >
              {item.dayNumber}
            </TabsTrigger>
          ))}
        </TabsList>

        {trip.dayPlans.map((item) => (
          <TabsContent key={item.dayNumber} value={item.dayNumber.toString()}>
            <div className="space-y-6">
              <p className="text-2xl font-bold">
                {item.dayNumber}: {item.activities[1].title}
              </p>

              <div className="relative pl-6">
                <Separator
                  orientation="vertical"
                  className="w-1 h-1 bg-gray-300 absolute left-2 top-0 bottom-0"
                />

                <ul className="space-y-6">
                  {item.activities.map((act, idx) => (
                    <li key={idx} className="flex relative">
                      <CircleSmall className="flex-shrink-0" />
                      <div className="ml-4">
                        <p className="font-semibold">
                          {act.title}: {act.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-6 flex justify-between ">
        <Button className="bg-[#12A3ED]">
          Save <Heart />
        </Button>
        <Button variant={"secondary"}>
          View in the map <MapPin />
        </Button>
      </div>
    </div>
  );
};

export default TripItensComponent;
