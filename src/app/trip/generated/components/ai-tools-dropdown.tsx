"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDown, Loader2 } from "lucide-react";
import { getTripCurrentWeather } from "@/actions/trip/get-trip-current-weather";
import { useState } from "react";
import WeatherCardComponent from "./weather-card";

interface AiToolsDropdownComponentProps {
  city: string;
}
// criar um schema zod para o retorno do weathr
const AiToolsDropdownComponent = ({ city }: AiToolsDropdownComponentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState<any>(null);
  const handleGetWeather = async (city: string) => {
    setIsLoading(true);
    try {
      const weather = await getTripCurrentWeather(city);
      console.log(weather);
      setWeather(weather);
    } catch (error) {
      console.error("Erro ao buscar o clima:", error);
    } finally {
      setIsLoading(false); // Isso garante que o loading sempre será desligado
    }
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
          <WeatherCardComponent weather={weather} />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AiToolsDropdownComponent;
