"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CircleSmall, Download, Heart, Map } from "lucide-react";
import { Separator } from "./ui/separator";

const itinerary = [
  {
    day: "Day 1",
    title: "Arrival and Parisian Charm",
    activities: [
      {
        period: "Morning",
        description: "Arrival and Check-in",
        time: "9:00 AM - 12:00 PM",
      },
      {
        period: "Afternoon",
        description: "Explore Montmartre",
        time: "1:00 PM - 5:00 PM",
      },
      {
        period: "Evening",
        description: "Dinner Cruise on the Seine",
        time: "7:00 PM - 10:00 PM",
      },
    ],
  },
  {
    day: "Day 2",
    title: "Iconic Landmarks",
    activities: [
      {
        period: "Morning",
        description: "Eiffel Tower and Champ de Mars",
        time: "9:00 AM - 12:00 PM",
      },
      {
        period: "Afternoon",
        description: "Louvre Museum",
        time: "1:00 PM - 5:00 PM",
      },
      {
        period: "Evening",
        description: "Stroll along the Champs-Élysées",
        time: "7:00 PM - 10:00 PM",
      },
    ],
  },
];

type ItineraryTabsProps = {
  tripId: string;
};

export default function ItineraryTabs({ tripId }: ItineraryTabsProps) {
  const handleExport = () => {
    // Aqui você pode implementar a exportação (PDF, TXT, JSON etc.)
    console.log("Exportar itinerário clicado!");
  };

  return (
    <div className="flex flex-col items-center   w-full max-w-3xl mx-auto p-6">
      {/* Título + Botão */}
      <div className="flex w-full items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Sua Viagem para Paris</h1>
        <Button
          variant={"secondary"}
          onClick={handleExport}
          className="flex items-center gap-2"
        >
          <Download size={18} />
          Exportar Itinerário
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="Day 1" className="w-full">
        <TabsList className="flex flex-wrap gap-2 mb-8">
          {itinerary.map((item) => (
            <TabsTrigger key={item.day} value={item.day}>
              {item.day}
            </TabsTrigger>
          ))}
        </TabsList>

        {itinerary.map((item) => (
          <TabsContent key={item.day} value={item.day}>
            <div className="space-y-6">
              <p className="text-2xl font-bold">
                {item.day}: {item.title}
              </p>

              <div className="relative pl-6">
                {/* Linha vertical */}

                <Separator
                  orientation="vertical"
                  className="w-1 h-1 bg-gray-300 absolute left-2 top-0 bottom-0"
                />

                <ul className=" space-y-6">
                  {item.activities.map((act, idx) => (
                    <li key={idx} className="flex relative">
                      {/* Bolinha preta */}
                      <CircleSmall />

                      <div className="ml-4">
                        <p className="font-semibold">
                          {act.period}: {act.description}
                        </p>
                        <p className="text-sm text-gray-500">{act.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
        ))}

        <div className="mt-6 flex justify-between ">
          <Button className="bg-[#12A3ED]">
            Save <Heart />
          </Button>
          <Button variant={"secondary"}>
            View in the map <Map />
          </Button>
        </div>
      </Tabs>
    </div>
  );
}
