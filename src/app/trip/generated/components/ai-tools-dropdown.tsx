"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Loader2, MapPin } from "lucide-react";
import { getTripCurrentWeather } from "@/actions/trip/get-trip-current-weather";
import { useState } from "react";
import WeatherCardComponent from "./weather-card";
import { WeatherData } from "@/types/weather";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AiToolsDropdownComponentProps {
  city: string;
}

const AiToolsDropdownComponent = ({ city }: AiToolsDropdownComponentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const handleGetWeather = async (city: string) => {
    setIsLoading(true);
    try {
      const weather = await getTripCurrentWeather(city);
      if (weather && typeof weather === "object" && "location" in weather) {
        setWeather(weather as WeatherData);
      } else {
        setWeather(null);
      }
    } catch (error) {
      console.error("Erro ao buscar o clima:", error);
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu
      onOpenChange={async (open) => {
        if (open) {
          await handleGetWeather(city);
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "group flex items-center gap-2 transition-all duration-200 hover:bg-accent/80",
            "border border-border/50 bg-background/80 backdrop-blur-sm",
            "rounded-full px-4 py-1.5 text-sm font-medium shadow-sm"
          )}
        >
          <div className="flex items-center gap-1.5">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/10 p-1 text-blue-500">
              <MapPin className="h-3 w-3" />
            </div>
            <span>Weather in {city}</span>
          </div>
          <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className={cn(
          "w-[320px] overflow-hidden p-0",
          "border border-border/50 bg-background/95 backdrop-blur-sm",
          "shadow-lg ring-1 ring-black/5 transition-all",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        )}
      >
        <div
          className="relative
          before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/5 before:via-transparent before:to-transparent before:opacity-30"
        >
          {isLoading ? (
            <div className="flex h-48 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : weather ? (
            <div className="relative z-10">
              <div className="p-4">
                <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{weather.location?.name.split(",")[0]}</span>
                </div>
                <WeatherCardComponent weather={weather} />
              </div>
            </div>
          ) : (
            <div className="flex h-32 items-center justify-center p-4 text-center">
              <p className="text-sm text-muted-foreground">
                Couldn&apos;t load weather data. Please try again.
              </p>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AiToolsDropdownComponent;
