"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";

import { ChevronDown, Loader2 } from "lucide-react";
import { getTripCurrentWeather } from "@/actions/trip/get-trip-current-weather";
import { useState } from "react";

interface AiToolsDropdownComponentProps {
  city: string;
}

const AiToolsDropdownComponent = ({ city }: AiToolsDropdownComponentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleGetWeather = async (city: string) => {
    setIsLoading(true);
    const weather = await getTripCurrentWeather(city);

    console.log(weather);
    setIsLoading(false);
  };
  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) handleGetWeather(city);
      }}
    >
      <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer">
        🌡️ Weather in {city} <ChevronDown />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[600px] ">
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Card>
            <CardContent className="flex items-center gap-6">
              {/* CURRENT WEATHER */}
              <div>
                <div className="flex gap-1">
                  <p className="text-4xl">24° </p>
                  <p className="text-4xl">☀️</p>
                </div>
                <p className="text-base">Paris</p>
                <p className="text-sm">Partly cloudy</p>
              </div>

              {/* FORECAST */}
              <div className="flex gap-5">
                <div className="text-center">
                  <p>Tuesday</p>
                  <p>☀️</p>
                  <p className="text-sm">
                    24° <span className="">13°</span>
                  </p>
                </div>
                {/* ...restante dos dias */}
              </div>
            </CardContent>
          </Card>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AiToolsDropdownComponent;
